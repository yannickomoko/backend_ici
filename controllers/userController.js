const conn = require("../config/db");
const authUtils = require("../utils/auth");

module.exports.list = function (req, res) {
  res.render("admin/users/list");
};

module.exports.loginPage = function (req, res) {
  res.render("login");
};
module.exports.addUser = function (req, res) {
  res.render("admin/users/add");
};

module.exports.login = function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const passwordhash = authUtils.hashpassword(password);

  conn.query(
    "SELECT `email`, `password` FROM users WHERE email = ?",
    [email],
    function (error, results) {
      // console.log(error);
      if (!error) {
        if (results.length > 0) {
          if (
            email === results[0].email &&
            passwordhash === results[0].password
          ) {
            // res.json({
            //   success: 01,
            //   message: "User connected successfully!",
            // });
            res.redirect(302, "/admin/dashboard");
          } else {
            // res.redirect(302, "/admin/login");
            res.json({
              success: 02,
              message: "Incorrect Email or password",
            });
          }
        } else {
          res.json({
            success: 03,
            message: "Email does not exist",
          });
        }
      }
    }
  );
};

module.exports.register = (req, res, next) => {
  const today = new Date();
  const hash = authUtils.hashpassword(req.body.password);

  const PostData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: hash,
    role: req.body.role,
    created: today,
  };
  console.log(PostData);

  conn.query(`INSERT INTO users SET ?`, PostData, (error, results) => {
    if (error) {
      res.json({
        success: 02,
        message: "there are some error with query",
      });
    } else {
      res.json({
        success: 01,
        message: "User successfully!",
        data: results,
      });
    }
  });
};

module.exports.edit = (req, res, next) => {
  res.render("admin/users/edit");
};
module.exports.delete = (req, res, next) => {
  res.render("admin/users/delete");
};
module.exports.homepage = (req, res, next) => {
  res.render("dashboard");
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect(302, "/admin/login");
};
