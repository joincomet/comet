export default function () {
  var t, e, n
  return (function () {
    function t(e, n, i) {
      function s(r, a) {
        if (!n[r]) {
          if (!e[r]) {
            var u = 'function' == typeof require && require
            if (!a && u) return u(r, !0)
            if (o) return o(r, !0)
            var l = new Error("Cannot find module '" + r + "'")
            throw ((l.code = 'MODULE_NOT_FOUND'), l)
          }
          var f = (n[r] = { exports: {} })
          e[r][0].call(
            f.exports,
            function (t) {
              var n = e[r][1][t]
              return s(n || t)
            },
            f,
            f.exports,
            t,
            e,
            n,
            i
          )
        }
        return n[r].exports
      }
      for (
        var o = 'function' == typeof require && require, r = 0;
        r < i.length;
        r++
      )
        s(i[r])
      return s
    }
    return t
  })()(
    {
      1: [
        function (t, e, n) {
          'use strict'
          var i = t('decouple')
          var s = t('emitter')
          var o
          var r = false
          var a = window.document
          var u = a.documentElement
          var l = window.navigator.msPointerEnabled
          var f = {
            start: l ? 'MSPointerDown' : 'touchstart',
            move: l ? 'MSPointerMove' : 'touchmove',
            end: l ? 'MSPointerUp' : 'touchend'
          }
          var h = (function t() {
            var e = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/
            var n = a.getElementsByTagName('script')[0].style
            for (var i in n) {
              if (e.test(i)) {
                return '-' + i.match(e)[0].toLowerCase() + '-'
              }
            }
            if ('WebkitOpacity' in n) {
              return '-webkit-'
            }
            if ('KhtmlOpacity' in n) {
              return '-khtml-'
            }
            return ''
          })()
          function c(t, e) {
            for (var n in e) {
              if (e[n]) {
                t[n] = e[n]
              }
            }
            return t
          }
          function p(t, e) {
            t.prototype = c(t.prototype || {}, e.prototype)
          }
          function d(t) {
            while (t.parentNode) {
              if (t.getAttribute('data-slideout-ignore') !== null) {
                return t
              }
              t = t.parentNode
            }
            return null
          }
          function _(t) {
            t = t || {}
            this._startOffsetX = 0
            this._startOffsetY = 0
            this._currentOffsetX = 0
            this._opening = false
            this._moved = false
            this._opened = false
            this._preventOpen = false
            this.panel = t.panel
            this.menu = t.menu
            this._touch = t.touch === undefined ? true : t.touch && true
            this._side = t.side || 'left'
            this._easing = t.fx || t.easing || 'ease'
            this._duration = parseInt(t.duration, 10) || 300
            this._tolerance = parseInt(t.tolerance, 10) || 70
            this._padding = this._translateTo = parseInt(t.padding, 10) || 256
            this._orientation = this._side === 'right' ? -1 : 1
            this._translateTo *= this._orientation
            if (!this.panel.classList.contains('slideout-panel')) {
              this.panel.classList.add('slideout-panel')
            }
            if (
              !this.panel.classList.contains('slideout-panel-' + this._side)
            ) {
              this.panel.classList.add('slideout-panel-' + this._side)
            }
            if (!this.menu.classList.contains('slideout-menu')) {
              this.menu.classList.add('slideout-menu')
            }
            if (!this.menu.classList.contains('slideout-menu-' + this._side)) {
              this.menu.classList.add('slideout-menu-' + this._side)
            }
            if (this._touch) {
              this._initTouchEvents()
            }
          }
          p(_, s)
          _.prototype.open = function () {
            var t = this
            this.emit('beforeopen')
            if (!u.classList.contains('slideout-open')) {
              u.classList.add('slideout-open')
            }
            this._setTransition()
            this._translateXTo(this._translateTo)
            this._opened = true
            setTimeout(function () {
              t.panel.style.transition = t.panel.style['-webkit-transition'] =
                ''
              t.emit('open')
            }, this._duration + 50)
            return this
          }
          _.prototype.close = function () {
            var t = this
            if (!this.isOpen() && !this._opening) {
              return this
            }
            this.emit('beforeclose')
            this._setTransition()
            this._translateXTo(0)
            this._opened = false
            setTimeout(function () {
              u.classList.remove('slideout-open')
              t.panel.style.transition = t.panel.style[
                '-webkit-transition'
              ] = t.panel.style[h + 'transform'] = t.panel.style.transform = ''
              t.emit('close')
            }, this._duration + 50)
            return this
          }
          _.prototype.toggle = function () {
            return this.isOpen() ? this.close() : this.open()
          }
          _.prototype.isOpen = function () {
            return this._opened
          }
          _.prototype._translateXTo = function (t) {
            this._currentOffsetX = t
            this.panel.style[h + 'transform'] = this.panel.style.transform =
              'translateX(' + t + 'px)'
            return this
          }
          _.prototype._setTransition = function () {
            this.panel.style[h + 'transition'] = this.panel.style.transition =
              h + 'transform ' + this._duration + 'ms ' + this._easing
            return this
          }
          _.prototype._initTouchEvents = function () {
            var t = this
            this._onScrollFn = i(a, 'scroll', function () {
              if (!t._moved) {
                clearTimeout(o)
                r = true
                o = setTimeout(function () {
                  r = false
                }, 250)
              }
            })
            this._preventMove = function (e) {
              if (t._moved) {
                e.preventDefault()
              }
            }
            a.addEventListener(f.move, this._preventMove)
            this._resetTouchFn = function (e) {
              if (typeof e.touches === 'undefined') {
                return
              }
              t._moved = false
              t._opening = false
              t._startOffsetX = e.touches[0].pageX
              t._startOffsetY = e.touches[0].clientY
              t._preventOpen =
                !t._touch ||
                (!t.isOpen() && t.menu.clientWidth !== 0) ||
                (!t.isOpen() && e.touches[0].clientX > screen.width * 0.33)
            }
            this.panel.addEventListener(f.start, this._resetTouchFn)
            this._onTouchCancelFn = function () {
              t._moved = false
              t._opening = false
            }
            this.panel.addEventListener('touchcancel', this._onTouchCancelFn)
            this._onTouchEndFn = function () {
              if (t._moved) {
                t.emit('translateend')
                t._opening && Math.abs(t._currentOffsetX) > t._tolerance
                  ? t.open()
                  : t.close()
              }
              t._moved = false
            }
            this.panel.addEventListener(f.end, this._onTouchEndFn)
            this._onTouchMoveFn = function (e) {
              if (
                r ||
                t._preventOpen ||
                typeof e.touches === 'undefined' ||
                d(e.target)
              ) {
                return
              }
              var n = e.touches[0].clientX - t._startOffsetX
              var i = e.touches[0].clientY - t._startOffsetY
              var s = Math.abs(i / n)
              var o = (t._currentOffsetX = n)
              if (Math.abs(o) > t._padding) {
                return
              }
              if (s < 0.1 && Math.abs(n) > 20) {
                t._opening = true
                var a = n * t._orientation
                if ((t._opened && a > 0) || (!t._opened && a < 0)) {
                  return
                }
                if (!t._moved) {
                  t.emit('translatestart')
                }
                if (a <= 0) {
                  o = n + t._padding * t._orientation
                  t._opening = false
                }
                if (!(t._moved && u.classList.contains('slideout-open'))) {
                  u.classList.add('slideout-open')
                }
                t.panel.style[h + 'transform'] = t.panel.style.transform =
                  'translateX(' + o + 'px)'
                t.emit('translate', o)
                t._moved = true
              }
            }
            this.panel.addEventListener(f.move, this._onTouchMoveFn)
            return this
          }
          _.prototype.enableTouch = function () {
            this._touch = true
            return this
          }
          _.prototype.disableTouch = function () {
            this._touch = false
            return this
          }
          _.prototype.destroy = function () {
            this.close()
            a.removeEventListener(f.move, this._preventMove)
            this.panel.removeEventListener(f.start, this._resetTouchFn)
            this.panel.removeEventListener('touchcancel', this._onTouchCancelFn)
            this.panel.removeEventListener(f.end, this._onTouchEndFn)
            this.panel.removeEventListener(f.move, this._onTouchMoveFn)
            a.removeEventListener('scroll', this._onScrollFn)
            this.open = this.close = function () {}
            return this
          }
          e.exports = _
        },
        { decouple: 2, emitter: 3 }
      ],
      2: [
        function (t, e, n) {
          'use strict'
          var i = (function () {
            return (
              window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              function (t) {
                window.setTimeout(t, 1e3 / 60)
              }
            )
          })()
          function s(t, e, n) {
            var s,
              o = false
            function r(t) {
              s = t
              a()
            }
            function a() {
              if (!o) {
                i(u)
                o = true
              }
            }
            function u() {
              n.call(t, s)
              o = false
            }
            t.addEventListener(e, r, false)
            return r
          }
          e.exports = s
        },
        {}
      ],
      3: [
        function (t, e, n) {
          'use strict'
          var i = function (t, e) {
            if (!(t instanceof e)) {
              throw new TypeError('Cannot call a class as a function')
            }
          }
          n.__esModule = true
          var s = (function () {
            function t() {
              i(this, t)
            }
            t.prototype.on = function t(e, n) {
              this._eventCollection = this._eventCollection || {}
              this._eventCollection[e] = this._eventCollection[e] || []
              this._eventCollection[e].push(n)
              return this
            }
            t.prototype.once = function t(e, n) {
              var i = this
              function s() {
                i.off(e, s)
                n.apply(this, arguments)
              }
              s.listener = n
              this.on(e, s)
              return this
            }
            t.prototype.off = function t(e, n) {
              var i = undefined
              if (!this._eventCollection || !(i = this._eventCollection[e])) {
                return this
              }
              i.forEach(function (t, e) {
                if (t === n || t.listener === n) {
                  i.splice(e, 1)
                }
              })
              if (i.length === 0) {
                delete this._eventCollection[e]
              }
              return this
            }
            t.prototype.emit = function t(e) {
              var n = this
              for (
                var i = arguments.length, s = Array(i > 1 ? i - 1 : 0), o = 1;
                o < i;
                o++
              ) {
                s[o - 1] = arguments[o]
              }
              var r = undefined
              if (!this._eventCollection || !(r = this._eventCollection[e])) {
                return this
              }
              r = r.slice(0)
              r.forEach(function (t) {
                return t.apply(n, s)
              })
              return this
            }
            return t
          })()
          n['default'] = s
          e.exports = n['default']
        },
        {}
      ]
    },
    {},
    [1]
  )(1)
}
