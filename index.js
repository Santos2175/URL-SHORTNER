require('dotenv').config()

const express = require('express')
const path = require('path')

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRoutes')

const { connectToMongoDB } = require('./connect');
const URL = require('./models/url')

const PORT = process.env.PORT || 8000

const app = express();

//connectToMongoDB
connectToMongoDB(process.env.MONGO_URL)
.then(()=>console.log('mongodb connected..'))

//set view engine
app.set('view engine', "ejs")
app.set("views", path.resolve('./views'))

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Routes
app.use('/url', urlRoute)
app.use('/', staticRoute)

app.get('/test', (req,res)=>{
    return res.render('home')
})


app.listen(PORT, (e)=>console.log(`server connected at PORT ${PORT}`))