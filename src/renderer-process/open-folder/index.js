const { ipcRenderer } = window.require('electron');

export default class OpenFolder {
    static open() {
        ipcRenderer.send('open-folder');
    }

    static onFolderOpened(callback) {
        ipcRenderer.on('folder-file-tree', (event, fileTree) => {
            callback(fileTree);
        });
    }
}