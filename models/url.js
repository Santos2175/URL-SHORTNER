const {Schema, model} = require('mongoose')

const urlSchema = new Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:[{timestamps:{type:Number}}],
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true})

const URL = model('url', urlSchema)

module.exports = URL