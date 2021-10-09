const conn = require("../config/db");

module.exports.list = async (req, res, next) => {
  res.render("admin/service/list"); 
};
module.exports.addService = async (req, res, next) => {
  res.render("admin/service/add");
};

module.exports.createService = async (req, res, next) => {
  if (req.method == "POST") {
    let name = req.body.title;
    let desc = req.body.desc;
    let created = new Date();
    let modified = new Date();

    if (!req.files) return res.status(500).send("No files were uploaded");

    let file = req.files.image;
    let image_name = file.name;

    if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg"
    ) {
      file.mv("public/uploads/" + file.name, function (error) {
        if (error) res.status(500).send(err);

        conn.query(
          "INSERT INTO `services`(`title`, `desc`, `image`, `created`, `modified`) VALUES('" +
            name +
            "', '" +
            desc +
            "','" +
            image_name +
            "','" +
            created +
            "','" +
            modified +
            "')",
          function (error, result) {
            res.redirect(302, "admin/service/add")
            // res.json({
            //   status: 01,
            //   message: "Service created successfully!",
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
  res.render("admin/service/add")
};

module.exports.edit = async (req, res, next) => {
  res.render("admin/services/edit");
};

module.exports.delete = async (req, res, next) => {
  res.render("admin/services/delete");
};
