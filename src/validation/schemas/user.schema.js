import Joi from "joi";

// schema for registration of new user
export const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),

    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .strip()
        .messages({
            "any.only": "Password do not match"
        }),

    role: Joi.string()
        .valid("ADMIN", "ANALYST", "VIEWER")
        .messages({
             "any.only": "Role must be one of ADMIN, ANALYST, or VIEWER"
        })

});

// schema for login
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});