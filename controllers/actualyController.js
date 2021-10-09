const conn = require("../config/db");

exports.getAllActually = async (req, res) => {
  conn.query("SELECT * FROM actualites", (error, result) => {
    if (error) {
      res.json({
        status: false,
        message: "there are some error with query",
      });
    } else {
      // res.render("admin/articles/list");
      res.json({
        status: true,
        data: result,
        message: "Successfully!"
      })
    }
  });
};

exports.getActuallyById = async (req, res) => {
  const id = req.params.id;
  conn.query("SELECT * FROM actualites WHERE id=?", [id], (error, result) => {
    if (error) {
      res.json({
        status: false,
        message: "there are some error with query",
      });
    } else {
      res.render("admin/articles/edit");
    }
  });
};

exports.createActually = function (req, res) {
  if (req.method == "POST") {
    var actua_name = req.body.name;
    var name = req.body.username;
    var created_at = new Date();
    var modified = new Date();

    if (!req.files) return res.status(500).send("No files were uploaded");

    var file = req.files.image;

    var image_name = file.name;

    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
      file.mv("public/uploads/" + file.name, function (err) {
        if (err) res.status(500).send(err);
        conn.query(
          "INSERT INTO `actualites`(`name`,`username`,`image`,`created`,`modified`) VALUES ('" +
            actua_name +
            "','" +
            name +
            "','" +
            image_name +
            "','" +
            created_at +
            "','" +
            modified +
            "')",
          function (error, result) {
            res.render("admin/articles/add", {
              message: "Actually created successfully!",
            });
            // res.json({
            //   status: 01,
            //   message: "Actually created successfully! ",
            // });
          }
        );
      });
    } else {
      res.json({
        status: 02,
        message:
          "This format is not allowed , please upload file with '.png','.gif','.jpg'",
      });
    }
  } else {
    res.json({
      status: 03,
      message: "Error of the sql connection",
    });
  }
};

exports.deleteActually = async (req, res, next) => {
  let id = req.params.id;
  conn.query("DELETE FROM actualites WHERE id=?", [id], (error, resut) => {
    if (error) {
      res.json({
        status: 2,
        message: "there are some error with query",
      });
    } else {
      res.json({
        status: 1,
        message: "Actually deleted successfully!",
      });
    }
  });
};

exports.updateActually = async (req, res, next) => {
  let id = req.params.id;
  let actua_name = req.params.name;
  let name = req.params.username;
  let created_at = new Date();
  let modified = new Date();

  let sql =
    "UPDATE `actualites` SET `name`= '" +
    actua_name +
    "', `username`='" +
    name +
    "', `created`='" +
    created_at +
    "', `modified`='" +
    modified +
    "', `id`='" +
    id +
    "'";

  conn.query(sql, (error, results) => {
    if (error) {
      res.json({
        status: 2,
        message: "there are some error with query",
      });
    } else {
      res.json({
        status: 1,
        message: "actualites is updated successfully!",
      });
    }
  });
};
