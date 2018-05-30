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
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var initialState = {
  layers: {},
  layerMap: {},
  activeLayer: null,
  page: 0
};

function setActiveLayer(state, action) {
  var layers = _.groupBy(action.data, 'primary');
  var layerMap = _.groupBy(action.data, 'id');
  return _extends({}, state, { activeLayer: action.data[0], layers: _extends({}, state.layers, layers), layerMap: _extends({}, state.layerMap, layerMap) });
}

var pages = function pages() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var layers = void 0;
  var layerMap = void 0;
  switch (action.type) {
    case 'SET_LAYERS':
      layers = _.groupBy(action.data, 'primary');
      return _extends({}, state, { layers: layers, layerMap: _.groupBy(action.data, 'id') });
    case 'SET_ACTIVE_LAYER':
      return setActiveLayer(state, action);
    case 'SET_ACTIVE_LAYER_SKETCH':
      return setActiveLayer(_extends({}, state, { selected: true }), action);
    case 'SET_ACTIVE_LAYER_ID':
      return _extends({}, state, { selected: false, activeLayer: action.data });
    case 'NEXT_PAGE':
      return _extends({}, state, { page: state.page + 1 });
    case 'PREV_PAGE':
      return _extends({}, state, { page: state.page - 1 });
    default:
      return state;
  }
};

exports['default'] = pages;

/***/ })
/******/ ]);