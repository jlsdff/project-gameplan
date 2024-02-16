(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[721],{8745:function(e,t,n){"use strict";n.d(t,{$s:function(){return $},BH:function(){return _},G6:function(){return S},L:function(){return h},LL:function(){return D},Pz:function(){return m},Sg:function(){return v},UG:function(){return w},ZB:function(){return function e(t,n){if(!(n instanceof Object))return n;switch(n.constructor){case Date:return new Date(n.getTime());case Object:void 0===t&&(t={});break;case Array:t=[];break;default:return n}for(let r in n)n.hasOwnProperty(r)&&"__proto__"!==r&&(t[r]=e(t[r],n[r]));return t}},ZR:function(){return k},aH:function(){return g},b$:function(){return T},eu:function(){return R},hl:function(){return A},jU:function(){return E},m9:function(){return W},ne:function(){return j},pd:function(){return B},r3:function(){return N},ru:function(){return I},tV:function(){return u},uI:function(){return b},vZ:function(){return function e(t,n){if(t===n)return!0;let r=Object.keys(t),i=Object.keys(n);for(let s of r){if(!i.includes(s))return!1;let r=t[s],a=n[s];if(x(r)&&x(a)){if(!e(r,a))return!1}else if(r!==a)return!1}for(let e of i)if(!r.includes(e))return!1;return!0}},w1:function(){return C},xO:function(){return U},xb:function(){return L},z$:function(){return y},zI:function(){return O},zd:function(){return M}});var r=n(2601);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let i=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:(i<2048?t[n++]=i>>6|192:((64512&i)==55296&&r+1<e.length&&(64512&e.charCodeAt(r+1))==56320?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128):t[n++]=i>>12|224,t[n++]=i>>6&63|128),t[n++]=63&i|128)}return t},s=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){let s=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(s>>10)),t[r++]=String.fromCharCode(56320+(1023&s))}else{let s=e[n++],a=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&a)}}return t.join("")},a={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){let i=e[t],s=t+1<e.length,a=s?e[t+1]:0,o=t+2<e.length,l=o?e[t+2]:0,h=i>>2,u=(3&i)<<4|a>>4,c=(15&a)<<2|l>>6,d=63&l;o||(d=64,s||(c=64)),r.push(n[h],n[u],n[c],n[d])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(i(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):s(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){let i=n[e.charAt(t++)],s=t<e.length?n[e.charAt(t)]:0,a=++t<e.length?n[e.charAt(t)]:64,l=++t<e.length?n[e.charAt(t)]:64;if(++t,null==i||null==s||null==a||null==l)throw new o;let h=i<<2|s>>4;if(r.push(h),64!==a){let e=s<<4&240|a>>2;if(r.push(e),64!==l){let e=a<<6&192|l;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class o extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}let l=function(e){let t=i(e);return a.encodeByteArray(t,!0)},h=function(e){return l(e).replace(/\./g,"")},u=function(e){try{return a.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null},c=()=>/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==n.g)return n.g;throw Error("Unable to locate global object.")})().__FIREBASE_DEFAULTS__,d=()=>{if(void 0===r||void 0===r.env)return;let e=r.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},f=()=>{let e;if("undefined"==typeof document)return;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}let t=e&&u(e[1]);return t&&JSON.parse(t)},p=()=>{try{return c()||d()||f()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},g=()=>{var e;return null===(e=p())||void 0===e?void 0:e.config},m=e=>{var t;return null===(t=p())||void 0===t?void 0:t[`_${e}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v(e,t){if(e.uid)throw Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw Error("mockUserToken must contain 'sub' or 'user_id' field!");let s=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[h(JSON.stringify({alg:"none",type:"JWT"})),h(JSON.stringify(s)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function b(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(y())}function w(){var e;let t=null===(e=p())||void 0===e?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(n.g.process)}catch(e){return!1}}function E(){return"object"==typeof self&&self.self===self}function I(){let e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function T(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function C(){let e=y();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function S(){return!w()&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function A(){try{return"object"==typeof indexedDB}catch(e){return!1}}function R(){return new Promise((e,t)=>{try{let n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})}function O(){return"undefined"!=typeof navigator&&!!navigator.cookieEnabled}class k extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,k.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,D.prototype.create)}}class D{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){let n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?i.replace(P,(e,t)=>{let r=n[t];return null!=r?String(r):`<${t}?>`}):"Error",a=`${this.serviceName}: ${s} (${r}).`;return new k(r,a,n)}}let P=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function L(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function x(e){return null!==e&&"object"==typeof e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(e){let t=[];for(let[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function M(e){let t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){let[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function B(e){let t=e.indexOf("?");if(!t)return"";let n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}function j(e,t){let n=new F(e,t);return n.subscribe.bind(n)}class F{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw Error("Missing Observer.");void 0===(r=!function(e,t){if("object"!=typeof e||null===e)return!1;for(let n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?{next:e,error:t,complete:n}:e).next&&(r.next=H),void 0===r.error&&(r.error=H),void 0===r.complete&&(r.complete=H);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function H(){}function $(e,t=1e3,n=2){let r=t*Math.pow(n,e);return Math.min(144e5,r+Math.round(.5*r*(Math.random()-.5)*2))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(e){return e&&e._delegate?e._delegate:e}},4033:function(e,t,n){e.exports=n(5313)},9366:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var r=n(8745),i=n(5538),s=n(3991),a=n(6914);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o{constructor(e,t){this._delegate=e,this.firebase=t,(0,s._addComponent)(e,new i.wA("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),(0,s.deleteApp)(this._delegate)))}_getService(e,t=s._DEFAULT_ENTRY_NAME){var n;this._delegate.checkDestroyed();let r=this._delegate.container.getProvider(e);return r.isInitialized()||(null===(n=r.getComponent())||void 0===n?void 0:n.instantiationMode)!=="EXPLICIT"||r.initialize(),r.getImmediate({identifier:t})}_removeServiceInstance(e,t=s._DEFAULT_ENTRY_NAME){this._delegate.container.getProvider(e).clearInstance(t)}_addComponent(e){(0,s._addComponent)(this._delegate,e)}_addOrOverwriteComponent(e){(0,s._addOrOverwriteComponent)(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}let l=new r.LL("app-compat","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."}),h=/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e(){let t=/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t={},n={__esModule:!0,initializeApp:function(i,a={}){let o=s.initializeApp(i,a);if((0,r.r3)(t,o.name))return t[o.name];let l=new e(o,n);return t[o.name]=l,l},app:i,registerVersion:s.registerVersion,setLogLevel:s.setLogLevel,onLog:s.onLog,apps:null,SDK_VERSION:s.SDK_VERSION,INTERNAL:{registerComponent:function(t){let a=t.name,o=a.replace("-compat","");if(s._registerComponent(t)&&"PUBLIC"===t.type){let s=(e=i())=>{if("function"!=typeof e[o])throw l.create("invalid-app-argument",{appName:a});return e[o]()};void 0!==t.serviceProps&&(0,r.ZB)(s,t.serviceProps),n[o]=s,e.prototype[o]=function(...e){return this._getService.bind(this,a).apply(this,t.multipleInstances?e:[])}}return"PUBLIC"===t.type?n[o]:null},removeApp:function(e){delete t[e]},useAsService:function(e,t){return"serverAuth"===t?null:t},modularAPIs:s}};function i(e){if(e=e||s._DEFAULT_ENTRY_NAME,!(0,r.r3)(t,e))throw l.create("no-app",{appName:e});return t[e]}return n.default=n,Object.defineProperty(n,"apps",{get:function(){return Object.keys(t).map(e=>t[e])}}),i.App=e,n}(o);return t.INTERNAL=Object.assign(Object.assign({},t.INTERNAL),{createFirebaseNamespace:e,extendNamespace:function(e){(0,r.ZB)(t,e)},createSubscribe:r.ne,ErrorFactory:r.LL,deepExtend:r.ZB}),t}(),u=new a.Yd("@firebase/app-compat");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */if((0,r.jU)()&&void 0!==self.firebase){u.warn(`
    Warning: Firebase is already defined in the global scope. Please make sure
    Firebase library is only loaded once.
  `);let e=self.firebase.SDK_VERSION;e&&e.indexOf("LITE")>=0&&u.warn(`
    Warning: You are trying to load Firebase while using Firebase Performance standalone script.
    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
    `)}let c=h;(0,s.registerVersion)("@firebase/app-compat","0.2.25",void 0)},3991:function(e,t,n){"use strict";let r,i;n.r(t),n.d(t,{FirebaseError:function(){return l.ZR},SDK_VERSION:function(){return B},_DEFAULT_ENTRY_NAME:function(){return S},_addComponent:function(){return k},_addOrOverwriteComponent:function(){return D},_apps:function(){return R},_clearComponents:function(){return x},_components:function(){return O},_getProvider:function(){return N},_registerComponent:function(){return P},_removeServiceInstance:function(){return L},deleteApp:function(){return $},getApp:function(){return F},getApps:function(){return H},initializeApp:function(){return j},onLog:function(){return V},registerVersion:function(){return W},setLogLevel:function(){return z}});var s,a=n(5538),o=n(6914),l=n(8745);let h=(e,t)=>t.some(t=>e instanceof t),u=new WeakMap,c=new WeakMap,d=new WeakMap,f=new WeakMap,p=new WeakMap,g={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return c.get(e);if("objectStoreNames"===t)return e.objectStoreNames||d.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return m(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function m(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(m(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&u.set(t,e)}).catch(()=>{}),p.set(t,e),t}(e);if(f.has(e))return f.get(e);let n="function"==typeof(t=e)?t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(i||(i=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(_(this),e),m(u.get(this))}:function(...e){return m(t.apply(_(this),e))}:function(e,...n){let r=t.call(_(this),e,...n);return d.set(r,e.sort?e.sort():[e]),m(r)}:(t instanceof IDBTransaction&&function(e){if(c.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});c.set(e,t)}(t),h(t,r||(r=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,g):t;return n!==e&&(f.set(e,n),p.set(n,e)),n}let _=e=>p.get(e),v=["get","getKey","getAll","getAllKeys","count"],y=["put","add","delete","clear"],b=new Map;function w(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(b.get(t))return b.get(t);let n=t.replace(/FromIndex$/,""),r=t!==n,i=y.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||v.includes(n)))return;let s=async function(e,...t){let s=this.transaction(e,i?"readwrite":"readonly"),a=s.store;return r&&(a=a.index(t.shift())),(await Promise.all([a[n](...t),i&&s.done]))[0]};return b.set(t,s),s}g={...s=g,get:(e,t,n)=>w(e,t)||s.get(e,t,n),has:(e,t)=>!!w(e,t)||s.has(e,t)};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(!function(e){let t=e.getComponent();return(null==t?void 0:t.type)==="VERSION"}(e))return null;{let t=e.getImmediate();return`${t.library}/${t.version}`}}).filter(e=>e).join(" ")}}let I="@firebase/app",T="0.9.25",C=new o.Yd("@firebase/app"),S="[DEFAULT]",A={[I]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},R=new Map,O=new Map;function k(e,t){try{e.container.addComponent(t)}catch(n){C.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function D(e,t){e.container.addOrOverwriteComponent(t)}function P(e){let t=e.name;if(O.has(t))return C.debug(`There were multiple attempts to register component ${t}.`),!1;for(let n of(O.set(t,e),R.values()))k(n,e);return!0}function N(e,t){let n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function L(e,t,n=S){N(e,t).clearInstance(n)}function x(){O.clear()}let U=new l.LL("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new a.wA("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw U.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let B="10.7.1";function j(e,t={}){let n=e;"object"!=typeof t&&(t={name:t});let r=Object.assign({name:S,automaticDataCollectionEnabled:!1},t),i=r.name;if("string"!=typeof i||!i)throw U.create("bad-app-name",{appName:String(i)});if(n||(n=(0,l.aH)()),!n)throw U.create("no-options");let s=R.get(i);if(s){if((0,l.vZ)(n,s.options)&&(0,l.vZ)(r,s.config))return s;throw U.create("duplicate-app",{appName:i})}let o=new a.H0(i);for(let e of O.values())o.addComponent(e);let h=new M(n,r,o);return R.set(i,h),h}function F(e=S){let t=R.get(e);if(!t&&e===S&&(0,l.aH)())return j();if(!t)throw U.create("no-app",{appName:e});return t}function H(){return Array.from(R.values())}async function $(e){let t=e.name;R.has(t)&&(R.delete(t),await Promise.all(e.container.getProviders().map(e=>e.delete())),e.isDeleted=!0)}function W(e,t,n){var r;let i=null!==(r=A[e])&&void 0!==r?r:e;n&&(i+=`-${n}`);let s=i.match(/\s|\//),o=t.match(/\s|\//);if(s||o){let e=[`Unable to register library "${i}" with version "${t}":`];s&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),C.warn(e.join(" "));return}P(new a.wA(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}function V(e,t){if(null!==e&&"function"!=typeof e)throw U.create("invalid-log-argument");(0,o.Am)(e,t)}function z(e){(0,o.Ub)(e)}let q="firebase-heartbeat-store",G=null;function K(){return G||(G=(function(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){let a=indexedDB.open(e,1),o=m(a);return r&&a.addEventListener("upgradeneeded",e=>{r(m(a.result),e.oldVersion,e.newVersion,m(a.transaction),e)}),n&&a.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),o.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),o})("firebase-heartbeat-database",0,{upgrade:(e,t)=>{0===t&&e.createObjectStore(q)}}).catch(e=>{throw U.create("idb-open",{originalErrorMessage:e.message})})),G}async function X(e){try{let t=await K();return await t.transaction(q).objectStore(q).get(Z(e))}catch(e){if(e instanceof l.ZR)C.warn(e.message);else{let t=U.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});C.warn(t.message)}}}async function J(e,t){try{let n=(await K()).transaction(q,"readwrite"),r=n.objectStore(q);await r.put(t,Z(e)),await n.done}catch(e){if(e instanceof l.ZR)C.warn(e.message);else{let t=U.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});C.warn(t.message)}}}function Z(e){return`${e.name}!${e.options.appId}`}class Y{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new ee(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){var e,t;let n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Q();return(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)==null)?void 0:this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(e=>e.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{let t=new Date(e.date).valueOf();return Date.now()-t<=2592e6}),this._storage.overwrite(this._heartbeatsCache))}async getHeartbeatsHeader(){var e;if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)==null||0===this._heartbeatsCache.heartbeats.length)return"";let t=Q(),{heartbeatsToSend:n,unsentEntries:r}=function(e,t=1024){let n=[],r=e.slice();for(let i of e){let e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),et(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),et(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),i=(0,l.L)(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}}function Q(){return new Date().toISOString().substring(0,10)}class ee{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,l.hl)()&&(0,l.eu)().then(()=>!0).catch(()=>!1)}async read(){if(!await this._canUseIndexedDBPromise)return{heartbeats:[]};{let e=await X(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let n=await this.read();return J(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){let n=await this.read();return J(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function et(e){return(0,l.L)(JSON.stringify({version:2,heartbeats:e})).length}P(new a.wA("platform-logger",e=>new E(e),"PRIVATE")),P(new a.wA("heartbeat",e=>new Y(e),"PRIVATE")),W(I,T,""),W(I,T,"esm2017"),W("fire-js","")},5538:function(e,t,n){"use strict";n.d(t,{H0:function(){return o},wA:function(){return i}});var r=n(8745);class i{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let e=new r.BH;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{let n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(r)return null;throw e}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if("EAGER"===e.instantiationMode)try{this.getOrInitializeService({instanceIdentifier:s})}catch(e){}for(let[e,t]of this.instancesDeferred.entries()){let n=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e=s){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=s){return this.instances.has(e)}getOptions(e=s){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(let[e,t]of this.instancesDeferred.entries())n===this.normalizeInstanceIdentifier(e)&&t.resolve(r);return r}onInit(e,t){var n;let r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);let s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){let n=this.onInitCallbacks.get(t);if(n)for(let r of n)try{r(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:e===s?void 0:e,options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}return n||null}normalizeInstanceIdentifier(e=s){return this.component?this.component.multipleInstances?e:s:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new a(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},6914:function(e,t,n){"use strict";var r,i;n.d(t,{Am:function(){return d},Ub:function(){return c},Yd:function(){return u},in:function(){return r}});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let s=[];(i=r||(r={}))[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT";let a={debug:r.DEBUG,verbose:r.VERBOSE,info:r.INFO,warn:r.WARN,error:r.ERROR,silent:r.SILENT},o=r.INFO,l={[r.DEBUG]:"log",[r.VERBOSE]:"log",[r.INFO]:"info",[r.WARN]:"warn",[r.ERROR]:"error"},h=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=l[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class u{constructor(e){this.name=e,this._logLevel=o,this._logHandler=h,this._userLogHandler=null,s.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in r))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?a[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,r.DEBUG,...e),this._logHandler(this,r.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,r.VERBOSE,...e),this._logHandler(this,r.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,r.INFO,...e),this._logHandler(this,r.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,r.WARN,...e),this._logHandler(this,r.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,r.ERROR,...e),this._logHandler(this,r.ERROR,...e)}}function c(e){s.forEach(t=>{t.setLogLevel(e)})}function d(e,t){for(let n of s){let i=null;t&&t.level&&(i=a[t.level]),null===e?n.userLogHandler=null:n.userLogHandler=(t,n,...s)=>{let a=s.map(e=>{if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}}).filter(e=>e).join(" ");n>=(null!=i?i:t.logLevel)&&e({level:r[n].toLowerCase(),message:a,args:s,type:t.name})}}}},613:function(e,t,n){"use strict";n.d(t,{FJ:function(){return nB},JJ:function(){return nV},UE:function(){return nM},V8:function(){return nz},ii:function(){return nW},jK:function(){return nj},ju:function(){return nH},kN:function(){return n$},tw:function(){return nF},z8:function(){return nq}});var r,i,s,a,o,l="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},h={},u=u||{},c=l||self;function d(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function f(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function p(e,t,n){return e.call.apply(e.bind,arguments)}function g(e,t,n){if(!e)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function m(e,t,n){return(m=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?p:g).apply(null,arguments)}function _(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function v(e,t){function n(){}n.prototype=t.prototype,e.$=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.ac=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}function y(){this.s=this.s,this.o=this.o}y.prototype.s=!1,y.prototype.sa=function(){this.s||(this.s=!0,this.N())},y.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};let b=Array.prototype.indexOf?function(e,t){return Array.prototype.indexOf.call(e,t,void 0)}:function(e,t){if("string"==typeof e)return"string"!=typeof t||1!=t.length?-1:e.indexOf(t,0);for(let n=0;n<e.length;n++)if(n in e&&e[n]===t)return n;return -1};function w(e){let t=e.length;if(0<t){let n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function E(e,t){for(let t=1;t<arguments.length;t++){let n=arguments[t];if(d(n)){let t=e.length||0,r=n.length||0;e.length=t+r;for(let i=0;i<r;i++)e[t+i]=n[i]}else e.push(n)}}function I(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}I.prototype.h=function(){this.defaultPrevented=!0};var T=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{let e=()=>{};c.addEventListener("test",e,t),c.removeEventListener("test",e,t)}catch(e){}return e}();function C(e){return/^[\s\xa0]*$/.test(e)}function S(){var e=c.navigator;return e&&(e=e.userAgent)?e:""}function A(e){return -1!=S().indexOf(e)}function R(e){return R[" "](e),e}R[" "]=function(){};var O=A("Opera"),k=A("Trident")||A("MSIE"),D=A("Edge"),P=D||k,N=A("Gecko")&&!(-1!=S().toLowerCase().indexOf("webkit")&&!A("Edge"))&&!(A("Trident")||A("MSIE"))&&!A("Edge"),L=-1!=S().toLowerCase().indexOf("webkit")&&!A("Edge");function x(){var e=c.document;return e?e.documentMode:void 0}e:{var U,M="",B=(U=S(),N?/rv:([^\);]+)(\)|;)/.exec(U):D?/Edge\/([\d\.]+)/.exec(U):k?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(U):L?/WebKit\/(\S+)/.exec(U):O?/(?:Version)[ \/]?(\S+)/.exec(U):void 0);if(B&&(M=B?B[1]:""),k){var j=x();if(null!=j&&j>parseFloat(M)){i=String(j);break e}}i=M}var F=c.document&&k&&(x()||parseInt(i,10))||void 0;function H(e,t){if(I.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(N){e:{try{R(t.nodeName);var i=!0;break e}catch(e){}i=!1}i||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:$[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&H.$.h.call(this)}}v(H,I);var $={2:"touch",3:"pen",4:"mouse"};H.prototype.h=function(){H.$.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var W="closure_listenable_"+(1e6*Math.random()|0),V=0;function z(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.la=i,this.key=++V,this.fa=this.ia=!1}function q(e){e.fa=!0,e.listener=null,e.proxy=null,e.src=null,e.la=null}function G(e,t,n){for(let r in e)t.call(n,e[r],r,e)}function K(e){let t={};for(let n in e)t[n]=e[n];return t}let X="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function J(e,t){let n,r;for(let t=1;t<arguments.length;t++){for(n in r=arguments[t])e[n]=r[n];for(let t=0;t<X.length;t++)n=X[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function Z(e){this.src=e,this.g={},this.h=0}function Y(e,t){var n=t.type;if(n in e.g){var r,i=e.g[n],s=b(i,t);(r=0<=s)&&Array.prototype.splice.call(i,s,1),r&&(q(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function Q(e,t,n,r){for(var i=0;i<e.length;++i){var s=e[i];if(!s.fa&&s.listener==t&&!!n==s.capture&&s.la==r)return i}return -1}Z.prototype.add=function(e,t,n,r,i){var s=e.toString();(e=this.g[s])||(e=this.g[s]=[],this.h++);var a=Q(e,t,r,i);return -1<a?(t=e[a],n||(t.ia=!1)):((t=new z(t,this.src,s,!!r,i)).ia=n,e.push(t)),t};var ee="closure_lm_"+(1e6*Math.random()|0),et={};function en(e,t,n,r,i,s){if(!t)throw Error("Invalid event type");var a=f(i)?!!i.capture:!!i,o=ea(e);if(o||(e[ee]=o=new Z(e)),(n=o.add(t,n,r,a,s)).proxy)return n;if(r=function e(t){return es.call(e.src,e.listener,t)},n.proxy=r,r.src=e,r.listener=n,e.addEventListener)T||(i=a),void 0===i&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent(ei(t.toString()),r);else if(e.addListener&&e.removeListener)e.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return n}function er(e){if("number"!=typeof e&&e&&!e.fa){var t=e.src;if(t&&t[W])Y(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(ei(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=ea(t))?(Y(n,e),0==n.h&&(n.src=null,t[ee]=null)):q(e)}}}function ei(e){return e in et?et[e]:et[e]="on"+e}function es(e,t){if(e.fa)e=!0;else{t=new H(t,this);var n=e.listener,r=e.la||e.src;e.ia&&er(e),e=n.call(r,t)}return e}function ea(e){return(e=e[ee])instanceof Z?e:null}var eo="__closure_events_fn_"+(1e9*Math.random()>>>0);function el(e){return"function"==typeof e?e:(e[eo]||(e[eo]=function(t){return e.handleEvent(t)}),e[eo])}function eh(){y.call(this),this.i=new Z(this),this.S=this,this.J=null}function eu(e,t){var n,r=e.J;if(r)for(n=[];r;r=r.J)n.push(r);if(e=e.S,r=t.type||t,"string"==typeof t)t=new I(t,e);else if(t instanceof I)t.target=t.target||e;else{var i=t;J(t=new I(r,e),i)}if(i=!0,n)for(var s=n.length-1;0<=s;s--){var a=t.g=n[s];i=ec(a,r,!0,t)&&i}if(i=ec(a=t.g=e,r,!0,t)&&i,i=ec(a,r,!1,t)&&i,n)for(s=0;s<n.length;s++)i=ec(a=t.g=n[s],r,!1,t)&&i}function ec(e,t,n,r){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var i=!0,s=0;s<t.length;++s){var a=t[s];if(a&&!a.fa&&a.capture==n){var o=a.listener,l=a.la||a.src;a.ia&&Y(e.i,a),i=!1!==o.call(l,r)&&i}}return i&&!r.defaultPrevented}v(eh,y),eh.prototype[W]=!0,eh.prototype.removeEventListener=function(e,t,n,r){!function e(t,n,r,i,s){if(Array.isArray(n))for(var a=0;a<n.length;a++)e(t,n[a],r,i,s);else(i=f(i)?!!i.capture:!!i,r=el(r),t&&t[W])?(t=t.i,(n=String(n).toString())in t.g&&-1<(r=Q(a=t.g[n],r,i,s))&&(q(a[r]),Array.prototype.splice.call(a,r,1),0==a.length&&(delete t.g[n],t.h--))):t&&(t=ea(t))&&(n=t.g[n.toString()],t=-1,n&&(t=Q(n,r,i,s)),(r=-1<t?n[t]:null)&&er(r))}(this,e,t,n,r)},eh.prototype.N=function(){if(eh.$.N.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)q(n[r]);delete t.g[e],t.h--}}this.J=null},eh.prototype.O=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},eh.prototype.P=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};var ed=c.JSON.stringify;class ef{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}class ep{constructor(){this.h=this.g=null}add(e,t){let n=eg.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}}var eg=new ef(()=>new em,e=>e.reset());class em{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let e_,ev=!1,ey=new ep,eb=()=>{let e=c.Promise.resolve(void 0);e_=()=>{e.then(ew)}};var ew=()=>{let e;for(var t;e=null,ey.g&&(e=ey.g,ey.g=ey.g.next,ey.g||(ey.h=null),e.next=null),t=e;){try{t.h.call(t.g)}catch(e){!function(e){c.setTimeout(()=>{throw e},0)}(e)}eg.j(t),100>eg.h&&(eg.h++,t.next=eg.g,eg.g=t)}ev=!1};function eE(e,t){eh.call(this),this.h=e||1,this.g=t||c,this.j=m(this.qb,this),this.l=Date.now()}function eI(e){e.ga=!1,e.T&&(e.g.clearTimeout(e.T),e.T=null)}function eT(e,t,n){if("function"==typeof e)n&&(e=m(e,n));else if(e&&"function"==typeof e.handleEvent)e=m(e.handleEvent,e);else throw Error("Invalid listener argument");return 2147483647<Number(t)?-1:c.setTimeout(e,t||0)}v(eE,eh),(o=eE.prototype).ga=!1,o.T=null,o.qb=function(){if(this.ga){var e=Date.now()-this.l;0<e&&e<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-e):(this.T&&(this.g.clearTimeout(this.T),this.T=null),eu(this,"tick"),this.ga&&(eI(this),this.start()))}},o.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())},o.N=function(){eE.$.N.call(this),eI(this),delete this.g};class eC extends y{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:function e(t){t.g=eT(()=>{t.g=null,t.i&&(t.i=!1,e(t))},t.j);let n=t.h;t.h=null,t.m.apply(null,n)}(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function eS(e){y.call(this),this.h=e,this.g={}}v(eS,y);var eA=[];function eR(e,t,n,r){Array.isArray(n)||(n&&(eA[0]=n.toString()),n=eA);for(var i=0;i<n.length;i++){var s=function e(t,n,r,i,s){if(i&&i.once)return function e(t,n,r,i,s){if(Array.isArray(n)){for(var a=0;a<n.length;a++)e(t,n[a],r,i,s);return null}return r=el(r),t&&t[W]?t.P(n,r,f(i)?!!i.capture:!!i,s):en(t,n,r,!0,i,s)}(t,n,r,i,s);if(Array.isArray(n)){for(var a=0;a<n.length;a++)e(t,n[a],r,i,s);return null}return r=el(r),t&&t[W]?t.O(n,r,f(i)?!!i.capture:!!i,s):en(t,n,r,!1,i,s)}(t,n[i],r||e.handleEvent,!1,e.h||e);if(!s)break;e.g[s.key]=s}}function eO(e){G(e.g,function(e,t){this.g.hasOwnProperty(t)&&er(e)},e),e.g={}}function ek(){this.g=!0}function eD(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n){for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var r=n[e];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var s=i[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(var a=1;a<i.length;a++)i[a]=""}}}}return ed(n)}catch(e){return t}}(e,n)+(r?" "+r:"")})}eS.prototype.N=function(){eS.$.N.call(this),eO(this)},eS.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},ek.prototype.Ea=function(){this.g=!1},ek.prototype.info=function(){};var eP={},eN=null;function eL(){return eN=eN||new eh}function ex(e){I.call(this,eP.Ta,e)}function eU(e){let t=eL();eu(t,new ex(t))}function eM(e,t){I.call(this,eP.STAT_EVENT,e),this.stat=t}function eB(e){let t=eL();eu(t,new eM(t,e))}function ej(e,t){I.call(this,eP.Ua,e),this.size=t}function eF(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){e()},t)}eP.Ta="serverreachability",v(ex,I),eP.STAT_EVENT="statevent",v(eM,I),eP.Ua="timingevent",v(ej,I);var eH={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},e$={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function eW(){}function eV(e){return e.h||(e.h=e.i())}function ez(){}eW.prototype.h=null;var eq={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function eG(){I.call(this,"d")}function eK(){I.call(this,"c")}function eX(){}function eJ(e,t,n,r){this.l=e,this.j=t,this.m=n,this.W=r||1,this.U=new eS(this),this.P=eY,e=P?125:void 0,this.V=new eE(e),this.I=null,this.i=!1,this.u=this.B=this.A=this.L=this.G=this.Y=this.C=null,this.F=[],this.g=null,this.o=0,this.s=this.v=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new eZ}function eZ(){this.i=null,this.g="",this.h=!1}v(eG,I),v(eK,I),v(eX,eW),eX.prototype.g=function(){return new XMLHttpRequest},eX.prototype.i=function(){return{}},a=new eX;var eY=45e3,eQ={},e0={};function e1(e,t,n){e.L=1,e.A=th(ti(t)),e.u=n,e.S=!0,e2(e,null)}function e2(e,t){e.G=Date.now(),e6(e),e.B=ti(e.A);var n=e.B,r=e.W;Array.isArray(r)||(r=[String(r)]),tE(n.i,"t",r),e.o=0,n=e.l.J,e.h=new eZ,e.g=nc(e.l,n?t:null,!e.u),0<e.O&&(e.M=new eC(m(e.Pa,e,e.g),e.O)),eR(e.U,e.g,"readystatechange",e.nb),t=e.I?K(e.I):{},e.u?(e.v||(e.v="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ha(e.B,e.v,e.u,t)):(e.v="GET",e.g.ha(e.B,e.v,null,t)),eU(),function(e,t,n,r,i,s){e.info(function(){if(e.g){if(s)for(var a="",o=s.split("&"),l=0;l<o.length;l++){var h=o[l].split("=");if(1<h.length){var u=h[0];h=h[1];var c=u.split("_");a=2<=c.length&&"type"==c[1]?a+(u+"=")+h+"&":a+(u+"=redacted&")}}else a=null}else a=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+t+"\n"+n+"\n"+a})}(e.j,e.v,e.B,e.m,e.W,e.u)}function e9(e){return!!e.g&&"GET"==e.v&&2!=e.L&&e.l.Ha}function e4(e,t,n){let r=!0,i;for(;!e.J&&e.o<n.length;)if((i=function(e,t){var n=e.o,r=t.indexOf("\n",n);return -1==r?e0:isNaN(n=Number(t.substring(n,r)))?eQ:(r+=1)+n>t.length?e0:(t=t.slice(r,r+n),e.o=r+n,t)}(e,n))==e0){4==t&&(e.s=4,eB(14),r=!1),eD(e.j,e.m,null,"[Incomplete Response]");break}else if(i==eQ){e.s=4,eB(15),eD(e.j,e.m,n,"[Invalid Chunk]"),r=!1;break}else eD(e.j,e.m,i,null),te(e,i);e9(e)&&0!=e.o&&(e.h.g=e.h.g.slice(e.o),e.o=0),4!=t||0!=n.length||e.h.h||(e.s=1,eB(16),r=!1),e.i=e.i&&r,r?0<n.length&&!e.ba&&(e.ba=!0,(t=e.l).g==e&&t.ca&&!t.M&&(t.l.info("Great, no buffering proxy detected. Bytes received: "+n.length),nr(t),t.M=!0,eB(11))):(eD(e.j,e.m,n,"[Invalid Chunked Response]"),e8(e),e7(e))}function e6(e){e.Y=Date.now()+e.P,e5(e,e.P)}function e5(e,t){if(null!=e.C)throw Error("WatchDog timer not null");e.C=eF(m(e.lb,e),t)}function e3(e){e.C&&(c.clearTimeout(e.C),e.C=null)}function e7(e){0==e.l.H||e.J||na(e.l,e)}function e8(e){e3(e);var t=e.M;t&&"function"==typeof t.sa&&t.sa(),e.M=null,eI(e.V),eO(e.U),e.g&&(t=e.g,e.g=null,t.abort(),t.sa())}function te(e,t){try{var n=e.l;if(0!=n.H&&(n.g==e||tO(n.i,e))){if(!e.K&&tO(n.i,e)&&3==n.H){try{var r=n.Ja.g.parse(t)}catch(e){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){e:if(!n.u){if(n.g){if(n.g.G+3e3<e.G)ns(n),t6(n);else break e}nn(n),eB(18)}}else n.Fa=i[1],0<n.Fa-n.V&&37500>i[2]&&n.G&&0==n.A&&!n.v&&(n.v=eF(m(n.ib,n),6e3));if(1>=tR(n.i)&&n.oa){try{n.oa()}catch(e){}n.oa=void 0}}else nl(n,11)}else if((e.K||n.g==e)&&ns(n),!C(t))for(i=n.Ja.g.parse(t),t=0;t<i.length;t++){let o=i[t];if(n.V=o[0],o=o[1],2==n.H){if("c"==o[0]){n.K=o[1],n.pa=o[2];let t=o[3];null!=t&&(n.ra=t,n.l.info("VER="+n.ra));let i=o[4];null!=i&&(n.Ga=i,n.l.info("SVER="+n.Ga));let l=o[5];null!=l&&"number"==typeof l&&0<l&&(r=1.5*l,n.L=r,n.l.info("backChannelRequestTimeoutMs_="+r)),r=n;let h=e.g;if(h){let e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=r.i;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(tk(s,s.h),s.h=null))}if(r.F){let e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.Da=e,tl(r.I,r.F,e))}}if(n.H=3,n.h&&n.h.Ba(),n.ca&&(n.S=Date.now()-e.G,n.l.info("Handshake RTT: "+n.S+"ms")),(r=n).wa=nu(r,r.J?r.pa:null,r.Y),e.K){tD(r.i,e);var a=r.L;a&&e.setTimeout(a),e.C&&(e3(e),e6(e)),r.g=e}else nt(r);0<n.j.length&&t3(n)}else"stop"!=o[0]&&"close"!=o[0]||nl(n,7)}else 3==n.H&&("stop"==o[0]||"close"==o[0]?"stop"==o[0]?nl(n,7):t4(n):"noop"!=o[0]&&n.h&&n.h.Aa(o),n.A=0)}}eU(4)}catch(e){}}function tt(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(d(e)||"string"==typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var n=function(e){if(e.ta&&"function"==typeof e.ta)return e.ta();if(!e.Z||"function"!=typeof e.Z){if("undefined"!=typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!=typeof Set&&e instanceof Set)){if(d(e)||"string"==typeof e){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}for(let r in t=[],n=0,e)t[n++]=r;return t}}}(e),r=function(e){if(e.Z&&"function"==typeof e.Z)return e.Z();if("undefined"!=typeof Map&&e instanceof Map||"undefined"!=typeof Set&&e instanceof Set)return Array.from(e.values());if("string"==typeof e)return e.split("");if(d(e)){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}for(r in t=[],n=0,e)t[n++]=e[r];return t}(e),i=r.length,s=0;s<i;s++)t.call(void 0,r[s],n&&n[s],e)}(o=eJ.prototype).setTimeout=function(e){this.P=e},o.nb=function(e){e=e.target;let t=this.M;t&&3==tY(e)?t.l():this.Pa(e)},o.Pa=function(e){try{if(e==this.g)e:{let u=tY(this.g);var t=this.g.Ia();let d=this.g.da();if(!(3>u)&&(3!=u||P||this.g&&(this.h.h||this.g.ja()||tQ(this.g)))){this.J||4!=u||7==t||(8==t||0>=d?eU(3):eU(2)),e3(this);var n=this.g.da();this.ca=n;t:if(e9(this)){var r=tQ(this.g);e="";var i=r.length,s=4==tY(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){e8(this),e7(this);var a="";break t}this.h.i=new c.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(r[t],{stream:s&&t==i-1});r.length=0,this.h.g+=e,this.o=0,a=this.h.g}else a=this.g.ja();if(this.i=200==n,function(e,t,n,r,i,s,a){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+s+" "+a})}(this.j,this.v,this.B,this.m,this.W,u,n),this.i){if(this.aa&&!this.K){t:{if(this.g){var o,l=this.g;if((o=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!C(o)){var h=o;break t}}h=null}if(n=h)eD(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,te(this,n);else{this.i=!1,this.s=3,eB(12),e8(this),e7(this);break e}}this.S?(e4(this,u,a),P&&this.i&&3==u&&(eR(this.U,this.V,"tick",this.mb),this.V.start())):(eD(this.j,this.m,a,null),te(this,a)),4==u&&e8(this),this.i&&!this.J&&(4==u?na(this.l,this):(this.i=!1,e6(this)))}else(function(e){let t={};e=(e.g&&2<=tY(e)&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<e.length;r++){if(C(e[r]))continue;var n=function(e){var t=1;e=e.split(":");let n=[];for(;0<t&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}(e[r]);let i=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();let s=t[i]||[];t[i]=s,s.push(n)}!function(e,t){for(let n in e)t.call(void 0,e[n],n,e)}(t,function(e){return e.join(", ")})})(this.g),400==n&&0<a.indexOf("Unknown SID")?(this.s=3,eB(12)):(this.s=0,eB(13)),e8(this),e7(this)}}}catch(e){}finally{}},o.mb=function(){if(this.g){var e=tY(this.g),t=this.g.ja();this.o<t.length&&(e3(this),e4(this,e,t),this.i&&4!=e&&e6(this))}},o.cancel=function(){this.J=!0,e8(this)},o.lb=function(){this.C=null;let e=Date.now();0<=e-this.Y?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.j,this.B),2!=this.L&&(eU(),eB(17)),e8(this),this.s=2,e7(this)):e5(this,this.Y-e)};var tn=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function tr(e){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,e instanceof tr){this.h=e.h,ts(this,e.j),this.s=e.s,this.g=e.g,ta(this,e.m),this.l=e.l;var t=e.i,n=new tv;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),to(this,n),this.o=e.o}else e&&(t=String(e).match(tn))?(this.h=!1,ts(this,t[1]||"",!0),this.s=tu(t[2]||""),this.g=tu(t[3]||"",!0),ta(this,t[4]),this.l=tu(t[5]||"",!0),to(this,t[6]||"",!0),this.o=tu(t[7]||"")):(this.h=!1,this.i=new tv(null,this.h))}function ti(e){return new tr(e)}function ts(e,t,n){e.j=n?tu(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function ta(e,t){if(t){if(isNaN(t=Number(t))||0>t)throw Error("Bad port number "+t);e.m=t}else e.m=null}function to(e,t,n){var r,i;t instanceof tv?(e.i=t,r=e.i,(i=e.h)&&!r.j&&(ty(r),r.i=null,r.g.forEach(function(e,t){var n=t.toLowerCase();t!=n&&(tb(this,t),tE(this,n,e))},r)),r.j=i):(n||(t=tc(t,tm)),e.i=new tv(t,e.h))}function tl(e,t,n){e.i.set(t,n)}function th(e){return tl(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function tu(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function tc(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,td),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function td(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}tr.prototype.toString=function(){var e=[],t=this.j;t&&e.push(tc(t,tf,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.s)&&e.push(tc(t,tf,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.m)&&e.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(tc(n,"/"==n.charAt(0)?tg:tp,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.o)&&e.push("#",tc(n,t_)),e.join("")};var tf=/[#\/\?@]/g,tp=/[#\?:]/g,tg=/[#\?]/g,tm=/[#\?@]/g,t_=/#/g;function tv(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function ty(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var r=e[n].indexOf("="),i=null;if(0<=r){var s=e[n].substring(0,r);i=e[n].substring(r+1)}else s=e[n];t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function tb(e,t){ty(e),t=tI(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function tw(e,t){return ty(e),t=tI(e,t),e.g.has(t)}function tE(e,t,n){tb(e,t),0<n.length&&(e.i=null,e.g.set(tI(e,t),w(n)),e.h+=n.length)}function tI(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}(o=tv.prototype).add=function(e,t){ty(this),this.i=null,e=tI(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},o.forEach=function(e,t){ty(this),this.g.forEach(function(n,r){n.forEach(function(n){e.call(t,n,r,this)},this)},this)},o.ta=function(){ty(this);let e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let r=0;r<t.length;r++){let i=e[r];for(let e=0;e<i.length;e++)n.push(t[r])}return n},o.Z=function(e){ty(this);let t=[];if("string"==typeof e)tw(this,e)&&(t=t.concat(this.g.get(tI(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t},o.set=function(e,t){return ty(this),this.i=null,tw(this,e=tI(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},o.get=function(e,t){return e&&0<(e=this.Z(e)).length?String(e[0]):t},o.toString=function(){if(this.i)return this.i;if(!this.g)return"";let e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var r=t[n];let s=encodeURIComponent(String(r)),a=this.Z(r);for(r=0;r<a.length;r++){var i=s;""!==a[r]&&(i+="="+encodeURIComponent(String(a[r]))),e.push(i)}}return this.i=e.join("&")};var tT=class{constructor(e,t){this.g=e,this.map=t}};function tC(e){this.l=e||tS,e=c.PerformanceNavigationTiming?0<(e=c.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):!!(c.g&&c.g.Ka&&c.g.Ka()&&c.g.Ka().dc),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var tS=10;function tA(e){return!!e.h||!!e.g&&e.g.size>=e.j}function tR(e){return e.h?1:e.g?e.g.size:0}function tO(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function tk(e,t){e.g?e.g.add(t):e.h=t}function tD(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function tP(e){if(null!=e.h)return e.i.concat(e.h.F);if(null!=e.g&&0!==e.g.size){let t=e.i;for(let n of e.g.values())t=t.concat(n.F);return t}return w(e.i)}tC.prototype.cancel=function(){if(this.i=tP(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(let e of this.g.values())e.cancel();this.g.clear()}};var tN=class{stringify(e){return c.JSON.stringify(e,void 0)}parse(e){return c.JSON.parse(e,void 0)}};function tL(){this.g=new tN}function tx(e,t,n,r,i){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,i(r)}catch(e){}}function tU(e){this.l=e.ec||null,this.j=e.ob||!1}function tM(e,t){eh.call(this),this.F=e,this.u=t,this.m=void 0,this.readyState=tB,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}v(tU,eW),tU.prototype.g=function(){return new tM(this.l,this.j)},tU.prototype.i=(r={},function(){return r}),v(tM,eh);var tB=0;function tj(e){e.j.read().then(e.Xa.bind(e)).catch(e.ka.bind(e))}function tF(e){e.readyState=4,e.l=null,e.j=null,e.A=null,tH(e)}function tH(e){e.onreadystatechange&&e.onreadystatechange.call(e)}(o=tM.prototype).open=function(e,t){if(this.readyState!=tB)throw this.abort(),Error("Error reopening a connection");this.C=e,this.B=t,this.readyState=1,tH(this)},o.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;let t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};e&&(t.body=e),(this.F||c).fetch(new Request(this.B,t)).then(this.$a.bind(this),this.ka.bind(this))},o.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,tF(this)),this.readyState=tB},o.$a=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,tH(this)),this.g&&(this.readyState=3,tH(this),this.g))){if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(void 0!==c.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;tj(this)}else e.text().then(this.Za.bind(this),this.ka.bind(this))}},o.Xa=function(e){if(this.g){if(this.u&&e.value)this.response.push(e.value);else if(!this.u){var t=e.value?e.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?tF(this):tH(this),3==this.readyState&&tj(this)}},o.Za=function(e){this.g&&(this.response=this.responseText=e,tF(this))},o.Ya=function(e){this.g&&(this.response=e,tF(this))},o.ka=function(){this.g&&tF(this)},o.setRequestHeader=function(e,t){this.v.append(e,t)},o.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},o.getAllResponseHeaders=function(){if(!this.h)return"";let e=[],t=this.h.entries();for(var n=t.next();!n.done;)e.push((n=n.value)[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(tM.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}});var t$=c.JSON.parse;function tW(e){eh.call(this),this.headers=new Map,this.u=e||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=tV,this.L=this.M=!1}v(tW,eh);var tV="",tz=/^https?$/i,tq=["POST","PUT"];function tG(e,t){e.h=!1,e.g&&(e.l=!0,e.g.abort(),e.l=!1),e.j=t,e.m=5,tK(e),tJ(e)}function tK(e){e.F||(e.F=!0,eu(e,"complete"),eu(e,"error"))}function tX(e){if(e.h&&void 0!==u&&(!e.C[1]||4!=tY(e)||2!=e.da())){if(e.v&&4==tY(e))eT(e.La,0,e);else if(eu(e,"readystatechange"),4==tY(e)){e.h=!1;try{let a=e.da();switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t,n,r=!0;break;default:r=!1}if(!(t=r)){if(n=0===a){var i=String(e.I).match(tn)[1]||null;!i&&c.self&&c.self.location&&(i=c.self.location.protocol.slice(0,-1)),n=!tz.test(i?i.toLowerCase():"")}t=n}if(t)eu(e,"complete"),eu(e,"success");else{e.m=6;try{var s=2<tY(e)?e.g.statusText:""}catch(e){s=""}e.j=s+" ["+e.da()+"]",tK(e)}}finally{tJ(e)}}}}function tJ(e,t){if(e.g){tZ(e);let n=e.g,r=e.C[0]?()=>{}:null;e.g=null,e.C=null,t||eu(e,"ready");try{n.onreadystatechange=r}catch(e){}}}function tZ(e){e.g&&e.L&&(e.g.ontimeout=null),e.A&&(c.clearTimeout(e.A),e.A=null)}function tY(e){return e.g?e.g.readyState:0}function tQ(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.K){case tV:case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(e){return null}}function t0(e){let t="";return G(e,function(e,n){t+=n+":"+e+"\r\n"}),t}function t1(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=t0(n),"string"==typeof e?null!=n&&encodeURIComponent(String(n)):tl(e,t,n))}function t2(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function t9(e){this.Ga=0,this.j=[],this.l=new ek,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=t2("failFast",!1,e),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=t2("baseRetryDelayMs",5e3,e),this.hb=t2("retryDelaySeedMs",1e4,e),this.eb=t2("forwardChannelMaxRetries",2,e),this.xa=t2("forwardChannelRequestTimeoutMs",2e4,e),this.va=e&&e.xmlHttpFactory||void 0,this.Ha=e&&e.useFetchStreams||!1,this.L=void 0,this.J=e&&e.supportsCrossDomainXhr||!1,this.K="",this.i=new tC(e&&e.concurrentRequestLimit),this.Ja=new tL,this.P=e&&e.fastHandshake||!1,this.O=e&&e.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=e&&e.bc||!1,e&&e.Ea&&this.l.Ea(),e&&e.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&e&&e.detectBufferingProxy||!1,this.qa=void 0,e&&e.longPollingTimeout&&0<e.longPollingTimeout&&(this.qa=e.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}function t4(e){if(t5(e),3==e.H){var t=e.W++,n=ti(e.I);if(tl(n,"SID",e.K),tl(n,"RID",t),tl(n,"TYPE","terminate"),t8(e,n),(t=new eJ(e,e.l,t)).L=2,t.A=th(ti(n)),n=!1,c.navigator&&c.navigator.sendBeacon)try{n=c.navigator.sendBeacon(t.A.toString(),"")}catch(e){}!n&&c.Image&&((new Image).src=t.A,n=!0),n||(t.g=nc(t.l,null),t.g.ha(t.A)),t.G=Date.now(),e6(t)}nh(e)}function t6(e){e.g&&(nr(e),e.g.cancel(),e.g=null)}function t5(e){t6(e),e.u&&(c.clearTimeout(e.u),e.u=null),ns(e),e.i.cancel(),e.m&&("number"==typeof e.m&&c.clearTimeout(e.m),e.m=null)}function t3(e){if(!tA(e.i)&&!e.m){e.m=!0;var t=e.Na;e_||eb(),ev||(e_(),ev=!0),ey.add(t,e),e.C=0}}function t7(e,t){var n;n=t?t.m:e.W++;let r=ti(e.I);tl(r,"SID",e.K),tl(r,"RID",n),tl(r,"AID",e.V),t8(e,r),e.o&&e.s&&t1(r,e.o,e.s),n=new eJ(e,e.l,n,e.C+1),null===e.o&&(n.I=e.s),t&&(e.j=t.F.concat(e.j)),t=ne(e,n,1e3),n.setTimeout(Math.round(.5*e.xa)+Math.round(.5*e.xa*Math.random())),tk(e.i,n),e1(n,r,t)}function t8(e,t){e.na&&G(e.na,function(e,n){tl(t,n,e)}),e.h&&tt({},function(e,n){tl(t,n,e)})}function ne(e,t,n){n=Math.min(e.j.length,n);var r=e.h?m(e.h.Va,e.h,e):null;e:{var i=e.j;let t=-1;for(;;){let e=["count="+n];-1==t?0<n?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let s=!0;for(let a=0;a<n;a++){let n=i[a].g,o=i[a].map;if(0>(n-=t))t=Math.max(0,i[a].g-100),s=!1;else try{!function(e,t,n){let r=n||"";try{tt(e,function(e,n){let i=e;f(e)&&(i=ed(e)),t.push(r+n+"="+encodeURIComponent(i))})}catch(e){throw t.push(r+"type="+encodeURIComponent("_badmap")),e}}(o,e,"req"+n+"_")}catch(e){r&&r(o)}}if(s){r=e.join("&");break e}}}return e=e.j.splice(0,n),t.F=e,r}function nt(e){if(!e.g&&!e.u){e.ba=1;var t=e.Ma;e_||eb(),ev||(e_(),ev=!0),ey.add(t,e),e.A=0}}function nn(e){return!e.g&&!e.u&&!(3<=e.A)&&(e.ba++,e.u=eF(m(e.Ma,e),no(e,e.A)),e.A++,!0)}function nr(e){null!=e.B&&(c.clearTimeout(e.B),e.B=null)}function ni(e){e.g=new eJ(e,e.l,"rpc",e.ba),null===e.o&&(e.g.I=e.s),e.g.O=0;var t=ti(e.wa);tl(t,"RID","rpc"),tl(t,"SID",e.K),tl(t,"AID",e.V),tl(t,"CI",e.G?"0":"1"),!e.G&&e.qa&&tl(t,"TO",e.qa),tl(t,"TYPE","xmlhttp"),t8(e,t),e.o&&e.s&&t1(t,e.o,e.s),e.L&&e.g.setTimeout(e.L);var n=e.g;e=e.pa,n.L=1,n.A=th(ti(t)),n.u=null,n.S=!0,e2(n,e)}function ns(e){null!=e.v&&(c.clearTimeout(e.v),e.v=null)}function na(e,t){var n=null;if(e.g==t){ns(e),nr(e),e.g=null;var r=2}else{if(!tO(e.i,t))return;n=t.F,tD(e.i,t),r=1}if(0!=e.H){if(t.i){if(1==r){n=t.u?t.u.length:0,t=Date.now()-t.G;var i,s=e.C;eu(r=eL(),new ej(r,n)),t3(e)}else nt(e)}else if(3==(s=t.s)||0==s&&0<t.ca||!(1==r&&(i=t,!(tR(e.i)>=e.i.j-(e.m?1:0))&&(e.m?(e.j=i.F.concat(e.j),!0):1!=e.H&&2!=e.H&&!(e.C>=(e.cb?0:e.eb))&&(e.m=eF(m(e.Na,e,i),no(e,e.C)),e.C++,!0)))||2==r&&nn(e)))switch(n&&0<n.length&&((t=e.i).i=t.i.concat(n)),s){case 1:nl(e,5);break;case 4:nl(e,10);break;case 3:nl(e,6);break;default:nl(e,2)}}}function no(e,t){let n=e.ab+Math.floor(Math.random()*e.hb);return e.isActive()||(n*=2),n*t}function nl(e,t){if(e.l.info("Error code "+t),2==t){var n=null;e.h&&(n=null);var r=m(e.pb,e);n||(n=new tr("//www.google.com/images/cleardot.gif"),c.location&&"http"==c.location.protocol||ts(n,"https"),th(n)),function(e,t){let n=new ek;if(c.Image){let r=new Image;r.onload=_(tx,n,r,"TestLoadImage: loaded",!0,t),r.onerror=_(tx,n,r,"TestLoadImage: error",!1,t),r.onabort=_(tx,n,r,"TestLoadImage: abort",!1,t),r.ontimeout=_(tx,n,r,"TestLoadImage: timeout",!1,t),c.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}(n.toString(),r)}else eB(2);e.H=0,e.h&&e.h.za(t),nh(e),t5(e)}function nh(e){if(e.H=0,e.ma=[],e.h){let t=tP(e.i);(0!=t.length||0!=e.j.length)&&(E(e.ma,t),E(e.ma,e.j),e.i.i.length=0,w(e.j),e.j.length=0),e.h.ya()}}function nu(e,t,n){var r=n instanceof tr?ti(n):new tr(n);if(""!=r.g)t&&(r.g=t+"."+r.g),ta(r,r.m);else{var i=c.location;r=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;var s=new tr(null);r&&ts(s,r),t&&(s.g=t),i&&ta(s,i),n&&(s.l=n),r=s}return n=e.F,t=e.Da,n&&t&&tl(r,n,t),tl(r,"VER",e.ra),t8(e,r),r}function nc(e,t,n){if(t&&!e.J)throw Error("Can't create secondary domain capable XhrIo object.");return(t=new tW(e.Ha&&!e.va?new tU({ob:n}):e.va)).Oa(e.J),t}function nd(){}function nf(){if(k&&!(10<=Number(F)))throw Error("Environmental error: no available transport.")}function np(e,t){eh.call(this),this.g=new t9(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.s=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.Ca&&(e?e["X-WebChannel-Client-Profile"]=t.Ca:e={"X-WebChannel-Client-Profile":t.Ca}),this.g.U=e,(e=t&&t.cc)&&!C(e)&&(this.g.o=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!C(t)&&(this.g.F=t,null!==(e=this.h)&&t in e&&t in(e=this.h)&&delete e[t]),this.j=new n_(this)}function ng(e){eG.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(let n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function nm(){eK.call(this),this.status=1}function n_(e){this.g=e}function nv(){this.blockSize=-1,this.blockSize=64,this.g=[,,,,],this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}function ny(e,t,n){n||(n=0);var r=Array(16);if("string"==typeof t)for(var i=0;16>i;++i)r[i]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(i=0;16>i;++i)r[i]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],i=e.g[2];var s=e.g[3],a=t+(s^n&(i^s))+r[0]+3614090360&4294967295;a=s+(i^(t=n+(a<<7&4294967295|a>>>25))&(n^i))+r[1]+3905402710&4294967295,a=i+(n^(s=t+(a<<12&4294967295|a>>>20))&(t^n))+r[2]+606105819&4294967295,a=n+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+r[3]+3250441966&4294967295,a=t+(s^(n=i+(a<<22&4294967295|a>>>10))&(i^s))+r[4]+4118548399&4294967295,a=s+(i^(t=n+(a<<7&4294967295|a>>>25))&(n^i))+r[5]+1200080426&4294967295,a=i+(n^(s=t+(a<<12&4294967295|a>>>20))&(t^n))+r[6]+2821735955&4294967295,a=n+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+r[7]+4249261313&4294967295,a=t+(s^(n=i+(a<<22&4294967295|a>>>10))&(i^s))+r[8]+1770035416&4294967295,a=s+(i^(t=n+(a<<7&4294967295|a>>>25))&(n^i))+r[9]+2336552879&4294967295,a=i+(n^(s=t+(a<<12&4294967295|a>>>20))&(t^n))+r[10]+4294925233&4294967295,a=n+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+r[11]+2304563134&4294967295,a=t+(s^(n=i+(a<<22&4294967295|a>>>10))&(i^s))+r[12]+1804603682&4294967295,a=s+(i^(t=n+(a<<7&4294967295|a>>>25))&(n^i))+r[13]+4254626195&4294967295,a=i+(n^(s=t+(a<<12&4294967295|a>>>20))&(t^n))+r[14]+2792965006&4294967295,a=n+(t^(i=s+(a<<17&4294967295|a>>>15))&(s^t))+r[15]+1236535329&4294967295,n=i+(a<<22&4294967295|a>>>10),a=t+(i^s&(n^i))+r[1]+4129170786&4294967295,t=n+(a<<5&4294967295|a>>>27),a=s+(n^i&(t^n))+r[6]+3225465664&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^n&(s^t))+r[11]+643717713&4294967295,i=s+(a<<14&4294967295|a>>>18),a=n+(s^t&(i^s))+r[0]+3921069994&4294967295,n=i+(a<<20&4294967295|a>>>12),a=t+(i^s&(n^i))+r[5]+3593408605&4294967295,t=n+(a<<5&4294967295|a>>>27),a=s+(n^i&(t^n))+r[10]+38016083&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^n&(s^t))+r[15]+3634488961&4294967295,i=s+(a<<14&4294967295|a>>>18),a=n+(s^t&(i^s))+r[4]+3889429448&4294967295,n=i+(a<<20&4294967295|a>>>12),a=t+(i^s&(n^i))+r[9]+568446438&4294967295,t=n+(a<<5&4294967295|a>>>27),a=s+(n^i&(t^n))+r[14]+3275163606&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^n&(s^t))+r[3]+4107603335&4294967295,i=s+(a<<14&4294967295|a>>>18),a=n+(s^t&(i^s))+r[8]+1163531501&4294967295,n=i+(a<<20&4294967295|a>>>12),a=t+(i^s&(n^i))+r[13]+2850285829&4294967295,t=n+(a<<5&4294967295|a>>>27),a=s+(n^i&(t^n))+r[2]+4243563512&4294967295,s=t+(a<<9&4294967295|a>>>23),a=i+(t^n&(s^t))+r[7]+1735328473&4294967295,i=s+(a<<14&4294967295|a>>>18),a=n+(s^t&(i^s))+r[12]+2368359562&4294967295,a=t+((n=i+(a<<20&4294967295|a>>>12))^i^s)+r[5]+4294588738&4294967295,a=s+((t=n+(a<<4&4294967295|a>>>28))^n^i)+r[8]+2272392833&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^n)+r[11]+1839030562&4294967295,a=n+((i=s+(a<<16&4294967295|a>>>16))^s^t)+r[14]+4259657740&4294967295,a=t+((n=i+(a<<23&4294967295|a>>>9))^i^s)+r[1]+2763975236&4294967295,a=s+((t=n+(a<<4&4294967295|a>>>28))^n^i)+r[4]+1272893353&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^n)+r[7]+4139469664&4294967295,a=n+((i=s+(a<<16&4294967295|a>>>16))^s^t)+r[10]+3200236656&4294967295,a=t+((n=i+(a<<23&4294967295|a>>>9))^i^s)+r[13]+681279174&4294967295,a=s+((t=n+(a<<4&4294967295|a>>>28))^n^i)+r[0]+3936430074&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^n)+r[3]+3572445317&4294967295,a=n+((i=s+(a<<16&4294967295|a>>>16))^s^t)+r[6]+76029189&4294967295,a=t+((n=i+(a<<23&4294967295|a>>>9))^i^s)+r[9]+3654602809&4294967295,a=s+((t=n+(a<<4&4294967295|a>>>28))^n^i)+r[12]+3873151461&4294967295,a=i+((s=t+(a<<11&4294967295|a>>>21))^t^n)+r[15]+530742520&4294967295,a=n+((i=s+(a<<16&4294967295|a>>>16))^s^t)+r[2]+3299628645&4294967295,n=i+(a<<23&4294967295|a>>>9),a=t+(i^(n|~s))+r[0]+4096336452&4294967295,t=n+(a<<6&4294967295|a>>>26),a=s+(n^(t|~i))+r[7]+1126891415&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~n))+r[14]+2878612391&4294967295,i=s+(a<<15&4294967295|a>>>17),a=n+(s^(i|~t))+r[5]+4237533241&4294967295,n=i+(a<<21&4294967295|a>>>11),a=t+(i^(n|~s))+r[12]+1700485571&4294967295,t=n+(a<<6&4294967295|a>>>26),a=s+(n^(t|~i))+r[3]+2399980690&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~n))+r[10]+4293915773&4294967295,i=s+(a<<15&4294967295|a>>>17),a=n+(s^(i|~t))+r[1]+2240044497&4294967295,n=i+(a<<21&4294967295|a>>>11),a=t+(i^(n|~s))+r[8]+1873313359&4294967295,t=n+(a<<6&4294967295|a>>>26),a=s+(n^(t|~i))+r[15]+4264355552&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~n))+r[6]+2734768916&4294967295,i=s+(a<<15&4294967295|a>>>17),a=n+(s^(i|~t))+r[13]+1309151649&4294967295,n=i+(a<<21&4294967295|a>>>11),a=t+(i^(n|~s))+r[4]+4149444226&4294967295,t=n+(a<<6&4294967295|a>>>26),a=s+(n^(t|~i))+r[11]+3174756917&4294967295,s=t+(a<<10&4294967295|a>>>22),a=i+(t^(s|~n))+r[2]+718787259&4294967295,i=s+(a<<15&4294967295|a>>>17),a=n+(s^(i|~t))+r[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(a<<21&4294967295|a>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+s&4294967295}function nb(e,t){this.h=t;for(var n=[],r=!0,i=e.length-1;0<=i;i--){var s=0|e[i];r&&s==t||(n[i]=s,r=!1)}this.g=n}(o=tW.prototype).Oa=function(e){this.M=e},o.ha=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+e);t=t?t.toUpperCase():"GET",this.I=e,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():a.g(),this.C=this.u?eV(this.u):eV(a),this.g.onreadystatechange=m(this.La,this);try{this.G=!0,this.g.open(t,String(e),!0),this.G=!1}catch(e){tG(this,e);return}if(e=n||"",n=new Map(this.headers),r){if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else if("function"==typeof r.keys&&"function"==typeof r.get)for(let e of r.keys())n.set(e,r.get(e));else throw Error("Unknown input type for opt_headers: "+String(r))}for(let[s,a]of(r=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),i=c.FormData&&e instanceof c.FormData,!(0<=b(tq,t))||r||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),n))this.g.setRequestHeader(s,a);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{var s;tZ(this),0<this.B&&((this.L=(s=this.g,k&&"number"==typeof s.timeout&&void 0!==s.ontimeout))?(this.g.timeout=this.B,this.g.ontimeout=m(this.ua,this)):this.A=eT(this.ua,this.B,this)),this.v=!0,this.g.send(e),this.v=!1}catch(e){tG(this,e)}},o.ua=function(){void 0!==u&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,eu(this,"timeout"),this.abort(8))},o.abort=function(e){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=e||7,eu(this,"complete"),eu(this,"abort"),tJ(this))},o.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),tJ(this,!0)),tW.$.N.call(this)},o.La=function(){this.s||(this.G||this.v||this.l?tX(this):this.kb())},o.kb=function(){tX(this)},o.isActive=function(){return!!this.g},o.da=function(){try{return 2<tY(this)?this.g.status:-1}catch(e){return -1}},o.ja=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},o.Wa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),t$(t)}},o.Ia=function(){return this.m},o.Sa=function(){return"string"==typeof this.j?this.j:String(this.j)},(o=t9.prototype).ra=8,o.H=1,o.Na=function(e){if(this.m){if(this.m=null,1==this.H){if(!e){this.W=Math.floor(1e5*Math.random()),e=this.W++;let i=new eJ(this,this.l,e),s=this.s;if(this.U&&(s?J(s=K(s),this.U):s=this.U),null!==this.o||this.O||(i.I=s,s=null),this.P)e:{for(var t=0,n=0;n<this.j.length;n++){t:{var r=this.j[n];if("__data__"in r.map&&"string"==typeof(r=r.map.__data__)){r=r.length;break t}r=void 0}if(void 0===r)break;if(4096<(t+=r)){t=n;break e}if(4096===t||n===this.j.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=ne(this,i,t),tl(n=ti(this.I),"RID",e),tl(n,"CVER",22),this.F&&tl(n,"X-HTTP-Session-Id",this.F),t8(this,n),s&&(this.O?t="headers="+encodeURIComponent(String(t0(s)))+"&"+t:this.o&&t1(n,this.o,s)),tk(this.i,i),this.bb&&tl(n,"TYPE","init"),this.P?(tl(n,"$req",t),tl(n,"SID","null"),i.aa=!0,e1(i,n,null)):e1(i,n,t),this.H=2}}else 3==this.H&&(e?t7(this,e):0==this.j.length||tA(this.i)||t7(this))}},o.Ma=function(){if(this.u=null,ni(this),this.ca&&!(this.M||null==this.g||0>=this.S)){var e=2*this.S;this.l.info("BP detection timer enabled: "+e),this.B=eF(m(this.jb,this),e)}},o.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,eB(10),t6(this),ni(this))},o.ib=function(){null!=this.v&&(this.v=null,t6(this),nn(this),eB(19))},o.pb=function(e){e?(this.l.info("Successfully pinged google.com"),eB(2)):(this.l.info("Failed to ping google.com"),eB(1))},o.isActive=function(){return!!this.h&&this.h.isActive(this)},(o=nd.prototype).Ba=function(){},o.Aa=function(){},o.za=function(){},o.ya=function(){},o.isActive=function(){return!0},o.Va=function(){},nf.prototype.g=function(e,t){return new np(e,t)},v(np,eh),np.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var e=this.g,t=this.l,n=this.h||void 0;eB(0),e.Y=t,e.na=n||{},e.G=e.aa,e.I=nu(e,null,e.Y),t3(e)},np.prototype.close=function(){t4(this.g)},np.prototype.u=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.v&&((n={}).__data__=ed(e),e=n);t.j.push(new tT(t.fb++,e)),3==t.H&&t3(t)},np.prototype.N=function(){this.g.h=null,delete this.j,t4(this.g),delete this.g,np.$.N.call(this)},v(ng,eG),v(nm,eK),v(n_,nd),n_.prototype.Ba=function(){eu(this.g,"a")},n_.prototype.Aa=function(e){eu(this.g,new ng(e))},n_.prototype.za=function(e){eu(this.g,new nm)},n_.prototype.ya=function(){eu(this.g,"b")},v(nv,function(){this.blockSize=-1}),nv.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0},nv.prototype.j=function(e,t){void 0===t&&(t=e.length);for(var n=t-this.blockSize,r=this.m,i=this.h,s=0;s<t;){if(0==i)for(;s<=n;)ny(this,e,s),s+=this.blockSize;if("string"==typeof e){for(;s<t;)if(r[i++]=e.charCodeAt(s++),i==this.blockSize){ny(this,r),i=0;break}}else for(;s<t;)if(r[i++]=e[s++],i==this.blockSize){ny(this,r),i=0;break}}this.h=i,this.i+=t},nv.prototype.l=function(){var e=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;var n=8*this.i;for(t=e.length-8;t<e.length;++t)e[t]=255&n,n/=256;for(this.j(e),e=Array(16),t=n=0;4>t;++t)for(var r=0;32>r;r+=8)e[n++]=this.g[t]>>>r&255;return e};var nw={};function nE(e){return -128<=e&&128>e?Object.prototype.hasOwnProperty.call(nw,e)?nw[e]:nw[e]=new nb([0|e],0>e?-1:0):new nb([0|e],0>e?-1:0)}function nI(e){if(isNaN(e)||!isFinite(e))return nC;if(0>e)return nk(nI(-e));for(var t=[],n=1,r=0;e>=n;r++)t[r]=e/n|0,n*=nT;return new nb(t,0)}var nT=4294967296,nC=nE(0),nS=nE(1),nA=nE(16777216);function nR(e){if(0!=e.h)return!1;for(var t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function nO(e){return -1==e.h}function nk(e){for(var t=e.g.length,n=[],r=0;r<t;r++)n[r]=~e.g[r];return new nb(n,~e.h).add(nS)}function nD(e,t){return e.add(nk(t))}function nP(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function nN(e,t){this.g=e,this.h=t}function nL(e,t){if(nR(t))throw Error("division by zero");if(nR(e))return new nN(nC,nC);if(nO(e))return t=nL(nk(e),t),new nN(nk(t.g),nk(t.h));if(nO(t))return t=nL(e,nk(t)),new nN(nk(t.g),t.h);if(30<e.g.length){if(nO(e)||nO(t))throw Error("slowDivide_ only works with positive integers.");for(var n=nS,r=t;0>=r.X(e);)n=nx(n),r=nx(r);var i=nU(n,1),s=nU(r,1);for(r=nU(r,2),n=nU(n,2);!nR(r);){var a=s.add(r);0>=a.X(e)&&(i=i.add(n),s=a),r=nU(r,1),n=nU(n,1)}return t=nD(e,i.R(t)),new nN(i,t)}for(i=nC;0<=e.X(t);){for(r=48>=(r=Math.ceil(Math.log(n=Math.max(1,Math.floor(e.ea()/t.ea())))/Math.LN2))?1:Math.pow(2,r-48),a=(s=nI(n)).R(t);nO(a)||0<a.X(e);)n-=r,a=(s=nI(n)).R(t);nR(s)&&(s=nS),i=i.add(s),e=nD(e,a)}return new nN(i,e)}function nx(e){for(var t=e.g.length+1,n=[],r=0;r<t;r++)n[r]=e.D(r)<<1|e.D(r-1)>>>31;return new nb(n,e.h)}function nU(e,t){var n=t>>5;t%=32;for(var r=e.g.length-n,i=[],s=0;s<r;s++)i[s]=0<t?e.D(s+n)>>>t|e.D(s+n+1)<<32-t:e.D(s+n);return new nb(i,e.h)}(o=nb.prototype).ea=function(){if(nO(this))return-nk(this).ea();for(var e=0,t=1,n=0;n<this.g.length;n++){var r=this.D(n);e+=(0<=r?r:nT+r)*t,t*=nT}return e},o.toString=function(e){if(2>(e=e||10)||36<e)throw Error("radix out of range: "+e);if(nR(this))return"0";if(nO(this))return"-"+nk(this).toString(e);for(var t=nI(Math.pow(e,6)),n=this,r="";;){var i=nL(n,t).g,s=((0<(n=nD(n,i.R(t))).g.length?n.g[0]:n.h)>>>0).toString(e);if(nR(n=i))return s+r;for(;6>s.length;)s="0"+s;r=s+r}},o.D=function(e){return 0>e?0:e<this.g.length?this.g[e]:this.h},o.X=function(e){return nO(e=nD(this,e))?-1:nR(e)?0:1},o.abs=function(){return nO(this)?nk(this):this},o.add=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0,i=0;i<=t;i++){var s=r+(65535&this.D(i))+(65535&e.D(i)),a=(s>>>16)+(this.D(i)>>>16)+(e.D(i)>>>16);r=a>>>16,s&=65535,a&=65535,n[i]=a<<16|s}return new nb(n,-2147483648&n[n.length-1]?-1:0)},o.R=function(e){if(nR(this)||nR(e))return nC;if(nO(this))return nO(e)?nk(this).R(nk(e)):nk(nk(this).R(e));if(nO(e))return nk(this.R(nk(e)));if(0>this.X(nA)&&0>e.X(nA))return nI(this.ea()*e.ea());for(var t=this.g.length+e.g.length,n=[],r=0;r<2*t;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(var i=0;i<e.g.length;i++){var s=this.D(r)>>>16,a=65535&this.D(r),o=e.D(i)>>>16,l=65535&e.D(i);n[2*r+2*i]+=a*l,nP(n,2*r+2*i),n[2*r+2*i+1]+=s*l,nP(n,2*r+2*i+1),n[2*r+2*i+1]+=a*o,nP(n,2*r+2*i+1),n[2*r+2*i+2]+=s*o,nP(n,2*r+2*i+2)}for(r=0;r<t;r++)n[r]=n[2*r+1]<<16|n[2*r];for(r=t;r<2*t;r++)n[r]=0;return new nb(n,0)},o.gb=function(e){return nL(this,e).h},o.and=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.D(r)&e.D(r);return new nb(n,this.h&e.h)},o.or=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.D(r)|e.D(r);return new nb(n,this.h|e.h)},o.xor=function(e){for(var t=Math.max(this.g.length,e.g.length),n=[],r=0;r<t;r++)n[r]=this.D(r)^e.D(r);return new nb(n,this.h^e.h)},nf.prototype.createWebChannel=nf.prototype.g,np.prototype.send=np.prototype.u,np.prototype.open=np.prototype.m,np.prototype.close=np.prototype.close,eH.NO_ERROR=0,eH.TIMEOUT=8,eH.HTTP_ERROR=6,e$.COMPLETE="complete",ez.EventType=eq,eq.OPEN="a",eq.CLOSE="b",eq.ERROR="c",eq.MESSAGE="d",eh.prototype.listen=eh.prototype.O,tW.prototype.listenOnce=tW.prototype.P,tW.prototype.getLastError=tW.prototype.Sa,tW.prototype.getLastErrorCode=tW.prototype.Ia,tW.prototype.getStatus=tW.prototype.da,tW.prototype.getResponseJson=tW.prototype.Wa,tW.prototype.getResponseText=tW.prototype.ja,tW.prototype.send=tW.prototype.ha,tW.prototype.setWithCredentials=tW.prototype.Oa,nv.prototype.digest=nv.prototype.l,nv.prototype.reset=nv.prototype.reset,nv.prototype.update=nv.prototype.j,nb.prototype.add=nb.prototype.add,nb.prototype.multiply=nb.prototype.R,nb.prototype.modulo=nb.prototype.gb,nb.prototype.compare=nb.prototype.X,nb.prototype.toNumber=nb.prototype.ea,nb.prototype.toString=nb.prototype.toString,nb.prototype.getBits=nb.prototype.D,nb.fromNumber=nI,nb.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return nk(e(t.substring(1),n));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var r=nI(Math.pow(n,8)),i=nC,s=0;s<t.length;s+=8){var a=Math.min(8,t.length-s),o=parseInt(t.substring(s,s+a),n);8>a?(a=nI(Math.pow(n,a)),i=i.R(a).add(nI(o))):i=(i=i.R(r)).add(nI(o))}return i};var nM=h.createWebChannelTransport=function(){return new nf},nB=h.getStatEventTarget=function(){return eL()},nj=h.ErrorCode=eH,nF=h.EventType=e$,nH=h.Event=eP,n$=h.Stat={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20};h.FetchXmlHttpFactory=tU;var nW=h.WebChannel=ez,nV=h.XhrIo=tW,nz=h.Md5=nv,nq=h.Integer=nb},1045:function(e,t,n){"use strict";let r,i,s,a,o,l;var h,u,c,d=n(9366),f=n(3991),p=n(6914),g=n(8745),m=n(5538);let _=(e,t)=>t.some(t=>e instanceof t),v=new WeakMap,y=new WeakMap,b=new WeakMap,w=new WeakMap,E=new WeakMap,I={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return y.get(e);if("objectStoreNames"===t)return e.objectStoreNames||b.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return T(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function T(e){var t;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(T(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&v.set(t,e)}).catch(()=>{}),E.set(t,e),t}(e);if(w.has(e))return w.get(e);let n="function"==typeof(t=e)?t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(i||(i=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(C(this),e),T(v.get(this))}:function(...e){return T(t.apply(C(this),e))}:function(e,...n){let r=t.call(C(this),e,...n);return b.set(r,e.sort?e.sort():[e]),T(r)}:(t instanceof IDBTransaction&&function(e){if(y.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});y.set(e,t)}(t),_(t,r||(r=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(t,I):t;return n!==e&&(w.set(e,n),E.set(n,e)),n}let C=e=>E.get(e),S=["get","getKey","getAll","getAllKeys","count"],A=["put","add","delete","clear"],R=new Map;function O(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(R.get(t))return R.get(t);let n=t.replace(/FromIndex$/,""),r=t!==n,i=A.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||S.includes(n)))return;let s=async function(e,...t){let s=this.transaction(e,i?"readwrite":"readonly"),a=s.store;return r&&(a=a.index(t.shift())),(await Promise.all([a[n](...t),i&&s.done]))[0]};return R.set(t,s),s}I={...h=I,get:(e,t,n)=>O(e,t)||h.get(e,t,n),has:(e,t)=>!!O(e,t)||h.has(e,t)};let k="@firebase/installations",D="0.6.4",P=`w:${D}`,N="FIS_v2",L=new g.LL("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function x(e){return e instanceof g.ZR&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function M(e){return{token:e.token,requestStatus:2,expiresIn:Number(e.expiresIn.replace("s","000")),creationTime:Date.now()}}async function B(e,t){let n=(await t.json()).error;return L.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function j({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}async function F(e){let t=await e();return t.status>=500&&t.status<600?e():t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function H({appConfig:e,heartbeatServiceProvider:t},{fid:n}){let r=U(e),i=j(e),s=t.getImmediate({optional:!0});if(s){let e=await s.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}let a={method:"POST",headers:i,body:JSON.stringify({fid:n,authVersion:N,appId:e.appId,sdkVersion:P})},o=await F(()=>fetch(r,a));if(o.ok){let e=await o.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:M(e.authToken)}}throw await B("Create Installation",o)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let W=/^[cdef][\w-]{21}$/;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let z=new Map;function q(e,t){let n=V(e);G(n,t),function(e,t){let n=(!K&&"BroadcastChannel"in self&&((K=new BroadcastChannel("[Firebase] FID Change")).onmessage=e=>{G(e.data.key,e.data.fid)}),K);n&&n.postMessage({key:e,fid:t}),0===z.size&&K&&(K.close(),K=null)}(n,t)}function G(e,t){let n=z.get(e);if(n)for(let e of n)e(t)}let K=null,X="firebase-installations-store",J=null;function Z(){return J||(J=function(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){let a=indexedDB.open(e,1),o=T(a);return r&&a.addEventListener("upgradeneeded",e=>{r(T(a.result),e.oldVersion,e.newVersion,T(a.transaction))}),n&&a.addEventListener("blocked",()=>n()),o.then(e=>{s&&e.addEventListener("close",()=>s()),i&&e.addEventListener("versionchange",()=>i())}).catch(()=>{}),o}("firebase-installations-database",0,{upgrade:(e,t)=>{0===t&&e.createObjectStore(X)}})),J}async function Y(e,t){let n=V(e),r=(await Z()).transaction(X,"readwrite"),i=r.objectStore(X),s=await i.get(n);return await i.put(t,n),await r.done,s&&s.fid===t.fid||q(e,t.fid),t}async function Q(e){let t=V(e),n=(await Z()).transaction(X,"readwrite");await n.objectStore(X).delete(t),await n.done}async function ee(e,t){let n=V(e),r=(await Z()).transaction(X,"readwrite"),i=r.objectStore(X),s=await i.get(n),a=t(s);return void 0===a?await i.delete(n):await i.put(a,n),await r.done,a&&(!s||s.fid!==a.fid)&&q(e,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function et(e){let t;let n=await ee(e.appConfig,n=>{let r=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine)return{installationEntry:t,registrationPromise:Promise.reject(L.create("app-offline"))};let n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=en(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:er(e)}:{installationEntry:t}}(e,es(n||{fid:function(){try{let e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;let t=btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_").substr(0,22);return W.test(t)?t:""}catch(e){return""}}(),registrationStatus:0}));return t=r.registrationPromise,r.installationEntry});return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function en(e,t){try{let n=await H(e,t);return Y(e.appConfig,n)}catch(n){throw x(n)&&409===n.customData.serverCode?await Q(e.appConfig):await Y(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function er(e){let t=await ei(e.appConfig);for(;1===t.registrationStatus;)await $(100),t=await ei(e.appConfig);if(0===t.registrationStatus){let{installationEntry:t,registrationPromise:n}=await et(e);return n||t}return t}function ei(e){return ee(e,e=>{if(!e)throw L.create("installation-not-found");return es(e)})}function es(e){return 1===e.registrationStatus&&e.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ea({appConfig:e,heartbeatServiceProvider:t},n){let r=function(e,{fid:t}){return`${U(e)}/${t}/authTokens:generate`}(e,n),i=function(e,{refreshToken:t}){let n=j(e);return n.append("Authorization",`${N} ${t}`),n}(e,n),s=t.getImmediate({optional:!0});if(s){let e=await s.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}let a={method:"POST",headers:i,body:JSON.stringify({installation:{sdkVersion:P,appId:e.appId}})},o=await F(()=>fetch(r,a));if(o.ok)return M(await o.json());throw await B("Generate Auth Token",o)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eo(e,t=!1){let n;let r=await ee(e.appConfig,r=>{var i;if(!ec(r))throw L.create("not-registered");let s=r.authToken;if(!t&&2===(i=s).requestStatus&&!function(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(i))return r;if(1===s.requestStatus)return n=el(e,t),r;{if(!navigator.onLine)throw L.create("app-offline");let t=function(e){let t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return n=eu(e,t),t}});return n?await n:r.authToken}async function el(e,t){let n=await eh(e.appConfig);for(;1===n.authToken.requestStatus;)await $(100),n=await eh(e.appConfig);let r=n.authToken;return 0===r.requestStatus?eo(e,t):r}function eh(e){return ee(e,e=>{var t;if(!ec(e))throw L.create("not-registered");return 1===(t=e.authToken).requestStatus&&t.requestTime+1e4<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function eu(e,t){try{let n=await ea(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await Y(e.appConfig,r),n}catch(n){if(x(n)&&(401===n.customData.serverCode||404===n.customData.serverCode))await Q(e.appConfig);else{let n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await Y(e.appConfig,n)}throw n}}function ec(e){return void 0!==e&&2===e.registrationStatus}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ed(e){let{installationEntry:t,registrationPromise:n}=await et(e);return n?n.catch(console.error):eo(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ef(e,t=!1){return await ep(e),(await eo(e,t)).token}async function ep(e){let{registrationPromise:t}=await et(e);t&&await t}function eg(e){return L.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let em="installations";(0,f._registerComponent)(new m.wA(em,e=>{let t=e.getProvider("app").getImmediate(),n=/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(!e||!e.options)throw eg("App Configuration");if(!e.name)throw eg("App Name");for(let t of["projectId","apiKey","appId"])if(!e.options[t])throw eg(t);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t),r=(0,f._getProvider)(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},"PUBLIC")),(0,f._registerComponent)(new m.wA("installations-internal",e=>{let t=e.getProvider("app").getImmediate(),n=(0,f._getProvider)(t,em).getImmediate();return{getId:()=>ed(n),getToken:e=>ef(n,e)}},"PRIVATE")),(0,f.registerVersion)(k,D),(0,f.registerVersion)(k,D,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let e_="analytics",ev="https://www.googletagmanager.com/gtag/js",ey=new p.Yd("@firebase/analytics"),eb=new g.LL("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ew(e){if(!e.startsWith(ev)){let t=eb.create("invalid-gtag-resource",{gtagURL:e});return ey.warn(t.message),""}return e}function eE(e){return Promise.all(e.map(e=>e.catch(e=>e)))}async function eI(e,t,n,r,i,s){let a=r[i];try{if(a)await t[a];else{let e=(await eE(n)).find(e=>e.measurementId===i);e&&await t[e.appId]}}catch(e){ey.error(e)}e("config",i,s)}async function eT(e,t,n,r,i){try{let s=[];if(i&&i.send_to){let e=i.send_to;Array.isArray(e)||(e=[e]);let r=await eE(n);for(let n of e){let e=r.find(e=>e.measurementId===n),i=e&&t[e.appId];if(i)s.push(i);else{s=[];break}}}0===s.length&&(s=Object.values(t)),await Promise.all(s),e("event",r,i||{})}catch(e){ey.error(e)}}class eC{constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}let eS=new eC;async function eA(e){var t;let{appId:n,apiKey:r}=e,i={method:"GET",headers:new Headers({Accept:"application/json","x-goog-api-key":r})},s="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",n),a=await fetch(s,i);if(200!==a.status&&304!==a.status){let e="";try{let n=await a.json();(null===(t=n.error)||void 0===t?void 0:t.message)&&(e=n.error.message)}catch(e){}throw eb.create("config-fetch-failed",{httpStatus:a.status,responseMessage:e})}return a.json()}async function eR(e,t=eS,n){let{appId:r,apiKey:i,measurementId:s}=e.options;if(!r)throw eb.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw eb.create("no-api-key")}let a=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},o=new ek;return setTimeout(async()=>{o.abort()},void 0!==n?n:6e4),eO({appId:r,apiKey:i,measurementId:s},a,o,t)}async function eO(e,{throttleEndTimeMillis:t,backoffCount:n},r,i=eS){var s;let{appId:a,measurementId:o}=e;try{await new Promise((e,n)=>{let i=setTimeout(e,Math.max(t-Date.now(),0));r.addEventListener(()=>{clearTimeout(i),n(eb.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}catch(e){if(o)return ey.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${null==e?void 0:e.message}]`),{appId:a,measurementId:o};throw e}try{let t=await eA(e);return i.deleteThrottleMetadata(a),t}catch(h){if(!function(e){if(!(e instanceof g.ZR)||!e.customData)return!1;let t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(h)){if(i.deleteThrottleMetadata(a),o)return ey.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${null==h?void 0:h.message}]`),{appId:a,measurementId:o};throw h}let t=503===Number(null===(s=null==h?void 0:h.customData)||void 0===s?void 0:s.httpStatus)?(0,g.$s)(n,i.intervalMillis,30):(0,g.$s)(n,i.intervalMillis),l={throttleEndTimeMillis:Date.now()+t,backoffCount:n+1};return i.setThrottleMetadata(a,l),ey.debug(`Calling attemptFetch again in ${t} millis`),eO(e,l,r,i)}}class ek{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function eD(e,t,n,r,i){if(i&&i.global){e("event",n,r);return}{let i=await t;e("event",n,Object.assign(Object.assign({},r),{send_to:i}))}}async function eP(e,t,n,r){if(r&&r.global)return e("set",{screen_name:n}),Promise.resolve();e("config",await t,{update:!0,screen_name:n})}async function eN(e,t,n,r){if(r&&r.global)return e("set",{user_id:n}),Promise.resolve();e("config",await t,{update:!0,user_id:n})}async function eL(e,t,n,r){if(r&&r.global){let t={};for(let e of Object.keys(n))t[`user_properties.${e}`]=n[e];return e("set",t),Promise.resolve()}e("config",await t,{update:!0,user_properties:n})}async function ex(e,t){let n=await e;window[`ga-disable-${n}`]=!t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eU(){if(!(0,g.hl)())return ey.warn(eb.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await (0,g.eu)()}catch(e){return ey.warn(eb.create("indexeddb-unavailable",{errorInfo:null==e?void 0:e.toString()}).message),!1}return!0}async function eM(e,t,n,r,i,o,l){var h;let u=eR(e);u.then(t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&ey.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(e=>ey.error(e)),t.push(u);let c=eU().then(e=>e?r.getId():void 0),[d,f]=await Promise.all([u,c]);!function(e){for(let t of Object.values(window.document.getElementsByTagName("script")))if(t.src&&t.src.includes(ev)&&t.src.includes(e))return t;return null}(o)&&function(e,t){let n;let r=(window.trustedTypes&&(n=window.trustedTypes.createPolicy("firebase-js-sdk-policy",{createScriptURL:ew})),n),i=document.createElement("script"),s=`${ev}?l=${e}&id=${t}`;i.src=r?null==r?void 0:r.createScriptURL(s):s,i.async=!0,document.head.appendChild(i)}(o,d.measurementId),a&&(i("consent","default",a),a=void 0),i("js",new Date);let p=null!==(h=null==l?void 0:l.config)&&void 0!==h?h:{};return p.origin="firebase",p.update=!0,null!=f&&(p.firebase_id=f),i("config",d.measurementId,p),s&&(i("set",s),s=void 0),d.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eB{constructor(e){this.app=e}_delete(){return delete ej[this.app.options.appId],Promise.resolve()}}let ej={},eF=[],eH={},e$="dataLayer",eW="gtag",eV=!1;function ez(e){if(eV)throw eb.create("already-initialized");e.dataLayerName&&(e$=e.dataLayerName),e.gtagName&&(eW=e.gtagName)}async function eq(){if((0,g.ru)()||!(0,g.zI)()||!(0,g.hl)())return!1;try{return await (0,g.eu)()}catch(e){return!1}}function eG(e,t,n,r){e=(0,g.m9)(e),eD(l,ej[e.app.options.appId],t,n,r).catch(e=>ey.error(e))}let eK="@firebase/analytics",eX="0.10.0";(0,f._registerComponent)(new m.wA(e_,(e,{options:t})=>(function(e,t,n){!function(){let e=[];if((0,g.ru)()&&e.push("This is a browser extension environment."),(0,g.zI)()||e.push("Cookies are not available."),e.length>0){let t=e.map((e,t)=>`(${t+1}) ${e}`).join(" "),n=eb.create("invalid-analytics-context",{errorInfo:t});ey.warn(n.message)}}();let r=e.options.appId;if(!r)throw eb.create("no-app-id");if(!e.options.apiKey){if(e.options.measurementId)ey.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw eb.create("no-api-key")}if(null!=ej[r])throw eb.create("already-exists",{id:r});if(!eV){var i,s,a,h;let e,t;i=e$,e=[],Array.isArray(window[i])?e=window[i]:window[i]=e;let{wrappedGtag:n,gtagCore:r}=(s=e$,a=eW,t=function(...e){window[s].push(arguments)},window[a]&&"function"==typeof window[a]&&(t=window[a]),window[a]=(h=t,async function(e,...t){try{if("event"===e){let[e,n]=t;await eT(h,ej,eF,e,n)}else if("config"===e){let[e,n]=t;await eI(h,ej,eF,eH,e,n)}else if("consent"===e){let[e]=t;h("consent","update",e)}else if("get"===e){let[e,n,r]=t;h("get",e,n,r)}else if("set"===e){let[e]=t;h("set",e)}else h(e,...t)}catch(e){ey.error(e)}}),{gtagCore:t,wrappedGtag:window[a]});l=n,o=r,eV=!0}return ej[r]=eM(e,eF,eH,t,o,e$,n),new eB(e)})(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),t),"PUBLIC")),(0,f._registerComponent)(new m.wA("analytics-internal",function(e){try{let t=e.getProvider(e_).getImmediate();return{logEvent:(e,n,r)=>eG(t,e,n,r)}}catch(e){throw eb.create("interop-component-reg-failed",{reason:e})}},"PRIVATE")),(0,f.registerVersion)(eK,eX),(0,f.registerVersion)(eK,eX,"esm2017");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eJ{constructor(e,t){this.app=e,this._delegate=t}logEvent(e,t,n){eG(this._delegate,e,t,n)}setCurrentScreen(e,t){var n;n=this._delegate,n=(0,g.m9)(n),eP(l,ej[n.app.options.appId],e,t).catch(e=>ey.error(e))}setUserId(e,t){var n;n=this._delegate,n=(0,g.m9)(n),eN(l,ej[n.app.options.appId],e,t).catch(e=>ey.error(e))}setUserProperties(e,t){var n;n=this._delegate,n=(0,g.m9)(n),eL(l,ej[n.app.options.appId],e,t).catch(e=>ey.error(e))}setAnalyticsCollectionEnabled(e){!function(e,t){ex(ej[(e=(0,g.m9)(e)).app.options.appId],t).catch(e=>ey.error(e))}(this._delegate,e)}}(u=c||(c={})).ADD_SHIPPING_INFO="add_shipping_info",u.ADD_PAYMENT_INFO="add_payment_info",u.ADD_TO_CART="add_to_cart",u.ADD_TO_WISHLIST="add_to_wishlist",u.BEGIN_CHECKOUT="begin_checkout",u.CHECKOUT_PROGRESS="checkout_progress",u.EXCEPTION="exception",u.GENERATE_LEAD="generate_lead",u.LOGIN="login",u.PAGE_VIEW="page_view",u.PURCHASE="purchase",u.REFUND="refund",u.REMOVE_FROM_CART="remove_from_cart",u.SCREEN_VIEW="screen_view",u.SEARCH="search",u.SELECT_CONTENT="select_content",u.SELECT_ITEM="select_item",u.SELECT_PROMOTION="select_promotion",u.SET_CHECKOUT_OPTION="set_checkout_option",u.SHARE="share",u.SIGN_UP="sign_up",u.TIMING_COMPLETE="timing_complete",u.VIEW_CART="view_cart",u.VIEW_ITEM="view_item",u.VIEW_ITEM_LIST="view_item_list",u.VIEW_PROMOTION="view_promotion",u.VIEW_SEARCH_RESULTS="view_search_results";/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eZ=e=>new eJ(e.getProvider("app-compat").getImmediate(),e.getProvider("analytics").getImmediate());!function(){let e={Analytics:eJ,settings:ez,isSupported:eq,EventName:c};d.Z.INTERNAL.registerComponent(new m.wA("analytics-compat",eZ,"PUBLIC").setServiceProps(e).setMultipleInstances(!0))}(),d.Z.registerVersion("@firebase/analytics-compat","0.2.6")},8199:function(e,t,n){"use strict";n.d(t,{Z:function(){return r.Z}});var r=n(9366);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */r.Z.registerVersion("firebase","10.7.1","app-compat")},8003:function(e,t,n){"use strict";var r,i=n(9366),s=n(7350),a=n(8745);n(3991),n(6914);var o=n(5538);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l(){return window}async function h(e,t,n){var r;let{BuildInfo:i}=l();(0,s.au)(t.sessionId,"AuthEvent did not contain a session ID");let a=await d(t.sessionId),o={};return(0,s.av)()?o.ibi=i.packageName:(0,s.aw)()?o.apn=i.packageName:(0,s.ax)(e,"operation-not-supported-in-this-environment"),i.displayName&&(o.appDisplayName=i.displayName),o.sessionId=a,(0,s.ay)(e,n,t.type,void 0,null!==(r=t.eventId)&&void 0!==r?r:void 0,o)}async function u(e){let{BuildInfo:t}=l(),n={};(0,s.av)()?n.iosBundleId=t.packageName:(0,s.aw)()?n.androidPackageName=t.packageName:(0,s.ax)(e,"operation-not-supported-in-this-environment"),await (0,s.az)(e,n)}async function c(e,t,n){let{cordova:r}=l(),i=()=>{};try{await new Promise((a,o)=>{let l=null;function h(){var e;a();let t=null===(e=r.plugins.browsertab)||void 0===e?void 0:e.close;"function"==typeof t&&t(),"function"==typeof(null==n?void 0:n.close)&&n.close()}function u(){l||(l=window.setTimeout(()=>{o((0,s.aB)(e,"redirect-cancelled-by-user"))},2e3))}function c(){(null==document?void 0:document.visibilityState)==="visible"&&u()}t.addPassiveListener(h),document.addEventListener("resume",u,!1),(0,s.aw)()&&document.addEventListener("visibilitychange",c,!1),i=()=>{t.removePassiveListener(h),document.removeEventListener("resume",u,!1),document.removeEventListener("visibilitychange",c,!1),l&&window.clearTimeout(l)}})}finally{i()}}async function d(e){let t=function(e){if((0,s.au)(/[0-9a-zA-Z]+/.test(e),"Can only convert alpha-numeric strings"),"undefined"!=typeof TextEncoder)return new TextEncoder().encode(e);let t=new ArrayBuffer(e.length),n=new Uint8Array(t);for(let t=0;t<e.length;t++)n[t]=e.charCodeAt(t);return n}(e),n=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(e=>e.toString(16).padStart(2,"0")).join("")}class f extends s.aD{constructor(){super(...arguments),this.passiveListeners=new Set,this.initPromise=new Promise(e=>{this.resolveInialized=e})}addPassiveListener(e){this.passiveListeners.add(e)}removePassiveListener(e){this.passiveListeners.delete(e)}resetRedirect(){this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1}onEvent(e){return this.resolveInialized(),this.passiveListeners.forEach(t=>t(e)),super.onEvent(e)}async initialized(){await this.initPromise}}async function p(e){let t=await g()._get(m(e));return t&&await g()._remove(m(e)),t}function g(){return(0,s.aE)(s.b)}function m(e){return(0,s.aF)("authEvent",e.config.apiKey,e.name)}function _(e){if(!(null==e?void 0:e.includes("?")))return{};let[t,...n]=e.split("?");return(0,a.zd)(n.join("?"))}class v{constructor(){this._redirectPersistence=s.a,this._shouldInitProactively=!0,this.eventManagers=new Map,this.originValidationPromises={},this._completeRedirectFn=s.aG,this._overrideRedirectResult=s.aH}async _initialize(e){let t=e._key(),n=this.eventManagers.get(t);return n||(n=new f(e),this.eventManagers.set(t,n),this.attachCallbackListeners(e,n)),n}_openPopup(e){(0,s.ax)(e,"operation-not-supported-in-this-environment")}async _openRedirect(e,t,n,r){!function(e){var t,n,r,i,a,o,h,u,c,d;let f=l();(0,s.aC)("function"==typeof(null===(t=null==f?void 0:f.universalLinks)||void 0===t?void 0:t.subscribe),e,"invalid-cordova-configuration",{missingPlugin:"cordova-universal-links-plugin-fix"}),(0,s.aC)(void 0!==(null===(n=null==f?void 0:f.BuildInfo)||void 0===n?void 0:n.packageName),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-buildInfo"}),(0,s.aC)("function"==typeof(null===(a=null===(i=null===(r=null==f?void 0:f.cordova)||void 0===r?void 0:r.plugins)||void 0===i?void 0:i.browsertab)||void 0===a?void 0:a.openUrl),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),(0,s.aC)("function"==typeof(null===(u=null===(h=null===(o=null==f?void 0:f.cordova)||void 0===o?void 0:o.plugins)||void 0===h?void 0:h.browsertab)||void 0===u?void 0:u.isAvailable),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-browsertab"}),(0,s.aC)("function"==typeof(null===(d=null===(c=null==f?void 0:f.cordova)||void 0===c?void 0:c.InAppBrowser)||void 0===d?void 0:d.open),e,"invalid-cordova-configuration",{missingPlugin:"cordova-plugin-inappbrowser"})}(e);let i=await this._initialize(e);await i.initialized(),i.resetRedirect(),(0,s.aI)(),await this._originValidation(e);let a=function(e,t,n=null){return{type:t,eventId:n,urlResponse:null,sessionId:function(){let e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let n=0;n<20;n++){let n=Math.floor(Math.random()*t.length);e.push(t.charAt(n))}return e.join("")}(),postBody:null,tenantId:e.tenantId,error:(0,s.aB)(e,"no-auth-event")}}(e,n,r);await g()._set(m(e),a);let o=await h(e,a,t);return c(e,i,await function(e){let{cordova:t}=l();return new Promise(n=>{t.plugins.browsertab.isAvailable(r=>{let i=null;r?t.plugins.browsertab.openUrl(e):i=t.InAppBrowser.open(e,(0,s.aA)()?"_blank":"_system","location=yes"),n(i)})})}(o))}_isIframeWebStorageSupported(e,t){throw Error("Method not implemented.")}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=u(e)),this.originValidationPromises[t]}attachCallbackListeners(e,t){let{universalLinks:n,handleOpenURL:r,BuildInfo:i}=l(),a=setTimeout(async()=>{await p(e),t.onEvent(y())},500),o=async n=>{clearTimeout(a);let r=await p(e),i=null;r&&(null==n?void 0:n.url)&&(i=function(e,t){var n,r;let i=function(e){let t=_(e),n=t.link?decodeURIComponent(t.link):void 0,r=_(n).link,i=t.deep_link_id?decodeURIComponent(t.deep_link_id):void 0;return _(i).link||i||r||n||e}(t);if(i.includes("/__/auth/callback")){let t=_(i),a=t.firebaseError?function(e){try{return JSON.parse(e)}catch(e){return null}}(decodeURIComponent(t.firebaseError)):null,o=null===(r=null===(n=null==a?void 0:a.code)||void 0===n?void 0:n.split("auth/"))||void 0===r?void 0:r[1],l=o?(0,s.aB)(o):null;return l?{type:e.type,eventId:e.eventId,tenantId:e.tenantId,error:l,urlResponse:null,sessionId:null,postBody:null}:{type:e.type,eventId:e.eventId,tenantId:e.tenantId,sessionId:e.sessionId,urlResponse:i,postBody:null}}return null}(r,n.url)),t.onEvent(i||y())};void 0!==n&&"function"==typeof n.subscribe&&n.subscribe(null,o);let h=`${i.packageName.toLowerCase()}://`;l().handleOpenURL=async e=>{if(e.toLowerCase().startsWith(h)&&o({url:e}),"function"==typeof r)try{r(e)}catch(e){console.error(e)}}}}function y(){return{type:"unknown",eventId:null,sessionId:null,urlResponse:null,postBody:null,tenantId:null,error:(0,s.aB)("no-auth-event")}}function b(){var e;return(null===(e=null==self?void 0:self.location)||void 0===e?void 0:e.protocol)||null}function w(e=(0,a.z$)()){return!!(("file:"===b()||"ionic:"===b()||"capacitor:"===b())&&e.toLowerCase().match(/iphone|ipad|ipod|android/))}function E(){try{let e=self.localStorage,t=s.aN();if(e){if(e.setItem(t,"1"),e.removeItem(t),function(e=(0,a.z$)()){return(0,a.w1)()&&(null==document?void 0:document.documentMode)===11||function(e=(0,a.z$)()){return/Edge\/\d+/.test(e)}(e)}())return(0,a.hl)();return!0}}catch(e){return I()&&(0,a.hl)()}return!1}function I(){return void 0!==n.g&&"WorkerGlobalScope"in n.g&&"importScripts"in n.g}function T(){return("http:"===b()||"https:"===b()||(0,a.ru)()||w())&&!((0,a.b$)()||(0,a.UG)())&&E()&&!I()}function C(){return w()&&"undefined"!=typeof document}async function S(){return!!C()&&new Promise(e=>{let t=setTimeout(()=>{e(!1)},1e3);document.addEventListener("deviceready",()=>{clearTimeout(t),e(!0)})})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let A={LOCAL:"local",NONE:"none",SESSION:"session"},R=s.aC,O="persistence";async function k(e){await e._initializationPromise;let t=D(),n=s.aF(O,e.config.apiKey,e.name);t&&t.setItem(n,e._getPersistence())}function D(){var e;try{return(null===(e="undefined"!=typeof window?window:null)||void 0===e?void 0:e.sessionStorage)||null}catch(e){return null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let P=s.aC;class N{constructor(){this.browserResolver=s.aE(s.k),this.cordovaResolver=s.aE(v),this.underlyingResolver=null,this._redirectPersistence=s.a,this._completeRedirectFn=s.aG,this._overrideRedirectResult=s.aH}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,t,n,r){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,t,n,r)}async _openRedirect(e,t,n,r){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,t,n,r)}_isIframeWebStorageSupported(e,t){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,t)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return C()||this.browserResolver._shouldInitProactively}get assertedUnderlyingResolver(){return P(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;let e=await S();this.underlyingResolver=e?this.cordovaResolver:this.browserResolver}}function L(e){let t;let{_tokenResponse:n}=e instanceof a.ZR?e.customData:e;if(!n)return null;if(!(e instanceof a.ZR)&&"temporaryProof"in n&&"phoneNumber"in n)return s.P.credentialFromResult(e);let r=n.providerId;if(!r||r===s.p.PASSWORD)return null;switch(r){case s.p.GOOGLE:t=s.X;break;case s.p.FACEBOOK:t=s.W;break;case s.p.GITHUB:t=s.Y;break;case s.p.TWITTER:t=s.$;break;default:let{oauthIdToken:i,oauthAccessToken:o,oauthTokenSecret:l,pendingToken:h,nonce:u}=n;if(!o&&!l&&!i&&!h)return null;if(h){if(r.startsWith("saml."))return s.aQ._create(r,h);return s.N._fromParams({providerId:r,signInMethod:r,pendingToken:h,idToken:i,accessToken:o})}return new s.Z(r).credential({idToken:i,accessToken:o,rawNonce:u})}return e instanceof a.ZR?t.credentialFromError(e):t.credentialFromResult(e)}function x(e,t){return t.catch(t=>{throw t instanceof a.ZR&&function(e,t){var n;let r=null===(n=t.customData)||void 0===n?void 0:n._tokenResponse;if((null==t?void 0:t.code)==="auth/multi-factor-auth-required")t.resolver=new M(e,s.as(e,t));else if(r){let e=L(t);e&&(t.credential=e,t.tenantId=r.tenantId||void 0,t.email=r.email||void 0,t.phoneNumber=r.phoneNumber||void 0)}}(e,t),t}).then(e=>{let t=e.operationType,n=e.user;return{operationType:t,credential:L(e),additionalUserInfo:s.aq(e),user:B.getOrCreate(n)}})}async function U(e,t){let n=await t;return{verificationId:n.verificationId,confirm:t=>x(e,n.confirm(t))}}class M{constructor(e,t){this.resolver=t,this.auth=e.wrapped()}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return x(this.auth.unwrap(),this.resolver.resolveSignIn(e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e){this._delegate=e,this.multiFactor=s.at(e)}static getOrCreate(e){return B.USER_MAP.has(e)||B.USER_MAP.set(e,new B(e)),B.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return x(this.auth,s.a2(this._delegate,e))}async linkWithPhoneNumber(e,t){return U(this.auth,s.l(this._delegate,e,t))}async linkWithPopup(e){return x(this.auth,s.d(this._delegate,e,N))}async linkWithRedirect(e){return await k(s.aJ(this.auth)),s.g(this._delegate,e,N)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return x(this.auth,s.a3(this._delegate,e))}reauthenticateWithPhoneNumber(e,t){return U(this.auth,s.r(this._delegate,e,t))}reauthenticateWithPopup(e){return x(this.auth,s.e(this._delegate,e,N))}async reauthenticateWithRedirect(e){return await k(s.aJ(this.auth)),s.h(this._delegate,e,N)}sendEmailVerification(e){return s.ag(this._delegate,e)}async unlink(e){return await s.ap(this._delegate,e),this}updateEmail(e){return s.al(this._delegate,e)}updatePassword(e){return s.am(this._delegate,e)}updatePhoneNumber(e){return s.u(this._delegate,e)}updateProfile(e){return s.ak(this._delegate,e)}verifyBeforeUpdateEmail(e,t){return s.ah(this._delegate,e,t)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}}B.USER_MAP=new WeakMap;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let j=s.aC;class F{constructor(e,t){if(this.app=e,t.isInitialized()){this._delegate=t.getImmediate(),this.linkUnderlyingAuth();return}let{apiKey:n}=e.options;j(n,"invalid-api-key",{appName:e.name}),j(n,"invalid-api-key",{appName:e.name});let r="undefined"!=typeof window?N:void 0;this._delegate=t.initialize({options:{persistence:function(e,t){let n=function(e,t){let n=D();if(!n)return[];let r=s.aF(O,e,t);switch(n.getItem(r)){case A.NONE:return[s.U];case A.LOCAL:return[s.i,s.a];case A.SESSION:return[s.a];default:return[]}}(e,t);if("undefined"==typeof self||n.includes(s.i)||n.push(s.i),"undefined"!=typeof window)for(let e of[s.b,s.a])n.includes(e)||n.push(e);return n.includes(s.U)||n.push(s.U),n}(n,e.name),popupRedirectResolver:r}}),this._delegate._updateErrorMap(s.G),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?B.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}set languageCode(e){this._delegate.languageCode=e}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}set tenantId(e){this._delegate.tenantId=e}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,t){s.K(this._delegate,e,t)}applyActionCode(e){return s.a7(this._delegate,e)}checkActionCode(e){return s.a8(this._delegate,e)}confirmPasswordReset(e,t){return s.a6(this._delegate,e,t)}async createUserWithEmailAndPassword(e,t){return x(this._delegate,s.aa(this._delegate,e,t))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return s.af(this._delegate,e)}isSignInWithEmailLink(e){return s.ad(this._delegate,e)}async getRedirectResult(){j(T(),this._delegate,"operation-not-supported-in-this-environment");let e=await s.j(this._delegate,N);return e?x(this._delegate,Promise.resolve(e)):{credential:null,user:null}}addFrameworkForLogging(e){!/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t){(0,s.aJ)(e)._logFramework(t)}(this._delegate,e)}onAuthStateChanged(e,t,n){let{next:r,error:i,complete:s}=H(e,t,n);return this._delegate.onAuthStateChanged(r,i,s)}onIdTokenChanged(e,t,n){let{next:r,error:i,complete:s}=H(e,t,n);return this._delegate.onIdTokenChanged(r,i,s)}sendSignInLinkToEmail(e,t){return s.ac(this._delegate,e,t)}sendPasswordResetEmail(e,t){return s.a5(this._delegate,e,t||void 0)}async setPersistence(e){let t;switch(!function(e,t){if(R(Object.values(A).includes(t),e,"invalid-persistence-type"),(0,a.b$)()){R(t!==A.SESSION,e,"unsupported-persistence-type");return}if((0,a.UG)()){R(t===A.NONE,e,"unsupported-persistence-type");return}if(I()){R(t===A.NONE||t===A.LOCAL&&(0,a.hl)(),e,"unsupported-persistence-type");return}R(t===A.NONE||E(),e,"unsupported-persistence-type")}(this._delegate,e),e){case A.SESSION:t=s.a;break;case A.LOCAL:t=await s.aE(s.i)._isAvailable()?s.i:s.b;break;case A.NONE:t=s.U;break;default:return s.ax("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(t)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return x(this._delegate,s.a0(this._delegate))}signInWithCredential(e){return x(this._delegate,s.a1(this._delegate,e))}signInWithCustomToken(e){return x(this._delegate,s.a4(this._delegate,e))}signInWithEmailAndPassword(e,t){return x(this._delegate,s.ab(this._delegate,e,t))}signInWithEmailLink(e,t){return x(this._delegate,s.ae(this._delegate,e,t))}signInWithPhoneNumber(e,t){return U(this._delegate,s.s(this._delegate,e,t))}async signInWithPopup(e){return j(T(),this._delegate,"operation-not-supported-in-this-environment"),x(this._delegate,s.c(this._delegate,e,N))}async signInWithRedirect(e){return j(T(),this._delegate,"operation-not-supported-in-this-environment"),await k(this._delegate),s.f(this._delegate,e,N)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return s.a9(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}function H(e,t,n){let r=e;"function"!=typeof e&&({next:r,error:t,complete:n}=e);let i=r;return{next:e=>i(e&&B.getOrCreate(e)),error:t,complete:n}}F.Persistence=A;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(){this.providerId="phone",this._delegate=new s.P(i.Z.auth().unwrap())}static credential(e,t){return s.P.credential(e,t)}verifyPhoneNumber(e,t){return this._delegate.verifyPhoneNumber(e,t)}unwrap(){return this._delegate}}$.PHONE_SIGN_IN_METHOD=s.P.PHONE_SIGN_IN_METHOD,$.PROVIDER_ID=s.P.PROVIDER_ID;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let W=s.aC;class V{constructor(e,t,n=i.Z.app()){var r;W(null===(r=n.options)||void 0===r?void 0:r.apiKey,"invalid-api-key",{appName:n.name}),this._delegate=new s.R(n.auth(),e,t),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}(r=i.Z).INTERNAL.registerComponent(new o.wA("auth-compat",e=>new F(e.getProvider("app-compat").getImmediate(),e.getProvider("auth")),"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:s.A.EMAIL_SIGNIN,PASSWORD_RESET:s.A.PASSWORD_RESET,RECOVER_EMAIL:s.A.RECOVER_EMAIL,REVERT_SECOND_FACTOR_ADDITION:s.A.REVERT_SECOND_FACTOR_ADDITION,VERIFY_AND_CHANGE_EMAIL:s.A.VERIFY_AND_CHANGE_EMAIL,VERIFY_EMAIL:s.A.VERIFY_EMAIL}},EmailAuthProvider:s.V,FacebookAuthProvider:s.W,GithubAuthProvider:s.Y,GoogleAuthProvider:s.X,OAuthProvider:s.Z,SAMLAuthProvider:s._,PhoneAuthProvider:$,PhoneMultiFactorGenerator:s.m,RecaptchaVerifier:V,TwitterAuthProvider:s.$,Auth:F,AuthCredential:s.L,Error:a.ZR}).setInstantiationMode("LAZY").setMultipleInstances(!1)),r.registerVersion("@firebase/auth-compat","0.5.1")},3884:function(e,t,n){"use strict";var r,i=n(9366),s=n(9978),a=n(8745),o=n(5538);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l(e,t){if(void 0===t)return{merge:!1};if(void 0!==t.mergeFields&&void 0!==t.merge)throw new s.WA("invalid-argument",`Invalid options passed to function ${e}(): You cannot specify both "merge" and "mergeFields".`);return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h(){if("undefined"==typeof Uint8Array)throw new s.WA("unimplemented","Uint8Arrays are not available in this environment.")}function u(){if(!(0,s.Me)())throw new s.WA("unimplemented","Blobs are unavailable in Firestore in this environment.")}class c{constructor(e){this._delegate=e}static fromBase64String(e){return u(),new c(s.Jj.fromBase64String(e))}static fromUint8Array(e){return h(),new c(s.Jj.fromUint8Array(e))}toBase64(){return u(),this._delegate.toBase64()}toUint8Array(){return h(),this._delegate.toUint8Array()}isEqual(e){return this._delegate.isEqual(e._delegate)}toString(){return"Blob(base64: "+this.toBase64()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d(e){return function(e,t){if("object"!=typeof e||null===e)return!1;for(let n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f{enableIndexedDbPersistence(e,t){return(0,s.ST)(e._delegate,{forceOwnership:t})}enableMultiTabIndexedDbPersistence(e){return(0,s.fH)(e._delegate)}clearIndexedDbPersistence(e){return(0,s.Fc)(e._delegate)}}class p{constructor(e,t,n){this._delegate=t,this._persistenceProvider=n,this.INTERNAL={delete:()=>this.terminate()},e instanceof s.l7||(this._appCompat=e)}get _databaseId(){return this._delegate._databaseId}settings(e){let t=this._delegate._getSettings();e.merge||t.host===e.host||(0,s.yq)("You are overriding the original host. If you did not intend to override your settings, use {merge: true}."),e.merge&&(e=Object.assign(Object.assign({},t),e),delete e.merge),this._delegate._setSettings(e)}useEmulator(e,t,n={}){(0,s.at)(this._delegate,e,t,n)}enableNetwork(){return(0,s.Ix)(this._delegate)}disableNetwork(){return(0,s.TF)(this._delegate)}enablePersistence(e){let t=!1,n=!1;return e&&(t=!!e.synchronizeTabs,n=!!e.experimentalForceOwningTab,(0,s.Wi)("synchronizeTabs",t,"experimentalForceOwningTab",n)),t?this._persistenceProvider.enableMultiTabIndexedDbPersistence(this):this._persistenceProvider.enableIndexedDbPersistence(this,n)}clearPersistence(){return this._persistenceProvider.clearIndexedDbPersistence(this)}terminate(){return this._appCompat&&(this._appCompat._removeServiceInstance("firestore-compat"),this._appCompat._removeServiceInstance("firestore")),this._delegate._delete()}waitForPendingWrites(){return(0,s.Mx)(this._delegate)}onSnapshotsInSync(e){return(0,s.sc)(this._delegate,e)}get app(){if(!this._appCompat)throw new s.WA("failed-precondition","Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._appCompat}collection(e){try{return new R(this,(0,s.hJ)(this._delegate,e))}catch(e){throw b(e,"collection()","Firestore.collection()")}}doc(e){try{return new y(this,(0,s.JU)(this._delegate,e))}catch(e){throw b(e,"doc()","Firestore.doc()")}}collectionGroup(e){try{return new C(this,(0,s.B$)(this._delegate,e))}catch(e){throw b(e,"collectionGroup()","Firestore.collectionGroup()")}}runTransaction(e){return(0,s.i3)(this._delegate,t=>e(new m(this,t)))}batch(){return(0,s.qY)(this._delegate),new _(new s.PU(this._delegate,e=>(0,s.GL)(this._delegate,e)))}loadBundle(e){return(0,s.Pb)(this._delegate,e)}namedQuery(e){return(0,s.L$)(this._delegate,e).then(e=>e?new C(this,e):null)}}class g extends s.u7{constructor(e){super(),this.firestore=e}convertBytes(e){return new c(new s.Jj(e))}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return y.forKey(t,this.firestore,null)}}class m{constructor(e,t){this._firestore=e,this._delegate=t,this._userDataWriter=new g(e)}get(e){let t=O(e);return this._delegate.get(t).then(e=>new I(this._firestore,new s.xU(this._firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,t.converter)))}set(e,t,n){let r=O(e);return n?(l("Transaction.set",n),this._delegate.set(r,t,n)):this._delegate.set(r,t),this}update(e,t,n,...r){let i=O(e);return 2==arguments.length?this._delegate.update(i,t):this._delegate.update(i,t,n,...r),this}delete(e){let t=O(e);return this._delegate.delete(t),this}}class _{constructor(e){this._delegate=e}set(e,t,n){let r=O(e);return n?(l("WriteBatch.set",n),this._delegate.set(r,t,n)):this._delegate.set(r,t),this}update(e,t,n,...r){let i=O(e);return 2==arguments.length?this._delegate.update(i,t):this._delegate.update(i,t,n,...r),this}delete(e){let t=O(e);return this._delegate.delete(t),this}commit(){return this._delegate.commit()}}class v{constructor(e,t,n){this._firestore=e,this._userDataWriter=t,this._delegate=n}fromFirestore(e,t){let n=new s.$q(this._firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,null);return this._delegate.fromFirestore(new T(this._firestore,n),null!=t?t:{})}toFirestore(e,t){return t?this._delegate.toFirestore(e,t):this._delegate.toFirestore(e)}static getInstance(e,t){let n=v.INSTANCES,r=n.get(e);r||(r=new WeakMap,n.set(e,r));let i=r.get(t);return i||(i=new v(e,new g(e),t),r.set(t,i)),i}}v.INSTANCES=new WeakMap;class y{constructor(e,t){this.firestore=e,this._delegate=t,this._userDataWriter=new g(e)}static forPath(e,t,n){if(e.length%2!=0)throw new s.WA("invalid-argument",`Invalid document reference. Document references must have an even number of segments, but ${e.canonicalString()} has ${e.length}`);return new y(t,new s.my(t._delegate,n,new s.Ky(e)))}static forKey(e,t,n){return new y(t,new s.my(t._delegate,n,e))}get id(){return this._delegate.id}get parent(){return new R(this.firestore,this._delegate.parent)}get path(){return this._delegate.path}collection(e){try{return new R(this.firestore,(0,s.hJ)(this._delegate,e))}catch(e){throw b(e,"collection()","DocumentReference.collection()")}}isEqual(e){return(e=(0,a.m9)(e))instanceof s.my&&(0,s.Eo)(this._delegate,e)}set(e,t){t=l("DocumentReference.set",t);try{if(t)return(0,s.pl)(this._delegate,e,t);return(0,s.pl)(this._delegate,e)}catch(e){throw b(e,"setDoc()","DocumentReference.set()")}}update(e,t,...n){try{if(1==arguments.length)return(0,s.r7)(this._delegate,e);return(0,s.r7)(this._delegate,e,t,...n)}catch(e){throw b(e,"updateDoc()","DocumentReference.update()")}}delete(){return(0,s.oe)(this._delegate)}onSnapshot(...e){let t=w(e),n=E(e,e=>new I(this.firestore,new s.xU(this.firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,this._delegate.converter)));return(0,s.cf)(this._delegate,t,n)}get(e){return((null==e?void 0:e.source)==="cache"?(0,s.kl)(this._delegate):(null==e?void 0:e.source)==="server"?(0,s.Xk)(this._delegate):(0,s.QT)(this._delegate)).then(e=>new I(this.firestore,new s.xU(this.firestore._delegate,this._userDataWriter,e._key,e._document,e.metadata,this._delegate.converter)))}withConverter(e){return new y(this.firestore,e?this._delegate.withConverter(v.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function b(e,t,n){return e.message=e.message.replace(t,n),e}function w(e){for(let t of e)if("object"==typeof t&&!d(t))return t;return{}}function E(e,t){var n,r;let i;return{next:e=>{i.next&&i.next(t(e))},error:null===(n=(i=d(e[0])?e[0]:d(e[1])?e[1]:"function"==typeof e[0]?{next:e[0],error:e[1],complete:e[2]}:{next:e[1],error:e[2],complete:e[3]}).error)||void 0===n?void 0:n.bind(i),complete:null===(r=i.complete)||void 0===r?void 0:r.bind(i)}}class I{constructor(e,t){this._firestore=e,this._delegate=t}get ref(){return new y(this._firestore,this._delegate.ref)}get id(){return this._delegate.id}get metadata(){return this._delegate.metadata}get exists(){return this._delegate.exists()}data(e){return this._delegate.data(e)}get(e,t){return this._delegate.get(e,t)}isEqual(e){return(0,s.qK)(this._delegate,e._delegate)}}class T extends I{data(e){let t=this._delegate.data(e);return this._delegate._converter||(0,s.K9)(void 0!==t,"Document in a QueryDocumentSnapshot should exist"),t}}class C{constructor(e,t){this.firestore=e,this._delegate=t,this._userDataWriter=new g(e)}where(e,t,n){try{return new C(this.firestore,(0,s.IO)(this._delegate,(0,s.ar)(e,t,n)))}catch(e){throw b(e,/(orderBy|where)\(\)/,"Query.$1()")}}orderBy(e,t){try{return new C(this.firestore,(0,s.IO)(this._delegate,(0,s.Xo)(e,t)))}catch(e){throw b(e,/(orderBy|where)\(\)/,"Query.$1()")}}limit(e){try{return new C(this.firestore,(0,s.IO)(this._delegate,(0,s.b9)(e)))}catch(e){throw b(e,"limit()","Query.limit()")}}limitToLast(e){try{return new C(this.firestore,(0,s.IO)(this._delegate,(0,s.vh)(e)))}catch(e){throw b(e,"limitToLast()","Query.limitToLast()")}}startAt(...e){try{return new C(this.firestore,(0,s.IO)(this._delegate,(0,s.e0)(...e)))}catch(e){throw b(e,"startAt()","Query.startAt()")}}startAfter(...e){try{return new C(this.firestore,(0,s.IO)(this._delegate,(0,s.TQ)(...e)))}catch(e){throw b(e,"startAfter()","Query.startAfter()")}}endBefore(...e){try{return new C(this.firestore,(0,s.IO)(this._delegate,(0,s.Lx)(...e)))}catch(e){throw b(e,"endBefore()","Query.endBefore()")}}endAt(...e){try{return new C(this.firestore,(0,s.IO)(this._delegate,(0,s.Wu)(...e)))}catch(e){throw b(e,"endAt()","Query.endAt()")}}isEqual(e){return(0,s.iE)(this._delegate,e._delegate)}get(e){return((null==e?void 0:e.source)==="cache"?(0,s.UQ)(this._delegate):(null==e?void 0:e.source)==="server"?(0,s.zN)(this._delegate):(0,s.PL)(this._delegate)).then(e=>new A(this.firestore,new s.W(this.firestore._delegate,this._userDataWriter,this._delegate,e._snapshot)))}onSnapshot(...e){let t=w(e),n=E(e,e=>new A(this.firestore,new s.W(this.firestore._delegate,this._userDataWriter,this._delegate,e._snapshot)));return(0,s.cf)(this._delegate,t,n)}withConverter(e){return new C(this.firestore,e?this._delegate.withConverter(v.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}class S{constructor(e,t){this._firestore=e,this._delegate=t}get type(){return this._delegate.type}get doc(){return new T(this._firestore,this._delegate.doc)}get oldIndex(){return this._delegate.oldIndex}get newIndex(){return this._delegate.newIndex}}class A{constructor(e,t){this._firestore=e,this._delegate=t}get query(){return new C(this._firestore,this._delegate.query)}get metadata(){return this._delegate.metadata}get size(){return this._delegate.size}get empty(){return this._delegate.empty}get docs(){return this._delegate.docs.map(e=>new T(this._firestore,e))}docChanges(e){return this._delegate.docChanges(e).map(e=>new S(this._firestore,e))}forEach(e,t){this._delegate.forEach(n=>{e.call(t,new T(this._firestore,n))})}isEqual(e){return(0,s.qK)(this._delegate,e._delegate)}}class R extends C{constructor(e,t){super(e,t),this.firestore=e,this._delegate=t}get id(){return this._delegate.id}get path(){return this._delegate.path}get parent(){let e=this._delegate.parent;return e?new y(this.firestore,e):null}doc(e){try{if(void 0===e)return new y(this.firestore,(0,s.JU)(this._delegate));return new y(this.firestore,(0,s.JU)(this._delegate,e))}catch(e){throw b(e,"doc()","CollectionReference.doc()")}}add(e){return(0,s.ET)(this._delegate,e).then(e=>new y(this.firestore,e))}isEqual(e){return(0,s.Eo)(this._delegate,e._delegate)}withConverter(e){return new R(this.firestore,e?this._delegate.withConverter(v.getInstance(this.firestore,e)):this._delegate.withConverter(null))}}function O(e){return(0,s.Cf)(e,s.my)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(...e){this._delegate=new s.Lz(...e)}static documentId(){return new k(s.Xb.keyField().canonicalString())}isEqual(e){return(e=(0,a.m9)(e))instanceof s.Lz&&this._delegate._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e){this._delegate=e}static serverTimestamp(){let e=(0,s.Bt)();return e._methodName="FieldValue.serverTimestamp",new D(e)}static delete(){let e=(0,s.AK)();return e._methodName="FieldValue.delete",new D(e)}static arrayUnion(...e){let t=(0,s.vr)(...e);return t._methodName="FieldValue.arrayUnion",new D(t)}static arrayRemove(...e){let t=(0,s.Ab)(...e);return t._methodName="FieldValue.arrayRemove",new D(t)}static increment(e){let t=(0,s.nP)(e);return t._methodName="FieldValue.increment",new D(t)}isEqual(e){return this._delegate.isEqual(e._delegate)}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let P={Firestore:p,GeoPoint:s.F8,Timestamp:s.EK,Blob:c,Transaction:m,WriteBatch:_,DocumentReference:y,DocumentSnapshot:I,Query:C,QueryDocumentSnapshot:T,QuerySnapshot:A,CollectionReference:R,FieldPath:k,FieldValue:D,setLogLevel:function(e){(0,s.Ub)(e)},CACHE_SIZE_UNLIMITED:s.IX};!function(e,t){e.INTERNAL.registerComponent(new o.wA("firestore-compat",e=>t(e.getProvider("app-compat").getImmediate(),e.getProvider("firestore").getImmediate()),"PUBLIC").setServiceProps(Object.assign({},P)))}(r=i.Z,(e,t)=>new p(e,t,new f)),r.registerVersion("@firebase/firestore-compat","0.3.23")},6869:function(e,t,n){"use strict";var r,i,s,a,o,l=n(9366),h=n(3991),u=n(8745),c=n(5538);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let d="firebasestorage.googleapis.com",f="storageBucket";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p extends u.ZR{constructor(e,t,n=0){super(g(e),`Firebase Storage: ${t} (${g(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,p.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return g(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}function g(e){return"storage/"+e}function m(){return new p(a.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function _(){return new p(a.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function v(){return new p(a.CANCELED,"User canceled the upload/download.")}function y(){return new p(a.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function b(e){return new p(a.INVALID_ARGUMENT,e)}function w(){return new p(a.APP_DELETED,"The Firebase app was deleted.")}function E(e){return new p(a.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function I(e,t){return new p(a.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function T(e){throw new p(a.INTERNAL_ERROR,"Internal error: "+e)}(r=a||(a={})).UNKNOWN="unknown",r.OBJECT_NOT_FOUND="object-not-found",r.BUCKET_NOT_FOUND="bucket-not-found",r.PROJECT_NOT_FOUND="project-not-found",r.QUOTA_EXCEEDED="quota-exceeded",r.UNAUTHENTICATED="unauthenticated",r.UNAUTHORIZED="unauthorized",r.UNAUTHORIZED_APP="unauthorized-app",r.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",r.INVALID_CHECKSUM="invalid-checksum",r.CANCELED="canceled",r.INVALID_EVENT_NAME="invalid-event-name",r.INVALID_URL="invalid-url",r.INVALID_DEFAULT_BUCKET="invalid-default-bucket",r.NO_DEFAULT_BUCKET="no-default-bucket",r.CANNOT_SLICE_BLOB="cannot-slice-blob",r.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",r.NO_DOWNLOAD_URL="no-download-url",r.INVALID_ARGUMENT="invalid-argument",r.INVALID_ARGUMENT_COUNT="invalid-argument-count",r.APP_DELETED="app-deleted",r.INVALID_ROOT_OPERATION="invalid-root-operation",r.INVALID_FORMAT="invalid-format",r.INTERNAL_ERROR="internal-error",r.UNSUPPORTED_ENVIRONMENT="unsupported-environment";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=C.makeFromUrl(e,t)}catch(t){return new C(e,"")}if(""===n.path)return n;throw new p(a.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}static makeFromUrl(e,t){let n=null,r="([A-Za-z0-9.\\-_]+)",i=RegExp("^gs://"+r+"(/(.*))?$","i");function s(e){e.path_=decodeURIComponent(e.path)}let o=t.replace(/[.]/g,"\\."),l=[{regex:i,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:RegExp(`^https?://${o}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:s},{regex:RegExp(`^https?://${t===d?"(?:storage.googleapis.com|storage.cloud.google.com)":t}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:s}];for(let t=0;t<l.length;t++){let r=l[t],i=r.regex.exec(e);if(i){let e=i[r.indices.bucket],t=i[r.indices.path];t||(t=""),n=new C(e,t),r.postModify(n);break}}if(null==n)throw new p(a.INVALID_URL,"Invalid URL '"+e+"'.");return n}}class S{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function A(e){return"string"==typeof e||e instanceof String}function R(e){return O()&&e instanceof Blob}function O(){return"undefined"!=typeof Blob}function k(e,t,n,r){if(r<t)throw b(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw b(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D(e,t,n){let r=t;return null==n&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function P(e){let t=encodeURIComponent,n="?";for(let r in e)e.hasOwnProperty(r)&&(n=n+(t(r)+"=")+t(e[r])+"&");return n.slice(0,-1)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N(e,t){let n=e>=500&&e<600,r=-1!==[408,429].indexOf(e),i=-1!==t.indexOf(e);return n||r||i}(i=o||(o={}))[i.NO_ERROR=0]="NO_ERROR",i[i.NETWORK_ERROR=1]="NETWORK_ERROR",i[i.ABORT=2]="ABORT";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e,t,n,r,i,s,a,o,l,h,u,c=!0){this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=s,this.callback_=a,this.errorCallback_=o,this.timeout_=l,this.progressCallback_=h,this.connectionFactory_=u,this.retry=c,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){let e=(e,t)=>{let n=this.resolve_,r=this.reject_,i=t.connection;if(t.wasSuccessCode)try{let e=this.callback_(i,i.getResponse());void 0!==e?n(e):n()}catch(e){r(e)}else if(null!==i){let e=m();e.serverResponse=i.getErrorText(),r(this.errorCallback_?this.errorCallback_(i,e):e)}else r(t.canceled?this.appDelete_?w():v():_())};this.canceled_?e(!1,new x(!1,null,!0)):this.backoffId_=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t,n){let r=1,i=null,s=null,a=!1,o=0,l=!1;function h(...e){l||(l=!0,t.apply(null,e))}function u(t){i=setTimeout(()=>{i=null,e(d,2===o)},t)}function c(){s&&clearTimeout(s)}function d(e,...t){let n;if(l){c();return}if(e||2===o||a){c(),h.call(null,e,...t);return}r<64&&(r*=2),1===o?(o=2,n=0):n=(r+Math.random())*1e3,u(n)}let f=!1;function p(e){!f&&(f=!0,c(),!l&&(null!==i?(e||(o=2),clearTimeout(i),u(0)):e||(o=1)))}return u(0),s=setTimeout(()=>{a=!0,p(!0)},n),p}((e,t)=>{if(t){e(!1,new x(!1,null,!0));return}let n=this.connectionFactory_();this.pendingConnection_=n;let r=e=>{let t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;let t=n.getErrorCode()===o.NO_ERROR,i=n.getStatus();if(!t||N(i,this.additionalRetryCodes_)&&this.retry){e(!1,new x(!1,null,n.getErrorCode()===o.ABORT));return}e(!0,new x(-1!==this.successCodes_.indexOf(i),n))})},e,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class x{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function U(...e){let t="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0;if(void 0!==t){let n=new t;for(let t=0;t<e.length;t++)n.append(e[t]);return n.getBlob()}if(O())return new Blob(e);throw new p(a.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let M={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class B{constructor(e,t){this.data=e,this.contentType=t||null}}function j(e,t){switch(e){case M.RAW:return new B(F(t));case M.BASE64:case M.BASE64URL:return new B(H(e,t));case M.DATA_URL:return new B(function(e){let t=new $(e);return t.base64?H(M.BASE64,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(e){throw I(M.DATA_URL,"Malformed data URL.")}return F(t)}(t.rest)}(t),new $(t).contentType)}throw m()}function F(e){let t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);r<=127?t.push(r):r<=2047?t.push(192|r>>6,128|63&r):(64512&r)==55296?n<e.length-1&&(64512&e.charCodeAt(n+1))==56320?(r=65536|(1023&r)<<10|1023&e.charCodeAt(++n),t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)):t.push(239,191,189):(64512&r)==56320?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(t)}function H(e,t){let n;switch(e){case M.BASE64:{let n=-1!==t.indexOf("-"),r=-1!==t.indexOf("_");if(n||r)throw I(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?");break}case M.BASE64URL:{let n=-1!==t.indexOf("+"),r=-1!==t.indexOf("/");if(n||r)throw I(e,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/")}}try{n=/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if("undefined"==typeof atob)throw new p(a.UNSUPPORTED_ENVIRONMENT,"base-64 is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.");return atob(e)}(t)}catch(t){if(t.message.includes("polyfill"))throw t;throw I(e,"Invalid character found")}let r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return r}class ${constructor(e){var t;this.base64=!1,this.contentType=null;let n=e.match(/^data:([^,]+)?,/);if(null===n)throw I(M.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");let r=n[1]||null;null!=r&&(this.base64=(t=";base64",r.length>=t.length&&r.substring(r.length-t.length)===t),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e,t){let n=0,r="";R(e)?(this.data_=e,n=e.size,r=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,t){if(!R(this.data_))return new W(new Uint8Array(this.data_.buffer,e,t-e),!0);{var n;let r=(n=this.data_).webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null;return null===r?null:new W(r)}}static getBlob(...e){if(O()){let t=e.map(e=>e instanceof W?e.data_:e);return new W(U.apply(null,t))}{let t=e.map(e=>A(e)?j(M.RAW,e).data:e.data_),n=0;t.forEach(e=>{n+=e.byteLength});let r=new Uint8Array(n),i=0;return t.forEach(e=>{for(let t=0;t<e.length;t++)r[i++]=e[t]}),new W(r,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V(e){var t;let n;try{n=JSON.parse(e)}catch(e){return null}return"object"!=typeof(t=n)||Array.isArray(t)?null:n}function z(e){let t=e.lastIndexOf("/",e.length-2);return -1===t?e:e.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(e,t){return t}class G{constructor(e,t,n,r){this.server=e,this.local=t||e,this.writable=!!n,this.xform=r||q}}let K=null;function X(){if(K)return K;let e=[];e.push(new G("bucket")),e.push(new G("generation")),e.push(new G("metageneration")),e.push(new G("name","fullPath",!0));let t=new G("name");t.xform=function(e,t){return!A(t)||t.length<2?t:z(t)},e.push(t);let n=new G("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new G("timeCreated")),e.push(new G("updated")),e.push(new G("md5Hash",null,!0)),e.push(new G("cacheControl",null,!0)),e.push(new G("contentDisposition",null,!0)),e.push(new G("contentEncoding",null,!0)),e.push(new G("contentLanguage",null,!0)),e.push(new G("contentType",null,!0)),e.push(new G("metadata","customMetadata",!0)),K=e}function J(e,t,n){let r=V(t);return null===r?null:function(e,t,n){let r={};r.type="file";let i=n.length;for(let e=0;e<i;e++){let i=n[e];r[i.local]=i.xform(r,t[i.server])}return Object.defineProperty(r,"ref",{get:function(){let t=new C(r.bucket,r.fullPath);return e._makeStorageReference(t)}}),r}(e,r,n)}function Z(e,t){let n={},r=t.length;for(let i=0;i<r;i++){let r=t[i];r.writable&&(n[r.server]=e[r.local])}return JSON.stringify(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Y="prefixes",Q="items";class ee{constructor(e,t,n,r){this.url=e,this.method=t,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(e){if(!e)throw m()}function en(e,t){return function(n,r){let i=J(e,r,t);return et(null!==i),i}}function er(e){return function(t,n){var r,i;let s;return 401===t.getStatus()?s=t.getErrorText().includes("Firebase App Check token is invalid")?new p(a.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new p(a.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(r=e.bucket,s=new p(a.QUOTA_EXCEEDED,"Quota for bucket '"+r+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(i=e.path,s=new p(a.UNAUTHORIZED,"User does not have permission to access '"+i+"'.")):s=n,s.status=t.getStatus(),s.serverResponse=n.serverResponse,s}}function ei(e){let t=er(e);return function(n,r){let i=t(n,r);if(404===n.getStatus()){var s;s=e.path,i=new p(a.OBJECT_NOT_FOUND,"Object '"+s+"' does not exist.")}return i.serverResponse=r.serverResponse,i}}function es(e,t,n){let r=D(t.fullServerUrl(),e.host,e._protocol),i=e.maxOperationRetryTime,s=new ee(r,"GET",en(e,n),i);return s.errorHandler=ei(t),s}function ea(e,t,n){let r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),!r.contentType&&(r.contentType=t&&t.type()||"application/octet-stream"),r}class eo{constructor(e,t,n,r){this.current=e,this.total=t,this.finalized=!!n,this.metadata=r||null}}function el(e,t){let n=null;try{n=e.getResponseHeader("X-Goog-Upload-Status")}catch(e){et(!1)}return et(!!n&&-1!==(t||["active"]).indexOf(n)),n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eh={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function eu(e){switch(e){case"running":case"pausing":case"canceling":return eh.RUNNING;case"paused":return eh.PAUSED;case"success":return eh.SUCCESS;case"canceled":return eh.CANCELED;default:return eh.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(e,t,n){"function"==typeof e||null!=t||null!=n?(this.next=e,this.error=null!=t?t:void 0,this.complete=null!=n?n:void 0):(this.next=e.next,this.error=e.error,this.complete=e.complete)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ed(e){return(...t)=>{Promise.resolve().then(()=>e(...t))}}class ef{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=o.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=o.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=o.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,n,r){if(this.sent_)throw T("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==r)for(let e in r)r.hasOwnProperty(e)&&this.xhr_.setRequestHeader(e,r[e].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw T("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw T("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return -1}}getResponse(){if(!this.sent_)throw T("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw T("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class ep extends ef{initXhr(){this.xhr_.responseType="text"}}function eg(){return new ep}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(e,t,n=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=n,this._mappings=X(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=e=>{if(this._request=void 0,this._chunkMultiplier=1,e._codeEquals(a.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{let t=this.isExponentialBackoffExpired();if(N(e.status,[])){if(t)e=_();else{this.sleepTime=Math.max(2*this.sleepTime,1e3),this._needToFetchStatus=!0,this.completeTransitions_();return}}this._error=e,this._transition("error")}},this._metadataErrorHandler=e=>{this._request=void 0,e._codeEquals(a.CANCELED)?this.completeTransitions_():(this._error=e,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((e,t)=>{this._resolve=e,this._reject=t,this._start()}),this._promise.then(null,()=>{})}isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}_makeProgressCallback(){let e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>262144}_start(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,n])=>{switch(this._state){case"running":e(t,n);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused")}})}_createResumable(){this._resolveToken((e,t)=>{let n=function(e,t,n,r,i){let s=t.bucketOnlyServerUrl(),a=ea(t,r,i),o={name:a.fullPath},l=D(s,e.host,e._protocol),h={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${r.size()}`,"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},u=Z(a,n),c=new ee(l,"POST",function(e){let t;el(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(e){et(!1)}return et(A(t)),t},e.maxUploadRetryTime);return c.urlParams=o,c.headers=h,c.body=u,c.errorHandler=er(t),c}(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(n,eg,e,t);this._request=r,r.getPromise().then(e=>{this._request=void 0,this._uploadUrl=e,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){let e=this._uploadUrl;this._resolveToken((t,n)=>{let r=function(e,t,n,r){let i=new ee(n,"POST",function(e){let t=el(e,["active","final"]),n=null;try{n=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(e){et(!1)}n||et(!1);let i=Number(n);return et(!isNaN(i)),new eo(i,r.size(),"final"===t)},e.maxUploadRetryTime);return i.headers={"X-Goog-Upload-Command":"query"},i.errorHandler=er(t),i}(this._ref.storage,this._ref._location,e,this._blob),i=this._ref.storage._makeRequest(r,eg,t,n);this._request=i,i.getPromise().then(e=>{this._request=void 0,this._updateProgress(e.current),this._needToFetchStatus=!1,e.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){let e=262144*this._chunkMultiplier,t=new eo(this._transferred,this._blob.size()),n=this._uploadUrl;this._resolveToken((r,i)=>{let s;try{s=function(e,t,n,r,i,s,o,l){let h=new eo(0,0);if(o?(h.current=o.current,h.total=o.total):(h.current=0,h.total=r.size()),r.size()!==h.total)throw new p(a.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.");let u=h.total-h.current,c=u;i>0&&(c=Math.min(c,i));let d=h.current,f=d+c,g={"X-Goog-Upload-Command":0===c?"finalize":u===c?"upload, finalize":"upload","X-Goog-Upload-Offset":`${h.current}`},m=r.slice(d,f);if(null===m)throw y();let _=new ee(n,"POST",function(e,n){let i;let a=el(e,["active","final"]),o=h.current+c,l=r.size();return i="final"===a?en(t,s)(e,n):null,new eo(o,l,"final"===a,i)},t.maxUploadRetryTime);return _.headers=g,_.body=m.uploadData(),_.progressCallback=l||null,_.errorHandler=er(e),_}(this._ref._location,this._ref.storage,n,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(e){this._error=e,this._transition("error");return}let o=this._ref.storage._makeRequest(s,eg,r,i,!1);this._request=o,o.getPromise().then(e=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(e.current),e.finalized?(this._metadata=e.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){262144*this._chunkMultiplier*2<33554432&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{let n=es(this._ref.storage,this._ref._location,this._mappings),r=this._ref.storage._makeRequest(n,eg,e,t);this._request=r,r.getPromise().then(e=>{this._request=void 0,this._metadata=e,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{let n=function(e,t,n,r,i){let s=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"},o=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();a["Content-Type"]="multipart/related; boundary="+o;let l=ea(t,r,i),h="--"+o+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+Z(l,n)+"\r\n--"+o+"\r\nContent-Type: "+l.contentType+"\r\n\r\n",u=W.getBlob(h,r,"\r\n--"+o+"--");if(null===u)throw y();let c={name:l.fullPath},d=D(s,e.host,e._protocol),f=e.maxUploadRetryTime,p=new ee(d,"POST",en(e,n),f);return p.urlParams=c,p.headers=a,p.body=u.uploadData(),p.errorHandler=er(t),p}(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(n,eg,e,t);this._request=r,r.getPromise().then(e=>{this._request=void 0,this._metadata=e,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){let t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":let t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":case"error":case"success":this._state=e,this._notifyObservers();break;case"canceled":this._error=v(),this._state=e,this._notifyObservers()}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start()}}get snapshot(){let e=eu(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,n,r){let i=new ec(t||void 0,n||void 0,r||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){let t=this._observers.indexOf(e);-1!==t&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(e=>{this._notifyObserver(e)})}_finishPromise(){if(void 0!==this._resolve){let e=!0;switch(eu(this._state)){case eh.SUCCESS:ed(this._resolve.bind(null,this.snapshot))();break;case eh.CANCELED:case eh.ERROR:ed(this._reject.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(eu(this._state)){case eh.RUNNING:case eh.PAUSED:e.next&&ed(e.next.bind(e,this.snapshot))();break;case eh.SUCCESS:e.complete&&ed(e.complete.bind(e))();break;case eh.CANCELED:case eh.ERROR:default:e.error&&ed(e.error.bind(e,this._error))()}}resume(){let e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e}pause(){let e="running"===this._state;return e&&this._transition("pausing"),e}cancel(){let e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e,t){this._service=e,t instanceof C?this._location=t:this._location=C.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new e_(e,t)}get root(){let e=new C(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return z(this._location.path)}get storage(){return this._service}get parent(){let e=/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if(0===e.length)return null;let t=e.lastIndexOf("/");return -1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;let t=new C(this._location.bucket,e);return new e_(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw E(e)}}async function ev(e,t,n){let r=await ey(e,{pageToken:n});t.prefixes.push(...r.prefixes),t.items.push(...r.items),null!=r.nextPageToken&&await ev(e,t,r.nextPageToken)}function ey(e,t){null!=t&&"number"==typeof t.maxResults&&k("options.maxResults",1,1e3,t.maxResults);let n=t||{},r=function(e,t,n,r,i){var s;let a={};t.isRoot?a.prefix="":a.prefix=t.path+"/",n&&n.length>0&&(a.delimiter=n),r&&(a.pageToken=r),i&&(a.maxResults=i);let o=D(t.bucketOnlyServerUrl(),e.host,e._protocol),l=e.maxOperationRetryTime,h=new ee(o,"GET",(s=t.bucket,function(t,n){let r=function(e,t,n){let r=V(n);return null===r?null:function(e,t,n){let r={prefixes:[],items:[],nextPageToken:n.nextPageToken};if(n[Y])for(let i of n[Y]){let n=i.replace(/\/$/,""),s=e._makeStorageReference(new C(t,n));r.prefixes.push(s)}if(n[Q])for(let i of n[Q]){let n=e._makeStorageReference(new C(t,i.name));r.items.push(n)}return r}(e,t,r)}(e,s,n);return et(null!==r),r}),l);return h.urlParams=a,h.errorHandler=er(t),h}(e.storage,e._location,"/",n.pageToken,n.maxResults);return e.storage.makeRequestWithTokens(r,eg)}function eb(e,t){let n=function(e,t){let n=t.split("/").filter(e=>e.length>0).join("/");return 0===e.length?n:e+"/"+n}(e._location.path,t),r=new C(e._location.bucket,n);return new e_(e.storage,r)}function ew(e,t){let n=null==t?void 0:t[f];return null==n?null:C.makeFromBucketSpec(n,e)}class eE{constructor(e,t,n,r,i){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=i,this._bucket=null,this._host=d,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,null!=r?this._bucket=C.makeFromBucketSpec(r,this._host):this._bucket=ew(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=C.makeFromBucketSpec(this._url,e):this._bucket=ew(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){k("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){k("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;let e=this._authProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){let e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new e_(this,e)}_makeRequest(e,t,n,r,i=!0){if(this._deleted)return new S(w());{let s=function(e,t,n,r,i,s,a=!0){let o=P(e.urlParams),l=e.url+o,h=Object.assign({},e.headers);return t&&(h["X-Firebase-GMPID"]=t),null!==n&&n.length>0&&(h.Authorization="Firebase "+n),h["X-Firebase-Storage-Version"]="webjs/"+(null!=s?s:"AppManager"),null!==r&&(h["X-Firebase-AppCheck"]=r),new L(l,e.method,h,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,a)}(e,this._appId,n,r,t,this._firebaseVersion,i);return this._requests.add(s),s.getPromise().then(()=>this._requests.delete(s),()=>this._requests.delete(s)),s}}async makeRequestWithTokens(e,t){let[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}let eI="@firebase/storage",eT="0.12.0";function eC(e,t){return function(e,t){if(!(t&&/^[A-Za-z]+:\/\//.test(t)))return function e(t,n){if(t instanceof eE){if(null==t._bucket)throw new p(a.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+f+"' property when initializing the app?");let r=new e_(t,t._bucket);return null!=n?e(r,n):r}return void 0!==n?eb(t,n):t}(e,t);if(e instanceof eE)return new e_(e,t);throw b("To use ref(service, url), the first argument must be a Storage instance.")}(e=(0,u.m9)(e),t)}(0,h._registerComponent)(new c.wA("storage",function(e,{instanceIdentifier:t}){return new eE(e.getProvider("app").getImmediate(),e.getProvider("auth-internal"),e.getProvider("app-check-internal"),t,h.SDK_VERSION)},"PUBLIC").setMultipleInstances(!0)),(0,h.registerVersion)(eI,eT,""),(0,h.registerVersion)(eI,eT,"esm2017");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eS{constructor(e,t,n){this._delegate=e,this.task=t,this.ref=n}get bytesTransferred(){return this._delegate.bytesTransferred}get metadata(){return this._delegate.metadata}get state(){return this._delegate.state}get totalBytes(){return this._delegate.totalBytes}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eA{constructor(e,t){this._delegate=e,this._ref=t,this.cancel=this._delegate.cancel.bind(this._delegate),this.catch=this._delegate.catch.bind(this._delegate),this.pause=this._delegate.pause.bind(this._delegate),this.resume=this._delegate.resume.bind(this._delegate)}get snapshot(){return new eS(this._delegate.snapshot,this,this._ref)}then(e,t){return this._delegate.then(t=>{if(e)return e(new eS(t,this,this._ref))},t)}on(e,t,n,r){let i;return t&&(i="function"==typeof t?e=>t(new eS(e,this,this._ref)):{next:t.next?e=>t.next(new eS(e,this,this._ref)):void 0,complete:t.complete||void 0,error:t.error||void 0}),this._delegate.on(e,i,n||void 0,r||void 0)}}class eR{constructor(e,t){this._delegate=e,this._service=t}get prefixes(){return this._delegate.prefixes.map(e=>new eO(e,this._service))}get items(){return this._delegate.items.map(e=>new eO(e,this._service))}get nextPageToken(){return this._delegate.nextPageToken||null}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eO{constructor(e,t){this._delegate=e,this.storage=t}get name(){return this._delegate.name}get bucket(){return this._delegate.bucket}get fullPath(){return this._delegate.fullPath}toString(){return this._delegate.toString()}child(e){return new eO(eb(this._delegate,e),this.storage)}get root(){return new eO(this._delegate.root,this.storage)}get parent(){let e=this._delegate.parent;return null==e?null:new eO(e,this.storage)}put(e,t){var n,r;return this._throwIfRoot("put"),new eA((n=this._delegate,(r=n=(0,u.m9)(n))._throwIfRoot("uploadBytesResumable"),new em(r,new W(e),t)),this)}putString(e,t=M.RAW,n){this._throwIfRoot("putString");let r=j(t,e),i=Object.assign({},n);return null==i.contentType&&null!=r.contentType&&(i.contentType=r.contentType),new eA(new em(this._delegate,new W(r.data,!0),i),this)}listAll(){var e;return(e=this._delegate,function(e){let t={prefixes:[],items:[]};return ev(e,t).then(()=>t)}(e=(0,u.m9)(e))).then(e=>new eR(e,this.storage))}list(e){var t;return(t=this._delegate,ey(t=(0,u.m9)(t),e||void 0)).then(e=>new eR(e,this.storage))}getMetadata(){var e;return e=this._delegate,function(e){e._throwIfRoot("getMetadata");let t=es(e.storage,e._location,X());return e.storage.makeRequestWithTokens(t,eg)}(e=(0,u.m9)(e))}updateMetadata(e){var t;return t=this._delegate,function(e,t){e._throwIfRoot("updateMetadata");let n=function(e,t,n,r){let i=D(t.fullServerUrl(),e.host,e._protocol),s=Z(n,r),a=e.maxOperationRetryTime,o=new ee(i,"PATCH",en(e,r),a);return o.headers={"Content-Type":"application/json; charset=utf-8"},o.body=s,o.errorHandler=ei(t),o}(e.storage,e._location,t,X());return e.storage.makeRequestWithTokens(n,eg)}(t=(0,u.m9)(t),e)}getDownloadURL(){var e;return e=this._delegate,function(e){e._throwIfRoot("getDownloadURL");let t=function(e,t,n){let r=new ee(D(t.fullServerUrl(),e.host,e._protocol),"GET",function(t,r){let i=J(e,r,n);return et(null!==i),function(e,t,n,r){let i=V(t);if(null===i||!A(i.downloadTokens))return null;let s=i.downloadTokens;if(0===s.length)return null;let a=encodeURIComponent;return s.split(",").map(t=>{let i=e.bucket,s=e.fullPath;return D("/b/"+a(i)+"/o/"+a(s),n,r)+P({alt:"media",token:t})})[0]}(i,r,e.host,e._protocol)},e.maxOperationRetryTime);return r.errorHandler=ei(t),r}(e.storage,e._location,X());return e.storage.makeRequestWithTokens(t,eg).then(e=>{if(null===e)throw new p(a.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e})}(e=(0,u.m9)(e))}delete(){var e;return this._throwIfRoot("delete"),e=this._delegate,function(e){e._throwIfRoot("deleteObject");let t=function(e,t){let n=new ee(D(t.fullServerUrl(),e.host,e._protocol),"DELETE",function(e,t){},e.maxOperationRetryTime);return n.successCodes=[200,204],n.errorHandler=ei(t),n}(e.storage,e._location);return e.storage.makeRequestWithTokens(t,eg)}(e=(0,u.m9)(e))}_throwIfRoot(e){if(""===this._delegate._location.path)throw E(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ek{constructor(e,t){this.app=e,this._delegate=t}get maxOperationRetryTime(){return this._delegate.maxOperationRetryTime}get maxUploadRetryTime(){return this._delegate.maxUploadRetryTime}ref(e){if(eD(e))throw b("ref() expected a child path but got a URL, use refFromURL instead.");return new eO(eC(this._delegate,e),this)}refFromURL(e){if(!eD(e))throw b("refFromURL() expected a full URL but got a child path, use ref() instead.");try{C.makeFromUrl(e,this._delegate.host)}catch(e){throw b("refFromUrl() expected a valid full URL but got an invalid one.")}return new eO(eC(this._delegate,e),this)}setMaxUploadRetryTime(e){this._delegate.maxUploadRetryTime=e}setMaxOperationRetryTime(e){this._delegate.maxOperationRetryTime=e}useEmulator(e,t,n={}){!function(e,t,n,r={}){!function(e,t,n,r={}){e.host=`${t}:${n}`,e._protocol="http";let{mockUserToken:i}=r;i&&(e._overrideAuthToken="string"==typeof i?i:(0,u.Sg)(i,e.app.options.projectId))}(e,t,n,r)}(this._delegate,e,t,n)}}function eD(e){return/^[A-Za-z]+:\/\//.test(e)}(s=l.Z).INTERNAL.registerComponent(new c.wA("storage-compat",function(e,{instanceIdentifier:t}){return new ek(e.getProvider("app-compat").getImmediate(),e.getProvider("storage").getImmediate({identifier:t}))},"PUBLIC").setServiceProps({TaskState:eh,TaskEvent:{STATE_CHANGED:"state_changed"},StringFormat:M,Storage:ek,Reference:eO}).setMultipleInstances(!0)),s.registerVersion("@firebase/storage-compat","0.3.3")}}]);