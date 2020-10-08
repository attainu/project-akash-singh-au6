import mongoose from "mongoose"

import uniqueValidator from "mongoose-unique-validator"

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title field cannot be empty!']
    },
    video: {
        type: String,
        unique: [true, 'Video already uploaded!'],
        index: true,
        required: [true, 'Upload your video!']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Video must belong to a user']
    },
    likes: {
        type: mongoose.Schema.ObjectId,
        ref: 'Like'
    },
    comments: {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

VideoSchema.pre(/^find/, function(next) {
    this.populate({
      path: 'likes',
    })
    next()
  })

VideoSchema.plugin(uniqueValidator);

const Video = mongoose.model('Video', VideoSchema);

export default Video