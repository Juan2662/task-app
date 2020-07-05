const User = require('../models/Users')
const jwt = require('jsonwebtoken')

const userController = {}

userController.registerController = async (req, res) => {
    let userData = {
        name: '',
        email: '',
        password: ''
    }
    userData.name = req.body.name
    userData.email = req.body.email
    userData.password = req.body.password
    const newUser = new User(userData)
    newUser.password = await newUser.encryptPassword(req.body.password)
    await newUser.save((err, user) => {
        if(err) {
            if(err.code === 11000){
                res.json({status: 11000})
            }else{
                console.log('El error es ->', err)
                res.json({status: 'Error al guardar'})
            }
        }else{
            const token = jwt.sign({id: user._id}, 'secretoDeEstado', {
                expiresIn: 60 * 60 * 24
            })
            res.json({auth: true, data: {token, author: newUser.name}})

        }
    })
}

userController.loginController = async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.json({auth: false, status: 'Por favor verifica tus datos'})
    }
    const validPassword = await user.matchPassword(req.body.password, user.password)
    if(!validPassword){
        return res.json({auth: false, status: 'La contraseña es incorrecta'})
    }
    const token = jwt.sign({id: user._id}, 'secretoDeEstado', {
        expiresIn: 60 * 60 * 24
    });
    res.json({auth: true, data: {token, author: user.name}})
}


module.exports = userController