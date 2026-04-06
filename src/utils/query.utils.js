// Utility function to parse pagination parameters
export function parsePagination({ page = 1, size = 10 }) {
    const pageNumber = Math.max(1, Number(page) || 1);
    const sizeNumber = Math.max(1, Number(size) || 10);

    return {
        pageNumber,
        sizeNumber,
        // Calculate the number of records to skip based on the current page and size
        skip: (pageNumber - 1) * sizeNumber
    };
}

// Utility function to parse sorting parameters for records
const allowedSortFields = ["date", "amount", "category"];
export function parseSorting({ sortBy = "date", sortOrder = "desc" }) {
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "date";
    const safeSortOrder = sortOrder.toLowerCase() === "asc" ? "asc" : "desc";

    return {
        safeSortBy,
        safeSortOrder
    };
}

// Utility function to build record filter for search functionality
export function buildRecordFilter({ type, category, startDate, endDate, search }) {
    const where = { isDeleted: false };

    if (type) where.type = type;
    if (category) where.category = category;

    if (startDate || endDate) {
        where.date = {};
        if (startDate) where.date.gte = new Date(startDate);
        if (endDate) where.date.lte = new Date(endDate);
    }

    if (search) {
        where.OR = [
            { category: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } }
        ];
    }

    return where;
}

// Utility function to build user filter for search functionality
export function buildUserFilter({ search }) {
    const where = { isActive: true };

    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } }
        ];
    }

    return where;
}

// Utility function to parse sorting parameters for users
const allowedUserSortFields = ["id", "createdAt", "name", "email"];
export function parseUserSorting({ sortBy = "id", sortOrder = "asc" }) {
    const safeSortBy = allowedUserSortFields.includes(sortBy) ? sortBy : "id";
    const safeSortOrder = sortOrder.toLowerCase() === "desc" ? "desc" : "asc";

    return {
        safeSortBy,
        safeSortOrder
    };
}