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

// schema for changing password
export const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
    confirmNewPassword: Joi.string()
        .valid(Joi.ref("newPassword"))
        .required()
        .strip()
        .messages({
            "any.only": "Password do not match"
        }),
});

// Admin can only update role and active status
export const updateUserSchema = Joi.object({
    role: Joi.string().valid("ADMIN", "ANALYST", "VIEWER"),
    isActive: Joi.boolean(),
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),

    password: Joi.forbidden()
}).min(1);

// schema for parsing user id from params to avoid invalid id error from prisma
export const userIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

