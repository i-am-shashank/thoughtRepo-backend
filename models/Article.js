const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const REQUIRED_STRING = {type: String, required: true}

const ArticleSchema = new Schema({
    title: REQUIRED_STRING,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    body: REQUIRED_STRING,
    thumbImg: REQUIRED_STRING,
    likesCount: {type: Number, default: 0},
    slug: {...REQUIRED_STRING, lowercase: true, unique: true},
    tags: [REQUIRED_STRING],
}, {timestamps: true});

ArticleSchema.pre('validate', function(next) {
    if(!this.slug)
        this.slugify();
    next()
})

ArticleSchema.methods.slugify = function() {
    this.slug = slugify(this.title) + '-' + (Math.floor(Math.random() * Math.pow(36, 6))).toString(36);
}

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;