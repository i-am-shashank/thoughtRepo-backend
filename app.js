const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const articles = require("./routes/articles");
const user = require("./routes/user");
const upload = require("./routes/upload");
const app = express();
const db = require("./utils/db");

app.use(express.json());

app.use(morgan("common"));
app.use(cors());

app.get("/", (req, res) => res.json({ sucess: true }));
app.use("/articles", articles);
app.use("/upload", upload);
app.use("/user", user);

module.exports = app;
