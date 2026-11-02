import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {

    try {

        const { fullName, email, password, role } = req.body;

        if (!fullName || !email || !password || !role) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(409).json({
                success: false,
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

       const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
    role
});

const userResponse = {
    _id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
    role: newUser.role,
    isActive: newUser.isActive,
    createdAt: newUser.createdAt
};

res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    data: userResponse
});

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        // 2. Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // 3. Check password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // 4. Create JWT
        const token = jwt.sign(
            {
                _id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // 5. Store JWT in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // 6. Send response
        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                isActive: user.isActive
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const getProfile = async (req, res) => {

    return res.status(200).json({
        success: true,
        message: "You are authenticated",
        user: req.user
    });

};

export const doctorTest = async (req, res) => {

    return res.status(200).json({
        success: true,
        message: "Doctor access granted",
        user: req.user
    });

};