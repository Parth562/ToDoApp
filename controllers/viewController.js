const Task = require('../models/taskModel');
const catchAsync = require('../utils/catchAsync');

exports.getHome = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({ user: req.body.user });
  const taskList = tasks.map((task) => task.name);

  res.status(200).render('base', {
    title: 'Todo List',
    taskList,
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login',
  });
});

exports.getSignupForm = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Create an Account',
  });
});
