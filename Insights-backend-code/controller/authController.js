import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { promisify } from 'util'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import User from '../models/User.js'
import Email from '../utils/email.js'

//signing token
const signToken = function (id) {
    return jwt.sign({id: id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
}


//creating token
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    // cookieOptions.secure = true
    res.cookie('jwt', token, cookieOptions)
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

//signup controller
export const signup = catchAsync(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    })
    const url = `${req.protocol}://${req.get('host')}/me`;
    await new Email(user, url).sendWelcome();
    createSendToken(user, 200, res)
})

//login controller
export const login = catchAsync(async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)
    if(!email || !password) {
        return next(new AppError('please enter email and password',400))
    }
    const user = await User.findOne({email: email}).select('+password')
    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect Credentials'))
    }
    createSendToken(user, 200, res)
})

//authentication middleware
export const protect = catchAsync(async(req, res, next) => {
  let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if(!token) {
        return next(new AppError('You are not logged in! login'))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    
    const freshUser = await User.findById(decoded.id)
    if(!freshUser) {
        return next(new AppError('this user does not exsist', 401))
    }

    if(freshUser.ifpasswordChangedAt(decoded.iat)) {
        return next(new AppError('password has been changed recently, login again!'))
    }
    req.user = freshUser
    res.locals.user = freshUser
    next();
})

//logout controller
export const logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};

//verifying token
export const isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
          return next();
      }

      if (currentUser.changedPasswordAfter(decoded.iat)) {
          return next();
      }

      req.user = currentUser
      res.locals.user = currentUser;
      return next();
    } catch (err) {
          return next();
    }
  }
  next();
};


//forgot password controller
export const forgotPassword = catchAsync(async(req, res, next) => {
  console.log('u')
  const user = await User.findOne({ email: req.body.email })
  console.log(user)
    if(!user) {
        return next(new AppError('This user does not exsist!', 404))
    }
    
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false })

    const resetURL = `For Browser: ${req.protocol}://${req.get('host')}/reset-password/${resetToken}
                      For API: ${req.protocol}://${req.get('host')}/api/users/reset-password/${resetToken}`
    const message = `If you forgot your password, please use a patch request with your new password and password confirm to ${resetURL} \nif not kindly ignore the message!`
    try{
        await new Email(user, resetURL).sendPasswordReset();
        res.status(200).json({
            status: 'success',
            message: 'successfully sent!'
        })
    } catch (err) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: false })
        console.log(err.message, err.stack)
        res.status(500).json({
            status: 'fail',
            message: 'something went wrong'
        })
    }
})

//reset password controller
export const resetPassword = catchAsync(async(req, res, next) => {

  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } }).select('+password')

    if(!user) {
        return next(new AppError('invalid or expired token!', 400))
    }
    const check = await user.correctPassword(req.body.password, user.password)
    if (check) {
        return next(new AppError('Please use a password not used before!'))
    }
    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    createSendToken(user, 200, res)
})

//update password controller
export const updatePassword = catchAsync(async(req, res, next) => {
    // Get user from the collection
    const user = await User.findOne({ _id: req.user._id }).select('+password')

    if(!user) {
        return next(new AppError('No user found, kindly login!'))
    }
    // check if posted current password is correct
    const postedPrevious = req.body.oldPassword;
    const postedPassword = req.body.password;
    const postedConfrimPassword = req.body.confirmPassword;

    const check = await user.correctPassword(postedPrevious, user.password)

    if(!check) {
        return next(new AppError('Invalid old password entered kindly check!'))
    }

    user.password = postedPassword
    user.confirmPassword = postedConfrimPassword
    await user.save()

    createSendToken(user, 200, res)
})