const mongoose=require('mongoose')
// const Crypto=require('../models/crypto')

// const c=new Crypto({
//     "symbol": "RAK",
//     "name": "Rake Finance",
//     "marketCap":0.000,
//     "currentPrice":28.71475564
// })

// c.save().then(()=>console.log('created')).catch(err=>console.log(err))

mongoose.connect("mongodb://127.0.0.1:27017/crypto-API",{ useNewUrlParser: true, useCreateIndex: true })
