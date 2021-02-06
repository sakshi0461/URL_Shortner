const express = require('express')
const connectDB = require('./mongodb')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
connectDB()

const direURL = path.join(__dirname , '/public')

app.use(express.static(direURL))
app.use(express.json({extended : false}))
app.use(express.urlencoded({extended:false}))
app.set('views',path.join(__dirname,'/public/views'))
app.set('view engine','ejs')

const PORT = process.env.PORT || 3000 

app.use('',require('./routes/index'))

app.listen(PORT , () => console.log(`Listening on ${PORT}`))