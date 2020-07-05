require('dotenv').config();
const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
require('./database')

app.set('port', process.env.PORT || 4000)

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api', require('./routes/users.routes'))
app.use('/api', require('./routes/task.routes'))

app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto ', app.get('port'))
})