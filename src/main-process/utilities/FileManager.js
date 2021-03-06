const fs = require('fs');
const path = require('path');

class FileManager {
    constructor() { }

    walkSync(dir) {
        if (!fs.lstatSync(dir).isDirectory()) {
            return [path.basename(dir)];
        }

        return fs.readdirSync(dir)
            .map(f => {
                const sub = path.join(dir, f);
                const relative = path.relative(dir, sub);

                if (!fs.lstatSync(sub).isDirectory()) {
                    return path.basename(sub);
                }

                return {
                    dir: relative,
                    files: this.walkSync(sub)
                }
            });
    }
}

module.exports = FileManager;