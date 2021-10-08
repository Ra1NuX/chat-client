const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);



let nombre = urlParams.get('nombre'); 
const server = urlParams.get('servidor')

const socket = io.connect(`http://${server}`);
const message = document.getElementById('main');
const btn = document.getElementById('btnMain')
const canvasMessage = document.getElementById('mainMessages');
const playersOnline = document.getElementById('playersOnline')



const scrollBottom = () => {
    canvasMessage.scrollTop = canvasMessage.scrollHeight;
}

nombre = nombre.replace(/</g,"&lt;").replace(/>/g,"&gt;");


if(nombre != '') {
socket.on('connect', () => {
    console.log(socket.id);
    socket.emit('newUser', nombre.trim())
})

socket.on('serverMessage', (msg) => {
    canvasMessage.innerHTML +=  `<span style="color: #faaaaa; justify-content: center; font-variant: small-caps"> ${msg}</br> `;
    scrollBottom()
})

socket.on('clientMessage', (msg) => {
    canvasMessage.innerHTML +=  `<div style="margin-top: 10px"><span style="font-variant:'small-caps'; font-weight: 600">${msg[0]}:</span> <span style="font-weight: 300">${msg[1]}</span></div><div style=" margin-bottom:5px;width: 80%; height: .5px; background-color: #dadada50"/>`;
    scrollBottom()
})

socket.on('online', (online) => {
    playersOnline.innerHTML = `${online}`;
})


btn.addEventListener('click', e => {
    e.preventDefault();
    // message.value 
    let text = message.value.trim()

    if(text != '') {
        text = text.replace(/</g,"&lt;").replace(/>/g,"&gt;");
        socket.emit('message', text)
        canvasMessage.innerHTML += `<div style="margin-top: 10px"><span style="font-variant:'small-caps'; font-weight: 600">Yo:</span> <span style="font-weight: 300">${text}</span></div><div style=" margin-bottom:5px;width: 80%; height: .5px; background-color: #dadada50"/>`
        message.value = ''
        scrollBottom()
    } 
    
})



socket.on('disconnect', () => {
    console.log(socket.id);
})
}