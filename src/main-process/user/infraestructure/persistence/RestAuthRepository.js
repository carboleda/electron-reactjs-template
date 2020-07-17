const AuthRepository = require('../../domain/AuthRepository');

class RestAuthRepository extends AuthRepository {
    constructor() {
        super();
    }

    async exec(username, password) {
        if (username === 'carboleda' && password === '123') {
            return {
                id: 1,
                name: 'Carlos',
            };
        }

        return null;
    }
}

module.exports = RestAuthRepository;