import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY;
export function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        secretKey,
        { expiresIn: "1d" }
    );
};