const { app, BrowserWindow } = require('electron')
var path=require('path');

let win;

// Menu.setApplicationMenu(null);
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600, 
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}\\dist\\atm\\assets\\download.png`,
    webPreferences: {
      webSecurity: false
    }
  })
  win.removeMenu();
  win.maximize();
  win.setIcon(path.join(__dirname, '\\dist\\atm\\assets\\logo.png'));

  win.loadURL(`file://${__dirname}\\dist\\atm\\index.html#enroll`)
  
  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
    
  }
})