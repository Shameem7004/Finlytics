// Utility functions for parsing query parameters and building filters
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

// Utility function to parse sorting parameters
const allowedSortFields = ["date", "amount", "category"];
export function parseSorting({ sortBy = "date", sortOrder = "desc" }) {
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "date";
    const safeSortOrder = sortOrder.toLowerCase() === "asc" ? "asc" : "desc";

    return {
        safeSortBy,
        safeSortOrder
    };
}

// Utility function to build Prisma filter object based on query parameters
export function buildRecordFilter({ type, category, startDate, endDate }) {
    const where = { isDeleted: false };

    if (type) where.type = type;
    if (category) where.category = category;

    if (startDate || endDate) {
        where.date = {};
        if (startDate) where.date.gte = new Date(startDate);
        if (endDate) where.date.lte = new Date(endDate);
    }

    return where;
}