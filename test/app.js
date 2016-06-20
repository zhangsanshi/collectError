var http = require('http');
var path = require('path');
var koa = require('koa');
var serve = require('koa-static-server');

var app = koa();

var viewDir = 'dist';

// 处理静态资源和入口文件
app.use(serve({rootDir: 'test', index: 'index.html'}));
app.use(serve({rootDir: 'dist', rootPath: '/dist'}));
// 浏览器 200
app.use(serve({rootDir: 'test', rootPath: '/log', index: 'index.html'}));
app.use(serve({rootDir: 'node_modules', rootPath: '/node_modules'}));


app = http.createServer(app.callback());

app.listen(3007, '0.0.0.0', function() {
  console.log('app listen success.');
});
