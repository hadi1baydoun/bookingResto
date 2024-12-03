
import Resto from "../models/Resto.js";
import {createError} from "../utils/error.js";
import Tables from "../models/Tables.js";

export const createTable = async (req, res, next) =>{
    const restoId = req.params.restoId;
    const newTable = new Tables(req.body)

    try {
        const savedTable = await newTable.save(); // Save the new table
        try {
            // Update the restaurant to include the new table's ID
            await Resto.findByIdAndUpdate(restoId, {
                $push: { tables: savedTable._id }
            });
            res.status(200).json(savedTable); // Send success response
        } catch (err) {
            // Rollback: delete the saved table if updating the restaurant fails
            await newTable.deleteOne({ _id: savedTable._id });
            next(err);
        }
    } catch (err) {
        next(err); // Handle save errors
    }
};


export const updateTable = async (req, res, next) =>{
    try {
        const updatedTable = await Resto.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedTable);
    } catch (err) {
       
        next(err);
    }
}

export const deleteTable = async (req, res, next) =>{
    try {
        await Tables.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "tables has been deleted." });
    } catch (err) {
      
        next(err);
    }
}

export const getTable = async (req, res, next) =>{
    try {
        const table = await Tables.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ message: "No tabels available." });
        }
        res.status(200).json(table);
    } catch (err) {
        next(err);
    }
}

export const getTables = async (req, res, next) =>{
    try {
        const tables = await Tables.find();
        res.status(200).json(tables);
    } catch (err) {
        next(err);
    }
}