import mongoose from "mongoose"

import uniqueValidator from "mongoose-unique-validator"

const CommentSchema = new mongoose.Schema({
    type: {
        type: String 
    },
    comments: {
        type: String,
        required: true
    },
    username: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    likes: {
        type: mongoose.Schema.ObjectId,
        ref: 'Like'
    }
});

UserSchema.plugin(uniqueValidator)

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment