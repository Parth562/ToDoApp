const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

app.all('*', (req, res, next) => {
  return new AppError(`Can't find ${req.originalUrl} on this server...`, 404);
});

app.use(globalErrorHandler);

module.exports = app;
