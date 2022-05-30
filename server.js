const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);
const port = 4242;
const users = {}

app.use(express.static(path.resolve("public")));

// templating //
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
	res.render("index");
});

//sockets //

// io.on('connection', (socket) => {
//   console.log('a user connected')

//   socket.on('message', (message) => {
//     io.emit('message', message)
//   })

//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
// })

io.on('connection', socket =>{
  socket.on('new-user', (userName) => {
    users[socket.id] = userName
    socket.broadcast.emit('user-connected', userName)

})
socket.on('send-chat-message', message =>{
 socket.broadcast.emit('chat-message',{ message: message, userName: users[socket.id]
  })
 })
})


// port //
http.listen(process.env.PORT || 4242, () =>
	console.log(`App avaialble on http://localhost:4242`)
)
