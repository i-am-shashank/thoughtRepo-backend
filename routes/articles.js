const express = require("express");
const router = express.Router();
const articleSchema = require("../utils/validation/Article");
const validationHandler = require("../utils/middlewares/validationHandler");
const auth = require("../utils/middlewares/auth");
const Article = require("../models/Article");
const User = require("../models/User");
const mongoose = require("mongoose");

router.get("/", auth.optional, async (req, res) => {
  try {
    const articles = await Article.find().populate('author');
    res.json(articles);
  } catch (error) {
    console.log(error);
    res.send("ERROR!").status(404);
  }
});

router.get("/:slug", auth.optional, async (req, res) => {
  const slug = req.params.slug;
  const article = await Article.find({ slug });
  res.json(article);
});

router.post(
  "/",
  auth.required,
  validationHandler(articleSchema),
  async (req, res) => {
    try {
      const user = await User.findById(req.payload.id);
      if (!user) return res.sendStatus(401);

      const newArticle = new Article(req.body);
      newArticle.author = user._id;
      await newArticle.save();
      console.log(newArticle);
      res.json(newArticle);
    } catch (error) {
      console.log(error);
      res.send("ERROR!").status(404);
    }
  }
);

module.exports = router;
