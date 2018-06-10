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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTokens = exports.setErrorMessage = exports.saved = exports.setType = exports.setColors = undefined;
exports.fetchRules = fetchRules;

var _externalDesignSystemService = __webpack_require__(1);

var _externalDesignSystemService2 = _interopRequireDefault(_externalDesignSystemService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var setColors = exports.setColors = function setColors(data) {
  return {
    type: 'SET_COLORS',
    data: data
  };
}; // import thunk from 'redux-thunk';
var setType = exports.setType = function setType(data) {
  return {
    type: 'SET_TYPE',
    data: data
  };
};

var saved = exports.saved = function saved(data) {
  return {
    type: 'SAVED',
    data: data
  };
};

var setErrorMessage = exports.setErrorMessage = function setErrorMessage(data) {
  return {
    type: 'SET_ERROR_MESSAGE',
    data: data
  };
};

var setTokens = exports.setTokens = function setTokens(data) {
  return {
    type: 'SET_TOKENS',
    data: data
  };
};

function fetchRules(endpoint) {
  return function (dispatch) {
    return _externalDesignSystemService2['default'].fetchTokens(endpoint).then(function (res) {
      dispatch(setTokens(res['data']));
    })['catch'](function (res) {});
  };
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"axios\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  fetchTokens: function () {
    function fetchTokens(endpoint) {
      return (0, _axios2['default'])({
        method: 'GET',
        url: endpoint,
        responseType: 'json'
      });
    }

    return fetchTokens;
  }()
};

/***/ })
/******/ ]);