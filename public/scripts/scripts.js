let socket = io();
let messages = document.querySelector('section ul');
let input = document.querySelector('input');
let form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('message', input.value);
      input.value = '';
    }
  });

  socket.on('message', message => {
    messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }))
    messages.scrollTop = messages.scrollHeight
  })