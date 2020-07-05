const Tarea = require('../models/tareas')

const taskCtrl = {}

taskCtrl.newTaskController = async (req, res) => {
    const { author, titulo, vence, prioridad } = req.body
    const newTarea = new Tarea({
        author,
        titulo,
        vence,
        prioridad
    })
    await newTarea.save((err, tareaSaved) => {
        if(err) res.json({status: 'Error en el servidor'})
        res.json({tarea: tareaSaved})
    })
}

taskCtrl.taskController = async (req, res) => {
    const tareas = await Tarea.find()
    res.json(tareas)
}

taskCtrl.updateTaskController = async (req, res) =>{
    const {titulo, descripcion} = req.body
    const newTarea = {titulo, descripcion}
    await Tarea.findByIdAndUpdate(req.params.id, newTarea)
    res.json({status: "Tarea actualziada correctamente"})
}

taskCtrl.deleteTaskController = async (req, res) => {
    await Tarea.findByIdAndDelete(req.params.id)
    res.json({status: "Tarea eliminada correctamente"})
}

module.exports = taskCtrl
