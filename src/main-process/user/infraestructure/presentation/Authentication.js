const { ipcMain, session } = require('electron');
const Authentication = require('../../application/Authentication');
const RestAuthRepository = require('../persistence/RestAuthRepository');

ipcMain.on('authenticate', async (event, params) => {
    const authentication = new Authentication(new RestAuthRepository());
    const user = await authentication.exec(params.username, params.password);

    if (user) {
        await saveSession(user);
        return event.sender.send('authenticate-success', user);
    }

    event.sender.send('authenticate-failed');
});

async function saveSession(user) {
    const cookie = {
        url: 'https://apps.fortoxsecurity.com', domain: '.fortoxsecurity.com',
        name: '_ld', value: JSON.stringify(user),
        expirationDate: Date.now() + 1800
    };
    await session.defaultSession.cookies.set(cookie);
}