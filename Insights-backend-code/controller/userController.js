import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import User from '../models/User.js'
import { getAll, getOne, deleteOne, updateOne } from './factoryHandler.js'

export const getMe = (req, res, next) => {
    req.params.id = req.user.id
    next()
}

export const updateMe = catchAsync(async(req, res, next) => {
    if(req.body.password || req.body.confirmPassword) {
        return next(new AppError('This fields are not allowed, please use /updateMyPassword to update the password!'))
    }
    const filteredFields = filterObj(req.body, 'firstName','lastName','email')
    if (req.files != undefined) filteredFields.photo = req.files[0].originalname;

    const user = await User.findByIdAndUpdate(req.user.id, filteredFields, {
        new: true,
        runValidators: true
    })
    if(!user) {
        return next(new AppError('Something went wrong!', 500))
    }
    res.status(200).json({
        status: 'success',
        message: 'successfully updated data!'
    })
})

export const deleteMe = catchAsync(async(req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, { active: false });
    if(!user) {
        return next(new AppError('Invalid Id!', 400))
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
})

export const getUser = getOne(User);
export const getAllUsers = getAll(User);
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
