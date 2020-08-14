const express = require("express");
const router = express.Router();
const articleSchema = require("../utils/validation/Article");
const validationHandler = require("../utils/middlewares/validationHandler");
const auth = require("../utils/middlewares/auth");
const Article = require("../models/Article");
const User = require("../models/User");

router.get("/", auth.optional, async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        console.log(error);
    }
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
        }
    }
);

module.exports = router;
