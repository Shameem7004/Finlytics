import * as recordService from "../services/record.service.js";

// create record
export async function create(req, res) {
    try {
        const record = await recordService.createRecord(req.body, req.user.id);

        res.status(201).json({
            success: true,
            data: record
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

// get all records
export async function getAll(req, res) {
    try {
        const records = await recordService.getRecords(req.query);

        res.status(200).json({
            success: true,
            data: records
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

// get a record by id
export async function getOne(req, res){
    try {
        const record = await recordService.getRecordById(req.params.id);

        res.status(200).json({
            success: true,
            data: record
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
}

// update record
export async function update(req, res){
    try {
        const record = await recordService.updateRecord(req.params.id, req.body);

        res.status(200).json({
            success: true,
            data: record
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

}

// delete/remove the record
export async function remove(req, res){
    try {
        await recordService.deleteRecord(req.params.id);
        
        res.status(200).json({
            success: true,
            message: "Record deleted successfully"
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }

}

