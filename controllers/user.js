const User = require('../models/user')
//const {v4:uuidv4} = require('uuid')
const {setUser} = require('../service/auth')

async function createUserSignup(req,res){
    
    const {name,email,password} = req.body
    
    await User.create({
        name,
        email,
        password
    })

    return res.render('home')
}

async function createUserLogin(req,res){
    const {email, password} = req.body

    const user = await User.findOne({email, password})

    if(!user){
        return res.render('login', {
            error:"Invalid username or password"
        })
    }

    //const sessionId = uuidv4();
    //setUser(sessionId, user)
    //res.cookie('uid', sessionId)

    const token = setUser(user)
    console.log(token)
    res.cookie('uid', token)

    return res.redirect('/')
}

module.exports = {
    createUserSignup,
    createUserLogin
}