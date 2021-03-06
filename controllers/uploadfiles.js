import connection from '../global/api';
import fs from 'fs';
import path from 'path';
import global from '../global/global';
import moment from 'moment';
let obj = {
  'POST /uploadfiles': async (ctx, next) => {
    let param = ctx.request.body;
    const file = ctx.request.files.file; // 上传的文件在ctx.request.files.file
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 修改文件的名称
    let myDate = new Date();
    let newFilename = param.company + '_' + param.currentId + '_' + myDate.getTime() + '.' + file.name.split('.')[1];
    let date = [moment(new Date()).format('YYYYMM'), moment(new Date()).format('YYYYMMDD')];
    let newDate = [`nginx/html/uploads/${date[0]}`, `nginx/html/uploads/${date[0]}/${date[1]}`];
    await global.dirExists(newDate);
    let targetPath = path.join(__dirname, `../${newDate[1]}/`) + `${newFilename}`; // 这里把nginx放在了node目录下面，是因为用ip访问Nginx的时候。没办法解决ip往上去访问图片的情况
    //创建可写流
    const upStream = fs.createWriteStream(targetPath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    //返回保存的路径

    return (ctx.body = Object.assign(global.createObj(), {
      file: {
        name: file.name,
        url: `https://wwxinmao.top/uploads/${date[0]}/${date[1]}/` + newFilename // 这里我把ip写死了。以后换服务器这里要改
      }
    }));
  }
};
module.exports = obj;
