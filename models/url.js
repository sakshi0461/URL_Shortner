const mongoose = require('mongoose')

const URL = new mongoose.Schema({
   urlCode:String,
   longUrl:String,
   shortUrl:String,
   date:{
       type:String,
       default: Date.now
   }
})

const URL_Schema = mongoose.model('URL', URL)

module.exports = URL_Schema