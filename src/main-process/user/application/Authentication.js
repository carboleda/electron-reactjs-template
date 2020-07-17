
class Authentication {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    async exec(username, password) {
        return await this.authRepository.exec(username, password);
    }
}

module.exports = Authentication;