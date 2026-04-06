import prisma from "../config/prisma.js";

// Create a new record
export async function createRecord(data, userId){
    const { amount, type, category, date, description } = data;

    if(amount <= 0){
        throw new Error("Amount must be greater than 0");
    }

    return await prisma.record.create({
        data: {
            amount,
            type,
            category,
            date: new Date(date),
            description,
            createdBy: userId
        }
    });
}

// Get all records with filtering, pagination and sorting
const allowedSortFields = ["date", "amount", "category"];
export async function getRecords(filters){
    const { 
        type, 
        category, 
        startDate, 
        endDate, 
        page=1, 
        size=10, 
        sortBy="date",      // default sorting by date
        sortOrder="desc"    // default sorting order
    } = filters;

    const pageNumber = Number(page) || 1;
    const sizeNumber = Number(size) || 10;

    // Ensure sortBy is one of the allowed fields, default to "date" if invalid
    const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "date";
    
    // Ensure sortOrder is either "asc" or "desc", default to "desc" if invalid
    const safeSortOrder = sortOrder.toLowerCase() === "asc" ? "asc" : "desc";

    const where = { isDeleted: false};

    if(type) where.type = type;
    if(category) where.category = category;
    if(startDate || endDate){
        where.date = {};
        if(startDate) where.date.gte = new Date(startDate);
        if(endDate) where.date.lte = new Date(endDate);
    }

    // Calculate the number of records to skip based on the current page and size
    const skip = (pageNumber - 1) * sizeNumber;

    const totalRecords = await prisma.record.count({ where });

    const records = await prisma.record.findMany({
        where,
        skip: Number(skip),
        take: sizeNumber,
        orderBy: {
            [safeSortBy]: safeSortOrder
        }
    });

    const totalPages = Math.ceil(totalRecords / sizeNumber);

    return {
        data: records,
        pagination: {
            totalRecords,
            currentPage: pageNumber,
            totalPages,
            nextPage: page < totalPages ? Number(page) + 1 : null,
            prevPage: page > 1 ? Number(page) - 1 : null
        }
    };
}

// Get a record by id
export async function getRecordById(id){
    const record = await prisma.record.findUnique({
        where: { id: Number(id)}
    });

    if(!record || record.isDeleted){
        throw new Error("Record not found");
    }

    return record;
}

// Update a record
export async function updateRecord(id, data){
    const existing = await prisma.record.findUnique({
        where: { id: Number(id)}
    });

    if(!existing || existing.isDeleted){
        throw new Error("Record not found");
    }

    // If date is being updated, convert it to a Date object
    if(data.date){
        data.date = new Date(data.date);
    }

    return await prisma.record.update({
        where: { id: Number(id) },
        data
    });
}

// soft delete a record
export async function deleteRecord(id){
    const existing = await prisma.record.findUnique({
        where: { id: Number(id) }
    });

    if(!existing || existing.isDeleted){
        throw new Error("Record not found");
    }

    return await prisma.record.update({
        where: { id: Number(id) },
        data: {
            isDeleted: true
        }
    });
}