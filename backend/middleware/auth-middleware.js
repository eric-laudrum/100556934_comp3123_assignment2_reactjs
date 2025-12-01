const jwt =require('jsonwebtoken');
const User = require('../model/user');


// Protect routes / authenticate tokens
const protect = async (req, res, next) =>{
    try{
        // Get token
        const authHeader = req.headers.authorization;
        // Verify bearer token & extract
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({message: 'Error: Authorization failed'})
        }
        const token = authHeader.split(' ')[1];

        // Verify with JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user in db
        req.user = await User.findById(decoded.id).select('-password');

        next();
    }
    catch(error){
        res.status(401).json({message: 'Error, Authorization failed'})

    }
}; 

module.exports = {protect};