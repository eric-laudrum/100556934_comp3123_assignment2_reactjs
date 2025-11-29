const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, 
{timestamps: true});

// Password Hashing
userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Match Password
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};



module.exports = mongoose.model('User', userSchema);