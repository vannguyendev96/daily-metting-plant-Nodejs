const Mail = require('../SendMail/index');
const User = require('../models/user');


module.exports = {
    //gửi email lúc 8:00 AM
    SendMail8AM: async() =>{
        var content = '';
        content += `
        <html xmlns="http://www.w3.org/1999/xhtml">  
        <head>  
            <title></title>  
        </head>  
        <body>  
            <table>  
                <tr>  
                    <td>  
                        <img src="http://www.patc.com.vn/Data/Sites/1/media/logo/logo.png" width="150px" height="60px" />  
                        <br />  
                        <br />  
                        <div style="border-top:3px solid #22BCE5"> </div>  
                        <span style="font-family:Arial;font-size:10pt">  
        Hello <b>{UserName}</b>,<br /><br />  
        <a style = "color:#22BCE5" href = "https://dms-task-schedule.herokuapp.com/">DMS Schedule Task</a><br />  
        {message}  
        <br /><br />  
        Thanks<br />  
        {UserName}
        </span>  
                    </td>  
                </tr>  
            </table>  
        </body>  
        </html>                             
        `;


        const list_user = await User.find();
        for(var i = 0;i <list_user.length; i++){
            content = content.replace('{UserName}',list_user[i].username);
            content = content.replace('{message}','Vui lòng vào đường link https://dms-task-schedule.herokuapp.com/ để cập nhật công việc cho hôm nay và ngày mai');
            Mail.SendMail('vannguyenfit@gmail.com',list_user[i].email,'DMS - Cập nhật công việc trong ngày',
            '',
            content);
        }
    },

    //gửi email lúc 4:30 PM
    SendMail1630PM: async() =>{
        var content = '';
        content += `
        <html xmlns="http://www.w3.org/1999/xhtml">  
        <head>  
            <title></title>  
        </head>  
        <body>  
            <table>  
                <tr>  
                    <td>  
                        <img src="http://www.patc.com.vn/Data/Sites/1/media/logo/logo.png" width="150px" height="60px" />  
                        <br />  
                        <br />  
                        <div style="border-top:3px solid #22BCE5"> </div>  
                        <span style="font-family:Arial;font-size:10pt">  
        Hello <b>{UserName}</b>,<br /><br />  
        <a style = "color:#22BCE5" href = "https://dms-task-schedule.herokuapp.com/">DMS Schedule Task</a><br />  
        {message}  
        <br /><br />  
        Thanks<br />  
        {UserName}
        </span>  
                    </td>  
                </tr>  
            </table>  
        </body>  
        </html>                             
        `;
        const list_user = await User.find();
        for(var i = 0;i <list_user.length; i++){
            content = content.replace('{UserName}',list_user[i].username);
            content = content.replace('{message}','Vui lòng vào đường link https://dms-task-schedule.herokuapp.com/ để cập nhật công việc cho hôm nay và ngày mai');
            Mail.SendMail('vannguyenfit@gmail.com',list_user[i].email,'DMS - Cập nhật công việc trong ngày',
            '',
            content);
        }
    }
}