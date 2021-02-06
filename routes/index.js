const express = require('express')
const app = new express.Router
const validUrl = require('valid-url')
const shortid = require('shortid')

const Url = require('../models/url')

app.get('/',(req,res) => {
    res.render('index',{ShortUrl : '/'})
})

app.get('/:code', async (req,res) => { 
   try{
       const url = await Url.findOne({ urlCode : req.params.code })

       if(url){
           res.redirect(url.longUrl)
       }else{
           res.status(400).send('Invalid URL')
       }
   }catch(err){
       console.log(err.message)
       res.status(400).send('Server Error')
   }
})

app.post('/', async (req,res) => {
    const longUrl = req.body.longUrl
    const baseUrl = 'http://localhost:3000'
    
    if(!validUrl.isUri(baseUrl)){
      return  res.status(400).json('Invalid Base URL')
    }
    
    const urlCode = shortid.generate()

    if(validUrl.isUri(longUrl)){
        try{
          const url = await Url.findOne({longUrl})
          
          if(url){
              res.render('index',{ShortUrl : url.shortUrl})
          }else{
            const srtUrl = baseUrl + '/' + urlCode

            const new_url = new Url({
                urlCode,
                longUrl,
                shortUrl:srtUrl,
                date : new Date()
            })
            await new_url.save()
            res.render('index',{ShortUrl : new_url.shortUrl})
          }     
        }catch(err){
            console.log(err.message)
            res.status(400).send('Server Error')
        }
    }else{
        res.status(400).send('Invalid Long URL')
    }
})

module.exports = app