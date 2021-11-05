// This file connect the renderer process with the main proces. 
const {contextBridge, ipcRenderer} = require('electron');
require('dotenv').config();

const onClose = () => ipcRenderer.send('on-close');
const onMinimize = () => ipcRenderer.send('on-minimize');
const onMaximize = () => ipcRenderer.send('on-maximize');
const isFullScreen = () => ipcRenderer.sendSync('is-FullScreen')
const focusApp = () => ipcRenderer.send('put-on-focus');
const ELECTRON = process.env.ELECTRON;

// Parsing the functions to the renderer process (using with: windows.handler...) . 
contextBridge.exposeInMainWorld('handler', {onClose, onMinimize, onMaximize, isFullScreen, focusApp, ELECTRON});
