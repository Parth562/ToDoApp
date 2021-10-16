const express = require('express');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(taskController.getAllTasks)
  .post(userController.protect, taskController.addTask)
  .delete(userController.protect, taskController.deleteTask);

router.route('/:taskId').get(taskController.getTask);

router
  .route('/getAlltasks/:userId')
  .get(userController.protect, taskController.getAllTasksByUserId);

module.exports = router;
