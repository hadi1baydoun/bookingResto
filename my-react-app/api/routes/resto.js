import express from "express";
import Resto from "../models/Resto.js";
import { createError } from "../utils/error.js";
import { countByCity, countByType, createResto, deleteResto, getResto, getRestos, updateResto } from "../controllers/restos.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

// Create
router.post("/", verifyAdmin,createResto);

// Update
router.put("/:id",verifyAdmin, updateResto);

// Delete
router.delete("/find/:id",verifyAdmin, deleteResto);

// Get a specific restaurant
router.get("/:id", getResto);

// Get all restaurants
router.get("/", getRestos);

router.get("/", getRestos);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
