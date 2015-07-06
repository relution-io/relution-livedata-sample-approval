var path = require('path');
var plugins = [
  "cordova-plugin-console",
  "com.ionic.keyboard",
  "cordova-plugin-device",
  "cordova-plugin-dialogs",
  "cordova-plugin-network-information",
  "cordova-plugin-globalization`",
  "cordova-plugin-splashscreen",
  "nl.x-services.plugins.toast",
  "org.apache.cordova.vibration",
  "https://github.com/mwaylabs/cordova-plugin-inappbrowser.git",
  "https://github.com/whiteoctober/cordova-plugin-app-version.git",
  "https://github.com/phonegap-build/PushPlugin.git",
  "https://github.com/litehelpers/Cordova-sqlite-storage.git"];

var exec = process.platform === 'win32' ? 'cordova.cmd' : 'cordova';
var cmd = path.resolve('./node_modules/cordova/bin', exec);

var spawn = require('child_process').spawn;

plugins.forEach(function(plugin){
  var curl = spawn(cmd, ['plugin', 'add', plugin]);
  curl.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });
  curl.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });
  curl.on('exit', function (code, signal) {
    console.log('exit', code, signal);
  });
  curl.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
});
