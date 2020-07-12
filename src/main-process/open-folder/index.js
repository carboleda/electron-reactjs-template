const { ipcMain, dialog } = require('electron');
const FileManager = require('../utilities/FileManager');

ipcMain.on('open-folder', async (event) => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    const dirPath = result && result.filePaths[0];
    console.log('dirPath', dirPath);

    if (dirPath) {
        const fileManager = new FileManager();
        const fileTree = fileManager.walkSync(dirPath);
        console.log('fileTree', fileTree);
        event.sender.send('folder-file-tree', fileTree);
    }
});