import prisma from "../config/prisma.js";
import {
    parsePagination,
    parseSorting,
    buildRecordFilter
} from "../utils/query.utils.js";

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
export async function getRecords(filters){
    // for pagination
    const { pageNumber, sizeNumber, skip } = parsePagination(filters)
    // for sorting
    const { safeSortBy, safeSortOrder } = parseSorting(filters);
    // for filtering
    const where = buildRecordFilter(filters);

    const totalRecords = await prisma.record.count({ where });

    const records = await prisma.record.findMany({
        where,
        skip,
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
            nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
            prevPage: pageNumber > 1 ? pageNumber - 1 : null
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