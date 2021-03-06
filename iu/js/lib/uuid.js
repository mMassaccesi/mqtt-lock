! function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var r;
        r = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, r.uuidv1 = e()
    }
}(function () {
    return function e(r, n, o) {
        function t(u, f) {
            if (!n[u]) {
                if (!r[u]) {
                    var s = "function" == typeof require && require;
                    if (!f && s) return s(u, !0);
                    if (i) return i(u, !0);
                    var d = new Error("Cannot find module '" + u + "'");
                    throw d.code = "MODULE_NOT_FOUND", d
                }
                var a = n[u] = {
                    exports: {}
                };
                r[u][0].call(a.exports, function (e) {
                    var n = r[u][1][e];
                    return t(n ? n : e)
                }, a, a.exports, e, r, n, o)
            }
            return n[u].exports
        }
        for (var i = "function" == typeof require && require, u = 0; u < o.length; u++) t(o[u]);
        return t
    }({
        1: [function (e, r, n) {
            function o(e, r) {
                var n = r || 0,
                    o = t;
                return o[e[n++]] + o[e[n++]] + o[e[n++]] + o[e[n++]] + "-" + o[e[n++]] + o[e[n++]] + "-" + o[e[n++]] + o[e[n++]] + "-" + o[e[n++]] + o[e[n++]] + "-" + o[e[n++]] + o[e[n++]] + o[e[n++]] + o[e[n++]] + o[e[n++]] + o[e[n++]]
            }
            for (var t = [], i = 0; i < 256; ++i) t[i] = (i + 256).toString(16).substr(1);
            r.exports = o
        }, {}],
        2: [function (e, r, n) {
            var o = "undefined" != typeof crypto && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && msCrypto.getRandomValues.bind(msCrypto);
            if (o) {
                var t = new Uint8Array(16);
                r.exports = function () {
                    return o(t), t
                }
            } else {
                var i = new Array(16);
                r.exports = function () {
                    for (var e, r = 0; r < 16; r++) 0 === (3 & r) && (e = 4294967296 * Math.random()), i[r] = e >>> ((3 & r) << 3) & 255;
                    return i
                }
            }
        }, {}],
        3: [function (e, r, n) {
            function o(e, r, n) {
                var o = r && n || 0,
                    a = r || [];
                e = e || {};
                var c = e.node || t,
                    l = void 0 !== e.clockseq ? e.clockseq : i;
                if (null == c || null == l) {
                    var v = u();
                    null == c && (c = t = [1 | v[0], v[1], v[2], v[3], v[4], v[5]]), null == l && (l = i = 16383 & (v[6] << 8 | v[7]))
                }
                var p = void 0 !== e.msecs ? e.msecs : (new Date).getTime(),
                    y = void 0 !== e.nsecs ? e.nsecs : d + 1,
                    m = p - s + (y - d) / 1e4;
                if (m < 0 && void 0 === e.clockseq && (l = l + 1 & 16383), (m < 0 || p > s) && void 0 === e.nsecs && (y = 0), y >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                s = p, d = y, i = l, p += 122192928e5;
                var b = (1e4 * (268435455 & p) + y) % 4294967296;
                a[o++] = b >>> 24 & 255, a[o++] = b >>> 16 & 255, a[o++] = b >>> 8 & 255, a[o++] = 255 & b;
                var w = p / 4294967296 * 1e4 & 268435455;
                a[o++] = w >>> 8 & 255, a[o++] = 255 & w, a[o++] = w >>> 24 & 15 | 16, a[o++] = w >>> 16 & 255, a[o++] = l >>> 8 | 128, a[o++] = 255 & l;
                for (var x = 0; x < 6; ++x) a[o + x] = c[x];
                return r ? r : f(a)
            }
            var t, i, u = e("./lib/rng"),
                f = e("./lib/bytesToUuid"),
                s = 0,
                d = 0;
            r.exports = o
        }, {
            "./lib/bytesToUuid": 1,
            "./lib/rng": 2
        }]
    }, {}, [3])(3)
});