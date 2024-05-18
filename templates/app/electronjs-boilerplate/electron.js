const { app, BrowserWindow } = require('electron');
const path = require('path');
const START_URL = 'http://localhost:3000';

const createWindow = async () => {
    const isDev = (await import('electron-is-dev')).default;

    let mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: '',
        webPreferences: {
            nodeIntegration: false,
        },
    });
    const startUrl = isDev
        ? START_URL
        : new URL(`file://${path.join(__dirname, '/../build/index.html')}`).toString();

    mainWindow.loadURL(startUrl);
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'right' });
    }
    mainWindow.on('closed', () => (mainWindow = null));
};

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
