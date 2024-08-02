//const sessionIdToUserMap = new Map()
const jwt = require('jsonwebtoken')
//const secret = "santosh@@@###"

function setUser(user){
    //sessionIdToUserMap.set(id,user);
    return jwt.sign({
        _id:user._id,
        email:user.email
    },process.env.SECRET_KEY)
}

function getUser(token){
    //return sessionIdToUserMap.get(id);
    if(!token) return null

    try {
        return jwt.verify(token,process.env.SECRET_KEY)
    } catch (error) {
        return null
    }
    
}

module.exports = {
    setUser,
    getUser
}