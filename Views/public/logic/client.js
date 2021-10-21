
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let nombres;
let imageUrl;
let isWritting = false;
let nombre = urlParams.get('nombre');
const server = urlParams.get('servidor')

const analizeServer = (server) => {
    havePort = server.match(/(:[0-9]+)/g);
    if(havePort) return server;
    return server + ':3301';
}
const getHTML = (id) => document.getElementById(id);

const socket = io.connect(`http://${analizeServer(server)}`);

const message = getHTML('main');
const btn = getHTML('btnMain')
const canvasMessage = getHTML('mainMessages');
const playersOnline = getHTML('playersOnline')
const writting = getHTML('writtingSpan');
const imgPrev = getHTML('imagePreview');



const createNoti = (title, body, callback) => {
    if(!document.hasFocus()){
        const noti = new Notification(title, {body});
        if (callback) noti.onclick = () => console.log(window.electron.focusApp()) ;
    }
}
const clearCanvas = (canvas) => {
    canvas.innerHTML = ''
}
const showClientMessage = (canvas, name, message, timestamp,img) => {
    const mifecha = new Date(timestamp).toISOString()
    let myImg;
    img ? myImg = `<div class="imageprev"><img style=" max-width:85vw;height: 100%; max-height: 75vh" src="${img}"/></div>` : myImg = '';  
    canvas.innerHTML += `
<div class="clientMessageBox">
    <span class="clientName">${name}:</span>
    
    ${myImg}
    
    <span class="clientMessage">${message}</span>
    <div class="timebox"><time class="timeago" datetime="${mifecha}"></time></div>
</div>
`
}
const showServerMessage = (canvas,msg) => {
    const mitexto = '| Conectado al servidor! |'
    let res;
    msg != mitexto ? 
    res = `<span style="color: #faaaaa; justify-content: center; font-variant: small-caps"> ${msg}</span></br> ` 
    : 
    res = `<div style="color: #faaaaa; justify-content: center; text-align:center; font-variant: small-caps"> ${msg}</div>`
canvas.innerHTML += res;
}
const showPersonalMessage = (canvas, text, timeago,img) => {
    let myImg;
    img ? myImg = `<div class="imageprev"><img style=" max-width:85vw;height: 100%; max-height: 75vh" src="${img}"/></div>` : myImg = '';  
    canvas.innerHTML += `
    <div class="personalMessageBox">
        ${myImg}
        <span class="personalMessage">${text}</span>
        <div class="timebox"><time class="timeago" datetime="${timeago}"></time></div>
    </div>
    `
}
const showImage = (canvas, url) => {
    canvas.innerHTML = `
    <div class="imageprev">
        <div class="imgPrevCont">
            <img style="max-width:90vw;height: 100%; max-height: 75vh" src="${url}"/>
        </div>
    </div>`
}
const scrollBottom = () => {
    canvasMessage.scrollTop = canvasMessage.scrollHeight;
}
const handleText = (text) => {
    let returnedText = text
    let regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm
    isurl = text.match(regex)
    if(!isurl) return text;
    isurl.forEach(miURL => {
        let newUrl ; 
        miURL.search('www') == 0 ? newUrl = `<a target='_blank' href="https://${miURL.trim()}">${miURL.trim()}</a>` :newUrl = `<a target='_blank' href="${miURL.trim()}">${miURL.trim()}</a>`;
        const miCadena = []
        miCadena.push(returnedText.substr(0, returnedText.indexOf(miURL)))
        miCadena.push(newUrl)
        miCadena.push(returnedText.substr(returnedText.indexOf(miURL)+miURL.length))  
        returnedText = miCadena.join('')
    });
    return returnedText
}
const noTag = (string) => {return string.replace(/</g, "&lt;").replace(/>/g, "&gt;")};

nombre = noTag(nombre);

if (nombre != '') {
    socket.on('connect', () => {
        console.log(socket.id);
        socket.emit('newUser', nombre.trim())
    })

    socket.on('serverMessage', (msg) => {
        showServerMessage(canvasMessage,msg);
        scrollBottom();
    })

    socket.on('clientMessage', (msg) => {
        const { name, data, timestamp } = msg
        const edittedMessage = handleText(data[0]);
        createNoti(`${name}: `, data[0], () => focusApp())
        showClientMessage(canvasMessage,name, edittedMessage, timestamp, data[1]);
        jQuery("time.timeago").timeago();
        clearCanvas(writting)
        scrollBottom();
    })


    socket.on('isWritting', nombre => {
        while (isWritting == false) {
            isWritting = true;
            writting.innerText = `${nombre} esta escribiendo...`;
            setTimeout(function () {
                isWritting = false;
                writting.innerText = '';

            }, 2000)
        }
    })

    socket.on('online', (online) => {
        playersOnline.innerHTML = `${online[0]}`;
        nombres = online[1];
    })

    message.addEventListener('input', () => {
        socket.emit('writting')
    })

    btn.addEventListener('click', e => {
        e.preventDefault();
        // message.value 
        let text = message.value.trim()
        let messageContent;
        if (text != '') {
            text = noTag(text)
            messageContent = [text,imageUrl]
            socket.emit('message', messageContent);
            let timeago = new Date().toISOString()
            const edittedMessage = handleText(text)
            showPersonalMessage(canvasMessage, edittedMessage, timeago, imageUrl);
            clearCanvas(imgPrev);
            jQuery("time.timeago").timeago();
            imageUrl = ''
            message.value = ''
            scrollBottom()
        }

    })


    message.onpaste = function (event) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        console.log(JSON.stringify(items)); // might give you mime types
        for (var index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                var blob = item.getAsFile();
                var reader = new FileReader();
                reader.onload = function (event) {
                    const img = event.target.result
                    console.log(event.target.result); // data url!
                    showImage(imgPrev, img);
                    imageUrl = event.target.result;
                }; 
                reader.readAsDataURL(blob);
            }
        }
    };



    socket.on('disconnect', () => {
        console.log(socket.id);
    })
}