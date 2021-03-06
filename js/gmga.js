/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
(function() {
    var e, t, n;
    (function(r) {
        function v(e, t) {
            return h.call(e, t)
        }

        function m(e, t) {
            var n, r, i, s, o, u, a, f, c, h, p, v = t && t.split("/"),
                m = l.map,
                g = m && m["*"] || {};
            if (e && e.charAt(0) === ".")
                if (t) {
                    v = v.slice(0, v.length - 1), e = e.split("/"), o = e.length - 1, l.nodeIdCompat && d.test(e[o]) && (e[o] = e[o].replace(d, "")), e = v.concat(e);
                    for (c = 0; c < e.length; c += 1) {
                        p = e[c];
                        if (p === ".") e.splice(c, 1), c -= 1;
                        else if (p === "..") {
                            if (c === 1 && (e[2] === ".." || e[0] === "..")) break;
                            c > 0 && (e.splice(c - 1, 2), c -= 2)
                        }
                    }
                    e = e.join("/")
                } else e.indexOf("./") === 0 && (e = e.substring(2));
            if ((v || g) && m) {
                n = e.split("/");
                for (c = n.length; c > 0; c -= 1) {
                    r = n.slice(0, c).join("/");
                    if (v)
                        for (h = v.length; h > 0; h -= 1) {
                            i = m[v.slice(0, h).join("/")];
                            if (i) {
                                i = i[r];
                                if (i) {
                                    s = i, u = c;
                                    break
                                }
                            }
                        }
                    if (s) break;
                    !a && g && g[r] && (a = g[r], f = c)
                }!s && a && (s = a, u = f), s && (n.splice(0, u, s), e = n.join("/"))
            }
            return e
        }

        function g(e, t) {
            return function() {
                return s.apply(r, p.call(arguments, 0).concat([e, t]))
            }
        }

        function y(e) {
            return function(t) {
                return m(t, e)
            }
        }

        function b(e) {
            return function(t) {
                a[e] = t
            }
        }

        function w(e) {
            if (v(f, e)) {
                var t = f[e];
                delete f[e], c[e] = !0, i.apply(r, t)
            }
            if (!v(a, e) && !v(c, e)) throw new Error("No " + e);
            return a[e]
        }

        function E(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
        }

        function S(e) {
            return function() {
                return l && l.config && l.config[e] || {}
            }
        }
        var i, s, o, u, a = {},
            f = {},
            l = {},
            c = {},
            h = Object.prototype.hasOwnProperty,
            p = [].slice,
            d = /\.js$/;
        o = function(e, t) {
            var n, r = E(e),
                i = r[0];
            return e = r[1], i && (i = m(i, t), n = w(i)), i ? n && n.normalize ? e = n.normalize(e, y(t)) : e = m(e, t) : (e = m(e, t), r = E(e), i = r[0], e = r[1], i && (n = w(i))), {
                f: i ? i + "!" + e : e,
                n: e,
                pr: i,
                p: n
            }
        }, u = {
            require: function(e) {
                return g(e)
            },
            exports: function(e) {
                var t = a[e];
                return typeof t != "undefined" ? t : a[e] = {}
            },
            module: function(e) {
                return {
                    id: e,
                    uri: "",
                    exports: a[e],
                    config: S(e)
                }
            }
        }, i = function(e, t, n, i) {
            var s, l, h, p, d, m = [],
                y = typeof n,
                E;
            i = i || e;
            if (y === "undefined" || y === "function") {
                t = !t.length && n.length ? ["require", "exports", "module"] : t;
                for (d = 0; d < t.length; d += 1) {
                    p = o(t[d], i), l = p.f;
                    if (l === "require") m[d] = u.require(e);
                    else if (l === "exports") m[d] = u.exports(e), E = !0;
                    else if (l === "module") s = m[d] = u.module(e);
                    else if (v(a, l) || v(f, l) || v(c, l)) m[d] = w(l);
                    else {
                        if (!p.p) throw new Error(e + " missing " + l);
                        p.p.load(p.n, g(i, !0), b(l), {}), m[d] = a[l]
                    }
                }
                h = n ? n.apply(a[e], m) : undefined;
                if (e)
                    if (s && s.exports !== r && s.exports !== a[e]) a[e] = s.exports;
                    else if (h !== r || !E) a[e] = h
            } else e && (a[e] = n)
        }, e = t = s = function(e, t, n, a, f) {
            if (typeof e == "string") return u[e] ? u[e](t) : w(o(e, t).f);
            if (!e.splice) {
                l = e, l.deps && s(l.deps, l.callback);
                if (!t) return;
                t.splice ? (e = t, t = n, n = null) : e = r
            }
            return t = t || function() {}, typeof n == "function" && (n = a, a = f), a ? i(r, e, t, n) : setTimeout(function() {
                i(r, e, t, n)
            }, 4), s
        }, s.config = function(e) {
            return s(e)
        }, e._defined = a, n = function(e, t, n) {
            t.splice || (n = t, t = []), !v(a, e) && !v(f, e) && (f[e] = [e, t, n])
        }, n.amd = {
            jQuery: !0
        }
    })(), n("requireLib", function() {}), n("shared/Deferred", ["require", "exports", "module"], function(e, t, n) {
            function r(e) {
                return Object.prototype.toString.call(e) === "[object Array]"
            }

            function i(e, t) {
                if (r(e))
                    for (var n = 0; n < e.length; n++) t(e[n]);
                else t(e)
            }

            function s(e) {
                var t = "pending",
                    n = [],
                    o = [],
                    u = [],
                    a = null,
                    f = {
                        done: function() {
                            for (var e = 0; e < arguments.length; e++) {
                                if (!arguments[e]) continue;
                                if (r(arguments[e])) {
                                    var i = arguments[e];
                                    for (var s = 0; s < i.length; s++) t === "resolved" && i[s].apply(this, a), n.push(i[s])
                                } else t === "resolved" && arguments[e].apply(this, a), n.push(arguments[e])
                            }
                            return this
                        },
                        fail: function() {
                            for (var e = 0; e < arguments.length; e++) {
                                if (!arguments[e]) continue;
                                if (r(arguments[e])) {
                                    var n = arguments[e];
                                    for (var i = 0; i < n.length; i++) t === "rejected" && n[i].apply(this, a), o.push(n[i])
                                } else t === "rejected" && arguments[e].apply(this, a), o.push(arguments[e])
                            }
                            return this
                        },
                        always: function() {
                            return this.done.apply(this, arguments).fail.apply(this, arguments)
                        },
                        progress: function() {
                            for (var e = 0; e < arguments.length; e++) {
                                if (!arguments[e]) continue;
                                if (r(arguments[e])) {
                                    var n = arguments[e];
                                    for (var i = 0; i < n.length; i++) t === "pending" && u.push(n[i])
                                } else t === "pending" && u.push(arguments[e])
                            }
                            return this
                        },
                        then: function() {
                            arguments.length > 1 && arguments[1] && this.fail(arguments[1]), arguments.length > 0 && arguments[0] && this.done(arguments[0]), arguments.length > 2 && arguments[2] && this.progress(arguments[2])
                        },
                        promise: function(e) {
                            if (e == null) return f;
                            for (var t in f) e[t] = f[t];
                            return e
                        },
                        state: function() {
                            return t
                        },
                        debug: function() {
                            console.log("[debug]", n, o, t)
                        },
                        isRejected: function() {
                            return t === "rejected"
                        },
                        isResolved: function() {
                            return t === "resolved"
                        },
                        pipe: function(e, t, n) {
                            return s(function(n) {
                                i(e, function(e) {
                                    typeof e == "function" ? l.done(function() {
                                        var t = e.apply(this, arguments);
                                        t && typeof t == "function" ? t.promise().then(n.resolve, n.reject, n.notify) : n.resolve(t)
                                    }) : l.done(n.resolve)
                                }), i(t, function(e) {
                                    typeof e == "function" ? l.fail(function() {
                                        var t = e.apply(this, arguments);
                                        t && typeof t == "function" ? t.promise().then(n.resolve, n.reject, n.notify) : n.reject(t)
                                    }) : l.fail(n.reject)
                                })
                            }).promise()
                        }
                    },
                    l = {
                        resolveWith: function(e) {
                            if (t === "pending") {
                                t = "resolved";
                                var r = a = arguments.length > 1 ? arguments[1] : [];
                                for (var i = 0; i < n.length; i++) n[i].apply(e, r)
                            }
                            return this
                        },
                        rejectWith: function(e) {
                            if (t === "pending") {
                                t = "rejected";
                                var n = a = arguments.length > 1 ? arguments[1] : [];
                                for (var r = 0; r < o.length; r++) o[r].apply(e, n)
                            }
                            return this
                        },
                        notifyWith: function(e) {
                            if (t === "pending") {
                                var n = a = arguments.length > 1 ? arguments[1] : [];
                                for (var r = 0; r < u.length; r++) u[r].apply(e, n)
                            }
                            return this
                        },
                        resolve: function() {
                            return this.resolveWith(this, arguments)
                        },
                        reject: function() {
                            return this.rejectWith(this, arguments)
                        },
                        notify: function() {
                            return this.notifyWith(this, arguments)
                        }
                    },
                    c = f.promise(l);
                return e && e.apply(c, [c]), c
            }
            return s.when = function() {
                if (arguments.length < 2) {
                    var e = arguments.length ? arguments[0] : undefined;
                    return e && typeof e.isResolved == "function" && typeof e.isRejected == "function" ? e.promise() : s().resolve(e).promise()
                }
                return function(e) {
                    var t = s(),
                        n = e.length,
                        r = 0,
                        i = new Array(n);
                    for (var o = 0; o < e.length; o++)(function(s) {
                        var o = null;
                        e[s].done ? e[s].done(function() {
                            i[s] = arguments.length < 2 ? arguments[0] : arguments, ++r == n && t.resolve.apply(t, i)
                        }).fail(function() {
                            t.reject(arguments)
                        }) : (o = e[s], e[s] = new Deferred, e[s].done(function() {
                            i[s] = arguments.length < 2 ? arguments[0] : arguments, ++r == n && t.resolve.apply(t, i)
                        }).fail(function() {
                            t.reject(arguments)
                        }).resolve(o))
                    })(o);
                    return t.promise()
                }(arguments)
            }, s
        }), n("shared/Utils", ["require", "exports", "module"], function(e, t, n) {
            var r = {};
            return r.isArray = function(e) {
                return Object.prototype.toString.call(e) === "[object Array]"
            }, r.bindFnc = function(e, t) {
                return function() {
                    return t.apply(e, arguments)
                }
            }, r.objectToParamString = function(e) {
                var t, n = [];
                for (t in e) e.hasOwnProperty(t) && n.push(t + "=" + e[t]);
                return n.join("&")
            }, r.paramStringToObject = function(e) {
                var t = {},
                    n, r, i, s, o, u;
                if (e && typeof e == "string" && e.length > 1) {
                    n = e, n[0] === "?" && (n = n.substr(1)), r = n.split("&");
                    for (i = 0; i < r.length; i += 1) s = r[i].split("=", 2), s.length === 2 && (o = s[0], u = s[1], o && u && (t[o] = u))
                }
                return t
            }, r.buildUrl = function(e, t) {
                var n = null,
                    i = t ? r.objectToParamString(t) : null;
                return r.isArray(e) ? n = e.join("/") : typeof e == "string" && (n = e), i && (n += "?" + i), n
            }, r.addClass = function(e, t) {
                var n = e.hasOwnProperty("className"),
                    r = n ? e.className : e.getAttribute("class"),
                    i = [],
                    s, o = typeof t == "string",
                    u = typeof t == "object" && typeof t.length == "number",
                    a = u ? t : [t],
                    f;
                typeof r == "string" && r.length > 0 && (i = r.split(" "));
                for (f = 0; f < a.length; f += 1) s = a[f], i.indexOf(s) === -1 && i.push(s);
                n ? e.className = i.join(" ") : e.setAttribute("class", i.join(" "))
            }, r.removeClass = function(e, t) {
                var n = e.hasOwnProperty("className"),
                    r = n ? e.className : e.getAttribute("class"),
                    i = [],
                    s, o = typeof t == "string",
                    u = typeof t == "object" && typeof t.length == "number",
                    a = u ? t : [t],
                    f, l;
                typeof r == "string" && r.length > 0 && (i = r.split(" "));
                for (f = 0; f < a.length; f += 1) s = a[f], l = i.indexOf(s), l !== -1 && i.splice(l, 1);
                n ? e.className = i.join(" ") : e.setAttribute("class", i.join(" "))
            }, r.hasClass = function(e, t) {
                var n, r = [];
                return e.getAttribute ? (n = e.getAttribute("class"), typeof n == "string" && n.length > 0 && (r = n.split(" ")), r.indexOf(t) !== -1) : !1
            }, r.addOnClick = function(e, t, n) {
                e.onclick = t, n && e.addEventListener("touchstart", function(e) {
                    return e.currentTarget.onclick(e), e.preventDefault(), e.stopPropagation(), !1
                }, !1)
            }, r.millisToReadable = function(e) {
                var t = e % 1e3,
                    n = Math.floor(e / 1e3),
                    r = n % 60,
                    i = Math.floor(n / 60),
                    s = r.toString();
                return s.length < 2 && (s = "0" + s), i + ":" + s + "." + t.toString()
            }, r
        }), n("shared/Resources", ["require", "exports", "module"], function(e, t, n) {
            var r = {
                clientVersion: "0.1",
                serverVersion: "0.1",
                gameDoneEvent: "gamedone",
                hbDelay: 3e4,
                allowedGameIds: ["flappy", "donttap", "dontstep", "playthrees", "moneylovin", "ninjaflips", "toiletswipe", "ninjarises", "undeadescape", "stickmanjump", "karatecrush", "jumpsaga", "geogunner", "astroalpaca", "sharkbeat", "marsdash", "bouncyflappy", "test"],
                gameCountCookie: {
                    name: "gmgcc",
                    expireSeconds: 63072e3
                }
            };
            return r
        }), n("Gmga", ["require", "exports", "module", "shared/Deferred", "shared/Utils", "shared/Resources"], function(e, t, n) {
            function o(e, t) {
                if (!this.hasOwnProperty("state") || this.state === o.states.NOTREADY) {
                    this.state = o.states.INITIALIZING, this.readyDeferred = new r, this.myBodyIsReady = new r;
                    var n = document.body || document.getElementsByTagName("body")[0];
                    n ? this.myBodyIsReady.resolve(n) : window.addEventListener("load", i.bindFnc(this, function(e) {
                        var t = document.body || document.getElementsByTagName("body")[0];
                        t ? this.myBodyIsReady.resolve(t) : this.myBodyIsReady.reject(this, "No body tag found...?")
                    }), !1), this.gameId = null, this.gmgaDomain = null, this.hbEnabled = !0, this.bindedAsync = i.bindFnc(this, this.async), this.readyDeferred.done(this.onReady), this.readyDeferred.fail(this.onError), e && this.async(e), this.myBodyIsReady.done(i.bindFnc(this, function(e) {
                        this.iframe = this.insertIframe()
                    })), this.myBodyIsReady.fail(this.onError)
                }
            }
            var r = e("shared/Deferred"),
                i = e("shared/Utils"),
                s = e("shared/Resources");
            return o.states = {
                ERROR: -1,
                NOTREADY: 0,
                INITIALIZING: 1,
                READY: 2
            }, o.prototype = {
                insertIframe: function() {
                    if (this.gameId) {
                        var e = {
                            gameid: this.gameId
                        };
                        this.hbEnabled || (e.hb = this.hbEnabled);
                        var t = document.body || document.getElementsByTagName("body")[0],
                            n = document.createElement("iframe"),
                            r = this;
                        return n.style.width = "1px", n.style.height = "1px", n.style.position = "absolute", n.style.left = "-1000px", n.style.top = "0", n.style.borderStyle = "none", n.scrollbars = "no", n.addEventListener("load", function() {
                            r.readyDeferred.resolve(r)
                        }, !1), n.addEventListener("error", function() {
                            r.readyDeferred.reject(r, "Error loading iframe.")
                        }, !1), n.src = this.gmgaDomain + "/server/?" + i.objectToParamString(e), t.appendChild(n), n
                    }
                    return this.readyDeferred.reject(this, "Game ID not set."), null
                },
                onReady: function(e) {
                    e.state = o.states.READY
                },
                onError: function(e, t) {
                    e.state = o.states.ERROR, console.log("GMGA Client: " + t)
                },
                async: function(e) {
                    if (e)
                        if (typeof e == "string") e.toLowerCase() === s.gameDoneEvent ? this.sendGameDoneEvent() : this.state === o.states.INITIALIZING && (this.gameId = e);
                        else if (typeof e == "function") this.readyDeferred.done(e);
                    else if (i.isArray(e)) {
                        var t;
                        for (t = 0; t < e.length; t += 1) this.async(e[t])
                    } else typeof e == "object" && (e.onReady && this.readyDeferred.done(e.onReady), e.gameId && this.async(e.gameId), e.gmgaDomain && this.state !== o.states.ERROR && (this.gmgaDomain = e.gmgaDomain), e.hasOwnProperty("hbEnabled") && typeof e.hbEnabled == "boolean" && (this.hbEnabled = e.hbEnabled))
                },
                sendGameDoneEvent: function() {
                    this.readyDeferred.done(function(e) {
                        if (e.state === o.states.READY) {
                            var t = {
                                    event: s.gameDoneEvent
                                },
                                n = i.objectToParamString(t);
                            e.iframe.contentWindow.postMessage(n, e.gmgaDomain)
                        }
                    })
                }
            }, o
        }),
        function() {
            var e = "0.1";
            t.config({
                baseUrl: "js/src",
                paths: {
                    shared: "../../../shared"
                },
                urlArgs: "v=" + e
            }), t(["require", "Gmga"], function(e) {
                var t = e("Gmga"),
                    n = window[window.GameMixGA],
                    r = new t(n ? n.q : null),
                    i = r.bindedAsync;
                i.instance = r, window[window.GameMixGA] = i
            })
        }(), n("../main", function() {})
})();