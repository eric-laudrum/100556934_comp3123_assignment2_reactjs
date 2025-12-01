const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); 
const jwt = require('jsonwebtoken');


// Sign Up
router.post('/signup', [
    body('email').isEmail().withMessage("Error: Invalid email"),
    body('password').isLength({min: 6}).withMessage("Error: Password must be at least 6 characters")
],
async( req, res) => {
    // Add validation request before processing input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    let {email, password} = req.body;
    email = email.toLowerCase();


    try{
        const existingUser = await User.findOne({email});
        
        // Handle duplicate emails
        if(existingUser){
            return res.status(400).json({message: "Error: Email already exists"});
        }

        // Proceed to create account
        const newUser = new User({ email, password }); // no manual hashing
        await newUser.save();

        res.json({message: 'Account created successfully'})

    } catch(e){
        console.error(e);
        res.status(500).json({message: 'Error: Sign up failed'})
    }
});


// Login
router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) =>{

    let {email, password} = req.body;
    email = email.toLowerCase();

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;