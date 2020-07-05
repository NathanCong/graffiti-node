'use strict';

const Controller = require('egg').Controller;

class GraffitiController extends Controller {
  // 上传接口
  async upload() {
    const { ctx } = this;
    const { imageData } = ctx.request.body;
    if (typeof imageData !== 'string') { // 参数校验
      const errMsg = 'request with missing \'imageData\'';
      ctx.body = { errCode: 10000, errMsg, data: {} };
      return;
    }
    try {
      const { imageURL } = await ctx.service.graffiti.saveImage(imageData);
      ctx.body = { errCode: 0, errMsg: 'ok', data: { imageURL } };
    } catch (error) {
      const errMsg = error.toString();
      ctx.body = { errCode: 10001, errMsg, data: {} };
    }
  }
  // 下载接口
  async download() {
    const { ctx } = this;
    try {
      const { imageURL } = await ctx.service.graffiti.getImageURL();
      ctx.body = { errCode: 0, errMsg: 'ok', data: { imageURL } };
    } catch (error) {
      const errMsg = error.toString();
      ctx.body = { errCode: 10002, errMsg, data: {} };
    }
  }
}

module.exports = GraffitiController;
