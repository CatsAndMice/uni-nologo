// import anymock from 'anymock-jsbridge';

// const descriptors = Object.getOwnPropertyDescriptors(dd);

// // 获取到不能被重写的属性
// const denylist = Object.keys(descriptors).filter(key => !descriptors[key].writable);
// // 解决高版本问题 IDE: 版本 1.14.1023 (1.14.1023) 接入报错问题
// // => ["faceVerify", "zimIdentity", "corpId"]
// anymock(dd, {
//   // 是否开启。可选，默认 true
// 	enable: true,
  
//   // 可在 anymock 平台复制项目 token。必选
// 	projectToken: "TBTR1jOxDXQcZCekhLnhuVNVx1O97wnX",
// 	fromClient: 'DingdingClient' // 接入端标识

// });

// import anymockAjax from 'anymock-ajax'

// const config = {
//   // 可在 anymock 平台复制项目 token。必选
//   projectToken: 'TBTR1jOxDXQcZCekhLnhuVNVx1O97wnX',

//   // 是否开启。可选，默认 true
//   enable: true,

//   // 可以指定某个接口被 mock。可选，默认所有请求均会被 mock
//   whiteList: [ ],

//   // 可以指定某个接口不被 mock。可选，默认所有请求均会被 mock
//   blackList: [ ]
// };

// anymockAjax(config);