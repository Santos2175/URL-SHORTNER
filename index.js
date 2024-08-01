require('dotenv').config()

const express = require('express')

const PORT = process.env.PORT || 8000

const app = express();


app.listen(PORT, (e)=>console.log(`server connected at PORT ${PORT}`))