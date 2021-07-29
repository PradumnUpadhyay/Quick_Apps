const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    symbol: {
        type: String,
        trim: true
    },
    marketCap: {
        type: Number,
        trim: true
    },
    currentPrice: {
        type: Number,
        trim: true
    },
})

const Crypto=mongoose.model('crypto', schema)

module.exports=Crypto
