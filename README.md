# `CollectError` 

是一套错误上报的库,只需要简单的配置,即可上报页面运行时的 `js` 错误

## 参考文章

1. [这篇文章大致介绍了方法](http://www.cnblogs.com/cathsfz/p/how-to-capture-and-analyze-javascript-error.html)
2. [这篇文章详细介绍了当前浏览器的支持情况](http://blog.getsentry.com/2016/01/04/client-javascript-reporting-window-onerror.html)

## 实现方式

```javascript
    window.onerror = CollectError
```
如果`onerror`已经被赋值,请注意合理处理

## API

### `CollectError.setUrl(url)` 

说明: 在非`debug`模式下,必须设置`url`
`url`:`string` 上报错误的地址

### `CollectError.setDebug(isDebug)`
`isDebug`:`boolean`=`false` 在`debug`模式下,会以`console.log`的形式输出错误信息

### `CollectError(error, reportUrl)`

说明: 手动调用报告错误方法 可用于`try{}catch(e){}`
1. `error`:`object`(`required`)
2. `reportUrl`:`string` 设置该参数后,会将错误信息发送到`reportUrl`而不是`CollectError.setUrl(url)`,但不会替换`CollectError.setUrl(url)`设置的值

### `reportError.report`

提交错误的方法,可以被重写,默认是

```javascript
function remoteReport(url) {
    var img = new Image();
    img.src = url;
}
```

### `error`对象

``` javascript
{
    m: errorMessage,    // 错误信息
    s: scriptURI,      // 脚本路径
    l: lineNumber,    // 行数
    c: colNumber,    // 列数(部分浏览器实现)
    e: err          // 错误对象(部分浏览器实现)
}
```
