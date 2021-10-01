var { series } = require('gulp');
var mocker = require('apimocker');

var apiMockerOptions = {
  config: '../mock/config-generated.json',
  mockDirectory: '../mock/mock',
};

function mock () {
  return mocker
    .createServer(apiMockerOptions)
    .setConfigFile(apiMockerOptions.config)
    .start();
}

exports.mock = mock;
exports.default = series(mock);
