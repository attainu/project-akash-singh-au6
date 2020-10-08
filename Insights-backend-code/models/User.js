import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

import uniqueValidator from "mongoose-unique-validator"

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name field cannot be empty!']
    },
    email: {
        type: String,
        unique:  [true, 'Email already exsists!'],
        index: true,
        required: [true, 'Email field cannot be empty!'],
        validate: [validator.isEmail, 'Enter valid email!']
    },
    username: {
        type: String,
        unique: [true, 'username already exsists!'],
        required: [true, 'Username cannot be empty!']
    },
    password: {
        type: String,
        required: [true, 'Please enter a strong password!']
    },
    confirmPassword: {
        type: String,
        validate: {
            validator: function(el) {
                return el === this.password
            },
            message: 'Please enter same password'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires:Date,
    videos: {
        type: String,
        ref: 'Videos'
    }
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12)

    this.confirmPassword = undefined
    next()
})

userSchema.pre('save', function(next) {
    if(!this.isModified('password') || this.isNew) return next()

    this.passwordChangedAt = Date.now() - 1000;
    next()
})

userSchema.methods.correctPassword = function (currentPassword, storedPassword) {
    return bcrypt.compare(currentPassword, storedPassword)
}

userSchema.methods.ifpasswordChangedAt = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const time = parseInt(this.passwordChangedAt.getTime()/1000, 10);
        return JWTTimestamp < time 
    }
    return false;
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
    
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
};

const User = mongoose.model('User', userSchema);


export default User