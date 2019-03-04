(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PDFAnnotate"] = factory();
	else
		root["PDFAnnotate"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StoreAdapter = __webpack_require__(8);

var _StoreAdapter2 = _interopRequireDefault(_StoreAdapter);

var _LocalStoreAdapter = __webpack_require__(27);

var _LocalStoreAdapter2 = _interopRequireDefault(_LocalStoreAdapter);

var _render = __webpack_require__(28);

var _render2 = _interopRequireDefault(_render);

var _UI = __webpack_require__(32);

var _UI2 = _interopRequireDefault(_UI);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _uuid = __webpack_require__(10);

var _uuid2 = _interopRequireDefault(_uuid);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  findAnnotationAtPoint: _utils.findAnnotationAtPoint,
  findSVGContainer: _utils.findSVGContainer,
  convertToScreenPoint: _utils.convertToScreenPoint,

  /**
   * Abstract class that needs to be defined so PDFJSAnnotate
   * knows how to communicate with your server.
   */
  StoreAdapter: _StoreAdapter2.default,

  /**
   * Implementation of StoreAdapter that stores annotation data to localStorage.
   */
  LocalStoreAdapter: _LocalStoreAdapter2.default,

  /**
   * Abstract instance of StoreAdapter
   */
  __storeAdapter: new _StoreAdapter2.default(),

  /**
   * Getter for the underlying StoreAdapter property
   *
   * @return {StoreAdapter}
   */
  getStoreAdapter: function getStoreAdapter() {
    return this.__storeAdapter;
  },


  /**
   * Setter for the underlying StoreAdapter property
   *
   * @param {StoreAdapter} adapter The StoreAdapter implementation to be used.
   */
  setStoreAdapter: function setStoreAdapter(adapter) {
    // TODO this throws an error when bundled
    // if (!(adapter instanceof StoreAdapter)) {
    //   throw new Error('adapter must be an instance of StoreAdapter');
    // }

    this.__storeAdapter = adapter;
  },


  /**
   * UI is a helper for instrumenting UI interactions for creating,
   * editing, and deleting annotations in the browser.
   */
  UI: _UI2.default,

  /**
   * Render the annotations for a page in the PDF Document
   *
   * @param {SVGElement} svg The SVG element that annotations should be rendered to
   * @param {PageViewport} viewport The PDFPage.getViewport data
   * @param {Object} data The StoreAdapter.getAnnotations data
   * @return {Promise}
   */
  render: _render2.default,

  /**
   * Convenience method for getting annotation data
   *
   * @alias StoreAdapter.getAnnotations
   * @param {String} documentId The ID of the document
   * @param {String} pageNumber The page number
   * @return {Promise}
   */
  getAnnotations: function getAnnotations(documentId, userId, pageNumber) {
    var _getStoreAdapter;

    return (_getStoreAdapter = this.getStoreAdapter()).getAnnotations.apply(_getStoreAdapter, arguments);
  },


  config: _config2.default,

  uuid: _uuid2.default
};
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BORDER_COLOR = undefined;
exports.findSVGContainer = findSVGContainer;
exports.findSVGAtPoint = findSVGAtPoint;
exports.findAnnotationAtPoint = findAnnotationAtPoint;
exports.pointIntersectsRect = pointIntersectsRect;
exports.getOffsetAnnotationRect = getOffsetAnnotationRect;
exports.scaleUp = scaleUp;
exports.convertToSvgRect = convertToSvgRect;
exports.convertToSvgPoint = convertToSvgPoint;
exports.convertToScreenPoint = convertToScreenPoint;
exports.scaleDown = scaleDown;
exports.getScroll = getScroll;
exports.getOffset = getOffset;
exports.disableUserSelect = disableUserSelect;
exports.enableUserSelect = enableUserSelect;
exports.getMetadata = getMetadata;

var _createStylesheet = __webpack_require__(18);

var _createStylesheet2 = _interopRequireDefault(_createStylesheet);

var _appendChild = __webpack_require__(2);

var _mathUtils = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BORDER_COLOR = exports.BORDER_COLOR = '#00BFFF';

var userSelectStyleSheet = (0, _createStylesheet2.default)({
  body: {
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none'
  }
});
userSelectStyleSheet.setAttribute('data-pdf-annotate-user-select', 'true');

/**
 * Find the SVGElement that contains all the annotations for a page
 *
 * @param {Element} node An annotation within that container
 * @return {SVGElement} The container SVG or null if it can't be found
 */
function findSVGContainer(node) {
  var parentNode = node;

  while ((parentNode = parentNode.parentNode) && parentNode !== document) {
    if (parentNode.nodeName.toUpperCase() === 'SVG' && parentNode.getAttribute('data-pdf-annotate-container') === 'true') {
      return parentNode;
    }
  }

  return null;
}

/**
 * Find an SVGElement container at a given point
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 * @return {SVGElement} The container SVG or null if one can't be found
 */
function findSVGAtPoint(x, y) {
  var elements = document.querySelectorAll('svg[data-pdf-annotate-container="true"]');

  for (var i = 0, l = elements.length; i < l; i++) {
    var el = elements[i];
    var rect = el.getBoundingClientRect();

    if (pointIntersectsRect(x, y, rect)) {
      return el;
    }
  }

  return null;
}

/**
 * Find an Element that represents an annotation at a given point.
 *
 * IMPORTANT: Requires the annotation layer to be the top most element so
 *            either use z-ordering or make it the leaf container.
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 * @return {Element} The annotation element or null if one can't be found
 */
function findAnnotationAtPoint(x, y) {
  var el = null;
  var candidate = document.elementFromPoint(x, y);
  while (!el && candidate && candidate !== document) {
    var type = candidate.getAttribute('data-pdf-annotate-type');
    if (type) {
      el = candidate;
    }
    candidate = candidate.parentNode;
  }
  return el;
}

/**
 * Determine if a point intersects a rect
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 * @param {Object} rect The points of a rect (likely from getBoundingClientRect)
 * @return {Boolean} True if a collision occurs, otherwise false
 */
function pointIntersectsRect(x, y, rect) {
  return y >= rect.top && y <= rect.bottom && x >= rect.left && x <= rect.right;
}

/**
 * Get the rect of an annotation element accounting for offset.
 *
 * @param {Element} el The element to get the rect of
 * @return {Object} The dimensions of the element
 */
function getOffsetAnnotationRect(el) {
  var rect = el.getBoundingClientRect();
  var width = rect.width,
      height = rect.height;

  var extraOffsetWidth = 0;
  var extraOffsetHeight = 0;
  if (['line', 'path'].indexOf(el.tagName.toLowerCase()) > -1 && el.getBBox) {
    var bbox = el.getBBox();
    extraOffsetWidth = (rect.width - bbox.width) / 2;
    extraOffsetHeight = (rect.height - bbox.height) / 2;
    width = bbox.width;
    height = bbox.height;
  }

  var _getOffset = getOffset(el),
      offsetLeft = _getOffset.offsetLeft,
      offsetTop = _getOffset.offsetTop;

  return {
    top: rect.top - offsetTop + extraOffsetHeight,
    left: rect.left - offsetLeft + extraOffsetWidth,
    bottom: rect.bottom - offsetTop - extraOffsetHeight,
    right: rect.right - offsetLeft - extraOffsetWidth,
    width: width,
    height: height
  };
}

/**
 * Adjust scale from normalized scale (100%) to rendered scale.
 *
 * @param {SVGElement} svg The SVG to gather metadata from
 * @param {Object} rect A map of numeric values to scale
 * @return {Object} A copy of `rect` with values scaled up
 */
function scaleUp(svg, rect) {
  var result = {};

  var _getMetadata = getMetadata(svg),
      viewport = _getMetadata.viewport;

  Object.keys(rect).forEach(function (key) {
    result[key] = rect[key] * viewport.scale;
  });

  return result;
}

function convertToSvgRect(rect, svg, viewport) {
  var pt1 = [rect.x, rect.y];
  var pt2 = [rect.x + rect.width, rect.y + rect.height];

  pt1 = convertToSvgPoint(pt1, svg, viewport);
  pt2 = convertToSvgPoint(pt2, svg, viewport);

  return {
    x: Math.min(pt1[0], pt2[0]),
    y: Math.min(pt1[1], pt2[1]),
    width: Math.abs(pt2[0] - pt1[0]),
    height: Math.abs(pt2[1] - pt1[1])
  };
}

function convertToSvgPoint(pt, svg, viewport) {
  var result = {};
  viewport = viewport || getMetadata(svg).viewport;

  var xform = [1, 0, 0, 1, 0, 0];
  xform = (0, _mathUtils.scale)(xform, viewport.scale, viewport.scale);
  xform = (0, _mathUtils.rotate)(xform, viewport.rotation);

  var offset = (0, _appendChild.getTranslation)(viewport);
  xform = (0, _mathUtils.translate)(xform, offset.x, offset.y);

  return (0, _mathUtils.applyInverseTransform)(pt, xform);
}

function convertToScreenPoint(pt, svg, viewport) {
  var result = {};
  viewport = viewport || getMetadata(svg).viewport;

  var xform = [1, 0, 0, 1, 0, 0];
  xform = (0, _mathUtils.scale)(xform, viewport.scale, viewport.scale);
  xform = (0, _mathUtils.rotate)(xform, viewport.rotation);

  var offset = (0, _appendChild.getTranslation)(viewport);
  xform = (0, _mathUtils.translate)(xform, offset.x, offset.y);

  return (0, _mathUtils.applyTransform)(pt, xform);
}

/**
 * Adjust scale from rendered scale to a normalized scale (100%).
 *
 * @param {SVGElement} svg The SVG to gather metadata from
 * @param {Object} rect A map of numeric values to scale
 * @return {Object} A copy of `rect` with values scaled down
 */
function scaleDown(svg, rect) {
  var result = {};

  var _getMetadata2 = getMetadata(svg),
      viewport = _getMetadata2.viewport;

  Object.keys(rect).forEach(function (key) {
    result[key] = rect[key] / viewport.scale;
  });

  return result;
}

/**
 * Get the scroll position of an element, accounting for parent elements
 *
 * @param {Element} el The element to get the scroll position for
 * @return {Object} The scrollTop and scrollLeft position
 */
function getScroll(el) {
  var scrollTop = 0;
  var scrollLeft = 0;
  var parentNode = el;

  while ((parentNode = parentNode.parentNode) && parentNode !== document) {
    scrollTop += parentNode.scrollTop;
    scrollLeft += parentNode.scrollLeft;
  }

  return { scrollTop: scrollTop, scrollLeft: scrollLeft };
}

/**
 * Get the offset position of an element, accounting for parent elements
 *
 * @param {Element} el The element to get the offset position for
 * @return {Object} The offsetTop and offsetLeft position
 */
function getOffset(el) {
  var parentNode = el;

  while ((parentNode = parentNode.parentNode) && parentNode !== document) {
    if (parentNode.nodeName.toUpperCase() === 'SVG') {
      break;
    }
  }

  var rect = parentNode.getBoundingClientRect();

  return { offsetLeft: rect.left, offsetTop: rect.top };
}

/**
 * Disable user ability to select text on page
 */
function disableUserSelect() {
  if (!userSelectStyleSheet.parentNode) {
    document.head.appendChild(userSelectStyleSheet);
  }
}

/**
 * Enable user ability to select text on page
 */
function enableUserSelect() {
  if (userSelectStyleSheet.parentNode) {
    userSelectStyleSheet.parentNode.removeChild(userSelectStyleSheet);
  }
}

/**
 * Get the metadata for a SVG container
 *
 * @param {SVGElement} svg The SVG container to get metadata for
 */
function getMetadata(svg) {
  return {
    documentId: svg.getAttribute('data-pdf-annotate-document'),
    userId: svg.getAttribute('data-pdf-annotate-user'),
    pageNumber: parseInt(svg.getAttribute('data-pdf-annotate-page'), 10),
    viewport: JSON.parse(svg.getAttribute('data-pdf-annotate-viewport'))
  };
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTranslation = getTranslation;
exports.appendChild = appendChild;
exports.transformChild = transformChild;

var _objectAssign = __webpack_require__(19);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _renderLine = __webpack_require__(20);

var _renderLine2 = _interopRequireDefault(_renderLine);

var _renderPath = __webpack_require__(21);

var _renderPath2 = _interopRequireDefault(_renderPath);

var _renderPoint = __webpack_require__(22);

var _renderPoint2 = _interopRequireDefault(_renderPoint);

var _renderRect = __webpack_require__(23);

var _renderRect2 = _interopRequireDefault(_renderRect);

var _renderText = __webpack_require__(24);

var _renderText2 = _interopRequireDefault(_renderText);

var _renderCircle = __webpack_require__(25);

var _renderCircle2 = _interopRequireDefault(_renderCircle);

var _renderArrow = __webpack_require__(26);

var _renderArrow2 = _interopRequireDefault(_renderArrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isFirefox = /firefox/i.test(navigator.userAgent);

/**
 * Get the x/y translation to be used for transforming the annotations
 * based on the rotation of the viewport.
 *
 * @param {Object} viewport The viewport data from the page
 * @return {Object}
 */
function getTranslation(viewport) {
  var x = void 0;
  var y = void 0;

  // Modulus 360 on the rotation so that we only
  // have to worry about four possible values.
  switch (viewport.rotation % 360) {
    case 0:
      x = y = 0;
      break;
    case 90:
      x = 0;
      y = viewport.width / viewport.scale * -1;
      break;
    case 180:
      x = viewport.width / viewport.scale * -1;
      y = viewport.height / viewport.scale * -1;
      break;
    case 270:
      x = viewport.height / viewport.scale * -1;
      y = 0;
      break;
  }

  return { x: x, y: y };
}

/**
 * Transform the rotation and scale of a node using SVG's native transform attribute.
 *
 * @param {Node} node The node to be transformed
 * @param {Object} viewport The page's viewport data
 * @return {Node}
 */
function transform(node, viewport) {
  var trans = getTranslation(viewport);

  // Let SVG natively transform the element
  node.setAttribute('transform', 'scale(' + viewport.scale + ') rotate(' + viewport.rotation + ') translate(' + trans.x + ', ' + trans.y + ')');

  // Manually adjust x/y for nested SVG nodes
  if (!isFirefox && node.nodeName.toLowerCase() === 'svg') {
    node.setAttribute('x', parseInt(node.getAttribute('x'), 10) * viewport.scale);
    node.setAttribute('y', parseInt(node.getAttribute('y'), 10) * viewport.scale);

    var x = parseInt(node.getAttribute('x', 10));
    var y = parseInt(node.getAttribute('y', 10));
    var width = parseInt(node.getAttribute('width'), 10);
    var height = parseInt(node.getAttribute('height'), 10);
    var path = node.querySelector('path');
    var svg = path.parentNode;

    // Scale width/height
    [node, svg, path, node.querySelector('rect')].forEach(function (n) {
      n.setAttribute('width', parseInt(n.getAttribute('width'), 10) * viewport.scale);
      n.setAttribute('height', parseInt(n.getAttribute('height'), 10) * viewport.scale);
    });

    // Transform path but keep scale at 100% since it will be handled natively
    transform(path, (0, _objectAssign2.default)({}, viewport, { scale: 1 }));

    switch (viewport.rotation % 360) {
      case 90:
        node.setAttribute('x', viewport.width - y - width);
        node.setAttribute('y', x);
        svg.setAttribute('x', 1);
        svg.setAttribute('y', 0);
        break;
      case 180:
        node.setAttribute('x', viewport.width - x - width);
        node.setAttribute('y', viewport.height - y - height);
        svg.setAttribute('y', 2);
        break;
      case 270:
        node.setAttribute('x', y);
        node.setAttribute('y', viewport.height - x - height);
        svg.setAttribute('x', -1);
        svg.setAttribute('y', 0);
        break;
    }
  }

  return node;
}

/**
 * Append an annotation as a child of an SVG.
 *
 * @param {SVGElement} svg The SVG element to append the annotation to
 * @param {Object} annotation The annotation definition to render and append
 * @param {Object} viewport The page's viewport data
 * @return {SVGElement} A node that was created and appended by this function
 */
function appendChild(svg, annotation, viewport) {
  if (!viewport) {
    viewport = JSON.parse(svg.getAttribute('data-pdf-annotate-viewport'));
  }

  var child = void 0;
  switch (annotation.type) {
    case 'area':
    case 'highlight':
      child = (0, _renderRect2.default)(annotation);
      break;
    case 'circle':
    case 'fillcircle':
    case 'emptycircle':
      child = (0, _renderCircle2.default)(annotation);
      break;
    case 'strikeout':
      child = (0, _renderLine2.default)(annotation);
      break;
    case 'point':
      child = (0, _renderPoint2.default)(annotation);
      break;
    case 'textbox':
      child = (0, _renderText2.default)(annotation);
      break;
    case 'drawing':
      child = (0, _renderPath2.default)(annotation);
      break;
    case 'arrow':
      child = (0, _renderArrow2.default)(annotation);
      break;
  }

  // If no type was provided for an annotation it will result in node being null.
  // Skip appending/transforming if node doesn't exist.
  if (child) {
    // Set attributes
    child.setAttribute('data-pdf-annotate-id', annotation.uuid);
    child.setAttribute('data-pdf-annotate-type', annotation.type);
    child.setAttribute('data-pdf-annotate-userId', annotation.userId);
    child.setAttribute('aria-hidden', true);

    svg.appendChild(transform(child, viewport));
  }

  return child;
}

/**
 * Transform a child annotation of an SVG.
 *
 * @param {SVGElement} svg The SVG element with the child annotation
 * @param {Object} child The SVG child to transform
 * @param {Object} viewport The page's viewport data
 * @return {SVGElement} A node that was transformed by this function
 */
function transformChild(svg, child, viewport) {
  if (!viewport) {
    viewport = JSON.parse(svg.getAttribute('data-pdf-annotate-viewport'));
  }

  // If no type was provided for an annotation it will result in node being null.
  // Skip transforming if node doesn't exist.
  if (child) {
    child = transform(child, viewport);
  }

  return child;
}

exports.default = {
  /**
   * Get the x/y translation to be used for transforming the annotations
   * based on the rotation of the viewport.
   */
  getTranslation: getTranslation,

  /**
   * Append an SVG child for an annotation
   */
  appendChild: appendChild,

  /**
   * Transform an existing SVG child
   */
  transformChild: transformChild
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    annotationLayerName: 'annotationLayer',
    textLayerName: 'textLayer',
    annotationSvgQuery: function annotationSvgQuery() {
        return 'svg.' + this.annotationLayerName;
    },
    annotationClassQuery: function annotationClassQuery() {
        return '.' + this.annotationLayerName;
    },
    textClassQuery: function textClassQuery() {
        return '.' + this.textLayerName;
    }
};
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setAttributes;
var UPPER_REGEX = /[A-Z]/g;

// Don't convert these attributes from camelCase to hyphenated-attributes
var BLACKLIST = ['viewBox'];

var keyCase = function keyCase(key) {
  if (BLACKLIST.indexOf(key) === -1) {
    key = key.replace(UPPER_REGEX, function (match) {
      return '-' + match.toLowerCase();
    });
  }
  return key;
};

/**
 * Set attributes for a node from a map
 *
 * @param {Node} node The node to set attributes on
 * @param {Object} attributes The map of key/value pairs to use for attributes
 */
function setAttributes(node, attributes) {
  Object.keys(attributes).forEach(function (key) {
    node.setAttribute(keyCase(key), attributes[key]);
  });
}
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeColor;
var REGEX_HASHLESS_HEX = /^([a-f0-9]{6}|[a-f0-9]{3})$/i;

/**
 * Normalize a color value
 *
 * @param {String} color The color to normalize
 * @return {String}
 */
function normalizeColor(color) {
  if (REGEX_HASHLESS_HEX.test(color)) {
    color = "#" + color;
  }
  return color;
}
module.exports = exports["default"];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fireEvent = fireEvent;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;

var _events = __webpack_require__(17);

var _events2 = _interopRequireDefault(_events);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = new _events2.default();

var clickNode = void 0;

/**
 * Handle document.click event
 *
 * @param {Event} e The DOM event to be handled
 */
document.addEventListener('click', function handleDocumentClick(e) {
  if (!(0, _utils.findSVGAtPoint)(e.clientX, e.clientY)) {
    return;
  }

  var target = (0, _utils.findAnnotationAtPoint)(e.clientX, e.clientY);

  // Emit annotation:blur if clickNode is no longer clicked
  if (clickNode && clickNode !== target) {
    emitter.emit('annotation:blur', clickNode);
  }

  // Emit annotation:click if target was clicked
  if (target) {
    emitter.emit('annotation:click', target);
  }

  clickNode = target;
});

// let mouseOverNode;
// document.addEventListener('mousemove', function handleDocumentMousemove(e) {
//   let target = findAnnotationAtPoint(e.clientX, e.clientY);
//
//   // Emit annotation:mouseout if target was mouseout'd
//   if (mouseOverNode && !target) {
//     emitter.emit('annotation:mouseout', mouseOverNode);
//   }
//
//   // Emit annotation:mouseover if target was mouseover'd
//   if (target && mouseOverNode !== target) {
//     emitter.emit('annotation:mouseover', target);
//   }
//
//   mouseOverNode = target;
// });

function fireEvent() {
  emitter.emit.apply(emitter, arguments);
};
function addEventListener() {
  emitter.on.apply(emitter, arguments);
};
function removeEventListener() {
  emitter.removeListener.apply(emitter, arguments);
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderScreenReaderHints;

var _insertScreenReaderHint = __webpack_require__(11);

var _insertScreenReaderHint2 = _interopRequireDefault(_insertScreenReaderHint);

var _initEventHandlers = __webpack_require__(31);

var _initEventHandlers2 = _interopRequireDefault(_initEventHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO This is not the right place for this to live
(0, _initEventHandlers2.default)();

/**
 * Insert hints into the DOM for screen readers.
 *
 * @param {Array} annotations The annotations that hints are inserted for
 */
function renderScreenReaderHints(annotations) {
  annotations = Array.isArray(annotations) ? annotations : [];

  // Insert hints for each type
  Object.keys(SORT_TYPES).forEach(function (type) {
    var sortBy = SORT_TYPES[type];
    annotations.filter(function (a) {
      return a.type === type;
    }).sort(sortBy).forEach(function (a, i) {
      return (0, _insertScreenReaderHint2.default)(a, i + 1);
    });
  });
}

// Sort annotations first by y, then by x.
// This allows hints to be injected in the order they appear,
// which makes numbering them easier.
function sortByPoint(a, b) {
  if (a.y < b.y) {
    return a.x - b.x;
  } else {
    return 1;
  }
}

// Sort annotation by it's first rectangle
function sortByRectPoint(a, b) {
  return sortByPoint(a.rectangles[0], b.rectangles[0]);
}

// Sort annotation by it's first line
function sortByLinePoint(a, b) {
  var lineA = a.lines[0];
  var lineB = b.lines[0];
  return sortByPoint({ x: lineA[0], y: lineA[1] }, { x: lineB[0], y: lineB[1] });
}

// Arrange supported types and associated sort methods
var SORT_TYPES = {
  'highlight': sortByRectPoint,
  'strikeout': sortByRectPoint,
  'drawing': sortByLinePoint,
  'textbox': sortByPoint,
  'point': sortByPoint,
  'area': sortByPoint
};
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstractFunction = __webpack_require__(16);

var _abstractFunction2 = _interopRequireDefault(_abstractFunction);

var _event = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Adapter should never be invoked publicly
var StoreAdapter = function () {
  /**
   * Create a new StoreAdapter instance
   *
   * @param {Object} [definition] The definition to use for overriding abstract methods
   */
  function StoreAdapter() {
    var _this = this;

    var definition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, StoreAdapter);

    // Copy each function from definition if it is a function we know about
    Object.keys(definition).forEach(function (key) {
      if (typeof definition[key] === 'function' && typeof _this[key] === 'function') {
        _this[key] = definition[key];
      }
    });
  }

  /**
   * Get all the annotations for a given document and page number.
   *
   * @param {String} documentId The ID for the document the annotations belong to
   * @param {String} userId The user makeing changes to this document
   * @param {Number} pageNumber The number of the page the annotations belong to
   * @return {Promise}
   */


  _createClass(StoreAdapter, [{
    key: '__getAnnotations',
    value: function __getAnnotations(documentId, userId, pageNumber) {
      (0, _abstractFunction2.default)('getAnnotations');
    }
  }, {
    key: 'getAnnotation',


    /**
     * Get the definition for a specific annotation.
     *
     * @param {String} documentId The ID for the document the annotation belongs to
     * @param {String} userId
     * @param {String} annotationId The ID for the annotation
     * @return {Promise}
     */
    value: function getAnnotation(documentId, userId, annotationId) {
      (0, _abstractFunction2.default)('getAnnotation');
    }

    /**
     * Add an annotation
     *
     * @param {String} documentId The ID for the document to add the annotation to
     * @param {String} userId The ID of the user
     * @param {String} pageNumber The page number to add the annotation to
     * @param {Object} annotation The definition for the new annotation
     * @return {Promise}
     */

  }, {
    key: '__addAnnotation',
    value: function __addAnnotation(documentId, userId, pageNumber, annotation) {
      (0, _abstractFunction2.default)('addAnnotation');
    }
  }, {
    key: '__editAnnotation',


    /**
     * Edit an annotation
     *
     * @param {String} documentId The ID for the document
     * @param {String} userId The Id of the user
     * @param {String} pageNumber the page number of the annotation
     * @param {Object} annotation The definition of the modified annotation
     * @return {Promise}
     */
    value: function __editAnnotation(documentId, userId, pageNumber, annotation) {
      (0, _abstractFunction2.default)('editAnnotation');
    }
  }, {
    key: '__deleteAnnotation',


    /**
     * Delete an annotation
     *
     * @param {String} documentId The ID for the document
     * @param {String} userId
     * @param {String} annotationId The ID for the annotation
     * @return {Promise}
     */
    value: function __deleteAnnotation(documentId, userId, annotationId) {
      (0, _abstractFunction2.default)('deleteAnnotation');
    }
  }, {
    key: 'getComments',


    /**
     * Get all the comments for an annotation
     *
     * @param {String} documentId The ID for the document
     * @param {String} userId
     * @param {String} annotationId The ID for the annotation
     * @return {Promise}
     */
    value: function getComments(documentId, userId, annotationId) {
      (0, _abstractFunction2.default)('getComments');
    }

    /**
     * Add a new comment
     *
     * @param {String} documentId The ID for the document
     * @param {String} userId
     * @param {String} annotationId The ID for the annotation
     * @param {Object} content The definition of the comment
     * @return {Promise}
     */

  }, {
    key: '__addComment',
    value: function __addComment(documentId, userId, annotationId, content) {
      (0, _abstractFunction2.default)('addComment');
    }
  }, {
    key: '__deleteComment',


    /**
     * Delete a comment
     *
     * @param {String} documentId The ID for the document
     * @param {String} userId
     * @param {String} commentId The ID for the comment
     * @return {Promise}
     */
    value: function __deleteComment(documentId, userId, commentId) {
      (0, _abstractFunction2.default)('deleteComment');
    }
  }, {
    key: 'getAnnotations',
    get: function get() {
      return this.__getAnnotations;
    },
    set: function set(fn) {
      this.__getAnnotations = function getAnnotations(documentId, userId, pageNumber) {
        return fn.apply(undefined, arguments).then(function (annotations) {
          // TODO may be best to have this happen on the server
          if (annotations.annotations) {
            annotations.annotations.forEach(function (a) {
              a.documentId = documentId;
            });
          }
          return annotations;
        });
      };
    }
  }, {
    key: 'addAnnotation',
    get: function get() {
      return this.__addAnnotation;
    },
    set: function set(fn) {
      this.__addAnnotation = function addAnnotation(documentId, userId, pageNumber, annotation) {
        return fn.apply(undefined, arguments).then(function (annotation) {
          (0, _event.fireEvent)('annotation:add', documentId, userId, pageNumber, annotation);
          return annotation;
        });
      };
    }
  }, {
    key: 'editAnnotation',
    get: function get() {
      return this.__editAnnotation;
    },
    set: function set(fn) {
      this.__editAnnotation = function editAnnotation(documentId, userId, annotationId, annotation) {
        return fn.apply(undefined, arguments).then(function (annotation) {
          (0, _event.fireEvent)('annotation:edit', documentId, userId, annotationId, annotation);
          return annotation;
        });
      };
    }
  }, {
    key: 'deleteAnnotation',
    get: function get() {
      return this.__deleteAnnotation;
    },
    set: function set(fn) {
      this.__deleteAnnotation = function deleteAnnotation(documentId, userId, annotationId) {
        return fn.apply(undefined, arguments).then(function (success) {
          if (success) {
            (0, _event.fireEvent)('annotation:delete', documentId, userId, annotationId);
          }
          return success;
        });
      };
    }
  }, {
    key: 'addComment',
    get: function get() {
      return this.__addComment;
    },
    set: function set(fn) {
      this.__addComment = function addComment(documentId, userId, annotationId, content) {
        return fn.apply(undefined, arguments).then(function (comment) {
          (0, _event.fireEvent)('comment:add', documentId, userId, annotationId, comment);
          return comment;
        });
      };
    }
  }, {
    key: 'deleteComment',
    get: function get() {
      return this.__deleteComment;
    },
    set: function set(fn) {
      this.__deleteComment = function deleteComment(documentId, userId, commentId) {
        return fn.apply(undefined, arguments).then(function (success) {
          if (success) {
            (0, _event.fireEvent)('comment:delete', documentId, commentId);
          }
          return success;
        });
      };
    }
  }]);

  return StoreAdapter;
}();

exports.default = StoreAdapter;
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyTransform = applyTransform;
exports.applyInverseTransform = applyInverseTransform;
exports.transform = transform;
exports.translate = translate;
exports.rotate = rotate;
exports.scale = scale;
exports.makePoint = makePoint;
exports.makeVector = makeVector;
exports.makeVectorFromPoints = makeVectorFromPoints;
exports.addVector = addVector;
exports.multiplyVector = multiplyVector;
exports.magnitude = magnitude;
exports.negateVector = negateVector;
exports.unitVector = unitVector;
exports.crossProduct = crossProduct;
// Transform point by matrix
//
function applyTransform(p, m) {
  var xt = p[0] * m[0] + p[1] * m[2] + m[4];
  var yt = p[0] * m[1] + p[1] * m[3] + m[5];
  return [xt, yt];
};

// Transform point by matrix inverse
//
function applyInverseTransform(p, m) {
  var d = m[0] * m[3] - m[1] * m[2];
  var xt = (p[0] * m[3] - p[1] * m[2] + m[2] * m[5] - m[4] * m[3]) / d;
  var yt = (-p[0] * m[1] + p[1] * m[0] + m[4] * m[1] - m[5] * m[0]) / d;
  return [xt, yt];
};

// Concatenates two transformation matrices together and returns the result.
function transform(m1, m2) {
  return [m1[0] * m2[0] + m1[2] * m2[1], m1[1] * m2[0] + m1[3] * m2[1], m1[0] * m2[2] + m1[2] * m2[3], m1[1] * m2[2] + m1[3] * m2[3], m1[0] * m2[4] + m1[2] * m2[5] + m1[4], m1[1] * m2[4] + m1[3] * m2[5] + m1[5]];
};

function translate(m, x, y) {
  return [m[0], m[1], m[2], m[3], m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
};

function rotate(m, angle) {
  angle = angle * Math.PI / 180;

  var cosValue = Math.cos(angle);
  var sinValue = Math.sin(angle);

  return [m[0] * cosValue + m[2] * sinValue, m[1] * cosValue + m[3] * sinValue, m[0] * -sinValue + m[2] * cosValue, m[1] * -sinValue + m[3] * cosValue, m[4], m[5]];
};

function scale(m, x, y) {
  return [m[0] * x, m[1] * x, m[2] * y, m[3] * y, m[4], m[5]];
};

function getInverseTransform(m) {
  var d = m[0] * m[3] - m[1] * m[2];
  return [m[3] / d, -m[1] / d, -m[2] / d, m[0] / d, (m[2] * m[5] - m[4] * m[3]) / d, (m[4] * m[1] - m[5] * m[0]) / d];
};

function makePoint(x, y, z) {
  return { x: x, y: y, z: z };
}

function makeVector(xcoord, ycoord, zcoord) {
  return { xcoord: xcoord, ycoord: ycoord, zcoord: zcoord };
}

function makeVectorFromPoints(pt1, pt2) {
  var xcoord = pt2.x - pt1.x;
  var ycoord = pt2.y - pt1.y;
  var zcoord = pt2.z - pt1.z;
  return makeVector(xcoord, ycoord, zcoord);
}

function addVector(pt, v) {
  return makePoint(pt.x + v.xcoord, pt.y + v.ycoord, pt.z + v.zcoord);
}

function multiplyVector(v, scalar) {
  return makeVector(v.xcoord * scalar, v.ycoord * scalar, v.zcoord * scalar);
}

function magnitude(v) {
  return Math.sqrt(Math.pow(v.xcoord, 2) + Math.pow(v.ycoord, 2) + Math.pow(v.zcoord, 2));
}

function negateVector(v) {
  return multiplyVector(v, -1);
}

function unitVector(v) {
  var mag = magnitude(v);
  var xcoord = v.xcoord / mag;
  var ycoord = v.ycoord / mag;
  var zcoord = v.zcoord / mag;
  return makeVector(xcoord, ycoord, zcoord);
}

function crossProduct(u, v) {
  //
  // u X v = < u2*v3 - u3*v2,
  //           u3*v1 - u1*v3,
  //           u1*v2 - u2*v1 >
  var xcoord = u.ycoord * v.zcoord - u.zcoord * v.ycoord;
  var ycoord = u.zcoord * v.xcoord - u.xcoord * v.zcoord;
  var zcoord = u.xcoord * v.ycoord - u.ycoord * v.xcoord;
  return makeVector(xcoord, ycoord, zcoord);
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uuid;
var REGEXP = /[xy]/g;
var PATTERN = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

function replacement(c) {
  var r = Math.random() * 16 | 0;
  var v = c == 'x' ? r : r & 0x3 | 0x8;
  return v.toString(16);
}

/**
 * Generate a univierally unique identifier
 *
 * @return {String}
 */
function uuid() {
  return PATTERN.replace(REGEXP, replacement);
}
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertScreenReaderHint;

var _createScreenReaderOnly = __webpack_require__(29);

var _createScreenReaderOnly2 = _interopRequireDefault(_createScreenReaderOnly);

var _insertElementWithinChildren = __webpack_require__(30);

var _insertElementWithinChildren2 = _interopRequireDefault(_insertElementWithinChildren);

var _insertElementWithinElement = __webpack_require__(12);

var _insertElementWithinElement2 = _interopRequireDefault(_insertElementWithinElement);

var _renderScreenReaderComments = __webpack_require__(13);

var _renderScreenReaderComments2 = _interopRequireDefault(_renderScreenReaderComments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Annotation types that support comments
var COMMENT_TYPES = ['highlight', 'point', 'area', 'circle', 'emptycircle', 'fillcircle'];

/**
 * Insert a hint into the DOM for screen readers for a specific annotation.
 *
 * @param {Object} annotation The annotation to insert a hint for
 * @param {Number} num The number of the annotation out of all annotations of the same type
 */
function insertScreenReaderHint(annotation) {
  var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  switch (annotation.type) {
    case 'highlight':
    case 'strikeout':
      var rects = annotation.rectangles;
      var first = rects[0];
      var last = rects[rects.length - 1];

      (0, _insertElementWithinElement2.default)((0, _createScreenReaderOnly2.default)('Begin ' + annotation.type + ' annotation ' + num, annotation.uuid), first.x, first.y, annotation.page, true);

      (0, _insertElementWithinElement2.default)((0, _createScreenReaderOnly2.default)('End ' + annotation.type + ' annotation ' + num, annotation.uuid + '-end'), last.x + last.width, last.y, annotation.page, false);
      break;

    case 'textbox':
    case 'point':
      var text = annotation.type === 'textbox' ? ' (content: ' + annotation.content + ')' : '';

      (0, _insertElementWithinChildren2.default)((0, _createScreenReaderOnly2.default)(annotation.type + ' annotation ' + num + text, annotation.uuid), annotation.x, annotation.y, annotation.page);
      break;

    case 'drawing':
    case 'area':
      var x = typeof annotation.x !== 'undefined' ? annotation.x : annotation.lines[0][0];
      var y = typeof annotation.y !== 'undefined' ? annotation.y : annotation.lines[0][1];

      (0, _insertElementWithinChildren2.default)((0, _createScreenReaderOnly2.default)('Unlabeled drawing', annotation.uuid), x, y, annotation.page);
      break;

    case 'circle':
    case 'fillcircle':
    case 'emptycircle':
      var x2 = typeof annotation.cx !== 'undefined' ? annotation.cx : annotation.lines[0][0];
      var y2 = typeof annotation.cy !== 'undefined' ? annotation.cy : annotation.lines[0][1];

      (0, _insertElementWithinChildren2.default)((0, _createScreenReaderOnly2.default)('Unlabeled drawing', annotation.uuid), x2, y2, annotation.page);
      break;
  }

  // Include comments in screen reader hint
  if (COMMENT_TYPES.includes(annotation.type)) {
    (0, _renderScreenReaderComments2.default)(annotation.documentId, annotation.uuid);
  }
}
module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertElementWithinElement;

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Insert an element at a point within the document.
 * This algorithm will only insert within an element amidst it's text content.
 *
 * @param {Element} el The element to be inserted
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 * @param {Number} pageNumber The page number to limit elements to
 * @param {Boolean} insertBefore Whether the element is to be inserted before or after x
 * @return {Boolean} True if element was able to be inserted, otherwise false
 */
function insertElementWithinElement(el, x, y, pageNumber, insertBefore) {
  var OFFSET_ADJUST = 2;

  // If inserting before adjust `x` by looking for element a few px to the right
  // Otherwise adjust a few px to the left
  // This is to allow a little tolerance by searching within the box, instead
  // of getting a false negative by testing right on the border.
  x = Math.max(x + OFFSET_ADJUST * (insertBefore ? 1 : -1), 0);

  var node = textLayerElementFromPoint(x, y + OFFSET_ADJUST, pageNumber);
  if (!node) {
    return false;
  }

  // Now that node has been found inverse the adjustment for `x`.
  // This is done to accomodate tolerance by cutting off on the outside of the
  // text boundary, instead of missing a character by cutting off within.
  x = x + OFFSET_ADJUST * (insertBefore ? -1 : 1);

  var svg = document.querySelector('svg[data-pdf-annotate-page="' + pageNumber + '"]');
  var left = (0, _utils.scaleDown)(svg, { left: node.getBoundingClientRect().left }).left - svg.getBoundingClientRect().left;
  var temp = node.cloneNode(true);
  var head = temp.innerHTML.split('');
  var tail = [];

  // Insert temp off screen
  temp.style.position = 'absolute';
  temp.style.top = '-10000px';
  temp.style.left = '-10000px';
  document.body.appendChild(temp);

  while (head.length) {
    // Don't insert within HTML tags
    if (head[head.length - 1] === '>') {
      while (head.length) {
        tail.unshift(head.pop());
        if (tail[0] === '<') {
          break;
        }
      }
    }

    // Check if width of temp based on current head value satisfies x
    temp.innerHTML = head.join('');
    var width = (0, _utils.scaleDown)(svg, { width: temp.getBoundingClientRect().width }).width;
    if (left + width <= x) {
      break;
    }
    tail.unshift(head.pop());
  }

  // Update original node with new markup, including element to be inserted
  node.innerHTML = head.join('') + el.outerHTML + tail.join('');
  temp.parentNode.removeChild(temp);

  return true;
}

/**
 * Get a text layer element at a given point on a page
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 * @param {Number} pageNumber The page to limit elements to
 * @return {Element} First text layer element found at the point
 */
function textLayerElementFromPoint(x, y, pageNumber) {
  var svg = document.querySelector('svg[data-pdf-annotate-page="' + pageNumber + '"]');
  var rect = svg.getBoundingClientRect();
  y = (0, _utils.scaleUp)(svg, { y: y }).y + rect.top;
  x = (0, _utils.scaleUp)(svg, { x: x }).x + rect.left;
  return [].concat(_toConsumableArray(svg.parentNode.querySelectorAll(_config2.default.textClassQuery() + ' [data-canvas-width]'))).filter(function (el) {
    return (0, _utils.pointIntersectsRect)(x, y, el.getBoundingClientRect());
  })[0];
}
module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderScreenReaderComments;

var _PDFJSAnnotate = __webpack_require__(0);

var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

var _insertScreenReaderComment = __webpack_require__(14);

var _insertScreenReaderComment2 = _interopRequireDefault(_insertScreenReaderComment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Insert the comments into the DOM to be available by screen reader
 *
 * Example output:
 *   <div class="screenReaderOnly">
 *    <div>Begin highlight 1</div>
 *    <ol aria-label="Comments">
 *      <li>Foo</li>
 *      <li>Bar</li>
 *      <li>Baz</li>
 *      <li>Qux</li>
 *    </ol>
 *  </div>
 *  <div>Some highlighted text goes here...</div>
 *  <div class="screenReaderOnly">End highlight 1</div>
 *
 * NOTE: `screenReaderOnly` is not a real class, just used for brevity
 *
 * @param {String} documentId The ID of the document
 * @param {String} annotationId The ID of the annotation
 * @param {Array} [comments] Optionally preloaded comments to be rendered
 * @return {Promise}
 */
function renderScreenReaderComments(documentId, annotationId, comments) {
  var promise = void 0;

  if (Array.isArray(comments)) {
    promise = Promise.resolve(comments);
  } else {
    promise = _PDFJSAnnotate2.default.getStoreAdapter().getComments(documentId, annotationId);
  }

  return promise.then(function (comments) {
    // Node needs to be found by querying DOM as it may have been inserted as innerHTML
    // leaving `screenReaderNode` as an invalid reference (see `insertElementWithinElement`).
    var node = document.getElementById('pdf-annotate-screenreader-' + annotationId);
    if (node) {
      var list = document.createElement('ol');
      list.setAttribute('id', 'pdf-annotate-screenreader-comment-list-' + annotationId);
      list.setAttribute('aria-label', 'Comments');
      node.appendChild(list);
      comments.forEach(_insertScreenReaderComment2.default);
    }
  });
}
module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertScreenReaderComment;
/**
 * Insert a comment into the DOM to be available by screen reader
 *
 * @param {Object} comment The comment to be inserted
 */
function insertScreenReaderComment(comment) {
  if (!comment) {
    return;
  }

  var list = document.querySelector('#pdf-annotate-screenreader-' + comment.annotation + ' ol');
  if (list) {
    var item = document.createElement('li');
    item.setAttribute('id', 'pdf-annotate-screenreader-comment-' + comment.uuid);
    item.appendChild(document.createTextNode('' + comment.content));
    list.appendChild(item);
  }
}
module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PDFJSAnnotate = __webpack_require__(0);

var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PDFJSAnnotate2.default;
module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = abstractFunction;
/**
 * Throw an Error for an abstract function that hasn't been implemented.
 *
 * @param {String} name The name of the abstract function
 */
function abstractFunction(name) {
  throw new Error(name + ' is not implemented');
}
module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function createStyleSheet(blocks) {
  var style = document.createElement('style');
  var text = Object.keys(blocks).map(function (selector) {
    return processRuleSet(selector, blocks[selector]);
  }).join('\n');
  
  style.setAttribute('type', 'text/css');
  style.appendChild(document.createTextNode(text));

  return style;
}

function processRuleSet(selector, block) {
  return selector + ' {\n' + processDeclarationBlock(block) + '\n}';
}

function processDeclarationBlock(block) {
  return Object.keys(block).map(function (prop) {
    return processDeclaration(prop, block[prop]);
  }).join('\n');
}

function processDeclaration(prop, value) {
  if (!isNaN(value) && value != 0) {
    value = value + 'px';
  }

  return hyphenate(prop) + ': ' + value + ';';
}

function hyphenate(prop) {
  return prop.replace(/[A-Z]/g, function (match) {
    return '-' + match.toLowerCase();
  });
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderLine;

var _setAttributes = __webpack_require__(4);

var _setAttributes2 = _interopRequireDefault(_setAttributes);

var _normalizeColor = __webpack_require__(5);

var _normalizeColor2 = _interopRequireDefault(_normalizeColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create SVGLineElements from an annotation definition.
 * This is used for anntations of type `strikeout`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGGElement} A group of all lines to be rendered
 */
function renderLine(a) {
  var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  (0, _setAttributes2.default)(group, {
    stroke: (0, _normalizeColor2.default)(a.color || '#f00'),
    strokeWidth: 1
  });

  a.rectangles.forEach(function (r) {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    (0, _setAttributes2.default)(line, {
      x1: r.x,
      y1: r.y,
      x2: r.x + r.width,
      y2: r.y
    });

    group.appendChild(line);
  });

  return group;
}
module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderPath;

var _setAttributes = __webpack_require__(4);

var _setAttributes2 = _interopRequireDefault(_setAttributes);

var _normalizeColor = __webpack_require__(5);

var _normalizeColor2 = _interopRequireDefault(_normalizeColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create SVGPathElement from an annotation definition.
 * This is used for anntations of type `drawing`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGPathElement} The path to be rendered
 */
function renderPath(a) {
  var d = [];
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  if (a.lines.length > 0) {
    d.push('M' + a.lines[0][0] + ' ' + a.lines[0][1]);
    for (var i = 1, l = a.lines.length; i < l; i++) {
      var p1 = a.lines[i];
      var p2 = a.lines[i + 1];
      if (p2) {
        d.push('L' + p1[0] + ' ' + p1[1]);
      }
    }
  }

  /*
  
     if(a.lines.length>2) {
      var p1 = a.lines[0];
      var p2 = a.lines[a.lines.length-1];
  
      var p3 = []; //arrow
      var p4 = [];
      var p0 = []; //arrow intersection
  
  
  
      if (p2) {
        var k = -(p2[0]-p1[0])/(p2[1]-p1[1]);
  
        var deltaX = 3;
        p0[0] = p1[0]+0.8*(p2[0]-p1[0]);
        p0[1] = p1[1]+0.8*(p2[1]-p1[1]);
  
        p3[0] = p0[0] + deltaX;
        p3[1] = p0[1] + k*deltaX;
  
        p4[0] = p0[0] - deltaX;
        p4[1] = p0[1] - k*deltaX;
  
        if(Math.abs(p2[1]-p1[1]) < 20) {
  
          p3[0] = p0[0] ;
          p3[1] = p0[1] + deltaX*1;
  
          p4[0] = p0[0] ;
          p4[1] = p0[1] - deltaX*1;
  
        }
  
        d.push(`M${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]}`);
         //d.push(`M${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]}`);
        d.push(`M${p2[0]} ${p2[1]} ${p3[0]} ${p3[1]}`);
        d.push(`M${p3[0]} ${p3[1]} ${p4[0]} ${p4[1]}`);
        d.push(`M${p4[0]} ${p4[1]} ${p2[0]} ${p2[1]}`);
       }
      }*/

  (0, _setAttributes2.default)(path, {
    d: '' + d.join(' '), //`${d.join(' ')}Z`,
    stroke: (0, _normalizeColor2.default)(a.color || '#000'),
    strokeWidth: a.width || 1,
    fill: 'none'
  });

  return path;
}
module.exports = exports['default'];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderPoint;

var _setAttributes = __webpack_require__(4);

var _setAttributes2 = _interopRequireDefault(_setAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SIZE = 25;
var D = 'M499.968 214.336q-113.832 0 -212.877 38.781t-157.356 104.625 -58.311 142.29q0 62.496 39.897 119.133t112.437 97.929l48.546 27.9 -15.066 53.568q-13.392 50.778 -39.06 95.976 84.816 -35.154 153.45 -95.418l23.994 -21.204 31.806 3.348q38.502 4.464 72.54 4.464 113.832 0 212.877 -38.781t157.356 -104.625 58.311 -142.29 -58.311 -142.29 -157.356 -104.625 -212.877 -38.781z';

/**
 * Create SVGElement from an annotation definition.
 * This is used for anntations of type `comment`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGElement} A svg to be rendered
 */
function renderPoint(a) {
  var outerSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  var innerSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  (0, _setAttributes2.default)(outerSVG, {
    width: SIZE,
    height: SIZE,
    x: a.x,
    y: a.y
  });

  (0, _setAttributes2.default)(innerSVG, {
    width: SIZE,
    height: SIZE,
    x: 0,
    y: SIZE * 0.05 * -1,
    viewBox: '0 0 1000 1000'
  });

  (0, _setAttributes2.default)(rect, {
    width: SIZE,
    height: SIZE,
    stroke: '#000',
    fill: '#ff0'
  });

  (0, _setAttributes2.default)(path, {
    d: D,
    strokeWidth: 50,
    stroke: '#000',
    fill: '#fff'
  });

  innerSVG.appendChild(path);
  outerSVG.appendChild(rect);
  outerSVG.appendChild(innerSVG);

  return outerSVG;
}
module.exports = exports['default'];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderRect;

var _setAttributes = __webpack_require__(4);

var _setAttributes2 = _interopRequireDefault(_setAttributes);

var _normalizeColor = __webpack_require__(5);

var _normalizeColor2 = _interopRequireDefault(_normalizeColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create SVGRectElements from an annotation definition.
 * This is used for anntations of type `area` and `highlight`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGGElement|SVGRectElement} A group of all rects to be rendered
 */
function renderRect(a) {
  if (a.type === 'highlight') {
    var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    (0, _setAttributes2.default)(group, {
      fill: (0, _normalizeColor2.default)(a.color || '#ff0'),
      fillOpacity: 0.2
    });

    a.rectangles.forEach(function (r) {
      group.appendChild(createRect(r));
    });

    return group;
  } else {
    var rect = createRect(a);
    (0, _setAttributes2.default)(rect, {
      stroke: (0, _normalizeColor2.default)(a.color || '#f00'),
      fill: 'none'
    });

    return rect;
  }
}

function createRect(r) {
  var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

  (0, _setAttributes2.default)(rect, {
    x: r.x,
    y: r.y,
    width: r.width,
    height: r.height
  });

  return rect;
}
module.exports = exports['default'];

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderText;

var _setAttributes = __webpack_require__(4);

var _setAttributes2 = _interopRequireDefault(_setAttributes);

var _normalizeColor = __webpack_require__(5);

var _normalizeColor2 = _interopRequireDefault(_normalizeColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create SVGTextElement from an annotation definition.
 * This is used for anntations of type `textbox`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGTextElement} A text to be rendered
 */
function renderText(a) {

  // Text should be rendered at 0 degrees relative to
  // document rotation
  var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  (0, _setAttributes2.default)(text, {
    x: a.x,
    y: a.y,
    fill: (0, _normalizeColor2.default)(a.color || '#000'),
    fontSize: a.size,
    transform: 'rotate(' + a.rotation + ')'
  });
  text.innerHTML = a.content;

  var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.appendChild(text);

  return g;
}
module.exports = exports['default'];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderCircle;

var _setAttributes = __webpack_require__(4);

var _setAttributes2 = _interopRequireDefault(_setAttributes);

var _normalizeColor = __webpack_require__(5);

var _normalizeColor2 = _interopRequireDefault(_normalizeColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create an SVGCircleElement from an annotation definition.
 * This is used for annotations of type `circle`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGGElement|SVGCircleElement} A circle to be rendered
 */
function renderCircle(a) {
  var circle = createCircle(a);
  var color = (0, _normalizeColor2.default)(a.color || '#f00');

  if (a.type === 'circle') (0, _setAttributes2.default)(circle, {
    stroke: color,
    fill: 'none',
    'stroke-width': 5
  });
  if (a.type === 'emptycircle') (0, _setAttributes2.default)(circle, {
    stroke: color,
    fill: 'none',
    'stroke-width': 2
  });

  if (a.type === 'fillcircle') (0, _setAttributes2.default)(circle, {
    stroke: color,
    fill: color,
    'stroke-width': 5
  });

  return circle;
}

function createCircle(a) {
  var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  (0, _setAttributes2.default)(circle, {
    cx: a.cx,
    cy: a.cy,
    r: a.r
  });

  return circle;
}
module.exports = exports['default'];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderArrow;

var _setAttributes = __webpack_require__(4);

var _setAttributes2 = _interopRequireDefault(_setAttributes);

var _normalizeColor = __webpack_require__(5);

var _normalizeColor2 = _interopRequireDefault(_normalizeColor);

var _mathUtils = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create SVGPathElement from an annotation definition.
 * This is used for anntations of type `drawing`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGPathElement} The path to be rendered
 */
function renderArrow(a) {
  var d = [];
  var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

  if (a.lines.length == 2) {
    var p1 = a.lines[0];
    var p2 = a.lines[a.lines.length - 1];

    var arrowLength = 40;
    var pt0 = (0, _mathUtils.makePoint)(p1[0], p1[1], 0);
    var pt1 = (0, _mathUtils.makePoint)(p2[0], p2[1], 0);
    var x = (0, _mathUtils.makeVectorFromPoints)(pt0, pt1);
    var unitX = (0, _mathUtils.unitVector)(x);
    pt1 = (0, _mathUtils.addVector)(pt0, (0, _mathUtils.multiplyVector)(unitX, arrowLength));
    x = (0, _mathUtils.makeVectorFromPoints)(pt0, pt1);
    var unitZ = (0, _mathUtils.makeVector)(0, 0, 1);
    var unitY = (0, _mathUtils.unitVector)((0, _mathUtils.crossProduct)(unitX, unitZ));
    var thickness = a.width || 10;

    var A = (0, _mathUtils.addVector)(pt0, (0, _mathUtils.multiplyVector)(unitY, thickness * 0.5));
    var B = (0, _mathUtils.addVector)(A, (0, _mathUtils.multiplyVector)(unitX, (0, _mathUtils.magnitude)(x) - thickness * 2.0));
    var C = (0, _mathUtils.addVector)(B, (0, _mathUtils.multiplyVector)(unitY, thickness));
    var D = pt1;
    var G = (0, _mathUtils.addVector)(pt0, (0, _mathUtils.multiplyVector)((0, _mathUtils.negateVector)(unitY), thickness * 0.5));
    var F = (0, _mathUtils.addVector)(G, (0, _mathUtils.multiplyVector)(unitX, (0, _mathUtils.magnitude)(x) - thickness * 2.0));
    var E = (0, _mathUtils.addVector)(F, (0, _mathUtils.multiplyVector)((0, _mathUtils.negateVector)(unitY), thickness));

    var points = '' + A.x + ',' + A.y + ' ' + B.x + ',' + B.y + ' ' + C.x + ',' + C.y + ' ' + D.x + ',' + D.y + ' ' + E.x + ',' + E.y + ' ' + F.x + ',' + F.y + ' ' + G.x + ',' + G.y;

    (0, _setAttributes2.default)(arrow, {
      points: points,
      stroke: (0, _normalizeColor2.default)(a.color || '#000'),
      fill: (0, _normalizeColor2.default)(a.color || '#000')
    });
  }

  return arrow;
}
module.exports = exports['default'];

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = __webpack_require__(10);

var _uuid2 = _interopRequireDefault(_uuid);

var _StoreAdapter2 = __webpack_require__(8);

var _StoreAdapter3 = _interopRequireDefault(_StoreAdapter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// StoreAdapter for working with localStorage
// This is ideal for testing, examples, and prototyping
var LocalStoreAdapter = function (_StoreAdapter) {
  _inherits(LocalStoreAdapter, _StoreAdapter);

  function LocalStoreAdapter() {
    var userId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "user";

    _classCallCheck(this, LocalStoreAdapter);

    var _this = _possibleConstructorReturn(this, (LocalStoreAdapter.__proto__ || Object.getPrototypeOf(LocalStoreAdapter)).call(this, {
      getAnnotations: function getAnnotations(documentId, userId, pageNumber) {
        return new Promise(function (resolve, reject) {
          var annotations = getAllAnnotations().filter(function (i) {
            return i.page === pageNumber && i.class === 'Annotation';
          });

          resolve({
            documentId: documentId,
            userId: userId,
            pageNumber: pageNumber,
            annotations: annotations
          });
        });
      },
      getAnnotation: function getAnnotation(documentId, userId, annotationId) {
        return Promise.resolve(getAnnotations(documentId, userId)[findAnnotation(documentId, userId, annotationId)]);
      },
      addAnnotation: function addAnnotation(documentId, userId, pageNumber, annotation) {
        return new Promise(function (resolve, reject) {
          annotation.class = 'Annotation';
          annotation.uuid = (0, _uuid2.default)();
          annotation.page = pageNumber;
          annotation.userId = userId;

          var annotations = getAnnotations(documentId, userId);
          annotations.push(annotation);
          updateAnnotations(documentId, userId, annotations);

          resolve(annotation);
        });
      },
      editAnnotation: function editAnnotation(documentId, userId, annotationId, annotation) {
        return new Promise(function (resolve, reject) {
          var annotations = getAnnotations(documentId, userId);
          annotations[findAnnotation(documentId, userId, annotationId)] = annotation;
          updateAnnotations(documentId, userId, annotations);
          resolve(annotation);
        });
      },
      deleteAnnotation: function deleteAnnotation(documentId, userId, annotationId) {
        return new Promise(function (resolve, reject) {
          var index = findAnnotation(documentId, userId, annotationId);
          if (index > -1) {
            var annotations = getAnnotations(documentId, userId);
            annotations.splice(index, 1);
            updateAnnotations(documentId, userId, annotations);
          }

          resolve(true);
        });
      },
      getComments: function getComments(documentId, userId, annotationId) {
        return new Promise(function (resolve, reject) {
          resolve(getAnnotations(documentId, userId).filter(function (i) {
            return i.class === 'Comment' && i.annotation === annotationId;
          }));
        });
      },
      addComment: function addComment(documentId, userId, annotationId, content) {
        return new Promise(function (resolve, reject) {
          var comment = {
            class: 'Comment',
            uuid: (0, _uuid2.default)(),
            annotation: annotationId,
            content: content,
            userId: userId
          };

          var annotations = getAnnotations(documentId, userId);
          annotations.push(comment);
          updateAnnotations(documentId, userId, annotations);

          resolve(comment);
        });
      },
      deleteComment: function deleteComment(documentId, userId, commentId) {
        return new Promise(function (resolve, reject) {
          getAnnotations(documentId, userId);
          var index = -1;
          var annotations = getAnnotations(documentId, userId);
          for (var i = 0, l = annotations.length; i < l; i++) {
            if (annotations[i].uuid === commentId) {
              index = i;
              break;
            }
          }

          if (index > -1) {
            annotations.splice(index, 1);
            updateAnnotations(documentId, userId, annotations);
          }

          resolve(true);
        });
      }
    }));

    _this._userId = userId;
    return _this;
  }

  _createClass(LocalStoreAdapter, [{
    key: 'userId',
    get: function get() {
      return this._userId;
    }
  }]);

  return LocalStoreAdapter;
}(_StoreAdapter3.default);

exports.default = LocalStoreAdapter;


function getAllAnnotations() {
  var all_annotations = [];
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).includes('annotations')) {
      all_annotations.push.apply(all_annotations, _toConsumableArray(JSON.parse(localStorage.getItem(localStorage.key(i)))));
    }
  }
  return all_annotations;
}

function getAnnotations(documentId, userId) {
  return JSON.parse(localStorage.getItem(documentId + '/' + userId + '/annotations')) || [];
}

function updateAnnotations(documentId, userId, annotations) {
  localStorage.setItem(documentId + '/' + userId + '/annotations', JSON.stringify(annotations));
}
/**
 *
 * @param {String} documentId Document id of the annotation
 * @param {String} userId User id of the annotation
 * @param {String} annotationId The id of the annotation
 *
 * This function finds all the annotation made by one user.
 *
 * @return {int} The index of the annotation in localstorage
 */
function findAnnotation(documentId, userId, annotationId) {
  var index = -1;
  var annotations = getAnnotations(documentId, userId);
  for (var i = 0, l = annotations.length; i < l; i++) {
    if (annotations[i].uuid === annotationId) {
      index = i;
      break;
    }
  }
  return index;
}
module.exports = exports['default'];

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _PDFJSAnnotate = __webpack_require__(0);

var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

var _appendChild = __webpack_require__(2);

var _renderScreenReaderHints = __webpack_require__(7);

var _renderScreenReaderHints2 = _interopRequireDefault(_renderScreenReaderHints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Render the response from PDFJSAnnotate.getStoreAdapter().getAnnotations to SVG
 *
 * @param {SVGElement} svg The SVG element to render the annotations to
 * @param {Object} viewport The page viewport data
 * @param {Object} data The response from PDFJSAnnotate.getStoreAdapter().getAnnotations
 * @return {Promise} Settled once rendering has completed
 *  A settled Promise will be either:
 *    - fulfilled: SVGElement
 *    - rejected: Error
 */
function render(svg, viewport, data) {
  return new Promise(function (resolve, reject) {
    // Reset the content of the SVG
    svg.setAttribute('data-pdf-annotate-container', true);
    svg.setAttribute('data-pdf-annotate-viewport', JSON.stringify(viewport));
    svg.removeAttribute('data-pdf-annotate-document');
    svg.removeAttribute('data-pdf-annotate-page');

    // If there's no data nothing can be done
    if (!data) {
      svg.innerHTML = '';
      return resolve(svg);
    }

    svg.setAttribute('data-pdf-annotate-document', data.documentId);
    svg.setAttribute('data-pdf-annotate-user', data.userId);
    svg.setAttribute('data-pdf-annotate-page', data.pageNumber);

    // Make sure annotations is an array
    if (!Array.isArray(data.annotations) || data.annotations.length === 0) {
      return resolve(svg);
    }

    // Append or transform annotation to svg
    data.annotations.forEach(function (a) {
      var node = svg.querySelector('[data-pdf-annotate-id="' + a.uuid + '"]');
      if (node) {
        (0, _appendChild.transformChild)(svg, node, viewport);
      } else {
        (0, _appendChild.appendChild)(svg, a, viewport);
      }
    });

    resolve(svg);
  });
}
module.exports = exports['default'];

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createScreenReaderOnly;
/**
 * Create a node that is only visible to screen readers
 *
 * @param {String} content The text content that should be read by screen reader
 * @param {String} [annotationId] The ID of the annotation assocaited
 * @return {Element} An Element that is only visible to screen readers
 */
function createScreenReaderOnly(content, annotationId) {
  var node = document.createElement('div');
  var text = document.createTextNode(content);
  node.appendChild(text);
  node.setAttribute('id', 'pdf-annotate-screenreader-' + annotationId);
  node.style.position = 'absolute';
  node.style.left = '-10000px';
  node.style.top = 'auto';
  node.style.width = '1px';
  node.style.height = '1px';
  node.style.overflow = 'hidden';
  return node;
}
module.exports = exports['default'];

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertElementWithinChildren;

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _insertElementWithinElement = __webpack_require__(12);

var _insertElementWithinElement2 = _interopRequireDefault(_insertElementWithinElement);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Insert an element at a point within the document.
 * This algorithm will try to insert between elements if possible.
 * It will however use `insertElementWithinElement` if it is more accurate.
 *
 * @param {Element} el The element to be inserted
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 * @param {Number} pageNumber The page number to limit elements to
 * @return {Boolean} True if element was able to be inserted, otherwise false
 */
function insertElementWithinChildren(el, x, y, pageNumber) {
  // Try and use most accurate method of inserting within an element
  if ((0, _insertElementWithinElement2.default)(el, x, y, pageNumber, true)) {
    return true;
  }

  // Fall back to inserting between elements
  var svg = document.querySelector('svg[data-pdf-annotate-page="' + pageNumber + '"]');
  var rect = svg.getBoundingClientRect();
  var nodes = [].concat(_toConsumableArray(svg.parentNode.querySelectorAll(_config2.default.textClassQuery() + ' > div')));

  y = (0, _utils.scaleUp)(svg, { y: y }).y + rect.top;
  x = (0, _utils.scaleUp)(svg, { x: x }).x + rect.left;

  // Find the best node to insert before
  for (var i = 0, l = nodes.length; i < l; i++) {
    var n = nodes[i];
    var r = n.getBoundingClientRect();
    if (y <= r.top) {
      n.parentNode.insertBefore(el, n);
      return true;
    }
  }

  // If all else fails try to append to the bottom
  var textLayer = svg.parentNode.querySelector(_config2.default.textClassQuery());
  if (textLayer) {
    var textRect = textLayer.getBoundingClientRect();
    if ((0, _utils.pointIntersectsRect)(x, y, textRect)) {
      textLayer.appendChild(el);
      return true;
    }
  }

  return false;
}
module.exports = exports['default'];

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initEventHandlers;

var _insertScreenReaderHint = __webpack_require__(11);

var _insertScreenReaderHint2 = _interopRequireDefault(_insertScreenReaderHint);

var _renderScreenReaderHints = __webpack_require__(7);

var _renderScreenReaderHints2 = _interopRequireDefault(_renderScreenReaderHints);

var _insertScreenReaderComment = __webpack_require__(14);

var _insertScreenReaderComment2 = _interopRequireDefault(_insertScreenReaderComment);

var _renderScreenReaderComments = __webpack_require__(13);

var _renderScreenReaderComments2 = _interopRequireDefault(_renderScreenReaderComments);

var _event = __webpack_require__(6);

var _PDFJSAnnotate = __webpack_require__(0);

var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Initialize the event handlers for keeping screen reader hints synced with data
 */
function initEventHandlers() {
  (0, _event.addEventListener)('annotation:add', function (documentId, userId, pageNumber, annotation) {
    reorderAnnotationsByType(documentId, userId, pageNumber, annotation.type);
  });
  (0, _event.addEventListener)('annotation:edit', function (documentId, userId, annotationId, annotation) {
    reorderAnnotationsByType(documentId, userId, annotation.page, annotation.type);
  });
  (0, _event.addEventListener)('annotation:delete', removeAnnotation);
  (0, _event.addEventListener)('comment:add', insertComment);
  (0, _event.addEventListener)('comment:delete', removeComment);
}

/**
 * Reorder the annotation numbers by annotation type
 *
 * @param {String} documentId The ID of the document
 * @param {String} userId The ID of the user
 * @param {Number} pageNumber The page number of the annotations
 * @param {Strig} type The annotation type
 */
function reorderAnnotationsByType(documentId, userId, pageNumber, type) {
  _PDFJSAnnotate2.default.getStoreAdapter().getAnnotations(documentId, userId, pageNumber).then(function (annotations) {
    return annotations.annotations.filter(function (a) {
      return a.type === type;
    });
  }).then(function (annotations) {
    annotations.forEach(function (a) {
      removeAnnotation(documentId, a.uuid);
    });

    return annotations;
  }).then(_renderScreenReaderHints2.default);
}

/**
 * Remove the screen reader hint for an annotation
 *
 * @param {String} documentId The ID of the document
 * @param {String} annotationId The Id of the annotation
 */
function removeAnnotation(documentId, annotationId) {
  removeElementById('pdf-annotate-screenreader-' + annotationId);
  removeElementById('pdf-annotate-screenreader-' + annotationId + '-end');
}

/**
 * Insert a screen reader hint for a comment
 *
 * @param {String} documentId The ID of the document
 * @param {String} annotationId The ID of tha assocated annotation
 * @param {Object} comment The comment to insert a hint for
 */
function insertComment(documentId, annotationId, comment) {
  var list = document.querySelector('pdf-annotate-screenreader-comment-list-' + annotationId);
  var promise = void 0;

  if (!list) {
    promise = (0, _renderScreenReaderComments2.default)(documentId, annotationId, []).then(function () {
      list = document.querySelector('pdf-annotate-screenreader-comment-list-' + annotationId);
      return true;
    });
  } else {
    promise = Promise.resolve(true);
  }

  promise.then(function () {
    (0, _insertScreenReaderComment2.default)(comment);
  });
}

/**
 * Remove a screen reader hint for a comment
 *
 * @param {String} documentId The ID of the document
 * @param {String} commentId The ID of the comment
 */
function removeComment(documentId, commentId) {
  removeElementById('pdf-annotate-screenreader-comment-' + commentId);
}

/**
 * Remove an element from the DOM by it's ID if it exists
 *
 * @param {String} elementID The ID of the element to be removed
 */
function removeElementById(elementId) {
  var el = document.getElementById(elementId);
  if (el) {
    el.parentNode.removeChild(el);
  }
}
module.exports = exports['default'];

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _event = __webpack_require__(6);

var _edit = __webpack_require__(33);

var _pen = __webpack_require__(34);

var _arrow = __webpack_require__(35);

var _eraser = __webpack_require__(36);

var _point = __webpack_require__(37);

var _rect = __webpack_require__(38);

var _circle = __webpack_require__(39);

var _text = __webpack_require__(40);

var _page = __webpack_require__(41);

exports.default = {
  addEventListener: _event.addEventListener,
  removeEventListener: _event.removeEventListener,
  fireEvent: _event.fireEvent,

  disableEdit: _edit.disableEdit,
  enableEdit: _edit.enableEdit,

  disablePen: _pen.disablePen,
  enablePen: _pen.enablePen,
  setPen: _pen.setPen,

  disablePoint: _point.disablePoint,
  enablePoint: _point.enablePoint,

  disableRect: _rect.disableRect,
  enableRect: _rect.enableRect,

  disableCircle: _circle.disableCircle,
  enableCircle: _circle.enableCircle,
  setCircle: _circle.setCircle,
  addCircle: _circle.addCircle,

  disableArrow: _arrow.disableArrow,
  enableArrow: _arrow.enableArrow,
  setArrow: _arrow.setArrow,

  disableEraser: _eraser.disableEraser,
  enableEraser: _eraser.enableEraser,

  disableText: _text.disableText,
  enableText: _text.enableText,
  setText: _text.setText,

  createPage: _page.createPage,
  renderPage: _page.renderPage
};
module.exports = exports['default'];

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableEdit = enableEdit;
exports.disableEdit = disableEdit;

var _PDFJSAnnotate = __webpack_require__(0);

var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _appendChild = __webpack_require__(2);

var _event = __webpack_require__(6);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _enabled = false;
var isDragging = false;
var overlay = void 0;
var dragOffsetX = void 0,
    dragOffsetY = void 0,
    dragStartX = void 0,
    dragStartY = void 0;
var OVERLAY_BORDER_SIZE = 3;

/**
 * Create an overlay for editing an annotation.
 *
 * @param {Element} target The annotation element to apply overlay for
 */
function createEditOverlay(target) {
  destroyEditOverlay();

  overlay = document.createElement('div');
  var anchor = document.createElement('a');
  var parentNode = (0, _utils.findSVGContainer)(target).parentNode;
  var id = target.getAttribute('data-pdf-annotate-id');
  var rect = (0, _utils.getOffsetAnnotationRect)(target);
  var styleLeft = rect.left - OVERLAY_BORDER_SIZE;
  var styleTop = rect.top - OVERLAY_BORDER_SIZE;

  overlay.setAttribute('id', 'pdf-annotate-edit-overlay');
  overlay.setAttribute('data-target-id', id);
  overlay.style.boxSizing = 'content-box';
  overlay.style.position = 'absolute';
  overlay.style.top = styleTop + 'px';
  overlay.style.left = styleLeft + 'px';
  overlay.style.width = rect.width + 'px';
  overlay.style.height = rect.height + 'px';
  overlay.style.border = OVERLAY_BORDER_SIZE + 'px solid ' + _utils.BORDER_COLOR;
  overlay.style.borderRadius = OVERLAY_BORDER_SIZE + 'px';
  overlay.style.zIndex = 20100;

  anchor.innerHTML = '×';
  anchor.setAttribute('href', 'javascript://');
  anchor.style.background = '#fff';
  anchor.style.borderRadius = '20px';
  anchor.style.border = '1px solid #bbb';
  anchor.style.color = '#bbb';
  anchor.style.fontSize = '16px';
  anchor.style.padding = '2px';
  anchor.style.textAlign = 'center';
  anchor.style.textDecoration = 'none';
  anchor.style.position = 'absolute';
  anchor.style.top = '-13px';
  anchor.style.right = '-13px';
  anchor.style.width = '25px';
  anchor.style.height = '25px';

  overlay.appendChild(anchor);
  parentNode.appendChild(overlay);
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keyup', handleDocumentKeyup);
  document.addEventListener('mousedown', handleDocumentMousedown);
  anchor.addEventListener('click', deleteAnnotation);
  anchor.addEventListener('mouseover', function () {
    anchor.style.color = '#35A4DC';
    anchor.style.borderColor = '#999';
    anchor.style.boxShadow = '0 1px 1px #ccc';
  });
  anchor.addEventListener('mouseout', function () {
    anchor.style.color = '#bbb';
    anchor.style.borderColor = '#bbb';
    anchor.style.boxShadow = '';
  });
  overlay.addEventListener('mouseover', function () {
    if (!isDragging) {
      anchor.style.display = '';
    }
  });
  overlay.addEventListener('mouseout', function () {
    anchor.style.display = 'none';
  });
}

/**
 * Destroy the edit overlay if it exists.
 */
function destroyEditOverlay() {
  if (overlay) {
    overlay.parentNode.removeChild(overlay);
    overlay = null;
  }

  document.removeEventListener('click', handleDocumentClick);
  document.removeEventListener('keyup', handleDocumentKeyup);
  document.removeEventListener('mousedown', handleDocumentMousedown);
  document.removeEventListener('mousemove', handleDocumentMousemove);
  document.removeEventListener('mouseup', handleDocumentMouseup);
  (0, _utils.enableUserSelect)();
}

/**
 * Delete currently selected annotation
 */
function deleteAnnotation() {
  if (!overlay) {
    return;
  }

  var annotationId = overlay.getAttribute('data-target-id');
  var nodes = document.querySelectorAll('[data-pdf-annotate-id="' + annotationId + '"]');
  var svg = overlay.parentNode.querySelector(_config2.default.annotationSvgQuery());

  var _getMetadata = (0, _utils.getMetadata)(svg),
      documentId = _getMetadata.documentId,
      userId = _getMetadata.userId;

  [].concat(_toConsumableArray(nodes)).forEach(function (n) {
    n.parentNode.removeChild(n);
  });

  _PDFJSAnnotate2.default.getStoreAdapter().deleteAnnotation(documentId, userId, annotationId);

  destroyEditOverlay();
}

/**
 * Handle document.click event
 *
 * @param {Event} e The DOM event that needs to be handled
 */
function handleDocumentClick(e) {
  if (!(0, _utils.findSVGAtPoint)(e.clientX, e.clientY)) {
    return;
  }

  // Remove current overlay
  var overlay = document.getElementById('pdf-annotate-edit-overlay');
  if (overlay) {
    if (isDragging || e.target === overlay) {
      return;
    }

    destroyEditOverlay();
  }
}

/**
 * Handle document.keyup event
 *
 * @param {KeyboardEvent} e The DOM event that needs to be handled
 */
function handleDocumentKeyup(e) {
  // keyCode is deprecated, so prefer the newer "key" method if possible
  var keyTest = void 0;
  if (e.key) {
    keyTest = e.key.toLowerCase() === "delete" || e.key.toLowerCase() === "backspace";
  } else {
    keyTest = e.keyCode === 8 || e.keyCode === 46;
  }
  if (overlay && keyTest && e.target.nodeName.toLowerCase() !== 'textarea' && e.target.nodeName.toLowerCase() !== 'input') {
    e.preventDefault();
    deleteAnnotation();
  }
}

/**
 * Handle document.mousedown event
 *
 * @param {Event} e The DOM event that needs to be handled
 */
function handleDocumentMousedown(e) {
  if (e.target !== overlay) {
    return;
  }

  // Highlight and strikeout annotations are bound to text within the document.
  // It doesn't make sense to allow repositioning these types of annotations.
  var annotationId = overlay.getAttribute('data-target-id');
  var target = document.querySelector('[data-pdf-annotate-id="' + annotationId + '"]');
  var type = target.getAttribute('data-pdf-annotate-type');

  if (type === 'highlight' || type === 'strikeout') {
    return;
  }

  isDragging = true;
  dragOffsetX = e.clientX;
  dragOffsetY = e.clientY;
  dragStartX = overlay.offsetLeft;
  dragStartY = overlay.offsetTop;

  overlay.style.background = 'rgba(255, 255, 255, 0.7)';
  overlay.style.cursor = 'move';
  overlay.querySelector('a').style.display = 'none';

  document.addEventListener('mousemove', handleDocumentMousemove);
  document.addEventListener('mouseup', handleDocumentMouseup);
  (0, _utils.disableUserSelect)();
}

/**
 * Handle document.mousemove event
 *
 * @param {Event} e The DOM event that needs to be handled
 */
function handleDocumentMousemove(e) {
  var annotationId = overlay.getAttribute('data-target-id');
  var parentNode = overlay.parentNode;
  var rect = parentNode.getBoundingClientRect();
  var y = dragStartY + (e.clientY - dragOffsetY);
  var x = dragStartX + (e.clientX - dragOffsetX);
  var minY = 0;
  var maxY = rect.height;
  var minX = 0;
  var maxX = rect.width;

  if (y > minY && y + overlay.offsetHeight < maxY) {
    overlay.style.top = y + 'px';
  }

  if (x > minX && x + overlay.offsetWidth < maxX) {
    overlay.style.left = x + 'px';
  }
}

/**
 * Handle document.mouseup event
 *
 * @param {Event} e The DOM event that needs to be handled
 */
function handleDocumentMouseup(e) {
  var annotationId = overlay.getAttribute('data-target-id');
  var target = document.querySelectorAll('[data-pdf-annotate-id="' + annotationId + '"]');
  var type = target[0].getAttribute('data-pdf-annotate-type');
  var svg = overlay.parentNode.querySelector(_config2.default.annotationSvgQuery());

  var _getMetadata2 = (0, _utils.getMetadata)(svg),
      documentId = _getMetadata2.documentId,
      userId = _getMetadata2.userId;

  overlay.querySelector('a').style.display = '';

  _PDFJSAnnotate2.default.getStoreAdapter().getAnnotation(documentId, userId, annotationId).then(function (annotation) {
    var attribX = 'x';
    var attribY = 'y';
    if (['circle', 'fillcircle', 'emptycircle'].indexOf(type) > -1) {
      attribX = 'cx';
      attribY = 'cy';
    }

    if (type === 'point') {
      // Broken
      /*
      [...target].forEach((t, i) => {
        let moveTo = {
          x: overlay.offsetLeft + 3,
          y: overlay.offsetTop + 3
        };
        t.setAttribute(attribX, moveTo.x);
        t.setAttribute(attribY, moveTo.y);
        annotation[attribX] = moveTo.x;
        annotation[attribY] = moveTo.y;
      });
      */
      return;
    } else if (['area', 'highlight', 'textbox', 'circle', 'fillcircle', 'emptycircle'].indexOf(type) > -1) {
      var modelStart = (0, _utils.convertToSvgPoint)([dragStartX, dragStartY], svg);
      var modelEnd = (0, _utils.convertToSvgPoint)([overlay.offsetLeft, overlay.offsetTop], svg);
      var modelDelta = {
        x: modelEnd[0] - modelStart[0],
        y: modelEnd[1] - modelStart[1]
      };

      if (type === 'textbox') {
        target = [target[0].firstChild];
      }

      [].concat(_toConsumableArray(target)).forEach(function (t, i) {
        var modelX = parseInt(t.getAttribute(attribX), 10);
        var modelY = parseInt(t.getAttribute(attribY), 10);
        if (modelDelta.y !== 0) {
          modelY = modelY + modelDelta.y;

          t.setAttribute(attribY, modelY);
          if (annotation.rectangles && i < annotation.rectangles.length) {
            annotation.rectangles[i].y = modelY;
          } else if (annotation[attribY]) {
            annotation[attribY] = modelY;
          }
        }
        if (modelDelta.x !== 0) {
          modelX = modelX + modelDelta.x;

          t.setAttribute(attribX, modelX);
          if (annotation.rectangles && i < annotation.rectangles.length) {
            annotation.rectangles[i].x = modelX;
          } else if (annotation[attribX]) {
            annotation[attribX] = modelX;
          }
        }
      });
    } else if (type === 'strikeout') {
      return;
      //   let { deltaX, deltaY } = getDelta('x1', 'y1');
      //   [...target].forEach(target, (t, i) => {
      //     if (deltaY !== 0) {
      //       t.setAttribute('y1', parseInt(t.getAttribute('y1'), 10) + deltaY);
      //       t.setAttribute('y2', parseInt(t.getAttribute('y2'), 10) + deltaY);
      //       annotation.rectangles[i].y = parseInt(t.getAttribute('y1'), 10);
      //     }
      //     if (deltaX !== 0) {
      //       t.setAttribute('x1', parseInt(t.getAttribute('x1'), 10) + deltaX);
      //       t.setAttribute('x2', parseInt(t.getAttribute('x2'), 10) + deltaX);
      //       annotation.rectangles[i].x = parseInt(t.getAttribute('x1'), 10);
      //     }
      //   });
    } else if (type === 'drawing' || type === 'arrow') {
      // Do nothing as currently broken
      /*
      let modelStart = convertToSvgPoint([dragStartX, dragStartY], svg);
      let modelEnd = convertToSvgPoint([overlay.offsetLeft, overlay.offsetTop], svg);
      let modelDelta = {
        x: modelEnd[0] - modelStart[0],
        y: modelEnd[1] - modelStart[1]
      };
       annotation.lines.forEach((line, i) => {
        let [x, y] = annotation.lines[i];
        annotation.lines[i][0] = x + modelDelta.x;
        annotation.lines[i][1] = y + modelDelta.y;
      });
       target[0].parentNode.removeChild(target[0]);
      appendChild(svg, annotation);
      */
      return;
    }

    _PDFJSAnnotate2.default.getStoreAdapter().editAnnotation(documentId, userId, annotationId, annotation);
  });

  setTimeout(function () {
    isDragging = false;
  }, 0);

  overlay.style.background = '';
  overlay.style.cursor = '';

  document.removeEventListener('mousemove', handleDocumentMousemove);
  document.removeEventListener('mouseup', handleDocumentMouseup);
  (0, _utils.enableUserSelect)();
}

/**
 * Handle annotation.click event
 *
 * @param {Element} e The annotation element that was clicked
 */
function handleAnnotationClick(target) {
  createEditOverlay(target);
}

/**
 * Enable edit mode behavior.
 */
function enableEdit() {
  if (_enabled) {
    return;
  }

  _enabled = true;
  (0, _event.addEventListener)('annotation:click', handleAnnotationClick);
};

/**
 * Disable edit mode behavior.
 */
function disableEdit() {
  destroyEditOverlay();

  if (!_enabled) {
    return;
  }

  _enabled = false;
  (0, _event.removeEventListener)('annotation:click', handleAnnotationClick);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPen = setPen;
exports.enablePen = enablePen;
exports.disablePen = disablePen;

var _PDFJSAnnotate = __webpack_require__(0);

var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

var _appendChild = __webpack_require__(2);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _enabled = false;
var _candraw = false;
var _penSize = void 0;
var _penColor = void 0;
var path = void 0;
var lines = [];

var isFirefox = /firefox/i.test(navigator.userAgent);

/**
 * Handle document.touchdown or document.pointerdown event
 */
function handleDocumentPointerdown(e) {
  e.preventDefault();
  path = null;
  lines = [];
  _candraw = true;
}

/**
 * Handle document.touchup or document.pointerup event
 *
 * @param {TouchEvent} e The DOM event to be handled
 */
function handleDocumentPointerupChrome(e) {
  saveToStorage(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
}

function handleDocumentPointerup(e) {
  saveToStorage(e.clientX, e.clientY);
}

function saveToStorage(x, y) {
  _candraw = false;
  var svg = void 0;
  if (lines.length > 1 && (svg = (0, _utils.findSVGAtPoint)(x, y))) {
    var _getMetadata = (0, _utils.getMetadata)(svg),
        documentId = _getMetadata.documentId,
        userId = _getMetadata.userId,
        pageNumber = _getMetadata.pageNumber;

    _PDFJSAnnotate2.default.getStoreAdapter().addAnnotation(documentId, userId, pageNumber, {
      type: 'drawing',
      width: _penSize,
      color: _penColor,
      lines: lines
    }).then(function (annotation) {
      if (path) {
        svg.removeChild(path);
      }

      (0, _appendChild.appendChild)(svg, annotation);
    });
  }
}

/**
 * Handle document.mousemove event
 *
 * @param {PointerEvent} e The DOM event to be handled
 */
function handleDocumentPointermove(e) {
  if (!e.srcElement.classList.contains('annotationLayer')) {
    return;
  }
  if (_candraw) {
    savePoint(e.clientX, e.clientY);
  }
}

/**
 * Handle document.keyup event
 *
 * @param {KeyboardEvent} e The DOM event to be handled
 * } e The DOM event to be handled
 */
function handleDocumentKeyup(e) {
  // Cancel rect if Esc is pressed
  if (e.keyCode === 27) {
    lines = null;
    path.parentNode.removeChild(path);
    document.removeEventListener('pointermove', handleDocumentPointermove);
    document.removeEventListener('pointerup', handleDocumentPointerup);
  }
}

/**
 * Save a point to the line being drawn.
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 */
function savePoint(x, y) {
  var svg = (0, _utils.findSVGAtPoint)(x, y);
  if (!svg) {
    return;
  }

  var rect = svg.getBoundingClientRect();
  var point = (0, _utils.convertToSvgPoint)([x - rect.left, y - rect.top], svg);
  point[0] = point[0].toFixed(2);
  point[1] = point[1].toFixed(2);
  lines.push(point);

  if (lines.length <= 1) {
    return;
  }

  if (path) {
    svg.removeChild(path);
  }

  path = (0, _appendChild.appendChild)(svg, {
    type: 'drawing',
    color: _penColor,
    width: _penSize,
    lines: lines
  });
}

/**
 * Set the attributes of the pen.
 *
 * @param {Number} penSize The size of the lines drawn by the pen
 * @param {String} penColor The color of the lines drawn by the pen
 */
function setPen() {
  var penSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var penColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '000000';

  _penSize = parseInt(penSize, 10);
  _penColor = penColor;
}

/**
 * Enable the pen behavior
 */
function enablePen() {
  if (_enabled) {
    return;
  }

  _enabled = true;
  // Chrome and Firefox has different behaviors with how pen works, so we need different events.
  document.addEventListener('pointerdown', handleDocumentPointerdown);
  document.addEventListener('pointermove', handleDocumentPointermove);
  document.addEventListener('pointerup', handleDocumentPointerup);

  document.addEventListener('keyup', handleDocumentKeyup);
  (0, _utils.disableUserSelect)();
}

/**
 * Disable the pen behavior
 */
function disablePen() {
  if (!_enabled) {
    return;
  }

  _enabled = false;
  document.removeEventListener('pointerdown', handleDocumentPointerdown);
  document.removeEventListener('pointermove', handleDocumentPointermove);
  document.removeEventListener('pointerup', handleDocumentPointerup);

  document.removeEventListener('keyup', handleDocumentKeyup);
  (0, _utils.enableUserSelect)();
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setArrow = setArrow;
exports.enableArrow = enableArrow;
exports.disableArrow = disableArrow;

var _PDFJSAnnotate = __webpack_require__(0);

var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

var _appendChild = __webpack_require__(2);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _enabled = false;
var _penSize = void 0;
var _penColor = void 0;
var path = void 0;
var lines = void 0;
var originY = void 0;
var originX = void 0;

/**
 * Handle document.mousedown event
 */
function handleDocumentMousedown(e) {
  var target = (0, _utils.findAnnotationAtPoint)(e.clientX, e.clientY);
  if (target === null) return;

  var type = target.getAttribute('data-pdf-annotate-type');
  if (type !== 'circle' && type !== 'fillcircle' && type !== 'emptycircle') {
    return;
  }

  var svg = (0, _utils.findSVGContainer)(target);

  var _getMetadata = (0, _utils.getMetadata)(svg),
      documentId = _getMetadata.documentId,
      userId = _getMetadata.userId;

  var annotationId = target.getAttribute('data-pdf-annotate-id');

  var event = e;
  _PDFJSAnnotate2.default.getStoreAdapter().getAnnotation(documentId, userId, annotationId).then(function (annotation) {
    if (annotation) {
      path = null;
      lines = [];

      var point = (0, _utils.convertToScreenPoint)([annotation.cx, annotation.cy], svg);

      var rect = svg.getBoundingClientRect();

      originX = point[0] + rect.left;
      originY = point[1] + rect.top;

      document.addEventListener('mousemove', handleDocumentMousemove);
      document.addEventListener('mouseup', handleDocumentMouseup);
    }
  });
}

/**
 * Handle document.mouseup event
 *
 * @param {Event} e The DOM event to be handled
 */
function handleDocumentMouseup(e) {
  var svg = void 0;
  if (lines.length > 1 && (svg = (0, _utils.findSVGAtPoint)(e.clientX, e.clientY))) {
    var _getMetadata2 = (0, _utils.getMetadata)(svg),
        documentId = _getMetadata2.documentId,
        userId = _getMetadata2.userId,
        pageNumber = _getMetadata2.pageNumber;

    _PDFJSAnnotate2.default.getStoreAdapter().addAnnotation(documentId, userId, pageNumber, {
      type: 'arrow',
      width: _penSize,
      color: _penColor,
      lines: lines
    }).then(function (annotation) {
      if (path) {
        svg.removeChild(path);
      }

      (0, _appendChild.appendChild)(svg, annotation);
    });
  }

  document.removeEventListener('mousemove', handleDocumentMousemove);
  document.removeEventListener('mouseup', handleDocumentMouseup);
}

/**
 * Handle document.mousemove event
 *
 * @param {Event} e The DOM event to be handled
 */
function handleDocumentMousemove(e) {
  var x = lines.length === 0 ? originX : e.clientX;
  var y = lines.length === 0 ? originY : e.clientY;

  savePoint(x, y);
}

/**
 * Handle document.keyup event
 *
 * @param {Event} e The DOM event to be handled
 */
function handleDocumentKeyup(e) {
  // Cancel rect if Esc is pressed
  if (e.keyCode === 27) {
    lines = null;
    path.parentNode.removeChild(path);
    document.removeEventListener('mousemove', handleDocumentMousemove);
    document.removeEventListener('mouseup', handleDocumentMouseup);
  }
}

/**
 * Save a point to the line being drawn.
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 */
function savePoint(x, y) {
  var svg = (0, _utils.findSVGAtPoint)(x, y);
  if (!svg) {
    return;
  }

  var rect = svg.getBoundingClientRect();
  var point = (0, _utils.convertToSvgPoint)([x - rect.left, y - rect.top], svg);

  if (lines.length < 2) {
    lines.push(point);
    return;
  } else {
    lines[1] = point; // update end point
  }

  if (path) {
    svg.removeChild(path);
  }

  path = (0, _appendChild.appendChild)(svg, {
    type: 'arrow',
    color: _penColor,
    width: _penSize,
    lines: lines
  });
}

/**
 * Set the attributes of the pen.
 *
 * @param {Number} penSize The size of the lines drawn by the pen
 * @param {String} penColor The color of the lines drawn by the pen
 */
function setArrow() {
  var penSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var penColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0000FF';

  _penSize = parseInt(penSize, 10);
  _penColor = penColor;
}

/**
 * Enable the pen behavior
 */
function enableArrow() {
  if (_enabled) {
    return;
  }

  _enabled = true;
  document.addEventListener('mousedown', handleDocumentMousedown);
  document.addEventListener('keyup', handleDocumentKeyup);
  (0, _utils.disableUserSelect)();
}

/**
 * Disable the pen behavior
 */
function disableArrow() {
  if (!_enabled) {
    return;
  }

  _enabled = false;
  document.removeEventListener('mousedown', handleDocumentMousedown);
  document.removeEventListener('keyup', handleDocumentKeyup);
  (0, _utils.enableUserSelect)();
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableEraser = enableEraser;
exports.disableEraser = disableEraser;

var _PDFJSAnnotate = __webpack_require__(0);

var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _canerase = false;
var userId = "user";

/**
 *
 * @param {PointerEvent} e
 */
function handleDocumentDown(e) {
  _canerase = true;
}

/**
 *
 * @param {PointerEvent} e
 */
function handleDocumentUp(e) {
  _canerase = false;
}

/**
 *
 * @param {PointerEvent} e
 */
function handleDocumentMouseMove(e) {
  erase((0, _utils.findAnnotationAtPoint)(e.clientX, e.clientY));
}

function erase(target) {
  if (_canerase) {
    if (target && target.getAttribute('data-pdf-annotate-userId') === userId) {
      var _getMetadata = (0, _utils.getMetadata)(target.parentElement),
          documentId = _getMetadata.documentId;

      var annotationId = target.getAttribute('data-pdf-annotate-id');
      var nodes = document.querySelectorAll('[data-pdf-annotate-id="' + annotationId + '"]');
      [].concat(_toConsumableArray(nodes)).forEach(function (n) {
        n.parentNode.removeChild(n);
      });

      _PDFJSAnnotate2.default.getStoreAdapter().deleteAnnotation(documentId, userId, annotationId);
    }
  }
}

function enableEraser() {
  userId = _PDFJSAnnotate2.default.getStoreAdapter().userId;
  document.addEventListener('pointermove', handleDocumentMouseMove);
  document.addEventListener('pointerdown', handleDocumentDown);
  document.addEventListener('pointerup', handleDocumentUp);
}

function disableEraser() {
  document.removeEventListener('pointermove', handleDocumentMouseMove);
  document.removeEventListener('pointerdown', handleDocumentDown);
  document.removeEventListener('pointerup', handleDocumentUp);
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enablePoint = enablePoint;
exports.disablePoint = disablePoint;

var _PDFJSAnnotate = __webpack_require__(0);

var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

var _appendChild = __webpack_require__(2);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _enabled = false;
var input = void 0;

/**
 * Handle document.mouseup event
 *
 * @param {Event} The DOM event to be handled
 */
function handleDocumentMouseup(e) {
  if (input || !(0, _utils.findSVGAtPoint)(e.clientX, e.clientY)) {
    return;
  }

  input = document.createElement('input');
  input.setAttribute('id', 'pdf-annotate-point-input');
  input.setAttribute('placeholder', 'Enter comment');
  input.style.border = '3px solid ' + _utils.BORDER_COLOR;
  input.style.borderRadius = '3px';
  input.style.position = 'absolute';
  input.style.top = e.clientY + 'px';
  input.style.left = e.clientX + 'px';

  input.addEventListener('blur', handleInputBlur);
  input.addEventListener('keyup', handleInputKeyup);

  document.body.appendChild(input);
  input.focus();
}

/**
 * Handle input.blur event
 */
function handleInputBlur() {
  savePoint();
}

/**
 * Handle input.keyup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleInputKeyup(e) {
  if (e.keyCode === 27) {
    closeInput();
  } else if (e.keyCode === 13) {
    savePoint();
  }
}

/**
 * Save a new point annotation from input
 */
function savePoint() {
  if (input.value.trim().length > 0) {
    var clientX = parseInt(input.style.left, 10);
    var clientY = parseInt(input.style.top, 10);
    var content = input.value.trim();
    var svg = (0, _utils.findSVGAtPoint)(clientX, clientY);
    if (!svg) {
      return;
    }

    var rect = svg.getBoundingClientRect();

    var _getMetadata = (0, _utils.getMetadata)(svg),
        documentId = _getMetadata.documentId,
        userId = _getMetadata.userId,
        pageNumber = _getMetadata.pageNumber;

    var annotation = Object.assign({
      type: 'point'
    }, (0, _utils.scaleDown)(svg, {
      x: clientX - rect.left,
      y: clientY - rect.top
    }));

    _PDFJSAnnotate2.default.getStoreAdapter().addAnnotation(documentId, userId, pageNumber, annotation).then(function (annotation) {
      _PDFJSAnnotate2.default.getStoreAdapter().addComment(documentId, userId, annotation.uuid, content);

      (0, _appendChild.appendChild)(svg, annotation);
    });
  }

  closeInput();
}

/**
 * Close the input element
 */
function closeInput() {
  input.removeEventListener('blur', handleInputBlur);
  input.removeEventListener('keyup', handleInputKeyup);
  document.body.removeChild(input);
  input = null;
}

/**
 * Enable point annotation behavior
 */
function enablePoint() {
  if (_enabled) {
    return;
  }

  _enabled = true;
  document.addEventListener('mouseup', handleDocumentMouseup);
}

/**
 * Disable point annotation behavior
 */
function disablePoint() {
  if (!_enabled) {
    return;
  }

  _enabled = false;
  document.removeEventListener('mouseup', handleDocumentMouseup);
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableRect = enableRect;
exports.disableRect = disableRect;

var _PDFJSAnnotate = __webpack_require__(0);

var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _appendChild = __webpack_require__(2);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _enabled = false;
var _type = void 0;
var overlay = void 0;
var originY = void 0;
var originX = void 0;

/**
 * Get the current window selection as rects
 *
 * @return {Array} An Array of rects
 */
function getSelectionRects() {
  try {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var rects = range.getClientRects();

    if (rects.length > 0 && rects[0].width > 0 && rects[0].height > 0) {
      return rects;
    }
  } catch (e) {}

  return null;
}

/**
 * Handle document.mousedown event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentMousedown(e) {
  var svg = void 0;
  if (_type !== 'area' || !(svg = (0, _utils.findSVGAtPoint)(e.clientX, e.clientY))) {
    return;
  }

  var rect = svg.getBoundingClientRect();
  originY = e.clientY;
  originX = e.clientX;

  overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = originY - rect.top + 'px';
  overlay.style.left = originX - rect.left + 'px';
  overlay.style.border = '3px solid ' + _utils.BORDER_COLOR;
  overlay.style.borderRadius = '3px';
  svg.parentNode.appendChild(overlay);

  document.addEventListener('mousemove', handleDocumentMousemove);
  (0, _utils.disableUserSelect)();
}

/**
 * Handle document.mousemove event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentMousemove(e) {
  var svg = overlay.parentNode.querySelector(_config2.default.annotationSvgQuery());
  var rect = svg.getBoundingClientRect();

  if (originX + (e.clientX - originX) < rect.right) {
    overlay.style.width = e.clientX - originX + 'px';
  }

  if (originY + (e.clientY - originY) < rect.bottom) {
    overlay.style.height = e.clientY - originY + 'px';
  }
}

/**
 * Handle document.mouseup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentMouseup(e) {
  var rects = void 0;
  if (_type !== 'area' && (rects = getSelectionRects())) {
    var svg = (0, _utils.findSVGAtPoint)(rects[0].left, rects[0].top);
    saveRect(_type, [].concat(_toConsumableArray(rects)).map(function (r) {
      return {
        top: r.top,
        left: r.left,
        width: r.width,
        height: r.height
      };
    }));
  } else if (_type === 'area' && overlay) {
    var _svg = overlay.parentNode.querySelector(_config2.default.annotationSvgQuery());
    var rect = _svg.getBoundingClientRect();
    saveRect(_type, [{
      top: parseInt(overlay.style.top, 10) + rect.top,
      left: parseInt(overlay.style.left, 10) + rect.left,
      width: parseInt(overlay.style.width, 10),
      height: parseInt(overlay.style.height, 10)
    }]);

    overlay.parentNode.removeChild(overlay);
    overlay = null;

    document.removeEventListener('mousemove', handleDocumentMousemove);
    (0, _utils.enableUserSelect)();
  }
}

/**
 * Handle document.keyup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentKeyup(e) {
  // Cancel rect if Esc is pressed
  if (e.keyCode === 27) {
    var selection = window.getSelection();
    selection.removeAllRanges();
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
      overlay = null;
      document.removeEventListener('mousemove', handleDocumentMousemove);
    }
  }
}

/**
 * Save a rect annotation
 *
 * @param {String} type The type of rect (area, highlight, strikeout)
 * @param {Array} rects The rects to use for annotation
 * @param {String} color The color of the rects
 */
function saveRect(type, rects, color) {
  var svg = (0, _utils.findSVGAtPoint)(rects[0].left, rects[0].top);
  var annotation = void 0;

  if (!svg) {
    return;
  }

  var boundingRect = svg.getBoundingClientRect();

  if (!color) {
    if (type === 'highlight') {
      color = 'FFFF00';
    } else if (type === 'strikeout') {
      color = 'FF0000';
    }
  }

  // Initialize the annotation
  annotation = {
    type: type,
    color: color,
    rectangles: [].concat(_toConsumableArray(rects)).map(function (r) {
      var offset = 0;

      if (type === 'strikeout') {
        offset = r.height / 2;
      }

      return (0, _utils.convertToSvgRect)({
        y: r.top + offset - boundingRect.top,
        x: r.left - boundingRect.left,
        width: r.width,
        height: r.height
      }, svg);
    }).filter(function (r) {
      return r.width > 0 && r.height > 0 && r.x > -1 && r.y > -1;
    })
  };

  // Short circuit if no rectangles exist
  if (annotation.rectangles.length === 0) {
    return;
  }

  // Special treatment for area as it only supports a single rect
  if (type === 'area') {
    var rect = annotation.rectangles[0];
    delete annotation.rectangles;
    annotation.x = rect.x;
    annotation.y = rect.y;
    annotation.width = rect.width;
    annotation.height = rect.height;
  }

  var _getMetadata = (0, _utils.getMetadata)(svg),
      documentId = _getMetadata.documentId,
      userId = _getMetadata.userId,
      pageNumber = _getMetadata.pageNumber;

  // Add the annotation


  _PDFJSAnnotate2.default.getStoreAdapter().addAnnotation(documentId, userId, pageNumber, annotation).then(function (annotation) {
    (0, _appendChild.appendChild)(svg, annotation);
  });
}

/**
 * Enable rect behavior
 */
function enableRect(type) {
  _type = type;

  if (_enabled) {
    return;
  }

  _enabled = true;
  document.addEventListener('mouseup', handleDocumentMouseup);
  document.addEventListener('mousedown', handleDocumentMousedown);
  document.addEventListener('keyup', handleDocumentKeyup);
}

/**
 * Disable rect behavior
 */
function disableRect() {
  if (!_enabled) {
    return;
  }

  _enabled = false;
  document.removeEventListener('mouseup', handleDocumentMouseup);
  document.removeEventListener('mousedown', handleDocumentMousedown);
  document.removeEventListener('keyup', handleDocumentKeyup);
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCircle = setCircle;
exports.enableCircle = enableCircle;
exports.disableCircle = disableCircle;
exports.addCircle = addCircle;

var _PDFJSAnnotate = __webpack_require__(0);

var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _appendChild = __webpack_require__(2);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _enabled = false;
var _type = void 0;
var _circleRadius = 10;
var _circleColor = '0000FF';

/**
 * Set the attributes of the pen.
 *
 * @param {Number} circleRadius The radius of the circle
 * @param {String} circleColor The color of the circle
 */
function setCircle() {
  var circleRadius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var circleColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0000FF';

  _circleRadius = parseInt(circleRadius, 10);
  _circleColor = circleColor;
}

/**
 * Handle document.mouseup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentMouseup(e) {
  var svg = (0, _utils.findSVGAtPoint)(e.clientX, e.clientY);
  if (!svg) {
    return;
  }
  var rect = svg.getBoundingClientRect();
  saveCircle(svg, _type, {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }, _circleRadius, _circleColor);
}

/**
 * Save a circle annotation
 *
 * @param {SVGElement} svg
 * @param {String} type The type of circle (circle, emptycircle, fillcircle)
 * @param {Object} pt The point to use for annotation
 * @param {float} radius
 * @param {String} color The color of the rects
 */
function saveCircle(svg, type, pt, radius, color) {
  // Initialize the annotation
  var svg_pt = (0, _utils.convertToSvgPoint)([pt.x, pt.y], svg);
  var annotation = {
    type: type,
    color: color,
    cx: svg_pt[0],
    cy: svg_pt[1],
    r: radius
  };

  var _getMetadata = (0, _utils.getMetadata)(svg),
      documentId = _getMetadata.documentId,
      userId = _getMetadata.userId,
      pageNumber = _getMetadata.pageNumber;

  // Add the annotation


  _PDFJSAnnotate2.default.getStoreAdapter().addAnnotation(documentId, userId, pageNumber, annotation).then(function (annotation) {
    (0, _appendChild.appendChild)(svg, annotation);
  });
}

/**
 * Enable circle behavior
 */
function enableCircle(type) {
  _type = type;

  if (_enabled) {
    return;
  }

  _enabled = true;
  document.addEventListener('mouseup', handleDocumentMouseup);
}

/**
 * Disable circle behavior
 */
function disableCircle() {
  if (!_enabled) {
    return;
  }

  _enabled = false;
  document.removeEventListener('mouseup', handleDocumentMouseup);
}

function addCircle(type, e) {
  var oldType = _type;
  _type = type;
  handleDocumentMouseup(e);
  _type = oldType;
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setText = setText;
exports.enableText = enableText;
exports.disableText = disableText;

var _PDFJSAnnotate = __webpack_require__(0);

var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

var _appendChild = __webpack_require__(2);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _enabled = false;
var input = void 0;
var _textSize = void 0;
var _textColor = void 0;

/**
 * Handle document.mouseup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentMouseup(e) {
  if (input || !(0, _utils.findSVGAtPoint)(e.clientX, e.clientY)) {
    return;
  }
  if (!e.srcElement.classList.contains('annotationLayer')) {
    return;
  }
  input = document.createElement('input');
  input.setAttribute('id', 'pdf-annotate-text-input');
  input.setAttribute('placeholder', 'Enter text');
  input.style.border = '3px solid ' + _utils.BORDER_COLOR;
  input.style.borderRadius = '3px';
  input.style.position = 'absolute';
  input.style.top = e.clientY + 'px';
  input.style.left = e.clientX + 'px';
  input.style.fontSize = _textSize + 'px';
  input.style.zIndex = "41";
  input.addEventListener('blur', handleInputBlur);
  input.addEventListener('keyup', handleInputKeyup);

  document.body.appendChild(input);
  input.focus();
}

/**
 * Handle input.blur event
 */
function handleInputBlur() {
  saveText();
}

/**
 * Handle input.keyup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleInputKeyup(e) {
  if (e.keyCode === 27) {
    closeInput();
  } else if (e.keyCode === 13) {
    saveText();
  }
}

/**
 * Save a text annotation from input
 */
function saveText() {
  if (input.value.trim().length > 0) {
    var clientX = parseInt(input.style.left, 10);
    var clientY = parseInt(input.style.top, 10);
    var svg = (0, _utils.findSVGAtPoint)(clientX, clientY);
    if (!svg) {
      return;
    }
    var height = _textSize;

    var _getMetadata = (0, _utils.getMetadata)(svg),
        documentId = _getMetadata.documentId,
        userId = _getMetadata.userId,
        pageNumber = _getMetadata.pageNumber,
        viewport = _getMetadata.viewport;

    var scale = 1 / viewport.scale;
    var rect = svg.getBoundingClientRect();
    var pt = (0, _utils.convertToSvgPoint)([clientX - rect.left, clientY - rect.top + height], svg, viewport);
    var annotation = {
      type: 'textbox',
      size: _textSize * scale,
      color: _textColor,
      content: input.value.trim(),
      x: pt[0],
      y: pt[1],
      rotation: -viewport.rotation
    };

    _PDFJSAnnotate2.default.getStoreAdapter().addAnnotation(documentId, userId, pageNumber, annotation).then(function (annotation) {
      (0, _appendChild.appendChild)(svg, annotation);
    });
  }

  closeInput();
}

/**
 * Close the input
 */
function closeInput() {
  if (input) {
    input.removeEventListener('blur', handleInputBlur);
    input.removeEventListener('keyup', handleInputKeyup);
    document.body.removeChild(input);
    input = null;
  }
}

/**
 * Set the text attributes
 *
 * @param {Number} textSize The size of the text
 * @param {String} textColor The color of the text
 */
function setText() {
  var textSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 12;
  var textColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '000000';

  _textSize = parseInt(textSize, 10);
  _textColor = textColor;
}

/**
 * Enable text behavior
 */
function enableText() {
  if (_enabled) {
    return;
  }

  _enabled = true;
  document.addEventListener('mouseup', handleDocumentMouseup);
}

/**
 * Disable text behavior
 */
function disableText() {
  if (!_enabled) {
    return;
  }

  _enabled = false;
  document.removeEventListener('mouseup', handleDocumentMouseup);
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createPage = createPage;
exports.renderPage = renderPage;

var _PDFJSAnnotate = __webpack_require__(0);

var _PDFJSAnnotate2 = _interopRequireDefault(_PDFJSAnnotate);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _renderScreenReaderHints = __webpack_require__(7);

var _renderScreenReaderHints2 = _interopRequireDefault(_renderScreenReaderHints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Template for creating a new page
var PAGE_TEMPLATE = '\n  <div style="visibility: hidden;" class="page" data-loaded="false">\n    <div class="canvasWrapper">\n      <canvas></canvas>\n    </div>\n    <div class="' + _config2.default.textLayerName + '"></div>\n    <svg class="' + _config2.default.annotationLayerName + '"></svg>\n  </div>\n';

/**
 * Create a new page to be appended to the DOM.
 *
 * @param {Number} pageNumber The page number that is being created
 * @return {HTMLElement}
 */
function createPage(pageNumber) {
  var temp = document.createElement('div');
  temp.innerHTML = PAGE_TEMPLATE;

  var page = temp.children[0];
  var canvas = page.querySelector('canvas');

  page.setAttribute('id', 'pageContainer' + pageNumber);
  page.setAttribute('data-page-number', pageNumber);

  canvas.mozOpaque = true;
  canvas.setAttribute('id', 'page' + pageNumber);

  return page;
}

/**
 * Render a page that has already been created.
 *
 * @param {Number} pageNumber The page number to be rendered
 * @param {Object} renderOptions The options for rendering
 * @return {Promise} Settled once rendering has completed
 *  A settled Promise will be either:
 *    - fulfilled: [pdfPage, annotations]
 *    - rejected: Error
 */
function renderPage(pageNumber, renderOptions) {
  var documentId = renderOptions.documentId,
      userId = renderOptions.userId,
      pdfDocument = renderOptions.pdfDocument,
      scale = renderOptions.scale,
      rotate = renderOptions.rotate;

  // Load the page and annotations

  return Promise.all([pdfDocument.getPage(pageNumber), _PDFJSAnnotate2.default.getAnnotations(documentId, userId, pageNumber)]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        pdfPage = _ref2[0],
        annotations = _ref2[1];

    var page = document.getElementById('pageContainer' + pageNumber);
    var svg = page.querySelector(_config2.default.annotationClassQuery());
    var canvas = page.querySelector('.canvasWrapper canvas');
    var canvasContext = canvas.getContext('2d', { alpha: false });
    var totalRotation = (rotate + pdfPage.rotate) % 360;
    var viewport = pdfPage.getViewport(scale, totalRotation);
    var transform = scalePage(pageNumber, viewport, canvasContext);

    // Render the page
    return Promise.all([pdfPage.render({ canvasContext: canvasContext, viewport: viewport, transform: transform }), _PDFJSAnnotate2.default.render(svg, viewport, annotations)]).then(function () {
      // Text content is needed for a11y, but is also necessary for creating
      // highlight and strikeout annotations which require selecting text.
      return pdfPage.getTextContent({ normalizeWhitespace: true }).then(function (textContent) {
        return new Promise(function (resolve, reject) {
          // Render text layer for a11y of text content
          var textLayer = page.querySelector(_config2.default.textClassQuery());
          var textLayerFactory = new PDFJS.DefaultTextLayerFactory();
          var textLayerBuilder = textLayerFactory.createTextLayerBuilder(textLayer, pageNumber - 1, viewport);
          textLayerBuilder.setTextContent(textContent);
          textLayerBuilder.render();

          // Enable a11y for annotations
          // Timeout is needed to wait for `textLayerBuilder.render`
          setTimeout(function () {
            try {
              (0, _renderScreenReaderHints2.default)(annotations.annotations);
              resolve();
            } catch (e) {
              reject(e);
            }
          });
        });
      });
    }).then(function () {
      // Indicate that the page was loaded
      page.setAttribute('data-loaded', 'true');

      return [pdfPage, annotations];
    });
  });
}

/**
 * Scale the elements of a page.
 *
 * @param {Number} pageNumber The page number to be scaled
 * @param {Object} viewport The viewport of the PDF page (see pdfPage.getViewport(scale, rotate))
 * @param {Object} context The canvas context that the PDF page is rendered to
 * @return {Array} The transform data for rendering the PDF page
 */
function scalePage(pageNumber, viewport, context) {
  var page = document.getElementById('pageContainer' + pageNumber);
  var canvas = page.querySelector('.canvasWrapper canvas');
  var svg = page.querySelector(_config2.default.annotationClassQuery());
  var wrapper = page.querySelector('.canvasWrapper');
  var textLayer = page.querySelector(_config2.default.textClassQuery());
  var outputScale = getOutputScale(context);
  var transform = !outputScale.scaled ? null : [outputScale.sx, 0, 0, outputScale.sy, 0, 0];
  var sfx = approximateFraction(outputScale.sx);
  var sfy = approximateFraction(outputScale.sy);

  // Adjust width/height for scale
  page.style.visibility = '';
  canvas.width = roundToDivide(viewport.width * outputScale.sx, sfx[0]);
  canvas.height = roundToDivide(viewport.height * outputScale.sy, sfy[0]);
  canvas.style.width = roundToDivide(viewport.width, sfx[1]) + 'px';
  canvas.style.height = roundToDivide(viewport.height, sfx[1]) + 'px';
  svg.setAttribute('width', viewport.width);
  svg.setAttribute('height', viewport.height);
  svg.style.width = viewport.width + 'px';
  svg.style.height = viewport.height + 'px';
  page.style.width = viewport.width + 'px';
  page.style.height = viewport.height + 'px';
  wrapper.style.width = viewport.width + 'px';
  wrapper.style.height = viewport.height + 'px';
  textLayer.style.width = viewport.width + 'px';
  textLayer.style.height = viewport.height + 'px';

  return transform;
}

/**
 * Approximates a float number as a fraction using Farey sequence (max order of 8).
 *
 * @param {Number} x Positive float number
 * @return {Array} Estimated fraction: the first array item is a numerator,
 *                 the second one is a denominator.
 */
function approximateFraction(x) {
  // Fast path for int numbers or their inversions.
  if (Math.floor(x) === x) {
    return [x, 1];
  }

  var xinv = 1 / x;
  var limit = 8;
  if (xinv > limit) {
    return [1, limit];
  } else if (Math.floor(xinv) === xinv) {
    return [1, xinv];
  }

  var x_ = x > 1 ? xinv : x;

  // a/b and c/d are neighbours in Farey sequence.
  var a = 0,
      b = 1,
      c = 1,
      d = 1;

  // Limit search to order 8.
  while (true) {
    // Generating next term in sequence (order of q).
    var p = a + c,
        q = b + d;
    if (q > limit) {
      break;
    }
    if (x_ <= p / q) {
      c = p;d = q;
    } else {
      a = p;b = q;
    }
  }

  // Select closest of neighbours to x.
  if (x_ - a / b < c / d - x_) {
    return x_ === x ? [a, b] : [b, a];
  } else {
    return x_ === x ? [c, d] : [d, c];
  }
}

function getOutputScale(ctx) {
  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  var pixelRatio = devicePixelRatio / backingStoreRatio;
  return {
    sx: pixelRatio,
    sy: pixelRatio,
    scaled: pixelRatio !== 1
  };
}

function roundToDivide(x, div) {
  var r = x % div;
  return r === 0 ? x : Math.round(x - r + div);
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=pdf-annotate.js.map