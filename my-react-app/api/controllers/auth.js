import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Register Controller
export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        await newUser.save();
        res.status(201).send("User has been created.");
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "User not found")); // Return error if user doesn't exist

        // Verify the password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong email or password!"));

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET
        );

        // Extract sensitive details before sending the response
        const { password, isAdmin, ...otherDetails } = user._doc;

        // Send response with the token in cookies
        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({ ...otherDetails });
    } catch (err) {
        next(err); // Pass error to the error handler middleware
    }
};
