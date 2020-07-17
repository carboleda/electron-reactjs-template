class AuthRepository {
    constructor() {}

    async exec(username, password) {
        throw new Error('You have to implement it');
    }
}

module.exports = AuthRepository;