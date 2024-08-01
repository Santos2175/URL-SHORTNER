const {Router} = require('express')
const Url = require('../models/url')

const router = Router()


router.get('/',async (req,res)=>{
    const allUrls = await Url.find({})
    return res.render('home',{
        urls:allUrls
    })
})

module.exports = router