const mongoose = require('mongoose');
const { Schema } = mongoose

const ShemaTarea = new Schema({
    author: {
        type: String,
        require: true
    },
    titulo: {
        type: String, 
        required: true
    },
    vence: {
        type: String, 
        required: true
    },
    prioridad: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Tarea',ShemaTarea )