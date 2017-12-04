var Service = require('node-service-linux').Service;

 var svc = new Service({
   name:'SoteriaSoft',
   description: 'SoteriaSoft',
   script: '/home/soteriasoft/app.js'
 });

 svc.on('install',function(){
   svc.start();
 });

 svc.install();