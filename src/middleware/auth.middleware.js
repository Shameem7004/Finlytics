import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        const token = authHeader.split(" ")[1];

        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedData;

        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false,
            message: "Invalid token" 
        });
    }
}