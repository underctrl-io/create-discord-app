const { execSync } = require('child_process');

module.exports = function (command) {
    execSync(command)
}