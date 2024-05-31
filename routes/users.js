var express = require("express");
var router = express.Router();
require("../util/functions");
require("../util/constants");
var fs = require("fs");

router.post("/add_user", function (req, res, next) {
  var user_id = req.body.user_id;
  var mobile = req.body.mobile;
  var email = req.body.email;
  var password = req.body.password;
  var user_type = req.body.user_type;
  var inserted_by = req.body.inserted_by;

  var query = "select * from user_def where mobile = '" + mobile + "'";

  // console.log(query);
  db.result(query)
    .then((result) => {
      if (result.rowCount === 1) {
        res
          .status(500)
          .json({ success: false, msg: "Mobile Number Already Exists !" });
      } else {
        var query2 = "select * from user_def where email = '" + email + "'";
        // console.log(query2);

        db.result(query2).then((result2) => {
          if (result2.rowCount === 1) {
            res
              .status(500)
              .json({ success: false, msg: "Email Already Exists !" });
          } else {
            var query3 =
              "select * from user_def where user_id = '" + user_id + "'";
            // console.log(query3);

            db.result(query3)
              .then((result3) => {
                if (result3.rowCount === 1) {
                  res
                    .status(500)
                    .json({ success: false, msg: "User Id Already Exists !" });
                } else {
                  var query1 =
                    "SELECT public.user_def_ins(0, 1, $1, $2, $3, $4, $5, $6, $7)";

                  db.result(query1, [
                    user_id,
                    mobile,
                    email,
                    password,
                    user_type,
                    "Active",
                    inserted_by,
                  ])
                    .then((result4) => {
                      // console.log(result4);
                      var out_error_code = result4.rows[0].user_def_ins;
                      if (out_error_code == 0) {
                        res.status(200).json({
                          success: true,
                          msg: "New User Created Successfully !",
                        });
                      } else {
                        res.status(500).json({
                          success: false,
                          msg: "Something Went Wrong",
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      res
                        .status(500)
                        .json({ success: false, msg: "Server Error" });
                    });
                }
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ success: false, mg: "Server Error !" });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.post("/user_update", function (req, res, next) {
  var { id, user_id, mobile, email, password, user_type, updated_by } =
    req.body;

  console.log(req.body);

  var query =
    "select * from user_def where mobile = '" + mobile + "' and id != " + id;

  // console.log(query);
  db.result(query)
    .then((result) => {
      if (result.rowCount === 1) {
        res
          .status(500)
          .json({ success: false, msg: "Mobile Number Already Exists !" });
      } else {
        var query2 =
          "select * from user_def where email = '" +
          email +
          "' and id != " +
          id;
        // console.log(query2);

        db.result(query2).then((result2) => {
          if (result2.rowCount === 1) {
            res
              .status(500)
              .json({ success: false, msg: "Email Already Exists !" });
          } else {
            var query3 =
              "select * from user_def where user_id = '" +
              user_id +
              "' and id != " +
              id;
            // console.log(query3);

            db.result(query3)
              .then((result3) => {
                if (result3.rowCount === 1) {
                  res
                    .status(500)
                    .json({ success: false, msg: "User Id Already Exists !" });
                } else {
                  var query1 =
                    "SELECT public.user_def_ins(1, $1, $2, $3, $4, $5, $6, $7, $8)";

                  db.result(query1, [
                    id,
                    user_id,
                    mobile,
                    email,
                    password,
                    user_type,
                    "Active",
                    updated_by,
                  ])
                    .then((result4) => {
                      // console.log(result4);
                      var out_error_code = result4.rows[0].user_def_ins;
                      if (out_error_code == 0) {
                        res.status(200).json({
                          success: true,
                          msg: "User Updated Successfully !",
                        });
                      } else {
                        res.status(500).json({
                          success: false,
                          msg: "Something Went Wrong",
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      res
                        .status(500)
                        .json({ success: false, msg: "Server Error" });
                    });
                }
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ success: false, mg: "Server Error !" });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.post("/add_lang", function (req, res, next) {
  var lang = req.body.lang.toUpperCase();
  var image = req.body.image.toUpperCase();
  var inserted_by = req.body.inserted_by.toUpperCase();

  var query = "select * from language where name ='" + lang + "'";

  // console.log(query);

  db.result(query)
    .then((result) => {
      if (result.rowCount === 1) {
        res.status(500).json({ success: false, msg: "Language Exists" });
      } else {
        var queryI =
          "INSERT INTO language (name, image, inserted_date, inserted_by) VALUES ('" +
          lang +
          "', '" +
          image +
          "', now() ,'" +
          inserted_by +
          "')";

        db.result(queryI)
          .then((result) => {
            res.status(200).json({ success: true, msg: "Language Added" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ success: false, msg: "Server Error" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.post("/add_genre", function (req, res, next) {
  var genre = req.body.genre.toUpperCase();
  var image = req.body.image.toUpperCase();
  var inserted_by = req.body.inserted_by.toUpperCase();

  var query = "select * from genere where name = '" + genre + "'";

  db.result(query)
    .then((result) => {
      if (result.rowCount === 1) {
        res.status(500).json({ success: false, msg: "Genre Exists" });
      } else {
        var queryG =
          "INSERT INTO genere (name, image, inserted_date, inserted_by) VALUES ('" +
          genre +
          "', '" +
          image +
          "', now() ,'" +
          inserted_by +
          "')";

        db.result(queryG)
          .then((resultG) => {
            res.status(200).json({ success: true, msg: "Genre Added" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ success: false, msg: "Server Error" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

//Extra Code Start

router.post("/add_user_test", function (req, res, next) {
  var { user_id, mobile, email, password, user_type, inserted_by } = req.body;

  var query = "select * from user_def where user_id = '" + user_id + "'";

  db.result(query)
    .then((result) => {
      if (result.rows && result.rows.length === 1) {
        res.status(500).json({ success: false, msg: "User Id Exists" });
      } else {
        var query2 = "select public.user_def_ins(0, $1, $2, $3, $4, $5, $6)";

        db.result(query2, [
          user_id,
          mobile,
          email,
          password,
          user_type,
          inserted_by,
        ])
          .then((result) => {
            res.status(200).json({ success: "Data Added" });
          })
          .catch((err) => {
            res.status(500).json({ success: false, msg: "Server Error" });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});


router.post("/add_user", function (req, res, next) {
  var user_id = req.body.user_id;
  var mobile = req.body.mobile;
  var email = req.body.email;
  var password = req.body.password;
  var user_type = req.body.user_type;
  var inserted_by = req.body.inserted_by;

  var query = "select * from user_def where mobile = '" + mobile + "'";

  // console.log(query);
  db.result(query)
    .then((result) => {
      if (result.rowCount === 1) {
        res
          .status(500)
          .json({ success: false, msg: "Mobile Number Already Exists !" });
      } else {
        var query2 = "select * from user_def where email = '" + email + "'";
        // console.log(query2);

        db.result(query2).then((result2) => {
          if (result2.rowCount === 1) {
            res
              .status(500)
              .json({ success: false, msg: "Email Already Exists !" });
          } else {
            var query3 =
              "select * from user_def where user_id = '" + user_id + "'";
            // console.log(query3);

            db.result(query3)
              .then((result3) => {
                if (result3.rowCount === 1) {
                  res
                    .status(500)
                    .json({ success: false, msg: "User Id Already Exists !" });
                } else {
                  var query1 =
                    "SELECT public.user_def_ins(0, 1, $1, $2, $3, $4, $5, $6, $7)";

                  db.result(query1, [
                    user_id,
                    mobile,
                    email,
                    password,
                    user_type,
                    "Active",
                    inserted_by,
                  ])
                    .then((result4) => {
                      // console.log(result4);
                      var out_error_code = result4.rows[0].user_def_ins;
                      if (out_error_code == 0) {
                        res.status(200).json({
                          success: true,
                          msg: "New User Created Successfully !",
                        });
                      } else {
                        res.status(500).json({
                          success: false,
                          msg: "Something Went Wrong",
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      res
                        .status(500)
                        .json({ success: false, msg: "Server Error" });
                    });
                }
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ success: false, mg: "Server Error !" });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});


router.post("/user_update", function (req, res, next) {
  var { id, user_id, mobile, email, password, user_type, inserted_by } =
    req.body;

  var query =
    "select * from user_def where mobile = '" + mobile + "' and id != " + id;

  db.result(query)
    .then((result) => {
      if (result.rowCount === 1) {
        res
          .status(500)
          .json({ success: false, msg: "Mobile Number Already Exists !" });
      } else {
        var query2 =
          "select * from user_def where email = '" +
          email +
          "' and id != " +
          id;
        // console.log(query2);

        db.result(query2).then((result2) => {
          if (result2.rowCount === 1) {
            res
              .status(500)
              .json({ success: false, msg: "Email Already Exists !" });
          } else {
            var query3 =
              "select * from user_def where user_id = '" +
              user_id +
              "' and id != " +
              id;
            // console.log(query3);

            db.result(query3)
              .then((result3) => {
                if (result3.rowCount === 1) {
                  res
                    .status(500)
                    .json({ success: false, msg: "User Id Already Exists !" });
                } else {
                  var query1 =
                    "SELECT public.user_def_ins(1, $1, $2, $3, $4, $5, $6, $7, $8)";

                  db.result(query1, [
                    id,
                    user_id,
                    mobile,
                    email,
                    password,
                    user_type,
                    "Active",
                    inserted_by,
                  ])
                    .then((result4) => {
                      // console.log(result4);
                      var out_error_code = result4.rows[0].user_def_ins;
                      if (out_error_code == 0) {
                        res.status(200).json({
                          success: true,
                          msg: "User Updated Successfully !",
                        });
                      } else {
                        res.status(500).json({
                          success: false,
                          msg: "Something Went Wrong",
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      res
                        .status(500)
                        .json({ success: false, msg: "Server Error" });
                    });
                }
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ success: false, mg: "Server Error !" });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});


router.get("/all_users", function (req, res, next) {
  var query = "select * from user_def";

  db.result(query)
    .then((result) => {
      var data = result.rows;
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.post("/user_update", function (req, res, next) {
  var { id, user_id, mobile, email, password, status, user_type, inserted_by } =
    req.body;

  // console.log(req.body);

  var query =
    "select * from user_def where mobile = '" + mobile + "' and id != " + id;

  // console.log(query);
  db.result(query)
    .then((result) => {
      if (result.rowCount === 1) {
        res
          .status(500)
          .json({ success: false, msg: "Mobile Number Already Exists !" });
      } else {
        var query2 =
          "select * from user_def where email = '" +
          email +
          "' and id != " +
          id;
        // console.log(query2);

        db.result(query2).then((result2) => {
          if (result2.rowCount === 1) {
            res
              .status(500)
              .json({ success: false, msg: "Email Already Exists !" });
          } else {
            var query3 =
              "select * from user_def where user_id = '" +
              user_id +
              "' and id != " +
              id;
            // console.log(query3);

            db.result(query3)
              .then((result3) => {
                if (result3.rowCount === 1) {
                  res
                    .status(500)
                    .json({ success: false, msg: "User Id Already Exists !" });
                } else {
                  var query1 =
                    "SELECT public.user_def_ins(1, $1, $2, $3, $4, $5, $6, $7, $8)";

                  db.result(query1, [
                    id,
                    user_id,
                    mobile,
                    email,
                    password,
                    user_type,
                    status,
                    inserted_by,
                  ])
                    .then((result4) => {
                      // console.log(result4);
                      var out_error_code = result4.rows[0].user_def_ins;
                      if (out_error_code == 0) {
                        res.status(200).json({
                          success: true,
                          msg: "User Updated Successfully !",
                        });
                      } else {
                        res.status(500).json({
                          success: false,
                          msg: "Something Went Wrong",
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      res
                        .status(500)
                        .json({ success: false, msg: "Server Error" });
                    });
                }
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ success: false, mg: "Server Error !" });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

//Extra Code End

module.exports = router;
