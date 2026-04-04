import { registerUser, loginUser } from "../services/auth.service.js";
import { generateToken } from "../utils/jwt.js";


// register the user
export async function register(req, res) {
    try {
        const user = await registerUser(req.body);
        
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
 
    }
}

// login the user
export async function login(req, res){
    try {
        const user = await loginUser(req.body);
        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}