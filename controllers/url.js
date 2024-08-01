const URL = require('../models/url')
const shortid = require('shortid')

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    console.log(body)
    if(!body.url) return res.status(400).json({error:"url is required"})

    const shortID = shortid()

    await URL.create({
        shortId: shortID,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.user
    })


    return res.render('home',{
        id:shortID
    })
}

async function handleAnalyticsURL(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    if(!result) return res.status(400).json({msg:"no such short url found"})

    return res.json({
        totalClicks : result.visitHistory.length,
        analytics:result.visitHistory
    })
}

async function handleRedirectURL(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push: {
            visitHistory:{
                timestamps:Date.now()
            }
        }
    })


    return res.redirect(entry.redirectURL)
}

module.exports = {
    handleGenerateNewShortURL,
    handleAnalyticsURL,
    handleRedirectURL
}


