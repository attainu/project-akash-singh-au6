import Like from '../models/Like.js';
import Video from '../models/Video.js';
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import { getAll, deleteOne } from './factoryHandler.js'

export const createLike = catchAsync(async(req, res, next) => {
    const user = req.user
    const video = await Video.findById({ _id: req.params.id })
    console.log(user, video)
    if (!user || !video) {
        return next(new AppError('Bad Request', 400))
    }
    const doc = await Like.findOne({ video, user })
    console.log(doc)
    if (!doc) {
        const like = await Like.create({ 
            like: true,
            video,
            user
        })
    
        if (!like) {
            return next(new AppError('Server Error', 500))
        }
    
        res.status(200).json({
            message: 'success',
            data: like
        })
    } else {
        await Like.findByIdAndDelete(doc._id)
        res.status(200).json({ message: 'success' })
    }
})

export const getLikes = getAll(Like)
export const deleteLike = deleteOne(Like)

export const getLikePerVideo = catchAsync(async(req, res, next) => {
    const video = await Video.findById({ _id: req.params.id })
    if (!video) {
        return next(new AppError('Video does not exsist'))
    }
    const doc = await Like.findOne({ video: video })

    if (!doc) {
        return next(new AppError('No like found', 500))
    }

    res.status(200).json({ 
        message: 'success',
        data: doc
     })
})

export const getLikePerUser = catchAsync(async(req, res, next) => {
    const user = req.user
    const video = await Video.findById({ _id: req.params.id })
    if (!user || !video) {
        return next(new AppError('Error', 400))
    }
    const doc = await Like.findOne({ video, user })
    if (!doc) {
        return next(new AppError('Server error', 500))
    }

    res.status(200).json({
        message: 'success',
        data: doc
    })
})