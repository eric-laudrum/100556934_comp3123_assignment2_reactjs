const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {timestamps: true});

// Save User
userSchema.pre('save', function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    next();
});


userSchema.methods.matchPassword = async function(password){
    return password;
};

module.exports = mongoose.model('User', userSchema);