(function(){/*
 *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
*****************************************************************************/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);$jscomp.checkEs6ConformanceViaProxy=function(){try{var b={},e=Object.create(new $jscomp.global.Proxy(b,{get:function(g,a,f){return g==b&&"q"==a&&f==e}}));return!0===e.q}catch(g){return!1}};$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS=!1;
$jscomp.ES6_CONFORMANCE=$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS&&$jscomp.checkEs6ConformanceViaProxy();$jscomp.arrayIteratorImpl=function(b){var e=0;return function(){return e<b.length?{done:!1,value:b[e++]}:{done:!0}}};$jscomp.arrayIterator=function(b){return{next:$jscomp.arrayIteratorImpl(b)}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,e,g){b!=Array.prototype&&b!=Object.prototype&&(b[e]=g.value)};$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var b=0;return function(e){return $jscomp.SYMBOL_PREFIX+(e||"")+b++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.iterator;b||(b=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[b]&&$jscomp.defineProperty(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.asyncIterator;b||(b=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(b){$jscomp.initSymbolIterator();b={next:b};b[$jscomp.global.Symbol.iterator]=function(){return this};return b};
$jscomp.makeIterator=function(b){var e="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];return e?e.call(b):$jscomp.arrayIterator(b)};$jscomp.owns=function(b,e){return Object.prototype.hasOwnProperty.call(b,e)};$jscomp.polyfill=function(b,e,g,a){if(e){g=$jscomp.global;b=b.split(".");for(a=0;a<b.length-1;a++){var f=b[a];f in g||(g[f]={});g=g[f]}b=b[b.length-1];a=g[b];e=e(a);e!=a&&null!=e&&$jscomp.defineProperty(g,b,{configurable:!0,writable:!0,value:e})}};
$jscomp.polyfill("WeakMap",function(b){function e(){if(!b||!Object.seal)return!1;try{var c=Object.seal({}),d=Object.seal({}),a=new b([[c,2],[d,3]]);if(2!=a.get(c)||3!=a.get(d))return!1;a.delete(c);a.set(d,4);return!a.has(c)&&4==a.get(d)}catch(v){return!1}}function g(){}function a(c){if(!$jscomp.owns(c,h)){var a=new g;$jscomp.defineProperty(c,h,{value:a})}}function f(c){var d=Object[c];d&&(Object[c]=function(c){if(c instanceof g)return c;a(c);return d(c)})}if($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS){if(b&&
$jscomp.ES6_CONFORMANCE)return b}else if(e())return b;var h="$jscomp_hidden_"+Math.random();f("freeze");f("preventExtensions");f("seal");var k=0,d=function(c){this.id_=(k+=Math.random()+1).toString();if(c){c=$jscomp.makeIterator(c);for(var d;!(d=c.next()).done;)d=d.value,this.set(d[0],d[1])}};d.prototype.set=function(c,d){a(c);if(!$jscomp.owns(c,h))throw Error("WeakMap key fail: "+c);c[h][this.id_]=d;return this};d.prototype.get=function(c){return $jscomp.owns(c,h)?c[h][this.id_]:void 0};d.prototype.has=
function(c){return $jscomp.owns(c,h)&&$jscomp.owns(c[h],this.id_)};d.prototype.delete=function(c){return $jscomp.owns(c,h)&&$jscomp.owns(c[h],this.id_)?delete c[h][this.id_]:!1};return d},"es6","es3");$jscomp.MapEntry=function(){};
$jscomp.polyfill("Map",function(b){function e(){if($jscomp.ASSUME_NO_NATIVE_MAP||!b||"function"!=typeof b||!b.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new b($jscomp.makeIterator([[c,"s"]]));if("s"!=d.get(c)||1!=d.size||d.get({x:4})||d.set({x:4},"t")!=d||2!=d.size)return!1;var a=d.entries(),f=a.next();if(f.done||f.value[0]!=c||"s"!=f.value[1])return!1;f=a.next();return f.done||4!=f.value[0].x||"t"!=f.value[1]||!a.next().done?!1:!0}catch(q){return!1}}
if($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS){if(b&&$jscomp.ES6_CONFORMANCE)return b}else if(e())return b;$jscomp.initSymbolIterator();var g=new WeakMap,a=function(c){this.data_={};this.head_=k();this.size=0;if(c){c=$jscomp.makeIterator(c);for(var d;!(d=c.next()).done;)d=d.value,this.set(d[0],d[1])}};a.prototype.set=function(c,d){c=0===c?0:c;var a=f(this,c);a.list||(a.list=this.data_[a.id]=[]);a.entry?a.entry.value=d:(a.entry={next:this.head_,previous:this.head_.previous,head:this.head_,key:c,
value:d},a.list.push(a.entry),this.head_.previous.next=a.entry,this.head_.previous=a.entry,this.size++);return this};a.prototype.delete=function(c){c=f(this,c);return c.entry&&c.list?(c.list.splice(c.index,1),c.list.length||delete this.data_[c.id],c.entry.previous.next=c.entry.next,c.entry.next.previous=c.entry.previous,c.entry.head=null,this.size--,!0):!1};a.prototype.clear=function(){this.data_={};this.head_=this.head_.previous=k();this.size=0};a.prototype.has=function(c){return!!f(this,c).entry};
a.prototype.get=function(c){return(c=f(this,c).entry)&&c.value};a.prototype.entries=function(){return h(this,function(c){return[c.key,c.value]})};a.prototype.keys=function(){return h(this,function(c){return c.key})};a.prototype.values=function(){return h(this,function(c){return c.value})};a.prototype.forEach=function(c,d){for(var a=this.entries(),f;!(f=a.next()).done;)f=f.value,c.call(d,f[1],f[0],this)};a.prototype[Symbol.iterator]=a.prototype.entries;var f=function(c,a){var f=a&&typeof a;"object"==
f||"function"==f?g.has(a)?f=g.get(a):(f=""+ ++d,g.set(a,f)):f="p_"+a;var b=c.data_[f];if(b&&$jscomp.owns(c.data_,f))for(c=0;c<b.length;c++){var e=b[c];if(a!==a&&e.key!==e.key||a===e.key)return{id:f,list:b,index:c,entry:e}}return{id:f,list:b,index:-1,entry:void 0}},h=function(c,d){var a=c.head_;return $jscomp.iteratorPrototype(function(){if(a){for(;a.head!=c.head_;)a=a.previous;for(;a.next!=a.head;)return a=a.next,{done:!1,value:d(a)};a=null}return{done:!0,value:void 0}})},k=function(){var c={};return c.previous=
c.next=c.head=c},d=0;return a},"es6","es3");$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(b){function e(){this.batch_=null}function g(a){return a instanceof f?a:new f(function(d,c){d(a)})}if(b&&!$jscomp.FORCE_POLYFILL_PROMISE)return b;e.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};e.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var a=$jscomp.global.setTimeout;e.prototype.asyncExecuteFunction=function(f){a(f,
0)};e.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=this.batch_;this.batch_=[];for(var d=0;d<a.length;++d){var c=a[d];a[d]=null;try{c()}catch(n){this.asyncThrow_(n)}}}this.batch_=null};e.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var f=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var d=this.createResolveAndReject_();try{a(d.resolve,d.reject)}catch(c){d.reject(c)}};f.prototype.createResolveAndReject_=
function(){function a(a){return function(f){c||(c=!0,a.call(d,f))}}var d=this,c=!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};f.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof f)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var d=null!=a;break a;case "function":d=!0;break a;default:d=!1}d?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};f.prototype.resolveToNonPromiseObj_=function(a){var d=
void 0;try{d=a.then}catch(c){this.reject_(c);return}"function"==typeof d?this.settleSameAsThenable_(d,a):this.fulfill_(a)};f.prototype.reject_=function(a){this.settle_(2,a)};f.prototype.fulfill_=function(a){this.settle_(1,a)};f.prototype.settle_=function(a,d){if(0!=this.state_)throw Error("Cannot settle("+a+", "+d+"): Promise already settled in state"+this.state_);this.state_=a;this.result_=d;this.executeOnSettledCallbacks_()};f.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=
0;a<this.onSettledCallbacks_.length;++a)h.asyncExecute(this.onSettledCallbacks_[a]);this.onSettledCallbacks_=null}};var h=new e;f.prototype.settleSameAsPromise_=function(a){var d=this.createResolveAndReject_();a.callWhenSettled_(d.resolve,d.reject)};f.prototype.settleSameAsThenable_=function(a,d){var c=this.createResolveAndReject_();try{a.call(d,c.resolve,c.reject)}catch(n){c.reject(n)}};f.prototype.then=function(a,d){function c(a,c){return"function"==typeof a?function(c){try{b(a(c))}catch(p){e(p)}}:
c}var b,e,g=new f(function(a,c){b=a;e=c});this.callWhenSettled_(c(a,b),c(d,e));return g};f.prototype.catch=function(a){return this.then(void 0,a)};f.prototype.callWhenSettled_=function(a,d){function c(){switch(f.state_){case 1:a(f.result_);break;case 2:d(f.result_);break;default:throw Error("Unexpected state: "+f.state_);}}var f=this;null==this.onSettledCallbacks_?h.asyncExecute(c):this.onSettledCallbacks_.push(c)};f.resolve=g;f.reject=function(a){return new f(function(d,c){c(a)})};f.race=function(a){return new f(function(d,
c){for(var f=$jscomp.makeIterator(a),b=f.next();!b.done;b=f.next())g(b.value).callWhenSettled_(d,c)})};f.all=function(a){var d=$jscomp.makeIterator(a),c=d.next();return c.done?g([]):new f(function(a,f){function b(c){return function(d){e[c]=d;h--;0==h&&a(e)}}var e=[],h=0;do e.push(void 0),h++,g(c.value).callWhenSettled_(b(e.length-1),f),c=d.next();while(!c.done)})};return f},"es6","es3");
$jscomp.checkStringArgs=function(b,e,g){if(null==b)throw new TypeError("The 'this' value for String.prototype."+g+" must not be null or undefined");if(e instanceof RegExp)throw new TypeError("First argument to String.prototype."+g+" must not be a regular expression");return b+""};
$jscomp.polyfill("String.prototype.endsWith",function(b){return b?b:function(b,g){var a=$jscomp.checkStringArgs(this,b,"endsWith");b+="";void 0===g&&(g=a.length);g=Math.max(0,Math.min(g|0,a.length));for(var f=b.length;0<f&&0<g;)if(a[--g]!=b[--f])return!1;return 0>=f}},"es6","es3");$jscomp.underscoreProtoCanBeSet=function(){var b={a:!0},e={};try{return e.__proto__=b,e.a}catch(g){}return!1};
$jscomp.setPrototypeOf="function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(b,e){b.__proto__=e;if(b.__proto__!==e)throw new TypeError(b+" is not extensible");return b}:null;$jscomp.polyfill("Object.setPrototypeOf",function(b){return b||$jscomp.setPrototypeOf},"es6","es5");
$jscomp.assign="function"==typeof Object.assign?Object.assign:function(b,e){for(var g=1;g<arguments.length;g++){var a=arguments[g];if(a)for(var f in a)$jscomp.owns(a,f)&&(b[f]=a[f])}return b};$jscomp.polyfill("Object.assign",function(b){return b||$jscomp.assign},"es6","es3");
(function(b){function e(a){if(g[a])return g[a].exports;var f=g[a]={i:a,l:!1,exports:{}};b[a].call(f.exports,f,f.exports,e);f.l=!0;return f.exports}var g={};e.m=b;e.c=g;e.d=function(a,f,b){e.o(a,f)||Object.defineProperty(a,f,{enumerable:!0,get:b})};e.r=function(a){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"});Object.defineProperty(a,"__esModule",{value:!0})};e.t=function(a,f){f&1&&(a=e(a));if(f&8||f&4&&"object"===typeof a&&a&&a.__esModule)return a;
var b=Object.create(null);e.r(b);Object.defineProperty(b,"default",{enumerable:!0,value:a});if(f&2&&"string"!=typeof a)for(var g in a)e.d(b,g,function(d){return a[d]}.bind(null,g));return b};e.n=function(a){var f=a&&a.__esModule?function(){return a["default"]}:function(){return a};e.d(f,"a",f);return f};e.o=function(a,f){return Object.prototype.hasOwnProperty.call(a,f)};e.p="/core/office/";return e(e.s=13)})([function(b,e,g){g.d(e,"c",function(){return f});g.d(e,"a",function(){return k});g.d(e,"b",
function(){return h});var a=g(1),f=function(d,c){Object(a.a)("disableLogs")||(c?console.warn(d+": "+c):console.warn(d))},h=function(a,c,b,e){void 0===e&&(e=!1);var d=b.pop();b=b.length?b.join(", ")+" and "+d:d;e?f("'"+c+"' will be deprecated in version "+a+". Please use "+b+" instead."):f("'"+c+"' is deprecated since version "+a+". Please use "+b+" instead.")},k=function(a,c){}},function(b,e,g){g.d(e,"a",function(){return h});g.d(e,"b",function(){return k});var a={},f={flattenedResources:!1,CANVAS_CACHE_SIZE:void 0,
maxPagesBefore:void 0,maxPagesAhead:void 0,disableLogs:!1,wvsQueryParameters:{},_trnDebugMode:!1,_logFiltersEnabled:null},h=function(a){return f[a]},k=function(d,c){var b;f[d]=c;null===(b=a[d])||void 0===b?void 0:b.forEach(function(a){a(c)})}},function(b,e,g){g.d(e,"a",function(){return w});g.d(e,"b",function(){return z});g.d(e,"c",function(){return D});var a=g(7),f=g(0),h=g(4),k=g(3),d="undefined"===typeof window?self:window,c=d.importScripts,n=!1,u=function(a,b){n||(c(d.basePath+"decode.min.js"),
n=!0);a=self.BrotliDecode(Object(k.b)(a));return b?a:Object(k.a)(a)},v=function(c,d){return Object(a.a)(void 0,void 0,Promise,function(){var b;return Object(a.b)(this,function(a){switch(a.label){case 0:return n?[3,2]:[4,Object(h.a)(self.Core.getWorkerPath()+"external/decode.min.js","Failed to download decode.min.js",window)];case 1:a.sent(),n=!0,a.label=2;case 2:return b=self.BrotliDecode(Object(k.b)(c)),[2,d?b:Object(k.a)(b)]}})})};(function(){function a(){this.remainingDataArrays=[]}a.prototype.processRaw=
function(a){return a};a.prototype.processBrotli=function(a){this.remainingDataArrays.push(a);return null};a.prototype.GetNextChunk=function(a){this.decodeFunction||(this.decodeFunction=0===a[0]&&97===a[1]&&115===a[2]&&109===a[3]?this.processRaw:this.processBrotli);return this.decodeFunction(a)};a.prototype.End=function(){if(this.remainingDataArrays.length){for(var a=this.arrays,c=0,d=0;d<a.length;++d)c+=a[d].length;c=new Uint8Array(c);var b=0;for(d=0;d<a.length;++d){var f=a[d];c.set(f,b);b+=f.length}return u(c,
!0)}return null};return a})();var q=!1,r=function(a){q||(c(d.basePath+"pako_inflate.min.js"),q=!0);var b=10;if("string"===typeof a){if(a.charCodeAt(3)&8){for(;0!==a.charCodeAt(b);++b);++b}}else if(a[3]&8){for(;0!==a[b];++b);++b}a=Object(k.b)(a);a=a.subarray(b,a.length-8);return d.pako.inflate(a,{windowBits:-15})},l=function(a,c){return c?a:Object(k.a)(a)},p=function(a){var d=!a.shouldOutputArray,b=new XMLHttpRequest;b.open("GET",a.url,a.isAsync);var e=d&&b.overrideMimeType;b.responseType=e?"text":
"arraybuffer";e&&b.overrideMimeType("text/plain; charset=x-user-defined");b.send();var g=function(){var g=Date.now();var h=e?b.responseText:new Uint8Array(b.response);Object(f.a)("worker","Result length is "+h.length);h.length<a.compressedMaximum?(h=a.decompressFunction(h,a.shouldOutputArray),Object(f.c)("There may be some degradation of performance. Your server has not been configured to serve .gz. and .br. files with the expected Content-Encoding. See http://www.pdftron.com/kb_content_encoding for instructions on how to resolve this."),
c&&Object(f.a)("worker","Decompressed length is "+h.length)):d&&(h=Object(k.a)(h));c&&Object(f.a)("worker",a.url+" Decompression took "+(Date.now()-g));return h};if(a.isAsync)var h=new Promise(function(c,d){b.onload=function(){200===this.status||0===this.status?c(g()):d("Download Failed "+a.url)};b.onerror=function(){d("Network error occurred "+a.url)}});else{if(200===b.status||0===b.status)return g();throw Error("Failed to load "+a.url);}return h},w=function(a){var b=a.lastIndexOf("/");-1===b&&(b=
0);var d=a.slice(b).replace(".",".br.");c||(d.endsWith(".js.mem")?d=d.replace(".js.mem",".mem"):d.endsWith(".js")&&(d=d.concat(".mem")));return a.slice(0,b)+d},y=function(a,c){var b=a.lastIndexOf("/");-1===b&&(b=0);var d=a.slice(b).replace(".",".gz.");c.url=a.slice(0,b)+d;c.decompressFunction=r;return p(c)},m=function(a,b){b.url=w(a);b.decompressFunction=c?u:v;return p(b)},t=function(a,c){a.endsWith(".js.mem")?a=a.slice(0,-4):a.endsWith(".mem")&&(a=a.slice(0,-4)+".js.mem");c.url=a;c.decompressFunction=
l;return p(c)},x=function(a,c,b,d){return a.catch(function(a){Object(f.c)(a);return d(c,b)})},A=function(a,c,b){var d;if(b.isAsync){var e=c[0](a,b);for(d=1;d<c.length;++d)e=x(e,a,b,c[d]);return e}for(d=0;d<c.length;++d)try{return c[d](a,b)}catch(I){Object(f.c)(I.message)}throw Error("");},D=function(a,c,b,d){return A(a,[y,m,t],{compressedMaximum:c,isAsync:b,shouldOutputArray:d})},z=function(a,c,b,d){return A(a,[m,y,t],{compressedMaximum:c,isAsync:b,shouldOutputArray:d})}},function(b,e,g){g.d(e,"b",
function(){return a});g.d(e,"a",function(){return f});var a=function(a){if("string"===typeof a){for(var b=new Uint8Array(a.length),d=a.length,c=0;c<d;c++)b[c]=a.charCodeAt(c);return b}return a},f=function(a){if("string"!==typeof a){for(var b="",d=0,c=a.length,f;d<c;)f=a.subarray(d,d+1024),d+=1024,b+=String.fromCharCode.apply(null,f);return b}return a}},function(b,e,g){function a(a,b,d){return new Promise(function(c){if(!a)return c();var e=d.document.createElement("script");e.type="text/javascript";
e.onload=function(){c()};e.onerror=function(){b&&Object(f.c)(b);c()};e.src=a;d.document.getElementsByTagName("head")[0].appendChild(e)})}g.d(e,"a",function(){return a});var f=g(0)},function(b,e,g){function a(a,c,b){function d(n){g=g||Date.now();return n?(Object(f.a)("load","Try instantiateStreaming"),fetch(Object(h.a)(a)).then(function(a){return WebAssembly.instantiateStreaming(a,c)}).catch(function(c){Object(f.a)("load","instantiateStreaming Failed "+a+" message "+c.message);return d(!1)})):Object(h.b)(a,
b,!0,!0).then(function(a){e=Date.now();Object(f.a)("load","Request took "+(e-g)+" ms");return WebAssembly.instantiate(a,c)})}var e,g;return d(!!WebAssembly.instantiateStreaming).then(function(a){Object(f.a)("load","WASM compilation took "+(Date.now()-(e||g))+" ms");return a})}g.d(e,"a",function(){return a});var f=g(0),h=g(2),k=g(4);g.d(e,"b",function(){return k.a})},function(b,e){e=function(){return this}();try{e=e||(new Function("return this"))()}catch(g){"object"===typeof window&&(e=window)}b.exports=
e},function(b,e,g){function a(a,b,d,c){function f(a){return a instanceof d?a:new d(function(c){c(a)})}return new (d||(d=Promise))(function(d,e){function g(a){try{l(c.next(a))}catch(w){e(w)}}function h(a){try{l(c["throw"](a))}catch(w){e(w)}}function l(a){a.done?d(a.value):f(a.value).then(g,h)}l((c=c.apply(a,b||[])).next())})}function f(a,b){function d(a){return function(b){return c([a,b])}}function c(c){if(e)throw new TypeError("Generator is already executing.");for(;f;)try{if(e=1,g&&(h=c[0]&2?g["return"]:
c[0]?g["throw"]||((h=g["return"])&&h.call(g),0):g.next)&&!(h=h.call(g,c[1])).done)return h;if(g=0,h)c=[c[0]&2,h.value];switch(c[0]){case 0:case 1:h=c;break;case 4:return f.label++,{value:c[1],done:!1};case 5:f.label++;g=c[1];c=[0];continue;case 7:c=f.ops.pop();f.trys.pop();continue;default:if(!(h=f.trys,h=0<h.length&&h[h.length-1])&&(6===c[0]||2===c[0])){f=0;continue}if(3===c[0]&&(!h||c[1]>h[0]&&c[1]<h[3]))f.label=c[1];else if(6===c[0]&&f.label<h[1])f.label=h[1],h=c;else if(h&&f.label<h[2])f.label=
h[2],f.ops.push(c);else{h[2]&&f.ops.pop();f.trys.pop();continue}}c=b.call(a,f)}catch(p){c=[6,p],g=0}finally{e=h=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}var f={label:0,sent:function(){if(h[0]&1)throw h[1];return h[1]},trys:[],ops:[]},e,g,h,k;return k={next:d(0),"throw":d(1),"return":d(2)},"function"===typeof Symbol&&(k[Symbol.iterator]=function(){return this}),k}g.d(e,"a",function(){return a});g.d(e,"b",function(){return f})},function(b,e,g){e.a=function(){ArrayBuffer.prototype.slice||
(ArrayBuffer.prototype.slice=function(a,b){void 0===a&&(a=0);void 0===b&&(b=this.byteLength);a=Math.floor(a);b=Math.floor(b);0>a&&(a+=this.byteLength);0>b&&(b+=this.byteLength);a=Math.min(Math.max(0,a),this.byteLength);b=Math.min(Math.max(0,b),this.byteLength);if(0>=b-a)return new ArrayBuffer(0);var f=new ArrayBuffer(b-a),e=new Uint8Array(f);a=new Uint8Array(this,a,b-a);e.set(a);return f})}},function(b,e,g){g.d(e,"a",function(){return a});g(10);var a=function(a,b){return function(){}}},function(b,
e,g){e.a=function(a){var b={};decodeURIComponent(a.slice(1)).split("&").forEach(function(a){a=a.split("=",2);b[a[0]]=a[1]});return b}},function(b,e,g){g.d(e,"a",function(){return d});var a=g(2),f=g(5),h=g(12),k=function(){function a(a){var c=this;this.promise=a.then(function(a){c.response=a;c.status=200})}a.prototype.addEventListener=function(a,c){this.promise.then(c)};return a}(),d=function(c,b,d){if(Object(h.a)()&&!d){self.Module.instantiateWasm=function(a,d){return Object(f.a)(c+"Wasm.wasm",a,
b["Wasm.wasm"]).then(function(a){d(a.instance)})};if(b.disableObjectURLBlobs){importScripts(c+"Wasm.js");return}d=Object(a.b)(c+"Wasm.js.mem",b["Wasm.js.mem"],!1,!1)}else{if(b.disableObjectURLBlobs){importScripts((self.Module.asmjsPrefix?self.Module.asmjsPrefix:"")+c+".js");return}d=Object(a.b)((self.Module.asmjsPrefix?self.Module.asmjsPrefix:"")+c+".js.mem",b[".js.mem"],!1);var e=Object(a.c)((self.Module.memoryInitializerPrefixURL?self.Module.memoryInitializerPrefixURL:"")+c+".mem",b[".mem"],!0,
!0);self.Module.memoryInitializerRequest=new k(e)}d=new Blob([d],{type:"application/javascript"});importScripts(URL.createObjectURL(d))}},function(b,e,g){g.d(e,"a",function(){return r});g(0);var a="undefined"===typeof window?self:window;b=function(){var a=navigator.userAgent.toLowerCase();return(a=/(msie) ([\w.]+)/.exec(a)||/(trident)(?:.*? rv:([\w.]+)|)/.exec(a))?parseInt(a[2],10):a}();var f=function(){var c=a.navigator.userAgent.match(/OPR/),b=a.navigator.userAgent.match(/Maxthon/),d=a.navigator.userAgent.match(/Edge/);
return a.navigator.userAgent.match(/Chrome\/(.*?) /)&&!c&&!b&&!d}();(function(){if(!f)return null;var c=a.navigator.userAgent.match(/Chrome\/([0-9]+)\./);return c?parseInt(c[1],10):c})();var h=!!navigator.userAgent.match(/Edge/i)||navigator.userAgent.match(/Edg\/(.*?)/)&&a.navigator.userAgent.match(/Chrome\/(.*?) /);(function(){if(!h)return null;var c=a.navigator.userAgent.match(/Edg\/([0-9]+)\./);return c?parseInt(c[1],10):c})();e=/iPad|iPhone|iPod/.test(a.navigator.platform)||"MacIntel"===navigator.platform&&
1<navigator.maxTouchPoints||/iPad|iPhone|iPod/.test(a.navigator.userAgent);var k=function(){var c=a.navigator.userAgent.match(/.*\/([0-9\.]+)\s(Safari|Mobile).*/i);return c?parseFloat(c[1]):c}(),d=/^((?!chrome|android).)*safari/i.test(a.navigator.userAgent)||/^((?!chrome|android).)*$/.test(a.navigator.userAgent)&&e,c=a.navigator.userAgent.match(/Firefox/);(function(){if(!c)return null;var b=a.navigator.userAgent.match(/Firefox\/([0-9]+)\./);return b?parseInt(b[1],10):b})();b||/Android|webOS|Touch|IEMobile|Silk/i.test(navigator.userAgent);
navigator.userAgent.match(/(iPad|iPhone|iPod)/i);a.navigator.userAgent.indexOf("Android");var n=/Mac OS X 10_13_6.*\(KHTML, like Gecko\)$/.test(a.navigator.userAgent),u=a.navigator.userAgent.match(/(iPad|iPhone).+\sOS\s((\d+)(_\d)*)/i)?14<=parseInt(a.navigator.userAgent.match(/(iPad|iPhone).+\sOS\s((\d+)(_\d)*)/i)[3],10):!1,v=!(!self.WebAssembly||!self.WebAssembly.validate),q=-1<a.navigator.userAgent.indexOf("Edge/16")||-1<a.navigator.userAgent.indexOf("MSAppHost"),r=function(){return v&&!q&&!(!u&&
(d&&14>k||n))}},function(b,e,g){b.exports=g(14)},function(b,e,g){g.r(e);g(15);g(20);b=g(8);g(21);Object(b.a)()},function(b,e,g){(function(a,b){function f(a){"@babel/helpers - typeof";return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},f(a)}(function(a){function d(){for(var a=0;a<B.length;a++)B[a][0](B[a][1]);B=[];G=!1}function c(a,c){B.push([a,
c]);G||(G=!0,H(d,0))}function e(a,c){function b(a){q(c,a)}function d(a){l(c,a)}try{a(b,d)}catch(C){d(C)}}function h(a){var c=a.owner,b=c.state_;c=c.data_;var d=a[b];a=a.then;if("function"===typeof d){b=z;try{c=d(c)}catch(C){l(a,C)}}k(a,c)||(b===z&&q(a,c),b===E&&l(a,c))}function k(a,c){var b;try{if(a===c)throw new TypeError("A promises callback cannot return that same promise.");if(c&&("function"===typeof c||"object"===f(c))){var d=c.then;if("function"===typeof d)return d.call(c,function(d){b||(b=
!0,c!==d?q(a,d):r(a,d))},function(c){b||(b=!0,l(a,c))}),!0}}catch(C){return b||l(a,C),!0}return!1}function q(a,c){a!==c&&k(a,c)||r(a,c)}function r(a,b){a.state_===A&&(a.state_=D,a.data_=b,c(w,a))}function l(a,b){a.state_===A&&(a.state_=D,a.data_=b,c(y,a))}function p(a){var c=a.then_;a.then_=void 0;for(a=0;a<c.length;a++)h(c[a])}function w(a){a.state_=z;p(a)}function y(a){a.state_=E;p(a)}function m(a){if("function"!==typeof a)throw new TypeError("Promise constructor takes a function argument");if(!(this instanceof
m))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this.then_=[];e(a,this)}a.createPromiseCapability=function(){var a={};a.promise=new m(function(c,b){a.resolve=c;a.reject=b});return a};var t=a.Promise,x=t&&"resolve"in t&&"reject"in t&&"all"in t&&"race"in t&&function(){var a;new t(function(c){a=c});return"function"===typeof a}();"undefined"!==typeof exports&&exports?(exports.Promise=x?t:m,exports.Polyfill=
m):"function"===typeof define&&g(19)?define(function(){return x?t:m}):x||(a.Promise=m);var A="pending",D="sealed",z="fulfilled",E="rejected",F=function(){},H="undefined"!==typeof b?b:setTimeout,B=[],G;m.prototype={constructor:m,state_:A,then_:null,data_:void 0,then:function(a,b){a={owner:this,then:new this.constructor(F),fulfilled:a,rejected:b};this.state_===z||this.state_===E?c(h,a):this.then_.push(a);return a.then},"catch":function(a){return this.then(null,a)}};m.all=function(a){if("[object Array]"!==
Object.prototype.toString.call(a))throw new TypeError("You must pass an array to Promise.all().");return new this(function(c,b){function d(a){e++;return function(b){f[a]=b;--e||c(f)}}for(var f=[],e=0,g=0,h;g<a.length;g++)(h=a[g])&&"function"===typeof h.then?h.then(d(g),b):f[g]=h;e||c(f)})};m.race=function(a){if("[object Array]"!==Object.prototype.toString.call(a))throw new TypeError("You must pass an array to Promise.race().");return new this(function(c,b){for(var d=0,f;d<a.length;d++)(f=a[d])&&"function"===
typeof f.then?f.then(c,b):c(f)})};m.resolve=function(a){return a&&"object"===f(a)&&a.constructor===this?a:new this(function(c){c(a)})};m.reject=function(a){return new this(function(c,b){b(a)})}})("undefined"!==typeof window?window:"undefined"!==typeof a?a:"undefined"!==typeof self?self:void 0)}).call(this,g(6),g(16).setImmediate)},function(b,e,g){(function(a){function b(a,c){this._id=a;this._clearFn=c}var h="undefined"!==typeof a&&a||"undefined"!==typeof self&&self||window,k=Function.prototype.apply;
e.setTimeout=function(){return new b(k.call(setTimeout,h,arguments),clearTimeout)};e.setInterval=function(){return new b(k.call(setInterval,h,arguments),clearInterval)};e.clearTimeout=e.clearInterval=function(a){a&&a.close()};b.prototype.unref=b.prototype.ref=function(){};b.prototype.close=function(){this._clearFn.call(h,this._id)};e.enroll=function(a,c){clearTimeout(a._idleTimeoutId);a._idleTimeout=c};e.unenroll=function(a){clearTimeout(a._idleTimeoutId);a._idleTimeout=-1};e._unrefActive=e.active=
function(a){clearTimeout(a._idleTimeoutId);var c=a._idleTimeout;0<=c&&(a._idleTimeoutId=setTimeout(function(){a._onTimeout&&a._onTimeout()},c))};g(17);e.setImmediate="undefined"!==typeof self&&self.setImmediate||"undefined"!==typeof a&&a.setImmediate||this&&this.setImmediate;e.clearImmediate="undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof a&&a.clearImmediate||this&&this.clearImmediate}).call(this,g(6))},function(b,e,g){(function(a,b){(function(a,f){function d(a){delete w[a]}function c(a){if(y)setTimeout(c,
0,a);else{var b=w[a];if(b){y=!0;try{var e=b.callback,g=b.args;switch(g.length){case 0:e();break;case 1:e(g[0]);break;case 2:e(g[0],g[1]);break;case 3:e(g[0],g[1],g[2]);break;default:e.apply(f,g)}}finally{d(a),y=!1}}}}function e(){t=function(a){b.nextTick(function(){c(a)})}}function g(){if(a.postMessage&&!a.importScripts){var c=!0,b=a.onmessage;a.onmessage=function(){c=!1};a.postMessage("","*");a.onmessage=b;return c}}function h(){var b="setImmediate$"+Math.random()+"$",d=function(d){d.source===a&&
"string"===typeof d.data&&0===d.data.indexOf(b)&&c(+d.data.slice(b.length))};a.addEventListener?a.addEventListener("message",d,!1):a.attachEvent("onmessage",d);t=function(c){a.postMessage(b+c,"*")}}function k(){var a=new MessageChannel;a.port1.onmessage=function(a){c(a.data)};t=function(c){a.port2.postMessage(c)}}function r(){var a=m.documentElement;t=function(b){var d=m.createElement("script");d.onreadystatechange=function(){c(b);d.onreadystatechange=null;a.removeChild(d);d=null};a.appendChild(d)}}
function l(){t=function(a){setTimeout(c,0,a)}}if(!a.setImmediate){var p=1,w={},y=!1,m=a.document,t,x=Object.getPrototypeOf&&Object.getPrototypeOf(a);x=x&&x.setTimeout?x:a;"[object process]"==={}.toString.call(a.process)?e():g()?h():a.MessageChannel?k():m&&"onreadystatechange"in m.createElement("script")?r():l();x.setImmediate=function(a){"function"!==typeof a&&(a=new Function(""+a));for(var c=Array(arguments.length-1),b=0;b<c.length;b++)c[b]=arguments[b+1];w[p]={callback:a,args:c};t(p);return p++};
x.clearImmediate=d}})("undefined"===typeof self?"undefined"===typeof a?this:a:self)}).call(this,g(6),g(18))},function(b,e){function g(){throw Error("setTimeout has not been defined");}function a(){throw Error("clearTimeout has not been defined");}function f(a){if(u===setTimeout)return setTimeout(a,0);if((u===g||!u)&&setTimeout)return u=setTimeout,setTimeout(a,0);try{return u(a,0)}catch(y){try{return u.call(null,a,0)}catch(m){return u.call(this,a,0)}}}function h(c){if(v===clearTimeout)return clearTimeout(c);
if((v===a||!v)&&clearTimeout)return v=clearTimeout,clearTimeout(c);try{return v(c)}catch(y){try{return v.call(null,c)}catch(m){return v.call(this,c)}}}function k(){r&&l&&(r=!1,l.length?q=l.concat(q):p=-1,q.length&&d())}function d(){if(!r){var a=f(k);r=!0;for(var c=q.length;c;){l=q;for(q=[];++p<c;)l&&l[p].run();p=-1;c=q.length}l=null;r=!1;h(a)}}function c(a,c){this.fun=a;this.array=c}function n(){}b=b.exports={};try{var u="function"===typeof setTimeout?setTimeout:g}catch(w){u=g}try{var v="function"===
typeof clearTimeout?clearTimeout:a}catch(w){v=a}var q=[],r=!1,l,p=-1;b.nextTick=function(a){var b=Array(arguments.length-1);if(1<arguments.length)for(var e=1;e<arguments.length;e++)b[e-1]=arguments[e];q.push(new c(a,b));1!==q.length||r||f(d)};c.prototype.run=function(){this.fun.apply(null,this.array)};b.title="browser";b.browser=!0;b.env={};b.argv=[];b.version="";b.versions={};b.on=n;b.addListener=n;b.once=n;b.off=n;b.removeListener=n;b.removeAllListeners=n;b.emit=n;b.prependListener=n;b.prependOnceListener=
n;b.listeners=function(a){return[]};b.binding=function(a){throw Error("process.binding is not supported");};b.cwd=function(){return"/"};b.chdir=function(a){throw Error("process.chdir is not supported");};b.umask=function(){return 0}},function(b,e){b.exports={}},function(b,e,g){(function(a){"undefined"===typeof a.crypto&&(a.crypto={getRandomValues:function(a){for(var b=0;b<a.length;b++)a[b]=256*Math.random()}})})("undefined"===typeof window?self:window)},function(b,e,g){function a(b){"@babel/helpers - typeof";
return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},a(b)}var f=g(9),h=g(11),k=null;(function(b){function c(a){l||(l=[]);l.push(a)}var d,e,g,q,r=!1,l=[],p=function(){function c(){d=function(){}}function n(b){var c=[];return{resource_array:c,msg:JSON.stringify(b.data,function(b,d){if("object"===a(d)&&(b=null,d instanceof Uint8Array?b=d:d instanceof
ArrayBuffer&&(b=new Uint8Array(d)),b)){d=g(b.length);var e=q(d);e&&(new Uint8Array(Module.HEAPU8.buffer,e,b.length)).set(b);c.push(d);return{__trn_res_id:d}}return d})}}function m(){r=!0;postMessage({type:"abort",data:{error:"Office worker has terminated unexpectedly"}})}function p(a){if(!r)try{var b=n(a);e(b.msg)}catch(F){m(F)}}b.basePath="../";var x=b.officeWorkerPath||"";b.workerBasePath&&(b.basePath=b.workerBasePath);b.basePath=b.externalPath?b.externalPath:b.basePath+"external/";importScripts("".concat(b.basePath,
"Promise.js"));b.ContinueFunc=function(a){d("ContinueFunc called");setTimeout(function(){onmessage({data:{action:"continue"}})},a)};if(b.pdfWorkerPath)var u=b.pdfWorkerPath;if(b.officeAsmPath)var v=b.officeAsmPath;b.Module={memoryInitializerPrefixURL:u,asmjsPrefix:v,onRuntimeInitialized:function(){d||c();var a=Date.now()-k;Object(f.a)("load","time duration from start to ready: ".concat(JSON.stringify(a)));e=function(a){if(null!==a&&void 0!==a&&0!==a&&!r){var b=(a.length<<2)+1,c=Module._malloc(b);
0<stringToUTF8(a,c,b)&&Module._TRN_OnMessage(c)}};g=function(a){return Module._TRN_CreateBufferResource(a)};q=function(a){return Module._TRN_GetResourcePointer(a)};d("OnReady called");onmessage=p;Module._TRN_InitWorker();for(a=0;a<l.length;++a)onmessage(l[a]);l=null},fetchSelf:function(){k=Date.now();Object(h.a)("".concat(x,"WebOfficeWorker"),{"Wasm.wasm":5E6,"Wasm.js.mem":1E5,".js.mem":5E6,".mem":3E6},!!navigator.userAgent.match(/Edge/i)||b.wasmDisabled)},onAbort:m,noExitRuntime:!0}};b.onmessage=
function(a){"init"===a.data.action&&(b.wasmDisabled=!a.data.wasm,b.externalPath=a.data.externalPath,b.officeAsmPath=a.data.officeAsmPath,b.pdfWorkerPath=a.data.pdfWorkerPath,b.onmessage=c,p(),b.Module.fetchSelf())}})("undefined"===typeof window?self:window)}]);}).call(this || window)