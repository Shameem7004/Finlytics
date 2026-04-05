import prisma from "../config/prisma.js";

// Get all users
export async function getAllUsers() {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true
        }
    });
}


// Update role or status
export async function updateUser(id, data) {
    return prisma.user.update({
        where: { id: Number(id) },
        data
    });
}

// Delete user (soft)
export async function deactivateUser(id) {
    return prisma.user.update({
        where: { id: Number(id) },
        data: { isActive: false }
    });
}