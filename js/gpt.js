(function() {
    var e, k = this,
        l = function(a) {
            return void 0 !== a
        },
        aa = function(a) {
            var b = typeof a;
            if ("object" == b)
                if (a) {
                    if (a instanceof Array) return "array";
                    if (a instanceof Object) return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c) return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable &&
                        !a.propertyIsEnumerable("call")) return "function"
                } else return "null";
            else if ("function" == b && "undefined" == typeof a.call) return "object";
            return b
        },
        m = function(a) {
            return "array" == aa(a)
        },
        ba = function(a) {
            var b = aa(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        },
        n = function(a) {
            return "string" == typeof a
        },
        p = function(a) {
            return "boolean" == typeof a
        },
        q = function(a) {
            return "number" == typeof a
        },
        ca = function(a, b, c) {
            return a.call.apply(a.bind, arguments)
        },
        da = function(a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d =
                    Array.prototype.slice.call(arguments, 2);
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
        ea = function(a, b, c) {
            ea = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ca : da;
            return ea.apply(null, arguments)
        },
        fa = function(a) {
            var b = s;

            function c() {}
            c.prototype = b.prototype;
            a.S = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.R = function(a, c, g) {
                return b.prototype[c].apply(a,
                    Array.prototype.slice.call(arguments, 2))
            }
        };
    var t = function(a, b) {
            var c = parseFloat(a);
            return isNaN(c) || 1 < c || 0 > c ? b : c
        },
        ga = function(a, b) {
            var c = parseInt(a, 10);
            return isNaN(c) ? b : c
        },
        ha = /^([\w-]+\.)*([\w-]{2,})(\:[0-9]+)?$/,
        ia = function(a, b) {
            if (!a) return b;
            var c = a.match(ha);
            return c ? c[0] : b
        };
    var ja = t("0.02", 0),
        ka = t("0.0", 0);
    var la = t("0.005", 0),
        ma = t("0", 0),
        na = t("0.001", 0),
        oa = ga("1500", 1500),
        pa = t("0.01", 0),
        qa = t("1.0", 0),
        ra = t("0.5", 0),
        sa = t("0.005", 0),
        ta = ga("1500", 1500),
        ua = ga("1500",
            1500),
        va = t("", .001),
        wa = ga("", 200),
        xa = t("0.0", 0),
        ya = t("0.00", 0),
        za = t("0.20", 0),
        Aa = /^true$/.test("") ? !0 : !1,
        Ba = t("0.001", 0),
        Ca = t("0.01", 0),
        Da = t("0.00", 0),
        Ea = t("0.00", 0),
        Fa = t("0.001",
            0),
        Ga = t("0.01", 0),
        Ha = t("1", 0),
        Ia = t("", .001);
    var Ja = /^true$/.test("false") ? !0 : !1;
    var Ka = function(a) {
            return /^[\s\xa0]*$/.test(a)
        },
        La = String.prototype.trim ? function(a) {
            return a.trim()
        } : function(a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        },
        Ma = function(a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        };
    var u = function(a, b, c) {
        for (var d in a) Object.prototype.hasOwnProperty.call(a, d) && b.call(c, a[d], d, a)
    };
    var v = function() {
            return k.googletag || (k.googletag = {})
        },
        w = function(a, b, c) {
            var d = v();
            a in d && !c || (d[a] = b)
        },
        Na = function(a, b) {
            a.addEventListener ? a.addEventListener("load", b, !1) : a.attachEvent && a.attachEvent("onload", b)
        };
    var x = {};
    x[1] = ia("", "pagead2.googlesyndication.com");
    x[2] = ia("", "pubads.g.doubleclick.net");
    x[3] = ia("", "securepubads.g.doubleclick.net");
    x[4] = ia("", "partner.googleadservices.com");
    x[5] = "http://pagead2.googlesyndication.com/pagead/show_ads.js";
    x[6] = Ja;
    x[7] = ja;
    x[10] = ma;
    x[11] = na;
    x[12] = la;
    x[13] = oa;
    x[16] = pa;
    x[17] = qa;
    x[18] = ra;
    x[19] = sa;
    x[20] = ka;
    x[21] = ta;
    x[22] = ua;
    x[23] = va;
    x[24] = wa;
    x[25] = xa;
    x[26] = ya;
    x[27] = za;
    x[28] = Ba;
    x[29] = Ca;
    x[30] = Da;
    x[31] = Ea;
    x[32] = Fa;
    x[33] = ia("", "pagead2.googlesyndication.com");
    x[34] = Ha;
    x[36] = Aa;
    x[37] = Ga;
    x[38] = Ia;
    w("_vars_", x);
    var A = Array.prototype,
        Oa = A.indexOf ? function(a, b, c) {
            return A.indexOf.call(a, b, c)
        } : function(a, b, c) {
            c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
            if (n(a)) return n(b) && 1 == b.length ? a.indexOf(b, c) : -1;
            for (; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        },
        Pa = A.forEach ? function(a, b, c) {
            A.forEach.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, f = n(a) ? a.split("") : a, g = 0; g < d; g++) g in f && b.call(c, f[g], g, a)
        },
        Qa = A.map ? function(a, b, c) {
            return A.map.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, f = Array(d), g = n(a) ? a.split("") :
                a, h = 0; h < d; h++) h in g && (f[h] = b.call(c, g[h], h, a));
            return f
        },
        Ra = A.every ? function(a, b, c) {
            return A.every.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, f = n(a) ? a.split("") : a, g = 0; g < d; g++)
                if (g in f && !b.call(c, f[g], g, a)) return !1;
            return !0
        },
        Sa = function(a, b) {
            var c;
            t: {
                c = a.length;
                for (var d = n(a) ? a.split("") : a, f = 0; f < c; f++)
                    if (f in d && b.call(void 0, d[f], f, a)) {
                        c = f;
                        break t
                    }
                c = -1
            }
            return 0 > c ? null : n(a) ? a.charAt(c) : a[c]
        },
        Ta = function(a, b) {
            0 <= Oa(a, b) || a.push(b)
        },
        Ua = function(a) {
            var b = a.length;
            if (0 < b) {
                for (var c = Array(b), d = 0; d <
                    b; d++) c[d] = a[d];
                return c
            }
            return []
        },
        Wa = function(a, b) {
            a.sort(b || Va)
        },
        Ya = function(a) {
            for (var b = Xa, c = 0; c < a.length; c++) a[c] = {
                index: c,
                value: a[c]
            };
            var d = b || Va;
            Wa(a, function(a, b) {
                return d(a.value, b.value) || a.index - b.index
            });
            for (c = 0; c < a.length; c++) a[c] = a[c].value
        },
        Va = function(a, b) {
            return a > b ? 1 : a < b ? -1 : 0
        };
    var Za = function(a) {
            return q(a) && isFinite(a) && 0 == a % 1 && 0 <= a
        },
        $a = function(a) {
            return a.replace(/[^a-zA-Z0-9]/g, function(a) {
                return "&#" + a.charCodeAt() + ";"
            })
        },
        ab = function(a) {
            var b = null,
                c = null;
            try {
                for (; null != a && a !== b;) {
                    c = a.location.protocol;
                    if ("https:" === c) break;
                    else if ("http:" === c || "file:" === c) return "http:";
                    b = a;
                    a = a.parent
                }
            } catch (d) {}
            return "https:"
        };
    var bb = x[36];
    var B = function(a, b) {
        this.b = a;
        this.a = b || []
    };
    B.prototype.getMessageId = function() {
        return this.b
    };
    B.prototype.getMessageArgs = function() {
        return this.a
    };
    var cb = function(a, b, c, d, f) {
        this.b = new Date;
        this.g = d || null;
        this.f = c || null;
        this.c = a;
        this.d = b;
        this.a = f || null
    };
    e = cb.prototype;
    e.getSlot = function() {
        return this.g
    };
    e.getService = function() {
        return this.f
    };
    e.getLevel = function() {
        return this.c
    };
    e.getTimestamp = function() {
        return this.b
    };
    e.getMessage = function() {
        return this.d
    };
    e.getReference = function() {
        return this.a
    };
    var db = ["Debug", "Info", "Warning", "Error", "Fatal"];
    cb.prototype.toString = function() {
        var a = this.b.toTimeString() + ": " + db[this.c] + ": " + this.d;
        this.a && (a += " Duration: " + (this.b.getTime() - this.a.getTimestamp().getTime()) + "ms.");
        return a
    };
    var C = function() {
        this.a = []
    };
    C.prototype.getAllEvents = function() {
        return this.a
    };
    C.prototype.getEventsByService = function(a) {
        return eb(this, function(b) {
            return b.getService() === a
        })
    };
    C.prototype.getEventsBySlot = function(a) {
        return eb(this, function(b) {
            return b.getSlot() === a
        })
    };
    C.prototype.getEventsByLevel = function(a) {
        return eb(this, function(b) {
            return b.getLevel() >= a
        })
    };
    var eb = function(a, b) {
        for (var c = [], d = 0; d < a.a.length; ++d) b(a.a[d]) && c.push(a.a[d]);
        return c
    };
    C.prototype.log = function(a, b, c, d, f) {
        a = new cb(a, b, c, d, f);
        this.a.push(a);
        return a
    };
    var D = function(a, b, c, d, f) {
            return a.log(1, b, c, d, f)
        },
        F = function(a, b, c, d) {
            a.log(2, b, c, d, void 0)
        },
        G = function(a, b, c, d) {
            a.log(3, b, c, d, void 0)
        },
        H = function() {
            var a = v();
            return a.debug_log || (a.debug_log = new C)
        };
    w("getEventLog", H);
    var I = function(a) {
            return function() {
                return new B(a, [])
            }
        },
        J = function(a) {
            return function(b) {
                return new B(a, [b])
            }
        },
        L = function(a) {
            return function(b, c) {
                return new B(a, [b, c])
            }
        },
        M = function(a) {
            return function(b, c, d) {
                return new B(a, [b, c, d])
            }
        },
        fb = function(a) {
            return "[" + Qa(a, function(a) {
                return n(a) ? "'" + a + "'" : m(a) ? fb(a) : String(a)
            }).join(", ") + "]"
        },
        gb = I(1),
        hb = J(2),
        ib = J(3),
        jb = J(4),
        kb = J(5),
        lb = J(6),
        mb = I(8),
        nb = M(9),
        ob = M(10),
        pb = L(12),
        qb = J(13),
        rb = J(14),
        sb = I(16),
        tb = M(17),
        ub = I(19),
        vb = J(20),
        wb = J(21),
        xb = L(22),
        yb = L(23),
        zb =
        J(26),
        Ab = J(27),
        Bb = J(28),
        Cb = J(30),
        Db = L(31),
        Eb = I(34),
        Fb = J(35),
        Gb = M(36),
        Hb = M(37),
        Ib = I(38),
        Jb = J(39),
        Kb = L(40),
        Lb = I(42),
        Mb = L(43),
        Nb = I(44),
        Ob = I(45),
        Pb = J(46),
        Qb = J(47),
        Rb = J(48),
        Sb = I(49),
        Tb = I(50),
        Ub = I(52),
        Vb = L(53),
        Wb = L(54),
        Xb = J(55),
        $b = J(56),
        ac = L(57),
        bc = M(58),
        cc = J(59),
        dc = J(60),
        ec = L(61),
        fc = L(62),
        gc = J(63),
        hc = L(64),
        ic = J(65),
        jc = I(66),
        kc = I(67),
        lc = I(68),
        mc = I(69),
        nc = I(70),
        oc = I(71),
        pc = I(72),
        qc = J(75),
        rc = M(77),
        sc = J(78),
        tc = I(79),
        uc = J(80),
        vc = L(82),
        wc = L(84),
        xc = J(85),
        yc = I(87),
        zc = M(88),
        Ac = J(90),
        Bc = J(92),
        Cc = J(93),
        Dc = J(94),
        Ec = J(95),
        N = function(a, b) {
            var c = fb(Ua(b)),
                c = c.substring(1, c.length - 1);
            return new B(96, [a, c])
        };
    w("getVersion", function() {
        return "49"
    });
    var Gc = function(a) {
            this.b = a;
            this.a = Fc + "/pagead/gen_204?id=" + encodeURIComponent(a)
        },
        Fc = x[6] ? "https://" + x[33] : "http://" + x[33],
        O = function(a, b, c) {
            b && b.match(/^\w+$/) && c && (a.a += "&" + b + "=" + encodeURIComponent(c))
        },
        Hc = function(a, b) {
            if (!l(b) || 0 > b || 1 < b) b = x[23];
            if (Math.random() < b && a.b && a.a) {
                var c = a.a,
                    d = window;
                d.google_image_requests || (d.google_image_requests = []);
                var f = d.document.createElement("img");
                f.src = c;
                d.google_image_requests.push(f)
            }
        };
    var Ic = x[38],
        Jc = function(a, b) {
            var c = {
                methodId: a
            };
            b.name && (c.name = b.name);
            b.message && (c.message = b.message.substring(0, 512));
            b.fileName && (c.fileName = b.fileName);
            b.lineNumber && (c.lineNumber = b.lineNumber);
            if (b.stack) {
                var d;
                var f = b.stack;
                try {
                    -1 == f.indexOf("") && (f = "\n" + f);
                    for (var g; f != g;) g = f, f = f.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                    d = f.replace(/\n */g, "\n")
                } catch (h) {
                    d = ""
                }
                c.stack = d
            }
            return c
        },
        P = function(a, b) {
            if (!b.Q) try {
                b.Q = !0;
                var c = Jc(a, b),
                    d = new Gc("gpt_exception");
                O(d, "vrg", "49");
                u(c,
                    function(a, b) {
                        O(d, b, a)
                    });
                Hc(d, Ic)
            } catch (f) {}
            throw b;
        };
    var Kc = function() {
        this.b = this.a = 0
    };
    Kc.prototype.push = function(a) {
        try {
            for (var b = H(), c = 0; c < arguments.length; ++c) try {
                "function" == aa(arguments[c]) && (arguments[c](), this.a++)
            } catch (d) {
                this.b++, G(b, Cb(String(d.message)))
            }
            D(b, Db(String(this.a), String(this.b)));
            return this.a
        } catch (f) {
            P(1001, f)
        }
    };
    (function() {
        function a(a) {
            this.t = {};
            this.tick = function(a, b, c) {
                this.t[a] = [void 0 != c ? c : (new Date).getTime(), b];
                if (void 0 == c) try {
                    window.console.timeStamp("CSI/" + a)
                } catch (d) {}
            };
            this.tick("start", null, a)
        }
        var b;
        window.performance && (b = window.performance.timing);
        var c = b ? new a(b.responseStart) : new a;
        window.GPT_jstiming = {
            Timer: a,
            load: c
        };
        b && (c = b.navigationStart, b = b.responseStart, 0 < c && b >= c && (window.GPT_jstiming.srt = b - c));
        try {
            b = null, window.chrome && window.chrome.csi && (b = Math.floor(window.chrome.csi().pageT)), null ==
                b && window.gtbExternal && (b = window.gtbExternal.pageT()), null == b && window.external && (b = window.external.pageT), b && (window.GPT_jstiming.pt = b)
        } catch (d) {}
    })();
    if (window.GPT_jstiming) {
        window.GPT_jstiming.N = {};
        window.GPT_jstiming.P = 1;
        var Lc = function(a, b, c) {
            var d = a.t[b],
                f = a.t.start;
            if (d && (f || c)) return d = a.t[b][0], void 0 != c ? f = c : f = f[0], d - f
        };
        window.GPT_jstiming.getTick = Lc;
        var Mc = function(a, b, c) {
                var d = "";
                window.GPT_jstiming.srt && (d += "&srt=" + window.GPT_jstiming.srt);
                window.GPT_jstiming.pt && (d += "&tbsrt=" + window.GPT_jstiming.pt);
                try {
                    window.external && window.external.tran ? d += "&tran=" + window.external.tran : window.gtbExternal && window.gtbExternal.tran ? d += "&tran=" + window.gtbExternal.tran() :
                        window.chrome && window.chrome.csi && (d += "&tran=" + window.chrome.csi().tran)
                } catch (f) {}
                var g = window.chrome;
                if (g && (g = g.loadTimes)) {
                    g().wasFetchedViaSpdy && (d += "&p=s");
                    if (g().wasNpnNegotiated) {
                        var d = d + "&npn=1",
                            h = g().npnNegotiatedProtocol;
                        h && (d += "&npnv=" + (encodeURIComponent || escape)(h))
                    }
                    g().wasAlternateProtocolAvailable && (d += "&apa=1")
                }
                var r = a.t,
                    K = r.start,
                    g = [],
                    h = [],
                    y;
                for (y in r)
                    if ("start" != y && 0 != y.indexOf("_")) {
                        var z = r[y][1];
                        z ? r[z] && h.push(y + "." + Lc(a, y, r[z][0])) : K && g.push(y + "." + Lc(a, y))
                    }
                if (b)
                    for (var E in b) d +=
                        "&" + E + "=" + b[E];
                (b = c) || (b = "https:" == document.location.protocol ? "https://csi.gstatic.com/csi" : "http://csi.gstatic.com/csi");
                return [b, "?v=3", "&s=" + (window.GPT_jstiming.sn || "gpt") + "&action=", a.name, h.length ? "&it=" + h.join(",") : "", d, "&rt=", g.join(",")].join("")
            },
            Nc = function(a, b, c) {
                a = Mc(a, b, c);
                if (!a) return "";
                b = new Image;
                var d = window.GPT_jstiming.P++;
                window.GPT_jstiming.N[d] = b;
                b.onload = b.onerror = function() {
                    window.GPT_jstiming && delete window.GPT_jstiming.N[d]
                };
                b.src = a;
                b = null;
                return a
            };
        window.GPT_jstiming.report =
            function(a, b, c) {
                if ("prerender" == document.webkitVisibilityState) {
                    var d = !1,
                        f = function() {
                            if (!d) {
                                b ? b.prerender = "1" : b = {
                                    prerender: "1"
                                };
                                var g;
                                "prerender" == document.webkitVisibilityState ? g = !1 : (Nc(a, b, c), g = !0);
                                g && (d = !0, document.removeEventListener("webkitvisibilitychange", f, !1))
                            }
                        };
                    document.addEventListener("webkitvisibilitychange", f, !1);
                    return ""
                }
                return Nc(a, b, c)
            }
    };
    var Oc = function(a, b) {
            for (var c in a)
                if (b.call(void 0, a[c], c, a)) return !0;
            return !1
        },
        Pc = function(a, b) {
            for (var c in a)
                if (a[c] == b) return !0;
            return !1
        };
    var Qc = function(a, b) {
        this.width = a;
        this.height = b
    };
    e = Qc.prototype;
    e.clone = function() {
        return new Qc(this.width, this.height)
    };
    e.isEmpty = function() {
        return !(this.width * this.height)
    };
    e.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    e.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    e.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var Q;
    t: {
        var Rc = k.navigator;
        if (Rc) {
            var Sc = Rc.userAgent;
            if (Sc) {
                Q = Sc;
                break t
            }
        }
        Q = ""
    }
    var R = function(a) {
        return -1 != Q.indexOf(a)
    };
    var Tc = R("Opera") || R("OPR"),
        S = R("Trident") || R("MSIE"),
        Uc = R("Gecko") && -1 == Q.toLowerCase().indexOf("webkit") && !(R("Trident") || R("MSIE")),
        Vc = -1 != Q.toLowerCase().indexOf("webkit"),
        Wc = function() {
            var a = k.document;
            return a ? a.documentMode : void 0
        },
        Xc = function() {
            var a = "",
                b;
            if (Tc && k.opera) return a = k.opera.version, "function" == aa(a) ? a() : a;
            Uc ? b = /rv\:([^\);]+)(\)|;)/ : S ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : Vc && (b = /WebKit\/(\S+)/);
            b && (a = (a = b.exec(Q)) ? a[1] : "");
            return S && (b = Wc(), b > parseFloat(a)) ? String(b) : a
        }(),
        Yc = {},
        Zc = function(a) {
            if (!Yc[a]) {
                for (var b = 0, c = La(String(Xc)).split("."), d = La(String(a)).split("."), f = Math.max(c.length, d.length), g = 0; 0 == b && g < f; g++) {
                    var h = c[g] || "",
                        r = d[g] || "",
                        K = RegExp("(\\d*)(\\D*)", "g"),
                        y = RegExp("(\\d*)(\\D*)", "g");
                    do {
                        var z = K.exec(h) || ["", "", ""],
                            E = y.exec(r) || ["", "", ""];
                        if (0 == z[0].length && 0 == E[0].length) break;
                        b = Ma(0 == z[1].length ? 0 : parseInt(z[1], 10), 0 == E[1].length ? 0 : parseInt(E[1], 10)) || Ma(0 == z[2].length, 0 == E[2].length) || Ma(z[2], E[2])
                    } while (0 == b)
                }
                Yc[a] = 0 <= b
            }
        },
        $c = k.document,
        ad = $c && S ? Wc() ||
        ("CSS1Compat" == $c.compatMode ? parseInt(Xc, 10) : 5) : void 0;
    var bd;
    if (!(bd = !Uc && !S)) {
        var cd;
        if (cd = S) cd = S && 9 <= ad;
        bd = cd
    }
    bd || Uc && Zc("1.9.1");
    S && Zc("9");
    var dd = {
            T: "slotRenderEnded"
        },
        ed = function(a, b, c) {
            this.slot = a;
            this.isEmpty = !1;
            this.size = b;
            this.lineItemId = this.creativeId = null;
            this.serviceName = c
        };
    var s = function() {
        this.L = [];
        this.M = {};
        this.b = !1;
        this.m = {};
        this.log = H();
        D(this.log, Fb(this.getName()), this)
    };
    e = s.prototype;
    e.getName = function() {
        return "unknown"
    };
    e.getVersion = function() {
        return "unversioned"
    };
    e.getSlots = function() {
        return this.L
    };
    e.getSlotIdMap = function() {
        return this.M
    };
    e.enable = function() {
        if (this.b) D(this.log, Ib(), this);
        else {
            this.b = !0;
            try {
                this.A()
            } catch (a) {
                G(this.log, Jb(String(a)), this)
            }
        }
    };
    e.w = function(a) {
        this.L.push(a);
        this.M[a.getSlotId().getId()] = a;
        D(this.log, Kb(this.getName(), a.getName()), this, a)
    };
    e.addEventListener = function(a, b) {
        try {
            if ("function" != aa(b) || !n(a)) {
                var c = N("Service.addEventListener", arguments);
                F(this.log, c, this);
                return this
            }
            if (!Pc(dd, a)) return F(this.log, Cc(a), this), this;
            c = a;
            m(this.m[c]) || (this.m[c] = []);
            this.m[c].push(b);
            return this
        } catch (d) {
            P(1401, d)
        }
    };
    var fd = function(a, b) {
        var c = a.m.slotRenderEnded;
        m(c) && Pa(c, function(a) {
            try {
                a(b)
            } catch (c) {
                a = c && n(c.name) ? c.name : null;
                var g = c && n(c.message) ? c.message : null,
                    h = "";
                a && g ? h = a + ": " + g : a ? h = a : g && (h = g);
                F(this.log, Bc(h), this)
            }
        }, a)
    };
    var gd = {
            load: !0,
            gpt_load: !0,
            _pubads_load_start: !0,
            pubads_load: !0
        },
        hd = {
            ad_fetch_start: !0
        },
        id = {
            pubads_load: "_pubads_load_start",
            ad_fetch_end: "ad_fetch_start"
        },
        jd = {},
        kd = function() {
            this.f = !1;
            k.GPT_jstiming && k.GPT_jstiming.load && ("http:" == k.location.protocol || "https:" == k.location.protocol) && Math.random() < x[37] && (this.f = !0);
            this.a = this.d = null;
            this.j = !1;
            this.k = window.GPT_jstiming.getTick(window.GPT_jstiming.load, "start", 0);
            this.c = window.GPT_jstiming.load;
            this.c.name = "global";
            this.b = {};
            this.b.load = !1;
            this.b.gpt_load = !1;
            this.b._pubads_load_start = !1;
            this.b.pubads_load = !1;
            this.g = 500;
            this.i = [];
            this.h = {};
            this.m = !1
        },
        md = function(a, b, c, d, f) {
            c && a.c ? (a.c.tick(b, d, f), ld(a, !0)) : c || (a.a || (a.a = new k.GPT_jstiming.Timer(a.k), a.a.name = "ad_events"), a.a.tick(b, d, f), 0 != b.indexOf("_") && (a.j = !0))
        };
    kd.prototype.tick = function(a, b) {
        if (this.f) {
            var c = gd.hasOwnProperty(a),
                d = b ? ".psbk" : "";
            a += d;
            var f = id[a];
            f && (f += d);
            c && (this.b[a] = !0);
            md(this, a, c, f)
        }
    };
    var ld = function(a, b) {
        if (a.f) {
            var c = "https:" == k.location.protocol ? "https://www.google.com/csi" : "http://csi.gstatic.com/csi",
                d = {
                    vrg: "49"
                };
            a.i.length && (d.e = a.i.join());
            b && a.c && null != a.c && a.b.load && a.b.gpt_load && a.b._pubads_load_start == a.b.pubads_load ? (k.GPT_jstiming.report(a.c, d, c), a.c = null) : b || (a.a && a.j && (k.GPT_jstiming.report(a.a, d, c), a.a = null, a.j = !1, a.g = 32E3 < 2 * a.g ? 32E3 : 2 * a.g), window.setTimeout(ea(function() {
                ld(this, !1)
            }, a), a.g))
        }
    };
    kd.prototype.tickRepeated = function(a, b, c) {
        if (this.f && !(4 < b)) {
            var d = id[a],
                f = gd.hasOwnProperty(a),
                g = a,
                h = d,
                r = "";
            c && (r = ".psbk");
            d && (h = this.d && jd[d] ? h + (".sra" + r) : h + (r + "." + b));
            g = this.d && jd[a] ? g + (".sra" + r) : g + (r + "." + b);
            h && this.h.hasOwnProperty("_" + h) && (h = "_" + h, md(this, h, !1, void 0, this.h[h] + this.k), delete this.h[h]);
            md(this, g, f, h);
            f || "ad_fetch_start" != a || this.m || (md(this, "first_ad_fetch_start" + r, !1, void 0, window.GPT_jstiming.getTick(this.a, g) + this.k), this.m = !0);
            hd.hasOwnProperty(a) && (a = window.GPT_jstiming.getTick(this.a,
                g), this.h["_" + g] = a)
        }
    };
    kd.prototype.addFeature = function(a) {
        0 < a.length && Ta(this.i, a)
    };
    kd.prototype.setSraMode = function(a) {
        null === this.d && ((this.d = a) ? this.addFeature("sra") : this.addFeature("non-sra"))
    };
    var od = function() {
            return v()._tmanager_ || nd()
        },
        nd = function() {
            var a = new kd;
            w("_tmanager_", a);
            ld(a, !1);
            Na(window, function() {
                a.tick("load")
            });
            return a
        };
    var pd = function() {
            this.a = {};
            this.b = !1;
            this.c = H();
            this.f = D(this.c, mb());
            Na(window, ea(pd.prototype.d, this))
        },
        qd = function(a, b) {
            var c = null;
            b in a.a && (c = a.a[b]);
            return c
        },
        rd = function() {
            var a = T();
            u(a.a, function(a, c) {
                a.enable();
                od().addFeature(c)
            })
        };
    pd.prototype.d = function() {
        this.b = !0;
        D(this.c, gb(), null, null, this.f)
    };
    var T = function() {
        var a = v();
        return a.service_manager_instance || (a.service_manager_instance = new pd)
    };
    w("enableServices", function() {
        try {
            rd()
        } catch (a) {
            P(1801, a)
        }
    });
    var sd = function(a) {
            return m(a) && 2 == a.length && Za(a[0]) && Za(a[1])
        },
        td = function(a) {
            return m(a) && 1 < a.length && q(a[0]) && q(a[1])
        };
    var ud = function(a, b) {
        this.b = a;
        this.a = b
    };
    ud.prototype.getWidth = function() {
        return this.b
    };
    ud.prototype.getHeight = function() {
        return this.a
    };
    var vd = function(a) {
        var b = [];
        if (m(a))
            if (td(a)) b.push(new ud(a[0], a[1]));
            else
                for (var c = 0; c < a.length; ++c) {
                    var d = a[c];
                    td(d) && b.push(new ud(d[0], d[1]))
                }
            return b
    };
    var wd = function(a, b) {
        this.a = a;
        this.b = b
    };
    wd.prototype.clone = function() {
        return new wd(this.a, this.b)
    };
    var xd = function(a) {
            this.a = a
        },
        yd = function(a, b) {
            var c = Sa(a.a, function(a) {
                a = a.a;
                return a.width <= b.width && a.height <= b.height
            });
            return null == c ? null : c.b
        },
        zd = function(a) {
            if (!m(a) || 2 != a.length) throw Error("Each mapping entry has to be an array of size 2");
            var b;
            b = a[0];
            if (!sd(b)) throw Error("Size has to be an array of two non-negative integers");
            b = new Qc(b[0], b[1]);
            if (m(a[1]) && 0 == a[1].length) a = [];
            else if (a = vd(a[1]), 0 == a.length) throw Error("At least one slot size must be present");
            return new wd(b, a)
        };
    var Ad = function(a, b, c) {
        this.b = a;
        this.c = q(b) ? b : 0;
        this.a = this.b + "_" + this.c;
        this.d = c || "gpt_unit_" + this.a
    };
    e = Ad.prototype;
    e.getId = function() {
        return this.a
    };
    e.getName = function() {
        return this.b
    };
    e.getInstance = function() {
        return this.c
    };
    e.toString = Ad.prototype.getId;
    e.getDomId = function() {
        return this.d
    };
    var Bd = function(a, b, c, d) {
        this.j = a;
        this.v = vd(c);
        this.l = null;
        this.b = new Ad(a, b, d);
        this.c = [];
        this.f = {};
        this.h = null;
        this.a = H();
        D(this.a, hb(this.b.toString()), null, this);
        this.g = this.k = null;
        this.n = this.s = "";
        this.m = !0;
        this.d = {};
        this.i = [];
        this.u = !1;
        this.r = this.q = null;
        this.o = 0;
        this.p = -1
    };
    e = Bd.prototype;
    e.set = function(a, b) {
        try {
            if (!n(a) || !b) return F(this.a, N("Slot.set", arguments), null, this), this;
            var c = this.getName();
            this.f[a] = b;
            this.k || this.g ? F(this.a, ob(a, String(b), c), null, this) : D(this.a, nb(a, String(b), c), null, this);
            return this
        } catch (d) {
            P(201, d)
        }
    };
    e.get = function(a) {
        try {
            return n(a) ? this.f.hasOwnProperty(a) ? this.f[a] : null : (F(this.a, N("Slot.get", arguments), null, this), null)
        } catch (b) {
            P(202, b)
        }
    };
    e.getAttributeKeys = function() {
        try {
            var a = [];
            u(this.f, function(b, d) {
                a.push(d)
            });
            return a
        } catch (b) {
            P(203, b)
        }
    };
    e.addService = function(a) {
        try {
            var b = T();
            if (!Pc(b.a, a)) return F(this.a, Dc(this.b.toString()), null, this), this;
            for (b = 0; b < this.c.length; ++b)
                if (a == this.c[b]) return F(this.a, pb(a.getName(), this.b.toString()), a, this), this;
            this.c.push(a);
            a.w(this);
            return this
        } catch (c) {
            P(204, c)
        }
    };
    e.getName = function() {
        return this.j
    };
    e.getAdUnitPath = function() {
        try {
            return this.j
        } catch (a) {
            P(215, a)
        }
    };
    e.getSlotId = function() {
        return this.b
    };
    e.getServices = function() {
        return this.c
    };
    e.getSizes = function(a, b) {
        return q(a) && q(b) && this.l ? yd(this.l, new Qc(a, b)) : this.v
    };
    e.defineSizeMapping = function(a) {
        try {
            if (!m(a)) throw Error("Size mapping has to be an array");
            var b = Qa(a, zd);
            this.l = new xd(b)
        } catch (c) {
            F(this.a, qb(c.message), null, this)
        }
        return this
    };
    e.hasWrapperDiv = function() {
        return !!document.getElementById(this.b.getDomId())
    };
    e.setClickUrl = function(a) {
        try {
            if (!n(a)) return F(this.a, N("Slot.setClickUrl", arguments), null, this), this;
            this.n = a;
            return this
        } catch (b) {
            P(206, b)
        }
    };
    e.getClickUrl = function() {
        return this.n
    };
    e.setCategoryExclusion = function(a) {
        try {
            return n(a) && !Ka(null == a ? "" : String(a)) ? (Ta(this.i, a), D(this.a, rb(a), null, this)) : F(this.a, N("Slot.setCategoryExclusion", arguments), null, this), this
        } catch (b) {
            P(207, b)
        }
    };
    e.clearCategoryExclusions = function() {
        try {
            return D(this.a, sb(), null, this), this.i = [], this
        } catch (a) {
            P(208, a)
        }
    };
    e.getCategoryExclusions = function() {
        try {
            return Ua(this.i)
        } catch (a) {
            P(209, a)
        }
    };
    e.setTargeting = function(a, b) {
        try {
            var c = [];
            m(b) ? c = b : b && c.push(b.toString());
            n(a) ? (D(this.a, tb(a, c.join(), this.getName()), null, this), this.d[a] = c) : F(this.a, N("Slot.setTargeting", arguments), null, this);
            return this
        } catch (d) {
            P(210, d)
        }
    };
    e.clearTargeting = function() {
        try {
            return D(this.a, ub(), null, this), this.d = {}, this
        } catch (a) {
            P(211, a)
        }
    };
    e.getTargetingMap = function() {
        var a = this.d,
            b = {},
            c;
        for (c in a) b[c] = a[c];
        return b
    };
    e.getTargeting = function(a) {
        try {
            return n(a) ? this.d.hasOwnProperty(a) ? Ua(this.d[a]) : [] : (F(this.a, N("Slot.getTargeting", arguments), null, this), [])
        } catch (b) {
            P(212, b)
        }
    };
    e.getTargetingKeys = function() {
        try {
            var a = [];
            u(this.d, function(b, d) {
                a.push(d)
            });
            return a
        } catch (b) {
            P(213, b)
        }
    };
    e.getOutOfPage = function() {
        return this.u
    };
    e.getAudExtId = function() {
        return this.o
    };
    e.setTagForChildDirectedTreatment = function(a) {
        if (0 === a || 1 === a) this.p = a
    };
    e.gtfcd = function() {
        return this.p
    };
    e.setCollapseEmptyDiv = function(a, b) {
        try {
            if (!p(a) || b && !p(b)) return F(this.a, N("Slot.setCollapseEmptyDiv", arguments), null, this), this;
            this.r = (this.q = a) && Boolean(b);
            b && !a && F(this.a, vb(this.b.toString()), null, this);
            return this
        } catch (c) {
            P(214, c)
        }
    };
    e.getCollapseEmptyDiv = function() {
        return this.q
    };
    e.getDivStartsCollapsed = function() {
        return this.r
    };
    var Cd = function(a, b) {
        if (!a.hasWrapperDiv()) return G(a.a, wb(a.b.toString()), null, a), !1;
        var c = k.document,
            d = a.b.getDomId(),
            c = c && c.getElementById(d);
        if (!c) return G(a.a, xb(d, a.b.toString()), null, a), !1;
        d = a.h;
        return n(d) && 0 < d.length ? (a.renderStarted(), c.innerHTML = d, a.renderEnded(b), !0) : !1
    };
    e = Bd.prototype;
    e.fetchStarted = function(a) {
        this.k = D(this.a, ib(this.getName()), null, this);
        this.s = a
    };
    e.getContentUrl = function() {
        return this.s
    };
    e.fetchEnded = function() {
        D(this.a, jb(this.getName()), null, this, this.k)
    };
    e.renderStarted = function() {
        this.g = D(this.a, kb(this.getName()), null, this)
    };
    e.renderEnded = function(a) {
        D(this.a, lb(this.getName()), null, this, this.g);
        Pa(this.c, function(b) {
            b.getName() == a.serviceName && fd(b, a)
        })
    };
    var Dd = function() {
            this.a = {};
            this.b = {};
            this.c = H()
        },
        Ed = function(a, b, c, d) {
            if (!n(b) || 0 >= b.length || !c) return null;
            b in a.a || (a.a[b] = []);
            c = new Bd(b, a.a[b].length, c, d);
            d = c.getSlotId().getDomId();
            if (a.b[d]) return G(a.c, Bb(d)), null;
            a.a[b].push(c);
            return a.b[c.getSlotId().getDomId()] = c
        };
    Dd.prototype.d = function(a, b) {
        var c = b || 0,
            d = n(a) && this.a[a] || [];
        return 0 <= c && c < d.length && (d = d[c], d.getSlotId().getInstance() == c) ? d : null
    };
    var Fd = function(a, b) {
            return Oc(a.a, function(a) {
                return 0 <= Oa(a, b)
            })
        },
        U = function() {
            var a = v();
            return a.slot_manager_instance || (a.slot_manager_instance = new Dd)
        },
        V = function(a, b, c) {
            try {
                var d = U();
                return d && Ed(d, a, b, c)
            } catch (f) {
                P(802, f)
            }
        };
    w("defineOutOfPageSlot", function(a, b) {
        try {
            var c = U();
            if (!c) return null;
            var d = Ed(c, a, [1, 1], b);
            return d ? (d.u = !0, d) : null
        } catch (f) {
            P(801, f)
        }
    });
    w("defineSlot", V);
    w("defineUnit", V);
    Dd.prototype.find = Dd.prototype.d;
    Dd.getInstance = U;
    var Gd = function(a) {
        try {
            var b = H();
            if (n(a)) {
                var c, d = U();
                if (c = d.b[a] ? d.b[a] : null)
                    if (c.m && !c.hasWrapperDiv()) F(c.a, yb(c.j, c.b.getDomId()), null, c);
                    else
                        for (a = 0; a < c.c.length; ++a) c.c[a].b && c.c[a].p(c);
                else G(b, Ab(String(a)))
            } else G(b, zb(String(a)))
        } catch (f) {
            P(2201, f)
        }
    };
    w("display", Gd, !0);
    var Hd = /#|$/,
        Id = function(a, b) {
            var c = a.search(Hd),
                d;
            t: {
                d = 0;
                for (var f = b.length; 0 <= (d = a.indexOf(b, d)) && d < c;) {
                    var g = a.charCodeAt(d - 1);
                    if (38 == g || 63 == g)
                        if (g = a.charCodeAt(d + f), !g || 61 == g || 38 == g || 35 == g) break t;
                    d += f + 1
                }
                d = -1
            }
            if (0 > d) return null;
            f = a.indexOf("&", d);
            if (0 > f || f > c) f = c;
            d += b.length + 1;
            return decodeURIComponent(a.substr(d, f - d).replace(/\+/g, " "))
        };
    var Jd = null,
        Kd = Uc || Vc || Tc || "function" == typeof k.atob;
    var Md = function(a, b, c) {
            var d = Ld++;
            this.a = new Bd(a, d, b);
            this.a.addService(c);
            this.b = c
        },
        Ld = 1;
    e = Md.prototype;
    e.setClickUrl = function(a) {
        try {
            return this.a.setClickUrl(a), this
        } catch (b) {
            P(1202, b)
        }
    };
    e.setTargeting = function(a, b) {
        try {
            return this.a.setTargeting(a, b), this
        } catch (c) {
            P(1204, c)
        }
    };
    e.setAudExtId = function(a) {
        try {
            return Za(a) && (this.a.o = a), this
        } catch (b) {
            P(1205, b)
        }
    };
    e.setTagForChildDirectedTreatment = function(a) {
        try {
            return this.a.setTagForChildDirectedTreatment(a), this
        } catch (b) {
            P(1203, b)
        }
    };
    e.display = function() {
        try {
            Nd(this.b, this.a)
        } catch (a) {
            P(1201, a)
        }
    };
    var Od = !1,
        W = null,
        Pd = function(a) {
            W && (O(W, "p", String(a)), Od ? Hc(W, 1) : Od = !0)
        };
    var Qd = function(a, b) {
            this.a = a;
            this.b = b || {
                changeCorrelator: !0
            }
        },
        X = function() {
            s.call(this);
            this.g = !1;
            this.a = null;
            this.D = 0;
            this.n = -1;
            this.o = {};
            this.j = {};
            this.v = [];
            this.B = this.u = "";
            this.I = !1;
            this.G = !0;
            this.f = this.F = !1;
            this.c = bb ? !1 : !0;
            this.H = bb;
            this.q = this.i = !1;
            this.d = [];
            this.l = [];
            this.h = [];
            this.C = {};
            this.s = !1;
            this.k = -1;
            this.J = this.K = "";
            this.r = [];
            null !== Id(window.location.href, "google_force_safeframe_image") && this.r.push("108809020")
        };
    fa(X);
    var Rd = {
        adsense_ad_format: "google_ad_format",
        adsense_ad_types: "google_ad_type",
        adsense_allow_expandable_ads: "google_allow_expandable_ads",
        adsense_background_color: "google_color_bg",
        adsense_bid: "google_bid",
        adsense_border_color: "google_color_border",
        adsense_channel_ids: "google_ad_channel",
        adsense_content_section: "google_ad_section",
        adsense_cpm: "google_cpm",
        adsense_ed: "google_ed",
        adsense_encoding: "google_encoding",
        adsense_family_safe: "google_safe",
        adsense_feedback: "google_feedback",
        adsense_flash_version: "google_flash_version",
        adsense_font_face: "google_font_face",
        adsense_font_size: "google_font_size",
        adsense_hints: "google_hints",
        adsense_host: "google_ad_host",
        adsense_host_channel: "google_ad_host_channel",
        adsense_host_tier_id: "google_ad_host_tier_id",
        adsense_keyword_type: "google_kw_type",
        adsense_keywords: "google_kw",
        adsense_line_color: "google_line_color",
        adsense_link_color: "google_color_link",
        adsense_relevant_content: "google_contents",
        adsense_reuse_colors: "google_reuse_colors",
        adsense_targeting: "google_targeting",
        adsense_targeting_types: "google_targeting",
        adsense_test_mode: "google_adtest",
        adsense_text_color: "google_color_text",
        adsense_ui_features: "google_ui_features",
        adsense_ui_version: "google_ui_version",
        adsense_url_color: "google_color_url",
        alternate_ad_iframe_color: "google_alternate_color",
        alternate_ad_url: "google_alternate_ad_url",
        demographic_age: "google_cust_age",
        demographic_ch: "google_cust_ch",
        demographic_gender: "google_cust_gender",
        demographic_interests: "google_cust_interests",
        demographic_job: "google_cust_job",
        demographic_l: "google_cust_l",
        demographic_lh: "google_cust_lh",
        demographic_u_url: "google_cust_u_url",
        demographic_unique_id: "google_cust_id",
        document_language: "google_language",
        geography_override_city: "google_city",
        geography_override_country: "google_country",
        geography_override_region: "google_region",
        page_url: "google_page_url"
    };
    e = X.prototype;
    e.set = function(a, b) {
        try {
            if (!(n(a) && 0 < a.length)) return F(this.log, N("PubAdsService.set", arguments), this, null), this;
            this.o[a] = b;
            D(this.log, Gb(a, String(b), this.getName()), this, null);
            return this
        } catch (c) {
            P(21, c)
        }
    };
    e.get = function(a) {
        try {
            return this.o[a]
        } catch (b) {
            P(22, b)
        }
    };
    e.getAttributeKeys = function() {
        try {
            var a = [];
            u(this.o, function(b, d) {
                a.push(d)
            });
            return a
        } catch (b) {
            P(23, b)
        }
    };
    e.display = function(a, b, c, d) {
        try {
            this.enable();
            var f = c ? V(a, b, c) : V(a, b);
            f.addService(this);
            d && f.setClickUrl(d);
            Gd(f.getSlotId().getDomId())
        } catch (g) {
            P(24, g)
        }
    };
    e.A = function() {
        if (this.c) {
            if (!this.g) {
                Pd(!0);
                var a = document,
                    b = a.createElement("script");
                T();
                b.async = !0;
                b.type = "text/javascript";
                b.src = Sd();
                (a = a.getElementsByTagName("head")[0] || a.getElementsByTagName("body")[0]) ? (D(this.log, Pb("GPT PubAds"), this), od().tick("_pubads_load_start"), a.appendChild(b), this.g = !0) : G(this.log, Qb("GPT PubAds"), this)
            }
        } else Td(this)
    };
    e.getName = function() {
        return "publisher_ads"
    };
    var Sd = function() {
            return ab(window) + "//partner.googleadservices.com/gpt/pubads_impl_49.js"
        },
        Td = function(a) {
            var b = T();
            a.g || b.b || (Pd(!1), b = document, a.g = !0, od().tick("_pubads_load_start"), b.write('<script type="text/javascript" src="' + $a(Sd()) + '">\x3c/script>'))
        };
    X.prototype.fillSlot = function(a) {
        D(this.log, Tb());
        this.a.fillSlot(a);
        this.C[a.getName()] = !0;
        if (this.a)
            for (a = 0; a < this.h.length; a++) {
                var b = this.h[a];
                b.a[0].getName() in this.C && (this.refresh(b.a, b.b), A.splice.call(this.h, a, 1), a--)
            } else G(this.log, Sb(), this)
    };
    X.prototype.onGoogleAdsJsLoad = function(a) {
        this.a = a;
        D(this.log, Rb("GPT"), this);
        this.a.setCookieOptions(this.D);
        this.a.setTagForChildDirectedTreatment(this.n);
        Pa(this.r, function(a) {
            this.a.setApiExperiment(a)
        }, this);
        this.a.setCenterAds(this.H);
        bb && (this.f = !1, this.a.setMobilePlatform());
        this.G || this.a.disableFetch();
        this.i && this.a.collapseEmptyDivs(this.q);
        if (this.f) {
            this.c ? this.a.enableAsyncSingleRequest() : this.a.enableSingleRequest();
            Ud(this);
            a = this.getSlots();
            for (var b = 0; b < a.length; ++b) Vd(this, a[b])
        } else this.c &&
            this.a.enableAsyncRendering();
        this.F && this.a.disableInitialLoad();
        Wd(this);
        Xd(this);
        if (0 < this.d.length)
            for (b = 0; b < this.d.length; ++b) this.p(this.d[b]);
        if (0 < this.l.length)
            for (b = 0; b < this.l.length; ++b) Nd(this, this.l[b])
    };
    X.prototype.w = function(a) {
        this.c || (a.m = !1);
        s.prototype.w.call(this, a)
    };
    X.prototype.p = function(a) {
        if (T().b && !this.c) G(this.log, Ub(), this);
        else if (this.a) Ud(this), Vd(this, a) && this.fillSlot(a);
        else if (this.c || this.g && 0 == this.d.length) {
            for (var b = !1, c = 0; c < this.d.length; ++c) a === this.d[c] && (b = !0);
            b || (D(this.log, Vb(a.getName(), "GPT"), this, a), this.d.push(a))
        } else G(this.log, Xb(a.getName()), this, a)
    };
    var Vd = function(a, b) {
            if (a.a && null == a.a.addSlot(b)) return G(a.log, $b(b.getName()), a, b), !1;
            for (var c = b.getAttributeKeys(), d = 0; d < c.length; ++d) c[d] in Rd ? a.a.addAdSenseSlotAttribute(b, Rd[c[d]], String(b.get(c[d]))) : F(a.log, bc(String(c[d]), String(b.get(c[d])), b.getName()), a, b);
            return !0
        },
        Ud = function(a) {
            if (!a.I) {
                a.I = !0;
                for (var b = a.getAttributeKeys(), c = 0; c < b.length; ++c) b[c] in Rd ? a.a.addAdSensePageAttribute(Rd[b[c]], String(a.get(b[c]))) : F(a.log, ac(String(b[c]), String(a.get(b[c]))), a);
                a.a.addAdSensePageAttribute("google_tag_info",
                    "v2");
                u(a.j, function(a, b) {
                    if (m(a))
                        for (var c = 0; c < a.length; ++c) this.a.addAttribute(b, a[c])
                }, a);
                Pa(a.v, function(a) {
                    this.a.addPageCategoryExclusion(a)
                }, a);
                a.a.setPublisherProvidedId(a.B);
                a.u && a.a.setLocation(a.u)
            }
        };
    e = X.prototype;
    e.setCookieOptions = function(a) {
        try {
            if (!q(a) || !Za(a)) return F(this.log, cc(String(a)), this), this;
            this.D = a;
            this.a && this.a.setCookieOptions(a);
            return this
        } catch (b) {
            P(17, b)
        }
    };
    e.setTagForChildDirectedTreatment = function(a) {
        try {
            if (0 !== a && 1 !== a) return F(this.log, Ac(String(a)), this), this;
            this.n = a;
            this.a && this.a.setTagForChildDirectedTreatment(a);
            return this
        } catch (b) {
            P(18, b)
        }
    };
    e.clearTagForChildDirectedTreatment = function() {
        try {
            return this.n = -1, this.a && this.a.setTagForChildDirectedTreatment(-1), this
        } catch (a) {
            P(19, a)
        }
    };
    e.setTargeting = function(a, b) {
        try {
            var c = null;
            n(b) ? c = [b] : m(b) ? c = b : ba(b) && (c = Ua(b));
            var d = c ? c.join() : String(b);
            if (!n(a) || Ka(null == a ? "" : String(a)) || !c) return F(this.log, N("PubAdsService.setTargeting", arguments), this), this;
            this.j[a] = c;
            D(this.log, zc(a, d, this.getName()), this);
            if (this.a)
                for (this.a.clearAttribute(a), d = 0; d < c.length; ++d) this.a.addAttribute(a, c[d]);
            return this
        } catch (f) {
            P(1, f)
        }
    };
    e.clearTargeting = function(a) {
        try {
            if (!n(a) || Ka(null == a ? "" : String(a))) return F(this.log, N("PubAdsService.clearTargeting", arguments), this), this;
            if (!this.j[a]) return F(this.log, wc(a, this.getName()), this), this;
            delete this.j[a];
            D(this.log, vc(a, this.getName()), this);
            this.a && this.a.clearAttribute(a);
            return this
        } catch (b) {
            P(2, b)
        }
    };
    e.setCategoryExclusion = function(a) {
        try {
            if (!n(a) || Ka(null == a ? "" : String(a))) return F(this.log, N("PubAdsService.setCategoryExclusion", arguments), this), this;
            Ta(this.v, a);
            D(this.log, xc(a), this);
            this.a && this.a.addPageCategoryExclusion(a);
            return this
        } catch (b) {
            P(3, b)
        }
    };
    e.clearCategoryExclusions = function() {
        try {
            return this.v = [], D(this.log, yc(), this), this.a && this.a.clearPageCategoryExclusions(), this
        } catch (a) {
            P(4, a)
        }
    };
    e.noFetch = function() {
        this.a ? F(this.log, ec("noFetch", "pubads"), this) : this.G = !1
    };
    e.disableInitialLoad = function() {
        try {
            this.a ? F(this.log, ec("disableInitialLoad", "pubads"), this) : this.F = !0
        } catch (a) {
            P(5, a)
        }
    };
    e.enableSingleRequest = function() {
        try {
            return this.b && !this.f ? F(this.log, dc("enableSingleRequest"), this) : (D(this.log, gc("single request"), this), this.f = !0), this.f
        } catch (a) {
            P(6, a)
        }
    };
    e.enableAsyncRendering = function() {
        try {
            return this.b && !this.c ? F(this.log, dc("enableAsyncRendering"), this) : (D(this.log, gc("asynchronous rendering"), this), this.c = !0), this.c
        } catch (a) {
            P(7, a)
        }
    };
    e.enableSyncRendering = function() {
        try {
            if (this.b && this.c) F(this.log, dc("enableSyncRendering"), this);
            else {
                D(this.log, gc("synchronous rendering"), this);
                this.c = !1;
                for (var a = this.getSlots(), b = 0; b < a.length; ++b) a[b].m = !1
            }
            return !this.c
        } catch (c) {
            P(8, c)
        }
    };
    e.setCentering = function(a) {
        try {
            D(this.log, hc("centering", String(a)), this), this.H = a
        } catch (b) {
            P(9, b)
        }
    };
    e.setPublisherProvidedId = function(a) {
        try {
            return this.b ? F(this.log, fc("setPublisherProvidedId", a), this) : (D(this.log, hc("PPID", a), this), this.B = a), this
        } catch (b) {
            P(20, b)
        }
    };
    e.definePassback = function(a, b) {
        try {
            return !n(a) || 0 >= a.length || !Boolean(b) ? (G(this.log, N("PubAdsService.definePassback", arguments)), null) : new Md(a, b, this)
        } catch (c) {
            P(10, c)
        }
    };
    var Nd = function(a, b) {
        Td(a);
        a.a ? a.a.passback(b) : (D(a.log, Wb(b.getName(), "GPT"), a, b), a.l.push(b))
    };
    e = X.prototype;
    e.refresh = function(a, b) {
        try {
            var c;
            if (!(c = a && !m(a))) {
                var d;
                if (d = b) {
                    var f = typeof b;
                    d = !("object" == f && null != b || "function" == f) || b.changeCorrelator && !p(b.changeCorrelator)
                }
                c = d
            }
            if (c) F(this.log, N("PubAdsService.refresh", arguments), this);
            else {
                c = null;
                if (a && (c = Yd(this, a), !c.length)) {
                    F(this.log, N("PubAdsService.refresh", arguments), this);
                    return
                }
                this.a ? (D(this.log, nc(), this), d = !0, l(b) && l(b.changeCorrelator) && (d = b.changeCorrelator), this.a.refresh(c, {
                    changeCorrelator: d
                })) : this.f ? (D(this.log, mc(), this), c ? Ta(this.h,
                    new Qd(c, b)) : Ta(this.h, new Qd(this.getSlots(), b))) : F(this.log, jc(), this)
            }
        } catch (g) {
            P(11, g)
        }
    };
    e.O = function(a, b) {
        if (a && !m(a) || b.videoStreamCorrelator && !q(b.videoStreamCorrelator) || b.videoPodNumber && !q(b.videoPodNumber) || b.videoPodPosition && !q(b.videoPodPosition) || b.persistentRoadblocksOnly && !p(b.persistentRoadblocksOnly) || b.clearUnfilledSlots && !p(b.clearUnfilledSlots)) F(this.log, N("PubAdsService.internalVideoRefresh", arguments), this);
        else if (this.a) {
            var c = null;
            if (a && (c = Yd(this, a), !c.length)) {
                G(this.log, ic("internalVideoRefresh"), this);
                return
            }
            D(this.log, nc(), this);
            this.a.refresh(c, b)
        } else F(this.log,
            jc(), this)
    };
    e.enableVideoAds = function() {
        try {
            this.s = !0, Wd(this)
        } catch (a) {
            P(12, a)
        }
    };
    e.setVideoContent = function(a, b) {
        try {
            this.s = !0, this.K = a, this.J = b, Wd(this)
        } catch (c) {
            P(13, c)
        }
    };
    e.getVideoContent = function() {
        return this.a ? this.a.getVideoContentInformation() : null
    };
    var Wd = function(a) {
            a.s && a.a && a.a.setVideoContentInformation(a.K, a.J)
        },
        Xd = function(a) {
            a.a && a.a.setCorrelator(-1 == a.k ? void 0 : a.k)
        };
    e = X.prototype;
    e.getCorrelator = function() {
        return 0 == this.getSlots().length ? "not_available" : this.a ? this.a.getCorrelator() : "not_loaded"
    };
    e.setCorrelator = function(a) {
        var b = window;
        if (b.top == b) return this;
        if (!Za(a) || 0 === a) return F(this.log, Ec(String(a)), this), this;
        this.k = a;
        Xd(this);
        return this
    };
    e.updateCorrelator = function() {
        try {
            return this.k = -1, Xd(this), this
        } catch (a) {
            P(25, a)
        }
    };
    e.getVideoStreamCorrelator = function() {
        if (!this.a) return 0;
        var a = this.a.getVideoStreamCorrelator();
        return isNaN(a) ? 0 : a
    };
    e.isAdRequestFinished = function() {
        return this.a ? this.a.isAdRequestFinished() : !1
    };
    e.isSlotAPersistentRoadblock = function(a) {
        return this.a ? this.a.isSlotAPersistentRoadblock(a) : !1
    };
    e.collapseEmptyDivs = function(a) {
        try {
            return this.i ? F(this.log, tc(), this) : this.b ? F(this.log, dc("collapseEmptyDivs"), this) : (this.q = Boolean(a), D(this.log, sc(String(this.q)), this), this.i = !0), this.i
        } catch (b) {
            P(14, b)
        }
    };
    e.clear = function(a) {
        try {
            if (!this.a) return F(this.log, lc(), this), !1;
            var b = null;
            if (a && (b = Yd(this, a), 0 == b.length)) return F(this.log, N("PubAdsService.clear", arguments), this), !1;
            D(this.log, oc(), this);
            return this.a.clearSlotContents(b)
        } catch (c) {
            P(15, c)
        }
    };
    e.clearNoRefreshState = function() {
        this.a ? (D(this.log, pc(), this), this.a.clearNoRefreshState()) : F(this.log, kc(), this)
    };
    e.setLocation = function(a, b, c) {
        try {
            var d = "role:1 producer:12";
            if (l(b)) {
                if (!q(a)) return F(this.log, qc("Latitude")), this;
                if (!q(b)) return F(this.log, qc("Longitude")), this;
                d += " latlng{ latitude_e7: " + Math.round(1E7 * a) + " longitude_e7: " + Math.round(1E7 * b) + "}";
                if (l(c)) {
                    if (isNaN(c)) return F(this.log, qc("Radius")), this;
                    d += " radius:" + Math.round(c)
                }
            } else {
                if (50 < a.length) {
                    var f = a.substring(0, 50);
                    F(this.log, rc(String(a), "50", f));
                    a = f
                }
                d += ' loc:"' + a + '"'
            }
            var g;
            if (Kd) g = k.btoa(d);
            else {
                f = d;
                d = [];
                for (b = a = 0; b < f.length; b++) {
                    for (var h =
                        f.charCodeAt(b); 255 < h;) d[a++] = h & 255, h >>= 8;
                    d[a++] = h
                }
                if (!ba(d)) throw Error("encodeByteArray takes an array as a parameter");
                if (!Jd)
                    for (Jd = {}, h = 0; 65 > h; h++) Jd[h] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h);
                h = Jd;
                f = [];
                for (a = 0; a < d.length; a += 3) {
                    var r = d[a],
                        K = a + 1 < d.length,
                        y = K ? d[a + 1] : 0,
                        z = a + 2 < d.length,
                        E = z ? d[a + 2] : 0;
                    b = r >> 2;
                    c = (r & 3) << 4 | y >> 4;
                    var Yb = (y & 15) << 2 | E >> 6,
                        Zb = E & 63;
                    z || (Zb = 64, K || (Yb = 64));
                    f.push(h[b], h[c], h[Yb], h[Zb])
                }
                g = f.join("")
            }
            this.u = "a " + g;
            return this
        } catch (qe) {
            P(16, qe)
        }
    };
    e.getVersion = function() {
        return this.a ? this.a.getVersion() : void 0
    };
    e.forceExperiment = function(a) {
        this.b ? F(this.log, fc("forceExperiment", a), this) : this.r.push(a)
    };
    var Y = function() {
            try {
                var a = T(),
                    b = qd(a, "publisher_ads");
                if (!b) {
                    var c = b = new X;
                    a.a[c.getName()] = c
                }
                return b
            } catch (d) {
                P(26, d)
            }
        },
        Yd = function(a, b) {
            for (var c = [], d = 0; d < b.length; ++d) {
                var f = b[d];
                f instanceof Bd ? c.push(f) : F(a.log, uc(String(d)), a)
            }
            return c
        };
    w("pubads", Y);
    var Z = function() {
        s.call(this);
        this.o = !0;
        this.d = this.l = !1;
        this.h = 0;
        this.g = this.f = void 0;
        this.n = this.k = !1;
        this.i = {};
        this.c = {};
        this.a = !1;
        this.j = {}
    };
    fa(Z);
    e = Z.prototype;
    e.set = function(a, b) {
        n(a) && 0 < a.length ? (this.j[a] = b, D(this.log, Gb(a, String(b), this.getName()), this, null)) : F(this.log, Hb(String(a), String(b), this.getName()), this, null);
        return this
    };
    e.get = function(a) {
        return this.j[a]
    };
    e.getAttributeKeys = function() {
        var a = [];
        u(this.j, function(b, c) {
            a.push(c)
        });
        return a
    };
    e.display = function(a, b, c, d) {
        this.enable();
        a = c ? V(a, b, c) : V(a, b);
        a.addService(this);
        d && a.setClickUrl(d);
        Gd(a.getSlotId().getDomId())
    };
    e.A = function() {
        if (this.o) {
            if (!this.n) {
                var a = document,
                    b = document.createElement("script");
                b.async = !0;
                b.type = "text/javascript";
                b.src = Zd();
                try {
                    var c = a.getElementsByTagName("script")[0];
                    D(this.log, Pb("GPT CompanionAds"), this);
                    this.n = !0;
                    c.parentNode && c.parentNode.insertBefore(b, c)
                } catch (d) {
                    G(this.log, Qb("GPT CompanionAds"), this)
                }
            }
        } else this.k || (k.document.write('<script type="text/javascript" src="' + $a(Zd()) + '">\x3c/script>'), this.k = !0)
    };
    e.enableSyncLoading = function() {
        try {
            this.o = !1
        } catch (a) {
            P(402, a)
        }
    };
    e.setRefreshUnfilledSlots = function(a) {
        try {
            p(a) && (this.l = a)
        } catch (b) {
            P(403, b)
        }
    };
    e.setClearUnfilledSlots = function(a) {
        p(a) && (this.d = a)
    };
    e.notifyUnfilledSlots = function(a) {
        if (this.l) $d(this, ae(this, a));
        else if (this.d) {
            a = ae(this, a);
            var b = Y();
            b.b ? b.clear(a) : G(this.log, Mb("PubAds", "clear"))
        }
    };
    e.isRoadblockingSupported = function() {
        var a = Y();
        if (!a.b) return !1;
        var a = a.getSlots(),
            b = this.getSlots();
        if (a.length != b.length) return !1;
        for (var c = 0; c < b.length; ++c) {
            for (var d = !1, f = 0; f < a.length; ++f)
                if (b[c] === a[f]) {
                    d = !0;
                    break
                }
            if (!d) return !1
        }
        return !0
    };
    e.refreshAllSlots = function() {
        this.l && $d(this, null)
    };
    e.setVideoSessionInfo = function(a, b, c, d, f, g, h) {
        this.a = !1;
        this.h = 0;
        this.g = this.f = void 0;
        this.h = a;
        l(f) && (this.f = f);
        l(g) && (this.g = g);
        l(h) && (this.a = h)
    };
    e.setVideoSession = function(a, b, c, d) {
        this.setVideoSessionInfo(a, "", "", "", b, c, d)
    };
    e.getDisplayAdsCorrelator = function() {
        return Y().getCorrelator()
    };
    e.getVideoStreamCorrelator = function() {
        return Y().getVideoStreamCorrelator()
    };
    var $d = function(a, b) {
        var c = Y();
        if (c.b) {
            if (a.a) {
                if (!a.isRoadblockingSupported()) {
                    F(a.log, Lb());
                    return
                }
                c.clearNoRefreshState();
                c.clear()
            }
            var d = {
                isVideoRefresh: !0
            };
            l(a.h) && (d.videoStreamCorrelator = a.h);
            a.f && (d.videoPodNumber = a.f);
            a.g && (d.videoPodPosition = a.g);
            a.a && (d.persistentRoadblocksOnly = a.a);
            a.d && (d.clearUnfilledSlots = a.d);
            c.O(b, d)
        } else G(a.log, Mb("PubAds", "refresh"))
    };
    Z.prototype.isSlotAPersistentRoadblock = function(a) {
        var b = Y();
        if (b.b && Fd(U(), a)) return b.isSlotAPersistentRoadblock(a);
        G(this.log, Nb());
        return !1
    };
    var ae = function(a, b) {
        for (var c = a.getSlotIdMap(), d = [], f = 0; f < b.length; ++f) {
            var g = b[f];
            g in c ? d.push(c[g]) : F(a.log, Ob(), a)
        }
        return d
    };
    Z.prototype.getName = function() {
        return "companion_ads"
    };
    var Zd = function() {
        return ab(window) + "//pagead2.googlesyndication.com/pagead/show_companion_ad.js"
    };
    Z.prototype.onImplementationLoaded = function() {
        D(this.log, Rb("GPT CompanionAds"), this);
        this.k = !0
    };
    var be = function(a, b) {
        var c = b && b.getSlotId().getId();
        if (c && c in a.i && b.hasWrapperDiv() && a.b && !a.isSlotAPersistentRoadblock(b)) {
            b.h = a.i[c];
            var d = null;
            a.c.hasOwnProperty(c) && (d = a.c[c], delete a.c[c]);
            c = new ed(b, d, a.getName());
            return Cd(b, c)
        }
        return !1
    };
    Z.prototype.p = function(a) {
        be(this, a)
    };
    Z.prototype.fillSlot = function(a, b, c, d) {
        return Fd(U(), a) && n(b) && 0 < b.length ? (this.i[a.getSlotId().getId()] = b, null != c && null != d && (this.c[a.getSlotId().getId()] = [c, d]), be(this, a)) : !1
    };
    Z.prototype.slotRenderEnded = function(a, b, c) {
        var d = null;
        null != b && null != c && (d = [b, c]);
        a = new ed(a, d, this.getName());
        fd(this, a)
    };
    w("companionAds", function() {
        try {
            var a = T(),
                b = qd(a, "companion_ads");
            if (!b) {
                var c = b = new Z;
                a.a[c.getName()] = c
            }
            return b
        } catch (d) {
            P(401, d)
        }
    });
    var $ = function() {
        s.call(this);
        this.a = {};
        this.c = {}
    };
    fa($);
    e = $.prototype;
    e.getName = function() {
        return "content"
    };
    e.set = function(a, b) {
        n(a) && 0 < a.length ? (this.a[a] = b, D(this.log, Gb(a, String(b), this.getName()), this, null)) : F(this.log, Hb(String(a), String(b), this.getName()), this, null);
        return this
    };
    e.get = function(a) {
        return this.a[a]
    };
    e.getAttributeKeys = function() {
        var a = [];
        u(this.a, function(b, c) {
            a.push(c)
        });
        return a
    };
    e.display = function(a, b, c, d) {
        this.enable();
        a = c ? V(a, b, c) : V(a, b);
        a.addService(this);
        d && a.setClickUrl(d);
        Gd(a.getSlotId().getDomId())
    };
    var ce = function(a, b) {
        var c = b && b.getSlotId().getId();
        c in a.c && a.b && b.hasWrapperDiv() && !b.g && (b.h = a.c[c], c = new ed(b, null, a.getName()), Cd(b, c))
    };
    $.prototype.A = function() {
        for (var a = this.getSlots(), b = 0; b < a.length; ++b) ce(this, a[b])
    };
    $.prototype.p = function(a) {
        ce(this, a)
    };
    $.prototype.setContent = function(a, b) {
        try {
            Fd(U(), a) && n(b) && 0 < b.length && (this.c[a.getSlotId().getId()] = b, ce(this, a))
        } catch (c) {
            P(602, c)
        }
    };
    w("content", function() {
        try {
            var a = T(),
                b = qd(a, "content");
            if (!b) {
                var c = b = new $;
                a.a[c.getName()] = c
            }
            return b
        } catch (d) {
            P(601, d)
        }
    });
    var de = function() {
            var a = window,
                b = document;
            if (v()._pubconsole_disable_) return !1;
            var c;
            c = document.cookie.split("google_pubconsole=");
            if (c = 2 == c.length ? c[1].split(";")[0] : "")
                if (c = c.split("|"), 0 < c.length && ("1" == c[0] || "0" == c[0])) return !0;
            T();
            c = !1;
            try {
                c = a.top.document.URL === b.URL
            } catch (d) {}
            a = c ? b.URL : b.referrer;
            return null !== Id(a, "google_debug") || null !== Id(a, "google_console") || null !== Id(a, "google_force_console") || null !== Id(a, "googfc")
        },
        ee = function() {
            if (de()) {
                var a = document,
                    b = a.createElement("script");
                b.type =
                    "text/javascript";
                b.src = ab(window) + "//publisherconsole.appspot.com/js/loader.js";
                b.async = !0;
                (a = a.getElementsByTagName("script")[0]) && a.parentNode && a.parentNode.insertBefore(b, a)
            }
        };
    "complete" === document.readyState ? ee() : Na(window, ee);
    w("disablePublisherConsole", function() {
        try {
            v()._pubconsole_disable_ = !0
        } catch (a) {
            P(2001, a)
        }
    });
    var fe = function() {
        this.a = [];
        this.c = !1;
        this.b = H()
    };
    fe.prototype.addSize = function(a, b) {
        try {
            var c;
            if (!(c = !sd(a))) {
                var d = b,
                    f;
                (f = sd(d)) || (f = m(d) ? Ra(d, sd) : !1);
                c = !f
            }
            if (c) return this.c = !0, F(this.b, N("SizeMappingBuilder.addSize", arguments)), this;
            this.a.push([a, b]);
            return this
        } catch (g) {
            P(1601, g)
        }
    };
    fe.prototype.build = function() {
        try {
            if (this.c) return F(this.b, Eb()), null;
            Ya(this.a);
            return this.a
        } catch (a) {
            P(1602, a)
        }
    };
    var Xa = function(a, b) {
        var c;
        t: {
            c = b[0];
            for (var d = a[0], f = Va, g = Math.min(c.length, d.length), h = 0; h < g; h++) {
                var r = f(c[h], d[h]);
                if (0 != r) {
                    c = r;
                    break t
                }
            }
            c = Va(c.length, d.length)
        }
        return c
    };
    w("sizeMapping", function() {
        try {
            return new fe
        } catch (a) {
            P(1603, a)
        }
    });
    var he = function() {
        var a = ge;
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
    var ie = od();
    (function() {
        var a = window;
        if (!(Math.random() > x[32])) {
            var b = ab(a),
                c = (1 == x[6] ? "https:" : "http:") == b ? 0 : "http:" == b ? 1 : 2,
                d = !1,
                f = !1,
                g = !1,
                h = !1,
                r = !1,
                K = !1,
                y = "loading",
                b = "gpt-razor-script-" + Math.random(),
                z = b + "-callback";
            a[z] = function() {
                d = !0
            };
            try {
                a.document.write('<script id="' + b + '">window["' + z + '"]()\x3c/script>')
            } catch (E) {
                h = !0
            }
            f = d;
            a.document.getElementById(b) ? r = 2 > a.document.getElementsByTagName("script").length : g = !0;
            K = a.document.a && a.document.a.async;
            y = a.document.readyState;
            W = new Gc("gpt_razor_test");
            a.setTimeout(function() {
                O(W,
                    "s", String(d));
                O(W, "i", String(f));
                O(W, "a", String(g));
                O(W, "e", String(h));
                O(W, "d", String(r));
                O(W, "c", String(K));
                O(W, "r", y);
                O(W, "h", String(c));
                Od ? Hc(W, 1) : Od = !0
            }, 250)
        }
    })();
    var je = v().cmd;
    if (!je || m(je)) {
        var ke = v().cmd = new Kc;
        je && 0 < je.length && ke.push.apply(ke, je)
    }(function() {
        Pa(document.getElementsByTagName("script"), function(a) {
            var b = a.src;
            b && (0 <= b.indexOf("/tag/js/gpt.js") || 0 <= b.indexOf("/tag/js/gpt_mobile.js")) && a.innerHTML && !a.googletag_executed && (a.googletag_executed = !0, eval(a.innerHTML))
        })
    })();
    if (Math.random() < x[34]) {
        for (var le = document, me = le.createElement("iframe"), ge = le ? le.parentWindow || le.defaultView : window, ne = "//tpc.googlesyndication.com/safeframe/1-0-0/html/container.html", oe, pe = ge, re = 0; pe != pe.parent;) re++, pe = pe.parent;
        (oe = re) && (ne += "?n=" + oe);
        me.src = (he() ? "https:" : "http:") + ne;
        me.style.visibility = "hidden";
        me.style.display = "none";
        var se = le.getElementsByTagName("script");
        if (0 < se.length) {
            var te = se[se.length - 1];
            te.parentNode && te.parentNode.insertBefore(me, te.nextSibling)
        }
    }
    ie.tick("gpt_load");
})()