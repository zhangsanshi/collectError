var $isDebug = false;
var $reportUrl = '';
var oldOnerrorHandler = window.onerror;

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function param(obj) {
  var query = '';
  var name;
  var value;
  var fullSubName;
  var subName;
  var subValue;
  var innerObj;
  var i;
  var hasOwn = Object.hasOwnProperty;

  for (name in obj) {
    if (hasOwn.call(obj, name)) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          if (hasOwn.call(value, subName)) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
      } else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }
  }
  return query.length ? query.substr(0, query.length - 1) : query;
}

function logger() {
  var console = window.console || {
    log: function log() {}
  };
  /* eslint-disable */
  console.log.apply(console, arguments);
  /* eslint-disable */
}

function getLoggerURI(tmpReportUrl, error) {
  var url = tmpReportUrl;
  url += (url.indexOf('?') === -1 ? '?' : '&') + param(error);
  return url;
}

function reportError(error, reportUrl) {
  var tmpReportUrl = reportUrl;
  var url = '';
  tmpReportUrl = tmpReportUrl || $reportUrl;

  if (!tmpReportUrl && !$isDebug) {
    logger('需要提供报错网址');
  } else {
    url =  getLoggerURI(tmpReportUrl, error)
    if ($isDebug) {
      logger(url);
    } else {
      if (isFunction(reportError.report)) {
        reportError.report(url, error);
      }
    }
  }
}

reportError.setDebug = function setDebug(isDebug) {
  $isDebug = isDebug;
};

reportError.setUrl = function setUrl(reportUrl) {
  $reportUrl = reportUrl;
};

// 如果 img 只定义一次的话,频繁更改img的 src 会导致 chrome canceled 这次请求
reportError.report = function report(url) {
  var img = null;
  if (Image) {
    img = new Image();
  } else {
    img = document.createElement('img');
  }
  img.src = url;
};

function onerror(errorMessage, scriptURI, lineNumber, colNumber, err) {
  var error = {
    m: errorMessage,
    s: scriptURI,
    l: lineNumber,
    c: colNumber,
    e: err
  };
  reportError(error);
  if (oldOnerrorHandler) {
    oldOnerrorHandler.apply(this, arguments);
  }
}

window.onerror = onerror;

module.exports = reportError;
