'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 上传接口
  router.post('/graffiti/upload', controller.graffiti.upload);
  // 下载接口
  router.get('/graffiti/download', controller.graffiti.download);
};
