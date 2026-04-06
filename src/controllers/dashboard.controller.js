import * as dashboardService from "../services/dashboard.service.js";

// get summary function
export async function getSummary(req, res){
    try {
        const data = await dashboardService.getSummary();
        
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// get category wise breakdown
export async function getCategories(req, res){
    try {
        const data = await dashboardService.getCategoryBreakdown();
        
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// get monthly trends
export async function getTrends(req, res){
    try {
        const data = await dashboardService.getMonthlyTrends();
        
        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// get recent activity
export async function getRecent(req, res){
    try {
        const data = await dashboardService.getRecentActivity();

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

