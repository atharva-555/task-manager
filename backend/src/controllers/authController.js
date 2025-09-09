import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../models/index.js';
const { User } = models;

export const register =async (req,res)=>{

    try{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({error:"All fields are required"});
    }
    const existingUser=await User.findOne({where:{email}});
    if(existingUser){
        return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword=await bcrypt.hash(password,12);
    const newUser = await User.create({name,email,password:hashedPassword});
    res.status(201).json({message:"User registered successfully",userID:newUser.id});
    }catch(err){return res.status(500).json({error:err.message});  }

}

export const login =async (req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"All fields are required"});
        }
        const user = await User.findOne({where:{email}});

        if(!user){
            return res.status(401).json({error:"User not found"});
        }
        if(!await bcrypt.compare(password,user.password)){
            return res.status(401).json({error:"Invalid credentials"});
        }
        // If password matches generate JWT
        const token = jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET,{expiresIn:process.env.TOKEN_EXPIRY_TIME});
        

            res.json({message:"Login successful",token});
        } catch(err){
            return res.status(500).json({error:err.message});
        }
    }