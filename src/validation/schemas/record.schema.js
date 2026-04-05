import Joi from "joi";

// schema for creating record
export const createRecordSchema = Joi.object({
    amount: Joi.number().positive().required(),
    type: Joi.string().valid("INCOME", "EXPENSE").required(),
    category: Joi.string().required(),
    date: Joi.date().required(),
    description: Joi.string().optional()
})

// Schema for updating the record
export const updateRecordSchema = Joi.object({
    amount: Joi.number().positive(),
    type: Joi.string().valid("INCOME", "EXPENSE"),
    category: Joi.string(),
    date: Joi.date(),
    description: Joi.string()
}).min(1).messages({
    "object.min": "At least one field must be provided for update"
});