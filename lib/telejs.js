(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("crypto-js"), require("rusha"));
	else if(typeof define === 'function' && define.amd)
		define("telejs", ["crypto-js", "rusha"], factory);
	else if(typeof exports === 'object')
		exports["telejs"] = factory(require("crypto-js"), require("rusha"));
	else
		root["telejs"] = factory(root["crypto-js"], root["rusha"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_32__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');

function _has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _DateTimeService = __webpack_require__(23);var DateTimeService = _interopRequireWildcard(_DateTimeService);
var _ErrorResponse = __webpack_require__(24);var _ErrorResponse2 = _interopRequireDefault(_ErrorResponse);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}exports.default =

{ DateTimeService: DateTimeService, ErrorResponse: _ErrorResponse2.default };module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _utils = __webpack_require__(7);var utils = _interopRequireWildcard(_utils);
var _bigNumbers = __webpack_require__(11);var BigNumbers = _interopRequireWildcard(_bigNumbers);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}exports.default = _extends({},

utils, BigNumbers);module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var Config = {
  Log: {
    verbose: false },

  App: {
    id: null,
    hash: null,
    version: '2.0.1' },

  Modes: {
    // allow_tmpfs: false,
    // animations: true,
    // chrome_packed: false,
    // debug: false,
    // force_desktop: false,
    // force_mobile: false,
    // http: false,
    // ios_standalone: undefined,
    // memory_only: false,
    // nacl: true,
    // packed: false,
    // push_api: true,
    ssl: false,
    test: true,
    websockets: true
    // webcrypto: true
  } };


Config.Schema = Config.Schema || {};
Config.Schema.MTProto = null;
Config.Schema.MTProto = {
  'constructors': [
  {
    'id': '481674261',
    'predicate': 'vector',
    'params': [],


    'type': 'Vector t' },

  {
    'id': '85337187',
    'predicate': 'resPQ',
    'params': [
    {
      'name': 'nonce',
      'type': 'int128' },

    {
      'name': 'server_nonce',
      'type': 'int128' },

    {
      'name': 'pq',
      'type': 'bytes' },

    {
      'name': 'server_public_key_fingerprints',
      'type': 'Vector<long>' }],


    'type': 'ResPQ' },

  {
    'id': '-2083955988',
    'predicate': 'p_q_inner_data',
    'params': [
    {
      'name': 'pq',
      'type': 'bytes' },

    {
      'name': 'p',
      'type': 'bytes' },

    {
      'name': 'q',
      'type': 'bytes' },

    {
      'name': 'nonce',
      'type': 'int128' },

    {
      'name': 'server_nonce',
      'type': 'int128' },

    {
      'name': 'new_nonce',
      'type': 'int256' }],


    'type': 'P_Q_inner_data' },

  {
    'id': '2043348061',
    'predicate': 'server_DH_params_fail',
    'params': [
    {
      'name': 'nonce',
      'type': 'int128' },

    {
      'name': 'server_nonce',
      'type': 'int128' },

    {
      'name': 'new_nonce_hash',
      'type': 'int128' }],


    'type': 'Server_DH_Params' },

  {
    'id': '-790100132',
    'predicate': 'server_DH_params_ok',
    'params': [
    {
      'name': 'nonce',
      'type': 'int128' },

    {
      'name': 'server_nonce',
      'type': 'int128' },

    {
      'name': 'encrypted_answer',
      'type': 'bytes' }],


    'type': 'Server_DH_Params' },

  {
    'id': '-1249309254',
    'predicate': 'server_DH_inner_data',
    'params': [
    {
      'name': 'nonce',
      'type': 'int128' },

    {
      'name': 'server_nonce',
      'type': 'int128' },

    {
      'name': 'g',
      'type': 'int' },

    {
      'name': 'dh_prime',
      'type': 'bytes' },

    {
      'name': 'g_a',
      'type': 'bytes' },

    {
      'name': 'server_time',
      'type': 'int' }],


    'type': 'Server_DH_inner_data' },

  {
    'id': '1715713620',
    'predicate': 'client_DH_inner_data',
    'params': [
    {
      'name': 'nonce',
      'type': 'int128' },

    {
      'name': 'server_nonce',
      'type': 'int128' },

    {
      'name': 'retry_id',
      'type': 'long' },

    {
      'name': 'g_b',
      'type': 'bytes' }],


    'type': 'Client_DH_Inner_Data' },

  {
    'id': '1003222836',
    'predicate': 'dh_gen_ok',
    'params': [
    {
      'name': 'nonce',
      'type': 'int128' },

    {
      'name': 'server_nonce',
      'type': 'int128' },

    {
      'name': 'new_nonce_hash1',
      'type': 'int128' }],


    'type': 'Set_client_DH_params_answer' },

  {
    'id': '1188831161',
    'predicate': 'dh_gen_retry',
    'params': [
    {
      'name': 'nonce',
      'type': 'int128' },

    {
      'name': 'server_nonce',
      'type': 'int128' },

    {
      'name': 'new_nonce_hash2',
      'type': 'int128' }],


    'type': 'Set_client_DH_params_answer' },

  {
    'id': '-1499615742',
    'predicate': 'dh_gen_fail',
    'params': [
    {
      'name': 'nonce',
      'type': 'int128' },

    {
      'name': 'server_nonce',
      'type': 'int128' },

    {
      'name': 'new_nonce_hash3',
      'type': 'int128' }],


    'type': 'Set_client_DH_params_answer' },

  {
    'id': '-212046591',
    'predicate': 'rpc_result',
    'params': [
    {
      'name': 'req_msg_id',
      'type': 'long' },

    {
      'name': 'result',
      'type': 'Object' }],


    'type': 'RpcResult' },

  {
    'id': '558156313',
    'predicate': 'rpc_error',
    'params': [
    {
      'name': 'error_code',
      'type': 'int' },

    {
      'name': 'error_message',
      'type': 'string' }],


    'type': 'RpcError' },

  {
    'id': '1579864942',
    'predicate': 'rpc_answer_unknown',
    'params': [],


    'type': 'RpcDropAnswer' },

  {
    'id': '-847714938',
    'predicate': 'rpc_answer_dropped_running',
    'params': [],


    'type': 'RpcDropAnswer' },

  {
    'id': '-1539647305',
    'predicate': 'rpc_answer_dropped',
    'params': [
    {
      'name': 'msg_id',
      'type': 'long' },

    {
      'name': 'seq_no',
      'type': 'int' },

    {
      'name': 'bytes',
      'type': 'int' }],


    'type': 'RpcDropAnswer' },

  {
    'id': '155834844',
    'predicate': 'future_salt',
    'params': [
    {
      'name': 'valid_since',
      'type': 'int' },

    {
      'name': 'valid_until',
      'type': 'int' },

    {
      'name': 'salt',
      'type': 'long' }],


    'type': 'FutureSalt' },

  {
    'id': '-1370486635',
    'predicate': 'future_salts',
    'params': [
    {
      'name': 'req_msg_id',
      'type': 'long' },

    {
      'name': 'now',
      'type': 'int' },

    {
      'name': 'salts',
      'type': 'vector<future_salt>' }],


    'type': 'FutureSalts' },

  {
    'id': '880243653',
    'predicate': 'pong',
    'params': [
    {
      'name': 'msg_id',
      'type': 'long' },

    {
      'name': 'ping_id',
      'type': 'long' }],


    'type': 'Pong' },

  {
    'id': '-501201412',
    'predicate': 'destroy_session_ok',
    'params': [
    {
      'name': 'session_id',
      'type': 'long' }],


    'type': 'DestroySessionRes' },

  {
    'id': '1658015945',
    'predicate': 'destroy_session_none',
    'params': [
    {
      'name': 'session_id',
      'type': 'long' }],


    'type': 'DestroySessionRes' },

  {
    'id': '-1631450872',
    'predicate': 'new_session_created',
    'params': [
    {
      'name': 'first_msg_id',
      'type': 'long' },

    {
      'name': 'unique_id',
      'type': 'long' },

    {
      'name': 'server_salt',
      'type': 'long' }],


    'type': 'NewSession' },

  {
    'id': '1945237724',
    'predicate': 'msg_container',
    'params': [
    {
      'name': 'messages',
      'type': 'vector<%Message>' }],


    'type': 'MessageContainer' },

  {
    'id': '1538843921',
    'predicate': 'message',
    'params': [
    {
      'name': 'msg_id',
      'type': 'long' },

    {
      'name': 'seqno',
      'type': 'int' },

    {
      'name': 'bytes',
      'type': 'int' },

    {
      'name': 'body',
      'type': 'Object' }],


    'type': 'Message' },

  {
    'id': '-530561358',
    'predicate': 'msg_copy',
    'params': [
    {
      'name': 'orig_message',
      'type': 'Message' }],


    'type': 'MessageCopy' },

  {
    'id': '812830625',
    'predicate': 'gzip_packed',
    'params': [
    {
      'name': 'packed_data',
      'type': 'bytes' }],


    'type': 'Object' },

  {
    'id': '1658238041',
    'predicate': 'msgs_ack',
    'params': [
    {
      'name': 'msg_ids',
      'type': 'Vector<long>' }],


    'type': 'MsgsAck' },

  {
    'id': '-1477445615',
    'predicate': 'bad_msg_notification',
    'params': [
    {
      'name': 'bad_msg_id',
      'type': 'long' },

    {
      'name': 'bad_msg_seqno',
      'type': 'int' },

    {
      'name': 'error_code',
      'type': 'int' }],


    'type': 'BadMsgNotification' },

  {
    'id': '-307542917',
    'predicate': 'bad_server_salt',
    'params': [
    {
      'name': 'bad_msg_id',
      'type': 'long' },

    {
      'name': 'bad_msg_seqno',
      'type': 'int' },

    {
      'name': 'error_code',
      'type': 'int' },

    {
      'name': 'new_server_salt',
      'type': 'long' }],


    'type': 'BadMsgNotification' },

  {
    'id': '2105940488',
    'predicate': 'msg_resend_req',
    'params': [
    {
      'name': 'msg_ids',
      'type': 'Vector<long>' }],


    'type': 'MsgResendReq' },

  {
    'id': '-630588590',
    'predicate': 'msgs_state_req',
    'params': [
    {
      'name': 'msg_ids',
      'type': 'Vector<long>' }],


    'type': 'MsgsStateReq' },

  {
    'id': '81704317',
    'predicate': 'msgs_state_info',
    'params': [
    {
      'name': 'req_msg_id',
      'type': 'long' },

    {
      'name': 'info',
      'type': 'bytes' }],


    'type': 'MsgsStateInfo' },

  {
    'id': '-1933520591',
    'predicate': 'msgs_all_info',
    'params': [
    {
      'name': 'msg_ids',
      'type': 'Vector<long>' },

    {
      'name': 'info',
      'type': 'bytes' }],


    'type': 'MsgsAllInfo' },

  {
    'id': '661470918',
    'predicate': 'msg_detailed_info',
    'params': [
    {
      'name': 'msg_id',
      'type': 'long' },

    {
      'name': 'answer_msg_id',
      'type': 'long' },

    {
      'name': 'bytes',
      'type': 'int' },

    {
      'name': 'status',
      'type': 'int' }],


    'type': 'MsgDetailedInfo' },

  {
    'id': '-2137147681',
    'predicate': 'msg_new_detailed_info',
    'params': [
    {
      'name': 'answer_msg_id',
      'type': 'long' },

    {
      'name': 'bytes',
      'type': 'int' },

    {
      'name': 'status',
      'type': 'int' }],


    'type': 'MsgDetailedInfo' }],


  'methods': [
  {
    'id': '1615239032',
    'method': 'req_pq',
    'params': [
    {
      'name': 'nonce',
      'type': 'int128' }],


    'type': 'ResPQ' },

  {
    'id': '-686627650',
    'method': 'req_DH_params',
    'params': [
    {
      'name': 'nonce',
      'type': 'int128' },

    {
      'name': 'server_nonce',
      'type': 'int128' },

    {
      'name': 'p',
      'type': 'bytes' },

    {
      'name': 'q',
      'type': 'bytes' },

    {
      'name': 'public_key_fingerprint',
      'type': 'long' },

    {
      'name': 'encrypted_data',
      'type': 'bytes' }],


    'type': 'Server_DH_Params' },

  {
    'id': '-184262881',
    'method': 'set_client_DH_params',
    'params': [
    {
      'name': 'nonce',
      'type': 'int128' },

    {
      'name': 'server_nonce',
      'type': 'int128' },

    {
      'name': 'encrypted_data',
      'type': 'bytes' }],


    'type': 'Set_client_DH_params_answer' },

  {
    'id': '1491380032',
    'method': 'rpc_drop_answer',
    'params': [
    {
      'name': 'req_msg_id',
      'type': 'long' }],


    'type': 'RpcDropAnswer' },

  {
    'id': '-1188971260',
    'method': 'get_future_salts',
    'params': [
    {
      'name': 'num',
      'type': 'int' }],


    'type': 'FutureSalts' },

  {
    'id': '2059302892',
    'method': 'ping',
    'params': [
    {
      'name': 'ping_id',
      'type': 'long' }],


    'type': 'Pong' },

  {
    'id': '-213746804',
    'method': 'ping_delay_disconnect',
    'params': [
    {
      'name': 'ping_id',
      'type': 'long' },

    {
      'name': 'disconnect_delay',
      'type': 'int' }],


    'type': 'Pong' },

  {
    'id': '-414113498',
    'method': 'destroy_session',
    'params': [
    {
      'name': 'session_id',
      'type': 'long' }],


    'type': 'DestroySessionRes' },

  {
    'id': '-1835453025',
    'method': 'http_wait',
    'params': [
    {
      'name': 'max_delay',
      'type': 'int' },

    {
      'name': 'wait_after',
      'type': 'int' },

    {
      'name': 'max_wait',
      'type': 'int' }],


    'type': 'HttpWait' }]




  // From https://github.com/stephenmathieson/node-tlds/blob/master/index.js
  // Config.TLD = ['abogado', 'ac', 'academy', 'accountants', 'active', 'actor', 'ad', 'adult', 'ae', 'aero', 'af', 'ag', 'agency', 'ai', 'airforce', 'al', 'allfinanz', 'alsace', 'am', 'amsterdam', 'an', 'android', 'ao', 'apartments', 'aq', 'aquarelle', 'ar', 'archi', 'army', 'arpa', 'as', 'asia', 'associates', 'at', 'attorney', 'au', 'auction', 'audio', 'autos', 'aw', 'ax', 'axa', 'az', 'ba', 'band', 'bank', 'bar', 'barclaycard', 'barclays', 'bargains', 'bayern', 'bb', 'bd', 'be', 'beer', 'berlin', 'best', 'bf', 'bg', 'bh', 'bi', 'bid', 'bike', 'bingo', 'bio', 'biz', 'bj', 'black', 'blackfriday', 'bloomberg', 'blue', 'bm', 'bmw', 'bn', 'bnpparibas', 'bo', 'boo', 'boutique', 'br', 'brussels', 'bs', 'bt', 'budapest', 'build', 'builders', 'business', 'buzz', 'bv', 'bw', 'by', 'bz', 'bzh', 'ca', 'cab', 'cal', 'camera', 'camp', 'cancerresearch', 'canon', 'capetown', 'capital', 'caravan', 'cards', 'care', 'career', 'careers', 'cartier', 'casa', 'cash', 'cat', 'catering', 'cc', 'cd', 'center', 'ceo', 'cern', 'cf', 'cg', 'ch', 'channel', 'chat', 'cheap', 'christmas', 'chrome', 'church', 'ci', 'citic', 'city', 'ck', 'cl', 'claims', 'cleaning', 'click', 'clinic', 'clothing', 'club', 'cm', 'cn', 'co', 'coach', 'codes', 'coffee', 'college', 'cologne', 'com', 'community', 'company', 'computer', 'condos', 'construction', 'consulting', 'contractors', 'cooking', 'cool', 'coop', 'country', 'cr', 'credit', 'creditcard', 'cricket', 'crs', 'cruises', 'cu', 'cuisinella', 'cv', 'cw', 'cx', 'cy', 'cymru', 'cz', 'dabur', 'dad', 'dance', 'dating', 'day', 'dclk', 'de', 'deals', 'degree', 'delivery', 'democrat', 'dental', 'dentist', 'desi', 'design', 'dev', 'diamonds', 'diet', 'digital', 'direct', 'directory', 'discount', 'dj', 'dk', 'dm', 'dnp', 'do', 'docs', 'domains', 'doosan', 'durban', 'dvag', 'dz', 'eat', 'ec', 'edu', 'education', 'ee', 'eg', 'email', 'emerck', 'energy', 'engineer', 'engineering', 'enterprises', 'equipment', 'er', 'es', 'esq', 'estate', 'et', 'eu', 'eurovision', 'eus', 'events', 'everbank', 'exchange', 'expert', 'exposed', 'fail', 'farm', 'fashion', 'feedback', 'fi', 'finance', 'financial', 'firmdale', 'fish', 'fishing', 'fit', 'fitness', 'fj', 'fk', 'flights', 'florist', 'flowers', 'flsmidth', 'fly', 'fm', 'fo', 'foo', 'forsale', 'foundation', 'fr', 'frl', 'frogans', 'fund', 'furniture', 'futbol', 'ga', 'gal', 'gallery', 'garden', 'gb', 'gbiz', 'gd', 'ge', 'gent', 'gf', 'gg', 'ggee', 'gh', 'gi', 'gift', 'gifts', 'gives', 'gl', 'glass', 'gle', 'global', 'globo', 'gm', 'gmail', 'gmo', 'gmx', 'gn', 'goog', 'google', 'gop', 'gov', 'gp', 'gq', 'gr', 'graphics', 'gratis', 'green', 'gripe', 'gs', 'gt', 'gu', 'guide', 'guitars', 'guru', 'gw', 'gy', 'hamburg', 'hangout', 'haus', 'healthcare', 'help', 'here', 'hermes', 'hiphop', 'hiv', 'hk', 'hm', 'hn', 'holdings', 'holiday', 'homes', 'horse', 'host', 'hosting', 'house', 'how', 'hr', 'ht', 'hu', 'ibm', 'id', 'ie', 'ifm', 'il', 'im', 'immo', 'immobilien', 'in', 'industries', 'info', 'ing', 'ink', 'institute', 'insure', 'int', 'international', 'investments', 'io', 'iq', 'ir', 'irish', 'is', 'it', 'iwc', 'jcb', 'je', 'jetzt', 'jm', 'jo', 'jobs', 'joburg', 'jp', 'juegos', 'kaufen', 'kddi', 'ke', 'kg', 'kh', 'ki', 'kim', 'kitchen', 'kiwi', 'km', 'kn', 'koeln', 'kp', 'kr', 'krd', 'kred', 'kw', 'ky', 'kyoto', 'kz', 'la', 'lacaixa', 'land', 'lat', 'latrobe', 'lawyer', 'lb', 'lc', 'lds', 'lease', 'legal', 'lgbt', 'li', 'lidl', 'life', 'lighting', 'limited', 'limo', 'link', 'lk', 'loans', 'london', 'lotte', 'lotto', 'lr', 'ls', 'lt', 'ltda', 'lu', 'luxe', 'luxury', 'lv', 'ly', 'ma', 'madrid', 'maison', 'management', 'mango', 'market', 'marketing', 'marriott', 'mc', 'md', 'me', 'media', 'meet', 'melbourne', 'meme', 'memorial', 'menu', 'mg', 'mh', 'miami', 'mil', 'mini', 'mk', 'ml', 'mm', 'mn', 'mo', 'mobi', 'moda', 'moe', 'monash', 'money', 'mormon', 'mortgage', 'moscow', 'motorcycles', 'mov', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'museum', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nagoya', 'name', 'navy', 'nc', 'ne', 'net', 'network', 'neustar', 'new', 'nexus', 'nf', 'ng', 'ngo', 'nhk', 'ni', 'nico', 'ninja', 'nl', 'no', 'np', 'nr', 'nra', 'nrw', 'ntt', 'nu', 'nyc', 'nz', 'okinawa', 'om', 'one', 'ong', 'onl', 'ooo', 'org', 'organic', 'osaka', 'otsuka', 'ovh', 'pa', 'paris', 'partners', 'parts', 'party', 'pe', 'pf', 'pg', 'ph', 'pharmacy', 'photo', 'photography', 'photos', 'physio', 'pics', 'pictures', 'pink', 'pizza', 'pk', 'pl', 'place', 'plumbing', 'pm', 'pn', 'pohl', 'poker', 'porn', 'post', 'pr', 'praxi', 'press', 'pro', 'prod', 'productions', 'prof', 'properties', 'property', 'ps', 'pt', 'pub', 'pw', 'py', 'qa', 'qpon', 'quebec', 're', 'realtor', 'recipes', 'red', 'rehab', 'reise', 'reisen', 'reit', 'ren', 'rentals', 'repair', 'report', 'republican', 'rest', 'restaurant', 'reviews', 'rich', 'rio', 'rip', 'ro', 'rocks', 'rodeo', 'rs', 'rsvp', 'ru', 'ruhr', 'rw', 'ryukyu', 'sa', 'saarland', 'sale', 'samsung', 'sarl', 'saxo', 'sb', 'sc', 'sca', 'scb', 'schmidt', 'schule', 'schwarz', 'science', 'scot', 'sd', 'se', 'services', 'sew', 'sexy', 'sg', 'sh', 'shiksha', 'shoes', 'shriram', 'si', 'singles', 'sj', 'sk', 'sky', 'sl', 'sm', 'sn', 'so', 'social', 'software', 'sohu', 'solar', 'solutions', 'soy', 'space', 'spiegel', 'sr', 'st', 'style', 'su', 'supplies', 'supply', 'support', 'surf', 'surgery', 'suzuki', 'sv', 'sx', 'sy', 'sydney', 'systems', 'sz', 'taipei', 'tatar', 'tattoo', 'tax', 'tc', 'td', 'technology', 'tel', 'temasek', 'tennis', 'tf', 'tg', 'th', 'tienda', 'tips', 'tires', 'tirol', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'today', 'tokyo', 'tools', 'top', 'toshiba', 'town', 'toys', 'tp', 'tr', 'trade', 'training', 'travel', 'trust', 'tt', 'tui', 'tv', 'tw', 'tz', 'ua', 'ug', 'uk', 'university', 'uno', 'uol', 'us', 'uy', 'uz', 'va', 'vacations', 'vc', 've', 'vegas', 'ventures', 'versicherung', 'vet', 'vg', 'vi', 'viajes', 'video', 'villas', 'vision', 'vlaanderen', 'vn', 'vodka', 'vote', 'voting', 'voto', 'voyage', 'vu', 'wales', 'wang', 'watch', 'webcam', 'website', 'wed', 'wedding', 'wf', 'whoswho', 'wien', 'wiki', 'williamhill', 'wme', 'work', 'works', 'world', 'ws', 'wtc', 'wtf', '佛山', '集团', '在线', '한국', 'ভারত', '八卦', 'موقع', '公益', '公司', '移动', '我爱你', 'москва', 'қаз', 'онлайн', 'сайт', 'срб', '淡马锡', 'орг', '삼성', 'சிங்கப்பூர்', '商标', '商店', '商城', 'дети', 'мкд', '中文网', '中信', '中国', '中國', '谷歌', 'భారత్', 'ලංකා', 'ભારત', 'भारत', '网店', 'संगठन', '网络', 'укр', '香港', '台湾', '台灣', '手机', 'мон', 'الجزائر', 'عمان', 'ایران', 'امارات', 'بازار', 'الاردن', 'بھارت', 'المغرب', 'السعودية', 'مليسيا', 'شبكة', 'გე', '机构', '组织机构', 'ไทย', 'سورية', 'рус', 'рф', 'تونس', 'みんな', 'グーグル', '世界', 'ਭਾਰਤ', '网址', '游戏', 'vermögensberater', 'vermögensberatung', '企业', 'مصر', 'قطر', '广东', 'இலங்கை', 'இந்தியா', '新加坡', 'فلسطين', '政务', 'xxx', 'xyz', 'yachts', 'yandex', 'ye', 'yoga', 'yokohama', 'youtube', 'yt', 'za', 'zip', 'zm', 'zone', 'zuerich', 'zw']

  // 105

  // 108

  // 109
};Config.Schema.API = __webpack_require__(22);
Config.Schema.API.layer = 112;exports.default =

Config;module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.setState = exports.getState = exports.initState = exports.flushState = undefined;var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _config = __webpack_require__(3);var _config2 = _interopRequireDefault(_config);
var _Services = __webpack_require__(1);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var defaultDCs = {
    test: [
    {
        "_": "dcOption",
        "pFlags": {},
        "flags": 0,
        "id": 1,
        "ip_address": "149.154.175.10",
        "port": 80 },

    {
        "_": "dcOption",
        "pFlags": {},
        "flags": 0,
        "id": 2,
        "ip_address": "149.154.167.40",
        "port": 80 },

    {
        "_": "dcOption",
        "pFlags": {},
        "flags": 0,
        "id": 2,
        "ip_address": "149.154.175.117",
        "port": 80 }],


    main: [
    {
        "_": "dcOption",
        "pFlags": {},
        "flags": 0,
        "id": 1,
        "ip_address": "149.154.175.50",
        "port": 443 },

    {
        "_": "dcOption",
        "pFlags": {
            "ipv6": true },

        "flags": 1,
        "id": 1,
        "ip_address": "2001:0b28:f23d:f001:0000:0000:0000:000a",
        "port": 443 },

    {
        "_": "dcOption",
        "pFlags": {},
        "flags": 0,
        "id": 2,
        "ip_address": "149.154.167.51",
        "port": 443 },

    {
        "_": "dcOption",
        "pFlags": {
            "static": true },

        "flags": 16,
        "id": 2,
        "ip_address": "149.154.167.51",
        "port": 443 },

    {
        "_": "dcOption",
        "pFlags": {
            "ipv6": true },

        "flags": 1,
        "id": 2,
        "ip_address": "2001:067c:04e8:f002:0000:0000:0000:000a",
        "port": 443 },

    {
        "_": "dcOption",
        "pFlags": {},
        "flags": 0,
        "id": 3,
        "ip_address": "149.154.175.100",
        "port": 443 },

    {
        "_": "dcOption",
        "pFlags": {
            "ipv6": true },

        "flags": 1,
        "id": 3,
        "ip_address": "2001:0b28:f23d:f003:0000:0000:0000:000a",
        "port": 443 },

    {
        "_": "dcOption",
        "pFlags": {},
        "flags": 0,
        "id": 4,
        "ip_address": "149.154.167.92",
        "port": 443 },

    {
        "_": "dcOption",
        "pFlags": {
            "ipv6": true },

        "flags": 1,
        "id": 4,
        "ip_address": "2001:067c:04e8:f004:0000:0000:0000:000a",
        "port": 443 },

    {
        "_": "dcOption",
        "pFlags": {
            "media_only": true },

        "flags": 2,
        "id": 4,
        "ip_address": "149.154.165.120",
        "port": 443 },

    {
        "_": "dcOption",
        "pFlags": {},
        "flags": 0,
        "id": 5,
        "ip_address": "91.108.56.170",
        "port": 443 },

    {
        "_": "dcOption",
        "pFlags": {
            "ipv6": true },

        "flags": 1,
        "id": 5,
        "ip_address": "2001:0b28:f23f:f005:0000:0000:0000:000a",
        "port": 443 }] };




var defaultState = {
    current_dc_id: 2,
    prev_dc_id: undefined,
    dc_options: _config2.default.Modes.test ? defaultDCs.test : defaultDCs.main,
    networkers: [] };



var state = _extends({}, defaultState);

var dump = undefined;
var load = undefined;

var flushState = exports.flushState = function flushState() {
    state = _extends({}, defaultState);
    setState();
};

var initState = exports.initState = function initState(options, dumpState, loadState) {return new Promise(function (resolve, reject) {
        console.error(options);

        // console.warn('Set config hash', 1);
        var persistState = options.persistState || false;
        // console.warn('Set config hash', 1);
        // let test = options.test || false;
        // let ssl = options.ssl || false;

        // console.warn('Set config hash', 1);
        _config2.default.App.id = options.appId;
        _config2.default.App.hash = options.appHash;

        // console.warn('Set config hash', configHash);
        _config2.default.Modes.websockets = options.websockets || false;
        _config2.default.Modes.test = options.test || false;
        _config2.default.Modes.ssl = options.ssl || false;

        var configHash = '' + _config2.default.App.id + '_' + _config2.default.App.hash + '_' + _config2.default.Modes.websockets + _config2.default.Modes.test + _config2.default.Modes.ssl;
        // console.warn('Set config hash', configHash);

        defaultState.configHash = configHash;
        defaultState.dc_options = _config2.default.Modes.test ? defaultDCs.test : defaultDCs.main;
        defaultState.isTest = _config2.default.Modes.test;

        dump = dumpState;
        load = loadState;
        // console.warn('Set config hash', configHash);

        if (!persistState) {
            flushState();
            resolve();

            return;
        }

        //LogService.logInfo(`[state] init`)

        if (load) {
            load().
            then(function (stateContents) {
                try {
                    state = JSON.parse(stateContents);

                    if (state.configHash !== defaultState.configHash) {
                        throw new Error('Different config hash in stored state. Need to flush it...');
                    }
                    console.log(state);
                } catch (e) {
                    console.error(e);
                    flushState();
                }
                resolve();
            }).
            catch(function (err) {
                //LogService.logError(`[state] ${new ErrorResponse(err)}`)

                reject();
            });
            return;
        }

        resolve();
    });};

var getState = exports.getState = function getState() {
    return state;
};
var setState = exports.setState = function setState(newState) {
    return new Promise(function (res, rej) {
        state = _extends({}, state, newState);
        if (dump) {
            dump(JSON.stringify(state)).
            then(function () {
                res();
            }).
            catch(function () {
                res();
            });
        } else {
            res();
        }
    });
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.MtpProxy = exports.MtpNetworker = exports.MtpAuthorizer = exports.MtpTimeManager = exports.MtpRsaKeysManager = exports.MtpDcConfigurator = undefined;var _MtpDcConfigurator = __webpack_require__(21);var MtpDcConfigurator = _interopRequireWildcard(_MtpDcConfigurator);
var _MtpRsaKeysManager = __webpack_require__(25);var MtpRsaKeysManager = _interopRequireWildcard(_MtpRsaKeysManager);
var _MtpTimeManager = __webpack_require__(43);var MtpTimeManager = _interopRequireWildcard(_MtpTimeManager);
var _MtpAuthorizer = __webpack_require__(18);var MtpAuthorizer = _interopRequireWildcard(_MtpAuthorizer);
var _MtpNetworker = __webpack_require__(19);var MtpNetworker = _interopRequireWildcard(_MtpNetworker);
var _MtpProxy = __webpack_require__(45);var MtpProxy = _interopRequireWildcard(_MtpProxy);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}exports.


MtpDcConfigurator = MtpDcConfigurator;exports.
MtpRsaKeysManager = MtpRsaKeysManager;exports.
MtpTimeManager = MtpTimeManager;exports.
MtpAuthorizer = MtpAuthorizer;exports.
MtpNetworker = MtpNetworker;exports.
MtpProxy = MtpProxy;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.TLDeserialization = exports.TLSerialization = undefined;var _TLSerialization = __webpack_require__(26);exports.


TLSerialization = _TLSerialization.TLSerialization;exports.
TLDeserialization = _TLSerialization.TLDeserialization;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.










dT = dT;exports.



tsNow = tsNow;exports.




md5 = md5;exports.



bigint = bigint;exports.



bigStringInt = bigStringInt;exports.



dHexDump = dHexDump;exports.















bytesToHex = bytesToHex;exports.








bytesFromHex = bytesFromHex;exports.

















bytesToBase64 = bytesToBase64;exports.




















uint6ToBase64 = uint6ToBase64;exports.













base64ToBlob = base64ToBlob;exports.




















dataUrlToBlob = dataUrlToBlob;exports.







blobConstruct = blobConstruct;exports.














blobSafeMimeType = blobSafeMimeType;exports.


















bytesCmp = bytesCmp;exports.













bytesXor = bytesXor;exports.










bytesToWords = bytesToWords;exports.













bytesFromWords = bytesFromWords;exports.











bytesFromBigInt = bytesFromBigInt;exports.





















bytesFromLeemonBigInt = bytesFromLeemonBigInt;exports.




bytesToArrayBuffer = bytesToArrayBuffer;exports.



convertToArrayBuffer = convertToArrayBuffer;exports.











convertToUint8Array = convertToUint8Array;exports.






convertToByteArray = convertToByteArray;exports.











bytesFromArrayBuffer = bytesFromArrayBuffer;exports.











bufferConcat = bufferConcat;exports.









longToInts = longToInts;exports.





longToBytes = longToBytes;exports.



longFromInts = longFromInts;exports.



intToUint = intToUint;exports.







uintToInt = uintToInt;exports.






sha1HashSync = sha1HashSync;exports.





sha1BytesSync = sha1BytesSync;exports.



sha256HashSync = sha256HashSync;exports.





rsaEncrypt = rsaEncrypt;exports.









addPadding = addPadding;exports.
























aesEncryptSync = aesEncryptSync;exports.















aesDecryptSync = aesDecryptSync;exports.












toArrayBuffer = toArrayBuffer;exports.








gzipUncompress = gzipUncompress;exports.




inflate = inflate;exports.



nextRandomInt = nextRandomInt;exports.



pqPrimeFactorization = pqPrimeFactorization;exports.
























pqPrimeBigInteger = pqPrimeBigInteger;exports.
























































gcdLong = gcdLong;exports.
















pqPrimeLong = pqPrimeLong;exports.
























































pqPrimeLeemon = pqPrimeLeemon;exports.











































































bytesModPow = bytesModPow;var _rusha = __webpack_require__(32);var _rusha2 = _interopRequireDefault(_rusha);var _bigNumbers = __webpack_require__(11);var _leemonBigInt = __webpack_require__(8);var _cryptoJs = __webpack_require__(12);var _cryptoJs2 = _interopRequireDefault(_cryptoJs);var _aesIGEMode = __webpack_require__(33);var IGE = _interopRequireWildcard(_aesIGEMode);var _Services = __webpack_require__(1);var _pako = __webpack_require__(34);var _pako2 = _interopRequireDefault(_pako);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _logTimer = new Date().getTime();function dT() {return '[' + ((new Date().getTime() - _logTimer) / 1000).toFixed(3) + ']';}function tsNow(seconds) {var t = +new Date();return seconds ? Math.floor(t / 1000) : t;}function md5(data) {return _cryptoJs2.default.MD5(bytesToWords(data)).toString();}function bigint(num) {return new _bigNumbers.BigInteger(num.toString(16), 16);}function bigStringInt(strNum) {return new _bigNumbers.BigInteger(strNum, 10);}function dHexDump(bytes) {var arr = [];for (var i = 0; i < bytes.length; i++) {if (i && !(i % 2)) {if (!(i % 16)) {arr.push('\n');} else if (!(i % 4)) {arr.push('  ');} else {arr.push(' ');}}arr.push((bytes[i] < 16 ? '0' : '') + bytes[i].toString(16));}}function bytesToHex(bytes) {bytes = bytes || [];var arr = [];for (var i = 0; i < bytes.length; i++) {arr.push((bytes[i] < 16 ? '0' : '') + (bytes[i] || 0).toString(16));}return arr.join('');}function bytesFromHex(hexString) {var len = hexString.length,i;var start = 0;var bytes = [];if (hexString.length % 2) {bytes.push(parseInt(hexString.charAt(0), 16));start++;}for (i = start; i < len; i += 2) {bytes.push(parseInt(hexString.substr(i, 2), 16));}return bytes;}function bytesToBase64(bytes) {var mod3;var result = '';for (var nLen = bytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {mod3 = nIdx % 3;nUint24 |= bytes[nIdx] << (16 >>> mod3 & 24);if (mod3 === 2 || nLen - nIdx === 1) {result += String.fromCharCode(uint6ToBase64(nUint24 >>> 18 & 63), uint6ToBase64(nUint24 >>> 12 & 63), uint6ToBase64(nUint24 >>> 6 & 63), uint6ToBase64(nUint24 & 63));nUint24 = 0;}}return result.replace(/A(?=A$|$)/g, '=');}function uint6ToBase64(nUint6) {return nUint6 < 26 ? nUint6 + 65 : nUint6 < 52 ? nUint6 + 71 : nUint6 < 62 ? nUint6 - 4 : nUint6 === 62 ? 43 : nUint6 === 63 ? 47 : 65;}function base64ToBlob(base64str, mimeType) {var sliceSize = 1024;var byteCharacters = atob(base64str);var bytesLength = byteCharacters.length;var slicesCount = Math.ceil(bytesLength / sliceSize);var byteArrays = new Array(slicesCount);for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {var begin = sliceIndex * sliceSize;var end = Math.min(begin + sliceSize, bytesLength);var bytes = new Array(end - begin);for (var offset = begin, i = 0; offset < end; ++i, ++offset) {bytes[i] = byteCharacters[offset].charCodeAt(0);}byteArrays[sliceIndex] = new Uint8Array(bytes);}return blobConstruct(byteArrays, mimeType);}function dataUrlToBlob(url) {var urlParts = url.split(',');var base64str = urlParts[1];var mimeType = urlParts[0].split(':')[1].split(';')[0];var blob = base64ToBlob(base64str, mimeType);return blob;}function blobConstruct(blobParts, mimeType) {var blob;var safeMimeType = blobSafeMimeType(mimeType);try {blob = new Blob(blobParts, { type: safeMimeType });} catch (e) {var bb = new BlobBuilder();angular.forEach(blobParts, function (blobPart) {bb.append(blobPart);});blob = bb.getBlob(safeMimeType);}return blob;}function blobSafeMimeType(mimeType) {if (['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'video/mp4', 'video/webm', 'video/quicktime', 'audio/ogg', 'audio/mpeg', 'audio/mp4'].indexOf(mimeType) == -1) {return 'application/octet-stream';}return mimeType;}function bytesCmp(bytes1, bytes2) {var len = bytes1.length;if (len != bytes2.length) {return false;}for (var i = 0; i < len; i++) {if (bytes1[i] != bytes2[i]) {return false;}}return true;}function bytesXor(bytes1, bytes2) {var len = bytes1.length;var bytes = [];for (var i = 0; i < len; ++i) {bytes[i] = bytes1[i] ^ bytes2[i];}return bytes;}function bytesToWords(bytes) {if (bytes instanceof ArrayBuffer) {bytes = new Uint8Array(bytes);}var len = bytes.length;var words = [];var i;for (i = 0; i < len; i++) {words[i >>> 2] |= bytes[i] << 24 - i % 4 * 8;}return new _cryptoJs2.default.lib.WordArray.init(words, len);}function bytesFromWords(wordArray) {var words = wordArray.words;var sigBytes = wordArray.sigBytes;var bytes = [];for (var i = 0; i < sigBytes; i++) {bytes.push(words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff);}return bytes;}function bytesFromBigInt(bigInt, len) {var bytes = bigInt.toByteArray();if (len && bytes.length < len) {var padding = [];for (var i = 0, needPadding = len - bytes.length; i < needPadding; i++) {padding[i] = 0;}if (bytes instanceof ArrayBuffer) {bytes = bufferConcat(padding, bytes);} else {bytes = padding.concat(bytes);}} else {while (!bytes[0] && (!len || bytes.length > len)) {bytes = bytes.slice(1);}}return bytes;}function bytesFromLeemonBigInt(bigInt, len) {var str = (0, _leemonBigInt.bigInt2str)(bigInt, 16);return bytesFromHex(str);}function bytesToArrayBuffer(b) {return new Uint8Array(b).buffer;}function convertToArrayBuffer(bytes) {// Be careful with converting subarrays!!
    if (bytes instanceof ArrayBuffer) {return bytes;}if (bytes.buffer !== undefined && bytes.buffer.byteLength == bytes.length * bytes.BYTES_PER_ELEMENT) {return bytes.buffer;}return bytesToArrayBuffer(bytes);}function convertToUint8Array(bytes) {if (bytes.buffer !== undefined) {return bytes;}return new Uint8Array(bytes);}function convertToByteArray(bytes) {if (Array.isArray(bytes)) {return bytes;}bytes = convertToUint8Array(bytes);var newBytes = [];for (var i = 0, len = bytes.length; i < len; i++) {newBytes.push(bytes[i]);}return newBytes;}function bytesFromArrayBuffer(buffer) {var len = buffer.byteLength;var byteView = new Uint8Array(buffer);var bytes = [];for (var i = 0; i < len; ++i) {bytes[i] = byteView[i];}return bytes;}function bufferConcat(buffer1, buffer2) {var l1 = buffer1.byteLength || buffer1.length;var l2 = buffer2.byteLength || buffer2.length;var tmp = new Uint8Array(l1 + l2);tmp.set(buffer1 instanceof ArrayBuffer ? new Uint8Array(buffer1) : buffer1, 0);tmp.set(buffer2 instanceof ArrayBuffer ? new Uint8Array(buffer2) : buffer2, l1);return tmp.buffer;}function longToInts(sLong) {var divRem = bigStringInt(sLong).divideAndRemainder(bigint(0x100000000));return [divRem[0].intValue(), divRem[1].intValue()];}function longToBytes(sLong) {return bytesFromWords({ words: longToInts(sLong), sigBytes: 8 }).reverse();}function longFromInts(high, low) {return bigint(high).shiftLeft(32).add(bigint(low)).toString(10);}function intToUint(val) {val = parseInt(val);if (val < 0) {val = val + 4294967296;}return val;}function uintToInt(val) {if (val > 2147483647) {val = val - 4294967296;}return val;}function sha1HashSync(bytes) {var rushaInstance = new _rusha2.default(1024 * 1024);var hashBytes = rushaInstance.rawDigest(bytes).buffer;return hashBytes;}function sha1BytesSync(bytes) {return bytesFromArrayBuffer(sha1HashSync(bytes));}function sha256HashSync(bytes) {var hashWords = _cryptoJs2.default.SHA256(bytesToWords(bytes));var hashBytes = bytesFromWords(hashWords);return hashBytes;}function rsaEncrypt(publicKey, bytes) {bytes = addPadding(bytes, 255);var N = new _bigNumbers.BigInteger(publicKey.modulus, 16);var E = new _bigNumbers.BigInteger(publicKey.exponent, 16);var X = new _bigNumbers.BigInteger(bytes);var encryptedBigInt = X.modPowInt(E, N),encryptedBytes = bytesFromBigInt(encryptedBigInt, 256);return encryptedBytes;}function addPadding(bytes, blockSize, zeroes) {blockSize = blockSize || 16;var len = bytes.byteLength || bytes.length;var needPadding = blockSize - len % blockSize;if (needPadding > 0 && needPadding < blockSize) {var padding = new Array(needPadding);if (zeroes) {for (var i = 0; i < needPadding; i++) {padding[i] = 0;}} else {new _bigNumbers.SecureRandom().nextBytes(padding);}if (bytes instanceof ArrayBuffer) {bytes = bufferConcat(bytes, padding);} else {bytes = bytes.concat(padding);}}return bytes;}function aesEncryptSync(bytes, keyBytes, ivBytes) {var len = bytes.byteLength || bytes.length;bytes = addPadding(bytes);var encryptedWords = _cryptoJs2.default.AES.encrypt(bytesToWords(bytes), bytesToWords(keyBytes), { iv: bytesToWords(ivBytes), padding: _cryptoJs2.default.pad.NoPadding, mode: _cryptoJs2.default.mode.IGE }).ciphertext;var encryptedBytes = bytesFromWords(encryptedWords);return encryptedBytes;}function aesDecryptSync(encryptedBytes, keyBytes, ivBytes) {var decryptedWords = _cryptoJs2.default.AES.decrypt({ ciphertext: bytesToWords(encryptedBytes) }, bytesToWords(keyBytes), { iv: bytesToWords(ivBytes), padding: _cryptoJs2.default.pad.NoPadding, mode: _cryptoJs2.default.mode.IGE });var bytes = bytesFromWords(decryptedWords);return bytes;}function toArrayBuffer(buf) {var ab = new ArrayBuffer(buf.length);var view = new Uint8Array(ab);for (var i = 0; i < buf.length; ++i) {view[i] = buf[i];}return ab;}function gzipUncompress(bytes) {var result = _pako2.default.inflate(bytes);return toArrayBuffer(result);}function inflate(bytes) {return _pako2.default.inflate(bytes, { to: 'string' });}function nextRandomInt(maxValue) {return Math.floor(Math.random() * maxValue);}function pqPrimeFactorization(pqBytes) {var what = new _bigNumbers.BigInteger(pqBytes);var result = false;try {result = pqPrimeLeemon((0, _leemonBigInt.str2bigInt)(what.toString(16), 16, Math.ceil(64 / (0, _leemonBigInt.getBpe)()) + 1));} catch (e) {// LogService.logError(`[utils] pqPrimeFactorization() pqPrimeLeemon() ${new ErrorResponse(e)}`)
    }if (result === false && what.bitLength() <= 64) {try {result = pqPrimeLong(goog.math.Long.fromString(what.toString(16), 16));} catch (e) {// LogService.logError(`[utils] pqPrimeFactorization() pqPrimeLong() ${new ErrorResponse(e)}`)
        }}if (result === false) {result = pqPrimeBigInteger(what);}return result;}function pqPrimeBigInteger(what) {var it = 0,g;for (var i = 0; i < 3; i++) {var q = (nextRandomInt(128) & 15) + 17;var x = bigint(nextRandomInt(1000000000) + 1);var y = x.clone();var lim = 1 << i + 18;for (var j = 1; j < lim; j++) {++it;var a = x.clone();var b = x.clone();var c = bigint(q);while (!b.equals(_bigNumbers.BigInteger.ZERO)) {if (!b.and(_bigNumbers.BigInteger.ONE).equals(_bigNumbers.BigInteger.ZERO)) {c = c.add(a);if (c.compareTo(what) > 0) {c = c.subtract(what);}}a = a.add(a);if (a.compareTo(what) > 0) {a = a.subtract(what);}b = b.shiftRight(1);}x = c.clone();var z = x.compareTo(y) < 0 ? y.subtract(x) : x.subtract(y);g = z.gcd(what);if (!g.equals(_bigNumbers.BigInteger.ONE)) {break;}if ((j & j - 1) == 0) {y = x.clone();}}if (g.compareTo(_bigNumbers.BigInteger.ONE) > 0) {break;}}var f = what.divide(g),P,Q;if (g.compareTo(f) > 0) {P = f;Q = g;} else {P = g;Q = f;}return [bytesFromBigInt(P), bytesFromBigInt(Q), it];}function gcdLong(a, b) {while (a.notEquals(goog.math.Long.ZERO) && b.notEquals(goog.math.Long.ZERO)) {while (b.and(goog.math.Long.ONE).equals(goog.math.Long.ZERO)) {b = b.shiftRight(1);}while (a.and(goog.math.Long.ONE).equals(goog.math.Long.ZERO)) {a = a.shiftRight(1);}if (a.compare(b) > 0) {a = a.subtract(b);} else {b = b.subtract(a);}}return b.equals(goog.math.Long.ZERO) ? a : b;}function pqPrimeLong(what) {var it = 0,g;for (var i = 0; i < 3; i++) {var q = goog.math.Long.fromInt((nextRandomInt(128) & 15) + 17);var x = goog.math.Long.fromInt(nextRandomInt(1000000000) + 1);var y = x;var lim = 1 << i + 18;for (var j = 1; j < lim; j++) {++it;var a = x;var b = x;var c = q;while (b.notEquals(goog.math.Long.ZERO)) {if (b.and(goog.math.Long.ONE).notEquals(goog.math.Long.ZERO)) {c = c.add(a);if (c.compare(what) > 0) {c = c.subtract(what);}}a = a.add(a);if (a.compare(what) > 0) {a = a.subtract(what);}b = b.shiftRight(1);}x = c;var z = x.compare(y) < 0 ? y.subtract(x) : x.subtract(y);g = gcdLong(z, what);if (g.notEquals(goog.math.Long.ONE)) {break;}if ((j & j - 1) == 0) {y = x;}}if (g.compare(goog.math.Long.ONE) > 0) {break;}}var f = what.div(g),P,Q;if (g.compare(f) > 0) {P = f;Q = g;} else {P = g;Q = f;}return [bytesFromHex(P.toString(16)), bytesFromHex(Q.toString(16)), it];}function pqPrimeLeemon(what) {var minBits = 64;var minLen = Math.ceil(minBits / (0, _leemonBigInt.getBpe)()) + 1;var it = 0;var i, q;var j, lim;var g, P;var Q;var a = new Array(minLen);var b = new Array(minLen);var c = new Array(minLen);var g = new Array(minLen);var z = new Array(minLen);var x = new Array(minLen);var y = new Array(minLen);for (i = 0; i < 3; i++) {q = (nextRandomInt(128) & 15) + 17;(0, _leemonBigInt.copyInt_)(x, nextRandomInt(1000000000) + 1);(0, _leemonBigInt.copy_)(y, x);lim = 1 << i + 18;for (j = 1; j < lim; j++) {++it;(0, _leemonBigInt.copy_)(a, x);(0, _leemonBigInt.copy_)(b, x);(0, _leemonBigInt.copyInt_)(c, q);while (!(0, _leemonBigInt.isZero)(b)) {if (b[0] & 1) {(0, _leemonBigInt.add_)(c, a);if ((0, _leemonBigInt.greater)(c, what)) {(0, _leemonBigInt.sub_)(c, what);}}(0, _leemonBigInt.add_)(a, a);if ((0, _leemonBigInt.greater)(a, what)) {(0, _leemonBigInt.sub_)(a, what);}(0, _leemonBigInt.rightShift_)(b, 1);}(0, _leemonBigInt.copy_)(x, c);if ((0, _leemonBigInt.greater)(x, y)) {(0, _leemonBigInt.copy_)(z, x);(0, _leemonBigInt.sub_)(z, y);} else {(0, _leemonBigInt.copy_)(z, y);(0, _leemonBigInt.sub_)(z, x);}(0, _leemonBigInt.eGCD_)(z, what, g, a, b);if (!(0, _leemonBigInt.equalsInt)(g, 1)) {break;}if ((j & j - 1) == 0) {(0, _leemonBigInt.copy_)(y, x);}}if ((0, _leemonBigInt.greater)(g, (0, _leemonBigInt.getOne)())) {break;}}(0, _leemonBigInt.divide_)(what, g, x, y);if ((0, _leemonBigInt.greater)(g, x)) {P = x;Q = g;} else {P = g;Q = x;}return [bytesFromLeemonBigInt(P), bytesFromLeemonBigInt(Q), it];}function bytesModPow(x, y, m) {try {var xBigInt = (0, _leemonBigInt.str2bigInt)(bytesToHex(x), 16);var yBigInt = (0, _leemonBigInt.str2bigInt)(bytesToHex(y), 16);
        var mBigInt = (0, _leemonBigInt.str2bigInt)(bytesToHex(m), 16);
        var resBigInt = (0, _leemonBigInt.powMod)(xBigInt, yBigInt, mBigInt);

        return bytesFromHex((0, _leemonBigInt.bigInt2str)(resBigInt, 16));
    } catch (e) {
        // LogService.logError(`[utils] bytesModPow() ${new ErrorResponse(e)}`)
    }

    return bytesFromBigInt(new _bigNumbers.BigInteger(x).modPow(new _bigNumbers.BigInteger(y), new _bigNumbers.BigInteger(m)), 256);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.






















































































































































































































































getBpe = getBpe;exports.



getOne = getOne;exports.




findPrimes = findPrimes;exports.






















millerRabinInt = millerRabinInt;exports.












millerRabin = millerRabin;exports.
















































bitSize = bitSize;exports.








expand = expand;exports.






randTruePrime = randTruePrime;exports.






randProbPrime = randProbPrime;exports.














randProbPrimeRounds = randProbPrimeRounds;exports.













































mod = mod;exports.






addInt = addInt;exports.






mult = mult;exports.






powMod = powMod;exports.






sub = sub;exports.






add = add;exports.






inverseMod = inverseMod;exports.







multMod = multMod;exports.







randTruePrime_ = randTruePrime_;exports.



































































































































randBigInt = randBigInt;exports.









randBigInt_ = randBigInt_;exports.













GCD = GCD;exports.









GCD_ = GCD_;exports.




















































inverseMod_ = inverseMod_;exports.






































































inverseModInt = inverseModInt;exports.















inverseModInt_ = inverseModInt_;exports.







eGCD_ = eGCD_;exports.




































































negative = negative;exports.







greaterShift = greaterShift;exports.















greater = greater;exports.
























divide_ = divide_;exports.



























































carry_ = carry_;exports.
















modInt = modInt;exports.










int2bigInt = int2bigInt;exports.












str2bigInt = str2bigInt;exports.


















































equalsInt = equalsInt;exports.











equals = equals;exports.


















isZero = isZero;exports.









bigInt2str = bigInt2str;exports.
























dup = dup;exports.







copy_ = copy_;exports.









copyInt_ = copyInt_;exports.









addInt_ = addInt_;exports.


















rightShift_ = rightShift_;exports.
















halve_ = halve_;exports.








leftShift_ = leftShift_;exports.



















multInt_ = multInt_;exports.


















divInt_ = divInt_;exports.











linComb_ = linComb_;exports.

















linCombShift_ = linCombShift_;exports.

















addShift_ = addShift_;exports.

















subShift_ = subShift_;exports.


















sub_ = sub_;exports.
















add_ = add_;exports.















mult_ = mult_;exports.











mod_ = mod_;exports.











multMod_ = multMod_;exports.












squareMod_ = squareMod_;exports.






















trim = trim;exports.









powMod_ = powMod_;exports.































































mont_ = mont_; ////////////////////////////////////////////////////////////////////////////////////////
// Big Integer Library v. 5.5
// Created 2000, last modified 2013
// Leemon Baird
// www.leemon.com
//
// Version history:
// v 5.5  17 Mar 2013
//   - two lines of a form like "if (x<0) x+=n" had the "if" changed to "while" to 
//     handle the case when x<-n. (Thanks to James Ansell for finding that bug)
// v 5.4  3 Oct 2009
//   - added "var i" to greaterShift() so i is not global. (Thanks to PŽter Szab— for finding that bug)
//
// v 5.3  21 Sep 2009
//   - added randProbPrime(k) for probable primes
//   - unrolled loop in mont_ (slightly faster)
//   - millerRabin now takes a bigInt parameter rather than an int
//
// v 5.2  15 Sep 2009
//   - fixed capitalization in call to int2bigInt in randBigInt
//     (thanks to Emili Evripidou, Reinhold Behringer, and Samuel Macaleese for finding that bug)
//
// v 5.1  8 Oct 2007 
//   - renamed inverseModInt_ to inverseModInt since it doesn't change its parameters
//   - added functions GCD and randBigInt, which call GCD_ and randBigInt_
//   - fixed a bug found by Rob Visser (see comment with his name below)
//   - improved comments
//
// This file is public domain.   You can use it for any purpose without restriction.
// I do not guarantee that it is correct, so use it at your own risk.  If you use 
// it for something interesting, I'd appreciate hearing about it.  If you find 
// any bugs or make any improvements, I'd appreciate hearing about those too.
// It would also be nice if my name and URL were left in the comments.  But none 
// of that is required.
//
// This code defines a bigInt library for arbitrary-precision integers.
// A bigInt is an array of integers storing the value in chunks of bpe bits, 
// little endian (buff[0] is the least significant word).
// Negative bigInts are stored two's complement.  Almost all the functions treat
// bigInts as nonnegative.  The few that view them as two's complement say so
// in their comments.  Some functions assume their parameters have at least one 
// leading zero element. Functions with an underscore at the end of the name put
// their answer into one of the arrays passed in, and have unpredictable behavior 
// in case of overflow, so the caller must make sure the arrays are big enough to 
// hold the answer.  But the average user should never have to call any of the 
// underscored functions.  Each important underscored export function has a wrapper export function 
// of the same name without the underscore that takes care of the details for you.  
// For each underscored export function where a parameter is modified, that same variable 
// must not be used as another argument too.  So, you cannot square x by doing 
// multMod_(x,x,n).  You must use squareMod_(x,n) instead, or do y=dup(x); multMod_(x,y,n).
// Or simply use the multMod(x,x,n) export function without the underscore, where
// such issues never arise, because non-underscored functions never change
// their parameters; they always allocate new memory for the answer that is returned.
//
// These functions are designed to avoid frequent dynamic memory allocation in the inner loop.
// For most functions, if it needs a BigInt as a local variable it will actually use
// a global, and will only allocate to it only when it's not the right size.  This ensures
// that when a export function is called repeatedly with same-sized parameters, it only allocates
// memory on the first call.
//
// Note that for cryptographic purposes, the calls to Math.random() must 
// be replaced with calls to a better pseudorandom number generator.
//
// In the following, "bigInt" means a bigInt with at least one leading zero element,
// and "integer" means a nonnegative integer less than radix.  In some cases, integer 
// can be negative.  Negative bigInts are 2s complement.
// 
// The following functions do not modify their inputs.
// Those returning a bigInt, string, or Array will dynamically allocate memory for that value.
// Those returning a boolean will return the integer 0 (false) or 1 (true).
// Those returning boolean or int will not allocate memory except possibly on the first 
// time they're called with a given parameter size.
// 
// bigInt  add(x,y)               //return (x+y) for bigInts x and y.  
// bigInt  addInt(x,n)            //return (x+n) where x is a bigInt and n is an integer.
// string  bigInt2str(x,base)     //return a string form of bigInt x in a given base, with 2 <= base <= 95
// int     bitSize(x)             //return how many bits long the bigInt x is, not counting leading zeros
// bigInt  dup(x)                 //return a copy of bigInt x
// boolean equals(x,y)            //is the bigInt x equal to the bigint y?
// boolean equalsInt(x,y)         //is bigint x equal to integer y?
// bigInt  expand(x,n)            //return a copy of x with at least n elements, adding leading zeros if needed
// Array   findPrimes(n)          //return array of all primes less than integer n
// bigInt  GCD(x,y)               //return greatest common divisor of bigInts x and y (each with same number of elements).
// boolean greater(x,y)           //is x>y?  (x and y are nonnegative bigInts)
// boolean greaterShift(x,y,shift)//is (x <<(shift*bpe)) > y?
// bigInt  int2bigInt(t,n,m)      //return a bigInt equal to integer t, with at least n bits and m array elements
// bigInt  inverseMod(x,n)        //return (x**(-1) mod n) for bigInts x and n.  If no inverse exists, it returns null
// int     inverseModInt(x,n)     //return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
// boolean isZero(x)              //is the bigInt x equal to zero?
// boolean millerRabin(x,b)       //does one round of Miller-Rabin base integer b say that bigInt x is possibly prime? (b is bigInt, 1<b<x)
// boolean millerRabinInt(x,b)    //does one round of Miller-Rabin base integer b say that bigInt x is possibly prime? (b is int,    1<b<x)
// bigInt  mod(x,n)               //return a new bigInt equal to (x mod n) for bigInts x and n.
// int     modInt(x,n)            //return x mod n for bigInt x and integer n.
// bigInt  mult(x,y)              //return x*y for bigInts x and y. This is faster when y<x.
// bigInt  multMod(x,y,n)         //return (x*y mod n) for bigInts x,y,n.  For greater speed, let y<x.
// boolean negative(x)            //is bigInt x negative?
// bigInt  powMod(x,y,n)          //return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
// bigInt  randBigInt(n,s)        //return an n-bit random BigInt (n>=1).  If s=1, then the most significant of those n bits is set to 1.
// bigInt  randTruePrime(k)       //return a new, random, k-bit, true prime bigInt using Maurer's algorithm.
// bigInt  randProbPrime(k)       //return a new, random, k-bit, probable prime bigInt (probability it's composite less than 2^-80).
// bigInt  str2bigInt(s,b,n,m)    //return a bigInt for number represented in string s in base b with at least n bits and m array elements
// bigInt  sub(x,y)               //return (x-y) for bigInts x and y.  Negative answers will be 2s complement
// bigInt  trim(x,k)              //return a copy of x with exactly k leading zero elements
//
//
// The following functions each have a non-underscored version, which most users should call instead.
// These functions each write to a single parameter, and the caller is responsible for ensuring the array 
// passed in is large enough to hold the result. 
//
// void    addInt_(x,n)          //do x=x+n where x is a bigInt and n is an integer
// void    add_(x,y)             //do x=x+y for bigInts x and y
// void    copy_(x,y)            //do x=y on bigInts x and y
// void    copyInt_(x,n)         //do x=n on bigInt x and integer n
// void    GCD_(x,y)             //set x to the greatest common divisor of bigInts x and y, (y is destroyed).  (This never overflows its array).
// boolean inverseMod_(x,n)      //do x=x**(-1) mod n, for bigInts x and n. Returns 1 (0) if inverse does (doesn't) exist
// void    mod_(x,n)             //do x=x mod n for bigInts x and n. (This never overflows its array).
// void    mult_(x,y)            //do x=x*y for bigInts x and y.
// void    multMod_(x,y,n)       //do x=x*y  mod n for bigInts x,y,n.
// void    powMod_(x,y,n)        //do x=x**y mod n, where x,y,n are bigInts (n is odd) and ** is exponentiation.  0**0=1.
// void    randBigInt_(b,n,s)    //do b = an n-bit random BigInt. if s=1, then nth bit (most significant bit) is set to 1. n>=1.
// void    randTruePrime_(ans,k) //do ans = a random k-bit true random prime (not just probable prime) with 1 in the msb.
// void    sub_(x,y)             //do x=x-y for bigInts x and y. Negative answers will be 2s complement.
//
// The following functions do NOT have a non-underscored version. 
// They each write a bigInt result to one or more parameters.  The caller is responsible for
// ensuring the arrays passed in are large enough to hold the results. 
//
// void addShift_(x,y,ys)       //do x=x+(y<<(ys*bpe))
// void carry_(x)               //do carries and borrows so each element of the bigInt x fits in bpe bits.
// void divide_(x,y,q,r)        //divide x by y giving quotient q and remainder r
// int  divInt_(x,n)            //do x=floor(x/n) for bigInt x and integer n, and return the remainder. (This never overflows its array).
// int  eGCD_(x,y,d,a,b)        //sets a,b,d to positive bigInts such that d = GCD_(x,y) = a*x-b*y
// void halve_(x)               //do x=floor(|x|/2)*sgn(x) for bigInt x in 2's complement.  (This never overflows its array).
// void leftShift_(x,n)         //left shift bigInt x by n bits.  n<bpe.
// void linComb_(x,y,a,b)       //do x=a*x+b*y for bigInts x and y and integers a and b
// void linCombShift_(x,y,b,ys) //do x=x+b*(y<<(ys*bpe)) for bigInts x and y, and integers b and ys
// void mont_(x,y,n,np)         //Montgomery multiplication (see comments where the export function is defined)
// void multInt_(x,n)           //do x=x*n where x is a bigInt and n is an integer.
// void rightShift_(x,n)        //right shift bigInt x by n bits.  0 <= n < bpe. (This never overflows its array).
// void squareMod_(x,n)         //do x=x*x  mod n for bigInts x,n
// void subShift_(x,y,ys)       //do x=x-(y<<(ys*bpe)). Negative answers will be 2s complement.
//
// The following functions are based on algorithms from the _Handbook of Applied Cryptography_
//    powMod_()           = algorithm 14.94, Montgomery exponentiation
//    eGCD_,inverseMod_() = algorithm 14.61, Binary extended GCD_
//    GCD_()              = algorothm 14.57, Lehmer's algorithm
//    mont_()             = algorithm 14.36, Montgomery multiplication
//    divide_()           = algorithm 14.20  Multiple-precision division
//    squareMod_()        = algorithm 14.16  Multiple-precision squaring
//    randTruePrime_()    = algorithm  4.62, Maurer's algorithm
//    millerRabin()       = algorithm  4.24, Miller-Rabin algorithm
//
// Profiling shows:
//     randTruePrime_() spends:
//         10% of its time in calls to powMod_()
//         85% of its time in calls to millerRabin()
//     millerRabin() spends:
//         99% of its time in calls to powMod_()   (always with a base of 2)
//     powMod_() spends:
//         94% of its time in calls to mont_()  (almost always with x==y)
//
// This suggests there are several ways to speed up this library slightly:
//     - convert powMod_ to use a Montgomery form of k-ary window (or maybe a Montgomery form of sliding window)
//         -- this should especially focus on being fast when raising 2 to a power mod n
//     - convert randTruePrime_() to use a minimum r of 1/3 instead of 1/2 with the appropriate change to the test
//     - tune the parameters in randTruePrime_(), including c, m, and recLimit
//     - speed up the single loop in mont_() that takes 95% of the runtime, perhaps by reducing checking
//       within the loop when all the parameters are the same length.
//
// There are several ideas that look like they wouldn't help much at all:
//     - replacing trial division in randTruePrime_() with a sieve (that speeds up something taking almost no time anyway)
//     - increase bpe from 15 to 30 (that would help if we had a 32*32->64 multiplier, but not with JavaScript's 32*32->32)
//     - speeding up mont_(x,y,n,np) when x==y by doing a non-modular, non-Montgomery square
//       followed by a Montgomery reduction.  The intermediate answer will be twice as long as x, so that
//       method would be slower.  This is unfortunate because the code currently spends almost all of its time
//       doing mont_(x,x,...), both for randTruePrime_() and powMod_().  A faster method for Montgomery squaring
//       would have a large impact on the speed of randTruePrime_() and powMod_().  HAC has a couple of poorly-worded
//       sentences that seem to imply it's faster to do a non-modular square followed by a single
//       Montgomery reduction, but that's obviously wrong.
////////////////////////////////////////////////////////////////////////////////////////
//globals
var bpe = 0; //bits stored per array element
var mask = 0; //AND this with an array element to chop it down to bpe bits
var radix = mask + 1; //equals 2^bpe.  A single 1 bit to the left of the last bit of mask.
//the digits for converting to different bases
var digitsStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\\'\"+-'; //initialize the global variables
for (bpe = 0; 1 << bpe + 1 > 1 << bpe; bpe++) {} //bpe=number of bits in the mantissa on this platform
bpe >>= 1; //bpe=number of bits in one element of the array representing the bigInt
mask = (1 << bpe) - 1; //AND the mask with an integer to get its bpe least significant bits
radix = mask + 1; //2^bpe.  a single 1 bit to the left of the first bit of mask
var one = int2bigInt(1, 1, 1); //constant used in powMod_()
//the following global variables are scratchpad memory to 
//reduce dynamic memory allocation in the inner loop
var t = new Array(0);var ss = t; //used in mult_()
var s0 = t; //used in multMod_(), squareMod_() 
var s1 = t; //used in powMod_(), multMod_(), squareMod_() 
var s2 = t; //used in powMod_(), multMod_()
var s3 = t; //used in powMod_()
var s4 = t;var s5 = t; //used in mod_()
var s6 = t; //used in bigInt2str()
var s7 = t; //used in powMod_()
var T = t; //used in GCD_()
var sa = t; //used in mont_()
var mr_x1 = t;var mr_r = t;var mr_a = t; //used in millerRabin()
var eg_v = t;var eg_u = t;var eg_A = t;var eg_B = t;var eg_C = t;var eg_D = t; //used in eGCD_(), inverseMod_()
var md_q1 = t;var md_q2 = t;var md_q3 = t;var md_r = t;var md_r1 = t;var md_r2 = t;var md_tt = t; //used in mod_()
var primes = t;var pows = t;var s_i = t;var s_i2 = t;var s_R = t;var s_rm = t;var s_q = t;var s_n1 = t;var s_a = t;var s_r2 = t;var s_n = t;var s_b = t;var s_d = t;var s_x1 = t;var s_x2 = t,s_aa = t; //used in randTruePrime_()
var rpprb = t; //used in randProbPrimeRounds() (which also uses "primes")
////////////////////////////////////////////////////////////////////////////////////////
function getBpe() {return bpe;}function getOne() {return one;} //return array of all primes less than integer n
function findPrimes(n) {var i, s, p, ans;s = new Array(n);for (i = 0; i < n; i++) {s[i] = 0;}s[0] = 2;p = 0; //first p elements of s are primes, the rest are a sieve
    for (; s[p] < n;) {//s[p] is the pth prime
        for (i = s[p] * s[p]; i < n; i += s[p]) {//mark multiples of s[p]
            s[i] = 1;}p++;s[p] = s[p - 1] + 1;for (; s[p] < n && s[s[p]]; s[p]++) {} //find next prime (where s[p]==0)
    }ans = new Array(p);for (i = 0; i < p; i++) {ans[i] = s[i];}return ans;} //does a single round of Miller-Rabin base b consider x to be a possible prime?
//x is a bigInt, and b is an integer, with b<x
function millerRabinInt(x, b) {if (mr_x1.length != x.length) {mr_x1 = dup(x);mr_r = dup(x);mr_a = dup(x);}copyInt_(mr_a, b);return millerRabin(x, mr_a);} //does a single round of Miller-Rabin base b consider x to be a possible prime?
//x and b are bigInts with b<x
function millerRabin(x, b) {var i, j, k, s;if (mr_x1.length != x.length) {mr_x1 = dup(x);mr_r = dup(x);mr_a = dup(x);}copy_(mr_a, b);copy_(mr_r, x);copy_(mr_x1, x);addInt_(mr_r, -1);addInt_(mr_x1, -1); //s=the highest power of two that divides mr_r
    k = 0;for (i = 0; i < mr_r.length; i++) {for (j = 1; j < mask; j <<= 1) {if (x[i] & j) {s = k < mr_r.length + bpe ? k : 0;i = mr_r.length;j = mask;} else k++;}}if (s) rightShift_(mr_r, s);powMod_(mr_a, mr_r, x);if (!equalsInt(mr_a, 1) && !equals(mr_a, mr_x1)) {j = 1;while (j <= s - 1 && !equals(mr_a, mr_x1)) {squareMod_(mr_a, x);if (equalsInt(mr_a, 1)) {return 0;}j++;}if (!equals(mr_a, mr_x1)) {return 0;}}return 1;} //returns how many bits long the bigInt is, not counting leading zeros.
function bitSize(x) {var j, z, w;for (j = x.length - 1; x[j] == 0 && j > 0; j--) {}for (z = 0, w = x[j]; w; w >>= 1, z++) {}z += bpe * j;return z;} //return a copy of x with at least n elements, adding leading zeros if needed
function expand(x, n) {var ans = int2bigInt(0, (x.length > n ? x.length : n) * bpe, 0);copy_(ans, x);return ans;} //return a k-bit true random prime using Maurer's algorithm.
function randTruePrime(k) {var ans = int2bigInt(0, k, 0);randTruePrime_(ans, k);return trim(ans, 1);} //return a k-bit random probable prime with probability of error < 2^-80
function randProbPrime(k) {if (k >= 600) return randProbPrimeRounds(k, 2); //numbers from HAC table 4.3
    if (k >= 550) return randProbPrimeRounds(k, 4);if (k >= 500) return randProbPrimeRounds(k, 5);if (k >= 400) return randProbPrimeRounds(k, 6);if (k >= 350) return randProbPrimeRounds(k, 7);if (k >= 300) return randProbPrimeRounds(k, 9);if (k >= 250) return randProbPrimeRounds(k, 12); //numbers from HAC table 4.4
    if (k >= 200) return randProbPrimeRounds(k, 15);if (k >= 150) return randProbPrimeRounds(k, 18);if (k >= 100) return randProbPrimeRounds(k, 27);return randProbPrimeRounds(k, 40); //number from HAC remark 4.26 (only an estimate)
} //return a k-bit probable random prime using n rounds of Miller Rabin (after trial division with small primes)	
function randProbPrimeRounds(k, n) {var ans, i, divisible, B;B = 30000; //B is largest prime to use in trial division
    ans = int2bigInt(0, k, 0); //optimization: try larger and smaller B to find the best limit.
    if (primes.length == 0) primes = findPrimes(30000); //check for divisibility by primes <=30000
    if (rpprb.length != ans.length) rpprb = dup(ans);for (;;) {//keep trying random values for ans until one appears to be prime
        //optimization: pick a random number times L=2*3*5*...*p, plus a 
        //   random element of the list of all numbers in [0,L) not divisible by any prime up to p.
        //   This can reduce the amount of random number generation.
        randBigInt_(ans, k, 0); //ans = a random odd number to check
        ans[0] |= 1;divisible = 0; //check ans for divisibility by small primes up to B
        for (i = 0; i < primes.length && primes[i] <= B; i++) {if (modInt(ans, primes[i]) == 0 && !equalsInt(ans, primes[i])) {divisible = 1;break;}} //optimization: change millerRabin so the base can be bigger than the number being checked, then eliminate the while here.
        //do n rounds of Miller Rabin, with random bases less than ans
        for (i = 0; i < n && !divisible; i++) {randBigInt_(rpprb, k, 0);while (!greater(ans, rpprb)) {//pick a random rpprb that's < ans
                randBigInt_(rpprb, k, 0);}if (!millerRabin(ans, rpprb)) divisible = 1;}if (!divisible) return ans;}} //return a new bigInt equal to (x mod n) for bigInts x and n.
function mod(x, n) {var ans = dup(x);mod_(ans, n);return trim(ans, 1);} //return (x+n) where x is a bigInt and n is an integer.
function addInt(x, n) {var ans = expand(x, x.length + 1);addInt_(ans, n);return trim(ans, 1);} //return x*y for bigInts x and y. This is faster when y<x.
function mult(x, y) {var ans = expand(x, x.length + y.length);mult_(ans, y);return trim(ans, 1);} //return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
function powMod(x, y, n) {var ans = expand(x, n.length);powMod_(ans, trim(y, 2), trim(n, 2), 0); //this should work without the trim, but doesn't
    return trim(ans, 1);} //return (x-y) for bigInts x and y.  Negative answers will be 2s complement
function sub(x, y) {var ans = expand(x, x.length > y.length ? x.length + 1 : y.length + 1);sub_(ans, y);return trim(ans, 1);} //return (x+y) for bigInts x and y.  
function add(x, y) {var ans = expand(x, x.length > y.length ? x.length + 1 : y.length + 1);add_(ans, y);return trim(ans, 1);} //return (x**(-1) mod n) for bigInts x and n.  If no inverse exists, it returns null
function inverseMod(x, n) {var ans = expand(x, n.length);var s;s = inverseMod_(ans, n);return s ? trim(ans, 1) : null;} //return (x*y mod n) for bigInts x,y,n.  For greater speed, let y<x.
function multMod(x, y, n) {var ans = expand(x, n.length);multMod_(ans, y, n);return trim(ans, 1);} //generate a k-bit true random prime using Maurer's algorithm,
//and put it into ans.  The bigInt ans must be large enough to hold it.
function randTruePrime_(ans, k) {var c, m, pm, dd, j, r, B, divisible, z, zz, recSize;if (primes.length == 0) primes = findPrimes(30000); //check for divisibility by primes <=30000
    if (pows.length == 0) {pows = new Array(512);for (j = 0; j < 512; j++) {pows[j] = Math.pow(2, j / 511. - 1.);}} //c and m should be tuned for a particular machine and value of k, to maximize speed
    c = 0.1; //c=0.1 in HAC
    m = 20; //generate this k-bit number by first recursively generating a number that has between k/2 and k-m bits
    recLimit = 20; //stop recursion when k <=recLimit.  Must have recLimit >= 2
    if (s_i2.length != ans.length) {s_i2 = dup(ans);s_R = dup(ans);s_n1 = dup(ans);s_r2 = dup(ans);s_d = dup(ans);s_x1 = dup(ans);s_x2 = dup(ans);s_b = dup(ans);s_n = dup(ans);s_i = dup(ans);s_rm = dup(ans);s_q = dup(ans);s_a = dup(ans);s_aa = dup(ans);}if (k <= recLimit) {//generate small random primes by trial division up to its square root
        pm = (1 << (k + 2 >> 1)) - 1; //pm is binary number with all ones, just over sqrt(2^k)
        copyInt_(ans, 0);for (dd = 1; dd;) {dd = 0;ans[0] = 1 | 1 << k - 1 | Math.floor(Math.random() * (1 << k)); //random, k-bit, odd integer, with msb 1
            for (j = 1; j < primes.length && (primes[j] & pm) == primes[j]; j++) {//trial division by all primes 3...sqrt(2^k)
                if (0 == ans[0] % primes[j]) {dd = 1;break;}}}carry_(ans);return;}B = c * k * k; //try small primes up to B (or all the primes[] array if the largest is less than B).
    if (k > 2 * m) //generate this k-bit number by first recursively generating a number that has between k/2 and k-m bits
        for (r = 1; k - k * r <= m;) {r = pows[Math.floor(Math.random() * 512)];} //r=Math.pow(2,Math.random()-1);
    else r = .5; //simulation suggests the more complex algorithm using r=.333 is only slightly faster.
    recSize = Math.floor(r * k) + 1;randTruePrime_(s_q, recSize);copyInt_(s_i2, 0);s_i2[Math.floor((k - 2) / bpe)] |= 1 << (k - 2) % bpe; //s_i2=2^(k-2)
    divide_(s_i2, s_q, s_i, s_rm); //s_i=floor((2^(k-1))/(2q))
    z = bitSize(s_i);for (;;) {for (;;) {//generate z-bit numbers until one falls in the range [0,s_i-1]
            randBigInt_(s_R, z, 0);if (greater(s_i, s_R)) break;} //now s_R is in the range [0,s_i-1]
        addInt_(s_R, 1); //now s_R is in the range [1,s_i]
        add_(s_R, s_i); //now s_R is in the range [s_i+1,2*s_i]
        copy_(s_n, s_q);mult_(s_n, s_R);multInt_(s_n, 2);addInt_(s_n, 1); //s_n=2*s_R*s_q+1
        copy_(s_r2, s_R);multInt_(s_r2, 2); //s_r2=2*s_R
        //check s_n for divisibility by small primes up to B
        for (divisible = 0, j = 0; j < primes.length && primes[j] < B; j++) {if (modInt(s_n, primes[j]) == 0 && !equalsInt(s_n, primes[j])) {divisible = 1;break;}}if (!divisible) //if it passes small primes check, then try a single Miller-Rabin base 2
            if (!millerRabinInt(s_n, 2)) //this line represents 75% of the total runtime for randTruePrime_ 
                divisible = 1;if (!divisible) {//if it passes that test, continue checking s_n
            addInt_(s_n, -3);for (j = s_n.length - 1; s_n[j] == 0 && j > 0; j--) {} //strip leading zeros
            for (zz = 0, w = s_n[j]; w; w >>= 1, zz++) {}zz += bpe * j; //zz=number of bits in s_n, ignoring leading zeros
            for (;;) {//generate z-bit numbers until one falls in the range [0,s_n-1]
                randBigInt_(s_a, zz, 0);if (greater(s_n, s_a)) break;} //now s_a is in the range [0,s_n-1]
            addInt_(s_n, 3); //now s_a is in the range [0,s_n-4]
            addInt_(s_a, 2); //now s_a is in the range [2,s_n-2]
            copy_(s_b, s_a);copy_(s_n1, s_n);addInt_(s_n1, -1);powMod_(s_b, s_n1, s_n); //s_b=s_a^(s_n-1) modulo s_n
            addInt_(s_b, -1);if (isZero(s_b)) {copy_(s_b, s_a);powMod_(s_b, s_r2, s_n);addInt_(s_b, -1);copy_(s_aa, s_n);copy_(s_d, s_b);GCD_(s_d, s_n); //if s_b and s_n are relatively prime, then s_n is a prime
                if (equalsInt(s_d, 1)) {copy_(ans, s_aa);return; //if we've made it this far, then s_n is absolutely guaranteed to be prime
                }}}}} //Return an n-bit random BigInt (n>=1).  If s=1, then the most significant of those n bits is set to 1.
function randBigInt(n, s) {var a, b;a = Math.floor((n - 1) / bpe) + 2; //# array elements to hold the BigInt with a leading 0 element
    b = int2bigInt(0, 0, a);randBigInt_(b, n, s);return b;} //Set b to an n-bit random BigInt.  If s=1, then the most significant of those n bits is set to 1.
//Array b must be big enough to hold the result. Must have n>=1
function randBigInt_(b, n, s) {var i, a;for (i = 0; i < b.length; i++) {b[i] = 0;}a = Math.floor((n - 1) / bpe) + 1; //# array elements to hold the BigInt
    for (i = 0; i < a; i++) {b[i] = Math.floor(Math.random() * (1 << bpe - 1));}b[a - 1] &= (2 << (n - 1) % bpe) - 1;if (s == 1) b[a - 1] |= 1 << (n - 1) % bpe;} //Return the greatest common divisor of bigInts x and y (each with same number of elements).
function GCD(x, y) {var xc, yc;xc = dup(x);yc = dup(y);GCD_(xc, yc);return xc;} //set x to the greatest common divisor of bigInts x and y (each with same number of elements).
//y is destroyed.
function GCD_(x, y) {var i, xp, yp, A, B, C, D, q, sing;if (T.length != x.length) T = dup(x);sing = 1;while (sing) {//while y has nonzero elements other than y[0]
        sing = 0;for (i = 1; i < y.length; i++) {//check if y has nonzero elements other than 0
            if (y[i]) {sing = 1;break;}}if (!sing) break; //quit when y all zero elements except possibly y[0]
        for (i = x.length; !x[i] && i >= 0; i--) {} //find most significant element of x
        xp = x[i];yp = y[i];A = 1;B = 0;C = 0;D = 1;while (yp + C && yp + D) {q = Math.floor((xp + A) / (yp + C));qp = Math.floor((xp + B) / (yp + D));if (q != qp) break;t = A - q * C;A = C;C = t; //  do (A,B,xp, C,D,yp) = (C,D,yp, A,B,xp) - q*(0,0,0, C,D,yp)      
            t = B - q * D;B = D;D = t;t = xp - q * yp;xp = yp;yp = t;}if (B) {copy_(T, x);linComb_(x, y, A, B); //x=A*x+B*y
            linComb_(y, T, D, C); //y=D*y+C*T
        } else {mod_(x, y);copy_(T, x);copy_(x, y);copy_(y, T);}}if (y[0] == 0) return;t = modInt(x, y[0]);copyInt_(x, y[0]);y[0] = t;while (y[0]) {x[0] %= y[0];t = x[0];x[0] = y[0];y[0] = t;}} //do x=x**(-1) mod n, for bigInts x and n.
//If no inverse exists, it sets x to zero and returns 0, else it returns 1.
//The x array must be at least as large as the n array.
function inverseMod_(x, n) {var k = 1 + 2 * Math.max(x.length, n.length);if (!(x[0] & 1) && !(n[0] & 1)) {//if both inputs are even, then inverse doesn't exist
        copyInt_(x, 0);return 0;}if (eg_u.length != k) {eg_u = new Array(k);eg_v = new Array(k);eg_A = new Array(k);eg_B = new Array(k);eg_C = new Array(k);eg_D = new Array(k);}copy_(eg_u, x);copy_(eg_v, n);copyInt_(eg_A, 1);copyInt_(eg_B, 0);copyInt_(eg_C, 0);copyInt_(eg_D, 1);for (;;) {while (!(eg_u[0] & 1)) {//while eg_u is even
            halve_(eg_u);if (!(eg_A[0] & 1) && !(eg_B[0] & 1)) {//if eg_A==eg_B==0 mod 2
                halve_(eg_A);halve_(eg_B);} else {add_(eg_A, n);halve_(eg_A);sub_(eg_B, x);halve_(eg_B);}}while (!(eg_v[0] & 1)) {//while eg_v is even
            halve_(eg_v);if (!(eg_C[0] & 1) && !(eg_D[0] & 1)) {//if eg_C==eg_D==0 mod 2
                halve_(eg_C);halve_(eg_D);} else {add_(eg_C, n);halve_(eg_C);sub_(eg_D, x);halve_(eg_D);}}if (!greater(eg_v, eg_u)) {//eg_v <= eg_u
            sub_(eg_u, eg_v);sub_(eg_A, eg_C);sub_(eg_B, eg_D);} else {//eg_v > eg_u
            sub_(eg_v, eg_u);sub_(eg_C, eg_A);sub_(eg_D, eg_B);}if (equalsInt(eg_u, 0)) {while (negative(eg_C)) {//make sure answer is nonnegative
                add_(eg_C, n);}copy_(x, eg_C);if (!equalsInt(eg_v, 1)) {//if GCD_(x,n)!=1, then there is no inverse
                copyInt_(x, 0);return 0;}return 1;}}} //return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
function inverseModInt(x, n) {var a = 1,b = 0,t;for (;;) {if (x == 1) return a;if (x == 0) return 0;b -= a * Math.floor(n / x);n %= x;if (n == 1) return b; //to avoid negatives, change this b to n-b, and each -= to +=
        if (n == 0) return 0;a -= b * Math.floor(x / n);x %= n;}} //this deprecated export function is for backward compatibility only. 
function inverseModInt_(x, n) {return inverseModInt(x, n);} //Given positive bigInts x and y, change the bigints v, a, and b to positive bigInts such that:
//     v = GCD_(x,y) = a*x-b*y
//The bigInts v, a, b, must have exactly as many elements as the larger of x and y.
function eGCD_(x, y, v, a, b) {var g = 0;var k = Math.max(x.length, y.length);if (eg_u.length != k) {eg_u = new Array(k);eg_A = new Array(k);eg_B = new Array(k);eg_C = new Array(k);eg_D = new Array(k);}while (!(x[0] & 1) && !(y[0] & 1)) {//while x and y both even
        halve_(x);halve_(y);g++;}copy_(eg_u, x);copy_(v, y);copyInt_(eg_A, 1);copyInt_(eg_B, 0);copyInt_(eg_C, 0);copyInt_(eg_D, 1);for (;;) {while (!(eg_u[0] & 1)) {//while u is even
            halve_(eg_u);if (!(eg_A[0] & 1) && !(eg_B[0] & 1)) {//if A==B==0 mod 2
                halve_(eg_A);halve_(eg_B);} else {add_(eg_A, y);halve_(eg_A);sub_(eg_B, x);halve_(eg_B);}}while (!(v[0] & 1)) {//while v is even
            halve_(v);if (!(eg_C[0] & 1) && !(eg_D[0] & 1)) {//if C==D==0 mod 2
                halve_(eg_C);halve_(eg_D);} else {add_(eg_C, y);halve_(eg_C);sub_(eg_D, x);halve_(eg_D);}}if (!greater(v, eg_u)) {//v<=u
            sub_(eg_u, v);sub_(eg_A, eg_C);sub_(eg_B, eg_D);} else {//v>u
            sub_(v, eg_u);sub_(eg_C, eg_A);sub_(eg_D, eg_B);}if (equalsInt(eg_u, 0)) {while (negative(eg_C)) {//make sure a (C) is nonnegative
                add_(eg_C, y);sub_(eg_D, x);}multInt_(eg_D, -1); ///make sure b (D) is nonnegative
            copy_(a, eg_C);copy_(b, eg_D);leftShift_(v, g);return;}}} //is bigInt x negative?
function negative(x) {return x[x.length - 1] >> bpe - 1 & 1;} //is (x << (shift*bpe)) > y?
//x and y are nonnegative bigInts
//shift is a nonnegative integer
function greaterShift(x, y, shift) {var i,kx = x.length,ky = y.length;var k = kx + shift < ky ? kx + shift : ky;for (i = ky - 1 - shift; i < kx && i >= 0; i++) {if (x[i] > 0) return 1;} //if there are nonzeros in x to the left of the first column of y, then x is bigger
    for (i = kx - 1 + shift; i < ky; i++) {if (y[i] > 0) return 0;} //if there are nonzeros in y to the left of the first column of x, then x is not bigger
    for (i = k - 1; i >= shift; i--) {if (x[i - shift] > y[i]) return 1;else if (x[i - shift] < y[i]) return 0;}return 0;} //is x > y? (x and y both nonnegative)
function greater(x, y) {var i;var k = x.length < y.length ? x.length : y.length;for (i = x.length; i < y.length; i++) {if (y[i]) return 0;} //y has more digits
    for (i = y.length; i < x.length; i++) {if (x[i]) return 1;} //x has more digits
    for (i = k - 1; i >= 0; i--) {if (x[i] > y[i]) return 1;else if (x[i] < y[i]) return 0;}return 0;} //divide x by y giving quotient q and remainder r.  (q=floor(x/y),  r=x mod y).  All 4 are bigints.
//x must have at least one leading zero element.
//y must be nonzero.
//q and r must be arrays that are exactly the same length as x. (Or q can have more).
//Must have x.length >= y.length >= 2.
function divide_(x, y, q, r) {var kx, ky;var i, j, y1, y2, c, a, b;copy_(r, x);for (ky = y.length; y[ky - 1] == 0; ky--) {} //ky is number of elements in y, not including leading zeros
    //normalize: ensure the most significant element of y has its highest bit set  
    b = y[ky - 1];for (a = 0; b; a++) {b >>= 1;}a = bpe - a; //a is how many bits to shift so that the high order bit of y is leftmost in its array element
    leftShift_(y, a); //multiply both by 1<<a now, then divide both by that at the end
    leftShift_(r, a); //Rob Visser discovered a bug: the following line was originally just before the normalization.
    for (kx = r.length; r[kx - 1] == 0 && kx > ky; kx--) {} //kx is number of elements in normalized x, not including leading zeros
    copyInt_(q, 0); // q=0
    while (!greaterShift(y, r, kx - ky)) {// while (leftShift_(y,kx-ky) <= r) {
        subShift_(r, y, kx - ky); //   r=r-leftShift_(y,kx-ky)
        q[kx - ky]++; //   q[kx-ky]++;
    } // }
    for (i = kx - 1; i >= ky; i--) {if (r[i] == y[ky - 1]) q[i - ky] = mask;else q[i - ky] = Math.floor((r[i] * radix + r[i - 1]) / y[ky - 1]); //The following for(;;) loop is equivalent to the commented while loop, 
        //except that the uncommented version avoids overflow.
        //The commented loop comes from HAC, which assumes r[-1]==y[-1]==0
        //  while (q[i-ky]*(y[ky-1]*radix+y[ky-2]) > r[i]*radix*radix+r[i-1]*radix+r[i-2])
        //    q[i-ky]--;    
        for (;;) {y2 = (ky > 1 ? y[ky - 2] : 0) * q[i - ky];c = y2 >> bpe;y2 = y2 & mask;y1 = c + q[i - ky] * y[ky - 1];c = y1 >> bpe;y1 = y1 & mask;if (c == r[i] ? y1 == r[i - 1] ? y2 > (i > 1 ? r[i - 2] : 0) : y1 > r[i - 1] : c > r[i]) q[i - ky]--;else break;}linCombShift_(r, y, -q[i - ky], i - ky); //r=r-q[i-ky]*leftShift_(y,i-ky)
        if (negative(r)) {addShift_(r, y, i - ky); //r=r+leftShift_(y,i-ky)
            q[i - ky]--;}}rightShift_(y, a); //undo the normalization step
    rightShift_(r, a); //undo the normalization step
} //do carries and borrows so each element of the bigInt x fits in bpe bits.
function carry_(x) {var i, k, c, b;k = x.length;c = 0;for (i = 0; i < k; i++) {c += x[i];b = 0;if (c < 0) {b = -(c >> bpe);c += b * radix;}x[i] = c & mask;c = (c >> bpe) - b;}} //return x mod n for bigInt x and integer n.
function modInt(x, n) {var i,c = 0;for (i = x.length - 1; i >= 0; i--) {c = (c * radix + x[i]) % n;}return c;} //convert the integer t into a bigInt with at least the given number of bits.
//the returned array stores the bigInt in bpe-bit chunks, little endian (buff[0] is least significant word)
//Pad the array with leading zeros so that it has at least minSize elements.
//There will always be at least one leading 0 element.
function int2bigInt(t, bits, minSize) {var i, k;k = Math.ceil(bits / bpe) + 1;k = minSize > k ? minSize : k;var buff = new Array(k);copyInt_(buff, t);return buff;} //return the bigInt given a string representation in a given base.  
//Pad the array with leading zeros so that it has at least minSize elements.
//If base=-1, then it reads in a space-separated list of array elements in decimal.
//The array will always have at least one leading zero, unless base=-1.
function str2bigInt(s, base, minSize) {var d, i, j, x, y, kk;var k = s.length;if (base == -1) {//comma-separated list of array elements in decimal
        x = new Array(0);for (;;) {y = new Array(x.length + 1);for (i = 0; i < x.length; i++) {y[i + 1] = x[i];}y[0] = parseInt(s, 10);x = y;d = s.indexOf(',', 0);if (d < 1) break;s = s.substring(d + 1);if (s.length == 0) break;}if (x.length < minSize) {y = new Array(minSize);copy_(y, x);return y;}return x;}x = int2bigInt(0, base * k, 0);for (i = 0; i < k; i++) {d = digitsStr.indexOf(s.substring(i, i + 1), 0);if (base <= 36 && d >= 36) //convert lowercase to uppercase if base<=36
            d -= 26;if (d >= base || d < 0) {//stop at first illegal character
            break;}multInt_(x, base);addInt_(x, d);}for (k = x.length; k > 0 && !x[k - 1]; k--) {} //strip off leading zeros
    k = minSize > k + 1 ? minSize : k + 1;y = new Array(k);kk = k < x.length ? k : x.length;for (i = 0; i < kk; i++) {y[i] = x[i];}for (; i < k; i++) {y[i] = 0;}return y;} //is bigint x equal to integer y?
//y must have less than bpe bits
function equalsInt(x, y) {var i;if (x[0] != y) return 0;for (i = 1; i < x.length; i++) {if (x[i]) return 0;}return 1;} //are bigints x and y equal?
//this works even if x and y are different lengths and have arbitrarily many leading zeros
function equals(x, y) {var i;var k = x.length < y.length ? x.length : y.length;for (i = 0; i < k; i++) {if (x[i] != y[i]) return 0;}if (x.length > y.length) {for (; i < x.length; i++) {if (x[i]) return 0;}} else {for (; i < y.length; i++) {if (y[i]) return 0;}}return 1;} //is the bigInt x equal to zero?
function isZero(x) {var i;for (i = 0; i < x.length; i++) {if (x[i]) return 0;}return 1;} //convert a bigInt into a string in a given base, from base 2 up to base 95.
//Base -1 prints the contents of the array representing the number.
function bigInt2str(x, base) {var i,t,s = "";if (s6.length != x.length) s6 = dup(x);else copy_(s6, x);if (base == -1) {//return the list of array contents
        for (i = x.length - 1; i > 0; i--) {s += x[i] + ',';}s += x[0];} else {//return it in the given base
        while (!isZero(s6)) {t = divInt_(s6, base); //t=s6 % base; s6=floor(s6/base);
            s = digitsStr.substring(t, t + 1) + s;}}if (s.length == 0) s = "0";return s;} //returns a duplicate of bigInt x
function dup(x) {var i;var buff = new Array(x.length);copy_(buff, x);return buff;} //do x=y on bigInts x and y.  x must be an array at least as big as y (not counting the leading zeros in y).
function copy_(x, y) {var i;var k = x.length < y.length ? x.length : y.length;for (i = 0; i < k; i++) {x[i] = y[i];}for (i = k; i < x.length; i++) {x[i] = 0;}} //do x=y on bigInt x and integer y.  
function copyInt_(x, n) {var i, c;for (c = n, i = 0; i < x.length; i++) {x[i] = c & mask;c >>= bpe;}} //do x=x+n where x is a bigInt and n is an integer.
//x must be large enough to hold the result.
function addInt_(x, n) {var i, k, c, b;x[0] += n;k = x.length;c = 0;for (i = 0; i < k; i++) {c += x[i];b = 0;if (c < 0) {b = -(c >> bpe);c += b * radix;}x[i] = c & mask;c = (c >> bpe) - b;if (!c) return; //stop carrying as soon as the carry is zero
    }} //right shift bigInt x by n bits.  0 <= n < bpe.
function rightShift_(x, n) {var i;var k = Math.floor(n / bpe);if (k) {for (i = 0; i < x.length - k; i++) {//right shift x by k elements
            x[i] = x[i + k];}for (; i < x.length; i++) {x[i] = 0;}n %= bpe;}for (i = 0; i < x.length - 1; i++) {x[i] = mask & (x[i + 1] << bpe - n | x[i] >> n);}x[i] >>= n;} //do x=floor(|x|/2)*sgn(x) for bigInt x in 2's complement
function halve_(x) {var i;for (i = 0; i < x.length - 1; i++) {x[i] = mask & (x[i + 1] << bpe - 1 | x[i] >> 1);}x[i] = x[i] >> 1 | x[i] & radix >> 1; //most significant bit stays the same
} //left shift bigInt x by n bits.
function leftShift_(x, n) {var i;var k = Math.floor(n / bpe);if (k) {for (i = x.length; i >= k; i--) {//left shift x by k elements
            x[i] = x[i - k];}for (; i >= 0; i--) {x[i] = 0;}n %= bpe;}if (!n) return;for (i = x.length - 1; i > 0; i--) {x[i] = mask & (x[i] << n | x[i - 1] >> bpe - n);}x[i] = mask & x[i] << n;} //do x=x*n where x is a bigInt and n is an integer.
//x must be large enough to hold the result.
function multInt_(x, n) {var i, k, c, b;if (!n) return;k = x.length;c = 0;for (i = 0; i < k; i++) {c += x[i] * n;b = 0;if (c < 0) {b = -(c >> bpe);c += b * radix;}x[i] = c & mask;c = (c >> bpe) - b;}} //do x=floor(x/n) for bigInt x and integer n, and return the remainder
function divInt_(x, n) {var i,r = 0,s;for (i = x.length - 1; i >= 0; i--) {s = r * radix + x[i];x[i] = Math.floor(s / n);r = s % n;}return r;} //do the linear combination x=a*x+b*y for bigInts x and y, and integers a and b.
//x must be large enough to hold the answer.
function linComb_(x, y, a, b) {var i, c, k, kk;k = x.length < y.length ? x.length : y.length;kk = x.length;for (c = 0, i = 0; i < k; i++) {c += a * x[i] + b * y[i];x[i] = c & mask;c >>= bpe;}for (i = k; i < kk; i++) {c += a * x[i];x[i] = c & mask;c >>= bpe;}} //do the linear combination x=a*x+b*(y<<(ys*bpe)) for bigInts x and y, and integers a, b and ys.
//x must be large enough to hold the answer.
function linCombShift_(x, y, b, ys) {var i, c, k, kk;k = x.length < ys + y.length ? x.length : ys + y.length;kk = x.length;for (c = 0, i = ys; i < k; i++) {c += x[i] + b * y[i - ys];x[i] = c & mask;c >>= bpe;}for (i = k; c && i < kk; i++) {c += x[i];x[i] = c & mask;c >>= bpe;}} //do x=x+(y<<(ys*bpe)) for bigInts x and y, and integers a,b and ys.
//x must be large enough to hold the answer.
function addShift_(x, y, ys) {var i, c, k, kk;k = x.length < ys + y.length ? x.length : ys + y.length;kk = x.length;for (c = 0, i = ys; i < k; i++) {c += x[i] + y[i - ys];x[i] = c & mask;c >>= bpe;}for (i = k; c && i < kk; i++) {c += x[i];x[i] = c & mask;c >>= bpe;}} //do x=x-(y<<(ys*bpe)) for bigInts x and y, and integers a,b and ys.
//x must be large enough to hold the answer.
function subShift_(x, y, ys) {var i, c, k, kk;k = x.length < ys + y.length ? x.length : ys + y.length;kk = x.length;for (c = 0, i = ys; i < k; i++) {c += x[i] - y[i - ys];x[i] = c & mask;c >>= bpe;}for (i = k; c && i < kk; i++) {c += x[i];x[i] = c & mask;c >>= bpe;}} //do x=x-y for bigInts x and y.
//x must be large enough to hold the answer.
//negative answers will be 2s complement
function sub_(x, y) {var i, c, k, kk;k = x.length < y.length ? x.length : y.length;for (c = 0, i = 0; i < k; i++) {c += x[i] - y[i];x[i] = c & mask;c >>= bpe;}for (i = k; c && i < x.length; i++) {c += x[i];x[i] = c & mask;c >>= bpe;}} //do x=x+y for bigInts x and y.
//x must be large enough to hold the answer.
function add_(x, y) {var i, c, k, kk;k = x.length < y.length ? x.length : y.length;for (c = 0, i = 0; i < k; i++) {c += x[i] + y[i];x[i] = c & mask;c >>= bpe;}for (i = k; c && i < x.length; i++) {c += x[i];x[i] = c & mask;c >>= bpe;}} //do x=x*y for bigInts x and y.  This is faster when y<x.
function mult_(x, y) {var i;if (ss.length != 2 * x.length) ss = new Array(2 * x.length);copyInt_(ss, 0);for (i = 0; i < y.length; i++) {if (y[i]) linCombShift_(ss, x, y[i], i);} //ss=1*ss+y[i]*(x<<(i*bpe))
    copy_(x, ss);} //do x=x mod n for bigInts x and n.
function mod_(x, n) {if (s4.length != x.length) s4 = dup(x);else copy_(s4, x);if (s5.length != x.length) s5 = dup(x);divide_(s4, n, s5, x); //x = remainder of s4 / n
} //do x=x*y mod n for bigInts x,y,n.
//for greater speed, let y<x.
function multMod_(x, y, n) {var i;if (s0.length != 2 * x.length) s0 = new Array(2 * x.length);copyInt_(s0, 0);for (i = 0; i < y.length; i++) {if (y[i]) linCombShift_(s0, x, y[i], i);} //s0=1*s0+y[i]*(x<<(i*bpe))
    mod_(s0, n);copy_(x, s0);} //do x=x*x mod n for bigInts x,n.
function squareMod_(x, n) {var i, j, d, c, kx, kn, k;for (kx = x.length; kx > 0 && !x[kx - 1]; kx--) {} //ignore leading zeros in x
    k = kx > n.length ? 2 * kx : 2 * n.length; //k=# elements in the product, which is twice the elements in the larger of x and n
    if (s0.length != k) s0 = new Array(k);copyInt_(s0, 0);for (i = 0; i < kx; i++) {c = s0[2 * i] + x[i] * x[i];s0[2 * i] = c & mask;c >>= bpe;for (j = i + 1; j < kx; j++) {c = s0[i + j] + 2 * x[i] * x[j] + c;s0[i + j] = c & mask;c >>= bpe;}s0[i + kx] = c;}mod_(s0, n);copy_(x, s0);} //return x with exactly k leading zero elements
function trim(x, k) {var i, y;for (i = x.length; i > 0 && !x[i - 1]; i--) {}y = new Array(i + k);copy_(y, x);return y;} //do x=x**y mod n, where x,y,n are bigInts and ** is exponentiation.  0**0=1.
//this is faster when n is odd.  x usually needs to have as many elements as n.
function powMod_(x, y, n) {var k1, k2, kn, np;if (s7.length != n.length) s7 = dup(n); //for even modulus, use a simple square-and-multiply algorithm,
    //rather than using the more complex Montgomery algorithm.
    if ((n[0] & 1) == 0) {copy_(s7, x);copyInt_(x, 1);while (!equalsInt(y, 0)) {if (y[0] & 1) multMod_(x, s7, n);divInt_(y, 2);squareMod_(s7, n);}return;} //calculate np from n for the Montgomery multiplications
    copyInt_(s7, 0);for (kn = n.length; kn > 0 && !n[kn - 1]; kn--) {}np = radix - inverseModInt(modInt(n, radix), radix);s7[kn] = 1;multMod_(x, s7, n); // x = x * 2**(kn*bp) mod n
    if (s3.length != x.length) s3 = dup(x);else copy_(s3, x);for (k1 = y.length - 1; k1 > 0 & !y[k1]; k1--) {} //k1=first nonzero element of y
    if (y[k1] == 0) {//anything to the 0th power is 1
        copyInt_(x, 1);return;}for (k2 = 1 << bpe - 1; k2 && !(y[k1] & k2); k2 >>= 1) {} //k2=position of first 1 bit in y[k1]
    for (;;) {if (!(k2 >>= 1)) {//look at next bit of y
            k1--;if (k1 < 0) {mont_(x, one, n, np);return;}k2 = 1 << bpe - 1;}mont_(x, x, n, np);if (k2 & y[k1]) //if next bit is a 1
            mont_(x, s3, n, np);}} //do x=x*y*Ri mod n for bigInts x,y,n, 
//  where Ri = 2**(-kn*bpe) mod n, and kn is the 
//  number of elements in the n array, not 
//  counting leading zeros.  
//x array must have at least as many elemnts as the n array
//It's OK if x and y are the same variable.
//must have:
//  x,y < n
//  n is odd
//  np = -(n^(-1)) mod radix
function mont_(x, y, n, np) {var i, j, c, ui, t, ks;var kn = n.length;var ky = y.length;if (sa.length != kn) sa = new Array(kn);copyInt_(sa, 0);for (; kn > 0 && n[kn - 1] == 0; kn--) {} //ignore leading zeros of n
    for (; ky > 0 && y[ky - 1] == 0; ky--) {} //ignore leading zeros of y
    ks = sa.length - 1; //sa will never have more than this many nonzero elements.  
    //the following loop consumes 95% of the runtime for randTruePrime_() and powMod_() for large numbers
    for (i = 0; i < kn; i++) {t = sa[0] + x[i] * y[0];ui = (t & mask) * np & mask; //the inner "& mask" was needed on Safari (but not MSIE) at one time
        c = t + ui * n[0] >> bpe;t = x[i]; //do sa=(sa+x[i]*y+ui*n)/b   where b=2**bpe.  Loop is unrolled 5-fold for speed
        j = 1;for (; j < ky - 4;) {c += sa[j] + ui * n[j] + t * y[j];sa[j - 1] = c & mask;c >>= bpe;j++;c += sa[j] + ui * n[j] + t * y[j];sa[j - 1] = c & mask;c >>= bpe;j++;c += sa[j] + ui * n[j] + t * y[j];sa[j - 1] = c & mask;c >>= bpe;j++;c += sa[j] + ui * n[j] + t * y[j];sa[j - 1] = c & mask;c >>= bpe;j++;c += sa[j] + ui * n[j] + t * y[j];sa[j - 1] = c & mask;c >>= bpe;j++;}for (; j < ky;) {c += sa[j] + ui * n[j] + t * y[j];sa[j - 1] = c & mask;c >>= bpe;j++;}for (; j < kn - 4;) {c += sa[j] + ui * n[j];sa[j - 1] = c & mask;c >>= bpe;j++;c += sa[j] + ui * n[j];sa[j - 1] = c & mask;c >>= bpe;j++;c += sa[j] + ui * n[j];sa[j - 1] = c & mask;c >>= bpe;j++;c += sa[j] + ui * n[j];sa[j - 1] = c & mask;c >>= bpe;j++;c += sa[j] + ui * n[j];sa[j - 1] = c & mask;c >>= bpe;j++;}for (; j < kn;) {c += sa[j] + ui * n[j];sa[j - 1] = c & mask;c >>= bpe;j++;}for (; j < ks;) {c += sa[j];sa[j - 1] = c & mask;c >>= bpe;j++;}sa[j - 1] = c & mask;}if (!greater(n, sa)) sub_(sa, n);copy_(x, sa);}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.networkRequest = exports.flushSockets = undefined;










var _aes = __webpack_require__(44);

var websockets = {}; // import axios from 'axios'
// export function toArrayBuffer(buf) {
//     var ab = new ArrayBuffer(buf.length)
//     var view = new Uint8Array(ab)
//     for (var i = 0; i < buf.length; ++i) {
//         view[i] = buf[i]
//     }
//     return ab
// }
function WSocket(url, dcId) {this._url = url;this._dcId = dcId;this.open();};WSocket.prototype.reconnect = function () {var _this = this;
    if (this._gonnaClose) {
        return false;
    }

    // this._socket.removeAllListeners();
    clearTimeout(this._reconnTimeout);
    this._reconnTimeout = setTimeout(function () {
        _this.log('reconnecting...');
        _this.open();
    }, 1000);
};

WSocket.prototype.close = function () {
    if (this._socket) {
        this._gonnaClose = true;
        this._socket.close();
    }
};

WSocket.prototype.open = function () {var _this2 = this;
    this._networkCallback = null;

    this._socket = new WebSocket(this._url, 'binary');
    this._socket.binaryType = "arraybuffer";
    this.log('Initialization');

    this._incomePromiseResolvers = [];

    this._socket.addEventListener('message', function (event) {
        if (event.data instanceof ArrayBuffer) {
            // this.log('Message from server ', event.data);
            var resolver = _this2._incomePromiseResolvers.shift();

            var dec = _this2._decryptor.decrypt(new Uint8Array(event.data));
            // this.log('Decrypted', dec);
            // this.log(bytesFromWords(data));
            // let dec = this._decryptor.process(data);
            // this.log(dec);
            // dec = dec.concat(this._decryptor.finalize());
            // this.log(dec);
            // dec = new Uint8Array(bytesFromWords(dec));
            /// remove length
            if (dec[0] == 0x7f) {
                dec = dec.slice(4);
            } else {
                dec = dec.slice(1);
            }
            // this.log(new Int32Array(dec.buffer));

            if (resolver) {
                resolver(dec.buffer);
            } else {
                if (_this2._networkCallback) {
                    _this2._networkCallback({ data: dec.buffer });
                } else {
                    console.error('Nobody waiting...');
                }
            }
        }
    });

    this._openResolver = null;
    this._openPromise = new Promise(function (res, rej) {
        _this2._openResolver = res;
    });

    this._socket.onopen = function (event) {
        _this2.log('opened', event);
        _this2.setupObfuscation();
        _this2._openResolver();
    };

    this._socket.onclose = function (event) {
        _this2.log('closed', event);
        _this2.reconnect(event);
    };

    this._socket.onerror = function (event) {
        _this2.log('error', event);
        _this2.reconnect(event);
    };

    // setTimeout(()=>{
    //     this._socket.close();
    // }, 5000+Math.random()*5000);
};

WSocket.prototype.setupObfuscation = function () {
    var random = new Uint8Array(64);
    // new SecureRandom().nextBytes(random);

    // protocol
    random[56] = 0xef;
    random[57] = 0xef;
    random[58] = 0xef;
    random[59] = 0xef;

    var reversed = random.slice();
    reversed = reversed.reverse();

    var encrypt_key = random.slice(8, 40);
    var encrypt_iv = random.slice(40, 56);
    var decrypt_key = reversed.slice(8, 40);
    var decrypt_iv = reversed.slice(40, 56);

    this._encryptor = new _aes.ModeOfOperationCTR(encrypt_key, encrypt_iv); // aesEncryptor(encrypt_key, encrypt_iv);
    this._decryptor = new _aes.ModeOfOperationCTR(decrypt_key, decrypt_iv);

    var enc = this._encryptor.encrypt(random);

    random[56] = enc[56];
    random[57] = enc[57];
    random[58] = enc[58];
    random[59] = enc[59];

    this._socket.send(random);
};

WSocket.prototype.log = function (str, e) {
    console.warn('ws (' + this._dcId + '): ', str, e);
};

WSocket.prototype.setCallback = function (networkCallback) {
    this._networkCallback = networkCallback;
};

WSocket.prototype.send = function (data) {var _this3 = this;
    return new Promise(function (resolve, reject) {
        _this3._openPromise.
        then(function () {
            var incomePromise = new Promise(function (res, rej) {
                _this3._incomePromiseResolvers.push(res);
            });
            var mData = new Uint8Array(data.buffer);
            var length = mData.length / 4;

            var lenA = null;new Uint8Array(mData.length + 1);
            if (length < 0x7e) {
                lenA = new Uint8Array(mData.length + 1);
                lenA.set(mData, 1);
                lenA[0] = length;
            } else {
                lenA = new Uint8Array(mData.length + 4);
                lenA.set(mData, 4);
                lenA[0] = 0x7f;
                lenA[1] = length & 0xFF;
                lenA[2] = length >> 8 & 0xFF;
                lenA[3] = length >> 16 & 0xFF;
            }

            var enc = _this3._encryptor.encrypt(lenA);

            try {
                _this3._socket.send(enc);
            } catch (e) {
                _this3._socket.emit('error', e);
            }

            return incomePromise;
        }).
        then(function (data) {
            resolve(data);
        });
    });
};

// class WSocket {
//     constructor(url) {
//     }

//     log(str, e) {
//     }

//     async send(data) {
//         await this._openPromise;

//         const incomePromise = new Promise((res, rej)=>{
//             this._incomePromiseResolvers.push(res);
//         });

//         this._socket.send(data);
//         const res = await incomePromise;
//     }
// };

var flushSockets = exports.flushSockets = function flushSockets(url, dcId) {
    console.error('Flush sockets');
    if (!url) {
        for (var u in websockets) {
            websockets[u].close();
        }
        websockets = {};
    } else {
        // if (websockets[url]) {
        //     websockets[url].close();
        // }
        websockets[url + dcId] = undefined;
    }
};

var networkRequest = exports.networkRequest = function networkRequest(url, dcId, requestData, networkCallback) {
    try {
        // determine if url is for websocket
        if (url.indexOf('apiws') != -1 || url.indexOf('apis') != -1) {
            // going to use websocket
            if (websockets[url + dcId]) {
                // already have websocket for this url
            } else {
                console.log('Connecting to ', url, 'dcId', dcId);
                var socket = new WSocket(url, dcId);
                websockets[url + dcId] = socket;
            }

            return new Promise(function (resolve, reject) {
                if (networkCallback) {
                    websockets[url + dcId].setCallback(networkCallback);
                }
                websockets[url + dcId].send(requestData).
                then(function (data) {
                    resolve({ data: data });
                });
            });

        } else {
            // going to use http/https queries
            //
            return new Promise(function (resolve, reject) {
                var oReq = new XMLHttpRequest();
                oReq.responseType = "arraybuffer";
                oReq.open("POST", url);

                oReq.onload = function (oEvent) {
                    var arrayBuffer = oReq.response; // Note: not oReq.responseText
                    oReq.abort();
                    if (arrayBuffer) {
                        var byteArray = new Uint8Array(arrayBuffer);
                        resolve({ data: byteArray.buffer });
                    }
                };

                oReq.send(requestData);
            });
        }
    } catch (e) {
        console.log(e);
    }

};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.















BigInteger = BigInteger;exports.



































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































SecureRandom = SecureRandom; // Copyright (c) 2005  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.
// Basic JavaScript BN library - subset useful for RSA encryption.
var navigator = {}; // Bits per digit
var dbits; // JavaScript engine analysis
var canary = 0xdeadbeefcafe;var j_lm = (canary & 0xffffff) == 0xefcafe; // (public) Constructor
function BigInteger(a, b, c) {if (a != null) if ("number" == typeof a) this.fromNumber(a, b, c);else if (b == null && "string" != typeof a) this.fromString(a, 256);else this.fromString(a, b);} // return new, unset BigInteger
function nbi() {return new BigInteger(null);} // am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.
// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i, x, w, j, c, n) {while (--n >= 0) {var v = x * this[i++] + w[j] + c;c = Math.floor(v / 0x4000000);w[j++] = v & 0x3ffffff;}return c;} // am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i, x, w, j, c, n) {var xl = x & 0x7fff,xh = x >> 15;while (--n >= 0) {var l = this[i] & 0x7fff;var h = this[i++] >> 15;var m = xh * l + h * xl;l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);w[j++] = l & 0x3fffffff;}return c;} // Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i, x, w, j, c, n) {var xl = x & 0x3fff,xh = x >> 14;while (--n >= 0) {var l = this[i] & 0x3fff;var h = this[i++] >> 14;var m = xh * l + h * xl;l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;c = (l >> 28) + (m >> 14) + xh * h;w[j++] = l & 0xfffffff;}return c;}if (j_lm && navigator.appName == "Microsoft Internet Explorer") {BigInteger.prototype.am = am2;dbits = 30;} else if (j_lm && navigator.appName != "Netscape") {BigInteger.prototype.am = am1;dbits = 26;} else {// Mozilla/Netscape seems to prefer am3
  BigInteger.prototype.am = am3;dbits = 28;}BigInteger.prototype.DB = dbits;BigInteger.prototype.DM = (1 << dbits) - 1;BigInteger.prototype.DV = 1 << dbits;var BI_FP = 52;BigInteger.prototype.FV = Math.pow(2, BI_FP);BigInteger.prototype.F1 = BI_FP - dbits;BigInteger.prototype.F2 = 2 * dbits - BI_FP; // Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";var BI_RC = new Array();var rr, vv;rr = "0".charCodeAt(0);for (vv = 0; vv <= 9; ++vv) {BI_RC[rr++] = vv;}rr = "a".charCodeAt(0);for (vv = 10; vv < 36; ++vv) {BI_RC[rr++] = vv;}rr = "A".charCodeAt(0);for (vv = 10; vv < 36; ++vv) {BI_RC[rr++] = vv;}function int2char(n) {return BI_RM.charAt(n);}function intAt(s, i) {var c = BI_RC[s.charCodeAt(i)];return c == null ? -1 : c;} // (protected) copy this to r
function bnpCopyTo(r) {for (var i = this.t - 1; i >= 0; --i) {r[i] = this[i];}r.t = this.t;r.s = this.s;} // (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {this.t = 1;this.s = x < 0 ? -1 : 0;if (x > 0) this[0] = x;else if (x < -1) this[0] = x + this.DV;else this.t = 0;} // return bigint initialized to value
function nbv(i) {var r = nbi();r.fromInt(i);return r;} // (protected) set from string and radix
function bnpFromString(s, b, signed) {var k;if (b == 16) k = 4;else if (b == 8) k = 3;else if (b == 256) k = 8; // byte array
  else if (b == 2) k = 1;else if (b == 32) k = 5;else if (b == 4) k = 2;else {this.fromRadix(s, b);return;}this.t = 0;this.s = 0;var i = s.length,mi = false,sh = 0;while (--i >= 0) {var x = k == 8 ? s[i] & 0xff : intAt(s, i);if (x < 0) {if (s.charAt(i) == "-") mi = true;continue;}mi = false;if (sh == 0) this[this.t++] = x;else if (sh + k > this.DB) {this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;this[this.t++] = x >> this.DB - sh;} else this[this.t - 1] |= x << sh;sh += k;if (sh >= this.DB) sh -= this.DB;} // Disabled due to '-' prefix in toString
  if (k == 8 && (s[0] & 0x80) != 0 && signed) {this.s = -1;if (sh > 0) this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;}this.clamp();if (mi) BigInteger.ZERO.subTo(this, this);} // (protected) clamp off excess high words
function bnpClamp() {var c = this.s & this.DM;while (this.t > 0 && this[this.t - 1] == c) {--this.t;}} // (public) return string representation in given radix
function bnToString(b) {if (this.s < 0) return "-" + this.negate().toString(b);var k;if (b == 16) k = 4;else if (b == 8) k = 3;else if (b == 2) k = 1;else if (b == 32) k = 5;else if (b == 4) k = 2;else return this.toRadix(b);var km = (1 << k) - 1,d,m = false,r = "",i = this.t;var p = this.DB - i * this.DB % k;if (i-- > 0) {if (p < this.DB && (d = this[i] >> p) > 0) {m = true;r = int2char(d);}while (i >= 0) {if (p < k) {d = (this[i] & (1 << p) - 1) << k - p;d |= this[--i] >> (p += this.DB - k);} else {d = this[i] >> (p -= k) & km;if (p <= 0) {p += this.DB;--i;}}if (d > 0) m = true;if (m) r += int2char(d);}}return m ? r : "0";} // (public) -this
function bnNegate() {var r = nbi();BigInteger.ZERO.subTo(this, r);return r;} // (public) |this|
function bnAbs() {return this.s < 0 ? this.negate() : this;} // (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {var r = this.s - a.s;if (r != 0) return r;var i = this.t;r = i - a.t;if (r != 0) return this.s < 0 ? -r : r;while (--i >= 0) {if ((r = this[i] - a[i]) != 0) return r;}return 0;} // returns bit length of the integer x
function nbits(x) {var r = 1,t;if ((t = x >>> 16) != 0) {x = t;r += 16;}if ((t = x >> 8) != 0) {x = t;r += 8;}if ((t = x >> 4) != 0) {x = t;r += 4;}if ((t = x >> 2) != 0) {x = t;r += 2;}if ((t = x >> 1) != 0) {x = t;r += 1;}return r;} // (public) return the number of bits in "this"
function bnBitLength() {if (this.t <= 0) return 0;return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);} // (protected) r = this << n*DB
function bnpDLShiftTo(n, r) {var i;for (i = this.t - 1; i >= 0; --i) {r[i + n] = this[i];}for (i = n - 1; i >= 0; --i) {r[i] = 0;}r.t = this.t + n;r.s = this.s;} // (protected) r = this >> n*DB
function bnpDRShiftTo(n, r) {for (var i = n; i < this.t; ++i) {r[i - n] = this[i];}r.t = Math.max(this.t - n, 0);r.s = this.s;} // (protected) r = this << n
function bnpLShiftTo(n, r) {var bs = n % this.DB;var cbs = this.DB - bs;var bm = (1 << cbs) - 1;var ds = Math.floor(n / this.DB),c = this.s << bs & this.DM,i;for (i = this.t - 1; i >= 0; --i) {r[i + ds + 1] = this[i] >> cbs | c;c = (this[i] & bm) << bs;}for (i = ds - 1; i >= 0; --i) {r[i] = 0;}r[ds] = c;r.t = this.t + ds + 1;r.s = this.s;r.clamp();} // (protected) r = this >> n
function bnpRShiftTo(n, r) {r.s = this.s;var ds = Math.floor(n / this.DB);if (ds >= this.t) {r.t = 0;return;}var bs = n % this.DB;var cbs = this.DB - bs;var bm = (1 << bs) - 1;r[0] = this[ds] >> bs;for (var i = ds + 1; i < this.t; ++i) {r[i - ds - 1] |= (this[i] & bm) << cbs;r[i - ds] = this[i] >> bs;}if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;r.t = this.t - ds;r.clamp();} // (protected) r = this - a
function bnpSubTo(a, r) {var i = 0,c = 0,m = Math.min(a.t, this.t);while (i < m) {c += this[i] - a[i];r[i++] = c & this.DM;c >>= this.DB;}if (a.t < this.t) {c -= a.s;while (i < this.t) {c += this[i];r[i++] = c & this.DM;c >>= this.DB;}c += this.s;} else {c += this.s;while (i < a.t) {c -= a[i];r[i++] = c & this.DM;c >>= this.DB;}c -= a.s;}r.s = c < 0 ? -1 : 0;if (c < -1) r[i++] = this.DV + c;else if (c > 0) r[i++] = c;r.t = i;r.clamp();} // (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a, r) {var x = this.abs(),y = a.abs();var i = x.t;r.t = i + y.t;while (--i >= 0) {r[i] = 0;}for (i = 0; i < y.t; ++i) {r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);}r.s = 0;r.clamp();if (this.s != a.s) BigInteger.ZERO.subTo(r, r);} // (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {var x = this.abs();var i = r.t = 2 * x.t;while (--i >= 0) {r[i] = 0;}for (i = 0; i < x.t - 1; ++i) {var c = x.am(i, x[i], r, 2 * i, 0, 1);if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {r[i + x.t] -= x.DV;r[i + x.t + 1] = 1;}}if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);r.s = 0;r.clamp();} // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m, q, r) {var pm = m.abs();if (pm.t <= 0) return;var pt = this.abs();if (pt.t < pm.t) {if (q != null) q.fromInt(0);if (r != null) this.copyTo(r);return;}if (r == null) r = nbi();var y = nbi(),ts = this.s,ms = m.s;var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
  if (nsh > 0) {pm.lShiftTo(nsh, y);pt.lShiftTo(nsh, r);} else {pm.copyTo(y);pt.copyTo(r);}var ys = y.t;var y0 = y[ys - 1];if (y0 == 0) return;var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);var d1 = this.FV / yt,d2 = (1 << this.F1) / yt,e = 1 << this.F2;var i = r.t,j = i - ys,t = q == null ? nbi() : q;y.dlShiftTo(j, t);if (r.compareTo(t) >= 0) {r[r.t++] = 1;r.subTo(t, r);}BigInteger.ONE.dlShiftTo(ys, t);t.subTo(y, y); // "negative" y so we can replace sub with am later
  while (y.t < ys) {y[y.t++] = 0;}while (--j >= 0) {// Estimate quotient digit
    var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {// Try it out
      y.dlShiftTo(j, t);r.subTo(t, r);while (r[i] < --qd) {r.subTo(t, r);}}}if (q != null) {r.drShiftTo(ys, q);if (ts != ms) BigInteger.ZERO.subTo(q, q);}r.t = ys;r.clamp();if (nsh > 0) r.rShiftTo(nsh, r); // Denormalize remainder
  if (ts < 0) BigInteger.ZERO.subTo(r, r);} // (public) this mod a
function bnMod(a) {var r = nbi();this.abs().divRemTo(a, null, r);if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);return r;} // Modular reduction using "classic" algorithm
function Classic(m) {this.m = m;}function cConvert(x) {if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);else return x;}function cRevert(x) {return x;}function cReduce(x) {x.divRemTo(this.m, null, x);}function cMulTo(x, y, r) {x.multiplyTo(y, r);this.reduce(r);}function cSqrTo(x, r) {x.squareTo(r);this.reduce(r);}Classic.prototype.convert = cConvert;Classic.prototype.revert = cRevert;Classic.prototype.reduce = cReduce;Classic.prototype.mulTo = cMulTo;Classic.prototype.sqrTo = cSqrTo; // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {if (this.t < 1) return 0;var x = this[0];if ((x & 1) == 0) return 0;var y = x & 3; // y == 1/x mod 2^2
  y = y * (2 - (x & 0xf) * y) & 0xf; // y == 1/x mod 2^4
  y = y * (2 - (x & 0xff) * y) & 0xff; // y == 1/x mod 2^8
  y = y * (2 - ((x & 0xffff) * y & 0xffff)) & 0xffff; // y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly;
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
  y = y * (2 - x * y % this.DV) % this.DV; // y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV
  return y > 0 ? this.DV - y : -y;} // Montgomery reduction
function Montgomery(m) {this.m = m;this.mp = m.invDigit();this.mpl = this.mp & 0x7fff;this.mph = this.mp >> 15;this.um = (1 << m.DB - 15) - 1;this.mt2 = 2 * m.t;} // xR mod m
function montConvert(x) {var r = nbi();x.abs().dlShiftTo(this.m.t, r);r.divRemTo(this.m, null, r);if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);return r;} // x/R mod m
function montRevert(x) {var r = nbi();x.copyTo(r);this.reduce(r);return r;} // x = x/R mod m (HAC 14.32)
function montReduce(x) {while (x.t <= this.mt2) {// pad x so am has enough room later
    x[x.t++] = 0;}for (var i = 0; i < this.m.t; ++i) {// faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i] & 0x7fff;var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM; // use am to combine the multiply-shift-add into one call
    j = i + this.m.t;x[j] += this.m.am(0, u0, x, i, 0, this.m.t); // propagate carry
    while (x[j] >= x.DV) {x[j] -= x.DV;x[++j]++;}}x.clamp();x.drShiftTo(this.m.t, x);if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);} // r = "x^2/R mod m"; x != r
function montSqrTo(x, r) {x.squareTo(r);this.reduce(r);} // r = "xy/R mod m"; x,y != r
function montMulTo(x, y, r) {x.multiplyTo(y, r);this.reduce(r);}Montgomery.prototype.convert = montConvert;Montgomery.prototype.revert = montRevert;Montgomery.prototype.reduce = montReduce;Montgomery.prototype.mulTo = montMulTo;Montgomery.prototype.sqrTo = montSqrTo; // (protected) true iff this is even
function bnpIsEven() {return (this.t > 0 ? this[0] & 1 : this.s) == 0;} // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e, z) {if (e > 0xffffffff || e < 1) return BigInteger.ONE;var r = nbi(),r2 = nbi(),g = z.convert(this),i = nbits(e) - 1;g.copyTo(r);while (--i >= 0) {z.sqrTo(r, r2);if ((e & 1 << i) > 0) z.mulTo(r2, g, r);else {var t = r;r = r2;r2 = t;}}return z.revert(r);} // (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e, m) {var z;if (e < 256 || m.isEven()) z = new Classic(m);else z = new Montgomery(m);return this.exp(e, z);} // protected
BigInteger.prototype.copyTo = bnpCopyTo;BigInteger.prototype.fromInt = bnpFromInt;BigInteger.prototype.fromString = bnpFromString;BigInteger.prototype.clamp = bnpClamp;BigInteger.prototype.dlShiftTo = bnpDLShiftTo;BigInteger.prototype.drShiftTo = bnpDRShiftTo;BigInteger.prototype.lShiftTo = bnpLShiftTo;BigInteger.prototype.rShiftTo = bnpRShiftTo;BigInteger.prototype.subTo = bnpSubTo;BigInteger.prototype.multiplyTo = bnpMultiplyTo;BigInteger.prototype.squareTo = bnpSquareTo;BigInteger.prototype.divRemTo = bnpDivRemTo;BigInteger.prototype.invDigit = bnpInvDigit;BigInteger.prototype.isEven = bnpIsEven;BigInteger.prototype.exp = bnpExp; // public
BigInteger.prototype.toString = bnToString;BigInteger.prototype.negate = bnNegate;BigInteger.prototype.abs = bnAbs;BigInteger.prototype.compareTo = bnCompareTo;BigInteger.prototype.bitLength = bnBitLength;BigInteger.prototype.mod = bnMod;BigInteger.prototype.modPowInt = bnModPowInt; // "constants"
BigInteger.ZERO = nbv(0);BigInteger.ONE = nbv(1); // Copyright (c) 2005-2009  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.
// Extended JavaScript BN functions, required for RSA private ops.
// Version 1.1: new BigInteger("0", 10) returns "proper" zero
// Version 1.2: square() API, isProbablePrime fix
// (public)
function bnClone() {var r = nbi();this.copyTo(r);return r;} // (public) return value as integer
function bnIntValue() {if (this.s < 0) {if (this.t == 1) return this[0] - this.DV;else if (this.t == 0) return -1;} else if (this.t == 1) return this[0];else if (this.t == 0) return 0; // assumes 16 < DB < 32
  return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];} // (public) return value as byte
function bnByteValue() {return this.t == 0 ? this.s : this[0] << 24 >> 24;} // (public) return value as short (assumes DB>=16)
function bnShortValue() {return this.t == 0 ? this.s : this[0] << 16 >> 16;} // (protected) return x s.t. r^x < DV
function bnpChunkSize(r) {return Math.floor(Math.LN2 * this.DB / Math.log(r));} // (public) 0 if this == 0, 1 if this > 0
function bnSigNum() {if (this.s < 0) return -1;else if (this.t <= 0 || this.t == 1 && this[0] <= 0) return 0;else return 1;} // (protected) convert to radix string
function bnpToRadix(b) {if (b == null) b = 10;if (this.signum() == 0 || b < 2 || b > 36) return "0";var cs = this.chunkSize(b);var a = Math.pow(b, cs);var d = nbv(a),y = nbi(),z = nbi(),r = "";this.divRemTo(d, y, z);while (y.signum() > 0) {r = (a + z.intValue()).toString(b).substr(1) + r;y.divRemTo(d, y, z);}return z.intValue().toString(b) + r;} // (protected) convert from radix string
function bnpFromRadix(s, b) {this.fromInt(0);if (b == null) b = 10;var cs = this.chunkSize(b);var d = Math.pow(b, cs),mi = false,j = 0,w = 0;for (var i = 0; i < s.length; ++i) {var x = intAt(s, i);if (x < 0) {if (s.charAt(i) == "-" && this.signum() == 0) mi = true;continue;}w = b * w + x;if (++j >= cs) {this.dMultiply(d);this.dAddOffset(w, 0);j = 0;w = 0;}}if (j > 0) {this.dMultiply(Math.pow(b, j));this.dAddOffset(w, 0);}if (mi) BigInteger.ZERO.subTo(this, this);} // (protected) alternate constructor
function bnpFromNumber(a, b, c) {if ("number" == typeof b) {// new BigInteger(int,int,RNG)
    if (a < 2) this.fromInt(1);else {this.fromNumber(a, c);if (!this.testBit(a - 1)) // force MSB set
        this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);if (this.isEven()) this.dAddOffset(1, 0); // force odd
      while (!this.isProbablePrime(b)) {this.dAddOffset(2, 0);if (this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);}}} else {// new BigInteger(int,RNG)
    var x = new Array(),t = a & 7;x.length = (a >> 3) + 1;b.nextBytes(x);if (t > 0) x[0] &= (1 << t) - 1;else x[0] = 0;this.fromString(x, 256);}} // (public) convert to bigendian byte array
function bnToByteArray(signed) {var i = this.t,r = new Array();r[0] = this.s;var p = this.DB - i * this.DB % 8,d,k = 0;if (i-- > 0) {if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) r[k++] = d | this.s << this.DB - p;while (i >= 0) {if (p < 8) {d = (this[i] & (1 << p) - 1) << 8 - p;d |= this[--i] >> (p += this.DB - 8);} else {d = this[i] >> (p -= 8) & 0xff;if (p <= 0) {p += this.DB;--i;}}if (signed && (d & 0x80) != 0) d |= -256;if (k == 0 && (this.s & 0x80) != (d & 0x80)) ++k;if (k > 0 || d != this.s) r[k++] = d;}}return r;}function bnEquals(a) {return this.compareTo(a) == 0;}function bnMin(a) {return this.compareTo(a) < 0 ? this : a;}function bnMax(a) {return this.compareTo(a) > 0 ? this : a;} // (protected) r = this op a (bitwise)
function bnpBitwiseTo(a, op, r) {var i,f,m = Math.min(a.t, this.t);for (i = 0; i < m; ++i) {r[i] = op(this[i], a[i]);}if (a.t < this.t) {f = a.s & this.DM;for (i = m; i < this.t; ++i) {r[i] = op(this[i], f);}r.t = this.t;} else {f = this.s & this.DM;for (i = m; i < a.t; ++i) {r[i] = op(f, a[i]);}r.t = a.t;}r.s = op(this.s, a.s);r.clamp();} // (public) this & a
function op_and(x, y) {return x & y;}function bnAnd(a) {var r = nbi();this.bitwiseTo(a, op_and, r);return r;} // (public) this | a
function op_or(x, y) {return x | y;}function bnOr(a) {var r = nbi();this.bitwiseTo(a, op_or, r);return r;} // (public) this ^ a
function op_xor(x, y) {return x ^ y;}function bnXor(a) {var r = nbi();this.bitwiseTo(a, op_xor, r);return r;} // (public) this & ~a
function op_andnot(x, y) {return x & ~y;}function bnAndNot(a) {var r = nbi();this.bitwiseTo(a, op_andnot, r);return r;} // (public) ~this
function bnNot() {var r = nbi();for (var i = 0; i < this.t; ++i) {r[i] = this.DM & ~this[i];}r.t = this.t;r.s = ~this.s;return r;} // (public) this << n
function bnShiftLeft(n) {var r = nbi();if (n < 0) this.rShiftTo(-n, r);else this.lShiftTo(n, r);return r;} // (public) this >> n
function bnShiftRight(n) {var r = nbi();if (n < 0) this.lShiftTo(-n, r);else this.rShiftTo(n, r);return r;} // return index of lowest 1-bit in x, x < 2^31
function lbit(x) {if (x == 0) return -1;var r = 0;if ((x & 0xffff) == 0) {x >>= 16;r += 16;}if ((x & 0xff) == 0) {x >>= 8;r += 8;}if ((x & 0xf) == 0) {x >>= 4;r += 4;}if ((x & 3) == 0) {x >>= 2;r += 2;}if ((x & 1) == 0) ++r;return r;} // (public) returns index of lowest 1-bit (or -1 if none)
function bnGetLowestSetBit() {for (var i = 0; i < this.t; ++i) {if (this[i] != 0) return i * this.DB + lbit(this[i]);}if (this.s < 0) return this.t * this.DB;return -1;} // return number of 1 bits in x
function cbit(x) {var r = 0;while (x != 0) {x &= x - 1;++r;}return r;} // (public) return number of set bits
function bnBitCount() {var r = 0,x = this.s & this.DM;for (var i = 0; i < this.t; ++i) {r += cbit(this[i] ^ x);}return r;} // (public) true iff nth bit is set
function bnTestBit(n) {var j = Math.floor(n / this.DB);if (j >= this.t) return this.s != 0;return (this[j] & 1 << n % this.DB) != 0;} // (protected) this op (1<<n)
function bnpChangeBit(n, op) {var r = BigInteger.ONE.shiftLeft(n);this.bitwiseTo(r, op, r);return r;} // (public) this | (1<<n)
function bnSetBit(n) {return this.changeBit(n, op_or);} // (public) this & ~(1<<n)
function bnClearBit(n) {return this.changeBit(n, op_andnot);} // (public) this ^ (1<<n)
function bnFlipBit(n) {return this.changeBit(n, op_xor);} // (protected) r = this + a
function bnpAddTo(a, r) {var i = 0,c = 0,m = Math.min(a.t, this.t);while (i < m) {c += this[i] + a[i];r[i++] = c & this.DM;c >>= this.DB;}if (a.t < this.t) {c += a.s;while (i < this.t) {c += this[i];r[i++] = c & this.DM;c >>= this.DB;}c += this.s;} else {c += this.s;while (i < a.t) {c += a[i];r[i++] = c & this.DM;c >>= this.DB;}c += a.s;}r.s = c < 0 ? -1 : 0;if (c > 0) r[i++] = c;else if (c < -1) r[i++] = this.DV + c;r.t = i;r.clamp();} // (public) this + a
function bnAdd(a) {var r = nbi();this.addTo(a, r);return r;} // (public) this - a
function bnSubtract(a) {var r = nbi();this.subTo(a, r);return r;} // (public) this * a
function bnMultiply(a) {var r = nbi();this.multiplyTo(a, r);return r;} // (public) this^2
function bnSquare() {var r = nbi();this.squareTo(r);return r;} // (public) this / a
function bnDivide(a) {var r = nbi();this.divRemTo(a, r, null);return r;} // (public) this % a
function bnRemainder(a) {var r = nbi();this.divRemTo(a, null, r);return r;} // (public) [this/a,this%a]
function bnDivideAndRemainder(a) {var q = nbi(),r = nbi();this.divRemTo(a, q, r);return new Array(q, r);} // (protected) this *= n, this >= 0, 1 < n < DV
function bnpDMultiply(n) {this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);++this.t;this.clamp();} // (protected) this += n << w words, this >= 0
function bnpDAddOffset(n, w) {if (n == 0) return;while (this.t <= w) {this[this.t++] = 0;}this[w] += n;while (this[w] >= this.DV) {this[w] -= this.DV;if (++w >= this.t) this[this.t++] = 0;++this[w];}} // A "null" reducer
function NullExp() {}function nNop(x) {return x;}function nMulTo(x, y, r) {x.multiplyTo(y, r);}function nSqrTo(x, r) {x.squareTo(r);}NullExp.prototype.convert = nNop;NullExp.prototype.revert = nNop;NullExp.prototype.mulTo = nMulTo;NullExp.prototype.sqrTo = nSqrTo; // (public) this^e
function bnPow(e) {return this.exp(e, new NullExp());} // (protected) r = lower n words of "this * a", a.t <= n
// "this" should be the larger one if appropriate.
function bnpMultiplyLowerTo(a, n, r) {var i = Math.min(this.t + a.t, n);r.s = 0; // assumes a,this >= 0
  r.t = i;while (i > 0) {r[--i] = 0;}var j;for (j = r.t - this.t; i < j; ++i) {r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);}for (j = Math.min(a.t, n); i < j; ++i) {this.am(0, a[i], r, i, 0, n - i);}r.clamp();} // (protected) r = "this * a" without lower n words, n > 0
// "this" should be the larger one if appropriate.
function bnpMultiplyUpperTo(a, n, r) {--n;var i = r.t = this.t + a.t - n;r.s = 0; // assumes a,this >= 0
  while (--i >= 0) {r[i] = 0;}for (i = Math.max(n - this.t, 0); i < a.t; ++i) {r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);}r.clamp();r.drShiftTo(1, r);} // Barrett modular reduction
function Barrett(m) {// setup Barrett
  this.r2 = nbi();this.q3 = nbi();BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);this.mu = this.r2.divide(m);this.m = m;}function barrettConvert(x) {if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);else if (x.compareTo(this.m) < 0) return x;else {var r = nbi();x.copyTo(r);this.reduce(r);return r;}}function barrettRevert(x) {return x;} // x = x mod m (HAC 14.42)
function barrettReduce(x) {x.drShiftTo(this.m.t - 1, this.r2);if (x.t > this.m.t + 1) {x.t = this.m.t + 1;x.clamp();}this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);while (x.compareTo(this.r2) < 0) {x.dAddOffset(1, this.m.t + 1);}x.subTo(this.r2, x);while (x.compareTo(this.m) >= 0) {x.subTo(this.m, x);}} // r = x^2 mod m; x != r
function barrettSqrTo(x, r) {x.squareTo(r);this.reduce(r);} // r = x*y mod m; x,y != r
function barrettMulTo(x, y, r) {x.multiplyTo(y, r);this.reduce(r);}Barrett.prototype.convert = barrettConvert;Barrett.prototype.revert = barrettRevert;Barrett.prototype.reduce = barrettReduce;Barrett.prototype.mulTo = barrettMulTo;Barrett.prototype.sqrTo = barrettSqrTo; // (public) this^e % m (HAC 14.85)
function bnModPow(e, m) {var i = e.bitLength(),k,r = nbv(1),z;if (i <= 0) return r;else if (i < 18) k = 1;else if (i < 48) k = 3;else if (i < 144) k = 4;else if (i < 768) k = 5;else k = 6;if (i < 8) z = new Classic(m);else if (m.isEven()) z = new Barrett(m);else z = new Montgomery(m); // precomputation
  var g = new Array(),n = 3,k1 = k - 1,km = (1 << k) - 1;g[1] = z.convert(this);if (k > 1) {var g2 = nbi();z.sqrTo(g[1], g2);while (n <= km) {g[n] = nbi();z.mulTo(g2, g[n - 2], g[n]);n += 2;}}var j = e.t - 1,w,is1 = true,r2 = nbi(),t;i = nbits(e[j]) - 1;while (j >= 0) {if (i >= k1) w = e[j] >> i - k1 & km;else {w = (e[j] & (1 << i + 1) - 1) << k1 - i;if (j > 0) w |= e[j - 1] >> this.DB + i - k1;}n = k;while ((w & 1) == 0) {w >>= 1;--n;}if ((i -= n) < 0) {i += this.DB;--j;}if (is1) {// ret == 1, don't bother squaring or multiplying it
      g[w].copyTo(r);is1 = false;} else {while (n > 1) {z.sqrTo(r, r2);z.sqrTo(r2, r);n -= 2;}if (n > 0) z.sqrTo(r, r2);else {t = r;r = r2;r2 = t;}z.mulTo(r2, g[w], r);}while (j >= 0 && (e[j] & 1 << i) == 0) {z.sqrTo(r, r2);t = r;r = r2;r2 = t;if (--i < 0) {i = this.DB - 1;--j;}}}return z.revert(r);} // (public) gcd(this,a) (HAC 14.54)
function bnGCD(a) {var x = this.s < 0 ? this.negate() : this.clone();var y = a.s < 0 ? a.negate() : a.clone();if (x.compareTo(y) < 0) {var t = x;x = y;y = t;}var i = x.getLowestSetBit(),g = y.getLowestSetBit();if (g < 0) return x;if (i < g) g = i;if (g > 0) {x.rShiftTo(g, x);y.rShiftTo(g, y);}while (x.signum() > 0) {if ((i = x.getLowestSetBit()) > 0) x.rShiftTo(i, x);if ((i = y.getLowestSetBit()) > 0) y.rShiftTo(i, y);if (x.compareTo(y) >= 0) {x.subTo(y, x);x.rShiftTo(1, x);} else {y.subTo(x, y);y.rShiftTo(1, y);}}if (g > 0) y.lShiftTo(g, y);return y;} // (protected) this % n, n < 2^26
function bnpModInt(n) {if (n <= 0) return 0;var d = this.DV % n,r = this.s < 0 ? n - 1 : 0;if (this.t > 0) if (d == 0) r = this[0] % n;else for (var i = this.t - 1; i >= 0; --i) {r = (d * r + this[i]) % n;}return r;} // (public) 1/this % m (HAC 14.61)
function bnModInverse(m) {var ac = m.isEven();if (this.isEven() && ac || m.signum() == 0) return BigInteger.ZERO;var u = m.clone(),v = this.clone();var a = nbv(1),b = nbv(0),c = nbv(0),d = nbv(1);while (u.signum() != 0) {while (u.isEven()) {u.rShiftTo(1, u);if (ac) {if (!a.isEven() || !b.isEven()) {a.addTo(this, a);b.subTo(m, b);}a.rShiftTo(1, a);} else if (!b.isEven()) b.subTo(m, b);b.rShiftTo(1, b);}while (v.isEven()) {v.rShiftTo(1, v);if (ac) {if (!c.isEven() || !d.isEven()) {c.addTo(this, c);d.subTo(m, d);}c.rShiftTo(1, c);} else if (!d.isEven()) d.subTo(m, d);d.rShiftTo(1, d);}if (u.compareTo(v) >= 0) {u.subTo(v, u);if (ac) a.subTo(c, a);b.subTo(d, b);} else {v.subTo(u, v);if (ac) c.subTo(a, c);d.subTo(b, d);}}if (v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;if (d.compareTo(m) >= 0) return d.subtract(m);if (d.signum() < 0) d.addTo(m, d);else return d;if (d.signum() < 0) return d.add(m);else return d;}var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];var lplim = (1 << 26) / lowprimes[lowprimes.length - 1]; // (public) test primality with certainty >= 1-.5^t
function bnIsProbablePrime(t) {var i,x = this.abs();if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {for (i = 0; i < lowprimes.length; ++i) {if (x[0] == lowprimes[i]) return true;}return false;}if (x.isEven()) return false;i = 1;while (i < lowprimes.length) {var m = lowprimes[i],j = i + 1;while (j < lowprimes.length && m < lplim) {m *= lowprimes[j++];}m = x.modInt(m);while (i < j) {if (m % lowprimes[i++] == 0) return false;}}return x.millerRabin(t);} // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
function bnpMillerRabin(t) {var n1 = this.subtract(BigInteger.ONE);var k = n1.getLowestSetBit();if (k <= 0) return false;var r = n1.shiftRight(k);t = t + 1 >> 1;if (t > lowprimes.length) t = lowprimes.length;var a = nbi();for (var i = 0; i < t; ++i) {//Pick bases at random, instead of starting at 2
    a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);var y = a.modPow(r, this);if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {var j = 1;while (j++ < k && y.compareTo(n1) != 0) {y = y.modPowInt(2, this);if (y.compareTo(BigInteger.ONE) == 0) return false;}if (y.compareTo(n1) != 0) return false;}}return true;} // protected
BigInteger.prototype.chunkSize = bnpChunkSize;BigInteger.prototype.toRadix = bnpToRadix;BigInteger.prototype.fromRadix = bnpFromRadix;BigInteger.prototype.fromNumber = bnpFromNumber;BigInteger.prototype.bitwiseTo = bnpBitwiseTo;BigInteger.prototype.changeBit = bnpChangeBit;BigInteger.prototype.addTo = bnpAddTo;BigInteger.prototype.dMultiply = bnpDMultiply;BigInteger.prototype.dAddOffset = bnpDAddOffset;BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;BigInteger.prototype.modInt = bnpModInt;BigInteger.prototype.millerRabin = bnpMillerRabin; // public
BigInteger.prototype.clone = bnClone;BigInteger.prototype.intValue = bnIntValue;BigInteger.prototype.byteValue = bnByteValue;BigInteger.prototype.shortValue = bnShortValue;BigInteger.prototype.signum = bnSigNum;BigInteger.prototype.toByteArray = bnToByteArray;BigInteger.prototype.equals = bnEquals;BigInteger.prototype.min = bnMin;BigInteger.prototype.max = bnMax;BigInteger.prototype.and = bnAnd;BigInteger.prototype.or = bnOr;BigInteger.prototype.xor = bnXor;BigInteger.prototype.andNot = bnAndNot;BigInteger.prototype.not = bnNot;BigInteger.prototype.shiftLeft = bnShiftLeft;BigInteger.prototype.shiftRight = bnShiftRight;BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;BigInteger.prototype.bitCount = bnBitCount;BigInteger.prototype.testBit = bnTestBit;BigInteger.prototype.setBit = bnSetBit;BigInteger.prototype.clearBit = bnClearBit;BigInteger.prototype.flipBit = bnFlipBit;BigInteger.prototype.add = bnAdd;BigInteger.prototype.subtract = bnSubtract;BigInteger.prototype.multiply = bnMultiply;BigInteger.prototype.divide = bnDivide;BigInteger.prototype.remainder = bnRemainder;BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;BigInteger.prototype.modPow = bnModPow;BigInteger.prototype.modInverse = bnModInverse;BigInteger.prototype.pow = bnPow;BigInteger.prototype.gcd = bnGCD;BigInteger.prototype.isProbablePrime = bnIsProbablePrime; // JSBN-specific extension
BigInteger.prototype.square = bnSquare; // BigInteger interfaces not implemented in jsbn:
// BigInteger(int signum, byte[] magnitude)
// double doubleValue()
// float floatValue()
// int hashCode()
// long longValue()
// static BigInteger valueOf(long val)
// Random number generator - requires a PRNG backend, e.g. prng4.js
// For best results, put code like
// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
// in your main HTML document.
var rng_state;var rng_pool;var rng_pptr; // Mix in a 32-bit integer into the pool
function rng_seed_int(x) {rng_pool[rng_pptr++] ^= x & 255;rng_pool[rng_pptr++] ^= x >> 8 & 255;rng_pool[rng_pptr++] ^= x >> 16 & 255;rng_pool[rng_pptr++] ^= x >> 24 & 255;if (rng_pptr >= rng_psize) rng_pptr -= rng_psize;} // Mix in the current time (w/milliseconds) into the pool
function rng_seed_time() {rng_seed_int(new Date().getTime());} // Initialize the pool with junk if needed.
if (rng_pool == null) {rng_pool = new Array();rng_pptr = 0;var global = typeof window !== 'undefined' ? window : undefined;var t;if (global && global.crypto && global.crypto.getRandomValues) {// Use webcrypto if available
    var ua = new Uint8Array(32);global.crypto.getRandomValues(ua);for (t = 0; t < 32; ++t) {rng_pool[rng_pptr++] = ua[t];}}if (navigator.appName == "Netscape" && navigator.appVersion < "5" && global && global.crypto) {// Extract entropy (256 bits) from NS4 RNG if available
    var z = global.crypto.random(32);for (t = 0; t < z.length; ++t) {rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;}}while (rng_pptr < rng_psize) {// extract some randomness from Math.random()
    t = Math.floor(65536 * Math.random());rng_pool[rng_pptr++] = t >>> 8;rng_pool[rng_pptr++] = t & 255;}rng_pptr = 0;rng_seed_time(); //rng_seed_int(window.screenX);
  //rng_seed_int(window.screenY);
}function rng_get_byte() {if (rng_state == null) {rng_seed_time();rng_state = prng_newstate();rng_state.init(rng_pool);for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {rng_pool[rng_pptr] = 0;}rng_pptr = 0; //rng_pool = null;
  } // TODO: allow reseeding after first request
  return rng_state.next();}function rng_get_bytes(ba) {var i;for (i = 0; i < ba.length; ++i) {ba[i] = rng_get_byte();}}function SecureRandom() {}SecureRandom.prototype.nextBytes = rng_get_bytes; // prng4.js - uses Arcfour as a PRNG
function Arcfour() {this.i = 0;this.j = 0;this.S = new Array();} // Initialize arcfour context from key, an array of ints, each from [0..255]
function ARC4init(key) {var i, j, t;for (i = 0; i < 256; ++i) {this.S[i] = i;}j = 0;for (i = 0; i < 256; ++i) {j = j + this.S[i] + key[i % key.length] & 255;t = this.S[i];this.S[i] = this.S[j];this.S[j] = t;}this.i = 0;this.j = 0;}function ARC4next() {var t;this.i = this.i + 1 & 255;this.j = this.j + this.S[this.i] & 255;t = this.S[this.i];this.S[this.i] = this.S[this.j];this.S[this.j] = t;return this.S[t + this.S[this.i] & 255];}Arcfour.prototype.init = ARC4init;Arcfour.prototype.next = ARC4next; // Plug in your RNG constructor here
function prng_newstate() {return new Arcfour();} // Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
var rng_psize = 256;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It isn't worth it to make additional optimizations as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// String encode/decode helpers



var utils = __webpack_require__(0);


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safari
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // On Chrome, the arguments in a function call that are allowed is `65534`.
  // If the length of the buffer is smaller than that, we can use this optimization,
  // otherwise we will take a slower path.
  if (len < 65534) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function (buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function (str) {
  var buf = new utils.Buf8(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function (buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means buffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.auth = exports.flushCachedNetworkers = undefined;var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}; //import requestLib from 'request-promise-native'
var _TL = __webpack_require__(6);
var _Mtp = __webpack_require__(5);
var _Utils = __webpack_require__(2);



var _Services = __webpack_require__(1);
var _network = __webpack_require__(10);

var mtpSendPlainRequest = function mtpSendPlainRequest(dcID, requestBuffer) {return new Promise(function (resolve, reject) {
        var requestLength = requestBuffer.byteLength,
        requestArray = new Int32Array(requestBuffer);

        var header = new _TL.TLSerialization();
        header.storeLongP(0, 0, 'auth_key_id'); // Auth key
        header.storeLong(_Mtp.MtpTimeManager.generateID(), 'msg_id'); // Msg_id
        header.storeInt(requestLength, 'request_length');

        var headerBuffer = header.getBuffer(),
        headerArray = new Int32Array(headerBuffer);
        var headerLength = headerBuffer.byteLength;

        var resultBuffer = new ArrayBuffer(headerLength + requestLength),
        resultArray = new Int32Array(resultBuffer);

        resultArray.set(headerArray);
        resultArray.set(requestArray, headerArray.length);

        var requestData = resultArray;
        var url = _Mtp.MtpDcConfigurator.chooseServer(dcID);
        var baseError = { code: 406, type: 'NETWORK_BAD_RESPONSE', url: url };

        (0, _network.networkRequest)(url, dcID, resultArray).then(function (result) {
            if (!result.data || !result.data.byteLength) {
                reject(baseError);
            }

            var deserializer = new _TL.TLDeserialization(result.data, { mtproto: true });
            var auth_key_id = deserializer.fetchLong('auth_key_id');
            var msg_id = deserializer.fetchLong('msg_id');
            var msg_len = deserializer.fetchInt('msg_len');

            resolve(deserializer);
        }).
        catch(function (err) {reject(_extends({}, baseError, { originalError: err }));});
    });};

function mtpSendReqPQ(auth) {
    var deferred = auth.deferred;

    var request = new _TL.TLSerialization({ mtproto: true });

    request.storeMethod('req_pq', { nonce: auth.nonce });

    //LogService.logVerbose(`[MtpAuthorizer] mtpSendReqPQ() Send req_pq ${bytesToHex(auth.nonce)}`)

    mtpSendPlainRequest(auth.dcID, request.getBuffer()).
    then(function (deserializer) {

        var response = deserializer.fetchObject('ResPQ');

        if (response._ != 'resPQ') {
            throw new Error('[MT] resPQ response invalid: ' + response._);
        }

        if (!(0, _Utils.bytesCmp)(auth.nonce, response.nonce)) {
            throw new Error('[MT] resPQ nonce mismatch');
        }

        auth.serverNonce = response.server_nonce;
        auth.pq = response.pq;
        auth.fingerprints = response.server_public_key_fingerprints;

        //LogService.logVerbose(`[MtpAuthorizer] mtpSendReqPQ() Got ResPQ ${bytesToHex(auth.serverNonce)} ${bytesToHex(auth.pq)} ${auth.fingerprints}`)

        auth.publicKey = _Mtp.MtpRsaKeysManager.select(auth.fingerprints);

        if (!auth.publicKey) {
            throw new Error('[MT] No public key found');
        }

        //LogService.logVerbose(`[MtpAuthorizer] mtpSendReqPQ() 'PQ factorization start ${auth.pq}`)

        var pAndQ = (0, _Utils.pqPrimeFactorization)(auth.pq);

        if (!pAndQ) {
            throw new Error('Error factorizing p and q');
        }

        auth.p = pAndQ[0];
        auth.q = pAndQ[1];

        //LogService.logVerbose(`[MtpAuthorizer] mtpSendReqPQ() 'PQ factorization done ${pAndQ[2]}`)

        mtpSendReqDhParams(auth);
    }).
    catch(function (err) {
        //LogService.logError(`[MtpAuthorizer] mtpSendReqPQ() ${new ErrorResponse(err)}`)
        deferred.reject(err);
    });

    _Mtp.MtpRsaKeysManager.prepare();
}

function mtpSendReqDhParams(auth) {
    var deferred = auth.deferred;

    auth.newNonce = new Array(32);
    new _Utils.SecureRandom().nextBytes(auth.newNonce);

    var data = new _TL.TLSerialization({ mtproto: true });
    data.storeObject({
        _: 'p_q_inner_data',
        pq: auth.pq,
        p: auth.p,
        q: auth.q,
        nonce: auth.nonce,
        server_nonce: auth.serverNonce,
        new_nonce: auth.newNonce },
    'P_Q_inner_data', 'DECRYPTED_DATA');

    var dataWithHash = (0, _Utils.sha1BytesSync)(data.getBuffer()).concat(data.getBytes());

    var request = new _TL.TLSerialization({ mtproto: true });
    request.storeMethod('req_DH_params', {
        nonce: auth.nonce,
        server_nonce: auth.serverNonce,
        p: auth.p,
        q: auth.q,
        public_key_fingerprint: auth.publicKey.fingerprint,
        encrypted_data: (0, _Utils.rsaEncrypt)(auth.publicKey, dataWithHash) });


    //LogService.logVerbose(`[MtpAuthorizer] mtpSendReqDhParams()`)

    mtpSendPlainRequest(auth.dcID, request.getBuffer()).then(function (deserializer) {
        var response = deserializer.fetchObject('Server_DH_Params', 'RESPONSE');

        if (response._ != 'server_DH_params_fail' && response._ != 'server_DH_params_ok') {
            deferred.reject(new Error('[MT] Server_DH_Params response invalid: ' + response._));
            return false;
        }

        if (!(0, _Utils.bytesCmp)(auth.nonce, response.nonce)) {
            deferred.reject(new Error('[MT] Server_DH_Params nonce mismatch'));
            return false;
        }

        if (!(0, _Utils.bytesCmp)(auth.serverNonce, response.server_nonce)) {
            deferred.reject(new Error('[MT] Server_DH_Params server_nonce mismatch'));
            return false;
        }

        if (response._ == 'server_DH_params_fail') {
            var newNonceHash = (0, _Utils.sha1BytesSync)(auth.newNonce).slice(-16);
            if (!(0, _Utils.bytesCmp)(newNonceHash, response.new_nonce_hash)) {
                deferred.reject(new Error('[MT] server_DH_params_fail new_nonce_hash mismatch'));
                return false;
            }
            deferred.reject(new Error('[MT] server_DH_params_fail'));
            return false;
        }

        try {
            mtpDecryptServerDhDataAnswer(auth, response.encrypted_answer);
        } catch (e) {
            deferred.reject(e);
            return false;
        }

        mtpSendSetClientDhParams(auth);
    }, function (error) {
        deferred.reject(error);
    });
}

function mtpDecryptServerDhDataAnswer(auth, encryptedAnswer) {
    auth.localTime = (0, _Utils.tsNow)();

    auth.tmpAesKey = (0, _Utils.sha1BytesSync)(auth.newNonce.concat(auth.serverNonce)).concat((0, _Utils.sha1BytesSync)(auth.serverNonce.concat(auth.newNonce)).slice(0, 12));
    auth.tmpAesIv = (0, _Utils.sha1BytesSync)(auth.serverNonce.concat(auth.newNonce)).slice(12).concat((0, _Utils.sha1BytesSync)([].concat(auth.newNonce, auth.newNonce)), auth.newNonce.slice(0, 4));

    var answerWithHash = (0, _Utils.aesDecryptSync)(encryptedAnswer, auth.tmpAesKey, auth.tmpAesIv);

    var hash = answerWithHash.slice(0, 20);
    var answerWithPadding = answerWithHash.slice(20);
    var buffer = (0, _Utils.bytesToArrayBuffer)(answerWithPadding);

    var deserializer = new _TL.TLDeserialization(buffer, { mtproto: true });
    var response = deserializer.fetchObject('Server_DH_inner_data');

    if (response._ != 'server_DH_inner_data') {
        throw new Error('[MT] server_DH_inner_data response invalid: ' + constructor);
    }

    if (!(0, _Utils.bytesCmp)(auth.nonce, response.nonce)) {
        throw new Error('[MT] server_DH_inner_data nonce mismatch');
    }

    if (!(0, _Utils.bytesCmp)(auth.serverNonce, response.server_nonce)) {
        throw new Error('[MT] server_DH_inner_data serverNonce mismatch');
    }

    //LogService.logVerbose(`[MtpAuthorizer] mtpDecryptServerDhDataAnswer() Done decrypting answer`)

    auth.g = response.g;
    auth.dhPrime = response.dh_prime;
    auth.gA = response.g_a;
    auth.serverTime = response.server_time;
    auth.retry = 0;

    mtpVerifyDhParams(auth.g, auth.dhPrime, auth.gA);

    var offset = deserializer.getOffset();

    if (!(0, _Utils.bytesCmp)(hash, (0, _Utils.sha1BytesSync)(answerWithPadding.slice(0, offset)))) {
        throw new Error('[MT] server_DH_inner_data SHA1-hash mismatch');
    }


    _Mtp.MtpTimeManager.applyServerTime(auth.serverTime, auth.localTime);
}

function mtpVerifyDhParams(g, dhPrime, gA) {
    //LogService.logVerbose(`[MtpAuthorizer] mtpVerifyDhParams() Verifying DH params`)

    var dhPrimeHex = (0, _Utils.bytesToHex)(dhPrime);
    if (g != 3 ||
    dhPrimeHex !== 'c71caeb9c6b1c9048e6c522f70f13f73980d40238e3e21c14934d037563d930f48198a0aa7c14058229493d22530f4dbfa336f6e0ac925139543aed44cce7c3720fd51f69458705ac68cd4fe6b6b13abdc9746512969328454f18faf8c595f642477fe96bb2a941d5bcd1d4ac8cc49880708fa9b378e3c4f3a9060bee67cf9a4a4a695811051907e162753b56b0f6b410dba74d8a84b2a14b3144e0ef1284754fd17ed950d5965b4b9dd46582db1178d169c6bc465b0d6ff9ca3928fef5b9ae4e418fc15e83ebea0f87fa9ff5eed70050ded2849f47bf959d956850ce929851f0d8115f635b105ee2e4e15d04b2454bf6f4fadf034b10403119cd8e3b92fcc5b') {
        // The verified value is from https://core.telegram.org/mtproto/security_guidelines
        throw new Error('[MT] DH params are not verified: unknown dhPrime');
    }

    //LogService.logVerbose(`[MtpAuthorizer] mtpVerifyDhParams() dhPrime cmp OK`)

    var gABigInt = new _Utils.BigInteger((0, _Utils.bytesToHex)(gA), 16);
    var dhPrimeBigInt = new _Utils.BigInteger(dhPrimeHex, 16);

    if (gABigInt.compareTo(_Utils.BigInteger.ONE) <= 0) {
        throw new Error('[MT] DH params are not verified: gA <= 1');
    }

    if (gABigInt.compareTo(dhPrimeBigInt.subtract(_Utils.BigInteger.ONE)) >= 0) {
        throw new Error('[MT] DH params are not verified: gA >= dhPrime - 1');
    }

    //LogService.logVerbose(`[MtpAuthorizer] mtpVerifyDhParams() 1 < gA < dhPrime-1 OK`)

    var two = new _Utils.BigInteger(null);
    two.fromInt(2);
    var twoPow = two.pow(2048 - 64);

    if (gABigInt.compareTo(twoPow) < 0) {
        throw new Error('[MT] DH params are not verified: gA < 2^{2048-64}');
    }
    if (gABigInt.compareTo(dhPrimeBigInt.subtract(twoPow)) >= 0) {
        throw new Error('[MT] DH params are not verified: gA > dhPrime - 2^{2048-64}');
    }

    //LogService.logVerbose(`[MtpAuthorizer] mtpVerifyDhParams() 2^{2048-64} < gA < dhPrime-2^{2048-64} OK`)

    return true;
}

function mtpSendSetClientDhParams(auth) {
    var deferred = auth.deferred;
    var gBytes = (0, _Utils.bytesFromHex)(auth.g.toString(16));

    auth.b = new Array(256);
    new _Utils.SecureRandom().nextBytes(auth.b);

    var gB = (0, _Utils.bytesModPow)(gBytes, auth.b, auth.dhPrime);
    var data = new _TL.TLSerialization({ mtproto: true });
    data.storeObject({
        _: 'client_DH_inner_data',
        nonce: auth.nonce,
        server_nonce: auth.serverNonce,
        retry_id: [0, auth.retry++],
        g_b: gB },
    'Client_DH_Inner_Data');

    var dataWithHash = (0, _Utils.sha1BytesSync)(data.getBuffer()).concat(data.getBytes());

    var encryptedData = (0, _Utils.aesEncryptSync)(dataWithHash, auth.tmpAesKey, auth.tmpAesIv);

    var request = new _TL.TLSerialization({ mtproto: true });
    request.storeMethod('set_client_DH_params', {
        nonce: auth.nonce,
        server_nonce: auth.serverNonce,
        encrypted_data: encryptedData });


    //LogService.logVerbose(`[MtpAuthorizer] mtpSendSetClientDhParams() Send set_client_DH_params`)

    mtpSendPlainRequest(auth.dcID, request.getBuffer()).then(function (deserializer) {
        var response = deserializer.fetchObject('Set_client_DH_params_answer');

        if (response._ != 'dh_gen_ok' && response._ != 'dh_gen_retry' && response._ != 'dh_gen_fail') {
            deferred.reject(new Error('[MT] Set_client_DH_params_answer response invalid: ' + response._));
            return false;
        }

        if (!(0, _Utils.bytesCmp)(auth.nonce, response.nonce)) {
            deferred.reject(new Error('[MT] Set_client_DH_params_answer nonce mismatch'));
            return false;
        }

        if (!(0, _Utils.bytesCmp)(auth.serverNonce, response.server_nonce)) {
            deferred.reject(new Error('[MT] Set_client_DH_params_answer server_nonce mismatch'));
            return false;
        }

        var authKey = (0, _Utils.bytesModPow)(auth.gA, auth.b, auth.dhPrime);
        var authKeyHash = (0, _Utils.sha1BytesSync)(authKey),
        authKeyAux = authKeyHash.slice(0, 8),
        authKeyID = authKeyHash.slice(-8);

        //LogService.logVerbose(`[MtpAuthorizer] mtpSendSetClientDhParams() Got Set_client_DH_params_answer ${response._}`)

        switch (response._) {
            case 'dh_gen_ok':
                var newNonceHash1 = (0, _Utils.sha1BytesSync)(auth.newNonce.concat([1], authKeyAux)).slice(-16);

                if (!(0, _Utils.bytesCmp)(newNonceHash1, response.new_nonce_hash1)) {
                    deferred.reject(new Error('[MT] Set_client_DH_params_answer new_nonce_hash1 mismatch'));
                    return false;
                }

                var serverSalt = (0, _Utils.bytesXor)(auth.newNonce.slice(0, 8), auth.serverNonce.slice(0, 8));

                auth.authKeyID = authKeyID;
                auth.authKey = authKey;
                auth.serverSalt = serverSalt;

                deferred.resolve(auth);
                break;

            case 'dh_gen_retry':
                var newNonceHash2 = (0, _Utils.sha1BytesSync)(auth.newNonce.concat([2], authKeyAux)).slice(-16);
                if (!(0, _Utils.bytesCmp)(newNonceHash2, response.new_nonce_hash2)) {
                    deferred.reject(new Error('[MT] Set_client_DH_params_answer new_nonce_hash2 mismatch'));
                    return false;
                }

                return mtpSendSetClientDhParams(auth);

            case 'dh_gen_fail':
                var newNonceHash3 = (0, _Utils.sha1BytesSync)(auth.newNonce.concat([3], authKeyAux)).slice(-16);
                if (!(0, _Utils.bytesCmp)(newNonceHash3, response.new_nonce_hash3)) {
                    deferred.reject(new Error('[MT] Set_client_DH_params_answer new_nonce_hash3 mismatch'));
                    return false;
                }

                deferred.reject(new Error('[MT] Set_client_DH_params_answer fail'));
                return false;}

    }, function (error) {
        deferred.reject(error);
    });
}

var cached = {};

var flushCachedNetworkers = exports.flushCachedNetworkers = function flushCachedNetworkers() {
    cached = {};
    (0, _network.flushSockets)();
};

var mtpAuth = function mtpAuth(dcID, noCache) {return new Promise(function (_resolve, _reject) {

        // if (cached[dcID] !== undefined) {
        //     return cached[dcID]
        // }

        var nonce = [];
        for (var i = 0; i < 16; i++) {
            nonce.push((0, _Utils.nextRandomInt)(0xFF));
        }

        if (!_Mtp.MtpDcConfigurator.chooseServer(dcID)) {
            throw new Error('[MT] No server found for dc ' + dcID);
        }


        var url = _Mtp.MtpDcConfigurator.chooseServer(dcID);
        (0, _network.flushSockets)(url, dcID);

        var auth = {
            dcID: dcID,
            nonce: nonce,
            deferred: {
                resolve: function resolve(obj) {return _resolve(obj);}, reject: function reject(err) {_reject(err);} } };




        mtpSendReqPQ(auth);
    });};


var auth = exports.auth = mtpAuth;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.setUpdatesProcessor = exports.getNetworker = undefined;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};exports.
















































































































































































































































































































































































































































































































































































































































































































toArrayBuffer = toArrayBuffer;exports.













































































































































































































































































































































































startAll = startAll;exports.






stopAll = stopAll;var _config = __webpack_require__(3);var _config2 = _interopRequireDefault(_config);var _Mtp = __webpack_require__(5);var _Utils = __webpack_require__(2);var _TL = __webpack_require__(6);var _network = __webpack_require__(10);var _state = __webpack_require__(4);var _Services = __webpack_require__(1);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var updatesProcessor = function updatesProcessor(message) {// console.log('MM:');
    console.log(message);};var iii = 0,offline;var offlineInited = false;var akStopped = false;function MtpNetworker(dcID, authKey, serverSalt, options) {options = options || {};this.signedIn = false;this.dcID = dcID;this.iii = iii++;this.authKey = authKey;this.authKeyUint8 = (0, _Utils.convertToUint8Array)(authKey);this.authKeyBuffer = (0, _Utils.convertToArrayBuffer)(authKey);this.authKeyID = (0, _Utils.sha1BytesSync)(authKey).slice(-8);this.serverSalt = serverSalt;this.upload = options.fileUpload || options.fileDownload || false;this.updateSessionId();this.lastServerMessages = [];this.currentRequests = 0;this.checkConnectionPeriod = 0; // console.warn('this.sentMessages = {}')
    this.sentMessages = {};this.clientMessages = [];this.pendingMessages = {};this.pendingAcks = [];this.pendingResends = [];this.connectionInited = false;this.pendingTimeouts = []; //this.longPollInt = $interval(this.checkLongPoll.bind(this), 10000)
    /*
    this.checkLongPoll()
     if (!offlineInited) {
        offlineInited = true
        $rootScope.offline = true
        $rootScope.offlineConnecting = true
    }
     if (Config.Navigator.mobile) {
        this.setupMobileSleep()
    }
    */}MtpNetworker.prototype.getDcId = function () {return this.dcID;};MtpNetworker.prototype.updateSessionId = function () {this.seqNo = 0;this.prevSessionID = this.sessionID;this.sessionID = new Array(8);new _Utils.SecureRandom().nextBytes(this.sessionID);};MtpNetworker.prototype.setupMobileSleep = function () {var self = this; /*
                                                                                                                                                                                                                                                                                                                                             $rootScope.$watch('idle.isIDLE', function (isIDLE) {
                                                                                                                                                                                                                                                                                                                                                 if (isIDLE) {
                                                                                                                                                                                                                                                                                                                                                     self.sleepAfter = tsNow() + 30000
                                                                                                                                                                                                                                                                                                                                                 } else {
                                                                                                                                                                                                                                                                                                                                                     delete self.sleepAfter
                                                                                                                                                                                                                                                                                                                                                     self.checkLongPoll()
                                                                                                                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                                                                                                             })
                                                                                                                                                                                                                                                                                                                                              $rootScope.$on('push_received', function () {
                                                                                                                                                                                                                                                                                                                                                 LogService.logVerbose(`[MtpNetworker] setupMobileSleep() push_received`)
                                                                                                                                                                                                                                                                                                                                                 if (self.sleepAfter) {
                                                                                                                                                                                                                                                                                                                                                     self.sleepAfter = tsNow() + 30000
                                                                                                                                                                                                                                                                                                                                                     self.checkLongPoll()
                                                                                                                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                                                                                                             })
                                                                                                                                                                                                                                                                                                                                             */};MtpNetworker.prototype.updateSentMessage = function (sentMessageID) {var sentMessage = this.sentMessages[sentMessageID];if (!sentMessage) {return false;}var self = this;if (sentMessage.container) {var newInner = [];sentMessage.inner.forEach(function (innerSentMessageID) {var innerSentMessage = self.updateSentMessage(innerSentMessageID);if (innerSentMessage) {newInner.push(innerSentMessage.msg_id);}});sentMessage.inner = newInner;}sentMessage.msg_id = _Mtp.MtpTimeManager.generateID();sentMessage.seq_no = this.generateSeqNo(sentMessage.notContentRelated || sentMessage.container);this.sentMessages[sentMessage.msg_id] = sentMessage;delete self.sentMessages[sentMessageID];return sentMessage;};MtpNetworker.prototype.generateSeqNo = function (notContentRelated) {var seqNo = this.seqNo * 2;if (!notContentRelated) {seqNo++;this.seqNo++;}return seqNo;};MtpNetworker.prototype.wrapMtpCall = function (method, params, options) {var serializer = new _TL.TLSerialization({ mtproto: true });serializer.storeMethod(method, params);var messageID = _Mtp.MtpTimeManager.generateID();var seqNo = this.generateSeqNo();var message = { msg_id: messageID, seq_no: seqNo, body: serializer.getBytes() //LogService.logVerbose(`[MtpNetworker] wrapMtpCall() ${method} ${JSON.stringify(params, 0, 2)}`)
    };return this.pushMessage(message, options);};MtpNetworker.prototype.wrapMtpMessage = function (object, options) {options = options || {};var serializer = new _TL.TLSerialization({ mtproto: true });serializer.storeObject(object, 'Object');var messageID = _Mtp.MtpTimeManager.generateID();var seqNo = this.generateSeqNo(options.notContentRelated);var message = { msg_id: messageID, seq_no: seqNo, body: serializer.getBytes() //LogService.logVerbose(`[MtpNetworker] wrapMtpMessage ${JSON.stringify(object, 0, 2)} ${messageID} ${seqNo}`)
    };return this.pushMessage(message, options);};MtpNetworker.prototype.wrapApiCall = function (method, params, options) {var _this = this;return new Promise(function (resolve, reject) {var serializer = new _TL.TLSerialization(options);if (!_this.connectionInited) {serializer.storeInt(0xda9b0d0d, 'invokeWithLayer');serializer.storeInt(_config2.default.Schema.API.layer, 'layer');serializer.storeInt(0x69796de9, 'initConnection');serializer.storeInt(_config2.default.App.id, 'api_id');serializer.storeString('Unknown UserAgent', 'device_model');serializer.storeString('Unknown Platform', 'system_version');serializer.storeString(_config2.default.App.version, 'app_version');serializer.storeString('en', 'lang_code');}if (options.afterMessageID) {serializer.storeInt(0xcb9f372d, 'invokeAfterMsg');serializer.storeLong(options.afterMessageID, 'msg_id');}options.resultType = serializer.storeMethod(method, params);var messageID = _Mtp.MtpTimeManager.generateID();var seqNo = _this.generateSeqNo();var message = { msg_id: messageID, seq_no: seqNo, body: serializer.getBytes(true), isAPI: true //LogService.logVerbose(`[MtpNetworker] wrapApiCall() ${method} ${JSON.stringify(params, 0, 2)} ${messageID} ${seqNo} ${JSON.stringify(options, 0, 2)}`)
        };_this.pushMessage(message, options).then(function (res) {if (res) {if (res._ == 'userFull' || res.user) {_this.signedIn = true;}}resolve(res);}).catch(function (err) {return reject(err);});});};MtpNetworker.prototype.checkLongPoll = function (force) {var isClean = this.cleanupSent();if (this.longPollPending && (0, _Utils.tsNow)() < this.longPollPending || this.offline || akStopped) {return false;}var self = this;Storage.get('dc').then(function (baseDcID) {if (isClean && (baseDcID != self.dcID || self.upload || self.sleepAfter && (0, _Utils.tsNow)() > self.sleepAfter)) {return;}self.sendLongPoll();});};MtpNetworker.prototype.sendLongPoll = function (cb) {var maxWait = 25000;var self = this;this.longPollPending = (0, _Utils.tsNow)() + maxWait;this.wrapMtpCall('http_wait', { max_delay: 500, wait_after: 150, max_wait: maxWait }, { noResponse: true, longPoll: true }).then(function () {delete self.longPollPending;cb(); // self.checkLongPoll.bind(self)()
    }, function (error) {//LogService.logError(`[MtpNetworker] sendLongPoll() ${new ErrorResponse(error)}`)
        cb();});};MtpNetworker.prototype.pushMessage = function (message) {var _this2 = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return new Promise(function (resolve, reject) {_this2.sentMessages[message.msg_id] = _extends({}, message, options, { deferred: { resolve: resolve, reject: reject } });_this2.pendingMessages[message.msg_id] = 0;if (!options || !options.noShedule) {_this2.sheduleRequest();}if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {options.messageID = message.msg_id;}});};MtpNetworker.prototype.pushResend = function (messageID, delay) {var value = delay ? (0, _Utils.tsNow)() + delay : 0;var sentMessage = this.sentMessages[messageID];if (sentMessage.container) {for (var i = 0; i < sentMessage.inner.length; i++) {this.pendingMessages[sentMessage.inner[i]] = value;}} else {this.pendingMessages[messageID] = value;}this.sheduleRequest(delay);};MtpNetworker.prototype.getMsgKey = function (dataWithPadding, isOut) {var authKey = this.authKeyUint8;var x = isOut ? 0 : 8;var msgKeyLargePlain = (0, _Utils.bufferConcat)(authKey.subarray(88 + x, 88 + x + 32), dataWithPadding);var msgKeyLarge = (0, _Utils.sha256HashSync)(msgKeyLargePlain);var msgKey = new Uint8Array(msgKeyLarge).subarray(8, 24);return msgKey;};MtpNetworker.prototype.getAesKeyIv = function (msgKey, isOut) {var authKey = this.authKeyUint8;var x = isOut ? 0 : 8;var sha2aText = new Uint8Array(52);var sha2bText = new Uint8Array(52);var promises = {};sha2aText.set(msgKey, 0);sha2aText.set(authKey.subarray(x, x + 36), 16);var result_sha2a = (0, _Utils.sha256HashSync)(sha2aText);sha2bText.set(authKey.subarray(40 + x, 40 + x + 36), 0);sha2bText.set(msgKey, 36);var result_sha2b = (0, _Utils.sha256HashSync)(sha2bText);var aesKey = new Uint8Array(32);var aesIv = new Uint8Array(32);var sha2a = new Uint8Array(result_sha2a);var sha2b = new Uint8Array(result_sha2b);aesKey.set(sha2a.subarray(0, 8));aesKey.set(sha2b.subarray(8, 24), 8);aesKey.set(sha2a.subarray(24, 32), 24);aesIv.set(sha2b.subarray(0, 8));aesIv.set(sha2a.subarray(8, 24), 8);aesIv.set(sha2b.subarray(24, 32), 24);return [aesKey, aesIv];};MtpNetworker.prototype.checkConnection = function (event) {// $rootScope.offlineConnecting = true
    // LogService.logVerbose(`[MtpNetworker] checkConnection()`)
    //$timeout.cancel(this.checkConnectionPromise)
    var serializer = new _TL.TLSerialization({ mtproto: true });var pingID = [(0, _Utils.nextRandomInt)(0xFFFFFFFF), (0, _Utils.nextRandomInt)(0xFFFFFFFF)];serializer.storeMethod('ping', { ping_id: pingID });var pingMessage = { msg_id: _Mtp.MtpTimeManager.generateID(), seq_no: this.generateSeqNo(true), body: serializer.getBytes() };var self = this;this.sendEncryptedRequest(pingMessage, { timeout: 15000 }).then(function (result) {/*delete $rootScope.offlineConnecting
                                                                                                                                                                                                                                                                                                                                                                                                                                                 self.toggleOffline(false)
                                                                                                                                                                                                                                                                                                                                                                                                                                                 */}).catch(function () {// LogService.logVerbose(`[MtpNetworker] checkConnection() Delay ${self.checkConnectionPeriod * 1000}`)
        //self.checkConnectionPromise = $timeout(self.checkConnection.bind(self), parseInt(self.checkConnectionPeriod * 1000))
        self.checkConnectionPeriod = Math.min(60, self.checkConnectionPeriod * 1.5); /*
                                                                                     $timeout(function () {
                                                                                         delete $rootScope.offlineConnecting
                                                                                     }, 1000)
                                                                                     */});};MtpNetworker.prototype.toggleOffline = function (enabled) {// LogService.logVerbose(`[MtpNetworker] toggleOffline() ${enabled}`)
    if (this.offline !== undefined && this.offline == enabled) {return false;}this.offline = enabled; //$rootScope.offline = enabled
    //$rootScope.offlineConnecting = false
    /*
     if (this.offline) {
        $timeout.cancel(this.nextReqPromise)
        delete this.nextReq
         if (this.checkConnectionPeriod < 1.5) {
            this.checkConnectionPeriod = 0
        }
         this.checkConnectionPromise = $timeout(this.checkConnection.bind(this), parseInt(this.checkConnectionPeriod * 1000))
        this.checkConnectionPeriod = Math.min(30, (1 + this.checkConnectionPeriod) * 1.5)
         this.onOnlineCb = this.checkConnection.bind(this)
    } else {
        delete this.longPollPending
        this.checkLongPoll()
        this.sheduleRequest()
         $timeout.cancel(this.checkConnectionPromise)
    }
    */};MtpNetworker.prototype.performSheduledRequest = function () {var _this3 = this; //LogService.logVerbose(`[MtpNetworker] performSheduledRequest()`)
    if (this.offline || akStopped) {//LogService.logVerbose(`[MtpNetworker] performSheduledRequest() Cancel sheduled`)
        return false;}delete this.nextReq;if (this.pendingAcks.length) {var ackMsgIDs = [];for (var i = 0; i < this.pendingAcks.length; i++) {ackMsgIDs.push(this.pendingAcks[i]);}this.wrapMtpMessage({ _: 'msgs_ack', msg_ids: ackMsgIDs }, { notContentRelated: true, noShedule: true });}if (this.pendingResends.length) {var resendMsgIDs = [];var resendOpts = { noShedule: true, notContentRelated: true };for (var i = 0; i < this.pendingResends.length; i++) {resendMsgIDs.push(this.pendingResends[i]);}this.wrapMtpMessage({ _: 'msg_resend_req', msg_ids: resendMsgIDs }, resendOpts);this.lastResendReq = { req_msg_id: resendOpts.messageID, resend_msg_ids: resendMsgIDs };}var messages = [];var message = void 0;var messagesByteLen = 0;var currentTime = (0, _Utils.tsNow)();var hasApiCall = false;var hasHttpWait = false;var lengthOverflow = false;var singlesCount = 0;var self = this;Object.keys(this.pendingMessages).forEach(function (messageID) {var value = _this3.pendingMessages[messageID];if (!value || value >= currentTime) {if (message = self.sentMessages[messageID]) {var messageByteLength = (message.body.byteLength || message.body.length) + 32;if (!message.notContentRelated && lengthOverflow) {return;}if (!message.notContentRelated && messagesByteLen && messagesByteLen + messageByteLength > 655360) {// 640 Kb
                    lengthOverflow = true;return;}if (message.singleInRequest) {singlesCount++;if (singlesCount > 1) {return;}}messages.push(message);messagesByteLen += messageByteLength;if (message.isAPI) {hasApiCall = true;} else if (message.longPoll) {hasHttpWait = true;}}delete self.pendingMessages[messageID];}});if (hasApiCall && !hasHttpWait) {// var serializer = new TLSerialization({ mtproto: true })
        // serializer.storeMethod('http_wait', {
        //     max_delay: 500,
        //     wait_after: 150,
        //     max_wait: 3000
        // })
        // messages.push({
        //     msg_id: MtpTimeManager.generateID(),
        //     seq_no: this.generateSeqNo(),
        //     body: serializer.getBytes()
        // })
    }if (!messages.length) {return;}var noResponseMsgs = [];if (messages.length > 1) {var container = new _TL.TLSerialization({ mtproto: true, startMaxLength: messagesByteLen + 64 });container.storeInt(0x73f1f8dc, 'CONTAINER[id]');container.storeInt(messages.length, 'CONTAINER[count]');var onloads = [];var innerMessages = [];for (var i = 0; i < messages.length; i++) {container.storeLong(messages[i].msg_id, 'CONTAINER[' + i + '][msg_id]');innerMessages.push(messages[i].msg_id);container.storeInt(messages[i].seq_no, 'CONTAINER[' + i + '][seq_no]');container.storeInt(messages[i].body.length, 'CONTAINER[' + i + '][bytes]');container.storeRawBytes(messages[i].body, 'CONTAINER[' + i + '][body]');if (messages[i].noResponse) {noResponseMsgs.push(messages[i].msg_id);}}var containerSentMessage = { msg_id: _Mtp.MtpTimeManager.generateID(), seq_no: this.generateSeqNo(true), container: true, inner: innerMessages };message = _extends({ body: container.getBytes(true) }, containerSentMessage);this.sentMessages[message.msg_id] = containerSentMessage; //LogService.logVerbose(`[MtpNetworker] performSheduledRequest() Container ${JSON.stringify(innerMessages, 0, 2)} ${message.msg_id} ${message.seq_no}`)
    } else {if (message.noResponse) {noResponseMsgs.push(message.msg_id);}this.sentMessages[message.msg_id] = message;}this.pendingAcks = []; //LogService.logVerbose(`[MtpNetworker] performSheduledRequest() sendEncryptedRequest(${JSON.stringify(message, 0, 2)})`)
    this.sendEncryptedRequest(message).then(function (result) {self.toggleOffline(false);var response = self.parseResponse(result.data);_Mtp.MtpTimeManager.setLastID(response.messageID); //LogService.logVerbose(`[MtpNetworker] performSheduledRequest() sendEncryptedRequest() Server response ${self.dcID} ${JSON.stringify(response, 0, 2)}`)
        self.processMessage(response.response, response.messageID, response.sessionID);noResponseMsgs.forEach(function (msgID) {if (self.sentMessages[msgID]) {var deferred = self.sentMessages[msgID].deferred;delete self.sentMessages[msgID];deferred.resolve();}}); //self.checkLongPoll()
        self.checkConnectionPeriod = Math.max(1.1, Math.sqrt(self.checkConnectionPeriod));}).catch(function (error) {if (message.container) {message.inner.forEach(function (msgID) {self.pendingMessages[msgID] = 0;});delete self.sentMessages[message.msg_id];} else {self.pendingMessages[message.msg_id] = 0;}noResponseMsgs.forEach(function (msgID) {if (self.sentMessages[msgID]) {var deferred = self.sentMessages[msgID].deferred;delete self.sentMessages[msgID];delete self.pendingMessages[msgID];deferred.reject();}});self.toggleOffline(true);}); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  if (lengthOverflow || singlesCount > 1) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      this.sheduleRequest()
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */};MtpNetworker.prototype.networkCallback = function (result) {try {this.toggleOffline(false);var response = this.parseResponse(result.data);_Mtp.MtpTimeManager.setLastID(response.messageID);this.processMessage(response.response, response.messageID, response.sessionID);} catch (e) {console.error(e);}};MtpNetworker.prototype.getEncryptedMessage = function (dataWithPadding) {var self = this;var msgKey = self.getMsgKey(dataWithPadding, true);var keyIv = self.getAesKeyIv(msgKey, true);var encryptedBytes = (0, _Utils.aesEncryptSync)(dataWithPadding, keyIv[0], keyIv[1]);return { bytes: encryptedBytes, msgKey: msgKey };};MtpNetworker.prototype.getDecryptedMessage = function (msgKey, encryptedData) {var keyIv = this.getAesKeyIv(msgKey, false);return (0, _Utils.aesDecryptSync)(encryptedData, keyIv[0], keyIv[1]);};MtpNetworker.prototype.sendEncryptedRequest = function (message) {var _this4 = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return new Promise(function (resolve, reject) {var self = _this4;options = options || {};var data = new _TL.TLSerialization({ startMaxLength: message.body.length + 2048 });data.storeIntBytes(_this4.serverSalt, 64, 'salt');data.storeIntBytes(_this4.sessionID, 64, 'session_id');data.storeLong(message.msg_id, 'message_id');data.storeInt(message.seq_no, 'seq_no');data.storeInt(message.body.length, 'message_data_length');data.storeRawBytes(message.body, 'message_data');var dataBuffer = data.getBuffer();var paddingLength = 16 - data.offset % 16 + 16 * (1 + (0, _Utils.nextRandomInt)(5));var padding = new Array(paddingLength);new _Utils.SecureRandom().nextBytes(padding);var dataWithPadding = (0, _Utils.bufferConcat)(dataBuffer, padding);var encryptedResult = _this4.getEncryptedMessage(dataWithPadding);var request = new _TL.TLSerialization({ startMaxLength: encryptedResult.bytes.byteLength + 256 });request.storeIntBytes(self.authKeyID, 64, 'auth_key_id');request.storeIntBytes(encryptedResult.msgKey, 128, 'msg_key');request.storeRawBytes(encryptedResult.bytes, 'encrypted_data');var requestData = request.getArray();var requestPromise;var url = _Mtp.MtpDcConfigurator.chooseServer(self.dcID);var baseError = { code: 406, type: 'NETWORK_BAD_RESPONSE', url: url };var networkCallback = function networkCallback(data) {_this4.networkCallback(data);};(0, _network.networkRequest)(url, self.dcID, requestData, networkCallback).then(function (result) {if (!result.data || !result.data.byteLength) {reject(baseError);}resolve(result);}).catch(function (error) {console.error(error);if (!error.message && !error.type) {error = _extends({}, baseError, { type: 'NETWORK_BAD_REQUEST', originalError: error });} //LogService.logError(`[MtpNetworker] sendEncryptedRequest() ${error.message}`)
            reject(error);});});};function toArrayBuffer(arr) {var ab = new ArrayBuffer(arr.length);var view = new Uint8Array(ab);for (var i = 0; i < arr.length; ++i) {view[i] = arr[i];}return ab;}MtpNetworker.prototype.parseResponse = function (responseBuffer) {var self = this;var deserializer = new _TL.TLDeserialization(responseBuffer);var authKeyID = deserializer.fetchIntBytes(64, false, 'auth_key_id');var msgKey = deserializer.fetchIntBytes(128, true, 'msg_key');var encryptedData = deserializer.fetchRawBytes(responseBuffer.byteLength - deserializer.getOffset(), true, 'encrypted_data');var dataWithPadding = toArrayBuffer(self.getDecryptedMessage(msgKey, encryptedData));var calcMsgKey = self.getMsgKey(dataWithPadding, false);if (!(0, _Utils.bytesCmp)(msgKey, calcMsgKey)) {//LogService.logError(`[MtpNetworker] parseResponse() server msgKey mismatch: ${bytesFromArrayBuffer(calcMsgKey)}`)
        throw new Error('[MT] server msgKey mismatch');} // if (!bytesCmp(authKeyID, this.authKeyID)) {
    //     throw new Error('[MT] Invalid server auth_key_id: ' + bytesToHex(authKeyID))
    // }
    var deserializer = new _TL.TLDeserialization(dataWithPadding, { mtproto: true });var salt = deserializer.fetchIntBytes(64, false, 'salt');var sessionID = deserializer.fetchIntBytes(64, false, 'session_id');var messageID = deserializer.fetchLong('message_id');if (!(0, _Utils.bytesCmp)(sessionID, self.sessionID) && (!self.prevSessionID || !(0, _Utils.bytesCmp)(sessionID, self.prevSessionID))) {//LogService.logError(`[MtpNetworker] parseResponse() Invalid server session_id: ${bytesToHex(sessionID)}`)
        // throw new Error('[MT] Invalid server session_id: ' + bytesToHex(sessionID))
    }var seqNo = deserializer.fetchInt('seq_no');var totalLength = dataWithPadding.bytesLength;var messageBodyLength = deserializer.fetchInt('message_data[length]');var offset = deserializer.getOffset();if (messageBodyLength % 4 !== 0 || messageBodyLength > totalLength - offset) {throw new Error('[MT] Invalid body length: ' + messageBodyLength);}var messageBody = deserializer.fetchRawBytes(messageBodyLength, true, 'message_data');var offset = deserializer.getOffset();var paddingLength = totalLength - offset;if (paddingLength < 12 || paddingLength > 1024) {throw new Error('[MT] Invalid padding length: ' + paddingLength);}var buffer = (0, _Utils.bytesToArrayBuffer)(messageBody);var deserializerOptions = { mtproto: true, override: { mt_message: function mt_message(result, field) {result.msg_id = this.fetchLong(field + '[msg_id]');result.seqno = this.fetchInt(field + '[seqno]');result.bytes = this.fetchInt(field + '[bytes]');var offset = this.getOffset();try {result.body = this.fetchObject('Object', field + '[body]');} catch (e) {//LogService.logError(`[MtpNetworker] parseResponse() parse error: ${new ErrorResponse(e)}`)
                    result.body = { _: 'parse_error', error: e };}if (this.offset != offset + result.bytes) {this.offset = offset + result.bytes;}}, mt_rpc_result: function mt_rpc_result(result, field) {result.req_msg_id = this.fetchLong(field + '[req_msg_id]');var sentMessage = self.sentMessages[result.req_msg_id];var type = sentMessage && sentMessage.resultType || 'Object';if (result.req_msg_id && !sentMessage) {return;}result.result = this.fetchObject(type, field + '[result]');} } };var deserializer = new _TL.TLDeserialization(buffer, deserializerOptions);var response = deserializer.fetchObject('', 'INPUT');return { response: response, messageID: messageID, sessionID: sessionID, seqNo: seqNo };};MtpNetworker.prototype.applyServerSalt = function (newServerSalt) {var _this5 = this;var serverSalt = (0, _Utils.longToBytes)(newServerSalt);var newNetworkers = (0, _state.getState)().networkers;var networker = newNetworkers.find(function (nw) {return nw.id == _this5.dcID;});if (!networker) {throw new Error('Networker with dcID = ' + this.dcID + ' not found in the state');}networker.auth.serverSalt = serverSalt;(0, _state.setState)({ networkers: newNetworkers });this.serverSalt = serverSalt;return true;};MtpNetworker.prototype.sheduleRequest = function (delay) {if (this.offline) {this.checkConnection('forced shedule');}var nextReq = (0, _Utils.tsNow)() + delay;if (delay && this.nextReq && this.nextReq <= nextReq) {return false;} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       $timeout.cancel(this.nextReqPromise)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       if (delay > 0) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           this.nextReqPromise = $timeout(this.performSheduledRequest.bind(this), delay || 0)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           setZeroTimeout(this.performSheduledRequest.bind(this))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */this.performSheduledRequest.bind(this)();this.nextReq = nextReq;};MtpNetworker.prototype.ackMessage = function (msgID) {//LogService.logVerbose(`[MtpNetworker] ackMessage() ${msgID}`)
    this.pendingAcks.push(msgID);this.sheduleRequest(30000);};MtpNetworker.prototype.reqResendMessage = function (msgID) {//LogService.logVerbose(`[MtpNetworker] reqResendMessage() ${msgID}`)
    this.pendingResends.push(msgID);this.sheduleRequest(100);};MtpNetworker.prototype.cleanupSent = function () {var self = this;var notEmpty = false;Object.keys(this.sentMessages).forEach(function (msgID) {var message = self.sentMessages[msgID];if (message.notContentRelated && self.pendingMessages[msgID] === undefined) {delete self.sentMessages[msgID];} else if (message.container) {for (var i = 0; i < message.inner.length; i++) {if (self.sentMessages[message.inner[i]] !== undefined) {notEmpty = true;return;}}delete self.sentMessages[msgID];} else {notEmpty = true;}});return !notEmpty;};MtpNetworker.prototype.processMessageAck = function (messageID) {var sentMessage = this.sentMessages[messageID];if (sentMessage && !sentMessage.acked) {delete sentMessage.body;sentMessage.acked = true;return true;}return false;};MtpNetworker.prototype.processError = function (rawError) {var matches = (rawError.error_message || '').match(/^([A-Z_0-9]+\b)(: (.+))?/) || [];rawError.error_code = (0, _Utils.uintToInt)(rawError.error_code);return { code: !rawError.error_code || rawError.error_code <= 0 ? 500 : rawError.error_code, type: matches[1] || 'UNKNOWN', description: matches[3] || 'CODE#' + rawError.error_code + ' ' + rawError.error_message, originalError: rawError };};MtpNetworker.prototype.processMessage = function (message, messageID, sessionID) {var msgidInt = parseInt(messageID.toString(10).substr(0, -10), 10);if (msgidInt % 2) {console.error('Server even message ID'); //LogService.logInfo(`[MtpNetworker] processMessage() Server even message id ${messageID}`)
        return;}switch (message._) {case 'msg_container':var len = message.messages.length;for (var i = 0; i < len; i++) {this.processMessage(message.messages[i], message.messages[i].msg_id, sessionID);}break;case 'bad_server_salt': //LogService.logInfo(`[MtpNetworker] processMessage() Bad server salt ${JSON.stringify(message, 0, 2)}`)
            var sentMessage = this.sentMessages[message.bad_msg_id];if (!sentMessage || sentMessage.seq_no != message.bad_msg_seqno) {//LogService.logInfo(`[MtpNetworker] processMessage() Bad server salt for invalid message ${JSON.stringify(message, 0, 2)}`)
                throw new Error('[MT] Bad server salt for invalid message');}this.applyServerSalt(message.new_server_salt);this.pushResend(message.bad_msg_id);this.ackMessage(messageID);break;case 'bad_msg_notification': //LogService.logInfo(`[MtpNetworker] processMessage() Bad msg notification ${JSON.stringify(message, 0, 2)}`)
            var sentMessage = this.sentMessages[message.bad_msg_id];if (!sentMessage || sentMessage.seq_no != message.bad_msg_seqno) {throw new Error('[MT] Bad msg notification for invalid message');}if (message.error_code == 16 || message.error_code == 17 || message.error_code == 32 || message.error_code == 33) {if (_Mtp.MtpTimeManager.applyServerTime((0, _Utils.bigStringInt)(messageID).shiftRight(32).toString(10))) {//LogService.logInfo(`[MtpNetworker] processMessage() Update session`)
                    this.updateSessionId();}var badMessage = this.updateSentMessage(message.bad_msg_id);this.pushResend(badMessage.msg_id);this.ackMessage(messageID);}break;case 'message':if (this.lastServerMessages.indexOf(messageID) != -1) {this.ackMessage(messageID);return;}this.lastServerMessages.push(messageID);if (this.lastServerMessages.length > 100) {this.lastServerMessages.shift();}this.processMessage(message.body, message.msg_id, sessionID);break;case 'new_session_created':console.info('new session created'); // this.updateSentMessage(message.first_msg_id)
            this.ackMessage(messageID); // this.updateSentMessage(message.first_msg_id)
            this.processMessageAck(message.first_msg_id);this.applyServerSalt(message.server_salt); // this.seqNo = 0;
            // this.prevSessionID = this.sessionID;
            // this.sessionID = sessionID;
            if (_Mtp.MtpTimeManager.applyServerTime((0, _Utils.bigStringInt)(messageID).shiftRight(32).toString(10))) {//LogService.logInfo(`[MtpNetworker] processMessage() Update session`)
                this.updateSessionId();}var self = this;var currentDcId = (0, _state.getState)().current_dc_id;if (currentDcId == self.dcID && !self.upload && updatesProcessor) {updatesProcessor(message, true);}break;case 'msgs_ack':for (var i = 0; i < message.msg_ids.length; i++) {this.processMessageAck(message.msg_ids[i]);}break;case 'msg_detailed_info':if (!this.sentMessages[message.msg_id]) {this.ackMessage(message.answer_msg_id);break;}case 'msg_new_detailed_info':if (this.pendingAcks.indexOf(message.answer_msg_id)) {break;}this.reqResendMessage(message.answer_msg_id);break;case 'msgs_state_info':this.ackMessage(message.answer_msg_id);if (this.lastResendReq && this.lastResendReq.req_msg_id == message.req_msg_id && this.pendingResends.length) {var i, badMsgID, pos;for (i = 0; i < this.lastResendReq.resend_msg_ids.length; i++) {badMsgID = this.lastResendReq.resend_msg_ids[i];pos = this.pendingResends.indexOf(badMsgID);if (pos != -1) {this.pendingResends.splice(pos, 1);}}}break;case 'rpc_result':this.ackMessage(messageID);var sentMessageID = message.req_msg_id;var sentMessage = this.sentMessages[sentMessageID];this.processMessageAck(sentMessageID);if (sentMessage) {var deferred = sentMessage.deferred;if (message.result._ == 'rpc_error') {var error = this.processError(message.result); //LogService.logError(`[MtpNetworker] processMessageAck() Rpc error ${new ErrorResponse(error)}`)
                    if (deferred) {deferred.reject(error);}} else {if (deferred) {//LogService.logVerbose(`[MtpNetworker] processMessageAck() Rpc response ${JSON.stringify(message.result, 0, 2)}`)
                        sentMessage.deferred.resolve(message.result);}if (sentMessage.isAPI) {this.connectionInited = true;}}delete this.sentMessages[sentMessageID];}break;default:this.ackMessage(messageID);if (updatesProcessor) {updatesProcessor(message, true);}break;}};function startAll() {if (akStopped) {akStopped = false;updatesProcessor({ _: 'new_session_created' }, true);}}function stopAll() {akStopped = true;}var getNetworker = exports.getNetworker = function getNetworker(dcID, authKey, serverSalt, options) {return new MtpNetworker(dcID, authKey, serverSalt, options);};var setUpdatesProcessor = exports.setUpdatesProcessor = function setUpdatesProcessor(callback) {updatesProcessor = callback;};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _index = __webpack_require__(5);exports.default =

_index.MtpProxy;module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.


chooseServer = chooseServer;var _config = __webpack_require__(3);var _config2 = _interopRequireDefault(_config);var _state = __webpack_require__(4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function chooseServer(dcId) {
  dcId = dcId % 1000; // mod by 1000

  var dcConfig = (0, _state.getState)().dc_options;

  // Excluding ipV6
  dcConfig = dcConfig.filter(function (dc) {return !dc.pFlags.ipv6;});

  var dcOption = dcConfig.find(function (dc) {return dc.id == dcId;});

  if (!dcOption) {
    throw new Error('Could not find dc with id = ' + dcId);
  }

  // console.log('Config.Modes', Config.Modes);

  var domain = '';
  if (_config2.default.Modes.ssl) {
    var dcs = ['pluto', 'venus', 'aurora', 'vesta', 'flora'];
    if (_config2.default.Modes.websockets) {
      domain = 'wss://' + dcs[dcId - 1] + '-1.web.telegram.org:443';
    } else {
      domain = 'https://' + dcs[dcId - 1] + '-1.web.telegram.org:443';
    }
  } else {
    if (_config2.default.Modes.websockets) {
      domain = 'ws://' + dcOption.ip_address + ':' + dcOption.port;
    } else {
      domain = 'http://' + dcOption.ip_address + ':' + dcOption.port;
    }
  }

  var path = 'apiw';
  if (_config2.default.Modes.websockets) {
    path += 's';
  }
  if (_config2.default.Modes.test) {
    path += '_test';
  }

  path += '1'; /// @todo: need this? Is this documented?

  return domain + '/' + path;
}

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = {"constructors":[{"id":"-1132882121","predicate":"boolFalse","params":[],"type":"Bool"},{"id":"-1720552011","predicate":"boolTrue","params":[],"type":"Bool"},{"id":"1072550713","predicate":"true","params":[],"type":"True"},{"id":"481674261","predicate":"vector","params":[],"type":"Vector t"},{"id":"-994444869","predicate":"error","params":[{"name":"code","type":"int"},{"name":"text","type":"string"}],"type":"Error"},{"id":"1450380236","predicate":"null","params":[],"type":"Null"},{"id":"2134579434","predicate":"inputPeerEmpty","params":[],"type":"InputPeer"},{"id":"2107670217","predicate":"inputPeerSelf","params":[],"type":"InputPeer"},{"id":"396093539","predicate":"inputPeerChat","params":[{"name":"chat_id","type":"int"}],"type":"InputPeer"},{"id":"-1182234929","predicate":"inputUserEmpty","params":[],"type":"InputUser"},{"id":"-138301121","predicate":"inputUserSelf","params":[],"type":"InputUser"},{"id":"-208488460","predicate":"inputPhoneContact","params":[{"name":"client_id","type":"long"},{"name":"phone","type":"string"},{"name":"first_name","type":"string"},{"name":"last_name","type":"string"}],"type":"InputContact"},{"id":"-181407105","predicate":"inputFile","params":[{"name":"id","type":"long"},{"name":"parts","type":"int"},{"name":"name","type":"string"},{"name":"md5_checksum","type":"string"}],"type":"InputFile"},{"id":"-1771768449","predicate":"inputMediaEmpty","params":[],"type":"InputMedia"},{"id":"505969924","predicate":"inputMediaUploadedPhoto","params":[{"name":"flags","type":"#"},{"name":"file","type":"InputFile"},{"name":"stickers","type":"flags.0?Vector<InputDocument>"},{"name":"ttl_seconds","type":"flags.1?int"}],"type":"InputMedia"},{"id":"-1279654347","predicate":"inputMediaPhoto","params":[{"name":"flags","type":"#"},{"name":"id","type":"InputPhoto"},{"name":"ttl_seconds","type":"flags.0?int"}],"type":"InputMedia"},{"id":"-104578748","predicate":"inputMediaGeoPoint","params":[{"name":"geo_point","type":"InputGeoPoint"}],"type":"InputMedia"},{"id":"-122978821","predicate":"inputMediaContact","params":[{"name":"phone_number","type":"string"},{"name":"first_name","type":"string"},{"name":"last_name","type":"string"},{"name":"vcard","type":"string"}],"type":"InputMedia"},{"id":"480546647","predicate":"inputChatPhotoEmpty","params":[],"type":"InputChatPhoto"},{"id":"-1837345356","predicate":"inputChatUploadedPhoto","params":[{"name":"file","type":"InputFile"}],"type":"InputChatPhoto"},{"id":"-1991004873","predicate":"inputChatPhoto","params":[{"name":"id","type":"InputPhoto"}],"type":"InputChatPhoto"},{"id":"-457104426","predicate":"inputGeoPointEmpty","params":[],"type":"InputGeoPoint"},{"id":"-206066487","predicate":"inputGeoPoint","params":[{"name":"lat","type":"double"},{"name":"long","type":"double"}],"type":"InputGeoPoint"},{"id":"483901197","predicate":"inputPhotoEmpty","params":[],"type":"InputPhoto"},{"id":"1001634122","predicate":"inputPhoto","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"file_reference","type":"bytes"}],"type":"InputPhoto"},{"id":"-539317279","predicate":"inputFileLocation","params":[{"name":"volume_id","type":"long"},{"name":"local_id","type":"int"},{"name":"secret","type":"long"},{"name":"file_reference","type":"bytes"}],"type":"InputFileLocation"},{"id":"-1649296275","predicate":"peerUser","params":[{"name":"user_id","type":"int"}],"type":"Peer"},{"id":"-1160714821","predicate":"peerChat","params":[{"name":"chat_id","type":"int"}],"type":"Peer"},{"id":"-1432995067","predicate":"storage.fileUnknown","params":[],"type":"storage.FileType"},{"id":"1086091090","predicate":"storage.filePartial","params":[],"type":"storage.FileType"},{"id":"8322574","predicate":"storage.fileJpeg","params":[],"type":"storage.FileType"},{"id":"-891180321","predicate":"storage.fileGif","params":[],"type":"storage.FileType"},{"id":"172975040","predicate":"storage.filePng","params":[],"type":"storage.FileType"},{"id":"-1373745011","predicate":"storage.filePdf","params":[],"type":"storage.FileType"},{"id":"1384777335","predicate":"storage.fileMp3","params":[],"type":"storage.FileType"},{"id":"1258941372","predicate":"storage.fileMov","params":[],"type":"storage.FileType"},{"id":"-1278304028","predicate":"storage.fileMp4","params":[],"type":"storage.FileType"},{"id":"276907596","predicate":"storage.fileWebp","params":[],"type":"storage.FileType"},{"id":"537022650","predicate":"userEmpty","params":[{"name":"id","type":"int"}],"type":"User"},{"id":"1326562017","predicate":"userProfilePhotoEmpty","params":[],"type":"UserProfilePhoto"},{"id":"-321430132","predicate":"userProfilePhoto","params":[{"name":"photo_id","type":"long"},{"name":"photo_small","type":"FileLocation"},{"name":"photo_big","type":"FileLocation"},{"name":"dc_id","type":"int"}],"type":"UserProfilePhoto"},{"id":"164646985","predicate":"userStatusEmpty","params":[],"type":"UserStatus"},{"id":"-306628279","predicate":"userStatusOnline","params":[{"name":"expires","type":"int"}],"type":"UserStatus"},{"id":"9203775","predicate":"userStatusOffline","params":[{"name":"was_online","type":"int"}],"type":"UserStatus"},{"id":"-1683826688","predicate":"chatEmpty","params":[{"name":"id","type":"int"}],"type":"Chat"},{"id":"1004149726","predicate":"chat","params":[{"name":"flags","type":"#"},{"name":"creator","type":"flags.0?true"},{"name":"kicked","type":"flags.1?true"},{"name":"left","type":"flags.2?true"},{"name":"deactivated","type":"flags.5?true"},{"name":"id","type":"int"},{"name":"title","type":"string"},{"name":"photo","type":"ChatPhoto"},{"name":"participants_count","type":"int"},{"name":"date","type":"int"},{"name":"version","type":"int"},{"name":"migrated_to","type":"flags.6?InputChannel"},{"name":"admin_rights","type":"flags.14?ChatAdminRights"},{"name":"default_banned_rights","type":"flags.18?ChatBannedRights"}],"type":"Chat"},{"id":"120753115","predicate":"chatForbidden","params":[{"name":"id","type":"int"},{"name":"title","type":"string"}],"type":"Chat"},{"id":"461151667","predicate":"chatFull","params":[{"name":"flags","type":"#"},{"name":"can_set_username","type":"flags.7?true"},{"name":"has_scheduled","type":"flags.8?true"},{"name":"id","type":"int"},{"name":"about","type":"string"},{"name":"participants","type":"ChatParticipants"},{"name":"chat_photo","type":"flags.2?Photo"},{"name":"notify_settings","type":"PeerNotifySettings"},{"name":"exported_invite","type":"ExportedChatInvite"},{"name":"bot_info","type":"flags.3?Vector<BotInfo>"},{"name":"pinned_msg_id","type":"flags.6?int"},{"name":"folder_id","type":"flags.11?int"}],"type":"ChatFull"},{"id":"-925415106","predicate":"chatParticipant","params":[{"name":"user_id","type":"int"},{"name":"inviter_id","type":"int"},{"name":"date","type":"int"}],"type":"ChatParticipant"},{"id":"-57668565","predicate":"chatParticipantsForbidden","params":[{"name":"flags","type":"#"},{"name":"chat_id","type":"int"},{"name":"self_participant","type":"flags.0?ChatParticipant"}],"type":"ChatParticipants"},{"id":"1061556205","predicate":"chatParticipants","params":[{"name":"chat_id","type":"int"},{"name":"participants","type":"Vector<ChatParticipant>"},{"name":"version","type":"int"}],"type":"ChatParticipants"},{"id":"935395612","predicate":"chatPhotoEmpty","params":[],"type":"ChatPhoto"},{"id":"1197267925","predicate":"chatPhoto","params":[{"name":"photo_small","type":"FileLocation"},{"name":"photo_big","type":"FileLocation"},{"name":"dc_id","type":"int"}],"type":"ChatPhoto"},{"id":"-2082087340","predicate":"messageEmpty","params":[{"name":"id","type":"int"}],"type":"Message"},{"id":"1160515173","predicate":"message","params":[{"name":"flags","type":"#"},{"name":"out","type":"flags.1?true"},{"name":"mentioned","type":"flags.4?true"},{"name":"media_unread","type":"flags.5?true"},{"name":"silent","type":"flags.13?true"},{"name":"post","type":"flags.14?true"},{"name":"from_scheduled","type":"flags.18?true"},{"name":"legacy","type":"flags.19?true"},{"name":"edit_hide","type":"flags.21?true"},{"name":"id","type":"int"},{"name":"from_id","type":"flags.8?int"},{"name":"to_id","type":"Peer"},{"name":"fwd_from","type":"flags.2?MessageFwdHeader"},{"name":"via_bot_id","type":"flags.11?int"},{"name":"reply_to_msg_id","type":"flags.3?int"},{"name":"date","type":"int"},{"name":"message","type":"string"},{"name":"media","type":"flags.9?MessageMedia"},{"name":"reply_markup","type":"flags.6?ReplyMarkup"},{"name":"entities","type":"flags.7?Vector<MessageEntity>"},{"name":"views","type":"flags.10?int"},{"name":"edit_date","type":"flags.15?int"},{"name":"post_author","type":"flags.16?string"},{"name":"grouped_id","type":"flags.17?long"},{"name":"restriction_reason","type":"flags.22?Vector<RestrictionReason>"}],"type":"Message"},{"id":"-1642487306","predicate":"messageService","params":[{"name":"flags","type":"#"},{"name":"out","type":"flags.1?true"},{"name":"mentioned","type":"flags.4?true"},{"name":"media_unread","type":"flags.5?true"},{"name":"silent","type":"flags.13?true"},{"name":"post","type":"flags.14?true"},{"name":"legacy","type":"flags.19?true"},{"name":"id","type":"int"},{"name":"from_id","type":"flags.8?int"},{"name":"to_id","type":"Peer"},{"name":"reply_to_msg_id","type":"flags.3?int"},{"name":"date","type":"int"},{"name":"action","type":"MessageAction"}],"type":"Message"},{"id":"1038967584","predicate":"messageMediaEmpty","params":[],"type":"MessageMedia"},{"id":"1766936791","predicate":"messageMediaPhoto","params":[{"name":"flags","type":"#"},{"name":"photo","type":"flags.0?Photo"},{"name":"ttl_seconds","type":"flags.2?int"}],"type":"MessageMedia"},{"id":"1457575028","predicate":"messageMediaGeo","params":[{"name":"geo","type":"GeoPoint"}],"type":"MessageMedia"},{"id":"-873313984","predicate":"messageMediaContact","params":[{"name":"phone_number","type":"string"},{"name":"first_name","type":"string"},{"name":"last_name","type":"string"},{"name":"vcard","type":"string"},{"name":"user_id","type":"int"}],"type":"MessageMedia"},{"id":"-1618676578","predicate":"messageMediaUnsupported","params":[],"type":"MessageMedia"},{"id":"-1230047312","predicate":"messageActionEmpty","params":[],"type":"MessageAction"},{"id":"-1503425638","predicate":"messageActionChatCreate","params":[{"name":"title","type":"string"},{"name":"users","type":"Vector<int>"}],"type":"MessageAction"},{"id":"-1247687078","predicate":"messageActionChatEditTitle","params":[{"name":"title","type":"string"}],"type":"MessageAction"},{"id":"2144015272","predicate":"messageActionChatEditPhoto","params":[{"name":"photo","type":"Photo"}],"type":"MessageAction"},{"id":"-1780220945","predicate":"messageActionChatDeletePhoto","params":[],"type":"MessageAction"},{"id":"1217033015","predicate":"messageActionChatAddUser","params":[{"name":"users","type":"Vector<int>"}],"type":"MessageAction"},{"id":"-1297179892","predicate":"messageActionChatDeleteUser","params":[{"name":"user_id","type":"int"}],"type":"MessageAction"},{"id":"739712882","predicate":"dialog","params":[{"name":"flags","type":"#"},{"name":"pinned","type":"flags.2?true"},{"name":"unread_mark","type":"flags.3?true"},{"name":"peer","type":"Peer"},{"name":"top_message","type":"int"},{"name":"read_inbox_max_id","type":"int"},{"name":"read_outbox_max_id","type":"int"},{"name":"unread_count","type":"int"},{"name":"unread_mentions_count","type":"int"},{"name":"notify_settings","type":"PeerNotifySettings"},{"name":"pts","type":"flags.0?int"},{"name":"draft","type":"flags.1?DraftMessage"},{"name":"folder_id","type":"flags.4?int"}],"type":"Dialog"},{"id":"590459437","predicate":"photoEmpty","params":[{"name":"id","type":"long"}],"type":"Photo"},{"id":"-797637467","predicate":"photo","params":[{"name":"flags","type":"#"},{"name":"has_stickers","type":"flags.0?true"},{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"file_reference","type":"bytes"},{"name":"date","type":"int"},{"name":"sizes","type":"Vector<PhotoSize>"},{"name":"dc_id","type":"int"}],"type":"Photo"},{"id":"236446268","predicate":"photoSizeEmpty","params":[{"name":"type","type":"string"}],"type":"PhotoSize"},{"id":"2009052699","predicate":"photoSize","params":[{"name":"type","type":"string"},{"name":"location","type":"FileLocation"},{"name":"w","type":"int"},{"name":"h","type":"int"},{"name":"size","type":"int"}],"type":"PhotoSize"},{"id":"-374917894","predicate":"photoCachedSize","params":[{"name":"type","type":"string"},{"name":"location","type":"FileLocation"},{"name":"w","type":"int"},{"name":"h","type":"int"},{"name":"bytes","type":"bytes"}],"type":"PhotoSize"},{"id":"286776671","predicate":"geoPointEmpty","params":[],"type":"GeoPoint"},{"id":"43446532","predicate":"geoPoint","params":[{"name":"long","type":"double"},{"name":"lat","type":"double"},{"name":"access_hash","type":"long"}],"type":"GeoPoint"},{"id":"1577067778","predicate":"auth.sentCode","params":[{"name":"flags","type":"#"},{"name":"type","type":"auth.SentCodeType"},{"name":"phone_code_hash","type":"string"},{"name":"next_type","type":"flags.1?auth.CodeType"},{"name":"timeout","type":"flags.2?int"}],"type":"auth.SentCode"},{"id":"-855308010","predicate":"auth.authorization","params":[{"name":"flags","type":"#"},{"name":"tmp_sessions","type":"flags.0?int"},{"name":"user","type":"User"}],"type":"auth.Authorization"},{"id":"-543777747","predicate":"auth.exportedAuthorization","params":[{"name":"id","type":"int"},{"name":"bytes","type":"bytes"}],"type":"auth.ExportedAuthorization"},{"id":"-1195615476","predicate":"inputNotifyPeer","params":[{"name":"peer","type":"InputPeer"}],"type":"InputNotifyPeer"},{"id":"423314455","predicate":"inputNotifyUsers","params":[],"type":"InputNotifyPeer"},{"id":"1251338318","predicate":"inputNotifyChats","params":[],"type":"InputNotifyPeer"},{"id":"-1673717362","predicate":"inputPeerNotifySettings","params":[{"name":"flags","type":"#"},{"name":"show_previews","type":"flags.0?Bool"},{"name":"silent","type":"flags.1?Bool"},{"name":"mute_until","type":"flags.2?int"},{"name":"sound","type":"flags.3?string"}],"type":"InputPeerNotifySettings"},{"id":"-1353671392","predicate":"peerNotifySettings","params":[{"name":"flags","type":"#"},{"name":"show_previews","type":"flags.0?Bool"},{"name":"silent","type":"flags.1?Bool"},{"name":"mute_until","type":"flags.2?int"},{"name":"sound","type":"flags.3?string"}],"type":"PeerNotifySettings"},{"id":"-2122045747","predicate":"peerSettings","params":[{"name":"flags","type":"#"},{"name":"report_spam","type":"flags.0?true"},{"name":"add_contact","type":"flags.1?true"},{"name":"block_contact","type":"flags.2?true"},{"name":"share_contact","type":"flags.3?true"},{"name":"need_contacts_exception","type":"flags.4?true"},{"name":"report_geo","type":"flags.5?true"}],"type":"PeerSettings"},{"id":"-1539849235","predicate":"wallPaper","params":[{"name":"id","type":"long"},{"name":"flags","type":"#"},{"name":"creator","type":"flags.0?true"},{"name":"default","type":"flags.1?true"},{"name":"pattern","type":"flags.3?true"},{"name":"dark","type":"flags.4?true"},{"name":"access_hash","type":"long"},{"name":"slug","type":"string"},{"name":"document","type":"Document"},{"name":"settings","type":"flags.2?WallPaperSettings"}],"type":"WallPaper"},{"id":"1490799288","predicate":"inputReportReasonSpam","params":[],"type":"ReportReason"},{"id":"505595789","predicate":"inputReportReasonViolence","params":[],"type":"ReportReason"},{"id":"777640226","predicate":"inputReportReasonPornography","params":[],"type":"ReportReason"},{"id":"-1376497949","predicate":"inputReportReasonChildAbuse","params":[],"type":"ReportReason"},{"id":"-512463606","predicate":"inputReportReasonOther","params":[{"name":"text","type":"string"}],"type":"ReportReason"},{"id":"-302941166","predicate":"userFull","params":[{"name":"flags","type":"#"},{"name":"blocked","type":"flags.0?true"},{"name":"phone_calls_available","type":"flags.4?true"},{"name":"phone_calls_private","type":"flags.5?true"},{"name":"can_pin_message","type":"flags.7?true"},{"name":"has_scheduled","type":"flags.12?true"},{"name":"user","type":"User"},{"name":"about","type":"flags.1?string"},{"name":"settings","type":"PeerSettings"},{"name":"profile_photo","type":"flags.2?Photo"},{"name":"notify_settings","type":"PeerNotifySettings"},{"name":"bot_info","type":"flags.3?BotInfo"},{"name":"pinned_msg_id","type":"flags.6?int"},{"name":"common_chats_count","type":"int"},{"name":"folder_id","type":"flags.11?int"}],"type":"UserFull"},{"id":"-116274796","predicate":"contact","params":[{"name":"user_id","type":"int"},{"name":"mutual","type":"Bool"}],"type":"Contact"},{"id":"-805141448","predicate":"importedContact","params":[{"name":"user_id","type":"int"},{"name":"client_id","type":"long"}],"type":"ImportedContact"},{"id":"1444661369","predicate":"contactBlocked","params":[{"name":"user_id","type":"int"},{"name":"date","type":"int"}],"type":"ContactBlocked"},{"id":"-748155807","predicate":"contactStatus","params":[{"name":"user_id","type":"int"},{"name":"status","type":"UserStatus"}],"type":"ContactStatus"},{"id":"-1219778094","predicate":"contacts.contactsNotModified","params":[],"type":"contacts.Contacts"},{"id":"-353862078","predicate":"contacts.contacts","params":[{"name":"contacts","type":"Vector<Contact>"},{"name":"saved_count","type":"int"},{"name":"users","type":"Vector<User>"}],"type":"contacts.Contacts"},{"id":"2010127419","predicate":"contacts.importedContacts","params":[{"name":"imported","type":"Vector<ImportedContact>"},{"name":"popular_invites","type":"Vector<PopularContact>"},{"name":"retry_contacts","type":"Vector<long>"},{"name":"users","type":"Vector<User>"}],"type":"contacts.ImportedContacts"},{"id":"471043349","predicate":"contacts.blocked","params":[{"name":"blocked","type":"Vector<ContactBlocked>"},{"name":"users","type":"Vector<User>"}],"type":"contacts.Blocked"},{"id":"-1878523231","predicate":"contacts.blockedSlice","params":[{"name":"count","type":"int"},{"name":"blocked","type":"Vector<ContactBlocked>"},{"name":"users","type":"Vector<User>"}],"type":"contacts.Blocked"},{"id":"364538944","predicate":"messages.dialogs","params":[{"name":"dialogs","type":"Vector<Dialog>"},{"name":"messages","type":"Vector<Message>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"messages.Dialogs"},{"id":"1910543603","predicate":"messages.dialogsSlice","params":[{"name":"count","type":"int"},{"name":"dialogs","type":"Vector<Dialog>"},{"name":"messages","type":"Vector<Message>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"messages.Dialogs"},{"id":"-1938715001","predicate":"messages.messages","params":[{"name":"messages","type":"Vector<Message>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"messages.Messages"},{"id":"-923939298","predicate":"messages.messagesSlice","params":[{"name":"flags","type":"#"},{"name":"inexact","type":"flags.1?true"},{"name":"count","type":"int"},{"name":"next_rate","type":"flags.0?int"},{"name":"messages","type":"Vector<Message>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"messages.Messages"},{"id":"1694474197","predicate":"messages.chats","params":[{"name":"chats","type":"Vector<Chat>"}],"type":"messages.Chats"},{"id":"-438840932","predicate":"messages.chatFull","params":[{"name":"full_chat","type":"ChatFull"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"messages.ChatFull"},{"id":"-1269012015","predicate":"messages.affectedHistory","params":[{"name":"pts","type":"int"},{"name":"pts_count","type":"int"},{"name":"offset","type":"int"}],"type":"messages.AffectedHistory"},{"id":"1474492012","predicate":"inputMessagesFilterEmpty","params":[],"type":"MessagesFilter"},{"id":"-1777752804","predicate":"inputMessagesFilterPhotos","params":[],"type":"MessagesFilter"},{"id":"-1614803355","predicate":"inputMessagesFilterVideo","params":[],"type":"MessagesFilter"},{"id":"1458172132","predicate":"inputMessagesFilterPhotoVideo","params":[],"type":"MessagesFilter"},{"id":"-1629621880","predicate":"inputMessagesFilterDocument","params":[],"type":"MessagesFilter"},{"id":"2129714567","predicate":"inputMessagesFilterUrl","params":[],"type":"MessagesFilter"},{"id":"-3644025","predicate":"inputMessagesFilterGif","params":[],"type":"MessagesFilter"},{"id":"522914557","predicate":"updateNewMessage","params":[{"name":"message","type":"Message"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"}],"type":"Update"},{"id":"1318109142","predicate":"updateMessageID","params":[{"name":"id","type":"int"},{"name":"random_id","type":"long"}],"type":"Update"},{"id":"-1576161051","predicate":"updateDeleteMessages","params":[{"name":"messages","type":"Vector<int>"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"}],"type":"Update"},{"id":"1548249383","predicate":"updateUserTyping","params":[{"name":"user_id","type":"int"},{"name":"action","type":"SendMessageAction"}],"type":"Update"},{"id":"-1704596961","predicate":"updateChatUserTyping","params":[{"name":"chat_id","type":"int"},{"name":"user_id","type":"int"},{"name":"action","type":"SendMessageAction"}],"type":"Update"},{"id":"125178264","predicate":"updateChatParticipants","params":[{"name":"participants","type":"ChatParticipants"}],"type":"Update"},{"id":"469489699","predicate":"updateUserStatus","params":[{"name":"user_id","type":"int"},{"name":"status","type":"UserStatus"}],"type":"Update"},{"id":"-1489818765","predicate":"updateUserName","params":[{"name":"user_id","type":"int"},{"name":"first_name","type":"string"},{"name":"last_name","type":"string"},{"name":"username","type":"string"}],"type":"Update"},{"id":"-1791935732","predicate":"updateUserPhoto","params":[{"name":"user_id","type":"int"},{"name":"date","type":"int"},{"name":"photo","type":"UserProfilePhoto"},{"name":"previous","type":"Bool"}],"type":"Update"},{"id":"-1519637954","predicate":"updates.state","params":[{"name":"pts","type":"int"},{"name":"qts","type":"int"},{"name":"date","type":"int"},{"name":"seq","type":"int"},{"name":"unread_count","type":"int"}],"type":"updates.State"},{"id":"1567990072","predicate":"updates.differenceEmpty","params":[{"name":"date","type":"int"},{"name":"seq","type":"int"}],"type":"updates.Difference"},{"id":"16030880","predicate":"updates.difference","params":[{"name":"new_messages","type":"Vector<Message>"},{"name":"new_encrypted_messages","type":"Vector<EncryptedMessage>"},{"name":"other_updates","type":"Vector<Update>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"},{"name":"state","type":"updates.State"}],"type":"updates.Difference"},{"id":"-1459938943","predicate":"updates.differenceSlice","params":[{"name":"new_messages","type":"Vector<Message>"},{"name":"new_encrypted_messages","type":"Vector<EncryptedMessage>"},{"name":"other_updates","type":"Vector<Update>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"},{"name":"intermediate_state","type":"updates.State"}],"type":"updates.Difference"},{"id":"-484987010","predicate":"updatesTooLong","params":[],"type":"Updates"},{"id":"-1857044719","predicate":"updateShortMessage","params":[{"name":"flags","type":"#"},{"name":"out","type":"flags.1?true"},{"name":"mentioned","type":"flags.4?true"},{"name":"media_unread","type":"flags.5?true"},{"name":"silent","type":"flags.13?true"},{"name":"id","type":"int"},{"name":"user_id","type":"int"},{"name":"message","type":"string"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"},{"name":"date","type":"int"},{"name":"fwd_from","type":"flags.2?MessageFwdHeader"},{"name":"via_bot_id","type":"flags.11?int"},{"name":"reply_to_msg_id","type":"flags.3?int"},{"name":"entities","type":"flags.7?Vector<MessageEntity>"}],"type":"Updates"},{"id":"377562760","predicate":"updateShortChatMessage","params":[{"name":"flags","type":"#"},{"name":"out","type":"flags.1?true"},{"name":"mentioned","type":"flags.4?true"},{"name":"media_unread","type":"flags.5?true"},{"name":"silent","type":"flags.13?true"},{"name":"id","type":"int"},{"name":"from_id","type":"int"},{"name":"chat_id","type":"int"},{"name":"message","type":"string"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"},{"name":"date","type":"int"},{"name":"fwd_from","type":"flags.2?MessageFwdHeader"},{"name":"via_bot_id","type":"flags.11?int"},{"name":"reply_to_msg_id","type":"flags.3?int"},{"name":"entities","type":"flags.7?Vector<MessageEntity>"}],"type":"Updates"},{"id":"2027216577","predicate":"updateShort","params":[{"name":"update","type":"Update"},{"name":"date","type":"int"}],"type":"Updates"},{"id":"1918567619","predicate":"updatesCombined","params":[{"name":"updates","type":"Vector<Update>"},{"name":"users","type":"Vector<User>"},{"name":"chats","type":"Vector<Chat>"},{"name":"date","type":"int"},{"name":"seq_start","type":"int"},{"name":"seq","type":"int"}],"type":"Updates"},{"id":"1957577280","predicate":"updates","params":[{"name":"updates","type":"Vector<Update>"},{"name":"users","type":"Vector<User>"},{"name":"chats","type":"Vector<Chat>"},{"name":"date","type":"int"},{"name":"seq","type":"int"}],"type":"Updates"},{"id":"-1916114267","predicate":"photos.photos","params":[{"name":"photos","type":"Vector<Photo>"},{"name":"users","type":"Vector<User>"}],"type":"photos.Photos"},{"id":"352657236","predicate":"photos.photosSlice","params":[{"name":"count","type":"int"},{"name":"photos","type":"Vector<Photo>"},{"name":"users","type":"Vector<User>"}],"type":"photos.Photos"},{"id":"539045032","predicate":"photos.photo","params":[{"name":"photo","type":"Photo"},{"name":"users","type":"Vector<User>"}],"type":"photos.Photo"},{"id":"157948117","predicate":"upload.file","params":[{"name":"type","type":"storage.FileType"},{"name":"mtime","type":"int"},{"name":"bytes","type":"bytes"}],"type":"upload.File"},{"id":"414687501","predicate":"dcOption","params":[{"name":"flags","type":"#"},{"name":"ipv6","type":"flags.0?true"},{"name":"media_only","type":"flags.1?true"},{"name":"tcpo_only","type":"flags.2?true"},{"name":"cdn","type":"flags.3?true"},{"name":"static","type":"flags.4?true"},{"name":"id","type":"int"},{"name":"ip_address","type":"string"},{"name":"port","type":"int"},{"name":"secret","type":"flags.10?bytes"}],"type":"DcOption"},{"id":"856375399","predicate":"config","params":[{"name":"flags","type":"#"},{"name":"phonecalls_enabled","type":"flags.1?true"},{"name":"default_p2p_contacts","type":"flags.3?true"},{"name":"preload_featured_stickers","type":"flags.4?true"},{"name":"ignore_phone_entities","type":"flags.5?true"},{"name":"revoke_pm_inbox","type":"flags.6?true"},{"name":"blocked_mode","type":"flags.8?true"},{"name":"pfs_enabled","type":"flags.13?true"},{"name":"date","type":"int"},{"name":"expires","type":"int"},{"name":"test_mode","type":"Bool"},{"name":"this_dc","type":"int"},{"name":"dc_options","type":"Vector<DcOption>"},{"name":"dc_txt_domain_name","type":"string"},{"name":"chat_size_max","type":"int"},{"name":"megagroup_size_max","type":"int"},{"name":"forwarded_count_max","type":"int"},{"name":"online_update_period_ms","type":"int"},{"name":"offline_blur_timeout_ms","type":"int"},{"name":"offline_idle_timeout_ms","type":"int"},{"name":"online_cloud_timeout_ms","type":"int"},{"name":"notify_cloud_delay_ms","type":"int"},{"name":"notify_default_delay_ms","type":"int"},{"name":"push_chat_period_ms","type":"int"},{"name":"push_chat_limit","type":"int"},{"name":"saved_gifs_limit","type":"int"},{"name":"edit_time_limit","type":"int"},{"name":"revoke_time_limit","type":"int"},{"name":"revoke_pm_time_limit","type":"int"},{"name":"rating_e_decay","type":"int"},{"name":"stickers_recent_limit","type":"int"},{"name":"stickers_faved_limit","type":"int"},{"name":"channels_read_media_period","type":"int"},{"name":"tmp_sessions","type":"flags.0?int"},{"name":"pinned_dialogs_count_max","type":"int"},{"name":"pinned_infolder_count_max","type":"int"},{"name":"call_receive_timeout_ms","type":"int"},{"name":"call_ring_timeout_ms","type":"int"},{"name":"call_connect_timeout_ms","type":"int"},{"name":"call_packet_timeout_ms","type":"int"},{"name":"me_url_prefix","type":"string"},{"name":"autoupdate_url_prefix","type":"flags.7?string"},{"name":"gif_search_username","type":"flags.9?string"},{"name":"venue_search_username","type":"flags.10?string"},{"name":"img_search_username","type":"flags.11?string"},{"name":"static_maps_provider","type":"flags.12?string"},{"name":"caption_length_max","type":"int"},{"name":"message_length_max","type":"int"},{"name":"webfile_dc_id","type":"int"},{"name":"suggested_lang_code","type":"flags.2?string"},{"name":"lang_pack_version","type":"flags.2?int"},{"name":"base_lang_pack_version","type":"flags.2?int"}],"type":"Config"},{"id":"-1910892683","predicate":"nearestDc","params":[{"name":"country","type":"string"},{"name":"this_dc","type":"int"},{"name":"nearest_dc","type":"int"}],"type":"NearestDc"},{"id":"497489295","predicate":"help.appUpdate","params":[{"name":"flags","type":"#"},{"name":"can_not_skip","type":"flags.0?true"},{"name":"id","type":"int"},{"name":"version","type":"string"},{"name":"text","type":"string"},{"name":"entities","type":"Vector<MessageEntity>"},{"name":"document","type":"flags.1?Document"},{"name":"url","type":"flags.2?string"}],"type":"help.AppUpdate"},{"id":"-1000708810","predicate":"help.noAppUpdate","params":[],"type":"help.AppUpdate"},{"id":"415997816","predicate":"help.inviteText","params":[{"name":"message","type":"string"}],"type":"help.InviteText"},{"id":"314359194","predicate":"updateNewEncryptedMessage","params":[{"name":"message","type":"EncryptedMessage"},{"name":"qts","type":"int"}],"type":"Update"},{"id":"386986326","predicate":"updateEncryptedChatTyping","params":[{"name":"chat_id","type":"int"}],"type":"Update"},{"id":"-1264392051","predicate":"updateEncryption","params":[{"name":"chat","type":"EncryptedChat"},{"name":"date","type":"int"}],"type":"Update"},{"id":"956179895","predicate":"updateEncryptedMessagesRead","params":[{"name":"chat_id","type":"int"},{"name":"max_date","type":"int"},{"name":"date","type":"int"}],"type":"Update"},{"id":"-1417756512","predicate":"encryptedChatEmpty","params":[{"name":"id","type":"int"}],"type":"EncryptedChat"},{"id":"1006044124","predicate":"encryptedChatWaiting","params":[{"name":"id","type":"int"},{"name":"access_hash","type":"long"},{"name":"date","type":"int"},{"name":"admin_id","type":"int"},{"name":"participant_id","type":"int"}],"type":"EncryptedChat"},{"id":"-931638658","predicate":"encryptedChatRequested","params":[{"name":"id","type":"int"},{"name":"access_hash","type":"long"},{"name":"date","type":"int"},{"name":"admin_id","type":"int"},{"name":"participant_id","type":"int"},{"name":"g_a","type":"bytes"}],"type":"EncryptedChat"},{"id":"-94974410","predicate":"encryptedChat","params":[{"name":"id","type":"int"},{"name":"access_hash","type":"long"},{"name":"date","type":"int"},{"name":"admin_id","type":"int"},{"name":"participant_id","type":"int"},{"name":"g_a_or_b","type":"bytes"},{"name":"key_fingerprint","type":"long"}],"type":"EncryptedChat"},{"id":"332848423","predicate":"encryptedChatDiscarded","params":[{"name":"id","type":"int"}],"type":"EncryptedChat"},{"id":"-247351839","predicate":"inputEncryptedChat","params":[{"name":"chat_id","type":"int"},{"name":"access_hash","type":"long"}],"type":"InputEncryptedChat"},{"id":"-1038136962","predicate":"encryptedFileEmpty","params":[],"type":"EncryptedFile"},{"id":"1248893260","predicate":"encryptedFile","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"size","type":"int"},{"name":"dc_id","type":"int"},{"name":"key_fingerprint","type":"int"}],"type":"EncryptedFile"},{"id":"406307684","predicate":"inputEncryptedFileEmpty","params":[],"type":"InputEncryptedFile"},{"id":"1690108678","predicate":"inputEncryptedFileUploaded","params":[{"name":"id","type":"long"},{"name":"parts","type":"int"},{"name":"md5_checksum","type":"string"},{"name":"key_fingerprint","type":"int"}],"type":"InputEncryptedFile"},{"id":"1511503333","predicate":"inputEncryptedFile","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"}],"type":"InputEncryptedFile"},{"id":"-182231723","predicate":"inputEncryptedFileLocation","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"}],"type":"InputFileLocation"},{"id":"-317144808","predicate":"encryptedMessage","params":[{"name":"random_id","type":"long"},{"name":"chat_id","type":"int"},{"name":"date","type":"int"},{"name":"bytes","type":"bytes"},{"name":"file","type":"EncryptedFile"}],"type":"EncryptedMessage"},{"id":"594758406","predicate":"encryptedMessageService","params":[{"name":"random_id","type":"long"},{"name":"chat_id","type":"int"},{"name":"date","type":"int"},{"name":"bytes","type":"bytes"}],"type":"EncryptedMessage"},{"id":"-1058912715","predicate":"messages.dhConfigNotModified","params":[{"name":"random","type":"bytes"}],"type":"messages.DhConfig"},{"id":"740433629","predicate":"messages.dhConfig","params":[{"name":"g","type":"int"},{"name":"p","type":"bytes"},{"name":"version","type":"int"},{"name":"random","type":"bytes"}],"type":"messages.DhConfig"},{"id":"1443858741","predicate":"messages.sentEncryptedMessage","params":[{"name":"date","type":"int"}],"type":"messages.SentEncryptedMessage"},{"id":"-1802240206","predicate":"messages.sentEncryptedFile","params":[{"name":"date","type":"int"},{"name":"file","type":"EncryptedFile"}],"type":"messages.SentEncryptedMessage"},{"id":"-95482955","predicate":"inputFileBig","params":[{"name":"id","type":"long"},{"name":"parts","type":"int"},{"name":"name","type":"string"}],"type":"InputFile"},{"id":"767652808","predicate":"inputEncryptedFileBigUploaded","params":[{"name":"id","type":"long"},{"name":"parts","type":"int"},{"name":"key_fingerprint","type":"int"}],"type":"InputEncryptedFile"},{"id":"-364179876","predicate":"updateChatParticipantAdd","params":[{"name":"chat_id","type":"int"},{"name":"user_id","type":"int"},{"name":"inviter_id","type":"int"},{"name":"date","type":"int"},{"name":"version","type":"int"}],"type":"Update"},{"id":"1851755554","predicate":"updateChatParticipantDelete","params":[{"name":"chat_id","type":"int"},{"name":"user_id","type":"int"},{"name":"version","type":"int"}],"type":"Update"},{"id":"-1906403213","predicate":"updateDcOptions","params":[{"name":"dc_options","type":"Vector<DcOption>"}],"type":"Update"},{"id":"1530447553","predicate":"inputMediaUploadedDocument","params":[{"name":"flags","type":"#"},{"name":"nosound_video","type":"flags.3?true"},{"name":"file","type":"InputFile"},{"name":"thumb","type":"flags.2?InputFile"},{"name":"mime_type","type":"string"},{"name":"attributes","type":"Vector<DocumentAttribute>"},{"name":"stickers","type":"flags.0?Vector<InputDocument>"},{"name":"ttl_seconds","type":"flags.1?int"}],"type":"InputMedia"},{"id":"598418386","predicate":"inputMediaDocument","params":[{"name":"flags","type":"#"},{"name":"id","type":"InputDocument"},{"name":"ttl_seconds","type":"flags.0?int"}],"type":"InputMedia"},{"id":"-1666158377","predicate":"messageMediaDocument","params":[{"name":"flags","type":"#"},{"name":"document","type":"flags.0?Document"},{"name":"ttl_seconds","type":"flags.2?int"}],"type":"MessageMedia"},{"id":"1928391342","predicate":"inputDocumentEmpty","params":[],"type":"InputDocument"},{"id":"448771445","predicate":"inputDocument","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"file_reference","type":"bytes"}],"type":"InputDocument"},{"id":"-1160743548","predicate":"inputDocumentFileLocation","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"file_reference","type":"bytes"},{"name":"thumb_size","type":"string"}],"type":"InputFileLocation"},{"id":"922273905","predicate":"documentEmpty","params":[{"name":"id","type":"long"}],"type":"Document"},{"id":"-1683841855","predicate":"document","params":[{"name":"flags","type":"#"},{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"file_reference","type":"bytes"},{"name":"date","type":"int"},{"name":"mime_type","type":"string"},{"name":"size","type":"int"},{"name":"thumbs","type":"flags.0?Vector<PhotoSize>"},{"name":"dc_id","type":"int"},{"name":"attributes","type":"Vector<DocumentAttribute>"}],"type":"Document"},{"id":"398898678","predicate":"help.support","params":[{"name":"phone_number","type":"string"},{"name":"user","type":"User"}],"type":"help.Support"},{"id":"-1613493288","predicate":"notifyPeer","params":[{"name":"peer","type":"Peer"}],"type":"NotifyPeer"},{"id":"-1261946036","predicate":"notifyUsers","params":[],"type":"NotifyPeer"},{"id":"-1073230141","predicate":"notifyChats","params":[],"type":"NotifyPeer"},{"id":"-2131957734","predicate":"updateUserBlocked","params":[{"name":"user_id","type":"int"},{"name":"blocked","type":"Bool"}],"type":"Update"},{"id":"-1094555409","predicate":"updateNotifySettings","params":[{"name":"peer","type":"NotifyPeer"},{"name":"notify_settings","type":"PeerNotifySettings"}],"type":"Update"},{"id":"381645902","predicate":"sendMessageTypingAction","params":[],"type":"SendMessageAction"},{"id":"-44119819","predicate":"sendMessageCancelAction","params":[],"type":"SendMessageAction"},{"id":"-1584933265","predicate":"sendMessageRecordVideoAction","params":[],"type":"SendMessageAction"},{"id":"-378127636","predicate":"sendMessageUploadVideoAction","params":[{"name":"progress","type":"int"}],"type":"SendMessageAction"},{"id":"-718310409","predicate":"sendMessageRecordAudioAction","params":[],"type":"SendMessageAction"},{"id":"-212740181","predicate":"sendMessageUploadAudioAction","params":[{"name":"progress","type":"int"}],"type":"SendMessageAction"},{"id":"-774682074","predicate":"sendMessageUploadPhotoAction","params":[{"name":"progress","type":"int"}],"type":"SendMessageAction"},{"id":"-1441998364","predicate":"sendMessageUploadDocumentAction","params":[{"name":"progress","type":"int"}],"type":"SendMessageAction"},{"id":"393186209","predicate":"sendMessageGeoLocationAction","params":[],"type":"SendMessageAction"},{"id":"1653390447","predicate":"sendMessageChooseContactAction","params":[],"type":"SendMessageAction"},{"id":"-1290580579","predicate":"contacts.found","params":[{"name":"my_results","type":"Vector<Peer>"},{"name":"results","type":"Vector<Peer>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"contacts.Found"},{"id":"-337352679","predicate":"updateServiceNotification","params":[{"name":"flags","type":"#"},{"name":"popup","type":"flags.0?true"},{"name":"inbox_date","type":"flags.1?int"},{"name":"type","type":"string"},{"name":"message","type":"string"},{"name":"media","type":"MessageMedia"},{"name":"entities","type":"Vector<MessageEntity>"}],"type":"Update"},{"id":"-496024847","predicate":"userStatusRecently","params":[],"type":"UserStatus"},{"id":"129960444","predicate":"userStatusLastWeek","params":[],"type":"UserStatus"},{"id":"2011940674","predicate":"userStatusLastMonth","params":[],"type":"UserStatus"},{"id":"-298113238","predicate":"updatePrivacy","params":[{"name":"key","type":"PrivacyKey"},{"name":"rules","type":"Vector<PrivacyRule>"}],"type":"Update"},{"id":"1335282456","predicate":"inputPrivacyKeyStatusTimestamp","params":[],"type":"InputPrivacyKey"},{"id":"-1137792208","predicate":"privacyKeyStatusTimestamp","params":[],"type":"PrivacyKey"},{"id":"218751099","predicate":"inputPrivacyValueAllowContacts","params":[],"type":"InputPrivacyRule"},{"id":"407582158","predicate":"inputPrivacyValueAllowAll","params":[],"type":"InputPrivacyRule"},{"id":"320652927","predicate":"inputPrivacyValueAllowUsers","params":[{"name":"users","type":"Vector<InputUser>"}],"type":"InputPrivacyRule"},{"id":"195371015","predicate":"inputPrivacyValueDisallowContacts","params":[],"type":"InputPrivacyRule"},{"id":"-697604407","predicate":"inputPrivacyValueDisallowAll","params":[],"type":"InputPrivacyRule"},{"id":"-1877932953","predicate":"inputPrivacyValueDisallowUsers","params":[{"name":"users","type":"Vector<InputUser>"}],"type":"InputPrivacyRule"},{"id":"-123988","predicate":"privacyValueAllowContacts","params":[],"type":"PrivacyRule"},{"id":"1698855810","predicate":"privacyValueAllowAll","params":[],"type":"PrivacyRule"},{"id":"1297858060","predicate":"privacyValueAllowUsers","params":[{"name":"users","type":"Vector<int>"}],"type":"PrivacyRule"},{"id":"-125240806","predicate":"privacyValueDisallowContacts","params":[],"type":"PrivacyRule"},{"id":"-1955338397","predicate":"privacyValueDisallowAll","params":[],"type":"PrivacyRule"},{"id":"209668535","predicate":"privacyValueDisallowUsers","params":[{"name":"users","type":"Vector<int>"}],"type":"PrivacyRule"},{"id":"1352683077","predicate":"account.privacyRules","params":[{"name":"rules","type":"Vector<PrivacyRule>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"account.PrivacyRules"},{"id":"-1194283041","predicate":"accountDaysTTL","params":[{"name":"days","type":"int"}],"type":"AccountDaysTTL"},{"id":"314130811","predicate":"updateUserPhone","params":[{"name":"user_id","type":"int"},{"name":"phone","type":"string"}],"type":"Update"},{"id":"1815593308","predicate":"documentAttributeImageSize","params":[{"name":"w","type":"int"},{"name":"h","type":"int"}],"type":"DocumentAttribute"},{"id":"297109817","predicate":"documentAttributeAnimated","params":[],"type":"DocumentAttribute"},{"id":"1662637586","predicate":"documentAttributeSticker","params":[{"name":"flags","type":"#"},{"name":"mask","type":"flags.1?true"},{"name":"alt","type":"string"},{"name":"stickerset","type":"InputStickerSet"},{"name":"mask_coords","type":"flags.0?MaskCoords"}],"type":"DocumentAttribute"},{"id":"250621158","predicate":"documentAttributeVideo","params":[{"name":"flags","type":"#"},{"name":"round_message","type":"flags.0?true"},{"name":"supports_streaming","type":"flags.1?true"},{"name":"duration","type":"int"},{"name":"w","type":"int"},{"name":"h","type":"int"}],"type":"DocumentAttribute"},{"id":"-1739392570","predicate":"documentAttributeAudio","params":[{"name":"flags","type":"#"},{"name":"voice","type":"flags.10?true"},{"name":"duration","type":"int"},{"name":"title","type":"flags.0?string"},{"name":"performer","type":"flags.1?string"},{"name":"waveform","type":"flags.2?bytes"}],"type":"DocumentAttribute"},{"id":"358154344","predicate":"documentAttributeFilename","params":[{"name":"file_name","type":"string"}],"type":"DocumentAttribute"},{"id":"-244016606","predicate":"messages.stickersNotModified","params":[],"type":"messages.Stickers"},{"id":"-463889475","predicate":"messages.stickers","params":[{"name":"hash","type":"int"},{"name":"stickers","type":"Vector<Document>"}],"type":"messages.Stickers"},{"id":"313694676","predicate":"stickerPack","params":[{"name":"emoticon","type":"string"},{"name":"documents","type":"Vector<long>"}],"type":"StickerPack"},{"id":"-395967805","predicate":"messages.allStickersNotModified","params":[],"type":"messages.AllStickers"},{"id":"-302170017","predicate":"messages.allStickers","params":[{"name":"hash","type":"int"},{"name":"sets","type":"Vector<StickerSet>"}],"type":"messages.AllStickers"},{"id":"-1667805217","predicate":"updateReadHistoryInbox","params":[{"name":"flags","type":"#"},{"name":"folder_id","type":"flags.0?int"},{"name":"peer","type":"Peer"},{"name":"max_id","type":"int"},{"name":"still_unread_count","type":"int"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"}],"type":"Update"},{"id":"791617983","predicate":"updateReadHistoryOutbox","params":[{"name":"peer","type":"Peer"},{"name":"max_id","type":"int"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"}],"type":"Update"},{"id":"-2066640507","predicate":"messages.affectedMessages","params":[{"name":"pts","type":"int"},{"name":"pts_count","type":"int"}],"type":"messages.AffectedMessages"},{"id":"2139689491","predicate":"updateWebPage","params":[{"name":"webpage","type":"WebPage"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"}],"type":"Update"},{"id":"-350980120","predicate":"webPageEmpty","params":[{"name":"id","type":"long"}],"type":"WebPage"},{"id":"-981018084","predicate":"webPagePending","params":[{"name":"id","type":"long"},{"name":"date","type":"int"}],"type":"WebPage"},{"id":"-392411726","predicate":"webPage","params":[{"name":"flags","type":"#"},{"name":"id","type":"long"},{"name":"url","type":"string"},{"name":"display_url","type":"string"},{"name":"hash","type":"int"},{"name":"type","type":"flags.0?string"},{"name":"site_name","type":"flags.1?string"},{"name":"title","type":"flags.2?string"},{"name":"description","type":"flags.3?string"},{"name":"photo","type":"flags.4?Photo"},{"name":"embed_url","type":"flags.5?string"},{"name":"embed_type","type":"flags.5?string"},{"name":"embed_width","type":"flags.6?int"},{"name":"embed_height","type":"flags.6?int"},{"name":"duration","type":"flags.7?int"},{"name":"author","type":"flags.8?string"},{"name":"document","type":"flags.9?Document"},{"name":"cached_page","type":"flags.10?Page"},{"name":"attributes","type":"flags.12?Vector<WebPageAttribute>"}],"type":"WebPage"},{"id":"-1557277184","predicate":"messageMediaWebPage","params":[{"name":"webpage","type":"WebPage"}],"type":"MessageMedia"},{"id":"-1392388579","predicate":"authorization","params":[{"name":"flags","type":"#"},{"name":"current","type":"flags.0?true"},{"name":"official_app","type":"flags.1?true"},{"name":"password_pending","type":"flags.2?true"},{"name":"hash","type":"long"},{"name":"device_model","type":"string"},{"name":"platform","type":"string"},{"name":"system_version","type":"string"},{"name":"api_id","type":"int"},{"name":"app_name","type":"string"},{"name":"app_version","type":"string"},{"name":"date_created","type":"int"},{"name":"date_active","type":"int"},{"name":"ip","type":"string"},{"name":"country","type":"string"},{"name":"region","type":"string"}],"type":"Authorization"},{"id":"307276766","predicate":"account.authorizations","params":[{"name":"authorizations","type":"Vector<Authorization>"}],"type":"account.Authorizations"},{"id":"-1390001672","predicate":"account.password","params":[{"name":"flags","type":"#"},{"name":"has_recovery","type":"flags.0?true"},{"name":"has_secure_values","type":"flags.1?true"},{"name":"has_password","type":"flags.2?true"},{"name":"current_algo","type":"flags.2?PasswordKdfAlgo"},{"name":"srp_B","type":"flags.2?bytes"},{"name":"srp_id","type":"flags.2?long"},{"name":"hint","type":"flags.3?string"},{"name":"email_unconfirmed_pattern","type":"flags.4?string"},{"name":"new_algo","type":"PasswordKdfAlgo"},{"name":"new_secure_algo","type":"SecurePasswordKdfAlgo"},{"name":"secure_random","type":"bytes"}],"type":"account.Password"},{"id":"-1705233435","predicate":"account.passwordSettings","params":[{"name":"flags","type":"#"},{"name":"email","type":"flags.0?string"},{"name":"secure_settings","type":"flags.1?SecureSecretSettings"}],"type":"account.PasswordSettings"},{"id":"-1036572727","predicate":"account.passwordInputSettings","params":[{"name":"flags","type":"#"},{"name":"new_algo","type":"flags.0?PasswordKdfAlgo"},{"name":"new_password_hash","type":"flags.0?bytes"},{"name":"hint","type":"flags.0?string"},{"name":"email","type":"flags.1?string"},{"name":"new_secure_settings","type":"flags.2?SecureSecretSettings"}],"type":"account.PasswordInputSettings"},{"id":"326715557","predicate":"auth.passwordRecovery","params":[{"name":"email_pattern","type":"string"}],"type":"auth.PasswordRecovery"},{"id":"-1052959727","predicate":"inputMediaVenue","params":[{"name":"geo_point","type":"InputGeoPoint"},{"name":"title","type":"string"},{"name":"address","type":"string"},{"name":"provider","type":"string"},{"name":"venue_id","type":"string"},{"name":"venue_type","type":"string"}],"type":"InputMedia"},{"id":"784356159","predicate":"messageMediaVenue","params":[{"name":"geo","type":"GeoPoint"},{"name":"title","type":"string"},{"name":"address","type":"string"},{"name":"provider","type":"string"},{"name":"venue_id","type":"string"},{"name":"venue_type","type":"string"}],"type":"MessageMedia"},{"id":"-1551583367","predicate":"receivedNotifyMessage","params":[{"name":"id","type":"int"},{"name":"flags","type":"int"}],"type":"ReceivedNotifyMessage"},{"id":"1776236393","predicate":"chatInviteEmpty","params":[],"type":"ExportedChatInvite"},{"id":"-64092740","predicate":"chatInviteExported","params":[{"name":"link","type":"string"}],"type":"ExportedChatInvite"},{"id":"1516793212","predicate":"chatInviteAlready","params":[{"name":"chat","type":"Chat"}],"type":"ChatInvite"},{"id":"-540871282","predicate":"chatInvite","params":[{"name":"flags","type":"#"},{"name":"channel","type":"flags.0?true"},{"name":"broadcast","type":"flags.1?true"},{"name":"public","type":"flags.2?true"},{"name":"megagroup","type":"flags.3?true"},{"name":"title","type":"string"},{"name":"photo","type":"Photo"},{"name":"participants_count","type":"int"},{"name":"participants","type":"flags.4?Vector<User>"}],"type":"ChatInvite"},{"id":"-123931160","predicate":"messageActionChatJoinedByLink","params":[{"name":"inviter_id","type":"int"}],"type":"MessageAction"},{"id":"1757493555","predicate":"updateReadMessagesContents","params":[{"name":"messages","type":"Vector<int>"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"}],"type":"Update"},{"id":"-4838507","predicate":"inputStickerSetEmpty","params":[],"type":"InputStickerSet"},{"id":"-1645763991","predicate":"inputStickerSetID","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"}],"type":"InputStickerSet"},{"id":"-2044933984","predicate":"inputStickerSetShortName","params":[{"name":"short_name","type":"string"}],"type":"InputStickerSet"},{"id":"-290164953","predicate":"stickerSet","params":[{"name":"flags","type":"#"},{"name":"archived","type":"flags.1?true"},{"name":"official","type":"flags.2?true"},{"name":"masks","type":"flags.3?true"},{"name":"animated","type":"flags.5?true"},{"name":"installed_date","type":"flags.0?int"},{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"title","type":"string"},{"name":"short_name","type":"string"},{"name":"thumb","type":"flags.4?PhotoSize"},{"name":"thumb_dc_id","type":"flags.4?int"},{"name":"count","type":"int"},{"name":"hash","type":"int"}],"type":"StickerSet"},{"id":"-1240849242","predicate":"messages.stickerSet","params":[{"name":"set","type":"StickerSet"},{"name":"packs","type":"Vector<StickerPack>"},{"name":"documents","type":"Vector<Document>"}],"type":"messages.StickerSet"},{"id":"-1820043071","predicate":"user","params":[{"name":"flags","type":"#"},{"name":"self","type":"flags.10?true"},{"name":"contact","type":"flags.11?true"},{"name":"mutual_contact","type":"flags.12?true"},{"name":"deleted","type":"flags.13?true"},{"name":"bot","type":"flags.14?true"},{"name":"bot_chat_history","type":"flags.15?true"},{"name":"bot_nochats","type":"flags.16?true"},{"name":"verified","type":"flags.17?true"},{"name":"restricted","type":"flags.18?true"},{"name":"min","type":"flags.20?true"},{"name":"bot_inline_geo","type":"flags.21?true"},{"name":"support","type":"flags.23?true"},{"name":"scam","type":"flags.24?true"},{"name":"id","type":"int"},{"name":"access_hash","type":"flags.0?long"},{"name":"first_name","type":"flags.1?string"},{"name":"last_name","type":"flags.2?string"},{"name":"username","type":"flags.3?string"},{"name":"phone","type":"flags.4?string"},{"name":"photo","type":"flags.5?UserProfilePhoto"},{"name":"status","type":"flags.6?UserStatus"},{"name":"bot_info_version","type":"flags.14?int"},{"name":"restriction_reason","type":"flags.18?Vector<RestrictionReason>"},{"name":"bot_inline_placeholder","type":"flags.19?string"},{"name":"lang_code","type":"flags.22?string"}],"type":"User"},{"id":"-1032140601","predicate":"botCommand","params":[{"name":"command","type":"string"},{"name":"description","type":"string"}],"type":"BotCommand"},{"id":"-1729618630","predicate":"botInfo","params":[{"name":"user_id","type":"int"},{"name":"description","type":"string"},{"name":"commands","type":"Vector<BotCommand>"}],"type":"BotInfo"},{"id":"-1560655744","predicate":"keyboardButton","params":[{"name":"text","type":"string"}],"type":"KeyboardButton"},{"id":"2002815875","predicate":"keyboardButtonRow","params":[{"name":"buttons","type":"Vector<KeyboardButton>"}],"type":"KeyboardButtonRow"},{"id":"-1606526075","predicate":"replyKeyboardHide","params":[{"name":"flags","type":"#"},{"name":"selective","type":"flags.2?true"}],"type":"ReplyMarkup"},{"id":"-200242528","predicate":"replyKeyboardForceReply","params":[{"name":"flags","type":"#"},{"name":"single_use","type":"flags.1?true"},{"name":"selective","type":"flags.2?true"}],"type":"ReplyMarkup"},{"id":"889353612","predicate":"replyKeyboardMarkup","params":[{"name":"flags","type":"#"},{"name":"resize","type":"flags.0?true"},{"name":"single_use","type":"flags.1?true"},{"name":"selective","type":"flags.2?true"},{"name":"rows","type":"Vector<KeyboardButtonRow>"}],"type":"ReplyMarkup"},{"id":"2072935910","predicate":"inputPeerUser","params":[{"name":"user_id","type":"int"},{"name":"access_hash","type":"long"}],"type":"InputPeer"},{"id":"-668391402","predicate":"inputUser","params":[{"name":"user_id","type":"int"},{"name":"access_hash","type":"long"}],"type":"InputUser"},{"id":"-1148011883","predicate":"messageEntityUnknown","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"-100378723","predicate":"messageEntityMention","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"1868782349","predicate":"messageEntityHashtag","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"1827637959","predicate":"messageEntityBotCommand","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"1859134776","predicate":"messageEntityUrl","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"1692693954","predicate":"messageEntityEmail","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"-1117713463","predicate":"messageEntityBold","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"-2106619040","predicate":"messageEntityItalic","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"681706865","predicate":"messageEntityCode","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"1938967520","predicate":"messageEntityPre","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"},{"name":"language","type":"string"}],"type":"MessageEntity"},{"id":"1990644519","predicate":"messageEntityTextUrl","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"},{"name":"url","type":"string"}],"type":"MessageEntity"},{"id":"301019932","predicate":"updateShortSentMessage","params":[{"name":"flags","type":"#"},{"name":"out","type":"flags.1?true"},{"name":"id","type":"int"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"},{"name":"date","type":"int"},{"name":"media","type":"flags.9?MessageMedia"},{"name":"entities","type":"flags.7?Vector<MessageEntity>"}],"type":"Updates"},{"id":"-292807034","predicate":"inputChannelEmpty","params":[],"type":"InputChannel"},{"id":"-1343524562","predicate":"inputChannel","params":[{"name":"channel_id","type":"int"},{"name":"access_hash","type":"long"}],"type":"InputChannel"},{"id":"-1109531342","predicate":"peerChannel","params":[{"name":"channel_id","type":"int"}],"type":"Peer"},{"id":"548253432","predicate":"inputPeerChannel","params":[{"name":"channel_id","type":"int"},{"name":"access_hash","type":"long"}],"type":"InputPeer"},{"id":"-753232354","predicate":"channel","params":[{"name":"flags","type":"#"},{"name":"creator","type":"flags.0?true"},{"name":"left","type":"flags.2?true"},{"name":"broadcast","type":"flags.5?true"},{"name":"verified","type":"flags.7?true"},{"name":"megagroup","type":"flags.8?true"},{"name":"restricted","type":"flags.9?true"},{"name":"signatures","type":"flags.11?true"},{"name":"min","type":"flags.12?true"},{"name":"scam","type":"flags.19?true"},{"name":"has_link","type":"flags.20?true"},{"name":"has_geo","type":"flags.21?true"},{"name":"slowmode_enabled","type":"flags.22?true"},{"name":"id","type":"int"},{"name":"access_hash","type":"flags.13?long"},{"name":"title","type":"string"},{"name":"username","type":"flags.6?string"},{"name":"photo","type":"ChatPhoto"},{"name":"date","type":"int"},{"name":"version","type":"int"},{"name":"restriction_reason","type":"flags.9?Vector<RestrictionReason>"},{"name":"admin_rights","type":"flags.14?ChatAdminRights"},{"name":"banned_rights","type":"flags.15?ChatBannedRights"},{"name":"default_banned_rights","type":"flags.18?ChatBannedRights"},{"name":"participants_count","type":"flags.17?int"}],"type":"Chat"},{"id":"681420594","predicate":"channelForbidden","params":[{"name":"flags","type":"#"},{"name":"broadcast","type":"flags.5?true"},{"name":"megagroup","type":"flags.8?true"},{"name":"id","type":"int"},{"name":"access_hash","type":"long"},{"name":"title","type":"string"},{"name":"until_date","type":"flags.16?int"}],"type":"Chat"},{"id":"2131196633","predicate":"contacts.resolvedPeer","params":[{"name":"peer","type":"Peer"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"contacts.ResolvedPeer"},{"id":"-253335766","predicate":"channelFull","params":[{"name":"flags","type":"#"},{"name":"can_view_participants","type":"flags.3?true"},{"name":"can_set_username","type":"flags.6?true"},{"name":"can_set_stickers","type":"flags.7?true"},{"name":"hidden_prehistory","type":"flags.10?true"},{"name":"can_view_stats","type":"flags.12?true"},{"name":"can_set_location","type":"flags.16?true"},{"name":"has_scheduled","type":"flags.19?true"},{"name":"id","type":"int"},{"name":"about","type":"string"},{"name":"participants_count","type":"flags.0?int"},{"name":"admins_count","type":"flags.1?int"},{"name":"kicked_count","type":"flags.2?int"},{"name":"banned_count","type":"flags.2?int"},{"name":"online_count","type":"flags.13?int"},{"name":"read_inbox_max_id","type":"int"},{"name":"read_outbox_max_id","type":"int"},{"name":"unread_count","type":"int"},{"name":"chat_photo","type":"Photo"},{"name":"notify_settings","type":"PeerNotifySettings"},{"name":"exported_invite","type":"ExportedChatInvite"},{"name":"bot_info","type":"Vector<BotInfo>"},{"name":"migrated_from_chat_id","type":"flags.4?int"},{"name":"migrated_from_max_id","type":"flags.4?int"},{"name":"pinned_msg_id","type":"flags.5?int"},{"name":"stickerset","type":"flags.8?StickerSet"},{"name":"available_min_id","type":"flags.9?int"},{"name":"folder_id","type":"flags.11?int"},{"name":"linked_chat_id","type":"flags.14?int"},{"name":"location","type":"flags.15?ChannelLocation"},{"name":"slowmode_seconds","type":"flags.17?int"},{"name":"slowmode_next_send_date","type":"flags.18?int"},{"name":"stats_dc","type":"flags.12?int"},{"name":"pts","type":"int"}],"type":"ChatFull"},{"id":"182649427","predicate":"messageRange","params":[{"name":"min_id","type":"int"},{"name":"max_id","type":"int"}],"type":"MessageRange"},{"id":"-1725551049","predicate":"messages.channelMessages","params":[{"name":"flags","type":"#"},{"name":"inexact","type":"flags.1?true"},{"name":"pts","type":"int"},{"name":"count","type":"int"},{"name":"messages","type":"Vector<Message>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"messages.Messages"},{"id":"-1781355374","predicate":"messageActionChannelCreate","params":[{"name":"title","type":"string"}],"type":"MessageAction"},{"id":"-352032773","predicate":"updateChannelTooLong","params":[{"name":"flags","type":"#"},{"name":"channel_id","type":"int"},{"name":"pts","type":"flags.0?int"}],"type":"Update"},{"id":"-1227598250","predicate":"updateChannel","params":[{"name":"channel_id","type":"int"}],"type":"Update"},{"id":"1656358105","predicate":"updateNewChannelMessage","params":[{"name":"message","type":"Message"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"}],"type":"Update"},{"id":"856380452","predicate":"updateReadChannelInbox","params":[{"name":"flags","type":"#"},{"name":"folder_id","type":"flags.0?int"},{"name":"channel_id","type":"int"},{"name":"max_id","type":"int"},{"name":"still_unread_count","type":"int"},{"name":"pts","type":"int"}],"type":"Update"},{"id":"-1015733815","predicate":"updateDeleteChannelMessages","params":[{"name":"channel_id","type":"int"},{"name":"messages","type":"Vector<int>"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"}],"type":"Update"},{"id":"-1734268085","predicate":"updateChannelMessageViews","params":[{"name":"channel_id","type":"int"},{"name":"id","type":"int"},{"name":"views","type":"int"}],"type":"Update"},{"id":"1041346555","predicate":"updates.channelDifferenceEmpty","params":[{"name":"flags","type":"#"},{"name":"final","type":"flags.0?true"},{"name":"pts","type":"int"},{"name":"timeout","type":"flags.1?int"}],"type":"updates.ChannelDifference"},{"id":"-1531132162","predicate":"updates.channelDifferenceTooLong","params":[{"name":"flags","type":"#"},{"name":"final","type":"flags.0?true"},{"name":"timeout","type":"flags.1?int"},{"name":"dialog","type":"Dialog"},{"name":"messages","type":"Vector<Message>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"updates.ChannelDifference"},{"id":"543450958","predicate":"updates.channelDifference","params":[{"name":"flags","type":"#"},{"name":"final","type":"flags.0?true"},{"name":"pts","type":"int"},{"name":"timeout","type":"flags.1?int"},{"name":"new_messages","type":"Vector<Message>"},{"name":"other_updates","type":"Vector<Update>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"updates.ChannelDifference"},{"id":"-1798033689","predicate":"channelMessagesFilterEmpty","params":[],"type":"ChannelMessagesFilter"},{"id":"-847783593","predicate":"channelMessagesFilter","params":[{"name":"flags","type":"#"},{"name":"exclude_new_messages","type":"flags.1?true"},{"name":"ranges","type":"Vector<MessageRange>"}],"type":"ChannelMessagesFilter"},{"id":"367766557","predicate":"channelParticipant","params":[{"name":"user_id","type":"int"},{"name":"date","type":"int"}],"type":"ChannelParticipant"},{"id":"-1557620115","predicate":"channelParticipantSelf","params":[{"name":"user_id","type":"int"},{"name":"inviter_id","type":"int"},{"name":"date","type":"int"}],"type":"ChannelParticipant"},{"id":"-2138237532","predicate":"channelParticipantCreator","params":[{"name":"flags","type":"#"},{"name":"user_id","type":"int"},{"name":"rank","type":"flags.0?string"}],"type":"ChannelParticipant"},{"id":"-566281095","predicate":"channelParticipantsRecent","params":[],"type":"ChannelParticipantsFilter"},{"id":"-1268741783","predicate":"channelParticipantsAdmins","params":[],"type":"ChannelParticipantsFilter"},{"id":"-1548400251","predicate":"channelParticipantsKicked","params":[{"name":"q","type":"string"}],"type":"ChannelParticipantsFilter"},{"id":"-177282392","predicate":"channels.channelParticipants","params":[{"name":"count","type":"int"},{"name":"participants","type":"Vector<ChannelParticipant>"},{"name":"users","type":"Vector<User>"}],"type":"channels.ChannelParticipants"},{"id":"-791039645","predicate":"channels.channelParticipant","params":[{"name":"participant","type":"ChannelParticipant"},{"name":"users","type":"Vector<User>"}],"type":"channels.ChannelParticipant"},{"id":"-636267638","predicate":"chatParticipantCreator","params":[{"name":"user_id","type":"int"}],"type":"ChatParticipant"},{"id":"-489233354","predicate":"chatParticipantAdmin","params":[{"name":"user_id","type":"int"},{"name":"inviter_id","type":"int"},{"name":"date","type":"int"}],"type":"ChatParticipant"},{"id":"-1232070311","predicate":"updateChatParticipantAdmin","params":[{"name":"chat_id","type":"int"},{"name":"user_id","type":"int"},{"name":"is_admin","type":"Bool"},{"name":"version","type":"int"}],"type":"Update"},{"id":"1371385889","predicate":"messageActionChatMigrateTo","params":[{"name":"channel_id","type":"int"}],"type":"MessageAction"},{"id":"-1336546578","predicate":"messageActionChannelMigrateFrom","params":[{"name":"title","type":"string"},{"name":"chat_id","type":"int"}],"type":"MessageAction"},{"id":"-1328445861","predicate":"channelParticipantsBots","params":[],"type":"ChannelParticipantsFilter"},{"id":"2013922064","predicate":"help.termsOfService","params":[{"name":"flags","type":"#"},{"name":"popup","type":"flags.0?true"},{"name":"id","type":"DataJSON"},{"name":"text","type":"string"},{"name":"entities","type":"Vector<MessageEntity>"},{"name":"min_age_confirm","type":"flags.1?int"}],"type":"help.TermsOfService"},{"id":"1753886890","predicate":"updateNewStickerSet","params":[{"name":"stickerset","type":"messages.StickerSet"}],"type":"Update"},{"id":"196268545","predicate":"updateStickerSetsOrder","params":[{"name":"flags","type":"#"},{"name":"masks","type":"flags.0?true"},{"name":"order","type":"Vector<long>"}],"type":"Update"},{"id":"1135492588","predicate":"updateStickerSets","params":[],"type":"Update"},{"id":"372165663","predicate":"foundGif","params":[{"name":"url","type":"string"},{"name":"thumb_url","type":"string"},{"name":"content_url","type":"string"},{"name":"content_type","type":"string"},{"name":"w","type":"int"},{"name":"h","type":"int"}],"type":"FoundGif"},{"id":"-1670052855","predicate":"foundGifCached","params":[{"name":"url","type":"string"},{"name":"photo","type":"Photo"},{"name":"document","type":"Document"}],"type":"FoundGif"},{"id":"1212395773","predicate":"inputMediaGifExternal","params":[{"name":"url","type":"string"},{"name":"q","type":"string"}],"type":"InputMedia"},{"id":"1158290442","predicate":"messages.foundGifs","params":[{"name":"next_offset","type":"int"},{"name":"results","type":"Vector<FoundGif>"}],"type":"messages.FoundGifs"},{"id":"-402498398","predicate":"messages.savedGifsNotModified","params":[],"type":"messages.SavedGifs"},{"id":"772213157","predicate":"messages.savedGifs","params":[{"name":"hash","type":"int"},{"name":"gifs","type":"Vector<Document>"}],"type":"messages.SavedGifs"},{"id":"-1821035490","predicate":"updateSavedGifs","params":[],"type":"Update"},{"id":"864077702","predicate":"inputBotInlineMessageMediaAuto","params":[{"name":"flags","type":"#"},{"name":"message","type":"string"},{"name":"entities","type":"flags.1?Vector<MessageEntity>"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"}],"type":"InputBotInlineMessage"},{"id":"1036876423","predicate":"inputBotInlineMessageText","params":[{"name":"flags","type":"#"},{"name":"no_webpage","type":"flags.0?true"},{"name":"message","type":"string"},{"name":"entities","type":"flags.1?Vector<MessageEntity>"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"}],"type":"InputBotInlineMessage"},{"id":"-2000710887","predicate":"inputBotInlineResult","params":[{"name":"flags","type":"#"},{"name":"id","type":"string"},{"name":"type","type":"string"},{"name":"title","type":"flags.1?string"},{"name":"description","type":"flags.2?string"},{"name":"url","type":"flags.3?string"},{"name":"thumb","type":"flags.4?InputWebDocument"},{"name":"content","type":"flags.5?InputWebDocument"},{"name":"send_message","type":"InputBotInlineMessage"}],"type":"InputBotInlineResult"},{"id":"1984755728","predicate":"botInlineMessageMediaAuto","params":[{"name":"flags","type":"#"},{"name":"message","type":"string"},{"name":"entities","type":"flags.1?Vector<MessageEntity>"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"}],"type":"BotInlineMessage"},{"id":"-1937807902","predicate":"botInlineMessageText","params":[{"name":"flags","type":"#"},{"name":"no_webpage","type":"flags.0?true"},{"name":"message","type":"string"},{"name":"entities","type":"flags.1?Vector<MessageEntity>"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"}],"type":"BotInlineMessage"},{"id":"295067450","predicate":"botInlineResult","params":[{"name":"flags","type":"#"},{"name":"id","type":"string"},{"name":"type","type":"string"},{"name":"title","type":"flags.1?string"},{"name":"description","type":"flags.2?string"},{"name":"url","type":"flags.3?string"},{"name":"thumb","type":"flags.4?WebDocument"},{"name":"content","type":"flags.5?WebDocument"},{"name":"send_message","type":"BotInlineMessage"}],"type":"BotInlineResult"},{"id":"-1803769784","predicate":"messages.botResults","params":[{"name":"flags","type":"#"},{"name":"gallery","type":"flags.0?true"},{"name":"query_id","type":"long"},{"name":"next_offset","type":"flags.1?string"},{"name":"switch_pm","type":"flags.2?InlineBotSwitchPM"},{"name":"results","type":"Vector<BotInlineResult>"},{"name":"cache_time","type":"int"},{"name":"users","type":"Vector<User>"}],"type":"messages.BotResults"},{"id":"1417832080","predicate":"updateBotInlineQuery","params":[{"name":"flags","type":"#"},{"name":"query_id","type":"long"},{"name":"user_id","type":"int"},{"name":"query","type":"string"},{"name":"geo","type":"flags.0?GeoPoint"},{"name":"offset","type":"string"}],"type":"Update"},{"id":"239663460","predicate":"updateBotInlineSend","params":[{"name":"flags","type":"#"},{"name":"user_id","type":"int"},{"name":"query","type":"string"},{"name":"geo","type":"flags.0?GeoPoint"},{"name":"id","type":"string"},{"name":"msg_id","type":"flags.1?InputBotInlineMessageID"}],"type":"Update"},{"id":"1358283666","predicate":"inputMessagesFilterVoice","params":[],"type":"MessagesFilter"},{"id":"928101534","predicate":"inputMessagesFilterMusic","params":[],"type":"MessagesFilter"},{"id":"-1107622874","predicate":"inputPrivacyKeyChatInvite","params":[],"type":"InputPrivacyKey"},{"id":"1343122938","predicate":"privacyKeyChatInvite","params":[],"type":"PrivacyKey"},{"id":"1571494644","predicate":"exportedMessageLink","params":[{"name":"link","type":"string"},{"name":"html","type":"string"}],"type":"ExportedMessageLink"},{"id":"-332168592","predicate":"messageFwdHeader","params":[{"name":"flags","type":"#"},{"name":"from_id","type":"flags.0?int"},{"name":"from_name","type":"flags.5?string"},{"name":"date","type":"int"},{"name":"channel_id","type":"flags.1?int"},{"name":"channel_post","type":"flags.2?int"},{"name":"post_author","type":"flags.3?string"},{"name":"saved_from_peer","type":"flags.4?Peer"},{"name":"saved_from_msg_id","type":"flags.4?int"}],"type":"MessageFwdHeader"},{"id":"457133559","predicate":"updateEditChannelMessage","params":[{"name":"message","type":"Message"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"}],"type":"Update"},{"id":"-1738988427","predicate":"updateChannelPinnedMessage","params":[{"name":"channel_id","type":"int"},{"name":"id","type":"int"}],"type":"Update"},{"id":"-1799538451","predicate":"messageActionPinMessage","params":[],"type":"MessageAction"},{"id":"1923290508","predicate":"auth.codeTypeSms","params":[],"type":"auth.CodeType"},{"id":"1948046307","predicate":"auth.codeTypeCall","params":[],"type":"auth.CodeType"},{"id":"577556219","predicate":"auth.codeTypeFlashCall","params":[],"type":"auth.CodeType"},{"id":"1035688326","predicate":"auth.sentCodeTypeApp","params":[{"name":"length","type":"int"}],"type":"auth.SentCodeType"},{"id":"-1073693790","predicate":"auth.sentCodeTypeSms","params":[{"name":"length","type":"int"}],"type":"auth.SentCodeType"},{"id":"1398007207","predicate":"auth.sentCodeTypeCall","params":[{"name":"length","type":"int"}],"type":"auth.SentCodeType"},{"id":"-1425815847","predicate":"auth.sentCodeTypeFlashCall","params":[{"name":"pattern","type":"string"}],"type":"auth.SentCodeType"},{"id":"629866245","predicate":"keyboardButtonUrl","params":[{"name":"text","type":"string"},{"name":"url","type":"string"}],"type":"KeyboardButton"},{"id":"1748655686","predicate":"keyboardButtonCallback","params":[{"name":"text","type":"string"},{"name":"data","type":"bytes"}],"type":"KeyboardButton"},{"id":"-1318425559","predicate":"keyboardButtonRequestPhone","params":[{"name":"text","type":"string"}],"type":"KeyboardButton"},{"id":"-59151553","predicate":"keyboardButtonRequestGeoLocation","params":[{"name":"text","type":"string"}],"type":"KeyboardButton"},{"id":"90744648","predicate":"keyboardButtonSwitchInline","params":[{"name":"flags","type":"#"},{"name":"same_peer","type":"flags.0?true"},{"name":"text","type":"string"},{"name":"query","type":"string"}],"type":"KeyboardButton"},{"id":"1218642516","predicate":"replyInlineMarkup","params":[{"name":"rows","type":"Vector<KeyboardButtonRow>"}],"type":"ReplyMarkup"},{"id":"911761060","predicate":"messages.botCallbackAnswer","params":[{"name":"flags","type":"#"},{"name":"alert","type":"flags.1?true"},{"name":"has_url","type":"flags.3?true"},{"name":"native_ui","type":"flags.4?true"},{"name":"message","type":"flags.0?string"},{"name":"url","type":"flags.2?string"},{"name":"cache_time","type":"int"}],"type":"messages.BotCallbackAnswer"},{"id":"-415938591","predicate":"updateBotCallbackQuery","params":[{"name":"flags","type":"#"},{"name":"query_id","type":"long"},{"name":"user_id","type":"int"},{"name":"peer","type":"Peer"},{"name":"msg_id","type":"int"},{"name":"chat_instance","type":"long"},{"name":"data","type":"flags.0?bytes"},{"name":"game_short_name","type":"flags.1?string"}],"type":"Update"},{"id":"649453030","predicate":"messages.messageEditData","params":[{"name":"flags","type":"#"},{"name":"caption","type":"flags.0?true"}],"type":"messages.MessageEditData"},{"id":"-469536605","predicate":"updateEditMessage","params":[{"name":"message","type":"Message"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"}],"type":"Update"},{"id":"-1045340827","predicate":"inputBotInlineMessageMediaGeo","params":[{"name":"flags","type":"#"},{"name":"geo_point","type":"InputGeoPoint"},{"name":"period","type":"int"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"}],"type":"InputBotInlineMessage"},{"id":"1098628881","predicate":"inputBotInlineMessageMediaVenue","params":[{"name":"flags","type":"#"},{"name":"geo_point","type":"InputGeoPoint"},{"name":"title","type":"string"},{"name":"address","type":"string"},{"name":"provider","type":"string"},{"name":"venue_id","type":"string"},{"name":"venue_type","type":"string"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"}],"type":"InputBotInlineMessage"},{"id":"-1494368259","predicate":"inputBotInlineMessageMediaContact","params":[{"name":"flags","type":"#"},{"name":"phone_number","type":"string"},{"name":"first_name","type":"string"},{"name":"last_name","type":"string"},{"name":"vcard","type":"string"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"}],"type":"InputBotInlineMessage"},{"id":"-1222451611","predicate":"botInlineMessageMediaGeo","params":[{"name":"flags","type":"#"},{"name":"geo","type":"GeoPoint"},{"name":"period","type":"int"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"}],"type":"BotInlineMessage"},{"id":"-1970903652","predicate":"botInlineMessageMediaVenue","params":[{"name":"flags","type":"#"},{"name":"geo","type":"GeoPoint"},{"name":"title","type":"string"},{"name":"address","type":"string"},{"name":"provider","type":"string"},{"name":"venue_id","type":"string"},{"name":"venue_type","type":"string"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"}],"type":"BotInlineMessage"},{"id":"416402882","predicate":"botInlineMessageMediaContact","params":[{"name":"flags","type":"#"},{"name":"phone_number","type":"string"},{"name":"first_name","type":"string"},{"name":"last_name","type":"string"},{"name":"vcard","type":"string"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"}],"type":"BotInlineMessage"},{"id":"-1462213465","predicate":"inputBotInlineResultPhoto","params":[{"name":"id","type":"string"},{"name":"type","type":"string"},{"name":"photo","type":"InputPhoto"},{"name":"send_message","type":"InputBotInlineMessage"}],"type":"InputBotInlineResult"},{"id":"-459324","predicate":"inputBotInlineResultDocument","params":[{"name":"flags","type":"#"},{"name":"id","type":"string"},{"name":"type","type":"string"},{"name":"title","type":"flags.1?string"},{"name":"description","type":"flags.2?string"},{"name":"document","type":"InputDocument"},{"name":"send_message","type":"InputBotInlineMessage"}],"type":"InputBotInlineResult"},{"id":"400266251","predicate":"botInlineMediaResult","params":[{"name":"flags","type":"#"},{"name":"id","type":"string"},{"name":"type","type":"string"},{"name":"photo","type":"flags.0?Photo"},{"name":"document","type":"flags.1?Document"},{"name":"title","type":"flags.2?string"},{"name":"description","type":"flags.3?string"},{"name":"send_message","type":"BotInlineMessage"}],"type":"BotInlineResult"},{"id":"-1995686519","predicate":"inputBotInlineMessageID","params":[{"name":"dc_id","type":"int"},{"name":"id","type":"long"},{"name":"access_hash","type":"long"}],"type":"InputBotInlineMessageID"},{"id":"-103646630","predicate":"updateInlineBotCallbackQuery","params":[{"name":"flags","type":"#"},{"name":"query_id","type":"long"},{"name":"user_id","type":"int"},{"name":"msg_id","type":"InputBotInlineMessageID"},{"name":"chat_instance","type":"long"},{"name":"data","type":"flags.0?bytes"},{"name":"game_short_name","type":"flags.1?string"}],"type":"Update"},{"id":"1008755359","predicate":"inlineBotSwitchPM","params":[{"name":"text","type":"string"},{"name":"start_param","type":"string"}],"type":"InlineBotSwitchPM"},{"id":"863093588","predicate":"messages.peerDialogs","params":[{"name":"dialogs","type":"Vector<Dialog>"},{"name":"messages","type":"Vector<Message>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"},{"name":"state","type":"updates.State"}],"type":"messages.PeerDialogs"},{"id":"-305282981","predicate":"topPeer","params":[{"name":"peer","type":"Peer"},{"name":"rating","type":"double"}],"type":"TopPeer"},{"id":"-1419371685","predicate":"topPeerCategoryBotsPM","params":[],"type":"TopPeerCategory"},{"id":"344356834","predicate":"topPeerCategoryBotsInline","params":[],"type":"TopPeerCategory"},{"id":"104314861","predicate":"topPeerCategoryCorrespondents","params":[],"type":"TopPeerCategory"},{"id":"-1122524854","predicate":"topPeerCategoryGroups","params":[],"type":"TopPeerCategory"},{"id":"371037736","predicate":"topPeerCategoryChannels","params":[],"type":"TopPeerCategory"},{"id":"-75283823","predicate":"topPeerCategoryPeers","params":[{"name":"category","type":"TopPeerCategory"},{"name":"count","type":"int"},{"name":"peers","type":"Vector<TopPeer>"}],"type":"TopPeerCategoryPeers"},{"id":"-567906571","predicate":"contacts.topPeersNotModified","params":[],"type":"contacts.TopPeers"},{"id":"1891070632","predicate":"contacts.topPeers","params":[{"name":"categories","type":"Vector<TopPeerCategoryPeers>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"contacts.TopPeers"},{"id":"892193368","predicate":"messageEntityMentionName","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"},{"name":"user_id","type":"int"}],"type":"MessageEntity"},{"id":"546203849","predicate":"inputMessageEntityMentionName","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"},{"name":"user_id","type":"InputUser"}],"type":"MessageEntity"},{"id":"975236280","predicate":"inputMessagesFilterChatPhotos","params":[],"type":"MessagesFilter"},{"id":"634833351","predicate":"updateReadChannelOutbox","params":[{"name":"channel_id","type":"int"},{"name":"max_id","type":"int"}],"type":"Update"},{"id":"-299124375","predicate":"updateDraftMessage","params":[{"name":"peer","type":"Peer"},{"name":"draft","type":"DraftMessage"}],"type":"Update"},{"id":"453805082","predicate":"draftMessageEmpty","params":[{"name":"flags","type":"#"},{"name":"date","type":"flags.0?int"}],"type":"DraftMessage"},{"id":"-40996577","predicate":"draftMessage","params":[{"name":"flags","type":"#"},{"name":"no_webpage","type":"flags.1?true"},{"name":"reply_to_msg_id","type":"flags.0?int"},{"name":"message","type":"string"},{"name":"entities","type":"flags.3?Vector<MessageEntity>"},{"name":"date","type":"int"}],"type":"DraftMessage"},{"id":"-1615153660","predicate":"messageActionHistoryClear","params":[],"type":"MessageAction"},{"id":"-958657434","predicate":"messages.featuredStickersNotModified","params":[{"name":"count","type":"int"}],"type":"messages.FeaturedStickers"},{"id":"-1230257343","predicate":"messages.featuredStickers","params":[{"name":"hash","type":"int"},{"name":"count","type":"int"},{"name":"sets","type":"Vector<StickerSetCovered>"},{"name":"unread","type":"Vector<long>"}],"type":"messages.FeaturedStickers"},{"id":"1461528386","predicate":"updateReadFeaturedStickers","params":[],"type":"Update"},{"id":"186120336","predicate":"messages.recentStickersNotModified","params":[],"type":"messages.RecentStickers"},{"id":"586395571","predicate":"messages.recentStickers","params":[{"name":"hash","type":"int"},{"name":"packs","type":"Vector<StickerPack>"},{"name":"stickers","type":"Vector<Document>"},{"name":"dates","type":"Vector<int>"}],"type":"messages.RecentStickers"},{"id":"-1706939360","predicate":"updateRecentStickers","params":[],"type":"Update"},{"id":"1338747336","predicate":"messages.archivedStickers","params":[{"name":"count","type":"int"},{"name":"sets","type":"Vector<StickerSetCovered>"}],"type":"messages.ArchivedStickers"},{"id":"946083368","predicate":"messages.stickerSetInstallResultSuccess","params":[],"type":"messages.StickerSetInstallResult"},{"id":"904138920","predicate":"messages.stickerSetInstallResultArchive","params":[{"name":"sets","type":"Vector<StickerSetCovered>"}],"type":"messages.StickerSetInstallResult"},{"id":"1678812626","predicate":"stickerSetCovered","params":[{"name":"set","type":"StickerSet"},{"name":"cover","type":"Document"}],"type":"StickerSetCovered"},{"id":"-1574314746","predicate":"updateConfig","params":[],"type":"Update"},{"id":"861169551","predicate":"updatePtsChanged","params":[],"type":"Update"},{"id":"-440664550","predicate":"inputMediaPhotoExternal","params":[{"name":"flags","type":"#"},{"name":"url","type":"string"},{"name":"ttl_seconds","type":"flags.0?int"}],"type":"InputMedia"},{"id":"-78455655","predicate":"inputMediaDocumentExternal","params":[{"name":"flags","type":"#"},{"name":"url","type":"string"},{"name":"ttl_seconds","type":"flags.0?int"}],"type":"InputMedia"},{"id":"872932635","predicate":"stickerSetMultiCovered","params":[{"name":"set","type":"StickerSet"},{"name":"covers","type":"Vector<Document>"}],"type":"StickerSetCovered"},{"id":"-1361650766","predicate":"maskCoords","params":[{"name":"n","type":"int"},{"name":"x","type":"double"},{"name":"y","type":"double"},{"name":"zoom","type":"double"}],"type":"MaskCoords"},{"id":"-1744710921","predicate":"documentAttributeHasStickers","params":[],"type":"DocumentAttribute"},{"id":"1251549527","predicate":"inputStickeredMediaPhoto","params":[{"name":"id","type":"InputPhoto"}],"type":"InputStickeredMedia"},{"id":"70813275","predicate":"inputStickeredMediaDocument","params":[{"name":"id","type":"InputDocument"}],"type":"InputStickeredMedia"},{"id":"-1107729093","predicate":"game","params":[{"name":"flags","type":"#"},{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"short_name","type":"string"},{"name":"title","type":"string"},{"name":"description","type":"string"},{"name":"photo","type":"Photo"},{"name":"document","type":"flags.0?Document"}],"type":"Game"},{"id":"1336154098","predicate":"inputBotInlineResultGame","params":[{"name":"id","type":"string"},{"name":"short_name","type":"string"},{"name":"send_message","type":"InputBotInlineMessage"}],"type":"InputBotInlineResult"},{"id":"1262639204","predicate":"inputBotInlineMessageGame","params":[{"name":"flags","type":"#"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"}],"type":"InputBotInlineMessage"},{"id":"-38694904","predicate":"messageMediaGame","params":[{"name":"game","type":"Game"}],"type":"MessageMedia"},{"id":"-750828557","predicate":"inputMediaGame","params":[{"name":"id","type":"InputGame"}],"type":"InputMedia"},{"id":"53231223","predicate":"inputGameID","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"}],"type":"InputGame"},{"id":"-1020139510","predicate":"inputGameShortName","params":[{"name":"bot_id","type":"InputUser"},{"name":"short_name","type":"string"}],"type":"InputGame"},{"id":"1358175439","predicate":"keyboardButtonGame","params":[{"name":"text","type":"string"}],"type":"KeyboardButton"},{"id":"-1834538890","predicate":"messageActionGameScore","params":[{"name":"game_id","type":"long"},{"name":"score","type":"int"}],"type":"MessageAction"},{"id":"1493171408","predicate":"highScore","params":[{"name":"pos","type":"int"},{"name":"user_id","type":"int"},{"name":"score","type":"int"}],"type":"HighScore"},{"id":"-1707344487","predicate":"messages.highScores","params":[{"name":"scores","type":"Vector<HighScore>"},{"name":"users","type":"Vector<User>"}],"type":"messages.HighScores"},{"id":"1258196845","predicate":"updates.differenceTooLong","params":[{"name":"pts","type":"int"}],"type":"updates.Difference"},{"id":"1081547008","predicate":"updateChannelWebPage","params":[{"name":"channel_id","type":"int"},{"name":"webpage","type":"WebPage"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"}],"type":"Update"},{"id":"-1663561404","predicate":"messages.chatsSlice","params":[{"name":"count","type":"int"},{"name":"chats","type":"Vector<Chat>"}],"type":"messages.Chats"},{"id":"-599948721","predicate":"textEmpty","params":[],"type":"RichText"},{"id":"1950782688","predicate":"textPlain","params":[{"name":"text","type":"string"}],"type":"RichText"},{"id":"1730456516","predicate":"textBold","params":[{"name":"text","type":"RichText"}],"type":"RichText"},{"id":"-653089380","predicate":"textItalic","params":[{"name":"text","type":"RichText"}],"type":"RichText"},{"id":"-1054465340","predicate":"textUnderline","params":[{"name":"text","type":"RichText"}],"type":"RichText"},{"id":"-1678197867","predicate":"textStrike","params":[{"name":"text","type":"RichText"}],"type":"RichText"},{"id":"1816074681","predicate":"textFixed","params":[{"name":"text","type":"RichText"}],"type":"RichText"},{"id":"1009288385","predicate":"textUrl","params":[{"name":"text","type":"RichText"},{"name":"url","type":"string"},{"name":"webpage_id","type":"long"}],"type":"RichText"},{"id":"-564523562","predicate":"textEmail","params":[{"name":"text","type":"RichText"},{"name":"email","type":"string"}],"type":"RichText"},{"id":"2120376535","predicate":"textConcat","params":[{"name":"texts","type":"Vector<RichText>"}],"type":"RichText"},{"id":"324435594","predicate":"pageBlockUnsupported","params":[],"type":"PageBlock"},{"id":"1890305021","predicate":"pageBlockTitle","params":[{"name":"text","type":"RichText"}],"type":"PageBlock"},{"id":"-1879401953","predicate":"pageBlockSubtitle","params":[{"name":"text","type":"RichText"}],"type":"PageBlock"},{"id":"-1162877472","predicate":"pageBlockAuthorDate","params":[{"name":"author","type":"RichText"},{"name":"published_date","type":"int"}],"type":"PageBlock"},{"id":"-1076861716","predicate":"pageBlockHeader","params":[{"name":"text","type":"RichText"}],"type":"PageBlock"},{"id":"-248793375","predicate":"pageBlockSubheader","params":[{"name":"text","type":"RichText"}],"type":"PageBlock"},{"id":"1182402406","predicate":"pageBlockParagraph","params":[{"name":"text","type":"RichText"}],"type":"PageBlock"},{"id":"-1066346178","predicate":"pageBlockPreformatted","params":[{"name":"text","type":"RichText"},{"name":"language","type":"string"}],"type":"PageBlock"},{"id":"1216809369","predicate":"pageBlockFooter","params":[{"name":"text","type":"RichText"}],"type":"PageBlock"},{"id":"-618614392","predicate":"pageBlockDivider","params":[],"type":"PageBlock"},{"id":"-837994576","predicate":"pageBlockAnchor","params":[{"name":"name","type":"string"}],"type":"PageBlock"},{"id":"-454524911","predicate":"pageBlockList","params":[{"name":"items","type":"Vector<PageListItem>"}],"type":"PageBlock"},{"id":"641563686","predicate":"pageBlockBlockquote","params":[{"name":"text","type":"RichText"},{"name":"caption","type":"RichText"}],"type":"PageBlock"},{"id":"1329878739","predicate":"pageBlockPullquote","params":[{"name":"text","type":"RichText"},{"name":"caption","type":"RichText"}],"type":"PageBlock"},{"id":"391759200","predicate":"pageBlockPhoto","params":[{"name":"flags","type":"#"},{"name":"photo_id","type":"long"},{"name":"caption","type":"PageCaption"},{"name":"url","type":"flags.0?string"},{"name":"webpage_id","type":"flags.0?long"}],"type":"PageBlock"},{"id":"2089805750","predicate":"pageBlockVideo","params":[{"name":"flags","type":"#"},{"name":"autoplay","type":"flags.0?true"},{"name":"loop","type":"flags.1?true"},{"name":"video_id","type":"long"},{"name":"caption","type":"PageCaption"}],"type":"PageBlock"},{"id":"972174080","predicate":"pageBlockCover","params":[{"name":"cover","type":"PageBlock"}],"type":"PageBlock"},{"id":"-1468953147","predicate":"pageBlockEmbed","params":[{"name":"flags","type":"#"},{"name":"full_width","type":"flags.0?true"},{"name":"allow_scrolling","type":"flags.3?true"},{"name":"url","type":"flags.1?string"},{"name":"html","type":"flags.2?string"},{"name":"poster_photo_id","type":"flags.4?long"},{"name":"w","type":"flags.5?int"},{"name":"h","type":"flags.5?int"},{"name":"caption","type":"PageCaption"}],"type":"PageBlock"},{"id":"-229005301","predicate":"pageBlockEmbedPost","params":[{"name":"url","type":"string"},{"name":"webpage_id","type":"long"},{"name":"author_photo_id","type":"long"},{"name":"author","type":"string"},{"name":"date","type":"int"},{"name":"blocks","type":"Vector<PageBlock>"},{"name":"caption","type":"PageCaption"}],"type":"PageBlock"},{"id":"1705048653","predicate":"pageBlockCollage","params":[{"name":"items","type":"Vector<PageBlock>"},{"name":"caption","type":"PageCaption"}],"type":"PageBlock"},{"id":"52401552","predicate":"pageBlockSlideshow","params":[{"name":"items","type":"Vector<PageBlock>"},{"name":"caption","type":"PageCaption"}],"type":"PageBlock"},{"id":"1930545681","predicate":"webPageNotModified","params":[{"name":"flags","type":"#"},{"name":"cached_page_views","type":"flags.0?int"}],"type":"WebPage"},{"id":"-88417185","predicate":"inputPrivacyKeyPhoneCall","params":[],"type":"InputPrivacyKey"},{"id":"1030105979","predicate":"privacyKeyPhoneCall","params":[],"type":"PrivacyKey"},{"id":"-580219064","predicate":"sendMessageGamePlayAction","params":[],"type":"SendMessageAction"},{"id":"-2048646399","predicate":"phoneCallDiscardReasonMissed","params":[],"type":"PhoneCallDiscardReason"},{"id":"-527056480","predicate":"phoneCallDiscardReasonDisconnect","params":[],"type":"PhoneCallDiscardReason"},{"id":"1471006352","predicate":"phoneCallDiscardReasonHangup","params":[],"type":"PhoneCallDiscardReason"},{"id":"-84416311","predicate":"phoneCallDiscardReasonBusy","params":[],"type":"PhoneCallDiscardReason"},{"id":"1852826908","predicate":"updateDialogPinned","params":[{"name":"flags","type":"#"},{"name":"pinned","type":"flags.0?true"},{"name":"folder_id","type":"flags.1?int"},{"name":"peer","type":"DialogPeer"}],"type":"Update"},{"id":"-99664734","predicate":"updatePinnedDialogs","params":[{"name":"flags","type":"#"},{"name":"folder_id","type":"flags.1?int"},{"name":"order","type":"flags.0?Vector<DialogPeer>"}],"type":"Update"},{"id":"2104790276","predicate":"dataJSON","params":[{"name":"data","type":"string"}],"type":"DataJSON"},{"id":"-2095595325","predicate":"updateBotWebhookJSON","params":[{"name":"data","type":"DataJSON"}],"type":"Update"},{"id":"-1684914010","predicate":"updateBotWebhookJSONQuery","params":[{"name":"query_id","type":"long"},{"name":"data","type":"DataJSON"},{"name":"timeout","type":"int"}],"type":"Update"},{"id":"-886477832","predicate":"labeledPrice","params":[{"name":"label","type":"string"},{"name":"amount","type":"long"}],"type":"LabeledPrice"},{"id":"-1022713000","predicate":"invoice","params":[{"name":"flags","type":"#"},{"name":"test","type":"flags.0?true"},{"name":"name_requested","type":"flags.1?true"},{"name":"phone_requested","type":"flags.2?true"},{"name":"email_requested","type":"flags.3?true"},{"name":"shipping_address_requested","type":"flags.4?true"},{"name":"flexible","type":"flags.5?true"},{"name":"phone_to_provider","type":"flags.6?true"},{"name":"email_to_provider","type":"flags.7?true"},{"name":"currency","type":"string"},{"name":"prices","type":"Vector<LabeledPrice>"}],"type":"Invoice"},{"id":"-186607933","predicate":"inputMediaInvoice","params":[{"name":"flags","type":"#"},{"name":"title","type":"string"},{"name":"description","type":"string"},{"name":"photo","type":"flags.0?InputWebDocument"},{"name":"invoice","type":"Invoice"},{"name":"payload","type":"bytes"},{"name":"provider","type":"string"},{"name":"provider_data","type":"DataJSON"},{"name":"start_param","type":"string"}],"type":"InputMedia"},{"id":"-368917890","predicate":"paymentCharge","params":[{"name":"id","type":"string"},{"name":"provider_charge_id","type":"string"}],"type":"PaymentCharge"},{"id":"-1892568281","predicate":"messageActionPaymentSentMe","params":[{"name":"flags","type":"#"},{"name":"currency","type":"string"},{"name":"total_amount","type":"long"},{"name":"payload","type":"bytes"},{"name":"info","type":"flags.0?PaymentRequestedInfo"},{"name":"shipping_option_id","type":"flags.1?string"},{"name":"charge","type":"PaymentCharge"}],"type":"MessageAction"},{"id":"-2074799289","predicate":"messageMediaInvoice","params":[{"name":"flags","type":"#"},{"name":"shipping_address_requested","type":"flags.1?true"},{"name":"test","type":"flags.3?true"},{"name":"title","type":"string"},{"name":"description","type":"string"},{"name":"photo","type":"flags.0?WebDocument"},{"name":"receipt_msg_id","type":"flags.2?int"},{"name":"currency","type":"string"},{"name":"total_amount","type":"long"},{"name":"start_param","type":"string"}],"type":"MessageMedia"},{"id":"512535275","predicate":"postAddress","params":[{"name":"street_line1","type":"string"},{"name":"street_line2","type":"string"},{"name":"city","type":"string"},{"name":"state","type":"string"},{"name":"country_iso2","type":"string"},{"name":"post_code","type":"string"}],"type":"PostAddress"},{"id":"-1868808300","predicate":"paymentRequestedInfo","params":[{"name":"flags","type":"#"},{"name":"name","type":"flags.0?string"},{"name":"phone","type":"flags.1?string"},{"name":"email","type":"flags.2?string"},{"name":"shipping_address","type":"flags.3?PostAddress"}],"type":"PaymentRequestedInfo"},{"id":"-1344716869","predicate":"keyboardButtonBuy","params":[{"name":"text","type":"string"}],"type":"KeyboardButton"},{"id":"1080663248","predicate":"messageActionPaymentSent","params":[{"name":"currency","type":"string"},{"name":"total_amount","type":"long"}],"type":"MessageAction"},{"id":"-842892769","predicate":"paymentSavedCredentialsCard","params":[{"name":"id","type":"string"},{"name":"title","type":"string"}],"type":"PaymentSavedCredentials"},{"id":"475467473","predicate":"webDocument","params":[{"name":"url","type":"string"},{"name":"access_hash","type":"long"},{"name":"size","type":"int"},{"name":"mime_type","type":"string"},{"name":"attributes","type":"Vector<DocumentAttribute>"}],"type":"WebDocument"},{"id":"-1678949555","predicate":"inputWebDocument","params":[{"name":"url","type":"string"},{"name":"size","type":"int"},{"name":"mime_type","type":"string"},{"name":"attributes","type":"Vector<DocumentAttribute>"}],"type":"InputWebDocument"},{"id":"-1036396922","predicate":"inputWebFileLocation","params":[{"name":"url","type":"string"},{"name":"access_hash","type":"long"}],"type":"InputWebFileLocation"},{"id":"568808380","predicate":"upload.webFile","params":[{"name":"size","type":"int"},{"name":"mime_type","type":"string"},{"name":"file_type","type":"storage.FileType"},{"name":"mtime","type":"int"},{"name":"bytes","type":"bytes"}],"type":"upload.WebFile"},{"id":"1062645411","predicate":"payments.paymentForm","params":[{"name":"flags","type":"#"},{"name":"can_save_credentials","type":"flags.2?true"},{"name":"password_missing","type":"flags.3?true"},{"name":"bot_id","type":"int"},{"name":"invoice","type":"Invoice"},{"name":"provider_id","type":"int"},{"name":"url","type":"string"},{"name":"native_provider","type":"flags.4?string"},{"name":"native_params","type":"flags.4?DataJSON"},{"name":"saved_info","type":"flags.0?PaymentRequestedInfo"},{"name":"saved_credentials","type":"flags.1?PaymentSavedCredentials"},{"name":"users","type":"Vector<User>"}],"type":"payments.PaymentForm"},{"id":"-784000893","predicate":"payments.validatedRequestedInfo","params":[{"name":"flags","type":"#"},{"name":"id","type":"flags.0?string"},{"name":"shipping_options","type":"flags.1?Vector<ShippingOption>"}],"type":"payments.ValidatedRequestedInfo"},{"id":"1314881805","predicate":"payments.paymentResult","params":[{"name":"updates","type":"Updates"}],"type":"payments.PaymentResult"},{"id":"1342771681","predicate":"payments.paymentReceipt","params":[{"name":"flags","type":"#"},{"name":"date","type":"int"},{"name":"bot_id","type":"int"},{"name":"invoice","type":"Invoice"},{"name":"provider_id","type":"int"},{"name":"info","type":"flags.0?PaymentRequestedInfo"},{"name":"shipping","type":"flags.1?ShippingOption"},{"name":"currency","type":"string"},{"name":"total_amount","type":"long"},{"name":"credentials_title","type":"string"},{"name":"users","type":"Vector<User>"}],"type":"payments.PaymentReceipt"},{"id":"-74456004","predicate":"payments.savedInfo","params":[{"name":"flags","type":"#"},{"name":"has_saved_credentials","type":"flags.1?true"},{"name":"saved_info","type":"flags.0?PaymentRequestedInfo"}],"type":"payments.SavedInfo"},{"id":"-1056001329","predicate":"inputPaymentCredentialsSaved","params":[{"name":"id","type":"string"},{"name":"tmp_password","type":"bytes"}],"type":"InputPaymentCredentials"},{"id":"873977640","predicate":"inputPaymentCredentials","params":[{"name":"flags","type":"#"},{"name":"save","type":"flags.0?true"},{"name":"data","type":"DataJSON"}],"type":"InputPaymentCredentials"},{"id":"-614138572","predicate":"account.tmpPassword","params":[{"name":"tmp_password","type":"bytes"},{"name":"valid_until","type":"int"}],"type":"account.TmpPassword"},{"id":"-1239335713","predicate":"shippingOption","params":[{"name":"id","type":"string"},{"name":"title","type":"string"},{"name":"prices","type":"Vector<LabeledPrice>"}],"type":"ShippingOption"},{"id":"-523384512","predicate":"updateBotShippingQuery","params":[{"name":"query_id","type":"long"},{"name":"user_id","type":"int"},{"name":"payload","type":"bytes"},{"name":"shipping_address","type":"PostAddress"}],"type":"Update"},{"id":"1563376297","predicate":"updateBotPrecheckoutQuery","params":[{"name":"flags","type":"#"},{"name":"query_id","type":"long"},{"name":"user_id","type":"int"},{"name":"payload","type":"bytes"},{"name":"info","type":"flags.0?PaymentRequestedInfo"},{"name":"shipping_option_id","type":"flags.1?string"},{"name":"currency","type":"string"},{"name":"total_amount","type":"long"}],"type":"Update"},{"id":"-6249322","predicate":"inputStickerSetItem","params":[{"name":"flags","type":"#"},{"name":"document","type":"InputDocument"},{"name":"emoji","type":"string"},{"name":"mask_coords","type":"flags.0?MaskCoords"}],"type":"InputStickerSetItem"},{"id":"-1425052898","predicate":"updatePhoneCall","params":[{"name":"phone_call","type":"PhoneCall"}],"type":"Update"},{"id":"506920429","predicate":"inputPhoneCall","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"}],"type":"InputPhoneCall"},{"id":"1399245077","predicate":"phoneCallEmpty","params":[{"name":"id","type":"long"}],"type":"PhoneCall"},{"id":"462375633","predicate":"phoneCallWaiting","params":[{"name":"flags","type":"#"},{"name":"video","type":"flags.5?true"},{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"date","type":"int"},{"name":"admin_id","type":"int"},{"name":"participant_id","type":"int"},{"name":"protocol","type":"PhoneCallProtocol"},{"name":"receive_date","type":"flags.0?int"}],"type":"PhoneCall"},{"id":"-2014659757","predicate":"phoneCallRequested","params":[{"name":"flags","type":"#"},{"name":"video","type":"flags.5?true"},{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"date","type":"int"},{"name":"admin_id","type":"int"},{"name":"participant_id","type":"int"},{"name":"g_a_hash","type":"bytes"},{"name":"protocol","type":"PhoneCallProtocol"}],"type":"PhoneCall"},{"id":"-1719909046","predicate":"phoneCallAccepted","params":[{"name":"flags","type":"#"},{"name":"video","type":"flags.5?true"},{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"date","type":"int"},{"name":"admin_id","type":"int"},{"name":"participant_id","type":"int"},{"name":"g_b","type":"bytes"},{"name":"protocol","type":"PhoneCallProtocol"}],"type":"PhoneCall"},{"id":"-2025673089","predicate":"phoneCall","params":[{"name":"flags","type":"#"},{"name":"p2p_allowed","type":"flags.5?true"},{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"date","type":"int"},{"name":"admin_id","type":"int"},{"name":"participant_id","type":"int"},{"name":"g_a_or_b","type":"bytes"},{"name":"key_fingerprint","type":"long"},{"name":"protocol","type":"PhoneCallProtocol"},{"name":"connections","type":"Vector<PhoneConnection>"},{"name":"start_date","type":"int"}],"type":"PhoneCall"},{"id":"1355435489","predicate":"phoneCallDiscarded","params":[{"name":"flags","type":"#"},{"name":"need_rating","type":"flags.2?true"},{"name":"need_debug","type":"flags.3?true"},{"name":"video","type":"flags.5?true"},{"name":"id","type":"long"},{"name":"reason","type":"flags.0?PhoneCallDiscardReason"},{"name":"duration","type":"flags.1?int"}],"type":"PhoneCall"},{"id":"-1655957568","predicate":"phoneConnection","params":[{"name":"id","type":"long"},{"name":"ip","type":"string"},{"name":"ipv6","type":"string"},{"name":"port","type":"int"},{"name":"peer_tag","type":"bytes"}],"type":"PhoneConnection"},{"id":"-58224696","predicate":"phoneCallProtocol","params":[{"name":"flags","type":"#"},{"name":"udp_p2p","type":"flags.0?true"},{"name":"udp_reflector","type":"flags.1?true"},{"name":"min_layer","type":"int"},{"name":"max_layer","type":"int"},{"name":"library_versions","type":"Vector<string>"}],"type":"PhoneCallProtocol"},{"id":"-326966976","predicate":"phone.phoneCall","params":[{"name":"phone_call","type":"PhoneCall"},{"name":"users","type":"Vector<User>"}],"type":"phone.PhoneCall"},{"id":"-2134272152","predicate":"inputMessagesFilterPhoneCalls","params":[{"name":"flags","type":"#"},{"name":"missed","type":"flags.0?true"}],"type":"MessagesFilter"},{"id":"-2132731265","predicate":"messageActionPhoneCall","params":[{"name":"flags","type":"#"},{"name":"video","type":"flags.2?true"},{"name":"call_id","type":"long"},{"name":"reason","type":"flags.0?PhoneCallDiscardReason"},{"name":"duration","type":"flags.1?int"}],"type":"MessageAction"},{"id":"2054952868","predicate":"inputMessagesFilterRoundVoice","params":[],"type":"MessagesFilter"},{"id":"-1253451181","predicate":"inputMessagesFilterRoundVideo","params":[],"type":"MessagesFilter"},{"id":"-1997373508","predicate":"sendMessageRecordRoundAction","params":[],"type":"SendMessageAction"},{"id":"608050278","predicate":"sendMessageUploadRoundAction","params":[{"name":"progress","type":"int"}],"type":"SendMessageAction"},{"id":"-242427324","predicate":"upload.fileCdnRedirect","params":[{"name":"dc_id","type":"int"},{"name":"file_token","type":"bytes"},{"name":"encryption_key","type":"bytes"},{"name":"encryption_iv","type":"bytes"},{"name":"file_hashes","type":"Vector<FileHash>"}],"type":"upload.File"},{"id":"-290921362","predicate":"upload.cdnFileReuploadNeeded","params":[{"name":"request_token","type":"bytes"}],"type":"upload.CdnFile"},{"id":"-1449145777","predicate":"upload.cdnFile","params":[{"name":"bytes","type":"bytes"}],"type":"upload.CdnFile"},{"id":"-914167110","predicate":"cdnPublicKey","params":[{"name":"dc_id","type":"int"},{"name":"public_key","type":"string"}],"type":"CdnPublicKey"},{"id":"1462101002","predicate":"cdnConfig","params":[{"name":"public_keys","type":"Vector<CdnPublicKey>"}],"type":"CdnConfig"},{"id":"-283684427","predicate":"pageBlockChannel","params":[{"name":"channel","type":"Chat"}],"type":"PageBlock"},{"id":"-892239370","predicate":"langPackString","params":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"type":"LangPackString"},{"id":"1816636575","predicate":"langPackStringPluralized","params":[{"name":"flags","type":"#"},{"name":"key","type":"string"},{"name":"zero_value","type":"flags.0?string"},{"name":"one_value","type":"flags.1?string"},{"name":"two_value","type":"flags.2?string"},{"name":"few_value","type":"flags.3?string"},{"name":"many_value","type":"flags.4?string"},{"name":"other_value","type":"string"}],"type":"LangPackString"},{"id":"695856818","predicate":"langPackStringDeleted","params":[{"name":"key","type":"string"}],"type":"LangPackString"},{"id":"-209337866","predicate":"langPackDifference","params":[{"name":"lang_code","type":"string"},{"name":"from_version","type":"int"},{"name":"version","type":"int"},{"name":"strings","type":"Vector<LangPackString>"}],"type":"LangPackDifference"},{"id":"-288727837","predicate":"langPackLanguage","params":[{"name":"flags","type":"#"},{"name":"official","type":"flags.0?true"},{"name":"rtl","type":"flags.2?true"},{"name":"beta","type":"flags.3?true"},{"name":"name","type":"string"},{"name":"native_name","type":"string"},{"name":"lang_code","type":"string"},{"name":"base_lang_code","type":"flags.1?string"},{"name":"plural_code","type":"string"},{"name":"strings_count","type":"int"},{"name":"translated_count","type":"int"},{"name":"translations_url","type":"string"}],"type":"LangPackLanguage"},{"id":"1180041828","predicate":"updateLangPackTooLong","params":[{"name":"lang_code","type":"string"}],"type":"Update"},{"id":"1442983757","predicate":"updateLangPack","params":[{"name":"difference","type":"LangPackDifference"}],"type":"Update"},{"id":"-859915345","predicate":"channelParticipantAdmin","params":[{"name":"flags","type":"#"},{"name":"can_edit","type":"flags.0?true"},{"name":"self","type":"flags.1?true"},{"name":"user_id","type":"int"},{"name":"inviter_id","type":"flags.1?int"},{"name":"promoted_by","type":"int"},{"name":"date","type":"int"},{"name":"admin_rights","type":"ChatAdminRights"},{"name":"rank","type":"flags.2?string"}],"type":"ChannelParticipant"},{"id":"470789295","predicate":"channelParticipantBanned","params":[{"name":"flags","type":"#"},{"name":"left","type":"flags.0?true"},{"name":"user_id","type":"int"},{"name":"kicked_by","type":"int"},{"name":"date","type":"int"},{"name":"banned_rights","type":"ChatBannedRights"}],"type":"ChannelParticipant"},{"id":"338142689","predicate":"channelParticipantsBanned","params":[{"name":"q","type":"string"}],"type":"ChannelParticipantsFilter"},{"id":"106343499","predicate":"channelParticipantsSearch","params":[{"name":"q","type":"string"}],"type":"ChannelParticipantsFilter"},{"id":"-421545947","predicate":"channelAdminLogEventActionChangeTitle","params":[{"name":"prev_value","type":"string"},{"name":"new_value","type":"string"}],"type":"ChannelAdminLogEventAction"},{"id":"1427671598","predicate":"channelAdminLogEventActionChangeAbout","params":[{"name":"prev_value","type":"string"},{"name":"new_value","type":"string"}],"type":"ChannelAdminLogEventAction"},{"id":"1783299128","predicate":"channelAdminLogEventActionChangeUsername","params":[{"name":"prev_value","type":"string"},{"name":"new_value","type":"string"}],"type":"ChannelAdminLogEventAction"},{"id":"1129042607","predicate":"channelAdminLogEventActionChangePhoto","params":[{"name":"prev_photo","type":"Photo"},{"name":"new_photo","type":"Photo"}],"type":"ChannelAdminLogEventAction"},{"id":"460916654","predicate":"channelAdminLogEventActionToggleInvites","params":[{"name":"new_value","type":"Bool"}],"type":"ChannelAdminLogEventAction"},{"id":"648939889","predicate":"channelAdminLogEventActionToggleSignatures","params":[{"name":"new_value","type":"Bool"}],"type":"ChannelAdminLogEventAction"},{"id":"-370660328","predicate":"channelAdminLogEventActionUpdatePinned","params":[{"name":"message","type":"Message"}],"type":"ChannelAdminLogEventAction"},{"id":"1889215493","predicate":"channelAdminLogEventActionEditMessage","params":[{"name":"prev_message","type":"Message"},{"name":"new_message","type":"Message"}],"type":"ChannelAdminLogEventAction"},{"id":"1121994683","predicate":"channelAdminLogEventActionDeleteMessage","params":[{"name":"message","type":"Message"}],"type":"ChannelAdminLogEventAction"},{"id":"405815507","predicate":"channelAdminLogEventActionParticipantJoin","params":[],"type":"ChannelAdminLogEventAction"},{"id":"-124291086","predicate":"channelAdminLogEventActionParticipantLeave","params":[],"type":"ChannelAdminLogEventAction"},{"id":"-484690728","predicate":"channelAdminLogEventActionParticipantInvite","params":[{"name":"participant","type":"ChannelParticipant"}],"type":"ChannelAdminLogEventAction"},{"id":"-422036098","predicate":"channelAdminLogEventActionParticipantToggleBan","params":[{"name":"prev_participant","type":"ChannelParticipant"},{"name":"new_participant","type":"ChannelParticipant"}],"type":"ChannelAdminLogEventAction"},{"id":"-714643696","predicate":"channelAdminLogEventActionParticipantToggleAdmin","params":[{"name":"prev_participant","type":"ChannelParticipant"},{"name":"new_participant","type":"ChannelParticipant"}],"type":"ChannelAdminLogEventAction"},{"id":"995769920","predicate":"channelAdminLogEvent","params":[{"name":"id","type":"long"},{"name":"date","type":"int"},{"name":"user_id","type":"int"},{"name":"action","type":"ChannelAdminLogEventAction"}],"type":"ChannelAdminLogEvent"},{"id":"-309659827","predicate":"channels.adminLogResults","params":[{"name":"events","type":"Vector<ChannelAdminLogEvent>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"channels.AdminLogResults"},{"id":"-368018716","predicate":"channelAdminLogEventsFilter","params":[{"name":"flags","type":"#"},{"name":"join","type":"flags.0?true"},{"name":"leave","type":"flags.1?true"},{"name":"invite","type":"flags.2?true"},{"name":"ban","type":"flags.3?true"},{"name":"unban","type":"flags.4?true"},{"name":"kick","type":"flags.5?true"},{"name":"unkick","type":"flags.6?true"},{"name":"promote","type":"flags.7?true"},{"name":"demote","type":"flags.8?true"},{"name":"info","type":"flags.9?true"},{"name":"settings","type":"flags.10?true"},{"name":"pinned","type":"flags.11?true"},{"name":"edit","type":"flags.12?true"},{"name":"delete","type":"flags.13?true"}],"type":"ChannelAdminLogEventsFilter"},{"id":"511092620","predicate":"topPeerCategoryPhoneCalls","params":[],"type":"TopPeerCategory"},{"id":"-2143067670","predicate":"pageBlockAudio","params":[{"name":"audio_id","type":"long"},{"name":"caption","type":"PageCaption"}],"type":"PageBlock"},{"id":"1558266229","predicate":"popularContact","params":[{"name":"client_id","type":"long"},{"name":"importers","type":"int"}],"type":"PopularContact"},{"id":"1200788123","predicate":"messageActionScreenshotTaken","params":[],"type":"MessageAction"},{"id":"-1634752813","predicate":"messages.favedStickersNotModified","params":[],"type":"messages.FavedStickers"},{"id":"-209768682","predicate":"messages.favedStickers","params":[{"name":"hash","type":"int"},{"name":"packs","type":"Vector<StickerPack>"},{"name":"stickers","type":"Vector<Document>"}],"type":"messages.FavedStickers"},{"id":"-451831443","predicate":"updateFavedStickers","params":[],"type":"Update"},{"id":"-1987495099","predicate":"updateChannelReadMessagesContents","params":[{"name":"channel_id","type":"int"},{"name":"messages","type":"Vector<int>"}],"type":"Update"},{"id":"-1040652646","predicate":"inputMessagesFilterMyMentions","params":[],"type":"MessagesFilter"},{"id":"1887741886","predicate":"updateContactsReset","params":[],"type":"Update"},{"id":"-1312568665","predicate":"channelAdminLogEventActionChangeStickerSet","params":[{"name":"prev_stickerset","type":"InputStickerSet"},{"name":"new_stickerset","type":"InputStickerSet"}],"type":"ChannelAdminLogEventAction"},{"id":"-85549226","predicate":"messageActionCustomAction","params":[{"name":"message","type":"string"}],"type":"MessageAction"},{"id":"178373535","predicate":"inputPaymentCredentialsApplePay","params":[{"name":"payment_data","type":"DataJSON"}],"type":"InputPaymentCredentials"},{"id":"-905587442","predicate":"inputPaymentCredentialsAndroidPay","params":[{"name":"payment_token","type":"DataJSON"},{"name":"google_transaction_id","type":"string"}],"type":"InputPaymentCredentials"},{"id":"-419271411","predicate":"inputMessagesFilterGeo","params":[],"type":"MessagesFilter"},{"id":"-530392189","predicate":"inputMessagesFilterContacts","params":[],"type":"MessagesFilter"},{"id":"1893427255","predicate":"updateChannelAvailableMessages","params":[{"name":"channel_id","type":"int"},{"name":"available_min_id","type":"int"}],"type":"Update"},{"id":"1599903217","predicate":"channelAdminLogEventActionTogglePreHistoryHidden","params":[{"name":"new_value","type":"Bool"}],"type":"ChannelAdminLogEventAction"},{"id":"-833715459","predicate":"inputMediaGeoLive","params":[{"name":"flags","type":"#"},{"name":"stopped","type":"flags.0?true"},{"name":"geo_point","type":"InputGeoPoint"},{"name":"period","type":"flags.1?int"}],"type":"InputMedia"},{"id":"2084316681","predicate":"messageMediaGeoLive","params":[{"name":"geo","type":"GeoPoint"},{"name":"period","type":"int"}],"type":"MessageMedia"},{"id":"1189204285","predicate":"recentMeUrlUnknown","params":[{"name":"url","type":"string"}],"type":"RecentMeUrl"},{"id":"-1917045962","predicate":"recentMeUrlUser","params":[{"name":"url","type":"string"},{"name":"user_id","type":"int"}],"type":"RecentMeUrl"},{"id":"-1608834311","predicate":"recentMeUrlChat","params":[{"name":"url","type":"string"},{"name":"chat_id","type":"int"}],"type":"RecentMeUrl"},{"id":"-347535331","predicate":"recentMeUrlChatInvite","params":[{"name":"url","type":"string"},{"name":"chat_invite","type":"ChatInvite"}],"type":"RecentMeUrl"},{"id":"-1140172836","predicate":"recentMeUrlStickerSet","params":[{"name":"url","type":"string"},{"name":"set","type":"StickerSetCovered"}],"type":"RecentMeUrl"},{"id":"235081943","predicate":"help.recentMeUrls","params":[{"name":"urls","type":"Vector<RecentMeUrl>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"help.RecentMeUrls"},{"id":"-266911767","predicate":"channels.channelParticipantsNotModified","params":[],"type":"channels.ChannelParticipants"},{"id":"1951620897","predicate":"messages.messagesNotModified","params":[{"name":"count","type":"int"}],"type":"messages.Messages"},{"id":"482797855","predicate":"inputSingleMedia","params":[{"name":"flags","type":"#"},{"name":"media","type":"InputMedia"},{"name":"random_id","type":"long"},{"name":"message","type":"string"},{"name":"entities","type":"flags.0?Vector<MessageEntity>"}],"type":"InputSingleMedia"},{"id":"-892779534","predicate":"webAuthorization","params":[{"name":"hash","type":"long"},{"name":"bot_id","type":"int"},{"name":"domain","type":"string"},{"name":"browser","type":"string"},{"name":"platform","type":"string"},{"name":"date_created","type":"int"},{"name":"date_active","type":"int"},{"name":"ip","type":"string"},{"name":"region","type":"string"}],"type":"WebAuthorization"},{"id":"-313079300","predicate":"account.webAuthorizations","params":[{"name":"authorizations","type":"Vector<WebAuthorization>"},{"name":"users","type":"Vector<User>"}],"type":"account.WebAuthorizations"},{"id":"-1502174430","predicate":"inputMessageID","params":[{"name":"id","type":"int"}],"type":"InputMessage"},{"id":"-1160215659","predicate":"inputMessageReplyTo","params":[{"name":"id","type":"int"}],"type":"InputMessage"},{"id":"-2037963464","predicate":"inputMessagePinned","params":[],"type":"InputMessage"},{"id":"-1687559349","predicate":"messageEntityPhone","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"1280209983","predicate":"messageEntityCashtag","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"-1410748418","predicate":"messageActionBotAllowed","params":[{"name":"domain","type":"string"}],"type":"MessageAction"},{"id":"-55902537","predicate":"inputDialogPeer","params":[{"name":"peer","type":"InputPeer"}],"type":"InputDialogPeer"},{"id":"-445792507","predicate":"dialogPeer","params":[{"name":"peer","type":"Peer"}],"type":"DialogPeer"},{"id":"223655517","predicate":"messages.foundStickerSetsNotModified","params":[],"type":"messages.FoundStickerSets"},{"id":"1359533640","predicate":"messages.foundStickerSets","params":[{"name":"hash","type":"int"},{"name":"sets","type":"Vector<StickerSetCovered>"}],"type":"messages.FoundStickerSets"},{"id":"1648543603","predicate":"fileHash","params":[{"name":"offset","type":"int"},{"name":"limit","type":"int"},{"name":"hash","type":"bytes"}],"type":"FileHash"},{"id":"-104284986","predicate":"webDocumentNoProxy","params":[{"name":"url","type":"string"},{"name":"size","type":"int"},{"name":"mime_type","type":"string"},{"name":"attributes","type":"Vector<DocumentAttribute>"}],"type":"WebDocument"},{"id":"1968737087","predicate":"inputClientProxy","params":[{"name":"address","type":"string"},{"name":"port","type":"int"}],"type":"InputClientProxy"},{"id":"-526508104","predicate":"help.proxyDataEmpty","params":[{"name":"expires","type":"int"}],"type":"help.ProxyData"},{"id":"737668643","predicate":"help.proxyDataPromo","params":[{"name":"expires","type":"int"},{"name":"peer","type":"Peer"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"help.ProxyData"},{"id":"-483352705","predicate":"help.termsOfServiceUpdateEmpty","params":[{"name":"expires","type":"int"}],"type":"help.TermsOfServiceUpdate"},{"id":"686618977","predicate":"help.termsOfServiceUpdate","params":[{"name":"expires","type":"int"},{"name":"terms_of_service","type":"help.TermsOfService"}],"type":"help.TermsOfServiceUpdate"},{"id":"859091184","predicate":"inputSecureFileUploaded","params":[{"name":"id","type":"long"},{"name":"parts","type":"int"},{"name":"md5_checksum","type":"string"},{"name":"file_hash","type":"bytes"},{"name":"secret","type":"bytes"}],"type":"InputSecureFile"},{"id":"1399317950","predicate":"inputSecureFile","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"}],"type":"InputSecureFile"},{"id":"-876089816","predicate":"inputSecureFileLocation","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"}],"type":"InputFileLocation"},{"id":"1679398724","predicate":"secureFileEmpty","params":[],"type":"SecureFile"},{"id":"-534283678","predicate":"secureFile","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"size","type":"int"},{"name":"dc_id","type":"int"},{"name":"date","type":"int"},{"name":"file_hash","type":"bytes"},{"name":"secret","type":"bytes"}],"type":"SecureFile"},{"id":"-1964327229","predicate":"secureData","params":[{"name":"data","type":"bytes"},{"name":"data_hash","type":"bytes"},{"name":"secret","type":"bytes"}],"type":"SecureData"},{"id":"2103482845","predicate":"securePlainPhone","params":[{"name":"phone","type":"string"}],"type":"SecurePlainData"},{"id":"569137759","predicate":"securePlainEmail","params":[{"name":"email","type":"string"}],"type":"SecurePlainData"},{"id":"-1658158621","predicate":"secureValueTypePersonalDetails","params":[],"type":"SecureValueType"},{"id":"1034709504","predicate":"secureValueTypePassport","params":[],"type":"SecureValueType"},{"id":"115615172","predicate":"secureValueTypeDriverLicense","params":[],"type":"SecureValueType"},{"id":"-1596951477","predicate":"secureValueTypeIdentityCard","params":[],"type":"SecureValueType"},{"id":"-1717268701","predicate":"secureValueTypeInternalPassport","params":[],"type":"SecureValueType"},{"id":"-874308058","predicate":"secureValueTypeAddress","params":[],"type":"SecureValueType"},{"id":"-63531698","predicate":"secureValueTypeUtilityBill","params":[],"type":"SecureValueType"},{"id":"-1995211763","predicate":"secureValueTypeBankStatement","params":[],"type":"SecureValueType"},{"id":"-1954007928","predicate":"secureValueTypeRentalAgreement","params":[],"type":"SecureValueType"},{"id":"-1713143702","predicate":"secureValueTypePassportRegistration","params":[],"type":"SecureValueType"},{"id":"-368907213","predicate":"secureValueTypeTemporaryRegistration","params":[],"type":"SecureValueType"},{"id":"-1289704741","predicate":"secureValueTypePhone","params":[],"type":"SecureValueType"},{"id":"-1908627474","predicate":"secureValueTypeEmail","params":[],"type":"SecureValueType"},{"id":"411017418","predicate":"secureValue","params":[{"name":"flags","type":"#"},{"name":"type","type":"SecureValueType"},{"name":"data","type":"flags.0?SecureData"},{"name":"front_side","type":"flags.1?SecureFile"},{"name":"reverse_side","type":"flags.2?SecureFile"},{"name":"selfie","type":"flags.3?SecureFile"},{"name":"translation","type":"flags.6?Vector<SecureFile>"},{"name":"files","type":"flags.4?Vector<SecureFile>"},{"name":"plain_data","type":"flags.5?SecurePlainData"},{"name":"hash","type":"bytes"}],"type":"SecureValue"},{"id":"-618540889","predicate":"inputSecureValue","params":[{"name":"flags","type":"#"},{"name":"type","type":"SecureValueType"},{"name":"data","type":"flags.0?SecureData"},{"name":"front_side","type":"flags.1?InputSecureFile"},{"name":"reverse_side","type":"flags.2?InputSecureFile"},{"name":"selfie","type":"flags.3?InputSecureFile"},{"name":"translation","type":"flags.6?Vector<InputSecureFile>"},{"name":"files","type":"flags.4?Vector<InputSecureFile>"},{"name":"plain_data","type":"flags.5?SecurePlainData"}],"type":"InputSecureValue"},{"id":"-316748368","predicate":"secureValueHash","params":[{"name":"type","type":"SecureValueType"},{"name":"hash","type":"bytes"}],"type":"SecureValueHash"},{"id":"-391902247","predicate":"secureValueErrorData","params":[{"name":"type","type":"SecureValueType"},{"name":"data_hash","type":"bytes"},{"name":"field","type":"string"},{"name":"text","type":"string"}],"type":"SecureValueError"},{"id":"12467706","predicate":"secureValueErrorFrontSide","params":[{"name":"type","type":"SecureValueType"},{"name":"file_hash","type":"bytes"},{"name":"text","type":"string"}],"type":"SecureValueError"},{"id":"-2037765467","predicate":"secureValueErrorReverseSide","params":[{"name":"type","type":"SecureValueType"},{"name":"file_hash","type":"bytes"},{"name":"text","type":"string"}],"type":"SecureValueError"},{"id":"-449327402","predicate":"secureValueErrorSelfie","params":[{"name":"type","type":"SecureValueType"},{"name":"file_hash","type":"bytes"},{"name":"text","type":"string"}],"type":"SecureValueError"},{"id":"2054162547","predicate":"secureValueErrorFile","params":[{"name":"type","type":"SecureValueType"},{"name":"file_hash","type":"bytes"},{"name":"text","type":"string"}],"type":"SecureValueError"},{"id":"1717706985","predicate":"secureValueErrorFiles","params":[{"name":"type","type":"SecureValueType"},{"name":"file_hash","type":"Vector<bytes>"},{"name":"text","type":"string"}],"type":"SecureValueError"},{"id":"871426631","predicate":"secureCredentialsEncrypted","params":[{"name":"data","type":"bytes"},{"name":"hash","type":"bytes"},{"name":"secret","type":"bytes"}],"type":"SecureCredentialsEncrypted"},{"id":"-1389486888","predicate":"account.authorizationForm","params":[{"name":"flags","type":"#"},{"name":"required_types","type":"Vector<SecureRequiredType>"},{"name":"values","type":"Vector<SecureValue>"},{"name":"errors","type":"Vector<SecureValueError>"},{"name":"users","type":"Vector<User>"},{"name":"privacy_policy_url","type":"flags.0?string"}],"type":"account.AuthorizationForm"},{"id":"-2128640689","predicate":"account.sentEmailCode","params":[{"name":"email_pattern","type":"string"},{"name":"length","type":"int"}],"type":"account.SentEmailCode"},{"id":"455635795","predicate":"messageActionSecureValuesSentMe","params":[{"name":"values","type":"Vector<SecureValue>"},{"name":"credentials","type":"SecureCredentialsEncrypted"}],"type":"MessageAction"},{"id":"-648257196","predicate":"messageActionSecureValuesSent","params":[{"name":"types","type":"Vector<SecureValueType>"}],"type":"MessageAction"},{"id":"1722786150","predicate":"help.deepLinkInfoEmpty","params":[],"type":"help.DeepLinkInfo"},{"id":"1783556146","predicate":"help.deepLinkInfo","params":[{"name":"flags","type":"#"},{"name":"update_app","type":"flags.0?true"},{"name":"message","type":"string"},{"name":"entities","type":"flags.1?Vector<MessageEntity>"}],"type":"help.DeepLinkInfo"},{"id":"289586518","predicate":"savedPhoneContact","params":[{"name":"phone","type":"string"},{"name":"first_name","type":"string"},{"name":"last_name","type":"string"},{"name":"date","type":"int"}],"type":"SavedContact"},{"id":"1304052993","predicate":"account.takeout","params":[{"name":"id","type":"long"}],"type":"account.Takeout"},{"id":"700340377","predicate":"inputTakeoutFileLocation","params":[],"type":"InputFileLocation"},{"id":"-513517117","predicate":"updateDialogUnreadMark","params":[{"name":"flags","type":"#"},{"name":"unread","type":"flags.0?true"},{"name":"peer","type":"DialogPeer"}],"type":"Update"},{"id":"-253500010","predicate":"messages.dialogsNotModified","params":[{"name":"count","type":"int"}],"type":"messages.Dialogs"},{"id":"-1625153079","predicate":"inputWebFileGeoPointLocation","params":[{"name":"geo_point","type":"InputGeoPoint"},{"name":"access_hash","type":"long"},{"name":"w","type":"int"},{"name":"h","type":"int"},{"name":"zoom","type":"int"},{"name":"scale","type":"int"}],"type":"InputWebFileLocation"},{"id":"-1255369827","predicate":"contacts.topPeersDisabled","params":[],"type":"contacts.TopPeers"},{"id":"-1685456582","predicate":"inputReportReasonCopyright","params":[],"type":"ReportReason"},{"id":"-732254058","predicate":"passwordKdfAlgoUnknown","params":[],"type":"PasswordKdfAlgo"},{"id":"4883767","predicate":"securePasswordKdfAlgoUnknown","params":[],"type":"SecurePasswordKdfAlgo"},{"id":"-1141711456","predicate":"securePasswordKdfAlgoPBKDF2HMACSHA512iter100000","params":[{"name":"salt","type":"bytes"}],"type":"SecurePasswordKdfAlgo"},{"id":"-2042159726","predicate":"securePasswordKdfAlgoSHA512","params":[{"name":"salt","type":"bytes"}],"type":"SecurePasswordKdfAlgo"},{"id":"354925740","predicate":"secureSecretSettings","params":[{"name":"secure_algo","type":"SecurePasswordKdfAlgo"},{"name":"secure_secret","type":"bytes"},{"name":"secure_secret_id","type":"long"}],"type":"SecureSecretSettings"},{"id":"982592842","predicate":"passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow","params":[{"name":"salt1","type":"bytes"},{"name":"salt2","type":"bytes"},{"name":"g","type":"int"},{"name":"p","type":"bytes"}],"type":"PasswordKdfAlgo"},{"id":"-1736378792","predicate":"inputCheckPasswordEmpty","params":[],"type":"InputCheckPasswordSRP"},{"id":"-763367294","predicate":"inputCheckPasswordSRP","params":[{"name":"srp_id","type":"long"},{"name":"A","type":"bytes"},{"name":"M1","type":"bytes"}],"type":"InputCheckPasswordSRP"},{"id":"-2036501105","predicate":"secureValueError","params":[{"name":"type","type":"SecureValueType"},{"name":"hash","type":"bytes"},{"name":"text","type":"string"}],"type":"SecureValueError"},{"id":"-1592506512","predicate":"secureValueErrorTranslationFile","params":[{"name":"type","type":"SecureValueType"},{"name":"file_hash","type":"bytes"},{"name":"text","type":"string"}],"type":"SecureValueError"},{"id":"878931416","predicate":"secureValueErrorTranslationFiles","params":[{"name":"type","type":"SecureValueType"},{"name":"file_hash","type":"Vector<bytes>"},{"name":"text","type":"string"}],"type":"SecureValueError"},{"id":"-2103600678","predicate":"secureRequiredType","params":[{"name":"flags","type":"#"},{"name":"native_names","type":"flags.0?true"},{"name":"selfie_required","type":"flags.1?true"},{"name":"translation_required","type":"flags.2?true"},{"name":"type","type":"SecureValueType"}],"type":"SecureRequiredType"},{"id":"41187252","predicate":"secureRequiredTypeOneOf","params":[{"name":"types","type":"Vector<SecureRequiredType>"}],"type":"SecureRequiredType"},{"id":"-1078332329","predicate":"help.passportConfigNotModified","params":[],"type":"help.PassportConfig"},{"id":"-1600596305","predicate":"help.passportConfig","params":[{"name":"hash","type":"int"},{"name":"countries_langs","type":"DataJSON"}],"type":"help.PassportConfig"},{"id":"488313413","predicate":"inputAppEvent","params":[{"name":"time","type":"double"},{"name":"type","type":"string"},{"name":"peer","type":"long"},{"name":"data","type":"JSONValue"}],"type":"InputAppEvent"},{"id":"-1059185703","predicate":"jsonObjectValue","params":[{"name":"key","type":"string"},{"name":"value","type":"JSONValue"}],"type":"JSONObjectValue"},{"id":"1064139624","predicate":"jsonNull","params":[],"type":"JSONValue"},{"id":"-952869270","predicate":"jsonBool","params":[{"name":"value","type":"Bool"}],"type":"JSONValue"},{"id":"736157604","predicate":"jsonNumber","params":[{"name":"value","type":"double"}],"type":"JSONValue"},{"id":"-1222740358","predicate":"jsonString","params":[{"name":"value","type":"string"}],"type":"JSONValue"},{"id":"-146520221","predicate":"jsonArray","params":[{"name":"value","type":"Vector<JSONValue>"}],"type":"JSONValue"},{"id":"-1715350371","predicate":"jsonObject","params":[{"name":"value","type":"Vector<JSONObjectValue>"}],"type":"JSONValue"},{"id":"1279515160","predicate":"updateUserPinnedMessage","params":[{"name":"user_id","type":"int"},{"name":"id","type":"int"}],"type":"Update"},{"id":"-519195831","predicate":"updateChatPinnedMessage","params":[{"name":"chat_id","type":"int"},{"name":"id","type":"int"},{"name":"version","type":"int"}],"type":"Update"},{"id":"-1311015810","predicate":"inputNotifyBroadcasts","params":[],"type":"InputNotifyPeer"},{"id":"-703403793","predicate":"notifyBroadcasts","params":[],"type":"NotifyPeer"},{"id":"-311786236","predicate":"textSubscript","params":[{"name":"text","type":"RichText"}],"type":"RichText"},{"id":"-939827711","predicate":"textSuperscript","params":[{"name":"text","type":"RichText"}],"type":"RichText"},{"id":"55281185","predicate":"textMarked","params":[{"name":"text","type":"RichText"}],"type":"RichText"},{"id":"483104362","predicate":"textPhone","params":[{"name":"text","type":"RichText"},{"name":"phone","type":"string"}],"type":"RichText"},{"id":"136105807","predicate":"textImage","params":[{"name":"document_id","type":"long"},{"name":"w","type":"int"},{"name":"h","type":"int"}],"type":"RichText"},{"id":"504660880","predicate":"pageBlockKicker","params":[{"name":"text","type":"RichText"}],"type":"PageBlock"},{"id":"878078826","predicate":"pageTableCell","params":[{"name":"flags","type":"#"},{"name":"header","type":"flags.0?true"},{"name":"align_center","type":"flags.3?true"},{"name":"align_right","type":"flags.4?true"},{"name":"valign_middle","type":"flags.5?true"},{"name":"valign_bottom","type":"flags.6?true"},{"name":"text","type":"flags.7?RichText"},{"name":"colspan","type":"flags.1?int"},{"name":"rowspan","type":"flags.2?int"}],"type":"PageTableCell"},{"id":"-524237339","predicate":"pageTableRow","params":[{"name":"cells","type":"Vector<PageTableCell>"}],"type":"PageTableRow"},{"id":"-1085412734","predicate":"pageBlockTable","params":[{"name":"flags","type":"#"},{"name":"bordered","type":"flags.0?true"},{"name":"striped","type":"flags.1?true"},{"name":"title","type":"RichText"},{"name":"rows","type":"Vector<PageTableRow>"}],"type":"PageBlock"},{"id":"1869903447","predicate":"pageCaption","params":[{"name":"text","type":"RichText"},{"name":"credit","type":"RichText"}],"type":"PageCaption"},{"id":"-1188055347","predicate":"pageListItemText","params":[{"name":"text","type":"RichText"}],"type":"PageListItem"},{"id":"635466748","predicate":"pageListItemBlocks","params":[{"name":"blocks","type":"Vector<PageBlock>"}],"type":"PageListItem"},{"id":"1577484359","predicate":"pageListOrderedItemText","params":[{"name":"num","type":"string"},{"name":"text","type":"RichText"}],"type":"PageListOrderedItem"},{"id":"-1730311882","predicate":"pageListOrderedItemBlocks","params":[{"name":"num","type":"string"},{"name":"blocks","type":"Vector<PageBlock>"}],"type":"PageListOrderedItem"},{"id":"-1702174239","predicate":"pageBlockOrderedList","params":[{"name":"items","type":"Vector<PageListOrderedItem>"}],"type":"PageBlock"},{"id":"1987480557","predicate":"pageBlockDetails","params":[{"name":"flags","type":"#"},{"name":"open","type":"flags.0?true"},{"name":"blocks","type":"Vector<PageBlock>"},{"name":"title","type":"RichText"}],"type":"PageBlock"},{"id":"-1282352120","predicate":"pageRelatedArticle","params":[{"name":"flags","type":"#"},{"name":"url","type":"string"},{"name":"webpage_id","type":"long"},{"name":"title","type":"flags.0?string"},{"name":"description","type":"flags.1?string"},{"name":"photo_id","type":"flags.2?long"},{"name":"author","type":"flags.3?string"},{"name":"published_date","type":"flags.4?int"}],"type":"PageRelatedArticle"},{"id":"370236054","predicate":"pageBlockRelatedArticles","params":[{"name":"title","type":"RichText"},{"name":"articles","type":"Vector<PageRelatedArticle>"}],"type":"PageBlock"},{"id":"-1538310410","predicate":"pageBlockMap","params":[{"name":"geo","type":"GeoPoint"},{"name":"zoom","type":"int"},{"name":"w","type":"int"},{"name":"h","type":"int"},{"name":"caption","type":"PageCaption"}],"type":"PageBlock"},{"id":"-1738178803","predicate":"page","params":[{"name":"flags","type":"#"},{"name":"part","type":"flags.0?true"},{"name":"rtl","type":"flags.1?true"},{"name":"v2","type":"flags.2?true"},{"name":"url","type":"string"},{"name":"blocks","type":"Vector<PageBlock>"},{"name":"photos","type":"Vector<Photo>"},{"name":"documents","type":"Vector<Document>"},{"name":"views","type":"flags.3?int"}],"type":"Page"},{"id":"-610373422","predicate":"inputPrivacyKeyPhoneP2P","params":[],"type":"InputPrivacyKey"},{"id":"961092808","predicate":"privacyKeyPhoneP2P","params":[],"type":"PrivacyKey"},{"id":"894777186","predicate":"textAnchor","params":[{"name":"text","type":"RichText"},{"name":"name","type":"string"}],"type":"RichText"},{"id":"-1945767479","predicate":"help.supportName","params":[{"name":"name","type":"string"}],"type":"help.SupportName"},{"id":"-206688531","predicate":"help.userInfoEmpty","params":[],"type":"help.UserInfo"},{"id":"32192344","predicate":"help.userInfo","params":[{"name":"message","type":"string"},{"name":"entities","type":"Vector<MessageEntity>"},{"name":"author","type":"string"},{"name":"date","type":"int"}],"type":"help.UserInfo"},{"id":"-202219658","predicate":"messageActionContactSignUp","params":[],"type":"MessageAction"},{"id":"-1398708869","predicate":"updateMessagePoll","params":[{"name":"flags","type":"#"},{"name":"poll_id","type":"long"},{"name":"poll","type":"flags.0?Poll"},{"name":"results","type":"PollResults"}],"type":"Update"},{"id":"1823064809","predicate":"pollAnswer","params":[{"name":"text","type":"string"},{"name":"option","type":"bytes"}],"type":"PollAnswer"},{"id":"-2032041631","predicate":"poll","params":[{"name":"id","type":"long"},{"name":"flags","type":"#"},{"name":"closed","type":"flags.0?true"},{"name":"public_voters","type":"flags.1?true"},{"name":"multiple_choice","type":"flags.2?true"},{"name":"quiz","type":"flags.3?true"},{"name":"question","type":"string"},{"name":"answers","type":"Vector<PollAnswer>"},{"name":"close_period","type":"flags.4?int"},{"name":"close_date","type":"flags.5?int"}],"type":"Poll"},{"id":"997055186","predicate":"pollAnswerVoters","params":[{"name":"flags","type":"#"},{"name":"chosen","type":"flags.0?true"},{"name":"correct","type":"flags.1?true"},{"name":"option","type":"bytes"},{"name":"voters","type":"int"}],"type":"PollAnswerVoters"},{"id":"-1159937629","predicate":"pollResults","params":[{"name":"flags","type":"#"},{"name":"min","type":"flags.0?true"},{"name":"results","type":"flags.1?Vector<PollAnswerVoters>"},{"name":"total_voters","type":"flags.2?int"},{"name":"recent_voters","type":"flags.3?Vector<int>"},{"name":"solution","type":"flags.4?string"},{"name":"solution_entities","type":"flags.4?Vector<MessageEntity>"}],"type":"PollResults"},{"id":"261416433","predicate":"inputMediaPoll","params":[{"name":"flags","type":"#"},{"name":"poll","type":"Poll"},{"name":"correct_answers","type":"flags.0?Vector<bytes>"},{"name":"solution","type":"flags.1?string"},{"name":"solution_entities","type":"flags.1?Vector<MessageEntity>"}],"type":"InputMedia"},{"id":"1272375192","predicate":"messageMediaPoll","params":[{"name":"poll","type":"Poll"},{"name":"results","type":"PollResults"}],"type":"MessageMedia"},{"id":"-264117680","predicate":"chatOnlines","params":[{"name":"onlines","type":"int"}],"type":"ChatOnlines"},{"id":"1202287072","predicate":"statsURL","params":[{"name":"url","type":"string"}],"type":"StatsURL"},{"id":"-525288402","predicate":"photoStrippedSize","params":[{"name":"type","type":"string"},{"name":"bytes","type":"bytes"}],"type":"PhotoSize"},{"id":"1605510357","predicate":"chatAdminRights","params":[{"name":"flags","type":"#"},{"name":"change_info","type":"flags.0?true"},{"name":"post_messages","type":"flags.1?true"},{"name":"edit_messages","type":"flags.2?true"},{"name":"delete_messages","type":"flags.3?true"},{"name":"ban_users","type":"flags.4?true"},{"name":"invite_users","type":"flags.5?true"},{"name":"pin_messages","type":"flags.7?true"},{"name":"add_admins","type":"flags.9?true"}],"type":"ChatAdminRights"},{"id":"-1626209256","predicate":"chatBannedRights","params":[{"name":"flags","type":"#"},{"name":"view_messages","type":"flags.0?true"},{"name":"send_messages","type":"flags.1?true"},{"name":"send_media","type":"flags.2?true"},{"name":"send_stickers","type":"flags.3?true"},{"name":"send_gifs","type":"flags.4?true"},{"name":"send_games","type":"flags.5?true"},{"name":"send_inline","type":"flags.6?true"},{"name":"embed_links","type":"flags.7?true"},{"name":"send_polls","type":"flags.8?true"},{"name":"change_info","type":"flags.10?true"},{"name":"invite_users","type":"flags.15?true"},{"name":"pin_messages","type":"flags.17?true"},{"name":"until_date","type":"int"}],"type":"ChatBannedRights"},{"id":"1421875280","predicate":"updateChatDefaultBannedRights","params":[{"name":"peer","type":"Peer"},{"name":"default_banned_rights","type":"ChatBannedRights"},{"name":"version","type":"int"}],"type":"Update"},{"id":"-433014407","predicate":"inputWallPaper","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"}],"type":"InputWallPaper"},{"id":"1913199744","predicate":"inputWallPaperSlug","params":[{"name":"slug","type":"string"}],"type":"InputWallPaper"},{"id":"-1150621555","predicate":"channelParticipantsContacts","params":[{"name":"q","type":"string"}],"type":"ChannelParticipantsFilter"},{"id":"771095562","predicate":"channelAdminLogEventActionDefaultBannedRights","params":[{"name":"prev_banned_rights","type":"ChatBannedRights"},{"name":"new_banned_rights","type":"ChatBannedRights"}],"type":"ChannelAdminLogEventAction"},{"id":"-1895328189","predicate":"channelAdminLogEventActionStopPoll","params":[{"name":"message","type":"Message"}],"type":"ChannelAdminLogEventAction"},{"id":"471437699","predicate":"account.wallPapersNotModified","params":[],"type":"account.WallPapers"},{"id":"1881892265","predicate":"account.wallPapers","params":[{"name":"hash","type":"int"},{"name":"wallpapers","type":"Vector<WallPaper>"}],"type":"account.WallPapers"},{"id":"-557924733","predicate":"codeSettings","params":[{"name":"flags","type":"#"},{"name":"allow_flashcall","type":"flags.0?true"},{"name":"current_number","type":"flags.1?true"},{"name":"allow_app_hash","type":"flags.4?true"}],"type":"CodeSettings"},{"id":"84438264","predicate":"wallPaperSettings","params":[{"name":"flags","type":"#"},{"name":"blur","type":"flags.1?true"},{"name":"motion","type":"flags.2?true"},{"name":"background_color","type":"flags.0?int"},{"name":"second_background_color","type":"flags.4?int"},{"name":"intensity","type":"flags.3?int"},{"name":"rotation","type":"flags.4?int"}],"type":"WallPaperSettings"},{"id":"-532532493","predicate":"autoDownloadSettings","params":[{"name":"flags","type":"#"},{"name":"disabled","type":"flags.0?true"},{"name":"video_preload_large","type":"flags.1?true"},{"name":"audio_preload_next","type":"flags.2?true"},{"name":"phonecalls_less_data","type":"flags.3?true"},{"name":"photo_size_max","type":"int"},{"name":"video_size_max","type":"int"},{"name":"file_size_max","type":"int"},{"name":"video_upload_maxbitrate","type":"int"}],"type":"AutoDownloadSettings"},{"id":"1674235686","predicate":"account.autoDownloadSettings","params":[{"name":"low","type":"AutoDownloadSettings"},{"name":"medium","type":"AutoDownloadSettings"},{"name":"high","type":"AutoDownloadSettings"}],"type":"account.AutoDownloadSettings"},{"id":"-709641735","predicate":"emojiKeyword","params":[{"name":"keyword","type":"string"},{"name":"emoticons","type":"Vector<string>"}],"type":"EmojiKeyword"},{"id":"594408994","predicate":"emojiKeywordDeleted","params":[{"name":"keyword","type":"string"},{"name":"emoticons","type":"Vector<string>"}],"type":"EmojiKeyword"},{"id":"1556570557","predicate":"emojiKeywordsDifference","params":[{"name":"lang_code","type":"string"},{"name":"from_version","type":"int"},{"name":"version","type":"int"},{"name":"keywords","type":"Vector<EmojiKeyword>"}],"type":"EmojiKeywordsDifference"},{"id":"-1519029347","predicate":"emojiURL","params":[{"name":"url","type":"string"}],"type":"EmojiURL"},{"id":"-1275374751","predicate":"emojiLanguage","params":[{"name":"lang_code","type":"string"}],"type":"EmojiLanguage"},{"id":"-1529000952","predicate":"inputPrivacyKeyForwards","params":[],"type":"InputPrivacyKey"},{"id":"1777096355","predicate":"privacyKeyForwards","params":[],"type":"PrivacyKey"},{"id":"1461304012","predicate":"inputPrivacyKeyProfilePhoto","params":[],"type":"InputPrivacyKey"},{"id":"-1777000467","predicate":"privacyKeyProfilePhoto","params":[],"type":"PrivacyKey"},{"id":"-1132476723","predicate":"fileLocationToBeDeprecated","params":[{"name":"volume_id","type":"long"},{"name":"local_id","type":"int"}],"type":"FileLocation"},{"id":"1075322878","predicate":"inputPhotoFileLocation","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"file_reference","type":"bytes"},{"name":"thumb_size","type":"string"}],"type":"InputFileLocation"},{"id":"-667654413","predicate":"inputPhotoLegacyFileLocation","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"file_reference","type":"bytes"},{"name":"volume_id","type":"long"},{"name":"local_id","type":"int"},{"name":"secret","type":"long"}],"type":"InputFileLocation"},{"id":"668375447","predicate":"inputPeerPhotoFileLocation","params":[{"name":"flags","type":"#"},{"name":"big","type":"flags.0?true"},{"name":"peer","type":"InputPeer"},{"name":"volume_id","type":"long"},{"name":"local_id","type":"int"}],"type":"InputFileLocation"},{"id":"230353641","predicate":"inputStickerSetThumb","params":[{"name":"stickerset","type":"InputStickerSet"},{"name":"volume_id","type":"long"},{"name":"local_id","type":"int"}],"type":"InputFileLocation"},{"id":"-11252123","predicate":"folder","params":[{"name":"flags","type":"#"},{"name":"autofill_new_broadcasts","type":"flags.0?true"},{"name":"autofill_public_groups","type":"flags.1?true"},{"name":"autofill_new_correspondents","type":"flags.2?true"},{"name":"id","type":"int"},{"name":"title","type":"string"},{"name":"photo","type":"flags.3?ChatPhoto"}],"type":"Folder"},{"id":"1908216652","predicate":"dialogFolder","params":[{"name":"flags","type":"#"},{"name":"pinned","type":"flags.2?true"},{"name":"folder","type":"Folder"},{"name":"peer","type":"Peer"},{"name":"top_message","type":"int"},{"name":"unread_muted_peers_count","type":"int"},{"name":"unread_unmuted_peers_count","type":"int"},{"name":"unread_muted_messages_count","type":"int"},{"name":"unread_unmuted_messages_count","type":"int"}],"type":"Dialog"},{"id":"1684014375","predicate":"inputDialogPeerFolder","params":[{"name":"folder_id","type":"int"}],"type":"InputDialogPeer"},{"id":"1363483106","predicate":"dialogPeerFolder","params":[{"name":"folder_id","type":"int"}],"type":"DialogPeer"},{"id":"-70073706","predicate":"inputFolderPeer","params":[{"name":"peer","type":"InputPeer"},{"name":"folder_id","type":"int"}],"type":"InputFolderPeer"},{"id":"-373643672","predicate":"folderPeer","params":[{"name":"peer","type":"Peer"},{"name":"folder_id","type":"int"}],"type":"FolderPeer"},{"id":"422972864","predicate":"updateFolderPeers","params":[{"name":"folder_peers","type":"Vector<FolderPeer>"},{"name":"pts","type":"int"},{"name":"pts_count","type":"int"}],"type":"Update"},{"id":"756118935","predicate":"inputUserFromMessage","params":[{"name":"peer","type":"InputPeer"},{"name":"msg_id","type":"int"},{"name":"user_id","type":"int"}],"type":"InputUser"},{"id":"707290417","predicate":"inputChannelFromMessage","params":[{"name":"peer","type":"InputPeer"},{"name":"msg_id","type":"int"},{"name":"channel_id","type":"int"}],"type":"InputChannel"},{"id":"398123750","predicate":"inputPeerUserFromMessage","params":[{"name":"peer","type":"InputPeer"},{"name":"msg_id","type":"int"},{"name":"user_id","type":"int"}],"type":"InputPeer"},{"id":"-1667893317","predicate":"inputPeerChannelFromMessage","params":[{"name":"peer","type":"InputPeer"},{"name":"msg_id","type":"int"},{"name":"channel_id","type":"int"}],"type":"InputPeer"},{"id":"55761658","predicate":"inputPrivacyKeyPhoneNumber","params":[],"type":"InputPrivacyKey"},{"id":"-778378131","predicate":"privacyKeyPhoneNumber","params":[],"type":"PrivacyKey"},{"id":"-1472172887","predicate":"topPeerCategoryForwardUsers","params":[],"type":"TopPeerCategory"},{"id":"-68239120","predicate":"topPeerCategoryForwardChats","params":[],"type":"TopPeerCategory"},{"id":"-1569748965","predicate":"channelAdminLogEventActionChangeLinkedChat","params":[{"name":"prev_value","type":"int"},{"name":"new_value","type":"int"}],"type":"ChannelAdminLogEventAction"},{"id":"-398136321","predicate":"messages.searchCounter","params":[{"name":"flags","type":"#"},{"name":"inexact","type":"flags.1?true"},{"name":"filter","type":"MessagesFilter"},{"name":"count","type":"int"}],"type":"messages.SearchCounter"},{"id":"280464681","predicate":"keyboardButtonUrlAuth","params":[{"name":"flags","type":"#"},{"name":"text","type":"string"},{"name":"fwd_text","type":"flags.0?string"},{"name":"url","type":"string"},{"name":"button_id","type":"int"}],"type":"KeyboardButton"},{"id":"-802258988","predicate":"inputKeyboardButtonUrlAuth","params":[{"name":"flags","type":"#"},{"name":"request_write_access","type":"flags.0?true"},{"name":"text","type":"string"},{"name":"fwd_text","type":"flags.1?string"},{"name":"url","type":"string"},{"name":"bot","type":"InputUser"}],"type":"KeyboardButton"},{"id":"-1831650802","predicate":"urlAuthResultRequest","params":[{"name":"flags","type":"#"},{"name":"request_write_access","type":"flags.0?true"},{"name":"bot","type":"User"},{"name":"domain","type":"string"}],"type":"UrlAuthResult"},{"id":"-1886646706","predicate":"urlAuthResultAccepted","params":[{"name":"url","type":"string"}],"type":"UrlAuthResult"},{"id":"-1445536993","predicate":"urlAuthResultDefault","params":[],"type":"UrlAuthResult"},{"id":"1283572154","predicate":"inputPrivacyValueAllowChatParticipants","params":[{"name":"chats","type":"Vector<int>"}],"type":"InputPrivacyRule"},{"id":"-668769361","predicate":"inputPrivacyValueDisallowChatParticipants","params":[{"name":"chats","type":"Vector<int>"}],"type":"InputPrivacyRule"},{"id":"415136107","predicate":"privacyValueAllowChatParticipants","params":[{"name":"chats","type":"Vector<int>"}],"type":"PrivacyRule"},{"id":"-1397881200","predicate":"privacyValueDisallowChatParticipants","params":[{"name":"chats","type":"Vector<int>"}],"type":"PrivacyRule"},{"id":"-1672577397","predicate":"messageEntityUnderline","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"-1090087980","predicate":"messageEntityStrike","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"34469328","predicate":"messageEntityBlockquote","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"1786671974","predicate":"updatePeerSettings","params":[{"name":"peer","type":"Peer"},{"name":"settings","type":"PeerSettings"}],"type":"Update"},{"id":"-1078612597","predicate":"channelLocationEmpty","params":[],"type":"ChannelLocation"},{"id":"547062491","predicate":"channelLocation","params":[{"name":"geo_point","type":"GeoPoint"},{"name":"address","type":"string"}],"type":"ChannelLocation"},{"id":"-901375139","predicate":"peerLocated","params":[{"name":"peer","type":"Peer"},{"name":"expires","type":"int"},{"name":"distance","type":"int"}],"type":"PeerLocated"},{"id":"-1263546448","predicate":"updatePeerLocated","params":[{"name":"peers","type":"Vector<PeerLocated>"}],"type":"Update"},{"id":"241923758","predicate":"channelAdminLogEventActionChangeLocation","params":[{"name":"prev_value","type":"ChannelLocation"},{"name":"new_value","type":"ChannelLocation"}],"type":"ChannelAdminLogEventAction"},{"id":"-606798099","predicate":"inputReportReasonGeoIrrelevant","params":[],"type":"ReportReason"},{"id":"1401984889","predicate":"channelAdminLogEventActionToggleSlowMode","params":[{"name":"prev_value","type":"int"},{"name":"new_value","type":"int"}],"type":"ChannelAdminLogEventAction"},{"id":"1148485274","predicate":"auth.authorizationSignUpRequired","params":[{"name":"flags","type":"#"},{"name":"terms_of_service","type":"flags.0?help.TermsOfService"}],"type":"auth.Authorization"},{"id":"-666824391","predicate":"payments.paymentVerificationNeeded","params":[{"name":"url","type":"string"}],"type":"payments.PaymentResult"},{"id":"42402760","predicate":"inputStickerSetAnimatedEmoji","params":[],"type":"InputStickerSet"},{"id":"967122427","predicate":"updateNewScheduledMessage","params":[{"name":"message","type":"Message"}],"type":"Update"},{"id":"-1870238482","predicate":"updateDeleteScheduledMessages","params":[{"name":"peer","type":"Peer"},{"name":"messages","type":"Vector<int>"}],"type":"Update"},{"id":"-797791052","predicate":"restrictionReason","params":[{"name":"platform","type":"string"},{"name":"reason","type":"string"},{"name":"text","type":"string"}],"type":"RestrictionReason"},{"id":"1012306921","predicate":"inputTheme","params":[{"name":"id","type":"long"},{"name":"access_hash","type":"long"}],"type":"InputTheme"},{"id":"-175567375","predicate":"inputThemeSlug","params":[{"name":"slug","type":"string"}],"type":"InputTheme"},{"id":"42930452","predicate":"theme","params":[{"name":"flags","type":"#"},{"name":"creator","type":"flags.0?true"},{"name":"default","type":"flags.1?true"},{"name":"id","type":"long"},{"name":"access_hash","type":"long"},{"name":"slug","type":"string"},{"name":"title","type":"string"},{"name":"document","type":"flags.2?Document"},{"name":"settings","type":"flags.3?ThemeSettings"},{"name":"installs_count","type":"int"}],"type":"Theme"},{"id":"-199313886","predicate":"account.themesNotModified","params":[],"type":"account.Themes"},{"id":"2137482273","predicate":"account.themes","params":[{"name":"hash","type":"int"},{"name":"themes","type":"Vector<Theme>"}],"type":"account.Themes"},{"id":"-2112423005","predicate":"updateTheme","params":[{"name":"theme","type":"Theme"}],"type":"Update"},{"id":"-786326563","predicate":"inputPrivacyKeyAddedByPhone","params":[],"type":"InputPrivacyKey"},{"id":"1124062251","predicate":"privacyKeyAddedByPhone","params":[],"type":"PrivacyKey"},{"id":"-2027964103","predicate":"updateGeoLiveViewed","params":[{"name":"peer","type":"Peer"},{"name":"msg_id","type":"int"}],"type":"Update"},{"id":"1448076945","predicate":"updateLoginToken","params":[],"type":"Update"},{"id":"1654593920","predicate":"auth.loginToken","params":[{"name":"expires","type":"int"},{"name":"token","type":"bytes"}],"type":"auth.LoginToken"},{"id":"110008598","predicate":"auth.loginTokenMigrateTo","params":[{"name":"dc_id","type":"int"},{"name":"token","type":"bytes"}],"type":"auth.LoginToken"},{"id":"957176926","predicate":"auth.loginTokenSuccess","params":[{"name":"authorization","type":"auth.Authorization"}],"type":"auth.LoginToken"},{"id":"1474462241","predicate":"account.contentSettings","params":[{"name":"flags","type":"#"},{"name":"sensitive_enabled","type":"flags.0?true"},{"name":"sensitive_can_change","type":"flags.1?true"}],"type":"account.ContentSettings"},{"id":"-1456996667","predicate":"messages.inactiveChats","params":[{"name":"dates","type":"Vector<int>"},{"name":"chats","type":"Vector<Chat>"},{"name":"users","type":"Vector<User>"}],"type":"messages.InactiveChats"},{"id":"-1012849566","predicate":"baseThemeClassic","params":[],"type":"BaseTheme"},{"id":"-69724536","predicate":"baseThemeDay","params":[],"type":"BaseTheme"},{"id":"-1212997976","predicate":"baseThemeNight","params":[],"type":"BaseTheme"},{"id":"1834973166","predicate":"baseThemeTinted","params":[],"type":"BaseTheme"},{"id":"1527845466","predicate":"baseThemeArctic","params":[],"type":"BaseTheme"},{"id":"-2077770836","predicate":"inputWallPaperNoFile","params":[],"type":"InputWallPaper"},{"id":"-1963717851","predicate":"wallPaperNoFile","params":[{"name":"flags","type":"#"},{"name":"default","type":"flags.1?true"},{"name":"dark","type":"flags.4?true"},{"name":"settings","type":"flags.2?WallPaperSettings"}],"type":"WallPaper"},{"id":"-1118798639","predicate":"inputThemeSettings","params":[{"name":"flags","type":"#"},{"name":"base_theme","type":"BaseTheme"},{"name":"accent_color","type":"int"},{"name":"message_top_color","type":"flags.0?int"},{"name":"message_bottom_color","type":"flags.0?int"},{"name":"wallpaper","type":"flags.1?InputWallPaper"},{"name":"wallpaper_settings","type":"flags.1?WallPaperSettings"}],"type":"InputThemeSettings"},{"id":"-1676371894","predicate":"themeSettings","params":[{"name":"flags","type":"#"},{"name":"base_theme","type":"BaseTheme"},{"name":"accent_color","type":"int"},{"name":"message_top_color","type":"flags.0?int"},{"name":"message_bottom_color","type":"flags.0?int"},{"name":"wallpaper","type":"flags.1?WallPaper"}],"type":"ThemeSettings"},{"id":"1421174295","predicate":"webPageAttributeTheme","params":[{"name":"flags","type":"#"},{"name":"documents","type":"flags.0?Vector<Document>"},{"name":"settings","type":"flags.1?ThemeSettings"}],"type":"WebPageAttribute"},{"id":"1123585836","predicate":"updateMessagePollVote","params":[{"name":"poll_id","type":"long"},{"name":"user_id","type":"int"},{"name":"options","type":"Vector<bytes>"}],"type":"Update"},{"id":"-1567730343","predicate":"messageUserVote","params":[{"name":"user_id","type":"int"},{"name":"option","type":"bytes"},{"name":"date","type":"int"}],"type":"MessageUserVote"},{"id":"909603888","predicate":"messageUserVoteInputOption","params":[{"name":"user_id","type":"int"},{"name":"date","type":"int"}],"type":"MessageUserVote"},{"id":"244310238","predicate":"messageUserVoteMultiple","params":[{"name":"user_id","type":"int"},{"name":"options","type":"Vector<bytes>"},{"name":"date","type":"int"}],"type":"MessageUserVote"},{"id":"136574537","predicate":"messages.votesList","params":[{"name":"flags","type":"#"},{"name":"count","type":"int"},{"name":"votes","type":"Vector<MessageUserVote>"},{"name":"users","type":"Vector<User>"},{"name":"next_offset","type":"flags.0?string"}],"type":"messages.VotesList"},{"id":"-1144565411","predicate":"keyboardButtonRequestPoll","params":[{"name":"flags","type":"#"},{"name":"quiz","type":"flags.0?Bool"},{"name":"text","type":"string"}],"type":"KeyboardButton"},{"id":"1981704948","predicate":"messageEntityBankCard","params":[{"name":"offset","type":"int"},{"name":"length","type":"int"}],"type":"MessageEntity"},{"id":"-177732982","predicate":"bankCardOpenUrl","params":[{"name":"url","type":"string"},{"name":"name","type":"string"}],"type":"BankCardOpenUrl"},{"id":"1042605427","predicate":"payments.bankCardData","params":[{"name":"title","type":"string"},{"name":"open_urls","type":"Vector<BankCardOpenUrl>"}],"type":"payments.BankCardData"},{"id":"-118740917","predicate":"peerSelfLocated","params":[{"name":"expires","type":"int"}],"type":"PeerLocated"},{"id":"1949890536","predicate":"dialogFilter","params":[{"name":"flags","type":"#"},{"name":"contacts","type":"flags.0?true"},{"name":"non_contacts","type":"flags.1?true"},{"name":"groups","type":"flags.2?true"},{"name":"broadcasts","type":"flags.3?true"},{"name":"bots","type":"flags.4?true"},{"name":"exclude_muted","type":"flags.11?true"},{"name":"exclude_read","type":"flags.12?true"},{"name":"exclude_archived","type":"flags.13?true"},{"name":"id","type":"int"},{"name":"title","type":"string"},{"name":"emoticon","type":"flags.25?string"},{"name":"pinned_peers","type":"Vector<InputPeer>"},{"name":"include_peers","type":"Vector<InputPeer>"},{"name":"exclude_peers","type":"Vector<InputPeer>"}],"type":"DialogFilter"},{"id":"2004110666","predicate":"dialogFilterSuggested","params":[{"name":"filter","type":"DialogFilter"},{"name":"description","type":"string"}],"type":"DialogFilterSuggested"},{"id":"654302845","predicate":"updateDialogFilter","params":[{"name":"flags","type":"#"},{"name":"id","type":"int"},{"name":"filter","type":"flags.0?DialogFilter"}],"type":"Update"},{"id":"-1512627963","predicate":"updateDialogFilterOrder","params":[{"name":"order","type":"Vector<int>"}],"type":"Update"},{"id":"889491791","predicate":"updateDialogFilters","params":[],"type":"Update"},{"id":"-1237848657","predicate":"statsDateRangeDays","params":[{"name":"min_date","type":"int"},{"name":"max_date","type":"int"}],"type":"StatsDateRangeDays"},{"id":"-884757282","predicate":"statsAbsValueAndPrev","params":[{"name":"current","type":"double"},{"name":"previous","type":"double"}],"type":"StatsAbsValueAndPrev"},{"id":"-875679776","predicate":"statsPercentValue","params":[{"name":"part","type":"double"},{"name":"total","type":"double"}],"type":"StatsPercentValue"},{"id":"1244130093","predicate":"statsGraphAsync","params":[{"name":"token","type":"string"}],"type":"StatsGraph"},{"id":"-1092839390","predicate":"statsGraphError","params":[{"name":"error","type":"string"}],"type":"StatsGraph"},{"id":"-1901828938","predicate":"statsGraph","params":[{"name":"flags","type":"#"},{"name":"json","type":"DataJSON"},{"name":"zoom_token","type":"flags.0?string"}],"type":"StatsGraph"},{"id":"-1387279939","predicate":"messageInteractionCounters","params":[{"name":"msg_id","type":"int"},{"name":"views","type":"int"},{"name":"forwards","type":"int"}],"type":"MessageInteractionCounters"},{"id":"-1107852396","predicate":"stats.broadcastStats","params":[{"name":"period","type":"StatsDateRangeDays"},{"name":"followers","type":"StatsAbsValueAndPrev"},{"name":"views_per_post","type":"StatsAbsValueAndPrev"},{"name":"shares_per_post","type":"StatsAbsValueAndPrev"},{"name":"enabled_notifications","type":"StatsPercentValue"},{"name":"growth_graph","type":"StatsGraph"},{"name":"followers_graph","type":"StatsGraph"},{"name":"mute_graph","type":"StatsGraph"},{"name":"top_hours_graph","type":"StatsGraph"},{"name":"interactions_graph","type":"StatsGraph"},{"name":"iv_interactions_graph","type":"StatsGraph"},{"name":"views_by_source_graph","type":"StatsGraph"},{"name":"new_followers_by_source_graph","type":"StatsGraph"},{"name":"languages_graph","type":"StatsGraph"},{"name":"recent_message_interactions","type":"Vector<MessageInteractionCounters>"}],"type":"stats.BroadcastStats"},{"id":"-428884101","predicate":"inputMediaDice","params":[{"name":"emoticon","type":"string"}],"type":"InputMedia"},{"id":"1065280907","predicate":"messageMediaDice","params":[{"name":"value","type":"int"},{"name":"emoticon","type":"string"}],"type":"MessageMedia"},{"id":"-427863538","predicate":"inputStickerSetDice","params":[{"name":"emoticon","type":"string"}],"type":"InputStickerSet"}],"methods":[{"id":"-878758099","method":"invokeAfterMsg","params":[{"name":"msg_id","type":"long"},{"name":"query","type":"!X"}],"type":"X"},{"id":"1036301552","method":"invokeAfterMsgs","params":[{"name":"msg_ids","type":"Vector<long>"},{"name":"query","type":"!X"}],"type":"X"},{"id":"-1502141361","method":"auth.sendCode","params":[{"name":"phone_number","type":"string"},{"name":"api_id","type":"int"},{"name":"api_hash","type":"string"},{"name":"settings","type":"CodeSettings"}],"type":"auth.SentCode"},{"id":"-2131827673","method":"auth.signUp","params":[{"name":"phone_number","type":"string"},{"name":"phone_code_hash","type":"string"},{"name":"first_name","type":"string"},{"name":"last_name","type":"string"}],"type":"auth.Authorization"},{"id":"-1126886015","method":"auth.signIn","params":[{"name":"phone_number","type":"string"},{"name":"phone_code_hash","type":"string"},{"name":"phone_code","type":"string"}],"type":"auth.Authorization"},{"id":"1461180992","method":"auth.logOut","params":[],"type":"Bool"},{"id":"-1616179942","method":"auth.resetAuthorizations","params":[],"type":"Bool"},{"id":"-440401971","method":"auth.exportAuthorization","params":[{"name":"dc_id","type":"int"}],"type":"auth.ExportedAuthorization"},{"id":"-470837741","method":"auth.importAuthorization","params":[{"name":"id","type":"int"},{"name":"bytes","type":"bytes"}],"type":"auth.Authorization"},{"id":"-841733627","method":"auth.bindTempAuthKey","params":[{"name":"perm_auth_key_id","type":"long"},{"name":"nonce","type":"long"},{"name":"expires_at","type":"int"},{"name":"encrypted_message","type":"bytes"}],"type":"Bool"},{"id":"1754754159","method":"account.registerDevice","params":[{"name":"flags","type":"#"},{"name":"no_muted","type":"flags.0?true"},{"name":"token_type","type":"int"},{"name":"token","type":"string"},{"name":"app_sandbox","type":"Bool"},{"name":"secret","type":"bytes"},{"name":"other_uids","type":"Vector<int>"}],"type":"Bool"},{"id":"813089983","method":"account.unregisterDevice","params":[{"name":"token_type","type":"int"},{"name":"token","type":"string"},{"name":"other_uids","type":"Vector<int>"}],"type":"Bool"},{"id":"-2067899501","method":"account.updateNotifySettings","params":[{"name":"peer","type":"InputNotifyPeer"},{"name":"settings","type":"InputPeerNotifySettings"}],"type":"Bool"},{"id":"313765169","method":"account.getNotifySettings","params":[{"name":"peer","type":"InputNotifyPeer"}],"type":"PeerNotifySettings"},{"id":"-612493497","method":"account.resetNotifySettings","params":[],"type":"Bool"},{"id":"2018596725","method":"account.updateProfile","params":[{"name":"flags","type":"#"},{"name":"first_name","type":"flags.0?string"},{"name":"last_name","type":"flags.1?string"},{"name":"about","type":"flags.2?string"}],"type":"User"},{"id":"1713919532","method":"account.updateStatus","params":[{"name":"offline","type":"Bool"}],"type":"Bool"},{"id":"-1430579357","method":"account.getWallPapers","params":[{"name":"hash","type":"int"}],"type":"account.WallPapers"},{"id":"-1374118561","method":"account.reportPeer","params":[{"name":"peer","type":"InputPeer"},{"name":"reason","type":"ReportReason"}],"type":"Bool"},{"id":"227648840","method":"users.getUsers","params":[{"name":"id","type":"Vector<InputUser>"}],"type":"Vector<User>"},{"id":"-902781519","method":"users.getFullUser","params":[{"name":"id","type":"InputUser"}],"type":"UserFull"},{"id":"749357634","method":"contacts.getContactIDs","params":[{"name":"hash","type":"int"}],"type":"Vector<int>"},{"id":"-995929106","method":"contacts.getStatuses","params":[],"type":"Vector<ContactStatus>"},{"id":"-1071414113","method":"contacts.getContacts","params":[{"name":"hash","type":"int"}],"type":"contacts.Contacts"},{"id":"746589157","method":"contacts.importContacts","params":[{"name":"contacts","type":"Vector<InputContact>"}],"type":"contacts.ImportedContacts"},{"id":"157945344","method":"contacts.deleteContacts","params":[{"name":"id","type":"Vector<InputUser>"}],"type":"Updates"},{"id":"269745566","method":"contacts.deleteByPhones","params":[{"name":"phones","type":"Vector<string>"}],"type":"Bool"},{"id":"858475004","method":"contacts.block","params":[{"name":"id","type":"InputUser"}],"type":"Bool"},{"id":"-448724803","method":"contacts.unblock","params":[{"name":"id","type":"InputUser"}],"type":"Bool"},{"id":"-176409329","method":"contacts.getBlocked","params":[{"name":"offset","type":"int"},{"name":"limit","type":"int"}],"type":"contacts.Blocked"},{"id":"1673946374","method":"messages.getMessages","params":[{"name":"id","type":"Vector<InputMessage>"}],"type":"messages.Messages"},{"id":"-1594999949","method":"messages.getDialogs","params":[{"name":"flags","type":"#"},{"name":"exclude_pinned","type":"flags.0?true"},{"name":"folder_id","type":"flags.1?int"},{"name":"offset_date","type":"int"},{"name":"offset_id","type":"int"},{"name":"offset_peer","type":"InputPeer"},{"name":"limit","type":"int"},{"name":"hash","type":"int"}],"type":"messages.Dialogs"},{"id":"-591691168","method":"messages.getHistory","params":[{"name":"peer","type":"InputPeer"},{"name":"offset_id","type":"int"},{"name":"offset_date","type":"int"},{"name":"add_offset","type":"int"},{"name":"limit","type":"int"},{"name":"max_id","type":"int"},{"name":"min_id","type":"int"},{"name":"hash","type":"int"}],"type":"messages.Messages"},{"id":"-2045448344","method":"messages.search","params":[{"name":"flags","type":"#"},{"name":"peer","type":"InputPeer"},{"name":"q","type":"string"},{"name":"from_id","type":"flags.0?InputUser"},{"name":"filter","type":"MessagesFilter"},{"name":"min_date","type":"int"},{"name":"max_date","type":"int"},{"name":"offset_id","type":"int"},{"name":"add_offset","type":"int"},{"name":"limit","type":"int"},{"name":"max_id","type":"int"},{"name":"min_id","type":"int"},{"name":"hash","type":"int"}],"type":"messages.Messages"},{"id":"238054714","method":"messages.readHistory","params":[{"name":"peer","type":"InputPeer"},{"name":"max_id","type":"int"}],"type":"messages.AffectedMessages"},{"id":"469850889","method":"messages.deleteHistory","params":[{"name":"flags","type":"#"},{"name":"just_clear","type":"flags.0?true"},{"name":"revoke","type":"flags.1?true"},{"name":"peer","type":"InputPeer"},{"name":"max_id","type":"int"}],"type":"messages.AffectedHistory"},{"id":"-443640366","method":"messages.deleteMessages","params":[{"name":"flags","type":"#"},{"name":"revoke","type":"flags.0?true"},{"name":"id","type":"Vector<int>"}],"type":"messages.AffectedMessages"},{"id":"94983360","method":"messages.receivedMessages","params":[{"name":"max_id","type":"int"}],"type":"Vector<ReceivedNotifyMessage>"},{"id":"-1551737264","method":"messages.setTyping","params":[{"name":"peer","type":"InputPeer"},{"name":"action","type":"SendMessageAction"}],"type":"Bool"},{"id":"1376532592","method":"messages.sendMessage","params":[{"name":"flags","type":"#"},{"name":"no_webpage","type":"flags.1?true"},{"name":"silent","type":"flags.5?true"},{"name":"background","type":"flags.6?true"},{"name":"clear_draft","type":"flags.7?true"},{"name":"peer","type":"InputPeer"},{"name":"reply_to_msg_id","type":"flags.0?int"},{"name":"message","type":"string"},{"name":"random_id","type":"long"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"},{"name":"entities","type":"flags.3?Vector<MessageEntity>"},{"name":"schedule_date","type":"flags.10?int"}],"type":"Updates"},{"id":"881978281","method":"messages.sendMedia","params":[{"name":"flags","type":"#"},{"name":"silent","type":"flags.5?true"},{"name":"background","type":"flags.6?true"},{"name":"clear_draft","type":"flags.7?true"},{"name":"peer","type":"InputPeer"},{"name":"reply_to_msg_id","type":"flags.0?int"},{"name":"media","type":"InputMedia"},{"name":"message","type":"string"},{"name":"random_id","type":"long"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"},{"name":"entities","type":"flags.3?Vector<MessageEntity>"},{"name":"schedule_date","type":"flags.10?int"}],"type":"Updates"},{"id":"-637606386","method":"messages.forwardMessages","params":[{"name":"flags","type":"#"},{"name":"silent","type":"flags.5?true"},{"name":"background","type":"flags.6?true"},{"name":"with_my_score","type":"flags.8?true"},{"name":"grouped","type":"flags.9?true"},{"name":"from_peer","type":"InputPeer"},{"name":"id","type":"Vector<int>"},{"name":"random_id","type":"Vector<long>"},{"name":"to_peer","type":"InputPeer"},{"name":"schedule_date","type":"flags.10?int"}],"type":"Updates"},{"id":"-820669733","method":"messages.reportSpam","params":[{"name":"peer","type":"InputPeer"}],"type":"Bool"},{"id":"913498268","method":"messages.getPeerSettings","params":[{"name":"peer","type":"InputPeer"}],"type":"PeerSettings"},{"id":"-1115507112","method":"messages.report","params":[{"name":"peer","type":"InputPeer"},{"name":"id","type":"Vector<int>"},{"name":"reason","type":"ReportReason"}],"type":"Bool"},{"id":"1013621127","method":"messages.getChats","params":[{"name":"id","type":"Vector<int>"}],"type":"messages.Chats"},{"id":"998448230","method":"messages.getFullChat","params":[{"name":"chat_id","type":"int"}],"type":"messages.ChatFull"},{"id":"-599447467","method":"messages.editChatTitle","params":[{"name":"chat_id","type":"int"},{"name":"title","type":"string"}],"type":"Updates"},{"id":"-900957736","method":"messages.editChatPhoto","params":[{"name":"chat_id","type":"int"},{"name":"photo","type":"InputChatPhoto"}],"type":"Updates"},{"id":"-106911223","method":"messages.addChatUser","params":[{"name":"chat_id","type":"int"},{"name":"user_id","type":"InputUser"},{"name":"fwd_limit","type":"int"}],"type":"Updates"},{"id":"-530505962","method":"messages.deleteChatUser","params":[{"name":"chat_id","type":"int"},{"name":"user_id","type":"InputUser"}],"type":"Updates"},{"id":"164303470","method":"messages.createChat","params":[{"name":"users","type":"Vector<InputUser>"},{"name":"title","type":"string"}],"type":"Updates"},{"id":"-304838614","method":"updates.getState","params":[],"type":"updates.State"},{"id":"630429265","method":"updates.getDifference","params":[{"name":"flags","type":"#"},{"name":"pts","type":"int"},{"name":"pts_total_limit","type":"flags.0?int"},{"name":"date","type":"int"},{"name":"qts","type":"int"}],"type":"updates.Difference"},{"id":"-256159406","method":"photos.updateProfilePhoto","params":[{"name":"id","type":"InputPhoto"}],"type":"UserProfilePhoto"},{"id":"1328726168","method":"photos.uploadProfilePhoto","params":[{"name":"file","type":"InputFile"}],"type":"photos.Photo"},{"id":"-2016444625","method":"photos.deletePhotos","params":[{"name":"id","type":"Vector<InputPhoto>"}],"type":"Vector<long>"},{"id":"-1291540959","method":"upload.saveFilePart","params":[{"name":"file_id","type":"long"},{"name":"file_part","type":"int"},{"name":"bytes","type":"bytes"}],"type":"Bool"},{"id":"-1319462148","method":"upload.getFile","params":[{"name":"flags","type":"#"},{"name":"precise","type":"flags.0?true"},{"name":"cdn_supported","type":"flags.1?true"},{"name":"location","type":"InputFileLocation"},{"name":"offset","type":"int"},{"name":"limit","type":"int"}],"type":"upload.File"},{"id":"-990308245","method":"help.getConfig","params":[],"type":"Config"},{"id":"531836966","method":"help.getNearestDc","params":[],"type":"NearestDc"},{"id":"1378703997","method":"help.getAppUpdate","params":[{"name":"source","type":"string"}],"type":"help.AppUpdate"},{"id":"1295590211","method":"help.getInviteText","params":[],"type":"help.InviteText"},{"id":"-1848823128","method":"photos.getUserPhotos","params":[{"name":"user_id","type":"InputUser"},{"name":"offset","type":"int"},{"name":"max_id","type":"long"},{"name":"limit","type":"int"}],"type":"photos.Photos"},{"id":"651135312","method":"messages.getDhConfig","params":[{"name":"version","type":"int"},{"name":"random_length","type":"int"}],"type":"messages.DhConfig"},{"id":"-162681021","method":"messages.requestEncryption","params":[{"name":"user_id","type":"InputUser"},{"name":"random_id","type":"int"},{"name":"g_a","type":"bytes"}],"type":"EncryptedChat"},{"id":"1035731989","method":"messages.acceptEncryption","params":[{"name":"peer","type":"InputEncryptedChat"},{"name":"g_b","type":"bytes"},{"name":"key_fingerprint","type":"long"}],"type":"EncryptedChat"},{"id":"-304536635","method":"messages.discardEncryption","params":[{"name":"chat_id","type":"int"}],"type":"Bool"},{"id":"2031374829","method":"messages.setEncryptedTyping","params":[{"name":"peer","type":"InputEncryptedChat"},{"name":"typing","type":"Bool"}],"type":"Bool"},{"id":"2135648522","method":"messages.readEncryptedHistory","params":[{"name":"peer","type":"InputEncryptedChat"},{"name":"max_date","type":"int"}],"type":"Bool"},{"id":"-1451792525","method":"messages.sendEncrypted","params":[{"name":"peer","type":"InputEncryptedChat"},{"name":"random_id","type":"long"},{"name":"data","type":"bytes"}],"type":"messages.SentEncryptedMessage"},{"id":"-1701831834","method":"messages.sendEncryptedFile","params":[{"name":"peer","type":"InputEncryptedChat"},{"name":"random_id","type":"long"},{"name":"data","type":"bytes"},{"name":"file","type":"InputEncryptedFile"}],"type":"messages.SentEncryptedMessage"},{"id":"852769188","method":"messages.sendEncryptedService","params":[{"name":"peer","type":"InputEncryptedChat"},{"name":"random_id","type":"long"},{"name":"data","type":"bytes"}],"type":"messages.SentEncryptedMessage"},{"id":"1436924774","method":"messages.receivedQueue","params":[{"name":"max_qts","type":"int"}],"type":"Vector<long>"},{"id":"1259113487","method":"messages.reportEncryptedSpam","params":[{"name":"peer","type":"InputEncryptedChat"}],"type":"Bool"},{"id":"-562337987","method":"upload.saveBigFilePart","params":[{"name":"file_id","type":"long"},{"name":"file_part","type":"int"},{"name":"file_total_parts","type":"int"},{"name":"bytes","type":"bytes"}],"type":"Bool"},{"id":"-1043505495","method":"initConnection","params":[{"name":"flags","type":"#"},{"name":"api_id","type":"int"},{"name":"device_model","type":"string"},{"name":"system_version","type":"string"},{"name":"app_version","type":"string"},{"name":"system_lang_code","type":"string"},{"name":"lang_pack","type":"string"},{"name":"lang_code","type":"string"},{"name":"proxy","type":"flags.0?InputClientProxy"},{"name":"params","type":"flags.1?JSONValue"},{"name":"query","type":"!X"}],"type":"X"},{"id":"-1663104819","method":"help.getSupport","params":[],"type":"help.Support"},{"id":"916930423","method":"messages.readMessageContents","params":[{"name":"id","type":"Vector<int>"}],"type":"messages.AffectedMessages"},{"id":"655677548","method":"account.checkUsername","params":[{"name":"username","type":"string"}],"type":"Bool"},{"id":"1040964988","method":"account.updateUsername","params":[{"name":"username","type":"string"}],"type":"User"},{"id":"301470424","method":"contacts.search","params":[{"name":"q","type":"string"},{"name":"limit","type":"int"}],"type":"contacts.Found"},{"id":"-623130288","method":"account.getPrivacy","params":[{"name":"key","type":"InputPrivacyKey"}],"type":"account.PrivacyRules"},{"id":"-906486552","method":"account.setPrivacy","params":[{"name":"key","type":"InputPrivacyKey"},{"name":"rules","type":"Vector<InputPrivacyRule>"}],"type":"account.PrivacyRules"},{"id":"1099779595","method":"account.deleteAccount","params":[{"name":"reason","type":"string"}],"type":"Bool"},{"id":"150761757","method":"account.getAccountTTL","params":[],"type":"AccountDaysTTL"},{"id":"608323678","method":"account.setAccountTTL","params":[{"name":"ttl","type":"AccountDaysTTL"}],"type":"Bool"},{"id":"-627372787","method":"invokeWithLayer","params":[{"name":"layer","type":"int"},{"name":"query","type":"!X"}],"type":"X"},{"id":"-113456221","method":"contacts.resolveUsername","params":[{"name":"username","type":"string"}],"type":"contacts.ResolvedPeer"},{"id":"-2108208411","method":"account.sendChangePhoneCode","params":[{"name":"phone_number","type":"string"},{"name":"settings","type":"CodeSettings"}],"type":"auth.SentCode"},{"id":"1891839707","method":"account.changePhone","params":[{"name":"phone_number","type":"string"},{"name":"phone_code_hash","type":"string"},{"name":"phone_code","type":"string"}],"type":"User"},{"id":"71126828","method":"messages.getStickers","params":[{"name":"emoticon","type":"string"},{"name":"hash","type":"int"}],"type":"messages.Stickers"},{"id":"479598769","method":"messages.getAllStickers","params":[{"name":"hash","type":"int"}],"type":"messages.AllStickers"},{"id":"954152242","method":"account.updateDeviceLocked","params":[{"name":"period","type":"int"}],"type":"Bool"},{"id":"1738800940","method":"auth.importBotAuthorization","params":[{"name":"flags","type":"int"},{"name":"api_id","type":"int"},{"name":"api_hash","type":"string"},{"name":"bot_auth_token","type":"string"}],"type":"auth.Authorization"},{"id":"-1956073268","method":"messages.getWebPagePreview","params":[{"name":"flags","type":"#"},{"name":"message","type":"string"},{"name":"entities","type":"flags.3?Vector<MessageEntity>"}],"type":"MessageMedia"},{"id":"-484392616","method":"account.getAuthorizations","params":[],"type":"account.Authorizations"},{"id":"-545786948","method":"account.resetAuthorization","params":[{"name":"hash","type":"long"}],"type":"Bool"},{"id":"1418342645","method":"account.getPassword","params":[],"type":"account.Password"},{"id":"-1663767815","method":"account.getPasswordSettings","params":[{"name":"password","type":"InputCheckPasswordSRP"}],"type":"account.PasswordSettings"},{"id":"-1516564433","method":"account.updatePasswordSettings","params":[{"name":"password","type":"InputCheckPasswordSRP"},{"name":"new_settings","type":"account.PasswordInputSettings"}],"type":"Bool"},{"id":"-779399914","method":"auth.checkPassword","params":[{"name":"password","type":"InputCheckPasswordSRP"}],"type":"auth.Authorization"},{"id":"-661144474","method":"auth.requestPasswordRecovery","params":[],"type":"auth.PasswordRecovery"},{"id":"1319464594","method":"auth.recoverPassword","params":[{"name":"code","type":"string"}],"type":"auth.Authorization"},{"id":"-1080796745","method":"invokeWithoutUpdates","params":[{"name":"query","type":"!X"}],"type":"X"},{"id":"234312524","method":"messages.exportChatInvite","params":[{"name":"peer","type":"InputPeer"}],"type":"ExportedChatInvite"},{"id":"1051570619","method":"messages.checkChatInvite","params":[{"name":"hash","type":"string"}],"type":"ChatInvite"},{"id":"1817183516","method":"messages.importChatInvite","params":[{"name":"hash","type":"string"}],"type":"Updates"},{"id":"639215886","method":"messages.getStickerSet","params":[{"name":"stickerset","type":"InputStickerSet"}],"type":"messages.StickerSet"},{"id":"-946871200","method":"messages.installStickerSet","params":[{"name":"stickerset","type":"InputStickerSet"},{"name":"archived","type":"Bool"}],"type":"messages.StickerSetInstallResult"},{"id":"-110209570","method":"messages.uninstallStickerSet","params":[{"name":"stickerset","type":"InputStickerSet"}],"type":"Bool"},{"id":"-421563528","method":"messages.startBot","params":[{"name":"bot","type":"InputUser"},{"name":"peer","type":"InputPeer"},{"name":"random_id","type":"long"},{"name":"start_param","type":"string"}],"type":"Updates"},{"id":"-1877938321","method":"help.getAppChangelog","params":[{"name":"prev_app_version","type":"string"}],"type":"Updates"},{"id":"-993483427","method":"messages.getMessagesViews","params":[{"name":"peer","type":"InputPeer"},{"name":"id","type":"Vector<int>"},{"name":"increment","type":"Bool"}],"type":"Vector<int>"},{"id":"-871347913","method":"channels.readHistory","params":[{"name":"channel","type":"InputChannel"},{"name":"max_id","type":"int"}],"type":"Bool"},{"id":"-2067661490","method":"channels.deleteMessages","params":[{"name":"channel","type":"InputChannel"},{"name":"id","type":"Vector<int>"}],"type":"messages.AffectedMessages"},{"id":"-787622117","method":"channels.deleteUserHistory","params":[{"name":"channel","type":"InputChannel"},{"name":"user_id","type":"InputUser"}],"type":"messages.AffectedHistory"},{"id":"-32999408","method":"channels.reportSpam","params":[{"name":"channel","type":"InputChannel"},{"name":"user_id","type":"InputUser"},{"name":"id","type":"Vector<int>"}],"type":"Bool"},{"id":"-1383294429","method":"channels.getMessages","params":[{"name":"channel","type":"InputChannel"},{"name":"id","type":"Vector<InputMessage>"}],"type":"messages.Messages"},{"id":"306054633","method":"channels.getParticipants","params":[{"name":"channel","type":"InputChannel"},{"name":"filter","type":"ChannelParticipantsFilter"},{"name":"offset","type":"int"},{"name":"limit","type":"int"},{"name":"hash","type":"int"}],"type":"channels.ChannelParticipants"},{"id":"1416484774","method":"channels.getParticipant","params":[{"name":"channel","type":"InputChannel"},{"name":"user_id","type":"InputUser"}],"type":"channels.ChannelParticipant"},{"id":"176122811","method":"channels.getChannels","params":[{"name":"id","type":"Vector<InputChannel>"}],"type":"messages.Chats"},{"id":"141781513","method":"channels.getFullChannel","params":[{"name":"channel","type":"InputChannel"}],"type":"messages.ChatFull"},{"id":"1029681423","method":"channels.createChannel","params":[{"name":"flags","type":"#"},{"name":"broadcast","type":"flags.0?true"},{"name":"megagroup","type":"flags.1?true"},{"name":"title","type":"string"},{"name":"about","type":"string"},{"name":"geo_point","type":"flags.2?InputGeoPoint"},{"name":"address","type":"flags.2?string"}],"type":"Updates"},{"id":"-751007486","method":"channels.editAdmin","params":[{"name":"channel","type":"InputChannel"},{"name":"user_id","type":"InputUser"},{"name":"admin_rights","type":"ChatAdminRights"},{"name":"rank","type":"string"}],"type":"Updates"},{"id":"1450044624","method":"channels.editTitle","params":[{"name":"channel","type":"InputChannel"},{"name":"title","type":"string"}],"type":"Updates"},{"id":"-248621111","method":"channels.editPhoto","params":[{"name":"channel","type":"InputChannel"},{"name":"photo","type":"InputChatPhoto"}],"type":"Updates"},{"id":"283557164","method":"channels.checkUsername","params":[{"name":"channel","type":"InputChannel"},{"name":"username","type":"string"}],"type":"Bool"},{"id":"890549214","method":"channels.updateUsername","params":[{"name":"channel","type":"InputChannel"},{"name":"username","type":"string"}],"type":"Bool"},{"id":"615851205","method":"channels.joinChannel","params":[{"name":"channel","type":"InputChannel"}],"type":"Updates"},{"id":"-130635115","method":"channels.leaveChannel","params":[{"name":"channel","type":"InputChannel"}],"type":"Updates"},{"id":"429865580","method":"channels.inviteToChannel","params":[{"name":"channel","type":"InputChannel"},{"name":"users","type":"Vector<InputUser>"}],"type":"Updates"},{"id":"-1072619549","method":"channels.deleteChannel","params":[{"name":"channel","type":"InputChannel"}],"type":"Updates"},{"id":"51854712","method":"updates.getChannelDifference","params":[{"name":"flags","type":"#"},{"name":"force","type":"flags.0?true"},{"name":"channel","type":"InputChannel"},{"name":"filter","type":"ChannelMessagesFilter"},{"name":"pts","type":"int"},{"name":"limit","type":"int"}],"type":"updates.ChannelDifference"},{"id":"-1444503762","method":"messages.editChatAdmin","params":[{"name":"chat_id","type":"int"},{"name":"user_id","type":"InputUser"},{"name":"is_admin","type":"Bool"}],"type":"Bool"},{"id":"363051235","method":"messages.migrateChat","params":[{"name":"chat_id","type":"int"}],"type":"Updates"},{"id":"-1083038300","method":"messages.searchGlobal","params":[{"name":"flags","type":"#"},{"name":"folder_id","type":"flags.0?int"},{"name":"q","type":"string"},{"name":"offset_rate","type":"int"},{"name":"offset_peer","type":"InputPeer"},{"name":"offset_id","type":"int"},{"name":"limit","type":"int"}],"type":"messages.Messages"},{"id":"2016638777","method":"messages.reorderStickerSets","params":[{"name":"flags","type":"#"},{"name":"masks","type":"flags.0?true"},{"name":"order","type":"Vector<long>"}],"type":"Bool"},{"id":"864953444","method":"messages.getDocumentByHash","params":[{"name":"sha256","type":"bytes"},{"name":"size","type":"int"},{"name":"mime_type","type":"string"}],"type":"Document"},{"id":"-1080395925","method":"messages.searchGifs","params":[{"name":"q","type":"string"},{"name":"offset","type":"int"}],"type":"messages.FoundGifs"},{"id":"-2084618926","method":"messages.getSavedGifs","params":[{"name":"hash","type":"int"}],"type":"messages.SavedGifs"},{"id":"846868683","method":"messages.saveGif","params":[{"name":"id","type":"InputDocument"},{"name":"unsave","type":"Bool"}],"type":"Bool"},{"id":"1364105629","method":"messages.getInlineBotResults","params":[{"name":"flags","type":"#"},{"name":"bot","type":"InputUser"},{"name":"peer","type":"InputPeer"},{"name":"geo_point","type":"flags.0?InputGeoPoint"},{"name":"query","type":"string"},{"name":"offset","type":"string"}],"type":"messages.BotResults"},{"id":"-346119674","method":"messages.setInlineBotResults","params":[{"name":"flags","type":"#"},{"name":"gallery","type":"flags.0?true"},{"name":"private","type":"flags.1?true"},{"name":"query_id","type":"long"},{"name":"results","type":"Vector<InputBotInlineResult>"},{"name":"cache_time","type":"int"},{"name":"next_offset","type":"flags.2?string"},{"name":"switch_pm","type":"flags.3?InlineBotSwitchPM"}],"type":"Bool"},{"id":"570955184","method":"messages.sendInlineBotResult","params":[{"name":"flags","type":"#"},{"name":"silent","type":"flags.5?true"},{"name":"background","type":"flags.6?true"},{"name":"clear_draft","type":"flags.7?true"},{"name":"hide_via","type":"flags.11?true"},{"name":"peer","type":"InputPeer"},{"name":"reply_to_msg_id","type":"flags.0?int"},{"name":"random_id","type":"long"},{"name":"query_id","type":"long"},{"name":"id","type":"string"},{"name":"schedule_date","type":"flags.10?int"}],"type":"Updates"},{"id":"-826838685","method":"channels.exportMessageLink","params":[{"name":"channel","type":"InputChannel"},{"name":"id","type":"int"},{"name":"grouped","type":"Bool"}],"type":"ExportedMessageLink"},{"id":"527021574","method":"channels.toggleSignatures","params":[{"name":"channel","type":"InputChannel"},{"name":"enabled","type":"Bool"}],"type":"Updates"},{"id":"1056025023","method":"auth.resendCode","params":[{"name":"phone_number","type":"string"},{"name":"phone_code_hash","type":"string"}],"type":"auth.SentCode"},{"id":"520357240","method":"auth.cancelCode","params":[{"name":"phone_number","type":"string"},{"name":"phone_code_hash","type":"string"}],"type":"Bool"},{"id":"-39416522","method":"messages.getMessageEditData","params":[{"name":"peer","type":"InputPeer"},{"name":"id","type":"int"}],"type":"messages.MessageEditData"},{"id":"1224152952","method":"messages.editMessage","params":[{"name":"flags","type":"#"},{"name":"no_webpage","type":"flags.1?true"},{"name":"peer","type":"InputPeer"},{"name":"id","type":"int"},{"name":"message","type":"flags.11?string"},{"name":"media","type":"flags.14?InputMedia"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"},{"name":"entities","type":"flags.3?Vector<MessageEntity>"},{"name":"schedule_date","type":"flags.15?int"}],"type":"Updates"},{"id":"-2091549254","method":"messages.editInlineBotMessage","params":[{"name":"flags","type":"#"},{"name":"no_webpage","type":"flags.1?true"},{"name":"id","type":"InputBotInlineMessageID"},{"name":"message","type":"flags.11?string"},{"name":"media","type":"flags.14?InputMedia"},{"name":"reply_markup","type":"flags.2?ReplyMarkup"},{"name":"entities","type":"flags.3?Vector<MessageEntity>"}],"type":"Bool"},{"id":"-2130010132","method":"messages.getBotCallbackAnswer","params":[{"name":"flags","type":"#"},{"name":"game","type":"flags.1?true"},{"name":"peer","type":"InputPeer"},{"name":"msg_id","type":"int"},{"name":"data","type":"flags.0?bytes"}],"type":"messages.BotCallbackAnswer"},{"id":"-712043766","method":"messages.setBotCallbackAnswer","params":[{"name":"flags","type":"#"},{"name":"alert","type":"flags.1?true"},{"name":"query_id","type":"long"},{"name":"message","type":"flags.0?string"},{"name":"url","type":"flags.2?string"},{"name":"cache_time","type":"int"}],"type":"Bool"},{"id":"-728224331","method":"contacts.getTopPeers","params":[{"name":"flags","type":"#"},{"name":"correspondents","type":"flags.0?true"},{"name":"bots_pm","type":"flags.1?true"},{"name":"bots_inline","type":"flags.2?true"},{"name":"phone_calls","type":"flags.3?true"},{"name":"forward_users","type":"flags.4?true"},{"name":"forward_chats","type":"flags.5?true"},{"name":"groups","type":"flags.10?true"},{"name":"channels","type":"flags.15?true"},{"name":"offset","type":"int"},{"name":"limit","type":"int"},{"name":"hash","type":"int"}],"type":"contacts.TopPeers"},{"id":"451113900","method":"contacts.resetTopPeerRating","params":[{"name":"category","type":"TopPeerCategory"},{"name":"peer","type":"InputPeer"}],"type":"Bool"},{"id":"-462373635","method":"messages.getPeerDialogs","params":[{"name":"peers","type":"Vector<InputDialogPeer>"}],"type":"messages.PeerDialogs"},{"id":"-1137057461","method":"messages.saveDraft","params":[{"name":"flags","type":"#"},{"name":"no_webpage","type":"flags.1?true"},{"name":"reply_to_msg_id","type":"flags.0?int"},{"name":"peer","type":"InputPeer"},{"name":"message","type":"string"},{"name":"entities","type":"flags.3?Vector<MessageEntity>"}],"type":"Bool"},{"id":"1782549861","method":"messages.getAllDrafts","params":[],"type":"Updates"},{"id":"766298703","method":"messages.getFeaturedStickers","params":[{"name":"hash","type":"int"}],"type":"messages.FeaturedStickers"},{"id":"1527873830","method":"messages.readFeaturedStickers","params":[{"name":"id","type":"Vector<long>"}],"type":"Bool"},{"id":"1587647177","method":"messages.getRecentStickers","params":[{"name":"flags","type":"#"},{"name":"attached","type":"flags.0?true"},{"name":"hash","type":"int"}],"type":"messages.RecentStickers"},{"id":"958863608","method":"messages.saveRecentSticker","params":[{"name":"flags","type":"#"},{"name":"attached","type":"flags.0?true"},{"name":"id","type":"InputDocument"},{"name":"unsave","type":"Bool"}],"type":"Bool"},{"id":"-1986437075","method":"messages.clearRecentStickers","params":[{"name":"flags","type":"#"},{"name":"attached","type":"flags.0?true"}],"type":"Bool"},{"id":"1475442322","method":"messages.getArchivedStickers","params":[{"name":"flags","type":"#"},{"name":"masks","type":"flags.0?true"},{"name":"offset_id","type":"long"},{"name":"limit","type":"int"}],"type":"messages.ArchivedStickers"},{"id":"457157256","method":"account.sendConfirmPhoneCode","params":[{"name":"hash","type":"string"},{"name":"settings","type":"CodeSettings"}],"type":"auth.SentCode"},{"id":"1596029123","method":"account.confirmPhone","params":[{"name":"phone_code_hash","type":"string"},{"name":"phone_code","type":"string"}],"type":"Bool"},{"id":"-122669393","method":"channels.getAdminedPublicChannels","params":[{"name":"flags","type":"#"},{"name":"by_location","type":"flags.0?true"},{"name":"check_limit","type":"flags.1?true"}],"type":"messages.Chats"},{"id":"1706608543","method":"messages.getMaskStickers","params":[{"name":"hash","type":"int"}],"type":"messages.AllStickers"},{"id":"-866424884","method":"messages.getAttachedStickers","params":[{"name":"media","type":"InputStickeredMedia"}],"type":"Vector<StickerSetCovered>"},{"id":"-1907842680","method":"auth.dropTempAuthKeys","params":[{"name":"except_auth_keys","type":"Vector<long>"}],"type":"Bool"},{"id":"-1896289088","method":"messages.setGameScore","params":[{"name":"flags","type":"#"},{"name":"edit_message","type":"flags.0?true"},{"name":"force","type":"flags.1?true"},{"name":"peer","type":"InputPeer"},{"name":"id","type":"int"},{"name":"user_id","type":"InputUser"},{"name":"score","type":"int"}],"type":"Updates"},{"id":"363700068","method":"messages.setInlineGameScore","params":[{"name":"flags","type":"#"},{"name":"edit_message","type":"flags.0?true"},{"name":"force","type":"flags.1?true"},{"name":"id","type":"InputBotInlineMessageID"},{"name":"user_id","type":"InputUser"},{"name":"score","type":"int"}],"type":"Bool"},{"id":"-400399203","method":"messages.getGameHighScores","params":[{"name":"peer","type":"InputPeer"},{"name":"id","type":"int"},{"name":"user_id","type":"InputUser"}],"type":"messages.HighScores"},{"id":"258170395","method":"messages.getInlineGameHighScores","params":[{"name":"id","type":"InputBotInlineMessageID"},{"name":"user_id","type":"InputUser"}],"type":"messages.HighScores"},{"id":"218777796","method":"messages.getCommonChats","params":[{"name":"user_id","type":"InputUser"},{"name":"max_id","type":"int"},{"name":"limit","type":"int"}],"type":"messages.Chats"},{"id":"-341307408","method":"messages.getAllChats","params":[{"name":"except_ids","type":"Vector<int>"}],"type":"messages.Chats"},{"id":"-333262899","method":"help.setBotUpdatesStatus","params":[{"name":"pending_updates_count","type":"int"},{"name":"message","type":"string"}],"type":"Bool"},{"id":"852135825","method":"messages.getWebPage","params":[{"name":"url","type":"string"},{"name":"hash","type":"int"}],"type":"WebPage"},{"id":"-1489903017","method":"messages.toggleDialogPin","params":[{"name":"flags","type":"#"},{"name":"pinned","type":"flags.0?true"},{"name":"peer","type":"InputDialogPeer"}],"type":"Bool"},{"id":"991616823","method":"messages.reorderPinnedDialogs","params":[{"name":"flags","type":"#"},{"name":"force","type":"flags.0?true"},{"name":"folder_id","type":"int"},{"name":"order","type":"Vector<InputDialogPeer>"}],"type":"Bool"},{"id":"-692498958","method":"messages.getPinnedDialogs","params":[{"name":"folder_id","type":"int"}],"type":"messages.PeerDialogs"},{"id":"-1440257555","method":"bots.sendCustomRequest","params":[{"name":"custom_method","type":"string"},{"name":"params","type":"DataJSON"}],"type":"DataJSON"},{"id":"-434028723","method":"bots.answerWebhookJSONQuery","params":[{"name":"query_id","type":"long"},{"name":"data","type":"DataJSON"}],"type":"Bool"},{"id":"619086221","method":"upload.getWebFile","params":[{"name":"location","type":"InputWebFileLocation"},{"name":"offset","type":"int"},{"name":"limit","type":"int"}],"type":"upload.WebFile"},{"id":"-1712285883","method":"payments.getPaymentForm","params":[{"name":"msg_id","type":"int"}],"type":"payments.PaymentForm"},{"id":"-1601001088","method":"payments.getPaymentReceipt","params":[{"name":"msg_id","type":"int"}],"type":"payments.PaymentReceipt"},{"id":"1997180532","method":"payments.validateRequestedInfo","params":[{"name":"flags","type":"#"},{"name":"save","type":"flags.0?true"},{"name":"msg_id","type":"int"},{"name":"info","type":"PaymentRequestedInfo"}],"type":"payments.ValidatedRequestedInfo"},{"id":"730364339","method":"payments.sendPaymentForm","params":[{"name":"flags","type":"#"},{"name":"msg_id","type":"int"},{"name":"requested_info_id","type":"flags.0?string"},{"name":"shipping_option_id","type":"flags.1?string"},{"name":"credentials","type":"InputPaymentCredentials"}],"type":"payments.PaymentResult"},{"id":"1151208273","method":"account.getTmpPassword","params":[{"name":"password","type":"InputCheckPasswordSRP"},{"name":"period","type":"int"}],"type":"account.TmpPassword"},{"id":"578650699","method":"payments.getSavedInfo","params":[],"type":"payments.SavedInfo"},{"id":"-667062079","method":"payments.clearSavedInfo","params":[{"name":"flags","type":"#"},{"name":"credentials","type":"flags.0?true"},{"name":"info","type":"flags.1?true"}],"type":"Bool"},{"id":"-436833542","method":"messages.setBotShippingResults","params":[{"name":"flags","type":"#"},{"name":"query_id","type":"long"},{"name":"error","type":"flags.0?string"},{"name":"shipping_options","type":"flags.1?Vector<ShippingOption>"}],"type":"Bool"},{"id":"163765653","method":"messages.setBotPrecheckoutResults","params":[{"name":"flags","type":"#"},{"name":"success","type":"flags.1?true"},{"name":"query_id","type":"long"},{"name":"error","type":"flags.0?string"}],"type":"Bool"},{"id":"-251435136","method":"stickers.createStickerSet","params":[{"name":"flags","type":"#"},{"name":"masks","type":"flags.0?true"},{"name":"animated","type":"flags.1?true"},{"name":"user_id","type":"InputUser"},{"name":"title","type":"string"},{"name":"short_name","type":"string"},{"name":"thumb","type":"flags.2?InputDocument"},{"name":"stickers","type":"Vector<InputStickerSetItem>"}],"type":"messages.StickerSet"},{"id":"-143257775","method":"stickers.removeStickerFromSet","params":[{"name":"sticker","type":"InputDocument"}],"type":"messages.StickerSet"},{"id":"-4795190","method":"stickers.changeStickerPosition","params":[{"name":"sticker","type":"InputDocument"},{"name":"position","type":"int"}],"type":"messages.StickerSet"},{"id":"-2041315650","method":"stickers.addStickerToSet","params":[{"name":"stickerset","type":"InputStickerSet"},{"name":"sticker","type":"InputStickerSetItem"}],"type":"messages.StickerSet"},{"id":"1369162417","method":"messages.uploadMedia","params":[{"name":"peer","type":"InputPeer"},{"name":"media","type":"InputMedia"}],"type":"MessageMedia"},{"id":"1430593449","method":"phone.getCallConfig","params":[],"type":"DataJSON"},{"id":"1124046573","method":"phone.requestCall","params":[{"name":"flags","type":"#"},{"name":"video","type":"flags.0?true"},{"name":"user_id","type":"InputUser"},{"name":"random_id","type":"int"},{"name":"g_a_hash","type":"bytes"},{"name":"protocol","type":"PhoneCallProtocol"}],"type":"phone.PhoneCall"},{"id":"1003664544","method":"phone.acceptCall","params":[{"name":"peer","type":"InputPhoneCall"},{"name":"g_b","type":"bytes"},{"name":"protocol","type":"PhoneCallProtocol"}],"type":"phone.PhoneCall"},{"id":"788404002","method":"phone.confirmCall","params":[{"name":"peer","type":"InputPhoneCall"},{"name":"g_a","type":"bytes"},{"name":"key_fingerprint","type":"long"},{"name":"protocol","type":"PhoneCallProtocol"}],"type":"phone.PhoneCall"},{"id":"399855457","method":"phone.receivedCall","params":[{"name":"peer","type":"InputPhoneCall"}],"type":"Bool"},{"id":"-1295269440","method":"phone.discardCall","params":[{"name":"flags","type":"#"},{"name":"video","type":"flags.0?true"},{"name":"peer","type":"InputPhoneCall"},{"name":"duration","type":"int"},{"name":"reason","type":"PhoneCallDiscardReason"},{"name":"connection_id","type":"long"}],"type":"Updates"},{"id":"1508562471","method":"phone.setCallRating","params":[{"name":"flags","type":"#"},{"name":"user_initiative","type":"flags.0?true"},{"name":"peer","type":"InputPhoneCall"},{"name":"rating","type":"int"},{"name":"comment","type":"string"}],"type":"Updates"},{"id":"662363518","method":"phone.saveCallDebug","params":[{"name":"peer","type":"InputPhoneCall"},{"name":"debug","type":"DataJSON"}],"type":"Bool"},{"id":"536919235","method":"upload.getCdnFile","params":[{"name":"file_token","type":"bytes"},{"name":"offset","type":"int"},{"name":"limit","type":"int"}],"type":"upload.CdnFile"},{"id":"-1691921240","method":"upload.reuploadCdnFile","params":[{"name":"file_token","type":"bytes"},{"name":"request_token","type":"bytes"}],"type":"Vector<FileHash>"},{"id":"1375900482","method":"help.getCdnConfig","params":[],"type":"CdnConfig"},{"id":"-219008246","method":"langpack.getLangPack","params":[{"name":"lang_pack","type":"string"},{"name":"lang_code","type":"string"}],"type":"LangPackDifference"},{"id":"-269862909","method":"langpack.getStrings","params":[{"name":"lang_pack","type":"string"},{"name":"lang_code","type":"string"},{"name":"keys","type":"Vector<string>"}],"type":"Vector<LangPackString>"},{"id":"-845657435","method":"langpack.getDifference","params":[{"name":"lang_pack","type":"string"},{"name":"lang_code","type":"string"},{"name":"from_version","type":"int"}],"type":"LangPackDifference"},{"id":"1120311183","method":"langpack.getLanguages","params":[{"name":"lang_pack","type":"string"}],"type":"Vector<LangPackLanguage>"},{"id":"1920559378","method":"channels.editBanned","params":[{"name":"channel","type":"InputChannel"},{"name":"user_id","type":"InputUser"},{"name":"banned_rights","type":"ChatBannedRights"}],"type":"Updates"},{"id":"870184064","method":"channels.getAdminLog","params":[{"name":"flags","type":"#"},{"name":"channel","type":"InputChannel"},{"name":"q","type":"string"},{"name":"events_filter","type":"flags.0?ChannelAdminLogEventsFilter"},{"name":"admins","type":"flags.1?Vector<InputUser>"},{"name":"max_id","type":"long"},{"name":"min_id","type":"long"},{"name":"limit","type":"int"}],"type":"channels.AdminLogResults"},{"id":"1302676017","method":"upload.getCdnFileHashes","params":[{"name":"file_token","type":"bytes"},{"name":"offset","type":"int"}],"type":"Vector<FileHash>"},{"id":"-914493408","method":"messages.sendScreenshotNotification","params":[{"name":"peer","type":"InputPeer"},{"name":"reply_to_msg_id","type":"int"},{"name":"random_id","type":"long"}],"type":"Updates"},{"id":"-359881479","method":"channels.setStickers","params":[{"name":"channel","type":"InputChannel"},{"name":"stickerset","type":"InputStickerSet"}],"type":"Bool"},{"id":"567151374","method":"messages.getFavedStickers","params":[{"name":"hash","type":"int"}],"type":"messages.FavedStickers"},{"id":"-1174420133","method":"messages.faveSticker","params":[{"name":"id","type":"InputDocument"},{"name":"unfave","type":"Bool"}],"type":"Bool"},{"id":"-357180360","method":"channels.readMessageContents","params":[{"name":"channel","type":"InputChannel"},{"name":"id","type":"Vector<int>"}],"type":"Bool"},{"id":"-2020263951","method":"contacts.resetSaved","params":[],"type":"Bool"},{"id":"1180140658","method":"messages.getUnreadMentions","params":[{"name":"peer","type":"InputPeer"},{"name":"offset_id","type":"int"},{"name":"add_offset","type":"int"},{"name":"limit","type":"int"},{"name":"max_id","type":"int"},{"name":"min_id","type":"int"}],"type":"messages.Messages"},{"id":"-1355375294","method":"channels.deleteHistory","params":[{"name":"channel","type":"InputChannel"},{"name":"max_id","type":"int"}],"type":"Bool"},{"id":"1036054804","method":"help.getRecentMeUrls","params":[{"name":"referer","type":"string"}],"type":"help.RecentMeUrls"},{"id":"-356796084","method":"channels.togglePreHistoryHidden","params":[{"name":"channel","type":"InputChannel"},{"name":"enabled","type":"Bool"}],"type":"Updates"},{"id":"251759059","method":"messages.readMentions","params":[{"name":"peer","type":"InputPeer"}],"type":"messages.AffectedHistory"},{"id":"-1144759543","method":"messages.getRecentLocations","params":[{"name":"peer","type":"InputPeer"},{"name":"limit","type":"int"},{"name":"hash","type":"int"}],"type":"messages.Messages"},{"id":"-872345397","method":"messages.sendMultiMedia","params":[{"name":"flags","type":"#"},{"name":"silent","type":"flags.5?true"},{"name":"background","type":"flags.6?true"},{"name":"clear_draft","type":"flags.7?true"},{"name":"peer","type":"InputPeer"},{"name":"reply_to_msg_id","type":"flags.0?int"},{"name":"multi_media","type":"Vector<InputSingleMedia>"},{"name":"schedule_date","type":"flags.10?int"}],"type":"Updates"},{"id":"1347929239","method":"messages.uploadEncryptedFile","params":[{"name":"peer","type":"InputEncryptedChat"},{"name":"file","type":"InputEncryptedFile"}],"type":"EncryptedFile"},{"id":"405695855","method":"account.getWebAuthorizations","params":[],"type":"account.WebAuthorizations"},{"id":"755087855","method":"account.resetWebAuthorization","params":[{"name":"hash","type":"long"}],"type":"Bool"},{"id":"1747789204","method":"account.resetWebAuthorizations","params":[],"type":"Bool"},{"id":"-1028140917","method":"messages.searchStickerSets","params":[{"name":"flags","type":"#"},{"name":"exclude_featured","type":"flags.0?true"},{"name":"q","type":"string"},{"name":"hash","type":"int"}],"type":"messages.FoundStickerSets"},{"id":"-956147407","method":"upload.getFileHashes","params":[{"name":"location","type":"InputFileLocation"},{"name":"offset","type":"int"}],"type":"Vector<FileHash>"},{"id":"1031231713","method":"help.getProxyData","params":[],"type":"help.ProxyData"},{"id":"749019089","method":"help.getTermsOfServiceUpdate","params":[],"type":"help.TermsOfServiceUpdate"},{"id":"-294455398","method":"help.acceptTermsOfService","params":[{"name":"id","type":"DataJSON"}],"type":"Bool"},{"id":"-1299661699","method":"account.getAllSecureValues","params":[],"type":"Vector<SecureValue>"},{"id":"1936088002","method":"account.getSecureValue","params":[{"name":"types","type":"Vector<SecureValueType>"}],"type":"Vector<SecureValue>"},{"id":"-1986010339","method":"account.saveSecureValue","params":[{"name":"value","type":"InputSecureValue"},{"name":"secure_secret_id","type":"long"}],"type":"SecureValue"},{"id":"-1199522741","method":"account.deleteSecureValue","params":[{"name":"types","type":"Vector<SecureValueType>"}],"type":"Bool"},{"id":"-1865902923","method":"users.setSecureValueErrors","params":[{"name":"id","type":"InputUser"},{"name":"errors","type":"Vector<SecureValueError>"}],"type":"Bool"},{"id":"-1200903967","method":"account.getAuthorizationForm","params":[{"name":"bot_id","type":"int"},{"name":"scope","type":"string"},{"name":"public_key","type":"string"}],"type":"account.AuthorizationForm"},{"id":"-419267436","method":"account.acceptAuthorization","params":[{"name":"bot_id","type":"int"},{"name":"scope","type":"string"},{"name":"public_key","type":"string"},{"name":"value_hashes","type":"Vector<SecureValueHash>"},{"name":"credentials","type":"SecureCredentialsEncrypted"}],"type":"Bool"},{"id":"-1516022023","method":"account.sendVerifyPhoneCode","params":[{"name":"phone_number","type":"string"},{"name":"settings","type":"CodeSettings"}],"type":"auth.SentCode"},{"id":"1305716726","method":"account.verifyPhone","params":[{"name":"phone_number","type":"string"},{"name":"phone_code_hash","type":"string"},{"name":"phone_code","type":"string"}],"type":"Bool"},{"id":"1880182943","method":"account.sendVerifyEmailCode","params":[{"name":"email","type":"string"}],"type":"account.SentEmailCode"},{"id":"-323339813","method":"account.verifyEmail","params":[{"name":"email","type":"string"},{"name":"code","type":"string"}],"type":"Bool"},{"id":"1072547679","method":"help.getDeepLinkInfo","params":[{"name":"path","type":"string"}],"type":"help.DeepLinkInfo"},{"id":"-2098076769","method":"contacts.getSaved","params":[],"type":"Vector<SavedContact>"},{"id":"-2092831552","method":"channels.getLeftChannels","params":[{"name":"offset","type":"int"}],"type":"messages.Chats"},{"id":"-262453244","method":"account.initTakeoutSession","params":[{"name":"flags","type":"#"},{"name":"contacts","type":"flags.0?true"},{"name":"message_users","type":"flags.1?true"},{"name":"message_chats","type":"flags.2?true"},{"name":"message_megagroups","type":"flags.3?true"},{"name":"message_channels","type":"flags.4?true"},{"name":"files","type":"flags.5?true"},{"name":"file_max_size","type":"flags.5?int"}],"type":"account.Takeout"},{"id":"489050862","method":"account.finishTakeoutSession","params":[{"name":"flags","type":"#"},{"name":"success","type":"flags.0?true"}],"type":"Bool"},{"id":"486505992","method":"messages.getSplitRanges","params":[],"type":"Vector<MessageRange>"},{"id":"911373810","method":"invokeWithMessagesRange","params":[{"name":"range","type":"MessageRange"},{"name":"query","type":"!X"}],"type":"X"},{"id":"-1398145746","method":"invokeWithTakeout","params":[{"name":"takeout_id","type":"long"},{"name":"query","type":"!X"}],"type":"X"},{"id":"-1031349873","method":"messages.markDialogUnread","params":[{"name":"flags","type":"#"},{"name":"unread","type":"flags.0?true"},{"name":"peer","type":"InputDialogPeer"}],"type":"Bool"},{"id":"585256482","method":"messages.getDialogUnreadMarks","params":[],"type":"Vector<DialogPeer>"},{"id":"-2062238246","method":"contacts.toggleTopPeers","params":[{"name":"enabled","type":"Bool"}],"type":"Bool"},{"id":"2119757468","method":"messages.clearAllDrafts","params":[],"type":"Bool"},{"id":"-1735311088","method":"help.getAppConfig","params":[],"type":"JSONValue"},{"id":"1862465352","method":"help.saveAppLog","params":[{"name":"events","type":"Vector<InputAppEvent>"}],"type":"Bool"},{"id":"-966677240","method":"help.getPassportConfig","params":[{"name":"hash","type":"int"}],"type":"help.PassportConfig"},{"id":"1784243458","method":"langpack.getLanguage","params":[{"name":"lang_pack","type":"string"},{"name":"lang_code","type":"string"}],"type":"LangPackLanguage"},{"id":"-760547348","method":"messages.updatePinnedMessage","params":[{"name":"flags","type":"#"},{"name":"silent","type":"flags.0?true"},{"name":"peer","type":"InputPeer"},{"name":"id","type":"int"}],"type":"Updates"},{"id":"-1881204448","method":"account.confirmPasswordEmail","params":[{"name":"code","type":"string"}],"type":"Bool"},{"id":"2055154197","method":"account.resendPasswordEmail","params":[],"type":"Bool"},{"id":"-1043606090","method":"account.cancelPasswordEmail","params":[],"type":"Bool"},{"id":"-748624084","method":"help.getSupportName","params":[],"type":"help.SupportName"},{"id":"59377875","method":"help.getUserInfo","params":[{"name":"user_id","type":"InputUser"}],"type":"help.UserInfo"},{"id":"1723407216","method":"help.editUserInfo","params":[{"name":"user_id","type":"InputUser"},{"name":"message","type":"string"},{"name":"entities","type":"Vector<MessageEntity>"}],"type":"help.UserInfo"},{"id":"-1626880216","method":"account.getContactSignUpNotification","params":[],"type":"Bool"},{"id":"-806076575","method":"account.setContactSignUpNotification","params":[{"name":"silent","type":"Bool"}],"type":"Bool"},{"id":"1398240377","method":"account.getNotifyExceptions","params":[{"name":"flags","type":"#"},{"name":"compare_sound","type":"flags.1?true"},{"name":"peer","type":"flags.0?InputNotifyPeer"}],"type":"Updates"},{"id":"283795844","method":"messages.sendVote","params":[{"name":"peer","type":"InputPeer"},{"name":"msg_id","type":"int"},{"name":"options","type":"Vector<bytes>"}],"type":"Updates"},{"id":"1941660731","method":"messages.getPollResults","params":[{"name":"peer","type":"InputPeer"},{"name":"msg_id","type":"int"}],"type":"Updates"},{"id":"1848369232","method":"messages.getOnlines","params":[{"name":"peer","type":"InputPeer"}],"type":"ChatOnlines"},{"id":"-2127811866","method":"messages.getStatsURL","params":[{"name":"flags","type":"#"},{"name":"dark","type":"flags.0?true"},{"name":"peer","type":"InputPeer"},{"name":"params","type":"string"}],"type":"StatsURL"},{"id":"-554301545","method":"messages.editChatAbout","params":[{"name":"peer","type":"InputPeer"},{"name":"about","type":"string"}],"type":"Bool"},{"id":"-1517917375","method":"messages.editChatDefaultBannedRights","params":[{"name":"peer","type":"InputPeer"},{"name":"banned_rights","type":"ChatBannedRights"}],"type":"Updates"},{"id":"-57811990","method":"account.getWallPaper","params":[{"name":"wallpaper","type":"InputWallPaper"}],"type":"WallPaper"},{"id":"-578472351","method":"account.uploadWallPaper","params":[{"name":"file","type":"InputFile"},{"name":"mime_type","type":"string"},{"name":"settings","type":"WallPaperSettings"}],"type":"WallPaper"},{"id":"1817860919","method":"account.saveWallPaper","params":[{"name":"wallpaper","type":"InputWallPaper"},{"name":"unsave","type":"Bool"},{"name":"settings","type":"WallPaperSettings"}],"type":"Bool"},{"id":"-18000023","method":"account.installWallPaper","params":[{"name":"wallpaper","type":"InputWallPaper"},{"name":"settings","type":"WallPaperSettings"}],"type":"Bool"},{"id":"-1153722364","method":"account.resetWallPapers","params":[],"type":"Bool"},{"id":"1457130303","method":"account.getAutoDownloadSettings","params":[],"type":"account.AutoDownloadSettings"},{"id":"1995661875","method":"account.saveAutoDownloadSettings","params":[{"name":"flags","type":"#"},{"name":"low","type":"flags.0?true"},{"name":"high","type":"flags.1?true"},{"name":"settings","type":"AutoDownloadSettings"}],"type":"Bool"},{"id":"899735650","method":"messages.getEmojiKeywords","params":[{"name":"lang_code","type":"string"}],"type":"EmojiKeywordsDifference"},{"id":"352892591","method":"messages.getEmojiKeywordsDifference","params":[{"name":"lang_code","type":"string"},{"name":"from_version","type":"int"}],"type":"EmojiKeywordsDifference"},{"id":"1318675378","method":"messages.getEmojiKeywordsLanguages","params":[{"name":"lang_codes","type":"Vector<string>"}],"type":"Vector<EmojiLanguage>"},{"id":"-709817306","method":"messages.getEmojiURL","params":[{"name":"lang_code","type":"string"}],"type":"EmojiURL"},{"id":"1749536939","method":"folders.editPeerFolders","params":[{"name":"folder_peers","type":"Vector<InputFolderPeer>"}],"type":"Updates"},{"id":"472471681","method":"folders.deleteFolder","params":[{"name":"folder_id","type":"int"}],"type":"Updates"},{"id":"1932455680","method":"messages.getSearchCounters","params":[{"name":"peer","type":"InputPeer"},{"name":"filters","type":"Vector<MessagesFilter>"}],"type":"Vector<messages.SearchCounter>"},{"id":"-170208392","method":"channels.getGroupsForDiscussion","params":[],"type":"messages.Chats"},{"id":"1079520178","method":"channels.setDiscussionGroup","params":[{"name":"broadcast","type":"InputChannel"},{"name":"group","type":"InputChannel"}],"type":"Bool"},{"id":"-482388461","method":"messages.requestUrlAuth","params":[{"name":"peer","type":"InputPeer"},{"name":"msg_id","type":"int"},{"name":"button_id","type":"int"}],"type":"UrlAuthResult"},{"id":"-148247912","method":"messages.acceptUrlAuth","params":[{"name":"flags","type":"#"},{"name":"write_allowed","type":"flags.0?true"},{"name":"peer","type":"InputPeer"},{"name":"msg_id","type":"int"},{"name":"button_id","type":"int"}],"type":"UrlAuthResult"},{"id":"1336717624","method":"messages.hidePeerSettingsBar","params":[{"name":"peer","type":"InputPeer"}],"type":"Bool"},{"id":"-386636848","method":"contacts.addContact","params":[{"name":"flags","type":"#"},{"name":"add_phone_privacy_exception","type":"flags.0?true"},{"name":"id","type":"InputUser"},{"name":"first_name","type":"string"},{"name":"last_name","type":"string"},{"name":"phone","type":"string"}],"type":"Updates"},{"id":"-130964977","method":"contacts.acceptContact","params":[{"name":"id","type":"InputUser"}],"type":"Updates"},{"id":"-1892102881","method":"channels.editCreator","params":[{"name":"channel","type":"InputChannel"},{"name":"user_id","type":"InputUser"},{"name":"password","type":"InputCheckPasswordSRP"}],"type":"Updates"},{"id":"-750207932","method":"contacts.getLocated","params":[{"name":"flags","type":"#"},{"name":"background","type":"flags.1?true"},{"name":"geo_point","type":"InputGeoPoint"},{"name":"self_expires","type":"flags.0?int"}],"type":"Updates"},{"id":"1491484525","method":"channels.editLocation","params":[{"name":"channel","type":"InputChannel"},{"name":"geo_point","type":"InputGeoPoint"},{"name":"address","type":"string"}],"type":"Bool"},{"id":"-304832784","method":"channels.toggleSlowMode","params":[{"name":"channel","type":"InputChannel"},{"name":"seconds","type":"int"}],"type":"Updates"},{"id":"-490575781","method":"messages.getScheduledHistory","params":[{"name":"peer","type":"InputPeer"},{"name":"hash","type":"int"}],"type":"messages.Messages"},{"id":"-1111817116","method":"messages.getScheduledMessages","params":[{"name":"peer","type":"InputPeer"},{"name":"id","type":"Vector<int>"}],"type":"messages.Messages"},{"id":"-1120369398","method":"messages.sendScheduledMessages","params":[{"name":"peer","type":"InputPeer"},{"name":"id","type":"Vector<int>"}],"type":"Updates"},{"id":"1504586518","method":"messages.deleteScheduledMessages","params":[{"name":"peer","type":"InputPeer"},{"name":"id","type":"Vector<int>"}],"type":"Updates"},{"id":"473805619","method":"account.uploadTheme","params":[{"name":"flags","type":"#"},{"name":"file","type":"InputFile"},{"name":"thumb","type":"flags.0?InputFile"},{"name":"file_name","type":"string"},{"name":"mime_type","type":"string"}],"type":"Document"},{"id":"-2077048289","method":"account.createTheme","params":[{"name":"flags","type":"#"},{"name":"slug","type":"string"},{"name":"title","type":"string"},{"name":"document","type":"flags.2?InputDocument"},{"name":"settings","type":"flags.3?InputThemeSettings"}],"type":"Theme"},{"id":"1555261397","method":"account.updateTheme","params":[{"name":"flags","type":"#"},{"name":"format","type":"string"},{"name":"theme","type":"InputTheme"},{"name":"slug","type":"flags.0?string"},{"name":"title","type":"flags.1?string"},{"name":"document","type":"flags.2?InputDocument"},{"name":"settings","type":"flags.3?InputThemeSettings"}],"type":"Theme"},{"id":"-229175188","method":"account.saveTheme","params":[{"name":"theme","type":"InputTheme"},{"name":"unsave","type":"Bool"}],"type":"Bool"},{"id":"2061776695","method":"account.installTheme","params":[{"name":"flags","type":"#"},{"name":"dark","type":"flags.0?true"},{"name":"format","type":"flags.1?string"},{"name":"theme","type":"flags.1?InputTheme"}],"type":"Bool"},{"id":"-1919060949","method":"account.getTheme","params":[{"name":"format","type":"string"},{"name":"theme","type":"InputTheme"},{"name":"document_id","type":"long"}],"type":"Theme"},{"id":"676939512","method":"account.getThemes","params":[{"name":"format","type":"string"},{"name":"hash","type":"int"}],"type":"account.Themes"},{"id":"-1313598185","method":"auth.exportLoginToken","params":[{"name":"api_id","type":"int"},{"name":"api_hash","type":"string"},{"name":"except_ids","type":"Vector<int>"}],"type":"auth.LoginToken"},{"id":"-1783866140","method":"auth.importLoginToken","params":[{"name":"token","type":"bytes"}],"type":"auth.LoginToken"},{"id":"-392909491","method":"auth.acceptLoginToken","params":[{"name":"token","type":"bytes"}],"type":"Authorization"},{"id":"-1250643605","method":"account.setContentSettings","params":[{"name":"flags","type":"#"},{"name":"sensitive_enabled","type":"flags.0?true"}],"type":"Bool"},{"id":"-1952756306","method":"account.getContentSettings","params":[],"type":"account.ContentSettings"},{"id":"300429806","method":"channels.getInactiveChannels","params":[],"type":"messages.InactiveChats"},{"id":"1705865692","method":"account.getMultiWallPapers","params":[{"name":"wallpapers","type":"Vector<InputWallPaper>"}],"type":"Vector<WallPaper>"},{"id":"-1200736242","method":"messages.getPollVotes","params":[{"name":"flags","type":"#"},{"name":"peer","type":"InputPeer"},{"name":"id","type":"int"},{"name":"option","type":"flags.0?bytes"},{"name":"offset","type":"flags.1?string"},{"name":"limit","type":"int"}],"type":"messages.VotesList"},{"id":"-1257951254","method":"messages.toggleStickerSets","params":[{"name":"flags","type":"#"},{"name":"uninstall","type":"flags.0?true"},{"name":"archive","type":"flags.1?true"},{"name":"unarchive","type":"flags.2?true"},{"name":"stickersets","type":"Vector<InputStickerSet>"}],"type":"Bool"},{"id":"779736953","method":"payments.getBankCardData","params":[{"name":"number","type":"string"}],"type":"payments.BankCardData"},{"id":"-241247891","method":"messages.getDialogFilters","params":[],"type":"Vector<DialogFilter>"},{"id":"-1566780372","method":"messages.getSuggestedDialogFilters","params":[],"type":"Vector<DialogFilterSuggested>"},{"id":"450142282","method":"messages.updateDialogFilter","params":[{"name":"flags","type":"#"},{"name":"id","type":"int"},{"name":"filter","type":"flags.0?DialogFilter"}],"type":"Bool"},{"id":"-983318044","method":"messages.updateDialogFiltersOrder","params":[{"name":"order","type":"Vector<int>"}],"type":"Bool"},{"id":"-1421720550","method":"stats.getBroadcastStats","params":[{"name":"flags","type":"#"},{"name":"dark","type":"flags.0?true"},{"name":"channel","type":"InputChannel"}],"type":"stats.BroadcastStats"},{"id":"1646092192","method":"stats.loadAsyncGraph","params":[{"name":"flags","type":"#"},{"name":"token","type":"string"},{"name":"x","type":"flags.0?long"}],"type":"StatsGraph"},{"id":"-1707717072","method":"stickers.setStickerSetThumb","params":[{"name":"stickerset","type":"InputStickerSet"},{"name":"thumb","type":"InputDocument"}],"type":"messages.StickerSet"},{"id":"-2141370634","method":"bots.setBotCommands","params":[{"name":"commands","type":"Vector<BotCommand>"}],"type":"Bool"},{"id":"1608974939","method":"messages.getOldFeaturedStickers","params":[{"name":"offset","type":"int"},{"name":"limit","type":"int"},{"name":"hash","type":"int"}],"type":"messages.FeaturedStickers"}]}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// import moment from 'moment'

// const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS'

// export const getDefaultDateTimeFormat = () => DATETIME_FORMAT

// export const dateStrToDMY = (dateObject, format = 'DD.MM.YYYY') => {
//     if (!dateObject) {
//         throw new Error('Empty dateObject')
//     }

//     const date = moment(dateObject, format)

//     return {
//         day: date.date(),
//         month: date.month() + 1,
//         year: date.year()
//     }
// }

// export const now = () => moment().format(DATETIME_FORMAT)

// export const DMYToMomentDate = (date) => {
//     return moment({ day: date.day, month: date.month - 1, year: date.year })
// }


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var ErrorResponse = function () {
    function ErrorResponse(obj) {var _this = this;_classCallCheck(this, ErrorResponse);
        this.dataObject = {};

        if (!obj) {
            return;
        }

        if (obj instanceof Error) {
            Object.getOwnPropertyNames(obj).forEach(function (key) {return _this.dataObject[key] = obj[key];});
            return;
        }

        this.dataObject = obj;
    }_createClass(ErrorResponse, [{ key: 'toJSON', value: function toJSON()

        {
            return this.dataObject;
        } }, { key: 'toString', value: function toString()

        {
            /// Circular Reference Exception
            var cache = [];
            return JSON.stringify(this.dataObject, function (key, value) {
                if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        return;
                    }
                    cache.push(value);
                }
                return value;
            }, 2);
        } }]);return ErrorResponse;}();exports.default =



ErrorResponse;module.exports = exports['default'];

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.select = exports.prepare = undefined;var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _TL = __webpack_require__(6);
var _Utils = __webpack_require__(2);

/**
                                  *  Server public key, obtained from here: https://core.telegram.org/api/obtaining_api_id
                                  * 
                                  * 
                                  *  -----BEGIN RSA PUBLIC KEY-----
                                  *  MIIBCgKCAQEAwVACPi9w23mF3tBkdZz+zwrzKOaaQdr01vAbU4E1pvkfj4sqDsm6
                                  *  lyDONS789sVoD/xCS9Y0hkkC3gtL1tSfTlgCMOOul9lcixlEKzwKENj1Yz/s7daS
                                  *  an9tqw3bfUV/nqgbhGX81v/+7RFAEd+RwFnK7a+XYl9sluzHRyVVaTTveB2GazTw
                                  *  Efzk2DWgkBluml8OREmvfraX3bkHZJTKX4EQSjBbbdJ2ZXIsRrYOXfaA+xayEGB+
                                  *  8hdlLmAjbCVfaigxX0CDqWeR1yFL9kwd9P0NsZRPsmoqVwMbMu7mStFai6aIhc3n
                                  *  Slv8kg9qv1m6XHVQY3PnEw+QQtqSIXklHwIDAQAB
                                  *  -----END RSA PUBLIC KEY-----
                                  *  
                                  *  -----BEGIN PUBLIC KEY-----
                                  *  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAruw2yP/BCcsJliRoW5eB
                                  *  VBVle9dtjJw+OYED160Wybum9SXtBBLXriwt4rROd9csv0t0OHCaTmRqBcQ0J8fx
                                  *  hN6/cpR1GWgOZRUAiQxoMnlt0R93LCX/j1dnVa/gVbCjdSxpbrfY2g2L4frzjJvd
                                  *  l84Kd9ORYjDEAyFnEA7dD556OptgLQQ2e2iVNq8NZLYTzLp5YpOdO1doK+ttrltg
                                  *  gTCy5SrKeLoCPPbOgGsdxJxyz5KKcZnSLj16yE5HvJQn0CNpRdENvRUXe6tBP78O
                                  *  39oJ8BTHp9oIjd6XWXAsp2CvK45Ol8wFXGF710w9lwCGNbmNxNYhtIkdqfsEcwR5
                                  *  JwIDAQAB
                                  *  -----END PUBLIC KEY-----
                                  *  
                                  *  -----BEGIN PUBLIC KEY-----
                                  *  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvfLHfYH2r9R70w8prHbl
                                  *  Wt/nDkh+XkgpflqQVcnAfSuTtO05lNPspQmL8Y2XjVT4t8cT6xAkdgfmmvnvRPOO
                                  *  KPi0OfJXoRVylFzAQG/j83u5K3kRLbae7fLccVhKZhY46lvsueI1hQdLgNV9n1cQ
                                  *  3TDS2pQOCtovG4eDl9wacrXOJTG2990VjgnIKNA0UMoP+KF03qzryqIt3oTvZq03
                                  *  DyWdGK+AZjgBLaDKSnC6qD2cFY81UryRWOab8zKkWAnhw2kFpcqhI0jdV5QaSCEx
                                  *  vnsjVaX0Y1N0870931/5Jb9ICe4nweZ9kSDF/gip3kWLG0o8XQpChDfyvsqB9OLV
                                  *  /wIDAQAB
                                  *  -----END PUBLIC KEY-----
                                  *  
                                  *  -----BEGIN PUBLIC KEY-----
                                  *  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs/ditzm+mPND6xkhzwFI
                                  *  z6J/968CtkcSE/7Z2qAJiXbmZ3UDJPGrzqTDHkO30R8VeRM/Kz2f4nR05GIFiITl
                                  *  4bEjvpy7xqRDspJcCFIOcyXm8abVDhF+th6knSU0yLtNKuQVP6voMrnt9MV1X92L
                                  *  GZQLgdHZbPQz0Z5qIpaKhdyA8DEvWWvSUwwc+yi1/gGaybwlzZwqXYoPOhwMebzK
                                  *  Uk0xW14htcJrRrq+PXXQbRzTMynseCoPIoke0dtCodbA3qQxQovE16q9zz4Otv2k
                                  *  4j63cz53J+mhkVWAeWxVGI0lltJmWtEYK6er8VqqWot3nqmWMXogrgRLggv/Nbbo
                                  *  oQIDAQAB
                                  *  -----END PUBLIC KEY-----
                                  *  
                                  *  -----BEGIN PUBLIC KEY-----
                                  *  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvmpxVY7ld/8DAjz6F6q0
                                  *  5shjg8/4p6047bn6/m8yPy1RBsvIyvuDuGnP/RzPEhzXQ9UJ5Ynmh2XJZgHoE9xb
                                  *  nfxL5BXHplJhMtADXKM9bWB11PU1Eioc3+AXBB8QiNFBn2XI5UkO5hPhbb9mJpjA
                                  *  9Uhw8EdfqJP8QetVsI/xrCEbwEXe0xvifRLJbY08/Gp66KpQvy7g8w7VB8wlgePe
                                  *  xW3pT13Ap6vuC+mQuJPyiHvSxjEKHgqePji9NP3tJUFQjcECqcm0yV7/2d0t/pbC
                                  *  m+ZH1sadZspQCEPPrtbkQBlvHb4OLiIWPGHKSMeRFvp3IWcmdJqXahxLCUS1Eh6M
                                  *  AQIDAQAB
                                  *  -----END PUBLIC KEY-----
                                  *
                                  * Bytes can be got via 
                                  * $ openssl rsa -pubin -in key.pub -text -noout
                                  */

var publisKeysHex = [
{
    modulus: 'c150023e2f70db7985ded064759cfecf0af328e69a41daf4d6f01b538135a6f91f8f8b2a0ec9ba9720ce352efcf6c5680ffc424bd634864902de0b4bd6d49f4e580230e3ae97d95c8b19442b3c0a10d8f5633fecedd6926a7f6dab0ddb7d457f9ea81b8465fcd6fffeed114011df91c059caedaf97625f6c96ecc74725556934ef781d866b34f011fce4d835a090196e9a5f0e4449af7eb697ddb9076494ca5f81104a305b6dd27665722c46b60e5df680fb16b210607ef217652e60236c255f6a28315f4083a96791d7214bf64c1df4fd0db1944fb26a2a57031b32eee64ad15a8ba68885cde74a5bfc920f6abf59ba5c75506373e7130f9042da922179251f',
    exponent: '010001' },

{
    modulus: 'aeec36c8ffc109cb099624685b97815415657bd76d8c9c3e398103d7ad16c9bba6f525ed0412d7ae2c2de2b44e77d72cbf4b7438709a4e646a05c43427c7f184debf72947519680e651500890c6832796dd11f772c25ff8f576755afe055b0a3752c696eb7d8da0d8be1faf38c9bdd97ce0a77d3916230c4032167100edd0f9e7a3a9b602d04367b689536af0d64b613ccba7962939d3b57682beb6dae5b608130b2e52aca78ba023cf6ce806b1dc49c72cf928a7199d22e3d7ac84e47bc9427d0236945d10dbd15177bab413fbf0edfda09f014c7a7da088dde9759702ca760af2b8e4e97cc055c617bd74c3d97008635b98dc4d621b4891da9fb0473047927',
    exponent: '010001' },

{
    modulus: 'bdf2c77d81f6afd47bd30f29ac76e55adfe70e487e5e48297e5a9055c9c07d2b93b4ed3994d3eca5098bf18d978d54f8b7c713eb10247607e69af9ef44f38e28f8b439f257a11572945cc0406fe3f37bb92b79112db69eedf2dc71584a661638ea5becb9e23585074b80d57d9f5710dd30d2da940e0ada2f1b878397dc1a72b5ce2531b6f7dd158e09c828d03450ca0ff8a174deacebcaa22dde84ef66ad370f259d18af806638012da0ca4a70baa83d9c158f3552bc9158e69bf332a45809e1c36905a5caa12348dd57941a482131be7b2355a5f4635374f3bd3ddf5ff925bf4809ee27c1e67d9120c5fe08a9de458b1b4a3c5d0a428437f2beca81f4e2d5ff',
    exponent: '010001' },

{
    modulus: 'b3f762b739be98f343eb1921cf0148cfa27ff7af02b6471213fed9daa0098976e667750324f1abcea4c31e43b7d11f1579133f2b3d9fe27474e462058884e5e1b123be9cbbc6a443b2925c08520e7325e6f1a6d50e117eb61ea49d2534c8bb4d2ae4153fabe832b9edf4c5755fdd8b19940b81d1d96cf433d19e6a22968a85dc80f0312f596bd2530c1cfb28b5fe019ac9bc25cd9c2a5d8a0f3a1c0c79bcca524d315b5e21b5c26b46babe3d75d06d1cd33329ec782a0f22891ed1db42a1d6c0dea431428bc4d7aabdcf3e0eb6fda4e23eb7733e7727e9a1915580796c55188d2596d2665ad1182ba7abf15aaa5a8b779ea996317a20ae044b820bff35b6e8a1',
    exponent: '010001' },

{
    modulus: 'be6a71558ee577ff03023cfa17aab4e6c86383cff8a7ad38edb9fafe6f323f2d5106cbc8cafb83b869cffd1ccf121cd743d509e589e68765c96601e813dc5b9dfc4be415c7a6526132d0035ca33d6d6075d4f535122a1cdfe017041f1088d1419f65c8e5490ee613e16dbf662698c0f54870f0475fa893fc41eb55b08ff1ac211bc045ded31be27d12c96d8d3cfc6a7ae8aa50bf2ee0f30ed507cc2581e3dec56de94f5dc0a7abee0be990b893f2887bd2c6310a1e0a9e3e38bd34fded2541508dc102a9c9b4c95effd9dd2dfe96c29be647d6c69d66ca500843cfaed6e440196f1dbe0e2e22163c61ca48c79116fa77216726749a976a1c4b0944b5121e8c01',
    exponent: '010001' }];



var publicKeysParsed = {};
var prepared = false;

function prepareRsaKeys() {
    if (prepared) {
        return;
    }

    for (var i = 0; i < publisKeysHex.length; i++) {
        var keyParsed = publisKeysHex[i];

        var RSAPublicKey = new _TL.TLSerialization();
        RSAPublicKey.storeBytes((0, _Utils.bytesFromHex)(keyParsed.modulus), 'n');
        RSAPublicKey.storeBytes((0, _Utils.bytesFromHex)(keyParsed.exponent), 'e');

        var buffer = RSAPublicKey.getBuffer();

        var fingerprintBytes = (0, _Utils.sha1BytesSync)(buffer).slice(-8);
        fingerprintBytes.reverse();

        publicKeysParsed[(0, _Utils.bytesToHex)(fingerprintBytes)] = {
            modulus: keyParsed.modulus,
            exponent: keyParsed.exponent };

    }

    prepared = true;
}

function selectRsaKeyByFingerPrint(fingerprints) {
    prepareRsaKeys();

    var fingerprintHex, foundKey, i;
    for (i = 0; i < fingerprints.length; i++) {
        fingerprintHex = (0, _Utils.bigStringInt)(fingerprints[i]).toString(16);
        if (foundKey = publicKeysParsed[fingerprintHex]) {
            return _extends({}, foundKey, { fingerprint: fingerprints[i] });
        }
    }

    return false;
}

var prepare = exports.prepare = prepareRsaKeys;
var select = exports.select = selectRsaKeyByFingerPrint;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {Object.defineProperty(exports, "__esModule", { value: true });var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};exports.






TLSerialization = TLSerialization;exports.



































































































































































































































































































































































TLDeserialization = TLDeserialization;var _Utils = __webpack_require__(2);var _config = __webpack_require__(3);var _config2 = _interopRequireDefault(_config);var _utils = __webpack_require__(7);var _Services = __webpack_require__(1);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // console.log(Config.Modes);
function TLSerialization(options) {options = options || {};this.maxLength = options.startMaxLength || 2048; // 2Kb
    this.offset = 0; // in bytes
    this.createBuffer();this.mtproto = options.mtproto || false;return this;}TLSerialization.prototype.createBuffer = function () {this.buffer = new ArrayBuffer(this.maxLength);this.intView = new Int32Array(this.buffer);this.byteView = new Uint8Array(this.buffer);};TLSerialization.prototype.getArray = function () {var resultBuffer = new ArrayBuffer(this.offset);var resultArray = new Int32Array(resultBuffer);resultArray.set(this.intView.subarray(0, this.offset / 4));return resultArray;};TLSerialization.prototype.getBuffer = function () {return this.getArray().buffer;};TLSerialization.prototype.getBytes = function (typed) {if (typed) {var resultBuffer = new ArrayBuffer(this.offset);var resultArray = new Uint8Array(resultBuffer);resultArray.set(this.byteView.subarray(0, this.offset));return resultArray;}var bytes = [];for (var i = 0; i < this.offset; i++) {bytes.push(this.byteView[i]);}return bytes;};TLSerialization.prototype.checkLength = function (needBytes) {if (this.offset + needBytes < this.maxLength) {return;} //LogService.logDebug(`[TLSerialization] checkLength() ${this.offset} ${needBytes} ${this.maxLength}`)
    this.maxLength = Math.ceil(Math.max(this.maxLength * 2, this.offset + needBytes + 16) / 4) * 4;var previousBuffer = this.buffer;var previousArray = new Int32Array(previousBuffer);this.createBuffer();new Int32Array(this.buffer).set(previousArray);};TLSerialization.prototype.writeInt = function (i, field) {//LogService.logDebug(`[TLSerialization] writeInt() ${i}  ${i} ${field}`)
    this.checkLength(4);this.intView[this.offset / 4] = i;this.offset += 4;};TLSerialization.prototype.storeInt = function (i, field) {this.writeInt(i, (field || '') + ':int');};TLSerialization.prototype.storeBool = function (i, field) {if (i) {this.writeInt(0x997275b5, (field || '') + ':bool');} else {this.writeInt(0xbc799737, (field || '') + ':bool');}};TLSerialization.prototype.storeLongP = function (iHigh, iLow, field) {this.writeInt(iLow, (field || '') + ':long[low]');this.writeInt(iHigh, (field || '') + ':long[high]');};TLSerialization.prototype.storeLong = function (sLong, field) {if (Array.isArray(sLong)) {if (sLong.length == 2) {return this.storeLongP(sLong[0], sLong[1], field);} else {return this.storeIntBytes(sLong, 64, field);}}if (typeof sLong != 'string') {sLong = sLong ? sLong.toString() : '0';}var divRem = (0, _Utils.bigStringInt)(sLong).divideAndRemainder((0, _Utils.bigint)(0x100000000));this.writeInt((0, _Utils.intToUint)(divRem[1].intValue()), (field || '') + ':long[low]');this.writeInt((0, _Utils.intToUint)(divRem[0].intValue()), (field || '') + ':long[high]');};TLSerialization.prototype.storeDouble = function (f, field) {var buffer = new ArrayBuffer(8);var intView = new Int32Array(buffer);var doubleView = new Float64Array(buffer);doubleView[0] = f;this.writeInt(intView[0], (field || '') + ':double[low]');this.writeInt(intView[1], (field || '') + ':double[high]');};TLSerialization.prototype.storeString = function (s, field) {//LogService.logDebug(`[TLSerialization] storeString() ${s} ${(field || '') + ':string'}`)
    if (s === undefined) {s = '';}var sUTF8 = unescape(encodeURIComponent(s));this.checkLength(sUTF8.length + 8);var len = sUTF8.length;if (len <= 253) {this.byteView[this.offset++] = len;} else {this.byteView[this.offset++] = 254;this.byteView[this.offset++] = len & 0xFF;this.byteView[this.offset++] = (len & 0xFF00) >> 8;this.byteView[this.offset++] = (len & 0xFF0000) >> 16;}for (var i = 0; i < len; i++) {this.byteView[this.offset++] = sUTF8.charCodeAt(i);} // Padding
    while (this.offset % 4) {this.byteView[this.offset++] = 0;}};TLSerialization.prototype.storeBytes = function (bytes, field) {if (bytes instanceof ArrayBuffer) {bytes = new Uint8Array(bytes);} else if (bytes && !bytes.name && bytes[0] !== undefined) {// serialized and deserialized json  uintarray
        var a = [];var i = 0;while (bytes[i] || bytes[i] === 0) {a.push(bytes[i]);i++;}bytes = new Uint8Array(a);} else if (bytes === undefined) {bytes = [];} //LogService.logDebug(`[TLSerialization] storeBytes() ${bytesToHex(bytes)} ${(field || '') + ':bytes'}`)
    var len = bytes.byteLength || bytes.length;this.checkLength(len + 8);if (len <= 253) {this.byteView[this.offset++] = len;} else {this.byteView[this.offset++] = 254;this.byteView[this.offset++] = len & 0xFF;this.byteView[this.offset++] = (len & 0xFF00) >> 8;this.byteView[this.offset++] = (len & 0xFF0000) >> 16;}this.byteView.set(bytes, this.offset);this.offset += len; // Padding
    while (this.offset % 4) {this.byteView[this.offset++] = 0;}};TLSerialization.prototype.storeIntBytes = function (bytes, bits, field) {if (bytes instanceof ArrayBuffer) {bytes = new Uint8Array(bytes);}var len = bytes.length;if (bits % 32 || len * 8 != bits) {throw new Error('Invalid bits: ' + bits + ', ' + bytes.length);} //LogService.logDebug(`[TLSerialization] storeIntBytes() ${bytesToHex(bytes)} ${(field || '') + ':int' + bits}`)
    this.checkLength(len);this.byteView.set(bytes, this.offset);this.offset += len;};TLSerialization.prototype.storeRawBytes = function (bytes, field) {if (bytes instanceof ArrayBuffer) {bytes = new Uint8Array(bytes);}var len = bytes.length; //LogService.logDebug(`[TLSerialization] storeRawBytes() ${bytesToHex(bytes)} ${(field || '')}`)
    this.checkLength(len);this.byteView.set(bytes, this.offset);this.offset += len;};TLSerialization.prototype.storeMethod = function (methodName, params) {var schema = this.mtproto ? _config2.default.Schema.MTProto : _config2.default.Schema.API;var methodData = false,i;for (i = 0; i < schema.methods.length; i++) {if (schema.methods[i].method == methodName) {methodData = schema.methods[i];break;}}if (!methodData) {throw new Error('No method ' + methodName + ' found');}this.storeInt((0, _Utils.intToUint)(methodData.id), methodName + '[id]');var param, type;var i, condType;var fieldBit;var len = methodData.params.length;for (i = 0; i < len; i++) {param = methodData.params[i];type = param.type;if (type.indexOf('?') !== -1) {condType = type.split('?');fieldBit = condType[0].split('.');if (!(params[fieldBit[0]] & 1 << fieldBit[1])) {continue;}type = condType[1];}this.storeObject(params[param.name], type, methodName + '[' + param.name + ']');}return methodData.type;};TLSerialization.prototype.storeObject = function (obj, type, field) {switch (type) {case '#':case 'int':return this.storeInt(obj, field);case 'long':return this.storeLong(obj, field);case 'int128':return this.storeIntBytes(obj, 128, field);case 'int256':return this.storeIntBytes(obj, 256, field);case 'int512':return this.storeIntBytes(obj, 512, field);case 'string':return this.storeString(obj, field);case 'bytes':return this.storeBytes(obj, field);case 'double':return this.storeDouble(obj, field);case 'Bool':return this.storeBool(obj, field);case 'true':return;}if (Array.isArray(obj)) {if (type.substr(0, 6) == 'Vector') {this.writeInt(0x1cb5c415, field + '[id]');} else if (type.substr(0, 6) != 'vector') {throw new Error('Invalid vector type ' + type);}var itemType = type.substr(7, type.length - 8); // for "Vector<itemType>"
        this.writeInt(obj.length, field + '[count]');for (var i = 0; i < obj.length; i++) {this.storeObject(obj[i], itemType, field + '[' + i + ']');}return true;} else if (type.substr(0, 6).toLowerCase() == 'vector') {throw new Error('Invalid vector object "' + type + '"');}if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {throw new Error('Invalid object for type ' + type);}var schema = this.mtproto ? _config2.default.Schema.MTProto : _config2.default.Schema.API;var predicate = obj['_'];var isBare = false;var constructorData = false,i;if (isBare = type.charAt(0) == '%') {type = type.substr(1);}for (i = 0; i < schema.constructors.length; i++) {if (schema.constructors[i].predicate == predicate) {constructorData = schema.constructors[i];break;}}if (!constructorData) {throw new Error('No predicate ' + predicate + ' found');}if (predicate == type) {isBare = true;}if (!isBare) {this.writeInt((0, _Utils.intToUint)(constructorData.id), field + '[' + predicate + '][id]');}var param, type;var i, condType;var fieldBit;var len = constructorData.params.length;for (i = 0; i < len; i++) {param = constructorData.params[i];type = param.type;if (type.indexOf('?') !== -1) {condType = type.split('?');fieldBit = condType[0].split('.');if (!(obj[fieldBit[0]] & 1 << fieldBit[1])) {continue;}type = condType[1];}this.storeObject(obj[param.name], type, field + '[' + predicate + '][' + param.name + ']');}return constructorData.type;};function TLDeserialization(buffer, options) {options = options || {};this.offset = 0; // in bytes
    this.override = options.override || {};this.buffer = buffer;this.intView = new Uint32Array(this.buffer);this.byteView = new Uint8Array(this.buffer);this.mtproto = options.mtproto || false;return this;}TLDeserialization.prototype.readInt = function (field) {
    if (this.offset >= this.intView.length * 4) {
        throw new Error('Nothing to fetch: ' + field);
    }
    var i = this.intView[this.offset / 4];

    //LogService.logDebug(`[TLSerialization] readInt() ${i.toString(16)} ${i} ${field}`)

    this.offset += 4;

    return i;
};

TLDeserialization.prototype.fetchInt = function (field) {
    return this.readInt((field || '') + ':int');
};

TLDeserialization.prototype.fetchDouble = function (field) {
    var buffer = new ArrayBuffer(8);
    var intView = new Int32Array(buffer);
    var doubleView = new Float64Array(buffer);

    intView[0] = this.readInt((field || '') + ':double[low]'),
    intView[1] = this.readInt((field || '') + ':double[high]');

    return doubleView[0];
};

TLDeserialization.prototype.fetchLong = function (field) {
    var iLow = this.readInt((field || '') + ':long[low]');
    var iHigh = this.readInt((field || '') + ':long[high]');
    var longDec = (0, _Utils.bigint)(iHigh).shiftLeft(32).add((0, _Utils.bigint)(iLow)).toString();

    return longDec;
};

TLDeserialization.prototype.fetchBool = function (field) {
    var i = this.readInt((field || '') + ':bool');
    if (i == 0x997275b5) {
        return true;
    } else if (i == 0xbc799737) {
        return false;
    }

    this.offset -= 4;
    return this.fetchObject('Object', field);
};

TLDeserialization.prototype.fetchString = function (field) {
    var len = this.byteView[this.offset++];

    if (len == 254) {
        var len = this.byteView[this.offset++] |
        this.byteView[this.offset++] << 8 |
        this.byteView[this.offset++] << 16;
    }

    var sUTF8 = '';
    for (var i = 0; i < len; i++) {
        sUTF8 += String.fromCharCode(this.byteView[this.offset++]);
    }

    // Padding
    while (this.offset % 4) {
        this.offset++;
    }

    try {
        var s = decodeURIComponent(escape(sUTF8));
    } catch (e) {
        var s = sUTF8;
    }

    //LogService.logDebug(`[TLSerialization] fetchString() ${s} ${(field || '') + ':string'}`)

    return s;
};

TLDeserialization.prototype.fetchBytes = function (field) {
    var len = this.byteView[this.offset++];

    if (len == 254) {
        len = this.byteView[this.offset++] |
        this.byteView[this.offset++] << 8 |
        this.byteView[this.offset++] << 16;
    }

    var bytes = this.byteView.subarray(this.offset, this.offset + len);
    this.offset += len;

    // Padding
    while (this.offset % 4) {
        this.offset++;
    }

    //LogService.logDebug(`[TLSerialization] fetchBytes() ${bytesToHex(bytes)} ${(field || '') + ':bytes'}`)

    return bytes;
};

TLDeserialization.prototype.fetchIntBytes = function (bits, typed, field) {
    if (bits % 32) {
        throw new Error('Invalid bits: ' + bits);
    }

    var len = bits / 8;
    if (typed) {
        var result = this.byteView.subarray(this.offset, this.offset + len);
        this.offset += len;
        return result;
    }

    var bytes = [];
    for (var i = 0; i < len; i++) {
        bytes.push(this.byteView[this.offset++]);
    }

    //LogService.logDebug(`[TLSerialization] fetchIntBytes() ${bytesToHex(bytes)} ${(field || '') + ':int' + bits}`)

    return bytes;
};

TLDeserialization.prototype.fetchRawBytes = function (len, typed, field) {
    if (len === false) {
        len = this.readInt((field || '') + '_length');
        if (len > this.byteView.byteLength) {
            throw new Error('Invalid raw bytes length: ' + len + ', buffer len: ' + this.byteView.byteLength);
        }
    }

    if (typed) {
        var bytes = new Uint8Array(len);
        bytes.set(this.byteView.subarray(this.offset, this.offset + len));
        this.offset += len;
        return bytes;
    }

    var bytes = [];
    for (var i = 0; i < len; i++) {
        bytes.push(this.byteView[this.offset++]);
    }

    //LogService.logDebug(`[TLSerialization] fetchRawBytes() ${bytesToHex(bytes)} ${(field || '')}`)

    return bytes;
};

TLDeserialization.prototype.fetchObject = function (type, field) {
    switch (type) {
        case '#':
        case 'int':
            return this.fetchInt(field);
        case 'long':
            return this.fetchLong(field);
        case 'int128':
            return this.fetchIntBytes(128, false, field);
        case 'int256':
            return this.fetchIntBytes(256, false, field);
        case 'int512':
            return this.fetchIntBytes(512, false, field);
        case 'string':
            return this.fetchString(field);
        case 'bytes':
            return this.fetchBytes(field);
        case 'double':
            return this.fetchDouble(field);
        case 'Bool':
            return this.fetchBool(field);
        case 'true':
            return true;}


    field = field || type || 'Object';

    if (type.substr(0, 6) == 'Vector' || type.substr(0, 6) == 'vector') {

        if (type.charAt(0) == 'V') {
            var constructor = this.readInt(field + '[id]');
            var constructorCmp = (0, _Utils.uintToInt)(constructor);

            if (constructorCmp == 0x3072cfa1) {// Gzip packed
                var compressed = this.fetchBytes(field + '[packed_string]');
                var buffer = (0, _Utils.gzipUncompress)(compressed);
                var newDeserializer = new TLDeserialization(buffer);

                return newDeserializer.fetchObject(type, field);
            }
            if (constructorCmp != 0x1cb5c415) {
                throw new Error('Invalid vector constructor ' + constructor);
            }
        }
        var len = this.readInt(field + '[count]');
        var result = [];
        if (len > 0) {
            var itemType = type.substr(7, type.length - 8); // for "Vector<itemType>"
            for (var i = 0; i < len; i++) {
                result.push(this.fetchObject(itemType, field + '[' + i + ']'));
            }
        }

        return result;
    }

    var schema = this.mtproto ? _config2.default.Schema.MTProto : _config2.default.Schema.API;

    var predicate = false;
    var constructorData = false;

    if (type.charAt(0) == '%') {
        var checkType = type.substr(1);
        for (var i = 0; i < schema.constructors.length; i++) {
            if (schema.constructors[i].type == checkType) {
                constructorData = schema.constructors[i];
                break;
            }
        }
        if (!constructorData) {
            throw new Error('Constructor not found for type: ' + type);
        }
    } else
    if (type.charAt(0) >= 97 && type.charAt(0) <= 122) {
        for (var i = 0; i < schema.constructors.length; i++) {
            if (schema.constructors[i].predicate == type) {
                constructorData = schema.constructors[i];
                break;
            }
        }
        if (!constructorData) {
            throw new Error('Constructor not found for predicate: ' + type);
        }
    } else {
        var constructor = this.readInt(field + '[id]');
        var constructorCmp = (0, _Utils.uintToInt)(constructor);

        if (constructorCmp == 0x3072cfa1) {// Gzip packed
            var compressed = this.fetchBytes(field + '[packed_string]');
            var buffer = (0, _Utils.gzipUncompress)(Buffer.from(compressed));
            var newDeserializer = new TLDeserialization(buffer);

            return newDeserializer.fetchObject(type, field);
        }

        var index = schema.constructorsIndex;
        if (!index) {
            schema.constructorsIndex = index = {};
            for (var i = 0; i < schema.constructors.length; i++) {
                index[schema.constructors[i].id] = i;
            }
        }
        var i = index[constructorCmp];
        if (i) {
            constructorData = schema.constructors[i];
        }

        var fallback = false;
        if (!constructorData && this.mtproto) {
            var schemaFallback = _config2.default.Schema.API;
            for (i = 0; i < schemaFallback.constructors.length; i++) {
                if (schemaFallback.constructors[i].id == constructorCmp) {
                    constructorData = schemaFallback.constructors[i];

                    delete this.mtproto;
                    fallback = true;
                    break;
                }
            }
        }

        if (!constructorData) {
            throw new Error('MTProto Constructor not found: ' + constructor + ' ' + this.fetchInt() + ' ' + this.fetchInt());
        }
    }


    predicate = constructorData.predicate;

    var result = { '_': predicate };
    var overrideKey = (this.mtproto ? 'mt_' : '') + predicate;
    var self = this;

    if (this.override[overrideKey]) {
        this.override[overrideKey].apply(this, [result, field + '[' + predicate + ']']);
    } else {
        var i, param;
        var type, isCond;
        var condType, fieldBit;
        var value;
        var len = constructorData.params.length;
        for (i = 0; i < len; i++) {
            param = constructorData.params[i];
            type = param.type;
            if (type == '#' && result.pFlags === undefined) {
                result.pFlags = {};
            }
            if (isCond = type.indexOf('?') !== -1) {
                condType = type.split('?');
                fieldBit = condType[0].split('.');
                if (!(result[fieldBit[0]] & 1 << fieldBit[1])) {
                    continue;
                }
                type = condType[1];
            }

            value = self.fetchObject(type, field + '[' + predicate + '][' + param.name + ']');

            if (isCond && type === 'true') {
                result.pFlags[param.name] = value;
            } else {
                result[param.name] = value;
            }
        }
    }

    if (fallback) {
        this.mtproto = true;
    }

    return result;
};

TLDeserialization.prototype.getOffset = function () {
    return this.offset;
};

TLDeserialization.prototype.fetchEnd = function () {
    if (this.offset != this.byteView.length) {
        throw new Error('Fetch end with non-empty buffer');
    }
    return true;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(27).Buffer))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(29)
var ieee754 = __webpack_require__(30)
var isArray = __webpack_require__(31)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ }),
/* 28 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 31 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _cryptoJs = __webpack_require__(12);var CryptoJS = _interopRequireWildcard(_cryptoJs);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}

/**
                                                                                                                                                                                                                                                                                                                                                                     * Abstract base IGE mode.
                                                                                                                                                                                                                                                                                                                                                                     */
var IGE = CryptoJS.mode.IGE = CryptoJS.lib.BlockCipherMode.extend();

/**
                                                                     * IGE encryptor.
                                                                     */
IGE.Encryptor = IGE.extend({
  /**
                              * Processes the data block at offset.
                              *
                              * @param {Array} words The data words to operate on.
                              * @param {number} offset The offset where the block starts.
                              *
                              * @example
                              *
                              *    mode.processBlock(data.words, offset);
                              */
  processBlock: function processBlock(words, offset) {
    // Shortcuts
    var cipher = this._cipher;
    var blockSize = cipher.blockSize;

    if (this._ivp === undefined) {
      this._ivp = this._iv.slice(0, blockSize);
      this._iv2p = this._iv.slice(blockSize, blockSize + blockSize);
    }


    // Remember this block to use with next block
    var nextIv2p = words.slice(offset, offset + blockSize);

    // XOR with previous ciphertext
    xorBlock(words, this._ivp, offset, blockSize);

    // Block cipher
    cipher.encryptBlock(words, offset);

    // XOR with previous plaintext
    xorBlock(words, this._iv2p, offset, blockSize);

    this._ivp = words.slice(offset, offset + blockSize);
    this._iv2p = nextIv2p;
  } });


/**
        * IGE decryptor.
        */
IGE.Decryptor = IGE.extend({
  /**
                              * Processes the data block at offset.
                              *
                              * @param {Array} words The data words to operate on.
                              * @param {number} offset The offset where the block starts.
                              *
                              * @example
                              *
                              *    mode.processBlock(data.words, offset);
                              */
  processBlock: function processBlock(words, offset) {
    // Shortcuts
    var cipher = this._cipher;
    var blockSize = cipher.blockSize;

    if (this._ivp === undefined) {
      this._ivp = this._iv.slice(0, blockSize);
      this._iv2p = this._iv.slice(blockSize, 2 * blockSize);
    }

    // Remember this block to use with next block
    var nextIvp = words.slice(offset, offset + blockSize);

    // XOR with previous ciphertext
    xorBlock(words, this._iv2p, offset, blockSize);

    // Block cipher
    cipher.decryptBlock(words, offset);

    // XOR with previous plaintext
    xorBlock(words, this._ivp, offset, blockSize);

    this._ivp = nextIvp;
    this._iv2p = words.slice(offset, offset + blockSize);
  } });


function xorBlock(words, block, offset, blockSize) {
  for (var i = 0; i < blockSize; i++) {
    words[offset + i] ^= block[i];
  }
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Top level file is just a mixin of submodules & constants


var assign    = __webpack_require__(0).assign;

var deflate   = __webpack_require__(35);
var inflate   = __webpack_require__(38);
var constants = __webpack_require__(17);

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var zlib_deflate = __webpack_require__(36);
var utils        = __webpack_require__(0);
var strings      = __webpack_require__(15);
var msg          = __webpack_require__(9);
var ZStream      = __webpack_require__(16);

var toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH        = 4;

var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overridden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);

  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new ZStream();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    var dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg || msg[deflator.err]; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils   = __webpack_require__(0);
var trees   = __webpack_require__(37);
var adler32 = __webpack_require__(13);
var crc32   = __webpack_require__(14);
var msg     = __webpack_require__(9);

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;

  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
  s.d_buf = 1 * s.lit_bufsize;

  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
        );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    tmpDict = new utils.Buf8(s.w_size);
    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}


exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

/* eslint-disable space-unary-ops */

var utils = __webpack_require__(0);

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var zlib_inflate = __webpack_require__(39);
var utils        = __webpack_require__(0);
var strings      = __webpack_require__(15);
var c            = __webpack_require__(17);
var msg          = __webpack_require__(9);
var ZStream      = __webpack_require__(16);
var GZheader     = __webpack_require__(42);

var toString = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overridden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate(options) {
  if (!(this instanceof Inflate)) return new Inflate(options);

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new ZStream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new GZheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);

  // Setup dictionary
  if (opt.dictionary) {
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) { //In raw mode we need to set the dictionary early
      status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== c.Z_OK) {
        throw new Error(msg[status]);
      }
    }
  }
}

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode;
  var next_out_utf8, tail, utf8str;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status === c.Z_NEED_DICT && dictionary) {
      status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
    }

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): output data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 aligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg || msg[inflator.err]; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils         = __webpack_require__(0);
var adler32       = __webpack_require__(13);
var crc32         = __webpack_require__(14);
var inflate_fast  = __webpack_require__(40);
var inflate_table = __webpack_require__(41);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function zswap32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
      case HEAD:
        if (state.wrap === 0) {
          state.mode = TYPEDO;
          break;
        }
        //=== NEEDBITS(16);
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
          state.check = 0/*crc32(0L, Z_NULL, 0)*/;
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//

          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = FLAGS;
          break;
        }
        state.flags = 0;           /* expect zlib header */
        if (state.head) {
          state.head.done = false;
        }
        if (!(state.wrap & 1) ||   /* check if zlib header allowed */
          (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
          strm.msg = 'incorrect header check';
          state.mode = BAD;
          break;
        }
        if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
        len = (hold & 0x0f)/*BITS(4)*/ + 8;
        if (state.wbits === 0) {
          state.wbits = len;
        }
        else if (len > state.wbits) {
          strm.msg = 'invalid window size';
          state.mode = BAD;
          break;
        }
        state.dmax = 1 << len;
        //Tracev((stderr, "inflate:   zlib header ok\n"));
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = hold & 0x200 ? DICTID : TYPE;
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        break;
      case FLAGS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.flags = hold;
        if ((state.flags & 0xff) !== Z_DEFLATED) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        if (state.flags & 0xe000) {
          strm.msg = 'unknown header flags set';
          state.mode = BAD;
          break;
        }
        if (state.head) {
          state.head.text = ((hold >> 8) & 1);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = TIME;
        /* falls through */
      case TIME:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.time = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC4(state.check, hold)
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          hbuf[2] = (hold >>> 16) & 0xff;
          hbuf[3] = (hold >>> 24) & 0xff;
          state.check = crc32(state.check, hbuf, 4, 0);
          //===
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = OS;
        /* falls through */
      case OS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.xflags = (hold & 0xff);
          state.head.os = (hold >> 8);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = EXLEN;
        /* falls through */
      case EXLEN:
        if (state.flags & 0x0400) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length = hold;
          if (state.head) {
            state.head.extra_len = hold;
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        else if (state.head) {
          state.head.extra = null/*Z_NULL*/;
        }
        state.mode = EXTRA;
        /* falls through */
      case EXTRA:
        if (state.flags & 0x0400) {
          copy = state.length;
          if (copy > have) { copy = have; }
          if (copy) {
            if (state.head) {
              len = state.head.extra_len - state.length;
              if (!state.head.extra) {
                // Use untyped array for more convenient processing later
                state.head.extra = new Array(state.head.extra_len);
              }
              utils.arraySet(
                state.head.extra,
                input,
                next,
                // extra field is limited to 65536 bytes
                // - no need for additional size check
                copy,
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                len
              );
              //zmemcpy(state.head.extra + len, next,
              //        len + copy > state.head.extra_max ?
              //        state.head.extra_max - len : copy);
            }
            if (state.flags & 0x0200) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            state.length -= copy;
          }
          if (state.length) { break inf_leave; }
        }
        state.length = 0;
        state.mode = NAME;
        /* falls through */
      case NAME:
        if (state.flags & 0x0800) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            // TODO: 2 or 1 bytes?
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.name_max*/)) {
              state.head.name += String.fromCharCode(len);
            }
          } while (len && copy < have);

          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.name = null;
        }
        state.length = 0;
        state.mode = COMMENT;
        /* falls through */
      case COMMENT:
        if (state.flags & 0x1000) {
          if (have === 0) { break inf_leave; }
          copy = 0;
          do {
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
                (state.length < 65536 /*state.head.comm_max*/)) {
              state.head.comment += String.fromCharCode(len);
            }
          } while (len && copy < have);
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) { break inf_leave; }
        }
        else if (state.head) {
          state.head.comment = null;
        }
        state.mode = HCRC;
        /* falls through */
      case HCRC:
        if (state.flags & 0x0200) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.check & 0xffff)) {
            strm.msg = 'header crc mismatch';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        if (state.head) {
          state.head.hcrc = ((state.flags >> 9) & 1);
          state.head.done = true;
        }
        strm.adler = state.check = 0;
        state.mode = TYPE;
        break;
      case DICTID:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        strm.adler = state.check = zswap32(hold);
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = DICT;
        /* falls through */
      case DICT:
        if (state.havedict === 0) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          return Z_NEED_DICT;
        }
        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
        state.mode = TYPE;
        /* falls through */
      case TYPE:
        if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case TYPEDO:
        if (state.last) {
          //--- BYTEBITS() ---//
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          state.mode = CHECK;
          break;
        }
        //=== NEEDBITS(3); */
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.last = (hold & 0x01)/*BITS(1)*/;
        //--- DROPBITS(1) ---//
        hold >>>= 1;
        bits -= 1;
        //---//

        switch ((hold & 0x03)/*BITS(2)*/) {
          case 0:                             /* stored block */
            //Tracev((stderr, "inflate:     stored block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = STORED;
            break;
          case 1:                             /* fixed block */
            fixedtables(state);
            //Tracev((stderr, "inflate:     fixed codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = LEN_;             /* decode codes */
            if (flush === Z_TREES) {
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
              break inf_leave;
            }
            break;
          case 2:                             /* dynamic block */
            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
            //        state.last ? " (last)" : ""));
            state.mode = TABLE;
            break;
          case 3:
            strm.msg = 'invalid block type';
            state.mode = BAD;
        }
        //--- DROPBITS(2) ---//
        hold >>>= 2;
        bits -= 2;
        //---//
        break;
      case STORED:
        //--- BYTEBITS() ---// /* go to byte boundary */
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
          strm.msg = 'invalid stored block lengths';
          state.mode = BAD;
          break;
        }
        state.length = hold & 0xffff;
        //Tracev((stderr, "inflate:       stored length %u\n",
        //        state.length));
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = COPY_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case COPY_:
        state.mode = COPY;
        /* falls through */
      case COPY:
        copy = state.length;
        if (copy) {
          if (copy > have) { copy = have; }
          if (copy > left) { copy = left; }
          if (copy === 0) { break inf_leave; }
          //--- zmemcpy(put, next, copy); ---
          utils.arraySet(output, input, next, copy, put);
          //---//
          have -= copy;
          next += copy;
          left -= copy;
          put += copy;
          state.length -= copy;
          break;
        }
        //Tracev((stderr, "inflate:       stored end\n"));
        state.mode = TYPE;
        break;
      case TABLE:
        //=== NEEDBITS(14); */
        while (bits < 14) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
//#ifndef PKZIP_BUG_WORKAROUND
        if (state.nlen > 286 || state.ndist > 30) {
          strm.msg = 'too many length or distance symbols';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracev((stderr, "inflate:       table sizes ok\n"));
        state.have = 0;
        state.mode = LENLENS;
        /* falls through */
      case LENLENS:
        while (state.have < state.ncode) {
          //=== NEEDBITS(3);
          while (bits < 3) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
          //--- DROPBITS(3) ---//
          hold >>>= 3;
          bits -= 3;
          //---//
        }
        while (state.have < 19) {
          state.lens[order[state.have++]] = 0;
        }
        // We have separate tables & no pointers. 2 commented lines below not needed.
        //state.next = state.codes;
        //state.lencode = state.next;
        // Switch to use dynamic table
        state.lencode = state.lendyn;
        state.lenbits = 7;

        opts = { bits: state.lenbits };
        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
        state.lenbits = opts.bits;

        if (ret) {
          strm.msg = 'invalid code lengths set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, "inflate:       code lengths ok\n"));
        state.have = 0;
        state.mode = CODELENS;
        /* falls through */
      case CODELENS:
        while (state.have < state.nlen + state.ndist) {
          for (;;) {
            here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_val < 16) {
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.lens[state.have++] = here_val;
          }
          else {
            if (here_val === 16) {
              //=== NEEDBITS(here.bits + 2);
              n = here_bits + 2;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              if (state.have === 0) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }
              len = state.lens[state.have - 1];
              copy = 3 + (hold & 0x03);//BITS(2);
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
            }
            else if (here_val === 17) {
              //=== NEEDBITS(here.bits + 3);
              n = here_bits + 3;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 3 + (hold & 0x07);//BITS(3);
              //--- DROPBITS(3) ---//
              hold >>>= 3;
              bits -= 3;
              //---//
            }
            else {
              //=== NEEDBITS(here.bits + 7);
              n = here_bits + 7;
              while (bits < n) {
                if (have === 0) { break inf_leave; }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 11 + (hold & 0x7f);//BITS(7);
              //--- DROPBITS(7) ---//
              hold >>>= 7;
              bits -= 7;
              //---//
            }
            if (state.have + copy > state.nlen + state.ndist) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            while (copy--) {
              state.lens[state.have++] = len;
            }
          }
        }

        /* handle error breaks in while */
        if (state.mode === BAD) { break; }

        /* check for end-of-block code (better have one) */
        if (state.lens[256] === 0) {
          strm.msg = 'invalid code -- missing end-of-block';
          state.mode = BAD;
          break;
        }

        /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */
        state.lenbits = 9;

        opts = { bits: state.lenbits };
        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.lenbits = opts.bits;
        // state.lencode = state.next;

        if (ret) {
          strm.msg = 'invalid literal/lengths set';
          state.mode = BAD;
          break;
        }

        state.distbits = 6;
        //state.distcode.copy(state.codes);
        // Switch to use dynamic table
        state.distcode = state.distdyn;
        opts = { bits: state.distbits };
        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.distbits = opts.bits;
        // state.distcode = state.next;

        if (ret) {
          strm.msg = 'invalid distances set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, 'inflate:       codes ok\n'));
        state.mode = LEN_;
        if (flush === Z_TREES) { break inf_leave; }
        /* falls through */
      case LEN_:
        state.mode = LEN;
        /* falls through */
      case LEN:
        if (have >= 6 && left >= 258) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          inflate_fast(strm, _out);
          //--- LOAD() ---
          put = strm.next_out;
          output = strm.output;
          left = strm.avail_out;
          next = strm.next_in;
          input = strm.input;
          have = strm.avail_in;
          hold = state.hold;
          bits = state.bits;
          //---

          if (state.mode === TYPE) {
            state.back = -1;
          }
          break;
        }
        state.back = 0;
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if (here_bits <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_op && (here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.lencode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        state.length = here_val;
        if (here_op === 0) {
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          state.mode = LIT;
          break;
        }
        if (here_op & 32) {
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.back = -1;
          state.mode = TYPE;
          break;
        }
        if (here_op & 64) {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD;
          break;
        }
        state.extra = here_op & 15;
        state.mode = LENEXT;
        /* falls through */
      case LENEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
        //Tracevv((stderr, "inflate:         length %u\n", state.length));
        state.was = state.length;
        state.mode = DIST;
        /* falls through */
      case DIST:
        for (;;) {
          here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if ((here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.distcode[last_val +
                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) { break; }
            //--- PULLBYTE() ---//
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        if (here_op & 64) {
          strm.msg = 'invalid distance code';
          state.mode = BAD;
          break;
        }
        state.offset = here_val;
        state.extra = (here_op) & 15;
        state.mode = DISTEXT;
        /* falls through */
      case DISTEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
//#ifdef INFLATE_STRICT
        if (state.offset > state.dmax) {
          strm.msg = 'invalid distance too far back';
          state.mode = BAD;
          break;
        }
//#endif
        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
        state.mode = MATCH;
        /* falls through */
      case MATCH:
        if (left === 0) { break inf_leave; }
        copy = _out - left;
        if (state.offset > copy) {         /* copy from window */
          copy = state.offset - copy;
          if (copy > state.whave) {
            if (state.sane) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break;
            }
// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
          }
          if (copy > state.wnext) {
            copy -= state.wnext;
            from = state.wsize - copy;
          }
          else {
            from = state.wnext - copy;
          }
          if (copy > state.length) { copy = state.length; }
          from_source = state.window;
        }
        else {                              /* copy from output */
          from_source = output;
          from = put - state.offset;
          copy = state.length;
        }
        if (copy > left) { copy = left; }
        left -= copy;
        state.length -= copy;
        do {
          output[put++] = from_source[from++];
        } while (--copy);
        if (state.length === 0) { state.mode = LEN; }
        break;
      case LIT:
        if (left === 0) { break inf_leave; }
        output[put++] = state.length;
        left--;
        state.mode = LEN;
        break;
      case CHECK:
        if (state.wrap) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            // Use '|' instead of '+' to make sure that result is signed
            hold |= input[next++] << bits;
            bits += 8;
          }
          //===//
          _out -= left;
          strm.total_out += _out;
          state.total += _out;
          if (_out) {
            strm.adler = state.check =
                /*UPDATE(state.check, put - _out, _out);*/
                (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

          }
          _out = left;
          // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
          if ((state.flags ? hold : zswap32(hold)) !== state.check) {
            strm.msg = 'incorrect data check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   check matches trailer\n"));
        }
        state.mode = LENGTH;
        /* falls through */
      case LENGTH:
        if (state.wrap && state.flags) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) { break inf_leave; }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.total & 0xffffffff)) {
            strm.msg = 'incorrect length check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   length matches trailer\n"));
        }
        state.mode = DONE;
        /* falls through */
      case DONE:
        ret = Z_STREAM_END;
        break inf_leave;
      case BAD:
        ret = Z_DATA_ERROR;
        break inf_leave;
      case MEM:
        return Z_MEM_ERROR;
      case SYNC:
        /* falls through */
      default:
        return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var state;
  var dictid;
  var ret;

  /* check state */
  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK;
}

exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defaults,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = __webpack_require__(0);

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.setLastID = exports.generateID = undefined;exports.



































































applyServerTime = applyServerTime;var _Utils = __webpack_require__(2);var _state = __webpack_require__(4);var _Services = __webpack_require__(1);var _leemonBigInt = __webpack_require__(8);var lastMessageID = [0, 0];var lastBigInt = null;var timeOffset = 0;var lastServerBigInt = null;var to = (0, _state.getState)().server_time_offset;if (to) {timeOffset = to;}function generateMessageID() {var timeTicks = (0, _Utils.tsNow)(),timeSec = Math.floor(timeTicks / 1000) + timeOffset,timeMSec = timeTicks % 1000,random = (0, _Utils.nextRandomInt)(0xFFFF);var messageID = [timeSec, timeMSec << 21 | random << 3 | 4];if (lastMessageID[0] > messageID[0] || lastMessageID[0] == messageID[0] && lastMessageID[1] >= messageID[1]) {messageID = [lastMessageID[0], lastMessageID[1] + 4];}var longFrom = (0, _Utils.longFromInts)(messageID[0], messageID[1]);lastBigInt = (0, _leemonBigInt.str2bigInt)(longFrom, 10);lastMessageID = messageID;if (lastServerBigInt && (0, _leemonBigInt.greater)(lastServerBigInt, lastBigInt)) {//18: incorrect two lower order msg_id bits (the server expects client message msg_id to be divisible by 4)
        lastServerBigInt = (0, _leemonBigInt.addInt)(lastServerBigInt, 100000 - (0, _leemonBigInt.modInt)(lastServerBigInt, 4));return (0, _leemonBigInt.bigInt2str)(lastServerBigInt, 10);} else {return longFrom;}}function setLastMessageID(str) {var toSet = (0, _leemonBigInt.str2bigInt)(str, 10);if (lastServerBigInt && (0, _leemonBigInt.greater)(lastServerBigInt, toSet)) {} else {// console.error('setLastMessageID', str);
        lastServerBigInt = toSet;} // console.warn('was', lastBigInt);
    // console.warn('to', toSet);
    // if (greater(toSet, lastBigInt)) {
    //     shiftOffset+=60;
    //     console.warn('was greater');
    // }
    // if (toSet[0] > lastMessageID[0] ||
    //     toSet[0] == lastMessageID[0] && toSet[1] >= lastMessageID[1]) {
    //     console.warn('was greater');
    //     lastMessageID = [toSet[0], toSet[1] + 4]
    // }
}function applyServerTime(serverTime, localTime) {var newTimeOffset = serverTime - Math.floor((localTime || (0, _Utils.tsNow)()) / 1000);var changed = Math.abs(timeOffset - newTimeOffset) > 10;(0, _state.setState)({ server_time_offset: newTimeOffset });lastMessageID = [0, 0];timeOffset = newTimeOffset;return changed;}var generateID = exports.generateID = generateMessageID;var setLastID = exports.setLastID = setLastMessageID;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.





























































































AES = AES;exports.













































































































































































































































ModeOfOperationCTR = ModeOfOperationCTR; // Number of rounds by keysize
var numberOfRounds = { 16: 10, 24: 12, 32: 14 // Round constant words
};var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91]; // S-box and Inverse S-box (S is for Substitution)
var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];var Si = [0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d]; // Transformations for encryption
var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c]; // Transformations for decryption
var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0]; // Transformations for decryption key expansion
var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];function checkInt(value) {return parseInt(value) === value;}function checkInts(arrayish) {if (!checkInt(arrayish.length)) {return false;}for (var i = 0; i < arrayish.length; i++) {if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {return false;}}return true;}function coerceArray(arg, copy) {// ArrayBuffer view
    if (arg.buffer && ArrayBuffer.isView(arg) && arg.name === 'Uint8Array') {if (copy) {if (arg.slice) {arg = arg.slice();} else {arg = Array.prototype.slice.call(arg);}}return arg;} // It's an array; check it is a valid representation of a byte
    if (Array.isArray(arg)) {if (!checkInts(arg)) {throw new Error('Array contains invalid value: ' + arg);}return new Uint8Array(arg);} // Something else, but behaves like an array (maybe a Buffer? Arguments?)
    if (checkInt(arg.length) && checkInts(arg)) {return new Uint8Array(arg);}throw new Error('unsupported array-like object');}function createArray(length) {return new Uint8Array(length);}function convertToInt32(bytes) {var result = [];for (var i = 0; i < bytes.length; i += 4) {result.push(bytes[i] << 24 | bytes[i + 1] << 16 | bytes[i + 2] << 8 | bytes[i + 3]);}return result;}function AES(key) {if (!(this instanceof AES)) {throw Error('AES must be instanitated with `new`');}Object.defineProperty(this, 'key', { value: coerceArray(key, true) });this._prepare();}AES.prototype._prepare = function () {var rounds = numberOfRounds[this.key.length];if (rounds == null) {throw new Error('invalid key size (must be 16, 24 or 32 bytes)');} // encryption round keys
    this._Ke = []; // decryption round keys
    this._Kd = [];for (var i = 0; i <= rounds; i++) {this._Ke.push([0, 0, 0, 0]);this._Kd.push([0, 0, 0, 0]);}var roundKeyCount = (rounds + 1) * 4;var KC = this.key.length / 4; // convert the key into ints
    var tk = convertToInt32(this.key); // copy values into round key arrays
    var index;for (var i = 0; i < KC; i++) {index = i >> 2;this._Ke[index][i % 4] = tk[i];this._Kd[rounds - index][i % 4] = tk[i];} // key expansion (fips-197 section 5.2)
    var rconpointer = 0;var t = KC,tt;while (t < roundKeyCount) {tt = tk[KC - 1];tk[0] ^= S[tt >> 16 & 0xFF] << 24 ^ S[tt >> 8 & 0xFF] << 16 ^ S[tt & 0xFF] << 8 ^ S[tt >> 24 & 0xFF] ^ rcon[rconpointer] << 24;rconpointer += 1; // key expansion (for non-256 bit)
        if (KC != 8) {for (var i = 1; i < KC; i++) {tk[i] ^= tk[i - 1];} // key expansion for 256-bit keys is "slightly different" (fips-197)
        } else {for (var i = 1; i < KC / 2; i++) {tk[i] ^= tk[i - 1];}tt = tk[KC / 2 - 1];tk[KC / 2] ^= S[tt & 0xFF] ^ S[tt >> 8 & 0xFF] << 8 ^ S[tt >> 16 & 0xFF] << 16 ^ S[tt >> 24 & 0xFF] << 24;for (var i = KC / 2 + 1; i < KC; i++) {tk[i] ^= tk[i - 1];}} // copy values into round key arrays
        var i = 0,r,c;while (i < KC && t < roundKeyCount) {r = t >> 2;c = t % 4;this._Ke[r][c] = tk[i];this._Kd[rounds - r][c] = tk[i++];t++;}} // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
    for (var r = 1; r < rounds; r++) {for (var c = 0; c < 4; c++) {tt = this._Kd[r][c];this._Kd[r][c] = U1[tt >> 24 & 0xFF] ^ U2[tt >> 16 & 0xFF] ^ U3[tt >> 8 & 0xFF] ^ U4[tt & 0xFF];}}};AES.prototype.encrypt = function (plaintext) {if (plaintext.length != 16) {throw new Error('invalid plaintext size (must be 16 bytes)');}var rounds = this._Ke.length - 1;var a = [0, 0, 0, 0]; // convert plaintext to (ints ^ key)
    var t = convertToInt32(plaintext);for (var i = 0; i < 4; i++) {t[i] ^= this._Ke[0][i];} // apply round transforms
    for (var r = 1; r < rounds; r++) {for (var i = 0; i < 4; i++) {a[i] = T1[t[i] >> 24 & 0xff] ^ T2[t[(i + 1) % 4] >> 16 & 0xff] ^ T3[t[(i + 2) % 4] >> 8 & 0xff] ^ T4[t[(i + 3) % 4] & 0xff] ^ this._Ke[r][i];}t = a.slice();} // the last round is special
    var result = createArray(16),tt;for (var i = 0; i < 4; i++) {tt = this._Ke[rounds][i];result[4 * i] = (S[t[i] >> 24 & 0xff] ^ tt >> 24) & 0xff;result[4 * i + 1] = (S[t[(i + 1) % 4] >> 16 & 0xff] ^ tt >> 16) & 0xff;result[4 * i + 2] = (S[t[(i + 2) % 4] >> 8 & 0xff] ^ tt >> 8) & 0xff;result[4 * i + 3] = (S[t[(i + 3) % 4] & 0xff] ^ tt) & 0xff;}return result;}; // AES.prototype.decrypt = function(ciphertext) {
//     if (ciphertext.length != 16) {
//         throw new Error('invalid ciphertext size (must be 16 bytes)');
//     }
//     var rounds = this._Kd.length - 1;
//     var a = [0, 0, 0, 0];
//     // convert plaintext to (ints ^ key)
//     var t = convertToInt32(ciphertext);
//     for (var i = 0; i < 4; i++) {
//         t[i] ^= this._Kd[0][i];
//     }
//     // apply round transforms
//     for (var r = 1; r < rounds; r++) {
//         for (var i = 0; i < 4; i++) {
//             a[i] = (T5[(t[ i          ] >> 24) & 0xff] ^
//                     T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
//                     T7[(t[(i + 2) % 4] >>  8) & 0xff] ^
//                     T8[ t[(i + 1) % 4]        & 0xff] ^
//                     this._Kd[r][i]);
//         }
//         t = a.slice();
//     }
//     // the last round is special
//     var result = createArray(16), tt;
//     for (var i = 0; i < 4; i++) {
//         tt = this._Kd[rounds][i];
//         result[4 * i    ] = (Si[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
//         result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
//         result[4 * i + 2] = (Si[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
//         result[4 * i + 3] = (Si[ t[(i + 1) % 4]        & 0xff] ^  tt       ) & 0xff;
//     }
//     return result;
// }
/**
 *  Counter object for CTR common mode of operation
 */var Counter = function Counter(initialValue) {if (!(this instanceof Counter)) {throw Error('Counter must be instanitated with `new`');} // We allow 0, but anything false-ish uses the default 1
    if (initialValue !== 0 && !initialValue) {initialValue = 1;}if (typeof initialValue === 'number') {this._counter = createArray(16);this.setValue(initialValue);} else {this.setBytes(initialValue);}};Counter.prototype.setValue = function (value) {if (typeof value !== 'number' || parseInt(value) != value) {throw new Error('invalid counter value (must be an integer)');}for (var index = 15; index >= 0; --index) {this._counter[index] = value % 256;value = value >> 8;}};Counter.prototype.setBytes = function (bytes) {bytes = coerceArray(bytes, true);if (bytes.length != 16) {throw new Error('invalid counter bytes size (must be 16 bytes)');}this._counter = bytes;};Counter.prototype.increment = function () {for (var i = 15; i >= 0; i--) {if (this._counter[i] === 255) {this._counter[i] = 0;} else {this._counter[i]++;break;}}}; /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  Mode Of Operation - Counter (CTR)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */function ModeOfOperationCTR(key, counter) {if (!(this instanceof ModeOfOperationCTR)) {throw Error('AES must be instanitated with `new`');}this.description = "Counter";this.name = "ctr";if (!(counter instanceof Counter)) {counter = new Counter(counter);}this._counter = counter;this._remainingCounter = null;this._remainingCounterIndex = 16;this._aes = new AES(key);}ModeOfOperationCTR.prototype.encrypt = function (plaintext) {var encrypted = coerceArray(plaintext, true);for (var i = 0; i < encrypted.length; i++) {if (this._remainingCounterIndex === 16) {this._remainingCounter = this._aes.encrypt(this._counter._counter);this._remainingCounterIndex = 0;this._counter.increment();}encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];}return encrypted;}; // Decryption is symetric
ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.mtpInvokeApi = exports.mtpGetNetworker = exports.logOut = exports.init = exports.getNearestDc = exports.inflateObj = exports.setUpdatesCallback = exports.MD5 = exports.SRPGenerator = exports.MtpAuth = undefined;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};var _MtpAuthorizer = __webpack_require__(18);var MtpAuthorizer = _interopRequireWildcard(_MtpAuthorizer);
var _MtpNetworker = __webpack_require__(19);var MtpNetworker = _interopRequireWildcard(_MtpNetworker);
var _state = __webpack_require__(4);
var _Utils = __webpack_require__(2);
var _Services = __webpack_require__(1);
var _SRP = __webpack_require__(46);
var _package = __webpack_require__(47);
var _network = __webpack_require__(10);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}

var isInitialized = false;

var MtpAuth = exports.MtpAuth = MtpAuthorizer;
// console.error(SRP);
var SRPGenerator = exports.SRPGenerator = _SRP.SRP;
var MD5 = exports.MD5 = _Utils.md5;
var setUpdatesCallback = exports.setUpdatesCallback = MtpNetworker.setUpdatesProcessor;

var inflateObj = exports.inflateObj = _Utils.inflate; /// we need gzipUncompress for playing tgs, so lets export it from here

var nearestDCData = null;
var getNearestDc = exports.getNearestDc = function getNearestDc() {
    return nearestDCData;
};

var appId = null;
var appHash = null;

var init = exports.init = function init(options, dumpState, loadState) {var loggingLevel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'verbose';return new Promise(function (resolve, reject) {
        // LogService.init(name, loggingLevel)
        var gNetworker = null;

        appId = options.appId;
        appHash = options.appHash;

        (0, _state.initState)(options, dumpState, loadState).
        then(function () {
            isInitialized = true;

            var state = (0, _state.getState)();
            if (state && state.default_dc_id) {
                options.defaultDC = state.default_dc_id;
            }

            if (!options.keepNotDefaultNetworkers) {
                var updatedNetworkers = [];var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
                    for (var _iterator = state.networkers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var networker = _step.value;
                        if (networker.id == options.defaultDC) {
                            updatedNetworkers.push(networker);
                        }
                    }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}

                state.networkers = updatedNetworkers;
            }

            state.current_dc_id = options.defaultDC;
            state.prev_dc_id = undefined;
            state.default_dc_id = options.defaultDC;

            (0, _state.setState)(state);

            return mtpGetNetworker(options.defaultDC);
        }).
        then(function (networker) {
            // remove all other networkers from state
            gNetworker = networker;
            return networker.wrapApiCall('help.getNearestDc', {}, { dcId: options.defaultDC, noErrorBox: true });

            // isInitialized = true;

            // let initTimeout = setTimeout(()=>{
            //     console.error('no response for init full user');
            //     resolve(null);
            // }, 2000); // if no full user data in 2 sec - log out.

            // mtpInvokeApi('users.getFullUser', {id: { "_": "inputUserSelf" }})
            //     .then((data)=>{
            //         console.error('full user', data);
            //         resolve(data);
            //         clearTimeout(initTimeout);
            //     })
            //     .catch((data)=>{
            //         console.error('no full user', data);
            //         resolve(null);
            //         clearTimeout(initTimeout);
            //     });

        }).
        then(function (nearestDC) {
            // console.warn('nearestDC', nearestDC);
            nearestDCData = nearestDC;

            return mtpInvokeApi('users.getFullUser', { id: { "_": "inputUserSelf" } });
        }).
        then(function (selfUser) {
            console.warn('Self user', selfUser);

            // if (selfUser) {
            //     gNetworker.signedIn = true;
            // }

            resolve(selfUser);
        }).
        catch(function (e) {
            console.error(e);

            // default state set
            isInitialized = true;
            resolve(null);
        });
    });};

var networkers = {};
var networkersPromises = {};
var networkersPromisesResolvers = {};
var networkersPromisesRejecters = {};

var logOut = exports.logOut = function logOut() {
    isInitialized = false;
    networkers = {};
    networkersPromises = {};
    MtpAuthorizer.flushCachedNetworkers();
    (0, _state.flushState)();
};

var mtpGetNetworker = exports.mtpGetNetworker = function mtpGetNetworker(dcId) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return new Promise(function (resolve, reject) {
        dcId = dcId || (0, _state.getState)().current_dc_id;

        if (!isInitialized) {
            reject(new Error('Not initialized!'));
            return;
        }

        if (!dcId) {
            reject(new Error('Please specify dcId'));
            return;
        }

        if (networkers[dcId]) {
            resolve(networkers[dcId]);
            return;
        }

        var networkerDataFromState = (0, _state.getState)().networkers.find(function (nw) {return nw.id == dcId;});
        if (networkerDataFromState) {
            var networker = MtpNetworker.getNetworker(dcId, networkerDataFromState.auth.authKey, networkerDataFromState.auth.serverSalt, options);
            networkers[dcId] = networker;
            resolve(networker);
            // networker.wrapApiCall('users.getFullUser', {id: { "_": "inputUserSelf" }})
            //     .then((data)=>{
            //         networkers[dcId] = networker;
            //         resolve(networker);
            //     })
            //     .catch((data)=>{
            //         // remove networker from state
            //         let state = getState();
            //         let updatedNetworkers = [];
            //         for (let networker of state.networkers) {
            //             if (networker.id != dcId) {
            //                 updatedNetworkers.push(networker);
            //             }
            //         }

            //         state.networkers = updatedNetworkers;
            //         setState(state)
            //             .then(()=>{
            //                 mtpGetNetworker(dcId, options)
            //                     .then((networker)=>{
            //                         resolve(networker);
            //                     })
            //                     .catch((e)=>{
            //                         reject(e);
            //                     });
            //             });
            //     });
            return;
        }

        var wPromise = null;
        if (!networkersPromises[dcId]) {
            networkersPromises[dcId] = new Promise(function (res, rej) {
                networkersPromisesResolvers[dcId] = res;
                networkersPromisesRejecters[dcId] = rej;
            });
            wPromise = Promise.resolve(null);
        } else {
            wPromise = networkersPromises[dcId];
        }

        wPromise.
        then(function (networker) {
            var originalDcId = dcId % 1000;
            if (networker) {
                resolve(networker);
            } else if (dcId > 1000 && networkers[originalDcId]) {
                // media networkers
                var _networker = MtpNetworker.getNetworker(dcId, networkers[originalDcId].authKey, networkers[originalDcId].serverSalt, options);
                networkers[dcId] = _networker;
                (0, _state.setState)({ networkers: [].concat(_toConsumableArray((0, _state.getState)().networkers), [{ id: dcId, auth: { authKey: networkers[originalDcId].authKey, serverSalt: networkers[originalDcId].serverSalt } }]) });
                resolve(_networker);
                networkersPromisesResolvers[dcId](_networker);
                // const state = getState();
                // let defaultNetworker = networkers[state.default_dc_id];
                // if (defaultNetworker && defaultNetworker.signedIn) {
                //     const networker = MtpNetworker.getNetworker(dcId, defaultNetworker.authKey, defaultNetworker.serverSalt, options);

                //     networkers[dcId] = networker;
                //     setState({ networkers: [...getState().networkers, { id: dcId, auth: {authKey: defaultNetworker.authKey, serverSalt: defaultNetworker.serverSalt } }] });
                //     resolve(networker);
                //     networkersPromisesResolvers[dcId](networker);
                // }
            } else {
                MtpAuthorizer.auth(dcId).
                then(function (auth) {
                    var state = (0, _state.getState)();
                    var networker = MtpNetworker.getNetworker(dcId, auth.authKey, auth.serverSalt, options);

                    var defaultNetworker = networkers[state.default_dc_id];

                    if (defaultNetworker && defaultNetworker.signedIn) {
                        // export authorization to new networker
                        if (dcId != state.default_dc_id) {
                            var dcIdToExport = dcId % 1000;


                            mtpInvokeApi('auth.exportAuthorization', { dc_id: dcIdToExport }, { dcId: state.default_dc_id, noErrorBox: true }).
                            then(function (exportedAuth) {
                                return networker.wrapApiCall('auth.importAuthorization', { id: exportedAuth.id, bytes: exportedAuth.bytes }, { dcId: dcId, noErrorBox: true });
                            }).
                            then(function () {
                                networkers[dcId] = networker;
                                (0, _state.setState)({ networkers: [].concat(_toConsumableArray((0, _state.getState)().networkers), [{ id: dcId, auth: auth }]) });
                                resolve(networker);
                                networkersPromisesResolvers[dcId](networker);
                            }).
                            catch(function (e) {
                                reject(e);
                            });
                        } else {
                            /// should never be here
                            throw new Error('should never be here');
                            resolve(defaultNetworker);
                        }
                    } else {
                        // we are probably here because of PHONE_MIGRATE_
                        // flush other networker and keep this one as default
                        // flushSockets();
                        networkers = {};
                        networkers[dcId] = networker;
                        (0, _state.setState)({ networkers: [{ id: dcId, auth: auth }], default_dc_id: dcId });
                        resolve(networker);
                        networkersPromisesResolvers[dcId](networker);
                    }
                    // if (dcId != state.default_dc_id) {
                    //     mtpInvokeApi('auth.exportAuthorization', { dc_id: dcId }, { dcId: state.default_dc_id, noErrorBox: true })
                    //         .then((exportedAuth) => {
                    //             return networker.wrapApiCall('auth.importAuthorization', { id: exportedAuth.id, bytes: exportedAuth.bytes }, { dcId: dcId, noErrorBox: true })
                    //         })
                    //         .then(()=>{
                    //             networkers[dcId] = networker;
                    //             setState({ networkers: [...getState().networkers, { id: dcId, auth: auth }] });
                    //             resolve(networker);
                    //             networkersPromisesResolvers[dcId](networker);
                    //         })
                    //         .catch((e)=>{
                    //             reject(e);
                    //         });
                    // } else {
                    //     console.warn('setting networker to state', auth, dcId);
                    //     networkers[dcId] = networker;
                    //     setState({ networkers: [...getState().networkers, { id: dcId, auth: auth }] });
                    //     resolve(networker);
                    //     networkersPromisesResolvers[dcId](networker);
                    // }
                }).
                catch(function (error) {
                    reject(error);
                    networkersPromisesRejecters[dcId](error);
                });
            }
        }).
        catch(function (error) {
            reject(error);
        });
    });};

// export const signUpUser = (phoneNumber, firstName, lastName, codeInputPromise) => new Promise((resolve, reject) => {
//     if (!isInitialized) {
//         reject(new Error('Not initialized!'))
//         return
//     }

//     const sendCodeCallParams = {
//         flags: 0,
//         allow_flashcall: null,
//         phone_number: phoneNumber,
//         current_number: null,
//         api_id: 2496,
//         api_hash: '8da85b0d5bfe62527e5b244c209159c3'
//     }

//     mtpInvokeApi("auth.sendCode", sendCodeCallParams)
//         .then(res => res.phone_code_hash)
//         .then(phone_code_hash => {
//             return codeInputPromise()
//                 .then((code) => {
//                     return { code, phone_code_hash }
//                 })
//         })
//         .then(({ code, phone_code_hash }) => {
//             const signUpCallParams = {
//                 phone_number: phoneNumber,
//                 phone_code_hash: phone_code_hash,
//                 phone_code: code,
//                 first_name: firstName,
//                 last_name: lastName
//             }

//             return mtpInvokeApi("auth.signUp", signUpCallParams)
//         })
//         .then(resolve)
//         .catch(reject)
// })

// export const signInUser = (phoneNumber, codeInputPromise) => new Promise((resolve, reject) => {
//     if (!isInitialized) {
//         reject(new Error('Not initialized!'))
//         return
//     }

//     const sendCodeCallParams = {
//         sms_type: 5,
//         phone_number: phoneNumber,
//         api_id: 2496,
//         api_hash: '8da85b0d5bfe62527e5b244c209159c3'
//     }

//     mtpInvokeApi("auth.sendCode", sendCodeCallParams)
//         .then(res => res.phone_code_hash)
//         .then(phone_code_hash => {
//             return codeInputPromise()
//                 .then((code) => {
//                     return { code, phone_code_hash }
//                 })
//         })
//         .then(({ code, phone_code_hash }) => {
//             const signInCallParams = {
//                 phone_number: phoneNumber,
//                 phone_code_hash: phone_code_hash,
//                 phone_code: code
//             }

//             return mtpInvokeApi("auth.signIn", signInCallParams)
//         })
//         .then(resolve)
//         .catch(reject)
// })

var mtpInvokeApi = exports.mtpInvokeApi = function mtpInvokeApi(method, params) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};return new Promise(function (resolve, reject) {
        if (!isInitialized) {
            reject(new Error('Not initialized!'));
            return;
        }

        if (!params) {
            params = {};
        }

        params.api_id = appId;
        params.api_hash = appHash;

        //LogService.logVerbose(`[MtpProxy] mtpInvokeApi() ${JSON.stringify(method, 0, 2)} ${JSON.stringify(params, 0, 2)} ${JSON.stringify(options, 0, 2)}`)

        var rejectPromise = function rejectPromise(error) {
            if (!error) {
                error = { type: 'ERROR_EMPTY' };
            } else if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) !== 'object') {
                error = { message: error };
            }

            if (error.code == 406) {
                error.handled = true;
            }

            reject(error);
        };

        var requestPromise = function requestPromise(networker) {
            var dcId = networker.getDcId();
            var prevDcId = (0, _state.getState)().prev_dc_id;
            var valid401Errors = ['AUTH_KEY_UNREGISTERED', 'AUTH_KEY_INVALID', 'AUTH_KEY_PERM_EMPTY'];


            return networker.wrapApiCall(method, params, options).
            then(resolve).
            catch(function (error) {
                console.error(method, params, options);
                console.log(error, dcId, prevDcId);
                //LogService.logError(`[MtpProxy] networker.wrapApiCall() ${new ErrorResponse(error)} ${prevDcId} ${dcId}`)

                if (error.code == 401 && (!prevDcId || dcId == prevDcId)) {
                    rejectPromise(error);
                } else
                if (error.code == 401 && prevDcId && dcId != prevDcId && valid401Errors.indexOf(error.type) != -1) {
                    mtpInvokeApi('auth.exportAuthorization', { dc_id: dcId }, { dcId: prevDcId, noErrorBox: true }).
                    then(function (exportedAuth) {return (
                            mtpInvokeApi('auth.importAuthorization', { id: exportedAuth.id, bytes: exportedAuth.bytes }, { dcId: dcId, noErrorBox: true }));}).

                    then(function () {return mtpInvokeApi(method, params, options);}).
                    then(resolve).
                    catch(rejectPromise);
                } else
                if (error.code == 303) {
                    var newDcID = error.type.match(/^(PHONE_MIGRATE_|NETWORK_MIGRATE_|FILE_MIGRATE_|USER_MIGRATE_)(\d+)/)[2];
                    if (newDcID != dcId) {
                        (0, _state.setState)({ prev_dc_id: dcId, current_dc_id: newDcID });
                        options.dcId = newDcID;
                        // @todo: do not change state on FILE_MIGRAGE???

                        mtpInvokeApi(method, params, options).
                        then(resolve).
                        catch(rejectPromise);
                    }
                } else
                if (!options.rawError && error.code == 420) {
                    var waitTime = error.type.match(/^FLOOD_WAIT_(\d+)/)[1] || 10;
                    if (waitTime > (options.timeout || 60)) {
                        rejectPromise(error);
                        return;
                    }

                    setTimeout(function () {
                        requestPromise(networker);
                    }, waitTime * 1000);
                } else
                if (!options.rawError && (error.code == 500 || error.type == 'MSG_WAIT_FAILED') && error.type != 'NEED_MEMBER_INVALID') {
                    var now = (0, _Utils.tsNow)();
                    if (options.stopTime) {
                        if (now >= options.stopTime) {
                            rejectPromise(error);
                            return;
                        }
                    } else {
                        options.stopTime = now + (options.timeout !== undefined ? options.timeout : 10) * 1000;
                    }
                    options.waitTime = options.waitTime ? Math.min(60, options.waitTime * 1.5) : 1;
                    setTimeout(function () {
                        requestPromise(networker);
                    }, options.waitTime * 1000);
                } else {
                    rejectPromise(error);
                }
            });
        };

        var currrentDcId = options.dcId || (0, _state.getState)().current_dc_id;
        mtpGetNetworker(currrentDcId, options).
        then(requestPromise).
        catch(rejectPromise);
    });};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.


SRP = SRP;var _leemonBigInt = __webpack_require__(8);var _utils = __webpack_require__(7);function SRP(accountPassword) {
	var algo = accountPassword.current_algo;

	this._algo = algo;

	this._salt1 = algo.salt1;
	this._salt2 = algo.salt2;
	this._g = algo.g;
	this._p = algo.p;

	this._srp_B = accountPassword.srp_B;
	this._srp_id = accountPassword.srp_id;
	this._secure_random = accountPassword.secure_random;

	if (!this.goodPrime(this._p, this._g)) {
		throw new Error('Invalid p/g');
	}
};

SRP.prototype.goodPrime = function (prime, g) {
	// const expectedBitLength = 2048 / 8; //  /8 = 256

	if (prime.length != 256) {
		return false;
	}
	if (prime[0] < 128) {// and that 2^2047 < p < 2^2048), means the first bit should be 1
		return false;
	}

	// Since g is always equal to 2, 3, 4, 5, 6 or 7, this is easily done using quadratic reciprocity law,
	// yielding a simple condition on p mod 4g — namely,
	// p mod 8 = 7 for g = 2;
	// p mod 3 = 2 for g = 3;
	// no extra condition for g = 4;
	// p mod 5 = 1 or 4 for g = 5;
	// p mod 24 = 19 or 23 for g = 6;
	// and p mod 7 = 3, 5 or 6 for g = 7.

	var primeB = this.BIGFROMUINTA(prime);

	if (g == 2) {
		if ((0, _leemonBigInt.modInt)(primeB, 8) != 7) {
			return false;
		}
	} else if (g == 3) {
		if ((0, _leemonBigInt.modInt)(primeB, 3) != 2) {
			return false;
		}
	} else if (g == 4) {

	} else if (g == 5) {
		if ([1, 4].indexOf((0, _leemonBigInt.modInt)(primeB, 5)) == -1) {
			return false;
		}
	} else if (g == 6) {
		if ([19, 23].indexOf((0, _leemonBigInt.modInt)(primeB, 24)) == -1) {
			return false;
		}
	} else if (g == 7) {
		if ([3, 5, 6].indexOf((0, _leemonBigInt.modInt)(primeB, 7)) == -1) {
			return false;
		}
	} else {
		return false; // g is something different
	}

	var subprimeB = (0, _leemonBigInt.sub)(primeB, (0, _leemonBigInt.getOne)()); // sub
	(0, _leemonBigInt.rightShift_)(subprimeB, 1); // and div by 2

	var smallPrimes = [3, 5];var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

		for (var _iterator = smallPrimes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var smallPrime = _step.value;
			if (!(0, _leemonBigInt.millerRabinInt)(primeB, smallPrime)) {
				return false;
			}
			if (!(0, _leemonBigInt.millerRabinInt)(subprimeB, smallPrime)) {
				return false;
			}
		}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}

	return true;
};

SRP.prototype.randomA = function () {
	var a = new Uint8Array(256);
	// console.error('secure_random', this._secure_random);
	a.set(this._secure_random);
	// for (let i = 0; i < a.length; i++) {
	// 	if (Math.random() < 0.5) {
	// 		a[i] = Math.floor(Math.random()*250);
	// 	}
	// }

	// console.error('secure_random', a);
	return a;
};

SRP.prototype.getInputCheckPasswordSRP = function (thePassword) {var _this = this;
	return new Promise(function (res, rej) {
		_this.generate(thePassword).
		then(function (m1) {
			res({
				"_": "inputCheckPasswordSRP",
				srp_id: _this._srp_id,
				A: _this._A_bytes,
				M1: _this._m1 });

		});
	});
};

SRP.prototype.generate = function (thePassword) {var _this2 = this;
	return new Promise(function (res, rej) {

		var _passwordA = new TextEncoder().encode(thePassword);

		// try with mr.slavik python
		//
		var p_bytes = _this2._p;
		var p = _this2.BIGFROMUINTA(p_bytes);

		var g_bytes = _this2.PAD([_this2._g], 256); // 2048 / 8
		var g = (0, _leemonBigInt.str2bigInt)('' + _this2._g, 10); // g is number

		var B_bytes = _this2._srp_B;
		var B = _this2.BIGFROMUINTA(B_bytes);

		// console.log('_passwordA', _passwordA);
		// console.log('this._salt1', this._salt1);
		// console.log('this._salt2', this._salt2);

		// x := PH2(password, salt1, salt2)
		_this2.PH2(_passwordA, _this2._salt1, _this2._salt2).
		then(function (x_bytes) {

			// console.log('x_bytes', x_bytes);


			var x = _this2.BIGFROMUINTA(x_bytes);

			var g_x = (0, _leemonBigInt.powMod)(g, x, p);

			var k_bytes = _this2.H(_this2.CONCAT(p_bytes, g_bytes));
			var k = _this2.BIGFROMUINTA(k_bytes);

			var kg_x = (0, _leemonBigInt.multMod)(k, g_x, p);

			// console.log('kg_x', this.UINTAFROMBIG(kg_x));

			var a = null;
			var A = null;
			var A_bytes = null;
			var u = null;
			var u_bytes = null;
			while (true) {
				_this2._a = _this2.randomA();
				a = _this2.BIGFROMUINTA(_this2._a);
				A = (0, _leemonBigInt.powMod)(g, a, p);
				A_bytes = _this2.UINTAFROMBIG(A);

				_this2._A_bytes = A_bytes;

				u_bytes = _this2.H(_this2.CONCAT(A_bytes, B_bytes));
				u = _this2.BIGFROMUINTA(u_bytes);

				if (!(0, _leemonBigInt.negative)(u)) {
					break;
				}
			}

			while (!(0, _leemonBigInt.greater)(B, kg_x)) {
				B = (0, _leemonBigInt.add)(B, p);
			}

			var g_b = (0, _leemonBigInt.mod)((0, _leemonBigInt.sub)(B, kg_x), p);
			if ((0, _leemonBigInt.negative)(g_b)) {
				g_b = (0, _leemonBigInt.add)(g_b, p);
			}
			var ux = (0, _leemonBigInt.mult)(u, x);

			var a_ux = (0, _leemonBigInt.add)(a, ux);

			// console.log('a_ux', this.UINTAFROMBIG(a_ux));


			var S = (0, _leemonBigInt.powMod)(g_b, a_ux, p);
			var S_bytes = _this2.UINTAFROMBIG(S);

			// console.log('S_bytes', S_bytes);

			var K_bytes = _this2.H(S_bytes);

			var h1 = _this2.H(p_bytes);
			var h2 = _this2.H(g_bytes);

			var p1 = _this2.XOR(h1, h2);
			var p2 = _this2.H(_this2._salt1);
			var p3 = _this2.H(_this2._salt2);
			var p4 = A_bytes;
			var p5 = B_bytes;
			var p6 = K_bytes;


			// console.log(p1);
			// console.log(p2);
			// console.log(p3);
			// console.log(p4);
			// console.log(p5);
			// console.log(p6);

			var concated = new Uint8Array(p1.length + p2.length + p3.length + p4.length + p5.length + p6.length);
			concated.set(p1, 0);
			concated.set(p2, p1.length);
			concated.set(p3, p1.length + p2.length);
			concated.set(p4, p1.length + p2.length + p3.length);
			concated.set(p5, p1.length + p2.length + p3.length + p4.length);
			concated.set(p6, p1.length + p2.length + p3.length + p4.length + p5.length);

			_this2._m1 = _this2.H(concated);

			res(_this2._m1);
		});

	});
};

SRP.prototype.XOR = function (uint8Array1, uint8Array2) {
	var ret = new Uint8Array(uint8Array2);
	for (var i = 0; i < uint8Array1.length; i++) {
		ret[i] = uint8Array1[i] ^ uint8Array2[i];
	}

	return ret;
};

SRP.prototype.PAD = function (bytes, length) {
	var padded = new Uint8Array(length);
	padded.set(bytes, length - bytes.length);

	return padded;
};

SRP.prototype.CONCAT = function (a1, a2) {
	var concated = new Uint8Array(a1.length + a2.length);
	concated.set(a1);
	concated.set(a2, a1.length);
	return concated;
};

SRP.prototype.bytesFromHex = function (hexString) {
	var len = hexString.length,
	i;
	var start = 0;
	var bytes = [];

	if (hexString.length % 2) {
		bytes.push(parseInt(hexString.charAt(0), 16));
		start++;
	}

	for (i = start; i < len; i += 2) {
		bytes.push(parseInt(hexString.substr(i, 2), 16));
	}

	return new Uint8Array(bytes);
};

SRP.prototype.bytesToHex = function (uint8Array) {
	var arr = [];
	for (var i = 0; i < uint8Array.length; i++) {
		arr.push((uint8Array[i] < 16 ? "0" : "") + (uint8Array[i] || 0).toString(16));
	}
	return arr.join("");
};

SRP.prototype.BIGFROMUINTA = function (uint8Array) {
	return (0, _leemonBigInt.str2bigInt)(this.bytesToHex(uint8Array), 16, Math.ceil(64 / (0, _leemonBigInt.getBpe)()) + 1);
};

SRP.prototype.UINTAFROMBIG = function (big) {
	var str = (0, _leemonBigInt.bigInt2str)(big, 16);
	return this.bytesFromHex(str);
};

// H(data) := sha256(data)
SRP.prototype.H = function (data) {
	// let digest = await window.crypto.subtle.digest('SHA-256', data);
	// console.warn(data, digest, new Uint8Array(digest));
	return new Uint8Array((0, _utils.sha256HashSync)(data));
	// return new Uint8Array(window.crypto.subtle.digest('SHA-256', data));
};

// SH(data, salt) := H(salt | data | salt)
SRP.prototype.SH = function (data, salt) {
	var concated = new Uint8Array(salt.length + data.length + salt.length);
	concated.set(salt);
	concated.set(data, salt.length);
	concated.set(salt, salt.length + data.length);

	return this.H(concated);
};

// PH1(password, salt1, salt2) := SH(SH(password, salt1), salt2)
SRP.prototype.PH1 = function (password, salt1, salt2) {
	var h1 = this.SH(password, salt1);
	return this.SH(h1, salt2);
};

// PH2(password, salt1, salt2) := SH(pbkdf2(sha512, PH1(password, salt1, salt2), salt1, 100000), salt2)
SRP.prototype.PH2 = function (password, salt1, salt2) {var _this3 = this;
	return new Promise(function (res, rej) {
		var ph1 = _this3.PH1(password, salt1, salt2);
		// console.log('ph1', ph1);
		_this3.PBKDF2(ph1, salt1, 100000).
		then(function (pbk) {
			// console.log('pbk', pbk);
			res(_this3.SH(pbk, salt2));
		}).
		catch(function (e) {
			rej(e);
		});
	});
};

SRP.prototype.PBKDF2 = function (hash, salt, iterations) {
	// console.log('hash', hash);
	return new Promise(function (res, rej) {
		crypto.subtle.importKey("raw", hash, { name: "PBKDF2" }, false, ["deriveBits", "deriveKey"]).
		then(function (importKey) {
			return crypto.subtle.deriveKey(
			{ name: "PBKDF2", hash: "SHA-512", iterations: 100000, salt: salt },
			importKey,
			{ name: "HMAC", hash: "SHA-256" },
			true,
			["sign"]);

		}).
		then(function (deriveKey) {
			return crypto.subtle.exportKey("raw", deriveKey);
		}).
		then(function (exportKey) {
			res(new Uint8Array(exportKey));
		}).
		catch(function (e) {
			rej(e);
		});
	});
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = {"name":"teleweb","version":"0.2.1","description":"JavaScript library to work with Telegram API in browser","homepage":"https://github.com/jeka-kiselyov/teleweb","main":"lib/telejs.min.js","scripts":{"build":"webpack --env dev && webpack --env build","dev":"webpack --progress --colors --watch --env dev","prepublish":"webpack --env dev && webpack --env build"},"keywords":["telegram","api","srp"],"author":"Jeka Kiselyov (https://github.com/jeka-kiselyov)","babel":{"presets":["env"],"plugins":["babel-plugin-add-module-exports","transform-object-rest-spread"],"sourceMaps":true,"retainLines":true},"license":"MIT","devDependencies":{"babel-cli":"^6.26.0","babel-core":"^6.26.0","babel-eslint":"^8.0.3","babel-loader":"^7.1.2","babel-plugin-add-module-exports":"^0.2.1","babel-plugin-transform-object-rest-spread":"^6.26.0","babel-preset-env":"^1.6.1","chai":"^4.1.2","eslint":"^4.13.1","eslint-loader":"^1.9.0","mocha":"^4.0.1","webpack":"^3.10.0","yargs":"^10.0.3"},"dependencies":{"axios":"^0.17.1","crypto-js":"^3.1.9-1","rusha":"^0.8.9"}}

/***/ })
/******/ ]);
});
//# sourceMappingURL=telejs.js.map