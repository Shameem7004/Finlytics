import * as userService from "../services/user.service.js";

// Get all users
export async function getUsers(req, res) {
    try {
        const users = await userService.getAllUsers(req.query);

        res.json({ 
            success: true, 
            data: users 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: err.message 
        });
    }
}

// Update user role or status
export async function updateUser(req, res) {
    try {
        const user = await userService.updateUser(req.params.id, req.body, req.user.id);

        res.json({ 
            success: true, 
            data: user 
        });
    } catch (err) {
        res.status(400).json({ 
            success: false, 
            message: err.message 
        });
    }
}

// Deactivate user (soft delete)
export async function deactivateUser(req, res) {
    try {
         await userService.deactivateUser(req.params.id, req.user.id);

        res.json({ 
            success: true, 
            message: "User deactivated" 
        });
    } catch (err) {
        res.status(400).json({ 
            success: false, 
            message: err.message 
        });
    }
}

// Get current user profile -> All Authenticated Users
export async function getMe(req, res) {
    try {
        res.json({
            success: true,
            data: req.user
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}