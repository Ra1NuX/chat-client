const { ipcRenderer, contextBridge } = require('electron')
const focusApp = () => ipcRenderer.send('put-on-focus');
contextBridge.exposeInMainWorld('electron', {focusApp})