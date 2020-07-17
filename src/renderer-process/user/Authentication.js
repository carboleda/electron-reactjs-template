const { ipcRenderer } = window.require('electron');

ipcRenderer
    .on('authenticate-success', (_, user) => Authentication.notifyAll(user))
    .on('authenticate-failed', (_) => Authentication.notifyAll(null));

export default class Authentication {
    static callbacks = [];

    static registerCallbacks(onSuccess, onError) {
        Authentication.callbacks.push({ onSuccess, onError });
    }

    static async notifyAll(user) {
        const isSuccess = user != null;

        Authentication.callbacks.forEach(async ({ onSuccess, onError }) => {
            if (isSuccess) onSuccess(user);
            else onError(user);
        });
        Authentication.callbacks = [];
    }

    static authenticate(username, password) {
        ipcRenderer.send('authenticate', { username, password });
    }
}