const joi = require("joi");

const avtarRegex = new RegExp("https://res.cloudinary.com/[.]*");

const createUserSchema = joi.object({
	username: joi.string().max(15).required(),
	email: joi.string().email().required(),
	password: joi.string().required().min(6),
});

const loginUserSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required().min(6),
});

module.exports = {
	createUserSchema,
	loginUserSchema,
};
