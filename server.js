const express = require ('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = 4242

app.use(express.static(path.resolve('public')))

// templating //
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index')
  });

//sockets //

io.on('connection', (socket) => {
    console.log('a user connected')
  
    socket.on('message', (message) => {
      io.emit('message', message)
    })
  
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })


// port //

http.listen(process.env.PORT || 4242, () => console.log(`App avaialble on http://localhost:4242`))