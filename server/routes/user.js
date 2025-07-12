import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register",async(req,res)=>{
    try{
        const { email,password } = req.body;
        const existingUser=await User.findOne({ email });
        if (existingUser) return res.status(400).json({message: "User already exists"});

        const hashedPassword=await bcrypt.hash(password,10);
        const user=new User({ email, password: hashedPassword});
        await user.save();

        res.status(201).json({message: "User created"});
    }
    catch(error){
        res.status(500).json({message: "Server error" });
    }
});

router.post("/login",async(req,res)=>{
    try{
        const { email,password }=req.body;
        const user=await User.findOne({ email });
        if(!user) return res.status(400).json({ message: " Email Invalid credentials" });

        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Password Invalid credentials" });

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn:"1d" });

        res.json({ token, userId:user._id, email: user.email });
    }
    catch(error){
        res.status(500).json({ message: "Server error "});
    }
});

export default router;