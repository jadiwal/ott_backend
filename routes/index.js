var express = require("express");
var router = express.Router();
require("../util/functions");
require("../util/constants");
var single_quote_escape = require("../util/single_quote_escape");
var jwt = require("jsonwebtoken");
var fs = require("fs");
const e = require("express");
var request = require("request");

// router.post('/authenticate', function (req, res, next) {
//   var login_id = req.body.login_id;
//   var password = req.body.password;
//   // password = encrypt(password);
//   var query = "select * from user_def where login_id=$1 and password=$2";
//   console.log(query);
//   db.result(query, [login_id, password]).then(result => {
//     console.log(result.rows);
//     if (result.rows.length > 0) {
//       var token = jwt.sign({
//         exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
//         data: result.rows[0]
//       }, JWT_SECRET);
//       if (result.rows[0].status == 'Active') {
//         if (result.rows[0].entity_id == 0) {
//           res.status(200).json({ success: true, msg: "Logged In Successfully", token: token, user_type: result.rows[0].user_type, company_id: result.rows[0].company_id, sub_company_id: result.rows[0].sub_company_id, department_id: result.rows[0].department_id, entity_id: result.rows[0].entity_id, user_id: result.rows[0].user_id });
//           db.result("update user_def set last_login=now() where login_id=$1", [login_id]).then(result => { }).catch(err => {
//             console.log(err);
//             res.status(500).json({ success: false, msg: SERVER_ERROR });
//           })
//         } else {
//           const checkEntityStatus = `select * from entity_def where id = ${result.rows[0].entity_id}`
//           db.query(checkEntityStatus).then((data) => {
//             if (data[0].status == "Active") {
//               res.status(200).json({ success: true, msg: "Logged In Successfully", token: token, user_type: result.rows[0].user_type, company_id: result.rows[0].company_id, sub_company_id: result.rows[0].sub_company_id, department_id: result.rows[0].department_id, user_id: result.rows[0].user_id });
//             } else {
//               res.status(500).json({ success: false, msg: 'Entity is Blocked!' });
//             }
//           }).catch((err) => {
//             res.status(500).json({ success: false, msg: SERVER_ERROR });
//           })
//         }
//       }
//       else {
//         res.status(200).json({ success: false, msg: "User Id is Blocked" });
//       }
//     } else {
//       res.status(200).json({ success: false, msg: "Invalid Login Id or Password" });
//     }
//   }).catch(err => {
//     console.log(err);
//     res.status(500).json({ success: false, msg: SERVER_ERROR });
//   })
// });

router.post("/authenticate", function (req, res, next) {
  var user_id = req.body.user_id;
  var password = req.body.password;
  // password = encrypt(password);
  var query = "select * from user_def where user_id=$1 and password=$2";
  // console.log(query);
  db.result(query, [user_id, password])
    .then((result) => {
      // console.log(result.rows);
      if (result.rows.length > 0) {
        var token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            data: result.rows[0],
          },
          JWT_SECRET
        );
        if (result.rows[0].status == "Active") {
          res.status(200).json({
            success: true,
            msg: "Logged In Successfully",
            token: token,
            user_type: result.rows[0].user_type,
            // company_id: result.rows[0].company_id,
            // sub_company_id: result.rows[0].sub_company_id,
            // department_id: result.rows[0].department_id,
          });
          db.result("update user_def set last_login=now() where user_id=$1", [
            user_id,
          ])
            .then((result) => {})
            .catch((err) => {});
        } else {
          res.status(200).json({ success: false, msg: "User Id is Blocked" });
        }
      } else {
        res
          .status(200)
          .json({ success: false, msg: "Invalid Login Id or Password" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: SERVER_ERROR });
    });
});

router.post("/change_password", function (req, res, next) {
  var old_password = req.body.old_password,
    new_password = req.body.new_password,
    login_id = req.body.login_id,
    inserted_by = req.body.inserted_by;
  old_password = encrypt(old_password);
  new_password = encrypt(new_password);
  var query =
    "select * from change_password_ins('" +
    old_password +
    "','" +
    new_password +
    "','" +
    login_id +
    "','" +
    inserted_by +
    "')";
  console.log(query);
  db.func("change_password_ins", [
    old_password,
    new_password,
    login_id,
    inserted_by,
  ])
    .then((result) => {
      if (result[0].out_error_code === 0) {
        res
          .status(200)
          .json({ success: true, msg: "Password Changed Successfully" });
      } else if (result[0].out_error_code === 1) {
        res.status(200).json({ success: false, msg: "Incorrect Old Password" });
      } else {
        res.status(200).json({ success: false, msg: "Error Occoured" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: SERVER_ERROR });
    });
});

router.post("/fetch_dashboard_data", function (req, res, next) {
  var login_id = req.body.login_id.toString();
  var query =
    "select * from fetch_admin_dashboard_data_ins('" + login_id + "');";
  console.log(query);
  db.result(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        msg: "Successfully Done ",
        data: result.rows[0],
      });
      console.log(result.rows[0]);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: SERVER_ERROR });
    });
});

