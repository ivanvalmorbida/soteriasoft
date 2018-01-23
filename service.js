/*
npm install -g node-windows
npm link node-windows
*/

var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'SoteriaSoft',
  description: 'SoteriaSoft',
  script: 'C:\\devel\\soteriasoft\\app.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();

/*var Service = require('node-service-linux').Service;

 var svc = new Service({
   name:'SoteriaSoft',
   description: 'SoteriaSoft',
   script: '/home/soteriasoft/app.js'
 });

 svc.on('install',function(){
   svc.start();
 });

 svc.install();*/