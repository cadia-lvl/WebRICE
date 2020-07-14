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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "build";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Reader.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Reader.ts":
/*!***********************!*\
  !*** ./src/Reader.ts ***!
  \***********************/
/*! exports provided: Reader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Reader\", function() { return Reader; });\nclass Reader {\r\n    constructor() {\r\n        this.webText = \"\";\r\n        this.CONTAINER_ID = \"container_id\";\r\n        this.TEXT_CONTENT_ID = \"webrice\";\r\n        this.init();\r\n    }\r\n    init() {\r\n        console.log(\"initialize the reader\");\r\n    }\r\n    createInitialHTML() {\r\n        console.log(\"creates the initial html\");\r\n    }\r\n    getWebText() {\r\n        return this.webText;\r\n    }\r\n    setWebText(text) {\r\n        this.webText = text;\r\n        return;\r\n    }\r\n    getContainerId() {\r\n        return this.CONTAINER_ID;\r\n    }\r\n    getTextContentId() {\r\n        return this.TEXT_CONTENT_ID;\r\n    }\r\n    loadThemes() {\r\n        console.log(\"theme work\");\r\n        return;\r\n    }\r\n}\r\nwindow.addEventListener('DOMContentLoaded', (event) => {\r\n    new Reader(); //let's see how this works\r\n});\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUmVhZGVyLnRzPzgwMWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFPLE1BQU0sTUFBTTtJQUlmO1FBSEEsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNaLGlCQUFZLEdBQVcsY0FBYyxDQUFDO1FBQ3RDLG9CQUFlLEdBQVcsU0FBUyxDQUFDO1FBRXpDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBQ00sSUFBSTtRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU8saUJBQWlCO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sVUFBVTtRQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRU8sVUFBVSxDQUFDLElBQVk7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsT0FBTTtJQUNWLENBQUM7SUFFTSxjQUFjO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRU0sZ0JBQWdCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBRU8sVUFBVTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUIsT0FBTTtJQUNWLENBQUM7Q0FHSjtBQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ2xELElBQUksTUFBTSxFQUFFLENBQUMsQ0FBQywwQkFBMEI7QUFDNUMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiLi9zcmMvUmVhZGVyLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFJlYWRlcntcclxuICAgIHdlYlRleHQ6IFN0cmluZyA9IFwiXCI7XHJcbiAgICByZWFkb25seSBDT05UQUlORVJfSUQ6IFN0cmluZyA9IFwiY29udGFpbmVyX2lkXCI7XHJcbiAgICByZWFkb25seSBURVhUX0NPTlRFTlRfSUQ6IFN0cmluZyA9IFwid2VicmljZVwiO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpbml0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpbml0aWFsaXplIHRoZSByZWFkZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVJbml0aWFsSFRNTCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlcyB0aGUgaW5pdGlhbCBodG1sXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRXZWJUZXh0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2ViVGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFdlYlRleHQodGV4dDogU3RyaW5nKXtcclxuICAgICAgICB0aGlzLndlYlRleHQgPSB0ZXh0O1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb250YWluZXJJZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLkNPTlRBSU5FUl9JRDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VGV4dENvbnRlbnRJZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLlRFWFRfQ09OVEVOVF9JRDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRUaGVtZXMoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRoZW1lIHdvcmtcIik7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIChldmVudCkgPT4ge1xyXG4gICAgbmV3IFJlYWRlcigpOyAvL2xldCdzIHNlZSBob3cgdGhpcyB3b3Jrc1xyXG59KTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Reader.ts\n");

/***/ })

/******/ });