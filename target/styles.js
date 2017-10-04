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
/******/ 	__webpack_require__.p = "target/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 404);
/******/ })
/************************************************************************/
/******/ ({

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(405);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(407)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(406)(undefined);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n.todo-application {\n  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  line-height: 1.4em;\n  background: #f5f5f5;\n  color: #4d4d4d;\n  min-width: 230px;\n  max-width: 550px;\n  margin: 0 auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-font-smoothing: antialiased;\n  font-smoothing: antialiased;\n  font-weight: 300;\n  /*\n    Hack to remove background from Mobile Safari.\n    Can't use it globally since it destroys checkboxes in Firefox\n  */ }\n  .todo-application button {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    background: none;\n    font-size: 100%;\n    vertical-align: baseline;\n    font-family: inherit;\n    font-weight: inherit;\n    color: inherit;\n    -webkit-appearance: none;\n    appearance: none;\n    -webkit-font-smoothing: antialiased;\n    -moz-font-smoothing: antialiased;\n    font-smoothing: antialiased; }\n  .todo-application button,\n  .todo-application input[type=\"checkbox\"] {\n    outline: none; }\n  .todo-application .hidden {\n    display: none; }\n  .todo-application .todoapp {\n    background: #fff;\n    margin: 130px 0 40px 0;\n    position: relative;\n    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1); }\n  .todo-application .todoapp input::-webkit-input-placeholder {\n    font-style: italic;\n    font-weight: 300;\n    color: #e6e6e6; }\n  .todo-application .todoapp input::-moz-placeholder {\n    font-style: italic;\n    font-weight: 300;\n    color: #e6e6e6; }\n  .todo-application .todoapp input::input-placeholder {\n    font-style: italic;\n    font-weight: 300;\n    color: #e6e6e6; }\n  .todo-application .todoapp h1 {\n    position: absolute;\n    top: -155px;\n    width: 100%;\n    font-size: 100px;\n    font-weight: 100;\n    text-align: center;\n    color: rgba(175, 47, 47, 0.15);\n    -webkit-text-rendering: optimizeLegibility;\n    -moz-text-rendering: optimizeLegibility;\n    text-rendering: optimizeLegibility; }\n  .todo-application #new-todo,\n  .todo-application .edit {\n    position: relative;\n    margin: 0;\n    width: 100%;\n    font-size: 24px;\n    font-family: inherit;\n    font-weight: inherit;\n    line-height: 1.4em;\n    border: 0;\n    outline: none;\n    color: inherit;\n    padding: 6px;\n    border: 1px solid #999;\n    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-font-smoothing: antialiased;\n    font-smoothing: antialiased; }\n  .todo-application #new-todo {\n    padding: 16px 16px 16px 60px;\n    border: none;\n    background: rgba(0, 0, 0, 0.003);\n    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03); }\n  .todo-application .main {\n    position: relative;\n    z-index: 2;\n    border-top: 1px solid #e6e6e6; }\n  .todo-application label[for='toggle-all'] {\n    display: none; }\n  .todo-application .toggle-all {\n    position: absolute;\n    top: -55px;\n    left: -12px;\n    width: 60px;\n    height: 34px;\n    text-align: center;\n    border: none;\n    /* Mobile Safari */ }\n  .todo-application .toggle-all:before {\n    content: '\\276F';\n    font-size: 22px;\n    color: #e6e6e6;\n    padding: 10px 27px 10px 27px; }\n  .todo-application .toggle-all:checked:before {\n    color: #737373; }\n  .todo-application .todo-list {\n    margin: 0;\n    padding: 0;\n    list-style: none; }\n  .todo-application .todo-list li {\n    position: relative;\n    font-size: 24px;\n    border-bottom: 1px solid #ededed; }\n  .todo-application .todo-list li:last-child {\n    border-bottom: none; }\n  .todo-application .todo-list li.editing {\n    border-bottom: none;\n    padding: 0; }\n  .todo-application .todo-list li.editing .edit {\n    display: block;\n    width: 506px;\n    padding: 13px 17px 12px 17px;\n    margin: 0 0 0 43px; }\n  .todo-application .todo-list li.editing .view {\n    display: none; }\n  .todo-application .todo-list li .toggle {\n    text-align: center;\n    width: 40px;\n    /* auto, since non-WebKit browsers doesn't support input styling */\n    height: auto;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    margin: auto 0;\n    border: none;\n    /* Mobile Safari */\n    -webkit-appearance: none;\n    appearance: none; }\n  .todo-application .todo-list li .toggle:after {\n    content: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"-10 -18 100 135\"><circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"none\" stroke=\"#ededed\" stroke-width=\"3\"/></svg>'); }\n  .todo-application .todo-list li .toggle:checked:after {\n    content: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"-10 -18 100 135\"><circle cx=\"50\" cy=\"50\" r=\"50\" fill=\"none\" stroke=\"#bddad5\" stroke-width=\"3\"/><path fill=\"#5dc2af\" d=\"M72 25L42 71 27 56l-4 4 20 20 34-52z\"/></svg>'); }\n  .todo-application .todo-list li label {\n    white-space: pre-line;\n    word-break: break-all;\n    padding: 15px 60px 15px 15px;\n    margin-left: 45px;\n    display: block;\n    line-height: 1.2;\n    transition: color 0.4s; }\n  .todo-application .todo-list li.completed label {\n    color: #d9d9d9;\n    text-decoration: line-through; }\n  .todo-application .todo-list li .destroy {\n    display: none;\n    position: absolute;\n    top: 0;\n    right: 10px;\n    bottom: 0;\n    width: 40px;\n    height: 40px;\n    margin: auto 0;\n    font-size: 30px;\n    color: #cc9a9a;\n    margin-bottom: 11px;\n    transition: color 0.2s ease-out; }\n  .todo-application .todo-list li .destroy:hover {\n    color: #af5b5e; }\n  .todo-application .todo-list li .destroy:after {\n    content: '\\D7'; }\n  .todo-application .todo-list li:hover .destroy {\n    display: block; }\n  .todo-application .todo-list li .edit {\n    display: none; }\n  .todo-application .todo-list li.editing:last-child {\n    margin-bottom: -1px; }\n  .todo-application .footer {\n    color: #777;\n    padding: 10px 15px;\n    height: 20px;\n    text-align: center;\n    border-top: 1px solid #e6e6e6; }\n  .todo-application .footer:before {\n    content: '';\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    height: 50px;\n    overflow: hidden;\n    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2); }\n  .todo-application .todo-count {\n    float: left;\n    text-align: left; }\n  .todo-application .todo-count strong {\n    font-weight: 300; }\n  .todo-application .filters {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    position: absolute;\n    right: 0;\n    left: 0; }\n  .todo-application .filters li {\n    display: inline; }\n  .todo-application .filters li a {\n    color: inherit;\n    margin: 3px;\n    padding: 3px 7px;\n    text-decoration: none;\n    border: 1px solid transparent;\n    border-radius: 3px; }\n  .todo-application .filters li a.selected,\n  .todo-application .filters li a:hover {\n    border-color: rgba(175, 47, 47, 0.1); }\n  .todo-application .filters li a.selected {\n    border-color: rgba(175, 47, 47, 0.2); }\n  .todo-application .clear-completed,\n  .todo-application html .clear-completed:active {\n    float: right;\n    position: relative;\n    line-height: 20px;\n    text-decoration: none;\n    cursor: pointer;\n    position: relative; }\n  .todo-application .clear-completed:hover {\n    text-decoration: underline; }\n  .todo-application .info {\n    margin: 65px auto 0;\n    color: #bfbfbf;\n    font-size: 10px;\n    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n    text-align: center; }\n  .todo-application .info p {\n    line-height: 1; }\n  .todo-application .info a {\n    color: inherit;\n    text-decoration: none;\n    font-weight: 400; }\n  .todo-application .info a:hover {\n    text-decoration: underline; }\n  @media screen and (-webkit-min-device-pixel-ratio: 0) {\n    .todo-application .toggle-all,\n    .todo-application .todo-list li .toggle {\n      background: none; }\n    .todo-application .todo-list li .toggle {\n      height: 40px; }\n    .todo-application .toggle-all {\n      -webkit-transform: rotate(90deg);\n      transform: rotate(90deg);\n      -webkit-appearance: none;\n      appearance: none; } }\n  @media (max-width: 430px) {\n    .todo-application .footer {\n      height: 50px; }\n    .todo-application .filters {\n      bottom: 10px; } }\n\nhtml,\nbody {\n  margin: 0;\n  padding: 0; }\n", ""]);

// exports


/***/ }),

/***/ 406:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 407:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(408);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 408:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })

/******/ });
//# sourceMappingURL=styles.js.map