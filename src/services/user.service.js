import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import {
    parsePagination,
    buildUserFilter,
    parseUserSorting
} from "../utils/query.utils.js";

// Get all users (Admin and analyst)
export async function getAllUsers(filters) {
    // for pagination
    const { pageNumber, sizeNumber, skip } = parsePagination(filters);
    // for filtering
    const where = buildUserFilter(filters);
    // for sorting
    const { safeSortBy, safeSortOrder } = parseUserSorting(filters);

    const totalRecords = await prisma.user.count({ where });

    const users = await prisma.user.findMany({
        where,
        skip,
        take: sizeNumber,
        orderBy: { [safeSortBy]: safeSortOrder },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true
        }
    });

    const totalPages = Math.ceil(totalRecords / sizeNumber);

    return {
        data: users,
        pagination: {
            totalRecords,
            currentPage: pageNumber,
            totalPages,
            nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
            prevPage: pageNumber > 1 ? pageNumber - 1 : null
        }
    };
}

// Get user by ID (Admin and analyst)
export async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

// Update user's role or status (admin only)
export async function updateUser(id, data, currentUserId) {
    if (Number(id) === currentUserId && data.role) {
        throw new Error("You cannot change your own role");
    }

    return prisma.user.update({
        where: { id: Number(id) },
        data
    });
}

// Delete user (soft) (admin only)
export async function deactivateUser(id, currentUserId) {
    if (Number(id) === currentUserId) {
        throw new Error("You cannot deactivate your own account");
    }

    return prisma.user.update({
        where: { id: Number(id) },
        data: { isActive: false }
    });
}

// Change password (user only)
export async function changePassword(userId, oldPassword, newPassword) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
        throw new Error("Old password is incorrect");
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    return prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
    });
}

