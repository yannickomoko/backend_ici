const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");

const postRouter = require("./routes/userRoute");

const app = express();
const port = 4000;

app.set("views", __dirname + "/views"); // set express to look in this folder to render our view
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("./uploads"));

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload()); // configure fileupload

app.use(
  session({
    secret: "125cart",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use("/", postRouter);
app.get("*", function (req, res, next) {
  res.status(404);

  res.render("404.ejs", {
    title: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`Starting server in port: ${port}`);
});
