import Joi from "joi";

export const createPaymentSchema = Joi.object({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.any(),
    cvv: Joi.number().required(),
  }).required(),
});
