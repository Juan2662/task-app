const express = require("express");
const router = express.Router();

const verifyLogin = require('../config/verifyLogin')

const {
    newTaskController,
    taskController,
    updateTaskController,
    deleteTaskController
} = require('../controllers/task.controller')

router.post('/newTask', verifyLogin, newTaskController)
router.get('/task', verifyLogin, taskController)
router.put('/updateTask/:id', verifyLogin, updateTaskController)
router.delete('/delete/:id', verifyLogin, deleteTaskController)

module.exports = router;