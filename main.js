const {app, BrowserWindow} = require('electron')
const {ipcMain} = require('electron');
const {Menu} = require('electron/main');
const path = require('path')
const euX = require('electron-updater-x')

if(euX.updater('Ra1NuX', 'chat-client')) return 


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
        icon: 'Views/public/assets/icon.png',
        titleBarStyle: "hiddenInset",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });

    const template = [{
            label: 'Conectarse', click: async() => {
                mainWindows.loadFile('./Views/register.html')
            }
        }]

    // const mainMenu = Menu.buildFromTemplate(template)
    // Menu.setApplicationMenu(mainMenu)

    mainWindows.loadFile('./Views/register.html')

    mainWindows.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
      });
    

    mainWindows.on('close', function () {
        mainWindows = null;
    })

}

ipcMain.on('put-on-focus', () => {
    app.focus();
})



app.on('ready', createWindows)

app.setAppUserModelId('XChat')

app.on('activate', function () {
    if (mainWindows == null) {
        createWindows()
    }
})
