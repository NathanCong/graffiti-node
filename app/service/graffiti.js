'use strict';

const Service = require('egg').Service;

const fs = require('fs');
const path = require('path');
const dayJs = require('dayjs');

class GraffitiService extends Service {
  // 创建目录
  createDir(dirPath) {
    return new Promise((resolve, reject) => {
      fs.mkdir(dirPath, err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
  // 读取目录
  readDir(dirPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(dirPath, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }
  // 写入文件
  writeFile(filePath, fileData) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, fileData, err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });

    });
  }
  // 保存图片
  saveImage(imageData) {
    const { ctx } = this;
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const dataBuffer = Buffer.from(base64Data, 'base64');
    const imageFileName = `${dayJs().format('YYYYMMDD_HHmmss')}.png`;
    const imageDirPath = 'public/images/';
    const imageFilePath = `${imageDirPath}${imageFileName}`;
    return new Promise(async (resolve, reject) => {
      try {
        const writeDirPath = path.resolve(__dirname, `../${imageDirPath}`);
        const writeFilePath = path.resolve(__dirname, `../${imageFilePath}`);
        if (!fs.existsSync(writeDirPath)) {
          await this.createDir(writeDirPath);
        }
        await this.writeFile(writeFilePath, dataBuffer);
        resolve({ imageURL: `//${ctx.req.headers.host}/${imageFilePath}` });
      } catch (error) {
        console.error(error);
        reject(new Error('save image failure'));
      }
    });
  }
  // 获取图片 URL
  getImageURL() {
    const { ctx } = this;
    return new Promise(async (resolve, reject) => {
      try {
        const dirPath = path.resolve(__dirname, '../public/images/');
        const images = await this.readDir(dirPath);
        let imageName = '';
        if (Array.isArray(images) && images.length > 0) {
          imageName = images.pop();
        }
        resolve({ imageURL: `//${ctx.req.headers.host}/public/images/${imageName}` });
      } catch (error) {
        console.error(error);
        reject(new Error('query images failure'));
      }
    });
  }
}

module.exports = GraffitiService;
