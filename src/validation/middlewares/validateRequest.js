export const validateRequest = (schema, property = "body") => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,      // it wil return all errors
            stripUnknown: true,     // remove unknown fields
            convert: true,          // for type coercion in joi
            errors: {
                wrap: {
                    label: false    // clean error message
                }
            }
        });

        // if validation passes
        if(!error){
            req[property] = value;  // to use the clean and converted data
            return next();
        }


        // formatting of validation error
        const errorDetails = error.details.map( (detail) => ({
            path: detail.path.join("."),
            message: detail.message
        }) );

        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: errorDetails
        });
    };
}