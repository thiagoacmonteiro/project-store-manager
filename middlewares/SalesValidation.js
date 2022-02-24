const Joi = require('joi');

const salesSchema = Joi.object({
  productId: Joi.required(),
  quantity: Joi.number().integer().min(1).required(),
}).messages({
  'any.required': '{{#label}} is required',
  'number.min': '{{#label}} must be greater than or equal to 1',
});

module.exports = (req, res, next) => {
  const products = [...req.body];

  const validationStatus = products.map((product) => salesSchema.validate(product));

  const errorFound = validationStatus.find((data) => data.error);

  if (errorFound) {
    const { message } = errorFound.error;

    const status = message.includes('required') ? 400 : 422;

    return res.status(status).json({ message });
  }

  next();
};
