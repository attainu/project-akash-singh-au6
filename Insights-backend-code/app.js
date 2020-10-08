import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import globalErrorHandler from './controller/errorController.js' ;
import AppError from './utils/appError.js';
//importing Routes
import indexRouter from './routes/index.js';
import usersRouter from './routes/userRoute.js';
import videoRoutes from './routes/videoRoutes.js';
//require('./config/passport').default(passport);

// Initialize the app
var app = express();

// Defining the Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRouter);
//user route
app.use('/api/users', usersRouter);
// video route handler
app.use('/api/videos', videoRoutes);

//error handling
app.all('*', (req, res, next) => {
    next (new AppError(`can't find ${req.originalUrl} on this server!`))
})

app.use(globalErrorHandler);

export default app;
