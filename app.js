const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cronJob = require('cron').CronJob;
const repository = require('./repositories/UserRepository');

const Job = require('./CronJob/index');


mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/APIAuthentication');
const dbpath = "mongodb://van:van123@ds263808.mlab.com:63808/dms-task-schedule";

const mongo = mongoose.connect(dbpath, {useNewUrlParser: true });
mongo.then(() => {
console.log('connected');
}).catch((err) => {
console.log('err', err);
});


const app = express();

app.use(cors());

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use('/users', require('./routers/users'));
app.use('/plantyears',require('./routers/plantyear'));
app.use('/plant-daily-meeting',require('./routers/planningDailyMeeting'));

  

// 8:10 AM hằng ngày gửi mail báo cáo các kết quả làm việc ngày hôm qua và review công việc đã đăng
// kí ngày hôm nay

var job = new cronJob({
  cronTime: '* 20 08 * * *',
   onTick: function() {
    //Job.SendMail8AM();
    repository.findAll().then((User) => {
      for(var i=0;i<User.length;i++){ 
        if(i === User.length -1){
          job.stop();
        }
        else{
          Job.SendMail8AM();
        }
      }
    })
 },
  start: true,
  timeZone: 'Asia/Ho_Chi_Minh'
});
job.start();


// 16:30 PM hằng ngày gửi mail yêu cầu nhập công việc cho ngày mai
// cron.schedule('* 30 16 * * *', async () => {
//   Job.SendMail1630PM();
// });

var job1 = new cronJob({
  cronTime: '* 30 16 * * *',
   onTick: function() {
    //Job.SendMail8AM();
    repository.findAll().then((User) => {
      for(var i=0;i<User.length;i++){ 
        if(i === User.length -1){
          job1.stop();
        }
        else{
          job1.SendMail8AM();
        }
      }
    })
 },
  start: true,
  timeZone: 'Asia/Ho_Chi_Minh'
});
job1.start();


module.exports = app;