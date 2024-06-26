!(function (e, t, a) {
  "use strict";
  function n(e) {
    return e && "object" == typeof e && "default" in e ? e : { default: e };
  }
  function r(e) {
    if (e && e.__esModule) return e;
    var t = Object.create(null);
    return (
      e &&
        Object.keys(e).forEach(function (a) {
          if ("default" !== a) {
            var n = Object.getOwnPropertyDescriptor(e, a);
            Object.defineProperty(
              t,
              a,
              n.get
                ? n
                : {
                    enumerable: !0,
                    get: function () {
                      return e[a];
                    },
                  }
            );
          }
        }),
      (t.default = e),
      Object.freeze(t)
    );
  }
  const o = r(e),
    i = n(a),
    { onSetup: h, onInstantiate: c } = o;
  let l, s;
  c.push((e) => {
    l = e;
  }),
    h.push(() => {
      s = e.canvas;
    });
  const d = (e, t, a, n, r, o) => {
      let h;
      switch (r) {
        case 0:
          h = { x: e, y: t, width: a, height: 0 };
          break;
        case 1:
          h = { x: e, y: t, width: 0, height: n };
      }
      const c = i.default.lch(95, 120, o).rgb();
      return {
        bounds: h,
        targetBounds: { x: e, y: t, width: a, height: n },
        color: l.color(c[0], c[1], c[2]),
        alpha: 1,
        targetAlpha: 160,
        type: r,
      };
    },
    u = 0.05,
    g = (e) => {
      const { bounds: t, targetBounds: a, type: n } = e;
      if (
        ((t.x += u * (a.x - t.x)),
        (t.y += u * (a.y - t.y)),
        (t.width += u * (a.width - t.width)),
        (t.height += u * (a.height - t.height)),
        (e.alpha += u * (e.targetAlpha - e.alpha)),
        159 < e.alpha)
      ) {
        switch (n) {
          case 0:
            (a.y = t.y + t.height), (a.height = 0);
            break;
          case 1:
            (a.x = t.x + t.width), (a.width = 0);
        }
        e.targetAlpha = 0;
      }
      return 1 <= e.alpha;
    },
    p = (t) => {
      const { bounds: a, color: n, alpha: r } = t;
      l.fill(e.colorWithAlpha(n, r)), l.rect(a.x, a.y, a.width, a.height);
    };
  let f = [];
  const b = () => {
      l.frameCount % 200 == 1 &&
        (() => {
          const { topLeft: e, bottomRight: a } = s.logicalRegion,
            { width: n, height: r } = s.logicalSize,
            o = 0.1 * n,
            i = 0.2 * r,
            h = 1 * n,
            c = 0.7 * r,
            l = [],
            u = () => {
              let e = 0;
              for (
                let a = 0;
                a < 1e3 &&
                ((e = 10 * t.Random.Integer.value(100)), l.includes(e));
                a += 1
              );
              return l.push(e), e;
            };
          for (let n = 0; n < 4; n += 1) {
            const n = t.Random.Curved.between(t.Numeric.cube, o, h),
              i = r,
              c = t.Random.between(e.x, a.x - n),
              l = 0;
            f.push(d(c, l, n, i, 1, u()));
          }
          for (let r = 0; r < 3; r += 1) {
            const r = n,
              o = t.Random.Curved.between(t.Numeric.cube, i, c),
              h = 0,
              l = t.Random.between(e.y, a.y - o);
            f.push(d(h, l, r, o, 0, u()));
          }
        })(),
        (f = f.filter(g));
    },
    w = () => {
      l.blendMode(l.REPLACE),
        l.background(255),
        l.blendMode(l.MULTIPLY),
        f.forEach(p);
    },
    y = {
      keyTyped: () => {
        switch (l.key) {
          case "p":
            break;
            
          case "g":
            break;
           
        }
        return !1;
      },
      draw: () => {
        b(), s.drawScaled(w);
      },
    };
  e.startSketch({
    htmlElement: "Layers",
    logicalCanvasHeight: 1080,
    initialize: () => {
      l.noStroke();
    },
    windowResized: () => s.resizeIfNeeded(),
    onCanvasResized: () => {},
    p5Methods: y,
  });
})(p5ex, CreativeCodingCore, chroma);
