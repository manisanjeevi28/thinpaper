const express = require('express');
const router = express.Router();

const tasksController = require('../Controllers/TasksController');

router.get('/list', tasksController.getList);
router.post('/add', tasksController.addTask);
router.post('/:id', tasksController.getTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;