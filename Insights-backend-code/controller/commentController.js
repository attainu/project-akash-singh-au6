import Comment from '../models/Comment.js'
import { getAll, deleteOne } from './factoryHandler.js'
import Video from '../models/Video.js';
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'

//adding comment
export const createComment = catchAsync(async (req, res, next) => {
    const user = req.user
    const video = await Video.findById({ _id: req.params.id })

    if (!user || !video) {
        return next(new AppError('Bad Request', 400))
    }
    const doc = await Comment.create({
        type: req.body.type,
        comments: req.body.userComment,
        username: user.username,
        videos: video
    })
    res.status(200).json({
        message: 'success',
        data: doc
    })
})

//deleting of comment
export const deleteComment = deleteOne(Comment)


//to get comment for particular video
export const getCommentPerVideo = catchAsync(async (req, res, next) => {
    const video = await Video.findById({ _id: req.params.id })
    if (!video) {
        return next(new AppError('Video does not exsist'))
    }
    const doc = await Comment.findOne({ videos:video })

    if (!doc) {
        return next(new AppError('No Comment found', 500))
    }

    res.status(200).json({
        message: 'success',
        data: doc
    })
})
