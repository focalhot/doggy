const { app, ipcMain, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const path = require('path');
const url = require('url');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;

let mainWindow = null;

let dev = false;

if (process.defaultApp ||
  /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
  /[\\/]electron[\\/]/.test(process.execPath)
) {
  dev = true;
}

if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 1024,
    height: 768,
    show: false,
  });

  let indexPath;

  if (dev) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (dev) {
      mainWindow.webContents.openDevTools(
        { mode: 'detach' },
      );
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const sendUpdateMessage = (data) => {
  mainWindow.webContents.send('checkUpdate', data);
};

autoUpdater.on('update-available', (data) => {
  sendUpdateMessage(data);
});

ipcMain.on('checkForUpdates', () => {
  if (dev) {
    console.log('Can not work in development.');
  } else {
    autoUpdater.checkForUpdates();
  }
});
