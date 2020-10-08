import multer from 'multer'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import Video from '../models/Video.js'
import { getAll, getOne, deleteOne, updateOne } from './factoryHandler.js'

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/videos');
  },
  filename: (req, file, cb) => {
      // const ext = file.mimetype.split('/')[1];
      cb(null, `user-${Date.now()}.mp4`);
  }
});

const multerFilter = (req, file, cb) => {
  console.log('multer filter')
  if (file.mimetype.startsWith('video')) {
      cb(null, true);
  } else {
      cb(new AppError('Please upload only videos.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

export const uploadVideo = upload.single('video');

export const addVideo = catchAsync(async(req, res, next) => {
  const doc = await Video.create({ 
    title: req.body.title,
    user: req.user,
    video: `${req.file.destination}/${req.file.filename}`
  })
  res.status(200).json({ message: 'success', data: doc })
})

export const getVideoById = getOne(Video)
export const getAllVideos = getAll(Video)
export const deleteVideo = deleteOne(Video)
export const renameVideo = updateOne(Video)
