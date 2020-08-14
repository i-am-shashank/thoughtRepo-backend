const joi = require('joi');

const validationHandler = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
          console.log(req.body);
          res.json(error.details[0].message);
        } else {
          console.log(req.body);
          next();
        }
    }
  };

module.exports = validationHandler;