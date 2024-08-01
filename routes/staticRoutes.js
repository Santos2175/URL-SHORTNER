const {Router} = require('express')
const Url = require('../models/url')

const router = Router()


router.get('/',async (req,res)=>{
    if(!req.user) return res.redirect('/login')
    const allUrls = await Url.find({createdBy:req.user._id})
    return res.render('home',{
        urls:allUrls
    })
})

router.get('/signup', (req,res)=>{
    return res.render('signup')
})

router.get('/login', (req,res)=>{
    return res.render('login')
})

module.exports = router