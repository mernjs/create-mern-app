const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const START_URL = 'http://localhost:3000';

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: '',
    webPreferences: {
      nodeIntegration: false
    }
  });
  const startUrl = isDev
    ? START_URL
    : url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
      });
  mainWindow.loadURL(startUrl);
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'right' });
  }
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
