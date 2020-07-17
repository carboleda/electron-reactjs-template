const electron = require('electron');
const session = require('electron').session;
const isDev = require('electron-is-dev');
const path = require('path');
const glob = require('glob');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

initialize();

function initialize() {
    loadMainProcessModules();

    function createWindow() {
        mainWindow = new BrowserWindow({
            width: 900, height: 680,
            webPreferences: {
                nodeIntegration: true,
            }
        });
        mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
        // mainWindow.loadURL('https://github.com');
        if (isDev) {
            // Open the DevTools.
            //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
            mainWindow.webContents.openDevTools();
        }
        mainWindow.on('closed', () => mainWindow = null);

        const cookie = {
            url: 'https://apps.fortoxsecurity.com', domain: '.fortoxsecurity.com',
            name: 'my_cookie', value: JSON.stringify({id: 1, name: 'Carlosarboleda'}),
            expirationDate: Date.now() + 1800
        };
        //session.defaultSession.cookies.set(cookie)
            //.then(() => session.defaultSession.cookies.get({}))
            session.defaultSession.cookies.get({})
            .then((cookies) => {
                console.log(cookies)
            }).catch((error) => {
                console.log(error)
            });
    }

    app.on('ready', createWindow);

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
}

function loadMainProcessModules() {
    const pattern = path.join(__dirname, 'main-process/**/infraestructure/presentation/*.js');
    const files = glob.sync(pattern);
    files.forEach(file => require(file));
}