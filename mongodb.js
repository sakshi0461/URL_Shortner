const mongoose = require('mongoose')
const connectionurl = 'mongodb+srv://sakshi:mongodb@0000@cluster0.aahya.mongodb.net/short_url?retryWrites=true&w=majority'

const connectDB = async () =>{
      mongoose.connect(connectionurl,{ 
         useNewUrlParser:true,
         urlCreateIndex:true,
      }).then((result) => console.log('Connected to database'))
        .catch((err) => console.log(err.message))
}

module.exports = connectDB
