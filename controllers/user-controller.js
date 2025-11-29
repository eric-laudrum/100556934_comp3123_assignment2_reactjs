const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Sign Up
exports.signUp = async (req, res, next)=>{
    const {email, password} = req.body;

    try{
        // Check if user exists
        if(await User.findOne({email})){
            return res.status(400).send({error: 'Email already exists'});
        }

        // Create password & generate jwt token
        const user = await User.create({email, password});
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Return success msg & token
        res.status(200).json({
            message: 'User created successfully',
        token});
    } catch(error){
        next(error);
    }
};

// Login
exports.login = async(req, res, next)=>{
    const {email, password} = req.body;
    try{
        // Verify login info
        const user = await User.findOne({email});
        if(!user || !(await user.matchPassword(password))){
            return res.status(400).send({error: 'Invalid email or password'});
        }

        // Generate JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Return success msg & token 
        res.status(200).json({
            message: 'User logged in successfully',
            token});
    } catch(e){
        next(e);
    }
};