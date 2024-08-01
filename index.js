require('dotenv').config()

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRoutes')
const userRoute = require('./routes/user')

const {restrictToLoggedInUserOnly, checkAuth} = require('./middlewares/auth')

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
app.use(cookieParser())

//Routes
app.use('/url',restrictToLoggedInUserOnly, urlRoute)
app.use('/',checkAuth, staticRoute)
app.use('/user', userRoute)

app.get('/test', (req,res)=>{
    return res.render('home')
})


app.listen(PORT, (e)=>console.log(`server connected at PORT ${PORT}`))