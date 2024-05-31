var express = require("express");
var router = express.Router();
require("../util/functions");
require("../util/constants");
var multer = require("multer");
var path = require("path");
var fs = require("fs");
const { lang } = require("moment");

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    if (file.fieldname === "genre_image") {
      callBack(null, "./public");
    } else if (file.fieldname === "language_image") {
      callBack(null, "./public");
    } else if (file.fieldname === "ott_image") {
      callBack(null, "./public");
    } else if (file.fieldname === "update_genre_image") {
      callBack(null, "./public");
    } else if (file.fieldname === "update_language_image") {
      callBack(null, "./public");
    } else if (file.fieldname === "update_ott_image") {
      callBack(null, "./public");
    } else if (
      file.fieldname === "content_image" ||
      file.fieldname === "content_banner" ||
      file.fieldname === "content_poster"
    ) {
      callBack(null, "./public");
    } else if (
      file.fieldname === "update_content_image" ||
      file.fieldname === "update_content_banner" ||
      file.fieldname === "update_content_poster"
    ) {
      callBack(null, "./public");
    } else if (file.fieldname === "advertisement_image") {
      callBack(null, "./public");
    } else if (file.fieldname === "update_add_image") {
      callBack(null, "./public");
    } else if (file.fieldname === "poster_image") {
      callBack(null, "./public");
    } else if (file.fieldname === "type_image") {
      callBack(null, "./public");
    } else if (file.fieldname === "update_type_image") {
      callBack(null, "./public");
    }else if (file.fieldname === "channelImage") {
      callBack(null, "./public");
    }else if (file.fieldname === "singerImg") {
      callBack(null, "./public");
    }
  },
  filename: (req, file, callBack) => {
    if (file.fieldname === "genre_image") {
      const filename =
        req.body.genre +
        "-genre" +
        "-" +
        moment() +
        path.extname(file.originalname);
      image_path = "uploads/genre/" + filename;
    } else if (file.fieldname === "language_image") {
      const filename =
        req.body.lang +
        "-language" +
        "-" +
        moment() +
        path.extname(file.originalname);
      // console.log(filename);
      image_path = "uploads/language/" + filename;
    }else if (file.fieldname === "channelImage") {
      const filename =
        req.body.channelName +
        "-channel" +
        "-" +
        moment() +
        path.extname(file.originalname);
      // console.log(filename);
      image_path = "uploads/channel/" + filename;
    }  
    else if (file.fieldname === "singerImg") {
      const filename =
        req.body.name.replace(/\s+/g, '_')  +
        "-singer" +
        "-" +
        moment() +
        path.extname(file.originalname);
      // console.log(filename);
      image_path = "uploads/singer/" + filename;
    }  
    else if (file.fieldname === "ott_image") {
      const filename =
        req.body.name +
        "-ott_image" +
        "-" +
        moment() +
        path.extname(file.originalname);
      image_path = "uploads/ott_image/" + filename;
    } else if (file.fieldname === "update_genre_image") {
      const filename =
        req.body.genre +
        "-genre" +
        "-" +
        moment() +
        path.extname(file.originalname);
      image_path = "uploads/genre/" + filename;
    } else if (file.fieldname === "update_language_image") {
      const filename =
        req.body.name +
        "-language" +
        "-" +
        moment() +
        path.extname(file.originalname);
      image_path = "uploads/language/" + filename;
    } else if (file.fieldname === "update_ott_image") {
      const filename =
        req.body.name +
        "-ott_image" +
        "-" +
        moment() +
        path.extname(file.originalname);
      image_path = "uploads/ott_image/" + filename;
    } else if (
      file.fieldname === "content_image" ||
      file.fieldname === "content_banner" || 
      file.fieldname === "content_poster"
    ) {
      const filename =
        req.body.name.replace(/\s+/g, '_') +
        "-image" +
        "-" +
        moment() +
        path.extname(file.originalname);
      image_path = "uploads/content/" + filename;
    } else if (
      file.fieldname === "update_content_image" ||
      file.fieldname === "update_content_banner" ||
      file.fieldname === "update_content_poster" 
    ) {
      const filename =
        req.body.name.replace(/\s+/g, '_') + "-image-" + moment() + path.extname(file.originalname);
      image_path = "uploads/content/" + filename;
    } else if (file.fieldname === "advertisement_image") {
      const filename = "image-" + moment() + path.extname(file.originalname);
      image_path = "uploads/advertisement/" + filename;
    } else if (file.fieldname === "update_add_image") {
      const filename = "image-" + moment() + path.extname(file.originalname);
      image_path = "uploads/advertisement/" + filename;
    } else if (file.fieldname === "poster_image") {
      const filename =
        req.body.name + "-poster-" + moment() + path.extname(file.originalname);
      image_path = "uploads/poster/" + filename;
    } else if (file.fieldname === "type_image") {
      const filename =
        req.body.name + "-image-" + moment() + path.extname(file.originalname);
      image_path = "uploads/type/" + filename;
    } else if (file.fieldname === "update_type_image") {
      const filename =
        req.body.name + "-image-" + moment() + path.extname(file.originalname);
      image_path = "uploads/type/" + filename;
    }

    callBack(null, image_path); //filename
  },
});