//for Forgot Password

router.post("/generate_otp", function (req, res, next) {
  var login_id = req.body.login_id,
    mobile_no = req.body.mobile_no;
  var query =
    "select * from otp_generate(" + login_id + ",'" + mobile_no + "')";
  console.log(query);
  db.func("otp_generate", [login_id, mobile_no])
    .then((result) => {
      if (result[0].out_error_code === 0) {
        dlgtpl_rapi_sms_api_calling(mobile_no, result[0].out_otp_value);
        res.status(200).json({
          success: true,
          otp_id: result[0].out_otp_id,
          msg: "Successfully Done",
        });
      } else if (result[0].out_error_code === 1) {
        res.status(200).json({ success: true, msg: "Invalid Login Id" });
      } else if (result[0].out_error_code === 2) {
        res
          .status(200)
          .json({ success: false, msg: "Information Did not Matched" });
      } else {
        res.status(200).json({ success: false, msg: "Something Went Wrong" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: SERVER_ERROR });
    });
});

router.post("/verify_otp", function (req, res, next) {
  var login_id = req.body.login_id,
    otp_id = req.body.otp_id,
    otp_value = req.body.otp_value;
  var query =
    "select * from otp_verification(" +
    login_id +
    ",'" +
    otp_id +
    "','" +
    otp_value +
    "')";
  console.log(query);
  db.func("otp_verification", [login_id, otp_id, otp_value])
    .then((result) => {
      if (result[0].out_error_code === 0) {
        var token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            data: "",
          },
          JWT_SECRET
        );
        res
          .status(200)
          .json({ success: true, msg: "Successfully Done", temp_token: token });
      }
      if (result[0].out_error_code === 1) {
        res.status(200).json({ success: false, msg: "Invalid OTP" });
      } else {
        res.status(200).json({ success: false, msg: "Something Went Wrong" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: SERVER_ERROR });
    });
});

// Routes Start

// router.post("/add_user", function (req, res, next) {
//   var user_id = req.body.user_id;
//   var mobile = req.body.mobile;
//   var email = req.body.email;
//   var password = req.body.password;
//   var user_type = req.body.user_type;
//   var status = req.body.status;
//   var inserted_by = req.body.inserted_by;
//   var updated_by = req.body.updated_by;

//   // password = encrypt(password);
//   var query =
//     "Insert into public.user_def(user_id, mobile, email, password, user_type, status, last_login, inserted_by,inserted_date, updated_by, updated_date) VALUES(" +
//     user_id +
//     "," +
//     mobile +
//     "," +
//     email +
//     "," +
//     password +
//     "," +
//     user_type +
//     "," +
//     status +
//     ", now() " +
//     inserted_by +
//     ", now()" +
//     updated_by +
//     ", now())";
//   console.log(query);
//   db.result(query)
//     .then((result) => {
//       console.log(result.rows);
//       if (result.rows.length > 0) {
//         var token = jwt.sign(
//           {
//             exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
//             data: result.rows[0],
//           },
//           JWT_SECRET
//         );
//         if (result.rows == "0") {
//           db.result("update user_def set last_login=now() where user_id=$1", [
//             user_id,
//           ])
//             .then((result) => {})
//             .catch((err) => {});
//         }
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ success: false, msg: SERVER_ERROR });
//     });
// });

//Routes End

function dlgtpl_rapi_sms_api_calling(mobile_no, otp_val) {
  try {
    var options = {
      url:
        "https://1.rapidsms.co.in/api/push.json?apikey=603a2c691e273&route=trans&sender=DLGTPL&mobileno=" +
        mobile_no +
        "&text=" +
        "Dear Customer, Please use the following OTP : " +
        otp_val +
        " to proceed. DL GTPL",
      method: "GET",
    };
    request(options, function (err, res, body) {
      console.log(res.statusCode);
      if (!err) {
        console.log(body);
      } else {
      }
    });
  } catch (Exception) {}
}

module.exports = router;
