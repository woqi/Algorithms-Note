### express与koa区别

中间件模型不同，express是线型，koa是U型
对异步处理不同，express通过回调函数处理异步，koa通过generator、async/await使用同步写法处理异步，
功能不同，express包含路由、渲染等特性，koa只有http模块
express功能多，写法烂，兼容性好，koa错过了风口这两个框架都是一个人写的