var upload = multer({
  storage: storage,
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
                    "A",
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
                    "A",
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

router.post("/add_lang", upload.any(), function (req, res, next) {
  var lang = req.body.lang.trim().toUpperCase();
  var image = req.files[0].filename;
  var inserted_by = req.body.inserted_by;

  if (lang && lang !== "") {
    var query = "select * from language where name ='" + lang + "'";

    db.result(query)
      .then((result) => {
        if (result.rowCount === 1) {
          res.status(500).json({ success: false, msg: "Language Exists" });
        } else {
          var queryI =
            "INSERT INTO language (name, image, inserted_date, inserted_by, updated_by, updated_date) VALUES ('" +
            lang +
            "', '" +
            image +
            "', now() ,'" +
            inserted_by +
            "', '" +
            inserted_by +
            "', now())";

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
  } else {
    res.status(500).json({ success: false, msg: "Language is Required" });
  }
});

router.post("/update_lang", upload.any(), function (req, res, next) {
  var id = req.body.id;
  var name = req.body.name.toUpperCase().trim();
  var oldImg = req.body.oldImg;
  // console.log(req.files);
  var updated_by = req.body.updated_by;

  if (name && name !== "") {
    var query =
      "select * from language where id != '" +
      id +
      "' and name = '" +
      name +
      "'";

    db.result(query)
      .then((result) => {
        if (result.rows.length === 1) {
          res.status(500).json({ success: false, msg: "Language Exists" });
        } else {
          var query = "select * from language where id = '" + id + "'";
          if (req.files && req.files.length !== 0) {
            var image = req.files[0].filename;

            db.result(query)
              .then((result) => {
                if (result.rowCount === 1) {
                  var queryI =
                    "update language set name= '" +
                    name +
                    "', image = '" +
                    image +
                    "', updated_by = '" +
                    updated_by +
                    "', updated_date = now() where id = '" +
                    id +
                    "'";

                  db.result(queryI)
                    .then((resultI) => {
                      res
                        .status(200)
                        .json({ success: true, msg: "Language Updated" });
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
                res.status(500).json({ success: false, msg: "Server Error" });
              });
          } else {
            var image = oldImg;

            db.result(query)
              .then((result) => {
                if (result.rowCount === 1) {
                  var queryI =
                    "update language set name= '" +
                    name +
                    "', image = '" +
                    image +
                    "', updated_by = '" +
                    updated_by +
                    "', updated_date = now() where id = '" +
                    id +
                    "'";

                  // console.log(queryI);

                  db.result(queryI)
                    .then((resultI) => {
                      res
                        .status(200)
                        .json({ success: true, msg: "Language Updated" });
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
                res.status(500).json({ success: false, msg: "Server Error" });
              });
          }
        }
      })
      .catch((err) => {
        res.status(500).json({ success: false, msg: "Server Error" });
      });
  } else {
    res.status(500).json({ success: false, msg: "Language is Required" });
  }
});

router.post("/add_genre", upload.any(), function (req, res, next) {
  var genre = req.body.genre.toUpperCase().trim();
  let type = req.body.type.toUpperCase().trim();
  var image = req.files[0].filename;
  var inserted_by = req.body.inserted_by;
  if (genre && genre !== "") {
    var query = "select * from genere where name = '" + genre + "'";

    db.result(query)
      .then((result) => {
        if (result.rowCount === 1) {
          res.status(500).json({ success: false, msg: "Genre Exists" });
        } else {
          var queryG =
            `INSERT INTO genere (name, image, type, inserted_date, inserted_by, updated_by, updated_date) VALUES ('${genre}', '${image}','${type}', now() , '${inserted_by}', '${inserted_by}', now())`;

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
  } else {
    res.status(500).json({ success: false, msg: "Genre Name is Required" });
  }
});

router.post("/update_genre", upload.any(), function (req, res, next) {
  var id = req.body.id;
  var name = req.body.name.toUpperCase().trim();
  let type = req.body.type.toUpperCase().trim();
  var oldImg = req.body.oldImg;
  // var image = req.files[0].filename;
  var updated_by = req.body.updated_by;

  if (name && name !== "") {
    var query =
      "select * from genere where id != '" + id + "' and name = '" + name + "'";

    db.result(query)
      .then((result) => {
        if (result.rows.length === 1) {
          res.status(500).json({ success: false, msg: "Genre Exists" });
        } else {
          var query = "select * from genere where id = '" + id + "'";
          if (req.files && req.files.length !== 0) {
            var image = req.files[0].filename;
            db.result(query)
              .then((result) => {
                if (result.rows.length === 1) {
                  var queryI =
                    "update genere set name= '" +
                    name +
                    "', type = '" +
                    type +
                    "', image = '" +
                    image +
                    "', updated_by = '" +
                    updated_by +
                    "', updated_date = now() where id = '" +
                    id +
                    "'";
                  db.result(queryI)
                    .then((result) => {
                      res
                        .status(200)
                        .json({ success: true, msg: "Genre Updated" });
                    })
                    .catch((err) => {
                      res
                        .status(500)
                        .json({ success: false, msg: "Server Error" });
                    });
                }
              })
              .catch((err) => {
                res.status(500).json({ success: false, msg: "Server Error" });
              });
          } else {
            var image = oldImg;

            var queryI =
              "update genere set name= '" +
              name +
              "', image = '" +
              image +
              "', updated_by = '" +
              updated_by +
              "', updated_date = now() where id = '" +
              id +
              "'";

            db.result(queryI)
              .then((result) => {
                res.status(200).json({ success: true, msg: "Genre Updated" });
              })
              .catch((err) => {
                res.status(500).json({ success: false, msg: "Server Error" });
              });
          }
        }
      })
      .catch((err) => {
        res.status(500).json({ success: false, msg: "Server Error" });
      });
  } else {
    res.status(500).json({ success: false, msg: "Genre is Required" });
  }
});

router.post("/add_ott_app", upload.any(), function (req, res, next) {
  var { name, oldImage, lcn_no, status, subscription, link, inserted_by } =
    req.body;

  if (name && name !== "") {
    if (lcn_no && lcn_no !== "") {
      var query = "select * from ott_app where lcn_no = '" + lcn_no + "'";

      db.result(query)
        .then((result) => {
          if (result.rowCount === 1) {
            res.status(500).json({ successs: false, msg: "LCN No Exists" });
          } else {
            if (req.files && req.files.length !== 0) {
              var image = req.files[0].filename;

              var queryI =
                "SELECT public.ott_app_ins(0, 1, $1, $2, $3, $4, $5, $6, $7, $8)";

              db.result(queryI, [
                name,
                image,
                lcn_no,
                status,
                subscription,
                link,
                inserted_by,
                inserted_by,
              ])
                .then((resultI) => {
                  // console.log(resultI);
                  var out_error_code = resultI.rows[0].ott_app_ins;
                  if (out_error_code == 0) {
                    res.status(200).json({
                      success: true,
                      msg: "OTT Added",
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
                  res.status(500).json({ success: false, msg: "Server Error" });
                });
            } else {
              var image = oldImage;

              var queryI =
                "SELECT public.ott_app_ins(0, 1, $1, $2, $3, $4, $5, $6, $7, $8)";

              db.result(queryI, [
                name,
                image,
                lcn_no,
                status,
                subscription,
                link,
                inserted_by,
                inserted_by,
              ])
                .then((resultI) => {
                  // console.log(resultI);
                  var out_error_code = resultI.rows[0].ott_app_ins;
                  if (out_error_code == 0) {
                    res.status(200).json({
                      success: true,
                      msg: "OTT Added",
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
                  res.status(500).json({ success: false, msg: "Server Error" });
                });
            }
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ success: false, msg: "Serverv Error" });
        });
    } else {
      res.status(500).json({ success: false, msg: "LCN No is required" });
    }
  } else {
    res.status(500).json({ success: false, msg: "Name is required" });
  }
});

router.post("/update_ott_app", upload.any(), function (req, res, next) {
  var {
    id,
    name,
    oldImg,
    lcn_no,
    status,
    subscription,
    link,
    updated_by,
    updated_by,
  } = req.body;

  if (name && name !== "") {
    if (lcn_no && lcn_no !== "") {
      var query =
        "select * from ott_app where id != '" +
        id +
        "' and lcn_no = '" +
        lcn_no +
        "'";

      db.result(query)
        .then((result) => {
          if (result.rows && result.rows.length === 1) {
            res.status(500).json({ success: false, msg: "LCN No Exists" });
          } else {
            if (req.files && req.files.length !== 0) {
              var image = req.files[0].filename;
              var queryI =
                "select public.ott_app_ins(1, $1, $2, $3, $4, $5, $6, $7, $8, $9)";

              db.result(queryI, [
                id,
                name,
                image,
                lcn_no,
                status,
                subscription,
                link,
                updated_by,
                updated_by,
              ])
                .then((resultI) => {
                  // console.log(resultI);
                  var out_error_code = resultI.rows[0].ott_app_ins;
                  if (out_error_code == 0) {
                    res
                      .status(200)
                      .json({ success: true, msg: "Ott App Updated" });
                  } else {
                    res
                      .status(500)
                      .json({ success: false, msg: "Something Went Wrong" });
                  }
                })
                .catch((err) => {
                  console.log(err);
                  res
                    .status(500)
                    .json({ success: false, msg: "Something Went Wrong" });
                });
            } else {
              var image = oldImg;
              var queryI =
                "select public.ott_app_ins(1, $1, $2, $3, $4, $5, $6, $7, $8, $9)";

              db.result(queryI, [
                id,
                name,
                image,
                lcn_no,
                status,
                subscription,
                link,
                updated_by,
                updated_by,
              ])
                .then((resultI) => {
                  // console.log(resultI);
                  var out_error_code = resultI.rows[0].ott_app_ins;
                  if (out_error_code == 0) {
                    res
                      .status(200)
                      .json({ success: true, msg: "Ott App Updated" });
                  } else {
                    res
                      .status(500)
                      .json({ success: false, msg: "Something Went Wrong" });
                  }
                })
                .catch((err) => {
                  console.log(err);
                  res
                    .status(500)
                    .json({ success: false, msg: "Something Went Wrong" });
                });
            }
          }
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: "Server Error" });
        });
    } else {
      res.status(500).json({ success: false, msg: "LCN No is Required" });
    }
  } else {
    res.status(500).json({ success: false, msg: "Name is required" });
  }
});

router.get("/all_lang", function (req, res, next) {
  var query = "select * from language";

  db.result(query)
    .then((result) => {
      // console.log(result.rows);
      res.status(200).json({ success: true, data: result.rows });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, error: err.message });
    });
});

router.get("/lang_by_id/:id", function (req, res, next) {
  var id = req.params.id;

  var query = "select * from language where id = '" + id + "'";

  db.result(query)
    .then((result) => {
      // console.log(result.rows);
      res.status(200).json({ success: true, data: result.rows });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, error: err.message });
    });
});

router.get("/all_genre", function (req, res, next) {
  var query = "select * from genere"

  db.result(query)
    .then((result) => {
      // console.log(result.rows);
      res.status(200).json({ success: true, data: result.rows });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, err: err.message });
    });
});


router.get("/all_genre/:type", function (req, res, next) {
  let type = req.params.type
  let typeUpper = type.toUpperCase()
  var query = "select * from genere where type = '"+ typeUpper + "'";

  db.result(query)
    .then((result) => {
      // console.log(result.rows);
      res.status(200).json({ success: true, data: result.rows });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, err: err.message });
    });
});

router.get("/all_genre_android/:type", function (req, res, next) {
  let type = req.params.type
  let typeUpper = type.toUpperCase()
  var query = "select * from genere where type = '"+ typeUpper + "'";


  db.result(query)
    .then((result) => {
      // console.log(result.rows);
      res.status(200).json({ success: true, data: result.rows });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, err: err.message });
    });
});

router.get("/genre_by_id/:id", function (req, res, next) {
  var id = req.params.id;

  var query = "select * from genere where id = '" + id + "'";

  db.result(query)
    .then((result) => {
      res.status(200).json({ success: true, data: result.rows });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, error: error.message });
    });
});

router.get("/ott_app", function (req, res, next) {
  var query = "select * from ott_app";

  db.result(query)
    .then((result) => {
      res.status(200).json({ success: true, data: result.rows });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, error: error.message });
    });
});

router.get("/ott_app_android", function (req, res, next) {
  var query = "select * from ott_app";

  db.result(query)
    .then((result) => {
      res.status(200).json({ success: true, data: result.rows });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, error: error.message });
    });
});

router.get("/ott_app_trending_android", function (req, res, next) {
  var query = "select * from ott_app where id in (7,9,29,46,19,52,10,15,17,38,51,20)";

  db.result(query)
    .then((result) => {
      res.status(200).json({ success: true, data: result.rows });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, error: error.message });
    });
});

