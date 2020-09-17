!(function (t, e) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    var r = e();
    for (var n in r) ("object" == typeof exports ? exports : t)[n] = r[n];
  }
})(window, function () {
  return (function (t) {
    var e = {};
    function r(n) {
      if (e[n]) return e[n].exports;
      var i = (e[n] = { i: n, l: !1, exports: {} });
      return t[n].call(i.exports, i, i.exports, r), (i.l = !0), i.exports;
    }
    return (
      (r.m = t),
      (r.c = e),
      (r.d = function (t, e, n) {
        r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
      }),
      (r.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (r.t = function (t, e) {
        if ((1 & e && (t = r(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (r.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var i in t)
            r.d(
              n,
              i,
              function (e) {
                return t[e];
              }.bind(null, i)
            );
        return n;
      }),
      (r.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return r.d(e, "a", e), e;
      }),
      (r.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (r.p = ""),
      r((r.s = 187))
    );
  })([
    function (t, e, r) {
      var n = r(40),
        i = "object" == typeof self && self && self.Object === Object && self,
        o = n || i || Function("return this")();
      t.exports = o;
    },
    function (t, e) {
      var r = Array.isArray;
      t.exports = r;
    },
    function (t, e) {
      t.exports = function (t) {
        return null != t && "object" == typeof t;
      };
    },
    function (t, e) {
      t.exports = function (t) {
        var e = typeof t;
        return null != t && ("object" == e || "function" == e);
      };
    },
    function (t, e, r) {
      var n = r(92),
        i = r(95);
      t.exports = function (t, e) {
        var r = i(t, e);
        return n(r) ? r : void 0;
      };
    },
    function (t, e, r) {
      var n = r(38),
        i = r(76),
        o = r(11);
      t.exports = function (t) {
        return o(t) ? n(t) : i(t);
      };
    },
    function (t, e, r) {
      var n = r(7),
        i = r(72),
        o = r(73),
        s = n ? n.toStringTag : void 0;
      t.exports = function (t) {
        return null == t
          ? void 0 === t
            ? "[object Undefined]"
            : "[object Null]"
          : s && s in Object(t)
          ? i(t)
          : o(t);
      };
    },
    function (t, e, r) {
      var n = r(0).Symbol;
      t.exports = n;
    },
    function (t, e) {
      t.exports = function (t, e) {
        return t === e || (t != t && e != e);
      };
    },
    function (t, e, r) {
      "use strict";
      function n(t) {
        var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return null === e
          ? null
          : [e[1], e[2], e[3]].map(function (t) {
              return parseInt(t, 16);
            });
      }
      function i(t, e, r) {
        return (
          (e /= 255),
          (r /= 255),
          (t =
            (t /= 255) > 0.04045
              ? Math.pow((t + 0.005) / 1.055, 2.4)
              : t / 12.92),
          (e = e > 0.04045 ? Math.pow((e + 0.005) / 1.055, 2.4) : e / 12.92),
          (r = r > 0.04045 ? Math.pow((r + 0.005) / 1.055, 2.4) : r / 12.92),
          [
            0.4124 * (t *= 100) + 0.3576 * (e *= 100) + 0.1805 * (r *= 100),
            0.2126 * t + 0.7152 * e + 0.0722 * r,
            0.0193 * t + 0.1192 * e + 0.9505 * r,
          ]
        );
      }
      function o(t, e, r) {
        return (
          (e /= 100),
          (r /= 108.883),
          (t =
            (t /= 95.047) > 0.008856
              ? Math.pow(t, 1 / 3)
              : 7.787 * t + 16 / 116),
          [
            116 *
              (e = e > 0.008856 ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116) -
              16,
            500 * (t - e),
            200 *
              (e -
                (r = r > 0.008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116)),
          ]
        );
      }
      function s(t, e, r) {
        var n = i(t, e, r);
        return o(n[0], n[1], n[2]);
      }
      function a(t, e) {
        var r = t[0],
          n = t[1],
          i = t[2],
          o = e[0],
          s = e[1],
          a = e[2],
          c = r - o,
          l = n - s,
          u = i - a,
          h = Math.sqrt(n * n + i * i),
          p = o - r,
          d = Math.sqrt(s * s + a * a) - h,
          f = Math.sqrt(c * c + l * l + u * u),
          m =
            Math.sqrt(f) > Math.sqrt(Math.abs(p)) + Math.sqrt(Math.abs(d))
              ? Math.sqrt(f * f - p * p - d * d)
              : 0;
        return (
          (p /= 1),
          (d /= 1 * (1 + 0.045 * h)),
          (m /= 1 * (1 + 0.015 * h)),
          Math.sqrt(p * p + d * d + m * m)
        );
      }
      function c(t, e) {
        return a(s.apply(void 0, t), s.apply(void 0, e));
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.DELTAE94_DIFF_STATUS = {
          NA: 0,
          PERFECT: 1,
          CLOSE: 2,
          GOOD: 10,
          SIMILAR: 50,
        }),
        (e.SIGBITS = 5),
        (e.RSHIFT = 8 - e.SIGBITS),
        (e.defer = function () {
          var t,
            e,
            r = new Promise(function (r, n) {
              (t = r), (e = n);
            });
          return { resolve: t, reject: e, promise: r };
        }),
        (e.hexToRgb = n),
        (e.rgbToHex = function (t, e, r) {
          return (
            "#" +
            ((1 << 24) + (t << 16) + (e << 8) + r).toString(16).slice(1, 7)
          );
        }),
        (e.rgbToHsl = function (t, e, r) {
          (t /= 255), (e /= 255), (r /= 255);
          var n,
            i,
            o = Math.max(t, e, r),
            s = Math.min(t, e, r),
            a = (o + s) / 2;
          if (o === s) n = i = 0;
          else {
            var c = o - s;
            switch (((i = a > 0.5 ? c / (2 - o - s) : c / (o + s)), o)) {
              case t:
                n = (e - r) / c + (e < r ? 6 : 0);
                break;
              case e:
                n = (r - t) / c + 2;
                break;
              case r:
                n = (t - e) / c + 4;
            }
            n /= 6;
          }
          return [n, i, a];
        }),
        (e.hslToRgb = function (t, e, r) {
          var n, i, o;
          function s(t, e, r) {
            return (
              r < 0 && (r += 1),
              r > 1 && (r -= 1),
              r < 1 / 6
                ? t + 6 * (e - t) * r
                : r < 0.5
                ? e
                : r < 2 / 3
                ? t + (e - t) * (2 / 3 - r) * 6
                : t
            );
          }
          if (0 === e) n = i = o = r;
          else {
            var a = r < 0.5 ? r * (1 + e) : r + e - r * e,
              c = 2 * r - a;
            (n = s(c, a, t + 1 / 3)),
              (i = s(c, a, t)),
              (o = s(c, a, t - 1 / 3));
          }
          return [255 * n, 255 * i, 255 * o];
        }),
        (e.rgbToXyz = i),
        (e.xyzToCIELab = o),
        (e.rgbToCIELab = s),
        (e.deltaE94 = a),
        (e.rgbDiff = c),
        (e.hexDiff = function (t, e) {
          return c(n(t), n(e));
        }),
        (e.getColorDiffStatus = function (t) {
          return t < e.DELTAE94_DIFF_STATUS.NA
            ? "N/A"
            : t <= e.DELTAE94_DIFF_STATUS.PERFECT
            ? "Perfect"
            : t <= e.DELTAE94_DIFF_STATUS.CLOSE
            ? "Close"
            : t <= e.DELTAE94_DIFF_STATUS.GOOD
            ? "Good"
            : t < e.DELTAE94_DIFF_STATUS.SIMILAR
            ? "Similar"
            : "Wrong";
        }),
        (e.getColorIndex = function (t, r, n) {
          return (t << (2 * e.SIGBITS)) + (r << e.SIGBITS) + n;
        });
    },
    function (t, e) {
      t.exports = function (t) {
        return (
          t.webpackPolyfill ||
            ((t.deprecate = function () {}),
            (t.paths = []),
            t.children || (t.children = []),
            Object.defineProperty(t, "loaded", {
              enumerable: !0,
              get: function () {
                return t.l;
              },
            }),
            Object.defineProperty(t, "id", {
              enumerable: !0,
              get: function () {
                return t.i;
              },
            }),
            (t.webpackPolyfill = 1)),
          t
        );
      };
    },
    function (t, e, r) {
      var n = r(43),
        i = r(23);
      t.exports = function (t) {
        return null != t && i(t.length) && !n(t);
      };
    },
    function (t, e, r) {
      var n = r(82),
        i = r(83),
        o = r(84),
        s = r(85),
        a = r(86);
      function c(t) {
        var e = -1,
          r = null == t ? 0 : t.length;
        for (this.clear(); ++e < r; ) {
          var n = t[e];
          this.set(n[0], n[1]);
        }
      }
      (c.prototype.clear = n),
        (c.prototype.delete = i),
        (c.prototype.get = o),
        (c.prototype.has = s),
        (c.prototype.set = a),
        (t.exports = c);
    },
    function (t, e, r) {
      var n = r(8);
      t.exports = function (t, e) {
        for (var r = t.length; r--; ) if (n(t[r][0], e)) return r;
        return -1;
      };
    },
    function (t, e, r) {
      var n = r(4)(Object, "create");
      t.exports = n;
    },
    function (t, e, r) {
      var n = r(104);
      t.exports = function (t, e) {
        var r = t.__data__;
        return n(e) ? r["string" == typeof e ? "string" : "hash"] : r.map;
      };
    },
    function (t, e, r) {
      var n = r(118),
        i = r(28),
        o = r(119),
        s = r(120),
        a = r(121),
        c = r(6),
        l = r(44),
        u = l(n),
        h = l(i),
        p = l(o),
        d = l(s),
        f = l(a),
        m = c;
      ((n && "[object DataView]" != m(new n(new ArrayBuffer(1)))) ||
        (i && "[object Map]" != m(new i())) ||
        (o && "[object Promise]" != m(o.resolve())) ||
        (s && "[object Set]" != m(new s())) ||
        (a && "[object WeakMap]" != m(new a()))) &&
        (m = function (t) {
          var e = c(t),
            r = "[object Object]" == e ? t.constructor : void 0,
            n = r ? l(r) : "";
          if (n)
            switch (n) {
              case u:
                return "[object DataView]";
              case h:
                return "[object Map]";
              case p:
                return "[object Promise]";
              case d:
                return "[object Set]";
              case f:
                return "[object WeakMap]";
            }
          return e;
        }),
        (t.exports = m);
    },
    function (t, e, r) {
      var n = r(32);
      t.exports = function (t) {
        if ("string" == typeof t || n(t)) return t;
        var e = t + "";
        return "0" == e && 1 / t == -1 / 0 ? "-0" : e;
      };
    },
    function (t, e, r) {
      var n = r(56),
        i = r(57);
      t.exports = function (t, e, r, o) {
        var s = !r;
        r || (r = {});
        for (var a = -1, c = e.length; ++a < c; ) {
          var l = e[a],
            u = o ? o(r[l], t[l], l, r, t) : void 0;
          void 0 === u && (u = t[l]), s ? i(r, l, u) : n(r, l, u);
        }
        return r;
      };
    },
    function (t, e) {
      var r;
      r = (function () {
        return this;
      })();
      try {
        r = r || new Function("return this")();
      } catch (t) {
        "object" == typeof window && (r = window);
      }
      t.exports = r;
    },
    function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = r(9),
        i = r(64),
        o = (function () {
          function t(t, e) {
            (this._rgb = t), (this._population = e);
          }
          return (
            (t.applyFilter = function (t, e) {
              return "function" == typeof e
                ? i(t, function (t) {
                    var r = t.r,
                      n = t.g,
                      i = t.b;
                    return e(r, n, i, 255);
                  })
                : t;
            }),
            Object.defineProperty(t.prototype, "r", {
              get: function () {
                return this._rgb[0];
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "g", {
              get: function () {
                return this._rgb[1];
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "b", {
              get: function () {
                return this._rgb[2];
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "rgb", {
              get: function () {
                return this._rgb;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "hsl", {
              get: function () {
                if (!this._hsl) {
                  var t = this._rgb,
                    e = t[0],
                    r = t[1],
                    i = t[2];
                  this._hsl = n.rgbToHsl(e, r, i);
                }
                return this._hsl;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "hex", {
              get: function () {
                if (!this._hex) {
                  var t = this._rgb,
                    e = t[0],
                    r = t[1],
                    i = t[2];
                  this._hex = n.rgbToHex(e, r, i);
                }
                return this._hex;
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "population", {
              get: function () {
                return this._population;
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.toJSON = function () {
              return { rgb: this.rgb, population: this.population };
            }),
            (t.prototype.getRgb = function () {
              return this._rgb;
            }),
            (t.prototype.getHsl = function () {
              return this.hsl;
            }),
            (t.prototype.getPopulation = function () {
              return this._population;
            }),
            (t.prototype.getHex = function () {
              return this.hex;
            }),
            (t.prototype.getYiq = function () {
              if (!this._yiq) {
                var t = this._rgb;
                this._yiq = (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3;
              }
              return this._yiq;
            }),
            Object.defineProperty(t.prototype, "titleTextColor", {
              get: function () {
                return (
                  this._titleTextColor ||
                    (this._titleTextColor =
                      this.getYiq() < 200 ? "#fff" : "#000"),
                  this._titleTextColor
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            Object.defineProperty(t.prototype, "bodyTextColor", {
              get: function () {
                return (
                  this._bodyTextColor ||
                    (this._bodyTextColor =
                      this.getYiq() < 150 ? "#fff" : "#000"),
                  this._bodyTextColor
                );
              },
              enumerable: !0,
              configurable: !0,
            }),
            (t.prototype.getTitleTextColor = function () {
              return this.titleTextColor;
            }),
            (t.prototype.getBodyTextColor = function () {
              return this.bodyTextColor;
            }),
            t
          );
        })();
      e.Swatch = o;
    },
    function (t, e, r) {
      (function (t) {
        var n = r(0),
          i = r(74),
          o = e && !e.nodeType && e,
          s = o && "object" == typeof t && t && !t.nodeType && t,
          a = s && s.exports === o ? n.Buffer : void 0,
          c = (a ? a.isBuffer : void 0) || i;
        t.exports = c;
      }.call(this, r(10)(t)));
    },
    function (t, e) {
      var r = /^(?:0|[1-9]\d*)$/;
      t.exports = function (t, e) {
        var n = typeof t;
        return (
          !!(e = null == e ? 9007199254740991 : e) &&
          ("number" == n || ("symbol" != n && r.test(t))) &&
          t > -1 &&
          t % 1 == 0 &&
          t < e
        );
      };
    },
    function (t, e) {
      t.exports = function (t) {
        return (
          "number" == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991
        );
      };
    },
    function (t, e) {
      t.exports = function (t) {
        return function (e) {
          return t(e);
        };
      };
    },
    function (t, e, r) {
      (function (t) {
        var n = r(40),
          i = e && !e.nodeType && e,
          o = i && "object" == typeof t && t && !t.nodeType && t,
          s = o && o.exports === i && n.process,
          a = (function () {
            try {
              var t = o && o.require && o.require("util").types;
              return t || (s && s.binding && s.binding("util"));
            } catch (t) {}
          })();
        t.exports = a;
      }.call(this, r(10)(t)));
    },
    function (t, e) {
      var r = Object.prototype;
      t.exports = function (t) {
        var e = t && t.constructor;
        return t === (("function" == typeof e && e.prototype) || r);
      };
    },
    function (t, e, r) {
      var n = r(12),
        i = r(87),
        o = r(88),
        s = r(89),
        a = r(90),
        c = r(91);
      function l(t) {
        var e = (this.__data__ = new n(t));
        this.size = e.size;
      }
      (l.prototype.clear = i),
        (l.prototype.delete = o),
        (l.prototype.get = s),
        (l.prototype.has = a),
        (l.prototype.set = c),
        (t.exports = l);
    },
    function (t, e, r) {
      var n = r(4)(r(0), "Map");
      t.exports = n;
    },
    function (t, e, r) {
      var n = r(96),
        i = r(103),
        o = r(105),
        s = r(106),
        a = r(107);
      function c(t) {
        var e = -1,
          r = null == t ? 0 : t.length;
        for (this.clear(); ++e < r; ) {
          var n = t[e];
          this.set(n[0], n[1]);
        }
      }
      (c.prototype.clear = n),
        (c.prototype.delete = i),
        (c.prototype.get = o),
        (c.prototype.has = s),
        (c.prototype.set = a),
        (t.exports = c);
    },
    function (t, e, r) {
      var n = r(37),
        i = r(51),
        o = Object.prototype.propertyIsEnumerable,
        s = Object.getOwnPropertySymbols,
        a = s
          ? function (t) {
              return null == t
                ? []
                : ((t = Object(t)),
                  n(s(t), function (e) {
                    return o.call(t, e);
                  }));
            }
          : i;
      t.exports = a;
    },
    function (t, e, r) {
      var n = r(1),
        i = r(32),
        o = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        s = /^\w*$/;
      t.exports = function (t, e) {
        if (n(t)) return !1;
        var r = typeof t;
        return (
          !(
            "number" != r &&
            "symbol" != r &&
            "boolean" != r &&
            null != t &&
            !i(t)
          ) ||
          s.test(t) ||
          !o.test(t) ||
          (null != e && t in Object(e))
        );
      };
    },
    function (t, e, r) {
      var n = r(6),
        i = r(2);
      t.exports = function (t) {
        return "symbol" == typeof t || (i(t) && "[object Symbol]" == n(t));
      };
    },
    function (t, e) {
      t.exports = function (t) {
        return t;
      };
    },
    function (t, e, r) {
      var n = r(38),
        i = r(143),
        o = r(11);
      t.exports = function (t) {
        return o(t) ? n(t, !0) : i(t);
      };
    },
    function (t, e, r) {
      var n = r(47);
      t.exports = function (t) {
        var e = new t.constructor(t.byteLength);
        return new n(e).set(new n(t)), e;
      };
    },
    function (t, e, r) {
      "use strict";
      var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          },
        i =
          (this && this.__importStar) ||
          function (t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
              for (var r in t)
                Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return (e.default = t), e;
          };
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = r(20),
        s = n(r(137)),
        a = i(r(9)),
        c = i(r(162)),
        l = i(r(166)),
        u = i(r(176)),
        h = r(61),
        p = (function () {
          function t(e, r) {
            (this._src = e),
              (this.opts = h({}, r, t.DefaultOpts)),
              (this.opts.combinedFilter = u.combineFilters(this.opts.filters));
          }
          return (
            (t.from = function (t) {
              return new s.default(t);
            }),
            (t.prototype._process = function (t, e) {
              var r = e.quantizer,
                n = e.generator;
              return (
                t.scaleDown(e),
                t
                  .applyFilter(e.combinedFilter)
                  .then(function (t) {
                    return r(t.data, e);
                  })
                  .then(function (t) {
                    return o.Swatch.applyFilter(t, e.combinedFilter);
                  })
                  .then(function (t) {
                    return Promise.resolve(n(t));
                  })
              );
            }),
            (t.prototype.palette = function () {
              return this.swatches();
            }),
            (t.prototype.swatches = function () {
              return this._palette;
            }),
            (t.prototype.getPalette = function (t) {
              var e = this,
                r = new this.opts.ImageClass(),
                n = r
                  .load(this._src)
                  .then(function (t) {
                    return e._process(t, e.opts);
                  })
                  .then(
                    function (t) {
                      return (e._palette = t), r.remove(), t;
                    },
                    function (t) {
                      throw (r.remove(), t);
                    }
                  );
              return (
                t &&
                  n.then(
                    function (e) {
                      return t(null, e);
                    },
                    function (e) {
                      return t(e);
                    }
                  ),
                n
              );
            }),
            (t.Builder = s.default),
            (t.Quantizer = c),
            (t.Generator = l),
            (t.Filter = u),
            (t.Util = a),
            (t.Swatch = o.Swatch),
            (t.DefaultOpts = {
              colorCount: 64,
              quality: 5,
              generator: l.Default,
              ImageClass: null,
              quantizer: c.MMCQ,
              filters: [u.Default],
            }),
            t
          );
        })();
      e.default = p;
    },
    function (t, e) {
      t.exports = function (t, e) {
        for (
          var r = -1, n = null == t ? 0 : t.length, i = 0, o = [];
          ++r < n;

        ) {
          var s = t[r];
          e(s, r, t) && (o[i++] = s);
        }
        return o;
      };
    },
    function (t, e, r) {
      var n = r(70),
        i = r(39),
        o = r(1),
        s = r(21),
        a = r(22),
        c = r(41),
        l = Object.prototype.hasOwnProperty;
      t.exports = function (t, e) {
        var r = o(t),
          u = !r && i(t),
          h = !r && !u && s(t),
          p = !r && !u && !h && c(t),
          d = r || u || h || p,
          f = d ? n(t.length, String) : [],
          m = f.length;
        for (var g in t)
          (!e && !l.call(t, g)) ||
            (d &&
              ("length" == g ||
                (h && ("offset" == g || "parent" == g)) ||
                (p &&
                  ("buffer" == g || "byteLength" == g || "byteOffset" == g)) ||
                a(g, m))) ||
            f.push(g);
        return f;
      };
    },
    function (t, e, r) {
      var n = r(71),
        i = r(2),
        o = Object.prototype,
        s = o.hasOwnProperty,
        a = o.propertyIsEnumerable,
        c = n(
          (function () {
            return arguments;
          })()
        )
          ? n
          : function (t) {
              return i(t) && s.call(t, "callee") && !a.call(t, "callee");
            };
      t.exports = c;
    },
    function (t, e, r) {
      (function (e) {
        var r = "object" == typeof e && e && e.Object === Object && e;
        t.exports = r;
      }.call(this, r(19)));
    },
    function (t, e, r) {
      var n = r(75),
        i = r(24),
        o = r(25),
        s = o && o.isTypedArray,
        a = s ? i(s) : n;
      t.exports = a;
    },
    function (t, e) {
      t.exports = function (t, e) {
        return function (r) {
          return t(e(r));
        };
      };
    },
    function (t, e, r) {
      var n = r(6),
        i = r(3);
      t.exports = function (t) {
        if (!i(t)) return !1;
        var e = n(t);
        return (
          "[object Function]" == e ||
          "[object GeneratorFunction]" == e ||
          "[object AsyncFunction]" == e ||
          "[object Proxy]" == e
        );
      };
    },
    function (t, e) {
      var r = Function.prototype.toString;
      t.exports = function (t) {
        if (null != t) {
          try {
            return r.call(t);
          } catch (t) {}
          try {
            return t + "";
          } catch (t) {}
        }
        return "";
      };
    },
    function (t, e, r) {
      var n = r(108),
        i = r(2);
      t.exports = function t(e, r, o, s, a) {
        return (
          e === r ||
          (null == e || null == r || (!i(e) && !i(r))
            ? e != e && r != r
            : n(e, r, o, s, t, a))
        );
      };
    },
    function (t, e, r) {
      var n = r(109),
        i = r(112),
        o = r(113);
      t.exports = function (t, e, r, s, a, c) {
        var l = 1 & r,
          u = t.length,
          h = e.length;
        if (u != h && !(l && h > u)) return !1;
        var p = c.get(t);
        if (p && c.get(e)) return p == e;
        var d = -1,
          f = !0,
          m = 2 & r ? new n() : void 0;
        for (c.set(t, e), c.set(e, t); ++d < u; ) {
          var g = t[d],
            v = e[d];
          if (s) var _ = l ? s(v, g, d, e, t, c) : s(g, v, d, t, e, c);
          if (void 0 !== _) {
            if (_) continue;
            f = !1;
            break;
          }
          if (m) {
            if (
              !i(e, function (t, e) {
                if (!o(m, e) && (g === t || a(g, t, r, s, c))) return m.push(e);
              })
            ) {
              f = !1;
              break;
            }
          } else if (g !== v && !a(g, v, r, s, c)) {
            f = !1;
            break;
          }
        }
        return c.delete(t), c.delete(e), f;
      };
    },
    function (t, e, r) {
      var n = r(0).Uint8Array;
      t.exports = n;
    },
    function (t, e, r) {
      var n = r(49),
        i = r(30),
        o = r(5);
      t.exports = function (t) {
        return n(t, o, i);
      };
    },
    function (t, e, r) {
      var n = r(50),
        i = r(1);
      t.exports = function (t, e, r) {
        var o = e(t);
        return i(t) ? o : n(o, r(t));
      };
    },
    function (t, e) {
      t.exports = function (t, e) {
        for (var r = -1, n = e.length, i = t.length; ++r < n; ) t[i + r] = e[r];
        return t;
      };
    },
    function (t, e) {
      t.exports = function () {
        return [];
      };
    },
    function (t, e, r) {
      var n = r(3);
      t.exports = function (t) {
        return t == t && !n(t);
      };
    },
    function (t, e) {
      t.exports = function (t, e) {
        return function (r) {
          return null != r && r[t] === e && (void 0 !== e || t in Object(r));
        };
      };
    },
    function (t, e, r) {
      var n = r(55),
        i = r(17);
      t.exports = function (t, e) {
        for (var r = 0, o = (e = n(e, t)).length; null != t && r < o; )
          t = t[i(e[r++])];
        return r && r == o ? t : void 0;
      };
    },
    function (t, e, r) {
      var n = r(1),
        i = r(31),
        o = r(125),
        s = r(128);
      t.exports = function (t, e) {
        return n(t) ? t : i(t, e) ? [t] : o(s(t));
      };
    },
    function (t, e, r) {
      var n = r(57),
        i = r(8),
        o = Object.prototype.hasOwnProperty;
      t.exports = function (t, e, r) {
        var s = t[e];
        (o.call(t, e) && i(s, r) && (void 0 !== r || e in t)) || n(t, e, r);
      };
    },
    function (t, e, r) {
      var n = r(58);
      t.exports = function (t, e, r) {
        "__proto__" == e && n
          ? n(t, e, {
              configurable: !0,
              enumerable: !0,
              value: r,
              writable: !0,
            })
          : (t[e] = r);
      };
    },
    function (t, e, r) {
      var n = r(4),
        i = (function () {
          try {
            var t = n(Object, "defineProperty");
            return t({}, "", {}), t;
          } catch (t) {}
        })();
      t.exports = i;
    },
    function (t, e, r) {
      var n = r(50),
        i = r(60),
        o = r(30),
        s = r(51),
        a = Object.getOwnPropertySymbols
          ? function (t) {
              for (var e = []; t; ) n(e, o(t)), (t = i(t));
              return e;
            }
          : s;
      t.exports = a;
    },
    function (t, e, r) {
      var n = r(42)(Object.getPrototypeOf, Object);
      t.exports = n;
    },
    function (t, e, r) {
      var n = r(168),
        i = r(8),
        o = r(175),
        s = r(34),
        a = Object.prototype,
        c = a.hasOwnProperty,
        l = n(function (t, e) {
          t = Object(t);
          var r = -1,
            n = e.length,
            l = n > 2 ? e[2] : void 0;
          for (l && o(e[0], e[1], l) && (n = 1); ++r < n; )
            for (var u = e[r], h = s(u), p = -1, d = h.length; ++p < d; ) {
              var f = h[p],
                m = t[f];
              (void 0 === m || (i(m, a[f]) && !c.call(t, f))) && (t[f] = u[f]);
            }
          return t;
        });
      t.exports = l;
    },
    function (t, e, r) {
      "use strict";
      (function (t) {
        var r = (function () {
            if ("undefined" != typeof Map) return Map;
            function t(t, e) {
              var r = -1;
              return (
                t.some(function (t, n) {
                  return t[0] === e && ((r = n), !0);
                }),
                r
              );
            }
            return (function () {
              function e() {
                this.__entries__ = [];
              }
              return (
                Object.defineProperty(e.prototype, "size", {
                  get: function () {
                    return this.__entries__.length;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                (e.prototype.get = function (e) {
                  var r = t(this.__entries__, e),
                    n = this.__entries__[r];
                  return n && n[1];
                }),
                (e.prototype.set = function (e, r) {
                  var n = t(this.__entries__, e);
                  ~n
                    ? (this.__entries__[n][1] = r)
                    : this.__entries__.push([e, r]);
                }),
                (e.prototype.delete = function (e) {
                  var r = this.__entries__,
                    n = t(r, e);
                  ~n && r.splice(n, 1);
                }),
                (e.prototype.has = function (e) {
                  return !!~t(this.__entries__, e);
                }),
                (e.prototype.clear = function () {
                  this.__entries__.splice(0);
                }),
                (e.prototype.forEach = function (t, e) {
                  void 0 === e && (e = null);
                  for (var r = 0, n = this.__entries__; r < n.length; r++) {
                    var i = n[r];
                    t.call(e, i[1], i[0]);
                  }
                }),
                e
              );
            })();
          })(),
          n =
            "undefined" != typeof window &&
            "undefined" != typeof document &&
            window.document === document,
          i =
            void 0 !== t && t.Math === Math
              ? t
              : "undefined" != typeof self && self.Math === Math
              ? self
              : "undefined" != typeof window && window.Math === Math
              ? window
              : Function("return this")(),
          o =
            "function" == typeof requestAnimationFrame
              ? requestAnimationFrame.bind(i)
              : function (t) {
                  return setTimeout(function () {
                    return t(Date.now());
                  }, 1e3 / 60);
                };
        var s = [
            "top",
            "right",
            "bottom",
            "left",
            "width",
            "height",
            "size",
            "weight",
          ],
          a = "undefined" != typeof MutationObserver,
          c = (function () {
            function t() {
              (this.connected_ = !1),
                (this.mutationEventsAdded_ = !1),
                (this.mutationsObserver_ = null),
                (this.observers_ = []),
                (this.onTransitionEnd_ = this.onTransitionEnd_.bind(this)),
                (this.refresh = (function (t, e) {
                  var r = !1,
                    n = !1,
                    i = 0;
                  function s() {
                    r && ((r = !1), t()), n && c();
                  }
                  function a() {
                    o(s);
                  }
                  function c() {
                    var t = Date.now();
                    if (r) {
                      if (t - i < 2) return;
                      n = !0;
                    } else (r = !0), (n = !1), setTimeout(a, e);
                    i = t;
                  }
                  return c;
                })(this.refresh.bind(this), 20));
            }
            return (
              (t.prototype.addObserver = function (t) {
                ~this.observers_.indexOf(t) || this.observers_.push(t),
                  this.connected_ || this.connect_();
              }),
              (t.prototype.removeObserver = function (t) {
                var e = this.observers_,
                  r = e.indexOf(t);
                ~r && e.splice(r, 1),
                  !e.length && this.connected_ && this.disconnect_();
              }),
              (t.prototype.refresh = function () {
                this.updateObservers_() && this.refresh();
              }),
              (t.prototype.updateObservers_ = function () {
                var t = this.observers_.filter(function (t) {
                  return t.gatherActive(), t.hasActive();
                });
                return (
                  t.forEach(function (t) {
                    return t.broadcastActive();
                  }),
                  t.length > 0
                );
              }),
              (t.prototype.connect_ = function () {
                n &&
                  !this.connected_ &&
                  (document.addEventListener(
                    "transitionend",
                    this.onTransitionEnd_
                  ),
                  window.addEventListener("resize", this.refresh),
                  a
                    ? ((this.mutationsObserver_ = new MutationObserver(
                        this.refresh
                      )),
                      this.mutationsObserver_.observe(document, {
                        attributes: !0,
                        childList: !0,
                        characterData: !0,
                        subtree: !0,
                      }))
                    : (document.addEventListener(
                        "DOMSubtreeModified",
                        this.refresh
                      ),
                      (this.mutationEventsAdded_ = !0)),
                  (this.connected_ = !0));
              }),
              (t.prototype.disconnect_ = function () {
                n &&
                  this.connected_ &&
                  (document.removeEventListener(
                    "transitionend",
                    this.onTransitionEnd_
                  ),
                  window.removeEventListener("resize", this.refresh),
                  this.mutationsObserver_ &&
                    this.mutationsObserver_.disconnect(),
                  this.mutationEventsAdded_ &&
                    document.removeEventListener(
                      "DOMSubtreeModified",
                      this.refresh
                    ),
                  (this.mutationsObserver_ = null),
                  (this.mutationEventsAdded_ = !1),
                  (this.connected_ = !1));
              }),
              (t.prototype.onTransitionEnd_ = function (t) {
                var e = t.propertyName,
                  r = void 0 === e ? "" : e;
                s.some(function (t) {
                  return !!~r.indexOf(t);
                }) && this.refresh();
              }),
              (t.getInstance = function () {
                return (
                  this.instance_ || (this.instance_ = new t()), this.instance_
                );
              }),
              (t.instance_ = null),
              t
            );
          })(),
          l = function (t, e) {
            for (var r = 0, n = Object.keys(e); r < n.length; r++) {
              var i = n[r];
              Object.defineProperty(t, i, {
                value: e[i],
                enumerable: !1,
                writable: !1,
                configurable: !0,
              });
            }
            return t;
          },
          u = function (t) {
            return (t && t.ownerDocument && t.ownerDocument.defaultView) || i;
          },
          h = v(0, 0, 0, 0);
        function p(t) {
          return parseFloat(t) || 0;
        }
        function d(t) {
          for (var e = [], r = 1; r < arguments.length; r++)
            e[r - 1] = arguments[r];
          return e.reduce(function (e, r) {
            return e + p(t["border-" + r + "-width"]);
          }, 0);
        }
        function f(t) {
          var e = t.clientWidth,
            r = t.clientHeight;
          if (!e && !r) return h;
          var n = u(t).getComputedStyle(t),
            i = (function (t) {
              for (
                var e = {}, r = 0, n = ["top", "right", "bottom", "left"];
                r < n.length;
                r++
              ) {
                var i = n[r],
                  o = t["padding-" + i];
                e[i] = p(o);
              }
              return e;
            })(n),
            o = i.left + i.right,
            s = i.top + i.bottom,
            a = p(n.width),
            c = p(n.height);
          if (
            ("border-box" === n.boxSizing &&
              (Math.round(a + o) !== e && (a -= d(n, "left", "right") + o),
              Math.round(c + s) !== r && (c -= d(n, "top", "bottom") + s)),
            !(function (t) {
              return t === u(t).document.documentElement;
            })(t))
          ) {
            var l = Math.round(a + o) - e,
              f = Math.round(c + s) - r;
            1 !== Math.abs(l) && (a -= l), 1 !== Math.abs(f) && (c -= f);
          }
          return v(i.left, i.top, a, c);
        }
        var m =
          "undefined" != typeof SVGGraphicsElement
            ? function (t) {
                return t instanceof u(t).SVGGraphicsElement;
              }
            : function (t) {
                return (
                  t instanceof u(t).SVGElement && "function" == typeof t.getBBox
                );
              };
        function g(t) {
          return n
            ? m(t)
              ? (function (t) {
                  var e = t.getBBox();
                  return v(0, 0, e.width, e.height);
                })(t)
              : f(t)
            : h;
        }
        function v(t, e, r, n) {
          return { x: t, y: e, width: r, height: n };
        }
        var _ = (function () {
            function t(t) {
              (this.broadcastWidth = 0),
                (this.broadcastHeight = 0),
                (this.contentRect_ = v(0, 0, 0, 0)),
                (this.target = t);
            }
            return (
              (t.prototype.isActive = function () {
                var t = g(this.target);
                return (
                  (this.contentRect_ = t),
                  t.width !== this.broadcastWidth ||
                    t.height !== this.broadcastHeight
                );
              }),
              (t.prototype.broadcastRect = function () {
                var t = this.contentRect_;
                return (
                  (this.broadcastWidth = t.width),
                  (this.broadcastHeight = t.height),
                  t
                );
              }),
              t
            );
          })(),
          y = function (t, e) {
            var r,
              n,
              i,
              o,
              s,
              a,
              c,
              u =
                ((n = (r = e).x),
                (i = r.y),
                (o = r.width),
                (s = r.height),
                (a =
                  "undefined" != typeof DOMRectReadOnly
                    ? DOMRectReadOnly
                    : Object),
                (c = Object.create(a.prototype)),
                l(c, {
                  x: n,
                  y: i,
                  width: o,
                  height: s,
                  top: i,
                  right: n + o,
                  bottom: s + i,
                  left: n,
                }),
                c);
            l(this, { target: t, contentRect: u });
          },
          b = (function () {
            function t(t, e, n) {
              if (
                ((this.activeObservations_ = []),
                (this.observations_ = new r()),
                "function" != typeof t)
              )
                throw new TypeError(
                  "The callback provided as parameter 1 is not a function."
                );
              (this.callback_ = t),
                (this.controller_ = e),
                (this.callbackCtx_ = n);
            }
            return (
              (t.prototype.observe = function (t) {
                if (!arguments.length)
                  throw new TypeError(
                    "1 argument required, but only 0 present."
                  );
                if (
                  "undefined" != typeof Element &&
                  Element instanceof Object
                ) {
                  if (!(t instanceof u(t).Element))
                    throw new TypeError(
                      'parameter 1 is not of type "Element".'
                    );
                  var e = this.observations_;
                  e.has(t) ||
                    (e.set(t, new _(t)),
                    this.controller_.addObserver(this),
                    this.controller_.refresh());
                }
              }),
              (t.prototype.unobserve = function (t) {
                if (!arguments.length)
                  throw new TypeError(
                    "1 argument required, but only 0 present."
                  );
                if (
                  "undefined" != typeof Element &&
                  Element instanceof Object
                ) {
                  if (!(t instanceof u(t).Element))
                    throw new TypeError(
                      'parameter 1 is not of type "Element".'
                    );
                  var e = this.observations_;
                  e.has(t) &&
                    (e.delete(t),
                    e.size || this.controller_.removeObserver(this));
                }
              }),
              (t.prototype.disconnect = function () {
                this.clearActive(),
                  this.observations_.clear(),
                  this.controller_.removeObserver(this);
              }),
              (t.prototype.gatherActive = function () {
                var t = this;
                this.clearActive(),
                  this.observations_.forEach(function (e) {
                    e.isActive() && t.activeObservations_.push(e);
                  });
              }),
              (t.prototype.broadcastActive = function () {
                if (this.hasActive()) {
                  var t = this.callbackCtx_,
                    e = this.activeObservations_.map(function (t) {
                      return new y(t.target, t.broadcastRect());
                    });
                  this.callback_.call(t, e, t), this.clearActive();
                }
              }),
              (t.prototype.clearActive = function () {
                this.activeObservations_.splice(0);
              }),
              (t.prototype.hasActive = function () {
                return this.activeObservations_.length > 0;
              }),
              t
            );
          })(),
          w = "undefined" != typeof WeakMap ? new WeakMap() : new r(),
          x = function t(e) {
            if (!(this instanceof t))
              throw new TypeError("Cannot call a class as a function.");
            if (!arguments.length)
              throw new TypeError("1 argument required, but only 0 present.");
            var r = c.getInstance(),
              n = new b(e, r, this);
            w.set(this, n);
          };
        ["observe", "unobserve", "disconnect"].forEach(function (t) {
          x.prototype[t] = function () {
            var e;
            return (e = w.get(this))[t].apply(e, arguments);
          };
        });
        var k = void 0 !== i.ResizeObserver ? i.ResizeObserver : x;
        e.a = k;
      }.call(this, r(19)));
    },
    function (t, e, r) {
      "use strict";
      var n =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          },
        i = n(r(36)),
        o = n(r(178));
      (i.default.DefaultOpts.ImageClass = o.default), (t.exports = i.default);
    },
    function (t, e, r) {
      var n = r(37),
        i = r(65),
        o = r(79),
        s = r(1);
      t.exports = function (t, e) {
        return (s(t) ? n : i)(t, o(e, 3));
      };
    },
    function (t, e, r) {
      var n = r(66);
      t.exports = function (t, e) {
        var r = [];
        return (
          n(t, function (t, n, i) {
            e(t, n, i) && r.push(t);
          }),
          r
        );
      };
    },
    function (t, e, r) {
      var n = r(67),
        i = r(78)(n);
      t.exports = i;
    },
    function (t, e, r) {
      var n = r(68),
        i = r(5);
      t.exports = function (t, e) {
        return t && n(t, e, i);
      };
    },
    function (t, e, r) {
      var n = r(69)();
      t.exports = n;
    },
    function (t, e) {
      t.exports = function (t) {
        return function (e, r, n) {
          for (var i = -1, o = Object(e), s = n(e), a = s.length; a--; ) {
            var c = s[t ? a : ++i];
            if (!1 === r(o[c], c, o)) break;
          }
          return e;
        };
      };
    },
    function (t, e) {
      t.exports = function (t, e) {
        for (var r = -1, n = Array(t); ++r < t; ) n[r] = e(r);
        return n;
      };
    },
    function (t, e, r) {
      var n = r(6),
        i = r(2);
      t.exports = function (t) {
        return i(t) && "[object Arguments]" == n(t);
      };
    },
    function (t, e, r) {
      var n = r(7),
        i = Object.prototype,
        o = i.hasOwnProperty,
        s = i.toString,
        a = n ? n.toStringTag : void 0;
      t.exports = function (t) {
        var e = o.call(t, a),
          r = t[a];
        try {
          t[a] = void 0;
          var n = !0;
        } catch (t) {}
        var i = s.call(t);
        return n && (e ? (t[a] = r) : delete t[a]), i;
      };
    },
    function (t, e) {
      var r = Object.prototype.toString;
      t.exports = function (t) {
        return r.call(t);
      };
    },
    function (t, e) {
      t.exports = function () {
        return !1;
      };
    },
    function (t, e, r) {
      var n = r(6),
        i = r(23),
        o = r(2),
        s = {};
      (s["[object Float32Array]"] = s["[object Float64Array]"] = s[
        "[object Int8Array]"
      ] = s["[object Int16Array]"] = s["[object Int32Array]"] = s[
        "[object Uint8Array]"
      ] = s["[object Uint8ClampedArray]"] = s["[object Uint16Array]"] = s[
        "[object Uint32Array]"
      ] = !0),
        (s["[object Arguments]"] = s["[object Array]"] = s[
          "[object ArrayBuffer]"
        ] = s["[object Boolean]"] = s["[object DataView]"] = s[
          "[object Date]"
        ] = s["[object Error]"] = s["[object Function]"] = s[
          "[object Map]"
        ] = s["[object Number]"] = s["[object Object]"] = s[
          "[object RegExp]"
        ] = s["[object Set]"] = s["[object String]"] = s[
          "[object WeakMap]"
        ] = !1),
        (t.exports = function (t) {
          return o(t) && i(t.length) && !!s[n(t)];
        });
    },
    function (t, e, r) {
      var n = r(26),
        i = r(77),
        o = Object.prototype.hasOwnProperty;
      t.exports = function (t) {
        if (!n(t)) return i(t);
        var e = [];
        for (var r in Object(t))
          o.call(t, r) && "constructor" != r && e.push(r);
        return e;
      };
    },
    function (t, e, r) {
      var n = r(42)(Object.keys, Object);
      t.exports = n;
    },
    function (t, e, r) {
      var n = r(11);
      t.exports = function (t, e) {
        return function (r, i) {
          if (null == r) return r;
          if (!n(r)) return t(r, i);
          for (
            var o = r.length, s = e ? o : -1, a = Object(r);
            (e ? s-- : ++s < o) && !1 !== i(a[s], s, a);

          );
          return r;
        };
      };
    },
    function (t, e, r) {
      var n = r(80),
        i = r(123),
        o = r(33),
        s = r(1),
        a = r(134);
      t.exports = function (t) {
        return "function" == typeof t
          ? t
          : null == t
          ? o
          : "object" == typeof t
          ? s(t)
            ? i(t[0], t[1])
            : n(t)
          : a(t);
      };
    },
    function (t, e, r) {
      var n = r(81),
        i = r(122),
        o = r(53);
      t.exports = function (t) {
        var e = i(t);
        return 1 == e.length && e[0][2]
          ? o(e[0][0], e[0][1])
          : function (r) {
              return r === t || n(r, t, e);
            };
      };
    },
    function (t, e, r) {
      var n = r(27),
        i = r(45);
      t.exports = function (t, e, r, o) {
        var s = r.length,
          a = s,
          c = !o;
        if (null == t) return !a;
        for (t = Object(t); s--; ) {
          var l = r[s];
          if (c && l[2] ? l[1] !== t[l[0]] : !(l[0] in t)) return !1;
        }
        for (; ++s < a; ) {
          var u = (l = r[s])[0],
            h = t[u],
            p = l[1];
          if (c && l[2]) {
            if (void 0 === h && !(u in t)) return !1;
          } else {
            var d = new n();
            if (o) var f = o(h, p, u, t, e, d);
            if (!(void 0 === f ? i(p, h, 3, o, d) : f)) return !1;
          }
        }
        return !0;
      };
    },
    function (t, e) {
      t.exports = function () {
        (this.__data__ = []), (this.size = 0);
      };
    },
    function (t, e, r) {
      var n = r(13),
        i = Array.prototype.splice;
      t.exports = function (t) {
        var e = this.__data__,
          r = n(e, t);
        return (
          !(r < 0) &&
          (r == e.length - 1 ? e.pop() : i.call(e, r, 1), --this.size, !0)
        );
      };
    },
    function (t, e, r) {
      var n = r(13);
      t.exports = function (t) {
        var e = this.__data__,
          r = n(e, t);
        return r < 0 ? void 0 : e[r][1];
      };
    },
    function (t, e, r) {
      var n = r(13);
      t.exports = function (t) {
        return n(this.__data__, t) > -1;
      };
    },
    function (t, e, r) {
      var n = r(13);
      t.exports = function (t, e) {
        var r = this.__data__,
          i = n(r, t);
        return i < 0 ? (++this.size, r.push([t, e])) : (r[i][1] = e), this;
      };
    },
    function (t, e, r) {
      var n = r(12);
      t.exports = function () {
        (this.__data__ = new n()), (this.size = 0);
      };
    },
    function (t, e) {
      t.exports = function (t) {
        var e = this.__data__,
          r = e.delete(t);
        return (this.size = e.size), r;
      };
    },
    function (t, e) {
      t.exports = function (t) {
        return this.__data__.get(t);
      };
    },
    function (t, e) {
      t.exports = function (t) {
        return this.__data__.has(t);
      };
    },
    function (t, e, r) {
      var n = r(12),
        i = r(28),
        o = r(29);
      t.exports = function (t, e) {
        var r = this.__data__;
        if (r instanceof n) {
          var s = r.__data__;
          if (!i || s.length < 199)
            return s.push([t, e]), (this.size = ++r.size), this;
          r = this.__data__ = new o(s);
        }
        return r.set(t, e), (this.size = r.size), this;
      };
    },
    function (t, e, r) {
      var n = r(43),
        i = r(93),
        o = r(3),
        s = r(44),
        a = /^\[object .+?Constructor\]$/,
        c = Function.prototype,
        l = Object.prototype,
        u = c.toString,
        h = l.hasOwnProperty,
        p = RegExp(
          "^" +
            u
              .call(h)
              .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                "$1.*?"
              ) +
            "$"
        );
      t.exports = function (t) {
        return !(!o(t) || i(t)) && (n(t) ? p : a).test(s(t));
      };
    },
    function (t, e, r) {
      var n,
        i = r(94),
        o = (n = /[^.]+$/.exec((i && i.keys && i.keys.IE_PROTO) || ""))
          ? "Symbol(src)_1." + n
          : "";
      t.exports = function (t) {
        return !!o && o in t;
      };
    },
    function (t, e, r) {
      var n = r(0)["__core-js_shared__"];
      t.exports = n;
    },
    function (t, e) {
      t.exports = function (t, e) {
        return null == t ? void 0 : t[e];
      };
    },
    function (t, e, r) {
      var n = r(97),
        i = r(12),
        o = r(28);
      t.exports = function () {
        (this.size = 0),
          (this.__data__ = {
            hash: new n(),
            map: new (o || i)(),
            string: new n(),
          });
      };
    },
    function (t, e, r) {
      var n = r(98),
        i = r(99),
        o = r(100),
        s = r(101),
        a = r(102);
      function c(t) {
        var e = -1,
          r = null == t ? 0 : t.length;
        for (this.clear(); ++e < r; ) {
          var n = t[e];
          this.set(n[0], n[1]);
        }
      }
      (c.prototype.clear = n),
        (c.prototype.delete = i),
        (c.prototype.get = o),
        (c.prototype.has = s),
        (c.prototype.set = a),
        (t.exports = c);
    },
    function (t, e, r) {
      var n = r(14);
      t.exports = function () {
        (this.__data__ = n ? n(null) : {}), (this.size = 0);
      };
    },
    function (t, e) {
      t.exports = function (t) {
        var e = this.has(t) && delete this.__data__[t];
        return (this.size -= e ? 1 : 0), e;
      };
    },
    function (t, e, r) {
      var n = r(14),
        i = Object.prototype.hasOwnProperty;
      t.exports = function (t) {
        var e = this.__data__;
        if (n) {
          var r = e[t];
          return "__lodash_hash_undefined__" === r ? void 0 : r;
        }
        return i.call(e, t) ? e[t] : void 0;
      };
    },
    function (t, e, r) {
      var n = r(14),
        i = Object.prototype.hasOwnProperty;
      t.exports = function (t) {
        var e = this.__data__;
        return n ? void 0 !== e[t] : i.call(e, t);
      };
    },
    function (t, e, r) {
      var n = r(14);
      t.exports = function (t, e) {
        var r = this.__data__;
        return (
          (this.size += this.has(t) ? 0 : 1),
          (r[t] = n && void 0 === e ? "__lodash_hash_undefined__" : e),
          this
        );
      };
    },
    function (t, e, r) {
      var n = r(15);
      t.exports = function (t) {
        var e = n(this, t).delete(t);
        return (this.size -= e ? 1 : 0), e;
      };
    },
    function (t, e) {
      t.exports = function (t) {
        var e = typeof t;
        return "string" == e || "number" == e || "symbol" == e || "boolean" == e
          ? "__proto__" !== t
          : null === t;
      };
    },
    function (t, e, r) {
      var n = r(15);
      t.exports = function (t) {
        return n(this, t).get(t);
      };
    },
    function (t, e, r) {
      var n = r(15);
      t.exports = function (t) {
        return n(this, t).has(t);
      };
    },
    function (t, e, r) {
      var n = r(15);
      t.exports = function (t, e) {
        var r = n(this, t),
          i = r.size;
        return r.set(t, e), (this.size += r.size == i ? 0 : 1), this;
      };
    },
    function (t, e, r) {
      var n = r(27),
        i = r(46),
        o = r(114),
        s = r(117),
        a = r(16),
        c = r(1),
        l = r(21),
        u = r(41),
        h = "[object Object]",
        p = Object.prototype.hasOwnProperty;
      t.exports = function (t, e, r, d, f, m) {
        var g = c(t),
          v = c(e),
          _ = g ? "[object Array]" : a(t),
          y = v ? "[object Array]" : a(e),
          b = (_ = "[object Arguments]" == _ ? h : _) == h,
          w = (y = "[object Arguments]" == y ? h : y) == h,
          x = _ == y;
        if (x && l(t)) {
          if (!l(e)) return !1;
          (g = !0), (b = !1);
        }
        if (x && !b)
          return (
            m || (m = new n()),
            g || u(t) ? i(t, e, r, d, f, m) : o(t, e, _, r, d, f, m)
          );
        if (!(1 & r)) {
          var k = b && p.call(t, "__wrapped__"),
            S = w && p.call(e, "__wrapped__");
          if (k || S) {
            var j = k ? t.value() : t,
              $ = S ? e.value() : e;
            return m || (m = new n()), f(j, $, r, d, m);
          }
        }
        return !!x && (m || (m = new n()), s(t, e, r, d, f, m));
      };
    },
    function (t, e, r) {
      var n = r(29),
        i = r(110),
        o = r(111);
      function s(t) {
        var e = -1,
          r = null == t ? 0 : t.length;
        for (this.__data__ = new n(); ++e < r; ) this.add(t[e]);
      }
      (s.prototype.add = s.prototype.push = i),
        (s.prototype.has = o),
        (t.exports = s);
    },
    function (t, e) {
      t.exports = function (t) {
        return this.__data__.set(t, "__lodash_hash_undefined__"), this;
      };
    },
    function (t, e) {
      t.exports = function (t) {
        return this.__data__.has(t);
      };
    },
    function (t, e) {
      t.exports = function (t, e) {
        for (var r = -1, n = null == t ? 0 : t.length; ++r < n; )
          if (e(t[r], r, t)) return !0;
        return !1;
      };
    },
    function (t, e) {
      t.exports = function (t, e) {
        return t.has(e);
      };
    },
    function (t, e, r) {
      var n = r(7),
        i = r(47),
        o = r(8),
        s = r(46),
        a = r(115),
        c = r(116),
        l = n ? n.prototype : void 0,
        u = l ? l.valueOf : void 0;
      t.exports = function (t, e, r, n, l, h, p) {
        switch (r) {
          case "[object DataView]":
            if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
              return !1;
            (t = t.buffer), (e = e.buffer);
          case "[object ArrayBuffer]":
            return !(t.byteLength != e.byteLength || !h(new i(t), new i(e)));
          case "[object Boolean]":
          case "[object Date]":
          case "[object Number]":
            return o(+t, +e);
          case "[object Error]":
            return t.name == e.name && t.message == e.message;
          case "[object RegExp]":
          case "[object String]":
            return t == e + "";
          case "[object Map]":
            var d = a;
          case "[object Set]":
            var f = 1 & n;
            if ((d || (d = c), t.size != e.size && !f)) return !1;
            var m = p.get(t);
            if (m) return m == e;
            (n |= 2), p.set(t, e);
            var g = s(d(t), d(e), n, l, h, p);
            return p.delete(t), g;
          case "[object Symbol]":
            if (u) return u.call(t) == u.call(e);
        }
        return !1;
      };
    },
    function (t, e) {
      t.exports = function (t) {
        var e = -1,
          r = Array(t.size);
        return (
          t.forEach(function (t, n) {
            r[++e] = [n, t];
          }),
          r
        );
      };
    },
    function (t, e) {
      t.exports = function (t) {
        var e = -1,
          r = Array(t.size);
        return (
          t.forEach(function (t) {
            r[++e] = t;
          }),
          r
        );
      };
    },
    function (t, e, r) {
      var n = r(48),
        i = Object.prototype.hasOwnProperty;
      t.exports = function (t, e, r, o, s, a) {
        var c = 1 & r,
          l = n(t),
          u = l.length;
        if (u != n(e).length && !c) return !1;
        for (var h = u; h--; ) {
          var p = l[h];
          if (!(c ? p in e : i.call(e, p))) return !1;
        }
        var d = a.get(t);
        if (d && a.get(e)) return d == e;
        var f = !0;
        a.set(t, e), a.set(e, t);
        for (var m = c; ++h < u; ) {
          var g = t[(p = l[h])],
            v = e[p];
          if (o) var _ = c ? o(v, g, p, e, t, a) : o(g, v, p, t, e, a);
          if (!(void 0 === _ ? g === v || s(g, v, r, o, a) : _)) {
            f = !1;
            break;
          }
          m || (m = "constructor" == p);
        }
        if (f && !m) {
          var y = t.constructor,
            b = e.constructor;
          y == b ||
            !("constructor" in t) ||
            !("constructor" in e) ||
            ("function" == typeof y &&
              y instanceof y &&
              "function" == typeof b &&
              b instanceof b) ||
            (f = !1);
        }
        return a.delete(t), a.delete(e), f;
      };
    },
    function (t, e, r) {
      var n = r(4)(r(0), "DataView");
      t.exports = n;
    },
    function (t, e, r) {
      var n = r(4)(r(0), "Promise");
      t.exports = n;
    },
    function (t, e, r) {
      var n = r(4)(r(0), "Set");
      t.exports = n;
    },
    function (t, e, r) {
      var n = r(4)(r(0), "WeakMap");
      t.exports = n;
    },
    function (t, e, r) {
      var n = r(52),
        i = r(5);
      t.exports = function (t) {
        for (var e = i(t), r = e.length; r--; ) {
          var o = e[r],
            s = t[o];
          e[r] = [o, s, n(s)];
        }
        return e;
      };
    },
    function (t, e, r) {
      var n = r(45),
        i = r(124),
        o = r(131),
        s = r(31),
        a = r(52),
        c = r(53),
        l = r(17);
      t.exports = function (t, e) {
        return s(t) && a(e)
          ? c(l(t), e)
          : function (r) {
              var s = i(r, t);
              return void 0 === s && s === e ? o(r, t) : n(e, s, 3);
            };
      };
    },
    function (t, e, r) {
      var n = r(54);
      t.exports = function (t, e, r) {
        var i = null == t ? void 0 : n(t, e);
        return void 0 === i ? r : i;
      };
    },
    function (t, e, r) {
      var n = r(126),
        i = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        o = /\\(\\)?/g,
        s = n(function (t) {
          var e = [];
          return (
            46 === t.charCodeAt(0) && e.push(""),
            t.replace(i, function (t, r, n, i) {
              e.push(n ? i.replace(o, "$1") : r || t);
            }),
            e
          );
        });
      t.exports = s;
    },
    function (t, e, r) {
      var n = r(127);
      t.exports = function (t) {
        var e = n(t, function (t) {
            return 500 === r.size && r.clear(), t;
          }),
          r = e.cache;
        return e;
      };
    },
    function (t, e, r) {
      var n = r(29);
      function i(t, e) {
        if ("function" != typeof t || (null != e && "function" != typeof e))
          throw new TypeError("Expected a function");
        var r = function () {
          var n = arguments,
            i = e ? e.apply(this, n) : n[0],
            o = r.cache;
          if (o.has(i)) return o.get(i);
          var s = t.apply(this, n);
          return (r.cache = o.set(i, s) || o), s;
        };
        return (r.cache = new (i.Cache || n)()), r;
      }
      (i.Cache = n), (t.exports = i);
    },
    function (t, e, r) {
      var n = r(129);
      t.exports = function (t) {
        return null == t ? "" : n(t);
      };
    },
    function (t, e, r) {
      var n = r(7),
        i = r(130),
        o = r(1),
        s = r(32),
        a = n ? n.prototype : void 0,
        c = a ? a.toString : void 0;
      t.exports = function t(e) {
        if ("string" == typeof e) return e;
        if (o(e)) return i(e, t) + "";
        if (s(e)) return c ? c.call(e) : "";
        var r = e + "";
        return "0" == r && 1 / e == -1 / 0 ? "-0" : r;
      };
    },
    function (t, e) {
      t.exports = function (t, e) {
        for (var r = -1, n = null == t ? 0 : t.length, i = Array(n); ++r < n; )
          i[r] = e(t[r], r, t);
        return i;
      };
    },
    function (t, e, r) {
      var n = r(132),
        i = r(133);
      t.exports = function (t, e) {
        return null != t && i(t, e, n);
      };
    },
    function (t, e) {
      t.exports = function (t, e) {
        return null != t && e in Object(t);
      };
    },
    function (t, e, r) {
      var n = r(55),
        i = r(39),
        o = r(1),
        s = r(22),
        a = r(23),
        c = r(17);
      t.exports = function (t, e, r) {
        for (var l = -1, u = (e = n(e, t)).length, h = !1; ++l < u; ) {
          var p = c(e[l]);
          if (!(h = null != t && r(t, p))) break;
          t = t[p];
        }
        return h || ++l != u
          ? h
          : !!(u = null == t ? 0 : t.length) &&
              a(u) &&
              s(p, u) &&
              (o(t) || i(t));
      };
    },
    function (t, e, r) {
      var n = r(135),
        i = r(136),
        o = r(31),
        s = r(17);
      t.exports = function (t) {
        return o(t) ? n(s(t)) : i(t);
      };
    },
    function (t, e) {
      t.exports = function (t) {
        return function (e) {
          return null == e ? void 0 : e[t];
        };
      };
    },
    function (t, e, r) {
      var n = r(54);
      t.exports = function (t) {
        return function (e) {
          return n(e, t);
        };
      };
    },
    function (t, e, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n(r(36)),
        o = r(138),
        s = (function () {
          function t(t, e) {
            void 0 === e && (e = {}),
              (this._src = t),
              (this._opts = e),
              (this._opts.filters = o(i.default.DefaultOpts.filters));
          }
          return (
            (t.prototype.maxColorCount = function (t) {
              return (this._opts.colorCount = t), this;
            }),
            (t.prototype.maxDimension = function (t) {
              return (this._opts.maxDimension = t), this;
            }),
            (t.prototype.addFilter = function (t) {
              return this._opts.filters.push(t), this;
            }),
            (t.prototype.removeFilter = function (t) {
              var e = this._opts.filters.indexOf(t);
              return e > 0 && this._opts.filters.splice(e), this;
            }),
            (t.prototype.clearFilters = function () {
              return (this._opts.filters = []), this;
            }),
            (t.prototype.quality = function (t) {
              return (this._opts.quality = t), this;
            }),
            (t.prototype.useImageClass = function (t) {
              return (this._opts.ImageClass = t), this;
            }),
            (t.prototype.useGenerator = function (t) {
              return (this._opts.generator = t), this;
            }),
            (t.prototype.useQuantizer = function (t) {
              return (this._opts.quantizer = t), this;
            }),
            (t.prototype.build = function () {
              return new i.default(this._src, this._opts);
            }),
            (t.prototype.getPalette = function (t) {
              return this.build().getPalette(t);
            }),
            (t.prototype.getSwatches = function (t) {
              return this.build().getPalette(t);
            }),
            t
          );
        })();
      e.default = s;
    },
    function (t, e, r) {
      var n = r(139);
      t.exports = function (t) {
        return n(t, 4);
      };
    },
    function (t, e, r) {
      var n = r(27),
        i = r(140),
        o = r(56),
        s = r(141),
        a = r(142),
        c = r(145),
        l = r(146),
        u = r(147),
        h = r(148),
        p = r(48),
        d = r(149),
        f = r(16),
        m = r(150),
        g = r(151),
        v = r(156),
        _ = r(1),
        y = r(21),
        b = r(158),
        w = r(3),
        x = r(160),
        k = r(5),
        S = {};
      (S["[object Arguments]"] = S["[object Array]"] = S[
        "[object ArrayBuffer]"
      ] = S["[object DataView]"] = S["[object Boolean]"] = S[
        "[object Date]"
      ] = S["[object Float32Array]"] = S["[object Float64Array]"] = S[
        "[object Int8Array]"
      ] = S["[object Int16Array]"] = S["[object Int32Array]"] = S[
        "[object Map]"
      ] = S["[object Number]"] = S["[object Object]"] = S[
        "[object RegExp]"
      ] = S["[object Set]"] = S["[object String]"] = S["[object Symbol]"] = S[
        "[object Uint8Array]"
      ] = S["[object Uint8ClampedArray]"] = S["[object Uint16Array]"] = S[
        "[object Uint32Array]"
      ] = !0),
        (S["[object Error]"] = S["[object Function]"] = S[
          "[object WeakMap]"
        ] = !1),
        (t.exports = function t(e, r, j, $, O, P) {
          var C,
            A = 1 & r,
            E = 2 & r,
            M = 4 & r;
          if ((j && (C = O ? j(e, $, O, P) : j(e)), void 0 !== C)) return C;
          if (!w(e)) return e;
          var T = _(e);
          if (T) {
            if (((C = m(e)), !A)) return l(e, C);
          } else {
            var I = f(e),
              V = "[object Function]" == I || "[object GeneratorFunction]" == I;
            if (y(e)) return c(e, A);
            if (
              "[object Object]" == I ||
              "[object Arguments]" == I ||
              (V && !O)
            ) {
              if (((C = E || V ? {} : v(e)), !A))
                return E ? h(e, a(C, e)) : u(e, s(C, e));
            } else {
              if (!S[I]) return O ? e : {};
              C = g(e, I, A);
            }
          }
          P || (P = new n());
          var N = P.get(e);
          if (N) return N;
          P.set(e, C),
            x(e)
              ? e.forEach(function (n) {
                  C.add(t(n, r, j, n, e, P));
                })
              : b(e) &&
                e.forEach(function (n, i) {
                  C.set(i, t(n, r, j, i, e, P));
                });
          var z = M ? (E ? d : p) : E ? keysIn : k,
            L = T ? void 0 : z(e);
          return (
            i(L || e, function (n, i) {
              L && (n = e[(i = n)]), o(C, i, t(n, r, j, i, e, P));
            }),
            C
          );
        });
    },
    function (t, e) {
      t.exports = function (t, e) {
        for (
          var r = -1, n = null == t ? 0 : t.length;
          ++r < n && !1 !== e(t[r], r, t);

        );
        return t;
      };
    },
    function (t, e, r) {
      var n = r(18),
        i = r(5);
      t.exports = function (t, e) {
        return t && n(e, i(e), t);
      };
    },
    function (t, e, r) {
      var n = r(18),
        i = r(34);
      t.exports = function (t, e) {
        return t && n(e, i(e), t);
      };
    },
    function (t, e, r) {
      var n = r(3),
        i = r(26),
        o = r(144),
        s = Object.prototype.hasOwnProperty;
      t.exports = function (t) {
        if (!n(t)) return o(t);
        var e = i(t),
          r = [];
        for (var a in t)
          ("constructor" != a || (!e && s.call(t, a))) && r.push(a);
        return r;
      };
    },
    function (t, e) {
      t.exports = function (t) {
        var e = [];
        if (null != t) for (var r in Object(t)) e.push(r);
        return e;
      };
    },
    function (t, e, r) {
      (function (t) {
        var n = r(0),
          i = e && !e.nodeType && e,
          o = i && "object" == typeof t && t && !t.nodeType && t,
          s = o && o.exports === i ? n.Buffer : void 0,
          a = s ? s.allocUnsafe : void 0;
        t.exports = function (t, e) {
          if (e) return t.slice();
          var r = t.length,
            n = a ? a(r) : new t.constructor(r);
          return t.copy(n), n;
        };
      }.call(this, r(10)(t)));
    },
    function (t, e) {
      t.exports = function (t, e) {
        var r = -1,
          n = t.length;
        for (e || (e = Array(n)); ++r < n; ) e[r] = t[r];
        return e;
      };
    },
    function (t, e, r) {
      var n = r(18),
        i = r(30);
      t.exports = function (t, e) {
        return n(t, i(t), e);
      };
    },
    function (t, e, r) {
      var n = r(18),
        i = r(59);
      t.exports = function (t, e) {
        return n(t, i(t), e);
      };
    },
    function (t, e, r) {
      var n = r(49),
        i = r(59),
        o = r(34);
      t.exports = function (t) {
        return n(t, o, i);
      };
    },
    function (t, e) {
      var r = Object.prototype.hasOwnProperty;
      t.exports = function (t) {
        var e = t.length,
          n = new t.constructor(e);
        return (
          e &&
            "string" == typeof t[0] &&
            r.call(t, "index") &&
            ((n.index = t.index), (n.input = t.input)),
          n
        );
      };
    },
    function (t, e, r) {
      var n = r(35),
        i = r(152),
        o = r(153),
        s = r(154),
        a = r(155);
      t.exports = function (t, e, r) {
        var c = t.constructor;
        switch (e) {
          case "[object ArrayBuffer]":
            return n(t);
          case "[object Boolean]":
          case "[object Date]":
            return new c(+t);
          case "[object DataView]":
            return i(t, r);
          case "[object Float32Array]":
          case "[object Float64Array]":
          case "[object Int8Array]":
          case "[object Int16Array]":
          case "[object Int32Array]":
          case "[object Uint8Array]":
          case "[object Uint8ClampedArray]":
          case "[object Uint16Array]":
          case "[object Uint32Array]":
            return a(t, r);
          case "[object Map]":
            return new c();
          case "[object Number]":
          case "[object String]":
            return new c(t);
          case "[object RegExp]":
            return o(t);
          case "[object Set]":
            return new c();
          case "[object Symbol]":
            return s(t);
        }
      };
    },
    function (t, e, r) {
      var n = r(35);
      t.exports = function (t, e) {
        var r = e ? n(t.buffer) : t.buffer;
        return new t.constructor(r, t.byteOffset, t.byteLength);
      };
    },
    function (t, e) {
      var r = /\w*$/;
      t.exports = function (t) {
        var e = new t.constructor(t.source, r.exec(t));
        return (e.lastIndex = t.lastIndex), e;
      };
    },
    function (t, e, r) {
      var n = r(7),
        i = n ? n.prototype : void 0,
        o = i ? i.valueOf : void 0;
      t.exports = function (t) {
        return o ? Object(o.call(t)) : {};
      };
    },
    function (t, e, r) {
      var n = r(35);
      t.exports = function (t, e) {
        var r = e ? n(t.buffer) : t.buffer;
        return new t.constructor(r, t.byteOffset, t.length);
      };
    },
    function (t, e, r) {
      var n = r(157),
        i = r(60),
        o = r(26);
      t.exports = function (t) {
        return "function" != typeof t.constructor || o(t) ? {} : n(i(t));
      };
    },
    function (t, e, r) {
      var n = r(3),
        i = Object.create,
        o = (function () {
          function t() {}
          return function (e) {
            if (!n(e)) return {};
            if (i) return i(e);
            t.prototype = e;
            var r = new t();
            return (t.prototype = void 0), r;
          };
        })();
      t.exports = o;
    },
    function (t, e, r) {
      var n = r(159),
        i = r(24),
        o = r(25),
        s = o && o.isMap,
        a = s ? i(s) : n;
      t.exports = a;
    },
    function (t, e, r) {
      var n = r(16),
        i = r(2);
      t.exports = function (t) {
        return i(t) && "[object Map]" == n(t);
      };
    },
    function (t, e, r) {
      var n = r(161),
        i = r(24),
        o = r(25),
        s = o && o.isSet,
        a = s ? i(s) : n;
      t.exports = a;
    },
    function (t, e, r) {
      var n = r(16),
        i = r(2);
      t.exports = function (t) {
        return i(t) && "[object Set]" == n(t);
      };
    },
    function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = r(163);
      (e.MMCQ = n.default), (e.WebWorker = null);
    },
    function (t, e, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (t) {
          return t && t.__esModule ? t : { default: t };
        };
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = r(20),
        o = n(r(164)),
        s = n(r(165));
      function a(t, e) {
        for (var r = t.size(); t.size() < e; ) {
          var n = t.pop();
          if (!(n && n.count() > 0)) break;
          var i = n.split(),
            o = i[0],
            s = i[1];
          if ((t.push(o), s && s.count() > 0 && t.push(s), t.size() === r))
            break;
          r = t.size();
        }
      }
      e.default = function (t, e) {
        if (0 === t.length || e.colorCount < 2 || e.colorCount > 256)
          throw new Error("Wrong MMCQ parameters");
        var r = o.default.build(t),
          n = r.hist,
          c =
            (Object.keys(n).length,
            new s.default(function (t, e) {
              return t.count() - e.count();
            }));
        c.push(r), a(c, 0.75 * e.colorCount);
        var l = new s.default(function (t, e) {
          return t.count() * t.volume() - e.count() * e.volume();
        });
        return (
          (l.contents = c.contents),
          a(l, e.colorCount - l.size()),
          (function (t) {
            var e = [];
            for (; t.size(); ) {
              var r = t.pop(),
                n = r.avg();
              n[0], n[1], n[2];
              e.push(new i.Swatch(n, r.count()));
            }
            return e;
          })(l)
        );
      };
    },
    function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = r(9),
        i = (function () {
          function t(t, e, r, n, i, o, s) {
            (this._volume = -1),
              (this._count = -1),
              (this.dimension = { r1: t, r2: e, g1: r, g2: n, b1: i, b2: o }),
              (this.hist = s);
          }
          return (
            (t.build = function (e, r) {
              var i,
                o,
                s,
                a,
                c,
                l,
                u,
                h,
                p,
                d = 1 << (3 * n.SIGBITS),
                f = new Uint32Array(d);
              (i = s = c = 0), (o = a = l = Number.MAX_VALUE);
              for (var m = e.length / 4, g = 0; g < m; ) {
                var v = 4 * g;
                if (
                  (g++,
                  (u = e[v + 0]),
                  (h = e[v + 1]),
                  (p = e[v + 2]),
                  0 !== e[v + 3])
                )
                  (u >>= n.RSHIFT),
                    (h >>= n.RSHIFT),
                    (p >>= n.RSHIFT),
                    (f[n.getColorIndex(u, h, p)] += 1),
                    u > i && (i = u),
                    u < o && (o = u),
                    h > s && (s = h),
                    h < a && (a = h),
                    p > c && (c = p),
                    p < l && (l = p);
              }
              return new t(o, i, a, s, l, c, f);
            }),
            (t.prototype.invalidate = function () {
              (this._volume = this._count = -1), (this._avg = null);
            }),
            (t.prototype.volume = function () {
              if (this._volume < 0) {
                var t = this.dimension,
                  e = t.r1,
                  r = t.r2,
                  n = t.g1,
                  i = t.g2,
                  o = t.b1,
                  s = t.b2;
                this._volume = (r - e + 1) * (i - n + 1) * (s - o + 1);
              }
              return this._volume;
            }),
            (t.prototype.count = function () {
              if (this._count < 0) {
                for (
                  var t = this.hist,
                    e = this.dimension,
                    r = e.r1,
                    i = e.r2,
                    o = e.g1,
                    s = e.g2,
                    a = e.b1,
                    c = e.b2,
                    l = 0,
                    u = r;
                  u <= i;
                  u++
                )
                  for (var h = o; h <= s; h++)
                    for (var p = a; p <= c; p++) {
                      l += t[n.getColorIndex(u, h, p)];
                    }
                this._count = l;
              }
              return this._count;
            }),
            (t.prototype.clone = function () {
              var e = this.hist,
                r = this.dimension;
              return new t(r.r1, r.r2, r.g1, r.g2, r.b1, r.b2, e);
            }),
            (t.prototype.avg = function () {
              if (!this._avg) {
                var t = this.hist,
                  e = this.dimension,
                  r = e.r1,
                  i = e.r2,
                  o = e.g1,
                  s = e.g2,
                  a = e.b1,
                  c = e.b2,
                  l = 0,
                  u = 1 << (8 - n.SIGBITS),
                  h = void 0,
                  p = void 0,
                  d = void 0;
                h = p = d = 0;
                for (var f = r; f <= i; f++)
                  for (var m = o; m <= s; m++)
                    for (var g = a; g <= c; g++) {
                      var v = t[n.getColorIndex(f, m, g)];
                      (l += v),
                        (h += v * (f + 0.5) * u),
                        (p += v * (m + 0.5) * u),
                        (d += v * (g + 0.5) * u);
                    }
                this._avg = l
                  ? [~~(h / l), ~~(p / l), ~~(d / l)]
                  : [
                      ~~((u * (r + i + 1)) / 2),
                      ~~((u * (o + s + 1)) / 2),
                      ~~((u * (a + c + 1)) / 2),
                    ];
              }
              return this._avg;
            }),
            (t.prototype.contains = function (t) {
              var e = t[0],
                r = t[1],
                i = t[2],
                o = this.dimension,
                s = o.r1,
                a = o.r2,
                c = o.g1,
                l = o.g2,
                u = o.b1,
                h = o.b2;
              return (
                (e >>= n.RSHIFT),
                (r >>= n.RSHIFT),
                (i >>= n.RSHIFT),
                e >= s && e <= a && r >= c && r <= l && i >= u && i <= h
              );
            }),
            (t.prototype.split = function () {
              var t = this.hist,
                e = this.dimension,
                r = e.r1,
                i = e.r2,
                o = e.g1,
                s = e.g2,
                a = e.b1,
                c = e.b2,
                l = this.count();
              if (!l) return [];
              if (1 === l) return [this.clone()];
              var u,
                h,
                p = i - r + 1,
                d = s - o + 1,
                f = c - a + 1,
                m = Math.max(p, d, f),
                g = null;
              u = h = 0;
              var v = null;
              if (m === p) {
                (v = "r"), (g = new Uint32Array(i + 1));
                for (var _ = r; _ <= i; _++) {
                  u = 0;
                  for (var y = o; y <= s; y++)
                    for (var b = a; b <= c; b++) {
                      u += t[n.getColorIndex(_, y, b)];
                    }
                  (h += u), (g[_] = h);
                }
              } else if (m === d) {
                (v = "g"), (g = new Uint32Array(s + 1));
                for (y = o; y <= s; y++) {
                  u = 0;
                  for (_ = r; _ <= i; _++)
                    for (b = a; b <= c; b++) {
                      u += t[n.getColorIndex(_, y, b)];
                    }
                  (h += u), (g[y] = h);
                }
              } else {
                (v = "b"), (g = new Uint32Array(c + 1));
                for (b = a; b <= c; b++) {
                  u = 0;
                  for (_ = r; _ <= i; _++)
                    for (y = o; y <= s; y++) {
                      u += t[n.getColorIndex(_, y, b)];
                    }
                  (h += u), (g[b] = h);
                }
              }
              for (
                var w = -1, x = new Uint32Array(g.length), k = 0;
                k < g.length;
                k++
              ) {
                var S = g[k];
                w < 0 && S > h / 2 && (w = k), (x[k] = h - S);
              }
              var j = this;
              return (function (t) {
                var e = t + "1",
                  r = t + "2",
                  n = j.dimension[e],
                  i = j.dimension[r],
                  o = j.clone(),
                  s = j.clone(),
                  a = w - n,
                  c = i - w;
                for (
                  a <= c
                    ? ((i = Math.min(i - 1, ~~(w + c / 2))),
                      (i = Math.max(0, i)))
                    : ((i = Math.max(n, ~~(w - 1 - a / 2))),
                      (i = Math.min(j.dimension[r], i)));
                  !g[i];

                )
                  i++;
                for (var l = x[i]; !l && g[i - 1]; ) l = x[--i];
                return (o.dimension[r] = i), (s.dimension[e] = i + 1), [o, s];
              })(v);
            }),
            t
          );
        })();
      e.default = i;
    },
    function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = (function () {
        function t(t) {
          (this._comparator = t), (this.contents = []), (this._sorted = !1);
        }
        return (
          (t.prototype._sort = function () {
            this._sorted ||
              (this.contents.sort(this._comparator), (this._sorted = !0));
          }),
          (t.prototype.push = function (t) {
            this.contents.push(t), (this._sorted = !1);
          }),
          (t.prototype.peek = function (t) {
            return (
              this._sort(),
              (t = "number" == typeof t ? t : this.contents.length - 1),
              this.contents[t]
            );
          }),
          (t.prototype.pop = function () {
            return this._sort(), this.contents.pop();
          }),
          (t.prototype.size = function () {
            return this.contents.length;
          }),
          (t.prototype.map = function (t) {
            return this._sort(), this.contents.map(t);
          }),
          t
        );
      })();
      e.default = n;
    },
    function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = r(167);
      e.Default = n.default;
    },
    function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = r(20),
        i = r(9),
        o = r(61),
        s = {
          targetDarkLuma: 0.26,
          maxDarkLuma: 0.45,
          minLightLuma: 0.55,
          targetLightLuma: 0.74,
          minNormalLuma: 0.3,
          targetNormalLuma: 0.5,
          maxNormalLuma: 0.7,
          targetMutesSaturation: 0.3,
          maxMutesSaturation: 0.4,
          targetVibrantSaturation: 1,
          minVibrantSaturation: 0.35,
          weightSaturation: 3,
          weightLuma: 6.5,
          weightPopulation: 0.5,
        };
      function a(t, e, r, n, i, o, s, a, c, l) {
        var u = null,
          h = 0;
        return (
          e.forEach(function (e) {
            var p = e.getHsl(),
              d = p[1],
              f = p[2];
            if (
              d >= a &&
              d <= c &&
              f >= i &&
              f <= o &&
              !(function (t, e) {
                return (
                  t.Vibrant === e ||
                  t.DarkVibrant === e ||
                  t.LightVibrant === e ||
                  t.Muted === e ||
                  t.DarkMuted === e ||
                  t.LightMuted === e
                );
              })(t, e)
            ) {
              var m = (function (t, e, r, n, i, o, s) {
                function a(t, e) {
                  return 1 - Math.abs(t - e);
                }
                return (function () {
                  for (var t = [], e = 0; e < arguments.length; e++)
                    t[e] = arguments[e];
                  for (var r = 0, n = 0, i = 0; i < t.length; i += 2) {
                    var o = t[i],
                      s = t[i + 1];
                    (r += o * s), (n += s);
                  }
                  return r / n;
                })(
                  a(t, e),
                  s.weightSaturation,
                  a(r, n),
                  s.weightLuma,
                  i / o,
                  s.weightPopulation
                );
              })(d, s, f, n, e.getPopulation(), r, l);
              (null === u || m > h) && ((u = e), (h = m));
            }
          }),
          u
        );
      }
      e.default = function (t, e) {
        e = o({}, e, s);
        var r = (function (t) {
            var e = 0;
            return (
              t.forEach(function (t) {
                e = Math.max(e, t.getPopulation());
              }),
              e
            );
          })(t),
          c = (function (t, e, r) {
            var n = {};
            return (
              (n.Vibrant = a(
                n,
                t,
                e,
                r.targetNormalLuma,
                r.minNormalLuma,
                r.maxNormalLuma,
                r.targetVibrantSaturation,
                r.minVibrantSaturation,
                1,
                r
              )),
              (n.LightVibrant = a(
                n,
                t,
                e,
                r.targetLightLuma,
                r.minLightLuma,
                1,
                r.targetVibrantSaturation,
                r.minVibrantSaturation,
                1,
                r
              )),
              (n.DarkVibrant = a(
                n,
                t,
                e,
                r.targetDarkLuma,
                0,
                r.maxDarkLuma,
                r.targetVibrantSaturation,
                r.minVibrantSaturation,
                1,
                r
              )),
              (n.Muted = a(
                n,
                t,
                e,
                r.targetNormalLuma,
                r.minNormalLuma,
                r.maxNormalLuma,
                r.targetMutesSaturation,
                0,
                r.maxMutesSaturation,
                r
              )),
              (n.LightMuted = a(
                n,
                t,
                e,
                r.targetLightLuma,
                r.minLightLuma,
                1,
                r.targetMutesSaturation,
                0,
                r.maxMutesSaturation,
                r
              )),
              (n.DarkMuted = a(
                n,
                t,
                e,
                r.targetDarkLuma,
                0,
                r.maxDarkLuma,
                r.targetMutesSaturation,
                0,
                r.maxMutesSaturation,
                r
              )),
              n
            );
          })(t, r, e);
        return (
          (function (t, e, r) {
            if (
              null === t.Vibrant &&
              null === t.DarkVibrant &&
              null === t.LightVibrant
            ) {
              if (null === t.DarkVibrant && null !== t.DarkMuted) {
                var o = t.DarkMuted.getHsl(),
                  s = o[0],
                  a = o[1],
                  c = o[2];
                (c = r.targetDarkLuma),
                  (t.DarkVibrant = new n.Swatch(i.hslToRgb(s, a, c), 0));
              }
              if (null === t.LightVibrant && null !== t.LightMuted) {
                var l = t.LightMuted.getHsl();
                (s = l[0]), (a = l[1]), (c = l[2]);
                (c = r.targetDarkLuma),
                  (t.DarkVibrant = new n.Swatch(i.hslToRgb(s, a, c), 0));
              }
            }
            if (null === t.Vibrant && null !== t.DarkVibrant) {
              var u = t.DarkVibrant.getHsl();
              (s = u[0]), (a = u[1]), (c = u[2]);
              (c = r.targetNormalLuma),
                (t.Vibrant = new n.Swatch(i.hslToRgb(s, a, c), 0));
            } else if (null === t.Vibrant && null !== t.LightVibrant) {
              var h = t.LightVibrant.getHsl();
              (s = h[0]), (a = h[1]), (c = h[2]);
              (c = r.targetNormalLuma),
                (t.Vibrant = new n.Swatch(i.hslToRgb(s, a, c), 0));
            }
            if (null === t.DarkVibrant && null !== t.Vibrant) {
              var p = t.Vibrant.getHsl();
              (s = p[0]), (a = p[1]), (c = p[2]);
              (c = r.targetDarkLuma),
                (t.DarkVibrant = new n.Swatch(i.hslToRgb(s, a, c), 0));
            }
            if (null === t.LightVibrant && null !== t.Vibrant) {
              var d = t.Vibrant.getHsl();
              (s = d[0]), (a = d[1]), (c = d[2]);
              (c = r.targetLightLuma),
                (t.LightVibrant = new n.Swatch(i.hslToRgb(s, a, c), 0));
            }
            if (null === t.Muted && null !== t.Vibrant) {
              var f = t.Vibrant.getHsl();
              (s = f[0]), (a = f[1]), (c = f[2]);
              (c = r.targetMutesSaturation),
                (t.Muted = new n.Swatch(i.hslToRgb(s, a, c), 0));
            }
            if (null === t.DarkMuted && null !== t.DarkVibrant) {
              var m = t.DarkVibrant.getHsl();
              (s = m[0]), (a = m[1]), (c = m[2]);
              (c = r.targetMutesSaturation),
                (t.DarkMuted = new n.Swatch(i.hslToRgb(s, a, c), 0));
            }
            if (null === t.LightMuted && null !== t.LightVibrant) {
              var g = t.LightVibrant.getHsl();
              (s = g[0]), (a = g[1]), (c = g[2]);
              (c = r.targetMutesSaturation),
                (t.LightMuted = new n.Swatch(i.hslToRgb(s, a, c), 0));
            }
          })(c, 0, e),
          c
        );
      };
    },
    function (t, e, r) {
      var n = r(33),
        i = r(169),
        o = r(171);
      t.exports = function (t, e) {
        return o(i(t, e, n), t + "");
      };
    },
    function (t, e, r) {
      var n = r(170),
        i = Math.max;
      t.exports = function (t, e, r) {
        return (
          (e = i(void 0 === e ? t.length - 1 : e, 0)),
          function () {
            for (
              var o = arguments, s = -1, a = i(o.length - e, 0), c = Array(a);
              ++s < a;

            )
              c[s] = o[e + s];
            s = -1;
            for (var l = Array(e + 1); ++s < e; ) l[s] = o[s];
            return (l[e] = r(c)), n(t, this, l);
          }
        );
      };
    },
    function (t, e) {
      t.exports = function (t, e, r) {
        switch (r.length) {
          case 0:
            return t.call(e);
          case 1:
            return t.call(e, r[0]);
          case 2:
            return t.call(e, r[0], r[1]);
          case 3:
            return t.call(e, r[0], r[1], r[2]);
        }
        return t.apply(e, r);
      };
    },
    function (t, e, r) {
      var n = r(172),
        i = r(174)(n);
      t.exports = i;
    },
    function (t, e, r) {
      var n = r(173),
        i = r(58),
        o = r(33),
        s = i
          ? function (t, e) {
              return i(t, "toString", {
                configurable: !0,
                enumerable: !1,
                value: n(e),
                writable: !0,
              });
            }
          : o;
      t.exports = s;
    },
    function (t, e) {
      t.exports = function (t) {
        return function () {
          return t;
        };
      };
    },
    function (t, e) {
      var r = Date.now;
      t.exports = function (t) {
        var e = 0,
          n = 0;
        return function () {
          var i = r(),
            o = 16 - (i - n);
          if (((n = i), o > 0)) {
            if (++e >= 800) return arguments[0];
          } else e = 0;
          return t.apply(void 0, arguments);
        };
      };
    },
    function (t, e, r) {
      var n = r(8),
        i = r(11),
        o = r(22),
        s = r(3);
      t.exports = function (t, e, r) {
        if (!s(r)) return !1;
        var a = typeof e;
        return (
          !!("number" == a
            ? i(r) && o(e, r.length)
            : "string" == a && e in r) && n(r[e], t)
        );
      };
    },
    function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = r(177);
      (e.Default = n.default),
        (e.combineFilters = function (t) {
          return Array.isArray(t) && 0 !== t.length
            ? function (e, r, n, i) {
                if (0 === i) return !1;
                for (var o = 0; o < t.length; o++)
                  if (!t[o](e, r, n, i)) return !1;
                return !0;
              }
            : null;
        });
    },
    function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = function (t, e, r, n) {
          return n >= 125 && !(t > 250 && e > 250 && r > 250);
        });
    },
    function (t, e, r) {
      "use strict";
      var n,
        i =
          (this && this.__extends) ||
          ((n = function (t, e) {
            return (n =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              })(t, e);
          }),
          function (t, e) {
            function r() {
              this.constructor = t;
            }
            n(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((r.prototype = e.prototype), new r()));
          }),
        o =
          (this && this.__importStar) ||
          function (t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
              for (var r in t)
                Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return (e.default = t), e;
          };
      Object.defineProperty(e, "__esModule", { value: !0 });
      var s = r(179),
        a = o(r(180));
      var c = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          i(e, t),
          (e.prototype._initCanvas = function () {
            var t = this.image,
              e = (this._canvas = document.createElement("canvas")),
              r = (this._context = e.getContext("2d"));
            (e.className = "vibrant-canvas"),
              (e.style.display = "none"),
              (this._width = e.width = t.width),
              (this._height = e.height = t.height),
              r.drawImage(t, 0, 0),
              document.body.appendChild(e);
          }),
          (e.prototype.load = function (t) {
            var e,
              r,
              n,
              i,
              o,
              s,
              c = this,
              l = null,
              u = null;
            if ("string" == typeof t)
              (l = document.createElement("img")),
                (o = t),
                (null === (s = a.parse(o)).protocol &&
                  null === s.host &&
                  null === s.port) ||
                  ((e = window.location.href),
                  (r = t),
                  (n = a.parse(e)),
                  (i = a.parse(r)),
                  n.protocol === i.protocol &&
                    n.hostname === i.hostname &&
                    n.port === i.port) ||
                  (l.crossOrigin = "anonymous"),
                (u = l.src = t);
            else {
              if (!(t instanceof HTMLImageElement))
                return Promise.reject(
                  new Error("Cannot load buffer as an image in browser")
                );
              (l = t), (u = t.src);
            }
            return (
              (this.image = l),
              new Promise(function (t, e) {
                var r = function () {
                  c._initCanvas(), t(c);
                };
                l.complete
                  ? r()
                  : ((l.onload = r),
                    (l.onerror = function (t) {
                      return e(new Error("Fail to load image: " + u));
                    }));
              })
            );
          }),
          (e.prototype.clear = function () {
            this._context.clearRect(0, 0, this._width, this._height);
          }),
          (e.prototype.update = function (t) {
            this._context.putImageData(t, 0, 0);
          }),
          (e.prototype.getWidth = function () {
            return this._width;
          }),
          (e.prototype.getHeight = function () {
            return this._height;
          }),
          (e.prototype.resize = function (t, e, r) {
            var n = this._canvas,
              i = this._context,
              o = this.image;
            (this._width = n.width = t),
              (this._height = n.height = e),
              i.scale(r, r),
              i.drawImage(o, 0, 0);
          }),
          (e.prototype.getPixelCount = function () {
            return this._width * this._height;
          }),
          (e.prototype.getImageData = function () {
            return this._context.getImageData(0, 0, this._width, this._height);
          }),
          (e.prototype.remove = function () {
            this._canvas &&
              this._canvas.parentNode &&
              this._canvas.parentNode.removeChild(this._canvas);
          }),
          e
        );
      })(s.ImageBase);
      e.default = c;
    },
    function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = (function () {
        function t() {}
        return (
          (t.prototype.scaleDown = function (t) {
            var e = this.getWidth(),
              r = this.getHeight(),
              n = 1;
            if (t.maxDimension > 0) {
              var i = Math.max(e, r);
              i > t.maxDimension && (n = t.maxDimension / i);
            } else n = 1 / t.quality;
            n < 1 && this.resize(e * n, r * n, n);
          }),
          (t.prototype.applyFilter = function (t) {
            var e = this.getImageData();
            if ("function" == typeof t)
              for (
                var r = e.data, n = r.length / 4, i = void 0, o = 0;
                o < n;
                o++
              )
                t(r[(i = 4 * o) + 0], r[i + 1], r[i + 2], r[i + 3]) ||
                  (r[i + 3] = 0);
            return Promise.resolve(e);
          }),
          t
        );
      })();
      e.ImageBase = n;
    },
    function (t, e, r) {
      "use strict";
      var n = r(181),
        i = r(182);
      function o() {
        (this.protocol = null),
          (this.slashes = null),
          (this.auth = null),
          (this.host = null),
          (this.port = null),
          (this.hostname = null),
          (this.hash = null),
          (this.search = null),
          (this.query = null),
          (this.pathname = null),
          (this.path = null),
          (this.href = null);
      }
      (e.parse = y),
        (e.resolve = function (t, e) {
          return y(t, !1, !0).resolve(e);
        }),
        (e.resolveObject = function (t, e) {
          return t ? y(t, !1, !0).resolveObject(e) : e;
        }),
        (e.format = function (t) {
          i.isString(t) && (t = y(t));
          return t instanceof o ? t.format() : o.prototype.format.call(t);
        }),
        (e.Url = o);
      var s = /^([a-z0-9.+-]+:)/i,
        a = /:[0-9]*$/,
        c = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        l = ["{", "}", "|", "\\", "^", "`"].concat([
          "<",
          ">",
          '"',
          "`",
          " ",
          "\r",
          "\n",
          "\t",
        ]),
        u = ["'"].concat(l),
        h = ["%", "/", "?", ";", "#"].concat(u),
        p = ["/", "?", "#"],
        d = /^[+a-z0-9A-Z_-]{0,63}$/,
        f = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        m = { javascript: !0, "javascript:": !0 },
        g = { javascript: !0, "javascript:": !0 },
        v = {
          http: !0,
          https: !0,
          ftp: !0,
          gopher: !0,
          file: !0,
          "http:": !0,
          "https:": !0,
          "ftp:": !0,
          "gopher:": !0,
          "file:": !0,
        },
        _ = r(183);
      function y(t, e, r) {
        if (t && i.isObject(t) && t instanceof o) return t;
        var n = new o();
        return n.parse(t, e, r), n;
      }
      (o.prototype.parse = function (t, e, r) {
        if (!i.isString(t))
          throw new TypeError(
            "Parameter 'url' must be a string, not " + typeof t
          );
        var o = t.indexOf("?"),
          a = -1 !== o && o < t.indexOf("#") ? "?" : "#",
          l = t.split(a);
        l[0] = l[0].replace(/\\/g, "/");
        var y = (t = l.join(a));
        if (((y = y.trim()), !r && 1 === t.split("#").length)) {
          var b = c.exec(y);
          if (b)
            return (
              (this.path = y),
              (this.href = y),
              (this.pathname = b[1]),
              b[2]
                ? ((this.search = b[2]),
                  (this.query = e
                    ? _.parse(this.search.substr(1))
                    : this.search.substr(1)))
                : e && ((this.search = ""), (this.query = {})),
              this
            );
        }
        var w = s.exec(y);
        if (w) {
          var x = (w = w[0]).toLowerCase();
          (this.protocol = x), (y = y.substr(w.length));
        }
        if (r || w || y.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var k = "//" === y.substr(0, 2);
          !k || (w && g[w]) || ((y = y.substr(2)), (this.slashes = !0));
        }
        if (!g[w] && (k || (w && !v[w]))) {
          for (var S, j, $ = -1, O = 0; O < p.length; O++) {
            -1 !== (P = y.indexOf(p[O])) && (-1 === $ || P < $) && ($ = P);
          }
          -1 !== (j = -1 === $ ? y.lastIndexOf("@") : y.lastIndexOf("@", $)) &&
            ((S = y.slice(0, j)),
            (y = y.slice(j + 1)),
            (this.auth = decodeURIComponent(S))),
            ($ = -1);
          for (O = 0; O < h.length; O++) {
            var P;
            -1 !== (P = y.indexOf(h[O])) && (-1 === $ || P < $) && ($ = P);
          }
          -1 === $ && ($ = y.length),
            (this.host = y.slice(0, $)),
            (y = y.slice($)),
            this.parseHost(),
            (this.hostname = this.hostname || "");
          var C =
            "[" === this.hostname[0] &&
            "]" === this.hostname[this.hostname.length - 1];
          if (!C)
            for (
              var A = this.hostname.split(/\./), E = ((O = 0), A.length);
              O < E;
              O++
            ) {
              var M = A[O];
              if (M && !M.match(d)) {
                for (var T = "", I = 0, V = M.length; I < V; I++)
                  M.charCodeAt(I) > 127 ? (T += "x") : (T += M[I]);
                if (!T.match(d)) {
                  var N = A.slice(0, O),
                    z = A.slice(O + 1),
                    L = M.match(f);
                  L && (N.push(L[1]), z.unshift(L[2])),
                    z.length && (y = "/" + z.join(".") + y),
                    (this.hostname = N.join("."));
                  break;
                }
              }
            }
          this.hostname.length > 255
            ? (this.hostname = "")
            : (this.hostname = this.hostname.toLowerCase()),
            C || (this.hostname = n.toASCII(this.hostname));
          var D = this.port ? ":" + this.port : "",
            F = this.hostname || "";
          (this.host = F + D),
            (this.href += this.host),
            C &&
              ((this.hostname = this.hostname.substr(
                1,
                this.hostname.length - 2
              )),
              "/" !== y[0] && (y = "/" + y));
        }
        if (!m[x])
          for (O = 0, E = u.length; O < E; O++) {
            var R = u[O];
            if (-1 !== y.indexOf(R)) {
              var U = encodeURIComponent(R);
              U === R && (U = escape(R)), (y = y.split(R).join(U));
            }
          }
        var q = y.indexOf("#");
        -1 !== q && ((this.hash = y.substr(q)), (y = y.slice(0, q)));
        var B = y.indexOf("?");
        if (
          (-1 !== B
            ? ((this.search = y.substr(B)),
              (this.query = y.substr(B + 1)),
              e && (this.query = _.parse(this.query)),
              (y = y.slice(0, B)))
            : e && ((this.search = ""), (this.query = {})),
          y && (this.pathname = y),
          v[x] && this.hostname && !this.pathname && (this.pathname = "/"),
          this.pathname || this.search)
        ) {
          D = this.pathname || "";
          var H = this.search || "";
          this.path = D + H;
        }
        return (this.href = this.format()), this;
      }),
        (o.prototype.format = function () {
          var t = this.auth || "";
          t &&
            ((t = (t = encodeURIComponent(t)).replace(/%3A/i, ":")),
            (t += "@"));
          var e = this.protocol || "",
            r = this.pathname || "",
            n = this.hash || "",
            o = !1,
            s = "";
          this.host
            ? (o = t + this.host)
            : this.hostname &&
              ((o =
                t +
                (-1 === this.hostname.indexOf(":")
                  ? this.hostname
                  : "[" + this.hostname + "]")),
              this.port && (o += ":" + this.port)),
            this.query &&
              i.isObject(this.query) &&
              Object.keys(this.query).length &&
              (s = _.stringify(this.query));
          var a = this.search || (s && "?" + s) || "";
          return (
            e && ":" !== e.substr(-1) && (e += ":"),
            this.slashes || ((!e || v[e]) && !1 !== o)
              ? ((o = "//" + (o || "")),
                r && "/" !== r.charAt(0) && (r = "/" + r))
              : o || (o = ""),
            n && "#" !== n.charAt(0) && (n = "#" + n),
            a && "?" !== a.charAt(0) && (a = "?" + a),
            e +
              o +
              (r = r.replace(/[?#]/g, function (t) {
                return encodeURIComponent(t);
              })) +
              (a = a.replace("#", "%23")) +
              n
          );
        }),
        (o.prototype.resolve = function (t) {
          return this.resolveObject(y(t, !1, !0)).format();
        }),
        (o.prototype.resolveObject = function (t) {
          if (i.isString(t)) {
            var e = new o();
            e.parse(t, !1, !0), (t = e);
          }
          for (
            var r = new o(), n = Object.keys(this), s = 0;
            s < n.length;
            s++
          ) {
            var a = n[s];
            r[a] = this[a];
          }
          if (((r.hash = t.hash), "" === t.href))
            return (r.href = r.format()), r;
          if (t.slashes && !t.protocol) {
            for (var c = Object.keys(t), l = 0; l < c.length; l++) {
              var u = c[l];
              "protocol" !== u && (r[u] = t[u]);
            }
            return (
              v[r.protocol] &&
                r.hostname &&
                !r.pathname &&
                (r.path = r.pathname = "/"),
              (r.href = r.format()),
              r
            );
          }
          if (t.protocol && t.protocol !== r.protocol) {
            if (!v[t.protocol]) {
              for (var h = Object.keys(t), p = 0; p < h.length; p++) {
                var d = h[p];
                r[d] = t[d];
              }
              return (r.href = r.format()), r;
            }
            if (((r.protocol = t.protocol), t.host || g[t.protocol]))
              r.pathname = t.pathname;
            else {
              for (
                var f = (t.pathname || "").split("/");
                f.length && !(t.host = f.shift());

              );
              t.host || (t.host = ""),
                t.hostname || (t.hostname = ""),
                "" !== f[0] && f.unshift(""),
                f.length < 2 && f.unshift(""),
                (r.pathname = f.join("/"));
            }
            if (
              ((r.search = t.search),
              (r.query = t.query),
              (r.host = t.host || ""),
              (r.auth = t.auth),
              (r.hostname = t.hostname || t.host),
              (r.port = t.port),
              r.pathname || r.search)
            ) {
              var m = r.pathname || "",
                _ = r.search || "";
              r.path = m + _;
            }
            return (
              (r.slashes = r.slashes || t.slashes), (r.href = r.format()), r
            );
          }
          var y = r.pathname && "/" === r.pathname.charAt(0),
            b = t.host || (t.pathname && "/" === t.pathname.charAt(0)),
            w = b || y || (r.host && t.pathname),
            x = w,
            k = (r.pathname && r.pathname.split("/")) || [],
            S =
              ((f = (t.pathname && t.pathname.split("/")) || []),
              r.protocol && !v[r.protocol]);
          if (
            (S &&
              ((r.hostname = ""),
              (r.port = null),
              r.host && ("" === k[0] ? (k[0] = r.host) : k.unshift(r.host)),
              (r.host = ""),
              t.protocol &&
                ((t.hostname = null),
                (t.port = null),
                t.host && ("" === f[0] ? (f[0] = t.host) : f.unshift(t.host)),
                (t.host = null)),
              (w = w && ("" === f[0] || "" === k[0]))),
            b)
          )
            (r.host = t.host || "" === t.host ? t.host : r.host),
              (r.hostname =
                t.hostname || "" === t.hostname ? t.hostname : r.hostname),
              (r.search = t.search),
              (r.query = t.query),
              (k = f);
          else if (f.length)
            k || (k = []),
              k.pop(),
              (k = k.concat(f)),
              (r.search = t.search),
              (r.query = t.query);
          else if (!i.isNullOrUndefined(t.search)) {
            if (S)
              (r.hostname = r.host = k.shift()),
                (C =
                  !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) &&
                  ((r.auth = C.shift()), (r.host = r.hostname = C.shift()));
            return (
              (r.search = t.search),
              (r.query = t.query),
              (i.isNull(r.pathname) && i.isNull(r.search)) ||
                (r.path =
                  (r.pathname ? r.pathname : "") + (r.search ? r.search : "")),
              (r.href = r.format()),
              r
            );
          }
          if (!k.length)
            return (
              (r.pathname = null),
              r.search ? (r.path = "/" + r.search) : (r.path = null),
              (r.href = r.format()),
              r
            );
          for (
            var j = k.slice(-1)[0],
              $ =
                ((r.host || t.host || k.length > 1) &&
                  ("." === j || ".." === j)) ||
                "" === j,
              O = 0,
              P = k.length;
            P >= 0;
            P--
          )
            "." === (j = k[P])
              ? k.splice(P, 1)
              : ".." === j
              ? (k.splice(P, 1), O++)
              : O && (k.splice(P, 1), O--);
          if (!w && !x) for (; O--; O) k.unshift("..");
          !w ||
            "" === k[0] ||
            (k[0] && "/" === k[0].charAt(0)) ||
            k.unshift(""),
            $ && "/" !== k.join("/").substr(-1) && k.push("");
          var C,
            A = "" === k[0] || (k[0] && "/" === k[0].charAt(0));
          S &&
            ((r.hostname = r.host = A ? "" : k.length ? k.shift() : ""),
            (C = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) &&
              ((r.auth = C.shift()), (r.host = r.hostname = C.shift())));
          return (
            (w = w || (r.host && k.length)) && !A && k.unshift(""),
            k.length
              ? (r.pathname = k.join("/"))
              : ((r.pathname = null), (r.path = null)),
            (i.isNull(r.pathname) && i.isNull(r.search)) ||
              (r.path =
                (r.pathname ? r.pathname : "") + (r.search ? r.search : "")),
            (r.auth = t.auth || r.auth),
            (r.slashes = r.slashes || t.slashes),
            (r.href = r.format()),
            r
          );
        }),
        (o.prototype.parseHost = function () {
          var t = this.host,
            e = a.exec(t);
          e &&
            (":" !== (e = e[0]) && (this.port = e.substr(1)),
            (t = t.substr(0, t.length - e.length))),
            t && (this.hostname = t);
        });
    },
    function (t, e, r) {
      (function (t, n) {
        var i;
        /*! https://mths.be/punycode v1.4.1 by @mathias */ !(function (o) {
          e && e.nodeType, t && t.nodeType;
          var s = "object" == typeof n && n;
          s.global !== s && s.window !== s && s.self;
          var a,
            c = 2147483647,
            l = /^xn--/,
            u = /[^\x20-\x7E]/,
            h = /[\x2E\u3002\uFF0E\uFF61]/g,
            p = {
              overflow: "Overflow: input needs wider integers to process",
              "not-basic": "Illegal input >= 0x80 (not a basic code point)",
              "invalid-input": "Invalid input",
            },
            d = Math.floor,
            f = String.fromCharCode;
          function m(t) {
            throw new RangeError(p[t]);
          }
          function g(t, e) {
            for (var r = t.length, n = []; r--; ) n[r] = e(t[r]);
            return n;
          }
          function v(t, e) {
            var r = t.split("@"),
              n = "";
            return (
              r.length > 1 && ((n = r[0] + "@"), (t = r[1])),
              n + g((t = t.replace(h, ".")).split("."), e).join(".")
            );
          }
          function _(t) {
            for (var e, r, n = [], i = 0, o = t.length; i < o; )
              (e = t.charCodeAt(i++)) >= 55296 && e <= 56319 && i < o
                ? 56320 == (64512 & (r = t.charCodeAt(i++)))
                  ? n.push(((1023 & e) << 10) + (1023 & r) + 65536)
                  : (n.push(e), i--)
                : n.push(e);
            return n;
          }
          function y(t) {
            return g(t, function (t) {
              var e = "";
              return (
                t > 65535 &&
                  ((e += f((((t -= 65536) >>> 10) & 1023) | 55296)),
                  (t = 56320 | (1023 & t))),
                (e += f(t))
              );
            }).join("");
          }
          function b(t, e) {
            return t + 22 + 75 * (t < 26) - ((0 != e) << 5);
          }
          function w(t, e, r) {
            var n = 0;
            for (t = r ? d(t / 700) : t >> 1, t += d(t / e); t > 455; n += 36)
              t = d(t / 35);
            return d(n + (36 * t) / (t + 38));
          }
          function x(t) {
            var e,
              r,
              n,
              i,
              o,
              s,
              a,
              l,
              u,
              h,
              p,
              f = [],
              g = t.length,
              v = 0,
              _ = 128,
              b = 72;
            for ((r = t.lastIndexOf("-")) < 0 && (r = 0), n = 0; n < r; ++n)
              t.charCodeAt(n) >= 128 && m("not-basic"), f.push(t.charCodeAt(n));
            for (i = r > 0 ? r + 1 : 0; i < g; ) {
              for (
                o = v, s = 1, a = 36;
                i >= g && m("invalid-input"),
                  ((l =
                    (p = t.charCodeAt(i++)) - 48 < 10
                      ? p - 22
                      : p - 65 < 26
                      ? p - 65
                      : p - 97 < 26
                      ? p - 97
                      : 36) >= 36 ||
                    l > d((c - v) / s)) &&
                    m("overflow"),
                  (v += l * s),
                  !(l < (u = a <= b ? 1 : a >= b + 26 ? 26 : a - b));
                a += 36
              )
                s > d(c / (h = 36 - u)) && m("overflow"), (s *= h);
              (b = w(v - o, (e = f.length + 1), 0 == o)),
                d(v / e) > c - _ && m("overflow"),
                (_ += d(v / e)),
                (v %= e),
                f.splice(v++, 0, _);
            }
            return y(f);
          }
          function k(t) {
            var e,
              r,
              n,
              i,
              o,
              s,
              a,
              l,
              u,
              h,
              p,
              g,
              v,
              y,
              x,
              k = [];
            for (
              g = (t = _(t)).length, e = 128, r = 0, o = 72, s = 0;
              s < g;
              ++s
            )
              (p = t[s]) < 128 && k.push(f(p));
            for (n = i = k.length, i && k.push("-"); n < g; ) {
              for (a = c, s = 0; s < g; ++s)
                (p = t[s]) >= e && p < a && (a = p);
              for (
                a - e > d((c - r) / (v = n + 1)) && m("overflow"),
                  r += (a - e) * v,
                  e = a,
                  s = 0;
                s < g;
                ++s
              )
                if (((p = t[s]) < e && ++r > c && m("overflow"), p == e)) {
                  for (
                    l = r, u = 36;
                    !(l < (h = u <= o ? 1 : u >= o + 26 ? 26 : u - o));
                    u += 36
                  )
                    (x = l - h),
                      (y = 36 - h),
                      k.push(f(b(h + (x % y), 0))),
                      (l = d(x / y));
                  k.push(f(b(l, 0))), (o = w(r, v, n == i)), (r = 0), ++n;
                }
              ++r, ++e;
            }
            return k.join("");
          }
          (a = {
            version: "1.4.1",
            ucs2: { decode: _, encode: y },
            decode: x,
            encode: k,
            toASCII: function (t) {
              return v(t, function (t) {
                return u.test(t) ? "xn--" + k(t) : t;
              });
            },
            toUnicode: function (t) {
              return v(t, function (t) {
                return l.test(t) ? x(t.slice(4).toLowerCase()) : t;
              });
            },
          }),
            void 0 ===
              (i = function () {
                return a;
              }.call(e, r, e, t)) || (t.exports = i);
        })();
      }.call(this, r(10)(t), r(19)));
    },
    function (t, e, r) {
      "use strict";
      t.exports = {
        isString: function (t) {
          return "string" == typeof t;
        },
        isObject: function (t) {
          return "object" == typeof t && null !== t;
        },
        isNull: function (t) {
          return null === t;
        },
        isNullOrUndefined: function (t) {
          return null == t;
        },
      };
    },
    function (t, e, r) {
      "use strict";
      (e.decode = e.parse = r(184)), (e.encode = e.stringify = r(185));
    },
    function (t, e, r) {
      "use strict";
      function n(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }
      t.exports = function (t, e, r, o) {
        (e = e || "&"), (r = r || "=");
        var s = {};
        if ("string" != typeof t || 0 === t.length) return s;
        var a = /\+/g;
        t = t.split(e);
        var c = 1e3;
        o && "number" == typeof o.maxKeys && (c = o.maxKeys);
        var l = t.length;
        c > 0 && l > c && (l = c);
        for (var u = 0; u < l; ++u) {
          var h,
            p,
            d,
            f,
            m = t[u].replace(a, "%20"),
            g = m.indexOf(r);
          g >= 0
            ? ((h = m.substr(0, g)), (p = m.substr(g + 1)))
            : ((h = m), (p = "")),
            (d = decodeURIComponent(h)),
            (f = decodeURIComponent(p)),
            n(s, d)
              ? i(s[d])
                ? s[d].push(f)
                : (s[d] = [s[d], f])
              : (s[d] = f);
        }
        return s;
      };
      var i =
        Array.isArray ||
        function (t) {
          return "[object Array]" === Object.prototype.toString.call(t);
        };
    },
    function (t, e, r) {
      "use strict";
      var n = function (t) {
        switch (typeof t) {
          case "string":
            return t;
          case "boolean":
            return t ? "true" : "false";
          case "number":
            return isFinite(t) ? t : "";
          default:
            return "";
        }
      };
      t.exports = function (t, e, r, a) {
        return (
          (e = e || "&"),
          (r = r || "="),
          null === t && (t = void 0),
          "object" == typeof t
            ? o(s(t), function (s) {
                var a = encodeURIComponent(n(s)) + r;
                return i(t[s])
                  ? o(t[s], function (t) {
                      return a + encodeURIComponent(n(t));
                    }).join(e)
                  : a + encodeURIComponent(n(t[s]));
              }).join(e)
            : a
            ? encodeURIComponent(n(a)) + r + encodeURIComponent(n(t))
            : ""
        );
      };
      var i =
        Array.isArray ||
        function (t) {
          return "[object Array]" === Object.prototype.toString.call(t);
        };
      function o(t, e) {
        if (t.map) return t.map(e);
        for (var r = [], n = 0; n < t.length; n++) r.push(e(t[n], n));
        return r;
      }
      var s =
        Object.keys ||
        function (t) {
          var e = [];
          for (var r in t)
            Object.prototype.hasOwnProperty.call(t, r) && e.push(r);
          return e;
        };
    },
    function (t, e) {
      customElements.get("ha-slider") ||
        customElements.define(
          "ha-slider",
          class extends customElements.get("paper-slider") {}
        ),
        customElements.get("ha-icon-button") ||
          customElements.define(
            "ha-icon-button",
            class extends customElements.get("paper-icon-button") {}
          ),
        customElements.get("ha-icon") ||
          customElements.define(
            "ha-icon",
            class extends customElements.get("iron-icon") {}
          );
    },
    function (t, e, r) {
      "use strict";
      r.r(e);
      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */
      const n =
          "undefined" != typeof window &&
          null != window.customElements &&
          void 0 !== window.customElements.polyfillWrapFlushCallback,
        i = (t, e, r = null) => {
          for (; e !== r; ) {
            const r = e.nextSibling;
            t.removeChild(e), (e = r);
          }
        },
        o = `{{lit-${String(Math.random()).slice(2)}}}`,
        s = `\x3c!--${o}--\x3e`,
        a = new RegExp(`${o}|${s}`);
      class c {
        constructor(t, e) {
          (this.parts = []), (this.element = e);
          const r = [],
            n = [],
            i = document.createTreeWalker(e.content, 133, null, !1);
          let s = 0,
            c = -1,
            u = 0;
          const {
            strings: d,
            values: { length: f },
          } = t;
          for (; u < f; ) {
            const t = i.nextNode();
            if (null !== t) {
              if ((c++, 1 === t.nodeType)) {
                if (t.hasAttributes()) {
                  const e = t.attributes,
                    { length: r } = e;
                  let n = 0;
                  for (let t = 0; t < r; t++) l(e[t].name, "$lit$") && n++;
                  for (; n-- > 0; ) {
                    const e = d[u],
                      r = p.exec(e)[2],
                      n = r.toLowerCase() + "$lit$",
                      i = t.getAttribute(n);
                    t.removeAttribute(n);
                    const o = i.split(a);
                    this.parts.push({
                      type: "attribute",
                      index: c,
                      name: r,
                      strings: o,
                    }),
                      (u += o.length - 1);
                  }
                }
                "TEMPLATE" === t.tagName &&
                  (n.push(t), (i.currentNode = t.content));
              } else if (3 === t.nodeType) {
                const e = t.data;
                if (e.indexOf(o) >= 0) {
                  const n = t.parentNode,
                    i = e.split(a),
                    o = i.length - 1;
                  for (let e = 0; e < o; e++) {
                    let r,
                      o = i[e];
                    if ("" === o) r = h();
                    else {
                      const t = p.exec(o);
                      null !== t &&
                        l(t[2], "$lit$") &&
                        (o =
                          o.slice(0, t.index) +
                          t[1] +
                          t[2].slice(0, -"$lit$".length) +
                          t[3]),
                        (r = document.createTextNode(o));
                    }
                    n.insertBefore(r, t),
                      this.parts.push({ type: "node", index: ++c });
                  }
                  "" === i[o]
                    ? (n.insertBefore(h(), t), r.push(t))
                    : (t.data = i[o]),
                    (u += o);
                }
              } else if (8 === t.nodeType)
                if (t.data === o) {
                  const e = t.parentNode;
                  (null !== t.previousSibling && c !== s) ||
                    (c++, e.insertBefore(h(), t)),
                    (s = c),
                    this.parts.push({ type: "node", index: c }),
                    null === t.nextSibling ? (t.data = "") : (r.push(t), c--),
                    u++;
                } else {
                  let e = -1;
                  for (; -1 !== (e = t.data.indexOf(o, e + 1)); )
                    this.parts.push({ type: "node", index: -1 }), u++;
                }
            } else i.currentNode = n.pop();
          }
          for (const t of r) t.parentNode.removeChild(t);
        }
      }
      const l = (t, e) => {
          const r = t.length - e.length;
          return r >= 0 && t.slice(r) === e;
        },
        u = (t) => -1 !== t.index,
        h = () => document.createComment(""),
        p = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
      function d(t, e) {
        const {
            element: { content: r },
            parts: n,
          } = t,
          i = document.createTreeWalker(r, 133, null, !1);
        let o = m(n),
          s = n[o],
          a = -1,
          c = 0;
        const l = [];
        let u = null;
        for (; i.nextNode(); ) {
          a++;
          const t = i.currentNode;
          for (
            t.previousSibling === u && (u = null),
              e.has(t) && (l.push(t), null === u && (u = t)),
              null !== u && c++;
            void 0 !== s && s.index === a;

          )
            (s.index = null !== u ? -1 : s.index - c),
              (o = m(n, o)),
              (s = n[o]);
        }
        l.forEach((t) => t.parentNode.removeChild(t));
      }
      const f = (t) => {
          let e = 11 === t.nodeType ? 0 : 1;
          const r = document.createTreeWalker(t, 133, null, !1);
          for (; r.nextNode(); ) e++;
          return e;
        },
        m = (t, e = -1) => {
          for (let r = e + 1; r < t.length; r++) {
            const e = t[r];
            if (u(e)) return r;
          }
          return -1;
        };
      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */
      const g = new WeakMap(),
        v = (t) => (...e) => {
          const r = t(...e);
          return g.set(r, !0), r;
        },
        _ = (t) => "function" == typeof t && g.has(t),
        y = {},
        b = {};
      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */
      class w {
        constructor(t, e, r) {
          (this.__parts = []),
            (this.template = t),
            (this.processor = e),
            (this.options = r);
        }
        update(t) {
          let e = 0;
          for (const r of this.__parts) void 0 !== r && r.setValue(t[e]), e++;
          for (const t of this.__parts) void 0 !== t && t.commit();
        }
        _clone() {
          const t = n
              ? this.template.element.content.cloneNode(!0)
              : document.importNode(this.template.element.content, !0),
            e = [],
            r = this.template.parts,
            i = document.createTreeWalker(t, 133, null, !1);
          let o,
            s = 0,
            a = 0,
            c = i.nextNode();
          for (; s < r.length; )
            if (((o = r[s]), u(o))) {
              for (; a < o.index; )
                a++,
                  "TEMPLATE" === c.nodeName &&
                    (e.push(c), (i.currentNode = c.content)),
                  null === (c = i.nextNode()) &&
                    ((i.currentNode = e.pop()), (c = i.nextNode()));
              if ("node" === o.type) {
                const t = this.processor.handleTextExpression(this.options);
                t.insertAfterNode(c.previousSibling), this.__parts.push(t);
              } else
                this.__parts.push(
                  ...this.processor.handleAttributeExpressions(
                    c,
                    o.name,
                    o.strings,
                    this.options
                  )
                );
              s++;
            } else this.__parts.push(void 0), s++;
          return n && (document.adoptNode(t), customElements.upgrade(t)), t;
        }
      }
      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */ const x = ` ${o} `;
      class k {
        constructor(t, e, r, n) {
          (this.strings = t),
            (this.values = e),
            (this.type = r),
            (this.processor = n);
        }
        getHTML() {
          const t = this.strings.length - 1;
          let e = "",
            r = !1;
          for (let n = 0; n < t; n++) {
            const t = this.strings[n],
              i = t.lastIndexOf("\x3c!--");
            r = (i > -1 || r) && -1 === t.indexOf("--\x3e", i + 1);
            const a = p.exec(t);
            e +=
              null === a
                ? t + (r ? x : s)
                : t.substr(0, a.index) + a[1] + a[2] + "$lit$" + a[3] + o;
          }
          return (e += this.strings[t]), e;
        }
        getTemplateElement() {
          const t = document.createElement("template");
          return (t.innerHTML = this.getHTML()), t;
        }
      }
      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */
      const S = (t) =>
          null === t || !("object" == typeof t || "function" == typeof t),
        j = (t) => Array.isArray(t) || !(!t || !t[Symbol.iterator]);
      class $ {
        constructor(t, e, r) {
          (this.dirty = !0),
            (this.element = t),
            (this.name = e),
            (this.strings = r),
            (this.parts = []);
          for (let t = 0; t < r.length - 1; t++)
            this.parts[t] = this._createPart();
        }
        _createPart() {
          return new O(this);
        }
        _getValue() {
          const t = this.strings,
            e = t.length - 1;
          let r = "";
          for (let n = 0; n < e; n++) {
            r += t[n];
            const e = this.parts[n];
            if (void 0 !== e) {
              const t = e.value;
              if (S(t) || !j(t)) r += "string" == typeof t ? t : String(t);
              else for (const e of t) r += "string" == typeof e ? e : String(e);
            }
          }
          return (r += t[e]), r;
        }
        commit() {
          this.dirty &&
            ((this.dirty = !1),
            this.element.setAttribute(this.name, this._getValue()));
        }
      }
      class O {
        constructor(t) {
          (this.value = void 0), (this.committer = t);
        }
        setValue(t) {
          t === y ||
            (S(t) && t === this.value) ||
            ((this.value = t), _(t) || (this.committer.dirty = !0));
        }
        commit() {
          for (; _(this.value); ) {
            const t = this.value;
            (this.value = y), t(this);
          }
          this.value !== y && this.committer.commit();
        }
      }
      class P {
        constructor(t) {
          (this.value = void 0),
            (this.__pendingValue = void 0),
            (this.options = t);
        }
        appendInto(t) {
          (this.startNode = t.appendChild(h())),
            (this.endNode = t.appendChild(h()));
        }
        insertAfterNode(t) {
          (this.startNode = t), (this.endNode = t.nextSibling);
        }
        appendIntoPart(t) {
          t.__insert((this.startNode = h())), t.__insert((this.endNode = h()));
        }
        insertAfterPart(t) {
          t.__insert((this.startNode = h())),
            (this.endNode = t.endNode),
            (t.endNode = this.startNode);
        }
        setValue(t) {
          this.__pendingValue = t;
        }
        commit() {
          if (null === this.startNode.parentNode) return;
          for (; _(this.__pendingValue); ) {
            const t = this.__pendingValue;
            (this.__pendingValue = y), t(this);
          }
          const t = this.__pendingValue;
          t !== y &&
            (S(t)
              ? t !== this.value && this.__commitText(t)
              : t instanceof k
              ? this.__commitTemplateResult(t)
              : t instanceof Node
              ? this.__commitNode(t)
              : j(t)
              ? this.__commitIterable(t)
              : t === b
              ? ((this.value = b), this.clear())
              : this.__commitText(t));
        }
        __insert(t) {
          this.endNode.parentNode.insertBefore(t, this.endNode);
        }
        __commitNode(t) {
          this.value !== t &&
            (this.clear(), this.__insert(t), (this.value = t));
        }
        __commitText(t) {
          const e = this.startNode.nextSibling,
            r = "string" == typeof (t = null == t ? "" : t) ? t : String(t);
          e === this.endNode.previousSibling && 3 === e.nodeType
            ? (e.data = r)
            : this.__commitNode(document.createTextNode(r)),
            (this.value = t);
        }
        __commitTemplateResult(t) {
          const e = this.options.templateFactory(t);
          if (this.value instanceof w && this.value.template === e)
            this.value.update(t.values);
          else {
            const r = new w(e, t.processor, this.options),
              n = r._clone();
            r.update(t.values), this.__commitNode(n), (this.value = r);
          }
        }
        __commitIterable(t) {
          Array.isArray(this.value) || ((this.value = []), this.clear());
          const e = this.value;
          let r,
            n = 0;
          for (const i of t)
            (r = e[n]),
              void 0 === r &&
                ((r = new P(this.options)),
                e.push(r),
                0 === n ? r.appendIntoPart(this) : r.insertAfterPart(e[n - 1])),
              r.setValue(i),
              r.commit(),
              n++;
          n < e.length && ((e.length = n), this.clear(r && r.endNode));
        }
        clear(t = this.startNode) {
          i(this.startNode.parentNode, t.nextSibling, this.endNode);
        }
      }
      class C {
        constructor(t, e, r) {
          if (
            ((this.value = void 0),
            (this.__pendingValue = void 0),
            2 !== r.length || "" !== r[0] || "" !== r[1])
          )
            throw new Error(
              "Boolean attributes can only contain a single expression"
            );
          (this.element = t), (this.name = e), (this.strings = r);
        }
        setValue(t) {
          this.__pendingValue = t;
        }
        commit() {
          for (; _(this.__pendingValue); ) {
            const t = this.__pendingValue;
            (this.__pendingValue = y), t(this);
          }
          if (this.__pendingValue === y) return;
          const t = !!this.__pendingValue;
          this.value !== t &&
            (t
              ? this.element.setAttribute(this.name, "")
              : this.element.removeAttribute(this.name),
            (this.value = t)),
            (this.__pendingValue = y);
        }
      }
      class A extends $ {
        constructor(t, e, r) {
          super(t, e, r),
            (this.single = 2 === r.length && "" === r[0] && "" === r[1]);
        }
        _createPart() {
          return new E(this);
        }
        _getValue() {
          return this.single ? this.parts[0].value : super._getValue();
        }
        commit() {
          this.dirty &&
            ((this.dirty = !1), (this.element[this.name] = this._getValue()));
        }
      }
      class E extends O {}
      let M = !1;
      (() => {
        try {
          const t = {
            get capture() {
              return (M = !0), !1;
            },
          };
          window.addEventListener("test", t, t),
            window.removeEventListener("test", t, t);
        } catch (t) {}
      })();
      class T {
        constructor(t, e, r) {
          (this.value = void 0),
            (this.__pendingValue = void 0),
            (this.element = t),
            (this.eventName = e),
            (this.eventContext = r),
            (this.__boundHandleEvent = (t) => this.handleEvent(t));
        }
        setValue(t) {
          this.__pendingValue = t;
        }
        commit() {
          for (; _(this.__pendingValue); ) {
            const t = this.__pendingValue;
            (this.__pendingValue = y), t(this);
          }
          if (this.__pendingValue === y) return;
          const t = this.__pendingValue,
            e = this.value,
            r =
              null == t ||
              (null != e &&
                (t.capture !== e.capture ||
                  t.once !== e.once ||
                  t.passive !== e.passive)),
            n = null != t && (null == e || r);
          r &&
            this.element.removeEventListener(
              this.eventName,
              this.__boundHandleEvent,
              this.__options
            ),
            n &&
              ((this.__options = I(t)),
              this.element.addEventListener(
                this.eventName,
                this.__boundHandleEvent,
                this.__options
              )),
            (this.value = t),
            (this.__pendingValue = y);
        }
        handleEvent(t) {
          "function" == typeof this.value
            ? this.value.call(this.eventContext || this.element, t)
            : this.value.handleEvent(t);
        }
      }
      const I = (t) =>
        t &&
        (M
          ? { capture: t.capture, passive: t.passive, once: t.once }
          : t.capture);
      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */ function V(t) {
        let e = N.get(t.type);
        void 0 === e &&
          ((e = { stringsArray: new WeakMap(), keyString: new Map() }),
          N.set(t.type, e));
        let r = e.stringsArray.get(t.strings);
        if (void 0 !== r) return r;
        const n = t.strings.join(o);
        return (
          (r = e.keyString.get(n)),
          void 0 === r &&
            ((r = new c(t, t.getTemplateElement())), e.keyString.set(n, r)),
          e.stringsArray.set(t.strings, r),
          r
        );
      }
      const N = new Map(),
        z = new WeakMap();
      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */ const L = new /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */
      (class {
        handleAttributeExpressions(t, e, r, n) {
          const i = e[0];
          if ("." === i) {
            return new A(t, e.slice(1), r).parts;
          }
          if ("@" === i) return [new T(t, e.slice(1), n.eventContext)];
          if ("?" === i) return [new C(t, e.slice(1), r)];
          return new $(t, e, r).parts;
        }
        handleTextExpression(t) {
          return new P(t);
        }
      })();
      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */ "undefined" != typeof window &&
        (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.2.1");
      const D = (t, ...e) => new k(t, e, "html", L),
        F = (t, e) => `${t}--${e}`;
      let R = !0;
      void 0 === window.ShadyCSS
        ? (R = !1)
        : void 0 === window.ShadyCSS.prepareTemplateDom &&
          (console.warn(
            "Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."
          ),
          (R = !1));
      const U = (t) => (e) => {
          const r = F(e.type, t);
          let n = N.get(r);
          void 0 === n &&
            ((n = { stringsArray: new WeakMap(), keyString: new Map() }),
            N.set(r, n));
          let i = n.stringsArray.get(e.strings);
          if (void 0 !== i) return i;
          const s = e.strings.join(o);
          if (((i = n.keyString.get(s)), void 0 === i)) {
            const r = e.getTemplateElement();
            R && window.ShadyCSS.prepareTemplateDom(r, t),
              (i = new c(e, r)),
              n.keyString.set(s, i);
          }
          return n.stringsArray.set(e.strings, i), i;
        },
        q = ["html", "svg"],
        B = new Set(),
        H = (t, e, r) => {
          B.add(t);
          const n = r ? r.element : document.createElement("template"),
            i = e.querySelectorAll("style"),
            { length: o } = i;
          if (0 === o) return void window.ShadyCSS.prepareTemplateStyles(n, t);
          const s = document.createElement("style");
          for (let t = 0; t < o; t++) {
            const e = i[t];
            e.parentNode.removeChild(e), (s.textContent += e.textContent);
          }
          ((t) => {
            q.forEach((e) => {
              const r = N.get(F(e, t));
              void 0 !== r &&
                r.keyString.forEach((t) => {
                  const {
                      element: { content: e },
                    } = t,
                    r = new Set();
                  Array.from(e.querySelectorAll("style")).forEach((t) => {
                    r.add(t);
                  }),
                    d(t, r);
                });
            });
          })(t);
          const a = n.content;
          r
            ? (function (t, e, r = null) {
                const {
                  element: { content: n },
                  parts: i,
                } = t;
                if (null == r) return void n.appendChild(e);
                const o = document.createTreeWalker(n, 133, null, !1);
                let s = m(i),
                  a = 0,
                  c = -1;
                for (; o.nextNode(); ) {
                  c++;
                  for (
                    o.currentNode === r &&
                    ((a = f(e)), r.parentNode.insertBefore(e, r));
                    -1 !== s && i[s].index === c;

                  ) {
                    if (a > 0) {
                      for (; -1 !== s; ) (i[s].index += a), (s = m(i, s));
                      return;
                    }
                    s = m(i, s);
                  }
                }
              })(r, s, a.firstChild)
            : a.insertBefore(s, a.firstChild),
            window.ShadyCSS.prepareTemplateStyles(n, t);
          const c = a.querySelector("style");
          if (window.ShadyCSS.nativeShadow && null !== c)
            e.insertBefore(c.cloneNode(!0), e.firstChild);
          else if (r) {
            a.insertBefore(s, a.firstChild);
            const t = new Set();
            t.add(s), d(r, t);
          }
        };
      window.JSCompiler_renameProperty = (t, e) => t;
      const G = {
          toAttribute(t, e) {
            switch (e) {
              case Boolean:
                return t ? "" : null;
              case Object:
              case Array:
                return null == t ? t : JSON.stringify(t);
            }
            return t;
          },
          fromAttribute(t, e) {
            switch (e) {
              case Boolean:
                return null !== t;
              case Number:
                return null === t ? null : Number(t);
              case Object:
              case Array:
                return JSON.parse(t);
            }
            return t;
          },
        },
        W = (t, e) => e !== t && (e == e || t == t),
        X = {
          attribute: !0,
          type: String,
          converter: G,
          reflect: !1,
          hasChanged: W,
        };
      class Z extends HTMLElement {
        constructor() {
          super(),
            (this._updateState = 0),
            (this._instanceProperties = void 0),
            (this._updatePromise = new Promise(
              (t) => (this._enableUpdatingResolver = t)
            )),
            (this._changedProperties = new Map()),
            (this._reflectingProperties = void 0),
            this.initialize();
        }
        static get observedAttributes() {
          this.finalize();
          const t = [];
          return (
            this._classProperties.forEach((e, r) => {
              const n = this._attributeNameForProperty(r, e);
              void 0 !== n &&
                (this._attributeToPropertyMap.set(n, r), t.push(n));
            }),
            t
          );
        }
        static _ensureClassProperties() {
          if (
            !this.hasOwnProperty(
              JSCompiler_renameProperty("_classProperties", this)
            )
          ) {
            this._classProperties = new Map();
            const t = Object.getPrototypeOf(this)._classProperties;
            void 0 !== t &&
              t.forEach((t, e) => this._classProperties.set(e, t));
          }
        }
        static createProperty(t, e = X) {
          if (
            (this._ensureClassProperties(),
            this._classProperties.set(t, e),
            e.noAccessor || this.prototype.hasOwnProperty(t))
          )
            return;
          const r = "symbol" == typeof t ? Symbol() : "__" + t,
            n = this.getPropertyDescriptor(t, r, e);
          void 0 !== n && Object.defineProperty(this.prototype, t, n);
        }
        static getPropertyDescriptor(t, e, r) {
          return {
            get() {
              return this[e];
            },
            set(r) {
              const n = this[t];
              (this[e] = r), this._requestUpdate(t, n);
            },
            configurable: !0,
            enumerable: !0,
          };
        }
        static getPropertyOptions(t) {
          return (this._classProperties && this._classProperties.get(t)) || X;
        }
        static finalize() {
          const t = Object.getPrototypeOf(this);
          if (
            (t.hasOwnProperty("finalized") || t.finalize(),
            (this.finalized = !0),
            this._ensureClassProperties(),
            (this._attributeToPropertyMap = new Map()),
            this.hasOwnProperty(JSCompiler_renameProperty("properties", this)))
          ) {
            const t = this.properties,
              e = [
                ...Object.getOwnPropertyNames(t),
                ...("function" == typeof Object.getOwnPropertySymbols
                  ? Object.getOwnPropertySymbols(t)
                  : []),
              ];
            for (const r of e) this.createProperty(r, t[r]);
          }
        }
        static _attributeNameForProperty(t, e) {
          const r = e.attribute;
          return !1 === r
            ? void 0
            : "string" == typeof r
            ? r
            : "string" == typeof t
            ? t.toLowerCase()
            : void 0;
        }
        static _valueHasChanged(t, e, r = W) {
          return r(t, e);
        }
        static _propertyValueFromAttribute(t, e) {
          const r = e.type,
            n = e.converter || G,
            i = "function" == typeof n ? n : n.fromAttribute;
          return i ? i(t, r) : t;
        }
        static _propertyValueToAttribute(t, e) {
          if (void 0 === e.reflect) return;
          const r = e.type,
            n = e.converter;
          return ((n && n.toAttribute) || G.toAttribute)(t, r);
        }
        initialize() {
          this._saveInstanceProperties(), this._requestUpdate();
        }
        _saveInstanceProperties() {
          this.constructor._classProperties.forEach((t, e) => {
            if (this.hasOwnProperty(e)) {
              const t = this[e];
              delete this[e],
                this._instanceProperties ||
                  (this._instanceProperties = new Map()),
                this._instanceProperties.set(e, t);
            }
          });
        }
        _applyInstanceProperties() {
          this._instanceProperties.forEach((t, e) => (this[e] = t)),
            (this._instanceProperties = void 0);
        }
        connectedCallback() {
          this.enableUpdating();
        }
        enableUpdating() {
          void 0 !== this._enableUpdatingResolver &&
            (this._enableUpdatingResolver(),
            (this._enableUpdatingResolver = void 0));
        }
        disconnectedCallback() {}
        attributeChangedCallback(t, e, r) {
          e !== r && this._attributeToProperty(t, r);
        }
        _propertyToAttribute(t, e, r = X) {
          const n = this.constructor,
            i = n._attributeNameForProperty(t, r);
          if (void 0 !== i) {
            const t = n._propertyValueToAttribute(e, r);
            if (void 0 === t) return;
            (this._updateState = 8 | this._updateState),
              null == t ? this.removeAttribute(i) : this.setAttribute(i, t),
              (this._updateState = -9 & this._updateState);
          }
        }
        _attributeToProperty(t, e) {
          if (8 & this._updateState) return;
          const r = this.constructor,
            n = r._attributeToPropertyMap.get(t);
          if (void 0 !== n) {
            const t = r.getPropertyOptions(n);
            (this._updateState = 16 | this._updateState),
              (this[n] = r._propertyValueFromAttribute(e, t)),
              (this._updateState = -17 & this._updateState);
          }
        }
        _requestUpdate(t, e) {
          let r = !0;
          if (void 0 !== t) {
            const n = this.constructor,
              i = n.getPropertyOptions(t);
            n._valueHasChanged(this[t], e, i.hasChanged)
              ? (this._changedProperties.has(t) ||
                  this._changedProperties.set(t, e),
                !0 !== i.reflect ||
                  16 & this._updateState ||
                  (void 0 === this._reflectingProperties &&
                    (this._reflectingProperties = new Map()),
                  this._reflectingProperties.set(t, i)))
              : (r = !1);
          }
          !this._hasRequestedUpdate &&
            r &&
            (this._updatePromise = this._enqueueUpdate());
        }
        requestUpdate(t, e) {
          return this._requestUpdate(t, e), this.updateComplete;
        }
        async _enqueueUpdate() {
          this._updateState = 4 | this._updateState;
          try {
            await this._updatePromise;
          } catch (t) {}
          const t = this.performUpdate();
          return null != t && (await t), !this._hasRequestedUpdate;
        }
        get _hasRequestedUpdate() {
          return 4 & this._updateState;
        }
        get hasUpdated() {
          return 1 & this._updateState;
        }
        performUpdate() {
          this._instanceProperties && this._applyInstanceProperties();
          let t = !1;
          const e = this._changedProperties;
          try {
            (t = this.shouldUpdate(e)),
              t ? this.update(e) : this._markUpdated();
          } catch (e) {
            throw ((t = !1), this._markUpdated(), e);
          }
          t &&
            (1 & this._updateState ||
              ((this._updateState = 1 | this._updateState),
              this.firstUpdated(e)),
            this.updated(e));
        }
        _markUpdated() {
          (this._changedProperties = new Map()),
            (this._updateState = -5 & this._updateState);
        }
        get updateComplete() {
          return this._getUpdateComplete();
        }
        _getUpdateComplete() {
          return this._updatePromise;
        }
        shouldUpdate(t) {
          return !0;
        }
        update(t) {
          void 0 !== this._reflectingProperties &&
            this._reflectingProperties.size > 0 &&
            (this._reflectingProperties.forEach((t, e) =>
              this._propertyToAttribute(e, this[e], t)
            ),
            (this._reflectingProperties = void 0)),
            this._markUpdated();
        }
        updated(t) {}
        firstUpdated(t) {}
      }
      Z.finalized = !0;
      /**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
      const J =
          "adoptedStyleSheets" in Document.prototype &&
          "replace" in CSSStyleSheet.prototype,
        K = Symbol();
      class Q {
        constructor(t, e) {
          if (e !== K)
            throw new Error(
              "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
            );
          this.cssText = t;
        }
        get styleSheet() {
          return (
            void 0 === this._styleSheet &&
              (J
                ? ((this._styleSheet = new CSSStyleSheet()),
                  this._styleSheet.replaceSync(this.cssText))
                : (this._styleSheet = null)),
            this._styleSheet
          );
        }
        toString() {
          return this.cssText;
        }
      }
      const Y = (t, ...e) => {
        const r = e.reduce(
          (e, r, n) =>
            e +
            ((t) => {
              if (t instanceof Q) return t.cssText;
              if ("number" == typeof t) return t;
              throw new Error(
                `Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`
              );
            })(r) +
            t[n + 1],
          t[0]
        );
        return new Q(r, K);
      };
      /**
       * @license
       * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */
      (window.litElementVersions || (window.litElementVersions = [])).push(
        "2.3.1"
      );
      const tt = {};
      class et extends Z {
        static getStyles() {
          return this.styles;
        }
        static _getUniqueStyles() {
          if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this)))
            return;
          const t = this.getStyles();
          if (void 0 === t) this._styles = [];
          else if (Array.isArray(t)) {
            const e = (t, r) =>
                t.reduceRight(
                  (t, r) => (Array.isArray(r) ? e(r, t) : (t.add(r), t)),
                  r
                ),
              r = e(t, new Set()),
              n = [];
            r.forEach((t) => n.unshift(t)), (this._styles = n);
          } else this._styles = [t];
        }
        initialize() {
          super.initialize(),
            this.constructor._getUniqueStyles(),
            (this.renderRoot = this.createRenderRoot()),
            window.ShadowRoot &&
              this.renderRoot instanceof window.ShadowRoot &&
              this.adoptStyles();
        }
        createRenderRoot() {
          return this.attachShadow({ mode: "open" });
        }
        adoptStyles() {
          const t = this.constructor._styles;
          0 !== t.length &&
            (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow
              ? J
                ? (this.renderRoot.adoptedStyleSheets = t.map(
                    (t) => t.styleSheet
                  ))
                : (this._needsShimAdoptedStyleSheets = !0)
              : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(
                  t.map((t) => t.cssText),
                  this.localName
                ));
        }
        connectedCallback() {
          super.connectedCallback(),
            this.hasUpdated &&
              void 0 !== window.ShadyCSS &&
              window.ShadyCSS.styleElement(this);
        }
        update(t) {
          const e = this.render();
          super.update(t),
            e !== tt &&
              this.constructor.render(e, this.renderRoot, {
                scopeName: this.localName,
                eventContext: this,
              }),
            this._needsShimAdoptedStyleSheets &&
              ((this._needsShimAdoptedStyleSheets = !1),
              this.constructor._styles.forEach((t) => {
                const e = document.createElement("style");
                (e.textContent = t.cssText), this.renderRoot.appendChild(e);
              }));
        }
        render() {
          return tt;
        }
      }
      (et.finalized = !0),
        (et.render = (t, e, r) => {
          if (!r || "object" != typeof r || !r.scopeName)
            throw new Error("The `scopeName` option is required.");
          const n = r.scopeName,
            o = z.has(e),
            s = R && 11 === e.nodeType && !!e.host,
            a = s && !B.has(n),
            c = a ? document.createDocumentFragment() : e;
          if (
            (((t, e, r) => {
              let n = z.get(e);
              void 0 === n &&
                (i(e, e.firstChild),
                z.set(e, (n = new P(Object.assign({ templateFactory: V }, r)))),
                n.appendInto(e)),
                n.setValue(t),
                n.commit();
            })(t, c, Object.assign({ templateFactory: U(n) }, r)),
            a)
          ) {
            const t = z.get(c);
            z.delete(c);
            const r = t.value instanceof w ? t.value.template : void 0;
            H(n, c, r), i(e, e.firstChild), e.appendChild(c), z.set(e, t);
          }
          !o && s && window.ShadyCSS.styleElement(e.host);
        });
      /**
       * @license
       * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
       * This code may only be used under the BSD style license found at
       * http://polymer.github.io/LICENSE.txt
       * The complete set of authors may be found at
       * http://polymer.github.io/AUTHORS.txt
       * The complete set of contributors may be found at
       * http://polymer.github.io/CONTRIBUTORS.txt
       * Code distributed by Google as part of the polymer project is also
       * subject to an additional IP rights grant found at
       * http://polymer.github.io/PATENTS.txt
       */
      class rt {
        constructor(t) {
          (this.classes = new Set()), (this.changed = !1), (this.element = t);
          const e = (t.getAttribute("class") || "").split(/\s+/);
          for (const t of e) this.classes.add(t);
        }
        add(t) {
          this.classes.add(t), (this.changed = !0);
        }
        remove(t) {
          this.classes.delete(t), (this.changed = !0);
        }
        commit() {
          if (this.changed) {
            let t = "";
            this.classes.forEach((e) => (t += e + " ")),
              this.element.setAttribute("class", t);
          }
        }
      }
      const nt = new WeakMap(),
        it = v((t) => (e) => {
          if (
            !(e instanceof O) ||
            e instanceof E ||
            "class" !== e.committer.name ||
            e.committer.parts.length > 1
          )
            throw new Error(
              "The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute."
            );
          const { committer: r } = e,
            { element: n } = r;
          let i = nt.get(e);
          void 0 === i &&
            (n.setAttribute("class", r.strings.join(" ")),
            nt.set(e, (i = new Set())));
          const o = n.classList || new rt(n);
          i.forEach((e) => {
            e in t || (o.remove(e), i.delete(e));
          });
          for (const e in t) {
            const r = t[e];
            r != i.has(e) &&
              (r ? (o.add(e), i.add(e)) : (o.remove(e), i.delete(e)));
          }
          "function" == typeof o.commit && o.commit();
        }),
        ot = new WeakMap(),
        st = v((t) => (e) => {
          if (
            !(e instanceof O) ||
            e instanceof E ||
            "style" !== e.committer.name ||
            e.committer.parts.length > 1
          )
            throw new Error(
              "The `styleMap` directive must be used in the style attribute and must be the only part in the attribute."
            );
          const { committer: r } = e,
            { style: n } = r.element;
          let i = ot.get(e);
          void 0 === i &&
            ((n.cssText = r.strings.join(" ")), ot.set(e, (i = new Set()))),
            i.forEach((e) => {
              e in t ||
                (i.delete(e),
                -1 === e.indexOf("-") ? (n[e] = null) : n.removeProperty(e));
            });
          for (const e in t)
            i.add(e),
              -1 === e.indexOf("-") ? (n[e] = t[e]) : n.setProperty(e, t[e]);
        });
      var at = r(62);
      const ct = {
          shuffle: !0,
          power_state: !0,
          artwork_border: !0,
          icon_state: !0,
          sound_mode: !0,
          runtime: !0,
          volume: !1,
          volume_level: !0,
          controls: !1,
          play_pause: !1,
          play_stop: !0,
          prev: !1,
          next: !1,
        },
        lt = "mdi:cast",
        ut = "mdi:chevron-down",
        ht = "mdi:speaker-multiple",
        pt = { true: "mdi:volume-off", false: "mdi:volume-high" },
        dt = "mdi:skip-next",
        ft = { true: "mdi:pause", false: "mdi:play" },
        mt = "mdi:power",
        gt = "mdi:skip-previous",
        vt = "mdi:shuffle",
        _t = { true: "mdi:stop", false: "mdi:play" },
        yt = "mdi:volume-minus",
        bt = "mdi:volume-plus",
        wt = [
          "entity",
          "_overflow",
          "break",
          "thumbnail",
          "prevThumbnail",
          "edit",
          "idle",
          "cardHeight",
          "backgroundColor",
          "foregroundColor",
        ],
        xt = ["media_duration", "media_position", "media_position_updated_at"],
        kt = [
          { attr: "media_title" },
          { attr: "media_artist" },
          { attr: "media_series_title" },
          { attr: "media_season", prefix: "S" },
          { attr: "media_episode", prefix: "E" },
          { attr: "app_name" },
        ],
        St = "squeezebox",
        jt = "soundtouch",
        $t = (t) => {
          ((t) => {
            if (!t.entity || "media_player" !== t.entity.split(".")[0])
              throw new Error(
                "Specify an entity from within the media_player domain."
              );
          })(t);
          const e = {
            artwork: "default",
            info: "default",
            more_info: !0,
            source: "default",
            sound_mode: "default",
            toggle_power: !0,
            volume_step: null,
            tap_action: { action: "more-info" },
            ...t,
            hide: { ...ct, ...t.hide },
            speaker_group: {
              show_group_count: !0,
              platform: "sonos",
              ...t.sonos,
              ...t.speaker_group,
            },
            shortcuts: { label: "Przekieruj media na", ...t.shortcuts },
          };
          return (
            (e.max_volume = Number(e.max_volume) || 100),
            (e.min_volume = Number(e.min_volume) || 0),
            (e.collapse = e.hide.controls || e.hide.volume),
            (e.info = e.collapse && "scroll" !== e.info ? "short" : e.info),
            (e.flow = e.hide.icon && e.hide.name && e.hide.info),
            e
          );
        };
      var Ot = (t) => {
        let e = "";
        return (
          [].slice
            .call(new Uint8Array(t))
            .forEach((t) => (e += String.fromCharCode(t))),
          window.btoa(e)
        );
      };
      class Pt {
        constructor(t, e, r) {
          (this.hass = t || {}),
            (this.config = e || {}),
            (this.entity = r || {}),
            (this.state = r.state),
            (this.attr = r.attributes),
            (this.idle = !!e.idle_view && this.idleView),
            (this.active = this.isActive);
        }
        get id() {
          return this.entity.entity_id;
        }
        get icon() {
          return this.attr.icon;
        }
        get isPaused() {
          return "paused" === this.state;
        }
        get isPlaying() {
          return "playing" === this.state;
        }
        get isIdle() {
          return "idle" === this.state;
        }
        get isStandby() {
          return "standby" === this.state;
        }
        get isUnavailable() {
          return "unavailable" === this.state;
        }
        get isOff() {
          return "off" === this.state;
        }
        get isActive() {
          return (!this.isOff && !this.isUnavailable && !this.idle) || !1;
        }
        get shuffle() {
          return this.attr.shuffle || !1;
        }
        get content() {
          return this.attr.media_content_type || "none";
        }
        get mediaDuration() {
          return this.attr.media_duration || 0;
        }
        get updatedAt() {
          return this.attr.media_position_updated_at || 0;
        }
        get position() {
          return this.attr.media_position || 0;
        }
        get name() {
          return this.attr.friendly_name || "";
        }
        get groupCount() {
          return this.group.length;
        }
        get isGrouped() {
          return this.group.length > 1;
        }
        get group() {
          return this.platform === St
            ? this.attr.sync_group || []
            : this.attr[this.platform + "_group"] || [];
        }
        get platform() {
          return this.config.speaker_group.platform;
        }
        get master() {
          return this.config.entity;
        }
        get isMaster() {
          return this.master === this.config.entity;
        }
        get sources() {
          return this.attr.source_list || [];
        }
        get source() {
          return this.attr.source || "";
        }
        get soundModes() {
          return this.attr.sound_mode_list || [];
        }
        get soundMode() {
          return this.attr.sound_mode || "";
        }
        get muted() {
          return this.attr.is_volume_muted || !1;
        }
        get vol() {
          return this.attr.volume_level || 0;
        }
        get picture() {
          return this.attr.entity_picture_local || this.attr.entity_picture;
        }
        get hasArtwork() {
          return (
            this.picture &&
            "none" !== this.config.artwork &&
            this.active &&
            !this.idle
          );
        }
        get mediaInfo() {
          return kt
            .map((t) => ({ text: this.attr[t.attr], prefix: "", ...t }))
            .filter((t) => t.text);
        }
        get hasProgress() {
          return (
            !this.config.hide.progress &&
            !this.idle &&
            xt.every((t) => t in this.attr)
          );
        }
        get progress() {
          return (
            this.position +
            (Date.now() - new Date(this.updatedAt).getTime()) / 1e3
          );
        }
        get idleView() {
          const t = this.config.idle_view;
          return (
            !!(
              (t.when_idle && this.isIdle) ||
              (t.when_standby && this.isStandby) ||
              (t.when_paused && this.isPaused)
            ) ||
            (!(!this.updatedAt || !t.after || this.isPlaying) &&
              this.checkIdleAfter(t.after))
          );
        }
        get trackIdle() {
          return (
            this.active &&
            !this.isPlaying &&
            this.updatedAt &&
            this.config.idle_view &&
            this.config.idle_view.after
          );
        }
        checkIdleAfter(t) {
          const e = (Date.now() - new Date(this.updatedAt).getTime()) / 1e3;
          return (
            (this.idle = e > 60 * t), (this.active = this.isActive), this.idle
          );
        }
        get supportsShuffle() {
          return !(void 0 === this.attr.shuffle);
        }
        get supportsMute() {
          return !(void 0 === this.attr.is_volume_muted);
        }
        get supportsVolumeSet() {
          return !(void 0 === this.attr.volume_level);
        }
        get supportsMaster() {
          return this.platform !== St;
        }
        async fetchArtwork() {
          const t = this.attr.entity_picture_local
            ? this.hass.hassUrl(this.picture)
            : this.picture;
          try {
            const e = await fetch(new Request(t)),
              r = await e.arrayBuffer(),
              n = Ot(r);
            return `url(data:${
              e.headers.get("Content-Type") || "image/jpeg"
            };base64,${n})`;
          } catch (t) {
            return !1;
          }
        }
        getAttribute(t) {
          return this.attr[t] || "";
        }
        toggle(t) {
          return this.config.toggle_power
            ? this.callService(t, "toggle")
            : this.isOff
            ? this.callService(t, "turn_on")
            : void this.callService(t, "turn_off");
        }
        toggleMute(t) {
          this.config.speaker_group.sync_volume
            ? this.group.forEach((e) => {
                this.callService(t, "volume_mute", {
                  entity_id: e,
                  is_volume_muted: !this.muted,
                });
              })
            : this.callService(t, "volume_mute", {
                is_volume_muted: !this.muted,
              });
        }
        toggleShuffle(t) {
          this.callService(t, "shuffle_set", { shuffle: !this.shuffle });
        }
        setSource(t, e) {
          this.callService(t, "select_source", { source: e });
        }
        setMedia(t, e) {
          this.callService(t, "play_media", { ...e });
        }
        playPause(t) {
          this.callService(t, "media_play_pause");
        }
        playStop(t) {
          this.isPlaying
            ? this.callService(t, "media_stop")
            : this.callService(t, "media_play");
        }
        setSoundMode(t, e) {
          this.callService(t, "select_sound_mode", { sound_mode: e });
        }
        next(t) {
          this.callService(t, "media_next_track");
        }
        prev(t) {
          this.callService(t, "media_previous_track");
        }
        stop(t) {
          this.callService(t, "media_stop");
        }
        volumeUp(t) {
          this.supportsVolumeSet && this.config.volume_step > 0
            ? this.callService(t, "volume_set", {
                entity_id: this.config.entity,
                volume_level: Math.min(
                  this.vol + this.config.volume_step / 100,
                  1
                ),
              })
            : this.callService(t, "volume_up");
        }
        volumeDown(t) {
          this.supportsVolumeSet && this.config.volume_step > 0
            ? this.callService(t, "volume_set", {
                entity_id: this.config.entity,
                volume_level: Math.max(
                  this.vol - this.config.volume_step / 100,
                  0
                ),
              })
            : this.callService(t, "volume_down");
        }
        seek(t, e) {
          this.callService(t, "media_seek", { seek_position: e });
        }
        setVolume(t, e) {
          this.config.speaker_group.sync_volume
            ? this.group.forEach((r) => {
                const n =
                  this.config.speaker_group.entities.find(
                    (t) => t.entity_id === r
                  ) || {};
                let i = e;
                n.volume_offset &&
                  ((i += n.volume_offset / 100),
                  i > 1 && (i = 1),
                  i < 0 && (i = 0)),
                  this.callService(t, "volume_set", {
                    entity_id: r,
                    volume_level: i,
                  });
              })
            : this.callService(t, "volume_set", {
                entity_id: this.config.entity,
                volume_level: e,
              });
        }
        handleGroupChange(t, e, r) {
          const { platform: n } = this,
            i = { entity_id: e };
          if (r)
            switch (((i.master = this.config.entity), n)) {
              case jt:
                return this.handleSoundtouch(
                  t,
                  this.isGrouped ? "ADD_ZONE_SLAVE" : "CREATE_ZONE",
                  e
                );
              case St:
                return this.callService(
                  t,
                  "sync",
                  { entity_id: this.config.entity, other_player: e },
                  St
                );
              default:
                return this.callService(t, "join", i, n);
            }
          else
            switch (n) {
              case jt:
                return this.handleSoundtouch(t, "REMOVE_ZONE_SLAVE", e);
              case St:
                return this.callService(t, "unsync", i, St);
              default:
                return this.callService(t, "unjoin", i, n);
            }
        }
        handleSoundtouch(t, e, r) {
          return this.callService(
            t,
            e,
            { master: this.master, slaves: r },
            jt,
            !0
          );
        }
        toggleScript(t, e, r = {}) {
          this.callService(t, e.split(".").pop(), { ...r }, "script");
        }
        toggleService(t, e, r = {}) {
          t.stopPropagation();
          const [n, i] = e.split(".");
          this.hass.callService(n, i, { ...r });
        }
        callService(t, e, r, n = "media_player", i = !1) {
          t.stopPropagation(),
            this.hass.callService(n, e, {
              ...(!i && { entity_id: this.config.entity }),
              ...r,
            });
        }
      }
      var Ct = Y`
  :host {
    overflow: visible !important;
    display: block;
    --mmp-scale: var(--mini-media-player-scale, 1);
    --mmp-unit: calc(var(--mmp-scale) * 40px);
    --mmp-name-font-weight: var(--mini-media-player-name-font-weight, 400);
    --mmp-accent-color: var(--mini-media-player-accent-color, var(--accent-color, #f39c12));
    --mmp-base-color: var(--mini-media-player-base-color, var(--primary-text-color, #000));
    --mmp-overlay-color: var(--mini-media-player-overlay-color, rgba(0,0,0,0.5));
    --mmp-overlay-color-stop: var(--mini-media-player-overlay-color-stop, 25%);
    --mmp-overlay-base-color: var(--mini-media-player-overlay-base-color, #fff);
    --mmp-overlay-accent-color: var(--mini-media-player-overlay-accent-color, --mmp-accent-color);
    --mmp-text-color: var(--mini-media-player-base-color, var(--primary-text-color, #000));
    --mmp-media-cover-info-color: var(--mini-media-player-media-cover-info-color, --mmp-text-color);
    --mmp-text-color-inverted: var(--disabled-text-color);
    --mmp-active-color: var(--mmp-accent-color);
    --mmp-button-color: var(--mini-media-player-button-color, rgba(255,255,255,0.25));
    --mmp-icon-color:
      var(--mini-media-player-icon-color,
        var(--mini-media-player-base-color,
          var(--paper-item-icon-color, #44739e)));
    --mmp-icon-active-color: var(--paper-item-icon-active-color, --mmp-active-color);
    --mmp-info-opacity: 0.75;
    --mmp-bg-opacity: var(--mini-media-player-background-opacity, 1);
    --mmp-artwork-opacity: var(--mini-media-player-artwork-opacity, 1);
    --mmp-progress-height: var(--mini-media-player-progress-height, 6px);
    --mdc-theme-primary: var(--mmp-text-color);
    --mdc-theme-on-primary: var(--mmp-text-color);
    --paper-checkbox-unchecked-color: var(--mmp-text-color);
    --paper-checkbox-label-color: var(--mmp-text-color);
    color: var(--mmp-text-color);
  }
  ha-card.--bg {
    --mmp-info-opacity: .75;
  }
  ha-card.--has-artwork[artwork='material'],
  ha-card.--has-artwork[artwork*='cover'] {
    --mmp-accent-color: var(--mini-media-player-overlay-accent-color, var(--mini-media-player-accent-color, var(--accent-color, #f39c12)));
    --mmp-text-color: var(--mmp-overlay-base-color);
    --mmp-text-color-inverted: #000;
    --mmp-active-color: rgba(255,255,255,.5);
    --mmp-icon-color: var(--mmp-text-color);
    --mmp-icon-active-color: var(--mmp-text-color);
    --mmp-info-opacity: 0.75;
    --paper-slider-container-color: var(--mini-media-player-overlay-color, rgba(255,255,255,.75)) !important;
    --mdc-theme-primary: var(--mmp-text-color);
    --mdc-theme-on-primary: var(--mmp-text-color);
    --paper-checkbox-unchecked-color: var(--mmp-text-color);
    --paper-checkbox-label-color: var(--mmp-text-color);
    color: var(--mmp-text-color);
  }
  ha-card {
    cursor: default;
    display: flex;
    background: transparent;
    overflow: visible;
    padding: 0;
    position: relative;
    color: inherit;
    font-size: calc(var(--mmp-unit) * 0.35);
    --mdc-icon-button-size: calc(var(--mmp-unit));
    --mdc-icon-size: calc(var(--mmp-unit) * 0.6);
  }
  ha-card.--group {
    box-shadow: none;
    --mmp-progress-height: var(--mini-media-player-progress-height, 4px);
  }
  ha-card.--more-info {
    cursor: pointer;
  }
  .mmp__bg, .mmp-player, .mmp__container {
    border-radius: var(--ha-card-border-radius, 0);
  }
  .mmp__container {
    overflow: hidden;
    height: 100%;
    width: 100%;
    position: absolute;
    pointer-events: none;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  ha-card:before {
    content: '';
    padding-top: 0px;
    transition: padding-top .5s cubic-bezier(.21,.61,.35,1);
    will-change: padding-top;
  }
  ha-card.--initial .entity__artwork,
  ha-card.--initial .entity__icon {
    animation-duration: .001s;
  }
  ha-card.--initial:before,
  ha-card.--initial .mmp-player {
    transition: none;
  }
  header {
    display: none;
  }
  ha-card[artwork='full-cover'].--has-artwork:before {
    padding-top: 56%;
  }
  ha-card[artwork='full-cover'].--has-artwork[content='music']:before,
  ha-card[artwork='full-cover-fit'].--has-artwork:before {
    padding-top: 100%;
  }
  .mmp__bg {
    background: var(--ha-card-background, var(--card-background-color, var(--paper-card-background-color, white)));
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    overflow: hidden;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: var(--mmp-bg-opacity);
  }
  ha-card[artwork='material'].--has-artwork .mmp__bg,
  ha-card[artwork*='cover'].--has-artwork .mmp__bg {
    opacity: var(--mmp-artwork-opacity);
    background: transparent;
  }
  ha-card[artwork='material'].--has-artwork .cover {
    height: 100%;
    right: 0;
    left: unset;
    animation: fade-in 4s cubic-bezier(.21,.61,.35,1) !important;
  }
  ha-card[artwork='material'].--has-artwork .cover.--prev {
    animation: fade-in 1s linear reverse forwards !important;
  }
  ha-card[artwork='material'].--has-artwork .cover-gradient {
    position: absolute;
    height: 100%;
    right: 0;
    left: 0;
    opacity: 1;
  }
  ha-card.--group .mmp__bg {
    background: transparent;
  }
  ha-card.--inactive .cover {
    opacity: 0;
  }
  ha-card.--inactive .cover.--bg {
    opacity: 1;
  }
  .cover-gradient {
    transition: opacity .45s linear;
    opacity: 0;
  }
  .cover,
  .cover:before {
    display: block;
    opacity: 0;
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    transition: opacity .75s linear, width .05s cubic-bezier(.21,.61,.35,1);
    will-change: opacity;
  }
  .cover:before {
    content: '';
    background: var(--mmp-overlay-color);
  }
  .cover {
    animation: fade-in .5s cubic-bezier(.21,.61,.35,1);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: var(--ha-card-border-radius, 0);
    overflow: hidden;
  }
  .cover.--prev {
    animation: fade-in .5s linear reverse forwards;
  }
  .cover.--bg {
    opacity: 1;
  }
  ha-card[artwork*='full-cover'].--has-artwork .mmp-player {
    background: linear-gradient(to top, var(--mmp-overlay-color) var(--mmp-overlay-color-stop), transparent 100%);
    border-bottom-left-radius: var(--ha-card-border-radius, 0);
    border-bottom-right-radius: var(--ha-card-border-radius, 0);
  }
  ha-card.--has-artwork .cover,
  ha-card.--has-artwork[artwork='cover'] .cover:before {
    opacity: .999;
  }
  ha-card[artwork='default'] .cover {
    display: none;
  }
  ha-card.--bg .cover {
    display: block;
  }
  ha-card[artwork='material'].--has-artwork .cover {
    background-size: cover;
  }
  ha-card[artwork='full-cover-fit'].--has-artwork .cover {
    background-color: black;
    background-size: contain;
  }
  .mmp-player {
    align-self: flex-end;
    box-sizing: border-box;
    position: relative;
    padding: 16px;
    transition: padding .25s ease-out;
    width: 100%;
    will-change: padding;
  }
  ha-card.--group .mmp-player {
    padding: 2px 0;
  }
  .flex {
    display: flex;
    display: -ms-flexbox;
    display: -webkit-flex;
    flex-direction: row;
  }
  .mmp-player__core {
    position: relative;
  }
  .entity__info {
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    position: relative;
    overflow: hidden;
    user-select: none;
  }
  ha-card.--rtl .entity__info {
    margin-left: auto;
    margin-right: calc(var(--mmp-unit) / 5);
  }
  ha-card[content='movie'] .attr__media_season,
  ha-card[content='movie'] .attr__media_episode {
    display: none;
  }
  .entity__icon {
    color: var(--mmp-icon-color);
  }
  .entity__icon[color] {
    color: var(--mmp-icon-active-color);
  }
  .entity__artwork, .entity__icon {
    animation: fade-in .25s ease-out;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 100%;
    height: var(--mmp-unit);
    width: var(--mmp-unit);
    min-width: var(--mmp-unit);
    line-height: var(--mmp-unit);
    margin-right: calc(var(--mmp-unit) / 5);
    position: relative;
    text-align: center;
    will-change: border-color;
    transition: border-color .25s ease-out;
  }
  ha-card.--rtl .entity__artwork,
  ha-card.--rtl .entity__icon {
    margin-right: auto;
  }
  .entity__artwork[border] {
    border: 2px solid var(--primary-text-color);
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .entity__artwork[border][state='playing'] {
    border-color: var(--mmp-accent-color);
  }
  .entity__info__name,
  .entity__info__media[short] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .entity__info__name {
    line-height: calc(var(--mmp-unit) / 2);
    color: var(--mmp-text-color);
    font-weight: var(--mmp-name-font-weight);
  }
  .entity__info__media {
    color: var(--secondary-text-color);
    max-height: 6em;
    word-break: break-word;
    opacity: var(--mmp-info-opacity);
    transition: color .5s;
  }
  .entity__info__media[short] {
    max-height: calc(var(--mmp-unit) / 2);
    overflow: hidden;
  }
  .attr__app_name {
    display: none;
  }
  .attr__app_name:first-child,
  .attr__app_name:first-of-type {
    display: inline;
  }
  .mmp-player__core[inactive] .entity__info__media {
    color: var(--mmp-text-color);
    max-width: 200px;
    opacity: .5;
  }
  .entity__info__media[short-scroll] {
    max-height: calc(var(--mmp-unit) / 2);
    white-space: nowrap;
  }
  .entity__info__media[scroll] > span {
    visibility: hidden;
  }
  .entity__info__media[scroll] > div {
    animation: move linear infinite;
  }
  .entity__info__media[scroll] .marquee {
    animation: slide linear infinite;
  }
  .entity__info__media[scroll] .marquee,
  .entity__info__media[scroll] > div {
    animation-duration: inherit;
    visibility: visible;
  }
  .entity__info__media[scroll] {
    animation-duration: 10s;
    mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
  }
  .marquee {
    visibility: hidden;
    position: absolute;
    white-space: nowrap;
  }
  ha-card[artwork*='cover'].--has-artwork .entity__info__media,
  ha-card.--bg .entity__info__media {
    color: var(--mmp-media-cover-info-color);
  }
  .entity__info__media span:before {
    content: ' - ';
  }
  .entity__info__media span:first-of-type:before {
    content: '';
  }
  .entity__info__media span:empty {
    display: none;
  }
  .mmp-player__adds {
    margin-left: calc(var(--mmp-unit) * 1.2);
    position: relative;
  }
  ha-card.--rtl .mmp-player__adds {
    margin-left: auto;
    margin-right: calc(var(--mmp-unit) * 1.2);
  }
  .mmp-player__adds > *:nth-child(2) {
    margin-top: 0px;
  }
  mmp-powerstrip {
    flex: 1;
    justify-content: flex-end;
    margin-right: 0;
    margin-left: auto;
    width: auto;
    max-width: 100%;
  }
  mmp-media-controls {
    flex-wrap: wrap;
  }
  ha-card.--flow mmp-powerstrip {
    justify-content: space-between;
    margin-left: auto;
  }
  ha-card.--flow.--rtl mmp-powerstrip {
    margin-right: auto;
  }
  ha-card.--flow .entity__info {
    display: none;
  }
  ha-card.--responsive .mmp-player__adds {
    margin-left: 0;
  }
  ha-card.--responsive.--rtl .mmp-player__adds {
    margin-right: 0;
  }
  ha-card.--responsive .mmp-player__adds > mmp-media-controls {
    padding: 0;
  }
  ha-card.--progress .mmp-player {
    padding-bottom: calc(16px + calc(var(--mini-media-player-progress-height, 6px) - 6px));
  }
  ha-card.--progress.--group .mmp-player {
    padding-bottom: calc(10px + calc(var(--mini-media-player-progress-height, 6px) - 6px));
  }
  ha-card.--runtime .mmp-player {
    padding-bottom: calc(16px + 16px + var(--mini-media-player-progress-height, 0px));
  }
  ha-card.--runtime.--group .mmp-player {
    padding-bottom: calc(16px + 12px + var(--mini-media-player-progress-height, 0px));
  }
  ha-card.--inactive .mmp-player {
    padding: 16px;
  }
  ha-card.--inactive.--group .mmp-player {
    padding: 2px 0;
  }
  .mmp-player div:empty {
    display: none;
  }
  @keyframes slide {
    100% { transform: translateX(-100%); }
  }
  @keyframes move {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
      var At = Y`
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .label {
    margin: 0 8px;
  }
  ha-icon {
    width: calc(var(--mmp-unit) * .6);
    height: calc(var(--mmp-unit) * .6);
  }
  ha-icon-button {
    width: var(--mmp-unit);
    height: var(--mmp-unit);
    color: var(--mmp-text-color, var(--primary-text-color));
    transition: color .25s;
  }
  ha-icon-button[color] {
    color: var(--mmp-accent-color, var(--accent-color)) !important;
    opacity: 1 !important;
  }
  ha-icon-button[inactive] {
    opacity: .5;
  }
`,
        Et = r(63);
      const Mt = (t, e, r) => {
          const n = [t, e, r].map((t) => {
            let e = t;
            return (
              (e /= 255),
              e <= 0.03928 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4
            );
          });
          return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
        },
        Tt = (t, e) =>
          Math.round(
            100 *
              (((t, e) => {
                const r = Mt(...t),
                  n = Mt(...e);
                return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
              })(t, e) +
                Number.EPSILON)
          ) / 100,
        It = (t) => {
          t.sort((t, e) => e.population - t.population);
          const e = t[0];
          let r;
          const n = new Map();
          function i(t) {
            return n.has(t) || n.set(t, Tt(e.rgb, t.rgb)), n.get(t) > 4.5;
          }
          for (let e = 1; e < t.length && void 0 === r; e += 1) {
            if (i(t[e])) {
              r = t[e].hex;
              break;
            }
            const n = t[e];
            for (let o = e + 1; o < t.length; o += 1) {
              const e = t[o];
              if (
                Math.abs(n.rgb[0] - e.rgb[0]) +
                  Math.abs(n.rgb[1] - e.rgb[1]) +
                  Math.abs(n.rgb[2] - e.rgb[2]) <=
                  150 &&
                i(e) &&
                i(e)
              ) {
                r = e.hex;
                break;
              }
            }
          }
          return void 0 === r && (r = e.bodyTextColor), [r, e.hex];
        };
      r(186);
      var Vt = {
        en: {
          placeholder: { tts: "Text to speech" },
          label: {
            leave: "Leave",
            ungroup: "Ungroup",
            group_all: "Group all",
            send: "Send",
            master: "Master",
          },
          state: { idle: "Idle", unavailable: "Unavailable" },
          title: { speaker_management: "Group management" },
        },
        fr: {
          placeholder: { tts: "Texte à lire" },
          label: {
            leave: "Quitter",
            ungroup: "Dégrouper",
            group_all: "Grouper tous",
            send: "Envoyer",
          },
          state: { idle: "Inactif", unavailable: "Indisponible" },
          title: { speaker_management: "Gestion des groupes" },
        },
        hu: {
          placeholder: { tts: "Szövegfelolvasás" },
          label: {
            leave: "Kilépés",
            ungroup: "Összes ki",
            group_all: "Összes be",
            send: "Küldés",
            master: "Forrás",
          },
          state: { idle: "Tétlen", unavailable: "Nem elérhető" },
          title: { speaker_management: "Hangszórók csoportosítása" },
        },
        pl: {
          placeholder: { tts: "Wyślij media lub tekst do odtwarzaczy" },
          label: {
            leave: "Opuść",
            ungroup: "Usuń grupę",
            group_all: "Grupuj wszystkie",
            send: "Wyślij",
          },
          state: { idle: "nieaktywny", unavailable: "niedostępny" },
          title: { speaker_management: "Zarządzanie grupą" },
        },
        uk: {
          placeholder: { tts: "Текст для відтворення" },
          label: {
            leave: "Залишити",
            ungroup: "Розгрупувати",
            group_all: "Згрупувати всі",
            send: "Надіслати",
            master: "Головний",
          },
          state: { idle: "бездіяльність", unavailable: "недоступний" },
          title: { speaker_management: "Управління групою" },
        },
      };
      const Nt = (t, e) =>
        e.split(".").reduce((t, e) => (t && t[e]) || null, t);
      var zt = (t, e, r, n = "unknown") => {
        const i = t.selectedLanguage || t.language;
        return (
          (Vt[i] && Nt(Vt[i], e)) ||
          (t.resources[i] && t.resources[i][r]) ||
          Nt(Vt.en, e) ||
          n
        );
      };
      customElements.define(
        "mmp-group-item",
        class extends et {
          static get properties() {
            return {
              item: {},
              checked: Boolean,
              disabled: Boolean,
              master: Boolean,
            };
          }
          render() {
            return D`
      <paper-checkbox
        ?checked=${this.checked}
        ?disabled=${this.disabled}
        @change='${(t) => t.stopPropagation()}'
        @click='${this.handleClick}'>
        ${this.item.name}
        ${this.master ? D`<span>(${zt(this.hass, "label.master")})</span>` : ""}
      </paper-checkbox>
    `;
          }
          handleClick(t) {
            t.stopPropagation(),
              this.dispatchEvent(
                new CustomEvent("change", {
                  detail: {
                    entity: this.item.entity_id,
                    checked: !this.checked,
                  },
                })
              );
          }
          static get styles() {
            return Y`
      paper-checkbox {
        padding: 8px 0;
      }
      paper-checkbox > span {
        font-weight: 600;
        text-transform: lowercase;
      }

      ha-card[artwork*='cover'][has-artwork] paper-checkbox[disabled] {
        --paper-checkbox-checkmark-color: rgba(0,0,0,.5);
      }
      ha-card[artwork*='cover'][has-artwork] paper-checkbox {
        --paper-checkbox-unchecked-color: #FFFFFF;
        --paper-checkbox-label-color: #FFFFFF;
      }
    `;
          }
        }
      );
      customElements.define(
        "mmp-button",
        class extends et {
          render() {
            return D`
      <div class="container">
        <div class="slot-container">
          <slot></slot>
        </div>
        <paper-ripple></paper-ripple>
      </div>
    `;
          }
          static get styles() {
            return Y`
      :host {
        position: relative;
        box-sizing: border-box;
        margin: 4px;
        min-width: 0;
        overflow: hidden;
        transition: background .5s;
        border-radius: 4px;
        font-weight: 500;
      }
      :host([raised]) {
        background: var(--mmp-button-color);
        min-height: calc(var(--mmp-unit) * .8);
        box-shadow:
          0px 3px 1px -2px rgba(0, 0, 0, 0.2),
          0px 2px 2px 0px rgba(0, 0, 0, 0.14),
          0px 1px 5px 0px rgba(0,0,0,.12);
      }
      :host([color]) {
        background: var(--mmp-active-color);
        transition: background .25s;
        opacity: 1;
      }
      :host([faded]) {
        opacity: .75;
      }
      :host([disabled]) {
        opacity: .25;
        pointer-events: none;
      }
      .container {
        height: 100%;
        width: 100%;
      }
      .slot-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 8px;
        width: auto;
      }
      paper-ripple {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    `;
          }
        }
      );
      customElements.define(
        "mmp-group-list",
        class extends et {
          static get properties() {
            return { hass: {}, entities: {}, player: {}, visible: Boolean };
          }
          get group() {
            return this.player.group;
          }
          get master() {
            return this.player.master;
          }
          get isMaster() {
            return this.player.isMaster;
          }
          get isGrouped() {
            return this.player.isGrouped;
          }
          handleGroupChange(t) {
            const { entity: e, checked: r } = t.detail;
            this.player.handleGroupChange(t, e, r);
          }
          render() {
            if (!this.visible) return D``;
            const { group: t, isMaster: e, isGrouped: r } = this,
              { id: n } = this.player;
            return D`
      <div class='mmp-group-list'>
        <span class='mmp-group-list__title'>${zt(
          this.hass,
          "title.speaker_management"
        )}</span>
        ${this.entities.map((t) => this.renderItem(t, n))}
        <div class='mmp-group-list__buttons'>
          <mmp-button raised ?disabled=${!r}
            @click=${(t) => this.player.handleGroupChange(t, n, !1)}>
            <span>${zt(this.hass, "label.leave")}</span>
          </mmp-button>
          ${
            r && e
              ? D`
            <mmp-button raised
              @click=${(e) => this.player.handleGroupChange(e, t, !1)}>
              <span>${zt(this.hass, "label.ungroup")}</span>
            </mmp-button>
          `
              : D``
          }
          <mmp-button raised ?disabled=${!e}
            @click=${(t) =>
              this.player.handleGroupChange(
                t,
                this.entities.map((t) => t.entity_id),
                !0
              )}>
            <span><svg style="width:24px;height:24px; vertical-align:middle;" viewBox="0 0 24 24">
                    <path fill="#fff" d="M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                  </svg> ${zt(this.hass, "label.group_all")}</span>
          </mmp-button>
        </div>
      </div>
    `;
          }
          renderItem(t, e) {
            const r = t.entity_id;
            return D`
      <mmp-group-item
        @change=${this.handleGroupChange}
        .item=${t}
        .checked=${r === e || this.group.includes(r)}
        .disabled=${r === e || !this.isMaster}
        .master=${r === this.master}
      />`;
          }
          static get styles() {
            return Y`
      .mmp-group-list {
        display: flex;
        flex-direction: column;
        margin-left: 8px;
        margin-bottom: 8px;
      }
      .mmp-group-list__title {
        font-weight: 500;
        letter-spacing: .1em;
        margin: 8px 0 4px;
        text-transform: uppercase;
      }
      .mmp-group-list__buttons {
        display: flex;
      }
      mmp-button {
        margin: 8px 8px 0 0;
        min-width: 0;
        text-transform: uppercase;
        text-align: center;
        width: 50%;
        --mdc-theme-primary: transparent;
      }
    `;
          }
        }
      );
      customElements.define(
        "mmp-dropdown",
        class extends et {
          static get properties() {
            return { items: [], label: String, selected: String };
          }
          get selectedId() {
            return this.items.map((t) => t.id).indexOf(this.selected);
          }
          onChange(t) {
            const e = t.target.selected;
            e !== this.selectedId &&
              this.items[e] &&
              (this.dispatchEvent(
                new CustomEvent("change", { detail: this.items[e] })
              ),
              (t.target.selected = -1));
          }
          render() {
            return D`
      <paper-menu-button
        class='mmp-dropdown'
        noink no-animations
        .horizontalAlign=${"right"}
        .verticalAlign=${"top"}
        .verticalOffset=${44}
        @click=${(t) => t.stopPropagation()}>
        ${
          this.icon
            ? D`
          <ha-icon-button
            class='mmp-dropdown__button icon'
            slot='dropdown-trigger'
            .icon=${ut}>
          </ha-icon-button>
        `
            : D`
          <mmp-button class='mmp-dropdown__button' slot='dropdown-trigger'>
            <div>
              <span class='mmp-dropdown__label ellipsis'>
                ${this.selected || this.label}
              </span>
              <ha-icon class='mmp-dropdown__icon' .icon=${ut}></ha-icon>
            </div>
          </mmp-button>
        `
        }
        <paper-listbox slot="dropdown-content" .selected=${
          this.selectedId
        } @iron-select=${this.onChange}>
          ${this.items.map(
            (t) => D`
            <paper-item value=${t.id || t.name}>
              ${t.icon ? D`<ha-icon .icon=${t.icon}></ha-icon>` : ""}
              ${
                t.name
                  ? D`<span class='mmp-dropdown__item__label'>${t.name}</span>`
                  : ""
              }
            </paper-item>`
          )}
        </paper-listbox>
      </paper-menu-button>
    `;
          }
          static get styles() {
            return [
              At,
              Y`
        :host {
          display: block;
        }
        :host([faded]) {
          opacity: .75;
        }
        :host[small] .mmp-dropdown__label {
          max-width: 60px;
          display: block;
          position: relative;
          width: auto;
          text-transform: initial;
        }
        :host[full] .mmp-dropdown__label {
          max-width: none;
        }
        .mmp-dropdown {
          padding: 0;
          display: block;
        }
        .mmp-dropdown__button {
          display: flex;
          font-size: 1em;
          justify-content: space-between;
          align-items: center;
          height: calc(var(--mmp-unit) - 4px);
          margin: 2px 0;
        }
        .mmp-dropdown__button.icon {
          height: var(--mmp-unit);
          margin: 0;
        }
        .mmp-dropdown__button > div {
          display: flex;
          flex: 1;
          justify-content: space-between;
          align-items: center;
          height: calc(var(--mmp-unit) - 4px);
          max-width: 100%;
        }
        .mmp-dropdown__label {
          text-align: left;
          text-transform: none;
        }
        .mmp-dropdown__icon {
          height: auto;
          width: calc(var(--mmp-unit) * .6);
          min-width: calc(var(--mmp-unit) * .6);
        }
        paper-item > *:nth-child(2) {
          margin-left: 4px;
        }
        paper-menu-button[focused] mmp-button ha-icon {
          color: var(--mmp-accent-color);
          transform: rotate(180deg);
        }
        paper-menu-button[focused] ha-icon-button {
          color: var(--mmp-accent-color);
          transform: rotate(180deg);
        }
        paper-menu-button[focused] ha-icon-button[focused] {
          color: var(--mmp-text-color);
          transform: rotate(0deg);
        }
      `,
            ];
          }
        }
      );
      customElements.define(
        "mmp-shortcuts",
        class extends et {
          static get properties() {
            return { player: {}, hass: {}, shortcuts: {} };
          }
          get buttons() {
            return this.shortcuts.buttons;
          }
          get list() {
            let t;
            this.shortcuts.list = [];
            const e = Object.keys(this.hass.states);
            for (t = 0; t < e.length; t += 1)
              if (
                e[t].startsWith("media_player.") &&
                "" !== this.hass.states[e[t]].entity_id
              ) {
                const r = this.hass.states[e[t]].attributes;
                this.shortcuts.list.push({
                  name: r.friendly_name,
                  icon: "mdi:speaker",
                  id: "ais_exo_player.redirect_media",
                  type: "service",
                  data: { entity_id: this.hass.states[e[t]].entity_id },
                });
              }
            return (
              this.shortcuts.list.push({
                name: "Wyszukaj dostępne odtwarzacze",
                icon: "mdi:sync",
                id: "ais_shell_command.scan_network_for_ais_players",
                type: "service",
              }),
              this.shortcuts.list
            );
          }
          get show() {
            return !this.shortcuts.hide_when_off || this.player.active;
          }
          get active() {
            return this.player.getAttribute(this.shortcuts.attribute);
          }
          get height() {
            return this.shortcuts.column_height || 36;
          }
          render() {
            if (!this.show) return D``;
            const { active: t } = this,
              e = this.list
                ? D`
      <mmp-dropdown class='mmp-shortcuts__dropdown'
        @change=${this.handleShortcut}
        .items=${this.list}
        .label=${this.shortcuts.label}
        .selected=${t}>
      </mmp-dropdown>
    `
                : "",
              r = this.buttons
                ? D`
      <div class='mmp-shortcuts__buttons'>
        ${this.buttons.map(
          (e) => D`
          <mmp-button
            style="${st(this.shortcutStyle(e))}"
            raised
            columns=${this.shortcuts.columns}
            ?color=${e.id === t}
            class='mmp-shortcuts__button'
            @click=${(t) => this.handleShortcut(t, e)}>
            <div align=${this.shortcuts.align_text}>
              ${e.icon ? D`<ha-icon .icon=${e.icon}></ha-icon>` : ""}
              ${e.image ? D`<img src=${e.image}>` : ""}
              ${e.name ? D`<span class="ellipsis">${e.name}</span>` : ""}
            </div>
          </mmp-button>`
        )}
      </div>
    `
                : "";
            return D`
      ${r}
      ${e}
    `;
          }
          handleShortcut(t, e) {
            const { type: r, id: n, data: i } = e || t.detail;
            if ("source" === r) return this.player.setSource(t, n);
            if ("service" === r) return this.player.toggleService(t, n, i);
            if ("script" === r) return this.player.toggleScript(t, n, i);
            if ("sound_mode" === r) return this.player.setSoundMode(t, n);
            const o = { media_content_type: r, media_content_id: n };
            this.player.setMedia(t, o);
          }
          shortcutStyle(t) {
            return {
              "min-height": this.height + "px",
              ...(t.cover && { "background-image": `url(${t.cover})` }),
            };
          }
          static get styles() {
            return [
              At,
              Y`
        .mmp-shortcuts__buttons {
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          margin-top: 8px;
        }
        .mmp-shortcuts__button {
          min-width: calc(50% - 8px);
          flex: 1;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
        }
        .mmp-shortcuts__button > div {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: .2em 0;
        }
        .mmp-shortcuts__button > div[align='left'] {
          justify-content: flex-start;
        }
        .mmp-shortcuts__button > div[align='right'] {
          justify-content: flex-end;
        }
        .mmp-shortcuts__button[columns='1'] {
          min-width: calc(100% - 8px);
        }
        .mmp-shortcuts__button[columns='3'] {
          min-width: calc(33.33% - 8px);
        }
        .mmp-shortcuts__button[columns='4'] {
          min-width: calc(25% - 8px);
        }
        .mmp-shortcuts__button[columns='5'] {
          min-width: calc(20% - 8px);
        }
        .mmp-shortcuts__button[columns='6'] {
          min-width: calc(16.66% - 8px);
        }
        .mmp-shortcuts__button > div > span {
          line-height: calc(var(--mmp-unit) * .6);
          text-transform: initial;
        }
        .mmp-shortcuts__button > div > ha-icon {
          width: calc(var(--mmp-unit) * .6);
          height: calc(var(--mmp-unit) * .6);
        }
        .mmp-shortcuts__button > div > *:nth-child(2) {
          margin-left: 4px;
        }
        .mmp-shortcuts__button > div > img {
          height: 24px;
        }
      `,
            ];
          }
        }
      );
      customElements.define(
        "mmp-tts",
        class extends et {
          static get properties() {
            return { hass: {}, config: {}, player: {} };
          }
          get label() {
            return zt(
              this.hass,
              "placeholder.tts",
              "ui.card.media_player.text_to_speak",
              "Say"
            );
          }
          get input() {
            return this.shadowRoot.getElementById("tts-input");
          }
          get message() {
            return this.input.value;
          }
          render() {
            return D`
      <paper-input id="tts-input" class='mmp-tts__input'
        no-label-float
        placeholder=${this.label}...
        @keypress=${this.handleTtsKeyPres}
        @click=${(t) => t.stopPropagation()}>
      </paper-input>
      <mmp-button class='mmp-tts__button' @click=${this.handleTts}>
        <span>${zt(this.hass, "label.send")}</span>
      </mmp-button>
    `;
          }
          validURL(t) {
            return !!new RegExp(
              "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
              "i"
            ).test(t);
          }
          handleTtsKeyPres(t) {
            if (13 !== t.charCode) return t.stopPropagation(), !0;
            this.handleTts(t);
          }
          handleTts(t) {
            const { config: e, message: r } = this,
              n = {
                message: r,
                entity_id: e.entity_id || this.player.id,
                ...("group" === e.entity_id && {
                  entity_id: this.player.group,
                }),
              };
            e.language && (n.language = e.language),
              "alexa" === e.platform
                ? this.hass.callService("notify", "alexa_media", {
                    message: r,
                    data: { type: e.type || "tts" },
                    target: n.entity_id,
                  })
                : "sonos" === e.platform
                ? this.hass.callService("script", "sonos_say", {
                    sonos_entity: n.entity_id,
                    volume: e.volume || 0.5,
                    message: r,
                  })
                : "webos" === e.platform
                ? this.hass.callService(
                    "notify",
                    n.entity_id.split(".").slice(-1)[0],
                    { message: r }
                  )
                : "ga" === e.platform
                ? this.hass.callService("notify", "ga_broadcast", {
                    message: r,
                  })
                : "ais" === e.platform
                ? this.hass.callService("ais_exo_player", "play_text_or_url", {
                    text: r,
                  })
                : this.hass.callService("tts", e.platform + "_say", n),
              t.stopPropagation();
          }
          reset() {
            this.input.value = "";
          }
          static get styles() {
            return Y`
      :host {
        align-items: center;
        margin-left: 8px;
        display: flex;
      }
      .mmp-tts__input {
        cursor: text;
        flex: 1;
        margin-right: 8px;
        --paper-input-container-input: {
          font-size: 1em;
        };
      }
      ha-card[rtl] .mmp-tts__input {
        margin-right: auto;
        margin-left: 8px;
      }
      .mmp-tts__button {
        margin: 0;
        height: 30px;
        padding: 0 .4em;
      }
      paper-input {
        opacity: .75;
        --paper-input-container-color: var(--mmp-text-color);
        --paper-input-container-input-color: var(--mmp-text-color);
        --paper-input-container-focus-color: var(--mmp-text-color);
        --paper-input-container: {
          padding: 0;
        };
      }
      paper-input[focused] {
        opacity: 1;
      }

      ha-card[artwork*='cover'][has-artwork] paper-input {
        --paper-input-container-color: #FFFFFF;
        --paper-input-container-input-color: #FFFFFF;
        --paper-input-container-focus-color: #FFFFFF;
      }
    `;
          }
        }
      );
      var Lt = (t) => {
        let e = parseInt(t % 60, 10),
          r = parseInt((t / 60) % 60, 10),
          n = parseInt((t / 3600) % 24, 10);
        return (
          (n = n < 10 ? "0" + n : n),
          (r = r < 10 ? "0" + r : r),
          (e = e < 10 ? "0" + e : e),
          "00" === n && "00" === r && "00" === e
            ? ""
            : `${"00" !== n ? n + ":" : ""}${r}:${e}`
        );
      };
      customElements.define(
        "mmp-progress",
        class extends et {
          static get properties() {
            return {
              _player: {},
              showTime: Boolean,
              progress: Number,
              duration: Number,
              tracker: {},
              seekProgress: Number,
              seekWidth: Number,
              track: Boolean,
            };
          }
          set player(t) {
            (this._player = t), this.hasProgress && this.trackProgress();
          }
          get duration() {
            return this.player.mediaDuration;
          }
          get player() {
            return this._player;
          }
          get hasProgress() {
            return this.player.hasProgress;
          }
          get width() {
            return this.shadowRoot.querySelector(".mmp-progress").offsetWidth;
          }
          get offset() {
            return this.getBoundingClientRect().left;
          }
          get classes() {
            return it({
              transiting: !this.seekProgress,
              seeking: this.seekProgress,
            });
          }
          render() {
            return D`
      <div class='mmp-progress'
        @touchstart=${this.initSeek}
        @touchend=${this.handleSeek}
        @mousedown=${this.initSeek}
        @mouseup=${this.handleSeek}
        @mouseleave=${this.resetSeek}
        @click=${(t) => t.stopPropagation()}
        ?paused=${!this.player.isPlaying}>
        ${
          this.showTime
            ? D`
          <div class='mmp-progress__duration'>
            <span>${Lt(this.seekProgress || this.progress)}</span>
            <span>${Lt(this.duration)}</span>
          </div>
        `
            : ""
        }
        <paper-progress class=${this.classes}
          value=${this.seekProgress || this.progress}
          max=${this.duration}>
        </paper-progress>
      </div>
    `;
          }
          trackProgress() {
            (this.progress = this.player.progress),
              this.tracker ||
                (this.tracker = setInterval(() => this.trackProgress(), 1e3)),
              this.player.isPlaying ||
                (clearInterval(this.tracker), (this.tracker = null));
          }
          initSeek(t) {
            const e = t.offsetX || t.touches[0].pageX - this.offset;
            (this.seekWidth = this.width),
              (this.seekProgress = this.calcProgress(e)),
              this.addEventListener("touchmove", this.moveSeek),
              this.addEventListener("mousemove", this.moveSeek);
          }
          resetSeek() {
            (this.seekProgress = null),
              this.removeEventListener("touchmove", this.moveSeek),
              this.removeEventListener("mousemove", this.moveSeek);
          }
          moveSeek(t) {
            t.preventDefault();
            const e = t.offsetX || t.touches[0].pageX - this.offset;
            this.seekProgress = this.calcProgress(e);
          }
          handleSeek(t) {
            this.resetSeek();
            const e = t.offsetX || t.changedTouches[0].pageX - this.offset,
              r = this.calcProgress(e);
            this.player.seek(t, r);
          }
          disconnectedCallback() {
            super.disconnectedCallback(),
              this.resetSeek(),
              clearInterval(this.tracker),
              (this.tracker = null);
          }
          connectedCallback() {
            super.connectedCallback(), this.hasProgress && this.trackProgress();
          }
          calcProgress(t) {
            const e = (t / this.seekWidth) * this.duration;
            return Math.min(Math.max(e, 0.1), this.duration);
          }
          static get styles() {
            return Y`
      .mmp-progress {
        cursor: pointer;
        left: 0; right: 0; bottom: 0;
        position: absolute;
        pointer-events: auto;
        min-height: calc(var(--mmp-progress-height) + 10px);
      }
      .mmp-progress__duration {
        left: calc(var(--ha-card-border-radius, 4px) / 2);
        right: calc(var(--ha-card-border-radius, 4px) / 2);
        bottom: calc(var(--mmp-progress-height) + 6px);
        position: absolute;
        display: flex;
        justify-content: space-between;
        font-size: .8em;
        padding: 0 6px;
        z-index: 2
      }
      paper-progress {
        height: var(--mmp-progress-height);
        --paper-progress-height: var(--mmp-progress-height);
        bottom: 0;
        position: absolute;
        width: 100%;
        transition: height 0;
        z-index: 1;
        --paper-progress-active-color: var(--mmp-accent-color);
        --paper-progress-container-color: rgba(100,100,100,.15);
        --paper-progress-transition-duration: 1s;
        --paper-progress-transition-timing-function: linear;
        --paper-progress-transition-delay: 0s;
      }
      paper-progress.seeking {
        transition: height .15s ease-out;
        height: calc(var(--mmp-progress-height) + 4px);
        --paper-progress-height: calc(var(--mmp-progress-height) + 4px);
      }
      .mmp-progress[paused] paper-progress {
        --paper-progress-active-color: var(--disabled-text-color, rgba(150,150,150,.5));
      }
    `;
          }
        }
      );
      customElements.define(
        "mmp-source-menu",
        class extends et {
          static get properties() {
            return { player: {}, icon: Boolean };
          }
          get source() {
            return this.player.source;
          }
          get sources() {
            return this.player.sources.map((t) => ({
              name: t,
              id: t,
              type: "source",
            }));
          }
          render() {
            return D`
      <mmp-dropdown
        @change=${this.handleSource}
        .items=${this.sources}
        .label=${this.source}
        .selected=${this.source}
        .icon=${this.icon}
      ></mmp-dropdown>
    `;
          }
          handleSource(t) {
            const { id: e } = t.detail;
            this.player.setSource(t, e);
          }
          static get styles() {
            return Y`
      :host {
        max-width: 120px;
        min-width: var(--mmp-unit);
      }
      :host([full]) {
        max-width: none;
      }
    `;
          }
        }
      );
      customElements.define(
        "mmp-sound-menu",
        class extends et {
          static get properties() {
            return { player: {}, selected: String, icon: Boolean };
          }
          get mode() {
            return this.player.soundMode;
          }
          get modes() {
            return this.player.soundModes.map((t) => ({
              name: t,
              id: t,
              type: "soundMode",
            }));
          }
          render() {
            return D`
      <mmp-dropdown
        @change=${this.handleChange}
        .items=${this.modes}
        .label=${this.mode}
        .selected=${this.selected || this.mode}
        .icon=${this.icon}
      ></mmp-dropdown>
    `;
          }
          handleChange(t) {
            const { id: e } = t.detail;
            this.player.setSoundMode(t, e), (this.selected = e);
          }
          static get styles() {
            return Y`
      :host {
        max-width: 120px;
        min-width: var(--mmp-unit);
      }
      :host([full]) {
        max-width: none;
      }
    `;
          }
        }
      );
      customElements.define(
        "mmp-media-controls",
        class extends et {
          static get properties() {
            return { player: {}, config: {}, break: Boolean };
          }
          get showShuffle() {
            return !this.config.hide.shuffle && this.player.supportsShuffle;
          }
          get maxVol() {
            return this.config.max_volume || 100;
          }
          get minVol() {
            return this.config.min_volume || 0;
          }
          get vol() {
            return Math.round(100 * this.player.vol);
          }
          render() {
            const { hide: t } = this.config;
            return D`
      ${t.volume ? D`` : this.renderVolControls(this.player.muted)}
      ${
        this.showShuffle
          ? D`
        <div class='flex mmp-media-controls__shuffle'>
          <ha-icon-button
            class='shuffle-button'
            @click=${(t) => this.player.toggleShuffle(t)}
            .icon=${vt}
            ?color=${this.player.shuffle}>
          </ha-icon-button>
        </div>
      `
          : D``
      }
      ${
        t.controls
          ? D``
          : D`
        <div class='flex mmp-media-controls__media' ?flow=${
          this.config.flow || this.break
        }>
          ${
            t.prev
              ? ""
              : D`
            <ha-icon-button
              @click=${(t) => this.player.prev(t)}
              .icon=${gt}>
            </ha-icon-button>`
          }
          ${this.renderPlayButtons()}
          ${
            t.next
              ? ""
              : D`
            <ha-icon-button
              @click=${(t) => this.player.next(t)}
              .icon=${dt}>
            </ha-icon-button>`
          }
        </div>
      `
      }
    `;
          }
          renderVolControls(t) {
            const e = this.config.volume_stateless
                ? this.renderVolButtons(t)
                : this.renderVolSlider(t),
              r = it({
                "--buttons": this.config.volume_stateless,
                "mmp-media-controls__volume": !0,
                flex: !0,
              }),
              n = !this.config.hide.volume_level;
            return D`
      <div class=${r}>
        ${e}
        ${n ? this.renderVolLevel() : ""}
      </div>`;
          }
          renderVolSlider(t) {
            return D`
      ${this.renderMuteButton(t)}
      <ha-slider
        @change=${this.handleVolumeChange}
        @click=${(t) => t.stopPropagation()}
        ?disabled=${t}
        min=${this.minVol} max=${this.maxVol}
        value=${100 * this.player.vol}
        step=${this.config.volume_step || 1}
        dir=${"ltr"}
        ignore-bar-touch pin>
      </ha-slider>
    `;
          }
          renderVolButtons(t) {
            return D`
      ${this.renderMuteButton(t)}
      <ha-icon-button
        @click=${(t) => this.player.volumeDown(t)}
        .icon=${yt}>
      </ha-icon-button>
      <ha-icon-button
        @click=${(t) => this.player.volumeUp(t)}
        .icon=${bt}>
      </ha-icon-button>
    `;
          }
          renderVolLevel() {
            return D`
      <span class="mmp-media-controls__volume__level">${this.vol}%</span>
    `;
          }
          renderMuteButton(t) {
            if (!this.config.hide.mute)
              switch (this.config.replace_mute) {
                case "play":
                case "play_pause":
                  return D`
          <ha-icon-button
            @click=${(t) => this.player.playPause(t)}
            .icon=${ft[this.player.isPlaying]}>
          </ha-icon-button>
        `;
                case "stop":
                  return D`
          <ha-icon-button
            @click=${(t) => this.player.stop(t)}
            .icon=${_t.true}>
          </ha-icon-button>
        `;
                case "play_stop":
                  return D`
          <ha-icon-button
            @click=${(t) => this.player.playStop(t)}
            .icon=${_t[this.player.isPlaying]}>
          </ha-icon-button>
        `;
                case "next":
                  return D`
          <ha-icon-button
            @click=${(t) => this.player.next(t)}
            .icon=${dt}>
          </ha-icon-button>
        `;
                default:
                  if (!this.player.supportsMute) return;
                  return D`
          <ha-icon-button
            @click=${(t) => this.player.toggleMute(t)}
            .icon=${pt[t]}>
          </ha-icon-button>
        `;
              }
          }
          renderPlayButtons() {
            const { hide: t } = this.config;
            return D`
      ${
        t.play_pause
          ? D``
          : D`
        <ha-icon-button
          @click=${(t) => this.player.playPause(t)}
          .icon=${ft[this.player.isPlaying]}>
        </ha-icon-button>
      `
      }
      ${
        t.play_stop
          ? D``
          : D`
        <ha-icon-button
          @click=${(t) => this.handleStop(t)}
          .icon=${t.play_pause ? _t[this.player.isPlaying] : _t.true}>
        </ha-icon-button>
      `
      }
    `;
          }
          handleStop(t) {
            return this.config.hide.play_pause
              ? this.player.playStop(t)
              : this.player.stop(t);
          }
          handleVolumeChange(t) {
            const e = parseFloat(t.target.value) / 100;
            this.player.setVolume(t, e);
          }
          static get styles() {
            return [
              At,
              Y`
        :host {
          display: flex;
          width: 100%;
          justify-content: space-between;
        }
        .flex {
          display: flex;
          flex: 1;
          justify-content: space-between;
        }
        ha-slider {
          max-width: none;
          min-width: 100px;
          width: 100%;
          --paper-slider-active-color: var(--mmp-accent-color);
          --paper-slider-knob-color: var(--mmp-accent-color);
        }
        ha-icon-button {
          min-width: var(--mmp-unit);
        }
        .mmp-media-controls__volume {
          flex: 100;
          max-height: var(--mmp-unit);
          align-items: center;
        }
        .mmp-media-controls__volume.--buttons {
          justify-content: left;
        }
        .mmp-media-controls__media {
          margin-right: 0;
          margin-left: auto;
          justify-content: inherit;
        }
        .mmp-media-controls__media[flow] {
          max-width: none;
          justify-content: space-between;
        }
        .mmp-media-controls__shuffle {
          flex: 3;
          flex-shrink: 200;
          justify-content: center;
        }
        .mmp-media-controls__shuffle ha-icon-button {
          height: 36px;
          width: 36px;
          min-width: 36px;
          margin: 2px;
        }
      `,
            ];
          }
        }
      );
      customElements.define(
        "mmp-powerstrip",
        class extends et {
          static get properties() {
            return {
              hass: {},
              player: {},
              config: {},
              groupVisible: Boolean,
              idle: Boolean,
            };
          }
          get icon() {
            return this.config.speaker_group.icon || ht;
          }
          get showGroupButton() {
            return this.config.speaker_group.entities;
          }
          get showPowerButton() {
            return !this.config.hide.power;
          }
          get powerColor() {
            return this.player.active && !this.config.hide.power_state;
          }
          get sourceSize() {
            return (
              "icon" === this.config.source || this.hasControls || this.idle
            );
          }
          get soundSize() {
            return (
              "icon" === this.config.sound_mode || this.hasControls || this.idle
            );
          }
          get hasControls() {
            return (
              this.player.active &&
              this.config.hide.controls !== this.config.hide.volume
            );
          }
          get hasSource() {
            return this.player.sources.length > 0 && !this.config.hide.source;
          }
          get hasSoundMode() {
            return (
              this.player.soundModes.length > 0 && !this.config.hide.sound_mode
            );
          }
          render() {
            return this.player.isUnavailable
              ? D`
        <span class='label ellipsis'>
          ${zt(this.hass, "state.unavailable", "state.default.unavailable")}
        </span>
      `
              : D`
      ${this.idle ? this.renderIdleView : ""}
      ${
        this.hasControls
          ? D`
        <mmp-media-controls
          .player=${this.player}
          .config=${this.config}>
        </mmp-media-controls>
      `
          : ""
      }
      ${
        this.hasSource
          ? D`
        <mmp-source-menu
          .player=${this.player}
          .icon=${this.sourceSize}
          ?full=${"full" === this.config.source}>
        </mmp-source-menu>`
          : ""
      }
      ${
        this.hasSoundMode
          ? D`
        <mmp-sound-menu
          .player=${this.player}
          .icon=${this.soundSize}
          ?full=${"full" === this.config.sound_mode}>
        </mmp-sound-menu>`
          : ""
      }
      ${
        this.showGroupButton
          ? D`
        <ha-icon-button class='group-button'
          .icon=${this.icon}
          ?inactive=${!this.player.isGrouped}
          ?color=${this.groupVisible}
          @click=${this.handleGroupClick}>
        </ha-icon-button>`
          : ""
      }
      ${
        this.showPowerButton
          ? D`
        <ha-icon-button class='power-button'
          .icon=${mt}
          @click=${(t) => this.player.toggle(t)}
          ?color=${this.powerColor}>
        </ha-icon-button>`
          : ""
      }
    `;
          }
          handleGroupClick(t) {
            t.stopPropagation(),
              this.dispatchEvent(new CustomEvent("toggleGroupList"));
          }
          get renderIdleView() {
            return this.player.isPaused
              ? D`
        <ha-icon-button
          .icon=${ft[this.player.isPlaying]}
          @click=${(t) => this.player.playPause(t)}>
        </ha-icon-button>`
              : D`
        <span class='label ellipsis'>
          ${zt(this.hass, "state.idle", "state.media_player.idle")}
        </span>
      `;
          }
          static get styles() {
            return [
              At,
              Y`
        :host {
          display: flex;
          line-height: var(--mmp-unit);
          max-height: var(--mmp-unit);
        }
        :host([flow]) mmp-media-controls {
          max-width: unset;
        }
        mmp-media-controls {
          max-width: calc(var(--mmp-unit) * 5);
          line-height: initial;
          justify-content: flex-end;
        }
        .group-button {
          --mdc-icon-size: calc(var(--mmp-unit) * 0.5);
        }
        ha-icon-button {
          min-width: var(--mmp-unit);
        }
      `,
            ];
          }
        }
      );
      customElements.define(
        "hui-ais-mini-media-player-card",
        class extends et {
          constructor() {
            super(),
              (this._overflow = !1),
              (this.initial = !0),
              (this.picture = !1),
              (this.thumbnail = ""),
              (this.prevThumbnail = ""),
              (this.edit = !1),
              (this.rtl = !1),
              (this.cardHeight = 0),
              (this.foregroundColor = ""),
              (this.backgroundColor = "");
          }
          static get properties() {
            return {
              _hass: {},
              config: {},
              entity: {},
              player: {},
              _overflow: Boolean,
              break: Boolean,
              initial: Boolean,
              picture: String,
              thumbnail: String,
              prevThumbnail: String,
              edit: Boolean,
              rtl: Boolean,
              idle: Boolean,
              cardHeight: Number,
              foregroundColor: String,
              backgroundColor: String,
            };
          }
          static get styles() {
            return [At, Ct];
          }
          set hass(t) {
            if (!t) return;
            const e = t.states[this.config.entity];
            (this._hass = t),
              e &&
                this.entity !== e &&
                ((this.entity = e),
                (this.player = new Pt(t, this.config, e)),
                (this.rtl = this.computeRTL(t)),
                (this.idle = this.player.idle),
                this.player.trackIdle && this.updateIdleStatus());
            const r = Object.keys(t.states);
            let n;
            for (
              this.ais_speaker_group_entities = [], n = 0;
              n < r.length;
              n += 1
            )
              if (r[n].startsWith("media_player.")) {
                const e = t.states[r[n]].attributes;
                this.ais_speaker_group_entities.push({
                  entity_id: t.states[r[n]].entity_id,
                  name: e.friendly_name || "Głośnik",
                });
              }
            (this.config.speaker_group.show_group_count = !0),
              (this.config.speaker_group.platform = "ais_exo_player"),
              (this.config.speaker_group.entities = this.ais_speaker_group_entities);
          }
          get hass() {
            return this._hass;
          }
          set overflow(t) {
            this._overflow !== t && (this._overflow = t);
          }
          get overflow() {
            return this._overflow;
          }
          get name() {
            return this.config.name || this.player.name;
          }
          setConfig(t) {
            this.config = $t(t);
          }
          shouldUpdate(t) {
            return (
              void 0 === this.break && this.computeRect(this),
              t.has("prevThumbnail") &&
                this.prevThumbnail &&
                setTimeout(() => {
                  this.prevThumbnail = "";
                }, 1e3),
              t.has("player") &&
                "material" === this.config.artwork &&
                this.setColors(),
              wt.some((e) => t.has(e)) && this.player
            );
          }
          firstUpdated() {
            new at.a((t) => {
              t.forEach((t) => {
                window.requestAnimationFrame(() => {
                  "scroll" === this.config.info && this.computeOverflow(),
                    this._resizeTimer ||
                      (this.computeRect(t),
                      (this._resizeTimer = setTimeout(() => {
                        (this._resizeTimer = null),
                          this.computeRect(this._resizeEntry),
                          this.measureCard();
                      }, 250))),
                    (this._resizeEntry = t);
                });
              });
            }).observe(this),
              setTimeout(() => (this.initial = !1), 250),
              (this.edit = this.config.speaker_group.expanded || !1);
          }
          updated() {
            "scroll" === this.config.info &&
              setTimeout(() => {
                this.computeOverflow();
              }, 10);
          }
          render({ config: t } = this) {
            return (
              this.computeArtwork(),
              D`
      <ha-card
        class=${this.computeClasses()}
        style=${this.computeStyles()}
        @click=${(t) => this.handlePopup(t)}
        artwork=${t.artwork}
        content=${this.player.content}>
        <div class='mmp__bg'>
          ${this.renderBackground()}
          ${this.renderArtwork()}
          ${this.renderGradient()}
        </div>
        <div class='mmp-player'>
          <div class='mmp-player__core flex' ?inactive=${this.player.idle}>
            ${this.renderIcon()}
            <div class='entity__info'>
              ${this.renderEntityName()}
              ${this.renderMediaInfo()}
            </div>
            <mmp-powerstrip
              @toggleGroupList=${this.toggleGroupList}
              .hass=${this.hass}
              .player=${this.player}
              .config=${t}
              .groupVisible=${this.edit}
              .idle=${this.idle}
              ?flow=${t.flow}>
            </mmp-powerstrip>
          </div>
          <div class='mmp-player__adds'>
            ${
              !t.collapse && this.player.active
                ? D`
              <mmp-media-controls
                .player=${this.player}
                .config=${t}
                .break=${this.break}>
              </mmp-media-controls>
            `
                : ""
            }
            <mmp-shortcuts
              .player=${this.player}
              .hass=${this.hass}
              .shortcuts=${t.shortcuts}>
            </mmp-shortcuts>
            ${
              t.tts
                ? D`
              <mmp-tts
                .config=${t.tts}
                .hass=${this.hass}
                .player=${this.player}>
              </mmp-tts>
            `
                : ""
            }
            <mmp-group-list
              .hass=${this.hass}
              .visible=${this.edit}
              .entities=${t.speaker_group.entities}
              .player=${this.player}>
            </mmp-group-list>
          </div>
        </div>
        <div class='mmp__container'>
          ${
            this.player.active && this.player.hasProgress
              ? D`
            <mmp-progress
              .player=${this.player}
              .showTime=${!this.config.hide.runtime}>
            </mmp-progress>
          `
              : ""
          }
        </div>
      </ha-card>
    `
            );
          }
          computeClasses({ config: t } = this) {
            return it({
              "--responsive": this.break || t.hide.icon,
              "--initial": this.initial,
              "--bg": t.background,
              "--group": t.group,
              "--more-info": "none" !== t.tap_action,
              "--has-artwork": this.player.hasArtwork && this.thumbnail,
              "--flow": t.flow,
              "--collapse": t.collapse,
              "--rtl": this.rtl,
              "--progress": this.player.hasProgress,
              "--runtime": !t.hide.runtime && this.player.hasProgress,
              "--inactive": !this.player.isActive,
            });
          }
          renderArtwork() {
            if (!this.thumbnail || "default" === this.config.artwork) return;
            const t = {
                backgroundImage: this.thumbnail,
                backgroundColor: this.backgroundColor || "",
                width:
                  "material" === this.config.artwork && this.player.isActive
                    ? this.cardHeight + "px"
                    : "100%",
              },
              e = {
                backgroundImage: this.prevThumbnail,
                width:
                  "material" === this.config.artwork
                    ? this.cardHeight + "px"
                    : "",
              };
            return D`
      <div class='cover' style=${st(t)}></div>
      ${
        this.prevThumbnail &&
        D`
        <div class='cover --prev' style=${st(e)}></div>
      `
      }`;
          }
          renderGradient() {
            if ("material" !== this.config.artwork) return;
            const t = {
              backgroundImage: `linear-gradient(to left,\n        transparent 0,\n        ${this.backgroundColor} ${this.cardHeight}px,\n        ${this.backgroundColor} 100%)`,
            };
            return D`<div class="cover-gradient" style=${st(t)}></div>`;
          }
          renderBackground() {
            if (this.config.background)
              return D`
      <div class="cover --bg" style=${st({
        backgroundImage: `url(${this.config.background})`,
      })}></div>
    `;
          }
          handlePopup(t) {
            t.stopPropagation(),
              ((t, e, r, n, i) => {
                let o;
                switch (n.action) {
                  case "more-info":
                    (o = new Event("hass-more-info", { composed: !0 })),
                      (o.detail = { entityId: n.entity || i }),
                      t.dispatchEvent(o);
                    break;
                  case "navigate":
                    if (!n.navigation_path) return;
                    window.history.pushState(null, "", n.navigation_path),
                      (o = new Event("location-changed", { composed: !0 })),
                      (o.detail = { replace: !1 }),
                      window.dispatchEvent(o);
                    break;
                  case "call-service": {
                    if (!n.service) return;
                    const [t, r] = n.service.split(".", 2),
                      i = { ...n.service_data };
                    e.callService(t, r, i);
                    break;
                  }
                  case "url":
                    if (!n.url) return;
                    n.new_tab
                      ? window.open(n.url, "_blank")
                      : (window.location.href = n.url);
                }
              })(
                this,
                this._hass,
                this.config,
                this.config.tap_action,
                this.player.id
              );
          }
          renderIcon() {
            if (this.config.hide.icon) return;
            if (
              this.player.active &&
              this.thumbnail &&
              "default" === this.config.artwork
            )
              return D`
        <div class='entity__artwork'
          style='background-image: ${this.thumbnail};'
          ?border=${!this.config.hide.artwork_border}
          state=${this.player.state}>
        </div>`;
            const t = !this.config.hide.icon_state && this.player.isActive;
            return D`
      <div class='entity__icon' ?color=${t}>
        <ha-icon .icon=${this.computeIcon()}></ha-icon>
      </div>`;
          }
          renderEntityName() {
            if (!this.config.hide.name)
              return D`
      <div class='entity__info__name'>
        ${this.name} ${this.speakerCount()}
      </div>`;
          }
          renderMediaInfo() {
            if (this.config.hide.info) return;
            const t = this.player.mediaInfo;
            return D`
      <div class='entity__info__media'
        ?short=${"short" === this.config.info || !this.player.active}
        ?short-scroll=${"scroll" === this.config.info}
        ?scroll=${this.overflow}
        style='animation-duration: ${this.overflow}s;'>
        ${
          "scroll" === this.config.info
            ? D`
          <div>
            <div class='marquee'>
              ${t.map(
                (t) =>
                  D`<span class=${"attr__" + t.attr}>${
                    t.prefix + t.text
                  }</span>`
              )}
            </div>
          </div>`
            : ""
        }
        ${t.map(
          (t) => D`<span class=${"attr__" + t.attr}>${t.prefix + t.text}</span>`
        )}
      </div>`;
          }
          speakerCount() {
            if (this.config.speaker_group.show_group_count) {
              const t = this.player.groupCount;
              return t > 1 ? " +" + (t - 1) : "";
            }
          }
          computeStyles() {
            const { scale: t } = this.config;
            return st({
              ...(this.foregroundColor &&
                this.player.isActive && {
                  "--mmp-text-color": this.foregroundColor,
                  "--mmp-icon-color": this.foregroundColor,
                  "--mmp-icon-active-color": this.foregroundColor,
                  "--mmp-accent-color": this.foregroundColor,
                  "--paper-slider-container-color": this.foregroundColor,
                  "--secondary-text-color": this.foregroundColor,
                  "--mmp-media-cover-info-color": this.foregroundColor,
                }),
            });
          }
          async computeArtwork() {
            const { picture: t, hasArtwork: e } = this.player;
            if (e && t !== this.picture) {
              this.picture = t;
              try {
                const t = await this.player.fetchArtwork();
                this.thumbnail && (this.prevThumbnail = this.thumbnail),
                  (this.thumbnail = t);
              } catch (e) {
                this.thumbnail = `url(${t})`;
              }
            }
            return !(!e || !this.thumbnail);
          }
          computeIcon() {
            return this.config.icon ? this.config.icon : this.player.icon || lt;
          }
          measureCard() {
            const t = this.shadowRoot.querySelector("ha-card");
            t && (this.cardHeight = t.offsetHeight);
          }
          computeOverflow() {
            const t = this.shadowRoot.querySelector(".marquee");
            if (t) {
              const e = t.clientWidth > t.parentNode.clientWidth;
              this.overflow =
                !(!e || !this.player.active) && 7.5 + t.clientWidth / 50;
            }
          }
          computeRect(t) {
            const { left: e, width: r } =
              t.contentRect || t.getBoundingClientRect();
            this.break = r + 2 * e < 390;
          }
          computeRTL(t) {
            const e = t.language || "en";
            return (
              (t.translationMetadata.translations[e] &&
                t.translationMetadata.translations[e].isRTL) ||
              !1
            );
          }
          toggleGroupList() {
            this.edit = !this.edit;
          }
          updateIdleStatus() {
            this._idleTracker && clearTimeout(this._idleTracker);
            const t =
              (Date.now() - new Date(this.player.updatedAt).getTime()) / 1e3;
            this._idleTracker = setTimeout(() => {
              (this.idle = this.player.checkIdleAfter(
                this.config.idle_view.after
              )),
                (this.player.idle = this.idle),
                (this._idleTracker = null);
            }, 1e3 * (60 * this.config.idle_view.after - t));
          }
          getCardSize() {
            return this.config.collapse ? 1 : 2;
          }
          async setColors() {
            if (this.player.picture !== this.picture) {
              if (!this.player.picture)
                return (
                  (this.foregroundColor = ""), void (this.backgroundColor = "")
                );
              try {
                [this.foregroundColor, this.backgroundColor] = await ((t = this
                  .player.picture),
                new Et(t, { colorCount: 16, generator: It }).getPalette());
              } catch (t) {
                console.error("Error getting Image Colors", t),
                  (this.foregroundColor = ""),
                  (this.backgroundColor = "");
              }
              var t;
            }
          }
        }
      );
    },
  ]);
});
