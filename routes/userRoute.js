const express = require("express");
const router = express.Router();
const {
  loginPage,
  login,
  homepage,
  register,
  logout,
  addUser,
  edit,
  list,
} = require("../controllers/userController");

const catController = require("../controllers/categoryController");
const actuaController = require("../controllers/actualyController");
const enterController = require("../controllers/entrepriseController");
const serviceController = require("../controllers/serviceController");

/************ Admin users *************/

router.get("/", loginPage);
router.post("/admin/login", login);
router.post("/register", register);
router.get("/admin/logout", logout);
router.get("/admin/dashboard", homepage);

/***********  Icietlaba ***************/
router.get("/admin/entreprise/list", enterController.getAllInformation);
router.post("/admin/entreprise/add", enterController.createInformation);
router.get("/admin/entreprise/add", enterController.createInformation);
router.post("/admin/entreprise/edit/:id", enterController.updateInformation);
router.get("/admin/entreprise/edit/:id", enterController.updateInformation);
router.get("/admin/entreprise/delete/:id", enterController.deleteInformation);

/***********  Users  ***************/
router.get("/admin/users/list", list);
router.post("/admin/users/add", addUser);
router.get("/admin/users/add", addUser);
router.post("/admin/users/edit/:id", edit);
router.get("/admin/users/edit/:id", edit);
router.get("/admin/users/delete/:id", edit);

/*********** Category *************/
router.get("/admin/categories/list", catController.getAllCategory);
router.post("/admin/categories/add", catController.createCategory);
router.get("/admin/categories/add", catController.createCategory);
router.post("/admin/categories/edit/:id", catController.updateCategory);
router.get("/admin/categories/edit/:id", catController.updateCategory);
router.get("/admin/categories/delete/:id", catController.deleteCategory);

/**************** Articles **************/
router.get("/admin/articles/list", actuaController.getAllActually);
router.get("/admin/articles/add", actuaController.createActually);
router.post("/admin/articles/add", actuaController.createActually);
router.get("/admin/articles/edit/:id", actuaController.updateActually);
router.post("/admin/articles/edit/:id", actuaController.updateActually);
router.get("/admin/articles/delete/:id", actuaController.deleteActually);

/**************** Service **************/
router.get("/admin/service/list", serviceController.list);
router.get("/admin/service/add", serviceController.createService);
router.post("/admin/service/add", serviceController.createService);
router.get("/admin/service/edit/:id", serviceController.edit);
router.post("/admin/service/edit/:id", serviceController.edit);
router.get("/admin/service/delete/:id", serviceController.delete);

module.exports = router;