router.get("/ott_app/:id", function (req, res, next) {
  var id = req.params.id;

  var query = "select * from ott_app where id = '" + id + "'";

  db.result(query)
    .then((result) => {
      res.status(200).json({ success: true, data: result.rows });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, error: error.message });
    });
});

// router.post("/add_content", upload.any(), function (req, res, next) {
//   var name = req.body.name; //
//   var image = req.files[0].filename; //
//   var trailer = req.body.trailer;
//   var banner = req.files[1].filename; //
//   var type = req.body.type; //
//   // var genre = req.body.genre;
//   // var language = req.body.language;
//   // var ott = req.body.ott;
//   // var subtitle = req.body.subtitle;
//   var lcn_no = req.body.content_lcn_no; //
//   var subscription = req.body.subscription;
//   var description = req.body.description;
//   var status = req.body.status;
//   var position = req.body.position; //
//   var inserted_by = req.body.inserted_by;
//   var content_release_date = req.body.content_release_date;
//   var ua = req.body.ua;
//   var url = req.body.url; //

//   if (name && name !== "") {
//     if (image && image !== "") {
//       if (banner && banner !== "") {
//         if (type && type !== "") {
//           if (lcn_no && lcn_no !== "") {
//             if (position && position !== "") {
//               if (url && url !== "") {
//                 var query =
//                   "select * from content_def where name = '" + name + "'";

//                 db.result(query)
//                   .then((result) => {
//                     if (result.rows.length >= 1) {
//                       res
//                         .status(200)
//                         .json({ success: false, msg: "Movie Exists" });
//                     } else {
//                       const content_def = "content_def_ins";

//                       let arrayGenre = JSON.parse(req.body.genre);
//                       let arrayLanguage = JSON.parse(req.body.language);
//                       let arrayOtt = JSON.parse(req.body.ott);
//                       let arraySubtitle = JSON.parse(req.body.subtitle);

//                       arrayGenre = `{${arrayGenre.join(",")}}`;
//                       arrayLanguage = `{${arrayLanguage.join(",")}}`;
//                       arrayOtt = `{${arrayOtt.join(",")}}`;
//                       arraySubtitle = `{${arraySubtitle.join(",")}}`;

//                       // var queryI =
//                       //   "SELECT public.content_def_ins(0, 1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)";

//                       db.func(content_def, [
//                         0,
//                         1,
//                         name,
//                         image,
//                         trailer,
//                         banner,
//                         type,
//                         arrayGenre,
//                         arrayLanguage,
//                         arrayOtt,
//                         arraySubtitle,
//                         lcn_no,
//                         subscription,
//                         description,
//                         status,
//                         position,
//                         inserted_by,
//                         inserted_by,
//                         content_release_date,
//                         ua,
//                         url,
//                       ])
//                         .then((result) => {
//                           var out_error_code = result[0].out_error;
//                           if (out_error_code === 0) {
//                             res
//                               .status(200)
//                               .json({ success: true, msg: "Movie Added" });
//                           } else {
//                             res.status(500).json({
//                               success: false,
//                               msg: "Something Went Wrong",
//                             });
//                           }
//                         })
//                         .catch((err) => {
//                           res
//                             .status(500)
//                             .json({ success: false, msg: "Server Error" });
//                         });
//                     }
//                   })
//                   .catch((err) => {
//                     console.log(err);
//                     res
//                       .status(500)
//                       .json({ success: false, msg: "Server Error" });
//                   });
//               } else {
//                 res
//                   .status(500)
//                   .json({ success: false, msg: "URL is Required" });
//               }
//             } else {
//               res
//                 .status(500)
//                 .json({ success: false, msg: "Position is Required" });
//             }
//           } else {
//             res.status(500).json({ success: false, msg: "LCN NO is Required" });
//           }
//         } else {
//           res.status(500).json({ succes: false, msg: "Type is Required" });
//         }
//       } else {
//         res.status(500).json({ success: false, msg: "Banner is Required" });
//       }
//     } else {
//       res.status(500).json({ success: false, msg: "Image is Required" });
//     }
//   } else {
//     res.status(500).json({ success: false, msg: "Name is Required" });
//   }
// });

// router.post("/add_content", upload.any(), function (req, res, next) {
//   var name = req.body.name; //
//   var image = req.files[0].filename; //
//   var trailer = req.body.trailer;
//   var banner = req.files[1].filename; //
//   // var type = req.body.type; 
//   var type = 11; 
//   // var genre = req.body.genre;
//   // var language = req.body.language;
//   // var ott = req.body.ott;
//   // var subtitle = req.body.subtitle;
//   var lcn_no = req.body.content_lcn_no; //
//   var subscription = req.body.subscription;
//   var description = req.body.description;
//   var status = req.body.status;
//   var position = req.body.position; //
//   var inserted_by = req.body.inserted_by;
//   var content_release_date = req.body.content_release_date;
//   var ua = req.body.ua;
//   var url = req.body.url; //
//   var content_url_type = req.body.content_url_type;
//   // var content_url_type = 'web';

//   if (name && name !== "") {
//     if (image && image !== "") {
//       if (banner && banner !== "") {
//         if (type && type !== "") {
//           if (lcn_no && lcn_no !== "") {
//             if (position && position !== "") {
//               if (url && url !== "") {
//                 var query =
//                   "select * from content_def where name = '" + name + "'";

//                 db.result(query)
//                   .then((result) => {
//                     if (result.rows.length !== 0) {
//                       res
//                         .status(200)
//                         .json({ success: false, msg: "Movie Exists" });
//                     } else {
//                       const content_def = "content_def_ins";

//                       let arrayGenre = JSON.parse(req.body.genre);
//                       let arrayLanguage = JSON.parse(req.body.language);
//                       let arrayOtt = JSON.parse(req.body.ott);
//                       let arraySubtitle = JSON.parse(req.body.subtitle);

//                       arrayGenre = `{${arrayGenre.join(",")}}`;
//                       arrayLanguage = `{${arrayLanguage.join(",")}}`;
//                       arrayOtt = `{${arrayOtt.join(",")}}`;
//                       arraySubtitle = `{${arraySubtitle.join(",")}}`;

//                       // var queryI =
//                       //   "SELECT public.content_def_ins(0, 1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)";

//                       db.func(content_def, [
//                         0,
//                         1,
//                         name,
//                         image,
//                         trailer,
//                         banner,
//                         type,
//                         arrayGenre,
//                         arrayLanguage,
//                         arrayOtt,
//                         arraySubtitle,
//                         lcn_no,
//                         subscription,
//                         description,
//                         status,
//                         position,
//                         inserted_by,
//                         inserted_by,
//                         content_release_date,
//                         ua,
//                         url,
//                         content_url_type,
//                       ])
//                         .then((result) => {
//                           var out_error_code = result[0].out_error;
//                           if (out_error_code === 0) {
//                             res
//                               .status(200)
//                               .json({ success: true, msg: "Movie Added" });
//                           } else {
//                             res.status(500).json({
//                               success: false,
//                               msg: "Something Went Wrong",
//                             });
//                           }
//                         })
//                         .catch((err) => {
//                           res
//                             .status(500)
//                             .json({ success: false, msg: "Server Error" });
//                         });
//                     }
//                   })
//                   .catch((err) => {
//                     console.log(err);
//                     res
//                       .status(500)
//                       .json({ success: false, msg: "Server Error" });
//                   });
//               } else {
//                 res
//                   .status(500)
//                   .json({ success: false, msg: "URL is Required" });
//               }
//             } else {
//               res
//                 .status(500)
//                 .json({ success: false, msg: "Position is Required" });
//             }
//           } else {
//             res.status(500).json({ success: false, msg: "LCN NO is Required" });
//           }
//         } else {
//           res.status(500).json({ succes: false, msg: "Type is Required" });
//         }
//       } else {
//         res.status(500).json({ success: false, msg: "Banner is Required" });
//       }
//     } else {
//       res.status(500).json({ success: false, msg: "Image is Required" });
//     }
//   } else {
//     res.status(500).json({ success: false, msg: "Name is Required" });
//   }
// });

