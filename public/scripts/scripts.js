let socket = io()
let messageContainer = document.querySelector('section ul')
let input = document.querySelector('input')
let form = document.querySelector('form')
let message = document.querySelector('li')


let userName= prompt(' What is your name')
appendMessage('You joined')
socket.emit('new-user', userName)

form.addEventListener('submit', (e) =>{
  e.preventDefault()
  let message = input.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  input.value = ''

})

socket.on('chat-message', data =>{
  appendMessage(`${data.userName}:${data.message}`)
})

socket.on('user-connected', (userName) => {
  appendMessage(`${userName} has connected`)
})


function appendMessage(message) {
  let messageElement = document.createElement('li')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}

// form.addEventListener('submit', event => {
//   event.preventDefault()
//   if (input.value) {
//     socket.emit('message', input.value)
//     input.value = ''
//   }
// })


// socket.on('message', message => {
//   messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }))
//   messages.scrollTop = messages.scrollHeight
// })

//functions//






