const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');

//import Mail from './SendMail/index';

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

// mongoose.connect('mongodb://vannt:Van@12341234@ds263808.mlab.com:63808/dms-task-schedule', { useNewUrlParser: true }).then(() => {
//   console.log('mongoDB is connected...')
//   })
//   .catch((err) => {
//   throw err
//   })

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
cron.schedule('* 10 08 * * *', async () => {
  Job.SendMail8AM();
});
// cron.schedule('50 * * * * *', async () => {
//   Job.SendMail8AM();
// });

// 16:30 PM hằng ngày gửi mail yêu cầu nhập công việc cho ngày mai
cron.schedule('* 30 16 * * *', async () => {
  Job.SendMail1630PM();
});


module.exports = app;