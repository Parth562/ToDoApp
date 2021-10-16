const Task = require('../models/taskModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find();

  res.status(200).json({
    status: 'success',
    length: tasks.length,
    data: tasks,
  });
});

exports.addTask = catchAsync(async (req, res, next) => {
  const task = await Task.create(req.body);

  await User.updateOne(
    { _id: req.body.user },
    { $push: { tasks: { $each: [task._id] } } }
  );

  res.status(201).json({
    status: 'success',
    data: task,
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.deleteOne({ name: req.body.name });
  res.status(204).json({
    status: 'successfully deleted',
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.taskId });

  res.status(200).json({
    status: 'success',
    data: task,
  });
});

exports.getAllTasksByUserId = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({ user: req.params.userId }).select('-user');

  res.status(200).json({
    status: 'success',
    userId: req.params.userId,
    tasks,
  });
});
