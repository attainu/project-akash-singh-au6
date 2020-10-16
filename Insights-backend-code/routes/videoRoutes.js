import express from 'express'
import { protect } from '../controller/authController.js'
import { createLike, getLikePerVideo } from '../controller/likeController.js'
import { getAllVideos, getVideoById, addVideo, uploadVideo, renameVideo, deleteVideo } from '../controller/videoController.js'
import { createComment, deleteComment, getCommentPerVideo } from '../controller/commentController.js'

const router = express.Router()

router.route('/').get(getAllVideos).post(protect, uploadVideo, addVideo)
router.route('/:id').get(getVideoById).delete(protect, deleteVideo).patch(protect, renameVideo)
router.route('/:id/comment').get(protect, getCommentPerVideo).post(protect, createComment).delete(protect, deleteComment)
router.route('/:id/like').post(protect, createLike).get(getLikePerVideo)

export default router