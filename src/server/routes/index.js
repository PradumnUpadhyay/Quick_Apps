const express=require('express')
const router=express.Router()
const Crypto=require('../models/crypto')

router.get('/',(req, res)=>{
    res.send({response: 'acitve'}).status(200)
})

router.post('/home',async (req,res)=>{
    let found=await Crypto.findOne({name: req.body.name, symbol: req.body.symbol})
    console.log(found)
    try {
  if(found){
        const prop=['symbol', 'name', 'marketCap', 'currentPrice']
        const keys=Object.keys(req.body)
        console.log(keys)
        const validOperation=keys.every(update=> prop.includes(update))
        
        if(!validOperation) {
            console.log('not valid')
            return res.status(401).send({'errro':'Error occured'})
        }
        
        keys.forEach(val => found[val]=req.body[val])
        await found.save()
        console.log('Updated successfully!!')
        res.send({}).status(200)
    } else {
    const cryptoData=new Crypto(req.body)
    await cryptoData.save()
    console.log('Data written successfully!!')
    res.send(cryptoData).status(201)
    }
    } catch(err) {
        console.log(err)
    }
})

router.get('/view',async (req,res)=>{
try{
    const crypto=await Crypto.find({})
    res.send(crypto).status(200)

} catch(err) {
    console.log(err)
}
})

router.delete('/view/:id', async (req,res)=>{
    try {
       
        const crypto=await Crypto.findByIdAndDelete({_id: req.params.id})

        if(!crypto) {
            return res.status(404).send({'error':'Crypto Data not found!'})
        }
        res.status(200).send(crypto)
    } catch(err) {
        console.log(err)
    }
})

module.exports=router