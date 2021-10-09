const conn = require("../config/db");

exports.getAllCategory = async (req, res, next) => {
  conn.query("SELECT * FROM categorie", (error, results) => {
    if (error) {
      res.json({
        status: 2,
        message: "there are some error with queries",
      });
    } else {
      res.json({
        status: 1,
        data: results,
      });
    }
  });
};

exports.getCategoryById = async (req, res, next) => {
  const id = req.params.id;
  conn.query("SELECT * FROM categorie WHERE id =?", [id], (error, results) => {
    if (error) {
      res.json({
        status: 2,
        message: "there are some error with query",
      });
    } else {
      res.send(results);
    }
  });
};

exports.createCategory = async (req, res, next) => {
  const today = new Date();
  const postaCat = {
    name: req.body.name,
    desc: req.body.desc,
    created: today,
    modified: today,
  };
  conn.query(`INSERT INTO categorie SET ?`, postaCat, (error, results) => {
    if (error) {
      res.json({
        status: 2,
        message: "there are some error with query",
      });
    } else {
      res.json({
        status: 1,
        message: "Category registered sucessfully",
      });
    }
  });
  //   res.send("create new category");
};

exports.deleteCategory = async (req, res, next) => {
  let id = req.params.id;
  //console.log(id);
  conn.query("DELETE FROM categorie WHERE id = ?", [id], (error, results) => {
    if (error) {
      res.json({
        status: 2,
        message: "there are some error with query",
      });
    } else {
      res.json({
        status: 1,
        message: "Category deleted successfully!",
      });
    }
  });
};

exports.updateCategory = async (req, res, next) => {
  let id = req.params.id;
  let name = req.params.name;
  let desc = req.params.desc;
  let created = new Date();
  let modified = new Date();

  let query =
    "UPDATE `categorie` SET `name`= '" +
    name +
    "', `desc`='" +
    desc +
    "', `created`='" +
    created +
    "', `modified`='" +
    modified +
    "', `id`='" +
    id +
    "'";

  conn.query(query, (error, results) => {
    if (error) {
      res.json({
        status: 2,
        message: "there are some error with query",
      });
    } else {
      res.json({
        status: 1,
        message: "Category is updated successfully!",
      });
    }
  });
};
