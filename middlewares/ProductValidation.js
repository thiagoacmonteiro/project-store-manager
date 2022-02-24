const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
}).messages({
  'any.required': '{{#label}} is required',
  'string.min': '{{#label}} length must be at least {{#limit}} characters long',
  'number.min': '{{#label}} must be greater than or equal to 1',
});

module.exports = (req, res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    const { message } = error;

    const status = message.includes('required') ? 400 : 422;

    return res.status(status).json({ message });
  }

  next();
};
