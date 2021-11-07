//require all the modules we will use. 
const electron = require('electron');
const {ipcMain} = require('electron')
const path = require('path');
const isDev = require('electron-is-dev'); 
require('dotenv').config()

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

console.log(process.env.ELECTRON)
console.log('This application is running in development mode: ', isDev);

// Creating the Desktop application Settings. 
  function createWindow() {
    mainWindow = new BrowserWindow({
      show: false,
      width: 300, 
      height: 600,
      minHeight:600,
      minWidth: 300,
      frame: false,
      resizable:true,
      // transparent: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        devTools: isDev ? true : false
      }
    });
    mainWindow.once('ready-to-show', () => {
      mainWindow.show()
    })
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../dist/index.html')}`);
    mainWindow.on('close', () => mainWindow = null);
  }

// When the application is ready, create the main windows.
  app.on('ready', createWindow);

// When all windows close, then quit the app. (except MacOS *weird things*)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

// Listening the events: close, minimize, maximize and fullScreen of the main bar. 
  ipcMain.on('on-close', () => {
    app.quit()
  })
  ipcMain.on('on-minimize', () => {
    mainWindow.minimize()
  })
  ipcMain.on('on-maximize', () => {
    if(!mainWindow.isMaximized()) mainWindow.maximize(); 
    else {mainWindow.unmaximize()} 
  })
  ipcMain.on('is-FullScreen', (event) => {
    process.env.ELECTRON == "true" ? mainWindow.fullScreen ? event.returnValue = true : event.returnValue = false : event.returnValue = true;
  })

// When the renderer calls this function will puto on focus the app 
// ( its working with notifications to focus the app when click on it )
  ipcMain.on('put-on-focus', () => {
    app.focus();
  })

// Tittle for Notifications. 
  app.setAppUserModelId('XChat')

// MacOS start triggered. 
  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });