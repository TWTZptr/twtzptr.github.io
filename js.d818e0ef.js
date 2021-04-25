// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/api.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Api = void 0;

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

exports.Api = Api;
},{}],"src/js/bookStorage.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BookStorage = void 0;

class BookStorage {
  constructor() {
    this._state = document.getElementById("readlist-state");
    this._markedBooksContainer = document.getElementById("to-read-marked");
    this._unmarkedBooksContainer = document.getElementById("to-read-unmarked");
    const {
      unmarkedBooks,
      markedBooks
    } = this.getLocalStorageData();
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
    this.setState(); // add books from storage

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

  markBook(container, {
    target
  }) {
    container.classList.add("marked");
    target.innerText = "Unmark";
    target.dataset.action = "unmark";

    const bookToMarkIndex = this._unmarkedBooks.findIndex(item => item.key === container.id);

    this._markedBooks.push(this._unmarkedBooks[bookToMarkIndex]);

    this._unmarkedBooks.splice(bookToMarkIndex, 1);

    this._markedBooksContainer.insertAdjacentElement('beforeend', container); // перемещаем в конец отмеченных

  }

  unmarkBook(container, {
    target
  }) {
    container.classList.remove("marked");
    target.innerText = "Mark as read";
    target.dataset.action = "mark";

    const bookToUnmarkIndex = this._markedBooks.findIndex(item => item.key === container.id);

    this._unmarkedBooks.push(this._markedBooks[bookToUnmarkIndex]);

    this._markedBooks.splice(bookToUnmarkIndex, 1);

    this._unmarkedBooksContainer.insertAdjacentElement('beforeend', container); // перемещаем в конец неотмеченных

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

exports.BookStorage = BookStorage;
},{}],"src/js/bookInfo.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BookInfo = void 0;

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

exports.BookInfo = BookInfo;
},{"./bookStorage":"src/js/bookStorage.js"}],"src/js/bookSearch.js":[function(require,module,exports) {
'use strict'; // TODO: search without enter (3+ chars, debounce)

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BookSearch = void 0;

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

exports.BookSearch = BookSearch;
},{"./bookInfo":"src/js/bookInfo.js"}],"src/js/index.js":[function(require,module,exports) {
'use strict';

var _api = require("./api.js");

var _bookSearch = require("./bookSearch.js");

new _bookSearch.BookSearch(new _api.Api());
},{"./api.js":"src/js/api.js","./bookSearch.js":"src/js/bookSearch.js"}],"C:/Users/djtwi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57500" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
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
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
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
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/djtwi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/index.js"], null)
//# sourceMappingURL=/js.d818e0ef.js.map