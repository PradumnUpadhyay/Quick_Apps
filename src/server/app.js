const express=require('express')
const app=express()

const cors=require('cors')
const socketio=require('socket.io')
const http=require('http')
const axios=require('axios')
require('./db/mongoose')

const PORT= 4001
const index=require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(index)

const server=http.createServer(app)
const io=socketio(server, {
    cors: {
      origin: '*',
    }
  })
let page;

io.on('connection', (socket)=>{
    
  socket.on('pageChange',(val)=>page=val)
    console.log('Client Connected!'),
    
        setInterval(()=>
        // console.log('set interval')
        getCryptoData(socket),
        10000
    )
    socket.on('connect_error',()=> console.log(err))
    socket.on('disconnect', () => console.log('Client disconnected!'))
})

const getCryptoData = function(socket){
  // console.log(page)
    axios.get(`https://api.nomics.com/v1/currencies/ticker?key=d3d6f21a74dcc241e63e2e0f61f9270d06950184&per-page=5&page=${page}`)
    .then(res => {
      socket.emit('APIdata',res.data)
    })        
   .catch(err =>console.log('Error: \n'))  
}

server.listen(PORT, console.log(`Listening on PORT: ${PORT}`))