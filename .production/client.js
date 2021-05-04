!function(e){var t={};function __webpack_require__(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,__webpack_require__),r.l=!0,r.exports}__webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,n){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(__webpack_require__.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)__webpack_require__.d(n,r,function(t){return e[t]}.bind(null,r));return n},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=3)}([function(e,t){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);const r=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/,i=/^\/Date\((d|-|.*)\)[\/|\\]$/;function dateParser(e,t){if("string"==typeof t){let e=r.exec(t);if(e)return new Date(t);if(e=i.exec(t),e){const t=e[1].split(/[-+,.]/);return new Date(t[0]?+t[0]:0-+t[1])}}return t}function deserialize(e){return JSON.parse(e,dateParser)}function fragment({children:e}){return e}function element_element(e,t,...n){n=function flattenChildren(e){return e=[].concat.apply([],e).map(e=>null!=e&&e),[].concat.apply([],e)}(n),"textarea"===e&&(n=[n.join("")]);const r={...t,children:n};return"element"===e&&(e=r.tag||fragment,delete r.tag),"function"==typeof e&&void 0!==e.render?{type:e,attributes:r,children:null}:{type:e,attributes:r,children:n}}function extractParamValue(e){return"true"===e||"false"!==e&&(e?decodeURIComponent(e.replace(/\+/g," ")):"")}function serializeParam(e){return e&&void 0!==e.toJSON?e.toJSON():e}function serializeSearch(e){return Object.keys(e).map(t=>!1===e[t]||e[t]?`${t}=${e[t]}`:"").filter(e=>!!e).join("&")}const a={};var s=a;const o={set(e,t,n){const r=serializeParam(n);e[t]=r;const i=serializeSearch(e);return z.url=z.path+(i?"?":"")+i,!0},get:(e,t)=>!1!==e[t]&&(!1!==s[t]&&(e[t]||s[t]||""))},l={...window.params};delete window.params;const c=new Proxy(l,o);function updateParams(e){!function resetSegments(){for(const e in a)delete a[e]}();const t=function getQueryStringParams(e){const[t,n]=e.split("?");return n?n.split("&").reduce((e,t)=>{let[n,r]=t.split("=");return e[n]=extractParamValue(r),e},{}):{}}(e);for(const e of Object.keys({...t,...l}))l[e]=t[e];return c}var u=c;const d={...window.environment,client:!0,server:!1};Object.freeze(d);var f=d;function extractLocation(e){let[t,n]=e.split("#"),[r,i]=t.split("?");"/"!==r&&r.endsWith("/")&&(r=r.substring(0,r.length-1));let a=r;i&&(a+="?"+i);let s=a;return n&&(s+="#"+n),void 0===n&&(n=""),{path:r,search:i,url:a,urlWithHash:s,hash:n}}function isFalse(e){return null==e||!1===e||"object"==typeof e&&(void 0===e.type||null===e.type||!1===e.type)}function isText(e){return void 0===e.children}function anchorableElement(e){const t=e.querySelectorAll('a[href^="/"]:not([target])');for(const e of t)e.onclick=t=>{t.preventDefault(),z.url=e.getAttribute("href")}}function render(e,t){if(isFalse(e)||"head"===e.type)return document.createComment("");if(isText(e))return document.createTextNode(e);const n=t&&t.svg||"svg"===e.type;let r;r=n?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),e.instance&&(e.instance._self.element=r);for(let t in e.attributes)if("html"===t)r.innerHTML=e.attributes[t],anchorableElement(r);else if(t.startsWith("on")){const n=t.replace("on",""),i="_event."+n;e[i]=n=>{!0!==e.attributes.default&&n.preventDefault(),e.attributes[t]({...e.attributes,event:n})},r.addEventListener(n,e[i])}else{const n=typeof e.attributes[t];"object"!==n&&"function"!==n&&("value"!=t&&!0===e.attributes[t]?r.setAttribute(t,""):("value"==t||!1!==e.attributes[t]&&null!==e.attributes[t]&&void 0!==e.attributes[t])&&r.setAttribute(t,e.attributes[t]))}if(!e.attributes.html){for(let t=0;t<e.children.length;t++){const i=render(e.children[t],{svg:n});r.appendChild(i)}"select"==e.type&&(r.value=e.attributes.value)}return r}function rerender(e,t,n){if(t=void 0===t?g.virtualDom:t,(n=void 0===n?g.nextVirtualDom:n).instance&&(n.instance._self.element=e),!g.hydrated&&e)for(const t of e.childNodes)t.tagName&&"textarea"==t.tagName.toLowerCase()&&0==t.childNodes.length&&t.appendChild(document.createTextNode("")),8===t.COMMENT_NODE&&"#"===t.textContent&&e.removeChild(t);if(!isFalse(t)||!isFalse(n)){if((isFalse(t)||isFalse(n))&&t!=n){const t=render(n);return e.replaceWith(t)}if("head"!=t.type||"head"!=n.type){if("head"==t.type||"head"==n.type){const t=render(n);return e.replaceWith(t)}if(t.type!==n.type){const t=render(n);return e.replaceWith(t)}if(isText(t)&&isText(n))t!=n&&(e.nodeValue=n);else if(t.type===n.type){const r=Object.keys({...t.attributes,...n.attributes});for(const i of r)if("html"===i)n.attributes[i]!==t.attributes[i]&&(e.innerHTML=n.attributes[i],anchorableElement(e));else if("checked"===i)n.attributes[i]!==e.value&&(e.checked=n.attributes[i]);else if("value"===i)n.attributes[i]!==e.value&&(e.value=n.attributes[i]);else if(i.startsWith("on")){const r=i.replace("on",""),a="_event."+r;e.removeEventListener(r,t[a]),n.attributes[i]&&(n[a]=e=>{!0!==n.attributes.default&&e.preventDefault(),n.attributes[i]({...n.attributes,event:e})},e.addEventListener(r,n[a]))}else{const r=typeof n.attributes[i];"object"!==r&&"function"!==r&&(void 0!==t.attributes[i]&&void 0===n.attributes[i]?e.removeAttribute(i):t.attributes[i]!==n.attributes[i]&&("value"!=i&&!1===n.attributes[i]||null===n.attributes[i]||void 0===n.attributes[i]?e.removeAttribute(i):"value"!=i&&!0===n.attributes[i]?e.setAttribute(i,""):e.setAttribute(i,n.attributes[i])))}if(n.attributes.html)return;const i=Math.max(t.children.length,n.children.length);if(n.children.length>t.children.length){for(let r=0;r<t.children.length;r++)rerender(e.childNodes[r],t.children[r],n.children[r]);for(let r=t.children.length;r<n.children.length;r++){const t=render(n.children[r]);e.appendChild(t)}}else if(t.children.length>n.children.length){for(let r=0;r<n.children.length;r++)rerender(e.childNodes[r],t.children[r],n.children[r]);for(let r=t.children.length-1;r>=n.children.length;r--)e.removeChild(e.childNodes[r])}else for(let r=i-1;r>-1;r--)rerender(e.childNodes[r],t.children[r],n.children[r]);"textarea"==n.type&&(e.value=n.children.join("")),"select"==n.type&&(e.value=n.attributes.value)}}}}const h={set(e,t,n){return isProxyable(t,n)?(n._isProxy=!0,e[t]=new Proxy(n,this)):e[t]=n,t.startsWith("_")||g.update(),!0},get(e,t){return"_isProxy"===t||Reflect.get(...arguments)}};function isProxyable(e,t){return!(e.startsWith("_")||null===t||"object"!=typeof t||void 0!==t._isProxy||t instanceof Date)}function generateObjectProxy(e,t){if(isProxyable(e,t)){if("object"==typeof t)for(const e of Object.keys(t))t[e]=generateObjectProxy(e,t[e]);return new Proxy(t,h)}return t}const p={},b=deserialize(JSON.stringify(window.context));for(const e of Object.keys(b))p[e]=generateObjectProxy(e,b[e]);const m={set:(e,t,n)=>(p[t]=generateObjectProxy(t,n),g.update(),!0),get:(e,t)=>"_isProxy"===t||(void 0===e[t]?p[t]:e[t])};function generateContext(e){return new Proxy(e,m)}var _=p;function erase(e){e.type=!1,delete e.attributes,delete e.children}function camelize(e){return e.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g,(e,t)=>t.toUpperCase())}function kebabize(e){return e.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase()}let y=[{transform:function objectable_transform({node:e}){if(function objectable_match(e){return e&&void 0!==e.attributes}(e))for(const t in e.attributes)if(t.startsWith("on")&&"object"==typeof e.attributes[t]){const n=e.attributes.source,r=e.attributes[t];e.attributes[t]=function(){Object.assign(n,r)}.bind(n)}},client:!0},{transform:function parameterizable_transform({node:e,router:t,params:n}){if(!function parameterizable_match(e){return e&&e.attributes&&(e.attributes.params||e.attributes.path)}(e))return;let r;if(e.attributes.params){r={};for(const t in e.attributes.params)r[t]=serializeParam(e.attributes.params[t])}else r=n;const i=serializeSearch(r),a=e.attributes.path||t.path;e.attributes.href=a+(i?"?":"")+i,delete e.attributes.path,delete e.attributes.params},client:!0,server:!0},{transform:function anchorable_transform({node:e,router:t}){if(!function anchorable_match(e){return e&&"a"===e.type&&e.attributes.href&&e.attributes.href.startsWith("/")&&!e.attributes.target}(e))return;const n=e.attributes.onclick;e.attributes.onclick=({event:r})=>{r.preventDefault(),t.url=e.attributes.href,n&&setTimeout(()=>{n({...e.attributes,event:r})},0)}},client:!0},{load:function load({router:e}){e._routes={},e._oldSegments?(e._oldSegments=e._newSegments,e._newSegments={}):(e._oldSegments={},e._newSegments={})},transform:function transform({node:e,depth:t,router:n}){if(!function match(e){return e&&void 0!==e.attributes&&void 0!==e.attributes.route}(e))return;const r=t.slice(0,-1).join(".");if(void 0!==n._routes[r])erase(e);else{const t=function routeMatches(e,t){let{path:n}=extractLocation(e);const r=n.split("/"),i=t.split("/"),a={},s=Math.max(r.length,i.length);let o=!1;for(let e=0;e<s;e++)if(!o)if("*"===i[e])o=!0;else if(i[e]&&i[e].startsWith(":")){a[i[e].replace(":","")]=extractParamValue(r[e])}else if(i[e]!==r[e])return!1;return a}(n.url,e.attributes.route);t?(n._routes[r]=!0,n._newSegments[r]=t,Object.assign(n._segments,t)):erase(e)}},client:!0,server:!0},{transform:function datable_transform({node:e}){if(function datable_match(e){return e&&void 0!==e.attributes}(e)){e.attributes.data=e.attributes.data||{};for(const t in e.attributes)if(t.startsWith("data-")){const n=camelize(t.slice(5));e.attributes.data[n]=e.attributes[t]}for(const t in e.attributes.data){const n="data-"+kebabize(t);e.attributes[n]=e.attributes.data[t]}}},client:!0,server:!0},{transform:function bindable_transform({node:e,environment:t}){if(!function bindable_match(e){return void 0!==e&&void 0!==e.attributes&&void 0!==e.attributes.bind&&void 0!==e.attributes.source}(e))return;const n=e.attributes.source;"textarea"===e.type?e.children=[n[e.attributes.bind]]:"input"===e.type&&"checkbox"===e.attributes.type?e.attributes.checked=n[e.attributes.bind]:e.attributes.value=n[e.attributes.bind],e.attributes.name=e.attributes.name||e.attributes.bind,t.client&&function attachEvent(e){const t=e.attributes.source;let n="oninput",r="value";"checkbox"===e.attributes.type||"radio"===e.attributes.type?(n="onclick",r="checked"):"input"!==e.type&&"textarea"!==e.type&&(n="onchange");const i=e.attributes[n];e.attributes[n]=({event:n,value:a})=>{"checked"==r?t[e.attributes.bind]=n.target[r]:!0===t[e.attributes.bind]||!1===t[e.attributes.bind]?t[e.attributes.bind]=n?"true"==n.target[r]:a:"number"==typeof t[e.attributes.bind]?t[e.attributes.bind]=parseFloat(n?n.target[r]:a)||0:t[e.attributes.bind]=n?n.target[r]:a,void 0!==i&&setTimeout(()=>{i({...e.attributes,event:n,value:a})},0)}}(e)},client:!0,server:!0}];function loadPlugins(e){for(const t of y)t.load&&t.load(e.context);return y}async function generateBranch(e,t,n,r){if(function transformNodes(e,t,n){for(const r of y)r.transform({...e.context,node:t,depth:n})}(r,t,n),isFalse(t))e.children.push(!1);else if(function isClass(e){return"function"==typeof e.type&&e.type.prototype&&"function"==typeof e.type.prototype.render}(t)){const i=t.attributes.key||function generateKey(e){return 1===e.length?"application":"n-"+e.join("-")}(n);if(r.context.environment.client&&r.context.router._changed&&t.attributes&&t.attributes.route&&!r.context.environment.static){const e=n.slice(0,-1).join("."),t=r.context.router._newSegments[e];if(t){const n=r.context.router._oldSegments[e];for(const e in t)n[e]!==t[e]&&(delete r.memory[i],delete r.instances[i])}}const a=r.instances[i]||new t.type(r);let s;a._self.key=i,a._attributes=t.attributes,a._scope=r,r.memory&&(s=r.memory[i],s&&(a._self.initiated=!0,Object.assign(a,s),delete r.memory[i]));let o=!1;const l=void 0===r.instances[i];r.instances[i]=a,l&&(void 0===s&&(a.prepare&&a.prepare(),r.context.environment.server?(a.initiate&&await a.initiate(),a._self.initiated=!0):r.initiationQueue.push(a)),o=!0),r.hydrationQueue&&(o?r.hydrationQueue.push(a):1==a._self.initiated&&a.update&&a.update()),r.context.environment.client&&r.renewalQueue.push(a);const c=a.render();c&&c.type&&(c.instance=a),t.children=[].concat(c);for(let i=0;i<t.children.length;i++)await generateBranch(e,t.children[i],[...n,i],r)}else if(function isFunction(e){return"function"==typeof e.type}(t)){const i=t.type.name?r.generateContext(t.attributes):t.attributes,a=t.type(i);t.children=[].concat(a);for(let i=0;i<t.children.length;i++)await generateBranch(e,t.children[i],[...n,i],r)}else if(t.type){const i={type:t.type,attributes:t.attributes||{},instance:t.instance,children:[]};if(t.children)for(let e=0;e<t.children.length;e++)await generateBranch(i,t.children[e],[...n,e],r);e.children.push(i)}else e.children.push(t)}async function generateTree(e,t){const n={type:"div",attributes:{id:"application"},children:[]};return await generateBranch(n,e,[0],t),n}const v={initialized:!1,hydrated:!1,initializer:null,instances:{}};_.instances=v.instances,v.initiationQueue=[],v.renewalQueue=[],v.hydrationQueue=[],v.virtualDom={},v.selector=null,v.events={},v.generateContext=generateContext,v.renderQueue=null,v.update=async function(){v.initialized&&(clearInterval(v.renderQueue),v.renderQueue=setTimeout(async()=>{const e=v;e.context=_,e.plugins=loadPlugins(e),v.initialized=!1,v.initiationQueue=[],v.renewalQueue=[],v.hydrationQueue=[],v.nextVirtualDom=await generateTree(v.initializer(),e),rerender(v.selector),v.virtualDom=v.nextVirtualDom,v.nextVirtualDom=null,v.processLifecycleQueues()},16))},v.processLifecycleQueues=async function(){v.initialized||(v.initialized=!0,v.hydrated=!0);const e=v.initiationQueue,t=v.hydrationQueue;for(const t of e)t.initiate&&await t.initiate(),t._self.initiated=!0;e.length&&v.update();for(const e of t)e.hydrate&&await e.hydrate(),e._self.hydrated=!0;t.length&&v.update();for(const e in v.instances){const t=v.instances[e];v.renewalQueue.includes(t)||(t.terminate&&await t.terminate(),delete v.instances[e])}z._changed=!1};var g=v;const w={...window.worker};w.online=navigator.onLine,delete window.worker;const x=Object.freeze([]),k={set:(e,t,n)=>(e[t]=n,g.update(),!0),get:(e,t)=>e[t]||x};w.queues=new Proxy({},k);const P=new Proxy(w,{set:(e,t,n)=>(e[t]!==n&&(e[t]=n,g.update()),!0)});if(w.enabled){window.addEventListener("beforeinstallprompt",(function(e){e.preventDefault(),P.installation=e})),async function register(){if("serviceWorker"in navigator){const e=`/service-worker-${f.key}.js`;try{P.registration=await navigator.serviceWorker.register(e,{scope:"/"})}catch(e){console.log(e)}}}()}window.addEventListener("online",()=>{P.online=!0,f.static?z._update(z.url):P.responsive=!0}),window.addEventListener("offline",()=>{P.online=!1});var j=P;function windowEvent(e){clearTimeout(null),setTimeout(()=>{const t=new Event("nullstack."+e);window.dispatchEvent(t)},0)}const O={...window.page,event:"nullstack.page"};delete window.page;var S=new Proxy(O,{set(e,t,n){"title"===t&&(document.title=n);const r=Reflect.set(...arguments);return"title"===t&&windowEvent("page"),g.update(),r}});function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}let D=null;var z=new class router_Router{constructor(){_defineProperty(this,"event","nullstack.router"),_defineProperty(this,"_changed",!1),_defineProperty(this,"_segments",s);const{hash:e,url:t}=extractLocation(window.location.pathname+window.location.search);this._url=t,this._hash=e}async _popState(){const{urlWithHash:e}=extractLocation(window.location.pathname+window.location.search);await this._update(e,!1)}async _update(e,t){const{url:n,path:r,hash:i,urlWithHash:a}=extractLocation(e);clearTimeout(D),D=setTimeout(async()=>{if(S.status=200,f.static){j.fetching=!0;const e="/index.json",t="/"===r?e:r+e;try{const e=await fetch(t),r=await e.json(n);g.memory=r.instances;for(const e in r.page)S[e]=r.page[e];j.responsive=!0}catch(e){j.responsive=!1}j.fetching=!1}t&&history.pushState({},document.title,a),this._url=n,this._hash=i,this._changed=!0,updateParams(n),g.update(),windowEvent("router")},0)}async _redirect(e){if(e.startsWith("http"))return window.location.href=e;const{url:t,hash:n,urlWithHash:r}=extractLocation(e);t===this._url&&this._hash===n||await this._update(r,!0),n||window.scroll(0,0)}get url(){return this._url}set url(e){this._redirect(e)}get path(){return extractLocation(this._url).path}set path(e){this._redirect(e+window.location.search)}};var N={get(e,t){return"_isProxy"===t||("function"!=typeof e[t]||e[t].name.startsWith("_")||"constructor"===t?Reflect.get(...arguments):n=>{const r=generateContext({...e._attributes,...n,self:e._self});return e[t](r)})},set:(e,t,n)=>(e[t]=generateObjectProxy(t,n),t.startsWith("_")||g.update(),!0)};const q={...window.settings};delete window.settings,Object.freeze(q);var T=q;const E={...window.project};delete window.project,Object.freeze(E);var C=E;n(0);function client_defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}_.page=S,_.router=z,_.settings=T,_.worker=j,_.params=u,_.project=C,_.environment=window.environment,g.memory=deserialize(JSON.stringify(window.instances));const H=g;H.generateContext=generateContext,H.context=_,g.plugins=loadPlugins(H);class client_Nullstack{static async start(e){window.addEventListener("popstate",()=>{z._popState()}),g.routes={},updateParams(z.url),g.currentInstance=null,g.initializer=()=>element_element(e),g.selector=document.querySelector("#application"),g.virtualDom=await generateTree(g.initializer(),H),_.environment=f,H.plugins=loadPlugins(H),g.nextVirtualDom=await generateTree(g.initializer(),H),rerender(g.selector),g.virtualDom=g.nextVirtualDom,g.nextVirtualDom=null,g.processLifecycleQueues(),delete window.context}constructor(){client_defineProperty(this,"_self",{prerendered:!1,initiated:!1,hydrated:!1});const e=function getProxyableMethods(e){let t=new Set,n=e;do{Object.getOwnPropertyNames(n).map(e=>t.add(e))}while((n=Object.getPrototypeOf(n))&&n!=Object.prototype);return[...t.keys()].filter(t=>"constructor"!==t&&"function"==typeof e[t]&&!t.startsWith("_")&&!e[t].name.startsWith("_"))}(this),t=new Proxy(this,N);for(const n of e)this[n]=this[n].bind(t);return t}render(){return!1}}client_defineProperty(client_Nullstack,"element",element_element),client_defineProperty(client_Nullstack,"invoke",(function invoke(e,t){return async function _invoke(n={}){var r;let i;j.fetching=!0,Object.isFrozen(j.queues[e])?j.queues[e]=[n]:j.queues[e]=[...j.queues[e],n];let a=`/nullstack/${t===this.constructor.hash?t:`${t}-${this.constructor.hash}`}/${e}.json`;try{const e=await fetch(a,{method:"POST",headers:j.headers,mode:"cors",cache:"no-cache",credentials:"same-origin",redirect:"follow",referrerPolicy:"no-referrer",body:JSON.stringify(n||{})});S.status=e.status;i=deserialize(await e.text()).result,j.responsive=!0}catch(e){j.responsive=!1}return 1===(null===(r=j.queues[e])||void 0===r?void 0:r.length)?delete j.queues[e]:j.queues[e]=j.queues[e].filter(e=>e!==n),j.fetching=!!Object.keys(j.queues).length,i}})),client_defineProperty(client_Nullstack,"fragment",fragment),client_defineProperty(client_Nullstack,"use",function usePlugins(e){return async(...t)=>{y=[...new Set([...t.flat(),...y])].filter(t=>t[e])}}("client"));var L=client_Nullstack;n(1),n(2);function Home_defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class Home_Home extends L{constructor(...e){super(...e),Home_defineProperty(this,"search_params",""),Home_defineProperty(this,"results",{}),Home_defineProperty(this,"link",""),Home_defineProperty(this,"getVideoInfoByUrl",L.invoke("getVideoInfoByUrl","0b0eb4721936aadba3cc5c5b6f7d4ff3")),Home_defineProperty(this,"searchVideos",L.invoke("searchVideos","0b0eb4721936aadba3cc5c5b6f7d4ff3")),Home_defineProperty(this,"downloadVideo",L.invoke("downloadVideo","0b0eb4721936aadba3cc5c5b6f7d4ff3"))}async initiate({params:e}){if("search_params"in e&&(this.search_params=e.search_params),String(this.search_params).includes("https")){const e=await this.getVideoInfoByUrl({link:this.search_params}),t={id:e.player_response.videoDetails.videoId,title:e.player_response.videoDetails.title,thumb:e.player_response.videoDetails.thumbnail.thumbnails[3].url};this.results.items=t}else this.results=await this.searchVideos({search_params:e.search_params})}async callDownload({video:e}){const t=await this.downloadVideo({video:e}),n=t[0],r=t[1];let i=0;const a=setInterval(()=>{var e=new XMLHttpRequest;e.open("HEAD",n,!0),e.onreadystatechange=function(){this.readyState==this.DONE&&200===this.status&&(i=this.getResponseHeader("content-length"),Number(i)>=r&&(!function download(e){var t=document.createElement("a");t.href=e,t.setAttribute("download",""),document.body.appendChild(t),t.click(),document.body.removeChild(t)}(n),clearInterval(a)),console.log("fileSize = "+i))},e.send()},500);this.launchToast()}async launchToast(){var e=document.getElementById("toast");e.className="show",setTimeout((function(){e.className=e.className.replace("show","")}),5e3)}render(){return L.element("div",null,L.element("div",{class:"container"},L.element("h1",null,"YTDL - Nullstack"),L.element("form",{source:this,onsubmit:this.ghost_function,class:"row g-2 justify-content-md-center"},L.element("div",{class:"col-10"},L.element("label",{for:"search_params"},"Pesquise ou digite a url"),L.element("input",{id:"search_params",type:"text",class:"form-control",placeholder:"Ex: https://www.youtube.com/watch?v=TM2FtVMqymk",source:this,bind:"search_params"})),L.element("div",{style:"display: flex;",class:"col-2"},L.element("button",{style:"margin: auto; margin-top: 24px; margin-left: 0px; width: 150px",class:"btn btn-success"},L.element("i",{class:"fas fa-search"})))),L.element("br",null),L.element("div",{id:"beforeDownload",class:"container"},L.element("div",{class:"container row"},Object.keys(this.results.items).length>3?this.results.items.map(e=>L.element("div",{class:"card m-1",style:"width: 18rem;"},L.element("img",{src:Array.isArray(e.thumbnails)&&e.thumbnails.length>0?""+e.thumbnails[0].url:"",class:"card-img-top"}),L.element("div",{class:"card-body"},L.element("h5",{class:"card-title"},e.title),L.element("p",{class:"card-text"},e.author)),L.element("button",{class:"btn btn-sm btn-primary",onclick:this.callDownload,video:e},L.element("i",{class:"fas fa-download"})," Download"),L.element("br",null))):0!=Object.keys(this.results.items).length||void 0!==this.results.items.length?L.element("div",{class:"card m-1",style:"width: 18rem;"},L.element("img",{src:this.results.items.thumb,class:"card-img-top"}),L.element("div",{class:"card-body"},L.element("h5",{class:"card-title"},this.results.items.title)),L.element("button",{class:"btn btn-sm btn-primary",onclick:this.callDownload,video:this.results.items},L.element("i",{class:"fas fa-download"})," Download"),L.element("br",null)):L.element("div",null,'"Sem vídeos"')),L.element("div",{id:"toast"},L.element("div",{id:"img"},L.element("i",{class:"fas fa-download"})),L.element("div",{id:"desc"},"Download Iniciado")))))}}Home_defineProperty(Home_Home,"hash","0b0eb4721936aadba3cc5c5b6f7d4ff3");var W=Home_Home;class Application_Application extends L{prepare({page:e}){e.locale="pt-BR"}renderHead(){return L.element("head",null,L.element("link",{href:"https://fonts.gstatic.com",rel:"preconnect"}),L.element("link",{href:"https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap",rel:"stylesheet"}),L.element("link",{href:"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css",rel:"stylesheet"}),L.element("link",{href:"https://pro.fontawesome.com/releases/v5.10.0/css/all.css",rel:"stylesheet"}))}render(){const e=this.renderHead;return L.element("main",null,L.element(e,null),L.element(W,{route:"/"}))}}!function Application_defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}(Application_Application,"hash","473bfb5f2e37a6fa3ccefd1dd8b599ff");var A=Application_Application;t.default=L.start(A)}]);