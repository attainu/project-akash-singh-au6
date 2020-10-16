import sharp from 'sharp'
import multer from 'multer'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import Video from '../models/Video.js'
import { getAll, getOne, deleteOne, updateOne, createOne } from './factoryHandler.js'

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/videos');
  },
  filename: (req, file, cb) => {
      //const ext = file.mimetype.split('/')[1];
      cb(null, `user-${req.user.name}-${Date.now()}`);
  }
});

const multerFilter = (req, file, cb) => {
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

// export const resizeVideo = catchAsync(async (req, res, next) => {
//   if (req.files === undefined) {
//       return next();
//   } else if (req.files.length === 0) {
//       return next()
//   }
//   req.files[0].originalname = `user-${req.user.id}-${Date.now()}.mp4`;
//   await sharp(req.files[0].buffer)
//       .resize(500, 500)
//       .toFormat('mp4')
//       .jpeg({ quality: 90 })
//       .toFile(`public/videos/${req.files[0].originalname}`);
//   next();
// });

export const getVideoById = getOne(Video)
export const getAllVideos = getAll(Video)
export const addVideo = catchAsync( async (req, res, next) =>{
  console.log(req.file.destination)
  const doc = await Video.create({
    title:req.body.title,
    user:req.user,
    video:`${req.file.destination}/${req.file.filename}`
  })
  console.log(req.file.destination)
res.status(200).json({
  message:"success",
  data: doc
})
next();
}
)
export const deleteVideo = deleteOne(Video)
export const renameVideo = updateOne(Video)