(function() {
    var m, q = this,
        r = function(a) {
            return void 0 !== a
        },
        aa = function() {},
        ba = function(a) {
            var b = typeof a;
            if ("object" == b)
                if (a) {
                    if (a instanceof Array) return "array";
                    if (a instanceof Object) return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c) return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" !=
                        typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
                } else return "null";
            else if ("function" == b && "undefined" == typeof a.call) return "object";
            return b
        },
        ca = function(a) {
            return "array" == ba(a)
        },
        da = function(a) {
            var b = ba(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        },
        s = function(a) {
            return "string" == typeof a
        },
        t = function(a) {
            return "number" == typeof a
        },
        ea = function(a) {
            return "function" == ba(a)
        },
        u = function(a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b
        },
        fa = "closure_uid_" +
        (1E9 * Math.random() >>> 0),
        ga = 0,
        ha = function(a, b, c) {
            return a.call.apply(a.bind, arguments)
        },
        ia = function(a, b, c) {
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
        x = function(a, b, c) {
            x = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ha : ia;
            return x.apply(null, arguments)
        },
        ja = Date.now || function() {
            return +new Date
        },
        y = function(a, b) {
            var c = a.split("."),
                d = q;
            c[0] in d || !d.execScript || d.execScript("var " + c[0]);
            for (var e; c.length && (e = c.shift());) !c.length && r(b) ? d[e] = b : d[e] ? d = d[e] : d = d[e] = {}
        },
        z = function(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.U = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.Ya = function(a, c, f) {
                return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2))
            }
        };
    var ka = document,
        la = window;
    var ma = function(a) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, ma);
        else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    };
    z(ma, Error);
    ma.prototype.name = "CustomError";
    var na;
    var oa = function(a) {
            return /^[\s\xa0]*$/.test(null == a ? "" : String(a))
        },
        pa = String.prototype.trim ? function(a) {
            return a.trim()
        } : function(a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        },
        xa = function(a) {
            if (!qa.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(ra, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(sa, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(ta, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(ua, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(va, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(wa, "&#0;"));
            return a
        },
        ra = /&/g,
        sa = /</g,
        ta = />/g,
        ua = /"/g,
        va = /'/g,
        wa = /\x00/g,
        qa = /[\x00&<>"']/,
        Aa = function(a) {
            return -1 != a.indexOf("&") ? "document" in q ? ya(a) : za(a) : a
        },
        ya = function(a) {
            var b = {
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": '"'
                },
                c;
            c = q.document.createElement("div");
            return a.replace(Ba, function(a, e) {
                var f = b[a];
                if (f) return f;
                if ("#" == e.charAt(0)) {
                    var g = Number("0" + e.substr(1));
                    isNaN(g) || (f = String.fromCharCode(g))
                }
                f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
                return b[a] = f
            })
        },
        za = function(a) {
            return a.replace(/&([^;]+);/g,
                function(a, c) {
                    switch (c) {
                        case "amp":
                            return "&";
                        case "lt":
                            return "<";
                        case "gt":
                            return ">";
                        case "quot":
                            return '"';
                        default:
                            if ("#" == c.charAt(0)) {
                                var d = Number("0" + c.substr(1));
                                if (!isNaN(d)) return String.fromCharCode(d)
                            }
                            return a
                    }
                })
        },
        Ba = /&([^;\s<&]+);?/g,
        Ca = {
            "\x00": "\\0",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\x0B",
            '"': '\\"',
            "\\": "\\\\"
        },
        Da = {
            "'": "\\'"
        },
        Ea = function(a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        },
        Fa = function(a) {
            return String(a).replace(/\-([a-z])/g, function(a, c) {
                return c.toUpperCase()
            })
        },
        Ga = function(a) {
            var b = s(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
            return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function(a, b, e) {
                return b + e.toUpperCase()
            })
        };
    var Ha = function(a) {
        Ha[" "](a);
        return a
    };
    Ha[" "] = aa;
    var Ia = function(a) {
            try {
                var b;
                if (b = !!a && null != a.location.href) t: {
                    try {
                        Ha(a.foo);
                        b = !0;
                        break t
                    } catch (c) {}
                    b = !1
                }
                return b
            } catch (d) {
                return !1
            }
        },
        A = function(a, b, c) {
            for (var d in a) Object.prototype.hasOwnProperty.call(a, d) && b.call(c, a[d], d, a)
        },
        Ja = function(a, b, c, d) {
            a.addEventListener ? a.addEventListener(b, c, d || !1) : a.attachEvent && a.attachEvent("on" + b, c)
        },
        Ka = function(a, b, c) {
            a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
        };
    var La = function(a) {
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
        Ma = function(a, b, c) {
            a.google_image_requests || (a.google_image_requests = []);
            var d = a.document.createElement("img");
            if (c) {
                var e = function() {
                    c();
                    Ka(d, "load", e);
                    Ka(d, "error",
                        e)
                };
                Ja(d, "load", e);
                Ja(d, "error", e)
            }
            d.src = b;
            a.google_image_requests.push(d)
        };
    var Na = function(a, b) {
        for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.call(null, a[c], c, a)
    };

    function B(a) {
        return "function" == typeof encodeURIComponent ? encodeURIComponent(a) : escape(a)
    }

    function Oa() {
        var a = Pa,
            b = document,
            c = b.createElement("script");
        c.type = "text/javascript";
        c.src = a;
        var d = b.getElementsByTagName("head")[0];
        if (d) try {
            window.setTimeout(function() {
                d.appendChild(c)
            }, 0)
        } catch (e) {}
    }

    function Qa(a, b) {
        Ra(a, "load", b)
    }
    var Ra = function(a, b, c) {
            Ja(a, b, c, void 0)
        },
        Ta = function() {
            var a = Sa();
            "google_onload_fired" in a || (a.google_onload_fired = !1, Qa(a, function() {
                a.google_onload_fired = !0
            }))
        };

    function Ua() {
        return "msie" in Va ? Va.msie : Va.msie = -1 != navigator.userAgent.toLowerCase().indexOf("msie")
    }
    var Va = {};

    function Wa() {
        if (navigator.plugins && navigator.mimeTypes.length) {
            var a = navigator.plugins["Shockwave Flash"];
            if (a && a.description) return a.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".")
        } else {
            if (navigator.userAgent && 0 <= navigator.userAgent.indexOf("Windows CE")) {
                for (var a = 3, b = 1; b;) try {
                    b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + (a + 1)), a++
                } catch (c) {
                    b = null
                }
                return a.toString()
            }
            if (Ua() && !window.opera) {
                b = null;
                try {
                    b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
                } catch (d) {
                    a = 0;
                    try {
                        b =
                            new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), a = 6, b.Za = "always"
                    } catch (e) {
                        if (6 == a) return a.toString()
                    }
                    try {
                        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                    } catch (f) {}
                }
                if (b) return a = b.GetVariable("$version").split(" ")[1], a.replace(/,/g, ".")
            }
        }
        return "0"
    }
    var Xa = function(a, b) {
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
                    return a[Math.floor(c * a.length)]
                }
            }
            return null
        },
        Ya = function(a) {
            var b = a.length;
            if (0 == b) return 0;
            for (var c = 305419896, d = 0; d < b; d++) c ^= (c << 5) + (c >> 2) + a.charCodeAt(d) & 4294967295;
            return 0 < c ? c : 4294967296 + c
        };
    var C = Array.prototype,
        Za = C.indexOf ? function(a, b, c) {
            return C.indexOf.call(a, b, c)
        } : function(a, b, c) {
            c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
            if (s(a)) return s(b) && 1 == b.length ? a.indexOf(b, c) : -1;
            for (; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        },
        $a = C.forEach ? function(a, b, c) {
            C.forEach.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = s(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
        },
        ab = C.filter ? function(a, b, c) {
            return C.filter.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = [], f = 0, g = s(a) ?
                a.split("") : a, h = 0; h < d; h++)
                if (h in g) {
                    var k = g[h];
                    b.call(c, k, h, a) && (e[f++] = k)
                }
            return e
        },
        bb = C.map ? function(a, b, c) {
            return C.map.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = Array(d), f = s(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
            return e
        },
        cb = C.some ? function(a, b, c) {
            return C.some.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = s(a) ? a.split("") : a, f = 0; f < d; f++)
                if (f in e && b.call(c, e[f], f, a)) return !0;
            return !1
        },
        db = C.every ? function(a, b, c) {
            return C.every.call(a, b, c)
        } : function(a, b, c) {
            for (var d =
                a.length, e = s(a) ? a.split("") : a, f = 0; f < d; f++)
                if (f in e && !b.call(c, e[f], f, a)) return !1;
            return !0
        },
        gb = function(a, b) {
            var c = eb(a, b, void 0);
            return 0 > c ? null : s(a) ? a.charAt(c) : a[c]
        },
        eb = function(a, b, c) {
            for (var d = a.length, e = s(a) ? a.split("") : a, f = 0; f < d; f++)
                if (f in e && b.call(c, e[f], f, a)) return f;
            return -1
        },
        hb = function(a, b) {
            var c = eb(a, b, void 0);
            0 <= c && C.splice.call(a, c, 1)
        },
        ib = function(a) {
            return C.concat.apply(C, arguments)
        },
        jb = function(a) {
            var b = a.length;
            if (0 < b) {
                for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
                return c
            }
            return []
        },
        kb = function(a, b) {
            for (var c = 1; c < arguments.length; c++) {
                var d = arguments[c],
                    e;
                if (ca(d) || (e = da(d)) && Object.prototype.hasOwnProperty.call(d, "callee")) a.push.apply(a, d);
                else if (e)
                    for (var f = a.length, g = d.length, h = 0; h < g; h++) a[f + h] = d[h];
                else a.push(d)
            }
        },
        lb = function(a, b, c) {
            return 2 >= arguments.length ? C.slice.call(a, b) : C.slice.call(a, b, c)
        },
        mb = function(a) {
            for (var b = {}, c = 0, d = 0; d < a.length;) {
                var e = a[d++],
                    f = u(e) ? "o" + (e[fa] || (e[fa] = ++ga)) : (typeof e).charAt(0) + e;
                Object.prototype.hasOwnProperty.call(b, f) || (b[f] = !0, a[c++] =
                    e)
            }
            a.length = c
        };
    var D = function(a, b) {
        this.x = r(a) ? a : 0;
        this.y = r(b) ? b : 0
    };
    D.prototype.clone = function() {
        return new D(this.x, this.y)
    };
    D.prototype.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    D.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    D.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    var nb = function(a, b) {
        this.width = a;
        this.height = b
    };
    m = nb.prototype;
    m.clone = function() {
        return new nb(this.width, this.height)
    };
    m.isEmpty = function() {
        return !(this.width * this.height)
    };
    m.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    m.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    m.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var ob = function(a, b) {
            for (var c in a) b.call(void 0, a[c], c, a)
        },
        pb = function(a, b) {
            for (var c in a)
                if (!b.call(void 0, a[c], c, a)) return !1;
            return !0
        },
        qb = function(a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = a[d];
            return b
        },
        rb = function(a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = d;
            return b
        },
        sb = function(a) {
            for (var b in a) return !1;
            return !0
        },
        tb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
        ub = function(a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d) a[c] =
                    d[c];
                for (var f = 0; f < tb.length; f++) c = tb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        };
    var vb;
    t: {
        var wb = q.navigator;
        if (wb) {
            var xb = wb.userAgent;
            if (xb) {
                vb = xb;
                break t
            }
        }
        vb = ""
    }
    var yb = function(a) {
        return -1 != vb.indexOf(a)
    };
    var zb, Ab = function() {
            return q.navigator || null
        },
        Bb = yb("Opera") || yb("OPR"),
        E = yb("Trident") || yb("MSIE"),
        Cb = yb("Gecko") && -1 == vb.toLowerCase().indexOf("webkit") && !(yb("Trident") || yb("MSIE")),
        Db = -1 != vb.toLowerCase().indexOf("webkit"),
        Eb = Ab();
    zb = -1 != (Eb && Eb.platform || "").indexOf("Mac");
    var Fb = !!Ab() && -1 != (Ab().appVersion || "").indexOf("X11"),
        Gb = function() {
            var a = q.document;
            return a ? a.documentMode : void 0
        },
        Hb = function() {
            var a = "",
                b;
            if (Bb && q.opera) return a = q.opera.version, ea(a) ? a() : a;
            Cb ? b = /rv\:([^\);]+)(\)|;)/ : E ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : Db && (b = /WebKit\/(\S+)/);
            b && (a = (a = b.exec(vb)) ? a[1] : "");
            return E && (b = Gb(), b > parseFloat(a)) ? String(b) : a
        }(),
        Ib = {},
        Jb = function(a) {
            var b;
            if (!(b = Ib[a])) {
                b = 0;
                for (var c = pa(String(Hb)).split("."), d = pa(String(a)).split("."), e = Math.max(c.length, d.length),
                    f = 0; 0 == b && f < e; f++) {
                    var g = c[f] || "",
                        h = d[f] || "",
                        k = RegExp("(\\d*)(\\D*)", "g"),
                        n = RegExp("(\\d*)(\\D*)", "g");
                    do {
                        var l = k.exec(g) || ["", "", ""],
                            p = n.exec(h) || ["", "", ""];
                        if (0 == l[0].length && 0 == p[0].length) break;
                        b = Ea(0 == l[1].length ? 0 : parseInt(l[1], 10), 0 == p[1].length ? 0 : parseInt(p[1], 10)) || Ea(0 == l[2].length, 0 == p[2].length) || Ea(l[2], p[2])
                    } while (0 == b)
                }
                b = Ib[a] = 0 <= b
            }
            return b
        },
        Lb = q.document,
        Mb = Lb && E ? Gb() || ("CSS1Compat" == Lb.compatMode ? parseInt(Hb, 10) : 5) : void 0;
    var Nb = !E || E && 9 <= Mb,
        Ob = !Cb && !E || E && E && 9 <= Mb || Cb && Jb("1.9.1");
    E && Jb("9");
    var Rb = function(a) {
            return a ? new Pb(Qb(a)) : na || (na = new Pb)
        },
        Sb = function(a) {
            var b = document;
            return s(a) ? b.getElementById(a) : a
        },
        Ub = function(a, b) {
            ob(b, function(b, d) {
                "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in Tb ? a.setAttribute(Tb[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
            })
        },
        Tb = {
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
        Vb = function(a) {
            a = a.document;
            a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
            return new nb(a.clientWidth, a.clientHeight)
        },
        Wb = function(a) {
            return Db || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement
        },
        Xb = function(a) {
            return a.parentWindow || a.defaultView
        },
        Zb = function(a, b, c) {
            function d(c) {
                c && b.appendChild(s(c) ? a.createTextNode(c) : c)
            }
            for (var e = 2; e < c.length; e++) {
                var f = c[e];
                !da(f) || u(f) && 0 < f.nodeType ? d(f) :
                    $a(Yb(f) ? jb(f) : f, d)
            }
        },
        $b = function(a) {
            for (var b; b = a.firstChild;) a.removeChild(b)
        },
        ac = function(a) {
            return Ob && void 0 != a.children ? a.children : ab(a.childNodes, function(a) {
                return 1 == a.nodeType
            })
        },
        Qb = function(a) {
            return 9 == a.nodeType ? a : a.ownerDocument || a.document
        },
        Yb = function(a) {
            if (a && "number" == typeof a.length) {
                if (u(a)) return "function" == typeof a.item || "string" == typeof a.item;
                if (ea(a)) return "function" == typeof a.item
            }
            return !1
        },
        Pb = function(a) {
            this.j = a || q.document || document
        };
    Pb.prototype.k = function(a, b, c) {
        var d = this.j,
            e = arguments,
            f = e[0],
            g = e[1];
        if (!Nb && g && (g.name || g.type)) {
            f = ["<", f];
            g.name && f.push(' name="', xa(g.name), '"');
            if (g.type) {
                f.push(' type="', xa(g.type), '"');
                var h = {};
                ub(h, g);
                delete h.type;
                g = h
            }
            f.push(">");
            f = f.join("")
        }
        f = d.createElement(f);
        g && (s(g) ? f.className = g : ca(g) ? f.className = g.join(" ") : Ub(f, g));
        2 < e.length && Zb(d, f, e);
        return f
    };
    var bc = function(a) {
        var b = a.j;
        a = Wb(b);
        b = Xb(b);
        return E && Jb("10") && b.pageYOffset != a.scrollTop ? new D(a.scrollLeft, a.scrollTop) : new D(b.pageXOffset || a.scrollLeft, b.pageYOffset || a.scrollTop)
    };
    Pb.prototype.appendChild = function(a, b) {
        a.appendChild(b)
    };
    Pb.prototype.contains = function(a, b) {
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition) return a == b || Boolean(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    };
    var cc = function(a, b, c, d, e) {
        this.slot = a;
        this.isEmpty = b;
        this.size = c;
        this.creativeId = d;
        this.lineItemId = e;
        this.serviceName = "publisher_ads"
    };
    var dc = function(a, b) {
        this.j = a;
        this.l = b;
        this.o = this.j.getName();
        this.r = this.j.getSlotId().getInstance();
        var c = this.o,
            d = c.split("/");
        this.w = "/" == c.charAt(0) && 2 <= d.length ? d[1] : "/" != c.charAt(0) && 1 <= d.length ? d[0] : "";
        this.t = "";
        this.v = 0;
        this.k = !1
    };
    dc.prototype.B = 0;
    dc.prototype.n = !1;
    var ec = function(a) {
        a.B = 0;
        a.n = !1;
        a.m = null;
        a.q = null;
        a.A = null;
        a.u = null
    };
    dc.prototype.getName = function() {
        return this.o
    };
    dc.prototype.getInstance = function() {
        return this.r
    };
    var F = function(a) {
            return a.o + "_" + a.r
        },
        G = function(a) {
            return a.j.getSlotId().getDomId()
        },
        H = function(a) {
            return "google_ads_iframe_" + F(a)
        };
    dc.prototype.toString = function() {
        var a = this.j.getSlotId().toString();
        return "[gam.gut.AdSlot: nwid=" + this.w + ", name=" + this.o + ", instance=" + this.r + ", iframeLoaded=" + this.n + ", tries=" + this.B + ", GUT slot id=" + a + "]"
    };
    var fc = function(a, b) {
            a.m || (a.m = (new Date).getTime());
            a.j.fetchStarted(b || "")
        },
        gc = function(a) {
            a.A || (a.A = (new Date).getTime());
            a.j.renderStarted()
        };
    dc.prototype.getSizes = function(a) {
        var b = a || window;
        a = null;
        b.top == b && (a = Vb(window), a = this.j.getSizes(a.width, a.height));
        null == a && (a = this.j.getSizes());
        for (var b = [], c = 0; c < a.length; ++c) b.push([a[c].getWidth(), a[c].getHeight()]);
        return b
    };
    var hc = function(a) {
            a = a.getSizes();
            for (var b = [], c = 0; c < a.length; ++c) b.push(a[c].join("x"));
            return b.join("|")
        },
        ic = function(a) {
            var b = [],
                c = a.j.getTargetingMap();
            A(c, function(a, c) {
                for (var d = [], h = 0; h < a.length; ++h) d.push(encodeURIComponent(a[h]));
                b.push(encodeURIComponent(c) + "=" + d.join(","))
            });
            if (ea(a.j.getCategoryExclusions) && (a = a.j.getCategoryExclusions(), 0 < a.length && !("excl_cat" in c))) {
                for (var c = [], d = 0; d < a.length; ++d) c.push(encodeURIComponent(a[d]));
                b.push(encodeURIComponent("excl_cat") + "=" + c.join(","))
            }
            return b.join("&")
        };
    m = dc.prototype;
    m.getContentUrl = function() {
        return this.j.getContentUrl()
    };
    m.setClickUrl = function(a) {
        this.j.setClickUrl(a)
    };
    m.getClickUrl = function() {
        return this.j.getClickUrl()
    };
    m.getOutOfPage = function() {
        return this.j.getOutOfPage()
    };
    m.getAudExtId = function() {
        return this.j.getAudExtId()
    };
    m.getCollapseEmptyDiv = function() {
        return this.j.getCollapseEmptyDiv()
    };
    m.getDivStartsCollapsed = function() {
        return this.j.getDivStartsCollapsed()
    };
    var jc = function(a, b) {
            var c = null,
                d = !0,
                e = null,
                f = null;
            u(b) && (d = b._empty_, d || (c = [b._width_, b._height_], 0 == b._is_afc_ && b._creative_ids_ && b._adgroup2_ids_ && (e = b._creative_ids_[0], f = b._adgroup2_ids_[0])));
            return new cc(a.j, d, c, e, f)
        },
        kc = function(a) {
            return new cc(a.j, !0, null, null, null)
        };
    var lc = {
            google_ad_channel: "channel",
            google_ad_host: "host",
            google_ad_host_channel: "h_ch",
            google_ad_host_tier_id: "ht_id",
            google_ad_section: "region",
            google_ad_type: "ad_type",
            google_adtest: "adtest",
            google_original_width: "orig_w",
            google_available_width: "avail_w",
            google_allow_expandable_ads: "ea",
            google_alternate_ad_url: "alternate_ad_url",
            google_alternate_color: "alt_color",
            google_bid: "bid",
            google_city: "gcs",
            google_color_bg: "color_bg",
            google_color_border: "color_border",
            google_color_line: "color_line",
            google_color_link: "color_link",
            google_color_text: "color_text",
            google_color_url: "color_url",
            google_contents: "contents",
            google_country: "gl",
            google_cpm: "cpm",
            google_cust_age: "cust_age",
            google_cust_ch: "cust_ch",
            google_cust_gender: "cust_gender",
            google_cust_id: "cust_id",
            google_cust_interests: "cust_interests",
            google_cust_job: "cust_job",
            google_cust_l: "cust_l",
            google_cust_lh: "cust_lh",
            google_cust_u_url: "cust_u_url",
            google_disable_video_autoplay: "disable_video_autoplay",
            google_ed: "ed",
            google_encoding: "oe",
            google_feedback: "feedback_link",
            google_flash_version: "flash",
            google_font_face: "f",
            google_font_size: "fs",
            google_hints: "hints",
            google_kw: "kw",
            google_kw_type: "kw_type",
            google_language: "hl",
            google_page_url: "url",
            google_pgb_reactive: "pra",
            google_region: "gr",
            google_reuse_colors: "reuse_colors",
            google_responsive_formats: "resp_fmts",
            google_safe: "adsafe",
            google_sc_id: "sc_id",
            google_tag_info: "gut",
            google_targeting: "targeting",
            google_ui_features: "ui",
            google_ui_version: "uiv",
            google_video_doc_id: "video_doc_id",
            google_video_product_type: "video_product_type"
        },
        mc = {
            google_ad_block: "ad_block",
            google_ad_client: "client",
            google_ad_format: "format",
            google_ad_output: "output",
            google_ad_callback: "callback",
            google_ad_height: "h",
            google_ad_override: "google_ad_override",
            google_ad_slot: "slotname",
            google_ad_unit_key: "adk",
            google_ad_unit_key_2: "adk2",
            google_ad_width: "w",
            google_analytics_url_parameters: "aup",
            google_captcha_token: "captok",
            google_content_recommendation_ui_type: "crui",
            google_ctr_threshold: "ctr_t",
            google_cust_criteria: "cust_params",
            google_image_size: "image_size",
            google_last_modified_time: "lmt",
            google_loeid: "loeid",
            google_max_num_ads: "num_ads",
            google_max_radlink_len: "max_radlink_len",
            google_mtl: "mtl",
            google_enable_content_recommendations: "ecr",
            google_num_radlinks: "num_radlinks",
            google_num_radlinks_per_unit: "num_radlinks_per_unit",
            google_only_ads_with_video: "only_ads_with_video",
            google_rl_dest_url: "rl_dest_url",
            google_rl_filtering: "rl_filtering",
            google_rl_mode: "rl_mode",
            google_rt: "rt",
            google_source_type: "src_type",
            google_sui: "sui",
            google_skip: "skip",
            google_tag_for_child_directed_treatment: "tfcd",
            google_tdsma: "tdsma",
            google_tfs: "tfs",
            google_tl: "tl"
        },
        nc = {
            google_lact: "lact",
            google_only_pyv_ads: "pyv",
            google_only_userchoice_ads: "uc",
            google_scs: "scs",
            google_with_pyv_ads: "withpyv",
            google_previous_watch: "p_w",
            google_previous_searches: "p_s",
            google_video_url_to_fetch: "durl",
            google_yt_pt: "yt_pt",
            google_yt_up: "yt_up"
        };
    var oc = !!window.google_async_iframe_id,
        pc = oc && window.parent || window,
        Sa = function() {
            if (oc && !Ia(pc)) {
                for (var a = "." + ka.domain; 2 < a.split(".").length && !Ia(pc);) ka.domain = a = a.substr(a.indexOf(".") + 1), pc = window.parent;
                Ia(pc) || (pc = window)
            }
            return pc
        };
    var qc = function(a) {
            this.k = [];
            this.j = {};
            for (var b = 0, c = arguments.length; b < c; ++b) this.j[arguments[b]] = ""
        },
        rc = function(a, b, c) {
            "" != b && (c ? a.j.hasOwnProperty(c) && (a.j[c] = b) : a.k.push(b))
        };
    qc.prototype.l = function(a) {
        return this.j.hasOwnProperty(a) ? this.j[a] : ""
    };
    qc.prototype.geil = qc.prototype.l;
    var sc = {},
        vc = function(a, b) {
            var c = tc,
                d, e = !0;
            try {
                d = b()
            } catch (f) {
                try {
                    var g = La(f),
                        h = "";
                    f.fileName && (h = f.fileName);
                    var k = -1;
                    f.lineNumber && (k = f.lineNumber);
                    e = c(a, g, h, k, void 0)
                } catch (n) {
                    try {
                        var l = La(n),
                            c = "";
                        n.fileName && (c = n.fileName);
                        g = -1;
                        n.lineNumber && (g = n.lineNumber);
                        tc("pAR", l, c, g, void 0, void 0)
                    } catch (p) {
                        uc({
                            context: "mRE",
                            msg: p.toString() + "\n" + (p.stack || "")
                        }, void 0)
                    }
                }
                if (!e) throw f;
            } finally {}
            return d
        },
        tc = function(a, b, c, d, e, f) {
            var g = {};
            if (e) try {
                e(g)
            } catch (h) {}
            g.context = a;
            g.msg = b.substring(0, 512);
            c && (g.file =
                c);
            0 < d && (g.line = d.toString());
            g.url = ka.URL.substring(0, 512);
            g.ref = ka.referrer.substring(0, 512);
            wc(g);
            uc(g, f);
            return !0
        },
        uc = function(a, b) {
            try {
                if (Math.random() < (b || .01)) {
                    var c = "/pagead/gen_204?id=jserror" + xc(a),
                        d = "http" + ("http:" == la.location.protocol ? "" : "s") + "://pagead2.googlesyndication.com" + c,
                        d = d.substring(0, 2E3);
                    Ma(la, d, void 0)
                }
            } catch (e) {}
        },
        wc = function(a) {
            var b = a || {};
            Na(sc, function(a, d) {
                b[d] = la[a]
            })
        },
        yc = function(a, b) {
            return function() {
                var c = arguments;
                return vc(a, function() {
                    return b.apply(void 0, c)
                })
            }
        },
        zc = function(a) {
            return yc("osd::util::rschange", a)
        },
        xc = function(a) {
            var b = "";
            Na(a, function(a, d) {
                if (0 === a || a) b += "&" + d + "=" + B(a)
            });
            return b
        };
    var Bc = function(a) {
            for (var b = window, c = 0, d = b, e = 0; b != b.parent;)
                if (b = b.parent, e++, Ia(b)) d = b, c = e;
                else if (a) break;
            return {
                Aa: d,
                k: c
            }
        },
        Cc = null;
    var Fc = function(a) {
            this.S = a;
            J(this, 3, null);
            J(this, 4, 0);
            J(this, 5, 0);
            J(this, 6, 0);
            J(this, 15, 0);
            J(this, 7, "C" == Sa().google_pstate_rc_expt ? (new Date).getTime() : Math.floor(Math.random() * Math.pow(2, 43)));
            J(this, 8, {});
            J(this, 9, {});
            J(this, 10, {});
            J(this, 11, []);
            J(this, 12, 0);
            a = Sa();
            if (Dc(a)) {
                var b;
                b = a.j || {};
                b = this.S[Ec(14)] = b;
                a.j = b
            } else J(this, 14, {})
        },
        Gc = {
            google_persistent_state: !0,
            google_persistent_state_async: !0
        },
        Hc = {},
        Dc = function(a) {
            return "E" == a.google_pstate_expt || "EU" == a.google_pstate_expt
        },
        Jc = function(a) {
            var b =
                Sa();
            if (Dc(b)) {
                var c;
                t: {
                    var d, e;
                    try {
                        var f = b.google_pstate;
                        if (d = Ic(f)) {
                            f.C = (f.C || 0) + 1;
                            c = f;
                            break t
                        }
                    } catch (g) {
                        e = La(g)
                    }
                    uc({
                        context: "ps::eg",
                        msg: e,
                        L: r(d) ? d ? 1 : 0 : 2,
                        url: b.location.href
                    }, 1);
                    c = b.google_pstate = new Fc({})
                }
                return c
            }
            a = a && Gc[a] ? a : oc ? "google_persistent_state_async" : "google_persistent_state";
            if (Hc[a]) return Hc[a];
            c = "google_persistent_state_async" == a ? {} : b;
            d = b[a];
            return Ic(d) ? Hc[a] = d : b[a] = Hc[a] = new Fc(c)
        },
        Ic = function(a) {
            return "object" == typeof a && "object" == typeof a.S
        },
        Ec = function(a) {
            switch (a) {
                case 3:
                    return "google_exp_persistent";
                case 4:
                    return "google_num_sdo_slots";
                case 5:
                    return "google_num_0ad_slots";
                case 6:
                    return "google_num_ad_slots";
                case 7:
                    return "google_correlator";
                case 8:
                    return "google_prev_ad_formats_by_region";
                case 9:
                    return "google_prev_ad_slotnames_by_region";
                case 10:
                    return "google_num_slots_by_channel";
                case 11:
                    return "google_viewed_host_channels";
                case 12:
                    return "google_num_slot_to_show";
                case 14:
                    return "gaGlobal";
                case 15:
                    return "google_num_reactive_ad_slots"
            }
            throw Error("unexpected state");
        },
        Kc = function(a) {
            var b = Ec(14);
            return a.S[b]
        },
        J = function(a, b, c) {
            a = a.S;
            b = Ec(b);
            void 0 === a[b] && (a[b] = c)
        };
    var Lc = function(a) {
            return function() {
                return a
            }
        },
        Mc = function(a) {
            var b = arguments,
                c = b.length;
            return function() {
                for (var a = 0; a < c; a++)
                    if (!b[a].apply(this, arguments)) return !1;
                return !0
            }
        },
        Nc = function() {
            return function() {
                return !oa.apply(this, arguments)
            }
        };
    var Oc = function(a, b, c, d, e) {
            var f = "";
            a && (f += a + ":");
            c && (f += "//", b && (f += b + "@"), f += c, d && (f += ":" + d));
            e && (f += e);
            return f
        },
        Pc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,
        Sc = function(a) {
            if (Qc) {
                Qc = !1;
                var b = q.location;
                if (b) {
                    var c = b.href;
                    if (c && (c = Rc(Sc(c)[3] || null)) && c != b.hostname) throw Qc = !0, Error();
                }
            }
            return a.match(Pc)
        },
        Qc = Db,
        Rc = function(a) {
            return a ? decodeURI(a) : a
        };

    function Tc(a, b, c, d) {
        c = c || a.google_ad_width;
        d = d || a.google_ad_height;
        if (a.top == a) return !1;
        var e = b.documentElement;
        if (c && d) {
            var f = 1,
                g = 1;
            a.innerHeight ? (f = a.innerWidth, g = a.innerHeight) : e && e.clientHeight ? (f = e.clientWidth, g = e.clientHeight) : b.body && (f = b.body.clientWidth, g = b.body.clientHeight);
            if (g > 2 * d || f > 2 * c) return !1
        }
        return !0
    };
    var Uc = function(a) {
            this.j = {};
            this.k = a
        },
        Vc = function(a, b, c, d) {
            b && (c || (c = ""), "google_gl" == b ? b = "google_country" : "google_region" == b && (b = "google_section"), b in a.k && ("undefined" == typeof d || d || !a.j[b]) && (a.j[b] = c))
        },
        Wc = function(a, b) {
            A(b.j, function(a, b) {
                this.j[b] || (this.j[b] = a)
            }, a)
        },
        Xc = function(a) {
            var b = new Uc(a.k);
            a = a.j;
            var c = {},
                d;
            for (d in a) c[d] = a[d];
            b.j = c;
            delete b.j.google_page_url;
            return b
        },
        Yc = function(a) {
            return a.j.google_page_url
        };
    Uc.prototype.F = function() {
        var a = [];
        A(this.j, function(b, c) {
            var d = lc[c] || mc[c] || nc[c] || null;
            d && b && a.push(d + "=" + B(b))
        });
        return a.join("&")
    };
    var $c = function(a, b, c, d) {
            var e = Zc(a, Xc(b), c, d);
            a = Zc(a, b, c, d);
            b = [];
            e[0] && 0 < e[0].length && b.push(e[0].join("&"));
            a[1] && 0 < a[1].length && b.push("sps=" + a[1].join("|"));
            return b.join("&")
        },
        Zc = function(a, b, c, d) {
            var e = [],
                f = [],
                g = b.j;
            A(d, function(b, d) {
                if (b) {
                    var n = "";
                    null != g[d] && (n = B(g[d]));
                    for (var l = [], p = -1, w = -1, I = 0; I < a.length; ++I) {
                        var v = F(a[I]);
                        ++p;
                        null == c[v] ? l.push("") : (v = c[v].j, null != v[d] ? (l.push(B(B(v[d]))), w = p) : l.push(""))
                    }
                    if (0 <= w) {
                        p = [];
                        p.push(B(n));
                        for (I = 0; I <= w; ++I) p.push(l[I]);
                        f.push(b + "," + p.join(","))
                    } else n &&
                        e.push(b + "=" + n)
                }
            });
            b = [];
            b.push(e);
            b.push(f);
            return b
        },
        ad = function() {
            var a = window,
                b;
            t: {
                b = a.navigator;
                var c = document,
                    d = b.userAgent,
                    e = b.platform;
                if (/Win|Mac|Linux|iPad|iPod|iPhone/.test(e) && !/^Opera/.test(d)) {
                    var f = (/WebKit\/(\d+)/.exec(d) || [0, 0])[1],
                        g = (/rv\:(\d+\.\d+)/.exec(d) || [0, 0])[1];
                    if (/Win/.test(e) && /Trident/.test(d) && 9 < c.documentMode || !f && "Gecko" == b.product && 1.7 < g && !/rv\:1\.8([^.]|\.0)/.test(d) || 524 < f) {
                        b = !0;
                        break t
                    }
                }
                b = !1
            }
            a = Tc(a, a.document, 500, 300);
            c = {};
            if (!b || a) c.ea = "0";
            return c
        },
        bd = function() {
            var a,
                b = window,
                c = document;
            var d = Bc(!1).Aa;
            a = d.location.href;
            if (d == d.top) a = !0;
            else {
                var e = !1,
                    f = d.document;
                f && f.referrer && (a = f.referrer, d.parent == d.top && (e = !0));
                (d = d.location.ancestorOrigins) && (d = d[d.length - 1]) && -1 == a.indexOf(d) && (e = !1);
                a = e
            }
            b = Tc(Sa(), c, b.google_ad_width, b.google_ad_height);
            c = a;
            a = Sa();
            a = a.top == a ? 0 : Ia(a.top) ? 1 : 2;
            e = 4;
            b || 1 != a ? b || 2 != a ? b && 1 == a ? e = 7 : b && 2 == a && (e = 8) : e = 6 : e = 5;
            c && (e |= 16);
            return "" + e || null
        };
    var cd = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    m = cd.prototype;
    m.getWidth = function() {
        return this.right - this.left
    };
    m.getHeight = function() {
        return this.bottom - this.top
    };
    m.clone = function() {
        return new cd(this.top, this.right, this.bottom, this.left)
    };
    m.contains = function(a) {
        return this && a ? a instanceof cd ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    m.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    m.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    m.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    var dd = function(a, b) {
            var c = b || la;
            a && c.top != c && (c = c.top);
            try {
                return c.document && !c.document.body ? new nb(-1, -1) : Vb(c || window)
            } catch (d) {
                return new nb(-12245933, -12245933)
            }
        },
        ed = function(a, b) {
            Ua() && !window.opera ? Ra(a, "readystatechange", zc(function() {
                "complete" == a.readyState && b(null)
            })) : Ra(a, "load", yc("osd::util::load", b))
        },
        fd = function() {
            var a = 0;
            !r(la.postMessage) && (a |= 1);
            return a
        };
    var K = function(a, b) {
            this.m = a;
            this.k = b && b.k ? b.k : [];
            this.q = b ? b.q : !1;
            this.l = b && b.l ? b.l : 0;
            this.o = b ? b.o : "";
            this.j = b && b.j ? b.j : [];
            this.n = null;
            this.r = !1;
            if (b) {
                var c;
                for (c = 0; c < this.k.length; ++c) this.k[c].push("true");
                for (c = 0; c < this.j.length; ++c) this.j[c].la = !0
            }
        },
        Pa = "",
        gd = 0,
        hd = 0,
        id = function(a, b) {
            var c = a.k,
                d = a.m.google_ad_request_done;
            d && (d = d.orig_callback || d, a.m.google_ad_request_done = function(a) {
                if (a && 0 < a.length) {
                    var f = 1 < a.length ? a[1].url : null,
                        g = a[0].log_info || null,
                        h = a[0].activeview_url || null,
                        k = a[0].activeview_js_enabled ||
                        null,
                        n = a[0].activeview_js_immediate_enabled || null;
                    c.push([b, Aa(a[0].url), f, g, null, h, k, n])
                }
                d(a)
            }, a.m.google_ad_request_done.orig_callback = d)
        },
        jd = function(a, b, c, d) {
            var e = a.k;
            if (0 < e.length)
                for (var f = b.document.getElementsByTagName("a"), g = 0; g < f.length; g++)
                    for (var h = 0; h < e.length; h++)
                        if (0 <= f[g].href.indexOf(e[h][1])) {
                            var k = f[g].parentNode;
                            if (e[h][2])
                                for (var n = k, l = 0; 4 > l; l++) {
                                    if (0 <= n.innerHTML.indexOf(e[h][2])) {
                                        k = n;
                                        break
                                    }
                                    n = n.parentNode
                                }
                            c(k, e[h][0], d || 0, !0, e[h][3], void 0, e[h][5], "true" == e[h][6], "true" == e[h][7],
                                "true" == e[h][8]);
                            e.splice(h, 1);
                            break
                        }
            if (g = 0 < e.length) Cc || (Cc = Bc(!0).Aa), g = b != Cc;
            if (g) try {
                jd(a, b.parent, c, d)
            } catch (p) {}
            for (g = 0; g < e.length; ++g) a = e[g], "true" == a[6] && kd("osd2", a[3]), "true" == a[7] && kd("osdim", a[3])
        },
        kd = function(a, b) {
            if (a && b) {
                var c = ["//"];
                c.push("pagead2.googlesyndication.com");
                c.push("/activeview");
                c.push("?id=" + a);
                c.push("&r=j");
                c.push("&avi=" + b);
                Ma(la, c.join(""), void 0)
            }
        };
    m = K.prototype;
    m.getNewBlocks = function(a, b) {
        b && jd(this, this.m, a, 1);
        for (var c = this.j.length, d = 0; d < c; d++) {
            var e = this.j[d];
            !e.m && e.j && (a(e.j, e.l, e.o, e.k, "", e.n, "", !1, !1, e.la), e.m = !0)
        }
        b && (this.n = a)
    };
    m.getRegisteredAdblockUrls = function() {
        for (var a = [], b = this.j.length, c = 0; c < b; c++) a.push(this.j[c].l);
        return a
    };
    m.setupOse = function(a) {
        if (this.getOseId()) return this.getOseId();
        var b = window.google_enable_ose,
            c;
        !0 === b ? c = 2 : !1 !== b && (c = Xa([0], hd), null == c && ((c = Xa([2], gd)) || (c = 3)));
        if (!c) return 0;
        this.l = c;
        this.o = String(a || 0);
        return this.getOseId()
    };
    m.getOseId = function() {
        return window ? this.l : -1
    };
    m.getCorrelator = function() {
        return this.o
    };
    m.numBlocks = function() {
        return this.k.length + this.j.length
    };
    m.registerAdBlock = function(a, b, c, d, e, f) {
        var g = null;
        e && f && (g = {
            width: e,
            height: f
        });
        if (this.n && d) this.n(d, a, b, !0, "", g, "", !1, !1, !1);
        else {
            if ("js" == c) id(this, a);
            else {
                var h = new ld(a, b, d, g);
                this.j.push(h);
                d && ed(d, function() {
                    h.k = !0
                })
            }
            this.q || (Ta(), Oa(), this.q = !0)
        }
    };
    m.setUpForcePeriscope = function() {
        window.google_enable_ose_periscope && (this.r = !0)
    };
    m.shouldForcePeriscope = function() {
        return this.r
    };
    var md = function() {
            var a = Sa(),
                b = a.__google_ad_urls;
            if (!b) return a.__google_ad_urls = new K(a);
            try {
                if (0 <= b.getOseId()) return b
            } catch (c) {}
            return a.__google_ad_urls = new K(a, b)
        },
        ld = function(a, b, c, d) {
            this.l = a;
            this.o = b;
            this.j = c;
            this.m = this.k = !1;
            this.n = d;
            this.la = !1
        };
    y("Goog_AdSense_getAdAdapterInstance", md);
    y("Goog_AdSense_OsdAdapter", K);
    y("Goog_AdSense_OsdAdapter.prototype.numBlocks", K.prototype.numBlocks);
    y("Goog_AdSense_OsdAdapter.prototype.getNewBlocks", K.prototype.getNewBlocks);
    y("Goog_AdSense_OsdAdapter.prototype.getOseId", K.prototype.getOseId);
    y("Goog_AdSense_OsdAdapter.prototype.getCorrelator", K.prototype.getCorrelator);
    y("Goog_AdSense_OsdAdapter.prototype.getRegisteredAdblockUrls", K.prototype.getRegisteredAdblockUrls);
    y("Goog_AdSense_OsdAdapter.prototype.setupOse", K.prototype.setupOse);
    y("Goog_AdSense_OsdAdapter.prototype.registerAdBlock", K.prototype.registerAdBlock);
    y("Goog_AdSense_OsdAdapter.prototype.setUpForcePeriscope", K.prototype.setUpForcePeriscope);
    y("Goog_AdSense_OsdAdapter.prototype.shouldForcePeriscope", K.prototype.shouldForcePeriscope);
    var L = q.googletag._vars_,
        nd = L[7],
        od = L[20],
        Pa = [L[6] ? "https" : "http", "://", L[1], "/pagead/osd.js"].join(""),
        gd = nd,
        hd = od;
    var pd = function(a) {
        this.l = (this.j = a && a.GA_jstiming) && this.j.load
    };
    pd.prototype.tick = function(a, b) {
        this.l.tick(a, b)
    };
    pd.prototype.k = function(a) {
        var b = {};
        b.e = a;
        this.j.report(this.l, b)
    };
    var qd = function() {};
    z(qd, pd);
    qd.prototype.tick = function() {};
    qd.prototype.k = function() {};
    var rd = function(a, b, c, d) {
        4 >= c && (b = b + "_" + c, d ? a.tick(b, d + "_" + c) : a.tick(b))
    };
    var sd = function() {
        return Db ? "Webkit" : Cb ? "Moz" : E ? "ms" : Bb ? "O" : null
    };
    var td = function(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    td.prototype.clone = function() {
        return new td(this.left, this.top, this.width, this.height)
    };
    var ud = function(a) {
        return new td(a.left, a.top, a.right - a.left, a.bottom - a.top)
    };
    td.prototype.contains = function(a) {
        return a instanceof td ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
    };
    td.prototype.ceil = function() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    td.prototype.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    td.prototype.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var wd = function(a, b, c) {
            if (s(b))(b = vd(a, b)) && (a.style[b] = c);
            else
                for (var d in b) {
                    c = a;
                    var e = b[d],
                        f = vd(c, d);
                    f && (c.style[f] = e)
                }
        },
        vd = function(a, b) {
            var c = Fa(b);
            if (void 0 === a.style[c]) {
                var d = sd() + Ga(c);
                if (void 0 !== a.style[d]) return d
            }
            return c
        },
        xd = function(a, b) {
            var c = Qb(a);
            return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : ""
        },
        yd = function(a, b) {
            return xd(a, b) || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
        },
        zd = function(a) {
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
            E && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
            return b
        },
        Ad = function(a) {
            if (E && !(E && 8 <= Mb)) return a.offsetParent;
            var b = Qb(a),
                c = yd(a, "position"),
                d = "fixed" == c || "absolute" == c;
            for (a = a.parentNode; a && a != b; a = a.parentNode)
                if (c = yd(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth ||
                    a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
            return null
        },
        Bd = function(a) {
            var b, c = Qb(a),
                d = yd(a, "position"),
                e = Cb && c.getBoxObjectFor && !a.getBoundingClientRect && "absolute" == d && (b = c.getBoxObjectFor(a)) && (0 > b.screenX || 0 > b.screenY),
                f = new D(0, 0),
                g;
            b = c ? Qb(c) : document;
            (g = !E || E && 9 <= Mb) || (g = "CSS1Compat" == Rb(b).j.compatMode);
            g = g ? b.documentElement : b.body;
            if (a == g) return f;
            if (a.getBoundingClientRect) b = zd(a), a = bc(Rb(c)), f.x = b.left + a.x, f.y = b.top + a.y;
            else if (c.getBoxObjectFor && !e) b =
                c.getBoxObjectFor(a), a = c.getBoxObjectFor(g), f.x = b.screenX - a.screenX, f.y = b.screenY - a.screenY;
            else {
                b = a;
                do {
                    f.x += b.offsetLeft;
                    f.y += b.offsetTop;
                    b != a && (f.x += b.clientLeft || 0, f.y += b.clientTop || 0);
                    if (Db && "fixed" == yd(b, "position")) {
                        f.x += c.body.scrollLeft;
                        f.y += c.body.scrollTop;
                        break
                    }
                    b = b.offsetParent
                } while (b && b != a);
                if (Bb || Db && "absolute" == d) f.y -= c.body.offsetTop;
                for (b = a;
                    (b = Ad(b)) && b != c.body && b != g;) f.x -= b.scrollLeft, Bb && "TR" == b.tagName || (f.y -= b.scrollTop)
            }
            return f
        },
        Cd = function(a, b) {
            "number" == typeof a && (a = (b ? Math.round(a) :
                a) + "px");
            return a
        },
        Dd = function(a) {
            var b = a.offsetWidth,
                c = a.offsetHeight,
                d = Db && !b && !c;
            return r(b) && !d || !a.getBoundingClientRect ? new nb(b, c) : (a = zd(a), new nb(a.right - a.left, a.bottom - a.top))
        },
        Ed = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
    var Fd = function(a, b) {
            var c = b[F(a)];
            return null != c ? Yc(c) : null
        },
        Gd = function(a, b, c) {
            if (null != Yc(b)) return !0;
            b = !1;
            for (var d = 0; d < a.length && !b; d++) b = null != Fd(a[d], c);
            return b
        },
        Hd = function(a) {
            var b = a;
            "about:blank" != a && (b = b.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/'/g, "%27"), /^https?:\/\//.test(b) || (b = "unknown:" + b));
            return b
        },
        Id = /\+/g,
        Jd = function() {
            var a = navigator.userAgent,
                b = a.indexOf("MSIE ");
            return -1 == b ? 0 : parseFloat(a.substring(b + 5, a.indexOf(";", b)))
        },
        Kd = function(a, b) {
            var c =
                0,
                d = [];
            a && (d.push(a.getName()), d.push(hc(a)), d.push(G(a)));
            if (b) {
                var e;
                e = [];
                for (var f = 0, g = b; g && 25 > f; g = g.parentNode, ++f) e.push(9 != g.nodeType && g.id || "");
                (e = e.join()) && d.push(e)
            }
            0 < d.length && (c = Ya(d.join(":")));
            return c.toString()
        },
        Ld = {
            cb: "visible",
            $a: "hidden",
            bb: "prerender",
            ab: "other"
        },
        Md = function(a) {
            a = a || document;
            a = a.webkitVisibilityState || a.mozVisibilityState || a.visibilityState || "visible";
            var b;
            t: {
                for (b in Ld)
                    if (Ld[b] == a) {
                        b = !0;
                        break t
                    }
                b = !1
            }
            return b ? a : "other"
        },
        Nd = function() {
            return Boolean(q.JSON && q.JSON.parse) &&
                (!E || Jb(9))
        };
    var Od = function() {
            this.j = {};
            var a = ka.URL;
            null == M(this, "target_platform") && (this.j.target_platform = "DESKTOP");
            for (var b = this.j, a = a.split("?"), a = a[a.length - 1].split("&"), c = 0; c < a.length; c++) {
                var d = a[c].split("=");
                if (d[0]) {
                    var e = d[0].toLowerCase();
                    if ("google_domain_reset_url" != e) try {
                        var f = b,
                            g;
                        if (1 < d.length) {
                            var h = d[1];
                            g = window.decodeURIComponent ? decodeURIComponent(h.replace(Id, " ")) : unescape(h)
                        } else g = "";
                        f[e] = g
                    } catch (k) {}
                }
            }
        },
        M = function(a, b) {
            return null == b ? null : a.j[b]
        };
    var Pd = function(a) {
            this.k = {};
            this.v = {};
            this.j = [];
            this.o = {};
            this.t = [];
            this.D = a;
            this.m = new Uc(a);
            this.n = {};
            this.r = {};
            this.q = {};
            this.l = {};
            this.B = this.u = "";
            this.w = null;
            this.A = -1
        },
        Qd = function(a, b, c) {
            b = new dc(b, c || !1);
            if (!b.getName()) return null;
            c = F(b);
            var d = a.k[c];
            if (d) return d;
            a.k[c] = b;
            a.v[b.getName()] || (a.v[b.getName()] = []);
            return a.v[b.getName()][b.getInstance()] = b
        },
        Sd = function(a) {
            return ab(Rd(a), function(a) {
                return !a.m
            })
        },
        Td = function(a, b) {
            -1 == eb(a.j, function(a) {
                return F(b) == F(a)
            }) && a.j.push(b)
        },
        Ud =
        function(a, b) {
            for (var c = 0; c < b.length; c++) {
                var d = b[c],
                    e = F(d);
                e in a.k && (ec(d), hb(a.j, function(a) {
                    return F(a) == e
                }))
            }
        },
        Vd = function(a) {
            a = ab(Rd(a), function(a) {
                return !!a.m && !(a.m && a.q)
            });
            return bb(a, function(a) {
                return [a.getName(), a.getInstance()]
            })
        },
        N = function(a, b) {
            a.u || (a.u = (new Date).getTime());
            a.j.renderEnded(b)
        },
        Wd = function(a) {
            var b = 0;
            A(a.k, function() {
                b++
            });
            return b
        };
    Pd.prototype.toString = function() {
        var a = "[AdData:",
            b = [];
        A(this.k, function(a) {
            b.push(a.toString())
        });
        A(this.o, function(a, d) {
            b.push("[" + d + "," + a + "]")
        });
        a += b.join();
        return a + "]"
    };
    var Xd = function(a, b) {
            if (b) {
                var c = b.getName(),
                    d = b.getSlotId().getInstance();
                return a.k[c + "_" + d] || null
            }
            return null
        },
        Rd = function(a) {
            var b = [];
            A(a.k, function(a) {
                b.push(a)
            });
            return b
        },
        Yd = function(a) {
            a = bb(Rd(a), function(a) {
                return a.w
            });
            mb(a);
            return a
        },
        Zd = function(a) {
            var b = [];
            A(a.o, function(a, d) {
                b.push(B(d) + "=" + B(a))
            });
            0 < a.t.length && !("excl_cat" in a.o) && b.push(B("excl_cat") + "=" + B(a.t.join(",")));
            return b.join("&")
        },
        $d = function(a, b) {
            var c = a.q[F(b)],
                d;
            if (c)
                if (c) try {
                    var e = window.top,
                        f = new D(0, 0),
                        g, h = Qb(c);
                    g =
                        h ? Xb(h) : window;
                    do {
                        var k;
                        if (g == e) k = Bd(c);
                        else {
                            var n = c,
                                h = void 0;
                            if (n.getBoundingClientRect) var l = zd(n),
                                h = new D(l.left, l.top);
                            else var p = bc(Rb(n)),
                                w = Bd(n),
                                h = new D(w.x - p.x, w.y - p.y);
                            var I;
                            if (Cb && !Jb(12)) {
                                var v;
                                var Kb, fb = void 0;
                                n: {
                                    var se = Fa("transform");
                                    if (void 0 === n.style[se]) {
                                        var Ig = sd() + Ga(se);
                                        if (void 0 !== n.style[Ig]) {
                                            fb = (Db ? "-webkit" : Cb ? "-moz" : E ? "-ms" : Bb ? "-o" : null) + "-transform";
                                            break n
                                        }
                                    }
                                    fb = "transform"
                                }
                                if (Kb = yd(n, fb) || yd(n, "transform")) {
                                    var Ac = Kb.match(Ed);
                                    v = Ac ? new D(parseFloat(Ac[1]), parseFloat(Ac[2])) :
                                        new D(0, 0)
                                } else v = new D(0, 0);
                                I = new D(h.x + v.x, h.y + v.y)
                            } else I = h;
                            k = I
                        }
                        h = k;
                        f.x += h.x;
                        f.y += h.y
                    } while (g && g != e && (c = g.frameElement) && (g = g.parent));
                    d = f
                } catch (Ah) {
                    d = new D(-12245933, -12245933)
                } else d = null;
                else d = null;
            return d
        };
    var ae = function() {
        this.q = "";
        this.u = "json_html";
        this.l = "fif";
        this.k = 1;
        this.w = !1;
        this.o = "";
        this.j = [];
        this.n = this.persistentRoadblocksOnly = !1;
        this.videoPodNumber = this.videoPodPosition = NaN;
        this.t = this.v = "";
        this.r = !1;
        this.videoStreamCorrelator = NaN;
        this.m = 0
    };
    var be = function(a) {
            a = String(a);
            if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) try {
                return eval("(" + a + ")")
            } catch (b) {}
            throw Error("Invalid JSON string: " + a);
        },
        O = function(a) {
            var b = [];
            ce(new de, a, b);
            return b.join("")
        },
        de = function() {},
        ce = function(a, b, c) {
            switch (typeof b) {
                case "string":
                    ee(b, c);
                    break;
                case "number":
                    c.push(isFinite(b) &&
                        !isNaN(b) ? b : "null");
                    break;
                case "boolean":
                    c.push(b);
                    break;
                case "undefined":
                    c.push("null");
                    break;
                case "object":
                    if (null == b) {
                        c.push("null");
                        break
                    }
                    if (ca(b)) {
                        var d = b.length;
                        c.push("[");
                        for (var e = "", f = 0; f < d; f++) c.push(e), ce(a, b[f], c), e = ",";
                        c.push("]");
                        break
                    }
                    c.push("{");
                    d = "";
                    for (e in b) Object.prototype.hasOwnProperty.call(b, e) && (f = b[e], "function" != typeof f && (c.push(d), ee(e, c), c.push(":"), ce(a, f, c), d = ","));
                    c.push("}");
                    break;
                case "function":
                    break;
                default:
                    throw Error("Unknown type: " + typeof b);
            }
        },
        fe = {
            '"': '\\"',
            "\\": "\\\\",
            "/": "\\/",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\u000b"
        },
        ge = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g,
        ee = function(a, b) {
            b.push('"', a.replace(ge, function(a) {
                if (a in fe) return fe[a];
                var b = a.charCodeAt(0),
                    e = "\\u";
                16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
                return fe[a] = e + b.toString(16)
            }), '"')
        };
    var he = function(a, b, c, d) {
        this.n = a;
        this.k = 1;
        this.m = b;
        this.q = c;
        this.w = d;
        this.o = Math.random();
        this.j = {};
        this.l = null;
        this.r = x(this.v, this)
    };
    he.prototype.v = function(a) {
        if (a.origin == this.q && a.source == this.m) {
            var b = null;
            try {
                b = be(a.data)
            } catch (c) {}
            if (u(b) && (a = b.i, b.c === this.n && a != this.o && (2 != this.k && (this.k = 2, ie(this), this.l && (this.l(), this.l = null)), a = b.s, b = b.p, s(a) && (s(b) || u(b)) && this.j.hasOwnProperty(a)))) this.j[a](b)
        }
    };
    var ie = function(a) {
        var b = {};
        b.c = a.n;
        b.i = a.o;
        a.m.postMessage(O(b), a.q)
    };
    he.prototype.t = function() {
        if (1 == this.k) {
            try {
                this.m.postMessage && ie(this)
            } catch (a) {}
            window.setTimeout(x(this.t, this), 50)
        }
    };
    he.prototype.send = function(a, b) {
        var c = {};
        c.c = this.n;
        c.i = this.o;
        c.s = a;
        c.p = b;
        this.m.postMessage(O(c), this.q)
    };
    he.prototype.close = function() {
        3 != this.k && (this.k = 3, Ka(window, "message", this.r))
    };
    Db && document.createElement("iframe");
    Cb || Db || E && Jb(11);
    var je = function(a) {
        this.k = a;
        this.n = null;
        this.r = this.m = 0;
        this.l = null;
        this.A = "sfchannel" + a
    };
    var ke = function(a, b, c, d, e, f) {
            this.l = a.clone();
            this.j = b.clone();
            this.m = c;
            this.k = d.clone();
            this.n = e;
            this.o = f
        },
        le = function(a) {
            return O({
                windowCoords_t: a.l.top,
                windowCoords_r: a.l.right,
                windowCoords_b: a.l.bottom,
                windowCoords_l: a.l.left,
                frameCoords_t: a.j.top,
                frameCoords_r: a.j.right,
                frameCoords_b: a.j.bottom,
                frameCoords_l: a.j.left,
                styleZIndex: a.m,
                allowedExpansion_t: a.k.top,
                allowedExpansion_r: a.k.right,
                allowedExpansion_b: a.k.bottom,
                allowedExpansion_l: a.k.left,
                xInView: a.n,
                yInView: a.o
            })
        },
        me = function(a) {
            var b =
                window.screenX || window.screenLeft || 0,
                c = window.screenY || window.screenTop || 0,
                b = new cd(c, (window.outerWidth || document.documentElement.clientWidth || 0) - b, (window.outerHeight || document.documentElement.clientHeight || 0) - c, b),
                c = Bd(a),
                d;
            if ("none" != yd(a, "display")) d = Dd(a);
            else {
                d = a.style;
                var e = d.display,
                    f = d.visibility,
                    g = d.position;
                d.visibility = "hidden";
                d.position = "absolute";
                d.display = "inline";
                var h = Dd(a);
                d.display = e;
                d.position = g;
                d.visibility = f;
                d = h
            }
            c = new td(c.x, c.y, d.width, d.height);
            d = new cd(c.top, c.left + c.width,
                c.top + c.height, c.left);
            for (var e = String(yd(a, "zIndex")), f = new cd(0, Infinity, Infinity, 0), g = Rb(a), k = g.j.body, n = g.j.documentElement, h = Wb(g.j); a = Ad(a);)
                if (!(E && 0 == a.clientWidth || Db && 0 == a.clientHeight && a == k) && a != k && a != n && "visible" != yd(a, "overflow")) {
                    var l = Bd(a),
                        p;
                    p = a;
                    if (Cb && !Jb("1.9")) {
                        var w = parseFloat(xd(p, "borderLeftWidth"));
                        if ("rtl" == yd(p, "direction")) var I = p.offsetWidth - p.clientWidth - w - parseFloat(xd(p, "borderRightWidth")),
                            w = w + I;
                        p = new D(w, parseFloat(xd(p, "borderTopWidth")))
                    } else p = new D(p.clientLeft,
                        p.clientTop);
                    l.x += p.x;
                    l.y += p.y;
                    f.top = Math.max(f.top, l.y);
                    f.right = Math.min(f.right, l.x + a.clientWidth);
                    f.bottom = Math.min(f.bottom, l.y + a.clientHeight);
                    f.left = Math.max(f.left, l.x)
                }
            a = h.scrollLeft;
            h = h.scrollTop;
            f.left = Math.max(f.left, a);
            f.top = Math.max(f.top, h);
            g = Vb(Xb(g.j) || window);
            f.right = Math.min(f.right, a + g.width);
            f.bottom = Math.min(f.bottom, h + g.height);
            a = 0 <= f.top && 0 <= f.left && f.bottom > f.top && f.right > f.left ? f : null;
            var v;
            if (null != a) t: {
                h = ud(a);
                v = Math.max(h.left, c.left);
                f = Math.min(h.left + h.width, c.left + c.width);
                if (v <= f && (g = Math.max(h.top, c.top), h = Math.min(h.top + h.height, c.top + c.height), g <= h)) {
                    v = new td(v, g, f - v, h - g);
                    break t
                }
                v = null
            }
            a = (f = (f = null != v && (0 != v.width || v.left + v.width != a.left && v.left != a.right)) && (0 != v.height || v.top + v.height != a.top && v.top != a.bottom)) ? new cd(Math.max(d.top - a.top, 0), Math.max(a.right - d.right, 0), Math.max(a.bottom - d.bottom, 0), Math.max(d.left - a.left, 0)) : new cd(0, 0, 0, 0);
            g = f = 0;
            v && !(new nb(v.width, v.height)).isEmpty() && (f = v.width / c.width, g = v.height / c.height);
            return new ke(b, d, e, a, f, g)
        };
    var ne = !1,
        oe = "",
        pe = function(a) {
            a = a.match(/[\d]+/g);
            if (!a) return "";
            a.length = 3;
            return a.join(".")
        };
    if (navigator.plugins && navigator.plugins.length) {
        var qe = navigator.plugins["Shockwave Flash"];
        qe && (ne = !0, qe.description && (oe = pe(qe.description)));
        navigator.plugins["Shockwave Flash 2.0"] && (ne = !0, oe = "2.0.0.11")
    } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
        var re = navigator.mimeTypes["application/x-shockwave-flash"];
        (ne = re && re.enabledPlugin) && (oe = pe(re.enabledPlugin.description))
    } else try {
        var te = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),
            ne = !0,
            oe = pe(te.GetVariable("$version"))
    } catch (ue) {
        try {
            te =
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), ne = !0, oe = "6.0.21"
        } catch (ve) {
            try {
                te = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), ne = !0, oe = pe(te.GetVariable("$version"))
            } catch (we) {}
        }
    }
    var xe = ne,
        ye = oe;
    var ze = function() {
        this.j = {
            shared: {
                sf_ver: "1-0-0",
                ck_on: navigator.cookieEnabled ? 1 : 0,
                flash_ver: xe ? ye : "0"
            }
        }
    };
    var Ae = function() {
        this.j = !0;
        this.k = !1
    };
    var Be = function(a, b, c) {
        var d = new Ae,
            e = new ze;
        this.n = a;
        this.j = b;
        this.k = c;
        this.m = d;
        this.l = e
    };
    var Ce = function(a) {
            this.j = a
        },
        De = function(a, b) {
            this.j = a;
            this.version = b
        };
    z(De, Ce);
    De.prototype.l = function() {
        return O({
            uid: this.j,
            version: this.version
        })
    };
    var Ee = function(a, b, c) {
        this.j = a;
        this.m = b;
        this.k = c
    };
    z(Ee, Ce);
    Ee.prototype.l = function() {
        return O({
            uid: this.j,
            initialWidth: this.m,
            initialHeight: this.k
        })
    };
    var Fe = function(a, b) {
        this.j = a;
        this.description = b
    };
    z(Fe, Ce);
    Fe.prototype.l = function() {
        return O({
            uid: this.j,
            description: this.description
        })
    };
    var Ge = function(a, b) {
        this.j = a;
        this.k = b
    };
    z(Ge, Ce);
    Ge.prototype.l = function() {
        return O({
            uid: this.j,
            expand_t: this.k.top,
            expand_r: this.k.right,
            expand_b: this.k.bottom,
            expand_l: this.k.left
        })
    };
    var He = function(a) {
        this.j = a
    };
    z(He, Ce);
    He.prototype.l = function() {
        return O({
            uid: this.j
        })
    };
    var Ie = function(a, b) {
        this.j = a;
        this.m = b
    };
    z(Ie, Ce);
    Ie.prototype.l = function() {
        var a = {
            uid: this.j,
            newGeometry: le(this.m)
        };
        return O(a)
    };
    var Je = function(a, b, c, d) {
        Ie.call(this, a, c);
        this.n = b;
        this.k = d
    };
    z(Je, Ie);
    Je.prototype.l = function() {
        var a = {
            uid: this.j,
            success: this.n,
            newGeometry: le(this.m),
            expand_t: this.k.top,
            expand_r: this.k.right,
            expand_b: this.k.bottom,
            expand_l: this.k.left
        };
        return O(a)
    };
    var Ke = function(a) {
        try {
            for (var b = null; b != a; b = a, a = a.parent) switch (a.location.protocol) {
                case "https:":
                    return !0;
                case "http:":
                case "file:":
                    return !1
            }
        } catch (c) {}
        return !0
    };
    var Ne = function(a) {
        je.call(this, Le++);
        this.q = a.Fa;
        this.v = a.Y;
        this.D = window.location.protocol + "//" + window.location.host;
        this.B = window.location.protocol + "//tpc.googlesyndication.com";
        this.w = Boolean(a.Da);
        var b = a.Y,
            c = a.size;
        b.style.width = Cd(c.width, !0);
        b.style.height = Cd(c.height, !0);
        this.n = this.t = me(a.Y);
        var b = a.Ea,
            d = a.content,
            c = a.size;
        a = Rb(this.v);
        var d = "1-0-0;" + d.length + ";" + d,
            e;
        e = new Be(this.k, this.D, this.t);
        var f = e.n,
            g = e.j,
            h = le(e.k),
            k;
        k = e.m;
        k = O({
            expandByOverlay: k.j,
            expandByPush: k.k,
            readCookie: !1,
            writeCookie: !1
        });
        e = {
            uid: f,
            hostPeerName: g,
            initialGeometry: h,
            permissions: k,
            metadata: O(e.l.j)
        };
        e = O(e);
        d = d + e;
        this.w && (e = Rb(this.v), Me || (f = e.k("script", {
            src: "//pagead2.googlesyndication.com/pagead/expansion_embed.js"
        }), e.j.getElementsByTagName("script")[0].parentElement.appendChild(f), Me = !0), e = Xb(e.j), e.google_eas_queue = e.google_eas_queue || [], e.google_eas_queue.push({
            a: b,
            b: e.location.protocol + "//tpc.googlesyndication.com",
            c: c.width,
            d: c.height,
            e: "sf-gdn-exp-" + this.k,
            f: void 0,
            g: void 0,
            h: void 0
        }));
        e = Xb(a.j);
        f = "//tpc.googlesyndication.com/safeframe/1-0-0/html/container.html";
        g = e;
        for (h = 0; g != g.parent;) h++, g = g.parent;
        (g = h) && (f += "?n=" + g);
        e = (Ke(e) ? "https:" : "http:") + f;
        this.w && (e += "#" + ["xpc=", "sf-gdn-exp-" + this.k, "&p=", encodeURIComponent(ka.location.protocol), "//", encodeURIComponent(ka.location.host)].join(""));
        b = {
            id: b,
            name: d,
            src: e,
            scrolling: "no",
            marginWidth: "0",
            marginHeight: "0",
            width: String(c.width),
            height: String(c.height),
            "data-is-safeframe": "true"
        };
        c = {
            frameborder: 0,
            style: "border:0;vertical-align:bottom;",
            allowTransparency: "true",
            src: E && !Jb(9) ? "javascript:\"<html><body style='background:transparent'></body></html>\"" : "about:blank"
        };
        b && ub(c, b);
        a = a.k("iframe", c);
        this.v.appendChild(a);
        this.j = a;
        this.u = x(this.Ia, this);
        this.o = 0;
        this.l = new he(this.A, this.j.contentWindow, this.B, !1);
        a = x(this.Ja, this);
        this.l.j.init_done = a;
        a = x(this.La, this);
        this.l.j.register_done = a;
        a = x(this.Ma, this);
        this.l.j.report_error = a;
        a = x(this.Ha, this);
        this.l.j.expand_request = a;
        a = x(this.Ga, this);
        this.l.j.collapse_request = a;
        a = this.l;
        if (b =
            x(this.Ka, this)) a.l = b;
        Ja(window, "message", a.r);
        a.w && a.t()
    };
    z(Ne, je);
    var Le = 1;
    m = Ne.prototype;
    m.Ka = function() {
        Ja(window, "resize", this.u);
        Ja(window, "scroll", this.u)
    };
    m.Ja = function(a) {
        try {
            if (0 != this.m) throw Error("Container already initialized");
            if (!s(a)) throw Error("Could not parse serialized message");
            var b, c = be(a);
            if (!(u(c) && t(c.uid) && s(c.version))) throw Error("Cannot parse JSON message");
            b = new De(c.uid, c.version);
            if (this.k != b.j || "1-0-0" != b.version) throw Error("Wrong source container");
            this.m = 1
        } catch (d) {
            this.q.error("Invalid INITIALIZE_DONE message. Reason: " + d.message)
        }
    };
    m.La = function(a) {
        try {
            if (1 != this.m) throw Error("Container not initialized");
            if (!s(a)) throw Error("Could not parse serialized message");
            var b = be(a);
            if (!(u(b) && t(b.uid) && t(b.initialWidth) && t(b.initialHeight))) throw Error("Cannot parse JSON message");
            if (this.k != (new Ee(b.uid, b.initialWidth, b.initialHeight)).j) throw Error("Wrong source container");
            this.m = 2
        } catch (c) {
            this.q.error("Invalid REGISTER_DONE message. Reason: " + c.message)
        }
    };
    m.Ma = function(a) {
        try {
            if (!s(a)) throw Error("Could not parse serialized message");
            var b, c = be(a);
            if (!(u(c) && t(c.uid) && s(c.description))) throw Error("Cannot parse JSON message");
            b = new Fe(c.uid, c.description);
            if (this.k != b.j) throw Error("Wrong source container");
            this.q.info("Ext reported an error. Description: " + b.description)
        } catch (d) {
            this.q.error("Invalid REPORT_ERROR message. Reason: " + d.message)
        }
    };
    m.Ha = function(a) {
        try {
            if (2 != this.m) throw Error("Container is not registered");
            if (0 != this.r) throw Error("Container is not collapsed");
            if (!s(a)) throw Error("Could not parse serialized message");
            var b, c = be(a);
            if (!(u(c) && t(c.uid) && t(c.expand_t) && t(c.expand_r) && t(c.expand_b) && t(c.expand_l))) throw Error("Cannot parse JSON message");
            b = new Ge(c.uid, new cd(c.expand_t, c.expand_r, c.expand_b, c.expand_l));
            if (this.k != b.j) throw Error("Wrong source container");
            if (!(0 <= b.k.top && 0 <= b.k.left && 0 <= b.k.bottom && 0 <= b.k.right)) throw Error("Invalid expansion amounts");
            var d = me(this.j),
                e = b.k;
            if (e.top <= d.k.top && e.right <= d.k.right && e.bottom <= d.k.bottom && e.left <= d.k.left) {
                var f = ud(new cd(d.j.top - b.k.top, d.j.right + b.k.right, d.j.bottom + b.k.bottom, d.j.left - b.k.left));
                wd(this.j, "zIndex", "10000");
                wd(this.j, "position", "absolute");
                var g = this.j,
                    h = f.left,
                    k = f.top,
                    n, l, p = Cb && (zb || Fb) && Jb("1.9");
                h instanceof D ? (n = h.x, l = h.y) : (n = h, l = k);
                g.style.left = Cd(n, p);
                g.style.top = Cd(l, p);
                this.j.style.width = Cd(f.width, !0);
                this.j.style.height = Cd(f.height, !0);
                this.r = 2;
                this.n = me(this.j);
                var w = new Je(this.k, !0, this.n, b.k)
            } else this.n = d, w = new Je(this.k, !1, this.n, b.k);
            this.l.send("expand_response", w.l())
        } catch (I) {
            this.q.error("Invalid EXPAND_REQUEST message. Reason: " + I.message)
        }
    };
    m.Ga = function(a) {
        try {
            if (2 != this.m) throw Error("Container is not registered");
            if (2 != this.r) throw Error("Container is not expanded");
            if (!s(a)) throw Error("Could not parse serialized message");
            var b = be(a);
            if (!u(b) || !t(b.uid)) throw Error("Cannot parse JSON message");
            if (this.k != (new He(b.uid)).j) throw Error("Wrong source container");
            var c = ud(this.t.j);
            wd(this.j, "zIndex", this.t.m);
            wd(this.j, "position", "static");
            this.j.style.width = Cd(c.width, !0);
            this.j.style.height = Cd(c.height, !0);
            this.r = 0;
            this.n = me(this.j);
            this.l.send("collapse_response", (new Ie(this.k, this.n)).l())
        } catch (d) {
            this.q.error("Invalid COLLAPSE_REQUEST message. Reason: " + d.message)
        }
    };
    m.Ia = function() {
        if (1 == this.m || 2 == this.m) switch (this.o) {
            case 0:
                Oe(this);
                setTimeout(x(this.Ba, this), 1E3);
                this.o = 1;
                break;
            case 1:
                this.o = 2;
                break;
            case 2:
                this.o = 2
        }
    };
    m.Ba = function() {
        if (1 == this.m || 2 == this.m) switch (this.o) {
            case 1:
                this.o = 0;
                break;
            case 2:
                Oe(this), setTimeout(x(this.Ba, this), 1E3), this.o = 1
        }
    };
    var Oe = function(a) {
            a.n = me(a.j);
            a.l.send("geometry_update", (new Ie(a.k, a.n)).l())
        },
        Me = !1;
    var Re = function(a) {
            this.m = document;
            this.j = a || 0;
            this.l = Pe(this, "__gads=");
            this.n = this.o = !1;
            Qe(this)
        },
        Se = function(a, b) {
            if (b._cookies_.length && (a.k = b._cookies_[0], null != a.k && (a.l = a.k._value_, null != a.k && a.l))) {
                var c = new Date;
                c.setTime(1E3 * a.k._expires_);
                a.m.cookie = "__gads=" + a.l + "; expires=" + c.toGMTString() + "; path=" + a.k._path_ + "; domain=." + a.k._domain_
            }
        },
        Qe = function(a) {
            if (!a.l && !a.n && 1 != a.j) {
                a.m.cookie = "GoogleAdServingTest=Good";
                var b = "Good" == Pe(a, "GoogleAdServingTest=");
                if (b) {
                    var c = new Date;
                    c.setTime((new Date).valueOf() +
                        -1);
                    a.m.cookie = "GoogleAdServingTest=; expires=" + c.toGMTString()
                }
                a.o = b;
                a.n = !0
            }
        },
        Pe = function(a, b) {
            var c = a.m.cookie,
                d = c.indexOf(b),
                e = ""; - 1 != d && (d += b.length, e = c.indexOf(";", d), -1 == e && (e = c.length), e = c.substring(d, e));
            return e
        },
        Te = null,
        Ue = function(a) {
            null == Te && (Te = new Re(a));
            return Te
        };
    var Ve = new qc,
        We = [],
        Ye = function(a, b, c) {
            c = c || [];
            a = new Xe(a);
            if (Mc.apply(a, c)()) {
                var d = qb(a.j);
                c = a.k;
                var e = a.l;
                (e ? c.j.hasOwnProperty(e) && "" == c.j[e] : 1) && (b = Xa(d, b * d.length)) && rc(c, b, e)
            }
            We.push(a);
            return a
        },
        Ze = function() {
            return ib(Ve.k, ab(qb(Ve.j), Nc()))
        },
        Xe = function(a) {
            this.j = a;
            this.k = Ve;
            this.l = "exp" + (this[fa] || (this[fa] = ++ga));
            this.k.j[this.l] = ""
        },
        P = function(a, b) {
            return b in a.j ? a.j[b] == a.k.l(a.l) : !1
        },
        $e = function(a) {
            for (var b = 0; b < We.length; ++b) {
                var c = We[b],
                    d = c.j,
                    e = {},
                    f = void 0;
                for (f in d) e[d[f]] = f;
                d =
                    e[a];
                if (null != d) {
                    d in c.j && rc(c.k, c.j[d], c.l);
                    return
                }
            }
            0 <= Za(Ve.k, a) || rc(Ve, a)
        },
        af = L[18],
        bf;
    bf = 0 <= Za(["prerender"], Md(void 0));
    Ye({
        control: "108809009",
        experiment: "108809010"
    }, af, [Lc(bf)]);
    var cf = Ye({
            control: "108809017",
            experiment_all_have_queuing_time: "108809018",
            experiment_sra_zero_queuing_time: "108809019",
            experiment_smallest_change_to_fix_in_fifae: "108809023",
            experiment_fix_out_of_order_fifae: "108809024",
            experiment_fetch_on_slot_with_div_in_fifae: "108809025"
        }, L[19]),
        df = Ye({
            control: "108809021",
            experiment: "108809022"
        }, L[25], [Lc(Nd())]),
        ef = Ye({
            control: "108809026",
            experiment: "108809027"
        }, L[26]);
    Ye({
        branch_1: "108809028",
        branch_2: "108809029"
    }, L[27]);
    var ff = Ye({
            control: "108809030",
            experiment: "108809031"
        }, L[28]),
        gf = Ye({
            control: "108809032",
            experiment: "108809033"
        }, L[30]),
        hf = Ye({
            control: "108809034",
            experiment: "108809035"
        }, L[31]);
    var jf = function(a, b, c, d, e) {
        this.j = b;
        this.q = c;
        this.l = d;
        this.n = a;
        this.k = e;
        this.m = "";
        this.u = lc;
        this.o = [];
        this.w = []
    };
    jf.prototype.F = function(a, b) {
        if (!ca(a)) return "";
        if ("sra" == this.n) 0 == a.length && (a = Rd(this.j));
        else {
            if (0 == a.length) return "";
            1 < a.length && (a = [a[0]])
        }
        this.t();
        this.v(a);
        return b ? kf(this.m, 2048) : this.m
    };
    jf.prototype.v = function(a) {
        try {
            var b, c = "",
                d = 0;
            "prerender" == Md(document) ? (c = "108809008", d = L[17]) : (c = "108809007", d = L[16]);
            b = Xa([c], d);
            Q(this, "eid", (b ? ib(this.k.j, b) : this.k.j).join())
        } catch (e) {}
        this.l && 0 !== this.l.j && Q(this, "co", this.l.j);
        b = this.j.A; - 1 !== b && Q(this, "tfcd", b);
        Boolean(window.postMessage) && Q(this, "sfv", "1-0-0");
        if ("sra" == this.n) {
            b = a.length;
            for (c = 0; c < b; c++) {
                var d = a[c].getName(),
                    f = "";
                if ("" != d) {
                    for (var f = d = d.split("/"), g = 0; g < f.length; g++)
                        if ("" != f[g]) {
                            for (var h = !1, k = 0; k < this.o.length; k++)
                                if (f[g] ==
                                    this.o[k]) {
                                    h = !0;
                                    break
                                }
                            h || this.o.push(f[g])
                        }
                    f = "";
                    for (g = 0; g < d.length; g++) {
                        if (0 < g) f += "/";
                        else if ("" == d[0]) continue;
                        for (h = 0; h < this.o.length; h++)
                            if (d[g] == this.o[h]) {
                                f += h;
                                break
                            }
                    }
                }
                this.w.push(f)
            }
            Q(this, "iu_parts", this.o.join());
            Q(this, "enc_prev_ius", this.w.join());
            b = [];
            for (c = 0; c < a.length; ++c) b.push(hc(a[c]));
            Q(this, "prev_iu_szs", b.join());
            if (a.length) {
                b = "";
                for (c = 0; c < a.length; ++c) b += a[c].getOutOfPage() ? "1" : "0";
                b = parseInt(b, 2)
            } else b = 0;
            b && Q(this, "ists", b);
            lf(this);
            c = null;
            b = [];
            for (c = 0; c < a.length; ++c) b.push(ic(a[c]));
            c = b.join("|");
            c.length == b.length - 1 && (c = null);
            Q(this, "prev_scp", c)
        } else b = a[0].j.gtfcd(), -1 !== b && Q(this, "tfcd", b), b = a[0], Q(this, "iu", b.getName()), Q(this, "sz", hc(b)), b.getClickUrl() && Q(this, "click", b.getClickUrl()), b.getOutOfPage() && Q(this, "ists", "1"), b in this.j.l && Q(this, "logonly", "1"), lf(this), b = a[0], c = ic(b), Q(this, "scp", c), b = b.getAudExtId(), 0 < b && Q(this, "audextid", b);
        b = a[0].l;
        c = Gd(a, this.j.m, this.j.n);
        d = this.k.w;
        f = 3 == this.k.k;
        g = 0;
        1 != this.k.k && (g |= 1);
        b && (g |= 2);
        c && (g |= 4);
        d && (g |= 8);
        f && (g |= 16);
        b = g;
        0 <
            b && Q(this, "eri", b);
        "prerender" == Md() && Q(this, "d_imp", 1);
        b = window;
        c = document;
        Q(this, "cust_params", Zd(this.j));
        this.l && 1 != this.l.j && (Q(this, "cookie", this.l.l), this.l.o && Q(this, "cookie_enabled", "1"));
        (d = this.j.u) && Q(this, "uule", d);
        this.l && 1 != this.l.j && (b = (Yc(this.j.m) || (b.top == b ? c.URL : c.referrer)) != c.URL ? c.domain : "") && Q(this, "cdm", b);
        null != M(this.q, "google_preview") && Q(this, "gct", M(this.q, "google_preview"));
        this.r(new Date, a);
        b = {};
        b.u_tz = -(new Date).getTimezoneOffset();
        var n;
        c = window;
        try {
            n = c.history.length
        } catch (l) {
            n =
                0
        }
        b.u_his = n;
        b.u_java = navigator.javaEnabled();
        window.screen && (b.u_h = window.screen.height, b.u_w = window.screen.width, b.u_ah = window.screen.availHeight, b.u_aw = window.screen.availWidth, b.u_cd = window.screen.colorDepth);
        navigator.plugins && (b.u_nplug = navigator.plugins.length);
        navigator.mimeTypes && (b.u_nmime = navigator.mimeTypes.length);
        mf(this, b);
        q.devicePixelRatio && R(this, "u_sd", Number(q.devicePixelRatio.toFixed(3)));
        var p;
        try {
            p = Wa()
        } catch (w) {
            p = "0"
        }
        R(this, "flash", p);
        n = window;
        p = document;
        b = "sra" == this.n ? Yc(this.j.m) :
            Fd(a[0], this.j.n) || Yc(this.j.m);
        null == b && (b = Yc(this.j.m) || (n.top == n ? p.URL : p.referrer), null != M(this.q, "google_preview") && (c = b.indexOf("google_preview=", b.lastIndexOf("?")), d = b.indexOf("&", c), -1 == d && (d = b.length - 1, c -= 1), b = b.substring(0, c) + b.substring(d + 1, b.length)));
        Q(this, "url", b);
        Gd(a, this.j.m, this.j.n) && n.top != n || Q(this, "ref", p.referrer);
        a = q.googletag;
        null != a && null != a.getVersion && Q(this, "vrg", a.getVersion());
        Q(this, "vrp", "49")
    };
    var nf = function(a, b) {
            for (var c = b.length, d = [], e = 0; e < c; e++) {
                var f = Kd(b[e]);
                b[e].t = f;
                d.push(f)
            }
            Q(a, "adks", d.join(","))
        },
        mf = function(a, b) {
            A(b, function(a, b) {
                R(this, b, a)
            }, a)
        },
        lf = function(a) {
            a.l && 1 == a.l.j || Q(a, "ppid", a.j.B)
        };
    jf.prototype.r = function(a, b) {
        Q(this, "lmt", (Date.parse(document.lastModified) / 1E3).toString());
        R(this, "dt", a.getTime());
        if (document.body) {
            var c = document.body.scrollHeight,
                d = document.body.clientHeight;
            d && c && Q(this, "cc", Math.round(100 * d / c).toString())
        }
        c = M(this.q, "deb");
        null != c && Q(this, "deb", c);
        c = M(this.q, "haonly");
        null != c && Q(this, "haonly", c);
        c = ad();
        Na(c, x(function(a, b) {
            Q(this, b, a)
        }, this));
        c = bd();
        null != c && Q(this, "frm", c);
        if (c = dd(!0)) Q(this, "biw", c.width), Q(this, "bih", c.height);
        this.k.m && Q(this, "oid",
            this.k.m);
        if ("sra" == this.n) nf(this, b);
        else {
            if (c = $d(this.j, b[0])) Q(this, "adx", Math.round(c.x)), Q(this, "ady", Math.round(c.y));
            c = b[0].t || Kd(b[0], this.j.r[F(b[0])]);
            Q(this, "adk", c)
        }
        c = fd();
        0 < c && Q(this, "osd", c);
        c = this.j.m;
        d = "";
        "sra" == this.n ? d = $c(b, c, this.j.n, this.u) : (d = this.j.n[F(b[0])], null == d ? d = c : Wc(d, c), d = Xc(d), d = d.F());
        d && (this.m += "&" + d)
    };
    jf.prototype.t = function() {
        var a = L[6];
        this.m = (Boolean(this.j.u) || P(ff, "experiment") || a ? "https://" + L[3] : "http://" + L[2]) + "/gampad/ads?";
        R(this, "gdfp_req", 1);
        Q(this, "correlator", this.k.q);
        R(this, "output", this.k.u);
        R(this, "callback", this.k.o);
        R(this, "impl", this.k.l);
        this.k.persistentRoadblocksOnly && Q(this, "per_only", 1);
        "sra" == this.n ? Q(this, "json_a", 1) : this.k.n && Q(this, "fif_to", 1)
    };
    var Q = function(a, b, c) {
            null != c && R(a, b, B("" + c))
        },
        R = function(a, b, c) {
            null != c && "" != c && (a.m = "?" != a.m.charAt(a.m.length - 1) ? a.m + ("&" + b + "=" + c) : a.m + (b + "=" + c))
        },
        kf = function(a, b) {
            var c = b - 8;
            if (a.length > b) {
                var d = a.lastIndexOf("&", c); - 1 != d ? a = a.substring(0, d) : (a = a.substring(0, c), a = a.replace(/%\w?$/, ""));
                a += "&trunc=1"
            }
            return a
        };
    var of = navigator;

    function pf(a) {
        var b = 1,
            c = 0,
            d;
        if (void 0 != a && "" != a)
            for (b = 0, d = a.length - 1; 0 <= d; d--) c = a.charCodeAt(d), b = (b << 6 & 268435455) + c + (c << 14), c = b & 266338304, b = 0 != c ? b ^ c >> 21 : b;
        return b
    }

    function qf(a, b) {
        if (!a || "none" == a) return 1;
        a = String(a);
        "auto" == a && (a = b, "www." == a.substring(0, 4) && (a = a.substring(4, a.length)));
        return pf(a.toLowerCase())
    }
    var rf = /^\s*_ga=\s*1\.(\d+)[^.]*\.(.*?)\s*$/,
        sf = /^[^=]+=\s*GA1\.(\d+)[^.]*\.(.*?)\s*$/;
    var tf = function(a, b, c, d, e) {
        jf.call(this, a, b, c, d, e)
    };
    z(tf, jf);
    tf.prototype.r = function(a, b) {
        0 < navigator.userAgent.indexOf("MSIE ") && Vc(this.j.m, "google_encoding", document.charset, !1);
        jf.prototype.r.call(this, a, b);
        Q(this, "ifi", b[0].v);
        var c;
        var d = window;
        d == d.top ? c = 0 : (c = [], c.push(d.document.URL), d.name && c.push(d.name), d = dd(!1, d), c.push(d.width.toString()), c.push(d.height.toString()), c = Ya(c.join("")));
        0 != c && Q(this, "ifk", c.toString())
    };
    tf.prototype.v = function(a) {
        var b = a[0],
            c = window;
        c.google_unique_id ? ++c.google_unique_id : c.google_unique_id = 1;
        b.v = c.google_unique_id;
        this.k.r && (R(this, "hxva", 1), Q(this, "cmsid", this.k.t), Q(this, "vid", this.k.v));
        isNaN(this.k.videoPodNumber) || R(this, "pod", this.k.videoPodNumber);
        isNaN(this.k.videoPodPosition) || R(this, "ppos", this.k.videoPodPosition);
        isNaN(this.k.videoStreamCorrelator) || R(this, "scor", this.k.videoStreamCorrelator);
        jf.prototype.v.call(this, a);
        a = window;
        var b = a.document.domain,
            c = a.document.cookie,
            d = a.history.length,
            e = a.screen,
            f = a.document.referrer,
            g = Math.round((new Date).getTime() / 1E3),
            h = window.google_analytics_domain_name,
            b = "undefined" == typeof h ? qf("auto", b) : qf(h, b),
            k = -1 < c.indexOf("__utma=" + b + "."),
            n = -1 < c.indexOf("__utmb=" + b),
            h = Jc("google_persistent_state"),
            l;
        (l = Kc(h)) || (l = h.S[Ec(14)] = {});
        h = l;
        l = !1;
        if (k) f = c.split("__utma=" + b + ".")[1].split(";")[0].split("."), n ? h.R = f[3] + "" : h.R || (h.R = g + ""), h.vid = f[0] + "." + f[1], h.ya = !0;
        else {
            h.R || (h.R = g + "");
            if (!h.vid) {
                l = !0;
                n = Math.round(2147483647 * Math.random());
                k = [of.appName, of.version, of.language ? of.language : of.browserLanguage, of.platform, of.userAgent, of.javaEnabled() ? 1 : 0].join("");
                e ? k += e.width + "x" + e.height + e.colorDepth : window.java && (e = java.awt.Toolkit.getDefaultToolkit().getScreenSize(), k += e.screen.width + "x" + e.screen.height);
                k = k + c + (f || "");
                for (f = k.length; 0 < d;) k += d-- ^ f++;
                h.vid = (n ^ pf(k) & 2147483647) + "." + g
            }
            h.ya = !1
        } if (!h.Ta) {
            var p;
            t: {
                g = 999;
                if (f = window.google_analytics_domain_name) f = 0 == f.indexOf(".") ? f.substr(1) : f, g = ("" + f).split(".").length;
                f = 999;
                c = c.split(";");
                for (e = 0; e < c.length; e++)
                    if (d = rf.exec(c[e]) || sf.exec(c[e])) {
                        if (d[1] == g) {
                            p = d[2];
                            break t
                        }
                        d[1] < f && (f = d[1], p = d[2])
                    }
            }
            l && p && -1 != p.search(/^\d+\.\d+$/) ? h.vid = p : p != h.vid && (h.Ta = p)
        }
        h.Xa = b;
        h.za || (h.za = Math.round(2147483647 * Math.random()));
        p = Jc();
        p = Kc(p);
        R(this, "ga_vid", p.vid);
        R(this, "ga_sid", p.R);
        R(this, "ga_hid", p.za);
        R(this, "ga_fc", p.ya);
        Q(this, "ga_wpids", a.google_analytics_uacct)
    };
    var uf = function() {};
    var vf, wf = function() {};
    z(wf, uf);
    wf.prototype.j = function() {
        var a;
        t: {
            if (!this.k && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
                for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                    var d = b[c];
                    try {
                        new ActiveXObject(d);
                        a = this.k = d;
                        break t
                    } catch (e) {}
                }
                throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
            }
            a = this.k
        }
        return a ? new ActiveXObject(a) : new XMLHttpRequest
    };
    vf = new wf;
    var xf = function(a) {
            q.setTimeout(function() {
                throw a;
            }, 0)
        },
        yf, zf = function() {
            var a = q.MessageChannel;
            "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && (a = function() {
                var a = document.createElement("iframe");
                a.style.display = "none";
                a.src = "";
                document.documentElement.appendChild(a);
                var b = a.contentWindow,
                    a = b.document;
                a.open();
                a.write("");
                a.close();
                var c = "callImmediate" + Math.random(),
                    d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
                    a = x(function(a) {
                        if (a.origin ==
                            d || a.data == c) this.port1.onmessage()
                    }, this);
                b.addEventListener("message", a, !1);
                this.port1 = {};
                this.port2 = {
                    postMessage: function() {
                        b.postMessage(c, d)
                    }
                }
            });
            if ("undefined" !== typeof a && !yb("Trident") && !yb("MSIE")) {
                var b = new a,
                    c = {},
                    d = c;
                b.port1.onmessage = function() {
                    c = c.next;
                    var a = c.Ca;
                    c.Ca = null;
                    a()
                };
                return function(a) {
                    d.next = {
                        Ca: a
                    };
                    d = d.next;
                    b.port2.postMessage(0)
                }
            }
            return "undefined" !== typeof document && "onreadystatechange" in document.createElement("script") ? function(a) {
                var b = document.createElement("script");
                b.onreadystatechange = function() {
                    b.onreadystatechange = null;
                    b.parentNode.removeChild(b);
                    b = null;
                    a();
                    a = null
                };
                document.documentElement.appendChild(b)
            } : function(a) {
                q.setTimeout(a, 0)
            }
        };
    var Ff = function(a, b) {
            Af || Bf();
            Cf || (Af(), Cf = !0);
            Df.push(new Ef(a, b))
        },
        Af, Bf = function() {
            if (q.Promise && q.Promise.resolve) {
                var a = q.Promise.resolve();
                Af = function() {
                    a.then(Gf)
                }
            } else Af = function() {
                var a = Gf;
                !ea(q.setImmediate) || q.Window && q.Window.prototype.setImmediate == q.setImmediate ? (yf || (yf = zf()), yf(a)) : q.setImmediate(a)
            }
        },
        Cf = !1,
        Df = [],
        Gf = function() {
            for (; Df.length;) {
                var a = Df;
                Df = [];
                for (var b = 0; b < a.length; b++) {
                    var c = a[b];
                    try {
                        c.j.call(c.k)
                    } catch (d) {
                        xf(d)
                    }
                }
            }
            Cf = !1
        },
        Ef = function(a, b) {
            this.j = a;
            this.k = b
        };
    var If = function(a, b) {
        this.k = 0;
        this.o = void 0;
        this.j = this.n = null;
        this.l = this.m = !1;
        try {
            var c = this;
            a.call(b, function(a) {
                Hf(c, 2, a)
            }, function(a) {
                Hf(c, 3, a)
            })
        } catch (d) {
            Hf(this, 3, d)
        }
    };
    If.prototype.then = function(a, b, c) {
        return Jf(this, ea(a) ? a : null, ea(b) ? b : null, c)
    };
    If.prototype.then = If.prototype.then;
    If.prototype.$goog_Thenable = !0;
    var Lf = function(a, b) {
            a.j && a.j.length || 2 != a.k && 3 != a.k || Kf(a);
            a.j || (a.j = []);
            a.j.push(b)
        },
        Jf = function(a, b, c, d) {
            var e = {
                ia: null,
                na: null,
                oa: null
            };
            e.ia = new If(function(a, g) {
                e.na = b ? function(c) {
                    try {
                        var e = b.call(d, c);
                        a(e)
                    } catch (n) {
                        g(n)
                    }
                } : a;
                e.oa = c ? function(b) {
                    try {
                        var e = c.call(d, b);
                        a(e)
                    } catch (n) {
                        g(n)
                    }
                } : g
            });
            e.ia.n = a;
            Lf(a, e);
            return e.ia
        };
    If.prototype.q = function(a) {
        this.k = 0;
        Hf(this, 2, a)
    };
    If.prototype.r = function(a) {
        this.k = 0;
        Hf(this, 3, a)
    };
    var Hf = function(a, b, c) {
            if (0 == a.k) {
                if (a == c) b = 3, c = new TypeError("Promise cannot resolve to itself");
                else {
                    var d;
                    if (c) try {
                        d = !!c.$goog_Thenable
                    } catch (e) {
                        d = !1
                    } else d = !1;
                    if (d) {
                        a.k = 1;
                        c.then(a.q, a.r, a);
                        return
                    }
                    if (u(c)) try {
                        var f = c.then;
                        if (ea(f)) {
                            Mf(a, c, f);
                            return
                        }
                    } catch (g) {
                        b = 3, c = g
                    }
                }
                a.o = c;
                a.k = b;
                Kf(a);
                3 != b || Nf(a, c)
            }
        },
        Mf = function(a, b, c) {
            a.k = 1;
            var d = !1,
                e = function(b) {
                    d || (d = !0, a.q(b))
                },
                f = function(b) {
                    d || (d = !0, a.r(b))
                };
            try {
                c.call(b, e, f)
            } catch (g) {
                f(g)
            }
        },
        Kf = function(a) {
            a.m || (a.m = !0, Ff(a.t, a))
        };
    If.prototype.t = function() {
        for (; this.j && this.j.length;) {
            var a = this.j;
            this.j = [];
            for (var b = 0; b < a.length; b++) {
                var c = a[b],
                    d = this.o;
                if (2 == this.k) c.na(d);
                else {
                    for (var e = void 0, e = this; e && e.l; e = e.n) e.l = !1;
                    c.oa(d)
                }
            }
        }
        this.m = !1
    };
    var Nf = function(a, b) {
            a.l = !0;
            Ff(function() {
                a.l && Of.call(null, b)
            })
        },
        Of = xf;
    var Sf = function(a, b) {
            var c = {
                timeoutMs: 0,
                withCredentials: !0
            };
            return new If(function(d, e) {
                var f = c || {},
                    g, h = vf.j();
                try {
                    h.open("POST", a, !0)
                } catch (k) {
                    e(new Pf("Error opening XHR: " + k.message, a))
                }
                h.onreadystatechange = function() {
                    if (4 == h.readyState) {
                        q.clearTimeout(g);
                        var b;
                        t: switch (h.status) {
                            case 200:
                            case 201:
                            case 202:
                            case 204:
                            case 206:
                            case 304:
                            case 1223:
                                b = !0;
                                break t;
                            default:
                                b = !1
                        }!b && (b = 0 === h.status) && (b = Sc(a)[1] || null, !b && self.location && (b = self.location.protocol, b = b.substr(0, b.length - 1)), b = b ? b.toLowerCase() :
                            "", b = !("http" == b || "https" == b || "" == b));
                        b ? d(h) : e(new Qf(h.status, a))
                    }
                };
                h.onerror = function() {
                    e(new Pf("Network error", a))
                };
                var n;
                if (f.headers) {
                    for (var l in f.headers) n = f.headers[l], null != n && h.setRequestHeader(l, n);
                    n = f.headers["Content-Type"]
                }
                void 0 === n && h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
                f.withCredentials && (h.withCredentials = f.withCredentials);
                f.Sa && h.overrideMimeType(f.Sa);
                0 < f.Ua && (g = q.setTimeout(function() {
                        h.onreadystatechange = aa;
                        h.abort();
                        e(new Rf(a))
                    },
                    f.Ua));
                try {
                    h.send(b)
                } catch (p) {
                    h.onreadystatechange = aa, q.clearTimeout(g), e(new Pf("Error sending XHR: " + p.message, a))
                }
            })
        },
        Pf = function(a, b) {
            ma.call(this, a + ", url=" + b);
            this.url = b
        };
    z(Pf, ma);
    Pf.prototype.name = "XhrError";
    var Qf = function(a, b) {
        Pf.call(this, "Request Failed, status=" + a, b)
    };
    z(Qf, Pf);
    Qf.prototype.name = "XhrHttpError";
    var Rf = function(a) {
        Pf.call(this, "Request timed out", a)
    };
    z(Rf, Pf);
    Rf.prototype.name = "XhrTimeoutError";
    var Tf = function() {};
    z(Tf, uf);
    Tf.prototype.j = function() {
        var a = new XMLHttpRequest;
        if ("withCredentials" in a) return a;
        if ("undefined" != typeof XDomainRequest) return new Uf;
        throw Error("Unsupported browser");
    };
    var Uf = function() {
        this.j = new XDomainRequest;
        this.readyState = 0;
        this.responseText = this.onreadystatechange = null;
        this.status = -1;
        this.j.onload = x(this.Pa, this);
        this.j.onerror = x(this.xa, this);
        this.j.onprogress = x(this.Qa, this);
        this.j.ontimeout = x(this.Ra, this)
    };
    m = Uf.prototype;
    m.open = function(a, b, c) {
        if (null != c && !c) throw Error("Only async requests are supported.");
        this.j.open(a, b)
    };
    m.send = function(a) {
        if (a)
            if ("string" == typeof a) this.j.send(a);
            else throw Error("Only string data is supported");
        else this.j.send()
    };
    m.abort = function() {
        this.j.abort()
    };
    m.setRequestHeader = function() {};
    m.Pa = function() {
        this.status = 200;
        this.responseText = this.j.responseText;
        Vf(this, 4)
    };
    m.xa = function() {
        this.status = 500;
        this.responseText = null;
        Vf(this, 4)
    };
    m.Ra = function() {
        this.xa()
    };
    m.Qa = function() {
        this.status = 200;
        Vf(this, 1)
    };
    var Vf = function(a, b) {
        a.readyState = b;
        if (a.onreadystatechange) a.onreadystatechange()
    };
    var Wf = null,
        Xf = function(a) {
            if (a = Sb(a)) a.innerHTML = ""
        },
        Yf = function(a, b) {
            var c = Sb(a);
            c && (c.style.display = b ? "" : "none")
        },
        Zf = function(a) {
            document.write('<script type="text/javascript" src="' + a + '">\x3c/script>')
        },
        $f = function(a, b, c, d, e, f) {
            f = (f || document).createElement("iframe");
            f.id = b;
            f.name = b;
            null != d && null != e && (f.width = String(d), f.height = String(e));
            f.vspace = "0";
            f.hspace = "0";
            f.allowTransparency = "true";
            f.scrolling = "no";
            f.marginWidth = "0";
            f.marginHeight = "0";
            f.frameBorder = "0";
            f.style.border = "0";
            f.style.verticalAlign =
                "bottom";
            c && (f.style.visibility = "hidden", f.style.display = "none");
            f.src = "javascript:\"<html><body style='background:transparent'></body></html>\"";
            a.appendChild(f);
            return f
        },
        bg = function(a, b) {
            if (0 == Jd()) Wf || (Wf = null), Wf.j("iFrame not removed as non-IE browser, id: " + b);
            else {
                var c = a.getElementById(b);
                c ? "hidden" != c.style.visibility || "none" != c.style.display ? ag("iFrame found to remove but it isn't hidden, id: " + b) : (c.parentNode.removeChild(c), Wf || (Wf = null), Wf.j("Hidden iFrame removed, id: " + b)) : ag("iFrame not found to remove, id: " +
                    b)
            }
        },
        dg = function(a, b, c, d, e) {
            new Ne({
                Y: a,
                Ea: b,
                content: cg(c),
                size: new nb(d, e),
                Fa: {
                    info: function() {},
                    j: function() {},
                    error: function() {}
                },
                Da: !0
            })
        },
        gg = function(a, b, c) {
            c && (b = cg(b));
            if (0 != Jd()) {
                var d;
                try {
                    d = !!a.contentWindow.document
                } catch (e) {
                    d = !1
                }
                if (d) {
                    var f = b,
                        g = eg();
                    try {
                        var h = window.frames[a.name];
                        if (6 < parseInt(Jd(), 10) || 0 > f.indexOf("http://" + L[1] + "/pagead/inject_object_div.js")) {
                            var k;
                            i: {
                                a = f;
                                b = document;
                                var n = Jd(),
                                    l;
                                if (!(l = 0 == n || isNaN(n) || 7 > n || 9 < n || b.documentMode && 10 <= b.documentMode)) {
                                    var p = navigator.userAgent.match(/Trident\/([0-9]+.[0-9]+)/);
                                    l = 6 <= (p ? parseFloat(p[1]) : 0)
                                }
                                if (!l)
                                    for (n = 0; n < a.length; ++n)
                                        if (127 < a.charCodeAt(n)) {
                                            k = !0;
                                            break i
                                        }
                                k = !1
                            }
                            if (k) {
                                var w = unescape(encodeURIComponent(f)),
                                    I = Math.floor(w.length / 2);
                                a = [];
                                for (k = 0; k < I; ++k) a[k] = String.fromCharCode(256 * w.charCodeAt(2 * k + 1) + w.charCodeAt(2 * k));
                                1 == w.length % 2 && (a[I] = w.charAt(w.length - 1));
                                f = a.join("")
                            }
                            h.contents = f;
                            h.location.replace("javascript:window.contents")
                        } else h.contents = f, h.location.replace("javascript:document.write(window.contents);document.close();")
                    } catch (v) {
                        ag("Could not write third party content into IE iframe: " +
                            v.message)
                    } finally {
                        fg(g)
                    }
                } else {
                    w = b;
                    h = eg();
                    try {
                        f = "google-ad-content-" + (Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ ja()).toString(36)), window[f] = w, w = 'var adContent = window.parent["' + f + '"];window.parent["' + f + '"] = null;document.write(adContent);', w = 6 == Jd() ? "window.onload = function() {document.write(\\'<sc\\' + \\'ript type=\"text/javascript\">document.domain = \"" + document.domain + '";' + w + "<\\/scr\\' + \\'ipt>\\');document.close(); };" : 'document.domain = "' +
                            document.domain + '";' + w + "document.close();", a.src = 'javascript:\'<script type="text/javascript">' + w + "\x3c/script>'"
                    } catch (Kb) {
                        window[f] = null, ag("Could not write third party content into  IE iframe with modified document.domain: " + Kb.message)
                    } finally {
                        fg(h)
                    }
                }
            } else {
                h = b;
                try {
                    g = a.contentWindow ? a.contentWindow.document : a.contentDocument, -1 != navigator.userAgent.indexOf("Firefox") && g.open("text/html", "replace"), g.write(h), g.close()
                } catch (fb) {
                    ag("Could not write content into iframe using  the DOM standards method:" +
                        fb.message)
                }
            }
        },
        cg = function(a) {
            if (!Boolean(a)) return a;
            var b = a.toLowerCase();
            return -1 < b.indexOf("<!doctype") || -1 < b.indexOf("<html") ? a : "<html>\n<head>\n<script>var inDapIF=true;\x3c/script>\n</head><body>" + a + "</body></html>\n"
        },
        ag = function(a) {
            Wf || (Wf = null);
            Wf.k(a)
        },
        hg = function(a, b) {
            var c = (b || document).getElementById(a);
            if (c && c.style.height && c.style.width) {
                for (var c = [c.style.width, c.style.height], d = 0; d < c.length; ++d)
                    if (2 < c[d].length && "px" == c[d].substring(c[d].length - 2)) c[d] = parseInt(c[d], 10);
                    else return null;
                return c
            }
            return null
        },
        eg = function() {
            var a = [],
                b = document.getElementsByTagName("base");
            if (b)
                for (var c = 0, d = b.length; c < d; ++c) {
                    var e = b[c],
                        f = e.getAttribute("target");
                    f && (a.push({
                        Va: e,
                        Wa: f
                    }), e.removeAttribute("target"))
                }
            return a
        },
        fg = function(a) {
            if (a)
                for (var b = 0, c = a.length; b < c; ++b) {
                    var d = a[b];
                    d.Va.setAttribute("target", d.Wa)
                }
        };
    var S = function(a, b, c, d) {
        var e = M(c, "api_experiment");
        oa(e) || $a(bb(e.split(","), pa), $e);
        $a(Ze(), function(a) {
            googletag._tmanager_.addFeature(a)
        });
        this.j = b;
        this.m = c;
        this.M = {};
        this.Z = d;
        this.v = Math.floor(4503599627370496 * Math.random());
        this.ka = !1;
        this.k = a;
        this.ua = this.t = !1;
        "MOBILE" == M(c, "target_platform") && (this.ua = !0);
        this.t = this.j && null !== this.j.w ? Boolean(this.j.w) : this.ua;
        E && Jb(9) && (vf = new Tf)
    };
    S.prototype.D = function() {
        return "lean"
    };
    var ig = function(a, b) {
        b && window.top != window ? a.ka = !0 : b = Math.floor(4503599627370496 * Math.random());
        a.v = Math.floor(b)
    };
    S.prototype.va = function() {
        return this.k
    };
    S.prototype.W = function() {
        return null
    };
    S.prototype.V = function() {
        return !1
    };
    var jg = function(a, b) {
        for (var c = 0; c < b.length; c++) a.M[F(b[c])] = null;
        Ud(a.j, b)
    };
    S.prototype.ja = function() {};
    var kg = function(a, b) {
        return a.M[F(b)]
    };
    S.prototype.q = function(a) {
        var b = new ae;
        b.q = this.v + "";
        b.u = "json_html";
        b.l = this.O(this.k);
        b.k = a;
        b.o = this.aa();
        b.j = Ze();
        b.w = this.ka;
        return b
    };
    S.prototype.F = function(a, b, c) {
        return lg(this, this.k ? "sra" : "single", this.q(b)).F(a, c)
    };
    var mg = function(a) {
            return Nd() && P(df, "experiment") && 2048 < a.length
        },
        ng = function(a, b) {
            return b ? kf(a, 8192) : kf(a, 2048)
        },
        pg = function(a, b, c) {
            b = Sc(b);
            Sf(Oc(b[1], b[2], b[3], b[4], b[5]), b[6]).then(function(a) {
                var b;
                a = a.responseText;
                a = a.substring(a.indexOf("(") + 1, a.lastIndexOf(")")).replace(/\\x/g, "\\u00");
                var f = q.JSON.parse;
                try {
                    b = f(a)
                } catch (g) {
                    b = null
                }
                b && (og(b), c(b))
            }, function() {}, a)
        },
        og = function(a) {
            ca(a) ? $a(a, og) : A(a, function(a) {
                a._cookies_ && delete a._cookies_
            })
        },
        qg = function(a, b) {
            $a(b, function(a) {
                var b = this.q(1);
                b.l = this.O(!1);
                b = lg(this, "single", b).F([a], !0);
                fc(a, b)
            }, a)
        },
        rg = function(a, b, c, d, e, f, g) {
            a = a.createElement(b);
            a.style.width = d + "px";
            e && (a.style.height = e + "px");
            a.style.display = f;
            a.style.position = "relative";
            g && (a.style.margin = g);
            a.style.border = 0;
            c && a.appendChild(c);
            return a
        };
    S.prototype.B = function(a, b, c, d) {
        c in this.j.l || (d && this.V([c]), a = c.getCollapseEmptyDiv(), null == a && (a = "true" === M(this.m, "google_collapse_empty_div")), a && Yf(G(c), !1))
    };
    S.prototype.o = function(a, b, c) {
        this.M || (this.M = {});
        var d = [];
        if (this.k)
            if (ca(a)) {
                d = c || Rd(this.j);
                b = [];
                c = {};
                for (var e = 0; e < d.length; ++e) {
                    var f = d[e],
                        g = null,
                        g = null;
                    if (P(ef, "experiment"))
                        for (var h = Math.min(a.length, e + 1), k = 0; k < h; k++) {
                            if (null == c[k] && (g = a[k], g = g[f.getName()])) {
                                c[k] = !0;
                                break
                            }
                        } else g = a[e], g = g[f.getName()];
                    g && (sg(this, f, g), b.push(f))
                }
                d = b
            } else d = tg(this, a);
        else c = rb(a), 1 < c.length || 0 == c.length ? a = null : (c = c[0], a = a[c], (b = b ? this.j.k[b] : ug(this, c)) ? (sg(this, b, a), a = b) : a = null), a && d.push(a);
        return d
    };
    var tg = function(a, b) {
            var c = [];
            A(b, function(a, b) {
                var f = ug(this, b);
                f && (sg(this, f, a), c.push(f))
            }, a);
            return c
        },
        sg = function(a, b, c) {
            a.M[F(b)] = c;
            b.q || (b.q = (new Date).getTime());
            b.j.fetchEnded();
            null != c._cookies_ && Se(a.Z, c);
            c._persistent_for_stream_ && (a.j.l[b] = null)
        },
        ug = function(a, b) {
            if (!a.k)
                for (var c = a.j.j, d = c.length - 1; 0 <= d; --d)
                    if (c[d].getName() == b) {
                        var e = c[d];
                        if (!kg(a, e)) return e
                    }
            d = [];
            if (e = a.j.v[b])
                for (c = 0; c < e.length; ++c) e[c] && d.push(c);
            if (c = d.length ? d : null)
                for (d = 0; d < c.length; ++d)
                    if ((e = a.j.k[b + "_" + c[d]]) &&
                        !kg(a, e)) return e;
            return null
        };
    var vg = function(a, b) {
            var c;
            c = L[6] ? "https://" + L[33] : "http://" + L[33];
            if (!b || 0 > b || 1 < b) b = 0;
            this.l = Math.random() < b;
            this.k = a;
            this.j = c + "/pagead/gen_204?id=" + B(a)
        },
        T = function(a, b, c) {
            b && b.match(/^\w+$/) && c && (a.j += "&" + b + "=" + B(c))
        },
        wg = function(a, b) {
            T(a, "vrp", "49");
            var c = q.googletag;
            null != c && null != c.getVersion && T(a, "vrg", c.getVersion());
            var c = document,
                d = window,
                e = Yd(b);
            0 < e.length && (T(a, "pub_id", e[0]), 3 >= e.length || (e = lb(e, 0, 3), e.push("__extra__")), T(a, "nw_id", e.join(",")));
            T(a, "nslots", Wd(b).toString());
            e = Ze();
            0 < e.length && T(a, "eid", e.join());
            T(a, "pub_url", c.URL);
            null != Yc(b.m) && d.top != d || T(a, "pub_ref", c.referrer)
        },
        xg = function(a) {
            a.l && a.k && a.j && Ma(window, a.j)
        };
    var yg = function(a, b, c, d, e) {
        jf.call(this, a, b, c, d, e)
    };
    z(yg, jf);
    yg.prototype.t = function() {
        jf.prototype.t.call(this);
        R(this, "m_ast", "js");
        R(this, "markup", "html");
        R(this, "js", "afmc")
    };
    var U = function(a, b, c, d, e) {
        S.call(this, a, b, c, d);
        this.csi = e;
        this.w = this.Q = this.K = null;
        this.wa = this.P = this.A = this.r = !1;
        this.ca = this.da = "";
        this.videoStreamCorrelator = NaN;
        this.$ = 0
    };
    z(U, S);
    U.prototype.D = function() {
        return "unknown"
    };
    U.prototype.q = function(a) {
        a = U.U.q.call(this, a);
        a.r = this.wa;
        a.t = this.ca;
        a.v = this.da;
        a.m = this.$;
        return a
    };
    var zg = function(a) {
        var b = Vd(a.j);
        if (0 < b.length) {
            for (var c = {}, d = [], e = 0; e < b.length; ++e) c[b[e][0]] = !0;
            A(c, function(a, b) {
                d.push(b)
            });
            a.K = new vg("gpt_missing_cb", L[10]);
            T(a.K, "pending", d.join());
            T(a.K, "correlator", a.v.toString());
            T(a.K, "impl", a.D());
            wg(a.K, a.j);
            xg(a.K)
        }
    };
    U.prototype.Na = function() {
        this.csi.tick("onload");
        this.csi.k(this.D());
        zg(this);
        if (this.k && !this.A) {
            var a = Wd(this.j),
                b = this.j.j.length;
            a != b && (this.Q = new vg("gpt_sra_mismatch", L[11]), T(this.Q, "correlator", this.v.toString()), T(this.Q, "fslots", b.toString()), wg(this.Q, this.j), xg(this.Q))
        }
    };
    U.prototype.Oa = function() {
        Wd(this.j);
        this.w = new vg("gpt_req_disp_mismatch", L[23]);
        T(this.w, "fslots", this.j.j.length.toString());
        T(this.w, "impl", this.O(this.k));
        T(this.w, "sra", this.k ? "1" : "0");
        T(this.w, "correlator", this.v.toString());
        wg(this.w, this.j);
        xg(this.w)
    };
    var lg = function(a, b, c) {
        switch (M(a.m, "target_platform")) {
            case "MOBILE":
                return new yg(b, a.j, a.m, a.Z, c);
            default:
                return new tf(b, a.j, a.m, a.Z, c)
        }
    };
    U.prototype.B = function(a, b, c, d) {
        a.google_js_backfill ? b.write('<script src="' + L[5] + '">\x3c/script>') : U.U.B.call(this, a, b, c, d)
    };
    U.prototype.o = function(a, b, c) {
        rd(this.csi, "ga_srt", this.j.j.length, "_ga_start");
        return S.prototype.o.call(this, a, b, c)
    };
    var Ag = function(a, b, c) {
        a.$ && b && (a = a.j.k[c], c = "", a && (c = a.getContentUrl()), md().registerAdBlock(c, 3, "json_html", b))
    };
    var Bg = function(a, b, c, d) {
            this.index = a;
            this.n = b;
            this.m = c;
            this.j = d;
            this.l = -1;
            this.k = !1
        },
        Cg = function(a, b) {
            var c;
            P(cf, "experiment_sra_zero_queuing_time") ? a.m ? c = 0 : c = L[22] : c = a.m ? L[21] : L[22];
            a.l = setTimeout(b, c);
            a.k = !1
        },
        V = function(a, b, c, d, e) {
            U.call(this, a, b, c, d, e);
            this.l = {};
            this.n = 0;
            this.u = !1;
            this.I = NaN;
            this.G = !1;
            this.J = NaN;
            this.H = !1
        };
    z(V, U);
    V.prototype.D = function() {
        return this.k ? "gut_async_sra" : "gut_async"
    };
    V.prototype.aa = function() {
        return "callbackProxy"
    };
    V.prototype.O = function(a) {
        return a ? "fifs" : "fif"
    };
    V.prototype.q = function(a) {
        a = V.U.q.call(this, a);
        !this.k && this.u && (a.n = !0);
        a.persistentRoadblocksOnly = this.H;
        a.videoPodNumber = this.I;
        a.videoPodPosition = this.J;
        a.videoStreamCorrelator = this.videoStreamCorrelator;
        return a
    };
    var Dg = function(a, b) {
            var c = document,
                d = H(a) + "__hidden__",
                e = c.getElementById(d);
            if (!e) {
                e = G(a);
                e = c.getElementById(e);
                if (null == e) return;
                e = $f(e, d, !0, 0, 0, c)
            }
            gg(e, b, !1)
        },
        Eg = function(a) {
            return H(a) + "__container__"
        },
        Fg = function(a, b) {
            var c = a.getElementById(Eg(b));
            return Boolean(c) && cb(ac(c), function(a) {
                return a.id != H(b)
            })
        };
    V.prototype.ja = function(a, b) {
        if (0 != a.length) {
            if (r(b.videoStreamCorrelator)) this.videoStreamCorrelator = b.videoStreamCorrelator;
            else {
                var c = !0;
                r(b.changeCorrelator) && (c = b.changeCorrelator);
                c && ig(this)
            }
            this.T = null;
            this.I = b.videoPodNumber || NaN;
            this.J = b.videoPodPosition || NaN;
            this.H = b.persistentRoadblocksOnly || !1;
            this.G = b.clearUnfilledSlots || !1;
            jg(this, a);
            for (c = 0; c < a.length; ++c) {
                var d = a[c],
                    e = document;
                if (!(d in this.j.l)) {
                    var f = G(d),
                        g = e.getElementById(f);
                    if (g) {
                        for (var f = Eg(d), h = H(d) + "__hidden__", g = g.childNodes,
                            k = !1, n = 0; n < g.length; ++n)
                            if (1 == g[n].nodeType) {
                                var l = g[n];
                                if (l.id != f && l.id != h) {
                                    k = !0;
                                    break
                                }
                            }(k = k || Fg(e, d)) && Gg(d)
                    }
                }
            }
            this.r || Hg(this, a, b.isVideoRefresh ? 3 : 2)
        }
    };
    V.prototype.V = function(a) {
        for (var b = 0; b < a.length; ++b) Gg(a[b]), Jg(this, a[b]);
        return !0
    };
    var Gg = function(a) {
            var b = a.k;
            Kg(a);
            var c = G(a);
            if (b) {
                var d = document.getElementById(c);
                if (d) {
                    var e = Eg(a) + "__to_be_removed__";
                    a = jb(d.childNodes);
                    $a(a, function(a) {
                        1 == a.nodeType && a.id == e || d.removeChild(a)
                    })
                }
            } else Xf(c)
        },
        Lg = function(a, b) {
            var c = document,
                d = b.getSizes();
            if (0 != d.length) {
                var e = d[0];
                1 < d.length && (e = hg(G(b), c) || e);
                var d = H(b),
                    f = c.getElementById(d);
                if (!f) {
                    f = G(b);
                    f = c.getElementById(f);
                    if (null == f) return;
                    var g = c.createElement("div");
                    g.id = Eg(b);
                    g.name = g.id;
                    g.style.border = "0pt none";
                    a.t && (g.style.margin =
                        "auto", g.style.textAlign = "center");
                    f.appendChild(g);
                    f = $f(g, d, !1, e[0], e[1], c)
                }
                a.j.q[F(b)] = f
            }
        };
    V.prototype.ga = function(a) {
        if (!this.k) {
            var b = document.getElementById(G(a));
            b && (this.j.r[F(a)] = b)
        }
    };
    V.prototype.ha = function() {};
    V.prototype.fa = function() {};
    V.prototype.X = function(a) {
        Jg(this, a);
        if (!this.r && !this.A) {
            var b = null;
            if (this.k) {
                Td(this.j, a);
                Lg(this, a);
                if (null != kg(this, a)) try {
                    Mg(this, a)
                } catch (c) {}
                b = Sd(this.j)
            } else b = a.m ? [] : [a];
            0 != b.length && Hg(this, b, 1)
        }
    };
    var Jg = function(a, b) {
            var c = b.getDivStartsCollapsed();
            null == c && (c = "true" === M(a.m, "google_divs_start_collapsed"));
            c && Yf(G(b), !1)
        },
        Mg = function(a, b) {
            var c = window,
                d = document,
                e = kg(a, b);
            gc(b);
            if (null == e || e._empty_) a.B(c, d, b, a.G), N(b, kc(b));
            else if (a.P) N(b, kc(b));
            else {
                c = e._html_;
                if (!s(c)) {
                    Kg(b);
                    return
                }
                Yf(G(b), !0);
                b.k ? (Kg(b), Lg(a, b)) : r(window.Goog_Osd_UnloadAdBlock) && Goog_Osd_UnloadAdBlock(document.getElementById(H(b)), b.k);
                if (e._use_safe_frame_) {
                    var f = e._width_,
                        g = e._height_,
                        h = d.getElementById(Eg(b));
                    null !=
                        h && ($b(h), dg(h, H(b), c, f, g), b.k = !0, Ag(a, d.getElementById(H(b)), F(b)))
                } else f = e._width_, g = d.getElementById(H(b)), null != g && (g.height = String(e._height_), g.width = String(f), gg(g, c, !0), Ag(a, g, F(b)));
                N(b, jc(b, e))
            }
            bg(d, H(b) + "__hidden__")
        },
        Kg = function(a) {
            var b = document.getElementById(Eg(a));
            if (b) {
                var c = document.getElementById(H(a));
                r(window.Goog_Osd_UnloadAdBlock) && Goog_Osd_UnloadAdBlock(c, a.k);
                a.k ? (b.style.display = "none", b.id += "__to_be_removed__", c.id = c.id + "__to_be_removed__", window.setTimeout(function() {
                    b.parentNode &&
                        b.parentNode.removeChild(b)
                }, L[24])) : b.parentNode.removeChild(b)
            }
            a.k = !1
        };
    V.prototype.W = function() {
        return sb(this.l) || pb(this.l, function(a) {
            return a.k
        })
    };
    var Hg = function(a, b, c) {
            var d = a.W(),
                e = a.n;
            if (a.k) a.l[a.n] = new Bg(a.n, c, !0, b), a.n += 1;
            else
                for (var f = 0; f < b.length; f++) a.l[a.n] = new Bg(a.n, c, !1, [b[f]]), a.n += 1;
            d && Ng(a, a.l[e])
        },
        Ng = function(a, b) {
            1 != b.n && (b.j = ab(b.j, function(a) {
                return !(a in this.j.l)
            }, a));
            $a(b.j, function(a) {
                0 == a.getSizes().length && this.B(window, document, a, !0)
            }, a);
            b.j = ab(b.j, function(a) {
                return 0 < a.getSizes().length
            }, a);
            var c = gb(b.j, function(a) {
                return null != document.getElementById(G(a))
            });
            if (null == c) delete a.l[b.index], Og(a, b);
            else {
                for (var d =
                    0; d < b.j.length; ++d) Td(a.j, b.j[d]), Lg(a, b.j[d]);
                d = a.F(b.j, b.n, !1);
                if (mg(d)) {
                    var d = ng(d, !0),
                        e = Hd(d);
                    Pg(a, b, e);
                    c = x(function(a) {
                        Qg(this, a, b.index)
                    }, a);
                    pg(a, d, c)
                } else d = ng(d, !1), e = Hd(d), Pg(a, b, e), Dg(c, Rg(b, e));
                a.u = !1;
                Cg(b, x(a.N, a, b));
                rd(a.csi, "_ga_start", a.j.j.length)
            }
        },
        Pg = function(a, b, c) {
            googletag._tmanager_.tickRepeated("ad_fetch_start", b.index, b.j[0].l);
            a.k ? qg(a, b.j) : fc(b.j[0], c)
        },
        Rg = function(a, b) {
            var c;
            c = "<script>function callbackProxy(adContents) {";
            c += "window.parent.googletag.impl.pubads.handleResponseReceived(adContents, " +
                a.index + ");}";
            c += "\x3c/script>";
            return c += '<script src = "' + b + '">\x3c/script>'
        };
    V.prototype.N = function(a) {
        this.u = !0;
        a.k = !0;
        Og(this, a)
    };
    var Qg = function(a, b, c) {
            var d = a.l[c];
            googletag._tmanager_.tickRepeated("ad_fetch_end", d.index, d.j[0].l);
            b = a.k ? a.o(b, void 0, d.j) : a.o(b, F(d.j[0]), void 0);
            for (var e = 0; e < b.length; e++) try {
                Mg(a, b[e])
            } catch (f) {}
            clearTimeout(d.l);
            d.l = -1;
            delete a.l[c];
            d.k || Og(a, d)
        },
        Og = function(a, b) {
            var c;
            for (c = b.index + 1; c < a.n; c++)
                if (a.l[c] && !a.l[c].k) {
                    Ng(a, a.l[c]);
                    break
                }
        };
    var W = function(a, b, c, d, e) {
        U.call(this, a, b, c, d, e);
        this.u = [];
        this.n = {};
        this.l = 0;
        this.ba = [];
        this.T = null;
        this.H = [];
        this.ma = {};
        this.I = !1;
        this.ra = this.qa = NaN;
        this.sa = !1;
        this.N = NaN;
        this.pa = !1;
        this.J = this.G = null
    };
    z(W, U);
    W.prototype.D = function() {
        return this.k ? "gut_friendly_iframe_sra" : "gut_friendly_iframe"
    };
    W.prototype.aa = function() {
        return this.k ? P(gf, "experiment") ? "callbackProxy" : "window.parent.googletag.impl.pubads.setAdContentsBySlotForAsync" : "callbackProxy"
    };
    W.prototype.O = function(a) {
        return a ? "fifs" : "fif"
    };
    W.prototype.q = function(a) {
        a = W.U.q.call(this, a);
        !this.k && this.I && (a.n = !0);
        a.persistentRoadblocksOnly = this.pa;
        a.videoPodNumber = this.qa;
        a.videoPodPosition = this.ra;
        a.videoStreamCorrelator = this.videoStreamCorrelator;
        return a
    };
    var Xg = function(a, b, c, d) {
            if (!(a.r || a.A && 1 == d)) {
                for (var e = 0; e < b.length; e++) Td(a.j, b[e]), Sg(a, b[e]);
                d = a.F(b, d, !1);
                if (mg(d)) Tg(a, d, b);
                else {
                    d = ng(d, !1);
                    d = Hd(d);
                    qg(a, b);
                    Ug(a, b, c);
                    e = "";
                    e = P(gf, "experiment") ? Vg(b, d, !0) : '<script src = "' + d + '">\x3c/script>';
                    rd(a.csi, "_ga_start", a.j.j.length);
                    googletag._tmanager_.tickRepeated("ad_fetch_start", a.l, b[0].l);
                    a.n[a.l] = b;
                    a.l++;
                    if (P(hf, "experiment") && null == document.getElementById(G(b[c])) && (c = eb(b, function(a) {
                        return null != document.getElementById(G(a))
                    }), -1 == c)) return;
                    Wg(b[c], e)
                }
            }
        },
        Yg = function(a, b, c) {
            Td(a.j, b);
            c = a.F([b], c, !1);
            mg(c) ? Tg(a, c, [b]) : (c = ng(c, !1), a.I = !1, c = Hd(c), googletag._tmanager_.tickRepeated("ad_fetch_start", a.l, b.l), a.n[a.l] = [b], a.l++, fc(b, c), Ug(a, [b], 0), c = Vg([b], c, !(b in a.j.l)), rd(a.csi, "_ga_start", a.j.j.length), Wg(b, c));
            a.ma[F(b)] = setTimeout(x(a.ta, a, !0), L[13])
        },
        Vg = function(a, b, c) {
            var d = "";
            c && (a = bb(a, function(a) {
                a = F(a);
                a = String(a);
                if (a.quote) a = a.quote();
                else {
                    for (var b = ['"'], c = 0; c < a.length; c++) {
                        var d = a.charAt(c),
                            k = d.charCodeAt(0),
                            n = c + 1,
                            l;
                        if (!(l =
                            Ca[d])) {
                            if (!(31 < k && 127 > k))
                                if (d in Da) d = Da[d];
                                else if (d in Ca) d = Da[d] = Ca[d];
                            else {
                                k = d;
                                l = d.charCodeAt(0);
                                if (31 < l && 127 > l) k = d;
                                else {
                                    if (256 > l) {
                                        if (k = "\\x", 16 > l || 256 < l) k += "0"
                                    } else k = "\\u", 4096 > l && (k += "0");
                                    k += l.toString(16).toUpperCase()
                                }
                                d = Da[d] = k
                            }
                            l = d
                        }
                        b[n] = l
                    }
                    b.push('"');
                    a = b.join("")
                }
                return a
            }), d += '<script type="text/javascript">function callbackProxy(adContents) { ', d += "window.parent.googletag.impl.pubads.setAdContentsBySlotForAsync(adContents, [" + a.join() + "]);}", d += "\x3c/script>");
            return d += '<script src = "' +
                b + '">\x3c/script>'
        },
        Tg = function(a, b, c) {
            b = ng(b, !0);
            var d = Hd(b);
            a.va ? qg(a, c) : fc(c[0], d);
            var e = bb(c, function(a) {
                    return F(a)
                }),
                d = x(function(a) {
                    !this.va && c[0] in this.j.l || Zg(this, a, e)
                }, a);
            pg(a, b, d);
            googletag._tmanager_.tickRepeated("ad_fetch_start", a.l, c[0].l);
            a.n[a.l] = c;
            a.l++;
            rd(a.csi, "_ga_start", a.j.j.length)
        },
        Wg = function(a, b) {
            var c = document,
                d = H(a) + "__hidden__",
                e = c.getElementById(d);
            if (!e) {
                e = G(a);
                e = c.getElementById(e);
                if (null == e) return;
                e = $f(e, d, !0, 0, 0, c)
            }
            gg(e, b, !1)
        },
        $g = function(a) {
            return H(a) + "__container__"
        },
        ah = function(a, b) {
            var c = a.getElementById($g(b));
            return Boolean(c) && cb(ac(c), function(a) {
                return a.id != H(b)
            })
        };
    W.prototype.ja = function(a, b) {
        if (r(b.videoStreamCorrelator)) this.videoStreamCorrelator = b.videoStreamCorrelator;
        else {
            var c = !0;
            r(b.changeCorrelator) && (c = b.changeCorrelator);
            c && ig(this)
        }
        this.T = null;
        this.qa = b.videoPodNumber || NaN;
        this.ra = b.videoPodPosition || NaN;
        this.pa = b.persistentRoadblocksOnly || !1;
        this.sa = b.clearUnfilledSlots || !1;
        jg(this, a);
        this.k && (this.T = a, c = this.H, 0 <= Za(c, a) || c.push(a));
        this.N = a.length;
        for (c = 0; c < a.length; ++c) {
            var d = a[c],
                e = document;
            if (!(d in this.j.l)) {
                var f = G(d),
                    g = e.getElementById(f);
                if (g) {
                    for (var f = $g(d), h = H(d) + "__hidden__", g = g.childNodes, k = !1, n = 0; n < g.length; ++n)
                        if (1 == g[n].nodeType) {
                            var l = g[n];
                            if (l.id != f && l.id != h) {
                                k = !0;
                                break
                            }
                        }(k = k || ah(e, d)) && bh(d)
                }
            }
        }
        ch(this, a, 0, b.isVideoRefresh ? 3 : 2)
    };
    W.prototype.V = function(a) {
        for (var b = 0; b < a.length; ++b) bh(a[b]), dh(this, a[b]);
        return !0
    };
    var bh = function(a) {
            var b = a.k;
            eh(a);
            var c = G(a);
            if (b) {
                var d = document.getElementById(c);
                if (d) {
                    var e = $g(a) + "__to_be_removed__";
                    a = jb(d.childNodes);
                    $a(a, function(a) {
                        1 == a.nodeType && a.id == e || d.removeChild(a)
                    })
                }
            } else Xf(c)
        },
        Sg = function(a, b) {
            var c = document,
                d = b.getSizes();
            if (0 != d.length) {
                var e = d[0];
                1 < d.length && (e = hg(G(b), c) || e);
                var d = H(b),
                    f = c.getElementById(d);
                if (!f) {
                    f = G(b);
                    f = c.getElementById(f);
                    if (null == f) return;
                    var g = c.createElement("div");
                    g.id = $g(b);
                    g.name = g.id;
                    g.style.border = "0pt none";
                    a.t && (g.style.margin =
                        "auto", g.style.textAlign = "center");
                    f.appendChild(g);
                    f = $f(g, d, !1, e[0], e[1], c)
                }
                a.j.q[F(b)] = f
            }
        },
        fh = function(a, b) {
            if (b.length > a.length) return !1;
            var c = {};
            $a(a, function(a) {
                c[a.getName()] = !0
            });
            return !cb(b, function(a) {
                a = rb(a);
                return 1 == a.length && !(a[0] in c)
            })
        },
        gh = function(a, b) {
            if (!ca(b)) return null;
            for (var c = 0; c < a.H.length; ++c) {
                var d = a.H[c];
                if (fh(d, b)) return C.splice.call(a.H, c, 1), d
            }
            return null
        },
        hh = function(a, b) {
            for (var c = 0; c < a.l; ++c)
                if (a.n.hasOwnProperty(c)) {
                    var d = a.n[c];
                    if (ca(b) && fh(d, b) || !ca(b) && fh(d, [b])) return c
                }
            return -1
        },
        ih = function(a, b) {
            for (var c = 0; c < a.l; c++)
                if (a.n.hasOwnProperty(c) && db(a.n[c], function(a, c) {
                    return F(a) == b[c]
                })) return c;
            return -1
        },
        kh = function(a, b, c) {
            var d = [];
            if (P(gf, "experiment") && null != c)
                for (var e = 0; e < c.length; e++) d.push(a.j.k[c[e]]);
            else d = gh(a, b) || a.T;
            d = a.o(b, void 0, d);
            b = c ? ih(a, c) : hh(a, b);
            0 <= b && (googletag._tmanager_.tickRepeated("ad_fetch_end", b, d[0].l), delete a.n[b]);
            $a(d, function(a) {
                jh(this, a)
            }, a)
        },
        Zg = function(a, b, c) {
            if (a.k) kh(a, b, c);
            else {
                var d = ca(c) ? a.o(b, c[0]) : a.o(b);
                b = c ? ih(a, c) : hh(a, b);
                0 <= b && (googletag._tmanager_.tickRepeated("ad_fetch_end", b, d[0].l), delete a.n[b]);
                b = a.u[0];
                c = !1;
                for (var e = 0; e < d.length; ++e) jh(a, d[e]), d[e] === b && (c = !0);
                c && (clearTimeout(a.ma[F(b)]), a.ta())
            }
        };
    W.prototype.ta = function(a) {
        a && (this.I = !0);
        0 < this.u.length && (this.u.shift(), this.ba.shift(), 0 < this.u.length && Yg(this, this.u[0], this.ba[0]))
    };
    var lh = function(a, b) {
            Td(a.j, b);
            Sg(a, b);
            null != kg(a, b) && jh(a, b)
        },
        ch = function(a, b, c, d) {
            if (a.k) Xg(a, b, c, d);
            else if (!(a.r || a.A && 1 == d)) {
                for (c = 0; c < b.length; c++) Sg(a, b[c]);
                kb(a.u, b);
                c = b.length;
                for (var e = [], f = 0; f < c; f++) e[f] = d;
                kb(a.ba, e);
                a.u.length == b.length && Yg(a, b[0], d)
            }
        };
    W.prototype.ga = function(a) {
        if (!this.k) {
            var b = document.getElementById(G(a));
            b && (this.j.r[F(a)] = b)
        }
    };
    W.prototype.ha = function() {};
    W.prototype.fa = function() {};
    W.prototype.X = function(a) {
        dh(this, a);
        var b = null,
            c = -1;
        if (this.k) {
            lh(this, a);
            if (P(ef, "experiment")) {
                if (b = Sd(this.j), 0 == b.length) return
            } else if (1 == this.j.j.length) b = Rd(this.j);
            else return;
            c = a.m ? 0 : eb(b, function(b) {
                return F(a) == F(b)
            })
        } else b = [a], c = 0;
        ch(this, b, c, 1)
    };
    var dh = function(a, b) {
            var c = b.getDivStartsCollapsed();
            null == c && (c = "true" === M(a.m, "google_divs_start_collapsed"));
            c && Yf(G(b), !1)
        },
        jh = function(a, b) {
            try {
                t: {
                    var c = window,
                        d = document,
                        e = kg(a, b);
                    gc(b);
                    if (null == e || e._empty_) a.B(c, d, b, a.sa), N(b, kc(b));
                    else if (a.P) N(b, kc(b));
                    else {
                        var f = e._html_;
                        if (!s(f)) {
                            eh(b);
                            break t
                        }
                        Yf(G(b), !0);
                        b.k ? (eh(b), Sg(a, b)) : r(window.Goog_Osd_UnloadAdBlock) && Goog_Osd_UnloadAdBlock(document.getElementById(H(b)), b.k);
                        if (e._use_safe_frame_) {
                            var g = e._width_,
                                h = e._height_,
                                k = d.getElementById($g(b));
                            null != k && ($b(k), dg(k, H(b), f, g, h), b.k = !0, Ag(a, d.getElementById(H(b)), F(b)))
                        } else {
                            var n = e._width_,
                                l = d.getElementById(H(b));
                            null != l && (l.height = String(e._height_), l.width = String(n), gg(l, f, !0), Ag(a, l, F(b)))
                        }
                        N(b, jc(b, e))
                    }
                    bg(d, H(b) + "__hidden__")
                }
            } catch (p) {}
        },
        eh = function(a) {
            var b = document.getElementById($g(a));
            if (b) {
                var c = document.getElementById(H(a));
                r(window.Goog_Osd_UnloadAdBlock) && Goog_Osd_UnloadAdBlock(c, a.k);
                a.k ? (b.style.display = "none", b.id += "__to_be_removed__", c.id = c.id + "__to_be_removed__", window.setTimeout(function() {
                    b.parentNode &&
                        b.parentNode.removeChild(b)
                }, L[24])) : b.parentNode.removeChild(b)
            }
            a.k = !1
        };
    W.prototype.W = function() {
        return isNaN(this.N) || this.k ? 0 == Sd(this.j).length : Sd(this.j).length == Wd(this.j) - this.N
    };
    var Ug = function(a, b, c) {
            null == document.getElementById(G(b[c])) && mh(a);
            a.k && (cb(b, function(a) {
                return null != document.getElementById(G(a))
            }) || nh(a))
        },
        mh = function(a) {
            a.G = new vg("gpt_target_slot_has_no_div", L[29]);
            T(a.G, "sra", a.k ? "1" : "0");
            wg(a.G, a.j);
            xg(a.G)
        },
        nh = function(a) {
            a.J = new vg("gpt_request_slots_have_no_divs", L[29]);
            wg(a.J, a.j);
            xg(a.J)
        };
    var oh = function(a, b, c, d, e) {
        U.call(this, a, b, c, d, e);
        this.u = this.l = 0;
        this.n = !1
    };
    z(oh, U);
    oh.prototype.D = function() {
        return this.k ? "gut_sync_sra" : "gut_sync"
    };
    oh.prototype.aa = function() {
        return this.n ? (this.n = !1, "googletag.impl.pubads.setPassbackAdContents") : "googletag.impl.pubads.setAdContentsBySlotForSync"
    };
    oh.prototype.O = function(a) {
        return a ? "ss" : "s"
    };
    var qh = function(a, b, c) {
        b = a.o(b);
        googletag._tmanager_.tickRepeated("ad_fetch_end", a.u, b[0].l);
        a.u++;
        if (a.k) c = a.j.j, 1 == c.length && ph(a, c[0], void 0);
        else
            for (var d = 0; d < b.length; ++d) ph(a, b[d], c)
    };
    oh.prototype.ga = function(a) {
        if (!this.k) {
            var b;
            b = null;
            var c = ka.getElementsByTagName("script");
            c && c.length && (b = c[c.length - 1]);
            (b = b && b.parentElement) && (this.j.r[F(a)] = b)
        }
    };
    oh.prototype.ha = function(a) {
        var b = "google_temp_div_" + F(a);
        document.write("<div id=" + b + "></div>");
        (b = Sb(b)) && (this.j.q[F(a)] = b)
    };
    oh.prototype.fa = function(a) {
        var b = this.j;
        a = F(a);
        var c = b.q[a];
        c && (c && c.parentNode && c.parentNode.removeChild(c), delete b.q[a])
    };
    oh.prototype.X = function(a) {
        Td(this.j, a);
        var b = this.j.j.length;
        rd(this.csi, "_ga_start", b);
        this.k ? 1 == b ? this.r || (a = this.F(Rd(this.j), 1, !0), a = Hd(a), Zf(a), googletag._tmanager_.tickRepeated("ad_fetch_start", this.l, Rd(this.j)[0].l), this.l++, qg(this, Rd(this.j))) : ph(this, a, void 0) : this.r || (b = this.F([a], 1, !0), b = Hd(b), googletag._tmanager_.tickRepeated("ad_fetch_start", this.l, a.l), this.l++, fc(a, b), Zf(b))
    };
    var ph = function(a, b, c) {
            var d = window,
                e = document,
                f = kg(a, b);
            gc(b);
            if (null == f || f._empty_) a.B(d, e, b, !1), N(b, kc(b));
            else if (a.P) N(b, kc(b));
            else if (f._use_safe_frame_)
                if (c = f._html_) {
                    var d = f._width_,
                        g = f._height_;
                    rh(b, e);
                    var h = H(b) + "__container__",
                        k = '<div id="' + xa(h) + '"></div>';
                    e.write(k);
                    h = e.getElementById(h);
                    null != h && (a.t && (h.style.margin = "auto"), dg(h, H(b), c, d, g), Ag(a, e.getElementById(H(b)), F(b)));
                    N(b, jc(b, f))
                } else N(b, kc(b));
            else if (f._snippet_ && !f._is_afc_) rh(b, e), f = kg(a, b), null != f && (c = sh(a, b, e, f), N(b,
                jc(b, f)), (f = e.getElementById(c)) && Ag(a, f, F(b)));
            else if (d = vb, null != d && -1 != d.indexOf("MSIE ") && -1 == d.indexOf("IEMobile")) {
                e = "googletag.impl.pubads.syncAdSlotLoaded(this, '" + F(b) + "'," + c + ");";
                c = "about:blank";
                if (d = M(a.m, "google_domain_reset_url"))
                    if (g = Rc(Sc(d)[3] || null), null === g || 0 <= g.indexOf(document.domain)) c = d;
                k = c;
                c = f._width_;
                f = f._height_;
                d = a.t;
                rh(b, document);
                g = H(b);
                h = [];
                k = Hd(k);
                h.push('<iframe id="', g, '" name="', g, '" width="', c, '" height="', f, '" vspace="0" hspace="0" allowtransparency="true" ', "scrolling=",
                    a.G ? '"auto"' : '"no"', ' marginwidth="0" marginheight="0" frameborder="0" style=', '"border:0px;left:0;position:absolute;top:0;"', ' src="', k, '"');
                null != e && h.push(' onload="', e, '"');
                h.push("></iframe>");
                e = [];
                k = G(b) + "_ad_container";
                e.push("<div id=", k);
                d && e.push(' style="text-align:center" ');
                e.push(">");
                e.push('<ins style="position:relative;width:' + c + "px;height:" + f + 'px;border:none;display:inline-table;vertical-align:bottom;">' + ('<ins style="position:relative;width:' + c + "px;height:" + f + 'px;border:none;display:block;">' +
                    h.join("") + "</ins>") + "</ins>");
                e.push("</div>");
                document.write(e.join(""));
                (f = document.getElementById(g)) && Ag(a, f, F(b))
            } else rh(b, document), f = sh(a, b, document), e.write('<script>googletag.impl.pubads.createDomIframe("' + f + '" ,"' + F(b) + '",' + a.t + "," + c + ");\x3c/script>")
        },
        sh = function(a, b, c, d) {
            b = G(b) + "_ad_container";
            var e = "<div id=" + b;
            a.t && d ? (e += ' style="width:' + d._width_, e += 'px;margin:auto;">') : e += ">";
            d && (e += d._html_);
            c.write(e + "\n</div>\n");
            return b
        },
        rh = function(a, b) {
            var c = b.getElementById(G(a));
            c && c.parentNode &&
                "" === c.innerHTML && c.parentNode.removeChild(c)
        };
    var th = function() {
            this.l = this.m = this.j = this.k = null
        },
        X = function(a) {
            null == a.k && (a.k = new Pd(lc));
            return a.k
        },
        Z = function(a) {
            if (null != a.j) return a.j;
            switch (M(Y(a), "google_ad_impl")) {
                case "gut_sync_sra":
                    googletag._tmanager_.setSraMode(!0);
                    a.j = new oh(!0, X(a), Y(a), Ue(void 0), uh(a));
                    googletag._tmanager_.addFeature("sync");
                    break;
                case "gut_friendly_iframe":
                    googletag._tmanager_.setSraMode(!1);
                    P(cf, "experiment_all_have_queuing_time") || P(cf, "experiment_sra_zero_queuing_time") ? (a.j = new V(!1, X(a), Y(a), Ue(void 0),
                        uh(a)), googletag._tmanager_.addFeature("async")) : (a.j = new W(!1, X(a), Y(a), Ue(void 0), uh(a)), googletag._tmanager_.addFeature("fif"));
                    break;
                case "gut_friendly_iframe_sra":
                    googletag._tmanager_.setSraMode(!0);
                    P(cf, "experiment_all_have_queuing_time") || P(cf, "experiment_sra_zero_queuing_time") ? (a.j = new V(!0, X(a), Y(a), Ue(void 0), uh(a)), googletag._tmanager_.addFeature("async")) : (a.j = new W(!0, X(a), Y(a), Ue(void 0), uh(a)), googletag._tmanager_.addFeature("fif"));
                    break;
                default:
                    googletag._tmanager_.setSraMode(!1),
                        a.j = new oh(!1, X(a), Y(a), Ue(void 0), uh(a)), googletag._tmanager_.addFeature("sync")
            }
            var b = a.j;
            b.r = null != M(b.m, "google_nofetch") || Boolean(window.google_noFetch) || b.r;
            b.A = null != M(b.m, "google_disable_initial_load") || Boolean(window.google_DisableInitialLoad) || b.A;
            b.P = null != M(b.m, "google_norender") || b.P;
            var c = x(b.Na, b),
                d = window;
            d.attachEvent ? d.attachEvent("onload", c) : d.addEventListener && d.addEventListener("load", c, !1);
            c = x(b.Oa, b);
            d = window;
            d.attachEvent ? d.attachEvent("onunload", c) : d.addEventListener && d.addEventListener("unload",
                c, !1);
            b.$ = md().setupOse(b.v);
            return a.j
        },
        Y = function(a) {
            null == a.m && (a.m = new Od);
            return a.m
        },
        uh = function(a) {
            if (null == a.l) {
                var b = L[12];
                a.l = la && Math.random() < b && la.GA_jstiming && la.GA_jstiming.load && "http:" == la.location.protocol ? new pd(la) : new qd
            }
            return a.l
        },
        vh = null,
        $ = function() {
            vh || (vh = new th);
            return vh
        },
        wh = null,
        xh = function() {
            wh || (wh = new th);
            return wh
        };
    var yh = function() {};
    m = yh.prototype;
    m.addSlot = function(a) {
        if (!a) return null;
        var b = a.getName();
        return b && b.length ? Qd(X($()), a) : null
    };
    m.fillSlot = function(a) {
        var b = $(),
            c = Z(b);
        (a = Xd(X(b), a)) && (null == kg(c, a) || c.k) && (c.ga(a), c.ha(a), c.X(a), c.fa(a))
    };
    m.setCookieOptions = function(a) {
        $();
        var b = Ue(a);
        b.j = a;
        Qe(b)
    };
    m.setTagForChildDirectedTreatment = function(a) {
        X($()).A = a
    };
    m.passback = function(a) {
        if (a) {
            var b = a.getName();
            b && b.length && (b = xh(), a = Qd(X(b), a, !0), b = Z(b), b.n = !0, b.X(a))
        }
    };
    m.disableFetch = function() {
        window.google_noFetch = !0
    };
    m.disableInitialLoad = function() {
        window.google_DisableInitialLoad = !0
    };
    m.addAttribute = function(a, b) {
        var c = X($()),
            d = b;
        if (!oa(a)) {
            oa(d) && (d = "");
            var e = c.o[a];
            c.o[a] = e ? e + "," + d : d
        }
    };
    m.clearAttribute = function(a) {
        var b = X($());
        oa(a) || b.o[a] && delete b.o[a]
    };
    m.addPageCategoryExclusion = function(a) {
        var b = X($());
        oa(a) || (b = b.t, 0 <= Za(b, a) || b.push(a))
    };
    m.clearPageCategoryExclusions = function() {
        X($()).t = []
    };
    m.addAdSensePageAttribute = function(a, b) {
        var c = X($());
        Vc(c.m, a, b)
    };
    m.addAdSenseSlotAttribute = function(a, b, c) {
        var d = X($());
        a && (a = Xd(d, a)) && (a = F(a), null == d.n[a] && (d.n[a] = new Uc(d.D)), Vc(d.n[a], b, c))
    };
    m.enableSingleRequest = function() {
        var a = Y($());
        null == M(a, "google_ad_impl") && (a.j.google_ad_impl = "gut_sync_sra")
    };
    m.collapseEmptyDivs = function(a) {
        var b = Y($());
        b.j.google_collapse_empty_div = "true";
        a && (b.j.google_divs_start_collapsed = "true")
    };
    m.enableAsyncRendering = function() {
        var a = Y($());
        null == M(a, "google_ad_impl") && (a.j.google_ad_impl = "gut_friendly_iframe")
    };
    m.enableAsyncSingleRequest = function() {
        var a = Y($());
        null == M(a, "google_ad_impl") && (a.j.google_ad_impl = "gut_friendly_iframe_sra")
    };
    m.setVideoContentInformation = function(a, b) {
        var c = Z($());
        c.wa = !0;
        c.da = a;
        c.ca = b;
        c.videoStreamCorrelator = Math.floor(4503599627370496 * Math.random())
    };
    m.getVideoContentInformation = function() {
        var a = Z($());
        return {
            cmsid: a.ca,
            vid: a.da
        }
    };
    m.getVideoStreamCorrelator = function() {
        return Z($()).videoStreamCorrelator
    };
    m.refresh = function(a, b) {
        var c = $(),
            d = Z(c),
            c = X(c),
            e = null,
            e = null != a ? zh(a) : Rd(c);
        0 == e.length || d.ja(e, b)
    };
    m.getCorrelator = function() {
        return Z($()).v + ""
    };
    m.setCorrelator = function(a) {
        ig(Z($()), a)
    };
    m.setMobilePlatform = function() {
        Y($()).j.target_platform = "MOBILE"
    };
    m.setApiExperiment = function(a) {
        $e(a)
    };
    m.isAdRequestFinished = function() {
        return Z($()).W()
    };
    m.isSlotAPersistentRoadblock = function(a) {
        if (!a) return !1;
        var b = X($());
        return !!(new dc(a, !1) in b.l)
    };
    m.clearNoRefreshState = function() {
        X($()).l = {}
    };
    m.clearSlotContents = function(a) {
        var b = $(),
            c = Z(b),
            b = X(b),
            d = null,
            d = a ? zh(a) : Rd(b);
        return c.V(d)
    };
    m.setLocation = function(a) {
        X($()).u = a
    };
    m.setPublisherProvidedId = function(a) {
        X($()).B = a
    };
    m.getVersion = function() {
        return "49"
    };
    m.setCenterAds = function(a) {
        X($()).w = a
    };
    var zh = function(a) {
            for (var b = [], c = X($()), d = 0; d < a.length; ++d) {
                var e = Xd(c, a[d]);
                e && b.push(e)
            }
            return b
        },
        Bh = function(a, b) {
            var c;
            c = q.googletag || (q.googletag = {});
            c = c.impl || (c.impl = {});
            c = c.pubads || (c.pubads = {});
            c[a] || (c[a] = b)
        };
    Bh("createDomIframe", function(a, b, c, d) {
        var e;
        e = d ? xh() : $();
        d = Z(e);
        if (e = X(e).k[b]) {
            var f = document,
                g = kg(d, e),
                h = g._width_,
                k = g._height_,
                n = g._html_,
                l = f.createElement("iframe"),
                p = H(e);
            l.id = p;
            l.name = p;
            l.width = h;
            l.height = k;
            l.vspace = 0;
            l.hspace = 0;
            l.allowTransparency = "true";
            l.scrolling = "no";
            l.marginWidth = 0;
            l.marginHeight = 0;
            l.frameBorder = 0;
            l.style.border = 0;
            l.style.position = "absolute";
            l.style.top = 0;
            l.style.left = 0;
            p = rg(f, "ins", l, h, k, "block");
            k = rg(f, "ins", p, h, k, "inline-table");
            k.style.verticalAlign = "bottom";
            a = f.getElementById(a);
            c ? (c = rg(f, "div", k, h, null, "block", "auto"), a.appendChild(c)) : a.appendChild(k);
            l.contentWindow.document.write(n);
            l.contentWindow.document.write("<script>document.close();\x3c/script>");
            N(e, jc(e, g));
            (c = document.getElementById(H(e))) && Ag(d, c, b)
        }
    });
    Bh("setAdContentsBySlot", function(a) {
        Z($()).o(a)
    });
    Bh("setAdContentsBySlotForSync", function(a) {
        qh(Z($()), a)
    });
    Bh("setPassbackAdContents", function(a) {
        qh(Z(xh()), a, !0)
    });
    Bh("setAdContentsBySlotForAsync", function(a, b) {
        Zg(Z($()), a, b)
    });
    Bh("handleResponseReceived", function(a, b) {
        Qg(Z($()), a, b)
    });
    Bh("syncAdSlotLoaded", function(a, b, c) {
        c = Z(c ? xh() : $());
        if (b && (b = c.j.k[b]) && !b.n) {
            b.n = !0;
            c = kg(c, b);
            var d = a.parentNode,
                e = c && c._html_;
            e ? (!c._expandable_ || c._is_afc_ && c._is_3pas_ ? gg(a, e, !0) : d.innerHTML = e, N(b, jc(b, c))) : (d.removeChild(a), N(b, kc(b)))
        }
    });
    Bh("setCookieInfo", function(a) {
        var b;
        $();
        b = Ue(void 0);
        Se(b, a)
    });
    var Ch = $();
    Y(Ch);
    uh(Ch).tick("jl");
    googletag._tmanager_.tick("pubads_load");
    window.google_noFetch = !1;
    window.google_DisableInitialLoad = !1;
    try {
        var Dh = q.googletag.pubads;
        if (ea(Dh)) Dh().onGoogleAdsJsLoad(new yh)
    } catch (Eh) {};
})();