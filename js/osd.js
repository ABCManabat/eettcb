(function() {
    var l = this,
        aa = function(a, b) {
            var c = a.split("."),
                d = l;
            c[0] in d || !d.execScript || d.execScript("var " + c[0]);
            for (var e; c.length && (e = c.shift());) c.length || void 0 === b ? d = d[e] ? d[e] : d[e] = {} : d[e] = b
        },
        ba = function(a) {
            var b = typeof a;
            if ("object" == b)
                if (a) {
                    if (a instanceof Array) return "array";
                    if (a instanceof Object) return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c) return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable &&
                        !a.propertyIsEnumerable("splice")) return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
                } else return "null";
            else if ("function" == b && "undefined" == typeof a.call) return "object";
            return b
        },
        ea = function(a) {
            var b = ba(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        },
        p = function(a) {
            return "string" == typeof a
        },
        q = function(a) {
            return "number" == typeof a
        },
        fa = function(a) {
            return "function" == ba(a)
        },
        ga = function(a) {
            var b =
                typeof a;
            return "object" == b && null != a || "function" == b
        },
        ha = function(a, b, c) {
            return a.call.apply(a.bind, arguments)
        },
        ja = function(a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function() {
                return a.apply(b, arguments)
            }
        },
        r = function(a, b, c) {
            r = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ha : ja;
            return r.apply(null,
                arguments)
        },
        ka = function(a, b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return function() {
                var b = c.slice();
                b.push.apply(b, arguments);
                return a.apply(this, b)
            }
        };
    var s = function(a) {
        a = parseFloat(a);
        return isNaN(a) || 1 < a || 0 > a ? 0 : a
    };
    var la = s("1.0"),
        ma = s("0.05"),
        na = s("0.95"),
        pa = s("0.02"),
        qa = s("0.20"),
        ra = s("0.02"),
        sa = s("1.0"),
        ta = s("0.0");
    var ua = /^true$/.test("false") ? !0 : !1;
    var va;
    var wa = String.prototype.trim ? function(a) {
            return a.trim()
        } : function(a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        },
        Ea = function(a) {
            if (!xa.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(ya, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(za, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(Aa, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(Ba, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(Ca, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(Da, "&#0;"));
            return a
        },
        ya = /&/g,
        za = /</g,
        Aa = />/g,
        Ba = /"/g,
        Ca = /'/g,
        Da = /\x00/g,
        xa = /[\x00&<>"']/,
        Ga = function(a, b) {
            for (var c = 0, d = wa(String(a)).split("."), e = wa(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && g < f; g++) {
                var h = d[g] || "",
                    k = e[g] || "",
                    n = RegExp("(\\d*)(\\D*)", "g"),
                    m = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var z = n.exec(h) || ["", "", ""],
                        C = m.exec(k) || ["", "", ""];
                    if (0 == z[0].length && 0 == C[0].length) break;
                    c = Fa(0 == z[1].length ? 0 : parseInt(z[1], 10), 0 == C[1].length ? 0 : parseInt(C[1], 10)) || Fa(0 == z[2].length, 0 == C[2].length) || Fa(z[2], C[2])
                } while (0 == c)
            }
            return c
        },
        Fa = function(a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        },
        Ha =
        function() {
            return "transform".replace(/\-([a-z])/g, function(a, b) {
                return b.toUpperCase()
            })
        },
        Ia = function(a) {
            var b = p(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
            return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function(a, b, e) {
                return b + e.toUpperCase()
            })
        };
    var Ja = function(a) {
        Ja[" "](a);
        return a
    };
    Ja[" "] = function() {};
    var Ka = function(a) {
            try {
                var b;
                if (b = !!a && null != a.location.href) i: {
                    try {
                        Ja(a.foo);
                        b = !0;
                        break i
                    } catch (c) {}
                    b = !1
                }
                return b
            } catch (d) {
                return !1
            }
        },
        La = function(a, b, c) {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
        };
    var u = document,
        v = window;
    var Ma = function(a) {
            var b = a.toString();
            a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
            a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
            if (a.stack) {
                a = a.stack;
                var c = b;
                try {
                    -1 == a.indexOf(c) && (a = c + "\n" + a);
                    for (var d; a != d;) d = a, a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                    b = a.replace(/\n */g, "\n")
                } catch (e) {
                    b = c
                }
            }
            return b
        },
        Na = function(a, b) {
            a.google_image_requests || (a.google_image_requests = []);
            var c = a.document.createElement("img");
            c.src = b;
            a.google_image_requests.push(c)
        };
    var Oa = null,
        Pa = function(a, b) {
            for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.call(null, a[c], c, a)
        };

    function w(a) {
        return "function" == typeof encodeURIComponent ? encodeURIComponent(a) : escape(a)
    }
    var Qa = function(a, b) {
            La(a, "readystatechange", b)
        },
        Ra = function() {
            var a = x();
            return "complete" == a.document.readyState || !!a.google_onload_fired
        },
        Sa = {},
        Ta = function() {
            var a;
            a = a || window;
            var b = !1;
            a && a.navigator && a.navigator.userAgent && (a = a.navigator.userAgent, b = 0 != a.indexOf("Opera") && -1 != a.indexOf("WebKit") && -1 != a.indexOf("Mobile"));
            return b
        },
        Ua = function(a, b) {
            if (!(1E-4 > Math.random())) {
                var c = Math.random();
                if (c < b) {
                    try {
                        var d = new Uint16Array(1);
                        window.crypto.getRandomValues(d);
                        c = d[0] / 65536
                    } catch (e) {
                        c = Math.random()
                    }
                    return a[Math.floor(c *
                        a.length)]
                }
            }
            return null
        };
    var Va = !!window.google_async_iframe_id,
        y = Va && window.parent || window,
        x = function() {
            if (Va && !Ka(y)) {
                for (var a = "." + u.domain; 2 < a.split(".").length && !Ka(y);) u.domain = a = a.substr(a.indexOf(".") + 1), y = window.parent;
                Ka(y) || (y = window)
            }
            return y
        };
    var Wa = .01,
        Xa = !0,
        Ya = {},
        ab = function(a, b, c, d) {
            var e = Za,
                f, g = Xa;
            try {
                f = b()
            } catch (h) {
                try {
                    var k = Ma(h);
                    b = "";
                    h.fileName && (b = h.fileName);
                    var n = -1;
                    h.lineNumber && (n = h.lineNumber);
                    g = e(a, k, b, n, c)
                } catch (m) {
                    try {
                        var z = Ma(m);
                        a = "";
                        m.fileName && (a = m.fileName);
                        c = -1;
                        m.lineNumber && (c = m.lineNumber);
                        Za("pAR", z, a, c, void 0, void 0)
                    } catch (C) {
                        $a({
                            context: "mRE",
                            msg: C.toString() + "\n" + (C.stack || "")
                        }, void 0)
                    }
                }
                if (!g) throw h;
            } finally {
                if (d) try {
                    d()
                } catch (ia) {}
            }
            return f
        },
        Za = function(a, b, c, d, e, f) {
            var g = {};
            if (e) try {
                e(g)
            } catch (h) {}
            g.context =
                a;
            g.msg = b.substring(0, 512);
            c && (g.file = c);
            0 < d && (g.line = d.toString());
            g.url = u.URL.substring(0, 512);
            g.ref = u.referrer.substring(0, 512);
            bb(g);
            $a(g, f);
            return Xa
        },
        $a = function(a, b) {
            try {
                if (Math.random() < (b || Wa)) {
                    var c = "/pagead/gen_204?id=jserror" + cb(a),
                        d = "http" + ("http:" == v.location.protocol ? "" : "s") + "://pagead2.googlesyndication.com" + c,
                        d = d.substring(0, 2E3);
                    Na(v, d)
                }
            } catch (e) {}
        },
        bb = function(a) {
            var b = a || {};
            Pa(Ya, function(a, d) {
                b[d] = v[a]
            })
        },
        db = function(a, b, c, d, e) {
            return function() {
                var f = arguments;
                return ab(a, function() {
                    return b.apply(c,
                        f)
                }, d, e)
            }
        },
        A = function(a, b) {
            return db(a, b, void 0, void 0, void 0)
        },
        eb = function(a, b) {
            return db(a, b, void 0, void 0, void 0)
        },
        cb = function(a) {
            var b = "";
            Pa(a, function(a, d) {
                if (0 === a || a) b += "&" + d + "=" + w(a)
            });
            return b
        };
    var fb = function(a) {
        return (a = /[&\?]exk=([^& ]+)/.exec(a)) && 2 == a.length ? a[1] : null
    };
    var B = Array.prototype,
        D = B.forEach ? function(a, b, c) {
            B.forEach.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
        },
        gb = B.map ? function(a, b, c) {
            return B.map.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = Array(d), f = p(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
            return e
        },
        hb = B.some ? function(a, b, c) {
            return B.some.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++)
                if (f in e && b.call(c, e[f], f, a)) return !0;
            return !1
        },
        ib = function(a) {
            var b = a.length;
            if (0 < b) {
                for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
                return c
            }
            return []
        },
        jb = function(a) {
            for (var b = [], c = 0; c < a; c++) b[c] = 0;
            return b
        };
    var E = function(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    };
    E.prototype.clone = function() {
        return new E(this.x, this.y)
    };
    E.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    E.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    E.prototype.translate = function(a, b) {
        a instanceof E ? (this.x += a.x, this.y += a.y) : (this.x += a, q(b) && (this.y += b));
        return this
    };
    var F = function(a, b) {
        this.width = a;
        this.height = b
    };
    F.prototype.clone = function() {
        return new F(this.width, this.height)
    };
    F.prototype.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    F.prototype.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var kb = function(a, b) {
            for (var c in a) b.call(void 0, a[c], c, a)
        },
        lb = function(a) {
            var b = 0,
                c;
            for (c in a) b++;
            return b
        },
        mb = function(a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = d;
            return b
        },
        nb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
        ob = function(a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d) a[c] = d[c];
                for (var f = 0; f < nb.length; f++) c = nb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        };
    var G;
    i: {
        var pb = l.navigator;
        if (pb) {
            var qb = pb.userAgent;
            if (qb) {
                G = qb;
                break i
            }
        }
        G = ""
    }
    var H = function(a) {
        return -1 != G.indexOf(a)
    };
    var rb, sb = function() {
            return l.navigator || null
        },
        I = H("Opera") || H("OPR"),
        J = H("Trident") || H("MSIE"),
        K = H("Gecko") && -1 == G.toLowerCase().indexOf("webkit") && !(H("Trident") || H("MSIE")),
        L = -1 != G.toLowerCase().indexOf("webkit"),
        ub = sb();
    rb = -1 != (ub && ub.platform || "").indexOf("Mac");
    var vb = !!sb() && -1 != (sb().appVersion || "").indexOf("X11"),
        wb = function() {
            var a = l.document;
            return a ? a.documentMode : void 0
        },
        xb = function() {
            var a = "",
                b;
            if (I && l.opera) return a = l.opera.version, fa(a) ? a() : a;
            K ? b = /rv\:([^\);]+)(\)|;)/ : J ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : L && (b = /WebKit\/(\S+)/);
            b && (a = (a = b.exec(G)) ? a[1] : "");
            return J && (b = wb(), b > parseFloat(a)) ? String(b) : a
        }(),
        yb = {},
        M = function(a) {
            return yb[a] || (yb[a] = 0 <= Ga(xb, a))
        },
        zb = l.document,
        Ab = zb && J ? wb() || ("CSS1Compat" == zb.compatMode ? parseInt(xb, 10) : 5) : void 0;
    var Bb = !J || J && 9 <= Ab;
    !K && !J || J && J && 9 <= Ab || K && M("1.9.1");
    J && M("9");
    var Db = function(a) {
            return a ? new Cb(N(a)) : va || (va = new Cb)
        },
        Fb = function(a, b) {
            kb(b, function(c, b) {
                "style" == b ? a.style.cssText = c : "class" == b ? a.className = c : "for" == b ? a.htmlFor = c : b in Eb ? a.setAttribute(Eb[b], c) : 0 == b.lastIndexOf("aria-", 0) || 0 == b.lastIndexOf("data-", 0) ? a.setAttribute(b, c) : a[b] = c
            })
        },
        Eb = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            frameborder: "frameBorder",
            height: "height",
            maxlength: "maxLength",
            role: "role",
            rowspan: "rowSpan",
            type: "type",
            usemap: "useMap",
            valign: "vAlign",
            width: "width"
        },
        Gb = function(a) {
            var b = L || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement;
            a = a.parentWindow || a.defaultView;
            return J && M("10") && a.pageYOffset != b.scrollTop ? new E(b.scrollLeft, b.scrollTop) : new E(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
        },
        Hb = function(a) {
            return a ? a.parentWindow || a.defaultView : window
        },
        Jb = function(a, b, c) {
            var d = arguments,
                e = document,
                f = d[0],
                g = d[1];
            if (!Bb && g && (g.name || g.type)) {
                f = ["<", f];
                g.name && f.push(' name="', Ea(g.name), '"');
                if (g.type) {
                    f.push(' type="', Ea(g.type),
                        '"');
                    var h = {};
                    ob(h, g);
                    delete h.type;
                    g = h
                }
                f.push(">");
                f = f.join("")
            }
            f = e.createElement(f);
            g && (p(g) ? f.className = g : "array" == ba(g) ? f.className = g.join(" ") : Fb(f, g));
            2 < d.length && Ib(e, f, d);
            return f
        },
        Ib = function(a, b, c) {
            function d(c) {
                c && b.appendChild(p(c) ? a.createTextNode(c) : c)
            }
            for (var e = 2; e < c.length; e++) {
                var f = c[e];
                if (!ea(f) || ga(f) && 0 < f.nodeType) d(f);
                else {
                    var g;
                    i: {
                        if (f && "number" == typeof f.length) {
                            if (ga(f)) {
                                g = "function" == typeof f.item || "string" == typeof f.item;
                                break i
                            }
                            if (fa(f)) {
                                g = "function" == typeof f.item;
                                break i
                            }
                        }
                        g = !1
                    }
                    D(g ? ib(f) : f, d)
                }
            }
        },
        N = function(a) {
            return 9 == a.nodeType ? a : a.ownerDocument || a.document
        },
        Kb = function(a) {
            return a.contentWindow || Hb(a.contentDocument || a.contentWindow.document)
        },
        Cb = function(a) {
            this.ua = a || l.document || document
        };
    Cb.prototype.createElement = function(a) {
        return this.ua.createElement(a)
    };
    Cb.prototype.createTextNode = function(a) {
        return this.ua.createTextNode(String(a))
    };
    var Lb = function(a) {
        return Gb(a.ua)
    };
    Cb.prototype.appendChild = function(a, b) {
        a.appendChild(b)
    };
    var Mb = function(a) {
        for (var b = 0; a != a.parent;) a = a.parent, b++, Ka(a)
    };
    var O = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    O.prototype.clone = function() {
        return new O(this.top, this.right, this.bottom, this.left)
    };
    O.prototype.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    O.prototype.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    O.prototype.translate = function(a, b) {
        a instanceof E ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (this.left += a, this.right += a, q(b) && (this.top += b, this.bottom += b));
        return this
    };
    var P = function(a, b) {
            var c;
            i: {
                c = N(a);
                if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null))) {
                    c = c[b] || c.getPropertyValue(b) || "";
                    break i
                }
                c = ""
            }
            return c || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
        },
        Nb = function(a) {
            var b;
            try {
                b = a.getBoundingClientRect()
            } catch (c) {
                return {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                }
            }
            J && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
            return b
        },
        Ob = function(a) {
            if (J && !(J && 8 <= Ab)) return a.offsetParent;
            var b = N(a),
                c = P(a, "position"),
                d = "fixed" == c || "absolute" == c;
            for (a = a.parentNode; a && a != b; a = a.parentNode)
                if (c = P(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
            return null
        },
        Pb = function(a) {
            var b, c = N(a),
                d = P(a, "position"),
                e = K && c.getBoxObjectFor && !a.getBoundingClientRect && "absolute" == d && (b = c.getBoxObjectFor(a)) &&
                (0 > b.screenX || 0 > b.screenY),
                f = new E(0, 0),
                g;
            b = c ? N(c) : document;
            (g = !J || J && 9 <= Ab) || (g = "CSS1Compat" == Db(b).ua.compatMode);
            g = g ? b.documentElement : b.body;
            if (a == g) return f;
            if (a.getBoundingClientRect) b = Nb(a), a = Lb(Db(c)), f.x = b.left + a.x, f.y = b.top + a.y;
            else if (c.getBoxObjectFor && !e) b = c.getBoxObjectFor(a), a = c.getBoxObjectFor(g), f.x = b.screenX - a.screenX, f.y = b.screenY - a.screenY;
            else {
                b = a;
                do {
                    f.x += b.offsetLeft;
                    f.y += b.offsetTop;
                    b != a && (f.x += b.clientLeft || 0, f.y += b.clientTop || 0);
                    if (L && "fixed" == P(b, "position")) {
                        f.x += c.body.scrollLeft;
                        f.y += c.body.scrollTop;
                        break
                    }
                    b = b.offsetParent
                } while (b && b != a);
                if (I || L && "absolute" == d) f.y -= c.body.offsetTop;
                for (b = a;
                    (b = Ob(b)) && b != c.body && b != g;) f.x -= b.scrollLeft, I && "TR" == b.tagName || (f.y -= b.scrollTop)
            }
            return f
        },
        Qb = function(a, b) {
            "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
            return a
        },
        Rb = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
    var Sb = /[&\?](?:client|correlator|url|ifk|oid|eid)=[^&]+/g,
        Tb = /[&\?](?:slotname|dt|ifi|adx|ady|format|output|flash|impl)=[^&]+/g;
    J && M("9");
    !L || M("528");
    K && M("1.9b") || J && M("8") || I && M("9.5") || L && M("528");
    K && !M("8") || J && M("9");
    var Ub = function(a, b, c) {
            if ("array" == ba(b))
                for (var d = 0; d < b.length; d++) Ub(a, String(b[d]), c);
            else null != b && c.push("&", a, "" === b ? "" : "=", encodeURIComponent(String(b)))
        },
        Vb = function(a, b, c) {
            for (c = c || 0; c < b.length; c += 2) Ub(b[c], b[c + 1], a);
            return a
        },
        Wb = function(a, b) {
            var c = 2 == arguments.length ? Vb([a], arguments[1], 0) : Vb([a], arguments, 1);
            if (c[1]) {
                var d = c[0],
                    e = d.indexOf("#");
                0 <= e && (c.push(d.substr(e)), c[0] = d = d.substr(0, e));
                e = d.indexOf("?");
                0 > e ? c[1] = "?" : e == d.length - 1 && (c[1] = void 0)
            }
            return c.join("")
        };
    var Q = !1,
        R = "",
        Xb = function(a) {
            a = a.match(/[\d]+/g);
            if (!a) return "";
            a.length = 3;
            return a.join(".")
        };
    if (navigator.plugins && navigator.plugins.length) {
        var Yb = navigator.plugins["Shockwave Flash"];
        Yb && (Q = !0, Yb.description && (R = Xb(Yb.description)));
        navigator.plugins["Shockwave Flash 2.0"] && (Q = !0, R = "2.0.0.11")
    } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
        var Zb = navigator.mimeTypes["application/x-shockwave-flash"];
        (Q = Zb && Zb.enabledPlugin) && (R = Xb(Zb.enabledPlugin.description))
    } else try {
        var $b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),
            Q = !0,
            R = Xb($b.GetVariable("$version"))
    } catch (ac) {
        try {
            $b =
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), Q = !0, R = "6.0.21"
        } catch (bc) {
            try {
                $b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), Q = !0, R = Xb($b.GetVariable("$version"))
            } catch (cc) {}
        }
    }
    var dc = R;
    var ec;
    ec = !1;
    var S = G;
    S && (-1 != S.indexOf("Firefox") || -1 != S.indexOf("Camino") || -1 != S.indexOf("iPhone") || -1 != S.indexOf("iPod") || -1 != S.indexOf("iPad") || -1 != S.indexOf("Chrome") || -1 != S.indexOf("Android") || -1 != S.indexOf("Safari") && (ec = !0));
    var fc = ec;
    ua && (Wa = 1);
    if (u && u.URL) var gc = u.URL,
        Xa = !(gc && (0 < gc.indexOf("?google_debug") || 0 < gc.indexOf("&google_debug")));
    var T = function(a, b, c, d) {
        c = eb(d || "osd_or_lidar::" + b, c);
        La(a, b, c);
        return c
    };
    var hc = function() {
            this.Pb = this.Ob = 3E3;
            this.h = "u";
            this.Ta = null;
            this.j = [];
            this.Ab = !1;
            this.G = -1;
            this.sa = 0
        },
        ic = function(a, b, c) {
            this.pa = a;
            this.tb = b;
            this.sb = c
        },
        mc = function(a, b, c) {
            if (!(b && b.getBoundingClientRect && 0 <= Ga(dc, "11") && c) || J && 9 > xb || 0 < a.j.length) return !1;
            try {
                var d = b.getBoundingClientRect()
            } catch (e) {
                return !1
            }
            var f = "DIV" == b.tagName || "INS" == b.tagName,
                g = N(b),
                h = [];
            f ? (b.style.position = "relative", d = jc(d), D(d, function(a, d) {
                var e = new kc("e", g, c, String(d));
                this.j.push(e);
                h.push(r(e.Tb, e, b, a))
            }, a)) : (d = lc(a,
                d), D(d, function(a, d) {
                var e = new kc("e", g, c, String(d));
                this.j.push(e);
                h.push(r(e.Sb, e, b, a))
            }, a));
            var k = !0;
            D(h, function(a) {
                k = k && a()
            });
            k ? (a.h = "l", a.Ta = b, a.Ab = !f) : (D(a.j, function(a) {
                a.remove()
            }), a.j = []);
            return k
        },
        jc = function(a) {
            return [new E(Math.floor((a.right - a.left) / 2), Math.floor((a.bottom - a.top) / 2))]
        },
        lc = function(a, b) {
            var c;
            try {
                c = b || a.Ta.getBoundingClientRect()
            } catch (d) {
                c = new O(0, 0, 0, 0)
            }
            var e = jc(c);
            D(e, function(a) {
                a.x += c.left;
                a.y += c.top
            });
            return e
        },
        oc = function(a) {
            if (a.Ta && a.Ab) {
                var b = lc(a);
                D(b, function(a,
                    b) {
                    this.j[b] && nc(this.j[b], a)
                }, a)
            }
        },
        pc = function(a) {
            D(a.j, function(a) {
                a.remove()
            });
            a.j = [];
            a.h = "d"
        },
        tc = function(a) {
            var b = (new Date).getTime(),
                c = a.Cb ? b - a.Cb : 0,
                d = -1;
            4 == a.j.length ? (d = gb(a.j, function(a) {
                return qc(a, b)
            }), d = rc(d)) : 1 == a.j.length && (d = [-1, 0, 1, 2, 3, 5][qc(a.j[0], b) + 1]);
            a.sa = d == a.G ? a.sa + c : 0;
            c = new ic(d, a.G, c);
            a.G = d;
            a.Cb = b;
            sc(a, d);
            oc(a);
            return c
        },
        rc = function(a) {
            var b = jb(lb(uc));
            D(a, function(a) {
                0 <= a && ++b[a]
            });
            return 4 == b[4] ? 6 : 3 <= b[4] ? 5 : 0 < b[4] ? 4 : 4 == b[2] ? 2 : 4 == b[1] ? 1 : 4 == b[0] ? 0 : 3
        },
        sc = function(a, b) {
            0 ==
                b && vc(a) ? a.h = "n" : a.h = "dlfcrrrr".split("")[b + 1]
        },
        wc = function(a) {
            return "f" == a.h && a.sa >= a.Ob
        },
        vc = function(a) {
            return "n" == a.h ? !0 : "l" == a.h && a.sa >= a.Pb
        },
        kc = function(a, b, c, d) {
            this.g = null;
            this.Ra = a;
            this.Bb = "e" == a ? String(c) + "~" + String(d) : "";
            this.H = [];
            this.O = -1;
            this.Sa = 0;
            this.ra = jb(lb(xc));
            this.Nb = jb(lb(uc));
            "e" == this.Ra && (yc[this.Bb] = r(this.Qb, this));
            J ? (a = b.createElement("div"), a.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" style="opacity:0;-ms-filter:\'progid:DXImageTransform.Microsoft.Alpha(opacity=0)\';filter:alpha(opacity=0)"><param name="movie" value="' +
                zc(this, !0) + '"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="transparent"></param></object>', a = a.firstChild, a.id = String(Math.random())) : a = Ac(this, b);
            a.width = 1;
            a.height = 1;
            a.style.zIndex = -999999;
            this.g = a
        },
        uc = {
            hc: -1,
            LOADING: 0,
            Wb: 1,
            Vb: 2,
            Zb: 3,
            ic: 4
        },
        xc = {
            LOADING: 0,
            Wb: 1,
            Vb: 2,
            cc: 3,
            $b: 4,
            ec: 5,
            gc: 6,
            dc: 7,
            ac: 8,
            bc: 9
        },
        yc = {},
        Ac = function(a, b) {
            var c = function(a, c, d) {
                    var e = b.createElement("param");
                    e.name = c;
                    e.value = d;
                    a.appendChild(e)
                },
                d = zc(a),
                e = b.createElement("object");
            e.type =
                "application/x-shockwave-flash";
            e.data = d;
            c(e, "movie", d);
            c(e, "allowscriptaccess", "always");
            c(e, "wmode", "opaque");
            e.style.visibility = "hidden";
            e.style.opacity = 0;
            return e
        },
        zc = function(a, b) {
            var c = "//www.gstatic.com/osd/hbt.swf";
            "e" == a.Ra && (c = Wb("//www.gstatic.com/osd/hbe.swf", "id", a.Bb));
            b && (c = Wb(c, "delay", "1"));
            return c
        };
    kc.prototype.Tb = function(a, b) {
        if (!this.g) return !1;
        this.g.style.position = "absolute";
        nc(this, b);
        var c = !0;
        try {
            a.appendChild(this.g)
        } catch (d) {
            c = !1
        }
        return c
    };
    kc.prototype.Sb = function(a, b) {
        if (!this.g || !a.parentNode) return !1;
        this.g.style.position = "fixed";
        nc(this, b);
        var c = !0;
        try {
            a.parentNode && a.parentNode.insertBefore(this.g, a.nextSibling)
        } catch (d) {
            c = !1
        }
        return c
    };
    var nc = function(a, b) {
        var c;
        if (c = a.g) c = a.g, c = new E(c.offsetLeft, c.offsetTop), c = !(b == c || b && c && b.x == c.x && b.y == c.y);
        if (c) {
            c = a.g;
            var d, e, f = K && (rb || vb) && M("1.9");
            b instanceof E ? (d = b.x, e = b.y) : (d = b, e = void 0);
            c.style.left = Qb(d, f);
            c.style.top = Qb(e, f)
        }
    };
    kc.prototype.remove = function() {
        if (this.g) try {
            var a = this.g;
            a && a.parentNode && a.parentNode.removeChild(a)
        } catch (b) {}
        this.g = null
    };
    kc.prototype.Qb = function(a) {
        this.O = a ? 3 : 4
    };
    var qc = function(a, b) {
            if ("e" == a.Ra) {
                var c = null;
                try {
                    c = a.g.it()
                } catch (d) {}
                null === c ? (c = 0, 0 < a.O && (c = 2)) : c = c ? 3 : 4;
                ++a.Nb[c + 1];
                a.O = c
            } else {
                var e = Number(b),
                    f = null;
                try {
                    f = a.g.fc()
                } catch (g) {}
                Bc(a, f, e);
                c = a.H[a.H.length - 1];
                if (null === f) {
                    if (f = e = 0, 0 < a.O || q(c.ta)) f = e = 2
                } else null === c.ta || c.Ua >= e ? (e = 10 <= f ? 4 : 0, f = 0) : f > c.ta ? (c = (f - c.ta) / (e - c.Ua) * 1E3, e = 10 <= c ? 4 : 3, c = 0 == c ? 1 : 1 > c ? 3 : 4 > c ? 4 : 23 > c ? 6 : 26 > c ? 8 : 9, 6 == a.Sa && 6 == c && (c = 7), f = c) : f = e = 1;
                6 == a.Sa && (--a.ra[6], 4 == f || 8 == f ? ++a.ra[5] : ++a.ra[7]);
                ++a.ra[f];
                a.O = e;
                a.Sa = f
            }
            return a.O
        },
        Bc = function(a,
            b, c) {
            var d = c - 1E3,
                e = a.H.length;
            D(a.H, function(a, b) {
                a.Ua <= d && (e = Math.min(e, b + 1))
            });
            var f = a.H.length - e;
            0 < f && a.H.splice(e, f);
            a.H.unshift({
                ta: b,
                Ua: c
            })
        };
    aa("gteh", db("osd_or_lidar::gteh_ex", function(a, b) {
        var c = yc[a];
        fa(c) && c(b)
    }));
    var Cc = function(a, b) {
            this.r = a || 0;
            this.m = b || ""
        },
        Dc = function(a, b) {
            a.r && (b[4] = a.r);
            a.m && (b[12] = a.m)
        };
    Cc.prototype.match = function(a) {
        return (this.r || this.m) && (a.r || a.m) ? this.m || a.m ? this.m == a.m : this.r || a.r ? this.r == a.r : !1 : !1
    };
    Cc.prototype.toString = function() {
        var a = "" + this.r;
        this.m && (a += "-" + this.m);
        return a
    };
    var Ec = function(a) {
        var b = [];
        kb(a, function(a, d) {
            var e = w(d),
                f = a;
            p(f) && (f = w(f));
            b.push(e + "=" + f)
        });
        return b.join("\n")
    };
    var Fc = function(a, b) {
            var c = b || v;
            a && c.top != c && (c = c.top);
            try {
                var d;
                if (c.document && !c.document.body) d = new F(-1, -1);
                else {
                    var e = (c || window).document,
                        f = "CSS1Compat" == e.compatMode ? e.documentElement : e.body;
                    d = new F(f.clientWidth, f.clientHeight)
                }
                return d
            } catch (g) {
                return new F(-12245933, -12245933)
            }
        },
        Gc = function(a, b, c) {
            var d = v || v;
            a && (d = d.top);
            a = b || Fc(a, d);
            c = c || Lb(Db(d.document));
            return -1 == a.width || -12245933 == a.width ? new O(a.width, a.width, a.width, a.width) : new O(c.y, c.x + a.width, c.y + a.height, c.x)
        },
        Hc = function() {
            return v.outerWidth ?
                new F(v.outerWidth, v.outerHeight) : new F(-12245933, -12245933)
        },
        Ic = function(a, b) {
            ("msie" in Sa ? Sa.msie : Sa.msie = -1 != navigator.userAgent.toLowerCase().indexOf("msie")) && !window.opera ? Qa(a, eb("osd::util::rschange", function() {
                "complete" == a.readyState && b(null)
            })) : La(a, "load", eb("osd::util::load", b))
        },
        Jc = function(a, b) {
            try {
                b.postMessage(a, "*")
            } catch (c) {}
        },
        Mc = function(a, b) {
            if (b) {
                a(b);
                var c = b.frames;
                if (c) {
                    var d = c.length,
                        e;
                    for (e = 0; e < d; ++e) Mc(a, c[e])
                }
            }
        },
        Oc = function() {
            var a = 0 <= U ? V() - U : -1,
                b = W ? V() - Nc : -1,
                c = a; - 1 != b &&
                b < a && (c = b);
            return 2E3 > c ? 250 : 4E3 > c ? 500 : 1E3
        },
        Pc = (new Date).getTime(),
        U = -1,
        W = !1,
        Nc = -1,
        V = function() {
            return (new Date).getTime() - Pc
        };
    var X = function(a, b, c, d, e, f, g, h, k) {
            this.a = Qc.clone();
            this.l = this.A = 0;
            this.S = new O(0, 0, 0, 0);
            this.wa = this.za = this.J = -1;
            this.W = [0, 0, 0, 0, 0];
            this.I = [0, 0, 0, 0, 0];
            this.F = [0, 0, 0, 0, 0];
            this.zoom = [0, 0, 0, 0, 0];
            this.Q = "";
            this.jb = !1;
            this.kb = !0;
            this.q = d;
            this.U = this.ea = -1;
            this.Fa = 0;
            this.ia = b;
            this.p = c && c._adk_ ? c._adk_ : 0;
            this.bb = null;
            this.c = e;
            this.Z = g || "";
            this.ba = h || "";
            this.xa = function() {};
            this.Ya = function() {};
            this.B = this.element = c;
            this.Y = 0;
            this.ga = -1;
            this.V = k || Qc;
            this.Wa = b ? -1 != b.indexOf("dcopt=anid") : !1;
            this.Xa = "";
            this.o =
                c ? String(c._avi_ || "") : "";
            this.Fb = c ? Boolean(c._eos_) : !1;
            this.la = 0;
            this.Ha = [];
            this.hb = !1;
            this.Da = "";
            this.ca = null;
            this.da = "";
            this.k = {};
            this.k.le = 0;
            this.k.nt = 2;
            this.k.Fr = 3;
            this.f = this.Ma = null;
            this.X = !1;
            this.M = this.d = null;
            this.Ga = 0;
            this.u = null;
            this.Ia = !1;
            this.b = null;
            this.aa = "";
            this.$ = this.N = this.w = null;
            this.Ca = this.Ba = !1;
            this.v = this.Gb = this.P = this.ja = null;
            this.oa = 0;
            this.ha = !1;
            this.s = null;
            this.R = !1;
            this.L = null;
            this.na = 0;
            this.fa = !1;
            this.C = null;
            this.Jb = 0;
            this.lb = null;
            this.Aa = !1;
            this.Kb = f;
            this.ab = this.cb = !1;
            this.Mb = Ta();
            this.nb = a;
            this.ma = null;
            this.ka = c ? String(c._cvu_ || "") : "";
            this.ib = !1;
            this.Za = void 0;
            this.K = this.$a = this.Ka = !1;
            this.Ea = [];
            this.fb = void 0;
            this.ob = 0;
            this.La = -1;
            this.eb = this.T = 0;
            this.Ja = void 0;
            this.mb = !1;
            this.ya = 0;
            this.gb = {
                Ib: null,
                Hb: null
            };
            this.D = this.Lb = this.va = !1;
            Rc(this, a, f)
        },
        Qc = new O(0, 0, 0, 0),
        Sc = function(a) {
            return new Cc(a.p, a.bb)
        },
        Vc = function(a, b, c, d) {
            var e = Tc,
                f = a.ma,
                g = null,
                g = f && e ? new O(e.y, e.x + f.width, e.y + f.height, e.x) : new O(-12245933, -12245933, -12245933, -12245933);
            d || (a.a = g, f && (a.A =
                f.width * f.height));
            Uc(a, g, b, c, d, !0)
        },
        Wc = function(a, b, c, d, e) {
            if (!(0 > a.q)) {
                var f = v.innerWidth,
                    g = v.innerHeight,
                    h = new O(Math.round(v.mozInnerScreenY), Math.round(v.mozInnerScreenX + f), Math.round(v.mozInnerScreenY + g), Math.round(v.mozInnerScreenX));
                c = new O(v.screenY + d, v.screenX + c.width, v.screenY + c.height, v.screenX);
                e || (d = new O(h.top - c.top, h.right - c.left, h.bottom - c.top, h.left - c.left), d.top > a.a.top ? a.a = d : (a.a.right = a.a.left + f, a.a.bottom = a.a.top + g), a.A = f * g);
                Uc(a, h, c, b, e, !0)
            }
        },
        Yc = function(a, b, c) {
            var d = Xc(a, v &&
                v.document);
            if (d) {
                c || Rc(a, v, !0);
                var e = Math.floor((a.a.left + a.a.right) / 2),
                    f = Math.floor((a.a.top + a.a.bottom) / 2),
                    g = Gb(document),
                    d = d(e - g.x, f - g.y) ? .5 : 0;
                Uc(a, a.a, d, b, c, !0)
            }
        },
        Xc = function(a, b) {
            Zc(a);
            if (!a.Ma) {
                var c = [];
                D(mb(a.k), function(a) {
                    c[this.k[a] + 1] = a
                }, a);
                var d = c.join(""),
                    d = b && b[d];
                a.Ma = d && r(d, b)
            }
            return a.Ma
        },
        Zc = function(a) {
            a.k.e = -1;
            a.k.i = 6;
            a.k.n = 7;
            a.k.t = 8
        };
    X.prototype.update = function(a, b, c, d, e) {
        if (0 > this.q) return null;
        c || Rc(this, d, e);
        Boolean(this.d) && (c ? (this.d && (e = this.d, 3 <= e.G && (e.G = 3)), d.clearInterval(this.M), this.M = null) : this.d && !this.M && "d" != this.d.h && $c(this, d, !0));
        Boolean(this.w) && (c ? (this.w && this.w.pause(), d.clearInterval(this.N), this.N = null) : this.w && !this.N && this.Ba && (this.N = d.setInterval(A("osd_or_lidar::adblock::nclv_int", r(this.qb, this)), 1E3), this.qb()));
        null != this.s && (c ? (d.clearInterval(this.v), this.v = null, this.ha = !1) : this.R && !this.v &&
            ad(this, d, !0));
        null !== this.P && (c ? this.Ca && (d.clearTimeout(this.Gb), this.ja && this.ja.Xb()) : this.Ca && this.ja && this.ja.Yb());
        null != this.C && "-" != this.C && (c ? (d.clearInterval(this.L), this.L = null, this.fa = !1) : this.Aa && !this.L && (this.L = d.setInterval(A("osd_or_lidar::adblock::xdev_int", r(this.rb, this, d, 1E3)), 1E3), this.rb(d)));
        return Uc(this, this.a, b, a, c, !1)
    };
    var Uc = function(a, b, c, d, e, f) {
            var g = d - a.q || 1,
                h = null;
            q(c) ? b = bd(a, c) : (h = cd(a, c), b = bd(a, b, h));
            a.fb || dd(a, b, g, a.ea, f, e, h);
            a.ea = e ? -1 : b;
            a.q = d; - 1 != b && (0 > a.J && (a.J = d), a.wa = d); - 1 == a.za && ed(a) && (a.za = d);
            a.xa(a, h || Qc);
            return a.l
        },
        bd = function(a, b, c) {
            if (a.mb && 7 == a.c) return a.l = 1, fd(a.l);
            var d = null;
            if (q(b)) a.l = b;
            else {
                c = new O(Math.max(b.top, c.top), Math.min(b.right, c.right), Math.min(b.bottom, c.bottom), Math.max(b.left, c.left));
                if (0 >= a.A || c.top >= c.bottom || c.left >= c.right) return a.S = new O(0, 0, 0, 0), a.l = 0, -1;
                a.S = c.clone().translate(-b.left, -b.top);
                d = (c.bottom - c.top) * (c.right - c.left);
                a.l = d / a.A
            }
            return fd(a.l)
        },
        fd = function(a) {
            var b = -1;
            1 <= a ? b = 0 : .75 <= a ? b = 1 : .5 <= a ? b = 2 : .25 <= a ? b = 3 : 0 < a && (b = 4);
            return b
        },
        dd = function(a, b, c, d, e, f, g) {
            e = e && -1 != d && 2 >= d;
            var h = -1 == d || -1 == b ? -1 : Math.max(d, b);
            d = e ? h : d; - 1 != d && (a.W[d] += c);
            (e = g || null) ? (-1 != d && 2 >= d && -1 != a.U && (a.zoom[a.U] += c), e = 100 * a.A / ((e.bottom - e.top) * (e.right - e.left)), a.U = 20 <= e ? 0 : 10 <= e ? 1 : 5 <= e ? 2 : 2.5 <= e ? 3 : 4) : a.U = -1;
            (g = g || null) ? (g = (g.bottom - g.top) * (g.right - g.left), a.Fa = 0 < g ? a.A * a.l / g : 0) : a.Fa = 0;
            if (7 == a.c) {
                var k;
                i: {
                    if (a.element && a.element.sdkVolume && fa(a.element.sdkVolume)) try {
                        k = Number(a.element.sdkVolume());
                        break i
                    } catch (n) {
                        k = -1;
                        break i
                    }
                    k = void 0
                }
                g = -1 != d && 2 >= d;
                !g && void 0 !== a.Ja && 0 < a.Ja && (a.T += c);
                a.T > a.eb && (a.eb = a.T);
                if (g || void 0 === k || 0 >= k) a.T = 0;
                a.Ja = k
            }
            for (k = d; 0 <= k && 4 >= k; k++) a.F[k] += c, a.F[k] > a.I[k] && (a.I[k] = a.F[k]);
            for (k = 0; k < a.F.length; ++k)
                if (k < b || f || -1 == b) a.F[k] = 0
        },
        gd = function(a) {
            a.f && pc(a.f)
        },
        $c = function(a, b, c) {
            a.M = b.setInterval(A("osd_or_lidar::adblock::flv_int", r(a.Eb, a, b)), 1E3);
            c && a.Eb(b)
        };
    X.prototype.Eb = function(a) {
        if (this.d) {
            var b = tc(this.d);
            this.Ga = 5 <= b.pa && 5 <= b.tb ? this.Ga + b.sb : 0;
            if (1E3 <= this.Ga) hd(this, a), this.u = "v";
            else if (2 == b.pa || vc(this.d) || wc(this.d)) hd(this, a), this.u = "i"
        }
    };
    var hd = function(a, b) {
        b.clearInterval(a.M);
        a.M = null;
        a.Ia = !1;
        a.d && pc(a.d)
    };
    X.prototype.qb = function() {
        this.w && this.w.update()
    };
    var id = function(a, b) {
            b.clearInterval(a.N);
            a.N = null;
            a.Ba = !1;
            a.w && a.w.zb()
        },
        ad = function(a, b, c) {
            a.v = b.setInterval(A("osd_or_lidar::adblock::iem_int", r(a.Db, a, b, 1E3)), 1E3);
            c && a.Db(b)
        };
    X.prototype.Db = function(a, b) {
        var c = Xc(this, a && a.document);
        if (c) {
            Rc(this, a, !0);
            var d = Math.floor((this.a.left + this.a.right) / 2),
                e = Math.floor((this.a.top + this.a.bottom) / 2),
                f = Gb(document),
                c = Boolean(c(d - f.x, e - f.y)),
                d = b || 0;
            c ? (this.oa += this.ha ? d : 0, this.ha = !0) : (this.oa = 0, this.ha = !1);
            1E3 <= this.oa && (a.clearInterval(this.v), this.v = null, this.R = !1, this.s = "v");
            Rc(this, a, !1)
        } else a.clearInterval(this.v), this.v = null, this.R = !1, this.s = "i"
    };
    X.prototype.rb = function(a, b) {
        if (this.lb) {
            var c = this.lb.contentWindow,
                d = this.a.right - this.a.left,
                e = this.a.bottom - this.a.top,
                f = this.Jb,
                g = Hc(),
                h = new O(Math.round(c.mozInnerScreenY), Math.round(c.mozInnerScreenX + d), Math.round(c.mozInnerScreenY + e), Math.round(c.mozInnerScreenX)),
                c = cd(this, new O(c.screenY + f, c.screenX + g.width, c.screenY + g.height, c.screenX)),
                h = new O(Math.max(h.top, c.top), Math.min(h.right, c.right), Math.min(h.bottom, c.bottom), Math.max(h.left, c.left)),
                e = d * e,
                d = 0;
            0 < e && h.top < h.bottom && h.left < h.right &&
                (d = (h.bottom - h.top) * (h.right - h.left) / e);
            e = b || 0;.5 <= d ? (this.na += this.fa ? e : 0, this.fa = !0) : (this.na = 0, this.fa = !1);
            1E3 <= this.na && (a.clearInterval(this.L), this.L = null, this.Aa = !1, this.C = "v")
        }
    };
    var jd = function(a) {
            return a.Ia || a.Ba || a.R || a.Ca || a.Aa
        },
        kd = function(a) {
            return a ? a.top + "-" + a.left + "-" + a.bottom + "-" + a.right : "0-0-0-0"
        },
        md = function(a, b, c, d) {
            var e = ed(a);
            if (0 != a.la && (1 != a.la || e && !a.hb)) {
                var f = a.getStats();
                f.unshift("adk=" + a.p);
                d && f.push("r=" + d);
                b = f.concat(b).join("&");
                d = {};
                Dc(Sc(a), d);
                d[0] = c;
                d[3] = b;
                d[5] = e;
                d[15] = jd(a);
                d[11] = a.cb || a.ab;
                d[7] = a.l;
                d[9] = kd(a.S);
                d[13] = a.I.join(",");
                d[14] = a.Fa;
                ld(a, d, a.Ha);
                a.hb = e
            }
        },
        ld = function(a, b, c) {
            try {
                var d = Ec(b);
                nd(a, d, c)
            } catch (e) {}
        },
        nd = function(a, b, c) {
            if (b &&
                a.element) {
                var d = c ? c.length : 0;
                if (0 < d)
                    for (var e = 0; e < d; ++e) a = c[e], (a == v.top || a.parent && a.parent != a) && Jc(b, a);
                else {
                    c = [];
                    try {
                        var f = Kb(a.element);
                        if (f) c = [f];
                        else {
                            var g;
                            var h, d = document,
                                k = a.element || d;
                            g = k.querySelectorAll && k.querySelector ? k.querySelectorAll("IFRAME") : h = k.getElementsByTagName("IFRAME");
                            for (e = 0; e < g.length; ++e)(f = Kb(g[e])) && c.push(f)
                        }
                        var n = c.length;
                        if (0 < n)
                            for (var m = ka(Jc, b), e = 0; e < n; ++e) Mc(m, c[e])
                    } catch (z) {}
                }
            }
        };
    X.prototype.Ub = function() {
        this.ga = V()
    };
    X.prototype.pb = function() {
        this.Y += V() - this.ga;
        this.ga = -1
    };
    var Rc = function(a, b, c) {
            b = c ? b : b.top;
            try {
                var d = Qc.clone(),
                    e = new E(0, 0);
                if (a.B) {
                    var d = a.B.getBoundingClientRect(),
                        f = a.B,
                        g = new E(0, 0),
                        h = Hb(N(f));
                    do {
                        var k;
                        if (h == b) k = Pb(f);
                        else {
                            var n = f,
                                m = void 0;
                            if (n.getBoundingClientRect) var z = Nb(n),
                                m = new E(z.left, z.top);
                            else var C = Lb(Db(n)),
                                ia = Pb(n),
                                m = new E(ia.x - C.x, ia.y - C.y);
                            c = void 0;
                            if (K && !M(12)) {
                                var ca = void 0;
                                var oa, da = void 0;
                                t: {
                                    var t = Ha();
                                    if (void 0 === n.style[t]) {
                                        var oe = (L ? "Webkit" : K ? "Moz" : J ? "ms" : I ? "O" : null) + Ia(t);
                                        if (void 0 !== n.style[oe]) {
                                            da = (L ? "-webkit" : K ? "-moz" : J ?
                                                "-ms" : I ? "-o" : null) + "-transform";
                                            break t
                                        }
                                    }
                                    da = "transform"
                                }
                                if (oa = P(n, da) || P(n, "transform")) var tb = oa.match(Rb),
                                    ca = tb ? new E(parseFloat(tb[1]), parseFloat(tb[2])) : new E(0, 0);
                                else ca = new E(0, 0);
                                c = new E(m.x + ca.x, m.y + ca.y)
                            } else c = m;
                            k = c
                        }
                        c = k;
                        g.x += c.x;
                        g.y += c.y
                    } while (h && h != b && (f = h.frameElement) && (h = h.parent));
                    e = g
                }
                var pe = d.right - d.left,
                    qe = d.bottom - d.top,
                    Kc = e.x + a.V.left,
                    Lc = e.y + a.V.top,
                    re = a.V.right || pe,
                    se = a.V.bottom || qe;
                a.a = new O(Math.round(Lc), Math.round(Kc + re), Math.round(Lc + se), Math.round(Kc))
            } catch (Oe) {
                a.a = a.V
            } finally {
                a.k.Po =
                    5, a.k.me = 1, a.k.om = 4
            }
            a.A = (a.a.bottom - a.a.top) * (a.a.right - a.a.left);
            a.ab = 2 != a.c && 3 != a.c && 6 != a.c || 0 != a.A ? !1 : !0
        },
        ed = function(a) {
            return 1E3 <= Math.max(a.F[2], a.I[2])
        };
    X.prototype.getStats = function() {
        var a = this.a,
            a = ["p=" + a.top + "," + a.left + "," + a.bottom + "," + a.right];
        a.push("tos=" + this.W.join(","));
        a.push("mtos=" + this.I.join(","));
        a.push("rs=" + this.c);
        var b = 5 == this.c || 6 == this.c;
        b || a.push("ht=" + this.Y);
        0 <= this.J && (a.push("tfs=" + this.J), a.push("tls=" + this.wa));
        this.o && a.push("avi=" + this.o);
        this.s && a.push("iemv=" + this.s);
        this.P && a.push("mppv=" + this.P);
        this.C && a.push("xdev=" + this.C);
        this.b && (a.push("ncl=1"), this.b.Na && a.push("nclt=" + this.b.Na), this.b.Oa && a.push("nctt=" +
            this.b.Oa));
        this.$ && a.push("nclv=" + this.$);
        this.aa && a.push("ncldbg=" + this.aa);
        this.f ? a.push("swf=" + this.f.h) : this.X && a.push("swf=-");
        this.u && a.push("swfv=" + (this.d ? this.d.h : "") + this.u);
        this.Da && a.push("fp=" + w(this.Da));
        7 == this.c && a.push("qid=" + this.Xa);
        this.Q && a.push("afp=" + w(this.Q));
        b && (this.ba && a.push("ord=" + w(this.ba)), this.Z && a.push("amd=" + w(this.Z + ";")), this.Wa && a.push("anid=1"), this.da && a.push("xbid=" + w(this.da)), this.Ea && 0 != this.Ea.length && a.push("qt=" + this.Ea.join(",")), this.ia && a.push("req=" +
            w(this.ia).substring(0, 100)));
        null !== this.ca && a.push("tp=" + this.ca);
        0 != this.ya && a.push("ipc=" + this.ya);
        this.Fb && a.push("eop=1");
        this.va && a.push("ci=1");
        return a
    };
    var cd = function(a, b) {
        if (a.Kb || a.Lb) return b;
        var c = a.nb.top || a.nb;
        try {
            if (a.Mb && c && (c.orientation || 0 == c.orientation) && c.innerHeight && c.innerWidth) {
                var d = 90 == Math.abs(c.orientation) ? c.document.body.clientHeight / c.innerHeight : c.document.body.clientWidth / c.innerWidth;
                return d ? new O(b.top, b.left + c.innerWidth / d, b.top + c.innerHeight / d, b.left) : b
            }
            return b
        } catch (e) {
            return b
        }
    };
    var od = !1,
        pd = null,
        qd = null,
        Tc = null,
        rd = null,
        sd = 0,
        td = !1,
        ud = 0,
        vd = null,
        Ad = function(a, b, c, d) {
            if (v.top.postMessage)
                if (1 != a.length) b();
                else if (rd = a[0].ma) {
                var e;
                try {
                    e = v.top.frames.google_top_static_frame ? !0 : !1
                } catch (f) {
                    e = !1
                }
                if (e) {
                    if (d) sd = 2;
                    else if (wd(), 2 != sd) {
                        b();
                        return
                    }
                    od = !0;
                    vd = c;
                    T(v, "message", xd, "osd::periscope::message");
                    yd()
                } else zd() ? b() : v.setTimeout(A("osd::periscope::mpmtgt_to", function() {
                    Ad(a, b, c, d)
                }), 50)
            } else b();
            else b()
        },
        yd = function() {
            var a = {};
            ud = Math.floor(1E6 * Math.random());
            a[0] = "google_loc_request";
            a[1] = ud;
            var b = [],
                c;
            for (c in a) b.push(c + "=" + a[c]);
            v.top.postMessage(b.join("\n"), "*")
        },
        xd = function(a) {
            var b = a.data.split("\n");
            a = {};
            for (var c = 0; c < b.length; c++) {
                var d = b[c].indexOf("="); - 1 != d && (a[b[c].substr(0, d)] = b[c].substr(d + 1))
            }
            if (a && 1 in a && a[1] == ud) {
                b = parseInt(a[10], 10);
                c = parseInt(a[11], 10);
                b = 0 < b && 0 < c ? new F(b, c) : new F(-12245933, -12245933); - 12245933 != b.width && -12245933 != b.height && (qd = b);
                b = parseInt(a[12], 10);
                c = parseInt(a[13], 10);
                b = 0 <= b && 0 <= c ? new E(b, c) : new E(-12245933, -12245933); - 12245933 != b.x &&
                    -12245933 != b.y && (pd = b);
                b = rd;
                if (null != b && 0 < b.width && 0 < b.height) {
                    var c = parseInt(a[6], 10),
                        d = parseInt(a[7], 10),
                        e = parseInt(a[8], 10);
                    a = parseInt(a[9], 10);
                    a = 0 < c && 0 < d && 0 < e && 0 < a && 10 >= Math.abs(e - b.width) + Math.abs(a - b.height) ? new E(c, d) : new E(-12245933, -12245933); - 12245933 != a.x && -12245933 != a.y && (Tc = a)
                }
                td = !0;
                vd && (a = vd, vd = null, a());
                v.setTimeout(A("osd::periscope::pmtgt_to", yd), Oc())
            }
        },
        zd = function() {
            var a = 0 <= U ? V() - U : -1;
            return -1 != a && 500 < a
        },
        wd = function() {
            var a = Ua([2], na);
            sd = a ? a : 1
        },
        Bd = function() {
            var a = null != qd && null !=
                pd && null != Tc && null != rd;
            return td && a
        };
    var Cd = null,
        Dd = null,
        Ed = null,
        Fd = !1,
        Jd = function(a, b) {
            if (!Fd) {
                Fd = !0;
                Cd = Cd || T(a, "scroll", Gd, "osd_or_lidar::scroll");
                Dd = Dd || T(a, "resize", Hd, "osd_or_lidar::resize");
                if (b)
                    for (var c, d = 0; d < Y.length; ++d) c = Y[d], c.element && (c.gb.Ib = T(c.element, "mouseover", r(c.Ub, c), "osd_or_lidar::adblock::mouseover"), c.gb.Hb = T(c.element, "mouseout", r(c.pb, c), "osd_or_lidar::adblock::mouseout"));
                var d = Id,
                    e;
                u.mozVisibilityState ? e = "mozvisibilitychange" : u.webkitVisibilityState ? e = "webkitvisibilitychange" : u.visibilityState && (e = "visibilitychange");
                e && (Ed = Ed || T(u, e, d, "osd_or_lidar::visibility"));
                Id()
            }
        },
        Hd = function() {
            Kd(!1);
            Gd()
        },
        Gd = function() {
            Ld(Y, !1)
        },
        Td = function() {
            var a = Z,
                b = Md,
                c = Nd;
            if (Od) {
                a = b;
                Kd(!1);
                var d = Pd,
                    b = d.height - a;
                0 >= b && (b = d.height, a = 0);
                Z = new F(d.width, b);
                b = new Qd;
                b.xb = !0;
                b.Va = Z;
                b.vb = d;
                b.ub = a;
                return b
            }
            if (c) return a = new Qd, a.wb = !0, a;
            if (od) return a = new Qd, a.Qa = !1, d = qd, a.Va = d, null != d && -12245933 != d.height && -12245933 != d.width && (Z = d, b = pd, null != b && -12245933 != b.x && -12245933 != b.y && (d = Gc(!1, d, b), a.qa = d, a.Qa = !0)), a;
            if (Rd) return a = new Qd, a.yb = !0, a;
            if (Sd) return a = new Qd, a.Rb = !0, a;
            i: {
                b = new Qd;
                b.Va = a;
                b.Pa = !1;
                if (null != a && -1 != a.width && -1 != a.height && -12245933 != a.width && -12245933 != a.height) {
                    try {
                        d = Gc(!0, a)
                    } catch (e) {
                        a = b;
                        break i
                    }
                    b.qa = d;
                    b.Pa = !0
                }
                a = b
            }
            return a
        },
        Ld = function(a, b) {
            if (!Ud && 0 != a.length) {
                Vd = null;
                var c = Td();
                window.clearTimeout(Wd);
                Wd = null;
                try {
                    var d = V();
                    if (c.xb)
                        for (var e = 0; e < a.length; e++) Wc(a[e], d, c.vb, c.ub, b);
                    else if (c.wb)
                        for (e = 0; e < a.length; e++) Yc(a[e], d, b);
                    else if (c.Qa) {
                        var f = Bd();
                        td = !1;
                        for (e = 0; e < a.length; e++) Vc(a[e], c.qa, d, b || !f)
                    } else if (Sd) D(a,
                        function(a) {
                            b ? a.b && a.b.pause() : a.b && a.b.update()
                        });
                    else if (c.yb) D(a, function(a) {
                        if (b) {
                            if (a.f) {
                                var c = a.f;
                                3 <= c.G && (c.G = 3);
                                a.ea = -1
                            }
                        } else if (a.f && "d" != a.f.h) {
                            var c = tc(a.f),
                                d = [-1, -1, -1, -1, -1, 4, 2, 0],
                                e = d[c.pa + 1];
                            dd(a, e, c.sb, d[c.tb + 1], !0, !1);
                            a.ea = e;
                            ed(a) && (a.xa(a, Qc), a.D || gd(a));
                            if (2 == c.pa || vc(a.f) || wc(a.f)) a.Ya(a), a.D = !1, gd(a)
                        }
                    });
                    else if (c.Pa)
                        for (e = 0; e < a.length; e++) a[e].update(d, c.qa, b, v, Xd);
                    Yd += V() - d;
                    ++Zd;
                    $d()
                } finally {
                    b || ae()
                }
            }
        },
        Id = function() {
            var a = be();
            if (a) {
                if (!W) {
                    var b = V();
                    Nc = b;
                    D(Y, function(a) {
                        var d =
                            a.ob;
                        W || a.fb || -1 == a.La || (d += b - a.La);
                        a.ob = d
                    })
                }
                W = !0;
                Kd(!0)
            } else b = V(), W && (ce += b - Nc), W = !1, D(Y, function(a) {
                0 <= a.q && (a.La = b)
            });
            Ld(Y, !a)
        },
        be = function() {
            if (de()) return !0;
            var a;
            a = v.document;
            a = {
                visible: 1,
                hidden: 2,
                prerender: 3,
                preview: 4
            }[a.webkitVisibilityState || a.mozVisibilityState || a.visibilityState || ""] || 0;
            return 1 == a || 0 == a
        },
        ae = function() {
            v && (Wd = v.setTimeout(A("osd_or_lidar::psamp_to", function() {
                Ld(Y, !1)
            }), Oc()))
        },
        Y = [],
        Ud = !1,
        Z = null,
        Pd = null,
        ee = null,
        Wd = null,
        Xd = !Ka(v.top),
        fe = "",
        Vd = null,
        Md = 0,
        Od = !1,
        Nd = !1,
        Rd = !1,
        Sd = !1,
        ge = 0,
        he = 0,
        Yd = 0,
        Zd = 0,
        ie = -1,
        ce = 0,
        Kd = function(a) {
            Z = Fc(!0, null);
            if (!a) {
                Pd = Hc();
                a = v;
                a.top != a && (a = a.top);
                var b = 0,
                    c = 0,
                    d = Z;
                try {
                    var e = a.document,
                        f = e.body,
                        g = e.documentElement;
                    if ("CSS1Compat" == e.compatMode && g.scrollHeight) b = g.scrollHeight != d.height ? g.scrollHeight : g.offsetHeight, c = g.scrollWidth != d.width ? g.scrollWidth : g.offsetWidth;
                    else {
                        var h = g.scrollHeight,
                            k = g.scrollWidth,
                            n = g.offsetHeight,
                            m = g.offsetWidth;
                        g.clientHeight != n && (h = f.scrollHeight, k = f.scrollWidth, n = f.offsetHeight, m = f.offsetWidth);
                        h > d.height ? h >
                            n ? (b = h, c = k) : (b = n, c = m) : h < n ? (b = h, c = k) : (b = n, c = m)
                    }
                    ee = new F(c, b)
                } catch (z) {
                    ee = new F(-12245933, -12245933)
                }
            }
        },
        je = function(a, b) {
            if (Vd && !b) return ib(Vd);
            var c = a.document,
                d = 0 <= U ? V() - U : -1,
                e = V(); - 1 == ie && (d = e);
            var f = [],
                g = Y;
            try {
                if (0 < g.length ? ((c = Z) && f.push("bs=" + c.width + "," + c.height), (c = Pd) && f.push("bos=" + c.width + "," + c.height), (c = ee) && f.push("ps=" + c.width + "," + c.height), a.screen && f.push("ss=" + a.screen.width + "," + a.screen.height)) : (f.push("url=" + w(a.location.href.substring(0, 1024))), c.referrer && f.push("referrer=" +
                    w(c.referrer.substring(0, 512)))), f.push("tt=" + d), f.push("pt=" + U), Od && f.push("xde=1"), Nd && f.push("iem=1"), sd && f.push("pei=" + sd), W && (ce += e - Nc), f.push("deb=" + w([1, ge, he, Yd, Zd, ie, ce].join("-"))), a.top != a) {
                    0 < g.length && f.push("iframe_loc=" + w(a.location.href.substring(0, 512)));
                    var h = Fc(!1, null);
                    f.push("is=" + h.width + "," + h.height)
                }
            } catch (k) {
                f.push("error")
            }
            Vd = f;
            return ib(Vd)
        },
        ke = function(a) {
            var b;
            var c = a.indexOf("Firefox/");
            b = -1;
            if (0 <= c) {
                b = Math.floor(a.substr(c + 8)) || -1;
                var d = a.indexOf("Mac OS X 10."),
                    c = -1;
                0 <= d && (c = Number(a.substr(d + 12, 1)) || -1);
                var e = 0 < c ? -1 : a.indexOf("Windows NT "),
                    d = -1;
                0 <= e && (d = {
                    "6.0": 0,
                    "6.1": 1,
                    "6.2": 2
                }[a.substr(e + 11, 3)] || -1);
                a = 148;
                5 <= c ? a = 4 <= b ? 108 : 3 <= b ? 127 : 108 : 0 <= d && (16 == b || 17 == b || 18 == b) && (a = [
                    [146, 146, 146],
                    [148, 147, 148],
                    [131, 130, 136]
                ][d][b - 16]);
                b = a
            } else b = null;
            null !== b && (Md = b, Od = !0)
        },
        le = function(a) {
            var b = Jb("iframe", {
                id: "google_osd_static_frame_" + Math.floor(1E13 * Math.random()),
                name: "google_osd_static_frame"
            });
            b.style.display = "none";
            b.style.width = "0px";
            b.style.height = "0px";
            a.document.body.appendChild(b)
        },
        me = function(a, b) {
            var c = b.match(a);
            return c ? c.join("") : ""
        },
        ne = function(a) {
            var b = !1;
            D(Y, function(c, d) {
                if (Math.random() < qa) {
                    var e;
                    var f = String(d);
                    !Boolean(Boolean(c.B && !!f && !fc && 7 != c.c) && !fc) || J && 1 <= Math.random() || c.o && 5 == c.c && 1 <= Math.random() ? (c.X = !0, e = !1) : (e = new hc, (f = mc(e, c.B, f)) ? (c.Ya = a, c.f = e) : c.X = !0, e = f);
                    b = b || e
                }
            });
            (Rd = b) && D(Y, function(b) {
                Boolean(b.f) || a(b)
            });
            return b
        },
        $d = function() {
            if ("osd" == fe)
                for (var a = Y, b = 0; b < a.length; b++) {
                    var c = je(v);
                    md(a[b], c, "goog_update_data", "u")
                }
        },
        de = function() {
            return hb(Y,
                function(a) {
                    return a.mb
                })
        },
        Qd = function() {
            this.vb = this.Va = null;
            this.ub = 0;
            this.qa = null;
            this.Pa = this.Rb = this.yb = this.Qa = this.wb = this.xb = !1
        };
    var $, te = 0,
        ue = null,
        ve = "",
        we = !1,
        ze = function() {
            if (!(0 < U)) {
                try {
                    if (!xe()) return;
                    Kd(!1);
                    ye(!1)
                } catch (a) {}
                ue = window.setTimeout(A("osd::nppls_to", ze), 250)
            }
        },
        ye = function(a) {
            Ae || (T(v, "message", Be, "osd::message"), we && T(x(), "message", Be, "osd::message"), Ae = !0);
            $.getNewBlocks(function(b, c, d, e, n, m, z, C, ia, ca) {
                if (window && Date) {
                    var oa = -1,
                        da = !1;
                    a || e ? oa = V() : da = !0;
                    var t = new X(window, c, b, oa, d, Xd);
                    t.xa = Ce;
                    t.Q = me(Tb, c);
                    t.p = De(c);
                    t.bb = fb(c);
                    t.ya = te;
                    Ee(t);
                    n && (t.o = n, Fe = !0);
                    t.ka = z;
                    t.$a = C;
                    t.K = ia;
                    ca && (t.va = !0);
                    m && m.width && m.height ?
                        (m = new F(m.width, m.height), 0 < m.width && 0 < m.height && (t.ma = m)) : t.ma = m || null;
                    Y.push(t);
                    ++he;
                    da && b.contentWindow ? Ic(b, function() {
                        t.q = V();
                        Ge(t);
                        Id()
                    }) : Ge(t)
                }
            }, a);
            if (a)
                for (var b = V(), c = Y.length, d = 0; d < c; ++d) {
                    var e = Y[d];
                    0 >= e.q && (e.q = b)
                }
        },
        Ke = function() {
            try {
                var a = x();
                U = V();
                Mb(a);
                window.clearTimeout(ue);
                ue = null;
                Kd(!1);
                xe() ? (ge = $.numBlocks(), ye(!0), 0 == he ? He("n") : Xd ? Ie(a) : (K && q(a.screenX) && q(a.mozInnerScreenX) && q(a.outerWidth) || D(Y, function(b, d) {
                    var e = Math.random();
                    if (0 > (e -= ra)) {
                        var e = String(d),
                            f = new hc;
                        Boolean(b.B &&
                            !!e && !fc && 7 != b.c) && mc(f, b.B, e) ? (b.u = "u", b.d = f, b.Ia = !0, $c(b, a)) : b.u = "-"
                    } else 0 > e - ta && J && M(8) && (b.R = !0, ad(b, a), b.s = "u")
                }), Je())) : He("c")
            } catch (b) {
                throw Y = [], He("x"), b;
            }
        },
        Ie = function(a, b) {
            var c = b || 0,
                d = 0 != te;
            if (1 > c && K && q(a.screenX) && q(a.mozInnerScreenX) && q(a.outerWidth) && 1 > Math.random()) ke(a.navigator.userAgent), Je();
            else if (2 > c && J && M(8) && Math.random() < sa) Nd = !0, Je();
            else if (3 > c && !d) Ad(Y, ka(Ie, a, 3), function() {
                Je();
                Id()
            }, $.shouldForcePeriscope());
            else {
                d = function(b) {
                    b.cb = !0;
                    md(b, je(a), "goog_update_data",
                        "i");
                    b.K && Le(b, "i", !0)
                };
                if (!(4 > c && ne(d)))
                    for (c = 0; c < Y.length; c++) d(Y[c]);
                Je()
            }
        },
        Je = function() {
            if (-1 == ie) {
                var a = x(),
                    b = 2 == $.getOseId();
                Jd(a, b);
                window.setTimeout(A("osd::hd_to", function() {
                    He("t")
                }), 36E5);
                Math.random() < la && (Math.random() < ma ? (le(x()), we = !0) : le(v));
                ie = V() - U
            }
        },
        He = function(a) {
            window.clearTimeout(Wd);
            Wd = null;
            $ || ($ = Goog_AdSense_getAdAdapterInstance());
            if (!Ud) {
                var b = $.getOseId();
                if (2 == b || Fe) {
                    -1 == ie && (Y = []);
                    var c = x(),
                        d = ["//pagead2.googlesyndication.com/pagead/gen_204?id=osd"],
                        e = Y;
                    if (0 < e.length) {
                        Ld(e, !0);
                        for (var f = 0; f < e.length; f++)
                            if (0 < e[f].p) {
                                0 < e[f].ga && e[f].pb();
                                var g = e[f],
                                    h = g.a,
                                    h = ["p:", h.top, h.left, h.bottom, h.right];
                                h.push("tos:", g.W.join(","));
                                h.push("mtos:", g.I.join(","));
                                h.push("rs:", g.c);
                                var k = 5 === g.c || 6 === g.c;
                                k || (h.push("zoom:", g.zoom.join(",")), h.push("ht:", g.Y));
                                0 <= g.J && h.push("tfs:", g.J, "tls:", g.wa);
                                h.push("vt:", g.za);
                                g.Q && h.push("fp:", g.Q);
                                7 === g.c && h.push("qid:", g.Xa);
                                g.o && h.push("avi:", g.o);
                                g.s && h.push("iemv:", g.s);
                                g.P && h.push("mppv:", g.P);
                                g.C && h.push("xdev:", g.C);
                                g.b && (h.push("ncl:",
                                    "1"), g.b.Na && h.push("nclt:", g.b.Na), g.b.Oa && h.push("nctt:", g.b.Oa));
                                g.$ && h.push("nclv:", g.$);
                                g.aa && h.push("ncldbg:", g.aa);
                                g.f ? h.push("swf:", g.f.h) : g.X && h.push("swf:", "-");
                                g.u && h.push("swfv:", (g.d ? g.d.h : "") + g.u);
                                k && (g.ba && h.push("ord:", g.ba), g.Z && h.push("amd:", g.Z, ";"), g.Wa && h.push("anid:", "1"), g.da && h.push("xbid:", g.da));
                                null !== g.ca && h.push("tp:" + g.ca);
                                null != g.Za && h.push("vl:" + g.Za);
                                g.va && h.push("ci:", "1");
                                d.splice(1, 0, "adk" + e[f].p + "=" + w(h.join(",")))
                            }
                    }
                    d.push("r=" + a);
                    f = je(c, !1);
                    d.push(f.join("&"));
                    0 == e.length && (d.push("correlator=" + $.getCorrelator()), d.push("oid=" + b));
                    2 == b && (b = d.join("&"), ve && (b += "&fp=" + w(ve)), Na(c, b));
                    c = Y;
                    for (b = 0; b < c.length; b++) d = c[b], Le(d, a), d.o && d.p && d.K && Le(d, a, !0)
                }
                Ud = !0
            }
        },
        Fe = !1,
        Ae = !1,
        xe = function() {
            var a = x().document;
            if (!a.body || !a.body.getBoundingClientRect || "function" != typeof Goog_AdSense_getAdAdapterInstance) return !1;
            $ = Goog_AdSense_getAdAdapterInstance();
            return !0
        },
        Ce = function(a, b) {
            if (a) {
                var c = ed(a);
                if ((c || a.kb) && !a.jb) {
                    var d = c ? "1" : "0";
                    a.kb = !1;
                    var e = $.getCorrelator(),
                        f = a.a,
                        g = ee;
                    nd(a, ["{vi:", d, ",cl:", e, ",adk:", a.p, ",rs:", a.c, ",pl:", f.left, ",pr:", f.right, ",pt:", f.top, ",pb:", f.bottom, ",vl:", b.left, ",vr:", b.right, ",vt:", b.top, ",vb:", b.bottom, ",dw:", g && g.width || 0, ",dh:", g && g.height || 0, "}"].join(""));
                    c && (a.jb = !0);
                    c && null != a.ka && null != a.ka.match(/\/pagead\/adview\?.*ai=.*&vt=\d+/i) && !a.ib && (d = a.ka, u.body ? (Oa || (e = u.createElement("iframe"), e.style.display = "none", e.id = "anonIframe", Oa = e, u.body.appendChild(e)), e = !0) : e = !1, e && Na(Oa.contentWindow, d), a.ib = !0)
                }
                c && a.K && !jd(a) &&
                    Le(a, "v", !0);
                2 == te && c && !jd(a) && Le(a, "v")
            }
        },
        De = function(a) {
            return (a = a.match(/[&\?](?:adk)=([0-9]+)/)) && 2 == a.length ? parseInt(a[1], 10) : 0
        },
        Be = function(a) {
            if (a.data) {
                var b;
                var c = a.data;
                if (p(c)) {
                    b = {};
                    for (var c = c.split("\n"), d = 0; d < c.length; d++) {
                        var e = c[d].indexOf("=");
                        if (!(0 >= e)) {
                            var f = Number(c[d].substr(0, e)),
                                e = c[d].substr(e + 1);
                            switch (f) {
                                case 5:
                                case 8:
                                case 11:
                                case 15:
                                case 16:
                                    e = "true" == e;
                                    break;
                                case 4:
                                case 7:
                                case 6:
                                case 14:
                                    e = Number(e);
                                    break;
                                case 3:
                                    if (fa(decodeURIComponent)) try {
                                        e = decodeURIComponent(e)
                                    } catch (g) {
                                        throw Error("Error: URI malformed: " +
                                            e);
                                    }
                            }
                            b[f] = e
                        }
                    }
                    b = b[0] ? b : null
                } else b = null; if (b && (c = b[0], "goog_provide_mode" == c || "goog_request_monitoring" == c)) {
                    i: {
                        d = new Cc(b[4], b[12]);
                        f = Y;
                        for (e = 0; e < f.length; ++e)
                            if (d.match(Sc(f[e]))) {
                                d = f[e];
                                break i
                            }
                        d = null
                    }
                    d && (f = b[6], e = d.la, d.la = 2 == f || 2 == e ? 2 : 3 == f || 3 == e ? 3 : 1 == f || 1 == e ? 1 : 0, d.Ha.push(a.source), d.D = b[16] ? !0 : !1, "goog_request_monitoring" == c && (a = d, b = Xd, c = {}, Dc(Sc(a), c), c[0] = "goog_acknowledge_monitoring", c[7] = a.l, c[9] = kd(a.S), c[8] = b, ld(a, c, a.Ha)), f && 0 != f && (Fe = !0), -1 == d.q && (d.q = V(), Id()))
                }
            }
        },
        Ge = function(a) {
            var b;
            if (b = a) b = Sc(a), b = !!b.r || !!b.m;
            if (b) {
                b = Xd;
                var c = {};
                Dc(Sc(a), c);
                c[0] = "goog_get_mode";
                c[7] = a.l;
                c[9] = kd(a.S);
                c[8] = b;
                ld(a, c)
            }
        },
        Ee = function(a) {
            if (!ve) {
                if (!a.ia) return;
                var b = me(Sb, a.ia);
                !b || "&" != b.charAt(0) && "?" != b.charAt(0) || (b = b.slice(1));
                ve = b
            }
            a.Da = ve
        },
        Me = function() {
            T(x(), "unload", function() {
                He("u")
            }, "osd::unload")
        },
        Ne = function() {
            $ || ($ = Goog_AdSense_getAdAdapterInstance());
            if ($ && 2 == $.getOseId()) {
                var a = Ua([1, 2], pa);
                a && (te = a)
            }
        },
        Le = function(a, b, c) {
            var d = c && (!a.o || a.K),
                e = !c && a.Ka && ed(a),
                f = e && a.D,
                g = !a.Ka && (!a.o ||
                    a.$a);
            if (a && a.p && (d || g || f)) {
                d = a.getStats();
                f = x();
                g = je(f, !1);
                if (a.o) {
                    var h;
                    h = c ? "osdim" : e ? "osdtos" : "osd2";
                    var k = "//pagead2.googlesyndication.com/activeview?id=" + h;
                    "osd2" == h && a.D && ed(a) && (k += "&ts=1");
                    Na(f, [k, "adk=" + a.p + "&" + d.join("&") + "&js=1", "r=" + b, g.join("&")].join("&"));
                    c && (a.K = !1)
                } else md(a, g, "goog_image_request", b);
                c || e || (a.Ka = !0);
                if (e || !c && a.D) a.D = !1
            }
        };
    aa("Goog_Osd_UnloadAdBlock", db("osd::unload_ex", function(a, b) {
        var c;
        if (a) {
            c = Y;
            for (var d = -1, e = 0; e < c.length; ++e)
                if (c[e].element == a) {
                    d = e;
                    break
                }
            c = 0 <= d ? Y.splice(d, 1)[0] : null
        } else c = null;
        d = x();
        c && (e = c, gd(e), hd(e, d), e.b && e.b.zb(), id(e, d));
        if (c && c.element.contentWindow && 3 == c.c) {
            e = c.getStats();
            e.unshift("adk=" + c.p);
            e.push("r=u");
            var f = je(d, !1);
            e.push(f.join("&"));
            if (b) Le(c, "u");
            else try {
                d.google_image_requests || (d.google_image_requests = []), c.element.contentWindow.osdsir(d, e.join("&"))
            } catch (g) {}
        }
    }));
    aa("Goog_Osd_UpdateElementToMeasure", db("osd::update_elem_ex", function(a, b) {
        if (a && b && ga(a) && 1 == a.nodeType && ga(b) && 1 == b.nodeType) {
            for (var c, d = Y, e = 0; e < d.length; ++e) d[e].element == a && (c = d[e]);
            c && (d = x(), c.B = b, gd(c), hd(c, d), c.b && c.b.zb(), id(c, d))
        }
    }));
    ab("osd::main", function() {
        Ne();
        fe = "osd";
        Me();
        Ra() ? Ke() : (ze(), T(x(), "load", function() {
            window.setTimeout(A("osd::main::hi_to", Ke), 100)
        }, "osd::main::onload"))
    });
})();