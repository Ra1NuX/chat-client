const {app, BrowserWindow} = require('electron')
const {dialog} = require('electron');
const {Menu} = require('electron/main');


// const debug = require('electron-debug');
// debug();


let mainWindows;

const createWindows = () => {
    mainWindows = new BrowserWindow({
        width: 320,
        height: 600,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        title: ' - Chat -',
        icon: './icon.png',
        titleBarStyle: "hiddenInset"
    });

    const template = [{
            label: 'Conectarse', click: async() => {
                mainWindows.loadFile('./Views/register.html')
            }
        }]

    // const mainMenu = Menu.buildFromTemplate(template)
    // Menu.setApplicationMenu(mainMenu)

    mainWindows.loadFile('./Views/register.html')

    mainWindows.on('close', function () {
        mainWindows = null;
    })

}

app.on('ready', createWindows)


app.on('activate', function () {
    if (mainWindows == null) {
        createWindows()
    }
})
