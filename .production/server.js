/*! For license information please see server.js.LICENSE.txt */
!(function webpackUniversalModuleDefinition(e, t) {
	if ("object" == typeof exports && "object" == typeof module) module.exports = t();
	else if ("function" == typeof define && define.amd) define([], t);
	else {
		var n = t();
		for (var a in n) ("object" == typeof exports ? exports : e)[a] = n[a];
	}
})(global, function () {
	return (function (e) {
		var t = {};
		function __webpack_require__(n) {
			if (t[n]) return t[n].exports;
			var a = (t[n] = { i: n, l: !1, exports: {} });
			return e[n].call(a.exports, a, a.exports, __webpack_require__), (a.l = !0), a.exports;
		}
		return (
			(__webpack_require__.m = e),
			(__webpack_require__.c = t),
			(__webpack_require__.d = function (e, t, n) {
				__webpack_require__.o(e, t) ||
					Object.defineProperty(e, t, { enumerable: !0, get: n });
			}),
			(__webpack_require__.r = function (e) {
				"undefined" != typeof Symbol &&
					Symbol.toStringTag &&
					Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
					Object.defineProperty(e, "__esModule", { value: !0 });
			}),
			(__webpack_require__.t = function (e, t) {
				if ((1 & t && (e = __webpack_require__(e)), 8 & t)) return e;
				if (4 & t && "object" == typeof e && e && e.__esModule) return e;
				var n = Object.create(null);
				if (
					(__webpack_require__.r(n),
					Object.defineProperty(n, "default", { enumerable: !0, value: e }),
					2 & t && "string" != typeof e)
				)
					for (var a in e)
						__webpack_require__.d(
							n,
							a,
							function (t) {
								return e[t];
							}.bind(null, a)
						);
				return n;
			}),
			(__webpack_require__.n = function (e) {
				var t =
					e && e.__esModule
						? function getDefault() {
								return e.default;
						  }
						: function getModuleExports() {
								return e;
						  };
				return __webpack_require__.d(t, "a", t), t;
			}),
			(__webpack_require__.o = function (e, t) {
				return Object.prototype.hasOwnProperty.call(e, t);
			}),
			(__webpack_require__.p = ""),
			__webpack_require__((__webpack_require__.s = 181))
		);
	})([
		function (e, t) {
			e.exports = require("stream");
		},
		function (e, t) {
			e.exports = require("path");
		},
		function (e, t) {
			e.exports = require("fs");
		},
		function (e, t) {
			e.exports = require("url");
		},
		function (e, t) {
			e.exports = require("http");
		},
		function (e, t) {
			e.exports = require("zlib");
		},
		function (module, exports, __webpack_require__) {
			var callSiteToString = __webpack_require__(45).callSiteToString,
				eventListenerCount = __webpack_require__(45).eventListenerCount,
				relative = __webpack_require__(1).relative;
			module.exports = depd;
			var basePath = process.cwd();
			function containsNamespace(e, t) {
				for (
					var n = e.split(/[ ,]+/), a = String(t).toLowerCase(), i = 0;
					i < n.length;
					i++
				) {
					var r = n[i];
					if (r && ("*" === r || r.toLowerCase() === a)) return !0;
				}
				return !1;
			}
			function convertDataDescriptorToAccessor(e, t, n) {
				var a = Object.getOwnPropertyDescriptor(e, t),
					i = a.value;
				return (
					(a.get = function getter() {
						return i;
					}),
					a.writable &&
						(a.set = function setter(e) {
							return (i = e);
						}),
					delete a.value,
					delete a.writable,
					Object.defineProperty(e, t, a),
					a
				);
			}
			function createArgumentsString(e) {
				for (var t = "", n = 0; n < e; n++) t += ", arg" + n;
				return t.substr(2);
			}
			function createStackString(e) {
				var t = this.name + ": " + this.namespace;
				this.message && (t += " deprecated " + this.message);
				for (var n = 0; n < e.length; n++) t += "\n    at " + callSiteToString(e[n]);
				return t;
			}
			function depd(e) {
				if (!e) throw new TypeError("argument namespace is required");
				var t = callSiteLocation(getStack()[1])[0];
				function deprecate(e) {
					log.call(deprecate, e);
				}
				return (
					(deprecate._file = t),
					(deprecate._ignored = isignored(e)),
					(deprecate._namespace = e),
					(deprecate._traced = istraced(e)),
					(deprecate._warned = Object.create(null)),
					(deprecate.function = wrapfunction),
					(deprecate.property = wrapproperty),
					deprecate
				);
			}
			function isignored(e) {
				return (
					!!process.noDeprecation ||
					containsNamespace(process.env.NO_DEPRECATION || "", e)
				);
			}
			function istraced(e) {
				return (
					!!process.traceDeprecation ||
					containsNamespace(process.env.TRACE_DEPRECATION || "", e)
				);
			}
			function log(e, t) {
				var n = 0 !== eventListenerCount(process, "deprecation");
				if (n || !this._ignored) {
					var a,
						i,
						r,
						o,
						s = 0,
						c = !1,
						p = getStack(),
						l = this._file;
					for (
						t
							? ((o = t), ((r = callSiteLocation(p[1])).name = o.name), (l = r[0]))
							: (r = o = callSiteLocation(p[(s = 2)]));
						s < p.length;
						s++
					)
						if ((i = (a = callSiteLocation(p[s]))[0]) === l) c = !0;
						else if (i === this._file) l = this._file;
						else if (c) break;
					var u = a ? o.join(":") + "__" + a.join(":") : void 0;
					if (void 0 === u || !(u in this._warned)) {
						this._warned[u] = !0;
						var d = e;
						if (
							(d || (d = r !== o && r.name ? defaultMessage(r) : defaultMessage(o)),
							n)
						) {
							var m = DeprecationError(this._namespace, d, p.slice(s));
							process.emit("deprecation", m);
						} else {
							var f = (process.stderr.isTTY ? formatColor : formatPlain).call(
								this,
								d,
								a,
								p.slice(s)
							);
							process.stderr.write(f + "\n", "utf8");
						}
					}
				}
			}
			function callSiteLocation(e) {
				var t = e.getFileName() || "<anonymous>",
					n = e.getLineNumber(),
					a = e.getColumnNumber();
				e.isEval() && (t = e.getEvalOrigin() + ", " + t);
				var i = [t, n, a];
				return (i.callSite = e), (i.name = e.getFunctionName()), i;
			}
			function defaultMessage(e) {
				var t = e.callSite,
					n = e.name;
				n || (n = "<anonymous@" + formatLocation(e) + ">");
				var a = t.getThis(),
					i = a && t.getTypeName();
				return (
					"Object" === i && (i = void 0),
					"Function" === i && (i = a.name || i),
					i && t.getMethodName() ? i + "." + n : n
				);
			}
			function formatPlain(e, t, n) {
				var a = new Date().toUTCString() + " " + this._namespace + " deprecated " + e;
				if (this._traced) {
					for (var i = 0; i < n.length; i++) a += "\n    at " + callSiteToString(n[i]);
					return a;
				}
				return t && (a += " at " + formatLocation(t)), a;
			}
			function formatColor(e, t, n) {
				var a = "[36;1m" + this._namespace + "[22;39m [33;1mdeprecated[22;39m [0m" + e + "[39m";
				if (this._traced) {
					for (var i = 0; i < n.length; i++)
						a += "\n    [36mat " + callSiteToString(n[i]) + "[39m";
					return a;
				}
				return t && (a += " [36m" + formatLocation(t) + "[39m"), a;
			}
			function formatLocation(e) {
				return relative(basePath, e[0]) + ":" + e[1] + ":" + e[2];
			}
			function getStack() {
				var e = Error.stackTraceLimit,
					t = {},
					n = Error.prepareStackTrace;
				(Error.prepareStackTrace = prepareObjectStackTrace),
					(Error.stackTraceLimit = Math.max(10, e)),
					Error.captureStackTrace(t);
				var a = t.stack.slice(1);
				return (Error.prepareStackTrace = n), (Error.stackTraceLimit = e), a;
			}
			function prepareObjectStackTrace(e, t) {
				return t;
			}
			function wrapfunction(fn, message) {
				if ("function" != typeof fn) throw new TypeError("argument fn must be a function");
				var args = createArgumentsString(fn.length),
					deprecate = this,
					stack = getStack(),
					site = callSiteLocation(stack[1]);
				site.name = fn.name;
				var deprecatedfn = eval(
					"(function (" +
						args +
						') {\n"use strict"\nlog.call(deprecate, message, site)\nreturn fn.apply(this, arguments)\n})'
				);
				return deprecatedfn;
			}
			function wrapproperty(e, t, n) {
				if (!e || ("object" != typeof e && "function" != typeof e))
					throw new TypeError("argument obj must be object");
				var a = Object.getOwnPropertyDescriptor(e, t);
				if (!a) throw new TypeError("must call property on owner object");
				if (!a.configurable) throw new TypeError("property must be configurable");
				var i = this,
					r = callSiteLocation(getStack()[1]);
				(r.name = t), "value" in a && (a = convertDataDescriptorToAccessor(e, t, n));
				var o = a.get,
					s = a.set;
				"function" == typeof o &&
					(a.get = function getter() {
						return log.call(i, n, r), o.apply(this, arguments);
					}),
					"function" == typeof s &&
						(a.set = function setter() {
							return log.call(i, n, r), s.apply(this, arguments);
						}),
					Object.defineProperty(e, t, a);
			}
			function DeprecationError(e, t, n) {
				var a,
					i = new Error();
				return (
					Object.defineProperty(i, "constructor", { value: DeprecationError }),
					Object.defineProperty(i, "message", {
						configurable: !0,
						enumerable: !1,
						value: t,
						writable: !0,
					}),
					Object.defineProperty(i, "name", {
						enumerable: !1,
						configurable: !0,
						value: "DeprecationError",
						writable: !0,
					}),
					Object.defineProperty(i, "namespace", {
						configurable: !0,
						enumerable: !1,
						value: e,
						writable: !0,
					}),
					Object.defineProperty(i, "stack", {
						configurable: !0,
						enumerable: !1,
						get: function () {
							return void 0 !== a ? a : (a = createStackString.call(this, n));
						},
						set: function setter(e) {
							a = e;
						},
					}),
					i
				);
			}
		},
		function (e, t, n) {
			"use strict";
			var a = n(40).Buffer,
				i = n(61),
				r = n(22),
				o = n(6)("express"),
				s = n(31),
				c = n(41).mime,
				p = n(63),
				l = n(66),
				u = n(38),
				d = n(14);
			function createETagGenerator(e) {
				return function generateETag(t, n) {
					var i = a.isBuffer(t) ? t : a.from(t, n);
					return p(i, e);
				};
			}
			function parseExtendedQueryString(e) {
				return u.parse(e, { allowPrototypes: !0 });
			}
			function newObject() {
				return {};
			}
			(t.etag = createETagGenerator({ weak: !1 })),
				(t.wetag = createETagGenerator({ weak: !0 })),
				(t.isAbsolute = function (e) {
					return (
						"/" === e[0] ||
						(":" === e[1] && ("\\" === e[2] || "/" === e[2])) ||
						"\\\\" === e.substring(0, 2) ||
						void 0
					);
				}),
				(t.flatten = o.function(s, "utils.flatten: use array-flatten npm module instead")),
				(t.normalizeType = function (e) {
					return ~e.indexOf("/")
						? (function acceptParams(e, t) {
								for (
									var n = e.split(/ *; */),
										a = {
											value: n[0],
											quality: 1,
											params: {},
											originalIndex: t,
										},
										i = 1;
									i < n.length;
									++i
								) {
									var r = n[i].split(/ *= */);
									"q" === r[0]
										? (a.quality = parseFloat(r[1]))
										: (a.params[r[0]] = r[1]);
								}
								return a;
						  })(e)
						: { value: c.lookup(e), params: {} };
				}),
				(t.normalizeTypes = function (e) {
					for (var n = [], a = 0; a < e.length; ++a) n.push(t.normalizeType(e[a]));
					return n;
				}),
				(t.contentDisposition = o.function(
					i,
					"utils.contentDisposition: use content-disposition npm module instead"
				)),
				(t.compileETag = function (e) {
					var n;
					if ("function" == typeof e) return e;
					switch (e) {
						case !0:
							n = t.wetag;
							break;
						case !1:
							break;
						case "strong":
							n = t.etag;
							break;
						case "weak":
							n = t.wetag;
							break;
						default:
							throw new TypeError("unknown value for etag function: " + e);
					}
					return n;
				}),
				(t.compileQueryParser = function compileQueryParser(e) {
					var t;
					if ("function" == typeof e) return e;
					switch (e) {
						case !0:
							t = d.parse;
							break;
						case !1:
							t = newObject;
							break;
						case "extended":
							t = parseExtendedQueryString;
							break;
						case "simple":
							t = d.parse;
							break;
						default:
							throw new TypeError("unknown value for query parser function: " + e);
					}
					return t;
				}),
				(t.compileTrust = function (e) {
					return "function" == typeof e
						? e
						: !0 === e
						? function () {
								return !0;
						  }
						: "number" == typeof e
						? function (t, n) {
								return n < e;
						  }
						: ("string" == typeof e && (e = e.split(/ *, */)), l.compile(e || []));
				}),
				(t.setCharset = function setCharset(e, t) {
					if (!e || !t) return e;
					var n = r.parse(e);
					return (n.parameters.charset = t), r.format(n);
				});
		},
		function (e, t, n) {
			"use strict";
			var a =
				(this && this.__importDefault) ||
				function (e) {
					return e && e.__esModule ? e : { default: e };
				};
			const i = a(n(4)),
				r = a(n(36)),
				o = n(3),
				s = n(0),
				c = { "http:": i.default, "https:": r.default },
				p = new Set([301, 302, 303, 307, 308]),
				l = new Set([429, 503]),
				u = ["connect", "continue", "information", "socket", "timeout", "upgrade"],
				d = ["aborted"];
			function Miniget(e, t = {}) {
				var n;
				const a = Object.assign({}, Miniget.defaultOptions, t),
					i = new s.PassThrough({ highWaterMark: a.highWaterMark });
				let r, m, f;
				i.destroyed = i.aborted = !1;
				let h,
					v,
					g,
					b = 0,
					x = 0,
					y = 0,
					w = !1,
					_ = 0,
					k = 0;
				if (null === (n = a.headers) || void 0 === n ? void 0 : n.Range) {
					let e = /bytes=(\d+)-(\d+)?/.exec("" + a.headers.Range);
					e && ((_ = parseInt(e[1], 10)), (g = parseInt(e[2], 10)));
				}
				a.acceptEncoding &&
					(a.headers = Object.assign(
						{ "Accept-Encoding": Object.keys(a.acceptEncoding).join(", ") },
						a.headers
					));
				const reconnectIfEndedEarly = (e) =>
						!!("HEAD" !== t.method && w && k !== v && y++ < a.maxReconnects) &&
						(((e) => {
							(f = null), (x = 0);
							let t = a.backoff.inc,
								n = Math.min(t, a.backoff.max);
							(h = setTimeout(doDownload, n)), i.emit("reconnect", y, e);
						})(e),
						!0),
					retryRequest = (e) => {
						if (i.destroyed) return !1;
						if (f && k > 0) return reconnectIfEndedEarly(e.err);
						if ((!e.err || "ENOTFOUND" === e.err.message) && x++ < a.maxRetries) {
							let t = e.retryAfter || Math.min(x * a.backoff.inc, a.backoff.max);
							return (h = setTimeout(doDownload, t)), i.emit("retry", x, e.err), !0;
						}
						return !1;
					},
					forwardEvents = (e, t) => {
						for (let n of t) e.on(n, i.emit.bind(i, n));
					},
					doDownload = () => {
						let t,
							n = {};
						try {
							let a = "string" == typeof e ? new o.URL(e) : e;
							(n = Object.assign(
								{},
								{
									host: a.host,
									hostname: a.hostname,
									path: a.pathname + a.search + a.hash,
									port: a.port,
									protocol: a.protocol,
								}
							)),
								a.username && (n.auth = `${a.username}:${a.password}`),
								(t = c[String(n.protocol)]);
						} catch (e) {}
						if (!t)
							return void i.emit(
								"error",
								new Miniget.MinigetError("Invalid URL: " + e)
							);
						if ((Object.assign(n, a), w && k > 0)) {
							let e = k + _,
								t = g || "";
							n.headers = Object.assign({}, n.headers, { Range: `bytes=${e}-${t}` });
						}
						if (a.transform) {
							try {
								n = a.transform(n);
							} catch (e) {
								return void i.emit("error", e);
							}
							if (
								(!n || n.protocol) &&
								((t = c[String(null == n ? void 0 : n.protocol)]), !t)
							)
								return void i.emit(
									"error",
									new Miniget.MinigetError(
										"Invalid URL object from `transform` function"
									)
								);
						}
						const onError = (e) => {
								i.destroyed ||
									i.readableEnded ||
									i._readableState.ended ||
									(cleanup(),
									retryRequest({ err: e })
										? r.removeListener("close", onRequestClose)
										: i.emit("error", e));
							},
							onRequestClose = () => {
								cleanup(), retryRequest({});
							},
							cleanup = () => {
								r.removeListener("close", onRequestClose),
									null == m || m.removeListener("data", onData),
									null == f || f.removeListener("end", onEnd);
							},
							onData = (e) => {
								k += e.length;
							},
							onEnd = () => {
								cleanup(), reconnectIfEndedEarly() || i.end();
							};
						(r = t.request(n, (t) => {
							if (!i.destroyed)
								if (p.has(t.statusCode)) {
									if (b++ >= a.maxRedirects)
										i.emit(
											"error",
											new Miniget.MinigetError("Too many redirects")
										);
									else {
										if (!t.headers.location) {
											let e = new Miniget.MinigetError(
												"Redirect status code given with no location",
												t.statusCode
											);
											return i.emit("error", e), void cleanup();
										}
										(e = t.headers.location),
											setTimeout(
												doDownload,
												1e3 * parseInt(t.headers["retry-after"] || "0", 10)
											),
											i.emit("redirect", e);
									}
									cleanup();
								} else if (l.has(t.statusCode)) {
									if (
										!retryRequest({
											retryAfter: parseInt(
												t.headers["retry-after"] || "0",
												10
											),
										})
									) {
										let e = new Miniget.MinigetError(
											"Status code: " + t.statusCode,
											t.statusCode
										);
										i.emit("error", e);
									}
									cleanup();
								} else {
									if (
										t.statusCode &&
										(t.statusCode < 200 || t.statusCode >= 400)
									) {
										let e = new Miniget.MinigetError(
											"Status code: " + t.statusCode,
											t.statusCode
										);
										return (
											t.statusCode >= 500 ? onError(e) : i.emit("error", e),
											void cleanup()
										);
									}
									if (
										((f = t), a.acceptEncoding && t.headers["content-encoding"])
									)
										for (let e of t.headers["content-encoding"]
											.split(", ")
											.reverse()) {
											let t = a.acceptEncoding[e];
											t && ((f = f.pipe(t())), f.on("error", onError));
										}
									v ||
										((v = parseInt("" + t.headers["content-length"], 10)),
										(w =
											"bytes" === t.headers["accept-ranges"] &&
											v > 0 &&
											a.maxReconnects > 0)),
										t.on("data", onData),
										f.on("end", onEnd),
										f.pipe(i, { end: !w }),
										(m = t),
										i.emit("response", t),
										t.on("error", onError),
										forwardEvents(t, d);
								}
						})),
							r.on("error", onError),
							r.on("close", onRequestClose),
							forwardEvents(r, u),
							i.destroyed && streamDestroy(...E),
							i.emit("request", r),
							r.end();
					};
				let E;
				i.abort = (e) => {
					console.warn(
						"`MinigetStream#abort()` has been deprecated in favor of `MinigetStream#destroy()`"
					),
						(i.aborted = !0),
						i.emit("abort"),
						i.destroy(e);
				};
				const streamDestroy = (e) => {
					r.destroy(e),
						null == f || f.unpipe(i),
						null == f || f.destroy(),
						clearTimeout(h);
				};
				return (
					(i._destroy = (...e) => {
						(i.destroyed = !0), r ? streamDestroy(...e) : (E = e);
					}),
					(i.text = () =>
						new Promise((e, t) => {
							let n = "";
							i.setEncoding("utf8"),
								i.on("data", (e) => (n += e)),
								i.on("end", () => e(n)),
								i.on("error", t);
						})),
					process.nextTick(doDownload),
					i
				);
			}
			(Miniget.MinigetError = class MinigetError extends Error {
				constructor(e, t) {
					super(e), (this.statusCode = t);
				}
			}),
				(Miniget.defaultOptions = {
					maxRedirects: 10,
					maxRetries: 2,
					maxReconnects: 0,
					backoff: { inc: 100, max: 1e4 },
				}),
				(e.exports = Miniget);
		},
		function (e, t) {
			e.exports = require("crypto");
		},
		function (e, t) {
			e.exports = require("util");
		},
		function (e, t) {
			e.exports = require("net");
		},
		function (e, t, n) {
			"use strict";
			var a,
				i = n(13),
				r = i.Buffer,
				o = {};
			for (a in i)
				i.hasOwnProperty(a) && "SlowBuffer" !== a && "Buffer" !== a && (o[a] = i[a]);
			var s = (o.Buffer = {});
			for (a in r)
				r.hasOwnProperty(a) &&
					"allocUnsafe" !== a &&
					"allocUnsafeSlow" !== a &&
					(s[a] = r[a]);
			if (
				((o.Buffer.prototype = r.prototype),
				(s.from && s.from !== Uint8Array.from) ||
					(s.from = function (e, t, n) {
						if ("number" == typeof e)
							throw new TypeError(
								'The "value" argument must not be of type number. Received type ' +
									typeof e
							);
						if (e && void 0 === e.length)
							throw new TypeError(
								"The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
									typeof e
							);
						return r(e, t, n);
					}),
				s.alloc ||
					(s.alloc = function (e, t, n) {
						if ("number" != typeof e)
							throw new TypeError(
								'The "size" argument must be of type number. Received type ' +
									typeof e
							);
						if (e < 0 || e >= 2 * (1 << 30))
							throw new RangeError(
								'The value "' + e + '" is invalid for option "size"'
							);
						var a = r(e);
						return (
							t && 0 !== t.length
								? "string" == typeof n
									? a.fill(t, n)
									: a.fill(t)
								: a.fill(0),
							a
						);
					}),
				!o.kStringMaxLength)
			)
				try {
					o.kStringMaxLength = process.binding("buffer").kStringMaxLength;
				} catch (e) {}
			o.constants ||
				((o.constants = { MAX_LENGTH: o.kMaxLength }),
				o.kStringMaxLength && (o.constants.MAX_STRING_LENGTH = o.kStringMaxLength)),
				(e.exports = o);
		},
		function (e, t) {
			e.exports = require("buffer");
		},
		function (e, t) {
			e.exports = require("querystring");
		},
		function (e, t, n) {
			"use strict";
			e.exports = {
				BINARY_TYPES: ["nodebuffer", "arraybuffer", "fragments"],
				GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
				kStatusCode: Symbol("status-code"),
				kWebSocket: Symbol("websocket"),
				EMPTY_BUFFER: Buffer.alloc(0),
				NOOP: () => {},
			};
		},
		function (e, t, n) {
			"use strict";
			(e.exports = function bytes(e, t) {
				if ("string" == typeof e) return parse(e);
				if ("number" == typeof e) return format(e, t);
				return null;
			}),
				(e.exports.format = format),
				(e.exports.parse = parse);
			var a = /\B(?=(\d{3})+(?!\d))/g,
				i = /(?:\.0*|(\.[^0]+)0+)$/,
				r = {
					b: 1,
					kb: 1024,
					mb: 1 << 20,
					gb: 1 << 30,
					tb: Math.pow(1024, 4),
					pb: Math.pow(1024, 5),
				},
				o = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
			function format(e, t) {
				if (!Number.isFinite(e)) return null;
				var n = Math.abs(e),
					o = (t && t.thousandsSeparator) || "",
					s = (t && t.unitSeparator) || "",
					c = t && void 0 !== t.decimalPlaces ? t.decimalPlaces : 2,
					p = Boolean(t && t.fixedDecimals),
					l = (t && t.unit) || "";
				(l && r[l.toLowerCase()]) ||
					(l =
						n >= r.pb
							? "PB"
							: n >= r.tb
							? "TB"
							: n >= r.gb
							? "GB"
							: n >= r.mb
							? "MB"
							: n >= r.kb
							? "KB"
							: "B");
				var u = (e / r[l.toLowerCase()]).toFixed(c);
				return p || (u = u.replace(i, "$1")), o && (u = u.replace(a, o)), u + s + l;
			}
			function parse(e) {
				if ("number" == typeof e && !isNaN(e)) return e;
				if ("string" != typeof e) return null;
				var t,
					n = o.exec(e),
					a = "b";
				return (
					n
						? ((t = parseFloat(n[1])), (a = n[4].toLowerCase()))
						: ((t = parseInt(e, 10)), (a = "b")),
					Math.floor(r[a] * t)
				);
			}
		},
		function (e, t, n) {
			"use strict";
			var a = n(6)("http-errors"),
				i = n(23),
				r = n(24),
				o = n(95),
				s = n(97);
			function codeClass(e) {
				return Number(String(e).charAt(0) + "00");
			}
			function nameFunc(e, t) {
				var n = Object.getOwnPropertyDescriptor(e, "name");
				n && n.configurable && ((n.value = t), Object.defineProperty(e, "name", n));
			}
			(e.exports = function createError() {
				for (var e, t, n = 500, i = {}, o = 0; o < arguments.length; o++) {
					var s = arguments[o];
					if (s instanceof Error) n = (e = s).status || e.statusCode || n;
					else
						switch (typeof s) {
							case "string":
								t = s;
								break;
							case "number":
								(n = s),
									0 !== o &&
										a(
											"non-first-argument status code; replace with createError(" +
												s +
												", ...)"
										);
								break;
							case "object":
								i = s;
						}
				}
				"number" == typeof n &&
					(n < 400 || n >= 600) &&
					a("non-error status code; use only 4xx or 5xx status codes");
				("number" != typeof n || (!r[n] && (n < 400 || n >= 600))) && (n = 500);
				var c = createError[n] || createError[codeClass(n)];
				e ||
					((e = c ? new c(t) : new Error(t || r[n])),
					Error.captureStackTrace(e, createError));
				(c && e instanceof c && e.status === n) ||
					((e.expose = n < 500), (e.status = e.statusCode = n));
				for (var p in i) "status" !== p && "statusCode" !== p && (e[p] = i[p]);
				return e;
			}),
				(e.exports.HttpError = (function createHttpErrorConstructor() {
					function HttpError() {
						throw new TypeError("cannot construct abstract class");
					}
					return o(HttpError, Error), HttpError;
				})()),
				(function populateConstructorExports(e, t, n) {
					t.forEach(function forEachCode(t) {
						var a,
							c = s(r[t]);
						switch (codeClass(t)) {
							case 400:
								a = (function createClientErrorConstructor(e, t, n) {
									var a = t.match(/Error$/) ? t : t + "Error";
									function ClientError(e) {
										var t = null != e ? e : r[n],
											o = new Error(t);
										return (
											Error.captureStackTrace(o, ClientError),
											i(o, ClientError.prototype),
											Object.defineProperty(o, "message", {
												enumerable: !0,
												configurable: !0,
												value: t,
												writable: !0,
											}),
											Object.defineProperty(o, "name", {
												enumerable: !1,
												configurable: !0,
												value: a,
												writable: !0,
											}),
											o
										);
									}
									return (
										o(ClientError, e),
										nameFunc(ClientError, a),
										(ClientError.prototype.status = n),
										(ClientError.prototype.statusCode = n),
										(ClientError.prototype.expose = !0),
										ClientError
									);
								})(n, c, t);
								break;
							case 500:
								a = (function createServerErrorConstructor(e, t, n) {
									var a = t.match(/Error$/) ? t : t + "Error";
									function ServerError(e) {
										var t = null != e ? e : r[n],
											o = new Error(t);
										return (
											Error.captureStackTrace(o, ServerError),
											i(o, ServerError.prototype),
											Object.defineProperty(o, "message", {
												enumerable: !0,
												configurable: !0,
												value: t,
												writable: !0,
											}),
											Object.defineProperty(o, "name", {
												enumerable: !1,
												configurable: !0,
												value: a,
												writable: !0,
											}),
											o
										);
									}
									return (
										o(ServerError, e),
										nameFunc(ServerError, a),
										(ServerError.prototype.status = n),
										(ServerError.prototype.statusCode = n),
										(ServerError.prototype.expose = !1),
										ServerError
									);
								})(n, c, t);
						}
						a && ((e[t] = a), (e[c] = a));
					}),
						(e["I'mateapot"] = a.function(
							e.ImATeapot,
							'"I\'mateapot"; use "ImATeapot" instead'
						));
				})(e.exports, r.codes, e.exports.HttpError);
		},
		function (e, t, n) {
			"use strict";
			var a = n(120),
				i = n(52);
			function typeis(e, t) {
				var n,
					a,
					i = t,
					r = tryNormalizeType(e);
				if (!r) return !1;
				if (i && !Array.isArray(i))
					for (i = new Array(arguments.length - 1), n = 0; n < i.length; n++)
						i[n] = arguments[n + 1];
				if (!i || !i.length) return r;
				for (n = 0; n < i.length; n++)
					if (mimeMatch(normalize((a = i[n])), r))
						return "+" === a[0] || -1 !== a.indexOf("*") ? r : a;
				return !1;
			}
			function hasbody(e) {
				return (
					void 0 !== e.headers["transfer-encoding"] || !isNaN(e.headers["content-length"])
				);
			}
			function normalize(e) {
				if ("string" != typeof e) return !1;
				switch (e) {
					case "urlencoded":
						return "application/x-www-form-urlencoded";
					case "multipart":
						return "multipart/*";
				}
				return "+" === e[0] ? "*/*" + e : -1 === e.indexOf("/") ? i.lookup(e) : e;
			}
			function mimeMatch(e, t) {
				if (!1 === e) return !1;
				var n = t.split("/"),
					a = e.split("/");
				return (
					2 === n.length &&
					2 === a.length &&
					("*" === a[0] || a[0] === n[0]) &&
					("*+" === a[1].substr(0, 2)
						? a[1].length <= n[1].length + 1 &&
						  a[1].substr(1) === n[1].substr(1 - a[1].length)
						: "*" === a[1] || a[1] === n[1])
				);
			}
			function tryNormalizeType(e) {
				if (!e) return null;
				try {
					return (function normalizeType(e) {
						var t = a.parse(e);
						return (t.parameters = void 0), a.format(t);
					})(e);
				} catch (e) {
					return null;
				}
			}
			(e.exports = function typeofrequest(e, t) {
				var n = t;
				if (!hasbody(e)) return null;
				if (arguments.length > 2) {
					n = new Array(arguments.length - 1);
					for (var a = 0; a < n.length; a++) n[a] = arguments[a + 1];
				}
				var i = e.headers["content-type"];
				return typeis(i, n);
			}),
				(e.exports.is = typeis),
				(e.exports.hasBody = hasbody),
				(e.exports.normalize = normalize),
				(e.exports.match = mimeMatch);
		},
		function (e, t, n) {
			"use strict";
			var a = n(3),
				i = a.parse,
				r = a.Url;
			function parseurl(e) {
				var t = e.url;
				if (void 0 !== t) {
					var n = e._parsedUrl;
					return fresh(t, n) ? n : (((n = fastparse(t))._raw = t), (e._parsedUrl = n));
				}
			}
			function fastparse(e) {
				if ("string" != typeof e || 47 !== e.charCodeAt(0)) return i(e);
				for (var t = e, n = null, a = null, o = 1; o < e.length; o++)
					switch (e.charCodeAt(o)) {
						case 63:
							null === a &&
								((t = e.substring(0, o)),
								(n = e.substring(o + 1)),
								(a = e.substring(o)));
							break;
						case 9:
						case 10:
						case 12:
						case 13:
						case 32:
						case 35:
						case 160:
						case 65279:
							return i(e);
					}
				var s = void 0 !== r ? new r() : {};
				return (
					(s.path = e),
					(s.href = e),
					(s.pathname = t),
					null !== a && ((s.query = n), (s.search = a)),
					s
				);
			}
			function fresh(e, t) {
				return (
					"object" == typeof t &&
					null !== t &&
					(void 0 === r || t instanceof r) &&
					t._raw === e
				);
			}
			(e.exports = parseurl),
				(e.exports.original = function originalurl(e) {
					var t = e.originalUrl;
					if ("string" != typeof t) return parseurl(e);
					var n = e._parsedOriginalUrl;
					if (fresh(t, n)) return n;
					return ((n = fastparse(t))._raw = t), (e._parsedOriginalUrl = n);
				});
		},
		function (e, t, n) {
			"undefined" != typeof process && "renderer" === process.type
				? (e.exports = n(135))
				: (e.exports = n(137));
		},
		function (e, t) {
			e.exports = require("events");
		},
		function (e, t, n) {
			"use strict";
			var a = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g,
				i = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/,
				r = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/,
				o = /\\([\u000b\u0020-\u00ff])/g,
				s = /([\\"])/g,
				c = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
			function qstring(e) {
				var t = String(e);
				if (r.test(t)) return t;
				if (t.length > 0 && !i.test(t)) throw new TypeError("invalid parameter value");
				return '"' + t.replace(s, "\\$1") + '"';
			}
			function ContentType(e) {
				(this.parameters = Object.create(null)), (this.type = e);
			}
			(t.format = function format(e) {
				if (!e || "object" != typeof e) throw new TypeError("argument obj is required");
				var t = e.parameters,
					n = e.type;
				if (!n || !c.test(n)) throw new TypeError("invalid type");
				var a = n;
				if (t && "object" == typeof t)
					for (var i, o = Object.keys(t).sort(), s = 0; s < o.length; s++) {
						if (((i = o[s]), !r.test(i))) throw new TypeError("invalid parameter name");
						a += "; " + i + "=" + qstring(t[i]);
					}
				return a;
			}),
				(t.parse = function parse(e) {
					if (!e) throw new TypeError("argument string is required");
					var t =
						"object" == typeof e
							? (function getcontenttype(e) {
									var t;
									"function" == typeof e.getHeader
										? (t = e.getHeader("content-type"))
										: "object" == typeof e.headers &&
										  (t = e.headers && e.headers["content-type"]);
									if ("string" != typeof t)
										throw new TypeError(
											"content-type header is missing from object"
										);
									return t;
							  })(e)
							: e;
					if ("string" != typeof t)
						throw new TypeError("argument string is required to be a string");
					var n = t.indexOf(";"),
						i = -1 !== n ? t.substr(0, n).trim() : t.trim();
					if (!c.test(i)) throw new TypeError("invalid media type");
					var r = new ContentType(i.toLowerCase());
					if (-1 !== n) {
						var s, p, l;
						for (a.lastIndex = n; (p = a.exec(t)); ) {
							if (p.index !== n) throw new TypeError("invalid parameter format");
							(n += p[0].length),
								(s = p[1].toLowerCase()),
								'"' === (l = p[2])[0] &&
									(l = l.substr(1, l.length - 2).replace(o, "$1")),
								(r.parameters[s] = l);
						}
						if (n !== t.length) throw new TypeError("invalid parameter format");
					}
					return r;
				});
		},
		function (e, t, n) {
			"use strict";
			e.exports =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array
					? function setProtoOf(e, t) {
							return (e.__proto__ = t), e;
					  }
					: function mixinProperties(e, t) {
							for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
							return e;
					  });
		},
		function (e, t, n) {
			"use strict";
			var a = n(94);
			function status(e) {
				if ("number" == typeof e) {
					if (!status[e]) throw new Error("invalid status code: " + e);
					return e;
				}
				if ("string" != typeof e) throw new TypeError("code must be a number or string");
				var t = parseInt(e, 10);
				if (!isNaN(t)) {
					if (!status[t]) throw new Error("invalid status code: " + t);
					return t;
				}
				if (!(t = status[e.toLowerCase()]))
					throw new Error('invalid status message: "' + e + '"');
				return t;
			}
			(e.exports = status),
				(status.STATUS_CODES = a),
				(status.codes = (function populateStatusesMap(e, t) {
					var n = [];
					return (
						Object.keys(t).forEach(function forEachCode(a) {
							var i = t[a],
								r = Number(a);
							(e[r] = i), (e[i] = r), (e[i.toLowerCase()] = r), n.push(r);
						}),
						n
					);
				})(status, a)),
				(status.redirect = {
					300: !0,
					301: !0,
					302: !0,
					303: !0,
					305: !0,
					307: !0,
					308: !0,
				}),
				(status.empty = { 204: !0, 205: !0, 304: !0 }),
				(status.retry = { 502: !0, 503: !0, 504: !0 });
		},
		function (e, t, n) {
			"undefined" != typeof process && "renderer" === process.type
				? (e.exports = n(98))
				: (e.exports = n(100));
		},
		function (e, t) {
			e.exports = require("tty");
		},
		function (e, t, n) {
			"use strict";
			var a = n(17),
				i = n(101),
				r = n(47),
				o = n(28),
				s = n(5);
			e.exports = function read(e, t, n, c, p, l) {
				var u,
					d,
					m = l;
				e._body = !0;
				var f = null !== m.encoding ? m.encoding : null,
					h = m.verify;
				try {
					(d = (function contentstream(e, t, n) {
						var i,
							r = (e.headers["content-encoding"] || "identity").toLowerCase(),
							o = e.headers["content-length"];
						if ((t('content-encoding "%s"', r), !1 === n && "identity" !== r))
							throw a(415, "content encoding unsupported", {
								encoding: r,
								type: "encoding.unsupported",
							});
						switch (r) {
							case "deflate":
								(i = s.createInflate()), t("inflate body"), e.pipe(i);
								break;
							case "gzip":
								(i = s.createGunzip()), t("gunzip body"), e.pipe(i);
								break;
							case "identity":
								(i = e).length = o;
								break;
							default:
								throw a(415, 'unsupported content encoding "' + r + '"', {
									encoding: r,
									type: "encoding.unsupported",
								});
						}
						return i;
					})(e, p, m.inflate)),
						(u = d.length),
						(d.length = void 0);
				} catch (e) {
					return n(e);
				}
				if (
					((m.length = u),
					(m.encoding = h ? null : f),
					null === m.encoding && null !== f && !r.encodingExists(f))
				)
					return n(
						a(415, 'unsupported charset "' + f.toUpperCase() + '"', {
							charset: f.toLowerCase(),
							type: "charset.unsupported",
						})
					);
				p("read body"),
					i(d, m, function (i, s) {
						var l;
						if (i)
							return (
								(l =
									"encoding.unsupported" === i.type
										? a(415, 'unsupported charset "' + f.toUpperCase() + '"', {
												charset: f.toLowerCase(),
												type: "charset.unsupported",
										  })
										: a(400, i)),
								d.resume(),
								void o(e, function onfinished() {
									n(a(400, l));
								})
							);
						if (h)
							try {
								p("verify body"), h(e, t, s, f);
							} catch (e) {
								return void n(
									a(403, e, { body: s, type: e.type || "entity.verify.failed" })
								);
							}
						var u = s;
						try {
							p("parse body"),
								(u = "string" != typeof s && null !== f ? r.decode(s, f) : s),
								(e.body = c(u));
						} catch (e) {
							return void n(
								a(400, e, { body: u, type: e.type || "entity.parse.failed" })
							);
						}
						n();
					});
			};
		},
		function (e, t, n) {
			"use strict";
			(e.exports = function onFinished(e, t) {
				if (!1 !== isFinished(e)) return i(t, null, e), e;
				return (
					(function attachListener(e, t) {
						var n = e.__onFinished;
						(n && n.queue) ||
							((n = e.__onFinished = (function createListener(e) {
								function listener(t) {
									if (
										(e.__onFinished === listener && (e.__onFinished = null),
										listener.queue)
									) {
										var n = listener.queue;
										listener.queue = null;
										for (var a = 0; a < n.length; a++) n[a](t, e);
									}
								}
								return (listener.queue = []), listener;
							})(e)),
							(function attachFinishedListener(e, t) {
								var n,
									i,
									r = !1;
								function onFinish(e) {
									n.cancel(), i.cancel(), (r = !0), t(e);
								}
								function onSocket(t) {
									e.removeListener("socket", onSocket),
										r ||
											(n === i && (i = a([[t, "error", "close"]], onFinish)));
								}
								if (((n = i = a([[e, "end", "finish"]], onFinish)), e.socket))
									return void onSocket(e.socket);
								e.on("socket", onSocket),
									void 0 === e.socket &&
										(function patchAssignSocket(e, t) {
											var n = e.assignSocket;
											if ("function" != typeof n) return;
											e.assignSocket = function _assignSocket(e) {
												n.call(this, e), t(e);
											};
										})(e, onSocket);
							})(e, n));
						n.queue.push(t);
					})(e, t),
					e
				);
			}),
				(e.exports.isFinished = isFinished);
			var a = n(119),
				i =
					"function" == typeof setImmediate
						? setImmediate
						: function (e) {
								process.nextTick(e.bind.apply(e, arguments));
						  };
			function isFinished(e) {
				var t = e.socket;
				return "boolean" == typeof e.finished
					? Boolean(e.finished || (t && !t.writable))
					: "boolean" == typeof e.complete
					? Boolean(e.upgrade || !t || !t.readable || (e.complete && !e.readable))
					: void 0;
			}
		},
		function (e, t, n) {
			"use strict";
			e.exports = function encodeUrl(e) {
				return String(e).replace(i, "$1�$2").replace(a, encodeURI);
			};
			var a = /(?:[^\x21\x25\x26-\x3B\x3D\x3F-\x5B\x5D\x5F\x61-\x7A\x7E]|%(?:[^0-9A-Fa-f]|[0-9A-Fa-f][^0-9A-Fa-f]|$))+/g,
				i = /(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF]([^\uDC00-\uDFFF]|$)/g;
		},
		function (e, t, n) {
			"use strict";
			var a = /["'&<>]/;
			e.exports = function escapeHtml(e) {
				var t,
					n = "" + e,
					i = a.exec(n);
				if (!i) return n;
				var r = "",
					o = 0,
					s = 0;
				for (o = i.index; o < n.length; o++) {
					switch (n.charCodeAt(o)) {
						case 34:
							t = "&quot;";
							break;
						case 38:
							t = "&amp;";
							break;
						case 39:
							t = "&#39;";
							break;
						case 60:
							t = "&lt;";
							break;
						case 62:
							t = "&gt;";
							break;
						default:
							continue;
					}
					s !== o && (r += n.substring(s, o)), (s = o + 1), (r += t);
				}
				return s !== o ? r + n.substring(s, o) : r;
			};
		},
		function (e, t, n) {
			"use strict";
			e.exports = function arrayFlatten(e, t) {
				if (null == t)
					return (function flattenForever(e, t) {
						for (var n = 0; n < e.length; n++) {
							var a = e[n];
							Array.isArray(a) ? flattenForever(a, t) : t.push(a);
						}
						return t;
					})(e, []);
				return (function flattenWithDepth(e, t, n) {
					for (var a = 0; a < e.length; a++) {
						var i = e[a];
						n > 0 && Array.isArray(i) ? flattenWithDepth(i, t, n - 1) : t.push(i);
					}
					return t;
				})(e, [], t);
			};
		},
		function (e, t) {
			e.exports = function (e, t) {
				if (e && t) for (var n in t) e[n] = t[n];
				return e;
			};
		},
		function (e, t, n) {
			"use strict";
			const a = n(5),
				i = n(34),
				r = n(166),
				{ kStatusCode: o, NOOP: s } = n(15),
				c = Buffer.from([0, 0, 255, 255]),
				p = Symbol("permessage-deflate"),
				l = Symbol("total-length"),
				u = Symbol("callback"),
				d = Symbol("buffers"),
				m = Symbol("error");
			let f;
			function deflateOnData(e) {
				this[d].push(e), (this[l] += e.length);
			}
			function inflateOnData(e) {
				(this[l] += e.length),
					this[p]._maxPayload < 1 || this[l] <= this[p]._maxPayload
						? this[d].push(e)
						: ((this[m] = new RangeError("Max payload size exceeded")),
						  (this[m][o] = 1009),
						  this.removeListener("data", inflateOnData),
						  this.reset());
			}
			function inflateOnError(e) {
				(this[p]._inflate = null), (e[o] = 1007), this[u](e);
			}
			e.exports = class PerMessageDeflate {
				constructor(e, t, n) {
					if (
						((this._maxPayload = 0 | n),
						(this._options = e || {}),
						(this._threshold =
							void 0 !== this._options.threshold ? this._options.threshold : 1024),
						(this._isServer = !!t),
						(this._deflate = null),
						(this._inflate = null),
						(this.params = null),
						!f)
					) {
						const e =
							void 0 !== this._options.concurrencyLimit
								? this._options.concurrencyLimit
								: 10;
						f = new r(e);
					}
				}
				static get extensionName() {
					return "permessage-deflate";
				}
				offer() {
					const e = {};
					return (
						this._options.serverNoContextTakeover &&
							(e.server_no_context_takeover = !0),
						this._options.clientNoContextTakeover &&
							(e.client_no_context_takeover = !0),
						this._options.serverMaxWindowBits &&
							(e.server_max_window_bits = this._options.serverMaxWindowBits),
						this._options.clientMaxWindowBits
							? (e.client_max_window_bits = this._options.clientMaxWindowBits)
							: null == this._options.clientMaxWindowBits &&
							  (e.client_max_window_bits = !0),
						e
					);
				}
				accept(e) {
					return (
						(e = this.normalizeParams(e)),
						(this.params = this._isServer
							? this.acceptAsServer(e)
							: this.acceptAsClient(e)),
						this.params
					);
				}
				cleanup() {
					if (
						(this._inflate && (this._inflate.close(), (this._inflate = null)),
						this._deflate)
					) {
						const e = this._deflate[u];
						this._deflate.close(),
							(this._deflate = null),
							e &&
								e(
									new Error(
										"The deflate stream was closed while data was being processed"
									)
								);
					}
				}
				acceptAsServer(e) {
					const t = this._options,
						n = e.find(
							(e) =>
								!(
									(!1 === t.serverNoContextTakeover &&
										e.server_no_context_takeover) ||
									(e.server_max_window_bits &&
										(!1 === t.serverMaxWindowBits ||
											("number" == typeof t.serverMaxWindowBits &&
												t.serverMaxWindowBits >
													e.server_max_window_bits))) ||
									("number" == typeof t.clientMaxWindowBits &&
										!e.client_max_window_bits)
								)
						);
					if (!n) throw new Error("None of the extension offers can be accepted");
					return (
						t.serverNoContextTakeover && (n.server_no_context_takeover = !0),
						t.clientNoContextTakeover && (n.client_no_context_takeover = !0),
						"number" == typeof t.serverMaxWindowBits &&
							(n.server_max_window_bits = t.serverMaxWindowBits),
						"number" == typeof t.clientMaxWindowBits
							? (n.client_max_window_bits = t.clientMaxWindowBits)
							: (!0 !== n.client_max_window_bits && !1 !== t.clientMaxWindowBits) ||
							  delete n.client_max_window_bits,
						n
					);
				}
				acceptAsClient(e) {
					const t = e[0];
					if (
						!1 === this._options.clientNoContextTakeover &&
						t.client_no_context_takeover
					)
						throw new Error('Unexpected parameter "client_no_context_takeover"');
					if (t.client_max_window_bits) {
						if (
							!1 === this._options.clientMaxWindowBits ||
							("number" == typeof this._options.clientMaxWindowBits &&
								t.client_max_window_bits > this._options.clientMaxWindowBits)
						)
							throw new Error(
								'Unexpected or invalid parameter "client_max_window_bits"'
							);
					} else
						"number" == typeof this._options.clientMaxWindowBits &&
							(t.client_max_window_bits = this._options.clientMaxWindowBits);
					return t;
				}
				normalizeParams(e) {
					return (
						e.forEach((e) => {
							Object.keys(e).forEach((t) => {
								let n = e[t];
								if (n.length > 1)
									throw new Error(
										`Parameter "${t}" must have only a single value`
									);
								if (((n = n[0]), "client_max_window_bits" === t)) {
									if (!0 !== n) {
										const e = +n;
										if (!Number.isInteger(e) || e < 8 || e > 15)
											throw new TypeError(
												`Invalid value for parameter "${t}": ${n}`
											);
										n = e;
									} else if (!this._isServer)
										throw new TypeError(
											`Invalid value for parameter "${t}": ${n}`
										);
								} else if ("server_max_window_bits" === t) {
									const e = +n;
									if (!Number.isInteger(e) || e < 8 || e > 15)
										throw new TypeError(
											`Invalid value for parameter "${t}": ${n}`
										);
									n = e;
								} else {
									if (
										"client_no_context_takeover" !== t &&
										"server_no_context_takeover" !== t
									)
										throw new Error(`Unknown parameter "${t}"`);
									if (!0 !== n)
										throw new TypeError(
											`Invalid value for parameter "${t}": ${n}`
										);
								}
								e[t] = n;
							});
						}),
						e
					);
				}
				decompress(e, t, n) {
					f.add((a) => {
						this._decompress(e, t, (e, t) => {
							a(), n(e, t);
						});
					});
				}
				compress(e, t, n) {
					f.add((a) => {
						this._compress(e, t, (e, t) => {
							a(), n(e, t);
						});
					});
				}
				_decompress(e, t, n) {
					const r = this._isServer ? "client" : "server";
					if (!this._inflate) {
						const e = r + "_max_window_bits",
							t =
								"number" != typeof this.params[e]
									? a.Z_DEFAULT_WINDOWBITS
									: this.params[e];
						(this._inflate = a.createInflateRaw({
							...this._options.zlibInflateOptions,
							windowBits: t,
						})),
							(this._inflate[p] = this),
							(this._inflate[l] = 0),
							(this._inflate[d] = []),
							this._inflate.on("error", inflateOnError),
							this._inflate.on("data", inflateOnData);
					}
					(this._inflate[u] = n),
						this._inflate.write(e),
						t && this._inflate.write(c),
						this._inflate.flush(() => {
							const e = this._inflate[m];
							if (e) return this._inflate.close(), (this._inflate = null), void n(e);
							const a = i.concat(this._inflate[d], this._inflate[l]);
							this._inflate._readableState.endEmitted
								? (this._inflate.close(), (this._inflate = null))
								: ((this._inflate[l] = 0),
								  (this._inflate[d] = []),
								  t &&
										this.params[r + "_no_context_takeover"] &&
										this._inflate.reset()),
								n(null, a);
						});
				}
				_compress(e, t, n) {
					const r = this._isServer ? "server" : "client";
					if (!this._deflate) {
						const e = r + "_max_window_bits",
							t =
								"number" != typeof this.params[e]
									? a.Z_DEFAULT_WINDOWBITS
									: this.params[e];
						(this._deflate = a.createDeflateRaw({
							...this._options.zlibDeflateOptions,
							windowBits: t,
						})),
							(this._deflate[l] = 0),
							(this._deflate[d] = []),
							this._deflate.on("error", s),
							this._deflate.on("data", deflateOnData);
					}
					(this._deflate[u] = n),
						this._deflate.write(e),
						this._deflate.flush(a.Z_SYNC_FLUSH, () => {
							if (!this._deflate) return;
							let e = i.concat(this._deflate[d], this._deflate[l]);
							t && (e = e.slice(0, e.length - 4)),
								(this._deflate[u] = null),
								(this._deflate[l] = 0),
								(this._deflate[d] = []),
								t &&
									this.params[r + "_no_context_takeover"] &&
									this._deflate.reset(),
								n(null, e);
						});
				}
			};
		},
		function (e, t, n) {
			"use strict";
			const { EMPTY_BUFFER: a } = n(15);
			function concat(e, t) {
				if (0 === e.length) return a;
				if (1 === e.length) return e[0];
				const n = Buffer.allocUnsafe(t);
				let i = 0;
				for (let t = 0; t < e.length; t++) {
					const a = e[t];
					n.set(a, i), (i += a.length);
				}
				return i < t ? n.slice(0, i) : n;
			}
			function _mask(e, t, n, a, i) {
				for (let r = 0; r < i; r++) n[a + r] = e[r] ^ t[3 & r];
			}
			function _unmask(e, t) {
				const n = e.length;
				for (let a = 0; a < n; a++) e[a] ^= t[3 & a];
			}
			function toArrayBuffer(e) {
				return e.byteLength === e.buffer.byteLength
					? e.buffer
					: e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
			}
			function toBuffer(e) {
				if (((toBuffer.readOnly = !0), Buffer.isBuffer(e))) return e;
				let t;
				return (
					e instanceof ArrayBuffer
						? (t = Buffer.from(e))
						: ArrayBuffer.isView(e)
						? (t = Buffer.from(e.buffer, e.byteOffset, e.byteLength))
						: ((t = Buffer.from(e)), (toBuffer.readOnly = !1)),
					t
				);
			}
			try {
				const t = n(
						!(function webpackMissingModule() {
							var e = new Error("Cannot find module 'bufferutil'");
							throw ((e.code = "MODULE_NOT_FOUND"), e);
						})()
					),
					a = t.BufferUtil || t;
			} catch (t) {
				e.exports = {
					concat: concat,
					mask: _mask,
					toArrayBuffer: toArrayBuffer,
					toBuffer: toBuffer,
					unmask: _unmask,
				};
			}
		},
		function (e, t, n) {
			const a = n(8);
			(t.between = (e, t, n) => {
				let a;
				if (t instanceof RegExp) {
					const n = e.match(t);
					if (!n) return "";
					a = n.index + n[0].length;
				} else {
					if (((a = e.indexOf(t)), -1 === a)) return "";
					a += t.length;
				}
				return (a = (e = e.slice(a)).indexOf(n)), -1 === a ? "" : (e = e.slice(0, a));
			}),
				(t.parseAbbreviatedNumber = (e) => {
					const t = e
						.replace(",", ".")
						.replace(" ", "")
						.match(/([\d,.]+)([MK]?)/);
					if (t) {
						let [, e, n] = t;
						return (
							(e = parseFloat(e)),
							Math.round("M" === n ? 1e6 * e : "K" === n ? 1e3 * e : e)
						);
					}
					return null;
				}),
				(t.cutAfterJSON = (e) => {
					let t, n;
					if (
						("[" === e[0]
							? ((t = "["), (n = "]"))
							: "{" === e[0] && ((t = "{"), (n = "}")),
						!t)
					)
						throw new Error(
							"Can't cut unsupported JSON (need to begin with [ or { ) but got: " +
								e[0]
						);
					let a,
						i = !1,
						r = !1,
						o = 0;
					for (a = 0; a < e.length; a++)
						if ('"' !== e[a] || r) {
							if (
								((r = "\\" === e[a] && !r),
								!i && (e[a] === t ? o++ : e[a] === n && o--, 0 === o))
							)
								return e.substr(0, a + 1);
						} else i = !i;
					throw Error("Can't cut unsupported JSON (no matching closing bracket found)");
				}),
				(t.playError = (e, t, n = Error) => {
					let a = e && e.playabilityStatus;
					return a && t.includes(a.status)
						? new n(a.reason || (a.messages && a.messages[0]))
						: null;
				}),
				(t.deprecate = (e, t, n, a, i) => {
					Object.defineProperty(e, t, {
						get: () => (
							console.warn(
								`\`${a}\` will be removed in a near future release, use \`${i}\` instead.`
							),
							n
						),
					});
				});
			const i = n(172);
			(t.lastUpdateCheck = 0),
				(t.checkForUpdates = () =>
					!process.env.YTDL_NO_UPDATE &&
					!i.version.startsWith("0.0.0-") &&
					Date.now() - t.lastUpdateCheck >= 432e5
						? ((t.lastUpdateCheck = Date.now()),
						  a("https://api.github.com/repos/fent/node-ytdl-core/releases/latest", {
								headers: { "User-Agent": "ytdl-core" },
						  })
								.text()
								.then(
									(e) => {
										JSON.parse(e).tag_name !== "v" + i.version &&
											console.warn(
												'[33mWARNING:[0m ytdl-core is out of date! Update with "npm install ytdl-core@latest".'
											);
									},
									(e) => {
										console.warn("Error checking for updates:", e.message),
											console.warn(
												"You can disable this check by setting the `YTDL_NO_UPDATE` env variable."
											);
									}
								))
						: null);
		},
		function (e, t) {
			e.exports = require("https");
		},
		function (e) {
			e.exports = JSON.parse(
				'[["0","\\u0000",127,"€"],["8140","丂丄丅丆丏丒丗丟丠両丣並丩丮丯丱丳丵丷丼乀乁乂乄乆乊乑乕乗乚乛乢乣乤乥乧乨乪",5,"乲乴",9,"乿",6,"亇亊"],["8180","亐亖亗亙亜亝亞亣亪亯亰亱亴亶亷亸亹亼亽亾仈仌仏仐仒仚仛仜仠仢仦仧仩仭仮仯仱仴仸仹仺仼仾伀伂",6,"伋伌伒",4,"伜伝伡伣伨伩伬伭伮伱伳伵伷伹伻伾",4,"佄佅佇",5,"佒佔佖佡佢佦佨佪佫佭佮佱佲併佷佸佹佺佽侀侁侂侅來侇侊侌侎侐侒侓侕侖侘侙侚侜侞侟価侢"],["8240","侤侫侭侰",4,"侶",8,"俀俁係俆俇俈俉俋俌俍俒",4,"俙俛俠俢俤俥俧俫俬俰俲俴俵俶俷俹俻俼俽俿",11],["8280","個倎倐們倓倕倖倗倛倝倞倠倢倣値倧倫倯",10,"倻倽倿偀偁偂偄偅偆偉偊偋偍偐",4,"偖偗偘偙偛偝",7,"偦",5,"偭",8,"偸偹偺偼偽傁傂傃傄傆傇傉傊傋傌傎",20,"傤傦傪傫傭",4,"傳",6,"傼"],["8340","傽",17,"僐",5,"僗僘僙僛",10,"僨僩僪僫僯僰僱僲僴僶",4,"僼",9,"儈"],["8380","儉儊儌",5,"儓",13,"儢",28,"兂兇兊兌兎兏児兒兓兗兘兙兛兝",4,"兣兤兦內兩兪兯兲兺兾兿冃冄円冇冊冋冎冏冐冑冓冔冘冚冝冞冟冡冣冦",4,"冭冮冴冸冹冺冾冿凁凂凃凅凈凊凍凎凐凒",5],["8440","凘凙凚凜凞凟凢凣凥",5,"凬凮凱凲凴凷凾刄刅刉刋刌刏刐刓刔刕刜刞刟刡刢刣別刦刧刪刬刯刱刲刴刵刼刾剄",5,"剋剎剏剒剓剕剗剘"],["8480","剙剚剛剝剟剠剢剣剤剦剨剫剬剭剮剰剱剳",9,"剾劀劃",4,"劉",6,"劑劒劔",6,"劜劤劥劦劧劮劯劰労",9,"勀勁勂勄勅勆勈勊勌勍勎勏勑勓勔動勗務",5,"勠勡勢勣勥",10,"勱",7,"勻勼勽匁匂匃匄匇匉匊匋匌匎"],["8540","匑匒匓匔匘匛匜匞匟匢匤匥匧匨匩匫匬匭匯",9,"匼匽區卂卄卆卋卌卍卐協単卙卛卝卥卨卪卬卭卲卶卹卻卼卽卾厀厁厃厇厈厊厎厏"],["8580","厐",4,"厖厗厙厛厜厞厠厡厤厧厪厫厬厭厯",6,"厷厸厹厺厼厽厾叀參",4,"収叏叐叒叓叕叚叜叝叞叡叢叧叴叺叾叿吀吂吅吇吋吔吘吙吚吜吢吤吥吪吰吳吶吷吺吽吿呁呂呄呅呇呉呌呍呎呏呑呚呝",4,"呣呥呧呩",7,"呴呹呺呾呿咁咃咅咇咈咉咊咍咑咓咗咘咜咞咟咠咡"],["8640","咢咥咮咰咲咵咶咷咹咺咼咾哃哅哊哋哖哘哛哠",4,"哫哬哯哰哱哴",5,"哻哾唀唂唃唄唅唈唊",4,"唒唓唕",5,"唜唝唞唟唡唥唦"],["8680","唨唩唫唭唲唴唵唶唸唹唺唻唽啀啂啅啇啈啋",4,"啑啒啓啔啗",4,"啝啞啟啠啢啣啨啩啫啯",5,"啹啺啽啿喅喆喌喍喎喐喒喓喕喖喗喚喛喞喠",6,"喨",8,"喲喴営喸喺喼喿",4,"嗆嗇嗈嗊嗋嗎嗏嗐嗕嗗",4,"嗞嗠嗢嗧嗩嗭嗮嗰嗱嗴嗶嗸",4,"嗿嘂嘃嘄嘅"],["8740","嘆嘇嘊嘋嘍嘐",7,"嘙嘚嘜嘝嘠嘡嘢嘥嘦嘨嘩嘪嘫嘮嘯嘰嘳嘵嘷嘸嘺嘼嘽嘾噀",11,"噏",4,"噕噖噚噛噝",4],["8780","噣噥噦噧噭噮噯噰噲噳噴噵噷噸噹噺噽",7,"嚇",6,"嚐嚑嚒嚔",14,"嚤",10,"嚰",6,"嚸嚹嚺嚻嚽",12,"囋",8,"囕囖囘囙囜団囥",5,"囬囮囯囲図囶囷囸囻囼圀圁圂圅圇國",6],["8840","園",9,"圝圞圠圡圢圤圥圦圧圫圱圲圴",4,"圼圽圿坁坃坄坅坆坈坉坋坒",4,"坘坙坢坣坥坧坬坮坰坱坲坴坵坸坹坺坽坾坿垀"],["8880","垁垇垈垉垊垍",4,"垔",6,"垜垝垞垟垥垨垪垬垯垰垱垳垵垶垷垹",8,"埄",6,"埌埍埐埑埓埖埗埛埜埞埡埢埣埥",7,"埮埰埱埲埳埵埶執埻埼埾埿堁堃堄堅堈堉堊堌堎堏堐堒堓堔堖堗堘堚堛堜堝堟堢堣堥",4,"堫",4,"報堲堳場堶",7],["8940","堾",5,"塅",6,"塎塏塐塒塓塕塖塗塙",4,"塟",5,"塦",4,"塭",16,"塿墂墄墆墇墈墊墋墌"],["8980","墍",4,"墔",4,"墛墜墝墠",7,"墪",17,"墽墾墿壀壂壃壄壆",10,"壒壓壔壖",13,"壥",5,"壭壯壱売壴壵壷壸壺",7,"夃夅夆夈",4,"夎夐夑夒夓夗夘夛夝夞夠夡夢夣夦夨夬夰夲夳夵夶夻"],["8a40","夽夾夿奀奃奅奆奊奌奍奐奒奓奙奛",4,"奡奣奤奦",12,"奵奷奺奻奼奾奿妀妅妉妋妌妎妏妐妑妔妕妘妚妛妜妝妟妠妡妢妦"],["8a80","妧妬妭妰妱妳",5,"妺妼妽妿",6,"姇姈姉姌姍姎姏姕姖姙姛姞",4,"姤姦姧姩姪姫姭",11,"姺姼姽姾娀娂娊娋娍娎娏娐娒娔娕娖娗娙娚娛娝娞娡娢娤娦娧娨娪",6,"娳娵娷",4,"娽娾娿婁",4,"婇婈婋",9,"婖婗婘婙婛",5],["8b40","婡婣婤婥婦婨婩婫",8,"婸婹婻婼婽婾媀",17,"媓",6,"媜",13,"媫媬"],["8b80","媭",4,"媴媶媷媹",4,"媿嫀嫃",5,"嫊嫋嫍",4,"嫓嫕嫗嫙嫚嫛嫝嫞嫟嫢嫤嫥嫧嫨嫪嫬",4,"嫲",22,"嬊",11,"嬘",25,"嬳嬵嬶嬸",7,"孁",6],["8c40","孈",7,"孒孖孞孠孡孧孨孫孭孮孯孲孴孶孷學孹孻孼孾孿宂宆宊宍宎宐宑宒宔宖実宧宨宩宬宭宮宯宱宲宷宺宻宼寀寁寃寈寉寊寋寍寎寏"],["8c80","寑寔",8,"寠寢寣實寧審",4,"寯寱",6,"寽対尀専尃尅將專尋尌對導尐尒尓尗尙尛尞尟尠尡尣尦尨尩尪尫尭尮尯尰尲尳尵尶尷屃屄屆屇屌屍屒屓屔屖屗屘屚屛屜屝屟屢層屧",6,"屰屲",6,"屻屼屽屾岀岃",4,"岉岊岋岎岏岒岓岕岝",4,"岤",4],["8d40","岪岮岯岰岲岴岶岹岺岻岼岾峀峂峃峅",5,"峌",5,"峓",5,"峚",6,"峢峣峧峩峫峬峮峯峱",9,"峼",4],["8d80","崁崄崅崈",5,"崏",4,"崕崗崘崙崚崜崝崟",4,"崥崨崪崫崬崯",4,"崵",7,"崿",7,"嵈嵉嵍",10,"嵙嵚嵜嵞",10,"嵪嵭嵮嵰嵱嵲嵳嵵",12,"嶃",21,"嶚嶛嶜嶞嶟嶠"],["8e40","嶡",21,"嶸",12,"巆",6,"巎",12,"巜巟巠巣巤巪巬巭"],["8e80","巰巵巶巸",4,"巿帀帄帇帉帊帋帍帎帒帓帗帞",7,"帨",4,"帯帰帲",4,"帹帺帾帿幀幁幃幆",5,"幍",6,"幖",4,"幜幝幟幠幣",14,"幵幷幹幾庁庂広庅庈庉庌庍庎庒庘庛庝庡庢庣庤庨",4,"庮",4,"庴庺庻庼庽庿",6],["8f40","廆廇廈廋",5,"廔廕廗廘廙廚廜",11,"廩廫",8,"廵廸廹廻廼廽弅弆弇弉弌弍弎弐弒弔弖弙弚弜弝弞弡弢弣弤"],["8f80","弨弫弬弮弰弲",6,"弻弽弾弿彁",14,"彑彔彙彚彛彜彞彟彠彣彥彧彨彫彮彯彲彴彵彶彸彺彽彾彿徃徆徍徎徏徑従徔徖徚徛徝從徟徠徢",5,"復徫徬徯",5,"徶徸徹徺徻徾",4,"忇忈忊忋忎忓忔忕忚忛応忞忟忢忣忥忦忨忩忬忯忰忲忳忴忶忷忹忺忼怇"],["9040","怈怉怋怌怐怑怓怗怘怚怞怟怢怣怤怬怭怮怰",4,"怶",4,"怽怾恀恄",6,"恌恎恏恑恓恔恖恗恘恛恜恞恟恠恡恥恦恮恱恲恴恵恷恾悀"],["9080","悁悂悅悆悇悈悊悋悎悏悐悑悓悕悗悘悙悜悞悡悢悤悥悧悩悪悮悰悳悵悶悷悹悺悽",7,"惇惈惉惌",4,"惒惓惔惖惗惙惛惞惡",4,"惪惱惲惵惷惸惻",4,"愂愃愄愅愇愊愋愌愐",4,"愖愗愘愙愛愜愝愞愡愢愥愨愩愪愬",18,"慀",6],["9140","慇慉態慍慏慐慒慓慔慖",6,"慞慟慠慡慣慤慥慦慩",6,"慱慲慳慴慶慸",18,"憌憍憏",4,"憕"],["9180","憖",6,"憞",8,"憪憫憭",9,"憸",5,"憿懀懁懃",4,"應懌",4,"懓懕",16,"懧",13,"懶",8,"戀",5,"戇戉戓戔戙戜戝戞戠戣戦戧戨戩戫戭戯戰戱戲戵戶戸",4,"扂扄扅扆扊"],["9240","扏扐払扖扗扙扚扜",6,"扤扥扨扱扲扴扵扷扸扺扻扽抁抂抃抅抆抇抈抋",5,"抔抙抜抝択抣抦抧抩抪抭抮抯抰抲抳抴抶抷抸抺抾拀拁"],["9280","拃拋拏拑拕拝拞拠拡拤拪拫拰拲拵拸拹拺拻挀挃挄挅挆挊挋挌挍挏挐挒挓挔挕挗挘挙挜挦挧挩挬挭挮挰挱挳",5,"挻挼挾挿捀捁捄捇捈捊捑捒捓捔捖",7,"捠捤捥捦捨捪捫捬捯捰捲捳捴捵捸捹捼捽捾捿掁掃掄掅掆掋掍掑掓掔掕掗掙",6,"採掤掦掫掯掱掲掵掶掹掻掽掿揀"],["9340","揁揂揃揅揇揈揊揋揌揑揓揔揕揗",6,"揟揢揤",4,"揫揬揮揯揰揱揳揵揷揹揺揻揼揾搃搄搆",4,"損搎搑搒搕",5,"搝搟搢搣搤"],["9380","搥搧搨搩搫搮",5,"搵",4,"搻搼搾摀摂摃摉摋",6,"摓摕摖摗摙",4,"摟",7,"摨摪摫摬摮",9,"摻",6,"撃撆撈",8,"撓撔撗撘撚撛撜撝撟",4,"撥撦撧撨撪撫撯撱撲撳撴撶撹撻撽撾撿擁擃擄擆",6,"擏擑擓擔擕擖擙據"],["9440","擛擜擝擟擠擡擣擥擧",24,"攁",7,"攊",7,"攓",4,"攙",8],["9480","攢攣攤攦",4,"攬攭攰攱攲攳攷攺攼攽敀",4,"敆敇敊敋敍敎敐敒敓敔敗敘敚敜敟敠敡敤敥敧敨敩敪敭敮敯敱敳敵敶數",14,"斈斉斊斍斎斏斒斔斕斖斘斚斝斞斠斢斣斦斨斪斬斮斱",7,"斺斻斾斿旀旂旇旈旉旊旍旐旑旓旔旕旘",7,"旡旣旤旪旫"],["9540","旲旳旴旵旸旹旻",4,"昁昄昅昇昈昉昋昍昐昑昒昖昗昘昚昛昜昞昡昢昣昤昦昩昪昫昬昮昰昲昳昷",4,"昽昿晀時晄",6,"晍晎晐晑晘"],["9580","晙晛晜晝晞晠晢晣晥晧晩",4,"晱晲晳晵晸晹晻晼晽晿暀暁暃暅暆暈暉暊暋暍暎暏暐暒暓暔暕暘",4,"暞",8,"暩",4,"暯",4,"暵暶暷暸暺暻暼暽暿",25,"曚曞",7,"曧曨曪",5,"曱曵曶書曺曻曽朁朂會"],["9640","朄朅朆朇朌朎朏朑朒朓朖朘朙朚朜朞朠",5,"朧朩朮朰朲朳朶朷朸朹朻朼朾朿杁杄杅杇杊杋杍杒杔杕杗",4,"杝杢杣杤杦杧杫杬杮東杴杶"],["9680","杸杹杺杻杽枀枂枃枅枆枈枊枌枍枎枏枑枒枓枔枖枙枛枟枠枡枤枦枩枬枮枱枲枴枹",7,"柂柅",9,"柕柖柗柛柟柡柣柤柦柧柨柪柫柭柮柲柵",7,"柾栁栂栃栄栆栍栐栒栔栕栘",4,"栞栟栠栢",6,"栫",6,"栴栵栶栺栻栿桇桋桍桏桒桖",5],["9740","桜桝桞桟桪桬",7,"桵桸",8,"梂梄梇",7,"梐梑梒梔梕梖梘",9,"梣梤梥梩梪梫梬梮梱梲梴梶梷梸"],["9780","梹",6,"棁棃",5,"棊棌棎棏棐棑棓棔棖棗棙棛",4,"棡棢棤",9,"棯棲棳棴棶棷棸棻棽棾棿椀椂椃椄椆",4,"椌椏椑椓",11,"椡椢椣椥",7,"椮椯椱椲椳椵椶椷椸椺椻椼椾楀楁楃",16,"楕楖楘楙楛楜楟"],["9840","楡楢楤楥楧楨楩楪楬業楯楰楲",4,"楺楻楽楾楿榁榃榅榊榋榌榎",5,"榖榗榙榚榝",9,"榩榪榬榮榯榰榲榳榵榶榸榹榺榼榽"],["9880","榾榿槀槂",7,"構槍槏槑槒槓槕",5,"槜槝槞槡",11,"槮槯槰槱槳",9,"槾樀",9,"樋",11,"標",5,"樠樢",5,"権樫樬樭樮樰樲樳樴樶",6,"樿",4,"橅橆橈",7,"橑",6,"橚"],["9940","橜",4,"橢橣橤橦",10,"橲",6,"橺橻橽橾橿檁檂檃檅",8,"檏檒",4,"檘",7,"檡",5],["9980","檧檨檪檭",114,"欥欦欨",6],["9a40","欯欰欱欳欴欵欶欸欻欼欽欿歀歁歂歄歅歈歊歋歍",11,"歚",7,"歨歩歫",13,"歺歽歾歿殀殅殈"],["9a80","殌殎殏殐殑殔殕殗殘殙殜",4,"殢",7,"殫",7,"殶殸",6,"毀毃毄毆",4,"毌毎毐毑毘毚毜",4,"毢",7,"毬毭毮毰毱毲毴毶毷毸毺毻毼毾",6,"氈",4,"氎氒気氜氝氞氠氣氥氫氬氭氱氳氶氷氹氺氻氼氾氿汃汄汅汈汋",4,"汑汒汓汖汘"],["9b40","汙汚汢汣汥汦汧汫",4,"汱汳汵汷汸決汻汼汿沀沄沇沊沋沍沎沑沒沕沖沗沘沚沜沝沞沠沢沨沬沯沰沴沵沶沷沺泀況泂泃泆泇泈泋泍泎泏泑泒泘"],["9b80","泙泚泜泝泟泤泦泧泩泬泭泲泴泹泿洀洂洃洅洆洈洉洊洍洏洐洑洓洔洕洖洘洜洝洟",5,"洦洨洩洬洭洯洰洴洶洷洸洺洿浀浂浄浉浌浐浕浖浗浘浛浝浟浡浢浤浥浧浨浫浬浭浰浱浲浳浵浶浹浺浻浽",4,"涃涄涆涇涊涋涍涏涐涒涖",4,"涜涢涥涬涭涰涱涳涴涶涷涹",5,"淁淂淃淈淉淊"],["9c40","淍淎淏淐淒淓淔淕淗淚淛淜淟淢淣淥淧淨淩淪淭淯淰淲淴淵淶淸淺淽",7,"渆渇済渉渋渏渒渓渕渘渙減渜渞渟渢渦渧渨渪測渮渰渱渳渵"],["9c80","渶渷渹渻",7,"湅",7,"湏湐湑湒湕湗湙湚湜湝湞湠",10,"湬湭湯",14,"満溁溂溄溇溈溊",4,"溑",6,"溙溚溛溝溞溠溡溣溤溦溨溩溫溬溭溮溰溳溵溸溹溼溾溿滀滃滄滅滆滈滉滊滌滍滎滐滒滖滘滙滛滜滝滣滧滪",5],["9d40","滰滱滲滳滵滶滷滸滺",7,"漃漄漅漇漈漊",4,"漐漑漒漖",9,"漡漢漣漥漦漧漨漬漮漰漲漴漵漷",6,"漿潀潁潂"],["9d80","潃潄潅潈潉潊潌潎",9,"潙潚潛潝潟潠潡潣潤潥潧",5,"潯潰潱潳潵潶潷潹潻潽",6,"澅澆澇澊澋澏",12,"澝澞澟澠澢",4,"澨",10,"澴澵澷澸澺",5,"濁濃",5,"濊",6,"濓",10,"濟濢濣濤濥"],["9e40","濦",7,"濰",32,"瀒",7,"瀜",6,"瀤",6],["9e80","瀫",9,"瀶瀷瀸瀺",17,"灍灎灐",13,"灟",11,"灮灱灲灳灴灷灹灺灻災炁炂炃炄炆炇炈炋炌炍炏炐炑炓炗炘炚炛炞",12,"炰炲炴炵炶為炾炿烄烅烆烇烉烋",12,"烚"],["9f40","烜烝烞烠烡烢烣烥烪烮烰",6,"烸烺烻烼烾",10,"焋",4,"焑焒焔焗焛",10,"焧",7,"焲焳焴"],["9f80","焵焷",13,"煆煇煈煉煋煍煏",12,"煝煟",4,"煥煩",4,"煯煰煱煴煵煶煷煹煻煼煾",5,"熅",4,"熋熌熍熎熐熑熒熓熕熖熗熚",4,"熡",6,"熩熪熫熭",5,"熴熶熷熸熺",8,"燄",9,"燏",4],["a040","燖",9,"燡燢燣燤燦燨",5,"燯",9,"燺",11,"爇",19],["a080","爛爜爞",9,"爩爫爭爮爯爲爳爴爺爼爾牀",6,"牉牊牋牎牏牐牑牓牔牕牗牘牚牜牞牠牣牤牥牨牪牫牬牭牰牱牳牴牶牷牸牻牼牽犂犃犅",4,"犌犎犐犑犓",11,"犠",11,"犮犱犲犳犵犺",6,"狅狆狇狉狊狋狌狏狑狓狔狕狖狘狚狛"],["a1a1","　、。·ˉˇ¨〃々—～‖…‘’“”〔〕〈",7,"〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓"],["a2a1","ⅰ",9],["a2b1","⒈",19,"⑴",19,"①",9],["a2e5","㈠",9],["a2f1","Ⅰ",11],["a3a1","！＂＃￥％",88,"￣"],["a4a1","ぁ",82],["a5a1","ァ",85],["a6a1","Α",16,"Σ",6],["a6c1","α",16,"σ",6],["a6e0","︵︶︹︺︿﹀︽︾﹁﹂﹃﹄"],["a6ee","︻︼︷︸︱"],["a6f4","︳︴"],["a7a1","А",5,"ЁЖ",25],["a7d1","а",5,"ёж",25],["a840","ˊˋ˙–―‥‵℅℉↖↗↘↙∕∟∣≒≦≧⊿═",35,"▁",6],["a880","█",7,"▓▔▕▼▽◢◣◤◥☉⊕〒〝〞"],["a8a1","āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüêɑ"],["a8bd","ńň"],["a8c0","ɡ"],["a8c5","ㄅ",36],["a940","〡",8,"㊣㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕︰￢￤"],["a959","℡㈱"],["a95c","‐"],["a960","ー゛゜ヽヾ〆ゝゞ﹉",9,"﹔﹕﹖﹗﹙",8],["a980","﹢",4,"﹨﹩﹪﹫"],["a996","〇"],["a9a4","─",75],["aa40","狜狝狟狢",5,"狪狫狵狶狹狽狾狿猀猂猄",5,"猋猌猍猏猐猑猒猔猘猙猚猟猠猣猤猦猧猨猭猯猰猲猳猵猶猺猻猼猽獀",8],["aa80","獉獊獋獌獎獏獑獓獔獕獖獘",7,"獡",10,"獮獰獱"],["ab40","獲",11,"獿",4,"玅玆玈玊玌玍玏玐玒玓玔玕玗玘玙玚玜玝玞玠玡玣",5,"玪玬玭玱玴玵玶玸玹玼玽玾玿珁珃",4],["ab80","珋珌珎珒",6,"珚珛珜珝珟珡珢珣珤珦珨珪珫珬珮珯珰珱珳",4],["ac40","珸",10,"琄琇琈琋琌琍琎琑",8,"琜",5,"琣琤琧琩琫琭琯琱琲琷",4,"琽琾琿瑀瑂",11],["ac80","瑎",6,"瑖瑘瑝瑠",12,"瑮瑯瑱",4,"瑸瑹瑺"],["ad40","瑻瑼瑽瑿璂璄璅璆璈璉璊璌璍璏璑",10,"璝璟",7,"璪",15,"璻",12],["ad80","瓈",9,"瓓",8,"瓝瓟瓡瓥瓧",6,"瓰瓱瓲"],["ae40","瓳瓵瓸",6,"甀甁甂甃甅",7,"甎甐甒甔甕甖甗甛甝甞甠",4,"甦甧甪甮甴甶甹甼甽甿畁畂畃畄畆畇畉畊畍畐畑畒畓畕畖畗畘"],["ae80","畝",7,"畧畨畩畫",6,"畳畵當畷畺",4,"疀疁疂疄疅疇"],["af40","疈疉疊疌疍疎疐疓疕疘疛疜疞疢疦",4,"疭疶疷疺疻疿痀痁痆痋痌痎痏痐痑痓痗痙痚痜痝痟痠痡痥痩痬痭痮痯痲痳痵痶痷痸痺痻痽痾瘂瘄瘆瘇"],["af80","瘈瘉瘋瘍瘎瘏瘑瘒瘓瘔瘖瘚瘜瘝瘞瘡瘣瘧瘨瘬瘮瘯瘱瘲瘶瘷瘹瘺瘻瘽癁療癄"],["b040","癅",6,"癎",5,"癕癗",4,"癝癟癠癡癢癤",6,"癬癭癮癰",7,"癹発發癿皀皁皃皅皉皊皌皍皏皐皒皔皕皗皘皚皛"],["b080","皜",7,"皥",8,"皯皰皳皵",9,"盀盁盃啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥"],["b140","盄盇盉盋盌盓盕盙盚盜盝盞盠",4,"盦",7,"盰盳盵盶盷盺盻盽盿眀眂眃眅眆眊県眎",10,"眛眜眝眞眡眣眤眥眧眪眫"],["b180","眬眮眰",4,"眹眻眽眾眿睂睄睅睆睈",7,"睒",7,"睜薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳"],["b240","睝睞睟睠睤睧睩睪睭",11,"睺睻睼瞁瞂瞃瞆",5,"瞏瞐瞓",11,"瞡瞣瞤瞦瞨瞫瞭瞮瞯瞱瞲瞴瞶",4],["b280","瞼瞾矀",12,"矎",8,"矘矙矚矝",4,"矤病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖"],["b340","矦矨矪矯矰矱矲矴矵矷矹矺矻矼砃",5,"砊砋砎砏砐砓砕砙砛砞砠砡砢砤砨砪砫砮砯砱砲砳砵砶砽砿硁硂硃硄硆硈硉硊硋硍硏硑硓硔硘硙硚"],["b380","硛硜硞",11,"硯",7,"硸硹硺硻硽",6,"场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚"],["b440","碄碅碆碈碊碋碏碐碒碔碕碖碙碝碞碠碢碤碦碨",7,"碵碶碷碸確碻碼碽碿磀磂磃磄磆磇磈磌磍磎磏磑磒磓磖磗磘磚",9],["b480","磤磥磦磧磩磪磫磭",4,"磳磵磶磸磹磻",5,"礂礃礄礆",6,"础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮"],["b540","礍",5,"礔",9,"礟",4,"礥",14,"礵",4,"礽礿祂祃祄祅祇祊",8,"祔祕祘祙祡祣"],["b580","祤祦祩祪祫祬祮祰",6,"祹祻",4,"禂禃禆禇禈禉禋禌禍禎禐禑禒怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠"],["b640","禓",6,"禛",11,"禨",10,"禴",4,"禼禿秂秄秅秇秈秊秌秎秏秐秓秔秖秗秙",5,"秠秡秢秥秨秪"],["b680","秬秮秱",6,"秹秺秼秾秿稁稄稅稇稈稉稊稌稏",4,"稕稖稘稙稛稜丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二"],["b740","稝稟稡稢稤",14,"稴稵稶稸稺稾穀",5,"穇",9,"穒",4,"穘",16],["b780","穩",6,"穱穲穳穵穻穼穽穾窂窅窇窉窊窋窌窎窏窐窓窔窙窚窛窞窡窢贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服"],["b840","窣窤窧窩窪窫窮",4,"窴",10,"竀",10,"竌",9,"竗竘竚竛竜竝竡竢竤竧",5,"竮竰竱竲竳"],["b880","竴",4,"竻竼竾笀笁笂笅笇笉笌笍笎笐笒笓笖笗笘笚笜笝笟笡笢笣笧笩笭浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹"],["b940","笯笰笲笴笵笶笷笹笻笽笿",5,"筆筈筊筍筎筓筕筗筙筜筞筟筡筣",10,"筯筰筳筴筶筸筺筼筽筿箁箂箃箄箆",6,"箎箏"],["b980","箑箒箓箖箘箙箚箛箞箟箠箣箤箥箮箯箰箲箳箵箶箷箹",7,"篂篃範埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈"],["ba40","篅篈築篊篋篍篎篏篐篒篔",4,"篛篜篞篟篠篢篣篤篧篨篩篫篬篭篯篰篲",4,"篸篹篺篻篽篿",7,"簈簉簊簍簎簐",5,"簗簘簙"],["ba80","簚",4,"簠",5,"簨簩簫",12,"簹",5,"籂骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖"],["bb40","籃",9,"籎",36,"籵",5,"籾",9],["bb80","粈粊",6,"粓粔粖粙粚粛粠粡粣粦粧粨粩粫粬粭粯粰粴",4,"粺粻弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕"],["bc40","粿糀糂糃糄糆糉糋糎",6,"糘糚糛糝糞糡",6,"糩",5,"糰",7,"糹糺糼",13,"紋",5],["bc80","紑",14,"紡紣紤紥紦紨紩紪紬紭紮細",6,"肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件"],["bd40","紷",54,"絯",7],["bd80","絸",32,"健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸"],["be40","継",12,"綧",6,"綯",42],["be80","線",32,"尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻"],["bf40","緻",62],["bf80","縺縼",4,"繂",4,"繈",21,"俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀"],["c040","繞",35,"纃",23,"纜纝纞"],["c080","纮纴纻纼绖绤绬绹缊缐缞缷缹缻",6,"罃罆",9,"罒罓馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐"],["c140","罖罙罛罜罝罞罠罣",4,"罫罬罭罯罰罳罵罶罷罸罺罻罼罽罿羀羂",7,"羋羍羏",4,"羕",4,"羛羜羠羢羣羥羦羨",6,"羱"],["c180","羳",4,"羺羻羾翀翂翃翄翆翇翈翉翋翍翏",4,"翖翗翙",5,"翢翣痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿"],["c240","翤翧翨翪翫翬翭翯翲翴",6,"翽翾翿耂耇耈耉耊耎耏耑耓耚耛耝耞耟耡耣耤耫",5,"耲耴耹耺耼耾聀聁聄聅聇聈聉聎聏聐聑聓聕聖聗"],["c280","聙聛",13,"聫",5,"聲",11,"隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫"],["c340","聾肁肂肅肈肊肍",5,"肔肕肗肙肞肣肦肧肨肬肰肳肵肶肸肹肻胅胇",4,"胏",6,"胘胟胠胢胣胦胮胵胷胹胻胾胿脀脁脃脄脅脇脈脋"],["c380","脌脕脗脙脛脜脝脟",12,"脭脮脰脳脴脵脷脹",4,"脿谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸"],["c440","腀",5,"腇腉腍腎腏腒腖腗腘腛",4,"腡腢腣腤腦腨腪腫腬腯腲腳腵腶腷腸膁膃",4,"膉膋膌膍膎膐膒",5,"膙膚膞",4,"膤膥"],["c480","膧膩膫",7,"膴",5,"膼膽膾膿臄臅臇臈臉臋臍",6,"摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁"],["c540","臔",14,"臤臥臦臨臩臫臮",4,"臵",5,"臽臿舃與",4,"舎舏舑舓舕",5,"舝舠舤舥舦舧舩舮舲舺舼舽舿"],["c580","艀艁艂艃艅艆艈艊艌艍艎艐",7,"艙艛艜艝艞艠",7,"艩拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗"],["c640","艪艫艬艭艱艵艶艷艸艻艼芀芁芃芅芆芇芉芌芐芓芔芕芖芚芛芞芠芢芣芧芲芵芶芺芻芼芿苀苂苃苅苆苉苐苖苙苚苝苢苧苨苩苪苬苭苮苰苲苳苵苶苸"],["c680","苺苼",4,"茊茋茍茐茒茓茖茘茙茝",9,"茩茪茮茰茲茷茻茽啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐"],["c740","茾茿荁荂荄荅荈荊",4,"荓荕",4,"荝荢荰",6,"荹荺荾",6,"莇莈莊莋莌莍莏莐莑莔莕莖莗莙莚莝莟莡",6,"莬莭莮"],["c780","莯莵莻莾莿菂菃菄菆菈菉菋菍菎菐菑菒菓菕菗菙菚菛菞菢菣菤菦菧菨菫菬菭恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠"],["c840","菮華菳",4,"菺菻菼菾菿萀萂萅萇萈萉萊萐萒",5,"萙萚萛萞",5,"萩",7,"萲",5,"萹萺萻萾",7,"葇葈葉"],["c880","葊",6,"葒",4,"葘葝葞葟葠葢葤",4,"葪葮葯葰葲葴葷葹葻葼取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁"],["c940","葽",4,"蒃蒄蒅蒆蒊蒍蒏",7,"蒘蒚蒛蒝蒞蒟蒠蒢",12,"蒰蒱蒳蒵蒶蒷蒻蒼蒾蓀蓂蓃蓅蓆蓇蓈蓋蓌蓎蓏蓒蓔蓕蓗"],["c980","蓘",4,"蓞蓡蓢蓤蓧",4,"蓭蓮蓯蓱",10,"蓽蓾蔀蔁蔂伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳"],["ca40","蔃",8,"蔍蔎蔏蔐蔒蔔蔕蔖蔘蔙蔛蔜蔝蔞蔠蔢",8,"蔭",9,"蔾",4,"蕄蕅蕆蕇蕋",10],["ca80","蕗蕘蕚蕛蕜蕝蕟",4,"蕥蕦蕧蕩",8,"蕳蕵蕶蕷蕸蕼蕽蕿薀薁省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱"],["cb40","薂薃薆薈",6,"薐",10,"薝",6,"薥薦薧薩薫薬薭薱",5,"薸薺",6,"藂",6,"藊",4,"藑藒"],["cb80","藔藖",5,"藝",6,"藥藦藧藨藪",14,"恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔"],["cc40","藹藺藼藽藾蘀",4,"蘆",10,"蘒蘓蘔蘕蘗",15,"蘨蘪",13,"蘹蘺蘻蘽蘾蘿虀"],["cc80","虁",11,"虒虓處",4,"虛虜虝號虠虡虣",7,"獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃"],["cd40","虭虯虰虲",6,"蚃",6,"蚎",4,"蚔蚖",5,"蚞",4,"蚥蚦蚫蚭蚮蚲蚳蚷蚸蚹蚻",4,"蛁蛂蛃蛅蛈蛌蛍蛒蛓蛕蛖蛗蛚蛜"],["cd80","蛝蛠蛡蛢蛣蛥蛦蛧蛨蛪蛫蛬蛯蛵蛶蛷蛺蛻蛼蛽蛿蜁蜄蜅蜆蜋蜌蜎蜏蜐蜑蜔蜖汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威"],["ce40","蜙蜛蜝蜟蜠蜤蜦蜧蜨蜪蜫蜬蜭蜯蜰蜲蜳蜵蜶蜸蜹蜺蜼蜽蝀",6,"蝊蝋蝍蝏蝐蝑蝒蝔蝕蝖蝘蝚",5,"蝡蝢蝦",7,"蝯蝱蝲蝳蝵"],["ce80","蝷蝸蝹蝺蝿螀螁螄螆螇螉螊螌螎",4,"螔螕螖螘",6,"螠",4,"巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺"],["cf40","螥螦螧螩螪螮螰螱螲螴螶螷螸螹螻螼螾螿蟁",4,"蟇蟈蟉蟌",4,"蟔",6,"蟜蟝蟞蟟蟡蟢蟣蟤蟦蟧蟨蟩蟫蟬蟭蟯",9],["cf80","蟺蟻蟼蟽蟿蠀蠁蠂蠄",5,"蠋",7,"蠔蠗蠘蠙蠚蠜",4,"蠣稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓"],["d040","蠤",13,"蠳",5,"蠺蠻蠽蠾蠿衁衂衃衆",5,"衎",5,"衕衖衘衚",6,"衦衧衪衭衯衱衳衴衵衶衸衹衺"],["d080","衻衼袀袃袆袇袉袊袌袎袏袐袑袓袔袕袗",4,"袝",4,"袣袥",5,"小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄"],["d140","袬袮袯袰袲",4,"袸袹袺袻袽袾袿裀裃裄裇裈裊裋裌裍裏裐裑裓裖裗裚",4,"裠裡裦裧裩",6,"裲裵裶裷裺裻製裿褀褁褃",5],["d180","褉褋",4,"褑褔",4,"褜",4,"褢褣褤褦褧褨褩褬褭褮褯褱褲褳褵褷选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶"],["d240","褸",8,"襂襃襅",24,"襠",5,"襧",19,"襼"],["d280","襽襾覀覂覄覅覇",26,"摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐"],["d340","覢",30,"觃觍觓觔觕觗觘觙觛觝觟觠觡觢觤觧觨觩觪觬觭觮觰觱觲觴",6],["d380","觻",4,"訁",5,"計",21,"印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉"],["d440","訞",31,"訿",8,"詉",21],["d480","詟",25,"詺",6,"浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧"],["d540","誁",7,"誋",7,"誔",46],["d580","諃",32,"铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政"],["d640","諤",34,"謈",27],["d680","謤謥謧",30,"帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑"],["d740","譆",31,"譧",4,"譭",25],["d780","讇",24,"讬讱讻诇诐诪谉谞住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座"],["d840","谸",8,"豂豃豄豅豈豊豋豍",7,"豖豗豘豙豛",5,"豣",6,"豬",6,"豴豵豶豷豻",6,"貃貄貆貇"],["d880","貈貋貍",6,"貕貖貗貙",20,"亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝"],["d940","貮",62],["d980","賭",32,"佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼"],["da40","贎",14,"贠赑赒赗赟赥赨赩赪赬赮赯赱赲赸",8,"趂趃趆趇趈趉趌",4,"趒趓趕",9,"趠趡"],["da80","趢趤",12,"趲趶趷趹趻趽跀跁跂跅跇跈跉跊跍跐跒跓跔凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺"],["db40","跕跘跙跜跠跡跢跥跦跧跩跭跮跰跱跲跴跶跼跾",6,"踆踇踈踋踍踎踐踑踒踓踕",7,"踠踡踤",4,"踫踭踰踲踳踴踶踷踸踻踼踾"],["db80","踿蹃蹅蹆蹌",4,"蹓",5,"蹚",11,"蹧蹨蹪蹫蹮蹱邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝"],["dc40","蹳蹵蹷",4,"蹽蹾躀躂躃躄躆躈",6,"躑躒躓躕",6,"躝躟",11,"躭躮躰躱躳",6,"躻",7],["dc80","軃",10,"軏",21,"堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥"],["dd40","軥",62],["dd80","輤",32,"荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺"],["de40","轅",32,"轪辀辌辒辝辠辡辢辤辥辦辧辪辬辭辮辯農辳辴辵辷辸辺辻込辿迀迃迆"],["de80","迉",4,"迏迒迖迗迚迠迡迣迧迬迯迱迲迴迵迶迺迻迼迾迿逇逈逌逎逓逕逘蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖"],["df40","這逜連逤逥逧",5,"逰",4,"逷逹逺逽逿遀遃遅遆遈",4,"過達違遖遙遚遜",5,"遤遦遧適遪遫遬遯",4,"遶",6,"遾邁"],["df80","還邅邆邇邉邊邌",4,"邒邔邖邘邚邜邞邟邠邤邥邧邨邩邫邭邲邷邼邽邿郀摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼"],["e040","郂郃郆郈郉郋郌郍郒郔郕郖郘郙郚郞郟郠郣郤郥郩郪郬郮郰郱郲郳郵郶郷郹郺郻郼郿鄀鄁鄃鄅",19,"鄚鄛鄜"],["e080","鄝鄟鄠鄡鄤",10,"鄰鄲",6,"鄺",8,"酄唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼"],["e140","酅酇酈酑酓酔酕酖酘酙酛酜酟酠酦酧酨酫酭酳酺酻酼醀",4,"醆醈醊醎醏醓",6,"醜",5,"醤",5,"醫醬醰醱醲醳醶醷醸醹醻"],["e180","醼",10,"釈釋釐釒",9,"針",8,"帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺"],["e240","釦",62],["e280","鈥",32,"狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧",5,"饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂"],["e340","鉆",45,"鉵",16],["e380","銆",7,"銏",24,"恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾"],["e440","銨",5,"銯",24,"鋉",31],["e480","鋩",32,"洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑"],["e540","錊",51,"錿",10],["e580","鍊",31,"鍫濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣"],["e640","鍬",34,"鎐",27],["e680","鎬",29,"鏋鏌鏍妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩"],["e740","鏎",7,"鏗",54],["e780","鐎",32,"纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡",6,"缪缫缬缭缯",4,"缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬"],["e840","鐯",14,"鐿",43,"鑬鑭鑮鑯"],["e880","鑰",20,"钑钖钘铇铏铓铔铚铦铻锜锠琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹"],["e940","锧锳锽镃镈镋镕镚镠镮镴镵長",7,"門",42],["e980","閫",32,"椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋"],["ea40","闌",27,"闬闿阇阓阘阛阞阠阣",6,"阫阬阭阯阰阷阸阹阺阾陁陃陊陎陏陑陒陓陖陗"],["ea80","陘陙陚陜陝陞陠陣陥陦陫陭",4,"陳陸",12,"隇隉隊辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰"],["eb40","隌階隑隒隓隕隖隚際隝",9,"隨",7,"隱隲隴隵隷隸隺隻隿雂雃雈雊雋雐雑雓雔雖",9,"雡",6,"雫"],["eb80","雬雭雮雰雱雲雴雵雸雺電雼雽雿霂霃霅霊霋霌霐霑霒霔霕霗",4,"霝霟霠搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻"],["ec40","霡",8,"霫霬霮霯霱霳",4,"霺霻霼霽霿",18,"靔靕靗靘靚靜靝靟靣靤靦靧靨靪",7],["ec80","靲靵靷",4,"靽",7,"鞆",4,"鞌鞎鞏鞐鞓鞕鞖鞗鞙",4,"臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐"],["ed40","鞞鞟鞡鞢鞤",6,"鞬鞮鞰鞱鞳鞵",46],["ed80","韤韥韨韮",4,"韴韷",23,"怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨"],["ee40","頏",62],["ee80","顎",32,"睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶",4,"钼钽钿铄铈",6,"铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪"],["ef40","顯",5,"颋颎颒颕颙颣風",37,"飏飐飔飖飗飛飜飝飠",4],["ef80","飥飦飩",30,"铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒",4,"锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤",8,"镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔"],["f040","餈",4,"餎餏餑",28,"餯",26],["f080","饊",9,"饖",12,"饤饦饳饸饹饻饾馂馃馉稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨",4,"鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦",6,"鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙"],["f140","馌馎馚",10,"馦馧馩",47],["f180","駙",32,"瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃"],["f240","駺",62],["f280","騹",32,"颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒"],["f340","驚",17,"驲骃骉骍骎骔骕骙骦骩",6,"骲骳骴骵骹骻骽骾骿髃髄髆",4,"髍髎髏髐髒體髕髖髗髙髚髛髜"],["f380","髝髞髠髢髣髤髥髧髨髩髪髬髮髰",8,"髺髼",6,"鬄鬅鬆蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋"],["f440","鬇鬉",5,"鬐鬑鬒鬔",10,"鬠鬡鬢鬤",10,"鬰鬱鬳",7,"鬽鬾鬿魀魆魊魋魌魎魐魒魓魕",5],["f480","魛",32,"簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤"],["f540","魼",62],["f580","鮻",32,"酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜"],["f640","鯜",62],["f680","鰛",32,"觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅",5,"龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞",5,"鲥",4,"鲫鲭鲮鲰",7,"鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋"],["f740","鰼",62],["f780","鱻鱽鱾鲀鲃鲄鲉鲊鲌鲏鲓鲖鲗鲘鲙鲝鲪鲬鲯鲹鲾",4,"鳈鳉鳑鳒鳚鳛鳠鳡鳌",4,"鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄"],["f840","鳣",62],["f880","鴢",32],["f940","鵃",62],["f980","鶂",32],["fa40","鶣",62],["fa80","鷢",32],["fb40","鸃",27,"鸤鸧鸮鸰鸴鸻鸼鹀鹍鹐鹒鹓鹔鹖鹙鹝鹟鹠鹡鹢鹥鹮鹯鹲鹴",9,"麀"],["fb80","麁麃麄麅麆麉麊麌",5,"麔",8,"麞麠",5,"麧麨麩麪"],["fc40","麫",8,"麵麶麷麹麺麼麿",4,"黅黆黇黈黊黋黌黐黒黓黕黖黗黙黚點黡黣黤黦黨黫黬黭黮黰",8,"黺黽黿",6],["fc80","鼆",4,"鼌鼏鼑鼒鼔鼕鼖鼘鼚",5,"鼡鼣",8,"鼭鼮鼰鼱"],["fd40","鼲",4,"鼸鼺鼼鼿",4,"齅",10,"齒",38],["fd80","齹",5,"龁龂龍",11,"龜龝龞龡",4,"郎凉秊裏隣"],["fe40","兀嗀﨎﨏﨑﨓﨔礼﨟蘒﨡﨣﨤﨧﨨﨩"]]'
			);
		},
		function (e, t, n) {
			"use strict";
			var a = n(126),
				i = n(127),
				r = n(54);
			e.exports = { formats: r, parse: i, stringify: a };
		},
		function (e, t, n) {
			"use strict";
			var a = n(4);
			e.exports = (function getCurrentNodeMethods() {
				return (
					a.METHODS &&
					a.METHODS.map(function lowerCaseMethod(e) {
						return e.toLowerCase();
					})
				);
			})() || [
				"get",
				"post",
				"put",
				"head",
				"delete",
				"options",
				"trace",
				"copy",
				"lock",
				"mkcol",
				"move",
				"purge",
				"propfind",
				"proppatch",
				"unlock",
				"report",
				"mkactivity",
				"checkout",
				"merge",
				"m-search",
				"notify",
				"subscribe",
				"unsubscribe",
				"patch",
				"search",
				"connect",
			];
		},
		function (e, t, n) {
			var a = n(13),
				i = a.Buffer;
			function copyProps(e, t) {
				for (var n in e) t[n] = e[n];
			}
			function SafeBuffer(e, t, n) {
				return i(e, t, n);
			}
			i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow
				? (e.exports = a)
				: (copyProps(a, t), (t.Buffer = SafeBuffer)),
				copyProps(i, SafeBuffer),
				(SafeBuffer.from = function (e, t, n) {
					if ("number" == typeof e) throw new TypeError("Argument must not be a number");
					return i(e, t, n);
				}),
				(SafeBuffer.alloc = function (e, t, n) {
					if ("number" != typeof e) throw new TypeError("Argument must be a number");
					var a = i(e);
					return (
						void 0 !== t
							? "string" == typeof n
								? a.fill(t, n)
								: a.fill(t)
							: a.fill(0),
						a
					);
				}),
				(SafeBuffer.allocUnsafe = function (e) {
					if ("number" != typeof e) throw new TypeError("Argument must be a number");
					return i(e);
				}),
				(SafeBuffer.allocUnsafeSlow = function (e) {
					if ("number" != typeof e) throw new TypeError("Argument must be a number");
					return a.SlowBuffer(e);
				});
		},
		function (e, t, n) {
			"use strict";
			var a = n(17),
				i = n(142)("send"),
				r = n(6)("send"),
				o = n(146),
				s = n(29),
				c = n(30),
				p = n(63),
				l = n(64),
				u = n(2),
				d = n(147),
				m = n(149),
				f = n(28),
				h = n(65),
				v = n(1),
				g = n(24),
				b = n(0),
				x = n(10),
				y = v.extname,
				w = v.join,
				_ = v.normalize,
				k = v.resolve,
				E = v.sep,
				S = /^ *bytes=/,
				T = /(?:^|[\\/])\.\.(?:[\\/]|$)/;
			function SendStream(e, t, n) {
				b.call(this);
				var a = n || {};
				if (
					((this.options = a),
					(this.path = t),
					(this.req = e),
					(this._acceptRanges = void 0 === a.acceptRanges || Boolean(a.acceptRanges)),
					(this._cacheControl = void 0 === a.cacheControl || Boolean(a.cacheControl)),
					(this._etag = void 0 === a.etag || Boolean(a.etag)),
					(this._dotfiles = void 0 !== a.dotfiles ? a.dotfiles : "ignore"),
					"ignore" !== this._dotfiles &&
						"allow" !== this._dotfiles &&
						"deny" !== this._dotfiles)
				)
					throw new TypeError('dotfiles option must be "allow", "deny", or "ignore"');
				(this._hidden = Boolean(a.hidden)),
					void 0 !== a.hidden &&
						r(
							"hidden: use dotfiles: '" +
								(this._hidden ? "allow" : "ignore") +
								"' instead"
						),
					void 0 === a.dotfiles && (this._dotfiles = void 0),
					(this._extensions =
						void 0 !== a.extensions
							? normalizeList(a.extensions, "extensions option")
							: []),
					(this._immutable = void 0 !== a.immutable && Boolean(a.immutable)),
					(this._index =
						void 0 !== a.index
							? normalizeList(a.index, "index option")
							: ["index.html"]),
					(this._lastModified = void 0 === a.lastModified || Boolean(a.lastModified)),
					(this._maxage = a.maxAge || a.maxage),
					(this._maxage =
						"string" == typeof this._maxage ? m(this._maxage) : Number(this._maxage)),
					(this._maxage = isNaN(this._maxage)
						? 0
						: Math.min(Math.max(0, this._maxage), 31536e6)),
					(this._root = a.root ? k(a.root) : null),
					!this._root && a.from && this.from(a.from);
			}
			function contentRange(e, t, n) {
				return e + " " + (n ? n.start + "-" + n.end : "*") + "/" + t;
			}
			function createHtmlDocument(e, t) {
				return (
					'<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>' +
					e +
					"</title>\n</head>\n<body>\n<pre>" +
					t +
					"</pre>\n</body>\n</html>\n"
				);
			}
			function getHeaderNames(e) {
				return "function" != typeof e.getHeaderNames
					? Object.keys(e._headers || {})
					: e.getHeaderNames();
			}
			function hasListeners(e, t) {
				return (
					("function" != typeof e.listenerCount
						? e.listeners(t).length
						: e.listenerCount(t)) > 0
				);
			}
			function normalizeList(e, t) {
				for (var n = [].concat(e || []), a = 0; a < n.length; a++)
					if ("string" != typeof n[a])
						throw new TypeError(t + " must be array of strings or false");
				return n;
			}
			function parseHttpDate(e) {
				var t = e && Date.parse(e);
				return "number" == typeof t ? t : NaN;
			}
			(e.exports = function send(e, t, n) {
				return new SendStream(e, t, n);
			}),
				(e.exports.mime = d),
				x.inherits(SendStream, b),
				(SendStream.prototype.etag = r.function(function etag(e) {
					return (this._etag = Boolean(e)), i("etag %s", this._etag), this;
				}, "send.etag: pass etag as option")),
				(SendStream.prototype.hidden = r.function(function hidden(e) {
					return (
						(this._hidden = Boolean(e)),
						(this._dotfiles = void 0),
						i("hidden %s", this._hidden),
						this
					);
				}, "send.hidden: use dotfiles option")),
				(SendStream.prototype.index = r.function(function index(e) {
					var index = e ? normalizeList(e, "paths argument") : [];
					return i("index %o", e), (this._index = index), this;
				}, "send.index: pass index as option")),
				(SendStream.prototype.root = function root(e) {
					return (this._root = k(String(e))), i("root %s", this._root), this;
				}),
				(SendStream.prototype.from = r.function(
					SendStream.prototype.root,
					"send.from: pass root as option"
				)),
				(SendStream.prototype.root = r.function(
					SendStream.prototype.root,
					"send.root: pass root as option"
				)),
				(SendStream.prototype.maxage = r.function(function maxage(e) {
					return (
						(this._maxage = "string" == typeof e ? m(e) : Number(e)),
						(this._maxage = isNaN(this._maxage)
							? 0
							: Math.min(Math.max(0, this._maxage), 31536e6)),
						i("max-age %d", this._maxage),
						this
					);
				}, "send.maxage: pass maxAge as option")),
				(SendStream.prototype.error = function error(e, t) {
					if (hasListeners(this, "error"))
						return this.emit("error", a(e, t, { expose: !1 }));
					var n = this.res,
						i = g[e] || String(e),
						r = createHtmlDocument("Error", c(i));
					!(function clearHeaders(e) {
						for (var t = getHeaderNames(e), n = 0; n < t.length; n++)
							e.removeHeader(t[n]);
					})(n),
						t &&
							t.headers &&
							(function setHeaders(e, t) {
								for (var n = Object.keys(t), a = 0; a < n.length; a++) {
									var i = n[a];
									e.setHeader(i, t[i]);
								}
							})(n, t.headers),
						(n.statusCode = e),
						n.setHeader("Content-Type", "text/html; charset=UTF-8"),
						n.setHeader("Content-Length", Buffer.byteLength(r)),
						n.setHeader("Content-Security-Policy", "default-src 'none'"),
						n.setHeader("X-Content-Type-Options", "nosniff"),
						n.end(r);
				}),
				(SendStream.prototype.hasTrailingSlash = function hasTrailingSlash() {
					return "/" === this.path[this.path.length - 1];
				}),
				(SendStream.prototype.isConditionalGET = function isConditionalGET() {
					return (
						this.req.headers["if-match"] ||
						this.req.headers["if-unmodified-since"] ||
						this.req.headers["if-none-match"] ||
						this.req.headers["if-modified-since"]
					);
				}),
				(SendStream.prototype.isPreconditionFailure = function isPreconditionFailure() {
					var e = this.req,
						t = this.res,
						n = e.headers["if-match"];
					if (n) {
						var a = t.getHeader("ETag");
						return (
							!a ||
							("*" !== n &&
								(function parseTokenList(e) {
									for (var t = 0, n = [], a = 0, i = 0, r = e.length; i < r; i++)
										switch (e.charCodeAt(i)) {
											case 32:
												a === t && (a = t = i + 1);
												break;
											case 44:
												n.push(e.substring(a, t)), (a = t = i + 1);
												break;
											default:
												t = i + 1;
										}
									return n.push(e.substring(a, t)), n;
								})(n).every(function (e) {
									return e !== a && e !== "W/" + a && "W/" + e !== a;
								}))
						);
					}
					var i = parseHttpDate(e.headers["if-unmodified-since"]);
					if (!isNaN(i)) {
						var r = parseHttpDate(t.getHeader("Last-Modified"));
						return isNaN(r) || r > i;
					}
					return !1;
				}),
				(SendStream.prototype.removeContentHeaderFields = function removeContentHeaderFields() {
					for (var e = this.res, t = getHeaderNames(e), n = 0; n < t.length; n++) {
						var a = t[n];
						"content-" === a.substr(0, 8) &&
							"content-location" !== a &&
							e.removeHeader(a);
					}
				}),
				(SendStream.prototype.notModified = function notModified() {
					var e = this.res;
					i("not modified"),
						this.removeContentHeaderFields(),
						(e.statusCode = 304),
						e.end();
				}),
				(SendStream.prototype.headersAlreadySent = function headersAlreadySent() {
					var e = new Error("Can't set headers after they are sent.");
					i("headers already sent"), this.error(500, e);
				}),
				(SendStream.prototype.isCachable = function isCachable() {
					var e = this.res.statusCode;
					return (e >= 200 && e < 300) || 304 === e;
				}),
				(SendStream.prototype.onStatError = function onStatError(e) {
					switch (e.code) {
						case "ENAMETOOLONG":
						case "ENOENT":
						case "ENOTDIR":
							this.error(404, e);
							break;
						default:
							this.error(500, e);
					}
				}),
				(SendStream.prototype.isFresh = function isFresh() {
					return l(this.req.headers, {
						etag: this.res.getHeader("ETag"),
						"last-modified": this.res.getHeader("Last-Modified"),
					});
				}),
				(SendStream.prototype.isRangeFresh = function isRangeFresh() {
					var e = this.req.headers["if-range"];
					if (!e) return !0;
					if (-1 !== e.indexOf('"')) {
						var t = this.res.getHeader("ETag");
						return Boolean(t && -1 !== e.indexOf(t));
					}
					return parseHttpDate(this.res.getHeader("Last-Modified")) <= parseHttpDate(e);
				}),
				(SendStream.prototype.redirect = function redirect(e) {
					var t = this.res;
					if (hasListeners(this, "directory")) this.emit("directory", t, e);
					else if (this.hasTrailingSlash()) this.error(403);
					else {
						var n = s(
								(function collapseLeadingSlashes(e) {
									for (var t = 0; t < e.length && "/" === e[t]; t++);
									return t > 1 ? "/" + e.substr(t) : e;
								})(this.path + "/")
							),
							a = createHtmlDocument(
								"Redirecting",
								'Redirecting to <a href="' + c(n) + '">' + c(n) + "</a>"
							);
						(t.statusCode = 301),
							t.setHeader("Content-Type", "text/html; charset=UTF-8"),
							t.setHeader("Content-Length", Buffer.byteLength(a)),
							t.setHeader("Content-Security-Policy", "default-src 'none'"),
							t.setHeader("X-Content-Type-Options", "nosniff"),
							t.setHeader("Location", n),
							t.end(a);
					}
				}),
				(SendStream.prototype.pipe = function pipe(e) {
					var t = this._root;
					this.res = e;
					var n,
						a = (function decode(e) {
							try {
								return decodeURIComponent(e);
							} catch (e) {
								return -1;
							}
						})(this.path);
					if (-1 === a) return this.error(400), e;
					if (~a.indexOf("\0")) return this.error(400), e;
					if (null !== t) {
						if ((a && (a = _("." + E + a)), T.test(a)))
							return i('malicious path "%s"', a), this.error(403), e;
						(n = a.split(E)), (a = _(w(t, a)));
					} else {
						if (T.test(a)) return i('malicious path "%s"', a), this.error(403), e;
						(n = _(a).split(E)), (a = k(a));
					}
					if (
						(function containsDotFile(e) {
							for (var t = 0; t < e.length; t++) {
								var n = e[t];
								if (n.length > 1 && "." === n[0]) return !0;
							}
							return !1;
						})(n)
					) {
						var r = this._dotfiles;
						switch (
							(void 0 === r &&
								(r =
									"." === n[n.length - 1][0]
										? this._hidden
											? "allow"
											: "ignore"
										: "allow"),
							i('%s dotfile "%s"', r, a),
							r)
						) {
							case "allow":
								break;
							case "deny":
								return this.error(403), e;
							case "ignore":
							default:
								return this.error(404), e;
						}
					}
					return this._index.length && this.hasTrailingSlash()
						? (this.sendIndex(a), e)
						: (this.sendFile(a), e);
				}),
				(SendStream.prototype.send = function send(e, t) {
					var n = t.size,
						a = this.options,
						r = {},
						o = this.res,
						s = this.req,
						c = s.headers.range,
						p = a.start || 0;
					if (
						(function headersSent(e) {
							return "boolean" != typeof e.headersSent
								? Boolean(e._header)
								: e.headersSent;
						})(o)
					)
						this.headersAlreadySent();
					else {
						if (
							(i('pipe "%s"', e),
							this.setHeader(e, t),
							this.type(e),
							this.isConditionalGET())
						) {
							if (this.isPreconditionFailure()) return void this.error(412);
							if (this.isCachable() && this.isFresh()) return void this.notModified();
						}
						if (((n = Math.max(0, n - p)), void 0 !== a.end)) {
							var l = a.end - p + 1;
							n > l && (n = l);
						}
						if (this._acceptRanges && S.test(c)) {
							if (
								((c = h(n, c, { combine: !0 })),
								this.isRangeFresh() || (i("range stale"), (c = -2)),
								-1 === c)
							)
								return (
									i("range unsatisfiable"),
									o.setHeader("Content-Range", contentRange("bytes", n)),
									this.error(416, {
										headers: { "Content-Range": o.getHeader("Content-Range") },
									})
								);
							-2 !== c &&
								1 === c.length &&
								(i("range %j", c),
								(o.statusCode = 206),
								o.setHeader("Content-Range", contentRange("bytes", n, c[0])),
								(p += c[0].start),
								(n = c[0].end - c[0].start + 1));
						}
						for (var u in a) r[u] = a[u];
						(r.start = p),
							(r.end = Math.max(p, p + n - 1)),
							o.setHeader("Content-Length", n),
							"HEAD" !== s.method ? this.stream(e, r) : o.end();
					}
				}),
				(SendStream.prototype.sendFile = function sendFile(e) {
					var t = 0,
						n = this;
					i('stat "%s"', e),
						u.stat(e, function onstat(a, r) {
							return a && "ENOENT" === a.code && !y(e) && e[e.length - 1] !== E
								? (function next(a) {
										if (n._extensions.length <= t)
											return a ? n.onStatError(a) : n.error(404);
										var r = e + "." + n._extensions[t++];
										i('stat "%s"', r),
											u.stat(r, function (e, t) {
												return e
													? next(e)
													: t.isDirectory()
													? next()
													: (n.emit("file", r, t), void n.send(r, t));
											});
								  })(a)
								: a
								? n.onStatError(a)
								: r.isDirectory()
								? n.redirect(e)
								: (n.emit("file", e, r), void n.send(e, r));
						});
				}),
				(SendStream.prototype.sendIndex = function sendIndex(e) {
					var t = -1,
						n = this;
					!(function next(a) {
						if (++t >= n._index.length) return a ? n.onStatError(a) : n.error(404);
						var r = w(e, n._index[t]);
						i('stat "%s"', r),
							u.stat(r, function (e, t) {
								return e
									? next(e)
									: t.isDirectory()
									? next()
									: (n.emit("file", r, t), void n.send(r, t));
							});
					})();
				}),
				(SendStream.prototype.stream = function stream(e, t) {
					var n = !1,
						a = this,
						i = this.res,
						stream = u.createReadStream(e, t);
					this.emit("stream", stream),
						stream.pipe(i),
						f(i, function onfinished() {
							(n = !0), o(stream);
						}),
						stream.on("error", function onerror(e) {
							n || ((n = !0), o(stream), a.onStatError(e));
						}),
						stream.on("end", function onend() {
							a.emit("end");
						});
				}),
				(SendStream.prototype.type = function type(e) {
					var t = this.res;
					if (!t.getHeader("Content-Type")) {
						var type = d.lookup(e);
						if (type) {
							var n = d.charsets.lookup(type);
							i("content-type %s", type),
								t.setHeader("Content-Type", type + (n ? "; charset=" + n : ""));
						} else i("no content-type");
					}
				}),
				(SendStream.prototype.setHeader = function setHeader(e, t) {
					var n = this.res;
					if (
						(this.emit("headers", n, e, t),
						this._acceptRanges &&
							!n.getHeader("Accept-Ranges") &&
							(i("accept ranges"), n.setHeader("Accept-Ranges", "bytes")),
						this._cacheControl && !n.getHeader("Cache-Control"))
					) {
						var a = "public, max-age=" + Math.floor(this._maxage / 1e3);
						this._immutable && (a += ", immutable"),
							i("cache-control %s", a),
							n.setHeader("Cache-Control", a);
					}
					if (this._lastModified && !n.getHeader("Last-Modified")) {
						var r = t.mtime.toUTCString();
						i("modified %s", r), n.setHeader("Last-Modified", r);
					}
					if (this._etag && !n.getHeader("ETag")) {
						var o = p(t);
						i("etag %s", o), n.setHeader("ETag", o);
					}
				});
		},
		function (e, t, n) {
			"use strict";
			var a =
				(this && this.__importDefault) ||
				function (e) {
					return e && e.__esModule ? e : { default: e };
				};
			const i = n(0),
				r = n(3),
				o = a(n(8)),
				s = a(n(175)),
				c = a(n(176)),
				p = a(n(177)),
				l = n(77),
				u = { m3u8: s.default, "dash-mpd": c.default };
			let m3u8stream = (e, t = {}) => {
				const n = new i.PassThrough(),
					a = t.chunkReadahead || 3,
					s = t.liveBuffer || 2e4,
					c = t.requestOptions,
					d = u[t.parser || (/\.mpd$/.test(e) ? "dash-mpd" : "m3u8")];
				if (!d) throw TypeError(`parser '${t.parser}' not supported`);
				let m = 0;
				void 0 !== t.begin &&
					(m =
						"string" == typeof t.begin
							? l.humanStr(t.begin)
							: Math.max(t.begin - s, 0));
				const forwardEvents = (e) => {
					for (let t of [
						"abort",
						"request",
						"response",
						"redirect",
						"retry",
						"reconnect",
					])
						e.on(t, n.emit.bind(n, t));
				};
				let f;
				const h = new p.default(
					(e, t) => {
						f = e;
						let a = 0;
						e.on("data", (e) => (a += e.length)),
							e.pipe(n, { end: !1 }),
							e.on("end", () => t(void 0, a));
					},
					{ concurrency: 1 }
				);
				let v = 0,
					g = 0;
				const b = new p.default(
						(t, a) => {
							let i = Object.assign({}, c);
							t.range &&
								(i.headers = Object.assign({}, i.headers, {
									Range: `bytes=${t.range.start}-${t.range.end}`,
								}));
							let s = o.default(r.resolve(e, t.url), i);
							s.on("error", a),
								forwardEvents(s),
								h.push(s, (e, i) => {
									(g += +i),
										n.emit(
											"progress",
											{ num: ++v, size: i, duration: t.duration, url: t.url },
											b.total,
											g
										),
										a();
								});
						},
						{ concurrency: a }
					),
					onError = (e) => {
						E || (n.emit("error", e), n.end());
					};
				let x,
					y,
					w,
					_,
					k = !0,
					E = !1,
					S = !1;
				const onQueuedEnd = (e) => {
					if (((f = null), e)) onError(e);
					else if (!k && !E && !S && b.tasks.length + b.active <= x) {
						let e = Math.max(0, y - (Date.now() - _));
						(k = !0), (w = setTimeout(refreshPlaylist, e));
					} else (!E && !S) || b.tasks.length || b.active || n.end();
				};
				let T,
					C,
					O = 0;
				const refreshPlaylist = () => {
					(_ = Date.now()),
						(T = o.default(e, c)),
						T.on("error", onError),
						forwardEvents(T);
					const n = T.pipe(new d(t.id));
					n.on("starttime", (e) => {
						O || ((O = e), "string" == typeof t.begin && m >= 0 && (m += O));
					}),
						n.on("endlist", () => {
							S = !0;
						}),
						n.on("endearly", T.unpipe.bind(T, n));
					let a = [];
					const addItem = (e) => {
						if (!e.init) {
							if (e.seq <= C) return;
							C = e.seq;
						}
						(m = e.time), b.push(e, onQueuedEnd), a.push(e);
					};
					let i = [],
						r = 0;
					n.on("item", (e) => {
						let t = Object.assign({ time: O }, e);
						if (m <= t.time) addItem(t);
						else
							for (
								i.push(t), r += t.duration;
								i.length > 1 && r - i[0].duration > s;

							)
								r -= i.shift().duration;
						O += t.duration;
					}),
						n.on("end", () => {
							(T = null),
								!a.length &&
									i.length &&
									i.forEach((e) => {
										addItem(e);
									}),
								(x = Math.max(1, Math.ceil(0.01 * a.length))),
								(y = a.reduce((e, t) => t.duration + e, 0)),
								(k = !1),
								onQueuedEnd();
						});
				};
				return (
					refreshPlaylist(),
					(n.end = () => {
						(E = !0),
							h.die(),
							b.die(),
							clearTimeout(w),
							null == T || T.destroy(),
							null == f || f.destroy(),
							i.PassThrough.prototype.end.call(n, null);
					}),
					n
				);
			};
			(m3u8stream.parseTimestamp = l.humanStr), (e.exports = m3u8stream);
		},
		function (e, t, n) {
			"use strict";
			var a = n(6)("body-parser"),
				i = Object.create(null);
			function createParserGetter(e) {
				return function get() {
					return (function loadParser(e) {
						var t = i[e];
						if (void 0 !== t) return t;
						switch (e) {
							case "json":
								t = n(93);
								break;
							case "raw":
								t = n(123);
								break;
							case "text":
								t = n(124);
								break;
							case "urlencoded":
								t = n(125);
						}
						return (i[e] = t);
					})(e);
				};
			}
			(t = e.exports = a.function(function bodyParser(e) {
				var n = {};
				if (e) for (var a in e) "type" !== a && (n[a] = e[a]);
				var i = t.urlencoded(n),
					r = t.json(n);
				return function bodyParser(e, t, n) {
					r(e, t, function (a) {
						if (a) return n(a);
						i(e, t, n);
					});
				};
			}, "bodyParser: use individual json/urlencoded middlewares")),
				Object.defineProperty(t, "json", {
					configurable: !0,
					enumerable: !0,
					get: createParserGetter("json"),
				}),
				Object.defineProperty(t, "raw", {
					configurable: !0,
					enumerable: !0,
					get: createParserGetter("raw"),
				}),
				Object.defineProperty(t, "text", {
					configurable: !0,
					enumerable: !0,
					get: createParserGetter("text"),
				}),
				Object.defineProperty(t, "urlencoded", {
					configurable: !0,
					enumerable: !0,
					get: createParserGetter("urlencoded"),
				});
		},
		function (e, t, n) {
			"use strict";
			e.exports = n(90);
		},
		function (e, t, n) {
			"use strict";
			var a = n(21).EventEmitter;
			function lazyProperty(e, t, n) {
				Object.defineProperty(e, t, {
					configurable: !0,
					enumerable: !0,
					get: function get() {
						var a = n();
						return (
							Object.defineProperty(e, t, {
								configurable: !0,
								enumerable: !0,
								value: a,
							}),
							a
						);
					},
				});
			}
			function toString(e) {
				return e.toString();
			}
			lazyProperty(e.exports, "callSiteToString", function callSiteToString() {
				var e = Error.stackTraceLimit,
					t = {},
					a = Error.prepareStackTrace;
				(Error.prepareStackTrace = function prepareObjectStackTrace(e, t) {
					return t;
				}),
					(Error.stackTraceLimit = 2),
					Error.captureStackTrace(t);
				var i = t.stack.slice();
				return (
					(Error.prepareStackTrace = a),
					(Error.stackTraceLimit = e),
					i[0].toString ? toString : n(91)
				);
			}),
				lazyProperty(e.exports, "eventListenerCount", function eventListenerCount() {
					return a.listenerCount || n(92);
				});
		},
		function (e, t, n) {
			var a;
			function createDebug(e) {
				function debug() {
					if (debug.enabled) {
						var e = debug,
							n = +new Date(),
							i = n - (a || n);
						(e.diff = i), (e.prev = a), (e.curr = n), (a = n);
						for (var r = new Array(arguments.length), o = 0; o < r.length; o++)
							r[o] = arguments[o];
						(r[0] = t.coerce(r[0])), "string" != typeof r[0] && r.unshift("%O");
						var s = 0;
						(r[0] = r[0].replace(/%([a-zA-Z%])/g, function (n, a) {
							if ("%%" === n) return n;
							s++;
							var i = t.formatters[a];
							if ("function" == typeof i) {
								var o = r[s];
								(n = i.call(e, o)), r.splice(s, 1), s--;
							}
							return n;
						})),
							t.formatArgs.call(e, r);
						var c = debug.log || t.log || console.log.bind(console);
						c.apply(e, r);
					}
				}
				return (
					(debug.namespace = e),
					(debug.enabled = t.enabled(e)),
					(debug.useColors = t.useColors()),
					(debug.color = (function selectColor(e) {
						var n,
							a = 0;
						for (n in e) (a = (a << 5) - a + e.charCodeAt(n)), (a |= 0);
						return t.colors[Math.abs(a) % t.colors.length];
					})(e)),
					"function" == typeof t.init && t.init(debug),
					debug
				);
			}
			((t = e.exports = createDebug.debug = createDebug.default = createDebug).coerce = function coerce(
				e
			) {
				return e instanceof Error ? e.stack || e.message : e;
			}),
				(t.disable = function disable() {
					t.enable("");
				}),
				(t.enable = function enable(e) {
					t.save(e), (t.names = []), (t.skips = []);
					for (
						var n = ("string" == typeof e ? e : "").split(/[\s,]+/),
							a = n.length,
							i = 0;
						i < a;
						i++
					)
						n[i] &&
							("-" === (e = n[i].replace(/\*/g, ".*?"))[0]
								? t.skips.push(new RegExp("^" + e.substr(1) + "$"))
								: t.names.push(new RegExp("^" + e + "$")));
				}),
				(t.enabled = function enabled(e) {
					var n, a;
					for (n = 0, a = t.skips.length; n < a; n++) if (t.skips[n].test(e)) return !1;
					for (n = 0, a = t.names.length; n < a; n++) if (t.names[n].test(e)) return !0;
					return !1;
				}),
				(t.humanize = n(99)),
				(t.names = []),
				(t.skips = []),
				(t.formatters = {});
		},
		function (e, t, n) {
			"use strict";
			var a = n(12).Buffer,
				i = n(102),
				r = e.exports;
			(r.encodings = null),
				(r.defaultCharUnicode = "�"),
				(r.defaultCharSingleByte = "?"),
				(r.encode = function encode(e, t, n) {
					e = "" + (e || "");
					var i = r.getEncoder(t, n),
						o = i.write(e),
						s = i.end();
					return s && s.length > 0 ? a.concat([o, s]) : o;
				}),
				(r.decode = function decode(e, t, n) {
					"string" == typeof e &&
						(r.skipDecodeWarning ||
							(console.error(
								"Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding"
							),
							(r.skipDecodeWarning = !0)),
						(e = a.from("" + (e || ""), "binary")));
					var i = r.getDecoder(t, n),
						o = i.write(e),
						s = i.end();
					return s ? o + s : o;
				}),
				(r.encodingExists = function encodingExists(e) {
					try {
						return r.getCodec(e), !0;
					} catch (e) {
						return !1;
					}
				}),
				(r.toEncoding = r.encode),
				(r.fromEncoding = r.decode),
				(r._codecDataCache = {}),
				(r.getCodec = function getCodec(e) {
					r.encodings || (r.encodings = n(103));
					for (var t = r._canonicalizeEncoding(e), a = {}; ; ) {
						var i = r._codecDataCache[t];
						if (i) return i;
						var o = r.encodings[t];
						switch (typeof o) {
							case "string":
								t = o;
								break;
							case "object":
								for (var s in o) a[s] = o[s];
								a.encodingName || (a.encodingName = t), (t = o.type);
								break;
							case "function":
								return (
									a.encodingName || (a.encodingName = t),
									(i = new o(a, r)),
									(r._codecDataCache[a.encodingName] = i),
									i
								);
							default:
								throw new Error(
									"Encoding not recognized: '" +
										e +
										"' (searched as: '" +
										t +
										"')"
								);
						}
					}
				}),
				(r._canonicalizeEncoding = function (e) {
					return ("" + e).toLowerCase().replace(/:\d{4}$|[^0-9a-z]/g, "");
				}),
				(r.getEncoder = function getEncoder(e, t) {
					var n = r.getCodec(e),
						a = new n.encoder(t, n);
					return n.bomAware && t && t.addBOM && (a = new i.PrependBOM(a, t)), a;
				}),
				(r.getDecoder = function getDecoder(e, t) {
					var n = r.getCodec(e),
						a = new n.decoder(t, n);
					return !n.bomAware || (t && !1 === t.stripBOM) || (a = new i.StripBOM(a, t)), a;
				});
			var o = "undefined" != typeof process && process.versions && process.versions.node;
			if (o) {
				var s = o.split(".").map(Number);
				(s[0] > 0 || s[1] >= 10) && n(117)(r), n(118)(r);
			}
		},
		function (e, t) {
			e.exports = require("string_decoder");
		},
		function (e) {
			e.exports = JSON.parse(
				'[["a140","",62],["a180","",32],["a240","",62],["a280","",32],["a2ab","",5],["a2e3","€"],["a2ef",""],["a2fd",""],["a340","",62],["a380","",31,"　"],["a440","",62],["a480","",32],["a4f4","",10],["a540","",62],["a580","",32],["a5f7","",7],["a640","",62],["a680","",32],["a6b9","",7],["a6d9","",6],["a6ec",""],["a6f3",""],["a6f6","",8],["a740","",62],["a780","",32],["a7c2","",14],["a7f2","",12],["a896","",10],["a8bc",""],["a8bf","ǹ"],["a8c1",""],["a8ea","",20],["a958",""],["a95b",""],["a95d",""],["a989","〾⿰",11],["a997","",12],["a9f0","",14],["aaa1","",93],["aba1","",93],["aca1","",93],["ada1","",93],["aea1","",93],["afa1","",93],["d7fa","",4],["f8a1","",93],["f9a1","",93],["faa1","",93],["fba1","",93],["fca1","",93],["fda1","",93],["fe50","⺁⺄㑳㑇⺈⺋㖞㘚㘎⺌⺗㥮㤘㧏㧟㩳㧐㭎㱮㳠⺧⺪䁖䅟⺮䌷⺳⺶⺷䎱䎬⺻䏝䓖䙡䙌"],["fe80","䜣䜩䝼䞍⻊䥇䥺䥽䦂䦃䦅䦆䦟䦛䦷䦶䲣䲟䲠䲡䱷䲢䴓",6,"䶮",93]]'
			);
		},
		function (e) {
			e.exports = JSON.parse(
				'[["0","\\u0000",127],["a140","　，、。．‧；：？！︰…‥﹐﹑﹒·﹔﹕﹖﹗｜–︱—︳╴︴﹏（）︵︶｛｝︷︸〔〕︹︺【】︻︼《》︽︾〈〉︿﹀「」﹁﹂『』﹃﹄﹙﹚"],["a1a1","﹛﹜﹝﹞‘’“”〝〞‵′＃＆＊※§〃○●△▲◎☆★◇◆□■▽▼㊣℅¯￣＿ˍ﹉﹊﹍﹎﹋﹌﹟﹠﹡＋－×÷±√＜＞＝≦≧≠∞≒≡﹢",4,"～∩∪⊥∠∟⊿㏒㏑∫∮∵∴♀♂⊕⊙↑↓←→↖↗↙↘∥∣／"],["a240","＼∕﹨＄￥〒￠￡％＠℃℉﹩﹪﹫㏕㎜㎝㎞㏎㎡㎎㎏㏄°兙兛兞兝兡兣嗧瓩糎▁",7,"▏▎▍▌▋▊▉┼┴┬┤├▔─│▕┌┐└┘╭"],["a2a1","╮╰╯═╞╪╡◢◣◥◤╱╲╳０",9,"Ⅰ",9,"〡",8,"十卄卅Ａ",25,"ａ",21],["a340","ｗｘｙｚΑ",16,"Σ",6,"α",16,"σ",6,"ㄅ",10],["a3a1","ㄐ",25,"˙ˉˊˇˋ"],["a3e1","€"],["a440","一乙丁七乃九了二人儿入八几刀刁力匕十卜又三下丈上丫丸凡久么也乞于亡兀刃勺千叉口土士夕大女子孑孓寸小尢尸山川工己已巳巾干廾弋弓才"],["a4a1","丑丐不中丰丹之尹予云井互五亢仁什仃仆仇仍今介仄元允內六兮公冗凶分切刈勻勾勿化匹午升卅卞厄友及反壬天夫太夭孔少尤尺屯巴幻廿弔引心戈戶手扎支文斗斤方日曰月木欠止歹毋比毛氏水火爪父爻片牙牛犬王丙"],["a540","世丕且丘主乍乏乎以付仔仕他仗代令仙仞充兄冉冊冬凹出凸刊加功包匆北匝仟半卉卡占卯卮去可古右召叮叩叨叼司叵叫另只史叱台句叭叻四囚外"],["a5a1","央失奴奶孕它尼巨巧左市布平幼弁弘弗必戊打扔扒扑斥旦朮本未末札正母民氐永汁汀氾犯玄玉瓜瓦甘生用甩田由甲申疋白皮皿目矛矢石示禾穴立丞丟乒乓乩亙交亦亥仿伉伙伊伕伍伐休伏仲件任仰仳份企伋光兇兆先全"],["a640","共再冰列刑划刎刖劣匈匡匠印危吉吏同吊吐吁吋各向名合吃后吆吒因回囝圳地在圭圬圯圩夙多夷夸妄奸妃好她如妁字存宇守宅安寺尖屹州帆并年"],["a6a1","式弛忙忖戎戌戍成扣扛托收早旨旬旭曲曳有朽朴朱朵次此死氖汝汗汙江池汐汕污汛汍汎灰牟牝百竹米糸缶羊羽老考而耒耳聿肉肋肌臣自至臼舌舛舟艮色艾虫血行衣西阡串亨位住佇佗佞伴佛何估佐佑伽伺伸佃佔似但佣"],["a740","作你伯低伶余佝佈佚兌克免兵冶冷別判利刪刨劫助努劬匣即卵吝吭吞吾否呎吧呆呃吳呈呂君吩告吹吻吸吮吵吶吠吼呀吱含吟听囪困囤囫坊坑址坍"],["a7a1","均坎圾坐坏圻壯夾妝妒妨妞妣妙妖妍妤妓妊妥孝孜孚孛完宋宏尬局屁尿尾岐岑岔岌巫希序庇床廷弄弟彤形彷役忘忌志忍忱快忸忪戒我抄抗抖技扶抉扭把扼找批扳抒扯折扮投抓抑抆改攻攸旱更束李杏材村杜杖杞杉杆杠"],["a840","杓杗步每求汞沙沁沈沉沅沛汪決沐汰沌汨沖沒汽沃汲汾汴沆汶沍沔沘沂灶灼災灸牢牡牠狄狂玖甬甫男甸皂盯矣私秀禿究系罕肖肓肝肘肛肚育良芒"],["a8a1","芋芍見角言谷豆豕貝赤走足身車辛辰迂迆迅迄巡邑邢邪邦那酉釆里防阮阱阪阬並乖乳事些亞享京佯依侍佳使佬供例來侃佰併侈佩佻侖佾侏侑佺兔兒兕兩具其典冽函刻券刷刺到刮制剁劾劻卒協卓卑卦卷卸卹取叔受味呵"],["a940","咖呸咕咀呻呷咄咒咆呼咐呱呶和咚呢周咋命咎固垃坷坪坩坡坦坤坼夜奉奇奈奄奔妾妻委妹妮姑姆姐姍始姓姊妯妳姒姅孟孤季宗定官宜宙宛尚屈居"],["a9a1","屆岷岡岸岩岫岱岳帘帚帖帕帛帑幸庚店府底庖延弦弧弩往征彿彼忝忠忽念忿怏怔怯怵怖怪怕怡性怩怫怛或戕房戾所承拉拌拄抿拂抹拒招披拓拔拋拈抨抽押拐拙拇拍抵拚抱拘拖拗拆抬拎放斧於旺昔易昌昆昂明昀昏昕昊"],["aa40","昇服朋杭枋枕東果杳杷枇枝林杯杰板枉松析杵枚枓杼杪杲欣武歧歿氓氛泣注泳沱泌泥河沽沾沼波沫法泓沸泄油況沮泗泅泱沿治泡泛泊沬泯泜泖泠"],["aaa1","炕炎炒炊炙爬爭爸版牧物狀狎狙狗狐玩玨玟玫玥甽疝疙疚的盂盲直知矽社祀祁秉秈空穹竺糾罔羌羋者肺肥肢肱股肫肩肴肪肯臥臾舍芳芝芙芭芽芟芹花芬芥芯芸芣芰芾芷虎虱初表軋迎返近邵邸邱邶采金長門阜陀阿阻附"],["ab40","陂隹雨青非亟亭亮信侵侯便俠俑俏保促侶俘俟俊俗侮俐俄係俚俎俞侷兗冒冑冠剎剃削前剌剋則勇勉勃勁匍南卻厚叛咬哀咨哎哉咸咦咳哇哂咽咪品"],["aba1","哄哈咯咫咱咻咩咧咿囿垂型垠垣垢城垮垓奕契奏奎奐姜姘姿姣姨娃姥姪姚姦威姻孩宣宦室客宥封屎屏屍屋峙峒巷帝帥帟幽庠度建弈弭彥很待徊律徇後徉怒思怠急怎怨恍恰恨恢恆恃恬恫恪恤扁拜挖按拼拭持拮拽指拱拷"],["ac40","拯括拾拴挑挂政故斫施既春昭映昧是星昨昱昤曷柿染柱柔某柬架枯柵柩柯柄柑枴柚查枸柏柞柳枰柙柢柝柒歪殃殆段毒毗氟泉洋洲洪流津洌洱洞洗"],["aca1","活洽派洶洛泵洹洧洸洩洮洵洎洫炫為炳炬炯炭炸炮炤爰牲牯牴狩狠狡玷珊玻玲珍珀玳甚甭畏界畎畋疫疤疥疢疣癸皆皇皈盈盆盃盅省盹相眉看盾盼眇矜砂研砌砍祆祉祈祇禹禺科秒秋穿突竿竽籽紂紅紀紉紇約紆缸美羿耄"],["ad40","耐耍耑耶胖胥胚胃胄背胡胛胎胞胤胝致舢苧范茅苣苛苦茄若茂茉苒苗英茁苜苔苑苞苓苟苯茆虐虹虻虺衍衫要觔計訂訃貞負赴赳趴軍軌述迦迢迪迥"],["ada1","迭迫迤迨郊郎郁郃酋酊重閂限陋陌降面革韋韭音頁風飛食首香乘亳倌倍倣俯倦倥俸倩倖倆值借倚倒們俺倀倔倨俱倡個候倘俳修倭倪俾倫倉兼冤冥冢凍凌准凋剖剜剔剛剝匪卿原厝叟哨唐唁唷哼哥哲唆哺唔哩哭員唉哮哪"],["ae40","哦唧唇哽唏圃圄埂埔埋埃堉夏套奘奚娑娘娜娟娛娓姬娠娣娩娥娌娉孫屘宰害家宴宮宵容宸射屑展屐峭峽峻峪峨峰島崁峴差席師庫庭座弱徒徑徐恙"],["aea1","恣恥恐恕恭恩息悄悟悚悍悔悌悅悖扇拳挈拿捎挾振捕捂捆捏捉挺捐挽挪挫挨捍捌效敉料旁旅時晉晏晃晒晌晅晁書朔朕朗校核案框桓根桂桔栩梳栗桌桑栽柴桐桀格桃株桅栓栘桁殊殉殷氣氧氨氦氤泰浪涕消涇浦浸海浙涓"],["af40","浬涉浮浚浴浩涌涊浹涅浥涔烊烘烤烙烈烏爹特狼狹狽狸狷玆班琉珮珠珪珞畔畝畜畚留疾病症疲疳疽疼疹痂疸皋皰益盍盎眩真眠眨矩砰砧砸砝破砷"],["afa1","砥砭砠砟砲祕祐祠祟祖神祝祗祚秤秣秧租秦秩秘窄窈站笆笑粉紡紗紋紊素索純紐紕級紜納紙紛缺罟羔翅翁耆耘耕耙耗耽耿胱脂胰脅胭胴脆胸胳脈能脊胼胯臭臬舀舐航舫舨般芻茫荒荔荊茸荐草茵茴荏茲茹茶茗荀茱茨荃"],["b040","虔蚊蚪蚓蚤蚩蚌蚣蚜衰衷袁袂衽衹記訐討訌訕訊託訓訖訏訑豈豺豹財貢起躬軒軔軏辱送逆迷退迺迴逃追逅迸邕郡郝郢酒配酌釘針釗釜釙閃院陣陡"],["b0a1","陛陝除陘陞隻飢馬骨高鬥鬲鬼乾偺偽停假偃偌做偉健偶偎偕偵側偷偏倏偯偭兜冕凰剪副勒務勘動匐匏匙匿區匾參曼商啪啦啄啞啡啃啊唱啖問啕唯啤唸售啜唬啣唳啁啗圈國圉域堅堊堆埠埤基堂堵執培夠奢娶婁婉婦婪婀"],["b140","娼婢婚婆婊孰寇寅寄寂宿密尉專將屠屜屝崇崆崎崛崖崢崑崩崔崙崤崧崗巢常帶帳帷康庸庶庵庾張強彗彬彩彫得徙從徘御徠徜恿患悉悠您惋悴惦悽"],["b1a1","情悻悵惜悼惘惕惆惟悸惚惇戚戛扈掠控捲掖探接捷捧掘措捱掩掉掃掛捫推掄授掙採掬排掏掀捻捩捨捺敝敖救教敗啟敏敘敕敔斜斛斬族旋旌旎晝晚晤晨晦晞曹勗望梁梯梢梓梵桿桶梱梧梗械梃棄梭梆梅梔條梨梟梡梂欲殺"],["b240","毫毬氫涎涼淳淙液淡淌淤添淺清淇淋涯淑涮淞淹涸混淵淅淒渚涵淚淫淘淪深淮淨淆淄涪淬涿淦烹焉焊烽烯爽牽犁猜猛猖猓猙率琅琊球理現琍瓠瓶"],["b2a1","瓷甜產略畦畢異疏痔痕疵痊痍皎盔盒盛眷眾眼眶眸眺硫硃硎祥票祭移窒窕笠笨笛第符笙笞笮粒粗粕絆絃統紮紹紼絀細紳組累終紲紱缽羞羚翌翎習耜聊聆脯脖脣脫脩脰脤舂舵舷舶船莎莞莘荸莢莖莽莫莒莊莓莉莠荷荻荼"],["b340","莆莧處彪蛇蛀蚶蛄蚵蛆蛋蚱蚯蛉術袞袈被袒袖袍袋覓規訪訝訣訥許設訟訛訢豉豚販責貫貨貪貧赧赦趾趺軛軟這逍通逗連速逝逐逕逞造透逢逖逛途"],["b3a1","部郭都酗野釵釦釣釧釭釩閉陪陵陳陸陰陴陶陷陬雀雪雩章竟頂頃魚鳥鹵鹿麥麻傢傍傅備傑傀傖傘傚最凱割剴創剩勞勝勛博厥啻喀喧啼喊喝喘喂喜喪喔喇喋喃喳單喟唾喲喚喻喬喱啾喉喫喙圍堯堪場堤堰報堡堝堠壹壺奠"],["b440","婷媚婿媒媛媧孳孱寒富寓寐尊尋就嵌嵐崴嵇巽幅帽幀幃幾廊廁廂廄弼彭復循徨惑惡悲悶惠愜愣惺愕惰惻惴慨惱愎惶愉愀愒戟扉掣掌描揀揩揉揆揍"],["b4a1","插揣提握揖揭揮捶援揪換摒揚揹敞敦敢散斑斐斯普晰晴晶景暑智晾晷曾替期朝棺棕棠棘棗椅棟棵森棧棹棒棲棣棋棍植椒椎棉棚楮棻款欺欽殘殖殼毯氮氯氬港游湔渡渲湧湊渠渥渣減湛湘渤湖湮渭渦湯渴湍渺測湃渝渾滋"],["b540","溉渙湎湣湄湲湩湟焙焚焦焰無然煮焜牌犄犀猶猥猴猩琺琪琳琢琥琵琶琴琯琛琦琨甥甦畫番痢痛痣痙痘痞痠登發皖皓皴盜睏短硝硬硯稍稈程稅稀窘"],["b5a1","窗窖童竣等策筆筐筒答筍筋筏筑粟粥絞結絨絕紫絮絲絡給絢絰絳善翔翕耋聒肅腕腔腋腑腎脹腆脾腌腓腴舒舜菩萃菸萍菠菅萋菁華菱菴著萊菰萌菌菽菲菊萸萎萄菜萇菔菟虛蛟蛙蛭蛔蛛蛤蛐蛞街裁裂袱覃視註詠評詞証詁"],["b640","詔詛詐詆訴診訶詖象貂貯貼貳貽賁費賀貴買貶貿貸越超趁跎距跋跚跑跌跛跆軻軸軼辜逮逵週逸進逶鄂郵鄉郾酣酥量鈔鈕鈣鈉鈞鈍鈐鈇鈑閔閏開閑"],["b6a1","間閒閎隊階隋陽隅隆隍陲隄雁雅雄集雇雯雲韌項順須飧飪飯飩飲飭馮馭黃黍黑亂傭債傲傳僅傾催傷傻傯僇剿剷剽募勦勤勢勣匯嗟嗨嗓嗦嗎嗜嗇嗑嗣嗤嗯嗚嗡嗅嗆嗥嗉園圓塞塑塘塗塚塔填塌塭塊塢塒塋奧嫁嫉嫌媾媽媼"],["b740","媳嫂媲嵩嵯幌幹廉廈弒彙徬微愚意慈感想愛惹愁愈慎慌慄慍愾愴愧愍愆愷戡戢搓搾搞搪搭搽搬搏搜搔損搶搖搗搆敬斟新暗暉暇暈暖暄暘暍會榔業"],["b7a1","楚楷楠楔極椰概楊楨楫楞楓楹榆楝楣楛歇歲毀殿毓毽溢溯滓溶滂源溝滇滅溥溘溼溺溫滑準溜滄滔溪溧溴煎煙煩煤煉照煜煬煦煌煥煞煆煨煖爺牒猷獅猿猾瑯瑚瑕瑟瑞瑁琿瑙瑛瑜當畸瘀痰瘁痲痱痺痿痴痳盞盟睛睫睦睞督"],["b840","睹睪睬睜睥睨睢矮碎碰碗碘碌碉硼碑碓硿祺祿禁萬禽稜稚稠稔稟稞窟窠筷節筠筮筧粱粳粵經絹綑綁綏絛置罩罪署義羨群聖聘肆肄腱腰腸腥腮腳腫"],["b8a1","腹腺腦舅艇蒂葷落萱葵葦葫葉葬葛萼萵葡董葩葭葆虞虜號蛹蜓蜈蜇蜀蛾蛻蜂蜃蜆蜊衙裟裔裙補裘裝裡裊裕裒覜解詫該詳試詩詰誇詼詣誠話誅詭詢詮詬詹詻訾詨豢貊貉賊資賈賄貲賃賂賅跡跟跨路跳跺跪跤跦躲較載軾輊"],["b940","辟農運遊道遂達逼違遐遇遏過遍遑逾遁鄒鄗酬酪酩釉鈷鉗鈸鈽鉀鈾鉛鉋鉤鉑鈴鉉鉍鉅鈹鈿鉚閘隘隔隕雍雋雉雊雷電雹零靖靴靶預頑頓頊頒頌飼飴"],["b9a1","飽飾馳馱馴髡鳩麂鼎鼓鼠僧僮僥僖僭僚僕像僑僱僎僩兢凳劃劂匱厭嗾嘀嘛嘗嗽嘔嘆嘉嘍嘎嗷嘖嘟嘈嘐嗶團圖塵塾境墓墊塹墅塽壽夥夢夤奪奩嫡嫦嫩嫗嫖嫘嫣孵寞寧寡寥實寨寢寤察對屢嶄嶇幛幣幕幗幔廓廖弊彆彰徹慇"],["ba40","愿態慷慢慣慟慚慘慵截撇摘摔撤摸摟摺摑摧搴摭摻敲斡旗旖暢暨暝榜榨榕槁榮槓構榛榷榻榫榴槐槍榭槌榦槃榣歉歌氳漳演滾漓滴漩漾漠漬漏漂漢"],["baa1","滿滯漆漱漸漲漣漕漫漯澈漪滬漁滲滌滷熔熙煽熊熄熒爾犒犖獄獐瑤瑣瑪瑰瑭甄疑瘧瘍瘋瘉瘓盡監瞄睽睿睡磁碟碧碳碩碣禎福禍種稱窪窩竭端管箕箋筵算箝箔箏箸箇箄粹粽精綻綰綜綽綾綠緊綴網綱綺綢綿綵綸維緒緇綬"],["bb40","罰翠翡翟聞聚肇腐膀膏膈膊腿膂臧臺與舔舞艋蓉蒿蓆蓄蒙蒞蒲蒜蓋蒸蓀蓓蒐蒼蓑蓊蜿蜜蜻蜢蜥蜴蜘蝕蜷蜩裳褂裴裹裸製裨褚裯誦誌語誣認誡誓誤"],["bba1","說誥誨誘誑誚誧豪貍貌賓賑賒赫趙趕跼輔輒輕輓辣遠遘遜遣遙遞遢遝遛鄙鄘鄞酵酸酷酴鉸銀銅銘銖鉻銓銜銨鉼銑閡閨閩閣閥閤隙障際雌雒需靼鞅韶頗領颯颱餃餅餌餉駁骯骰髦魁魂鳴鳶鳳麼鼻齊億儀僻僵價儂儈儉儅凜"],["bc40","劇劈劉劍劊勰厲嘮嘻嘹嘲嘿嘴嘩噓噎噗噴嘶嘯嘰墀墟增墳墜墮墩墦奭嬉嫻嬋嫵嬌嬈寮寬審寫層履嶝嶔幢幟幡廢廚廟廝廣廠彈影德徵慶慧慮慝慕憂"],["bca1","慼慰慫慾憧憐憫憎憬憚憤憔憮戮摩摯摹撞撲撈撐撰撥撓撕撩撒撮播撫撚撬撙撢撳敵敷數暮暫暴暱樣樟槨樁樞標槽模樓樊槳樂樅槭樑歐歎殤毅毆漿潼澄潑潦潔澆潭潛潸潮澎潺潰潤澗潘滕潯潠潟熟熬熱熨牖犛獎獗瑩璋璃"],["bd40","瑾璀畿瘠瘩瘟瘤瘦瘡瘢皚皺盤瞎瞇瞌瞑瞋磋磅確磊碾磕碼磐稿稼穀稽稷稻窯窮箭箱範箴篆篇篁箠篌糊締練緯緻緘緬緝編緣線緞緩綞緙緲緹罵罷羯"],["bda1","翩耦膛膜膝膠膚膘蔗蔽蔚蓮蔬蔭蔓蔑蔣蔡蔔蓬蔥蓿蔆螂蝴蝶蝠蝦蝸蝨蝙蝗蝌蝓衛衝褐複褒褓褕褊誼諒談諄誕請諸課諉諂調誰論諍誶誹諛豌豎豬賠賞賦賤賬賭賢賣賜質賡赭趟趣踫踐踝踢踏踩踟踡踞躺輝輛輟輩輦輪輜輞"],["be40","輥適遮遨遭遷鄰鄭鄧鄱醇醉醋醃鋅銻銷鋪銬鋤鋁銳銼鋒鋇鋰銲閭閱霄霆震霉靠鞍鞋鞏頡頫頜颳養餓餒餘駝駐駟駛駑駕駒駙骷髮髯鬧魅魄魷魯鴆鴉"],["bea1","鴃麩麾黎墨齒儒儘儔儐儕冀冪凝劑劓勳噙噫噹噩噤噸噪器噥噱噯噬噢噶壁墾壇壅奮嬝嬴學寰導彊憲憑憩憊懍憶憾懊懈戰擅擁擋撻撼據擄擇擂操撿擒擔撾整曆曉暹曄曇暸樽樸樺橙橫橘樹橄橢橡橋橇樵機橈歙歷氅濂澱澡"],["bf40","濃澤濁澧澳激澹澶澦澠澴熾燉燐燒燈燕熹燎燙燜燃燄獨璜璣璘璟璞瓢甌甍瘴瘸瘺盧盥瞠瞞瞟瞥磨磚磬磧禦積穎穆穌穋窺篙簑築篤篛篡篩篦糕糖縊"],["bfa1","縑縈縛縣縞縝縉縐罹羲翰翱翮耨膳膩膨臻興艘艙蕊蕙蕈蕨蕩蕃蕉蕭蕪蕞螃螟螞螢融衡褪褲褥褫褡親覦諦諺諫諱謀諜諧諮諾謁謂諷諭諳諶諼豫豭貓賴蹄踱踴蹂踹踵輻輯輸輳辨辦遵遴選遲遼遺鄴醒錠錶鋸錳錯錢鋼錫錄錚"],["c040","錐錦錡錕錮錙閻隧隨險雕霎霑霖霍霓霏靛靜靦鞘頰頸頻頷頭頹頤餐館餞餛餡餚駭駢駱骸骼髻髭鬨鮑鴕鴣鴦鴨鴒鴛默黔龍龜優償儡儲勵嚎嚀嚐嚅嚇"],["c0a1","嚏壕壓壑壎嬰嬪嬤孺尷屨嶼嶺嶽嶸幫彌徽應懂懇懦懋戲戴擎擊擘擠擰擦擬擱擢擭斂斃曙曖檀檔檄檢檜櫛檣橾檗檐檠歜殮毚氈濘濱濟濠濛濤濫濯澀濬濡濩濕濮濰燧營燮燦燥燭燬燴燠爵牆獰獲璩環璦璨癆療癌盪瞳瞪瞰瞬"],["c140","瞧瞭矯磷磺磴磯礁禧禪穗窿簇簍篾篷簌篠糠糜糞糢糟糙糝縮績繆縷縲繃縫總縱繅繁縴縹繈縵縿縯罄翳翼聱聲聰聯聳臆臃膺臂臀膿膽臉膾臨舉艱薪"],["c1a1","薄蕾薜薑薔薯薛薇薨薊虧蟀蟑螳蟒蟆螫螻螺蟈蟋褻褶襄褸褽覬謎謗謙講謊謠謝謄謐豁谿豳賺賽購賸賻趨蹉蹋蹈蹊轄輾轂轅輿避遽還邁邂邀鄹醣醞醜鍍鎂錨鍵鍊鍥鍋錘鍾鍬鍛鍰鍚鍔闊闋闌闈闆隱隸雖霜霞鞠韓顆颶餵騁"],["c240","駿鮮鮫鮪鮭鴻鴿麋黏點黜黝黛鼾齋叢嚕嚮壙壘嬸彝懣戳擴擲擾攆擺擻擷斷曜朦檳檬櫃檻檸櫂檮檯歟歸殯瀉瀋濾瀆濺瀑瀏燻燼燾燸獷獵璧璿甕癖癘"],["c2a1","癒瞽瞿瞻瞼礎禮穡穢穠竄竅簫簧簪簞簣簡糧織繕繞繚繡繒繙罈翹翻職聶臍臏舊藏薩藍藐藉薰薺薹薦蟯蟬蟲蟠覆覲觴謨謹謬謫豐贅蹙蹣蹦蹤蹟蹕軀轉轍邇邃邈醫醬釐鎔鎊鎖鎢鎳鎮鎬鎰鎘鎚鎗闔闖闐闕離雜雙雛雞霤鞣鞦"],["c340","鞭韹額顏題顎顓颺餾餿餽餮馥騎髁鬃鬆魏魎魍鯊鯉鯽鯈鯀鵑鵝鵠黠鼕鼬儳嚥壞壟壢寵龐廬懲懷懶懵攀攏曠曝櫥櫝櫚櫓瀛瀟瀨瀚瀝瀕瀘爆爍牘犢獸"],["c3a1","獺璽瓊瓣疇疆癟癡矇礙禱穫穩簾簿簸簽簷籀繫繭繹繩繪羅繳羶羹羸臘藩藝藪藕藤藥藷蟻蠅蠍蟹蟾襠襟襖襞譁譜識證譚譎譏譆譙贈贊蹼蹲躇蹶蹬蹺蹴轔轎辭邊邋醱醮鏡鏑鏟鏃鏈鏜鏝鏖鏢鏍鏘鏤鏗鏨關隴難霪霧靡韜韻類"],["c440","願顛颼饅饉騖騙鬍鯨鯧鯖鯛鶉鵡鵲鵪鵬麒麗麓麴勸嚨嚷嚶嚴嚼壤孀孃孽寶巉懸懺攘攔攙曦朧櫬瀾瀰瀲爐獻瓏癢癥礦礪礬礫竇競籌籃籍糯糰辮繽繼"],["c4a1","纂罌耀臚艦藻藹蘑藺蘆蘋蘇蘊蠔蠕襤覺觸議譬警譯譟譫贏贍躉躁躅躂醴釋鐘鐃鏽闡霰飄饒饑馨騫騰騷騵鰓鰍鹹麵黨鼯齟齣齡儷儸囁囀囂夔屬巍懼懾攝攜斕曩櫻欄櫺殲灌爛犧瓖瓔癩矓籐纏續羼蘗蘭蘚蠣蠢蠡蠟襪襬覽譴"],["c540","護譽贓躊躍躋轟辯醺鐮鐳鐵鐺鐸鐲鐫闢霸霹露響顧顥饗驅驃驀騾髏魔魑鰭鰥鶯鶴鷂鶸麝黯鼙齜齦齧儼儻囈囊囉孿巔巒彎懿攤權歡灑灘玀瓤疊癮癬"],["c5a1","禳籠籟聾聽臟襲襯觼讀贖贗躑躓轡酈鑄鑑鑒霽霾韃韁顫饕驕驍髒鬚鱉鰱鰾鰻鷓鷗鼴齬齪龔囌巖戀攣攫攪曬欐瓚竊籤籣籥纓纖纔臢蘸蘿蠱變邐邏鑣鑠鑤靨顯饜驚驛驗髓體髑鱔鱗鱖鷥麟黴囑壩攬灞癱癲矗罐羈蠶蠹衢讓讒"],["c640","讖艷贛釀鑪靂靈靄韆顰驟鬢魘鱟鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻觀躡釁鑲鑰顱饞髖鬣黌灤矚讚鑷韉驢驥纜讜躪釅鑽鑾鑼鱷鱸黷豔鑿鸚爨驪鬱鸛鸞籲"],["c940","乂乜凵匚厂万丌乇亍囗兀屮彳丏冇与丮亓仂仉仈冘勼卬厹圠夃夬尐巿旡殳毌气爿丱丼仨仜仩仡仝仚刌匜卌圢圣夗夯宁宄尒尻屴屳帄庀庂忉戉扐氕"],["c9a1","氶汃氿氻犮犰玊禸肊阞伎优伬仵伔仱伀价伈伝伂伅伢伓伄仴伒冱刓刉刐劦匢匟卍厊吇囡囟圮圪圴夼妀奼妅奻奾奷奿孖尕尥屼屺屻屾巟幵庄异弚彴忕忔忏扜扞扤扡扦扢扙扠扚扥旯旮朾朹朸朻机朿朼朳氘汆汒汜汏汊汔汋"],["ca40","汌灱牞犴犵玎甪癿穵网艸艼芀艽艿虍襾邙邗邘邛邔阢阤阠阣佖伻佢佉体佤伾佧佒佟佁佘伭伳伿佡冏冹刜刞刡劭劮匉卣卲厎厏吰吷吪呔呅吙吜吥吘"],["caa1","吽呏呁吨吤呇囮囧囥坁坅坌坉坋坒夆奀妦妘妠妗妎妢妐妏妧妡宎宒尨尪岍岏岈岋岉岒岊岆岓岕巠帊帎庋庉庌庈庍弅弝彸彶忒忑忐忭忨忮忳忡忤忣忺忯忷忻怀忴戺抃抌抎抏抔抇扱扻扺扰抁抈扷扽扲扴攷旰旴旳旲旵杅杇"],["cb40","杙杕杌杈杝杍杚杋毐氙氚汸汧汫沄沋沏汱汯汩沚汭沇沕沜汦汳汥汻沎灴灺牣犿犽狃狆狁犺狅玕玗玓玔玒町甹疔疕皁礽耴肕肙肐肒肜芐芏芅芎芑芓"],["cba1","芊芃芄豸迉辿邟邡邥邞邧邠阰阨阯阭丳侘佼侅佽侀侇佶佴侉侄佷佌侗佪侚佹侁佸侐侜侔侞侒侂侕佫佮冞冼冾刵刲刳剆刱劼匊匋匼厒厔咇呿咁咑咂咈呫呺呾呥呬呴呦咍呯呡呠咘呣呧呤囷囹坯坲坭坫坱坰坶垀坵坻坳坴坢"],["cc40","坨坽夌奅妵妺姏姎妲姌姁妶妼姃姖妱妽姀姈妴姇孢孥宓宕屄屇岮岤岠岵岯岨岬岟岣岭岢岪岧岝岥岶岰岦帗帔帙弨弢弣弤彔徂彾彽忞忥怭怦怙怲怋"],["cca1","怴怊怗怳怚怞怬怢怍怐怮怓怑怌怉怜戔戽抭抴拑抾抪抶拊抮抳抯抻抩抰抸攽斨斻昉旼昄昒昈旻昃昋昍昅旽昑昐曶朊枅杬枎枒杶杻枘枆构杴枍枌杺枟枑枙枃杽极杸杹枔欥殀歾毞氝沓泬泫泮泙沶泔沭泧沷泐泂沺泃泆泭泲"],["cd40","泒泝沴沊沝沀泞泀洰泍泇沰泹泏泩泑炔炘炅炓炆炄炑炖炂炚炃牪狖狋狘狉狜狒狔狚狌狑玤玡玭玦玢玠玬玝瓝瓨甿畀甾疌疘皯盳盱盰盵矸矼矹矻矺"],["cda1","矷祂礿秅穸穻竻籵糽耵肏肮肣肸肵肭舠芠苀芫芚芘芛芵芧芮芼芞芺芴芨芡芩苂芤苃芶芢虰虯虭虮豖迒迋迓迍迖迕迗邲邴邯邳邰阹阽阼阺陃俍俅俓侲俉俋俁俔俜俙侻侳俛俇俖侺俀侹俬剄剉勀勂匽卼厗厖厙厘咺咡咭咥哏"],["ce40","哃茍咷咮哖咶哅哆咠呰咼咢咾呲哞咰垵垞垟垤垌垗垝垛垔垘垏垙垥垚垕壴复奓姡姞姮娀姱姝姺姽姼姶姤姲姷姛姩姳姵姠姾姴姭宨屌峐峘峌峗峋峛"],["cea1","峞峚峉峇峊峖峓峔峏峈峆峎峟峸巹帡帢帣帠帤庰庤庢庛庣庥弇弮彖徆怷怹恔恲恞恅恓恇恉恛恌恀恂恟怤恄恘恦恮扂扃拏挍挋拵挎挃拫拹挏挌拸拶挀挓挔拺挕拻拰敁敃斪斿昶昡昲昵昜昦昢昳昫昺昝昴昹昮朏朐柁柲柈枺"],["cf40","柜枻柸柘柀枷柅柫柤柟枵柍枳柷柶柮柣柂枹柎柧柰枲柼柆柭柌枮柦柛柺柉柊柃柪柋欨殂殄殶毖毘毠氠氡洨洴洭洟洼洿洒洊泚洳洄洙洺洚洑洀洝浂"],["cfa1","洁洘洷洃洏浀洇洠洬洈洢洉洐炷炟炾炱炰炡炴炵炩牁牉牊牬牰牳牮狊狤狨狫狟狪狦狣玅珌珂珈珅玹玶玵玴珫玿珇玾珃珆玸珋瓬瓮甮畇畈疧疪癹盄眈眃眄眅眊盷盻盺矧矨砆砑砒砅砐砏砎砉砃砓祊祌祋祅祄秕种秏秖秎窀"],["d040","穾竑笀笁籺籸籹籿粀粁紃紈紁罘羑羍羾耇耎耏耔耷胘胇胠胑胈胂胐胅胣胙胜胊胕胉胏胗胦胍臿舡芔苙苾苹茇苨茀苕茺苫苖苴苬苡苲苵茌苻苶苰苪"],["d0a1","苤苠苺苳苭虷虴虼虳衁衎衧衪衩觓訄訇赲迣迡迮迠郱邽邿郕郅邾郇郋郈釔釓陔陏陑陓陊陎倞倅倇倓倢倰倛俵俴倳倷倬俶俷倗倜倠倧倵倯倱倎党冔冓凊凄凅凈凎剡剚剒剞剟剕剢勍匎厞唦哢唗唒哧哳哤唚哿唄唈哫唑唅哱"],["d140","唊哻哷哸哠唎唃唋圁圂埌堲埕埒垺埆垽垼垸垶垿埇埐垹埁夎奊娙娖娭娮娕娏娗娊娞娳孬宧宭宬尃屖屔峬峿峮峱峷崀峹帩帨庨庮庪庬弳弰彧恝恚恧"],["d1a1","恁悢悈悀悒悁悝悃悕悛悗悇悜悎戙扆拲挐捖挬捄捅挶捃揤挹捋捊挼挩捁挴捘捔捙挭捇挳捚捑挸捗捀捈敊敆旆旃旄旂晊晟晇晑朒朓栟栚桉栲栳栻桋桏栖栱栜栵栫栭栯桎桄栴栝栒栔栦栨栮桍栺栥栠欬欯欭欱欴歭肂殈毦毤"],["d240","毨毣毢毧氥浺浣浤浶洍浡涒浘浢浭浯涑涍淯浿涆浞浧浠涗浰浼浟涂涘洯浨涋浾涀涄洖涃浻浽浵涐烜烓烑烝烋缹烢烗烒烞烠烔烍烅烆烇烚烎烡牂牸"],["d2a1","牷牶猀狺狴狾狶狳狻猁珓珙珥珖玼珧珣珩珜珒珛珔珝珚珗珘珨瓞瓟瓴瓵甡畛畟疰痁疻痄痀疿疶疺皊盉眝眛眐眓眒眣眑眕眙眚眢眧砣砬砢砵砯砨砮砫砡砩砳砪砱祔祛祏祜祓祒祑秫秬秠秮秭秪秜秞秝窆窉窅窋窌窊窇竘笐"],["d340","笄笓笅笏笈笊笎笉笒粄粑粊粌粈粍粅紞紝紑紎紘紖紓紟紒紏紌罜罡罞罠罝罛羖羒翃翂翀耖耾耹胺胲胹胵脁胻脀舁舯舥茳茭荄茙荑茥荖茿荁茦茜茢"],["d3a1","荂荎茛茪茈茼荍茖茤茠茷茯茩荇荅荌荓茞茬荋茧荈虓虒蚢蚨蚖蚍蚑蚞蚇蚗蚆蚋蚚蚅蚥蚙蚡蚧蚕蚘蚎蚝蚐蚔衃衄衭衵衶衲袀衱衿衯袃衾衴衼訒豇豗豻貤貣赶赸趵趷趶軑軓迾迵适迿迻逄迼迶郖郠郙郚郣郟郥郘郛郗郜郤酐"],["d440","酎酏釕釢釚陜陟隼飣髟鬯乿偰偪偡偞偠偓偋偝偲偈偍偁偛偊偢倕偅偟偩偫偣偤偆偀偮偳偗偑凐剫剭剬剮勖勓匭厜啵啶唼啍啐唴唪啑啢唶唵唰啒啅"],["d4a1","唌唲啥啎唹啈唭唻啀啋圊圇埻堔埢埶埜埴堀埭埽堈埸堋埳埏堇埮埣埲埥埬埡堎埼堐埧堁堌埱埩埰堍堄奜婠婘婕婧婞娸娵婭婐婟婥婬婓婤婗婃婝婒婄婛婈媎娾婍娹婌婰婩婇婑婖婂婜孲孮寁寀屙崞崋崝崚崠崌崨崍崦崥崏"],["d540","崰崒崣崟崮帾帴庱庴庹庲庳弶弸徛徖徟悊悐悆悾悰悺惓惔惏惤惙惝惈悱惛悷惊悿惃惍惀挲捥掊掂捽掽掞掭掝掗掫掎捯掇掐据掯捵掜捭掮捼掤挻掟"],["d5a1","捸掅掁掑掍捰敓旍晥晡晛晙晜晢朘桹梇梐梜桭桮梮梫楖桯梣梬梩桵桴梲梏桷梒桼桫桲梪梀桱桾梛梖梋梠梉梤桸桻梑梌梊桽欶欳欷欸殑殏殍殎殌氪淀涫涴涳湴涬淩淢涷淶淔渀淈淠淟淖涾淥淜淝淛淴淊涽淭淰涺淕淂淏淉"],["d640","淐淲淓淽淗淍淣涻烺焍烷焗烴焌烰焄烳焐烼烿焆焓焀烸烶焋焂焎牾牻牼牿猝猗猇猑猘猊猈狿猏猞玈珶珸珵琄琁珽琇琀珺珼珿琌琋珴琈畤畣痎痒痏"],["d6a1","痋痌痑痐皏皉盓眹眯眭眱眲眴眳眽眥眻眵硈硒硉硍硊硌砦硅硐祤祧祩祪祣祫祡离秺秸秶秷窏窔窐笵筇笴笥笰笢笤笳笘笪笝笱笫笭笯笲笸笚笣粔粘粖粣紵紽紸紶紺絅紬紩絁絇紾紿絊紻紨罣羕羜羝羛翊翋翍翐翑翇翏翉耟"],["d740","耞耛聇聃聈脘脥脙脛脭脟脬脞脡脕脧脝脢舑舸舳舺舴舲艴莐莣莨莍荺荳莤荴莏莁莕莙荵莔莩荽莃莌莝莛莪莋荾莥莯莈莗莰荿莦莇莮荶莚虙虖蚿蚷"],["d7a1","蛂蛁蛅蚺蚰蛈蚹蚳蚸蛌蚴蚻蚼蛃蚽蚾衒袉袕袨袢袪袚袑袡袟袘袧袙袛袗袤袬袌袓袎覂觖觙觕訰訧訬訞谹谻豜豝豽貥赽赻赹趼跂趹趿跁軘軞軝軜軗軠軡逤逋逑逜逌逡郯郪郰郴郲郳郔郫郬郩酖酘酚酓酕釬釴釱釳釸釤釹釪"],["d840","釫釷釨釮镺閆閈陼陭陫陱陯隿靪頄飥馗傛傕傔傞傋傣傃傌傎傝偨傜傒傂傇兟凔匒匑厤厧喑喨喥喭啷噅喢喓喈喏喵喁喣喒喤啽喌喦啿喕喡喎圌堩堷"],["d8a1","堙堞堧堣堨埵塈堥堜堛堳堿堶堮堹堸堭堬堻奡媯媔媟婺媢媞婸媦婼媥媬媕媮娷媄媊媗媃媋媩婻婽媌媜媏媓媝寪寍寋寔寑寊寎尌尰崷嵃嵫嵁嵋崿崵嵑嵎嵕崳崺嵒崽崱嵙嵂崹嵉崸崼崲崶嵀嵅幄幁彘徦徥徫惉悹惌惢惎惄愔"],["d940","惲愊愖愅惵愓惸惼惾惁愃愘愝愐惿愄愋扊掔掱掰揎揥揨揯揃撝揳揊揠揶揕揲揵摡揟掾揝揜揄揘揓揂揇揌揋揈揰揗揙攲敧敪敤敜敨敥斌斝斞斮旐旒"],["d9a1","晼晬晻暀晱晹晪晲朁椌棓椄棜椪棬棪棱椏棖棷棫棤棶椓椐棳棡椇棌椈楰梴椑棯棆椔棸棐棽棼棨椋椊椗棎棈棝棞棦棴棑椆棔棩椕椥棇欹欻欿欼殔殗殙殕殽毰毲毳氰淼湆湇渟湉溈渼渽湅湢渫渿湁湝湳渜渳湋湀湑渻渃渮湞"],["da40","湨湜湡渱渨湠湱湫渹渢渰湓湥渧湸湤湷湕湹湒湦渵渶湚焠焞焯烻焮焱焣焥焢焲焟焨焺焛牋牚犈犉犆犅犋猒猋猰猢猱猳猧猲猭猦猣猵猌琮琬琰琫琖"],["daa1","琚琡琭琱琤琣琝琩琠琲瓻甯畯畬痧痚痡痦痝痟痤痗皕皒盚睆睇睄睍睅睊睎睋睌矞矬硠硤硥硜硭硱硪确硰硩硨硞硢祴祳祲祰稂稊稃稌稄窙竦竤筊笻筄筈筌筎筀筘筅粢粞粨粡絘絯絣絓絖絧絪絏絭絜絫絒絔絩絑絟絎缾缿罥"],["db40","罦羢羠羡翗聑聏聐胾胔腃腊腒腏腇脽腍脺臦臮臷臸臹舄舼舽舿艵茻菏菹萣菀菨萒菧菤菼菶萐菆菈菫菣莿萁菝菥菘菿菡菋菎菖菵菉萉萏菞萑萆菂菳"],["dba1","菕菺菇菑菪萓菃菬菮菄菻菗菢萛菛菾蛘蛢蛦蛓蛣蛚蛪蛝蛫蛜蛬蛩蛗蛨蛑衈衖衕袺裗袹袸裀袾袶袼袷袽袲褁裉覕覘覗觝觚觛詎詍訹詙詀詗詘詄詅詒詈詑詊詌詏豟貁貀貺貾貰貹貵趄趀趉跘跓跍跇跖跜跏跕跙跈跗跅軯軷軺"],["dc40","軹軦軮軥軵軧軨軶軫軱軬軴軩逭逴逯鄆鄬鄄郿郼鄈郹郻鄁鄀鄇鄅鄃酡酤酟酢酠鈁鈊鈥鈃鈚鈦鈏鈌鈀鈒釿釽鈆鈄鈧鈂鈜鈤鈙鈗鈅鈖镻閍閌閐隇陾隈"],["dca1","隉隃隀雂雈雃雱雰靬靰靮頇颩飫鳦黹亃亄亶傽傿僆傮僄僊傴僈僂傰僁傺傱僋僉傶傸凗剺剸剻剼嗃嗛嗌嗐嗋嗊嗝嗀嗔嗄嗩喿嗒喍嗏嗕嗢嗖嗈嗲嗍嗙嗂圔塓塨塤塏塍塉塯塕塎塝塙塥塛堽塣塱壼嫇嫄嫋媺媸媱媵媰媿嫈媻嫆"],["dd40","媷嫀嫊媴媶嫍媹媐寖寘寙尟尳嵱嵣嵊嵥嵲嵬嵞嵨嵧嵢巰幏幎幊幍幋廅廌廆廋廇彀徯徭惷慉慊愫慅愶愲愮慆愯慏愩慀戠酨戣戥戤揅揱揫搐搒搉搠搤"],["dda1","搳摃搟搕搘搹搷搢搣搌搦搰搨摁搵搯搊搚摀搥搧搋揧搛搮搡搎敯斒旓暆暌暕暐暋暊暙暔晸朠楦楟椸楎楢楱椿楅楪椹楂楗楙楺楈楉椵楬椳椽楥棰楸椴楩楀楯楄楶楘楁楴楌椻楋椷楜楏楑椲楒椯楻椼歆歅歃歂歈歁殛嗀毻毼"],["de40","毹毷毸溛滖滈溏滀溟溓溔溠溱溹滆滒溽滁溞滉溷溰滍溦滏溲溾滃滜滘溙溒溎溍溤溡溿溳滐滊溗溮溣煇煔煒煣煠煁煝煢煲煸煪煡煂煘煃煋煰煟煐煓"],["dea1","煄煍煚牏犍犌犑犐犎猼獂猻猺獀獊獉瑄瑊瑋瑒瑑瑗瑀瑏瑐瑎瑂瑆瑍瑔瓡瓿瓾瓽甝畹畷榃痯瘏瘃痷痾痼痹痸瘐痻痶痭痵痽皙皵盝睕睟睠睒睖睚睩睧睔睙睭矠碇碚碔碏碄碕碅碆碡碃硹碙碀碖硻祼禂祽祹稑稘稙稒稗稕稢稓"],["df40","稛稐窣窢窞竫筦筤筭筴筩筲筥筳筱筰筡筸筶筣粲粴粯綈綆綀綍絿綅絺綎絻綃絼綌綔綄絽綒罭罫罧罨罬羦羥羧翛翜耡腤腠腷腜腩腛腢腲朡腞腶腧腯"],["dfa1","腄腡舝艉艄艀艂艅蓱萿葖葶葹蒏蒍葥葑葀蒆葧萰葍葽葚葙葴葳葝蔇葞萷萺萴葺葃葸萲葅萩菙葋萯葂萭葟葰萹葎葌葒葯蓅蒎萻葇萶萳葨葾葄萫葠葔葮葐蜋蜄蛷蜌蛺蛖蛵蝍蛸蜎蜉蜁蛶蜍蜅裖裋裍裎裞裛裚裌裐覅覛觟觥觤"],["e040","觡觠觢觜触詶誆詿詡訿詷誂誄詵誃誁詴詺谼豋豊豥豤豦貆貄貅賌赨赩趑趌趎趏趍趓趔趐趒跰跠跬跱跮跐跩跣跢跧跲跫跴輆軿輁輀輅輇輈輂輋遒逿"],["e0a1","遄遉逽鄐鄍鄏鄑鄖鄔鄋鄎酮酯鉈鉒鈰鈺鉦鈳鉥鉞銃鈮鉊鉆鉭鉬鉏鉠鉧鉯鈶鉡鉰鈱鉔鉣鉐鉲鉎鉓鉌鉖鈲閟閜閞閛隒隓隑隗雎雺雽雸雵靳靷靸靲頏頍頎颬飶飹馯馲馰馵骭骫魛鳪鳭鳧麀黽僦僔僗僨僳僛僪僝僤僓僬僰僯僣僠"],["e140","凘劀劁勩勫匰厬嘧嘕嘌嘒嗼嘏嘜嘁嘓嘂嗺嘝嘄嗿嗹墉塼墐墘墆墁塿塴墋塺墇墑墎塶墂墈塻墔墏壾奫嫜嫮嫥嫕嫪嫚嫭嫫嫳嫢嫠嫛嫬嫞嫝嫙嫨嫟孷寠"],["e1a1","寣屣嶂嶀嵽嶆嵺嶁嵷嶊嶉嶈嵾嵼嶍嵹嵿幘幙幓廘廑廗廎廜廕廙廒廔彄彃彯徶愬愨慁慞慱慳慒慓慲慬憀慴慔慺慛慥愻慪慡慖戩戧戫搫摍摛摝摴摶摲摳摽摵摦撦摎撂摞摜摋摓摠摐摿搿摬摫摙摥摷敳斠暡暠暟朅朄朢榱榶槉"],["e240","榠槎榖榰榬榼榑榙榎榧榍榩榾榯榿槄榽榤槔榹槊榚槏榳榓榪榡榞槙榗榐槂榵榥槆歊歍歋殞殟殠毃毄毾滎滵滱漃漥滸漷滻漮漉潎漙漚漧漘漻漒滭漊"],["e2a1","漶潳滹滮漭潀漰漼漵滫漇漎潃漅滽滶漹漜滼漺漟漍漞漈漡熇熐熉熀熅熂熏煻熆熁熗牄牓犗犕犓獃獍獑獌瑢瑳瑱瑵瑲瑧瑮甀甂甃畽疐瘖瘈瘌瘕瘑瘊瘔皸瞁睼瞅瞂睮瞀睯睾瞃碲碪碴碭碨硾碫碞碥碠碬碢碤禘禊禋禖禕禔禓"],["e340","禗禈禒禐稫穊稰稯稨稦窨窫窬竮箈箜箊箑箐箖箍箌箛箎箅箘劄箙箤箂粻粿粼粺綧綷緂綣綪緁緀緅綝緎緄緆緋緌綯綹綖綼綟綦綮綩綡緉罳翢翣翥翞"],["e3a1","耤聝聜膉膆膃膇膍膌膋舕蒗蒤蒡蒟蒺蓎蓂蒬蒮蒫蒹蒴蓁蓍蒪蒚蒱蓐蒝蒧蒻蒢蒔蓇蓌蒛蒩蒯蒨蓖蒘蒶蓏蒠蓗蓔蓒蓛蒰蒑虡蜳蜣蜨蝫蝀蜮蜞蜡蜙蜛蝃蜬蝁蜾蝆蜠蜲蜪蜭蜼蜒蜺蜱蜵蝂蜦蜧蜸蜤蜚蜰蜑裷裧裱裲裺裾裮裼裶裻"],["e440","裰裬裫覝覡覟覞觩觫觨誫誙誋誒誏誖谽豨豩賕賏賗趖踉踂跿踍跽踊踃踇踆踅跾踀踄輐輑輎輍鄣鄜鄠鄢鄟鄝鄚鄤鄡鄛酺酲酹酳銥銤鉶銛鉺銠銔銪銍"],["e4a1","銦銚銫鉹銗鉿銣鋮銎銂銕銢鉽銈銡銊銆銌銙銧鉾銇銩銝銋鈭隞隡雿靘靽靺靾鞃鞀鞂靻鞄鞁靿韎韍頖颭颮餂餀餇馝馜駃馹馻馺駂馽駇骱髣髧鬾鬿魠魡魟鳱鳲鳵麧僿儃儰僸儆儇僶僾儋儌僽儊劋劌勱勯噈噂噌嘵噁噊噉噆噘"],["e540","噚噀嘳嘽嘬嘾嘸嘪嘺圚墫墝墱墠墣墯墬墥墡壿嫿嫴嫽嫷嫶嬃嫸嬂嫹嬁嬇嬅嬏屧嶙嶗嶟嶒嶢嶓嶕嶠嶜嶡嶚嶞幩幝幠幜緳廛廞廡彉徲憋憃慹憱憰憢憉"],["e5a1","憛憓憯憭憟憒憪憡憍慦憳戭摮摰撖撠撅撗撜撏撋撊撌撣撟摨撱撘敶敺敹敻斲斳暵暰暩暲暷暪暯樀樆樗槥槸樕槱槤樠槿槬槢樛樝槾樧槲槮樔槷槧橀樈槦槻樍槼槫樉樄樘樥樏槶樦樇槴樖歑殥殣殢殦氁氀毿氂潁漦潾澇濆澒"],["e640","澍澉澌潢潏澅潚澖潶潬澂潕潲潒潐潗澔澓潝漀潡潫潽潧澐潓澋潩潿澕潣潷潪潻熲熯熛熰熠熚熩熵熝熥熞熤熡熪熜熧熳犘犚獘獒獞獟獠獝獛獡獚獙"],["e6a1","獢璇璉璊璆璁瑽璅璈瑼瑹甈甇畾瘥瘞瘙瘝瘜瘣瘚瘨瘛皜皝皞皛瞍瞏瞉瞈磍碻磏磌磑磎磔磈磃磄磉禚禡禠禜禢禛歶稹窲窴窳箷篋箾箬篎箯箹篊箵糅糈糌糋緷緛緪緧緗緡縃緺緦緶緱緰緮緟罶羬羰羭翭翫翪翬翦翨聤聧膣膟"],["e740","膞膕膢膙膗舖艏艓艒艐艎艑蔤蔻蔏蔀蔩蔎蔉蔍蔟蔊蔧蔜蓻蔫蓺蔈蔌蓴蔪蓲蔕蓷蓫蓳蓼蔒蓪蓩蔖蓾蔨蔝蔮蔂蓽蔞蓶蔱蔦蓧蓨蓰蓯蓹蔘蔠蔰蔋蔙蔯虢"],["e7a1","蝖蝣蝤蝷蟡蝳蝘蝔蝛蝒蝡蝚蝑蝞蝭蝪蝐蝎蝟蝝蝯蝬蝺蝮蝜蝥蝏蝻蝵蝢蝧蝩衚褅褌褔褋褗褘褙褆褖褑褎褉覢覤覣觭觰觬諏諆誸諓諑諔諕誻諗誾諀諅諘諃誺誽諙谾豍貏賥賟賙賨賚賝賧趠趜趡趛踠踣踥踤踮踕踛踖踑踙踦踧"],["e840","踔踒踘踓踜踗踚輬輤輘輚輠輣輖輗遳遰遯遧遫鄯鄫鄩鄪鄲鄦鄮醅醆醊醁醂醄醀鋐鋃鋄鋀鋙銶鋏鋱鋟鋘鋩鋗鋝鋌鋯鋂鋨鋊鋈鋎鋦鋍鋕鋉鋠鋞鋧鋑鋓"],["e8a1","銵鋡鋆銴镼閬閫閮閰隤隢雓霅霈霂靚鞊鞎鞈韐韏頞頝頦頩頨頠頛頧颲餈飺餑餔餖餗餕駜駍駏駓駔駎駉駖駘駋駗駌骳髬髫髳髲髱魆魃魧魴魱魦魶魵魰魨魤魬鳼鳺鳽鳿鳷鴇鴀鳹鳻鴈鴅鴄麃黓鼏鼐儜儓儗儚儑凞匴叡噰噠噮"],["e940","噳噦噣噭噲噞噷圜圛壈墽壉墿墺壂墼壆嬗嬙嬛嬡嬔嬓嬐嬖嬨嬚嬠嬞寯嶬嶱嶩嶧嶵嶰嶮嶪嶨嶲嶭嶯嶴幧幨幦幯廩廧廦廨廥彋徼憝憨憖懅憴懆懁懌憺"],["e9a1","憿憸憌擗擖擐擏擉撽撉擃擛擳擙攳敿敼斢曈暾曀曊曋曏暽暻暺曌朣樴橦橉橧樲橨樾橝橭橶橛橑樨橚樻樿橁橪橤橐橏橔橯橩橠樼橞橖橕橍橎橆歕歔歖殧殪殫毈毇氄氃氆澭濋澣濇澼濎濈潞濄澽澞濊澨瀄澥澮澺澬澪濏澿澸"],["ea40","澢濉澫濍澯澲澰燅燂熿熸燖燀燁燋燔燊燇燏熽燘熼燆燚燛犝犞獩獦獧獬獥獫獪瑿璚璠璔璒璕璡甋疀瘯瘭瘱瘽瘳瘼瘵瘲瘰皻盦瞚瞝瞡瞜瞛瞢瞣瞕瞙"],["eaa1","瞗磝磩磥磪磞磣磛磡磢磭磟磠禤穄穈穇窶窸窵窱窷篞篣篧篝篕篥篚篨篹篔篪篢篜篫篘篟糒糔糗糐糑縒縡縗縌縟縠縓縎縜縕縚縢縋縏縖縍縔縥縤罃罻罼罺羱翯耪耩聬膱膦膮膹膵膫膰膬膴膲膷膧臲艕艖艗蕖蕅蕫蕍蕓蕡蕘"],["eb40","蕀蕆蕤蕁蕢蕄蕑蕇蕣蔾蕛蕱蕎蕮蕵蕕蕧蕠薌蕦蕝蕔蕥蕬虣虥虤螛螏螗螓螒螈螁螖螘蝹螇螣螅螐螑螝螄螔螜螚螉褞褦褰褭褮褧褱褢褩褣褯褬褟觱諠"],["eba1","諢諲諴諵諝謔諤諟諰諈諞諡諨諿諯諻貑貒貐賵賮賱賰賳赬赮趥趧踳踾踸蹀蹅踶踼踽蹁踰踿躽輶輮輵輲輹輷輴遶遹遻邆郺鄳鄵鄶醓醐醑醍醏錧錞錈錟錆錏鍺錸錼錛錣錒錁鍆錭錎錍鋋錝鋺錥錓鋹鋷錴錂錤鋿錩錹錵錪錔錌"],["ec40","錋鋾錉錀鋻錖閼闍閾閹閺閶閿閵閽隩雔霋霒霐鞙鞗鞔韰韸頵頯頲餤餟餧餩馞駮駬駥駤駰駣駪駩駧骹骿骴骻髶髺髹髷鬳鮀鮅鮇魼魾魻鮂鮓鮒鮐魺鮕"],["eca1","魽鮈鴥鴗鴠鴞鴔鴩鴝鴘鴢鴐鴙鴟麈麆麇麮麭黕黖黺鼒鼽儦儥儢儤儠儩勴嚓嚌嚍嚆嚄嚃噾嚂噿嚁壖壔壏壒嬭嬥嬲嬣嬬嬧嬦嬯嬮孻寱寲嶷幬幪徾徻懃憵憼懧懠懥懤懨懞擯擩擣擫擤擨斁斀斶旚曒檍檖檁檥檉檟檛檡檞檇檓檎"],["ed40","檕檃檨檤檑橿檦檚檅檌檒歛殭氉濌澩濴濔濣濜濭濧濦濞濲濝濢濨燡燱燨燲燤燰燢獳獮獯璗璲璫璐璪璭璱璥璯甐甑甒甏疄癃癈癉癇皤盩瞵瞫瞲瞷瞶"],["eda1","瞴瞱瞨矰磳磽礂磻磼磲礅磹磾礄禫禨穜穛穖穘穔穚窾竀竁簅簏篲簀篿篻簎篴簋篳簂簉簃簁篸篽簆篰篱簐簊糨縭縼繂縳顈縸縪繉繀繇縩繌縰縻縶繄縺罅罿罾罽翴翲耬膻臄臌臊臅臇膼臩艛艚艜薃薀薏薧薕薠薋薣蕻薤薚薞"],["ee40","蕷蕼薉薡蕺蕸蕗薎薖薆薍薙薝薁薢薂薈薅蕹蕶薘薐薟虨螾螪螭蟅螰螬螹螵螼螮蟉蟃蟂蟌螷螯蟄蟊螴螶螿螸螽蟞螲褵褳褼褾襁襒褷襂覭覯覮觲觳謞"],["eea1","謘謖謑謅謋謢謏謒謕謇謍謈謆謜謓謚豏豰豲豱豯貕貔賹赯蹎蹍蹓蹐蹌蹇轃轀邅遾鄸醚醢醛醙醟醡醝醠鎡鎃鎯鍤鍖鍇鍼鍘鍜鍶鍉鍐鍑鍠鍭鎏鍌鍪鍹鍗鍕鍒鍏鍱鍷鍻鍡鍞鍣鍧鎀鍎鍙闇闀闉闃闅閷隮隰隬霠霟霘霝霙鞚鞡鞜"],["ef40","鞞鞝韕韔韱顁顄顊顉顅顃餥餫餬餪餳餲餯餭餱餰馘馣馡騂駺駴駷駹駸駶駻駽駾駼騃骾髾髽鬁髼魈鮚鮨鮞鮛鮦鮡鮥鮤鮆鮢鮠鮯鴳鵁鵧鴶鴮鴯鴱鴸鴰"],["efa1","鵅鵂鵃鴾鴷鵀鴽翵鴭麊麉麍麰黈黚黻黿鼤鼣鼢齔龠儱儭儮嚘嚜嚗嚚嚝嚙奰嬼屩屪巀幭幮懘懟懭懮懱懪懰懫懖懩擿攄擽擸攁攃擼斔旛曚曛曘櫅檹檽櫡櫆檺檶檷櫇檴檭歞毉氋瀇瀌瀍瀁瀅瀔瀎濿瀀濻瀦濼濷瀊爁燿燹爃燽獶"],["f040","璸瓀璵瓁璾璶璻瓂甔甓癜癤癙癐癓癗癚皦皽盬矂瞺磿礌礓礔礉礐礒礑禭禬穟簜簩簙簠簟簭簝簦簨簢簥簰繜繐繖繣繘繢繟繑繠繗繓羵羳翷翸聵臑臒"],["f0a1","臐艟艞薴藆藀藃藂薳薵薽藇藄薿藋藎藈藅薱薶藒蘤薸薷薾虩蟧蟦蟢蟛蟫蟪蟥蟟蟳蟤蟔蟜蟓蟭蟘蟣螤蟗蟙蠁蟴蟨蟝襓襋襏襌襆襐襑襉謪謧謣謳謰謵譇謯謼謾謱謥謷謦謶謮謤謻謽謺豂豵貙貘貗賾贄贂贀蹜蹢蹠蹗蹖蹞蹥蹧"],["f140","蹛蹚蹡蹝蹩蹔轆轇轈轋鄨鄺鄻鄾醨醥醧醯醪鎵鎌鎒鎷鎛鎝鎉鎧鎎鎪鎞鎦鎕鎈鎙鎟鎍鎱鎑鎲鎤鎨鎴鎣鎥闒闓闑隳雗雚巂雟雘雝霣霢霥鞬鞮鞨鞫鞤鞪"],["f1a1","鞢鞥韗韙韖韘韺顐顑顒颸饁餼餺騏騋騉騍騄騑騊騅騇騆髀髜鬈鬄鬅鬩鬵魊魌魋鯇鯆鯃鮿鯁鮵鮸鯓鮶鯄鮹鮽鵜鵓鵏鵊鵛鵋鵙鵖鵌鵗鵒鵔鵟鵘鵚麎麌黟鼁鼀鼖鼥鼫鼪鼩鼨齌齕儴儵劖勷厴嚫嚭嚦嚧嚪嚬壚壝壛夒嬽嬾嬿巃幰"],["f240","徿懻攇攐攍攉攌攎斄旞旝曞櫧櫠櫌櫑櫙櫋櫟櫜櫐櫫櫏櫍櫞歠殰氌瀙瀧瀠瀖瀫瀡瀢瀣瀩瀗瀤瀜瀪爌爊爇爂爅犥犦犤犣犡瓋瓅璷瓃甖癠矉矊矄矱礝礛"],["f2a1","礡礜礗礞禰穧穨簳簼簹簬簻糬糪繶繵繸繰繷繯繺繲繴繨罋罊羃羆羷翽翾聸臗臕艤艡艣藫藱藭藙藡藨藚藗藬藲藸藘藟藣藜藑藰藦藯藞藢蠀蟺蠃蟶蟷蠉蠌蠋蠆蟼蠈蟿蠊蠂襢襚襛襗襡襜襘襝襙覈覷覶觶譐譈譊譀譓譖譔譋譕"],["f340","譑譂譒譗豃豷豶貚贆贇贉趬趪趭趫蹭蹸蹳蹪蹯蹻軂轒轑轏轐轓辴酀鄿醰醭鏞鏇鏏鏂鏚鏐鏹鏬鏌鏙鎩鏦鏊鏔鏮鏣鏕鏄鏎鏀鏒鏧镽闚闛雡霩霫霬霨霦"],["f3a1","鞳鞷鞶韝韞韟顜顙顝顗颿颽颻颾饈饇饃馦馧騚騕騥騝騤騛騢騠騧騣騞騜騔髂鬋鬊鬎鬌鬷鯪鯫鯠鯞鯤鯦鯢鯰鯔鯗鯬鯜鯙鯥鯕鯡鯚鵷鶁鶊鶄鶈鵱鶀鵸鶆鶋鶌鵽鵫鵴鵵鵰鵩鶅鵳鵻鶂鵯鵹鵿鶇鵨麔麑黀黼鼭齀齁齍齖齗齘匷嚲"],["f440","嚵嚳壣孅巆巇廮廯忀忁懹攗攖攕攓旟曨曣曤櫳櫰櫪櫨櫹櫱櫮櫯瀼瀵瀯瀷瀴瀱灂瀸瀿瀺瀹灀瀻瀳灁爓爔犨獽獼璺皫皪皾盭矌矎矏矍矲礥礣礧礨礤礩"],["f4a1","禲穮穬穭竷籉籈籊籇籅糮繻繾纁纀羺翿聹臛臙舋艨艩蘢藿蘁藾蘛蘀藶蘄蘉蘅蘌藽蠙蠐蠑蠗蠓蠖襣襦覹觷譠譪譝譨譣譥譧譭趮躆躈躄轙轖轗轕轘轚邍酃酁醷醵醲醳鐋鐓鏻鐠鐏鐔鏾鐕鐐鐨鐙鐍鏵鐀鏷鐇鐎鐖鐒鏺鐉鏸鐊鏿"],["f540","鏼鐌鏶鐑鐆闞闠闟霮霯鞹鞻韽韾顠顢顣顟飁飂饐饎饙饌饋饓騲騴騱騬騪騶騩騮騸騭髇髊髆鬐鬒鬑鰋鰈鯷鰅鰒鯸鱀鰇鰎鰆鰗鰔鰉鶟鶙鶤鶝鶒鶘鶐鶛"],["f5a1","鶠鶔鶜鶪鶗鶡鶚鶢鶨鶞鶣鶿鶩鶖鶦鶧麙麛麚黥黤黧黦鼰鼮齛齠齞齝齙龑儺儹劘劗囃嚽嚾孈孇巋巏廱懽攛欂櫼欃櫸欀灃灄灊灈灉灅灆爝爚爙獾甗癪矐礭礱礯籔籓糲纊纇纈纋纆纍罍羻耰臝蘘蘪蘦蘟蘣蘜蘙蘧蘮蘡蘠蘩蘞蘥"],["f640","蠩蠝蠛蠠蠤蠜蠫衊襭襩襮襫觺譹譸譅譺譻贐贔趯躎躌轞轛轝酆酄酅醹鐿鐻鐶鐩鐽鐼鐰鐹鐪鐷鐬鑀鐱闥闤闣霵霺鞿韡顤飉飆飀饘饖騹騽驆驄驂驁騺"],["f6a1","騿髍鬕鬗鬘鬖鬺魒鰫鰝鰜鰬鰣鰨鰩鰤鰡鶷鶶鶼鷁鷇鷊鷏鶾鷅鷃鶻鶵鷎鶹鶺鶬鷈鶱鶭鷌鶳鷍鶲鹺麜黫黮黭鼛鼘鼚鼱齎齥齤龒亹囆囅囋奱孋孌巕巑廲攡攠攦攢欋欈欉氍灕灖灗灒爞爟犩獿瓘瓕瓙瓗癭皭礵禴穰穱籗籜籙籛籚"],["f740","糴糱纑罏羇臞艫蘴蘵蘳蘬蘲蘶蠬蠨蠦蠪蠥襱覿覾觻譾讄讂讆讅譿贕躕躔躚躒躐躖躗轠轢酇鑌鑐鑊鑋鑏鑇鑅鑈鑉鑆霿韣顪顩飋饔饛驎驓驔驌驏驈驊"],["f7a1","驉驒驐髐鬙鬫鬻魖魕鱆鱈鰿鱄鰹鰳鱁鰼鰷鰴鰲鰽鰶鷛鷒鷞鷚鷋鷐鷜鷑鷟鷩鷙鷘鷖鷵鷕鷝麶黰鼵鼳鼲齂齫龕龢儽劙壨壧奲孍巘蠯彏戁戃戄攩攥斖曫欑欒欏毊灛灚爢玂玁玃癰矔籧籦纕艬蘺虀蘹蘼蘱蘻蘾蠰蠲蠮蠳襶襴襳觾"],["f840","讌讎讋讈豅贙躘轤轣醼鑢鑕鑝鑗鑞韄韅頀驖驙鬞鬟鬠鱒鱘鱐鱊鱍鱋鱕鱙鱌鱎鷻鷷鷯鷣鷫鷸鷤鷶鷡鷮鷦鷲鷰鷢鷬鷴鷳鷨鷭黂黐黲黳鼆鼜鼸鼷鼶齃齏"],["f8a1","齱齰齮齯囓囍孎屭攭曭曮欓灟灡灝灠爣瓛瓥矕礸禷禶籪纗羉艭虃蠸蠷蠵衋讔讕躞躟躠躝醾醽釂鑫鑨鑩雥靆靃靇韇韥驞髕魙鱣鱧鱦鱢鱞鱠鸂鷾鸇鸃鸆鸅鸀鸁鸉鷿鷽鸄麠鼞齆齴齵齶囔攮斸欘欙欗欚灢爦犪矘矙礹籩籫糶纚"],["f940","纘纛纙臠臡虆虇虈襹襺襼襻觿讘讙躥躤躣鑮鑭鑯鑱鑳靉顲饟鱨鱮鱭鸋鸍鸐鸏鸒鸑麡黵鼉齇齸齻齺齹圞灦籯蠼趲躦釃鑴鑸鑶鑵驠鱴鱳鱱鱵鸔鸓黶鼊"],["f9a1","龤灨灥糷虪蠾蠽蠿讞貜躩軉靋顳顴飌饡馫驤驦驧鬤鸕鸗齈戇欞爧虌躨钂钀钁驩驨鬮鸙爩虋讟钃鱹麷癵驫鱺鸝灩灪麤齾齉龘碁銹裏墻恒粧嫺╔╦╗╠╬╣╚╩╝╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜║═╭╮╰╯▓"]]'
			);
		},
		function (e, t, n) {
			"use strict";
			e.exports = function unpipe(e) {
				if (!e) throw new TypeError("argument stream is required");
				if ("function" == typeof e.unpipe) return void e.unpipe();
				if (
					!(function hasPipeDataListeners(e) {
						for (var t = e.listeners("data"), n = 0; n < t.length; n++)
							if ("ondata" === t[n].name) return !0;
						return !1;
					})(e)
				)
					return;
				for (var t, n = e.listeners("close"), a = 0; a < n.length; a++)
					("cleanup" !== (t = n[a]).name && "onclose" !== t.name) || t.call(e);
			};
		},
		function (e, t, n) {
			"use strict";
			var a = n(121),
				i = n(1).extname,
				r = /^\s*([^;\s]*)(?:;|\s|$)/,
				o = /^text\//i;
			function charset(e) {
				if (!e || "string" != typeof e) return !1;
				var t = r.exec(e),
					n = t && a[t[1].toLowerCase()];
				return n && n.charset ? n.charset : !(!t || !o.test(t[1])) && "UTF-8";
			}
			(t.charset = charset),
				(t.charsets = { lookup: charset }),
				(t.contentType = function contentType(e) {
					if (!e || "string" != typeof e) return !1;
					var n = -1 === e.indexOf("/") ? t.lookup(e) : e;
					if (!n) return !1;
					if (-1 === n.indexOf("charset")) {
						var a = t.charset(n);
						a && (n += "; charset=" + a.toLowerCase());
					}
					return n;
				}),
				(t.extension = function extension(e) {
					if (!e || "string" != typeof e) return !1;
					var n = r.exec(e),
						a = n && t.extensions[n[1].toLowerCase()];
					if (!a || !a.length) return !1;
					return a[0];
				}),
				(t.extensions = Object.create(null)),
				(t.lookup = function lookup(e) {
					if (!e || "string" != typeof e) return !1;
					var n = i("x." + e)
						.toLowerCase()
						.substr(1);
					if (!n) return !1;
					return t.types[n] || !1;
				}),
				(t.types = Object.create(null)),
				(function populateMaps(e, t) {
					var n = ["nginx", "apache", void 0, "iana"];
					Object.keys(a).forEach(function forEachMimeType(i) {
						var r = a[i],
							o = r.extensions;
						if (o && o.length) {
							e[i] = o;
							for (var s = 0; s < o.length; s++) {
								var c = o[s];
								if (t[c]) {
									var p = n.indexOf(a[t[c]].source),
										l = n.indexOf(r.source);
									if (
										"application/octet-stream" !== t[c] &&
										(p > l ||
											(p === l && "application/" === t[c].substr(0, 12)))
									)
										continue;
								}
								t[c] = i;
							}
						}
					});
				})(t.extensions, t.types);
		},
		function (e, t, n) {
			"use strict";
			var a = Object.prototype.hasOwnProperty,
				i = Array.isArray,
				r = (function () {
					for (var e = [], t = 0; t < 256; ++t)
						e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
					return e;
				})(),
				o = function arrayToObject(e, t) {
					for (
						var n = t && t.plainObjects ? Object.create(null) : {}, a = 0;
						a < e.length;
						++a
					)
						void 0 !== e[a] && (n[a] = e[a]);
					return n;
				};
			e.exports = {
				arrayToObject: o,
				assign: function assignSingleSource(e, t) {
					return Object.keys(t).reduce(function (e, n) {
						return (e[n] = t[n]), e;
					}, e);
				},
				combine: function combine(e, t) {
					return [].concat(e, t);
				},
				compact: function compact(e) {
					for (var t = [{ obj: { o: e }, prop: "o" }], n = [], a = 0; a < t.length; ++a)
						for (
							var r = t[a], o = r.obj[r.prop], s = Object.keys(o), c = 0;
							c < s.length;
							++c
						) {
							var p = s[c],
								l = o[p];
							"object" == typeof l &&
								null !== l &&
								-1 === n.indexOf(l) &&
								(t.push({ obj: o, prop: p }), n.push(l));
						}
					return (
						(function compactQueue(e) {
							for (; e.length > 1; ) {
								var t = e.pop(),
									n = t.obj[t.prop];
								if (i(n)) {
									for (var a = [], r = 0; r < n.length; ++r)
										void 0 !== n[r] && a.push(n[r]);
									t.obj[t.prop] = a;
								}
							}
						})(t),
						e
					);
				},
				decode: function (e, t, n) {
					var a = e.replace(/\+/g, " ");
					if ("iso-8859-1" === n) return a.replace(/%[0-9a-f]{2}/gi, unescape);
					try {
						return decodeURIComponent(a);
					} catch (e) {
						return a;
					}
				},
				encode: function encode(e, t, n) {
					if (0 === e.length) return e;
					var a = "string" == typeof e ? e : String(e);
					if ("iso-8859-1" === n)
						return escape(a).replace(/%u[0-9a-f]{4}/gi, function (e) {
							return "%26%23" + parseInt(e.slice(2), 16) + "%3B";
						});
					for (var i = "", o = 0; o < a.length; ++o) {
						var s = a.charCodeAt(o);
						45 === s ||
						46 === s ||
						95 === s ||
						126 === s ||
						(s >= 48 && s <= 57) ||
						(s >= 65 && s <= 90) ||
						(s >= 97 && s <= 122)
							? (i += a.charAt(o))
							: s < 128
							? (i += r[s])
							: s < 2048
							? (i += r[192 | (s >> 6)] + r[128 | (63 & s)])
							: s < 55296 || s >= 57344
							? (i +=
									r[224 | (s >> 12)] +
									r[128 | ((s >> 6) & 63)] +
									r[128 | (63 & s)])
							: ((o += 1),
							  (s = 65536 + (((1023 & s) << 10) | (1023 & a.charCodeAt(o)))),
							  (i +=
									r[240 | (s >> 18)] +
									r[128 | ((s >> 12) & 63)] +
									r[128 | ((s >> 6) & 63)] +
									r[128 | (63 & s)]));
					}
					return i;
				},
				isBuffer: function isBuffer(e) {
					return (
						!(!e || "object" != typeof e) &&
						!!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e))
					);
				},
				isRegExp: function isRegExp(e) {
					return "[object RegExp]" === Object.prototype.toString.call(e);
				},
				merge: function merge(e, t, n) {
					if (!t) return e;
					if ("object" != typeof t) {
						if (i(e)) e.push(t);
						else {
							if (!e || "object" != typeof e) return [e, t];
							((n && (n.plainObjects || n.allowPrototypes)) ||
								!a.call(Object.prototype, t)) &&
								(e[t] = !0);
						}
						return e;
					}
					if (!e || "object" != typeof e) return [e].concat(t);
					var r = e;
					return (
						i(e) && !i(t) && (r = o(e, n)),
						i(e) && i(t)
							? (t.forEach(function (t, i) {
									if (a.call(e, i)) {
										var r = e[i];
										r && "object" == typeof r && t && "object" == typeof t
											? (e[i] = merge(r, t, n))
											: e.push(t);
									} else e[i] = t;
							  }),
							  e)
							: Object.keys(t).reduce(function (e, i) {
									var r = t[i];
									return (
										a.call(e, i) ? (e[i] = merge(e[i], r, n)) : (e[i] = r), e
									);
							  }, r)
					);
				},
			};
		},
		function (e, t, n) {
			"use strict";
			var a = String.prototype.replace,
				i = /%20/g;
			e.exports = {
				default: "RFC3986",
				formatters: {
					RFC1738: function (e) {
						return a.call(e, i, "+");
					},
					RFC3986: function (e) {
						return e;
					},
				},
				RFC1738: "RFC1738",
				RFC3986: "RFC3986",
			};
		},
		function (e, t, n) {
			var a;
			function createDebug(e) {
				function debug() {
					if (debug.enabled) {
						var e = debug,
							n = +new Date(),
							i = n - (a || n);
						(e.diff = i), (e.prev = a), (e.curr = n), (a = n);
						for (var r = new Array(arguments.length), o = 0; o < r.length; o++)
							r[o] = arguments[o];
						(r[0] = t.coerce(r[0])), "string" != typeof r[0] && r.unshift("%O");
						var s = 0;
						(r[0] = r[0].replace(/%([a-zA-Z%])/g, function (n, a) {
							if ("%%" === n) return n;
							s++;
							var i = t.formatters[a];
							if ("function" == typeof i) {
								var o = r[s];
								(n = i.call(e, o)), r.splice(s, 1), s--;
							}
							return n;
						})),
							t.formatArgs.call(e, r);
						var c = debug.log || t.log || console.log.bind(console);
						c.apply(e, r);
					}
				}
				return (
					(debug.namespace = e),
					(debug.enabled = t.enabled(e)),
					(debug.useColors = t.useColors()),
					(debug.color = (function selectColor(e) {
						var n,
							a = 0;
						for (n in e) (a = (a << 5) - a + e.charCodeAt(n)), (a |= 0);
						return t.colors[Math.abs(a) % t.colors.length];
					})(e)),
					"function" == typeof t.init && t.init(debug),
					debug
				);
			}
			((t = e.exports = createDebug.debug = createDebug.default = createDebug).coerce = function coerce(
				e
			) {
				return e instanceof Error ? e.stack || e.message : e;
			}),
				(t.disable = function disable() {
					t.enable("");
				}),
				(t.enable = function enable(e) {
					t.save(e), (t.names = []), (t.skips = []);
					for (
						var n = ("string" == typeof e ? e : "").split(/[\s,]+/),
							a = n.length,
							i = 0;
						i < a;
						i++
					)
						n[i] &&
							("-" === (e = n[i].replace(/\*/g, ".*?"))[0]
								? t.skips.push(new RegExp("^" + e.substr(1) + "$"))
								: t.names.push(new RegExp("^" + e + "$")));
				}),
				(t.enabled = function enabled(e) {
					var n, a;
					for (n = 0, a = t.skips.length; n < a; n++) if (t.skips[n].test(e)) return !1;
					for (n = 0, a = t.names.length; n < a; n++) if (t.names[n].test(e)) return !0;
					return !1;
				}),
				(t.humanize = n(133)),
				(t.names = []),
				(t.skips = []),
				(t.formatters = {});
		},
		function (e, t, n) {
			"use strict";
			var a = n(57),
				i = n(59),
				r = n(39),
				o = n(32),
				s = n(20)("express:router"),
				c = n(6)("express"),
				p = n(31),
				l = n(19),
				u = n(23),
				d = /^\[object (\S+)\]$/,
				m = Array.prototype.slice,
				f = Object.prototype.toString,
				h = (e.exports = function (e) {
					var t = e || {};
					function router(e, t, n) {
						router.handle(e, t, n);
					}
					return (
						u(router, h),
						(router.params = {}),
						(router._params = []),
						(router.caseSensitive = t.caseSensitive),
						(router.mergeParams = t.mergeParams),
						(router.strict = t.strict),
						(router.stack = []),
						router
					);
				});
			function appendMethods(e, t) {
				for (var n = 0; n < t.length; n++) {
					var a = t[n];
					-1 === e.indexOf(a) && e.push(a);
				}
			}
			function gettype(e) {
				var t = typeof e;
				return "object" !== t ? t : f.call(e).replace(d, "$1");
			}
			function matchLayer(e, t) {
				try {
					return e.match(t);
				} catch (e) {
					return e;
				}
			}
			(h.param = function param(e, t) {
				if ("function" == typeof e)
					return (
						c("router.param(fn): Refactor to use path params"),
						void this._params.push(e)
					);
				var n,
					a = this._params,
					i = a.length;
				":" === e[0] &&
					(c(
						"router.param(" +
							JSON.stringify(e) +
							", fn): Use router.param(" +
							JSON.stringify(e.substr(1)) +
							", fn) instead"
					),
					(e = e.substr(1)));
				for (var r = 0; r < i; ++r) (n = a[r](e, t)) && (t = n);
				if ("function" != typeof t)
					throw new Error("invalid param() call for " + e + ", got " + t);
				return (this.params[e] = this.params[e] || []).push(t), this;
			}),
				(h.handle = function handle(e, t, n) {
					var a = this;
					s("dispatching %s %s", e.method, e.url);
					var i = 0,
						r =
							(function getProtohost(e) {
								if ("string" != typeof e || 0 === e.length || "/" === e[0]) return;
								var t = e.indexOf("?"),
									n = -1 !== t ? t : e.length,
									a = e.substr(0, n).indexOf("://");
								return -1 !== a ? e.substr(0, e.indexOf("/", 3 + a)) : void 0;
							})(e.url) || "",
						c = "",
						p = !1,
						u = {},
						d = [],
						m = a.stack,
						f = e.params,
						h = e.baseUrl || "",
						v = (function restore(e, t) {
							for (
								var n = new Array(arguments.length - 2),
									a = new Array(arguments.length - 2),
									i = 0;
								i < n.length;
								i++
							)
								(n[i] = arguments[i + 2]), (a[i] = t[n[i]]);
							return function () {
								for (var i = 0; i < n.length; i++) t[n[i]] = a[i];
								return e.apply(this, arguments);
							};
						})(n, e, "baseUrl", "next", "params");
					function next(n) {
						var g = "route" === n ? null : n;
						if (
							(p && ((e.url = e.url.substr(1)), (p = !1)),
							0 !== c.length &&
								((e.baseUrl = h),
								(e.url = r + c + e.url.substr(r.length)),
								(c = "")),
							"router" !== g)
						)
							if (i >= m.length) setImmediate(v, g);
							else {
								var b,
									x,
									y,
									w = (function getPathname(e) {
										try {
											return l(e).pathname;
										} catch (e) {
											return;
										}
									})(e);
								if (null == w) return v(g);
								for (; !0 !== x && i < m.length; )
									if (
										((x = matchLayer((b = m[i++]), w)),
										(y = b.route),
										"boolean" != typeof x && (g = g || x),
										!0 === x && y)
									)
										if (g) x = !1;
										else {
											var _ = e.method,
												k = y._handles_method(_);
											k || "OPTIONS" !== _ || appendMethods(d, y._options()),
												k || "HEAD" === _ || (x = !1);
										}
								if (!0 !== x) return v(g);
								y && (e.route = y),
									(e.params = a.mergeParams
										? (function mergeParams(e, t) {
												if ("object" != typeof t || !t) return e;
												var n = o({}, t);
												if (!(0 in e) || !(0 in t)) return o(n, e);
												var a = 0,
													i = 0;
												for (; a in e; ) a++;
												for (; i in t; ) i++;
												for (a--; a >= 0; a--)
													(e[a + i] = e[a]), a < i && delete e[a];
												return o(n, e);
										  })(b.params, f)
										: b.params);
								var E = b.path;
								a.process_params(b, u, e, t, function (n) {
									return n
										? next(g || n)
										: y
										? b.handle_request(e, t, next)
										: void (function trim_prefix(n, a, i, o) {
												if (0 !== i.length) {
													var l = o[i.length];
													if (l && "/" !== l && "." !== l) return next(a);
													s("trim prefix (%s) from url %s", i, e.url),
														(c = i),
														(e.url =
															r + e.url.substr(r.length + c.length)),
														r ||
															"/" === e.url[0] ||
															((e.url = "/" + e.url), (p = !0)),
														(e.baseUrl =
															h +
															("/" === c[c.length - 1]
																? c.substring(0, c.length - 1)
																: c));
												}
												s("%s %s : %s", n.name, i, e.originalUrl),
													a
														? n.handle_error(a, e, t, next)
														: n.handle_request(e, t, next);
										  })(b, g, E, w);
								});
							}
						else setImmediate(v, null);
					}
					(e.next = next),
						"OPTIONS" === e.method &&
							(v = (function wrap(e, t) {
								return function proxy() {
									var n = new Array(arguments.length + 1);
									n[0] = e;
									for (var a = 0, i = arguments.length; a < i; a++)
										n[a + 1] = arguments[a];
									t.apply(this, n);
								};
							})(v, function (e, n) {
								if (n || 0 === d.length) return e(n);
								!(function sendOptionsResponse(e, t, n) {
									try {
										var a = t.join(",");
										e.set("Allow", a), e.send(a);
									} catch (e) {
										n(e);
									}
								})(t, d, e);
							})),
						(e.baseUrl = h),
						(e.originalUrl = e.originalUrl || e.url),
						next();
				}),
				(h.process_params = function process_params(e, t, n, a, i) {
					var r = this.params,
						o = e.keys;
					if (!o || 0 === o.length) return i();
					var s,
						c,
						p,
						l,
						u,
						d = 0,
						m = 0;
					function param(e) {
						return e
							? i(e)
							: d >= o.length
							? i()
							: ((m = 0),
							  (c = o[d++]),
							  (s = c.name),
							  (p = n.params[s]),
							  (l = r[s]),
							  (u = t[s]),
							  void 0 !== p && l
									? u && (u.match === p || (u.error && "route" !== u.error))
										? ((n.params[s] = u.value), param(u.error))
										: ((t[s] = u = { error: null, match: p, value: p }),
										  void paramCallback())
									: param());
					}
					function paramCallback(e) {
						var t = l[m++];
						if (((u.value = n.params[c.name]), e)) return (u.error = e), void param(e);
						if (!t) return param();
						try {
							t(n, a, paramCallback, p, c.name);
						} catch (e) {
							paramCallback(e);
						}
					}
					param();
				}),
				(h.use = function use(e) {
					var t = 0,
						n = "/";
					if ("function" != typeof e) {
						for (var a = e; Array.isArray(a) && 0 !== a.length; ) a = a[0];
						"function" != typeof a && ((t = 1), (n = e));
					}
					var r = p(m.call(arguments, t));
					if (0 === r.length)
						throw new TypeError("Router.use() requires a middleware function");
					for (var o = 0; o < r.length; o++) {
						if ("function" != typeof (e = r[o]))
							throw new TypeError(
								"Router.use() requires a middleware function but got a " +
									gettype(e)
							);
						s("use %o %s", n, e.name || "<anonymous>");
						var c = new i(n, { sensitive: this.caseSensitive, strict: !1, end: !1 }, e);
						(c.route = void 0), this.stack.push(c);
					}
					return this;
				}),
				(h.route = function route(e) {
					var route = new a(e),
						t = new i(
							e,
							{ sensitive: this.caseSensitive, strict: this.strict, end: !0 },
							route.dispatch.bind(route)
						);
					return (t.route = route), this.stack.push(t), route;
				}),
				r.concat("all").forEach(function (e) {
					h[e] = function (t) {
						var n = this.route(t);
						return n[e].apply(n, m.call(arguments, 1)), this;
					};
				});
		},
		function (e, t, n) {
			"use strict";
			var a = n(20)("express:router:route"),
				i = n(31),
				r = n(59),
				o = n(39),
				s = Array.prototype.slice,
				c = Object.prototype.toString;
			function Route(e) {
				(this.path = e), (this.stack = []), a("new %o", e), (this.methods = {});
			}
			(e.exports = Route),
				(Route.prototype._handles_method = function _handles_method(e) {
					if (this.methods._all) return !0;
					var t = e.toLowerCase();
					return (
						"head" !== t || this.methods.head || (t = "get"), Boolean(this.methods[t])
					);
				}),
				(Route.prototype._options = function _options() {
					var e = Object.keys(this.methods);
					this.methods.get && !this.methods.head && e.push("head");
					for (var t = 0; t < e.length; t++) e[t] = e[t].toUpperCase();
					return e;
				}),
				(Route.prototype.dispatch = function dispatch(e, t, n) {
					var a = 0,
						i = this.stack;
					if (0 === i.length) return n();
					var r = e.method.toLowerCase();
					"head" !== r || this.methods.head || (r = "get"),
						(e.route = this),
						(function next(o) {
							if (o && "route" === o) return n();
							if (o && "router" === o) return n(o);
							var s = i[a++];
							if (!s) return n(o);
							if (s.method && s.method !== r) return next(o);
							o ? s.handle_error(o, e, t, next) : s.handle_request(e, t, next);
						})();
				}),
				(Route.prototype.all = function all() {
					for (var e = i(s.call(arguments)), t = 0; t < e.length; t++) {
						var n = e[t];
						if ("function" != typeof n) {
							var a = c.call(n),
								o = "Route.all() requires a callback function but got a " + a;
							throw new TypeError(o);
						}
						var p = r("/", {}, n);
						(p.method = void 0), (this.methods._all = !0), this.stack.push(p);
					}
					return this;
				}),
				o.forEach(function (e) {
					Route.prototype[e] = function () {
						for (var t = i(s.call(arguments)), n = 0; n < t.length; n++) {
							var o = t[n];
							if ("function" != typeof o) {
								var p = c.call(o),
									l =
										"Route." +
										e +
										"() requires a callback function but got a " +
										p;
								throw new Error(l);
							}
							a("%s %o", e, this.path);
							var u = r("/", {}, o);
							(u.method = e), (this.methods[e] = !0), this.stack.push(u);
						}
						return this;
					};
				});
		},
		function (e, t, n) {
			var a;
			function createDebug(e) {
				function debug() {
					if (debug.enabled) {
						var e = debug,
							n = +new Date(),
							i = n - (a || n);
						(e.diff = i), (e.prev = a), (e.curr = n), (a = n);
						for (var r = new Array(arguments.length), o = 0; o < r.length; o++)
							r[o] = arguments[o];
						(r[0] = t.coerce(r[0])), "string" != typeof r[0] && r.unshift("%O");
						var s = 0;
						(r[0] = r[0].replace(/%([a-zA-Z%])/g, function (n, a) {
							if ("%%" === n) return n;
							s++;
							var i = t.formatters[a];
							if ("function" == typeof i) {
								var o = r[s];
								(n = i.call(e, o)), r.splice(s, 1), s--;
							}
							return n;
						})),
							t.formatArgs.call(e, r);
						var c = debug.log || t.log || console.log.bind(console);
						c.apply(e, r);
					}
				}
				return (
					(debug.namespace = e),
					(debug.enabled = t.enabled(e)),
					(debug.useColors = t.useColors()),
					(debug.color = (function selectColor(e) {
						var n,
							a = 0;
						for (n in e) (a = (a << 5) - a + e.charCodeAt(n)), (a |= 0);
						return t.colors[Math.abs(a) % t.colors.length];
					})(e)),
					"function" == typeof t.init && t.init(debug),
					debug
				);
			}
			((t = e.exports = createDebug.debug = createDebug.default = createDebug).coerce = function coerce(
				e
			) {
				return e instanceof Error ? e.stack || e.message : e;
			}),
				(t.disable = function disable() {
					t.enable("");
				}),
				(t.enable = function enable(e) {
					t.save(e), (t.names = []), (t.skips = []);
					for (
						var n = ("string" == typeof e ? e : "").split(/[\s,]+/),
							a = n.length,
							i = 0;
						i < a;
						i++
					)
						n[i] &&
							("-" === (e = n[i].replace(/\*/g, ".*?"))[0]
								? t.skips.push(new RegExp("^" + e.substr(1) + "$"))
								: t.names.push(new RegExp("^" + e + "$")));
				}),
				(t.enabled = function enabled(e) {
					var n, a;
					for (n = 0, a = t.skips.length; n < a; n++) if (t.skips[n].test(e)) return !1;
					for (n = 0, a = t.names.length; n < a; n++) if (t.names[n].test(e)) return !0;
					return !1;
				}),
				(t.humanize = n(136)),
				(t.names = []),
				(t.skips = []),
				(t.formatters = {});
		},
		function (e, t, n) {
			"use strict";
			var a = n(138),
				i = n(20)("express:router:layer"),
				r = Object.prototype.hasOwnProperty;
			function Layer(e, t, n) {
				if (!(this instanceof Layer)) return new Layer(e, t, n);
				i("new %o", e);
				var r = t || {};
				(this.handle = n),
					(this.name = n.name || "<anonymous>"),
					(this.params = void 0),
					(this.path = void 0),
					(this.regexp = a(e, (this.keys = []), r)),
					(this.regexp.fast_star = "*" === e),
					(this.regexp.fast_slash = "/" === e && !1 === r.end);
			}
			function decode_param(e) {
				if ("string" != typeof e || 0 === e.length) return e;
				try {
					return decodeURIComponent(e);
				} catch (t) {
					throw (
						(t instanceof URIError &&
							((t.message = "Failed to decode param '" + e + "'"),
							(t.status = t.statusCode = 400)),
						t)
					);
				}
			}
			(e.exports = Layer),
				(Layer.prototype.handle_error = function handle_error(e, t, n, a) {
					var i = this.handle;
					if (4 !== i.length) return a(e);
					try {
						i(e, t, n, a);
					} catch (e) {
						a(e);
					}
				}),
				(Layer.prototype.handle_request = function handle(e, t, n) {
					var a = this.handle;
					if (a.length > 3) return n();
					try {
						a(e, t, n);
					} catch (e) {
						n(e);
					}
				}),
				(Layer.prototype.match = function match(e) {
					var match;
					if (null != e) {
						if (this.regexp.fast_slash) return (this.params = {}), (this.path = ""), !0;
						if (this.regexp.fast_star)
							return (this.params = { 0: decode_param(e) }), (this.path = e), !0;
						match = this.regexp.exec(e);
					}
					if (!match) return (this.params = void 0), (this.path = void 0), !1;
					(this.params = {}), (this.path = match[0]);
					for (var t = this.keys, n = this.params, a = 1; a < match.length; a++) {
						var i = t[a - 1].name,
							o = decode_param(match[a]);
						(void 0 === o && r.call(n, i)) || (n[i] = o);
					}
					return !0;
				});
		},
		function (e, t, n) {
			"use strict";
			var a = n(32),
				i = n(19),
				r = n(38);
			e.exports = function query(e) {
				var t = a({}, e),
					n = r.parse;
				return (
					"function" == typeof e && ((n = e), (t = void 0)),
					void 0 !== t && void 0 === t.allowPrototypes && (t.allowPrototypes = !0),
					function query(e, a, r) {
						if (!e.query) {
							var o = i(e).query;
							e.query = n(o, t);
						}
						r();
					}
				);
			};
		},
		function (e, t, n) {
			"use strict";
			(e.exports = function contentDisposition(e, t) {
				var n = t || {},
					i = n.type || "attachment",
					r = (function createparams(e, t) {
						if (void 0 === e) return;
						var n = {};
						if ("string" != typeof e) throw new TypeError("filename must be a string");
						void 0 === t && (t = !0);
						if ("string" != typeof t && "boolean" != typeof t)
							throw new TypeError("fallback must be a string or boolean");
						if ("string" == typeof t && c.test(t))
							throw new TypeError("fallback must be ISO-8859-1 string");
						var i = a(e),
							r = d.test(i),
							s = "string" != typeof t ? t && getlatin1(i) : a(t),
							p = "string" == typeof s && s !== i;
						(p || !r || o.test(i)) && (n["filename*"] = i);
						(r || p) && (n.filename = p ? s : i);
						return n;
					})(e, n.fallback);
				return (function format(e) {
					var t = e.parameters,
						n = e.type;
					if (!n || "string" != typeof n || !m.test(n))
						throw new TypeError("invalid type");
					var a = String(n).toLowerCase();
					if (t && "object" == typeof t)
						for (var i, r = Object.keys(t).sort(), o = 0; o < r.length; o++) {
							var s = "*" === (i = r[o]).substr(-1) ? ustring(t[i]) : qstring(t[i]);
							a += "; " + i + "=" + s;
						}
					return a;
				})(new ContentDisposition(i, r));
			}),
				(e.exports.parse = function parse(e) {
					if (!e || "string" != typeof e)
						throw new TypeError("argument string is required");
					var t = h.exec(e);
					if (!t) throw new TypeError("invalid type format");
					var n,
						a,
						i = t[0].length,
						r = t[1].toLowerCase(),
						o = [],
						s = {};
					i = u.lastIndex = ";" === t[0].substr(-1) ? i - 1 : i;
					for (; (t = u.exec(e)); ) {
						if (t.index !== i) throw new TypeError("invalid parameter format");
						if (
							((i += t[0].length),
							(n = t[1].toLowerCase()),
							(a = t[2]),
							-1 !== o.indexOf(n))
						)
							throw new TypeError("invalid duplicate parameter");
						o.push(n),
							n.indexOf("*") + 1 !== n.length
								? "string" != typeof s[n] &&
								  ('"' === a[0] && (a = a.substr(1, a.length - 2).replace(p, "$1")),
								  (s[n] = a))
								: ((n = n.slice(0, -1)), (a = decodefield(a)), (s[n] = a));
					}
					if (-1 !== i && i !== e.length) throw new TypeError("invalid parameter format");
					return new ContentDisposition(r, s);
				});
			var a = n(1).basename,
				i = n(40).Buffer,
				r = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g,
				o = /%[0-9A-Fa-f]{2}/,
				s = /%([0-9A-Fa-f]{2})/g,
				c = /[^\x20-\x7e\xa0-\xff]/g,
				p = /\\([\u0000-\u007f])/g,
				l = /([\\"])/g,
				u = /;[\x09\x20]*([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*=[\x09\x20]*("(?:[\x20!\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*/g,
				d = /^[\x20-\x7e\x80-\xff]+$/,
				m = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/,
				f = /^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+.^_`|~-])+)$/,
				h = /^([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*(?:$|;)/;
			function decodefield(e) {
				var t = f.exec(e);
				if (!t) throw new TypeError("invalid extended field value");
				var n,
					a = t[1].toLowerCase(),
					r = t[2].replace(s, pdecode);
				switch (a) {
					case "iso-8859-1":
						n = getlatin1(r);
						break;
					case "utf-8":
						n = i.from(r, "binary").toString("utf8");
						break;
					default:
						throw new TypeError("unsupported charset in extended field");
				}
				return n;
			}
			function getlatin1(e) {
				return String(e).replace(c, "?");
			}
			function pdecode(e, t) {
				return String.fromCharCode(parseInt(t, 16));
			}
			function pencode(e) {
				return "%" + String(e).charCodeAt(0).toString(16).toUpperCase();
			}
			function qstring(e) {
				return '"' + String(e).replace(l, "\\$1") + '"';
			}
			function ustring(e) {
				var t = String(e);
				return "UTF-8''" + encodeURIComponent(t).replace(r, pencode);
			}
			function ContentDisposition(e, t) {
				(this.type = e), (this.parameters = t);
			}
		},
		function (e, t, n) {
			var a;
			function createDebug(e) {
				function debug() {
					if (debug.enabled) {
						var e = debug,
							n = +new Date(),
							i = n - (a || n);
						(e.diff = i), (e.prev = a), (e.curr = n), (a = n);
						for (var r = new Array(arguments.length), o = 0; o < r.length; o++)
							r[o] = arguments[o];
						(r[0] = t.coerce(r[0])), "string" != typeof r[0] && r.unshift("%O");
						var s = 0;
						(r[0] = r[0].replace(/%([a-zA-Z%])/g, function (n, a) {
							if ("%%" === n) return n;
							s++;
							var i = t.formatters[a];
							if ("function" == typeof i) {
								var o = r[s];
								(n = i.call(e, o)), r.splice(s, 1), s--;
							}
							return n;
						})),
							t.formatArgs.call(e, r);
						var c = debug.log || t.log || console.log.bind(console);
						c.apply(e, r);
					}
				}
				return (
					(debug.namespace = e),
					(debug.enabled = t.enabled(e)),
					(debug.useColors = t.useColors()),
					(debug.color = (function selectColor(e) {
						var n,
							a = 0;
						for (n in e) (a = (a << 5) - a + e.charCodeAt(n)), (a |= 0);
						return t.colors[Math.abs(a) % t.colors.length];
					})(e)),
					"function" == typeof t.init && t.init(debug),
					debug
				);
			}
			((t = e.exports = createDebug.debug = createDebug.default = createDebug).coerce = function coerce(
				e
			) {
				return e instanceof Error ? e.stack || e.message : e;
			}),
				(t.disable = function disable() {
					t.enable("");
				}),
				(t.enable = function enable(e) {
					t.save(e), (t.names = []), (t.skips = []);
					for (
						var n = ("string" == typeof e ? e : "").split(/[\s,]+/),
							a = n.length,
							i = 0;
						i < a;
						i++
					)
						n[i] &&
							("-" === (e = n[i].replace(/\*/g, ".*?"))[0]
								? t.skips.push(new RegExp("^" + e.substr(1) + "$"))
								: t.names.push(new RegExp("^" + e + "$")));
				}),
				(t.enabled = function enabled(e) {
					var n, a;
					for (n = 0, a = t.skips.length; n < a; n++) if (t.skips[n].test(e)) return !1;
					for (n = 0, a = t.names.length; n < a; n++) if (t.names[n].test(e)) return !0;
					return !1;
				}),
				(t.humanize = n(144)),
				(t.names = []),
				(t.skips = []),
				(t.formatters = {});
		},
		function (e, t, n) {
			"use strict";
			e.exports = function etag(e, t) {
				if (null == e) throw new TypeError("argument entity is required");
				var n = (function isstats(e) {
						if ("function" == typeof i && e instanceof i) return !0;
						return (
							e &&
							"object" == typeof e &&
							"ctime" in e &&
							"[object Date]" === r.call(e.ctime) &&
							"mtime" in e &&
							"[object Date]" === r.call(e.mtime) &&
							"ino" in e &&
							"number" == typeof e.ino &&
							"size" in e &&
							"number" == typeof e.size
						);
					})(e),
					o = t && "boolean" == typeof t.weak ? t.weak : n;
				if (!n && "string" != typeof e && !Buffer.isBuffer(e))
					throw new TypeError("argument entity must be string, Buffer, or fs.Stats");
				var s = n
					? (function stattag(e) {
							var t = e.mtime.getTime().toString(16);
							return '"' + e.size.toString(16) + "-" + t + '"';
					  })(e)
					: (function entitytag(e) {
							if (0 === e.length) return '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"';
							var t = a
								.createHash("sha1")
								.update(e, "utf8")
								.digest("base64")
								.substring(0, 27);
							return (
								'"' +
								("string" == typeof e
									? Buffer.byteLength(e, "utf8")
									: e.length
								).toString(16) +
								"-" +
								t +
								'"'
							);
					  })(e);
				return o ? "W/" + s : s;
			};
			var a = n(9),
				i = n(2).Stats,
				r = Object.prototype.toString;
		},
		function (e, t, n) {
			"use strict";
			var a = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
			function parseHttpDate(e) {
				var t = e && Date.parse(e);
				return "number" == typeof t ? t : NaN;
			}
			e.exports = function fresh(e, t) {
				var n = e["if-modified-since"],
					i = e["if-none-match"];
				if (!n && !i) return !1;
				var r = e["cache-control"];
				if (r && a.test(r)) return !1;
				if (i && "*" !== i) {
					var o = t.etag;
					if (!o) return !1;
					for (
						var s = !0,
							c = (function parseTokenList(e) {
								for (var t = 0, n = [], a = 0, i = 0, r = e.length; i < r; i++)
									switch (e.charCodeAt(i)) {
										case 32:
											a === t && (a = t = i + 1);
											break;
										case 44:
											n.push(e.substring(a, t)), (a = t = i + 1);
											break;
										default:
											t = i + 1;
									}
								return n.push(e.substring(a, t)), n;
							})(i),
							p = 0;
						p < c.length;
						p++
					) {
						var l = c[p];
						if (l === o || l === "W/" + o || "W/" + l === o) {
							s = !1;
							break;
						}
					}
					if (s) return !1;
				}
				if (n) {
					var u = t["last-modified"];
					if (!(u && parseHttpDate(u) <= parseHttpDate(n))) return !1;
				}
				return !0;
			};
		},
		function (e, t, n) {
			"use strict";
			function mapWithIndex(e, t) {
				return { start: e.start, end: e.end, index: t };
			}
			function mapWithoutIndex(e) {
				return { start: e.start, end: e.end };
			}
			function sortByRangeIndex(e, t) {
				return e.index - t.index;
			}
			function sortByRangeStart(e, t) {
				return e.start - t.start;
			}
			e.exports = function rangeParser(e, t, n) {
				if ("string" != typeof t) throw new TypeError("argument str must be a string");
				var a = t.indexOf("=");
				if (-1 === a) return -2;
				var i = t.slice(a + 1).split(","),
					r = [];
				r.type = t.slice(0, a);
				for (var o = 0; o < i.length; o++) {
					var s = i[o].split("-"),
						c = parseInt(s[0], 10),
						p = parseInt(s[1], 10);
					isNaN(c) ? ((c = e - p), (p = e - 1)) : isNaN(p) && (p = e - 1),
						p > e - 1 && (p = e - 1),
						isNaN(c) || isNaN(p) || c > p || c < 0 || r.push({ start: c, end: p });
				}
				if (r.length < 1) return -1;
				return n && n.combine
					? (function combineRanges(e) {
							for (
								var t = e.map(mapWithIndex).sort(sortByRangeStart), n = 0, a = 1;
								a < t.length;
								a++
							) {
								var i = t[a],
									r = t[n];
								i.start > r.end + 1
									? (t[++n] = i)
									: i.end > r.end &&
									  ((r.end = i.end), (r.index = Math.min(r.index, i.index)));
							}
							t.length = n + 1;
							var o = t.sort(sortByRangeIndex).map(mapWithoutIndex);
							return (o.type = e.type), o;
					  })(r)
					: r;
			};
		},
		function (e, t, n) {
			"use strict";
			(e.exports = function proxyaddr(e, t) {
				if (!e) throw new TypeError("req argument is required");
				if (!t) throw new TypeError("trust argument is required");
				var n = alladdrs(e, t);
				return n[n.length - 1];
			}),
				(e.exports.all = alladdrs),
				(e.exports.compile = compile);
			var a = n(150),
				i = n(151),
				r = /^[0-9]+$/,
				o = i.isValid,
				s = i.parse,
				c = {
					linklocal: ["169.254.0.0/16", "fe80::/10"],
					loopback: ["127.0.0.1/8", "::1/128"],
					uniquelocal: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "fc00::/7"],
				};
			function alladdrs(e, t) {
				var n = a(e);
				if (!t) return n;
				"function" != typeof t && (t = compile(t));
				for (var i = 0; i < n.length - 1; i++) t(n[i], i) || (n.length = i + 1);
				return n;
			}
			function compile(e) {
				if (!e) throw new TypeError("argument is required");
				var t;
				if ("string" == typeof e) t = [e];
				else {
					if (!Array.isArray(e)) throw new TypeError("unsupported trust argument");
					t = e.slice();
				}
				for (var n = 0; n < t.length; n++)
					(e = t[n]),
						Object.prototype.hasOwnProperty.call(c, e) &&
							((e = c[e]), t.splice.apply(t, [n, 1].concat(e)), (n += e.length - 1));
				return (function compileTrust(e) {
					var t = e.length;
					return 0 === t
						? trustNone
						: 1 === t
						? (function trustSingle(e) {
								var t = e[0],
									n = t.kind(),
									a = "ipv4" === n,
									i = e[1];
								return function trust(e) {
									if (!o(e)) return !1;
									var r = s(e);
									if (r.kind() !== n) {
										if (a && !r.isIPv4MappedAddress()) return !1;
										r = a ? r.toIPv4Address() : r.toIPv4MappedAddress();
									}
									return r.match(t, i);
								};
						  })(e[0])
						: (function trustMulti(e) {
								return function trust(t) {
									if (!o(t)) return !1;
									for (var n, a = s(t), i = a.kind(), r = 0; r < e.length; r++) {
										var c = e[r],
											p = c[0],
											l = p.kind(),
											u = c[1],
											d = a;
										if (i !== l) {
											if ("ipv4" === l && !a.isIPv4MappedAddress()) continue;
											n ||
												(n =
													"ipv4" === l
														? a.toIPv4Address()
														: a.toIPv4MappedAddress()),
												(d = n);
										}
										if (d.match(p, u)) return !0;
									}
									return !1;
								};
						  })(e);
				})(
					(function compileRangeSubnets(e) {
						for (var t = new Array(e.length), n = 0; n < e.length; n++)
							t[n] = parseipNotation(e[n]);
						return t;
					})(t)
				);
			}
			function parseipNotation(e) {
				var t = e.lastIndexOf("/"),
					n = -1 !== t ? e.substring(0, t) : e;
				if (!o(n)) throw new TypeError("invalid IP address: " + n);
				var a = s(n);
				-1 === t &&
					"ipv6" === a.kind() &&
					a.isIPv4MappedAddress() &&
					(a = a.toIPv4Address());
				var i = "ipv6" === a.kind() ? 128 : 32,
					c = -1 !== t ? e.substring(t + 1, e.length) : null;
				if (
					(c =
						null === c
							? i
							: r.test(c)
							? parseInt(c, 10)
							: "ipv4" === a.kind() && o(c)
							? (function parseNetmask(e) {
									var t = s(e);
									return "ipv4" === t.kind()
										? t.prefixLengthFromSubnetMask()
										: null;
							  })(c)
							: null) <= 0 ||
					c > i
				)
					throw new TypeError("invalid range on address: " + e);
				return [a, c];
			}
			function trustNone() {
				return !1;
			}
		},
		function (e, t, n) {
			"use strict";
			(e.exports = function vary(e, t) {
				if (!e || !e.getHeader || !e.setHeader)
					throw new TypeError("res argument is required");
				var n = e.getHeader("Vary") || "",
					a = Array.isArray(n) ? n.join(", ") : String(n);
				(n = append(a, t)) && e.setHeader("Vary", n);
			}),
				(e.exports.append = append);
			var a = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
			function append(e, t) {
				if ("string" != typeof e) throw new TypeError("header argument is required");
				if (!t) throw new TypeError("field argument is required");
				for (var n = Array.isArray(t) ? t : parse(String(t)), i = 0; i < n.length; i++)
					if (!a.test(n[i]))
						throw new TypeError("field argument contains an invalid header name");
				if ("*" === e) return e;
				var r = e,
					o = parse(e.toLowerCase());
				if (-1 !== n.indexOf("*") || -1 !== o.indexOf("*")) return "*";
				for (var s = 0; s < n.length; s++) {
					var c = n[s].toLowerCase();
					-1 === o.indexOf(c) && (o.push(c), (r = r ? r + ", " + n[s] : n[s]));
				}
				return r;
			}
			function parse(e) {
				for (var t = 0, n = [], a = 0, i = 0, r = e.length; i < r; i++)
					switch (e.charCodeAt(i)) {
						case 32:
							a === t && (a = t = i + 1);
							break;
						case 44:
							n.push(e.substring(a, t)), (a = t = i + 1);
							break;
						default:
							t = i + 1;
					}
				return n.push(e.substring(a, t)), n;
			}
		},
		function (e, t, n) {
			"use strict";
			const a = n(21),
				i = n(36),
				r = n(4),
				o = n(11),
				s = n(165),
				{ randomBytes: c, createHash: p } = n(9),
				{ URL: l } = n(3),
				u = n(33),
				d = n(69),
				m = n(71),
				{
					BINARY_TYPES: f,
					EMPTY_BUFFER: h,
					GUID: v,
					kStatusCode: g,
					kWebSocket: b,
					NOOP: x,
				} = n(15),
				{ addEventListener: y, removeEventListener: w } = n(167),
				{ format: _, parse: k } = n(72),
				{ toBuffer: E } = n(34),
				S = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"],
				T = [8, 13];
			class WebSocket extends a {
				constructor(e, t, n) {
					super(),
						(this._binaryType = f[0]),
						(this._closeCode = 1006),
						(this._closeFrameReceived = !1),
						(this._closeFrameSent = !1),
						(this._closeMessage = ""),
						(this._closeTimer = null),
						(this._extensions = {}),
						(this._protocol = ""),
						(this._readyState = WebSocket.CONNECTING),
						(this._receiver = null),
						(this._sender = null),
						(this._socket = null),
						null !== e
							? ((this._bufferedAmount = 0),
							  (this._isServer = !1),
							  (this._redirects = 0),
							  Array.isArray(t)
									? (t = t.join(", "))
									: "object" == typeof t && null !== t && ((n = t), (t = void 0)),
							  (function initAsClient(e, t, n, a) {
									const o = {
										protocolVersion: T[1],
										maxPayload: 104857600,
										perMessageDeflate: !0,
										followRedirects: !1,
										maxRedirects: 10,
										...a,
										createConnection: void 0,
										socketPath: void 0,
										hostname: void 0,
										protocol: void 0,
										timeout: void 0,
										method: void 0,
										host: void 0,
										path: void 0,
										port: void 0,
									};
									if (!T.includes(o.protocolVersion))
										throw new RangeError(
											`Unsupported protocol version: ${
												o.protocolVersion
											} (supported versions: ${T.join(", ")})`
										);
									let s;
									t instanceof l
										? ((s = t), (e._url = t.href))
										: ((s = new l(t)), (e._url = t));
									const d = "ws+unix:" === s.protocol;
									if (!(s.host || (d && s.pathname)))
										throw new Error("Invalid URL: " + e.url);
									const m = "wss:" === s.protocol || "https:" === s.protocol,
										f = m ? 443 : 80,
										h = c(16).toString("base64"),
										g = m ? i.get : r.get;
									let b;
									(o.createConnection = m ? tlsConnect : netConnect),
										(o.defaultPort = o.defaultPort || f),
										(o.port = s.port || f),
										(o.host = s.hostname.startsWith("[")
											? s.hostname.slice(1, -1)
											: s.hostname),
										(o.headers = {
											"Sec-WebSocket-Version": o.protocolVersion,
											"Sec-WebSocket-Key": h,
											Connection: "Upgrade",
											Upgrade: "websocket",
											...o.headers,
										}),
										(o.path = s.pathname + s.search),
										(o.timeout = o.handshakeTimeout),
										o.perMessageDeflate &&
											((b = new u(
												!0 !== o.perMessageDeflate
													? o.perMessageDeflate
													: {},
												!1,
												o.maxPayload
											)),
											(o.headers["Sec-WebSocket-Extensions"] = _({
												[u.extensionName]: b.offer(),
											})));
									n && (o.headers["Sec-WebSocket-Protocol"] = n);
									o.origin &&
										(o.protocolVersion < 13
											? (o.headers["Sec-WebSocket-Origin"] = o.origin)
											: (o.headers.Origin = o.origin));
									(s.username || s.password) &&
										(o.auth = `${s.username}:${s.password}`);
									if (d) {
										const e = o.path.split(":");
										(o.socketPath = e[0]), (o.path = e[1]);
									}
									let x = (e._req = g(o));
									o.timeout &&
										x.on("timeout", () => {
											abortHandshake(e, x, "Opening handshake has timed out");
										});
									x.on("error", (t) => {
										null === x ||
											x.aborted ||
											((x = e._req = null),
											(e._readyState = WebSocket.CLOSING),
											e.emit("error", t),
											e.emitClose());
									}),
										x.on("response", (i) => {
											const r = i.headers.location,
												s = i.statusCode;
											if (r && o.followRedirects && s >= 300 && s < 400) {
												if (++e._redirects > o.maxRedirects)
													return void abortHandshake(
														e,
														x,
														"Maximum redirects exceeded"
													);
												x.abort();
												const i = new l(r, t);
												initAsClient(e, i, n, a);
											} else
												e.emit("unexpected-response", x, i) ||
													abortHandshake(
														e,
														x,
														"Unexpected server response: " +
															i.statusCode
													);
										}),
										x.on("upgrade", (t, a, i) => {
											if (
												(e.emit("upgrade", t),
												e.readyState !== WebSocket.CONNECTING)
											)
												return;
											x = e._req = null;
											const r = p("sha1")
												.update(h + v)
												.digest("base64");
											if (t.headers["sec-websocket-accept"] !== r)
												return void abortHandshake(
													e,
													a,
													"Invalid Sec-WebSocket-Accept header"
												);
											const s = t.headers["sec-websocket-protocol"],
												c = (n || "").split(/, */);
											let l;
											if (
												(!n && s
													? (l =
															"Server sent a subprotocol but none was requested")
													: n && !s
													? (l = "Server sent no subprotocol")
													: s &&
													  !c.includes(s) &&
													  (l = "Server sent an invalid subprotocol"),
												l)
											)
												abortHandshake(e, a, l);
											else {
												if ((s && (e._protocol = s), b))
													try {
														const n = k(
															t.headers["sec-websocket-extensions"]
														);
														n[u.extensionName] &&
															(b.accept(n[u.extensionName]),
															(e._extensions[u.extensionName] = b));
													} catch (t) {
														return void abortHandshake(
															e,
															a,
															"Invalid Sec-WebSocket-Extensions header"
														);
													}
												e.setSocket(a, i, o.maxPayload);
											}
										});
							  })(this, e, t, n))
							: (this._isServer = !0);
				}
				get binaryType() {
					return this._binaryType;
				}
				set binaryType(e) {
					f.includes(e) &&
						((this._binaryType = e),
						this._receiver && (this._receiver._binaryType = e));
				}
				get bufferedAmount() {
					return this._socket
						? this._socket._writableState.length + this._sender._bufferedBytes
						: this._bufferedAmount;
				}
				get extensions() {
					return Object.keys(this._extensions).join();
				}
				get protocol() {
					return this._protocol;
				}
				get readyState() {
					return this._readyState;
				}
				get url() {
					return this._url;
				}
				setSocket(e, t, n) {
					const a = new d(this.binaryType, this._extensions, this._isServer, n);
					(this._sender = new m(e, this._extensions)),
						(this._receiver = a),
						(this._socket = e),
						(a[b] = this),
						(e[b] = this),
						a.on("conclude", receiverOnConclude),
						a.on("drain", receiverOnDrain),
						a.on("error", receiverOnError),
						a.on("message", receiverOnMessage),
						a.on("ping", receiverOnPing),
						a.on("pong", receiverOnPong),
						e.setTimeout(0),
						e.setNoDelay(),
						t.length > 0 && e.unshift(t),
						e.on("close", socketOnClose),
						e.on("data", socketOnData),
						e.on("end", socketOnEnd),
						e.on("error", socketOnError),
						(this._readyState = WebSocket.OPEN),
						this.emit("open");
				}
				emitClose() {
					if (!this._socket)
						return (
							(this._readyState = WebSocket.CLOSED),
							void this.emit("close", this._closeCode, this._closeMessage)
						);
					this._extensions[u.extensionName] &&
						this._extensions[u.extensionName].cleanup(),
						this._receiver.removeAllListeners(),
						(this._readyState = WebSocket.CLOSED),
						this.emit("close", this._closeCode, this._closeMessage);
				}
				close(e, t) {
					if (this.readyState !== WebSocket.CLOSED) {
						if (this.readyState === WebSocket.CONNECTING) {
							const e = "WebSocket was closed before the connection was established";
							return abortHandshake(this, this._req, e);
						}
						this.readyState !== WebSocket.CLOSING
							? ((this._readyState = WebSocket.CLOSING),
							  this._sender.close(e, t, !this._isServer, (e) => {
									e ||
										((this._closeFrameSent = !0),
										this._closeFrameReceived && this._socket.end());
							  }),
							  (this._closeTimer = setTimeout(
									this._socket.destroy.bind(this._socket),
									3e4
							  )))
							: this._closeFrameSent &&
							  this._closeFrameReceived &&
							  this._socket.end();
					}
				}
				ping(e, t, n) {
					if (this.readyState === WebSocket.CONNECTING)
						throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
					"function" == typeof e
						? ((n = e), (e = t = void 0))
						: "function" == typeof t && ((n = t), (t = void 0)),
						"number" == typeof e && (e = e.toString()),
						this.readyState === WebSocket.OPEN
							? (void 0 === t && (t = !this._isServer),
							  this._sender.ping(e || h, t, n))
							: sendAfterClose(this, e, n);
				}
				pong(e, t, n) {
					if (this.readyState === WebSocket.CONNECTING)
						throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
					"function" == typeof e
						? ((n = e), (e = t = void 0))
						: "function" == typeof t && ((n = t), (t = void 0)),
						"number" == typeof e && (e = e.toString()),
						this.readyState === WebSocket.OPEN
							? (void 0 === t && (t = !this._isServer),
							  this._sender.pong(e || h, t, n))
							: sendAfterClose(this, e, n);
				}
				send(e, t, n) {
					if (this.readyState === WebSocket.CONNECTING)
						throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
					if (
						("function" == typeof t && ((n = t), (t = {})),
						"number" == typeof e && (e = e.toString()),
						this.readyState !== WebSocket.OPEN)
					)
						return void sendAfterClose(this, e, n);
					const a = {
						binary: "string" != typeof e,
						mask: !this._isServer,
						compress: !0,
						fin: !0,
						...t,
					};
					this._extensions[u.extensionName] || (a.compress = !1),
						this._sender.send(e || h, a, n);
				}
				terminate() {
					if (this.readyState !== WebSocket.CLOSED) {
						if (this.readyState === WebSocket.CONNECTING) {
							const e = "WebSocket was closed before the connection was established";
							return abortHandshake(this, this._req, e);
						}
						this._socket &&
							((this._readyState = WebSocket.CLOSING), this._socket.destroy());
					}
				}
			}
			function netConnect(e) {
				return (e.path = e.socketPath), o.connect(e);
			}
			function tlsConnect(e) {
				return (
					(e.path = void 0),
					e.servername ||
						"" === e.servername ||
						(e.servername = o.isIP(e.host) ? "" : e.host),
					s.connect(e)
				);
			}
			function abortHandshake(e, t, n) {
				e._readyState = WebSocket.CLOSING;
				const a = new Error(n);
				Error.captureStackTrace(a, abortHandshake),
					t.setHeader
						? (t.abort(),
						  t.socket && !t.socket.destroyed && t.socket.destroy(),
						  t.once("abort", e.emitClose.bind(e)),
						  e.emit("error", a))
						: (t.destroy(a),
						  t.once("error", e.emit.bind(e, "error")),
						  t.once("close", e.emitClose.bind(e)));
			}
			function sendAfterClose(e, t, n) {
				if (t) {
					const n = E(t).length;
					e._socket ? (e._sender._bufferedBytes += n) : (e._bufferedAmount += n);
				}
				if (n) {
					n(
						new Error(
							`WebSocket is not open: readyState ${e.readyState} (${S[e.readyState]})`
						)
					);
				}
			}
			function receiverOnConclude(e, t) {
				const n = this[b];
				n._socket.removeListener("data", socketOnData),
					n._socket.resume(),
					(n._closeFrameReceived = !0),
					(n._closeMessage = t),
					(n._closeCode = e),
					1005 === e ? n.close() : n.close(e, t);
			}
			function receiverOnDrain() {
				this[b]._socket.resume();
			}
			function receiverOnError(e) {
				const t = this[b];
				t._socket.removeListener("data", socketOnData),
					(t._readyState = WebSocket.CLOSING),
					(t._closeCode = e[g]),
					t.emit("error", e),
					t._socket.destroy();
			}
			function receiverOnFinish() {
				this[b].emitClose();
			}
			function receiverOnMessage(e) {
				this[b].emit("message", e);
			}
			function receiverOnPing(e) {
				const t = this[b];
				t.pong(e, !t._isServer, x), t.emit("ping", e);
			}
			function receiverOnPong(e) {
				this[b].emit("pong", e);
			}
			function socketOnClose() {
				const e = this[b];
				this.removeListener("close", socketOnClose),
					this.removeListener("end", socketOnEnd),
					(e._readyState = WebSocket.CLOSING),
					e._socket.read(),
					e._receiver.end(),
					this.removeListener("data", socketOnData),
					(this[b] = void 0),
					clearTimeout(e._closeTimer),
					e._receiver._writableState.finished || e._receiver._writableState.errorEmitted
						? e.emitClose()
						: (e._receiver.on("error", receiverOnFinish),
						  e._receiver.on("finish", receiverOnFinish));
			}
			function socketOnData(e) {
				this[b]._receiver.write(e) || this.pause();
			}
			function socketOnEnd() {
				const e = this[b];
				(e._readyState = WebSocket.CLOSING), e._receiver.end(), this.end();
			}
			function socketOnError() {
				const e = this[b];
				this.removeListener("error", socketOnError),
					this.on("error", x),
					e && ((e._readyState = WebSocket.CLOSING), this.destroy());
			}
			S.forEach((e, t) => {
				const n = { enumerable: !0, value: t };
				Object.defineProperty(WebSocket.prototype, e, n),
					Object.defineProperty(WebSocket, e, n);
			}),
				[
					"binaryType",
					"bufferedAmount",
					"extensions",
					"protocol",
					"readyState",
					"url",
				].forEach((e) => {
					Object.defineProperty(WebSocket.prototype, e, { enumerable: !0 });
				}),
				["open", "error", "close", "message"].forEach((e) => {
					Object.defineProperty(WebSocket.prototype, "on" + e, {
						configurable: !0,
						enumerable: !0,
						get() {
							const t = this.listeners(e);
							for (let e = 0; e < t.length; e++)
								if (t[e]._listener) return t[e]._listener;
						},
						set(t) {
							const n = this.listeners(e);
							for (let t = 0; t < n.length; t++)
								n[t]._listener && this.removeListener(e, n[t]);
							this.addEventListener(e, t);
						},
					});
				}),
				(WebSocket.prototype.addEventListener = y),
				(WebSocket.prototype.removeEventListener = w),
				(e.exports = WebSocket);
		},
		function (e, t, n) {
			"use strict";
			const { Writable: a } = n(0),
				i = n(33),
				{ BINARY_TYPES: r, EMPTY_BUFFER: o, kStatusCode: s, kWebSocket: c } = n(15),
				{ concat: p, toArrayBuffer: l, unmask: u } = n(34),
				{ isValidStatusCode: d, isValidUTF8: m } = n(70);
			function error(e, t, n, a) {
				const i = new e(n ? "Invalid WebSocket frame: " + t : t);
				return Error.captureStackTrace(i, error), (i[s] = a), i;
			}
			e.exports = class Receiver extends a {
				constructor(e, t, n, a) {
					super(),
						(this._binaryType = e || r[0]),
						(this[c] = void 0),
						(this._extensions = t || {}),
						(this._isServer = !!n),
						(this._maxPayload = 0 | a),
						(this._bufferedBytes = 0),
						(this._buffers = []),
						(this._compressed = !1),
						(this._payloadLength = 0),
						(this._mask = void 0),
						(this._fragmented = 0),
						(this._masked = !1),
						(this._fin = !1),
						(this._opcode = 0),
						(this._totalPayloadLength = 0),
						(this._messageLength = 0),
						(this._fragments = []),
						(this._state = 0),
						(this._loop = !1);
				}
				_write(e, t, n) {
					if (8 === this._opcode && 0 == this._state) return n();
					(this._bufferedBytes += e.length), this._buffers.push(e), this.startLoop(n);
				}
				consume(e) {
					if (((this._bufferedBytes -= e), e === this._buffers[0].length))
						return this._buffers.shift();
					if (e < this._buffers[0].length) {
						const t = this._buffers[0];
						return (this._buffers[0] = t.slice(e)), t.slice(0, e);
					}
					const t = Buffer.allocUnsafe(e);
					do {
						const n = this._buffers[0],
							a = t.length - e;
						e >= n.length
							? t.set(this._buffers.shift(), a)
							: (t.set(new Uint8Array(n.buffer, n.byteOffset, e), a),
							  (this._buffers[0] = n.slice(e))),
							(e -= n.length);
					} while (e > 0);
					return t;
				}
				startLoop(e) {
					let t;
					this._loop = !0;
					do {
						switch (this._state) {
							case 0:
								t = this.getInfo();
								break;
							case 1:
								t = this.getPayloadLength16();
								break;
							case 2:
								t = this.getPayloadLength64();
								break;
							case 3:
								this.getMask();
								break;
							case 4:
								t = this.getData(e);
								break;
							default:
								return void (this._loop = !1);
						}
					} while (this._loop);
					e(t);
				}
				getInfo() {
					if (this._bufferedBytes < 2) return void (this._loop = !1);
					const e = this.consume(2);
					if (0 != (48 & e[0]))
						return (
							(this._loop = !1),
							error(RangeError, "RSV2 and RSV3 must be clear", !0, 1002)
						);
					const t = 64 == (64 & e[0]);
					if (t && !this._extensions[i.extensionName])
						return (this._loop = !1), error(RangeError, "RSV1 must be clear", !0, 1002);
					if (
						((this._fin = 128 == (128 & e[0])),
						(this._opcode = 15 & e[0]),
						(this._payloadLength = 127 & e[1]),
						0 === this._opcode)
					) {
						if (t)
							return (
								(this._loop = !1), error(RangeError, "RSV1 must be clear", !0, 1002)
							);
						if (!this._fragmented)
							return (
								(this._loop = !1), error(RangeError, "invalid opcode 0", !0, 1002)
							);
						this._opcode = this._fragmented;
					} else if (1 === this._opcode || 2 === this._opcode) {
						if (this._fragmented)
							return (
								(this._loop = !1),
								error(RangeError, "invalid opcode " + this._opcode, !0, 1002)
							);
						this._compressed = t;
					} else {
						if (!(this._opcode > 7 && this._opcode < 11))
							return (
								(this._loop = !1),
								error(RangeError, "invalid opcode " + this._opcode, !0, 1002)
							);
						if (!this._fin)
							return (
								(this._loop = !1), error(RangeError, "FIN must be set", !0, 1002)
							);
						if (t)
							return (
								(this._loop = !1), error(RangeError, "RSV1 must be clear", !0, 1002)
							);
						if (this._payloadLength > 125)
							return (
								(this._loop = !1),
								error(
									RangeError,
									"invalid payload length " + this._payloadLength,
									!0,
									1002
								)
							);
					}
					if (
						(this._fin || this._fragmented || (this._fragmented = this._opcode),
						(this._masked = 128 == (128 & e[1])),
						this._isServer)
					) {
						if (!this._masked)
							return (
								(this._loop = !1), error(RangeError, "MASK must be set", !0, 1002)
							);
					} else if (this._masked)
						return (this._loop = !1), error(RangeError, "MASK must be clear", !0, 1002);
					if (126 === this._payloadLength) this._state = 1;
					else {
						if (127 !== this._payloadLength) return this.haveLength();
						this._state = 2;
					}
				}
				getPayloadLength16() {
					if (!(this._bufferedBytes < 2))
						return (
							(this._payloadLength = this.consume(2).readUInt16BE(0)),
							this.haveLength()
						);
					this._loop = !1;
				}
				getPayloadLength64() {
					if (this._bufferedBytes < 8) return void (this._loop = !1);
					const e = this.consume(8),
						t = e.readUInt32BE(0);
					return t > Math.pow(2, 21) - 1
						? ((this._loop = !1),
						  error(
								RangeError,
								"Unsupported WebSocket frame: payload length > 2^53 - 1",
								!1,
								1009
						  ))
						: ((this._payloadLength = t * Math.pow(2, 32) + e.readUInt32BE(4)),
						  this.haveLength());
				}
				haveLength() {
					if (
						this._payloadLength &&
						this._opcode < 8 &&
						((this._totalPayloadLength += this._payloadLength),
						this._totalPayloadLength > this._maxPayload && this._maxPayload > 0)
					)
						return (
							(this._loop = !1),
							error(RangeError, "Max payload size exceeded", !1, 1009)
						);
					this._masked ? (this._state = 3) : (this._state = 4);
				}
				getMask() {
					this._bufferedBytes < 4
						? (this._loop = !1)
						: ((this._mask = this.consume(4)), (this._state = 4));
				}
				getData(e) {
					let t = o;
					if (this._payloadLength) {
						if (this._bufferedBytes < this._payloadLength)
							return void (this._loop = !1);
						(t = this.consume(this._payloadLength)), this._masked && u(t, this._mask);
					}
					return this._opcode > 7
						? this.controlMessage(t)
						: this._compressed
						? ((this._state = 5), void this.decompress(t, e))
						: (t.length &&
								((this._messageLength = this._totalPayloadLength),
								this._fragments.push(t)),
						  this.dataMessage());
				}
				decompress(e, t) {
					this._extensions[i.extensionName].decompress(e, this._fin, (e, n) => {
						if (e) return t(e);
						if (n.length) {
							if (
								((this._messageLength += n.length),
								this._messageLength > this._maxPayload && this._maxPayload > 0)
							)
								return t(error(RangeError, "Max payload size exceeded", !1, 1009));
							this._fragments.push(n);
						}
						const a = this.dataMessage();
						if (a) return t(a);
						this.startLoop(t);
					});
				}
				dataMessage() {
					if (this._fin) {
						const e = this._messageLength,
							t = this._fragments;
						if (
							((this._totalPayloadLength = 0),
							(this._messageLength = 0),
							(this._fragmented = 0),
							(this._fragments = []),
							2 === this._opcode)
						) {
							let n;
							(n =
								"nodebuffer" === this._binaryType
									? p(t, e)
									: "arraybuffer" === this._binaryType
									? l(p(t, e))
									: t),
								this.emit("message", n);
						} else {
							const n = p(t, e);
							if (!m(n))
								return (
									(this._loop = !1),
									error(Error, "invalid UTF-8 sequence", !0, 1007)
								);
							this.emit("message", n.toString());
						}
					}
					this._state = 0;
				}
				controlMessage(e) {
					if (8 === this._opcode)
						if (((this._loop = !1), 0 === e.length))
							this.emit("conclude", 1005, ""), this.end();
						else {
							if (1 === e.length)
								return error(RangeError, "invalid payload length 1", !0, 1002);
							{
								const t = e.readUInt16BE(0);
								if (!d(t))
									return error(RangeError, "invalid status code " + t, !0, 1002);
								const n = e.slice(2);
								if (!m(n)) return error(Error, "invalid UTF-8 sequence", !0, 1007);
								this.emit("conclude", t, n.toString()), this.end();
							}
						}
					else 9 === this._opcode ? this.emit("ping", e) : this.emit("pong", e);
					this._state = 0;
				}
			};
		},
		function (e, t, n) {
			"use strict";
			function isValidStatusCode(e) {
				return (
					(e >= 1e3 && e <= 1014 && 1004 !== e && 1005 !== e && 1006 !== e) ||
					(e >= 3e3 && e <= 4999)
				);
			}
			function _isValidUTF8(e) {
				const t = e.length;
				let n = 0;
				for (; n < t; )
					if (e[n] < 128) n++;
					else if (192 == (224 & e[n])) {
						if (n + 1 === t || 128 != (192 & e[n + 1]) || 192 == (254 & e[n]))
							return !1;
						n += 2;
					} else if (224 == (240 & e[n])) {
						if (
							n + 2 >= t ||
							128 != (192 & e[n + 1]) ||
							128 != (192 & e[n + 2]) ||
							(224 === e[n] && 128 == (224 & e[n + 1])) ||
							(237 === e[n] && 160 == (224 & e[n + 1]))
						)
							return !1;
						n += 3;
					} else {
						if (240 != (248 & e[n])) return !1;
						if (
							n + 3 >= t ||
							128 != (192 & e[n + 1]) ||
							128 != (192 & e[n + 2]) ||
							128 != (192 & e[n + 3]) ||
							(240 === e[n] && 128 == (240 & e[n + 1])) ||
							(244 === e[n] && e[n + 1] > 143) ||
							e[n] > 244
						)
							return !1;
						n += 4;
					}
				return !0;
			}
			try {
				let t = n(
					!(function webpackMissingModule() {
						var e = new Error("Cannot find module 'utf-8-validate'");
						throw ((e.code = "MODULE_NOT_FOUND"), e);
					})()
				);
			} catch (t) {
				e.exports = { isValidStatusCode: isValidStatusCode, isValidUTF8: _isValidUTF8 };
			}
		},
		function (e, t, n) {
			"use strict";
			const { randomFillSync: a } = n(9),
				i = n(33),
				{ EMPTY_BUFFER: r } = n(15),
				{ isValidStatusCode: o } = n(70),
				{ mask: s, toBuffer: c } = n(34),
				p = Buffer.alloc(4);
			class Sender {
				constructor(e, t) {
					(this._extensions = t || {}),
						(this._socket = e),
						(this._firstFragment = !0),
						(this._compress = !1),
						(this._bufferedBytes = 0),
						(this._deflating = !1),
						(this._queue = []);
				}
				static frame(e, t) {
					const n = t.mask && t.readOnly;
					let i = t.mask ? 6 : 2,
						r = e.length;
					e.length >= 65536
						? ((i += 8), (r = 127))
						: e.length > 125 && ((i += 2), (r = 126));
					const o = Buffer.allocUnsafe(n ? e.length + i : i);
					return (
						(o[0] = t.fin ? 128 | t.opcode : t.opcode),
						t.rsv1 && (o[0] |= 64),
						(o[1] = r),
						126 === r
							? o.writeUInt16BE(e.length, 2)
							: 127 === r && (o.writeUInt32BE(0, 2), o.writeUInt32BE(e.length, 6)),
						t.mask
							? (a(p, 0, 4),
							  (o[1] |= 128),
							  (o[i - 4] = p[0]),
							  (o[i - 3] = p[1]),
							  (o[i - 2] = p[2]),
							  (o[i - 1] = p[3]),
							  n
									? (s(e, p, o, i, e.length), [o])
									: (s(e, p, e, 0, e.length), [o, e]))
							: [o, e]
					);
				}
				close(e, t, n, a) {
					let i;
					if (void 0 === e) i = r;
					else {
						if ("number" != typeof e || !o(e))
							throw new TypeError("First argument must be a valid error code number");
						if (void 0 === t || "" === t)
							(i = Buffer.allocUnsafe(2)), i.writeUInt16BE(e, 0);
						else {
							const n = Buffer.byteLength(t);
							if (n > 123)
								throw new RangeError(
									"The message must not be greater than 123 bytes"
								);
							(i = Buffer.allocUnsafe(2 + n)), i.writeUInt16BE(e, 0), i.write(t, 2);
						}
					}
					this._deflating ? this.enqueue([this.doClose, i, n, a]) : this.doClose(i, n, a);
				}
				doClose(e, t, n) {
					this.sendFrame(
						Sender.frame(e, { fin: !0, rsv1: !1, opcode: 8, mask: t, readOnly: !1 }),
						n
					);
				}
				ping(e, t, n) {
					const a = c(e);
					if (a.length > 125)
						throw new RangeError("The data size must not be greater than 125 bytes");
					this._deflating
						? this.enqueue([this.doPing, a, t, c.readOnly, n])
						: this.doPing(a, t, c.readOnly, n);
				}
				doPing(e, t, n, a) {
					this.sendFrame(
						Sender.frame(e, { fin: !0, rsv1: !1, opcode: 9, mask: t, readOnly: n }),
						a
					);
				}
				pong(e, t, n) {
					const a = c(e);
					if (a.length > 125)
						throw new RangeError("The data size must not be greater than 125 bytes");
					this._deflating
						? this.enqueue([this.doPong, a, t, c.readOnly, n])
						: this.doPong(a, t, c.readOnly, n);
				}
				doPong(e, t, n, a) {
					this.sendFrame(
						Sender.frame(e, { fin: !0, rsv1: !1, opcode: 10, mask: t, readOnly: n }),
						a
					);
				}
				send(e, t, n) {
					const a = c(e),
						r = this._extensions[i.extensionName];
					let o = t.binary ? 2 : 1,
						s = t.compress;
					if (
						(this._firstFragment
							? ((this._firstFragment = !1),
							  s && r && (s = a.length >= r._threshold),
							  (this._compress = s))
							: ((s = !1), (o = 0)),
						t.fin && (this._firstFragment = !0),
						r)
					) {
						const e = {
							fin: t.fin,
							rsv1: s,
							opcode: o,
							mask: t.mask,
							readOnly: c.readOnly,
						};
						this._deflating
							? this.enqueue([this.dispatch, a, this._compress, e, n])
							: this.dispatch(a, this._compress, e, n);
					} else
						this.sendFrame(
							Sender.frame(a, {
								fin: t.fin,
								rsv1: !1,
								opcode: o,
								mask: t.mask,
								readOnly: c.readOnly,
							}),
							n
						);
				}
				dispatch(e, t, n, a) {
					if (!t) return void this.sendFrame(Sender.frame(e, n), a);
					const r = this._extensions[i.extensionName];
					(this._bufferedBytes += e.length),
						(this._deflating = !0),
						r.compress(e, n.fin, (t, i) => {
							if (this._socket.destroyed) {
								const e = new Error(
									"The socket was closed while data was being compressed"
								);
								"function" == typeof a && a(e);
								for (let t = 0; t < this._queue.length; t++) {
									const n = this._queue[t][4];
									"function" == typeof n && n(e);
								}
							} else
								(this._bufferedBytes -= e.length),
									(this._deflating = !1),
									(n.readOnly = !1),
									this.sendFrame(Sender.frame(i, n), a),
									this.dequeue();
						});
				}
				dequeue() {
					for (; !this._deflating && this._queue.length; ) {
						const e = this._queue.shift();
						(this._bufferedBytes -= e[1].length), Reflect.apply(e[0], this, e.slice(1));
					}
				}
				enqueue(e) {
					(this._bufferedBytes += e[1].length), this._queue.push(e);
				}
				sendFrame(e, t) {
					2 === e.length
						? (this._socket.cork(),
						  this._socket.write(e[0]),
						  this._socket.write(e[1], t),
						  this._socket.uncork())
						: this._socket.write(e[0], t);
				}
			}
			e.exports = Sender;
		},
		function (e, t, n) {
			"use strict";
			const a = [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				1,
				0,
				1,
				1,
				1,
				1,
				1,
				0,
				0,
				1,
				1,
				0,
				1,
				1,
				0,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				0,
				0,
				0,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				1,
				0,
				1,
				0,
				1,
				0,
			];
			function push(e, t, n) {
				void 0 === e[t] ? (e[t] = [n]) : e[t].push(n);
			}
			e.exports = {
				format: function format(e) {
					return Object.keys(e)
						.map((t) => {
							let n = e[t];
							return (
								Array.isArray(n) || (n = [n]),
								n
									.map((e) =>
										[t]
											.concat(
												Object.keys(e).map((t) => {
													let n = e[t];
													return (
														Array.isArray(n) || (n = [n]),
														n
															.map((e) =>
																!0 === e ? t : `${t}=${e}`
															)
															.join("; ")
													);
												})
											)
											.join("; ")
									)
									.join(", ")
							);
						})
						.join(", ");
				},
				parse: function parse(e) {
					const t = Object.create(null);
					if (void 0 === e || "" === e) return t;
					let n,
						i,
						r = Object.create(null),
						o = !1,
						s = !1,
						c = !1,
						p = -1,
						l = -1,
						u = 0;
					for (; u < e.length; u++) {
						const d = e.charCodeAt(u);
						if (void 0 === n)
							if (-1 === l && 1 === a[d]) -1 === p && (p = u);
							else if (32 === d || 9 === d) -1 === l && -1 !== p && (l = u);
							else {
								if (59 !== d && 44 !== d)
									throw new SyntaxError("Unexpected character at index " + u);
								{
									if (-1 === p)
										throw new SyntaxError("Unexpected character at index " + u);
									-1 === l && (l = u);
									const a = e.slice(p, l);
									44 === d ? (push(t, a, r), (r = Object.create(null))) : (n = a),
										(p = l = -1);
								}
							}
						else if (void 0 === i)
							if (-1 === l && 1 === a[d]) -1 === p && (p = u);
							else if (32 === d || 9 === d) -1 === l && -1 !== p && (l = u);
							else if (59 === d || 44 === d) {
								if (-1 === p)
									throw new SyntaxError("Unexpected character at index " + u);
								-1 === l && (l = u),
									push(r, e.slice(p, l), !0),
									44 === d &&
										(push(t, n, r), (r = Object.create(null)), (n = void 0)),
									(p = l = -1);
							} else {
								if (61 !== d || -1 === p || -1 !== l)
									throw new SyntaxError("Unexpected character at index " + u);
								(i = e.slice(p, u)), (p = l = -1);
							}
						else if (s) {
							if (1 !== a[d])
								throw new SyntaxError("Unexpected character at index " + u);
							-1 === p ? (p = u) : o || (o = !0), (s = !1);
						} else if (c)
							if (1 === a[d]) -1 === p && (p = u);
							else if (34 === d && -1 !== p) (c = !1), (l = u);
							else {
								if (92 !== d)
									throw new SyntaxError("Unexpected character at index " + u);
								s = !0;
							}
						else if (34 === d && 61 === e.charCodeAt(u - 1)) c = !0;
						else if (-1 === l && 1 === a[d]) -1 === p && (p = u);
						else if (-1 === p || (32 !== d && 9 !== d)) {
							if (59 !== d && 44 !== d)
								throw new SyntaxError("Unexpected character at index " + u);
							{
								if (-1 === p)
									throw new SyntaxError("Unexpected character at index " + u);
								-1 === l && (l = u);
								let a = e.slice(p, l);
								o && ((a = a.replace(/\\/g, "")), (o = !1)),
									push(r, i, a),
									44 === d &&
										(push(t, n, r), (r = Object.create(null)), (n = void 0)),
									(i = void 0),
									(p = l = -1);
							}
						} else -1 === l && (l = u);
					}
					if (-1 === p || c) throw new SyntaxError("Unexpected end of input");
					-1 === l && (l = u);
					const d = e.slice(p, l);
					return (
						void 0 === n
							? push(t, d, r)
							: (void 0 === i
									? push(r, d, !0)
									: push(r, i, o ? d.replace(/\\/g, "") : d),
							  push(t, n, r)),
						t
					);
				},
			};
		},
		function (e, t, n) {
			!(function (e) {
				(e.parser = function (e, t) {
					return new SAXParser(e, t);
				}),
					(e.SAXParser = SAXParser),
					(e.SAXStream = SAXStream),
					(e.createStream = function createStream(e, t) {
						return new SAXStream(e, t);
					}),
					(e.MAX_BUFFER_LENGTH = 65536);
				var t,
					a = [
						"comment",
						"sgmlDecl",
						"textNode",
						"tagName",
						"doctype",
						"procInstName",
						"procInstBody",
						"entity",
						"attribName",
						"attribValue",
						"cdata",
						"script",
					];
				function SAXParser(t, n) {
					if (!(this instanceof SAXParser)) return new SAXParser(t, n);
					!(function clearBuffers(e) {
						for (var t = 0, n = a.length; t < n; t++) e[a[t]] = "";
					})(this),
						(this.q = this.c = ""),
						(this.bufferCheckPosition = e.MAX_BUFFER_LENGTH),
						(this.opt = n || {}),
						(this.opt.lowercase = this.opt.lowercase || this.opt.lowercasetags),
						(this.looseCase = this.opt.lowercase ? "toLowerCase" : "toUpperCase"),
						(this.tags = []),
						(this.closed = this.closedRoot = this.sawRoot = !1),
						(this.tag = this.error = null),
						(this.strict = !!t),
						(this.noscript = !(!t && !this.opt.noscript)),
						(this.state = f.BEGIN),
						(this.strictEntities = this.opt.strictEntities),
						(this.ENTITIES = this.strictEntities
							? Object.create(e.XML_ENTITIES)
							: Object.create(e.ENTITIES)),
						(this.attribList = []),
						this.opt.xmlns && (this.ns = Object.create(o)),
						(this.trackPosition = !1 !== this.opt.position),
						this.trackPosition && (this.position = this.line = this.column = 0),
						emit(this, "onready");
				}
				(e.EVENTS = [
					"text",
					"processinginstruction",
					"sgmldeclaration",
					"doctype",
					"comment",
					"opentagstart",
					"attribute",
					"opentag",
					"closetag",
					"opencdata",
					"cdata",
					"closecdata",
					"error",
					"end",
					"ready",
					"script",
					"opennamespace",
					"closenamespace",
				]),
					Object.create ||
						(Object.create = function (e) {
							function F() {}
							return (F.prototype = e), new F();
						}),
					Object.keys ||
						(Object.keys = function (e) {
							var t = [];
							for (var n in e) e.hasOwnProperty(n) && t.push(n);
							return t;
						}),
					(SAXParser.prototype = {
						end: function () {
							end(this);
						},
						write: function write(t) {
							if (this.error) throw this.error;
							if (this.closed)
								return error(
									this,
									"Cannot write after close. Assign an onready handler."
								);
							if (null === t) return end(this);
							"object" == typeof t && (t = t.toString());
							var n = 0,
								i = "";
							for (; (i = charAt(t, n++)), (this.c = i), i; )
								switch (
									(this.trackPosition &&
										(this.position++,
										"\n" === i
											? (this.line++, (this.column = 0))
											: this.column++),
									this.state)
								) {
									case f.BEGIN:
										if (((this.state = f.BEGIN_WHITESPACE), "\ufeff" === i))
											continue;
										beginWhiteSpace(this, i);
										continue;
									case f.BEGIN_WHITESPACE:
										beginWhiteSpace(this, i);
										continue;
									case f.TEXT:
										if (this.sawRoot && !this.closedRoot) {
											for (var r = n - 1; i && "<" !== i && "&" !== i; )
												(i = charAt(t, n++)) &&
													this.trackPosition &&
													(this.position++,
													"\n" === i
														? (this.line++, (this.column = 0))
														: this.column++);
											this.textNode += t.substring(r, n - 1);
										}
										"<" !== i ||
										(this.sawRoot && this.closedRoot && !this.strict)
											? (isWhitespace(i) ||
													(this.sawRoot && !this.closedRoot) ||
													strictFail(
														this,
														"Text data outside of root node."
													),
											  "&" === i
													? (this.state = f.TEXT_ENTITY)
													: (this.textNode += i))
											: ((this.state = f.OPEN_WAKA),
											  (this.startTagPosition = this.position));
										continue;
									case f.SCRIPT:
										"<" === i
											? (this.state = f.SCRIPT_ENDING)
											: (this.script += i);
										continue;
									case f.SCRIPT_ENDING:
										"/" === i
											? (this.state = f.CLOSE_TAG)
											: ((this.script += "<" + i), (this.state = f.SCRIPT));
										continue;
									case f.OPEN_WAKA:
										if ("!" === i)
											(this.state = f.SGML_DECL), (this.sgmlDecl = "");
										else if (isWhitespace(i));
										else if (isMatch(s, i))
											(this.state = f.OPEN_TAG), (this.tagName = i);
										else if ("/" === i)
											(this.state = f.CLOSE_TAG), (this.tagName = "");
										else if ("?" === i)
											(this.state = f.PROC_INST),
												(this.procInstName = this.procInstBody = "");
										else {
											if (
												(strictFail(this, "Unencoded <"),
												this.startTagPosition + 1 < this.position)
											) {
												var o = this.position - this.startTagPosition;
												i = new Array(o).join(" ") + i;
											}
											(this.textNode += "<" + i), (this.state = f.TEXT);
										}
										continue;
									case f.SGML_DECL:
										"[CDATA[" === (this.sgmlDecl + i).toUpperCase()
											? (emitNode(this, "onopencdata"),
											  (this.state = f.CDATA),
											  (this.sgmlDecl = ""),
											  (this.cdata = ""))
											: this.sgmlDecl + i === "--"
											? ((this.state = f.COMMENT),
											  (this.comment = ""),
											  (this.sgmlDecl = ""))
											: "DOCTYPE" === (this.sgmlDecl + i).toUpperCase()
											? ((this.state = f.DOCTYPE),
											  (this.doctype || this.sawRoot) &&
													strictFail(
														this,
														"Inappropriately located doctype declaration"
													),
											  (this.doctype = ""),
											  (this.sgmlDecl = ""))
											: ">" === i
											? (emitNode(this, "onsgmldeclaration", this.sgmlDecl),
											  (this.sgmlDecl = ""),
											  (this.state = f.TEXT))
											: isQuote(i)
											? ((this.state = f.SGML_DECL_QUOTED),
											  (this.sgmlDecl += i))
											: (this.sgmlDecl += i);
										continue;
									case f.SGML_DECL_QUOTED:
										i === this.q && ((this.state = f.SGML_DECL), (this.q = "")),
											(this.sgmlDecl += i);
										continue;
									case f.DOCTYPE:
										">" === i
											? ((this.state = f.TEXT),
											  emitNode(this, "ondoctype", this.doctype),
											  (this.doctype = !0))
											: ((this.doctype += i),
											  "[" === i
													? (this.state = f.DOCTYPE_DTD)
													: isQuote(i) &&
													  ((this.state = f.DOCTYPE_QUOTED),
													  (this.q = i)));
										continue;
									case f.DOCTYPE_QUOTED:
										(this.doctype += i),
											i === this.q &&
												((this.q = ""), (this.state = f.DOCTYPE));
										continue;
									case f.DOCTYPE_DTD:
										(this.doctype += i),
											"]" === i
												? (this.state = f.DOCTYPE)
												: isQuote(i) &&
												  ((this.state = f.DOCTYPE_DTD_QUOTED),
												  (this.q = i));
										continue;
									case f.DOCTYPE_DTD_QUOTED:
										(this.doctype += i),
											i === this.q &&
												((this.state = f.DOCTYPE_DTD), (this.q = ""));
										continue;
									case f.COMMENT:
										"-" === i
											? (this.state = f.COMMENT_ENDING)
											: (this.comment += i);
										continue;
									case f.COMMENT_ENDING:
										"-" === i
											? ((this.state = f.COMMENT_ENDED),
											  (this.comment = textopts(this.opt, this.comment)),
											  this.comment &&
													emitNode(this, "oncomment", this.comment),
											  (this.comment = ""))
											: ((this.comment += "-" + i), (this.state = f.COMMENT));
										continue;
									case f.COMMENT_ENDED:
										">" !== i
											? (strictFail(this, "Malformed comment"),
											  (this.comment += "--" + i),
											  (this.state = f.COMMENT))
											: (this.state = f.TEXT);
										continue;
									case f.CDATA:
										"]" === i
											? (this.state = f.CDATA_ENDING)
											: (this.cdata += i);
										continue;
									case f.CDATA_ENDING:
										"]" === i
											? (this.state = f.CDATA_ENDING_2)
											: ((this.cdata += "]" + i), (this.state = f.CDATA));
										continue;
									case f.CDATA_ENDING_2:
										">" === i
											? (this.cdata && emitNode(this, "oncdata", this.cdata),
											  emitNode(this, "onclosecdata"),
											  (this.cdata = ""),
											  (this.state = f.TEXT))
											: "]" === i
											? (this.cdata += "]")
											: ((this.cdata += "]]" + i), (this.state = f.CDATA));
										continue;
									case f.PROC_INST:
										"?" === i
											? (this.state = f.PROC_INST_ENDING)
											: isWhitespace(i)
											? (this.state = f.PROC_INST_BODY)
											: (this.procInstName += i);
										continue;
									case f.PROC_INST_BODY:
										if (!this.procInstBody && isWhitespace(i)) continue;
										"?" === i
											? (this.state = f.PROC_INST_ENDING)
											: (this.procInstBody += i);
										continue;
									case f.PROC_INST_ENDING:
										">" === i
											? (emitNode(this, "onprocessinginstruction", {
													name: this.procInstName,
													body: this.procInstBody,
											  }),
											  (this.procInstName = this.procInstBody = ""),
											  (this.state = f.TEXT))
											: ((this.procInstBody += "?" + i),
											  (this.state = f.PROC_INST_BODY));
										continue;
									case f.OPEN_TAG:
										isMatch(c, i)
											? (this.tagName += i)
											: (newTag(this),
											  ">" === i
													? openTag(this)
													: "/" === i
													? (this.state = f.OPEN_TAG_SLASH)
													: (isWhitespace(i) ||
															strictFail(
																this,
																"Invalid character in tag name"
															),
													  (this.state = f.ATTRIB)));
										continue;
									case f.OPEN_TAG_SLASH:
										">" === i
											? (openTag(this, !0), closeTag(this))
											: (strictFail(
													this,
													"Forward-slash in opening tag not followed by >"
											  ),
											  (this.state = f.ATTRIB));
										continue;
									case f.ATTRIB:
										if (isWhitespace(i)) continue;
										">" === i
											? openTag(this)
											: "/" === i
											? (this.state = f.OPEN_TAG_SLASH)
											: isMatch(s, i)
											? ((this.attribName = i),
											  (this.attribValue = ""),
											  (this.state = f.ATTRIB_NAME))
											: strictFail(this, "Invalid attribute name");
										continue;
									case f.ATTRIB_NAME:
										"=" === i
											? (this.state = f.ATTRIB_VALUE)
											: ">" === i
											? (strictFail(this, "Attribute without value"),
											  (this.attribValue = this.attribName),
											  attrib(this),
											  openTag(this))
											: isWhitespace(i)
											? (this.state = f.ATTRIB_NAME_SAW_WHITE)
											: isMatch(c, i)
											? (this.attribName += i)
											: strictFail(this, "Invalid attribute name");
										continue;
									case f.ATTRIB_NAME_SAW_WHITE:
										if ("=" === i) this.state = f.ATTRIB_VALUE;
										else {
											if (isWhitespace(i)) continue;
											strictFail(this, "Attribute without value"),
												(this.tag.attributes[this.attribName] = ""),
												(this.attribValue = ""),
												emitNode(this, "onattribute", {
													name: this.attribName,
													value: "",
												}),
												(this.attribName = ""),
												">" === i
													? openTag(this)
													: isMatch(s, i)
													? ((this.attribName = i),
													  (this.state = f.ATTRIB_NAME))
													: (strictFail(this, "Invalid attribute name"),
													  (this.state = f.ATTRIB));
										}
										continue;
									case f.ATTRIB_VALUE:
										if (isWhitespace(i)) continue;
										isQuote(i)
											? ((this.q = i), (this.state = f.ATTRIB_VALUE_QUOTED))
											: (strictFail(this, "Unquoted attribute value"),
											  (this.state = f.ATTRIB_VALUE_UNQUOTED),
											  (this.attribValue = i));
										continue;
									case f.ATTRIB_VALUE_QUOTED:
										if (i !== this.q) {
											"&" === i
												? (this.state = f.ATTRIB_VALUE_ENTITY_Q)
												: (this.attribValue += i);
											continue;
										}
										attrib(this),
											(this.q = ""),
											(this.state = f.ATTRIB_VALUE_CLOSED);
										continue;
									case f.ATTRIB_VALUE_CLOSED:
										isWhitespace(i)
											? (this.state = f.ATTRIB)
											: ">" === i
											? openTag(this)
											: "/" === i
											? (this.state = f.OPEN_TAG_SLASH)
											: isMatch(s, i)
											? (strictFail(this, "No whitespace between attributes"),
											  (this.attribName = i),
											  (this.attribValue = ""),
											  (this.state = f.ATTRIB_NAME))
											: strictFail(this, "Invalid attribute name");
										continue;
									case f.ATTRIB_VALUE_UNQUOTED:
										if (!isAttribEnd(i)) {
											"&" === i
												? (this.state = f.ATTRIB_VALUE_ENTITY_U)
												: (this.attribValue += i);
											continue;
										}
										attrib(this),
											">" === i ? openTag(this) : (this.state = f.ATTRIB);
										continue;
									case f.CLOSE_TAG:
										if (this.tagName)
											">" === i
												? closeTag(this)
												: isMatch(c, i)
												? (this.tagName += i)
												: this.script
												? ((this.script += "</" + this.tagName),
												  (this.tagName = ""),
												  (this.state = f.SCRIPT))
												: (isWhitespace(i) ||
														strictFail(
															this,
															"Invalid tagname in closing tag"
														),
												  (this.state = f.CLOSE_TAG_SAW_WHITE));
										else {
											if (isWhitespace(i)) continue;
											notMatch(s, i)
												? this.script
													? ((this.script += "</" + i),
													  (this.state = f.SCRIPT))
													: strictFail(
															this,
															"Invalid tagname in closing tag."
													  )
												: (this.tagName = i);
										}
										continue;
									case f.CLOSE_TAG_SAW_WHITE:
										if (isWhitespace(i)) continue;
										">" === i
											? closeTag(this)
											: strictFail(this, "Invalid characters in closing tag");
										continue;
									case f.TEXT_ENTITY:
									case f.ATTRIB_VALUE_ENTITY_Q:
									case f.ATTRIB_VALUE_ENTITY_U:
										var u, d;
										switch (this.state) {
											case f.TEXT_ENTITY:
												(u = f.TEXT), (d = "textNode");
												break;
											case f.ATTRIB_VALUE_ENTITY_Q:
												(u = f.ATTRIB_VALUE_QUOTED), (d = "attribValue");
												break;
											case f.ATTRIB_VALUE_ENTITY_U:
												(u = f.ATTRIB_VALUE_UNQUOTED), (d = "attribValue");
										}
										";" === i
											? ((this[d] += parseEntity(this)),
											  (this.entity = ""),
											  (this.state = u))
											: isMatch(this.entity.length ? l : p, i)
											? (this.entity += i)
											: (strictFail(this, "Invalid character in entity name"),
											  (this[d] += "&" + this.entity + i),
											  (this.entity = ""),
											  (this.state = u));
										continue;
									default:
										throw new Error(this, "Unknown state: " + this.state);
								}
							this.position >= this.bufferCheckPosition &&
								(function checkBufferLength(t) {
									for (
										var n = Math.max(e.MAX_BUFFER_LENGTH, 10),
											i = 0,
											r = 0,
											o = a.length;
										r < o;
										r++
									) {
										var s = t[a[r]].length;
										if (s > n)
											switch (a[r]) {
												case "textNode":
													closeText(t);
													break;
												case "cdata":
													emitNode(t, "oncdata", t.cdata), (t.cdata = "");
													break;
												case "script":
													emitNode(t, "onscript", t.script),
														(t.script = "");
													break;
												default:
													error(t, "Max buffer length exceeded: " + a[r]);
											}
										i = Math.max(i, s);
									}
									var c = e.MAX_BUFFER_LENGTH - i;
									t.bufferCheckPosition = c + t.position;
								})(this);
							return this;
						},
						resume: function () {
							return (this.error = null), this;
						},
						close: function () {
							return this.write(null);
						},
						flush: function () {
							!(function flushBuffers(e) {
								closeText(e),
									"" !== e.cdata &&
										(emitNode(e, "oncdata", e.cdata), (e.cdata = "")),
									"" !== e.script &&
										(emitNode(e, "onscript", e.script), (e.script = ""));
							})(this);
						},
					});
				try {
					t = n(0).Stream;
				} catch (e) {
					t = function () {};
				}
				var i = e.EVENTS.filter(function (e) {
					return "error" !== e && "end" !== e;
				});
				function SAXStream(e, n) {
					if (!(this instanceof SAXStream)) return new SAXStream(e, n);
					t.apply(this),
						(this._parser = new SAXParser(e, n)),
						(this.writable = !0),
						(this.readable = !0);
					var a = this;
					(this._parser.onend = function () {
						a.emit("end");
					}),
						(this._parser.onerror = function (e) {
							a.emit("error", e), (a._parser.error = null);
						}),
						(this._decoder = null),
						i.forEach(function (e) {
							Object.defineProperty(a, "on" + e, {
								get: function () {
									return a._parser["on" + e];
								},
								set: function (t) {
									if (!t)
										return (
											a.removeAllListeners(e), (a._parser["on" + e] = t), t
										);
									a.on(e, t);
								},
								enumerable: !0,
								configurable: !1,
							});
						});
				}
				(SAXStream.prototype = Object.create(t.prototype, {
					constructor: { value: SAXStream },
				})),
					(SAXStream.prototype.write = function (e) {
						if (
							"function" == typeof Buffer &&
							"function" == typeof Buffer.isBuffer &&
							Buffer.isBuffer(e)
						) {
							if (!this._decoder) {
								var t = n(48).StringDecoder;
								this._decoder = new t("utf8");
							}
							e = this._decoder.write(e);
						}
						return this._parser.write(e.toString()), this.emit("data", e), !0;
					}),
					(SAXStream.prototype.end = function (e) {
						return e && e.length && this.write(e), this._parser.end(), !0;
					}),
					(SAXStream.prototype.on = function (e, n) {
						var a = this;
						return (
							a._parser["on" + e] ||
								-1 === i.indexOf(e) ||
								(a._parser["on" + e] = function () {
									var t =
										1 === arguments.length
											? [arguments[0]]
											: Array.apply(null, arguments);
									t.splice(0, 0, e), a.emit.apply(a, t);
								}),
							t.prototype.on.call(a, e, n)
						);
					});
				var r = "http://www.w3.org/XML/1998/namespace",
					o = { xml: r, xmlns: "http://www.w3.org/2000/xmlns/" },
					s = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
					c = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/,
					p = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
					l = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
				function isWhitespace(e) {
					return " " === e || "\n" === e || "\r" === e || "\t" === e;
				}
				function isQuote(e) {
					return '"' === e || "'" === e;
				}
				function isAttribEnd(e) {
					return ">" === e || isWhitespace(e);
				}
				function isMatch(e, t) {
					return e.test(t);
				}
				function notMatch(e, t) {
					return !isMatch(e, t);
				}
				var u,
					d,
					m,
					f = 0;
				for (var h in ((e.STATE = {
					BEGIN: f++,
					BEGIN_WHITESPACE: f++,
					TEXT: f++,
					TEXT_ENTITY: f++,
					OPEN_WAKA: f++,
					SGML_DECL: f++,
					SGML_DECL_QUOTED: f++,
					DOCTYPE: f++,
					DOCTYPE_QUOTED: f++,
					DOCTYPE_DTD: f++,
					DOCTYPE_DTD_QUOTED: f++,
					COMMENT_STARTING: f++,
					COMMENT: f++,
					COMMENT_ENDING: f++,
					COMMENT_ENDED: f++,
					CDATA: f++,
					CDATA_ENDING: f++,
					CDATA_ENDING_2: f++,
					PROC_INST: f++,
					PROC_INST_BODY: f++,
					PROC_INST_ENDING: f++,
					OPEN_TAG: f++,
					OPEN_TAG_SLASH: f++,
					ATTRIB: f++,
					ATTRIB_NAME: f++,
					ATTRIB_NAME_SAW_WHITE: f++,
					ATTRIB_VALUE: f++,
					ATTRIB_VALUE_QUOTED: f++,
					ATTRIB_VALUE_CLOSED: f++,
					ATTRIB_VALUE_UNQUOTED: f++,
					ATTRIB_VALUE_ENTITY_Q: f++,
					ATTRIB_VALUE_ENTITY_U: f++,
					CLOSE_TAG: f++,
					CLOSE_TAG_SAW_WHITE: f++,
					SCRIPT: f++,
					SCRIPT_ENDING: f++,
				}),
				(e.XML_ENTITIES = { amp: "&", gt: ">", lt: "<", quot: '"', apos: "'" }),
				(e.ENTITIES = {
					amp: "&",
					gt: ">",
					lt: "<",
					quot: '"',
					apos: "'",
					AElig: 198,
					Aacute: 193,
					Acirc: 194,
					Agrave: 192,
					Aring: 197,
					Atilde: 195,
					Auml: 196,
					Ccedil: 199,
					ETH: 208,
					Eacute: 201,
					Ecirc: 202,
					Egrave: 200,
					Euml: 203,
					Iacute: 205,
					Icirc: 206,
					Igrave: 204,
					Iuml: 207,
					Ntilde: 209,
					Oacute: 211,
					Ocirc: 212,
					Ograve: 210,
					Oslash: 216,
					Otilde: 213,
					Ouml: 214,
					THORN: 222,
					Uacute: 218,
					Ucirc: 219,
					Ugrave: 217,
					Uuml: 220,
					Yacute: 221,
					aacute: 225,
					acirc: 226,
					aelig: 230,
					agrave: 224,
					aring: 229,
					atilde: 227,
					auml: 228,
					ccedil: 231,
					eacute: 233,
					ecirc: 234,
					egrave: 232,
					eth: 240,
					euml: 235,
					iacute: 237,
					icirc: 238,
					igrave: 236,
					iuml: 239,
					ntilde: 241,
					oacute: 243,
					ocirc: 244,
					ograve: 242,
					oslash: 248,
					otilde: 245,
					ouml: 246,
					szlig: 223,
					thorn: 254,
					uacute: 250,
					ucirc: 251,
					ugrave: 249,
					uuml: 252,
					yacute: 253,
					yuml: 255,
					copy: 169,
					reg: 174,
					nbsp: 160,
					iexcl: 161,
					cent: 162,
					pound: 163,
					curren: 164,
					yen: 165,
					brvbar: 166,
					sect: 167,
					uml: 168,
					ordf: 170,
					laquo: 171,
					not: 172,
					shy: 173,
					macr: 175,
					deg: 176,
					plusmn: 177,
					sup1: 185,
					sup2: 178,
					sup3: 179,
					acute: 180,
					micro: 181,
					para: 182,
					middot: 183,
					cedil: 184,
					ordm: 186,
					raquo: 187,
					frac14: 188,
					frac12: 189,
					frac34: 190,
					iquest: 191,
					times: 215,
					divide: 247,
					OElig: 338,
					oelig: 339,
					Scaron: 352,
					scaron: 353,
					Yuml: 376,
					fnof: 402,
					circ: 710,
					tilde: 732,
					Alpha: 913,
					Beta: 914,
					Gamma: 915,
					Delta: 916,
					Epsilon: 917,
					Zeta: 918,
					Eta: 919,
					Theta: 920,
					Iota: 921,
					Kappa: 922,
					Lambda: 923,
					Mu: 924,
					Nu: 925,
					Xi: 926,
					Omicron: 927,
					Pi: 928,
					Rho: 929,
					Sigma: 931,
					Tau: 932,
					Upsilon: 933,
					Phi: 934,
					Chi: 935,
					Psi: 936,
					Omega: 937,
					alpha: 945,
					beta: 946,
					gamma: 947,
					delta: 948,
					epsilon: 949,
					zeta: 950,
					eta: 951,
					theta: 952,
					iota: 953,
					kappa: 954,
					lambda: 955,
					mu: 956,
					nu: 957,
					xi: 958,
					omicron: 959,
					pi: 960,
					rho: 961,
					sigmaf: 962,
					sigma: 963,
					tau: 964,
					upsilon: 965,
					phi: 966,
					chi: 967,
					psi: 968,
					omega: 969,
					thetasym: 977,
					upsih: 978,
					piv: 982,
					ensp: 8194,
					emsp: 8195,
					thinsp: 8201,
					zwnj: 8204,
					zwj: 8205,
					lrm: 8206,
					rlm: 8207,
					ndash: 8211,
					mdash: 8212,
					lsquo: 8216,
					rsquo: 8217,
					sbquo: 8218,
					ldquo: 8220,
					rdquo: 8221,
					bdquo: 8222,
					dagger: 8224,
					Dagger: 8225,
					bull: 8226,
					hellip: 8230,
					permil: 8240,
					prime: 8242,
					Prime: 8243,
					lsaquo: 8249,
					rsaquo: 8250,
					oline: 8254,
					frasl: 8260,
					euro: 8364,
					image: 8465,
					weierp: 8472,
					real: 8476,
					trade: 8482,
					alefsym: 8501,
					larr: 8592,
					uarr: 8593,
					rarr: 8594,
					darr: 8595,
					harr: 8596,
					crarr: 8629,
					lArr: 8656,
					uArr: 8657,
					rArr: 8658,
					dArr: 8659,
					hArr: 8660,
					forall: 8704,
					part: 8706,
					exist: 8707,
					empty: 8709,
					nabla: 8711,
					isin: 8712,
					notin: 8713,
					ni: 8715,
					prod: 8719,
					sum: 8721,
					minus: 8722,
					lowast: 8727,
					radic: 8730,
					prop: 8733,
					infin: 8734,
					ang: 8736,
					and: 8743,
					or: 8744,
					cap: 8745,
					cup: 8746,
					int: 8747,
					there4: 8756,
					sim: 8764,
					cong: 8773,
					asymp: 8776,
					ne: 8800,
					equiv: 8801,
					le: 8804,
					ge: 8805,
					sub: 8834,
					sup: 8835,
					nsub: 8836,
					sube: 8838,
					supe: 8839,
					oplus: 8853,
					otimes: 8855,
					perp: 8869,
					sdot: 8901,
					lceil: 8968,
					rceil: 8969,
					lfloor: 8970,
					rfloor: 8971,
					lang: 9001,
					rang: 9002,
					loz: 9674,
					spades: 9824,
					clubs: 9827,
					hearts: 9829,
					diams: 9830,
				}),
				Object.keys(e.ENTITIES).forEach(function (t) {
					var n = e.ENTITIES[t],
						a = "number" == typeof n ? String.fromCharCode(n) : n;
					e.ENTITIES[t] = a;
				}),
				e.STATE))
					e.STATE[e.STATE[h]] = h;
				function emit(e, t, n) {
					e[t] && e[t](n);
				}
				function emitNode(e, t, n) {
					e.textNode && closeText(e), emit(e, t, n);
				}
				function closeText(e) {
					(e.textNode = textopts(e.opt, e.textNode)),
						e.textNode && emit(e, "ontext", e.textNode),
						(e.textNode = "");
				}
				function textopts(e, t) {
					return e.trim && (t = t.trim()), e.normalize && (t = t.replace(/\s+/g, " ")), t;
				}
				function error(e, t) {
					return (
						closeText(e),
						e.trackPosition &&
							(t += "\nLine: " + e.line + "\nColumn: " + e.column + "\nChar: " + e.c),
						(t = new Error(t)),
						(e.error = t),
						emit(e, "onerror", t),
						e
					);
				}
				function end(e) {
					return (
						e.sawRoot && !e.closedRoot && strictFail(e, "Unclosed root tag"),
						e.state !== f.BEGIN &&
							e.state !== f.BEGIN_WHITESPACE &&
							e.state !== f.TEXT &&
							error(e, "Unexpected end"),
						closeText(e),
						(e.c = ""),
						(e.closed = !0),
						emit(e, "onend"),
						SAXParser.call(e, e.strict, e.opt),
						e
					);
				}
				function strictFail(e, t) {
					if ("object" != typeof e || !(e instanceof SAXParser))
						throw new Error("bad call to strictFail");
					e.strict && error(e, t);
				}
				function newTag(e) {
					e.strict || (e.tagName = e.tagName[e.looseCase]());
					var t = e.tags[e.tags.length - 1] || e,
						n = (e.tag = { name: e.tagName, attributes: {} });
					e.opt.xmlns && (n.ns = t.ns),
						(e.attribList.length = 0),
						emitNode(e, "onopentagstart", n);
				}
				function qname(e, t) {
					var n = e.indexOf(":") < 0 ? ["", e] : e.split(":"),
						a = n[0],
						i = n[1];
					return t && "xmlns" === e && ((a = "xmlns"), (i = "")), { prefix: a, local: i };
				}
				function attrib(e) {
					if (
						(e.strict || (e.attribName = e.attribName[e.looseCase]()),
						-1 !== e.attribList.indexOf(e.attribName) ||
							e.tag.attributes.hasOwnProperty(e.attribName))
					)
						e.attribName = e.attribValue = "";
					else {
						if (e.opt.xmlns) {
							var t = qname(e.attribName, !0),
								n = t.prefix,
								a = t.local;
							if ("xmlns" === n)
								if ("xml" === a && e.attribValue !== r)
									strictFail(
										e,
										"xml: prefix must be bound to " +
											r +
											"\nActual: " +
											e.attribValue
									);
								else if (
									"xmlns" === a &&
									"http://www.w3.org/2000/xmlns/" !== e.attribValue
								)
									strictFail(
										e,
										"xmlns: prefix must be bound to http://www.w3.org/2000/xmlns/\nActual: " +
											e.attribValue
									);
								else {
									var i = e.tag,
										o = e.tags[e.tags.length - 1] || e;
									i.ns === o.ns && (i.ns = Object.create(o.ns)),
										(i.ns[a] = e.attribValue);
								}
							e.attribList.push([e.attribName, e.attribValue]);
						} else
							(e.tag.attributes[e.attribName] = e.attribValue),
								emitNode(e, "onattribute", {
									name: e.attribName,
									value: e.attribValue,
								});
						e.attribName = e.attribValue = "";
					}
				}
				function openTag(e, t) {
					if (e.opt.xmlns) {
						var n = e.tag,
							a = qname(e.tagName);
						(n.prefix = a.prefix),
							(n.local = a.local),
							(n.uri = n.ns[a.prefix] || ""),
							n.prefix &&
								!n.uri &&
								(strictFail(
									e,
									"Unbound namespace prefix: " + JSON.stringify(e.tagName)
								),
								(n.uri = a.prefix));
						var i = e.tags[e.tags.length - 1] || e;
						n.ns &&
							i.ns !== n.ns &&
							Object.keys(n.ns).forEach(function (t) {
								emitNode(e, "onopennamespace", { prefix: t, uri: n.ns[t] });
							});
						for (var r = 0, o = e.attribList.length; r < o; r++) {
							var s = e.attribList[r],
								c = s[0],
								p = s[1],
								l = qname(c, !0),
								u = l.prefix,
								d = l.local,
								m = "" === u ? "" : n.ns[u] || "",
								h = { name: c, value: p, prefix: u, local: d, uri: m };
							u &&
								"xmlns" !== u &&
								!m &&
								(strictFail(e, "Unbound namespace prefix: " + JSON.stringify(u)),
								(h.uri = u)),
								(e.tag.attributes[c] = h),
								emitNode(e, "onattribute", h);
						}
						e.attribList.length = 0;
					}
					(e.tag.isSelfClosing = !!t),
						(e.sawRoot = !0),
						e.tags.push(e.tag),
						emitNode(e, "onopentag", e.tag),
						t ||
							(e.noscript || "script" !== e.tagName.toLowerCase()
								? (e.state = f.TEXT)
								: (e.state = f.SCRIPT),
							(e.tag = null),
							(e.tagName = "")),
						(e.attribName = e.attribValue = ""),
						(e.attribList.length = 0);
				}
				function closeTag(e) {
					if (!e.tagName)
						return (
							strictFail(e, "Weird empty close tag."),
							(e.textNode += "</>"),
							void (e.state = f.TEXT)
						);
					if (e.script) {
						if ("script" !== e.tagName)
							return (
								(e.script += "</" + e.tagName + ">"),
								(e.tagName = ""),
								void (e.state = f.SCRIPT)
							);
						emitNode(e, "onscript", e.script), (e.script = "");
					}
					var t = e.tags.length,
						n = e.tagName;
					e.strict || (n = n[e.looseCase]());
					for (var a = n; t--; ) {
						if (e.tags[t].name === a) break;
						strictFail(e, "Unexpected close tag");
					}
					if (t < 0)
						return (
							strictFail(e, "Unmatched closing tag: " + e.tagName),
							(e.textNode += "</" + e.tagName + ">"),
							void (e.state = f.TEXT)
						);
					e.tagName = n;
					for (var i = e.tags.length; i-- > t; ) {
						var r = (e.tag = e.tags.pop());
						(e.tagName = e.tag.name), emitNode(e, "onclosetag", e.tagName);
						var o = {};
						for (var s in r.ns) o[s] = r.ns[s];
						var c = e.tags[e.tags.length - 1] || e;
						e.opt.xmlns &&
							r.ns !== c.ns &&
							Object.keys(r.ns).forEach(function (t) {
								var n = r.ns[t];
								emitNode(e, "onclosenamespace", { prefix: t, uri: n });
							});
					}
					0 === t && (e.closedRoot = !0),
						(e.tagName = e.attribValue = e.attribName = ""),
						(e.attribList.length = 0),
						(e.state = f.TEXT);
				}
				function parseEntity(e) {
					var t,
						n = e.entity,
						a = n.toLowerCase(),
						i = "";
					return e.ENTITIES[n]
						? e.ENTITIES[n]
						: e.ENTITIES[a]
						? e.ENTITIES[a]
						: ("#" === (n = a).charAt(0) &&
								("x" === n.charAt(1)
									? ((n = n.slice(2)), (i = (t = parseInt(n, 16)).toString(16)))
									: ((n = n.slice(1)), (i = (t = parseInt(n, 10)).toString(10)))),
						  (n = n.replace(/^0+/, "")),
						  isNaN(t) || i.toLowerCase() !== n
								? (strictFail(e, "Invalid character entity"), "&" + e.entity + ";")
								: String.fromCodePoint(t));
				}
				function beginWhiteSpace(e, t) {
					"<" === t
						? ((e.state = f.OPEN_WAKA), (e.startTagPosition = e.position))
						: isWhitespace(t) ||
						  (strictFail(e, "Non-whitespace before first tag."),
						  (e.textNode = t),
						  (e.state = f.TEXT));
				}
				function charAt(e, t) {
					var n = "";
					return t < e.length && (n = e.charAt(t)), n;
				}
				(f = e.STATE),
					String.fromCodePoint ||
						((u = String.fromCharCode),
						(d = Math.floor),
						(m = function () {
							var e,
								t,
								n = 16384,
								a = [],
								i = -1,
								r = arguments.length;
							if (!r) return "";
							for (var o = ""; ++i < r; ) {
								var s = Number(arguments[i]);
								if (!isFinite(s) || s < 0 || s > 1114111 || d(s) !== s)
									throw RangeError("Invalid code point: " + s);
								s <= 65535
									? a.push(s)
									: ((e = 55296 + ((s -= 65536) >> 10)),
									  (t = (s % 1024) + 56320),
									  a.push(e, t)),
									(i + 1 === r || a.length > n) &&
										((o += u.apply(null, a)), (a.length = 0));
							}
							return o;
						}),
						Object.defineProperty
							? Object.defineProperty(String, "fromCodePoint", {
									value: m,
									configurable: !0,
									writable: !0,
							  })
							: (String.fromCodePoint = m));
			})(t);
		},
		function (e, t) {
			e.exports = require("timers");
		},
		function (e, t, n) {
			const a = n(35),
				i = n(173),
				r = ["mp4a", "mp3", "vorbis", "aac", "opus", "flac"],
				o = ["mp4v", "avc1", "Sorenson H.283", "MPEG-4 Visual", "VP8", "VP9", "H.264"],
				getVideoBitrate = (e) => e.bitrate || 0,
				getVideoEncodingRank = (e) => o.findIndex((t) => e.codecs && e.codecs.includes(t)),
				getAudioBitrate = (e) => e.audioBitrate || 0,
				getAudioEncodingRank = (e) => r.findIndex((t) => e.codecs && e.codecs.includes(t)),
				sortFormatsBy = (e, t, n) => {
					let a = 0;
					for (let i of n) if (((a = i(t) - i(e)), 0 !== a)) break;
					return a;
				},
				sortFormatsByVideo = (e, t) =>
					sortFormatsBy(e, t, [
						(e) => parseInt(e.qualityLabel),
						getVideoBitrate,
						getVideoEncodingRank,
					]),
				sortFormatsByAudio = (e, t) =>
					sortFormatsBy(e, t, [getAudioBitrate, getAudioEncodingRank]);
			(t.sortFormats = (e, t) =>
				sortFormatsBy(e, t, [
					(e) => +!!e.isHLS,
					(e) => +!!e.isDashMPD,
					(e) => +(e.contentLength > 0),
					(e) => +(e.hasVideo && e.hasAudio),
					(e) => +e.hasVideo,
					(e) => parseInt(e.qualityLabel) || 0,
					getVideoBitrate,
					getAudioBitrate,
					getVideoEncodingRank,
					getAudioEncodingRank,
				])),
				(t.chooseFormat = (e, n) => {
					if ("object" == typeof n.format) {
						if (!n.format.url)
							throw Error("Invalid format given, did you use `ytdl.getInfo()`?");
						return n.format;
					}
					let a;
					n.filter && (e = t.filterFormats(e, n.filter));
					const i = n.quality || "highest";
					switch (i) {
						case "highest":
							a = e[0];
							break;
						case "lowest":
							a = e[e.length - 1];
							break;
						case "highestaudio":
							(e = t.filterFormats(e, "audio")).sort(sortFormatsByAudio), (a = e[0]);
							break;
						case "lowestaudio":
							(e = t.filterFormats(e, "audio")).sort(sortFormatsByAudio),
								(a = e[e.length - 1]);
							break;
						case "highestvideo":
							(e = t.filterFormats(e, "video")).sort(sortFormatsByVideo), (a = e[0]);
							break;
						case "lowestvideo":
							(e = t.filterFormats(e, "video")).sort(sortFormatsByVideo),
								(a = e[e.length - 1]);
							break;
						default:
							a = getFormatByQuality(i, e);
					}
					if (!a) throw Error("No such format found: " + i);
					return a;
				});
			const getFormatByQuality = (e, t) => {
				let getFormat = (e) => t.find((t) => "" + t.itag == "" + e);
				return Array.isArray(e) ? getFormat(e.find((e) => getFormat(e))) : getFormat(e);
			};
			(t.filterFormats = (e, t) => {
				let n;
				switch (t) {
					case "videoandaudio":
					case "audioandvideo":
						n = (e) => e.hasVideo && e.hasAudio;
						break;
					case "video":
						n = (e) => e.hasVideo;
						break;
					case "videoonly":
						n = (e) => e.hasVideo && !e.hasAudio;
						break;
					case "audio":
						n = (e) => e.hasAudio;
						break;
					case "audioonly":
						n = (e) => !e.hasVideo && e.hasAudio;
						break;
					default:
						if ("function" != typeof t)
							throw TypeError(`Given filter (${t}) is not supported`);
						n = t;
				}
				return e.filter((e) => !!e.url && n(e));
			}),
				(t.addFormatMeta = (e) => (
					((e = Object.assign({}, i[e.itag], e)).hasVideo = !!e.qualityLabel),
					(e.hasAudio = !!e.audioBitrate),
					(e.container = e.mimeType ? e.mimeType.split(";")[0].split("/")[1] : null),
					(e.codecs = e.mimeType ? a.between(e.mimeType, 'codecs="', '"') : null),
					(e.videoCodec = e.hasVideo && e.codecs ? e.codecs.split(", ")[0] : null),
					(e.audioCodec =
						e.hasAudio && e.codecs ? e.codecs.split(", ").slice(-1)[0] : null),
					(e.isLive = /\bsource[/=]yt_live_broadcast\b/.test(e.url)),
					(e.isHLS = /\/manifest\/hls_(variant|playlist)\//.test(e.url)),
					(e.isDashMPD = /\/manifest\/dash\//.test(e.url)),
					e
				));
		},
		function (e, t, n) {
			const { URL: a } = n(3),
				i = new Set([
					"youtube.com",
					"www.youtube.com",
					"m.youtube.com",
					"music.youtube.com",
					"gaming.youtube.com",
				]),
				r = /^https?:\/\/(youtu\.be\/|(www\.)?youtube.com\/(embed|v|shorts)\/)/;
			t.getURLVideoID = (e) => {
				const n = new a(e);
				let o = n.searchParams.get("v");
				if (r.test(e) && !o) {
					const e = n.pathname.split("/");
					o = e[e.length - 1];
				} else if (n.hostname && !i.has(n.hostname)) throw Error("Not a YouTube domain");
				if (!o) throw Error("No video id found: " + e);
				if (((o = o.substring(0, 11)), !t.validateID(o)))
					throw TypeError(
						`Video id (${o}) does not match expected format (${s.toString()})`
					);
				return o;
			};
			const o = /^https?:\/\//;
			t.getVideoID = (e) => {
				if (t.validateID(e)) return e;
				if (o.test(e)) return t.getURLVideoID(e);
				throw Error("No video id found: " + e);
			};
			const s = /^[a-zA-Z0-9-_]{11}$/;
			(t.validateID = (e) => s.test(e)),
				(t.validateURL = (e) => {
					try {
						return t.getURLVideoID(e), !0;
					} catch (e) {
						return !1;
					}
				});
		},
		function (e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 }),
				(t.durationStr = t.humanStr = void 0);
			const a = /^\d+$/,
				i = /^(?:(?:(\d+):)?(\d{1,2}):)?(\d{1,2})(?:\.(\d{3}))?$/,
				r = { ms: 1, s: 1e3, m: 6e4, h: 36e5 };
			(t.humanStr = (e) => {
				if ("number" == typeof e) return e;
				if (a.test(e)) return +e;
				const t = i.exec(e);
				if (t) return +(t[1] || 0) * r.h + +(t[2] || 0) * r.m + +t[3] * r.s + +(t[4] || 0);
				{
					let t = 0;
					const n = /(-?\d+)(ms|s|m|h)/g;
					let a;
					for (; null != (a = n.exec(e)); ) t += +a[1] * r[a[2]];
					return t;
				}
			}),
				(t.durationStr = (e) => {
					let t = 0;
					const n = /(\d+(?:\.\d+)?)(S|M|H)/g;
					let a;
					for (; null != (a = n.exec(e)); ) t += +a[1] * r[a[2].toLowerCase()];
					return t;
				});
		},
		function (e, t, n) {
			const { URL: a } = n(3),
				i = n(8),
				r = n(14),
				o = n(79);
			(t.cache = new o()),
				(t.getTokens = (e, n) =>
					t.cache.getOrSet(e, async () => {
						let a = await i(e, n.requestOptions).text();
						const r = t.extractActions(a);
						if (!r || !r.length)
							throw Error("Could not extract signature deciphering actions");
						return t.cache.set(e, r), r;
					})),
				(t.decipher = (e, t) => {
					t = t.split("");
					for (let n = 0, a = e.length; n < a; n++) {
						let a,
							i = e[n];
						switch (i[0]) {
							case "r":
								t = t.reverse();
								break;
							case "w":
								(a = ~~i.slice(1)), (t = swapHeadAndPosition(t, a));
								break;
							case "s":
								(a = ~~i.slice(1)), (t = t.slice(a));
								break;
							case "p":
								(a = ~~i.slice(1)), t.splice(0, a);
						}
					}
					return t.join("");
				});
			const swapHeadAndPosition = (e, t) => {
					const n = e[0];
					return (e[0] = e[t % e.length]), (e[t] = n), e;
				},
				s = "[a-zA-Z_\\$][a-zA-Z_0-9]*",
				c =
					"(?:'[^'\\\\]*(:?\\\\[\\s\\S][^'\\\\]*)*'|\"[^\"\\\\]*(:?\\\\[\\s\\S][^\"\\\\]*)*\")",
				p = `(?:${s}|${c})`,
				l = `(?:\\.${s}|\\[${c}\\])`,
				u = ":function\\(a\\)\\{(?:return )?a\\.reverse\\(\\)\\}",
				d = ":function\\(a,b\\)\\{return a\\.slice\\(b\\)\\}",
				m = ":function\\(a,b\\)\\{a\\.splice\\(0,b\\)\\}",
				f =
					":function\\(a,b\\)\\{var c=a\\[0\\];a\\[0\\]=a\\[b(?:%a\\.length)?\\];a\\[b(?:%a\\.length)?\\]=c(?:;return a)?\\}",
				h = new RegExp(
					`var (${s})=\\{((?:(?:${p}${u}|${p}${d}|${p}${m}|${p}${f}),?\\r?\\n?)+)\\};`
				),
				v = new RegExp(
					`function(?: ${s})?\\(a\\)\\{a=a\\.split\\((?:''|"")\\);\\s*((?:(?:a=)?[a-zA-Z_\\$][a-zA-Z_0-9]*${l}\\(a,\\d+\\);)+)return a\\.join\\((?:''|"")\\)\\}`
				),
				g = new RegExp(`(?:^|,)(${p})${u}`, "m"),
				b = new RegExp(`(?:^|,)(${p})${d}`, "m"),
				x = new RegExp(`(?:^|,)(${p})${m}`, "m"),
				y = new RegExp(`(?:^|,)(${p})${f}`, "m");
			(t.extractActions = (e) => {
				const t = h.exec(e),
					n = v.exec(e);
				if (!t || !n) return null;
				const a = t[1].replace(/\$/g, "\\$"),
					i = t[2].replace(/\$/g, "\\$"),
					r = n[1].replace(/\$/g, "\\$");
				let o = g.exec(i);
				const s = o && o[1].replace(/\$/g, "\\$").replace(/\$|^'|^"|'$|"$/g, "");
				o = b.exec(i);
				const c = o && o[1].replace(/\$/g, "\\$").replace(/\$|^'|^"|'$|"$/g, "");
				o = x.exec(i);
				const p = o && o[1].replace(/\$/g, "\\$").replace(/\$|^'|^"|'$|"$/g, "");
				o = y.exec(i);
				const l = o && o[1].replace(/\$/g, "\\$").replace(/\$|^'|^"|'$|"$/g, ""),
					u = `(${[s, c, p, l].join("|")})`,
					d = new RegExp(
						`(?:a=)?${a}(?:\\.${u}|\\['${u}'\\]|\\["${u}"\\])\\(a,(\\d+)\\)`,
						"g"
					),
					m = [];
				for (; null !== (o = d.exec(r)); ) {
					switch (o[1] || o[2] || o[3]) {
						case l:
							m.push("w" + o[4]);
							break;
						case s:
							m.push("r");
							break;
						case c:
							m.push("s" + o[4]);
							break;
						case p:
							m.push("p" + o[4]);
					}
				}
				return m;
			}),
				(t.setDownloadURL = (e, t) => {
					let n;
					if (!e.url) return;
					n = e.url;
					try {
						n = decodeURIComponent(n);
					} catch (e) {
						return;
					}
					const i = new a(n);
					i.searchParams.set("ratebypass", "yes"),
						t && i.searchParams.set(e.sp || "signature", t),
						(e.url = i.toString());
				}),
				(t.decipherFormats = async (e, n, a) => {
					let i = {},
						o = await t.getTokens(n, a);
					return (
						e.forEach((e) => {
							let n = e.signatureCipher || e.cipher;
							n &&
								(Object.assign(e, r.parse(n)),
								delete e.signatureCipher,
								delete e.cipher);
							const a = o && e.s ? t.decipher(o, e.s) : null;
							t.setDownloadURL(e, a), (i[e.url] = e);
						}),
						i
					);
				});
		},
		function (e, t, n) {
			const { setTimeout: a } = n(74);
			e.exports = class Cache extends Map {
				constructor(e = 1e3) {
					super(), (this.timeout = e);
				}
				set(e, t) {
					this.has(e) && clearTimeout(super.get(e).tid),
						super.set(e, {
							tid: a(this.delete.bind(this, e), this.timeout).unref(),
							value: t,
						});
				}
				get(e) {
					let t = super.get(e);
					return t ? t.value : null;
				}
				getOrSet(e, t) {
					if (this.has(e)) return this.get(e);
					{
						let n = t();
						return (
							this.set(e, n),
							(async () => {
								try {
									await n;
								} catch (t) {
									this.delete(e);
								}
							})(),
							n
						);
					}
				}
				delete(e) {
					let t = super.get(e);
					t && (clearTimeout(t.tid), super.delete(e));
				}
				clear() {
					for (let e of this.values()) clearTimeout(e.tid);
					super.clear();
				}
			};
		},
		function (e, t, n) {
			const a = n(8),
				i = "https://www.youtube.com/",
				r = { limit: 100, safeSearch: !1 },
				o = { gl: "US", hl: "en" },
				s = {
					client: {
						utcOffsetMinutes: 0,
						gl: "US",
						hl: "en",
						clientName: "WEB",
						clientVersion: "<important information>",
					},
					user: {},
					request: {},
				};
			(t.parseFilters = (e) => {
				const t = e.contents.twoColumnSearchResultsRenderer.primaryContents,
					n = t.sectionListRenderer || t.richGridRenderer,
					a = (n.subMenu || n.submenu).searchSubMenuRenderer.groups,
					r = new Map();
				for (const e of a) {
					const t = new Map();
					t.active = null;
					for (const n of e.searchFilterGroupRenderer.filters) {
						const e = !n.searchFilterRenderer.navigationEndpoint;
						let a = null;
						e ||
							(a =
								n.searchFilterRenderer.navigationEndpoint.commandMetadata
									.webCommandMetadata.url);
						const r = {
							name: c(n.searchFilterRenderer.label, ""),
							active: e,
							url: e ? null : new URL(a, i).toString(),
							description: n.searchFilterRenderer.tooltip,
						};
						e && (t.active = r), t.set(r.name, r);
					}
					r.set(c(e.searchFilterGroupRenderer.title, "Unknown Category"), t);
				}
				return r;
			}),
				(t.parseBody = (e, t = {}) => {
					let n = null;
					try {
						n = jsonAfter(e, "var ytInitialData = ");
					} catch (e) {}
					const a =
							between(e, 'INNERTUBE_API_KEY":"', '"') ||
							between(e, 'innertubeApiKey":"', '"'),
						i =
							between(e, 'INNERTUBE_CONTEXT_CLIENT_VERSION":"', '"') ||
							between(e, 'innertube_context_client_version":"', '"'),
						r = JSON.parse(JSON.stringify(s));
					return (
						(r.client.clientVersion = i),
						t.gl && (r.client.gl = t.gl),
						t.hl && (r.client.hl = t.hl),
						t.utcOffsetMinutes && (r.client.utcOffsetMinutes = t.utcOffsetMinutes),
						t.safeSearch && (r.user.enableSafetyMode = !0),
						{ json: n, apiKey: a, context: r }
					);
				});
			const c = (t.parseText = (e, t = null) =>
				"object" != typeof e
					? t
					: Object.prototype.hasOwnProperty.call(e, "simpleText")
					? e.simpleText
					: Array.isArray(e.runs)
					? e.runs.map((e) => e.text).join("")
					: t);
			(t.parseIntegerFromText = (e) => Number(c(e).replace(/\D+/g, ""))),
				(t.doPost = async (e, t, n = {}) => {
					n.method = "POST";
					const i = a(e, n);
					return (
						t && i.once("request", (e) => e.write(JSON.stringify(t))),
						JSON.parse(await i.text())
					);
				}),
				(t.checkArgs = (e, t = {}) => {
					if (!e) throw new Error("search string is mandatory");
					if ("string" != typeof e)
						throw new Error("search string must be of type string");
					let n = Object.assign({}, r, t);
					!isNaN(n.pages) && n.pages > 0
						? (n.limit = 1 / 0)
						: (isNaN(n.limit) || n.limit <= 0) &&
						  ((n.pages = 1 / 0), (n.limit = r.limit)),
						"boolean" != typeof n.safeSearch && (n.safeSearch = r.safeSearch),
						(n.requestOptions = Object.assign({}, t.requestOptions)),
						n.requestOptions.headers &&
							(n.requestOptions.headers = JSON.parse(
								JSON.stringify(n.requestOptions.headers)
							)),
						n.safeSearch &&
							(n.requestOptions.headers || (n.requestOptions.headers = {}),
							n.requestOptions.headers.Cookie ||
								(n.requestOptions.headers.Cookie = []),
							n.requestOptions.headers.Cookie.push("PREF=f2=8000000"));
					const a = new URL(e, i);
					if (e.startsWith(i) && "/results" === a.pathname && a.searchParams.has("sp")) {
						if (!a.searchParams.get("search_query"))
							throw new Error('filter links have to include a "search_string" query');
						n.query = {};
						for (const e of a.searchParams.keys()) n.query[e] = a.searchParams.get(e);
					} else n.query = { search_query: e };
					return (
						(n.search = n.query.search_query),
						(n.query = Object.assign({}, o, n.query)),
						t && t.gl && (n.query.gl = t.gl),
						t && t.hl && (n.query.hl = t.hl),
						n
					);
				}),
				(t.prepImg = (e) => (
					e.forEach((e) => (e.url = e.url ? new URL(e.url, i).toString() : null)),
					e.sort((e, t) => t.width - e.width)
				)),
				(t.parseWrapper = (e) => {
					let t = [],
						n = null;
					return (
						e.sectionListRenderer
							? ((t = e.sectionListRenderer.contents.find(
									(e) => "itemSectionRenderer" === Object.keys(e)[0]
							  ).itemSectionRenderer.contents),
							  (n = e.sectionListRenderer.contents.find(
									(e) => "continuationItemRenderer" === Object.keys(e)[0]
							  )))
							: e.richGridRenderer &&
							  ((t = e.richGridRenderer.contents
									.filter(
										(e) =>
											!Object.prototype.hasOwnProperty.call(
												e,
												"continuationItemRenderer"
											)
									)
									.map(
										(e) => (e.richItemRenderer || e.richSectionRenderer).content
									)),
							  (n = e.richGridRenderer.contents.find((e) =>
									Object.prototype.hasOwnProperty.call(
										e,
										"continuationItemRenderer"
									)
							  ))),
						{ rawItems: t, continuation: n }
					);
				}),
				(t.parsePage2Wrapper = (e) => {
					let t = [],
						n = null;
					for (const a of e)
						Object.prototype.hasOwnProperty.call(a, "itemSectionRenderer")
							? t.push(...a.itemSectionRenderer.contents)
							: Object.prototype.hasOwnProperty.call(a, "richItemRenderer")
							? t.push(a.richItemRenderer.content)
							: Object.prototype.hasOwnProperty.call(a, "richSectionRenderer")
							? t.push(a.richSectionRenderer.content)
							: Object.prototype.hasOwnProperty.call(a, "continuationItemRenderer") &&
							  (n = a);
					return { rawItems: t, continuation: n };
				});
			const jsonAfter = (e, t) => {
					const n = e.indexOf(t);
					if (-1 === n) return null;
					e = e.slice(n + t.length);
					try {
						return JSON.parse(p(e));
					} catch (e) {
						return null;
					}
				},
				between = (e, t, n) => {
					let a;
					return (
						(a = e.indexOf(t)),
						-1 === a
							? ""
							: ((a += t.length),
							  (a = (e = e.slice(a)).indexOf(n)),
							  -1 === a ? "" : (e = e.slice(0, a)))
					);
				},
				p = (t.cutAfterJSON = (e) => {
					let t, n;
					if (
						("[" === e[0]
							? ((t = "["), (n = "]"))
							: "{" === e[0] && ((t = "{"), (n = "}")),
						!t)
					)
						throw new Error(
							"Can't cut unsupported JSON (need to begin with [ or { ) but got: " +
								e[0]
						);
					let a,
						i = !1,
						r = !1,
						o = 0;
					for (a = 0; a < e.length; a++)
						if ('"' !== e[a] || r) {
							if (
								((r = "\\" === e[a] && !r),
								!i && (e[a] === t ? o++ : e[a] === n && o--, 0 === o))
							)
								return e.substr(0, a + 1);
						} else i = !i;
					throw Error("Can't cut unsupported JSON (no matching closing bracket found)");
				});
			t._hidden = { jsonAfter: jsonAfter, between: between, cutAfterJSON: p };
		},
		function (e) {
			e.exports = JSON.parse(
				'{"name":"ytsr","version":"3.5.0","description":"Simple package to search YouTube - no strings attached.","keywords":["youtube","search","yt","ytsearcher","api","playlist","channel","video","scrape","pagination","promise"],"homepage":"https://github.com/TimeForANinja/node-ytsr#readme","bugs":{"url":"https://github.com/TimeForANinja/node-ytsr/issues"},"repository":{"type":"git","url":"git://github.com/TimeForANinja/node-ytsr.git"},"license":"MIT","author":"Tobias Kutscha (https://github.com/TimeForANinja)","main":"./lib/main.js","types":"./typings/index.d.ts","files":["lib","typings"],"scripts":{"lint":"eslint ./","lint:fix":"eslint --fix ./","lint:typings":"tslint typings/index.d.ts","lint:typings:fix":"tslint --fix typings/index.d.ts","mocha":"mocha -- -t 16000 test/*-test.js","mocha:coverage":"mocha -- -t 16000 test/*-test.js --exclude test/e2e-test.js","nyc":"nyc --reporter=lcov npm run-script mocha","nyc:coverage":"nyc --reporter=lcov npm run-script mocha:coverage","test":"npm run-script nyc","test:coverage":"npm run-script nyc:coverage && codecov"},"dependencies":{"miniget":"^4.2.0"},"devDependencies":{"assert-diff":"^3.0.2","codecov":"^3.8.1","dtslint":"^4.0.8","eslint":"^7.23.0","mocha":"^8.3.2","nock":"^13.0.11","nyc":"^15.1.0","typescript":"^4.2.3"},"engines":{"node":">=8"}}'
			);
		},
		function (e, t, n) {
			!(function () {
				"use strict";
				var t = n(164),
					a = n(67),
					i = {
						origin: "*",
						methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
						preflightContinue: !1,
						optionsSuccessStatus: 204,
					};
				function isString(e) {
					return "string" == typeof e || e instanceof String;
				}
				function configureOrigin(e, t) {
					var n,
						a = t.headers.origin,
						i = [];
					return (
						e.origin && "*" !== e.origin
							? isString(e.origin)
								? (i.push([
										{ key: "Access-Control-Allow-Origin", value: e.origin },
								  ]),
								  i.push([{ key: "Vary", value: "Origin" }]))
								: ((n = (function isOriginAllowed(e, t) {
										if (Array.isArray(t)) {
											for (var n = 0; n < t.length; ++n)
												if (isOriginAllowed(e, t[n])) return !0;
											return !1;
										}
										return isString(t)
											? e === t
											: t instanceof RegExp
											? t.test(e)
											: !!t;
								  })(a, e.origin)),
								  i.push([{ key: "Access-Control-Allow-Origin", value: !!n && a }]),
								  i.push([{ key: "Vary", value: "Origin" }]))
							: i.push([{ key: "Access-Control-Allow-Origin", value: "*" }]),
						i
					);
				}
				function configureCredentials(e) {
					return !0 === e.credentials
						? { key: "Access-Control-Allow-Credentials", value: "true" }
						: null;
				}
				function configureExposedHeaders(e) {
					var t = e.exposedHeaders;
					return t
						? (t.join && (t = t.join(",")),
						  t && t.length ? { key: "Access-Control-Expose-Headers", value: t } : null)
						: null;
				}
				function applyHeaders(e, t) {
					for (var n = 0, i = e.length; n < i; n++) {
						var r = e[n];
						r &&
							(Array.isArray(r)
								? applyHeaders(r, t)
								: "Vary" === r.key && r.value
								? a(t, r.value)
								: r.value && t.setHeader(r.key, r.value));
					}
				}
				e.exports = function middlewareWrapper(e) {
					var n = null;
					return (
						(n =
							"function" == typeof e
								? e
								: function (t, n) {
										n(null, e);
								  }),
						function corsMiddleware(e, a, r) {
							n(e, function (n, o) {
								if (n) r(n);
								else {
									var s = t({}, i, o),
										c = null;
									s.origin && "function" == typeof s.origin
										? (c = s.origin)
										: s.origin &&
										  (c = function (e, t) {
												t(null, s.origin);
										  }),
										c
											? c(e.headers.origin, function (t, n) {
													t || !n
														? r(t)
														: ((s.origin = n),
														  (function cors(e, t, n, a) {
																var i = [];
																"OPTIONS" ===
																(t.method &&
																	t.method.toUpperCase &&
																	t.method.toUpperCase())
																	? (i.push(
																			configureOrigin(e, t)
																	  ),
																	  i.push(
																			configureCredentials(e)
																	  ),
																	  i.push(
																			(function configureMethods(
																				e
																			) {
																				var t = e.methods;
																				return (
																					t.join &&
																						(t = e.methods.join(
																							","
																						)),
																					{
																						key:
																							"Access-Control-Allow-Methods",
																						value: t,
																					}
																				);
																			})(e)
																	  ),
																	  i.push(
																			(function configureAllowedHeaders(
																				e,
																				t
																			) {
																				var n =
																						e.allowedHeaders ||
																						e.headers,
																					a = [];
																				return (
																					n
																						? n.join &&
																						  (n = n.join(
																								","
																						  ))
																						: ((n =
																								t
																									.headers[
																									"access-control-request-headers"
																								]),
																						  a.push([
																								{
																									key:
																										"Vary",
																									value:
																										"Access-Control-Request-Headers",
																								},
																						  ])),
																					n &&
																						n.length &&
																						a.push([
																							{
																								key:
																									"Access-Control-Allow-Headers",
																								value: n,
																							},
																						]),
																					a
																				);
																			})(e, t)
																	  ),
																	  i.push(
																			(function configureMaxAge(
																				e
																			) {
																				var t =
																					("number" ==
																						typeof e.maxAge ||
																						e.maxAge) &&
																					e.maxAge.toString();
																				return t && t.length
																					? {
																							key:
																								"Access-Control-Max-Age",
																							value: t,
																					  }
																					: null;
																			})(e)
																	  ),
																	  i.push(
																			configureExposedHeaders(
																				e
																			)
																	  ),
																	  applyHeaders(i, n),
																	  e.preflightContinue
																			? a()
																			: ((n.statusCode =
																					e.optionsSuccessStatus),
																			  n.setHeader(
																					"Content-Length",
																					"0"
																			  ),
																			  n.end()))
																	: (i.push(
																			configureOrigin(e, t)
																	  ),
																	  i.push(
																			configureCredentials(e)
																	  ),
																	  i.push(
																			configureExposedHeaders(
																				e
																			)
																	  ),
																	  applyHeaders(i, n),
																	  a());
														  })(s, e, a, r));
											  })
											: r();
								}
							});
						}
					);
				};
			})();
		},
		function (e, t, n) {
			"use strict";
			const a = n(68);
			(a.createWebSocketStream = n(168)),
				(a.Server = n(169)),
				(a.Receiver = n(69)),
				(a.Sender = n(71)),
				(e.exports = a);
		},
		function (e, t, n) {
			const a = n(0).PassThrough,
				i = n(171),
				r = n(35),
				o = n(75),
				s = n(76),
				c = n(78),
				p = n(8),
				l = n(42),
				{ parseTimestamp: u } = n(42),
				ytdl = (e, t) => {
					const n = createStream(t);
					return (
						ytdl.getInfo(e, t).then((e) => {
							downloadFromInfoCallback(n, e, t);
						}, n.emit.bind(n, "error")),
						n
					);
				};
			(e.exports = ytdl),
				(ytdl.getBasicInfo = i.getBasicInfo),
				(ytdl.getInfo = i.getInfo),
				(ytdl.chooseFormat = o.chooseFormat),
				(ytdl.filterFormats = o.filterFormats),
				(ytdl.validateID = s.validateID),
				(ytdl.validateURL = s.validateURL),
				(ytdl.getURLVideoID = s.getURLVideoID),
				(ytdl.getVideoID = s.getVideoID),
				(ytdl.cache = {
					sig: c.cache,
					info: i.cache,
					watch: i.watchPageCache,
					cookie: i.cookieCache,
				});
			const createStream = (e) => {
					const t = new a({ highWaterMark: (e && e.highWaterMark) || 524288 });
					return (
						(t._destroy = () => {
							t.destroyed = !0;
						}),
						t
					);
				},
				pipeAndSetEvents = (e, t, n) => {
					[
						"abort",
						"request",
						"response",
						"error",
						"redirect",
						"retry",
						"reconnect",
					].forEach((n) => {
						e.prependListener(n, t.emit.bind(t, n));
					}),
						e.pipe(t, { end: n });
				},
				downloadFromInfoCallback = (e, t, n) => {
					n = n || {};
					let a,
						i = r.playError(t.player_response, [
							"UNPLAYABLE",
							"LIVE_STREAM_OFFLINE",
							"LOGIN_REQUIRED",
						]);
					if (i) return void e.emit("error", i);
					if (!t.formats.length)
						return void e.emit("error", Error("This video is unavailable"));
					try {
						a = o.chooseFormat(t.formats, n);
					} catch (t) {
						return void e.emit("error", t);
					}
					if ((e.emit("info", t, a), e.destroyed)) return;
					let s,
						c = 0;
					const ondata = (t) => {
							(c += t.length), e.emit("progress", t.length, c, s);
						},
						d = n.dlChunkSize || 10485760;
					let m,
						f = !0;
					if (a.isHLS || a.isDashMPD)
						(m = l(a.url, {
							chunkReadahead: +t.live_chunk_readahead,
							begin: n.begin || (a.isLive && Date.now()),
							liveBuffer: n.liveBuffer,
							requestOptions: n.requestOptions,
							parser: a.isDashMPD ? "dash-mpd" : "m3u8",
							id: a.itag,
						})),
							m.on("progress", (t, n) => {
								e.emit("progress", t.size, t.num, n);
							}),
							pipeAndSetEvents(m, e, f);
					else {
						const t = Object.assign({}, n.requestOptions, {
							maxReconnects: 6,
							maxRetries: 3,
							backoff: { inc: 500, max: 1e4 },
						});
						if (!(0 === d || (a.hasAudio && a.hasVideo))) {
							let i = (n.range && n.range.start) || 0,
								r = i + d;
							const o = n.range && n.range.end;
							s = n.range
								? (o ? o + 1 : parseInt(a.contentLength)) - i
								: parseInt(a.contentLength);
							const getNextChunk = () => {
								!o && r >= s && (r = 0),
									o && r > o && (r = o),
									(f = !r || r === o),
									(t.headers = Object.assign({}, t.headers, {
										Range: `bytes=${i}-${r || ""}`,
									})),
									(m = p(a.url, t)),
									m.on("data", ondata),
									m.on("end", () => {
										e.destroyed ||
											(r &&
												r !== o &&
												((i = r + 1), (r += d), getNextChunk()));
									}),
									pipeAndSetEvents(m, e, f);
							};
							getNextChunk();
						} else
							n.begin && (a.url += "&begin=" + u(n.begin)),
								n.range &&
									(n.range.start || n.range.end) &&
									(t.headers = Object.assign({}, t.headers, {
										Range: `bytes=${n.range.start || "0"}-${n.range.end || ""}`,
									})),
								(m = p(a.url, t)),
								m.on("response", (t) => {
									e.destroyed || (s = s || parseInt(t.headers["content-length"]));
								}),
								m.on("data", ondata),
								pipeAndSetEvents(m, e, f);
					}
					e._destroy = () => {
						(e.destroyed = !0), m.destroy(), m.end();
					};
				};
			ytdl.downloadFromInfo = (e, t) => {
				const n = createStream(t);
				if (!e.full)
					throw Error(
						"Cannot use `ytdl.downloadFromInfo()` when called with info from `ytdl.getBasicInfo()`"
					);
				return (
					setImmediate(() => {
						downloadFromInfoCallback(n, e, t);
					}),
					n
				);
			};
		},
		function (e, t, n) {
			const a = n(178),
				i = n(8),
				r = n(80),
				o = n(14),
				s = "https://www.youtube.com/results?",
				c = (e.exports = async (e, t, n = 3) => {
					if (0 === n) throw new Error("Unable to find JSON!");
					const p = r.checkArgs(e, t),
						l = s + o.encode(p.query),
						u = await i(l, p.requestOptions).text(),
						d = r.parseBody(u, p);
					if (!d.json) return c(e, t, n - 1);
					if (d.json.alerts && !d.json.contents) {
						let e = d.json.alerts.find(
							(e) => e.alertRenderer && "ERROR" === e.alertRenderer.type
						);
						if (e)
							throw new Error(
								"API-Error: " + r.parseText(e.alertRenderer.text, "* no message *")
							);
					}
					const m = {
						originalQuery: p.search,
						correctedQuery: p.search,
						results: Number(d.json.estimatedResults) || 0,
						activeFilters: [],
						refinements: [],
						items: [],
						continuation: null,
					};
					Array.isArray(d.json.refinements) &&
						d.json.refinements.map((e) => ({
							q: e,
							url: new URL(e, s).toString(),
							bestThumbnail: null,
							thumbnails: null,
						}));
					const { rawItems: f, continuation: h } = r.parseWrapper(
						d.json.contents.twoColumnSearchResultsRenderer.primaryContents
					);
					(m.items = f
						.map((e) => a(e, m))
						.filter((e) => e)
						.filter((e, t) => t < p.limit)),
						(p.limit -= m.items.length),
						(p.pages -= 1);
					const v = r.parseFilters(d.json);
					m.activeFilters = Array.from(v)
						.map((e) => e[1].active)
						.filter((e) => e);
					let g = null;
					if (
						(h &&
							(g =
								h.continuationItemRenderer.continuationEndpoint.continuationCommand
									.token),
						g && p.limit === 1 / 0 && (m.continuation = [d.apiKey, g, d.context, p]),
						!g || p.limit < 1 || p.pages < 1)
					)
						return m;
					const b = await parsePage2(d.apiKey, g, d.context, p);
					return m.items.push(...b.items), (m.continuation = b.continuation), m;
				});
			c.version = n(81).version;
			const parsePage2 = async (e, t, n, i) => {
				const o = await r.doPost(
					"https://www.youtube.com/youtubei/v1/search?key=" + e,
					{ context: n, continuation: t },
					i.requestOptions
				);
				if (!Array.isArray(o.onResponseReceivedCommands))
					return { continuation: null, items: [] };
				const { rawItems: s, continuation: c } = r.parsePage2Wrapper(
						o.onResponseReceivedCommands[0].appendContinuationItemsAction
							.continuationItems
					),
					p = s
						.map((e) => a(e))
						.filter((e) => e)
						.filter((e, t) => t < i.limit);
				(i.limit -= p.length), (i.pages -= 1);
				let l = null;
				if (
					(c &&
						(l =
							c.continuationItemRenderer.continuationEndpoint.continuationCommand
								.token),
					!l || i.limit < 1 || i.pages < 1)
				)
					return { continuation: l && i.limit === 1 / 0 ? [e, l, n, i] : null, items: p };
				const u = await parsePage2(e, l, n, i);
				return u.items.unshift(...p), u;
			};
			(c.continueReq = async (e) => {
				if (!Array.isArray(e) || 4 !== e.length)
					throw new Error("invalid continuation array");
				if (!e[0] || "string" != typeof e[0]) throw new Error("invalid apiKey");
				if (!e[1] || "string" != typeof e[1]) throw new Error("invalid token");
				if (!e[2] || "object" != typeof e[2]) throw new Error("invalid context");
				if (!e[3] || "object" != typeof e[3]) throw new Error("invalid opts");
				if (!isNaN(e[3].limit) && isFinite(e[3].limit))
					throw new Error("continueReq only allowed for paged requests");
				return (e[3].pages = 1), (e[3].limit = 1 / 0), parsePage2(...e);
			}),
				(c.getFilters = async (e, t) => {
					const n = r.checkArgs(e, t),
						a = s + o.encode(n.query),
						p = await i(a, n.requestOptions).text(),
						l = r.parseBody(p);
					return l.json ? r.parseFilters(l.json) : c.getFilters(e, t);
				});
		},
		function (e, t, n) {
			n(87).config(Object.assign({}, n(88), n(89)(process.argv)));
		},
		function (e, t, n) {
			const a = n(2),
				i = n(1);
			function log(e) {
				console.log("[dotenv][DEBUG] " + e);
			}
			const r = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,
				o = /\\n/g,
				s = /\n|\r|\r\n/;
			function parse(e, t) {
				const n = Boolean(t && t.debug),
					a = {};
				return (
					e
						.toString()
						.split(s)
						.forEach(function (e, t) {
							const i = e.match(r);
							if (null != i) {
								const e = i[1];
								let t = i[2] || "";
								const n = t.length - 1,
									r = '"' === t[0] && '"' === t[n];
								("'" === t[0] && "'" === t[n]) || r
									? ((t = t.substring(1, n)), r && (t = t.replace(o, "\n")))
									: (t = t.trim()),
									(a[e] = t);
							} else n && log(`did not match key and value when parsing line ${t + 1}: ${e}`);
						}),
					a
				);
			}
			(e.exports.config = function config(e) {
				let t = i.resolve(process.cwd(), ".env"),
					n = "utf8",
					r = !1;
				e &&
					(null != e.path && (t = e.path),
					null != e.encoding && (n = e.encoding),
					null != e.debug && (r = !0));
				try {
					const e = parse(a.readFileSync(t, { encoding: n }), { debug: r });
					return (
						Object.keys(e).forEach(function (t) {
							Object.prototype.hasOwnProperty.call(process.env, t)
								? r &&
								  log(
										`"${t}" is already defined in \`process.env\` and will not be overwritten`
								  )
								: (process.env[t] = e[t]);
						}),
						{ parsed: e }
					);
				} catch (e) {
					return { error: e };
				}
			}),
				(e.exports.parse = parse);
		},
		function (e, t) {
			const n = {};
			null != process.env.DOTENV_CONFIG_ENCODING &&
				(n.encoding = process.env.DOTENV_CONFIG_ENCODING),
				null != process.env.DOTENV_CONFIG_PATH && (n.path = process.env.DOTENV_CONFIG_PATH),
				null != process.env.DOTENV_CONFIG_DEBUG &&
					(n.debug = process.env.DOTENV_CONFIG_DEBUG),
				(e.exports = n);
		},
		function (e, t) {
			const n = /^dotenv_config_(encoding|path|debug)=(.+)$/;
			e.exports = function optionMatcher(e) {
				return e.reduce(function (e, t) {
					const a = t.match(n);
					return a && (e[a[1]] = a[2]), e;
				}, {});
			};
		},
		function (e, t, n) {
			"use strict";
			var a = n(43),
				i = n(21).EventEmitter,
				r = n(128),
				o = n(129),
				s = n(57),
				c = n(56),
				p = n(153),
				l = n(160);
			((t = e.exports = function createApplication() {
				var app = function (e, t, n) {
					app.handle(e, t, n);
				};
				return (
					r(app, i.prototype, !1),
					r(app, o, !1),
					(app.request = Object.create(p, {
						app: { configurable: !0, enumerable: !0, writable: !0, value: app },
					})),
					(app.response = Object.create(l, {
						app: { configurable: !0, enumerable: !0, writable: !0, value: app },
					})),
					app.init(),
					app
				);
			}).application = o),
				(t.request = p),
				(t.response = l),
				(t.Route = s),
				(t.Router = c),
				(t.json = a.json),
				(t.query = n(60)),
				(t.raw = a.raw),
				(t.static = n(163)),
				(t.text = a.text),
				(t.urlencoded = a.urlencoded);
			[
				"bodyParser",
				"compress",
				"cookieSession",
				"session",
				"logger",
				"cookieParser",
				"favicon",
				"responseTime",
				"errorHandler",
				"timeout",
				"methodOverride",
				"vhost",
				"csrf",
				"directory",
				"limit",
				"multipart",
				"staticCache",
			].forEach(function (e) {
				Object.defineProperty(t, e, {
					get: function () {
						throw new Error(
							"Most middleware (like " +
								e +
								") is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware."
						);
					},
					configurable: !0,
				});
			});
		},
		function (e, t, n) {
			"use strict";
			e.exports = function callSiteToString(e) {
				var t = !0,
					n = (function callSiteFileLocation(e) {
						var t,
							n = "";
						e.isNative()
							? (n = "native")
							: e.isEval()
							? (t = e.getScriptNameOrSourceURL()) || (n = e.getEvalOrigin())
							: (t = e.getFileName());
						if (t) {
							n += t;
							var a = e.getLineNumber();
							if (null != a) {
								n += ":" + a;
								var i = e.getColumnNumber();
								i && (n += ":" + i);
							}
						}
						return n || "unknown source";
					})(e),
					a = e.getFunctionName(),
					i = e.isConstructor(),
					r = !(e.isToplevel() || i),
					o = "";
				if (r) {
					var s = e.getMethodName(),
						c = (function getConstructorName(e) {
							var t = e.receiver;
							return (t.constructor && t.constructor.name) || null;
						})(e);
					a
						? (c && 0 !== a.indexOf(c) && (o += c + "."),
						  (o += a),
						  s &&
								a.lastIndexOf("." + s) !== a.length - s.length - 1 &&
								(o += " [as " + s + "]"))
						: (o += c + "." + (s || "<anonymous>"));
				} else
					i ? (o += "new " + (a || "<anonymous>")) : a ? (o += a) : ((t = !1), (o += n));
				t && (o += " (" + n + ")");
				return o;
			};
		},
		function (e, t, n) {
			"use strict";
			e.exports = function eventListenerCount(e, t) {
				return e.listeners(t).length;
			};
		},
		function (e, t, n) {
			"use strict";
			var a = n(16),
				i = n(22),
				r = n(17),
				o = n(25)("body-parser:json"),
				s = n(27),
				c = n(18);
			e.exports = function json(e) {
				var t = e || {},
					n = "number" != typeof t.limit ? a.parse(t.limit || "100kb") : t.limit,
					l = !1 !== t.inflate,
					u = t.reviver,
					d = !1 !== t.strict,
					m = t.type || "application/json",
					f = t.verify || !1;
				if (!1 !== f && "function" != typeof f)
					throw new TypeError("option verify must be function");
				var h =
					"function" != typeof m
						? (function typeChecker(e) {
								return function checkType(t) {
									return Boolean(c(t, e));
								};
						  })(m)
						: m;
				function parse(e) {
					if (0 === e.length) return {};
					if (d) {
						var t = (function firstchar(e) {
							return p.exec(e)[1];
						})(e);
						if ("{" !== t && "[" !== t)
							throw (
								(o("strict violation"),
								(function createStrictSyntaxError(e, t) {
									var n = e.indexOf(t),
										a = e.substring(0, n) + "#";
									try {
										throw (JSON.parse(a), new SyntaxError("strict violation"));
									} catch (e) {
										return normalizeJsonSyntaxError(e, {
											message: e.message.replace("#", t),
											stack: e.stack,
										});
									}
								})(e, t))
							);
					}
					try {
						return o("parse json"), JSON.parse(e, u);
					} catch (e) {
						throw normalizeJsonSyntaxError(e, { message: e.message, stack: e.stack });
					}
				}
				return function jsonParser(e, t, a) {
					if (e._body) return o("body already parsed"), void a();
					if (((e.body = e.body || {}), !c.hasBody(e)))
						return o("skip empty body"), void a();
					if ((o("content-type %j", e.headers["content-type"]), !h(e)))
						return o("skip parsing"), void a();
					var p =
						(function getCharset(e) {
							try {
								return (i.parse(e).parameters.charset || "").toLowerCase();
							} catch (e) {
								return;
							}
						})(e) || "utf-8";
					if ("utf-" !== p.substr(0, 4))
						return (
							o("invalid charset"),
							void a(
								r(415, 'unsupported charset "' + p.toUpperCase() + '"', {
									charset: p,
									type: "charset.unsupported",
								})
							)
						);
					s(e, t, a, parse, o, { encoding: p, inflate: l, limit: n, verify: f });
				};
			};
			var p = /^[\x20\x09\x0a\x0d]*(.)/;
			function normalizeJsonSyntaxError(e, t) {
				for (var n = Object.getOwnPropertyNames(e), a = 0; a < n.length; a++) {
					var i = n[a];
					"stack" !== i && "message" !== i && delete e[i];
				}
				return (
					(e.stack = t.stack.replace(e.message, t.message)), (e.message = t.message), e
				);
			}
		},
		function (e) {
			e.exports = JSON.parse(
				'{"100":"Continue","101":"Switching Protocols","102":"Processing","103":"Early Hints","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status","208":"Already Reported","226":"IM Used","300":"Multiple Choices","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","306":"(Unused)","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Range Not Satisfiable","417":"Expectation Failed","418":"I\'m a teapot","421":"Misdirected Request","422":"Unprocessable Entity","423":"Locked","424":"Failed Dependency","425":"Unordered Collection","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","451":"Unavailable For Legal Reasons","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected","509":"Bandwidth Limit Exceeded","510":"Not Extended","511":"Network Authentication Required"}'
			);
		},
		function (e, t, n) {
			try {
				var a = n(10);
				if ("function" != typeof a.inherits) throw "";
				e.exports = a.inherits;
			} catch (t) {
				e.exports = n(96);
			}
		},
		function (e, t) {
			"function" == typeof Object.create
				? (e.exports = function inherits(e, t) {
						(e.super_ = t),
							(e.prototype = Object.create(t.prototype, {
								constructor: {
									value: e,
									enumerable: !1,
									writable: !0,
									configurable: !0,
								},
							}));
				  })
				: (e.exports = function inherits(e, t) {
						e.super_ = t;
						var TempCtor = function () {};
						(TempCtor.prototype = t.prototype),
							(e.prototype = new TempCtor()),
							(e.prototype.constructor = e);
				  });
		},
		function (e, t) {
			e.exports = function toIdentifier(e) {
				return e
					.split(" ")
					.map(function (e) {
						return e.slice(0, 1).toUpperCase() + e.slice(1);
					})
					.join("")
					.replace(/[^ _0-9a-z]/gi, "");
			};
		},
		function (e, t, n) {
			function load() {
				var e;
				try {
					e = t.storage.debug;
				} catch (e) {}
				return (
					!e &&
						"undefined" != typeof process &&
						"env" in process &&
						(e = process.env.DEBUG),
					e
				);
			}
			((t = e.exports = n(46)).log = function log() {
				return (
					"object" == typeof console &&
					console.log &&
					Function.prototype.apply.call(console.log, console, arguments)
				);
			}),
				(t.formatArgs = function formatArgs(e) {
					var n = this.useColors;
					if (
						((e[0] =
							(n ? "%c" : "") +
							this.namespace +
							(n ? " %c" : " ") +
							e[0] +
							(n ? "%c " : " ") +
							"+" +
							t.humanize(this.diff)),
						!n)
					)
						return;
					var a = "color: " + this.color;
					e.splice(1, 0, a, "color: inherit");
					var i = 0,
						r = 0;
					e[0].replace(/%[a-zA-Z%]/g, function (e) {
						"%%" !== e && (i++, "%c" === e && (r = i));
					}),
						e.splice(r, 0, a);
				}),
				(t.save = function save(e) {
					try {
						null == e ? t.storage.removeItem("debug") : (t.storage.debug = e);
					} catch (e) {}
				}),
				(t.load = load),
				(t.useColors = function useColors() {
					if (
						"undefined" != typeof window &&
						window.process &&
						"renderer" === window.process.type
					)
						return !0;
					return (
						("undefined" != typeof document &&
							document.documentElement &&
							document.documentElement.style &&
							document.documentElement.style.WebkitAppearance) ||
						("undefined" != typeof window &&
							window.console &&
							(window.console.firebug ||
								(window.console.exception && window.console.table))) ||
						("undefined" != typeof navigator &&
							navigator.userAgent &&
							navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
							parseInt(RegExp.$1, 10) >= 31) ||
						("undefined" != typeof navigator &&
							navigator.userAgent &&
							navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
					);
				}),
				(t.storage =
					"undefined" != typeof chrome && void 0 !== chrome.storage
						? chrome.storage.local
						: (function localstorage() {
								try {
									return window.localStorage;
								} catch (e) {}
						  })()),
				(t.colors = [
					"lightseagreen",
					"forestgreen",
					"goldenrod",
					"dodgerblue",
					"darkorchid",
					"crimson",
				]),
				(t.formatters.j = function (e) {
					try {
						return JSON.stringify(e);
					} catch (e) {
						return "[UnexpectedJSONParseError]: " + e.message;
					}
				}),
				t.enable(load());
		},
		function (e, t) {
			var n = 1e3,
				a = 6e4,
				i = 60 * a,
				r = 24 * i;
			function plural(e, t, n) {
				if (!(e < t))
					return e < 1.5 * t
						? Math.floor(e / t) + " " + n
						: Math.ceil(e / t) + " " + n + "s";
			}
			e.exports = function (e, t) {
				t = t || {};
				var o = typeof e;
				if ("string" === o && e.length > 0)
					return (function parse(e) {
						if ((e = String(e)).length > 100) return;
						var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
							e
						);
						if (!t) return;
						var o = parseFloat(t[1]);
						switch ((t[2] || "ms").toLowerCase()) {
							case "years":
							case "year":
							case "yrs":
							case "yr":
							case "y":
								return 315576e5 * o;
							case "days":
							case "day":
							case "d":
								return o * r;
							case "hours":
							case "hour":
							case "hrs":
							case "hr":
							case "h":
								return o * i;
							case "minutes":
							case "minute":
							case "mins":
							case "min":
							case "m":
								return o * a;
							case "seconds":
							case "second":
							case "secs":
							case "sec":
							case "s":
								return o * n;
							case "milliseconds":
							case "millisecond":
							case "msecs":
							case "msec":
							case "ms":
								return o;
							default:
								return;
						}
					})(e);
				if ("number" === o && !1 === isNaN(e))
					return t.long
						? (function fmtLong(e) {
								return (
									plural(e, r, "day") ||
									plural(e, i, "hour") ||
									plural(e, a, "minute") ||
									plural(e, n, "second") ||
									e + " ms"
								);
						  })(e)
						: (function fmtShort(e) {
								if (e >= r) return Math.round(e / r) + "d";
								if (e >= i) return Math.round(e / i) + "h";
								if (e >= a) return Math.round(e / a) + "m";
								if (e >= n) return Math.round(e / n) + "s";
								return e + "ms";
						  })(e);
				throw new Error(
					"val is not a non-empty string or a valid number. val=" + JSON.stringify(e)
				);
			};
		},
		function (e, t, n) {
			var a = n(26),
				i = n(10);
			((t = e.exports = n(46)).init = function init(e) {
				e.inspectOpts = {};
				for (var n = Object.keys(t.inspectOpts), a = 0; a < n.length; a++)
					e.inspectOpts[n[a]] = t.inspectOpts[n[a]];
			}),
				(t.log = function log() {
					return o.write(i.format.apply(i, arguments) + "\n");
				}),
				(t.formatArgs = function formatArgs(e) {
					var n = this.namespace;
					if (this.useColors) {
						var a = this.color,
							i = "  [3" + a + ";1m" + n + " [0m";
						(e[0] = i + e[0].split("\n").join("\n" + i)),
							e.push("[3" + a + "m+" + t.humanize(this.diff) + "[0m");
					} else e[0] = new Date().toUTCString() + " " + n + " " + e[0];
				}),
				(t.save = function save(e) {
					null == e ? delete process.env.DEBUG : (process.env.DEBUG = e);
				}),
				(t.load = load),
				(t.useColors = function useColors() {
					return "colors" in t.inspectOpts ? Boolean(t.inspectOpts.colors) : a.isatty(r);
				}),
				(t.colors = [6, 2, 3, 4, 5, 1]),
				(t.inspectOpts = Object.keys(process.env)
					.filter(function (e) {
						return /^debug_/i.test(e);
					})
					.reduce(function (e, t) {
						var n = t
								.substring(6)
								.toLowerCase()
								.replace(/_([a-z])/g, function (e, t) {
									return t.toUpperCase();
								}),
							a = process.env[t];
						return (
							(a =
								!!/^(yes|on|true|enabled)$/i.test(a) ||
								(!/^(no|off|false|disabled)$/i.test(a) &&
									("null" === a ? null : Number(a)))),
							(e[n] = a),
							e
						);
					}, {}));
			var r = parseInt(process.env.DEBUG_FD, 10) || 2;
			1 !== r &&
				2 !== r &&
				i.deprecate(function () {},
				"except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
			var o =
				1 === r
					? process.stdout
					: 2 === r
					? process.stderr
					: (function createWritableStdioStream(e) {
							var t;
							switch (process.binding("tty_wrap").guessHandleType(e)) {
								case "TTY":
									((t = new a.WriteStream(e))._type = "tty"),
										t._handle && t._handle.unref && t._handle.unref();
									break;
								case "FILE":
									var i = n(2);
									(t = new i.SyncWriteStream(e, { autoClose: !1 }))._type = "fs";
									break;
								case "PIPE":
								case "TCP":
									var r = n(11);
									((t = new r.Socket({
										fd: e,
										readable: !1,
										writable: !0,
									})).readable = !1),
										(t.read = null),
										(t._type = "pipe"),
										t._handle && t._handle.unref && t._handle.unref();
									break;
								default:
									throw new Error("Implement me. Unknown stream file type!");
							}
							return (t.fd = e), (t._isStdio = !0), t;
					  })(r);
			function load() {
				return process.env.DEBUG;
			}
			(t.formatters.o = function (e) {
				return (
					(this.inspectOpts.colors = this.useColors),
					i
						.inspect(e, this.inspectOpts)
						.split("\n")
						.map(function (e) {
							return e.trim();
						})
						.join(" ")
				);
			}),
				(t.formatters.O = function (e) {
					return (
						(this.inspectOpts.colors = this.useColors), i.inspect(e, this.inspectOpts)
					);
				}),
				t.enable(load());
		},
		function (e, t, n) {
			"use strict";
			var a = n(16),
				i = n(17),
				r = n(47),
				o = n(51);
			e.exports = function getRawBody(e, t, n) {
				var i = n,
					r = t || {};
				(!0 !== t && "string" != typeof t) || (r = { encoding: t });
				"function" == typeof t && ((i = t), (r = {}));
				if (void 0 !== i && "function" != typeof i)
					throw new TypeError("argument callback must be a function");
				if (!i && !global.Promise) throw new TypeError("argument callback is required");
				var o = !0 !== r.encoding ? r.encoding : "utf-8",
					s = a.parse(r.limit),
					c = null == r.length || isNaN(r.length) ? null : parseInt(r.length, 10);
				if (i) return readStream(e, o, c, s, i);
				return new Promise(function executor(t, n) {
					readStream(e, o, c, s, function onRead(e, a) {
						if (e) return n(e);
						t(a);
					});
				});
			};
			var s = /^Encoding not recognized: /;
			function halt(e) {
				o(e), "function" == typeof e.pause && e.pause();
			}
			function readStream(e, t, n, a, o) {
				var c = !1;
				if (null !== a && null !== n && n > a)
					return done(
						i(413, "request entity too large", {
							expected: n,
							length: n,
							limit: a,
							type: "entity.too.large",
						})
					);
				var p = e._readableState;
				if (e._decoder || (p && (p.encoding || p.decoder)))
					return done(
						i(500, "stream encoding should not be set", { type: "stream.encoding.set" })
					);
				var l,
					u = 0;
				try {
					l = (function getDecoder(e) {
						if (!e) return null;
						try {
							return r.getDecoder(e);
						} catch (t) {
							if (!s.test(t.message)) throw t;
							throw i(415, "specified encoding unsupported", {
								encoding: e,
								type: "encoding.unsupported",
							});
						}
					})(t);
				} catch (e) {
					return done(e);
				}
				var d = l ? "" : [];
				function done() {
					for (var t = new Array(arguments.length), n = 0; n < t.length; n++)
						t[n] = arguments[n];
					function invokeCallback() {
						cleanup(), t[0] && halt(e), o.apply(null, t);
					}
					(c = !0), invokeCallback();
				}
				function onAborted() {
					c ||
						done(
							i(400, "request aborted", {
								code: "ECONNABORTED",
								expected: n,
								length: n,
								received: u,
								type: "request.aborted",
							})
						);
				}
				function onData(e) {
					c ||
						((u += e.length),
						null !== a && u > a
							? done(
									i(413, "request entity too large", {
										limit: a,
										received: u,
										type: "entity.too.large",
									})
							  )
							: l
							? (d += l.write(e))
							: d.push(e));
				}
				function onEnd(e) {
					if (!c) {
						if (e) return done(e);
						if (null !== n && u !== n)
							done(
								i(400, "request size did not match content length", {
									expected: n,
									length: n,
									received: u,
									type: "request.size.invalid",
								})
							);
						else done(null, l ? d + (l.end() || "") : Buffer.concat(d));
					}
				}
				function cleanup() {
					(d = null),
						e.removeListener("aborted", onAborted),
						e.removeListener("data", onData),
						e.removeListener("end", onEnd),
						e.removeListener("error", onEnd),
						e.removeListener("close", cleanup);
				}
				e.on("aborted", onAborted),
					e.on("close", cleanup),
					e.on("data", onData),
					e.on("end", onEnd),
					e.on("error", onEnd);
			}
		},
		function (e, t, n) {
			"use strict";
			function PrependBOMWrapper(e, t) {
				(this.encoder = e), (this.addBOM = !0);
			}
			function StripBOMWrapper(e, t) {
				(this.decoder = e), (this.pass = !1), (this.options = t || {});
			}
			(t.PrependBOM = PrependBOMWrapper),
				(PrependBOMWrapper.prototype.write = function (e) {
					return (
						this.addBOM && ((e = "\ufeff" + e), (this.addBOM = !1)),
						this.encoder.write(e)
					);
				}),
				(PrependBOMWrapper.prototype.end = function () {
					return this.encoder.end();
				}),
				(t.StripBOM = StripBOMWrapper),
				(StripBOMWrapper.prototype.write = function (e) {
					var t = this.decoder.write(e);
					return (
						this.pass ||
							!t ||
							("\ufeff" === t[0] &&
								((t = t.slice(1)),
								"function" == typeof this.options.stripBOM &&
									this.options.stripBOM()),
							(this.pass = !0)),
						t
					);
				}),
				(StripBOMWrapper.prototype.end = function () {
					return this.decoder.end();
				});
		},
		function (e, t, n) {
			"use strict";
			for (
				var a = [n(104), n(105), n(106), n(107), n(108), n(109), n(110), n(111)], i = 0;
				i < a.length;
				i++
			) {
				e = a[i];
				for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
			}
		},
		function (e, t, n) {
			"use strict";
			var a = n(12).Buffer;
			function InternalCodec(e, t) {
				(this.enc = e.encodingName),
					(this.bomAware = e.bomAware),
					"base64" === this.enc
						? (this.encoder = InternalEncoderBase64)
						: "cesu8" === this.enc &&
						  ((this.enc = "utf8"),
						  (this.encoder = InternalEncoderCesu8),
						  "💩" !== a.from("eda0bdedb2a9", "hex").toString() &&
								((this.decoder = InternalDecoderCesu8),
								(this.defaultCharUnicode = t.defaultCharUnicode)));
			}
			(e.exports = {
				utf8: { type: "_internal", bomAware: !0 },
				cesu8: { type: "_internal", bomAware: !0 },
				unicode11utf8: "utf8",
				ucs2: { type: "_internal", bomAware: !0 },
				utf16le: "ucs2",
				binary: { type: "_internal" },
				base64: { type: "_internal" },
				hex: { type: "_internal" },
				_internal: InternalCodec,
			}),
				(InternalCodec.prototype.encoder = InternalEncoder),
				(InternalCodec.prototype.decoder = InternalDecoder);
			var i = n(48).StringDecoder;
			function InternalDecoder(e, t) {
				i.call(this, t.enc);
			}
			function InternalEncoder(e, t) {
				this.enc = t.enc;
			}
			function InternalEncoderBase64(e, t) {
				this.prevStr = "";
			}
			function InternalEncoderCesu8(e, t) {}
			function InternalDecoderCesu8(e, t) {
				(this.acc = 0),
					(this.contBytes = 0),
					(this.accBytes = 0),
					(this.defaultCharUnicode = t.defaultCharUnicode);
			}
			i.prototype.end || (i.prototype.end = function () {}),
				(InternalDecoder.prototype = i.prototype),
				(InternalEncoder.prototype.write = function (e) {
					return a.from(e, this.enc);
				}),
				(InternalEncoder.prototype.end = function () {}),
				(InternalEncoderBase64.prototype.write = function (e) {
					var t = (e = this.prevStr + e).length - (e.length % 4);
					return (this.prevStr = e.slice(t)), (e = e.slice(0, t)), a.from(e, "base64");
				}),
				(InternalEncoderBase64.prototype.end = function () {
					return a.from(this.prevStr, "base64");
				}),
				(InternalEncoderCesu8.prototype.write = function (e) {
					for (var t = a.alloc(3 * e.length), n = 0, i = 0; i < e.length; i++) {
						var r = e.charCodeAt(i);
						r < 128
							? (t[n++] = r)
							: r < 2048
							? ((t[n++] = 192 + (r >>> 6)), (t[n++] = 128 + (63 & r)))
							: ((t[n++] = 224 + (r >>> 12)),
							  (t[n++] = 128 + ((r >>> 6) & 63)),
							  (t[n++] = 128 + (63 & r)));
					}
					return t.slice(0, n);
				}),
				(InternalEncoderCesu8.prototype.end = function () {}),
				(InternalDecoderCesu8.prototype.write = function (e) {
					for (
						var t = this.acc, n = this.contBytes, a = this.accBytes, i = "", r = 0;
						r < e.length;
						r++
					) {
						var o = e[r];
						128 != (192 & o)
							? (n > 0 && ((i += this.defaultCharUnicode), (n = 0)),
							  o < 128
									? (i += String.fromCharCode(o))
									: o < 224
									? ((t = 31 & o), (n = 1), (a = 1))
									: o < 240
									? ((t = 15 & o), (n = 2), (a = 1))
									: (i += this.defaultCharUnicode))
							: n > 0
							? ((t = (t << 6) | (63 & o)),
							  a++,
							  0 === --n &&
									(i +=
										(2 === a && t < 128 && t > 0) || (3 === a && t < 2048)
											? this.defaultCharUnicode
											: String.fromCharCode(t)))
							: (i += this.defaultCharUnicode);
					}
					return (this.acc = t), (this.contBytes = n), (this.accBytes = a), i;
				}),
				(InternalDecoderCesu8.prototype.end = function () {
					var e = 0;
					return this.contBytes > 0 && (e += this.defaultCharUnicode), e;
				});
		},
		function (e, t, n) {
			"use strict";
			var a = n(12).Buffer;
			function Utf16BECodec() {}
			function Utf16BEEncoder() {}
			function Utf16BEDecoder() {
				this.overflowByte = -1;
			}
			function Utf16Codec(e, t) {
				this.iconv = t;
			}
			function Utf16Encoder(e, t) {
				void 0 === (e = e || {}).addBOM && (e.addBOM = !0),
					(this.encoder = t.iconv.getEncoder("utf-16le", e));
			}
			function Utf16Decoder(e, t) {
				(this.decoder = null),
					(this.initialBytes = []),
					(this.initialBytesLen = 0),
					(this.options = e || {}),
					(this.iconv = t.iconv);
			}
			function detectEncoding(e, t) {
				var n = t || "utf-16le";
				if (e.length >= 2)
					if (254 == e[0] && 255 == e[1]) n = "utf-16be";
					else if (255 == e[0] && 254 == e[1]) n = "utf-16le";
					else {
						for (
							var a = 0, i = 0, r = Math.min(e.length - (e.length % 2), 64), o = 0;
							o < r;
							o += 2
						)
							0 === e[o] && 0 !== e[o + 1] && i++,
								0 !== e[o] && 0 === e[o + 1] && a++;
						i > a ? (n = "utf-16be") : i < a && (n = "utf-16le");
					}
				return n;
			}
			(t.utf16be = Utf16BECodec),
				(Utf16BECodec.prototype.encoder = Utf16BEEncoder),
				(Utf16BECodec.prototype.decoder = Utf16BEDecoder),
				(Utf16BECodec.prototype.bomAware = !0),
				(Utf16BEEncoder.prototype.write = function (e) {
					for (var t = a.from(e, "ucs2"), n = 0; n < t.length; n += 2) {
						var i = t[n];
						(t[n] = t[n + 1]), (t[n + 1] = i);
					}
					return t;
				}),
				(Utf16BEEncoder.prototype.end = function () {}),
				(Utf16BEDecoder.prototype.write = function (e) {
					if (0 == e.length) return "";
					var t = a.alloc(e.length + 1),
						n = 0,
						i = 0;
					for (
						-1 !== this.overflowByte &&
						((t[0] = e[0]), (t[1] = this.overflowByte), (n = 1), (i = 2));
						n < e.length - 1;
						n += 2, i += 2
					)
						(t[i] = e[n + 1]), (t[i + 1] = e[n]);
					return (
						(this.overflowByte = n == e.length - 1 ? e[e.length - 1] : -1),
						t.slice(0, i).toString("ucs2")
					);
				}),
				(Utf16BEDecoder.prototype.end = function () {}),
				(t.utf16 = Utf16Codec),
				(Utf16Codec.prototype.encoder = Utf16Encoder),
				(Utf16Codec.prototype.decoder = Utf16Decoder),
				(Utf16Encoder.prototype.write = function (e) {
					return this.encoder.write(e);
				}),
				(Utf16Encoder.prototype.end = function () {
					return this.encoder.end();
				}),
				(Utf16Decoder.prototype.write = function (e) {
					if (!this.decoder) {
						if (
							(this.initialBytes.push(e),
							(this.initialBytesLen += e.length),
							this.initialBytesLen < 16)
						)
							return "";
						var t = detectEncoding(
							(e = a.concat(this.initialBytes)),
							this.options.defaultEncoding
						);
						(this.decoder = this.iconv.getDecoder(t, this.options)),
							(this.initialBytes.length = this.initialBytesLen = 0);
					}
					return this.decoder.write(e);
				}),
				(Utf16Decoder.prototype.end = function () {
					if (!this.decoder) {
						var e = a.concat(this.initialBytes),
							t = detectEncoding(e, this.options.defaultEncoding);
						this.decoder = this.iconv.getDecoder(t, this.options);
						var n = this.decoder.write(e),
							i = this.decoder.end();
						return i ? n + i : n;
					}
					return this.decoder.end();
				});
		},
		function (e, t, n) {
			"use strict";
			var a = n(12).Buffer;
			function Utf7Codec(e, t) {
				this.iconv = t;
			}
			(t.utf7 = Utf7Codec),
				(t.unicode11utf7 = "utf7"),
				(Utf7Codec.prototype.encoder = Utf7Encoder),
				(Utf7Codec.prototype.decoder = Utf7Decoder),
				(Utf7Codec.prototype.bomAware = !0);
			var i = /[^A-Za-z0-9'\(\),-\.\/:\? \n\r\t]+/g;
			function Utf7Encoder(e, t) {
				this.iconv = t.iconv;
			}
			function Utf7Decoder(e, t) {
				(this.iconv = t.iconv), (this.inBase64 = !1), (this.base64Accum = "");
			}
			(Utf7Encoder.prototype.write = function (e) {
				return a.from(
					e.replace(
						i,
						function (e) {
							return (
								"+" +
								("+" === e
									? ""
									: this.iconv
											.encode(e, "utf16-be")
											.toString("base64")
											.replace(/=+$/, "")) +
								"-"
							);
						}.bind(this)
					)
				);
			}),
				(Utf7Encoder.prototype.end = function () {});
			for (var r = /[A-Za-z0-9\/+]/, o = [], s = 0; s < 256; s++)
				o[s] = r.test(String.fromCharCode(s));
			var c = "+".charCodeAt(0),
				p = "-".charCodeAt(0),
				l = "&".charCodeAt(0);
			function Utf7IMAPCodec(e, t) {
				this.iconv = t;
			}
			function Utf7IMAPEncoder(e, t) {
				(this.iconv = t.iconv),
					(this.inBase64 = !1),
					(this.base64Accum = a.alloc(6)),
					(this.base64AccumIdx = 0);
			}
			function Utf7IMAPDecoder(e, t) {
				(this.iconv = t.iconv), (this.inBase64 = !1), (this.base64Accum = "");
			}
			(Utf7Decoder.prototype.write = function (e) {
				for (
					var t = "", n = 0, i = this.inBase64, r = this.base64Accum, s = 0;
					s < e.length;
					s++
				)
					if (i) {
						if (!o[e[s]]) {
							if (s == n && e[s] == p) t += "+";
							else {
								var l = r + e.slice(n, s).toString();
								t += this.iconv.decode(a.from(l, "base64"), "utf16-be");
							}
							e[s] != p && s--, (n = s + 1), (i = !1), (r = "");
						}
					} else
						e[s] == c &&
							((t += this.iconv.decode(e.slice(n, s), "ascii")),
							(n = s + 1),
							(i = !0));
				if (i) {
					var u = (l = r + e.slice(n).toString()).length - (l.length % 8);
					(r = l.slice(u)),
						(l = l.slice(0, u)),
						(t += this.iconv.decode(a.from(l, "base64"), "utf16-be"));
				} else t += this.iconv.decode(e.slice(n), "ascii");
				return (this.inBase64 = i), (this.base64Accum = r), t;
			}),
				(Utf7Decoder.prototype.end = function () {
					var e = "";
					return (
						this.inBase64 &&
							this.base64Accum.length > 0 &&
							(e = this.iconv.decode(a.from(this.base64Accum, "base64"), "utf16-be")),
						(this.inBase64 = !1),
						(this.base64Accum = ""),
						e
					);
				}),
				(t.utf7imap = Utf7IMAPCodec),
				(Utf7IMAPCodec.prototype.encoder = Utf7IMAPEncoder),
				(Utf7IMAPCodec.prototype.decoder = Utf7IMAPDecoder),
				(Utf7IMAPCodec.prototype.bomAware = !0),
				(Utf7IMAPEncoder.prototype.write = function (e) {
					for (
						var t = this.inBase64,
							n = this.base64Accum,
							i = this.base64AccumIdx,
							r = a.alloc(5 * e.length + 10),
							o = 0,
							s = 0;
						s < e.length;
						s++
					) {
						var c = e.charCodeAt(s);
						32 <= c && c <= 126
							? (t &&
									(i > 0 &&
										((o += r.write(
											n
												.slice(0, i)
												.toString("base64")
												.replace(/\//g, ",")
												.replace(/=+$/, ""),
											o
										)),
										(i = 0)),
									(r[o++] = p),
									(t = !1)),
							  t || ((r[o++] = c), c === l && (r[o++] = p)))
							: (t || ((r[o++] = l), (t = !0)),
							  t &&
									((n[i++] = c >> 8),
									(n[i++] = 255 & c),
									i == n.length &&
										((o += r.write(
											n.toString("base64").replace(/\//g, ","),
											o
										)),
										(i = 0))));
					}
					return (this.inBase64 = t), (this.base64AccumIdx = i), r.slice(0, o);
				}),
				(Utf7IMAPEncoder.prototype.end = function () {
					var e = a.alloc(10),
						t = 0;
					return (
						this.inBase64 &&
							(this.base64AccumIdx > 0 &&
								((t += e.write(
									this.base64Accum
										.slice(0, this.base64AccumIdx)
										.toString("base64")
										.replace(/\//g, ",")
										.replace(/=+$/, ""),
									t
								)),
								(this.base64AccumIdx = 0)),
							(e[t++] = p),
							(this.inBase64 = !1)),
						e.slice(0, t)
					);
				});
			var u = o.slice();
			(u[",".charCodeAt(0)] = !0),
				(Utf7IMAPDecoder.prototype.write = function (e) {
					for (
						var t = "", n = 0, i = this.inBase64, r = this.base64Accum, o = 0;
						o < e.length;
						o++
					)
						if (i) {
							if (!u[e[o]]) {
								if (o == n && e[o] == p) t += "&";
								else {
									var s = r + e.slice(n, o).toString().replace(/,/g, "/");
									t += this.iconv.decode(a.from(s, "base64"), "utf16-be");
								}
								e[o] != p && o--, (n = o + 1), (i = !1), (r = "");
							}
						} else
							e[o] == l &&
								((t += this.iconv.decode(e.slice(n, o), "ascii")),
								(n = o + 1),
								(i = !0));
					if (i) {
						var c =
							(s = r + e.slice(n).toString().replace(/,/g, "/")).length -
							(s.length % 8);
						(r = s.slice(c)),
							(s = s.slice(0, c)),
							(t += this.iconv.decode(a.from(s, "base64"), "utf16-be"));
					} else t += this.iconv.decode(e.slice(n), "ascii");
					return (this.inBase64 = i), (this.base64Accum = r), t;
				}),
				(Utf7IMAPDecoder.prototype.end = function () {
					var e = "";
					return (
						this.inBase64 &&
							this.base64Accum.length > 0 &&
							(e = this.iconv.decode(a.from(this.base64Accum, "base64"), "utf16-be")),
						(this.inBase64 = !1),
						(this.base64Accum = ""),
						e
					);
				});
		},
		function (e, t, n) {
			"use strict";
			var a = n(12).Buffer;
			function SBCSCodec(e, t) {
				if (!e) throw new Error("SBCS codec is called without the data.");
				if (!e.chars || (128 !== e.chars.length && 256 !== e.chars.length))
					throw new Error(
						"Encoding '" +
							e.type +
							"' has incorrect 'chars' (must be of len 128 or 256)"
					);
				if (128 === e.chars.length) {
					for (var n = "", i = 0; i < 128; i++) n += String.fromCharCode(i);
					e.chars = n + e.chars;
				}
				this.decodeBuf = a.from(e.chars, "ucs2");
				var r = a.alloc(65536, t.defaultCharSingleByte.charCodeAt(0));
				for (i = 0; i < e.chars.length; i++) r[e.chars.charCodeAt(i)] = i;
				this.encodeBuf = r;
			}
			function SBCSEncoder(e, t) {
				this.encodeBuf = t.encodeBuf;
			}
			function SBCSDecoder(e, t) {
				this.decodeBuf = t.decodeBuf;
			}
			(t._sbcs = SBCSCodec),
				(SBCSCodec.prototype.encoder = SBCSEncoder),
				(SBCSCodec.prototype.decoder = SBCSDecoder),
				(SBCSEncoder.prototype.write = function (e) {
					for (var t = a.alloc(e.length), n = 0; n < e.length; n++)
						t[n] = this.encodeBuf[e.charCodeAt(n)];
					return t;
				}),
				(SBCSEncoder.prototype.end = function () {}),
				(SBCSDecoder.prototype.write = function (e) {
					for (
						var t = this.decodeBuf, n = a.alloc(2 * e.length), i = 0, r = 0, o = 0;
						o < e.length;
						o++
					)
						(i = 2 * e[o]), (n[(r = 2 * o)] = t[i]), (n[r + 1] = t[i + 1]);
					return n.toString("ucs2");
				}),
				(SBCSDecoder.prototype.end = function () {});
		},
		function (e, t, n) {
			"use strict";
			e.exports = {
				10029: "maccenteuro",
				maccenteuro: {
					type: "_sbcs",
					chars:
						"ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ",
				},
				808: "cp808",
				ibm808: "cp808",
				cp808: {
					type: "_sbcs",
					chars:
						"АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№€■ ",
				},
				mik: {
					type: "_sbcs",
					chars:
						"АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя└┴┬├─┼╣║╚╔╩╦╠═╬┐░▒▓│┤№§╗╝┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ",
				},
				ascii8bit: "ascii",
				usascii: "ascii",
				ansix34: "ascii",
				ansix341968: "ascii",
				ansix341986: "ascii",
				csascii: "ascii",
				cp367: "ascii",
				ibm367: "ascii",
				isoir6: "ascii",
				iso646us: "ascii",
				iso646irv: "ascii",
				us: "ascii",
				latin1: "iso88591",
				latin2: "iso88592",
				latin3: "iso88593",
				latin4: "iso88594",
				latin5: "iso88599",
				latin6: "iso885910",
				latin7: "iso885913",
				latin8: "iso885914",
				latin9: "iso885915",
				latin10: "iso885916",
				csisolatin1: "iso88591",
				csisolatin2: "iso88592",
				csisolatin3: "iso88593",
				csisolatin4: "iso88594",
				csisolatincyrillic: "iso88595",
				csisolatinarabic: "iso88596",
				csisolatingreek: "iso88597",
				csisolatinhebrew: "iso88598",
				csisolatin5: "iso88599",
				csisolatin6: "iso885910",
				l1: "iso88591",
				l2: "iso88592",
				l3: "iso88593",
				l4: "iso88594",
				l5: "iso88599",
				l6: "iso885910",
				l7: "iso885913",
				l8: "iso885914",
				l9: "iso885915",
				l10: "iso885916",
				isoir14: "iso646jp",
				isoir57: "iso646cn",
				isoir100: "iso88591",
				isoir101: "iso88592",
				isoir109: "iso88593",
				isoir110: "iso88594",
				isoir144: "iso88595",
				isoir127: "iso88596",
				isoir126: "iso88597",
				isoir138: "iso88598",
				isoir148: "iso88599",
				isoir157: "iso885910",
				isoir166: "tis620",
				isoir179: "iso885913",
				isoir199: "iso885914",
				isoir203: "iso885915",
				isoir226: "iso885916",
				cp819: "iso88591",
				ibm819: "iso88591",
				cyrillic: "iso88595",
				arabic: "iso88596",
				arabic8: "iso88596",
				ecma114: "iso88596",
				asmo708: "iso88596",
				greek: "iso88597",
				greek8: "iso88597",
				ecma118: "iso88597",
				elot928: "iso88597",
				hebrew: "iso88598",
				hebrew8: "iso88598",
				turkish: "iso88599",
				turkish8: "iso88599",
				thai: "iso885911",
				thai8: "iso885911",
				celtic: "iso885914",
				celtic8: "iso885914",
				isoceltic: "iso885914",
				tis6200: "tis620",
				tis62025291: "tis620",
				tis62025330: "tis620",
				1e4: "macroman",
				10006: "macgreek",
				10007: "maccyrillic",
				10079: "maciceland",
				10081: "macturkish",
				cspc8codepage437: "cp437",
				cspc775baltic: "cp775",
				cspc850multilingual: "cp850",
				cspcp852: "cp852",
				cspc862latinhebrew: "cp862",
				cpgr: "cp869",
				msee: "cp1250",
				mscyrl: "cp1251",
				msansi: "cp1252",
				msgreek: "cp1253",
				msturk: "cp1254",
				mshebr: "cp1255",
				msarab: "cp1256",
				winbaltrim: "cp1257",
				cp20866: "koi8r",
				20866: "koi8r",
				ibm878: "koi8r",
				cskoi8r: "koi8r",
				cp21866: "koi8u",
				21866: "koi8u",
				ibm1168: "koi8u",
				strk10482002: "rk1048",
				tcvn5712: "tcvn",
				tcvn57121: "tcvn",
				gb198880: "iso646cn",
				cn: "iso646cn",
				csiso14jisc6220ro: "iso646jp",
				jisc62201969ro: "iso646jp",
				jp: "iso646jp",
				cshproman8: "hproman8",
				r8: "hproman8",
				roman8: "hproman8",
				xroman8: "hproman8",
				ibm1051: "hproman8",
				mac: "macintosh",
				csmacintosh: "macintosh",
			};
		},
		function (e, t, n) {
			"use strict";
			e.exports = {
				437: "cp437",
				737: "cp737",
				775: "cp775",
				850: "cp850",
				852: "cp852",
				855: "cp855",
				856: "cp856",
				857: "cp857",
				858: "cp858",
				860: "cp860",
				861: "cp861",
				862: "cp862",
				863: "cp863",
				864: "cp864",
				865: "cp865",
				866: "cp866",
				869: "cp869",
				874: "windows874",
				922: "cp922",
				1046: "cp1046",
				1124: "cp1124",
				1125: "cp1125",
				1129: "cp1129",
				1133: "cp1133",
				1161: "cp1161",
				1162: "cp1162",
				1163: "cp1163",
				1250: "windows1250",
				1251: "windows1251",
				1252: "windows1252",
				1253: "windows1253",
				1254: "windows1254",
				1255: "windows1255",
				1256: "windows1256",
				1257: "windows1257",
				1258: "windows1258",
				28591: "iso88591",
				28592: "iso88592",
				28593: "iso88593",
				28594: "iso88594",
				28595: "iso88595",
				28596: "iso88596",
				28597: "iso88597",
				28598: "iso88598",
				28599: "iso88599",
				28600: "iso885910",
				28601: "iso885911",
				28603: "iso885913",
				28604: "iso885914",
				28605: "iso885915",
				28606: "iso885916",
				windows874: {
					type: "_sbcs",
					chars:
						"€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����",
				},
				win874: "windows874",
				cp874: "windows874",
				windows1250: {
					type: "_sbcs",
					chars:
						"€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙",
				},
				win1250: "windows1250",
				cp1250: "windows1250",
				windows1251: {
					type: "_sbcs",
					chars:
						"ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя",
				},
				win1251: "windows1251",
				cp1251: "windows1251",
				windows1252: {
					type: "_sbcs",
					chars:
						"€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ",
				},
				win1252: "windows1252",
				cp1252: "windows1252",
				windows1253: {
					type: "_sbcs",
					chars:
						"€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�",
				},
				win1253: "windows1253",
				cp1253: "windows1253",
				windows1254: {
					type: "_sbcs",
					chars:
						"€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ",
				},
				win1254: "windows1254",
				cp1254: "windows1254",
				windows1255: {
					type: "_sbcs",
					chars:
						"€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹֺֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�",
				},
				win1255: "windows1255",
				cp1255: "windows1255",
				windows1256: {
					type: "_sbcs",
					chars:
						"€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے",
				},
				win1256: "windows1256",
				cp1256: "windows1256",
				windows1257: {
					type: "_sbcs",
					chars:
						"€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙",
				},
				win1257: "windows1257",
				cp1257: "windows1257",
				windows1258: {
					type: "_sbcs",
					chars:
						"€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ",
				},
				win1258: "windows1258",
				cp1258: "windows1258",
				iso88591: {
					type: "_sbcs",
					chars:
						" ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ",
				},
				cp28591: "iso88591",
				iso88592: {
					type: "_sbcs",
					chars:
						" Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙",
				},
				cp28592: "iso88592",
				iso88593: {
					type: "_sbcs",
					chars:
						" Ħ˘£¤�Ĥ§¨İŞĞĴ­�Ż°ħ²³´µĥ·¸ışğĵ½�żÀÁÂ�ÄĊĈÇÈÉÊËÌÍÎÏ�ÑÒÓÔĠÖ×ĜÙÚÛÜŬŜßàáâ�äċĉçèéêëìíîï�ñòóôġö÷ĝùúûüŭŝ˙",
				},
				cp28593: "iso88593",
				iso88594: {
					type: "_sbcs",
					chars:
						" ĄĸŖ¤ĨĻ§¨ŠĒĢŦ­Ž¯°ą˛ŗ´ĩļˇ¸šēģŧŊžŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎĪĐŅŌĶÔÕÖ×ØŲÚÛÜŨŪßāáâãäåæįčéęëėíîīđņōķôõö÷øųúûüũū˙",
				},
				cp28594: "iso88594",
				iso88595: {
					type: "_sbcs",
					chars:
						" ЁЂЃЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђѓєѕіїјљњћќ§ўџ",
				},
				cp28595: "iso88595",
				iso88596: {
					type: "_sbcs",
					chars:
						" ���¤�������،­�������������؛���؟�ءآأؤإئابةتثجحخدذرزسشصضطظعغ�����ـفقكلمنهوىيًٌٍَُِّْ�������������",
				},
				cp28596: "iso88596",
				iso88597: {
					type: "_sbcs",
					chars:
						" ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�",
				},
				cp28597: "iso88597",
				iso88598: {
					type: "_sbcs",
					chars:
						" �¢£¤¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾��������������������������������‗אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�",
				},
				cp28598: "iso88598",
				iso88599: {
					type: "_sbcs",
					chars:
						" ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ",
				},
				cp28599: "iso88599",
				iso885910: {
					type: "_sbcs",
					chars:
						" ĄĒĢĪĨĶ§ĻĐŠŦŽ­ŪŊ°ąēģīĩķ·ļđšŧž―ūŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎÏÐŅŌÓÔÕÖŨØŲÚÛÜÝÞßāáâãäåæįčéęëėíîïðņōóôõöũøųúûüýþĸ",
				},
				cp28600: "iso885910",
				iso885911: {
					type: "_sbcs",
					chars:
						" กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����",
				},
				cp28601: "iso885911",
				iso885913: {
					type: "_sbcs",
					chars:
						" ”¢£¤„¦§Ø©Ŗ«¬­®Æ°±²³“µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž’",
				},
				cp28603: "iso885913",
				iso885914: {
					type: "_sbcs",
					chars:
						" Ḃḃ£ĊċḊ§Ẁ©ẂḋỲ­®ŸḞḟĠġṀṁ¶ṖẁṗẃṠỳẄẅṡÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŴÑÒÓÔÕÖṪØÙÚÛÜÝŶßàáâãäåæçèéêëìíîïŵñòóôõöṫøùúûüýŷÿ",
				},
				cp28604: "iso885914",
				iso885915: {
					type: "_sbcs",
					chars:
						" ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ",
				},
				cp28605: "iso885915",
				iso885916: {
					type: "_sbcs",
					chars:
						" ĄąŁ€„Š§š©Ș«Ź­źŻ°±ČłŽ”¶·žčș»ŒœŸżÀÁÂĂÄĆÆÇÈÉÊËÌÍÎÏĐŃÒÓÔŐÖŚŰÙÚÛÜĘȚßàáâăäćæçèéêëìíîïđńòóôőöśűùúûüęțÿ",
				},
				cp28606: "iso885916",
				cp437: {
					type: "_sbcs",
					chars:
						"ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ",
				},
				ibm437: "cp437",
				csibm437: "cp437",
				cp737: {
					type: "_sbcs",
					chars:
						"ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ ",
				},
				ibm737: "cp737",
				csibm737: "cp737",
				cp775: {
					type: "_sbcs",
					chars:
						"ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ ",
				},
				ibm775: "cp775",
				csibm775: "cp775",
				cp850: {
					type: "_sbcs",
					chars:
						"ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ ",
				},
				ibm850: "cp850",
				csibm850: "cp850",
				cp852: {
					type: "_sbcs",
					chars:
						"ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ ",
				},
				ibm852: "cp852",
				csibm852: "cp852",
				cp855: {
					type: "_sbcs",
					chars:
						"ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ ",
				},
				ibm855: "cp855",
				csibm855: "cp855",
				cp856: {
					type: "_sbcs",
					chars:
						"אבגדהוזחטיךכלםמןנסעףפץצקרשת�£�×����������®¬½¼�«»░▒▓│┤���©╣║╗╝¢¥┐└┴┬├─┼��╚╔╩╦╠═╬¤���������┘┌█▄¦�▀������µ�������¯´­±‗¾¶§÷¸°¨·¹³²■ ",
				},
				ibm856: "cp856",
				csibm856: "cp856",
				cp857: {
					type: "_sbcs",
					chars:
						"ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ ",
				},
				ibm857: "cp857",
				csibm857: "cp857",
				cp858: {
					type: "_sbcs",
					chars:
						"ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ ",
				},
				ibm858: "cp858",
				csibm858: "cp858",
				cp860: {
					type: "_sbcs",
					chars:
						"ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ",
				},
				ibm860: "cp860",
				csibm860: "cp860",
				cp861: {
					type: "_sbcs",
					chars:
						"ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ",
				},
				ibm861: "cp861",
				csibm861: "cp861",
				cp862: {
					type: "_sbcs",
					chars:
						"אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ",
				},
				ibm862: "cp862",
				csibm862: "cp862",
				cp863: {
					type: "_sbcs",
					chars:
						"ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ",
				},
				ibm863: "cp863",
				csibm863: "cp863",
				cp864: {
					type: "_sbcs",
					chars:
						"\0\b\t\n\v\f\r !\"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�",
				},
				ibm864: "cp864",
				csibm864: "cp864",
				cp865: {
					type: "_sbcs",
					chars:
						"ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ",
				},
				ibm865: "cp865",
				csibm865: "cp865",
				cp866: {
					type: "_sbcs",
					chars:
						"АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ ",
				},
				ibm866: "cp866",
				csibm866: "cp866",
				cp869: {
					type: "_sbcs",
					chars:
						"������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ ",
				},
				ibm869: "cp869",
				csibm869: "cp869",
				cp922: {
					type: "_sbcs",
					chars:
						" ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ",
				},
				ibm922: "cp922",
				csibm922: "cp922",
				cp1046: {
					type: "_sbcs",
					chars:
						"ﺈ×÷ﹱ■│─┐┌└┘ﹹﹻﹽﹿﹷﺊﻰﻳﻲﻎﻏﻐﻶﻸﻺﻼ ¤ﺋﺑﺗﺛﺟﺣ،­ﺧﺳ٠١٢٣٤٥٦٧٨٩ﺷ؛ﺻﺿﻊ؟ﻋءآأؤإئابةتثجحخدذرزسشصضطﻇعغﻌﺂﺄﺎﻓـفقكلمنهوىيًٌٍَُِّْﻗﻛﻟﻵﻷﻹﻻﻣﻧﻬﻩ�",
				},
				ibm1046: "cp1046",
				csibm1046: "cp1046",
				cp1124: {
					type: "_sbcs",
					chars:
						" ЁЂҐЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђґєѕіїјљњћќ§ўџ",
				},
				ibm1124: "cp1124",
				csibm1124: "cp1124",
				cp1125: {
					type: "_sbcs",
					chars:
						"АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ ",
				},
				ibm1125: "cp1125",
				csibm1125: "cp1125",
				cp1129: {
					type: "_sbcs",
					chars:
						" ¡¢£¤¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ",
				},
				ibm1129: "cp1129",
				csibm1129: "cp1129",
				cp1133: {
					type: "_sbcs",
					chars:
						" ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ���ຯະາຳິີຶືຸູຼັົຽ���ເແໂໃໄ່້໊໋໌ໍໆ�ໜໝ₭����������������໐໑໒໓໔໕໖໗໘໙��¢¬¦�",
				},
				ibm1133: "cp1133",
				csibm1133: "cp1133",
				cp1161: {
					type: "_sbcs",
					chars:
						"��������������������������������่กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู้๊๋€฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛¢¬¦ ",
				},
				ibm1161: "cp1161",
				csibm1161: "cp1161",
				cp1162: {
					type: "_sbcs",
					chars:
						"€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����",
				},
				ibm1162: "cp1162",
				csibm1162: "cp1162",
				cp1163: {
					type: "_sbcs",
					chars:
						" ¡¢£€¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ",
				},
				ibm1163: "cp1163",
				csibm1163: "cp1163",
				maccroatian: {
					type: "_sbcs",
					chars:
						"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊�©⁄¤‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ",
				},
				maccyrillic: {
					type: "_sbcs",
					chars:
						"АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤",
				},
				macgreek: {
					type: "_sbcs",
					chars:
						"Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�",
				},
				maciceland: {
					type: "_sbcs",
					chars:
						"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
				},
				macroman: {
					type: "_sbcs",
					chars:
						"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
				},
				macromania: {
					type: "_sbcs",
					chars:
						"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂŞ∞±≤≥¥µ∂∑∏π∫ªºΩăş¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›Ţţ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
				},
				macthai: {
					type: "_sbcs",
					chars:
						"«»…“”�•‘’� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู\ufeff​–—฿เแโใไๅๆ็่้๊๋์ํ™๏๐๑๒๓๔๕๖๗๘๙®©����",
				},
				macturkish: {
					type: "_sbcs",
					chars:
						"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ",
				},
				macukraine: {
					type: "_sbcs",
					chars:
						"АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤",
				},
				koi8r: {
					type: "_sbcs",
					chars:
						"─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ё╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡Ё╢╣╤╥╦╧╨╩╪╫╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ",
				},
				koi8u: {
					type: "_sbcs",
					chars:
						"─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґ╝╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪Ґ╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ",
				},
				koi8ru: {
					type: "_sbcs",
					chars:
						"─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґў╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪ҐЎ©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ",
				},
				koi8t: {
					type: "_sbcs",
					chars:
						"қғ‚Ғ„…†‡�‰ҳ‹ҲҷҶ�Қ‘’“”•–—�™�›�����ӯӮё¤ӣ¦§���«¬­®�°±²Ё�Ӣ¶·�№�»���©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ",
				},
				armscii8: {
					type: "_sbcs",
					chars:
						" �և։)(»«—.՝,-֊…՜՛՞ԱաԲբԳգԴդԵեԶզԷէԸըԹթԺժԻիԼլԽխԾծԿկՀհՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռՍսՎվՏտՐրՑցՒւՓփՔքՕօՖֆ՚�",
				},
				rk1048: {
					type: "_sbcs",
					chars:
						"ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя",
				},
				tcvn: {
					type: "_sbcs",
					chars:
						"\0ÚỤỪỬỮ\b\t\n\v\f\rỨỰỲỶỸÝỴ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÀẢÃÁẠẶẬÈẺẼÉẸỆÌỈĨÍỊÒỎÕÓỌỘỜỞỠỚỢÙỦŨ ĂÂÊÔƠƯĐăâêôơưđẶ̀̀̉̃́àảãáạẲằẳẵắẴẮẦẨẪẤỀặầẩẫấậèỂẻẽéẹềểễếệìỉỄẾỒĩíịòỔỏõóọồổỗốộờởỡớợùỖủũúụừửữứựỳỷỹýỵỐ",
				},
				georgianacademy: {
					type: "_sbcs",
					chars:
						"‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶçèéêëìíîïðñòóôõö÷øùúûüýþÿ",
				},
				georgianps: {
					type: "_sbcs",
					chars:
						"‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵæçèéêëìíîïðñòóôõö÷øùúûüýþÿ",
				},
				pt154: {
					type: "_sbcs",
					chars:
						"ҖҒӮғ„…ҶҮҲүҠӢҢҚҺҸҗ‘’“”•–—ҳҷҡӣңқһҹ ЎўЈӨҘҰ§Ё©Ә«¬ӯ®Ҝ°ұІіҙө¶·ё№ә»јҪҫҝАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя",
				},
				viscii: {
					type: "_sbcs",
					chars:
						"\0ẲẴẪ\b\t\n\v\f\rỶỸỴ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ẠẮẰẶẤẦẨẬẼẸẾỀỂỄỆỐỒỔỖỘỢỚỜỞỊỎỌỈỦŨỤỲÕắằặấầẩậẽẹếềểễệốồổỗỠƠộờởịỰỨỪỬơớƯÀÁÂÃẢĂẳẵÈÉÊẺÌÍĨỳĐứÒÓÔạỷừửÙÚỹỵÝỡưàáâãảăữẫèéêẻìíĩỉđựòóôõỏọụùúũủýợỮ",
				},
				iso646cn: {
					type: "_sbcs",
					chars:
						"\0\b\t\n\v\f\r !\"#¥%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������",
				},
				iso646jp: {
					type: "_sbcs",
					chars:
						"\0\b\t\n\v\f\r !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[¥]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������",
				},
				hproman8: {
					type: "_sbcs",
					chars:
						" ÀÂÈÊËÎÏ´ˋˆ¨˜ÙÛ₤¯Ýý°ÇçÑñ¡¿¤£¥§ƒ¢âêôûáéóúàèòùäëöüÅîØÆåíøæÄìÖÜÉïßÔÁÃãÐðÍÌÓÒÕõŠšÚŸÿÞþ·µ¶¾—¼½ªº«■»±�",
				},
				macintosh: {
					type: "_sbcs",
					chars:
						"ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ",
				},
				ascii: {
					type: "_sbcs",
					chars:
						"��������������������������������������������������������������������������������������������������������������������������������",
				},
				tis620: {
					type: "_sbcs",
					chars:
						"���������������������������������กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����",
				},
			};
		},
		function (e, t, n) {
			"use strict";
			var a = n(12).Buffer;
			t._dbcs = DBCSCodec;
			for (var i = new Array(256), r = 0; r < 256; r++) i[r] = -1;
			function DBCSCodec(e, t) {
				if (((this.encodingName = e.encodingName), !e))
					throw new Error("DBCS codec is called without the data.");
				if (!e.table) throw new Error("Encoding '" + this.encodingName + "' has no data.");
				var n = e.table();
				(this.decodeTables = []),
					(this.decodeTables[0] = i.slice(0)),
					(this.decodeTableSeq = []);
				for (var a = 0; a < n.length; a++) this._addDecodeChunk(n[a]);
				(this.defaultCharUnicode = t.defaultCharUnicode),
					(this.encodeTable = []),
					(this.encodeTableSeq = []);
				var r = {};
				if (e.encodeSkipVals)
					for (a = 0; a < e.encodeSkipVals.length; a++) {
						var o = e.encodeSkipVals[a];
						if ("number" == typeof o) r[o] = !0;
						else for (var s = o.from; s <= o.to; s++) r[s] = !0;
					}
				if ((this._fillEncodeTable(0, 0, r), e.encodeAdd))
					for (var c in e.encodeAdd)
						Object.prototype.hasOwnProperty.call(e.encodeAdd, c) &&
							this._setEncodeChar(c.charCodeAt(0), e.encodeAdd[c]);
				if (
					((this.defCharSB = this.encodeTable[0][t.defaultCharSingleByte.charCodeAt(0)]),
					-1 === this.defCharSB && (this.defCharSB = this.encodeTable[0]["?"]),
					-1 === this.defCharSB && (this.defCharSB = "?".charCodeAt(0)),
					"function" == typeof e.gb18030)
				) {
					this.gb18030 = e.gb18030();
					var p = this.decodeTables.length,
						l = (this.decodeTables[p] = i.slice(0)),
						u = this.decodeTables.length,
						d = (this.decodeTables[u] = i.slice(0));
					for (a = 129; a <= 254; a++) {
						var m = -1e3 - this.decodeTables[0][a],
							f = this.decodeTables[m];
						for (s = 48; s <= 57; s++) f[s] = -1e3 - p;
					}
					for (a = 129; a <= 254; a++) l[a] = -1e3 - u;
					for (a = 48; a <= 57; a++) d[a] = -2;
				}
			}
			function DBCSEncoder(e, t) {
				(this.leadSurrogate = -1),
					(this.seqObj = void 0),
					(this.encodeTable = t.encodeTable),
					(this.encodeTableSeq = t.encodeTableSeq),
					(this.defaultCharSingleByte = t.defCharSB),
					(this.gb18030 = t.gb18030);
			}
			function DBCSDecoder(e, t) {
				(this.nodeIdx = 0),
					(this.prevBuf = a.alloc(0)),
					(this.decodeTables = t.decodeTables),
					(this.decodeTableSeq = t.decodeTableSeq),
					(this.defaultCharUnicode = t.defaultCharUnicode),
					(this.gb18030 = t.gb18030);
			}
			function findIdx(e, t) {
				if (e[0] > t) return -1;
				for (var n = 0, a = e.length; n < a - 1; ) {
					var i = n + Math.floor((a - n + 1) / 2);
					e[i] <= t ? (n = i) : (a = i);
				}
				return n;
			}
			(DBCSCodec.prototype.encoder = DBCSEncoder),
				(DBCSCodec.prototype.decoder = DBCSDecoder),
				(DBCSCodec.prototype._getDecodeTrieNode = function (e) {
					for (var t = []; e > 0; e >>= 8) t.push(255 & e);
					0 == t.length && t.push(0);
					for (var n = this.decodeTables[0], a = t.length - 1; a > 0; a--) {
						var r = n[t[a]];
						if (-1 == r)
							(n[t[a]] = -1e3 - this.decodeTables.length),
								this.decodeTables.push((n = i.slice(0)));
						else {
							if (!(r <= -1e3))
								throw new Error(
									"Overwrite byte in " +
										this.encodingName +
										", addr: " +
										e.toString(16)
								);
							n = this.decodeTables[-1e3 - r];
						}
					}
					return n;
				}),
				(DBCSCodec.prototype._addDecodeChunk = function (e) {
					var t = parseInt(e[0], 16),
						n = this._getDecodeTrieNode(t);
					t &= 255;
					for (var a = 1; a < e.length; a++) {
						var i = e[a];
						if ("string" == typeof i)
							for (var r = 0; r < i.length; ) {
								var o = i.charCodeAt(r++);
								if (55296 <= o && o < 56320) {
									var s = i.charCodeAt(r++);
									if (!(56320 <= s && s < 57344))
										throw new Error(
											"Incorrect surrogate pair in " +
												this.encodingName +
												" at chunk " +
												e[0]
										);
									n[t++] = 65536 + 1024 * (o - 55296) + (s - 56320);
								} else if (4080 < o && o <= 4095) {
									for (var c = 4095 - o + 2, p = [], l = 0; l < c; l++)
										p.push(i.charCodeAt(r++));
									(n[t++] = -10 - this.decodeTableSeq.length),
										this.decodeTableSeq.push(p);
								} else n[t++] = o;
							}
						else {
							if ("number" != typeof i)
								throw new Error(
									"Incorrect type '" +
										typeof i +
										"' given in " +
										this.encodingName +
										" at chunk " +
										e[0]
								);
							var u = n[t - 1] + 1;
							for (r = 0; r < i; r++) n[t++] = u++;
						}
					}
					if (t > 255)
						throw new Error(
							"Incorrect chunk in " +
								this.encodingName +
								" at addr " +
								e[0] +
								": too long" +
								t
						);
				}),
				(DBCSCodec.prototype._getEncodeBucket = function (e) {
					var t = e >> 8;
					return (
						void 0 === this.encodeTable[t] && (this.encodeTable[t] = i.slice(0)),
						this.encodeTable[t]
					);
				}),
				(DBCSCodec.prototype._setEncodeChar = function (e, t) {
					var n = this._getEncodeBucket(e),
						a = 255 & e;
					n[a] <= -10
						? (this.encodeTableSeq[-10 - n[a]][-1] = t)
						: -1 == n[a] && (n[a] = t);
				}),
				(DBCSCodec.prototype._setEncodeSequence = function (e, t) {
					var n,
						a = e[0],
						i = this._getEncodeBucket(a),
						r = 255 & a;
					i[r] <= -10
						? (n = this.encodeTableSeq[-10 - i[r]])
						: ((n = {}),
						  -1 !== i[r] && (n[-1] = i[r]),
						  (i[r] = -10 - this.encodeTableSeq.length),
						  this.encodeTableSeq.push(n));
					for (var o = 1; o < e.length - 1; o++) {
						var s = n[a];
						"object" == typeof s
							? (n = s)
							: ((n = n[a] = {}), void 0 !== s && (n[-1] = s));
					}
					n[(a = e[e.length - 1])] = t;
				}),
				(DBCSCodec.prototype._fillEncodeTable = function (e, t, n) {
					for (var a = this.decodeTables[e], i = 0; i < 256; i++) {
						var r = a[i],
							o = t + i;
						n[o] ||
							(r >= 0
								? this._setEncodeChar(r, o)
								: r <= -1e3
								? this._fillEncodeTable(-1e3 - r, o << 8, n)
								: r <= -10 &&
								  this._setEncodeSequence(this.decodeTableSeq[-10 - r], o));
					}
				}),
				(DBCSEncoder.prototype.write = function (e) {
					for (
						var t = a.alloc(e.length * (this.gb18030 ? 4 : 3)),
							n = this.leadSurrogate,
							i = this.seqObj,
							r = -1,
							o = 0,
							s = 0;
						;

					) {
						if (-1 === r) {
							if (o == e.length) break;
							var c = e.charCodeAt(o++);
						} else {
							c = r;
							r = -1;
						}
						if (55296 <= c && c < 57344)
							if (c < 56320) {
								if (-1 === n) {
									n = c;
									continue;
								}
								(n = c), (c = -1);
							} else
								-1 !== n
									? ((c = 65536 + 1024 * (n - 55296) + (c - 56320)), (n = -1))
									: (c = -1);
						else -1 !== n && ((r = c), (c = -1), (n = -1));
						var p = -1;
						if (void 0 !== i && -1 != c) {
							var l = i[c];
							if ("object" == typeof l) {
								i = l;
								continue;
							}
							"number" == typeof l
								? (p = l)
								: null == l && void 0 !== (l = i[-1]) && ((p = l), (r = c)),
								(i = void 0);
						} else if (c >= 0) {
							var u = this.encodeTable[c >> 8];
							if ((void 0 !== u && (p = u[255 & c]), p <= -10)) {
								i = this.encodeTableSeq[-10 - p];
								continue;
							}
							if (-1 == p && this.gb18030) {
								var d = findIdx(this.gb18030.uChars, c);
								if (-1 != d) {
									p = this.gb18030.gbChars[d] + (c - this.gb18030.uChars[d]);
									(t[s++] = 129 + Math.floor(p / 12600)),
										(p %= 12600),
										(t[s++] = 48 + Math.floor(p / 1260)),
										(p %= 1260),
										(t[s++] = 129 + Math.floor(p / 10)),
										(p %= 10),
										(t[s++] = 48 + p);
									continue;
								}
							}
						}
						-1 === p && (p = this.defaultCharSingleByte),
							p < 256
								? (t[s++] = p)
								: p < 65536
								? ((t[s++] = p >> 8), (t[s++] = 255 & p))
								: ((t[s++] = p >> 16),
								  (t[s++] = (p >> 8) & 255),
								  (t[s++] = 255 & p));
					}
					return (this.seqObj = i), (this.leadSurrogate = n), t.slice(0, s);
				}),
				(DBCSEncoder.prototype.end = function () {
					if (-1 !== this.leadSurrogate || void 0 !== this.seqObj) {
						var e = a.alloc(10),
							t = 0;
						if (this.seqObj) {
							var n = this.seqObj[-1];
							void 0 !== n &&
								(n < 256 ? (e[t++] = n) : ((e[t++] = n >> 8), (e[t++] = 255 & n))),
								(this.seqObj = void 0);
						}
						return (
							-1 !== this.leadSurrogate &&
								((e[t++] = this.defaultCharSingleByte), (this.leadSurrogate = -1)),
							e.slice(0, t)
						);
					}
				}),
				(DBCSEncoder.prototype.findIdx = findIdx),
				(DBCSDecoder.prototype.write = function (e) {
					var t = a.alloc(2 * e.length),
						n = this.nodeIdx,
						i = this.prevBuf,
						r = this.prevBuf.length,
						o = -this.prevBuf.length;
					r > 0 && (i = a.concat([i, e.slice(0, 10)]));
					for (var s = 0, c = 0; s < e.length; s++) {
						var p,
							l = s >= 0 ? e[s] : i[s + r];
						if ((p = this.decodeTables[n][l]) >= 0);
						else if (-1 === p) (s = o), (p = this.defaultCharUnicode.charCodeAt(0));
						else if (-2 === p) {
							var u = o >= 0 ? e.slice(o, s + 1) : i.slice(o + r, s + 1 + r),
								d =
									12600 * (u[0] - 129) +
									1260 * (u[1] - 48) +
									10 * (u[2] - 129) +
									(u[3] - 48),
								m = findIdx(this.gb18030.gbChars, d);
							p = this.gb18030.uChars[m] + d - this.gb18030.gbChars[m];
						} else {
							if (p <= -1e3) {
								n = -1e3 - p;
								continue;
							}
							if (!(p <= -10))
								throw new Error(
									"iconv-lite internal error: invalid decoding table value " +
										p +
										" at " +
										n +
										"/" +
										l
								);
							for (var f = this.decodeTableSeq[-10 - p], h = 0; h < f.length - 1; h++)
								(p = f[h]), (t[c++] = 255 & p), (t[c++] = p >> 8);
							p = f[f.length - 1];
						}
						if (p > 65535) {
							p -= 65536;
							var v = 55296 + Math.floor(p / 1024);
							(t[c++] = 255 & v), (t[c++] = v >> 8), (p = 56320 + (p % 1024));
						}
						(t[c++] = 255 & p), (t[c++] = p >> 8), (n = 0), (o = s + 1);
					}
					return (
						(this.nodeIdx = n),
						(this.prevBuf = o >= 0 ? e.slice(o) : i.slice(o + r)),
						t.slice(0, c).toString("ucs2")
					);
				}),
				(DBCSDecoder.prototype.end = function () {
					for (var e = ""; this.prevBuf.length > 0; ) {
						e += this.defaultCharUnicode;
						var t = this.prevBuf.slice(1);
						(this.prevBuf = a.alloc(0)),
							(this.nodeIdx = 0),
							t.length > 0 && (e += this.write(t));
					}
					return (this.nodeIdx = 0), e;
				});
		},
		function (e, t, n) {
			"use strict";
			e.exports = {
				shiftjis: {
					type: "_dbcs",
					table: function () {
						return n(112);
					},
					encodeAdd: { "¥": 92, "‾": 126 },
					encodeSkipVals: [{ from: 60736, to: 63808 }],
				},
				csshiftjis: "shiftjis",
				mskanji: "shiftjis",
				sjis: "shiftjis",
				windows31j: "shiftjis",
				ms31j: "shiftjis",
				xsjis: "shiftjis",
				windows932: "shiftjis",
				ms932: "shiftjis",
				932: "shiftjis",
				cp932: "shiftjis",
				eucjp: {
					type: "_dbcs",
					table: function () {
						return n(113);
					},
					encodeAdd: { "¥": 92, "‾": 126 },
				},
				gb2312: "cp936",
				gb231280: "cp936",
				gb23121980: "cp936",
				csgb2312: "cp936",
				csiso58gb231280: "cp936",
				euccn: "cp936",
				windows936: "cp936",
				ms936: "cp936",
				936: "cp936",
				cp936: {
					type: "_dbcs",
					table: function () {
						return n(37);
					},
				},
				gbk: {
					type: "_dbcs",
					table: function () {
						return n(37).concat(n(49));
					},
				},
				xgbk: "gbk",
				isoir58: "gbk",
				gb18030: {
					type: "_dbcs",
					table: function () {
						return n(37).concat(n(49));
					},
					gb18030: function () {
						return n(114);
					},
					encodeSkipVals: [128],
					encodeAdd: { "€": 41699 },
				},
				chinese: "gb18030",
				windows949: "cp949",
				ms949: "cp949",
				949: "cp949",
				cp949: {
					type: "_dbcs",
					table: function () {
						return n(115);
					},
				},
				cseuckr: "cp949",
				csksc56011987: "cp949",
				euckr: "cp949",
				isoir149: "cp949",
				korean: "cp949",
				ksc56011987: "cp949",
				ksc56011989: "cp949",
				ksc5601: "cp949",
				windows950: "cp950",
				ms950: "cp950",
				950: "cp950",
				cp950: {
					type: "_dbcs",
					table: function () {
						return n(50);
					},
				},
				big5: "big5hkscs",
				big5hkscs: {
					type: "_dbcs",
					table: function () {
						return n(50).concat(n(116));
					},
					encodeSkipVals: [41676],
				},
				cnbig5: "big5hkscs",
				csbig5: "big5hkscs",
				xxbig5: "big5hkscs",
			};
		},
		function (e) {
			e.exports = JSON.parse(
				'[["0","\\u0000",128],["a1","｡",62],["8140","　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",9,"＋－±×"],["8180","÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓"],["81b8","∈∋⊆⊇⊂⊃∪∩"],["81c8","∧∨￢⇒⇔∀∃"],["81da","∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"],["81f0","Å‰♯♭♪†‡¶"],["81fc","◯"],["824f","０",9],["8260","Ａ",25],["8281","ａ",25],["829f","ぁ",82],["8340","ァ",62],["8380","ム",22],["839f","Α",16,"Σ",6],["83bf","α",16,"σ",6],["8440","А",5,"ЁЖ",25],["8470","а",5,"ёж",7],["8480","о",17],["849f","─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"],["8740","①",19,"Ⅰ",9],["875f","㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"],["877e","㍻"],["8780","〝〟№㏍℡㊤",4,"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"],["889f","亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"],["8940","院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円"],["8980","園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"],["8a40","魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫"],["8a80","橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"],["8b40","機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救"],["8b80","朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"],["8c40","掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨"],["8c80","劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"],["8d40","后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降"],["8d80","項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"],["8e40","察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止"],["8e80","死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"],["8f40","宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳"],["8f80","準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"],["9040","拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨"],["9080","逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"],["9140","繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻"],["9180","操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"],["9240","叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄"],["9280","逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"],["9340","邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬"],["9380","凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"],["9440","如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅"],["9480","楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"],["9540","鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷"],["9580","斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"],["9640","法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆"],["9680","摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"],["9740","諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲"],["9780","沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"],["9840","蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"],["989f","弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"],["9940","僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭"],["9980","凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"],["9a40","咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸"],["9a80","噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"],["9b40","奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀"],["9b80","它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"],["9c40","廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠"],["9c80","怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"],["9d40","戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫"],["9d80","捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"],["9e40","曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎"],["9e80","梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"],["9f40","檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯"],["9f80","麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"],["e040","漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝"],["e080","烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"],["e140","瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿"],["e180","痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"],["e240","磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰"],["e280","窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"],["e340","紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷"],["e380","縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"],["e440","隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤"],["e480","艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"],["e540","蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬"],["e580","蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"],["e640","襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧"],["e680","諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"],["e740","蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜"],["e780","轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"],["e840","錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙"],["e880","閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"],["e940","顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃"],["e980","騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"],["ea40","鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯"],["ea80","黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙"],["ed40","纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏"],["ed80","塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"],["ee40","犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙"],["ee80","蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"],["eeef","ⅰ",9,"￢￤＇＂"],["f040","",62],["f080","",124],["f140","",62],["f180","",124],["f240","",62],["f280","",124],["f340","",62],["f380","",124],["f440","",62],["f480","",124],["f540","",62],["f580","",124],["f640","",62],["f680","",124],["f740","",62],["f780","",124],["f840","",62],["f880","",124],["f940",""],["fa40","ⅰ",9,"Ⅰ",9,"￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊"],["fa80","兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯"],["fb40","涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神"],["fb80","祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙"],["fc40","髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"]]'
			);
		},
		function (e) {
			e.exports = JSON.parse(
				'[["0","\\u0000",127],["8ea1","｡",62],["a1a1","　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",9,"＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇"],["a2a1","◆□■△▲▽▼※〒→←↑↓〓"],["a2ba","∈∋⊆⊇⊂⊃∪∩"],["a2ca","∧∨￢⇒⇔∀∃"],["a2dc","∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"],["a2f2","Å‰♯♭♪†‡¶"],["a2fe","◯"],["a3b0","０",9],["a3c1","Ａ",25],["a3e1","ａ",25],["a4a1","ぁ",82],["a5a1","ァ",85],["a6a1","Α",16,"Σ",6],["a6c1","α",16,"σ",6],["a7a1","А",5,"ЁЖ",25],["a7d1","а",5,"ёж",25],["a8a1","─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"],["ada1","①",19,"Ⅰ",9],["adc0","㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"],["addf","㍻〝〟№㏍℡㊤",4,"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"],["b0a1","亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"],["b1a1","院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応"],["b2a1","押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"],["b3a1","魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱"],["b4a1","粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"],["b5a1","機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京"],["b6a1","供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"],["b7a1","掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲"],["b8a1","検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"],["b9a1","后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込"],["baa1","此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"],["bba1","察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時"],["bca1","次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"],["bda1","宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償"],["bea1","勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"],["bfa1","拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾"],["c0a1","澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"],["c1a1","繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎"],["c2a1","臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"],["c3a1","叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵"],["c4a1","帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"],["c5a1","邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到"],["c6a1","董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"],["c7a1","如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦"],["c8a1","函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"],["c9a1","鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服"],["caa1","福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"],["cba1","法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満"],["cca1","漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"],["cda1","諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃"],["cea1","痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"],["cfa1","蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"],["d0a1","弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"],["d1a1","僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨"],["d2a1","辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"],["d3a1","咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉"],["d4a1","圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"],["d5a1","奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓"],["d6a1","屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"],["d7a1","廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚"],["d8a1","悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"],["d9a1","戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼"],["daa1","據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"],["dba1","曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍"],["dca1","棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"],["dda1","檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾"],["dea1","沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"],["dfa1","漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼"],["e0a1","燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"],["e1a1","瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰"],["e2a1","癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"],["e3a1","磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐"],["e4a1","筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"],["e5a1","紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺"],["e6a1","罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"],["e7a1","隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙"],["e8a1","茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"],["e9a1","蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙"],["eaa1","蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"],["eba1","襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫"],["eca1","譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"],["eda1","蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸"],["eea1","遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"],["efa1","錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞"],["f0a1","陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"],["f1a1","顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷"],["f2a1","髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"],["f3a1","鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠"],["f4a1","堯槇遙瑤凜熙"],["f9a1","纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德"],["faa1","忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"],["fba1","犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚"],["fca1","釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"],["fcf1","ⅰ",9,"￢￤＇＂"],["8fa2af","˘ˇ¸˙˝¯˛˚～΄΅"],["8fa2c2","¡¦¿"],["8fa2eb","ºª©®™¤№"],["8fa6e1","ΆΈΉΊΪ"],["8fa6e7","Ό"],["8fa6e9","ΎΫ"],["8fa6ec","Ώ"],["8fa6f1","άέήίϊΐόςύϋΰώ"],["8fa7c2","Ђ",10,"ЎЏ"],["8fa7f2","ђ",10,"ўџ"],["8fa9a1","ÆĐ"],["8fa9a4","Ħ"],["8fa9a6","Ĳ"],["8fa9a8","ŁĿ"],["8fa9ab","ŊØŒ"],["8fa9af","ŦÞ"],["8fa9c1","æđðħıĳĸłŀŉŋøœßŧþ"],["8faaa1","ÁÀÄÂĂǍĀĄÅÃĆĈČÇĊĎÉÈËÊĚĖĒĘ"],["8faaba","ĜĞĢĠĤÍÌÏÎǏİĪĮĨĴĶĹĽĻŃŇŅÑÓÒÖÔǑŐŌÕŔŘŖŚŜŠŞŤŢÚÙÜÛŬǓŰŪŲŮŨǗǛǙǕŴÝŸŶŹŽŻ"],["8faba1","áàäâăǎāąåãćĉčçċďéèëêěėēęǵĝğ"],["8fabbd","ġĥíìïîǐ"],["8fabc5","īįĩĵķĺľļńňņñóòöôǒőōõŕřŗśŝšşťţúùüûŭǔűūųůũǘǜǚǖŵýÿŷźžż"],["8fb0a1","丂丄丅丌丒丟丣两丨丫丮丯丰丵乀乁乄乇乑乚乜乣乨乩乴乵乹乿亍亖亗亝亯亹仃仐仚仛仠仡仢仨仯仱仳仵份仾仿伀伂伃伈伋伌伒伕伖众伙伮伱你伳伵伷伹伻伾佀佂佈佉佋佌佒佔佖佘佟佣佪佬佮佱佷佸佹佺佽佾侁侂侄"],["8fb1a1","侅侉侊侌侎侐侒侓侔侗侙侚侞侟侲侷侹侻侼侽侾俀俁俅俆俈俉俋俌俍俏俒俜俠俢俰俲俼俽俿倀倁倄倇倊倌倎倐倓倗倘倛倜倝倞倢倧倮倰倲倳倵偀偁偂偅偆偊偌偎偑偒偓偗偙偟偠偢偣偦偧偪偭偰偱倻傁傃傄傆傊傎傏傐"],["8fb2a1","傒傓傔傖傛傜傞",4,"傪傯傰傹傺傽僀僃僄僇僌僎僐僓僔僘僜僝僟僢僤僦僨僩僯僱僶僺僾儃儆儇儈儋儌儍儎僲儐儗儙儛儜儝儞儣儧儨儬儭儯儱儳儴儵儸儹兂兊兏兓兕兗兘兟兤兦兾冃冄冋冎冘冝冡冣冭冸冺冼冾冿凂"],["8fb3a1","凈减凑凒凓凕凘凞凢凥凮凲凳凴凷刁刂刅划刓刕刖刘刢刨刱刲刵刼剅剉剕剗剘剚剜剟剠剡剦剮剷剸剹劀劂劅劊劌劓劕劖劗劘劚劜劤劥劦劧劯劰劶劷劸劺劻劽勀勄勆勈勌勏勑勔勖勛勜勡勥勨勩勪勬勰勱勴勶勷匀匃匊匋"],["8fb4a1","匌匑匓匘匛匜匞匟匥匧匨匩匫匬匭匰匲匵匼匽匾卂卌卋卙卛卡卣卥卬卭卲卹卾厃厇厈厎厓厔厙厝厡厤厪厫厯厲厴厵厷厸厺厽叀叅叏叒叓叕叚叝叞叠另叧叵吂吓吚吡吧吨吪启吱吴吵呃呄呇呍呏呞呢呤呦呧呩呫呭呮呴呿"],["8fb5a1","咁咃咅咈咉咍咑咕咖咜咟咡咦咧咩咪咭咮咱咷咹咺咻咿哆哊响哎哠哪哬哯哶哼哾哿唀唁唅唈唉唌唍唎唕唪唫唲唵唶唻唼唽啁啇啉啊啍啐啑啘啚啛啞啠啡啤啦啿喁喂喆喈喎喏喑喒喓喔喗喣喤喭喲喿嗁嗃嗆嗉嗋嗌嗎嗑嗒"],["8fb6a1","嗓嗗嗘嗛嗞嗢嗩嗶嗿嘅嘈嘊嘍",5,"嘙嘬嘰嘳嘵嘷嘹嘻嘼嘽嘿噀噁噃噄噆噉噋噍噏噔噞噠噡噢噣噦噩噭噯噱噲噵嚄嚅嚈嚋嚌嚕嚙嚚嚝嚞嚟嚦嚧嚨嚩嚫嚬嚭嚱嚳嚷嚾囅囉囊囋囏囐囌囍囙囜囝囟囡囤",4,"囱囫园"],["8fb7a1","囶囷圁圂圇圊圌圑圕圚圛圝圠圢圣圤圥圩圪圬圮圯圳圴圽圾圿坅坆坌坍坒坢坥坧坨坫坭",4,"坳坴坵坷坹坺坻坼坾垁垃垌垔垗垙垚垜垝垞垟垡垕垧垨垩垬垸垽埇埈埌埏埕埝埞埤埦埧埩埭埰埵埶埸埽埾埿堃堄堈堉埡"],["8fb8a1","堌堍堛堞堟堠堦堧堭堲堹堿塉塌塍塏塐塕塟塡塤塧塨塸塼塿墀墁墇墈墉墊墌墍墏墐墔墖墝墠墡墢墦墩墱墲壄墼壂壈壍壎壐壒壔壖壚壝壡壢壩壳夅夆夋夌夒夓夔虁夝夡夣夤夨夯夰夳夵夶夿奃奆奒奓奙奛奝奞奟奡奣奫奭"],["8fb9a1","奯奲奵奶她奻奼妋妌妎妒妕妗妟妤妧妭妮妯妰妳妷妺妼姁姃姄姈姊姍姒姝姞姟姣姤姧姮姯姱姲姴姷娀娄娌娍娎娒娓娞娣娤娧娨娪娭娰婄婅婇婈婌婐婕婞婣婥婧婭婷婺婻婾媋媐媓媖媙媜媞媟媠媢媧媬媱媲媳媵媸媺媻媿"],["8fbaa1","嫄嫆嫈嫏嫚嫜嫠嫥嫪嫮嫵嫶嫽嬀嬁嬈嬗嬴嬙嬛嬝嬡嬥嬭嬸孁孋孌孒孖孞孨孮孯孼孽孾孿宁宄宆宊宎宐宑宓宔宖宨宩宬宭宯宱宲宷宺宼寀寁寍寏寖",4,"寠寯寱寴寽尌尗尞尟尣尦尩尫尬尮尰尲尵尶屙屚屜屢屣屧屨屩"],["8fbba1","屭屰屴屵屺屻屼屽岇岈岊岏岒岝岟岠岢岣岦岪岲岴岵岺峉峋峒峝峗峮峱峲峴崁崆崍崒崫崣崤崦崧崱崴崹崽崿嵂嵃嵆嵈嵕嵑嵙嵊嵟嵠嵡嵢嵤嵪嵭嵰嵹嵺嵾嵿嶁嶃嶈嶊嶒嶓嶔嶕嶙嶛嶟嶠嶧嶫嶰嶴嶸嶹巃巇巋巐巎巘巙巠巤"],["8fbca1","巩巸巹帀帇帍帒帔帕帘帟帠帮帨帲帵帾幋幐幉幑幖幘幛幜幞幨幪",4,"幰庀庋庎庢庤庥庨庪庬庱庳庽庾庿廆廌廋廎廑廒廔廕廜廞廥廫异弆弇弈弎弙弜弝弡弢弣弤弨弫弬弮弰弴弶弻弽弿彀彄彅彇彍彐彔彘彛彠彣彤彧"],["8fbda1","彯彲彴彵彸彺彽彾徉徍徏徖徜徝徢徧徫徤徬徯徰徱徸忄忇忈忉忋忐",4,"忞忡忢忨忩忪忬忭忮忯忲忳忶忺忼怇怊怍怓怔怗怘怚怟怤怭怳怵恀恇恈恉恌恑恔恖恗恝恡恧恱恾恿悂悆悈悊悎悑悓悕悘悝悞悢悤悥您悰悱悷"],["8fbea1","悻悾惂惄惈惉惊惋惎惏惔惕惙惛惝惞惢惥惲惵惸惼惽愂愇愊愌愐",4,"愖愗愙愜愞愢愪愫愰愱愵愶愷愹慁慅慆慉慞慠慬慲慸慻慼慿憀憁憃憄憋憍憒憓憗憘憜憝憟憠憥憨憪憭憸憹憼懀懁懂懎懏懕懜懝懞懟懡懢懧懩懥"],["8fbfa1","懬懭懯戁戃戄戇戓戕戜戠戢戣戧戩戫戹戽扂扃扄扆扌扐扑扒扔扖扚扜扤扭扯扳扺扽抍抎抏抐抦抨抳抶抷抺抾抿拄拎拕拖拚拪拲拴拼拽挃挄挊挋挍挐挓挖挘挩挪挭挵挶挹挼捁捂捃捄捆捊捋捎捒捓捔捘捛捥捦捬捭捱捴捵"],["8fc0a1","捸捼捽捿掂掄掇掊掐掔掕掙掚掞掤掦掭掮掯掽揁揅揈揎揑揓揔揕揜揠揥揪揬揲揳揵揸揹搉搊搐搒搔搘搞搠搢搤搥搩搪搯搰搵搽搿摋摏摑摒摓摔摚摛摜摝摟摠摡摣摭摳摴摻摽撅撇撏撐撑撘撙撛撝撟撡撣撦撨撬撳撽撾撿"],["8fc1a1","擄擉擊擋擌擎擐擑擕擗擤擥擩擪擭擰擵擷擻擿攁攄攈攉攊攏攓攔攖攙攛攞攟攢攦攩攮攱攺攼攽敃敇敉敐敒敔敟敠敧敫敺敽斁斅斊斒斕斘斝斠斣斦斮斲斳斴斿旂旈旉旎旐旔旖旘旟旰旲旴旵旹旾旿昀昄昈昉昍昑昒昕昖昝"],["8fc2a1","昞昡昢昣昤昦昩昪昫昬昮昰昱昳昹昷晀晅晆晊晌晑晎晗晘晙晛晜晠晡曻晪晫晬晾晳晵晿晷晸晹晻暀晼暋暌暍暐暒暙暚暛暜暟暠暤暭暱暲暵暻暿曀曂曃曈曌曎曏曔曛曟曨曫曬曮曺朅朇朎朓朙朜朠朢朳朾杅杇杈杌杔杕杝"],["8fc3a1","杦杬杮杴杶杻极构枎枏枑枓枖枘枙枛枰枱枲枵枻枼枽柹柀柂柃柅柈柉柒柗柙柜柡柦柰柲柶柷桒栔栙栝栟栨栧栬栭栯栰栱栳栻栿桄桅桊桌桕桗桘桛桫桮",4,"桵桹桺桻桼梂梄梆梈梖梘梚梜梡梣梥梩梪梮梲梻棅棈棌棏"],["8fc4a1","棐棑棓棖棙棜棝棥棨棪棫棬棭棰棱棵棶棻棼棽椆椉椊椐椑椓椖椗椱椳椵椸椻楂楅楉楎楗楛楣楤楥楦楨楩楬楰楱楲楺楻楿榀榍榒榖榘榡榥榦榨榫榭榯榷榸榺榼槅槈槑槖槗槢槥槮槯槱槳槵槾樀樁樃樏樑樕樚樝樠樤樨樰樲"],["8fc5a1","樴樷樻樾樿橅橆橉橊橎橐橑橒橕橖橛橤橧橪橱橳橾檁檃檆檇檉檋檑檛檝檞檟檥檫檯檰檱檴檽檾檿櫆櫉櫈櫌櫐櫔櫕櫖櫜櫝櫤櫧櫬櫰櫱櫲櫼櫽欂欃欆欇欉欏欐欑欗欛欞欤欨欫欬欯欵欶欻欿歆歊歍歒歖歘歝歠歧歫歮歰歵歽"],["8fc6a1","歾殂殅殗殛殟殠殢殣殨殩殬殭殮殰殸殹殽殾毃毄毉毌毖毚毡毣毦毧毮毱毷毹毿氂氄氅氉氍氎氐氒氙氟氦氧氨氬氮氳氵氶氺氻氿汊汋汍汏汒汔汙汛汜汫汭汯汴汶汸汹汻沅沆沇沉沔沕沗沘沜沟沰沲沴泂泆泍泏泐泑泒泔泖"],["8fc7a1","泚泜泠泧泩泫泬泮泲泴洄洇洊洎洏洑洓洚洦洧洨汧洮洯洱洹洼洿浗浞浟浡浥浧浯浰浼涂涇涑涒涔涖涗涘涪涬涴涷涹涽涿淄淈淊淎淏淖淛淝淟淠淢淥淩淯淰淴淶淼渀渄渞渢渧渲渶渹渻渼湄湅湈湉湋湏湑湒湓湔湗湜湝湞"],["8fc8a1","湢湣湨湳湻湽溍溓溙溠溧溭溮溱溳溻溿滀滁滃滇滈滊滍滎滏滫滭滮滹滻滽漄漈漊漌漍漖漘漚漛漦漩漪漯漰漳漶漻漼漭潏潑潒潓潗潙潚潝潞潡潢潨潬潽潾澃澇澈澋澌澍澐澒澓澔澖澚澟澠澥澦澧澨澮澯澰澵澶澼濅濇濈濊"],["8fc9a1","濚濞濨濩濰濵濹濼濽瀀瀅瀆瀇瀍瀗瀠瀣瀯瀴瀷瀹瀼灃灄灈灉灊灋灔灕灝灞灎灤灥灬灮灵灶灾炁炅炆炔",4,"炛炤炫炰炱炴炷烊烑烓烔烕烖烘烜烤烺焃",4,"焋焌焏焞焠焫焭焯焰焱焸煁煅煆煇煊煋煐煒煗煚煜煞煠"],["8fcaa1","煨煹熀熅熇熌熒熚熛熠熢熯熰熲熳熺熿燀燁燄燋燌燓燖燙燚燜燸燾爀爇爈爉爓爗爚爝爟爤爫爯爴爸爹牁牂牃牅牎牏牐牓牕牖牚牜牞牠牣牨牫牮牯牱牷牸牻牼牿犄犉犍犎犓犛犨犭犮犱犴犾狁狇狉狌狕狖狘狟狥狳狴狺狻"],["8fcba1","狾猂猄猅猇猋猍猒猓猘猙猞猢猤猧猨猬猱猲猵猺猻猽獃獍獐獒獖獘獝獞獟獠獦獧獩獫獬獮獯獱獷獹獼玀玁玃玅玆玎玐玓玕玗玘玜玞玟玠玢玥玦玪玫玭玵玷玹玼玽玿珅珆珉珋珌珏珒珓珖珙珝珡珣珦珧珩珴珵珷珹珺珻珽"],["8fcca1","珿琀琁琄琇琊琑琚琛琤琦琨",9,"琹瑀瑃瑄瑆瑇瑋瑍瑑瑒瑗瑝瑢瑦瑧瑨瑫瑭瑮瑱瑲璀璁璅璆璇璉璏璐璑璒璘璙璚璜璟璠璡璣璦璨璩璪璫璮璯璱璲璵璹璻璿瓈瓉瓌瓐瓓瓘瓚瓛瓞瓟瓤瓨瓪瓫瓯瓴瓺瓻瓼瓿甆"],["8fcda1","甒甖甗甠甡甤甧甩甪甯甶甹甽甾甿畀畃畇畈畎畐畒畗畞畟畡畯畱畹",5,"疁疅疐疒疓疕疙疜疢疤疴疺疿痀痁痄痆痌痎痏痗痜痟痠痡痤痧痬痮痯痱痹瘀瘂瘃瘄瘇瘈瘊瘌瘏瘒瘓瘕瘖瘙瘛瘜瘝瘞瘣瘥瘦瘩瘭瘲瘳瘵瘸瘹"],["8fcea1","瘺瘼癊癀癁癃癄癅癉癋癕癙癟癤癥癭癮癯癱癴皁皅皌皍皕皛皜皝皟皠皢",6,"皪皭皽盁盅盉盋盌盎盔盙盠盦盨盬盰盱盶盹盼眀眆眊眎眒眔眕眗眙眚眜眢眨眭眮眯眴眵眶眹眽眾睂睅睆睊睍睎睏睒睖睗睜睞睟睠睢"],["8fcfa1","睤睧睪睬睰睲睳睴睺睽瞀瞄瞌瞍瞔瞕瞖瞚瞟瞢瞧瞪瞮瞯瞱瞵瞾矃矉矑矒矕矙矞矟矠矤矦矪矬矰矱矴矸矻砅砆砉砍砎砑砝砡砢砣砭砮砰砵砷硃硄硇硈硌硎硒硜硞硠硡硣硤硨硪确硺硾碊碏碔碘碡碝碞碟碤碨碬碭碰碱碲碳"],["8fd0a1","碻碽碿磇磈磉磌磎磒磓磕磖磤磛磟磠磡磦磪磲磳礀磶磷磺磻磿礆礌礐礚礜礞礟礠礥礧礩礭礱礴礵礻礽礿祄祅祆祊祋祏祑祔祘祛祜祧祩祫祲祹祻祼祾禋禌禑禓禔禕禖禘禛禜禡禨禩禫禯禱禴禸离秂秄秇秈秊秏秔秖秚秝秞"],["8fd1a1","秠秢秥秪秫秭秱秸秼稂稃稇稉稊稌稑稕稛稞稡稧稫稭稯稰稴稵稸稹稺穄穅穇穈穌穕穖穙穜穝穟穠穥穧穪穭穵穸穾窀窂窅窆窊窋窐窑窔窞窠窣窬窳窵窹窻窼竆竉竌竎竑竛竨竩竫竬竱竴竻竽竾笇笔笟笣笧笩笪笫笭笮笯笰"],["8fd2a1","笱笴笽笿筀筁筇筎筕筠筤筦筩筪筭筯筲筳筷箄箉箎箐箑箖箛箞箠箥箬箯箰箲箵箶箺箻箼箽篂篅篈篊篔篖篗篙篚篛篨篪篲篴篵篸篹篺篼篾簁簂簃簄簆簉簋簌簎簏簙簛簠簥簦簨簬簱簳簴簶簹簺籆籊籕籑籒籓籙",5],["8fd3a1","籡籣籧籩籭籮籰籲籹籼籽粆粇粏粔粞粠粦粰粶粷粺粻粼粿糄糇糈糉糍糏糓糔糕糗糙糚糝糦糩糫糵紃紇紈紉紏紑紒紓紖紝紞紣紦紪紭紱紼紽紾絀絁絇絈絍絑絓絗絙絚絜絝絥絧絪絰絸絺絻絿綁綂綃綅綆綈綋綌綍綑綖綗綝"],["8fd4a1","綞綦綧綪綳綶綷綹緂",4,"緌緍緎緗緙縀緢緥緦緪緫緭緱緵緶緹緺縈縐縑縕縗縜縝縠縧縨縬縭縯縳縶縿繄繅繇繎繐繒繘繟繡繢繥繫繮繯繳繸繾纁纆纇纊纍纑纕纘纚纝纞缼缻缽缾缿罃罄罇罏罒罓罛罜罝罡罣罤罥罦罭"],["8fd5a1","罱罽罾罿羀羋羍羏羐羑羖羗羜羡羢羦羪羭羴羼羿翀翃翈翎翏翛翟翣翥翨翬翮翯翲翺翽翾翿耇耈耊耍耎耏耑耓耔耖耝耞耟耠耤耦耬耮耰耴耵耷耹耺耼耾聀聄聠聤聦聭聱聵肁肈肎肜肞肦肧肫肸肹胈胍胏胒胔胕胗胘胠胭胮"],["8fd6a1","胰胲胳胶胹胺胾脃脋脖脗脘脜脞脠脤脧脬脰脵脺脼腅腇腊腌腒腗腠腡腧腨腩腭腯腷膁膐膄膅膆膋膎膖膘膛膞膢膮膲膴膻臋臃臅臊臎臏臕臗臛臝臞臡臤臫臬臰臱臲臵臶臸臹臽臿舀舃舏舓舔舙舚舝舡舢舨舲舴舺艃艄艅艆"],["8fd7a1","艋艎艏艑艖艜艠艣艧艭艴艻艽艿芀芁芃芄芇芉芊芎芑芔芖芘芚芛芠芡芣芤芧芨芩芪芮芰芲芴芷芺芼芾芿苆苐苕苚苠苢苤苨苪苭苯苶苷苽苾茀茁茇茈茊茋荔茛茝茞茟茡茢茬茭茮茰茳茷茺茼茽荂荃荄荇荍荎荑荕荖荗荰荸"],["8fd8a1","荽荿莀莂莄莆莍莒莔莕莘莙莛莜莝莦莧莩莬莾莿菀菇菉菏菐菑菔菝荓菨菪菶菸菹菼萁萆萊萏萑萕萙莭萯萹葅葇葈葊葍葏葑葒葖葘葙葚葜葠葤葥葧葪葰葳葴葶葸葼葽蒁蒅蒒蒓蒕蒞蒦蒨蒩蒪蒯蒱蒴蒺蒽蒾蓀蓂蓇蓈蓌蓏蓓"],["8fd9a1","蓜蓧蓪蓯蓰蓱蓲蓷蔲蓺蓻蓽蔂蔃蔇蔌蔎蔐蔜蔞蔢蔣蔤蔥蔧蔪蔫蔯蔳蔴蔶蔿蕆蕏",4,"蕖蕙蕜",6,"蕤蕫蕯蕹蕺蕻蕽蕿薁薅薆薉薋薌薏薓薘薝薟薠薢薥薧薴薶薷薸薼薽薾薿藂藇藊藋藎薭藘藚藟藠藦藨藭藳藶藼"],["8fdaa1","藿蘀蘄蘅蘍蘎蘐蘑蘒蘘蘙蘛蘞蘡蘧蘩蘶蘸蘺蘼蘽虀虂虆虒虓虖虗虘虙虝虠",4,"虩虬虯虵虶虷虺蚍蚑蚖蚘蚚蚜蚡蚦蚧蚨蚭蚱蚳蚴蚵蚷蚸蚹蚿蛀蛁蛃蛅蛑蛒蛕蛗蛚蛜蛠蛣蛥蛧蚈蛺蛼蛽蜄蜅蜇蜋蜎蜏蜐蜓蜔蜙蜞蜟蜡蜣"],["8fdba1","蜨蜮蜯蜱蜲蜹蜺蜼蜽蜾蝀蝃蝅蝍蝘蝝蝡蝤蝥蝯蝱蝲蝻螃",6,"螋螌螐螓螕螗螘螙螞螠螣螧螬螭螮螱螵螾螿蟁蟈蟉蟊蟎蟕蟖蟙蟚蟜蟟蟢蟣蟤蟪蟫蟭蟱蟳蟸蟺蟿蠁蠃蠆蠉蠊蠋蠐蠙蠒蠓蠔蠘蠚蠛蠜蠞蠟蠨蠭蠮蠰蠲蠵"],["8fdca1","蠺蠼衁衃衅衈衉衊衋衎衑衕衖衘衚衜衟衠衤衩衱衹衻袀袘袚袛袜袟袠袨袪袺袽袾裀裊",4,"裑裒裓裛裞裧裯裰裱裵裷褁褆褍褎褏褕褖褘褙褚褜褠褦褧褨褰褱褲褵褹褺褾襀襂襅襆襉襏襒襗襚襛襜襡襢襣襫襮襰襳襵襺"],["8fdda1","襻襼襽覉覍覐覔覕覛覜覟覠覥覰覴覵覶覷覼觔",4,"觥觩觫觭觱觳觶觹觽觿訄訅訇訏訑訒訔訕訞訠訢訤訦訫訬訯訵訷訽訾詀詃詅詇詉詍詎詓詖詗詘詜詝詡詥詧詵詶詷詹詺詻詾詿誀誃誆誋誏誐誒誖誗誙誟誧誩誮誯誳"],["8fdea1","誶誷誻誾諃諆諈諉諊諑諓諔諕諗諝諟諬諰諴諵諶諼諿謅謆謋謑謜謞謟謊謭謰謷謼譂",4,"譈譒譓譔譙譍譞譣譭譶譸譹譼譾讁讄讅讋讍讏讔讕讜讞讟谸谹谽谾豅豇豉豋豏豑豓豔豗豘豛豝豙豣豤豦豨豩豭豳豵豶豻豾貆"],["8fdfa1","貇貋貐貒貓貙貛貜貤貹貺賅賆賉賋賏賖賕賙賝賡賨賬賯賰賲賵賷賸賾賿贁贃贉贒贗贛赥赩赬赮赿趂趄趈趍趐趑趕趞趟趠趦趫趬趯趲趵趷趹趻跀跅跆跇跈跊跎跑跔跕跗跙跤跥跧跬跰趼跱跲跴跽踁踄踅踆踋踑踔踖踠踡踢"],["8fe0a1","踣踦踧踱踳踶踷踸踹踽蹀蹁蹋蹍蹎蹏蹔蹛蹜蹝蹞蹡蹢蹩蹬蹭蹯蹰蹱蹹蹺蹻躂躃躉躐躒躕躚躛躝躞躢躧躩躭躮躳躵躺躻軀軁軃軄軇軏軑軔軜軨軮軰軱軷軹軺軭輀輂輇輈輏輐輖輗輘輞輠輡輣輥輧輨輬輭輮輴輵輶輷輺轀轁"],["8fe1a1","轃轇轏轑",4,"轘轝轞轥辝辠辡辤辥辦辵辶辸达迀迁迆迊迋迍运迒迓迕迠迣迤迨迮迱迵迶迻迾适逄逈逌逘逛逨逩逯逪逬逭逳逴逷逿遃遄遌遛遝遢遦遧遬遰遴遹邅邈邋邌邎邐邕邗邘邙邛邠邡邢邥邰邲邳邴邶邽郌邾郃"],["8fe2a1","郄郅郇郈郕郗郘郙郜郝郟郥郒郶郫郯郰郴郾郿鄀鄄鄅鄆鄈鄍鄐鄔鄖鄗鄘鄚鄜鄞鄠鄥鄢鄣鄧鄩鄮鄯鄱鄴鄶鄷鄹鄺鄼鄽酃酇酈酏酓酗酙酚酛酡酤酧酭酴酹酺酻醁醃醅醆醊醎醑醓醔醕醘醞醡醦醨醬醭醮醰醱醲醳醶醻醼醽醿"],["8fe3a1","釂釃釅釓釔釗釙釚釞釤釥釩釪釬",5,"釷釹釻釽鈀鈁鈄鈅鈆鈇鈉鈊鈌鈐鈒鈓鈖鈘鈜鈝鈣鈤鈥鈦鈨鈮鈯鈰鈳鈵鈶鈸鈹鈺鈼鈾鉀鉂鉃鉆鉇鉊鉍鉎鉏鉑鉘鉙鉜鉝鉠鉡鉥鉧鉨鉩鉮鉯鉰鉵",4,"鉻鉼鉽鉿銈銉銊銍銎銒銗"],["8fe4a1","銙銟銠銤銥銧銨銫銯銲銶銸銺銻銼銽銿",4,"鋅鋆鋇鋈鋋鋌鋍鋎鋐鋓鋕鋗鋘鋙鋜鋝鋟鋠鋡鋣鋥鋧鋨鋬鋮鋰鋹鋻鋿錀錂錈錍錑錔錕錜錝錞錟錡錤錥錧錩錪錳錴錶錷鍇鍈鍉鍐鍑鍒鍕鍗鍘鍚鍞鍤鍥鍧鍩鍪鍭鍯鍰鍱鍳鍴鍶"],["8fe5a1","鍺鍽鍿鎀鎁鎂鎈鎊鎋鎍鎏鎒鎕鎘鎛鎞鎡鎣鎤鎦鎨鎫鎴鎵鎶鎺鎩鏁鏄鏅鏆鏇鏉",4,"鏓鏙鏜鏞鏟鏢鏦鏧鏹鏷鏸鏺鏻鏽鐁鐂鐄鐈鐉鐍鐎鐏鐕鐖鐗鐟鐮鐯鐱鐲鐳鐴鐻鐿鐽鑃鑅鑈鑊鑌鑕鑙鑜鑟鑡鑣鑨鑫鑭鑮鑯鑱鑲钄钃镸镹"],["8fe6a1","镾閄閈閌閍閎閝閞閟閡閦閩閫閬閴閶閺閽閿闆闈闉闋闐闑闒闓闙闚闝闞闟闠闤闦阝阞阢阤阥阦阬阱阳阷阸阹阺阼阽陁陒陔陖陗陘陡陮陴陻陼陾陿隁隂隃隄隉隑隖隚隝隟隤隥隦隩隮隯隳隺雊雒嶲雘雚雝雞雟雩雯雱雺霂"],["8fe7a1","霃霅霉霚霛霝霡霢霣霨霱霳靁靃靊靎靏靕靗靘靚靛靣靧靪靮靳靶靷靸靻靽靿鞀鞉鞕鞖鞗鞙鞚鞞鞟鞢鞬鞮鞱鞲鞵鞶鞸鞹鞺鞼鞾鞿韁韄韅韇韉韊韌韍韎韐韑韔韗韘韙韝韞韠韛韡韤韯韱韴韷韸韺頇頊頙頍頎頔頖頜頞頠頣頦"],["8fe8a1","頫頮頯頰頲頳頵頥頾顄顇顊顑顒顓顖顗顙顚顢顣顥顦顪顬颫颭颮颰颴颷颸颺颻颿飂飅飈飌飡飣飥飦飧飪飳飶餂餇餈餑餕餖餗餚餛餜餟餢餦餧餫餱",4,"餹餺餻餼饀饁饆饇饈饍饎饔饘饙饛饜饞饟饠馛馝馟馦馰馱馲馵"],["8fe9a1","馹馺馽馿駃駉駓駔駙駚駜駞駧駪駫駬駰駴駵駹駽駾騂騃騄騋騌騐騑騖騞騠騢騣騤騧騭騮騳騵騶騸驇驁驄驊驋驌驎驑驔驖驝骪骬骮骯骲骴骵骶骹骻骾骿髁髃髆髈髎髐髒髕髖髗髛髜髠髤髥髧髩髬髲髳髵髹髺髽髿",4],["8feaa1","鬄鬅鬈鬉鬋鬌鬍鬎鬐鬒鬖鬙鬛鬜鬠鬦鬫鬭鬳鬴鬵鬷鬹鬺鬽魈魋魌魕魖魗魛魞魡魣魥魦魨魪",4,"魳魵魷魸魹魿鮀鮄鮅鮆鮇鮉鮊鮋鮍鮏鮐鮔鮚鮝鮞鮦鮧鮩鮬鮰鮱鮲鮷鮸鮻鮼鮾鮿鯁鯇鯈鯎鯐鯗鯘鯝鯟鯥鯧鯪鯫鯯鯳鯷鯸"],["8feba1","鯹鯺鯽鯿鰀鰂鰋鰏鰑鰖鰘鰙鰚鰜鰞鰢鰣鰦",4,"鰱鰵鰶鰷鰽鱁鱃鱄鱅鱉鱊鱎鱏鱐鱓鱔鱖鱘鱛鱝鱞鱟鱣鱩鱪鱜鱫鱨鱮鱰鱲鱵鱷鱻鳦鳲鳷鳹鴋鴂鴑鴗鴘鴜鴝鴞鴯鴰鴲鴳鴴鴺鴼鵅鴽鵂鵃鵇鵊鵓鵔鵟鵣鵢鵥鵩鵪鵫鵰鵶鵷鵻"],["8feca1","鵼鵾鶃鶄鶆鶊鶍鶎鶒鶓鶕鶖鶗鶘鶡鶪鶬鶮鶱鶵鶹鶼鶿鷃鷇鷉鷊鷔鷕鷖鷗鷚鷞鷟鷠鷥鷧鷩鷫鷮鷰鷳鷴鷾鸊鸂鸇鸎鸐鸑鸒鸕鸖鸙鸜鸝鹺鹻鹼麀麂麃麄麅麇麎麏麖麘麛麞麤麨麬麮麯麰麳麴麵黆黈黋黕黟黤黧黬黭黮黰黱黲黵"],["8feda1","黸黿鼂鼃鼉鼏鼐鼑鼒鼔鼖鼗鼙鼚鼛鼟鼢鼦鼪鼫鼯鼱鼲鼴鼷鼹鼺鼼鼽鼿齁齃",4,"齓齕齖齗齘齚齝齞齨齩齭",4,"齳齵齺齽龏龐龑龒龔龖龗龞龡龢龣龥"]]'
			);
		},
		function (e) {
			e.exports = JSON.parse(
				'{"uChars":[128,165,169,178,184,216,226,235,238,244,248,251,253,258,276,284,300,325,329,334,364,463,465,467,469,471,473,475,477,506,594,610,712,716,730,930,938,962,970,1026,1104,1106,8209,8215,8218,8222,8231,8241,8244,8246,8252,8365,8452,8454,8458,8471,8482,8556,8570,8596,8602,8713,8720,8722,8726,8731,8737,8740,8742,8748,8751,8760,8766,8777,8781,8787,8802,8808,8816,8854,8858,8870,8896,8979,9322,9372,9548,9588,9616,9622,9634,9652,9662,9672,9676,9680,9702,9735,9738,9793,9795,11906,11909,11913,11917,11928,11944,11947,11951,11956,11960,11964,11979,12284,12292,12312,12319,12330,12351,12436,12447,12535,12543,12586,12842,12850,12964,13200,13215,13218,13253,13263,13267,13270,13384,13428,13727,13839,13851,14617,14703,14801,14816,14964,15183,15471,15585,16471,16736,17208,17325,17330,17374,17623,17997,18018,18212,18218,18301,18318,18760,18811,18814,18820,18823,18844,18848,18872,19576,19620,19738,19887,40870,59244,59336,59367,59413,59417,59423,59431,59437,59443,59452,59460,59478,59493,63789,63866,63894,63976,63986,64016,64018,64021,64025,64034,64037,64042,65074,65093,65107,65112,65127,65132,65375,65510,65536],"gbChars":[0,36,38,45,50,81,89,95,96,100,103,104,105,109,126,133,148,172,175,179,208,306,307,308,309,310,311,312,313,341,428,443,544,545,558,741,742,749,750,805,819,820,7922,7924,7925,7927,7934,7943,7944,7945,7950,8062,8148,8149,8152,8164,8174,8236,8240,8262,8264,8374,8380,8381,8384,8388,8390,8392,8393,8394,8396,8401,8406,8416,8419,8424,8437,8439,8445,8482,8485,8496,8521,8603,8936,8946,9046,9050,9063,9066,9076,9092,9100,9108,9111,9113,9131,9162,9164,9218,9219,11329,11331,11334,11336,11346,11361,11363,11366,11370,11372,11375,11389,11682,11686,11687,11692,11694,11714,11716,11723,11725,11730,11736,11982,11989,12102,12336,12348,12350,12384,12393,12395,12397,12510,12553,12851,12962,12973,13738,13823,13919,13933,14080,14298,14585,14698,15583,15847,16318,16434,16438,16481,16729,17102,17122,17315,17320,17402,17418,17859,17909,17911,17915,17916,17936,17939,17961,18664,18703,18814,18962,19043,33469,33470,33471,33484,33485,33490,33497,33501,33505,33513,33520,33536,33550,37845,37921,37948,38029,38038,38064,38065,38066,38069,38075,38076,38078,39108,39109,39113,39114,39115,39116,39265,39394,189000]}'
			);
		},
		function (e) {
			e.exports = JSON.parse(
				'[["0","\\u0000",127],["8141","갂갃갅갆갋",4,"갘갞갟갡갢갣갥",6,"갮갲갳갴"],["8161","갵갶갷갺갻갽갾갿걁",9,"걌걎",5,"걕"],["8181","걖걗걙걚걛걝",18,"걲걳걵걶걹걻",4,"겂겇겈겍겎겏겑겒겓겕",6,"겞겢",5,"겫겭겮겱",6,"겺겾겿곀곂곃곅곆곇곉곊곋곍",7,"곖곘",7,"곢곣곥곦곩곫곭곮곲곴곷",4,"곾곿괁괂괃괅괇",4,"괎괐괒괓"],["8241","괔괕괖괗괙괚괛괝괞괟괡",7,"괪괫괮",5],["8261","괶괷괹괺괻괽",6,"굆굈굊",5,"굑굒굓굕굖굗"],["8281","굙",7,"굢굤",7,"굮굯굱굲굷굸굹굺굾궀궃",4,"궊궋궍궎궏궑",10,"궞",5,"궥",17,"궸",7,"귂귃귅귆귇귉",6,"귒귔",7,"귝귞귟귡귢귣귥",18],["8341","귺귻귽귾긂",5,"긊긌긎",5,"긕",7],["8361","긝",18,"긲긳긵긶긹긻긼"],["8381","긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗",4,"깞깢깣깤깦깧깪깫깭깮깯깱",6,"깺깾",5,"꺆",5,"꺍",46,"꺿껁껂껃껅",6,"껎껒",5,"껚껛껝",8],["8441","껦껧껩껪껬껮",5,"껵껶껷껹껺껻껽",8],["8461","꼆꼉꼊꼋꼌꼎꼏꼑",18],["8481","꼤",7,"꼮꼯꼱꼳꼵",6,"꼾꽀꽄꽅꽆꽇꽊",5,"꽑",10,"꽞",5,"꽦",18,"꽺",5,"꾁꾂꾃꾅꾆꾇꾉",6,"꾒꾓꾔꾖",5,"꾝",26,"꾺꾻꾽꾾"],["8541","꾿꿁",5,"꿊꿌꿏",4,"꿕",6,"꿝",4],["8561","꿢",5,"꿪",5,"꿲꿳꿵꿶꿷꿹",6,"뀂뀃"],["8581","뀅",6,"뀍뀎뀏뀑뀒뀓뀕",6,"뀞",9,"뀩",26,"끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞",29,"끾끿낁낂낃낅",6,"낎낐낒",5,"낛낝낞낣낤"],["8641","낥낦낧낪낰낲낶낷낹낺낻낽",6,"냆냊",5,"냒"],["8661","냓냕냖냗냙",6,"냡냢냣냤냦",10],["8681","냱",22,"넊넍넎넏넑넔넕넖넗넚넞",4,"넦넧넩넪넫넭",6,"넶넺",5,"녂녃녅녆녇녉",6,"녒녓녖녗녙녚녛녝녞녟녡",22,"녺녻녽녾녿놁놃",4,"놊놌놎놏놐놑놕놖놗놙놚놛놝"],["8741","놞",9,"놩",15],["8761","놹",18,"뇍뇎뇏뇑뇒뇓뇕"],["8781","뇖",5,"뇞뇠",7,"뇪뇫뇭뇮뇯뇱",7,"뇺뇼뇾",5,"눆눇눉눊눍",6,"눖눘눚",5,"눡",18,"눵",6,"눽",26,"뉙뉚뉛뉝뉞뉟뉡",6,"뉪",4],["8841","뉯",4,"뉶",5,"뉽",6,"늆늇늈늊",4],["8861","늏늒늓늕늖늗늛",4,"늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷"],["8881","늸",15,"닊닋닍닎닏닑닓",4,"닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉",6,"댒댖",5,"댝",54,"덗덙덚덝덠덡덢덣"],["8941","덦덨덪덬덭덯덲덳덵덶덷덹",6,"뎂뎆",5,"뎍"],["8961","뎎뎏뎑뎒뎓뎕",10,"뎢",5,"뎩뎪뎫뎭"],["8981","뎮",21,"돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩",18,"돽",18,"됑",6,"됙됚됛됝됞됟됡",6,"됪됬",7,"됵",15],["8a41","둅",10,"둒둓둕둖둗둙",6,"둢둤둦"],["8a61","둧",4,"둭",18,"뒁뒂"],["8a81","뒃",4,"뒉",19,"뒞",5,"뒥뒦뒧뒩뒪뒫뒭",7,"뒶뒸뒺",5,"듁듂듃듅듆듇듉",6,"듑듒듓듔듖",5,"듞듟듡듢듥듧",4,"듮듰듲",5,"듹",26,"딖딗딙딚딝"],["8b41","딞",5,"딦딫",4,"딲딳딵딶딷딹",6,"땂땆"],["8b61","땇땈땉땊땎땏땑땒땓땕",6,"땞땢",8],["8b81","땫",52,"떢떣떥떦떧떩떬떭떮떯떲떶",4,"떾떿뗁뗂뗃뗅",6,"뗎뗒",5,"뗙",18,"뗭",18],["8c41","똀",15,"똒똓똕똖똗똙",4],["8c61","똞",6,"똦",5,"똭",6,"똵",5],["8c81","똻",12,"뙉",26,"뙥뙦뙧뙩",50,"뚞뚟뚡뚢뚣뚥",5,"뚭뚮뚯뚰뚲",16],["8d41","뛃",16,"뛕",8],["8d61","뛞",17,"뛱뛲뛳뛵뛶뛷뛹뛺"],["8d81","뛻",4,"뜂뜃뜄뜆",33,"뜪뜫뜭뜮뜱",6,"뜺뜼",7,"띅띆띇띉띊띋띍",6,"띖",9,"띡띢띣띥띦띧띩",6,"띲띴띶",5,"띾띿랁랂랃랅",6,"랎랓랔랕랚랛랝랞"],["8e41","랟랡",6,"랪랮",5,"랶랷랹",8],["8e61","럂",4,"럈럊",19],["8e81","럞",13,"럮럯럱럲럳럵",6,"럾렂",4,"렊렋렍렎렏렑",6,"렚렜렞",5,"렦렧렩렪렫렭",6,"렶렺",5,"롁롂롃롅",11,"롒롔",7,"롞롟롡롢롣롥",6,"롮롰롲",5,"롹롺롻롽",7],["8f41","뢅",7,"뢎",17],["8f61","뢠",7,"뢩",6,"뢱뢲뢳뢵뢶뢷뢹",4],["8f81","뢾뢿룂룄룆",5,"룍룎룏룑룒룓룕",7,"룞룠룢",5,"룪룫룭룮룯룱",6,"룺룼룾",5,"뤅",18,"뤙",6,"뤡",26,"뤾뤿륁륂륃륅",6,"륍륎륐륒",5],["9041","륚륛륝륞륟륡",6,"륪륬륮",5,"륶륷륹륺륻륽"],["9061","륾",5,"릆릈릋릌릏",15],["9081","릟",12,"릮릯릱릲릳릵",6,"릾맀맂",5,"맊맋맍맓",4,"맚맜맟맠맢맦맧맩맪맫맭",6,"맶맻",4,"먂",5,"먉",11,"먖",33,"먺먻먽먾먿멁멃멄멅멆"],["9141","멇멊멌멏멐멑멒멖멗멙멚멛멝",6,"멦멪",5],["9161","멲멳멵멶멷멹",9,"몆몈몉몊몋몍",5],["9181","몓",20,"몪몭몮몯몱몳",4,"몺몼몾",5,"뫅뫆뫇뫉",14,"뫚",33,"뫽뫾뫿묁묂묃묅",7,"묎묐묒",5,"묙묚묛묝묞묟묡",6],["9241","묨묪묬",7,"묷묹묺묿",4,"뭆뭈뭊뭋뭌뭎뭑뭒"],["9261","뭓뭕뭖뭗뭙",7,"뭢뭤",7,"뭭",4],["9281","뭲",21,"뮉뮊뮋뮍뮎뮏뮑",18,"뮥뮦뮧뮩뮪뮫뮭",6,"뮵뮶뮸",7,"믁믂믃믅믆믇믉",6,"믑믒믔",35,"믺믻믽믾밁"],["9341","밃",4,"밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵"],["9361","밶밷밹",6,"뱂뱆뱇뱈뱊뱋뱎뱏뱑",8],["9381","뱚뱛뱜뱞",37,"벆벇벉벊벍벏",4,"벖벘벛",4,"벢벣벥벦벩",6,"벲벶",5,"벾벿볁볂볃볅",7,"볎볒볓볔볖볗볙볚볛볝",22,"볷볹볺볻볽"],["9441","볾",5,"봆봈봊",5,"봑봒봓봕",8],["9461","봞",5,"봥",6,"봭",12],["9481","봺",5,"뵁",6,"뵊뵋뵍뵎뵏뵑",6,"뵚",9,"뵥뵦뵧뵩",22,"붂붃붅붆붋",4,"붒붔붖붗붘붛붝",6,"붥",10,"붱",6,"붹",24],["9541","뷒뷓뷖뷗뷙뷚뷛뷝",11,"뷪",5,"뷱"],["9561","뷲뷳뷵뷶뷷뷹",6,"븁븂븄븆",5,"븎븏븑븒븓"],["9581","븕",6,"븞븠",35,"빆빇빉빊빋빍빏",4,"빖빘빜빝빞빟빢빣빥빦빧빩빫",4,"빲빶",4,"빾빿뺁뺂뺃뺅",6,"뺎뺒",5,"뺚",13,"뺩",14],["9641","뺸",23,"뻒뻓"],["9661","뻕뻖뻙",6,"뻡뻢뻦",5,"뻭",8],["9681","뻶",10,"뼂",5,"뼊",13,"뼚뼞",33,"뽂뽃뽅뽆뽇뽉",6,"뽒뽓뽔뽖",44],["9741","뾃",16,"뾕",8],["9761","뾞",17,"뾱",7],["9781","뾹",11,"뿆",5,"뿎뿏뿑뿒뿓뿕",6,"뿝뿞뿠뿢",89,"쀽쀾쀿"],["9841","쁀",16,"쁒",5,"쁙쁚쁛"],["9861","쁝쁞쁟쁡",6,"쁪",15],["9881","쁺",21,"삒삓삕삖삗삙",6,"삢삤삦",5,"삮삱삲삷",4,"삾샂샃샄샆샇샊샋샍샎샏샑",6,"샚샞",5,"샦샧샩샪샫샭",6,"샶샸샺",5,"섁섂섃섅섆섇섉",6,"섑섒섓섔섖",5,"섡섢섥섨섩섪섫섮"],["9941","섲섳섴섵섷섺섻섽섾섿셁",6,"셊셎",5,"셖셗"],["9961","셙셚셛셝",6,"셦셪",5,"셱셲셳셵셶셷셹셺셻"],["9981","셼",8,"솆",5,"솏솑솒솓솕솗",4,"솞솠솢솣솤솦솧솪솫솭솮솯솱",11,"솾",5,"쇅쇆쇇쇉쇊쇋쇍",6,"쇕쇖쇙",6,"쇡쇢쇣쇥쇦쇧쇩",6,"쇲쇴",7,"쇾쇿숁숂숃숅",6,"숎숐숒",5,"숚숛숝숞숡숢숣"],["9a41","숤숥숦숧숪숬숮숰숳숵",16],["9a61","쉆쉇쉉",6,"쉒쉓쉕쉖쉗쉙",6,"쉡쉢쉣쉤쉦"],["9a81","쉧",4,"쉮쉯쉱쉲쉳쉵",6,"쉾슀슂",5,"슊",5,"슑",6,"슙슚슜슞",5,"슦슧슩슪슫슮",5,"슶슸슺",33,"싞싟싡싢싥",5,"싮싰싲싳싴싵싷싺싽싾싿쌁",6,"쌊쌋쌎쌏"],["9b41","쌐쌑쌒쌖쌗쌙쌚쌛쌝",6,"쌦쌧쌪",8],["9b61","쌳",17,"썆",7],["9b81","썎",25,"썪썫썭썮썯썱썳",4,"썺썻썾",5,"쎅쎆쎇쎉쎊쎋쎍",50,"쏁",22,"쏚"],["9c41","쏛쏝쏞쏡쏣",4,"쏪쏫쏬쏮",5,"쏶쏷쏹",5],["9c61","쏿",8,"쐉",6,"쐑",9],["9c81","쐛",8,"쐥",6,"쐭쐮쐯쐱쐲쐳쐵",6,"쐾",9,"쑉",26,"쑦쑧쑩쑪쑫쑭",6,"쑶쑷쑸쑺",5,"쒁",18,"쒕",6,"쒝",12],["9d41","쒪",13,"쒹쒺쒻쒽",8],["9d61","쓆",25],["9d81","쓠",8,"쓪",5,"쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂",9,"씍씎씏씑씒씓씕",6,"씝",10,"씪씫씭씮씯씱",6,"씺씼씾",5,"앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩",6,"앲앶",5,"앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔"],["9e41","얖얙얚얛얝얞얟얡",7,"얪",9,"얶"],["9e61","얷얺얿",4,"엋엍엏엒엓엕엖엗엙",6,"엢엤엦엧"],["9e81","엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑",6,"옚옝",6,"옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉",6,"왒왖",5,"왞왟왡",10,"왭왮왰왲",5,"왺왻왽왾왿욁",6,"욊욌욎",5,"욖욗욙욚욛욝",6,"욦"],["9f41","욨욪",5,"욲욳욵욶욷욻",4,"웂웄웆",5,"웎"],["9f61","웏웑웒웓웕",6,"웞웟웢",5,"웪웫웭웮웯웱웲"],["9f81","웳",4,"웺웻웼웾",5,"윆윇윉윊윋윍",6,"윖윘윚",5,"윢윣윥윦윧윩",6,"윲윴윶윸윹윺윻윾윿읁읂읃읅",4,"읋읎읐읙읚읛읝읞읟읡",6,"읩읪읬",7,"읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛",4,"잢잧",4,"잮잯잱잲잳잵잶잷"],["a041","잸잹잺잻잾쟂",5,"쟊쟋쟍쟏쟑",6,"쟙쟚쟛쟜"],["a061","쟞",5,"쟥쟦쟧쟩쟪쟫쟭",13],["a081","쟻",4,"젂젃젅젆젇젉젋",4,"젒젔젗",4,"젞젟젡젢젣젥",6,"젮젰젲",5,"젹젺젻젽젾젿졁",6,"졊졋졎",5,"졕",26,"졲졳졵졶졷졹졻",4,"좂좄좈좉좊좎",5,"좕",7,"좞좠좢좣좤"],["a141","좥좦좧좩",18,"좾좿죀죁"],["a161","죂죃죅죆죇죉죊죋죍",6,"죖죘죚",5,"죢죣죥"],["a181","죦",14,"죶",5,"죾죿줁줂줃줇",4,"줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈",9,"±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢"],["a241","줐줒",5,"줙",18],["a261","줭",6,"줵",18],["a281","쥈",7,"쥒쥓쥕쥖쥗쥙",6,"쥢쥤",7,"쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®"],["a341","쥱쥲쥳쥵",6,"쥽",10,"즊즋즍즎즏"],["a361","즑",6,"즚즜즞",16],["a381","즯",16,"짂짃짅짆짉짋",4,"짒짔짗짘짛！",58,"￦］",32,"￣"],["a441","짞짟짡짣짥짦짨짩짪짫짮짲",5,"짺짻짽짾짿쨁쨂쨃쨄"],["a461","쨅쨆쨇쨊쨎",5,"쨕쨖쨗쨙",12],["a481","쨦쨧쨨쨪",28,"ㄱ",93],["a541","쩇",4,"쩎쩏쩑쩒쩓쩕",6,"쩞쩢",5,"쩩쩪"],["a561","쩫",17,"쩾",5,"쪅쪆"],["a581","쪇",16,"쪙",14,"ⅰ",9],["a5b0","Ⅰ",9],["a5c1","Α",16,"Σ",6],["a5e1","α",16,"σ",6],["a641","쪨",19,"쪾쪿쫁쫂쫃쫅"],["a661","쫆",5,"쫎쫐쫒쫔쫕쫖쫗쫚",5,"쫡",6],["a681","쫨쫩쫪쫫쫭",6,"쫵",18,"쬉쬊─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃",7],["a741","쬋",4,"쬑쬒쬓쬕쬖쬗쬙",6,"쬢",7],["a761","쬪",22,"쭂쭃쭄"],["a781","쭅쭆쭇쭊쭋쭍쭎쭏쭑",6,"쭚쭛쭜쭞",5,"쭥",7,"㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙",9,"㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰",9,"㎀",4,"㎺",5,"㎐",4,"Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆"],["a841","쭭",10,"쭺",14],["a861","쮉",18,"쮝",6],["a881","쮤",19,"쮹",11,"ÆÐªĦ"],["a8a6","Ĳ"],["a8a8","ĿŁØŒºÞŦŊ"],["a8b1","㉠",27,"ⓐ",25,"①",14,"½⅓⅔¼¾⅛⅜⅝⅞"],["a941","쯅",14,"쯕",10],["a961","쯠쯡쯢쯣쯥쯦쯨쯪",18],["a981","쯽",14,"찎찏찑찒찓찕",6,"찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀",27,"⒜",25,"⑴",14,"¹²³⁴ⁿ₁₂₃₄"],["aa41","찥찦찪찫찭찯찱",6,"찺찿",4,"챆챇챉챊챋챍챎"],["aa61","챏",4,"챖챚",5,"챡챢챣챥챧챩",6,"챱챲"],["aa81","챳챴챶",29,"ぁ",82],["ab41","첔첕첖첗첚첛첝첞첟첡",6,"첪첮",5,"첶첷첹"],["ab61","첺첻첽",6,"쳆쳈쳊",5,"쳑쳒쳓쳕",5],["ab81","쳛",8,"쳥",6,"쳭쳮쳯쳱",12,"ァ",85],["ac41","쳾쳿촀촂",5,"촊촋촍촎촏촑",6,"촚촜촞촟촠"],["ac61","촡촢촣촥촦촧촩촪촫촭",11,"촺",4],["ac81","촿",28,"쵝쵞쵟А",5,"ЁЖ",25],["acd1","а",5,"ёж",25],["ad41","쵡쵢쵣쵥",6,"쵮쵰쵲",5,"쵹",7],["ad61","춁",6,"춉",10,"춖춗춙춚춛춝춞춟"],["ad81","춠춡춢춣춦춨춪",5,"춱",18,"췅"],["ae41","췆",5,"췍췎췏췑",16],["ae61","췢",5,"췩췪췫췭췮췯췱",6,"췺췼췾",4],["ae81","츃츅츆츇츉츊츋츍",6,"츕츖츗츘츚",5,"츢츣츥츦츧츩츪츫"],["af41","츬츭츮츯츲츴츶",19],["af61","칊",13,"칚칛칝칞칢",5,"칪칬"],["af81","칮",5,"칶칷칹칺칻칽",6,"캆캈캊",5,"캒캓캕캖캗캙"],["b041","캚",5,"캢캦",5,"캮",12],["b061","캻",5,"컂",19],["b081","컖",13,"컦컧컩컪컭",6,"컶컺",5,"가각간갇갈갉갊감",7,"같",4,"갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆"],["b141","켂켃켅켆켇켉",6,"켒켔켖",5,"켝켞켟켡켢켣"],["b161","켥",6,"켮켲",5,"켹",11],["b181","콅",14,"콖콗콙콚콛콝",6,"콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸"],["b241","콭콮콯콲콳콵콶콷콹",6,"쾁쾂쾃쾄쾆",5,"쾍"],["b261","쾎",18,"쾢",5,"쾩"],["b281","쾪",5,"쾱",18,"쿅",6,"깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙"],["b341","쿌",19,"쿢쿣쿥쿦쿧쿩"],["b361","쿪",5,"쿲쿴쿶",5,"쿽쿾쿿퀁퀂퀃퀅",5],["b381","퀋",5,"퀒",5,"퀙",19,"끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫",4,"낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝"],["b441","퀮",5,"퀶퀷퀹퀺퀻퀽",6,"큆큈큊",5],["b461","큑큒큓큕큖큗큙",6,"큡",10,"큮큯"],["b481","큱큲큳큵",6,"큾큿킀킂",18,"뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫",4,"닳담답닷",4,"닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥"],["b541","킕",14,"킦킧킩킪킫킭",5],["b561","킳킶킸킺",5,"탂탃탅탆탇탊",5,"탒탖",4],["b581","탛탞탟탡탢탣탥",6,"탮탲",5,"탹",11,"덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸"],["b641","턅",7,"턎",17],["b661","턠",15,"턲턳턵턶턷턹턻턼턽턾"],["b681","턿텂텆",5,"텎텏텑텒텓텕",6,"텞텠텢",5,"텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗"],["b741","텮",13,"텽",6,"톅톆톇톉톊"],["b761","톋",20,"톢톣톥톦톧"],["b781","톩",6,"톲톴톶톷톸톹톻톽톾톿퇁",14,"래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩"],["b841","퇐",7,"퇙",17],["b861","퇫",8,"퇵퇶퇷퇹",13],["b881","툈툊",5,"툑",24,"륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많",4,"맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼"],["b941","툪툫툮툯툱툲툳툵",6,"툾퉀퉂",5,"퉉퉊퉋퉌"],["b961","퉍",14,"퉝",6,"퉥퉦퉧퉨"],["b981","퉩",22,"튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바",4,"받",4,"밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗"],["ba41","튍튎튏튒튓튔튖",5,"튝튞튟튡튢튣튥",6,"튭"],["ba61","튮튯튰튲",5,"튺튻튽튾틁틃",4,"틊틌",5],["ba81","틒틓틕틖틗틙틚틛틝",6,"틦",9,"틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤"],["bb41","틻",4,"팂팄팆",5,"팏팑팒팓팕팗",4,"팞팢팣"],["bb61","팤팦팧팪팫팭팮팯팱",6,"팺팾",5,"퍆퍇퍈퍉"],["bb81","퍊",31,"빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤"],["bc41","퍪",17,"퍾퍿펁펂펃펅펆펇"],["bc61","펈펉펊펋펎펒",5,"펚펛펝펞펟펡",6,"펪펬펮"],["bc81","펯",4,"펵펶펷펹펺펻펽",6,"폆폇폊",5,"폑",5,"샥샨샬샴샵샷샹섀섄섈섐섕서",4,"섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭"],["bd41","폗폙",7,"폢폤",7,"폮폯폱폲폳폵폶폷"],["bd61","폸폹폺폻폾퐀퐂",5,"퐉",13],["bd81","퐗",5,"퐞",25,"숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰"],["be41","퐸",7,"푁푂푃푅",14],["be61","푔",7,"푝푞푟푡푢푣푥",7,"푮푰푱푲"],["be81","푳",4,"푺푻푽푾풁풃",4,"풊풌풎",5,"풕",8,"쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄",6,"엌엎"],["bf41","풞",10,"풪",14],["bf61","풹",18,"퓍퓎퓏퓑퓒퓓퓕"],["bf81","퓖",5,"퓝퓞퓠",7,"퓩퓪퓫퓭퓮퓯퓱",6,"퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염",5,"옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨"],["c041","퓾",5,"픅픆픇픉픊픋픍",6,"픖픘",5],["c061","픞",25],["c081","픸픹픺픻픾픿핁핂핃핅",6,"핎핐핒",5,"핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응",7,"읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊"],["c141","핤핦핧핪핬핮",5,"핶핷핹핺핻핽",6,"햆햊햋"],["c161","햌햍햎햏햑",19,"햦햧"],["c181","햨",31,"점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓"],["c241","헊헋헍헎헏헑헓",4,"헚헜헞",5,"헦헧헩헪헫헭헮"],["c261","헯",4,"헶헸헺",5,"혂혃혅혆혇혉",6,"혒"],["c281","혖",5,"혝혞혟혡혢혣혥",7,"혮",9,"혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻"],["c341","혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝",4],["c361","홢",4,"홨홪",5,"홲홳홵",11],["c381","횁횂횄횆",5,"횎횏횑횒횓횕",7,"횞횠횢",5,"횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층"],["c441","횫횭횮횯횱",7,"횺횼",7,"훆훇훉훊훋"],["c461","훍훎훏훐훒훓훕훖훘훚",5,"훡훢훣훥훦훧훩",4],["c481","훮훯훱훲훳훴훶",5,"훾훿휁휂휃휅",11,"휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼"],["c541","휕휖휗휚휛휝휞휟휡",6,"휪휬휮",5,"휶휷휹"],["c561","휺휻휽",6,"흅흆흈흊",5,"흒흓흕흚",4],["c581","흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵",6,"흾흿힀힂",5,"힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜"],["c641","힍힎힏힑",6,"힚힜힞",5],["c6a1","퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁"],["c7a1","퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠"],["c8a1","혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝"],["caa1","伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕"],["cba1","匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢"],["cca1","瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械"],["cda1","棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜"],["cea1","科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾"],["cfa1","區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴"],["d0a1","鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣"],["d1a1","朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩",5,"那樂",4,"諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉"],["d2a1","納臘蠟衲囊娘廊",4,"乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧",5,"駑魯",10,"濃籠聾膿農惱牢磊腦賂雷尿壘",7,"嫩訥杻紐勒",5,"能菱陵尼泥匿溺多茶"],["d3a1","丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃"],["d4a1","棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅"],["d5a1","蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣"],["d6a1","煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼"],["d7a1","遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬"],["d8a1","立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅"],["d9a1","蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文"],["daa1","汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑"],["dba1","發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖"],["dca1","碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦"],["dda1","孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥"],["dea1","脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索"],["dfa1","傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署"],["e0a1","胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬"],["e1a1","聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁"],["e2a1","戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧"],["e3a1","嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁"],["e4a1","沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額"],["e5a1","櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬"],["e6a1","旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒"],["e7a1","簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳"],["e8a1","烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療"],["e9a1","窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓"],["eaa1","運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜"],["eba1","濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼"],["eca1","議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄"],["eda1","立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長"],["eea1","障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱"],["efa1","煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖"],["f0a1","靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫"],["f1a1","踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只"],["f2a1","咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯"],["f3a1","鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策"],["f4a1","責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢"],["f5a1","椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃"],["f6a1","贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託"],["f7a1","鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑"],["f8a1","阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃"],["f9a1","品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航"],["faa1","行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型"],["fba1","形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵"],["fca1","禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆"],["fda1","爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰"]]'
			);
		},
		function (e) {
			e.exports = JSON.parse(
				'[["8740","䏰䰲䘃䖦䕸𧉧䵷䖳𧲱䳢𧳅㮕䜶䝄䱇䱀𤊿𣘗𧍒𦺋𧃒䱗𪍑䝏䗚䲅𧱬䴇䪤䚡𦬣爥𥩔𡩣𣸆𣽡晍囻"],["8767","綕夝𨮹㷴霴𧯯寛𡵞媤㘥𩺰嫑宷峼杮薓𩥅瑡璝㡵𡵓𣚞𦀡㻬"],["87a1","𥣞㫵竼龗𤅡𨤍𣇪𠪊𣉞䌊蒄龖鐯䤰蘓墖靊鈘秐稲晠権袝瑌篅枂稬剏遆㓦珄𥶹瓆鿇垳䤯呌䄱𣚎堘穲𧭥讏䚮𦺈䆁𥶙箮𢒼鿈𢓁𢓉𢓌鿉蔄𣖻䂴鿊䓡𪷿拁灮鿋"],["8840","㇀",4,"𠄌㇅𠃑𠃍㇆㇇𠃋𡿨㇈𠃊㇉㇊㇋㇌𠄎㇍㇎ĀÁǍÀĒÉĚÈŌÓǑÒ࿿Ê̄Ế࿿Ê̌ỀÊāáǎàɑēéěèīíǐìōóǒòūúǔùǖǘǚ"],["88a1","ǜü࿿ê̄ế࿿ê̌ềêɡ⏚⏛"],["8940","𪎩𡅅"],["8943","攊"],["8946","丽滝鵎釟"],["894c","𧜵撑会伨侨兖兴农凤务动医华发变团声处备夲头学实実岚庆总斉柾栄桥济炼电纤纬纺织经统缆缷艺苏药视设询车轧轮"],["89a1","琑糼緍楆竉刧"],["89ab","醌碸酞肼"],["89b0","贋胶𠧧"],["89b5","肟黇䳍鷉鸌䰾𩷶𧀎鸊𪄳㗁"],["89c1","溚舾甙"],["89c5","䤑马骏龙禇𨑬𡷊𠗐𢫦两亁亀亇亿仫伷㑌侽㹈倃傈㑽㒓㒥円夅凛凼刅争剹劐匧㗇厩㕑厰㕓参吣㕭㕲㚁咓咣咴咹哐哯唘唣唨㖘唿㖥㖿嗗㗅"],["8a40","𧶄唥"],["8a43","𠱂𠴕𥄫喐𢳆㧬𠍁蹆𤶸𩓥䁓𨂾睺𢰸㨴䟕𨅝𦧲𤷪擝𠵼𠾴𠳕𡃴撍蹾𠺖𠰋𠽤𢲩𨉖𤓓"],["8a64","𠵆𩩍𨃩䟴𤺧𢳂骲㩧𩗴㿭㔆𥋇𩟔𧣈𢵄鵮頕"],["8a76","䏙𦂥撴哣𢵌𢯊𡁷㧻𡁯"],["8aa1","𦛚𦜖𧦠擪𥁒𠱃蹨𢆡𨭌𠜱"],["8aac","䠋𠆩㿺塳𢶍"],["8ab2","𤗈𠓼𦂗𠽌𠶖啹䂻䎺"],["8abb","䪴𢩦𡂝膪飵𠶜捹㧾𢝵跀嚡摼㹃"],["8ac9","𪘁𠸉𢫏𢳉"],["8ace","𡃈𣧂㦒㨆𨊛㕸𥹉𢃇噒𠼱𢲲𩜠㒼氽𤸻"],["8adf","𧕴𢺋𢈈𪙛𨳍𠹺𠰴𦠜羓𡃏𢠃𢤹㗻𥇣𠺌𠾍𠺪㾓𠼰𠵇𡅏𠹌"],["8af6","𠺫𠮩𠵈𡃀𡄽㿹𢚖搲𠾭"],["8b40","𣏴𧘹𢯎𠵾𠵿𢱑𢱕㨘𠺘𡃇𠼮𪘲𦭐𨳒𨶙𨳊閪哌苄喹"],["8b55","𩻃鰦骶𧝞𢷮煀腭胬尜𦕲脴㞗卟𨂽醶𠻺𠸏𠹷𠻻㗝𤷫㘉𠳖嚯𢞵𡃉𠸐𠹸𡁸𡅈𨈇𡑕𠹹𤹐𢶤婔𡀝𡀞𡃵𡃶垜𠸑"],["8ba1","𧚔𨋍𠾵𠹻𥅾㜃𠾶𡆀𥋘𪊽𤧚𡠺𤅷𨉼墙剨㘚𥜽箲孨䠀䬬鼧䧧鰟鮍𥭴𣄽嗻㗲嚉丨夂𡯁屮靑𠂆乛亻㔾尣彑忄㣺扌攵歺氵氺灬爫丬犭𤣩罒礻糹罓𦉪㓁"],["8bde","𦍋耂肀𦘒𦥑卝衤见𧢲讠贝钅镸长门𨸏韦页风飞饣𩠐鱼鸟黄歯龜丷𠂇阝户钢"],["8c40","倻淾𩱳龦㷉袏𤅎灷峵䬠𥇍㕙𥴰愢𨨲辧釶熑朙玺𣊁𪄇㲋𡦀䬐磤琂冮𨜏䀉橣𪊺䈣蘏𠩯稪𩥇𨫪靕灍匤𢁾鏴盙𨧣龧矝亣俰傼丯众龨吴綋墒壐𡶶庒庙忂𢜒斋"],["8ca1","𣏹椙橃𣱣泿"],["8ca7","爀𤔅玌㻛𤨓嬕璹讃𥲤𥚕窓篬糃繬苸薗龩袐龪躹龫迏蕟駠鈡龬𨶹𡐿䁱䊢娚"],["8cc9","顨杫䉶圽"],["8cce","藖𤥻芿𧄍䲁𦵴嵻𦬕𦾾龭龮宖龯曧繛湗秊㶈䓃𣉖𢞖䎚䔶"],["8ce6","峕𣬚諹屸㴒𣕑嵸龲煗䕘𤃬𡸣䱷㥸㑊𠆤𦱁諌侴𠈹妿腬顖𩣺弻"],["8d40","𠮟"],["8d42","𢇁𨥭䄂䚻𩁹㼇龳𪆵䃸㟖䛷𦱆䅼𨚲𧏿䕭㣔𥒚䕡䔛䶉䱻䵶䗪㿈𤬏㙡䓞䒽䇭崾嵈嵖㷼㠏嶤嶹㠠㠸幂庽弥徃㤈㤔㤿㥍惗愽峥㦉憷憹懏㦸戬抐拥挘㧸嚱"],["8da1","㨃揢揻搇摚㩋擀崕嘡龟㪗斆㪽旿晓㫲暒㬢朖㭂枤栀㭘桊梄㭲㭱㭻椉楃牜楤榟榅㮼槖㯝橥橴橱檂㯬檙㯲檫檵櫔櫶殁毁毪汵沪㳋洂洆洦涁㳯涤涱渕渘温溆𨧀溻滢滚齿滨滩漤漴㵆𣽁澁澾㵪㵵熷岙㶊瀬㶑灐灔灯灿炉𠌥䏁㗱𠻘"],["8e40","𣻗垾𦻓焾𥟠㙎榢𨯩孴穉𥣡𩓙穥穽𥦬窻窰竂竃燑𦒍䇊竚竝竪䇯咲𥰁笋筕笩𥌎𥳾箢筯莜𥮴𦱿篐萡箒箸𥴠㶭𥱥蒒篺簆簵𥳁籄粃𤢂粦晽𤕸糉糇糦籴糳糵糎"],["8ea1","繧䔝𦹄絝𦻖璍綉綫焵綳緒𤁗𦀩緤㴓緵𡟹緥𨍭縝𦄡𦅚繮纒䌫鑬縧罀罁罇礶𦋐駡羗𦍑羣𡙡𠁨䕜𣝦䔃𨌺翺𦒉者耈耝耨耯𪂇𦳃耻耼聡𢜔䦉𦘦𣷣𦛨朥肧𨩈脇脚墰𢛶汿𦒘𤾸擧𡒊舘𡡞橓𤩥𤪕䑺舩𠬍𦩒𣵾俹𡓽蓢荢𦬊𤦧𣔰𡝳𣷸芪椛芳䇛"],["8f40","蕋苐茚𠸖𡞴㛁𣅽𣕚艻苢茘𣺋𦶣𦬅𦮗𣗎㶿茝嗬莅䔋𦶥莬菁菓㑾𦻔橗蕚㒖𦹂𢻯葘𥯤葱㷓䓤檧葊𣲵祘蒨𦮖𦹷𦹃蓞萏莑䒠蒓蓤𥲑䉀𥳀䕃蔴嫲𦺙䔧蕳䔖枿蘖"],["8fa1","𨘥𨘻藁𧂈蘂𡖂𧃍䕫䕪蘨㙈𡢢号𧎚虾蝱𪃸蟮𢰧螱蟚蠏噡虬桖䘏衅衆𧗠𣶹𧗤衞袜䙛袴袵揁装睷𧜏覇覊覦覩覧覼𨨥觧𧤤𧪽誜瞓釾誐𧩙竩𧬺𣾏䜓𧬸煼謌謟𥐰𥕥謿譌譍誩𤩺讐讛誯𡛟䘕衏貛𧵔𧶏貫㜥𧵓賖𧶘𧶽贒贃𡤐賛灜贑𤳉㻐起"],["9040","趩𨀂𡀔𤦊㭼𨆼𧄌竧躭躶軃鋔輙輭𨍥𨐒辥錃𪊟𠩐辳䤪𨧞𨔽𣶻廸𣉢迹𪀔𨚼𨔁𢌥㦀𦻗逷𨔼𧪾遡𨕬𨘋邨𨜓郄𨛦邮都酧㫰醩釄粬𨤳𡺉鈎沟鉁鉢𥖹銹𨫆𣲛𨬌𥗛"],["90a1","𠴱錬鍫𨫡𨯫炏嫃𨫢𨫥䥥鉄𨯬𨰹𨯿鍳鑛躼閅閦鐦閠濶䊹𢙺𨛘𡉼𣸮䧟氜陻隖䅬隣𦻕懚隶磵𨫠隽双䦡𦲸𠉴𦐐𩂯𩃥𤫑𡤕𣌊霱虂霶䨏䔽䖅𤫩灵孁霛靜𩇕靗孊𩇫靟鐥僐𣂷𣂼鞉鞟鞱鞾韀韒韠𥑬韮琜𩐳響韵𩐝𧥺䫑頴頳顋顦㬎𧅵㵑𠘰𤅜"],["9140","𥜆飊颷飈飇䫿𦴧𡛓喰飡飦飬鍸餹𤨩䭲𩡗𩤅駵騌騻騐驘𥜥㛄𩂱𩯕髠髢𩬅髴䰎鬔鬭𨘀倴鬴𦦨㣃𣁽魐魀𩴾婅𡡣鮎𤉋鰂鯿鰌𩹨鷔𩾷𪆒𪆫𪃡𪄣𪇟鵾鶃𪄴鸎梈"],["91a1","鷄𢅛𪆓𪈠𡤻𪈳鴹𪂹𪊴麐麕麞麢䴴麪麯𤍤黁㭠㧥㴝伲㞾𨰫鼂鼈䮖鐤𦶢鼗鼖鼹嚟嚊齅馸𩂋韲葿齢齩竜龎爖䮾𤥵𤦻煷𤧸𤍈𤩑玞𨯚𡣺禟𨥾𨸶鍩鏳𨩄鋬鎁鏋𨥬𤒹爗㻫睲穃烐𤑳𤏸煾𡟯炣𡢾𣖙㻇𡢅𥐯𡟸㜢𡛻𡠹㛡𡝴𡣑𥽋㜣𡛀坛𤨥𡏾𡊨"],["9240","𡏆𡒶蔃𣚦蔃葕𤦔𧅥𣸱𥕜𣻻𧁒䓴𣛮𩦝𦼦柹㜳㰕㷧塬𡤢栐䁗𣜿𤃡𤂋𤄏𦰡哋嚞𦚱嚒𠿟𠮨𠸍鏆𨬓鎜仸儫㠙𤐶亼𠑥𠍿佋侊𥙑婨𠆫𠏋㦙𠌊𠐔㐵伩𠋀𨺳𠉵諚𠈌亘"],["92a1","働儍侢伃𤨎𣺊佂倮偬傁俌俥偘僼兙兛兝兞湶𣖕𣸹𣺿浲𡢄𣺉冨凃𠗠䓝𠒣𠒒𠒑赺𨪜𠜎剙劤𠡳勡鍮䙺熌𤎌𠰠𤦬𡃤槑𠸝瑹㻞璙琔瑖玘䮎𤪼𤂍叐㖄爏𤃉喴𠍅响𠯆圝鉝雴鍦埝垍坿㘾壋媙𨩆𡛺𡝯𡜐娬妸銏婾嫏娒𥥆𡧳𡡡𤊕㛵洅瑃娡𥺃"],["9340","媁𨯗𠐓鏠璌𡌃焅䥲鐈𨧻鎽㞠尞岞幞幈𡦖𡥼𣫮廍孏𡤃𡤄㜁𡢠㛝𡛾㛓脪𨩇𡶺𣑲𨦨弌弎𡤧𡞫婫𡜻孄蘔𧗽衠恾𢡠𢘫忛㺸𢖯𢖾𩂈𦽳懀𠀾𠁆𢘛憙憘恵𢲛𢴇𤛔𩅍"],["93a1","摱𤙥𢭪㨩𢬢𣑐𩣪𢹸挷𪑛撶挱揑𤧣𢵧护𢲡搻敫楲㯴𣂎𣊭𤦉𣊫唍𣋠𡣙𩐿曎𣊉𣆳㫠䆐𥖄𨬢𥖏𡛼𥕛𥐥磮𣄃𡠪𣈴㑤𣈏𣆂𤋉暎𦴤晫䮓昰𧡰𡷫晣𣋒𣋡昞𥡲㣑𣠺𣞼㮙𣞢𣏾瓐㮖枏𤘪梶栞㯄檾㡣𣟕𤒇樳橒櫉欅𡤒攑梘橌㯗橺歗𣿀𣲚鎠鋲𨯪𨫋"],["9440","銉𨀞𨧜鑧涥漋𤧬浧𣽿㶏渄𤀼娽渊塇洤硂焻𤌚𤉶烱牐犇犔𤞏𤜥兹𤪤𠗫瑺𣻸𣙟𤩊𤤗𥿡㼆㺱𤫟𨰣𣼵悧㻳瓌琼鎇琷䒟𦷪䕑疃㽣𤳙𤴆㽘畕癳𪗆㬙瑨𨫌𤦫𤦎㫻"],["94a1","㷍𤩎㻿𤧅𤣳釺圲鍂𨫣𡡤僟𥈡𥇧睸𣈲眎眏睻𤚗𣞁㩞𤣰琸璛㺿𤪺𤫇䃈𤪖𦆮錇𥖁砞碍碈磒珐祙𧝁𥛣䄎禛蒖禥樭𣻺稺秴䅮𡛦䄲鈵秱𠵌𤦌𠊙𣶺𡝮㖗啫㕰㚪𠇔𠰍竢婙𢛵𥪯𥪜娍𠉛磰娪𥯆竾䇹籝籭䈑𥮳𥺼𥺦糍𤧹𡞰粎籼粮檲緜縇緓罎𦉡"],["9540","𦅜𧭈綗𥺂䉪𦭵𠤖柖𠁎𣗏埄𦐒𦏸𤥢翝笧𠠬𥫩𥵃笌𥸎駦虅驣樜𣐿㧢𤧷𦖭騟𦖠蒀𧄧𦳑䓪脷䐂胆脉腂𦞴飃𦩂艢艥𦩑葓𦶧蘐𧈛媆䅿𡡀嬫𡢡嫤𡣘蚠蜨𣶏蠭𧐢娂"],["95a1","衮佅袇袿裦襥襍𥚃襔𧞅𧞄𨯵𨯙𨮜𨧹㺭蒣䛵䛏㟲訽訜𩑈彍鈫𤊄旔焩烄𡡅鵭貟賩𧷜妚矃姰䍮㛔踪躧𤰉輰轊䋴汘澻𢌡䢛潹溋𡟚鯩㚵𤤯邻邗啱䤆醻鐄𨩋䁢𨫼鐧𨰝𨰻蓥訫閙閧閗閖𨴴瑅㻂𤣿𤩂𤏪㻧𣈥随𨻧𨹦𨹥㻌𤧭𤩸𣿮琒瑫㻼靁𩂰"],["9640","桇䨝𩂓𥟟靝鍨𨦉𨰦𨬯𦎾銺嬑譩䤼珹𤈛鞛靱餸𠼦巁𨯅𤪲頟𩓚鋶𩗗釥䓀𨭐𤩧𨭤飜𨩅㼀鈪䤥萔餻饍𧬆㷽馛䭯馪驜𨭥𥣈檏騡嫾騯𩣱䮐𩥈馼䮽䮗鍽塲𡌂堢𤦸"],["96a1","𡓨硄𢜟𣶸棅㵽鑘㤧慐𢞁𢥫愇鱏鱓鱻鰵鰐魿鯏𩸭鮟𪇵𪃾鴡䲮𤄄鸘䲰鴌𪆴𪃭𪃳𩤯鶥蒽𦸒𦿟𦮂藼䔳𦶤𦺄𦷰萠藮𦸀𣟗𦁤秢𣖜𣙀䤭𤧞㵢鏛銾鍈𠊿碹鉷鑍俤㑀遤𥕝砽硔碶硋𡝗𣇉𤥁㚚佲濚濙瀞瀞吔𤆵垻壳垊鴖埗焴㒯𤆬燫𦱀𤾗嬨𡞵𨩉"],["9740","愌嫎娋䊼𤒈㜬䭻𨧼鎻鎸𡣖𠼝葲𦳀𡐓𤋺𢰦𤏁妔𣶷𦝁綨𦅛𦂤𤦹𤦋𨧺鋥珢㻩璴𨭣𡢟㻡𤪳櫘珳珻㻖𤨾𤪔𡟙𤩦𠎧𡐤𤧥瑈𤤖炥𤥶銄珦鍟𠓾錱𨫎𨨖鎆𨯧𥗕䤵𨪂煫"],["97a1","𤥃𠳿嚤𠘚𠯫𠲸唂秄𡟺緾𡛂𤩐𡡒䔮鐁㜊𨫀𤦭妰𡢿𡢃𧒄媡㛢𣵛㚰鉟婹𨪁𡡢鍴㳍𠪴䪖㦊僴㵩㵌𡎜煵䋻𨈘渏𩃤䓫浗𧹏灧沯㳖𣿭𣸭渂漌㵯𠏵畑㚼㓈䚀㻚䡱姄鉮䤾轁𨰜𦯀堒埈㛖𡑒烾𤍢𤩱𢿣𡊰𢎽梹楧𡎘𣓥𧯴𣛟𨪃𣟖𣏺𤲟樚𣚭𦲷萾䓟䓎"],["9840","𦴦𦵑𦲂𦿞漗𧄉茽𡜺菭𦲀𧁓𡟛妉媂𡞳婡婱𡤅𤇼㜭姯𡜼㛇熎鎐暚𤊥婮娫𤊓樫𣻹𧜶𤑛𤋊焝𤉙𨧡侰𦴨峂𤓎𧹍𤎽樌𤉖𡌄炦焳𤏩㶥泟勇𤩏繥姫崯㷳彜𤩝𡟟綤萦"],["98a1","咅𣫺𣌀𠈔坾𠣕𠘙㿥𡾞𪊶瀃𩅛嵰玏糓𨩙𩐠俈翧狍猐𧫴猸猹𥛶獁獈㺩𧬘遬燵𤣲珡臶㻊県㻑沢国琙琞琟㻢㻰㻴㻺瓓㼎㽓畂畭畲疍㽼痈痜㿀癍㿗癴㿜発𤽜熈嘣覀塩䀝睃䀹条䁅㗛瞘䁪䁯属瞾矋売砘点砜䂨砹硇硑硦葈𥔵礳栃礲䄃"],["9940","䄉禑禙辻稆込䅧窑䆲窼艹䇄竏竛䇏両筢筬筻簒簛䉠䉺类粜䊌粸䊔糭输烀𠳏総緔緐緽羮羴犟䎗耠耥笹耮耱联㷌垴炠肷胩䏭脌猪脎脒畠脔䐁㬹腖腙腚"],["99a1","䐓堺腼膄䐥膓䐭膥埯臁臤艔䒏芦艶苊苘苿䒰荗险榊萅烵葤惣蒈䔄蒾蓡蓸蔐蔸蕒䔻蕯蕰藠䕷虲蚒蚲蛯际螋䘆䘗袮裿褤襇覑𧥧訩訸誔誴豑賔賲贜䞘塟跃䟭仮踺嗘坔蹱嗵躰䠷軎転軤軭軲辷迁迊迌逳駄䢭飠鈓䤞鈨鉘鉫銱銮銿"],["9a40","鋣鋫鋳鋴鋽鍃鎄鎭䥅䥑麿鐗匁鐝鐭鐾䥪鑔鑹锭関䦧间阳䧥枠䨤靀䨵鞲韂噔䫤惨颹䬙飱塄餎餙冴餜餷饂饝饢䭰駅䮝騼鬏窃魩鮁鯝鯱鯴䱭鰠㝯𡯂鵉鰺"],["9aa1","黾噐鶓鶽鷀鷼银辶鹻麬麱麽黆铜黢黱黸竈齄𠂔𠊷𠎠椚铃妬𠓗塀铁㞹𠗕𠘕𠙶𡚺块煳𠫂𠫍𠮿呪吆𠯋咞𠯻𠰻𠱓𠱥𠱼惧𠲍噺𠲵𠳝𠳭𠵯𠶲𠷈楕鰯螥𠸄𠸎𠻗𠾐𠼭𠹳尠𠾼帋𡁜𡁏𡁶朞𡁻𡂈𡂖㙇𡂿𡃓𡄯𡄻卤蒭𡋣𡍵𡌶讁𡕷𡘙𡟃𡟇乸炻𡠭𡥪"],["9b40","𡨭𡩅𡰪𡱰𡲬𡻈拃𡻕𡼕熘桕𢁅槩㛈𢉼𢏗𢏺𢜪𢡱𢥏苽𢥧𢦓𢫕覥𢫨辠𢬎鞸𢬿顇骽𢱌"],["9b62","𢲈𢲷𥯨𢴈𢴒𢶷𢶕𢹂𢽴𢿌𣀳𣁦𣌟𣏞徱晈暿𧩹𣕧𣗳爁𤦺矗𣘚𣜖纇𠍆墵朎"],["9ba1","椘𣪧𧙗𥿢𣸑𣺹𧗾𢂚䣐䪸𤄙𨪚𤋮𤌍𤀻𤌴𤎖𤩅𠗊凒𠘑妟𡺨㮾𣳿𤐄𤓖垈𤙴㦛𤜯𨗨𩧉㝢𢇃譞𨭎駖𤠒𤣻𤨕爉𤫀𠱸奥𤺥𤾆𠝹軚𥀬劏圿煱𥊙𥐙𣽊𤪧喼𥑆𥑮𦭒釔㑳𥔿𧘲𥕞䜘𥕢𥕦𥟇𤤿𥡝偦㓻𣏌惞𥤃䝼𨥈𥪮𥮉𥰆𡶐垡煑澶𦄂𧰒遖𦆲𤾚譢𦐂𦑊"],["9c40","嵛𦯷輶𦒄𡤜諪𤧶𦒈𣿯𦔒䯀𦖿𦚵𢜛鑥𥟡憕娧晉侻嚹𤔡𦛼乪𤤴陖涏𦲽㘘襷𦞙𦡮𦐑𦡞營𦣇筂𩃀𠨑𦤦鄄𦤹穅鷰𦧺騦𦨭㙟𦑩𠀡禃𦨴𦭛崬𣔙菏𦮝䛐𦲤画补𦶮墶"],["9ca1","㜜𢖍𧁋𧇍㱔𧊀𧊅銁𢅺𧊋錰𧋦𤧐氹钟𧑐𠻸蠧裵𢤦𨑳𡞱溸𤨪𡠠㦤㚹尐秣䔿暶𩲭𩢤襃𧟌𧡘囖䃟𡘊㦡𣜯𨃨𡏅熭荦𧧝𩆨婧䲷𧂯𨦫𧧽𧨊𧬋𧵦𤅺筃祾𨀉澵𪋟樃𨌘厢𦸇鎿栶靝𨅯𨀣𦦵𡏭𣈯𨁈嶅𨰰𨂃圕頣𨥉嶫𤦈斾槕叒𤪥𣾁㰑朶𨂐𨃴𨄮𡾡𨅏"],["9d40","𨆉𨆯𨈚𨌆𨌯𨎊㗊𨑨𨚪䣺揦𨥖砈鉕𨦸䏲𨧧䏟𨧨𨭆𨯔姸𨰉輋𨿅𩃬筑𩄐𩄼㷷𩅞𤫊运犏嚋𩓧𩗩𩖰𩖸𩜲𩣑𩥉𩥪𩧃𩨨𩬎𩵚𩶛纟𩻸𩼣䲤镇𪊓熢𪋿䶑递𪗋䶜𠲜达嗁"],["9da1","辺𢒰边𤪓䔉繿潖檱仪㓤𨬬𧢝㜺躀𡟵𨀤𨭬𨮙𧨾𦚯㷫𧙕𣲷𥘵𥥖亚𥺁𦉘嚿𠹭踎孭𣺈𤲞揞拐𡟶𡡻攰嘭𥱊吚𥌑㷆𩶘䱽嘢嘞罉𥻘奵𣵀蝰东𠿪𠵉𣚺脗鵞贘瘻鱅癎瞹鍅吲腈苷嘥脲萘肽嗪祢噃吖𠺝㗎嘅嗱曱𨋢㘭甴嗰喺咗啲𠱁𠲖廐𥅈𠹶𢱢"],["9e40","𠺢麫絚嗞𡁵抝靭咔賍燶酶揼掹揾啩𢭃鱲𢺳冚㓟𠶧冧呍唞唓癦踭𦢊疱肶蠄螆裇膶萜𡃁䓬猄𤜆宐茋𦢓噻𢛴𧴯𤆣𧵳𦻐𧊶酰𡇙鈈𣳼𪚩𠺬𠻹牦𡲢䝎𤿂𧿹𠿫䃺"],["9ea1","鱝攟𢶠䣳𤟠𩵼𠿬𠸊恢𧖣𠿭"],["9ead","𦁈𡆇熣纎鵐业丄㕷嬍沲卧㚬㧜卽㚥𤘘墚𤭮舭呋垪𥪕𠥹"],["9ec5","㩒𢑥獴𩺬䴉鯭𣳾𩼰䱛𤾩𩖞𩿞葜𣶶𧊲𦞳𣜠挮紥𣻷𣸬㨪逈勌㹴㙺䗩𠒎癀嫰𠺶硺𧼮墧䂿噼鮋嵴癔𪐴麅䳡痹㟻愙𣃚𤏲"],["9ef5","噝𡊩垧𤥣𩸆刴𧂮㖭汊鵼"],["9f40","籖鬹埞𡝬屓擓𩓐𦌵𧅤蚭𠴨𦴢𤫢𠵱"],["9f4f","凾𡼏嶎霃𡷑麁遌笟鬂峑箣扨挵髿篏鬪籾鬮籂粆鰕篼鬉鼗鰛𤤾齚啳寃俽麘俲剠㸆勑坧偖妷帒韈鶫轜呩鞴饀鞺匬愰"],["9fa1","椬叚鰊鴂䰻陁榀傦畆𡝭駚剳"],["9fae","酙隁酜"],["9fb2","酑𨺗捿𦴣櫊嘑醎畺抅𠏼獏籰𥰡𣳽"],["9fc1","𤤙盖鮝个𠳔莾衂"],["9fc9","届槀僭坺刟巵从氱𠇲伹咜哚劚趂㗾弌㗳"],["9fdb","歒酼龥鮗頮颴骺麨麄煺笔"],["9fe7","毺蠘罸"],["9feb","嘠𪙊蹷齓"],["9ff0","跔蹏鸜踁抂𨍽踨蹵竓𤩷稾磘泪詧瘇"],["a040","𨩚鼦泎蟖痃𪊲硓咢贌狢獱謭猂瓱賫𤪻蘯徺袠䒷"],["a055","𡠻𦸅"],["a058","詾𢔛"],["a05b","惽癧髗鵄鍮鮏蟵"],["a063","蠏賷猬霡鮰㗖犲䰇籑饊𦅙慙䰄麖慽"],["a073","坟慯抦戹拎㩜懢厪𣏵捤栂㗒"],["a0a1","嵗𨯂迚𨸹"],["a0a6","僙𡵆礆匲阸𠼻䁥"],["a0ae","矾"],["a0b0","糂𥼚糚稭聦聣絍甅瓲覔舚朌聢𧒆聛瓰脃眤覉𦟌畓𦻑螩蟎臈螌詉貭譃眫瓸蓚㘵榲趦"],["a0d4","覩瑨涹蟁𤀑瓧㷛煶悤憜㳑煢恷"],["a0e2","罱𨬭牐惩䭾删㰘𣳇𥻗𧙖𥔱𡥄𡋾𩤃𦷜𧂭峁𦆭𨨏𣙷𠃮𦡆𤼎䕢嬟𦍌齐麦𦉫"],["a3c0","␀",31,"␡"],["c6a1","①",9,"⑴",9,"ⅰ",9,"丶丿亅亠冂冖冫勹匸卩厶夊宀巛⼳广廴彐彡攴无疒癶辵隶¨ˆヽヾゝゞ〃仝々〆〇ー［］✽ぁ",23],["c740","す",58,"ァアィイ"],["c7a1","ゥ",81,"А",5,"ЁЖ",4],["c840","Л",26,"ёж",25,"⇧↸↹㇏𠃌乚𠂊刂䒑"],["c8a1","龰冈龱𧘇"],["c8cd","￢￤＇＂㈱№℡゛゜⺀⺄⺆⺇⺈⺊⺌⺍⺕⺜⺝⺥⺧⺪⺬⺮⺶⺼⺾⻆⻊⻌⻍⻏⻖⻗⻞⻣"],["c8f5","ʃɐɛɔɵœøŋʊɪ"],["f9fe","￭"],["fa40","𠕇鋛𠗟𣿅蕌䊵珯况㙉𤥂𨧤鍄𡧛苮𣳈砼杄拟𤤳𨦪𠊠𦮳𡌅侫𢓭倈𦴩𧪄𣘀𤪱𢔓倩𠍾徤𠎀𠍇滛𠐟偽儁㑺儎顬㝃萖𤦤𠒇兠𣎴兪𠯿𢃼𠋥𢔰𠖎𣈳𡦃宂蝽𠖳𣲙冲冸"],["faa1","鴴凉减凑㳜凓𤪦决凢卂凭菍椾𣜭彻刋刦刼劵剗劔効勅簕蕂勠蘍𦬓包𨫞啉滙𣾀𠥔𣿬匳卄𠯢泋𡜦栛珕恊㺪㣌𡛨燝䒢卭却𨚫卾卿𡖖𡘓矦厓𨪛厠厫厮玧𥝲㽙玜叁叅汉义埾叙㪫𠮏叠𣿫𢶣叶𠱷吓灹唫晗浛呭𦭓𠵴啝咏咤䞦𡜍𠻝㶴𠵍"],["fb40","𨦼𢚘啇䳭启琗喆喩嘅𡣗𤀺䕒𤐵暳𡂴嘷曍𣊊暤暭噍噏磱囱鞇叾圀囯园𨭦㘣𡉏坆𤆥汮炋坂㚱𦱾埦𡐖堃𡑔𤍣堦𤯵塜墪㕡壠壜𡈼壻寿坃𪅐𤉸鏓㖡够梦㛃湙"],["fba1","𡘾娤啓𡚒蔅姉𠵎𦲁𦴪𡟜姙𡟻𡞲𦶦浱𡠨𡛕姹𦹅媫婣㛦𤦩婷㜈媖瑥嫓𦾡𢕔㶅𡤑㜲𡚸広勐孶斈孼𧨎䀄䡝𠈄寕慠𡨴𥧌𠖥寳宝䴐尅𡭄尓珎尔𡲥𦬨屉䣝岅峩峯嶋𡷹𡸷崐崘嵆𡺤岺巗苼㠭𤤁𢁉𢅳芇㠶㯂帮檊幵幺𤒼𠳓厦亷廐厨𡝱帉廴𨒂"],["fc40","廹廻㢠廼栾鐛弍𠇁弢㫞䢮𡌺强𦢈𢏐彘𢑱彣鞽𦹮彲鍀𨨶徧嶶㵟𥉐𡽪𧃸𢙨釖𠊞𨨩怱暅𡡷㥣㷇㘹垐𢞴祱㹀悞悤悳𤦂𤦏𧩓璤僡媠慤萤慂慈𦻒憁凴𠙖憇宪𣾷"],["fca1","𢡟懓𨮝𩥝懐㤲𢦀𢣁怣慜攞掋𠄘担𡝰拕𢸍捬𤧟㨗搸揸𡎎𡟼撐澊𢸶頔𤂌𥜝擡擥鑻㩦携㩗敍漖𤨨𤨣斅敭敟𣁾斵𤥀䬷旑䃘𡠩无旣忟𣐀昘𣇷𣇸晄𣆤𣆥晋𠹵晧𥇦晳晴𡸽𣈱𨗴𣇈𥌓矅𢣷馤朂𤎜𤨡㬫槺𣟂杞杧杢𤇍𩃭柗䓩栢湐鈼栁𣏦𦶠桝"],["fd40","𣑯槡樋𨫟楳棃𣗍椁椀㴲㨁𣘼㮀枬楡𨩊䋼椶榘㮡𠏉荣傐槹𣙙𢄪橅𣜃檝㯳枱櫈𩆜㰍欝𠤣惞欵歴𢟍溵𣫛𠎵𡥘㝀吡𣭚毡𣻼毜氷𢒋𤣱𦭑汚舦汹𣶼䓅𣶽𤆤𤤌𤤀"],["fda1","𣳉㛥㳫𠴲鮃𣇹𢒑羏样𦴥𦶡𦷫涖浜湼漄𤥿𤂅𦹲蔳𦽴凇沜渝萮𨬡港𣸯瑓𣾂秌湏媑𣁋濸㜍澝𣸰滺𡒗𤀽䕕鏰潄潜㵎潴𩅰㴻澟𤅄濓𤂑𤅕𤀹𣿰𣾴𤄿凟𤅖𤅗𤅀𦇝灋灾炧炁烌烕烖烟䄄㷨熴熖𤉷焫煅媈煊煮岜𤍥煏鍢𤋁焬𤑚𤨧𤨢熺𨯨炽爎"],["fe40","鑂爕夑鑃爤鍁𥘅爮牀𤥴梽牕牗㹕𣁄栍漽犂猪猫𤠣𨠫䣭𨠄猨献珏玪𠰺𦨮珉瑉𤇢𡛧𤨤昣㛅𤦷𤦍𤧻珷琕椃𤨦琹𠗃㻗瑜𢢭瑠𨺲瑇珤瑶莹瑬㜰瑴鏱樬璂䥓𤪌"],["fea1","𤅟𤩹𨮏孆𨰃𡢞瓈𡦈甎瓩甞𨻙𡩋寗𨺬鎅畍畊畧畮𤾂㼄𤴓疎瑝疞疴瘂瘬癑癏癯癶𦏵皐臯㟸𦤑𦤎皡皥皷盌𦾟葢𥂝𥅽𡸜眞眦着撯𥈠睘𣊬瞯𨥤𨥨𡛁矴砉𡍶𤨒棊碯磇磓隥礮𥗠磗礴碱𧘌辸袄𨬫𦂃𢘜禆褀椂禀𥡗禝𧬹礼禩渪𧄦㺨秆𩄍秔"]]'
			);
		},
		function (e, t, n) {
			"use strict";
			var a = n(13).Buffer,
				i = n(0).Transform;
			function IconvLiteEncoderStream(e, t) {
				(this.conv = e), ((t = t || {}).decodeStrings = !1), i.call(this, t);
			}
			function IconvLiteDecoderStream(e, t) {
				(this.conv = e), ((t = t || {}).encoding = this.encoding = "utf8"), i.call(this, t);
			}
			(e.exports = function (e) {
				(e.encodeStream = function encodeStream(t, n) {
					return new IconvLiteEncoderStream(e.getEncoder(t, n), n);
				}),
					(e.decodeStream = function decodeStream(t, n) {
						return new IconvLiteDecoderStream(e.getDecoder(t, n), n);
					}),
					(e.supportsStreams = !0),
					(e.IconvLiteEncoderStream = IconvLiteEncoderStream),
					(e.IconvLiteDecoderStream = IconvLiteDecoderStream),
					(e._collect = IconvLiteDecoderStream.prototype.collect);
			}),
				(IconvLiteEncoderStream.prototype = Object.create(i.prototype, {
					constructor: { value: IconvLiteEncoderStream },
				})),
				(IconvLiteEncoderStream.prototype._transform = function (e, t, n) {
					if ("string" != typeof e)
						return n(new Error("Iconv encoding stream needs strings as its input."));
					try {
						var a = this.conv.write(e);
						a && a.length && this.push(a), n();
					} catch (e) {
						n(e);
					}
				}),
				(IconvLiteEncoderStream.prototype._flush = function (e) {
					try {
						var t = this.conv.end();
						t && t.length && this.push(t), e();
					} catch (t) {
						e(t);
					}
				}),
				(IconvLiteEncoderStream.prototype.collect = function (e) {
					var t = [];
					return (
						this.on("error", e),
						this.on("data", function (e) {
							t.push(e);
						}),
						this.on("end", function () {
							e(null, a.concat(t));
						}),
						this
					);
				}),
				(IconvLiteDecoderStream.prototype = Object.create(i.prototype, {
					constructor: { value: IconvLiteDecoderStream },
				})),
				(IconvLiteDecoderStream.prototype._transform = function (e, t, n) {
					if (!a.isBuffer(e))
						return n(new Error("Iconv decoding stream needs buffers as its input."));
					try {
						var i = this.conv.write(e);
						i && i.length && this.push(i, this.encoding), n();
					} catch (e) {
						n(e);
					}
				}),
				(IconvLiteDecoderStream.prototype._flush = function (e) {
					try {
						var t = this.conv.end();
						t && t.length && this.push(t, this.encoding), e();
					} catch (t) {
						e(t);
					}
				}),
				(IconvLiteDecoderStream.prototype.collect = function (e) {
					var t = "";
					return (
						this.on("error", e),
						this.on("data", function (e) {
							t += e;
						}),
						this.on("end", function () {
							e(null, t);
						}),
						this
					);
				});
		},
		function (e, t, n) {
			"use strict";
			var a = n(13).Buffer;
			e.exports = function (e) {
				var t = void 0;
				(e.supportsNodeEncodingsExtension = !(a.from || new a(0) instanceof Uint8Array)),
					(e.extendNodeEncodings = function extendNodeEncodings() {
						if (!t) {
							if (((t = {}), !e.supportsNodeEncodingsExtension))
								return (
									console.error(
										"ACTION NEEDED: require('iconv-lite').extendNodeEncodings() is not supported in your version of Node"
									),
									void console.error(
										"See more info at https://github.com/ashtuchkin/iconv-lite/wiki/Node-v4-compatibility"
									)
								);
							var i = {
								hex: !0,
								utf8: !0,
								"utf-8": !0,
								ascii: !0,
								binary: !0,
								base64: !0,
								ucs2: !0,
								"ucs-2": !0,
								utf16le: !0,
								"utf-16le": !0,
							};
							a.isNativeEncoding = function (e) {
								return e && i[e.toLowerCase()];
							};
							var r = n(13).SlowBuffer;
							if (
								((t.SlowBufferToString = r.prototype.toString),
								(r.prototype.toString = function (n, i, r) {
									return (
										(n = String(n || "utf8").toLowerCase()),
										a.isNativeEncoding(n)
											? t.SlowBufferToString.call(this, n, i, r)
											: (void 0 === i && (i = 0),
											  void 0 === r && (r = this.length),
											  e.decode(this.slice(i, r), n))
									);
								}),
								(t.SlowBufferWrite = r.prototype.write),
								(r.prototype.write = function (n, i, r, o) {
									if (isFinite(i)) isFinite(r) || ((o = r), (r = void 0));
									else {
										var s = o;
										(o = i), (i = r), (r = s);
									}
									i = +i || 0;
									var c = this.length - i;
									if (
										(r ? (r = +r) > c && (r = c) : (r = c),
										(o = String(o || "utf8").toLowerCase()),
										a.isNativeEncoding(o))
									)
										return t.SlowBufferWrite.call(this, n, i, r, o);
									if (n.length > 0 && (r < 0 || i < 0))
										throw new RangeError(
											"attempt to write beyond buffer bounds"
										);
									var p = e.encode(n, o);
									return p.length < r && (r = p.length), p.copy(this, i, 0, r), r;
								}),
								(t.BufferIsEncoding = a.isEncoding),
								(a.isEncoding = function (t) {
									return a.isNativeEncoding(t) || e.encodingExists(t);
								}),
								(t.BufferByteLength = a.byteLength),
								(a.byteLength = r.byteLength = function (n, i) {
									return (
										(i = String(i || "utf8").toLowerCase()),
										a.isNativeEncoding(i)
											? t.BufferByteLength.call(this, n, i)
											: e.encode(n, i).length
									);
								}),
								(t.BufferToString = a.prototype.toString),
								(a.prototype.toString = function (n, i, r) {
									return (
										(n = String(n || "utf8").toLowerCase()),
										a.isNativeEncoding(n)
											? t.BufferToString.call(this, n, i, r)
											: (void 0 === i && (i = 0),
											  void 0 === r && (r = this.length),
											  e.decode(this.slice(i, r), n))
									);
								}),
								(t.BufferWrite = a.prototype.write),
								(a.prototype.write = function (n, i, r, o) {
									var s = i,
										c = r,
										p = o;
									if (isFinite(i)) isFinite(r) || ((o = r), (r = void 0));
									else {
										var l = o;
										(o = i), (i = r), (r = l);
									}
									if (
										((o = String(o || "utf8").toLowerCase()),
										a.isNativeEncoding(o))
									)
										return t.BufferWrite.call(this, n, s, c, p);
									i = +i || 0;
									var u = this.length - i;
									if (
										(r ? (r = +r) > u && (r = u) : (r = u),
										n.length > 0 && (r < 0 || i < 0))
									)
										throw new RangeError(
											"attempt to write beyond buffer bounds"
										);
									var d = e.encode(n, o);
									return d.length < r && (r = d.length), d.copy(this, i, 0, r), r;
								}),
								e.supportsStreams)
							) {
								var o = n(0).Readable;
								(t.ReadableSetEncoding = o.prototype.setEncoding),
									(o.prototype.setEncoding = function setEncoding(t, n) {
										(this._readableState.decoder = e.getDecoder(t, n)),
											(this._readableState.encoding = t);
									}),
									(o.prototype.collect = e._collect);
							}
						}
					}),
					(e.undoExtendNodeEncodings = function undoExtendNodeEncodings() {
						if (e.supportsNodeEncodingsExtension) {
							if (!t)
								throw new Error(
									"require('iconv-lite').undoExtendNodeEncodings(): Nothing to undo; extendNodeEncodings() is not called."
								);
							delete a.isNativeEncoding;
							var i = n(13).SlowBuffer;
							if (
								((i.prototype.toString = t.SlowBufferToString),
								(i.prototype.write = t.SlowBufferWrite),
								(a.isEncoding = t.BufferIsEncoding),
								(a.byteLength = t.BufferByteLength),
								(a.prototype.toString = t.BufferToString),
								(a.prototype.write = t.BufferWrite),
								e.supportsStreams)
							) {
								var r = n(0).Readable;
								(r.prototype.setEncoding = t.ReadableSetEncoding),
									delete r.prototype.collect;
							}
							t = void 0;
						}
					});
			};
		},
		function (e, t, n) {
			"use strict";
			function listener(e, t) {
				return function onevent(n) {
					for (
						var a = new Array(arguments.length),
							i = this,
							r = "error" === e ? n : null,
							o = 0;
						o < a.length;
						o++
					)
						a[o] = arguments[o];
					t(r, i, e, a);
				};
			}
			e.exports = function first(e, t) {
				if (!Array.isArray(e))
					throw new TypeError("arg must be an array of [ee, events...] arrays");
				for (var n = [], a = 0; a < e.length; a++) {
					var i = e[a];
					if (!Array.isArray(i) || i.length < 2)
						throw new TypeError("each array member must be [ee, events...]");
					for (var r = i[0], o = 1; o < i.length; o++) {
						var s = i[o],
							c = listener(s, callback);
						r.on(s, c), n.push({ ee: r, event: s, fn: c });
					}
				}
				function callback() {
					cleanup(), t.apply(null, arguments);
				}
				function cleanup() {
					for (var e, t = 0; t < n.length; t++)
						(e = n[t]).ee.removeListener(e.event, e.fn);
				}
				function thunk(e) {
					t = e;
				}
				return (thunk.cancel = cleanup), thunk;
			};
		},
		function (e, t) {
			var n = /; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u0020-\u007e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g,
				a = /^[\u0020-\u007e\u0080-\u00ff]+$/,
				i = /^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/,
				r = /\\([\u0000-\u007f])/g,
				o = /([\\"])/g,
				s = /^[A-Za-z0-9][A-Za-z0-9!#$&^_.-]{0,126}$/,
				c = /^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}$/,
				p = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
			function qstring(e) {
				var t = String(e);
				if (i.test(t)) return t;
				if (t.length > 0 && !a.test(t)) throw new TypeError("invalid parameter value");
				return '"' + t.replace(o, "\\$1") + '"';
			}
			(t.format = function format(e) {
				if (!e || "object" != typeof e) throw new TypeError("argument obj is required");
				var t = e.parameters,
					n = e.subtype,
					a = e.suffix,
					r = e.type;
				if (!r || !c.test(r)) throw new TypeError("invalid type");
				if (!n || !s.test(n)) throw new TypeError("invalid subtype");
				var o = r + "/" + n;
				if (a) {
					if (!c.test(a)) throw new TypeError("invalid suffix");
					o += "+" + a;
				}
				if (t && "object" == typeof t)
					for (var p, l = Object.keys(t).sort(), u = 0; u < l.length; u++) {
						if (((p = l[u]), !i.test(p))) throw new TypeError("invalid parameter name");
						o += "; " + p + "=" + qstring(t[p]);
					}
				return o;
			}),
				(t.parse = function parse(e) {
					if (!e) throw new TypeError("argument string is required");
					"object" == typeof e &&
						(e = (function getcontenttype(e) {
							if ("function" == typeof e.getHeader)
								return e.getHeader("content-type");
							if ("object" == typeof e.headers)
								return e.headers && e.headers["content-type"];
						})(e));
					if ("string" != typeof e)
						throw new TypeError("argument string is required to be a string");
					var t,
						a,
						i,
						o = e.indexOf(";"),
						s = (function splitType(e) {
							var t = p.exec(e.toLowerCase());
							if (!t) throw new TypeError("invalid media type");
							var n,
								a = t[1],
								i = t[2],
								r = i.lastIndexOf("+");
							-1 !== r && ((n = i.substr(r + 1)), (i = i.substr(0, r)));
							return { type: a, subtype: i, suffix: n };
						})(-1 !== o ? e.substr(0, o) : e),
						c = {};
					n.lastIndex = o;
					for (; (a = n.exec(e)); ) {
						if (a.index !== o) throw new TypeError("invalid parameter format");
						(o += a[0].length),
							(t = a[1].toLowerCase()),
							'"' === (i = a[2])[0] &&
								(i = i.substr(1, i.length - 2).replace(r, "$1")),
							(c[t] = i);
					}
					if (-1 !== o && o !== e.length) throw new TypeError("invalid parameter format");
					return (s.parameters = c), s;
				});
		},
		function (e, t, n) {
			e.exports = n(122);
		},
		function (e) {
			e.exports = JSON.parse(
				'{"application/1d-interleaved-parityfec":{"source":"iana"},"application/3gpdash-qoe-report+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/3gpp-ims+xml":{"source":"iana","compressible":true},"application/a2l":{"source":"iana"},"application/activemessage":{"source":"iana"},"application/activity+json":{"source":"iana","compressible":true},"application/alto-costmap+json":{"source":"iana","compressible":true},"application/alto-costmapfilter+json":{"source":"iana","compressible":true},"application/alto-directory+json":{"source":"iana","compressible":true},"application/alto-endpointcost+json":{"source":"iana","compressible":true},"application/alto-endpointcostparams+json":{"source":"iana","compressible":true},"application/alto-endpointprop+json":{"source":"iana","compressible":true},"application/alto-endpointpropparams+json":{"source":"iana","compressible":true},"application/alto-error+json":{"source":"iana","compressible":true},"application/alto-networkmap+json":{"source":"iana","compressible":true},"application/alto-networkmapfilter+json":{"source":"iana","compressible":true},"application/alto-updatestreamcontrol+json":{"source":"iana","compressible":true},"application/alto-updatestreamparams+json":{"source":"iana","compressible":true},"application/aml":{"source":"iana"},"application/andrew-inset":{"source":"iana","extensions":["ez"]},"application/applefile":{"source":"iana"},"application/applixware":{"source":"apache","extensions":["aw"]},"application/atf":{"source":"iana"},"application/atfx":{"source":"iana"},"application/atom+xml":{"source":"iana","compressible":true,"extensions":["atom"]},"application/atomcat+xml":{"source":"iana","compressible":true,"extensions":["atomcat"]},"application/atomdeleted+xml":{"source":"iana","compressible":true,"extensions":["atomdeleted"]},"application/atomicmail":{"source":"iana"},"application/atomsvc+xml":{"source":"iana","compressible":true,"extensions":["atomsvc"]},"application/atsc-dwd+xml":{"source":"iana","compressible":true,"extensions":["dwd"]},"application/atsc-dynamic-event-message":{"source":"iana"},"application/atsc-held+xml":{"source":"iana","compressible":true,"extensions":["held"]},"application/atsc-rdt+json":{"source":"iana","compressible":true},"application/atsc-rsat+xml":{"source":"iana","compressible":true,"extensions":["rsat"]},"application/atxml":{"source":"iana"},"application/auth-policy+xml":{"source":"iana","compressible":true},"application/bacnet-xdd+zip":{"source":"iana","compressible":false},"application/batch-smtp":{"source":"iana"},"application/bdoc":{"compressible":false,"extensions":["bdoc"]},"application/beep+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/calendar+json":{"source":"iana","compressible":true},"application/calendar+xml":{"source":"iana","compressible":true,"extensions":["xcs"]},"application/call-completion":{"source":"iana"},"application/cals-1840":{"source":"iana"},"application/captive+json":{"source":"iana","compressible":true},"application/cbor":{"source":"iana"},"application/cbor-seq":{"source":"iana"},"application/cccex":{"source":"iana"},"application/ccmp+xml":{"source":"iana","compressible":true},"application/ccxml+xml":{"source":"iana","compressible":true,"extensions":["ccxml"]},"application/cdfx+xml":{"source":"iana","compressible":true,"extensions":["cdfx"]},"application/cdmi-capability":{"source":"iana","extensions":["cdmia"]},"application/cdmi-container":{"source":"iana","extensions":["cdmic"]},"application/cdmi-domain":{"source":"iana","extensions":["cdmid"]},"application/cdmi-object":{"source":"iana","extensions":["cdmio"]},"application/cdmi-queue":{"source":"iana","extensions":["cdmiq"]},"application/cdni":{"source":"iana"},"application/cea":{"source":"iana"},"application/cea-2018+xml":{"source":"iana","compressible":true},"application/cellml+xml":{"source":"iana","compressible":true},"application/cfw":{"source":"iana"},"application/clr":{"source":"iana"},"application/clue+xml":{"source":"iana","compressible":true},"application/clue_info+xml":{"source":"iana","compressible":true},"application/cms":{"source":"iana"},"application/cnrp+xml":{"source":"iana","compressible":true},"application/coap-group+json":{"source":"iana","compressible":true},"application/coap-payload":{"source":"iana"},"application/commonground":{"source":"iana"},"application/conference-info+xml":{"source":"iana","compressible":true},"application/cose":{"source":"iana"},"application/cose-key":{"source":"iana"},"application/cose-key-set":{"source":"iana"},"application/cpl+xml":{"source":"iana","compressible":true},"application/csrattrs":{"source":"iana"},"application/csta+xml":{"source":"iana","compressible":true},"application/cstadata+xml":{"source":"iana","compressible":true},"application/csvm+json":{"source":"iana","compressible":true},"application/cu-seeme":{"source":"apache","extensions":["cu"]},"application/cwt":{"source":"iana"},"application/cybercash":{"source":"iana"},"application/dart":{"compressible":true},"application/dash+xml":{"source":"iana","compressible":true,"extensions":["mpd"]},"application/dashdelta":{"source":"iana"},"application/davmount+xml":{"source":"iana","compressible":true,"extensions":["davmount"]},"application/dca-rft":{"source":"iana"},"application/dcd":{"source":"iana"},"application/dec-dx":{"source":"iana"},"application/dialog-info+xml":{"source":"iana","compressible":true},"application/dicom":{"source":"iana"},"application/dicom+json":{"source":"iana","compressible":true},"application/dicom+xml":{"source":"iana","compressible":true},"application/dii":{"source":"iana"},"application/dit":{"source":"iana"},"application/dns":{"source":"iana"},"application/dns+json":{"source":"iana","compressible":true},"application/dns-message":{"source":"iana"},"application/docbook+xml":{"source":"apache","compressible":true,"extensions":["dbk"]},"application/dots+cbor":{"source":"iana"},"application/dskpp+xml":{"source":"iana","compressible":true},"application/dssc+der":{"source":"iana","extensions":["dssc"]},"application/dssc+xml":{"source":"iana","compressible":true,"extensions":["xdssc"]},"application/dvcs":{"source":"iana"},"application/ecmascript":{"source":"iana","compressible":true,"extensions":["es","ecma"]},"application/edi-consent":{"source":"iana"},"application/edi-x12":{"source":"iana","compressible":false},"application/edifact":{"source":"iana","compressible":false},"application/efi":{"source":"iana"},"application/elm+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/elm+xml":{"source":"iana","compressible":true},"application/emergencycalldata.cap+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/emergencycalldata.comment+xml":{"source":"iana","compressible":true},"application/emergencycalldata.control+xml":{"source":"iana","compressible":true},"application/emergencycalldata.deviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.ecall.msd":{"source":"iana"},"application/emergencycalldata.providerinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.serviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.subscriberinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.veds+xml":{"source":"iana","compressible":true},"application/emma+xml":{"source":"iana","compressible":true,"extensions":["emma"]},"application/emotionml+xml":{"source":"iana","compressible":true,"extensions":["emotionml"]},"application/encaprtp":{"source":"iana"},"application/epp+xml":{"source":"iana","compressible":true},"application/epub+zip":{"source":"iana","compressible":false,"extensions":["epub"]},"application/eshop":{"source":"iana"},"application/exi":{"source":"iana","extensions":["exi"]},"application/expect-ct-report+json":{"source":"iana","compressible":true},"application/fastinfoset":{"source":"iana"},"application/fastsoap":{"source":"iana"},"application/fdt+xml":{"source":"iana","compressible":true,"extensions":["fdt"]},"application/fhir+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/fhir+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/fido.trusted-apps+json":{"compressible":true},"application/fits":{"source":"iana"},"application/flexfec":{"source":"iana"},"application/font-sfnt":{"source":"iana"},"application/font-tdpfr":{"source":"iana","extensions":["pfr"]},"application/font-woff":{"source":"iana","compressible":false},"application/framework-attributes+xml":{"source":"iana","compressible":true},"application/geo+json":{"source":"iana","compressible":true,"extensions":["geojson"]},"application/geo+json-seq":{"source":"iana"},"application/geopackage+sqlite3":{"source":"iana"},"application/geoxacml+xml":{"source":"iana","compressible":true},"application/gltf-buffer":{"source":"iana"},"application/gml+xml":{"source":"iana","compressible":true,"extensions":["gml"]},"application/gpx+xml":{"source":"apache","compressible":true,"extensions":["gpx"]},"application/gxf":{"source":"apache","extensions":["gxf"]},"application/gzip":{"source":"iana","compressible":false,"extensions":["gz"]},"application/h224":{"source":"iana"},"application/held+xml":{"source":"iana","compressible":true},"application/hjson":{"extensions":["hjson"]},"application/http":{"source":"iana"},"application/hyperstudio":{"source":"iana","extensions":["stk"]},"application/ibe-key-request+xml":{"source":"iana","compressible":true},"application/ibe-pkg-reply+xml":{"source":"iana","compressible":true},"application/ibe-pp-data":{"source":"iana"},"application/iges":{"source":"iana"},"application/im-iscomposing+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/index":{"source":"iana"},"application/index.cmd":{"source":"iana"},"application/index.obj":{"source":"iana"},"application/index.response":{"source":"iana"},"application/index.vnd":{"source":"iana"},"application/inkml+xml":{"source":"iana","compressible":true,"extensions":["ink","inkml"]},"application/iotp":{"source":"iana"},"application/ipfix":{"source":"iana","extensions":["ipfix"]},"application/ipp":{"source":"iana"},"application/isup":{"source":"iana"},"application/its+xml":{"source":"iana","compressible":true,"extensions":["its"]},"application/java-archive":{"source":"apache","compressible":false,"extensions":["jar","war","ear"]},"application/java-serialized-object":{"source":"apache","compressible":false,"extensions":["ser"]},"application/java-vm":{"source":"apache","compressible":false,"extensions":["class"]},"application/javascript":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},"application/jf2feed+json":{"source":"iana","compressible":true},"application/jose":{"source":"iana"},"application/jose+json":{"source":"iana","compressible":true},"application/jrd+json":{"source":"iana","compressible":true},"application/jscalendar+json":{"source":"iana","compressible":true},"application/json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},"application/json-patch+json":{"source":"iana","compressible":true},"application/json-seq":{"source":"iana"},"application/json5":{"extensions":["json5"]},"application/jsonml+json":{"source":"apache","compressible":true,"extensions":["jsonml"]},"application/jwk+json":{"source":"iana","compressible":true},"application/jwk-set+json":{"source":"iana","compressible":true},"application/jwt":{"source":"iana"},"application/kpml-request+xml":{"source":"iana","compressible":true},"application/kpml-response+xml":{"source":"iana","compressible":true},"application/ld+json":{"source":"iana","compressible":true,"extensions":["jsonld"]},"application/lgr+xml":{"source":"iana","compressible":true,"extensions":["lgr"]},"application/link-format":{"source":"iana"},"application/load-control+xml":{"source":"iana","compressible":true},"application/lost+xml":{"source":"iana","compressible":true,"extensions":["lostxml"]},"application/lostsync+xml":{"source":"iana","compressible":true},"application/lpf+zip":{"source":"iana","compressible":false},"application/lxf":{"source":"iana"},"application/mac-binhex40":{"source":"iana","extensions":["hqx"]},"application/mac-compactpro":{"source":"apache","extensions":["cpt"]},"application/macwriteii":{"source":"iana"},"application/mads+xml":{"source":"iana","compressible":true,"extensions":["mads"]},"application/manifest+json":{"charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},"application/marc":{"source":"iana","extensions":["mrc"]},"application/marcxml+xml":{"source":"iana","compressible":true,"extensions":["mrcx"]},"application/mathematica":{"source":"iana","extensions":["ma","nb","mb"]},"application/mathml+xml":{"source":"iana","compressible":true,"extensions":["mathml"]},"application/mathml-content+xml":{"source":"iana","compressible":true},"application/mathml-presentation+xml":{"source":"iana","compressible":true},"application/mbms-associated-procedure-description+xml":{"source":"iana","compressible":true},"application/mbms-deregister+xml":{"source":"iana","compressible":true},"application/mbms-envelope+xml":{"source":"iana","compressible":true},"application/mbms-msk+xml":{"source":"iana","compressible":true},"application/mbms-msk-response+xml":{"source":"iana","compressible":true},"application/mbms-protection-description+xml":{"source":"iana","compressible":true},"application/mbms-reception-report+xml":{"source":"iana","compressible":true},"application/mbms-register+xml":{"source":"iana","compressible":true},"application/mbms-register-response+xml":{"source":"iana","compressible":true},"application/mbms-schedule+xml":{"source":"iana","compressible":true},"application/mbms-user-service-description+xml":{"source":"iana","compressible":true},"application/mbox":{"source":"iana","extensions":["mbox"]},"application/media-policy-dataset+xml":{"source":"iana","compressible":true},"application/media_control+xml":{"source":"iana","compressible":true},"application/mediaservercontrol+xml":{"source":"iana","compressible":true,"extensions":["mscml"]},"application/merge-patch+json":{"source":"iana","compressible":true},"application/metalink+xml":{"source":"apache","compressible":true,"extensions":["metalink"]},"application/metalink4+xml":{"source":"iana","compressible":true,"extensions":["meta4"]},"application/mets+xml":{"source":"iana","compressible":true,"extensions":["mets"]},"application/mf4":{"source":"iana"},"application/mikey":{"source":"iana"},"application/mipc":{"source":"iana"},"application/mmt-aei+xml":{"source":"iana","compressible":true,"extensions":["maei"]},"application/mmt-usd+xml":{"source":"iana","compressible":true,"extensions":["musd"]},"application/mods+xml":{"source":"iana","compressible":true,"extensions":["mods"]},"application/moss-keys":{"source":"iana"},"application/moss-signature":{"source":"iana"},"application/mosskey-data":{"source":"iana"},"application/mosskey-request":{"source":"iana"},"application/mp21":{"source":"iana","extensions":["m21","mp21"]},"application/mp4":{"source":"iana","extensions":["mp4s","m4p"]},"application/mpeg4-generic":{"source":"iana"},"application/mpeg4-iod":{"source":"iana"},"application/mpeg4-iod-xmt":{"source":"iana"},"application/mrb-consumer+xml":{"source":"iana","compressible":true},"application/mrb-publish+xml":{"source":"iana","compressible":true},"application/msc-ivr+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msc-mixer+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msword":{"source":"iana","compressible":false,"extensions":["doc","dot"]},"application/mud+json":{"source":"iana","compressible":true},"application/multipart-core":{"source":"iana"},"application/mxf":{"source":"iana","extensions":["mxf"]},"application/n-quads":{"source":"iana","extensions":["nq"]},"application/n-triples":{"source":"iana","extensions":["nt"]},"application/nasdata":{"source":"iana"},"application/news-checkgroups":{"source":"iana","charset":"US-ASCII"},"application/news-groupinfo":{"source":"iana","charset":"US-ASCII"},"application/news-transmission":{"source":"iana"},"application/nlsml+xml":{"source":"iana","compressible":true},"application/node":{"source":"iana","extensions":["cjs"]},"application/nss":{"source":"iana"},"application/ocsp-request":{"source":"iana"},"application/ocsp-response":{"source":"iana"},"application/octet-stream":{"source":"iana","compressible":false,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{"source":"iana","extensions":["oda"]},"application/odm+xml":{"source":"iana","compressible":true},"application/odx":{"source":"iana"},"application/oebps-package+xml":{"source":"iana","compressible":true,"extensions":["opf"]},"application/ogg":{"source":"iana","compressible":false,"extensions":["ogx"]},"application/omdoc+xml":{"source":"apache","compressible":true,"extensions":["omdoc"]},"application/onenote":{"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg"]},"application/opc-nodeset+xml":{"source":"iana","compressible":true},"application/oscore":{"source":"iana"},"application/oxps":{"source":"iana","extensions":["oxps"]},"application/p2p-overlay+xml":{"source":"iana","compressible":true,"extensions":["relo"]},"application/parityfec":{"source":"iana"},"application/passport":{"source":"iana"},"application/patch-ops-error+xml":{"source":"iana","compressible":true,"extensions":["xer"]},"application/pdf":{"source":"iana","compressible":false,"extensions":["pdf"]},"application/pdx":{"source":"iana"},"application/pem-certificate-chain":{"source":"iana"},"application/pgp-encrypted":{"source":"iana","compressible":false,"extensions":["pgp"]},"application/pgp-keys":{"source":"iana"},"application/pgp-signature":{"source":"iana","extensions":["asc","sig"]},"application/pics-rules":{"source":"apache","extensions":["prf"]},"application/pidf+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pidf-diff+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pkcs10":{"source":"iana","extensions":["p10"]},"application/pkcs12":{"source":"iana"},"application/pkcs7-mime":{"source":"iana","extensions":["p7m","p7c"]},"application/pkcs7-signature":{"source":"iana","extensions":["p7s"]},"application/pkcs8":{"source":"iana","extensions":["p8"]},"application/pkcs8-encrypted":{"source":"iana"},"application/pkix-attr-cert":{"source":"iana","extensions":["ac"]},"application/pkix-cert":{"source":"iana","extensions":["cer"]},"application/pkix-crl":{"source":"iana","extensions":["crl"]},"application/pkix-pkipath":{"source":"iana","extensions":["pkipath"]},"application/pkixcmp":{"source":"iana","extensions":["pki"]},"application/pls+xml":{"source":"iana","compressible":true,"extensions":["pls"]},"application/poc-settings+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/postscript":{"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},"application/ppsp-tracker+json":{"source":"iana","compressible":true},"application/problem+json":{"source":"iana","compressible":true},"application/problem+xml":{"source":"iana","compressible":true},"application/provenance+xml":{"source":"iana","compressible":true,"extensions":["provx"]},"application/prs.alvestrand.titrax-sheet":{"source":"iana"},"application/prs.cww":{"source":"iana","extensions":["cww"]},"application/prs.cyn":{"source":"iana","charset":"7-BIT"},"application/prs.hpub+zip":{"source":"iana","compressible":false},"application/prs.nprend":{"source":"iana"},"application/prs.plucker":{"source":"iana"},"application/prs.rdf-xml-crypt":{"source":"iana"},"application/prs.xsf+xml":{"source":"iana","compressible":true},"application/pskc+xml":{"source":"iana","compressible":true,"extensions":["pskcxml"]},"application/pvd+json":{"source":"iana","compressible":true},"application/qsig":{"source":"iana"},"application/raml+yaml":{"compressible":true,"extensions":["raml"]},"application/raptorfec":{"source":"iana"},"application/rdap+json":{"source":"iana","compressible":true},"application/rdf+xml":{"source":"iana","compressible":true,"extensions":["rdf","owl"]},"application/reginfo+xml":{"source":"iana","compressible":true,"extensions":["rif"]},"application/relax-ng-compact-syntax":{"source":"iana","extensions":["rnc"]},"application/remote-printing":{"source":"iana"},"application/reputon+json":{"source":"iana","compressible":true},"application/resource-lists+xml":{"source":"iana","compressible":true,"extensions":["rl"]},"application/resource-lists-diff+xml":{"source":"iana","compressible":true,"extensions":["rld"]},"application/rfc+xml":{"source":"iana","compressible":true},"application/riscos":{"source":"iana"},"application/rlmi+xml":{"source":"iana","compressible":true},"application/rls-services+xml":{"source":"iana","compressible":true,"extensions":["rs"]},"application/route-apd+xml":{"source":"iana","compressible":true,"extensions":["rapd"]},"application/route-s-tsid+xml":{"source":"iana","compressible":true,"extensions":["sls"]},"application/route-usd+xml":{"source":"iana","compressible":true,"extensions":["rusd"]},"application/rpki-ghostbusters":{"source":"iana","extensions":["gbr"]},"application/rpki-manifest":{"source":"iana","extensions":["mft"]},"application/rpki-publication":{"source":"iana"},"application/rpki-roa":{"source":"iana","extensions":["roa"]},"application/rpki-updown":{"source":"iana"},"application/rsd+xml":{"source":"apache","compressible":true,"extensions":["rsd"]},"application/rss+xml":{"source":"apache","compressible":true,"extensions":["rss"]},"application/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"application/rtploopback":{"source":"iana"},"application/rtx":{"source":"iana"},"application/samlassertion+xml":{"source":"iana","compressible":true},"application/samlmetadata+xml":{"source":"iana","compressible":true},"application/sarif+json":{"source":"iana","compressible":true},"application/sbe":{"source":"iana"},"application/sbml+xml":{"source":"iana","compressible":true,"extensions":["sbml"]},"application/scaip+xml":{"source":"iana","compressible":true},"application/scim+json":{"source":"iana","compressible":true},"application/scvp-cv-request":{"source":"iana","extensions":["scq"]},"application/scvp-cv-response":{"source":"iana","extensions":["scs"]},"application/scvp-vp-request":{"source":"iana","extensions":["spq"]},"application/scvp-vp-response":{"source":"iana","extensions":["spp"]},"application/sdp":{"source":"iana","extensions":["sdp"]},"application/secevent+jwt":{"source":"iana"},"application/senml+cbor":{"source":"iana"},"application/senml+json":{"source":"iana","compressible":true},"application/senml+xml":{"source":"iana","compressible":true,"extensions":["senmlx"]},"application/senml-etch+cbor":{"source":"iana"},"application/senml-etch+json":{"source":"iana","compressible":true},"application/senml-exi":{"source":"iana"},"application/sensml+cbor":{"source":"iana"},"application/sensml+json":{"source":"iana","compressible":true},"application/sensml+xml":{"source":"iana","compressible":true,"extensions":["sensmlx"]},"application/sensml-exi":{"source":"iana"},"application/sep+xml":{"source":"iana","compressible":true},"application/sep-exi":{"source":"iana"},"application/session-info":{"source":"iana"},"application/set-payment":{"source":"iana"},"application/set-payment-initiation":{"source":"iana","extensions":["setpay"]},"application/set-registration":{"source":"iana"},"application/set-registration-initiation":{"source":"iana","extensions":["setreg"]},"application/sgml":{"source":"iana"},"application/sgml-open-catalog":{"source":"iana"},"application/shf+xml":{"source":"iana","compressible":true,"extensions":["shf"]},"application/sieve":{"source":"iana","extensions":["siv","sieve"]},"application/simple-filter+xml":{"source":"iana","compressible":true},"application/simple-message-summary":{"source":"iana"},"application/simplesymbolcontainer":{"source":"iana"},"application/sipc":{"source":"iana"},"application/slate":{"source":"iana"},"application/smil":{"source":"iana"},"application/smil+xml":{"source":"iana","compressible":true,"extensions":["smi","smil"]},"application/smpte336m":{"source":"iana"},"application/soap+fastinfoset":{"source":"iana"},"application/soap+xml":{"source":"iana","compressible":true},"application/sparql-query":{"source":"iana","extensions":["rq"]},"application/sparql-results+xml":{"source":"iana","compressible":true,"extensions":["srx"]},"application/spirits-event+xml":{"source":"iana","compressible":true},"application/sql":{"source":"iana"},"application/srgs":{"source":"iana","extensions":["gram"]},"application/srgs+xml":{"source":"iana","compressible":true,"extensions":["grxml"]},"application/sru+xml":{"source":"iana","compressible":true,"extensions":["sru"]},"application/ssdl+xml":{"source":"apache","compressible":true,"extensions":["ssdl"]},"application/ssml+xml":{"source":"iana","compressible":true,"extensions":["ssml"]},"application/stix+json":{"source":"iana","compressible":true},"application/swid+xml":{"source":"iana","compressible":true,"extensions":["swidtag"]},"application/tamp-apex-update":{"source":"iana"},"application/tamp-apex-update-confirm":{"source":"iana"},"application/tamp-community-update":{"source":"iana"},"application/tamp-community-update-confirm":{"source":"iana"},"application/tamp-error":{"source":"iana"},"application/tamp-sequence-adjust":{"source":"iana"},"application/tamp-sequence-adjust-confirm":{"source":"iana"},"application/tamp-status-query":{"source":"iana"},"application/tamp-status-response":{"source":"iana"},"application/tamp-update":{"source":"iana"},"application/tamp-update-confirm":{"source":"iana"},"application/tar":{"compressible":true},"application/taxii+json":{"source":"iana","compressible":true},"application/td+json":{"source":"iana","compressible":true},"application/tei+xml":{"source":"iana","compressible":true,"extensions":["tei","teicorpus"]},"application/tetra_isi":{"source":"iana"},"application/thraud+xml":{"source":"iana","compressible":true,"extensions":["tfi"]},"application/timestamp-query":{"source":"iana"},"application/timestamp-reply":{"source":"iana"},"application/timestamped-data":{"source":"iana","extensions":["tsd"]},"application/tlsrpt+gzip":{"source":"iana"},"application/tlsrpt+json":{"source":"iana","compressible":true},"application/tnauthlist":{"source":"iana"},"application/toml":{"compressible":true,"extensions":["toml"]},"application/trickle-ice-sdpfrag":{"source":"iana"},"application/trig":{"source":"iana"},"application/ttml+xml":{"source":"iana","compressible":true,"extensions":["ttml"]},"application/tve-trigger":{"source":"iana"},"application/tzif":{"source":"iana"},"application/tzif-leap":{"source":"iana"},"application/ubjson":{"compressible":false,"extensions":["ubj"]},"application/ulpfec":{"source":"iana"},"application/urc-grpsheet+xml":{"source":"iana","compressible":true},"application/urc-ressheet+xml":{"source":"iana","compressible":true,"extensions":["rsheet"]},"application/urc-targetdesc+xml":{"source":"iana","compressible":true,"extensions":["td"]},"application/urc-uisocketdesc+xml":{"source":"iana","compressible":true},"application/vcard+json":{"source":"iana","compressible":true},"application/vcard+xml":{"source":"iana","compressible":true},"application/vemmi":{"source":"iana"},"application/vividence.scriptfile":{"source":"apache"},"application/vnd.1000minds.decision-model+xml":{"source":"iana","compressible":true,"extensions":["1km"]},"application/vnd.3gpp-prose+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-prose-pc3ch+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-v2x-local-service-information":{"source":"iana"},"application/vnd.3gpp.access-transfer-events+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.bsf+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gmop+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.interworking-data":{"source":"iana"},"application/vnd.3gpp.mc-signalling-ear":{"source":"iana"},"application/vnd.3gpp.mcdata-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-payload":{"source":"iana"},"application/vnd.3gpp.mcdata-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-signalling":{"source":"iana"},"application/vnd.3gpp.mcdata-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-floor-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-signed+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-init-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-transmission-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mid-call+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.pic-bw-large":{"source":"iana","extensions":["plb"]},"application/vnd.3gpp.pic-bw-small":{"source":"iana","extensions":["psb"]},"application/vnd.3gpp.pic-bw-var":{"source":"iana","extensions":["pvb"]},"application/vnd.3gpp.sms":{"source":"iana"},"application/vnd.3gpp.sms+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-ext+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.state-and-event-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ussd+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.bcmcsinfo+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.sms":{"source":"iana"},"application/vnd.3gpp2.tcap":{"source":"iana","extensions":["tcap"]},"application/vnd.3lightssoftware.imagescal":{"source":"iana"},"application/vnd.3m.post-it-notes":{"source":"iana","extensions":["pwn"]},"application/vnd.accpac.simply.aso":{"source":"iana","extensions":["aso"]},"application/vnd.accpac.simply.imp":{"source":"iana","extensions":["imp"]},"application/vnd.acucobol":{"source":"iana","extensions":["acu"]},"application/vnd.acucorp":{"source":"iana","extensions":["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{"source":"apache","compressible":false,"extensions":["air"]},"application/vnd.adobe.flash.movie":{"source":"iana"},"application/vnd.adobe.formscentral.fcdt":{"source":"iana","extensions":["fcdt"]},"application/vnd.adobe.fxp":{"source":"iana","extensions":["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{"source":"iana"},"application/vnd.adobe.xdp+xml":{"source":"iana","compressible":true,"extensions":["xdp"]},"application/vnd.adobe.xfdf":{"source":"iana","extensions":["xfdf"]},"application/vnd.aether.imp":{"source":"iana"},"application/vnd.afpc.afplinedata":{"source":"iana"},"application/vnd.afpc.afplinedata-pagedef":{"source":"iana"},"application/vnd.afpc.cmoca-cmresource":{"source":"iana"},"application/vnd.afpc.foca-charset":{"source":"iana"},"application/vnd.afpc.foca-codedfont":{"source":"iana"},"application/vnd.afpc.foca-codepage":{"source":"iana"},"application/vnd.afpc.modca":{"source":"iana"},"application/vnd.afpc.modca-cmtable":{"source":"iana"},"application/vnd.afpc.modca-formdef":{"source":"iana"},"application/vnd.afpc.modca-mediummap":{"source":"iana"},"application/vnd.afpc.modca-objectcontainer":{"source":"iana"},"application/vnd.afpc.modca-overlay":{"source":"iana"},"application/vnd.afpc.modca-pagesegment":{"source":"iana"},"application/vnd.ah-barcode":{"source":"iana"},"application/vnd.ahead.space":{"source":"iana","extensions":["ahead"]},"application/vnd.airzip.filesecure.azf":{"source":"iana","extensions":["azf"]},"application/vnd.airzip.filesecure.azs":{"source":"iana","extensions":["azs"]},"application/vnd.amadeus+json":{"source":"iana","compressible":true},"application/vnd.amazon.ebook":{"source":"apache","extensions":["azw"]},"application/vnd.amazon.mobi8-ebook":{"source":"iana"},"application/vnd.americandynamics.acc":{"source":"iana","extensions":["acc"]},"application/vnd.amiga.ami":{"source":"iana","extensions":["ami"]},"application/vnd.amundsen.maze+xml":{"source":"iana","compressible":true},"application/vnd.android.ota":{"source":"iana"},"application/vnd.android.package-archive":{"source":"apache","compressible":false,"extensions":["apk"]},"application/vnd.anki":{"source":"iana"},"application/vnd.anser-web-certificate-issue-initiation":{"source":"iana","extensions":["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{"source":"apache","extensions":["fti"]},"application/vnd.antix.game-component":{"source":"iana","extensions":["atx"]},"application/vnd.apache.thrift.binary":{"source":"iana"},"application/vnd.apache.thrift.compact":{"source":"iana"},"application/vnd.apache.thrift.json":{"source":"iana"},"application/vnd.api+json":{"source":"iana","compressible":true},"application/vnd.aplextor.warrp+json":{"source":"iana","compressible":true},"application/vnd.apothekende.reservation+json":{"source":"iana","compressible":true},"application/vnd.apple.installer+xml":{"source":"iana","compressible":true,"extensions":["mpkg"]},"application/vnd.apple.keynote":{"source":"iana","extensions":["key"]},"application/vnd.apple.mpegurl":{"source":"iana","extensions":["m3u8"]},"application/vnd.apple.numbers":{"source":"iana","extensions":["numbers"]},"application/vnd.apple.pages":{"source":"iana","extensions":["pages"]},"application/vnd.apple.pkpass":{"compressible":false,"extensions":["pkpass"]},"application/vnd.arastra.swi":{"source":"iana"},"application/vnd.aristanetworks.swi":{"source":"iana","extensions":["swi"]},"application/vnd.artisan+json":{"source":"iana","compressible":true},"application/vnd.artsquare":{"source":"iana"},"application/vnd.astraea-software.iota":{"source":"iana","extensions":["iota"]},"application/vnd.audiograph":{"source":"iana","extensions":["aep"]},"application/vnd.autopackage":{"source":"iana"},"application/vnd.avalon+json":{"source":"iana","compressible":true},"application/vnd.avistar+xml":{"source":"iana","compressible":true},"application/vnd.balsamiq.bmml+xml":{"source":"iana","compressible":true,"extensions":["bmml"]},"application/vnd.balsamiq.bmpr":{"source":"iana"},"application/vnd.banana-accounting":{"source":"iana"},"application/vnd.bbf.usp.error":{"source":"iana"},"application/vnd.bbf.usp.msg":{"source":"iana"},"application/vnd.bbf.usp.msg+json":{"source":"iana","compressible":true},"application/vnd.bekitzur-stech+json":{"source":"iana","compressible":true},"application/vnd.bint.med-content":{"source":"iana"},"application/vnd.biopax.rdf+xml":{"source":"iana","compressible":true},"application/vnd.blink-idb-value-wrapper":{"source":"iana"},"application/vnd.blueice.multipass":{"source":"iana","extensions":["mpm"]},"application/vnd.bluetooth.ep.oob":{"source":"iana"},"application/vnd.bluetooth.le.oob":{"source":"iana"},"application/vnd.bmi":{"source":"iana","extensions":["bmi"]},"application/vnd.bpf":{"source":"iana"},"application/vnd.bpf3":{"source":"iana"},"application/vnd.businessobjects":{"source":"iana","extensions":["rep"]},"application/vnd.byu.uapi+json":{"source":"iana","compressible":true},"application/vnd.cab-jscript":{"source":"iana"},"application/vnd.canon-cpdl":{"source":"iana"},"application/vnd.canon-lips":{"source":"iana"},"application/vnd.capasystems-pg+json":{"source":"iana","compressible":true},"application/vnd.cendio.thinlinc.clientconf":{"source":"iana"},"application/vnd.century-systems.tcp_stream":{"source":"iana"},"application/vnd.chemdraw+xml":{"source":"iana","compressible":true,"extensions":["cdxml"]},"application/vnd.chess-pgn":{"source":"iana"},"application/vnd.chipnuts.karaoke-mmd":{"source":"iana","extensions":["mmd"]},"application/vnd.ciedi":{"source":"iana"},"application/vnd.cinderella":{"source":"iana","extensions":["cdy"]},"application/vnd.cirpack.isdn-ext":{"source":"iana"},"application/vnd.citationstyles.style+xml":{"source":"iana","compressible":true,"extensions":["csl"]},"application/vnd.claymore":{"source":"iana","extensions":["cla"]},"application/vnd.cloanto.rp9":{"source":"iana","extensions":["rp9"]},"application/vnd.clonk.c4group":{"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{"source":"iana","extensions":["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{"source":"iana","extensions":["c11amz"]},"application/vnd.coffeescript":{"source":"iana"},"application/vnd.collabio.xodocuments.document":{"source":"iana"},"application/vnd.collabio.xodocuments.document-template":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation-template":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet-template":{"source":"iana"},"application/vnd.collection+json":{"source":"iana","compressible":true},"application/vnd.collection.doc+json":{"source":"iana","compressible":true},"application/vnd.collection.next+json":{"source":"iana","compressible":true},"application/vnd.comicbook+zip":{"source":"iana","compressible":false},"application/vnd.comicbook-rar":{"source":"iana"},"application/vnd.commerce-battelle":{"source":"iana"},"application/vnd.commonspace":{"source":"iana","extensions":["csp"]},"application/vnd.contact.cmsg":{"source":"iana","extensions":["cdbcmsg"]},"application/vnd.coreos.ignition+json":{"source":"iana","compressible":true},"application/vnd.cosmocaller":{"source":"iana","extensions":["cmc"]},"application/vnd.crick.clicker":{"source":"iana","extensions":["clkx"]},"application/vnd.crick.clicker.keyboard":{"source":"iana","extensions":["clkk"]},"application/vnd.crick.clicker.palette":{"source":"iana","extensions":["clkp"]},"application/vnd.crick.clicker.template":{"source":"iana","extensions":["clkt"]},"application/vnd.crick.clicker.wordbank":{"source":"iana","extensions":["clkw"]},"application/vnd.criticaltools.wbs+xml":{"source":"iana","compressible":true,"extensions":["wbs"]},"application/vnd.cryptii.pipe+json":{"source":"iana","compressible":true},"application/vnd.crypto-shade-file":{"source":"iana"},"application/vnd.cryptomator.encrypted":{"source":"iana"},"application/vnd.ctc-posml":{"source":"iana","extensions":["pml"]},"application/vnd.ctct.ws+xml":{"source":"iana","compressible":true},"application/vnd.cups-pdf":{"source":"iana"},"application/vnd.cups-postscript":{"source":"iana"},"application/vnd.cups-ppd":{"source":"iana","extensions":["ppd"]},"application/vnd.cups-raster":{"source":"iana"},"application/vnd.cups-raw":{"source":"iana"},"application/vnd.curl":{"source":"iana"},"application/vnd.curl.car":{"source":"apache","extensions":["car"]},"application/vnd.curl.pcurl":{"source":"apache","extensions":["pcurl"]},"application/vnd.cyan.dean.root+xml":{"source":"iana","compressible":true},"application/vnd.cybank":{"source":"iana"},"application/vnd.cyclonedx+json":{"source":"iana","compressible":true},"application/vnd.cyclonedx+xml":{"source":"iana","compressible":true},"application/vnd.d2l.coursepackage1p0+zip":{"source":"iana","compressible":false},"application/vnd.d3m-dataset":{"source":"iana"},"application/vnd.d3m-problem":{"source":"iana"},"application/vnd.dart":{"source":"iana","compressible":true,"extensions":["dart"]},"application/vnd.data-vision.rdz":{"source":"iana","extensions":["rdz"]},"application/vnd.datapackage+json":{"source":"iana","compressible":true},"application/vnd.dataresource+json":{"source":"iana","compressible":true},"application/vnd.dbf":{"source":"iana","extensions":["dbf"]},"application/vnd.debian.binary-package":{"source":"iana"},"application/vnd.dece.data":{"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{"source":"iana","compressible":true,"extensions":["uvt","uvvt"]},"application/vnd.dece.unspecified":{"source":"iana","extensions":["uvx","uvvx"]},"application/vnd.dece.zip":{"source":"iana","extensions":["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{"source":"iana","extensions":["fe_launch"]},"application/vnd.desmume.movie":{"source":"iana"},"application/vnd.dir-bi.plate-dl-nosuffix":{"source":"iana"},"application/vnd.dm.delegation+xml":{"source":"iana","compressible":true},"application/vnd.dna":{"source":"iana","extensions":["dna"]},"application/vnd.document+json":{"source":"iana","compressible":true},"application/vnd.dolby.mlp":{"source":"apache","extensions":["mlp"]},"application/vnd.dolby.mobile.1":{"source":"iana"},"application/vnd.dolby.mobile.2":{"source":"iana"},"application/vnd.doremir.scorecloud-binary-document":{"source":"iana"},"application/vnd.dpgraph":{"source":"iana","extensions":["dpg"]},"application/vnd.dreamfactory":{"source":"iana","extensions":["dfac"]},"application/vnd.drive+json":{"source":"iana","compressible":true},"application/vnd.ds-keypoint":{"source":"apache","extensions":["kpxx"]},"application/vnd.dtg.local":{"source":"iana"},"application/vnd.dtg.local.flash":{"source":"iana"},"application/vnd.dtg.local.html":{"source":"iana"},"application/vnd.dvb.ait":{"source":"iana","extensions":["ait"]},"application/vnd.dvb.dvbisl+xml":{"source":"iana","compressible":true},"application/vnd.dvb.dvbj":{"source":"iana"},"application/vnd.dvb.esgcontainer":{"source":"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess2":{"source":"iana"},"application/vnd.dvb.ipdcesgpdd":{"source":"iana"},"application/vnd.dvb.ipdcroaming":{"source":"iana"},"application/vnd.dvb.iptv.alfec-base":{"source":"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{"source":"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-container+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-generic+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-msglist+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-request+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-response+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-init+xml":{"source":"iana","compressible":true},"application/vnd.dvb.pfr":{"source":"iana"},"application/vnd.dvb.service":{"source":"iana","extensions":["svc"]},"application/vnd.dxr":{"source":"iana"},"application/vnd.dynageo":{"source":"iana","extensions":["geo"]},"application/vnd.dzr":{"source":"iana"},"application/vnd.easykaraoke.cdgdownload":{"source":"iana"},"application/vnd.ecdis-update":{"source":"iana"},"application/vnd.ecip.rlp":{"source":"iana"},"application/vnd.ecowin.chart":{"source":"iana","extensions":["mag"]},"application/vnd.ecowin.filerequest":{"source":"iana"},"application/vnd.ecowin.fileupdate":{"source":"iana"},"application/vnd.ecowin.series":{"source":"iana"},"application/vnd.ecowin.seriesrequest":{"source":"iana"},"application/vnd.ecowin.seriesupdate":{"source":"iana"},"application/vnd.efi.img":{"source":"iana"},"application/vnd.efi.iso":{"source":"iana"},"application/vnd.emclient.accessrequest+xml":{"source":"iana","compressible":true},"application/vnd.enliven":{"source":"iana","extensions":["nml"]},"application/vnd.enphase.envoy":{"source":"iana"},"application/vnd.eprints.data+xml":{"source":"iana","compressible":true},"application/vnd.epson.esf":{"source":"iana","extensions":["esf"]},"application/vnd.epson.msf":{"source":"iana","extensions":["msf"]},"application/vnd.epson.quickanime":{"source":"iana","extensions":["qam"]},"application/vnd.epson.salt":{"source":"iana","extensions":["slt"]},"application/vnd.epson.ssf":{"source":"iana","extensions":["ssf"]},"application/vnd.ericsson.quickcall":{"source":"iana"},"application/vnd.espass-espass+zip":{"source":"iana","compressible":false},"application/vnd.eszigno3+xml":{"source":"iana","compressible":true,"extensions":["es3","et3"]},"application/vnd.etsi.aoc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.asic-e+zip":{"source":"iana","compressible":false},"application/vnd.etsi.asic-s+zip":{"source":"iana","compressible":false},"application/vnd.etsi.cug+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvcommand+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-bc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-cod+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-npvr+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvservice+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsync+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvueprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mcid+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mheg5":{"source":"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{"source":"iana","compressible":true},"application/vnd.etsi.pstn+xml":{"source":"iana","compressible":true},"application/vnd.etsi.sci+xml":{"source":"iana","compressible":true},"application/vnd.etsi.simservs+xml":{"source":"iana","compressible":true},"application/vnd.etsi.timestamp-token":{"source":"iana"},"application/vnd.etsi.tsl+xml":{"source":"iana","compressible":true},"application/vnd.etsi.tsl.der":{"source":"iana"},"application/vnd.eudora.data":{"source":"iana"},"application/vnd.evolv.ecig.profile":{"source":"iana"},"application/vnd.evolv.ecig.settings":{"source":"iana"},"application/vnd.evolv.ecig.theme":{"source":"iana"},"application/vnd.exstream-empower+zip":{"source":"iana","compressible":false},"application/vnd.exstream-package":{"source":"iana"},"application/vnd.ezpix-album":{"source":"iana","extensions":["ez2"]},"application/vnd.ezpix-package":{"source":"iana","extensions":["ez3"]},"application/vnd.f-secure.mobile":{"source":"iana"},"application/vnd.fastcopy-disk-image":{"source":"iana"},"application/vnd.fdf":{"source":"iana","extensions":["fdf"]},"application/vnd.fdsn.mseed":{"source":"iana","extensions":["mseed"]},"application/vnd.fdsn.seed":{"source":"iana","extensions":["seed","dataless"]},"application/vnd.ffsns":{"source":"iana"},"application/vnd.ficlab.flb+zip":{"source":"iana","compressible":false},"application/vnd.filmit.zfc":{"source":"iana"},"application/vnd.fints":{"source":"iana"},"application/vnd.firemonkeys.cloudcell":{"source":"iana"},"application/vnd.flographit":{"source":"iana","extensions":["gph"]},"application/vnd.fluxtime.clip":{"source":"iana","extensions":["ftc"]},"application/vnd.font-fontforge-sfd":{"source":"iana"},"application/vnd.framemaker":{"source":"iana","extensions":["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{"source":"iana","extensions":["fnc"]},"application/vnd.frogans.ltf":{"source":"iana","extensions":["ltf"]},"application/vnd.fsc.weblaunch":{"source":"iana","extensions":["fsc"]},"application/vnd.fujitsu.oasys":{"source":"iana","extensions":["oas"]},"application/vnd.fujitsu.oasys2":{"source":"iana","extensions":["oa2"]},"application/vnd.fujitsu.oasys3":{"source":"iana","extensions":["oa3"]},"application/vnd.fujitsu.oasysgp":{"source":"iana","extensions":["fg5"]},"application/vnd.fujitsu.oasysprs":{"source":"iana","extensions":["bh2"]},"application/vnd.fujixerox.art-ex":{"source":"iana"},"application/vnd.fujixerox.art4":{"source":"iana"},"application/vnd.fujixerox.ddd":{"source":"iana","extensions":["ddd"]},"application/vnd.fujixerox.docuworks":{"source":"iana","extensions":["xdw"]},"application/vnd.fujixerox.docuworks.binder":{"source":"iana","extensions":["xbd"]},"application/vnd.fujixerox.docuworks.container":{"source":"iana"},"application/vnd.fujixerox.hbpl":{"source":"iana"},"application/vnd.fut-misnet":{"source":"iana"},"application/vnd.futoin+cbor":{"source":"iana"},"application/vnd.futoin+json":{"source":"iana","compressible":true},"application/vnd.fuzzysheet":{"source":"iana","extensions":["fzs"]},"application/vnd.genomatix.tuxedo":{"source":"iana","extensions":["txd"]},"application/vnd.gentics.grd+json":{"source":"iana","compressible":true},"application/vnd.geo+json":{"source":"iana","compressible":true},"application/vnd.geocube+xml":{"source":"iana","compressible":true},"application/vnd.geogebra.file":{"source":"iana","extensions":["ggb"]},"application/vnd.geogebra.slides":{"source":"iana"},"application/vnd.geogebra.tool":{"source":"iana","extensions":["ggt"]},"application/vnd.geometry-explorer":{"source":"iana","extensions":["gex","gre"]},"application/vnd.geonext":{"source":"iana","extensions":["gxt"]},"application/vnd.geoplan":{"source":"iana","extensions":["g2w"]},"application/vnd.geospace":{"source":"iana","extensions":["g3w"]},"application/vnd.gerber":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt-response":{"source":"iana"},"application/vnd.gmx":{"source":"iana","extensions":["gmx"]},"application/vnd.google-apps.document":{"compressible":false,"extensions":["gdoc"]},"application/vnd.google-apps.presentation":{"compressible":false,"extensions":["gslides"]},"application/vnd.google-apps.spreadsheet":{"compressible":false,"extensions":["gsheet"]},"application/vnd.google-earth.kml+xml":{"source":"iana","compressible":true,"extensions":["kml"]},"application/vnd.google-earth.kmz":{"source":"iana","compressible":false,"extensions":["kmz"]},"application/vnd.gov.sk.e-form+xml":{"source":"iana","compressible":true},"application/vnd.gov.sk.e-form+zip":{"source":"iana","compressible":false},"application/vnd.gov.sk.xmldatacontainer+xml":{"source":"iana","compressible":true},"application/vnd.grafeq":{"source":"iana","extensions":["gqf","gqs"]},"application/vnd.gridmp":{"source":"iana"},"application/vnd.groove-account":{"source":"iana","extensions":["gac"]},"application/vnd.groove-help":{"source":"iana","extensions":["ghf"]},"application/vnd.groove-identity-message":{"source":"iana","extensions":["gim"]},"application/vnd.groove-injector":{"source":"iana","extensions":["grv"]},"application/vnd.groove-tool-message":{"source":"iana","extensions":["gtm"]},"application/vnd.groove-tool-template":{"source":"iana","extensions":["tpl"]},"application/vnd.groove-vcard":{"source":"iana","extensions":["vcg"]},"application/vnd.hal+json":{"source":"iana","compressible":true},"application/vnd.hal+xml":{"source":"iana","compressible":true,"extensions":["hal"]},"application/vnd.handheld-entertainment+xml":{"source":"iana","compressible":true,"extensions":["zmm"]},"application/vnd.hbci":{"source":"iana","extensions":["hbci"]},"application/vnd.hc+json":{"source":"iana","compressible":true},"application/vnd.hcl-bireports":{"source":"iana"},"application/vnd.hdt":{"source":"iana"},"application/vnd.heroku+json":{"source":"iana","compressible":true},"application/vnd.hhe.lesson-player":{"source":"iana","extensions":["les"]},"application/vnd.hp-hpgl":{"source":"iana","extensions":["hpgl"]},"application/vnd.hp-hpid":{"source":"iana","extensions":["hpid"]},"application/vnd.hp-hps":{"source":"iana","extensions":["hps"]},"application/vnd.hp-jlyt":{"source":"iana","extensions":["jlt"]},"application/vnd.hp-pcl":{"source":"iana","extensions":["pcl"]},"application/vnd.hp-pclxl":{"source":"iana","extensions":["pclxl"]},"application/vnd.httphone":{"source":"iana"},"application/vnd.hydrostatix.sof-data":{"source":"iana","extensions":["sfd-hdstx"]},"application/vnd.hyper+json":{"source":"iana","compressible":true},"application/vnd.hyper-item+json":{"source":"iana","compressible":true},"application/vnd.hyperdrive+json":{"source":"iana","compressible":true},"application/vnd.hzn-3d-crossword":{"source":"iana"},"application/vnd.ibm.afplinedata":{"source":"iana"},"application/vnd.ibm.electronic-media":{"source":"iana"},"application/vnd.ibm.minipay":{"source":"iana","extensions":["mpy"]},"application/vnd.ibm.modcap":{"source":"iana","extensions":["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{"source":"iana","extensions":["irm"]},"application/vnd.ibm.secure-container":{"source":"iana","extensions":["sc"]},"application/vnd.iccprofile":{"source":"iana","extensions":["icc","icm"]},"application/vnd.ieee.1905":{"source":"iana"},"application/vnd.igloader":{"source":"iana","extensions":["igl"]},"application/vnd.imagemeter.folder+zip":{"source":"iana","compressible":false},"application/vnd.imagemeter.image+zip":{"source":"iana","compressible":false},"application/vnd.immervision-ivp":{"source":"iana","extensions":["ivp"]},"application/vnd.immervision-ivu":{"source":"iana","extensions":["ivu"]},"application/vnd.ims.imsccv1p1":{"source":"iana"},"application/vnd.ims.imsccv1p2":{"source":"iana"},"application/vnd.ims.imsccv1p3":{"source":"iana"},"application/vnd.ims.lis.v2.result+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy.id+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings.simple+json":{"source":"iana","compressible":true},"application/vnd.informedcontrol.rms+xml":{"source":"iana","compressible":true},"application/vnd.informix-visionary":{"source":"iana"},"application/vnd.infotech.project":{"source":"iana"},"application/vnd.infotech.project+xml":{"source":"iana","compressible":true},"application/vnd.innopath.wamp.notification":{"source":"iana"},"application/vnd.insors.igm":{"source":"iana","extensions":["igm"]},"application/vnd.intercon.formnet":{"source":"iana","extensions":["xpw","xpx"]},"application/vnd.intergeo":{"source":"iana","extensions":["i2g"]},"application/vnd.intertrust.digibox":{"source":"iana"},"application/vnd.intertrust.nncp":{"source":"iana"},"application/vnd.intu.qbo":{"source":"iana","extensions":["qbo"]},"application/vnd.intu.qfx":{"source":"iana","extensions":["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.conceptitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.knowledgeitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsmessage+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.packageitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.planningitem+xml":{"source":"iana","compressible":true},"application/vnd.ipunplugged.rcprofile":{"source":"iana","extensions":["rcprofile"]},"application/vnd.irepository.package+xml":{"source":"iana","compressible":true,"extensions":["irp"]},"application/vnd.is-xpr":{"source":"iana","extensions":["xpr"]},"application/vnd.isac.fcs":{"source":"iana","extensions":["fcs"]},"application/vnd.iso11783-10+zip":{"source":"iana","compressible":false},"application/vnd.jam":{"source":"iana","extensions":["jam"]},"application/vnd.japannet-directory-service":{"source":"iana"},"application/vnd.japannet-jpnstore-wakeup":{"source":"iana"},"application/vnd.japannet-payment-wakeup":{"source":"iana"},"application/vnd.japannet-registration":{"source":"iana"},"application/vnd.japannet-registration-wakeup":{"source":"iana"},"application/vnd.japannet-setstore-wakeup":{"source":"iana"},"application/vnd.japannet-verification":{"source":"iana"},"application/vnd.japannet-verification-wakeup":{"source":"iana"},"application/vnd.jcp.javame.midlet-rms":{"source":"iana","extensions":["rms"]},"application/vnd.jisp":{"source":"iana","extensions":["jisp"]},"application/vnd.joost.joda-archive":{"source":"iana","extensions":["joda"]},"application/vnd.jsk.isdn-ngn":{"source":"iana"},"application/vnd.kahootz":{"source":"iana","extensions":["ktz","ktr"]},"application/vnd.kde.karbon":{"source":"iana","extensions":["karbon"]},"application/vnd.kde.kchart":{"source":"iana","extensions":["chrt"]},"application/vnd.kde.kformula":{"source":"iana","extensions":["kfo"]},"application/vnd.kde.kivio":{"source":"iana","extensions":["flw"]},"application/vnd.kde.kontour":{"source":"iana","extensions":["kon"]},"application/vnd.kde.kpresenter":{"source":"iana","extensions":["kpr","kpt"]},"application/vnd.kde.kspread":{"source":"iana","extensions":["ksp"]},"application/vnd.kde.kword":{"source":"iana","extensions":["kwd","kwt"]},"application/vnd.kenameaapp":{"source":"iana","extensions":["htke"]},"application/vnd.kidspiration":{"source":"iana","extensions":["kia"]},"application/vnd.kinar":{"source":"iana","extensions":["kne","knp"]},"application/vnd.koan":{"source":"iana","extensions":["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{"source":"iana","extensions":["sse"]},"application/vnd.las":{"source":"iana"},"application/vnd.las.las+json":{"source":"iana","compressible":true},"application/vnd.las.las+xml":{"source":"iana","compressible":true,"extensions":["lasxml"]},"application/vnd.laszip":{"source":"iana"},"application/vnd.leap+json":{"source":"iana","compressible":true},"application/vnd.liberty-request+xml":{"source":"iana","compressible":true},"application/vnd.llamagraphics.life-balance.desktop":{"source":"iana","extensions":["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{"source":"iana","compressible":true,"extensions":["lbe"]},"application/vnd.logipipe.circuit+zip":{"source":"iana","compressible":false},"application/vnd.loom":{"source":"iana"},"application/vnd.lotus-1-2-3":{"source":"iana","extensions":["123"]},"application/vnd.lotus-approach":{"source":"iana","extensions":["apr"]},"application/vnd.lotus-freelance":{"source":"iana","extensions":["pre"]},"application/vnd.lotus-notes":{"source":"iana","extensions":["nsf"]},"application/vnd.lotus-organizer":{"source":"iana","extensions":["org"]},"application/vnd.lotus-screencam":{"source":"iana","extensions":["scm"]},"application/vnd.lotus-wordpro":{"source":"iana","extensions":["lwp"]},"application/vnd.macports.portpkg":{"source":"iana","extensions":["portpkg"]},"application/vnd.mapbox-vector-tile":{"source":"iana"},"application/vnd.marlin.drm.actiontoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.conftoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.license+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.mdcf":{"source":"iana"},"application/vnd.mason+json":{"source":"iana","compressible":true},"application/vnd.maxmind.maxmind-db":{"source":"iana"},"application/vnd.mcd":{"source":"iana","extensions":["mcd"]},"application/vnd.medcalcdata":{"source":"iana","extensions":["mc1"]},"application/vnd.mediastation.cdkey":{"source":"iana","extensions":["cdkey"]},"application/vnd.meridian-slingshot":{"source":"iana"},"application/vnd.mfer":{"source":"iana","extensions":["mwf"]},"application/vnd.mfmp":{"source":"iana","extensions":["mfm"]},"application/vnd.micro+json":{"source":"iana","compressible":true},"application/vnd.micrografx.flo":{"source":"iana","extensions":["flo"]},"application/vnd.micrografx.igx":{"source":"iana","extensions":["igx"]},"application/vnd.microsoft.portable-executable":{"source":"iana"},"application/vnd.microsoft.windows.thumbnail-cache":{"source":"iana"},"application/vnd.miele+json":{"source":"iana","compressible":true},"application/vnd.mif":{"source":"iana","extensions":["mif"]},"application/vnd.minisoft-hp3000-save":{"source":"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{"source":"iana"},"application/vnd.mobius.daf":{"source":"iana","extensions":["daf"]},"application/vnd.mobius.dis":{"source":"iana","extensions":["dis"]},"application/vnd.mobius.mbk":{"source":"iana","extensions":["mbk"]},"application/vnd.mobius.mqy":{"source":"iana","extensions":["mqy"]},"application/vnd.mobius.msl":{"source":"iana","extensions":["msl"]},"application/vnd.mobius.plc":{"source":"iana","extensions":["plc"]},"application/vnd.mobius.txf":{"source":"iana","extensions":["txf"]},"application/vnd.mophun.application":{"source":"iana","extensions":["mpn"]},"application/vnd.mophun.certificate":{"source":"iana","extensions":["mpc"]},"application/vnd.motorola.flexsuite":{"source":"iana"},"application/vnd.motorola.flexsuite.adsi":{"source":"iana"},"application/vnd.motorola.flexsuite.fis":{"source":"iana"},"application/vnd.motorola.flexsuite.gotap":{"source":"iana"},"application/vnd.motorola.flexsuite.kmr":{"source":"iana"},"application/vnd.motorola.flexsuite.ttc":{"source":"iana"},"application/vnd.motorola.flexsuite.wem":{"source":"iana"},"application/vnd.motorola.iprm":{"source":"iana"},"application/vnd.mozilla.xul+xml":{"source":"iana","compressible":true,"extensions":["xul"]},"application/vnd.ms-3mfdocument":{"source":"iana"},"application/vnd.ms-artgalry":{"source":"iana","extensions":["cil"]},"application/vnd.ms-asf":{"source":"iana"},"application/vnd.ms-cab-compressed":{"source":"iana","extensions":["cab"]},"application/vnd.ms-color.iccprofile":{"source":"apache"},"application/vnd.ms-excel":{"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{"source":"iana","extensions":["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{"source":"iana","extensions":["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{"source":"iana","extensions":["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{"source":"iana","extensions":["xltm"]},"application/vnd.ms-fontobject":{"source":"iana","compressible":true,"extensions":["eot"]},"application/vnd.ms-htmlhelp":{"source":"iana","extensions":["chm"]},"application/vnd.ms-ims":{"source":"iana","extensions":["ims"]},"application/vnd.ms-lrm":{"source":"iana","extensions":["lrm"]},"application/vnd.ms-office.activex+xml":{"source":"iana","compressible":true},"application/vnd.ms-officetheme":{"source":"iana","extensions":["thmx"]},"application/vnd.ms-opentype":{"source":"apache","compressible":true},"application/vnd.ms-outlook":{"compressible":false,"extensions":["msg"]},"application/vnd.ms-package.obfuscated-opentype":{"source":"apache"},"application/vnd.ms-pki.seccat":{"source":"apache","extensions":["cat"]},"application/vnd.ms-pki.stl":{"source":"apache","extensions":["stl"]},"application/vnd.ms-playready.initiator+xml":{"source":"iana","compressible":true},"application/vnd.ms-powerpoint":{"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{"source":"iana","extensions":["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{"source":"iana","extensions":["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{"source":"iana","extensions":["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{"source":"iana","extensions":["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{"source":"iana","extensions":["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{"source":"iana","compressible":true},"application/vnd.ms-printing.printticket+xml":{"source":"apache","compressible":true},"application/vnd.ms-printschematicket+xml":{"source":"iana","compressible":true},"application/vnd.ms-project":{"source":"iana","extensions":["mpp","mpt"]},"application/vnd.ms-tnef":{"source":"iana"},"application/vnd.ms-windows.devicepairing":{"source":"iana"},"application/vnd.ms-windows.nwprinting.oob":{"source":"iana"},"application/vnd.ms-windows.printerpairing":{"source":"iana"},"application/vnd.ms-windows.wsd.oob":{"source":"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.lic-resp":{"source":"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.meter-resp":{"source":"iana"},"application/vnd.ms-word.document.macroenabled.12":{"source":"iana","extensions":["docm"]},"application/vnd.ms-word.template.macroenabled.12":{"source":"iana","extensions":["dotm"]},"application/vnd.ms-works":{"source":"iana","extensions":["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{"source":"iana","extensions":["wpl"]},"application/vnd.ms-xpsdocument":{"source":"iana","compressible":false,"extensions":["xps"]},"application/vnd.msa-disk-image":{"source":"iana"},"application/vnd.mseq":{"source":"iana","extensions":["mseq"]},"application/vnd.msign":{"source":"iana"},"application/vnd.multiad.creator":{"source":"iana"},"application/vnd.multiad.creator.cif":{"source":"iana"},"application/vnd.music-niff":{"source":"iana"},"application/vnd.musician":{"source":"iana","extensions":["mus"]},"application/vnd.muvee.style":{"source":"iana","extensions":["msty"]},"application/vnd.mynfc":{"source":"iana","extensions":["taglet"]},"application/vnd.ncd.control":{"source":"iana"},"application/vnd.ncd.reference":{"source":"iana"},"application/vnd.nearst.inv+json":{"source":"iana","compressible":true},"application/vnd.nebumind.line":{"source":"iana"},"application/vnd.nervana":{"source":"iana"},"application/vnd.netfpx":{"source":"iana"},"application/vnd.neurolanguage.nlu":{"source":"iana","extensions":["nlu"]},"application/vnd.nimn":{"source":"iana"},"application/vnd.nintendo.nitro.rom":{"source":"iana"},"application/vnd.nintendo.snes.rom":{"source":"iana"},"application/vnd.nitf":{"source":"iana","extensions":["ntf","nitf"]},"application/vnd.noblenet-directory":{"source":"iana","extensions":["nnd"]},"application/vnd.noblenet-sealer":{"source":"iana","extensions":["nns"]},"application/vnd.noblenet-web":{"source":"iana","extensions":["nnw"]},"application/vnd.nokia.catalogs":{"source":"iana"},"application/vnd.nokia.conml+wbxml":{"source":"iana"},"application/vnd.nokia.conml+xml":{"source":"iana","compressible":true},"application/vnd.nokia.iptv.config+xml":{"source":"iana","compressible":true},"application/vnd.nokia.isds-radio-presets":{"source":"iana"},"application/vnd.nokia.landmark+wbxml":{"source":"iana"},"application/vnd.nokia.landmark+xml":{"source":"iana","compressible":true},"application/vnd.nokia.landmarkcollection+xml":{"source":"iana","compressible":true},"application/vnd.nokia.n-gage.ac+xml":{"source":"iana","compressible":true,"extensions":["ac"]},"application/vnd.nokia.n-gage.data":{"source":"iana","extensions":["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{"source":"iana","extensions":["n-gage"]},"application/vnd.nokia.ncd":{"source":"iana"},"application/vnd.nokia.pcd+wbxml":{"source":"iana"},"application/vnd.nokia.pcd+xml":{"source":"iana","compressible":true},"application/vnd.nokia.radio-preset":{"source":"iana","extensions":["rpst"]},"application/vnd.nokia.radio-presets":{"source":"iana","extensions":["rpss"]},"application/vnd.novadigm.edm":{"source":"iana","extensions":["edm"]},"application/vnd.novadigm.edx":{"source":"iana","extensions":["edx"]},"application/vnd.novadigm.ext":{"source":"iana","extensions":["ext"]},"application/vnd.ntt-local.content-share":{"source":"iana"},"application/vnd.ntt-local.file-transfer":{"source":"iana"},"application/vnd.ntt-local.ogw_remote-access":{"source":"iana"},"application/vnd.ntt-local.sip-ta_remote":{"source":"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{"source":"iana"},"application/vnd.oasis.opendocument.chart":{"source":"iana","extensions":["odc"]},"application/vnd.oasis.opendocument.chart-template":{"source":"iana","extensions":["otc"]},"application/vnd.oasis.opendocument.database":{"source":"iana","extensions":["odb"]},"application/vnd.oasis.opendocument.formula":{"source":"iana","extensions":["odf"]},"application/vnd.oasis.opendocument.formula-template":{"source":"iana","extensions":["odft"]},"application/vnd.oasis.opendocument.graphics":{"source":"iana","compressible":false,"extensions":["odg"]},"application/vnd.oasis.opendocument.graphics-template":{"source":"iana","extensions":["otg"]},"application/vnd.oasis.opendocument.image":{"source":"iana","extensions":["odi"]},"application/vnd.oasis.opendocument.image-template":{"source":"iana","extensions":["oti"]},"application/vnd.oasis.opendocument.presentation":{"source":"iana","compressible":false,"extensions":["odp"]},"application/vnd.oasis.opendocument.presentation-template":{"source":"iana","extensions":["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{"source":"iana","compressible":false,"extensions":["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{"source":"iana","extensions":["ots"]},"application/vnd.oasis.opendocument.text":{"source":"iana","compressible":false,"extensions":["odt"]},"application/vnd.oasis.opendocument.text-master":{"source":"iana","extensions":["odm"]},"application/vnd.oasis.opendocument.text-template":{"source":"iana","extensions":["ott"]},"application/vnd.oasis.opendocument.text-web":{"source":"iana","extensions":["oth"]},"application/vnd.obn":{"source":"iana"},"application/vnd.ocf+cbor":{"source":"iana"},"application/vnd.oci.image.manifest.v1+json":{"source":"iana","compressible":true},"application/vnd.oftn.l10n+json":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessdownload+xml":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessstreaming+xml":{"source":"iana","compressible":true},"application/vnd.oipf.cspg-hexbinary":{"source":"iana"},"application/vnd.oipf.dae.svg+xml":{"source":"iana","compressible":true},"application/vnd.oipf.dae.xhtml+xml":{"source":"iana","compressible":true},"application/vnd.oipf.mippvcontrolmessage+xml":{"source":"iana","compressible":true},"application/vnd.oipf.pae.gem":{"source":"iana"},"application/vnd.oipf.spdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.oipf.spdlist+xml":{"source":"iana","compressible":true},"application/vnd.oipf.ueprofile+xml":{"source":"iana","compressible":true},"application/vnd.oipf.userprofile+xml":{"source":"iana","compressible":true},"application/vnd.olpc-sugar":{"source":"iana","extensions":["xo"]},"application/vnd.oma-scws-config":{"source":"iana"},"application/vnd.oma-scws-http-request":{"source":"iana"},"application/vnd.oma-scws-http-response":{"source":"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.drm-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.imd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.ltkm":{"source":"iana"},"application/vnd.oma.bcast.notification+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.provisioningtrigger":{"source":"iana"},"application/vnd.oma.bcast.sgboot":{"source":"iana"},"application/vnd.oma.bcast.sgdd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sgdu":{"source":"iana"},"application/vnd.oma.bcast.simple-symbol-container":{"source":"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sprov+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.stkm":{"source":"iana"},"application/vnd.oma.cab-address-book+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-feature-handler+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-pcc+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-subs-invite+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-user-prefs+xml":{"source":"iana","compressible":true},"application/vnd.oma.dcd":{"source":"iana"},"application/vnd.oma.dcdc":{"source":"iana"},"application/vnd.oma.dd2+xml":{"source":"iana","compressible":true,"extensions":["dd2"]},"application/vnd.oma.drm.risd+xml":{"source":"iana","compressible":true},"application/vnd.oma.group-usage-list+xml":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+cbor":{"source":"iana"},"application/vnd.oma.lwm2m+json":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+tlv":{"source":"iana"},"application/vnd.oma.pal+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.detailed-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.final-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.groups+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.invocation-descriptor+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.optimized-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.push":{"source":"iana"},"application/vnd.oma.scidm.messages+xml":{"source":"iana","compressible":true},"application/vnd.oma.xcap-directory+xml":{"source":"iana","compressible":true},"application/vnd.omads-email+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-file+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-folder+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omaloc-supl-init":{"source":"iana"},"application/vnd.onepager":{"source":"iana"},"application/vnd.onepagertamp":{"source":"iana"},"application/vnd.onepagertamx":{"source":"iana"},"application/vnd.onepagertat":{"source":"iana"},"application/vnd.onepagertatp":{"source":"iana"},"application/vnd.onepagertatx":{"source":"iana"},"application/vnd.openblox.game+xml":{"source":"iana","compressible":true,"extensions":["obgx"]},"application/vnd.openblox.game-binary":{"source":"iana"},"application/vnd.openeye.oeb":{"source":"iana"},"application/vnd.openofficeorg.extension":{"source":"apache","extensions":["oxt"]},"application/vnd.openstreetmap.data+xml":{"source":"iana","compressible":true,"extensions":["osm"]},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawing+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{"source":"iana","compressible":false,"extensions":["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slide":{"source":"iana","extensions":["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{"source":"iana","extensions":["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.template":{"source":"iana","extensions":["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{"source":"iana","compressible":false,"extensions":["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{"source":"iana","extensions":["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.theme+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.vmldrawing":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{"source":"iana","compressible":false,"extensions":["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{"source":"iana","extensions":["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.core-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.relationships+xml":{"source":"iana","compressible":true},"application/vnd.oracle.resource+json":{"source":"iana","compressible":true},"application/vnd.orange.indata":{"source":"iana"},"application/vnd.osa.netdeploy":{"source":"iana"},"application/vnd.osgeo.mapguide.package":{"source":"iana","extensions":["mgp"]},"application/vnd.osgi.bundle":{"source":"iana"},"application/vnd.osgi.dp":{"source":"iana","extensions":["dp"]},"application/vnd.osgi.subsystem":{"source":"iana","extensions":["esa"]},"application/vnd.otps.ct-kip+xml":{"source":"iana","compressible":true},"application/vnd.oxli.countgraph":{"source":"iana"},"application/vnd.pagerduty+json":{"source":"iana","compressible":true},"application/vnd.palm":{"source":"iana","extensions":["pdb","pqa","oprc"]},"application/vnd.panoply":{"source":"iana"},"application/vnd.paos.xml":{"source":"iana"},"application/vnd.patentdive":{"source":"iana"},"application/vnd.patientecommsdoc":{"source":"iana"},"application/vnd.pawaafile":{"source":"iana","extensions":["paw"]},"application/vnd.pcos":{"source":"iana"},"application/vnd.pg.format":{"source":"iana","extensions":["str"]},"application/vnd.pg.osasli":{"source":"iana","extensions":["ei6"]},"application/vnd.piaccess.application-licence":{"source":"iana"},"application/vnd.picsel":{"source":"iana","extensions":["efif"]},"application/vnd.pmi.widget":{"source":"iana","extensions":["wg"]},"application/vnd.poc.group-advertisement+xml":{"source":"iana","compressible":true},"application/vnd.pocketlearn":{"source":"iana","extensions":["plf"]},"application/vnd.powerbuilder6":{"source":"iana","extensions":["pbd"]},"application/vnd.powerbuilder6-s":{"source":"iana"},"application/vnd.powerbuilder7":{"source":"iana"},"application/vnd.powerbuilder7-s":{"source":"iana"},"application/vnd.powerbuilder75":{"source":"iana"},"application/vnd.powerbuilder75-s":{"source":"iana"},"application/vnd.preminet":{"source":"iana"},"application/vnd.previewsystems.box":{"source":"iana","extensions":["box"]},"application/vnd.proteus.magazine":{"source":"iana","extensions":["mgz"]},"application/vnd.psfs":{"source":"iana"},"application/vnd.publishare-delta-tree":{"source":"iana","extensions":["qps"]},"application/vnd.pvi.ptid1":{"source":"iana","extensions":["ptid"]},"application/vnd.pwg-multiplexed":{"source":"iana"},"application/vnd.pwg-xhtml-print+xml":{"source":"iana","compressible":true},"application/vnd.qualcomm.brew-app-res":{"source":"iana"},"application/vnd.quarantainenet":{"source":"iana"},"application/vnd.quark.quarkxpress":{"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{"source":"iana"},"application/vnd.radisys.moml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conn+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-stream+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-base+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-detect+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-group+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-speech+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-transform+xml":{"source":"iana","compressible":true},"application/vnd.rainstor.data":{"source":"iana"},"application/vnd.rapid":{"source":"iana"},"application/vnd.rar":{"source":"iana","extensions":["rar"]},"application/vnd.realvnc.bed":{"source":"iana","extensions":["bed"]},"application/vnd.recordare.musicxml":{"source":"iana","extensions":["mxl"]},"application/vnd.recordare.musicxml+xml":{"source":"iana","compressible":true,"extensions":["musicxml"]},"application/vnd.renlearn.rlprint":{"source":"iana"},"application/vnd.restful+json":{"source":"iana","compressible":true},"application/vnd.rig.cryptonote":{"source":"iana","extensions":["cryptonote"]},"application/vnd.rim.cod":{"source":"apache","extensions":["cod"]},"application/vnd.rn-realmedia":{"source":"apache","extensions":["rm"]},"application/vnd.rn-realmedia-vbr":{"source":"apache","extensions":["rmvb"]},"application/vnd.route66.link66+xml":{"source":"iana","compressible":true,"extensions":["link66"]},"application/vnd.rs-274x":{"source":"iana"},"application/vnd.ruckus.download":{"source":"iana"},"application/vnd.s3sms":{"source":"iana"},"application/vnd.sailingtracker.track":{"source":"iana","extensions":["st"]},"application/vnd.sar":{"source":"iana"},"application/vnd.sbm.cid":{"source":"iana"},"application/vnd.sbm.mid2":{"source":"iana"},"application/vnd.scribus":{"source":"iana"},"application/vnd.sealed.3df":{"source":"iana"},"application/vnd.sealed.csf":{"source":"iana"},"application/vnd.sealed.doc":{"source":"iana"},"application/vnd.sealed.eml":{"source":"iana"},"application/vnd.sealed.mht":{"source":"iana"},"application/vnd.sealed.net":{"source":"iana"},"application/vnd.sealed.ppt":{"source":"iana"},"application/vnd.sealed.tiff":{"source":"iana"},"application/vnd.sealed.xls":{"source":"iana"},"application/vnd.sealedmedia.softseal.html":{"source":"iana"},"application/vnd.sealedmedia.softseal.pdf":{"source":"iana"},"application/vnd.seemail":{"source":"iana","extensions":["see"]},"application/vnd.seis+json":{"source":"iana","compressible":true},"application/vnd.sema":{"source":"iana","extensions":["sema"]},"application/vnd.semd":{"source":"iana","extensions":["semd"]},"application/vnd.semf":{"source":"iana","extensions":["semf"]},"application/vnd.shade-save-file":{"source":"iana"},"application/vnd.shana.informed.formdata":{"source":"iana","extensions":["ifm"]},"application/vnd.shana.informed.formtemplate":{"source":"iana","extensions":["itp"]},"application/vnd.shana.informed.interchange":{"source":"iana","extensions":["iif"]},"application/vnd.shana.informed.package":{"source":"iana","extensions":["ipk"]},"application/vnd.shootproof+json":{"source":"iana","compressible":true},"application/vnd.shopkick+json":{"source":"iana","compressible":true},"application/vnd.shp":{"source":"iana"},"application/vnd.shx":{"source":"iana"},"application/vnd.sigrok.session":{"source":"iana"},"application/vnd.simtech-mindmapper":{"source":"iana","extensions":["twd","twds"]},"application/vnd.siren+json":{"source":"iana","compressible":true},"application/vnd.smaf":{"source":"iana","extensions":["mmf"]},"application/vnd.smart.notebook":{"source":"iana"},"application/vnd.smart.teacher":{"source":"iana","extensions":["teacher"]},"application/vnd.snesdev-page-table":{"source":"iana"},"application/vnd.software602.filler.form+xml":{"source":"iana","compressible":true,"extensions":["fo"]},"application/vnd.software602.filler.form-xml-zip":{"source":"iana"},"application/vnd.solent.sdkm+xml":{"source":"iana","compressible":true,"extensions":["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{"source":"iana","extensions":["dxp"]},"application/vnd.spotfire.sfs":{"source":"iana","extensions":["sfs"]},"application/vnd.sqlite3":{"source":"iana"},"application/vnd.sss-cod":{"source":"iana"},"application/vnd.sss-dtf":{"source":"iana"},"application/vnd.sss-ntf":{"source":"iana"},"application/vnd.stardivision.calc":{"source":"apache","extensions":["sdc"]},"application/vnd.stardivision.draw":{"source":"apache","extensions":["sda"]},"application/vnd.stardivision.impress":{"source":"apache","extensions":["sdd"]},"application/vnd.stardivision.math":{"source":"apache","extensions":["smf"]},"application/vnd.stardivision.writer":{"source":"apache","extensions":["sdw","vor"]},"application/vnd.stardivision.writer-global":{"source":"apache","extensions":["sgl"]},"application/vnd.stepmania.package":{"source":"iana","extensions":["smzip"]},"application/vnd.stepmania.stepchart":{"source":"iana","extensions":["sm"]},"application/vnd.street-stream":{"source":"iana"},"application/vnd.sun.wadl+xml":{"source":"iana","compressible":true,"extensions":["wadl"]},"application/vnd.sun.xml.calc":{"source":"apache","extensions":["sxc"]},"application/vnd.sun.xml.calc.template":{"source":"apache","extensions":["stc"]},"application/vnd.sun.xml.draw":{"source":"apache","extensions":["sxd"]},"application/vnd.sun.xml.draw.template":{"source":"apache","extensions":["std"]},"application/vnd.sun.xml.impress":{"source":"apache","extensions":["sxi"]},"application/vnd.sun.xml.impress.template":{"source":"apache","extensions":["sti"]},"application/vnd.sun.xml.math":{"source":"apache","extensions":["sxm"]},"application/vnd.sun.xml.writer":{"source":"apache","extensions":["sxw"]},"application/vnd.sun.xml.writer.global":{"source":"apache","extensions":["sxg"]},"application/vnd.sun.xml.writer.template":{"source":"apache","extensions":["stw"]},"application/vnd.sus-calendar":{"source":"iana","extensions":["sus","susp"]},"application/vnd.svd":{"source":"iana","extensions":["svd"]},"application/vnd.swiftview-ics":{"source":"iana"},"application/vnd.sycle+xml":{"source":"iana","compressible":true},"application/vnd.symbian.install":{"source":"apache","extensions":["sis","sisx"]},"application/vnd.syncml+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xsm"]},"application/vnd.syncml.dm+wbxml":{"source":"iana","charset":"UTF-8","extensions":["bdm"]},"application/vnd.syncml.dm+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xdm"]},"application/vnd.syncml.dm.notification":{"source":"iana"},"application/vnd.syncml.dmddf+wbxml":{"source":"iana"},"application/vnd.syncml.dmddf+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["ddf"]},"application/vnd.syncml.dmtnds+wbxml":{"source":"iana"},"application/vnd.syncml.dmtnds+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.syncml.ds.notification":{"source":"iana"},"application/vnd.tableschema+json":{"source":"iana","compressible":true},"application/vnd.tao.intent-module-archive":{"source":"iana","extensions":["tao"]},"application/vnd.tcpdump.pcap":{"source":"iana","extensions":["pcap","cap","dmp"]},"application/vnd.think-cell.ppttc+json":{"source":"iana","compressible":true},"application/vnd.tmd.mediaflex.api+xml":{"source":"iana","compressible":true},"application/vnd.tml":{"source":"iana"},"application/vnd.tmobile-livetv":{"source":"iana","extensions":["tmo"]},"application/vnd.tri.onesource":{"source":"iana"},"application/vnd.trid.tpt":{"source":"iana","extensions":["tpt"]},"application/vnd.triscape.mxs":{"source":"iana","extensions":["mxs"]},"application/vnd.trueapp":{"source":"iana","extensions":["tra"]},"application/vnd.truedoc":{"source":"iana"},"application/vnd.ubisoft.webplayer":{"source":"iana"},"application/vnd.ufdl":{"source":"iana","extensions":["ufd","ufdl"]},"application/vnd.uiq.theme":{"source":"iana","extensions":["utz"]},"application/vnd.umajin":{"source":"iana","extensions":["umj"]},"application/vnd.unity":{"source":"iana","extensions":["unityweb"]},"application/vnd.uoml+xml":{"source":"iana","compressible":true,"extensions":["uoml"]},"application/vnd.uplanet.alert":{"source":"iana"},"application/vnd.uplanet.alert-wbxml":{"source":"iana"},"application/vnd.uplanet.bearer-choice":{"source":"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{"source":"iana"},"application/vnd.uplanet.cacheop":{"source":"iana"},"application/vnd.uplanet.cacheop-wbxml":{"source":"iana"},"application/vnd.uplanet.channel":{"source":"iana"},"application/vnd.uplanet.channel-wbxml":{"source":"iana"},"application/vnd.uplanet.list":{"source":"iana"},"application/vnd.uplanet.list-wbxml":{"source":"iana"},"application/vnd.uplanet.listcmd":{"source":"iana"},"application/vnd.uplanet.listcmd-wbxml":{"source":"iana"},"application/vnd.uplanet.signal":{"source":"iana"},"application/vnd.uri-map":{"source":"iana"},"application/vnd.valve.source.material":{"source":"iana"},"application/vnd.vcx":{"source":"iana","extensions":["vcx"]},"application/vnd.vd-study":{"source":"iana"},"application/vnd.vectorworks":{"source":"iana"},"application/vnd.vel+json":{"source":"iana","compressible":true},"application/vnd.verimatrix.vcas":{"source":"iana"},"application/vnd.veryant.thin":{"source":"iana"},"application/vnd.ves.encrypted":{"source":"iana"},"application/vnd.vidsoft.vidconference":{"source":"iana"},"application/vnd.visio":{"source":"iana","extensions":["vsd","vst","vss","vsw"]},"application/vnd.visionary":{"source":"iana","extensions":["vis"]},"application/vnd.vividence.scriptfile":{"source":"iana"},"application/vnd.vsf":{"source":"iana","extensions":["vsf"]},"application/vnd.wap.sic":{"source":"iana"},"application/vnd.wap.slc":{"source":"iana"},"application/vnd.wap.wbxml":{"source":"iana","charset":"UTF-8","extensions":["wbxml"]},"application/vnd.wap.wmlc":{"source":"iana","extensions":["wmlc"]},"application/vnd.wap.wmlscriptc":{"source":"iana","extensions":["wmlsc"]},"application/vnd.webturbo":{"source":"iana","extensions":["wtb"]},"application/vnd.wfa.dpp":{"source":"iana"},"application/vnd.wfa.p2p":{"source":"iana"},"application/vnd.wfa.wsc":{"source":"iana"},"application/vnd.windows.devicepairing":{"source":"iana"},"application/vnd.wmc":{"source":"iana"},"application/vnd.wmf.bootstrap":{"source":"iana"},"application/vnd.wolfram.mathematica":{"source":"iana"},"application/vnd.wolfram.mathematica.package":{"source":"iana"},"application/vnd.wolfram.player":{"source":"iana","extensions":["nbp"]},"application/vnd.wordperfect":{"source":"iana","extensions":["wpd"]},"application/vnd.wqd":{"source":"iana","extensions":["wqd"]},"application/vnd.wrq-hp3000-labelled":{"source":"iana"},"application/vnd.wt.stf":{"source":"iana","extensions":["stf"]},"application/vnd.wv.csp+wbxml":{"source":"iana"},"application/vnd.wv.csp+xml":{"source":"iana","compressible":true},"application/vnd.wv.ssp+xml":{"source":"iana","compressible":true},"application/vnd.xacml+json":{"source":"iana","compressible":true},"application/vnd.xara":{"source":"iana","extensions":["xar"]},"application/vnd.xfdl":{"source":"iana","extensions":["xfdl"]},"application/vnd.xfdl.webform":{"source":"iana"},"application/vnd.xmi+xml":{"source":"iana","compressible":true},"application/vnd.xmpie.cpkg":{"source":"iana"},"application/vnd.xmpie.dpkg":{"source":"iana"},"application/vnd.xmpie.plan":{"source":"iana"},"application/vnd.xmpie.ppkg":{"source":"iana"},"application/vnd.xmpie.xlim":{"source":"iana"},"application/vnd.yamaha.hv-dic":{"source":"iana","extensions":["hvd"]},"application/vnd.yamaha.hv-script":{"source":"iana","extensions":["hvs"]},"application/vnd.yamaha.hv-voice":{"source":"iana","extensions":["hvp"]},"application/vnd.yamaha.openscoreformat":{"source":"iana","extensions":["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{"source":"iana","compressible":true,"extensions":["osfpvg"]},"application/vnd.yamaha.remote-setup":{"source":"iana"},"application/vnd.yamaha.smaf-audio":{"source":"iana","extensions":["saf"]},"application/vnd.yamaha.smaf-phrase":{"source":"iana","extensions":["spf"]},"application/vnd.yamaha.through-ngn":{"source":"iana"},"application/vnd.yamaha.tunnel-udpencap":{"source":"iana"},"application/vnd.yaoweme":{"source":"iana"},"application/vnd.yellowriver-custom-menu":{"source":"iana","extensions":["cmp"]},"application/vnd.youtube.yt":{"source":"iana"},"application/vnd.zul":{"source":"iana","extensions":["zir","zirz"]},"application/vnd.zzazz.deck+xml":{"source":"iana","compressible":true,"extensions":["zaz"]},"application/voicexml+xml":{"source":"iana","compressible":true,"extensions":["vxml"]},"application/voucher-cms+json":{"source":"iana","compressible":true},"application/vq-rtcpxr":{"source":"iana"},"application/wasm":{"compressible":true,"extensions":["wasm"]},"application/watcherinfo+xml":{"source":"iana","compressible":true},"application/webpush-options+json":{"source":"iana","compressible":true},"application/whoispp-query":{"source":"iana"},"application/whoispp-response":{"source":"iana"},"application/widget":{"source":"iana","extensions":["wgt"]},"application/winhlp":{"source":"apache","extensions":["hlp"]},"application/wita":{"source":"iana"},"application/wordperfect5.1":{"source":"iana"},"application/wsdl+xml":{"source":"iana","compressible":true,"extensions":["wsdl"]},"application/wspolicy+xml":{"source":"iana","compressible":true,"extensions":["wspolicy"]},"application/x-7z-compressed":{"source":"apache","compressible":false,"extensions":["7z"]},"application/x-abiword":{"source":"apache","extensions":["abw"]},"application/x-ace-compressed":{"source":"apache","extensions":["ace"]},"application/x-amf":{"source":"apache"},"application/x-apple-diskimage":{"source":"apache","extensions":["dmg"]},"application/x-arj":{"compressible":false,"extensions":["arj"]},"application/x-authorware-bin":{"source":"apache","extensions":["aab","x32","u32","vox"]},"application/x-authorware-map":{"source":"apache","extensions":["aam"]},"application/x-authorware-seg":{"source":"apache","extensions":["aas"]},"application/x-bcpio":{"source":"apache","extensions":["bcpio"]},"application/x-bdoc":{"compressible":false,"extensions":["bdoc"]},"application/x-bittorrent":{"source":"apache","extensions":["torrent"]},"application/x-blorb":{"source":"apache","extensions":["blb","blorb"]},"application/x-bzip":{"source":"apache","compressible":false,"extensions":["bz"]},"application/x-bzip2":{"source":"apache","compressible":false,"extensions":["bz2","boz"]},"application/x-cbr":{"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{"source":"apache","extensions":["vcd"]},"application/x-cfs-compressed":{"source":"apache","extensions":["cfs"]},"application/x-chat":{"source":"apache","extensions":["chat"]},"application/x-chess-pgn":{"source":"apache","extensions":["pgn"]},"application/x-chrome-extension":{"extensions":["crx"]},"application/x-cocoa":{"source":"nginx","extensions":["cco"]},"application/x-compress":{"source":"apache"},"application/x-conference":{"source":"apache","extensions":["nsc"]},"application/x-cpio":{"source":"apache","extensions":["cpio"]},"application/x-csh":{"source":"apache","extensions":["csh"]},"application/x-deb":{"compressible":false},"application/x-debian-package":{"source":"apache","extensions":["deb","udeb"]},"application/x-dgc-compressed":{"source":"apache","extensions":["dgc"]},"application/x-director":{"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{"source":"apache","extensions":["wad"]},"application/x-dtbncx+xml":{"source":"apache","compressible":true,"extensions":["ncx"]},"application/x-dtbook+xml":{"source":"apache","compressible":true,"extensions":["dtb"]},"application/x-dtbresource+xml":{"source":"apache","compressible":true,"extensions":["res"]},"application/x-dvi":{"source":"apache","compressible":false,"extensions":["dvi"]},"application/x-envoy":{"source":"apache","extensions":["evy"]},"application/x-eva":{"source":"apache","extensions":["eva"]},"application/x-font-bdf":{"source":"apache","extensions":["bdf"]},"application/x-font-dos":{"source":"apache"},"application/x-font-framemaker":{"source":"apache"},"application/x-font-ghostscript":{"source":"apache","extensions":["gsf"]},"application/x-font-libgrx":{"source":"apache"},"application/x-font-linux-psf":{"source":"apache","extensions":["psf"]},"application/x-font-pcf":{"source":"apache","extensions":["pcf"]},"application/x-font-snf":{"source":"apache","extensions":["snf"]},"application/x-font-speedo":{"source":"apache"},"application/x-font-sunos-news":{"source":"apache"},"application/x-font-type1":{"source":"apache","extensions":["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{"source":"apache"},"application/x-freearc":{"source":"apache","extensions":["arc"]},"application/x-futuresplash":{"source":"apache","extensions":["spl"]},"application/x-gca-compressed":{"source":"apache","extensions":["gca"]},"application/x-glulx":{"source":"apache","extensions":["ulx"]},"application/x-gnumeric":{"source":"apache","extensions":["gnumeric"]},"application/x-gramps-xml":{"source":"apache","extensions":["gramps"]},"application/x-gtar":{"source":"apache","extensions":["gtar"]},"application/x-gzip":{"source":"apache"},"application/x-hdf":{"source":"apache","extensions":["hdf"]},"application/x-httpd-php":{"compressible":true,"extensions":["php"]},"application/x-install-instructions":{"source":"apache","extensions":["install"]},"application/x-iso9660-image":{"source":"apache","extensions":["iso"]},"application/x-java-archive-diff":{"source":"nginx","extensions":["jardiff"]},"application/x-java-jnlp-file":{"source":"apache","compressible":false,"extensions":["jnlp"]},"application/x-javascript":{"compressible":true},"application/x-keepass2":{"extensions":["kdbx"]},"application/x-latex":{"source":"apache","compressible":false,"extensions":["latex"]},"application/x-lua-bytecode":{"extensions":["luac"]},"application/x-lzh-compressed":{"source":"apache","extensions":["lzh","lha"]},"application/x-makeself":{"source":"nginx","extensions":["run"]},"application/x-mie":{"source":"apache","extensions":["mie"]},"application/x-mobipocket-ebook":{"source":"apache","extensions":["prc","mobi"]},"application/x-mpegurl":{"compressible":false},"application/x-ms-application":{"source":"apache","extensions":["application"]},"application/x-ms-shortcut":{"source":"apache","extensions":["lnk"]},"application/x-ms-wmd":{"source":"apache","extensions":["wmd"]},"application/x-ms-wmz":{"source":"apache","extensions":["wmz"]},"application/x-ms-xbap":{"source":"apache","extensions":["xbap"]},"application/x-msaccess":{"source":"apache","extensions":["mdb"]},"application/x-msbinder":{"source":"apache","extensions":["obd"]},"application/x-mscardfile":{"source":"apache","extensions":["crd"]},"application/x-msclip":{"source":"apache","extensions":["clp"]},"application/x-msdos-program":{"extensions":["exe"]},"application/x-msdownload":{"source":"apache","extensions":["exe","dll","com","bat","msi"]},"application/x-msmediaview":{"source":"apache","extensions":["mvb","m13","m14"]},"application/x-msmetafile":{"source":"apache","extensions":["wmf","wmz","emf","emz"]},"application/x-msmoney":{"source":"apache","extensions":["mny"]},"application/x-mspublisher":{"source":"apache","extensions":["pub"]},"application/x-msschedule":{"source":"apache","extensions":["scd"]},"application/x-msterminal":{"source":"apache","extensions":["trm"]},"application/x-mswrite":{"source":"apache","extensions":["wri"]},"application/x-netcdf":{"source":"apache","extensions":["nc","cdf"]},"application/x-ns-proxy-autoconfig":{"compressible":true,"extensions":["pac"]},"application/x-nzb":{"source":"apache","extensions":["nzb"]},"application/x-perl":{"source":"nginx","extensions":["pl","pm"]},"application/x-pilot":{"source":"nginx","extensions":["prc","pdb"]},"application/x-pkcs12":{"source":"apache","compressible":false,"extensions":["p12","pfx"]},"application/x-pkcs7-certificates":{"source":"apache","extensions":["p7b","spc"]},"application/x-pkcs7-certreqresp":{"source":"apache","extensions":["p7r"]},"application/x-pki-message":{"source":"iana"},"application/x-rar-compressed":{"source":"apache","compressible":false,"extensions":["rar"]},"application/x-redhat-package-manager":{"source":"nginx","extensions":["rpm"]},"application/x-research-info-systems":{"source":"apache","extensions":["ris"]},"application/x-sea":{"source":"nginx","extensions":["sea"]},"application/x-sh":{"source":"apache","compressible":true,"extensions":["sh"]},"application/x-shar":{"source":"apache","extensions":["shar"]},"application/x-shockwave-flash":{"source":"apache","compressible":false,"extensions":["swf"]},"application/x-silverlight-app":{"source":"apache","extensions":["xap"]},"application/x-sql":{"source":"apache","extensions":["sql"]},"application/x-stuffit":{"source":"apache","compressible":false,"extensions":["sit"]},"application/x-stuffitx":{"source":"apache","extensions":["sitx"]},"application/x-subrip":{"source":"apache","extensions":["srt"]},"application/x-sv4cpio":{"source":"apache","extensions":["sv4cpio"]},"application/x-sv4crc":{"source":"apache","extensions":["sv4crc"]},"application/x-t3vm-image":{"source":"apache","extensions":["t3"]},"application/x-tads":{"source":"apache","extensions":["gam"]},"application/x-tar":{"source":"apache","compressible":true,"extensions":["tar"]},"application/x-tcl":{"source":"apache","extensions":["tcl","tk"]},"application/x-tex":{"source":"apache","extensions":["tex"]},"application/x-tex-tfm":{"source":"apache","extensions":["tfm"]},"application/x-texinfo":{"source":"apache","extensions":["texinfo","texi"]},"application/x-tgif":{"source":"apache","extensions":["obj"]},"application/x-ustar":{"source":"apache","extensions":["ustar"]},"application/x-virtualbox-hdd":{"compressible":true,"extensions":["hdd"]},"application/x-virtualbox-ova":{"compressible":true,"extensions":["ova"]},"application/x-virtualbox-ovf":{"compressible":true,"extensions":["ovf"]},"application/x-virtualbox-vbox":{"compressible":true,"extensions":["vbox"]},"application/x-virtualbox-vbox-extpack":{"compressible":false,"extensions":["vbox-extpack"]},"application/x-virtualbox-vdi":{"compressible":true,"extensions":["vdi"]},"application/x-virtualbox-vhd":{"compressible":true,"extensions":["vhd"]},"application/x-virtualbox-vmdk":{"compressible":true,"extensions":["vmdk"]},"application/x-wais-source":{"source":"apache","extensions":["src"]},"application/x-web-app-manifest+json":{"compressible":true,"extensions":["webapp"]},"application/x-www-form-urlencoded":{"source":"iana","compressible":true},"application/x-x509-ca-cert":{"source":"iana","extensions":["der","crt","pem"]},"application/x-x509-ca-ra-cert":{"source":"iana"},"application/x-x509-next-ca-cert":{"source":"iana"},"application/x-xfig":{"source":"apache","extensions":["fig"]},"application/x-xliff+xml":{"source":"apache","compressible":true,"extensions":["xlf"]},"application/x-xpinstall":{"source":"apache","compressible":false,"extensions":["xpi"]},"application/x-xz":{"source":"apache","extensions":["xz"]},"application/x-zmachine":{"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{"source":"iana"},"application/xacml+xml":{"source":"iana","compressible":true},"application/xaml+xml":{"source":"apache","compressible":true,"extensions":["xaml"]},"application/xcap-att+xml":{"source":"iana","compressible":true,"extensions":["xav"]},"application/xcap-caps+xml":{"source":"iana","compressible":true,"extensions":["xca"]},"application/xcap-diff+xml":{"source":"iana","compressible":true,"extensions":["xdf"]},"application/xcap-el+xml":{"source":"iana","compressible":true,"extensions":["xel"]},"application/xcap-error+xml":{"source":"iana","compressible":true},"application/xcap-ns+xml":{"source":"iana","compressible":true,"extensions":["xns"]},"application/xcon-conference-info+xml":{"source":"iana","compressible":true},"application/xcon-conference-info-diff+xml":{"source":"iana","compressible":true},"application/xenc+xml":{"source":"iana","compressible":true,"extensions":["xenc"]},"application/xhtml+xml":{"source":"iana","compressible":true,"extensions":["xhtml","xht"]},"application/xhtml-voice+xml":{"source":"apache","compressible":true},"application/xliff+xml":{"source":"iana","compressible":true,"extensions":["xlf"]},"application/xml":{"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},"application/xml-dtd":{"source":"iana","compressible":true,"extensions":["dtd"]},"application/xml-external-parsed-entity":{"source":"iana"},"application/xml-patch+xml":{"source":"iana","compressible":true},"application/xmpp+xml":{"source":"iana","compressible":true},"application/xop+xml":{"source":"iana","compressible":true,"extensions":["xop"]},"application/xproc+xml":{"source":"apache","compressible":true,"extensions":["xpl"]},"application/xslt+xml":{"source":"iana","compressible":true,"extensions":["xsl","xslt"]},"application/xspf+xml":{"source":"apache","compressible":true,"extensions":["xspf"]},"application/xv+xml":{"source":"iana","compressible":true,"extensions":["mxml","xhvml","xvml","xvm"]},"application/yang":{"source":"iana","extensions":["yang"]},"application/yang-data+json":{"source":"iana","compressible":true},"application/yang-data+xml":{"source":"iana","compressible":true},"application/yang-patch+json":{"source":"iana","compressible":true},"application/yang-patch+xml":{"source":"iana","compressible":true},"application/yin+xml":{"source":"iana","compressible":true,"extensions":["yin"]},"application/zip":{"source":"iana","compressible":false,"extensions":["zip"]},"application/zlib":{"source":"iana"},"application/zstd":{"source":"iana"},"audio/1d-interleaved-parityfec":{"source":"iana"},"audio/32kadpcm":{"source":"iana"},"audio/3gpp":{"source":"iana","compressible":false,"extensions":["3gpp"]},"audio/3gpp2":{"source":"iana"},"audio/aac":{"source":"iana"},"audio/ac3":{"source":"iana"},"audio/adpcm":{"source":"apache","extensions":["adp"]},"audio/amr":{"source":"iana","extensions":["amr"]},"audio/amr-wb":{"source":"iana"},"audio/amr-wb+":{"source":"iana"},"audio/aptx":{"source":"iana"},"audio/asc":{"source":"iana"},"audio/atrac-advanced-lossless":{"source":"iana"},"audio/atrac-x":{"source":"iana"},"audio/atrac3":{"source":"iana"},"audio/basic":{"source":"iana","compressible":false,"extensions":["au","snd"]},"audio/bv16":{"source":"iana"},"audio/bv32":{"source":"iana"},"audio/clearmode":{"source":"iana"},"audio/cn":{"source":"iana"},"audio/dat12":{"source":"iana"},"audio/dls":{"source":"iana"},"audio/dsr-es201108":{"source":"iana"},"audio/dsr-es202050":{"source":"iana"},"audio/dsr-es202211":{"source":"iana"},"audio/dsr-es202212":{"source":"iana"},"audio/dv":{"source":"iana"},"audio/dvi4":{"source":"iana"},"audio/eac3":{"source":"iana"},"audio/encaprtp":{"source":"iana"},"audio/evrc":{"source":"iana"},"audio/evrc-qcp":{"source":"iana"},"audio/evrc0":{"source":"iana"},"audio/evrc1":{"source":"iana"},"audio/evrcb":{"source":"iana"},"audio/evrcb0":{"source":"iana"},"audio/evrcb1":{"source":"iana"},"audio/evrcnw":{"source":"iana"},"audio/evrcnw0":{"source":"iana"},"audio/evrcnw1":{"source":"iana"},"audio/evrcwb":{"source":"iana"},"audio/evrcwb0":{"source":"iana"},"audio/evrcwb1":{"source":"iana"},"audio/evs":{"source":"iana"},"audio/flexfec":{"source":"iana"},"audio/fwdred":{"source":"iana"},"audio/g711-0":{"source":"iana"},"audio/g719":{"source":"iana"},"audio/g722":{"source":"iana"},"audio/g7221":{"source":"iana"},"audio/g723":{"source":"iana"},"audio/g726-16":{"source":"iana"},"audio/g726-24":{"source":"iana"},"audio/g726-32":{"source":"iana"},"audio/g726-40":{"source":"iana"},"audio/g728":{"source":"iana"},"audio/g729":{"source":"iana"},"audio/g7291":{"source":"iana"},"audio/g729d":{"source":"iana"},"audio/g729e":{"source":"iana"},"audio/gsm":{"source":"iana"},"audio/gsm-efr":{"source":"iana"},"audio/gsm-hr-08":{"source":"iana"},"audio/ilbc":{"source":"iana"},"audio/ip-mr_v2.5":{"source":"iana"},"audio/isac":{"source":"apache"},"audio/l16":{"source":"iana"},"audio/l20":{"source":"iana"},"audio/l24":{"source":"iana","compressible":false},"audio/l8":{"source":"iana"},"audio/lpc":{"source":"iana"},"audio/melp":{"source":"iana"},"audio/melp1200":{"source":"iana"},"audio/melp2400":{"source":"iana"},"audio/melp600":{"source":"iana"},"audio/mhas":{"source":"iana"},"audio/midi":{"source":"apache","extensions":["mid","midi","kar","rmi"]},"audio/mobile-xmf":{"source":"iana","extensions":["mxmf"]},"audio/mp3":{"compressible":false,"extensions":["mp3"]},"audio/mp4":{"source":"iana","compressible":false,"extensions":["m4a","mp4a"]},"audio/mp4a-latm":{"source":"iana"},"audio/mpa":{"source":"iana"},"audio/mpa-robust":{"source":"iana"},"audio/mpeg":{"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{"source":"iana"},"audio/musepack":{"source":"apache"},"audio/ogg":{"source":"iana","compressible":false,"extensions":["oga","ogg","spx","opus"]},"audio/opus":{"source":"iana"},"audio/parityfec":{"source":"iana"},"audio/pcma":{"source":"iana"},"audio/pcma-wb":{"source":"iana"},"audio/pcmu":{"source":"iana"},"audio/pcmu-wb":{"source":"iana"},"audio/prs.sid":{"source":"iana"},"audio/qcelp":{"source":"iana"},"audio/raptorfec":{"source":"iana"},"audio/red":{"source":"iana"},"audio/rtp-enc-aescm128":{"source":"iana"},"audio/rtp-midi":{"source":"iana"},"audio/rtploopback":{"source":"iana"},"audio/rtx":{"source":"iana"},"audio/s3m":{"source":"apache","extensions":["s3m"]},"audio/scip":{"source":"iana"},"audio/silk":{"source":"apache","extensions":["sil"]},"audio/smv":{"source":"iana"},"audio/smv-qcp":{"source":"iana"},"audio/smv0":{"source":"iana"},"audio/sofa":{"source":"iana"},"audio/sp-midi":{"source":"iana"},"audio/speex":{"source":"iana"},"audio/t140c":{"source":"iana"},"audio/t38":{"source":"iana"},"audio/telephone-event":{"source":"iana"},"audio/tetra_acelp":{"source":"iana"},"audio/tetra_acelp_bb":{"source":"iana"},"audio/tone":{"source":"iana"},"audio/tsvcis":{"source":"iana"},"audio/uemclip":{"source":"iana"},"audio/ulpfec":{"source":"iana"},"audio/usac":{"source":"iana"},"audio/vdvi":{"source":"iana"},"audio/vmr-wb":{"source":"iana"},"audio/vnd.3gpp.iufp":{"source":"iana"},"audio/vnd.4sb":{"source":"iana"},"audio/vnd.audiokoz":{"source":"iana"},"audio/vnd.celp":{"source":"iana"},"audio/vnd.cisco.nse":{"source":"iana"},"audio/vnd.cmles.radio-events":{"source":"iana"},"audio/vnd.cns.anp1":{"source":"iana"},"audio/vnd.cns.inf1":{"source":"iana"},"audio/vnd.dece.audio":{"source":"iana","extensions":["uva","uvva"]},"audio/vnd.digital-winds":{"source":"iana","extensions":["eol"]},"audio/vnd.dlna.adts":{"source":"iana"},"audio/vnd.dolby.heaac.1":{"source":"iana"},"audio/vnd.dolby.heaac.2":{"source":"iana"},"audio/vnd.dolby.mlp":{"source":"iana"},"audio/vnd.dolby.mps":{"source":"iana"},"audio/vnd.dolby.pl2":{"source":"iana"},"audio/vnd.dolby.pl2x":{"source":"iana"},"audio/vnd.dolby.pl2z":{"source":"iana"},"audio/vnd.dolby.pulse.1":{"source":"iana"},"audio/vnd.dra":{"source":"iana","extensions":["dra"]},"audio/vnd.dts":{"source":"iana","extensions":["dts"]},"audio/vnd.dts.hd":{"source":"iana","extensions":["dtshd"]},"audio/vnd.dts.uhd":{"source":"iana"},"audio/vnd.dvb.file":{"source":"iana"},"audio/vnd.everad.plj":{"source":"iana"},"audio/vnd.hns.audio":{"source":"iana"},"audio/vnd.lucent.voice":{"source":"iana","extensions":["lvp"]},"audio/vnd.ms-playready.media.pya":{"source":"iana","extensions":["pya"]},"audio/vnd.nokia.mobile-xmf":{"source":"iana"},"audio/vnd.nortel.vbk":{"source":"iana"},"audio/vnd.nuera.ecelp4800":{"source":"iana","extensions":["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{"source":"iana","extensions":["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{"source":"iana","extensions":["ecelp9600"]},"audio/vnd.octel.sbc":{"source":"iana"},"audio/vnd.presonus.multitrack":{"source":"iana"},"audio/vnd.qcelp":{"source":"iana"},"audio/vnd.rhetorex.32kadpcm":{"source":"iana"},"audio/vnd.rip":{"source":"iana","extensions":["rip"]},"audio/vnd.rn-realaudio":{"compressible":false},"audio/vnd.sealedmedia.softseal.mpeg":{"source":"iana"},"audio/vnd.vmx.cvsd":{"source":"iana"},"audio/vnd.wave":{"compressible":false},"audio/vorbis":{"source":"iana","compressible":false},"audio/vorbis-config":{"source":"iana"},"audio/wav":{"compressible":false,"extensions":["wav"]},"audio/wave":{"compressible":false,"extensions":["wav"]},"audio/webm":{"source":"apache","compressible":false,"extensions":["weba"]},"audio/x-aac":{"source":"apache","compressible":false,"extensions":["aac"]},"audio/x-aiff":{"source":"apache","extensions":["aif","aiff","aifc"]},"audio/x-caf":{"source":"apache","compressible":false,"extensions":["caf"]},"audio/x-flac":{"source":"apache","extensions":["flac"]},"audio/x-m4a":{"source":"nginx","extensions":["m4a"]},"audio/x-matroska":{"source":"apache","extensions":["mka"]},"audio/x-mpegurl":{"source":"apache","extensions":["m3u"]},"audio/x-ms-wax":{"source":"apache","extensions":["wax"]},"audio/x-ms-wma":{"source":"apache","extensions":["wma"]},"audio/x-pn-realaudio":{"source":"apache","extensions":["ram","ra"]},"audio/x-pn-realaudio-plugin":{"source":"apache","extensions":["rmp"]},"audio/x-realaudio":{"source":"nginx","extensions":["ra"]},"audio/x-tta":{"source":"apache"},"audio/x-wav":{"source":"apache","extensions":["wav"]},"audio/xm":{"source":"apache","extensions":["xm"]},"chemical/x-cdx":{"source":"apache","extensions":["cdx"]},"chemical/x-cif":{"source":"apache","extensions":["cif"]},"chemical/x-cmdf":{"source":"apache","extensions":["cmdf"]},"chemical/x-cml":{"source":"apache","extensions":["cml"]},"chemical/x-csml":{"source":"apache","extensions":["csml"]},"chemical/x-pdb":{"source":"apache"},"chemical/x-xyz":{"source":"apache","extensions":["xyz"]},"font/collection":{"source":"iana","extensions":["ttc"]},"font/otf":{"source":"iana","compressible":true,"extensions":["otf"]},"font/sfnt":{"source":"iana"},"font/ttf":{"source":"iana","compressible":true,"extensions":["ttf"]},"font/woff":{"source":"iana","extensions":["woff"]},"font/woff2":{"source":"iana","extensions":["woff2"]},"image/aces":{"source":"iana","extensions":["exr"]},"image/apng":{"compressible":false,"extensions":["apng"]},"image/avci":{"source":"iana"},"image/avcs":{"source":"iana"},"image/avif":{"source":"iana","compressible":false,"extensions":["avif"]},"image/bmp":{"source":"iana","compressible":true,"extensions":["bmp"]},"image/cgm":{"source":"iana","extensions":["cgm"]},"image/dicom-rle":{"source":"iana","extensions":["drle"]},"image/emf":{"source":"iana","extensions":["emf"]},"image/fits":{"source":"iana","extensions":["fits"]},"image/g3fax":{"source":"iana","extensions":["g3"]},"image/gif":{"source":"iana","compressible":false,"extensions":["gif"]},"image/heic":{"source":"iana","extensions":["heic"]},"image/heic-sequence":{"source":"iana","extensions":["heics"]},"image/heif":{"source":"iana","extensions":["heif"]},"image/heif-sequence":{"source":"iana","extensions":["heifs"]},"image/hej2k":{"source":"iana","extensions":["hej2"]},"image/hsj2":{"source":"iana","extensions":["hsj2"]},"image/ief":{"source":"iana","extensions":["ief"]},"image/jls":{"source":"iana","extensions":["jls"]},"image/jp2":{"source":"iana","compressible":false,"extensions":["jp2","jpg2"]},"image/jpeg":{"source":"iana","compressible":false,"extensions":["jpeg","jpg","jpe"]},"image/jph":{"source":"iana","extensions":["jph"]},"image/jphc":{"source":"iana","extensions":["jhc"]},"image/jpm":{"source":"iana","compressible":false,"extensions":["jpm"]},"image/jpx":{"source":"iana","compressible":false,"extensions":["jpx","jpf"]},"image/jxr":{"source":"iana","extensions":["jxr"]},"image/jxra":{"source":"iana","extensions":["jxra"]},"image/jxrs":{"source":"iana","extensions":["jxrs"]},"image/jxs":{"source":"iana","extensions":["jxs"]},"image/jxsc":{"source":"iana","extensions":["jxsc"]},"image/jxsi":{"source":"iana","extensions":["jxsi"]},"image/jxss":{"source":"iana","extensions":["jxss"]},"image/ktx":{"source":"iana","extensions":["ktx"]},"image/ktx2":{"source":"iana","extensions":["ktx2"]},"image/naplps":{"source":"iana"},"image/pjpeg":{"compressible":false},"image/png":{"source":"iana","compressible":false,"extensions":["png"]},"image/prs.btif":{"source":"iana","extensions":["btif"]},"image/prs.pti":{"source":"iana","extensions":["pti"]},"image/pwg-raster":{"source":"iana"},"image/sgi":{"source":"apache","extensions":["sgi"]},"image/svg+xml":{"source":"iana","compressible":true,"extensions":["svg","svgz"]},"image/t38":{"source":"iana","extensions":["t38"]},"image/tiff":{"source":"iana","compressible":false,"extensions":["tif","tiff"]},"image/tiff-fx":{"source":"iana","extensions":["tfx"]},"image/vnd.adobe.photoshop":{"source":"iana","compressible":true,"extensions":["psd"]},"image/vnd.airzip.accelerator.azv":{"source":"iana","extensions":["azv"]},"image/vnd.cns.inf2":{"source":"iana"},"image/vnd.dece.graphic":{"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{"source":"iana","extensions":["djvu","djv"]},"image/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"image/vnd.dwg":{"source":"iana","extensions":["dwg"]},"image/vnd.dxf":{"source":"iana","extensions":["dxf"]},"image/vnd.fastbidsheet":{"source":"iana","extensions":["fbs"]},"image/vnd.fpx":{"source":"iana","extensions":["fpx"]},"image/vnd.fst":{"source":"iana","extensions":["fst"]},"image/vnd.fujixerox.edmics-mmr":{"source":"iana","extensions":["mmr"]},"image/vnd.fujixerox.edmics-rlc":{"source":"iana","extensions":["rlc"]},"image/vnd.globalgraphics.pgb":{"source":"iana"},"image/vnd.microsoft.icon":{"source":"iana","extensions":["ico"]},"image/vnd.mix":{"source":"iana"},"image/vnd.mozilla.apng":{"source":"iana"},"image/vnd.ms-dds":{"extensions":["dds"]},"image/vnd.ms-modi":{"source":"iana","extensions":["mdi"]},"image/vnd.ms-photo":{"source":"apache","extensions":["wdp"]},"image/vnd.net-fpx":{"source":"iana","extensions":["npx"]},"image/vnd.pco.b16":{"source":"iana","extensions":["b16"]},"image/vnd.radiance":{"source":"iana"},"image/vnd.sealed.png":{"source":"iana"},"image/vnd.sealedmedia.softseal.gif":{"source":"iana"},"image/vnd.sealedmedia.softseal.jpg":{"source":"iana"},"image/vnd.svf":{"source":"iana"},"image/vnd.tencent.tap":{"source":"iana","extensions":["tap"]},"image/vnd.valve.source.texture":{"source":"iana","extensions":["vtf"]},"image/vnd.wap.wbmp":{"source":"iana","extensions":["wbmp"]},"image/vnd.xiff":{"source":"iana","extensions":["xif"]},"image/vnd.zbrush.pcx":{"source":"iana","extensions":["pcx"]},"image/webp":{"source":"apache","extensions":["webp"]},"image/wmf":{"source":"iana","extensions":["wmf"]},"image/x-3ds":{"source":"apache","extensions":["3ds"]},"image/x-cmu-raster":{"source":"apache","extensions":["ras"]},"image/x-cmx":{"source":"apache","extensions":["cmx"]},"image/x-freehand":{"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{"source":"apache","compressible":true,"extensions":["ico"]},"image/x-jng":{"source":"nginx","extensions":["jng"]},"image/x-mrsid-image":{"source":"apache","extensions":["sid"]},"image/x-ms-bmp":{"source":"nginx","compressible":true,"extensions":["bmp"]},"image/x-pcx":{"source":"apache","extensions":["pcx"]},"image/x-pict":{"source":"apache","extensions":["pic","pct"]},"image/x-portable-anymap":{"source":"apache","extensions":["pnm"]},"image/x-portable-bitmap":{"source":"apache","extensions":["pbm"]},"image/x-portable-graymap":{"source":"apache","extensions":["pgm"]},"image/x-portable-pixmap":{"source":"apache","extensions":["ppm"]},"image/x-rgb":{"source":"apache","extensions":["rgb"]},"image/x-tga":{"source":"apache","extensions":["tga"]},"image/x-xbitmap":{"source":"apache","extensions":["xbm"]},"image/x-xcf":{"compressible":false},"image/x-xpixmap":{"source":"apache","extensions":["xpm"]},"image/x-xwindowdump":{"source":"apache","extensions":["xwd"]},"message/cpim":{"source":"iana"},"message/delivery-status":{"source":"iana"},"message/disposition-notification":{"source":"iana","extensions":["disposition-notification"]},"message/external-body":{"source":"iana"},"message/feedback-report":{"source":"iana"},"message/global":{"source":"iana","extensions":["u8msg"]},"message/global-delivery-status":{"source":"iana","extensions":["u8dsn"]},"message/global-disposition-notification":{"source":"iana","extensions":["u8mdn"]},"message/global-headers":{"source":"iana","extensions":["u8hdr"]},"message/http":{"source":"iana","compressible":false},"message/imdn+xml":{"source":"iana","compressible":true},"message/news":{"source":"iana"},"message/partial":{"source":"iana","compressible":false},"message/rfc822":{"source":"iana","compressible":true,"extensions":["eml","mime"]},"message/s-http":{"source":"iana"},"message/sip":{"source":"iana"},"message/sipfrag":{"source":"iana"},"message/tracking-status":{"source":"iana"},"message/vnd.si.simp":{"source":"iana"},"message/vnd.wfa.wsc":{"source":"iana","extensions":["wsc"]},"model/3mf":{"source":"iana","extensions":["3mf"]},"model/e57":{"source":"iana"},"model/gltf+json":{"source":"iana","compressible":true,"extensions":["gltf"]},"model/gltf-binary":{"source":"iana","compressible":true,"extensions":["glb"]},"model/iges":{"source":"iana","compressible":false,"extensions":["igs","iges"]},"model/mesh":{"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},"model/mtl":{"source":"iana","extensions":["mtl"]},"model/obj":{"source":"iana","extensions":["obj"]},"model/stl":{"source":"iana","extensions":["stl"]},"model/vnd.collada+xml":{"source":"iana","compressible":true,"extensions":["dae"]},"model/vnd.dwf":{"source":"iana","extensions":["dwf"]},"model/vnd.flatland.3dml":{"source":"iana"},"model/vnd.gdl":{"source":"iana","extensions":["gdl"]},"model/vnd.gs-gdl":{"source":"apache"},"model/vnd.gs.gdl":{"source":"iana"},"model/vnd.gtw":{"source":"iana","extensions":["gtw"]},"model/vnd.moml+xml":{"source":"iana","compressible":true},"model/vnd.mts":{"source":"iana","extensions":["mts"]},"model/vnd.opengex":{"source":"iana","extensions":["ogex"]},"model/vnd.parasolid.transmit.binary":{"source":"iana","extensions":["x_b"]},"model/vnd.parasolid.transmit.text":{"source":"iana","extensions":["x_t"]},"model/vnd.rosette.annotated-data-model":{"source":"iana"},"model/vnd.sap.vds":{"source":"iana","extensions":["vds"]},"model/vnd.usdz+zip":{"source":"iana","compressible":false,"extensions":["usdz"]},"model/vnd.valve.source.compiled-map":{"source":"iana","extensions":["bsp"]},"model/vnd.vtu":{"source":"iana","extensions":["vtu"]},"model/vrml":{"source":"iana","compressible":false,"extensions":["wrl","vrml"]},"model/x3d+binary":{"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},"model/x3d+fastinfoset":{"source":"iana","extensions":["x3db"]},"model/x3d+vrml":{"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},"model/x3d+xml":{"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},"model/x3d-vrml":{"source":"iana","extensions":["x3dv"]},"multipart/alternative":{"source":"iana","compressible":false},"multipart/appledouble":{"source":"iana"},"multipart/byteranges":{"source":"iana"},"multipart/digest":{"source":"iana"},"multipart/encrypted":{"source":"iana","compressible":false},"multipart/form-data":{"source":"iana","compressible":false},"multipart/header-set":{"source":"iana"},"multipart/mixed":{"source":"iana"},"multipart/multilingual":{"source":"iana"},"multipart/parallel":{"source":"iana"},"multipart/related":{"source":"iana","compressible":false},"multipart/report":{"source":"iana"},"multipart/signed":{"source":"iana","compressible":false},"multipart/vnd.bint.med-plus":{"source":"iana"},"multipart/voice-message":{"source":"iana"},"multipart/x-mixed-replace":{"source":"iana"},"text/1d-interleaved-parityfec":{"source":"iana"},"text/cache-manifest":{"source":"iana","compressible":true,"extensions":["appcache","manifest"]},"text/calendar":{"source":"iana","extensions":["ics","ifb"]},"text/calender":{"compressible":true},"text/cmd":{"compressible":true},"text/coffeescript":{"extensions":["coffee","litcoffee"]},"text/cql":{"source":"iana"},"text/cql-expression":{"source":"iana"},"text/cql-identifier":{"source":"iana"},"text/css":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},"text/csv":{"source":"iana","compressible":true,"extensions":["csv"]},"text/csv-schema":{"source":"iana"},"text/directory":{"source":"iana"},"text/dns":{"source":"iana"},"text/ecmascript":{"source":"iana"},"text/encaprtp":{"source":"iana"},"text/enriched":{"source":"iana"},"text/fhirpath":{"source":"iana"},"text/flexfec":{"source":"iana"},"text/fwdred":{"source":"iana"},"text/gff3":{"source":"iana"},"text/grammar-ref-list":{"source":"iana"},"text/html":{"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},"text/jade":{"extensions":["jade"]},"text/javascript":{"source":"iana","compressible":true},"text/jcr-cnd":{"source":"iana"},"text/jsx":{"compressible":true,"extensions":["jsx"]},"text/less":{"compressible":true,"extensions":["less"]},"text/markdown":{"source":"iana","compressible":true,"extensions":["markdown","md"]},"text/mathml":{"source":"nginx","extensions":["mml"]},"text/mdx":{"compressible":true,"extensions":["mdx"]},"text/mizar":{"source":"iana"},"text/n3":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["n3"]},"text/parameters":{"source":"iana","charset":"UTF-8"},"text/parityfec":{"source":"iana"},"text/plain":{"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{"source":"iana","charset":"UTF-8"},"text/prs.fallenstein.rst":{"source":"iana"},"text/prs.lines.tag":{"source":"iana","extensions":["dsc"]},"text/prs.prop.logic":{"source":"iana"},"text/raptorfec":{"source":"iana"},"text/red":{"source":"iana"},"text/rfc822-headers":{"source":"iana"},"text/richtext":{"source":"iana","compressible":true,"extensions":["rtx"]},"text/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"text/rtp-enc-aescm128":{"source":"iana"},"text/rtploopback":{"source":"iana"},"text/rtx":{"source":"iana"},"text/sgml":{"source":"iana","extensions":["sgml","sgm"]},"text/shaclc":{"source":"iana"},"text/shex":{"extensions":["shex"]},"text/slim":{"extensions":["slim","slm"]},"text/spdx":{"source":"iana","extensions":["spdx"]},"text/strings":{"source":"iana"},"text/stylus":{"extensions":["stylus","styl"]},"text/t140":{"source":"iana"},"text/tab-separated-values":{"source":"iana","compressible":true,"extensions":["tsv"]},"text/troff":{"source":"iana","extensions":["t","tr","roff","man","me","ms"]},"text/turtle":{"source":"iana","charset":"UTF-8","extensions":["ttl"]},"text/ulpfec":{"source":"iana"},"text/uri-list":{"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},"text/vcard":{"source":"iana","compressible":true,"extensions":["vcard"]},"text/vnd.a":{"source":"iana"},"text/vnd.abc":{"source":"iana"},"text/vnd.ascii-art":{"source":"iana"},"text/vnd.curl":{"source":"iana","extensions":["curl"]},"text/vnd.curl.dcurl":{"source":"apache","extensions":["dcurl"]},"text/vnd.curl.mcurl":{"source":"apache","extensions":["mcurl"]},"text/vnd.curl.scurl":{"source":"apache","extensions":["scurl"]},"text/vnd.debian.copyright":{"source":"iana","charset":"UTF-8"},"text/vnd.dmclientscript":{"source":"iana"},"text/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"text/vnd.esmertec.theme-descriptor":{"source":"iana","charset":"UTF-8"},"text/vnd.ficlab.flt":{"source":"iana"},"text/vnd.fly":{"source":"iana","extensions":["fly"]},"text/vnd.fmi.flexstor":{"source":"iana","extensions":["flx"]},"text/vnd.gml":{"source":"iana"},"text/vnd.graphviz":{"source":"iana","extensions":["gv"]},"text/vnd.hans":{"source":"iana"},"text/vnd.hgl":{"source":"iana"},"text/vnd.in3d.3dml":{"source":"iana","extensions":["3dml"]},"text/vnd.in3d.spot":{"source":"iana","extensions":["spot"]},"text/vnd.iptc.newsml":{"source":"iana"},"text/vnd.iptc.nitf":{"source":"iana"},"text/vnd.latex-z":{"source":"iana"},"text/vnd.motorola.reflex":{"source":"iana"},"text/vnd.ms-mediapackage":{"source":"iana"},"text/vnd.net2phone.commcenter.command":{"source":"iana"},"text/vnd.radisys.msml-basic-layout":{"source":"iana"},"text/vnd.senx.warpscript":{"source":"iana"},"text/vnd.si.uricatalogue":{"source":"iana"},"text/vnd.sosi":{"source":"iana"},"text/vnd.sun.j2me.app-descriptor":{"source":"iana","charset":"UTF-8","extensions":["jad"]},"text/vnd.trolltech.linguist":{"source":"iana","charset":"UTF-8"},"text/vnd.wap.si":{"source":"iana"},"text/vnd.wap.sl":{"source":"iana"},"text/vnd.wap.wml":{"source":"iana","extensions":["wml"]},"text/vnd.wap.wmlscript":{"source":"iana","extensions":["wmls"]},"text/vtt":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["vtt"]},"text/x-asm":{"source":"apache","extensions":["s","asm"]},"text/x-c":{"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{"source":"nginx","extensions":["htc"]},"text/x-fortran":{"source":"apache","extensions":["f","for","f77","f90"]},"text/x-gwt-rpc":{"compressible":true},"text/x-handlebars-template":{"extensions":["hbs"]},"text/x-java-source":{"source":"apache","extensions":["java"]},"text/x-jquery-tmpl":{"compressible":true},"text/x-lua":{"extensions":["lua"]},"text/x-markdown":{"compressible":true,"extensions":["mkd"]},"text/x-nfo":{"source":"apache","extensions":["nfo"]},"text/x-opml":{"source":"apache","extensions":["opml"]},"text/x-org":{"compressible":true,"extensions":["org"]},"text/x-pascal":{"source":"apache","extensions":["p","pas"]},"text/x-processing":{"compressible":true,"extensions":["pde"]},"text/x-sass":{"extensions":["sass"]},"text/x-scss":{"extensions":["scss"]},"text/x-setext":{"source":"apache","extensions":["etx"]},"text/x-sfv":{"source":"apache","extensions":["sfv"]},"text/x-suse-ymp":{"compressible":true,"extensions":["ymp"]},"text/x-uuencode":{"source":"apache","extensions":["uu"]},"text/x-vcalendar":{"source":"apache","extensions":["vcs"]},"text/x-vcard":{"source":"apache","extensions":["vcf"]},"text/xml":{"source":"iana","compressible":true,"extensions":["xml"]},"text/xml-external-parsed-entity":{"source":"iana"},"text/yaml":{"extensions":["yaml","yml"]},"video/1d-interleaved-parityfec":{"source":"iana"},"video/3gpp":{"source":"iana","extensions":["3gp","3gpp"]},"video/3gpp-tt":{"source":"iana"},"video/3gpp2":{"source":"iana","extensions":["3g2"]},"video/av1":{"source":"iana"},"video/bmpeg":{"source":"iana"},"video/bt656":{"source":"iana"},"video/celb":{"source":"iana"},"video/dv":{"source":"iana"},"video/encaprtp":{"source":"iana"},"video/ffv1":{"source":"iana"},"video/flexfec":{"source":"iana"},"video/h261":{"source":"iana","extensions":["h261"]},"video/h263":{"source":"iana","extensions":["h263"]},"video/h263-1998":{"source":"iana"},"video/h263-2000":{"source":"iana"},"video/h264":{"source":"iana","extensions":["h264"]},"video/h264-rcdo":{"source":"iana"},"video/h264-svc":{"source":"iana"},"video/h265":{"source":"iana"},"video/iso.segment":{"source":"iana","extensions":["m4s"]},"video/jpeg":{"source":"iana","extensions":["jpgv"]},"video/jpeg2000":{"source":"iana"},"video/jpm":{"source":"apache","extensions":["jpm","jpgm"]},"video/mj2":{"source":"iana","extensions":["mj2","mjp2"]},"video/mp1s":{"source":"iana"},"video/mp2p":{"source":"iana"},"video/mp2t":{"source":"iana","extensions":["ts"]},"video/mp4":{"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},"video/mp4v-es":{"source":"iana"},"video/mpeg":{"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{"source":"iana"},"video/mpv":{"source":"iana"},"video/nv":{"source":"iana"},"video/ogg":{"source":"iana","compressible":false,"extensions":["ogv"]},"video/parityfec":{"source":"iana"},"video/pointer":{"source":"iana"},"video/quicktime":{"source":"iana","compressible":false,"extensions":["qt","mov"]},"video/raptorfec":{"source":"iana"},"video/raw":{"source":"iana"},"video/rtp-enc-aescm128":{"source":"iana"},"video/rtploopback":{"source":"iana"},"video/rtx":{"source":"iana"},"video/scip":{"source":"iana"},"video/smpte291":{"source":"iana"},"video/smpte292m":{"source":"iana"},"video/ulpfec":{"source":"iana"},"video/vc1":{"source":"iana"},"video/vc2":{"source":"iana"},"video/vnd.cctv":{"source":"iana"},"video/vnd.dece.hd":{"source":"iana","extensions":["uvh","uvvh"]},"video/vnd.dece.mobile":{"source":"iana","extensions":["uvm","uvvm"]},"video/vnd.dece.mp4":{"source":"iana"},"video/vnd.dece.pd":{"source":"iana","extensions":["uvp","uvvp"]},"video/vnd.dece.sd":{"source":"iana","extensions":["uvs","uvvs"]},"video/vnd.dece.video":{"source":"iana","extensions":["uvv","uvvv"]},"video/vnd.directv.mpeg":{"source":"iana"},"video/vnd.directv.mpeg-tts":{"source":"iana"},"video/vnd.dlna.mpeg-tts":{"source":"iana"},"video/vnd.dvb.file":{"source":"iana","extensions":["dvb"]},"video/vnd.fvt":{"source":"iana","extensions":["fvt"]},"video/vnd.hns.video":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.ttsavc":{"source":"iana"},"video/vnd.iptvforum.ttsmpeg2":{"source":"iana"},"video/vnd.motorola.video":{"source":"iana"},"video/vnd.motorola.videop":{"source":"iana"},"video/vnd.mpegurl":{"source":"iana","extensions":["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{"source":"iana","extensions":["pyv"]},"video/vnd.nokia.interleaved-multimedia":{"source":"iana"},"video/vnd.nokia.mp4vr":{"source":"iana"},"video/vnd.nokia.videovoip":{"source":"iana"},"video/vnd.objectvideo":{"source":"iana"},"video/vnd.radgamettools.bink":{"source":"iana"},"video/vnd.radgamettools.smacker":{"source":"iana"},"video/vnd.sealed.mpeg1":{"source":"iana"},"video/vnd.sealed.mpeg4":{"source":"iana"},"video/vnd.sealed.swf":{"source":"iana"},"video/vnd.sealedmedia.softseal.mov":{"source":"iana"},"video/vnd.uvvu.mp4":{"source":"iana","extensions":["uvu","uvvu"]},"video/vnd.vivo":{"source":"iana","extensions":["viv"]},"video/vnd.youtube.yt":{"source":"iana"},"video/vp8":{"source":"iana"},"video/webm":{"source":"apache","compressible":false,"extensions":["webm"]},"video/x-f4v":{"source":"apache","extensions":["f4v"]},"video/x-fli":{"source":"apache","extensions":["fli"]},"video/x-flv":{"source":"apache","compressible":false,"extensions":["flv"]},"video/x-m4v":{"source":"apache","extensions":["m4v"]},"video/x-matroska":{"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},"video/x-mng":{"source":"apache","extensions":["mng"]},"video/x-ms-asf":{"source":"apache","extensions":["asf","asx"]},"video/x-ms-vob":{"source":"apache","extensions":["vob"]},"video/x-ms-wm":{"source":"apache","extensions":["wm"]},"video/x-ms-wmv":{"source":"apache","compressible":false,"extensions":["wmv"]},"video/x-ms-wmx":{"source":"apache","extensions":["wmx"]},"video/x-ms-wvx":{"source":"apache","extensions":["wvx"]},"video/x-msvideo":{"source":"apache","extensions":["avi"]},"video/x-sgi-movie":{"source":"apache","extensions":["movie"]},"video/x-smv":{"source":"apache","extensions":["smv"]},"x-conference/x-cooltalk":{"source":"apache","extensions":["ice"]},"x-shader/x-fragment":{"compressible":true},"x-shader/x-vertex":{"compressible":true}}'
			);
		},
		function (e, t, n) {
			"use strict";
			var a = n(16),
				i = n(25)("body-parser:raw"),
				r = n(27),
				o = n(18);
			e.exports = function raw(e) {
				var t = e || {},
					n = !1 !== t.inflate,
					s = "number" != typeof t.limit ? a.parse(t.limit || "100kb") : t.limit,
					c = t.type || "application/octet-stream",
					p = t.verify || !1;
				if (!1 !== p && "function" != typeof p)
					throw new TypeError("option verify must be function");
				var l =
					"function" != typeof c
						? (function typeChecker(e) {
								return function checkType(t) {
									return Boolean(o(t, e));
								};
						  })(c)
						: c;
				function parse(e) {
					return e;
				}
				return function rawParser(e, t, a) {
					return e._body
						? (i("body already parsed"), void a())
						: ((e.body = e.body || {}),
						  o.hasBody(e)
								? (i("content-type %j", e.headers["content-type"]),
								  l(e)
										? void r(e, t, a, parse, i, {
												encoding: null,
												inflate: n,
												limit: s,
												verify: p,
										  })
										: (i("skip parsing"), void a()))
								: (i("skip empty body"), void a()));
				};
			};
		},
		function (e, t, n) {
			"use strict";
			var a = n(16),
				i = n(22),
				r = n(25)("body-parser:text"),
				o = n(27),
				s = n(18);
			e.exports = function text(e) {
				var t = e || {},
					n = t.defaultCharset || "utf-8",
					c = !1 !== t.inflate,
					p = "number" != typeof t.limit ? a.parse(t.limit || "100kb") : t.limit,
					l = t.type || "text/plain",
					u = t.verify || !1;
				if (!1 !== u && "function" != typeof u)
					throw new TypeError("option verify must be function");
				var d =
					"function" != typeof l
						? (function typeChecker(e) {
								return function checkType(t) {
									return Boolean(s(t, e));
								};
						  })(l)
						: l;
				function parse(e) {
					return e;
				}
				return function textParser(e, t, a) {
					if (e._body) return r("body already parsed"), void a();
					if (((e.body = e.body || {}), !s.hasBody(e)))
						return r("skip empty body"), void a();
					if ((r("content-type %j", e.headers["content-type"]), !d(e)))
						return r("skip parsing"), void a();
					var l =
						(function getCharset(e) {
							try {
								return (i.parse(e).parameters.charset || "").toLowerCase();
							} catch (e) {
								return;
							}
						})(e) || n;
					o(e, t, a, parse, r, { encoding: l, inflate: c, limit: p, verify: u });
				};
			};
		},
		function (e, t, n) {
			"use strict";
			var a = n(16),
				i = n(22),
				r = n(17),
				o = n(25)("body-parser:urlencoded"),
				s = n(6)("body-parser"),
				c = n(27),
				p = n(18);
			e.exports = function urlencoded(e) {
				var t = e || {};
				void 0 === t.extended && s("undefined extended: provide extended option");
				var n = !1 !== t.extended,
					l = !1 !== t.inflate,
					u = "number" != typeof t.limit ? a.parse(t.limit || "100kb") : t.limit,
					d = t.type || "application/x-www-form-urlencoded",
					m = t.verify || !1;
				if (!1 !== m && "function" != typeof m)
					throw new TypeError("option verify must be function");
				var f = n
						? (function extendedparser(e) {
								var t = void 0 !== e.parameterLimit ? e.parameterLimit : 1e3,
									n = parser("qs");
								if (isNaN(t) || t < 1)
									throw new TypeError(
										"option parameterLimit must be a positive number"
									);
								isFinite(t) && (t |= 0);
								return function queryparse(e) {
									var a = parameterCount(e, t);
									if (void 0 === a)
										throw (
											(o("too many parameters"),
											r(413, "too many parameters", {
												type: "parameters.too.many",
											}))
										);
									var i = Math.max(100, a);
									return (
										o("parse extended urlencoding"),
										n(e, {
											allowPrototypes: !0,
											arrayLimit: i,
											depth: 1 / 0,
											parameterLimit: t,
										})
									);
								};
						  })(t)
						: (function simpleparser(e) {
								var t = void 0 !== e.parameterLimit ? e.parameterLimit : 1e3,
									n = parser("querystring");
								if (isNaN(t) || t < 1)
									throw new TypeError(
										"option parameterLimit must be a positive number"
									);
								isFinite(t) && (t |= 0);
								return function queryparse(e) {
									if (void 0 === parameterCount(e, t))
										throw (
											(o("too many parameters"),
											r(413, "too many parameters", {
												type: "parameters.too.many",
											}))
										);
									return (
										o("parse urlencoding"), n(e, void 0, void 0, { maxKeys: t })
									);
								};
						  })(t),
					h =
						"function" != typeof d
							? (function typeChecker(e) {
									return function checkType(t) {
										return Boolean(p(t, e));
									};
							  })(d)
							: d;
				function parse(e) {
					return e.length ? f(e) : {};
				}
				return function urlencodedParser(e, t, n) {
					if (e._body) return o("body already parsed"), void n();
					if (((e.body = e.body || {}), !p.hasBody(e)))
						return o("skip empty body"), void n();
					if ((o("content-type %j", e.headers["content-type"]), !h(e)))
						return o("skip parsing"), void n();
					var a =
						(function getCharset(e) {
							try {
								return (i.parse(e).parameters.charset || "").toLowerCase();
							} catch (e) {
								return;
							}
						})(e) || "utf-8";
					if ("utf-8" !== a)
						return (
							o("invalid charset"),
							void n(
								r(415, 'unsupported charset "' + a.toUpperCase() + '"', {
									charset: a,
									type: "charset.unsupported",
								})
							)
						);
					c(e, t, n, parse, o, {
						debug: o,
						encoding: a,
						inflate: l,
						limit: u,
						verify: m,
					});
				};
			};
			var l = Object.create(null);
			function parameterCount(e, t) {
				for (var n = 0, a = 0; -1 !== (a = e.indexOf("&", a)); )
					if ((a++, ++n === t)) return;
				return n;
			}
			function parser(e) {
				var t = l[e];
				if (void 0 !== t) return t.parse;
				switch (e) {
					case "qs":
						t = n(38);
						break;
					case "querystring":
						t = n(14);
				}
				return (l[e] = t), t.parse;
			}
		},
		function (e, t, n) {
			"use strict";
			var a = n(53),
				i = n(54),
				r = Object.prototype.hasOwnProperty,
				o = {
					brackets: function brackets(e) {
						return e + "[]";
					},
					comma: "comma",
					indices: function indices(e, t) {
						return e + "[" + t + "]";
					},
					repeat: function repeat(e) {
						return e;
					},
				},
				s = Array.isArray,
				c = Array.prototype.push,
				pushToArray = function (e, t) {
					c.apply(e, s(t) ? t : [t]);
				},
				p = Date.prototype.toISOString,
				l = {
					addQueryPrefix: !1,
					allowDots: !1,
					charset: "utf-8",
					charsetSentinel: !1,
					delimiter: "&",
					encode: !0,
					encoder: a.encode,
					encodeValuesOnly: !1,
					formatter: i.formatters[i.default],
					indices: !1,
					serializeDate: function serializeDate(e) {
						return p.call(e);
					},
					skipNulls: !1,
					strictNullHandling: !1,
				},
				u = function stringify(e, t, n, i, r, o, c, p, u, d, m, f, h) {
					var v = e;
					if (
						("function" == typeof c
							? (v = c(t, v))
							: v instanceof Date
							? (v = d(v))
							: "comma" === n && s(v) && (v = v.join(",")),
						null === v)
					) {
						if (i) return o && !f ? o(t, l.encoder, h) : t;
						v = "";
					}
					if (
						"string" == typeof v ||
						"number" == typeof v ||
						"boolean" == typeof v ||
						a.isBuffer(v)
					)
						return o
							? [m(f ? t : o(t, l.encoder, h)) + "=" + m(o(v, l.encoder, h))]
							: [m(t) + "=" + m(String(v))];
					var g,
						b = [];
					if (void 0 === v) return b;
					if (s(c)) g = c;
					else {
						var x = Object.keys(v);
						g = p ? x.sort(p) : x;
					}
					for (var y = 0; y < g.length; ++y) {
						var w = g[y];
						(r && null === v[w]) ||
							(s(v)
								? pushToArray(
										b,
										stringify(
											v[w],
											"function" == typeof n ? n(t, w) : t,
											n,
											i,
											r,
											o,
											c,
											p,
											u,
											d,
											m,
											f,
											h
										)
								  )
								: pushToArray(
										b,
										stringify(
											v[w],
											t + (u ? "." + w : "[" + w + "]"),
											n,
											i,
											r,
											o,
											c,
											p,
											u,
											d,
											m,
											f,
											h
										)
								  ));
					}
					return b;
				};
			e.exports = function (e, t) {
				var n,
					a = e,
					c = (function normalizeStringifyOptions(e) {
						if (!e) return l;
						if (
							null !== e.encoder &&
							void 0 !== e.encoder &&
							"function" != typeof e.encoder
						)
							throw new TypeError("Encoder has to be a function.");
						var t = e.charset || l.charset;
						if (
							void 0 !== e.charset &&
							"utf-8" !== e.charset &&
							"iso-8859-1" !== e.charset
						)
							throw new TypeError(
								"The charset option must be either utf-8, iso-8859-1, or undefined"
							);
						var n = i.default;
						if (void 0 !== e.format) {
							if (!r.call(i.formatters, e.format))
								throw new TypeError("Unknown format option provided.");
							n = e.format;
						}
						var a = i.formatters[n],
							o = l.filter;
						return (
							("function" == typeof e.filter || s(e.filter)) && (o = e.filter),
							{
								addQueryPrefix:
									"boolean" == typeof e.addQueryPrefix
										? e.addQueryPrefix
										: l.addQueryPrefix,
								allowDots: void 0 === e.allowDots ? l.allowDots : !!e.allowDots,
								charset: t,
								charsetSentinel:
									"boolean" == typeof e.charsetSentinel
										? e.charsetSentinel
										: l.charsetSentinel,
								delimiter: void 0 === e.delimiter ? l.delimiter : e.delimiter,
								encode: "boolean" == typeof e.encode ? e.encode : l.encode,
								encoder: "function" == typeof e.encoder ? e.encoder : l.encoder,
								encodeValuesOnly:
									"boolean" == typeof e.encodeValuesOnly
										? e.encodeValuesOnly
										: l.encodeValuesOnly,
								filter: o,
								formatter: a,
								serializeDate:
									"function" == typeof e.serializeDate
										? e.serializeDate
										: l.serializeDate,
								skipNulls:
									"boolean" == typeof e.skipNulls ? e.skipNulls : l.skipNulls,
								sort: "function" == typeof e.sort ? e.sort : null,
								strictNullHandling:
									"boolean" == typeof e.strictNullHandling
										? e.strictNullHandling
										: l.strictNullHandling,
							}
						);
					})(t);
				"function" == typeof c.filter
					? (a = (0, c.filter)("", a))
					: s(c.filter) && (n = c.filter);
				var p,
					d = [];
				if ("object" != typeof a || null === a) return "";
				p =
					t && t.arrayFormat in o
						? t.arrayFormat
						: t && "indices" in t
						? t.indices
							? "indices"
							: "repeat"
						: "indices";
				var m = o[p];
				n || (n = Object.keys(a)), c.sort && n.sort(c.sort);
				for (var f = 0; f < n.length; ++f) {
					var h = n[f];
					(c.skipNulls && null === a[h]) ||
						pushToArray(
							d,
							u(
								a[h],
								h,
								m,
								c.strictNullHandling,
								c.skipNulls,
								c.encode ? c.encoder : null,
								c.filter,
								c.sort,
								c.allowDots,
								c.serializeDate,
								c.formatter,
								c.encodeValuesOnly,
								c.charset
							)
						);
				}
				var v = d.join(c.delimiter),
					g = !0 === c.addQueryPrefix ? "?" : "";
				return (
					c.charsetSentinel &&
						("iso-8859-1" === c.charset
							? (g += "utf8=%26%2310003%3B&")
							: (g += "utf8=%E2%9C%93&")),
					v.length > 0 ? g + v : ""
				);
			};
		},
		function (e, t, n) {
			"use strict";
			var a = n(53),
				i = Object.prototype.hasOwnProperty,
				r = {
					allowDots: !1,
					allowPrototypes: !1,
					arrayLimit: 20,
					charset: "utf-8",
					charsetSentinel: !1,
					comma: !1,
					decoder: a.decode,
					delimiter: "&",
					depth: 5,
					ignoreQueryPrefix: !1,
					interpretNumericEntities: !1,
					parameterLimit: 1e3,
					parseArrays: !0,
					plainObjects: !1,
					strictNullHandling: !1,
				},
				interpretNumericEntities = function (e) {
					return e.replace(/&#(\d+);/g, function (e, t) {
						return String.fromCharCode(parseInt(t, 10));
					});
				},
				o = function parseQueryStringKeys(e, t, n) {
					if (e) {
						var a = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
							r = /(\[[^[\]]*])/g,
							o = /(\[[^[\]]*])/.exec(a),
							s = o ? a.slice(0, o.index) : a,
							c = [];
						if (s) {
							if (
								!n.plainObjects &&
								i.call(Object.prototype, s) &&
								!n.allowPrototypes
							)
								return;
							c.push(s);
						}
						for (var p = 0; null !== (o = r.exec(a)) && p < n.depth; ) {
							if (
								((p += 1),
								!n.plainObjects &&
									i.call(Object.prototype, o[1].slice(1, -1)) &&
									!n.allowPrototypes)
							)
								return;
							c.push(o[1]);
						}
						return (
							o && c.push("[" + a.slice(o.index) + "]"),
							(function (e, t, n) {
								for (var a = t, i = e.length - 1; i >= 0; --i) {
									var r,
										o = e[i];
									if ("[]" === o && n.parseArrays) r = [].concat(a);
									else {
										r = n.plainObjects ? Object.create(null) : {};
										var s =
												"[" === o.charAt(0) &&
												"]" === o.charAt(o.length - 1)
													? o.slice(1, -1)
													: o,
											c = parseInt(s, 10);
										n.parseArrays || "" !== s
											? !isNaN(c) &&
											  o !== s &&
											  String(c) === s &&
											  c >= 0 &&
											  n.parseArrays &&
											  c <= n.arrayLimit
												? ((r = [])[c] = a)
												: (r[s] = a)
											: (r = { 0: a });
									}
									a = r;
								}
								return a;
							})(c, t, n)
						);
					}
				};
			e.exports = function (e, t) {
				var n = (function normalizeParseOptions(e) {
					if (!e) return r;
					if (
						null !== e.decoder &&
						void 0 !== e.decoder &&
						"function" != typeof e.decoder
					)
						throw new TypeError("Decoder has to be a function.");
					if (void 0 !== e.charset && "utf-8" !== e.charset && "iso-8859-1" !== e.charset)
						throw new Error(
							"The charset option must be either utf-8, iso-8859-1, or undefined"
						);
					var t = void 0 === e.charset ? r.charset : e.charset;
					return {
						allowDots: void 0 === e.allowDots ? r.allowDots : !!e.allowDots,
						allowPrototypes:
							"boolean" == typeof e.allowPrototypes
								? e.allowPrototypes
								: r.allowPrototypes,
						arrayLimit: "number" == typeof e.arrayLimit ? e.arrayLimit : r.arrayLimit,
						charset: t,
						charsetSentinel:
							"boolean" == typeof e.charsetSentinel
								? e.charsetSentinel
								: r.charsetSentinel,
						comma: "boolean" == typeof e.comma ? e.comma : r.comma,
						decoder: "function" == typeof e.decoder ? e.decoder : r.decoder,
						delimiter:
							"string" == typeof e.delimiter || a.isRegExp(e.delimiter)
								? e.delimiter
								: r.delimiter,
						depth: "number" == typeof e.depth ? e.depth : r.depth,
						ignoreQueryPrefix: !0 === e.ignoreQueryPrefix,
						interpretNumericEntities:
							"boolean" == typeof e.interpretNumericEntities
								? e.interpretNumericEntities
								: r.interpretNumericEntities,
						parameterLimit:
							"number" == typeof e.parameterLimit
								? e.parameterLimit
								: r.parameterLimit,
						parseArrays: !1 !== e.parseArrays,
						plainObjects:
							"boolean" == typeof e.plainObjects ? e.plainObjects : r.plainObjects,
						strictNullHandling:
							"boolean" == typeof e.strictNullHandling
								? e.strictNullHandling
								: r.strictNullHandling,
					};
				})(t);
				if ("" === e || null == e) return n.plainObjects ? Object.create(null) : {};
				for (
					var s =
							"string" == typeof e
								? (function parseQueryStringValues(e, t) {
										var n,
											o = {},
											s = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e,
											c =
												t.parameterLimit === 1 / 0
													? void 0
													: t.parameterLimit,
											p = s.split(t.delimiter, c),
											l = -1,
											u = t.charset;
										if (t.charsetSentinel)
											for (n = 0; n < p.length; ++n)
												0 === p[n].indexOf("utf8=") &&
													("utf8=%E2%9C%93" === p[n]
														? (u = "utf-8")
														: "utf8=%26%2310003%3B" === p[n] &&
														  (u = "iso-8859-1"),
													(l = n),
													(n = p.length));
										for (n = 0; n < p.length; ++n)
											if (n !== l) {
												var d,
													m,
													f = p[n],
													h = f.indexOf("]="),
													v = -1 === h ? f.indexOf("=") : h + 1;
												-1 === v
													? ((d = t.decoder(f, r.decoder, u)),
													  (m = t.strictNullHandling ? null : ""))
													: ((d = t.decoder(f.slice(0, v), r.decoder, u)),
													  (m = t.decoder(
															f.slice(v + 1),
															r.decoder,
															u
													  ))),
													m &&
														t.interpretNumericEntities &&
														"iso-8859-1" === u &&
														(m = interpretNumericEntities(m)),
													m &&
														t.comma &&
														m.indexOf(",") > -1 &&
														(m = m.split(",")),
													i.call(o, d)
														? (o[d] = a.combine(o[d], m))
														: (o[d] = m);
											}
										return o;
								  })(e, n)
								: e,
						c = n.plainObjects ? Object.create(null) : {},
						p = Object.keys(s),
						l = 0;
					l < p.length;
					++l
				) {
					var u = p[l],
						d = o(u, s[u], n);
					c = a.merge(c, d, n);
				}
				return a.compact(c);
			};
		},
		function (e, t, n) {
			"use strict";
			e.exports = function merge(e, t, n) {
				if (!e) throw new TypeError("argument dest is required");
				if (!t) throw new TypeError("argument src is required");
				void 0 === n && (n = !0);
				return (
					Object.getOwnPropertyNames(t).forEach(function forEachOwnPropertyName(i) {
						if (n || !a.call(e, i)) {
							var r = Object.getOwnPropertyDescriptor(t, i);
							Object.defineProperty(e, i, r);
						}
					}),
					e
				);
			};
			var a = Object.prototype.hasOwnProperty;
		},
		function (e, t, n) {
			"use strict";
			var a = n(130),
				i = n(56),
				r = n(39),
				o = n(139),
				s = n(60),
				c = n(20)("express:application"),
				p = n(140),
				l = n(4),
				u = n(7).compileETag,
				d = n(7).compileQueryParser,
				m = n(7).compileTrust,
				f = n(6)("express"),
				h = n(31),
				v = n(32),
				g = n(1).resolve,
				b = n(23),
				x = Array.prototype.slice,
				y = (e.exports = {});
			function logerror(e) {
				"test" !== this.get("env") && console.error(e.stack || e.toString());
			}
			(y.init = function init() {
				(this.cache = {}),
					(this.engines = {}),
					(this.settings = {}),
					this.defaultConfiguration();
			}),
				(y.defaultConfiguration = function defaultConfiguration() {
					var e = "production";
					this.enable("x-powered-by"),
						this.set("etag", "weak"),
						this.set("env", e),
						this.set("query parser", "extended"),
						this.set("subdomain offset", 2),
						this.set("trust proxy", !1),
						Object.defineProperty(this.settings, "@@symbol:trust_proxy_default", {
							configurable: !0,
							value: !0,
						}),
						c("booting in %s mode", e),
						this.on("mount", function onmount(e) {
							!0 === this.settings["@@symbol:trust_proxy_default"] &&
								"function" == typeof e.settings["trust proxy fn"] &&
								(delete this.settings["trust proxy"],
								delete this.settings["trust proxy fn"]),
								b(this.request, e.request),
								b(this.response, e.response),
								b(this.engines, e.engines),
								b(this.settings, e.settings);
						}),
						(this.locals = Object.create(null)),
						(this.mountpath = "/"),
						(this.locals.settings = this.settings),
						this.set("view", p),
						this.set("views", g("views")),
						this.set("jsonp callback name", "callback"),
						this.enable("view cache"),
						Object.defineProperty(this, "router", {
							get: function () {
								throw new Error(
									"'app.router' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app."
								);
							},
						});
				}),
				(y.lazyrouter = function lazyrouter() {
					this._router ||
						((this._router = new i({
							caseSensitive: this.enabled("case sensitive routing"),
							strict: this.enabled("strict routing"),
						})),
						this._router.use(s(this.get("query parser fn"))),
						this._router.use(o.init(this)));
				}),
				(y.handle = function handle(e, t, n) {
					var i = this._router,
						r = n || a(e, t, { env: this.get("env"), onerror: logerror.bind(this) });
					if (!i) return c("no routes defined on app"), void r();
					i.handle(e, t, r);
				}),
				(y.use = function use(e) {
					var t = 0,
						n = "/";
					if ("function" != typeof e) {
						for (var a = e; Array.isArray(a) && 0 !== a.length; ) a = a[0];
						"function" != typeof a && ((t = 1), (n = e));
					}
					var i = h(x.call(arguments, t));
					if (0 === i.length)
						throw new TypeError("app.use() requires a middleware function");
					this.lazyrouter();
					var r = this._router;
					return (
						i.forEach(function (e) {
							if (!e || !e.handle || !e.set) return r.use(n, e);
							c(".use app under %s", n),
								(e.mountpath = n),
								(e.parent = this),
								r.use(n, function mounted_app(t, n, a) {
									var i = t.app;
									e.handle(t, n, function (e) {
										b(t, i.request), b(n, i.response), a(e);
									});
								}),
								e.emit("mount", this);
						}, this),
						this
					);
				}),
				(y.route = function route(e) {
					return this.lazyrouter(), this._router.route(e);
				}),
				(y.engine = function engine(e, t) {
					if ("function" != typeof t) throw new Error("callback function required");
					var n = "." !== e[0] ? "." + e : e;
					return (this.engines[n] = t), this;
				}),
				(y.param = function param(e, t) {
					if ((this.lazyrouter(), Array.isArray(e))) {
						for (var n = 0; n < e.length; n++) this.param(e[n], t);
						return this;
					}
					return this._router.param(e, t), this;
				}),
				(y.set = function set(e, t) {
					if (1 === arguments.length) return this.settings[e];
					switch ((c('set "%s" to %o', e, t), (this.settings[e] = t), e)) {
						case "etag":
							this.set("etag fn", u(t));
							break;
						case "query parser":
							this.set("query parser fn", d(t));
							break;
						case "trust proxy":
							this.set("trust proxy fn", m(t)),
								Object.defineProperty(
									this.settings,
									"@@symbol:trust_proxy_default",
									{ configurable: !0, value: !1 }
								);
					}
					return this;
				}),
				(y.path = function path() {
					return this.parent ? this.parent.path() + this.mountpath : "";
				}),
				(y.enabled = function enabled(e) {
					return Boolean(this.set(e));
				}),
				(y.disabled = function disabled(e) {
					return !this.set(e);
				}),
				(y.enable = function enable(e) {
					return this.set(e, !0);
				}),
				(y.disable = function disable(e) {
					return this.set(e, !1);
				}),
				r.forEach(function (e) {
					y[e] = function (t) {
						if ("get" === e && 1 === arguments.length) return this.set(t);
						this.lazyrouter();
						var n = this._router.route(t);
						return n[e].apply(n, x.call(arguments, 1)), this;
					};
				}),
				(y.all = function all(e) {
					this.lazyrouter();
					for (
						var t = this._router.route(e), n = x.call(arguments, 1), a = 0;
						a < r.length;
						a++
					)
						t[r[a]].apply(t, n);
					return this;
				}),
				(y.del = f.function(y.delete, "app.del: Use app.delete instead")),
				(y.render = function render(e, t, n) {
					var a,
						i = this.cache,
						r = n,
						o = this.engines,
						s = t,
						c = {};
					if (
						("function" == typeof t && ((r = t), (s = {})),
						v(c, this.locals),
						s._locals && v(c, s._locals),
						v(c, s),
						null == c.cache && (c.cache = this.enabled("view cache")),
						c.cache && (a = i[e]),
						!a)
					) {
						if (
							!(a = new (this.get("view"))(e, {
								defaultEngine: this.get("view engine"),
								root: this.get("views"),
								engines: o,
							})).path
						) {
							var p =
									Array.isArray(a.root) && a.root.length > 1
										? 'directories "' +
										  a.root.slice(0, -1).join('", "') +
										  '" or "' +
										  a.root[a.root.length - 1] +
										  '"'
										: 'directory "' + a.root + '"',
								l = new Error('Failed to lookup view "' + e + '" in views ' + p);
							return (l.view = a), r(l);
						}
						c.cache && (i[e] = a);
					}
					!(function tryRender(e, t, n) {
						try {
							e.render(t, n);
						} catch (e) {
							n(e);
						}
					})(a, c, r);
				}),
				(y.listen = function listen() {
					var e = l.createServer(this);
					return e.listen.apply(e, arguments);
				});
		},
		function (e, t, n) {
			"use strict";
			var a = n(131)("finalhandler"),
				i = n(29),
				r = n(30),
				o = n(28),
				s = n(19),
				c = n(24),
				p = n(51),
				l = /\x20{2}/g,
				u = /\n/g,
				d =
					"function" == typeof setImmediate
						? setImmediate
						: function (e) {
								process.nextTick(e.bind.apply(e, arguments));
						  },
				m = o.isFinished;
			function headersSent(e) {
				return "boolean" != typeof e.headersSent ? Boolean(e._header) : e.headersSent;
			}
			e.exports = function finalhandler(e, t, n) {
				var f = n || {},
					h = f.env || "production",
					v = f.onerror;
				return function (n) {
					var f, g, b;
					if (n || !headersSent(t)) {
						if (
							(n
								? (void 0 ===
								  (b = (function getErrorStatusCode(e) {
										if (
											"number" == typeof e.status &&
											e.status >= 400 &&
											e.status < 600
										)
											return e.status;
										if (
											"number" == typeof e.statusCode &&
											e.statusCode >= 400 &&
											e.statusCode < 600
										)
											return e.statusCode;
										return;
								  })(n))
										? (b = (function getResponseStatusCode(e) {
												var t = e.statusCode;
												("number" != typeof t || t < 400 || t > 599) &&
													(t = 500);
												return t;
										  })(t))
										: (f = (function getErrorHeaders(e) {
												if (!e.headers || "object" != typeof e.headers)
													return;
												for (
													var t = Object.create(null),
														n = Object.keys(e.headers),
														a = 0;
													a < n.length;
													a++
												) {
													var i = n[a];
													t[i] = e.headers[i];
												}
												return t;
										  })(n)),
								  (g = (function getErrorMessage(e, t, n) {
										var a;
										"production" !== n &&
											((a = e.stack) ||
												"function" != typeof e.toString ||
												(a = e.toString()));
										return a || c[t];
								  })(n, b, h)))
								: ((b = 404),
								  (g =
										"Cannot " +
										e.method +
										" " +
										i(
											(function getResourceName(e) {
												try {
													return s.original(e).pathname;
												} catch (e) {
													return "resource";
												}
											})(e)
										))),
							a("default %s", b),
							n && v && d(v, n, e, t),
							headersSent(t))
						)
							return a("cannot %d after headers sent", b), void e.socket.destroy();
						!(function send(e, t, n, a, i) {
							function write() {
								var o = (function createHtmlDocument(e) {
									return (
										'<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>' +
										r(e).replace(u, "<br>").replace(l, " &nbsp;") +
										"</pre>\n</body>\n</html>\n"
									);
								})(i);
								(t.statusCode = n),
									(t.statusMessage = c[n]),
									(function setHeaders(e, t) {
										if (!t) return;
										for (var n = Object.keys(t), a = 0; a < n.length; a++) {
											var i = n[a];
											e.setHeader(i, t[i]);
										}
									})(t, a),
									t.setHeader("Content-Security-Policy", "default-src 'none'"),
									t.setHeader("X-Content-Type-Options", "nosniff"),
									t.setHeader("Content-Type", "text/html; charset=utf-8"),
									t.setHeader("Content-Length", Buffer.byteLength(o, "utf8")),
									"HEAD" !== e.method ? t.end(o, "utf8") : t.end();
							}
							if (m(e)) return void write();
							p(e), o(e, write), e.resume();
						})(e, t, b, f, g);
					} else a("cannot 404 after headers sent");
				};
			};
		},
		function (e, t, n) {
			"undefined" != typeof process && "renderer" === process.type
				? (e.exports = n(132))
				: (e.exports = n(134));
		},
		function (e, t, n) {
			function load() {
				var e;
				try {
					e = t.storage.debug;
				} catch (e) {}
				return (
					!e &&
						"undefined" != typeof process &&
						"env" in process &&
						(e = process.env.DEBUG),
					e
				);
			}
			((t = e.exports = n(55)).log = function log() {
				return (
					"object" == typeof console &&
					console.log &&
					Function.prototype.apply.call(console.log, console, arguments)
				);
			}),
				(t.formatArgs = function formatArgs(e) {
					var n = this.useColors;
					if (
						((e[0] =
							(n ? "%c" : "") +
							this.namespace +
							(n ? " %c" : " ") +
							e[0] +
							(n ? "%c " : " ") +
							"+" +
							t.humanize(this.diff)),
						!n)
					)
						return;
					var a = "color: " + this.color;
					e.splice(1, 0, a, "color: inherit");
					var i = 0,
						r = 0;
					e[0].replace(/%[a-zA-Z%]/g, function (e) {
						"%%" !== e && (i++, "%c" === e && (r = i));
					}),
						e.splice(r, 0, a);
				}),
				(t.save = function save(e) {
					try {
						null == e ? t.storage.removeItem("debug") : (t.storage.debug = e);
					} catch (e) {}
				}),
				(t.load = load),
				(t.useColors = function useColors() {
					if (
						"undefined" != typeof window &&
						window.process &&
						"renderer" === window.process.type
					)
						return !0;
					return (
						("undefined" != typeof document &&
							document.documentElement &&
							document.documentElement.style &&
							document.documentElement.style.WebkitAppearance) ||
						("undefined" != typeof window &&
							window.console &&
							(window.console.firebug ||
								(window.console.exception && window.console.table))) ||
						("undefined" != typeof navigator &&
							navigator.userAgent &&
							navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
							parseInt(RegExp.$1, 10) >= 31) ||
						("undefined" != typeof navigator &&
							navigator.userAgent &&
							navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
					);
				}),
				(t.storage =
					"undefined" != typeof chrome && void 0 !== chrome.storage
						? chrome.storage.local
						: (function localstorage() {
								try {
									return window.localStorage;
								} catch (e) {}
						  })()),
				(t.colors = [
					"lightseagreen",
					"forestgreen",
					"goldenrod",
					"dodgerblue",
					"darkorchid",
					"crimson",
				]),
				(t.formatters.j = function (e) {
					try {
						return JSON.stringify(e);
					} catch (e) {
						return "[UnexpectedJSONParseError]: " + e.message;
					}
				}),
				t.enable(load());
		},
		function (e, t) {
			var n = 1e3,
				a = 6e4,
				i = 60 * a,
				r = 24 * i;
			function plural(e, t, n) {
				if (!(e < t))
					return e < 1.5 * t
						? Math.floor(e / t) + " " + n
						: Math.ceil(e / t) + " " + n + "s";
			}
			e.exports = function (e, t) {
				t = t || {};
				var o = typeof e;
				if ("string" === o && e.length > 0)
					return (function parse(e) {
						if ((e = String(e)).length > 100) return;
						var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
							e
						);
						if (!t) return;
						var o = parseFloat(t[1]);
						switch ((t[2] || "ms").toLowerCase()) {
							case "years":
							case "year":
							case "yrs":
							case "yr":
							case "y":
								return 315576e5 * o;
							case "days":
							case "day":
							case "d":
								return o * r;
							case "hours":
							case "hour":
							case "hrs":
							case "hr":
							case "h":
								return o * i;
							case "minutes":
							case "minute":
							case "mins":
							case "min":
							case "m":
								return o * a;
							case "seconds":
							case "second":
							case "secs":
							case "sec":
							case "s":
								return o * n;
							case "milliseconds":
							case "millisecond":
							case "msecs":
							case "msec":
							case "ms":
								return o;
							default:
								return;
						}
					})(e);
				if ("number" === o && !1 === isNaN(e))
					return t.long
						? (function fmtLong(e) {
								return (
									plural(e, r, "day") ||
									plural(e, i, "hour") ||
									plural(e, a, "minute") ||
									plural(e, n, "second") ||
									e + " ms"
								);
						  })(e)
						: (function fmtShort(e) {
								if (e >= r) return Math.round(e / r) + "d";
								if (e >= i) return Math.round(e / i) + "h";
								if (e >= a) return Math.round(e / a) + "m";
								if (e >= n) return Math.round(e / n) + "s";
								return e + "ms";
						  })(e);
				throw new Error(
					"val is not a non-empty string or a valid number. val=" + JSON.stringify(e)
				);
			};
		},
		function (e, t, n) {
			var a = n(26),
				i = n(10);
			((t = e.exports = n(55)).init = function init(e) {
				e.inspectOpts = {};
				for (var n = Object.keys(t.inspectOpts), a = 0; a < n.length; a++)
					e.inspectOpts[n[a]] = t.inspectOpts[n[a]];
			}),
				(t.log = function log() {
					return o.write(i.format.apply(i, arguments) + "\n");
				}),
				(t.formatArgs = function formatArgs(e) {
					var n = this.namespace;
					if (this.useColors) {
						var a = this.color,
							i = "  [3" + a + ";1m" + n + " [0m";
						(e[0] = i + e[0].split("\n").join("\n" + i)),
							e.push("[3" + a + "m+" + t.humanize(this.diff) + "[0m");
					} else e[0] = new Date().toUTCString() + " " + n + " " + e[0];
				}),
				(t.save = function save(e) {
					null == e ? delete process.env.DEBUG : (process.env.DEBUG = e);
				}),
				(t.load = load),
				(t.useColors = function useColors() {
					return "colors" in t.inspectOpts ? Boolean(t.inspectOpts.colors) : a.isatty(r);
				}),
				(t.colors = [6, 2, 3, 4, 5, 1]),
				(t.inspectOpts = Object.keys(process.env)
					.filter(function (e) {
						return /^debug_/i.test(e);
					})
					.reduce(function (e, t) {
						var n = t
								.substring(6)
								.toLowerCase()
								.replace(/_([a-z])/g, function (e, t) {
									return t.toUpperCase();
								}),
							a = process.env[t];
						return (
							(a =
								!!/^(yes|on|true|enabled)$/i.test(a) ||
								(!/^(no|off|false|disabled)$/i.test(a) &&
									("null" === a ? null : Number(a)))),
							(e[n] = a),
							e
						);
					}, {}));
			var r = parseInt(process.env.DEBUG_FD, 10) || 2;
			1 !== r &&
				2 !== r &&
				i.deprecate(function () {},
				"except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
			var o =
				1 === r
					? process.stdout
					: 2 === r
					? process.stderr
					: (function createWritableStdioStream(e) {
							var t;
							switch (process.binding("tty_wrap").guessHandleType(e)) {
								case "TTY":
									((t = new a.WriteStream(e))._type = "tty"),
										t._handle && t._handle.unref && t._handle.unref();
									break;
								case "FILE":
									var i = n(2);
									(t = new i.SyncWriteStream(e, { autoClose: !1 }))._type = "fs";
									break;
								case "PIPE":
								case "TCP":
									var r = n(11);
									((t = new r.Socket({
										fd: e,
										readable: !1,
										writable: !0,
									})).readable = !1),
										(t.read = null),
										(t._type = "pipe"),
										t._handle && t._handle.unref && t._handle.unref();
									break;
								default:
									throw new Error("Implement me. Unknown stream file type!");
							}
							return (t.fd = e), (t._isStdio = !0), t;
					  })(r);
			function load() {
				return process.env.DEBUG;
			}
			(t.formatters.o = function (e) {
				return (
					(this.inspectOpts.colors = this.useColors),
					i
						.inspect(e, this.inspectOpts)
						.split("\n")
						.map(function (e) {
							return e.trim();
						})
						.join(" ")
				);
			}),
				(t.formatters.O = function (e) {
					return (
						(this.inspectOpts.colors = this.useColors), i.inspect(e, this.inspectOpts)
					);
				}),
				t.enable(load());
		},
		function (e, t, n) {
			function load() {
				var e;
				try {
					e = t.storage.debug;
				} catch (e) {}
				return (
					!e &&
						"undefined" != typeof process &&
						"env" in process &&
						(e = process.env.DEBUG),
					e
				);
			}
			((t = e.exports = n(58)).log = function log() {
				return (
					"object" == typeof console &&
					console.log &&
					Function.prototype.apply.call(console.log, console, arguments)
				);
			}),
				(t.formatArgs = function formatArgs(e) {
					var n = this.useColors;
					if (
						((e[0] =
							(n ? "%c" : "") +
							this.namespace +
							(n ? " %c" : " ") +
							e[0] +
							(n ? "%c " : " ") +
							"+" +
							t.humanize(this.diff)),
						!n)
					)
						return;
					var a = "color: " + this.color;
					e.splice(1, 0, a, "color: inherit");
					var i = 0,
						r = 0;
					e[0].replace(/%[a-zA-Z%]/g, function (e) {
						"%%" !== e && (i++, "%c" === e && (r = i));
					}),
						e.splice(r, 0, a);
				}),
				(t.save = function save(e) {
					try {
						null == e ? t.storage.removeItem("debug") : (t.storage.debug = e);
					} catch (e) {}
				}),
				(t.load = load),
				(t.useColors = function useColors() {
					if (
						"undefined" != typeof window &&
						window.process &&
						"renderer" === window.process.type
					)
						return !0;
					return (
						("undefined" != typeof document &&
							document.documentElement &&
							document.documentElement.style &&
							document.documentElement.style.WebkitAppearance) ||
						("undefined" != typeof window &&
							window.console &&
							(window.console.firebug ||
								(window.console.exception && window.console.table))) ||
						("undefined" != typeof navigator &&
							navigator.userAgent &&
							navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
							parseInt(RegExp.$1, 10) >= 31) ||
						("undefined" != typeof navigator &&
							navigator.userAgent &&
							navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
					);
				}),
				(t.storage =
					"undefined" != typeof chrome && void 0 !== chrome.storage
						? chrome.storage.local
						: (function localstorage() {
								try {
									return window.localStorage;
								} catch (e) {}
						  })()),
				(t.colors = [
					"lightseagreen",
					"forestgreen",
					"goldenrod",
					"dodgerblue",
					"darkorchid",
					"crimson",
				]),
				(t.formatters.j = function (e) {
					try {
						return JSON.stringify(e);
					} catch (e) {
						return "[UnexpectedJSONParseError]: " + e.message;
					}
				}),
				t.enable(load());
		},
		function (e, t) {
			var n = 1e3,
				a = 6e4,
				i = 60 * a,
				r = 24 * i;
			function plural(e, t, n) {
				if (!(e < t))
					return e < 1.5 * t
						? Math.floor(e / t) + " " + n
						: Math.ceil(e / t) + " " + n + "s";
			}
			e.exports = function (e, t) {
				t = t || {};
				var o = typeof e;
				if ("string" === o && e.length > 0)
					return (function parse(e) {
						if ((e = String(e)).length > 100) return;
						var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
							e
						);
						if (!t) return;
						var o = parseFloat(t[1]);
						switch ((t[2] || "ms").toLowerCase()) {
							case "years":
							case "year":
							case "yrs":
							case "yr":
							case "y":
								return 315576e5 * o;
							case "days":
							case "day":
							case "d":
								return o * r;
							case "hours":
							case "hour":
							case "hrs":
							case "hr":
							case "h":
								return o * i;
							case "minutes":
							case "minute":
							case "mins":
							case "min":
							case "m":
								return o * a;
							case "seconds":
							case "second":
							case "secs":
							case "sec":
							case "s":
								return o * n;
							case "milliseconds":
							case "millisecond":
							case "msecs":
							case "msec":
							case "ms":
								return o;
							default:
								return;
						}
					})(e);
				if ("number" === o && !1 === isNaN(e))
					return t.long
						? (function fmtLong(e) {
								return (
									plural(e, r, "day") ||
									plural(e, i, "hour") ||
									plural(e, a, "minute") ||
									plural(e, n, "second") ||
									e + " ms"
								);
						  })(e)
						: (function fmtShort(e) {
								if (e >= r) return Math.round(e / r) + "d";
								if (e >= i) return Math.round(e / i) + "h";
								if (e >= a) return Math.round(e / a) + "m";
								if (e >= n) return Math.round(e / n) + "s";
								return e + "ms";
						  })(e);
				throw new Error(
					"val is not a non-empty string or a valid number. val=" + JSON.stringify(e)
				);
			};
		},
		function (e, t, n) {
			var a = n(26),
				i = n(10);
			((t = e.exports = n(58)).init = function init(e) {
				e.inspectOpts = {};
				for (var n = Object.keys(t.inspectOpts), a = 0; a < n.length; a++)
					e.inspectOpts[n[a]] = t.inspectOpts[n[a]];
			}),
				(t.log = function log() {
					return o.write(i.format.apply(i, arguments) + "\n");
				}),
				(t.formatArgs = function formatArgs(e) {
					var n = this.namespace;
					if (this.useColors) {
						var a = this.color,
							i = "  [3" + a + ";1m" + n + " [0m";
						(e[0] = i + e[0].split("\n").join("\n" + i)),
							e.push("[3" + a + "m+" + t.humanize(this.diff) + "[0m");
					} else e[0] = new Date().toUTCString() + " " + n + " " + e[0];
				}),
				(t.save = function save(e) {
					null == e ? delete process.env.DEBUG : (process.env.DEBUG = e);
				}),
				(t.load = load),
				(t.useColors = function useColors() {
					return "colors" in t.inspectOpts ? Boolean(t.inspectOpts.colors) : a.isatty(r);
				}),
				(t.colors = [6, 2, 3, 4, 5, 1]),
				(t.inspectOpts = Object.keys(process.env)
					.filter(function (e) {
						return /^debug_/i.test(e);
					})
					.reduce(function (e, t) {
						var n = t
								.substring(6)
								.toLowerCase()
								.replace(/_([a-z])/g, function (e, t) {
									return t.toUpperCase();
								}),
							a = process.env[t];
						return (
							(a =
								!!/^(yes|on|true|enabled)$/i.test(a) ||
								(!/^(no|off|false|disabled)$/i.test(a) &&
									("null" === a ? null : Number(a)))),
							(e[n] = a),
							e
						);
					}, {}));
			var r = parseInt(process.env.DEBUG_FD, 10) || 2;
			1 !== r &&
				2 !== r &&
				i.deprecate(function () {},
				"except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
			var o =
				1 === r
					? process.stdout
					: 2 === r
					? process.stderr
					: (function createWritableStdioStream(e) {
							var t;
							switch (process.binding("tty_wrap").guessHandleType(e)) {
								case "TTY":
									((t = new a.WriteStream(e))._type = "tty"),
										t._handle && t._handle.unref && t._handle.unref();
									break;
								case "FILE":
									var i = n(2);
									(t = new i.SyncWriteStream(e, { autoClose: !1 }))._type = "fs";
									break;
								case "PIPE":
								case "TCP":
									var r = n(11);
									((t = new r.Socket({
										fd: e,
										readable: !1,
										writable: !0,
									})).readable = !1),
										(t.read = null),
										(t._type = "pipe"),
										t._handle && t._handle.unref && t._handle.unref();
									break;
								default:
									throw new Error("Implement me. Unknown stream file type!");
							}
							return (t.fd = e), (t._isStdio = !0), t;
					  })(r);
			function load() {
				return process.env.DEBUG;
			}
			(t.formatters.o = function (e) {
				return (
					(this.inspectOpts.colors = this.useColors),
					i
						.inspect(e, this.inspectOpts)
						.split("\n")
						.map(function (e) {
							return e.trim();
						})
						.join(" ")
				);
			}),
				(t.formatters.O = function (e) {
					return (
						(this.inspectOpts.colors = this.useColors), i.inspect(e, this.inspectOpts)
					);
				}),
				t.enable(load());
		},
		function (e, t) {
			e.exports = function pathtoRegexp(e, t, a) {
				t = t || [];
				var i,
					r = (a = a || {}).strict,
					o = !1 !== a.end,
					s = a.sensitive ? "" : "i",
					c = 0,
					p = t.length,
					l = 0,
					u = 0;
				if (e instanceof RegExp) {
					for (; (i = n.exec(e.source)); )
						t.push({ name: u++, optional: !1, offset: i.index });
					return e;
				}
				if (Array.isArray(e))
					return (
						(e = e.map(function (e) {
							return pathtoRegexp(e, t, a).source;
						})),
						new RegExp("(?:" + e.join("|") + ")", s)
					);
				e = ("^" + e + (r ? "" : "/" === e[e.length - 1] ? "?" : "/?"))
					.replace(/\/\(/g, "/(?:")
					.replace(/([\/\.])/g, "\\$1")
					.replace(
						/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g,
						function (e, n, a, i, r, o, s, p) {
							(n = n || ""),
								(a = a || ""),
								(r = r || "([^\\/" + a + "]+?)"),
								(s = s || ""),
								t.push({ name: i, optional: !!s, offset: p + c });
							var l =
								(s ? "" : n) +
								"(?:" +
								a +
								(s ? n : "") +
								r +
								(o ? "((?:[\\/" + a + "].+?)?)" : "") +
								")" +
								s;
							return (c += l.length - e.length), l;
						}
					)
					.replace(/\*/g, function (e, n) {
						for (var a = t.length; a-- > p && t[a].offset > n; ) t[a].offset += 3;
						return "(.*)";
					});
				for (; (i = n.exec(e)); ) {
					for (var d = 0, m = i.index; "\\" === e.charAt(--m); ) d++;
					d % 2 != 1 &&
						((p + l === t.length || t[p + l].offset > i.index) &&
							t.splice(p + l, 0, { name: u++, optional: !1, offset: i.index }),
						l++);
				}
				return (
					(e += o ? "$" : "/" === e[e.length - 1] ? "" : "(?=\\/|$)"), new RegExp(e, s)
				);
			};
			var n = /\((?!\?)/g;
		},
		function (e, t, n) {
			"use strict";
			var a = n(23);
			t.init = function (e) {
				return function expressInit(t, n, i) {
					e.enabled("x-powered-by") && n.setHeader("X-Powered-By", "Express"),
						(t.res = n),
						(n.req = t),
						(t.next = i),
						a(t, e.request),
						a(n, e.response),
						(n.locals = n.locals || Object.create(null)),
						i();
				};
			};
		},
		function (e, t, n) {
			"use strict";
			var a = n(20)("express:view"),
				i = n(1),
				r = n(2),
				o = i.dirname,
				s = i.basename,
				c = i.extname,
				p = i.join,
				l = i.resolve;
			function View(e, t) {
				var i = t || {};
				if (
					((this.defaultEngine = i.defaultEngine),
					(this.ext = c(e)),
					(this.name = e),
					(this.root = i.root),
					!this.ext && !this.defaultEngine)
				)
					throw new Error(
						"No default engine was specified and no extension was provided."
					);
				var r = e;
				if (
					(this.ext ||
						((this.ext =
							"." !== this.defaultEngine[0]
								? "." + this.defaultEngine
								: this.defaultEngine),
						(r += this.ext)),
					!i.engines[this.ext])
				) {
					var o = this.ext.substr(1);
					a('require "%s"', o);
					var s = n(141)(o).__express;
					if ("function" != typeof s)
						throw new Error('Module "' + o + '" does not provide a view engine.');
					i.engines[this.ext] = s;
				}
				(this.engine = i.engines[this.ext]), (this.path = this.lookup(r));
			}
			function tryStat(e) {
				a('stat "%s"', e);
				try {
					return r.statSync(e);
				} catch (e) {
					return;
				}
			}
			(e.exports = View),
				(View.prototype.lookup = function lookup(e) {
					var t,
						n = [].concat(this.root);
					a('lookup "%s"', e);
					for (var i = 0; i < n.length && !t; i++) {
						var r = n[i],
							c = l(r, e),
							p = o(c),
							u = s(c);
						t = this.resolve(p, u);
					}
					return t;
				}),
				(View.prototype.render = function render(e, t) {
					a('render "%s"', this.path), this.engine(this.path, e, t);
				}),
				(View.prototype.resolve = function resolve(e, t) {
					var n = this.ext,
						a = p(e, t),
						i = tryStat(a);
					return (i && i.isFile()) ||
						((i = tryStat((a = p(e, s(t, n), "index" + n)))) && i.isFile())
						? a
						: void 0;
				});
		},
		function (e, t) {
			function webpackEmptyContext(e) {
				var t = new Error("Cannot find module '" + e + "'");
				throw ((t.code = "MODULE_NOT_FOUND"), t);
			}
			(webpackEmptyContext.keys = function () {
				return [];
			}),
				(webpackEmptyContext.resolve = webpackEmptyContext),
				(e.exports = webpackEmptyContext),
				(webpackEmptyContext.id = 141);
		},
		function (e, t, n) {
			"undefined" != typeof process && "renderer" === process.type
				? (e.exports = n(143))
				: (e.exports = n(145));
		},
		function (e, t, n) {
			function load() {
				var e;
				try {
					e = t.storage.debug;
				} catch (e) {}
				return (
					!e &&
						"undefined" != typeof process &&
						"env" in process &&
						(e = process.env.DEBUG),
					e
				);
			}
			((t = e.exports = n(62)).log = function log() {
				return (
					"object" == typeof console &&
					console.log &&
					Function.prototype.apply.call(console.log, console, arguments)
				);
			}),
				(t.formatArgs = function formatArgs(e) {
					var n = this.useColors;
					if (
						((e[0] =
							(n ? "%c" : "") +
							this.namespace +
							(n ? " %c" : " ") +
							e[0] +
							(n ? "%c " : " ") +
							"+" +
							t.humanize(this.diff)),
						!n)
					)
						return;
					var a = "color: " + this.color;
					e.splice(1, 0, a, "color: inherit");
					var i = 0,
						r = 0;
					e[0].replace(/%[a-zA-Z%]/g, function (e) {
						"%%" !== e && (i++, "%c" === e && (r = i));
					}),
						e.splice(r, 0, a);
				}),
				(t.save = function save(e) {
					try {
						null == e ? t.storage.removeItem("debug") : (t.storage.debug = e);
					} catch (e) {}
				}),
				(t.load = load),
				(t.useColors = function useColors() {
					if (
						"undefined" != typeof window &&
						window.process &&
						"renderer" === window.process.type
					)
						return !0;
					return (
						("undefined" != typeof document &&
							document.documentElement &&
							document.documentElement.style &&
							document.documentElement.style.WebkitAppearance) ||
						("undefined" != typeof window &&
							window.console &&
							(window.console.firebug ||
								(window.console.exception && window.console.table))) ||
						("undefined" != typeof navigator &&
							navigator.userAgent &&
							navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
							parseInt(RegExp.$1, 10) >= 31) ||
						("undefined" != typeof navigator &&
							navigator.userAgent &&
							navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
					);
				}),
				(t.storage =
					"undefined" != typeof chrome && void 0 !== chrome.storage
						? chrome.storage.local
						: (function localstorage() {
								try {
									return window.localStorage;
								} catch (e) {}
						  })()),
				(t.colors = [
					"lightseagreen",
					"forestgreen",
					"goldenrod",
					"dodgerblue",
					"darkorchid",
					"crimson",
				]),
				(t.formatters.j = function (e) {
					try {
						return JSON.stringify(e);
					} catch (e) {
						return "[UnexpectedJSONParseError]: " + e.message;
					}
				}),
				t.enable(load());
		},
		function (e, t) {
			var n = 1e3,
				a = 6e4,
				i = 60 * a,
				r = 24 * i;
			function plural(e, t, n) {
				if (!(e < t))
					return e < 1.5 * t
						? Math.floor(e / t) + " " + n
						: Math.ceil(e / t) + " " + n + "s";
			}
			e.exports = function (e, t) {
				t = t || {};
				var o = typeof e;
				if ("string" === o && e.length > 0)
					return (function parse(e) {
						if ((e = String(e)).length > 100) return;
						var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
							e
						);
						if (!t) return;
						var o = parseFloat(t[1]);
						switch ((t[2] || "ms").toLowerCase()) {
							case "years":
							case "year":
							case "yrs":
							case "yr":
							case "y":
								return 315576e5 * o;
							case "days":
							case "day":
							case "d":
								return o * r;
							case "hours":
							case "hour":
							case "hrs":
							case "hr":
							case "h":
								return o * i;
							case "minutes":
							case "minute":
							case "mins":
							case "min":
							case "m":
								return o * a;
							case "seconds":
							case "second":
							case "secs":
							case "sec":
							case "s":
								return o * n;
							case "milliseconds":
							case "millisecond":
							case "msecs":
							case "msec":
							case "ms":
								return o;
							default:
								return;
						}
					})(e);
				if ("number" === o && !1 === isNaN(e))
					return t.long
						? (function fmtLong(e) {
								return (
									plural(e, r, "day") ||
									plural(e, i, "hour") ||
									plural(e, a, "minute") ||
									plural(e, n, "second") ||
									e + " ms"
								);
						  })(e)
						: (function fmtShort(e) {
								if (e >= r) return Math.round(e / r) + "d";
								if (e >= i) return Math.round(e / i) + "h";
								if (e >= a) return Math.round(e / a) + "m";
								if (e >= n) return Math.round(e / n) + "s";
								return e + "ms";
						  })(e);
				throw new Error(
					"val is not a non-empty string or a valid number. val=" + JSON.stringify(e)
				);
			};
		},
		function (e, t, n) {
			var a = n(26),
				i = n(10);
			((t = e.exports = n(62)).init = function init(e) {
				e.inspectOpts = {};
				for (var n = Object.keys(t.inspectOpts), a = 0; a < n.length; a++)
					e.inspectOpts[n[a]] = t.inspectOpts[n[a]];
			}),
				(t.log = function log() {
					return o.write(i.format.apply(i, arguments) + "\n");
				}),
				(t.formatArgs = function formatArgs(e) {
					var n = this.namespace;
					if (this.useColors) {
						var a = this.color,
							i = "  [3" + a + ";1m" + n + " [0m";
						(e[0] = i + e[0].split("\n").join("\n" + i)),
							e.push("[3" + a + "m+" + t.humanize(this.diff) + "[0m");
					} else e[0] = new Date().toUTCString() + " " + n + " " + e[0];
				}),
				(t.save = function save(e) {
					null == e ? delete process.env.DEBUG : (process.env.DEBUG = e);
				}),
				(t.load = load),
				(t.useColors = function useColors() {
					return "colors" in t.inspectOpts ? Boolean(t.inspectOpts.colors) : a.isatty(r);
				}),
				(t.colors = [6, 2, 3, 4, 5, 1]),
				(t.inspectOpts = Object.keys(process.env)
					.filter(function (e) {
						return /^debug_/i.test(e);
					})
					.reduce(function (e, t) {
						var n = t
								.substring(6)
								.toLowerCase()
								.replace(/_([a-z])/g, function (e, t) {
									return t.toUpperCase();
								}),
							a = process.env[t];
						return (
							(a =
								!!/^(yes|on|true|enabled)$/i.test(a) ||
								(!/^(no|off|false|disabled)$/i.test(a) &&
									("null" === a ? null : Number(a)))),
							(e[n] = a),
							e
						);
					}, {}));
			var r = parseInt(process.env.DEBUG_FD, 10) || 2;
			1 !== r &&
				2 !== r &&
				i.deprecate(function () {},
				"except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
			var o =
				1 === r
					? process.stdout
					: 2 === r
					? process.stderr
					: (function createWritableStdioStream(e) {
							var t;
							switch (process.binding("tty_wrap").guessHandleType(e)) {
								case "TTY":
									((t = new a.WriteStream(e))._type = "tty"),
										t._handle && t._handle.unref && t._handle.unref();
									break;
								case "FILE":
									var i = n(2);
									(t = new i.SyncWriteStream(e, { autoClose: !1 }))._type = "fs";
									break;
								case "PIPE":
								case "TCP":
									var r = n(11);
									((t = new r.Socket({
										fd: e,
										readable: !1,
										writable: !0,
									})).readable = !1),
										(t.read = null),
										(t._type = "pipe"),
										t._handle && t._handle.unref && t._handle.unref();
									break;
								default:
									throw new Error("Implement me. Unknown stream file type!");
							}
							return (t.fd = e), (t._isStdio = !0), t;
					  })(r);
			function load() {
				return process.env.DEBUG;
			}
			(t.formatters.o = function (e) {
				return (
					(this.inspectOpts.colors = this.useColors),
					i
						.inspect(e, this.inspectOpts)
						.split("\n")
						.map(function (e) {
							return e.trim();
						})
						.join(" ")
				);
			}),
				(t.formatters.O = function (e) {
					return (
						(this.inspectOpts.colors = this.useColors), i.inspect(e, this.inspectOpts)
					);
				}),
				t.enable(load());
		},
		function (e, t, n) {
			"use strict";
			var a = n(2).ReadStream,
				i = n(0);
			function onOpenClose() {
				"number" == typeof this.fd && this.close();
			}
			e.exports = function destroy(e) {
				if (e instanceof a)
					return (function destroyReadStream(e) {
						e.destroy(), "function" == typeof e.close && e.on("open", onOpenClose);
						return e;
					})(e);
				if (!(e instanceof i)) return e;
				"function" == typeof e.destroy && e.destroy();
				return e;
			};
		},
		function (e, t, n) {
			n(1);
			var a = n(2);
			function Mime() {
				(this.types = Object.create(null)), (this.extensions = Object.create(null));
			}
			(Mime.prototype.define = function (e) {
				for (var t in e) {
					for (var n = e[t], a = 0; a < n.length; a++)
						process.env.DEBUG_MIME &&
							this.types[n[a]] &&
							console.warn(
								(this._loading || "define()").replace(/.*\//, ""),
								'changes "' +
									n[a] +
									'" extension type from ' +
									this.types[n[a]] +
									" to " +
									t
							),
							(this.types[n[a]] = t);
					this.extensions[t] || (this.extensions[t] = n[0]);
				}
			}),
				(Mime.prototype.load = function (e) {
					this._loading = e;
					var t = {};
					a
						.readFileSync(e, "ascii")
						.split(/[\r\n]+/)
						.forEach(function (e) {
							var n = e.replace(/\s*#.*|^\s*|\s*$/g, "").split(/\s+/);
							t[n.shift()] = n;
						}),
						this.define(t),
						(this._loading = null);
				}),
				(Mime.prototype.lookup = function (e, t) {
					var n = e.replace(/^.*[\.\/\\]/, "").toLowerCase();
					return this.types[n] || t || this.default_type;
				}),
				(Mime.prototype.extension = function (e) {
					var t = e.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();
					return this.extensions[t];
				});
			var i = new Mime();
			i.define(n(148)),
				(i.default_type = i.lookup("bin")),
				(i.Mime = Mime),
				(i.charsets = {
					lookup: function (e, t) {
						return /^text\/|^application\/(javascript|json)/.test(e) ? "UTF-8" : t;
					},
				}),
				(e.exports = i);
		},
		function (e) {
			e.exports = JSON.parse(
				'{"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/bdoc":["bdoc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/font-woff":[],"application/font-woff2":[],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/prs.cww":["cww"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/vnd.3gpp.pic-bw-large":["plb"],"application/vnd.3gpp.pic-bw-small":["psb"],"application/vnd.3gpp.pic-bw-var":["pvb"],"application/vnd.3gpp2.tcap":["tcap"],"application/vnd.3m.post-it-notes":["pwn"],"application/vnd.accpac.simply.aso":["aso"],"application/vnd.accpac.simply.imp":["imp"],"application/vnd.acucobol":["acu"],"application/vnd.acucorp":["atc","acutc"],"application/vnd.adobe.air-application-installer-package+zip":["air"],"application/vnd.adobe.formscentral.fcdt":["fcdt"],"application/vnd.adobe.fxp":["fxp","fxpl"],"application/vnd.adobe.xdp+xml":["xdp"],"application/vnd.adobe.xfdf":["xfdf"],"application/vnd.ahead.space":["ahead"],"application/vnd.airzip.filesecure.azf":["azf"],"application/vnd.airzip.filesecure.azs":["azs"],"application/vnd.amazon.ebook":["azw"],"application/vnd.americandynamics.acc":["acc"],"application/vnd.amiga.ami":["ami"],"application/vnd.android.package-archive":["apk"],"application/vnd.anser-web-certificate-issue-initiation":["cii"],"application/vnd.anser-web-funds-transfer-initiation":["fti"],"application/vnd.antix.game-component":["atx"],"application/vnd.apple.installer+xml":["mpkg"],"application/vnd.apple.mpegurl":["m3u8"],"application/vnd.apple.pkpass":["pkpass"],"application/vnd.aristanetworks.swi":["swi"],"application/vnd.astraea-software.iota":["iota"],"application/vnd.audiograph":["aep"],"application/vnd.blueice.multipass":["mpm"],"application/vnd.bmi":["bmi"],"application/vnd.businessobjects":["rep"],"application/vnd.chemdraw+xml":["cdxml"],"application/vnd.chipnuts.karaoke-mmd":["mmd"],"application/vnd.cinderella":["cdy"],"application/vnd.claymore":["cla"],"application/vnd.cloanto.rp9":["rp9"],"application/vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"application/vnd.cluetrust.cartomobile-config":["c11amc"],"application/vnd.cluetrust.cartomobile-config-pkg":["c11amz"],"application/vnd.commonspace":["csp"],"application/vnd.contact.cmsg":["cdbcmsg"],"application/vnd.cosmocaller":["cmc"],"application/vnd.crick.clicker":["clkx"],"application/vnd.crick.clicker.keyboard":["clkk"],"application/vnd.crick.clicker.palette":["clkp"],"application/vnd.crick.clicker.template":["clkt"],"application/vnd.crick.clicker.wordbank":["clkw"],"application/vnd.criticaltools.wbs+xml":["wbs"],"application/vnd.ctc-posml":["pml"],"application/vnd.cups-ppd":["ppd"],"application/vnd.curl.car":["car"],"application/vnd.curl.pcurl":["pcurl"],"application/vnd.dart":["dart"],"application/vnd.data-vision.rdz":["rdz"],"application/vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"application/vnd.dece.ttml+xml":["uvt","uvvt"],"application/vnd.dece.unspecified":["uvx","uvvx"],"application/vnd.dece.zip":["uvz","uvvz"],"application/vnd.denovo.fcselayout-link":["fe_launch"],"application/vnd.dna":["dna"],"application/vnd.dolby.mlp":["mlp"],"application/vnd.dpgraph":["dpg"],"application/vnd.dreamfactory":["dfac"],"application/vnd.ds-keypoint":["kpxx"],"application/vnd.dvb.ait":["ait"],"application/vnd.dvb.service":["svc"],"application/vnd.dynageo":["geo"],"application/vnd.ecowin.chart":["mag"],"application/vnd.enliven":["nml"],"application/vnd.epson.esf":["esf"],"application/vnd.epson.msf":["msf"],"application/vnd.epson.quickanime":["qam"],"application/vnd.epson.salt":["slt"],"application/vnd.epson.ssf":["ssf"],"application/vnd.eszigno3+xml":["es3","et3"],"application/vnd.ezpix-album":["ez2"],"application/vnd.ezpix-package":["ez3"],"application/vnd.fdf":["fdf"],"application/vnd.fdsn.mseed":["mseed"],"application/vnd.fdsn.seed":["seed","dataless"],"application/vnd.flographit":["gph"],"application/vnd.fluxtime.clip":["ftc"],"application/vnd.framemaker":["fm","frame","maker","book"],"application/vnd.frogans.fnc":["fnc"],"application/vnd.frogans.ltf":["ltf"],"application/vnd.fsc.weblaunch":["fsc"],"application/vnd.fujitsu.oasys":["oas"],"application/vnd.fujitsu.oasys2":["oa2"],"application/vnd.fujitsu.oasys3":["oa3"],"application/vnd.fujitsu.oasysgp":["fg5"],"application/vnd.fujitsu.oasysprs":["bh2"],"application/vnd.fujixerox.ddd":["ddd"],"application/vnd.fujixerox.docuworks":["xdw"],"application/vnd.fujixerox.docuworks.binder":["xbd"],"application/vnd.fuzzysheet":["fzs"],"application/vnd.genomatix.tuxedo":["txd"],"application/vnd.geogebra.file":["ggb"],"application/vnd.geogebra.tool":["ggt"],"application/vnd.geometry-explorer":["gex","gre"],"application/vnd.geonext":["gxt"],"application/vnd.geoplan":["g2w"],"application/vnd.geospace":["g3w"],"application/vnd.gmx":["gmx"],"application/vnd.google-apps.document":["gdoc"],"application/vnd.google-apps.presentation":["gslides"],"application/vnd.google-apps.spreadsheet":["gsheet"],"application/vnd.google-earth.kml+xml":["kml"],"application/vnd.google-earth.kmz":["kmz"],"application/vnd.grafeq":["gqf","gqs"],"application/vnd.groove-account":["gac"],"application/vnd.groove-help":["ghf"],"application/vnd.groove-identity-message":["gim"],"application/vnd.groove-injector":["grv"],"application/vnd.groove-tool-message":["gtm"],"application/vnd.groove-tool-template":["tpl"],"application/vnd.groove-vcard":["vcg"],"application/vnd.hal+xml":["hal"],"application/vnd.handheld-entertainment+xml":["zmm"],"application/vnd.hbci":["hbci"],"application/vnd.hhe.lesson-player":["les"],"application/vnd.hp-hpgl":["hpgl"],"application/vnd.hp-hpid":["hpid"],"application/vnd.hp-hps":["hps"],"application/vnd.hp-jlyt":["jlt"],"application/vnd.hp-pcl":["pcl"],"application/vnd.hp-pclxl":["pclxl"],"application/vnd.hydrostatix.sof-data":["sfd-hdstx"],"application/vnd.ibm.minipay":["mpy"],"application/vnd.ibm.modcap":["afp","listafp","list3820"],"application/vnd.ibm.rights-management":["irm"],"application/vnd.ibm.secure-container":["sc"],"application/vnd.iccprofile":["icc","icm"],"application/vnd.igloader":["igl"],"application/vnd.immervision-ivp":["ivp"],"application/vnd.immervision-ivu":["ivu"],"application/vnd.insors.igm":["igm"],"application/vnd.intercon.formnet":["xpw","xpx"],"application/vnd.intergeo":["i2g"],"application/vnd.intu.qbo":["qbo"],"application/vnd.intu.qfx":["qfx"],"application/vnd.ipunplugged.rcprofile":["rcprofile"],"application/vnd.irepository.package+xml":["irp"],"application/vnd.is-xpr":["xpr"],"application/vnd.isac.fcs":["fcs"],"application/vnd.jam":["jam"],"application/vnd.jcp.javame.midlet-rms":["rms"],"application/vnd.jisp":["jisp"],"application/vnd.joost.joda-archive":["joda"],"application/vnd.kahootz":["ktz","ktr"],"application/vnd.kde.karbon":["karbon"],"application/vnd.kde.kchart":["chrt"],"application/vnd.kde.kformula":["kfo"],"application/vnd.kde.kivio":["flw"],"application/vnd.kde.kontour":["kon"],"application/vnd.kde.kpresenter":["kpr","kpt"],"application/vnd.kde.kspread":["ksp"],"application/vnd.kde.kword":["kwd","kwt"],"application/vnd.kenameaapp":["htke"],"application/vnd.kidspiration":["kia"],"application/vnd.kinar":["kne","knp"],"application/vnd.koan":["skp","skd","skt","skm"],"application/vnd.kodak-descriptor":["sse"],"application/vnd.las.las+xml":["lasxml"],"application/vnd.llamagraphics.life-balance.desktop":["lbd"],"application/vnd.llamagraphics.life-balance.exchange+xml":["lbe"],"application/vnd.lotus-1-2-3":["123"],"application/vnd.lotus-approach":["apr"],"application/vnd.lotus-freelance":["pre"],"application/vnd.lotus-notes":["nsf"],"application/vnd.lotus-organizer":["org"],"application/vnd.lotus-screencam":["scm"],"application/vnd.lotus-wordpro":["lwp"],"application/vnd.macports.portpkg":["portpkg"],"application/vnd.mcd":["mcd"],"application/vnd.medcalcdata":["mc1"],"application/vnd.mediastation.cdkey":["cdkey"],"application/vnd.mfer":["mwf"],"application/vnd.mfmp":["mfm"],"application/vnd.micrografx.flo":["flo"],"application/vnd.micrografx.igx":["igx"],"application/vnd.mif":["mif"],"application/vnd.mobius.daf":["daf"],"application/vnd.mobius.dis":["dis"],"application/vnd.mobius.mbk":["mbk"],"application/vnd.mobius.mqy":["mqy"],"application/vnd.mobius.msl":["msl"],"application/vnd.mobius.plc":["plc"],"application/vnd.mobius.txf":["txf"],"application/vnd.mophun.application":["mpn"],"application/vnd.mophun.certificate":["mpc"],"application/vnd.mozilla.xul+xml":["xul"],"application/vnd.ms-artgalry":["cil"],"application/vnd.ms-cab-compressed":["cab"],"application/vnd.ms-excel":["xls","xlm","xla","xlc","xlt","xlw"],"application/vnd.ms-excel.addin.macroenabled.12":["xlam"],"application/vnd.ms-excel.sheet.binary.macroenabled.12":["xlsb"],"application/vnd.ms-excel.sheet.macroenabled.12":["xlsm"],"application/vnd.ms-excel.template.macroenabled.12":["xltm"],"application/vnd.ms-fontobject":["eot"],"application/vnd.ms-htmlhelp":["chm"],"application/vnd.ms-ims":["ims"],"application/vnd.ms-lrm":["lrm"],"application/vnd.ms-officetheme":["thmx"],"application/vnd.ms-outlook":["msg"],"application/vnd.ms-pki.seccat":["cat"],"application/vnd.ms-pki.stl":["stl"],"application/vnd.ms-powerpoint":["ppt","pps","pot"],"application/vnd.ms-powerpoint.addin.macroenabled.12":["ppam"],"application/vnd.ms-powerpoint.presentation.macroenabled.12":["pptm"],"application/vnd.ms-powerpoint.slide.macroenabled.12":["sldm"],"application/vnd.ms-powerpoint.slideshow.macroenabled.12":["ppsm"],"application/vnd.ms-powerpoint.template.macroenabled.12":["potm"],"application/vnd.ms-project":["mpp","mpt"],"application/vnd.ms-word.document.macroenabled.12":["docm"],"application/vnd.ms-word.template.macroenabled.12":["dotm"],"application/vnd.ms-works":["wps","wks","wcm","wdb"],"application/vnd.ms-wpl":["wpl"],"application/vnd.ms-xpsdocument":["xps"],"application/vnd.mseq":["mseq"],"application/vnd.musician":["mus"],"application/vnd.muvee.style":["msty"],"application/vnd.mynfc":["taglet"],"application/vnd.neurolanguage.nlu":["nlu"],"application/vnd.nitf":["ntf","nitf"],"application/vnd.noblenet-directory":["nnd"],"application/vnd.noblenet-sealer":["nns"],"application/vnd.noblenet-web":["nnw"],"application/vnd.nokia.n-gage.data":["ngdat"],"application/vnd.nokia.n-gage.symbian.install":["n-gage"],"application/vnd.nokia.radio-preset":["rpst"],"application/vnd.nokia.radio-presets":["rpss"],"application/vnd.novadigm.edm":["edm"],"application/vnd.novadigm.edx":["edx"],"application/vnd.novadigm.ext":["ext"],"application/vnd.oasis.opendocument.chart":["odc"],"application/vnd.oasis.opendocument.chart-template":["otc"],"application/vnd.oasis.opendocument.database":["odb"],"application/vnd.oasis.opendocument.formula":["odf"],"application/vnd.oasis.opendocument.formula-template":["odft"],"application/vnd.oasis.opendocument.graphics":["odg"],"application/vnd.oasis.opendocument.graphics-template":["otg"],"application/vnd.oasis.opendocument.image":["odi"],"application/vnd.oasis.opendocument.image-template":["oti"],"application/vnd.oasis.opendocument.presentation":["odp"],"application/vnd.oasis.opendocument.presentation-template":["otp"],"application/vnd.oasis.opendocument.spreadsheet":["ods"],"application/vnd.oasis.opendocument.spreadsheet-template":["ots"],"application/vnd.oasis.opendocument.text":["odt"],"application/vnd.oasis.opendocument.text-master":["odm"],"application/vnd.oasis.opendocument.text-template":["ott"],"application/vnd.oasis.opendocument.text-web":["oth"],"application/vnd.olpc-sugar":["xo"],"application/vnd.oma.dd2+xml":["dd2"],"application/vnd.openofficeorg.extension":["oxt"],"application/vnd.openxmlformats-officedocument.presentationml.presentation":["pptx"],"application/vnd.openxmlformats-officedocument.presentationml.slide":["sldx"],"application/vnd.openxmlformats-officedocument.presentationml.slideshow":["ppsx"],"application/vnd.openxmlformats-officedocument.presentationml.template":["potx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":["xlsx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.template":["xltx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.document":["docx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.template":["dotx"],"application/vnd.osgeo.mapguide.package":["mgp"],"application/vnd.osgi.dp":["dp"],"application/vnd.osgi.subsystem":["esa"],"application/vnd.palm":["pdb","pqa","oprc"],"application/vnd.pawaafile":["paw"],"application/vnd.pg.format":["str"],"application/vnd.pg.osasli":["ei6"],"application/vnd.picsel":["efif"],"application/vnd.pmi.widget":["wg"],"application/vnd.pocketlearn":["plf"],"application/vnd.powerbuilder6":["pbd"],"application/vnd.previewsystems.box":["box"],"application/vnd.proteus.magazine":["mgz"],"application/vnd.publishare-delta-tree":["qps"],"application/vnd.pvi.ptid1":["ptid"],"application/vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"application/vnd.realvnc.bed":["bed"],"application/vnd.recordare.musicxml":["mxl"],"application/vnd.recordare.musicxml+xml":["musicxml"],"application/vnd.rig.cryptonote":["cryptonote"],"application/vnd.rim.cod":["cod"],"application/vnd.rn-realmedia":["rm"],"application/vnd.rn-realmedia-vbr":["rmvb"],"application/vnd.route66.link66+xml":["link66"],"application/vnd.sailingtracker.track":["st"],"application/vnd.seemail":["see"],"application/vnd.sema":["sema"],"application/vnd.semd":["semd"],"application/vnd.semf":["semf"],"application/vnd.shana.informed.formdata":["ifm"],"application/vnd.shana.informed.formtemplate":["itp"],"application/vnd.shana.informed.interchange":["iif"],"application/vnd.shana.informed.package":["ipk"],"application/vnd.simtech-mindmapper":["twd","twds"],"application/vnd.smaf":["mmf"],"application/vnd.smart.teacher":["teacher"],"application/vnd.solent.sdkm+xml":["sdkm","sdkd"],"application/vnd.spotfire.dxp":["dxp"],"application/vnd.spotfire.sfs":["sfs"],"application/vnd.stardivision.calc":["sdc"],"application/vnd.stardivision.draw":["sda"],"application/vnd.stardivision.impress":["sdd"],"application/vnd.stardivision.math":["smf"],"application/vnd.stardivision.writer":["sdw","vor"],"application/vnd.stardivision.writer-global":["sgl"],"application/vnd.stepmania.package":["smzip"],"application/vnd.stepmania.stepchart":["sm"],"application/vnd.sun.wadl+xml":["wadl"],"application/vnd.sun.xml.calc":["sxc"],"application/vnd.sun.xml.calc.template":["stc"],"application/vnd.sun.xml.draw":["sxd"],"application/vnd.sun.xml.draw.template":["std"],"application/vnd.sun.xml.impress":["sxi"],"application/vnd.sun.xml.impress.template":["sti"],"application/vnd.sun.xml.math":["sxm"],"application/vnd.sun.xml.writer":["sxw"],"application/vnd.sun.xml.writer.global":["sxg"],"application/vnd.sun.xml.writer.template":["stw"],"application/vnd.sus-calendar":["sus","susp"],"application/vnd.svd":["svd"],"application/vnd.symbian.install":["sis","sisx"],"application/vnd.syncml+xml":["xsm"],"application/vnd.syncml.dm+wbxml":["bdm"],"application/vnd.syncml.dm+xml":["xdm"],"application/vnd.tao.intent-module-archive":["tao"],"application/vnd.tcpdump.pcap":["pcap","cap","dmp"],"application/vnd.tmobile-livetv":["tmo"],"application/vnd.trid.tpt":["tpt"],"application/vnd.triscape.mxs":["mxs"],"application/vnd.trueapp":["tra"],"application/vnd.ufdl":["ufd","ufdl"],"application/vnd.uiq.theme":["utz"],"application/vnd.umajin":["umj"],"application/vnd.unity":["unityweb"],"application/vnd.uoml+xml":["uoml"],"application/vnd.vcx":["vcx"],"application/vnd.visio":["vsd","vst","vss","vsw"],"application/vnd.visionary":["vis"],"application/vnd.vsf":["vsf"],"application/vnd.wap.wbxml":["wbxml"],"application/vnd.wap.wmlc":["wmlc"],"application/vnd.wap.wmlscriptc":["wmlsc"],"application/vnd.webturbo":["wtb"],"application/vnd.wolfram.player":["nbp"],"application/vnd.wordperfect":["wpd"],"application/vnd.wqd":["wqd"],"application/vnd.wt.stf":["stf"],"application/vnd.xara":["xar"],"application/vnd.xfdl":["xfdl"],"application/vnd.yamaha.hv-dic":["hvd"],"application/vnd.yamaha.hv-script":["hvs"],"application/vnd.yamaha.hv-voice":["hvp"],"application/vnd.yamaha.openscoreformat":["osf"],"application/vnd.yamaha.openscoreformat.osfpvg+xml":["osfpvg"],"application/vnd.yamaha.smaf-audio":["saf"],"application/vnd.yamaha.smaf-phrase":["spf"],"application/vnd.yellowriver-custom-menu":["cmp"],"application/vnd.zul":["zir","zirz"],"application/vnd.zzazz.deck+xml":["zaz"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/x-7z-compressed":["7z"],"application/x-abiword":["abw"],"application/x-ace-compressed":["ace"],"application/x-apple-diskimage":[],"application/x-arj":["arj"],"application/x-authorware-bin":["aab","x32","u32","vox"],"application/x-authorware-map":["aam"],"application/x-authorware-seg":["aas"],"application/x-bcpio":["bcpio"],"application/x-bdoc":[],"application/x-bittorrent":["torrent"],"application/x-blorb":["blb","blorb"],"application/x-bzip":["bz"],"application/x-bzip2":["bz2","boz"],"application/x-cbr":["cbr","cba","cbt","cbz","cb7"],"application/x-cdlink":["vcd"],"application/x-cfs-compressed":["cfs"],"application/x-chat":["chat"],"application/x-chess-pgn":["pgn"],"application/x-chrome-extension":["crx"],"application/x-cocoa":["cco"],"application/x-conference":["nsc"],"application/x-cpio":["cpio"],"application/x-csh":["csh"],"application/x-debian-package":["udeb"],"application/x-dgc-compressed":["dgc"],"application/x-director":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"],"application/x-doom":["wad"],"application/x-dtbncx+xml":["ncx"],"application/x-dtbook+xml":["dtb"],"application/x-dtbresource+xml":["res"],"application/x-dvi":["dvi"],"application/x-envoy":["evy"],"application/x-eva":["eva"],"application/x-font-bdf":["bdf"],"application/x-font-ghostscript":["gsf"],"application/x-font-linux-psf":["psf"],"application/x-font-pcf":["pcf"],"application/x-font-snf":["snf"],"application/x-font-type1":["pfa","pfb","pfm","afm"],"application/x-freearc":["arc"],"application/x-futuresplash":["spl"],"application/x-gca-compressed":["gca"],"application/x-glulx":["ulx"],"application/x-gnumeric":["gnumeric"],"application/x-gramps-xml":["gramps"],"application/x-gtar":["gtar"],"application/x-hdf":["hdf"],"application/x-httpd-php":["php"],"application/x-install-instructions":["install"],"application/x-iso9660-image":[],"application/x-java-archive-diff":["jardiff"],"application/x-java-jnlp-file":["jnlp"],"application/x-latex":["latex"],"application/x-lua-bytecode":["luac"],"application/x-lzh-compressed":["lzh","lha"],"application/x-makeself":["run"],"application/x-mie":["mie"],"application/x-mobipocket-ebook":["prc","mobi"],"application/x-ms-application":["application"],"application/x-ms-shortcut":["lnk"],"application/x-ms-wmd":["wmd"],"application/x-ms-wmz":["wmz"],"application/x-ms-xbap":["xbap"],"application/x-msaccess":["mdb"],"application/x-msbinder":["obd"],"application/x-mscardfile":["crd"],"application/x-msclip":["clp"],"application/x-msdos-program":[],"application/x-msdownload":["com","bat"],"application/x-msmediaview":["mvb","m13","m14"],"application/x-msmetafile":["wmf","emf","emz"],"application/x-msmoney":["mny"],"application/x-mspublisher":["pub"],"application/x-msschedule":["scd"],"application/x-msterminal":["trm"],"application/x-mswrite":["wri"],"application/x-netcdf":["nc","cdf"],"application/x-ns-proxy-autoconfig":["pac"],"application/x-nzb":["nzb"],"application/x-perl":["pl","pm"],"application/x-pilot":[],"application/x-pkcs12":["p12","pfx"],"application/x-pkcs7-certificates":["p7b","spc"],"application/x-pkcs7-certreqresp":["p7r"],"application/x-rar-compressed":["rar"],"application/x-redhat-package-manager":["rpm"],"application/x-research-info-systems":["ris"],"application/x-sea":["sea"],"application/x-sh":["sh"],"application/x-shar":["shar"],"application/x-shockwave-flash":["swf"],"application/x-silverlight-app":["xap"],"application/x-sql":["sql"],"application/x-stuffit":["sit"],"application/x-stuffitx":["sitx"],"application/x-subrip":["srt"],"application/x-sv4cpio":["sv4cpio"],"application/x-sv4crc":["sv4crc"],"application/x-t3vm-image":["t3"],"application/x-tads":["gam"],"application/x-tar":["tar"],"application/x-tcl":["tcl","tk"],"application/x-tex":["tex"],"application/x-tex-tfm":["tfm"],"application/x-texinfo":["texinfo","texi"],"application/x-tgif":["obj"],"application/x-ustar":["ustar"],"application/x-virtualbox-hdd":["hdd"],"application/x-virtualbox-ova":["ova"],"application/x-virtualbox-ovf":["ovf"],"application/x-virtualbox-vbox":["vbox"],"application/x-virtualbox-vbox-extpack":["vbox-extpack"],"application/x-virtualbox-vdi":["vdi"],"application/x-virtualbox-vhd":["vhd"],"application/x-virtualbox-vmdk":["vmdk"],"application/x-wais-source":["src"],"application/x-web-app-manifest+json":["webapp"],"application/x-x509-ca-cert":["der","crt","pem"],"application/x-xfig":["fig"],"application/x-xliff+xml":["xlf"],"application/x-xpinstall":["xpi"],"application/x-xz":["xz"],"application/x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":[],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp3":[],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/vnd.dece.audio":["uva","uvva"],"audio/vnd.digital-winds":["eol"],"audio/vnd.dra":["dra"],"audio/vnd.dts":["dts"],"audio/vnd.dts.hd":["dtshd"],"audio/vnd.lucent.voice":["lvp"],"audio/vnd.ms-playready.media.pya":["pya"],"audio/vnd.nuera.ecelp4800":["ecelp4800"],"audio/vnd.nuera.ecelp7470":["ecelp7470"],"audio/vnd.nuera.ecelp9600":["ecelp9600"],"audio/vnd.rip":["rip"],"audio/wav":["wav"],"audio/wave":[],"audio/webm":["weba"],"audio/x-aac":["aac"],"audio/x-aiff":["aif","aiff","aifc"],"audio/x-caf":["caf"],"audio/x-flac":["flac"],"audio/x-m4a":[],"audio/x-matroska":["mka"],"audio/x-mpegurl":["m3u"],"audio/x-ms-wax":["wax"],"audio/x-ms-wma":["wma"],"audio/x-pn-realaudio":["ram","ra"],"audio/x-pn-realaudio-plugin":["rmp"],"audio/x-realaudio":[],"audio/x-wav":[],"audio/xm":["xm"],"chemical/x-cdx":["cdx"],"chemical/x-cif":["cif"],"chemical/x-cmdf":["cmdf"],"chemical/x-cml":["cml"],"chemical/x-csml":["csml"],"chemical/x-xyz":["xyz"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/g3fax":["g3"],"image/gif":["gif"],"image/ief":["ief"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/ktx":["ktx"],"image/png":["png"],"image/prs.btif":["btif"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/tiff":["tiff","tif"],"image/vnd.adobe.photoshop":["psd"],"image/vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"image/vnd.djvu":["djvu","djv"],"image/vnd.dvb.subtitle":[],"image/vnd.dwg":["dwg"],"image/vnd.dxf":["dxf"],"image/vnd.fastbidsheet":["fbs"],"image/vnd.fpx":["fpx"],"image/vnd.fst":["fst"],"image/vnd.fujixerox.edmics-mmr":["mmr"],"image/vnd.fujixerox.edmics-rlc":["rlc"],"image/vnd.ms-modi":["mdi"],"image/vnd.ms-photo":["wdp"],"image/vnd.net-fpx":["npx"],"image/vnd.wap.wbmp":["wbmp"],"image/vnd.xiff":["xif"],"image/webp":["webp"],"image/x-3ds":["3ds"],"image/x-cmu-raster":["ras"],"image/x-cmx":["cmx"],"image/x-freehand":["fh","fhc","fh4","fh5","fh7"],"image/x-icon":["ico"],"image/x-jng":["jng"],"image/x-mrsid-image":["sid"],"image/x-ms-bmp":[],"image/x-pcx":["pcx"],"image/x-pict":["pic","pct"],"image/x-portable-anymap":["pnm"],"image/x-portable-bitmap":["pbm"],"image/x-portable-graymap":["pgm"],"image/x-portable-pixmap":["ppm"],"image/x-rgb":["rgb"],"image/x-tga":["tga"],"image/x-xbitmap":["xbm"],"image/x-xpixmap":["xpm"],"image/x-xwindowdump":["xwd"],"message/rfc822":["eml","mime"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/vnd.collada+xml":["dae"],"model/vnd.dwf":["dwf"],"model/vnd.gdl":["gdl"],"model/vnd.gtw":["gtw"],"model/vnd.mts":["mts"],"model/vnd.vtu":["vtu"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["x3db","x3dbz"],"model/x3d+vrml":["x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/hjson":["hjson"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/prs.lines.tag":["dsc"],"text/richtext":["rtx"],"text/rtf":[],"text/sgml":["sgml","sgm"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vnd.curl":["curl"],"text/vnd.curl.dcurl":["dcurl"],"text/vnd.curl.mcurl":["mcurl"],"text/vnd.curl.scurl":["scurl"],"text/vnd.dvb.subtitle":["sub"],"text/vnd.fly":["fly"],"text/vnd.fmi.flexstor":["flx"],"text/vnd.graphviz":["gv"],"text/vnd.in3d.3dml":["3dml"],"text/vnd.in3d.spot":["spot"],"text/vnd.sun.j2me.app-descriptor":["jad"],"text/vnd.wap.wml":["wml"],"text/vnd.wap.wmlscript":["wmls"],"text/vtt":["vtt"],"text/x-asm":["s","asm"],"text/x-c":["c","cc","cxx","cpp","h","hh","dic"],"text/x-component":["htc"],"text/x-fortran":["f","for","f77","f90"],"text/x-handlebars-template":["hbs"],"text/x-java-source":["java"],"text/x-lua":["lua"],"text/x-markdown":["mkd"],"text/x-nfo":["nfo"],"text/x-opml":["opml"],"text/x-org":[],"text/x-pascal":["p","pas"],"text/x-processing":["pde"],"text/x-sass":["sass"],"text/x-scss":["scss"],"text/x-setext":["etx"],"text/x-sfv":["sfv"],"text/x-suse-ymp":["ymp"],"text/x-uuencode":["uu"],"text/x-vcalendar":["vcs"],"text/x-vcard":["vcf"],"text/xml":[],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/vnd.dece.hd":["uvh","uvvh"],"video/vnd.dece.mobile":["uvm","uvvm"],"video/vnd.dece.pd":["uvp","uvvp"],"video/vnd.dece.sd":["uvs","uvvs"],"video/vnd.dece.video":["uvv","uvvv"],"video/vnd.dvb.file":["dvb"],"video/vnd.fvt":["fvt"],"video/vnd.mpegurl":["mxu","m4u"],"video/vnd.ms-playready.media.pyv":["pyv"],"video/vnd.uvvu.mp4":["uvu","uvvu"],"video/vnd.vivo":["viv"],"video/webm":["webm"],"video/x-f4v":["f4v"],"video/x-fli":["fli"],"video/x-flv":["flv"],"video/x-m4v":["m4v"],"video/x-matroska":["mkv","mk3d","mks"],"video/x-mng":["mng"],"video/x-ms-asf":["asf","asx"],"video/x-ms-vob":["vob"],"video/x-ms-wm":["wm"],"video/x-ms-wmv":["wmv"],"video/x-ms-wmx":["wmx"],"video/x-ms-wvx":["wvx"],"video/x-msvideo":["avi"],"video/x-sgi-movie":["movie"],"video/x-smv":["smv"],"x-conference/x-cooltalk":["ice"]}'
			);
		},
		function (e, t) {
			var n = 1e3,
				a = 6e4,
				i = 60 * a,
				r = 24 * i;
			function plural(e, t, n, a) {
				var i = t >= 1.5 * n;
				return Math.round(e / n) + " " + a + (i ? "s" : "");
			}
			e.exports = function (e, t) {
				t = t || {};
				var o = typeof e;
				if ("string" === o && e.length > 0)
					return (function parse(e) {
						if ((e = String(e)).length > 100) return;
						var t = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
							e
						);
						if (!t) return;
						var o = parseFloat(t[1]);
						switch ((t[2] || "ms").toLowerCase()) {
							case "years":
							case "year":
							case "yrs":
							case "yr":
							case "y":
								return 315576e5 * o;
							case "weeks":
							case "week":
							case "w":
								return 6048e5 * o;
							case "days":
							case "day":
							case "d":
								return o * r;
							case "hours":
							case "hour":
							case "hrs":
							case "hr":
							case "h":
								return o * i;
							case "minutes":
							case "minute":
							case "mins":
							case "min":
							case "m":
								return o * a;
							case "seconds":
							case "second":
							case "secs":
							case "sec":
							case "s":
								return o * n;
							case "milliseconds":
							case "millisecond":
							case "msecs":
							case "msec":
							case "ms":
								return o;
							default:
								return;
						}
					})(e);
				if ("number" === o && !1 === isNaN(e))
					return t.long
						? (function fmtLong(e) {
								var t = Math.abs(e);
								if (t >= r) return plural(e, t, r, "day");
								if (t >= i) return plural(e, t, i, "hour");
								if (t >= a) return plural(e, t, a, "minute");
								if (t >= n) return plural(e, t, n, "second");
								return e + " ms";
						  })(e)
						: (function fmtShort(e) {
								var t = Math.abs(e);
								if (t >= r) return Math.round(e / r) + "d";
								if (t >= i) return Math.round(e / i) + "h";
								if (t >= a) return Math.round(e / a) + "m";
								if (t >= n) return Math.round(e / n) + "s";
								return e + "ms";
						  })(e);
				throw new Error(
					"val is not a non-empty string or a valid number. val=" + JSON.stringify(e)
				);
			};
		},
		function (e, t, n) {
			"use strict";
			e.exports = function forwarded(e) {
				if (!e) throw new TypeError("argument req is required");
				var t = (function parse(e) {
					for (var t = e.length, n = [], a = e.length, i = e.length - 1; i >= 0; i--)
						switch (e.charCodeAt(i)) {
							case 32:
								a === t && (a = t = i);
								break;
							case 44:
								a !== t && n.push(e.substring(a, t)), (a = t = i);
								break;
							default:
								a = i;
						}
					a !== t && n.push(e.substring(a, t));
					return n;
				})(e.headers["x-forwarded-for"] || "");
				return [e.connection.remoteAddress].concat(t);
			};
		},
		function (e, t, n) {
			(function (e) {
				(function () {
					var t, n, a, i, r, o, s;
					(n = {}),
						null !== e && e.exports ? (e.exports = n) : (this.ipaddr = n),
						(s = function (e, t, n, a) {
							var i, r;
							if (e.length !== t.length)
								throw new Error(
									"ipaddr: cannot match CIDR for objects with different lengths"
								);
							for (i = 0; a > 0; ) {
								if (((r = n - a) < 0 && (r = 0), e[i] >> r != t[i] >> r)) return !1;
								(a -= n), (i += 1);
							}
							return !0;
						}),
						(n.subnetMatch = function (e, t, n) {
							var a, i, r, o, s;
							for (r in (null == n && (n = "unicast"), t))
								for (
									!(o = t[r])[0] || o[0] instanceof Array || (o = [o]),
										a = 0,
										i = o.length;
									a < i;
									a++
								)
									if (
										((s = o[a]),
										e.kind() === s[0].kind() && e.match.apply(e, s))
									)
										return r;
							return n;
						}),
						(n.IPv4 = (function () {
							function IPv4(e) {
								var t, n, a;
								if (4 !== e.length)
									throw new Error("ipaddr: ipv4 octet count should be 4");
								for (t = 0, n = e.length; t < n; t++)
									if (!(0 <= (a = e[t]) && a <= 255))
										throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
								this.octets = e;
							}
							return (
								(IPv4.prototype.kind = function () {
									return "ipv4";
								}),
								(IPv4.prototype.toString = function () {
									return this.octets.join(".");
								}),
								(IPv4.prototype.toNormalizedString = function () {
									return this.toString();
								}),
								(IPv4.prototype.toByteArray = function () {
									return this.octets.slice(0);
								}),
								(IPv4.prototype.match = function (e, t) {
									var n;
									if (
										(void 0 === t && ((e = (n = e)[0]), (t = n[1])),
										"ipv4" !== e.kind())
									)
										throw new Error(
											"ipaddr: cannot match ipv4 address with non-ipv4 one"
										);
									return s(this.octets, e.octets, 8, t);
								}),
								(IPv4.prototype.SpecialRanges = {
									unspecified: [[new IPv4([0, 0, 0, 0]), 8]],
									broadcast: [[new IPv4([255, 255, 255, 255]), 32]],
									multicast: [[new IPv4([224, 0, 0, 0]), 4]],
									linkLocal: [[new IPv4([169, 254, 0, 0]), 16]],
									loopback: [[new IPv4([127, 0, 0, 0]), 8]],
									carrierGradeNat: [[new IPv4([100, 64, 0, 0]), 10]],
									private: [
										[new IPv4([10, 0, 0, 0]), 8],
										[new IPv4([172, 16, 0, 0]), 12],
										[new IPv4([192, 168, 0, 0]), 16],
									],
									reserved: [
										[new IPv4([192, 0, 0, 0]), 24],
										[new IPv4([192, 0, 2, 0]), 24],
										[new IPv4([192, 88, 99, 0]), 24],
										[new IPv4([198, 51, 100, 0]), 24],
										[new IPv4([203, 0, 113, 0]), 24],
										[new IPv4([240, 0, 0, 0]), 4],
									],
								}),
								(IPv4.prototype.range = function () {
									return n.subnetMatch(this, this.SpecialRanges);
								}),
								(IPv4.prototype.toIPv4MappedAddress = function () {
									return n.IPv6.parse("::ffff:" + this.toString());
								}),
								(IPv4.prototype.prefixLengthFromSubnetMask = function () {
									var e, t, n, a, i, r, o;
									for (
										o = {
											0: 8,
											128: 7,
											192: 6,
											224: 5,
											240: 4,
											248: 3,
											252: 2,
											254: 1,
											255: 0,
										},
											e = 0,
											i = !1,
											t = n = 3;
										n >= 0;
										t = n += -1
									) {
										if (!((a = this.octets[t]) in o)) return null;
										if (((r = o[a]), i && 0 !== r)) return null;
										8 !== r && (i = !0), (e += r);
									}
									return 32 - e;
								}),
								IPv4
							);
						})()),
						(a = "(0?\\d+|0x[a-f0-9]+)"),
						(i = {
							fourOctet: new RegExp(
								"^" + a + "\\." + a + "\\." + a + "\\." + a + "$",
								"i"
							),
							longValue: new RegExp("^" + a + "$", "i"),
						}),
						(n.IPv4.parser = function (e) {
							var t, n, a, r, o;
							if (
								((n = function (e) {
									return "0" === e[0] && "x" !== e[1]
										? parseInt(e, 8)
										: parseInt(e);
								}),
								(t = e.match(i.fourOctet)))
							)
								return (function () {
									var e, i, r, o;
									for (o = [], e = 0, i = (r = t.slice(1, 6)).length; e < i; e++)
										(a = r[e]), o.push(n(a));
									return o;
								})();
							if ((t = e.match(i.longValue))) {
								if ((o = n(t[1])) > 4294967295 || o < 0)
									throw new Error("ipaddr: address outside defined range");
								return (function () {
									var e, t;
									for (t = [], r = e = 0; e <= 24; r = e += 8)
										t.push((o >> r) & 255);
									return t;
								})().reverse();
							}
							return null;
						}),
						(n.IPv6 = (function () {
							function IPv6(e, t) {
								var n, a, i, r, o, s;
								if (16 === e.length)
									for (this.parts = [], n = a = 0; a <= 14; n = a += 2)
										this.parts.push((e[n] << 8) | e[n + 1]);
								else {
									if (8 !== e.length)
										throw new Error(
											"ipaddr: ipv6 part count should be 8 or 16"
										);
									this.parts = e;
								}
								for (i = 0, r = (s = this.parts).length; i < r; i++)
									if (!(0 <= (o = s[i]) && o <= 65535))
										throw new Error("ipaddr: ipv6 part should fit in 16 bits");
								t && (this.zoneId = t);
							}
							return (
								(IPv6.prototype.kind = function () {
									return "ipv6";
								}),
								(IPv6.prototype.toString = function () {
									return this.toNormalizedString().replace(
										/((^|:)(0(:|$))+)/,
										"::"
									);
								}),
								(IPv6.prototype.toRFC5952String = function () {
									var e, t, n, a, i;
									for (
										a = /((^|:)(0(:|$)){2,})/g,
											i = this.toNormalizedString(),
											e = 0,
											t = -1;
										(n = a.exec(i));

									)
										n[0].length > t && ((e = n.index), (t = n[0].length));
									return t < 0
										? i
										: i.substring(0, e) + "::" + i.substring(e + t);
								}),
								(IPv6.prototype.toByteArray = function () {
									var e, t, n, a, i;
									for (e = [], t = 0, n = (i = this.parts).length; t < n; t++)
										(a = i[t]), e.push(a >> 8), e.push(255 & a);
									return e;
								}),
								(IPv6.prototype.toNormalizedString = function () {
									var e, t, n;
									return (
										(e = function () {
											var e, n, a, i;
											for (
												i = [], e = 0, n = (a = this.parts).length;
												e < n;
												e++
											)
												(t = a[e]), i.push(t.toString(16));
											return i;
										}
											.call(this)
											.join(":")),
										(n = ""),
										this.zoneId && (n = "%" + this.zoneId),
										e + n
									);
								}),
								(IPv6.prototype.toFixedLengthString = function () {
									var e, t, n;
									return (
										(e = function () {
											var e, n, a, i;
											for (
												i = [], e = 0, n = (a = this.parts).length;
												e < n;
												e++
											)
												(t = a[e]), i.push(t.toString(16).padStart(4, "0"));
											return i;
										}
											.call(this)
											.join(":")),
										(n = ""),
										this.zoneId && (n = "%" + this.zoneId),
										e + n
									);
								}),
								(IPv6.prototype.match = function (e, t) {
									var n;
									if (
										(void 0 === t && ((e = (n = e)[0]), (t = n[1])),
										"ipv6" !== e.kind())
									)
										throw new Error(
											"ipaddr: cannot match ipv6 address with non-ipv6 one"
										);
									return s(this.parts, e.parts, 16, t);
								}),
								(IPv6.prototype.SpecialRanges = {
									unspecified: [new IPv6([0, 0, 0, 0, 0, 0, 0, 0]), 128],
									linkLocal: [new IPv6([65152, 0, 0, 0, 0, 0, 0, 0]), 10],
									multicast: [new IPv6([65280, 0, 0, 0, 0, 0, 0, 0]), 8],
									loopback: [new IPv6([0, 0, 0, 0, 0, 0, 0, 1]), 128],
									uniqueLocal: [new IPv6([64512, 0, 0, 0, 0, 0, 0, 0]), 7],
									ipv4Mapped: [new IPv6([0, 0, 0, 0, 0, 65535, 0, 0]), 96],
									rfc6145: [new IPv6([0, 0, 0, 0, 65535, 0, 0, 0]), 96],
									rfc6052: [new IPv6([100, 65435, 0, 0, 0, 0, 0, 0]), 96],
									"6to4": [new IPv6([8194, 0, 0, 0, 0, 0, 0, 0]), 16],
									teredo: [new IPv6([8193, 0, 0, 0, 0, 0, 0, 0]), 32],
									reserved: [[new IPv6([8193, 3512, 0, 0, 0, 0, 0, 0]), 32]],
								}),
								(IPv6.prototype.range = function () {
									return n.subnetMatch(this, this.SpecialRanges);
								}),
								(IPv6.prototype.isIPv4MappedAddress = function () {
									return "ipv4Mapped" === this.range();
								}),
								(IPv6.prototype.toIPv4Address = function () {
									var e, t, a;
									if (!this.isIPv4MappedAddress())
										throw new Error(
											"ipaddr: trying to convert a generic ipv6 address to ipv4"
										);
									return (
										(e = (a = this.parts.slice(-2))[0]),
										(t = a[1]),
										new n.IPv4([e >> 8, 255 & e, t >> 8, 255 & t])
									);
								}),
								(IPv6.prototype.prefixLengthFromSubnetMask = function () {
									var e, t, n, a, i, r, o;
									for (
										o = {
											0: 16,
											32768: 15,
											49152: 14,
											57344: 13,
											61440: 12,
											63488: 11,
											64512: 10,
											65024: 9,
											65280: 8,
											65408: 7,
											65472: 6,
											65504: 5,
											65520: 4,
											65528: 3,
											65532: 2,
											65534: 1,
											65535: 0,
										},
											e = 0,
											i = !1,
											t = n = 7;
										n >= 0;
										t = n += -1
									) {
										if (!((a = this.parts[t]) in o)) return null;
										if (((r = o[a]), i && 0 !== r)) return null;
										16 !== r && (i = !0), (e += r);
									}
									return 128 - e;
								}),
								IPv6
							);
						})()),
						(r = "(?:[0-9a-f]+::?)+"),
						(o = {
							zoneIndex: new RegExp("%[0-9a-z]{1,}", "i"),
							native: new RegExp(
								"^(::)?(" + r + ")?([0-9a-f]+)?(::)?(%[0-9a-z]{1,})?$",
								"i"
							),
							transitional: new RegExp(
								"^((?:" +
									r +
									")|(?:::)(?:" +
									r +
									")?)" +
									a +
									"\\." +
									a +
									"\\." +
									a +
									"\\." +
									a +
									"(%[0-9a-z]{1,})?$",
								"i"
							),
						}),
						(t = function (e, t) {
							var n, a, i, r, s, c;
							if (e.indexOf("::") !== e.lastIndexOf("::")) return null;
							for (
								(c = (e.match(o.zoneIndex) || [])[0]) &&
									((c = c.substring(1)), (e = e.replace(/%.+$/, ""))),
									n = 0,
									a = -1;
								(a = e.indexOf(":", a + 1)) >= 0;

							)
								n++;
							if (
								("::" === e.substr(0, 2) && n--,
								"::" === e.substr(-2, 2) && n--,
								n > t)
							)
								return null;
							for (s = t - n, r = ":"; s--; ) r += "0:";
							return (
								":" === (e = e.replace("::", r))[0] && (e = e.slice(1)),
								":" === e[e.length - 1] && (e = e.slice(0, -1)),
								{
									parts: (t = (function () {
										var t, n, a, r;
										for (
											r = [], t = 0, n = (a = e.split(":")).length;
											t < n;
											t++
										)
											(i = a[t]), r.push(parseInt(i, 16));
										return r;
									})()),
									zoneId: c,
								}
							);
						}),
						(n.IPv6.parser = function (e) {
							var n, a, i, r, s, c, p;
							if (o.native.test(e)) return t(e, 8);
							if (
								(r = e.match(o.transitional)) &&
								((p = r[6] || ""), (n = t(r[1].slice(0, -1) + p, 6)).parts)
							) {
								for (
									a = 0,
										i = (c = [
											parseInt(r[2]),
											parseInt(r[3]),
											parseInt(r[4]),
											parseInt(r[5]),
										]).length;
									a < i;
									a++
								)
									if (!(0 <= (s = c[a]) && s <= 255)) return null;
								return (
									n.parts.push((c[0] << 8) | c[1]),
									n.parts.push((c[2] << 8) | c[3]),
									{ parts: n.parts, zoneId: n.zoneId }
								);
							}
							return null;
						}),
						(n.IPv4.isIPv4 = n.IPv6.isIPv6 = function (e) {
							return null !== this.parser(e);
						}),
						(n.IPv4.isValid = function (e) {
							try {
								return new this(this.parser(e)), !0;
							} catch (e) {
								return e, !1;
							}
						}),
						(n.IPv4.isValidFourPartDecimal = function (e) {
							return !(
								!n.IPv4.isValid(e) || !e.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/)
							);
						}),
						(n.IPv6.isValid = function (e) {
							var t;
							if ("string" == typeof e && -1 === e.indexOf(":")) return !1;
							try {
								return new this((t = this.parser(e)).parts, t.zoneId), !0;
							} catch (e) {
								return e, !1;
							}
						}),
						(n.IPv4.parse = function (e) {
							var t;
							if (null === (t = this.parser(e)))
								throw new Error("ipaddr: string is not formatted like ip address");
							return new this(t);
						}),
						(n.IPv6.parse = function (e) {
							var t;
							if (null === (t = this.parser(e)).parts)
								throw new Error("ipaddr: string is not formatted like ip address");
							return new this(t.parts, t.zoneId);
						}),
						(n.IPv4.parseCIDR = function (e) {
							var t, n, a;
							if (
								(n = e.match(/^(.+)\/(\d+)$/)) &&
								(t = parseInt(n[2])) >= 0 &&
								t <= 32
							)
								return (
									(a = [this.parse(n[1]), t]),
									Object.defineProperty(a, "toString", {
										value: function () {
											return this.join("/");
										},
									}),
									a
								);
							throw new Error(
								"ipaddr: string is not formatted like an IPv4 CIDR range"
							);
						}),
						(n.IPv4.subnetMaskFromPrefixLength = function (e) {
							var t, n, a;
							if ((e = parseInt(e)) < 0 || e > 32)
								throw new Error("ipaddr: invalid IPv4 prefix length");
							for (a = [0, 0, 0, 0], n = 0, t = Math.floor(e / 8); n < t; )
								(a[n] = 255), n++;
							return (
								t < 4 && (a[t] = (Math.pow(2, e % 8) - 1) << (8 - (e % 8))),
								new this(a)
							);
						}),
						(n.IPv4.broadcastAddressFromCIDR = function (e) {
							var t, n, a, i, r;
							try {
								for (
									a = (t = this.parseCIDR(e))[0].toByteArray(),
										r = this.subnetMaskFromPrefixLength(t[1]).toByteArray(),
										i = [],
										n = 0;
									n < 4;

								)
									i.push(parseInt(a[n], 10) | (255 ^ parseInt(r[n], 10))), n++;
								return new this(i);
							} catch (e) {
								throw (
									(e,
									new Error("ipaddr: the address does not have IPv4 CIDR format"))
								);
							}
						}),
						(n.IPv4.networkAddressFromCIDR = function (e) {
							var t, n, a, i, r;
							try {
								for (
									a = (t = this.parseCIDR(e))[0].toByteArray(),
										r = this.subnetMaskFromPrefixLength(t[1]).toByteArray(),
										i = [],
										n = 0;
									n < 4;

								)
									i.push(parseInt(a[n], 10) & parseInt(r[n], 10)), n++;
								return new this(i);
							} catch (e) {
								throw (
									(e,
									new Error("ipaddr: the address does not have IPv4 CIDR format"))
								);
							}
						}),
						(n.IPv6.parseCIDR = function (e) {
							var t, n, a;
							if (
								(n = e.match(/^(.+)\/(\d+)$/)) &&
								(t = parseInt(n[2])) >= 0 &&
								t <= 128
							)
								return (
									(a = [this.parse(n[1]), t]),
									Object.defineProperty(a, "toString", {
										value: function () {
											return this.join("/");
										},
									}),
									a
								);
							throw new Error(
								"ipaddr: string is not formatted like an IPv6 CIDR range"
							);
						}),
						(n.isValid = function (e) {
							return n.IPv6.isValid(e) || n.IPv4.isValid(e);
						}),
						(n.parse = function (e) {
							if (n.IPv6.isValid(e)) return n.IPv6.parse(e);
							if (n.IPv4.isValid(e)) return n.IPv4.parse(e);
							throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");
						}),
						(n.parseCIDR = function (e) {
							try {
								return n.IPv6.parseCIDR(e);
							} catch (t) {
								t;
								try {
									return n.IPv4.parseCIDR(e);
								} catch (e) {
									throw (
										(e,
										new Error(
											"ipaddr: the address has neither IPv6 nor IPv4 CIDR format"
										))
									);
								}
							}
						}),
						(n.fromByteArray = function (e) {
							var t;
							if (4 === (t = e.length)) return new n.IPv4(e);
							if (16 === t) return new n.IPv6(e);
							throw new Error(
								"ipaddr: the binary input is neither an IPv6 nor IPv4 address"
							);
						}),
						(n.process = function (e) {
							var t;
							return "ipv6" === (t = this.parse(e)).kind() && t.isIPv4MappedAddress()
								? t.toIPv4Address()
								: t;
						});
				}.call(this));
			}.call(this, n(152)(e)));
		},
		function (e, t) {
			e.exports = function (e) {
				return (
					e.webpackPolyfill ||
						((e.deprecate = function () {}),
						(e.paths = []),
						e.children || (e.children = []),
						Object.defineProperty(e, "loaded", {
							enumerable: !0,
							get: function () {
								return e.l;
							},
						}),
						Object.defineProperty(e, "id", {
							enumerable: !0,
							get: function () {
								return e.i;
							},
						}),
						(e.webpackPolyfill = 1)),
					e
				);
			};
		},
		function (e, t, n) {
			"use strict";
			var a = n(154),
				i = n(6)("express"),
				r = n(11).isIP,
				o = n(18),
				s = n(4),
				c = n(64),
				p = n(65),
				l = n(19),
				u = n(66),
				d = Object.create(s.IncomingMessage.prototype);
			function defineGetter(e, t, n) {
				Object.defineProperty(e, t, { configurable: !0, enumerable: !0, get: n });
			}
			(e.exports = d),
				(d.get = d.header = function header(e) {
					if (!e) throw new TypeError("name argument is required to req.get");
					if ("string" != typeof e)
						throw new TypeError("name must be a string to req.get");
					var t = e.toLowerCase();
					switch (t) {
						case "referer":
						case "referrer":
							return this.headers.referrer || this.headers.referer;
						default:
							return this.headers[t];
					}
				}),
				(d.accepts = function () {
					var e = a(this);
					return e.types.apply(e, arguments);
				}),
				(d.acceptsEncodings = function () {
					var e = a(this);
					return e.encodings.apply(e, arguments);
				}),
				(d.acceptsEncoding = i.function(
					d.acceptsEncodings,
					"req.acceptsEncoding: Use acceptsEncodings instead"
				)),
				(d.acceptsCharsets = function () {
					var e = a(this);
					return e.charsets.apply(e, arguments);
				}),
				(d.acceptsCharset = i.function(
					d.acceptsCharsets,
					"req.acceptsCharset: Use acceptsCharsets instead"
				)),
				(d.acceptsLanguages = function () {
					var e = a(this);
					return e.languages.apply(e, arguments);
				}),
				(d.acceptsLanguage = i.function(
					d.acceptsLanguages,
					"req.acceptsLanguage: Use acceptsLanguages instead"
				)),
				(d.range = function range(e, t) {
					var range = this.get("Range");
					if (range) return p(e, range, t);
				}),
				(d.param = function param(e, t) {
					var n = this.params || {},
						a = this.body || {},
						r = this.query || {},
						o = 1 === arguments.length ? "name" : "name, default";
					return (
						i("req.param(" + o + "): Use req.params, req.body, or req.query instead"),
						null != n[e] && n.hasOwnProperty(e)
							? n[e]
							: null != a[e]
							? a[e]
							: null != r[e]
							? r[e]
							: t
					);
				}),
				(d.is = function is(e) {
					var t = e;
					if (!Array.isArray(e)) {
						t = new Array(arguments.length);
						for (var n = 0; n < t.length; n++) t[n] = arguments[n];
					}
					return o(this, t);
				}),
				defineGetter(d, "protocol", function protocol() {
					var e = this.connection.encrypted ? "https" : "http";
					if (!this.app.get("trust proxy fn")(this.connection.remoteAddress, 0)) return e;
					var t = this.get("X-Forwarded-Proto") || e,
						n = t.indexOf(",");
					return -1 !== n ? t.substring(0, n).trim() : t.trim();
				}),
				defineGetter(d, "secure", function secure() {
					return "https" === this.protocol;
				}),
				defineGetter(d, "ip", function ip() {
					var e = this.app.get("trust proxy fn");
					return u(this, e);
				}),
				defineGetter(d, "ips", function ips() {
					var e = this.app.get("trust proxy fn"),
						t = u.all(this, e);
					return t.reverse().pop(), t;
				}),
				defineGetter(d, "subdomains", function subdomains() {
					var e = this.hostname;
					if (!e) return [];
					var t = this.app.get("subdomain offset"),
						subdomains = r(e) ? [e] : e.split(".").reverse();
					return subdomains.slice(t);
				}),
				defineGetter(d, "path", function path() {
					return l(this).pathname;
				}),
				defineGetter(d, "hostname", function hostname() {
					var e = this.app.get("trust proxy fn"),
						t = this.get("X-Forwarded-Host");
					if (
						(t && e(this.connection.remoteAddress, 0)
							? -1 !== t.indexOf(",") &&
							  (t = t.substring(0, t.indexOf(",")).trimRight())
							: (t = this.get("Host")),
						t)
					) {
						var n = "[" === t[0] ? t.indexOf("]") + 1 : 0,
							a = t.indexOf(":", n);
						return -1 !== a ? t.substring(0, a) : t;
					}
				}),
				defineGetter(
					d,
					"host",
					i.function(function host() {
						return this.hostname;
					}, "req.host: Use req.hostname instead")
				),
				defineGetter(d, "fresh", function () {
					var e = this.method,
						t = this.res,
						n = t.statusCode;
					return (
						("GET" === e || "HEAD" === e) &&
						((n >= 200 && n < 300) || 304 === n) &&
						c(this.headers, {
							etag: t.get("ETag"),
							"last-modified": t.get("Last-Modified"),
						})
					);
				}),
				defineGetter(d, "stale", function stale() {
					return !this.fresh;
				}),
				defineGetter(d, "xhr", function xhr() {
					return "xmlhttprequest" === (this.get("X-Requested-With") || "").toLowerCase();
				});
		},
		function (e, t, n) {
			"use strict";
			var a = n(155),
				i = n(52);
			function Accepts(e) {
				if (!(this instanceof Accepts)) return new Accepts(e);
				(this.headers = e.headers), (this.negotiator = new a(e));
			}
			function extToMime(e) {
				return -1 === e.indexOf("/") ? i.lookup(e) : e;
			}
			function validMime(e) {
				return "string" == typeof e;
			}
			(e.exports = Accepts),
				(Accepts.prototype.type = Accepts.prototype.types = function (e) {
					var t = e;
					if (t && !Array.isArray(t)) {
						t = new Array(arguments.length);
						for (var n = 0; n < t.length; n++) t[n] = arguments[n];
					}
					if (!t || 0 === t.length) return this.negotiator.mediaTypes();
					if (!this.headers.accept) return t[0];
					var a = t.map(extToMime),
						i = this.negotiator.mediaTypes(a.filter(validMime)),
						r = i[0];
					return !!r && t[a.indexOf(r)];
				}),
				(Accepts.prototype.encoding = Accepts.prototype.encodings = function (e) {
					var t = e;
					if (t && !Array.isArray(t)) {
						t = new Array(arguments.length);
						for (var n = 0; n < t.length; n++) t[n] = arguments[n];
					}
					return t && 0 !== t.length
						? this.negotiator.encodings(t)[0] || !1
						: this.negotiator.encodings();
				}),
				(Accepts.prototype.charset = Accepts.prototype.charsets = function (e) {
					var t = e;
					if (t && !Array.isArray(t)) {
						t = new Array(arguments.length);
						for (var n = 0; n < t.length; n++) t[n] = arguments[n];
					}
					return t && 0 !== t.length
						? this.negotiator.charsets(t)[0] || !1
						: this.negotiator.charsets();
				}),
				(Accepts.prototype.lang = Accepts.prototype.langs = Accepts.prototype.language = Accepts.prototype.languages = function (
					e
				) {
					var t = e;
					if (t && !Array.isArray(t)) {
						t = new Array(arguments.length);
						for (var n = 0; n < t.length; n++) t[n] = arguments[n];
					}
					return t && 0 !== t.length
						? this.negotiator.languages(t)[0] || !1
						: this.negotiator.languages();
				});
		},
		function (e, t, n) {
			"use strict";
			var a = Object.create(null);
			function Negotiator(e) {
				if (!(this instanceof Negotiator)) return new Negotiator(e);
				this.request = e;
			}
			function loadModule(e) {
				var t = a[e];
				if (void 0 !== t) return t;
				switch (e) {
					case "charset":
						t = n(156);
						break;
					case "encoding":
						t = n(157);
						break;
					case "language":
						t = n(158);
						break;
					case "mediaType":
						t = n(159);
						break;
					default:
						throw new Error("Cannot find module '" + e + "'");
				}
				return (a[e] = t), t;
			}
			(e.exports = Negotiator),
				(e.exports.Negotiator = Negotiator),
				(Negotiator.prototype.charset = function charset(e) {
					var t = this.charsets(e);
					return t && t[0];
				}),
				(Negotiator.prototype.charsets = function charsets(e) {
					return (0, loadModule("charset").preferredCharsets)(
						this.request.headers["accept-charset"],
						e
					);
				}),
				(Negotiator.prototype.encoding = function encoding(e) {
					var t = this.encodings(e);
					return t && t[0];
				}),
				(Negotiator.prototype.encodings = function encodings(e) {
					return (0, loadModule("encoding").preferredEncodings)(
						this.request.headers["accept-encoding"],
						e
					);
				}),
				(Negotiator.prototype.language = function language(e) {
					var t = this.languages(e);
					return t && t[0];
				}),
				(Negotiator.prototype.languages = function languages(e) {
					return (0, loadModule("language").preferredLanguages)(
						this.request.headers["accept-language"],
						e
					);
				}),
				(Negotiator.prototype.mediaType = function mediaType(e) {
					var t = this.mediaTypes(e);
					return t && t[0];
				}),
				(Negotiator.prototype.mediaTypes = function mediaTypes(e) {
					return (0, loadModule("mediaType").preferredMediaTypes)(
						this.request.headers.accept,
						e
					);
				}),
				(Negotiator.prototype.preferredCharset = Negotiator.prototype.charset),
				(Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets),
				(Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding),
				(Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings),
				(Negotiator.prototype.preferredLanguage = Negotiator.prototype.language),
				(Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages),
				(Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType),
				(Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes);
		},
		function (e, t, n) {
			"use strict";
			(e.exports = preferredCharsets), (e.exports.preferredCharsets = preferredCharsets);
			var a = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
			function parseCharset(e, t) {
				var n = a.exec(e);
				if (!n) return null;
				var i = n[1],
					r = 1;
				if (n[2])
					for (var o = n[2].split(";"), s = 0; s < o.length; s++) {
						var c = o[s].trim().split("=");
						if ("q" === c[0]) {
							r = parseFloat(c[1]);
							break;
						}
					}
				return { charset: i, q: r, i: t };
			}
			function specify(e, t, n) {
				var a = 0;
				if (t.charset.toLowerCase() === e.toLowerCase()) a |= 1;
				else if ("*" !== t.charset) return null;
				return { i: n, o: t.i, q: t.q, s: a };
			}
			function preferredCharsets(e, t) {
				var n = (function parseAcceptCharset(e) {
					for (var t = e.split(","), n = 0, a = 0; n < t.length; n++) {
						var i = parseCharset(t[n].trim(), n);
						i && (t[a++] = i);
					}
					return (t.length = a), t;
				})(void 0 === e ? "*" : e || "");
				if (!t) return n.filter(isQuality).sort(compareSpecs).map(getFullCharset);
				var a = t.map(function getPriority(e, t) {
					return (function getCharsetPriority(e, t, n) {
						for (var a = { o: -1, q: 0, s: 0 }, i = 0; i < t.length; i++) {
							var r = specify(e, t[i], n);
							r && (a.s - r.s || a.q - r.q || a.o - r.o) < 0 && (a = r);
						}
						return a;
					})(e, n, t);
				});
				return a
					.filter(isQuality)
					.sort(compareSpecs)
					.map(function getCharset(e) {
						return t[a.indexOf(e)];
					});
			}
			function compareSpecs(e, t) {
				return t.q - e.q || t.s - e.s || e.o - t.o || e.i - t.i || 0;
			}
			function getFullCharset(e) {
				return e.charset;
			}
			function isQuality(e) {
				return e.q > 0;
			}
		},
		function (e, t, n) {
			"use strict";
			(e.exports = preferredEncodings), (e.exports.preferredEncodings = preferredEncodings);
			var a = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
			function parseEncoding(e, t) {
				var n = a.exec(e);
				if (!n) return null;
				var i = n[1],
					r = 1;
				if (n[2])
					for (var o = n[2].split(";"), s = 0; s < o.length; s++) {
						var c = o[s].trim().split("=");
						if ("q" === c[0]) {
							r = parseFloat(c[1]);
							break;
						}
					}
				return { encoding: i, q: r, i: t };
			}
			function specify(e, t, n) {
				var a = 0;
				if (t.encoding.toLowerCase() === e.toLowerCase()) a |= 1;
				else if ("*" !== t.encoding) return null;
				return { i: n, o: t.i, q: t.q, s: a };
			}
			function preferredEncodings(e, t) {
				var n = (function parseAcceptEncoding(e) {
					for (var t = e.split(","), n = !1, a = 1, i = 0, r = 0; i < t.length; i++) {
						var o = parseEncoding(t[i].trim(), i);
						o &&
							((t[r++] = o),
							(n = n || specify("identity", o)),
							(a = Math.min(a, o.q || 1)));
					}
					return n || (t[r++] = { encoding: "identity", q: a, i: i }), (t.length = r), t;
				})(e || "");
				if (!t) return n.filter(isQuality).sort(compareSpecs).map(getFullEncoding);
				var a = t.map(function getPriority(e, t) {
					return (function getEncodingPriority(e, t, n) {
						for (var a = { o: -1, q: 0, s: 0 }, i = 0; i < t.length; i++) {
							var r = specify(e, t[i], n);
							r && (a.s - r.s || a.q - r.q || a.o - r.o) < 0 && (a = r);
						}
						return a;
					})(e, n, t);
				});
				return a
					.filter(isQuality)
					.sort(compareSpecs)
					.map(function getEncoding(e) {
						return t[a.indexOf(e)];
					});
			}
			function compareSpecs(e, t) {
				return t.q - e.q || t.s - e.s || e.o - t.o || e.i - t.i || 0;
			}
			function getFullEncoding(e) {
				return e.encoding;
			}
			function isQuality(e) {
				return e.q > 0;
			}
		},
		function (e, t, n) {
			"use strict";
			(e.exports = preferredLanguages), (e.exports.preferredLanguages = preferredLanguages);
			var a = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
			function parseLanguage(e, t) {
				var n = a.exec(e);
				if (!n) return null;
				var i = n[1],
					r = n[2],
					o = i;
				r && (o += "-" + r);
				var s = 1;
				if (n[3])
					for (var c = n[3].split(";"), p = 0; p < c.length; p++) {
						var l = c[p].split("=");
						"q" === l[0] && (s = parseFloat(l[1]));
					}
				return { prefix: i, suffix: r, q: s, i: t, full: o };
			}
			function specify(e, t, n) {
				var a = parseLanguage(e);
				if (!a) return null;
				var i = 0;
				if (t.full.toLowerCase() === a.full.toLowerCase()) i |= 4;
				else if (t.prefix.toLowerCase() === a.full.toLowerCase()) i |= 2;
				else if (t.full.toLowerCase() === a.prefix.toLowerCase()) i |= 1;
				else if ("*" !== t.full) return null;
				return { i: n, o: t.i, q: t.q, s: i };
			}
			function preferredLanguages(e, t) {
				var n = (function parseAcceptLanguage(e) {
					for (var t = e.split(","), n = 0, a = 0; n < t.length; n++) {
						var i = parseLanguage(t[n].trim(), n);
						i && (t[a++] = i);
					}
					return (t.length = a), t;
				})(void 0 === e ? "*" : e || "");
				if (!t) return n.filter(isQuality).sort(compareSpecs).map(getFullLanguage);
				var a = t.map(function getPriority(e, t) {
					return (function getLanguagePriority(e, t, n) {
						for (var a = { o: -1, q: 0, s: 0 }, i = 0; i < t.length; i++) {
							var r = specify(e, t[i], n);
							r && (a.s - r.s || a.q - r.q || a.o - r.o) < 0 && (a = r);
						}
						return a;
					})(e, n, t);
				});
				return a
					.filter(isQuality)
					.sort(compareSpecs)
					.map(function getLanguage(e) {
						return t[a.indexOf(e)];
					});
			}
			function compareSpecs(e, t) {
				return t.q - e.q || t.s - e.s || e.o - t.o || e.i - t.i || 0;
			}
			function getFullLanguage(e) {
				return e.full;
			}
			function isQuality(e) {
				return e.q > 0;
			}
		},
		function (e, t, n) {
			"use strict";
			(e.exports = preferredMediaTypes),
				(e.exports.preferredMediaTypes = preferredMediaTypes);
			var a = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
			function parseAccept(e) {
				for (
					var t = (function splitMediaTypes(e) {
							for (var t = e.split(","), n = 1, a = 0; n < t.length; n++)
								quoteCount(t[a]) % 2 == 0 ? (t[++a] = t[n]) : (t[a] += "," + t[n]);
							return (t.length = a + 1), t;
						})(e),
						n = 0,
						a = 0;
					n < t.length;
					n++
				) {
					var i = parseMediaType(t[n].trim(), n);
					i && (t[a++] = i);
				}
				return (t.length = a), t;
			}
			function parseMediaType(e, t) {
				var n = a.exec(e);
				if (!n) return null;
				var i = Object.create(null),
					r = 1,
					o = n[2],
					s = n[1];
				if (n[3])
					for (
						var c = (function splitParameters(e) {
								for (var t = e.split(";"), n = 1, a = 0; n < t.length; n++)
									quoteCount(t[a]) % 2 == 0
										? (t[++a] = t[n])
										: (t[a] += ";" + t[n]);
								t.length = a + 1;
								for (n = 0; n < t.length; n++) t[n] = t[n].trim();
								return t;
							})(n[3]).map(splitKeyValuePair),
							p = 0;
						p < c.length;
						p++
					) {
						var l = c[p],
							u = l[0].toLowerCase(),
							d = l[1],
							m =
								d && '"' === d[0] && '"' === d[d.length - 1]
									? d.substr(1, d.length - 2)
									: d;
						if ("q" === u) {
							r = parseFloat(m);
							break;
						}
						i[u] = m;
					}
				return { type: s, subtype: o, params: i, q: r, i: t };
			}
			function specify(e, t, n) {
				var a = parseMediaType(e),
					i = 0;
				if (!a) return null;
				if (t.type.toLowerCase() == a.type.toLowerCase()) i |= 4;
				else if ("*" != t.type) return null;
				if (t.subtype.toLowerCase() == a.subtype.toLowerCase()) i |= 2;
				else if ("*" != t.subtype) return null;
				var r = Object.keys(t.params);
				if (r.length > 0) {
					if (
						!r.every(function (e) {
							return (
								"*" == t.params[e] ||
								(t.params[e] || "").toLowerCase() ==
									(a.params[e] || "").toLowerCase()
							);
						})
					)
						return null;
					i |= 1;
				}
				return { i: n, o: t.i, q: t.q, s: i };
			}
			function preferredMediaTypes(e, t) {
				var n = parseAccept(void 0 === e ? "*/*" : e || "");
				if (!t) return n.filter(isQuality).sort(compareSpecs).map(getFullType);
				var a = t.map(function getPriority(e, t) {
					return (function getMediaTypePriority(e, t, n) {
						for (var a = { o: -1, q: 0, s: 0 }, i = 0; i < t.length; i++) {
							var r = specify(e, t[i], n);
							r && (a.s - r.s || a.q - r.q || a.o - r.o) < 0 && (a = r);
						}
						return a;
					})(e, n, t);
				});
				return a
					.filter(isQuality)
					.sort(compareSpecs)
					.map(function getType(e) {
						return t[a.indexOf(e)];
					});
			}
			function compareSpecs(e, t) {
				return t.q - e.q || t.s - e.s || e.o - t.o || e.i - t.i || 0;
			}
			function getFullType(e) {
				return e.type + "/" + e.subtype;
			}
			function isQuality(e) {
				return e.q > 0;
			}
			function quoteCount(e) {
				for (var t = 0, n = 0; -1 !== (n = e.indexOf('"', n)); ) t++, n++;
				return t;
			}
			function splitKeyValuePair(e) {
				var t,
					n,
					a = e.indexOf("=");
				return -1 === a ? (t = e) : ((t = e.substr(0, a)), (n = e.substr(a + 1))), [t, n];
			}
		},
		function (e, t, n) {
			"use strict";
			var a = n(40).Buffer,
				i = n(61),
				r = n(6)("express"),
				o = n(29),
				s = n(30),
				c = n(4),
				p = n(7).isAbsolute,
				l = n(28),
				u = n(1),
				d = n(24),
				m = n(32),
				f = n(161).sign,
				h = n(7).normalizeType,
				v = n(7).normalizeTypes,
				g = n(7).setCharset,
				b = n(162),
				x = n(41),
				y = u.extname,
				w = x.mime,
				_ = u.resolve,
				k = n(67),
				E = Object.create(c.ServerResponse.prototype);
			e.exports = E;
			var S = /;\s*charset\s*=/;
			function sendfile(e, t, n, a) {
				var i,
					r = !1;
				function onaborted() {
					if (!r) {
						r = !0;
						var e = new Error("Request aborted");
						(e.code = "ECONNABORTED"), a(e);
					}
				}
				function onerror(e) {
					r || ((r = !0), a(e));
				}
				t.on("directory", function ondirectory() {
					if (!r) {
						r = !0;
						var e = new Error("EISDIR, read");
						(e.code = "EISDIR"), a(e);
					}
				}),
					t.on("end", function onend() {
						r || ((r = !0), a());
					}),
					t.on("error", onerror),
					t.on("file", function onfile() {
						i = !1;
					}),
					t.on("stream", function onstream() {
						i = !0;
					}),
					l(e, function onfinish(e) {
						return e && "ECONNRESET" === e.code
							? onaborted()
							: e
							? onerror(e)
							: void (
									r ||
									setImmediate(function () {
										!1 === i || r ? r || ((r = !0), a()) : onaborted();
									})
							  );
					}),
					n.headers &&
						t.on("headers", function headers(e) {
							for (var t = n.headers, a = Object.keys(t), i = 0; i < a.length; i++) {
								var r = a[i];
								e.setHeader(r, t[r]);
							}
						}),
					t.pipe(e);
			}
			function stringify(e, t, n, a) {
				var i = t || n ? JSON.stringify(e, t, n) : JSON.stringify(e);
				return (
					a &&
						(i = i.replace(/[<>&]/g, function (e) {
							switch (e.charCodeAt(0)) {
								case 60:
									return "\\u003c";
								case 62:
									return "\\u003e";
								case 38:
									return "\\u0026";
								default:
									return e;
							}
						})),
					i
				);
			}
			(E.status = function status(e) {
				return (this.statusCode = e), this;
			}),
				(E.links = function (e) {
					var t = this.get("Link") || "";
					return (
						t && (t += ", "),
						this.set(
							"Link",
							t +
								Object.keys(e)
									.map(function (t) {
										return "<" + e[t] + '>; rel="' + t + '"';
									})
									.join(", ")
						)
					);
				}),
				(E.send = function send(e) {
					var t,
						n,
						i = e,
						o = this.req,
						s = this.app;
					switch (
						(2 === arguments.length &&
							("number" != typeof arguments[0] && "number" == typeof arguments[1]
								? (r(
										"res.send(body, status): Use res.status(status).send(body) instead"
								  ),
								  (this.statusCode = arguments[1]))
								: (r(
										"res.send(status, body): Use res.status(status).send(body) instead"
								  ),
								  (this.statusCode = arguments[0]),
								  (i = arguments[1]))),
						"number" == typeof i &&
							1 === arguments.length &&
							(this.get("Content-Type") || this.type("txt"),
							r("res.send(status): Use res.sendStatus(status) instead"),
							(this.statusCode = i),
							(i = d[i])),
						typeof i)
					) {
						case "string":
							this.get("Content-Type") || this.type("html");
							break;
						case "boolean":
						case "number":
						case "object":
							if (null === i) i = "";
							else {
								if (!a.isBuffer(i)) return this.json(i);
								this.get("Content-Type") || this.type("bin");
							}
					}
					"string" == typeof i &&
						((t = "utf8"),
						"string" == typeof (n = this.get("Content-Type")) &&
							this.set("Content-Type", g(n, "utf-8")));
					var c,
						p,
						l = s.get("etag fn"),
						u = !this.get("ETag") && "function" == typeof l;
					return (
						void 0 !== i &&
							(a.isBuffer(i)
								? (c = i.length)
								: !u && i.length < 1e3
								? (c = a.byteLength(i, t))
								: ((i = a.from(i, t)), (t = void 0), (c = i.length)),
							this.set("Content-Length", c)),
						u && void 0 !== c && (p = l(i, t)) && this.set("ETag", p),
						o.fresh && (this.statusCode = 304),
						(204 !== this.statusCode && 304 !== this.statusCode) ||
							(this.removeHeader("Content-Type"),
							this.removeHeader("Content-Length"),
							this.removeHeader("Transfer-Encoding"),
							(i = "")),
						"HEAD" === o.method ? this.end() : this.end(i, t),
						this
					);
				}),
				(E.json = function json(e) {
					var t = e;
					2 === arguments.length &&
						("number" == typeof arguments[1]
							? (r("res.json(obj, status): Use res.status(status).json(obj) instead"),
							  (this.statusCode = arguments[1]))
							: (r("res.json(status, obj): Use res.status(status).json(obj) instead"),
							  (this.statusCode = arguments[0]),
							  (t = arguments[1])));
					var n = this.app,
						a = n.get("json escape"),
						i = n.get("json replacer"),
						o = n.get("json spaces"),
						s = stringify(t, i, o, a);
					return (
						this.get("Content-Type") || this.set("Content-Type", "application/json"),
						this.send(s)
					);
				}),
				(E.jsonp = function jsonp(e) {
					var t = e;
					2 === arguments.length &&
						("number" == typeof arguments[1]
							? (r(
									"res.jsonp(obj, status): Use res.status(status).json(obj) instead"
							  ),
							  (this.statusCode = arguments[1]))
							: (r(
									"res.jsonp(status, obj): Use res.status(status).jsonp(obj) instead"
							  ),
							  (this.statusCode = arguments[0]),
							  (t = arguments[1])));
					var n = this.app,
						a = n.get("json escape"),
						i = n.get("json replacer"),
						o = n.get("json spaces"),
						s = stringify(t, i, o, a),
						c = this.req.query[n.get("jsonp callback name")];
					return (
						this.get("Content-Type") ||
							(this.set("X-Content-Type-Options", "nosniff"),
							this.set("Content-Type", "application/json")),
						Array.isArray(c) && (c = c[0]),
						"string" == typeof c &&
							0 !== c.length &&
							(this.set("X-Content-Type-Options", "nosniff"),
							this.set("Content-Type", "text/javascript"),
							(s =
								"/**/ typeof " +
								(c = c.replace(/[^\[\]\w$.]/g, "")) +
								" === 'function' && " +
								c +
								"(" +
								(s = s
									.replace(/\u2028/g, "\\u2028")
									.replace(/\u2029/g, "\\u2029")) +
								");")),
						this.send(s)
					);
				}),
				(E.sendStatus = function sendStatus(e) {
					var t = d[e] || String(e);
					return (this.statusCode = e), this.type("txt"), this.send(t);
				}),
				(E.sendFile = function sendFile(e, t, n) {
					var a = n,
						i = this.req,
						r = i.next,
						o = t || {};
					if (!e) throw new TypeError("path argument is required to res.sendFile");
					if ("string" != typeof e)
						throw new TypeError("path must be a string to res.sendFile");
					if (("function" == typeof t && ((a = t), (o = {})), !o.root && !p(e)))
						throw new TypeError(
							"path must be absolute or specify root to res.sendFile"
						);
					var s = encodeURI(e);
					sendfile(this, x(i, s, o), o, function (e) {
						return a
							? a(e)
							: e && "EISDIR" === e.code
							? r()
							: void (
									e &&
									"ECONNABORTED" !== e.code &&
									"write" !== e.syscall &&
									r(e)
							  );
					});
				}),
				(E.sendfile = function (e, t, n) {
					var a = n,
						i = this.req,
						r = i.next,
						o = t || {};
					"function" == typeof t && ((a = t), (o = {})),
						sendfile(this, x(i, e, o), o, function (e) {
							return a
								? a(e)
								: e && "EISDIR" === e.code
								? r()
								: void (
										e &&
										"ECONNABORTED" !== e.code &&
										"write" !== e.syscall &&
										r(e)
								  );
						});
				}),
				(E.sendfile = r.function(E.sendfile, "res.sendfile: Use res.sendFile instead")),
				(E.download = function download(e, t, n, a) {
					var r = a,
						o = t,
						s = n || null;
					"function" == typeof t
						? ((r = t), (o = null), (s = null))
						: "function" == typeof n && ((r = n), (s = null));
					var c = { "Content-Disposition": i(o || e) };
					if (s && s.headers)
						for (var p = Object.keys(s.headers), l = 0; l < p.length; l++) {
							var u = p[l];
							"content-disposition" !== u.toLowerCase() && (c[u] = s.headers[u]);
						}
					(s = Object.create(s)).headers = c;
					var d = _(e);
					return this.sendFile(d, s, r);
				}),
				(E.contentType = E.type = function contentType(e) {
					var t = -1 === e.indexOf("/") ? w.lookup(e) : e;
					return this.set("Content-Type", t);
				}),
				(E.format = function (e) {
					var t = this.req,
						n = t.next,
						a = e.default;
					a && delete e.default;
					var i = Object.keys(e),
						r = i.length > 0 && t.accepts(i);
					if ((this.vary("Accept"), r))
						this.set("Content-Type", h(r).value), e[r](t, this, n);
					else if (a) a();
					else {
						var o = new Error("Not Acceptable");
						(o.status = o.statusCode = 406),
							(o.types = v(i).map(function (e) {
								return e.value;
							})),
							n(o);
					}
					return this;
				}),
				(E.attachment = function attachment(e) {
					return e && this.type(y(e)), this.set("Content-Disposition", i(e)), this;
				}),
				(E.append = function append(e, t) {
					var n = this.get(e),
						a = t;
					return (
						n &&
							(a = Array.isArray(n)
								? n.concat(t)
								: Array.isArray(t)
								? [n].concat(t)
								: [n, t]),
						this.set(e, a)
					);
				}),
				(E.set = E.header = function header(e, t) {
					if (2 === arguments.length) {
						var n = Array.isArray(t) ? t.map(String) : String(t);
						if ("content-type" === e.toLowerCase()) {
							if (Array.isArray(n))
								throw new TypeError("Content-Type cannot be set to an Array");
							if (!S.test(n)) {
								var a = w.charsets.lookup(n.split(";")[0]);
								a && (n += "; charset=" + a.toLowerCase());
							}
						}
						this.setHeader(e, n);
					} else for (var i in e) this.set(i, e[i]);
					return this;
				}),
				(E.get = function (e) {
					return this.getHeader(e);
				}),
				(E.clearCookie = function clearCookie(e, t) {
					var n = m({ expires: new Date(1), path: "/" }, t);
					return this.cookie(e, "", n);
				}),
				(E.cookie = function (e, t, n) {
					var a = m({}, n),
						i = this.req.secret,
						r = a.signed;
					if (r && !i)
						throw new Error('cookieParser("secret") required for signed cookies');
					var o = "object" == typeof t ? "j:" + JSON.stringify(t) : String(t);
					return (
						r && (o = "s:" + f(o, i)),
						"maxAge" in a &&
							((a.expires = new Date(Date.now() + a.maxAge)), (a.maxAge /= 1e3)),
						null == a.path && (a.path = "/"),
						this.append("Set-Cookie", b.serialize(e, String(o), a)),
						this
					);
				}),
				(E.location = function location(e) {
					var t = e;
					return (
						"back" === e && (t = this.req.get("Referrer") || "/"),
						this.set("Location", o(t))
					);
				}),
				(E.redirect = function redirect(e) {
					var t,
						n = e,
						i = 302;
					2 === arguments.length &&
						("number" == typeof arguments[0]
							? ((i = arguments[0]), (n = arguments[1]))
							: (r(
									"res.redirect(url, status): Use res.redirect(status, url) instead"
							  ),
							  (i = arguments[1]))),
						(n = this.location(n).get("Location")),
						this.format({
							text: function () {
								t = d[i] + ". Redirecting to " + n;
							},
							html: function () {
								var e = s(n);
								t =
									"<p>" +
									d[i] +
									'. Redirecting to <a href="' +
									e +
									'">' +
									e +
									"</a></p>";
							},
							default: function () {
								t = "";
							},
						}),
						(this.statusCode = i),
						this.set("Content-Length", a.byteLength(t)),
						"HEAD" === this.req.method ? this.end() : this.end(t);
				}),
				(E.vary = function (e) {
					return !e || (Array.isArray(e) && !e.length)
						? (r("res.vary(): Provide a field name"), this)
						: (k(this, e), this);
				}),
				(E.render = function render(e, t, n) {
					var a = this.req.app,
						i = n,
						r = t || {},
						o = this.req,
						s = this;
					"function" == typeof t && ((i = t), (r = {})),
						(r._locals = s.locals),
						(i =
							i ||
							function (e, t) {
								if (e) return o.next(e);
								s.send(t);
							}),
						a.render(e, r, i);
				});
		},
		function (e, t, n) {
			var a = n(9);
			function sha1(e) {
				return a.createHash("sha1").update(e).digest("hex");
			}
			(t.sign = function (e, t) {
				if ("string" != typeof e)
					throw new TypeError("Cookie value must be provided as a string.");
				if ("string" != typeof t) throw new TypeError("Secret string must be provided.");
				return (
					e +
					"." +
					a.createHmac("sha256", t).update(e).digest("base64").replace(/\=+$/, "")
				);
			}),
				(t.unsign = function (e, n) {
					if ("string" != typeof e)
						throw new TypeError("Signed cookie string must be provided.");
					if ("string" != typeof n)
						throw new TypeError("Secret string must be provided.");
					var a = e.slice(0, e.lastIndexOf("."));
					return sha1(t.sign(a, n)) == sha1(e) && a;
				});
		},
		function (e, t, n) {
			"use strict";
			(t.parse = function parse(e, t) {
				if ("string" != typeof e) throw new TypeError("argument str must be a string");
				for (
					var n = {}, i = t || {}, o = e.split(r), s = i.decode || a, c = 0;
					c < o.length;
					c++
				) {
					var p = o[c],
						l = p.indexOf("=");
					if (!(l < 0)) {
						var u = p.substr(0, l).trim(),
							d = p.substr(++l, p.length).trim();
						'"' == d[0] && (d = d.slice(1, -1)),
							null == n[u] && (n[u] = tryDecode(d, s));
					}
				}
				return n;
			}),
				(t.serialize = function serialize(e, t, n) {
					var a = n || {},
						r = a.encode || i;
					if ("function" != typeof r) throw new TypeError("option encode is invalid");
					if (!o.test(e)) throw new TypeError("argument name is invalid");
					var s = r(t);
					if (s && !o.test(s)) throw new TypeError("argument val is invalid");
					var c = e + "=" + s;
					if (null != a.maxAge) {
						var p = a.maxAge - 0;
						if (isNaN(p)) throw new Error("maxAge should be a Number");
						c += "; Max-Age=" + Math.floor(p);
					}
					if (a.domain) {
						if (!o.test(a.domain)) throw new TypeError("option domain is invalid");
						c += "; Domain=" + a.domain;
					}
					if (a.path) {
						if (!o.test(a.path)) throw new TypeError("option path is invalid");
						c += "; Path=" + a.path;
					}
					if (a.expires) {
						if ("function" != typeof a.expires.toUTCString)
							throw new TypeError("option expires is invalid");
						c += "; Expires=" + a.expires.toUTCString();
					}
					a.httpOnly && (c += "; HttpOnly");
					a.secure && (c += "; Secure");
					if (a.sameSite) {
						switch (
							"string" == typeof a.sameSite ? a.sameSite.toLowerCase() : a.sameSite
						) {
							case !0:
								c += "; SameSite=Strict";
								break;
							case "lax":
								c += "; SameSite=Lax";
								break;
							case "strict":
								c += "; SameSite=Strict";
								break;
							case "none":
								c += "; SameSite=None";
								break;
							default:
								throw new TypeError("option sameSite is invalid");
						}
					}
					return c;
				});
			var a = decodeURIComponent,
				i = encodeURIComponent,
				r = /; */,
				o = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
			function tryDecode(e, t) {
				try {
					return t(e);
				} catch (t) {
					return e;
				}
			}
		},
		function (e, t, n) {
			"use strict";
			var a = n(29),
				i = n(30),
				r = n(19),
				o = n(1).resolve,
				s = n(41),
				c = n(3);
			(e.exports = function serveStatic(e, t) {
				if (!e) throw new TypeError("root path required");
				if ("string" != typeof e) throw new TypeError("root path must be a string");
				var n = Object.create(t || null),
					p = !1 !== n.fallthrough,
					l = !1 !== n.redirect,
					u = n.setHeaders;
				if (u && "function" != typeof u)
					throw new TypeError("option setHeaders must be function");
				(n.maxage = n.maxage || n.maxAge || 0), (n.root = o(e));
				var d = l
					? (function createRedirectDirectoryListener() {
							return function redirect(e) {
								if (this.hasTrailingSlash()) this.error(404);
								else {
									var t = r.original(this.req);
									(t.path = null),
										(t.pathname = (function collapseLeadingSlashes(e) {
											for (
												var t = 0;
												t < e.length && 47 === e.charCodeAt(t);
												t++
											);
											return t > 1 ? "/" + e.substr(t) : e;
										})(t.pathname + "/"));
									var n = a(c.format(t)),
										o = (function createHtmlDocument(e, t) {
											return (
												'<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>' +
												e +
												"</title>\n</head>\n<body>\n<pre>" +
												t +
												"</pre>\n</body>\n</html>\n"
											);
										})(
											"Redirecting",
											'Redirecting to <a href="' + i(n) + '">' + i(n) + "</a>"
										);
									(e.statusCode = 301),
										e.setHeader("Content-Type", "text/html; charset=UTF-8"),
										e.setHeader("Content-Length", Buffer.byteLength(o)),
										e.setHeader(
											"Content-Security-Policy",
											"default-src 'none'"
										),
										e.setHeader("X-Content-Type-Options", "nosniff"),
										e.setHeader("Location", n),
										e.end(o);
								}
							};
					  })()
					: function notFound() {
							this.error(404);
					  };
				return function serveStatic(e, t, a) {
					if ("GET" !== e.method && "HEAD" !== e.method)
						return p
							? a()
							: ((t.statusCode = 405),
							  t.setHeader("Allow", "GET, HEAD"),
							  t.setHeader("Content-Length", "0"),
							  void t.end());
					var i = !p,
						o = r.original(e),
						c = r(e).pathname;
					"/" === c && "/" !== o.pathname.substr(-1) && (c = "");
					var l = s(e, c, n);
					l.on("directory", d),
						u && l.on("headers", u),
						p &&
							l.on("file", function onFile() {
								i = !0;
							}),
						l.on("error", function error(e) {
							!i && e.statusCode < 500 ? a() : a(e);
						}),
						l.pipe(t);
				};
			}),
				(e.exports.mime = s.mime);
		},
		function (e, t, n) {
			"use strict";
			var a = Object.getOwnPropertySymbols,
				i = Object.prototype.hasOwnProperty,
				r = Object.prototype.propertyIsEnumerable;
			function toObject(e) {
				if (null == e)
					throw new TypeError("Object.assign cannot be called with null or undefined");
				return Object(e);
			}
			e.exports = (function shouldUseNative() {
				try {
					if (!Object.assign) return !1;
					var e = new String("abc");
					if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0])) return !1;
					for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
					if (
						"0123456789" !==
						Object.getOwnPropertyNames(t)
							.map(function (e) {
								return t[e];
							})
							.join("")
					)
						return !1;
					var a = {};
					return (
						"abcdefghijklmnopqrst".split("").forEach(function (e) {
							a[e] = e;
						}),
						"abcdefghijklmnopqrst" === Object.keys(Object.assign({}, a)).join("")
					);
				} catch (e) {
					return !1;
				}
			})()
				? Object.assign
				: function (e, t) {
						for (var n, o, s = toObject(e), c = 1; c < arguments.length; c++) {
							for (var p in (n = Object(arguments[c]))) i.call(n, p) && (s[p] = n[p]);
							if (a) {
								o = a(n);
								for (var l = 0; l < o.length; l++)
									r.call(n, o[l]) && (s[o[l]] = n[o[l]]);
							}
						}
						return s;
				  };
		},
		function (e, t) {
			e.exports = require("tls");
		},
		function (e, t, n) {
			"use strict";
			const a = Symbol("kDone"),
				i = Symbol("kRun");
			e.exports = class Limiter {
				constructor(e) {
					(this[a] = () => {
						this.pending--, this[i]();
					}),
						(this.concurrency = e || 1 / 0),
						(this.jobs = []),
						(this.pending = 0);
				}
				add(e) {
					this.jobs.push(e), this[i]();
				}
				[i]() {
					if (this.pending !== this.concurrency && this.jobs.length) {
						const e = this.jobs.shift();
						this.pending++, e(this[a]);
					}
				}
			};
		},
		function (e, t, n) {
			"use strict";
			class Event {
				constructor(e, t) {
					(this.target = t), (this.type = e);
				}
			}
			class MessageEvent extends Event {
				constructor(e, t) {
					super("message", t), (this.data = e);
				}
			}
			class CloseEvent extends Event {
				constructor(e, t, n) {
					super("close", n),
						(this.wasClean = n._closeFrameReceived && n._closeFrameSent),
						(this.reason = t),
						(this.code = e);
				}
			}
			class OpenEvent extends Event {
				constructor(e) {
					super("open", e);
				}
			}
			class ErrorEvent extends Event {
				constructor(e, t) {
					super("error", t), (this.message = e.message), (this.error = e);
				}
			}
			const a = {
				addEventListener(e, t, n) {
					if ("function" != typeof t) return;
					function onMessage(e) {
						t.call(this, new MessageEvent(e, this));
					}
					function onClose(e, n) {
						t.call(this, new CloseEvent(e, n, this));
					}
					function onError(e) {
						t.call(this, new ErrorEvent(e, this));
					}
					function onOpen() {
						t.call(this, new OpenEvent(this));
					}
					const a = n && n.once ? "once" : "on";
					"message" === e
						? ((onMessage._listener = t), this[a](e, onMessage))
						: "close" === e
						? ((onClose._listener = t), this[a](e, onClose))
						: "error" === e
						? ((onError._listener = t), this[a](e, onError))
						: "open" === e
						? ((onOpen._listener = t), this[a](e, onOpen))
						: this[a](e, t);
				},
				removeEventListener(e, t) {
					const n = this.listeners(e);
					for (let a = 0; a < n.length; a++)
						(n[a] !== t && n[a]._listener !== t) || this.removeListener(e, n[a]);
				},
			};
			e.exports = a;
		},
		function (e, t, n) {
			"use strict";
			const { Duplex: a } = n(0);
			function emitClose(e) {
				e.emit("close");
			}
			function duplexOnEnd() {
				!this.destroyed && this._writableState.finished && this.destroy();
			}
			function duplexOnError(e) {
				this.removeListener("error", duplexOnError),
					this.destroy(),
					0 === this.listenerCount("error") && this.emit("error", e);
			}
			e.exports = function createWebSocketStream(e, t) {
				let n = !0;
				function receiverOnDrain() {
					n && e._socket.resume();
				}
				e.readyState === e.CONNECTING
					? e.once("open", function open() {
							e._receiver.removeAllListeners("drain"),
								e._receiver.on("drain", receiverOnDrain);
					  })
					: (e._receiver.removeAllListeners("drain"),
					  e._receiver.on("drain", receiverOnDrain));
				const i = new a({
					...t,
					autoDestroy: !1,
					emitClose: !1,
					objectMode: !1,
					writableObjectMode: !1,
				});
				return (
					e.on("message", function message(t) {
						i.push(t) || ((n = !1), e._socket.pause());
					}),
					e.once("error", function error(e) {
						i.destroyed || i.destroy(e);
					}),
					e.once("close", function close() {
						i.destroyed || i.push(null);
					}),
					(i._destroy = function (t, n) {
						if (e.readyState === e.CLOSED)
							return n(t), void process.nextTick(emitClose, i);
						let a = !1;
						e.once("error", function error(e) {
							(a = !0), n(e);
						}),
							e.once("close", function close() {
								a || n(t), process.nextTick(emitClose, i);
							}),
							e.terminate();
					}),
					(i._final = function (t) {
						e.readyState !== e.CONNECTING
							? null !== e._socket &&
							  (e._socket._writableState.finished
									? (t(), i._readableState.endEmitted && i.destroy())
									: (e._socket.once("finish", function finish() {
											t();
									  }),
									  e.close()))
							: e.once("open", function open() {
									i._final(t);
							  });
					}),
					(i._read = function () {
						e.readyState !== e.OPEN ||
							n ||
							((n = !0), e._receiver._writableState.needDrain || e._socket.resume());
					}),
					(i._write = function (t, n, a) {
						e.readyState !== e.CONNECTING
							? e.send(t, a)
							: e.once("open", function open() {
									i._write(t, n, a);
							  });
					}),
					i.on("end", duplexOnEnd),
					i.on("error", duplexOnError),
					i
				);
			};
		},
		function (e, t, n) {
			"use strict";
			const a = n(21),
				{ createHash: i } = n(9),
				{ createServer: r, STATUS_CODES: o } = n(4),
				s = n(33),
				c = n(68),
				{ format: p, parse: l } = n(72),
				{ GUID: u, kWebSocket: d } = n(15),
				m = /^[+/0-9A-Za-z]{22}==$/;
			function emitClose(e) {
				e.emit("close");
			}
			function socketOnError() {
				this.destroy();
			}
			function abortHandshake(e, t, n, a) {
				e.writable &&
					((n = n || o[t]),
					(a = {
						Connection: "close",
						"Content-Type": "text/html",
						"Content-Length": Buffer.byteLength(n),
						...a,
					}),
					e.write(
						`HTTP/1.1 ${t} ${o[t]}\r\n` +
							Object.keys(a)
								.map((e) => `${e}: ${a[e]}`)
								.join("\r\n") +
							"\r\n\r\n" +
							n
					)),
					e.removeListener("error", socketOnError),
					e.destroy();
			}
			e.exports = class WebSocketServer extends a {
				constructor(e, t) {
					if (
						(super(),
						null ==
							(e = {
								maxPayload: 104857600,
								perMessageDeflate: !1,
								handleProtocols: null,
								clientTracking: !0,
								verifyClient: null,
								noServer: !1,
								backlog: null,
								server: null,
								host: null,
								path: null,
								port: null,
								...e,
							}).port &&
							!e.server &&
							!e.noServer)
					)
						throw new TypeError(
							'One of the "port", "server", or "noServer" options must be specified'
						);
					if (
						(null != e.port
							? ((this._server = r((e, t) => {
									const n = o[426];
									t.writeHead(426, {
										"Content-Length": n.length,
										"Content-Type": "text/plain",
									}),
										t.end(n);
							  })),
							  this._server.listen(e.port, e.host, e.backlog, t))
							: e.server && (this._server = e.server),
						this._server)
					) {
						const e = this.emit.bind(this, "connection");
						this._removeListeners = (function addListeners(e, t) {
							for (const n of Object.keys(t)) e.on(n, t[n]);
							return function removeListeners() {
								for (const n of Object.keys(t)) e.removeListener(n, t[n]);
							};
						})(this._server, {
							listening: this.emit.bind(this, "listening"),
							error: this.emit.bind(this, "error"),
							upgrade: (t, n, a) => {
								this.handleUpgrade(t, n, a, e);
							},
						});
					}
					!0 === e.perMessageDeflate && (e.perMessageDeflate = {}),
						e.clientTracking && (this.clients = new Set()),
						(this.options = e);
				}
				address() {
					if (this.options.noServer)
						throw new Error('The server is operating in "noServer" mode');
					return this._server ? this._server.address() : null;
				}
				close(e) {
					if ((e && this.once("close", e), this.clients))
						for (const e of this.clients) e.terminate();
					const t = this._server;
					t &&
					(this._removeListeners(),
					(this._removeListeners = this._server = null),
					null != this.options.port)
						? t.close(() => this.emit("close"))
						: process.nextTick(emitClose, this);
				}
				shouldHandle(e) {
					if (this.options.path) {
						const t = e.url.indexOf("?");
						if ((-1 !== t ? e.url.slice(0, t) : e.url) !== this.options.path) return !1;
					}
					return !0;
				}
				handleUpgrade(e, t, n, a) {
					t.on("error", socketOnError);
					const i =
							void 0 !== e.headers["sec-websocket-key"] &&
							e.headers["sec-websocket-key"].trim(),
						r = +e.headers["sec-websocket-version"],
						o = {};
					if (
						"GET" !== e.method ||
						"websocket" !== e.headers.upgrade.toLowerCase() ||
						!i ||
						!m.test(i) ||
						(8 !== r && 13 !== r) ||
						!this.shouldHandle(e)
					)
						return abortHandshake(t, 400);
					if (this.options.perMessageDeflate) {
						const n = new s(
							this.options.perMessageDeflate,
							!0,
							this.options.maxPayload
						);
						try {
							const t = l(e.headers["sec-websocket-extensions"]);
							t[s.extensionName] &&
								(n.accept(t[s.extensionName]), (o[s.extensionName] = n));
						} catch (e) {
							return abortHandshake(t, 400);
						}
					}
					if (this.options.verifyClient) {
						const s = {
							origin: e.headers["" + (8 === r ? "sec-websocket-origin" : "origin")],
							secure: !(!e.socket.authorized && !e.socket.encrypted),
							req: e,
						};
						if (2 === this.options.verifyClient.length)
							return void this.options.verifyClient(s, (r, s, c, p) => {
								if (!r) return abortHandshake(t, s || 401, c, p);
								this.completeUpgrade(i, o, e, t, n, a);
							});
						if (!this.options.verifyClient(s)) return abortHandshake(t, 401);
					}
					this.completeUpgrade(i, o, e, t, n, a);
				}
				completeUpgrade(e, t, n, a, r, o) {
					if (!a.readable || !a.writable) return a.destroy();
					if (a[d])
						throw new Error(
							"server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
						);
					const l = [
							"HTTP/1.1 101 Switching Protocols",
							"Upgrade: websocket",
							"Connection: Upgrade",
							"Sec-WebSocket-Accept: " +
								i("sha1")
									.update(e + u)
									.digest("base64"),
						],
						m = new c(null);
					let f = n.headers["sec-websocket-protocol"];
					if (
						(f &&
							((f = f.trim().split(/ *, */)),
							(f = this.options.handleProtocols
								? this.options.handleProtocols(f, n)
								: f[0]),
							f && (l.push("Sec-WebSocket-Protocol: " + f), (m._protocol = f))),
						t[s.extensionName])
					) {
						const e = t[s.extensionName].params,
							n = p({ [s.extensionName]: [e] });
						l.push("Sec-WebSocket-Extensions: " + n), (m._extensions = t);
					}
					this.emit("headers", l, n),
						a.write(l.concat("\r\n").join("\r\n")),
						a.removeListener("error", socketOnError),
						m.setSocket(a, r, this.options.maxPayload),
						this.clients &&
							(this.clients.add(m), m.on("close", () => this.clients.delete(m))),
						o(m, n);
				}
			};
		},
		function (e, t) {},
		function (e, t, n) {
			const { URL: a } = n(3),
				i = n(14),
				r = n(73),
				o = n(8),
				s = n(35),
				{ setTimeout: c } = n(74),
				p = n(75),
				l = n(76),
				u = n(174),
				d = n(78),
				m = n(79),
				f = "https://www.youtube.com/watch?v=";
			(t.cache = new m()), (t.cookieCache = new m(864e5)), (t.watchPageCache = new m());
			class UnrecoverableError extends Error {}
			const h = [
				"support.google.com/youtube/?p=age_restrictions",
				"youtube.com/t/community_guidelines",
			];
			t.getBasicInfo = async (e, t) => {
				const n = Object.assign({}, o.defaultOptions, t.requestOptions);
				(t.requestOptions = Object.assign({}, t.requestOptions, {})),
					(t.requestOptions.headers = Object.assign(
						{},
						{
							"User-Agent":
								"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
						},
						t.requestOptions.headers
					));
				let a = await pipeline(
					[e, t],
					(e) => {
						let t = s.playError(e.player_response, ["ERROR"], UnrecoverableError),
							n = privateVideoError(e.player_response);
						if (t || n) throw t || n;
						return (
							e &&
							e.player_response &&
							(e.player_response.streamingData ||
								isRental(e.player_response) ||
								isNotYetBroadcasted(e.player_response))
						);
					},
					n,
					[getWatchHTMLPage, getWatchJSONPage, getVideoInfoPage]
				);
				Object.assign(a, {
					formats: parseFormats(a.player_response),
					related_videos: u.getRelatedVideos(a),
				});
				const i = u.getMedia(a);
				let r = {
					author: u.getAuthor(a),
					media: i,
					likes: u.getLikes(a),
					dislikes: u.getDislikes(a),
					age_restricted: !!(
						i &&
						i.notice_url &&
						h.some((e) => i.notice_url.includes(e))
					),
					video_url: f + e,
					storyboards: u.getStoryboards(a),
				};
				return (
					(a.videoDetails = u.cleanVideoDetails(
						Object.assign(
							{},
							a.player_response &&
								a.player_response.microformat &&
								a.player_response.microformat.playerMicroformatRenderer,
							a.player_response && a.player_response.videoDetails,
							r
						),
						a
					)),
					a
				);
			};
			const privateVideoError = (e) => {
					let t = e && e.playabilityStatus;
					return t &&
						"LOGIN_REQUIRED" === t.status &&
						t.messages &&
						t.messages.filter((e) => /This is a private video/.test(e)).length
						? new UnrecoverableError(t.reason || (t.messages && t.messages[0]))
						: null;
				},
				isRental = (e) => {
					let t = e.playabilityStatus;
					return (
						t &&
						"UNPLAYABLE" === t.status &&
						t.errorScreen &&
						t.errorScreen.playerLegacyDesktopYpcOfferRenderer
					);
				},
				isNotYetBroadcasted = (e) => {
					let t = e.playabilityStatus;
					return t && "LIVE_STREAM_OFFLINE" === t.status;
				},
				getWatchHTMLURL = (e, t) => `${f + e}&hl=${t.lang || "en"}`,
				getWatchHTMLPageBody = (e, n) => {
					const a = getWatchHTMLURL(e, n);
					return t.watchPageCache.getOrSet(a, () => o(a, n.requestOptions).text());
				},
				getHTML5player = (e) => {
					let t = /<script\s+src="([^"]+)"(?:\s+type="text\/javascript")?\s+name="player_ias\/base"\s*>|"jsUrl":"([^"]+)"/.exec(
						e
					);
					return t ? t[1] || t[2] : null;
				},
				pipeline = async (e, t, n, a) => {
					let i;
					for (let r of a)
						try {
							const a = await retryFunc(r, e.concat([i]), n);
							if (
								(a.player_response &&
									((a.player_response.videoDetails = assign(
										i && i.player_response && i.player_response.videoDetails,
										a.player_response.videoDetails
									)),
									(a.player_response = assign(
										i && i.player_response,
										a.player_response
									))),
								(i = assign(i, a)),
								t(i, !1))
							)
								break;
						} catch (e) {
							if (e instanceof UnrecoverableError || r === a[a.length - 1]) throw e;
						}
					return i;
				},
				assign = (e, t) => {
					if (!e || !t) return e || t;
					for (let [n, a] of Object.entries(t)) null != a && (e[n] = a);
					return e;
				},
				retryFunc = async (e, t, n) => {
					let a,
						i = 0;
					for (; i <= n.maxRetries; )
						try {
							a = await e(...t);
							break;
						} catch (e) {
							if (
								e instanceof UnrecoverableError ||
								(e instanceof o.MinigetError && e.statusCode < 500) ||
								i >= n.maxRetries
							)
								throw e;
							let t = Math.min(++i * n.backoff.inc, n.backoff.max);
							await new Promise((e) => c(e, t));
						}
					return a;
				},
				v = /^[)\]}'\s]+/,
				parseJSON = (e, t, n) => {
					if (!n || "object" == typeof n) return n;
					try {
						return (n = n.replace(v, "")), JSON.parse(n);
					} catch (n) {
						throw Error(`Error parsing ${t} in ${e}: ${n.message}`);
					}
				},
				findJSON = (e, t, n, a, i, r) => {
					let o = s.between(n, a, i);
					if (!o) throw Error(`Could not find ${t} in ${e}`);
					return parseJSON(e, t, s.cutAfterJSON(`${r}${o}`));
				},
				findPlayerResponse = (e, t) => {
					const n =
						t &&
						((t.args && t.args.player_response) ||
							t.player_response ||
							t.playerResponse ||
							t.embedded_player_response);
					return parseJSON(e, "player_response", n);
				},
				getWatchJSONPage = async (e, n) => {
					const a = Object.assign({ headers: {} }, n.requestOptions);
					let i = a.headers.Cookie || a.headers.cookie;
					a.headers = Object.assign(
						{
							"x-youtube-client-name": "1",
							"x-youtube-client-version": "2.20201203.06.00",
							"x-youtube-identity-token": t.cookieCache.get(i || "browser") || "",
						},
						a.headers
					);
					const setIdentityToken = async (i, r) => {
						a.headers["x-youtube-identity-token"] ||
							(a.headers["x-youtube-identity-token"] = await ((e, n, a, i) =>
								t.cookieCache.getOrSet(a, async () => {
									let t = (await getWatchHTMLPageBody(e, n)).match(
										/(["'])ID_TOKEN\1[:,]\s?"([^"]+)"/
									);
									if (!t && i)
										throw new UnrecoverableError(
											"Cookie header used in request, but unable to find YouTube identity token"
										);
									return t && t[2];
								}))(e, n, i, r));
					};
					i && (await setIdentityToken(i, !0));
					const r = ((e, t) => getWatchHTMLURL(e, t) + "&pbj=1")(e, n);
					let s = await o(r, a).text(),
						c = parseJSON("watch.json", "body", s);
					if (
						("now" === c.reload && (await setIdentityToken("browser", !1)),
						"now" === c.reload || !Array.isArray(c))
					)
						throw Error("Unable to retrieve video metadata in watch.json");
					let p = c.reduce((e, t) => Object.assign(t, e), {});
					return (
						(p.player_response = findPlayerResponse("watch.json", p)),
						(p.html5player = p.player && p.player.assets && p.player.assets.js),
						p
					);
				},
				getWatchHTMLPage = async (e, t) => {
					let n = await getWatchHTMLPageBody(e, t),
						a = { page: "watch" };
					try {
						a.player_response = findJSON(
							"watch.html",
							"player_response",
							n,
							/\bytInitialPlayerResponse\s*=\s*\{/i,
							"\n",
							"{"
						);
					} catch (e) {
						let t = findJSON(
							"watch.html",
							"player_response",
							n,
							/\bytplayer\.config\s*=\s*{/,
							"</script>",
							"{"
						);
						a.player_response = findPlayerResponse("watch.html", t);
					}
					return (
						(a.response = findJSON(
							"watch.html",
							"response",
							n,
							/\bytInitialData("\])?\s*=\s*\{/i,
							"\n",
							"{"
						)),
						(a.html5player = getHTML5player(n)),
						a
					);
				},
				getVideoInfoPage = async (e, t) => {
					const n = new a("https://www.youtube.com/get_video_info");
					n.searchParams.set("video_id", e),
						n.searchParams.set("eurl", "https://youtube.googleapis.com/v/" + e),
						n.searchParams.set("ps", "default"),
						n.searchParams.set("gl", "US"),
						n.searchParams.set("hl", t.lang || "en");
					let r = await o(n.toString(), t.requestOptions).text(),
						s = i.parse(r);
					return (s.player_response = findPlayerResponse("get_video_info", s)), s;
				},
				parseFormats = (e) => {
					let t = [];
					return (
						e &&
							e.streamingData &&
							(t = t
								.concat(e.streamingData.formats || [])
								.concat(e.streamingData.adaptiveFormats || [])),
						t
					);
				};
			t.getInfo = async (e, n) => {
				let i = await t.getBasicInfo(e, n);
				const r =
					i.player_response &&
					i.player_response.streamingData &&
					(i.player_response.streamingData.dashManifestUrl ||
						i.player_response.streamingData.hlsManifestUrl);
				let s = [];
				if (i.formats.length) {
					if (
						((i.html5player =
							i.html5player ||
							getHTML5player(await getWatchHTMLPageBody(e, n)) ||
							getHTML5player(
								await ((e, t) => {
									const n = `${"https://www.youtube.com/embed/" + e}?hl=${
										t.lang || "en"
									}`;
									return o(n, t.requestOptions).text();
								})(e, n)
							)),
						!i.html5player)
					)
						throw Error("Unable to find html5player file");
					const t = new a(i.html5player, f).toString();
					s.push(d.decipherFormats(i.formats, t, n));
				}
				if (r && i.player_response.streamingData.dashManifestUrl) {
					let e = i.player_response.streamingData.dashManifestUrl;
					s.push(getDashManifest(e, n));
				}
				if (r && i.player_response.streamingData.hlsManifestUrl) {
					let e = i.player_response.streamingData.hlsManifestUrl;
					s.push(getM3U8(e, n));
				}
				let c = await Promise.all(s);
				return (
					(i.formats = Object.values(Object.assign({}, ...c))),
					(i.formats = i.formats.map(p.addFormatMeta)),
					i.formats.sort(p.sortFormats),
					(i.full = !0),
					i
				);
			};
			const getDashManifest = (e, t) =>
					new Promise((n, i) => {
						let s = {};
						const c = r.parser(!1);
						let p;
						(c.onerror = i),
							(c.onopentag = (t) => {
								if ("ADAPTATIONSET" === t.name) p = t.attributes;
								else if ("REPRESENTATION" === t.name) {
									const n = parseInt(t.attributes.ID);
									isNaN(n) ||
										(s[e] = Object.assign(
											{
												itag: n,
												url: e,
												bitrate: parseInt(t.attributes.BANDWIDTH),
												mimeType: `${p.MIMETYPE}; codecs="${t.attributes.CODECS}"`,
											},
											t.attributes.HEIGHT
												? {
														width: parseInt(t.attributes.WIDTH),
														height: parseInt(t.attributes.HEIGHT),
														fps: parseInt(t.attributes.FRAMERATE),
												  }
												: {
														audioSampleRate:
															t.attributes.AUDIOSAMPLINGRATE,
												  }
										));
								}
							}),
							(c.onend = () => {
								n(s);
							});
						const l = o(new a(e, f).toString(), t.requestOptions);
						l.setEncoding("utf8"),
							l.on("error", i),
							l.on("data", (e) => {
								c.write(e);
							}),
							l.on("end", c.close.bind(c));
					}),
				getM3U8 = async (e, t) => {
					e = new a(e, f);
					let n = await o(e.toString(), t.requestOptions).text(),
						i = {};
					return (
						n
							.split("\n")
							.filter((e) => /^https?:\/\//.test(e))
							.forEach((e) => {
								const t = parseInt(e.match(/\/itag\/(\d+)\//)[1]);
								i[e] = { itag: t, url: e };
							}),
						i
					);
				};
			for (let e of ["getBasicInfo", "getInfo"]) {
				const n = t[e];
				t[e] = async (a, i = {}) => {
					s.checkForUpdates();
					let r = await l.getVideoID(a);
					const o = [e, r, i.lang].join("-");
					return t.cache.getOrSet(o, () => n(r, i));
				};
			}
			(t.validateID = l.validateID),
				(t.validateURL = l.validateURL),
				(t.getURLVideoID = l.getURLVideoID),
				(t.getVideoID = l.getVideoID);
		},
		function (e) {
			e.exports = JSON.parse(
				'{"name":"ytdl-core","description":"YouTube video downloader in pure javascript.","keywords":["youtube","video","download"],"version":"4.5.0","repository":{"type":"git","url":"git://github.com/fent/node-ytdl-core.git"},"author":"fent <fentbox@gmail.com> (https://github.com/fent)","contributors":["Tobias Kutscha (https://github.com/TimeForANinja)","Andrew Kelley (https://github.com/andrewrk)","Mauricio Allende (https://github.com/mallendeo)","Rodrigo Altamirano (https://github.com/raltamirano)","Jim Buck (https://github.com/JimmyBoh)"],"main":"./lib/index.js","types":"./typings/index.d.ts","files":["lib","typings"],"scripts":{"test":"nyc --reporter=lcov --reporter=text-summary npm run test:unit","test:unit":"mocha --ignore test/irl-test.js test/*-test.js --timeout 4000","test:irl":"mocha --timeout 16000 test/irl-test.js","lint":"eslint ./","lint:fix":"eslint --fix ./","lint:typings":"tslint typings/index.d.ts","lint:typings:fix":"tslint --fix typings/index.d.ts"},"dependencies":{"m3u8stream":"^0.8.3","miniget":"^4.0.0","sax":"^1.1.3"},"devDependencies":{"@types/node":"^13.1.0","assert-diff":"^3.0.1","dtslint":"^3.6.14","eslint":"^6.8.0","mocha":"^7.0.0","muk-require":"^1.2.0","nock":"^13.0.4","nyc":"^15.0.0","sinon":"^9.0.0","stream-equal":"~1.1.0","typescript":"^3.9.7"},"engines":{"node":">=10"},"license":"MIT"}'
			);
		},
		function (e, t) {
			e.exports = {
				5: {
					mimeType: 'video/flv; codecs="Sorenson H.283, mp3"',
					qualityLabel: "240p",
					bitrate: 25e4,
					audioBitrate: 64,
				},
				6: {
					mimeType: 'video/flv; codecs="Sorenson H.263, mp3"',
					qualityLabel: "270p",
					bitrate: 8e5,
					audioBitrate: 64,
				},
				13: {
					mimeType: 'video/3gp; codecs="MPEG-4 Visual, aac"',
					qualityLabel: null,
					bitrate: 5e5,
					audioBitrate: null,
				},
				17: {
					mimeType: 'video/3gp; codecs="MPEG-4 Visual, aac"',
					qualityLabel: "144p",
					bitrate: 5e4,
					audioBitrate: 24,
				},
				18: {
					mimeType: 'video/mp4; codecs="H.264, aac"',
					qualityLabel: "360p",
					bitrate: 5e5,
					audioBitrate: 96,
				},
				22: {
					mimeType: 'video/mp4; codecs="H.264, aac"',
					qualityLabel: "720p",
					bitrate: 2e6,
					audioBitrate: 192,
				},
				34: {
					mimeType: 'video/flv; codecs="H.264, aac"',
					qualityLabel: "360p",
					bitrate: 5e5,
					audioBitrate: 128,
				},
				35: {
					mimeType: 'video/flv; codecs="H.264, aac"',
					qualityLabel: "480p",
					bitrate: 8e5,
					audioBitrate: 128,
				},
				36: {
					mimeType: 'video/3gp; codecs="MPEG-4 Visual, aac"',
					qualityLabel: "240p",
					bitrate: 175e3,
					audioBitrate: 32,
				},
				37: {
					mimeType: 'video/mp4; codecs="H.264, aac"',
					qualityLabel: "1080p",
					bitrate: 3e6,
					audioBitrate: 192,
				},
				38: {
					mimeType: 'video/mp4; codecs="H.264, aac"',
					qualityLabel: "3072p",
					bitrate: 35e5,
					audioBitrate: 192,
				},
				43: {
					mimeType: 'video/webm; codecs="VP8, vorbis"',
					qualityLabel: "360p",
					bitrate: 5e5,
					audioBitrate: 128,
				},
				44: {
					mimeType: 'video/webm; codecs="VP8, vorbis"',
					qualityLabel: "480p",
					bitrate: 1e6,
					audioBitrate: 128,
				},
				45: {
					mimeType: 'video/webm; codecs="VP8, vorbis"',
					qualityLabel: "720p",
					bitrate: 2e6,
					audioBitrate: 192,
				},
				46: {
					mimeType: 'audio/webm; codecs="vp8, vorbis"',
					qualityLabel: "1080p",
					bitrate: null,
					audioBitrate: 192,
				},
				82: {
					mimeType: 'video/mp4; codecs="H.264, aac"',
					qualityLabel: "360p",
					bitrate: 5e5,
					audioBitrate: 96,
				},
				83: {
					mimeType: 'video/mp4; codecs="H.264, aac"',
					qualityLabel: "240p",
					bitrate: 5e5,
					audioBitrate: 96,
				},
				84: {
					mimeType: 'video/mp4; codecs="H.264, aac"',
					qualityLabel: "720p",
					bitrate: 2e6,
					audioBitrate: 192,
				},
				85: {
					mimeType: 'video/mp4; codecs="H.264, aac"',
					qualityLabel: "1080p",
					bitrate: 3e6,
					audioBitrate: 192,
				},
				91: {
					mimeType: 'video/ts; codecs="H.264, aac"',
					qualityLabel: "144p",
					bitrate: 1e5,
					audioBitrate: 48,
				},
				92: {
					mimeType: 'video/ts; codecs="H.264, aac"',
					qualityLabel: "240p",
					bitrate: 15e4,
					audioBitrate: 48,
				},
				93: {
					mimeType: 'video/ts; codecs="H.264, aac"',
					qualityLabel: "360p",
					bitrate: 5e5,
					audioBitrate: 128,
				},
				94: {
					mimeType: 'video/ts; codecs="H.264, aac"',
					qualityLabel: "480p",
					bitrate: 8e5,
					audioBitrate: 128,
				},
				95: {
					mimeType: 'video/ts; codecs="H.264, aac"',
					qualityLabel: "720p",
					bitrate: 15e5,
					audioBitrate: 256,
				},
				96: {
					mimeType: 'video/ts; codecs="H.264, aac"',
					qualityLabel: "1080p",
					bitrate: 25e5,
					audioBitrate: 256,
				},
				100: {
					mimeType: 'audio/webm; codecs="VP8, vorbis"',
					qualityLabel: "360p",
					bitrate: null,
					audioBitrate: 128,
				},
				101: {
					mimeType: 'audio/webm; codecs="VP8, vorbis"',
					qualityLabel: "360p",
					bitrate: null,
					audioBitrate: 192,
				},
				102: {
					mimeType: 'audio/webm; codecs="VP8, vorbis"',
					qualityLabel: "720p",
					bitrate: null,
					audioBitrate: 192,
				},
				120: {
					mimeType: 'video/flv; codecs="H.264, aac"',
					qualityLabel: "720p",
					bitrate: 2e6,
					audioBitrate: 128,
				},
				127: {
					mimeType: 'audio/ts; codecs="aac"',
					qualityLabel: null,
					bitrate: null,
					audioBitrate: 96,
				},
				128: {
					mimeType: 'audio/ts; codecs="aac"',
					qualityLabel: null,
					bitrate: null,
					audioBitrate: 96,
				},
				132: {
					mimeType: 'video/ts; codecs="H.264, aac"',
					qualityLabel: "240p",
					bitrate: 15e4,
					audioBitrate: 48,
				},
				133: {
					mimeType: 'video/mp4; codecs="H.264"',
					qualityLabel: "240p",
					bitrate: 2e5,
					audioBitrate: null,
				},
				134: {
					mimeType: 'video/mp4; codecs="H.264"',
					qualityLabel: "360p",
					bitrate: 3e5,
					audioBitrate: null,
				},
				135: {
					mimeType: 'video/mp4; codecs="H.264"',
					qualityLabel: "480p",
					bitrate: 5e5,
					audioBitrate: null,
				},
				136: {
					mimeType: 'video/mp4; codecs="H.264"',
					qualityLabel: "720p",
					bitrate: 1e6,
					audioBitrate: null,
				},
				137: {
					mimeType: 'video/mp4; codecs="H.264"',
					qualityLabel: "1080p",
					bitrate: 25e5,
					audioBitrate: null,
				},
				138: {
					mimeType: 'video/mp4; codecs="H.264"',
					qualityLabel: "4320p",
					bitrate: 135e5,
					audioBitrate: null,
				},
				139: {
					mimeType: 'audio/mp4; codecs="aac"',
					qualityLabel: null,
					bitrate: null,
					audioBitrate: 48,
				},
				140: {
					mimeType: 'audio/m4a; codecs="aac"',
					qualityLabel: null,
					bitrate: null,
					audioBitrate: 128,
				},
				141: {
					mimeType: 'audio/mp4; codecs="aac"',
					qualityLabel: null,
					bitrate: null,
					audioBitrate: 256,
				},
				151: {
					mimeType: 'video/ts; codecs="H.264, aac"',
					qualityLabel: "720p",
					bitrate: 5e4,
					audioBitrate: 24,
				},
				160: {
					mimeType: 'video/mp4; codecs="H.264"',
					qualityLabel: "144p",
					bitrate: 1e5,
					audioBitrate: null,
				},
				171: {
					mimeType: 'audio/webm; codecs="vorbis"',
					qualityLabel: null,
					bitrate: null,
					audioBitrate: 128,
				},
				172: {
					mimeType: 'audio/webm; codecs="vorbis"',
					qualityLabel: null,
					bitrate: null,
					audioBitrate: 192,
				},
				242: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "240p",
					bitrate: 1e5,
					audioBitrate: null,
				},
				243: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "360p",
					bitrate: 25e4,
					audioBitrate: null,
				},
				244: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "480p",
					bitrate: 5e5,
					audioBitrate: null,
				},
				247: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "720p",
					bitrate: 7e5,
					audioBitrate: null,
				},
				248: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "1080p",
					bitrate: 15e5,
					audioBitrate: null,
				},
				249: {
					mimeType: 'audio/webm; codecs="opus"',
					qualityLabel: null,
					bitrate: null,
					audioBitrate: 48,
				},
				250: {
					mimeType: 'audio/webm; codecs="opus"',
					qualityLabel: null,
					bitrate: null,
					audioBitrate: 64,
				},
				251: {
					mimeType: 'audio/webm; codecs="opus"',
					qualityLabel: null,
					bitrate: null,
					audioBitrate: 160,
				},
				264: {
					mimeType: 'video/mp4; codecs="H.264"',
					qualityLabel: "1440p",
					bitrate: 4e6,
					audioBitrate: null,
				},
				266: {
					mimeType: 'video/mp4; codecs="H.264"',
					qualityLabel: "2160p",
					bitrate: 125e5,
					audioBitrate: null,
				},
				271: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "1440p",
					bitrate: 9e6,
					audioBitrate: null,
				},
				272: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "4320p",
					bitrate: 2e7,
					audioBitrate: null,
				},
				278: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "144p 30fps",
					bitrate: 8e4,
					audioBitrate: null,
				},
				298: {
					mimeType: 'video/mp4; codecs="H.264"',
					qualityLabel: "720p",
					bitrate: 3e6,
					audioBitrate: null,
				},
				299: {
					mimeType: 'video/mp4; codecs="H.264"',
					qualityLabel: "1080p",
					bitrate: 55e5,
					audioBitrate: null,
				},
				300: {
					mimeType: 'video/ts; codecs="H.264, aac"',
					qualityLabel: "720p",
					bitrate: 1318e3,
					audioBitrate: 48,
				},
				302: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "720p HFR",
					bitrate: 25e5,
					audioBitrate: null,
				},
				303: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "1080p HFR",
					bitrate: 5e6,
					audioBitrate: null,
				},
				308: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "1440p HFR",
					bitrate: 1e7,
					audioBitrate: null,
				},
				313: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "2160p",
					bitrate: 13e6,
					audioBitrate: null,
				},
				315: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "2160p HFR",
					bitrate: 2e7,
					audioBitrate: null,
				},
				330: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "144p HDR, HFR",
					bitrate: 8e4,
					audioBitrate: null,
				},
				331: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "240p HDR, HFR",
					bitrate: 1e5,
					audioBitrate: null,
				},
				332: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "360p HDR, HFR",
					bitrate: 25e4,
					audioBitrate: null,
				},
				333: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "240p HDR, HFR",
					bitrate: 5e5,
					audioBitrate: null,
				},
				334: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "720p HDR, HFR",
					bitrate: 1e6,
					audioBitrate: null,
				},
				335: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "1080p HDR, HFR",
					bitrate: 15e5,
					audioBitrate: null,
				},
				336: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "1440p HDR, HFR",
					bitrate: 5e6,
					audioBitrate: null,
				},
				337: {
					mimeType: 'video/webm; codecs="VP9"',
					qualityLabel: "2160p HDR, HFR",
					bitrate: 12e6,
					audioBitrate: null,
				},
			};
		},
		function (e, t, n) {
			const a = n(35),
				i = n(14),
				{ URL: r } = n(3),
				{ parseTimestamp: o } = n(42),
				s = "https://www.youtube.com/watch?v=",
				c = { song: { name: "Music", url: "https://music.youtube.com/" } },
				getText = (e) => (e ? (e.runs ? e.runs[0].text : e.simpleText) : null);
			t.getMedia = (e) => {
				let t = {},
					n = [];
				try {
					n = e.response.contents.twoColumnWatchNextResults.results.results.contents;
				} catch (e) {}
				let a = n.find((e) => e.videoSecondaryInfoRenderer);
				if (!a) return {};
				try {
					let e = (
						a.metadataRowContainer || a.videoSecondaryInfoRenderer.metadataRowContainer
					).metadataRowContainerRenderer.rows;
					for (let n of e)
						if (n.metadataRowRenderer) {
							let e = getText(n.metadataRowRenderer.title).toLowerCase(),
								a = n.metadataRowRenderer.contents[0];
							t[e] = getText(a);
							let i = a.runs;
							i &&
								i[0].navigationEndpoint &&
								(t[e + "_url"] = new r(
									i[0].navigationEndpoint.commandMetadata.webCommandMetadata.url,
									s
								).toString()),
								e in c && ((t.category = c[e].name), (t.category_url = c[e].url));
						} else if (n.richMetadataRowRenderer) {
							let e = n.richMetadataRowRenderer.contents,
								a = e.filter(
									(e) =>
										"RICH_METADATA_RENDERER_STYLE_BOX_ART" ===
										e.richMetadataRenderer.style
								);
							for (let { richMetadataRenderer: e } of a) {
								let n = e;
								t.year = getText(n.subtitle);
								let a = getText(n.callToAction).split(" ")[1];
								(t[a] = getText(n.title)),
									(t[a + "_url"] = new r(
										n.endpoint.commandMetadata.webCommandMetadata.url,
										s
									).toString()),
									(t.thumbnails = n.thumbnail.thumbnails);
							}
							let i = e.filter(
								(e) =>
									"RICH_METADATA_RENDERER_STYLE_TOPIC" ===
									e.richMetadataRenderer.style
							);
							for (let { richMetadataRenderer: e } of i) {
								let n = e;
								(t.category = getText(n.title)),
									(t.category_url = new r(
										n.endpoint.commandMetadata.webCommandMetadata.url,
										s
									).toString());
							}
						}
				} catch (e) {}
				return t;
			};
			const isVerified = (e) =>
				!(!e || !e.find((e) => "Verified" === e.metadataBadgeRenderer.tooltip));
			t.getAuthor = (e) => {
				let t,
					n,
					i = [],
					o = !1;
				try {
					let c = e.response.contents.twoColumnWatchNextResults.results.results.contents.find(
						(e) =>
							e.videoSecondaryInfoRenderer &&
							e.videoSecondaryInfoRenderer.owner &&
							e.videoSecondaryInfoRenderer.owner.videoOwnerRenderer
					).videoSecondaryInfoRenderer.owner.videoOwnerRenderer;
					(t = c.navigationEndpoint.browseEndpoint.browseId),
						(i = c.thumbnail.thumbnails.map(
							(e) => ((e.url = new r(e.url, s).toString()), e)
						)),
						(n = a.parseAbbreviatedNumber(getText(c.subscriberCountText))),
						(o = isVerified(c.badges));
				} catch (e) {}
				try {
					let c =
							e.player_response.microformat &&
							e.player_response.microformat.playerMicroformatRenderer,
						p = (c && c.channelId) || t || e.player_response.videoDetails.channelId,
						l = {
							id: p,
							name: c ? c.ownerChannelName : e.player_response.videoDetails.author,
							user: c ? c.ownerProfileUrl.split("/").slice(-1)[0] : null,
							channel_url: "https://www.youtube.com/channel/" + p,
							external_channel_url: c
								? "https://www.youtube.com/channel/" + c.externalChannelId
								: "",
							user_url: c ? new r(c.ownerProfileUrl, s).toString() : "",
							thumbnails: i,
							verified: o,
							subscriber_count: n,
						};
					return (
						i.length &&
							a.deprecate(
								l,
								"avatar",
								l.thumbnails[0].url,
								"author.avatar",
								"author.thumbnails[0].url"
							),
						l
					);
				} catch (e) {
					return {};
				}
			};
			const parseRelatedVideo = (e, t) => {
				if (e)
					try {
						let n = getText(e.viewCountText),
							i = getText(e.shortViewCountText),
							c = t.find((t) => t.id === e.videoId);
						/^\d/.test(i) || (i = (c && c.short_view_count_text) || ""),
							(n = (/^\d/.test(n) ? n : i).split(" ")[0]);
						let p = e.shortBylineText.runs[0].navigationEndpoint.browseEndpoint,
							l = p.browseId,
							u = getText(e.shortBylineText),
							d = (p.canonicalBaseUrl || "").split("/").slice(-1)[0],
							m = {
								id: e.videoId,
								title: getText(e.title),
								published: getText(e.publishedTimeText),
								author: {
									id: l,
									name: u,
									user: d,
									channel_url: "https://www.youtube.com/channel/" + l,
									user_url: "https://www.youtube.com/user/" + d,
									thumbnails: e.channelThumbnail.thumbnails.map(
										(e) => ((e.url = new r(e.url, s).toString()), e)
									),
									verified: isVerified(e.ownerBadges),
									[Symbol.toPrimitive]: () => (
										console.warn(
											"`relatedVideo.author` will be removed in a near future release, use `relatedVideo.author.name` instead."
										),
										m.author.name
									),
								},
								short_view_count_text: i.split(" ")[0],
								view_count: n.replace(/,/g, ""),
								length_seconds: e.lengthText
									? Math.floor(o(getText(e.lengthText)) / 1e3)
									: t && "" + t.length_seconds,
								thumbnails: e.thumbnail.thumbnails,
								richThumbnails: e.richThumbnail
									? e.richThumbnail.movingThumbnailRenderer.movingThumbnailDetails
											.thumbnails
									: [],
								isLive: !(
									!e.badges ||
									!e.badges.find(
										(e) => "LIVE NOW" === e.metadataBadgeRenderer.label
									)
								),
							};
						return (
							a.deprecate(
								m,
								"author_thumbnail",
								m.author.thumbnails[0].url,
								"relatedVideo.author_thumbnail",
								"relatedVideo.author.thumbnails[0].url"
							),
							a.deprecate(
								m,
								"ucid",
								m.author.id,
								"relatedVideo.ucid",
								"relatedVideo.author.id"
							),
							a.deprecate(
								m,
								"video_thumbnail",
								m.thumbnails[0].url,
								"relatedVideo.video_thumbnail",
								"relatedVideo.thumbnails[0].url"
							),
							m
						);
					} catch (e) {}
			};
			(t.getRelatedVideos = (e) => {
				let t = [],
					n = [];
				try {
					t = e.response.webWatchNextResponseExtensionData.relatedVideoArgs
						.split(",")
						.map((e) => i.parse(e));
				} catch (e) {}
				try {
					n =
						e.response.contents.twoColumnWatchNextResults.secondaryResults
							.secondaryResults.results;
				} catch (e) {
					return [];
				}
				let a = [];
				for (let e of n || []) {
					let n = e.compactVideoRenderer;
					if (n) {
						let e = parseRelatedVideo(n, t);
						e && a.push(e);
					} else {
						let n = e.compactAutoplayRenderer || e.itemSectionRenderer;
						if (!n || !Array.isArray(n.contents)) continue;
						for (let e of n.contents) {
							let n = parseRelatedVideo(e.compactVideoRenderer, t);
							n && a.push(n);
						}
					}
				}
				return a;
			}),
				(t.getLikes = (e) => {
					try {
						let t = e.response.contents.twoColumnWatchNextResults.results.results.contents
							.find((e) => e.videoPrimaryInfoRenderer)
							.videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons.find(
								(e) =>
									e.toggleButtonRenderer &&
									"LIKE" === e.toggleButtonRenderer.defaultIcon.iconType
							);
						return parseInt(
							t.toggleButtonRenderer.defaultText.accessibility.accessibilityData.label.replace(
								/\D+/g,
								""
							)
						);
					} catch (e) {
						return null;
					}
				}),
				(t.getDislikes = (e) => {
					try {
						let t = e.response.contents.twoColumnWatchNextResults.results.results.contents
							.find((e) => e.videoPrimaryInfoRenderer)
							.videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons.find(
								(e) =>
									e.toggleButtonRenderer &&
									"DISLIKE" === e.toggleButtonRenderer.defaultIcon.iconType
							);
						return parseInt(
							t.toggleButtonRenderer.defaultText.accessibility.accessibilityData.label.replace(
								/\D+/g,
								""
							)
						);
					} catch (e) {
						return null;
					}
				}),
				(t.cleanVideoDetails = (e, t) => (
					(e.thumbnails = e.thumbnail.thumbnails),
					delete e.thumbnail,
					a.deprecate(
						e,
						"thumbnail",
						{ thumbnails: e.thumbnails },
						"videoDetails.thumbnail.thumbnails",
						"videoDetails.thumbnails"
					),
					(e.description = e.shortDescription || getText(e.description)),
					delete e.shortDescription,
					a.deprecate(
						e,
						"shortDescription",
						e.description,
						"videoDetails.shortDescription",
						"videoDetails.description"
					),
					(e.lengthSeconds =
						t.player_response.microformat &&
						t.player_response.microformat.playerMicroformatRenderer.lengthSeconds),
					e
				)),
				(t.getStoryboards = (e) => {
					const t =
						e.player_response.storyboards &&
						e.player_response.storyboards.playerStoryboardSpecRenderer &&
						e.player_response.storyboards.playerStoryboardSpecRenderer.spec &&
						e.player_response.storyboards.playerStoryboardSpecRenderer.spec.split("|");
					if (!t) return [];
					const n = new r(t.shift());
					return t.map((e, t) => {
						let [a, i, r, o, s, c, p, l] = e.split("#");
						n.searchParams.set("sigh", l),
							(r = parseInt(r, 10)),
							(o = parseInt(o, 10)),
							(s = parseInt(s, 10));
						const u = Math.ceil(r / (o * s));
						return {
							templateUrl: n.toString().replace("$L", t).replace("$N", p),
							thumbnailWidth: parseInt(a, 10),
							thumbnailHeight: parseInt(i, 10),
							thumbnailCount: r,
							interval: parseInt(c, 10),
							columns: o,
							rows: s,
							storyboardCount: u,
						};
					});
				});
		},
		function (e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			const a = n(0);
			class m3u8Parser extends a.Writable {
				constructor() {
					super(),
						(this._lastLine = ""),
						(this._seq = 0),
						(this._nextItemDuration = null),
						(this._nextItemRange = null),
						(this._lastItemRangeEnd = 0),
						this.on("finish", () => {
							this._parseLine(this._lastLine), this.emit("end");
						});
				}
				_parseAttrList(e) {
					let t,
						n = {},
						a = /([A-Z0-9-]+)=(?:"([^"]*?)"|([^,]*?))/g;
					for (; null != (t = a.exec(e)); ) n[t[1]] = t[2] || t[3];
					return n;
				}
				_parseRange(e) {
					if (!e) return null;
					let t = e.split("@"),
						n = t[1] ? parseInt(t[1]) : this._lastItemRangeEnd + 1,
						a = { start: n, end: n + parseInt(t[0]) - 1 };
					return (this._lastItemRangeEnd = a.end), a;
				}
				_parseLine(e) {
					let t = e.match(/^#(EXT[A-Z0-9-]+)(?::(.*))?/);
					if (t) {
						const e = t[1],
							n = t[2] || "";
						switch (e) {
							case "EXT-X-PROGRAM-DATE-TIME":
								this.emit("starttime", new Date(n).getTime());
								break;
							case "EXT-X-MEDIA-SEQUENCE":
								this._seq = parseInt(n);
								break;
							case "EXT-X-MAP": {
								let e = this._parseAttrList(n);
								if (!e.URI)
									return void this.destroy(
										new Error(
											"`EXT-X-MAP` found without required attribute `URI`"
										)
									);
								this.emit("item", {
									url: e.URI,
									seq: this._seq,
									init: !0,
									duration: 0,
									range: this._parseRange(e.BYTERANGE),
								});
								break;
							}
							case "EXT-X-BYTERANGE":
								this._nextItemRange = this._parseRange(n);
								break;
							case "EXTINF":
								this._nextItemDuration = Math.round(
									1e3 * parseFloat(n.split(",")[0])
								);
								break;
							case "EXT-X-ENDLIST":
								this.emit("endlist");
						}
					} else
						!/^#/.test(e) &&
							e.trim() &&
							(this.emit("item", {
								url: e.trim(),
								seq: this._seq++,
								duration: this._nextItemDuration,
								range: this._nextItemRange,
							}),
							(this._nextItemRange = null));
				}
				_write(e, t, n) {
					let a = e.toString("utf8").split("\n");
					this._lastLine && (a[0] = this._lastLine + a[0]),
						a.forEach((e, t) => {
							this.destroyed ||
								(t < a.length - 1 ? this._parseLine(e) : (this._lastLine = e));
						}),
						n();
				}
			}
			t.default = m3u8Parser;
		},
		function (e, t, n) {
			"use strict";
			var a =
				(this && this.__importDefault) ||
				function (e) {
					return e && e.__esModule ? e : { default: e };
				};
			Object.defineProperty(t, "__esModule", { value: !0 });
			const i = n(0),
				r = a(n(73)),
				o = n(77);
			class DashMPDParser extends i.Writable {
				constructor(e) {
					let t;
					super(),
						(this._parser = r.default.createStream(!1, { lowercase: !0 })),
						this._parser.on("error", this.destroy.bind(this));
					let n,
						a,
						i,
						s,
						c,
						p,
						l,
						u,
						d = 0,
						m = 0,
						f = [],
						h = !1,
						v = !1;
					const tmpl = (t) => {
						const n = { RepresentationID: e, Number: m, Time: d };
						return t.replace(/\$(\w+)\$/g, (e, t) => n[t] + "");
					};
					this._parser.on("opentag", (r) => {
						switch (r.name) {
							case "mpd":
								(d = r.attributes.availabilitystarttime
									? new Date(r.attributes.availabilitystarttime).getTime()
									: 0),
									(p = "dynamic" !== r.attributes.type);
								break;
							case "period":
								(m = 0),
									(a = 1e3),
									(s = 0),
									(i = 0),
									(c = []),
									(l = 0),
									(u = o.durationStr(r.attributes.start) || 0);
								break;
							case "segmentlist":
								(m = parseInt(r.attributes.startnumber) || m),
									(a = parseInt(r.attributes.timescale) || a),
									(s = parseInt(r.attributes.duration) || s),
									(i = parseInt(r.attributes.presentationtimeoffset) || i);
								break;
							case "segmenttemplate":
								(n = r.attributes),
									(m = parseInt(r.attributes.startnumber) || m),
									(a = parseInt(r.attributes.timescale) || a);
								break;
							case "segmenttimeline":
							case "baseurl":
								t = r.name;
								break;
							case "s":
								f.push({
									duration: parseInt(r.attributes.d),
									repeat: parseInt(r.attributes.r),
									time: parseInt(r.attributes.t),
								});
								break;
							case "adaptationset":
							case "representation":
								l++,
									null == e && (e = r.attributes.id),
									(h = r.attributes.id === e + ""),
									h &&
										(u && (d += u),
										i && (d -= (i / a) * 1e3),
										this.emit("starttime", d));
								break;
							case "initialization":
								h &&
									this.emit("item", {
										url: c.filter((e) => !!e).join("") + r.attributes.sourceurl,
										seq: m,
										init: !0,
										duration: 0,
									});
								break;
							case "segmenturl":
								if (h) {
									v = !0;
									let e = f.shift(),
										t = (((e && e.duration) || s) / a) * 1e3;
									this.emit("item", {
										url: c.filter((e) => !!e).join("") + r.attributes.media,
										seq: m++,
										duration: t,
									}),
										(d += t);
								}
						}
					});
					const onEnd = () => {
						p && this.emit("endlist"),
							h
								? this.emit("end")
								: this.destroy(Error(`Representation '${e}' not found`));
					};
					this._parser.on("closetag", (e) => {
						switch (e) {
							case "adaptationset":
							case "representation":
								if ((l--, n && f.length)) {
									(v = !0),
										n.initialization &&
											this.emit("item", {
												url:
													c.filter((e) => !!e).join("") +
													tmpl(n.initialization),
												seq: m,
												init: !0,
												duration: 0,
											});
									for (let { duration: e, repeat: t, time: i } of f) {
										(e = (e / a) * 1e3), (t = t || 1), (d = i || d);
										for (let a = 0; a < t; a++)
											this.emit("item", {
												url: c.filter((e) => !!e).join("") + tmpl(n.media),
												seq: m++,
												duration: e,
											}),
												(d += e);
									}
								}
								v &&
									(this.emit("endearly"),
									onEnd(),
									this._parser.removeAllListeners(),
									this.removeAllListeners("finish"));
						}
					}),
						this._parser.on("text", (e) => {
							"baseurl" === t && ((c[l] = e), (t = null));
						}),
						this.on("finish", onEnd);
				}
				_write(e, t, n) {
					this._parser.write(e, t), n();
				}
			}
			t.default = DashMPDParser;
		},
		function (e, t, n) {
			"use strict";
			Object.defineProperty(t, "__esModule", { value: !0 });
			t.default = class Queue {
				constructor(e, t = {}) {
					(this._worker = e),
						(this._concurrency = t.concurrency || 1),
						(this.tasks = []),
						(this.total = 0),
						(this.active = 0);
				}
				push(e, t) {
					this.tasks.push({ item: e, callback: t }), this.total++, this._next();
				}
				_next() {
					if (this.active >= this._concurrency || !this.tasks.length) return;
					const { item: e, callback: t } = this.tasks.shift();
					let n = !1;
					this.active++,
						this._worker(e, (e, a) => {
							n || (this.active--, (n = !0), t && t(e, a), this._next());
						});
				}
				die() {
					this.tasks = [];
				}
			};
		},
		function (e, t, n) {
			const a = n(80),
				i = n(1),
				r = n(2),
				o = "https://www.youtube.com/watch?v=",
				s = a.prepImg,
				parseItem = (e, t) => {
					const n = Object.keys(e)[0];
					switch (n) {
						case "videoRenderer":
							return parseVideo(e[n]);
						case "channelRenderer":
							return parseChannel(e[n]);
						case "playlistRenderer":
							return parsePlaylist(e[n]);
						case "radioRenderer":
							return parseMix(e[n]);
						case "gridMovieRenderer":
							return parseGridMovie(e[n]);
						case "gridVideoRenderer":
							return parseVideo(e[n]);
						case "movieRenderer":
							return parseMovie(e[n]);
						case "shelfRenderer":
						case "richShelfRenderer":
							return parseShelf(e[n]);
						case "showRenderer":
							return parseShow(e[n]);
						case "didYouMeanRenderer":
							return parseDidYouMeanRenderer(e[n], t);
						case "showingResultsForRenderer":
							return parseShowingResultsFor(e, t);
						case "horizontalCardListRenderer":
							return parseHorizontalCardListRenderer(e[n], t);
						case "backgroundPromoRenderer":
							if ("No results found" === a.parseText(e[n].title)) return null;
							throw new Error("unknown message in backgroundPromoRenderer");
						case "messageRenderer":
							return null;
						case "clarificationRenderer":
							return parseClarification(e[n]);
						case "carouselAdRenderer":
						case "searchPyvRenderer":
						case "promotedVideoRenderer":
						case "promotedSparklesTextSearchRenderer":
						case "emergencyOneboxRenderer":
							return null;
						case "debug#previewCardRenderer":
							return parseHorizontalChannelListItem(e[n]);
						default:
							throw new Error(`type ${n} is not known`);
					}
				},
				catchAndLogFunc = (e, t = []) => {
					if (!Array.isArray(t))
						throw new Error("params has to be an (optionally empty) array");
					try {
						return e(...t);
					} catch (a) {
						const o = i.resolve(__dirname, "../dumps/"),
							s = i.resolve(
								o,
								`${Math.random().toString(36).substr(3)}-${Date.now()}.txt`
							),
							c = i.resolve(__dirname, "../package.json"),
							p = n(179)(c).bugs.url;
						r.existsSync(o) || r.mkdirSync(o),
							r.writeFileSync(s, JSON.stringify(t, null, 2)),
							console.error(a.stack),
							console.error("\n/" + "*".repeat(200)),
							console.error(`failed at func ${e.name}: ${a.message}`),
							console.error(`pls post the the files in ${o} to ${p}`);
						let l = `os: ${process.platform}-${process.arch}, `;
						return (
							(l += `node.js: ${process.version}, `),
							(l += "ytpl: " + n(81).version),
							console.error(l),
							console.error("*".repeat(200) + "\\"),
							null
						);
					}
				};
			(e.exports = (...e) => catchAndLogFunc(parseItem, e))._hidden = {
				catchAndLogFunc: catchAndLogFunc,
				parseItem: parseItem,
			};
			const parseVideo = (e) => {
					const t = e.ownerText && e.ownerText.runs[0];
					let n = null;
					t &&
						(n =
							t.navigationEndpoint.browseEndpoint.canonicalBaseUrl ||
							t.navigationEndpoint.commandMetadata.webCommandMetadata.url);
					const i = Array.isArray(e.badges)
							? e.badges.map((e) => e.metadataBadgeRenderer.label)
							: [],
						r = i.some((e) => "LIVE NOW" === e),
						c = e.upcomingEventData
							? Number(e.upcomingEventData.startTime + "000")
							: null,
						p = t
							? e.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer
							: null,
						l = !(
							!e.ownerBadges || !JSON.stringify(e.ownerBadges).includes("OFFICIAL")
						),
						u = !(
							!e.ownerBadges || !JSON.stringify(e.ownerBadges).includes("VERIFIED")
						),
						d = e.thumbnailOverlays.find(
							(e) => "thumbnailOverlayTimeStatusRenderer" === Object.keys(e)[0]
						),
						m = e.lengthText || (d && d.thumbnailOverlayTimeStatusRenderer.text);
					return {
						type: "video",
						title: a.parseText(e.title, ""),
						id: e.videoId,
						url: o + e.videoId,
						bestThumbnail: s(e.thumbnail.thumbnails)[0],
						thumbnails: s(e.thumbnail.thumbnails),
						isUpcoming: !!c,
						upcoming: c,
						isLive: r,
						badges: i,
						author: t
							? {
									name: t.text,
									channelID: t.navigationEndpoint.browseEndpoint.browseId,
									url: new URL(n, o).toString(),
									bestAvatar: s(p.thumbnail.thumbnails)[0],
									avatars: s(p.thumbnail.thumbnails),
									ownerBadges: Array.isArray(e.ownerBadges)
										? e.ownerBadges.map((e) => e.metadataBadgeRenderer.tooltip)
										: [],
									verified: l || u,
							  }
							: null,
						description: a.parseText(e.descriptionSnippet),
						views: e.viewCountText ? a.parseIntegerFromText(e.viewCountText) : null,
						duration: a.parseText(m),
						uploadedAt: a.parseText(e.publishedTimeText),
					};
				},
				parseChannel = (e) => {
					const t =
							e.navigationEndpoint.browseEndpoint.canonicalBaseUrl ||
							e.navigationEndpoint.commandMetadata.webCommandMetadata.url,
						n = !(
							!e.ownerBadges || !JSON.stringify(e.ownerBadges).includes("OFFICIAL")
						),
						i = !(
							!e.ownerBadges || !JSON.stringify(e.ownerBadges).includes("VERIFIED")
						);
					return {
						type: "channel",
						name: a.parseText(e.title, ""),
						channelID: e.channelId,
						url: new URL(t, o).toString(),
						bestAvatar: s(e.thumbnail.thumbnails)[0],
						avatars: s(e.thumbnail.thumbnails),
						verified: n || i,
						subscribers: a.parseText(e.subscriberCountText),
						descriptionShort: a.parseText(e.descriptionSnippet),
						videos: e.videoCountText ? a.parseIntegerFromText(e.videoCountText) : null,
					};
				},
				parsePlaylist = (e) => ({
					type: "playlist",
					title: a.parseText(e.title, ""),
					playlistID: e.playlistId,
					url: "https://www.youtube.com/playlist?list=" + e.playlistId,
					firstVideo:
						Array.isArray(e.videos) && e.videos.length > 0
							? {
									id: e.navigationEndpoint.watchEndpoint.videoId,
									shortURL: o + e.navigationEndpoint.watchEndpoint.videoId,
									url: new URL(
										e.navigationEndpoint.commandMetadata.webCommandMetadata.url,
										o
									).toString(),
									title: a.parseText(e.videos[0].childVideoRenderer.title, ""),
									length: a.parseText(
										e.videos[0].childVideoRenderer.lengthText,
										""
									),
									thumbnails: s(e.thumbnails[0].thumbnails),
									bestThumbnail: s(e.thumbnails[0].thumbnails)[0],
							  }
							: null,
					owner: e.shortBylineText.simpleText ? null : _parseOwner(e),
					publishedAt: a.parseText(e.publishedTimeText),
					length: Number(e.videoCount),
				}),
				parseMix = (e) => ({
					type: "mix",
					title: a.parseText(e.title, ""),
					url: new URL(
						e.navigationEndpoint.commandMetadata.webCommandMetadata.url,
						o
					).toString(),
					firstVideo: {
						id: e.navigationEndpoint.watchEndpoint.videoId,
						shortURL: o + e.navigationEndpoint.watchEndpoint.videoId,
						url: new URL(
							e.navigationEndpoint.commandMetadata.webCommandMetadata.url,
							o
						).toString(),
						text: a.parseText(e.videos[0].childVideoRenderer.title, ""),
						length: a.parseText(e.videos[0].childVideoRenderer.lengthText, ""),
						thumbnails: s(e.thumbnail.thumbnails),
						bestThumbnail: s(e.thumbnail.thumbnails)[0],
					},
				}),
				parseDidYouMeanRenderer = (e, t) => (
					t &&
						Array.isArray(t.refinements) &&
						t.refinements.unshift({
							q: a.parseText(e.correctedQuery, ""),
							url: new URL(
								e.correctedQueryEndpoint.commandMetadata.webCommandMetadata.url,
								o
							).toString(),
							bestThumbnail: null,
							thumbnails: null,
						}),
					null
				),
				parseShowingResultsFor = (e, t) => {
					const n = e.showingResultsForRenderer.correctedQuery || e.correctedQuery;
					return t && (t.correctedQuery = a.parseText(n)), null;
				},
				parseClarification = (e) => ({
					type: "clarification",
					title: a.parseText(e.contentTitle, ""),
					text: a.parseText(e.text, ""),
					sources: [
						{
							text: a.parseText(e.source, ""),
							url: new URL(e.endpoint.urlEndpoint.url, o).toString(),
						},
						e.secondarySource
							? {
									text: a.parseText(e.secondarySource, ""),
									url: new URL(e.secondaryEndpoint.urlEndpoint.url, o).toString(),
							  }
							: null,
					].filter((e) => e),
				}),
				parseHorizontalCardListRenderer = (e, t) => {
					const n = Object.keys(e.cards[0])[0];
					switch (n) {
						case "searchRefinementCardRenderer":
							return parseHorizontalRefinements(e, t);
						case "previewCardRenderer":
							return parseHorizontalChannelList(e);
						default:
							throw new Error(
								`subType ${n} of type horizontalCardListRenderer not known`
							);
					}
				},
				parseHorizontalRefinements = (e, t) => (
					t &&
						Array.isArray(t.refinements) &&
						t.refinements.push(
							...e.cards.map((e) => {
								const t =
									e.searchRefinementCardRenderer.searchEndpoint.commandMetadata
										.webCommandMetadata.url;
								return {
									q: a.parseText(e.searchRefinementCardRenderer.query, ""),
									url: new URL(t, o).toString(),
									bestThumbnail: s(
										e.searchRefinementCardRenderer.thumbnail.thumbnails
									)[0],
									thumbnails: s(
										e.searchRefinementCardRenderer.thumbnail.thumbnails
									),
								};
							})
						),
					null
				),
				parseHorizontalChannelList = (e) => {
					if (!JSON.stringify(e.style).includes("CHANNELS"))
						throw new Error("unknown style in horizontalCardListRenderer");
					return {
						type: "horizontalChannelList",
						title: a.parseText(e.header.richListHeaderRenderer.title, ""),
						channels: e.cards
							.map((e) => parseHorizontalChannelListItem(e.previewCardRenderer))
							.filter((e) => e),
					};
				},
				parseHorizontalChannelListItem = (e) => {
					const t =
						e.header.richListHeaderRenderer.channelThumbnail
							.channelThumbnailWithLinkRenderer;
					return {
						type: "channelPreview",
						name: a.parseText(e.header.richListHeaderRenderer.title, ""),
						channelID: e.header.richListHeaderRenderer.endpoint.browseEndpoint.browseId,
						url: new URL(
							e.header.richListHeaderRenderer.endpoint.commandMetadata.webCommandMetadata.url,
							o
						).toString(),
						bestAvatar: s(t.thumbnail.thumbnails)[0],
						avatars: s(t.thumbnail.thumbnails),
						subscribers: a.parseText(e.header.richListHeaderRenderer.subtitle, ""),
						videos: e.contents
							.map((e) => parseVideo(e.gridVideoRenderer))
							.filter((e) => e),
					};
				},
				parseGridMovie = (e) => ({
					type: "gridMovie",
					title: a.parseText(e.title),
					videoID: e.videoId,
					url: new URL(
						e.navigationEndpoint.commandMetadata.webCommandMetadata.url,
						o
					).toString(),
					bestThumbnail: s(e.thumbnail.thumbnails)[0],
					thumbnails: s(e.thumbnail.thumbnails),
					duration: a.parseText(e.lengthText),
				}),
				parseMovie = (e) => {
					e.bottomMetadataItems = (e.bottomMetadataItems || []).map((e) =>
						a.parseText(e)
					);
					const t = e.bottomMetadataItems.find((e) => e.startsWith("Actors")),
						n = e.bottomMetadataItems.find((e) => e.startsWith("Director"));
					return {
						type: "movie",
						title: a.parseText(e.title, ""),
						videoID: e.videoId,
						url: new URL(
							e.navigationEndpoint.commandMetadata.webCommandMetadata.url,
							o
						).toString(),
						bestThumbnail: s(e.thumbnail.thumbnails)[0],
						thumbnails: s(e.thumbnail.thumbnails),
						owner: _parseOwner(e),
						description: a.parseText(e.descriptionSnippet),
						meta: a.parseText(e.topMetadataItems[0], "").split(" · "),
						actors: t ? t.split(": ")[1].split(", ") : [],
						directors: n ? n.split(": ")[1].split(", ") : [],
						duration: a.parseText(e.lengthText, ""),
					};
				},
				parseShow = (e) => {
					const t = e.thumbnailRenderer.showCustomThumbnailRenderer.thumbnail.thumbnails,
						n = _parseOwner(e);
					return (
						delete n.ownerBadges,
						delete n.verified,
						{
							type: "show",
							title: a.parseText(e.title, ""),
							bestThumbnail: s(t)[0],
							thumbnails: s(t),
							url: new URL(
								e.navigationEndpoint.commandMetadata.webCommandMetadata.url,
								o
							).toString(),
							videoID: e.navigationEndpoint.watchEndpoint.videoId,
							playlistID: e.navigationEndpoint.watchEndpoint.playlistId,
							episodes: a.parseIntegerFromText(
								e.thumbnailOverlays[0].thumbnailOverlayBottomPanelRenderer.text
							),
							owner: n,
						}
					);
				},
				parseShelf = (e) => {
					let t = [];
					return (
						(t = Array.isArray(e.contents)
							? e.contents.map((e) => e.richItemRenderer.content)
							: (
									e.content.verticalListRenderer ||
									e.content.horizontalMovieListRenderer
							  ).items),
						{
							type: "shelf",
							title: a.parseText(e.title, "Show More"),
							items: t.map((e) => parseItem(e)).filter((e) => e),
						}
					);
				},
				_parseOwner = (e) => {
					const t =
							(e.shortBylineText && e.shortBylineText.runs[0]) ||
							(e.longBylineText && e.longBylineText.runs[0]),
						n =
							t.navigationEndpoint.browseEndpoint.canonicalBaseUrl ||
							t.navigationEndpoint.commandMetadata.webCommandMetadata.url,
						a = !(
							!e.ownerBadges || !JSON.stringify(e.ownerBadges).includes("OFFICIAL")
						),
						i = !(
							!e.ownerBadges || !JSON.stringify(e.ownerBadges).includes("VERIFIED")
						),
						r = t.navigationEndpoint.commandMetadata.webCommandMetadata.url;
					return {
						name: t.text,
						channelID: t.navigationEndpoint.browseEndpoint.browseId,
						url: new URL(n || r, o).toString(),
						ownerBadges: Array.isArray(e.ownerBadges)
							? e.ownerBadges.map((e) => e.metadataBadgeRenderer.tooltip)
							: [],
						verified: a || i,
					};
				};
		},
		function (e, t) {
			function webpackEmptyContext(e) {
				var t = new Error("Cannot find module '" + e + "'");
				throw ((t.code = "MODULE_NOT_FOUND"), t);
			}
			(webpackEmptyContext.keys = function () {
				return [];
			}),
				(webpackEmptyContext.resolve = webpackEmptyContext),
				(e.exports = webpackEmptyContext),
				(webpackEmptyContext.id = 179);
		},
		function (e, t) {},
		function (e, t, n) {
			"use strict";
			n.r(t);
			n(86);
			const a = {},
				i = {
					set(e, t, n) {
						return (a[t] = n), Reflect.set(...arguments);
					},
				};
			function generateContext(e) {
				return new Proxy({ ...a, ...e }, i);
			}
			var r = a,
				o = n(44),
				s = n.n(o),
				c = n(4),
				p = n.n(c),
				l = n(1),
				u = n.n(l),
				d = n(43),
				m = n.n(d),
				f = n(0),
				h = n(3),
				v = n(36),
				g = n(5);
			const b = f.Readable,
				x = Symbol("buffer"),
				y = Symbol("type");
			class Blob {
				constructor() {
					this[y] = "";
					const e = arguments[0],
						t = arguments[1],
						n = [];
					let a = 0;
					if (e) {
						const t = e,
							i = Number(t.length);
						for (let e = 0; e < i; e++) {
							const i = t[e];
							let r;
							(r =
								i instanceof Buffer
									? i
									: ArrayBuffer.isView(i)
									? Buffer.from(i.buffer, i.byteOffset, i.byteLength)
									: i instanceof ArrayBuffer
									? Buffer.from(i)
									: i instanceof Blob
									? i[x]
									: Buffer.from("string" == typeof i ? i : String(i))),
								(a += r.length),
								n.push(r);
						}
					}
					this[x] = Buffer.concat(n);
					let i = t && void 0 !== t.type && String(t.type).toLowerCase();
					i && !/[^\u0020-\u007E]/.test(i) && (this[y] = i);
				}
				get size() {
					return this[x].length;
				}
				get type() {
					return this[y];
				}
				text() {
					return Promise.resolve(this[x].toString());
				}
				arrayBuffer() {
					const e = this[x],
						t = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
					return Promise.resolve(t);
				}
				stream() {
					const e = new b();
					return (e._read = function () {}), e.push(this[x]), e.push(null), e;
				}
				toString() {
					return "[object Blob]";
				}
				slice() {
					const e = this.size,
						t = arguments[0],
						n = arguments[1];
					let a, i;
					(a = void 0 === t ? 0 : t < 0 ? Math.max(e + t, 0) : Math.min(t, e)),
						(i = void 0 === n ? e : n < 0 ? Math.max(e + n, 0) : Math.min(n, e));
					const r = Math.max(i - a, 0),
						o = this[x].slice(a, a + r),
						s = new Blob([], { type: arguments[2] });
					return (s[x] = o), s;
				}
			}
			function FetchError(e, t, n) {
				Error.call(this, e),
					(this.message = e),
					(this.type = t),
					n && (this.code = this.errno = n.code),
					Error.captureStackTrace(this, this.constructor);
			}
			let w;
			Object.defineProperties(Blob.prototype, {
				size: { enumerable: !0 },
				type: { enumerable: !0 },
				slice: { enumerable: !0 },
			}),
				Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
					value: "Blob",
					writable: !1,
					enumerable: !1,
					configurable: !0,
				}),
				(FetchError.prototype = Object.create(Error.prototype)),
				(FetchError.prototype.constructor = FetchError),
				(FetchError.prototype.name = "FetchError");
			try {
				w = require("encoding").convert;
			} catch (e) {}
			const _ = Symbol("Body internals"),
				k = f.PassThrough;
			function Body(e) {
				var t = this,
					n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
					a = n.size;
				let i = void 0 === a ? 0 : a;
				var r = n.timeout;
				let o = void 0 === r ? 0 : r;
				null == e
					? (e = null)
					: isURLSearchParams(e)
					? (e = Buffer.from(e.toString()))
					: isBlob(e) ||
					  Buffer.isBuffer(e) ||
					  ("[object ArrayBuffer]" === Object.prototype.toString.call(e)
							? (e = Buffer.from(e))
							: ArrayBuffer.isView(e)
							? (e = Buffer.from(e.buffer, e.byteOffset, e.byteLength))
							: e instanceof f || (e = Buffer.from(String(e)))),
					(this[_] = { body: e, disturbed: !1, error: null }),
					(this.size = i),
					(this.timeout = o),
					e instanceof f &&
						e.on("error", function (e) {
							const n =
								"AbortError" === e.name
									? e
									: new FetchError(
											`Invalid response body while trying to fetch ${t.url}: ${e.message}`,
											"system",
											e
									  );
							t[_].error = n;
						});
			}
			function consumeBody() {
				var e = this;
				if (this[_].disturbed)
					return Body.Promise.reject(new TypeError("body used already for: " + this.url));
				if (((this[_].disturbed = !0), this[_].error))
					return Body.Promise.reject(this[_].error);
				let t = this.body;
				if (null === t) return Body.Promise.resolve(Buffer.alloc(0));
				if ((isBlob(t) && (t = t.stream()), Buffer.isBuffer(t)))
					return Body.Promise.resolve(t);
				if (!(t instanceof f)) return Body.Promise.resolve(Buffer.alloc(0));
				let n = [],
					a = 0,
					i = !1;
				return new Body.Promise(function (r, o) {
					let s;
					e.timeout &&
						(s = setTimeout(function () {
							(i = !0),
								o(
									new FetchError(
										`Response timeout while trying to fetch ${e.url} (over ${e.timeout}ms)`,
										"body-timeout"
									)
								);
						}, e.timeout)),
						t.on("error", function (t) {
							"AbortError" === t.name
								? ((i = !0), o(t))
								: o(
										new FetchError(
											`Invalid response body while trying to fetch ${e.url}: ${t.message}`,
											"system",
											t
										)
								  );
						}),
						t.on("data", function (t) {
							if (!i && null !== t) {
								if (e.size && a + t.length > e.size)
									return (
										(i = !0),
										void o(
											new FetchError(
												`content size at ${e.url} over limit: ${e.size}`,
												"max-size"
											)
										)
									);
								(a += t.length), n.push(t);
							}
						}),
						t.on("end", function () {
							if (!i) {
								clearTimeout(s);
								try {
									r(Buffer.concat(n, a));
								} catch (t) {
									o(
										new FetchError(
											`Could not create Buffer from response body for ${e.url}: ${t.message}`,
											"system",
											t
										)
									);
								}
							}
						});
				});
			}
			function isURLSearchParams(e) {
				return (
					"object" == typeof e &&
					"function" == typeof e.append &&
					"function" == typeof e.delete &&
					"function" == typeof e.get &&
					"function" == typeof e.getAll &&
					"function" == typeof e.has &&
					"function" == typeof e.set &&
					("URLSearchParams" === e.constructor.name ||
						"[object URLSearchParams]" === Object.prototype.toString.call(e) ||
						"function" == typeof e.sort)
				);
			}
			function isBlob(e) {
				return (
					"object" == typeof e &&
					"function" == typeof e.arrayBuffer &&
					"string" == typeof e.type &&
					"function" == typeof e.stream &&
					"function" == typeof e.constructor &&
					"string" == typeof e.constructor.name &&
					/^(Blob|File)$/.test(e.constructor.name) &&
					/^(Blob|File)$/.test(e[Symbol.toStringTag])
				);
			}
			function clone(e) {
				let t,
					n,
					a = e.body;
				if (e.bodyUsed) throw new Error("cannot clone body after it is used");
				return (
					a instanceof f &&
						"function" != typeof a.getBoundary &&
						((t = new k()),
						(n = new k()),
						a.pipe(t),
						a.pipe(n),
						(e[_].body = t),
						(a = n)),
					a
				);
			}
			function extractContentType(e) {
				return null === e
					? null
					: "string" == typeof e
					? "text/plain;charset=UTF-8"
					: isURLSearchParams(e)
					? "application/x-www-form-urlencoded;charset=UTF-8"
					: isBlob(e)
					? e.type || null
					: Buffer.isBuffer(e) ||
					  "[object ArrayBuffer]" === Object.prototype.toString.call(e) ||
					  ArrayBuffer.isView(e)
					? null
					: "function" == typeof e.getBoundary
					? "multipart/form-data;boundary=" + e.getBoundary()
					: e instanceof f
					? null
					: "text/plain;charset=UTF-8";
			}
			function getTotalBytes(e) {
				const t = e.body;
				return null === t
					? 0
					: isBlob(t)
					? t.size
					: Buffer.isBuffer(t)
					? t.length
					: t &&
					  "function" == typeof t.getLengthSync &&
					  ((t._lengthRetrievers && 0 == t._lengthRetrievers.length) ||
							(t.hasKnownLength && t.hasKnownLength()))
					? t.getLengthSync()
					: null;
			}
			(Body.prototype = {
				get body() {
					return this[_].body;
				},
				get bodyUsed() {
					return this[_].disturbed;
				},
				arrayBuffer() {
					return consumeBody.call(this).then(function (e) {
						return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
					});
				},
				blob() {
					let e = (this.headers && this.headers.get("content-type")) || "";
					return consumeBody.call(this).then(function (t) {
						return Object.assign(new Blob([], { type: e.toLowerCase() }), { [x]: t });
					});
				},
				json() {
					var e = this;
					return consumeBody.call(this).then(function (t) {
						try {
							return JSON.parse(t.toString());
						} catch (t) {
							return Body.Promise.reject(
								new FetchError(
									`invalid json response body at ${e.url} reason: ${t.message}`,
									"invalid-json"
								)
							);
						}
					});
				},
				text() {
					return consumeBody.call(this).then(function (e) {
						return e.toString();
					});
				},
				buffer() {
					return consumeBody.call(this);
				},
				textConverted() {
					var e = this;
					return consumeBody.call(this).then(function (t) {
						return (function convertBody(e, t) {
							if ("function" != typeof w)
								throw new Error(
									"The package `encoding` must be installed to use the textConverted() function"
								);
							const n = t.get("content-type");
							let a,
								i,
								r = "utf-8";
							n && (a = /charset=([^;]*)/i.exec(n));
							(i = e.slice(0, 1024).toString()),
								!a && i && (a = /<meta.+?charset=(['"])(.+?)\1/i.exec(i));
							!a &&
								i &&
								((a = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(
									i
								)),
								a ||
									((a = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(
										i
									)),
									a && a.pop()),
								a && (a = /charset=(.*)/i.exec(a.pop())));
							!a && i && (a = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(i));
							a &&
								((r = a.pop()), ("gb2312" !== r && "gbk" !== r) || (r = "gb18030"));
							return w(e, "UTF-8", r).toString();
						})(t, e.headers);
					});
				},
			}),
				Object.defineProperties(Body.prototype, {
					body: { enumerable: !0 },
					bodyUsed: { enumerable: !0 },
					arrayBuffer: { enumerable: !0 },
					blob: { enumerable: !0 },
					json: { enumerable: !0 },
					text: { enumerable: !0 },
				}),
				(Body.mixIn = function (e) {
					for (const t of Object.getOwnPropertyNames(Body.prototype))
						if (!(t in e)) {
							const n = Object.getOwnPropertyDescriptor(Body.prototype, t);
							Object.defineProperty(e, t, n);
						}
				}),
				(Body.Promise = global.Promise);
			const E = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/,
				S = /[^\t\x20-\x7e\x80-\xff]/;
			function validateName(e) {
				if (((e = "" + e), E.test(e) || "" === e))
					throw new TypeError(e + " is not a legal HTTP header name");
			}
			function validateValue(e) {
				if (((e = "" + e), S.test(e)))
					throw new TypeError(e + " is not a legal HTTP header value");
			}
			function find(e, t) {
				t = t.toLowerCase();
				for (const n in e) if (n.toLowerCase() === t) return n;
			}
			const T = Symbol("map");
			class Headers {
				constructor() {
					let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
					if (((this[T] = Object.create(null)), e instanceof Headers)) {
						const t = e.raw(),
							n = Object.keys(t);
						for (const e of n) for (const n of t[e]) this.append(e, n);
					} else if (null == e);
					else {
						if ("object" != typeof e)
							throw new TypeError("Provided initializer must be an object");
						{
							const t = e[Symbol.iterator];
							if (null != t) {
								if ("function" != typeof t)
									throw new TypeError("Header pairs must be iterable");
								const n = [];
								for (const t of e) {
									if (
										"object" != typeof t ||
										"function" != typeof t[Symbol.iterator]
									)
										throw new TypeError("Each header pair must be iterable");
									n.push(Array.from(t));
								}
								for (const e of n) {
									if (2 !== e.length)
										throw new TypeError(
											"Each header pair must be a name/value tuple"
										);
									this.append(e[0], e[1]);
								}
							} else
								for (const t of Object.keys(e)) {
									const n = e[t];
									this.append(t, n);
								}
						}
					}
				}
				get(e) {
					validateName((e = "" + e));
					const t = find(this[T], e);
					return void 0 === t ? null : this[T][t].join(", ");
				}
				forEach(e) {
					let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0,
						n = getHeaders(this),
						a = 0;
					for (; a < n.length; ) {
						var i = n[a];
						const r = i[0],
							o = i[1];
						e.call(t, o, r, this), (n = getHeaders(this)), a++;
					}
				}
				set(e, t) {
					(t = "" + t), validateName((e = "" + e)), validateValue(t);
					const n = find(this[T], e);
					this[T][void 0 !== n ? n : e] = [t];
				}
				append(e, t) {
					(t = "" + t), validateName((e = "" + e)), validateValue(t);
					const n = find(this[T], e);
					void 0 !== n ? this[T][n].push(t) : (this[T][e] = [t]);
				}
				has(e) {
					return validateName((e = "" + e)), void 0 !== find(this[T], e);
				}
				delete(e) {
					validateName((e = "" + e));
					const t = find(this[T], e);
					void 0 !== t && delete this[T][t];
				}
				raw() {
					return this[T];
				}
				keys() {
					return createHeadersIterator(this, "key");
				}
				values() {
					return createHeadersIterator(this, "value");
				}
				[Symbol.iterator]() {
					return createHeadersIterator(this, "key+value");
				}
			}
			function getHeaders(e) {
				let t =
					arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "key+value";
				const n = Object.keys(e[T]).sort();
				return n.map(
					"key" === t
						? function (e) {
								return e.toLowerCase();
						  }
						: "value" === t
						? function (t) {
								return e[T][t].join(", ");
						  }
						: function (t) {
								return [t.toLowerCase(), e[T][t].join(", ")];
						  }
				);
			}
			(Headers.prototype.entries = Headers.prototype[Symbol.iterator]),
				Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
					value: "Headers",
					writable: !1,
					enumerable: !1,
					configurable: !0,
				}),
				Object.defineProperties(Headers.prototype, {
					get: { enumerable: !0 },
					forEach: { enumerable: !0 },
					set: { enumerable: !0 },
					append: { enumerable: !0 },
					has: { enumerable: !0 },
					delete: { enumerable: !0 },
					keys: { enumerable: !0 },
					values: { enumerable: !0 },
					entries: { enumerable: !0 },
				});
			const C = Symbol("internal");
			function createHeadersIterator(e, t) {
				const n = Object.create(O);
				return (n[C] = { target: e, kind: t, index: 0 }), n;
			}
			const O = Object.setPrototypeOf(
				{
					next() {
						if (!this || Object.getPrototypeOf(this) !== O)
							throw new TypeError("Value of `this` is not a HeadersIterator");
						var e = this[C];
						const t = e.target,
							n = e.kind,
							a = e.index,
							i = getHeaders(t, n);
						return a >= i.length
							? { value: void 0, done: !0 }
							: ((this[C].index = a + 1), { value: i[a], done: !1 });
					},
				},
				Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()))
			);
			function exportNodeCompatibleHeaders(e) {
				const t = Object.assign({ __proto__: null }, e[T]),
					n = find(e[T], "Host");
				return void 0 !== n && (t[n] = t[n][0]), t;
			}
			Object.defineProperty(O, Symbol.toStringTag, {
				value: "HeadersIterator",
				writable: !1,
				enumerable: !1,
				configurable: !0,
			});
			const j = Symbol("Response internals"),
				A = c.STATUS_CODES;
			class Response {
				constructor() {
					let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
						t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					Body.call(this, e, t);
					const n = t.status || 200,
						a = new Headers(t.headers);
					if (null != e && !a.has("Content-Type")) {
						const t = extractContentType(e);
						t && a.append("Content-Type", t);
					}
					this[j] = {
						url: t.url,
						status: n,
						statusText: t.statusText || A[n],
						headers: a,
						counter: t.counter,
					};
				}
				get url() {
					return this[j].url || "";
				}
				get status() {
					return this[j].status;
				}
				get ok() {
					return this[j].status >= 200 && this[j].status < 300;
				}
				get redirected() {
					return this[j].counter > 0;
				}
				get statusText() {
					return this[j].statusText;
				}
				get headers() {
					return this[j].headers;
				}
				clone() {
					return new Response(clone(this), {
						url: this.url,
						status: this.status,
						statusText: this.statusText,
						headers: this.headers,
						ok: this.ok,
						redirected: this.redirected,
					});
				}
			}
			Body.mixIn(Response.prototype),
				Object.defineProperties(Response.prototype, {
					url: { enumerable: !0 },
					status: { enumerable: !0 },
					ok: { enumerable: !0 },
					redirected: { enumerable: !0 },
					statusText: { enumerable: !0 },
					headers: { enumerable: !0 },
					clone: { enumerable: !0 },
				}),
				Object.defineProperty(Response.prototype, Symbol.toStringTag, {
					value: "Response",
					writable: !1,
					enumerable: !1,
					configurable: !0,
				});
			const I = Symbol("Request internals"),
				N = h.parse,
				R = h.format,
				L = "destroy" in f.Readable.prototype;
			function isRequest(e) {
				return "object" == typeof e && "object" == typeof e[I];
			}
			class Request {
				constructor(e) {
					let t,
						n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
					isRequest(e)
						? (t = N(e.url))
						: ((t = e && e.href ? N(e.href) : N("" + e)), (e = {}));
					let a = n.method || e.method || "GET";
					if (
						((a = a.toUpperCase()),
						(null != n.body || (isRequest(e) && null !== e.body)) &&
							("GET" === a || "HEAD" === a))
					)
						throw new TypeError("Request with GET/HEAD method cannot have body");
					let i =
						null != n.body ? n.body : isRequest(e) && null !== e.body ? clone(e) : null;
					Body.call(this, i, {
						timeout: n.timeout || e.timeout || 0,
						size: n.size || e.size || 0,
					});
					const r = new Headers(n.headers || e.headers || {});
					if (null != i && !r.has("Content-Type")) {
						const e = extractContentType(i);
						e && r.append("Content-Type", e);
					}
					let o = isRequest(e) ? e.signal : null;
					if (
						("signal" in n && (o = n.signal),
						null != o &&
							!(function isAbortSignal(e) {
								const t = e && "object" == typeof e && Object.getPrototypeOf(e);
								return !(!t || "AbortSignal" !== t.constructor.name);
							})(o))
					)
						throw new TypeError("Expected signal to be an instanceof AbortSignal");
					(this[I] = {
						method: a,
						redirect: n.redirect || e.redirect || "follow",
						headers: r,
						parsedURL: t,
						signal: o,
					}),
						(this.follow =
							void 0 !== n.follow ? n.follow : void 0 !== e.follow ? e.follow : 20),
						(this.compress =
							void 0 !== n.compress
								? n.compress
								: void 0 === e.compress || e.compress),
						(this.counter = n.counter || e.counter || 0),
						(this.agent = n.agent || e.agent);
				}
				get method() {
					return this[I].method;
				}
				get url() {
					return R(this[I].parsedURL);
				}
				get headers() {
					return this[I].headers;
				}
				get redirect() {
					return this[I].redirect;
				}
				get signal() {
					return this[I].signal;
				}
				clone() {
					return new Request(this);
				}
			}
			function AbortError(e) {
				Error.call(this, e),
					(this.type = "aborted"),
					(this.message = e),
					Error.captureStackTrace(this, this.constructor);
			}
			Body.mixIn(Request.prototype),
				Object.defineProperty(Request.prototype, Symbol.toStringTag, {
					value: "Request",
					writable: !1,
					enumerable: !1,
					configurable: !0,
				}),
				Object.defineProperties(Request.prototype, {
					method: { enumerable: !0 },
					url: { enumerable: !0 },
					headers: { enumerable: !0 },
					redirect: { enumerable: !0 },
					clone: { enumerable: !0 },
					signal: { enumerable: !0 },
				}),
				(AbortError.prototype = Object.create(Error.prototype)),
				(AbortError.prototype.constructor = AbortError),
				(AbortError.prototype.name = "AbortError");
			const B = f.PassThrough,
				P = h.resolve;
			function fetch(e, t) {
				if (!fetch.Promise)
					throw new Error(
						"native promise missing, set fetch.Promise to your favorite alternative"
					);
				return (
					(Body.Promise = fetch.Promise),
					new fetch.Promise(function (n, a) {
						const i = new Request(e, t),
							r = (function getNodeRequestOptions(e) {
								const t = e[I].parsedURL,
									n = new Headers(e[I].headers);
								if (
									(n.has("Accept") || n.set("Accept", "*/*"),
									!t.protocol || !t.hostname)
								)
									throw new TypeError("Only absolute URLs are supported");
								if (!/^https?:$/.test(t.protocol))
									throw new TypeError("Only HTTP(S) protocols are supported");
								if (e.signal && e.body instanceof f.Readable && !L)
									throw new Error(
										"Cancellation of streamed requests with AbortSignal is not supported in node < 8"
									);
								let a = null;
								if (
									(null == e.body && /^(POST|PUT)$/i.test(e.method) && (a = "0"),
									null != e.body)
								) {
									const t = getTotalBytes(e);
									"number" == typeof t && (a = String(t));
								}
								a && n.set("Content-Length", a),
									n.has("User-Agent") ||
										n.set(
											"User-Agent",
											"node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"
										),
									e.compress &&
										!n.has("Accept-Encoding") &&
										n.set("Accept-Encoding", "gzip,deflate");
								let i = e.agent;
								return (
									"function" == typeof i && (i = i(t)),
									n.has("Connection") || i || n.set("Connection", "close"),
									Object.assign({}, t, {
										method: e.method,
										headers: exportNodeCompatibleHeaders(n),
										agent: i,
									})
								);
							})(i),
							o = ("https:" === r.protocol ? v : c).request,
							s = i.signal;
						let p = null;
						const l = function abort() {
							let e = new AbortError("The user aborted a request.");
							a(e),
								i.body && i.body instanceof f.Readable && i.body.destroy(e),
								p && p.body && p.body.emit("error", e);
						};
						if (s && s.aborted) return void l();
						const u = function abortAndFinalize() {
								l(), finalize();
							},
							d = o(r);
						let m;
						function finalize() {
							d.abort(), s && s.removeEventListener("abort", u), clearTimeout(m);
						}
						s && s.addEventListener("abort", u),
							i.timeout &&
								d.once("socket", function (e) {
									m = setTimeout(function () {
										a(
											new FetchError(
												"network timeout at: " + i.url,
												"request-timeout"
											)
										),
											finalize();
									}, i.timeout);
								}),
							d.on("error", function (e) {
								a(
									new FetchError(
										`request to ${i.url} failed, reason: ${e.message}`,
										"system",
										e
									)
								),
									finalize();
							}),
							d.on("response", function (e) {
								clearTimeout(m);
								const t = (function createHeadersLenient(e) {
									const t = new Headers();
									for (const n of Object.keys(e))
										if (!E.test(n))
											if (Array.isArray(e[n]))
												for (const a of e[n])
													S.test(a) ||
														(void 0 === t[T][n]
															? (t[T][n] = [a])
															: t[T][n].push(a));
											else S.test(e[n]) || (t[T][n] = [e[n]]);
									return t;
								})(e.headers);
								if (fetch.isRedirect(e.statusCode)) {
									const r = t.get("Location"),
										o = null === r ? null : P(i.url, r);
									switch (i.redirect) {
										case "error":
											return (
												a(
													new FetchError(
														"uri requested responds with a redirect, redirect mode is set to error: " +
															i.url,
														"no-redirect"
													)
												),
												void finalize()
											);
										case "manual":
											if (null !== o)
												try {
													t.set("Location", o);
												} catch (e) {
													a(e);
												}
											break;
										case "follow":
											if (null === o) break;
											if (i.counter >= i.follow)
												return (
													a(
														new FetchError(
															"maximum redirect reached at: " + i.url,
															"max-redirect"
														)
													),
													void finalize()
												);
											const r = {
												headers: new Headers(i.headers),
												follow: i.follow,
												counter: i.counter + 1,
												agent: i.agent,
												compress: i.compress,
												method: i.method,
												body: i.body,
												signal: i.signal,
												timeout: i.timeout,
												size: i.size,
											};
											return 303 !== e.statusCode &&
												i.body &&
												null === getTotalBytes(i)
												? (a(
														new FetchError(
															"Cannot follow redirect with body being a readable stream",
															"unsupported-redirect"
														)
												  ),
												  void finalize())
												: ((303 !== e.statusCode &&
														((301 !== e.statusCode &&
															302 !== e.statusCode) ||
															"POST" !== i.method)) ||
														((r.method = "GET"),
														(r.body = void 0),
														r.headers.delete("content-length")),
												  n(fetch(new Request(o, r))),
												  void finalize());
									}
								}
								e.once("end", function () {
									s && s.removeEventListener("abort", u);
								});
								let r = e.pipe(new B());
								const o = {
										url: i.url,
										status: e.statusCode,
										statusText: e.statusMessage,
										headers: t,
										size: i.size,
										timeout: i.timeout,
										counter: i.counter,
									},
									c = t.get("Content-Encoding");
								if (
									!i.compress ||
									"HEAD" === i.method ||
									null === c ||
									204 === e.statusCode ||
									304 === e.statusCode
								)
									return (p = new Response(r, o)), void n(p);
								const l = { flush: g.Z_SYNC_FLUSH, finishFlush: g.Z_SYNC_FLUSH };
								if ("gzip" == c || "x-gzip" == c)
									return (
										(r = r.pipe(g.createGunzip(l))),
										(p = new Response(r, o)),
										void n(p)
									);
								if ("deflate" != c && "x-deflate" != c) {
									if ("br" == c && "function" == typeof g.createBrotliDecompress)
										return (
											(r = r.pipe(g.createBrotliDecompress())),
											(p = new Response(r, o)),
											void n(p)
										);
									(p = new Response(r, o)), n(p);
								} else {
									e.pipe(new B()).once("data", function (e) {
										(r =
											8 == (15 & e[0])
												? r.pipe(g.createInflate())
												: r.pipe(g.createInflateRaw())),
											(p = new Response(r, o)),
											n(p);
									});
								}
							}),
							(function writeToStream(e, t) {
								const n = t.body;
								null === n
									? e.end()
									: isBlob(n)
									? n.stream().pipe(e)
									: Buffer.isBuffer(n)
									? (e.write(n), e.end())
									: n.pipe(e);
							})(d, i);
					})
				);
			}
			(fetch.isRedirect = function (e) {
				return 301 === e || 302 === e || 303 === e || 307 === e || 308 === e;
			}),
				(fetch.Promise = global.Promise);
			var D = fetch,
				q = n(82),
				U = n.n(q);
			const M = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/,
				z = /^\/Date\((d|-|.*)\)[\/|\\]$/;
			function dateParser(e, t) {
				if ("string" == typeof t) {
					let e = M.exec(t);
					if (e) return new Date(t);
					if (((e = z.exec(t)), e)) {
						const t = e[1].split(/[-+,.]/);
						return new Date(t[0] ? +t[0] : 0 - +t[1]);
					}
				}
				return t;
			}
			var $ = n(2),
				H = n.n($);
			const V = { client: !1, server: !0 };
			(V.development = __dirname.indexOf(".development") > -1),
				(V.production = !V.development),
				(V.static = "--static" === process.argv[2]),
				(V.key = "86cfe89b9debd7490ac797e8d73fd8abfd5fe6d8"),
				V.development && (V.key += new Date().getMilliseconds()),
				Object.freeze(V);
			var W = V,
				G = n(9);
			const J = {};
			function generateIntegrity(e, t) {
				J[e] =
					"sha512-" + Object(G.createHash)("sha512", "utf8").update(t).digest("base64");
			}
			var X = J;
			const Y = {};
			function generateFile(e, t) {
				return (
					(Y[e] && W.production) ||
						((Y[e] = Object($.readFileSync)(u.a.join(__dirname, e), "utf-8")),
						t.less || generateIntegrity(e, Y[e])),
					Y[e]
				);
			}
			var Q,
				Z,
				K = Y;
			const ee = {};
			function generateBase() {
				const e = "localhost" === ee.domain ? ":" + we.port : "";
				return `${ee.protocol}://${ee.domain}${e}`;
			}
			(ee.cdn = null !== (Q = process.env.NULLSTACK_PROJECT_CDN) && void 0 !== Q ? Q : ""),
				(ee.protocol =
					null !== (Z = process.env.NULLSTACK_PROJECT_PROTOCOL) && void 0 !== Z
						? Z
						: W.development
						? "http"
						: "https"),
				(ee.domain = process.env.NULLSTACK_PROJECT_DOMAIN),
				(ee.name = process.env.NULLSTACK_PROJECT_NAME),
				(ee.shortName = process.env.NULLSTACK_PROJECT_SHORT_NAME),
				(ee.color = process.env.NULLSTACK_PROJECT_COLOR),
				(ee.type = "website"),
				(ee.display = "standalone"),
				(ee.orientation = "portrait"),
				(ee.scope = "/"),
				(ee.root = "/"),
				(ee.sitemap = W.static),
				(ee.favicon = "/favicon-96x96.png"),
				(ee.disallow = []),
				(ee.icons = JSON.parse(
					'{"72":"/icon-72x72.png","96":"/icon-96x96.png","128":"/icon-128x128.png","144":"/icon-144x144.png","152":"/icon-152x152.png","180":"/icon-180x180.png","192":"/icon-192x192.png","384":"/icon-384x384.png","512":"/icon-512x512.png"}'
				));
			var te = ee;
			function camelize(e) {
				return e.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (e, t) => t.toUpperCase());
			}
			function kebabize(e) {
				return e.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
			}
			const ne = {
				get(e, t) {
					if (e[t]) return e[t];
					{
						const n = W.production ? "production" : "development";
						return e[n] ? e[n][t] : e[t];
					}
				},
			};
			function proxyConfigurable(e, t) {
				(e.production = {}), (e.development = {});
				return {
					proxy: new Proxy(e, ne),
					loader: function () {
						for (const n in process.env) {
							const a = `NULLSTACK_${t}_`;
							if (n.startsWith(a)) {
								const t = camelize(n.substring(a.length));
								e[t] = process.env[n];
							}
						}
					},
				};
			}
			function freezeConfigurable(e) {
				if (W.production) for (const [t, n] of Object.entries(e.production)) e[t] = n;
				else for (const [t, n] of Object.entries(e.development)) e[t] = n;
				delete e.production, delete e.development, Object.freeze(e);
			}
			const { proxy: ae, loader: ie } = proxyConfigurable({}, "SETTINGS"),
				re = ie;
			var oe = ae;
			function cdn(e) {
				return !te.cdn || W.development
					? e
					: -1 === e.indexOf("//")
					? `${te.protocol}://${te.cdn}${e}`
					: e;
			}
			var template = function ({ head: e, body: t, context: n, instances: a }) {
				const { page: i, router: r, worker: o, params: s } = n,
					c = (function absolute(e) {
						return -1 === e.indexOf("//") ? `${generateBase()}${e}` : e;
					})(i.canonical || r.url),
					p = (function cdnOrAbsolute(e) {
						return e.indexOf("//") > -1
							? e
							: te.cdn
							? `${te.protocol}://${te.cdn}${e}`
							: `${generateBase()}${e}`;
					})(i.image),
					l = {},
					u = [
						"scope",
						"router",
						"page",
						"environment",
						"settings",
						"worker",
						"params",
						"project",
						"instances",
					];
				for (const [e, t] of Object.entries(n))
					u.includes(e) || "function" == typeof t || (l[e] = t);
				const d = {};
				for (const [e, t] of Object.entries(a)) Object.keys(t).length && (d[e] = t);
				return `<!DOCTYPE html>\n<html${
					i.locale ? ` lang="${i.locale}"` : ""
				}>\n  <head>\n    <meta charset="utf-8">\n    <meta name="generator" content="Created with Nullstack - https://nullstack.app" />\n    ${
					i.title ? `<title>${i.title}</title>` : ""
				}\n    <meta property="og:image" content="${p}">\n    ${
					i.description
						? `<meta property="og:description" content="${i.description}">`
						: ""
				}\n    ${
					i.description ? `<meta name="description" content="${i.description}">` : ""
				}\n    ${i.title ? `<meta property="og:title" content="${i.title}">` : ""}\n    ${
					te.type ? `<meta property="og:type" content="${te.type}">` : ""
				}\n    ${
					te.name ? `<meta property="og:site_name" content="${te.name}">` : ""
				}\n    <meta property="og:url" content="${c}">\n    <link rel="canonical" href="${c}">\n    ${
					i.locale ? `<meta property="og:locale" content="${i.locale}">` : ""
				}\n    <link rel="shortcut icon" href="${cdn(
					te.favicon
				)}" type="image/png">\n    <link rel="icon" href="${cdn(
					te.favicon
				)}" type="image/png">\n    <link rel="manifest" href="/manifest-${
					W.key
				}.json" integrity="${
					X["manifest.json"] || ""
				}">\n    <meta name="mobile-web-app-capable" content="yes">\n    <meta name="apple-mobile-web-app-capable" content="yes">\n    ${
					te.name ? `<meta name="application-name" content="${te.name}">` : ""
				}\n    ${
					te.name ? `<meta name="apple-mobile-web-app-title" content="${te.name}">` : ""
				}\n    ${
					i.robots ? `<meta name="robots" content="${i.robots}" />` : ""
				}\n    <meta name="msapplication-starturl" content="/">\n    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n    <link rel="stylesheet" href="${cdn(
					`/client-${W.key}.css`
				)}" integrity="${X["client.css"] || ""}" crossorigin="anonymous">\n    ${
					i.schema
						? `<script type="application/ld+json">${JSON.stringify(i.schema)}<\/script>`
						: ""
				}\n    ${
					te.icons[180]
						? `<link rel="apple-touch-icon" sizes="180x180" href="${cdn(
								te.icons[180]
						  )}">`
						: ""
				}\n    <meta name="msapplication-TileColor" content="${
					te.backgroundColor || te.color
				}">\n    ${e
					.split("\x3c!--#--\x3e")
					.join(
						""
					)}\n  </head>\n  <body>\n    ${t}\n    <script async>\n      window.page = ${JSON.stringify(
					i
				)};\n      window.instances = ${JSON.stringify(
					d
				)};\n      window.environment = ${JSON.stringify(
					W
				)};\n      window.settings = ${JSON.stringify(
					oe
				)};\n      window.worker = ${JSON.stringify(
					o
				)};\n      window.params = ${JSON.stringify(
					s
				)};\n      window.project = ${JSON.stringify(
					te
				)};\n      window.context = ${JSON.stringify(
					l
				)};\n      document.addEventListener('DOMContentLoaded', () => {\n        const script = window.document.createElement('script');\n        script.src = '${cdn(
					`/client-${W.key}.js`
				)}';\n        script.integrity = '${
					X["client.js"] || ""
				}';\n        script.crossOrigin = 'anonymous';\n        document.body.append(script);\n      });\n    <\/script>\n  </body>\n</html>`;
			};
			function generateManifest(e) {
				if (K["manifest.json"]) return K["manifest.json"];
				const t = u.a.join(__dirname, "../", "public", "manifest.json");
				if (Object($.existsSync)(t)) return Object($.readFileSync)(t, "utf-8");
				const n = {
					name: te.name,
					short_name: te.shortName || te.name,
					theme_color: te.color,
					background_color: te.backgroundColor || te.color,
					display: te.display,
					orientation: te.orientation,
					scope: te.scope,
					start_url: te.root,
					icons: [],
					splash_pages: null,
				};
				for (const e in te.icons) {
					const t = te.icons[e];
					n.icons.push({
						src: cdn(t),
						sizes: `${e}x${e}`,
						type: "image/png",
						purpose: "maskable any",
					});
				}
				const a = JSON.stringify(n);
				return e.less || generateIntegrity("manifest.json", a), (K["manifest.json"] = a), a;
			}
			var se = {};
			function extractLocation(e) {
				let [t, n] = e.split("#"),
					[a, i] = t.split("?");
				"/" !== a && a.endsWith("/") && (a = a.substring(0, a.length - 1));
				let r = a;
				i && (r += "?" + i);
				let o = r;
				return (
					n && (o += "#" + n),
					void 0 === n && (n = ""),
					{ path: a, search: i, url: r, urlWithHash: o, hash: n }
				);
			}
			class router_Router {
				constructor(e, t) {
					(this.request = e), (this.response = t);
				}
				_redirect(e) {
					if (!this.response.headersSent) {
						const { url: t } = extractLocation(e);
						this.response.redirect(t);
					}
				}
				get url() {
					return extractLocation(this.request.originalUrl).url;
				}
				set url(e) {
					this._redirect(e);
				}
				get path() {
					return extractLocation(this.request.path).path;
				}
				set path(e) {
					const { search: t } = extractLocation(this.request.originalUrl);
					t ? this._redirect(e + "?" + t) : this._redirect(e);
				}
				get base() {
					return generateBase();
				}
			}
			var ce = {};
			function extractParamValue(e) {
				return (
					"true" === e ||
					("false" !== e && (e ? decodeURIComponent(e.replace(/\+/g, " ")) : ""))
				);
			}
			const pe = { get: (e, t) => !1 !== e[t] && (e[t] || "") };
			function generateParams(e) {
				const t = (function getQueryStringParams(e) {
					const [t, n] = e.split("?");
					return n
						? n.split("&").reduce((e, t) => {
								let [n, a] = t.split("=");
								return (e[n] = extractParamValue(a)), e;
						  }, {})
						: {};
				})(e);
				return new Proxy(t, pe);
			}
			function isFalse(e) {
				return (
					null == e ||
					!1 === e ||
					("object" == typeof e &&
						(void 0 === e.type || null === e.type || !1 === e.type))
				);
			}
			function render(e, t) {
				if (isFalse(e)) return "\x3c!----\x3e";
				if (void 0 === e.type) return (e.toString() || " ") + "\x3c!--#--\x3e";
				let n = "<" + e.type;
				for (let t in e.attributes)
					if (!t.startsWith("on") && "html" !== t) {
						const a = typeof e.attributes[t];
						"object" !== a &&
							"function" !== a &&
							("value" != t && !0 === e.attributes[t]
								? (n += " " + t)
								: ("value" == t ||
										(!1 !== e.attributes[t] &&
											null !== e.attributes[t] &&
											void 0 !== e.attributes[t])) &&
								  (n += ` ${t}="${e.attributes[t]}"`));
					}
				if (
					[
						"area",
						"base",
						"br",
						"col",
						"embed",
						"hr",
						"img",
						"input",
						"link",
						"meta",
						"param",
						"source",
						"track",
						"wbr",
						"menuitem",
					].includes(e.type) &&
					0 === e.children.length
				)
					n += "/>";
				else {
					if (((n += ">"), e.attributes.html)) {
						const a = e.attributes.html;
						"head" === e.type ? (t.head += a) : (n += a);
					} else if ("textarea" === e.type) n += e.children[0];
					else
						for (let a = 0; a < e.children.length; a++) {
							const i = render(e.children[a], t);
							"head" === e.type ? (t.head += i) : (n += i);
						}
					n += `</${e.type}>`;
				}
				return "head" === e.type ? "\x3c!-- --\x3e" : n;
			}
			var le =
					"async function cacheFirst(event) {\r\n  const cache = await caches.open(self.context.environment.key);\r\n  const cachedResponse = await cache.match(event.request);\r\n  if(cachedResponse) return cachedResponse;\r\n  const response = await load(event);\r\n  await cache.put(event.request, response.clone());\r\n  return response;\r\n}",
				ue =
					"async function staleWhileRevalidate(event) {\r\n  const cache = await caches.open(self.context.environment.key);\r\n  const cachedResponse = await cache.match(event.request);\r\n  const networkResponsePromise = load(event);\r\n  event.waitUntil(async function() {\r\n    const networkResponse = await networkResponsePromise;\r\n    await cache.put(event.request, networkResponse.clone());\r\n  }());\r\n  return cachedResponse || networkResponsePromise;\r\n}";
			const de = {};
			(de.enabled = W.production), (de.fetching = !1), (de.preload = []), (de.headers = {});
			const me = Object.freeze([]),
				fe = { get: () => me };
			function generateServiceWorker() {
				if (K["service-worker.js"]) return K["service-worker.js"];
				const e = [],
					t = { environment: W, project: te, settings: oe, worker: de };
				let n = "";
				const a = u.a.join(__dirname, "../", "public", "service-worker.js");
				return (
					Object($.existsSync)(a) && (n = Object($.readFileSync)(a, "utf-8")),
					e.push(`self.context = ${JSON.stringify(t, null, 2)};`),
					e.push(
						"async function load(event) {\r\n  const response = await event.preloadResponse;\r\n  if (response) return response;\r\n  return await fetch(event.request);\r\n}"
					),
					W.static
						? (e.push(
								"function toAPI(url) {\r\n  let [path, query] = url.split('?');\r\n  if(path.indexOf('.') === -1) {\r\n    path += '/index.json';\r\n  }\r\n  return query ? `${path}?${query}` : path;\r\n}\r\n\r\nasync function extractData(response) {\r\n  const html = await response.clone().text();\r\n  const instancesLookup = 'window.instances = ';\r\n  const instances = html.split(\"\\n\").find((line) => line.indexOf(instancesLookup) > -1).split(instancesLookup)[1].slice(0, -1);\r\n  const pageLookup = 'window.page = ';\r\n  const page = html.split(\"\\n\").find((line) => line.indexOf(pageLookup) > -1).split(pageLookup)[1].slice(0, -1);\r\n  const json = `{\"instances\": ${instances}, \"page\": ${page}}`;\r\n  return new Response(json, {\r\n    headers: {'Content-Type': 'application/json'}\r\n  });\r\n}\r\n\r\nasync function injectData(templateResponse, cachedDataResponse) {\r\n  const data = await cachedDataResponse.json();\r\n  const input = await templateResponse.text();\r\n  const output = input.split(`\\n`).map((line) => {\r\n    if(line.indexOf('<title>') > -1) {\r\n      return line.replace(/(<title\\b[^>]*>)[^<>]*(<\\/title>)/i, `$1${data.page.title}$2`);\r\n    } else if(line.indexOf('window.instances = ') > -1) {\r\n      return `window.instances = ${JSON.stringify(data.instances)};`\r\n    } else if(line.indexOf('window.page = ') > -1) {\r\n      return `window.page = ${JSON.stringify(data.page)};`\r\n    } else if(line.indexOf('window.worker = ') > -1) {\r\n      return line.replace('\"online\":false', '\"online\":true').replace('\"responsive\":false', '\"responsive\":true');\r\n    }\r\n    return line;\r\n  }).join(\"\\n\");\r\n  return new Response(output, {\r\n    headers: {'Content-Type': 'text/html'}\r\n  });\r\n}"
						  ),
						  e.push(le),
						  e.push(ue),
						  e.push(
								"async function networkFirst(event) {\r\n  const cache = await caches.open(self.context.environment.key);\r\n  try {\r\n    const networkResponse = await load(event);\r\n    await cache.put(event.request, networkResponse.clone());\r\n    return networkResponse;\r\n  } catch(error) {\r\n    return await cache.match(event.request);\r\n  }\r\n}"
						  ),
						  e.push(
								"async function networkDataFirst(event) {\r\n  const cache = await caches.open(self.context.environment.key);\r\n  const url = new URL(event.request.url);\r\n  const api = url.pathname + '/index.json';\r\n  try {\r\n    const response = await load(event);\r\n    const dataResponse = await extractData(response);\r\n    await cache.put(api, dataResponse);\r\n    return response;\r\n  } catch(error) {\r\n    const fallbackResponse = await cache.match(`/offline-${self.context.environment.key}/index.html`);  \r\n    const cachedDataResponse = await cache.match(api);\r\n    if(cachedDataResponse) {\r\n      return await injectData(fallbackResponse, cachedDataResponse);\r\n    } else {\r\n      return fallbackResponse;\r\n    }\r\n  }\r\n}"
						  ))
						: (e.push(le),
						  e.push(ue),
						  e.push(
								"async function networkOnly(event) {\r\n  try {\r\n    return await load(event);\r\n  } catch(error) {\r\n    const cache = await caches.open(self.context.environment.key);\r\n    return await cache.match(`/offline-${self.context.environment.key}`);\r\n  }\r\n}"
						  )),
					-1 === n.indexOf("install") &&
						e.push(
							W.static
								? "function install(event) {\r\n  const urls = [\r\n    '/',\r\n    ...self.context.worker.preload.map(toAPI),\r\n    '/offline-' + self.context.environment.key + '/index.html',\r\n    '/client-' + self.context.environment.key + '.css',\r\n    '/client-' + self.context.environment.key + '.js',\r\n    '/manifest-' + self.context.environment.key + '.json'\r\n  ];\r\n  event.waitUntil(async function() {\r\n    const cache = await caches.open(self.context.environment.key);\r\n    await cache.addAll([...new Set(urls)]);\r\n    const homeResponse = await cache.match('/');\r\n    const homeDataResponse = await extractData(homeResponse);\r\n    await cache.put('/index.json', homeDataResponse);\r\n    self.skipWaiting();\r\n  }());\r\n}\r\n\r\nself.addEventListener('install', install);"
								: "function install(event) {\r\n  const urls = [\r\n    '/',\r\n    ...self.context.worker.preload,\r\n    '/offline-' + self.context.environment.key,\r\n    '/client-' + self.context.environment.key + '.css',\r\n    '/client-' + self.context.environment.key + '.js',\r\n    '/manifest-' + self.context.environment.key + '.json'\r\n  ];\r\n  event.waitUntil(async function() {\r\n    const cache = await caches.open(self.context.environment.key);\r\n    await cache.addAll([...new Set(urls)]);\r\n    self.skipWaiting();\r\n  }());\r\n}\r\n\r\nself.addEventListener('install', install);"
						),
					-1 === n.indexOf("activate") &&
						e.push(
							"function activate(event) {\r\n  event.waitUntil(async function() {\r\n    const cacheNames = await caches.keys();\r\n    const cachesToDelete = cacheNames.filter(cacheName => cacheName !== self.context.environment.key);\r\n    await Promise.all(cachesToDelete.map((cacheName) => caches.delete(cacheName)));\r\n    if (self.registration.navigationPreload) {\r\n      await self.registration.navigationPreload.enable();\r\n    }\r\n    self.clients.claim();\r\n  }());\r\n}\r\n\r\nself.addEventListener('activate', activate);"
						),
					-1 === n.indexOf("fetch") &&
						e.push(
							W.static
								? "function staticStrategy(event) {\r\n  event.waitUntil(async function() {\r\n    const url = new URL(event.request.url);\r\n    if(url.origin !== location.origin) return;\r\n    if(event.request.method !== 'GET') return;\r\n    if(url.pathname.indexOf(self.context.environment.key) > -1) {\r\n      return event.respondWith(cacheFirst(event));\r\n    }\r\n    if(url.pathname.indexOf('.') > -1) {\r\n      return event.respondWith(staleWhileRevalidate(event));\r\n    }\r\n    if(url.pathname === '/') {\r\n      return event.respondWith(networkFirst(event));\r\n    }\r\n    event.respondWith(networkDataFirst(event));\r\n  }());\r\n}\r\n\r\nself.addEventListener('fetch', staticStrategy);"
								: "function dynamicStrategy(event) {\r\n  event.waitUntil(async function() {\r\n    const url = new URL(event.request.url);\r\n    if(url.origin !== location.origin) return;\r\n    if(event.request.method !== 'GET') return;\r\n    if(url.pathname.indexOf(self.context.environment.key) > -1) {\r\n      return event.respondWith(cacheFirst(event));\r\n    }\r\n    if(url.pathname.indexOf('.') > -1) {\r\n      return event.respondWith(staleWhileRevalidate(event));\r\n    }\r\n    event.respondWith(networkOnly(event));\r\n  }());\r\n}\r\n\r\nself.addEventListener('fetch', dynamicStrategy);"
						),
					n && e.push(n),
					(K["service-worker.js"] = e.join("\n\n")),
					K["service-worker.js"]
				);
			}
			de.queues = new Proxy({}, fe);
			var he = de,
				printError = function (e) {
					const t = e.stack.split("\n");
					let n = t.find((e) => e.indexOf("Proxy") > -1);
					n &&
						((n = n.split("(")[0]),
						n && ((n = n.trim()), (n = n.replace("at", "").trim())));
					let a,
						i,
						r = t.find((e) => e.indexOf("webpack:") > -1);
					if (
						(r && ((r = r.split("webpack:")[1]), r && (r = r.split("\\").join("/"))), r)
					) {
						[a, i] = r.split(":");
						let e = a.split("/").find((e) => e.indexOf(".") > -1);
						e && ((e = e.replace(".njs", "")), n && (n = n.replace("Proxy", e)));
					}
					console.log(),
						console.log("[31m", e.name, "-", e.message, "[0m"),
						console.log(),
						n && console.log("[2m", "initiator:", "[0m", "[37m", n, "[0m"),
						a && console.log("[2m", "file:     ", "[0m", "[37m", a, "[0m"),
						i && console.log("[2m", "line:     ", "[0m", "[37m", i, "[0m"),
						console.log();
				};
			function erase(e) {
				(e.type = !1), delete e.attributes, delete e.children;
			}
			let ve = [
				{
					transform: function objectable_transform({ node: e }) {
						if (
							(function objectable_match(e) {
								return e && void 0 !== e.attributes;
							})(e)
						)
							for (const t in e.attributes)
								if (t.startsWith("on") && "object" == typeof e.attributes[t]) {
									const n = e.attributes.source,
										a = e.attributes[t];
									e.attributes[t] = function () {
										Object.assign(n, a);
									}.bind(n);
								}
					},
					client: !0,
				},
				{
					transform: function parameterizable_transform({
						node: e,
						router: t,
						params: n,
					}) {
						if (
							!(function parameterizable_match(e) {
								return (
									e && e.attributes && (e.attributes.params || e.attributes.path)
								);
							})(e)
						)
							return;
						let a;
						if (e.attributes.params) {
							a = {};
							for (const t in e.attributes.params)
								a[t] =
									(i = e.attributes.params[t]) && void 0 !== i.toJSON
										? i.toJSON()
										: i;
						} else a = n;
						var i;
						const r = (function serializeSearch(e) {
								return Object.keys(e)
									.map((t) => (!1 === e[t] || e[t] ? `${t}=${e[t]}` : ""))
									.filter((e) => !!e)
									.join("&");
							})(a),
							o = e.attributes.path || t.path;
						(e.attributes.href = o + (r ? "?" : "") + r),
							delete e.attributes.path,
							delete e.attributes.params;
					},
					client: !0,
					server: !0,
				},
				{
					transform: function anchorable_transform({ node: e, router: t }) {
						if (
							!(function anchorable_match(e) {
								return (
									e &&
									"a" === e.type &&
									e.attributes.href &&
									e.attributes.href.startsWith("/") &&
									!e.attributes.target
								);
							})(e)
						)
							return;
						const n = e.attributes.onclick;
						e.attributes.onclick = ({ event: a }) => {
							a.preventDefault(),
								(t.url = e.attributes.href),
								n &&
									setTimeout(() => {
										n({ ...e.attributes, event: a });
									}, 0);
						};
					},
					client: !0,
				},
				{
					load: function routable_load({ router: e }) {
						(e._routes = {}),
							e._oldSegments
								? ((e._oldSegments = e._newSegments), (e._newSegments = {}))
								: ((e._oldSegments = {}), (e._newSegments = {}));
					},
					transform: function transform({ node: e, depth: t, router: n }) {
						if (
							!(function match(e) {
								return (
									e && void 0 !== e.attributes && void 0 !== e.attributes.route
								);
							})(e)
						)
							return;
						const a = t.slice(0, -1).join(".");
						if (void 0 !== n._routes[a]) erase(e);
						else {
							const t = (function routeMatches(e, t) {
								let { path: n } = extractLocation(e);
								const a = n.split("/"),
									i = t.split("/"),
									r = {},
									o = Math.max(a.length, i.length);
								let s = !1;
								for (let e = 0; e < o; e++)
									if (!s)
										if ("*" === i[e]) s = !0;
										else if (i[e] && i[e].startsWith(":")) {
											r[i[e].replace(":", "")] = extractParamValue(a[e]);
										} else if (i[e] !== a[e]) return !1;
								return r;
							})(n.url, e.attributes.route);
							t
								? ((n._routes[a] = !0),
								  (n._newSegments[a] = t),
								  Object.assign(n._segments, t))
								: erase(e);
						}
					},
					client: !0,
					server: !0,
				},
				{
					transform: function datable_transform({ node: e }) {
						if (
							(function datable_match(e) {
								return e && void 0 !== e.attributes;
							})(e)
						) {
							e.attributes.data = e.attributes.data || {};
							for (const t in e.attributes)
								if (t.startsWith("data-")) {
									const n = camelize(t.slice(5));
									e.attributes.data[n] = e.attributes[t];
								}
							for (const t in e.attributes.data) {
								const n = "data-" + kebabize(t);
								e.attributes[n] = e.attributes.data[t];
							}
						}
					},
					client: !0,
					server: !0,
				},
				{
					transform: function bindable_transform({ node: e, environment: t }) {
						if (
							!(function bindable_match(e) {
								return (
									void 0 !== e &&
									void 0 !== e.attributes &&
									void 0 !== e.attributes.bind &&
									void 0 !== e.attributes.source
								);
							})(e)
						)
							return;
						const n = e.attributes.source;
						"textarea" === e.type
							? (e.children = [n[e.attributes.bind]])
							: "input" === e.type && "checkbox" === e.attributes.type
							? (e.attributes.checked = n[e.attributes.bind])
							: (e.attributes.value = n[e.attributes.bind]),
							(e.attributes.name = e.attributes.name || e.attributes.bind),
							t.client &&
								(function attachEvent(e) {
									const t = e.attributes.source;
									let n = "oninput",
										a = "value";
									"checkbox" === e.attributes.type ||
									"radio" === e.attributes.type
										? ((n = "onclick"), (a = "checked"))
										: "input" !== e.type &&
										  "textarea" !== e.type &&
										  (n = "onchange");
									const i = e.attributes[n];
									e.attributes[n] = ({ event: n, value: r }) => {
										"checked" == a
											? (t[e.attributes.bind] = n.target[a])
											: !0 === t[e.attributes.bind] ||
											  !1 === t[e.attributes.bind]
											? (t[e.attributes.bind] = n ? "true" == n.target[a] : r)
											: "number" == typeof t[e.attributes.bind]
											? (t[e.attributes.bind] =
													parseFloat(n ? n.target[a] : r) || 0)
											: (t[e.attributes.bind] = n ? n.target[a] : r),
											void 0 !== i &&
												setTimeout(() => {
													i({ ...e.attributes, event: n, value: r });
												}, 0);
									};
								})(e);
					},
					client: !0,
					server: !0,
				},
			];
			function loadPlugins(e) {
				for (const t of ve) t.load && t.load(e.context);
				return ve;
			}
			async function generateBranch(e, t, n, a) {
				if (
					((function transformNodes(e, t, n) {
						for (const a of ve) a.transform({ ...e.context, node: t, depth: n });
					})(a, t, n),
					isFalse(t))
				)
					e.children.push(!1);
				else if (
					(function isClass(e) {
						return (
							"function" == typeof e.type &&
							e.type.prototype &&
							"function" == typeof e.type.prototype.render
						);
					})(t)
				) {
					const i =
						t.attributes.key ||
						(function generateKey(e) {
							return 1 === e.length ? "application" : "n-" + e.join("-");
						})(n);
					if (
						a.context.environment.client &&
						a.context.router._changed &&
						t.attributes &&
						t.attributes.route &&
						!a.context.environment.static
					) {
						const e = n.slice(0, -1).join("."),
							t = a.context.router._newSegments[e];
						if (t) {
							const n = a.context.router._oldSegments[e];
							for (const e in t)
								n[e] !== t[e] && (delete a.memory[i], delete a.instances[i]);
						}
					}
					const r = a.instances[i] || new t.type(a);
					let o;
					(r._self.key = i),
						(r._attributes = t.attributes),
						(r._scope = a),
						a.memory &&
							((o = a.memory[i]),
							o &&
								((r._self.initiated = !0),
								Object.assign(r, o),
								delete a.memory[i]));
					let s = !1;
					const c = void 0 === a.instances[i];
					(a.instances[i] = r),
						c &&
							(void 0 === o &&
								(r.prepare && r.prepare(),
								a.context.environment.server
									? (r.initiate && (await r.initiate()), (r._self.initiated = !0))
									: a.initiationQueue.push(r)),
							(s = !0)),
						a.hydrationQueue &&
							(s
								? a.hydrationQueue.push(r)
								: 1 == r._self.initiated && r.update && r.update()),
						a.context.environment.client && a.renewalQueue.push(r);
					const p = r.render();
					p && p.type && (p.instance = r), (t.children = [].concat(p));
					for (let i = 0; i < t.children.length; i++)
						await generateBranch(e, t.children[i], [...n, i], a);
				} else if (
					(function isFunction(e) {
						return "function" == typeof e.type;
					})(t)
				) {
					const i = t.type.name ? a.generateContext(t.attributes) : t.attributes,
						r = t.type(i);
					t.children = [].concat(r);
					for (let i = 0; i < t.children.length; i++)
						await generateBranch(e, t.children[i], [...n, i], a);
				} else if (t.type) {
					const i = {
						type: t.type,
						attributes: t.attributes || {},
						instance: t.instance,
						children: [],
					};
					if (t.children)
						for (let e = 0; e < t.children.length; e++)
							await generateBranch(i, t.children[e], [...n, e], a);
					e.children.push(i);
				} else e.children.push(t);
			}
			async function generateTree(e, t) {
				const n = { type: "div", attributes: { id: "application" }, children: [] };
				return await generateBranch(n, e, [0], t), n;
			}
			async function prerender(e, t) {
				const n = { page: { image: "/image-1200x630.png", status: 200 } };
				(n.project = te),
					(n.environment = W),
					(n.settings = oe),
					(n.params = generateParams(e.originalUrl)),
					(n.router = new router_Router(e, t));
				const a = n.router.url !== "/offline-" + W.key;
				n.worker = { ...he, online: a, responsive: a };
				const i = { instances: {} };
				(n.instances = i.instances),
					(n.router._segments = n.params),
					(i.request = e),
					(i.response = t),
					(i.head = ""),
					(i.body = ""),
					(i.context = n),
					(i.generateContext = (function client_generateContext(e) {
						const t = {
							set(t, n, a) {
								return (e[n] = a), Reflect.set(...arguments);
							},
							get: (t, n) => (void 0 === t[n] ? e[n] : t[n]),
						};
						return function (n) {
							return new Proxy({ ...e, ...n }, t);
						};
					})(n)),
					(i.plugins = loadPlugins(i));
				try {
					const e = await generateTree(ce.starter(), i);
					(i.body = render(e, i)), a || (n.page.status = 200);
				} catch (e) {
					printError(e), (n.page.status = 500);
				} finally {
					if (200 !== n.page.status) {
						for (const e in n.router._routes) delete n.router._routes[e];
						for (const e in i.instances) delete i.instances[e];
						(i.head = ""), (i.plugins = loadPlugins(i));
						const e = await generateTree(ce.starter(), i);
						i.body = render(e, i);
					}
				}
				return i;
			}
			function generateRobots() {
				if (K["robots.txt"]) return K["robots.txt"];
				const e = [];
				e.push("User-Agent: *"), te.disallow.includes("/") || e.push("Allow: " + te.root);
				for (const t of te.disallow) e.push("Disallow: " + t);
				return (
					te.sitemap &&
						(!0 === te.sitemap
							? e.push(`Sitemap: ${generateBase()}/sitemap.xml`)
							: -1 === te.sitemap.indexOf("//")
							? e.push(`Sitemap: ${generateBase()}${te.sitemap}`)
							: e.push("Sitemap: " + te.sitemap)),
					(K["robots.txt"] = e.join("\n")),
					K["robots.txt"]
				);
			}
			var ge = n(83),
				be = n.n(ge);
			global.fetch || (global.fetch = D);
			const xe = s()(),
				ye = p.a.createServer(xe);
			ye.port = process.env.NULLSTACK_SERVER_PORT || process.env.PORT || 5e3;
			for (const e of ["use", "delete", "get", "head", "options", "patch", "post", "put"])
				ye[e] = function () {
					xe[e](...arguments);
				};
			ye.start = function () {
				ye.less ||
					(generateFile("client.css", ye),
					generateFile("client.js", ye),
					generateManifest(ye),
					generateServiceWorker(),
					generateRobots()),
					xe.use(U()(ye.cors)),
					xe.use(s.a.static(u.a.join(__dirname, "..", "public"))),
					xe.use(m.a.text({ limit: ye.maximumPayloadSize })),
					xe.get(`/client-${W.key}.css`, (e, t) => {
						t.setHeader("Cache-Control", "max-age=31536000, immutable"),
							t.contentType("text/css"),
							t.send(generateFile("client.css", ye));
					}),
					xe.get(`/client-${W.key}.js`, (e, t) => {
						t.setHeader("Cache-Control", "max-age=31536000, immutable"),
							t.contentType("text/javascript"),
							t.send(generateFile("client.js", ye));
					}),
					xe.get(`/manifest-${W.key}.json`, (e, t) => {
						t.setHeader("Cache-Control", "max-age=31536000, immutable"),
							t.contentType("application/manifest+json"),
							t.send(generateManifest(ye));
					}),
					he.enabled &&
						xe.get(`/service-worker-${W.key}.js`, (e, t) => {
							t.setHeader("Cache-Control", "max-age=31536000, immutable"),
								t.contentType("text/javascript"),
								t.send(generateServiceWorker());
						}),
					xe.get("/robots.txt", (e, t) => {
						t.send(generateRobots());
					}),
					xe.post("/nullstack/:hash/:methodName.json", async (e, t) => {
						ye.less && (await ye.ready);
						const n = (function deserialize(e) {
								return JSON.parse(e, dateParser);
							})(e.body),
							{ hash: a, methodName: i } = e.params,
							[r, o] = a.split("-"),
							s = `${r}.${i}`,
							c = se[r];
						let p = c;
						if (o && ((p = se[o]), !(p.prototype instanceof c)))
							return t.status(401).json({});
						const l = se[s];
						if (void 0 !== l)
							try {
								const a = generateContext({ request: e, response: t, ...n }),
									i = await l.call(p, a);
								t.json({ result: i });
							} catch (e) {
								printError(e), t.status(500).json({});
							}
						else t.status(404).json({});
					}),
					xe.get("*", async (e, t, n) => {
						if (
							(ye.less && (await ye.ready),
							e.originalUrl.split("?")[0].indexOf(".") > -1)
						)
							return n();
						const a = await prerender(e, t);
						if (!t.headersSent) {
							const e = a.context.page.status,
								n = template(a);
							t.status(e).send(n);
						}
					}),
					ye.less ||
						ye.listen(ye.port, () => {
							const e = te.name ? te.name : "Nullstack";
							W.development
								? (!(function liveReload(e) {
										function noop() {}
										function heartbeat() {
											this.isAlive = !0;
										}
										const t = new be.a.Server({ server: e });
										t.on("connection", function connection(e) {
											(e.isAlive = !0),
												e.on("pong", heartbeat),
												e.on("message", (e) => {
													t.clients.forEach(function each(t) {
														t.send(e);
													});
												});
										}),
											setInterval(function ping() {
												t.clients.forEach(function each(e) {
													if (!1 === e.isAlive) return e.terminate();
													(e.isAlive = !1), e.ping(noop);
												});
											}, 3e4);
								  })(ye),
								  console.log(
										"[36m%s[0m",
										`${e} is running in development mode at http://localhost:${ye.port}`
								  ))
								: console.log(
										"[36m%s[0m",
										`${e} is running in production mode at http://127.0.0.1:${ye.port}`
								  );
						});
			};
			var we = ye;
			function fragment({ children: e }) {
				return e;
			}
			function element_element(e, t, ...n) {
				(n = (function flattenChildren(e) {
					return (
						(e = [].concat.apply([], e).map((e) => null != e && e)),
						[].concat.apply([], e)
					);
				})(n)),
					"textarea" === e && (n = [n.join("")]);
				const a = { ...t, children: n };
				return (
					"element" === e && ((e = a.tag || fragment), delete a.tag),
					"function" == typeof e && void 0 !== e.render
						? { type: e, attributes: a, children: null }
						: { type: e, attributes: a, children: n }
				);
			}
			const { proxy: _e, loader: ke } = proxyConfigurable({}, "SECRETS"),
				Ee = ke;
			var Se = _e;
			var Te = {
				get(e, t) {
					return "function" != typeof e[t] ||
						e[t].name.startsWith("_") ||
						"constructor" === t
						? Reflect.get(...arguments)
						: (n) => {
								const a = e._scope.generateContext({
									...e._attributes,
									...n,
									self: e._self,
								});
								return e[t](a);
						  };
				},
			};
			function _defineProperty(e, t, n) {
				return (
					t in e
						? Object.defineProperty(e, t, {
								value: n,
								enumerable: !0,
								configurable: !0,
								writable: !0,
						  })
						: (e[t] = n),
					e
				);
			}
			(r.server = we),
				(r.project = te),
				(r.environment = W),
				(r.settings = oe),
				(r.secrets = Se),
				(r.worker = he),
				(we.less =
					Object(l.normalize)(__filename) !== Object(l.normalize)(process.argv[1]));
			class server_Nullstack {
				static start(e, ...t) {
					if (this.name.indexOf("Nullstack") > -1)
						return (
							we.less && we.start(),
							(we.ready = (async function () {
								(ce.starter = () => element_element(e)),
									re(),
									Ee(),
									"function" == typeof e.start && (await e.start(r));
								for (const e of t) e.start(r);
								freezeConfigurable(oe),
									freezeConfigurable(Se),
									Object.freeze(he),
									Object.freeze(te),
									we.less || we.start();
							})()),
							(r.start = async function () {
								return await we.ready, r;
							}),
							r
						);
				}
				constructor(e) {
					_defineProperty(this, "_self", {
						prerendered: !0,
						initiated: !1,
						hydrated: !1,
					}),
						(this._request = () => e.request),
						(this._response = () => e.response);
					const t = (function getProxyableMethods(e) {
							let t = new Set(),
								n = e;
							do {
								Object.getOwnPropertyNames(n).map((e) => t.add(e));
							} while ((n = Object.getPrototypeOf(n)) && n != Object.prototype);
							return [...t.keys()].filter(
								(t) =>
									"constructor" !== t &&
									"function" == typeof e[t] &&
									!t.startsWith("_") &&
									!e[t].name.startsWith("_")
							);
						})(this),
						n = new Proxy(this, Te);
					for (const e of t) this[e] = this[e].bind(n);
					return n;
				}
				toJSON() {
					const e = {};
					for (const t of Object.getOwnPropertyNames(this))
						"function" == typeof this[t] ||
							t.startsWith("_") ||
							"attributes" === t ||
							(e[t] = this[t]);
					return e;
				}
				render() {
					return !1;
				}
			}
			_defineProperty(server_Nullstack, "registry", se),
				_defineProperty(server_Nullstack, "element", element_element),
				_defineProperty(server_Nullstack, "invoke", function invoke(e) {
					return async function _invoke(t = {}) {
						const n = generateContext({
							request: this._request(),
							response: this._response(),
							...t,
						});
						return await this.constructor[e](n);
					};
				}),
				_defineProperty(server_Nullstack, "fragment", fragment),
				_defineProperty(
					server_Nullstack,
					"use",
					(function usePlugins(e) {
						return async (...t) => {
							ve = [...new Set([...t.flat(), ...ve])].filter((t) => t[e]);
						};
					})("server")
				);
			var Ce = server_Nullstack,
				Oe = (n(170), n(84)),
				je = n.n(Oe),
				Ae = n(85),
				Ie = n.n(Ae);
			n(180);
			function Home_defineProperty(e, t, n) {
				return (
					t in e
						? Object.defineProperty(e, t, {
								value: n,
								enumerable: !0,
								configurable: !0,
								writable: !0,
						  })
						: (e[t] = n),
					e
				);
			}
			class Home_Home extends Ce {
				constructor(...e) {
					super(...e),
						Home_defineProperty(this, "search_params", ""),
						Home_defineProperty(this, "results", {}),
						Home_defineProperty(this, "link", ""),
						Home_defineProperty(
							this,
							"getVideoInfoByUrl",
							Ce.invoke("getVideoInfoByUrl")
						),
						Home_defineProperty(this, "searchVideos", Ce.invoke("searchVideos")),
						Home_defineProperty(this, "downloadVideo", Ce.invoke("downloadVideo"));
				}
				async initiate({ params: e }) {
					if (
						("search_params" in e && (this.search_params = e.search_params),
						String(this.search_params).includes("https"))
					) {
						const e = await this.getVideoInfoByUrl({ link: this.search_params }),
							t = {
								id: e.player_response.videoDetails.videoId,
								title: e.player_response.videoDetails.title,
								thumb: e.player_response.videoDetails.thumbnail.thumbnails[3].url,
							};
						this.results.items = t;
					} else
						this.results = await this.searchVideos({ search_params: e.search_params });
				}
				static async getVideoInfoByUrl({ download: e, link: t, router: n }) {
					t = (t = t.split("watch?v=")[1]).split("&list=")[0];
					try {
						return await e.getInfo(t);
					} catch (e) {
						return (n.url = "/"), {};
					}
				}
				static async searchVideos({ search: e, download: t, search_params: n }) {
					const a = { limit: 10, pages: 1 };
					if (void 0 === n || n.length <= 0) {
						const e = { items: {} };
						return e;
					}
					{
						const t = await e(n, a);
						return (
							(t.items = t.items.filter(function (e) {
								return (
									"People also watched" !== e.title &&
									String(e.title).indexOf("Mix") < 0
								);
							})),
							t
						);
					}
				}
				async callDownload({ video: e }) {
					const t = await this.downloadVideo({ video: e }),
						n = t[0],
						a = t[1];
					let i = 0;
					const r = setInterval(() => {
						var e = new XMLHttpRequest();
						e.open("HEAD", n, !0),
							(e.onreadystatechange = function () {
								this.readyState == this.DONE &&
									200 === this.status &&
									((i = this.getResponseHeader("content-length")),
									Number(i) >= a &&
										(!(function download(e) {
											var t = document.createElement("a");
											(t.href = e),
												t.setAttribute("download", ""),
												document.body.appendChild(t),
												t.click(),
												document.body.removeChild(t);
										})(n),
										clearInterval(r)),
									console.log("fileSize = " + i));
							}),
							e.send();
					}, 500);
					this.launchToast();
				}
				static async downloadVideo({ download: e, fs: t, video: n }) {
					const a = (await e.getInfo("http://www.youtube.com/watch?v=" + n.id))
							.player_response.streamingData.adaptiveFormats,
						i = [];
					for (let e in a) String(a[e].mimeType).indexOf("audio") > -1 && i.push(a[e]);
					let r = 0,
						o = 0;
					for (let e in i)
						i[e].contentLength > r && ((r = i[e].contentLength), (o = i[e].itag));
					await e("http://www.youtube.com/watch?v=" + n.id, {
						quality: String(o),
						filter: "audioonly",
					}).pipe(
						await t.createWriteStream(
							`./public/downloads/${n.title
								.replace(/^[\w,\s-]+\.[A-Za-z]$/g, "")
								.replace("|", "")
								.replace(/['"]+/g, "")}.mp3`
						)
					);
					return [
						`./downloads/${n.title
							.replace(/^[\w,\s-]+\.[A-Za-z]$/g, "")
							.replace("|", "")
							.replace(/['"]+/g, "")}.mp3`,
						r,
					];
				}
				async launchToast() {
					var e = document.getElementById("toast");
					(e.className = "show"),
						setTimeout(function () {
							e.className = e.className.replace("show", "");
						}, 5e3);
				}
				render() {
					return Ce.element(
						"div",
						null,
						Ce.element(
							"div",
							{ class: "container" },
							Ce.element("h1", null, "YTDL - Nullstack"),
							Ce.element(
								"form",
								{
									source: this,
									onsubmit: this.ghost_function,
									class: "row g-2 justify-content-md-center",
								},
								Ce.element(
									"div",
									{ class: "col-10" },
									Ce.element(
										"label",
										{ for: "search_params" },
										"Pesquise ou digite a url"
									),
									Ce.element("input", {
										id: "search_params",
										type: "text",
										class: "form-control",
										placeholder:
											"Ex: https://www.youtube.com/watch?v=TM2FtVMqymk",
										source: this,
										bind: "search_params",
									})
								),
								Ce.element(
									"div",
									{ style: "display: flex;", class: "col-2" },
									Ce.element(
										"button",
										{
											style:
												"margin: auto; margin-top: 24px; margin-left: 0px; width: 150px",
											class: "btn btn-success",
										},
										Ce.element("i", { class: "fas fa-search" })
									)
								)
							),
							Ce.element("br", null),
							Ce.element(
								"div",
								{ id: "beforeDownload", class: "container" },
								Ce.element(
									"div",
									{ class: "container row" },
									Object.keys(this.results.items).length > 3
										? this.results.items.map((e) =>
												Ce.element(
													"div",
													{ class: "card m-1", style: "width: 18rem;" },
													Ce.element("img", {
														src:
															Array.isArray(e.thumbnails) &&
															e.thumbnails.length > 0
																? "" + e.thumbnails[0].url
																: "",
														class: "card-img-top",
													}),
													Ce.element(
														"div",
														{ class: "card-body" },
														Ce.element(
															"h5",
															{ class: "card-title" },
															e.title
														),
														Ce.element(
															"p",
															{ class: "card-text" },
															e.author
														)
													),
													Ce.element(
														"button",
														{
															class: "btn btn-sm btn-primary",
															onclick: this.callDownload,
															video: e,
														},
														Ce.element("i", {
															class: "fas fa-download",
														}),
														" Download"
													),
													Ce.element("br", null)
												)
										  )
										: 0 != Object.keys(this.results.items).length ||
										  void 0 !== this.results.items.length
										? Ce.element(
												"div",
												{ class: "card m-1", style: "width: 18rem;" },
												Ce.element("img", {
													src: this.results.items.thumb,
													class: "card-img-top",
												}),
												Ce.element(
													"div",
													{ class: "card-body" },
													Ce.element(
														"h5",
														{ class: "card-title" },
														this.results.items.title
													)
												),
												Ce.element(
													"button",
													{
														class: "btn btn-sm btn-primary",
														onclick: this.callDownload,
														video: this.results.items,
													},
													Ce.element("i", { class: "fas fa-download" }),
													" Download"
												),
												Ce.element("br", null)
										  )
										: Ce.element("div", null, '"Sem vídeos"')
								),
								Ce.element(
									"div",
									{ id: "toast" },
									Ce.element(
										"div",
										{ id: "img" },
										Ce.element("i", { class: "fas fa-download" })
									),
									Ce.element("div", { id: "desc" }, "Download Iniciado")
								)
							)
						)
					);
				}
			}
			var Ne = Home_Home;
			(Ce.registry["0b0eb4721936aadba3cc5c5b6f7d4ff3.getVideoInfoByUrl"] =
				Home_Home.getVideoInfoByUrl),
				(Ce.registry["0b0eb4721936aadba3cc5c5b6f7d4ff3.searchVideos"] =
					Home_Home.searchVideos),
				(Ce.registry["0b0eb4721936aadba3cc5c5b6f7d4ff3.downloadVideo"] =
					Home_Home.downloadVideo),
				(Ce.registry["0b0eb4721936aadba3cc5c5b6f7d4ff3"] = Home_Home);
			class Application_Application extends Ce {
				static async start(e) {
					const { project: t } = e;
					(e.search = Ie.a), (e.download = je.a), (e.fs = H.a);
				}
				prepare({ page: e }) {
					e.locale = "pt-BR";
				}
				renderHead() {
					return Ce.element(
						"head",
						null,
						Ce.element("link", {
							href: "https://fonts.gstatic.com",
							rel: "preconnect",
						}),
						Ce.element("link", {
							href:
								"https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap",
							rel: "stylesheet",
						}),
						Ce.element("link", {
							href:
								"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css",
							rel: "stylesheet",
						}),
						Ce.element("link", {
							href: "https://pro.fontawesome.com/releases/v5.10.0/css/all.css",
							rel: "stylesheet",
						})
					);
				}
				render() {
					const e = this.renderHead;
					return Ce.element(
						"main",
						null,
						Ce.element(e, null),
						Ce.element(Ne, { route: "/" })
					);
				}
			}
			var Re = Application_Application;
			Ce.registry["473bfb5f2e37a6fa3ccefd1dd8b599ff"] = Application_Application;
			t.default = Ce.start(Re);
		},
	]);
});
