import express from "express"
const router = express.Router();

import { login, logout, signup, protect, updatePassword, resetPassword, forgotPassword } from '../controller/authController.js'
import { updateMe, getMe, updateUser, getAllUsers, getUser, deleteUser, deleteMe } from '../controller/userController.js'

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

router.post('/forgot-password', forgotPassword)
router.patch('/reset-password/:token', resetPassword)

router.use(protect)

router.patch('/update-my-password', updatePassword);
router.get('/me', getMe, getUser);
router.patch(
    '/update-me',
    updateMe
);
router.delete('/delete-me', deleteMe);

router.route('/').get(getAllUsers)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

export default router;