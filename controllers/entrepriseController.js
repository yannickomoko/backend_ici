const conn = require("../config/db");

module.exports.getAllInformation = async (req, res, next) => {
  res.send("Get all category");
};

module.exports.getInformationById = async (req, res, next) => {
  res.send("Get the category id");
};

module.exports.createInformation = async (req, res, next) => {
  const PostData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    adress1: req.body.adress1,
    adress2: req.body.adress2,
    // fck: req.body.facebook,
    // twt: req.body.twitter,
    // insta: req.body.instagram,
    // linke: req.body.linkedin,
  };
  console.log(PostData);
  conn.query(`INSERT INTO information SET ?`, PostData, (error, results) => {
    console.log(error);
    if (error) {
      res.json({
        status: 2,
        message: "there are some error with query",
      });
    } else {
      res.json({
        status: 1,
        message: "item registered sucessfully",
        data: results,
      });
    }
  });
  //   res.send("create new category");
};

module.exports.deleteInformation = async (req, res, next) => {
  res.send("delete the category item");
};

module.exports.updateInformation = async (req, res, next) => {
  res.send("update the category item");
};
