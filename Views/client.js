const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let nombres; 

let nombre = urlParams.get('nombre'); 
const server = urlParams.get('servidor')

const socket = io.connect(`http://${server}`);
const message = document.getElementById('main');
const btn = document.getElementById('btnMain')
const canvasMessage = document.getElementById('mainMessages');
const playersOnline = document.getElementById('playersOnline')

const clientMessage = (msg) =>{

const mifecha = new Date(msg.timestamp).toISOString()
return (`
<div class="clientMessageBox">
    <span class="clientName">${msg.name}:</span>
    <span class="clientMessage">${msg.message}</span>
    <div class="timebox"><time class="timeago" datetime="${mifecha}"></time></div>
</div>
`)
}
const serverMessage  = (msg) => `
<span style="color: #faaaaa; justify-content: center; font-variant: small-caps"> ${msg}</span> 
</br> 
`

const personalMessage = (text, timeago) => {
    return (`<div class="personalMessageBox">
        <span class="personalMessage">${text}</span>
        <div class="timebox"><time class="timeago" datetime="${timeago}"></time></div>
    </div>
    `)
}


const scrollBottom = () => {
    console.log(canvasMessage.scrollHeight)
    canvasMessage.scrollTop = canvasMessage.scrollHeight ;
}

nombre = nombre.replace(/</g,"&lt;").replace(/>/g,"&gt;");


if(nombre != '') {
socket.on('connect', () => {
    console.log(socket.id);
    socket.emit('newUser', nombre.trim())
})

socket.on('serverMessage', (msg) => {
    canvasMessage.innerHTML +=  serverMessage(msg);
    scrollBottom();
})

socket.on('clientMessage', (msg) => {
    canvasMessage.innerHTML +=  clientMessage(msg);
    jQuery("time.timeago").timeago();
    scrollBottom();
})

socket.on('online', (online) => {
    playersOnline.innerHTML = `${online[0]}`;
    nombres = online[1];
})


btn.addEventListener('click', e => {
    e.preventDefault();
    // message.value 
    let text = message.value.trim()

    if(text != '') {
        text = text.replace(/</g,"&lt;").replace(/>/g,"&gt;");
        socket.emit('message', text)
        let timeago = new Date().toISOString()
        canvasMessage.innerHTML += personalMessage(text, timeago) 
        jQuery("time.timeago").timeago();
        message.value = ''
        scrollBottom()
    } 
    
})



socket.on('disconnect', () => {
    console.log(socket.id);
})
}