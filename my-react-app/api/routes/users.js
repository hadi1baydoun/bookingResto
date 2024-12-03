import express from "express";
import {deleteUser, getUser, getUsers, updateUser,} from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import pkg from "jsonwebtoken"
const router =  express.Router();

// router.get("/checkauthentication", verifyToken,(req,res, next)=>{
//     res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser,(req,res, next)=>{
//     res.send("hello user, you are logged in and delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin,(req,res, next)=>{
//     res.send("hello admin, you can logged in and delete all accounts")
// })

// Update
router.put("/:id",verifyUser, updateUser);

// Delete
router.delete("/:id",verifyUser, deleteUser);

// Get a specific restaurant
router.get("/:id", verifyUser,getUser);

// Get all restaurants
router.get("/", verifyAdmin,getUsers);



export default router