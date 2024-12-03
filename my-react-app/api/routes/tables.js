import express from "express";
import { createTable, deleteTable, getTable, getTables, updateTable } from "../controllers/table.js";
import {verifyAdmin} from "../utils/verifyToken.js";
const router =  express.Router();

// Create
router.post("/:restoId", verifyAdmin,createTable);

// Update
router.put("/:id",verifyAdmin, updateTable);

// Delete
router.delete("/:id",verifyAdmin, deleteTable);

// Get a specific restaurant
router.get("/:id", getTable);

// Get all restaurants
router.get("/", getTables);


export default router