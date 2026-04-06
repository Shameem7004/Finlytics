import prisma from "../config/prisma.js";

// Summary
export async function getSummary(){
    const result = await prisma.$queryRaw`
        SELECT
            COALESCE(SUM(CASE WHEN type='INCOME' THEN amount ELSE 0 END), 0) AS "totalIncome",
            COALESCE(SUM(CASE WHEN type='EXPENSE' THEN amount ELSE 0 END), 0) AS "totalExpense"
        FROM "Record"
        WHERE "isDeleted" = false;

    `;

    const data = result[0];

    return {
        totalIncome: Number(data.totalIncome),
        totalExpense: Number(data.totalExpense),
        netBalance: Number(data.totalIncome) - Number(data.totalExpense)
    };
}

// category wise breakdown
export async function getCategoryBreakdown(){
    const result = await prisma.$queryRaw`
        SELECT category,
            COALESCE(SUM(CASE WHEN type='INCOME' THEN amount ELSE 0 END), 0) as income,
            COALESCE(SUM(CASE WHEN type='EXPENSE' THEN amount ELSE 0 END), 0) as expense
        FROM "Record"
        WHERE "isDeleted" = false
        GROUP BY category
        ORDER BY category 
    `;

    return result.map(row => ({
        category: row.category,
        income: Number(row.income),
        expense: Number(row.expense),
        netBalance: Number(row.income) - Number(row.expense)
    }));
}

// monthly trends
export async function getMonthlyTrends(){
    const result = await prisma.$queryRaw`
        SELECT 
            DATE_TRUNC('month', date) AS month,
            COALESCE(SUM(CASE WHEN type='INCOME' THEN amount ELSE 0 END), 0) AS income,
            COALESCE(SUM(CASE WHEN type='EXPENSE' THEN amount ELSE 0 END), 0) AS expense
        FROM "Record"
        WHERE "isDeleted" = false
        GROUP BY month
        ORDER BY month DESC
    `;

    return result.map(row => ({
        month: row.month,
        income: Number(row.income),
        expense: Number(row.expense),
        netBalance: Number(row.income) - Number(row.expense)
    }));
}

// recent activity
export async function getRecentActivity(){
    return await prisma.$queryRaw`
        SELECT id, amount, type, category, date
        FROM "Record"
        WHERE "isDeleted" = false
        ORDER BY date DESC
        LIMIT 10;
    `;
}