const Joi = require('joi')

const imgUrlRegEx = new RegExp('https://res.cloudinary.com/[.]*')

const schema = Joi.object({
    title: Joi.string().min(3).required(),
    body: Joi.string().min(10).required(),
    thumbImg: Joi.string().pattern(imgUrlRegEx),
    tags: Joi.array(),
})

module.exports = schema;