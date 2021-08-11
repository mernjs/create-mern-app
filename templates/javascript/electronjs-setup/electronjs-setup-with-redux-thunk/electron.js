const {app, BrowserWindow} = require("electron")
const path = require("path")
const isDev = require("electron-is-dev")

function createWindow() {
    const mainWindow = new BrowserWindow({ 
        width: 1200, 
        height: 800,
        icon: "",
        webPreferences: {
          nodeIntegration: true,
        },
    })
    mainWindow.loadURL(
        isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
    )
    // if (isDev) {
    //     mainWindow.webContents.openDevTools({ mode: 'right' });
    // }
    mainWindow.on("closed", () => (mainWindow = null))
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});