const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false
    },
}, { timestamps: true });

// Checking password match with User
// Creating a custom method in user schema
userSchema.methods.matchPassword = async function(enteredPassword) {
    // Have to match hash
    return await bcrypt.compare(enteredPassword, this.password)
}
// Register Password Hashing and Storing
userSchema.pre("save", async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model('User', userSchema)