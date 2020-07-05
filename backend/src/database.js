const mongoose = require('mongoose')

const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(db => console.log('La base de datos esta conectada.'))
    .catch(err => console.log('Error al conectar la base de datos: ', err))

module.exports = mongoose;