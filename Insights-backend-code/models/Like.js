import mongoose from "mongoose"

const LikeSchema = new mongoose.Schema({
    like: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true]
    },
    video: {
        type: mongoose.Schema.ObjectId,
        ref: 'Video',
        required: [true]
    }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

LikeSchema.statics.calculateLikes = async function(videoId, userId) {
    const likes = await this.aggregate([
        {
            $match: { $and: [{ user: userId }, { video: videoId }] }
        },
        {
            $count: 'likes'
        }
    ])
    console.log(likes)
}

const Like = mongoose.model('Like', LikeSchema);

export default Like