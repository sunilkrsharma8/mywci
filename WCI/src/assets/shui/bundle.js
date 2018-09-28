/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-env browser */

var RegisterHtmlTemplate = function () {
  function RegisterHtmlTemplate() {
    _classCallCheck(this, RegisterHtmlTemplate);
  }

  _createClass(RegisterHtmlTemplate, null, [{
    key: 'register',

    /**
     * Create a `<template>` element to hold `<dom-module>` content.
     * This bit of code will execute in the context of the main document,
     * calling `importNode` on the `<template>`, which in turn triggers
     * the lifecycle of the `<dom-module>` and allows it to insert its
     * content into Polymer's global module map. When a Polymer element
     * boots up it will fetch its template from this module map.
     * https://github.com/Polymer/polymer/blob/master/lib/mixins/element-mixin.html#L501-L538
     * @param {string} val A `<dom-module>` as an HTML string
     */
    value: function register(val) {
      var content = void 0;
      var template = document.createElement('template');
      template.innerHTML = val;
      if (template.content) {
        content = template.content; // eslint-disable-line prefer-destructuring
      } else {
        content = document.createDocumentFragment();
        while (template.firstChild) {
          content.appendChild(template.firstChild);
        }
      }
      document.importNode(content, true);
    }
    /**
     * Content that will be injected into the main document. This is primarily
     * for things like `<iron-iconset>` and `<custom-style>` which do not have
     * templates but rely on HTML Imports ability to apply content to the main
     * document.
     * @param {string} val An HTML string
     */

  }, {
    key: 'toBody',
    value: function toBody(val) {
      var trimmedVal = val.trim();
      if (trimmedVal) {
        var div = document.createElement('div');
        div.innerHTML = trimmedVal;
        if (div.firstChild) {
          if (document.body) {
            document.body.insertBefore(div.firstChild, document.body.firstChild);
          } else {
            document.addEventListener('DOMContentLoaded', function () {
              document.body.insertBefore(div.firstChild, document.body.firstChild);
            });
          }
        }
      }
    }
  }]);

  return RegisterHtmlTemplate;
}();

module.exports = RegisterHtmlTemplate;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(16);

(function () {
  'use strict';

  /**
   * Base class that provides the core API for Polymer's meta-programming
   * features including template stamping, data-binding, attribute deserialization,
   * and property change observation.
   *
   * @customElement
   * @polymer
   * @memberof Polymer
   * @constructor
   * @implements {Polymer_ElementMixin}
   * @extends HTMLElement
   * @appliesMixin Polymer.ElementMixin
   * @summary Custom element base class that provides the core API for Polymer's
   *   key meta-programming features including template stamping, data-binding,
   *   attribute deserialization, and property change observation
   */

  var Element = Polymer.ElementMixin(HTMLElement);
  /**
   * @constructor
   * @implements {Polymer_ElementMixin}
   * @extends {HTMLElement}
   */
  Polymer.Element = Element;
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=shared-styles> <template> <style>::-webkit-scrollbar{width:10px;height:10px;background-color:transparent}::-webkit-scrollbar-track{box-shadow:inset 0 0 8px 8px transparent;border:solid 2px transparent}::-webkit-scrollbar-thumb{box-shadow:inset 0 0 8px 8px var(--text-20);border:solid 2px transparent;border-radius:10px}:root,[theme=bright]{--base-0:rgba(255,255,255,1);--base-3:rgba(255,255,255,1);--base-2:rgba(245,245,245,1);--base-1:rgba(235,235,235,1);--primary-color:rgba(236,102,2,1);--primary-2:rgba(216,88,8,1);--primary-3:rgba(255,111,2,1);--secondary-color:rgba(0,153,153,1);--secondary-hover:rgba(0,153,153,.8);--text-100:rgba(0,0,0,1);--text-90:rgba(0,0,0,.9);--text-55:rgba(0,0,0,.55);--text-20:rgba(0,0,0,.20);--divider:rgba(0,0,0,.1);--highlight-5:rgba(0,0,0,.05);--highlight-10:rgba(0,0,0,.1);--highlight-15:rgba(0,0,0,.15);--highlight-20:rgba(0,0,0,.2);--slider-handle:rgba(125,125,125,1);--slider-handle-disabled:rgba(200,200,200,1);--shadow-light:rgba(0,0,0,.05);--shadow-strong:rgba(0,0,0,.1);--functional-red:rgba(231,0,29,1);--functional-yellow:rgba(255,210,0,1);--functional-green:rgba(0,154,56,1);--support-1:rgba(50,158,188,1);--support-2:rgba(139,50,188,1);--support-3:rgba(50,188,77,1);--support-4:rgba(50,188,167,1);--support-5:rgba(50,144,188,1);--support-6:rgba(188,50,115,1);--logo:url('" + __webpack_require__(11) + "')}[theme=dark]{--base-0:rgba(20,20,20,1);--base-3:rgba(45,45,45,1);--base-2:rgba(40,40,40,1);--base-1:rgba(30,30,30,1);--primary-color:rgba(216,88,8,1);--primary-2:rgba(236,102,2,1);--primary-3:rgba(185,76,7,1);--secondary-color:rgba(0,153,153,1);--secondary-hover:rgba(0,153,153,.8);--text-100:rgba(255,255,255,1);--text-90:rgba(255,255,255,.9);--text-55:rgba(255,255,255,.55);--text-20:rgba(255,255,255,.20);--divider:rgba(255,255,255,.1);--divider:rgba(255,255,255,.1);--highlight-5:rgba(255,255,255,.05);--highlight-10:rgba(255,255,255,.1);--highlight-15:rgba(255,255,255,.15);--highlight-20:rgba(255,255,255,.2);--slider-handle:rgba(125,125,125,1);--slider-handle-disabled:rgba(50,50,50,1);--shadow-light:rgba(0,0,0,.15);--shadow-strong:rgba(0,0,0,.2);--functional-red:rgba(231,0,29,1);--functional-yellow:rgba(255,210,0,1);--functional-green:rgba(0,154,56,1);--support-1:rgba(50,158,188,1);--support-2:rgba(139,50,188,1);--support-3:rgba(50,188,77,1);--support-4:rgba(50,188,167,1);--support-5:rgba(50,144,188,1);--support-6:rgba(188,50,115,1);--logo:url('" + __webpack_require__(7) + "')}[theme=blue]{--base-0:rgba(20,20,45,1);--base-3:rgba(45,45,70,1);--base-2:rgba(40,40,65,1);--base-1:rgba(30,30,55,1);--primary-color:rgba(216,88,8,1);--primary-2:rgba(236,102,2,1);--primary-3:rgba(185,76,7,1);--primary-hover:rgba(216,88,8,.8);--secondary-color:rgba(0,153,153,1);--secondary-hover:rgba(0,153,153,.8);--text-100:rgba(255,255,255,1);--text-90:rgba(255,255,255,.9);--text-55:rgba(255,255,255,.55);--text-20:rgba(255,255,255,.20);--divider:rgba(255,255,255,.1);--highlight-5:rgba(255,255,255,.05);--highlight-10:rgba(255,255,255,.1);--highlight-15:rgba(255,255,255,.15);--highlight-20:rgba(255,255,255,.2);--slider-handle:rgba(125,125,125,1);--slider-handle-disabled:rgba(50,50,50,1);--shadow-light:rgba(0,0,0,.15);--shadow-strong:rgba(0,0,0,.2);--functional-red:rgba(231,0,29,1);--functional-yellow:rgba(255,210,0,1);--functional-green:rgba(0,154,56,1);--support-1:rgba(50,158,188,1);--support-2:rgba(139,50,188,1);--support-3:rgba(50,188,77,1);--support-4:rgba(50,188,167,1);--support-5:rgba(50,144,188,1);--support-6:rgba(188,50,115,1);--logo:url('" + __webpack_require__(7) + "')}sh-checkbox+sh-checkbox,sh-menu-item+sh-menu-item{margin-top:0!important}sh-button+sh-button,sh-button+sh-icon,sh-icon+sh-button,sh-icon+sh-icon{margin-left:8px}[hidden]{display:none!important}hr{border:none;-webkit-margin-before:8px;-webkit-margin-after:8px}</style> </template> </dom-module>");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  'use strict';

  var userPolymer = window.Polymer;

  /**
   * @namespace Polymer
   * @summary Polymer is a lightweight library built on top of the web
   *   standards-based Web Components API's, and makes it easy to build your
   *   own custom HTML elements.
   * @param {!PolymerInit} info Prototype for the custom element. It must contain
   *   an `is` property to specify the element name. Other properties populate
   *   the element prototype. The `properties`, `observers`, `hostAttributes`,
   *   and `listeners` properties are processed to create element features.
   * @return {!Object} Returns a custom element class for the given provided
   *   prototype `info` object. The name of the element if given by `info.is`.
   */
  window.Polymer = function (info) {
    return window.Polymer._polymerFn(info);
  };

  // support user settings on the Polymer object
  if (userPolymer) {
    Object.assign(Polymer, userPolymer);
  }

  // To be plugged by legacy implementation if loaded
  /* eslint-disable valid-jsdoc */
  /**
   * @param {!PolymerInit} info Prototype for the custom element. It must contain
   *   an `is` property to specify the element name. Other properties populate
   *   the element prototype. The `properties`, `observers`, `hostAttributes`,
   *   and `listeners` properties are processed to create element features.
   * @return {!Object} Returns a custom element class for the given provided
   *   prototype `info` object. The name of the element if given by `info.is`.
   */
  window.Polymer._polymerFn = function (info) {
    // eslint-disable-line no-unused-vars
    throw new Error('Load polymer.html to use the Polymer() function.');
  };
  /* eslint-enable */

  window.Polymer.version = '2.0.1';

  /* eslint-disable no-unused-vars */
  /*
  When using Closure Compiler, JSCompiler_renameProperty(property, object) is replaced by the munged name for object[property]
  We cannot alias this function, so we have to use a small shim that has the same behavior when not compiling.
  */
  window.JSCompiler_renameProperty = function (prop, obj) {
    return prop;
  };
  /* eslint-enable */
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isDate = __webpack_require__(12);

var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;

var parseTokenDateTimeDelimeter = /[T ]/;
var parseTokenPlainTime = /:/;

// year tokens
var parseTokenYY = /^(\d{2})$/;
var parseTokensYYY = [/^([+-]\d{2})$/, // 0 additional digits
/^([+-]\d{3})$/, // 1 additional digit
/^([+-]\d{4})$/ // 2 additional digits
];

var parseTokenYYYY = /^(\d{4})/;
var parseTokensYYYYY = [/^([+-]\d{4})/, // 0 additional digits
/^([+-]\d{5})/, // 1 additional digit
/^([+-]\d{6})/ // 2 additional digits
];

// date tokens
var parseTokenMM = /^-(\d{2})$/;
var parseTokenDDD = /^-?(\d{3})$/;
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/;
var parseTokenWww = /^-?W(\d{2})$/;
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/;

// time tokens
var parseTokenHH = /^(\d{2}([.,]\d*)?)$/;
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/;
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/;

// timezone tokens
var parseTokenTimezone = /([Z+-].*)$/;
var parseTokenTimezoneZ = /^(Z)$/;
var parseTokenTimezoneHH = /^([+-])(\d{2})$/;
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/;

/**
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} [options] - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse string '+02014101',
 * // if the additional number of digits in the extended year format is 1:
 * var result = parse('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function parse(argument, dirtyOptions) {
  if (isDate(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument !== 'string') {
    return new Date(argument);
  }

  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits;
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS;
  } else {
    additionalDigits = Number(additionalDigits);
  }

  var dateStrings = splitDateString(argument);

  var parseYearResult = parseYear(dateStrings.date, additionalDigits);
  var year = parseYearResult.year;
  var restDateString = parseYearResult.restDateString;

  var date = parseDate(restDateString, year);

  if (date) {
    var timestamp = date.getTime();
    var time = 0;
    var offset;

    if (dateStrings.time) {
      time = parseTime(dateStrings.time);
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone);
    } else {
      // get offset accurate to hour in timezones that change offset
      offset = new Date(timestamp + time).getTimezoneOffset();
      offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset();
    }

    return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE);
  } else {
    return new Date(argument);
  }
}

function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(parseTokenDateTimeDelimeter);
  var timeString;

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
  }

  if (timeString) {
    var token = parseTokenTimezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits];
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits];

  var token;

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString);
  if (token) {
    var yearString = token[1];
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    };
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString);
  if (token) {
    var centuryString = token[1];
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    };
  }

  // Invalid ISO-formatted year
  return {
    year: null
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null;
  }

  var token;
  var date;
  var month;
  var week;

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0);
    date.setUTCFullYear(year);
    return date;
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    date.setUTCFullYear(year, month);
    return date;
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString);
  if (token) {
    date = new Date(0);
    var dayOfYear = parseInt(token[1], 10);
    date.setUTCFullYear(year, 0, dayOfYear);
    return date;
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    var day = parseInt(token[2], 10);
    date.setUTCFullYear(year, month, day);
    return date;
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    return dayOfISOYear(year, week);
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    var dayOfWeek = parseInt(token[2], 10) - 1;
    return dayOfISOYear(year, week, dayOfWeek);
  }

  // Invalid ISO-formatted date
  return null;
}

function parseTime(timeString) {
  var token;
  var hours;
  var minutes;

  // hh
  token = parseTokenHH.exec(timeString);
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'));
    return hours % 24 * MILLISECONDS_IN_HOUR;
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseFloat(token[2].replace(',', '.'));
    return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseInt(token[2], 10);
    var seconds = parseFloat(token[3].replace(',', '.'));
    return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1000;
  }

  // Invalid ISO-formatted time
  return null;
}

function parseTimezone(timezoneString) {
  var token;
  var absoluteOffset;

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString);
  if (token) {
    return 0;
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60;
    return token[1] === '+' ? -absoluteOffset : absoluteOffset;
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
    return token[1] === '+' ? -absoluteOffset : absoluteOffset;
  }

  return 0;
}

function dayOfISOYear(isoYear, week, day) {
  week = week || 0;
  day = day || 0;
  var date = new Date(0);
  date.setUTCFullYear(isoYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

module.exports = parse;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

(function () {
  'use strict';

  var CSS_URL_RX = /(url\()([^)]*)(\))/g;
  var ABS_URL = /(^\/)|(^#)|(^[\w-\d]*:)/;
  var workingURL = void 0;
  var resolveDoc = void 0;
  /**
   * Resolves the given URL against the provided `baseUri'.
   *
   * @memberof Polymer.ResolveUrl
   * @param {string} url Input URL to resolve
   * @param {?string=} baseURI Base URI to resolve the URL against
   * @return {string} resolved URL
   */
  function resolveUrl(url, baseURI) {
    if (url && ABS_URL.test(url)) {
      return url;
    }
    // Lazy feature detection.
    if (workingURL === undefined) {
      workingURL = false;
      try {
        var u = new URL('b', 'http://a');
        u.pathname = 'c%20d';
        workingURL = u.href === 'http://a/c%20d';
      } catch (e) {
        // silently fail
      }
    }
    if (!baseURI) {
      baseURI = document.baseURI || window.location.href;
    }
    if (workingURL) {
      return new URL(url, baseURI).href;
    }
    // Fallback to creating an anchor into a disconnected document.
    if (!resolveDoc) {
      resolveDoc = document.implementation.createHTMLDocument('temp');
      resolveDoc.base = resolveDoc.createElement('base');
      resolveDoc.head.appendChild(resolveDoc.base);
      resolveDoc.anchor = resolveDoc.createElement('a');
      resolveDoc.body.appendChild(resolveDoc.anchor);
    }
    resolveDoc.base.href = baseURI;
    resolveDoc.anchor.href = url;
    return resolveDoc.anchor.href || url;
  }

  /**
   * Resolves any relative URL's in the given CSS text against the provided
   * `ownerDocument`'s `baseURI`.
   *
   * @memberof Polymer.ResolveUrl
   * @param {string} cssText CSS text to process
   * @param {string} baseURI Base URI to resolve the URL against
   * @return {string} Processed CSS text with resolved URL's
   */
  function resolveCss(cssText, baseURI) {
    return cssText.replace(CSS_URL_RX, function (m, pre, url, post) {
      return pre + '\'' + resolveUrl(url.replace(/["']/g, ''), baseURI) + '\'' + post;
    });
  }

  /**
   * Returns a path from a given `url`. The path includes the trailing
   * `/` from the url.
   *
   * @memberof Polymer.ResolveUrl
   * @param {string} url Input URL to transform
   * @return {string} resolved path
   */
  function pathFromUrl(url) {
    return url.substring(0, url.lastIndexOf('/') + 1);
  }

  /**
   * Module with utilities for resolving relative URL's.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module with utilities for resolving relative URL's.
   */
  Polymer.ResolveUrl = {
    resolveCss: resolveCss,
    resolveUrl: resolveUrl,
    pathFromUrl: pathFromUrl
  };
})();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

(function () {

  'use strict';

  // unique global id for deduping mixins.

  var dedupeId = 0;

  /**
   * @constructor
   * @extends {Function}
   */
  function MixinFunction() {}
  /** @type {(WeakMap | undefined)} */
  MixinFunction.prototype.__mixinApplications;
  /** @type {(Object | undefined)} */
  MixinFunction.prototype.__mixinSet;

  /* eslint-disable valid-jsdoc */
  /**
   * Wraps an ES6 class expression mixin such that the mixin is only applied
   * if it has not already been applied its base argument.  Also memoizes mixin
   * applications.
   *
   * @memberof Polymer
   * @template T
   * @param {T} mixin ES6 class expression mixin to wrap
   * @suppress {invalidCasts}
   */
  Polymer.dedupingMixin = function (mixin) {
    var mixinApplications = /** @type {!MixinFunction} */mixin.__mixinApplications;
    if (!mixinApplications) {
      mixinApplications = new WeakMap();
      /** @type {!MixinFunction} */mixin.__mixinApplications = mixinApplications;
    }
    // maintain a unique id for each mixin
    var mixinDedupeId = dedupeId++;
    function dedupingMixin(base) {
      var baseSet = /** @type {!MixinFunction} */base.__mixinSet;
      if (baseSet && baseSet[mixinDedupeId]) {
        return base;
      }
      var map = mixinApplications;
      var extended = map.get(base);
      if (!extended) {
        extended = /** @type {!Function} */mixin(base);
        map.set(base, extended);
      }
      // copy inherited mixin set from the extended class, or the base class
      // NOTE: we avoid use of Set here because some browser (IE11)
      // cannot extend a base Set via the constructor.
      var mixinSet = Object.create( /** @type {!MixinFunction} */extended.__mixinSet || baseSet || null);
      mixinSet[mixinDedupeId] = true;
      /** @type {!MixinFunction} */extended.__mixinSet = mixinSet;
      return extended;
    }

    return dedupingMixin;
  };
  /* eslint-enable valid-jsdoc */
})();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/imgs/logo_dark.png";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

(function () {
  'use strict';

  var caseMap = {};
  var DASH_TO_CAMEL = /-[a-z]/g;
  var CAMEL_TO_DASH = /([A-Z])/g;

  /**
   * Module with utilities for converting between "dash-case" and "camelCase"
   * identifiers.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module that provides utilities for converting between "dash-case"
   *   and "camelCase".
   */
  var CaseMap = {

    /**
     * Converts "dash-case" identifier (e.g. `foo-bar-baz`) to "camelCase"
     * (e.g. `fooBarBaz`).
     *
     * @memberof Polymer.CaseMap
     * @param {string} dash Dash-case identifier
     * @return {string} Camel-case representation of the identifier
     */
    dashToCamelCase: function dashToCamelCase(dash) {
      return caseMap[dash] || (caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(DASH_TO_CAMEL, function (m) {
        return m[1].toUpperCase();
      }));
    },


    /**
     * Converts "camelCase" identifier (e.g. `fooBarBaz`) to "dash-case"
     * (e.g. `foo-bar-baz`).
     *
     * @memberof Polymer.CaseMap
     * @param {string} camel Camel-case identifier
     * @return {string} Dash-case representation of the identifier
     */
    camelToDashCase: function camelToDashCase(camel) {
      return caseMap[camel] || (caseMap[camel] = camel.replace(CAMEL_TO_DASH, '-$1').toLowerCase());
    }
  };

  Polymer.CaseMap = CaseMap;
})();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var startOfWeek = __webpack_require__(45);

/**
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * var result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek(dirtyDate) {
  return startOfWeek(dirtyDate, { weekStartsOn: 1 });
}

module.exports = startOfISOWeek;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.toBody("<custom-style> <style>body,html{width:100%;height:100%;padding:0;margin:0;font-family:calibri,sans-serif;font-style:normal;font-weight:500;font-size:14px;line-height:24px;overflow:hidden;-webkit-tap-highlight-color:transparent;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:root,[theme=bright]{--base-0:rgba(255,255,255,1);--base-3:rgba(255,255,255,1);--base-2:rgba(245,245,245,1);--base-1:rgba(235,235,235,1);--primary-color:rgba(236,102,2,1);--primary-2:rgba(216,88,8,1);--primary-3:rgba(255,111,2,1);--secondary-color:rgba(0,153,153,1);--secondary-hover:rgba(0,153,153,.8);--text-100:rgba(0,0,0,1);--text-90:rgba(0,0,0,.9);--text-55:rgba(0,0,0,.55);--text-20:rgba(0,0,0,.20);--divider:rgba(0,0,0,.1);--highlight-5:rgba(0,0,0,.05);--highlight-10:rgba(0,0,0,.1);--highlight-15:rgba(0,0,0,.15);--highlight-20:rgba(0,0,0,.2);--slider-handle:rgba(125,125,125,1);--slider-handle-disabled:rgba(200,200,200,1);--shadow-light:rgba(0,0,0,.05);--shadow-strong:rgba(0,0,0,.1);--functional-red:rgba(231,0,29,1);--functional-yellow:rgba(255,210,0,1);--functional-green:rgba(0,154,56,1);--support-1:rgba(50,158,188,1);--support-2:rgba(139,50,188,1);--support-3:rgba(50,188,77,1);--support-4:rgba(50,188,167,1);--support-5:rgba(50,144,188,1);--support-6:rgba(188,50,115,1);--logo:url('" + __webpack_require__(11) + "')}[theme=dark]{--base-0:rgba(20,20,20,1);--base-3:rgba(45,45,45,1);--base-2:rgba(40,40,40,1);--base-1:rgba(30,30,30,1);--primary-color:rgba(216,88,8,1);--primary-2:rgba(236,102,2,1);--primary-3:rgba(185,76,7,1);--secondary-color:rgba(0,153,153,1);--secondary-hover:rgba(0,153,153,.8);--text-100:rgba(255,255,255,1);--text-90:rgba(255,255,255,.9);--text-55:rgba(255,255,255,.55);--text-20:rgba(255,255,255,.20);--divider:rgba(255,255,255,.1);--divider:rgba(255,255,255,.1);--highlight-5:rgba(255,255,255,.05);--highlight-10:rgba(255,255,255,.1);--highlight-15:rgba(255,255,255,.15);--highlight-20:rgba(255,255,255,.2);--slider-handle:rgba(125,125,125,1);--slider-handle-disabled:rgba(50,50,50,1);--shadow-light:rgba(0,0,0,.15);--shadow-strong:rgba(0,0,0,.2);--functional-red:rgba(231,0,29,1);--functional-yellow:rgba(255,210,0,1);--functional-green:rgba(0,154,56,1);--support-1:rgba(50,158,188,1);--support-2:rgba(139,50,188,1);--support-3:rgba(50,188,77,1);--support-4:rgba(50,188,167,1);--support-5:rgba(50,144,188,1);--support-6:rgba(188,50,115,1);--logo:url('" + __webpack_require__(7) + "')}[theme=blue]{--base-0:rgba(20,20,45,1);--base-3:rgba(45,45,70,1);--base-2:rgba(40,40,65,1);--base-1:rgba(30,30,55,1);--primary-color:rgba(216,88,8,1);--primary-2:rgba(236,102,2,1);--primary-3:rgba(185,76,7,1);--primary-hover:rgba(216,88,8,.8);--secondary-color:rgba(0,153,153,1);--secondary-hover:rgba(0,153,153,.8);--text-100:rgba(255,255,255,1);--text-90:rgba(255,255,255,.9);--text-55:rgba(255,255,255,.55);--text-20:rgba(255,255,255,.20);--divider:rgba(255,255,255,.1);--highlight-5:rgba(255,255,255,.05);--highlight-10:rgba(255,255,255,.1);--highlight-15:rgba(255,255,255,.15);--highlight-20:rgba(255,255,255,.2);--slider-handle:rgba(125,125,125,1);--slider-handle-disabled:rgba(50,50,50,1);--shadow-light:rgba(0,0,0,.15);--shadow-strong:rgba(0,0,0,.2);--functional-red:rgba(231,0,29,1);--functional-yellow:rgba(255,210,0,1);--functional-green:rgba(0,154,56,1);--support-1:rgba(50,158,188,1);--support-2:rgba(139,50,188,1);--support-3:rgba(50,188,77,1);--support-4:rgba(50,188,167,1);--support-5:rgba(50,144,188,1);--support-6:rgba(188,50,115,1);--logo:url('" + __webpack_require__(7) + "')}@font-face{font-family:sh-icons;font-style:normal;font-weight:500;src:url('" + __webpack_require__(74) + "') format(\"woff\"),url('" + __webpack_require__(75) + "') format(\"truetype\")}@font-face{font-family:bree;font-style:normal;font-weight:500;src:url('" + __webpack_require__(76) + "') format('woff2'),url('" + __webpack_require__(77) + "') format('woff'),url('" + __webpack_require__(78) + "') format('truetype')}@font-face{font-family:bree;font-style:normal;font-weight:300;src:url('" + __webpack_require__(79) + "') format('woff2'),url('" + __webpack_require__(80) + "') format('woff'),url('" + __webpack_require__(81) + "') format('truetype')}@font-face{font-family:bree;font-style:normal;font-weight:500;src:url('" + __webpack_require__(82) + "') format('woff2'),url('" + __webpack_require__(83) + "') format('woff'),url('" + __webpack_require__(84) + "') format('truetype')}@font-face{font-family:bree;font-style:italic;font-weight:300;src:url('" + __webpack_require__(85) + "') format('woff2'),url('" + __webpack_require__(86) + "') format('woff'),url('" + __webpack_require__(87) + "') format('truetype')}@font-face{font-family:bree;font-style:italic;font-weight:300;src:url('" + __webpack_require__(88) + "') format('woff2'),url('" + __webpack_require__(89) + "') format('woff'),url('" + __webpack_require__(90) + "') format('truetype')}@font-face{font-family:bree;font-style:italic;font-weight:700;src:url('" + __webpack_require__(91) + "') format('woff2'),url('" + __webpack_require__(92) + "') format('woff'),url('" + __webpack_require__(93) + "') format('truetype')}@font-face{font-family:bree-headline;font-style:normal;font-weight:500;src:url('" + __webpack_require__(94) + "') format('woff2'),url('" + __webpack_require__(95) + "') format('woff'),url('" + __webpack_require__(96) + "') format('truetype')}@font-face{font-family:bree-headline;font-style:italic;font-weight:500;src:url('" + __webpack_require__(97) + "') format('woff2'),url('" + __webpack_require__(98) + "') format('woff'),url('" + __webpack_require__(99) + "') format('truetype')}@font-face{font-family:'material icons';font-style:normal;font-weight:500;src:url('" + __webpack_require__(100) + "') format('woff2'),url('" + __webpack_require__(101) + "') format('woff'),url('" + __webpack_require__(102) + "') format('truetype')}</style> </custom-style>");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/imgs/logo_bright.png";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @category Common Helpers
 * @summary Is the given argument an instance of Date?
 *
 * @description
 * Is the given argument an instance of Date?
 *
 * @param {*} argument - the argument to check
 * @returns {Boolean} the given argument is an instance of Date
 *
 * @example
 * // Is 'mayonnaise' a Date?
 * var result = isDate('mayonnaise')
 * //=> false
 */
function isDate(argument) {
  return argument instanceof Date;
}

module.exports = isDate;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parse = __webpack_require__(4);
var startOfISOWeek = __webpack_require__(9);

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * var result = getISOYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOYear(dirtyDate) {
  var date = parse(dirtyDate);
  var year = date.getFullYear();

  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);

  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

module.exports = getISOYear;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  Use the webcomponents-loader script which will feature detect which Web
  Components features are missing and lazy load the appropriate polyfills.
  When we hear the 'WebComponentsReady' event from the polyfill bundle we can
  insert our 'bundle.js'.
*/

// jan:
// both of these should work!
// which one is used should go in the project config!!

// cdn polyfill
// this one's a bit easiser but needs internet when being used
var webcomponentsjsBase = 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.10/';

// local polyfill, i know, bower seems abit backward but the polymer team is working on npm-ifying everything!
// so it's just a matter of time until this can be included through npm mechanisms
// const webcomponentsjsBase = '/bower_components/webcomponentsjs/';

var loadWebcomponentsAndBundle = function loadWebcomponentsAndBundle() {
  (function () {
    document.addEventListener('WebComponentsReady', function componentsReady() {
      document.removeEventListener('WebComponentsReady', componentsReady, false);
      __webpack_require__(15);
      __webpack_require__(25);
      __webpack_require__(26);
      __webpack_require__(27);
      __webpack_require__(28);
      __webpack_require__(29);
      __webpack_require__(30);
      __webpack_require__(31);
      __webpack_require__(32);
      __webpack_require__(33);
      __webpack_require__(34);
      __webpack_require__(35); // design pending
      __webpack_require__(36); // design pending
      __webpack_require__(37);
      __webpack_require__(38); // to-do: include all icons from library
      __webpack_require__(52); // to-do: add error, alerts, etc. and fix max/min props
      __webpack_require__(53); // to-do: add error, alerts, etc.
      __webpack_require__(54);
      __webpack_require__(55);
      __webpack_require__(56);
      __webpack_require__(57);
      __webpack_require__(58); // to-do: add truncation for >5 pages
      __webpack_require__(59);
      __webpack_require__(60); // to-do: add radial, indeterminate and spinner variations
      __webpack_require__(61);
      __webpack_require__(62);
      __webpack_require__(63); // to-do: add tooltip, range variations
      __webpack_require__(64); // to-do: add sorting
      __webpack_require__(65);
      __webpack_require__(66);
      __webpack_require__(67);
      __webpack_require__(68);
      __webpack_require__(69);
      __webpack_require__(70);
      __webpack_require__(71);
      __webpack_require__(72);

      __webpack_require__(73); // image viewer
      __webpack_require__(103); // data management (patient browser)
      __webpack_require__(104); // dashboard
    }, false);
  })();
};

/*
  Feature detect Custom Elements support. If the browser DOES support Custom
  Elements then we need to load the custom-elements-es5-adapter because
  our project code has been transpiled from ES2015 to ES5 and native Custom
  Elements expect elements will be registered as classes.
*/

if (window.customElements) {
  var _elem = window.document.createElement('script');
  _elem.src = webcomponentsjsBase + 'custom-elements-es5-adapter.js';
  _elem.onload = function () {
    loadWebcomponentsAndBundle();
  };
  window.document.head.appendChild(_elem);
} else {
  // we don't need the es5 shim
  loadWebcomponentsAndBundle();
}

var elem = window.document.createElement('script');
elem.src = webcomponentsjsBase + 'webcomponents-loader.js';
window.document.head.appendChild(elem);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-accordion> <template> <style include=shared-styles>:host{width:100%;transition:.2s all ease-in-out .1s;margin-bottom:8px;box-shadow:1px 2px 1px var(--shadow-strong),-1px -1px 1px var(--shadow-light);padding:0 12px;box-sizing:border-box;background:var(--base-3);border-radius:2px}.accordion-wrapper{width:100%;height:fit-content;display:flex;flex-direction:column;transition:.2s all ease-in-out,0s background-color ease-in-out;box-sizing:border-box;border-radius:2px}.header-wrapper{min-height:40px;box-sizing:border-box;display:flex;flex-direction:row;padding:8px 0;cursor:pointer}.accordion-label{flex:1;color:var(--text-90);line-height:24px;font-weight:700;font-family:calibri;font-size:14px;transition:.2s all ease-in-out;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}.header-wrapper:hover .accordion-label{color:var(--text-100)}.accordion-wrapper sh-icon#expand{opacity:.4;transition:.2s opacity ease-in-out}.header-wrapper:hover sh-icon#expand{opacity:.6}.content-wrapper{display:flex;width:100%;flex-direction:column;visibility:hidden;opacity:0;max-height:0;overflow:hidden;transform:translateY(-8px);transition:.2s all ease-in-out,.2s max-height ease-in-out,.2s padding ease-in-out}.accordion-wrapper[expanded]{padding-bottom:8px}.accordion-wrapper[expanded] sh-icon#expand{transform:rotate(-180deg)}.accordion-wrapper[expanded] .content-wrapper{visibility:visible;opacity:1;max-height:9999px;overflow:visible;transform:translateY(0)}.icon-{display:none}#accordion-icon{margin-right:8px;opacity:.8}.footer-wrapper{display:flex;flex-direction:row;justify-content:flex-end;padding-top:12px}.footer-wrapper[empty-footer]{display:none}#body::slotted(*){margin-top:8px}#body::slotted(:first-child),#body::slotted(sh-menu-item){margin-top:0!important}:host(.web-accordion) .accordion-label{font-family:Bree}</style> <div class=accordion-wrapper expanded$=[[expanded]]> <div class=header-wrapper on-click=_handleExpand> <sh-icon icon$=[[icon]] class$=icon-[[icon]] id=accordion-icon></sh-icon> <div class=accordion-label>[[label]]</div> <sh-icon id=expand icon=arrow-down></sh-icon> </div> <div class=content-wrapper> <slot id=body></slot> <div class=footer-wrapper empty-footer$=[[emptyFooter]]> <slot name=footer id=footer></slot> </div> </div> </div> </template> </dom-module>");

var SHAccordion = function (_Polymer$Element) {
  _inherits(SHAccordion, _Polymer$Element);

  function SHAccordion() {
    _classCallCheck(this, SHAccordion);

    return _possibleConstructorReturn(this, (SHAccordion.__proto__ || Object.getPrototypeOf(SHAccordion)).apply(this, arguments));
  }

  _createClass(SHAccordion, [{
    key: '_handleExpand',
    value: function _handleExpand() {
      this.expanded = !this.expanded;
    }
  }, {
    key: 'ready',
    value: function ready() {
      _get(SHAccordion.prototype.__proto__ || Object.getPrototypeOf(SHAccordion.prototype), 'ready', this).call(this);
      var footerNodes = this.$.footer.assignedNodes({ flatten: true });
      if (footerNodes == 0) {
        this.emptyFooter = !this.emptyFooter;
      }
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-accordion';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String,
          value: "Accordion Label"
        },
        expanded: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        icon: {
          type: String,
          value: ""
        },
        emptyFooter: {
          type: Boolean,
          value: false
        }
      };
    }
  }]);

  return SHAccordion;
}(Polymer.Element);

window.customElements.define(SHAccordion.is, SHAccordion);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(3);

__webpack_require__(17);

__webpack_require__(6);

__webpack_require__(8);

__webpack_require__(18);

__webpack_require__(5);

__webpack_require__(19);

__webpack_require__(20);

(function () {
  'use strict';

  /**
   * Element class mixin that provides the core API for Polymer's meta-programming
   * features including template stamping, data-binding, attribute deserialization,
   * and property change observation.
   *
   * Subclassers may provide the following static getters to return metadata
   * used to configure Polymer's features for the class:
   *
   * - `static get is()`: When the template is provided via a `dom-module`,
   *   users should return the `dom-module` id from a static `is` getter.  If
   *   no template is needed or the template is provided directly via the
   *   `template` getter, there is no need to define `is` for the element.
   *
   * - `static get template()`: Users may provide the template directly (as
   *   opposed to via `dom-module`) by implementing a static `template` getter.
   *   The getter may return an `HTMLTemplateElement` or a string, which will
   *   automatically be parsed into a template.
   *
   * - `static get properties()`: Should return an object describing
   *   property-related metadata used by Polymer features (key: property name
   *   value: object containing property metadata). Valid keys in per-property
   *   metadata include:
   *   - `type` (String|Number|Object|Array|...): Used by
   *     `attributeChangedCallback` to determine how string-based attributes
   *     are deserialized to JavaScript property values.
   *   - `notify` (boolean): Causes a change in the property to fire a
   *     non-bubbling event called `<property>-changed`. Elements that have
   *     enabled two-way binding to the property use this event to observe changes.
   *   - `readOnly` (boolean): Creates a getter for the property, but no setter.
   *     To set a read-only property, use the private setter method
   *     `_setProperty(property, value)`.
   *   - `observer` (string): Observer method name that will be called when
   *     the property changes. The arguments of the method are
   *     `(value, previousValue)`.
   *   - `computed` (string): String describing method and dependent properties
   *     for computing the value of this property (e.g. `'computeFoo(bar, zot)'`).
   *     Computed properties are read-only by default and can only be changed
   *     via the return value of the computing method.
   *
   * - `static get observers()`: Array of strings describing multi-property
   *   observer methods and their dependent properties (e.g.
   *   `'observeABC(a, b, c)'`).
   *
   * The base class provides default implementations for the following standard
   * custom element lifecycle callbacks; users may override these, but should
   * call the super method to ensure
   * - `constructor`: Run when the element is created or upgraded
   * - `connectedCallback`: Run each time the element is connected to the
   *   document
   * - `disconnectedCallback`: Run each time the element is disconnected from
   *   the document
   * - `attributeChangedCallback`: Run each time an attribute in
   *   `observedAttributes` is set or removed (note: this element's default
   *   `observedAttributes` implementation will automatically return an array
   *   of dash-cased attributes based on `properties`)
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin Polymer.PropertyEffects
   * @memberof Polymer
   * @property rootPath {string} Set to the value of `Polymer.rootPath`,
   *   which defaults to the main document path
   * @property importPath {string} Set to the value of the class's static
   *   `importPath` property, which defaults to the path of this element's
   *   `dom-module` (when `is` is used), but can be overridden for other
   *   import strategies.
   * @summary Element class mixin that provides the core API for Polymer's
   * meta-programming features.
   */

  Polymer.ElementMixin = Polymer.dedupingMixin(function (base) {

    /**
     * @constructor
     * @extends {base}
     * @implements {Polymer_PropertyEffects}
     */
    var polymerElementBase = Polymer.PropertyEffects(base);

    var caseMap = Polymer.CaseMap;

    /**
     * Returns the `properties` object specifically on `klass`. Use for:
     * (1) super chain mixes togther to make `propertiesForClass` which is
     * then used to make `observedAttributes`.
     * (2) properties effects and observers are created from it at `finalize` time.
     *
     * @param {HTMLElement} klass Element class
     * @return {Object} Object containing own properties for this class
     * @private
     */
    function ownPropertiesForClass(klass) {
      if (!klass.hasOwnProperty(JSCompiler_renameProperty('__ownProperties', klass))) {
        klass.__ownProperties = klass.hasOwnProperty(JSCompiler_renameProperty('properties', klass)) ?
        /** @type PolymerElementConstructor */klass.properties : {};
      }
      return klass.__ownProperties;
    }

    /**
     * Returns the `observers` array specifically on `klass`. Use for
     * setting up observers.
     *
     * @param {HTMLElement} klass Element class
     * @return {Array} Array containing own observers for this class
     * @private
     */
    function ownObserversForClass(klass) {
      if (!klass.hasOwnProperty(JSCompiler_renameProperty('__ownObservers', klass))) {
        klass.__ownObservers = klass.hasOwnProperty(JSCompiler_renameProperty('observers', klass)) ?
        /** @type PolymerElementConstructor */klass.observers : [];
      }
      return klass.__ownObservers;
    }

    /**
     * Mixes `props` into `flattenedProps` but upgrades shorthand type
     * syntax to { type: Type}.
     *
     * @param {Object} flattenedProps Bag to collect flattened properties into
     * @param {Object} props Bag of properties to add to `flattenedProps`
     * @return {Object} The input `flattenedProps` bag
     * @private
     */
    function flattenProperties(flattenedProps, props) {
      for (var p in props) {
        var o = props[p];
        if (typeof o == 'function') {
          o = { type: o };
        }
        flattenedProps[p] = o;
      }
      return flattenedProps;
    }

    /**
     * Returns a flattened list of properties mixed together from the chain of all
     * constructor's `config.properties`. This list is used to create
     * (1) observedAttributes,
     * (2) class property default values
     *
     * @param {PolymerElementConstructor} klass Element class
     * @return {PolymerElementProperties} Flattened properties for this class
     * @suppress {missingProperties} class.prototype is not a property for some reason?
     * @private
     */
    function propertiesForClass(klass) {
      if (!klass.hasOwnProperty(JSCompiler_renameProperty('__classProperties', klass))) {
        klass.__classProperties = flattenProperties({}, ownPropertiesForClass(klass));
        var superCtor = Object.getPrototypeOf(klass.prototype).constructor;
        if (superCtor.prototype instanceof PolymerElement) {
          klass.__classProperties = Object.assign(Object.create(propertiesForClass( /** @type PolymerElementConstructor */superCtor)), klass.__classProperties);
        }
      }
      return klass.__classProperties;
    }

    /**
     * Returns a list of properties with default values.
     * This list is created as an optimization since it is a subset of
     * the list returned from `propertiesForClass`.
     * This list is used in `_initializeProperties` to set property defaults.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @return {PolymerElementProperties} Flattened properties for this class
     *   that have default values
     * @private
     */
    function propertyDefaultsForClass(klass) {
      if (!klass.hasOwnProperty(JSCompiler_renameProperty('__classPropertyDefaults', klass))) {
        klass.__classPropertyDefaults = null;
        var props = propertiesForClass(klass);
        for (var p in props) {
          var info = props[p];
          if ('value' in info) {
            klass.__classPropertyDefaults = klass.__classPropertyDefaults || {};
            klass.__classPropertyDefaults[p] = info;
          }
        }
      }
      return klass.__classPropertyDefaults;
    }

    /**
     * Returns true if a `klass` has finalized. Called in `ElementClass.finalize()`
     * @param {PolymerElementConstructor} klass Element class
     * @return {boolean} True if all metaprogramming for this class has been
     *   completed
     * @private
     */
    function hasClassFinalized(klass) {
      return klass.hasOwnProperty(JSCompiler_renameProperty('__finalized', klass));
    }

    /**
     * Called by `ElementClass.finalize()`. Ensures this `klass` and
     * *all superclasses* are finalized by traversing the prototype chain
     * and calling `klass.finalize()`.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @private
     */
    function finalizeClassAndSuper(klass) {
      var proto = /** @type PolymerElementConstructor */klass.prototype;
      var superCtor = Object.getPrototypeOf(proto).constructor;
      if (superCtor.prototype instanceof PolymerElement) {
        superCtor.finalize();
      }
      finalizeClass(klass);
    }

    /**
     * Configures a `klass` based on a staic `klass.config` object and
     * a `template`. This includes creating accessors and effects
     * for properties in `config` and the `template` as well as preparing the
     * `template` for stamping.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @private
     */
    function finalizeClass(klass) {
      klass.__finalized = true;
      var proto = /** @type PolymerElementConstructor */klass.prototype;
      if (klass.hasOwnProperty(JSCompiler_renameProperty('is', klass)) && klass.is) {
        Polymer.telemetry.register(proto);
      }
      var props = ownPropertiesForClass(klass);
      if (props) {
        finalizeProperties(proto, props);
      }
      var observers = ownObserversForClass(klass);
      if (observers) {
        finalizeObservers(proto, observers, props);
      }
      // note: create "working" template that is finalized at instance time
      var template = /** @type PolymerElementConstructor */klass.template;
      if (template) {
        if (typeof template === 'string') {
          var t = document.createElement('template');
          t.innerHTML = template;
          template = t;
        } else {
          template = template.cloneNode(true);
        }
        proto._template = template;
      }
    }

    /**
     * Configures a `proto` based on a `properties` object.
     * Leverages `PropertyEffects` to create property accessors and effects
     * supporting, observers, reflecting to attributes, change notification,
     * computed properties, and read only properties.
     * @param {PolymerElement} proto Element class prototype to add accessors
     *    and effects to
     * @param {Object} properties Flattened bag of property descriptors for
     *    this class
     * @private
     */
    function finalizeProperties(proto, properties) {
      for (var p in properties) {
        createPropertyFromConfig(proto, p, properties[p], properties);
      }
    }

    /**
     * Configures a `proto` based on a `observers` array.
     * Leverages `PropertyEffects` to create observers.
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {Object} observers Flattened array of observer descriptors for
     *   this class
     * @param {Object} dynamicFns Object containing keys for any properties
     *   that are functions and should trigger the effect when the function
     *   reference is changed
     * @private
     */
    function finalizeObservers(proto, observers, dynamicFns) {
      for (var i = 0; i < observers.length; i++) {
        proto._createMethodObserver(observers[i], dynamicFns);
      }
    }

    /**
     * Creates effects for a property.
     *
     * Note, once a property has been set to
     * `readOnly`, `computed`, `reflectToAttribute`, or `notify`
     * these values may not be changed. For example, a subclass cannot
     * alter these settings. However, additional `observers` may be added
     * by subclasses.
     *
     * The info object should may contain property metadata as follows:
     *
     * * `type`: {function} type to which an attribute matching the property
     * is deserialized. Note the property is camel-cased from a dash-cased
     * attribute. For example, 'foo-bar' attribute is dersialized to a
     * property named 'fooBar'.
     *
     * * `readOnly`: {boolean} creates a readOnly property and
     * makes a private setter for the private of the form '_setFoo' for a
     * property 'foo',
     *
     * * `computed`: {string} creates a computed property. A computed property
     * also automatically is set to `readOnly: true`. The value is calculated
     * by running a method and arguments parsed from the given string. For
     * example 'compute(foo)' will compute a given property when the
     * 'foo' property changes by executing the 'compute' method. This method
     * must return the computed value.
     *
     * * `reflectToAttriute`: {boolean} If true, the property value is reflected
     * to an attribute of the same name. Note, the attribute is dash-cased
     * so a property named 'fooBar' is reflected as 'foo-bar'.
     *
     * * `notify`: {boolean} sends a non-bubbling notification event when
     * the property changes. For example, a property named 'foo' sends an
     * event named 'foo-changed' with `event.detail` set to the value of
     * the property.
     *
     * * observer: {string} name of a method that runs when the property
     * changes. The arguments of the method are (value, previousValue).
     *
     * Note: Users may want control over modifying property
     * effects via subclassing. For example, a user might want to make a
     * reflectToAttribute property not do so in a subclass. We've chosen to
     * disable this because it leads to additional complication.
     * For example, a readOnly effect generates a special setter. If a subclass
     * disables the effect, the setter would fail unexpectedly.
     * Based on feedback, we may want to try to make effects more malleable
     * and/or provide an advanced api for manipulating them.
     * Also consider adding warnings when an effect cannot be changed.
     *
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {string} name Name of the property.
     * @param {Object} info Info object from which to create property effects.
     * Supported keys:
     * @param {Object} allProps Flattened map of all properties defined in this
     *   element (including inherited properties)
     * @private
     */
    function createPropertyFromConfig(proto, name, info, allProps) {
      // computed forces readOnly...
      if (info.computed) {
        info.readOnly = true;
      }
      // Note, since all computed properties are readOnly, this prevents
      // adding additional computed property effects (which leads to a confusing
      // setup where multiple triggers for setting a property)
      // While we do have `hasComputedEffect` this is set on the property's
      // dependencies rather than itself.
      if (info.computed && !proto._hasReadOnlyEffect(name)) {
        proto._createComputedProperty(name, info.computed, allProps);
      }
      if (info.readOnly && !proto._hasReadOnlyEffect(name)) {
        proto._createReadOnlyProperty(name, !info.computed);
      }
      if (info.reflectToAttribute && !proto._hasReflectEffect(name)) {
        proto._createReflectedProperty(name);
      }
      if (info.notify && !proto._hasNotifyEffect(name)) {
        proto._createNotifyingProperty(name);
      }
      // always add observer
      if (info.observer) {
        proto._createPropertyObserver(name, info.observer, allProps[info.observer]);
      }
    }

    /**
     * Configures an element `proto` to function with a given `template`.
     * The element name `is` and extends `ext` must be specified for ShadyCSS
     * style scoping.
     *
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {!HTMLTemplateElement} template Template to process and bind
     * @param {string} baseURI URL against which to resolve urls in
     *   style element cssText
     * @param {string} is Tag name (or type extension name) for this element
     * @param {string=} ext For type extensions, the tag name that was extended
     * @private
     */
    function finalizeTemplate(proto, template, baseURI, is, ext) {
      // support `include="module-name"`
      var cssText = Polymer.StyleGather.cssFromTemplate(template, baseURI) + Polymer.StyleGather.cssFromModuleImports(is);
      if (cssText) {
        var style = document.createElement('style');
        style.textContent = cssText;
        template.content.insertBefore(style, template.content.firstChild);
      }
      if (window.ShadyCSS) {
        window.ShadyCSS.prepareTemplate(template, is, ext);
      }
      proto._bindTemplate(template);
    }

    /**
     * @polymer
     * @mixinClass
     * @unrestricted
     * @implements {Polymer_ElementMixin}
     */

    var PolymerElement = function (_polymerElementBase) {
      _inherits(PolymerElement, _polymerElementBase);

      function PolymerElement() {
        _classCallCheck(this, PolymerElement);

        return _possibleConstructorReturn(this, (PolymerElement.__proto__ || Object.getPrototypeOf(PolymerElement)).apply(this, arguments));
      }

      _createClass(PolymerElement, [{
        key: '_initializeProperties',


        /**
         * Overrides the default `Polymer.PropertyAccessors` to ensure class
         * metaprogramming related to property accessors and effects has
         * completed (calls `finalize`).
         *
         * It also initializes any property defaults provided via `value` in
         * `properties` metadata.
         *
         * @override
         * @suppress {invalidCasts}
         */
        value: function _initializeProperties() {
          Polymer.telemetry.instanceCount++;
          this.constructor.finalize();
          var importPath = this.constructor.importPath;
          // note: finalize template when we have access to `localName` to
          // avoid dependence on `is` for polyfilling styling.
          if (this._template && !this._template.__polymerFinalized) {
            this._template.__polymerFinalized = true;
            var baseURI = importPath ? Polymer.ResolveUrl.resolveUrl(importPath) : '';
            finalizeTemplate( /** @type {!PolymerElement} */this.__proto__, this._template, baseURI,
            /**@type {!HTMLElement}*/this.localName);
          }
          _get(PolymerElement.prototype.__proto__ || Object.getPrototypeOf(PolymerElement.prototype), '_initializeProperties', this).call(this);
          // set path defaults
          this.rootPath = Polymer.rootPath;
          this.importPath = importPath;
          // apply property defaults...
          var p$ = propertyDefaultsForClass(this.constructor);
          if (!p$) {
            return;
          }
          for (var p in p$) {
            var info = p$[p];
            // Don't set default value if there is already an own property, which
            // happens when a `properties` property with default but no effects had
            // a property set (e.g. bound) by its host before upgrade
            if (!this.hasOwnProperty(p)) {
              var value = typeof info.value == 'function' ? info.value.call(this) : info.value;
              // Set via `_setProperty` if there is an accessor, to enable
              // initializing readOnly property defaults
              if (this._hasAccessor(p)) {
                this._setPendingProperty(p, value, true);
              } else {
                this[p] = value;
              }
            }
          }
        }

        /**
         * Provides a default implementation of the standard Custom Elements
         * `connectedCallback`.
         *
         * The default implementation enables the property effects system and
         * flushes any pending properties, and updates shimmed CSS properties
         * when using the ShadyCSS scoping/custom properties polyfill.
         *
         * @suppress {invalidCasts}
         */

      }, {
        key: 'connectedCallback',
        value: function connectedCallback() {
          if (window.ShadyCSS && this._template) {
            window.ShadyCSS.styleElement( /** @type {!HTMLElement} */this);
          }
          this._enableProperties();
        }

        /**
         * Provides a default implementation of the standard Custom Elements
         * `disconnectedCallback`.
         */

      }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {}

        /**
         * Stamps the element template.
         *
         * @override
         */

      }, {
        key: 'ready',
        value: function ready() {
          if (this._template) {
            this.root = this._stampTemplate(this._template);
            this.$ = this.root.$;
          }
          _get(PolymerElement.prototype.__proto__ || Object.getPrototypeOf(PolymerElement.prototype), 'ready', this).call(this);
        }

        /**
         * Implements `PropertyEffects`'s `_readyClients` call. Attaches
         * element dom by calling `_attachDom` with the dom stamped from the
         * element's template via `_stampTemplate`. Note that this allows
         * client dom to be attached to the element prior to any observers
         * running.
         *
         * @override
         */

      }, {
        key: '_readyClients',
        value: function _readyClients() {
          if (this._template) {
            this.root = this._attachDom(this.root);
          }
          // The super._readyClients here sets the clients initialized flag.
          // We must wait to do this until after client dom is created/attached
          // so that this flag can be checked to prevent notifications fired
          // during this process from being handled before clients are ready.
          _get(PolymerElement.prototype.__proto__ || Object.getPrototypeOf(PolymerElement.prototype), '_readyClients', this).call(this);
        }

        /**
         * Attaches an element's stamped dom to itself. By default,
         * this method creates a `shadowRoot` and adds the dom to it.
         * However, this method may be overridden to allow an element
         * to put its dom in another location.
         *
         * @throws {Error}
         * @suppress {missingReturn}
         * @param {NodeList} dom to attach to the element.
         * @return {Node} node to which the dom has been attached.
         */

      }, {
        key: '_attachDom',
        value: function _attachDom(dom) {
          if (this.attachShadow) {
            if (dom) {
              if (!this.shadowRoot) {
                this.attachShadow({ mode: 'open' });
              }
              this.shadowRoot.appendChild(dom);
              return this.shadowRoot;
            }
            return null;
          } else {
            throw new Error('ShadowDOM not available. ' +
            // TODO(sorvell): move to compile-time conditional when supported
            'Polymer.Element can create dom as children instead of in ' + 'ShadowDOM by setting `this.root = this;\` before \`ready\`.');
          }
        }

        /**
         * Provides a default implementation of the standard Custom Elements
         * `attributeChangedCallback`.
         *
         * By default, attributes declared in `properties` metadata are
         * deserialized using their `type` information to properties of the
         * same name.  "Dash-cased" attributes are deserialzed to "camelCase"
         * properties.
         *
         * @param {string} name Name of attribute.
         * @param {?string} old Old value of attribute.
         * @param {?string} value Current value of attribute.
         * @override
         */

      }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, old, value) {
          if (old !== value) {
            var property = caseMap.dashToCamelCase(name);
            var type = propertiesForClass(this.constructor)[property].type;
            if (!this._hasReadOnlyEffect(property)) {
              this._attributeToProperty(name, value, type);
            }
          }
        }

        /**
         * When using the ShadyCSS scoping and custom property shim, causes all
         * shimmed styles in this element (and its subtree) to be updated
         * based on current custom property values.
         *
         * The optional parameter overrides inline custom property styles with an
         * object of properties where the keys are CSS properties, and the values
         * are strings.
         *
         * Example: `this.updateStyles({'--color': 'blue'})`
         *
         * These properties are retained unless a value of `null` is set.
         *
         * @param {Object=} properties Bag of custom property key/values to
         *   apply to this element.
         * @suppress {invalidCasts}
         */

      }, {
        key: 'updateStyles',
        value: function updateStyles(properties) {
          if (window.ShadyCSS) {
            window.ShadyCSS.styleSubtree( /** @type {!HTMLElement} */this, properties);
          }
        }

        /**
         * Rewrites a given URL relative to a base URL. The base URL defaults to
         * the original location of the document containing the `dom-module` for
         * this element. This method will return the same URL before and after
         * bundling.
         *
         * @param {string} url URL to resolve.
         * @param {string=} base Optional base URL to resolve against, defaults
         * to the element's `importPath`
         * @return {string} Rewritten URL relative to base
         */

      }, {
        key: 'resolveUrl',
        value: function resolveUrl(url, base) {
          if (!base && this.importPath) {
            base = Polymer.ResolveUrl.resolveUrl(this.importPath);
          }
          return Polymer.ResolveUrl.resolveUrl(url, base);
        }

        /**
         * Overrides `PropertyAccessors` to add map of dynamic functions on
         * template info, for consumption by `PropertyEffects` template binding
         * code. This map determines which method templates should have accessors
         * created for them.
         *
         * @override
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         */

      }], [{
        key: 'finalize',


        /**
         * Called automatically when the first element instance is created to
         * ensure that class finalization work has been completed.
         * May be called by users to eagerly perform class finalization work
         * prior to the creation of the first element instance.
         *
         * Class finalization work generally includes meta-programming such as
         * creating property accessors and any property effect metadata needed for
         * the features used.
         *
         * @public
         */
        value: function finalize() {
          if (!hasClassFinalized(this)) {
            finalizeClassAndSuper(this);
          }
        }

        /**
         * Returns the template that will be stamped into this element's shadow root.
         *
         * If a `static get is()` getter is defined, the default implementation
         * will return the first `<template>` in a `dom-module` whose `id`
         * matches this element's `is`.
         *
         * Users may override this getter to return an arbitrary template
         * (in which case the `is` getter is unnecessary). The template returned
         * may be either an `HTMLTemplateElement` or a string that will be
         * automatically parsed into a template.
         *
         * Note that when subclassing, if the super class overrode the default
         * implementation and the subclass would like to provide an alternate
         * template via a `dom-module`, it should override this getter and
         * return `Polymer.DomModule.import(this.is, 'template')`.
         *
         * If a subclass would like to modify the super class template, it should
         * clone it rather than modify it in place.  If the getter does expensive
         * work such as cloning/modifying a template, it should memoize the
         * template for maximum performance:
         *
         *   let memoizedTemplate;
         *   class MySubClass extends MySuperClass {
         *     static get template() {
         *       if (!memoizedTemplate) {
         *         memoizedTemplate = super.template.cloneNode(true);
         *         let subContent = document.createElement('div');
         *         subContent.textContent = 'This came from MySubClass';
         *         memoizedTemplate.content.appendChild(subContent);
         *       }
         *       return memoizedTemplate;
         *     }
         *   }
         *
         * @return {HTMLTemplateElement|string} Template to be stamped
         */

      }, {
        key: '_parseTemplateContent',
        value: function _parseTemplateContent(template, templateInfo, nodeInfo) {
          templateInfo.dynamicFns = templateInfo.dynamicFns || propertiesForClass(this);
          return _get(PolymerElement.__proto__ || Object.getPrototypeOf(PolymerElement), '_parseTemplateContent', this).call(this, template, templateInfo, nodeInfo);
        }
      }, {
        key: 'observedAttributes',


        /**
         * Standard Custom Elements V1 API.  The default implementation returns
         * a list of dash-cased attributes based on a flattening of all properties
         * declared in `static get properties()` for this element and any
         * superclasses.
         *
         * @return {Array} Observed attribute list
         */
        get: function get() {
          if (!this.hasOwnProperty(JSCompiler_renameProperty('__observedAttributes', this))) {
            var list = [];
            var properties = propertiesForClass(this);
            for (var prop in properties) {
              list.push(Polymer.CaseMap.camelToDashCase(prop));
            }
            this.__observedAttributes = list;
          }
          return this.__observedAttributes;
        }
      }, {
        key: 'template',
        get: function get() {
          if (!this.hasOwnProperty(JSCompiler_renameProperty('_template', this))) {
            this._template = Polymer.DomModule && Polymer.DomModule.import(
            /** @type PolymerElementConstructor*/this.is, 'template') ||
            // note: implemented so a subclass can retrieve the super
            // template; call the super impl this way so that `this` points
            // to the superclass.
            Object.getPrototypeOf( /** @type PolymerElementConstructor*/this.prototype).constructor.template;
          }
          return this._template;
        }

        /**
         * Path matching the url from which the element was imported.
         * This path is used to resolve url's in template style cssText.
         * The `importPath` property is also set on element instances and can be
         * used to create bindings relative to the import path.
         * Defaults to the path matching the url containing a `dom-module` element
         * matching this element's static `is` property.
         * Note, this path should contain a trailing `/`.
         *
         * @return {string} The import path for this element class
         */

      }, {
        key: 'importPath',
        get: function get() {
          if (!this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))) {
            var module = Polymer.DomModule && Polymer.DomModule.import( /** @type PolymerElementConstructor */this.is);
            this._importPath = module ? module.assetpath : '' || Object.getPrototypeOf( /** @type PolymerElementConstructor*/this.prototype).constructor.importPath;
          }
          return this._importPath;
        }
      }]);

      return PolymerElement;
    }(polymerElementBase);

    return PolymerElement;
  });

  /**
   * Provides basic tracking of element definitions (registrations) and
   * instance counts.
   *
   * @namespace
   * @summary Provides basic tracking of element definitions (registrations) and
   * instance counts.
   */
  Polymer.telemetry = {
    /**
     * Total number of Polymer element instances created.
     * @type {number}
     */
    instanceCount: 0,
    /**
     * Array of Polymer element classes that have been finalized.
     * @type {Array<Polymer.Element>}
     */
    registrations: [],
    /**
     * @param {!PolymerElementConstructor} prototype Element prototype to log
     * @this {this}
     * @private
     */
    _regLog: function _regLog(prototype) {
      // console.log('[' + prototype.is + ']: registered');
    },
    /**
     * Registers a class prototype for telemetry purposes.
     * @param {HTMLElement} prototype Element prototype to register
     * @this {this}
     * @protected
     */
    register: function register(prototype) {
      this.registrations.push(prototype);
      Polymer.log && this._regLog(prototype);
    },
    /**
     * Logs all elements registered with an `is` to the console.
     * @public
     * @this {this}
     */
    dumpRegistrations: function dumpRegistrations() {
      this.registrations.forEach(this._regLog);
    }
  };

  /**
   * When using the ShadyCSS scoping and custom property shim, causes all
   * shimmed `styles` (via `custom-style`) in the document (and its subtree)
   * to be updated based on current custom property values.
   *
   * The optional parameter overrides inline custom property styles with an
   * object of properties where the keys are CSS properties, and the values
   * are strings.
   *
   * Example: `Polymer.updateStyles({'--color': 'blue'})`
   *
   * These properties are retained unless a value of `null` is set.
   *
   * @param {Object=} props Bag of custom property key/values to
   *   apply to the document.
   */
  Polymer.updateStyles = function (props) {
    if (window.ShadyCSS) {
      window.ShadyCSS.styleDocument(props);
    }
  };
})();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(5);

/** @suppress {deprecated} */
(function () {
  'use strict';

  /**
   * Legacy settings.
   * @namespace
   * @memberof Polymer
   */

  var settings = Polymer.Settings || {};
  settings.useShadow = !window.ShadyDOM;
  settings.useNativeCSSProperties = Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss);
  settings.useNativeCustomElements = !window.customElements.polyfillWrapFlushCallback;

  /**
   * Sets the global, legacy settings.
   *
   * @deprecated
   * @memberof Polymer
   */
  Polymer.Settings = settings;

  /**
   * Globally settable property that is automatically assigned to
   * `Polymer.ElementMixin` instances, useful for binding in templates to
   * make URL's relative to an application's root.  Defaults to the main
   * document URL, but can be overridden by users.  It may be useful to set
   * `Polymer.rootPath` to provide a stable application mount path when
   * using client side routing.
   *
   * @memberof Polymer
   */
  var rootPath = Polymer.rootPath || Polymer.ResolveUrl.pathFromUrl(document.baseURI || window.location.href);

  Polymer.rootPath = rootPath;

  /**
   * Sets the global rootPath property used by `Polymer.ElementMixin` and
   * available via `Polymer.rootPath`.
   *
   * @memberof Polymer
   * @param {string} path The new root path
   */
  Polymer.setRootPath = function (path) {
    Polymer.rootPath = path;
  };
})();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

(function () {
  'use strict';

  var MODULE_STYLE_LINK_SELECTOR = 'link[rel=import][type~=css]';
  var INCLUDE_ATTR = 'include';

  function importModule(moduleId) {
    if (!Polymer.DomModule) {
      return null;
    }
    return Polymer.DomModule.import(moduleId);
  }

  /** @typedef {{assetpath: string}} */
  var templateWithAssetPath = void 0; // eslint-disable-line no-unused-vars

  /**
   * Module with utilities for collection CSS text from `<templates>`, external
   * stylesheets, and `dom-module`s.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module with utilities for collection CSS text from various sources.
   */
  var StyleGather = {

    /**
     * Returns CSS text of styles in a space-separated list of `dom-module`s.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleIds List of dom-module id's within which to
     * search for css.
     * @return {string} Concatenated CSS content from specified `dom-module`s
     * @this {StyleGather}
     */
    cssFromModules: function cssFromModules(moduleIds) {
      var modules = moduleIds.trim().split(' ');
      var cssText = '';
      for (var i = 0; i < modules.length; i++) {
        cssText += this.cssFromModule(modules[i]);
      }
      return cssText;
    },


    /**
     * Returns CSS text of styles in a given `dom-module`.  CSS in a `dom-module`
     * can come either from `<style>`s within the first `<template>`, or else
     * from one or more `<link rel="import" type="css">` links outside the
     * template.
     *
     * Any `<styles>` processed are removed from their original location.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleId dom-module id to gather styles from
     * @return {string} Concatenated CSS content from specified `dom-module`
     * @this {StyleGather}
     */
    cssFromModule: function cssFromModule(moduleId) {
      var m = importModule(moduleId);
      if (m && m._cssText === undefined) {
        var cssText = '';
        // include css from the first template in the module
        var t = m.querySelector('template');
        if (t) {
          cssText += this.cssFromTemplate(t, /** @type {templateWithAssetPath }*/m.assetpath);
        }
        // module imports: <link rel="import" type="css">
        cssText += this.cssFromModuleImports(moduleId);
        m._cssText = cssText || null;
      }
      if (!m) {
        console.warn('Could not find style data in module named', moduleId);
      }
      return m && m._cssText || '';
    },


    /**
     * Returns CSS text of `<styles>` within a given template.
     *
     * Any `<styles>` processed are removed from their original location.
     *
     * @memberof Polymer.StyleGather
     * @param {HTMLTemplateElement} template Template to gather styles from
     * @param {string} baseURI Base URI to resolve the URL against
     * @return {string} Concatenated CSS content from specified template
     * @this {StyleGather}
     */
    cssFromTemplate: function cssFromTemplate(template, baseURI) {
      var cssText = '';
      // if element is a template, get content from its .content
      var e$ = template.content.querySelectorAll('style');
      for (var i = 0; i < e$.length; i++) {
        var e = e$[i];
        // support style sharing by allowing styles to "include"
        // other dom-modules that contain styling
        var include = e.getAttribute(INCLUDE_ATTR);
        if (include) {
          cssText += this.cssFromModules(include);
        }
        e.parentNode.removeChild(e);
        cssText += baseURI ? Polymer.ResolveUrl.resolveCss(e.textContent, baseURI) : e.textContent;
      }
      return cssText;
    },


    /**
     * Returns CSS text from stylsheets loaded via `<link rel="import" type="css">`
     * links within the specified `dom-module`.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleId Id of `dom-module` to gather CSS from
     * @return {string} Concatenated CSS content from links in specified `dom-module`
     * @this {StyleGather}
     */
    cssFromModuleImports: function cssFromModuleImports(moduleId) {
      var cssText = '';
      var m = importModule(moduleId);
      if (!m) {
        return cssText;
      }
      var p$ = m.querySelectorAll(MODULE_STYLE_LINK_SELECTOR);
      for (var i = 0; i < p$.length; i++) {
        var p = p$[i];
        if (p.import) {
          var importDoc = p.import;
          // NOTE: polyfill affordance.
          // under the HTMLImports polyfill, there will be no 'body',
          // but the import pseudo-doc can be used directly.
          var container = importDoc.body ? importDoc.body : importDoc;
          cssText += Polymer.ResolveUrl.resolveCss(container.textContent, importDoc.baseURI);
        }
      }
      return cssText;
    }
  };

  Polymer.StyleGather = StyleGather;
})();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(3);

__webpack_require__(5);

(function () {
  'use strict';

  var modules = {};
  var lcModules = {};
  function findModule(id) {
    return modules[id] || lcModules[id.toLowerCase()];
  }

  function styleOutsideTemplateCheck(inst) {
    if (inst.querySelector('style')) {
      console.warn('dom-module %s has style outside template', inst.id);
    }
  }

  /**
   * The `dom-module` element registers the dom it contains to the name given
   * by the module's id attribute. It provides a unified database of dom
   * accessible via its static `import` API.
   *
   * A key use case of `dom-module` is for providing custom element `<template>`s
   * via HTML imports that are parsed by the native HTML parser, that can be
   * relocated during a bundling pass and still looked up by `id`.
   *
   * Example:
   *
   *     <dom-module id="foo">
   *       <img src="stuff.png">
   *     </dom-module>
   *
   * Then in code in some other location that cannot access the dom-module above
   *
   *     let img = document.createElement('dom-module').import('foo', 'img');
   *
   * @customElement
   * @extends HTMLElement
   * @memberof Polymer
   * @summary Custom element that provides a registry of relocatable DOM content
   *   by `id` that is agnostic to bundling.
   * @unrestricted
   */

  var DomModule = function (_HTMLElement) {
    _inherits(DomModule, _HTMLElement);

    function DomModule() {
      _classCallCheck(this, DomModule);

      return _possibleConstructorReturn(this, (DomModule.__proto__ || Object.getPrototypeOf(DomModule)).apply(this, arguments));
    }

    _createClass(DomModule, [{
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback(name, old, value) {
        if (old !== value) {
          this.register();
        }
      }

      /**
       * The absolute URL of the original location of this `dom-module`.
       *
       * This value will differ from this element's `ownerDocument` in the
       * following ways:
       * - Takes into account any `assetpath` attribute added during bundling
       *   to indicate the original location relative to the bundled location
       * - Uses the HTMLImports polyfill's `importForElement` API to ensure
       *   the path is relative to the import document's location since
       *   `ownerDocument` is not currently polyfilled
       */

    }, {
      key: 'register',


      /**
       * Registers the dom-module at a given id. This method should only be called
       * when a dom-module is imperatively created. For
       * example, `document.createElement('dom-module').register('foo')`.
       * @param {string=} id The id at which to register the dom-module.
       */
      value: function register(id) {
        id = id || this.id;
        if (id) {
          this.id = id;
          // store id separate from lowercased id so that
          // in all cases mixedCase id will stored distinctly
          // and lowercase version is a fallback
          modules[id] = this;
          lcModules[id.toLowerCase()] = this;
          styleOutsideTemplateCheck(this);
        }
      }
    }, {
      key: 'assetpath',
      get: function get() {
        // Don't override existing assetpath.
        if (!this.__assetpath) {
          // note: assetpath set via an attribute must be relative to this
          // element's location; accomodate polyfilled HTMLImports
          var owner = window.HTMLImports && HTMLImports.importForElement ? HTMLImports.importForElement(this) || document : this.ownerDocument;
          var url = Polymer.ResolveUrl.resolveUrl(this.getAttribute('assetpath') || '', owner.baseURI);
          this.__assetpath = Polymer.ResolveUrl.pathFromUrl(url);
        }
        return this.__assetpath;
      }
    }], [{
      key: 'import',


      /**
       * Retrieves the element specified by the css `selector` in the module
       * registered by `id`. For example, this.import('foo', 'img');
       * @param {string} id The id of the dom-module in which to search.
       * @param {string=} selector The css selector by which to find the element.
       * @return {Element} Returns the element which matches `selector` in the
       * module registered at the specified `id`.
       */
      value: function _import(id, selector) {
        if (id) {
          var m = findModule(id);
          if (m && selector) {
            return m.querySelector(selector);
          }
          return m;
        }
        return null;
      }
    }, {
      key: 'observedAttributes',
      get: function get() {
        return ['id'];
      }
    }]);

    return DomModule;
  }(HTMLElement);

  DomModule.prototype['modules'] = modules;

  customElements.define('dom-module', DomModule);

  // export
  Polymer.DomModule = DomModule;
})();

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(3);

__webpack_require__(6);

__webpack_require__(21);

__webpack_require__(8);

__webpack_require__(22);

__webpack_require__(24);

(function () {

  'use strict';

  /** @const {Object} */

  var CaseMap = Polymer.CaseMap;

  // Monotonically increasing unique ID used for de-duping effects triggered
  // from multiple properties in the same turn
  var dedupeId = 0;

  /**
   * Property effect types; effects are stored on the prototype using these keys
   * @enum {string}
   */
  var TYPES = {
    COMPUTE: '__computeEffects',
    REFLECT: '__reflectEffects',
    NOTIFY: '__notifyEffects',
    PROPAGATE: '__propagateEffects',
    OBSERVE: '__observeEffects',
    READ_ONLY: '__readOnly'

    /**
     * @typedef {{
     * name: (string | undefined),
     * structured: (boolean | undefined),
     * wildcard: (boolean | undefined)
     * }}
     */
  };var DataTrigger = void 0; //eslint-disable-line no-unused-vars

  /**
   * @typedef {{
   * info: ?,
   * trigger: (!DataTrigger | undefined),
   * fn: (!Function | undefined)
   * }}
   */
  var DataEffect = void 0; //eslint-disable-line no-unused-vars

  var PropertyEffectsType = void 0; //eslint-disable-line no-unused-vars

  /**
   * Ensures that the model has an own-property map of effects for the given type.
   * The model may be a prototype or an instance.
   *
   * Property effects are stored as arrays of effects by property in a map,
   * by named type on the model. e.g.
   *
   *   __computeEffects: {
   *     foo: [ ... ],
   *     bar: [ ... ]
   *   }
   *
   * If the model does not yet have an effect map for the type, one is created
   * and returned.  If it does, but it is not an own property (i.e. the
   * prototype had effects), the the map is deeply cloned and the copy is
   * set on the model and returned, ready for new effects to be added.
   *
   * @param {Object} model Prototype or instance
   * @param {string} type Property effect type
   * @return {Object} The own-property map of effects for the given type
   * @private
   */
  function ensureOwnEffectMap(model, type) {
    var effects = model[type];
    if (!effects) {
      effects = model[type] = {};
    } else if (!model.hasOwnProperty(type)) {
      effects = model[type] = Object.create(model[type]);
      for (var p in effects) {
        var protoFx = effects[p];
        var instFx = effects[p] = Array(protoFx.length);
        for (var i = 0; i < protoFx.length; i++) {
          instFx[i] = protoFx[i];
        }
      }
    }
    return effects;
  }

  // -- effects ----------------------------------------------

  /**
   * Runs all effects of a given type for the given set of property changes
   * on an instance.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} effects Object map of property-to-Array of effects
   * @param {Object} props Bag of current property changes
   * @param {Object=} oldProps Bag of previous values for changed properties
   * @param {boolean=} hasPaths True with `props` contains one or more paths
   * @param {*=} extraArgs Additional metadata to pass to effect function
   * @return {boolean} True if an effect ran for this property
   * @private
   */
  function runEffects(inst, effects, props, oldProps, hasPaths, extraArgs) {
    if (effects) {
      var ran = false;
      var id = dedupeId++;
      for (var prop in props) {
        if (runEffectsForProperty(inst, effects, id, prop, props, oldProps, hasPaths, extraArgs)) {
          ran = true;
        }
      }
      return ran;
    }
    return false;
  }

  /**
   * Runs a list of effects for a given property.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} effects Object map of property-to-Array of effects
   * @param {number} dedupeId Counter used for de-duping effects
   * @param {string} prop Name of changed property
   * @param {*} props Changed properties
   * @param {*} oldProps Old properties
   * @param {boolean=} hasPaths True with `props` contains one or more paths
   * @param {*=} extraArgs Additional metadata to pass to effect function
   * @return {boolean} True if an effect ran for this property
   * @private
   */
  function runEffectsForProperty(inst, effects, dedupeId, prop, props, oldProps, hasPaths, extraArgs) {
    var ran = false;
    var rootProperty = hasPaths ? Polymer.Path.root(prop) : prop;
    var fxs = effects[rootProperty];
    if (fxs) {
      for (var i = 0, l = fxs.length, fx; i < l && (fx = fxs[i]); i++) {
        if ((!fx.info || fx.info.lastRun !== dedupeId) && (!hasPaths || pathMatchesTrigger(prop, fx.trigger))) {
          if (fx.info) {
            fx.info.lastRun = dedupeId;
          }
          fx.fn(inst, prop, props, oldProps, fx.info, hasPaths, extraArgs);
          ran = true;
        }
      }
    }
    return ran;
  }

  /**
   * Determines whether a property/path that has changed matches the trigger
   * criteria for an effect.  A trigger is a descriptor with the following
   * structure, which matches the descriptors returned from `parseArg`.
   * e.g. for `foo.bar.*`:
   * ```
   * trigger: {
   *   name: 'a.b',
   *   structured: true,
   *   wildcard: true
   * }
   * ```
   * If no trigger is given, the path is deemed to match.
   *
   * @param {string} path Path or property that changed
   * @param {DataTrigger} trigger Descriptor
   * @return {boolean} Whether the path matched the trigger
   */
  function pathMatchesTrigger(path, trigger) {
    if (trigger) {
      var triggerPath = trigger.name;
      return triggerPath == path || trigger.structured && Polymer.Path.isAncestor(triggerPath, path) || trigger.wildcard && Polymer.Path.isDescendant(triggerPath, path);
    } else {
      return true;
    }
  }

  /**
   * Implements the "observer" effect.
   *
   * Calls the method with `info.methodName` on the instance, passing the
   * new and old values.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runObserverEffect(inst, property, props, oldProps, info) {
    var fn = inst[info.methodName];
    var changedProp = info.property;
    if (fn) {
      fn.call(inst, inst.__data[changedProp], oldProps[changedProp]);
    } else if (!info.dynamicFn) {
      console.warn('observer method `' + info.methodName + '` not defined');
    }
  }

  /**
   * Runs "notify" effects for a set of changed properties.
   *
   * This method differs from the generic `runEffects` method in that it
   * will dispatch path notification events in the case that the property
   * changed was a path and the root property for that path didn't have a
   * "notify" effect.  This is to maintain 1.0 behavior that did not require
   * `notify: true` to ensure object sub-property notifications were
   * sent.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} notifyProps Bag of properties to notify
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runNotifyEffects(inst, notifyProps, props, oldProps, hasPaths) {
    // Notify
    var fxs = inst[TYPES.NOTIFY];
    var notified = void 0;
    var id = dedupeId++;
    // Try normal notify effects; if none, fall back to try path notification
    for (var prop in notifyProps) {
      if (notifyProps[prop]) {
        if (fxs && runEffectsForProperty(inst, fxs, id, prop, props, oldProps, hasPaths)) {
          notified = true;
        } else if (hasPaths && notifyPath(inst, prop, props)) {
          notified = true;
        }
      }
    }
    // Flush host if we actually notified and host was batching
    // And the host has already initialized clients; this prevents
    // an issue with a host observing data changes before clients are ready.
    var host = void 0;
    if (notified && (host = inst.__dataHost) && host._invalidateProperties) {
      host._invalidateProperties();
    }
  }

  /**
   * Dispatches {property}-changed events with path information in the detail
   * object to indicate a sub-path of the property was changed.
   *
   * @param {!PropertyEffectsType} inst The element from which to fire the event
   * @param {string} path The path that was changed
   * @param {Object} props Bag of current property changes
   * @return {boolean} Returns true if the path was notified
   * @private
   */
  function notifyPath(inst, path, props) {
    var rootProperty = Polymer.Path.root(path);
    if (rootProperty !== path) {
      var eventName = Polymer.CaseMap.camelToDashCase(rootProperty) + '-changed';
      dispatchNotifyEvent(inst, eventName, props[path], path);
      return true;
    }
    return false;
  }

  /**
   * Dispatches {property}-changed events to indicate a property (or path)
   * changed.
   *
   * @param {!PropertyEffectsType} inst The element from which to fire the event
   * @param {string} eventName The name of the event to send ('{property}-changed')
   * @param {*} value The value of the changed property
   * @param {string | null | undefined} path If a sub-path of this property changed, the path
   *   that changed (optional).
   * @private
   * @suppress {invalidCasts}
   */
  function dispatchNotifyEvent(inst, eventName, value, path) {
    var detail = {
      value: value,
      queueProperty: true
    };
    if (path) {
      detail.path = path;
    }
    /** @type {!HTMLElement} */inst.dispatchEvent(new CustomEvent(eventName, { detail: detail }));
  }

  /**
   * Implements the "notify" effect.
   *
   * Dispatches a non-bubbling event named `info.eventName` on the instance
   * with a detail object containing the new `value`.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runNotifyEffect(inst, property, props, oldProps, info, hasPaths) {
    var rootProperty = hasPaths ? Polymer.Path.root(property) : property;
    var path = rootProperty != property ? property : null;
    var value = path ? Polymer.Path.get(inst, path) : inst.__data[property];
    if (path && value === undefined) {
      value = props[property]; // specifically for .splices
    }
    dispatchNotifyEvent(inst, info.eventName, value, path);
  }

  /**
   * Handler function for 2-way notification events. Receives context
   * information captured in the `addNotifyListener` closure from the
   * `__notifyListeners` metadata.
   *
   * Sets the value of the notified property to the host property or path.  If
   * the event contained path information, translate that path to the host
   * scope's name for that path first.
   *
   * @param {CustomEvent} event Notification event (e.g. '<property>-changed')
   * @param {!PropertyEffectsType} inst Host element instance handling the notification event
   * @param {string} fromProp Child element property that was bound
   * @param {string} toPath Host property/path that was bound
   * @param {boolean} negate Whether the binding was negated
   * @private
   */
  function handleNotification(event, inst, fromProp, toPath, negate) {
    var value = void 0;
    var detail = /** @type {Object} */event.detail;
    var fromPath = detail && detail.path;
    if (fromPath) {
      toPath = Polymer.Path.translate(fromProp, toPath, fromPath);
      value = detail && detail.value;
    } else {
      value = event.target[fromProp];
    }
    value = negate ? !value : value;
    if (!inst[TYPES.READ_ONLY] || !inst[TYPES.READ_ONLY][toPath]) {
      if (inst._setPendingPropertyOrPath(toPath, value, true, Boolean(fromPath)) && (!detail || !detail.queueProperty)) {
        inst._invalidateProperties();
      }
    }
  }

  /**
   * Implements the "reflect" effect.
   *
   * Sets the attribute named `info.attrName` to the given property value.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runReflectEffect(inst, property, props, oldProps, info) {
    var value = inst.__data[property];
    if (Polymer.sanitizeDOMValue) {
      value = Polymer.sanitizeDOMValue(value, info.attrName, 'attribute', /** @type {Node} */inst);
    }
    inst._propertyToAttribute(property, info.attrName, value);
  }

  /**
   * Runs "computed" effects for a set of changed properties.
   *
   * This method differs from the generic `runEffects` method in that it
   * continues to run computed effects based on the output of each pass until
   * there are no more newly computed properties.  This ensures that all
   * properties that will be computed by the initial set of changes are
   * computed before other effects (binding propagation, observers, and notify)
   * run.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {!Object} changedProps Bag of changed properties
   * @param {!Object} oldProps Bag of previous values for changed properties
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runComputedEffects(inst, changedProps, oldProps, hasPaths) {
    var computeEffects = inst[TYPES.COMPUTE];
    if (computeEffects) {
      var inputProps = changedProps;
      while (runEffects(inst, computeEffects, inputProps, oldProps, hasPaths)) {
        Object.assign(oldProps, inst.__dataOld);
        Object.assign(changedProps, inst.__dataPending);
        inputProps = inst.__dataPending;
        inst.__dataPending = null;
      }
    }
  }

  /**
   * Implements the "computed property" effect by running the method with the
   * values of the arguments specified in the `info` object and setting the
   * return value to the computed property specified.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runComputedEffect(inst, property, props, oldProps, info) {
    var result = runMethodEffect(inst, property, props, oldProps, info);
    var computedProp = info.methodInfo;
    if (inst.__dataHasAccessor && inst.__dataHasAccessor[computedProp]) {
      inst._setPendingProperty(computedProp, result, true);
    } else {
      inst[computedProp] = result;
    }
  }

  /**
   * Computes path changes based on path links set up using the `linkPaths`
   * API.
   *
   * @param {!PropertyEffectsType} inst The instance whose props are changing
   * @param {string | !Array<(string|number)>} path Path that has changed
   * @param {*} value Value of changed path
   * @private
   */
  function computeLinkedPaths(inst, path, value) {
    var links = inst.__dataLinkedPaths;
    if (links) {
      var link = void 0;
      for (var a in links) {
        var b = links[a];
        if (Polymer.Path.isDescendant(a, path)) {
          link = Polymer.Path.translate(a, b, path);
          inst._setPendingPropertyOrPath(link, value, true, true);
        } else if (Polymer.Path.isDescendant(b, path)) {
          link = Polymer.Path.translate(b, a, path);
          inst._setPendingPropertyOrPath(link, value, true, true);
        }
      }
    }
  }

  // -- bindings ----------------------------------------------

  /**
   * Adds binding metadata to the current `nodeInfo`, and binding effects
   * for all part dependencies to `templateInfo`.
   *
   * @param {Function} constructor Class that `_parseTemplate` is currently
   *   running on
   * @param {TemplateInfo} templateInfo Template metadata for current template
   * @param {NodeInfo} nodeInfo Node metadata for current template node
   * @param {string} kind Binding kind, either 'property', 'attribute', or 'text'
   * @param {string} target Target property name
   * @param {!Array<!BindingPart>} parts Array of binding part metadata
   * @param {string=} literal Literal text surrounding binding parts (specified
   *   only for 'property' bindings, since these must be initialized as part
   *   of boot-up)
   * @private
   */
  function addBinding(constructor, templateInfo, nodeInfo, kind, target, parts, literal) {
    // Create binding metadata and add to nodeInfo
    nodeInfo.bindings = nodeInfo.bindings || [];
    var /** Binding */binding = { kind: kind, target: target, parts: parts, literal: literal, isCompound: parts.length !== 1 };
    nodeInfo.bindings.push(binding);
    // Add listener info to binding metadata
    if (shouldAddListener(binding)) {
      var _binding$parts$ = binding.parts[0],
          event = _binding$parts$.event,
          negate = _binding$parts$.negate;

      binding.listenerEvent = event || CaseMap.camelToDashCase(target) + '-changed';
      binding.listenerNegate = negate;
    }
    // Add "propagate" property effects to templateInfo
    var index = templateInfo.nodeInfoList.length;
    for (var i = 0; i < binding.parts.length; i++) {
      var part = binding.parts[i];
      part.compoundIndex = i;
      addEffectForBindingPart(constructor, templateInfo, binding, part, index);
    }
  }

  /**
   * Adds property effects to the given `templateInfo` for the given binding
   * part.
   *
   * @param {Function} constructor Class that `_parseTemplate` is currently
   *   running on
   * @param {TemplateInfo} templateInfo Template metadata for current template
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @param {number} index Index into `nodeInfoList` for this node
   */
  function addEffectForBindingPart(constructor, templateInfo, binding, part, index) {
    if (!part.literal) {
      if (binding.kind === 'attribute' && binding.target[0] === '-') {
        console.warn('Cannot set attribute ' + binding.target + ' because "-" is not a valid attribute starting character');
      } else {
        var dependencies = part.dependencies;
        var info = { index: index, binding: binding, part: part, evaluator: constructor };
        for (var j = 0; j < dependencies.length; j++) {
          var trigger = dependencies[j];
          if (typeof trigger == 'string') {
            trigger = parseArg(trigger);
            trigger.wildcard = true;
          }
          constructor._addTemplatePropertyEffect(templateInfo, trigger.rootProperty, {
            fn: runBindingEffect,
            info: info, trigger: trigger
          });
        }
      }
    }
  }

  /**
   * Implements the "binding" (property/path binding) effect.
   *
   * Note that binding syntax is overridable via `_parseBindings` and
   * `_evaluateBinding`.  This method will call `_evaluateBinding` for any
   * non-literal parts returned from `_parseBindings`.  However,
   * there is no support for _path_ bindings via custom binding parts,
   * as this is specific to Polymer's path binding syntax.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} path Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @param {Array} nodeList List of nodes associated with `nodeInfoList` template
   *   metadata
   * @private
   */
  function runBindingEffect(inst, path, props, oldProps, info, hasPaths, nodeList) {
    var node = nodeList[info.index];
    var binding = info.binding;
    var part = info.part;
    // Subpath notification: transform path and set to client
    // e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop
    if (hasPaths && part.source && path.length > part.source.length && binding.kind == 'property' && !binding.isCompound && node.__dataHasAccessor && node.__dataHasAccessor[binding.target]) {
      var value = props[path];
      path = Polymer.Path.translate(part.source, binding.target, path);
      if (node._setPendingPropertyOrPath(path, value, false, true)) {
        inst._enqueueClient(node);
      }
    } else {
      var _value = info.evaluator._evaluateBinding(inst, part, path, props, oldProps, hasPaths);
      // Propagate value to child
      applyBindingValue(inst, node, binding, part, _value);
    }
  }

  /**
   * Sets the value for an "binding" (binding) effect to a node,
   * either as a property or attribute.
   *
   * @param {!PropertyEffectsType} inst The instance owning the binding effect
   * @param {Node} node Target node for binding
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @param {*} value Value to set
   * @private
   */
  function applyBindingValue(inst, node, binding, part, value) {
    value = computeBindingValue(node, value, binding, part);
    if (Polymer.sanitizeDOMValue) {
      value = Polymer.sanitizeDOMValue(value, binding.target, binding.kind, node);
    }
    if (binding.kind == 'attribute') {
      // Attribute binding
      inst._valueToNodeAttribute( /** @type {Element} */node, value, binding.target);
    } else {
      // Property binding
      var prop = binding.target;
      if (node.__dataHasAccessor && node.__dataHasAccessor[prop]) {
        if (!node[TYPES.READ_ONLY] || !node[TYPES.READ_ONLY][prop]) {
          if (node._setPendingProperty(prop, value)) {
            inst._enqueueClient(node);
          }
        }
      } else {
        inst._setUnmanagedPropertyToNode(node, prop, value);
      }
    }
  }

  /**
   * Transforms an "binding" effect value based on compound & negation
   * effect metadata, as well as handling for special-case properties
   *
   * @param {Node} node Node the value will be set to
   * @param {*} value Value to set
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @return {*} Transformed value to set
   * @private
   */
  function computeBindingValue(node, value, binding, part) {
    if (binding.isCompound) {
      var storage = node.__dataCompoundStorage[binding.target];
      storage[part.compoundIndex] = value;
      value = storage.join('');
    }
    if (binding.kind !== 'attribute') {
      // Some browsers serialize `undefined` to `"undefined"`
      if (binding.target === 'textContent' || node.localName == 'input' && binding.target == 'value') {
        value = value == undefined ? '' : value;
      }
    }
    return value;
  }

  /**
   * Returns true if a binding's metadata meets all the requirements to allow
   * 2-way binding, and therefore a `<property>-changed` event listener should be
   * added:
   * - used curly braces
   * - is a property (not attribute) binding
   * - is not a textContent binding
   * - is not compound
   *
   * @param {!Binding} binding Binding metadata
   * @return {boolean} True if 2-way listener should be added
   * @private
   */
  function shouldAddListener(binding) {
    return Boolean(binding.target) && binding.kind != 'attribute' && binding.kind != 'text' && !binding.isCompound && binding.parts[0].mode === '{';
  }

  /**
   * Setup compound binding storage structures, notify listeners, and dataHost
   * references onto the bound nodeList.
   *
   * @param {!PropertyEffectsType} inst Instance that bas been previously bound
   * @param {TemplateInfo} templateInfo Template metadata
   * @private
   */
  function setupBindings(inst, templateInfo) {
    // Setup compound storage, dataHost, and notify listeners
    var nodeList = templateInfo.nodeList,
        nodeInfoList = templateInfo.nodeInfoList;

    if (nodeInfoList.length) {
      for (var i = 0; i < nodeInfoList.length; i++) {
        var info = nodeInfoList[i];
        var node = nodeList[i];
        var bindings = info.bindings;
        if (bindings) {
          for (var _i = 0; _i < bindings.length; _i++) {
            var binding = bindings[_i];
            setupCompoundStorage(node, binding);
            addNotifyListener(node, inst, binding);
          }
        }
        node.__dataHost = inst;
      }
    }
  }

  /**
   * Initializes `__dataCompoundStorage` local storage on a bound node with
   * initial literal data for compound bindings, and sets the joined
   * literal parts to the bound property.
   *
   * When changes to compound parts occur, they are first set into the compound
   * storage array for that property, and then the array is joined to result in
   * the final value set to the property/attribute.
   *
   * @param {Node} node Bound node to initialize
   * @param {Binding} binding Binding metadata
   * @private
   */
  function setupCompoundStorage(node, binding) {
    if (binding.isCompound) {
      // Create compound storage map
      var storage = node.__dataCompoundStorage || (node.__dataCompoundStorage = {});
      var parts = binding.parts;
      // Copy literals from parts into storage for this binding
      var literals = new Array(parts.length);
      for (var j = 0; j < parts.length; j++) {
        literals[j] = parts[j].literal;
      }
      var target = binding.target;
      storage[target] = literals;
      // Configure properties with their literal parts
      if (binding.literal && binding.kind == 'property') {
        node[target] = binding.literal;
      }
    }
  }

  /**
   * Adds a 2-way binding notification event listener to the node specified
   *
   * @param {Object} node Child element to add listener to
   * @param {!PropertyEffectsType} inst Host element instance to handle notification event
   * @param {Binding} binding Binding metadata
   * @private
   */
  function addNotifyListener(node, inst, binding) {
    if (binding.listenerEvent) {
      var part = binding.parts[0];
      node.addEventListener(binding.listenerEvent, function (e) {
        handleNotification(e, inst, binding.target, part.source, part.negate);
      });
    }
  }

  // -- for method-based effects (complexObserver & computed) --------------

  /**
   * Adds property effects for each argument in the method signature (and
   * optionally, for the method name if `dynamic` is true) that calls the
   * provided effect function.
   *
   * @param {Element | Object} model Prototype or instance
   * @param {!MethodSignature} sig Method signature metadata
   * @param {string} type Type of property effect to add
   * @param {Function} effectFn Function to run when arguments change
   * @param {*=} methodInfo Effect-specific information to be included in
   *   method effect metadata
   * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
   *   method names should be included as a dependency to the effect. Note,
   *   defaults to true if the signature is static (sig.static is true).
   * @private
   */
  function createMethodEffect(model, sig, type, effectFn, methodInfo, dynamicFn) {
    dynamicFn = sig.static || dynamicFn && ((typeof dynamicFn === 'undefined' ? 'undefined' : _typeof(dynamicFn)) !== 'object' || dynamicFn[sig.methodName]);
    var info = {
      methodName: sig.methodName,
      args: sig.args,
      methodInfo: methodInfo,
      dynamicFn: dynamicFn
    };
    for (var i = 0, arg; i < sig.args.length && (arg = sig.args[i]); i++) {
      if (!arg.literal) {
        model._addPropertyEffect(arg.rootProperty, type, {
          fn: effectFn, info: info, trigger: arg
        });
      }
    }
    if (dynamicFn) {
      model._addPropertyEffect(sig.methodName, type, {
        fn: effectFn, info: info
      });
    }
  }

  /**
   * Calls a method with arguments marshaled from properties on the instance
   * based on the method signature contained in the effect metadata.
   *
   * Multi-property observers, computed properties, and inline computing
   * functions call this function to invoke the method, then use the return
   * value accordingly.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @return {*} Returns the return value from the method invocation
   * @private
   */
  function runMethodEffect(inst, property, props, oldProps, info) {
    // Instances can optionally have a _methodHost which allows redirecting where
    // to find methods. Currently used by `templatize`.
    var context = inst._methodHost || inst;
    var fn = context[info.methodName];
    if (fn) {
      var args = marshalArgs(inst.__data, info.args, property, props);
      return fn.apply(context, args);
    } else if (!info.dynamicFn) {
      console.warn('method `' + info.methodName + '` not defined');
    }
  }

  var emptyArray = [];

  // Regular expressions used for binding
  var IDENT = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
  var NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
  var SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
  var DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
  var STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
  var ARGUMENT = '(?:(' + IDENT + '|' + NUMBER + '|' + STRING + ')\\s*' + ')';
  var ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
  var ARGUMENT_LIST = '(?:' + '\\(\\s*' + '(?:' + ARGUMENTS + '?' + ')' + '\\)\\s*' + ')';
  var BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')'; // Group 3
  var OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
  var CLOSE_BRACKET = '(?:]]|}})';
  var NEGATE = '(?:(!)\\s*)?'; // Group 2
  var EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
  var bindingRegex = new RegExp(EXPRESSION, "g");

  /**
   * Create a string from binding parts of all the literal parts
   *
   * @param {!Array<BindingPart>} parts All parts to stringify
   * @return {string} String made from the literal parts
   */
  function literalFromParts(parts) {
    var s = '';
    for (var i = 0; i < parts.length; i++) {
      var literal = parts[i].literal;
      s += literal || '';
    }
    return s;
  }

  /**
   * Parses an expression string for a method signature, and returns a metadata
   * describing the method in terms of `methodName`, `static` (whether all the
   * arguments are literals), and an array of `args`
   *
   * @param {string} expression The expression to parse
   * @return {?MethodSignature} The method metadata object if a method expression was
   *   found, otherwise `undefined`
   * @private
   */
  function parseMethod(expression) {
    // tries to match valid javascript property names
    var m = expression.match(/([^\s]+?)\(([\s\S]*)\)/);
    if (m) {
      var methodName = m[1];
      var sig = { methodName: methodName, static: true, args: emptyArray };
      if (m[2].trim()) {
        // replace escaped commas with comma entity, split on un-escaped commas
        var args = m[2].replace(/\\,/g, '&comma;').split(',');
        return parseArgs(args, sig);
      } else {
        return sig;
      }
    }
    return null;
  }

  /**
   * Parses an array of arguments and sets the `args` property of the supplied
   * signature metadata object. Sets the `static` property to false if any
   * argument is a non-literal.
   *
   * @param {!Array<string>} argList Array of argument names
   * @param {!MethodSignature} sig Method signature metadata object
   * @return {!MethodSignature} The updated signature metadata object
   * @private
   */
  function parseArgs(argList, sig) {
    sig.args = argList.map(function (rawArg) {
      var arg = parseArg(rawArg);
      if (!arg.literal) {
        sig.static = false;
      }
      return arg;
    }, this);
    return sig;
  }

  /**
   * Parses an individual argument, and returns an argument metadata object
   * with the following fields:
   *
   *   {
   *     value: 'prop',        // property/path or literal value
   *     literal: false,       // whether argument is a literal
   *     structured: false,    // whether the property is a path
   *     rootProperty: 'prop', // the root property of the path
   *     wildcard: false       // whether the argument was a wildcard '.*' path
   *   }
   *
   * @param {string} rawArg The string value of the argument
   * @return {!MethodArg} Argument metadata object
   * @private
   */
  function parseArg(rawArg) {
    // clean up whitespace
    var arg = rawArg.trim()
    // replace comma entity with comma
    .replace(/&comma;/g, ',')
    // repair extra escape sequences; note only commas strictly need
    // escaping, but we allow any other char to be escaped since its
    // likely users will do this
    .replace(/\\(.)/g, '\$1');
    // basic argument descriptor
    var a = {
      name: arg,
      value: '',
      literal: false
    };
    // detect literal value (must be String or Number)
    var fc = arg[0];
    if (fc === '-') {
      fc = arg[1];
    }
    if (fc >= '0' && fc <= '9') {
      fc = '#';
    }
    switch (fc) {
      case "'":
      case '"':
        a.value = arg.slice(1, -1);
        a.literal = true;
        break;
      case '#':
        a.value = Number(arg);
        a.literal = true;
        break;
    }
    // if not literal, look for structured path
    if (!a.literal) {
      a.rootProperty = Polymer.Path.root(arg);
      // detect structured path (has dots)
      a.structured = Polymer.Path.isPath(arg);
      if (a.structured) {
        a.wildcard = arg.slice(-2) == '.*';
        if (a.wildcard) {
          a.name = arg.slice(0, -2);
        }
      }
    }
    return a;
  }

  /**
   * Gather the argument values for a method specified in the provided array
   * of argument metadata.
   *
   * The `path` and `value` arguments are used to fill in wildcard descriptor
   * when the method is being called as a result of a path notification.
   *
   * @param {Object} data Instance data storage object to read properties from
   * @param {!Array<!MethodArg>} args Array of argument metadata
   * @param {string} path Property/path name that triggered the method effect
   * @param {Object} props Bag of current property changes
   * @return {Array<*>} Array of argument values
   * @private
   */
  function marshalArgs(data, args, path, props) {
    var values = [];
    for (var i = 0, l = args.length; i < l; i++) {
      var arg = args[i];
      var name = arg.name;
      var v = void 0;
      if (arg.literal) {
        v = arg.value;
      } else {
        if (arg.structured) {
          v = Polymer.Path.get(data, name);
          // when data is not stored e.g. `splices`
          if (v === undefined) {
            v = props[name];
          }
        } else {
          v = data[name];
        }
      }
      if (arg.wildcard) {
        // Only send the actual path changed info if the change that
        // caused the observer to run matched the wildcard
        var baseChanged = name.indexOf(path + '.') === 0;
        var matches = path.indexOf(name) === 0 && !baseChanged;
        values[i] = {
          path: matches ? path : name,
          value: matches ? props[path] : v,
          base: v
        };
      } else {
        values[i] = v;
      }
    }
    return values;
  }

  // data api

  /**
   * Sends array splice notifications (`.splices` and `.length`)
   *
   * Note: this implementation only accepts normalized paths
   *
   * @param {!PropertyEffectsType} inst Instance to send notifications to
   * @param {Array} array The array the mutations occurred on
   * @param {string} path The path to the array that was mutated
   * @param {Array} splices Array of splice records
   * @private
   */
  function _notifySplices(inst, array, path, splices) {
    var splicesPath = path + '.splices';
    inst.notifyPath(splicesPath, { indexSplices: splices });
    inst.notifyPath(path + '.length', array.length);
    // Null here to allow potentially large splice records to be GC'ed.
    inst.__data[splicesPath] = { indexSplices: null };
  }

  /**
   * Creates a splice record and sends an array splice notification for
   * the described mutation
   *
   * Note: this implementation only accepts normalized paths
   *
   * @param {!PropertyEffectsType} inst Instance to send notifications to
   * @param {Array} array The array the mutations occurred on
   * @param {string} path The path to the array that was mutated
   * @param {number} index Index at which the array mutation occurred
   * @param {number} addedCount Number of added items
   * @param {Array} removed Array of removed items
   * @private
   */
  function notifySplice(inst, array, path, index, addedCount, removed) {
    _notifySplices(inst, array, path, [{
      index: index,
      addedCount: addedCount,
      removed: removed,
      object: array,
      type: 'splice'
    }]);
  }

  /**
   * Returns an upper-cased version of the string.
   *
   * @param {string} name String to uppercase
   * @return {string} Uppercased string
   * @private
   */
  function upper(name) {
    return name[0].toUpperCase() + name.substring(1);
  }

  /**
   * Element class mixin that provides meta-programming for Polymer's template
   * binding and data observation (collectively, "property effects") system.
   *
   * This mixin uses provides the following key static methods for adding
   * property effects to an element class:
   * - `addPropertyEffect`
   * - `createPropertyObserver`
   * - `createMethodObserver`
   * - `createNotifyingProperty`
   * - `createReadOnlyProperty`
   * - `createReflectedProperty`
   * - `createComputedProperty`
   * - `bindTemplate`
   *
   * Each method creates one or more property accessors, along with metadata
   * used by this mixin's implementation of `_propertiesChanged` to perform
   * the property effects.
   *
   * Underscored versions of the above methods also exist on the element
   * prototype for adding property effects on instances at runtime.
   *
   * Note that this mixin overrides several `PropertyAccessors` methods, in
   * many cases to maintain guarantees provided by the Polymer 1.x features;
   * notably it changes property accessors to be synchronous by default
   * whereas the default when using `PropertyAccessors` standalone is to be
   * async by default.
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin Polymer.TemplateStamp
   * @appliesMixin Polymer.PropertyAccessors
   * @memberof Polymer
   * @summary Element class mixin that provides meta-programming for Polymer's
   * template binding and data observation system.
   */
  Polymer.PropertyEffects = Polymer.dedupingMixin(function (superClass) {

    /**
     * @constructor
     * @extends {superClass}
     * @implements {Polymer_PropertyAccessors}
     * @implements {Polymer_TemplateStamp}
     * @unrestricted
     */
    var propertyEffectsBase = Polymer.TemplateStamp(Polymer.PropertyAccessors(superClass));

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_PropertyEffects}
     * @extends {propertyEffectsBase}
     * @unrestricted
     */

    var PropertyEffects = function (_propertyEffectsBase) {
      _inherits(PropertyEffects, _propertyEffectsBase);

      function PropertyEffects() {
        _classCallCheck(this, PropertyEffects);

        /** @type {boolean} */
        var _this = _possibleConstructorReturn(this, (PropertyEffects.__proto__ || Object.getPrototypeOf(PropertyEffects)).call(this));

        _this.__dataClientsReady;
        /** @type {Array} */
        _this.__dataPendingClients;
        /** @type {Object} */
        _this.__dataToNotify;
        /** @type {Object} */
        _this.__dataLinkedPaths;
        /** @type {boolean} */
        _this.__dataHasPaths;
        /** @type {Object} */
        _this.__dataCompoundStorage;
        /** @type {Polymer_PropertyEffects} */
        _this.__dataHost;
        /** @type {!Object} */
        _this.__dataTemp;
        /** @type {boolean} */
        _this.__dataClientsInitialized;
        /** @type {!Object} */
        _this.__data;
        /** @type {!Object} */
        _this.__dataPending;
        /** @type {!Object} */
        _this.__dataOld;
        /** @type {Object} */
        _this.__computeEffects;
        /** @type {Object} */
        _this.__reflectEffects;
        /** @type {Object} */
        _this.__notifyEffects;
        /** @type {Object} */
        _this.__propagateEffects;
        /** @type {Object} */
        _this.__observeEffects;
        /** @type {Object} */
        _this.__readOnly;
        /** @type {number} */
        _this.__dataCounter;
        /** @type {!TemplateInfo} */
        _this.__templateInfo;
        return _this;
      }

      _createClass(PropertyEffects, [{
        key: '_initializeProperties',
        value: function _initializeProperties() {
          _get(PropertyEffects.prototype.__proto__ || Object.getPrototypeOf(PropertyEffects.prototype), '_initializeProperties', this).call(this);
          hostStack.registerHost(this);
          this.__dataClientsReady = false;
          this.__dataPendingClients = null;
          this.__dataToNotify = null;
          this.__dataLinkedPaths = null;
          this.__dataHasPaths = false;
          // May be set on instance prior to upgrade
          this.__dataCompoundStorage = this.__dataCompoundStorage || null;
          this.__dataHost = this.__dataHost || null;
          this.__dataTemp = {};
          this.__dataClientsInitialized = false;
        }

        /**
         * Overrides `Polymer.PropertyAccessors` implementation to provide a
         * more efficient implementation of initializing properties from
         * the prototype on the instance.
         *
         * @override
         * @param {Object} props Properties to initialize on the prototype
         */

      }, {
        key: '_initializeProtoProperties',
        value: function _initializeProtoProperties(props) {
          this.__data = Object.create(props);
          this.__dataPending = Object.create(props);
          this.__dataOld = {};
        }

        /**
         * Overrides `Polymer.PropertyAccessors` implementation to avoid setting
         * `_setProperty`'s `shouldNotify: true`.
         *
         * @override
         * @param {Object} props Properties to initialize on the instance
         */

      }, {
        key: '_initializeInstanceProperties',
        value: function _initializeInstanceProperties(props) {
          var readOnly = this[TYPES.READ_ONLY];
          for (var prop in props) {
            if (!readOnly || !readOnly[prop]) {
              this.__dataPending = this.__dataPending || {};
              this.__dataOld = this.__dataOld || {};
              this.__data[prop] = this.__dataPending[prop] = props[prop];
            }
          }
        }

        // Prototype setup ----------------------------------------

        /**
         * Equivalent to static `addPropertyEffect` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @param {string} property Property that should trigger the effect
         * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
         * @param {Object=} effect Effect metadata object
         * @protected
         */

      }, {
        key: '_addPropertyEffect',
        value: function _addPropertyEffect(property, type, effect) {
          this._createPropertyAccessor(property, type == TYPES.READ_ONLY);
          // effects are accumulated into arrays per property based on type
          var effects = ensureOwnEffectMap(this, type)[property];
          if (!effects) {
            effects = this[type][property] = [];
          }
          effects.push(effect);
        }

        /**
         * Removes the given property effect.
         *
         * @param {string} property Property the effect was associated with
         * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
         * @param {Object=} effect Effect metadata object to remove
         */

      }, {
        key: '_removePropertyEffect',
        value: function _removePropertyEffect(property, type, effect) {
          var effects = ensureOwnEffectMap(this, type)[property];
          var idx = effects.indexOf(effect);
          if (idx >= 0) {
            effects.splice(idx, 1);
          }
        }

        /**
         * Returns whether the current prototype/instance has a property effect
         * of a certain type.
         *
         * @param {string} property Property name
         * @param {string=} type Effect type, from this.PROPERTY_EFFECT_TYPES
         * @return {boolean} True if the prototype/instance has an effect of this type
         * @protected
         */

      }, {
        key: '_hasPropertyEffect',
        value: function _hasPropertyEffect(property, type) {
          var effects = this[type];
          return Boolean(effects && effects[property]);
        }

        /**
         * Returns whether the current prototype/instance has a "read only"
         * accessor for the given property.
         *
         * @param {string} property Property name
         * @return {boolean} True if the prototype/instance has an effect of this type
         * @protected
         */

      }, {
        key: '_hasReadOnlyEffect',
        value: function _hasReadOnlyEffect(property) {
          return this._hasPropertyEffect(property, TYPES.READ_ONLY);
        }

        /**
         * Returns whether the current prototype/instance has a "notify"
         * property effect for the given property.
         *
         * @param {string} property Property name
         * @return {boolean} True if the prototype/instance has an effect of this type
         * @protected
         */

      }, {
        key: '_hasNotifyEffect',
        value: function _hasNotifyEffect(property) {
          return this._hasPropertyEffect(property, TYPES.NOTIFY);
        }

        /**
         * Returns whether the current prototype/instance has a "reflect to attribute"
         * property effect for the given property.
         *
         * @param {string} property Property name
         * @return {boolean} True if the prototype/instance has an effect of this type
         * @protected
         */

      }, {
        key: '_hasReflectEffect',
        value: function _hasReflectEffect(property) {
          return this._hasPropertyEffect(property, TYPES.REFLECT);
        }

        /**
         * Returns whether the current prototype/instance has a "computed"
         * property effect for the given property.
         *
         * @param {string} property Property name
         * @return {boolean} True if the prototype/instance has an effect of this type
         * @protected
         */

      }, {
        key: '_hasComputedEffect',
        value: function _hasComputedEffect(property) {
          return this._hasPropertyEffect(property, TYPES.COMPUTE);
        }

        // Runtime ----------------------------------------

        /**
         * Sets a pending property or path.  If the root property of the path in
         * question had no accessor, the path is set, otherwise it is enqueued
         * via `_setPendingProperty`.
         *
         * This function isolates relatively expensive functionality necessary
         * for the public API (`set`, `setProperties`, `notifyPath`, and property
         * change listeners via {{...}} bindings), such that it is only done
         * when paths enter the system, and not at every propagation step.  It
         * also sets a `__dataHasPaths` flag on the instance which is used to
         * fast-path slower path-matching code in the property effects host paths.
         *
         * `path` can be a path string or array of path parts as accepted by the
         * public API.
         *
         * @param {string | !Array<number|string>} path Path to set
         * @param {*} value Value to set
         * @param {boolean=} shouldNotify Set to true if this change should
         *  cause a property notification event dispatch
         * @param {boolean=} isPathNotification If the path being set is a path
         *   notification of an already changed value, as opposed to a request
         *   to set and notify the change.  In the latter `false` case, a dirty
         *   check is performed and then the value is set to the path before
         *   enqueuing the pending property change.
         * @return {boolean} Returns true if the property/path was enqueued in
         *   the pending changes bag.
         * @protected
         */

      }, {
        key: '_setPendingPropertyOrPath',
        value: function _setPendingPropertyOrPath(path, value, shouldNotify, isPathNotification) {
          if (isPathNotification || Polymer.Path.root(Array.isArray(path) ? path[0] : path) !== path) {
            // Dirty check changes being set to a path against the actual object,
            // since this is the entry point for paths into the system; from here
            // the only dirty checks are against the `__dataTemp` cache to prevent
            // duplicate work in the same turn only. Note, if this was a notification
            // of a change already set to a path (isPathNotification: true),
            // we always let the change through and skip the `set` since it was
            // already dirty checked at the point of entry and the underlying
            // object has already been updated
            if (!isPathNotification) {
              var old = Polymer.Path.get(this, path);
              path = /** @type {string} */Polymer.Path.set(this, path, value);
              // Use property-accessor's simpler dirty check
              if (!path || !_get(PropertyEffects.prototype.__proto__ || Object.getPrototypeOf(PropertyEffects.prototype), '_shouldPropertyChange', this).call(this, path, value, old)) {
                return false;
              }
            }
            this.__dataHasPaths = true;
            if (this._setPendingProperty( /**@type{string}*/path, value, shouldNotify)) {
              computeLinkedPaths(this, path, value);
              return true;
            }
          } else {
            if (this.__dataHasAccessor && this.__dataHasAccessor[path]) {
              return this._setPendingProperty( /**@type{string}*/path, value, shouldNotify);
            } else {
              this[path] = value;
            }
          }
          return false;
        }

        /**
         * Applies a value to a non-Polymer element/node's property.
         *
         * The implementation makes a best-effort at binding interop:
         * Some native element properties have side-effects when
         * re-setting the same value (e.g. setting `<input>.value` resets the
         * cursor position), so we do a dirty-check before setting the value.
         * However, for better interop with non-Polymer custom elements that
         * accept objects, we explicitly re-set object changes coming from the
         * Polymer world (which may include deep object changes without the
         * top reference changing), erring on the side of providing more
         * information.
         *
         * Users may override this method to provide alternate approaches.
         *
         * @param {Node} node The node to set a property on
         * @param {string} prop The property to set
         * @param {*} value The value to set
         * @protected
         */

      }, {
        key: '_setUnmanagedPropertyToNode',
        value: function _setUnmanagedPropertyToNode(node, prop, value) {
          // It is a judgment call that resetting primitives is
          // "bad" and resettings objects is also "good"; alternatively we could
          // implement a whitelist of tag & property values that should never
          // be reset (e.g. <input>.value && <select>.value)
          if (value !== node[prop] || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
            node[prop] = value;
          }
        }

        /**
         * Overrides the `PropertyAccessors` implementation to introduce special
         * dirty check logic depending on the property & value being set:
         *
         * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
         *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
         * 2. Object set to simple property (e.g. 'prop': {...})
         *    Stored in `__dataTemp` and `__data`, dirty checked against
         *    `__dataTemp` by default implementation of `_shouldPropertyChange`
         * 3. Primitive value set to simple property (e.g. 'prop': 42)
         *    Stored in `__data`, dirty checked against `__data`
         *
         * The dirty-check is important to prevent cycles due to two-way
         * notification, but paths and objects are only dirty checked against any
         * previous value set during this turn via a "temporary cache" that is
         * cleared when the last `_propertiesChaged` exits. This is so:
         * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
         *    due to array mutations like shift/unshift/splice; this is fine
         *    since path changes are dirty-checked at user entry points like `set`
         * b. dirty-checking for objects only lasts one turn to allow the user
         *    to mutate the object in-place and re-set it with the same identity
         *    and have all sub-properties re-propagated in a subsequent turn.
         *
         * The temp cache is not necessarily sufficient to prevent invalid array
         * paths, since a splice can happen during the same turn (with pathological
         * user code); we could introduce a "fixup" for temporarily cached array
         * paths if needed: https://github.com/Polymer/polymer/issues/4227
         *
         * @param {string} property Name of the property
         * @param {*} value Value to set
         * @param {boolean=} shouldNotify True if property should fire notification
         *   event (applies only for `notify: true` properties)
         * @return {boolean} Returns true if the property changed
         * @override
         */

      }, {
        key: '_setPendingProperty',
        value: function _setPendingProperty(property, value, shouldNotify) {
          var isPath = this.__dataHasPaths && Polymer.Path.isPath(property);
          var prevProps = isPath ? this.__dataTemp : this.__data;
          if (this._shouldPropertyChange(property, value, prevProps[property])) {
            if (!this.__dataPending) {
              this.__dataPending = {};
              this.__dataOld = {};
            }
            // Ensure old is captured from the last turn
            if (!(property in this.__dataOld)) {
              this.__dataOld[property] = this.__data[property];
            }
            // Paths are stored in temporary cache (cleared at end of turn),
            // which is used for dirty-checking, all others stored in __data
            if (isPath) {
              this.__dataTemp[property] = value;
            } else {
              this.__data[property] = value;
            }
            // All changes go into pending property bag, passed to _propertiesChanged
            this.__dataPending[property] = value;
            // Track properties that should notify separately
            if (isPath || this[TYPES.NOTIFY] && this[TYPES.NOTIFY][property]) {
              this.__dataToNotify = this.__dataToNotify || {};
              this.__dataToNotify[property] = shouldNotify;
            }
            return true;
          }
          return false;
        }

        /**
         * Overrides base implementation to ensure all accessors set `shouldNotify`
         * to true, for per-property notification tracking.
         *
         * @override
         */

      }, {
        key: '_setProperty',
        value: function _setProperty(property, value) {
          if (this._setPendingProperty(property, value, true)) {
            this._invalidateProperties();
          }
        }

        /**
         * Overrides `PropertyAccessor`'s default async queuing of
         * `_propertiesChanged`: if `__dataReady` is false (has not yet been
         * manually flushed), the function no-ops; otherwise flushes
         * `_propertiesChanged` synchronously.
         *
         * @override
         */

      }, {
        key: '_invalidateProperties',
        value: function _invalidateProperties() {
          if (this.__dataReady) {
            this._flushProperties();
          }
        }

        /**
         * Enqueues the given client on a list of pending clients, whose
         * pending property changes can later be flushed via a call to
         * `_flushClients`.
         *
         * @param {Object} client PropertyEffects client to enqueue
         * @protected
         */

      }, {
        key: '_enqueueClient',
        value: function _enqueueClient(client) {
          this.__dataPendingClients = this.__dataPendingClients || [];
          if (client !== this) {
            this.__dataPendingClients.push(client);
          }
        }

        /**
         * Flushes any clients previously enqueued via `_enqueueClient`, causing
         * their `_flushProperties` method to run.
         *
         * @protected
         */

      }, {
        key: '_flushClients',
        value: function _flushClients() {
          if (!this.__dataClientsReady) {
            this.__dataClientsReady = true;
            this._readyClients();
            // Override point where accessors are turned on; importantly,
            // this is after clients have fully readied, providing a guarantee
            // that any property effects occur only after all clients are ready.
            this.__dataReady = true;
          } else {
            this.__enableOrFlushClients();
          }
        }

        // NOTE: We ensure clients either enable or flush as appropriate. This
        // handles two corner cases:
        // (1) clients flush properly when connected/enabled before the host
        // enables; e.g.
        //   (a) Templatize stamps with no properties and does not flush and
        //   (b) the instance is inserted into dom and
        //   (c) then the instance flushes.
        // (2) clients enable properly when not connected/enabled when the host
        // flushes; e.g.
        //   (a) a template is runtime stamped and not yet connected/enabled
        //   (b) a host sets a property, causing stamped dom to flush
        //   (c) the stamped dom enables.

      }, {
        key: '__enableOrFlushClients',
        value: function __enableOrFlushClients() {
          var clients = this.__dataPendingClients;
          if (clients) {
            this.__dataPendingClients = null;
            for (var i = 0; i < clients.length; i++) {
              var client = clients[i];
              if (!client.__dataEnabled) {
                client._enableProperties();
              } else if (client.__dataPending) {
                client._flushProperties();
              }
            }
          }
        }

        /**
         * Perform any initial setup on client dom. Called before the first
         * `_flushProperties` call on client dom and before any element
         * observers are called.
         *
         * @protected
         */

      }, {
        key: '_readyClients',
        value: function _readyClients() {
          this.__enableOrFlushClients();
        }

        /**
         * Sets a bag of property changes to this instance, and
         * synchronously processes all effects of the properties as a batch.
         *
         * Property names must be simple properties, not paths.  Batched
         * path propagation is not supported.
         *
         * @param {Object} props Bag of one or more key-value pairs whose key is
         *   a property and value is the new value to set for that property.
         * @param {boolean=} setReadOnly When true, any private values set in
         *   `props` will be set. By default, `setProperties` will not set
         *   `readOnly: true` root properties.
         * @public
         */

      }, {
        key: 'setProperties',
        value: function setProperties(props, setReadOnly) {
          for (var path in props) {
            if (setReadOnly || !this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][path]) {
              //TODO(kschaaf): explicitly disallow paths in setProperty?
              // wildcard observers currently only pass the first changed path
              // in the `info` object, and you could do some odd things batching
              // paths, e.g. {'foo.bar': {...}, 'foo': null}
              this._setPendingPropertyOrPath(path, props[path], true);
            }
          }
          this._invalidateProperties();
        }

        /**
         * Overrides `PropertyAccessors` so that property accessor
         * side effects are not enabled until after client dom is fully ready.
         * Also calls `_flushClients` callback to ensure client dom is enabled
         * that was not enabled as a result of flushing properties.
         *
         * @override
         */

      }, {
        key: 'ready',
        value: function ready() {
          // It is important that `super.ready()` is not called here as it
          // immediately turns on accessors. Instead, we wait until `readyClients`
          // to enable accessors to provide a guarantee that clients are ready
          // before processing any accessors side effects.
          this._flushProperties();
          // If no data was pending, `_flushProperties` will not `flushClients`
          // so ensure this is done.
          if (!this.__dataClientsReady) {
            this._flushClients();
          }
          // Before ready, client notifications do not trigger _flushProperties.
          // Therefore a flush is necessary here if data has been set.
          if (this.__dataPending) {
            this._flushProperties();
          }
        }

        /**
         * Implements `PropertyAccessors`'s properties changed callback.
         *
         * Runs each class of effects for the batch of changed properties in
         * a specific order (compute, propagate, reflect, observe, notify).
         *
         * @override
         */

      }, {
        key: '_propertiesChanged',
        value: function _propertiesChanged(currentProps, changedProps, oldProps) {
          // ----------------------------
          // let c = Object.getOwnPropertyNames(changedProps || {});
          // window.debug && console.group(this.localName + '#' + this.id + ': ' + c);
          // if (window.debug) { debugger; }
          // ----------------------------
          var hasPaths = this.__dataHasPaths;
          this.__dataHasPaths = false;
          // Compute properties
          runComputedEffects(this, changedProps, oldProps, hasPaths);
          // Clear notify properties prior to possible reentry (propagate, observe),
          // but after computing effects have a chance to add to them
          var notifyProps = this.__dataToNotify;
          this.__dataToNotify = null;
          // Propagate properties to clients
          this._propagatePropertyChanges(changedProps, oldProps, hasPaths);
          // Flush clients
          this._flushClients();
          // Reflect properties
          runEffects(this, this[TYPES.REFLECT], changedProps, oldProps, hasPaths);
          // Observe properties
          runEffects(this, this[TYPES.OBSERVE], changedProps, oldProps, hasPaths);
          // Notify properties to host
          if (notifyProps) {
            runNotifyEffects(this, notifyProps, changedProps, oldProps, hasPaths);
          }
          // Clear temporary cache at end of turn
          if (this.__dataCounter == 1) {
            this.__dataTemp = {};
          }
          // ----------------------------
          // window.debug && console.groupEnd(this.localName + '#' + this.id + ': ' + c);
          // ----------------------------
        }

        /**
         * Called to propagate any property changes to stamped template nodes
         * managed by this element.
         *
         * @param {Object} changedProps Bag of changed properties
         * @param {Object} oldProps Bag of previous values for changed properties
         * @param {boolean} hasPaths True with `props` contains one or more paths
         * @protected
         */

      }, {
        key: '_propagatePropertyChanges',
        value: function _propagatePropertyChanges(changedProps, oldProps, hasPaths) {
          if (this[TYPES.PROPAGATE]) {
            runEffects(this, this[TYPES.PROPAGATE], changedProps, oldProps, hasPaths);
          }
          var templateInfo = this.__templateInfo;
          while (templateInfo) {
            runEffects(this, templateInfo.propertyEffects, changedProps, oldProps, hasPaths, templateInfo.nodeList);
            templateInfo = templateInfo.nextTemplateInfo;
          }
        }

        /**
         * Aliases one data path as another, such that path notifications from one
         * are routed to the other.
         *
         * @param {string | !Array<string|number>} to Target path to link.
         * @param {string | !Array<string|number>} from Source path to link.
         * @public
         */

      }, {
        key: 'linkPaths',
        value: function linkPaths(to, from) {
          to = Polymer.Path.normalize(to);
          from = Polymer.Path.normalize(from);
          this.__dataLinkedPaths = this.__dataLinkedPaths || {};
          this.__dataLinkedPaths[to] = from;
        }

        /**
         * Removes a data path alias previously established with `_linkPaths`.
         *
         * Note, the path to unlink should be the target (`to`) used when
         * linking the paths.
         *
         * @param {string | !Array<string|number>} path Target path to unlink.
         * @public
         */

      }, {
        key: 'unlinkPaths',
        value: function unlinkPaths(path) {
          path = Polymer.Path.normalize(path);
          if (this.__dataLinkedPaths) {
            delete this.__dataLinkedPaths[path];
          }
        }

        /**
         * Notify that an array has changed.
         *
         * Example:
         *
         *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
         *     ...
         *     this.items.splice(1, 1, {name: 'Sam'});
         *     this.items.push({name: 'Bob'});
         *     this.notifySplices('items', [
         *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1, obect: this.items, type: 'splice' },
         *       { index: 3, removed: [], addedCount: 1, object: this.items, type: 'splice'}
         *     ]);
         *
         * @param {string} path Path that should be notified.
         * @param {Array} splices Array of splice records indicating ordered
         *   changes that occurred to the array. Each record should have the
         *   following fields:
         *    * index: index at which the change occurred
         *    * removed: array of items that were removed from this index
         *    * addedCount: number of new items added at this index
         *    * object: a reference to the array in question
         *    * type: the string literal 'splice'
         *
         *   Note that splice records _must_ be normalized such that they are
         *   reported in index order (raw results from `Object.observe` are not
         *   ordered and must be normalized/merged before notifying).
         * @public
        */

      }, {
        key: 'notifySplices',
        value: function notifySplices(path, splices) {
          var info = { path: '' };
          var array = /** @type {Array} */Polymer.Path.get(this, path, info);
          _notifySplices(this, array, info.path, splices);
        }

        /**
         * Convenience method for reading a value from a path.
         *
         * Note, if any part in the path is undefined, this method returns
         * `undefined` (this method does not throw when dereferencing undefined
         * paths).
         *
         * @param {(string|!Array<(string|number)>)} path Path to the value
         *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
         *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
         *   bracketed expressions are not supported; string-based path parts
         *   *must* be separated by dots.  Note that when dereferencing array
         *   indices, the index may be used as a dotted part directly
         *   (e.g. `users.12.name` or `['users', 12, 'name']`).
         * @param {Object=} root Root object from which the path is evaluated.
         * @return {*} Value at the path, or `undefined` if any part of the path
         *   is undefined.
         * @public
         */

      }, {
        key: 'get',
        value: function get(path, root) {
          return Polymer.Path.get(root || this, path);
        }

        /**
         * Convenience method for setting a value to a path and notifying any
         * elements bound to the same path.
         *
         * Note, if any part in the path except for the last is undefined,
         * this method does nothing (this method does not throw when
         * dereferencing undefined paths).
         *
         * @param {(string|!Array<(string|number)>)} path Path to the value
         *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
         *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
         *   bracketed expressions are not supported; string-based path parts
         *   *must* be separated by dots.  Note that when dereferencing array
         *   indices, the index may be used as a dotted part directly
         *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
         * @param {*} value Value to set at the specified path.
         * @param {Object=} root Root object from which the path is evaluated.
         *   When specified, no notification will occur.
         * @public
        */

      }, {
        key: 'set',
        value: function set(path, value, root) {
          if (root) {
            Polymer.Path.set(root, path, value);
          } else {
            if (!this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][/** @type {string} */path]) {
              if (this._setPendingPropertyOrPath(path, value, true)) {
                this._invalidateProperties();
              }
            }
          }
        }

        /**
         * Adds items onto the end of the array at the path specified.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.push`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @param {string} path Path to array.
         * @param {...*} items Items to push onto array
         * @return {number} New length of the array.
         * @public
         */

      }, {
        key: 'push',
        value: function push(path) {
          var info = { path: '' };
          var array = /** @type {Array}*/Polymer.Path.get(this, path, info);
          var len = array.length;

          for (var _len = arguments.length, items = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            items[_key - 1] = arguments[_key];
          }

          var ret = array.push.apply(array, items);
          if (items.length) {
            notifySplice(this, array, info.path, len, items.length, []);
          }
          return ret;
        }

        /**
         * Removes an item from the end of array at the path specified.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.pop`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @param {string} path Path to array.
         * @return {*} Item that was removed.
         * @public
         */

      }, {
        key: 'pop',
        value: function pop(path) {
          var info = { path: '' };
          var array = /** @type {Array} */Polymer.Path.get(this, path, info);
          var hadLength = Boolean(array.length);
          var ret = array.pop();
          if (hadLength) {
            notifySplice(this, array, info.path, array.length, 0, [ret]);
          }
          return ret;
        }

        /**
         * Starting from the start index specified, removes 0 or more items
         * from the array and inserts 0 or more new items in their place.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.splice`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @param {string} path Path to array.
         * @param {number} start Index from which to start removing/inserting.
         * @param {number} deleteCount Number of items to remove.
         * @param {...*} items Items to insert into array.
         * @return {Array} Array of removed items.
         * @public
         */

      }, {
        key: 'splice',
        value: function splice(path, start, deleteCount) {
          var info = { path: '' };
          var array = /** @type {Array} */Polymer.Path.get(this, path, info);
          // Normalize fancy native splice handling of crazy start values
          if (start < 0) {
            start = array.length - Math.floor(-start);
          } else {
            start = Math.floor(start);
          }
          if (!start) {
            start = 0;
          }

          for (var _len2 = arguments.length, items = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
            items[_key2 - 3] = arguments[_key2];
          }

          var ret = array.splice.apply(array, [start, deleteCount].concat(items));
          if (items.length || ret.length) {
            notifySplice(this, array, info.path, start, items.length, ret);
          }
          return ret;
        }

        /**
         * Removes an item from the beginning of array at the path specified.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.pop`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @param {string} path Path to array.
         * @return {*} Item that was removed.
         * @public
         */

      }, {
        key: 'shift',
        value: function shift(path) {
          var info = { path: '' };
          var array = /** @type {Array} */Polymer.Path.get(this, path, info);
          var hadLength = Boolean(array.length);
          var ret = array.shift();
          if (hadLength) {
            notifySplice(this, array, info.path, 0, 0, [ret]);
          }
          return ret;
        }

        /**
         * Adds items onto the beginning of the array at the path specified.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.push`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @param {string} path Path to array.
         * @param {...*} items Items to insert info array
         * @return {number} New length of the array.
         * @public
         */

      }, {
        key: 'unshift',
        value: function unshift(path) {
          var info = { path: '' };
          var array = /** @type {Array} */Polymer.Path.get(this, path, info);

          for (var _len3 = arguments.length, items = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            items[_key3 - 1] = arguments[_key3];
          }

          var ret = array.unshift.apply(array, items);
          if (items.length) {
            notifySplice(this, array, info.path, 0, items.length, []);
          }
          return ret;
        }

        /**
         * Notify that a path has changed.
         *
         * Example:
         *
         *     this.item.user.name = 'Bob';
         *     this.notifyPath('item.user.name');
         *
         * @param {string} path Path that should be notified.
         * @param {*=} value Value at the path (optional).
         * @public
        */

      }, {
        key: 'notifyPath',
        value: function notifyPath(path, value) {
          /** @type {string} */
          var propPath = void 0;
          if (arguments.length == 1) {
            // Get value if not supplied
            var info = { path: '' };
            value = Polymer.Path.get(this, path, info);
            propPath = info.path;
          } else if (Array.isArray(path)) {
            // Normalize path if needed
            propPath = Polymer.Path.normalize(path);
          } else {
            propPath = /** @type{string} */path;
          }
          if (this._setPendingPropertyOrPath(propPath, value, true, true)) {
            this._invalidateProperties();
          }
        }

        /**
         * Equivalent to static `createReadOnlyProperty` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @param {string} property Property name
         * @param {boolean=} protectedSetter Creates a custom protected setter
         *   when `true`.
         * @protected
         */

      }, {
        key: '_createReadOnlyProperty',
        value: function _createReadOnlyProperty(property, protectedSetter) {
          this._addPropertyEffect(property, TYPES.READ_ONLY);
          if (protectedSetter) {
            this['_set' + upper(property)] = /** @this {PropertyEffects} */function (value) {
              this._setProperty(property, value);
            };
          }
        }

        /**
         * Equivalent to static `createPropertyObserver` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @param {string} property Property name
         * @param {string} methodName Name of observer method to call
         * @param {boolean=} dynamicFn Whether the method name should be included as
         *   a dependency to the effect.
         * @protected
         */

      }, {
        key: '_createPropertyObserver',
        value: function _createPropertyObserver(property, methodName, dynamicFn) {
          var info = { property: property, methodName: methodName, dynamicFn: Boolean(dynamicFn) };
          this._addPropertyEffect(property, TYPES.OBSERVE, {
            fn: runObserverEffect, info: info, trigger: { name: property }
          });
          if (dynamicFn) {
            this._addPropertyEffect(methodName, TYPES.OBSERVE, {
              fn: runObserverEffect, info: info, trigger: { name: methodName }
            });
          }
        }

        /**
         * Equivalent to static `createMethodObserver` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @param {string} expression Method expression
         * @param {boolean|Object=} dynamicFn Boolean or object map indicating
         *   whether method names should be included as a dependency to the effect.
         * @protected
         */

      }, {
        key: '_createMethodObserver',
        value: function _createMethodObserver(expression, dynamicFn) {
          var sig = parseMethod(expression);
          if (!sig) {
            throw new Error("Malformed observer expression '" + expression + "'");
          }
          createMethodEffect(this, sig, TYPES.OBSERVE, runMethodEffect, null, dynamicFn);
        }

        /**
         * Equivalent to static `createNotifyingProperty` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @param {string} property Property name
         * @protected
         */

      }, {
        key: '_createNotifyingProperty',
        value: function _createNotifyingProperty(property) {
          this._addPropertyEffect(property, TYPES.NOTIFY, {
            fn: runNotifyEffect,
            info: {
              eventName: CaseMap.camelToDashCase(property) + '-changed',
              property: property
            }
          });
        }

        /**
         * Equivalent to static `createReflectedProperty` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @param {string} property Property name
         * @protected
         */

      }, {
        key: '_createReflectedProperty',
        value: function _createReflectedProperty(property) {
          var attr = CaseMap.camelToDashCase(property);
          if (attr[0] === '-') {
            console.warn('Property ' + property + ' cannot be reflected to attribute ' + attr + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property thisead.');
          } else {
            this._addPropertyEffect(property, TYPES.REFLECT, {
              fn: runReflectEffect,
              info: {
                attrName: attr
              }
            });
          }
        }

        /**
         * Equivalent to static `createComputedProperty` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @param {string} property Name of computed property to set
         * @param {string} expression Method expression
         * @param {boolean|Object=} dynamicFn Boolean or object map indicating
         *   whether method names should be included as a dependency to the effect.
         * @protected
         */

      }, {
        key: '_createComputedProperty',
        value: function _createComputedProperty(property, expression, dynamicFn) {
          var sig = parseMethod(expression);
          if (!sig) {
            throw new Error("Malformed computed expression '" + expression + "'");
          }
          createMethodEffect(this, sig, TYPES.COMPUTE, runComputedEffect, property, dynamicFn);
        }

        // -- static class methods ------------

        /**
         * Ensures an accessor exists for the specified property, and adds
         * to a list of "property effects" that will run when the accessor for
         * the specified property is set.  Effects are grouped by "type", which
         * roughly corresponds to a phase in effect processing.  The effect
         * metadata should be in the following form:
         *
         *   {
         *     fn: effectFunction, // Reference to function to call to perform effect
         *     info: { ... }       // Effect metadata passed to function
         *     trigger: {          // Optional triggering metadata; if not provided
         *       name: string      // the property is treated as a wildcard
         *       structured: boolean
         *       wildcard: boolean
         *     }
         *   }
         *
         * Effects are called from `_propertiesChanged` in the following order by
         * type:
         *
         * 1. COMPUTE
         * 2. PROPAGATE
         * 3. REFLECT
         * 4. OBSERVE
         * 5. NOTIFY
         *
         * Effect functions are called with the following signature:
         *
         *   effectFunction(inst, path, props, oldProps, info, hasPaths)
         *
         * @param {string} property Property that should trigger the effect
         * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
         * @param {Object=} effect Effect metadata object
         * @protected
         */

      }, {
        key: '_bindTemplate',


        // -- binding ----------------------------------------------

        /**
         * Equivalent to static `bindTemplate` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * This method may be called on the prototype (for prototypical template
         * binding, to avoid creating accessors every instance) once per prototype,
         * and will be called with `runtimeBinding: true` by `_stampTemplate` to
         * create and link an instance of the template metadata associated with a
         * particular stamping.
         *
         * @param {HTMLTemplateElement} template Template containing binding
         *   bindings
         * @param {boolean=} instanceBinding When false (default), performs
         *   "prototypical" binding of the template and overwrites any previously
         *   bound template for the class. When true (as passed from
         *   `_stampTemplate`), the template info is instanced and linked into
         *   the list of bound templates.
         * @return {!TemplateInfo} Template metadata object; for `runtimeBinding`,
         *   this is an instance of the prototypical template info
         * @protected
         */
        value: function _bindTemplate(template, instanceBinding) {
          var templateInfo = this.constructor._parseTemplate(template);
          var wasPreBound = this.__templateInfo == templateInfo;
          // Optimization: since this is called twice for proto-bound templates,
          // don't attempt to recreate accessors if this template was pre-bound
          if (!wasPreBound) {
            for (var prop in templateInfo.propertyEffects) {
              this._createPropertyAccessor(prop);
            }
          }
          if (instanceBinding) {
            // For instance-time binding, create instance of template metadata
            // and link into list of templates if necessary
            templateInfo = /** @type {!TemplateInfo} */Object.create(templateInfo);
            templateInfo.wasPreBound = wasPreBound;
            if (!wasPreBound && this.__templateInfo) {
              var last = this.__templateInfoLast || this.__templateInfo;
              this.__templateInfoLast = last.nextTemplateInfo = templateInfo;
              templateInfo.previousTemplateInfo = last;
              return templateInfo;
            }
          }
          return this.__templateInfo = templateInfo;
        }

        /**
         * Adds a property effect to the given template metadata, which is run
         * at the "propagate" stage of `_propertiesChanged` when the template
         * has been bound to the element via `_bindTemplate`.
         *
         * The `effect` object should match the format in `_addPropertyEffect`.
         *
         * @param {Object} templateInfo Template metadata to add effect to
         * @param {string} prop Property that should trigger the effect
         * @param {Object=} effect Effect metadata object
         * @protected
         */

      }, {
        key: '_stampTemplate',


        /**
         * Stamps the provided template and performs instance-time setup for
         * Polymer template features, including data bindings, declarative event
         * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
         * is returned containing the stamped DOM, ready for insertion into the
         * DOM.
         *
         * This method may be called more than once; however note that due to
         * `shadycss` polyfill limitations, only styles from templates prepared
         * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
         * to the shadow root and support CSS custom properties), and note that
         * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
         * any styles required by in runtime-stamped templates must be included
         * in the main element template.
         *
         * @param {!HTMLTemplateElement} template Template to stamp
         * @return {!StampedTemplate} Cloned template content
         * @override
         * @protected
         */
        value: function _stampTemplate(template) {
          // Ensures that created dom is `_enqueueClient`'d to this element so
          // that it can be flushed on next call to `_flushProperties`
          hostStack.beginHosting(this);
          var dom = _get(PropertyEffects.prototype.__proto__ || Object.getPrototypeOf(PropertyEffects.prototype), '_stampTemplate', this).call(this, template);
          hostStack.endHosting(this);
          var templateInfo = /** @type {!TemplateInfo} */this._bindTemplate(template, true);
          // Add template-instance-specific data to instanced templateInfo
          templateInfo.nodeList = dom.nodeList;
          // Capture child nodes to allow unstamping of non-prototypical templates
          if (!templateInfo.wasPreBound) {
            var nodes = templateInfo.childNodes = [];
            for (var n = dom.firstChild; n; n = n.nextSibling) {
              nodes.push(n);
            }
          }
          dom.templateInfo = templateInfo;
          // Setup compound storage, 2-way listeners, and dataHost for bindings
          setupBindings(this, templateInfo);
          // Flush properties into template nodes if already booted
          if (this.__dataReady) {
            runEffects(this, templateInfo.propertyEffects, this.__data, null, false, templateInfo.nodeList);
          }
          return dom;
        }

        /**
         * Removes and unbinds the nodes previously contained in the provided
         * DocumentFragment returned from `_stampTemplate`.
         *
         * @param {!StampedTemplate} dom DocumentFragment previously returned
         *   from `_stampTemplate` associated with the nodes to be removed
         * @protected
         */

      }, {
        key: '_removeBoundDom',
        value: function _removeBoundDom(dom) {
          // Unlink template info
          var templateInfo = dom.templateInfo;
          if (templateInfo.previousTemplateInfo) {
            templateInfo.previousTemplateInfo.nextTemplateInfo = templateInfo.nextTemplateInfo;
          }
          if (templateInfo.nextTemplateInfo) {
            templateInfo.nextTemplateInfo.previousTemplateInfo = templateInfo.previousTemplateInfo;
          }
          if (this.__templateInfoLast == templateInfo) {
            this.__templateInfoLast = templateInfo.previousTemplateInfo;
          }
          templateInfo.previousTemplateInfo = templateInfo.nextTemplateInfo = null;
          // Remove stamped nodes
          var nodes = templateInfo.childNodes;
          for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            node.parentNode.removeChild(node);
          }
        }

        /**
         * Overrides default `TemplateStamp` implementation to add support for
         * parsing bindings from `TextNode`'s' `textContent`.  A `bindings`
         * array is added to `nodeInfo` and populated with binding metadata
         * with information capturing the binding target, and a `parts` array
         * with one or more metadata objects capturing the source(s) of the
         * binding.
         *
         * @override
         * @param {Node} node Node to parse
         * @param {TemplateInfo} templateInfo Template metadata for current template
         * @param {NodeInfo} nodeInfo Node metadata for current template node
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         * @protected
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         */

      }, {
        key: 'PROPERTY_EFFECT_TYPES',
        get: function get() {
          return TYPES;
        }
      }], [{
        key: 'addPropertyEffect',
        value: function addPropertyEffect(property, type, effect) {
          this.prototype._addPropertyEffect(property, type, effect);
        }

        /**
         * Creates a single-property observer for the given property.
         *
         * @param {string} property Property name
         * @param {string} methodName Name of observer method to call
         * @param {boolean=} dynamicFn Whether the method name should be included as
         *   a dependency to the effect.
         * @protected
         */

      }, {
        key: 'createPropertyObserver',
        value: function createPropertyObserver(property, methodName, dynamicFn) {
          this.prototype._createPropertyObserver(property, methodName, dynamicFn);
        }

        /**
         * Creates a multi-property "method observer" based on the provided
         * expression, which should be a string in the form of a normal Javascript
         * function signature: `'methodName(arg1, [..., argn])'`.  Each argument
         * should correspond to a property or path in the context of this
         * prototype (or instance), or may be a literal string or number.
         *
         * @param {string} expression Method expression
         * @param {boolean|Object=} dynamicFn Boolean or object map indicating
         *   whether method names should be included as a dependency to the effect.
         * @protected
         */

      }, {
        key: 'createMethodObserver',
        value: function createMethodObserver(expression, dynamicFn) {
          this.prototype._createMethodObserver(expression, dynamicFn);
        }

        /**
         * Causes the setter for the given property to dispatch `<property>-changed`
         * events to notify of changes to the property.
         *
         * @param {string} property Property name
         * @protected
         */

      }, {
        key: 'createNotifyingProperty',
        value: function createNotifyingProperty(property) {
          this.prototype._createNotifyingProperty(property);
        }

        /**
         * Creates a read-only accessor for the given property.
         *
         * To set the property, use the protected `_setProperty` API.
         * To create a custom protected setter (e.g. `_setMyProp()` for
         * property `myProp`), pass `true` for `protectedSetter`.
         *
         * Note, if the property will have other property effects, this method
         * should be called first, before adding other effects.
         *
         * @param {string} property Property name
         * @param {boolean=} protectedSetter Creates a custom protected setter
         *   when `true`.
         * @protected
         */

      }, {
        key: 'createReadOnlyProperty',
        value: function createReadOnlyProperty(property, protectedSetter) {
          this.prototype._createReadOnlyProperty(property, protectedSetter);
        }

        /**
         * Causes the setter for the given property to reflect the property value
         * to a (dash-cased) attribute of the same name.
         *
         * @param {string} property Property name
         * @protected
         */

      }, {
        key: 'createReflectedProperty',
        value: function createReflectedProperty(property) {
          this.prototype._createReflectedProperty(property);
        }

        /**
         * Creates a computed property whose value is set to the result of the
         * method described by the given `expression` each time one or more
         * arguments to the method changes.  The expression should be a string
         * in the form of a normal Javascript function signature:
         * `'methodName(arg1, [..., argn])'`
         *
         * @param {string} property Name of computed property to set
         * @param {string} expression Method expression
         * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
         *   method names should be included as a dependency to the effect.
         * @protected
         */

      }, {
        key: 'createComputedProperty',
        value: function createComputedProperty(property, expression, dynamicFn) {
          this.prototype._createComputedProperty(property, expression, dynamicFn);
        }

        /**
         * Parses the provided template to ensure binding effects are created
         * for them, and then ensures property accessors are created for any
         * dependent properties in the template.  Binding effects for bound
         * templates are stored in a linked list on the instance so that
         * templates can be efficiently stamped and unstamped.
         *
         * @param {HTMLTemplateElement} template Template containing binding
         *   bindings
         * @return {Object} Template metadata object
         * @protected
         */

      }, {
        key: 'bindTemplate',
        value: function bindTemplate(template) {
          return this.prototype._bindTemplate(template);
        }
      }, {
        key: '_addTemplatePropertyEffect',
        value: function _addTemplatePropertyEffect(templateInfo, prop, effect) {
          var hostProps = templateInfo.hostProps = templateInfo.hostProps || {};
          hostProps[prop] = true;
          var effects = templateInfo.propertyEffects = templateInfo.propertyEffects || {};
          var propEffects = effects[prop] = effects[prop] || [];
          propEffects.push(effect);
        }
      }, {
        key: '_parseTemplateNode',
        value: function _parseTemplateNode(node, templateInfo, nodeInfo) {
          var noted = _get(PropertyEffects.__proto__ || Object.getPrototypeOf(PropertyEffects), '_parseTemplateNode', this).call(this, node, templateInfo, nodeInfo);
          if (node.nodeType === Node.TEXT_NODE) {
            var parts = this._parseBindings(node.textContent, templateInfo);
            if (parts) {
              // Initialize the textContent with any literal parts
              // NOTE: default to a space here so the textNode remains; some browsers
              // (IE) evacipate an empty textNode following cloneNode/importNode.
              node.textContent = literalFromParts(parts) || ' ';
              addBinding(this, templateInfo, nodeInfo, 'text', 'textContent', parts);
              noted = true;
            }
          }
          return noted;
        }

        /**
         * Overrides default `TemplateStamp` implementation to add support for
         * parsing bindings from attributes.  A `bindings`
         * array is added to `nodeInfo` and populated with binding metadata
         * with information capturing the binding target, and a `parts` array
         * with one or more metadata objects capturing the source(s) of the
         * binding.
         *
         * @override
         * @param {Element} node Node to parse
         * @param {TemplateInfo} templateInfo Template metadata for current template
         * @param {NodeInfo} nodeInfo Node metadata for current template node
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         * @protected
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         */

      }, {
        key: '_parseTemplateNodeAttribute',
        value: function _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
          var parts = this._parseBindings(value, templateInfo);
          if (parts) {
            // Attribute or property
            var origName = name;
            var kind = 'property';
            if (name[name.length - 1] == '$') {
              name = name.slice(0, -1);
              kind = 'attribute';
            }
            // Initialize attribute bindings with any literal parts
            var literal = literalFromParts(parts);
            if (literal && kind == 'attribute') {
              node.setAttribute(name, literal);
            }
            // Clear attribute before removing, since IE won't allow removing
            // `value` attribute if it previously had a value (can't
            // unconditionally set '' before removing since attributes with `$`
            // can't be set using setAttribute)
            if (node.localName === 'input' && origName === 'value') {
              node.setAttribute(origName, '');
            }
            // Remove annotation
            node.removeAttribute(origName);
            // Case hackery: attributes are lower-case, but bind targets
            // (properties) are case sensitive. Gambit is to map dash-case to
            // camel-case: `foo-bar` becomes `fooBar`.
            // Attribute bindings are excepted.
            if (kind === 'property') {
              name = Polymer.CaseMap.dashToCamelCase(name);
            }
            addBinding(this, templateInfo, nodeInfo, kind, name, parts, literal);
            return true;
          } else {
            return _get(PropertyEffects.__proto__ || Object.getPrototypeOf(PropertyEffects), '_parseTemplateNodeAttribute', this).call(this, node, templateInfo, nodeInfo, name, value);
          }
        }

        /**
         * Overrides default `TemplateStamp` implementation to add support for
         * binding the properties that a nested template depends on to the template
         * as `_host_<property>`.
         *
         * @override
         * @param {Node} node Node to parse
         * @param {TemplateInfo} templateInfo Template metadata for current template
         * @param {NodeInfo} nodeInfo Node metadata for current template node
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         * @protected
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         */

      }, {
        key: '_parseTemplateNestedTemplate',
        value: function _parseTemplateNestedTemplate(node, templateInfo, nodeInfo) {
          var noted = _get(PropertyEffects.__proto__ || Object.getPrototypeOf(PropertyEffects), '_parseTemplateNestedTemplate', this).call(this, node, templateInfo, nodeInfo);
          // Merge host props into outer template and add bindings
          var hostProps = nodeInfo.templateInfo.hostProps;
          var mode = '{';
          for (var source in hostProps) {
            var parts = [{ mode: mode, source: source, dependencies: [source] }];
            addBinding(this, templateInfo, nodeInfo, 'property', '_host_' + source, parts);
          }
          return noted;
        }

        /**
         * Called to parse text in a template (either attribute values or
         * textContent) into binding metadata.
         *
         * Any overrides of this method should return an array of binding part
         * metadata  representing one or more bindings found in the provided text
         * and any "literal" text in between.  Any non-literal parts will be passed
         * to `_evaluateBinding` when any dependencies change.  The only required
         * fields of each "part" in the returned array are as follows:
         *
         * - `dependencies` - Array containing trigger metadata for each property
         *   that should trigger the binding to update
         * - `literal` - String containing text if the part represents a literal;
         *   in this case no `dependencies` are needed
         *
         * Additional metadata for use by `_evaluateBinding` may be provided in
         * each part object as needed.
         *
         * The default implementation handles the following types of bindings
         * (one or more may be intermixed with literal strings):
         * - Property binding: `[[prop]]`
         * - Path binding: `[[object.prop]]`
         * - Negated property or path bindings: `[[!prop]]` or `[[!object.prop]]`
         * - Two-way property or path bindings (supports negation):
         *   `{{prop}}`, `{{object.prop}}`, `{{!prop}}` or `{{!object.prop}}`
         * - Inline computed method (supports negation):
         *   `[[compute(a, 'literal', b)]]`, `[[!compute(a, 'literal', b)]]`
         *
         * @param {string} text Text to parse from attribute or textContent
         * @param {Object} templateInfo Current template metadata
         * @return {Array<!BindingPart>} Array of binding part metadata
         * @protected
         */

      }, {
        key: '_parseBindings',
        value: function _parseBindings(text, templateInfo) {
          var parts = [];
          var lastIndex = 0;
          var m = void 0;
          // Example: "literal1{{prop}}literal2[[!compute(foo,bar)]]final"
          // Regex matches:
          //        Iteration 1:  Iteration 2:
          // m[1]: '{{'          '[['
          // m[2]: ''            '!'
          // m[3]: 'prop'        'compute(foo,bar)'
          while ((m = bindingRegex.exec(text)) !== null) {
            // Add literal part
            if (m.index > lastIndex) {
              parts.push({ literal: text.slice(lastIndex, m.index) });
            }
            // Add binding part
            var mode = m[1][0];
            var negate = Boolean(m[2]);
            var source = m[3].trim();
            var customEvent = false,
                notifyEvent = '',
                colon = -1;
            if (mode == '{' && (colon = source.indexOf('::')) > 0) {
              notifyEvent = source.substring(colon + 2);
              source = source.substring(0, colon);
              customEvent = true;
            }
            var signature = parseMethod(source);
            var dependencies = [];
            if (signature) {
              // Inline computed function
              var args = signature.args,
                  methodName = signature.methodName;

              for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                if (!arg.literal) {
                  dependencies.push(arg);
                }
              }
              var dynamicFns = templateInfo.dynamicFns;
              if (dynamicFns && dynamicFns[methodName] || signature.static) {
                dependencies.push(methodName);
                signature.dynamicFn = true;
              }
            } else {
              // Property or path
              dependencies.push(source);
            }
            parts.push({
              source: source, mode: mode, negate: negate, customEvent: customEvent, signature: signature, dependencies: dependencies,
              event: notifyEvent
            });
            lastIndex = bindingRegex.lastIndex;
          }
          // Add a final literal part
          if (lastIndex && lastIndex < text.length) {
            var literal = text.substring(lastIndex);
            if (literal) {
              parts.push({
                literal: literal
              });
            }
          }
          if (parts.length) {
            return parts;
          } else {
            return null;
          }
        }

        /**
         * Called to evaluate a previously parsed binding part based on a set of
         * one or more changed dependencies.
         *
         * @param {this} inst Element that should be used as scope for
         *   binding dependencies
         * @param {BindingPart} part Binding part metadata
         * @param {string} path Property/path that triggered this effect
         * @param {Object} props Bag of current property changes
         * @param {Object} oldProps Bag of previous values for changed properties
         * @param {boolean} hasPaths True with `props` contains one or more paths
         * @return {*} Value the binding part evaluated to
         * @protected
         */

      }, {
        key: '_evaluateBinding',
        value: function _evaluateBinding(inst, part, path, props, oldProps, hasPaths) {
          var value = void 0;
          if (part.signature) {
            value = runMethodEffect(inst, path, props, oldProps, part.signature);
          } else if (path != part.source) {
            value = Polymer.Path.get(inst, part.source);
          } else {
            if (hasPaths && Polymer.Path.isPath(path)) {
              value = Polymer.Path.get(inst, path);
            } else {
              value = inst.__data[path];
            }
          }
          if (part.negate) {
            value = !value;
          }
          return value;
        }
      }]);

      return PropertyEffects;
    }(propertyEffectsBase);

    // make a typing for closure :P


    PropertyEffectsType = PropertyEffects;

    return PropertyEffects;
  });

  /**
   * Helper api for enqueing client dom created by a host element.
   *
   * By default elements are flushed via `_flushProperties` when
   * `connectedCallback` is called. Elements attach their client dom to
   * themselves at `ready` time which results from this first flush.
   * This provides an ordering guarantee that the client dom an element
   * creates is flushed before the element itself (i.e. client `ready`
   * fires before host `ready`).
   *
   * However, if `_flushProperties` is called *before* an element is connected,
   * as for example `Templatize` does, this ordering guarantee cannot be
   * satisfied because no elements are connected. (Note: Bound elements that
   * receive data do become enqueued clients and are properly ordered but
   * unbound elements are not.)
   *
   * To maintain the desired "client before host" ordering guarantee for this
   * case we rely on the "host stack. Client nodes registers themselves with
   * the creating host element when created. This ensures that all client dom
   * is readied in the proper order, maintaining the desired guarantee.
   *
   * @private
   */
  var hostStack = {

    stack: [],

    /**
     * @param {*} inst Instance to add to hostStack
     * @this {hostStack}
     */
    registerHost: function registerHost(inst) {
      if (this.stack.length) {
        var host = this.stack[this.stack.length - 1];
        host._enqueueClient(inst);
      }
    },


    /**
     * @param {*} inst Instance to begin hosting
     * @this {hostStack}
     */
    beginHosting: function beginHosting(inst) {
      this.stack.push(inst);
    },


    /**
     * @param {*} inst Instance to end hosting
     * @this {hostStack}
     */
    endHosting: function endHosting(inst) {
      var stackLen = this.stack.length;
      if (stackLen && this.stack[stackLen - 1] == inst) {
        this.stack.pop();
      }
    }
  };
})();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

(function () {
  'use strict';

  /**
   * Module with utilities for manipulating structured data path strings.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module with utilities for manipulating structured data path strings.
   */

  var Path = {

    /**
     * Returns true if the given string is a structured data path (has dots).
     *
     * Example:
     *
     * ```
     * Polymer.Path.isPath('foo.bar.baz') // true
     * Polymer.Path.isPath('foo')         // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} path Path string
     * @return {boolean} True if the string contained one or more dots
     */
    isPath: function isPath(path) {
      return path.indexOf('.') >= 0;
    },

    /**
     * Returns the root property name for the given path.
     *
     * Example:
     *
     * ```
     * Polymer.Path.root('foo.bar.baz') // 'foo'
     * Polymer.Path.root('foo')         // 'foo'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} path Path string
     * @return {string} Root property name
     */
    root: function root(path) {
      var dotIndex = path.indexOf('.');
      if (dotIndex === -1) {
        return path;
      }
      return path.slice(0, dotIndex);
    },

    /**
     * Given `base` is `foo.bar`, `foo` is an ancestor, `foo.bar` is not
     * Returns true if the given path is an ancestor of the base path.
     *
     * Example:
     *
     * ```
     * Polymer.Path.isAncestor('foo.bar', 'foo')         // true
     * Polymer.Path.isAncestor('foo.bar', 'foo.bar')     // false
     * Polymer.Path.isAncestor('foo.bar', 'foo.bar.baz') // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Path string to test against.
     * @param {string} path Path string to test.
     * @return {boolean} True if `path` is an ancestor of `base`.
     */
    isAncestor: function isAncestor(base, path) {
      //     base.startsWith(path + '.');
      return base.indexOf(path + '.') === 0;
    },

    /**
     * Given `base` is `foo.bar`, `foo.bar.baz` is an descendant
     *
     * Example:
     *
     * ```
     * Polymer.Path.isDescendant('foo.bar', 'foo.bar.baz') // true
     * Polymer.Path.isDescendant('foo.bar', 'foo.bar')     // false
     * Polymer.Path.isDescendant('foo.bar', 'foo')         // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Path string to test against.
     * @param {string} path Path string to test.
     * @return {boolean} True if `path` is a descendant of `base`.
     */
    isDescendant: function isDescendant(base, path) {
      //     path.startsWith(base + '.');
      return path.indexOf(base + '.') === 0;
    },

    /**
     * Replaces a previous base path with a new base path, preserving the
     * remainder of the path.
     *
     * User must ensure `path` has a prefix of `base`.
     *
     * Example:
     *
     * ```
     * Polymer.Path.translate('foo.bar', 'zot' 'foo.bar.baz') // 'zot.baz'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Current base string to remove
     * @param {string} newBase New base string to replace with
     * @param {string} path Path to translate
     * @return {string} Translated string
     */
    translate: function translate(base, newBase, path) {
      return newBase + path.slice(base.length);
    },

    /**
     * @param {string} base Path string to test against
     * @param {string} path Path string to test
     * @return {boolean} True if `path` is equal to `base`
     * @this {Path}
     */
    matches: function matches(base, path) {
      return base === path || this.isAncestor(base, path) || this.isDescendant(base, path);
    },

    /**
     * Converts array-based paths to flattened path.  String-based paths
     * are returned as-is.
     *
     * Example:
     *
     * ```
     * Polymer.Path.normalize(['foo.bar', 0, 'baz'])  // 'foo.bar.0.baz'
     * Polymer.Path.normalize('foo.bar.0.baz')        // 'foo.bar.0.baz'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string | !Array<string|number>} path Input path
     * @return {string} Flattened path
     */
    normalize: function normalize(path) {
      if (Array.isArray(path)) {
        var parts = [];
        for (var i = 0; i < path.length; i++) {
          var args = path[i].toString().split('.');
          for (var j = 0; j < args.length; j++) {
            parts.push(args[j]);
          }
        }
        return parts.join('.');
      } else {
        return path;
      }
    },

    /**
     * Splits a path into an array of property names. Accepts either arrays
     * of path parts or strings.
     *
     * Example:
     *
     * ```
     * Polymer.Path.split(['foo.bar', 0, 'baz'])  // ['foo', 'bar', '0', 'baz']
     * Polymer.Path.split('foo.bar.0.baz')        // ['foo', 'bar', '0', 'baz']
     * ```
     *
     * @memberof Polymer.Path
     * @param {string | !Array<string|number>} path Input path
     * @return {!Array<string>} Array of path parts
     * @this {Path}
     * @suppress {checkTypes}
     */
    split: function split(path) {
      if (Array.isArray(path)) {
        return this.normalize(path).split('.');
      }
      return path.toString().split('.');
    },

    /**
     * Reads a value from a path.  If any sub-property in the path is `undefined`,
     * this method returns `undefined` (will never throw.
     *
     * @memberof Polymer.Path
     * @param {Object} root Object from which to dereference path from
     * @param {string | !Array<string|number>} path Path to read
     * @param {Object=} info If an object is provided to `info`, the normalized
     *  (flattened) path will be set to `info.path`.
     * @return {*} Value at path, or `undefined` if the path could not be
     *  fully dereferenced.
     * @this {Path}
     */
    get: function get(root, path, info) {
      var prop = root;
      var parts = this.split(path);
      // Loop over path parts[0..n-1] and dereference
      for (var i = 0; i < parts.length; i++) {
        if (!prop) {
          return;
        }
        var part = parts[i];
        prop = prop[part];
      }
      if (info) {
        info.path = parts.join('.');
      }
      return prop;
    },

    /**
     * Sets a value to a path.  If any sub-property in the path is `undefined`,
     * this method will no-op.
     *
     * @memberof Polymer.Path
     * @param {Object} root Object from which to dereference path from
     * @param {string | !Array<string|number>} path Path to set
     * @param {*} value Value to set to path
     * @return {string | undefined} The normalized version of the input path
     * @this {Path}
     */
    set: function set(root, path, value) {
      var prop = root;
      var parts = this.split(path);
      var last = parts[parts.length - 1];
      if (parts.length > 1) {
        // Loop over path parts[0..n-2] and dereference
        for (var i = 0; i < parts.length - 1; i++) {
          var part = parts[i];
          prop = prop[part];
          if (!prop) {
            return;
          }
        }
        // Set value to object at end of path
        prop[last] = value;
      } else {
        // Simple property set
        prop[path] = value;
      }
      return parts.join('.');
    }

  };

  /**
   * Returns true if the given string is a structured data path (has dots).
   *
   * This function is deprecated.  Use `Polymer.Path.isPath` instead.
   *
   * Example:
   *
   * ```
   * Polymer.Path.isDeep('foo.bar.baz') // true
   * Polymer.Path.isDeep('foo')         // false
   * ```
   *
   * @deprecated
   * @memberof Polymer.Path
   * @param {string} path Path string
   * @return {boolean} True if the string contained one or more dots
   */
  Path.isDeep = Path.isPath;

  Polymer.Path = Path;
})();

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(3);

__webpack_require__(6);

__webpack_require__(8);

__webpack_require__(23);

(function () {

  'use strict';

  var caseMap = Polymer.CaseMap;

  var microtask = Polymer.Async.microTask;

  // Save map of native properties; this forms a blacklist or properties
  // that won't have their values "saved" by `saveAccessorValue`, since
  // reading from an HTMLElement accessor from the context of a prototype throws
  var nativeProperties = {};
  var proto = HTMLElement.prototype;
  while (proto) {
    var props = Object.getOwnPropertyNames(proto);
    for (var i = 0; i < props.length; i++) {
      nativeProperties[props[i]] = true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  /**
   * Used to save the value of a property that will be overridden with
   * an accessor. If the `model` is a prototype, the values will be saved
   * in `__dataProto`, and it's up to the user (or downstream mixin) to
   * decide how/when to set these values back into the accessors.
   * If `model` is already an instance (it has a `__data` property), then
   * the value will be set as a pending property, meaning the user should
   * call `_invalidateProperties` or `_flushProperties` to take effect
   *
   * @param {Object} model Prototype or instance
   * @param {string} property Name of property
   * @private
   */
  function saveAccessorValue(model, property) {
    // Don't read/store value for any native properties since they could throw
    if (!nativeProperties[property]) {
      var value = model[property];
      if (value !== undefined) {
        if (model.__data) {
          // Adding accessor to instance; update the property
          // It is the user's responsibility to call _flushProperties
          model._setPendingProperty(property, value);
        } else {
          // Adding accessor to proto; save proto's value for instance-time use
          if (!model.__dataProto) {
            model.__dataProto = {};
          } else if (!model.hasOwnProperty(JSCompiler_renameProperty('__dataProto', model))) {
            model.__dataProto = Object.create(model.__dataProto);
          }
          model.__dataProto[property] = value;
        }
      }
    }
  }

  /**
   * Element class mixin that provides basic meta-programming for creating one
   * or more property accessors (getter/setter pair) that enqueue an async
   * (batched) `_propertiesChanged` callback.
   *
   * For basic usage of this mixin, simply declare attributes to observe via
   * the standard `static get observedAttributes()`, implement `_propertiesChanged`
   * on the class, and then call `MyClass.createPropertiesForAttributes()` once
   * on the class to generate property accessors for each observed attribute
   * prior to instancing.  Last, call `this._flushProperties()` once to enable
   * the accessors.
   *
   * Any `observedAttributes` will automatically be
   * deserialized via `attributeChangedCallback` and set to the associated
   * property using `dash-case`-to-`camelCase` convention.
   *
   * @mixinFunction
   * @polymer
   * @memberof Polymer
   * @summary Element class mixin for reacting to property changes from
   *   generated property accessors.
   */
  Polymer.PropertyAccessors = Polymer.dedupingMixin(function (superClass) {

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_PropertyAccessors}
     * @extends HTMLElement
     * @unrestricted
     */
    var PropertyAccessors = function (_superClass) {
      _inherits(PropertyAccessors, _superClass);

      _createClass(PropertyAccessors, null, [{
        key: 'createPropertiesForAttributes',


        /**
         * Generates property accessors for all attributes in the standard
         * static `observedAttributes` array.
         *
         * Attribute names are mapped to property names using the `dash-case` to
         * `camelCase` convention
         *
         */
        value: function createPropertiesForAttributes() {
          var a$ = this.observedAttributes;
          for (var _i = 0; _i < a$.length; _i++) {
            this.prototype._createPropertyAccessor(caseMap.dashToCamelCase(a$[_i]));
          }
        }
      }]);

      function PropertyAccessors() {
        _classCallCheck(this, PropertyAccessors);

        /** @type {boolean} */
        var _this = _possibleConstructorReturn(this, (PropertyAccessors.__proto__ || Object.getPrototypeOf(PropertyAccessors)).call(this));

        _this.__serializing;
        /** @type {number} */
        _this.__dataCounter;
        /** @type {boolean} */
        _this.__dataEnabled;
        /** @type {boolean} */
        _this.__dataReady;
        /** @type {boolean} */
        _this.__dataInvalid;
        /** @type {!Object} */
        _this.__data;
        /** @type {Object} */
        _this.__dataPending;
        /** @type {Object} */
        _this.__dataOld;
        /** @type {Object} */
        _this.__dataProto;
        /** @type {Object} */
        _this.__dataHasAccessor;
        /** @type {Object} */
        _this.__dataInstanceProps;
        _this._initializeProperties();
        return _this;
      }

      /**
       * Implements native Custom Elements `attributeChangedCallback` to
       * set an attribute value to a property via `_attributeToProperty`.
       *
       * @param {string} name Name of attribute that changed
       * @param {?string} old Old attribute value
       * @param {?string} value New attribute value
       */


      _createClass(PropertyAccessors, [{
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, old, value) {
          if (old !== value) {
            this._attributeToProperty(name, value);
          }
        }

        /**
         * Initializes the local storage for property accessors.
         *
         * Provided as an override point for performing any setup work prior
         * to initializing the property accessor system.
         *
         * @protected
         */

      }, {
        key: '_initializeProperties',
        value: function _initializeProperties() {
          this.__serializing = false;
          this.__dataCounter = 0;
          this.__dataEnabled = false;
          this.__dataReady = false;
          this.__dataInvalid = false;
          this.__data = {};
          this.__dataPending = null;
          this.__dataOld = null;
          if (this.__dataProto) {
            this._initializeProtoProperties(this.__dataProto);
            this.__dataProto = null;
          }
          // Capture instance properties; these will be set into accessors
          // during first flush. Don't set them here, since we want
          // these to overwrite defaults/constructor assignments
          for (var p in this.__dataHasAccessor) {
            if (this.hasOwnProperty(p)) {
              this.__dataInstanceProps = this.__dataInstanceProps || {};
              this.__dataInstanceProps[p] = this[p];
              delete this[p];
            }
          }
        }

        /**
         * Called at instance time with bag of properties that were overwritten
         * by accessors on the prototype when accessors were created.
         *
         * The default implementation sets these properties back into the
         * setter at instance time.  This method is provided as an override
         * point for customizing or providing more efficient initialization.
         *
         * @param {Object} props Bag of property values that were overwritten
         *   when creating property accessors.
         * @protected
         */

      }, {
        key: '_initializeProtoProperties',
        value: function _initializeProtoProperties(props) {
          for (var p in props) {
            this._setProperty(p, props[p]);
          }
        }

        /**
         * Called at ready time with bag of instance properties that overwrote
         * accessors when the element upgraded.
         *
         * The default implementation sets these properties back into the
         * setter at ready time.  This method is provided as an override
         * point for customizing or providing more efficient initialization.
         *
         * @param {Object} props Bag of property values that were overwritten
         *   when creating property accessors.
         * @protected
         */

      }, {
        key: '_initializeInstanceProperties',
        value: function _initializeInstanceProperties(props) {
          Object.assign(this, props);
        }

        /**
         * Ensures the element has the given attribute. If it does not,
         * assigns the given value to the attribute.
         *
         *
         * @param {string} attribute Name of attribute to ensure is set.
         * @param {string} value of the attribute.
         */

      }, {
        key: '_ensureAttribute',
        value: function _ensureAttribute(attribute, value) {
          if (!this.hasAttribute(attribute)) {
            this._valueToNodeAttribute(this, value, attribute);
          }
        }

        /**
         * Deserializes an attribute to its associated property.
         *
         * This method calls the `_deserializeValue` method to convert the string to
         * a typed value.
         *
         * @param {string} attribute Name of attribute to deserialize.
         * @param {?string} value of the attribute.
         * @param {*=} type type to deserialize to.
         */

      }, {
        key: '_attributeToProperty',
        value: function _attributeToProperty(attribute, value, type) {
          // Don't deserialize back to property if currently reflecting
          if (!this.__serializing) {
            var property = caseMap.dashToCamelCase(attribute);
            this[property] = this._deserializeValue(value, type);
          }
        }

        /**
         * Serializes a property to its associated attribute.
         *
         * @param {string} property Property name to reflect.
         * @param {string=} attribute Attribute name to reflect.
         * @param {*=} value Property value to refect.
         */

      }, {
        key: '_propertyToAttribute',
        value: function _propertyToAttribute(property, attribute, value) {
          this.__serializing = true;
          value = arguments.length < 3 ? this[property] : value;
          this._valueToNodeAttribute(this, value, attribute || caseMap.camelToDashCase(property));
          this.__serializing = false;
        }

        /**
         * Sets a typed value to an HTML attribute on a node.
         *
         * This method calls the `_serializeValue` method to convert the typed
         * value to a string.  If the `_serializeValue` method returns `undefined`,
         * the attribute will be removed (this is the default for boolean
         * type `false`).
         *
         * @param {Element} node Element to set attribute to.
         * @param {*} value Value to serialize.
         * @param {string} attribute Attribute name to serialize to.
         */

      }, {
        key: '_valueToNodeAttribute',
        value: function _valueToNodeAttribute(node, value, attribute) {
          var str = this._serializeValue(value);
          if (str === undefined) {
            node.removeAttribute(attribute);
          } else {
            node.setAttribute(attribute, str);
          }
        }

        /**
         * Converts a typed JavaScript value to a string.
         *
         * This method is called by Polymer when setting JS property values to
         * HTML attributes.  Users may override this method on Polymer element
         * prototypes to provide serialization for custom types.
         *
         * @param {*} value Property value to serialize.
         * @return {string | undefined} String serialized from the provided property value.
         */

      }, {
        key: '_serializeValue',
        value: function _serializeValue(value) {
          /* eslint-disable no-fallthrough */
          switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
            case 'boolean':
              return value ? '' : undefined;

            case 'object':
              if (value instanceof Date) {
                return value.toString();
              } else if (value) {
                try {
                  return JSON.stringify(value);
                } catch (x) {
                  return '';
                }
              }

            default:
              return value != null ? value.toString() : undefined;
          }
        }

        /**
         * Converts a string to a typed JavaScript value.
         *
         * This method is called by Polymer when reading HTML attribute values to
         * JS properties.  Users may override this method on Polymer element
         * prototypes to provide deserialization for custom `type`s.  Note,
         * the `type` argument is the value of the `type` field provided in the
         * `properties` configuration object for a given property, and is
         * by convention the constructor for the type to deserialize.
         *
         * Note: The return value of `undefined` is used as a sentinel value to
         * indicate the attribute should be removed.
         *
         * @param {?string} value Attribute value to deserialize.
         * @param {*=} type Type to deserialize the string to.
         * @return {*} Typed value deserialized from the provided string.
         */

      }, {
        key: '_deserializeValue',
        value: function _deserializeValue(value, type) {
          /**
           * @type {*}
           */
          var outValue = void 0;
          switch (type) {
            case Number:
              outValue = Number(value);
              break;

            case Boolean:
              outValue = value !== null;
              break;

            case Object:
              try {
                outValue = JSON.parse( /** @type string */value);
              } catch (x) {
                // allow non-JSON literals like Strings and Numbers
              }
              break;

            case Array:
              try {
                outValue = JSON.parse( /** @type string */value);
              } catch (x) {
                outValue = null;
                console.warn('Polymer::Attributes: couldn\'t decode Array as JSON: ' + value);
              }
              break;

            case Date:
              outValue = new Date(value);
              break;

            case String:
            default:
              outValue = value;
              break;
          }

          return outValue;
        }
        /* eslint-enable no-fallthrough */

        /**
         * Creates a setter/getter pair for the named property with its own
         * local storage.  The getter returns the value in the local storage,
         * and the setter calls `_setProperty`, which updates the local storage
         * for the property and enqueues a `_propertiesChanged` callback.
         *
         * This method may be called on a prototype or an instance.  Calling
         * this method may overwrite a property value that already exists on
         * the prototype/instance by creating the accessor.  When calling on
         * a prototype, any overwritten values are saved in `__dataProto`,
         * and it is up to the subclasser to decide how/when to set those
         * properties back into the accessor.  When calling on an instance,
         * the overwritten value is set via `_setPendingProperty`, and the
         * user should call `_invalidateProperties` or `_flushProperties`
         * for the values to take effect.
         *
         * @param {string} property Name of the property
         * @param {boolean=} readOnly When true, no setter is created; the
         *   protected `_setProperty` function must be used to set the property
         * @protected
         */

      }, {
        key: '_createPropertyAccessor',
        value: function _createPropertyAccessor(property, readOnly) {
          if (!this.hasOwnProperty('__dataHasAccessor')) {
            this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor);
          }
          if (!this.__dataHasAccessor[property]) {
            this.__dataHasAccessor[property] = true;
            saveAccessorValue(this, property);
            Object.defineProperty(this, property, {
              /* eslint-disable valid-jsdoc */
              /** @this {PropertyAccessors} */
              get: function get() {
                return this.__data[property];
              },
              /** @this {PropertyAccessors} */
              set: readOnly ? function () {} : function (value) {
                this._setProperty(property, value);
              }
              /* eslint-enable */
            });
          }
        }

        /**
         * Returns true if this library created an accessor for the given property.
         *
         * @param {string} property Property name
         * @return {boolean} True if an accessor was created
         */

      }, {
        key: '_hasAccessor',
        value: function _hasAccessor(property) {
          return this.__dataHasAccessor && this.__dataHasAccessor[property];
        }

        /**
         * Updates the local storage for a property (via `_setPendingProperty`)
         * and enqueues a `_proeprtiesChanged` callback.
         *
         * @param {string} property Name of the property
         * @param {*} value Value to set
         * @protected
         */

      }, {
        key: '_setProperty',
        value: function _setProperty(property, value) {
          if (this._setPendingProperty(property, value)) {
            this._invalidateProperties();
          }
        }

        /**
         * Updates the local storage for a property, records the previous value,
         * and adds it to the set of "pending changes" that will be passed to the
         * `_propertiesChanged` callback.  This method does not enqueue the
         * `_propertiesChanged` callback.
         *
         * @param {string} property Name of the property
         * @param {*} value Value to set
         * @return {boolean} Returns true if the property changed
         * @protected
         */

      }, {
        key: '_setPendingProperty',
        value: function _setPendingProperty(property, value) {
          var old = this.__data[property];
          var changed = this._shouldPropertyChange(property, value, old);
          if (changed) {
            if (!this.__dataPending) {
              this.__dataPending = {};
              this.__dataOld = {};
            }
            // Ensure old is captured from the last turn
            if (this.__dataOld && !(property in this.__dataOld)) {
              this.__dataOld[property] = old;
            }
            this.__data[property] = value;
            this.__dataPending[property] = value;
          }
          return changed;
        }

        /**
         * Returns true if the specified property has a pending change.
         *
         * @param {string} prop Property name
         * @return {boolean} True if property has a pending change
         * @protected
         */

      }, {
        key: '_isPropertyPending',
        value: function _isPropertyPending(prop) {
          return Boolean(this.__dataPending && prop in this.__dataPending);
        }

        /**
         * Marks the properties as invalid, and enqueues an async
         * `_propertiesChanged` callback.
         *
         * @protected
         */

      }, {
        key: '_invalidateProperties',
        value: function _invalidateProperties() {
          var _this2 = this;

          if (!this.__dataInvalid && this.__dataReady) {
            this.__dataInvalid = true;
            microtask.run(function () {
              if (_this2.__dataInvalid) {
                _this2.__dataInvalid = false;
                _this2._flushProperties();
              }
            });
          }
        }

        /**
         * Call to enable property accessor processing. Before this method is
         * called accessor values will be set but side effects are
         * queued. When called, any pending side effects occur immediately.
         * For elements, generally `connectedCallback` is a normal spot to do so.
         * It is safe to call this method multiple times as it only turns on
         * property accessors once.
         */

      }, {
        key: '_enableProperties',
        value: function _enableProperties() {
          if (!this.__dataEnabled) {
            this.__dataEnabled = true;
            if (this.__dataInstanceProps) {
              this._initializeInstanceProperties(this.__dataInstanceProps);
              this.__dataInstanceProps = null;
            }
            this.ready();
          }
        }

        /**
         * Calls the `_propertiesChanged` callback with the current set of
         * pending changes (and old values recorded when pending changes were
         * set), and resets the pending set of changes. Generally, this method
         * should not be called in user code.
         *
         *
         * @protected
         */

      }, {
        key: '_flushProperties',
        value: function _flushProperties() {
          if (this.__dataPending && this.__dataOld) {
            var changedProps = this.__dataPending;
            this.__dataPending = null;
            this.__dataCounter++;
            this._propertiesChanged(this.__data, changedProps, this.__dataOld);
            this.__dataCounter--;
          }
        }

        /**
         * Lifecycle callback called the first time properties are being flushed.
         * Prior to `ready`, all property sets through accessors are queued and
         * their effects are flushed after this method returns.
         *
         * Users may override this function to implement behavior that is
         * dependent on the element having its properties initialized, e.g.
         * from defaults (initialized from `constructor`, `_initializeProperties`),
         * `attributeChangedCallback`, or values propagated from host e.g. via
         * bindings.  `super.ready()` must be called to ensure the data system
         * becomes enabled.
         *
         * @public
         */

      }, {
        key: 'ready',
        value: function ready() {
          this.__dataReady = true;
          // Run normal flush
          this._flushProperties();
        }

        /**
         * Callback called when any properties with accessors created via
         * `_createPropertyAccessor` have been set.
         *
         * @param {!Object} currentProps Bag of all current accessor values
         * @param {!Object} changedProps Bag of properties changed since the last
         *   call to `_propertiesChanged`
         * @param {!Object} oldProps Bag of previous values for each property
         *   in `changedProps`
         * @protected
         */

      }, {
        key: '_propertiesChanged',
        value: function _propertiesChanged(currentProps, changedProps, oldProps) {} // eslint-disable-line no-unused-vars


        /**
         * Method called to determine whether a property value should be
         * considered as a change and cause the `_propertiesChanged` callback
         * to be enqueued.
         *
         * The default implementation returns `true` for primitive types if a
         * strict equality check fails, and returns `true` for all Object/Arrays.
         * The method always returns false for `NaN`.
         *
         * Override this method to e.g. provide stricter checking for
         * Objects/Arrays when using immutable patterns.
         *
         * @param {string} property Property name
         * @param {*} value New property value
         * @param {*} old Previous property value
         * @return {boolean} Whether the property should be considered a change
         *   and enqueue a `_proeprtiesChanged` callback
         * @protected
         */

      }, {
        key: '_shouldPropertyChange',
        value: function _shouldPropertyChange(property, value, old) {
          return (
            // Strict equality check
            old !== value && (
            // This ensures (old==NaN, value==NaN) always returns false
            old === old || value === value)
          );
        }
      }]);

      return PropertyAccessors;
    }(superClass);

    return PropertyAccessors;
  });
})();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

(function () {

  'use strict';

  /** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */

  var AsyncInterface = void 0; // eslint-disable-line no-unused-vars

  // Microtask implemented using Mutation Observer
  var microtaskCurrHandle = 0;
  var microtaskLastHandle = 0;
  var microtaskCallbacks = [];
  var microtaskNodeContent = 0;
  var microtaskNode = document.createTextNode('');
  new window.MutationObserver(microtaskFlush).observe(microtaskNode, { characterData: true });

  function microtaskFlush() {
    var len = microtaskCallbacks.length;
    for (var i = 0; i < len; i++) {
      var cb = microtaskCallbacks[i];
      if (cb) {
        try {
          cb();
        } catch (e) {
          setTimeout(function () {
            throw e;
          });
        }
      }
    }
    microtaskCallbacks.splice(0, len);
    microtaskLastHandle += len;
  }

  /**
   * Module that provides a number of strategies for enqueuing asynchronous
   * tasks.  Each sub-module provides a standard `run(fn)` interface that returns a
   * handle, and a `cancel(handle)` interface for canceling async tasks before
   * they run.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module that provides a number of strategies for enqueuing asynchronous
   * tasks.
   */
  Polymer.Async = {

    /**
     * Async interface wrapper around `setTimeout`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `setTimeout`.
     */
    timeOut: {
      /**
       * Returns a sub-module with the async interface providing the provided
       * delay.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} delay Time to wait before calling callbacks in ms
       * @return {AsyncInterface} An async timeout interface
       */
      after: function after(delay) {
        return {
          run: function run(fn) {
            return setTimeout(fn, delay);
          },

          cancel: window.clearTimeout.bind(window)
        };
      },

      /**
       * Enqueues a function called in the next task.
       *
       * @memberof Polymer.Async.timeOut
       * @param {Function} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run: window.setTimeout.bind(window),
      /**
       * Cancels a previously enqueued `timeOut` callback.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel: window.clearTimeout.bind(window)
    },

    /**
     * Async interface wrapper around `requestAnimationFrame`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `requestAnimationFrame`.
     */
    animationFrame: {
      /**
       * Enqueues a function called at `requestAnimationFrame` timing.
       *
       * @memberof Polymer.Async.animationFrame
       * @param {Function} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run: window.requestAnimationFrame.bind(window),
      /**
       * Cancels a previously enqueued `animationFrame` callback.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel: window.cancelAnimationFrame.bind(window)
    },

    /**
     * Async interface wrapper around `requestIdleCallback`.  Falls back to
     * `setTimeout` on browsers that do not support `requestIdleCallback`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `requestIdleCallback`.
     */
    idlePeriod: {
      /**
       * Enqueues a function called at `requestIdleCallback` timing.
       *
       * @memberof Polymer.Async.idlePeriod
       * @param {function(IdleDeadline)} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run: function run(fn) {
        return window.requestIdleCallback ? window.requestIdleCallback(fn) : window.setTimeout(fn, 16);
      },

      /**
       * Cancels a previously enqueued `idlePeriod` callback.
       *
       * @memberof Polymer.Async.idlePeriod
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel: function cancel(handle) {
        window.cancelIdleCallback ? window.cancelIdleCallback(handle) : window.clearTimeout(handle);
      }
    },

    /**
     * Async interface for enqueueing callbacks that run at microtask timing.
     *
     * Note that microtask timing is achieved via a single `MutationObserver`,
     * and thus callbacks enqueued with this API will all run in a single
     * batch, and not interleaved with other microtasks such as promises.
     * Promises are avoided as an implementation choice for the time being
     * due to Safari bugs that cause Promises to lack microtask guarantees.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface for enqueueing callbacks that run at microtask
     *   timing.
     */
    microTask: {

      /**
       * Enqueues a function called at microtask timing.
       *
       * @memberof Polymer.Async.microTask
       * @param {Function} callback Callback to run
       * @return {number} Handle used for canceling task
       */
      run: function run(callback) {
        microtaskNode.textContent = microtaskNodeContent++;
        microtaskCallbacks.push(callback);
        return microtaskCurrHandle++;
      },


      /**
       * Cancels a previously enqueued `microTask` callback.
       *
       * @memberof Polymer.Async.microTask
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel: function cancel(handle) {
        var idx = handle - microtaskLastHandle;
        if (idx >= 0) {
          if (!microtaskCallbacks[idx]) {
            throw new Error('invalid async handle: ' + handle);
          }
          microtaskCallbacks[idx] = null;
        }
      }
    }
  };
})();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(3);

__webpack_require__(6);

(function () {

  'use strict';

  // 1.x backwards-compatible auto-wrapper for template type extensions
  // This is a clear layering violation and gives favored-nation status to
  // dom-if and dom-repeat templates.  This is a conceit we're choosing to keep
  // a.) to ease 1.x backwards-compatibility due to loss of `is`, and
  // b.) to maintain if/repeat capability in parser-constrained elements
  //     (e.g. table, select) in lieu of native CE type extensions without
  //     massive new invention in this space (e.g. directive system)

  var templateExtensions = {
    'dom-if': true,
    'dom-repeat': true
  };
  function wrapTemplateExtension(node) {
    var is = node.getAttribute('is');
    if (is && templateExtensions[is]) {
      var t = node;
      t.removeAttribute('is');
      node = t.ownerDocument.createElement(is);
      t.parentNode.replaceChild(node, t);
      node.appendChild(t);
      while (t.attributes.length) {
        node.setAttribute(t.attributes[0].name, t.attributes[0].value);
        t.removeAttribute(t.attributes[0].name);
      }
    }
    return node;
  }

  function findTemplateNode(root, nodeInfo) {
    // recursively ascend tree until we hit root
    var parent = nodeInfo.parentInfo && findTemplateNode(root, nodeInfo.parentInfo);
    // unwind the stack, returning the indexed node at each level
    if (parent) {
      // note: marginally faster than indexing via childNodes
      // (http://jsperf.com/childnodes-lookup)
      for (var n = parent.firstChild, i = 0; n; n = n.nextSibling) {
        if (nodeInfo.parentIndex === i++) {
          return n;
        }
      }
    } else {
      return root;
    }
  }

  // construct `$` map (from id annotations)
  function applyIdToMap(inst, map, node, nodeInfo) {
    if (nodeInfo.id) {
      map[nodeInfo.id] = node;
    }
  }

  // install event listeners (from event annotations)
  function applyEventListener(inst, node, nodeInfo) {
    if (nodeInfo.events && nodeInfo.events.length) {
      for (var j = 0, e$ = nodeInfo.events, e; j < e$.length && (e = e$[j]); j++) {
        inst._addMethodEventListenerToNode(node, e.name, e.value, inst);
      }
    }
  }

  // push configuration references at configure time
  function applyTemplateContent(inst, node, nodeInfo) {
    if (nodeInfo.templateInfo) {
      node._templateInfo = nodeInfo.templateInfo;
    }
  }

  function createNodeEventHandler(context, eventName, methodName) {
    // Instances can optionally have a _methodHost which allows redirecting where
    // to find methods. Currently used by `templatize`.
    context = context._methodHost || context;
    var handler = function handler(e) {
      if (context[methodName]) {
        context[methodName](e, e.detail);
      } else {
        console.warn('listener method `' + methodName + '` not defined');
      }
    };
    return handler;
  }

  /**
   * Element mixin that provides basic template parsing and stamping, including
   * the following template-related features for stamped templates:
   *
   * - Declarative event listeners (`on-eventname="listener"`)
   * - Map of node id's to stamped node instances (`this.$.id`)
   * - Nested template content caching/removal and re-installation (performance
   *   optimization)
   *
   * @mixinFunction
   * @polymer
   * @memberof Polymer
   * @summary Element class mixin that provides basic template parsing and stamping
   */
  Polymer.TemplateStamp = Polymer.dedupingMixin(function (superClass) {

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_TemplateStamp}
     */
    var TemplateStamp = function (_superClass) {
      _inherits(TemplateStamp, _superClass);

      function TemplateStamp() {
        _classCallCheck(this, TemplateStamp);

        return _possibleConstructorReturn(this, (TemplateStamp.__proto__ || Object.getPrototypeOf(TemplateStamp)).apply(this, arguments));
      }

      _createClass(TemplateStamp, [{
        key: '_stampTemplate',


        /**
         * Clones the provided template content and returns a document fragment
         * containing the cloned dom.
         *
         * The template is parsed (once and memoized) using this library's
         * template parsing features, and provides the following value-added
         * features:
         * * Adds declarative event listeners for `on-event="handler"` attributes
         * * Generates an "id map" for all nodes with id's under `$` on returned
         *   document fragment
         * * Passes template info including `content` back to templates as
         *   `_templateInfo` (a performance optimization to avoid deep template
         *   cloning)
         *
         * Note that the memoized template parsing process is destructive to the
         * template: attributes for bindings and declarative event listeners are
         * removed after being noted in notes, and any nested `<template>.content`
         * is removed and stored in notes as well.
         *
         * @param {!HTMLTemplateElement} template Template to stamp
         * @return {!StampedTemplate} Cloned template content
         */
        value: function _stampTemplate(template) {
          // Polyfill support: bootstrap the template if it has not already been
          if (template && !template.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
            HTMLTemplateElement.decorate(template);
          }
          var templateInfo = this.constructor._parseTemplate(template);
          var nodeInfo = templateInfo.nodeInfoList;
          var content = templateInfo.content || template.content;
          var dom = /** @type DocumentFragment */document.importNode(content, true);
          // NOTE: ShadyDom optimization indicating there is an insertion point
          dom.__noInsertionPoint = !templateInfo.hasInsertionPoint;
          var nodes = dom.nodeList = new Array(nodeInfo.length);
          dom.$ = {};
          for (var i = 0, l = nodeInfo.length, info; i < l && (info = nodeInfo[i]); i++) {
            var node = nodes[i] = findTemplateNode(dom, info);
            applyIdToMap(this, dom.$, node, info);
            applyTemplateContent(this, node, info);
            applyEventListener(this, node, info);
          }
          return (/** @type {!StampedTemplate} */dom
          );
        }

        /**
         * Adds an event listener by method name for the event provided.
         *
         * This method generates a handler function that looks up the method
         * name at handling time.
         *
         * @param {Node} node Node to add listener on
         * @param {string} eventName Name of event
         * @param {string} methodName Name of method
         * @param {*=} context Context the method will be called on (defaults
         *   to `node`)
         * @return {Function} Generated handler function
         */

      }, {
        key: '_addMethodEventListenerToNode',
        value: function _addMethodEventListenerToNode(node, eventName, methodName, context) {
          context = context || node;
          var handler = createNodeEventHandler(context, eventName, methodName);
          this._addEventListenerToNode(node, eventName, handler);
          return handler;
        }

        /**
         * Override point for adding custom or simulated event handling.
         *
         * @param {Node} node Node to add event listener to
         * @param {string} eventName Name of event
         * @param {Function} handler Listener function to add
         */

      }, {
        key: '_addEventListenerToNode',
        value: function _addEventListenerToNode(node, eventName, handler) {
          node.addEventListener(eventName, handler);
        }

        /**
         * Override point for adding custom or simulated event handling.
         *
         * @param {Node} node Node to remove event listener from
         * @param {string} eventName Name of event
         * @param {Function} handler Listener function to remove
         */

      }, {
        key: '_removeEventListenerFromNode',
        value: function _removeEventListenerFromNode(node, eventName, handler) {
          node.removeEventListener(eventName, handler);
        }
      }], [{
        key: '_parseTemplate',


        /**
         * Scans a template to produce template metadata.
         *
         * Template-specific metadata are stored in the object returned, and node-
         * specific metadata are stored in objects in its flattened `nodeInfoList`
         * array.  Only nodes in the template that were parsed as nodes of
         * interest contain an object in `nodeInfoList`.  Each `nodeInfo` object
         * contains an `index` (`childNodes` index in parent) and optionally
         * `parent`, which points to node info of its parent (including its index).
         *
         * The template metadata object returned from this method has the following
         * structure (many fields optional):
         *
         * ```js
         *   {
         *     // Flattened list of node metadata (for nodes that generated metadata)
         *     nodeInfoList: [
         *       {
         *         // `id` attribute for any nodes with id's for generating `$` map
         *         id: {string},
         *         // `on-event="handler"` metadata
         *         events: [
         *           {
         *             name: {string},   // event name
         *             value: {string},  // handler method name
         *           }, ...
         *         ],
         *         // Notes when the template contained a `<slot>` for shady DOM
         *         // optimization purposes
         *         hasInsertionPoint: {boolean},
         *         // For nested `<template>`` nodes, nested template metadata
         *         templateInfo: {object}, // nested template metadata
         *         // Metadata to allow efficient retrieval of instanced node
         *         // corresponding to this metadata
         *         parentInfo: {number},   // reference to parent nodeInfo>
         *         parentIndex: {number},  // index in parent's `childNodes` collection
         *         infoIndex: {number},    // index of this `nodeInfo` in `templateInfo.nodeInfoList`
         *       },
         *       ...
         *     ],
         *     // When true, the template had the `strip-whitespace` attribute
         *     // or was nested in a template with that setting
         *     stripWhitespace: {boolean},
         *     // For nested templates, nested template content is moved into
         *     // a document fragment stored here; this is an optimization to
         *     // avoid the cost of nested template cloning
         *     content: {DocumentFragment}
         *   }
         * ```
         *
         * This method kicks off a recursive treewalk as follows:
         *
         * ```
         *    _parseTemplate <---------------------+
         *      _parseTemplateContent              |
         *        _parseTemplateNode  <------------|--+
         *          _parseTemplateNestedTemplate --+  |
         *          _parseTemplateChildNodes ---------+
         *          _parseTemplateNodeAttributes
         *            _parseTemplateNodeAttribute
         *
         * ```
         *
         * These methods may be overridden to add custom metadata about templates
         * to either `templateInfo` or `nodeInfo`.
         *
         * Note that this method may be destructive to the template, in that
         * e.g. event annotations may be removed after being noted in the
         * template metadata.
         *
         * @param {!HTMLTemplateElement} template Template to parse
         * @param {TemplateInfo=} outerTemplateInfo Template metadata from the outer
         *   template, for parsing nested templates
         * @return {!TemplateInfo} Parsed template metadata
         */
        value: function _parseTemplate(template, outerTemplateInfo) {
          // since a template may be re-used, memo-ize metadata
          if (!template._templateInfo) {
            var templateInfo = template._templateInfo = {};
            templateInfo.nodeInfoList = [];
            templateInfo.stripWhiteSpace = outerTemplateInfo && outerTemplateInfo.stripWhiteSpace || template.hasAttribute('strip-whitespace');
            this._parseTemplateContent(template, templateInfo, { parent: null });
          }
          return template._templateInfo;
        }
      }, {
        key: '_parseTemplateContent',
        value: function _parseTemplateContent(template, templateInfo, nodeInfo) {
          return this._parseTemplateNode(template.content, templateInfo, nodeInfo);
        }

        /**
         * Parses template node and adds template and node metadata based on
         * the current node, and its `childNodes` and `attributes`.
         *
         * This method may be overridden to add custom node or template specific
         * metadata based on this node.
         *
         * @param {Node} node Node to parse
         * @param {!TemplateInfo} templateInfo Template metadata for current template
         * @param {!NodeInfo} nodeInfo Node metadata for current template.
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         */

      }, {
        key: '_parseTemplateNode',
        value: function _parseTemplateNode(node, templateInfo, nodeInfo) {
          var noted = void 0;
          var element = /** @type Element */node;
          if (element.localName == 'template' && !element.hasAttribute('preserve-content')) {
            noted = this._parseTemplateNestedTemplate(element, templateInfo, nodeInfo) || noted;
          } else if (element.localName === 'slot') {
            // For ShadyDom optimization, indicating there is an insertion point
            templateInfo.hasInsertionPoint = true;
          }
          if (element.firstChild) {
            noted = this._parseTemplateChildNodes(element, templateInfo, nodeInfo) || noted;
          }
          if (element.hasAttributes && element.hasAttributes()) {
            noted = this._parseTemplateNodeAttributes(element, templateInfo, nodeInfo) || noted;
          }
          return noted;
        }

        /**
         * Parses template child nodes for the given root node.
         *
         * This method also wraps whitelisted legacy template extensions
         * (`is="dom-if"` and `is="dom-repeat"`) with their equivalent element
         * wrappers, collapses text nodes, and strips whitespace from the template
         * if the `templateInfo.stripWhitespace` setting was provided.
         *
         * @param {Node} root Root node whose `childNodes` will be parsed
         * @param {!TemplateInfo} templateInfo Template metadata for current template
         * @param {!NodeInfo} nodeInfo Node metadata for current template.
         */

      }, {
        key: '_parseTemplateChildNodes',
        value: function _parseTemplateChildNodes(root, templateInfo, nodeInfo) {
          for (var node = root.firstChild, parentIndex = 0, next; node; node = next) {
            // Wrap templates
            if (node.localName == 'template') {
              node = wrapTemplateExtension(node);
            }
            // collapse adjacent textNodes: fixes an IE issue that can cause
            // text nodes to be inexplicably split =(
            // note that root.normalize() should work but does not so we do this
            // manually.
            next = node.nextSibling;
            if (node.nodeType === Node.TEXT_NODE) {
              var /** Node */n = next;
              while (n && n.nodeType === Node.TEXT_NODE) {
                node.textContent += n.textContent;
                next = n.nextSibling;
                root.removeChild(n);
                n = next;
              }
              // optionally strip whitespace
              if (templateInfo.stripWhiteSpace && !node.textContent.trim()) {
                root.removeChild(node);
                continue;
              }
            }
            var childInfo = { parentIndex: parentIndex, parentInfo: nodeInfo };
            if (this._parseTemplateNode(node, templateInfo, childInfo)) {
              childInfo.infoIndex = templateInfo.nodeInfoList.push( /** @type {!NodeInfo} */childInfo) - 1;
            }
            // Increment if not removed
            if (node.parentNode) {
              parentIndex++;
            }
          }
        }

        /**
         * Parses template content for the given nested `<template>`.
         *
         * Nested template info is stored as `templateInfo` in the current node's
         * `nodeInfo`. `template.content` is removed and stored in `templateInfo`.
         * It will then be the responsibility of the host to set it back to the
         * template and for users stamping nested templates to use the
         * `_contentForTemplate` method to retrieve the content for this template
         * (an optimization to avoid the cost of cloning nested template content).
         *
         * @param {HTMLTemplateElement} node Node to parse (a <template>)
         * @param {TemplateInfo} outerTemplateInfo Template metadata for current template
         *   that includes the template `node`
         * @param {!NodeInfo} nodeInfo Node metadata for current template.
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         */

      }, {
        key: '_parseTemplateNestedTemplate',
        value: function _parseTemplateNestedTemplate(node, outerTemplateInfo, nodeInfo) {
          var templateInfo = this._parseTemplate(node, outerTemplateInfo);
          var content = templateInfo.content = node.content.ownerDocument.createDocumentFragment();
          content.appendChild(node.content);
          nodeInfo.templateInfo = templateInfo;
          return true;
        }

        /**
         * Parses template node attributes and adds node metadata to `nodeInfo`
         * for nodes of interest.
         *
         * @param {Element} node Node to parse
         * @param {TemplateInfo} templateInfo Template metadata for current template
         * @param {NodeInfo} nodeInfo Node metadata for current template.
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         */

      }, {
        key: '_parseTemplateNodeAttributes',
        value: function _parseTemplateNodeAttributes(node, templateInfo, nodeInfo) {
          // Make copy of original attribute list, since the order may change
          // as attributes are added and removed
          var noted = false;
          var attrs = Array.from(node.attributes);
          for (var i = attrs.length - 1, a; a = attrs[i]; i--) {
            noted = this._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, a.name, a.value) || noted;
          }
          return noted;
        }

        /**
         * Parses a single template node attribute and adds node metadata to
         * `nodeInfo` for attributes of interest.
         *
         * This implementation adds metadata for `on-event="handler"` attributes
         * and `id` attributes.
         *
         * @param {Element} node Node to parse
         * @param {!TemplateInfo} templateInfo Template metadata for current template
         * @param {!NodeInfo} nodeInfo Node metadata for current template.
         * @param {string} name Attribute name
         * @param {string} value Attribute value
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         */

      }, {
        key: '_parseTemplateNodeAttribute',
        value: function _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
          // events (on-*)
          if (name.slice(0, 3) === 'on-') {
            node.removeAttribute(name);
            nodeInfo.events = nodeInfo.events || [];
            nodeInfo.events.push({
              name: name.slice(3),
              value: value
            });
            return true;
          }
          // static id
          else if (name === 'id') {
              nodeInfo.id = value;
              return true;
            }
          return false;
        }

        /**
         * Returns the `content` document fragment for a given template.
         *
         * For nested templates, Polymer performs an optimization to cache nested
         * template content to avoid the cost of cloning deeply nested templates.
         * This method retrieves the cached content for a given template.
         *
         * @param {HTMLTemplateElement} template Template to retrieve `content` for
         * @return {DocumentFragment} Content fragment
         */

      }, {
        key: '_contentForTemplate',
        value: function _contentForTemplate(template) {
          var templateInfo = /** @type {HTMLTemplateElementWithInfo} */template._templateInfo;
          return templateInfo && templateInfo.content || template.content;
        }
      }]);

      return TemplateStamp;
    }(superClass);

    return TemplateStamp;
  });
})();

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-button> <template> <style include=shared-styles>:host{min-height:fit-content;min-width:fit-content;display:inline-flex;height:32px;width:fit-content;padding:4px 12px;transition:.2s all ease-in-out;display:flex;flex-direction:row;border-radius:16px;cursor:pointer;box-sizing:border-box}.button-label{text-align:center;width:fit-content;line-height:24px;font-size:14px;font-family:calibri;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-transform:capitalize;font-weight:700;width:100%;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host sh-icon{color:var(--text-90);margin:auto}:host([shape=pill]){min-width:88px}:host([shape=pill]) sh-icon{display:none}:host([shape=circle]){position:relative;width:40px;height:40px;padding:8px;border-radius:20px}:host([shape=circle]) .button-label{display:none}:host([shape=square]){min-height:64px;min-width:64px;flex-direction:column;padding:0 4px;border-radius:2px}:host([shape=square]) .button-label{font-size:13px;text-align:center;width:100%;max-width:56px;white-space:normal;margin-bottom:auto;line-height:12px;font-weight:300;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host([shape=square]) sh-icon{margin:auto auto 4px auto}:host([color=primary]){background-color:var(--primary-color)}:host([color=primary]:hover){background-color:var(--primary-2)}:host([color=primary]:active){background-color:var(--primary-3)}:host([color=primary]) .button-label,:host([color=primary]) sh-icon{color:#fff}:host([color=secondary]){background-color:var(--highlight-10)}:host([color=secondary]:hover){background-color:var(--highlight-20)}:host([color=secondary]:active){background-color:var(--highlight-5)}:host([color=secondary]) .button-label{color:var(--text-90)}:host([shape=pill][color=transparent]){padding:3px 11px;border:1px solid var(--highlight-10)}:host([shape=pill][color=transparent]:hover){border:1px solid transparent}:host([color=transparent]){background-color:transparent}:host([color=transparent]){background-color:transparent}:host([color=transparent]:hover){background-color:var(--highlight-10)}:host([color=transparent]:active){background-color:transparent}:host([color=transparent]) .button-label{color:var(--text-90)}:host([disabled]){pointer-events:none;opacity:.3}.tooltip{display:none;white-space:nowrap;text-overflow:ellipsis;z-index:2;text-transform:capitalize}:host([shape=circle]) .bottom.tooltip,:host([shape=circle]) .left.tooltip,:host([shape=circle]) .right.tooltip,:host([shape=circle]) .top.tooltip{display:block;line-height:24px;padding:0 8px;position:absolute;opacity:0;visibility:hidden;color:var(--text-90);background-color:var(--base-3);width:fit-content;height:24px;box-sizing:border-box;transition:.2s all ease-in-out .4s;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host(:hover) .bottom.tooltip,:host(:hover) .left.tooltip,:host(:hover) .right.tooltip,:host(:hover) .top.tooltip{opacity:1;visibility:visible}.top.tooltip{top:0;left:50%;transform:translateX(-50%);margin-top:-24px}:host(:hover) .top.tooltip{margin-top:-28px}.bottom.tooltip{top:100%;left:50%;transform:translateX(-50%);margin-top:0}:host(:hover) .bottom.tooltip{margin-top:4px}.left.tooltip{right:100%;top:50%;transform:translateY(-50%)}:host(:hover) .left.tooltip{margin-right:4px}.right.tooltip{left:100%;top:50%;transform:translateY(-50%)}:host(:hover) .right.tooltip{margin-left:4px}</style> <sh-icon icon$=[[icon]]></sh-icon> <div class=button-label>[[label]]</div> <div class$=\"tooltip [[tooltip]]\">[[label]]</div> </template> </dom-module>");

var SHButton = function (_Polymer$Element) {
  _inherits(SHButton, _Polymer$Element);

  function SHButton() {
    _classCallCheck(this, SHButton);

    return _possibleConstructorReturn(this, (SHButton.__proto__ || Object.getPrototypeOf(SHButton)).apply(this, arguments));
  }

  _createClass(SHButton, null, [{
    key: 'is',
    get: function get() {
      return 'sh-button';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        icon: {
          type: String,
          value: "save"
        },
        label: {
          type: String,
          value: "Label"
        },
        shape: {
          type: String,
          value: "pill",
          reflectToAttribute: true
        },
        color: {
          type: String,
          value: "primary",
          reflectToAttribute: true
        },
        tooltip: {
          type: String,
          value: ""
        },
        disabled: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        role: {
          type: String,
          value: "button",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHButton;
}(Polymer.Element);

window.customElements.define(SHButton.is, SHButton);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-breadcrumbs> <template> <style include=shared-styles>:host{display:flex}</style> <slot></slot> </template> </dom-module>");

var SHBreadcrumbs = function (_Polymer$Element) {
  _inherits(SHBreadcrumbs, _Polymer$Element);

  function SHBreadcrumbs() {
    _classCallCheck(this, SHBreadcrumbs);

    return _possibleConstructorReturn(this, (SHBreadcrumbs.__proto__ || Object.getPrototypeOf(SHBreadcrumbs)).apply(this, arguments));
  }

  _createClass(SHBreadcrumbs, [{
    key: 'ready',
    value: function ready() {
      _get(SHBreadcrumbs.prototype.__proto__ || Object.getPrototypeOf(SHBreadcrumbs.prototype), 'ready', this).call(this);
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-breadcrumbs';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {};
    }
  }]);

  return SHBreadcrumbs;
}(Polymer.Element);

window.customElements.define(SHBreadcrumbs.is, SHBreadcrumbs);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-breadcrumb-item> <template> <style include=shared-styles>.crumb-container{margin-right:8px;height:24px;display:inline-flex}.crumb-container a{color:var(--text-55);text-decoration:none;font-weight:700;margin-right:8px;transition:all .2s ease-in-out;max-width:120px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;font-size:14px;font-family:Calibri}.crumb-container a:hover{color:var(--text-90)}:host(:last-of-type) sh-icon{display:none}:host(:last-of-type) .crumb-container a{color:var(--text-90);pointer-events:none}:host([active]) .crumb-container a{color:var(--text-90)}</style> <div class=crumb-container click=_handleActive> <a href=[[href]]>[[label]]</a> <sh-icon icon=arrow-right color=var(--text-55) s=\"\"></sh-icon> </div> </template> </dom-module>");

var SHBreadcrumbItem = function (_Polymer$Element) {
  _inherits(SHBreadcrumbItem, _Polymer$Element);

  function SHBreadcrumbItem() {
    _classCallCheck(this, SHBreadcrumbItem);

    return _possibleConstructorReturn(this, (SHBreadcrumbItem.__proto__ || Object.getPrototypeOf(SHBreadcrumbItem)).apply(this, arguments));
  }

  _createClass(SHBreadcrumbItem, null, [{
    key: 'is',
    get: function get() {
      return 'sh-breadcrumb-item';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String,
          value: "Breadcrumb Item"
        },
        href: {
          type: String,
          value: "/link"
        },
        role: {
          type: String,
          value: "link",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHBreadcrumbItem;
}(Polymer.Element);

window.customElements.define(SHBreadcrumbItem.is, SHBreadcrumbItem);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-card> <template> <style include=shared-styles>:host{width:100%}.card-wrapper{background:var(--base-3);box-shadow:1px 2px 1px var(--shadow-strong),-1px -1px 1px var(--shadow-light);width:100%;height:fit-content;display:flex;flex-direction:column;border-radius:2px}.label-wrapper{display:flex;flex-direction:row;padding:16px;align-items:center}.card-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:700;line-height:24px;flex:1;color:var(--text-90);font-family:bree;font-size:15px;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}.functions-slot{display:flex;flex-direction:row;align-items:center}.header-slot{padding:16px;display:flex;flex-direction:row;overflow:hidden}.header-slot ::slotted(sh-tabs){flex:1;margin:-16px -16px 0 -16px;border-bottom:1px solid var(--divider)}.body-slot{flex:1;padding:16px;box-sizing:border-box;display:flex;flex-direction:column;overflow:overlay}.footer-slot{height:fit-content;padding:16px;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-end;align-items:center}sh-icon#card-icon{margin-right:8px;color:var(--text-90)}.icon-{display:none}#footer::slotted(*),#functions::slotted(*){margin-left:8px}.card-wrapper[empty-header] .header-slot{display:none}.card-wrapper[empty-label] .label-wrapper{display:none}.card-wrapper[empty-footer] .footer-slot{display:none}.card-wrapper:not([empty-header]) .label-wrapper{display:none}.card-wrapper:not([empty-header]) .body-slot{padding-top:0}.card-wrapper:not([empty-label]) .body-slot{padding-top:0}.card-wrapper:not([empty-footer]) .body-slot{padding-bottom:0}.card-wrapper[has-image] .body-slot,.card-wrapper[has-image] .footer-slot,.card-wrapper[has-image] .header-slot,.card-wrapper[has-image] .label-wrapper{display:none!important}.card-wrapper[has-image]{padding-top:100%;max-height:0!important;min-height:0!important;background-position:center;background-size:cover;background-repeat:no-repeat}</style> <div class=card-wrapper style$=\"max-height:[[cardHeight]];min-height:[[cardHeight]];background-image:url('[[image]]')\" expanded$=[[expanded]] empty-label$=[[emptyLabel]] empty-footer$=[[emptyFooter]] empty-header$=[[emptyHeader]] has-image$=[[hasImage]]> <div class=label-wrapper> <sh-icon icon$=[[icon]] class$=icon-[[icon]] id=card-icon></sh-icon> <div class=card-label>[[label]]</div> <div class=functions-slot> <slot name=functions id=functions></slot> </div> </div> <div class=header-slot> <slot name=header id=header></slot> </div> <div class=body-slot> <slot></slot> </div> <div class=footer-slot> <slot name=footer id=footer></slot> </div> </div> </template> </dom-module>");

var SHCard = function (_Polymer$Element) {
  _inherits(SHCard, _Polymer$Element);

  function SHCard() {
    _classCallCheck(this, SHCard);

    return _possibleConstructorReturn(this, (SHCard.__proto__ || Object.getPrototypeOf(SHCard)).apply(this, arguments));
  }

  _createClass(SHCard, [{
    key: 'ready',
    value: function ready() {
      _get(SHCard.prototype.__proto__ || Object.getPrototypeOf(SHCard.prototype), 'ready', this).call(this);
      var footerNodes = this.$.footer.assignedNodes({ flatten: true });
      if (footerNodes == 0) {
        this.emptyFooter = !this.emptyFooter;
      };
      var headerNodes = this.$.header.assignedNodes({ flatten: true });
      if (headerNodes == 0) {
        this.emptyHeader = !this.emptyHeader;
      };
      if (this.label == undefined) {
        this.emptyLabel = !this.emptyLabel;
      };
      if (this.image == undefined) {
        this.hasImage = !this.hasImage;
      };
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-card';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String
        },
        icon: {
          type: String,
          value: ""
        },
        image: {
          type: String
        },
        cardHeight: {
          type: String,
          value: "100%"
        },
        emptyLabel: {
          type: Boolean,
          value: false
        },
        emptyFooter: {
          type: Boolean,
          value: false
        },
        emptyHeader: {
          type: Boolean,
          value: false
        },
        hasImage: {
          type: Boolean,
          value: true
        }
      };
    }
  }]);

  return SHCard;
}(Polymer.Element);

window.customElements.define(SHCard.is, SHCard);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-checkbox> <template> <style include=shared-styles>:host{display:flex;flex-direction:row;width:100%;padding:8px 0;margin:0!important;color:var(--text-90);-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host([disabled]){cursor:default;pointer-events:none;color:var(--highlight-10)!important}:host([disabled]) #checkbox::before{background:var(--highlight-5)!important}#checkbox-container{display:flex;align-items:center;height:24px;width:100%;cursor:pointer;font-size:14px;font-family:calibri;font-weight:400}#checkbox{height:24px;width:24px;visibility:hidden;margin:0;cursor:pointer;position:relative;margin-right:8px}#checkbox::before{width:18px;height:18px;position:absolute;margin:3px;border-radius:2px;content:'checked';display:flex;background:var(--highlight-10);visibility:visible;box-sizing:border-box;transition:.2s all ease-in-out;font-family:material icons;font-weight:700;color:transparent;font-size:12px;line-height:18px;text-indent:3px;text-align:center;vertical-align:middle}:host([active]) #checkbox::before{color:var(--base-2);font-size:18px;text-indent:0;background:var(--primary-color)}:host(:not([active]):hover) #checkbox::before{background:var(--highlight-20)!important}:host([active]:hover) #checkbox::before{background:var(--primary-2)!important}:host([neutral][active]) #checkbox::before{background:var(--text-55)!important}:host([neutral][active]:hover) #checkbox::before{background:var(--text-90)!important}</style> <div id=checkbox-container on-click=_triggerChecked> <input id=checkbox on-click=_handleActive type=checkbox checked={{active::change}} active=\"\" disabled$=[[disabled]] role=presentation> [[label]] </div> </template> </dom-module>");

var SHCheckbox = function (_Polymer$Element) {
  _inherits(SHCheckbox, _Polymer$Element);

  function SHCheckbox() {
    _classCallCheck(this, SHCheckbox);

    return _possibleConstructorReturn(this, (SHCheckbox.__proto__ || Object.getPrototypeOf(SHCheckbox)).apply(this, arguments));
  }

  _createClass(SHCheckbox, [{
    key: '_handleActive',
    value: function _handleActive() {
      this.$.checkbox.click();
    }
  }, {
    key: '_triggerChecked',
    value: function _triggerChecked() {
      this.$.checkbox.click();
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-checkbox';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String,
          value: "Label"
        },
        active: {
          type: Boolean,
          value: false,
          reflectToAttribute: true,
          notify: true
        },
        disabled: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        neutral: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        role: {
          type: String,
          value: "checkbox",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHCheckbox;
}(Polymer.Element);

window.customElements.define(SHCheckbox.is, SHCheckbox);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-datepicker> <template> <style include=shared-styles>:host{width:280px;min-height:fit-content;position:relative;top:-120px}.calendar-label{color:var(--text-55);position:absolute;font-size:12px;top:5px;left:8px;width:calc(100% - 16px);transition:.2s all ease-in-out;line-height:16px;pointer-events:none;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host([value=\"\"]) .calendar-label{top:9px;font-size:14px;line-height:24px;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}input{outline:0;border:none;font-family:Calibri,sans-serif;font-size:14px;line-height:24px;color:var(--text-90);background:var(--highlight-5);border-radius:2px;width:100%;box-sizing:border-box;padding:16px 8px 0 8px;transition:.2s all ease-in-out;font-weight:300;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host([active]) input{outline:0;border-color:var(--text-55)!important;padding:16px 8px 0 8px!important}:host(:hover) input{border-color:var(--text-20)}:host([value=\"\"]) input{padding:8px}.datepicker-input-wrapper{display:flex;flex-direction:row;position:relative}.content-wrapper{display:flex;flex-direction:column;width:100%}#date-range{position:absolute;top:9px;right:8px;transition:.2s all ease-in-out}:host(:hover:not([active])) input{background:var(--highlight-10)}:host([disabled]){pointer-events:none}:host([disabled]) #date-range,:host([disabled]) .calendar-label,:host([disabled]) input{color:var(--text-20)}:host #date-panel-wrapper{background:var(--base-3);width:100%;padding:8px;box-sizing:border-box;border-radius:2px;box-sizing:border-box;box-shadow:1px 2px 1px var(--shadow-strong),-1px -1px 1px var(--shadow-light);visibility:hidden;opacity:0;position:absolute;top:25px;left:0;transition:.2s all ease-in-out,0s max-height ease-in-out .2s}:host([active]) #date-panel-wrapper{padding:4px 8px;top:41px;display:flex;flex-direction:column;max-height:176px;overflow:overlay;opacity:1;visibility:visible;transition:.2s all ease-in-out .2s,0s max-height ease-in-out}.calendar-header{display:inline-flex;flex-direction:row;justify-content:space-between;width:100%;overflow:auto;color:var(--text-90)}.calendar-header sh-icon{display:inline-block;cursor:pointer}.calendar-header .calendar-picker-label{height:32px;line-height:32px;padding:0 8px;cursor:pointer;transition:.2s all ease-in-out;border-radius:2px;font-weight:700}.calendar-header sh-icon:first-of-type{margin-left:4px;margin-top:3px}.calendar-header sh-icon:last-of-type{margin-right:4px;margin-top:3px}.calendar-cell,.column-header{padding:4px}.calendar-cell.last-month-cell,.calendar-cell.next-month-cell{color:var(--text-20)}.column-header-inner{display:inline-block;height:24px;width:24px;text-align:center;color:var(--text-55);font-weight:700}.calendar-cell{transition:.2s all ease-in-out;border-radius:50%;color:var(--text-55)}.calendar-date{height:24px;width:24px;text-align:center;margin:auto;cursor:pointer;border-radius:50%;transition:.2s all ease-in-out}.calendar-selected-date .calendar-date{color:var(--primary-color)}.calendar-month-table,.calendar-table,.calendar-year-table{height:240px;width:100%}.month-panel-month,.year-panel-year{text-align:center;transition:.2s all ease-in-out;cursor:pointer;width:fit-content;margin:auto;padding:0 8px;border-radius:2px;color:var(--text-90)}.calendar-footer{display:none}.calendar-month-table{display:none}.calendar-year-table{display:none}:host([active]) #date-panel-wrapper{max-height:fit-content;overflow:overlay;opacity:1;visibility:visible;transition:.2s all ease-in-out .2s,0s max-height ease-in-out;top:40px}.calendar-date:hover,.calendar-picker-label:hover,.month-panel-month:hover,.year-panel-year:hover{background:var(--highlight-10)}.month-panel-month:active,.year-panel-year:active{background:var(--primary-color);color:var(--base-0)}</style> <div class=datepicker-input-wrapper on-click=_handleActive> <div class=content-wrapper> <input class=calendar-[[value]] type=text value={{value::input}} readonly=\"\"> <div class=calendar-label>[[label]]</div> </div> <sh-icon icon=date-range id=date-range button=\"\"></sh-icon> </div> <div id=date-panel-wrapper> <div class=calendar-header> <sh-icon icon=arrow-left></sh-icon> <div class=calendar-picker-label>Dec 2017</div> <sh-icon icon=arrow-right></sh-icon> </div> <div class=calendar-body> <table class=calendar-month-table role=grid> <tbody class=month-panel-body> <tr role=row> <td class=calendar-month-panel-cell role=gridcell> <div class=month-panel-month>Jan</div> </td> <td class=calendar-month-panel-cell role=gridcell> <div class=month-panel-month>Feb</div> </td> <td class=calendar-month-panel-cell role=gridcell> <div class=month-panel-month>Mar</div> </td> </tr> <tr role=row> <td class=calendar-month-panel-cell role=gridcell> <div class=month-panel-month>Apr</div> </td> <td class=calendar-month-panel-cell role=gridcell> <div class=month-panel-month>May</div> </td> <td class=calendar-month-panel-cell role=gridcell> <div class=month-panel-month>Jun</div> </td> </tr> <tr role=row> <td class=calendar-month-panel-cell role=gridcell> <div class=month-panel-month>Jul</div> </td> <td class=calendar-month-panel-cell role=gridcell> <div class=month-panel-month>Aug</div> </td> <td class=calendar-month-panel-cell role=gridcell> <div class=month-panel-month>Sep</div> </td> </tr> <tr role=row> <td class=calendar-month-panel-cell role=gridcell> <div class=month-panel-month>Oct</div> </td> <td class=calendar-month-panel-cell role=gridcell> <div class=month-panel-month>Nov</div> </td> <td class=\"calendar-month-panel-cell calendar-selected-month\" role=gridcell> <div class=month-panel-month>Dec</div> </td> </tr> </tbody> </table> <table class=calendar-year-table role=grid> <tbody class=year-panel-body> <tr role=row> <td class=\"calendar-year-panel-cell last-decade-cell\" role=gridcell> <div class=year-panel-year>2009</div> </td> <td class=calendar-year-panel-cell role=gridcell> <div class=year-panel-year>2010</div> </td> <td class=calendar-year-panel-cell role=gridcell> <div class=year-panel-year>2011</div> </td> </tr> <tr role=row> <td class=calendar-year-panel-cell role=gridcell> <div class=year-panel-year>2012</div> </td> <td class=calendar-year-panel-cell role=gridcell> <div class=year-panel-year>2013</div> </td> <td class=calendar-year-panel-cell role=gridcell> <div class=year-panel-year>2014</div> </td> </tr> <tr role=row> <td class=calendar-year-panel-cell role=gridcell> <div class=year-panel-year>2015</div> </td> <td class=calendar-year-panel-cell role=gridcell> <div class=year-panel-year>2016</div> </td> <td class=calendar-year-panel-cell role=gridcell> <div class=year-panel-year>2017</div> </td> </tr> <tr role=row> <td class=calendar-year-panel-cell role=gridcell> <div class=year-panel-year>2018</div> </td> <td class=calendar-year-panel-cell role=gridcell> <div class=year-panel-year>2019</div> </td> <td class=\"calendar-year-panel-cell calendar-selected-year next-decade-cell\" role=gridcell> <div class=year-panel-year>2020</div> </td> </tr> </tbody> </table> <table class=calendar-table role=grid> <thead> <tr role=row> <th class=column-header title=Sun role=column-header> <span class=column-header-inner>S</span> </th> <th class=column-header title=Mon role=column-header> <span class=column-header-inner>M</span> </th> <th class=column-header title=Tue role=column-header> <span class=column-header-inner>T</span> </th> <th class=column-header title=Wed role=column-header> <span class=column-header-inner>W</span> </th> <th class=column-header title=Thu role=column-header> <span class=column-header-inner>T</span> </th> <th class=column-header title=Fri role=column-header> <span class=column-header-inner>F</span> </th> <th class=column-header title=Sat role=column-header> <span class=column-header-inner>S</span> </th> </tr> </thead> <tbody class=calendar-tbody> <tr role=row> <td title=11/26/2017 class=\"calendar-cell last-month-cell\"> <div class=calendar-date>26</div> </td> <td title=11/27/2017 class=\"calendar-cell last-month-cell\"> <div class=calendar-date>27</div> </td> <td title=11/28/2017 class=\"calendar-cell last-month-cell\"> <div class=calendar-date>28</div> </td> <td title=11/29/2017 class=\"calendar-cell last-month-cell\"> <div class=calendar-date>29</div> </td> <td title=11/30/2017 class=\"calendar-cell last-month-cell\"> <div class=calendar-date>30</div> </td> <td title=12/01/2017 class=calendar-cell> <div class=calendar-date>1</div> </td> <td title=12/02/2017 class=calendar-cell> <div class=calendar-date>2</div> </td> </tr> <tr role=row> <td title=12/03/2017 class=\"calendar-cell calendar-today calendar-selected-date\"> <div class=calendar-date>3</div> </td> <td title=12/04/2017 class=calendar-cell> <div class=calendar-date>4</div> </td> <td title=12/05/2017 class=calendar-cell> <div class=calendar-date>5</div> </td> <td title=12/06/2017 class=calendar-cell> <div class=calendar-date>6</div> </td> <td title=12/07/2017 class=calendar-cell> <div class=calendar-date>7</div> </td> <td title=12/08/2017 class=calendar-cell> <div class=calendar-date>8</div> </td> <td title=12/09/2017 class=calendar-cell> <div class=calendar-date>9</div> </td> </tr> <tr role=row> <td title=12/10/2017 class=calendar-cell> <div class=calendar-date>10</div> </td> <td title=12/11/2017 class=calendar-cell> <div class=calendar-date>11</div> </td> <td title=12/12/2017 class=calendar-cell> <div class=calendar-date>12</div> </td> <td title=12/13/2017 class=calendar-cell> <div class=calendar-date>13</div> </td> <td title=12/14/2017 class=calendar-cell> <div class=calendar-date>14</div> </td> <td title=12/15/2017 class=calendar-cell> <div class=calendar-date>15</div> </td> <td title=12/16/2017 class=calendar-cell> <div class=calendar-date>16</div> </td> </tr> <tr role=row> <td title=12/17/2017 class=calendar-cell> <div class=calendar-date>17</div> </td> <td title=12/18/2017 class=calendar-cell> <div class=calendar-date>18</div> </td> <td title=12/19/2017 class=calendar-cell> <div class=calendar-date>19</div> </td> <td title=12/20/2017 class=calendar-cell> <div class=calendar-date>20</div> </td> <td title=12/21/2017 class=calendar-cell> <div class=calendar-date>21</div> </td> <td title=12/22/2017 class=calendar-cell> <div class=calendar-date>22</div> </td> <td title=12/23/2017 class=calendar-cell> <div class=calendar-date>23</div> </td> </tr> <tr role=row> <td title=12/24/2017 class=calendar-cell> <div class=calendar-date>24</div> </td> <td title=12/25/2017 class=calendar-cell> <div class=calendar-date>25</div> </td> <td title=12/26/2017 class=calendar-cell> <div class=calendar-date>26</div> </td> <td title=12/27/2017 class=calendar-cell> <div class=calendar-date>27</div> </td> <td title=12/28/2017 class=calendar-cell> <div class=calendar-date>28</div> </td> <td title=12/29/2017 class=calendar-cell> <div class=calendar-date>29</div> </td> <td title=12/30/2017 class=calendar-cell> <div class=calendar-date>30</div> </td> </tr> <tr role=row> <td title=12/31/2017 class=calendar-cell> <div class=calendar-date>31</div> </td> <td title=01/01/2018 class=\"calendar-cell next-month-cell\"> <div class=calendar-date>1</div> </td> <td title=01/02/2018 class=\"calendar-cell next-month-cell\"> <div class=calendar-date>2</div> </td> <td title=01/03/2018 class=\"calendar-cell next-month-cell\"> <div class=calendar-date>3</div> </td> <td title=01/04/2018 class=\"calendar-cell next-month-cell\"> <div class=calendar-date>4</div> </td> <td title=01/05/2018 class=\"calendar-cell next-month-cell\"> <div class=calendar-date>5</div> </td> <td title=01/06/2018 class=\"calendar-cell next-month-cell\"> <div class=calendar-date>6</div> </td> </tr> </tbody> </table> </div> <div class=calendar-footer> <sh-button color=transparent label=Today></sh-button> </div> </div> </template> </dom-module>");

var SHDatepicker = function (_Polymer$Element) {
  _inherits(SHDatepicker, _Polymer$Element);

  function SHDatepicker() {
    _classCallCheck(this, SHDatepicker);

    return _possibleConstructorReturn(this, (SHDatepicker.__proto__ || Object.getPrototypeOf(SHDatepicker)).apply(this, arguments));
  }

  _createClass(SHDatepicker, [{
    key: 'ready',
    value: function ready() {
      _get(SHDatepicker.prototype.__proto__ || Object.getPrototypeOf(SHDatepicker.prototype), 'ready', this).call(this);
    }
  }, {
    key: '_handleActive',
    value: function _handleActive() {
      this.active = !this.active;
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-datepicker';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        active: {
          type: Boolean,
          value: false,
          reflectToAttribute: true,
          notify: true
        },
        label: {
          type: String,
          value: "Label"
        },
        value: {
          type: String,
          value: "",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHDatepicker;
}(Polymer.Element);

window.customElements.define(SHDatepicker.is, SHDatepicker);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-divider> <template> <style include=shared-styles>:host{height:fit-content;width:100%}.divider-wrapper{height:1px;background-color:var(--divider);width:100%}:host([thick]) .divider-wrapper{height:2px}:host([spacing=\"s\"]) .divider-wrapper{margin:8px 0}:host([spacing=\"m\"]) .divider-wrapper{margin:16px 0}:host([spacing=\"l\"]) .divider-wrapper{margin:24px 0}:host([spacing=xl]) .divider-wrapper{margin:48px 0}</style> <div class=divider-wrapper></div> </template> </dom-module>");

var SHDivider = function (_Polymer$Element) {
  _inherits(SHDivider, _Polymer$Element);

  function SHDivider() {
    _classCallCheck(this, SHDivider);

    return _possibleConstructorReturn(this, (SHDivider.__proto__ || Object.getPrototypeOf(SHDivider)).apply(this, arguments));
  }

  _createClass(SHDivider, null, [{
    key: 'is',
    get: function get() {
      return 'sh-divider';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        thick: {
          type: Boolean,
          value: false
        },
        spacing: {
          type: String,
          value: "s",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHDivider;
}(Polymer.Element);

window.customElements.define(SHDivider.is, SHDivider);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-dropdown> <template> <style include=shared-styles>:host{width:100%;min-height:fit-content;position:relative}.dropdown-label{color:var(--text-55);position:absolute;font-size:12px;top:4px;left:8px;width:calc(100% - 16px);transition:.2s all ease-in-out;line-height:16px;pointer-events:none;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host([value=\"\"]) .dropdown-label{top:9px;font-size:14px;line-height:24px;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host([active]) .dropdown-label{top:4px!important;font-size:12px!important;line-height:16px!important;color:var(--primary-color)}input{outline:0;border:none;cursor:pointer;font-family:Calibri,sans-serif;font-size:14px;line-height:24px;color:var(--text-90);background:var(--highlight-5);border-radius:2px;width:100%;box-sizing:border-box;padding:16px 8px 0 8px;transition:.2s all ease-in-out;font-weight:300;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host([active]) input{outline:0;padding:16px 8px 0 8px!important}:host(:hover:not([active])) input{background:var(--highlight-10)}:host([value=\"\"]) input{padding:8px}.dropdown-wrapper{display:flex;flex-direction:row;position:relative}.content-wrapper{display:flex;flex-direction:column;width:100%}#dropdown-icon{position:absolute;top:9px;right:8px;transition:0s transform ease-in-out}:host([active]) #dropdown-icon{transform:rotate(180deg)}.items-wrapper{max-height:0;opacity:0;visibility:hidden;padding:0 8px;position:absolute;top:25px;left:0;background:var(--base-3);width:100%;box-sizing:border-box;transition:.2s all ease-in-out,0s max-height ease-in-out .2s;border-radius:2px;box-shadow:1px 2px 1px var(--shadow-strong),-1px -1px 1px var(--shadow-light);z-index:1}:host([active]) .items-wrapper{padding:0 8px;top:41px;display:flex;flex-direction:column;max-height:176px;overflow:overlay;opacity:1;visibility:visible;transition:.2s all ease-in-out .2s,0s max-height ease-in-out}:host([disabled]){pointer-events:none}:host([disabled]) #dropdown-icon,:host([disabled]) .dropdown-label,:host([disabled]) input{color:var(--text-20)!important}</style> <div class=dropdown-wrapper on-click=_handleActive> <div class=content-wrapper> <input class=dropdown-[[value]] type=text value={{value::input}} readonly=\"\"> <div class=dropdown-label>[[label]]</div> </div> <sh-icon icon=drop-down id=dropdown-icon button=\"\"></sh-icon> </div> <div class=items-wrapper> <slot></slot> </div> </template> </dom-module>");

var SHDropdown = function (_Polymer$Element) {
  _inherits(SHDropdown, _Polymer$Element);

  function SHDropdown() {
    _classCallCheck(this, SHDropdown);

    return _possibleConstructorReturn(this, (SHDropdown.__proto__ || Object.getPrototypeOf(SHDropdown)).apply(this, arguments));
  }

  _createClass(SHDropdown, [{
    key: 'ready',
    value: function ready() {
      _get(SHDropdown.prototype.__proto__ || Object.getPrototypeOf(SHDropdown.prototype), 'ready', this).call(this);
      this.addEventListener("clicked", function (e) {
        this.value = e.detail;
        this._updateElement();
        this._handleActive();
      });
    }
  }, {
    key: '_handleActive',
    value: function _handleActive() {
      this.active = !this.active;
    }
  }, {
    key: '_updateElement',
    value: function _updateElement() {
      var childElement = this.querySelectorAll("sh-menu-item[active]");
      for (var i = 0; i < childElement.length; i++) {
        childElement[i].removeAttribute("active");
      }
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-dropdown';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String,
          value: "Label"
        },
        value: {
          type: String,
          value: "",
          reflectToAttribute: true
        },
        active: {
          type: Boolean,
          value: false,
          reflectToAttribute: true,
          notify: true
        },
        role: {
          type: String,
          value: "listbox",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHDropdown;
}(Polymer.Element);

window.customElements.define(SHDropdown.is, SHDropdown);

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-grid> <template> <style include=shared-styles>:host,:host([spacing=\"s\"]){display:flex;flex-wrap:wrap;margin:-4px!important;width:calc(100% + 8px);height:calc(100% + 8px);overflow-y:hidden;position:relative}:host([fit-content]){min-height:fit-content!important;max-height:fit-content!important;overflow-y:visible!important}:host ::slotted(*),:host([spacing=\"s\"]) ::slotted(*){box-sizing:border-box;padding:4px!important}:host([spacing=\"m\"]){margin:-8px!important;width:calc(100% + 16px);height:calc(100% + 16px)}:host([spacing=\"m\"]) ::slotted(*){padding:8px!important}:host([spacing=\"l\"]){margin:-16px!important;width:calc(100% + 32px);height:calc(100% + 32px)}:host([spacing=\"l\"]) ::slotted(*){padding:16px!important}:host ::slotted([columns=\"12\"]){width:100%}:host ::slotted([columns=\"11\"]){width:calc((100% / 12) * 11)}:host ::slotted([columns=\"10\"]){width:calc((100% / 12) * 10)}:host ::slotted([columns=\"9\"]){width:calc((100% / 12) * 9)}:host ::slotted([columns=\"8\"]){width:calc((100% / 12) * 8)}:host ::slotted([columns=\"7\"]){width:calc((100% / 12) * 7)}:host ::slotted([columns=\"6\"]){width:calc((100% / 12) * 6)}:host ::slotted([columns=\"5\"]){width:calc((100% / 12) * 5)}:host ::slotted([columns=\"4\"]){width:calc((100% / 12) * 4)}:host ::slotted([columns=\"3\"]){width:calc((100% / 12) * 3)}:host ::slotted([columns=\"2\"]){width:calc((100% / 12) * 2)}:host ::slotted([columns=\"1\"]){width:calc((100% / 12) * 1)}:host ::slotted([columns=\"0\"]){width:0%}@media screen and (max-width:1280px){:host ::slotted([l=\"12\"]){width:100%}:host ::slotted([l=\"11\"]){width:calc((100% / 12) * 11)}:host ::slotted([l=\"10\"]){width:calc((100% / 12) * 10)}:host ::slotted([l=\"9\"]){width:calc((100% / 12) * 9)}:host ::slotted([l=\"8\"]){width:calc((100% / 12) * 8)}:host ::slotted([l=\"7\"]){width:calc((100% / 12) * 7)}:host ::slotted([l=\"6\"]){width:calc((100% / 12) * 6)}:host ::slotted([l=\"5\"]){width:calc((100% / 12) * 5)}:host ::slotted([l=\"4\"]){width:calc((100% / 12) * 4)}:host ::slotted([l=\"3\"]){width:calc((100% / 12) * 3)}:host ::slotted([l=\"2\"]){width:calc((100% / 12) * 2)}:host ::slotted([l=\"1\"]){width:calc((100% / 12) * 1)}:host ::slotted([l=\"0\"]){width:0%}}@media screen and (max-width:960px){:host ::slotted([m=\"12\"]){width:100%}:host ::slotted([m=\"11\"]){width:calc((100% / 12) * 11)}:host ::slotted([m=\"10\"]){width:calc((100% / 12) * 10)}:host ::slotted([m=\"9\"]){width:calc((100% / 12) * 9)}:host ::slotted([m=\"8\"]){width:calc((100% / 12) * 8)}:host ::slotted([m=\"7\"]){width:calc((100% / 12) * 7)}:host ::slotted([m=\"6\"]){width:calc((100% / 12) * 6)}:host ::slotted([m=\"5\"]){width:calc((100% / 12) * 5)}:host ::slotted([m=\"4\"]){width:calc((100% / 12) * 4)}:host ::slotted([m=\"3\"]){width:calc((100% / 12) * 3)}:host ::slotted([m=\"2\"]){width:calc((100% / 12) * 2)}:host ::slotted([m=\"1\"]){width:calc((100% / 12) * 1)}:host ::slotted([m=\"0\"]){width:0%}}@media screen and (max-width:768px){:host ::slotted([s=\"12\"]){width:100%}:host ::slotted([s=\"11\"]){width:calc((100% / 12) * 11)}:host ::slotted([s=\"10\"]){width:calc((100% / 12) * 10)}:host ::slotted([s=\"9\"]){width:calc((100% / 12) * 9)}:host ::slotted([s=\"8\"]){width:calc((100% / 12) * 8)}:host ::slotted([s=\"7\"]){width:calc((100% / 12) * 7)}:host ::slotted([s=\"6\"]){width:calc((100% / 12) * 6)}:host ::slotted([s=\"5\"]){width:calc((100% / 12) * 5)}:host ::slotted([s=\"4\"]){width:calc((100% / 12) * 4)}:host ::slotted([s=\"3\"]){width:calc((100% / 12) * 3)}:host ::slotted([s=\"2\"]){width:calc((100% / 12) * 2)}:host ::slotted([s=\"1\"]){width:calc((100% / 12) * 1)}:host ::slotted([s=\"0\"]){width:0%}}</style> <slot></slot> </template> </dom-module>");

var SHGrid = function (_Polymer$Element) {
  _inherits(SHGrid, _Polymer$Element);

  function SHGrid() {
    _classCallCheck(this, SHGrid);

    return _possibleConstructorReturn(this, (SHGrid.__proto__ || Object.getPrototypeOf(SHGrid)).apply(this, arguments));
  }

  _createClass(SHGrid, null, [{
    key: 'is',
    get: function get() {
      return 'sh-grid';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        fitContent: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        spacing: {
          type: String,
          value: "s",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHGrid;
}(Polymer.Element);

window.customElements.define(SHGrid.is, SHGrid);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-access-bar> <template> <style include=shared-styles>:host{background:var(--base-0);box-shadow:0 2px 4px var(--shadow-light);display:block;padding:0;z-index:4;height:72px}.access-wrapper{display:flex;width:100%;height:100%;padding:20px 16px;box-sizing:border-box}.logo{height:32px;min-width:136px;margin-right:40px;background-size:cover;background-image:var(--logo)}.label{max-width:240px;line-height:32px;font-size:15px;font-weight:300;color:var(--text-90);font-family:bree;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;text-transform:capitalize;margin-right:48px;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}.label[empty-label]{display:none}.patients-slot{flex:1;display:flex;flex-direction:row}#more-functions{padding-right:16px;margin:4px 0 4px 16px;display:none}#more-patients{padding:0 12px;display:none}#functions::slotted(*){margin:4px 0 4px 16px}:host #backButton{display:none}@media screen and (max-width:1280px){.patients-slot{flex:0;margin-right:auto}:host #backButton{display:none}}@media screen and (max-width:960px){.label{display:none}#functions::slotted(*){display:none}.access-wrapper #more-functions{display:block}.access-wrapper[empty-functions] #more-functions{display:none}.access-wrapper #more-patients{display:block}.access-wrapper[few-patients] #more-patients{display:none}.patients-slot ::slotted(*){display:none}.patients-slot ::slotted(sh-access-browser),.patients-slot ::slotted(sh-access-patient[active]){display:block}}@media screen and (max-width:768px){#user::slotted(*){display:none}}:host([mobile]) #backButton{display:inline-flex;margin:4px 16px 4px 0}:host([mobile]) .label{text-align:center;flex:1;margin-right:0;max-width:264px;display:block!important}:host([mobile]) .patients-slot{display:none}:host([mobile]) .logo{display:none}:host([mobile]) #functions::slotted(*){display:block!important}:host([mobile]) #more-functions{display:none!important}:host([embedded]) .logo{display:none}:host([condensed]){height:40px}:host([condensed]) .sh-access-wrapper{padding:8px 16px}:host([condensed]) .access-wrapper{padding:8px 16px}:host([condensed]) .logo{height:24px;min-width:104px}:host([condensed]) #functions::slotted(*){margin:0 0 0 16px!important}:host([condensed]) #patients::slotted(sh-access-browser){height:40px;margin:-8px 0;padding:8px 16px 6px 16px}:host([condensed]) #patients::slotted(sh-access-patient){height:40px;margin:-8px 0;padding:8px 30px 6px 16px;line-height:24px}:host([condensed]) #user::slotted(sh-access-user){height:40px;margin:-8px 0}:host([condensed]) #more-functions{margin:0 0 0 16px}:host(.web-access-bar) .access-wrapper{padding:33px 40px}:host(.web-access-bar) .logo{height:39px;width:166px}:host(.web-access-bar) .label{line-height:42px;font-size:16px}</style> <div class=access-wrapper empty-functions$=[[emptyFunctions]] empty-user$=[[emptyUser]] few-patients$=[[fewPatients]]> <div class=logo></div> <sh-icon button=\"\" id=backButton icon=arrow-left></sh-icon> <div class=label empty-label$=[[emptyLabel]]> [[label]] </div> <div class=patients-slot> <slot name=patients id=patients></slot> <sh-icon button=\"\" icon=more id=more-patients></sh-icon> </div> <slot name=functions id=functions></slot> <sh-icon button=\"\" icon=more-vertical id=more-functions></sh-icon> <slot name=user id=user></slot> </div> </template> </dom-module>");

var SHAccessBar = function (_Polymer$Element) {
  _inherits(SHAccessBar, _Polymer$Element);

  function SHAccessBar() {
    _classCallCheck(this, SHAccessBar);

    return _possibleConstructorReturn(this, (SHAccessBar.__proto__ || Object.getPrototypeOf(SHAccessBar)).apply(this, arguments));
  }

  _createClass(SHAccessBar, [{
    key: 'ready',
    value: function ready() {
      _get(SHAccessBar.prototype.__proto__ || Object.getPrototypeOf(SHAccessBar.prototype), 'ready', this).call(this);
      var functionsNodes = this.$.functions.assignedNodes({ flatten: true });
      if (functionsNodes == 0) {
        this.emptyFunctions = !this.emptyFunctions;
      };
      var userNodes = this.$.user.assignedNodes({ flatten: true });
      if (userNodes == 0) {
        this.emptyUser == !this.emptyUser;
      };
      var patientsNodes = this.$.patients.assignedNodes({ flatten: true });
      if (patientsNodes == 0) {
        this.fewPatients = !this.fewPatients;
        // console.log(patientsNodes);
      };
      if (this.label == undefined) {
        this.emptyLabel = !this.emptyLabel;
      }
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-access-bar';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String
        },
        mobile: {
          type: Boolean,
          value: false
        },
        condensed: {
          type: Boolean,
          value: false
        },
        embedded: {
          type: Boolean,
          value: false
        },
        emptyLabel: {
          type: Boolean,
          value: false
        },
        emptyFunctions: {
          type: Boolean,
          value: false
        },
        emptyUser: {
          type: Boolean,
          value: false
        },
        fewPatients: {
          type: Boolean,
          value: false
        }
      };
    }
  }]);

  return SHAccessBar;
}(Polymer.Element);

window.customElements.define(SHAccessBar.is, SHAccessBar);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-access-browser> <template> <style include=shared-styles>:host{margin:-20px 0;height:72px;padding:24px 16px 22px 16px;box-sizing:border-box;border-bottom:2px solid transparent;cursor:pointer;transition:.2s all ease-in-out}sh-icon{color:var(--text-55)}:host([active]){border-bottom:2px solid var(--primary-color)}:host([active]) sh-icon{color:var(--text-90)}</style> <sh-icon icon=patient-browser></sh-icon> </template> </dom-module>");

var SHAccessBrowser = function (_Polymer$Element) {
  _inherits(SHAccessBrowser, _Polymer$Element);

  function SHAccessBrowser() {
    _classCallCheck(this, SHAccessBrowser);

    return _possibleConstructorReturn(this, (SHAccessBrowser.__proto__ || Object.getPrototypeOf(SHAccessBrowser)).apply(this, arguments));
  }

  _createClass(SHAccessBrowser, null, [{
    key: 'is',
    get: function get() {
      return 'sh-access-browser';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        active: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHAccessBrowser;
}(Polymer.Element);

window.customElements.define(SHAccessBrowser.is, SHAccessBrowser);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-access-patient> <template> <style include=shared-styles>:host{height:72px;max-width:160px;width:fit-content;margin:-20px 0;display:flex;flex-direction:column;padding:20px 32px 18px 16px;border-bottom:2px solid transparent;box-sizing:border-box;line-height:16px;text-transform:capitalize;cursor:pointer;transition:.2s all ease-in-out;position:relative;color:var(--text-90);overflow:hidden;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host([active]){border-bottom:2px solid var(--primary-color)}:host(:hover) .name,:host([active]) .name{color:var(--text-90)}.info,.name{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;width:100%;font-size:14px;font-family:Calibri}.name{transition:.2s all ease-in-out;color:var(--text-55);font-weight:700}.info{color:var(--text-20);transition:.2s all ease-in-out}:host(:hover) .info,:host([active]) .info{color:var(--text-55)}:host sh-icon#close{position:absolute;top:0;right:4px;opacity:0;visibility:hidden;transition:.2s all ease-in-out}:host(:hover) sh-icon#close{top:4px;opacity:.4;visibility:visible}:host([condensed]) .info{display:none}</style> <div class=name>[[name]]</div> <div class=info>[[info]]</div> <sh-icon icon=close id=close></sh-icon> </template> </dom-module>");

var SHAccessPatient = function (_Polymer$Element) {
  _inherits(SHAccessPatient, _Polymer$Element);

  function SHAccessPatient() {
    _classCallCheck(this, SHAccessPatient);

    return _possibleConstructorReturn(this, (SHAccessPatient.__proto__ || Object.getPrototypeOf(SHAccessPatient)).apply(this, arguments));
  }

  _createClass(SHAccessPatient, [{
    key: 'ready',
    value: function ready() {
      _get(SHAccessPatient.prototype.__proto__ || Object.getPrototypeOf(SHAccessPatient.prototype), 'ready', this).call(this);
      if (this.parentElement.condensed == true) {
        this.setAttribute("condensed", "true");
      }
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-access-patient';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        name: {
          type: String
        },
        info: {
          type: String
        },
        active: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        condensed: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHAccessPatient;
}(Polymer.Element);

window.customElements.define(SHAccessPatient.is, SHAccessPatient);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-access-user> <template> <style include=shared-styles>:host{display:flex;flex-direction:row;height:72px;margin:-20px 0;cursor:pointer}.image{height:40px;width:40px;margin:16px 0 16px 16px;border-radius:50%;background-size:cover}.info-wrapper{max-width:160px;flex-direction:column;padding:20px 0 20px 16px}:host([image-only]) .info-wrapper{display:none}.info,.name{max-width:100%;line-height:16px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:14px;font-family:Calibri;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}.name{color:var(--text-90);font-weight:700}.info{color:var(--text-55)}@media screen and (max-width:1280px){.info-wrapper{display:none}}:host([condensed]) .info-wrapper{display:none}:host([condensed]) .image{height:24px;width:24px;margin:8px 0 8px 16px}</style> <div class=image style$=background-image:url([[image]])></div> <div class=info-wrapper> <div class=name>[[name]]</div> <div class=info>[[info]]</div> </div> </template> </dom-module>");

var SHAccessUser = function (_Polymer$Element) {
  _inherits(SHAccessUser, _Polymer$Element);

  function SHAccessUser() {
    _classCallCheck(this, SHAccessUser);

    return _possibleConstructorReturn(this, (SHAccessUser.__proto__ || Object.getPrototypeOf(SHAccessUser)).apply(this, arguments));
  }

  _createClass(SHAccessUser, [{
    key: 'ready',
    value: function ready() {
      _get(SHAccessUser.prototype.__proto__ || Object.getPrototypeOf(SHAccessUser.prototype), 'ready', this).call(this);
      if (this.parentElement.condensed == true) {
        this.setAttribute("condensed", "true");
      }
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-access-user';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        image: {
          type: String,
          value: "https://upload.wikimedia.org/wikipedia/commons/d/db/Ernst_Werner_von_Siemens.jpg"
        },
        name: {
          type: String,
          value: "User Name"
        },
        info: {
          type: String,
          value: "Siemens Healthineers"
        },
        imageOnly: {
          type: Boolean,
          value: false
        },
        condensed: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHAccessUser;
}(Polymer.Element);

window.customElements.define(SHAccessUser.is, SHAccessUser);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _format = __webpack_require__(39);

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-icon> <template> <style include=shared-styles>:host(.empty){display:none}:host{display:inline-flex;max-height:fit-content;max-width:fit-content;color:var(--text-100);transition:.2s all ease-in-out}:host([size=xs]) .icon-wrapper{font-size:16px;line-height:16px;min-height:16px;min-width:16px}:host([size=\"s\"]) .icon-wrapper{font-size:24px;line-height:24px;min-height:24px;min-width:24px}:host([size=\"m\"]) .icon-wrapper{font-size:32px;line-height:32px;min-height:32px;min-width:32px}:host([size=\"l\"]) .icon-wrapper{font-size:48px;line-height:48px;min-height:48px;min-width:48px}.icon-wrapper{font-family:'Material Icons';font-weight:400;font-style:normal;font-size:24px;line-height:24px;min-height:24px;min-width:24px;min-height:24px;min-width:24px;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr;vertical-align:middle;display:inline-flex;justify-content:center;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:'liga';transition:.2s all ease-in-out}:host([button]){color:var(--text-55);cursor:pointer}:host([button]:hover){color:var(--text-90)}.icon-wrapper.icon-{display:none}.arrow-down:before{font-family:sh-icons!important;content:\"\\61\"}.camera:before{font-family:sh-icons!important;content:\"\\62\"}.cancel:before{font-family:sh-icons!important;content:\"\\63\"}.delete:before{font-family:sh-icons!important;content:\"\\64\"}.drop-down:before{font-family:sh-icons!important;content:\"\\65\"}.help:before{font-family:sh-icons!important;content:\"\\66\"}.layout-1x1:before{font-family:sh-icons!important;content:\"\\67\"}.layout-2x1:before{font-family:sh-icons!important;content:\"\\68\"}.layout-2x2:before{font-family:sh-icons!important;content:\"\\69\"}.layout-mpr:before{font-family:sh-icons!important;content:\"\\6a\"}.marker:before{font-family:sh-icons!important;content:\"\\6b\"}.more:before{font-family:sh-icons!important;content:\"\\6c\"}.pan:before{font-family:sh-icons!important;content:\"\\6d\"}.window:before{font-family:sh-icons!important;content:\"\\6e\"}.undo:before{font-family:sh-icons!important;content:\"\\6f\"}.settings:before{font-family:sh-icons!important;content:\"\\70\"}.scroll:before{font-family:sh-icons!important;content:\"\\71\"}.ruler:before{font-family:sh-icons!important;content:\"\\72\"}.rotate-3d:before{font-family:sh-icons!important;content:\"\\73\"}.pencil:before{font-family:sh-icons!important;content:\"\\74\"}.patient-browser:before{font-family:sh-icons!important;content:\"\\75\"}.apps:before{content:\"apps\"}.center:before{content:\"adjust\"}.study:before{content:\"\\E2C7\"}.patient:before{content:\"folder_shared\"}.arrow-up:before{content:'\\E316'}.arrow-left:before{content:\"\\E314\"}.arrow-right:before{content:\"\\E315\"}.drop-up:before{content:\"\\E5C7\"}.close:before{content:\"\\E5CD\"}.search:before{content:\"\\E8B6\"}.add-library:before{content:\"\\E02E\"}.zoom-in:before{content:\"\\E8FF\"}.zoom-out:before{content:\"\\E900\"}.plus:before{content:\"\\E145\"}.minus:before{content:\"\\E15B\"}.upload:before{content:\"\\E2C6\"}.download:before{content:\"\\E2C4\"}.check::before{content:\"\\E86C\"}.info:before{content:\"\\E88E\"}.plus-circle:before{content:\"\\E147\"}.plus-circle-outline:before{content:\"add_circle_outline\"}.minus-circle:before{content:\"\\E15C\"}.minus-circle-outline:before{content:\"remove_circle_outline\"}.date-range:before{content:\"\\E916\"}.avatar:before{content:\"\\E7FD\"}.fullscreen:before{content:\"fullscreen\"}.open-in-browser:before{content:\"open_in_browser\"}.exit:before{content:\"exit_to_app\"}.message:before{content:\"message\"}.bug:before{content:\"bug_report\"}.tools:before{content:\"build\"}.body:before{content:\"accessibility\"}.issue:before{content:\"announcement\"}.enlarge:before{content:\"aspect_ratio\"}.chart:before{content:\"assessment\"}.pie-chart:before{content:\"pie_chart\"}.graph:before{content:\"timeline\"}.bubble-chart:before{content:\"bubble_chart\"}.report:before{content:\"assignment\"}.patient-info:before{content:\"assignment_ind\"}.refresh:before{content:\"cached\"}.backup:before{content:\"backup\"}.bookmark:before{content:\"bookmark\"}.code:before{content:\"code\"}.dashboard:before{content:\"dashboard\"}.date:before{content:\"date_range\"}.document:before{content:\"description\"}.new-document:before{content:\"note_add\"}.extension:before{content:\"extension\"}.heart:before{content:\"favorite\"}.heart-outline:before{content:\"favorite_border\"}.foreground:before{content:\"flip_to_back\"}.background:before{content:\"flip_to_front\"}.star:before{content:\"star\"}.star-outline:before{content:\"star_border\"}.help-outline:before{content:\"help_outline\"}.clear:before{content:\"highlight_off\"}.revert:before{content:\"history\"}.home:before{content:\"home\"}.hourglass:before{content:\"hourglass_full\"}.hourglass-outline:before{content:\"hourglass_empty\"}.lock:before{content:\"lock_outline\"}.unlock:before{content:\"lock_open\"}.color:before{content:\"color_lens\"}.label:before{content:\"label\"}.launch:before{content:\"launch\"}.list:before{content:\"list\"}.hand:before{content:\"pan_tool\"}.power:before{content:\"power_settings_new\"}.print:before{content:\"print\"}.clock:before{content:\"schedule\"}.chat:before{content:\"question_answer\"}.voice:before{content:\"record_voice_over\"}.location:before{content:\"room\"}.revert:before{content:\"settings_backup_restore\"}.users:before{content:\"supervisor_account\"}.swap-horizontal:before{content:\"swap_horiz\"}.swap-vertical:before{content:\"swap_vert\"}.film:before{content:\"theaters\"}.touch:before{content:\"touch_app\"}.radar:before{content:\"track_changes\"}.arrow:before{content:\"trending_flat\"}.row:before{content:\"view_stream\"}.column:before{content:\"view_stream\"}.grid:before{content:\"view_module\"}.layout:before{content:\"view_quilt\"}.show:before{content:\"visibility\"}.hide:before{content:\"visibility_off\"}.forward:before{content:\"fast_forward\"}.rewind:before{content:\"fast_rewind\"}.next:before{content:\"skip_next\"}.previous:before{content:\"skip_previous\"}.record:before{content:\"fiber_manual_record\"}.hd:before{content:\"hd\"}.pause:before{content:\"pause\"}.play:before{content:\"play_arrow\"}.block:before{content:\"not_interested\"}.new:before{content:\"new_releases\"}.videos:before{content:\"video_library\"}.sound:before{content:\"volume_up\"}.mute:before{content:\"volume_off\"}.merge:before{content:\"call_merge\"}.email:before{content:\"email\"}.redo:before{content:\"redo\"}.cut:before{content:\"content_cut\"}.edit:before{content:\"create\"}.filter:before{content:\"filter_list\"}.text:before{content:\"font_download\"}.link:before{content:\"link\"}.save:before{content:\"save\"}.send:before{content:\"send\"}.brightness:before{content:\"brightness_low\"}.attach:before{content:\"attach_file\"}.pay:before{content:\"attach_money\"}.guides:before{content:\"\\E228\"}.new-folder:before{content:\"create_new_folder\"}.keyboard:before{content:\"keyboard\"}.mouse:before{content:\"mouse\"}.brush:before{content:\"brush\"}.focus:before{content:\"center_focus_strong\"}.clip:before{content:\"flip\"}.gradient:before{content:\"gradient\"}.grain:before{content:\"grain\"}.preset:before{content:\"style\"}.tune:before{content:\"tune\"}.crop:before{content:\"transform\"}.light:before{content:\"wb_incandescent\"}.layer:before{content:\"layers\"}.fit:before{content:\"zoom_out_map\"}.point-left:before{content:\"arrow_back\"}.point-right:before{content:\"arrow_forward\"}.point-down:before{content:\"arrow_downward\"}.point-up:before{content:\"arrow_upward\"}.menu:before{content:\"menu\"}.more-vertical:before{content:\"more_vert\"}.alert:before{content:\"priority_high\"}.gender:before{content:\"wc\"}.notification:before{content:\"notifications\"}.share:before{content:\"share\"}.checked:before{content:\"check_box\"}.unchecked:before{content:\"check_box_outline_blank\"}.done:before{content:\"check\"}.blood:before{content:\"opacity\"}.star:before{content:\"star\"}</style> <div class$=\"icon-wrapper icon-[[icon]] [[icon]]\" style$=color:[[color]]></div> </template> </dom-module>");

var SHIcon = function (_Polymer$Element) {
  _inherits(SHIcon, _Polymer$Element);

  function SHIcon() {
    _classCallCheck(this, SHIcon);

    return _possibleConstructorReturn(this, (SHIcon.__proto__ || Object.getPrototypeOf(SHIcon)).apply(this, arguments));
  }

  _createClass(SHIcon, null, [{
    key: 'is',
    get: function get() {
      return 'sh-icon';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        icon: {
          type: String,
          value: "close"
        },
        button: {
          type: Boolean,
          value: false
        },
        color: {
          type: String
        },
        size: {
          type: String,
          value: "s"
        }
      };
    }
  }]);

  return SHIcon;
}(Polymer.Element);

window.customElements.define(SHIcon.is, SHIcon);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDayOfYear = __webpack_require__(40);
var getISOWeek = __webpack_require__(44);
var getISOYear = __webpack_require__(13);
var parse = __webpack_require__(4);
var isValid = __webpack_require__(47);
var enLocale = __webpack_require__(48);

/**
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format.
 *
 * Accepted tokens:
 * | Unit                    | Token | Result examples                  |
 * |-------------------------|-------|----------------------------------|
 * | Month                   | M     | 1, 2, ..., 12                    |
 * |                         | Mo    | 1st, 2nd, ..., 12th              |
 * |                         | MM    | 01, 02, ..., 12                  |
 * |                         | MMM   | Jan, Feb, ..., Dec               |
 * |                         | MMMM  | January, February, ..., December |
 * | Quarter                 | Q     | 1, 2, 3, 4                       |
 * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Day of month            | D     | 1, 2, ..., 31                    |
 * |                         | Do    | 1st, 2nd, ..., 31st              |
 * |                         | DD    | 01, 02, ..., 31                  |
 * | Day of year             | DDD   | 1, 2, ..., 366                   |
 * |                         | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         | DDDD  | 001, 002, ..., 366               |
 * | Day of week             | d     | 0, 1, ..., 6                     |
 * |                         | do    | 0th, 1st, ..., 6th               |
 * |                         | dd    | Su, Mo, ..., Sa                  |
 * |                         | ddd   | Sun, Mon, ..., Sat               |
 * |                         | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | E     | 1, 2, ..., 7                     |
 * | ISO week                | W     | 1, 2, ..., 53                    |
 * |                         | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         | WW    | 01, 02, ..., 53                  |
 * | Year                    | YY    | 00, 01, ..., 99                  |
 * |                         | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
 * |                         | GGGG  | 1900, 1901, ..., 2099            |
 * | AM/PM                   | A     | AM, PM                           |
 * |                         | a     | am, pm                           |
 * |                         | aa    | a.m., p.m.                       |
 * | Hour                    | H     | 0, 1, ... 23                     |
 * |                         | HH    | 00, 01, ... 23                   |
 * |                         | h     | 1, 2, ..., 12                    |
 * |                         | hh    | 01, 02, ..., 12                  |
 * | Minute                  | m     | 0, 1, ..., 59                    |
 * |                         | mm    | 00, 01, ..., 59                  |
 * | Second                  | s     | 0, 1, ..., 59                    |
 * |                         | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | SSS   | 000, 001, ..., 999               |
 * | Timezone                | Z     | -01:00, +00:00, ... +12:00       |
 * |                         | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | X     | 512969520                        |
 * | Milliseconds timestamp  | x     | 512969520900                     |
 *
 * The characters wrapped in square brackets are escaped.
 *
 * The result may vary by locale.
 *
 * @param {Date|String|Number} date - the original date
 * @param {String} [format='YYYY-MM-DDTHH:mm:ss.SSSZ'] - the string of tokens
 * @param {Object} [options] - the object with options
 * @param {Object} [options.locale=enLocale] - the locale object
 * @returns {String} the formatted date string
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(
 *   new Date(2014, 1, 11),
 *   'MM/DD/YYYY'
 * )
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * var eoLocale = require('date-fns/locale/eo')
 * var result = format(
 *   new Date(2014, 6, 2),
 *   'Do [de] MMMM YYYY',
 *   {locale: eoLocale}
 * )
 * //=> '2-a de julio 2014'
 */
function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
  var formatStr = dirtyFormatStr ? String(dirtyFormatStr) : 'YYYY-MM-DDTHH:mm:ss.SSSZ';
  var options = dirtyOptions || {};

  var locale = options.locale;
  var localeFormatters = enLocale.format.formatters;
  var formattingTokensRegExp = enLocale.format.formattingTokensRegExp;
  if (locale && locale.format && locale.format.formatters) {
    localeFormatters = locale.format.formatters;

    if (locale.format.formattingTokensRegExp) {
      formattingTokensRegExp = locale.format.formattingTokensRegExp;
    }
  }

  var date = parse(dirtyDate);

  if (!isValid(date)) {
    return 'Invalid Date';
  }

  var formatFn = buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp);

  return formatFn(date);
}

var formatters = {
  // Month: 1, 2, ..., 12
  'M': function M(date) {
    return date.getMonth() + 1;
  },

  // Month: 01, 02, ..., 12
  'MM': function MM(date) {
    return addLeadingZeros(date.getMonth() + 1, 2);
  },

  // Quarter: 1, 2, 3, 4
  'Q': function Q(date) {
    return Math.ceil((date.getMonth() + 1) / 3);
  },

  // Day of month: 1, 2, ..., 31
  'D': function D(date) {
    return date.getDate();
  },

  // Day of month: 01, 02, ..., 31
  'DD': function DD(date) {
    return addLeadingZeros(date.getDate(), 2);
  },

  // Day of year: 1, 2, ..., 366
  'DDD': function DDD(date) {
    return getDayOfYear(date);
  },

  // Day of year: 001, 002, ..., 366
  'DDDD': function DDDD(date) {
    return addLeadingZeros(getDayOfYear(date), 3);
  },

  // Day of week: 0, 1, ..., 6
  'd': function d(date) {
    return date.getDay();
  },

  // Day of ISO week: 1, 2, ..., 7
  'E': function E(date) {
    return date.getDay() || 7;
  },

  // ISO week: 1, 2, ..., 53
  'W': function W(date) {
    return getISOWeek(date);
  },

  // ISO week: 01, 02, ..., 53
  'WW': function WW(date) {
    return addLeadingZeros(getISOWeek(date), 2);
  },

  // Year: 00, 01, ..., 99
  'YY': function YY(date) {
    return addLeadingZeros(date.getFullYear(), 4).substr(2);
  },

  // Year: 1900, 1901, ..., 2099
  'YYYY': function YYYY(date) {
    return addLeadingZeros(date.getFullYear(), 4);
  },

  // ISO week-numbering year: 00, 01, ..., 99
  'GG': function GG(date) {
    return String(getISOYear(date)).substr(2);
  },

  // ISO week-numbering year: 1900, 1901, ..., 2099
  'GGGG': function GGGG(date) {
    return getISOYear(date);
  },

  // Hour: 0, 1, ... 23
  'H': function H(date) {
    return date.getHours();
  },

  // Hour: 00, 01, ..., 23
  'HH': function HH(date) {
    return addLeadingZeros(date.getHours(), 2);
  },

  // Hour: 1, 2, ..., 12
  'h': function h(date) {
    var hours = date.getHours();
    if (hours === 0) {
      return 12;
    } else if (hours > 12) {
      return hours % 12;
    } else {
      return hours;
    }
  },

  // Hour: 01, 02, ..., 12
  'hh': function hh(date) {
    return addLeadingZeros(formatters['h'](date), 2);
  },

  // Minute: 0, 1, ..., 59
  'm': function m(date) {
    return date.getMinutes();
  },

  // Minute: 00, 01, ..., 59
  'mm': function mm(date) {
    return addLeadingZeros(date.getMinutes(), 2);
  },

  // Second: 0, 1, ..., 59
  's': function s(date) {
    return date.getSeconds();
  },

  // Second: 00, 01, ..., 59
  'ss': function ss(date) {
    return addLeadingZeros(date.getSeconds(), 2);
  },

  // 1/10 of second: 0, 1, ..., 9
  'S': function S(date) {
    return Math.floor(date.getMilliseconds() / 100);
  },

  // 1/100 of second: 00, 01, ..., 99
  'SS': function SS(date) {
    return addLeadingZeros(Math.floor(date.getMilliseconds() / 10), 2);
  },

  // Millisecond: 000, 001, ..., 999
  'SSS': function SSS(date) {
    return addLeadingZeros(date.getMilliseconds(), 3);
  },

  // Timezone: -01:00, +00:00, ... +12:00
  'Z': function Z(date) {
    return formatTimezone(date.getTimezoneOffset(), ':');
  },

  // Timezone: -0100, +0000, ... +1200
  'ZZ': function ZZ(date) {
    return formatTimezone(date.getTimezoneOffset());
  },

  // Seconds timestamp: 512969520
  'X': function X(date) {
    return Math.floor(date.getTime() / 1000);
  },

  // Milliseconds timestamp: 512969520900
  'x': function x(date) {
    return date.getTime();
  }
};

function buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp) {
  var array = formatStr.match(formattingTokensRegExp);
  var length = array.length;

  var i;
  var formatter;
  for (i = 0; i < length; i++) {
    formatter = localeFormatters[array[i]] || formatters[array[i]];
    if (formatter) {
      array[i] = formatter;
    } else {
      array[i] = removeFormattingTokens(array[i]);
    }
  }

  return function (date) {
    var output = '';
    for (var i = 0; i < length; i++) {
      if (array[i] instanceof Function) {
        output += array[i](date, formatters);
      } else {
        output += array[i];
      }
    }
    return output;
  };
}

function removeFormattingTokens(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '');
  }
  return input.replace(/\\/g, '');
}

function formatTimezone(offset, delimeter) {
  delimeter = delimeter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2);
}

function addLeadingZeros(number, targetLength) {
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return output;
}

module.exports = format;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parse = __webpack_require__(4);
var startOfYear = __webpack_require__(41);
var differenceInCalendarDays = __webpack_require__(42);

/**
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * var result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear(dirtyDate) {
  var date = parse(dirtyDate);
  var diff = differenceInCalendarDays(date, startOfYear(date));
  var dayOfYear = diff + 1;
  return dayOfYear;
}

module.exports = getDayOfYear;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parse = __webpack_require__(4);

/**
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * var result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear(dirtyDate) {
  var cleanDate = parse(dirtyDate);
  var date = new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = startOfYear;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var startOfDay = __webpack_require__(43);

var MILLISECONDS_IN_MINUTE = 60000;
var MILLISECONDS_IN_DAY = 86400000;

/**
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 */
function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);

  var timestampLeft = startOfDayLeft.getTime() - startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  var timestampRight = startOfDayRight.getTime() - startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

module.exports = differenceInCalendarDays;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parse = __webpack_require__(4);

/**
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(dirtyDate) {
  var date = parse(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = startOfDay;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parse = __webpack_require__(4);
var startOfISOWeek = __webpack_require__(9);
var startOfISOYear = __webpack_require__(46);

var MILLISECONDS_IN_WEEK = 604800000;

/**
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the given date
 * @returns {Number} the ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * var result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek(dirtyDate) {
  var date = parse(dirtyDate);
  var diff = startOfISOWeek(date).getTime() - startOfISOYear(date).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

module.exports = getISOWeek;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parse = __webpack_require__(4);

/**
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Object} [options] - the object with options
 * @param {Number} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? Number(dirtyOptions.weekStartsOn) || 0 : 0;

  var date = parse(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

module.exports = startOfWeek;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getISOYear = __webpack_require__(13);
var startOfISOWeek = __webpack_require__(9);

/**
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param {Date|String|Number} date - the original date
 * @returns {Date} the start of an ISO year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * var result = startOfISOYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOYear(dirtyDate) {
  var year = getISOYear(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = startOfISOWeek(fourthOfJanuary);
  return date;
}

module.exports = startOfISOYear;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isDate = __webpack_require__(12);

/**
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {Date} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} argument must be an instance of Date
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */
function isValid(dirtyDate) {
  if (isDate(dirtyDate)) {
    return !isNaN(dirtyDate);
  } else {
    throw new TypeError(toString.call(dirtyDate) + ' is not an instance of Date');
  }
}

module.exports = isValid;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildDistanceInWordsLocale = __webpack_require__(49);
var buildFormatLocale = __webpack_require__(50);

/**
 * @category Locales
 * @summary English locale.
 */
module.exports = {
  distanceInWords: buildDistanceInWordsLocale(),
  format: buildFormatLocale()
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function buildDistanceInWordsLocale() {
  var distanceInWordsLocale = {
    lessThanXSeconds: {
      one: 'less than a second',
      other: 'less than {{count}} seconds'
    },

    xSeconds: {
      one: '1 second',
      other: '{{count}} seconds'
    },

    halfAMinute: 'half a minute',

    lessThanXMinutes: {
      one: 'less than a minute',
      other: 'less than {{count}} minutes'
    },

    xMinutes: {
      one: '1 minute',
      other: '{{count}} minutes'
    },

    aboutXHours: {
      one: 'about 1 hour',
      other: 'about {{count}} hours'
    },

    xHours: {
      one: '1 hour',
      other: '{{count}} hours'
    },

    xDays: {
      one: '1 day',
      other: '{{count}} days'
    },

    aboutXMonths: {
      one: 'about 1 month',
      other: 'about {{count}} months'
    },

    xMonths: {
      one: '1 month',
      other: '{{count}} months'
    },

    aboutXYears: {
      one: 'about 1 year',
      other: 'about {{count}} years'
    },

    xYears: {
      one: '1 year',
      other: '{{count}} years'
    },

    overXYears: {
      one: 'over 1 year',
      other: 'over {{count}} years'
    },

    almostXYears: {
      one: 'almost 1 year',
      other: 'almost {{count}} years'
    }
  };

  function localize(token, count, options) {
    options = options || {};

    var result;
    if (typeof distanceInWordsLocale[token] === 'string') {
      result = distanceInWordsLocale[token];
    } else if (count === 1) {
      result = distanceInWordsLocale[token].one;
    } else {
      result = distanceInWordsLocale[token].other.replace('{{count}}', count);
    }

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result;
      } else {
        return result + ' ago';
      }
    }

    return result;
  }

  return {
    localize: localize
  };
}

module.exports = buildDistanceInWordsLocale;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildFormattingTokensRegExp = __webpack_require__(51);

function buildFormatLocale() {
  // Note: in English, the names of days of the week and months are capitalized.
  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
  // Generally, formatted dates should look like they are in the middle of a sentence,
  // e.g. in Spanish language the weekdays and months should be in the lowercase.
  var months3char = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var weekdays2char = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  var weekdays3char = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var meridiemUppercase = ['AM', 'PM'];
  var meridiemLowercase = ['am', 'pm'];
  var meridiemFull = ['a.m.', 'p.m.'];

  var formatters = {
    // Month: Jan, Feb, ..., Dec
    'MMM': function MMM(date) {
      return months3char[date.getMonth()];
    },

    // Month: January, February, ..., December
    'MMMM': function MMMM(date) {
      return monthsFull[date.getMonth()];
    },

    // Day of week: Su, Mo, ..., Sa
    'dd': function dd(date) {
      return weekdays2char[date.getDay()];
    },

    // Day of week: Sun, Mon, ..., Sat
    'ddd': function ddd(date) {
      return weekdays3char[date.getDay()];
    },

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': function dddd(date) {
      return weekdaysFull[date.getDay()];
    },

    // AM, PM
    'A': function A(date) {
      return date.getHours() / 12 >= 1 ? meridiemUppercase[1] : meridiemUppercase[0];
    },

    // am, pm
    'a': function a(date) {
      return date.getHours() / 12 >= 1 ? meridiemLowercase[1] : meridiemLowercase[0];
    },

    // a.m., p.m.
    'aa': function aa(date) {
      return date.getHours() / 12 >= 1 ? meridiemFull[1] : meridiemFull[0];
    }

    // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
  };var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W'];
  ordinalFormatters.forEach(function (formatterToken) {
    formatters[formatterToken + 'o'] = function (date, formatters) {
      return ordinal(formatters[formatterToken](date));
    };
  });

  return {
    formatters: formatters,
    formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
  };
}

function ordinal(number) {
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';
      case 2:
        return number + 'nd';
      case 3:
        return number + 'rd';
    }
  }
  return number + 'th';
}

module.exports = buildFormatLocale;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var commonFormatterKeys = ['M', 'MM', 'Q', 'D', 'DD', 'DDD', 'DDDD', 'd', 'E', 'W', 'WW', 'YY', 'YYYY', 'GG', 'GGGG', 'H', 'HH', 'h', 'hh', 'm', 'mm', 's', 'ss', 'S', 'SS', 'SSS', 'Z', 'ZZ', 'X', 'x'];

function buildFormattingTokensRegExp(formatters) {
  var formatterKeys = [];
  for (var key in formatters) {
    if (formatters.hasOwnProperty(key)) {
      formatterKeys.push(key);
    }
  }

  var formattingTokens = commonFormatterKeys.concat(formatterKeys).sort().reverse();
  var formattingTokensRegExp = new RegExp('(\\[[^\\[]*\\])|(\\\\)?' + '(' + formattingTokens.join('|') + '|.)', 'g');

  return formattingTokensRegExp;
}

module.exports = buildFormattingTokensRegExp;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-input-number> <template> <style include=shared-styles>:host{width:100%;min-height:fit-content;position:relative;display:flex;flex-direction:row}.input-number-label{color:var(--text-55);position:absolute;top:4px;left:8px;width:calc(100% - 16px);transition:.2s all ease-in-out;line-height:16px;pointer-events:none;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host([value=\"\"]) .input-number-label{top:9px;line-height:24px;font-size:14px}:host([readonly]) input:focus,input{outline:0;border:none;font-family:Calibri,sans-serif;font-size:14px;line-height:24px;color:var(--text-90);background:var(--highlight-5);border-radius:2px;width:100%;box-sizing:border-box;padding:16px 8px 0 8px;transition:.2s all ease-in-out;font-weight:300;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host(:not([readonly])) input:hover:not(:focus){background:var(--highlight-10)}input:focus{outline:0;padding:16px 8px 0 8px!important}:host(:not([condensed])) input:focus+.input-number-label{top:4px!important;font-size:12px!important;line-height:16px!important;color:var(--primary-color)}:host([readonly]) .textarea:focus+.input-number-label,:host([readonly]) input:focus+.textarea+.input-number-label{color:var(--text-20)}:host([value=\"\"]) input{padding:8px}:host([disabled]) input,:host([readonly]) input{cursor:default;resize:none!important;pointer-events:none}.content-wrapper{display:flex;flex-direction:column;width:100%;position:relative}:host([condensed]) .input-number-label{display:none}:host([value=\"\"][condensed]) .input-number-label{display:block!important;top:1px!important;font-size:14px!important}:host([condensed]) input,:host([condensed]) input:focus{padding:0 8px!important}:host([disabled]) .input-number-label,:host([disabled]) input{color:var(--text-20)!important}input::-webkit-inner-spin-button{display:none}.icon-slot{display:inline-flex;position:absolute;top:8px;right:8px}:host([readonly]) .icon-slot{display:none}:host([disabled]) .icon-slot>*{pointer-events:none;color:var(--text-20)}</style> <div class=content-wrapper> <input type=number value={{value::input}} min=[[min]] max=[[max]] step=[[step]]> <div class=input-number-label>[[label]]</div> <div class=icon-slot> <sh-icon button=\"\" icon=minus id=minus on-click=_handleMinus></sh-icon> <sh-icon button=\"\" icon=plus id=plus on-click=_handlePlus></sh-icon> </div> </div> </template> </dom-module>");

var SHInputNumber = function (_Polymer$Element) {
  _inherits(SHInputNumber, _Polymer$Element);

  function SHInputNumber() {
    _classCallCheck(this, SHInputNumber);

    return _possibleConstructorReturn(this, (SHInputNumber.__proto__ || Object.getPrototypeOf(SHInputNumber)).apply(this, arguments));
  }

  _createClass(SHInputNumber, [{
    key: '_handlePlus',
    value: function _handlePlus() {
      this.value = Number(this.value) + Number(this.step);
    }
  }, {
    key: '_handleMinus',
    value: function _handleMinus() {
      this.value = Number(this.value) - Number(this.step);
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-input-number';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String,
          value: "Label"
        },
        value: {
          type: String,
          value: "",
          reflectToAttribute: true
        },
        min: {
          type: String,
          reflectToAttribute: true
        },
        max: {
          type: String,
          reflectToAttribute: true
        },
        step: {
          type: String,
          value: "1",
          reflectToAttribute: true
        },
        readonly: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        disabled: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        role: {
          type: String,
          value: "textbox",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHInputNumber;
}(Polymer.Element);

window.customElements.define(SHInputNumber.is, SHInputNumber);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-input-text> <template> <style include=shared-styles>:host{width:100%;min-height:fit-content;position:relative;display:flex;flex-direction:row}.input-text-label{color:var(--text-55);position:absolute;top:4px;left:8px;width:calc(100% - 16px);transition:.2s all ease-in-out;line-height:16px;pointer-events:none;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host([value=\"\"]) .input-text-label{top:9px;line-height:24px;font-size:14px}:host([readonly]) input:focus,input{outline:0;border:none;font-family:Calibri,sans-serif;font-size:14px;line-height:24px;color:var(--text-90);background:var(--highlight-5);border-radius:2px;width:100%;box-sizing:border-box;padding:16px 8px 0 8px;transition:.2s all ease-in-out;font-weight:300;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host(:not([readonly])) .textarea:hover:not(:focus),:host(:not([readonly])) input:hover:not(:focus){background:var(--highlight-10)}input:focus{outline:0;padding:16px 8px 0 8px!important}:host(:not([condensed])) .textarea:focus+.input-text-label,:host(:not([condensed])) input:focus+.textarea+.input-text-label{top:4px!important;font-size:12px!important;line-height:16px!important;color:var(--primary-color)}:host([readonly]) .textarea:focus+.input-text-label,:host([readonly]) input:focus+.textarea+.input-text-label{color:var(--text-20)}:host([value=\"\"]) input{padding:8px}:host([value=\"\"]) .textarea{padding:12px 8px}.textarea,:host([readonly]) .textarea:focus{outline:0;border:none;font-family:Calibri,sans-serif;font-size:14px;line-height:16px;color:var(--text-90);background:var(--highlight-5);border-radius:2px;width:100%;box-sizing:border-box;padding:20px 8px 4px 8px;transition:.2s all ease-in-out,0s height;resize:vertical;overflow-y:overlay;min-height:40px;font-weight:300;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}.textarea:focus{outline:0;padding:20px 8px 4px 8px!important}:host([disabled]) .textarea,:host([disabled]) input,:host([readonly]) .textarea,:host([readonly]) input{cursor:default;resize:none!important;pointer-events:none}.content-wrapper{display:flex;flex-direction:column;width:100%;position:relative}:host([condensed]) .icon-slot,:host([readonly]) .icon-slot,:host([textarea]) .icon-slot{display:none}:host([disabled]) #icon::slotted(*){pointer-events:none;color:var(--text-20)}.icon-slot{position:absolute;top:8px;right:8px}:host(:not([textarea])[condensed]) .input-text-label{display:none}:host([value=\"\"][condensed]) .input-text-label{display:block!important;top:1px!important;font-size:14px!important}:host([condensed]) input,:host([condensed]) input:focus{padding:0 8px!important}:host([disabled]) .input-text-label,:host([disabled]) .textarea,:host([disabled]) input{color:var(--text-20)!important}</style> <div class=content-wrapper> <input hidden$={{textarea}} type=text value={{value::input}} maxlength$={{maxlength::input}}> <textarea hidden$={{!textarea}} class=textarea rows$={{rows::input}} cols=1 value={{value::input}} maxlength$={{maxlength::input}}>    </textarea> <div class=input-text-label>[[label]]</div> </div> <div class=icon-slot> <slot name=icon id=icon></slot> </div> </template> </dom-module>");

var SHInputText = function (_Polymer$Element) {
  _inherits(SHInputText, _Polymer$Element);

  function SHInputText() {
    _classCallCheck(this, SHInputText);

    return _possibleConstructorReturn(this, (SHInputText.__proto__ || Object.getPrototypeOf(SHInputText)).apply(this, arguments));
  }

  _createClass(SHInputText, null, [{
    key: 'is',
    get: function get() {
      return 'sh-input-text';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String,
          value: "Label"
        },
        value: {
          type: String,
          value: "",
          reflectToAttribute: true
        },
        icon: {
          type: String
        },
        textarea: {
          type: Boolean,
          value: false
        },
        rows: {
          type: String,
          value: "3"
        },
        maxlength: {
          type: String
        },
        readonly: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        disabled: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        role: {
          type: String,
          value: "textbox",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHInputText;
}(Polymer.Element);

window.customElements.define(SHInputText.is, SHInputText);

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-menu-item> <template> <style include=shared-styles>:host{width:100%}.menu-item-wrapper{height:40px;width:100%;box-sizing:border-box;padding:8px 0;transition:.2s all ease-in-out;border-radius:2px;display:flex;flex-direction:row;cursor:pointer}.menu-item-wrapper:hover{background:var(--highlight-5);padding:8px;margin:0 -8px;width:calc(100% + 16px)}.menu-item-wrapper[active]{padding:8px;margin:0 -8px;width:calc(100% + 16px)}.menu-item-wrapper[active]{background:var(--highlight-10)}:host([disabled]){pointer-events:none;opacity:.2}:host a{display:block}.menu-item-wrapper[disabled],.menu-item-wrapper[disabled]:hover{cursor:default;background:0 0}.menu-item-label{line-height:24px;font-size:14px;font-family:calibri;font-weight:400;color:var(--text-90);flex:1;transition:.2s all ease-in-out;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}sh-icon#menu-item-icon{color:var(--text-55);margin-right:8px}.icon-{display:none}.functions-slot::slotted(*){margin-left:8px}a{text-decoration:none!important}</style> <a href$=[[href]] on-click=_handleClicked role=button> <div class=menu-item-wrapper active$=[[active]] disabled$=[[disabled]]> <sh-icon icon$=[[icon]] class$=icon-[[icon]] id=menu-item-icon></sh-icon> <div class=menu-item-label>[[label]]</div> <slot name=functions class=functions-slot id=functions></slot> </div> </a> </template> </dom-module>");

var SHMenuItem = function (_Polymer$Element) {
  _inherits(SHMenuItem, _Polymer$Element);

  function SHMenuItem() {
    _classCallCheck(this, SHMenuItem);

    return _possibleConstructorReturn(this, (SHMenuItem.__proto__ || Object.getPrototypeOf(SHMenuItem)).apply(this, arguments));
  }

  _createClass(SHMenuItem, [{
    key: '_handleClicked',

    //Bubble up the "label" property on the click event to parent element
    value: function _handleClicked() {
      this.dispatchEvent(new CustomEvent('clicked', { detail: this.label, bubbles: true }));
      this._handleActive();
    }
  }, {
    key: '_handleActive',
    value: function _handleActive() {
      this.active = !this.active;
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-menu-item';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String,
          value: "Label"
        },
        icon: {
          type: String,
          value: ""
        },
        href: {
          type: String
        },
        disabled: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        active: {
          type: Boolean,
          value: false,
          reflectToAttribute: true,
          notify: true
        },
        role: {
          type: String,
          value: "listitem",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHMenuItem;
}(Polymer.Element);

window.customElements.define(SHMenuItem.is, SHMenuItem);

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-modal> <template> <style include=shared-styles>:host{position:fixed;top:0;left:0;width:100%;height:0;max-height:0;overflow:hidden;opacity:0;z-index:5;align-items:center;justify-content:center;display:flex;background:rgba(0,0,0,.6);transition:.2s all ease-in-out,0s height ease-in-out .2s,0s max-height ease-in-out .2s}:host([active]){opacity:1;height:100%;max-height:100%;transition:.2s all ease-in-out .2s,0s height ease-in-out,0s max-height ease-in-out}:host([active]) .modal-wrapper{transform:none;transition:.2s all ease-in-out .2s}.modal-wrapper{transition:.2s all ease-in-out;transform:translateY(40px);background:var(--base-3);box-shadow:1px 2px 1px var(--shadow-strong),-1px -1px 1px var(--shadow-light);width:100%;height:100%;display:flex;flex-direction:column;border-radius:2px;z-index:5;position:relative}.label-wrapper{display:flex;flex-direction:row;padding:16px;align-items:center}.modal-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:700;line-height:24px;flex:1;color:var(--text-90);font-size:15px;font-family:bree;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}.header-slot{padding:16px;display:flex;flex-direction:row;overflow:hidden}.header-slot ::slotted(sh-tabs){flex:1;margin:-16px -16px 0 -16px;border-bottom:1px solid var(--divider)}.body-slot{flex:1;padding:16px;box-sizing:border-box;display:flex;flex-direction:column;overflow:overlay}.body-slot ::slotted(*){margin-bottom:8px}.footer-slot{height:fit-content;padding:16px;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-end;align-items:center}sh-icon#modal-icon{margin-right:8px;color:var(--text-90)}.icon-{display:none}#footer::slotted(*),#functions::slotted(*){color:var(--text-55);margin-left:8px}#close-button{transition:.2s all ease-in-out;position:absolute;top:16px;right:16px}.modal-wrapper[empty-header] .header-slot{display:none}.modal-wrapper[empty-label] .label-wrapper{display:none}.modal-wrapper[empty-footer] .footer-slot{display:none}.modal-wrapper:not([empty-header]) .label-wrapper{display:none}.modal-wrapper:not([empty-header]) .body-slot{padding-top:0}.modal-wrapper:not([empty-label]) .body-slot{padding-top:0}.modal-wrapper:not([empty-footer]) .body-slot{padding-bottom:0}</style> <div class=modal-wrapper style$=\"max-height:[[modalHeight]];min-height:[[modalHeight]]; max-width:[[modalWidth]];min-width:[[modalWidth]]\" expanded$=[[expanded]] empty-label$=[[emptyLabel]] empty-footer$=[[emptyFooter]] empty-header$=[[emptyHeader]]> <sh-icon button=\"\" icon=close on-click=_handleActive id=close-button></sh-icon> <div class=label-wrapper> <sh-icon icon$=[[icon]] class$=icon-[[icon]] id=modal-icon></sh-icon> <div class=modal-label>[[label]]</div> </div> <div class=header-slot> <slot name=header id=header></slot> </div> <div class=body-slot> <slot></slot> </div> <div class=footer-slot> <slot name=footer id=footer></slot> </div> </div> </template> </dom-module>");

var SHModal = function (_Polymer$Element) {
  _inherits(SHModal, _Polymer$Element);

  function SHModal() {
    _classCallCheck(this, SHModal);

    return _possibleConstructorReturn(this, (SHModal.__proto__ || Object.getPrototypeOf(SHModal)).apply(this, arguments));
  }

  _createClass(SHModal, [{
    key: 'ready',
    value: function ready() {
      _get(SHModal.prototype.__proto__ || Object.getPrototypeOf(SHModal.prototype), 'ready', this).call(this);
      var footerNodes = this.$.footer.assignedNodes({ flatten: true });
      if (footerNodes == 0) {
        this.emptyFooter = !this.emptyFooter;
      };
      var headerNodes = this.$.header.assignedNodes({ flatten: true });
      if (headerNodes == 0) {
        this.emptyHeader = !this.emptyHeader;
      };
      if (this.label == undefined) {
        this.emptyLabel = !this.emptyLabel;
      }
    }
  }, {
    key: '_handleActive',
    value: function _handleActive() {
      this.active = !this.active;
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-modal';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String
        },
        icon: {
          type: String,
          value: ""
        },
        modalHeight: {
          type: String,
          value: "480px"
        },
        modalWidth: {
          type: String,
          value: ""
        },
        active: {
          type: Boolean,
          value: false,
          reflectToAttribute: true,
          notify: true
        },
        emptyLabel: {
          type: Boolean,
          value: false
        },
        emptyFooter: {
          type: Boolean,
          value: false
        },
        emptyHeader: {
          type: Boolean,
          value: false
        },
        role: {
          type: String,
          value: "dialog",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHModal;
}(Polymer.Element);

window.customElements.define(SHModal.is, SHModal);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-nav-bar> <template> <style include=shared-styles>:host{background-color:var(--base-2);box-shadow:0 2px 4px var(--shadow-light);z-index:3}.nav-bar-wrapper{height:56px;width:100%;padding:16px;box-sizing:border-box;display:flex;flex-direction:row}.tabs-slot{flex:1;display:flex}#tabs::slotted(sh-tabs){margin:-16px 0}#functions::slotted(*){margin-left:8px}</style> <div class=nav-bar-wrapper> <div class=tabs-slot> <slot name=tabs id=tabs></slot> </div> <slot name=functions id=functions></slot> </div> </template> </dom-module>");

var SHNavBar = function (_Polymer$Element) {
  _inherits(SHNavBar, _Polymer$Element);

  function SHNavBar() {
    _classCallCheck(this, SHNavBar);

    return _possibleConstructorReturn(this, (SHNavBar.__proto__ || Object.getPrototypeOf(SHNavBar)).apply(this, arguments));
  }

  _createClass(SHNavBar, null, [{
    key: 'is',
    get: function get() {
      return 'sh-nav-bar';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        role: {
          type: String,
          value: "button",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHNavBar;
}(Polymer.Element);

window.customElements.define(SHNavBar.is, SHNavBar);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-page> <template> <style include=shared-styles>:host{width:100%;height:100%}.page-wrapper{display:flex;flex-direction:column;width:100%;height:100%}.page-content{display:flex;flex:1;flex-direction:row;background-color:var(--base-1)}#access,#nav{width:100%}.main-wrapper{overflow-y:overlay;height:100%;width:100%}.body-wrapper{flex:1;height:100%;overflow:hidden;padding:16px 0;box-sizing:border-box;position:relative;display:flex;justify-content:center}.body-wrapper[scroll]{min-height:fit-content;overflow-y:visible}#body::slotted(*){width:100%}#left,#right{height:100%;width:fit-content}.page-wrapper[empty-left] .body-wrapper{padding-left:16px}.page-wrapper[empty-right] .body-wrapper{padding-right:16px}:host(.web-page) .page-content{background-color:var(--base-0)}:host(.web-page) .body-wrapper{padding:16px!important}</style> <div class=page-wrapper empty-left$=[[emptyLeft]] empty-right$=[[emptyRight]]> <slot name=access id=access></slot> <slot name=nav id=nav></slot> <div class=page-content> <slot name=left id=left></slot> <div class=main-wrapper> <div class=body-wrapper scroll$=[[scroll]]> <slot id=body></slot> </div> </div> <slot name=right id=right></slot> </div> </div> </template> </dom-module>");

var SHPage = function (_Polymer$Element) {
  _inherits(SHPage, _Polymer$Element);

  function SHPage() {
    _classCallCheck(this, SHPage);

    return _possibleConstructorReturn(this, (SHPage.__proto__ || Object.getPrototypeOf(SHPage)).apply(this, arguments));
  }

  _createClass(SHPage, [{
    key: 'ready',
    value: function ready() {
      _get(SHPage.prototype.__proto__ || Object.getPrototypeOf(SHPage.prototype), 'ready', this).call(this);
      var leftNodes = this.$.left.assignedNodes({ flatten: true });
      if (leftNodes == 0) {
        this.emptyLeft = !this.emptyLeft;
      };
      // console.log(leftNodes);
      var rightNodes = this.$.right.assignedNodes({ flatten: true });
      if (rightNodes == 0) {
        this.emptyRight = !this.emptyRight;
      };
      // console.log(rightNodes);
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-page';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        scroll: {
          type: Boolean,
          value: false
        },
        theme: {
          type: String,
          value: "bright",
          reflectToAttribute: true
        },
        emptyLeft: {
          type: Boolean,
          value: false
        },
        emptyRight: {
          type: Boolean,
          value: false
        }
      };
    }
  }]);

  return SHPage;
}(Polymer.Element);

window.customElements.define(SHPage.is, SHPage);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-pagination> <template> <style>:host{display:block;position:relative;width:100%;white-space:nowrap}.pagination-wrapper{list-style:none;width:fit-content;display:flex;height:32px;margin:auto}.pagination-wrapper ul{display:inline-flex;list-style:none;margin:0;padding:0;height:100%}.pagination-wrapper ul li{height:100%;width:32px;text-align:center;margin-right:8px;line-height:32px;border-radius:50%;color:var(--text-55);background:0 0;cursor:pointer;transition:all .2s ease-in-out;font-weight:700}.pagination-wrapper ul li:last-of-type{margin:0}.pagination-wrapper ul li sh-icon{margin-top:4px;pointer-events:none;z-index:-1}.pagination-wrapper li[active]{background:var(--highlight-10);color:var(--text-90)}#forwardJumper:before{content:'\\2026'}.pagination-wrapper ul .sh-pagination-item:hover{background:var(--highlight-10)}:active,:focus{outline:0}</style> <div class=pagination-wrapper> <ul> <li title=\"Previous Page\" tabindex=0 on-click=_prevPage> <sh-icon button=\"\" icon=arrow-left></sh-icon> </li> <template id=paginationTemplateWrapper is=dom-repeat items={{_totalArray(pages)}}> <li class=sh-pagination-item on-click=_handleClick>{{item}}</li> <template is=dom-if if={{_addJumper(item)}}> <li id=forwardJumper title=\"Next 3 Pages\" tabindex=0 on-click=\"\"></li> </template> </template> <li title=\"Next Page\" tabindex=0 on-click=_nextPage> <sh-icon button=\"\" icon=arrow-right size=s></sh-icon> </li> </ul> </div> </template> </dom-module>");

var SHPagination = function (_Polymer$Element) {
  _inherits(SHPagination, _Polymer$Element);

  function SHPagination() {
    _classCallCheck(this, SHPagination);

    return _possibleConstructorReturn(this, (SHPagination.__proto__ || Object.getPrototypeOf(SHPagination)).apply(this, arguments));
  }

  _createClass(SHPagination, [{
    key: 'ready',
    value: function ready() {
      _get(SHPagination.prototype.__proto__ || Object.getPrototypeOf(SHPagination.prototype), 'ready', this).call(this);
      var myself = this;
      this.$.paginationTemplateWrapper.addEventListener('dom-change', function () {
        var pages = this.parentElement.querySelectorAll('.sh-pagination-item');
        pages[myself.currentPage - 1].setAttribute("active", true);
      });
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      _get(SHPagination.prototype.__proto__ || Object.getPrototypeOf(SHPagination.prototype), 'connectedCallback', this).call(this);
    }
  }, {
    key: '_totalArray',
    value: function _totalArray(pages) {
      if (pages <= 5) {
        var totalArray = [];
        for (var i = 0; i < pages; i++) {
          totalArray.push(i + 1);
        }
        return totalArray;
      } else {
        var _totalArray2 = [];
        for (var _i = 0; _i < 5; _i++) {
          if (_i <= 2) {
            _totalArray2.push(_i + 1);
          }
          if (_i == 4) {
            _totalArray2.push(pages);
          }
        }
        return _totalArray2;
      }
    }
  }, {
    key: '_addJumper',
    value: function _addJumper(item) {
      if (this.pages > 5) {
        if (item == 3) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }, {
    key: '_handleClick',
    value: function _handleClick(e) {
      var pages = this.shadowRoot.querySelectorAll('.sh-pagination-item');
      for (var i = 0; i < pages.length; i++) {
        pages[i].removeAttribute('active');
      }
      e.target.setAttribute('active', true);
      e.stopPropagation();
    }
  }, {
    key: '_prevPage',
    value: function _prevPage(e) {
      var pages = this.shadowRoot.querySelectorAll('.sh-pagination-item');
      var index = this.shadowRoot.querySelector('.sh-pagination-item[active]').innerHTML;
      index = parseInt(index) - 1;
      if (index == 0) {
        return;
      } else {
        // debugger;
        pages[index].removeAttribute('active');
        pages[index - 1].setAttribute('active', true);
        e.stopPropagation();
      }
    }
  }, {
    key: '_nextPage',
    value: function _nextPage(e) {
      // debugger;
      var pages = this.shadowRoot.querySelectorAll('.sh-pagination-item');
      var index = this.shadowRoot.querySelector('.sh-pagination-item[active]').innerHTML;
      index = parseInt(index) - 1;
      if (index == pages.length - 1) {
        return;
      } else {
        // debugger;
        pages[index].removeAttribute('active');
        pages[index + 1].setAttribute('active', true);
        e.stopPropagation();
      }
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-pagination';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        pages: {
          type: Number,
          value: 5
        },
        currentPage: {
          type: Number,
          value: 1
        }
      };
    }
  }]);

  return SHPagination;
}(Polymer.Element);

window.customElements.define(SHPagination.is, SHPagination);

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-pane> <template> <style include=shared-styles>:host{z-index:2}.pane-wrapper{width:312px;height:100%;display:flex;flex-direction:column;position:relative;transition:.2s all ease-in-out}.label-wrapper{height:fit-content;padding:16px;box-sizing:border-box;display:flex;flex-direction:row}.header-slot{padding:16px;display:flex;flex-direction:row;overflow:hidden}.body-slot{flex:1;padding:16px;box-sizing:border-box;display:flex;flex-direction:column;overflow:overlay}#body::slotted(*){margin-top:8px}#body::slotted(:first-child),#body::slotted(sh-accordion),#body::slotted(sh-menu-item){margin-top:0!important}.footer-slot{height:fit-content;padding:16px;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-end;align-items:center}#footer::slotted(sh-button),#footer::slotted(sh-icon),#functions::slotted(*){margin-left:8px}#footer::slotted(sh-button[shape=square]:nth-of-type(1n+5)){margin-top:8px}#footer::slotted(sh-button[shape=square]:nth-of-type(4n+5)){margin-left:0!important}.pane-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:700;font-size:15px;line-height:24px;width:100%;color:var(--text-90);font-family:bree;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}#header::slotted(sh-tabs){flex:1;margin:-16px -16px 0 -16px;border-bottom:1px solid var(--divider)}#expand{position:absolute;padding:0 8px;top:8px;right:8px;display:none;transition:.2s all ease-in-out}:host([slot=right]) #expand{transform:rotate(180deg)}.body-slot,.footer-slot,.header-slot,.label-wrapper{transition:.1s all ease-in-out .2s}@media screen and (max-width:1280px){.pane-wrapper{max-width:56px}.body-slot,.footer-slot,.header-slot,.label-wrapper{max-width:0;opacity:0;transition:0s all}#expand{display:flex}}.pane-wrapper[expanded]{max-width:320px}.pane-wrapper[expanded] #expand{transform:rotate(180deg);right:-48px}:host([slot=right]) .pane-wrapper[expanded] #expand{transform:rotate(360deg);right:328px}.pane-wrapper[expanded] #expand::before{width:40px;height:40px;content:\"\";border-radius:20px;background-color:var(--base-2);opacity:.8;position:absolute;top:0;left:0;z-index:-1}.pane-wrapper[expanded] .body-slot,.pane-wrapper[expanded] .footer-slot,.pane-wrapper[expanded] .header-slot,.pane-wrapper[expanded] .label-wrapper{max-width:320px;opacity:1;transition:.2s opacity ease-in-out .2s}.pane-wrapper[empty-header] .header-slot{display:none}.pane-wrapper[empty-label] .label-wrapper{display:none}.pane-wrapper[empty-footer] .footer-slot{display:none}.pane-wrapper:not([empty-header]) .label-wrapper{display:none}.pane-wrapper:not([empty-header]) .body-slot{padding-top:0}.pane-wrapper:not([empty-label]) .body-slot{padding-top:0}.pane-wrapper:not([empty-footer]) .body-slot{padding-bottom:0}</style> <div class=pane-wrapper expanded$=[[expanded]] empty-label$=[[emptyLabel]] empty-footer$=[[emptyFooter]] empty-header$=[[emptyHeader]]> <div class=label-wrapper> <div class=pane-label>[[label]]</div> <slot name=functions id=functions></slot> </div> <div class=header-slot> <slot name=header id=header></slot> </div> <div class=body-slot> <slot id=body></slot> </div> <div class=footer-slot> <slot name=footer id=footer></slot> </div> <sh-button icon=arrow-right color=transparent shape=circle id=expand on-click=_handleExpand> </sh-button></div> </template> </dom-module>");

var SHPane = function (_Polymer$Element) {
  _inherits(SHPane, _Polymer$Element);

  function SHPane() {
    _classCallCheck(this, SHPane);

    return _possibleConstructorReturn(this, (SHPane.__proto__ || Object.getPrototypeOf(SHPane)).apply(this, arguments));
  }

  _createClass(SHPane, [{
    key: '_handleExpand',

    // switches expanded prop on button click
    value: function _handleExpand() {
      this.expanded = !this.expanded;
    }
    // this is for checking if the slot is empty :

  }, {
    key: 'ready',
    value: function ready() {
      _get(SHPane.prototype.__proto__ || Object.getPrototypeOf(SHPane.prototype), 'ready', this).call(this);
      var footerNodes = this.$.footer.assignedNodes({ flatten: true });
      if (footerNodes == 0) {
        this.emptyFooter = !this.emptyFooter;
      };
      var headerNodes = this.$.header.assignedNodes({ flatten: true });
      if (headerNodes == 0) {
        this.emptyHeader = !this.emptyHeader;
      };
      if (this.label == undefined) {
        this.emptyLabel = !this.emptyLabel;
      }
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-pane';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String
        },
        expanded: {
          type: Boolean,
          value: false,
          reflectToAttribute: true,
          notify: true
        },
        emptyLabel: {
          type: Boolean,
          value: false
        },
        emptyFooter: {
          type: Boolean,
          value: false
        },
        emptyHeader: {
          type: Boolean,
          value: false
        }
      };
    }
  }]);

  return SHPane;
}(Polymer.Element);

window.customElements.define(SHPane.is, SHPane);

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-progress> <template> <style include=shared-styles>:host{width:100%;margin:8px 0}progress{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;width:100%;vertical-align:unset;display:flex;height:8px}progress::-webkit-progress-bar{border-radius:8px;background:var(--highlight-5)}progress::-webkit-progress-value{border-radius:8px;background:var(--primary-color)}.progress-label,.progress-value{color:var(--text-90);font-size:14px;font-family:Calibri;text-align:center;display:none;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}.progress-value{font-weight:700;color:var(--text-90)}:host([show-progress]) .progress-value{display:block;margin-bottom:8px}:host([label]) .progress-label{display:block;margin-top:8px}</style> <div class=progress-value>[[value]]%</div> <progress value$=[[value]] max=100></progress> <div class=progress-label>[[label]]</div> </template> </dom-module>");

var SHProgress = function (_Polymer$Element) {
  _inherits(SHProgress, _Polymer$Element);

  function SHProgress() {
    _classCallCheck(this, SHProgress);

    return _possibleConstructorReturn(this, (SHProgress.__proto__ || Object.getPrototypeOf(SHProgress)).apply(this, arguments));
  }

  _createClass(SHProgress, null, [{
    key: 'is',
    get: function get() {
      return 'sh-progress';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        value: {
          type: String,
          value: "0"
        },
        label: {
          type: String,
          reflectToAttribute: true
        },
        showProgress: {
          type: Boolean,
          value: false
        },
        role: {
          type: String,
          value: "progressbar",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHProgress;
}(Polymer.Element);

window.customElements.define(SHProgress.is, SHProgress);

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-radio-button> <template> <style include=shared-styles>:host{display:flex;flex-direction:row;width:100%;padding:8px 0;color:var(--text-90);white-space:nowrap}:host([disabled]){cursor:default;pointer-events:none;color:var(--text-20)!important}#radio-container{display:flex;align-items:center;height:24px;width:100%;cursor:pointer}:host input{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:50%;height:16px;width:16px;border:8px solid var(--highlight-10);transition:.2s all ease-in-out;outline:0;margin:4px;cursor:pointer}:host([disabled]) input{border-color:var(--highlight-5)}#radio-container label{display:inline-block;padding-left:8px;cursor:pointer;flex:1}:host([active]) input{background:0 0;border:5px solid var(--primary-color)}:host(([active]):hover) input{border-color:var(--primary-2)}:host(:not([active]):hover) input{border-color:var(--highlight-20)}:host([neutral][active]) input{border-color:var(--text-55)}</style> <div id=radio-container disabled$=[[disabled]] on-click=_triggerChecked> <input id=radioBtn on-click=_handleActive type=radio name$=[[name]] checked={{active::change}} active=\"\"> <label for$=[[name]]>[[label]]</label> </div> </template> </dom-module>");

var SHRadioButton = function (_Polymer$Element) {
  _inherits(SHRadioButton, _Polymer$Element);

  function SHRadioButton() {
    _classCallCheck(this, SHRadioButton);

    return _possibleConstructorReturn(this, (SHRadioButton.__proto__ || Object.getPrototypeOf(SHRadioButton)).apply(this, arguments));
  }

  _createClass(SHRadioButton, [{
    key: '_handleActive',

    //Bubble up the status to parent element
    value: function _handleActive() {
      this.dispatchEvent(new CustomEvent('checked', { detail: this, bubbles: true }));
    }
    // Pass the click event on entire element to radio button element

  }, {
    key: '_triggerChecked',
    value: function _triggerChecked() {
      this.$.radioBtn.click();
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-radio-button';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String,
          value: "Label"
        },
        active: {
          type: Boolean,
          value: false,
          reflectToAttribute: true,
          notify: true
        },
        disabled: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        neutral: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        hostChecked: {
          type: Boolean,
          value: false
        },
        role: {
          type: String,
          value: "radio",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHRadioButton;
}(Polymer.Element);

window.customElements.define(SHRadioButton.is, SHRadioButton);

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-radio-group> <template> <style include=shared-styles>:host{width:100%}#radioGroupContainer{display:flex;flex-direction:column;width:100%}</style> <div id=radioGroupContainer> <slot></slot> </div> </template> </dom-module>");

var SHRadioGroup = function (_Polymer$Element) {
  _inherits(SHRadioGroup, _Polymer$Element);

  function SHRadioGroup() {
    _classCallCheck(this, SHRadioGroup);

    return _possibleConstructorReturn(this, (SHRadioGroup.__proto__ || Object.getPrototypeOf(SHRadioGroup)).apply(this, arguments));
  }

  _createClass(SHRadioGroup, [{
    key: 'ready',
    value: function ready() {
      _get(SHRadioGroup.prototype.__proto__ || Object.getPrototypeOf(SHRadioGroup.prototype), 'ready', this).call(this);
      //Update the radio group's children item's active state
      this.addEventListener("checked", function (e) {
        var childElement = this.querySelectorAll("sh-radio-button[active]");
        for (var i = 0; i < childElement.length; i++) {
          childElement[i].removeAttribute("active");
        }
      });
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-radio-group';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        selected: {
          type: String,
          value: "defaultId"
        },
        label: {
          type: String,
          value: "defaultLabel"
        },
        role: {
          type: String,
          value: "radiogroup",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHRadioGroup;
}(Polymer.Element);

window.customElements.define(SHRadioGroup.is, SHRadioGroup);

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-slider> <template> <style include=shared-styles>:host{width:100%}input[type=range]{width:100%;height:24px;margin:0;padding:0;border:none;-webkit-appearance:none;background:0 0;display:flex;outline:0}input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;height:12px;width:12px;border-radius:50%;background:var(--slider-handle);cursor:pointer;margin-top:-5px;transition:.2s all ease-in-out}input[type=range]::-webkit-slider-thumb:active,input[type=range]::-webkit-slider-thumb:hover{background:var(--primary-color)}input[type=range]::-webkit-slider-thumb::before{content:\"aaaa\" top: 0;left:0}input[type=range]::-moz-range-thumb{-moz-appearance:none;height:12px;width:12px;border-radius:50%;background:var(--slider-handle);cursor:pointer;margin-top:-5px;margin-left:-1px;transition:.2s all ease-in-out}input[type=range]::-moz-range-thumb:active,input[type=range]::-moz-range-thumb:hover{background:var(--primary-color)}input[type=range]::-ms-thumb{appearance:none;height:12px;width:12px;border-radius:50%;background:var(--slider-handle);cursor:pointer;margin-top:-5px;transition:.2s all ease-in-out}input[type=range]::-ms-thumb:active,input[type=range]::-ms-thumb:hover{background:var(--primary-color)}input[type=range]::-webkit-slider-runnable-track{width:100%;height:2px;cursor:pointer;background:var(--divider)}input[type=range]::-moz-range-track{width:100%;height:2px;cursor:pointer;background:var(--divider)}input[type=range]::-ms-track{width:100%;height:2px;cursor:pointer;background:var(--divider)}.label-wrapper{display:flex;flex-direction:row;margin-top:8px}.slider-label{flex:1;line-height:24px;font-size:14px;font-weight:400;color:var(--text-90);-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}.label-wrapper input{display:none;outline:0;border:none;width:40px;font-family:Calibri,sans-serif;font-size:14px;line-height:24px;color:var(--text-90);background:var(--highlight-5);border-radius:2px;box-sizing:border-box;padding:0 8px;transition:.2s all ease-in-out;font-weight:300;text-align:right}:host(:not([label])) .label-wrapper{display:none}:host([show-value]) .label-wrapper input{display:inline-flex}:host([disabled]){opacity:.2;pointer-events:none}</style> <div class=label-wrapper> <div class=slider-label>[[label]]</div> <input type=text value={{value::input}}> </div> <input type=range min=[[min]] max=[[max]] step=[[step]] value={{value::input}} list=tickmarks> </template> </dom-module>");

var shSlider = function (_Polymer$Element) {
  _inherits(shSlider, _Polymer$Element);

  function shSlider() {
    _classCallCheck(this, shSlider);

    return _possibleConstructorReturn(this, (shSlider.__proto__ || Object.getPrototypeOf(shSlider)).apply(this, arguments));
  }

  _createClass(shSlider, null, [{
    key: 'is',
    get: function get() {
      return 'sh-slider';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String
        },
        value: {
          type: String,
          value: "0",
          notify: true
        },
        min: {
          type: String,
          value: "0"
        },
        max: {
          type: String,
          value: "100"
        },
        step: {
          type: String,
          value: "1"
        },
        showValue: {
          type: Boolean,
          value: false
        },
        disabled: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        role: {
          type: String,
          value: "slider",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return shSlider;
}(Polymer.Element);

window.customElements.define(shSlider.is, shSlider);

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-table> <template> <style include=shared-styles>:host{width:calc(100% + 16px);height:100%;overflow-y:hidden;display:flex;flex-direction:column;margin:0 -8px}:host([fit-content]){min-height:fit-content;max-height:fit-content}:host([readonly]) .table-wrapper ::slotted(sh-table-row){pointer-events:none}.table-wrapper{flex:1;overflow-y:overlay}</style> <slot name=header id=header-slot></slot> <div class=table-wrapper> <slot></slot> </div> </template> </dom-module>");

var SHTable = function (_Polymer$Element) {
  _inherits(SHTable, _Polymer$Element);

  function SHTable() {
    _classCallCheck(this, SHTable);

    return _possibleConstructorReturn(this, (SHTable.__proto__ || Object.getPrototypeOf(SHTable)).apply(this, arguments));
  }

  _createClass(SHTable, [{
    key: 'ready',
    value: function ready() {
      _get(SHTable.prototype.__proto__ || Object.getPrototypeOf(SHTable.prototype), 'ready', this).call(this);
      this.addEventListener("clicked", function (e) {
        var childElement = this.querySelectorAll("sh-table-row[active]");
        for (var i = 0; i < childElement.length; i++) {
          childElement[i].removeAttribute("active");
        }
      });
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-table';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {};
    }
  }]);

  return SHTable;
}(Polymer.Element);

window.customElements.define(SHTable.is, SHTable);

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-table-cell> <template> <style include=shared-styles>:host{flex:1;display:inline-flex;box-sizing:border-box}.cell-wrapper{color:var(--text-90);padding:12px 8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:default;line-height:24px;font-family:calibri;font-size:14px;font-weight:400;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host([columns]){flex:initial}</style> <div class=cell-wrapper> <slot></slot> </div> </template> </dom-module>");

var SHTableCell = function (_Polymer$Element) {
  _inherits(SHTableCell, _Polymer$Element);

  function SHTableCell() {
    _classCallCheck(this, SHTableCell);

    return _possibleConstructorReturn(this, (SHTableCell.__proto__ || Object.getPrototypeOf(SHTableCell)).apply(this, arguments));
  }

  _createClass(SHTableCell, null, [{
    key: 'is',
    get: function get() {
      return 'sh-table-cell';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {};
    }
  }]);

  return SHTableCell;
}(Polymer.Element);

window.customElements.define(SHTableCell.is, SHTableCell);

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-table-head> <template> <style include=shared-styles>:host{flex:1;display:inline-flex;box-sizing:border-box}.head-wrapper{color:var(--text-55);font-weight:700;line-height:24px;padding:0 8px 12px 8px;font-size:14px;font-family:calibri;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host([columns]){flex:initial}:host([active]){background:0 0}</style> <div class=head-wrapper> <slot></slot> </div> </template> </dom-module>");

var SHTableHead = function (_Polymer$Element) {
  _inherits(SHTableHead, _Polymer$Element);

  function SHTableHead() {
    _classCallCheck(this, SHTableHead);

    return _possibleConstructorReturn(this, (SHTableHead.__proto__ || Object.getPrototypeOf(SHTableHead)).apply(this, arguments));
  }

  _createClass(SHTableHead, null, [{
    key: 'is',
    get: function get() {
      return 'sh-table-head';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        header: {
          type: Boolean,
          value: true
        }
      };
    }
  }]);

  return SHTableHead;
}(Polymer.Element);

window.customElements.define(SHTableHead.is, SHTableHead);

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-table-row> <template> <style include=shared-styles>:host>div{display:flex;flex-direction:row;transition:.2s all ease-in-out;border-bottom:1px solid var(--divider);min-height:fit-content}:host>div:hover{background:var(--highlight-5)}:host([slot=header])>div:hover{background:0 0}[active],[active]:hover{background:var(--highlight-10)}:host ::slotted([columns=\"12\"]){width:100%}:host ::slotted([columns=\"11\"]){width:calc((100% / 12) * 11)}:host ::slotted([columns=\"10\"]){width:calc((100% / 12) * 10)}:host ::slotted([columns=\"9\"]){width:calc((100% / 12) * 9)}:host ::slotted([columns=\"8\"]){width:calc((100% / 12) * 8)}:host ::slotted([columns=\"7\"]){width:calc((100% / 12) * 7)}:host ::slotted([columns=\"6\"]){width:calc((100% / 12) * 6)}:host ::slotted([columns=\"5\"]){width:calc((100% / 12) * 5)}:host ::slotted([columns=\"4\"]){width:calc((100% / 12) * 4)}:host ::slotted([columns=\"3\"]){width:calc((100% / 12) * 3)}:host ::slotted([columns=\"2\"]){width:calc((100% / 12) * 2)}:host ::slotted([columns=\"1\"]){width:calc((100% / 12) * 1)}:host ::slotted([columns=\"0\"]){width:0%}</style> <div active$=[[active]] on-click=_handleClick> <slot></slot> </div> </template> </dom-module>");

var SHTableRow = function (_Polymer$Element) {
  _inherits(SHTableRow, _Polymer$Element);

  function SHTableRow() {
    _classCallCheck(this, SHTableRow);

    return _possibleConstructorReturn(this, (SHTableRow.__proto__ || Object.getPrototypeOf(SHTableRow)).apply(this, arguments));
  }

  _createClass(SHTableRow, [{
    key: '_handleClick',
    value: function _handleClick() {
      var rowType = this.getAttribute('slot');
      if (rowType == 'header') {
        return;
      } else {
        this.dispatchEvent(new CustomEvent('clicked', { bubbles: true, composed: true }));
        this.active = true;
      }
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-table-row';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        active: {
          type: Boolean,
          value: false,
          reflectToAttribute: true,
          notify: true
        }
      };
    }
  }]);

  return SHTableRow;
}(Polymer.Element);

window.customElements.define(SHTableRow.is, SHTableRow);

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-tabs> <template> <style include=shared-styles>:host{width:fit-content;height:fit-content;display:flex;flex-direction:row;overflow:hidden}</style> <slot></slot> </template> </dom-module>");

var SHTabs = function (_Polymer$Element) {
  _inherits(SHTabs, _Polymer$Element);

  function SHTabs() {
    _classCallCheck(this, SHTabs);

    return _possibleConstructorReturn(this, (SHTabs.__proto__ || Object.getPrototypeOf(SHTabs)).apply(this, arguments));
  }

  _createClass(SHTabs, [{
    key: 'ready',
    value: function ready() {
      _get(SHTabs.prototype.__proto__ || Object.getPrototypeOf(SHTabs.prototype), 'ready', this).call(this);
      //Update the tab elements active state
      this.addEventListener("clicked", function (e) {
        var childElement = this.querySelectorAll("sh-tab-item[active]");
        for (var i = 0; i < childElement.length; i++) {
          childElement[i].removeAttribute("active");
        }
      });
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-tabs';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        role: {
          type: String,
          value: "navigation",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHTabs;
}(Polymer.Element);

window.customElements.define(SHTabs.is, SHTabs);

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-tab-item> <template> <style include=shared-styles>:host(:focus) {outline: 0px solid transparent;}:host([disabled]) #tab-item{background:0 0!important;color:var(--text-20)}:host([disabled]){pointer-events:none}#tab-item{flex:1;max-width:160px;min-width:96px;height:56px;width:fit-content;box-sizing:border-box;padding:16px;line-height:24px;font-size:14px;font-family:calibri;color:var(--text-55);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-bottom:2px solid transparent;transition:.2s all ease-in-out;font-weight:700;text-align:center;cursor:pointer;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host(:hover) #tab-item{color:var(--text-90)}:host([active]) #tab-item{color:var(--text-90);border-bottom:2px solid var(--primary-color)}</style> <div id=tab-item on-click=_handleClick>[[label]]</div> </template> </dom-module>");

var SHTabItem = function (_Polymer$Element) {
  _inherits(SHTabItem, _Polymer$Element);

  function SHTabItem() {
    _classCallCheck(this, SHTabItem);

    return _possibleConstructorReturn(this, (SHTabItem.__proto__ || Object.getPrototypeOf(SHTabItem)).apply(this, arguments));
  }

  _createClass(SHTabItem, [{
    key: '_handleClick',
    value: function _handleClick() {
      this.dispatchEvent(new CustomEvent('clicked', { bubbles: true, composed: true }));
      this.active = true;
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-tab-item';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String,
          value: "Label"
        },
        active: {
          type: Boolean,
          value: false,
          reflectToAttribute: true,
          notify: true
        },
        disabled: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        role: {
          type: String,
          value: "tab",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHTabItem;
}(Polymer.Element);

window.customElements.define(SHTabItem.is, SHTabItem);

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-tag> <template> <style include=shared-styles>:host{height:32px;overflow-y:hidden;flex-direction:row;cursor:pointer}.tag-wrapper{min-width:40px;display:flex;justify-content:center;width:fit-content;height:100%;background:var(--highlight-10);border-radius:16px;padding:0 16px}.tag-wrapper .tag-label{line-height:32px;color:var(--text-90);font-size:14px;font-family:calibri}.tag-wrapper sh-icon{display:inline-block;margin-top:3px;transition:.2s all ease-in-out}:host([removable]) .tag-wrapper .tag-label{margin-right:8px}:host([disabled]) .tag-wrapper .tag-label{color:var(--text-20)}:host(:hover) .tag-wrapper sh-icon::shadow .icon-wrapper{color:var(--text-90)!important}:host(:active) .tag-wrapper{background:var(--text-20)}</style> <div class=tag-wrapper> <span class=tag-label>[[label]]</span> <sh-icon button=\"\" icon=close size=xs hidden$=[[!removable]] on-click=_removeTag></sh-icon> </div> </template> </dom-module>");

var SHTag = function (_Polymer$Element) {
  _inherits(SHTag, _Polymer$Element);

  function SHTag() {
    _classCallCheck(this, SHTag);

    return _possibleConstructorReturn(this, (SHTag.__proto__ || Object.getPrototypeOf(SHTag)).apply(this, arguments));
  }

  _createClass(SHTag, [{
    key: 'ready',
    value: function ready() {
      _get(SHTag.prototype.__proto__ || Object.getPrototypeOf(SHTag.prototype), 'ready', this).call(this);
    }
  }, {
    key: '_removeTag',
    value: function _removeTag() {
      this.style.display = "none";
      this.remove();
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-tag';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String,
          value: "Label"
        },
        removable: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        disabled: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHTag;
}(Polymer.Element);

window.customElements.define(SHTag.is, SHTag);

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-text> <template> <style include=shared-styles>:host{height:fit-content;width:100%}.text-wrapper{font-size:14px;line-height:20px;font-family:calibri;-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}:host([h1]) .text-wrapper{color:var(--text-100);line-height:24px;font-size:18px;font-weight:700;font-family:bree}:host([h2]) .text-wrapper{color:var(--text-90);line-height:24px;font-size:14px;font-weight:700}:host([p]) .text-wrapper{color:var(--text-90);line-height:20px;font-size:14px}:host([label]) .text-wrapper{color:var(--text-55);line-height:24px;font-size:14px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}:host([disabled]) .text-wrapper{color:var(--text-20)}</style> <div class=text-wrapper> <slot></slot> </div> </template> </dom-module>");

var SHText = function (_Polymer$Element) {
  _inherits(SHText, _Polymer$Element);

  function SHText() {
    _classCallCheck(this, SHText);

    return _possibleConstructorReturn(this, (SHText.__proto__ || Object.getPrototypeOf(SHText)).apply(this, arguments));
  }

  _createClass(SHText, null, [{
    key: 'is',
    get: function get() {
      return 'sh-text';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {};
    }
  }]);

  return SHText;
}(Polymer.Element);

window.customElements.define(SHText.is, SHText);

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sh-toggle> <template> <style include=shared-styles>:host{display:flex;flex-direction:row;width:100%;min-height:fit-content;padding:8px 0;color:var(--text-90);-webkit-font-smoothing:antialiased!important;text-rendering:optimizeLegibility!important;-moz-osx-font-smoothing:grayscale!important}.toggle{height:16px;width:32px;border-radius:8px;margin:5px;margin-right:10px;background:var(--highlight-10);box-sizing:border-box;position:relative;transition:.2s all ease-in-out;cursor:pointer}.toggle::before{position:absolute;left:0;height:16px;width:16px;content:'';background:var(--text-55);border-radius:50%;transition:.2s all ease-in-out}.toggle:hover .toggle::before{background:var(--text-90)}:host([active]) .toggle::before{background:var(--primary-color);left:16px}:host([disabled]){cursor:default;pointer-events:none;color:var(--text-20)}:host([disabled]) .toggle{background:var(--highlight-5)}:host([disabled]) .toggle::before{background:var(--text-20)}</style> <div class=toggle on-click=_handleActive></div> [[label]] </template> </dom-module>");

var SHToggle = function (_Polymer$Element) {
  _inherits(SHToggle, _Polymer$Element);

  function SHToggle() {
    _classCallCheck(this, SHToggle);

    return _possibleConstructorReturn(this, (SHToggle.__proto__ || Object.getPrototypeOf(SHToggle)).apply(this, arguments));
  }

  _createClass(SHToggle, [{
    key: '_handleActive',

    //Toggle active state
    value: function _handleActive() {
      this.active = !this.active;
    }
  }], [{
    key: 'is',
    get: function get() {
      return 'sh-toggle';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        label: {
          type: String,
          value: "Label"
        },
        active: {
          type: Boolean,
          value: false,
          reflectToAttribute: true,
          notify: true
        },
        disabled: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
        },
        role: {
          type: String,
          value: "switch",
          reflectToAttribute: true
        }
      };
    }
  }]);

  return SHToggle;
}(Polymer.Element);

window.customElements.define(SHToggle.is, SHToggle);

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

__webpack_require__(10);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sample-page-viewer> <template> <style include=shared-styles></style> <sh-page theme=dark> <sh-access-bar slot=access> <sh-access-browser slot=patients></sh-access-browser> <sh-access-patient slot=patients name=\"John Doe\" info=28/7/1953 active=\"\"></sh-access-patient> <sh-access-patient slot=patients name=\"Mary Travers\" info=25/03/1978></sh-access-patient> <sh-access-user slot=user name=\"Werner von Siemens\" info=\"Siemens Healthineers\" image=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF1glKtFtQ-O3QEjGAvqPnetNv15y8wVMl9BoLQ9MGgSGYfPtz\"> </sh-access-user> </sh-access-bar> <sh-pane slot=left label=Tools> <sh-accordion label=Layout expanded=\"\"> <sh-menu-item label=MPR icon=layout-mpr></sh-menu-item> <sh-menu-item label=2x1 icon=layout-2x1></sh-menu-item> <sh-menu-item label=2x2 icon=layout-2x2 active=\"\"></sh-menu-item> </sh-accordion> <sh-accordion label=Overlay expanded=\"\"> <sh-slider label=Opacity value=50 show-value=\"\"></sh-slider> <sh-dropdown></sh-dropdown> <sh-dropdown></sh-dropdown> </sh-accordion> <sh-accordion label=Refinements> <sh-radio-group> <sh-radio-button></sh-radio-button> <sh-radio-button active=\"\"></sh-radio-button> <sh-radio-button></sh-radio-button> <sh-radio-button></sh-radio-button> </sh-radio-group> </sh-accordion> </sh-pane> <sh-grid> <div columns=6> <div style=cursor:crosshair;background-image:url(https://usercontent2.hubstatic.com/7980649_f1024.jpg);background-size:contain;height:100%;width:100%;background-position:center;background-repeat:no-repeat;background-color:#000></div> </div> <div columns=6> <div style=cursor:crosshair;background-image:url(https://usercontent2.hubstatic.com/7980649_f1024.jpg);background-size:contain;height:100%;width:100%;background-position:center;background-repeat:no-repeat;background-color:#000></div> </div> <div columns=6> <div style=cursor:crosshair;background-image:url(https://usercontent2.hubstatic.com/7980649_f1024.jpg);background-size:contain;height:100%;width:100%;background-position:center;background-repeat:no-repeat;background-color:#000></div> </div> <div columns=6> <div style=cursor:crosshair;background-image:url(https://usercontent2.hubstatic.com/7980649_f1024.jpg);background-size:contain;height:100%;width:100%;background-position:center;background-repeat:no-repeat;background-color:#000></div> </div> </sh-grid> <sh-pane slot=right label=Images> <sh-grid fit-content=\"\"> <sh-card columns=6 image=https://static.healthcare.siemens.com/siemens_hwem-hwem_ssxa_websites-context-root/wcm/idc/groups/public/@global/@imaging/@ct/documents/image/mdaw/mtm0/~edisp/02_lungcare4nodules_2_igb-00080429/~renditions/02_lungcare4nodules_2_igb-00080429~8.jpg></sh-card> <sh-card columns=6 image=https://static.healthcare.siemens.com/siemens_hwem-hwem_ssxa_websites-context-root/wcm/idc/groups/public/@global/@imaging/@ct/documents/image/mdaw/mtq4/~edisp/01_lungcare4nodules_1_igb-00080431/~renditions/01_lungcare4nodules_1_igb-00080431~8.jpg></sh-card> <sh-card columns=6 image=https://static.healthcare.siemens.com/siemens_hwem-hwem_ssxa_websites-context-root/wcm/idc/groups/public/@global/@imaging/@ct/documents/image/mdaw/mtu3/~edisp/05_lungcare4nodules_4_igb-00080433/~renditions/05_lungcare4nodules_4_igb-00080433~8.jpg></sh-card> <sh-card columns=6 image=https://static.healthcare.siemens.com/siemens_hwem-hwem_ssxa_websites-context-root/wcm/idc/groups/public/@global/@imaging/@ct/documents/image/mdaw/mtm0/~edisp/02_lungcare4nodules_2_igb-00080429/~renditions/02_lungcare4nodules_2_igb-00080429~8.jpg></sh-card> </sh-grid> <sh-button slot=footer label=Report></sh-button> </sh-pane> </sh-page> </template> </dom-module>");

var SamplePageViewer = function (_Polymer$Element) {
  _inherits(SamplePageViewer, _Polymer$Element);

  function SamplePageViewer() {
    _classCallCheck(this, SamplePageViewer);

    return _possibleConstructorReturn(this, (SamplePageViewer.__proto__ || Object.getPrototypeOf(SamplePageViewer)).apply(this, arguments));
  }

  _createClass(SamplePageViewer, null, [{
    key: 'is',
    get: function get() {
      return 'sample-page-viewer';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {};
    }
  }]);

  return SamplePageViewer;
}(Polymer.Element);

window.customElements.define(SamplePageViewer.is, SamplePageViewer);

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/sh-icons.woff";

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/sh-icons.ttf";

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-regular.woff2";

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-regular.woff";

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-regular.ttf";

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-light.woff2";

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-light.woff";

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-light.ttf";

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-bold.woff2";

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-bold.woff";

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-bold.ttf";

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-oblique.woff2";

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-oblique.woff";

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-oblique.ttf";

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-lightoblique.woff2";

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-lightoblique.woff";

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-lightoblique.ttf";

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-boldoblique.woff2";

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-boldoblique.woff";

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-text-boldoblique.ttf";

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-headline-regular.woff2";

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-headline-regular.woff";

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-headline-regular.ttf";

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-headline-oblique.woff2";

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-headline-oblique.woff";

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/bree-sh-headline-oblique.ttf";

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/materialicons-regular.woff2";

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/materialicons-regular.woff";

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/fonts/materialicons-regular.ttf";

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

__webpack_require__(10);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sample-page-data> <template> <style include=shared-styles></style> <sh-page theme=bright> <sh-access-bar slot=access label=\"Product Name\"> <sh-icon slot=functions icon=notification button=\"\"></sh-icon> <sh-icon slot=functions icon=more-vertical button=\"\"></sh-icon> <sh-access-user slot=user name=\"Werner von Siemens\" info=\"Siemens Healthineers\" image=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF1glKtFtQ-O3QEjGAvqPnetNv15y8wVMl9BoLQ9MGgSGYfPtz\"> </sh-access-user> </sh-access-bar> <sh-pane slot=left label=Filters> <sh-dropdown label=Module value=CH-01> <sh-menu-item label=CH-00></sh-menu-item> <sh-menu-item label=CH-01 active=\"\"></sh-menu-item> <sh-menu-item label=CH-02></sh-menu-item> </sh-dropdown> <sh-dropdown label=Assey> <sh-menu-item label=ALT></sh-menu-item> <sh-menu-item label=ALT_c></sh-menu-item> <sh-menu-item label=ALTP5P></sh-menu-item> </sh-dropdown> <hr> <sh-accordion label=\"Calibration Status\" expanded=\"\"> <sh-checkbox label=\"Calibration Needed\" active=\"\"></sh-checkbox> <sh-checkbox label=Expired></sh-checkbox> <sh-checkbox label=Extended></sh-checkbox> <sh-checkbox label=Valid></sh-checkbox> </sh-accordion> <sh-button slot=footer color=secondary label=\"Reset All\"></sh-button> </sh-pane> <sh-card label=Calibration> <sh-table> <sh-table-row slot=header> <sh-table-head columns=3>Assey</sh-table-head> <sh-table-head columns=3>Module</sh-table-head> <sh-table-head columns=4>Calibration Status</sh-table-head> <sh-table-head columns=2>Order Status</sh-table-head> </sh-table-row> <sh-table-row> <sh-table-cell columns=3>ALTP5P</sh-table-cell> <sh-table-cell columns=3>CH-01</sh-table-cell> <sh-table-cell columns=4>Calibration Needed</sh-table-cell> <sh-table-cell columns=2><sh-icon icon=done></sh-icon></sh-table-cell> </sh-table-row> <sh-table-row> <sh-table-cell columns=3>ALTP5P</sh-table-cell> <sh-table-cell columns=3>CH-01</sh-table-cell> <sh-table-cell columns=4>Calibration Needed</sh-table-cell> <sh-table-cell columns=2></sh-table-cell> </sh-table-row> <sh-table-row active=\"\"> <sh-table-cell columns=3>ALTP5P</sh-table-cell> <sh-table-cell columns=3>CH-01</sh-table-cell> <sh-table-cell columns=4>Calibration Needed</sh-table-cell> <sh-table-cell columns=2><sh-icon icon=done></sh-icon></sh-table-cell> </sh-table-row> <sh-table-row> <sh-table-cell columns=3>ALTP5P</sh-table-cell> <sh-table-cell columns=3>CH-01</sh-table-cell> <sh-table-cell columns=4>Calibration Needed</sh-table-cell> <sh-table-cell columns=2></sh-table-cell> </sh-table-row> <sh-table-row> <sh-table-cell columns=3>ALTP5P</sh-table-cell> <sh-table-cell columns=3>CH-01</sh-table-cell> <sh-table-cell columns=4>Calibration Needed</sh-table-cell> <sh-table-cell columns=2></sh-table-cell> </sh-table-row> <sh-table-row> <sh-table-cell columns=3>ALTP5P</sh-table-cell> <sh-table-cell columns=3>CH-01</sh-table-cell> <sh-table-cell columns=4>Calibration Needed</sh-table-cell> <sh-table-cell columns=2></sh-table-cell> </sh-table-row> </sh-table> <sh-button slot=footer color=transparent label=Delete></sh-button> <sh-button slot=footer color=secondary label=Details></sh-button> </sh-card> </sh-page> </template> </dom-module>");

var SamplePageData = function (_Polymer$Element) {
  _inherits(SamplePageData, _Polymer$Element);

  function SamplePageData() {
    _classCallCheck(this, SamplePageData);

    return _possibleConstructorReturn(this, (SamplePageData.__proto__ || Object.getPrototypeOf(SamplePageData)).apply(this, arguments));
  }

  _createClass(SamplePageData, null, [{
    key: 'is',
    get: function get() {
      return 'sample-page-data';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {};
    }
  }]);

  return SamplePageData;
}(Polymer.Element);

window.customElements.define(SamplePageData.is, SamplePageData);

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(1);

__webpack_require__(2);

__webpack_require__(10);

var RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=sample-page-dashboard> <template> <style include=shared-styles></style> <sh-page theme=bright> <sh-access-bar slot=access label=\"Product Name\"> <sh-access-user slot=user image-only=\"\" name=\"Werner von Siemens\" info=\"Siemens Healthineers\" image=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF1glKtFtQ-O3QEjGAvqPnetNv15y8wVMl9BoLQ9MGgSGYfPtz\"> </sh-access-user> </sh-access-bar> <div style=flex-direction:column;display:flex> <sh-grid fit-content=\"\"> <sh-dropdown columns=3 label=Filters></sh-dropdown> <sh-dropdown columns=3 label=Benchmark></sh-dropdown> <sh-input-text columns=3 label=\"Start Date\" value=2017-10-23></sh-input-text> <sh-input-text columns=3 label=\"End Date\" value=2017-11-01></sh-input-text> </sh-grid> <hr> <div style=flex:1> <sh-grid> <sh-card columns=4 label=\"Dose Target\"> <sh-icon slot=functions button=\"\" icon=arrow-right></sh-icon> </sh-card> <sh-card columns=4 label=\"Dose Event\"> <sh-icon slot=functions button=\"\" icon=arrow-right></sh-icon> </sh-card> <sh-card columns=4 label=\"Dose Event\"> <sh-icon slot=functions button=\"\" icon=arrow-right></sh-icon> </sh-card> <sh-card columns=4 label=\"Exams and Patients\"> <sh-icon slot=functions button=\"\" icon=arrow-right></sh-icon> </sh-card> <sh-card columns=4 label=\"Exams Duration\"> <sh-icon slot=functions button=\"\" icon=arrow-right></sh-icon> </sh-card> <sh-card columns=4 label=\"Exam Change Time\"> <sh-icon slot=functions button=\"\" icon=arrow-right></sh-icon> </sh-card> <sh-card columns=4 label=\"Exams by Modalities\"> <sh-icon slot=functions button=\"\" icon=arrow-right></sh-icon> </sh-card> <sh-card columns=4 label=\"Exams / Top Scanners\"> <sh-icon slot=functions button=\"\" icon=arrow-right></sh-icon> </sh-card> <sh-card columns=4 label=\"Scanner Availability\"> <sh-icon slot=functions button=\"\" icon=arrow-right></sh-icon> </sh-card> </sh-grid> </div> </div> </sh-page> </template> </dom-module>");

var SamplePageDashboard = function (_Polymer$Element) {
  _inherits(SamplePageDashboard, _Polymer$Element);

  function SamplePageDashboard() {
    _classCallCheck(this, SamplePageDashboard);

    return _possibleConstructorReturn(this, (SamplePageDashboard.__proto__ || Object.getPrototypeOf(SamplePageDashboard)).apply(this, arguments));
  }

  _createClass(SamplePageDashboard, null, [{
    key: 'is',
    get: function get() {
      return 'sample-page-dashboard';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {};
    }
  }]);

  return SamplePageDashboard;
}(Polymer.Element);

window.customElements.define(SamplePageDashboard.is, SamplePageDashboard);

/***/ })
/******/ ]);