// New Add Content API by Deepak Jadiwal Start
router.post("/add_content", upload.any(), function (req, res, next) {
  let name = req.body.name;
  let image = req.files[0].filename;
  let trailer = req.body.trailer;
  let banner = req.files[1].filename;
  let type = 11;
  let lcn_no = req.body.content_lcn_no;
  let subscription = req.body.subscription;
  let description = req.body.description;
  let status = req.body.status;
  let position = req.body.position;
  let inserted_by = req.body.inserted_by;
  let content_release_date = req.body.content_release_date;
  let ua = req.body.ua;
  let url = req.body.url;
  let content_url_type = req.body.content_url_type;
  let content_poster = req.files[2].filename;

  // Validation for required fields
  if (!name || !image || !banner || !type || !lcn_no || !position || !url) {
    return res.status(400).json({ success: false, msg: "All fields are required" });
  }

  // Check if the movie already exists
  let query = "SELECT * FROM content_def WHERE name = $1";
  db.query(query, [name])
    .then((result) => {
      if (result.length !== 0) {
        return res.status(200).json({ success: false, msg: "Movie already exists" });
      } else {
        // Inserting the movie into the database
        let insertQuery = `
          INSERT INTO public.content_def
          (name, image, trailer, banner, type, 
          content_lcn_no, subscription, description, 
          status, position, inserted_by, inserted_date, 
          updated_by, updated_date, content_release_date, 
          ua, url, content_url_type,poster_img)
          VALUES ($1, $2, $3, $4, $5, 
          $6, $7, $8, $9, $10, $11, now(), 
          $12, now(), $13, $14, $15, $16, $17)
        `;
        
        db.query(insertQuery, [name, image, trailer, banner, type, 
          lcn_no, subscription, description, status, position, 
          inserted_by, inserted_by, content_release_date, ua, url, content_url_type,content_poster  ])
          .then(() => {
            res.status(200).json({ success: true, msg: "Movie Added" });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Server Error" });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});


router.post("/update_content", upload.any(), function (req, res, next) {
  let id = req.body.id;
  let name = req.body.name;
  let oldImage = req.body.oldImage;
  let trailer = req.body.trailer;
  let oldBanner = req.body.oldBanner;
  let type = req.body.type;
  let lcn_no = req.body.content_lcn_no;
  let subscription = req.body.subscription;
  let description = req.body.description;
  let status = req.body.status;
  let position = req.body.position;
  let updated_by = req.body.updated_by;
  let content_release_date = req.body.content_release_date;
  let ua = req.body.ua;
  let url = req.body.url;
  let genre = req.body.genre;
  let ott = req.body.ott;
  let language = req.body.language;
  let subtitle = req.body.subtitle;
  let url_type = req.body.url_type;
  let oldPoster = req.body.oldPoster;

  // Validation for required fields
  if (!name || !oldImage || !type || !lcn_no || !position || !url || !language || !genre || !ott) {
    return res.status(500).json({ success: false, msg: "All required fields are not provided" });
  }

  // Check if the position is taken by another content
  let queryPosition = "SELECT * FROM content_def WHERE position = $1 AND id != $2";
  db.query(queryPosition, [position, id])
    .then((resultPosition) => {
      if (resultPosition.length === 1) {
        return res.status(500).json({ success: false, msg: "Position already taken" });
      } else {
        // Check if the LCN No already exists
        let queryLCN = "SELECT * FROM content_def WHERE content_lcn_no = $1 AND id != $2";
        db.query(queryLCN, [lcn_no, id])
          .then((resultLCN) => {
            if (resultLCN.length === 1) {
              return res.status(500).json({ success: false, msg: "LCN No already exists" });
            } else {
              // Check if the content with given ID exists
              let queryContent = "SELECT * FROM content_def WHERE id = $1";
              db.query(queryContent, [id])
                .then((resultContent) => {
                  if (resultContent.length === 1) {
                    let image = oldImage;
                    let banner = oldBanner;
                    let poster_img = oldPoster;

                    // Determine new image, banner, and poster_img if provided
                    if (req.files && req.files.length !== 0) {
                      req.files.forEach((file) => {
                        if (file.fieldname === "update_content_image") {
                          image = file.filename;
                        } else if (file.fieldname === "update_content_banner") {
                          banner = file.filename;
                        } else if (file.fieldname === "update_content_poster") {
                          poster_img = file.filename;
                        }
                      });
                    }

                    let arrayGenre = JSON.parse(genre);
                    let arrayOtt = JSON.parse(ott);
                    let arrayLanguage = JSON.parse(language);
                    let arraySubtitle = JSON.parse(subtitle);

                    let updateQuery = `
                      UPDATE public.content_def
                      SET 
                        name = $1, image = $2, trailer = $3, banner = $4, type = $5,
                        genre = $6, language = $7, ott = $8, subtitle = $9,
                        content_lcn_no = $10, subscription = $11, description = $12,
                        status = $13, position = $14, updated_by = $15,
                        updated_date = now(), content_release_date = $16,
                        ua = $17, url = $18, content_url_type = $19, poster_img = $20
                      WHERE 
                        id = $21
                    `;

                    db.query(updateQuery, [name, image, trailer, banner, type,
                      arrayGenre, arrayLanguage, arrayOtt, arraySubtitle, lcn_no,
                      subscription, description, status, position, updated_by,
                      content_release_date, ua, url, url_type, poster_img, id])
                      .then(() => {
                        res.status(200).json({ success: true, msg: "Movie Updated" });
                      })
                      .catch((err) => {
                        console.error(err);
                        res.status(500).json({ success: false, msg: "Server Error" });
                      });
                  } else {
                    res.status(500).json({ success: false, msg: "No matching ID" });
                  }
                })
                .catch((err) => {
                  console.error(err);
                  res.status(500).json({ success: false, msg: "Server Error" });
                });
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Server Error" });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

// New Add Content API by Deepak Jadiwal End


// router.post("/update_content", upload.any(), function (req, res, next) {
//   var id = req.body.id;
//   var name = req.body.name;
//   var oldImage = req.body.oldImage;
//   var trailer = req.body.trailer;
//   var oldBanner = req.body.oldBanner;
//   var type = req.body.type;
//   var lcn_no = req.body.content_lcn_no;
//   var subscription = req.body.subscription;
//   var description = req.body.description;
//   var status = req.body.status;
//   var position = req.body.position;
//   var updated_by = req.body.updated_by;
//   var content_release_date = req.body.content_release_date;
//   var ua = req.body.ua;
//   var url = req.body.url;
//   var genre = req.body.genre;
//   var ott = req.body.ott;
//   var language = req.body.language;
//   var subtitle = req.body.subtitle;
//   var url_type = req.body.url_type;
//   var oldPoster = req.body.oldPoster;

//   if (name && name !== "") {
//     if (oldImage && oldImage !== "") {
//       if (type && type !== "") {
//         if (lcn_no && lcn_no !== "") {
//           if (position && position !== "") {
//             if (url && url !== "") {
//               if (language && language !== "") {
//                 if (genre && genre !== "") {
//                   if (ott && ott !== "") {
//                     var query =
//                       "select * from content_def where position ='" +
//                       position +
//                       "' and id != '" +
//                       id +
//                       "'";

//                     db.result(query)
//                       .then((result) => {
//                         if (result.rows && result.rows.length === 1) {
//                           res
//                             .status(500)
//                             .json({ success: false, msg: "Position Taken" });
//                         } else {
//                           var query1 =
//                             "select * from content_def where content_lcn_no = '" +
//                             lcn_no +
//                             "' and id != '" +
//                             id +
//                             "'";

//                           db.result(query1)
//                             .then((result1) => {
//                               if (result1.rows && result1.rows.length === 1) {
//                                 res.status(500).json({
//                                   success: false,
//                                   msg: "LCN No Exists",
//                                 });
//                               } else {
//                                 var query2 =
//                                   "select * from content_def where id = '" +
//                                   id +
//                                   "'";

//                                 db.result(query2)
//                                   .then((result2) => {
//                                     if (result2.rows.length === 1) {
//                                       if (req.files && req.files.length !== 0) {
//                                         if (
//                                           req.files[0] &&
//                                           req.files[0].fieldname ===
//                                             "update_content_image"
//                                         ) {
//                                           var image = req.files[0].filename;
//                                         } else if (
//                                           req.files[1] &&
//                                           req.files[1].fieldname ===
//                                             "update_content_image"
//                                         ) {
//                                           var image = req.files[1].filename;
//                                         } else {
//                                           var image = oldImage;
//                                         }

//                                         if (
//                                           req.files[0] &&
//                                           req.files[0].fieldname ===
//                                             "update_content_banner"
//                                         ) {
//                                           var banner = req.files[0].filename;
//                                         } else if (
//                                           req.files[1] &&
//                                           req.files[1].fieldname ===
//                                             "update_content_banner"
//                                         ) {
//                                           var banner = req.files[1].filename;
//                                         } else {
//                                           var banner = oldBanner;
//                                         }

//                                         if (
//                                           req.files[0] &&
//                                           req.files[0].fieldname ===
//                                             "update_poster_img"
//                                         ) {
//                                           var poster_img = req.files[0].filename;
//                                         } else if (
//                                           req.files[1] &&
//                                           req.files[1].fieldname ===
//                                             "update_poster_img"
//                                         ) {
//                                           var poster_img = req.files[1].filename;
//                                         } else {
//                                           var poster_img = oldPoster;
//                                         }

//                                         const content_def = "content_def_ins";

//                                         let arrayGenre = JSON.parse(genre);
//                                         let arrayOtt = JSON.parse(ott);
//                                         let arrayLanguage =
//                                           JSON.parse(language);
//                                         let arraySubtitle =
//                                           JSON.parse(subtitle);

//                                         arrayGenre = `{${arrayGenre.join(
//                                           ","
//                                         )}}`;
//                                         arrayLanguage = `{${arrayLanguage.join(
//                                           ","
//                                         )}}`;
//                                         arrayOtt = `{${arrayOtt.join(",")}}`;
//                                         arraySubtitle = `{${arraySubtitle.join(
//                                           ","
//                                         )}}`;

//                                         db.func(content_def, [
//                                           1,
//                                           id,
//                                           name,
//                                           image,
//                                           trailer,
//                                           banner,
//                                           type,
//                                           arrayGenre,
//                                           arrayLanguage,
//                                           arrayOtt,
//                                           arraySubtitle,
//                                           lcn_no,
//                                           subscription,
//                                           description,
//                                           status,
//                                           position,
//                                           updated_by,
//                                           updated_by,
//                                           content_release_date,
//                                           ua,
//                                           url,
//                                           url_type,
//                                           poster_img
//                                         ])
//                                           .then((result) => {
//                                             var out_error_code =
//                                               result[0].out_error;
//                                             if (out_error_code === 0) {
//                                               res.status(200).json({
//                                                 success: true,
//                                                 msg: "Movie Updated",
//                                               });
//                                             } else {
//                                               res.status(500).json({
//                                                 success: false,
//                                                 msg: "Something Went Wrong",
//                                               });
//                                             }
//                                           })
//                                           .catch((err) => {
//                                             console.log(err);
//                                             res.status(500).json({
//                                               success: false,
//                                               msg: "Server Error",
//                                             });
//                                           });
//                                       } else {
//                                         var image = oldImage;
//                                         var banner = oldBanner;
//                                         var poster_img = oldPoster

//                                         const content_def = "content_def_ins";

//                                         let arrayGenre = JSON.parse(genre);
//                                         let arrayLanguage =
//                                           JSON.parse(language);
//                                         let arrayOtt = JSON.parse(ott);
//                                         let arraySubtitle =
//                                           JSON.parse(subtitle);

//                                         arrayGenre = `{${arrayGenre.join(
//                                           ","
//                                         )}}`;
//                                         // console.log(arrayGenre);
//                                         arrayLanguage = `{${arrayLanguage.join(
//                                           ","
//                                         )}}`;
//                                         arrayOtt = `{${arrayOtt.join(",")}}`;
//                                         arraySubtitle = `{${arraySubtitle.join(
//                                           ","
//                                         )}}`;

//                                         db.func(content_def, [
//                                           1,
//                                           id,
//                                           name,
//                                           image,
//                                           trailer,
//                                           banner,
//                                           type,
//                                           arrayGenre,
//                                           arrayLanguage,
//                                           arrayOtt,
//                                           arraySubtitle,
//                                           lcn_no,
//                                           subscription,
//                                           description,
//                                           status,
//                                           position,
//                                           updated_by,
//                                           updated_by,
//                                           content_release_date,
//                                           ua,
//                                           url,
//                                           url_type,
//                                           poster_img
//                                         ])
//                                           .then((result) => {
//                                             var out_error_code =
//                                               result[0].out_error;
//                                             if (out_error_code === 0) {
//                                               res.status(200).json({
//                                                 success: true,
//                                                 msg: "Movie Updated",
//                                               });
//                                             } else {
//                                               res.status(500).json({
//                                                 success: false,
//                                                 msg: "Something Went Wrong",
//                                               });
//                                             }
//                                           })
//                                           .catch((err) => {
//                                             console.log(err);
//                                             res.status(500).json({
//                                               success: false,
//                                               msg: "Server Error",
//                                             });
//                                           });
//                                       }
//                                     } else {
//                                       res.status(500).json({
//                                         success: false,
//                                         msg: "No Matching Id",
//                                       });
//                                     }
//                                   })
//                                   .catch((err) => {
//                                     console.log(err);
//                                     res.status(500).json({
//                                       success: false,
//                                       msg: "Server Error",
//                                     });
//                                   });
//                               }
//                             })
//                             .catch((err) => {
//                               res.status(500).json({
//                                 succes: false,
//                                 msg: "Something Went Wrong",
//                               });
//                             });
//                         }
//                       })
//                       .catch((err) => {
//                         res
//                           .status(500)
//                           .json({ succes: false, msg: "Something Went Wrong" });
//                       });
//                   } else {
//                     res
//                       .status(500)
//                       .json({ success: false, msg: "Ott is Required" });
//                   }
//                 } else {
//                   res
//                     .status(500)
//                     .json({ success: false, msg: "Genre is Required" });
//                 }
//               } else {
//                 res
//                   .status(500)
//                   .json({ succes: false, msg: "Language is Required" });
//               }
//             } else {
//               res.status(500).json({ success: false, msg: "URL is Required" });
//             }
//           } else {
//             res
//               .status(500)
//               .json({ success: false, msg: "Position is Required" });
//           }
//         } else {
//           res.status(500).json({ success: false, msg: "LCN No is Required" });
//         }
//       } else {
//         res.status(500).json({ success: false, msg: "Type is Required" });
//       }
//     } else {
//       res.status(500).json({ success: false, msg: "Image is Required" });
//     }
//   } else {
//     res.status(500).json({ success: false, msg: "Name is required" });
//   }
// });

// router.get("/all_content", async function (req, res, next) {
//   var query = `SELECT id, "name", image, trailer, banner, "type", genre, "language", ott, subtitle, content_lcn_no, "subscription", description, status, "position", inserted_by, inserted_date, updated_by, updated_date, ua, url, content_release_date
//   FROM public.content_def;
//   `;

//   await db
//     .result(query)
//     .then(async (result) => {
//       var data = result.rows;
//       // console.log(data);
//       for (let index = 0; index < data.length; index++) {
//         const ott = [];
//         if (data[index].ott && data[index].ott.length !== 0) {
//           for (let i = 0; i < data[index].ott.length; i++) {
//             // console.log(data[index].ott[i]);
//             const query1 =
//               `select id, name from ott_app where id = ` + data[index].ott[i];
//             await db
//               .result(query1)
//               .then((result1) => {
//                 var data1 = result1.rows;
//                 // console.log(data1);
//                 ott.push(...data1);
//               })
//               .catch((err) => {
//                 res.status(500).json({ success: false, msg: "Server Error" });
//               });
//           }
//         }

//         data[index].ottData = ott;
//         // console.log(ott, data[index]);

//         const lang = [];
//         if (data[index].language && data[index].language.length !== 0) {
//           for (let i = 0; i < data[index].language.length; i++) {
//             // console.log(data[index].ott[i]);
//             const query2 =
//               `select id, name from language where id = ` +
//               data[index].language[i];
//             await db
//               .result(query2)
//               .then((result2) => {
//                 var data2 = result2.rows;
//                 // console.log(data1);
//                 lang.push(...data2);
//               })
//               .catch((err) => {
//                 res.status(500).json({ success: false, msg: "Server Error" });
//               });
//           }
//         }

//         data[index].langData = lang;

//         const subtitle = [];
//         if (data[index].subtitle && data[index].subtitle.length !== 0) {
//           for (let i = 0; i < data[index].subtitle.length; i++) {
//             // console.log(data[index].ott[i]);
//             const query3 =
//               `select id, name from language where id = ` +
//               data[index].subtitle[i];
//             await db
//               .result(query3)
//               .then((result3) => {
//                 var data3 = result3.rows;
//                 // console.log(data1);
//                 subtitle.push(...data3);
//               })
//               .catch((err) => {
//                 res.status(500).json({ success: false, msg: "Server Error" });
//               });
//           }
//         }

//         data[index].subtitleData = subtitle;

//         const genre = [];
//         if (data[index].genre && data[index].genre.length !== 0) {
//           for (let i = 0; i < data[index].genre.length; i++) {
//             // console.log(data[index].ott[i]);
//             const query4 =
//               `select id, name from genere where id = ` + data[index].genre[i];
//             await db
//               .result(query4)
//               .then((result4) => {
//                 var data4 = result4.rows;
//                 // console.log(data1);
//                 genre.push(...data4);
//               })
//               .catch((err) => {
//                 res.status(500).json({ success: false, msg: "Server Error" });
//               });
//           }
//         }

//         data[index].genreData = genre;
//       }

//       res.status(200).json({ success: true, data: data });
//       // console.log(data);
//     })
//     .catch((err) => {
//       res.status(500).json({ success: false, msg: "Server Error" });
//     });
// });

router.get("/all_content", async function (req, res, next) {
  var query = `select cd.id, cd.name, cd.image, cd.trailer, cd.banner, t.name as "typeName", cd.type, genre, language, 
cd.ott, cd.subtitle, cd.content_lcn_no, cd.subscription, 
cd.description, cd.status, cd.position, cd.inserted_by, cd.inserted_date, 
cd.updated_by, cd.updated_date, cd.ua, cd.url, cd.content_release_date, cd.content_url_type, cd.poster_img 
from content_def cd
left join "type" t on t.id = cd."type"
  `;

  await db
    .result(query)
    .then(async (result) => {
      var data = result.rows;
      // console.log(data);
      for (let index = 0; index < data.length; index++) {
        const ott = [];
        if (data[index].ott && data[index].ott.length !== 0) {
          for (let i = 0; i < data[index].ott.length; i++) {
            // console.log(data[index].ott[i]);
            const query1 =
              `select id, name from ott_app where id = ` + data[index].ott[i];
            await db
              .result(query1)
              .then((result1) => {
                var data1 = result1.rows;
                // console.log(data1);
                ott.push(...data1);
              })
              .catch((err) => {
                res.status(500).json({ success: false, msg: "Server Error" });
              });
          }
        }

        data[index].ottData = ott;
        // console.log(ott, data[index]);

        const lang = [];
        if (data[index].language && data[index].language.length !== 0) {
          for (let i = 0; i < data[index].language.length; i++) {
            // console.log(data[index].ott[i]);
            const query2 =
              `select id, name from language where id = ` +
              data[index].language[i];
            await db
              .result(query2)
              .then((result2) => {
                var data2 = result2.rows;
                // console.log(data1);
                lang.push(...data2);
              })
              .catch((err) => {
                res.status(500).json({ success: false, msg: "Server Error" });
              });
          }
        }

        data[index].langData = lang;

        const subtitle = [];
        if (data[index].subtitle && data[index].subtitle.length !== 0) {
          for (let i = 0; i < data[index].subtitle.length; i++) {
            // console.log(data[index].ott[i]);
            const query3 =
              `select id, name from language where id = ` +
              data[index].subtitle[i];
            await db
              .result(query3)
              .then((result3) => {
                var data3 = result3.rows;
                // console.log(data1);
                subtitle.push(...data3);
              })
              .catch((err) => {
                res.status(500).json({ success: false, msg: "Server Error" });
              });
          }
        }

        data[index].subtitleData = subtitle;

        const genre = [];
        if (data[index].genre && data[index].genre.length !== 0) {
          for (let i = 0; i < data[index].genre.length; i++) {
            // console.log(data[index].ott[i]);
            const query4 =
              `select id, name from genere where id = ` + data[index].genre[i];
            await db
              .result(query4)
              .then((result4) => {
                var data4 = result4.rows;
                // console.log(data1);
                genre.push(...data4);
              })
              .catch((err) => {
                res.status(500).json({ success: false, msg: "Server Error" });
              });
          }
        }

        data[index].genreData = genre;
      }

      res.status(200).json({ success: true, data: data });
      // console.log(data);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

// router.get("/all_content_android", async function (req, res, next) {
//   var query = `SELECT id, "name", image, trailer, banner, "type", genre, "language", ott, subtitle, content_lcn_no, "subscription", description, status, "position", inserted_by, inserted_date, updated_by, updated_date, ua, url, content_release_date, poster_img
//   FROM public.content_def;
//   `;

//   await db
//     .result(query)
//     .then(async (result) => {
//       var data = result.rows;
//       // console.log(data);
//       for (let index = 0; index < data.length; index++) {
//         const ott = [];
//         if (data[index].ott && data[index].ott.length !== 0) {
//           for (let i = 0; i < data[index].ott.length; i++) {
//             // console.log(data[index].ott[i]);
//             const query1 =
//               `select id, name from ott_app where id = ` + data[index].ott[i];
//             await db
//               .result(query1)
//               .then((result1) => {
//                 var data1 = result1.rows;
//                 // console.log(data1);
//                 ott.push(...data1);
//               })
//               .catch((err) => {
//                 res.status(500).json({ success: false, msg: "Server Error" });
//               });
//           }
//         }

//         data[index].ottData = ott;
//         // console.log(ott, data[index]);
//       }

//       res.status(200).json({ success: true, data: data });
//       // console.log(data);
//     })
//     .catch((err) => {
//       res.status(500).json({ success: false, msg: "Server Error" });
//     });
// });

router.get("/all_content_android", async function (req, res, next) {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided

  const offset = (page - 1) * pageSize;

  var query = `
    SELECT id, "name", image, trailer, banner, "type", genre, "language", ott, subtitle, content_lcn_no, "subscription", description, status, "position", inserted_by, inserted_date, updated_by, updated_date, ua, url, content_release_date, poster_img
    FROM public.content_def
    LIMIT ${pageSize} OFFSET ${offset}`;

  await db
    .result(query)
    .then(async (result) => {
      var data = result.rows;

      for (let index = 0; index < data.length; index++) {
        const ott = [];
        if (data[index].ott && data[index].ott.length !== 0) {
          for (let i = 0; i < data[index].ott.length; i++) {
            const query1 = `select id, name from ott_app where id = ${data[index].ott[i]};`;
            await db
              .result(query1)
              .then((result1) => {
                var data1 = result1.rows;
                ott.push(...data1);
              })
              .catch((err) => {
                res.status(500).json({ success: false, msg: "Server Error" });
              });
          }
        }
        data[index].ottData = ott;
      }

      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});


router.get("/dashboard_data", function (req, res, next) {
  var user_id = req.body.user_id;

  const dashboard_content_ins = "fetch_dashboard_content_ins";

  db.func(dashboard_content_ins, [user_id])
    .then((result) => {
      var data = result;

      if (result && result.length >= 1) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(500).json({ success: false, msg: "Something Went Wrong" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.get("/content_by_type/:id", function (req, res, next) {
  var id = req.params.id;

  var query = "select * from content_def where type = '" + id + "'";

  db.result(query)
    .then((result) => {
      var data = result.rows;
      if (result.rows && result.rows.length !== 0) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(500).json({ success: false, msg: "Something Went Wrong" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.get("/content_by_type_test/:type", function (req, res, next) {
  var type = req.params.type.toLowerCase().trim();
  console.log(type);
  var query = "";
  if (type == "all") {
    query = "select * from content_def";
  } else if (type === "movie") {
    query = "select * from content_def where type = '" + type + "'";
  } else if (type === "web_series") {
    query = "select * from content_def where type = '" + type + "'";
  } else if (type === "game") {
    query = "select * from content_def where type = '" + type + "'";
  } else if (type === "education") {
    query = "select * from content_def where type = '" + type + "'";
  } else if (type === "medical") {
    query = "select * from content_def where type = '" + type + "'";
  } else if (type === "music") {
    query = "select * from content_def where type = '" + type + "'";
  } else if (type === "fm_radio") {
    query = "select * from content_def where type = '" + type + "'";
  } else if (type === "magazine") {
    query = "select * from content_def where type = '" + type + "'";
  } else if (type === "audiobook") {
    query = "select * from content_def where type = '" + type + "'";
  } else if (type === "podcast") {
    query = "select * from content_def where type = '" + type + "'";
  } else if (type === "newspaper") {
    query = "select * from content_def where type = '" + type + "'";
  }
  console.log(query);

  db.result(query)
    .then((result) => {
      var data = result.rows;
      if (data.length !== 0) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(500).json({ success: false, msg: "something went wrong" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.get("/content_by_genre/:genre_id", function (req, res, next) {
  var genre_id = req.params.genre_id;

  var query =
    "select * from public.content_def cd where '" +
    genre_id +
    "' = any (cd.genre)";

  db.result(query)
    .then((result) => {
      var data = result.rows;
      if (result.rows && result.rows.length !== 0) {
        res.status(200).json({ success: true, data: data });
      } else {
        res
          .status(500)
          .json({ success: false, msg: "No Matching Genre Found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.get("/content_by_language/:lang_id", function (req, res, next) {
  var lang_id = req.params.lang_id;

  var query =
    "select * from public.content_def cd where '" +
    lang_id +
    "' = any (cd.language)";

  db.result(query)
    .then((result) => {
      var data = result.rows;
      if (result.rows && result.rows.length !== 0) {
        res.status(200).json({ success: true, data: data });
      } else {
        res
          .status(500)
          .json({ success: false, msg: "No Matching Language Movie Found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.get("/content_by_language_and_genre/:lang_id/:genre_id",
  function (req, res, next) {
    var lang_id = req.params.lang_id;
    var genre_id = req.params.genre_id;

    var query =
      "select * from public.content_def cd where '" +
      lang_id +
      "' = any (cd.language) and '" +
      genre_id +
      "' = any (cd.genre)";

    db.result(query)
      .then((result) => {
        var data = result.rows;
        if (result.rows && result.rows.length !== 0) {
          res.status(200).json({ success: true, data: data });
        } else {
          res.status(500).json({
            success: false,
            msg: "No Matching Genre And Language Movie Found",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, msg: "Server Error" });
      });
  }
);

router.get("/content_by_ott/:ott_id", function (req, res, next) {
  var ott_id = req.params.ott_id;

  var query =
    "select * from public.content_def cd where '" + ott_id + "' = any (cd.ott)";

  db.result(query)
    .then((result) => {
      var data = result.rows;
      if (result.rows && result.rows.length !== 0) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(500).json({ success: false, msg: "No Matching Ott Found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.get("/content_live_tv/:ott_id", function (req, res, next) {
  var ott_id = req.params.ott_id;

  var query =
    "select * from public.content_def cd where '" + ott_id + "' = any (cd.ott)";

  db.result(query)
    .then((result) => {
      var data = result.rows;
      if (result.rows && result.rows.length !== 0) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(500).json({ success: false, msg: "No Data For Live TV" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

//Extra Code Start

router.get("/all_content_test", async function (req, res, next) {
  var query =
    "SELECT id, name, image, trailer, banner, type, genre, language, ott, subtitle, content_lcn_no, subscription, description, status, position, inserted_by, inserted_date, updated_by, updated_date, ua, url, content_release_date FROM public.content_def";

  await db
    .result(query)
    .then(async (result) => {
      var data = result.rows;

      for (let index = 0; index < data.length; index++) {
        const ott = [];
        if (data[index].ott && data[index].ott.length) {
          for (let i = 0; i < data[index].ott.length; i++) {
            var query1 =
              "select id, name from ott_app where id = '" +
              data[index].ott[i] +
              "'";

            await db
              .result(query1)
              .then((result1) => {
                var data1 = result1.rows;
                ott.push(...data1);
              })
              .catch((err) => {
                res.status(500).json({ success: false, msg: "Server Error" });
              });
          }
        }

        data[index].ottData = ott;

        const lang = [];
        if (data[index].language && data[index].language.length !== 0) {
          for (let i = 0; i < data[index].language.length; i++) {
            var query2 =
              "select id, name from language where id = '" +
              data[index].language[i] +
              "'";

            await db
              .result(query2)
              .then((result2) => {
                var data2 = result2.rows;
                lang.push(...data2);
              })
              .catch((err) => {
                res
                  .status(500)
                  .json({ success: false, msg: "Something Went Wrong" });
              });
          }
        }
        data[index].langData = lang;

        const genre = [];
        if (data[index].genre && data[index].genre.length !== 0) {
          for (let i = 0; i < data[index].genre.length; i++) {
            var query3 =
              "select id,name from genere where id = '" +
              data[index].genre[i] +
              "'";

            await db
              .result(query3)
              .then((result3) => {
                var data3 = result3.rows;
                genre.push(...data3);
              })
              .catch((err) => {
                res
                  .status(500)
                  .json({ success: false, msg: "Something Went Wrong" });
              });
          }
        }
        data[index].genreData = genre;

        const subtitle = [];
        if (data[index].subtitle && data[index].subtitle.length !== 0) {
          for (let i = 0; i < data[index].subtitle.length; i++) {
            var query4 =
              "select id, name from language where id = '" +
              data[index].subtitle[i] +
              "'";

            await db
              .result(query4)
              .then((result4) => {
                var data4 = result4.rows;
                subtitle.push(...data4);
              })
              .catch((err) => {
                res
                  .status(500)
                  .json({ success: false, msg: "Something Went Wrong" });
              });
          }
        }
        data[index].subtitleData = lang;
      }
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: "Something Went Wrong" });
    });
});

router.get("/dashboard", function (req, res, next) {
  var user_id = req.body.user_id;

  var query = "select * from user_def where user_id = '" + user_id + "'";

  db.result(query)
    .then((result) => {
      if (result.rows && result.rows.length >= 1) {
        var query = "select name from genere";

        db.result(query)
          .then((result) => {
            var dataGenre = [];
            dataGenre = result.rows;
            genreCount = result.rows.length;
            if (result.rows && result.rows.length >= 1) {
              var query1 = "select name from language";

              db.result(query1)
                .then((result1) => {
                  var dataLang = [];
                  dataLang = result1.rows;
                  langCount = result1.rows.length;
                  if (result1.rows && result1.rows.length >= 1) {
                    var query2 = "select name from ott_app";

                    db.result(query2)
                      .then((result3) => {
                        var dataOtt = [];
                        dataOtt = result3.rows;
                        ottCount = result3.rows.length;

                        if (result3.rows && result3.rows.length >= 1) {
                          var query3 = "select name from content_def";

                          db.result(query3)
                            .then((result3) => {
                              dataMovie = [];
                              dataMovie = result3.rows;
                              movieCount = result3.rows.length;
                              res.status(200).json({
                                success: true,
                                genreCount,
                                dataGenre,
                                langCount,
                                dataLang,
                                ottCount,
                                dataOtt,
                                movieCount,
                                dataMovie,
                              });
                            })
                            .catch((err) => {
                              res.status(500).json({
                                success: false,
                                msg: "Something Went Wrong",
                              });
                            });
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                        res.status(500).json({
                          success: false,
                          msg: "Something Went Wrong",
                        });
                      });
                  }
                })
                .catch((err) => {
                  console.log(err);
                  res
                    .status(500)
                    .json({ success: false, msg: "Something Went Wrong" });
                });
            }
          })
          .catch((err) => {
            console.log(err);
            res
              .status(500)
              .json({ success: false, msg: "Something Went Wrong" });
          });
      } else {
        res.status(500).json({ success: false, msg: "You Dont't Have Access" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.post("/content_search_by_name", function (req, res, next) {
  var name = req.body.name;

  // var query = "select * from content_def where name @@ to_tsquery('" + name + "')";
  var query =
    "SELECT * FROM content_def WHERE to_tsvector('english', name) @@ plainto_tsquery('english', '" +
    name +
    "')";

  console.log(query);

  db.result(query)
    .then((result) => {
      var data = result.rows;
      if (data && data.length !== 0) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(200).json({ success: false, msg: "No Result Found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.get("/all_poster", function (req, res, next) {
  var query = "select * from poster";

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

router.post("/add_poster", upload.any(), function (req, res, next) {
  var img = req.files[0].filename;
  var name = req.body.name;
  var inserted_by = req.body.inserted_by;

  var query = "SELECT public.poster_ins(0, 1, $1, $2, $3, $4)";

  db.result(query, [img, name, inserted_by, inserted_by])
    .then((result) => {
      var out_error_code = result.rows[0].poster_ins;
      if (out_error_code == 0) {
        res.status(200).json({ success: true, msg: "Image Inserted" });
      } else {
        res.status(500).json({ success: false, msg: "Something Went Wrong" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.get("/ott_app_count", function (req, res) {
  var query =
    "select 'OTT Name' AS table_name ,count(*) as row_count  from ott_app oa union all select 'language' as table_name , count(*) as row_count from language l  union all select 'genere' as table_name, count(*) as row_count from genere g union all select 'advertisment' as table_name , count(*) as row_count from advertisement a  union all select 'content' as table_name , count(*) as row_count from content_def cd union all select 'user' as table_name , count(*) as row_count from user_def ud ";

  var query1 = "select count(name), type  from content_def group by type";
  var query2 = "select name, count(name)from language group by name";
  var query3 = "select name, count(name)from ott_app  group by name";

  db.result(query)
    .then((result) => {
      db.result(query1)
        .then((result1) => {
          db.result(query2)
            .then((result2) => {
              db.result(query3)
                .then((result3) => {
                  var data = result.rows;
                  var data1 = result1.rows;
                  var data2 = result2.rows;
                  var data3 = result3.rows;
                  res.status(200).json({
                    succes: true,
                    data: data,
                    data1: data1,
                    data2: data2,
                    data3: data3,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res
                    .status(500)
                    .json({ succes: false, msg: "Ott App Server Problem" });
                });
            })
            .catch((error) => {
              console.log(error);
              res
                .status(500)
                .json({ succes: false, msg: "Ott App Server Problem" });
            });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .json({ succes: false, msg: "Ott App Server Problem" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ succes: false, msg: "Ott App Server Problem" });
    });
});

router.post("/add_advertisement", upload.any(), function (req, res, next) {
  var img = req.files[0].filename;
  var url = req.body.url;
  var start_date = req.body.start_date;
  var end_date = req.body.end_date;
  var status = req.body.status;
  var position = req.body.position;
  var inserted_by = req.body.inserted_by;

  var query = "select * from advertisement where url = '" + url + "'";

  db.result(query)
    .then((result) => {
      if (result.rows && result.rows.length !== 0) {
        res.status(200).json({ success: false, msg: "URL exists" });
      } else {
        var query1 =
          "select * from advertisement where position = '" + position + "'";

        db.result(query1)
          .then((result) => {
            if (result.rows && result.rows.length !== 0) {
              res.status(200).json({ success: false, msg: "Position Taken" });
            } else {
              var query2 =
                "SELECT public.advertisement_ins(0, 1, $1, $2, $3, $4, $5, $6, $7, $8)";

              db.result(query2, [
                img,
                url,
                start_date,
                end_date,
                status,
                position,
                inserted_by,
                inserted_by,
              ])
                .then((result) => {
                  var out_error_code = result.rows[0].advertisement_ins;
                  if (out_error_code == 0) {
                    res.status(200).json({
                      success: true,
                      msg: "Advertisement Added",
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
                  res.status(500).json({ success: false, msg: "Server Error" });
                });
            }
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

router.post("/update_advertisement", upload.any(), function (req, res, next) {
  var {
    id,
    url,
    start_date,
    end_date,
    status,
    position,
    updated_by,
    update_add_image,
  } = req.body;

  var query =
    "select * from advertisement where position = '" +
    position +
    "' and id ! = '" +
    id +
    "'";

  db.result(query)
    .then((result) => {
      if (result.rows && result.rows.length !== 0) {
        res.status(200).json({ success: false, msg: "Position Taken" });
      } else {
        if (req.files && req.files.length !== 0) {
          var img = req.files[0].filename;

          var query1 =
            "SELECT public.advertisement_ins(1, $1, $2, $3, $4, $5, $6, $7, $8, $9)";

          db.result(query1, [
            id,
            img,
            url,
            start_date,
            end_date,
            status,
            position,
            updated_by,
            updated_by,
          ])
            .then((result) => {
              if (result.rows[0].advertisement_ins === 0) {
                res.status(200).json({ success: true, msg: "Data Updated" });
              } else {
                res
                  .status(200)
                  .json({ success: false, msg: "Something Went Wrong" });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ success: false, msg: "Server Error" });
            });
        } else {
          var img = update_add_image;

          var query1 =
            "SELECT public.advertisement_ins(1, $1, $2, $3, $4, $5, $6, $7, $8, $9)";

          db.result(query1, [
            id,
            img,
            url,
            start_date,
            end_date,
            status,
            position,
            updated_by,
            updated_by,
          ])
            .then((result) => {
              if (result.rows[0].advertisement_ins === 0) {
                res.status(200).json({ success: true, msg: "Data Updated" });
              } else {
                res
                  .status(200)
                  .json({ success: false, msg: "Something Went Wrong" });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ success: false, msg: "Server Error" });
            });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.get("/all_add", function (req, res, next) {
  var query = "select * from advertisement";

  db.result(query)
    .then((result) => {
      var data = result.rows;
      res.status(200).json({ success: true, data: data, msg: "Success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});

router.get("/all_type", function (req, res, next) {
  var query = "select * from type";

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

router.get("/type_by_id/:id", function (req, res, next) {
  var id = req.params.id;

  var query = "select * from type where id = '" + id + "'";

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

router.post("/new_type", upload.any(), function (req, res, next) {
  var name = req.body.name.toUpperCase();
  var image = req.files[0].filename.replace(" ", "-");
  var inserted_by = req.body.inserted_by;

  var query = "select * from type where name = '" + name + "'";

  db.result(query)
    .then((result) => {
      if (result.rows && result.rows.length !== 0) {
        res.status(200).json({ success: false, msg: "Type Exists" });
      } else {
        var query1 = "SELECT public.type_ins(0, 1, $1, $2, $3, $4)";

        db.result(query1, [name, image, inserted_by, inserted_by])
          .then((result) => {
            if (result.rows[0].type_ins === 0) {
              res.status(200).json({ success: true, msg: "Data Inserted" });
            } else {
              res
                .status(500)
                .json({ success: false, msg: "Something Went Wrong" });
            }
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

router.post("/update_type", upload.any(), function (req, res, next) {
  var id = req.body.id;
  var name = req.body.name;
  var oldImage = req.body.oldImage;
  var updated_by = req.body.updated_by;

  if (req.files && req.files.length !== 0) {
    var query = "SELECT public.type_ins(1, $1, $2, $3, $4, $5)";
    const image = image_path

    db.result(query, [id, name, image, updated_by, updated_by])
      .then((result) => {
        if (result.rows[0].type_ins === 0) {
          res.status(200).json({ success: true, msg: "Data Updated" });
        } else {
          res.status(200).json({ success: false, msg: "Something Went Wrong" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, msg: "Server Error" });
      });
  } else {
    var image = oldImage;

    var query1 = "SELECT public.type_ins(1, $1, $2, $3, $4, $5)";

    db.result(query1, [id, name, image, updated_by, updated_by])
      .then((result) => {
        if (result.rows[0].type_ins === 0) {
          res.status(200).json({ success: true, msg: "Data Updated" });
        } else {
          res.status(200).json({ success: false, msg: "Something Went Wrong" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, msg: "Server Error" });
      });
  }
});


router.get("/content_by_views", function (req, res, next) {
  var query = "select id, name, image, trailer, views from content_def where views <> 0 order by views desc";

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


router.get("/genre_by_views", function (req, res, next) {
  var genre_id = req.params.id || req.query.id;

  var query =
    "select id, name, image, views, trailer from public.content_def cd where '" +
    genre_id +
    "' = any (cd.genre) order by views desc limit 10";

  console.log(query);
  db.query(query)
    .then((result) => {
      res.status(200).json({ success: true, data: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});


router.post("/content_by_lang_and_genre", function (req, res, next) {
  var genreid = req.body.genreid;
  var langid = req.body.langid;

  var query =
    "select * from content_def where array[" +
    genreid +
    "]::varchar[] && genre and array[" +
    langid +
    "]::varchar[] && language";

  db.result(query)
    .then((result) => {
      var data = result.rows;
      if (result.rows && result.length !== 0) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(500).json({
          success: false,
          msg: "No Matching Content Found for given Language and Genre",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, msg: "Server Error" });
    });
});


router.get('/all_channels', (req, res) =>{
  let query = 'select * from channel'

  db.result(query)
  .then((data) =>{
    res.status(200).json({succes: true, data: data.rows})
  })
  .catch((error) =>{
    console.log(error)
    res.status(500).json({succes: false, msg: "Server Error"})
  })
})

router.post('/add_channel',upload.any(), (req, res, next) =>{
  let channelName = req.body.channelName;
  let channelType = req.body.channelType;
  let inserted_by = req.body.inserted_by;
  let image = req.files[0].filename;
 
  let query = `INSERT INTO public.channel
  ("name", image,type, inserted_by, inserted_date, updated_by, updated_date)
  VALUES('${channelName}', '${image}','${channelType}', '${inserted_by}', now(), '${inserted_by}', now())`

  db.result(query)
  .then((data) => {
    res.status(200).json({succes: true, msg: 'Channel Added Succesfuly!'})
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({succes: false, msg: 'Server Error'})
  })
})


router.get("/get_dashboard_status", function (req, res, next) {
  //  res.status(200).json({ success: true, status: "V", link: "https://poclive-indiatvnews.akamaized.net/hlslive/Admin/px0219297/live/digital/chunklist_0.m3u8" });

  res.status(200).json({ success: true, status: "V", link: "https://aajtakhdlive-amd.akamaized.net/hls/live/2014415-b/aajtakhd/aajtakhdlive/live_720p/chunks.m3u8" });

});



// Singer Api Start
router.post('/add_singer', upload.any(), (req, res) => {
  let name = req.body.name.toUpperCase().trim();
  let image = req.files[0].filename;

  let singerFetch =  `SELECT * FROM singer WHERE name = '${name}'`; // SQL query to check if singer exists
  db.any(singerFetch) // Using `any` instead of `result` as we are expecting multiple rows
  .then((data) => {
    if(data.length > 0) { // Check if singer already exists
      console.log('Singer already exists');
      res.status(409).json({ success: false, msg: 'Singer already exists' }); // Sending conflict status code 409
    } else {
      let query = `INSERT INTO singer
      ("name", image, inserted_by, inserted_date, updated_by, updated_date)
      VALUES('${name}', '${image}', 'Deepak', now(), 'Deepak', now())`;

      db.none(query) // Using `none` since we don't need to return any data
      .then(() => {
        res.status(200).json({ success: true, msg: 'Singer added successfully!' });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Server Error' });
      });
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({ success: false, msg: 'Singer Server Error' });
  });
});

router.get('/all_singer', (req, res) =>{
  let query = `select * from singer`

  db.result(query)
  .then((data) =>{
    res.status(200).json({succes: true, data:data.rows})
  })
  .catch((error) =>{
    res.status(500).json({succes: false, msg:'Server Error'})
  })
})

router.post('/update_singer/:id', upload.any(), (req, res) => {
  let id = req.params.id; // Get the singer ID from the URL parameter
  let name = req.body.name.toUpperCase().trim(); // Get the updated name
  let image = req.files[0].filename; // Get the updated image filename

  let singerFetch =  `SELECT * FROM singer WHERE id = ${id}`; // SQL query to check if singer with given ID exists
  db.any(singerFetch) // Using `any` instead of `result` as we are expecting multiple rows
  .then((data) => {
    if(data.length === 0) { // Check if singer with given ID does not exist
      res.status(404).json({ success: false, msg: 'Singer not found' }); // Sending not found status code 404
    } else {
      let query = `UPDATE singer
      SET name = '${name}', image = '${image}', updated_by = 'Deepak', updated_date = now()
      WHERE id = ${id}`;

      db.none(query) // Using `none` since we don't need to return any data
      .then(() => {
        res.status(200).json({ success: true, msg: 'Singer updated successfully!' });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Server Error' });
      });
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({ success: false, msg: 'Server Error' });
  });
});


router.post('/add_music', (req, res) => {
  const { name, singer, image, poster, song_url, description, genre, type, trailer, status } = req.body; // Destructuring properties from the request body

  // Your SQL query with parameters
  const query = `
    INSERT INTO public.music
    ("name", singer, image, poster, song_url, description, genre, "type", trailer, status, inserted_by, inserted_date, updated_by, updated_date)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'API', NOW(), 'API', NOW())
  `;

  // Executing the query with parameters
  db.none(query, [name, singer, image, poster, song_url, description, genre, type, trailer, status])
    .then(() => {
      res.status(200).json({ success: true, msg: 'Music added successfully!' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, msg: 'Server Error' });
    });
});
// Singer Api End
module.exports = router;
