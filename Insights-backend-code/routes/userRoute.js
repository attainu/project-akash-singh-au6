import express from "express"
const router = express.Router();

import { login, logout, signup, protect, updatePassword, resetPassword, forgotPassword } from '../controller/authController.js'
import { updateMe, getMe, updateUser, getAllUsers, getUser, deleteUser, deleteMe } from '../controller/userController.js'

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

router.post('/forgot-password', forgotPassword)
router.patch('/reset-password/:token', resetPassword)

router.patch('/update-password', protect, updatePassword);
router.get('/me', protect, getMe, getUser);
router.patch(
    '/update-me',
    protect,
    updateMe
);
router.delete('/delete-me', protect, deleteMe);

router.route('/').get(getAllUsers)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router