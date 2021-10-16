const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Task must have some name'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

taskSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-__v -_id',
  });
  next();
});

taskSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
