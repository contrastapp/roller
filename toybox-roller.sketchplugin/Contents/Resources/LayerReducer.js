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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  page: { errors: 0, trends: 0 }
};

function buildLayers(state, layerMap) {
  var allLayers = _.flatten(_.values(layerMap));

  var layers = _.groupBy(allLayers, 'primary');

  // textGroups = _.groupBy(_.filter(action.data, {prop: 'text'}), (l) => _.join(_.map(_.keys(l.styles), (k) => l.styles[k]), '-'))
  // _.each(textGroups, (arr, s) => _.each(arr, (l) => l.category = 'text'))

  var trendByColor = {};
  _.each(layers, function (layers, hex) {
    trendByColor[hex] = _.groupBy(layers, 'prop');
  });

  var trendByProp = _.groupBy(allLayers, 'prop');
  trendByProp = _.each(trendByProp, function (layers, prop) {
    return trendByProp[prop] = _.groupBy(layers, 'primary');
  });

  return _extends({}, state, { trendByProp: trendByProp, trendByColor: trendByColor, layers: layers, layerMap: layerMap });
}

function setLayers(state, action) {
  // let layers = _.groupBy(action.data, 'primary')
  // layers = {...state.layers, ...layers}
  // let allLayers = _.flatten(_.values(layers))

  var layerMap = _.groupBy(action.data, 'id');
  layerMap = _extends({}, state.layerMap, layerMap);

  return buildLayers(state, layerMap);
}

function setActiveLayer(state, action) {
  state = setLayers(state, action);
  return _extends({}, state, { activeLayer: action.data[0] });
}

var pages = function pages() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var layers = void 0;
  var layerMap = void 0;
  var textGroups = void 0;
  switch (action.type) {
    case 'SET_LAYERS':
      return setLayers(state, action);
    case 'SET_ACTIVE_LAYER':
      return setActiveLayer(state, action);
    case 'SET_ACTIVE_LAYER_SKETCH':
      return setActiveLayer(_extends({}, state, { selected: true }), action);
    case 'SET_ACTIVE_LAYER_ID':
      return _extends({}, state, { selected: false, activeLayer: action.data });
    case 'CLEAR_LAYER':
      layerMap = state.layerMap;
      delete layerMap[action.data];

      return buildLayers(state, layerMap);
    case 'NEXT_PAGE':
      return _extends({}, state, { page: _extends({}, state.page, _defineProperty({}, action.tab, state.page[action.tab] + 1)) });
    case 'PREV_PAGE':
      return _extends({}, state, { page: _extends({}, state.page, _defineProperty({}, action.tab, state.page[action.tab] - 1)) });
    default:
      return state;
  }
};

exports['default'] = pages;

/***/ })
/******/ ]);