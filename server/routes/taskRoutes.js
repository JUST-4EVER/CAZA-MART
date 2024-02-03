const express = require('express');
const userAuthentication = require('../middlewares/UserAuthenticate');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const taskRoutes = express.Router();
taskRoutes.get('/tasks', userAuthentication, getTasks);
taskRoutes.post('/task/add', userAuthentication, createTask);
taskRoutes.put('/task/:id', userAuthentication, updateTask);
taskRoutes.delete('/task/:id', userAuthentication, deleteTask);

module.exports = taskRoutes;