// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"21c8X":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "062e9a7565ca912a5f7d6b832142d36c";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"3L8AI":[function(require,module,exports) {
"use strict";
var _apiJs = require("./api.js");
var _bookSearchJs = require("./bookSearch.js");
new _bookSearchJs.BookSearch(new _apiJs.Api());

},{"./api.js":"2IiKm","./bookSearch.js":"5LvJo"}],"2IiKm":[function(require,module,exports) {
"use strict";
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Api", function () {
  return Api;
});
class Api {
  constructor() {
    this.controller = null;
  }
  async search(q, pageNum) {
    const url = `https://openlibrary.org/search.json?q=${q}&page=${pageNum}`;
    console.log(`fetch url: ${url}`);
    this.controller = new AbortController();
    const result = await fetch(url, {
      signal: this.controller.signal
    });
    return await result.json();
  }
  stopFetch() {
    if (this.controller) this.controller.abort();
  }
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5wFlC"}],"5wFlC":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"5LvJo":[function(require,module,exports) {
"use strict";
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "BookSearch", function () {
  return BookSearch;
});
var _bookInfo = require("./bookInfo");
class BookSearch {
  constructor(api) {
    this._api = api;
    this._searchInput = document.getElementById("search-input");
    this._booksList = document.getElementById("books-list");
    this._resultsInfo = document.getElementById("results-info");
    this._loadingMessage = document.getElementById("loading-message");
    this._resultContainer = document.getElementById("result-container");
    this._infoUI = new _bookInfo.BookInfo();
    this._results = [];
    this._numFound = 0;
    this._fetchBlock = false;
    this._selectedPage = null;
    this._searchInput.value = "";
    this._currentPage = 0;
    this._currentRequest = "";
    this._debounceTimeoutID = null;
    this._booksList.addEventListener("click", event => {
      if (event.target.classList.contains("left-column-result-wrapper-results__elem")) {
        this._infoUI.showInfo(this._results[event.target.dataset.elemId]);
        this.selectItem(event.target);
      }
    });
    this._searchInput.addEventListener("input", event => {
      if (this._searchInput.value.length >= 3) {
        if (this._debounceTimeoutID) {
          this._api.stopFetch();
          clearTimeout(this._debounceTimeoutID);
        }
        this._debounceTimeoutID = setTimeout(() => {
          this._debounceTimeoutID = null;
          this.processSearch(event);
        }, 500);
      }
    });
    this._resultContainer.addEventListener("scroll", () => {
      if (!this._fetchBlock && this._resultContainer.scrollTop + this._resultContainer.clientHeight + 6000 > this._resultContainer.scrollHeight) {
        this.loadData();
      }
    });
  }
  processSearch(event) {
    event.preventDefault();
    if (this._currentRequest !== this._searchInput.value && this._searchInput.value !== "") {
      this._results = [];
      this._booksList.innerHTML = "";
      this._currentRequest = this._searchInput.value;
      this.loadData();
    }
  }
  loadData() {
    this.showLoadingMessage();
    this._fetchBlock = true;
    this._api.search(this._currentRequest, this._currentPage + 1).then(response => {
      this._results = this._results.concat(response.docs);
      this._numFound = response.numFound;
      this._currentPage++;
      this.renderSearchResult(response.docs);
      if (this._results.length < response.numFound) {
        this._fetchBlock = false;
      }
      this.hideLoadingMessage();
    }, err => {
      this.processSearchError(err);
      this.hideLoadingMessage();
    });
  }
  renderSearchResult(data) {
    this._booksList.innerHTML += this.makeSearchResult(data);
    this._resultsInfo.innerHTML = this.makeStats();
  }
  makeStats() {
    return `<span class="left-column-results-bottom-info_elem">
                    Found: ${this._numFound}
               </span>
               <span class="left-column-results-bottom-info_elem">
                   Loaded: ${this._results.length}
               </span>`;
  }
  makeSearchResult(data) {
    let HTML = "";
    if (data.length !== 0) {
      data.forEach((item, index) => {
        HTML += `<div class="left-column-result-wrapper-results__elem" data-elem-id = "${index + (this._currentPage - 1) * 100}">
                        ${item.title} (${item.language === undefined ? "no info" : item.language.join(", ")})
                        </div>`;
      });
    } else {
      HTML = `<div class="left-column-result-wrapper-results__error">Nothing found!</div>`;
    }
    return HTML;
  }
  processSearchError(err) {
    console.log(err);
  }
  selectItem(item) {
    if (this._selectedPage) {
      this._selectedPage.classList.remove("left-column-result-wrapper__elem_selected");
    }
    item.classList.add("left-column-result-wrapper__elem_selected");
    this._selectedPage = item;
  }
  showLoadingMessage() {
    this._loadingMessage.style.display = "block";
  }
  hideLoadingMessage() {
    this._loadingMessage.style.display = "none";
  }
}

},{"./bookInfo":"6gyMR","@parcel/transformer-js/lib/esmodule-helpers.js":"5wFlC"}],"6gyMR":[function(require,module,exports) {
"use strict";
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "BookInfo", function () {
  return BookInfo;
});
var _bookStorage = require("./bookStorage");
class BookInfo {
  constructor() {
    this._infoContainer = document.getElementById("book-info-holder");
    this._storage = new _bookStorage.BookStorage();
    this._currentBook = null;
    this._messageContainer = document.getElementById("error-message");
  }
  showInfo(item) {
    this._messageContainer.style.display = "none";
    this._infoContainer.innerHTML = `<h2 class="center-column-holder-title>">${item.title}</h2>
                    <div class="center-column-holder-subtitle">${item.subtitle !== undefined ? item.subtitle : ""}</div>
                    <div class="center-column-holder-info">
                        <div class="center-column-holder-info_langs">Languages available: ${item.language !== undefined ? item.language.join(", ") : "no information"}</div>
                        <div class="center-column-holder-info_full-text">Full text available: ${item.has_fulltext ? "yes" : "no"}</div>
                        <div class="center-column-holder-info_first-publish">First publish year: ${item.first_publish_year !== undefined ? item.first_publish_year : "no information"}</div>
                        <div class="center-column-holder-info_years-published">Year published: ${item.publish_year !== undefined ? item.publish_year.join(", ") : "no information"}</div>
                    </div>
                    <button class="center-column-holder-button" id="add-book">Add book to Read List</button>`;
    this._currentBook = item;
    const addBookButton = document.getElementById("add-book");
    addBookButton.addEventListener("click", () => {
      if (!this._storage.addBook(this._currentBook)) {
        this.showMessageError();
      }
    });
  }
  showMessageError() {
    if (this._messageContainer.style.display !== "block") {
      this._messageContainer.style.display = "block";
      setTimeout(() => {
        this._messageContainer.style.display = "none";
      }, 5000);
    }
  }
}

},{"./bookStorage":"rBnq6","@parcel/transformer-js/lib/esmodule-helpers.js":"5wFlC"}],"rBnq6":[function(require,module,exports) {
"use strict";
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "BookStorage", function () {
  return BookStorage;
});
class BookStorage {
  constructor() {
    this._state = document.getElementById("readlist-state");
    this._markedBooksContainer = document.getElementById("to-read-marked");
    this._unmarkedBooksContainer = document.getElementById("to-read-unmarked");
    const {unmarkedBooks, markedBooks} = this.getLocalStorageData();
    this._unmarkedBooks = unmarkedBooks;
    this._markedBooks = markedBooks;
    this.initRender();
    window.onbeforeunload = this.saveBooks.bind(this);
  }
  saveBooks() {
    localStorage.clear();
    localStorage.setItem("booksInfo", JSON.stringify({
      unmarkedBooks: this._unmarkedBooks,
      markedBooks: this._markedBooks
    }));
  }
  initRender() {
    this.setState();
    // add books from storage
    this._unmarkedBooks.forEach(item => this.renderUnmarkedBook(item));
    this._markedBooks.forEach(item => this.renderMarkedBook(item));
  }
  setState() {
    this._state.innerHTML = `<div class="right-column-header-state" id="readlist-state">
                                    ${this._unmarkedBooks.length + this._markedBooks.length} books, ${this._markedBooks.length} read
                                 </div>`;
  }
  renderMarkedBook(book) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "right-column-list-holder__elem marked");
    newDiv.setAttribute("id", book.key);
    newDiv.innerHTML = `<div class="right-column-list-holder__elem-title">${book.title}</div>
                            <div class="right-column-list-holder__elem-subtitle">${book.subtitle !== undefined ? book.subtitle : "no subtitle"}</div>
                            <div class="right-column-list-holder__elem-author">${book.author_name[0] !== undefined ? book.author_name[0] : "no info about author"}</div>
                            <div class="right-column-list-holder__elem-actions">
                                <button class="right-column-list-holder__elem-actions__button" data-action="unmark">Unmark</button>
                                <button class="right-column-list-holder__elem-actions__button" data-action="remove">Remove from list</button>
                            </div>`;
    this._markedBooksContainer.appendChild(newDiv);
    const buttons = document.getElementById(book.key);
    buttons.addEventListener("click", this.processAction.bind(this));
  }
  renderUnmarkedBook(book) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "right-column-list-holder__elem");
    newDiv.setAttribute("id", book.key);
    newDiv.innerHTML = `<div class="right-column-list-holder__elem-title">${book.title}</div>
                            <div class="right-column-list-holder__elem-subtitle">${book.subtitle !== undefined ? book.subtitle : "no subtitle"}</div>
                            <div class="right-column-list-holder__elem-author">${book.author_name !== undefined && book.author_name[0] !== undefined ? book.author_name[0] : "no info about author"}</div>
                            <div class="right-column-list-holder__elem-actions">
                                <button class="right-column-list-holder__elem-actions__button" data-action="mark">Mark as read</button>
                                <button class="right-column-list-holder__elem-actions__button" data-action="remove">Remove from list</button>
                            </div>`;
    this._unmarkedBooksContainer.appendChild(newDiv);
    const buttons = document.getElementById(book.key);
    buttons.addEventListener("click", this.processAction.bind(this));
  }
  isInStorage(id) {
    return this._unmarkedBooks.concat(this._markedBooks).some(item => item.key === id);
  }
  removeBook(container) {
    if (container.classList.contains("marked")) {
      const bookToDeleteIndex = this._markedBooks.findIndex(item => item.key === container.id);
      this._markedBooks.splice(bookToDeleteIndex, 1);
    } else {
      const bookToDeleteIndex = this._unmarkedBooks.findIndex(item => item.key === container.id);
      this._unmarkedBooks.splice(bookToDeleteIndex, 1);
    }
    container.remove();
    this.setState();
  }
  markBook(container, {target}) {
    container.classList.add("marked");
    target.innerText = "Unmark";
    target.dataset.action = "unmark";
    const bookToMarkIndex = this._unmarkedBooks.findIndex(item => item.key === container.id);
    this._markedBooks.push(this._unmarkedBooks[bookToMarkIndex]);
    this._unmarkedBooks.splice(bookToMarkIndex, 1);
    this._markedBooksContainer.insertAdjacentElement('beforeend', container);
  }
  unmarkBook(container, {target}) {
    container.classList.remove("marked");
    target.innerText = "Mark as read";
    target.dataset.action = "mark";
    const bookToUnmarkIndex = this._markedBooks.findIndex(item => item.key === container.id);
    this._unmarkedBooks.push(this._markedBooks[bookToUnmarkIndex]);
    this._markedBooks.splice(bookToUnmarkIndex, 1);
    this._unmarkedBooksContainer.insertAdjacentElement('beforeend', container);
  }
  processAction(event) {
    if (event.target.nodeName === "BUTTON") {
      const container = event.target.parentNode.parentNode;
      if (event.target.dataset.action === "mark" || event.target.dataset.action === "unmark") {
        if (event.target.dataset.action === "mark") {
          this.markBook(container, event);
        } else {
          this.unmarkBook(container, event);
        }
      } else {
        this.removeBook(container);
      }
      this.setState();
    }
  }
  addBook(book) {
    let added = false;
    if (!this.isInStorage(book.key)) {
      added = true;
      this._unmarkedBooks.push(book);
      this.renderUnmarkedBook(book);
      this.setState();
    }
    return added;
  }
  getLocalStorageData() {
    let result;
    let localStorageJson = localStorage.getItem("booksInfo");
    if (localStorageJson === null || localStorageJson === "[]") {
      // Данных нет
      localStorage.setItem("booksInfo", JSON.stringify({
        unmarkedBooks: [],
        markedBooks: []
      }));
      result = {
        unmarkedBooks: [],
        markedBooks: []
      };
    } else {
      // Данные есть
      try {
        result = JSON.parse(localStorage.getItem("booksInfo"));
      } catch (e) {
        console.log(`localStorage JSON parse error: ${e.message}`);
      }
    }
    return result;
  }
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5wFlC"}]},["21c8X","3L8AI"], "3L8AI", "parcelRequire427e")

//# sourceMappingURL=index.2142d36c.js.map
