const v = () => {
    const PACKAGE_JSON = require ('../../package.json')
    return console.log(PACKAGE_JSON.version);
}

module.exports = v;