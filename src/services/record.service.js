import prisma from "../config/prisma.js";

// create record
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

// Get all records with filtering
export async function getRecords(filters){
    const { type, category, startDate, endDate } = filters;

    const where = {
        isDeleted: false
    };

    if(type) where.type = type;
    if(category) where.category = category;
    if(startDate || endDate){
        where.date = {};
        if(startDate) where.date.gte = new Date(startDate);
        if(endDate) where.date.lte = new Date(endDate);
    }

    return await prisma.record.findMany({
        where,
        orderBy: {
            date: "desc"
        }
    });
}

// Get record by id
export async function getRecordById(id){
    const record = await prisma.record.findUnique({
        where: { id: Number(id)}
    });

    if(!record || record.isDeleted){
        throw new Error("Record not found");
    }

    return record;
}

// update record
export async function updateRecord(id, data){
    const existing = await prisma.record.findUnique({
        where: { id: Number(id)}
    });

    if(!existing || existing.isDeleted){
        throw new Error("Record not found");
    }

    if(data.date){
        data.date = new Date(data.date);
    }

    return await prisma.record.update({
        where: { id: Number(id) },
        data
    });
}

// soft delete 
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