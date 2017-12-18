var CronJob = require('cron').CronJob;
var logger = require('./logger');
var db = require('../models');
var controller = require('./controller');
var nightmare = require('./nightmare');
var cronschedule = '00 00 * * * *'
module.exports = ()=>{
    logger("scheduler","CRON","starting cron tasks");
    job = new CronJob(cronschedule, ()=>{
    controller.getAWSdata((data)=>{
        logger("scheduler","controller.getAWSdata",data.length);
    });
    controller.getCFdata((data)=>{
        console.log("scheduler","controller.getCFdata",data.length)
    });
    controller.getNightmares((result)=>{
        console.log("scheduler","controller.getNightmares",result);
    })
  });
  job.start();
}