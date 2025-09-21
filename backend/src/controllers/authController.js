import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../models/index.js';
import validate from '../utils/inputValidations.js';

const { User } = models;

export const register =async (req,res)=>{

    try{
    const {name,email,password}=req.body;

    // Validate inputs
    const nameValidate = validate.name(name, 'name', true);
    const emailValidate = validate.email(email, 'email', true);
    const passwordValidate = validate.password(password, 'password', true);

    // console.log("nameValidate:",nameValidate,"emailValidate:",emailValidate,"passwordValidate:",passwordValidate);

    if(nameValidate){
        return res.status(400).json({error:nameValidate.message});
    }
    if(emailValidate){
        return res.status(400).json({error:emailValidate.message});
    }
    if(passwordValidate){
        return res.status(400).json({error:passwordValidate.message});
    };

    // Check for missing fields
    if(!name || !email || !password){
        return res.status(400).json({error:"All fields are required"});
    }

    // Check if user already exists
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

         // Validate inputs
        const emailValidate = validate.email(email, 'email', true);
        const passwordValidate = validate.password(password, 'password', true);

        if(emailValidate){
            return res.status(400).json({error:emailValidate.message});
        }
        if(passwordValidate){
            return res.status(400).json({error:passwordValidate.message});
        };

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

        // console.log(user);
        
        // If password matches generate JWT

        const token = jwt.sign({id:user.id,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:process.env.TOKEN_EXPIRY_TIME});
        
        console.log("token:",token);
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure in production
            // Since we are using localhost, we need to set sameSite to 'lax'
            // sameSite: "lax",
            // ENABLE FOR PRODUCTION
            sameSite: 'none',
            maxAge: parseInt(process.env.TOKEN_EXPIRY_TIME)
            // maxAge: process.env.TOKEN_EXPIRY_TIME,
            });

            res.json({message:"Login successful",token,user:{id:user.id,name:user.name,email:user.email,role:user.role}});
        } catch(err){
            return res.status(500).json({error:err.message});
        }
    }

export const logout = async (req,res)=>{
    try{
    res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    });
    res.json({ message: 'Logout successful' });
    }catch(err){
                  return res.status(500).json({error:err.message});
    }
}

// Get current user info - Enhanced endpoint for session recovery
export const getCurrentUser = async (req, res) => {
    try {
        // req.user should be populated by auth middleware
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        // Get complete user data from database
        const user = await User.findOne({
            where: { id: req.user.id },
            attributes: ['id', 'name', 'email', 'role', 'createdAt'] 
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log("ENdpoint called");
        console.log("USER_ID::",user.id);
        
        // Return user data in format expected by frontend
        res.json({
            success: true,
            message: 'User info retrieved',
            data: {
                id: user.id,
                email: user.email,
                role: user.role || 'user', // Default to 'user' if no role provided
                name: user.name,
            }
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
    try {
        // Only admins can access this endpoint
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin role required.' });
        }

        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'role', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}