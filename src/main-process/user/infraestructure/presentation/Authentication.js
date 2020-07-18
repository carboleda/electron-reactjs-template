const { ipcMain } = require('electron');
const Authentication = require('../../application/Authentication');
const RestAuthRepository = require('../persistence/RestAuthRepository');

ipcMain.on('authenticate', async (event, params) => {
    const authentication = new Authentication(new RestAuthRepository());
    const user = await authentication.exec(params.username, params.password);

    if (user) {
        return event.sender.send('authenticate-success', user);
    }

    event.sender.send('authenticate-failed');
});