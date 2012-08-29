//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

DlTEXTS = {
        goToday : "Go Today",

        _date_monthNames : [ "January",
			     "February",
			     "March",
			     "April",
			     "May",
			     "June",
			     "July",
			     "August",
			     "September",
			     "October",
			     "November",
			     "December" ],

        _date_shortMonthNames : [ "Jan",
			          "Feb",
			          "Mar",
			          "Apr",
			          "May",
			          "Jun",
			          "Jul",
			          "Aug",
			          "Sep",
			          "Oct",
			          "Nov",
			          "Dec" ],

        _date_dayNames : [ "Sunday",
		           "Monday",
		           "Tuesday",
		           "Wednesday",
		           "Thursday",
		           "Friday",
		           "Saturday",
		           "Sunday" ],

        _date_shortDayNames : [ "Su",
			        "Mo",
			        "Tu",
			        "We",
			        "Th",
			        "Fr",
			        "Sa",
			        "Su" ],

        _date_firstDayOfWeek : 1    // 0 is Sunday
};

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require texts.js

// Force caching in IE.
try {
        document.execCommand("BackgroundImageCache", false, true);
} catch(e){};

var CE_CACHE = {
        HTML_ESCAPE_DIV  : document.createElement("div"),
        HTML_ESCAPE_TEXT : document.createTextNode(""),
        CONTAINER        : document.createElement("div")
};
CE_CACHE.HTML_ESCAPE_DIV.appendChild(CE_CACHE.HTML_ESCAPE_TEXT);

Array.$ = function(obj, start) {
        if (start == null)
                start = 0;
        var a, i, j;
        try {
                a = Array.prototype.slice.call(obj, start);
        } catch (ex) {
                a = new Array(obj.length - start);
                for (i = start, j = 0; i < obj.length; ++i, ++j)
                        a[j] = obj[i];
        }
        return a;
};

Object.merge = function(dest, src) {
        if (dest == null) dest = {};
        if (src) for (var i in src)
                dest[i] = src[i];
        return dest;
};

Object.merge(Object, {

        mergeDefined: function(dest, src) {
                for (var i in src)
                        if (typeof src[i] != "undefined")
                                dest[i] = src[i];
                return dest;
        },

        mergeUndefined: function(dest, src) {
                for (var i in src)
                        if (!(i in dest))
                                dest[i] = src[i];
                return dest;
        },

        remove: function(from, keys) {
                for (var i = keys.length; --i >= 0;)
                        delete from[keys[i]];
        },

        isEmpty: function(o) {
                for (var i in o)
                        return false;
                return true;
        },

        makeCopy: function(src) {
                var i, dest = {};
                for (i in src)
                        dest[i] = src[i];
                return dest;
        },

        makeDeepCopy: function(src) {
                if (src instanceof Array) {
                        var a = [], i = src.length;
                        while (--i >= 0)
                                a[i] = Object.makeDeepCopy(src[i]);
                        return a;
                }
                if (src === null)
                        return null;
                if (src instanceof Function) {
                        return src; // can't deep-copy those
                }
                if (src instanceof Date)
                        return new Date(src);
                if (src instanceof Object) {
                        var i, dest = {};
                        for (i in src)
                                dest[i] = Object.makeDeepCopy(src[i]);
                        return dest;
                }
                return src;
        },

        makeShortcuts: function(obj, props) {
                for (var i in props)
                        obj[i] = obj[props[i]];
        },

        foreach: function(hash, f, obj) {
                for (var i in hash) try {
                        f.call(obj, hash[i], i);
                } catch(ex) {
                        if (ex === $_BREAK) break;
                        if (ex === $_CONTINUE) continue;
                        if (ex instanceof $_RETURN) return ex.args;
                        throw ex;
                }
        },

        map: function(hash, f, obj) {
                var ret = [];
                for (var i in hash) if (hash.hasOwnProperty(i)) try {
                        ret.push(f.call(obj, hash[i], i));
                } catch(ex) {
                        if (ex === $_BREAK) break;
                        if (ex === $_CONTINUE) continue;
                        if (ex instanceof $_RETURN) return ex.args;
                        throw ex;
                }
                return ret;
        },

        // should be called in the context of an object instance
        curry2: function(f) {
                if (!(f instanceof Function))
                        f = this[f];
                return f.$A(this, Array.$(arguments, 1));
        },

        HOP: function(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
        },

        clear: function(obj) {
                for (var i in obj) if (Object.HOP(obj, i)) delete obj[i];
        }

});

/* -----[ Function extensions ]----- */

Object.merge(Function, {

        INHERITANCE : {},

        getInheritanceGraph : function() { return Function.INHERITANCE; },
        noop                : function(){},
        identity            : function(x) { return x; },
        returnTrue          : function() { return true; },
        returnFalse         : function() { return false; },
        returnThis          : function() { return this; },
        invoke              : function(x) { return x(); }

});

var $__JSOOP = new Function.noop;

Object.merge(Function.prototype, {

        $ : Function.prototype.closure = function(obj) {
                var args = Array.$(arguments, 1), f = this;
                if (obj == window.undefined)
                        return function() { return f.apply(this, args.concat(Array.$(arguments))) };
                else
                        return function() { return f.apply(obj, args.concat(Array.$(arguments))) };
        },

        $0 : function(obj) {
                var f = this, args = Array.$(arguments, 1);
                return function() { return f.apply(obj, args) };
        },

        inherits : function(base, thisName) {
                var p = (this.prototype = new base($__JSOOP));
                p.constructor = this;
                this.BASE = base.prototype;
                Function.INHERITANCE[this.name =
                                     this._objectType =
                                     p._objectType =
                                     thisName || Dynarch.getFunctionName(this)] = Dynarch.getFunctionName(base);
                return this.BASE;
        },

        setDefaults : function(obj, args, overwrite) {
                return Dynarch.setDefaults.call(obj, this.DEFAULT_ARGS, args, overwrite);
        },

        $$ : function(a) { return this.$.apply(this, a) },

        $A : function(obj, a) { return this.$.apply(this, [ obj ].concat(a)) },

        $C : function() {
                var args = Array.$(arguments), f = this;
                return function() { return f.apply(null, args.concat(Array.$(arguments))) };
        },

        inverse : function() {
                var f = this;
                return function() { return !f.apply(this, arguments); };
        },

        clearingTimeout : function(timeout, obj) {
                var id = null, handler = this, args = Array.$(arguments, 2), f = function() {
                        id && clearTimeout(id);
                        id = setTimeout(handler.$A(obj == null ? this : obj, args.concat(Array.$(arguments))), timeout);
                };
                f.cancel = function() { clearTimeout(id) };
                f.doItNow = function() { clearTimeout(id); handler.apply(obj, args.concat(Array.$(arguments))) };
                return f;
        },

        rarify : function(calls, timeout) {
                var
                        f       = this.$$(Array.$(arguments, 2)),
                        ft      = this.clearingTimeout.apply(this, Array.$(arguments, 1)),
                        i       = calls,
                        id      = null,
                        restart = function() { i = calls };
                return function() {
                        id && clearTimeout(id);
                        id = setTimeout(restart, timeout);
                        if (i-- > 0)
                                return f.apply(this, arguments);
                        return ft.apply(this, arguments);
                };
        },

        delayed : function(timeout) {
                var f = arguments.length > 1
                        ? this.$$(Array.$(arguments, 1))
                        : this;
                return setTimeout(f, timeout);
        },

        setInterval : function(timeout) {
                var f = arguments.length > 1
                        ? this.$$(Array.$(arguments, 1))
                        : this;
                setTimeout(f, 0); // call right away
                return setInterval(f, timeout);
        },

        inject : function(props) {
                if (props == null)
                        props = this.OBJECT_EXTENSIONS;
                Object.merge(this.prototype, props);
                return this;
        },

        memoize : function() {
                var f = this, val = $__JSOOP;
                return function() {
                        if (val === $__JSOOP)
                                val = f.apply(this, arguments);
                        return val;
                };
        }

});

/* -----[ Array extensions ]----- */

Object.merge(Array, {

        hashKeys: function(obj) {
                var a = [], i = 0, key;
                for (key in obj) if (obj.hasOwnProperty(key)) {
                        a[i++] = key;
                }
                return a;
        },

        hashValues: function(obj) {
                var a = [], i = 0, key;
                for (key in obj) if (obj.hasOwnProperty(key)) {
                        a[i++] = obj[key];
                }
                return a;
        }

});

// loop control functions

function $_YIELD(timeout) { this.timeout = timeout || 0; };
var $_BREAK = {};
var $_CONTINUE = {};
function $_RETURN(args) { this.args = args; };

function $YIELD(timeout) { throw new $_YIELD(timeout); };
function $BREAK() { throw $_BREAK; };
function $CONTINUE() { throw $_CONTINUE; };
function $RETURN(args) { throw new $_RETURN(args); };

Array.inject({

        map_hash: function(f, obj, h) {
                h || (h = {});
                this.foreach(f instanceof Function
                             ? function(el){
                                     h[el] = f.call(obj, el);
                             }
                             : function(el){
                                     h[el] = f[el];
                             });
                return h;
        },

        accumulate: function(f, val) {
                if (arguments.length < 2)
                        val = 0;
                for (var i = 0; i < this.length; ++i)
                        val = f(this[i], val, i);
                return val;
        },

        foreach: function(f, obj) {
                if (obj == null)
                        obj = this;
                var i = 0, l = this.length;
                while (l-- > 0) try {
                        f.call(obj, this[i], i++);
                } catch(ex) {
                        if (ex === $_BREAK) break;
                        if (ex === $_CONTINUE) continue;
                        if (ex instanceof $_RETURN) return ex.args;
                        throw ex;
                }
        },

        r_foreach: function(f, obj) {
                if (obj == null)
                        obj = this;
                for (var i = this.length; --i >= 0;) try {
                        f.call(obj, this[i], i);
                } catch(ex) {
                        if (ex === $_BREAK) break;
                        if (ex === $_CONTINUE) continue;
                        if (ex instanceof $_RETURN) return ex.args;
                        throw ex;
                }
        },

        assign_each: function(f, obj) {
                return this.foreach(function(el, i) {
                        this[i] = f.call(obj, i, el);
                });
        },

        r_assign_each: function(f, obj) {
                return this.r_foreach(function(el, i) {
                        this[i] = f.call(obj, i, el);
                });
        },

        toHash: function(val, obj) {
                var h = {};
                if (val instanceof Function) {
                        this.foreach(function(s, i) {
                                h[s] = val.call(obj, s, i);
                        });
                } else {
                        this.foreach(function(s, i) {
                                h[s] = val != null ? val : (i + 1);
                        });
                }
                return h;
        },

        toHash2: function() {
                var hash = {}, i = 0;
                while (i < this.length)
                        hash[this[i++]] = this[i++];
                return hash;
        },

        toHash3: function(key, obj) {
                var hash = {};
                if (key instanceof Function) {
                        this.foreach(function(el, i){
                                var a = key.call(obj != null ? obj : el, el, i);
                                hash[a[0]] = a[1];
                        });
                } else {
                        this.foreach(function(el){
                                hash[el[key]] = el;
                        });
                }
                return hash;
        },

        map: function(f, obj) {
                var i = 0, l = this.length, a = [], args, func;
                if (!(f instanceof Function)) {
                        args = Array.$(arguments, 1);
                        while (l-- > 0) {
                                obj = this[i];
                                func = obj[f];
                                a[i++] = (func instanceof Function)
                                        ? func.apply(obj, args)
                                        : func;
                        }
                } else {
                        if (obj == null)
                                obj = this;
                        while (l-- > 0) try {
                                a.push(f.call(obj, this[i], i++));
                        } catch(ex) {
                                if (ex === $_BREAK) break;
                                if (ex === $_CONTINUE) continue;
                                if (ex instanceof $_RETURN) {
                                        a.push(ex.args);
                                        break;
                                }
                                throw ex;
                        }
                }
                return a;
        },

        r_map: function(f, obj) {
                var i = this.length, a = [], func;
                if (!(f instanceof Function)) {
                        var args = Array.$(arguments, 1);
                        while (--i >= 0) {
                                obj = this[i];
                                func = obj[f];
                                a[i] = (func instanceof Function)
                                        ? func.apply(obj, args)
                                        : func;
                        }
                } else {
                        if (obj == null)
                                obj = this;
                        while (--i >= 0) try {
                                a.push(f.call(obj, this[i], i));
                        } catch(ex) {
                                if (ex === $_BREAK) break;
                                if (ex === $_CONTINUE) continue;
                                if (ex instanceof $_RETURN) {
                                        a.push(ex.args);
                                        break;
                                }
                                throw ex;
                        }
                }
                return a.reverse();
        },

        count: function(pred, obj) {
                var count = 0;
                this.r_foreach(function(el, index){
                        if (pred.call(this, el, index)) ++count;
                }, obj);
                return count;
        },

        keys_map: function(obj) {
                return this.map(function(key) {
                        return obj[key];
                });
        },

        grep: function(cond, obj) {
                var i = 0, l = this.length, a = [], el, args, func;
                if (cond instanceof RegExp) {
                        while (l-- > 0) {
                                el = this[i++];
                                cond.test(el) && a.push(el);
                        }
                } else if (cond instanceof Function) {
                        if (obj == null)
                                obj = this;
                        while (l-- > 0) {
                                el = this[i];
                                cond.call(obj, el, i++) && a.push(el);
                        }
                } else {
                        args = Array.$(arguments, 1);
                        while (l-- > 0) {
                                obj = this[i++];
                                func = obj[cond];
                                if (func instanceof Function) {
                                        func.apply(obj, args) && a.push(obj);
                                } else if (func) {
                                        a.push(obj);
                                }
                        }
                }
                return a;
        },

        grep_last: function(f, i) {
                if (i == null)
                        i = this.length - 1;
                while (i >= 0) {
                        var el = this[i--];
                        if (f(el))
                                return el;
                }
                return null;
        },

        grep_first: function(f, i) {
                for (i = i || 0; i < this.length; ++i) {
                        var el = this[i];
                        if (f(el))
                                return el;
                }
                return null;
        },

        contains: function(el) {
                for (var i = this.length; --i >= 0;)
                        if (this[i] === el)
                                return true;
                return false;
        },

        any: function(f, obj) {
                if (f instanceof Function) {
                        if (obj == null)
                                obj = this;
                        for (var i = this.length; --i >= 0;)
                                if (f.call(obj, this[i], i))
                                        return true;
                } else {
                        var args = Array.$(arguments, 1), func;
                        for (var i = this.length; --i >= 0;) {
                                obj = this[i];
                                func = obj[f];
                                if (func instanceof Function) {
                                        if (func.apply(obj, args))
                                                return true;
                                } else if (func) {
                                        return true;
                                }
                        }
                }
                return false;
        },

        find: function(el) {
                for (var i = this.length; --i >= 0;)
                        if (this[i] === el)
                                return i;
                return -1;
        },

        remove: function(el) {
                for (var i = this.length; --i >= 0;)
                        if (this[i] === el)
                                this.splice(i, 1);
                return this;
        },

        pushUnique: function(el) {
                if (this.find(el) < 0) {
                        this.push(el);
                        return this.length;
                }
                return null;
        },

        peek: function(x) {
                if (this.length > 0)
                        return this[this.length - 1 - (x != null ? Math.abs(x) : 0)];
        },

        min: function(f, obj) {
                if (this.length == 0)
                        return null;
                if (arguments.length > 0) {
                        var min = f != null
                                ? f.call(obj, this[0], 0)
                                : this[0];
                        for (var i = 1; i < this.length; ++i) {
                                min = Math.min(min, (f != null
                                                     ? f.call(obj, this[i], i)
                                                     : this[i]));
                        }
                        return min;
                }
                return Math.min.apply(Math, this);
        },

        minElement: function(f, obj, remove) {
                if (this.length == 0)
                        return null;
                var i = 0, minEl = this[0], minValue = f.call(obj, minEl), minIndex = 0, tmp;
                while (++i < this.length) if ((tmp = f.call(obj, this[i])) < minValue) {
                        minValue = tmp;
                        minIndex = i;
                        minEl = this[i];
                }
                if (remove)
                        this.splice(minIndex, 1);
                return minEl;
        },

        max: function(f, obj) {
                if (this.length == 0)
                        return null;
                if (arguments.length > 0) {
                        var max = f != null
                                ? f.call(obj, this[0], 0)
                                : this[0];
                        for (var i = 1; i < this.length; ++i) {
                                max = Math.max(max, (f != null
                                                     ? f.call(obj, this[i], i)
                                                     : this[i]));
                        }
                        return max;
                }
                return Math.max.apply(Math, this);
        },

        maxElement: function(f, obj, remove) {
                if (this.length == 0)
                        return null;
                var i = 0, maxEl = this[0], maxValue = f.call(obj, maxEl), maxIndex = 0, tmp;
                while (++i < this.length) if ((tmp = f.call(obj, this[i])) > maxValue) {
                        maxValue = tmp;
                        maxIndex = i;
                        maxEl = this[i];
                }
                if (remove)
                        this.splice(maxIndex, 1);
                return maxEl;
        },

        rotateIndex: function(idx) {
                return Math.rotateLimit(idx, 0, this.length - 1);
        },

        limitIndex: function(idx) {
                return Math.limit(idx, 0, this.length - 1);
        },

        nullLimitIndex: function(idx) {
                return Math.nullLimit(idx, 0, this.length - 1);
        },

        bytesToString: function() {
                var s = "", i = 0, c;
                while (i < this.length) {
                        c = this[i++];
                        if (!(c & 0xF0 ^ 0xF0)) {
                                // 4 bytes
                                c = ((c & 0x03) << 18) |
                                        ((this[i++] & 0x3F) << 12) |
                                        ((this[i++] & 0x3F) << 6) |
                                        (this[i++] & 0x3F);
                        } else if (!(c & 0xE0 ^ 0xE0)) {
                                // 3 bytes
                                c = ((c & 0x0F) << 12) |
                                        ((this[i++] & 0x3F) << 6) |
                                        (this[i++] & 0x3F);
                        } else if (!(c & 0xC0 ^ 0xC0)) {
                                // 2 bytes
                                c = ((c & 0x1F) << 6) |
                                        (this[i++] & 0x3F);
                        }
                        s += String.fromCharCode(c);
                }
                return s;
        },

        repeat: function(i) {
                if (i == 0)
                        return [];
                if (i == 1)
                        return this;
                var d = this.repeat(i >> 1);
                d = d.concat(d);
                if (i & 1)
                        d = d.concat(this);
                return d;
        },

        common_prefix: function() {
                switch (this.length) {
                    case 0:
                        return "";
                    case 1:
                        return this[0];
                    case 2:
                        var a = this[0],
                            b = this[1],
                            n = Math.min(a.length, b.length),
                            i = 0;
                        while (i < n && a.charAt(i) === b.charAt(i))
                                ++i;
                        return a.substring(0, i);
                    default:
                        return [ this[0], this.slice(1).common_prefix() ].common_prefix();
                }
        },

        append: function(a) {
                this.push.apply(this, a);
        },

        prepend: function(a) {
                this.unshift.apply(this, a);
        },

        toXML: function() {
                var tag = this[0];
                if (tag == "~literal") {
                        return this.slice(1).flatJoin();
                }
                var ret = "<" + tag, i = 1, next = this[1];
                if (typeof next == "object") {
                        Object.foreach(next, function(val, key){
                                if (key.charAt(0) == "$")
                                        key = key.substr(1);
                                ret += " " + key.htmlEscape() + '="';
                                if (typeof val == "object") {
                                        ret += Object.map(val, function(val, key){
                                                key = key.replace(/([a-z]?)([A-Z])/g, function(s, p1, p2){
                                                        return p1 + "-" + p2.toLowerCase();
                                                });
                                                return key.htmlEscape() + ": " + val.htmlEscape();
                                        }).join("; ");
                                } else {
                                        ret += val.htmlEscape();
                                }
                                ret += '"';
                        });
                        ++i;
                }
                ret += ">";
                while (i < this.length) {
                        next = this[i++];
                        if (next instanceof Array) {
                                ret += next.toXML();
                        } else {
                                ret += String(next).htmlEscape();
                        }
                }
                return ret + "</" + tag + ">";
        },

        swap: function(i, j) {
                var tmp = this[i];
                this[i] = this[j];
                this[j] = tmp;
                return this;
        }

});

/* -----[ Number extensions ]----- */

Number.inject({

        map : function(start, stop) {
                return start + (stop - start) * this;
        },

        reduce : function(start, stop) {
                return (this - start) / (stop - start);
        },

        mapInt : function(start, stop) {
                return Math.round(this.map(start, stop));
        },

        reduceInt : function(start, stop) {
                return Math.round((this - start) / (stop - start));
        },

        bits1Array : function() {
                var n = this, a = [], v = 1, i = 0;
                while (n > 0) {
                        if (n & 1)
                                a[i++] = v;
                        v = v << 1;
                        n = n >> 1;
                }
                return a;
        },

        times : function(f, obj) {
                var i = this, j = 0;
                while (--i >= 0)
                        f.call(obj, j++, i);
        },

        hex : function(width) {
                var n = this.toString(16).toUpperCase();
                if (width)
                        while (n.length < width)
                                n = "0" + n;
                return n;
        },

        zeroPad : function(width, zero) {
                var s = "" + Math.round(this);
                if (zero == null)
                        zero = "0";
                while (s.length < width)
                        s = zero + s;
                return s;
        },

        formatTime : function() {
                var s = this, h, m;
                m = s / 60; s %= 60;
                h = m / 60; m %= 60;
                return [h, m, s].map("zeroPad", 2).join(":");
        },

        toDate : function(hh, mm, ss, ms) {
                return Date.intToDate(this, hh, mm, ss, ms);
        },

        limit : function(min, max) {
                return Math.limit(this, min, max);
        },

        rotateLimit : function(min, max) {
                return Math.rotateLimit(this, min, max);
        },

        nullLimit : function(min, max) {
                return Math.nullLimit(this, min, max);
        },

        i18n : function(format) {
                var n = this;
                if (arguments.length > 1) {
                        format = Array.$(arguments);
                } else {
                        format = format.trim().split(/\s*\|\s*/);
                }
                format = n < format.length ? format[n] : format[format.length - 1];
                return format.replace(/##?/g, function(s){
			return s.length == 2 ? "#" : n;
		});
        }

});

/* -----[ Math extensions ]----- */

Object.merge(Math, {

        nullLimit : function(n, min, max) {
                if (n < min)
                        n = null;
                if (n > max)
                        n = null;
                return n;
        },

        limit : function(n, min, max) {
                if (n < min)
                        n = min;
                if (n > max)
                        n = max;
                return n + 0;
        },

        rotateLimit : function(n, min, max) {
                max++;
                n = n % (max - min);
                if (n < 0)
                        n = max + n;
                else if (n < min)
                        n = min - n;
                return n + 0;
        }

});

/* -----[ Date extensions ]----- */

Object.merge(Date, {

        _MD     : [ 31,28,31,30,31,30,31,31,30,31,30,31 ],
        SECOND  : 1000,
        MINUTE  : 60 * 1000,
        HOUR    : 60 * 60 * 1000,
        DAY     : 24 * 60 * 60 * 1000,
        WEEK    :  7 * 24 * 60 * 60 * 1000,

        // see texts.js
        _MN : DlTEXTS._date_monthNames,
        _SMN : DlTEXTS._date_shortMonthNames,
        _DN : DlTEXTS._date_dayNames,
        _SDN : DlTEXTS._date_shortDayNames,
        _FDOW : DlTEXTS._date_firstDayOfWeek,

        isWeekend : function(day) {
                return day == 0 || day == 6;
        },

        parseMySQL : function(str, gmt) {
                var a = str.split(/\s+/), d = a[0].split(/-/), t = a[1].split(/:/), date;
                date = new Date(d[0], d[1] - 1, d[2], t[0] || null, t[1] || null, t[2] || null);
                if (gmt) {
                        date.setUTCMilliseconds(0);
                        date.setUTCSeconds(t[2] || 0);
                        date.setUTCMinutes(t[1] || 0);
                        date.setUTCHours(t[0] || 0);
                        date.setUTCDate(1);
                        date.setUTCMonth(d[1] - 1);
                        date.setUTCDate(d[2]);
                        date.setUTCFullYear(d[0]);
                }
                return date;
        },

        dateToInt : function(date) {
                if (date instanceof Date)
                        return 10000 * date.getFullYear() + 100 * (date.getMonth() + 1) + date.getDate();
                if (typeof date == "string")
                        return parseInt(date, 10);
                return date;
        },

        intToDate : function(date, hh, mm, ss, ms) {
                if (!(date instanceof Date)) {
                        date = parseInt(date, 10);
                        var y = Math.floor(date / 10000);
                        date = date % 10000;
                        var m = Math.floor(date / 100);
                        date = date % 100;
                        date = new Date(y, m - 1, date, hh || 12, mm || 0, ss || 0, ms || 0);
                }
                return date;
        },

        getMonthName : function(mon, sh) {
                var a = sh ? Date._SMN : Date._MN;
                return a[mon % 12];
        },

        getFirstDayOfWeek : function() {
                return Date._FDOW;
        },

        getDayName : function(day, sh) {
                var a = sh ? Date._SDN : Date._DN;
                return a[day % 7];
        }

});

if (!Date.now) {
        Date.now = function() {
                return new Date().getTime();
        };
}

Date.inject({

        toInt : function() {
                return Date.dateToInt(this);
        },

        getMonthDays : function(m) {
                var y = this.getFullYear();
                if (m == null)
                        m = this.getMonth();
                return (((0 == (y%4)) && ( (0 != (y%100)) || (0 == (y%400)))) && m == 1) ? 29 : Date._MD[m];
        },

        getDayOfYear : function() {
                var now = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
                var then = new Date(this.getFullYear(), 0, 0, 0, 0, 0);
                var time = now - then;
                return Math.floor(time / Date.DAY);
        },

        getWeekNumber : function() {
                var d = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
                var DoW = d.getDay();
                d.setDate(d.getDate() - (DoW + 6) % 7 + 3); // Nearest Thu
                var ms = d.valueOf(); // GMT
                d.setMonth(0);
                d.setDate(4); // Thu in Week 1
                return Math.round((ms - d.valueOf()) / (7 * 864e5)) + 1;
        },

        dateEqualsTo : function(date, monthOnly) {
                return this.getFullYear() == date.getFullYear()
                        && this.getMonth() == date.getMonth()
                        && (monthOnly || this.getDate() == date.getDate());
        },

        print : function (str) {
                var m = this.getMonth();
                var d = this.getDate();
                var y = this.getFullYear();
                var wn = this.getWeekNumber();
                var w = this.getDay();
                var s = {};
                var hr = this.getHours();
                var pm = (hr >= 12);
                var ir = (pm) ? (hr - 12) : hr;
                var dy = this.getDayOfYear();
                if (ir == 0)
                        ir = 12;
                var min = this.getMinutes();
                var sec = this.getSeconds();
                s["%a"] = Date.getDayName(w, true); // abbreviated weekday name [FIXME: I18N]
                s["%A"] = Date.getDayName(w); // full weekday name
                s["%b"] = Date.getMonthName(m, true); // abbreviated month name [FIXME: I18N]
                s["%B"] = Date.getMonthName(m); // full month name
                // FIXME: %c : preferred date and time representation for the current locale
                s["%C"] = 1 + Math.floor(y / 100); // the century number
                s["%d"] = (d < 10) ? ("0" + d) : d; // the day of the month (range 01 to 31)
                s["%e"] = d; // the day of the month (range 1 to 31)
                // FIXME: %D : american date style: %m/%d/%y
                // FIXME: %E, %F, %G, %g, %h (man strftime)
                s["%H"] = (hr < 10) ? ("0" + hr) : hr; // hour, range 00 to 23 (24h format)
                s["%I"] = (ir < 10) ? ("0" + ir) : ir; // hour, range 01 to 12 (12h format)
                s["%j"] = (dy < 100) ? ((dy < 10) ? ("00" + dy) : ("0" + dy)) : dy; // day of the year (range 001 to 366)
                s["%k"] = hr;           // hour, range 0 to 23 (24h format)
                s["%l"] = ir;           // hour, range 1 to 12 (12h format)
                s["%m"] = (m < 9) ? ("0" + (1+m)) : (1+m); // month, range 01 to 12
                s["%M"] = (min < 10) ? ("0" + min) : min; // minute, range 00 to 59
                s["%n"] = "\n";         // a newline character
                s["%p"] = pm ? "PM" : "AM";
                s["%P"] = pm ? "pm" : "am";
                // FIXME: %r : the time in am/pm notation %I:%M:%S %p
                // FIXME: %R : the time in 24-hour notation %H:%M
                s["%s"] = Math.floor(this.getTime() / 1000);
                s["%S"] = (sec < 10) ? ("0" + sec) : sec; // seconds, range 00 to 59
                s["%t"] = "\t";         // a tab character
                // FIXME: %T : the time in 24-hour notation (%H:%M:%S)
                s["%U"] = s["%W"] = s["%V"] = (wn < 10) ? ("0" + wn) : wn;
                s["%u"] = w + 1;        // the day of the week (range 1 to 7, 1 = MON)
                s["%w"] = w;            // the day of the week (range 0 to 6, 0 = SUN)
                // FIXME: %x : preferred date representation for the current locale without the time
                // FIXME: %X : preferred time representation for the current locale without the date
                s["%y"] = ('' + y).substr(2, 2); // year without the century (range 00 to 99)
                s["%Y"] = y;            // year with the century
                s["%%"] = "%";          // a literal '%' character

                var re = /%./g;
                return str.replace(re, function (par) { return s[par] || par; });

                var a = str.match(re);
                for (var i = 0; i < a.length; i++) {
                        var tmp = s[a[i]];
                        if (tmp) {
                                re = new RegExp(a[i], 'g');
                                str = str.replace(re, tmp);
                        }
                }

                return str;
        }

});

/* -----[ String extensions ]----- */

String.inject({

        breakable : function(re) {
                if (!re)
                        re = /([_.-])/g;
                return this.replace(re, "$1<span class='BreakPoint'> </span>");
        },

        printf : function() {
                var a = Array.$(arguments), i = 0;
                return this.replace(/%[sdfo%]/g, function(s) {
                        s = s.charAt(1);
                        var v = a[i++];
                        switch (s) {
                            case "s": return v.toString();
                            case "d": return parseInt(v);
                            case "f": return parseFloat(v).toFixed(3);
                            case "o": return v; // not quite as useful as in Firebug console...
                            case "%": return "%";
                        }
                        return "undefined";
                });
        },

        fixedWidth : function(w) {
                return String.buffer("<div style='width:", w, "'>", this, "</div>").get();
        },

        noWrap : function() {
                return this.replace(/\x20/g, "&nbsp;");
        },

        lastIndexOfRegexp : function(re, caret) {
                var m, pos = 0;
                re.lastIndex = 0;
                re.global = true;
                while ((m = re.exec(this))) {
                        if (re.lastIndex >= caret)
                                break;
                        pos = re.lastIndex;
                }
                return pos;
        },

        hashWords : function(val) {
                return this.trim().split(/\s+/).toHash(arguments.length > 0 ?
                                                       val : true);
        },

        arrayWords : function() {
                return this.trim().split(/\s+/);
        },

        trim : function(nostart, noend) {
                var str = nostart ? this : this.replace(/^\s+/, "");
                if (!noend)
                        str = str.replace(/\s+$/, "");
                return str;
        },

        htmlEscapeFull : function() {
                return this.replace(/&/g, "&amp;")
                        .replace(/\x22/g, "&quot;")
                        .replace(/\x27/g, "&#x27;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/\u00A0/g, "&#xa0;");
        },

        decodeJSON : function(safe) {
                return DlJSON.decode(this, safe);
        },

        makeLabel : function() {
                return this.replace(/\s+/g, "&nbsp;");
        },

        capitalizeString : function() {
                return this.charAt(0).toUpperCase() + this.substr(1);
        },

        htmlEmbed : function(tag, c) {
                var a = [ "<", tag ];
                if (c != null)
                        a.push(" class='", c, "'");
                a.push(">", this, "</", tag, ">");
                return a.join("");
        },

        repeat : function(i) {
                if (i == 0)
                        return "";
                if (i == 1)
                        return "" + this;
                var d = this.repeat(i >> 1);
                d += d;
                if (i & 1)
                        d += this;
                return d;
        },

        hexToBytes : function(unsafe) {
                var a = [], i = 0, s = this;
                if (unsafe)
                        s = s.replace(/[^0-9a-f]/ig, "");
                if (s.length & 1)
                        s = "0" + s;
                while (i < s.length) {
                        a.push(parseInt(s.substr(i, 2), 16));
                        i++; i++;
                }
                return a;
        },

        toBytes : function() {
                var i = this.length, j = 0, k = 0, c, a = [];
                while (--i >= 0) {
                        c = this.charCodeAt(k++);
                        // unicode support
                        if (c < 0x80) {
                                // one byte - ASCII
                                a[j++] = c;
                        } else if (c < 0x800) {
                                // two bytes
                                a[j++] = 0xC0 | ((c >>> 6) & 0x1F);
                                a[j++] = 0x80 | (c & 0x3F);
                        } else if (c < 0x10000) {
                                // three bytes
                                a[j++] = 0xE0 | ((c >>> 12) & 0x0F);
                                a[j++] = 0x80 | ((c >>> 6) & 0x3F);
                                a[j++] = 0x80 | (c & 0x3F);
                        } else if (c < 0x110000) {
                                // four bytes
                                a[j++] = 0xF0 | ((c >>> 18) & 0x03);
                                a[j++] = 0x80 | ((c >>> 12) & 0x3F);
                                a[j++] = 0x80 | ((c >>> 6) & 0x3F);
                                a[j++] = 0x80 | (c & 0x3F);
                        }
                }
                return a;
        }

});

(function() {
        var UA = navigator.userAgent;
        is_opera = /opera/i.test(UA);
        is_ie = /msie/i.test(UA) && !is_opera && !(/mac_powerpc/i.test(UA));
        is_ie5 = is_ie && /msie 5\.[^5]/i.test(UA);
        is_ie6 = is_ie && /msie 6/i.test(UA);
        is_ie7 = is_ie && /msie 7/i.test(UA);
        is_ie8 = is_ie && /msie 8/i.test(UA);
        ie_box_model = is_ie && document.compatMode && document.compatMode == "BackCompat";
        is_mac_ie = /msie.*mac/i.test(UA);
        is_khtml = /Konqueror|Safari|KHTML/i.test(UA);
        is_safari = /Safari/i.test(UA);
        is_safari3 = is_safari && /Version\/3/i.test(UA);
        is_konqueror = is_khtml && !is_safari3;
        is_gecko = /gecko/i.test(UA) && !is_khtml && !is_opera && !is_ie;
        is_chrome = /Chrome/i.test(UA);
        // is_w3 = !is_ie || is_ie7; // FIXME: the part about IE7 is to be verified
        is_w3 = !is_ie;
        is_macintosh = /Macintosh/i.test(UA);

        if (is_gecko && /rv:\s*([0-9.]+)/.test(UA))
                gecko_version = parseFloat(RegExp.$1);

        var A = Array.prototype,
            D = Date.prototype,
            S = String.prototype,
            N = Number.prototype;

        // Array

        function makeComparator(cmp, reverse) {
                if (reverse) {
                        if (cmp instanceof Function) return function(el1, el2) { return cmp(el2, el1); };
                        else return function(el2, el1) { return (el1 < el2) ? -1 : ((el1 > el2) ? 1 : 0); };
                } else {
                        if (cmp instanceof Function) return cmp;
                        else return function(el1, el2) { return (el1 < el2) ? -1 : ((el1 > el2) ? 1 : 0); };
                }
        };

        A.mergeSort = function(cmp, reverse) {
                if (this.length < 2)
                        return Array.$(this);
                var _cmp = makeComparator(cmp, reverse);
                function merge(a, b) {
                        var r = [], ai = 0, bi = 0, i = 0;
                        while (ai < a.length && bi < b.length) {
                                _cmp(a[ai], b[bi]) <= 0
                                        ? r[i++] = a[ai++]
                                        : r[i++] = b[bi++];
                        }
                        if (ai < a.length)
                                r.push.apply(r, a.slice(ai));
                        if (bi < b.length)
                                r.push.apply(r, b.slice(bi));
                        return r;
                };
                function _ms(a) {
                        if (a.length <= 1)
                                return a;
                        var m = Math.floor(a.length / 2), left = a.slice(0, m), right = a.slice(m);
                        left = _ms(left);
                        right = _ms(right);
                        return merge(left, right);
                };
                return _ms(this);
        };

        A.qsort = function(cmp, reverse) {
                if (this.length < 2)
                        return;
                var _cmp = makeComparator(cmp, reverse), a = this, tmp, modified = false;
                function _qs(st, en) {
                        var j = st, k = en, sw = false;
                        if (j < k) {
                                do {
                                        if (_cmp(a[j], a[k]) > 0) {
                                                tmp = a[j];
                                                a[j] = a[k];
                                                a[k] = tmp;
                                                sw = !sw;
                                                modified = true;
                                        }
                                        sw ? --k : ++j;
                                } while (j < k);
                                _qs(st, j - 1);
                                _qs(j + 1, en);
                        }
                };
                _qs(0, this.length - 1);
                return modified;
        };

        A.x = A.repeat;

        A.flatJoin = function() {
                return $flatJoin(this);
        };

        A.flatten = function() {
                var ret = [];
                $flatten.call(ret, this);
                return ret;
        };

        function $flatten(obj) {
                if (obj instanceof Array) {
                        obj.foreach($flatten, this);
                }
                else if (obj instanceof Function) {
                        obj = obj();
                        if (obj != null && obj != false)
                                $flatten.call(this, obj);
                }
                else this.push(obj);
        };

        function $flatJoin(obj) {
                if (obj instanceof Array) {
                        return obj.accumulate(function(el, val) {
                                return val + $flatJoin(el);
                        }, "");
                } else if (obj instanceof Function) {
                        return $flatJoin(obj());
                } else if (obj === false || obj == null) {
                        return "";
                }
                return String(obj);
        };

        // Numberr

        var $1K = N.$1K = 1024
        , $1M = N.$1M = $1K * 1024
        , $1G = N.$1G = $1M * 1024
        , $1T = N.$1T = $1G * 1024;
        N.formatBytes = function(fixed) {
                var sz = this, spec, r;
                if (sz < $1K) {
                        spec = "B";
                } else if (sz < $1M) {
                        sz /= $1K;
                        spec = "K";
                } else if (sz < $1G) {
                        sz /= $1M;
                        spec = "M";
                } else if (sz < $1T) {
                        sz /= $1G;
                        spec = "G";
                }
                // spec = " " + spec;
                r = Math.round(sz);
                if (fixed && sz != r)
                        return sz.toFixed(fixed) + spec;
                else
                        return r + spec;
        };

        // Strings

        S.qw = S.arrayWords;

        S.bold = S.htmlEmbed.$(window.undefined, "b");

        S.x = S.repeat;

})();

/* -----[ more string extensions ]----- */

Object.merge(String, {

        firstNonEmpty: function() {
                for (var i = 0; i < arguments.length; ++i) {
                        var s = arguments[i];
                        if (/\S/.test(s))
                                return s;
                }
        },

        template: function() {
                var format = String.buffer.apply(this, arguments).get();
                return function(props) {
                        return format.replace(/(.?)\$(\{.*?\}|[a-zA-Z0-9_]+)/g, function(s, p1, p2) {
                                if (p1.charAt(0) == "\\")
                                        return s.substr(1);
                                if (p2.charAt(0) == "{")
                                        p2 = p2.substr(1, p2.length - 2);
                                eval("p2 = props." + p2);
                                return p1 + p2;
                        });
                };
        },

        buffer: is_ie || is_khtml
                ? function() {
                        var a = [], idx = 0, f = function() {
                                for (var i = 0; i < arguments.length; ++i)
                                        a[idx++] = arguments[i];
                                return f;
                        };
                        f.get = function() {
                                a = [ a.join("") ];
                                idx = 1;
                                return a[0];
                        };
                        if (arguments.length > 0)
                                f.apply(this, arguments);
                        return f;
                } : function() {
                        var str = "", f = function() {
                                str = str.concat.apply(str, arguments);
                                return f;
                        };
                        if (arguments.length > 0)
                                f.apply(this, arguments);
                        f.get = function() { return str; };
                        return f;
                }

});

String.prototype.htmlEscape = is_gecko ? function() {
        return this.replace(/&/g, "&amp;")
        //      .replace(/\x22/g, "&quot;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/\u00A0/g, "&#xa0;");
} : function() {
        CE_CACHE.HTML_ESCAPE_TEXT.data = this;
        return CE_CACHE.HTML_ESCAPE_DIV.innerHTML;
};

window.Dynarch = {

        dblClickTimeout: 400,

        // Call this in the context of some object.  Sets the default
        // properties of "this" according to their description in
        // defaults.  Can throw an exception if invalid data was
        // passed.
        setDefaults : function(defaults, args, overwrite) {
                if (!args)
                        args = {};
                var i, val, def;
                for (i in defaults) {
                        if (overwrite || !(i in this)) {
                                def = defaults[i];
                                if (def instanceof Array) {
                                        if (def[0] != null) {
                                                val = def[0];
                                                if (val in args)
                                                        val = args[val];
                                                else
                                                        val = def[1];
                                        } else
                                                val = def[1];
                                } else
                                        val = def;
                                this[i] = val;
                        }
                }
        },

        __IDS : {},

        ID : function(namespace) {
                var ids = Dynarch.__IDS;
                if (namespace == null)
                        namespace = "generic";
                if (!(namespace in ids))
                        ids[namespace] = 0;
                return "dynarch-" + namespace + "-" + (++ids[namespace]);
        },

        getFunctionName : function(f) {
                if (f.name != null)
                        return f.name;
                else if (/function\s+(\$?[a-z0-9_]+)\(/i.test(f.toString()))
                        return RegExp.$1;
                return "UNKNOWN_FUNCTION";
        },

        // @deprecated
        EXPORT : function(name, imp) {
                var ret = String.buffer("var D=window.", name, "=", name, ",P=", name, ".prototype;");
                if (imp)
                        ret(DynarchDomUtils.importCommonVars());
                return ret.get();
        },

        getBaseURL : function() {
                var u = window.Dynarch_Base_Url;
                if (!u) {
                        var scripts = document.getElementsByTagName("script"), i = 0, s;
                        while ((s = scripts[i++]))
                                if (s.className == "DynarchLIB") {
                                        u = s.src;
                                        if (/^(.*)\x2fjs\x2f/.test(u)) {
                                                Dynarch_Base_Url = u = RegExp.$1;
                                                break;
                                        }
                                }
                }
                return u;
        },

        getFileURL : function(file) {
                return Dynarch.getBaseURL() + "/" + file;
        },

        firebugRunning : function() {
                return window.console && window.console.firebug;
        },

        evalClean : function(code) {
                if (Dynarch.firebugRunning()) {
                        return new Function("return (" + code + ");")();
                } else {
                        return eval("(" + code + ")");
                }
        }

};

window.DynarchDomUtils = {

        ID : Dynarch.ID,

        related : function(element, ev) {
                var related, type;
                if (is_ie) {
                        type = ev.type;
                        if (type == "mouseover")
                                related = ev.fromElement;
                        else if (type == "mouseout")
                                related = ev.toElement;
                } else
                        related = ev.relatedTarget;
                if (is_gecko && related) {
                        try {
                                // throws Permission Denied when the
                                // target is a <input> or <textarea>, see:
                                // https://bugzilla.mozilla.org/show_bug.cgi?id=101197
                                related.parentNode;
                        } catch(ex) {
                                // doesn't anyone fix these things?
                                try {
                                        related = ev.parentNode;
                                } catch(ex) {
                                        // AWWWWWWWWW!!!!
                                        related = ev.target;
                                }
                        }
                }
                try {
                        for (; related; related = related.parentNode)
                                if (related === element)
                                        return true;
                } catch(ex) {
                        // FirefoXXX.
                        return true;
                }
                return false;
        },

        getScrollbarSize : function(el) {
                return { x: el.offsetWidth - el.clientWidth, y : el.offsetHeight - el.clientHeight };
        },

        addEvent : function(el, evname, func) {
                if (typeof evname == "string") {
                        if (el.addEventListener) {
                                el.addEventListener(evname, func, false);
                        } else if (el.attachEvent) {
                                el.attachEvent("on" + evname, func);
                        } else {
                                el["on" + evname] = func;
                        }
                } else if (evname instanceof Array) {
                        DynarchDomUtils.addEvents(el, evname, func);
                } else {
                        // object
                        for (var i in evname)
                                DynarchDomUtils.addEvent(el, i, evname[i]);
                }
        },
        addEvents : function(el, evs, func) {
                for (var i = evs.length; --i >= 0;)
                        DynarchDomUtils.addEvent(el, evs[i], func);
        },
        removeEvent : function(el, evname, func) {
                if (typeof evname == "string") {
                        if (el.removeEventListener)
                                el.removeEventListener(evname, func, false);
                        else if (el.detachEvent)
                                el.detachEvent("on" + evname, func);
                        else
                                el["on" + evname] = "";
                } else if (evname instanceof Array) {
                        DynarchDomUtils.removeEvents(el, evname, func);
                } else {
                        // object
                        for (var i in evname)
                                DynarchDomUtils.removeEvent(el, i, evname[i]);
                }
        },
        removeEvents : function(el, evs, func) {
                for (var i = evs.length; --i >= 0;)
                        DynarchDomUtils.removeEvent(el, evs[i], func);
        },
        condEvent : function(cond) {
                cond = cond ? DynarchDomUtils.addEvent : DynarchDomUtils.removeEvent;
                return cond.apply(DynarchDomUtils, Array.$(arguments, 1));
        },
        condEvents : function(cond) {
                cond = cond ? DynarchDomUtils.addEvents : DynarchDomUtils.removeEvents;
                return cond.apply(DynarchDomUtils, Array.$(arguments, 1));
        },
        stopEvent : function(ev) {
                if (is_ie) {
                        ev.cancelBubble = true;
                        ev.returnValue = false;
                } else {
                        ev.preventDefault();
                        ev.stopPropagation();
                }
                return false;
        },

        addLoadHandler : function(el, handler) {
                if (is_ie) {
                        el.onreadystatechange = function() {
                                if (el.readyState == 4) {
                                        // _sometimes_ IE throws errors, so try{} it
                                        try {
                                                el.onreadystatechange = null;
                                        } catch(ex) {};
                                        handler();
                                }
                        };
                } else
                        DynarchDomUtils.addEvent(el, "load", handler);
        },

        callHandler : function(obj, method) {
                if (obj[method] instanceof Function)
                        return obj[method].call(obj);
                else if (typeof obj[method] == "string")
                        return Dynarch.evalClean(obj[method]);
        },
        setStyleProperty : function(el, prop, val) {
                switch (prop) {
                    case "float":
                        prop = "styleFloat";
                        break;
                default:
                        prop = prop.toLowerCase().replace(/-([a-z])/g, function(s, p1) {
                                return p1.toUpperCase();
                        });
                }
                el.style[prop] = val;
        },

        setOpacity : function(el, o) {
                if (o != null) {
                        if (o == "" && o != 0) {
                                is_ie
                                        ? el.style.filter = ""
                                        : el.style.opacity = "";
                        } else {
                                is_ie
                                        ? el.style.filter = "alpha(opacity=" + Math.round(o * 100) + ")"
                                        : el.style.opacity = o;
                        }
                        return o;
                } else {
                        if (!is_ie)
                                return parseFloat(el.style.opacity);
                        else
                                if (/alpha\(opacity=([0-9.])+\)/.test(el.style.opacity))
                                        return parseFloat(RegExp.$1);
                }
        },

        getClosestParentByTagName : function(el, tag) {
                tag = tag.toLowerCase();
                while (el && el.tagName && el.tagName.toLowerCase() != tag)
                        el = el.parentNode;
                return el;
        },

        isInside : function(el, parent) {
                try {
                        while (el) {
                                if (el === parent)
                                        return true;
                                el = el.parentNode;
                        }
                } catch(ex) {}
                return false;
        },

        getWindowSize : function() {
                if (is_gecko) {
                        if (document.documentElement.clientWidth)
                                return { x: document.documentElement.clientWidth, y: document.documentElement.clientHeight };
                        else
                                return { x: window.innerWidth, y: window.innerHeight };
                }
                if (is_opera)
                        return { x: window.innerWidth, y: window.innerHeight };
                if (is_ie) {
                        if (!document.compatMode || document.compatMode == "BackCompat")
                                return { x: document.body.clientWidth, y: document.body.clientHeight };
                        else
                                return { x: document.documentElement.clientWidth, y: document.documentElement.clientHeight };
                }
                // let's hope we never get to use this hack.
                var div = document.createElement("div"), s = div.style;
                s.position = "absolute";
                s.bottom = s.right = "0px";
                document.body.appendChild(div);
                s = { x: div.offsetLeft, y: div.offsetTop };
                document.body.removeChild(div);
                return s;
        },

        getPos : function (el) {
                if (el.getBoundingClientRect) {
                        var box = el.getBoundingClientRect();
                        return { x: box.left - document.documentElement.clientLeft,
                                 y: box.top - document.documentElement.clientTop };
                } else if (document.getBoxObjectFor) {
                        var box = el.ownerDocument.getBoxObjectFor(el);
                        var pos = { x: box.x, y: box.y };
                        // is this a bug or what?  we have to substract scroll values manually!
                        while (el.parentNode && el.parentNode !== document.body) {
                                el = el.parentNode;
                                pos.x -= el.scrollLeft;
                                pos.y -= el.scrollTop;
                        }
                        return pos;
                }
                // other browsers do the hard way
                if (/^body$/i.test(el.tagName))
                        return { x: 0, y: 0 };
                var
                SL = 0, ST = 0,
                is_div = /^div$/i.test(el.tagName),
                r, tmp;
                if (is_div && el.scrollLeft)
                        SL = el.scrollLeft;
                if (is_div && el.scrollTop)
                        ST = el.scrollTop;
                r = { x: el.offsetLeft - SL, y: el.offsetTop - ST };
                if (el.offsetParent) {
                        tmp = DynarchDomUtils.getPos(el.offsetParent);
                        r.x += tmp.x;
                        r.y += tmp.y;
                }
                return r;
        },

        getBRPos : function(el) {
                var pos = DynarchDomUtils.getPos(el), size = DynarchDomUtils.getOuterSize(el);
                pos.x += size.x - 1;
                pos.y += size.y - 1;
                return pos;
        },

        setPos : function(el, x, y) {
                if (typeof x == "number")
                        x += "px";
                if (typeof y == "number")
                        y += "px";
                if (x != null)
                        el.style.left = x;
                if (y != null)
                        el.style.top = y;
        },

        createElement : function(tag, st, at, par, pos) {
                var el = CE_CACHE[tag] || (CE_CACHE[tag] = document.createElement(tag)), i;
                el = el.cloneNode(false);
                if (st) for (i in st)
                        if (is_ie)
                                DynarchDomUtils.setStyleProperty(el, i, st[i]);
                else
                        el.style.setProperty(i, st[i], "");
                if (at) for (i in at)
                        // el.setAttribute(i, at[i]);
                        el[i] = at[i];
                if (par) {
                        if (typeof pos == "number")
                                pos = par.childNodes[pos];
                        if (!pos)
                                pos = null;
                        par.insertBefore(el, pos);
                }
                return el;
        },

        setUnselectable : function(el, unsel) {
                if (unsel == null)
                        unsel = true;
                if (!is_ie) {
                        unsel = unsel ? "none" : "normal";
                        el.style.MozUserSelect = unsel;
                        el.style.WebkitUserSelect = unsel;
                        el.style.userSelect = unsel;
                } else {
                        unsel = unsel ? "on" : "off";
                        var els = Array.$(el.getElementsByTagName("*"));
                        els.push(el);
                        els.foreach(function(el) { el.setAttribute("unselectable", unsel); });
                }
        },

        addClass : function(el, ac, dc) {
                DynarchDomUtils.delClass(el, dc, ac);
        },
        delClass : function(el, dc, ac) {
                if (el) {
                        var cls = el.className;
                        if (dc instanceof RegExp) {
                                cls = cls.replace(dc, " ");
                                dc = null;
                        }
                        if (ac || dc) {
                                var a = cls.split(/\s+/), i = a.length, r = {};
                                dc && (r[dc] = 1);
                                ac && (r[ac] = 1);
                                while (--i >= 0)
                                        if (a[i] in r)
                                                a.splice(i, 1);
                                ac && a.push(ac);
                                cls = a.join(" ");
                        }
                        el.className = cls;
                }
        },
        condClass : function(el, cond, clsTrue, clsFalse) {
                DynarchDomUtils[cond ? "addClass" : "delClass"]
                (el, clsTrue, clsFalse);
        },
        hasClass: function(el, cls) {
                return el.className.split(" ").contains(cls);
        },

        elementIsVisible: function(el) {
                //var s = DynarchDomUtils.getStyle;
                //return s(el, "display") != "none" && s(el, "visibility") != "hidden";
                return !!el.offsetWidth && el.style.visibility != "hidden";
        },

        ie_getBackgroundColor : function(el) {
                var r = document.body.createTextRange();
                r.moveToElementText(el);
                return "#" + parseInt(r.queryCommandValue("BackColor")).hex(6);
        },

        getStyle : function(el, prop) {
                var ret = null;
                if (window.getComputedStyle) {
                        // ret = document.defaultView.getComputedStyle(el, "").getPropertyCSSValue(prop).cssText;
                        ret = document.defaultView.getComputedStyle(el, "").getPropertyValue(prop);
                } else if (el.currentStyle) {
                        prop = prop.replace(/-[a-z]/g, function(s) {
                                return s.charAt(1).toUpperCase();
                        });
                        // exceptions
                        if (prop == "backgroundColor") {
                                ret = ie_getBackgroundColor(el);
                        } else {
                                ret = el.currentStyle[prop];
                        }
                }
                return ret;
        },

        getStylePX : function(el, prop) {
                var val = parseInt(DynarchDomUtils.getStyle(el, prop), 10);
                if (isNaN(val))
                        val = 0;
                return val;
        },

        getBorder : function(el) {
                return { x: el.offsetWidth - el.clientWidth, y: el.offsetHeight - el.clientHeight };
        },

        getPadding : function(el) {
                var dx, dy, getStyle = DynarchDomUtils.getStylePX;

                dx = getStyle(el, "padding-left") + getStyle(el, "padding-right");
                dy = getStyle(el, "padding-top") + getStyle(el, "padding-bottom");

                return { x: dx, y: dy };
        },

        getPaddingAndBorder : function(el) {
                var dx = 0, dy = 0, getStyle = DynarchDomUtils.getStylePX;

                dx += getStyle(el, "border-left-width");
                dx += getStyle(el, "border-right-width");
                dy += getStyle(el, "border-top-width");
                dy += getStyle(el, "border-bottom-width");

                dx += getStyle(el, "padding-left");
                dx += getStyle(el, "padding-right");
                dy += getStyle(el, "padding-top");
                dy += getStyle(el, "padding-bottom");

                return { x: dx, y: dy };
        },

        getSelectionRange : function(input) {
                var start, end;
                if (is_ie) {
                        var range, isCollapsed, b;

                        range = document.selection.createRange();
                        isCollapsed = range.compareEndPoints("StartToEnd", range) == 0;
                        if (!isCollapsed)
                                range.collapse(true);
                        b = range.getBookmark();
                        start = b.charCodeAt(2) - 2;

                        range = document.selection.createRange();
                        isCollapsed = range.compareEndPoints("StartToEnd", range) == 0;
                        if (!isCollapsed)
                                range.collapse(false);
                        b = range.getBookmark();
                        end = b.charCodeAt(2) - 2;
                } else {
                        start = input.selectionStart;
                        end = input.selectionEnd;
                }
                return { start: start, end: end };
        },

        setSelectionRange : function(input, start, end) {
                if (end == null)
                        end = start;
                if (start > end) {
                        var tmp = start;
                        start = end;
                        end = tmp;
                }
                if (typeof start == "object") {
                        end = start.end;
                        start = start.start;
                }
                if (is_ie) {
                        var range = input.createTextRange();
                        range.collapse(true);
                        range.moveStart("character", start);
                        range.moveEnd("character", end - start);
                        range.select();
                } else {
                        input.setSelectionRange(start, end);
                }
        },

        setOuterSize : function(el, x, y) {
                //var pb = DynarchDomUtils.getBorder(el);
                var pb = DynarchDomUtils.getPaddingAndBorder(el);
                if (x != null && pb.x != NaN)
                        x -= pb.x;
                if (y != null && pb.y != NaN)
                        y -= pb.y;
                DynarchDomUtils.setInnerSize(el, x, y);
        },

        setInnerSize : function(el, x, y) {
                try {
                        if (typeof x == "number" && x != NaN) x = Math.abs(x) + "px";
                        if (typeof y == "number" && y != NaN) y = Math.abs(y) + "px";
                        if (x != null && x != NaN && !(is_ie && x <= 0))
                                el.style.width = x;
                        if (y != null && y != NaN && !(is_ie && y <= 0))
                                el.style.height = y;
                } catch(ex) {};
        },

        getOuterSize : function(el) {
                return { x: el.offsetWidth, y: el.offsetHeight };
        },

        getInnerSize : function(el) {
                var s = DynarchDomUtils.getOuterSize(el);
                var pb = DynarchDomUtils.getPaddingAndBorder(el);
                s.x -= pb.x;
                s.y -= pb.y;
                // amazing, eh?
                return s;
        },

        // this includes the f'king padding :(
        //              getInnerSize : function(el) {
        //                      return { x: el.clientWidth, y: el.clientHeight };
        //              },

        // @deprecated
        importCommonVars : function() {
                return [ "var DOM=DynarchDomUtils",
                         "AC=DOM.addClass",
                         "DC=DOM.delClass",
                         "CC=DOM.condClass",
                         "CE=DOM.createElement",
                         "ID=Dynarch.ID"
                       ].join(",");
        },

        // looks like this is the proper way to dispose elements, at least in IE.
        // to be efficient, MAKE SURE YOU DON'T KEEP ANY REFERENCES TO THESE ELEMENTS!
        //
        // UPDATE: I think we should get rid of this now.  It only
        // slows down things in capable browsers, while I don't think
        // it makes a big difference in IE.
        //
        // trash : function(el) {
        //         var gc = CE_CACHE._trash;
        //         if (!gc) {
        //                 gc = CE_CACHE._trash = DynarchDomUtils.createElement(
        //                         "div",
        //                         { zIndex: -10000 },
        //                         { className: "DYNARCH-GARBAGE-COLLECTOR" },
        //                         document.body
        //                 );
        //         }
        //         if (el) {
        //                 gc.appendChild(el);
        //                 gc.innerHTML = "";
        //         }
        //         return gc;
        // },

        trash : function(el, p) {
                if (el && (p = el.parentNode))
                        p.removeChild(el);
        },

        strip : function(el) {
                var p = el.parentNode;
                while (el.firstChild)
                        p.insertBefore(el.firstChild, el);
                DynarchDomUtils.trash(el);
        },

        createFromHtml : function(html) {
                var div = CE_CACHE.CONTAINER;
                div.innerHTML = html;
                return div.firstChild;
        },

        swapNodes : function(n1, n2) {
                var n1p = n1.parentNode, n1n = n1.nextSibling;
                n2.parentNode.replaceChild(n1, n2);
                n1p.insertBefore(n2, n1n);
        },

        scrollIntoView : function(el) {
                var p = el.parentNode;

                // we must find the nearest parent that has a scrollbar
                while (p && ((p.scrollHeight == p.clientHeight && p.scrollWidth == p.clientWidth) || /table|tbody/i.test(p.tagName)))
                        p = p.parentNode;

                if (p && p !== document.body) { // NEVER scroll the body!
                        // build array of parents (whoa!)
                        var a = [], tmp = p;
                        while (tmp) {
                                a.push(tmp);
                                tmp = tmp.parentNode;
                        }

                        // find relative pos
                        var t = 0, l = 0;
                        tmp = el;
                        while (tmp && tmp != p) {
                                t += tmp.offsetTop;
                                l += tmp.offsetLeft;
                                tmp = tmp.offsetParent;
                                if (a.contains(tmp)) {
                                        if (tmp != p) {
                                                t -= p.offsetTop;
                                                l -= p.offsetLeft;
                                        }
                                        break;
                                }
                        }

                        // dlconsole.log("top: %d, left: %d, scroll: %o:%o", t, l, p.tagName, p.className);
                        // dlconsole.log("%d:%d %d:%d", p.scrollHeight, p.clientHeight, p.scrollWidth, p.clientWidth);

                            var b = t + el.offsetHeight, r = l + el.offsetWidth;

                        if (t < p.scrollTop)
                                p.scrollTop = t;
                        if (t > p.scrollTop && b > p.scrollTop + p.clientHeight)
                                p.scrollTop = b - p.clientHeight;

                        if (l < p.scrollLeft)
                                p.scrollLeft = l;
                        if (l > p.scrollLeft && r > p.scrollLeft + p.clientWidth)
                                p.scrollLeft = r - p.clientWidth;

                        // Dude! DOM sucks, I'm tellin' ya.
                }
        },

        flash : function(el, timeout, steps) {
                if (!steps)
                        steps = 3;
                var timer = setInterval(function() {
                        el.style.visibility = (steps & 1) ? "hidden" : "";
                        --steps;
                        if (steps < 0)
                                clearInterval(timer);
                }, timeout || 150);
        },

        walk: function(el, f) {
                if (!f(el))
                        for (var i = el.firstChild; i; i = i.nextSibling)
                                if (i.nodeType == 1)
                                        DynarchDomUtils.walk(i, f);
        },

        setDocumentTitle: function(title) {
                document.title = title;
        },

        setZoom: function(el, zoom) {
                zoom = "scale(" + zoom + ")";
                el = el.style;
                DynarchDomUtils.forAllStandards("transform", function(name){
                        el.setProperty(name, zoom, "");
                });
        },

        forAllStandards: function(name, func) {
                [ "-moz-", "-webkit-", "-o-", "-ms-", "" ].foreach(function(prefix){
                        func(prefix + name);
                });
        },

        CE_CACHE : CE_CACHE

};

var $ = is_gecko
        ? document.getElementById.$(document)
        : function(id) {
                return document.getElementById(id);
        };

function DEFINE_CLASS(name, base, definition, hidden) {
        D.name = name || "";
        if (hidden)
                D.hidden = true;
        if (base)
                D.inherits(base, name);
        function D(args) {
                if (args !== $__JSOOP) {
                        if (this === window)
                                return alert("FIXME: Constructor called without new in " + name);
                        var alist;
                        if (D.FIXARGS) {
                                if (arguments.length == 0) {
                                        args = {};
                                        alist = [ args ];
                                }
                                D.FIXARGS.apply(this, alist || arguments);
                        }
                        if (D.DEFAULT_ARGS)
                                D.setDefaults(this, args);
                        if (D.BEFORE_BASE)
                                D.BEFORE_BASE.apply(this, alist || arguments);
                        if (base)
                                base.apply(this, alist || arguments);
                        if (D.CONSTRUCT)
                                D.CONSTRUCT.apply(this, alist || arguments);
                }
        };
        if (name && !hidden)
                window[name] = D;
        var P = D.prototype;
        if (definition) {
                D.DEFINITION = definition;
                definition(D, P, DynarchDomUtils);
        }
        if (P.FINISH_OBJECT_DEF instanceof Function)
                P.FINISH_OBJECT_DEF();
        if (!P.$)
                P.$ = Object.curry2;
        return D;
};

function EXTEND_CLASS(ctor, definitions) {
        definitions(ctor, ctor.prototype, DynarchDomUtils);
};

function DEFINE_HIDDEN_CLASS(name, base, definition) {
        return DEFINE_CLASS.call(this, name, base, definition, true);
};

function DEFINE_SINGLETON(name, base, definition) {
        var D = DEFINE_HIDDEN_CLASS(name, base, definition);
        DlSingleton.register(name, D, true);
        return D;
};

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require jslib.js

DEFINE_CLASS("DlException", null, function(D, P) {

        D.CONSTRUCT = function(message, code) {
	        this.error = this.constructor.name;
	        if (!message)
		        message = "*** no error message given ***";
	        this.message = this.constructor.name + ": " + message;
	        if (code != null)
		        this.code = code;
        };

        P.toString = function() {
	        var str = this.message;
	        if (this.code)
		        str += " / code: " + this.code;
	        return str;
        };

}).stopEventBubbling = function() { throw new DlExStopEventBubbling; };

function DEFINE_EXCEPTION(className, base) {
        return DEFINE_CLASS(className, base || DlException);
};

DEFINE_EXCEPTION("DlExInvalidOperation");
DEFINE_EXCEPTION("DlExAbstractBaseClass");
DEFINE_EXCEPTION("DlExStopEventProcessing");
DEFINE_EXCEPTION("DlExStopFrameEvent");
DEFINE_EXCEPTION("DlExStopEventBubbling");
DEFINE_EXCEPTION("DlDataException");
DEFINE_EXCEPTION("DlSecurityException");

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require jslib.js
// @require exception.js

DEFINE_CLASS("DlEventProxy", null, function(D, P) {

        D.CONSTRUCT = function() {
                this.__eventHooks = {};
                this.__disHooks = {};
                this.registerEvents(this.DEFAULT_EVENTS);
                this.addEventListener("onDestroy", this.__onDestroy);
        };

        P.DEFAULT_EVENTS = [ "onDestroy" ];

        P.FINISH_OBJECT_DEF = function() {
                var moreEvents = this.constructor.DEFAULT_EVENTS;
                if (moreEvents)
                        this.DEFAULT_EVENTS = this.DEFAULT_EVENTS.concat(moreEvents);
        };

        // FIXME: not sure this is of any use to prevent leaks
        P.__onDestroy = function() {
                [ "__eventHooks", "__disHooks" ].foreach(function(hooks) {
                        for (var i in this[hooks]) {
                                var h = this[hooks][i];
                                if (h) {
                                        h.foreach(function(h, i) {
                                                this[i] = null;
                                        });
                                }
                                this[hooks][i] = null;
                        }
                        this[hooks] = null;
                }, this);
        };

        // private stuff
        P.__getEventHooks = function(ev, copy) {
                // FIXME (investigate): this could be bad.  When we
                // destroy widgets upon, say, an "onClick" event,
                // there might be events that still trigger *after*
                // the widget has been destroyed--such as onMouseUp;
                // this.__eventHooks will be null already, so we throw
                // StopEventBubbling here, which generally does The
                // Right Thing.
                if (!this.__eventHooks)
                        throw new DlExStopEventBubbling;
                var a = this.__eventHooks[ev.toLowerCase()];
                if (!a) return [];
                // if (!a)
                //         throw new DlException("Event [" + ev + "] not registered.");
                if (copy)
                        a = a.slice(0);
                return a;
        };

        function _connect_callback(w2, e2) {
                return w2.applyHooks(e2, Array.$(arguments, 2));
        };

        // public

        P.registerEvents = function(evs) {
                var h = this.__eventHooks, i = 0, e;
                while ((e = evs[i++])) {
                        e = e.toLowerCase();
                        if (!h[e])
                                h[e] = [];
                }
        };

        P.condEventListener = function(cond) {
                cond = cond ? this.addEventListener : this.removeEventListener;
                return cond.apply(this, Array.$(arguments, 1));
        };

        P.addEventListener = function(ev, handler, phase, object) {
                if (ev instanceof Array) {
                        var i = 0, e;
                        while ((e = ev[i++]))
                                this.addEventListener(e, handler, phase, object);
                } else if (typeof ev == "object") {
                        for (var i in ev)
                                this.addEventListener(i, ev[i], handler, phase);
                } else {
                        var a = this.__getEventHooks(ev);
                        a.remove(handler);
                        if (phase == null && ev.toLowerCase() == "ondestroy")
                                phase = true;
                        phase
                                ? a.unshift(handler)
                                : a.push(handler);
                        if (object)
                                object.addEventListener("onDestroy", this.removeEventListener.$(this, ev, handler));
                }
                return this;
        };

        P.listenOnce = function(ev, handler, times) {
                if (times == null)
                        times = 1;
                var f = function() {
                        if (--times == 0)
                                this.removeEventListener(ev, f);
                        handler.apply(this, arguments);
                };
                return this.addEventListener(ev, f);
        };

        P.connectEvents = function(e1, w2, e2) {
                if (typeof w2 == "string") {
                        e2 = w2;
                        w2 = this;
                } else if (!e2) {
                        e2 = e1;
                }
                if (e1 instanceof Array) {
                        for (var i = 0; i < e1.length; ++i)
                                this.connectEvents(e1[i], w2, e2[i]);
                } else {
                        this.addEventListener(e1, _connect_callback.$(null, w2, e2));
                }
                return this;
        };

        P.removeEventListener = function(ev, handler) {
                var i = 0, e;
                if (ev instanceof Array) {
                        while ((e = ev[i++]))
                                this.removeEventListener(e, handler);
                } else if (typeof ev == "object") {
                        for (i in ev)
                                this.removeEventListener(i, ev[i]);
                } else {
                        this.__getEventHooks(ev).remove(handler);
                }
                return this;
        };

        P.removeAllListeners = function(ev) {
                if (ev instanceof Array) {
                        ev.foreach(this.removeAllListeners, this);
                } else if (typeof ev == "object") {
                        for (var i in ev)
                                this.removeAllListeners(i);
                } else {
                        this.__getEventHooks(ev).length = 0;
                }
                return this;
        };

        P.disableHooks = function(ev) {
                if (ev instanceof Array)
                        ev.r_foreach(this.disableHooks, this);
                else {
                        ev = ev.toLowerCase();
                        this.__disHooks[ev] = this.__eventHooks[ev];
                        this.__eventHooks[ev] = [];
                }
                return this;
        };

        P.enableHooks = function(ev) {
                if (ev instanceof Array)
                        ev.r_foreach(this.enableHooks, this);
                else {
                        ev = ev.toLowerCase();
                        this.__eventHooks[ev] = this.__disHooks[ev];
                        this.__disHooks[ev] = null;
                }
                return this;
        };

        P.callHooks = function(ev) {
                var args = arguments.length > 1
                        ? Array.$(arguments, 1)
                        : [];
                return this.applyHooks(ev, args);
        };

        P.hasHooks = function(ev) {
                var a = this.__eventHooks[ev.toLowerCase()];
                return a && a.length > 0;
        };

        P.withHooks = function(args, cont) {
                this.addEventListener.apply(this, args);
                try {
                        return cont();
                } finally {
                        this.removeEventListener.apply(this, args);
                }
        };

        P.withDisabledHooks = function(args, cont) {
                this.disableHooks.apply(this, args);
                try {
                        return cont();
                } finally {
                        this.enableHooks.apply(this, args);
                }
        };

        P.applyHooks = function(ev, args) {
                var ret = [], a, i = 0, f;
                try {
                        a = this.__getEventHooks(ev, true);
                        while ((f = a[i++]))
                                ret.push(f.apply(this, args));
                } catch(ex) {
                        if (!(ex instanceof DlExStopEventProcessing))
                                throw ex;
                }
                return ret;
        };

        P.debug_countHooks = function() {
                var a = {}, i;
                for (i in this.__eventHooks)
                        a[i] = this.__eventHooks[i].length;
                return a;
        };

        P.invoke = function(method) {
                var args = Array.$(arguments, 1);
                return function(){
                        this[method].apply(this, args.concat(Array.$(arguments)));
                }.$(this);
        };

//      // note that both of the following could be dangerous
//      // if we traversing the container and destroy()
//      // objects
//
//      P.maintainArray = function(arr, ev) {
//              ev || (ev = "onDestroy");
//              this.addEventListener(ev, arr.remove.$(arr, this));
//      };
//
//      P.maintainHash = function(hash, id, ev) {
//              ev || (ev = "onDestroy");
//              id || (id = this.id); // WARNING! this.id is ASSUMED!
//              this.addEventListener(ev, function() {
//                      delete hash[id];
//              });
//      };

        // this SHOULD NOT be overridden.  Register an onDestroy event
        // handler if you wish to be able to do stuff when this happens
        P.destroy = function() {
                if (!this.destroyed) {
                        this.destroying = true;
                        this.callHooks("onDestroy");
                        this.__eventHooks = null;
                        this.destroying = false;
                        this.destroyed = true;
                        // throw new DlExStopEventBubbling;
                }
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

DEFINE_CLASS("DlEvent", null, function(D, P, DOM){

        var CE = DOM.createElement;

        var EVENT_MAP = {
                "mouseover"       : "onMouseEnter",
                "mouseout"        : "onMouseLeave",
                "mousedown"       : "onMouseDown",
                "mouseup"         : "onMouseUp",
                "mousemove"       : "onMouseMove",
                "click"           : "onClick",
                "dblclick"        : "onDblClick",
                "keydown"         : "onKeyDown",
                "keyup"           : "onKeyUp",
                "keypress"        : "onKeyPress",
                "contextmenu"     : "onContextMenu",
                "focus"           : "on_DOM_Focus",
                "blur"            : "on_DOM_Blur",
                "mousewheel"      : "onMouseWheel",
                "DOMMouseScroll"  : "onMouseWheel",
                "textInput"       : "onTextInput",
                "paste"           : "onPaste",
                "copy"            : "onCopy",
                "cut"             : "onCut"
        };

        D.CONSTRUCT = function(ev) {
                this.type = ev.type;
                this.dl_type = EVENT_MAP[this.type] || this.type;
                this.ctrlKey = ev.ctrlKey;
                this.which = ev.which;
                this.keyIdentifier = ev.keyIdentifier;
                if (is_macintosh) {
                        this.altGrKey = ev.altKey;
                        this.altKey = ev.metaKey;
                } else {
                        // this.metaKey = ev.metaKey;
                        this.altKey = ev.altKey;
                }
                this.shiftKey = ev.shiftKey;
                this.button = ev.button;
                this.focusedWidget = D.focusedWidget();
                if (is_ie) {
                        switch (ev.button) {
                            case 0: this.button = null; break;
                            case 1: this.button = 0; break;
                            case 2: this.button = 2; break;
                            case 4: this.button = 1; break;
                        }
                }
                if (this.type.indexOf("key") == 0) {
                        this.keyCode = ev.keyCode;
                        this.charCode = "which" in ev ? ev.which : (is_ie || is_opera) ? ev.keyCode : ev.charCode;
                        this.keyStr = String.fromCharCode(this.charCode);
                }
                if (this.dl_type == "onMouseWheel") {
                        var delta;
                        if (ev.wheelDelta) {
                                delta = ev.wheelDelta / 120;
                        } else if (ev.detail) {
                                delta = -ev.detail / 3;
                        }
                        this.wheelDelta = delta;
                }
                this.pos = { x : ev.clientX,
                             y : ev.clientY };
                this.relPos = this.pos;
                if (is_ie) {
                        this.target = ev.srcElement;
                        switch (this.type) {
                            case "mouseover" : this.relatedTarget = ev.fromElement; break;
                            case "mouseout"  : this.relatedTarget = ev.toElement; break;
                        }
                } else try {
                        this.target = ev.target;
                        if (this.target.nodeType == 3 /* Node.TEXT */)
                                this.target = this.target.parentNode;
                        if (this.type == "mouseout" || this.type == "mouseover") {
                                this.relatedTarget = ev.relatedTarget;
                                if (this.relatedTarget && this.relatedTarget.nodeType == 3 /* Node.TEXT */)
                                        this.relatedTarget = this.relatedTarget.parentNode;
                        }
                } catch(ex) {
                        // ignore, mozilla bug: 208427 (4 years old, still "NEW")
                        this.relatedTarget = ev.explicitOriginalTarget;
                        // this._failed = true;
                }
        };

        P.computePos = function(widget) {
                var el = widget
                        ? ( widget instanceof DlWidget ?
                            widget.getElement() :
                            widget )
                        : document.body;
                var pos = this.elPos = el
                        ? DOM.getPos(el)
                        : { x: 0, y: 0 };
                return this.relPos = { x     : this.pos.x - pos.x,
                                       y     : this.pos.y - pos.y,
                                       elPos : pos
                                     };
        };

        P.getObject = function(type) {
                var el = this.target;
                var obj = this.object;
                if (!obj) {
                        try {
                                while (el && !DlWidget.getFromElement(el))
                                        el = el.parentNode;
                                obj = el ? DlWidget.getFromElement(el) : null;
                        } catch(ex) {
                                obj = null;
                        }
                        this.object = obj;
                }
                if (type)
                        obj = obj.getParent(type);
                return obj;
        };

        P.getParentElement = function(tag, stop) {
                if (stop && stop instanceof DlWidget)
                        stop = stop.getElement();
                if (stop && el === stop)
                        return null;
                var el = this.target;
                try {
                        while (el && el.tagName.toLowerCase() != tag) {
                                el = el.parentNode;
                                if (stop && el === stop)
                                        return null;
                        }
                } catch(ex) {
                        el = null;
                }
                return el;
        };

        D.stopEvent = DOM.stopEvent;

        // var _captures = {};
        // var _captures_by_event = {};

//        var prev_ms_enter;

        function _processEvent(obj, dev, el, ev) {
                var o2 = dev.getObject();
                switch (dev.type) {

                    case "click":
                        break;

                    case "mousedown":
                        obj._ev_mouseDown = true;
                        obj.applyHooks(dev.dl_type, [ dev ]);
                        break;

                    case "mouseup":
                        var tmp = obj._ev_mouseDown;
                        obj._ev_mouseDown = false;
                        obj.applyHooks(dev.dl_type, [ dev ]);
                        if (tmp && obj._ev_mouseInside && dev.button === 0) {
                                dev = new DlEvent(ev);
                                dev.dl_type = "onClick";
                                this.push([ obj, dev, el, ev ]);
                        }
                        break;

                    case "mouseover":
                    case "mouseout":
                        if (!el || !DOM.related(el, ev)) {
                                if (obj === o2)
                                        obj._ev_mouseInside = dev.type == "mouseover";
                                obj.applyHooks(dev.dl_type, [ dev ]);
//                                 if (dev.dl_type == "onMouseEnter") {
//                                         if (prev_ms_enter && !prev_ms_enter.destroyed && prev_ms_enter._ev_mouseInside && prev_ms_enter != obj) {
//                                                 var tmp = obj.parent;
//                                                 while (tmp && tmp != prev_ms_enter)
//                                                         tmp = tmp.parent;
//                                                 if (!tmp) {
//                                                         dev = new DlEvent(ev);
//                                                         dev.dl_type = "onMouseLeave";
//                                                         this.push([ prev_ms_enter, dev, el, ev ]);
//                                                         prev_ms_enter._ev_mouseInside = false;
//                                                 }
//                                         }
//                                         prev_ms_enter = obj;
//                                 } else if (dev.dl_type == "onMouseLeave") {
//                                         prev_ms_enter = null;
//                                 }
                        } else {
                                // FIXME: this seems to be a hack ;)
                                dev.dl_type = dev.type == "mouseover"
                                        ? "onMouseOver" : "onMouseOut";
                                obj.applyHooks(dev.dl_type, [ dev ]);
                        }
                        break;

//                  case "keydown":
//                  case "keyup":
//                  case "keypress":

                    case "dblclick":
                        if ((is_ie || is_opera) && !obj.hasHooks("onDblClick")) {
                                dev = new DlEvent(ev);
                                dev.type = "click";
                                obj.applyHooks(dev.dl_type = "onClick", [ dev ]);
                                break;
                        }
                        // else we go to default!

                    default:
                        obj.applyHooks(dev.dl_type, [ dev ]);
                        break;
                }
                if (ev && dev.domStop)
                        DOM.stopEvent(ev);
        };

        var focusedWidget = null;

        function on_focusedWidget_destroy() {
                if (this === focusedWidget)
                        focusedWidget = null;
        };

        D.fakeBlur = function() {
                if (is_safari && focusedWidget.blur)
                        return focusedWidget.blur();
                var a = DOM.CE_CACHE.FAKE_FOCUS;
                if (!a) {
                        a = DOM.CE_CACHE.FAKE_FOCUS =
                                CE("a", null, {
                                        href      : "#",
                                        innerHTML : "test",
                                        className : "DYNARCH-FAKE-FOCUS"
                                }, document.body);
                }
                a.focus();
                if (is_ie) {
                        var r = document.body.createTextRange();
                        r.moveStart("character", 0);
                        r.collapse(true);
                        r.select();
                }
                a.blur();
                window.status = "";
        };

        D.focusedWidget = function(w) {
                if (arguments.length > 0 && focusedWidget !== w) {
                        if (focusedWidget && !focusedWidget.destroyed /* XXX: WTF? */) {
                                if (focusedWidget._focusable == 2) {
                                        if (w._focusable < 2)
                                                D.fakeBlur();
                                } else {
                                        focusedWidget.blur();
                                }
                                focusedWidget.removeEventListener("onDestroy", on_focusedWidget_destroy);
                        }
                        focusedWidget = w;
                        if (w) {
                                w.addEventListener("onDestroy", on_focusedWidget_destroy);
                                var p = w.parent;
                                while (p) {
                                        p._focusedWidget = w;
                                        p = p.parent;
                                }
                        }
                }
                return focusedWidget;
        };

        D.checkDisabled = function(w) {
                while (w) {
                        if (w.disabled())
                                return true;
                        w = w.parent;
                }
                return false;
        };

        P.destroy = function() {
                this.object =
                        this.target =
                        this.relatedTarget =
//                      this.pos =
//                      this.relPos =
                        null;
        };

        P.stopDomEvent = function() {
                D.stopEvent(D.latestDomEvent);
        };

        var GLOBAL_CAPTURES = D.GLOBAL_CAPTURES = {};

        var KEY_EVENTS = "keydown keyup keypress".hashWords();

        // var CKT=0;
        D._genericEventHandler = function(ev, ev2) {
                ev || (ev = window.event);
                // window.status = "still here " + (++CKT);
                var el, obj, dev = ev instanceof D ? ev : new D(ev);
                if (ev2)
                        ev = ev2;
                if (dev._failed) {
                        // ignore, mozilla bug: 208427 (4 years old, still "NEW")
                        // ev.relatedTarget is an anonymous DIV
                        D.stopEvent(ev);
                        return;
                }
                D.latestEvent = dev;
                D.latestDomEvent = ev;
                if (dev.pos.x && dev.dl_type != "onMouseWheel") {
                        D.latestMouseEvent = dev;
                        if (dev.dl_type == "onMouseDown")
                                D.latestMouseDownEvent = dev;
                }
                try {
                        var a = GLOBAL_CAPTURES[dev.dl_type], i;
                        if (a)
                                for (i = a.length; --i >= 0;)
                                        a[i](dev);

                        if (dev.type in KEY_EVENTS && focusedWidget)
                                el = focusedWidget.getElement();
                        else
                                el = dev.target;

                        //window.status = dev.dl_type;
                        var objects = [];
                        i = 0;
                        while (el) {
                                obj = DlWidget.getFromElement(el);
                                if (obj) {
                                        if (!D.checkDisabled(obj))
                                                objects[i++] = [ obj, dev, el, ev ];
                                        if (obj.__noPropEvents && obj.__noPropEvents.test(dev.dl_type))
                                                break;
                                }
                                el = el.parentNode;
                        }
                        for (i = 0; i < objects.length; ++i)
                                _processEvent.apply(objects, objects[i]);
                } catch(ex) {
                        if (ex instanceof DlExStopEventBubbling)
                                D.stopEvent(ev);
                        else
                                throw ex;
                }
                dev.destroy();
        };

        var _unloadListeners = [];
        function _unloadHandler() {
                _unloadListeners.r_foreach(Function.invoke);
        };

        D._unloadHandler = _unloadHandler;

        // map type => function ref.
        D.captureGlobals = function(obj) {
                for (var i in obj)
                        D.captureGlobal(i, obj[i]);
        };

        // map type => function ref.
        D.releaseGlobals = function(obj) {
                for (var i in obj)
                        D.releaseGlobal(i, obj[i]);
        };

        D.captureGlobal = function(type, f) {
                var a = GLOBAL_CAPTURES[type];
                if (!a)
                        a = GLOBAL_CAPTURES[type] = [];
                a.push(f);
        };

        D.releaseGlobal = function(type, f) {
                var a = GLOBAL_CAPTURES[type];
                if (a)
                        a.remove(f);
        };

        D.atUnload = function(f) { _unloadListeners.push(f); };

        DOM.addEvents
        (document, [ "contextmenu", "click", "dblclick",
                     "mousedown", "mouseup",
                     "mouseover",
                     "mouseout",
                     "mousemove",
                     is_gecko ? "DOMMouseScroll" : "mousewheel",
                     "keydown", "keyup", "keypress",
                     "paste", "copy", "cut" ],
         D._genericEventHandler);

        DOM.addEvent(window, "unload", _unloadHandler);

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require eventproxy.js
// @require event.js

DEFINE_CLASS("DlWidget", DlEventProxy, function(D, P, DOM) {

        var CE = DOM.createElement,
            AC = DOM.addClass,
            DC = DOM.delClass,
            CC = DOM.condClass,
            ID = Dynarch.ID;

        D.FIXARGS = function(args) {
                if (args.focusable == null && args.tabIndex)
                        args.focusable = true;
        };

        D.CONSTRUCT = function() {
                this.__propsUserData = {};
                this.__refNodes = [];

                if (!(this._parent == null || this._parent instanceof DlContainer))
                        throw new DlException("Parent must be an instance of DlContainer");

                this.id = ID(this._objectType || "DlWidget");
                WIDGETS[this.id] = this;

                this.initDOM();
        };

        D.DEFAULT_ARGS = {
                userData         : [ "data"             , null ],
                _parent          : [ "parent"           , null ],
                _fillParent      : [ "fillParent"       , null ],
                _tagName         : [ "tagName"          , "div" ],
                _dragArgs        : [ "drag"             , null ],
                _element         : [ "element"          , null ],
                _focusable       : [ "focusable"        , false ],
                _tabIndex        : [ "tabIndex"         , 0 ],
                _accessKey       : [ "accessKey"        , null ],
                __appendArgs     : [ "appendArgs"       , window.undefined ],
                __addClassName   : [ "className"        , "" ],
                __disabled       : [ "disabled"         , false ],
                __tooltip        : [ "tooltip"          , null ],
                __contextMenu    : [ "contextMenu"      , null ],
                __tooltipTimeout : [ "tooltipTimeout"   , 650 ],
                __refCnt         : [ "_refCnt"          , 0 ],
                __noPropEvents   : [ "dontBubbleEvents" , null ]
        };

        D.DEFAULT_EVENTS = [
                "onMouseEnter",
                "onMouseLeave",
                "onMouseMove",
                "onMouseDown",
                "onMouseUp",
                "onMouseOver",
                "onMouseOut",
                "onMouseWheel",
                "onClick",
                "onDblClick",
                "onDisabled",
                "onDisplay",
                "onFocus",
                "on_DOM_Focus",
                "onBlur",
                "on_DOM_Blur",
                "onKeyDown",
                "onKeyUp",
                "onKeyPress",
                "onResize",
                "onContextMenu",
                "onTooltipShow",
                "onTooltipHide"

                // DnD events -- not yet used
                // "onDragStart",
                // "onDragAvailable",
                // "onDragCancel",
                // "onDrop"
        ];

        var WIDGETS = D.WIDGETS = {};

        D.getById = function(id) { return WIDGETS[id]; };
        D.getFromElement = function(el) { return el._dynarch_object; };

        D.getFromUpElement = function(el) {
                while (el && !el._dynarch_object)
                        el = el.parentNode;
                return el && el._dynarch_object;
        };

        var TOOLTIP = null;
        function getTooltip() {
                if (!TOOLTIP)
                        TOOLTIP = new DlTooltip({});
                return TOOLTIP;
        };
        D.getTooltip = getTooltip;

        P.getWidgetId = function() {
                return this.id;
        };

        P._className = [];

        P.FINISH_OBJECT_DEF = function() {
                D.BASE.FINISH_OBJECT_DEF.call(this);
                this._className = this._className.concat([ this._objectType ]);
        };

        var RESIZE_RECT = null;
        P.getResizeRect = D.getResizeRect = function() {
                if (!RESIZE_RECT)
                        RESIZE_RECT = CE("div", { display: "none" },
                                         { className: "Dl-ResizeRect",
                                           innerHTML: "&nbsp;" },
                                         document.body);
                return RESIZE_RECT;
        };

        D.debug_countHooks = function() {
                var ret = {};
                Array.hashKeys(DlWidget.WIDGETS).foreach(function(id){
                        ret[id] = DlWidget.WIDGETS[id].debug_countHooks();
                });
                return ret;
        };

        function onDestroy() {
                if (this.__tooltipActive)
                        getTooltip().hide();
                if (this.__contextMenu instanceof D)
                        this.__contextMenu.destroy();
                if (this.parent)
                        try {
                                this.parent.removeWidget(this);
                        } catch(ex) {};
                var el = this.getElement();
                if (el) {
                        // delete el["_dynarch_object"]; // not good for IE
                        el._dynarch_object = null;
                        // delete el["_dynarch_focusable"]; // same.
                        el._dynarch_focusable = null;
                }
                this._element = null;
                DOM.trash(el);
                if (WIDGETS[this.id]) {
                        WIDGETS[this.id] = null;
                        delete WIDGETS[this.id];
                }
                el = null;
                this.__refNodes.r_foreach(function(name, i){
                        this.__refNodes[i] = null;
                        this[name] = null;
                        delete this[name];
                }, this);
                this.__refNodes = null;
                this.userData = null;
                this.__propsUserData = null;
        };

        P.destroy = function() {
                if (this.unref() <= 0)
                        D.BASE.destroy.call(this);
        };

        P.__onTooltipShow = function() {
                this.__tooltipActive = true;
                this.callHooks("onTooltipShow");
        };

        P.__onTooltipHide = function() {
                this.__tooltipActive = false;
                this.callHooks("onTooltipHide");
        };

        P._popupTooltip = function() {
                getTooltip().popup({ timeout : this.__tooltipTimeout,
                                     content : this.__tooltip,
                                     anchor  : this.getElement(),
                                     align   : "mouse",
                                     onPopup : this.__onTooltipShow,
                                     onHide  : this.__onTooltipHide,
                                     widget  : this
                                   });
        };

        function onMouseEnter() {
                if (this.__tooltip)
                        this._popupTooltip();
        };

        function onMouseLeave() {
                getTooltip().hide();
        };

        // drag handlers
        {
                function dragMouseMove(da, ev) {
                        if (!da.dragging) {
                                if (Math.abs(ev.pos.x - da.startPos.x) >= da.delta ||
                                    Math.abs(ev.pos.y - da.startPos.y) >= da.delta) {
                                        da.dragging = true;
                                        da.makeElementCopy(this, ev);
                                        da.applyHooks("onStartDrag", [ this, ev ]);
                                        this.addClass(da.draggingClass);
                                }
                        }
                        if (da.dragging) {
                                var el = da.elementCopy;
                                if (el) {
                                        el.style.left = ev.pos.x + 5 + "px";
                                        el.style.top = ev.pos.y + 5 + "px";
                                }
                                da.moving(this, ev);
                                DlException.stopEventBubbling();
                        }
                };

                function dragCancel(da, ev, wasCancel) {
                        this.delClass(da.draggingClass);
                        DlEvent.releaseGlobals(da.captures);
                        da.captures = null;
                        DRAGGING = false;
                        if (!wasCancel)
                                da.doDrop(this, ev);
                        da.reset(wasCancel);
                };

                function dragMouseUp(da, ev) {
                        if (ev.button == 0) {
                                var wasDropped = da.dragging && da.canDrop;
                                dragCancel.call(this, da, ev, !wasDropped);
                        }
                };

                function dragMouseOver(da, ev) {
                        DlException.stopEventBubbling();
                };

                function dragMouseOut(da, ev) {
                        DlException.stopEventBubbling();
                };

                function dragMouseEnter(da, ev) {
                        var obj = ev.getObject();
                        var insideThis = false, p = obj;
                        while (p) {
                                if (p === this) {
                                        insideThis = true;
                                        break;
                                }
                                p = p.parent;
                        }
                        var canDrop = da.dropOK(this, ev, obj, insideThis);
                        DlException.stopEventBubbling();
                };

                function dragMouseLeave(da, ev) {
                        DlException.stopEventBubbling();
                };

                function dragKeyPress(da, ev) {
                        if (ev.keyCode == DlKeyboard.ESCAPE) {
                                dragCancel.call(this, da, ev, true);
                        }
                        DlException.stopEventBubbling();
                };

                function dragContextMenu(da, ev) {
                        DlException.stopEventBubbling();
                };
        }

        var DRAGGING = false;

        function onMouseDown(ev) {
                getTooltip().cancel();
                if (this._focusable && !ev._justFocusedWidget) {
                        ev._justFocusedWidget = this;
                        if (this._focusable < 2)
                                // otherwise are focused automagically.
                                this.focus();
                }
                if (ev.button == 0) {
                        var da = this._dragArgs, el;
                        if (da && !DRAGGING) {
                                if (da.startOK(this, ev)) {
                                        var obj = ev.getObject();
                                        if (obj)
                                                obj.applyHooks("onMouseLeave", [ ev ]);
                                        DRAGGING = true;
                                        da.source = this;
                                        da.captures = {
                                                onMouseMove   : dragMouseMove.$(this, da),
                                                onMouseUp     : dragMouseUp.$(this, da),
                                                onMouseOver   : dragMouseOver.$(this, da),
                                                onMouseOut    : dragMouseOut.$(this, da),
                                                onMouseEnter  : dragMouseEnter.$(this, da),
                                                onMouseLeave  : dragMouseLeave.$(this, da),
                                                onContextMenu : dragContextMenu.$(this, da),
                                                onKeyPress    : dragKeyPress.$(this, da)
                                        };
                                        da.startPos = ev.pos;
                                        da.startElPos = this.getPos();
                                        DlEvent.captureGlobals(da.captures);
                                        // DlException.stopEventBubbling();
                                        // ev.stopDomEvent();
                                }
                        }
                }
        };

        function onContextMenu(ev) {
                var content = this.__contextMenu;
                if (typeof content == "function")
                        content = content.call(this, ev);
                if (content) {
                        var p = this._getContextMenuPopup();
                        p.popup({ timeout    : 0,
                                  content    : content,
                                  anchor     : content.contextMenuAnchor || this.getElement(),
                                  align      : content.contextMenuAlign || "mouse",
                                  widget     : this,
                                  onPopup    : content.contextMenuOnPopup || null,
                                  onHide     : content.contextMenuOnHide || null,
                                  isContext  : true });
                        DlException.stopEventBubbling();
                }
        };

        P.setData = function(key, val) {
                if (arguments.length == 1)
                        delete this.__propsUserData[key];
                else
                        this.__propsUserData[key] = val;
        };

        P.getData = function(key) {
                return this.__propsUserData[key];
        };

        P._getDlPopup = function() {
                var p = this.getParent(DlPopup) || 0;
                if (p)
                        p = p._level + 1;
                return DlPopupMenu.get(p);
        };

        P._getContextMenuPopup = P._getDlPopup;

        var LISTENERS = {
                onDestroy     : onDestroy,
                onMouseEnter  : onMouseEnter,
                onMouseLeave  : onMouseLeave,
                onMouseDown   : onMouseDown,
                onContextMenu : onContextMenu
        };

        P._setListeners = function() {
                this.addEventListener(LISTENERS);
                this.addEventListener((is_ie || is_khtml) ? "onKeyDown" : "onKeyPress", this._handle_focusKeys);
        };

        P._handle_focusKeys = function(ev) {};

        P._check_accessKey = function(ev) {
                return this._accessKey && DlKeyboard.checkKey(ev, this._accessKey);
        };

        P._handle_accessKey = function(ev) {
                this.focus();
        };

        P._setFocusedStyle = function(focused) {
                this.condClass(focused, this._className.peek() + "-focus");
        };

        P.focus = function() {
                if (this._focusable) {
                        DlEvent.focusedWidget(this);
                        this._setFocusedStyle(true);
                        this.callHooks("onFocus");
                        if (!(this instanceof DlEntry)) {
                                this.scrollIntoView();
                        }
                } else if (this.parent) {
                        this.parent.focus();
                }
        };

        P.blur = function() {
                if (this._focusable) {
                        if (!this.destroyed) {
                                this._setFocusedStyle(false);
                                this.callHooks("onBlur");
                        }
                }
        };

        P.focusInside = function() {
                var fw = DlEvent.focusedWidget();
                while (fw) {
                        if (fw == this)
                                break;
                        fw = fw.parent;
                }
                return !!fw;
        };

        P._createElement = function(html) {
                var el = this._element;
                if (!el) {
                        var C = this.constructor, cn = C.__joinedClassName || this._className.join(" ");
                        if (!C.__joinedClassName)
                                C.__joinedClassName = cn;
                        if (this.__addClassName)
                                cn += " " + this.__addClassName;
                        if (html) {
                                el = DOM.createFromHtml(html);
                                el.className = cn;
                        } else {
                                el = CE(this._tagName, null, { className : cn });
                        }
                        if (this._focusable)
                                el._dynarch_focusable = true;
                        this._element = el;
                } else {
                        this.__alreadyInDom = true;
                }
                el._dynarch_object = this;
        };

        P.getElement = function() { return this._element };

        P.getParentNode = function() { return this._element.parentNode };

        P.getDOMChildren = function() {
                return Array.$(this.getContentElement().childNodes);
        };

        P.getContentElement = function() {
                return this.getElement();
        };

        P.setStyle = function(a, b) {
                var s = this.getElement().style;
                if (arguments.length > 1) {
                        // FIXME: add IE hacks
                        s[a] = b;
                } else {
                        for (var i in a)
                                this.setStyle(i, a[i]);
                }
//              else if (a instanceof Array) {
//                      if (b == null)
//                              b = "";
//                      a.foreach(function(a) {
//                              s[a] = b;
//                      });
//              }
        };

        P.setContent = function(content) {
                var el = this.getContentElement();
                while (el.firstChild)
                        el.removeChild(el.lastChild);
                if (typeof content == "string") {
                        el.innerHTML = content;
                } else if (content instanceof Function) {
                        return this.setContent(content.call(this));
                } else if (content instanceof D) {
                        // el.innerHTML = "";
                        // IE effectively destroys elements when we're using
                        // innerHTML (how stupid!).  This is not desirable
                        // since we might keep references to elements for
                        // further use, i.e. in DlPopup(Menu)
                        this.appendWidget(content, this.__appendArgs);
                } else if (content instanceof Array) {
                        // assuming array of strings
                        el.innerHTML = content.join("");
                } else if (content != null) {
                        // assuming HTMLElement
                        el.appendChild(content);
                }
                return content != null;
        };

        P.ref = function() { return this.__refCnt++; };
        P.unref = function() { return --this.__refCnt; };
        P.refCnt = function() { return this.__refCnt; };

        P.setContextMenu = function(menu) {
                if (this.__contextMenu instanceof D)
                        this.__contextMenu.destroy();
                if (menu instanceof D)
                        menu.ref();
                this.__contextMenu = menu;
        };

        P.setTooltip = function(tt) {
                this.__tooltip = tt;
        };

        P.initDOM = function() {
                this._setListeners();
                this._createElement();
                if (this._parent) {
                        this._parent.appendWidget(this, this.__appendArgs);
                        this._parent = null; // this was a temporary property
                }
                if (this.__disabled)
                        this.disabled(true, true);
                this.__onTooltipShow = this.__onTooltipShow.$(this);
                this.__onTooltipHide = this.__onTooltipHide.$(this);
                return this;
        };

        P.setUnselectable = function(el, val) {
                if (el == null)
                        el = this.getElement();
                DOM.setUnselectable(el, val);
        };

        P.disabled = function(v, force) {
                if (v != null && (force || v != this.__disabled)) {
                        this.__disabled = v;
                        this.condClass(v, "DlWidget-disabled");
                        this.condClass(v, this._className.peek() + "-disabled");
                        this.applyHooks("onDisabled", [ v ]);
                }
                return this.__disabled;
        };

        P.enabled = function(v, force) {
                if (v != null) {
                        this.disabled(!v, force);
                }
                return !this.__disabled;
        };

        P.getParent = function(type, skipThis) {
                if (type == null)
                        return this.parent;
                var parent = this;
                if (skipThis)
                        parent = this.parent;
                while (parent && !(parent instanceof type))
                        parent = parent.parent;
                return parent;
        };

        P.findParent = function(f, skipThis) {
                var tmp, parent = this;
                if (skipThis)
                        parent = this.parent;
                if (f instanceof Function) {
                        while (parent && !f(parent))
                                parent = parent.parent;
                } else {
                        var args = Array.$(arguments, 2);
                        while (parent) {
                                tmp = parent[f];
                                if (tmp)
                                        if (tmp instanceof Function) {
                                                if (tmp.apply(parent, args))
                                                        break;
                                        } else
                                                break;
                                parent = parent.parent;
                        }
                }
                return parent;
        };

        P.getPos = function() {
                return DOM.getPos(this.getElement());
        };

        P.getBRPos = function() {
                return DOM.getBRPos(this.getElement());
        };

        P.getOffsetPos = function() {
                var el = this.getElement();
                return { x: el.offsetLeft,
                         y: el.offsetTop };
        };

        P.setPos = function(x, y) {
                var el = this.getElement();
                if (x != null && typeof x == "object") {
                        y = x.y;
                        x = x.x;
                }
                if (x != null)
                        el.style.left = x + "px";
                if (y != null)
                        el.style.top = y + "px";
        };

        P.setSize = P.setOuterSize = function(size) {
                DOM.setOuterSize(this.getElement(), size.x, size.y);
                this.callHooks("onResize");
        };

        P.setInnerSize = function(size) {
                DOM.setInnerSize(this.getContentElement(), size.x, size.y);
                this.callHooks("onResize");
        };

        P.getSize = P.getOuterSize = function() {
                return DOM.getOuterSize(this.getElement());
        };

        P.getInnerSize = function() {
                return DOM.getInnerSize(this.getContentElement());
        };

        P.display = function(v) {
                var s = this.getElement().style;
                if (v != null) {
                        s.display = v ? "" : "none";
                        this.applyHooks("onDisplay", [ v, s.display, "display" ]);
                        return v;
                }
                return s.display != "none";
        };

        P.visibility = function(v) {
                var s = this.getElement().style;
                if (v != null) {
                        s.visibility = v ? "" : "hidden";
                        this.applyHooks("onDisplay", [ v, s.visibility, "visibility" ]);
                        return v;
                }
                return s.visible != "hidden";
        };

        P.opacity = function(o) {
                return DOM.setOpacity(this.getElement(), o);
        };

        P.position = function(p) {
                var s = this.getElement().style, o = s.position;
                if (p != null) {
                        s.position = p;
                }
                return o;
        };

        // FIXME: sucks?!
        P.setIconClass = function(iconClass) {
                var e2 = this.getContentElement();
                CC(e2, iconClass != null, this.__withIconClass || this._className.peek() + "-withIcon");
                if (this.iconClass)
                        DC(e2, this.iconClass);
                if (iconClass)
                        AC(e2, iconClass);
                this.iconClass = iconClass;
        };

        P.addClass = function(ac, dc) {
                AC(this.getElement(), ac, dc);
        };

        P.delClass = function(dc, ac) {
                DC(this.getElement(), dc, ac);
        };

        P.condClass = function(cond, clsTrue, clsFalse) {
                CC(this.getElement(), cond, clsTrue, clsFalse);
                return cond;
        };

        P.zIndex = function(zIndex) {
                var el = this.getElement();
                if (zIndex != null) {
                        el.style.zIndex = zIndex;
                        return zIndex;
                }
                if (el.style.zIndex)
                        return parseInt(el.style.zIndex, 10);
                return 0;
        };

        P.refNode = function(name, el) {
                this[name] = el;
                this.__refNodes.remove(name);
                if (el != null)
                        this.__refNodes.push(name);
                return el;
        };

        P.debug_highlight = function(color) {
                this.getElement().style.backgroundColor = color || "yellow";
        };

        P.getQuickPopup = function() {
                var p = this.getParent(DlPopup) || 0;
                if (p)
                        p = p._level + 1;
                return DlDialogPopup.get(p);
        };

        P.quickPopup = function(args) {
                var p = this.getQuickPopup();
                args = Object.makeCopy(args);
                Object.mergeUndefined(args, {
                        anchor    : this.getElement(),
                        align     : { prefer: "CC" }
                });
                p.popup(args);
        };

        P.getScroll = function() {
                var el = this.getElement();
                return { x: el.scrollLeft,
                         y: el.scrollTop };
        };

        P.scrollIntoView = function() {
                DOM.scrollIntoView(this.getElement());
        };

        P.flash = function(timeout, steps) {
                DOM.flash(this.getElement(), timeout, steps);
        };

        DlEvent.atUnload(function(){
                do {
                        window.DL_CLOSING = true;
                        var destroying = false;
                        for (var i in WIDGETS) {
                                destroying = true;
                                var w = WIDGETS[i];
                                try { WIDGETS[i] = null; delete WIDGETS[i]; w.destroy(); } catch(ex) {};
                                break;
                        }
                } while (destroying);
                WIDGETS = null;
        });

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require widget.js

DEFINE_CLASS("DlContainer", DlWidget, function(D, P) {

        D.BEFORE_BASE = function() {
                this._widgets = [];
        };

	D.DEFAULT_ARGS = {
		_scrollBars           : [ "scroll"     , false ],
                __noParentKeyBindings : [ "noParentKB" , false ]
	};

	P._createElement = function() {
		D.BASE._createElement.apply(this, arguments);
		if (this._scrollBars)
			this.setStyle("overflow", "auto");
	};

	//	FIXME: do we need this?  causes problems with DlPopup
	//	(since it's frequent to cache the popups' content)

// 	P.setContent = function() {
// 		this.destroyChildWidgets();
// 		D.BASE.setContent.apply(this, Array.$(arguments));
// 	};

	P.appendWidget = function(w) {
		// alert("Appending " + w._objectType + " to " + this._objectType);
		if (w.parent)
			w.parent.removeWidget(w);
		this._widgets.push(w);
		w.parent = this;
                if (!w.__alreadyInDom)
                        this._appendWidgetElement.apply(this, arguments);
                delete w.__alreadyInDom;
	};

	P._appendWidgetElement = function(w, p) {
		var el = w.getElement();
		if (typeof p == "number") {
			var parent = this.getContentElement();
			try {
				p = parent.childNodes[p];
				parent.insertBefore(el, p);
			} catch(ex) {
				parent.appendChild(el);
			}
		} else {
			if (p == null)
				p = this.getContentElement();
			else if (typeof p == "string")
				p = document.getElementById(p);
			if (el.parentNode !== p)
				p.appendChild(el);
		}
	};

	P.removeWidget = function(w) {
		if (w.parent === this) {
			this._removeWidgetElement(w);
			this._widgets.remove(w);
			w.parent = null;
		}
	};

	P._removeWidgetElement = function(w) {
		if (this._widgets.contains(w)) {
			var el = w.getElement();
			if (el.parentNode)
				el.parentNode.removeChild(el);
		}
	};

	P.destroyChildWidgets = function() {
		var a = Array.$(this._widgets);
                for (var i = 0; i < a.length; ++i)
                        if (a[i] instanceof D)
                                a.push.apply(a, a[i]._widgets);
		a.r_foreach(function(w) {
			try {
				w.destroy();
			} catch(ex) {};
		});
		var el = this.getContentElement();
		if (el)
			el.innerHTML = "";
		return el;
	};

	P._setListeners = function() {
		D.BASE._setListeners.call(this);
		this.addEventListener("onDestroy", this.destroyChildWidgets);
		this.addEventListener("onResize", this.__doLayout);
	};

	P.disabled = function(v, force) {
		var isDisabled = D.BASE.disabled.call(this, v, force);
		if (v != null)
			this._widgets.r_foreach(function(w) {
				w.disabled(v, force);
			});
		return isDisabled;
	};

	P.children = function(idx) {
		return idx != null ? this._widgets[idx] : this._widgets;
	};

	P.__doLayout = function() {
		// XXX: this definitely sucks.
		var w = this.children().grep_first(function(w) {
			return w._fillParent;
		});
		if (w)
			w.setSize(this.getInnerSize());
	};

        function getAllFocusableWidgets(sub, all) {
                sub = sub ? Array.$(sub.getElement().getElementsByTagName("*")) : [];
                return Array.$(this.getElement().getElementsByTagName("*"))
                        .grep(all ? "_dynarch_object" : "_dynarch_focusable")
                        .grep(DynarchDomUtils.elementIsVisible)
                        .grep(sub.contains.$(sub).inverse())
                        .map(DlWidget.getFromElement)
                        .grep("enabled")
                        .mergeSort(function(a, b) {
                                return a._tabIndex - b._tabIndex;
                        });
        };

        function getFocusableWidget(w, d) {
                var a = getAllFocusableWidgets.call(this, w);

                // now see where we are and return the next/prev widget.
                var i = a.find(w);
                i = a.rotateIndex(i + d);
                if (i != null)
                        return a[i];
        };

        P.getNextFocusWidget = function(w) {
                return getFocusableWidget.call(this, w, 1);
        };

        P.getPrevFocusWidget = function(w) {
                return getFocusableWidget.call(this, w, -1);
        };

        P.getFirstFocusWidget = function() {
                // FIXME: optimize.
                return this.getNextFocusWidget(null);
        };

        P.getLastFocusWidget = function() {
                // FIXME: optimize.
                return this.getPrevFocusWidget(null);
        };

        P._handleKeybinding = function(ev, w) {
                if (ev.altKey || ev.ctrlKey) {
                        var a = getAllFocusableWidgets.call(this, w, true);
                        a.foreach(function(w) {
                                if (w._check_accessKey(ev)) {
                                        w._handle_accessKey(ev);
                                        ev.domStop = true;
                                        throw new DlExStopEventBubbling;
                                }
                        });
                        if (this.parent && !this.__noParentKeyBindings)
                                this.parent._handleKeybinding(ev, this);
                }
        };

	var HIDDEN;
	D.getHiddenContainer = function() {
		if (!HIDDEN) {
			HIDDEN = new this({ className: "DlContainer-Hidden" });
			document.body.appendChild(HIDDEN.getElement());
		}
		return HIDDEN;
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require eventproxy.js

DEFINE_CLASS("DlRadioGroup", DlEventProxy, function(D, P){

	D.CONSTRUCT = function(id) {
		if (id != null) {
			this._maxChecked = 1;
			this._minChecked = null;
			this.id = id;
			this.reset();
			this.addEventListener("onDestroy", onDestroy);
		}
	};

	var GROUPS = {};

        D.DEFAULT_EVENTS = [ "onChange" ];

	D.getById = D.get = function(id) {
		if (!id)
			id = Dynarch.ID("group");
		var g = GROUPS[id];
		if (!g)
			g = GROUPS[id] = new this(id);
		return g;
	};

	function onDestroy() {
		if (GROUPS[this.id]) {
			this._buttons = null;
			this._buttonsById = null;
			this._buttonsByValue = null;
			this._history = null;
			delete GROUPS[this.id];
		}
	};

	function onChange(w) {
		if (w != null) {
			this._changed = true;
			if (w.checked()) {
				if (this._maxChecked != null) {
					while (this._history.length >= this._maxChecked) {
						var o = this._history[0];
						o.checked(false, true);
						//o.callHooks("onMouseLeave");
						this._history.splice(0, 1);
					}
				}
				this._history.push(w);
			} else if (this._minChecked != null && this._history.length <= this._minChecked) {
                                w.checked(true, true);
                                throw new DlExStopEventProcessing();
			} else {
				this._history.remove(w);
                        }
		}
	};

	P.reset = function() {
                if (this._buttons)
                        this._buttons.r_foreach(function(b){
                                b.__group = b.__groupId = null;
                        });
		this._changed = false;
		this._buttons = [];
		this._buttonsById = {};
		this._buttonsByValue = {};
		this._history = [];
		this.removeAllListeners("onChange");
		this.addEventListener("onChange", onChange);
	};

	P.changed = function(c) {
		var r = this._changed;
		if (c != null)
			this._changed = c;
		return r;
	};

	P.getSelected = function() {
		return this._history;
	};

	P.getButtons = function() {
		return this._buttons;
	};

	P.getNextButton = function(btn) {
		if (btn == null)
			btn = this.getSelected()[0];
		var a = this._buttons, idx = a.nullLimitIndex(a.find(btn) + 1);
		if (idx != null)
			return a[idx];
	};

	P.getPrevButton = function(btn) {
		if (btn == null)
			btn = this.getSelected()[0];
		var a = this._buttons, idx = a.nullLimitIndex(a.find(btn) - 1);
		if (idx != null)
			return a[idx];
	};

	P.getValue = function() {
		return this._history.map("value");
	};

	P.setValue = function(val, hooks) {
		var h = this._buttonsByValue;
		if (!(val instanceof Array))
			val = [ val ];
		val = val.toHash(true);
		this._history = [];
		for (var i in h) {
			h[i].checked(val[i], true);
			if (val[i])
				this._history.push(h[i]);
		}
		if (hooks)
			this.callHooks("onChange");
	};

	P.getByValue = function(val) {
		return this._buttonsByValue[val];
	};

	P.addWidget = function(w, pos) {
		if (!this._buttonsById[w.id]) {
                        if (pos == null)
                                pos = this._buttons.length;
			this._buttonsById[w.id] = w;
			this._buttons.splice(pos, 0, w);
 			if (w.checked())
				this._history.push(w);
			var val = w.value();
			if (typeof val != "undefined")
				this._buttonsByValue[val] = w;
			w.addEventListener("onDestroy", this.removeWidget.$(this, w));
		}
	};

	P.removeWidget = function(w) {
		if (this._buttonsById[w.id]) {
			this._changed = true;
			delete this._buttonsById[w.id];
			var val = w.value();
			if (typeof val != "undefined")
				delete this._buttonsByValue[w.value()];
			this._buttons.remove(w);
                        if (this._history.length != this._history.remove(w).length)
                                this.callHooks("onChange");
		}
	};

	P.minChecked = function(minChecked) {
		if (arguments.length > 0)
			this._minChecked = minChecked;
		return this._minChecked;
	};

	P.maxChecked = function(maxChecked) {
		if (arguments.length > 0)
			this._maxChecked = maxChecked;
		return this._maxChecked;
	};

	// This really checks all.  Doesn't make too much sense when
	// _maxChecked restricts selection.
	P.checkAll = function(val, hooks) {
		if (val == null)
			val = true;
                if (hooks == null)
                        hooks = false;
		this._buttons.foreach(function(w) {
			w.checked(val, !hooks);
		});
		this._history = val ? Array.$(this._buttons) : [];
	};

	P.unCheckAll = function() {
		this._history.r_foreach(function(w) { w.checked(false); });
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require container.js
// @require radiogroup.js

DEFINE_CLASS("DlAbstractButton", DlWidget, function(D, P) {

	var DEFAULT_LISTENERS = [ "onMouseEnter",
				  "onMouseLeave",
				  "onMouseDown",
				  "onMouseUp",
				  "onUpdateLabel",
				  "onClick",
				  "onCheck",
				  "onChange",
				  "onDisabled"
				];

	var TYPE = {
		STANDARD : 1,
		TWOSTATE : 2
	};

        D.DEFAULT_ARGS = {
		_label	     : [ "label"       , "" ],
		_classes     : [ "classes"     , {} ],
		_checked     : [ "checked"     , false ],
		__groupId    : [ "group"       , null ],
		_btnType     : [ "type"	       , TYPE.STANDARD ],
		_value	     : [ "value"       , window.undefined ],
		_noCapture   : [ "noCapture"   , false ],
		_alwaysCheck : [ "alwaysCheck" , false ]
	};

	D.CONSTRUCT = function(args) {
		var gid = this.__groupId;
		if (gid != null) {
			var g;
			if (typeof gid == "object") {
				g = gid;
				this.__groupId = g.id;
			} else
				g = DlRadioGroup.get(gid);
			this.__group = g;
			// this.refNode("__group");
			g.addWidget(this, typeof args.appendArgs == "number" ? args.appendArgs : null);
		}
		if (!this._noCapture) {
			this._btnpressCapture = {
				onMouseMove  : DlException.stopEventBubbling,
				onMouseUp    : this._cap_onMouseUp.$(this),
				onMouseOver  : DlException.stopEventBubbling,
				onMouseOut   : DlException.stopEventBubbling,
				onMouseEnter : this._cap_onMouseEnter.$(this),
				onMouseLeave : this._cap_onMouseLeave.$(this)
			};
		}
	};

        D.DEFAULT_EVENTS = [ "onCheck", "onUncheck", "onChange", "onUpdateLabel" ];

	P._cap_onMouseUp = function(ev) {
		var obj = ev.getObject();
		DlEvent.releaseGlobals(this._btnpressCapture);
		this.applyHooks("onMouseUp", [ ev ]);
		if (!this._ev_mouseInside)
			this.applyHooks("onMouseLeave", [ ev ]);
		if (obj !== this) {
			obj && obj.applyHooks("onMouseEnter", [ ev ]);
			DlException.stopEventBubbling();
		}
	};

	P._cap_onMouseEnter = function(ev) {
		var obj = ev.getObject();
		if (obj === this)
			this.addClass(this._classes.active);
		obj && (obj._ev_mouseInside = true);
		DlException.stopEventBubbling();
	};

	P._cap_onMouseLeave = function(ev) {
		var obj = ev.getObject();
		if (obj === this)
			this.delClass(this._classes.active);
		obj && (obj._ev_mouseInside = false);
		DlException.stopEventBubbling();
	};

	D.TYPE = TYPE;

//	var HOVERED_BTN = null;

	P._onMouseEnter = function(ev) {
// 		if (HOVERED_BTN)
// 			HOVERED_BTN._onMouseLeave();
		this.addClass(this._classes.hover);
// 		HOVERED_BTN = this;
	};

	P._onMouseLeave = function(ev) {
		this.delClass(this._classes.hover);
		this.delClass(this._classes.active);
// 		HOVERED_BTN = null;
	};

	P._onMouseDown = function(ev) {
                // FIXME: not sure here's the right place for focus()
                //        uncomment in widget.js / onMouseDown if you remove this
		// this.focus();
		if (ev.button === 0) {
			this._ev_mouseInside = true;
			this.addClass(this._classes.hover);
			this.addClass(this._classes.active);
			if (!this._noCapture) {
				DlEvent.captureGlobals(this._btnpressCapture);
                                ev.domStop = true;
				// DlException.stopEventBubbling(); //XXX?
			}
		}
	};

	P._onMouseUp = function(ev) {
		this.delClass(this._classes.active);
	};

	P._onUpdateLabel = function() {
		this.condClass(!this._label || !/\S/.test(this._label), this._classes.empty);
	};

	P._onClick = function() {
		if (this._btnType == TYPE.TWOSTATE) {
			this._alwaysCheck
				? this.checked(true)
				: this.toggle();
		}
	};

        P.keyClicked = function(ev) {
                this.addClass(this._classes.active);
		(function() {
			this.delClass(this._classes.hover);
			this.delClass(this._classes.active);
			this.applyHooks("onClick", [ ev ]);
		}).delayed(90, this);
                if (ev) {
                        ev.domStop = true;
                        DlException.stopEventBubbling();
                }
        };

	P._handle_focusKeys = function(ev) {
                var k = ev.keyCode;
                if (k == DlKeyboard.ENTER || ev.charCode == DlKeyboard.SPACE) {
                        this.keyClicked(ev);
                } else if (!this._customMoveKeys && this.__group && k in DlKeyboard.KEYS_MOVE) {
                        var prev = k in DlKeyboard.KEYS_MOVE_PREV, w = prev
                                ? this.__group.getPrevButton(this)
                                : this.__group.getNextButton(this);
                        if (w) {
                                w.focus();
                                if (ev.shiftKey) {
                                        this.checked(true);
                                        w.checked(true);
                                }
                                ev.domStop = true;
                                DlException.stopEventBubbling();
                        }
		}
                D.BASE._handle_focusKeys.call(this, ev);
	};

        P._handle_accessKey = function(ev) {
                this.focus();
                this.keyClicked(ev);
        };

	P.disabled = function(v, force) {
		if (v != null && v) {
			this.delClass(this._classes.hover);
			this.delClass(this._classes.active);
		}
		return D.BASE.disabled.call(this, v, force);
	};

	P._onChange = function() {
		if (this.__group != null)
			this.__group.applyHooks("onChange", [ this ]);
	};

	P._onCheck = Function.noop;

	P._onDisabled = function(v) {
		this.condClass(v, this._classes.disabled);
		if (v && this._capture) {
			DlEvent.releaseCapture(this._capture);
			this._capture = null;
		}
	};

	P._createElement = function() {
		D.BASE._createElement.call(this);
		this._createLabelElement();
		this.label(this._label, true);
		this._updateState();
                this.setUnselectable();
	};

	P._setListeners = function() {
		D.BASE._setListeners.call(this);
		DEFAULT_LISTENERS.r_foreach(function(ev) {
			this.addEventListener(ev, this["_"+ev]);
		}, this);
	};

	P._createLabelElement = Function.noop;

	P.label = function(label, force) {
		if (force || arguments.length > 0 && label !== this._label) {
			// var cls = this._className.peek();
			this._label = label;
                        if (label)
                                label = "<div class='DlButton-Label'>" + this._label + "</div>";
			this.setContent(label);
			// this.condClass(label == "", cls + "-noLabel");
			this.applyHooks("onUpdateLabel", [ this._label ]);
		}
		return this._label;
	};

	P.setLabel = P.label;
	P.getLabel = P.label;

	/* two-state button stuff */

	P.group = function() {
		return this.__group;
	};

	P._checkTwoState = function(nothrow) {
		var cond = this._btnType != TYPE.TWOSTATE;
		if (cond && !nothrow)
			throw new DlExInvalidOperation("This operation is only available for a TWOSTATE button");
		return !cond;
	};

	P._updateState = function() {
		if (this._checkTwoState(true)) {
			var c = this._classes;
			this.condClass(this._checked, c.checked, c.unchecked);
		}
	};

	P.checked = function(checked, nohooks) {
		this._checkTwoState();
		if (arguments.length > 0) {
			checked = !!checked;
			var diff = !nohooks && (this._checked !== checked);
			this._checked = checked;
			this._updateState();
			if (diff) {
				this.callHooks("onChange");
				this.callHooks(checked ? "onCheck" : "onUncheck");
			}
		}
		return this._checked;
	};

	P.toggle = function(nohooks) {
		this._checkTwoState();
		this.checked(!this._checked, nohooks);
	};

	P.value = function(newval) {
		var oldval = this._value;
		if (arguments.length > 0)
			this._value = newval;
		return oldval;
	};

	P.setValue = P.value;
        P.getValue = P.value;

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require eventproxy.js

DEFINE_CLASS("DlAnimation", DlEventProxy, function(D, P){

        D.DEFAULT_EVENTS = [ "onStart", "onStop", "onPause", "onUpdate" ];

	D.CONSTRUCT = function(length, fps) {
                this.addEventListener("onDestroy", this.stop.$(this));
                if (length != null)
                        this.length = length;
                if (fps != null)
                        this._speed = 1000 / fps;
                this._update = update.$(this);
	};

	P.start = function(length, fps, func) {
                this.stop();
                if (length != null)
                        this.length = length;
                if (fps != null)
                        this._speed = 1000 / fps;
                if (func != null) {
                        if (!(func instanceof Function))
                                func = DlAnimation.easing[func];
                        this.func = func;
                }
                this.t = 0;
                this.i = 0;
                this.callHooks("onStart");
                this._timer = setInterval(this._update, this._speed);
	};

        P.running = function() {
                return this._timer;
        };

	P.stop = function(finished) {
		if (this._timer) {
			clearInterval(this._timer);
			this._timer = null;
			this.applyHooks("onStop", [ finished ]);
		}
	};

        P.getPos = function(f) {
                if (f == null)
                        f = this.func;
                return f.call(this, this.t);
        };

	function update() {
                this.t = this.i / this.length;
                try {
                        this.applyHooks("onUpdate", [ this.t ]);
                        if (++this.i > this.length)
                                this.stop(true);
                } catch(ex) {
                        this.stop();
                        throw ex;
                }
	};

	var PI     = Math.PI,
            abs    = Math.abs,
            asin   = Math.asin,
            pow    = Math.pow,
            sin    = Math.sin,
            cos    = Math.cos,
            exp    = Math.exp,
            round  = Math.round;

	var E = D.easing = {

                elastic_b : function(t) {
                        return 1-cos(-t*5.5*PI)/pow(2,7*t);
                },

                // FIXME: better name?
                elastic_b_custom : function(elasticity, stability, t) {
                        elasticity += 0.5;
                        return 1-cos(-t*elasticity*PI)/pow(2,stability*t);
                },

                magnetic : function(t) {
                        return 1-cos(t*t*t*10.5*PI)/exp(4*t);
                },

                accel_b : function(t) {
                        t = 1-t;
                        return 1 - t*t*t;
                },

                accel_a : function(t) {
                        return t * t * t;
                },

                accel_ab : function(t) {
                        t = 1-t;
                        return 1-sin(t*t*t*PI/2);
                },

                bounce_b : function(t) {
                        return t < 1/2.75
                                ? 7.5625 * t * t
                                : (t < 2/2.75
                                   ? (7.5625 * (t -= 1.5/2.75) * t + .75)
                                   : (t < 2.5/2.75
                                      ? (7.5625 * (t -= 2.25/2.75) * t + .9375)
                                      : (7.5625 * (t -= 2.625 / 2.75) * t + .984375)));
                },

                shake : function(t) {
                        return t < 0.5
                                ? -cos(t*11*PI)*t*t
                                : (t = 1-t, cos(t*11*PI)*t*t);
                }

	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require container.js

DEFINE_CLASS("DlBox", DlContainer, function(D, P, DOM) {

	D.DEFAULT_ARGS = {
		_borderSpacing  : [ "borderSpacing"  , 0 ],
		_align          : [ "align"          , null ],

                // override in DlWidget
                _tagName        : [ "tagName"        , "table" ]
	};

	P._createElement = function() {
		D.BASE._createElement.call(this);
		var table = this.getElement();
		table.cellSpacing = this._borderSpacing;
		table.cellPadding = 0;
		if (this._align)
			table.align = this._align;
		this.refNode("_tbody", DOM.createElement("tbody", null, null, table));
	};

	//P.getTableElement = function() { return this.getElement().firstChild; };
	P.getTableElement = P.getElement;

	P._appendWidgetElement = function(widget, where) {
		if (where == null)
			this.createCellElement().appendChild(widget.getElement());
		else
			where.appendChild(widget.getElement());
	};

	// FIXME: this shouldn't be here.
	P.destroyChildWidgets = function() {
		var a = Array.$(this._widgets);
		a.r_foreach(function(w) {
				    try {
					    w.destroy();
				    } catch(ex) {};
			    });
	};

	// <PURE VIRTUAL> -- we mean it.  DO Define this in subclasses.
	// P.createCellElement = function() {};
	// </PURE VIRTUAL>

	P.__addSep = function(sep_cls, cls, td) {
		if (!td)
			td = this.createCellElement();
		td.separator = true;
		var cn = this._objectType + "-" + sep_cls;
		if (cls)
			cn += " " + cls;
		td.className = cn;
		td.innerHTML = "<div class='" + cn + "'>&nbsp;</div>";
		DOM.setUnselectable(td);
		return td;
	};

	P.addSeparator = function(cls, td) {
		return this.__addSep("separator", cls, td);
	};

	P.addSpace = function(cls, td) {
		return this.__addSep("spacer", cls, td);
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require abstractbutton.js

DEFINE_CLASS("DlButton", DlAbstractButton, function(D, P, DOM){

	D.CONSTRUCT = function() {
		this.setIconClass(this._iconClass);
		this._iconClass = null;
	};

	D.TYPE = DlAbstractButton.TYPE;

	D.DEFAULT_ARGS = {
		_classes    : [ "classes"   , {
                        active    : "DlButton-active",
                        hover     : "DlButton-hover",
                        checked   : "DlButton-1",
                        unchecked : "DlButton-0",
                        empty     : "DlButton-empty",
                        disabled  : "DlButton-disabled"
                } ],
		_iconClass  : [ "iconClass" , null ]
	};

        P.__withIconClass = "DlButton-withIcon";

	P._createElement = function() {
		D.BASE._createElement.call(this);
		this.addClass("DlWidget-3D");
	};

	P._createLabelElement = function() {
		this.getElement().innerHTML = "<div class='DlButton-inner'><div></div></div>";
	};

	P.getContentElement = function() {
		return this.getElement().firstChild.firstChild;
	};

	P.setSize = P.setOuterSize = function(size) {
		var d1 = DOM.getPaddingAndBorder(this.getElement());
		if (size.x != null)
			size.x -= d1.x;
		if (size.y != null)
			size.y -= d1.y;
		d1 = DOM.getPaddingAndBorder(this.getElement().firstChild);
		if (size.x != null)
			size.x -= d1.x;
		if (size.y != null)
			size.y -= d1.y;
		DOM.setOuterSize(this.getContentElement(), size.x, size.y);

// 		D.BASE.setOuterSize.call(this, size);
// 		var el = this.getElement();
// 		size = DOM.getInnerSize(el);
// 		//size.x -= 8;
// 		//size.y -= 4;
// 		DOM.setOuterSize(this.getContentElement(), size.x, size.y);
// 		el.style.width = el.style.height = "";
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require box.js

DEFINE_CLASS("DlHbox", DlBox, function(D, P, DOM) {

        var CE = DOM.createElement;

	P._createElement = function() {
		D.BASE._createElement.call(this);
		this.refNode("_row", CE("tr", null, null, this._tbody));
	};

	P.createCellElement = function(pos) {
		var td = CE("td", null, { className : "cell" });
		pos != null
			? this._row.insertBefore(td, pos)
			: this._row.appendChild(td);
		return td;
	};

	P._removeWidgetElement = function(w) {
		if (this._widgets.contains(w)) {
			var el = w.getElement();
			el.parentNode.parentNode.removeChild(el.parentNode);
		}
	};

	P.addFiller = function() {
		var td = this.createCellElement();
		td.className += " DlHbox-filler";
		this.addClass("DlHbox-hasFiller");
	};

	P.setAlign = function(left, right) {
		var el = this.getElement();
		switch (left) {
		    case "left":
			el.style.marginLeft = "0";
			el.style.marginRight = "auto";
			break;
		    case "center":
			el.style.marginLeft = "auto";
			el.style.marginRight = "auto";
			break;
		    case "right":
			el.style.marginLeft = "auto";
			el.style.marginRight = "0";
			break;
		    default :
			el.style.marginLeft = left != null ? left : "auto";
			el.style.marginRight = right != null ? right : "auto";
		}
	};

	P.setEqualWidths = function(d) {
		var width = this.children().max(function(w) {
			return w.getSize().x;
		});
		if (d)
			width += d;
		this.children().r_foreach(function(w) {
			w.setSize({ x: width });
		});
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

function DlPoint(x, y) {
	if (typeof x == "object") {
		this.x = x.x;
		this.y = x.y;
	} else {
		this.x = x;
		this.y = y;
	}
};

DlPoint.prototype = {
	clone : function() {
		return new DlPoint(this.x, this.y);
	},
	normalize : function(p) {
		var tmp;
		if (this.x > p.x) { tmp = this.x; this.x = p.x; p.x = tmp; }
		if (this.y > p.y) { tmp = this.y; this.y = p.y; p.y = tmp; }
		return this;
	},
        distanceTo : function(p) {
                var a = Math.abs(p.x - this.x), b = Math.abs(p.y - this.y);
                return Math.sqrt(a * a + b * b);
        }
};

function DlRect(x, y, w, h) {
	if (x instanceof DlRect) {
		this.setFromRect(x);
	} else if (typeof x == "object") {
		if (typeof y == "object") {
			if (y instanceof DlPoint) {
				this.setFromPoints(x, y);
			} else {
				this.setFromValues(x.x, x.y, y.x, y.y);
			}
		} else {
			this.setFromValues(x.x, x.y, w, h);
		}
	} else {
		this.setFromValues(x, y, w, h);
	}
};

DlRect.prototype = {
	// SET functions
	setFromRect : function(r) {
		this.x = r.x;
		this.y = r.y;
		this.w = r.w;
		this.h = r.h;
		return this;
	},
	setFromPoints : function(p1, p2) {
		p1 = p1.clone().normalize(p2 = p2.clone());
		this.x = p1.x;
		this.y = p1.y;
		this.w = p2.x - p1.x + 1;
		this.h = p2.y - p1.y + 1;
		return this;
	},
	setFromValues : function(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		return this;
	},
	getTL : function() {
		return new DlPoint(this.x, this.y);
	},
	getBR : function() {
		return new DlPoint(this.x + this.w - 1, this.y + this.h - 1);
	},
	getPoints : function() {
		return [ getTL(), getBR() ];
	},
	height : function(h) {
		if (h != null)
			this.h = h;
		return this.h;
	},
	width : function(w) {
		if (w != null)
			this.w = w;
		return this.w;
	},
	containsPoint : function(p) {
		return this.x          <= p.x &&
			this.x + this.w  > p.x &&
			this.y          <= p.y &&
			this.y + this.h  > p.y;
	},
	intersect : function(r) {
		var ret = null,
			M = Math,
			dx = M.max(this.x, r.x),
			dy = M.max(this.y, r.y),
			dw = M.min(this.x + this.w, r.x + r.w) - dx,
			dh = M.min(this.y + this.h, r.y + r.h) - dy;
		if (dw > 0 && dh > 0)
			ret = new DlRect(dx, dy, dw, dh);
		return ret;
	},
	area : function() {
		return this.w * this.h;
	},
	makeDiv : function(bw, bc) {
		bc || (bc = "#000");
		bw == null && (bw = 0);
		var s = {
			position    : "absolute",
			left        : this.x + "px",
			top         : this.y + "px",
			width       : this.w - bw*2 + "px",
			height      : this.h - bw*2 + "px",
			overflow    : "hidden",
			lineHeight  : "1px",
			fontSize    : "1px",
			border      : bw + "px solid " + bc
		};
		s = DynarchDomUtils.createElement("div", s, { innerHTML: "&nbsp;" });
		// s.innerHTML = "<table align='center' style='height:100%'><tr><td>" + this.area();
		return s;
	},
	positionDiv : function(div) {
		div.style.left = this.x + "px";
		div.style.top = this.y + "px";
		div.style.height = this.h + "px";
		div.style.width = this.w + "px";
	},
	toString : function() {
		return this.w + "x" + this.h + "@" + this.x + "," + this.y;
	}
};

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require container.js
// @require geometry.js

// HAIRY STUFF, try not to touch it. ;-)

DEFINE_CLASS("DlPopup", DlContainer, function(D, P, DOM) {

        var CE = DOM.createElement,
            AC = DOM.addClass,
            DC = DOM.delClass,
            CC = DOM.condClass;

        var POPUPS = {};
        var ALL_POPUPS = {};
        var POPUPS_BY_ID = {};

        // DlPopup.POPUPS_BY_ID = POPUPS_BY_ID;

        var RE_REMOVE_SCROLL = /DlPopup-scroll(Up|Down)?-hover/g;

        D.BEFORE_BASE = function() {
                this._hasScrolling = false;
                this.visible = false;
        };

        D.DEFAULT_EVENTS = [ "onPopup", "onHide" ];

        D.DEFAULT_ARGS = {
                _level     : [ "level"      , 0 ],
                _autolink  : [ "autolink"   , true ],
                _oscroll   : [ "scroll"     , { step1: 5, step2: 10, speed: 40 } ],
                _align     : [ "align"      , null ],
                _zIndex    : [ "zIndex"     , 1000 ],
                _focusable : [ "focusable"  , true ]
        };

        P.FINISH_OBJECT_DEF = function() {
                D.BASE.FINISH_OBJECT_DEF.call(this);
                this.constructor.get = D.get;
                this.constructor.clearAll = D.clearAll;
                POPUPS[this._objectType] = [];
                ALL_POPUPS[this._objectType] = {};
        };

        // FIXME: this function is known to suck
        D.get = function(level, nocreate) {
                var type = this.prototype._objectType;
                var shouldAttach = false;
                var max = POPUPS[type].length;
                if (level == null || level >= max) {
                        level = max;
                        shouldAttach = true;
                }
                var pt = ALL_POPUPS[type];
                if (!ALL_POPUPS[type])
                        pt = ALL_POPUPS[type] = {};
                var ret = pt[level];
                if (!ret) {
                        if (!nocreate)
                                ret = pt[level] = new this({ level: level });
                        else
                                ret = null;
                }
                ret.detachPopup();
                if (shouldAttach && level > 0)
                        ret.attachToPopup(POPUPS[type].peek());
                return ret;
        };

        D.clearAll = function(lev) {
                var a = POPUPS[this.prototype._objectType];
                a = a[lev || 0];
                if (a)
                        a.hide();
        };

        D.clearAllPopups = function(except) {
                for (var i in POPUPS_BY_ID) {
                        if (!except || !except[i])
                                POPUPS_BY_ID[i].hide();
                }
        };

        P._createElement = function() {
                var parent = this._parent;
                this._parent = null;
                D.BASE._createElement.call(this);
                var div = this.getElement();
                this.parent = parent;
                this.display(false);
                document.body.appendChild(div);
                if (is_gecko)
                        div = CE("div", null, { className: "Gecko-Bug-302380" }, div);
                this.refNode("_contentEl", CE("div", null, { className: "DlPopup-scrollArea" }, div));
                this.zIndex(this._zIndex);
        };

        P.getContentElement = function() {
                return this._contentEl;
        };

        P.getScrollDiv = P.getContentElement;

        P._scrollSetArrowState = function() {
                var
                        div      = this.getScrollDiv(),
                        s1       = this._scroll_el(0),
                        s2       = this._scroll_el(1),
                        at_start = div.scrollTop == 0,
                        at_end   = div.scrollTop + div.offsetHeight == div.scrollHeight;
                if (at_start || at_end)
                        this._scrollStopHandler();
                CC(s1, at_start, "DlPopup-scrollUp-disabled");
                CC(s2, at_end, "DlPopup-scrollDown-disabled");
        };

        function _scrollHandler(dir) {
                this.getScrollDiv().scrollTop += this._scrollStep * dir;
                this._scrollSetArrowState();
        };

        function _scrollStartHandler(self, dir) {
                self._scrollStep = self._oscroll.step1;
                self._scrollTimer = setInterval(_scrollHandler.$(self, dir),
                                                self._oscroll.speed);
                AC(this, "DlPopup-scroll-hover");
                CC(this, dir > 0, "DlPopup-scrollDown-hover", "DlPopup-scrollUp-hover");
        };

        P._scrollStopHandler = function() {
                if (this._scrollTimer) {
                        clearInterval(this._scrollTimer);
                        this._scrollTimer = null;
                        this._scrollSetArrowState();
                }
                DC(this._scroll_el(0), RE_REMOVE_SCROLL);
                DC(this._scroll_el(1), RE_REMOVE_SCROLL);
        };

        P._scrollDoubleSpeed = function(dbl) {
                this._scrollStep = this._oscroll[dbl ? "step2" : "step1"];
                return false;
        };

        P._scroll_setup = function() {
                if (!this._hasScrolling) {
                        this._hasScrolling = true;
                        var e = this.getElement(),
                                s1 = CE("div", null, { className: "DlPopup-scrollUp" }, e, 0),
                                s2 = CE("div", null, { className: "DlPopup-scrollDown" }, e);
                        s1.onmouseover = _scrollStartHandler.$(null, this, -1);
                        s2.onmouseover = _scrollStartHandler.$(null, this, 1);
                        s1.onmouseout = s2.onmouseout = this._scrollStopHandler.$(this);
                        s1.onmousedown = s2.onmousedown = this._scrollDoubleSpeed.$(this, true);
                        s1.onmouseup = s2.onmouseup = this._scrollDoubleSpeed.$(this, false);
                        this.refNode("_scrollEl0", s1);
                        this.refNode("_scrollEl1", s2);
                        this.getScrollDiv().onscroll = this._scrollSetArrowState.$(this);
                }
                this._scroll_visibile(true);
        };

        P._scroll_el = function(p) {
                return this["_scrollEl"+p];
        };

        P._scroll_visibile = function(vis) {
                if (this._hasScrolling) {
                        if (is_gecko) // Gecko-Bug-302380 : https://bugzilla.mozilla.org/show_bug.cgi?id=302380
                                this.getScrollDiv().parentNode.style.overflow = vis ? "auto" : "";
                        vis = vis ? "" : "none";
                        this._scroll_el(0).style.display = vis;
                        this._scroll_el(1).style.display = vis;
                        this.args.scrollVisible = !vis;
                }
        };

        function onPopup() {
                POPUPS[this._objectType][this._level] = this;
                if (!this._autolink || this._level == 0)
                        POPUPS_BY_ID[this.id] = this;
        };
        function onHide() {
                var a = POPUPS[this._objectType];
                var child = a[this._level + 1];
                if (child)
                        child.hide();
                a.splice(this._level, 1); // couldn't we use pop() instead?
                if (POPUPS_BY_ID[this.id])
                        delete POPUPS_BY_ID[this.id];
        };
        function onMouseWheel(ev) {
                if (this.args.scrollVisible) {
                        var div = this.getScrollDiv(), st = div.scrollTop;
                        if (ev.wheelDelta < 0) {
                                st += 20;
                        } else {
                                st -= 20;
                                if (st < 0)
                                        st = 0;
                        }
                        div.scrollTop = st;
                        ev.domStop = true;
                        DlException.stopEventBubbling();
                }
        };

        var have_doc_listener = false;
        function global_onMouseDown(ev) {
                var obj = ev.getObject();
                var except = {};
                while (obj && !(obj instanceof D)) {
                        if (obj.currentPopup)
                                except[obj.currentPopup.id] = true;
                        obj = obj.parent;
                }
                if (obj) {
//                      var top = obj.getToplevelPopup();
//                      if (!top)
//                              top = obj;
//                      except[top.id] = true;
                        while (obj != null) {
                                except[obj.id] = true;
                                obj = obj._parentPopup;
                        }
                }
                D.clearAllPopups(except);
        };

        P._setListeners = function() {
                D.BASE._setListeners.call(this);
                this.addEventListener({ onPopup      : onPopup,
                                        onMouseWheel : onMouseWheel,
                                        onHide       : onHide });
                if (!have_doc_listener) {
                        have_doc_listener = true;
                        DlEvent.captureGlobal("onMouseDown", global_onMouseDown);
                }
        };

        function _do_popup(args) {
                if (args.onBeforePopup)
                        args.onBeforePopup.call(this, args);
                this._timer = null;
                if (!this.setContent(args.content))
                        return; // nothing to popup
                if (args.onPopup)
                        args.onPopup.call(this, args);
                this.applyHooks("onPopup", [ args ]);
                this.showAt(args.anchor, args.align || this._align, args.pos, args.shift, args.fluid);
                this._prevFocus = DlEvent.focusedWidget();
                this.focus();
        };

        P.popup = function(args) {
                this.args = args;
                this.cancel();
                if (!args.timeout)
                        _do_popup.call(this, args);
                else
                        this._timer = _do_popup.$(this, args).delayed(args.timeout);
        };

        function _do_hide() {
                if (this.visible) {
                        if (this.args && this.args.onHide)
                                this.args.onHide.call(this, this.args);
                        if (this._focusable && this._prevFocus) try {
                                this._prevFocus.focus();
                        } catch(ex) {}
                        this.args = null;
                        this._timer = null;
                        this.callHooks("onHide");
                        this.display(false);
                        this.visible = false;
                        // we need to delay this so that onmouseout events occur
                        // this.setContent.$(this, null).delayed(100);
                }
        };

        P.hide = function(timeout) {
                this.cancel();
                if (!timeout)
                        _do_hide.call(this);
                else
                        this._timer = _do_hide.$(this).delayed(timeout);
        };

        P.cancel = function() {
                if (this._timer) {
                        clearTimeout(this._timer);
                        this._timer = null;
                }
        };

        P.correctPos = Function.noop;

        P.reposition = function() {
                if (this.visible) {
                        this.showAt(this.args.anchor,
                                    this.args.align || this._align,
                                    this.args.pos,
                                    this.args.shift,
                                    this.args.fluid);
                }
        };

        P.showAt = function(anchor, align, mousePos, shift, fluid) {
                var origpos, p, sa, div = this.getScrollDiv();
                if (!align)
                        align = this._align;
                if (align == "mouse") {
                        if (mousePos == null)
                                mousePos = Object.makeCopy(DlEvent.latestMouseEvent.pos);
                        origpos = mousePos;
                        if (this._mouseDiff) {
                                origpos.x += this._mouseDiff.x;
                                origpos.y += this._mouseDiff.y;
                        }
                        align = {
                                prefer : "__",
                                fallX1 : "_R",
                                fallX2 : "_L",
                                fallY1 : "B_",
                                fallY2 : "T_"
                        };
                } else {
                        origpos = DOM.getPos(anchor);
                        if (shift) {
                                if (shift.x)
                                        origpos.x += shift.x;
                                if (shift.y)
                                        origpos.y += shift.y;
                        }
                }
                sa = DOM.getOuterSize(anchor);
                p = Object.makeCopy(origpos);
                this.visibility(false);
                div.style.height = "";
                this._scroll_visibile(false);
                this.setPos(-30000, -30000);
                this.display(true);
                if (is_ie)
                        this.getElement().style.width = "";
                var r = this._bestPosition(align, p, sa),
                        h = r.height();
                var sph = this.getScrollDiv().offsetHeight;
                var fuzz = this.getElement().offsetHeight - sph;
                p = r.getTL();
                // alert(h+ " -- "+ sp.h);
                if (h < sph) {
                        if (fluid) {
                                this.children(0).setSize({ y: h });
                        } else {
                                if (is_ie)
                                        this.getElement().style.width = div.offsetWidth + "px";
                                this._scroll_setup();
                                var
                                        h1 = this._scroll_el(0).offsetHeight,
                                        h2 = this._scroll_el(1).offsetHeight;
                                div.style.height = h - h1 - h2 - fuzz + "px";
                                this._scrollSetArrowState();
                                div.scrollTop = 0;
                        }
                }
                this.correctPos(p);
                this.setPos(p.x, p.y);
                if (this._parentPopup) {
                        var ZI = this._parentPopup.zIndex() + 1;
                        this.zIndex(ZI);
                }
                this.visibility(true);
                this.visible = true;
        };

        P._bestPosition = function(align, p, sa) {
                var sp = DOM.getWindowSize(),
                        r  = new DlRect(0, 0, sp.x, sp.y),
                        p1 = new DlPoint(p);

                sp = this.getSize();

                // check preferred alignment
                this._doAlign(align.prefer, p1, sa);
                var tmp = new DlRect(p1, sp).intersect(r);
                var cxp = this.checkXPos(p1, r);
                var cyp = this.checkYPos(p1, r);
                if (cxp == 0 && cyp == 0)
                        // all set
                        return tmp;

                if (cxp != 0) {

                        // check left
                        p1.x = p.x;
                        this._doAlign(align.fallX1, p1, sa);
                        var rl = new DlRect(p1, sp).intersect(r);

                        // check right
                        p1.x = p.x;
                        this._doAlign(align.fallX2, p1, sa);
                        var rr = new DlRect(p1, sp).intersect(r);

                        if (rl && rr) {
                                p1 = rl.area() > rr.area() ? rl.getTL() : rr.getTL();
                        } else if (rl) {
                                p1 = rl.getTL();
                        } else if (rr) {
                                p1 = rr.getTL();
                        }
                        this.args.fallX = true;

                }

                if (cyp != 0) {

                        // check top
                        p1.y = p.y;
                        this._doAlign(align.fallY1, p1, sa);
                        var rt = new DlRect(p1, sp).intersect(r);

                        // check bottom
                        p1.y = p.y;
                        this._doAlign(align.fallY2, p1, sa);
                        var rb = new DlRect(p1, sp).intersect(r);

                        if (rt && rb) {
                                p1 = rt.area() > rb.area() ? rt.getTL() : rb.getTL();
                        } else if (rt) {
                                p1 = rt.getTL();
                        } else if (rb) {
                                p1 = rb.getTL();
                        }
                        this.args.fallY = true;

                }

                return new DlRect(p1, sp).intersect(r);
        };

        P._doAlign = function(align, p, sa) {
                var
                        sp     = this.getSize(),
                        valign = align.substr(0, 1),
                        halign = "";

                if (align.length > 1)
                        halign = align.substr(1, 1);

                switch (valign) {
                    case "T": p.y -= sp.y; if (this._mouseDiff && this.args.align == "mouse") p.y -= 2*this._mouseDiff.y; break;
                    case "B": p.y += sa.y; if (this._mouseDiff && this.args.align == "mouse") p.y += 2*this._mouseDiff.y; break;
                    case "C":
                    case "c": p.y += (sa.y - sp.y) / 2; break;
                    case "t": p.y += sa.y - sp.y; break;
                    case "b": break; // already there
                }
                switch (halign) {
                    case "L": p.x -= sp.x; if (this._mouseDiff && this.args.align == "mouse") p.x -= 2*this._mouseDiff.x; break;
                    case "R": p.x += sa.x; if (this._mouseDiff && this.args.align == "mouse") p.x += 2*this._mouseDiff.x; break;
                    case "C":
                    case "c": p.x += (sa.x - sp.x) / 2; break;
                    case "l": p.x += sa.x - sp.x; break;
                    case "r": break; // already there
                }
        };

        P.checkXPos = function(p, rect) {
                if (p.x < rect.x)
                        return p.x - rect.x;
                var s = this.getSize();
                var d = p.x + s.x - rect.x - rect.w;
                return d > 0 ? d : 0;
        };

        P.checkYPos = function(p, rect) {
                if (p.y < rect.y)
                        return p.y - rect.y;
                var s = this.getSize();
                var d = p.y + s.y - rect.y - rect.h;
                return d > 0 ? d : 0;
        };

        P.attachToPopup = function(popup) {
                this._parentPopup = popup;
                popup._childPopup = this;
        };

        P.detachPopup = function() {
                if (this._parentPopup)
                        this._parentPopup._childPopup = null;
                this._parentPopup = null;
        };

        P.getToplevelPopup = function() {
                var p = this;
                while (p._parentPopup)
                        p = p._parentPopup;
                return p;
//              return POPUPS[this._objectType][0];
        };

        P._handle_focusKeys = function(ev) {
                if (!ev.altKey && !ev.ctrlKey) {
                        if (ev.keyCode == DlKeyboard.ESCAPE) {
                                this.hide();
                        } else if (ev.keyCode == DlKeyboard.TAB) {
                                var w = ev.focusedWidget;
                                w = ev.shiftKey
                                        ? this.getPrevFocusWidget(w)
                                        : this.getNextFocusWidget(w);
                                if (w)
                                        w.focus();
                                ev.domStop = true;
                                DlException.stopEventBubbling();
                        }
                }
                this._handleKeybinding(ev);
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require box.js

DEFINE_CLASS("DlVbox", DlBox, function(D, P, DOM){

        var CE = DOM.createElement;

	P.createCellElement = function() {
		return CE("td", null, { className : "cell" },
			  CE("tr", null, { className : "row" }, this._tbody));
	};

	P._removeWidgetElement = function(w) {
		if (this._widgets.contains(w)) {
			var el = w.getElement();
			el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode);
		}
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require popup.js
// @require hbox.js
// @require vbox.js

// WARNING: this is all hairy stuff.  Don't mess with it.

function DlMenuBase() {
	if (this._isMenuBase)
		return;
	this._isMenuBase = true;
	this._items = [];

	var self = this;
	function onNamedItemSelect(name, item, args) {
		var widget = args ? args.widget : null;
		if (!this._noClose)
			DlPopupMenu.clearAll();
		self.applyHooks.delayed(1, self, "onSelect", [ this.name, this, widget ]);
	};

	// whatever container we are in, we patch the appendWidget function
	// (which will presumably used to append items) in order to keep an
	// array of menu items.
	var orig_appendWidget = this.appendWidget;
	this.appendWidget = function(w) {
		if (w instanceof DlMenuItem) {
			this._items.push(w);
			if (w.name != null)
				w.addEventListener("onSelect", onNamedItemSelect);
		}
		orig_appendWidget.apply(this, Array.$(arguments));
	};

	this.getItemByName = function(name) {
		return this._items.grep_first(function(item) {
			return item.name && item.name == name;
		});
	};

	this.getItemById = function(name) {
		return this._items.grep_first(function(item) {
			return item.__itemId && item.__itemId == name;
		});
	};

	if (this instanceof DlHbox) {
		this._popupAlign = {
			prefer: "Br",
			fallX1: "_r",
			fallX2: "_l",
			fallY1: "B_",
			fallY2: "T_"
		};
	} else {
		this._popupAlign = {
			prefer: "bR",
			fallX1: "_R",
			fallX2: "_L",
			fallY1: "b_",
			fallY2: "t_"
		};
	}

 	this._getDlPopup = function() {
		var p = this.getParent(DlPopupMenu), l = 0, ret;
		if (p)
			l = p._level + 1;
		ret = DlPopupMenu.get(l);
		ret.detachPopup();
		if (p) {
			ret.attachToPopup(p);
		}
		return ret;
 	};

// 	this.getLevel = function() {
// 		var lvl = 0;
// 		var m = this;
// 		while (m.parentMenu) {
// 			lvl++;
// 			m = m.parentMenu;
// 		}
// 		return lvl;
// 	};

	this.getToplevelMenu = function() {
		var m = this;
		while (m.parentMenu)
			m = m.parentMenu;
		return m;
	};

// 	var foo = 0;
// 	this.debug = function() {
// 		var txt = [ foo++ ];
// 		var m = this;
// 		while (m) {
// 			txt.unshift(m.id);
// 			m = m.parentMenu;
// 		}
// 		window.status = txt.join(" => ");
// 	};
};

DEFINE_CLASS("DlPopupMenu", DlPopup, function(D, P) {

        D.CONSTRUCT = function() {
                this._mouseDiff = { x: 2, y: 1 }; // for context menus
        };

	function onMouseEnter() {
		this.cancel();
		var args = this.args;
	};

// 	function onMouseLeave() {
// 		var args = this.args;
// 	};

	D.onBeforePopup = function(args) {
		if (!args.isContext) {
			args.item.currentPopup = this;
			args.item._popupVisible = true;
			args.menu._popupVisible = true;
			args.item.activateSubmenu(true);
		} else {
			//args.widget.currentPopup = this;
			if (args.widget.activateSubmenu)
				args.widget.activateSubmenu(true);
		}
		var content = args.content;
		if (content instanceof Function)
			args.content = content = content.call(this);
		content.parentMenu = args.isContext
			? args.widget
			: args.menu;
		if (content instanceof DlWidget && content.hasHooks("onPopup"))
			content.applyHooks("onPopup", [ args ]);
	};

	D.onHide = function(args, callback) {
		if (!args.isContext) {
			args.item.activateSubmenu(false);
			args.item.currentPopup = null;
			args.item._popupVisible = false;
			args.menu._popupVisible = false;
                        var content = args.content;
                        if (content instanceof DlWidget && content.hasHooks("onHide"))
                                content.applyHooks("onHide", [ args ]);
			content.parentMenu = null;
		} else {
			//args.widget.currentPopup = null;
			if (args.widget.activateSubmenu)
				args.widget.activateSubmenu(false);
		}
		if (callback)
			callback.call(this, args);
	};

	P.popup = function(args) {
		if (!args.onBeforePopup)
			args.onBeforePopup = D.onBeforePopup;
		if (!args.onHide)
			args.onHide = D.onHide;
 		else
 			args.onHide = D.onHide.$(this, args, args.onHide);
		D.BASE.popup.call(this, args);
	};

	P._setListeners = function() {
		D.BASE._setListeners.call(this);
		// tricky, note that we add 2 listeners for onHide
		this.addEventListener({ onMouseEnter  : onMouseEnter
//					onMouseLeave  : onMouseLeave
// 					onHide        : onHide
// 					onBeforePopup : onBeforePopup
				      });
	};

	// this should align a submenu to have the first item (or
	// last, depending on how it's positioned) aligned with its
	// parent item.
	P.correctPos = function(p) {
		var args = this.args;
		try {
			if (!args.isContext && !args.scrollVisible) {
 				var m1 = args.menu;
 				if (m1 && (m1 instanceof DlVMenu)) {
// 					var diff = args.content._widgets[0].getPos().y -
// 						args.content.parent.getPos().y;

					var diff = args.content._widgets[0].getPos().y -
						args.content.parent.getElement().offsetTop;

					// FIXME: just in case we screw up big, let's drop the whole idea.
					if (Math.abs(diff) < 50) {
						if (args.fallY)
							p.y += diff;
						else
							p.y -= diff;
					}
 				}
			}
		} catch(ex) {};
	};

});

/* DlHMenu */

DEFINE_CLASS("DlHMenu", DlHbox, function(D, P) {

        D.CONSTRUCT = DlMenuBase;

        D.DEFAULT_EVENTS = [ "onSelect", "onPopup" ];

});

/* DlVMenu */

DEFINE_CLASS("DlVMenu", DlVbox, function(D, P) {

        D.CONSTRUCT = DlMenuBase;

        D.DEFAULT_EVENTS = [ "onSelect", "onPopup" ];

});

DEFINE_CLASS("DlMenuItem", DlContainer, function(D, P, DOM) {

        D.CONSTRUCT = function() {
                if (!this.parentMenu)
			this.parentMenu = this.parent;
        };

        D.DEFAULT_EVENTS = [ "onSelect" ];

	D.DEFAULT_ARGS = {
		label      : [ "label"	   , "DlMenuItem" ],
		_iconClass : [ "iconClass" , null ],
		_noClose   : [ "noClose"   , false ],
		parentMenu : [ "menu"	   , null ],
		name       : [ "name"	   , null ],
		__itemId   : [ "id"        , null ]
	};

	P._inBaseMenu = function() {
		return !this.parentMenu.parentMenu;
	};

	P._createElement = function() {
		D.BASE._createElement.call(this);
		var el = this.getElement();
		el.innerHTML = '<div class="div1"><div class="div2"></div></div>';
		this.setIconClass(this._iconClass);
		this._iconClass = null;
		this.setUnselectable();
		if (this.label)
			this.setContent(this.label);
	};

	P.getContentElement = function() {
		return this.getElement().firstChild.firstChild;
	};

	P._getDlPopup = function() {
		return this.parentMenu._getDlPopup();
	};

	function onMouseEnter() {
                this.scrollIntoView();
		this.addClass("DlMenuItem-hover", "DlMenuItem-active");
		var base = this._inBaseMenu();
 		if (!base || this.parentMenu._popupVisible) {
			if (this._menu) {
				this._popupMenu(base ? 0 : 250);
			} else if (base) {
				this._getDlPopup().hide(100);
			}
		}
	};

	function onMouseLeave() {
		this.delClass("DlMenuItem-hover");
		this.delClass("DlMenuItem-active");
		var base = this._inBaseMenu();
		if (!base)
			this._getDlPopup().hide(100);
	};

	function onMouseUp() {
		this.delClass("DlMenuItem-active");
		if (this.hasHooks("onSelect")) {
			var args = DlPopupMenu.get(0).args;
			if (!this._noClose)
				DlPopupMenu.clearAll();
			this.applyHooks.delayed(1, this, "onSelect", [ this.name, this, args ]);
		}
	};

	function onMouseDown() {
		this.addClass("DlMenuItem-active");
		this._popupMenu(0);
		DlException.stopEventBubbling();
	};

	function onDestroy() {
		if (this._menu instanceof DlWidget) {
			this._menu.destroy();
			this._menu = null;
		}
	};

	P._popupMenu = function(timeout) {
		if (this._menu && !this._popupVisible) {
			var pm = this.parentMenu;
			var p = this._getDlPopup();
			if (p.visible)
				p.hide();
			p.popup({ timeout	 : timeout,
				  content	 : this.getMenu(),
				  anchor	 : this.getElement(),
				  align		 : pm._popupAlign,
				  item		 : this,
				  menu           : this.parentMenu,
				  onPopup        : this._onPopup,
				  onHide         : this._onHide
				});
// 		} else if (!this._menu) {
// 			this._getDlPopup().hide(100);
		}
	};

	P._setListeners = function() {
		D.BASE._setListeners.call(this);
		this.addEventListener({ onMouseEnter  : onMouseEnter,
					onMouseLeave  : onMouseLeave,
					onMouseDown   : onMouseDown,
					onMouseUp     : onMouseUp,
					onDestroy     : onDestroy
				      });
	};

	P.getMenu = function() {
//		var menu = this._menu;
// 		if (typeof menu == "function")
// 			menu = menu();
//		return menu;
		return this._menu;
	};

	P.setMenu = function(menu, onPopup, onHide) {
		if (this._menu instanceof DlWidget)
			this._menu.destroy();
		if (menu instanceof DlWidget)
			menu.ref();
		this._menu = menu;
		this._onPopup = onPopup;
		this._onHide = onHide;
		DOM.condClass(this.getElement().firstChild, menu, "DlMenuItem-withPopup");
	};

	P.activateSubmenu = function(act) {
		this.condClass(act, "DlMenuItem-popped");
		//this.condClass(act, "DlMenuItem-hover");
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require hbox.js
// @require button.js
// @require popupmenu.js

DEFINE_CLASS("DlButtonMenu", DlHbox, function(D, P) {

        D.CONSTRUCT = DlMenuBase;

        D.DEFAULT_EVENTS = [ "onSelect", "onPopup", "onHide", "onClick" ];

        D.DEFAULT_ARGS = {
                label      : [ "label", null ],
                _iconClass : [ "iconClass", null ],
                _shiftMenu : [ "shiftMenu", null ],
                _connected : [ "connected", false ]
        };

        P.ALIGN = {
                prefer: "Br",
                fallX1: "_r",
                fallX2: "_l",
                fallY1: "B_",
                fallY2: "T_"
        };

        P.activateSubmenu = function(activate) {
                this._mainBtn.condClass(activate, "DlButton-1");
                this._menuBtn.condClass(activate, "DlButton-1");
        };

        P._createElement = function() {
                D.BASE._createElement.call(this);
                this._mainBtn = new DlButton({ parent    : this,
                                               focusable : false,
                                               label     : this.label,
                                               className : "LabelPart",
                                               noCapture : this._connected,
                                               iconClass : this._iconClass });
                this._mainBtn.connectEvents("onClick", this);
                this._menuBtn = new DlButton({ parent    : this,
                                               focusable : false,
                                               label     : "&nbsp;",
                                               className : "MenuArrow",
                                               noCapture : true });
                this._menuBtn.getElement().parentNode.style.width = "3px";
                this._menuBtn.getContentElement().className = "MenuArrow-inner";
                if (this._connected)
                        this._mainBtn.connectEvents("onMouseDown", this._menuBtn);

                // err, why did I need that?
//              if (!is_gecko) {
//                      // Gecko has a stupid bug, oh my dear, oh my dear
//                      this._menuBtn.getElement().style.overflow = "hidden";
//              }
                this._mainBtn.connectEvents([ "onMouseEnter", "onMouseLeave" ], this._menuBtn);

                this._menuBtn.addEventListener("onMouseDown", this._do_popupMenu.$(this));
                this.addEventListener("onDestroy", this.setMenu.$(this, null));
        };

        P._do_popupMenu = function(ev) {
                if (!this._popupVisible) {
                        var p = this._getContextMenuPopup();
                        p.popup({ timeout   : 0,
                                  content   : this.getMenu(),
                                  align     : this.ALIGN,
                                  anchor    : this.getTableElement(),
                                  isContext : true,
                                  widget    : this,
                                  shift     : this._shiftMenu,
                                  onHide    : this.callHooks.$(this, "onHide")
                                });
                        if (ev instanceof DlEvent)
                                ev._justFocusedWidget = p;
                        this.callHooks("onPopup");
                }
        };

        P.getMenu = function() {
                return this._menu;
        };

        P.getButton = function() { return this._mainBtn; };
        P.getArrow = function() { return this._menuBtn; };

        P.setMenu = function(menu) {
                if (this._menu instanceof DlWidget)
                        this._menu.destroy();
                if (menu instanceof DlWidget)
                        menu.ref();
                this._menu = menu;
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require jslib.js

var DlElementCache = {
	get : function(tag) {
		return this[tag].cloneNode(true);
	}
};

(function(){

        var CE  = DynarchDomUtils.createElement,
            ID  = Dynarch.ID,
            C   = DlElementCache;

        // generic <tbody><tr><td>
        (function(){
	        var TBODY_RC = document.createDocumentFragment();
	        CE("td", null, null,
	           CE("tr", null, null,
	              CE("tbody", null, null, TBODY_RC)));
	        C.TBODY_RC = TBODY_RC;
        })();

        // dialog shadows (might be useful for other widgets as well)
        (function(){
	        var SHADOWS = document.createDocumentFragment();
	        CE("div", null, { className: "Shadow Shadow-TL" }, SHADOWS);
	        CE("div", null, { className: "Shadow Shadow-T" }, SHADOWS);
	        CE("div", null, { className: "Shadow Shadow-TR" }, SHADOWS);
	        CE("div", null, { className: "Shadow Shadow-L" }, SHADOWS);
	        CE("div", null, { className: "Shadow Shadow-R" }, SHADOWS);
	        CE("div", null, { className: "Shadow Shadow-BL" }, SHADOWS);
	        CE("div", null, { className: "Shadow Shadow-B" }, SHADOWS);
	        CE("div", null, { className: "Shadow Shadow-BR" }, SHADOWS);
	        C.SHADOWS = SHADOWS;
        })();

        // calendar
        (function(){
	        var STATIC_ROW = CE("tr");
                var STATIC_CELL = CE("td", null, null, STATIC_ROW);
	        (6).times(function(){
		        STATIC_ROW.appendChild(STATIC_CELL.cloneNode(true));
	        });
	        C.CAL_HEAD = CE("thead");
	        C.CAL_HEAD.appendChild(STATIC_ROW.cloneNode(true));
	        var STATIC_BODY = C.CAL_BODY = CE("tbody");
	        (6).times(function(){
		        STATIC_BODY.appendChild(STATIC_ROW.cloneNode(true));
	        });
        })();

        // dragbar
        C.DRAGGING_LINE = CE("div", null, { className: "DlResizeBar-DraggingLine" });

        // UPDATE: the trash is no longer used, and this only slows
        // down decent browsers, while probably not doing anything
        // good for IE.
        //
        // DlEvent.atUnload(function(){
        //         // cleanup
        //         var trash = DynarchDomUtils.trash();
        //         for (var i in C) {
        //                 var el = C[i];
        //                 if (!(el instanceof Function)) {
        //                         trash.appendChild(C[i]);
        //                         delete C[i];
        //                         el = C[i] = null;
        //                 }
        //         }
        //         C = DynarchDomUtils.CE_CACHE; // cleanup the createElement cache as well.
        //         for (var i in C) {
        //                 var el = C[i];
        //                 if (el !== trash) {
        //                         trash.appendChild(C[i]);
        //                         delete C[i];
        //                         el = C[i] = null;
        //                 }
        //         }
        //         trash.innerHTML = "";
        //         if (is_ie)
        //                 trash.outerHTML = "";
        //         delete DynarchDomUtils.CE_CACHE["_trash"];
        //         DynarchDomUtils.CE_CACHE._trash = null;
        //         C = null;
        // });

})();

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require widget.js
// @require elementcache.js

DEFINE_CLASS("DlCalendar", DlWidget, function(D, P, DOM) {

        var CE = DOM.createElement,
            AC = DOM.addClass,
            DC = DOM.delClass,
            CC = DOM.condClass;

	/**
	 * EVENT DOCS:
	 *
	 *    onChange -- called when the calendar display has been changed,
	 *    such as when the month/year is changing.  No args.
	 *
	 *    onSelect(cleared, otherMonth, secondClick) -- called when a date
	 *    is selected, but also upon onChange.  Upon onChange the selection
	 *    is cleared, so the "cleared" arg will be true.  "otherMonth" is
	 *    true a date from an adjacent month was clicked.  "secondClick" is
	 *    true when an already selected date was clicked.
	 *
	 */

        D.FIXARGS = function(args) {
                args.tagName = "table";
                this._dayNamesOn = -1;
                this._selectedDate = args.date && args.selected ? args.date.getDate() : 0;
        };

        D.CONSTRUCT = function() {
                if (!this._noinit)
			this.init();
        };

        D.DEFAULT_EVENTS = [ "onSelect", "onChange", "onRendered" ];

	D.DEFAULT_ARGS = {
		firstDay        : [ "firstDay"       , Date.getFirstDayOfWeek() ],
		fixedFirstDay   : [ "fixedFirstDay"  , true ],
		_weekNumbers    : [ "weekNumbers"    , false ],
		date            : [ "date"           , null ],
		selected        : [ "selected"       , true ],
		_navigation     : [ "navigation"     , 2 ],
		_navDisabled    : [ "navDisabled"    , false ],
		_omDisabled     : [ "omDisabled"     , false ],
		_noinit         : [ "noinit"         , false ],
		_withMenu       : [ "withMenu"       , false ],
                _disableHandler : [ "disableHandler" , Function.returnFalse ],
                _cal_tooltip    : [ "dayTooltip"     , null ],
                _infoDates      : [ "infoDates"      , null ],
                __tooltip       : [ "tooltip"        , getTooltip ]
	};

	P._createElement = function() {
		D.BASE._createElement.call(this);
		var trs, i, tr, td,
			table = this.getElement(),
                	tbody = DlElementCache.get("CAL_BODY");
		table.cellSpacing = table.cellPadding = table.border = 0;
		table.appendChild(DlElementCache.get("CAL_HEAD"));
		table.appendChild(tbody);
		if (this._weekNumbers) {
			trs = table.getElementsByTagName("tr");
			for (i = trs.length; --i >= 0;) {
				tr = trs[i];
				td = CE("td", null, { className: "DlCalendar-WeekNumber" });
				tr.insertBefore(td, tr.firstChild);
			}
		}
		tr = CE("tr");
		td = CE("td", null, null, tr);
		tr.className = "DlCalendar-Navigation";
		if (this._navigation == 0) {
			td.colSpan = this.getNCols();
			this._makeNavPart(td, 0);
		} else {
			var td1 = CE("td", null, null, tr);
			var td2 = CE("td", null, null, tr);
			if (this._navigation == 1) {
				td1.colSpan = this.getNCols() - 2;
				this._makeNavPart(td1, 0,
						  td, -1,
						  td2, 1);
			} else if (this._navigation == 2) {
				var td3 = CE("td", null, null, tr);
				var td4 = CE("td", null, null, tr);
				td2.colSpan = this.getNCols() - 4;
				this._makeNavPart(td2, 0,
						  td, -2,
						  td1, -1,
						  td3, 1,
						  td4, 2);
			}
		}
		i = table.rows[0];
		i.parentNode.insertBefore(tr, i);
		this.setUnselectable();

		if (this._withMenu)
			this._createQuickNavMenu();
	};

	var MENU = null;
	function getMenu() {
		if (!MENU) {
			MENU = new DlVMenu({});
			MENU.setStyle("textAlign", "center");
			new DlMenuItem({ parent: MENU, label: DlTEXTS.goToday, name: "today", noClose: true });
			MENU.addSeparator();

			var year = new DlSpinner({ parent: MENU, size: 4 });
 			year.addEventListener("onChange",
					      function() {
						      if (!year.validationError)
							      MENU.calendar.setYear(year.getValue());
					      });

			year.getElement().align = "center";
			MENU.addSeparator();
			(12).times(function(i){
				new DlMenuItem({ parent  : MENU,
						 label   : Date.getMonthName(i),
						 name    : i,
						 noClose : true });
			});

			MENU.addEventListener("onPopup",
					      function(args) {
						      this.calendar = args.widget;
						      year.setValue(this.calendar.date.getFullYear());
						      year.focus.$(year).delayed(5);
					      });

			MENU.addEventListener("onSelect",
					      function(mon) {
						      if (mon == "today") {
							      this.calendar.setToday();
						      } else {
							      this.calendar.setMonth(mon);
							      this.calendar.setYear(year.getValue());
						      }
						      MENU.getParent(DlPopup).hide();
					      });
		}
		return MENU;
	};

	P._createQuickNavMenu = function() {
		this.setContextMenu(getMenu);
	};

	P._makeNavPart = function() {
		for (var td, type, i = 0; i < arguments.length; ++i) {
			td = arguments[i++];
			type = arguments[i];
			td._navType = type;
			switch (type) {
			    case -2:
				//td.innerHTML = "«";
				td.className = "PrevYear";
				break;
			    case -1:
				//td.innerHTML = "‹";
				td.className = "PrevMonth";
				break;
			    case 0:
				td.className = "Month";
                                this.refNode("_monthTD", td);
				break;
			    case 1:
				//td.innerHTML = "›";
				td.className = "NextMonth";
				break;
			    case 2:
				//td.innerHTML = "»";
				td.className = "NextYear";
				break;
			}
		}
	};

	P.getNCols = function() {
		return this._weekNumbers ? 8 : 7;
	};

	P.getTableElement = function() {
		return this.getElement();
	};

	P._displayDayNames = function() {
		var td, today = new Date(), todayWD = today.getDay(),
			dnrow = this.getTableElement().getElementsByTagName("tr")[1],
			i = this._weekNumbers ? 1 : 0,
			j = this.firstDay;
		dnrow.className = "DlCalendar-DayNames";
		while (td = dnrow.cells[i++]) {
			td._firstDay = j % 7;
			CC(td, j == todayWD, "Today");
			td.innerHTML = Date.getDayName(j++, true);
			CC(td, Date.isWeekend(td._firstDay), "WeekEnd");
		}
		this._dayNamesOn = this.firstDay;
		if (this._weekNumbers) {
			td = dnrow.cells[0];
			td.innerHTML = "w";
			td._week = -1;
			td.className = "WeekNumber";
		}
	};

	P._displayCalendar = function() {
		var today = new Date(),
			TY = today.getFullYear(),
			TM = today.getMonth(),
			TD = today.getDate();

		this._selectedTD = null;

		if (this._dayNamesOn != this.firstDay)
			this._displayDayNames();
		var date = new Date(this.date);
		date.setHours(12);
		var month = date.getMonth();
		var mday = date.getDate();
		var year = date.getFullYear();
		var no_days = date.getMonthDays();

		this._monthTD.innerHTML = String.buffer(
			"<b>",
			Date.getMonthName(month, this._navigation == 2),
			"</b> ", year
		).get();

		// calendar voodoo for computing the first day that would actually be
		// displayed in the calendar, even if it's from the previous month.
		// WARNING: this is magic. ;-)
		date.setDate(1);
		var day1 = (date.getDay() - this.firstDay) % 7;
		if (day1 < 0)
			day1 += 7;
		date.setDate(-day1);
		date.setDate(date.getDate() + 1);

		// var row = this.getTableElement().getElementsByTagName("tr")[2];
		var row = this.getTableElement().rows[2];

		var cells = this._cells = [];
                var di = this._displayedInterval = {};
                var tmp;

		for (var i = 0; i < 6; ++i, row = row.nextSibling) {
			row.className = "Dates";
			var cell = row.firstChild;
			if (this._weekNumbers) {
				cell.className = "WeekNumber";
				cell.innerHTML = cell._week = date.getWeekNumber();
				cell = cell.nextSibling;
			}
			var iday;
			for (var j = 0; j < 7; ++j, cell = cell.nextSibling, date.setDate(iday + 1)) {
				var wday = date.getDay();
                                var cn = [];
				cell._iday = iday = date.getDate();
				cell._month = date.getMonth();
				cell._year = date.getFullYear();
                                cell._info = null;
                                tmp = { y: cell._year,
                                        m: cell._month,
                                        d: cell._iday };
                                if (this._infoDates) {
                                        var str = tmp.y + "-" + (1 + tmp.m).zeroPad(2) + "-" + tmp.d.zeroPad(2);
                                        var id = this._infoDates[str];
                                        if (id) {
                                                cell._info = id;
                                                cn.push(id.className || "DlCalendar-infoDay");
                                        }
                                }
                                if (!di.start)
                                        di.start = tmp;
				if ((cell._otherMonth = (month != tmp.m))) {
					cn.push("OtherMonth");
                                        cells[iday + (iday > 15 ? 100 : 200)] = cell;
				} else {
					if (month == TM && iday == TD && TY == tmp.y)
						cn.push("Today");
					if (this._selectedDate == iday) {
						this._selectCell(cell);
                                                cn.push("Selected");
                                        }
					cells[iday] = cell;
				}
				if (wday == 0 || wday == 6)
					cn.push("WeekEnd");
                                cell.disabled = this._disableHandler(date, cn, cell);
				cell.innerHTML = this.getDayHTML(iday);
                                cell.className = cn.join(" ");
			}
		}
                di.end = tmp;

                this.applyHooks("onRendered", [ this ]);
	};

        P.getDayHTML = Function.identity;

	P.getDateCell = function(date) {
		return this._cells[date];
	};

        P.getDisplayedInterval = function() {
                return this._displayedInterval;
        };

	P.selectDate = function(date, nohooks) {
		if (date instanceof Date) {
			if (!date.dateEqualsTo(this.date, true)) {
				this.date = new Date(date);
				this.init();
			}
			date = date.getDate();
		}
		this._selectCell(this.getDateCell(date), !nohooks);
	};

        P.clearSelection = function() {
                this._selectedDate = null;
                if (this._initialized) {
                        this._displayCalendar();
                }
        };

	function onMouseOver(ev) {
		this._clearTimer();
		var cell = ev.getParentElement("td", this);
		if (cell) {
			if (this._currentHover) {
				DC(this._currentHover, "hover");
				DC(this._currentHover, "rolling");
				this._currentHover = null;
                                DlWidget.getTooltip().hide();
			}
			if (cell._navType != null && this._navDisabled)
				return;
			if (cell._otherMonth && this._omDisabled)
				return;
			if ((cell._firstDay != null && this.fixedFirstDay) || cell._week != null)
				return;
                        if (cell.disabled)
                                return;
			AC(cell, "hover");
			this._currentHover = cell;
                        if (this.__tooltip)
                                this._popupTooltip();
		}
	};

	function onMouseLeave(ev) {
		this._clearTimer();
		if (this._currentHover) {
			DC(this._currentHover, "hover");
			DC(this._currentHover, "rolling");
			this._currentHover = null;
		}
	};

	P.setYear = function(y) {
		if (y != this.date.getFullYear()) {
			this.date.setFullYear(y);
			this.init();
		}
	};

	P.setMonth = function(m) {
		if (m != this.date.getMonth()) {
			this.date.setMonth(m);
			this.init();
		}
	};

	P.setToday = function() {
		var today = new Date();
                this._selectedDate = 0;
		this.date = today;
		this.init();
	};

	P._navCellClicked = function(cell, timeout, ev) {
		AC(cell, "rolling");
		this._selectedDate = 0;
		// FIXME: not sure this is good
		var d = this.date;
		if (cell._navType != 0)
			d.setDate(1);
		switch (cell._navType) {
		    case 0:
			if (this._withMenu) {
				this.applyHooks("onContextMenu", [ ev ]);
			} else {
				var today = new Date();
				if (d.dateEqualsTo(today, true))
					return;
				this.date = today;
			}
			break;
		    case -2:
			d.setFullYear(d.getFullYear() - 1);
			break;
		    case -1:
			d.setMonth(d.getMonth() - 1);
			break;
		    case 1:
			d.setMonth(d.getMonth() + 1);
			break;
		    case 2:
			d.setFullYear(d.getFullYear() + 1);
			break;
		}
		// this.init.$(this).delayed(1);
		this.init();
		this.applyHooks("onChange", [ cell._navType ]);
		this.applyHooks("onSelect", [ true, cell._navType, null, d ]);
		if (timeout && cell._navType != 0) {
			++this._timerStep;
			this._timer = setTimeout(
				this._navCellClicked.$(
					this,
					cell,
					this._timerStep > 4 ? 50 : 100),
				timeout);
		}
	};

	P._clearTimer = function() {
		if (this._timer)
			clearTimeout(this._timer);
		this._timer = null;
		this._timerStep = 0;
	};

	function onClick(ev) {
		onMouseOver.call(this, ev);
		var cell = ev.getParentElement("td", this);
		if (!cell)
			return;
		if (ev.button != 0 && (cell._navType != null || cell._otherMonth))
			return;
		if (cell._otherMonth && this._omDisabled || cell.disabled)
			return;
		if (cell._navType != null && ev.dl_type == "onMouseDown") {
			this._navDisabled ||
				this._navCellClicked(cell, cell._navType != 0 ? 350 : 0, ev);
		} else if (cell._year != null && ev.dl_type == "onMouseUp") {
			var d = this.date;
			d.setFullYear(cell._year, cell._month, cell._iday);
			var old_date = this._selectedDate;
			this._selectedDate = cell._iday;
			if (cell._otherMonth) {
				this.init();
				this.applyHooks("onSelect", [ false, true, false, d ]);
			} else if (old_date != this._selectedDate) {
				this._selectCell(cell, true);
			} else {
				this.applyHooks("onSelect", [ false, false, true, d ]);
			}
		} else if (cell._firstDay != null && !this.fixedFirstDay && ev.button == 0 && ev.dl_type == "onMouseDown") {
			this.firstDay = cell._firstDay;
			this._displayCalendar();
		}
	};

	P._selectCell = function(cell, hooks) {
		this._selectedDate = cell._iday;
		if (this._selectedTD) {
			DC(this._selectedTD, "Selected");
			DC(this._selectedTD.parentNode, "Selected");
		}
		this._selectedTD = cell;
		AC(cell, "Selected");
		AC(cell.parentNode, "Selected");
		DC(cell, "hover");
		if (hooks)
			this.applyHooks("onSelect", [ false, false, false, this.date ]);
	};

	P._setListeners = function() {
		D.BASE._setListeners.call(this);
		this.addEventListener({ onMouseOver  : onMouseOver,
					onMouseLeave : onMouseLeave,
					onMouseUp    : onClick,
					onMouseDown  : onClick });
	};

        P.setInfoDates = function(a) {
                this._infoDates = a;
                if (this._initialized)
                        this._displayCalendar();
        };

        // called in the context of the DlTooltip object
        function getTooltip() {
                var cal = this.args.widget, di, td;
                td = cal._currentHover;
                if (td)
                        di = td._info;
                td = cal._cal_tooltip;
                return td ?
                        td.call(cal, di)
                        : di
                        ? di.tooltip
                        : null;
        };

	P.init = function() {
		if (!this.date)
			this.date = new Date();
		this._displayCalendar();
                this._initialized = true;
	};

        P.setSize = P.setOuterSize = function(sz) {
                D.BASE.setOuterSize.call(this, { x: sz.x != null ? sz.x + 2 : null,
                                                 y: sz.y });
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require buttonmenu.js
// @require calendar.js

DEFINE_CLASS("DlButtonCalendar", DlButtonMenu, function(D, P){

	D.DEFAULT_ARGS = {
		dateFormat     : [ "dateFormat"   , "%Y/%m/%d" ],
		_calendarArgs  : [ "calendar"     , {} ],
                _iconClass     : [ "iconClass"    , "IconCalendar" ],
		date           : [ "date"         , "Select date..." ]
	};

        D.DEFAULT_EVENTS = [ "onSelect", "onCalendarRendered" ];

	function calendar_onSelect(cal, cleared, otherMonth) {
		if (!cleared) {
			this.getButton().setContent(cal.date.print(this.dateFormat));
			DlPopup.clearAllPopups();
			this.date = new Date(cal.date);
			this.applyHooks("onSelect", [ this.date ]);
		}
	};

	function button_onClick(ev) {
		if (this.date instanceof Date) {
			var cal = this.getCalendar();
			if (!cal.date.dateEqualsTo(this.date)) {
				cal.date = new Date(this.date);
				cal._selectedDate = this.date.getDate();
				cal.init();
			}
		}
		this.getArrow().applyHooks("onMouseDown", [ ev ]);
	};

	P.getCalendar = function() {
		var cal = this._calendar;
		if (!cal) {
			this._calendarArgs.noinit = true;
			cal = this._calendar = new DlCalendar(this._calendarArgs);
			this.addEventListener("onDestroy", cal.destroy.$(cal));
			cal.addEventListener("onSelect", calendar_onSelect.$(this, cal));
                        cal.connectEvents("onRendered", this, "onCalendarRendered");
			if (this.date instanceof Date)
				cal.date = new Date(this.date);
			cal.init();
		}
		return this._calendar;
	};

	P.initDOM = function() {
		D.BASE.initDOM.call(this);
		var b = this.getButton();
		if (this.date instanceof Date)
			b.label(this.date.print(this.dateFormat));
		else
			b.label(this.date);
		this.setMenu(this.getCalendar.$(this));
		b.addEventListener("onClick", button_onClick.$(this));
	};

        P.getValue = function() {
                return this.date instanceof Date ? this.date : null;
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require buttonmenu.js

DEFINE_CLASS("DlButtonColorPicker", DlButtonMenu, function(D, P, DOM) {

	D.CONSTRUCT = function() {
		this._events_cp = {
			onSelect     : onSelect.$(null, this),
			onHueChange  : onHueChange.$(null, this),
			onHover      : onHover.$(null, this),
			onHoverOut   : onLeave.$(null, this)
		};
		this._updateValues();
	};

	D.DEFAULT_ARGS = {
		rgb   : [ "rgb", null ],
		hsv   : [ "hsv", null ],
		color : [ "color", null ]
	};

	function onSelect(btn, rgb, hsv, color, brightness) {
		var div = btn.getColorElement();
		div.style.backgroundColor = color;
		btn.hsv = Array.$(hsv);
		btn._updateValues();
		DlPopup.clearAllPopups();
// 		var dark = DlColor.RGB2color(DlColor.HSV2RGB(DlColor.darker(hsv)));
// 		var lite = DlColor.RGB2color(DlColor.HSV2RGB(DlColor.brighter(hsv)));
// 		div.style.borderTopColor = div.style.borderLeftColor = dark;
// 		div.style.borderBottomColor = div.style.borderRightColor = lite;
		btn.applyHooks("onSelect", [ rgb, hsv, color, brightness ]);
	};

	function onHover(btn, rgb, hsv, color, brightness) {
		btn.getColorElement().style.backgroundColor = color;
	};

	function onHueChange(btn, hue) {
		if (btn.hsv) {
			var hsv = [ hue, btn.hsv[1], btn.hsv[2] ];
			var color = DlColor.RGB2color(DlColor.HSV2RGB(hsv));
			btn.getColorElement().style.backgroundColor = color;
			btn.hsv = hsv;
			btn._updateValues();
		}
	};

	function onLeave(btn) {
		var div = btn.getColorElement();
		div.style.backgroundColor = btn.rgb ? DlColor.RGB2color(btn.rgb) : "";
	};

	P._updateValues = function() {
		if (this.hsv) {
			this.rgb = DlColor.HSV2RGB(this.hsv);
			this.color = DlColor.RGB2color(this.rgb);
		} else if (this.rgb) {
			this.hsv = DlColor.RGB2HSV(this.rgb);
			this.color = DlColor.RGB2color(this.rgb);
		} else if (this.color) {
			this.rgb = DlColor.color2RGB(this.color);
			this.hsv = DlColor.RGB2HSV(this.rgb);
		}
	};

	function _popupCP() {
		this._cp.addEventListener(this._events_cp);
		if (this.hsv)
			this._cp.setHSV(this.hsv);
	};
	function _hideCP() {
		this._cp.removeEventListener(this._events_cp);
	};

	P.setColorPicker = function(cp) {
		this._cp = cp;
		this.setMenu(cp);
		if (this.hsv) {
			cp.setHSV(this.hsv);
			onSelect.call(cp, this, this.rgb, this.hsv,
				      DlColor.RGB2color(this.rgb),
				      DlColor.RGBrightness(this.rgb));
		}
	};

	P._createElement = function() {
		D.BASE._createElement.call(this);
		var el = this.getButton().setContent([
                        "<table cellspacing='0' cellpadding='0'><tr><td>",
			"<div unselectable='on' class='ColorPart'>&nbsp;</div>",
			"</td><td></td></tr></table>"
                ].join(""));
		this.setLabel(this.label);
	};

	P.setLabel = function(label) {
		var div = this.getLabelElement();
		div.innerHTML = label || "";
		DOM.condClass(div, label, "Label", "EmptyLabel");
	};

	P.getColorElement = function() {
		return this.getButton().getContentElement().firstChild.rows[0].cells[0].firstChild;
	};

	P.getLabelElement = function() {
		return this.getButton().getContentElement().firstChild.rows[0].cells[1];
	};

	P._setListeners = function() {
		D.BASE._setListeners.call(this);
		this.addEventListener({
                        onPopup : _popupCP,
			onHide  : _hideCP
		});
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require eventproxy.js
// @require geometry.js

DEFINE_CLASS("DlCanvas", DlContainer, function(D, P, DOM){

        var MAX_Z = 100000;
        var THE_EVENTS = "onMouseMove onMouseDown onMouseUp onMouseEnter onMouseLeave onClick";
        var EX = DlException.stopEventBubbling;

        D.DEFAULT_ARGS = {
                width: [ "width", 100 ],
                height: [ "height", 100 ]
        };
        D.CONSTRUCT = function() {
                this._elements = [];
                this._activeEl = null;
                this._noUpdates = 0;
        };
        P.setMouseListeners = function() {
                THE_EVENTS.qw().foreach(function(ev){
                        if (this[ev] instanceof Function)
                                this.addEventListener(ev, this[ev]);
                }, this);
        };
        P._createElement = function() {
                D.BASE._createElement.apply(this, arguments);
                this.setContent("<canvas width='" + this.width + "' height='" + this.height + "'></canvas>");
        };
        P.getCanvas = function() {
                return this.getContentElement().firstChild;
        };
        P.getContext = function() {
                return this._context || this.refNode("_context", this.getCanvas().getContext('2d'));
        };
        P.withContext = function(cont) {
                cont(this.getContext());
        };
        P.withSavedContext = function(cont) {
                this.getContext().save();
                try {
                        return cont(this.getContext());
                } finally {
                        this.getContext().restore();
                }
        };
        P.setSize = function(size) {
                this.getCanvas().width = size.x;
                this.getCanvas().height = size.y;
                this.refresh();
                this.callHooks("onResize");
        };
        P.add = function(el) {
                this._elements.push(el);
                this.refresh();
        };
        P.clear = function() {
                var c = this.getCanvas();
                this.getContext().clearRect(0, 0, c.width, c.height);
        };
        P.refresh = function() {
                if (this._noUpdates == 0) {
                        this.clear();
                        this.getSortedElements().reverse().foreach(this.renderElement, this);
                }
        };
        P.getSortedElements = function() {
                var a = this._elements.mergeSort($cmp_zindex);
                if (this._activeEl)
                        a.unshift.apply(a, this._activeEl.handles());
                return a;
        };
        P.renderElement = function(el) {
                var ctx = this.getContext();
                ctx.save();
                el.render(ctx, this);
                ctx.restore();
        };
        P.withNoUpdates = function(cont) {
                ++this._noUpdates;
                try { return cont(); }
                finally { --this._noUpdates; }
        };

        // event handlers

        function mouseHandler(cont) {
                return function(ev) {
                        var pos = ev.computePos(this);
                        var ctx = this.getContext();
                        var args = [ pos.x, pos.y, ctx, this, ev ];
                        return cont.call(this, ev, pos, ctx, args);
                };
        };

        P.onMouseMove = mouseHandler(function(ev, pos, ctx, args) {
                this.getSortedElements().foreach(function(el){
                        if (el.pointInside(pos, ctx)) {
                                if (!el.__mouseInside) {
                                        el.__mouseInside = true;
                                        el.applyHooks("onMouseEnter", args);
                                }
                                el.applyHooks("onMouseMove", args);
                        } else if (el.__mouseInside) {
                                el.__mouseInside = false;
                                el.applyHooks("onMouseLeave", args);
                        }
                }, this);
        });

        P.onMouseLeave = mouseHandler(function(ev, pos, ctx, args) {
                this.getSortedElements().foreach(function(el){
                        if (el.__mouseInside) {
                                el.__mouseInside = false;
                                el.applyHooks("onMouseLeave", args);
                        }
                }, this);
        });

        P.onMouseDown = mouseHandler(function(ev, pos, ctx, args) {
                var active_set = false;
                this.getSortedElements().foreach(function(el){
                        if (el.pointInside(pos, ctx)) {
                                if (el instanceof D.Handle) {
                                        active_set = true;
                                }
                                else if (!active_set && el.activable()) {
                                        if (el !== this._activeEl) {
                                                if (this._activeEl)
                                                        this._activeEl.applyHooks("onActivate", [ false ]);
                                                el.applyHooks("onActivate", [ true ]);
                                                this._activeEl = el;
                                        }
                                        active_set = true;
                                }
                                el.applyHooks("onMouseDown", args);
                                $BREAK();
                        }
                }, this);
                if (!active_set) {
                        if (this._activeEl) {
                                this._activeEl.applyHooks("onActivate", [ false ]);
                                this._activeEl = null;
                                this.refresh();
                        }
                } else {
                        this.refresh();
                }
        });

        P.onMouseUp = mouseHandler(function(ev, pos, ctx, args) {
                this.getSortedElements().foreach(function(el){
                        if (el.pointInside(pos, ctx))
                                el.applyHooks("onMouseUp", args);
                }, this);
        });

        P.onClick = mouseHandler(function(ev, pos, ctx, args) {
                this.getSortedElements().foreach(function(el){
                        if (el.pointInside(pos, ctx))
                                el.applyHooks("onClick", args);
                }, this);
        });

        D.make_movable = make_movable;
        D.make_resizable = make_resizable;

        /* -----[ supporting classes ]----- */

        D.Element = DEFINE_CLASS(null, DlEventProxy, function(D, P){
                D.CONSTRUCT = function() {
                        this._zIndex = 0;
                };
                D.DEFAULT_EVENTS = (THE_EVENTS + " onActivate").qw();
                P.pointInside = function(p, ctx) {
                        ctx.save();
                        this.setMyPath(ctx);
                        ctx.restore();
                        return ctx.isPointInPath(p.x, p.y);
                };
                P.handles = function() {
                        return [];
                };
                P.activable = function() {
                        return false;
                };
                P.setClipPath = function(ctx) {
                        this.setMyPath(ctx);
                };
                P.zIndex = function(z) {
                        if (z != null) this._zIndex = z;
                        return this._zIndex;
                };
        });

        D.Rect = DEFINE_CLASS(null, D.Element, function(D, P){
                D.CONSTRUCT = function(x, y, w, h) {
                        this._p1 = new DlPoint(x, y);
                        this._p2 = new DlPoint(x + w, y + h);
                        this.normalize();
                };
                P.normalize = function() {
                        this._p1.normalize(this._p2);
                };
                P.rectangle = function() {
                        return new DlRect(this._p1, this._p2);
                };
                P.left = function(x) {
                        if (x != null) {
                                this._p1.x = x;
                                this.normalize();
                        }
                        return this._p1.x;
                };
                P.top = function(y) {
                        if (y != null) {
                                this._p1.y = y;
                                this.normalize();
                        }
                        return this._p1.y;
                };
                P.right = function(x) {
                        if (x != null) {
                                this._p2.x = x;
                                this.normalize();
                        }
                        return this._p2.x;
                };
                P.bottom = function(y) {
                        if (y != null) {
                                this._p2.y = y;
                                this.normalize();
                        }
                        return this._p2.y;
                };
                P.hcenter = function() {
                        return (this.left() + this.right()) / 2;
                };
                P.vcenter = function() {
                        return (this.top() + this.bottom()) / 2;
                };
                P.width = function(w) {
                        return Math.abs(this._p2.x - this._p1.x);
                };
                P.height = function(h) {
                        return Math.abs(this._p2.y - this._p1.y);
                };
                P.getPos = function() {
                        return this._p1;
                };
                P.setPos = function(x, y) {
                        if (x != null) {
                                var dx = x - this._p1.x;
                                this._p1.x = x;
                                this._p2.x += dx;
                        }
                        if (y != null) {
                                var dy = y - this._p1.y;
                                this._p1.y = y;
                                this._p2.y += dy;
                        }
                };
                P.setMyPath = function(ctx) {
                        ctx.beginPath();
                        ctx.translate(this.hcenter(), this.vcenter());
                        //ctx.rotate(Math.PI / 10);
                        var w = this.width(), h = this.height();
                        var w2 = w / 2, h2 = h / 2;
                        ctx.rect(-w2, -h2, w, h);
                        ctx.closePath();
                };
                P.render = function(ctx) {
                        ctx.fillStyle = "#ffffff";
                        ctx.strokeStyle = "#000000";
                        this.setMyPath(ctx);
                        ctx.fill();
                        ctx.stroke();
                };
        });

        D.Ellipse = DEFINE_CLASS(null, D.Rect, function(D, P){
                function ellipse(ctx, x, y, w, h) {
                        var kappa = .5522848,
                        ox = (w / 2) * kappa, // control point offset horizontal
                        oy = (h / 2) * kappa, // control point offset vertical
                        xe = x + w,           // x-end
                        ye = y + h,           // y-end
                        xm = x + w / 2,       // x-middle
                        ym = y + h / 2;       // y-middle

                        ctx.moveTo(x, ym);
                        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
                        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
                        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
                        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
                };
                P.setMyPath = function(ctx) {
                        ctx.beginPath();
                        ctx.translate(this.hcenter(), this.vcenter());
                        var w = this.width(), h = this.height();
                        var w2 = w / 2, h2 = h / 2;
                        ellipse(ctx, -w2, -h2, w, h);
                        ctx.closePath();
                };
        });

        function make_movable(self) {
                self.registerEvents([ "onMove" ]);
                self._dragHandlers = {
                        onMouseMove: doDrag,
                        onMouseUp: stopDrag,
                        onMouseOver: EX,
                        onMouseOut: EX,
                        onMouseEnter: EX,
                        onMouseLeave: EX
                };
                self.addEventListener({
                        onMouseDown: startDrag,
                });

                function startDrag(x, y, ctx, cw, ev) {
                        self.dragging = true;
                        self.ctx = ctx;
                        self.cw = cw;
                        var pos = self.getPos();
                        self._dragDiff = {
                                x: pos.x - x,
                                y: pos.y - y
                        };
                        DlEvent.captureGlobals(self._dragHandlers);
                        ev.domStop = true;
                };

                function stopDrag() {
                        DlEvent.releaseGlobals(self._dragHandlers);
                        self.dragging = false;
                        self.cw.refresh();
                        self.cw = null;
                        self.ctx = null;
                        self._dragPos = null;
                };

                function doDrag(ev) {
                        var pos = ev.computePos(self.cw);
                        pos = {
                                x: pos.x + self._dragDiff.x,
                                y: pos.y + self._dragDiff.y
                        };
                        self.setPos(pos.x, pos.y);
                        self.applyHooks("onMove", [ pos ]);
                        self.cw.refresh();
                        EX();
                };
        };

        function make_resizable(self) {
                self._handles = {};
                make_movable(self);
                self.addEventListener({
                        onActivate: function(active){
                                if (!active) {
                                        Array.hashKeys(this._handles).map("destroy");
                                        this._handles = {};
                                } else {
                                        createHandles();
                                }
                        },
                        onMove: function() {
                                updateHandles();
                        }
                });

                function createHandles() {
                        makeHandle(self, "TL", function(){ return [ self.left()    , self.top()     ] });
                        makeHandle(self, "T" , function(){ return [ self.hcenter() , self.top()     ] });
                        makeHandle(self, "TR", function(){ return [ self.right()   , self.top()     ] });
                        makeHandle(self, "L" , function(){ return [ self.left()    , self.vcenter() ] });
                        makeHandle(self, "R" , function(){ return [ self.right()   , self.vcenter() ] });
                        makeHandle(self, "BL", function(){ return [ self.left()    , self.bottom()  ] });
                        makeHandle(self, "B" , function(){ return [ self.hcenter() , self.bottom()  ] });
                        makeHandle(self, "BR", function(){ return [ self.right()   , self.bottom()  ] });
                };

                function updateHandles() {
                        Object.foreach(self._handles, function(h){
                                h.update();
                        });
                };

                self.handles = function() {
                        return Array.hashValues(this._handles);
                };

                self.activable = function() {
                        return true;
                };

                function makeHandle(self, type, getpos) {
                        var pos = getpos();
                        var handle = new Handle(pos[0], pos[1]);
                        handle.update = function() {
                                var pos = getpos();
                                this.setPos(pos[0], pos[1]);
                        };
                        self._handles[type] = handle;
                        handle.addEventListener("onMove", MOVE_HANDLE[type]);
                        return handle;
                };

                var MOVE_HANDLE = {
                        TL: function(pos) {
                                self.left(pos.x);
                                self.top(pos.y);
                                updateHandles();
                        },
                        T: function(pos) {
                                self.top(pos.y);
                                updateHandles();
                        },
                        TR: function(pos) {
                                self.right(pos.x);
                                self.top(pos.y);
                                updateHandles();
                        },
                        L: function(pos) {
                                self.left(pos.x);
                                updateHandles();
                        },
                        R: function(pos) {
                                self.right(pos.x);
                                updateHandles();
                        },
                        BL: function(pos) {
                                self.left(pos.x);
                                self.bottom(pos.y);
                                updateHandles();
                        },
                        B: function(pos) {
                                self.bottom(pos.y);
                                updateHandles();
                        },
                        BR: function(pos) {
                                self.right(pos.x);
                                self.bottom(pos.y);
                                updateHandles();
                        }
                };
        };

        // a Handle is that little black thingy that you drag in order
        // to resize a rectangle, for example.  They could be useful
        // for various other stuff.

        var Handle = D.Handle = DEFINE_CLASS(null, D.Element, function(D, P){
                var DIM_COLOR = "rgba(0, 0, 0, 0.5)";
                var STRONG_COLOR = "#5500ff";
                var HOVER_COLOR = "rgba(255, 0, 0, 0.5)";
                D.CONSTRUCT = function(x, y, sz) {
                        var self = this;
                        make_movable(self);
                        self._point = new DlPoint(x, y);
                        self._size = sz || 4;
                        self.addEventListener({
                                onMouseEnter: function(x, y, ctx, cw) {
                                        cw.withSavedContext(function(ctx){
                                                ctx.strokeStyle = STRONG_COLOR;
                                                ctx.fillStyle = HOVER_COLOR;
                                                self.setMyPath(ctx);
                                                ctx.fill();
                                                ctx.stroke();
                                        });
                                },
                                onMouseLeave: function(x, y, ctx, cw) {
                                        cw.withSavedContext(function(ctx){
                                                self.setClipPath(ctx);
                                                ctx.clip();
                                                cw.refresh();
                                        });
                                }
                        });
                };
                P.setMyPath = function(ctx) {
                        ctx.beginPath();
                        ctx.arc(this._point.x, this._point.y, this._size, 0, 2 * Math.PI, true);
                        ctx.closePath();
                };
                P.setClipPath = function(ctx) {
                        ctx.beginPath();
                        ctx.rect(this._point.x - this._size - 1,
                                 this._point.y - this._size - 1,
                                 this._size * 2 + 2,
                                 this._size * 2 + 2);
                        ctx.closePath();
                };
                P.render = function(ctx) {
                        ctx.fillStyle = this.dragging ? STRONG_COLOR : DIM_COLOR;
                        this.setMyPath(ctx);
                        ctx.fill();
                };
                P.zIndex = function() {
                        return MAX_Z;
                };
                P.setPos = function(x, y) {
                        if (x != null) this._point.x = x;
                        if (y != null) this._point.y = y;
                };
                P.getPos = function() {
                        return this._point;
                };
        });

        /* -----[ other utilities ]----- */

        function $cmp_zindex(a, b) {
                return b.zIndex() - a.zIndex();
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require button.js

DEFINE_CLASS("DlCheckbox", DlAbstractButton, function(D, P) {

        D.DEFAULT_ARGS = {
	        _classes : [ "classes", { active    : "DlCheckbox-active",
				          hover     : "DlCheckbox-hover",
				          checked   : "DlCheckbox-1",
				          unchecked : "DlCheckbox-0",
				          empty     : "DlCheckbox-empty",
				          disabled  : "DlCheckbox-disabled"
				        } ]
        };

        D.FIXARGS = function(args) {
                args.type = DlButton.TYPE.TWOSTATE;
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

var DlColor = {

	// thanks http://www.cs.rit.edu/~ncs/color/t_convert.html and google
	// for the following 2 algorithms

	// note that the values must be floating point numbers between 0 and 1
	RGB2HSV : function(rgb) {
		var r = rgb[0], g = rgb[1], b = rgb[2];
		var min, max, delta, h, s, v;
		min = Math.min(r, g, b);
		max = Math.max(r, g, b);
		v = max;
		delta = max - min;
		if (max != 0) {
			s = delta / max;
			if (r == max)
				h = (g - b) / delta;
			else if (g == max)
				h = 2 + (b - r) / delta;
			else
				h = 4 + (r - g) / delta;
			h *= 60;
			if (h < 0)
				h += 360;
		} else {
			s = 0;
			h = -1;
		}
		return [h, s, v];
	},

	HSV2RGB : function(hsv) {
		var h = hsv[0], s = hsv[1], v = hsv[2];
		var i, r, g, b, f, p, q, t;
		if (s == 0)
			r = g = b = v;
		else {
			h /= 60;
			i = Math.floor(h);
			f = h - i;
			p = v * (1 - s);
			q = v * (1 - s * f);
			t = v * (1 - s * (1 - f));
			switch (i) {
			    case 0  : r = v; g = t; b = p; break;
			    case 1  : r = q; g = v; b = p; break;
			    case 2  : r = p; g = v; b = t; break;
			    case 3  : r = p; g = q; b = v; break;
			    case 4  : r = t; g = p; b = v; break;
			    default : r = v; g = p; b = q; break;
			}
		}
		return [r, g, b];
	},

	RGB2bytes : function(rgb) {
		var b = new Array(3);
		b[0] = Math.round(rgb[0] * 255);
		b[1] = Math.round(rgb[1] * 255);
		b[2] = Math.round(rgb[2] * 255);
		return b;
	},

	RGB2color : function(rgb) {
		return String.buffer("rgb(",
				     rgb[0] * 100, "%,",
				     rgb[1] * 100, "%,",
				     rgb[2] * 100, "%)").get();
	},

	RGB2hex : function(rgb) {
		rgb = DlColor.RGB2bytes(rgb);
		return rgb[0].hex(2) + rgb[1].hex(2) + rgb[2].hex(2);
	},

	color2RGB : function(color) {
		var r = 0, g = 0, b = 0;
		if (/^#/.test(color)) {
			if (color.length == 4)
				color = color.replace(/([a-f0-9])/ig, "$1$1");
			r = parseInt(color.substr(1, 2), 16) / 255;
			g = parseInt(color.substr(3, 2), 16) / 255;
			b = parseInt(color.substr(5, 2), 16) / 255;
		} else
			throw new DlException("Can't parse color: " + color);
		return [r, g, b];
	},

	brighter : function(hsv) {
		var a = Array.$(hsv);
		a[1] -= 0.5;
		if (a[1] < 0)
			a[1] = 0;
		return a;
	},

	darker : function(hsv) {
		var a = Array.$(hsv);
		a[2] -= 0.5;
		if (a[2] < 0)
			a[2] = 0;
		return a;
	},

	// And that's from here: http://juicystudio.com/article/luminositycontrastratioalgorithm.php.
	// It returns a float value between 0 and 1 that determines how bright the given color is
	// If the returned value is > 0.6, I would use black to contrast.  White otherwise.
	RGBrightness : function(rgb) {
		return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
	}

};

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require container.js

DEFINE_CLASS("DlColorPickerHSV", DlWidget, function(D, P, DOM){

        var DC = DOM.delClass,
            CC = DOM.condClass;

        D.DEFAULT_EVENTS = [ "onSelect", "onHover", "onHoverOut", "onHueChange" ];

        var HTML = String.buffer(
                "<table cellspacing='1' cellpadding='0' border='0'>",
                "<tbody>",
                "<tr>",
                "<td></td>".repeat(11),
                "<td rowspan='11' class='DlColorPickerHSV-Sep'></td>",
                "<td rowspan='11' class='DlColorPickerHSV-HSV' hueCell='1'>",
                "<div class='DlColorPickerHSV-HSV-bar'></div>",
                "</td>",
                "</tr>",
                ("<tr>" + "<td></td>".repeat(11) + "</tr>").repeat(10),
                "</tbody></table>"
        ).get();

	P.getHueBarElement = function() {
		return this.getElement().rows[0].cells[12].firstChild;
	};

	P._createElement = function() {
		D.BASE._createElement.call(this, HTML);
		this.setUnselectable();
	};

	function getTD(ev) {
		var el = ev.target;
		try {
			while (el && el.tagName.toLowerCase() != "td")
				el = el.parentNode;
		} catch(ex) {
			el = null;
		}
		return el;
	};

	function onMouseUp(ev) {
		var td = getTD(ev);
		if (!td)
			return;
		if (td.rgb) {
			this.applyHooks("onSelect",
					[ td.rgb, td.hsv,
					  td.style.backgroundColor,
					  DlColor.RGBrightness(td.rgb) ]);
		}
		throw new DlExStopEventBubbling;
	};

	function onMouseDown(ev) {
		var td = getTD(ev);
		if (!td)
			return;
		var isHue = td.getAttribute("hueCell");
		if (isHue) {
			ev.computePos(this);
			this._refresh(ev);
			DlEvent.captureGlobals(this._dragHandlers);
		}
		throw new DlExStopEventBubbling;
	};

	function onMouseOver(ev) {
		if (this._currentHover) {
			DC(this._currentHover, "hover1");
			DC(this._currentHover, "hover2");
		}
		var td = getTD(ev);
		if (td) {
			if (td.rgb) {
				this._currentHover = td;
				var br = DlColor.RGBrightness(td.rgb);
				CC(td, br > 0.6, "hover2", "hover1");
				this.applyHooks("onHover", [ td.rgb, td.hsv, td.style.backgroundColor, br ]);
			} else if (this._currentHover) {
				this.callHooks("onHoverOut");
				this._currentHover = null;
			}
		}
	};

	function onMouseLeave() {
		var el = this._currentHover;
		if (el) {
			DC(el, "hover1");
			DC(el, "hover2");
			this.callHooks("onHoverOut");
		}
		this._currentHover = null;
	};

	function stopDrag(ev) {
		DlEvent.releaseGlobals(this._dragHandlers);
		throw new DlExStopEventBubbling;
	};

	function doDrag(ev) {
		var pos = ev.computePos(this);
		var y = pos.y - 2;
		if (y < 0)
			y = 0;
		else if (y > 119)
			y = 119;
 		this.getHueBarElement().style.top = y + "px";
		if (this.__cphsvTimeout)
			clearTimeout(this.__cphsvTimeout);
		this.__cphsvTimeout = this._refresh.$(this, ev).delayed(5);
		throw new DlExStopEventBubbling;
	};

	P.initDOM = function() {
		D.BASE.initDOM.call(this);
		this.addEventListener({ onMouseUp     : onMouseUp,
					onMouseDown   : onMouseDown,
					onMouseOver   : onMouseOver,
					onMouseLeave  : onMouseLeave });
		this._dragHandlers = {
		    onMouseMove  : doDrag.$(this),
		    onMouseUp    : stopDrag.$(this),
		    onMouseOver  : DlException.stopEventBubbling,
		    onMouseOut   : DlException.stopEventBubbling,
		    onMouseEnter : DlException.stopEventBubbling,
		    onMouseLeave : DlException.stopEventBubbling
		};
		this._redraw(360);
	};

	P._refresh = function(ev) {
		var y = Math.limit(ev.relPos.y - 2, 0, 119);
		var hue = Math.round((1 - y / 120) * 360);
		hue = this._redraw(hue);
		this.applyHooks("onHueChange", [ hue ]);
 		this.__cphsvTimeout = null;
	};

	P.setHSV = function(hsv) {
		this._redraw(hsv[0]);
	};

	P._redraw = function(hue) {
		var i, c, j, cells,
			div = this.getHueBarElement(),
			table = this.getElement(),
			rows = table.rows,
			di = rows.length - 1,
			dj = rows[0].cells.length - 3;
		div.style.top = (120 - hue / 3) + "px";
		if (hue == 360)
			hue = 0;
		for (i = di; i >= 0; --i) {
			cells = rows[i].cells;
			for (j = dj; j >= 0; --j) {
				c = cells[j];
				c.hsv = [ hue, 1 - i / di, j / dj ];
				c.rgb = DlColor.HSV2RGB(c.hsv);
				c.style.backgroundColor = DlColor.RGB2color(c.rgb);
			}
		}

		return hue;
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require widget.js

DEFINE_CLASS("DlEntry", DlContainer, function(D, P, DOM) {

        var CE = DOM.createElement;

        D.FIXARGS = function(args) {
                args.tagName = "table";
                this._isTextArea = args.type == "textarea";
        };

        D.DEFAULT_EVENTS = [ "onChange",
                             "onKey-ENTER",
                             "onKey-ESCAPE",
                             "onValidationError",
                             "onValidation",
                             "onPaste",
                             "onCopy",
                             "onCut" ];

        D.DEFAULT_ARGS = {
                _domType    : [ "type"       , "text" ],
                _value      : [ "value"      , null ],
                _size       : [ "size"       , null ],
                _rows       : [ "rows"       , null ],
                _readonly   : [ "readonly"   , false ],
                _emptyText  : [ "emptyText"  , "" ],
                _emptyValue : [ "emptyValue" , "" ],
                _width      : [ "width"      , null ],
                _name       : [ "name"       , null ],
                _validators : [ "validators" , [] ],
                _allowEmpty : [ "allowEmpty" , null ],
                _focusable  : [ "focusable"  , 2 ],
                _maxlen     : [ "maxlength"  , null ],
                _noSelect   : [ "noSelect"   , false ],
                _trim       : [ "trim"       , false ],
                _noWrap     : [ "noWrap"     , false ] // only for textareas
        };

        P.validate = function(val) {
                if (val == null)
                        val = this.getValue(true);
                if (this._allowEmpty != null) {
                        if (!/\S/.test(val)) {
                                this.condClass(!this._allowEmpty, "DlEntry-ValidationError");
                                this.applyHooks("onValidation", [ !this._allowEmpty ]);
                                return this._allowEmpty;
                        }
                }
                var a = this._validators, i, v, err = false;
                for (i = 0; i < a.length; ++i) {
                        v = a[i];
                        if (!v.ok(val)) {
                                err = v.getError() || true;
                                break;
                        }
                }
                if (v && !err)
                        this.setValue(v.getLastVal(), true);
                this.validationError = err;
                if (!this._noSelect && this._focused && !this.readonly() && this._domType != "textarea")
                        this.select();
                // alert(err + " \n " + this._validators.length);
                this.condClass(err, "DlEntry-ValidationError");
                this.applyHooks("onValidation", [ err ]);
                if (err) {
                        this.setInvalidTooltip(err.message);
                        this.applyHooks("onValidationError", [ err ]);
                }
                return !err;
        };

        P.setInvalidTooltip = function(tt) {
                this._invalidTooltip.setTooltip(tt);
        };

        P.timerFocus = function(timeout) {
                return this.focus.clearingTimeout(timeout || 10, this);
        };

        P.select = function() {
                try {
                        if (is_gecko)
                                this.setSelectionRange(0, this.getValue(true).length);
                        else
                                this.getInputElement().select();
                } catch(ex) {}
        };

        P.focus = function() {
                this.getInputElement().focus();
                if (!this._noSelect && !this.readonly() && this._domType != "textarea")
                        this.select();
        };

        P.blur = function() {
                this.getInputElement().blur();
        };

        function element_focus() {
                this.addClass("DlEntry-Focus");
                this._focused = true;
                D.BASE.focus.call(this);
                if (this._isEmpty) {
                        this.getInputElement().value = "";
                        this.delClass("DlEntry-empty");
                        this._isEmpty = false;
                }
        };

        function element_blur() {
                this.delClass("DlEntry-Focus");
                this._focused = false;
                D.BASE.blur.call(this);
                this.__setEmpty();
        };

        function element_change() {
                if (!this.destroyed) {
                        this.__setEmpty();
                        this.callHooks("onChange");
                }
        };

        P.__setEmpty = function(value) {
                if (value == null)
                        value = this.getInputElement().value;
                this._isEmpty = this.__checkEmpty(value);
                if (!this._isEmpty) {
                        this.delClass("DlEntry-empty");
                } else if (!this._focused) {
                        this.addClass("DlEntry-empty");
                        this.getInputElement().value = "";
                } else {
                        this.getInputElement().value = value;
                }
                return this._isEmpty;
        };

        P.__checkEmpty = function(value) {
                if (value == null)
                        value = this.getInputElement().value;
                return value === "";
        };

        P._createElement = function() {
                D.BASE._createElement.apply(this, arguments);
                var el = this.getElement();
                el.appendChild(DlElementCache.get("TBODY_RC"));
                el.cellSpacing = el.cellPadding = el.border = 0;
                el = el.rows[0].cells[0];
                el.className = "DlEntry-cell";
                var input = this._isTextArea
                        ? document.createElement("textarea")
                        : input = document.createElement("input");
                input.id = this.id + "-input";
                input.setAttribute("autocomplete", "off", 1);
                if (this._noWrap)
                        input.setAttribute("wrap", "off");
                if (this._isTextArea) {
                        if (this._rows)
                                input.rows = this._rows;
                }
                if (this._maxlen != null)
                        input.setAttribute("maxlength", this._maxlen);
                switch (this._domType) {
                    case "password":
                    case "file":
                    case "hidden":
                        input.type = this._domType;
                }
                if (is_gecko && gecko_version < 1.9 && !this._no_gecko_bug)
                        el = CE("div", null, { className: "Gecko-Bug-226933" }, el);
                el = CE("div", { position: "relative", overflow: "hidden" }, null, el); // XXX: this is becoming quite sucky!
                if (this._emptyText) {
                        CE("label", null, {
                                htmlFor   : this.id + "-input",
                                className : "DlEntry-emptyText",
                                innerHTML : this._emptyText.htmlEscape()
                        }, el);
                }
                el.appendChild(input);
                this.refNode("_invalidTooltip", new DlWidget({
                        className  : "DlEntry-invalidIcon",
                        parent     : this,
                        appendArgs : el
                }));
        };

        P.getInputElement = function() {
                return this.getElement().getElementsByTagName(this._isTextArea ? "textarea" : "input")[0];
        };

        P.getContentElement = P.getInputElement; // ALIAS

        P.setIfEmpty = function(value, nocall) {
                if (this._isEmpty && value)
                        this.setValue(value, nocall);
        };

        P.isEmpty = function() {
                return this.__checkEmpty();
        };

        P.setValue = function(value, nocall) {
                if (!this.__setEmpty(value)) {
                        if (this._maxlen != null)
                                value = String(value).substr(0, this._maxlen);
                        var el = this.getInputElement();
                        el.value = value;
                        el.defaultValue = value;
                }
                if (!nocall)
                        this.callHooks("onChange");
        };

        P.isDirty = function() {
                var el = this.getInputElement();
                return el.value != el.defaultValue;
        };

        P.clear = function(nocall) {
                this.setValue("", nocall);
                return this;
        };

        P.getValue = function(real) {
                var val = !real && this.isEmpty() ? this._emptyValue : this.getInputElement().value;
                if (this._trim && typeof val == "string")
                        val = val.trim();
                return val;
        };

        P.getSelectionRange = function() {
                return DOM.getSelectionRange(this.getInputElement());
        };

        P.setSelectionRange = function(start, end) {
                DOM.setSelectionRange(this.getInputElement(), start, end);
        };

        P.moveEOF = function() {
                var l = this.getValue(true).length;
                this.setSelectionRange(l, l);
        };

        P.moveBOF = function() {
                this.setSelectionRange(0, 0);
        };

        P.collapse = function(atStart) {
                var p = this.getSelectionRange();
                p = atStart ? p.start : p.end;
                this.setSelectionRange(p, p);
        };

        P.insertReplacingSelection = function(text, select) {
                var r = this.getSelectionRange();
                var v = this.getValue();
                this.setValue(v.substr(0, r.start) + text + v.substr(r.end));
                this.setSelectionRange(r.start, select ? r.start + text.length : r.start);
        };

        function onChange() {
                this.validate();
        };

        function onKeyPress(ev) {
                //if (ev.keyCode in DlKeyboard.KEYS_CONTROL)
                //this.__setEmpty();
                this._isEmpty = false;
                if (ev.keyCode == DlKeyboard.ENTER) {
                        this.applyHooks("onKey-ENTER", [ ev ]);
                } else if (ev.keyCode == DlKeyboard.ESCAPE) {
                        this.applyHooks("onKey-ESCAPE", [ ev ]);
                }
        };

        P.initDOM = function() {
                D.BASE.initDOM.call(this);
                var input = this.getInputElement();
                DOM.addEvent(input, { focus   : this._on_element_focus = element_focus.$(this),
                                      blur    : this._on_element_blur = element_blur.$(this),
                                      change  : this._on_element_change = element_change.clearingTimeout(10, this) });
                this.addEventListener({ onChange   : onChange,
                                        onKeyPress : onKeyPress });
                if (this._value != null)
                        this.setValue(this._value, true);
                else
                        this.clear(true);
                if (this._width != null)
                        input.style.width = this._width;
                else if (this._size != null)
                        // input.size = this._size;
                        // input.style.width = this._size * 15 + "px";
                        this.setSize({ x: this._size * 9 + 7 - this._size });
                if (this._name != null)
                        input.name = this._name;
                this.readonly(this._readonly);
        };

        P.readonly = function(readonly) {
                var input = this.getInputElement();
                if (readonly != null) {
                        input.readOnly = readonly;
                        readonly
                                ? input.setAttribute("readonly", true, 1)
                                : input.removeAttribute("readonly");
                        this.condClass(readonly, "DlEntry-Readonly");
                }
                return input.getAttribute("readonly");
        };

        P.disabled = function(v, force) {
                var isDisabled = D.BASE.disabled.call(this, v, force);
                if (v != null)
                        this.getInputElement().disabled = !!v;
                return isDisabled;
        };

        P.setSize = P.setOuterSize = function(size) {
                var input = this.getInputElement()
                , x = size.x, y = size.y
                , tpb = DOM.getPaddingAndBorder(this.getElement())
                , ipb = DOM.getPaddingAndBorder(input)
                , sb = this._btn ? this._btn.getSize().x : 0;
                if (sb) {
                        DOM.setOuterSize(input, size.x - tpb.x - ipb.x - sb + 2); // XXX: fuzz factor = 2
                } else {
                        if (x != null)
                                x -= ipb.x + 4;
                        if (y != null)
                                y -= ipb.y + 4;
                        if (this._domType != "textarea")
                                y = null;
                        DOM.setInnerSize(input, x, y);
                        if (x != null) {
                                x += 8;
                                DOM.setInnerSize(this.getElement(), x);
                        }
                }
        };

        P._makeButton = function(label, iconClass, className, classes) {
                if (!classes && !className) {
                        className = "DlEntry-dropDownBtn";
                        classes = {
                                hover  : "DlEntry-dropDownBtn-hover",
                                active : "DlEntry-dropDownBtn-active"
                        };
                }
                var td = CE("td", null, null, this.getElement().rows[0]);
                return this._btn = new DlAbstractButton({
                        parent     : this,
                        appendArgs : td,
                        label      : label,
                        iconClass  : iconClass,
                        className  : className,
                        classes    : classes
                });
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require entry.js

DEFINE_CLASS("DlCompletionEntry", DlEntry, function(D, P, DOM) {

        D.DEFAULT_EVENTS = [ "onCompletion", "onSelect" ];

	D.DEFAULT_ARGS = {
                __timeout  : [ "timeout"   , 500    ],
                _shiftMenu : [ "shift"     , null   ],
                __smart    : [ "smart"     , true   ],
                __noTab    : [ "noTab"     , false  ],
                _noSelect  : [ "noSelect"  , true   ],
                _sizeToFit : [ "sizeToFit" , false  ],
                _electric  : [ "electric"  , true   ]
	};

	P.ALIGN = {
		prefer: "Br",
		fallX1: "_r",
		fallX2: "_L",
		fallY1: "B_",
		fallY2: "T_"
	};

	P._setListeners = function() {
		this.__on_itemHover = on_itemHover.$(null, this);
		this.__on_itemSelect = on_itemSelect.$(null, this);
		D.BASE._setListeners.call(this);
		this.addEventListener({
                        onKeyDown  : onKeyDown,
			onBlur     : onBlur,
			onDestroy  : this.__clearTimer // XXX: not working fine.
		});
	};

	P._hideMenu = function() {
		_getPopup().hide(50);
		this.__clearTimer();
	};

	P.__clearTimer = function() {
		if (this.__timer)
			clearTimeout(this.__timer);
		this.__timer = null;
	};

	var POPUP = null;
	function _getPopup() {
		if (!POPUP) {
			POPUP = DlCompletionPopup.get();
		}
		return POPUP;
	};

	var MENU = null;
	var ITEM = null;
	function _getMenu() {
		if (MENU) {
			ITEM = null;
			MENU.destroy();
		}
		return MENU = new DlVMenu({});
	};

	function _menuVisible() {
		return MENU && MENU.parent.visible;
	};

	function on_itemHover(obj, ev) {
		var newitem = MENU.children().find(this);
		if (newitem != ITEM && ITEM != null)
			MENU.children(ITEM).callHooks("onMouseLeave");
		ITEM = newitem;
                if (obj._electric || !ev)
                        obj._applyCompletion(this.userData);
	};

	function on_itemSelect(obj) {
		obj._hideMenu();
		obj._applyCompletion(this.userData, true);
		obj.applyHooks("onSelect", [ this.userData ]);
                obj.focus.delayed(0, obj);
	};

	P._applyCompletion = function(c, finish) {
		if (!c.nomodify || finish) {
			var r = this.getSelectionRange();
			var str = c.completion || c.label;
			if (finish && c.after)
				str += c.after;
			var val = this.getValue();
			var start = c.start != null ? c.start : r.start;
			val = val.substr(0, start) + str + val.substr(r.end);
			this.setValue(val);
			r.end = start + str.length;
			if (c.rstart != null)
				r.start = c.rstart;
			if (c.noselect || finish)
				r.start = r.end;
			this.setSelectionRange(r);
		}
	};

        P._on_menuHide = function() {
                if (MENU) {
                        MENU.destroy();
                        MENU = null;
                        ITEM = null;
                }
        };

	P.completionReady = function(data) {
		if (this.__timer || this.__forced) {
			if (data != null && data.length > 0) {
				if (this.__smart && data.length == 1) {
					this._applyCompletion(data[0], true);
					this.applyHooks("onSelect", [ data[0] ]);
				} else {
					var mnu = _getMenu();
                                        var sel_item = null;
					data.foreach(function(c) {
						var w = new DlMenuItem({ parent	: mnu,
									 label	: c.label,
									 data	: c });
						w.addEventListener({ onSelect	  : this.__on_itemSelect,
								     onMouseEnter : this.__on_itemHover });
                                                if (c.selected)
                                                        sel_item = w;
					}, this);
					_getPopup().popup({ timeout    : 0,
							    content    : mnu,
							    align      : this.ALIGN,
							    anchor     : this.getElement(),
							    isContext  : true,
							    widget     : this,
                                                            onHide     : this._on_menuHide.$(this),
							    shift      : this._shiftMenu });
                                        if (this._sizeToFit) {
                                                var w = this.getSize().x;
                                                if (mnu.getSize().x < w)
                                                        mnu.setSize({ x: w - DOM.getPaddingAndBorder(_getPopup().getElement()).x });
                                        }
                                        if (sel_item)
                                                sel_item.callHooks("onMouseEnter");
					//mnu.children(0).callHooks("onMouseEnter");
				}
			}
		}
		this.cancelCompletion();
	};

	P.cancelCompletion = function() {
		this.delClass("DlCompletionEntry-busy");
		this.__clearTimer();
		this.__forced = null;
	};

	function __triggerCompletion(ev, forced) {
		this.__origData = { value: this.getValue(),
				    range: this.getSelectionRange() };
		this.__forced = forced;
		this.addClass("DlCompletionEntry-busy");
		this.applyHooks("onCompletion", [ this.getSelectionRange(), ev, forced ]);
	};

	function handleMenuKey(ev) {
		if (!_menuVisible())
			return false;
		var old_item = ITEM, w;
		switch (ev.keyCode) {

		    case DlKeyboard.ARROW_UP:
			if (ITEM == null)
				ITEM = 0;
			ITEM = MENU.children().rotateIndex(--ITEM);
			break;

		    case DlKeyboard.ARROW_DOWN:
		    case DlKeyboard.TAB:
			if (ITEM == null)
				ITEM = -1;
			ITEM = MENU.children().rotateIndex(++ITEM);
			break;

		    case DlKeyboard.ENTER:
                        if (ITEM != null) {
                                this.collapse(false);
                                MENU.children(ITEM).callHooks("onSelect");
                        }
			DlException.stopEventBubbling();

		    case DlKeyboard.ESCAPE:
			this._hideMenu();
			var d = this.__origData;
			if (d) {
				this.setValue(d.value);
				this.setSelectionRange(d.range);
			}
			DlException.stopEventBubbling();
		}

		if (old_item != ITEM) {
			if (old_item != null) {
				w = MENU.children(old_item);
				w.callHooks("onMouseLeave");
			}
			w = MENU.children(ITEM);
			w.callHooks("onMouseEnter");
			DlException.stopEventBubbling();
		} else {
			this._hideMenu();
		}
	};

	function onKeyDown(ev) {
		if (is_ie)
			return handleMenuKey.call(this, ev);
	};

        P._handle_focusKeys = function(ev) {
		if (!DlKeyboard.KEYS_CONTROL[ev.keyCode]) {
			this._hideMenu();
			if (this.__timeout != null)
				this.__timer = __triggerCompletion.delayed(this.__timeout, this, ev, false);
		} else if (!is_ie) {
			if (!this.__noTab && ev.keyCode == DlKeyboard.TAB && !_menuVisible() && !this.isEmpty()) {
				__triggerCompletion.call(this, ev, true);
                                ev.domStop = true;
                                DlException.stopEventBubbling();
			} else {
				return handleMenuKey.call(this, ev);
                        }
		}
                return D.BASE._handle_focusKeys.call(this, ev);
	};

	function onBlur() {
		this.cancelCompletion();
	};

	// helper completion handlers

	P.completeFromWords = function(words, args) {
		return D.completeFromWords.call(D, this, words, args);
	};

	D.completeFromWords = function(entry, words, args) {
		if (args == null)
			args = {};
		if (args.sep == null)
			args.sep = /\s+/g;
		return function(range) {
			var comp = [], val = entry.getValue(), pos = val.lastIndexOfRegexp(args.sep, range.start);
			val = val.substring(pos, range.start);
			if (val) {
				for (var i = 0; i < words.length; ++i)
					if (words[i].indexOf(val) == 0)
						comp.push({ label    : words[i],
							    noselect : args.noselect,
							    after    : args.addSep,
							    start    : pos });
			}
			if (comp.length > 0)
				entry.completionReady(comp);
			else
				entry.cancelCompletion();
		};
	};

});

DEFINE_CLASS("DlCompletionPopup", DlPopup, function(D, P) {
        D.FIXARGS = function(args) {
                args.zIndex = 1000;
                args.focusable = false;
        };
});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require completionentry.js

DEFINE_CLASS("DlComboBox", DlCompletionEntry, function(D, P){

        D.DEFAULT_ARGS = {
                _noSelect  : [ "noSelect"  , false  ],
                __smart    : [ "smart"     , false  ],
                __noTab    : [ "noTab"     , true   ],
                _options   : [ "options"   , null   ],
                _sizeToFit : [ "sizeToFit" , true   ],
                _electric  : [ "electric"  , false  ]
        };

        // P.ALIGN = {
	// 	prefer: "Bl",
	// 	fallX1: "_l",
	// 	fallX2: "_L",
	// 	fallY1: "B_",
	// 	fallY2: "T_"
	// };

        P._createElement = function() {
                D.BASE._createElement.apply(this, arguments);
                this._makeButton(null, null, "DlComboBox-dropDownBtn", {
                        hover: "DlComboBox-dropDownBtn-hover"
                }).addEventListener("onMouseDown", btnEvent.$(this));
                this.addEventListener("onCompletion", this.doCompletion);
        };

        P._on_menuHide = function() {
                D.BASE._on_menuHide.call(this);
                this._btn.delClass("DlComboBox-dropDownBtn-active");
        };

        function btnEvent(ev) {
                if (ev.button == 0) {
                        this._forcePopup();
                        DlException.stopEventBubbling();
                }
        };

        P._forcePopup = function() {
                this._btn.addClass("DlComboBox-dropDownBtn-active");
                this.__forced = true;
                this.doCompletion(null);
                this.focus.delayed(0, this);
        };

        P.doCompletion = function(range) {
                var val = "", comp = [];
                if (range) {
                        val = this.getValue().trim().toLowerCase();
                        if (!val)
                                return this.cancelCompletion();
                }
                var a = this._options;
                if (a instanceof Function) {
                        a = a.apply(this, arguments);
                        if (a == null)
                                return;
                }
                a.foreach(function(opt){
                        if (opt.toLowerCase().indexOf(val) == 0) {
                                comp.push({ label      : opt.htmlEscape(),
                                            start      : 0,
                                            completion : opt });
                        }
                });
                if (comp.length > 0)
                        this.completionReady(comp);
                else
                        this.cancelCompletion();
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require jslib.js

DEFINE_CLASS("DlDrag", DlEventProxy, function(D, P, DOM){

        D.DEFAULT_EVENTS = [ "onDrop", "onStartDrag" ];

	D.DEFAULT_ARGS = {
		delta	       : [ "delta"	   , 3 ],
		dragging       : [ "_dragging"	   , false ],
		draggingClass  : [ "draggingClass" , "DlWidget-dragging" ],
		_animArgs      : [ "animation"     , { length: 30, fps: 50 } ],
                cursor         : [ "cursor"        , { noDrop: "CURSOR-NO-DROP",
                                                       okDrop: "CURSOR-DROP" } ]
	};

	P.dropOK = function(widget, ev, target, inside) {
		this.target = target;
		return this.canDrop = true;
	};

	P._handleDrop = function(src, dest, pos) {
		this.applyHooks("onDrop", [ src, dest, pos ]);
	};

	P.doDrop = function(widget, ev) {
		throw new DlExAbstractBaseClass();
	};

	P.startOK = function(widget, ev) {
		return true;
	};

	P.moving = function(widget, ev) {};

	P.reset = function(wasCancel) {
		var el = this.elementCopy;
		if (el && el.parentNode) {
			if (wasCancel && this._animArgs) {
				var anim = new DlAnimation(this._animArgs.length, this._animArgs.fps);
				var pos = this.startElPos || this.startPos;
				var cpos = DOM.getPos(el);
				anim.addEventListener(
					{
						onUpdate : function() {
                                                        var y = this.getPos();
							el.style.left = y.mapInt(cpos.x, pos.x) + "px";
							el.style.top = y.mapInt(cpos.y, pos.y) + "px";
							DOM.setOpacity(el, this.t.map(1, 0.2));
						},
						onStop : function() {
                                                        DOM.trash(el);
							el = null;
						}
					}
				);
				anim.start(null, null, "accel_ab");
			} else
				el.parentNode.removeChild(el);
		}
		this.dragging = false;
		this.canDrop = false;
		this.target = null;
		this.elementCopy = null;
		this.startPos = null;
		this.source = null;
	};

	P.makeElementCopy = function(widget, ev) {
		var el = this.elementCopy;
		if (!el) {
			el = this.elementCopy = widget.getElement().cloneNode(true);
			DOM.addClass(el, "DlWidget-dragged-clone");
			el.style.top = ev.pos.y + "px";
			el.style.left = ev.pos.x + "px";
			document.body.appendChild(el);
			el.style.width = el.offsetWidth + "px";
			// el.style.height = el.offsetHeight + "px";
		}
		return el;
	};

});

DEFINE_CLASS("DlDragTreeItem", DlDrag, function(D, P){

	D.DEFAULT_ARGS = {
		_noReparent : [ "noReparent", false ]
	};

	var CLASS        = "DlTreeItem-dropTarget",
            CLASS_UPPER  = "DlTreeItem-dropTarget-upper",
            CLASS_LOWER  = "DlTreeItem-dropTarget-lower",
            CLASS_ALL_RE = /DlTreeItem-dropTarget[^\s]*/g,
            CLASS_POS_RE = /DlTreeItem-dropTarget-[^\s]*/g;

	function onExpander(ev) {
		return /DlTree-IconWidth/.test(ev.target.className);
	};

	P.startOK = function(widget, ev) {
		return !onExpander(ev);
	};

	P.dropOK = function(item, ev, obj, inside) {
 		while (obj && !(obj instanceof DlTreeItem))
 			obj = obj.parent;
		var ok = !inside && obj;
		if (ok)
			ok = !this._noReparent || item.parent === obj.parent;

		this.target = ok ? obj : null;
		this.canDrop = !!ok;

		if (this.oldTarget && this.oldTarget !== this.target)
			this.oldTarget.delClass(CLASS_ALL_RE);
		if (ok)
			this.target.addClass(CLASS);
		this.oldTarget = this.target;

		return ok;
	};

	P.doDrop = function(item, ev) {
		if (this._noReparent || onExpander(ev)) {
			var pos = this.target.getIndex();
			if (!this.dropBefore)
				++pos;
			this.target.parent.appendWidget(item, pos);
			this._handleDrop(item, this.target,
					 this.dropBefore ? "before" : "after");
		} else {
			if (this.target.getSubtreeWidget() !== item.parent) {
				this.target.addSubItem(item);
				this._handleDrop(item, this.target);
			}
		}
	};

	P.moving = function(item, ev) {
		var target = this.target;
		if (this.canDrop && target && (this._noReparent || onExpander(ev))) {
			var relPos = ev.computePos(target);
			var h = target.getDivElement().offsetHeight / 2;
			var upper = relPos.y <= h;
			target.condClass(upper, CLASS_UPPER, CLASS_LOWER);
			this.dropBefore = upper;
		} else if (target) {
			this.dropBefore = null;
			target.delClass(CLASS_POS_RE);
		}
	};

	P.reset = function() {
		if (this.target)
			this.target.delClass(CLASS_ALL_RE);
		if (this.oldTarget)
			this.oldTarget.delClass(CLASS_ALL_RE);
		D.BASE.reset.apply(this, arguments);
		this.oldTarget = null;
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require container.js

DEFINE_CLASS("DlLayout", DlContainer, function(D, P, DOM) {

	D.DEFAULT_ARGS = {
		_outerSpace : [ "outerSpace", 0 ],
		_fillParent : [ "fillParent", true ]
	};

	D.setFill = function(widget, fill) {
		var oldfill = widget._dllayout_args.fill;
		widget._dllayout_args.fill = fill;
		if (fill != oldfill)
			widget.parent.doLayout();
	};

	D.getArgs = function(widget) {
		return widget._dllayout_args;
	};

	P._appendWidgetElement = function(w, pos) {
                if (pos == null)
                        return D.BASE._appendWidgetElement.apply(this, arguments);
		var div = DOM.createElement("div", null, {
                        className: "DlLayout-positioned"
                }, this.getElement());
		if (pos.zIndex)
			div.style.zIndex = pos.zIndex;
		if (pos.overflow)
			div.style.overflow = pos.overflow;
		div.appendChild(w.getElement());
		w._dllayout_args = pos;
	};

	P._removeWidgetElement = function(w) {
		if (this._widgets.contains(w)) {
			var el = w.getElement(), p = el.parentNode;
			if (p) {
				p.parentNode.removeChild(p);
				p.removeChild(el);
			}
		}
	};

	P.packWidget = function(w, args) {
		this.appendWidget(w, args);
	};

        P.replaceWidget = function(w, other) {
                var pos = this._widgets.find(w);
                if (pos >= 0) {
                        if (other.parent)
                                other.parent.removeWidget(other);
                        this._widgets.splice(pos, 1, other);
                        other._dllayout_args = w._dllayout_args;
                        w._dllayout_args = null;
                        var el = w.getElement(), p = el.parentNode;
                        p.insertBefore(other.getElement(), el);
                        p.removeChild(el);
                        other.parent = this;
                        w.parent = null;
                }
        };

	P.doLayout = function() {
		var full_size = this.getInnerSize();
		var left, right, bottom, top;
		var OS = this._outerSpace;
		function reinit() {
			if (typeof OS == "number")
				left = right = bottom = top = OS;
			else if (OS instanceof Array) {
				top = OS[0];
				right = OS[1];
				bottom = OS[2];
				left = OS[3];
			} else {
				top = OS.top || 0;
				right = OS.right || 0;
				bottom = OS.bottom || 0;
				left = OS.left || 0;
			}
		};
		reinit();
		var wa = this._widgets;
		var info = new Array(wa.length);
		var margins = {};
		for (var i = 0; i < wa.length; ++i) {
			var w = wa[i];
                        var args = w._dllayout_args;
                        if (!args || !w.display())
                                continue;
			var div = w.getElement().parentNode;
			var space_before = args.before = args.before || 0;
			var space_after = args.after = args.after || 0;
			var fill = args.fill;
			if (args.resetSize) {
				w.getElement().style.height = "";
				w.getElement().style.width = "";
			}
			var ws = w.getOuterSize();
			switch (args.pos) {
			    case "top":
				top += space_before;
				if (fill == null)
					fill = ws.y;
				info[i] = {
					sy : fill
				};
				if (typeof fill == "number")
					top += fill;
				top += space_after;
				break;

			    case "right":
				right += space_before;
				if (fill == null)
					fill = ws.x;
				info[i] = {
					sx : fill
				};
				if (typeof fill == "number")
					right += fill;
				right += space_after;
				break;

			    case "bottom":
				bottom += space_before;
				if (fill == null)
					fill = ws.y;
				info[i] = {
					sy : fill
				};
				if (typeof fill == "number")
					bottom += fill;
				bottom += space_after;
				break;

			    case "left":
				left += space_before;
				if (fill == null)
					fill = ws.x;
				info[i] = {
					sx : fill
				};
				if (typeof fill == "number")
					left += fill;
				left += space_after;
				break;
			}
			info[i].w = w;
			info[i].args = args;
			info[i].div = div;
		}
		var remaining_x = full_size.x - left - right;
		var remaining_y = full_size.y - top - bottom;
		reinit();
		info.foreach(function(info, i){
                        if (!info)
                                $CONTINUE();
			var args = info.args;
			var w = info.w;
			if (!w.display())
				return;
			switch (args.pos) {
			    case "top":
			    case "bottom":
				if (typeof info.sy != "number") {
					if (info.sy == "*") {
						info.sy = remaining_y;
					} else if (/%/.test(info.sy)) {
						info.sy = Math.floor(parseFloat(info.sy) * remaining_y / 100);
					}
					if (args.min != null && info.sy < args.min)
						info.sy = args.min;
					if (args.max != null && info.sy > args.max)
						info.sy = args.max;
					remaining_y -= info.sy;
				}
				break;

			    case "left":
			    case "right":
				if (typeof info.sx != "number") {
					if (info.sx == "*") {
						info.sx = remaining_x;
					} else if (/%/.test(info.sx)) {
						info.sx = Math.floor(parseFloat(info.sx) * remaining_x / 100);
					}
					if (args.min != null && info.sx < args.min)
						info.sx = args.min;
					if (args.max != null && info.sx > args.max)
						info.sx = args.max;
					remaining_x -= info.sx;
				}
				break;
			}
			function doHAlign() {
			};
			function doVAlign() {
				var y = top;
				var h = full_size.y - top - bottom;
				var s = { x: info.sx };
				switch (args.valign) {
				    case "top":
					break;
				    case "center":
					y += (h - w.getOuterSize().y) / 2;
					break;
				    case "bottom":
					y += h - w.getOuterSize().y;
				    default:
					s.y = h;
				}
				info.div.style.top = y + "px";
				w.setSize(s);
			};
			switch (args.pos) {
			    case "top":
				top += args.before;
				info.div.style.left = left + "px";
				info.div.style.top = top + "px";
				w.setSize({ x: full_size.x - left - right,
					    y: info.sy });
				top += info.sy + args.after;
				break;

			    case "bottom":
				bottom += args.before;
				info.div.style.left = left + "px";
				info.div.style.top = full_size.y - bottom - info.sy + "px";
				w.setSize({ x: full_size.x - left - right,
					    y: info.sy });
				bottom += info.sy + args.after;
				break;

			    case "left":
				left += args.before;
				info.div.style.left = left + "px";
				doVAlign();
				left += info.sx + args.after;
				break;

			    case "right":
				right += args.before;
				info.div.style.left = full_size.x - right - info.sx + "px";
				doVAlign();
				right += info.sx + args.after;
				break;
			}
		});
	};

	// P.__doLayout = P.doLayout; // Grr, see DlContainer /onResize
	P.__doLayout = function() {
		this.doLayout();
	};

	// XXX: this doesn't quite work
	P.sizeToFit = function() {
		var wa = this._widgets;
		var height = 0, width = 0;
		for (var i = 0; i < wa.length; ++i) {
			var w = wa[i];
			var args = w._dllayout_args;
			var ws = w.getOuterSize();
			switch (args.pos) {
			    case "top":
			    case "bottom":
				height += ws.y;
				if (ws.x > width)
					width = ws.x;
				break;
			    case "left":
			    case "right":
				width += ws.x;
				if (ws.h > height)
					height = ws.h;
				break;
			}
			// alert(w.id + " => " + ws.toSource() + "\n\n" + width + "x" + height);
		}
		this.setOuterSize({ x: width, y: height });
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require widget.js
// @require layout.js

DEFINE_CLASS("DlResizeBar", DlWidget, function(D, P, DOM){

        D.DEFAULT_EVENTS = [ "onResizing", "onStop" ];

        var CC = DOM.condClass;

	D.FIXARGS = function(args) {
		args.invert = args.invert ? -1 : 1;
	};

	D.DEFAULT_ARGS = {
		_isHoriz : [ "horiz"	    , null ],
		_widget  : [ "widget"	    , null ],
		_invert  : [ "invert"	    , false ],
		_min     : [ "min"	    , null ],
		_max     : [ "max"	    , null ],
		_cont    : [ "continuous"   , false ],
		_keepPrc : [ "keepPercent"  , false ]
	};

	D.getDragBar = function() {
		return DlElementCache.DRAGGING_LINE;
	};

	P.initDOM = function() {
		D.BASE.initDOM.call(this);
		this.condClass(this.isHoriz(), "DlResizeBar-Horizontal", "DlResizeBar-Vertical");
		this.setUnselectable(null, true);
	};

	P.isHoriz = function() {
		if (this._isHoriz == null) {
			var args = DlLayout.getArgs(this);
			if (args)
				this._isHoriz = /top|bottom/.test(args.pos);
		}
		return this._isHoriz;
	};

	P._setListeners = function() {
		D.BASE._setListeners.call(this);
		this._resizeHandlers = {
			onMouseMove  : mouseMove.$(this),
			onMouseUp    : stopResize.$(this),
			onMouseOver  : DlException.stopEventBubbling,
			onMouseOut   : DlException.stopEventBubbling,
			onMouseEnter : DlException.stopEventBubbling,
			onMouseLeave : DlException.stopEventBubbling
		};
		this.addEventListener("onMouseDown", startDrag);
	};

	P._setResizeCaptures = function(capture) {
		(capture ? DlEvent.captureGlobals : DlEvent.releaseGlobals)(this._resizeHandlers);
		var div = DlDialog.activateEventStopper(capture);
                CC(div, capture, this.isHoriz() ? "CURSOR-RESIZE-S" : "CURSOR-RESIZE-E");
	};

	function startDrag(ev) {
		var el = DlElementCache.DRAGGING_LINE;
		var pos = this.getPos();
		this._dragPos = this.isHoriz() ? pos.y : pos.x;
		var mpos = this.isHoriz() ? ev.pos.y : ev.pos.x;
		this._mposDiff = mpos - this._dragPos;
		var size = this.getSize();
		el.style.top = pos.y + "px";
		el.style.left = pos.x + "px";
		el.style.width = size.x + "px";
		el.style.height = size.y + "px";
		if (this._widget) {
			var s = this._widget instanceof DlWidget
                                ? this._widget.getSize()
                                : DOM.getOuterSize(this._widget);
			this._dragSize = this.isHoriz() ? s.y : s.x;
		}
		document.body.appendChild(el);
		this._setResizeCaptures(true);
		DlException.stopEventBubbling();
	};

	P._doResize = function(ev) {
		var H = this.isHoriz();
		var pos = DOM.getPos(DlElementCache.DRAGGING_LINE);
		pos = H ? pos.y : pos.x;
		var diff = this._invert * (pos - this._dragPos);
		var w = this._widget;
		if (w) {
			var s = this._dragSize;
                        if (w instanceof DlWidget) {
                                var f = DlLayout.getArgs(w);
                                if (f) {
                                        f = f.fill;
                                        var isPrc = /%$/.test(f);
                                        if (isPrc && !this._keepPrc || f == null || typeof f == "number") {
                                                DlLayout.setFill(w, s + diff);
                                        } else if (isPrc) {
                                                // if s == f, then s + diff = X
                                                // X = f * (s + diff) / s
                                                f = parseFloat(f);
                                                DlLayout.setFill(w, f * (s + diff) / s + "%");
                                        }
                                } else {
                                        if (this._isHoriz)
                                                w.setSize({ y: s + diff });
                                        else
                                                w.setSize({ x: s + diff });
                                }
                        } else {
                                if (this._isHoriz)
                                        DOM.setOuterSize(w, null, s + diff);
                                else
                                        DOM.setOuterSize(w, s + diff, null);
                        }
                        this.callHooks("onResizing", w);
                }
	};

	function stopResize(ev) {
		this._setResizeCaptures(false);
		this._doResize(ev);
		document.body.removeChild(DlElementCache.DRAGGING_LINE);
                this.callHooks("onStop");
	};

	function mouseMove(ev) {
		var el = DlElementCache.DRAGGING_LINE;
		var pos = this.isHoriz() ? ev.pos.y : ev.pos.x;
		pos -= this._mposDiff;
		var diff = this._invert * (pos - this._dragPos);
		var min = this._min, max = this._max, w = this._widget;
		if (w) {
			var args = DlLayout.getArgs(w);
			if (args) {
				if (min == null)
					min = args.min;
				if (max == null)
					max = args.max;
			}
			var s;
			if (min != null || max != null) {
				s = this._dragSize + diff;
			}
			if (min != null && s < min) {
				pos += this._invert * (min - s);
			} else if (max != null && s > max) {
				pos += this._invert * (max - s);
			}
		}
		if (this.isHoriz())
			el.style.top = pos + "px";
		else
			el.style.left = pos + "px";
		if (this._cont)
			this._doResize(ev);
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require container.js

DEFINE_CLASS("DlWM", DlContainer, function(D, P, DOM){

        P.getInnerSize = P.getOuterSize = P.getSize = function() {
                return ( this.parent
                         ? this.parent.getInnerSize()
                         : DOM.getWindowSize() );
        };

        P.initDOM = function() {
                D.BASE.initDOM.apply(this, arguments);
                this.getElement().innerHTML = "<div class='DlWM-modalStopper'></div>";
                this.dialogsVisible = [];
                this.modalsVisible = 0;
                this._manageEvents = {
                        onShow: _on_dlgShow.$(null, this),
                        onHide: _on_dlgHide.$(null, this)
                };
                var resize = this.on_parentResize.$(this);
                this.parent
                        ? this.parent.addEventListener("onResize", resize)
                        : DOM.addEvent(window, "resize", resize);
        };

        P.getModalStopperElement = function() {
                return this.getElement().childNodes[0];
        };

        P.activatePrev = function() {
                var a = this.dialogsVisible;
                if (a.length > 1) {
                        a.peek().deactivate();
                        a.unshift(a.pop());
                        top = a.pop();
                        top.activate();
                }
        };

        P.activateNext = function() {
                var a = this.dialogsVisible;
                if (a.length > 1) {
                        a[0].activate();
                }
        };

        P.getActiveDialog = function() {
                return this.dialogsVisible.peek();
        };

        P.updateZIndex = function() {
                this.dialogsVisible.r_foreach(function(d, i) {
                        d.zIndex((d.__modal ? 900 : 500) + i);
                });
        };

        P.getVisibleDialogs = function() {
                return this.dialogsVisible;
        };

        P.getAllDialogs = function() {
                return this.children().grep(function(w){ return w instanceof DlDialog });
        };

        P.appendWidget = function(w) {
                D.BASE.appendWidget.apply(this, arguments);
                if (w instanceof DlDialog)
                        this.manage(w);
        };

        P.removeWidget = function(w) {
                D.BASE.removeWidget.apply(this, arguments);
                if (w instanceof DlDialog)
                        this.unmanage(w);
        };

        P.manage = function(dlg) { dlg.addEventListener(this._manageEvents) };
        P.unmanage = function(dlg) { dlg.removeEventListener(this._manageEvents) };

        P.on_dlgShow = function(dlg) {
                if (dlg.__modal)
                        this.modalsVisible++;
                this.condClass(this.modalsVisible > 0, "DlWM-hasModals");
        };

        P.on_dlgHide = function(dlg) {
                if (dlg.__modal)
                        this.modalsVisible--;
                this.condClass(this.modalsVisible > 0, "DlWM-hasModals");
                if (this.dialogsVisible.length == 0 && this.parent)
                        this.parent.focus();
        };

        P.on_parentResize = function() {
                this.dialogsVisible.foreach(function(dlg){
                        if (dlg.__maximized)
                                dlg.__doMaximize();
                });
                this.callHooks("onResize");
        };

        P.rearrange = function(algo) {
                var a = this.dialogsVisible.map(function(dlg){
                        var pos = dlg.getOffsetPos(), size = dlg.getOuterSize();
                        return { dlg: dlg, x: pos.x, y: pos.y, w: size.x, h: size.y };
                });
                algo(a, this.getInnerSize());
                a.foreach(function(o){
                        o.dlg.setPos(o.x, o.y);
                        o.dlg.setSize({ x: o.w, y: o.h });
                });
        };

        P.tileHoriz = function() { this.rearrange(algo_tileHoriz) };
        P.tileVert = function() { this.rearrange(algo_tileVert) };

        function _on_dlgShow(wm) { wm.on_dlgShow(this) };
        function _on_dlgHide(wm) { wm.on_dlgHide(this) };

        DlContainer.prototype._makeWindowManager = function() {
                if (!this.__wm)
                        (this.__wm = new DlWM({ parent: this })).addEventListener(
                                "onDestroy", function(){ this.__wm = null }.$(this));
                return this.__wm;
        };

        function sortX(a, b) { return a.x < b.x ? -1 : a.x > b.x ? 1 : 0 };
        function sortY(a, b) { return a.y < b.y ? -1 : a.y > b.y ? 1 : 0 };

        function algo_tileHoriz(a, size) {
                var n = a.length, w = Math.floor(size.x / n), x = 0;
                a.mergeSort(sortX).foreach(function(o, i){
                        o.y = 0;
                        o.x = x;
                        o.h = size.y;
                        if (i == n - 1)
                                o.w = size.x - x;
                        else
                                o.w = w;
                        x += w;
                });
        };

        function algo_tileVert(a, size) {
                var n = a.length, h = Math.floor(size.y / n), y = 0;
                a.mergeSort(sortY).foreach(function(o, i){
                        o.x = 0;
                        o.y = y;
                        o.w = size.x;
                        if (i == n - 1)
                                o.h = size.y - y;
                        else
                                o.h = h;
                        y += h;
                });
        };

});

DEFINE_CLASS("DlDialog", DlContainer, function(D, P, DOM){

        var EX = DlException.stopEventBubbling,
            AC = DOM.addClass,
            DC = DOM.delClass,
            CC = DOM.condClass,
            CE = DOM.createElement;

        D.DEFAULT_EVENTS = [ "onShow", "onHide", "onActivate", "onQuitBtn" ];

        D.DEFAULT_ARGS = {
                _title         : [ "title"        , "DlDialog" ],
                _noEmptyTitle  : [ "noEmptyTitle" , true ],
                _fixed         : [ "fixed"        , false ],
                _resizable     : [ "resizable"    , false ],
                _focusable     : [ "focusable"    , true ],
                _iconClass     : [ "iconClass"    , null ],
                _focusedWidget : [ "focusDefault" , null ],
                __noShadows    : [ "noShadows"    , false ],
                __quitBtn      : [ "quitBtn"      , false ],
                __maxBtn       : [ "maxBtn"       , true ],
                __modal        : [ "modal"        , false ],
                __moveDelay    : [ "moveDelay"    , 5000 ]
        };

        D.FIXARGS = function(args) {
                if (!args.parent)
                        args.parent = D.getTopWM();
                if (!(args.parent instanceof DlWM)) {
                        if (args.parent instanceof DlDialog)
                                args.noShadows = true;
                        args.parent = args.parent._makeWindowManager();
                }
        };

        D.CONSTRUCT = function() {
                this.__doDrag = this.__moveDelay != null
                        ? __doDrag.clearingTimeout(this.__moveDelay, this)
                        : __doDrag.$(this);
                this.active = false;
        };

        var TOP_WM;
        D.getTopWM = function() {
                if (!TOP_WM) {
                        TOP_WM = new DlWM({ className: "DlTopWindowManager" });
                        document.body.appendChild(TOP_WM.getElement());
                }
                return TOP_WM;
        };

        var HTML = ( "<table cellspacing='0' cellpadding='0'><tr><td>" +
                     "<div class='DlDialog-Rel'>" +
                     "<div class='DlDialog-WindowButtons'></div>" +
                     "<div class='DlDialog-Title'><div></div></div>" +
                     "<div class='DlDialog-Content'></div>" +
                     "</div>" +
                     "</td></tr></table>"
                   );

        var HIDE_POS = { x: -30000, y: -30000 };

        P._setDragCaptures = function(capture) {
                DlEvent[capture ? "captureGlobals" : "releaseGlobals"](this._dragHandlers);
        };

        P._setResizeCaptures = function(capture) {
                DlEvent[capture ? "captureGlobals" : "releaseGlobals"](this._resizeHandlers);
        };

        function activateCkt() {
                var ckt = DOM.CE_CACHE["DlDialog.EVENT_STOPPER"];
                if (!ckt) {
                        ckt = DOM.CE_CACHE["DlDialog.EVENT_STOPPER"] = CE("div", null, { className: "DYNARCH-EVENT-STOPPER" }, document.body);
                        // if (is_ie || is_gecko) {
                        //         DOM.setOpacity(ckt, 0.2);
                        //         ckt.style.background = "#00f";
                        // }
                }
                ckt.style.visibility = "";
                return ckt;
        };

        function deactivateCkt() {
                var ckt = DOM.CE_CACHE["DlDialog.EVENT_STOPPER"];
                if (ckt) {
                        ckt.className = "DYNARCH-EVENT-STOPPER";
                        ckt.style.visibility = "hidden";
                }
                return ckt;
        };

        D.activateEventStopper = function(act) {
                return act ? activateCkt() : deactivateCkt();
        };

        function startDrag(ev) {
                if (!this.dragging && !this.__maximized) {
                        DlPopup.clearAllPopups();
                        this.activate();
                        this.dragging = true;
                        ev || (ev = window.event);
                        var dlev = (ev instanceof DlEvent)
                                ? ev
                                : new DlEvent(ev);
                        this.addClass("DlDialog-Dragging");
                        this._dragPos = dlev.computePos(this);
                        this._setDragCaptures(true);
                        AC(activateCkt(), "CURSOR-DRAGGING");

                        if (this.__moveDelay != null) {
                                var div = this.getResizeRect();
                                AC(div, "Dl-ResizeRect-moving");
                                var sz = this.getOuterSize();
                                DOM.setPos(div, dlev.elPos.x, dlev.elPos.y);
                                DOM.setOuterSize(div, sz.x, sz.y);
                                div.style.display = "";
                        }

                        if (dlev !== ev)
                                return DOM.stopEvent(ev);
                }
        };

        function startCtrlDrag(ev) {
                if (ev.ctrlKey && ev.shiftKey) {
                        if (ev.button == 0 && this._dragHandlers) {
                                startDrag.call(this, ev);
                        } else if (ev.button == 2 && ev.dl_type == "onContextMenu" && this._resizable) {
                                startResize.call(this, ev);
                                EX();
                        }
                }
        };

        function stopDrag(ev) {
                if (this.dragging) {
                        var div = this.getResizeRect();
                        this.dragging = false;
                        this.delClass("DlDialog-Dragging");
                        this._setDragCaptures(false);
                        if (this.__moveDelay != null) {
                                if (ev) {
                                        var pos = __dragGetPos.call(this, ev);
                                        this.__doDrag.doItNow(pos.x, pos.y);
                                } else {
                                        this.__doDrag.cancel();
                                }
                        }
                        DC(div, "Dl-ResizeRect-moving");
                        div.style.display = "none";
                        deactivateCkt();
                }
        };

        function __dragGetPos(ev) {
                var p = this.parent;
                ev.computePos(p.getContentElement());
                var x = ev.relPos.x - this._dragPos.x,
                    y = ev.relPos.y - this._dragPos.y,
                    sz = this.getOuterSize(),
                    ws = p.getInnerSize();
                if (x < 0)
                        x = 0;
                else if (x + sz.x > ws.x)
                x = ws.x - sz.x;
                if (y < 0)
                        y = 0;
                else if (y + sz.y > ws.y)
                y = ws.y - sz.y;
                return { x: x, y: y };
        };

        function __dragDIV(pos) {
                var x = pos.x, y = pos.y;
                pos = DOM.getPos(this.parent.getContentElement());
                x += pos.x;
                y += pos.y;
                DOM.setPos(this.getResizeRect(), x, y);
        };

        function __doDrag(x, y) {
                this.setPos(x, y);
                this.__oldDlgPos = this.getOffsetPos();
        };

        function doDrag(ev) {
                var pos = __dragGetPos.call(this, ev);
                if (this.__moveDelay != null)
                        __dragDIV.call(this, pos);
                this.__doDrag(pos.x, pos.y);
                EX();
        };

        function startResize(ev) {
                if (!this.resizing) {
                        this.resizing = true;
                        ev || (ev = window.event);
                        var dlev = (ev instanceof DlEvent)
                                ? ev
                                : new DlEvent(ev);
                        this._dragPos = dlev.computePos(this);
                        var sz = this.getOuterSize();
                        this._dragPos.x -= sz.x;
                        this._dragPos.y -= sz.y;
                        var pos = this.getPos();
                        var div = this.getResizeRect();
                        DOM.setPos(div, pos.x, pos.y);
                        DOM.setOuterSize(div, sz.x, sz.y);
                        div.style.display = "";
                        // this.display(false);
                        this.addClass("DlDialog-Resizing");
                        this._setResizeCaptures(true);
                        AC(activateCkt(), "CURSOR-DRAGGING");
                        doResize.call(this, dlev, true);
                        if (dlev !== ev)
                                DOM.stopEvent(ev);
                }
        };

        function stopResize(ev) {
                if (this.resizing) {
                        this.disableHooks("onResize");
                        this.getElement().style.overflow = "hidden";
                        var div = this.getResizeRect();
                        var sz = DOM.getOuterSize(div);
                        DOM.setPos(div, 0, 0);
                        div.style.display = "none";
                        // this.display(true);
                        this.delClass("DlDialog-Resizing");
                        this.setOuterSize({ x: sz.x, y: sz.y });
                        if (is_gecko)
                                // FIXME: wicked!
                                D.BASE.setOuterSize.call(this, { x: "auto", y: "auto" });
                        this.resizing = false;
                        this._setResizeCaptures(false);
                        this.getElement().style.overflow = "";
                        deactivateCkt();
                        this.enableHooks("onResize");
                        this.callHooks("onResize");
                }
        };

        function doResize(ev, domStop) {
                if (this.resizing) {
                        var div = this.getResizeRect();
                        var pos = DOM.getPos(div);
                        pos.x = ev.pos.x - this._dragPos.x - pos.x - 2;
                        if (pos.x < 100)
                                pos.x = 100;
                        pos.y = ev.pos.y - this._dragPos.y - pos.y - 2;
                        if (pos.y < 100)
                                pos.y = 100;
                        if (this._resizable === 1)
                                pos.y = null;
                        if (this._resizable === 2)
                                pos.x = null;
                        DOM.setInnerSize(div, pos.x, pos.y);
//                         div.innerHTML = [ "<table style='height: 100%' align='center'><tr><td><span class='Title'>",
//                                           this._title,
//                                           "</span><br/>",
//                                           pos.x, " × ",
//                                           pos.y,
//                                           "</td></tr></table>"
//                                         ].join("");
                        domStop || EX();
                }
        };

        P.setOuterSize = P.setSize = function(sz) {
                sz = Object.makeCopy(sz);
                if (sz.y != null)
                        sz.y -= this.getTitleElement().offsetHeight;
                this.setInnerSize(sz);
        };

        P.hide = function() {
                if (this.display() && DOM.elementIsVisible(this.getElement())) {
                        this.__oldDlgPos = this.getOffsetPos();
                        this.display(false);
                        this.setPos(HIDE_POS);
                }
        };

        P.show = function(center) {
                if (!this.__wasDisplayed) {
                        this.setStyle({ visibility: "" }); // bypass DlWidget::visibility so we don't call handlers
                }
                if (!this.display() || !this.__wasDisplayed) {
                        if (this.__oldDlgPos)
                                this.setPos(this.__oldDlgPos);
                        else if (center)
                                this.centerOnParent();
                        this.display(true);
                } else {
                        this.activate();
                }
                this.__wasDisplayed = true;
        };

        P.activate = function() {
                var vd = this.parent.getVisibleDialogs();
                var act = vd.peek();
                if (!this.active) {
                        if (act && act.active)
                                act.deactivate(true);
                        this.addClass("DlDialog-Active");
                        vd.remove(this);
                        vd.push(this);
                        this.parent.updateZIndex();
                        this.active = true;
                        this.focus();
                        if (this._focusedWidget && !this._focusedWidget.destroyed)
                                this._focusedWidget.focus();
                        this.applyHooks("onActivate", [ true ]);
                }
        };

        P.deactivate = function() {
                if (this.active) {
                        this.delClass("DlDialog-Active");
                        this.active = false;
                        // this.callHooks("onBlur");
                        this.blur();
                        this.applyHooks("onActivate", [ false ]);
                }
        };

        function onDisplay(disp, val) {
                var sys = DlSystem();
                if (disp) {
                        this.callHooks("onShow");
                        this.activate();
                        this.setModal(this.__modal, true);
                        sys.applyHooks("on-dialog-show", [ this ]);
                        if (this.__maximized)
                                this.__doMaximize.delayed(1, this);
                } else {
                        var vd = this.parent.getVisibleDialogs();
                        vd.remove(this);
                        this.callHooks("onHide");
                        this.deactivate();
                        sys.applyHooks("on-dialog-hide", [ this ]);
                        if (vd.length >= 1)
                                vd.peek().activate();
                }
        };

        function onMouseWheel(ev) {
                if (ev.shiftKey || ev.altKey) {
                        var opc = this.__dlgOpacity;
                        if (opc == null)
                                opc = 100;
                        if (ev.wheelDelta > 0)
                                opc += 0.05;
                        else
                                opc -= 0.05;
                        opc = this.__dlgOpacity = opc.limit(0.1, 1);
                        this.opacity(opc);
                        EX();
                }
        };

        P._createElement = function() {
                D.BASE._createElement.call(this);
                this.setPos(HIDE_POS);
                //this.display(false);
                this.setStyle({ visibility: "hidden" }); // bypass DlWidget::visibility so we don't call handlers
                this.getElement().innerHTML = HTML;
                var rel = this.getRelElement();

                if (!this.__noShadows && !is_ie6)
                        // IE6 is too stupid to support such advancements
                        rel.insertBefore(DlElementCache.get("SHADOWS"), rel.firstChild);
                else {
                        this.__noShadows = true;
                        AC(rel, "DlDialog-noShadows");
                }

                this.title(this._title);
                this.setUnselectable(this.getTitleElement());

                // create title buttons
                var quitBtn = this.__quitBtn;
                if (quitBtn) {
                        var foo = this.__quitBtn = new DlAbstractButton({
                                parent     : this,
                                className  : "DlDialog-QuitBtn",
                                appendArgs : this.getButtonsElement(),
                                classes    : {
                                        hover  : "DlDialog-QuitBtn-hover",
                                        active : "DlDialog-QuitBtn-active"
                                }
                        });
                        if (quitBtn == "destroy") {
                                quitBtn = this.destroy.$(this);
                        } else if (quitBtn == "hide") {
                                quitBtn = this.hide.$(this);
                        }
                        if (quitBtn instanceof Function)
                                foo.addEventListener("onClick", quitBtn);
                        else
                                foo.connectEvents("onClick", this, "onQuitBtn");
                }

                if (this._resizable)
                        this.makeResizable();

                this.setIconClass(this._iconClass);

                if (!this._fixed)
                        this.makeDraggable();

                this.addEventListener({ onMouseDown   : this.activate,
                                        onMouseWheel  : onMouseWheel,
                                        onDisplay     : onDisplay,
                                        onDestroy     : this.hide });
        };

        P.setIconClass = function(iconClass) {
		var e2 = this.getTitleElement().firstChild;
		CC(e2, iconClass != null, "DlDialog-Title-withIcon");
		if (this.iconClass)
			DC(e2, this.iconClass);
		if (iconClass)
			AC(e2, iconClass);
		this.iconClass = iconClass;
	};

        P.getState = function() {
                var state = this.__maximized && this.__maximizeSavePos;
                if (state)
                        state = Object.makeDeepCopy(state);
                else
                        state = {
                                pos  : this.getOffsetPos(),
                                size : this.getOuterSize()
                        };
                state.max = !!this.__maximized;
                return state;
        };

        P.maximize = function(c) {
                if (c == null)
                        c = this.__maxBtn.checked();
                var pos, size;
                this.__maximized = c;
                if (c) {
                        pos = this.getOffsetPos();
                        size = this.getOuterSize();
                        this.__maximizeSavePos = { pos: pos, size: size };
                }
                this.condClass(c, "DlDialog-Maximized");
                if (c) {
                        this.__doMaximize();
                } else {
                        pos = this.__maximizeSavePos;
                        size = pos.size;
                        pos = pos.pos;
                        this.setOuterSize({ x: size.x, y: size.y });
                        this.setPos(pos.x, pos.y);
                }
                this.__maxBtn.checked(c, true);
                if (this._focusedWidget && !this._focusedWidget.destroyed)
                        this._focusedWidget.focus();
        };

        P.__doMaximize = function() {
                this.setPos(0, 0);
                var ws = this.parent.getInnerSize();
                this.setOuterSize({ x: ws.x, y: ws.y });
        };

        P.setModal = function(modal, noset) {
                if (!noset)
                        this.__modal = modal;
                if (this.display()) {
                        this.parent.updateZIndex();
                }
        };

        P.modal = function() {
                return this.__modal;
        };

        P.makeResizable = function() {
                if (!this._resizeHandlers) {
                        this.getContentElement().style.overflow = "hidden";
                        var div = this.getRelElement();
                        var el = CE("div", null, { className: "ResizeHandle" }, null);
                        div.insertBefore(el, div.firstChild);
                        this._resizeHandlers = {
                                onMouseMove  : doResize.$(this),
                                onMouseUp    : stopResize.$(this),
                                onMouseOver  : EX,
                                onMouseOut   : EX,
                                onMouseEnter : EX,
                                onMouseLeave : EX
                        };
                        DOM.addEvent(el, "mousedown", startResize.$(this));
                        this.resizing = false;
                        if (this.__maxBtn) {
                                this.__maxBtn = new DlAbstractButton({
                                        parent     : this,
                                        className  : "DlDialog-MaximizeBtn",
                                        appendArgs : this.getButtonsElement(),
                                        type       : DlAbstractButton.TYPE.TWOSTATE,
                                        classes    : {
                                                hover   : "DlDialog-MaximizeBtn-hover",
                                                active  : "DlDialog-MaximizeBtn-active",
                                                checked : "DlDialog-MaximizeBtn-1"
                                        }
                                });
                                this.__maxBtn.addEventListener("onChange", this.maximize.$0(this, null));
                        }
                }
        };

        P.makeDraggable = function(el) {
                if (!el) {
                        el = this.getTitleElement();
                        el.style.cursor = "default";
                        this.addEventListener([ "onMouseDown", "onContextMenu" ], startCtrlDrag);
                }
                if (!this._dragHandlers) {
                        this._dragHandlers = {
                                onMouseMove  : doDrag.$(this),
                                onMouseUp    : stopDrag.$(this),
                                onMouseOver  : EX,
                                onMouseOut   : EX,
                                onMouseEnter : EX,
                                onMouseLeave : EX
                        };
                        this.dragging = false;
                }
                DOM.addEvent(el, "mousedown", startDrag.$(this));
        };

        P.title = function(title) {
                if (title != null) {
                        if (title instanceof Array)
                                title = title.join("");
                        this._title = title;
                        this.getTitleElement().firstChild.innerHTML = title;
                        if (this._noEmptyTitle) {
                                this.getTitleElement().style.display = /\S/.test(title) ? "" : "none";
                        }
                }
                return this._title;
        };

        P._handle_focusKeys = function(ev) {
                if (!ev.altKey && !ev.ctrlKey) {
                        if (ev.keyCode == DlKeyboard.ESCAPE) {
                                if (!this.dragging && this.__quitBtn) {
                                        this.__quitBtn.keyClicked(ev);
                                } else if (this.dragging) {
                                        stopDrag.call(this);
                                }
                        } else if (ev.keyCode == DlKeyboard.TAB) {
                                var w = ev.focusedWidget;
                                w = ev.shiftKey
                                        ? this.getPrevFocusWidget(w)
                                        : this.getNextFocusWidget(w);
                                if (w)
                                        w.focus();
                                ev.domStop = true;
                                EX();
                        }
                }
                this._handleKeybinding(ev);
        };

        function _el(o, p) {
                var a = o.getRelElement().childNodes;
                return a[a.length - p];
        };

        P.getRelElement = function() {
                return this.getElement().firstChild.rows[0].cells[0].firstChild;
        };

        P.getContentElement = function() {
                return _el(this, 1);
        };

        P.getTitleElement = function() {
                return _el(this, 2);
        };

        P.getButtonsElement = function() {
                return _el(this, 3);
        };

        P.centerOnParent = function() {
                var sz = this.getOuterSize(), ps = this.parent.getOuterSize();
                this.setPos((ps.x - sz.x) / 2, (ps.y - sz.y) / 2);
        };

        P.getWM = function() { return this.parent };

        DlWidget.prototype.getParentDialog = function() {
                var d = this.parent;
                while (d && !(d instanceof D))
                        d = d.parent;
                return d;
        };

});

DEFINE_CLASS("DlDialogPopup", DlPopup, function(D, P) {
        D.FIXARGS = function(args) {
                args.autolink = false;
                args.zIndex = 5000;
        };
});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require container.js
// @require drag.js
// @require resizebar.js
// @require dialog.js

/* -----[ data model ]----- */

DEFINE_CLASS("DlRecord", DlEventProxy, function(D, P) {

        D.DEFAULT_EVENTS = [ "onChange" ];

        D.DEFAULT_ARGS = {
                _data : [ "data"      , null ],
                _set  : [ "recordSet" , null ]
        };

        P.id = function() {
                return this._data.id;
        };

        P.get = function(key) {
                return this._data[key];
        };

        P.set = function(key, val, nohooks) {
                var a, old = this._data[key];
                this._data[key] = val;
                if (!nohooks) {
                        a = [ this, key, val, old ];
                        this.applyHooks("onChange", a);
                        this._set && this._set.applyHooks("onChange", a);
                }
        };

        P.compareTo = function(rec, col) {
                var a = this.get(col), b = rec.get(col);
                return a < b ? -1 : a == b ? 0 : 1;
        };

});

DEFINE_CLASS("DlRecordCache", DlEventProxy, function(D, P) {

        D.DEFAULT_EVENTS = [ "onChange", "onInsert", "onBeforeDelete", "onDelete", "onRefresh" ];

        D.DEFAULT_ARGS = {
                _data  : [ "data"  , null ]
        };

        D.CONSTRUCT = function() {
                this._init();
        };

        P.get = function(id) {
                return this._data[id];
        };

        P.hasRecord = function(id) {
                return this.get(id);
        };

        // override to support lazy loading
        P.getRecords = function(ids, callback, obj) {
                callback.call(obj, ids.map(this.get, this));
        };

        P.getAllIds = function() { return Array.hashKeys(this._data) };

        P.getAllRecords = function() { return Array.hashValues(this._data) };

        P.getHash = function() {
                return this._data;
        };

        P.formatHTML = function(rec, col_id, buf, col) {
                var html = col ? col.format(rec, this) : null;
                if (html == null) html = String(rec.get(col_id)).htmlEscape();
                buf(html);
        };

        // override
        P.getRecClass = function(rec) {};
        P.getCellClass = function(rec, col) {};

        P.getInsertPos = function(rec) {};

        P.insert = function(rec, where) {
                if (where == null)
                        where = this.getInsertPos(rec);
                this._data[rec.id()] = rec;
                rec._set = this;
                this.applyHooks("onInsert", [ rec, where ]);
        };

        P.remove = function(id) {
                this.applyHooks("onBeforeDelete", [ this.get(id) ]);
                if (id instanceof Array) {
                        id.foreach(function(id){
                                delete this._data[id];
                        }, this);
                } else
                        delete this._data[id];
                this.applyHooks("onDelete", [ id ]);
        };

        P.sort = function(ids, col, prev, rev, callback, obj) {
                var a;
                if (col == prev && rev !== null) {
                        a = ids.reverse();
                } else {
                        a = ids.mergeSort(function(a, b){
                                a = this.get(a);
                                b = this.get(b);
                                return a.compareTo(b, col);
                        }.$(this), rev);
                }
                callback.call(obj, a);
        };

        P._init = function() {
                if (!this._data) {
                        this._data = {};
                } else {
                        // expecting an array but convert to hash
                        var d = {};
                        this._data.foreach(function(rec){
                                d[rec.id()] = rec;
                                rec._set = this;
                        }, this);
                        this._data = d;
                }
        };

});

DEFINE_CLASS("DlDataGridHeadLabel", DlButton, function(D, P, DOM) {

        D.FIXARGS = function(args) {
                if (!("contextMenu" in args))
                        args.contextMenu = this._getContextMenu;
        };

        D.CONSTRUCT = function() {
                if (!this.isSortable()) {
                        var c = this._classes = Object.makeCopy(this._classes);
                        c.active = c.hover = null;
                }
        };

        var MIN_COL_WID = 20;

        P.setWidth = function(w) {
                this.setOuterSize({ x: w });
        };

        P.isSortable = function() {
                return this.col.isSortable();
        };

        // P.label = function(label) {
        //         if (arguments.length > 0)
        //                 this.setContent("<div class='DlButton-Label'>" + (this._label = label) + "</div>");
        //         return this._label;
        // };

        P._onClick = function() {
                if (this.isSortable())
                        this.parent._onHeadClick(this.col, this);
        };

        P._getContextMenu = function() {
                var m = this._dgContextMenu, grid = this.parent, a;
                if (!m) {
                        this._dgContextMenu = m = new DlVMenu({});
                        a = m.buttons = [];
                        grid._cols.foreach(function(col, i){
                                if (col.getMenuLabel()) {
                                        var cb = a[i] = new DlCheckbox({ parent: m, label: col.getMenuLabel(), checked: col.isVisible() });
                                        cb.addEventListener("onChange", function() {
                                                col.setVisible(this.checked());
                                        });
                                }
                        });
                } else {
                        a = m.buttons;
                        grid._cols.foreach(function(col, i){
                                a[i].checked(col.isVisible(), true);
                        });
                }
                return m;
        };

        D.DEFAULT_ARGS = {
                col : [ "col", null ],
                _focusable : [ "focusable", false ],
                _noCapture : [ "noCapture", true ],
                _classes : [ "classes", { active    : "DlDataGridHeadLabel-active",
                                          hover     : "DlDataGridHeadLabel-hover",
                                          checked   : "DlDataGridHeadLabel-1",
                                          unchecked : "DlDataGridHeadLabel-0",
                                          empty     : "DlDataGridHeadLabel-empty",
                                          disabled  : "DlDataGridHeadLabel-disabled"
                                        } ]
        };

        var EX = DlException.stopEventBubbling;

        function getResizeHandle(p) {
                var d = p._resizeHandle;
                if (!d) {
                        d = p._resizeHandle = new DlWidget({ parent: p, className: "DlDataGrid-resizeHandle" });
                        d.display(false);
                        d.grid = p.parent;
                        d.addEventListener({ onMouseLeave : d.display.$(d, false),
                                             onMouseDown  : startResize
                                           });
                        d._resizeCaptures = {
                                onMouseMove  : doResize.$(d),
                                onMouseUp    : stopResize.$(d),
                                onMouseOver  : EX,
                                onMouseOut   : EX,
                                onMouseEnter : EX,
                                onMouseLeave : EX
                        };
                }
                return d;
        };

        D._on_headMouseMove = function(ev) {
                if (!this._colPos || this.dragging)
                        return;
                var grid = this.parent, sl = grid.getBodyDiv().scrollLeft;
                var x = ev.computePos(this).x + sl;
                var found;
                this._colPos.foreach(function(c){
                        if (Math.abs(x - c.pos) < 4) {
                                if (c.col.isResizable())
                                        found = c;
                                $BREAK();
                        }
                });
                var rh = getResizeHandle(this);
                if (found) {
                        if (found.col !== rh.col) {
                                rh.found = found;
                                rh.col = found.col;
                                rh.pos = found.pos;
                                rh.setPos(found.pos - sl);
                        }
                        rh.display(true);
                } else {
                        rh.display(false);
                        rh.found = rh.col = null;
                }
        };

        D._on_headMouseLeave = function(ev) {
                getResizeHandle(this).display(false);
        };

        function startResize(ev) {
                this.dragging = true;
                var bar = DlResizeBar.getDragBar(), s = bar.style;
                this.sl = this.grid.getBodyDiv().scrollLeft;
                s.left = this.pos - this.sl - 1 + "px";
                s.height = "100%";
                s.width = this.getElement().offsetWidth - 4 + "px";
                s.top = "0px";
                this.grid.getElement().appendChild(bar);
                var es = DlDialog.activateEventStopper(true);
                DOM.addClass(es, "CURSOR-RESIZE-E");
                DlEvent.captureGlobals(this._resizeCaptures);
                this.origW = this.grid.getColWidth(this.col);
                this.origM = ev.pos.x;
                this.col._button.addClass("DlDataGridHeadLabel-resizing");
                EX();
        };

        function doResize(ev) {
                var
                        bar = DlResizeBar.getDragBar(),
                        left = this.pos + ev.pos.x - this.origM - 1,
                        diff = left - this.pos,
                        w = this.origW + diff;
                if (w < MIN_COL_WID) {
                        left += MIN_COL_WID - w;
                        w = MIN_COL_WID;
                }
                left -= this.sl;
                bar.style.left = left + "px";
                this.width = w;
                this.diff = diff;
                if (!is_ie) {
                        var el = this.col._button.getElement();
                        el.style.width = el.parentNode.style.width = el.parentNode.parentNode.style.width = w + "px";
                }
                EX();
        };

        function stopResize(ev) {
                this.dragging = false;
                this.grid.getElement().removeChild(DlResizeBar.getDragBar());
                var es = DlDialog.activateEventStopper(false);
                DOM.delClass(es, "CURSOR-RESIZE-E");
                DlEvent.releaseGlobals(this._resizeCaptures);
                if (this.width) {
                        this.grid.setColWidth(this.col, this.width);
                        this.grid._computeColPos();
                }
                this.col._button.delClass("DlDataGridHeadLabel-resizing");
                if (!is_ie) {
                        var el = this.col._button.getElement();
                        el.style.width = el.parentNode.style.width = el.parentNode.parentNode.style.width = "";
                }
                this.width = this.diff = this.found = this.col = null;
                this.parent.callHooks("onMouseMove", ev);
                EX();
        };

});

DEFINE_CLASS("DlGridCol", DlEventProxy, function(D, P) {

        D.DEFAULT_EVENTS = [ "onChange", "onVisibility" ];

        D.DEFAULT_ARGS = {
                _field_id    : [ "id"         , null ],
                _width       : [ "width"      , null ],
                _fill        : [ "fill"       , null ],
                _style       : [ "style"      , null ],
                _label       : [ "label"      , null ],
                _menuLabel   : [ "menuLabel"  , null ],
                _tooltip     : [ "tooltip"    , null ],
                _iconClass   : [ "iconClass"  , null ],
                _isSortable  : [ "sortable"   , true ],
                _isResizable : [ "resizable"  , true ],
                _cssRule     : [ "cssRule"    , null ],
                _isVisible   : [ "visible"    , true ],
                _format      : [ "format"     , null ]
        };

        var DEFAULT_STYLE = {};

        P.id = function() {
                return this._field_id;
        };

        P.getWidth = function() {
                return this._width;
        };

        P.getFill = function() {
                return this._fill;
        };

        P.getLabel = function() {
                return this._label;
        };

        P.getMenuLabel = function() {
                return this._menuLabel || this._label;
        };

        P.getTooltip = function() {
                return this._tooltip;
        };

        P.getIconClass = function() {
                return this._iconClass;
        };

        P.getStyle = function(key, def) {
                return (this._style || DEFAULT_STYLE)[key] || def;
        };

        P.isSortable = function() {
                return this._isSortable;
        };

        P.isResizable = function() {
                return this._isResizable;
        };

        P.isVisible = function() {
                return this._isVisible;
        };

        P.setVisible = function(v) {
                this._isVisible = v;
                this.applyHooks("onVisibility", [ v ]);
        };

        P.sort = function() {}; // override

        P.format = function(rec, set) {
                if (this._format)
                        return this._format(rec, set, this.id());
        };

});

DEFINE_CLASS("DlGridDragCol", DlDrag, function(D, P, DOM) {

        D.CONSTRUCT = function() {
                this.addEventListener("onStartDrag", function(w) {
                        this.grid_pos = w.parent.getPos();
                        w._onMouseLeave();
                });
        };

        // D.DEFAULT_ARGS = {};

        P.startOK = function(widget, ev) {
		return true;
	};

        P.dropOK = function(widget, ev, target, inside) {
                if (!inside && target instanceof DlDataGridHeadLabel && widget.parent === target.parent) {
                        this.target = target;
                        return this.canDrop = true;
                }
                return this.canDrop = false;
        };

        P.doDrop = function(widget, ev) {
                widget.parent.reorderColumn(widget.col, this.target.col, !this.dropBefore);
        };

        var DROP_INDICATOR;
        function getDropIndicator() {
                var d = DROP_INDICATOR;
                if (!d)
                        d = DROP_INDICATOR = DOM.createElement("div", { display: "none" }, { className: "DlDataGrid-drop-col" }, document.body);
                return d;
        };

	P.moving = function(widget, ev) {
		var target = this.target;
                var di = getDropIndicator();
                var s = di.style;
		if (this.canDrop && target) {
			var relPos = ev.computePos(target);
                        var te = target.getElement();
			var w = te.offsetWidth;
			var before = relPos.x <= w / 2;
                        var pos = target.col.index;
                        if (before)
                                pos--;
                        if (pos < 0) {
                                pos = 0;
                        } else {
                                pos = widget.parent._headCont._colPos[pos].pos - widget.parent.getBodyDiv().scrollLeft;
                        }
                        s.display = "block";
                        s.left = pos + this.grid_pos.x + "px";
                        s.top = relPos.elPos.y + "px";
			this.dropBefore = before;
		} else if (target) {
			this.dropBefore = null;
                        s.display = "none";
		}
	};

        P.reset = function() {
                if (DROP_INDICATOR)
                        DROP_INDICATOR.style.display = "none";
                D.BASE.reset.apply(this, arguments);
        };

});

DEFINE_CLASS("DlSelectionModel", DlEventProxy, function(D, P) {

        D.DEFAULT_EVENTS = [ "onChange", "onReset" ];

        D.CONSTRUCT = function() {
                if (!this.sel)
                        this.sel = {};
        };

        D.DEFAULT_ARGS = {
                multiple : [ "multiple", true ],
                sel      : [ "sel"     , null ]
        };

        P.reset = function(ids, noHooks) {
                var old = this.sel;
                this.sel = ids.toHash(true);
                if (!noHooks)
                        this.applyHooks("onReset", [ old, this.sel ]);
        };

        P.clear = function(noHooks) {
                this.reset([], noHooks);
        };

        P.get = function() {
                return this.sel;
        };

        P.getArray = function() {
                return Array.hashKeys(this.sel);
        };

        P.getFirst = function() {
                for (var i in this.sel)
                        return i;
        };

        P.isSelected = function(id) {
                return this.sel[id];
        };

        P.size = function() {
                var cnt = 0;
                for (var i in this.sel)
                        cnt++;
                return cnt;
        };

        P.filter = function(h) {
                var unsel = [];
                for (var i in this.sel)
                        if (!(i in h))
                                unsel.push(i);
                this.unselect(unsel);
        };

        P.select = function(id, noHooks) {
                var s = this.sel, ret = null, tmp;
                if (id instanceof Array) {
                        // go through onReset, should be faster
                        tmp = {};
                        id.foreach(function(id){
                                if (!s[id]) {
                                        s[id] = tmp[id] = true;
                                        ret = true;
                                }
                        }, this);
                        if (!noHooks && ret != null)
                                this.applyHooks("onReset", [ {}, tmp ]);
                } else {
                        if (!s[id]) {
                                s[id] = true;
                                if (!noHooks)
                                        this.applyHooks("onChange", [ id, true ]);
                                ret = true;
                        }
                }
                return ret;
        };

        P.unselect = function(id, noHooks) {
                var s = this.sel, ret = null, tmp;
                if (id instanceof Array) {
                        // go through onReset, should be faster
                        tmp = {};
                        id.foreach(function(id){
                                if (s[id]) {
                                        delete s[id];
                                        tmp[id] = true;
                                        ret = false;
                                }
                        }, this);
                        if (!noHooks && ret != null)
                                this.applyHooks("onReset", [ tmp, {} ]);
                } else {
                        if (s[id]) {
                                delete s[id];
                                if (!noHooks)
                                        this.applyHooks("onChange", [ id, false ]);
                                ret = false;
                        }
                }
                return ret;
        };

        P.toggle = function(id, noHooks) {
                return this.sel[id] ? this.unselect(id, noHooks) : this.select(id, noHooks);
        };

});

DEFINE_CLASS("DlDataGrid", DlContainer, function(D, P, DOM) {

        var AC = DOM.addClass,
            DC = DOM.delClass,
            CC = DOM.condClass;

        D.DEFAULT_EVENTS = [
                "onBodyDblClick",
                "onBodyScroll",
                "onRowClick",
                "onRowDblClick",
                "onResetIds"
        ];

        D.CONSTRUCT = function() {
                this.__scrollConts = 0;
        };

        var EX = DlException.stopEventBubbling;

        D.DEFAULT_ARGS = {
                _records        : [ "records"            , null ],
                _selection      : [ "selection"          , null ],
                _data           : [ "data"               , null ],
                _page           : [ "page"               , 0 ],
                _rpp            : [ "rpp"                , 60 ],
                _minReqRows     : [ "minReq"             , null ],
                _threshold      : [ "threshold"          , null ],
                _vScroll        : [ "virtualScrolling"   , true ],
                _cols           : [ "cols"               , null ],
                _headType       : [ "headType"           , DlDataGridHeadLabel ],
                _focusable      : [ "focusable"          , true ],
                _rtClickKeepSel : [ "rightClickKeepsSel" , false ],
                _noReselect     : [ "noReselect"         , false ],
                _rarify         : [ "rarifyScroll"       , null ]
        };

        var HTML = String.buffer(
                "<div class='DlDataGrid-Headers'>",
                "<table class='DlDataGrid-rowTable' cellspacing='0' cellpadding='0'>",
                "<tbody><tr></tr></tbody>",
                "</table></div>",
                "<div class='DlDataGrid-Body'>",
                "<div class='DlDataGrid-VSHeight'>",
                "<div class='DlDataGrid-VSHeight-before'></div>",
                "<div class='DlDataGrid-RowsCont'></div>",
                "</div>",
                "</div>"
        ).get();

        P.getHeaderDiv = function() {
                return this.getElement().firstChild;
        };

        P.getHeaderTable = function() {
                return this.getHeaderDiv().firstChild;
        };

        P.getHeaderRow = function() {
                return this.getHeaderDiv().firstChild.rows[0];
        };

        P.getBodyDiv = function() {
                return this.getElement().childNodes[1];
        };

        P._getVSHeightDiv = function() {
                return this.getBodyDiv().firstChild;
        };

        P._getVSScrollDiv = function() {
                return this._getVSHeightDiv().firstChild;
        };

        P.getRowsContainer = function() {
                return this._getVSHeightDiv().childNodes[1];
        };

        P.resetIDS = function(ids) {
                var h = {}, sel = this._selection;
                ids.foreach(function(id, i){
                        h[id] = i;
                });
                this._records = { array: ids, id_to_pos: h };
                sel.filter(h);
                if (sel.getArray().length == 0)
                        sel._last = null;
                this.callHooks("onResetIds");
        };

        P._fetch_data = function(ids, dir, callback) {
                var min = this._minReqRows, n = ids.length, d = this._data;
                if (min == null || min <= n) {
                        d.getRecords(ids, callback, this);
                } else {
                        var more = ids.slice(0); // copy
                        var a = this._records.array, i;
                        var threshold = this._threshold || Math.ceil(this._rpp / 2);
                        if (dir <= 0) {
                                var start = this._records.id_to_pos[ids[0]], k = threshold;
                                while (k-- > 0)
                                        if (!d.hasRecord(a[--start]))
                                                break;
                                if (k > 0) {
                                        for (i = start; i >= 0 && more.length < min; i--) {
                                                var id = a[i];
                                                if (!d.hasRecord(id))
                                                        more.push(id);
                                        }
                                }
                        }
                        if (dir >= 0) {
                                var start = this._records.id_to_pos[ids.peek()], k = threshold;
                                while (k-- > 0)
                                        if (!d.hasRecord(a[++start]))
                                                break;
                                if (k > 0) {
                                        for (i = start; i < a.length && more.length < min; i++) {
                                                var id = a[i];
                                                if (!d.hasRecord(id))
                                                        more.push(id);
                                        }
                                }
                        }
                        // console.log("Requesting: %d records, need %d", more.length, min);
                        d.getRecords(more, function(records) {
                                callback.call(this, records.slice(0, n));
                        }, this);
                }
        };

        P._display_ids = function(ids, vscroll) {
                this._info_display = {
                        length          : ids.length,
                        first_row_index : this._records.id_to_pos[ids[0]],
                        last_row_index  : this._records.id_to_pos[ids.peek()]
                };
                this._fetch_data(ids, 0, function(records) {
                        var buf = String.buffer();
                        records.foreach(this._fetchRowHTML.$(this, buf));
                        this.getRowsContainer().innerHTML = buf.get();
                        if (vscroll != null)
                                this._setVScroll(vscroll);
                        this._resetVSHeight();
                        if (records.length > 1)
                                this.scrollToRecord(records[1].id());
                        else
                                this._setVScroll(this.getBodyDiv().scrollTop = 0);
                        this.getBoundRecords();
                });
        };

        P.displayPage = function(page) {
                if (page == null)
                        page = 0;
                this._page = page;
                var ids = this._records.array;
                if (this._rpp) {
                        var start = page * this._rpp;
                        ids = ids.slice(start, start + this._rpp);
                }
                this._display_ids(ids);
        };

        P._resetVSHeight = function() {
                if (this._vScroll && this._info_display) {
                        h = Math.floor(this.getRowsContainer().offsetHeight *
                                       this.getNRecords() /
                                       this._info_display.length);
                        this._getVSHeightDiv().style.height = isNaN(h) ? "" : h + "px";
                }
        };

        // SOMETHING STINKS HERE!
        P._setVScroll = function(pos) {
                var v1 = this._getVSScrollDiv();
                if (pos) {
                        v1.style.height = pos + "px";
                        v1.style.display = "block";
                } else {
                        v1.style.display = "none";
                }
        };

        P.initWidths = function() {
                var maxes = {};
                this._cols.foreach(function(col){
                        maxes[col.id()] = this.getColWidth(col);
                }, this);
                var body = this.getRowsContainer();
                // iterate rows
                for (var i = body.firstChild; i; i = i.nextSibling) {
                        var cells = i.firstChild.rows[0].cells;
                        for (var j = cells.length; --j >= 0;) {
                                var td = cells[j];
                                var colid = td.getAttribute("colid");
                                maxes[colid] = Math.max(maxes[colid] || 0, td.offsetWidth);
                        }
                }
                this._cols.foreach(function(col){
                        this.setColWidth(col, maxes[col.id()]);
                }, this);
        };

        P.resetColumns = function(cols) {
                var header_row = this.getHeaderRow();
                var header_cells = header_row.cells;
                var new_headers = [];
                this._cols = cols.map(function(el, i){
                        var col = this._colsById[el.id];
                        new_headers.push(col._cell);
                        col.index = i;
                        col._width = el.width;
                        col._isVisible = el.visible;
                        return col;
                }, this);
                var df = document.createDocumentFragment();
                new_headers.foreach(function(el){
                        df.appendChild(el);
                });
                header_row.appendChild(df);
                this.refreshDisplay();
                this._cols.foreach(function(col){
                        this.setColVisible(col, col.isVisible());
                        this.setColWidth(col, col.getWidth());
                }, this);
        };

        P.reorderColumn = function(src, dest, after) {

                // remember what we're doing
                var si = src.index, di = dest.index;

                if (after)
                        di++;

                // 1. update the _cols array
                var a = this._cols;
                a.splice(si, 1);
                a.splice(si < di ? di - 1 : di, 0, src);

                // 2. recompute indexes
                for (var i = 0; i < a.length; ++i)
                        a[i].index = i;

                // 3. update the display
                for (var i = this.getRowsContainer().firstChild; i; i = i.nextSibling) {
                        var cells = i.firstChild.rows[0].cells;
                        var src = cells[si], dest = cells[di];
                        src.parentNode.insertBefore(src, dest || null);
                }

                var cells = this.getHeaderRow().cells;
                var src = cells[si], dest = cells[di];
                src.parentNode.insertBefore(src, dest || null);

                this._computeColPos();

        };

        P.getNRecords = function() {
                return this._records ? this._records.array.length : 0;
        };

        P.getNPages = function() {
                if (!this._rpp)
                        return 1;
                return Math.ceil(this.getNRecords() / this._rpp);
        };

        P.rec_isSelected = function(rec) {
                return this._selection.isSelected(rec.id());
        };

        P._computeColPos = function() {
                var pos = -1;
                this._headCont._colPos = this._cols.map(function(col){
                        pos += this.getColWidth(col);
                        return { pos: pos, col: col };
                }, this);
        };

        P._createElement = function() {
                D.BASE._createElement.call(this);
                this.getElement().id = this.id; // assign ID for unique CSS rules
                this._ss = new DlStyleSheet();
                this._cssPrefix = "#" + this.id;
                this.setContent(HTML);
                this._initHeaders();
                // this.getBodyDiv().onscroll = onBodyScroll.clearingTimeout(300, this); // @leak?
                // this.getBodyDiv().onscroll = onBodyScroll.rarify(10, 200, this);
                // this.getBodyDiv().onscroll = onBodyScroll.$(this);

                this.getBodyDiv().onscroll = this._rarify
                ? onBodyScroll.rarify(this._rarify.calls, this._rarify.timeout, this)
                : onBodyScroll.$(this);

                var h = this._headCont = new DlContainer({ parent: this, element: this.getHeaderDiv() });
                h.addEventListener({ onMouseMove  : DlDataGridHeadLabel._on_headMouseMove,
                                     onMouseLeave : DlDataGridHeadLabel._on_headMouseLeave,
                                     onMouseEnter : this._computeColPos.$(this) });

                this._bodyCont = new DlContainer({ parent: this, element: this.getBodyDiv(), drag: this._dragArgs });
                this._dragArgs = null;
                "onMouseOver onMouseOut onMouseDown onMouseUp onMouseLeave onDblClick".qw().foreach(function(ev){
                        this.addEventListener(ev, this["_body_" + ev]);
                }, this);

                this._cacheEvents = {
                        onChange  : this._data_onChange.$(this),
                        onInsert  : this._data_onInsert.$(this),
                        onDelete  : this._data_onDelete.$(this),
                        onRefresh : this._data_onRefresh.$(this)
                };

                this.setCache(this._data);
                this.addEventListener("onDestroy", this._onDestroy);

                if (this._records)
                        this.resetIDS(this._records);

                this._sel_events = { onChange : this._sel_onChange.$(this),
                                     onReset  : this._sel_onReset.$(this) };
                if (!this._selection)
                        this._selection = new DlSelectionModel({});
                this.setSelectionModel(this._selection);
        };

        P._onDestroy = function() {
                this._ss.destroy();
                this.setCache(null);
        };

        P.setCache = function(cache) {
                if (this._data)
                        this._data.removeEventListener(this._cacheEvents);
                this._data = cache;
                if (cache)
                        cache.addEventListener(this._cacheEvents);
        };

        P._data_onChange = function(rec /*, key, val, old */) {
                var el = this.getRowElement(rec.id());
                if (el) {
                        var buf = String.buffer();
                        this._fetchRowHTML(buf, rec);
                        buf = buf.get();
                        if (is_ie)
                                el.outerHTML = buf;
                        else {
                                var div = DOM.createFromHtml(buf);
                                DOM.trash(el.parentNode.replaceChild(div, el));
                        }
                }
        };

        // P._data_onChange = function(rec /*, key, val, old */) {
        //         this._fetch_data([ rec.id() ], 0, function(rec){
        //                 rec = rec[0];
        //                 var el = this.getRowElement(rec.id());
        //                 if (el) {
        //                         var buf = String.buffer();
        //                         this._fetchRowHTML(buf, rec);
        //                         buf = buf.get();
        //                         if (is_ie)
        //                                 el.outerHTML = buf;
        //                         else {
        //                                 var div = DOM.createFromHtml(buf);
        //                                 DOM.trash(el.parentNode.replaceChild(div, el));
        //                         }
        //                 }
        //         }.$(this));
        // };

        P._data_onInsert = function(rec, where) {
                var a = this._records.array;
                if (where == null)
                        where = a.length;
                a.splice(where, 0, rec.id());
                this.resetIDS(a);
                this.refreshDisplay();
        };

        P._data_onDelete = function(id) {
                var a = this._records.array;
                if (id instanceof Array) {
                        id.foreach(function(id){
                                this.remove(id);
                        }, a);
                } else
                        a.remove(id);
                this.resetIDS(a);
                this.refreshDisplay();
        };

        P._data_onRefresh = function() {};

        P._recompDynamicWidths = function() {
                var width = this.getBodyDiv().clientWidth;
                var pc = [];
                this._cols.foreach(function(col){
                        if (col.getFill() == null)
                                width -= this.getColWidth(col);
                        else
                                pc.push(col);
                }, this);
                width -= 1;
                pc.foreach(function(col){
                        this.setColWidth(col, width * col.getFill());
                }, this);
        };

        P._initHeaders = function() {
                this._colsById = {};
                this._cols.foreach(function(col, i) {
                        if (!(col instanceof DlGridCol))
                                col = this._cols[i] = new DlGridCol(col);

                        col.addEventListener("onVisibility", this.setColVisible.$(this, col));

                        col.index = i;
                        this._colsById[col.id()] = col;

                        // create CSS rule for this column
                        var cls = "DlDataGrid-col-" + col.id();
                        var sel = this._cssPrefix + " ." + cls;
                        sel = sel + "," + sel + " .DlDataGrid-cellData";
                        // var css = [ "text-align:" + col.getStyle("textAlign", "left") ];
                        var css = [];
                        var width = col.getWidth();
                        if (typeof width == "number") {
                                css.push("width:" + width + "px");
                        }
                        css = css.join(";");
                        col._cssRule = this._ss.insertRule(sel, css);

                        if (!col.isVisible())
                                this._ss.modifyRule(col._cssRule, { display: "none" });

                        // create the header button
                        var td = col._cell = document.createElement("td");
                        td.innerHTML = "<div class='DlDataGrid-cellData'></div>";
                        td.className = cls;
                        this.getHeaderRow().appendChild(td);
                        var btn = this._makeHeadLabel(
                                { parent     : this,
                                  appendArgs : td.firstChild,
                                  iconClass  : col.getIconClass(),
                                  label      : col.getLabel(),
                                  col        : col,
                                  className  : "DlGrid-align-" + col.getStyle("textAlign", "left"),
                                  tooltip    : col.getTooltip.$(col),
                                  drag       : this._getDragObject()
                                }
                        );
                        // btn.setWidth(col.getWidth());
                        col._button = btn;
                }, this);
        };

        P.findRowFromEvent = function(ev) {
                return ev_find_row(ev);
        };

        function ev_find_row(ev) {
                var p = ev.target, row, col, row_id, col_id, tn;
                try {
                        while (p && p.tagName) {
                                tn = p.tagName.toLowerCase();
                                if (tn == "div" && (row_id = p.getAttribute("recid")) != null) {
                                        row = p;
                                        break;
                                }
                                if (!col_id && tn == "td") {
                                        col = p;
                                        col_id = p.getAttribute("colid");
                                }
                                p = p.parentNode;
                        }
                } catch(ex) {}
                return row ? { row: row, col: col, id: row_id, col_id: col_id } : null;
        };

        P._sel_onChange = function(id, selected) {
                var div = this.getRowElement(id);
                if (div)
                        CC(div, selected, "DlDataGridRow-selected");
        };

        P._sel_onReset = function(oldSel, newSel) {
                var i, div;
                for (i in oldSel) {
                        if (!newSel[i]) {
                                div = this.getRowElement(i);
                                if (div)
                                        DC(div, "DlDataGridRow-selected");
                        }
                }
                for (i in newSel) {
                        if (!oldSel[i]) {
                                div = this.getRowElement(i);
                                if (div)
                                        AC(div, "DlDataGridRow-selected");
                        }
                }
        };

        P.setSelectionModel = function(sel) {
                if (this._selection)
                        this._selection.removeEventListener(this._sel_events);
                this._selection = sel;
                sel.addEventListener(this._sel_events);
        };

        P._body_onDblClick = function(ev) {
                this.callHooks("onBodyDblClick");
                var r = ev_find_row(ev);
                if (r)
                        this.callHooks("onRowDblClick", r);
        };

        P._body_onMouseOver = function(ev) {
                var r = ev_find_row(ev);
                if (r && (this.__tooltip instanceof Function)) {
                        this._tooltipRow = r;
                        DlWidget.getTooltip().popup({ timeout : this.__tooltipTimeout,
                                                      content : this.__tooltip.$(this, r),
                                                      anchor  : this.getElement(),
                                                      align   : "mouse",
                                                      onPopup : this.__onTooltipShow,
                                                      onHide  : this.__onTooltipHide,
                                                      widget  : this
                                                    });
                };
        };

        P._body_onMouseOut = function(ev) {
                var r = ev_find_row(ev);
                if (r) {
                        DlWidget.getTooltip().hide();
                        this._tooltipRow = null;
                }
        };

        P._body_onMouseLeave = function(ev) {};

        P.__handleSelectClick = function(r, ev) {
                var sel = this._selection, rs = this._records;
                if (sel.multiple) {
                        if (ev.button == 2) { // right click
                                if (!this._rtClickKeepSel) {
                                        if (ev.ctrlKey) {
                                                this.callHooks("onRowClick", r, ev, {
                                                        rtc: true,
                                                        ctrl: true,
                                                        type: "select",
                                                        ids: [ r.id ]
                                                });
                                                sel.select([ r.id ]);
                                        } else if (!sel.isSelected(r.id)) {
                                                this.callHooks("onRowClick", r, ev, {
                                                        rtc: true,
                                                        type: "reset",
                                                        ids: [ r.id ]
                                                });
                                                sel.reset([ r.id ]);
                                        }
                                }
                        } else {
                                if (ev.ctrlKey) {
                                        this.callHooks("onRowClick", r, ev, {
                                                ctrl: true,
                                                type: "toggle",
                                                ids: [ r.id ]
                                        });
                                        sel.toggle(r.id);
                                        sel._last = r.id;
                                } else if (ev.shiftKey) {
                                        if (sel._last != null) {
                                                var from = rs.id_to_pos[sel._last];
                                                var to = rs.id_to_pos[r.id];
                                                var ids = rs.array.slice(Math.min(from, to), Math.max(from, to) + 1);
                                                this.callHooks("onRowClick", r, ev, {
                                                        shift: true,
                                                        type: "reset",
                                                        ids: ids
                                                });
                                                sel.reset(ids);
                                        } else {
                                                this.callHooks("onRowClick", r, ev, {
                                                        shift: true,
                                                        type: "toggle",
                                                        ids: [ r.id ]
                                                });
                                                sel.toggle(r.id);
                                                sel._last = r.id;
                                        }
                                } else {
                                        this.callHooks("onRowClick", r, ev, {
                                                type: "reset",
                                                ids: [ r.id ]
                                        });
                                        sel.reset([ r.id ]);
                                        sel._last = r.id;
                                }
                        }
                }
                else if (!this._noReselect || !sel.isSelected(r.id)) {
                        this.callHooks("onRowClick", r, ev, {
                                type: "reset",
                                ids: [ r.id ]
                        });
                        sel.reset([ r.id ]);
                        sel._last = r.id;
                }
        };

        P._body_onMouseUp = function(ev) {
                var r1 = ev_find_row(ev), r2 = this.__handleOnMouseUp;
                if (r1 && r2 && r1.id == r2.id)
                        this.__handleSelectClick(r1, ev);
        };

        P._body_onMouseDown = function(ev) {
                var r = ev_find_row(ev), sel = this._selection;
                if (r) {
                        this.__handleOnMouseUp = !sel.isSelected(r.id) || !this._bodyCont._dragArgs || ev.ctrlKey || ev.shiftKey
                                ? null : r;
                        if (!this.__handleOnMouseUp) {
                                this.__handleSelectClick(r, ev);
                        }
                        if (ev.button != 2) {
                                // seems that stopping the event
                                // prevents the context menu from
                                // showing up on FF/Mac.
                                EX();
                        }
                }
        };

        P.scrollToRecord = function(rec_id, where) {
                var rc = this.getRowsContainer();
                var h = Math.floor(rc.offsetHeight / rc.childNodes.length);
                var pos = h * this._records.id_to_pos[rec_id || this._selection._last];
                var body = this.getBodyDiv(), st = body.scrollTop, bh = body.clientHeight;
                if (where == null) {
                        if (pos < st) {
                                body.scrollTop = pos;
                                this._setVScroll(h * this._info_display.first_row_index);
                        } else if (pos + h > st + bh) {
                                body.scrollTop = pos + h - bh;
                                this._setVScroll(h * this._info_display.first_row_index);
                        }
                } else {
                        switch (where) {
                            case "top"    : body.scrollTop = pos                    ; break;
                            case "bottom" : body.scrollTop = pos + h - bh           ; break;
                            case "center" : body.scrollTop = (2 * pos + h - bh) / 2 ; break;
                        }
                }
        };

        P.scrollHome = function() {
                this.getBodyDiv().scrollTop = 0;
        };

        P.scrollEnd = function() {
                this.getBodyDiv().scrollTop = this._getVSHeightDiv().offsetHeight;
        };

        P.scrollPage = function(page) {
                var b = this.getBodyDiv();
                b.scrollTop += page * b.clientHeight - 20;
        };

        P._handle_focusKeys = function(ev) {
                var sel = this._selection, k = ev.keyCode, c = ev.charCode, rs = this._records, index;
                switch (k) {

                    case DlKeyboard.ARROW_DOWN:
                        index = -1;
                        if (sel._last != null)
                                index = rs.id_to_pos[sel._last];
                        if (ev.shiftKey && sel.multiple) {
                                var ids = rs.array.slice(index, index + 2);
                                sel.select(ids);
                                sel._last = ids.peek();
                        } else {
                                index = rs.array.limitIndex(index + 1);
                                var id = rs.array[index];
                                sel.reset([ id ]);
                                sel._last = id;
                        }
                        this.scrollToRecord();
                        EX();
                        break;

                    case DlKeyboard.ARROW_UP:
                        index = rs.array.length;
                        if (sel._last != null)
                                index = rs.id_to_pos[sel._last];
                        if (ev.shiftKey && sel.multiple) {
                                var ids = rs.array.slice(index - 1, index);
                                sel.select(ids);
                                sel._last = ids.peek();
                        } else {
                                index = rs.array.limitIndex(index - 1);
                                var id = rs.array[index];
                                sel.reset([ id ]);
                                sel._last = id;
                        }
                        this.scrollToRecord();
                        EX();
                        break;

                    case DlKeyboard.HOME:
                        this.scrollHome();
                        EX();
                        break;

                    case DlKeyboard.END:
                        this.scrollEnd();
                        EX();
                        break;

                    case DlKeyboard.PAGE_UP:
                        this.scrollPage(-1);
                        EX();
                        break;

                    case DlKeyboard.PAGE_DOWN:
                        this.scrollPage(1);
                        EX();
                        break;
                }

                D.BASE._handle_focusKeys.call(this, ev);
        };

        P._makeHeadLabel = function(args) {
                return new this._headType(args);
        };

        P._onHeadClick = function(col, btn) {
                if (col.isSortable()){
                        col = col.id();
                        var prev = this.__sortCol || null;
                        var rev = null;
                        if (col == prev) {
                                rev = true;
                                if (this.__sortRev)
                                        rev = !rev;
                        }
                        this.__sortRev = rev;
                        this.sort(this._records.array, col, prev, rev, this._handleSort.$(this, col, rev));
                }
        };

        P.sort = function() {
                this._data.sort.apply(this._data, arguments);
        };

        P._handleSort = function(col, rev, ids) {
                this.resetIDS(ids);
                this.refreshDisplay();
                this.setSortColumn(col, rev);
        };

        P.setSortColumn = function(col, rev) {
                var prev = this.__sortCol;
                if (prev) {
                        prev = this._colsById[prev];
                        prev._button.delClass(/DlDataGridHeadLabel-sort-[^\s]+/g);
                }
                this.__sortCol = col;
                if (col) this._colsById[col]._button.condClass(
                        rev, "DlDataGridHeadLabel-sort-down", "DlDataGridHeadLabel-sort-up"
                );
        };

        P.getSortColumn = function() {
                return this.__sortCol;
        };

        P.getSortReverse = function() {
                return this.__sortRev;
        };

        P.getCol = function(col) {
                if (!(col instanceof DlGridCol))
                        col = this._colsById[col];
                return col;
        };

        P.getRec = function(rec) {
                if (!(rec instanceof DlRecord))
                        rec = this._data.get(rec);
                return rec;
        };

        P.setColWidth = function(col, w) {
                col = this.getCol(col);
                col._width = w;
                this._ss.modifyRule(col._cssRule, { width: w + "px" });
        };

        P.setColVisible = function(col, v) {
                col = this.getCol(col);
                this._ss.modifyRule(col._cssRule, { display: v ? "" : "none" });
                col._isVisible = !!v;
        };

        P.getColWidth = function(col) {
                col = this.getCol(col);
                return this.getHeaderRow().cells[col.index].offsetWidth;
        };

        P._getDragObject = function() {
                if (!this.__drag) {
                        this.__drag = new DlGridDragCol({});
                }
                return this.__drag;
        };

        P._fetchRowContentHTML = function(buf, rec) {
                buf("<table class='DlDataGrid-rowTable' cellspacing='0' cellpadding='0'><tr>");
                var cols = this._cols, n = cols.length, d = this._data, col, id, cn, i;
                for (i = 0; i < n; ++i) {
                        col = cols[i];
                        id = col.id();
                        buf("<td colid='", id, "' class='DlDataGrid-col-", id);
                        cn = d.getCellClass(rec, col.id());
                        if (cn)
                                buf(" ", cn);
                        buf("'>");
                        if (is_ie)
                                buf("<div class='DlDataGrid-cellData'>");
                        d.formatHTML(rec, col.id(), buf, col);
                        if (is_ie)
                                buf("</div>");
                        buf("</td>");
                }
                buf("</tr></table>");
        };

        P._fetchRowHTML = function(buf, rec) {
                var cls = 'DlDataGrid-row', tmp = this._data.getRecClass(rec);
                if (tmp)
                        cls += ' ' + tmp;
                if (this.rec_isSelected(rec))
                        cls += ' DlDataGridRow-selected';
                buf("<div id='", this.id, ':', rec.id(), "' class='", cls, "' recid='", rec.id(), "'>");
                this._fetchRowContentHTML(buf, rec);
                buf("</div>");
        };

        P.getRowElement = function(rec_id) {
                return document.getElementById(this.id + ":" + rec_id);
        };

        P.refreshDisplay = function() {
                this._oldScroll = null;
                var body = this.getBodyDiv(), st = body.scrollTop;
                var rc = this.getRowsContainer();
                var a = this._records.array;
                var info = this._info_display;

                if (this._rpp && a.length < this._rpp)
                        this.displayPage(0);

                if (this._rpp) {
                        // how much for one row?
                        var h = Math.floor(rc.offsetHeight / rc.childNodes.length);

                        // compute first and last rows actually visible on-screen
                        var frv = Math.ceil(st / h) - 1;
                        if (frv < 0)
                                frv = 0;
                        var lrv = Math.floor((st + body.clientHeight) / h);
                        if (lrv >= a.length)
                                lrv = a.length - 1;
                        var ids = a.slice(frv, frv + this._rpp);
                        this._display_ids(ids, h * frv);
                }
        };

        P.__doLayout = function() {
                var size = this.getInnerSize();
                var body = this.getBodyDiv();
                var header = this.getHeaderDiv();
                DOM.setOuterSize(body, size.x, size.y - header.offsetHeight);
                DOM.setOuterSize(header, size.x, null);
                //header.style.marginRight = -DOM.getScrollbarSize(body).x + "px";
                this._resetVSHeight();

                if (this._records && this._records.array.length > 0) {
                        this._oldScroll = null;
                        onBodyScroll.call(this);
                        // OR: (slower)
                        // this.refreshDisplay();
                }

                this._recompDynamicWidths();
        };

        P.getBoundRecords = function() {
                var body = this.getBodyDiv(), st = body.scrollTop;
                var rc = this.getRowsContainer();
                var a = this._records.array;
                var rh = rc.offsetHeight;

                if (rh == 0)
                        return this.__boundRecords;

                // how much for one row?
                var h = Math.floor(rh / rc.childNodes.length);

                // compute first and last rows actually visible on-screen
                var frv = Math.ceil(st / h) - 1;
                if (frv < 0)
                        frv = 0;
                var lrv = Math.floor((st + body.clientHeight) / h);
                if (lrv >= a.length)
                        lrv = a.length - 1;

                return this.__boundRecords = { first: frv, last: lrv, count: lrv - frv + 1, h: h };
        };

        function onBodyScroll() {
                if (this._processing_scroll)
                        return;
                this._processing_scroll = true;

                // 1. keep header in sync:
                var body = this.getBodyDiv(), st = body.scrollTop;
                this.getHeaderTable().style.marginLeft = -body.scrollLeft + "px";

                // virtual scrolling
                if (this._vScroll && this._records && st != this._oldScroll) {
                        var rc = this.getRowsContainer();
                        var a = this._records.array;
                        var info = this._info_display;

                        // how much for one row?
                        var h = this.getBoundRecords();

                        var frv = h.first;
                        var lrv = h.last;
                        h = h.h;

                        // console.log("frv: %d, lrv: %d", frv, lrv);

                        // how do they relate to the currently rendered data?

                        // 1. are we in the rendered frame?
                        if (frv >= info.first_row_index && lrv <= info.last_row_index) {

                                // do nothing
                                // console.log("in view");

                        } else if (lrv < info.first_row_index || frv > info.last_row_index) {

                                // completely out of view
                                var ids = a.slice(frv, frv + this._rpp);
                                this._display_ids(ids, h * frv);

                        } else if (frv < info.first_row_index) {

                                // console.log("before view by %d", info.first_row_index - frv);
                                var ids = a.slice(frv, info.first_row_index);
                                // console.log(ids);

                                this.__scrollConts++;
                                this.__cont = function(records) {
                                        var buf = String.buffer("<div>"), n = records.length;
                                        records.foreach(this._fetchRowHTML.$(this, buf));
                                        buf("</div>");
                                        var html = buf.get();
                                        var div = DOM.createFromHtml(html), df;
                                        try {
                                                var r = document.createRange(), c = rc.childNodes;
                                                r.selectNodeContents(div);
                                                df = r.extractContents();
                                                r.detach();
                                                r = document.createRange();
                                                r.setStartBefore(c[c.length - n]);
                                                r.setEndAfter(c[c.length - 1]);
                                                r.deleteContents();
                                        } catch(ex) {
                                                // console.log(ex);
                                                if (!df)
                                                        df = document.createDocumentFragment();
                                                while (div.firstChild) {
                                                        rc.removeChild(rc.lastChild);
                                                        df.appendChild(div.firstChild);
                                                }
                                        }
                                        rc.insertBefore(df, rc.firstChild);

                                        this._setVScroll(h * frv);
                                        info.first_row_index = frv;
                                        info.last_row_index -= n;
                                };
                                this._fetch_data(ids, -1, function(records) {
                                        this.__scrollConts--;
                                        if (this.__scrollConts == 0)
                                                this.__cont(records);
                                });

                        } else if (lrv > info.last_row_index) {

                                // console.log("after view by %d", lrv - info.last_row_index);
                                var ids = a.slice(info.last_row_index + 1, lrv + 1);
                                // console.log(ids);

                                this.__scrollConts++;
                                this.__cont = function(records) {
                                        var buf = String.buffer("<div>"), n = records.length;
                                        records.foreach(this._fetchRowHTML.$(this, buf));
                                        buf("</div>");
                                        var html = buf.get();
                                        var div = DOM.createFromHtml(html), df;
                                        try {
                                                var r = document.createRange();
                                                r.selectNodeContents(div);
                                                df = r.extractContents();
                                                r.detach();
                                                r = document.createRange();
                                                r.setStartBefore(rc.firstChild);
                                                r.setEndBefore(rc.childNodes[n]);
                                                r.deleteContents();
                                        } catch(ex) {
                                                // console.log(ex);
                                                if (!df)
                                                        df = document.createDocumentFragment();
                                                while (div.firstChild) {
                                                        rc.removeChild(rc.firstChild);
                                                        df.appendChild(div.firstChild);
                                                }
                                        }
                                        rc.appendChild(df);

                                        this._setVScroll(this._getVSScrollDiv().offsetHeight + (h * n));
                                        info.first_row_index += n;
                                        info.last_row_index = lrv;
                                };
                                this._fetch_data(ids, 1, function(records) {
                                        this.__scrollConts--;
                                        if (this.__scrollConts == 0)
                                                this.__cont(records);
                                });

                        }

                        this._oldScroll = st;
                }

                this.callHooks("onBodyScroll");

                this._processing_scroll = false;
        };

});

DEFINE_CLASS("DlDragDataGrid", DlDrag, function(D, P) {

        P.startOK = function(body, ev) {
                var grid = body.parent, found = false, el = ev.target;
                while (el && el != body.getElement()) {
                        if (el == grid._getVSHeightDiv()) {
                                found = true;
                                break;
                        }
                        el = el.parentNode;
                }
                if (found && grid._selection.getArray().length > 0)
                        this.grid = grid;
                else
                        found = false;
                return found;
        };

        P.reset = function() {
                this.grid = null;
                D.BASE.reset.apply(this, arguments);
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require container.js
// @require geometry.js

DEFINE_CLASS("DlDesktop", DlContainer, function(D, P){

	D.DEFAULT_ARGS = {
		_bounds : [ "bounds", new DlRect(50, 30, 800, 600) ]
	};

	P._createElement = function() {
		D.BASE._createElement.call(this);
		var div = this.getElement();
		this._bounds.positionDiv(div);
		document.body.appendChild(div);
	};

        if (is_ie)
                var resizeDivID = Dynarch.ID("IEsux"), IEresize = function() {
		        var tmp = document.getElementById(resizeDivID);
		        if (!tmp) {
			        tmp = document.createElement("div");
			        tmp.style.position = "absolute";
			        tmp.style.right =
				        tmp.style.bottom =
				        tmp.style.width =
				        tmp.style.height = "0px";
			        tmp.style.zIndex = "-100";
			        document.body.appendChild(tmp);
		        }
		        this.setSize({ x: tmp.offsetLeft,
                                       y: tmp.offsetTop + tmp.offsetHeight });
	        };

	P.fullScreen = function() {
		var s = this.getElement().style;
		s.top = "0px";
		s.left = "0px";
		s.width = "100%";
		s.height = "100%";
		var handler;
		if (!is_ie)
			handler = this.callHooks.$(this, "onResize");
		else
			handler = IEresize.$(this);
		DynarchDomUtils.addEvent(window, "resize", handler.clearingTimeout(25));
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require container.js

// @deprecate?

DEFINE_CLASS("DlTable", DlContainer, function(D, P, DOM){

        var CE = DOM.createElement;

	D.FIXARGS = function(args) {
		args.tagName = "table";
		this._colSpan = 0;
	};

	D.DEFAULT_ARGS = {
		__cellSpacing : [ "cellSpacing", null ],
		__cellPadding : [ "cellPadding", null ],
		__align       : [ "align"      , null ]
	};

	P._createElement = function() {
		D.BASE._createElement.call(this);
		var el = this.getElement();
		if (this.__cellPadding != null)
			el.cellPadding = this.__cellPadding;
		if (this.__cellSpacing != null)
			el.cellSpacing = this.__cellSpacing;
		if (this.__align != null)
			el.align = this.__align;
		CE("tbody", null, null, el);
	};

	P.getContentElement = function() {
		return this.getElement().firstChild;
	};

	P.addRow = function() {
		return new DlTableRow({ parent: this });
	};

	P.getRow = function(index) {
		return this.children(index);
	};

	P.addCell = function(row, align, valign) {
		var cell = new DlTableCell({ parent: row });
		if (align != null)
			cell.addClass("DlAlign-" + align);
		if (valign != null) {
			var s = cell.getElement().style;
			s.verticalAlign = valign;
		}
		var index = cell.getElement().cellIndex + 1;
		if (index > this._colSpan)
			this._colSpan = index;
		return cell;
	};

	P.getColSpan = function() {
		return this._colSpan;
	};

	P.setColSpan = function(colSpan) {
		this._colSpan = colSpan;
	};

	P.addSeparator = function(span) {
		if (span == null)
			span = this.getColSpan();
		CE("div", null, { innerHTML: "&nbsp;" },
		   CE("td", null, { colSpan: span },
		      CE("tr", null, { className: "DlTable-RowSeparator" },
			 this.getContentElement())));
	};

});

DEFINE_CLASS("DlTableRow", DlContainer, function(D, P){
        D.DEFAULT_ARGS = {
                // override in DlWidget
                _tagName: [ "tagName", "tr" ]
        };
});

DEFINE_CLASS("DlTableCell", DlContainer, function(D, P){
        D.DEFAULT_ARGS = {
                // override in DlWidget
                _tagName: [ "tagName", "td" ]
        };
});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require table.js

DEFINE_CLASS("DlFieldGrid", DlTable, function(D, P) {

        D.CONSTRUCT = function() {
                this.__fields = {};
        };

	P.addField = function(args, opts, ret) {
		var entry = args.widget || new DlEntry(args);
		var label = args.label;
                if (!opts)
                        opts = {};
                if (label) {
		        if (!(label instanceof DlWidget)) {
			        label = new DlLabel({ label  : args.label.makeLabel(),
					              widget : entry });
                        } else if (label instanceof DlLabel) {
                                label.setWidget(entry);
                        }
                }
		var row = this.addRow();
		var c1 = this.addCell(row, "right", args.valign);
                c1.addClass("DlFieldGrid-labelCell");
		if (args.valign == "top" && (label instanceof DlLabel))
			c1.getElement().style.paddingTop = args.vtop || "4px";
                if (label)
		        c1.appendWidget(label);
		if (opts.middleText) {
			var tmp = this.addCell(row);
			tmp.setContent(opts.middleText);
		}
		var c2 = this.addCell(row);
		c2.appendWidget(entry);
                var id = args.id || args.name;
		if (id != null) {
			this.__fields[id] = entry.getWidgetId();
                        delete args["id"];
                }
		if (opts) {
			var el = c2.getElement();
			if (opts.colSpan)
				el.colSpan = opts.colSpan;
			if (opts.rowSpan)
				el.rowSpan = opts.rowSpan;
		}
		if (ret) {
			ret.row = row;
			ret.c1 = c1;
			ret.c2 = c2;
			ret.label = label;
			ret.entry = entry;
		}
		return entry;
	};

	P.getField = function(id) {
		return id ? DlWidget.getById(this.__fields[id]) : this.__fields;
	};

        P.setField = function(name, widget) {
                this.__fields[name] = widget.getWidgetId();
        };

	P.getValue = function() {
		var val = {};
		for (var name in this.__fields) {
			var w = this.getField(name), f = w.getFormValue || w.getValue;
			if (f instanceof Function) {
                                if (w instanceof DlAbstractButton && w._checkTwoState(true)) {
                                        var v = f.call(w);
                                        if (typeof v == "boolean") {
                                                val[name] = v;
                                        } else if (v == null) {
                                                val[name] = w.checked();
                                        } else if (w.checked()) {
                                                val[name] = v;
                                        }
                                } else {
				        val[name] = f.call(w);
                                }
                        }
		}
                return val;
	};

        P.getValues = P.getValue;

        P.setValue = function(hash) {
                for (var name in hash) {
                        var w = this.getField(name), v = hash[name], f;
                        if (w) {
                                f = w.setFormValue || w.setValue;
                                if (f instanceof Function) {
                                        if (w instanceof DlAbstractButton && w._checkTwoState(true)) {
                                                w.checked(typeof v == "string"
                                                          ? v != "0"
                                                          : !!v);
                                        } else {
                                                f.call(w, v);
                                        }
                                }
                        }
                }
        };

        P.setValues = P.setValue;

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require container.js

DEFINE_CLASS("DlFieldset", DlContainer, function(D, P, DOM){

        D.DEFAULT_ARGS = {
	        _label : [ "label", "DlFieldset" ]
        };

        P._createElement = function() {
	        D.BASE._createElement.call(this);
 	        this.getElement().innerHTML = [
                        "<span class='DlFieldset-label'>", this._label, "</span>",
 			"<div class='DlFieldset-content'></div>"
                ].join("");
        };

        P.getContentElement = function() {
	        return this.getElement().childNodes[1];
        };

        P.getLabelElement = function() {
                return this.getElement().firstChild;
        };

        P.setOuterSize = P.setSize = function(sz) {
                var p1 = DOM.getPos(this.getLabelElement()),
                    p2 = DOM.getPos(this.getContentElement()),
                    diff = p2.y - p1.y;
                DOM.setOuterSize(this.getElement(), sz.x, sz.y - diff);
                sz = DOM.getInnerSize(this.getElement());
                DOM.setOuterSize(this.getContentElement(), sz.x, sz.y);
                this.callHooks("onResize");
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

(function(){

        var CTORS = {}, OBJECTS = {};

        window.DlSingleton = {
                get : function(type, noCreate) {
		        return OBJECTS[type] || !noCreate && (OBJECTS[type] = new CTORS[type]());
	        },
	        register : function(type, ctor, globalize) {
		        CTORS[type] = ctor;
                        if (globalize)
                                window[type] = this.get.$C(type);
	        }
        };

})();

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require singleton.js
// @require eventproxy.js

DEFINE_SINGLETON("DlFlashUtils", DlEventProxy, function(D, P) {

        D.DEFAULT_EVENTS = [ "onLoad", "onStorageStatus" ];

        var HTML = is_ie
                ? String.template(
                        '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="215" height="138" id="DlFlashUtils-MOVIE" align="middle">',
                        '<param name="allowScriptAccess" value="always" />',
                        '<param name="movie" value="$url" />',
                        '<param name="quality" value="high" />',
                        '</object>'
                ) : String.template(
                        '<embed id="DlFlashUtils-MOVIE" src="$url" quality="high" bgcolor="#ffffff" width="215" height="138" ',
                        'allowScriptAccess="always" ',
                        'type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'
                );

        var OBJ = null;

        window.DlFlashUtils_init = function(o) {
                DlFlashUtils().callHooks("onLoad");
        };

        P.init = function() {
                if (!OBJ) {
                        var html = HTML({ url: Dynarch.getFileURL("swf/flash.swf") });
                        document.write("<div style='position: absolute; z-index: 31000; left: -256px; top: 50%; margin-left: -108px; margin-top: -69px; width: 216px; height: 138px;'>" + html + "</div>");
                        OBJ = document.getElementById('DlFlashUtils-MOVIE');
                }
        };

        P.getObject = function() {
                return OBJ;
        };

        P.display = function(disp) {
                OBJ.parentNode.style.left = disp ? "50%" : "-256px";
        };

        {
                // IE Flash detection
                // adapted after http://www.featureblend.com/flash_detect_1-0-3/flash_detect.js

                function getAXVersion(obj) {
                        var v = null;
                        try {
                                v = obj.GetVariable("$version");
                        } catch(ex) {}
                        return v;
                };

                var IE_DETECT = {
                        "ShockwaveFlash.ShockwaveFlash.7" : getAXVersion,
                        "ShockwaveFlash.ShockwaveFlash.6" : function(obj) {
                                var version = "Win 6,0,21";
                                try{
                                        obj.AllowScriptAccess = "always";
                                        version = getAXVersion(obj);
                                } catch(ex) {}
                                return version;
                        },
                        "ShockwaveFlash.ShockwaveFlash" : getAXVersion
                };
        }

        P.isSupported = function() {
                var p = navigator.plugins;
                if (p && p.length) {
                        p = p["Shockwave Flash"];
                        if (p && p.description && /^Shockwave Flash\s+([^\s]+)/i.test(p.description))
                                return parseFloat(RegExp.$1) >= 8;
                } else if (is_ie) {
                        for (var i in IE_DETECT) {
                                try {
                                        var obj = new ActiveXObject(i);
                                        if (obj) {
                                                var v = IE_DETECT[i](obj);
                                                if (v != null) {
                                                        v = v.split(/\s+/)[1];
                                                        return parseFloat(v) >= 8; // supported!
                                                }
                                        }
                                } catch(ex) {}
                        }
                }
                return false;
        };

        P.loadPolicyFile = function(addr) {
                return this.getObject().DlSocket_loadPolicyFile(addr);
        };

        // we need the following because Flash developers
        // were unbelievably stupid.

        var decodeString = P.decodeString = function(str) {
                return str.replace(/%22/g, "\"").replace(/%5c/g, "\\").replace(/%26/g, "&").replace(/%25/g, "%");
        };

        var decodeObject = P.decodeObject = function(obj) {
                var i, tmp;
                if (obj instanceof Array) {
                        for (i = obj.length; --i >= 0;)
                                obj[i] = decodeObject(obj[i]);
                } else if (typeof obj == "object") {
                        if (obj == null)
                                return obj;
                        tmp = {};
                        for (i in obj)
                                tmp[decodeString(i)] = decodeObject(obj[i]);
                        obj = tmp;
                } else if (typeof obj == "string") {
                        obj = decodeString(obj);
                }
                return obj;
        };

});

DlFlashStore = {

        set : function(key, val) {
                DlFlashUtils().getObject().DlStorage_set(key, val);
        },

        get : function(key) {
                return DlFlashUtils().decodeObject(DlFlashUtils().getObject().DlStorage_get(key));
        },

        getAllKeys : function() {
                return DlFlashUtils().decodeObject(DlFlashUtils().getObject().DlStorage_getAllKeys());
        },

        remove : function(key) {
                DlFlashUtils().getObject().DlStorage_remove(key);
        },

        clear : function() {
                DlFlashUtils().getObject().DlStorage_clear();
        },

        flush : function(showUI) {
                var val = DlFlashUtils().getObject().DlStorage_flush();
                if (showUI && val == "pending") {
                        DlFlashUtils().display(true);
                }
                return val;
        },

        _onStatus : function(info) {
                DlFlashUtils().display(false);
                DlFlashUtils().applyHooks("onStorageStatus", [ info ]);
        }

};

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require layout.js

// @deprecate! I should remove this file; the API is confusing, the name is
//             confusing, not to mention it only works well with FF.

DEFINE_CLASS("DlGridLayout", DlLayout, function(D, P, DOM){

        var CE = DOM.createElement,
            AC = DOM.addClass;

	D.DEFAULT_ARGS = {
		__layout      : [ "layout", null ],
		__layoutHTML  : [ "layoutHTML", null ],
		__cellSpacing : [ "cellSpacing", 0 ],
		__cellPadding : [ "cellPadding", 1 ]
	};

/*

Format for __layout:

  [ row1, row2, ... ]

Each row:

  {
    props: { minHeight : true ?,
             height : height spec. ?
           },                         (or NULL for all defaults)
    cells: [ cell1, cell2, ... ]
  }

Each cell:

  null: all defaults

  {
    minWidth : true ?
    width    : width spec. ?
    colSpan
    rowSpan
    className
  }

*/

	var CELL_STYLE_PROPS = [
		"width",
		"padding",
		"paddingLeft",
		"paddingRight",
		"paddingTop",
		"paddingBottom",
		"verticalAlign",
		"textAlign",
		"whiteSpace"
	];

	P._createElement = function() {
		D.BASE._createElement.call(this);
		var table;
		if (!this.__layoutHTML) {
			table = CE("table", null, { cellSpacing: this.__cellSpacing,
						    cellPadding: this.__cellPadding,
						    className: "DlGridLayout-table" });
			CE("tbody", null, null, table);
			var rows = this.__layout;
			rows.foreach(function(row) {
				var row_props = row.props;
				var tr = table.insertRow(-1);
				if (row_props && row_props.minHeight) {
					AC(tr, "DlGridLayout-tr-minHeight");
					tr.minHeight = true;
				}
				row.cells.foreach(function(cell, i) {
					var td = tr.insertCell(-1);
					if (i == 0 && row_props && row_props.height) {
						td.style.height = row_props.height;
					}
					if (cell) {
						if (cell.colSpan)
							td.colSpan = cell.colSpan;
						if (cell.className)
							td.className = cell.className;
						if (cell.rowSpan)
							td.rowSpan = cell.rowSpan;
						if (cell.minWidth)
							AC(td, "DlGridLayout-td-minWidth");
						if (cell.minHeight) {
							td.minHeight = true;
							AC(td, "DlGridLayout-td-minHeight");
						}
						CELL_STYLE_PROPS.r_foreach(function(prop) {
							var val = cell[prop];
							if (val != null)
								this[prop] = val;
						}, td.style);
					}
				});
			});
			// this.setContent(table);
			this.getElement().appendChild(table);
		} else {
			this.setContent(this.__layoutHTML);
			table = this.getElement().getElementsByTagName("table")[0];
		}
		this.refNode("__table", table);
	};

	P._appendWidgetElement = function(w, pos) {
		if (pos.inCell) {
			// request to append the widget directly to a certain cell
			var td = this.getCellElement(pos.row, pos.col);
			td.appendChild(w.getElement());
			w._dllayout_args = pos;
		} else
			D.BASE._appendWidgetElement.call(this, w, pos);
	};

	P._removeWidgetElement = function(w) {
		if (this._widgets.contains(w)) {
			if (!w._dllayout_args.inCell)
				D.BASE._removeWidgetElement.call(this, w);
			else {
				var el = w.getElement();
				el.parentNode.removeChild(el);
			}
		}
	};

	P.getTableElement = function() {
		return this.__table;
	};

	P.getCellElement = function(row, col) {
		return this.getTableElement().rows[row].cells[col];
	};

	P.doLayout = function() {
		var wa = this.children();
		(2).times(function(iteration) {
			wa.foreach(function(wid) {
				var pos = wid._dllayout_args;
				if (!pos.inCell) {
					var td = this.getCellElement(pos.row, pos.col);
					var x = td.offsetLeft, y = td.offsetTop;
					var w = td.offsetWidth, h = td.offsetHeight;
					if (iteration == 0) {
						var sz = wid.getOuterSize();
						if ((td.minHeight || td.parentNode.minHeight) && h < sz.y) {
							td.style.height = sz.y + "px";
						}
					} else {
						var div = wid.getElement().parentNode.style;
						div.left = x + "px";
						div.top = y + "px";
						wid.setOuterSize({ x: w, y: h });
					}
				}
			}, this);
		}, this);
	};

	P.showWidgets = function(show) {
		if (arguments.length == 0)
			show = true;
		this.children().r_foreach(function(w) {
			w.display(show);
		});
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require jslib.js

DlHtmlUtils = {

	_blockTags : ("body form textarea fieldset ul ol dl dd dt li div blockquote " +
		      "p h1 h2 h3 h4 h5 h6 quote pre table thead " +
		      "tbody tfoot tr td iframe address").hashWords(),

	_quickTags : "br hr input link meta img".hashWords(),

	_headingTags : "h1 h2 h3 h4 h5 h6".hashWords(),

	_descTags : "p blockquote td div li".hashWords(),

	isBlockElement : function(el) {
		return el && el.nodeType == 1 && (el.tagName.toLowerCase() in DlHtmlUtils._blockTags);
	},

	needsClosingTag : function(el) {
		return el && el.nodeType == 1 && !(el.tagName.toLowerCase() in DlHtmlUtils._quickTags);
	},

	htmlEncode : function(s) {
 		return String(s)
                        .replace(/&/g, "&amp;")
 			.replace(/</g, "&lt;")
 			.replace(/>/g, "&gt;")
 			.replace(/\x22/g, "&quot;")
 			.replace(/\u00A0/g, "&#xa0;");
	},

	getHTML : function(root, outputRoot, withMeta) {
		var D		     = DlHtmlUtils;
		var html	     = [];
		var hi		     = 0;
		var needsClosingTag  = D.needsClosingTag;
		var htmlEncode	     = D.htmlEncode;
		var getText	     = D.getInnerText;
		var title	     = null;
		var description	     = null;
		var content_start    = null;
		var descTags	     = D._descTags;
		var headingTags	     = D._headingTags;
		var newlineMode      = 0;
		function rec(root, outputRoot) {
                        var i;
			switch (root.nodeType) {
			    case 11: // DOCUMENT_FRAGMENT
				outputRoot = false;
			    case 1: // ELEMENT
				var tag = root.tagName.toLowerCase();
                                if (root.className == "DynarchLIB-REMOVE-ME")
                                        break;
				if (outputRoot) {
					var closed = !(root.hasChildNodes() || needsClosingTag(root));
					if (tag == "br") {
						if (root.previousSibling && !root.nextSibling)
							break;
						if (newlineMode) {
							html[hi++] = "\n";
							break;
						}
					}
					if (withMeta) {
						if (title == null && tag in headingTags) {
							title = getText(root);
							content_start = 0; // content starts after this tag!
						} else if (description == null && tag in descTags) {
							description = getText(root);
						}
					}
					html[hi++] = "<";
					html[hi++] = tag;
					var attrs = root.attributes;
					for (i = 0; i < attrs.length; ++i) {
						var a = attrs.item(i);
						if (!a.specified)
							continue;
						var name = a.nodeName.toLowerCase();
						if (/^_moz|^_msh/.test(name))
							continue;
						var value;
						if (name != "style") {
							if (typeof root[a.nodeName] != "undefined"
							    && name != "href"
							    && name != "src"
							    && !/^on/.test(name))
								value = root[a.nodeName];
							else
								// FIXME: IE converts URL-s to absolute
								value = a.nodeValue;
						} else
							value = root.style.cssText;
						if (/(_moz|^$)/.test(value))
							continue;
						html[hi++] = " " + name + '="' + htmlEncode(value) + '"';
					}
					html[hi++] = closed ? " />" : ">";
				}
				if (tag == "pre")
					++newlineMode;
				for (i = root.firstChild; i; i = i.nextSibling)
					rec(i, true);
				if (tag == "pre")
					--newlineMode;
				if (outputRoot && !closed)
					html[hi++] = "</" + tag + ">";
				if (content_start === 0)
					content_start = hi;
				break;
			    case 3: // TEXT
				if (/^(script|style)$/i.test(root.parentNode.tagName)) {
					if (root.data.indexOf("/*<![CDATA[*/") != 0) {
						html[hi++] = "/*<![CDATA[*/";
						html[hi++] = root.data;
						html[hi++] = "/*]]>*/";
					} else {
						html[hi++] = root.data;
					}
				} else
					html[hi++] = root.data.htmlEscape();
				break;

			    case 4: // CDATA_SECTION_NODE -- WARNING! this is technically a mistake
			    case 8: // COMMENT
				html[hi++] = "<!--";
				html[hi++] = root.data;
				html[hi++] = "-->";
				break;
			}
		};
		rec(root, outputRoot);
		var content = html.join("");
		if (withMeta) {
			content = { title	    : title,
				    description	    : description,
				    content	    : content,
				    contentButTitle : "" };
			if (content_start)
				content.contentButTitle = html.slice(content_start).join("");
		}
		return content;
	},

	getInnerText : function(el) {
		if (el.innerText != null)
			return el.innerText;
		if (el.textContent != null)
			return el.textContent;
	},

	getText : function(node) {
		var tmp = node.cloneNode(true);
		var a = tmp.getElementsByTagName("*");
		for (var i = a.length; --i >= 0;) {
			var el = a[i];
			if (DlHtmlUtils.isBlockElement(el)) {
				var sep = el.ownerDocument.createTextNode(" ");
				el.insertBefore(sep, el.firstChild);
				el.appendChild(sep.cloneNode(true));
			}
		}
		var txt = DlHtmlUtils.getInnerText(tmp);
                DynarchDomUtils.trash(tmp);
                return txt;
	},

	_can_t_DeleteFull_tags : "td".hashWords(),

	canDeleteFullNode : function(tag) {
		return !(tag.toLowerCase() in DlHtmlUtils._can_t_DeleteFull_tags);
	},

	_can_t_DeleteContent_tags : "ul ol dd table tr img br hr".hashWords(),

	canDeleteContent : function(tag) {
		return !(tag.toLowerCase() in DlHtmlUtils._can_t_DeleteContent_tags);
	},

	_can_t_StripNode_tags : "ul ol li dd dt dl img br hr table tr td object applet iframe form textarea".hashWords(),

	canStripNode : function(tag) {
		return !(tag.toLowerCase() in DlHtmlUtils._can_t_StripNode_tags);
	}

};

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require abstractbutton.js

// @deprecate?

DEFINE_CLASS("DlIconListView", DlContainer);

DEFINE_CLASS("DlIconListItem", DlAbstractButton, function(D, P) {

	D.DEFAULT_ARGS = {
		__itemSize     : [ "itemSize"    , { x: 100, y: null } ],
		__itemSpacing  : [ "itemSpacing" , 0 ],
		__spaceEvenly  : [ "spaceEvenly" , false ],
		__iconSize     : [ "iconSize"	 , { x: 40, y: 40 } ],
		__iconAbove    : [ "iconAbove"	 , true ],
		_btnType       : [ "type"        , DlAbstractButton.TYPE.TWOSTATE ],
		_tagName       : [ "tagName"	 , "table" ],
		_classes       : [ "classes"	 , { active    : "DlIconListItem-active",
		                                     hover     : "DlIconListItem-hover",
		                                     checked   : "DlIconListItem-1",
		                                     unchecked : "DlIconListItem-0",
		                                     empty     : "DlIconListItem-empty",
		                                     disabled  : "DlIconListItem-disabled"
		                                   } ],
		_iconClass     : [ "iconClass"   , null ]
	};

        var ICON_LABEL_CLASSES = [ "DlIconListItem-iconCell", "DlIconListItem-labelCell" ];

	P._createElement = function() {

                // DlAbstractButton's createElement is not suitable!
		DlWidget.prototype._createElement.call(this);

		var table = this.getElement();
		table.cellSpacing = table.cellPadding = 0;
		if (this.__spaceEvenly)
			table.style.margin = this.__itemSpacing + "px";
		else
			table.style.marginRight = table.style.marginBottom = this.__itemSpacing + "px";
		table.insertRow(-1).insertCell(-1);
		table.insertRow(-1).insertCell(-1);
		table.align = "left";
		this.setIconAbove(this.__iconAbove, true);
		this.setIconClass(this._iconClass);
		this.label(this._label, true);
		this.setIconSize(this.__iconSize);
		this._updateState();
	};

	P.setIconClass = function(className) {
		this.getIconCell().className = ICON_LABEL_CLASSES[0] + " " + className;
	};

	P.getIconCell = function() {
		return this.getElement().rows[this.__iconAbove ? 0 : 1].cells[0];
	};

	P.getLabelCell = function() {
		return this.getElement().rows[this.__iconAbove ? 1 : 0].cells[0];
	};

	P.setIconSize = function(sz) {
		DynarchDomUtils.setInnerSize(this.getIconCell(), sz.x, sz.y);
		this.__iconSize = sz;
	};

	P.getIconSize = function() {
		return this.__iconSize;
	};

	P.setIconAbove = function(ia, init) {
		var rows = this.getElement().rows;
		if (init) {
			rows[0].cells[0].className = ICON_LABEL_CLASSES[ia ? 0 : 1];
			rows[1].cells[0].className = ICON_LABEL_CLASSES[ia ? 1 : 0];
		} else if (ia !== this.__iconAbove) {
			// I think just switching them is in order
			rows[1].parentNode.insertBefore(rows[1], rows[0]);
		}
		this.__iconAbove = ia;
	};

	P.label = function(label, force) {
		if (label != null && (force || label !== this._label)) {
			this._label = label;
			this.getLabelCell().innerHTML = String.buffer(
				"<div class='DlIconListItem-labelDiv' style='width:",
				this.__itemSize.x,
				"px'>", label, '</div>').get();
			this.applyHooks("onUpdateLabel", [ this._label ]);
		}
		return this._label;
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

DlJSON = {

	RE_strings : /(\x22(\\.|[^\x22\\])*\x22|\x27(\\.|[^\x27\\])*\x27)/g,
	RE_forbid  : /([\n;()+=\x2f*-])/g,
	//RE_forbid  : /([;()+=\x2f*.-])/g,

	encode : function(obj) {
		var tmp, i;
                if (obj == null) {
			tmp = "null";
		} else if (obj.dynarchlib_toJSON) {
                        tmp = obj.dynarchlib_toJSON();
                } else if (obj instanceof Array) {
			tmp = "[" + obj.map(DlJSON.encode).join(",") + "]";
		} else if (obj instanceof Date) {
			tmp = DlJSON.encode(obj.toUTCString());
		} else if (typeof obj == "object") {
			tmp = [];
			for (i in obj)
				tmp.push(DlJSON.encode(i) + ":" + DlJSON.encode(obj[i]));
			tmp = "{" + tmp.join(",") + "}";
		} else if (typeof obj == "string") {
			tmp = '"' + obj.replace(/\x5c/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/\t/g, "\\t").replace(/\x22/g, "\\\"") + '"';
		} else
			tmp = obj.toString();
		return tmp;
	},

        encodeIndented: function(obj, level) {
                if (level == null) level = 2;
                var current = 0;
                function with_indent(cont) {
                        // return ++indent,cont(indent--); // interesting way to minify this?
                        ++current;
                        cont = cont();
                        --current;
                        return cont;
                };
                function indent(line) {
                        return " ".repeat(current * level) + line;
                };
                return function rec(obj) {
		        var tmp;
                        if (obj == null) {
			        tmp = "null";
		        } else if (obj.dynarchlib_toJSON) {
                                tmp = obj.dynarchlib_toJSON();
                        } else if (obj instanceof Array) {
			        tmp = "[ " + obj.map(rec).join(", ") + " ]";
		        } else if (obj instanceof Date) {
			        tmp = rec(obj.toUTCString());
		        } else if (typeof obj == "object") {
			        tmp = with_indent(function(){
                                        var tmp = [];
                                        for (var i in obj) tmp.push(rec(i) + " : " + rec(obj[i]));
                                        return tmp.map(indent).join(",\n") + "\n";
                                });
			        tmp = "{\n" + tmp + indent("}");
		        } else if (typeof obj == "string") {
			        tmp = '"' + obj.replace(/\x5c/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/\t/g, "\\t").replace(/\x22/g, "\\\"") + '"';
		        } else
			        tmp = obj.toString();
		        return tmp;
                }(obj);
        },

	decode : function(str, safe) {
		if (!safe) {
                        str = str.trim();
			var tmp = str.replace(DlJSON.RE_strings, "");
			if (DlJSON.RE_forbid.test(tmp))
				throw new DlSecurityException("Character " + RegExp.$1 + " not allowed in JSON input!");
		}
		try {
			return Dynarch.evalClean(str);
		} catch(ex) {
			throw new DlDataException("Malformed data in JSON input: " + ex);
		}
	},

	domToObject : function(el) {
		var obj = {};
		var text = String.buffer();
		for (var i = el.firstChild; i; i = i.nextSibling) {
			if (i.nodeType == 1) {
				var o = DlJSON.domToObject(i), tag = i.nodeName;
				if (!(tag in obj)) {
					obj[tag] = o;
				} else {
					if (!(obj[tag] instanceof Array))
						obj[tag] = [ obj[tag] ];
					obj[tag].push(o);
				}
			} else if (i.nodeType == 3) {
				text(i.nodeValue);
			}
		}
		obj.$text = text.get();
		return obj;
	}

};

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

var DlKeyboard = {

	BACKSPACE   : 8,
	TAB         : 9,
	ENTER       : 13,
	ESCAPE      : 27,
        SPACE       : 32,
        DASH        : 45,
	PAGE_UP     : 33,
	PAGE_DOWN   : 34,
	END         : 35,
	HOME        : 36,
	ARROW_LEFT  : 37,
	ARROW_UP    : 38,
	ARROW_RIGHT : 39,
	ARROW_DOWN  : 40,
        INSERT      : 45,
	DELETE      : 46,
        F1          : 112,
        F2          : 113,
        F3          : 114,
        F4          : 115,
        F5          : 116,
        F6          : 117,
        F7          : 118,
        F8          : 119,
        F9          : 120,
        F10         : 121,
        F11         : 122,
        F12         : 123,

	parseKey : function(str) {
		var o = {}, m;
                str = str.toUpperCase();
		if ((m = /^([a-z]+)\s+\x27(.)\x27$/i.exec(str))) {
			o[m[1]] = true;
			o.key = m[2];
		} else if ((m = /^([a-z]+)-([a-z]+)\s+\x27(.)\x27$/i.exec(str))) {
			o[m[1]] = o[m[2]] = true;
			o.key = m[3];
		} else if ((m = /^([a-z]+)-([a-z]+)-([a-z]+)\s+\x27(.)\x27$/i.exec(str))) {
			o[m[1]] = o[m[2]] = o[m[3]] = true;
			o.key = m[4];
		}
		return o;
	},

        checkKey : function(ev, k) {
                if (typeof k == "string")
                        k = DlKeyboard.parseKey(k);
                return ( ((!k.CTRL  && !ev.ctrlKey)   ||  (k.CTRL    && ev.ctrlKey)) &&
			 ((!k.ALT   && !ev.altKey)    ||  (k.ALT     && ev.altKey)) &&
			 ((!k.SHIFT && !ev.shiftKey)  ||  (k.SHIFT   && ev.shiftKey)) &&
			 ev.keyStr.toUpperCase() == k.key.toUpperCase() );
        }

};

DlKeyboard.KEYS_CONTROL = [
	"BACKSPACE", "TAB", "DELETE", "ESCAPE", "ENTER",
	"PAGE_UP", "PAGE_DOWN", "END", "HOME",
	"ARROW_LEFT", "ARROW_UP", "ARROW_RIGHT", "ARROW_DOWN"
].keys_map(DlKeyboard).toHash(true);

DlKeyboard.KEYS_MOVE = [
        "ARROW_LEFT", "ARROW_UP", "ARROW_RIGHT", "ARROW_DOWN"
].keys_map(DlKeyboard).toHash(true);

DlKeyboard.KEYS_MOVE_PREV = [
        "ARROW_LEFT", "ARROW_UP"
].keys_map(DlKeyboard).toHash(true);

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require abstractbutton.js

DEFINE_CLASS("DlLabel", DlAbstractButton, function(D, P){

        D.DEFAULT_ARGS = {
		_activateWidget  : [ "widget"  , null ],

                // override in DlWidget
                _tagName         : [ "tagName" , "span" ]
	};

	P._onMouseDown = function(ev) {
		var w = this._activateWidget;
		if (w) {
			w.focus();
                        ev.domStop = true;
                        DlException.stopEventBubbling();
		}
	};

	P.setWidget = function(widget) {
		this._activateWidget = widget;
	};

	P.getWidget = function() {
		return this._activateWidget;
	};

        P._handle_accessKey = function(ev) {
                this._onMouseDown(ev);
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require container.js

DEFINE_CLASS("DlLiteTree", DlContainer, function(D, P, DOM){

        D.DEFAULT_EVENTS = "onItemMouseDown onItemDblClick".qw();

        D.DEFAULT_ARGS = {
                items : [ "items" , null ],
                sort  : [ "sort"  , Function.identity ],

                _opt_toggleSelection : [ "toggleSelection", false ],

                _focusable : [ "focusable", true ]
        };

        D.FIXARGS = function(args) {
                Object.mergeUndefined(args, {
                        fillParent : true
                });
        };

        D.CONSTRUCT = function() {
                this.addEventListener({
                        onMouseDown: this._onMouseDown,
                        onDblClick: this._onDblClick
                });
        };

        P.reset = function(items) {
                this.top_items = this.sort(items);
                this.setContent(this._buildHTML(this.top_items, 0));
                if (this._selection) this._selection.filter(this._itemsById);
        };

        P.setSelectionModel = function(sel) {
                if (this._selection) {
                        this._selection.removeEventListener(this._selListeners);
                } else if (!this._selListeners) {
                        this._selListeners = {
                                onChange: this.$("_on_selChange"),
                                onReset: this.$("_on_selReset")
                        };
                }
                this._selection = sel;
                sel.addEventListener(this._selListeners);
        };

        P.isSelected = function(item_id) {
                return this._selection && this._selection.isSelected(item_id);
        };

        P.refreshItems = function(ids) {
                ids.foreach(function(id){
                        var el = this._getItemElement(id);
                        if (el) {
                                var c = [ 'item-label'], item = this._itemsById[id];
                                if (this.isSelected(id)) c.push("selected");
                                item.addClassNames(c);
                                el.className = c.join(" ");
                                var buf = String.buffer("<span class='expander'></span>");
                                item.formatHTML(buf);
                                el.innerHTML = buf.get();
                        }
                }, this);
        };

        P.getItemById = function(id) {
                return this._itemsById[id];
        };

        P._buildHTML = function(items, level) {
                if (items.length == 0) return "";
                if (level == null) level = 0;
                if (level == 0) this._itemsById = {};
                var html = String.buffer("<ul>");
                items.foreach(function(item){
                        var children = item.children();
                        var has_children = children.length > 0;
                        html("<li>");
                        var c = [ 'item-label' ], id = item.id();
                        item.addClassNames(c);
                        if (this.isSelected(id)) c.push("selected");
                        if (has_children) c.push("expanded");
                        html("<div id='", this._makeId(id), "' lite-tree-item='", id, "' class='", c.join(' '), "'><span class='expander'></span>");
                        item.formatHTML(html);
                        html("</div>", this._buildHTML(children, level + 1), "</li>");
                        this._itemsById[item.id()] = item;
                }, this);
                html("</ul>");
                return html.get();
        };

        P._makeId = function(id) {
                return this.id + ":" + id;
        };

        P._findItemFromEvent = function(ev) {
                var ret = {}, p = ev.target;
                while (p && p.nodeType == 1) {
                        var id = p.getAttribute("lite-tree-item");
                        if (id != null) {
                                ret.el = p;
                                ret.id = id;
                                ret.item = this._itemsById[id];
                                return ret;
                        }
                        if (p.className == "expander") {
                                ret.expander = p;
                        }
                        p = p.parentNode;
                }
        };

        P.scrollToRecord = function(item_id) {
                DOM.scrollIntoView(this._getItemElement(item_id));
        };

        P._getItemElement = function(item_id) {
                return document.getElementById(this._makeId(item_id));
        };

        P.__handleSelectClick = function(clicked, ev, dblClick) {
                var sel = this._selection;
                var item = this._itemsById[clicked.id];
                var hooks_args = [ item, clicked, ev ];
                if (dblClick) {
                        if (sel && !sel.isSelected(clicked.id) && this.canSelectItem(item))
                                sel.reset([ clicked.id ]);
                        this.applyHooks("onItemDblClick", hooks_args);
                        return;
                }
                if (!sel || clicked.expander || !this.canSelectItem(clicked.item)) {
                        var subtree = clicked.el.nextSibling;
                        if (subtree) {
                                var was_hidden = DOM.hasClass(subtree, "hidden");
                                DOM.condClass(subtree, !was_hidden, "hidden");
                                DOM.condClass(clicked.el, was_hidden, "expanded", "collapsed");
                        }
                        this.applyHooks("onItemMouseDown", hooks_args);
                }
                else if (sel && this.canSelectItem(clicked.item)) {
                        if (sel.multiple) {
                                if (ev.ctrlKey) {
                                        sel.toggle(clicked.id);
                                }
                                // else if (ev.shiftKey) {

                                // }
                                else sel.reset([ clicked.id ]);
                        } else {
                                if (this._opt_toggleSelection && sel.isSelected(clicked.id)) {
                                        sel.toggle(clicked.id);
                                } else {
                                        sel.reset([ clicked.id ]);
                                }
                        }
                        this.applyHooks("onItemMouseDown", hooks_args);
                }
        };

        P.canSelectItem = function(item) {
                return item.isSelectable();
        };

        var __prevTime = new Date().getTime();
        var __prevItem = null;
        P._onMouseDown = function(ev) {
                var clicked = this._findItemFromEvent(ev);
                var now = new Date().getTime();
                if (now - __prevTime < Dynarch.dblClickTimeout && clicked && __prevItem && clicked.id == __prevItem.id) {
                        this.__handleSelectClick(clicked, ev, true);
                } else if (clicked) {
                        __prevTime = now;
                        this.__handleSelectClick(clicked, ev, false);
                }
                __prevItem = clicked;
        };

        P._on_selChange = function(id, selected) {
                DOM.condClass(this._getItemElement(id), selected, "selected");
        };

        P._on_selReset = function(oldSel, newSel) {
                Object.foreach(oldSel, function(val, key){
                        DOM.delClass(this._getItemElement(key), "selected");
                }, this);
                Object.foreach(newSel, function(val, key){
                        DOM.addClass(this._getItemElement(key), "selected");
                }, this);
        };

        D.Item = DEFINE_HIDDEN_CLASS(null, DlEventProxy, function(D, P){
                D.DEFAULT_ARGS = {
                        _name     : [ "name"     , null ],
                        _id       : [ "id"       , null ],
                        _children : [ "children" , null ]
                };
                D.CONSTRUCT = function() {
                        if (this._children == null) this._children = [];
                };
                P.formatHTML = function(buf){ buf(String(this._name).htmlEscape()) };
                P.addClassNames = Function.noop;
                P.id = function() { return this._id };
                P.children = function() { return this._children };
                P.isSelectable = Function.returnTrue;
        });

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require widget.js

DEFINE_CLASS("DlMacBarIcon", DlAbstractButton, function(D, P) {

        D.BEFORE_BASE = function() {
                this.__currentWidth = this.__minWidth;
		this.__currentHeight = this.__minHeight;
                this.__align = this.__align.split(/\s+/).toHash();
        };

	var CLS = { active    : "DlMacBarIcon-active",
		    hover     : "DlMacBarIcon-hover",
		    checked   : "DlMacBarIcon-1",
		    unchecked : "DlMacBarIcon-0",
		    empty     : "DlMacBarIcon-empty",
		    disabled  : "DlMacBarIcon-disabled"
	};

	D.DEFAULT_ARGS = {
		_classes         : [ "classes"        , CLS ],
		__image          : [ "img"            , null ],
		__minWidth       : [ "minWidth"       , 32 ],
		__minHeight      : [ "minHeight"      , 32 ],
		__maxWidth       : [ "maxWidth"       , 64 ],
		__maxHeight      : [ "maxHeight"      , 64 ],
		__align          : [ "align"          , "bottom" ],
                __tooltipTimeout : [ "tooltipTimeout" , 900 ]
	};

	P._createElement = function() {
		// the one in DlAbstractButton is too complicated
		DlWidget.prototype._createElement.call(this);
		this.setContent(String.buffer("<img src='", this.__image,
					      "' width='", this.__minWidth,
					      "' height='", this.__minHeight,
					      " ' />").get());
	};

	P.getImgElement = function() {
		return this.getElement().firstChild;
	};

        P.flash = function(timeout) {
                this._onMouseEnter();
                this._onMouseLeave.delayed(timeout || 100, this);
        };

	P.initDOM = function() {
		D.BASE.initDOM.call(this);
		this.addEventListener({ onDestroy : onDestroy });
		this.__anim = new DlAnimation(25, 40);
		this.__anim.addEventListener({ onUpdate : onAnimationUpdate.$(this),
					       onStart  : onAnimationStart.$(this)
					     });
	};

	function onDestroy() {
		this.__anim.destroy();
	};

	P._onMouseEnter = function() {
		D.BASE._onMouseEnter.apply(this, arguments);
		var a = this.__anim;
		a.ew = this.__maxWidth;
		a.eh = this.__maxHeight;
		a.start(30, 50, DlAnimation.easing.elastic_b);
	};

	P._onMouseLeave = function() {
		D.BASE._onMouseLeave.apply(this, arguments);
		var a = this.__anim;
		a.ew = this.__minWidth;
		a.eh = this.__minHeight;
		a.start(50, 50, DlAnimation.easing.accel_b);
	};

	function onAnimationStart() {
		this.__anim.sw = this.__currentWidth;
		this.__anim.sh = this.__currentHeight;
	};

	function onAnimationUpdate() {
		var a = this.__anim, img = this.getImgElement(), y = a.getPos(), mt;
                var yy = a.getPos(function(x) {
                        return 1-Math.cos(x*2.5*Math.PI)/Math.exp(5*x);
                });
		img.width = this.__currentWidth = y.mapInt(a.sw, a.ew);
		img.height = this.__currentHeight = yy.mapInt(a.sh, a.eh);
                a = this.__align;
		mt = this.__minWidth - this.__currentWidth;
		if (a.center)
			mt /= 2;
		if (a.left || a.center)
			img.style.marginRight = mt + "px";
                if (a.right || a.center)
			img.style.marginLeft = mt + "px";
		mt = this.__minHeight - this.__currentHeight;
		if (a.middle)
			mt /= 2;
		if (a.top || a.middle)
			img.style.marginBottom = mt + "px";
                if (a.bottom || a.middle)
			img.style.marginTop = mt + "px";
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require container.js
// @require button.js

DEFINE_CLASS("DlNotebook", DlContainer, function(D, P) {

        // XXX: can we use D.DEFAULT_EVENTS?
        var DEFAULT_EVENTS = [ "onChange" ];

	P._createElement = function() {
		D.BASE._createElement.call(this);
		this.getElement().innerHTML = "<div class='TabContent-inner'></div>";
	};

	P.appendWidget = function(w, pos) {
                w.registerEvents([ "onNotebookShow" ]);
		D.BASE.appendWidget.call(this, w);
		var el = w.getElement();
		var cont = this.getContentElement();

		if (pos != null)
			pos = this.__widgetsPosition;
		else
			this.__widgetsPosition = pos;

		if (pos == null)
			pos = this.__widgetsPosition = DynarchDomUtils.getPadding(cont).x / 2;

//		w.display(false);
 		el.style.position = "absolute";
 		el.style.visibility = "hidden";
 		el.style.left = el.style.top = pos + "px";
		cont.appendChild(el);
		this._panes.push(w);
	};

	P.initDOM = function() {
                this._panes = [];
		this._currentPane = null;
		this.registerEvents(DEFAULT_EVENTS);
		D.BASE.initDOM.call(this);
	};

	P.getPane = function(index) { return this._panes[index]; };

        P.getAllPanes = function() { return this._panes };

	P.getCurrentPane = function() { return this.getPane(this._currentPane); };

	P.getCurrentPaneIndex = function() { return this._currentPane; };

	P.length = function() { return this._panes.length; };

	P.showPane = function(index) {
		var old = this._currentPane;
		if (old != null) {
			this.getPane(old).visibility(false);
			this.getPane(old).setPos({ x: -30000, y: -30000 });
		}
		this._currentPane = index;
		var pane = this.getPane(index);
		if (!pane._dl_notebook_has_size) {
			pane.setSize(this.getInnerSize());
			pane._dl_notebook_has_size = true;
		}
		//pane.setPos(this.__widgetsPosition, this.__widgetsPosition);
                pane.setStyle({ left: "", top: "" });
		pane.visibility(true);
		if (index !== old)
			this.applyHooks("onChange", [ index, old ]);
                pane.callHooks("onNotebookShow");
		return this;
	};

	P.firstPane = function() {
		this.showPane(0);
	};

	P.lastPane = function() {
		this.showPane(this.length() - 1);
	};

	P.nextPane = function() {
		var i = this._currentPane;
		i == null ? i = 0 : ++i;
		if (i >= this._panes.length)
			i = 0;
		return this.showPane(i);
	};

	P.prevPane = function() {
		var i = this._currentPane;
		i == null ? i = this._panes.length - 1 : --i;
		if (i < 0)
			i = this._panes.length - 1;
		return this.showPane(i);
	};

	P.isFirstPane = function() { return this._currentPane == 0; };
	P.isLastPane = function() { return this._currentPane == this._panes.length - 1; };

	P.getContentElement = function() {
		return this.getElement().firstChild;
	};

	P.setSize = P.setOuterSize = function(size) {
		D.BASE.setOuterSize.call(this, size);
		var el = this.getElement();
		size = DynarchDomUtils.getInnerSize(el);
		DynarchDomUtils.setOuterSize(this.getContentElement(), size.x, size.y);
		el.style.width = el.style.height = "";
		size = DynarchDomUtils.getInnerSize(this.getContentElement());
                if (this._currentPane == null)
                        this.showPane(0);
		var cp = this.getCurrentPane();
 		this._panes.foreach(function(p) {
			p._dl_notebook_has_size = false;
 		});
		cp.setSize(size);
		cp._dl_notebook_has_size = true;
	};

	P.setIdealSize = function() {
		var size = { x: 0, y: 0 };
		this._panes.r_foreach(function(p) {
			// p.display(true);
			var s = p.getOuterSize();
			// p.display(false);
			if (s.x > size.x) size.x = s.x;
			if (s.y > size.y) size.y = s.y;
		});
		this.setInnerSize(size);
		// this.getPane(this._currentPane).display(true);
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require widget.js

DEFINE_CLASS("DlProgressBar", DlWidget, function(D, P){

        var CE = DynarchDomUtils.createElement;

	D.DEFAULT_ARGS = {
		__progress_minVal : [ "min", 0 ],
		__progress_maxVal : [ "max", 100 ],
		__progress_val    : [ "val", 0 ],
		__label           : [ "label", null ]
	};

	P._createElement = function() {
		D.BASE._createElement.call(this);
		var el = this.getElement();
		CE("div", null, { className: "DlProgressBar-fill" }, el);
		CE("div", null, { className: "DlProgressBar-label", innerHTML: "&nbsp;" }, el);
                this.setLabel(this.__label);
		this.setValue(this.__progress_val);
	};

	P._getLabelElement = function() {
		return this.getElement().lastChild;
	};

	P._getFillElement = function() {
		return this.getElement().firstChild;
	};

        P.getValue = function() {
                return this.__progress_val;
        };

        P.getMaxVal = function() {
                return this.__progress_maxVal;
        };

        P.getMinVal = function() {
                return this.__progress_minVal;
        };

	P.setValue = function(val) {
		this.__progress_val = val;
                if (val > this.__progress_maxVal)
                        val = this.__progress_maxVal;
		var diff = this.__progress_maxVal - this.__progress_minVal;
		var pos = val - this.__progress_minVal;
		var percent = 100 * pos / diff;
		if (!isNaN(percent) && percent >= 0) {
			this._getFillElement().style.width = percent + "%";
			this._updateLabel(percent);
		}
	};

	P.setLabel = function(label) {
		this.__label = label;
		this._updateLabel();
	};

	P._updateLabel = function(percent) {
		var label = this.__label;
                if (percent == null)
                        percent = 0;
		if (label != null) {
			if (typeof label == "function")
				label = label(this, percent, this.__progress_val);
			else {
				label = label.replace(/%d/g, Math.round(percent))
					.replace(/%f/g, percent.toFixed(2))
                                        .replace(/%v/g, this.__progress_val);
			}
			if (!/\S/.test(label))
				label = "&nbsp;";
			this._getLabelElement().innerHTML = label;
		}
	};

	P.reset = function(min, max, val, label) {
		if (val == null)
			val = min;
		this.__progress_minVal = min;
		this.__progress_maxVal = max;
		if (arguments.length > 3)
			this.__label = label;
		this.setValue(val);
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require checkbox.js

DEFINE_CLASS("DlRadioButton", DlCheckbox, function(D, P) {

        D.FIXARGS = function(args) {
                args.alwaysCheck = true;
        };

        D.DEFAULT_ARGS = {
	        _groupId   : [ "group"     , 0 ],
	        _classes   : [ "classes"   , {
			active    : "DlRadioButton-active",
			hover     : "DlRadioButton-hover",
			checked   : "DlRadioButton-1",
			unchecked : "DlRadioButton-0",
			empty     : "DlRadioButton-empty",
			disabled  : "DlRadioButton-disabled"
		} ]
        };

        P.FINISH_OBJECT_DEF = function() {
                D.BASE.FINISH_OBJECT_DEF.call(this);
                this._className.remove("DlCheckbox");
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require buttonmenu.js
// @require radiobutton.js

DEFINE_CLASS("DlRadioSelect", DlButtonMenu, function(D, P){

	D.DEFAULT_ARGS = {
		_options    : [ "options"   , [] ],
		_value	    : [ "value"	    , null ],
		_connected  : [ "connected" , true ]
	};

        D.DEFAULT_EVENTS = [ "onChange" ];

	D.CONSTRUCT = function() {
                this._radioGroup = DlRadioGroup.get();
		if (this._options.length)
			this.setOptions(this._options);
		this.value(this._value, true);
                this.addEventListener("onDestroy", function(){
                        this._radioGroup.reset();
                });
	};

	// TODO: get rid of the value() function, use set* and get* methods

	P.value = function(value, force, nocalls) {
		var oldval = this._value;
		if (force || typeof value != "undefined" && value !== oldval) {
			this._value = value;
			this._updateLabel();
			if (!nocalls)
				this.applyHooks("onChange", [ oldval, value ]);
		}
		return oldval;
	};

	P.getValue = function() { return this.value(); };

	P.setValue = P.value;

	function radioGroup_onChange(cb) {
		this.value(cb.userData);
		DlPopup.clearAllPopups();
		cb._onMouseLeave();
	};

	P._updateLabel = function() {
		var label = null, a = this._options, i, o;
		for (i = a.length; --i >= 0;) {
			o = a[i];
			if (o == null)
				continue;
			if (this._value == o.value) {
				this.getButton().label(o.label);
				o.widget.checked(true, true);
			} else {
                                o.widget.checked(false, true);
                        }
		}
	};

	P.setOptions = function(options) {
                var g = this._radioGroup, menu, args;
		g.reset();
		g.addEventListener("onChange", radioGroup_onChange.$(this));
		menu = new DlVMenu({ className: "DlSelect-menu" });
		args = {
			parent    : menu,
			group     : g,
			noCapture : true
		};
		options.foreach(function(o) {
			if (o == null)
				menu.addSeparator();
			else {
				args.label = o.label;
				args.data = args.value = o.value;
                                args.className = o.className;
				var r = o.widget = new DlRadioButton(args);
				// XXX: this causes problems, we should find something else.
                                // r.connectEvents("onMouseUp", "onClick");
			}
		}, this);

		var el = menu.getElement();
		el.style.position = "absolute";
		menu.zIndex(-100);
		document.body.appendChild(el);
		var width = menu.getOuterSize().x;
		document.body.removeChild(el);
                menu.zIndex("");
		el.style.position = "";

		(function() {
			this.getButton().setOuterSize({ x: width - this.getArrow().getOuterSize().x });
		}).$(this).delayed(10);

		this.setMenu(menu);
		this._options = options;
	};

	P.addOption = function(opt, index) {
                if (index == null)
                        index = this._options.length;
		var item = opt.widget = new DlRadioButton({
                        parent     : this._menu,
			group      : this._radioGroup,
			noCapture  : true,
			label      : opt.label,
			data       : opt.value,
                        value      : opt.value,
                        className  : opt.className
		});
                // XXX: this causes problems, we should find something else.
		// item.connectEvents("onMouseUp", "onClick");
                this._options.splice(index, 0, opt);
		return item;
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

DlRegexp = {

	EMAIL: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,

	MIME_WEB_IMAGE: /^image\x2f.*(png|jpe?g|gif|tiff?)/i,

        // this is from the excellent XRegExp library by Steven
        // Levithan (http://xregexp.com).  Unfortunately it's too slow
        // so I prefer not XRegExp.

        UNICODE_LETTER: "\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0523\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971\\u0972\\u097B-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D3D\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8B\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10D0-\\u10FA\\u10FC\\u1100-\\u1159\\u115F-\\u11A2\\u11A8-\\u11F9\\u1200-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u1676\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19A9\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u2094\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2C6F\\u2C71-\\u2C7D\\u2C80-\\u2CE4\\u2D00-\\u2D25\\u2D30-\\u2D65\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31B7\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FC3\\uA000-\\uA48C\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA65F\\uA662-\\uA66E\\uA67F-\\uA697\\uA717-\\uA71F\\uA722-\\uA788\\uA78B\\uA78C\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA90A-\\uA925\\uA930-\\uA946\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAC00\\uD7A3\\uF900-\\uFA2D\\uFA30-\\uFA6A\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC"

};

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require eventproxy.js
// @require singleton.js

/*DESCRIPTION

This object is a "singleton" -- only one of this type can be
instantiated at a time.  Singletons are used through DlSingleton
interface.  In order to retrieve the DlSystem object you call:

  var system = DlSingleton.get("System");

This will return the object instance (creates it if it wasn't already
there).

The purpose of DlSystem is, for now, to centralize a set of event
handlers.  For example, you might want to display a "please wait..."
message each time an XMLHttpRequest is called.  To do this you could
say:

  var system = DlSingleton.get("System");

  system.addEventListener("on-rpc-start", function() {
    // display your "please wait" text here
  });

  system.addEventListener("on-rpc-stop", function() {
    // hide the message here.
  });

This would work globally for any XMLHttpRequest created through our
〈DlRPC〉 object--since it takes care to call the appropriate event
handlers in DlSystem.

DESCRIPTION*/

DEFINE_SINGLETON("DlSystem", DlEventProxy, function(D, P) {

        D.DEFAULT_EVENTS = [
                "on-dialog-create",
		"on-dialog-show",
		"on-dialog-hide",
		"on-dialog-minimize",
		"on-dialog-restore",
		"on-rpc-start",
		"on-rpc-stop",
		"on-rpc-timeout"
	];

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require eventproxy.js
// @require singleton.js
// @require system.js

DEFINE_CLASS("DlRPC", DlEventProxy, function(D, P) {

	D.CONSTRUCT = function() {
		if (this.method == null)
			this.method = this.data != null ? "POST" : "GET";
		this._timeoutID = 0;
	};

        D.DEFAULT_EVENTS = "onStart onStop onTimeout onUploadProgress onUploadDone onUploadError onUploadAbort".qw();

	D.DEFAULT_ARGS = {
		url      : [ "url"      , null ],
		args     : [ "args"     , null ],
		callback : [ "callback" , null ],
		method   : [ "method"   , null ],
		data     : [ "data"     , null ],
		timeout  : [ "timeout"  , null ]
	};

	function onState(req) {
		if (req.readyState == 4) {
			delete req['onreadystatechange'];
			this._request = null;
			if (this._timeoutID) {
				clearTimeout(this._timeoutID);
				this._timeoutID = null;
			}
                        var args;
                        try {
                                args = {
                                        success    : req.status == 200,
                                        status     : req.status,
                                        statusText : req.statusText,
                                        timeout    : false,
                                        xml        : req.responseXML,
                                        text       : req.responseText
                                };
                        } catch(ex) { /* firefox croaks with "statusText not available" on abort() */ };
			DlSystem().applyHooks("on-rpc-stop", [ this, args, req ]);
			this.applyHooks("onStop", [ this, args, req ]);
			if (this.callback)
				this.callback(args);
		}
	};

	function onTimeout(req) {
		this._request = null;
		req.abort();
		DlSystem().applyHooks("on-rpc-timeout", [ this, req ]);
		this.applyHooks("onTimeout", [ this, req ]);
		if (this.callback)
			this.callback({ success: false, timeout: true });
	};

        P.abort = function() {
                this._request.abort();
        };

	P.call = function(newArgs) {
		if (newArgs != null)
			Object.merge(this, newArgs);
		var req, urlargs = false, i;
		if (window.XMLHttpRequest) {
			req = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			req = new ActiveXObject("Microsoft.XMLHTTP");
		} else
			throw "Browser does not support XMLHttpRequest";
		this._request = req;
		req.onreadystatechange = onState.$(this, req);
                if (req.upload) {
                        req.upload.addEventListener("progress", this.$("callHooks", "onUploadProgress"), false);
                        req.upload.addEventListener("load", this.$("callHooks", "onUploadDone"), false);
                        req.upload.addEventListener("error", this.$("callHooks", "onUploadError"), false);
                        req.upload.addEventListener("abort", this.$("callHooks", "onUploadAbort"), false);
                }
		var args = this.args;
		if (args) {
			urlargs = [];
			for (i in args)
				urlargs.push(escape(i) + "=" + escape(args[i]));
			if (urlargs.length == 0)
				urlargs = false;
			else
				urlargs = urlargs.join("&");
		}
		var url = this.url;

		switch (this.method) {
		    case "POST":
			var data = this.data;
			if (urlargs && data)
				url += "?" + urlargs; // send arguments by GET. ;-)
			req.open("POST", url, true);
			if (!data) {
				req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
				this._start(urlargs);
			} else {
				if (typeof data != "string") {
					data = DlJSON.encode(data);
                                        this.data = data;
					req.setRequestHeader("Content-Type", "text/javascript; charset=UTF-8");
				}
				this._start(data);
			}
			break;

		    case "GET":
			if (urlargs)
				url += "?" + urlargs;
			req.open("GET", url, true);
			this._start(null);
			break;
		}
	};

	P._start = function(data) {
		if (this.timeout)
			this._timeoutID = onTimeout.delayed(this.timeout, this, this._request);
		else
			this._timeoutID = 0;
		DlSystem().applyHooks("on-rpc-start", [ this ]);
		this.applyHooks("onStart", [ this ]);
		this._request.send(data);
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require widget.js
// @require htmlutils.js
// @require keyboard.js

DEFINE_CLASS("DlRteFrame", DlWidget, function(D, P, DOM) {

        var CE = DOM.createElement,
            AC = DOM.addClass,
            DC = DOM.delClass,
            CC = DOM.condClass,
            ID = DOM.ID;

	var FORWARD_EVENTS = [ "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "click",
			       "keydown", "keyup", "keypress", "contextmenu" ];

	var BR = is_gecko ? "<br type='_moz' />" : "";

	var INIT_HTML = ( '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" ' +
			  '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
			  '<html class="DlRteFrame-HTML">' +
			  '<head><title>DynarchLIB Rich Text Editor</title></head>' +
			  '<body class="DlRteFrame-Body"><p>' + BR + '</p></body></html>' );

        D.BEFORE_BASE = function() {
                this.__eventProxy = eventProxy.$(this);
		this.callUpdateHooks = this.callUpdateHooks.clearingTimeout(40, this);
        };

        D.CONSTRUCT = function() {
                if (this.__sections)
			this.setSections(this.__sections);
        };

        D.DEFAULT_EVENTS = [ "onUpdate", "onSectionChange" ];

	D.DEFAULT_ARGS = {
		__paragraphsMode : [ "useParagraphs" , true ],
		__sections       : [ "sections"      , null ],
                _focusable       : [ "focusable"     , 2 ],
                _tabChar         : [ "tabChar"       , "    " ]
	};

	P.COMMANDS = {
		"backcolor"             : { id: is_ie ? "backcolor" : "hilitecolor" },
		"forecolor"             : { id: "forecolor" },
		"bold"                  : { id: "bold"                   , key: "CTRL 'B'" },
		"italic"                : { id: "italic"                 , key: "CTRL 'I'" },
		"underline"             : { id: "underline"              , key: "CTRL 'U'" },
		"strike"                : { id: "strikethrough"          , key: "CTRL '-'" },
		"subscript"             : { id: "subscript" },
		"superscript"           : { id: "superscript" },
		"removeformat"          : { id: "removeformat"           , key: "ALT-CTRL '0'" },
		"justifyleft"           : { id: "justifyleft"            , key: "ALT-CTRL 'l'" },
		"justifyright"          : { id: "justifyright"           , key: "ALT-CTRL 'r'" },
		"justifycenter"         : { id: "justifycenter"          , key: "ALT-CTRL 'e'" },
		"justifyfull"           : { id: "justifyfull"            , key: "ALT-CTRL 'j'" },
		"orderedlist"           : { id: "insertorderedlist"      , key: "ALT-CTRL 'o'" },
		"unorderedlist"         : { id: "insertunorderedlist"    , key: "ALT-CTRL-SHIFT 'o'" },
		"unorderedlist1"        : { id: "insertunorderedlist"    , key: "ALT-CTRL 'u'" },
		"indent"                : { id: "indent"                 , key: "CTRL '.'" },
		"outdent"               : { id: "outdent"                , key: "CTRL ','" },
		"undo"                  : { id: "undo" },
		"redo"                  : { id: "redo" },
		"<hr>"                  : { id: "inserthorizontalrule"   , key: "CTRL ' '" },
		"<h1>"                  : { id: "formatblock"            , key: "CTRL '1'", arg: "h1" },
		"<h2>"                  : { id: "formatblock"            , key: "CTRL '2'", arg: "h2" },
		"<h3>"                  : { id: "formatblock"            , key: "CTRL '3'", arg: "h3" },
		"<h4>"                  : { id: "formatblock"            , key: "CTRL '4'", arg: "h4" },
		"<h5>"                  : { id: "formatblock"            , key: "CTRL '5'", arg: "h5" },
		"<h6>"                  : { id: "formatblock"            , key: "CTRL '6'", arg: "h6" },
		"<p>"                   : { id: "formatblock"            , key: "CTRL 'm'", arg: "p" },
		"<pre>"                 : { id: "formatblock"            , key: "CTRL-ALT 'n'", arg: "pre" },
		"<address>"             : { id: "formatblock"            , arg: "pre" },
		"<blockquote>"          : { id: "formatblock"            , key: "CTRL 'q'", arg: "blockquote" },

		"_nextSection"          : { id: "_nextSection"           , key: "CTRL ']'" },
		"_prevSection"          : { id: "_prevSection"           , key: "CTRL '['" },

		// tmp
		"showHtml"              : { id: "showHtml"               , key: "CTRL-ALT-SHIFT 'h'" }
	};

	var FORMATBLOCK_TAGS = "h1 h2 h3 h4 h5 h6 p pre address blockquote".hashWords();

	P.SEMANTIC_TAGS = {
		"bold"	        : true,
		"italic"        : true,
		"strike"        : true,
		"subscript"     : true,
		"superscript"   : true,
		"indent"        : true,
		"underline"     : true,
		"outdent"       : true,
		"strikethrough" : true,
		"strike"        : true
	};

	P.callUpdateHooks = function(dev, ev) {
		if (!this.destroyed)
			this.applyHooks("onUpdate", [ dev, ev ]);
	};

	P.execCommand = function(cmd, param) {
                if (this.readonly())
                        return;
		this.focus();
		var ret;
		var doc = this.getIframeDoc();
		if (is_gecko)
			doc.execCommand("styleWithCSS", false, !(cmd in this.SEMANTIC_TAGS));
		if (this.COMMANDS[cmd]) {
			cmd = this.COMMANDS[cmd];
			if (typeof param == "undefined")
				param = cmd.arg || "";
			cmd = cmd.id;
		}
		if (cmd == "formatblock") {
                        if (is_ie) {
                                // if we're in a <pre> block already,
                                // IE (Opera too, but we don't handle
                                // it for now) creates a horrible mess
                                // out of its content.
                                var h = this.getAncestorsHash();
                                if (h.pre) {
                                        if (param == "pre") {
                                                // <pre> already, move on.
                                                return;
                                        }
                                        var sel = this.getSelection(), r = this.getRange(sel);
                                        var r2 = this.createRange();
                                        r2.moveToElementText(h.pre);
                                        r.setEndPoint("EndToEnd", r2);
                                        r.select();
                                        var newEl, newElHtml = String.buffer("<", param, ">dummy</", param, ">").get();
                                        if (r.compareEndPoints("StartToStart", r2) == 0) {
                                                // easiest
                                                h.pre.insertAdjacentHTML("beforeBegin", newElHtml);
                                                newEl = h.pre.previousSibling;
                                        } else {
                                                var html = r.htmlText, text = r.text;
                                                // there might be a newline just before us, we should drop it.
                                                r.moveStart("character", -1);
                                                if (r.text.charAt(0) != text.charAt(0))
                                                        r.moveStart("character", 1);
                                                h.pre.insertAdjacentHTML("afterEnd", "<br />");
                                                r.pasteHTML("");
                                                h.pre.parentNode.removeChild(h.pre.nextSibling);
                                                h.pre.insertAdjacentHTML("afterEnd", newElHtml);
                                                newEl = h.pre.nextSibling;
                                                if (/\S/.test(text)) {
                                                        var p2 = h.pre.cloneNode(true);
                                                        p2.innerHTML = html;
                                                        newEl.parentNode.insertBefore(p2, newEl.nextSibling);
                                                }
                                        }
                                        r.moveToElementText(newEl);
                                        r.collapse();
                                        r.select();
                                        newEl.innerHTML = ""; // remove "dummy".
                                        return;
                                }
                                param = "<" + param + ">";
                        }
                        // if (is_gecko && param == "p") {
                        //         cmd = "insertParagraph";
                        //         param = null;
                        // }
                }
		switch (cmd) {
		    case "showHtml":
			try {
				alert(this.getHTML());
			} catch(ex) {
				alert("ERROR: " + ex);
			}
			break;
		    case "_nextSection":
			this.nextSection();
			break;
		    case "_prevSection":
			this.prevSection();
			break;
		    default:
			ret = doc.execCommand(cmd, false, param);
		}
		this.focus();
		this.callUpdateHooks();
		return ret;
	};

	P.queryCommandState = function(cmd) {
                if (!this.readonly()) {
		        if (this.COMMANDS[cmd])
			        cmd = this.COMMANDS[cmd].id;
                        try {
		                return this.getIframeDoc().queryCommandState(cmd);
                        } catch(ex) {}
                }
	};

	P.queryCommandValue = function(cmd) {
                if (!this.readonly()) {
		        if (this.COMMANDS[cmd])
			        cmd = this.COMMANDS[cmd].id;
		        if (!is_gecko && /^formatblock$/i.test(cmd)) {
			        // only Gecko does this correctly; I wonder when it'll break.
			        var a = this.getAllAncestors();
			        for (var i = 0; i < a.length; ++i) {
				        var tag = a[i].tagName.toLowerCase();
				        if (tag in FORMATBLOCK_TAGS)
					        return tag;
			        };
		        }
                        try {
		                return this.getIframeDoc().queryCommandValue(cmd);
                        } catch(ex) {}
                }
	};

	P.getInnerHTML = function() {
		return this.getIframeBody().innerHTML;
	};

	P.getHTML = function(withMeta, nocaret) {
                if (!is_ie && !nocaret) {
                        this.collapse(true);
                        var caret = this.getIframeDoc().createElement("span");
                        caret.id = "DYNARCHLIB_RTEFRAME_CARET";
                        this.insertNode(caret);
                }
                var html = DlHtmlUtils.getHTML(this.getIframeBody(), false, withMeta);
                if (!is_ie && !nocaret)
                        this.deleteNode(caret);
                return html;
	};

	P.getInnerText = function() {
		return DlHtmlUtils.getInnerText(this.getIframeBody());
	};

	P.getText = function() {
		return DlHtmlUtils.getText(this.getIframeBody());
	};

	// BEGIN: crappy code.  Use a hash instead to store sections
	// (or better, both a hash and an array).  Minimize the number
	// of places where we call setHTML and getHTML.

	P.setSections = function(sec) {
		this.__sections = sec;
		var h = this.__sectionsHash = {};
		sec.foreach(function(s, i) {
			s.index = i;
			h[s.name] = s;
			if (s.current || i == 0) {
				this.__currentSection = i;
				this.setHTML(s.content);
			}
		}.$(this));
	};

	P.setSectionContent = function(name, html) {
		var s = this.getSection(name, true);
		s.content = html;
		if (s.index == this.__currentSection)
			this.setHTML(html);
	};

	P.getSections = function() {
		var tmp = this.getHTML(true);
		Object.merge(this.getCurrentSection(), tmp);
		return this.__sectionsHash;
	};

	P.getSection = function(name, noSetContent) {
		var sec = this.__sectionsHash[name];
		if (sec.index == this.__currentSection && !noSetContent) {
			var tmp = this.getHTML(true);
			Object.merge(sec, tmp);
		}
		return sec;
	};

	P.getCurrentSection = function() {
		return this.__sections[this.__currentSection];
	};

	P._setCurrentSection = function(newsec) {
		var oldsec = this.getCurrentSection();
		if (oldsec !== newsec) {
			var tmp = this.getHTML(true);
			Object.merge(oldsec, tmp);
			this.__currentSection = newsec.index;
			this.setHTML(newsec.content);
			this.applyHooks("onSectionChange", [ oldsec, newsec ]);
		}
	};

	P.setCurrentSection = function(name) {
		var newsec = this.__sectionsHash[name];
		this._setCurrentSection(newsec);
	};

	P.setCurrentSectionIndex = function(idx) {
		if (idx != this.__currentSection) {
			var newsec = this.__sections[idx];
			this._setCurrentSection(newsec);
		}
	};

	P.prevSection = function() {
		this.setCurrentSectionIndex(this.__sections.rotateIndex(this.__currentSection - 1));
	};
	P.nextSection = function() {
		this.setCurrentSectionIndex(this.__sections.rotateIndex(this.__currentSection + 1));
	};

	// END: crappy code

//  	var CONTEXT_MENU = null;
// 	function getContextMenu(args) {
//  		if (!CONTEXT_MENU) {
//  			CONTEXT_MENU = new DlVMenu({});
//  			new DlMenuItem({ parent: CONTEXT_MENU, label: "Foo on " + args.ev.origTarget.tagName });
//  			new DlMenuItem({ parent: CONTEXT_MENU, label: "Bar" });
//  			new DlMenuItem({ parent: CONTEXT_MENU, label: "Baz" });
//  		}
//  		return CONTEXT_MENU;
// 		return null;
// 	};

	P._setListeners = function() {
		D.BASE._setListeners.call(this);
		this.addEventListener(is_ie ? "onKeyDown" : "onKeyPress", function(ev) {
                        this._onKeypress(ev)
                });
		this.addEventListener({ onDestroy : onDestroy });
		// this.setContextMenu(getContextMenu.$(this));
	};

	P._createElement = function() {
		D.BASE._createElement.call(this);
		var iframe = CE("iframe",
                                { display: 'block' },
			        { frameBorder: 0, marginHeight: 0, marginWidth: 0,
			          src : is_ie ? "javascript:'';" : "about:blank" },
				this.getElement());
		this.__hasFrameEvents = false;
		this.updateKeymap();
	};

	P.updateKeymap = function() {
		var keymap = this.__rte_keymap = [];
		for (var i in this.COMMANDS) {
			var cmd = this.COMMANDS[i];
			if (cmd.key)
				keymap.push([ DlKeyboard.parseKey(cmd.key), i ]);
		}
	};

	P.setOuterSize = P.setSize = function(s) {
		var pb1 = DOM.getBorder(this.getElement());
		var pb2 = DOM.getBorder(this.getContentElement());
		this.setInnerSize({ x: s.x - pb1.x - pb2.x, y: s.y - pb1.y - pb2.y });
	};

	P.getIframeElement = function() {
		return this.getElement().firstChild;
	};

	P.getContentElement = P.getIframeElement; // ALIAS

	P.getIframeWin = function() {
		return this.getIframeElement().contentWindow;
	};

	P.getIframeDoc = function() {
		return this.getIframeWin().document;
	};

	P.getIframeBody = function() {
		return this.getIframeDoc().body;
	};

	P.initDesignMode = function(callback) {
		var doc = this.getIframeDoc();
		doc.open();
		doc.write(INIT_HTML);
		doc.close();
		doc.designMode = "on";
		if (!this.__hasFrameEvents)
			addIframeEvents.delayed(5, this, callback);
	};

        P.readonly = function(readonly) {
                var doc = this.getIframeDoc();
                if (arguments.length > 0) {
                        doc.designMode = readonly ? "off" : "on";
                        CC(doc.documentElement, readonly, "DlRteFrame-ReadOnly");
                }
                return doc.designMode == "off";
        };

	P.setHTML = function(html) {
		if (html instanceof Array)
			html = html.join("");
		html = html.trim();
		if (this.__hasFrameEvents) {
                        if (is_ie) {
                                // IE messes out white-space in <pre> tags.
                                // the only decent solution I've found is to parse the HTML
                                // and insert nonbreakable spaces inside <pre>-s.
                                html = html.replace(/(<pre[^>]*>)((.|\n)+?)(<\x2fpre>)/gi, function(s, p1, p2, p3, p4) {
                                        p2 = p2.replace(/\x20/g, "\xA0").replace(/\t/g, "\xA0".repeat(4));
                                        return p1 + p2 + p4;
                                });
                        }
			this.getIframeBody().innerHTML = html;
			this._onSetHTML();
                        try { this.moveBOF() } catch(ex) {}
			this.callUpdateHooks();
		} else
			this.__pendingHTML = html;
	};

	P._onSetHTML = function() {
		var pres = this.getIframeDoc().getElementsByTagName("pre");
		for (var i = pres.length; --i >= 0;) {
			var pre = pres[i];
			pre.innerHTML = pre.innerHTML.replace(/\n/g, "<br>");
		}
                if (!is_ie) {
                        var caret = this.getIframeDoc().getElementById("DYNARCHLIB_RTEFRAME_CARET");
                        if (caret) (function(caret){
                                try {
                                        this.selectNodeContents(caret);
                                        this.collapse(true);
                                        this.deleteNode(caret);
                                } catch(ex) {};
                        }).delayed(10, this, caret);
                }
	};

	P.clear = function() {
		this.setHTML("");
	};

	P.focus = function() {
		this.getIframeWin().focus();
                D.BASE.focus.call(this);
	};

        // causes problems in both IE and Opera
//         P.blur = function() {
//                 this.getIframeWin().blur();
//                 BASE.blur.call(this);
//         };

	P.loadStyle = function(css) {
		var doc = this.getIframeDoc();
		var id = css.replace(/\x2f/g, "_");
		if (!doc.getElementById(id)) {
			var head = doc.getElementsByTagName("head")[0];
			var link = doc.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = css;
			link.id = id;
			head.appendChild(link);
			// The Magic Gecko Hack
			link.disabled = true;
			link.disabled = false;
		}
	};

	P.createRange = function() {
		return is_ie
			? this.getIframeBody().createTextRange()
			: this.getIframeDoc().createRange();
	};

	P.getSelection = function() {
		return is_ie
			? this.getIframeDoc().selection
			: this.getIframeWin().getSelection();
	};

	P.getRange = function(sel) {
		if (sel == null)
			sel = this.getSelection();
		return is_ie
			? sel.createRange()
			: sel.getRangeAt(0);
	};

	// FIXME: this has been copied from HTMLArea almost literally; it might
	// not be as good as we want.
	P.getParentElement = function() {
		var sel = this.getSelection();
		var range = this.getRange(sel);
		if (is_ie) {
			switch (sel.type) {
			    case "Text":
			    case "None":
				return range.parentElement();
			    case "Control":
				return range.item(0);
			    default:
				// return this._doc.body;
				return null;
			}
		} else try {
			var p = range.commonAncestorContainer;
			if (!range.collapsed && range.startContainer == range.endContainer &&
			    range.startOffset - range.endOffset <= 1 && range.startContainer.hasChildNodes())
				p = range.startContainer.childNodes[range.startOffset];
			while (p.nodeType == 3)
				p = p.parentNode;
			return p;
		} catch(ex) {
			return null;
		}
	};

	P.getAllAncestors = function() {
		var p = this.getParentElement();
		if (p && p.nodeType == 1)
			p = this.getParentElement();
		var body = this.getIframeBody();
		var a = [];
		while (p && p !== body && p.nodeType == 1) {
			a.push(p);
			p = p.parentNode;
		}
		a.push(body);
		return a;
	};

	P.getAncestorsHash = function() {
		var p = this.getAllAncestors(), el, i, tn, pnodes = { __all: p };
		p.foreach(function(el) {
			tn = el.tagName.toLowerCase();
			if (!pnodes[tn])
				pnodes[tn] = el;
		});
		return pnodes;
	};

	P.getSelectedText = function() {
		var range = this.getRange();
		return is_ie ? range.text : range.toString();
	};

	P.selectRange = function(range) {
		if (is_ie)
			range.select();
		else {
			var sel = this.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		}
	};

	P.isCollapsed = function() {
		var r = this.getRange();
		return is_w3
			? r.collapsed
			: r.compareEndPoints("StartToEnd", r) == 0;
	};

	P.collapse = function(toStart) {
		var sel = this.getSelection();
		var r = this.getRange(sel);
		if (is_w3)
			sel.removeAllRanges();
		r.collapse(!!toStart);
		this.selectRange(r);
	};

	P.insertNode = function(node, select) {
		var sel = this.getSelection(), r = this.getRange(sel);
		if (is_w3) {
			r.deleteContents();
			r.insertNode(node);
			if (select) {
				sel.removeAllRanges();
				r.selectNode(node);
				sel.addRange(r);
			}
		} else {
			var id = ID("rteframe");
			r.pasteHTML([ "<span id='", id, "'></span>" ].join(""));
			var el = this.getIframeDoc().getElementById(id);
			el.parentNode.insertBefore(node, el);
			el.parentNode.removeChild(el);
			if (select && node.nodeType != 3 /* IE fails here for text nodes */) {
				r.moveToElementText(node);
				r.select();
			}
		}
		return node;
	};

        P.insertText = function(str, select) {
		var node = this.getIframeDoc().createTextNode(str);
		return this.insertNode(node, select);
	};

	P.selectNodeContents = function(node) {
		var r = this.createRange();
		is_w3
			? r.selectNodeContents(node)
			: r.moveToElementText(node);
		this.selectRange(r);
	};

        P.selectNode = function(node) {
                if (is_w3) {
                        var r = this.createRange();
                        r.selectNode(node);
                        this.selectRange(r);
                } else
                        this.selectNodeContents(node);
        };

	P.createLink = function(url, text) {
		var tmp, as, link, i;
		if (text)
			this.insertText(text, true);
		tmp = "javascript:" + ID("link");
		this.execCommand("createlink", tmp);
		as = this.getIframeDoc().getElementsByTagName("a");
		for (i = as.length; --i >= 0;)
			if (as[i].href == tmp) {
				link = as[i];
				break;
			}
		link.href = url;
		return link;
	};

	P.createAnchor = function(name) {
		var text = this.getSelectedText() ? null : "Anchor";
		var link = this.createLink("#", text);
		link.removeAttribute("href");
		AC(link, text ? "DlAnchor-Empty" : "DlAnchor");
		link.setAttribute("name", name);
		if (text)
			link.innerHTML = "";
		return link;
	};

	P.getAnchors = function() {
		var as = this.getIframeDoc().getElementsByTagName("a"), i = as.length, a, ret = [];
		while (--i >= 0) {
			a = as[i];
			if (a.name)
				ret.unshift(a);
		}
		return ret;
	};

	P.unlink = function() {
		this.execCommand("unlink");
	};

	P.getSelectedImage = function() {
		var img = this.getParentElement();
		if (img && !/^img$/i.test(img.tagName))
			img = null;
		return img;
	};

	P.insertImage = function(params) {
		var img = this.getSelectedImage();
		// if (!img) {
		// 	// FIXME: THIS SUCKS
		// 	var sel = this.getSelection();
		// 	var range = this.getRange(sel);
		// 	this.execCommand("insertimage", params.url);
		// 	if (is_ie) {
		// 		img = range.parentElement();
		// 		if (img.tagName.toLowerCase() != "img")
		// 			img = img.previousSibling;
		// 	} else {
		// 		range = this.getRange();
                //                 var offset = range.startOffset - 1;
                //                 if (is_opera)
                //                         offset++;
		// 		img = range.startContainer.childNodes[offset];
		// 	}
		// } else {
		// 	img.src = params.url;
		// }

                if (!img) {
                        var tmp = "javascript:" + ID("img"), as, i;
                        this.execCommand("insertimage", tmp);
                        as = this.getIframeDoc().getElementsByTagName("img");
                        for (i = as.length; --i >= 0;)
                                if (as[i].src == tmp) {
                                        img = as[i];
                                        break;
                                }
                }
                img.src = params.url;

		if (params.width)
			img.width = params.width;
		if (params.height)
			img.height = params.height;
		if (params.align)
			img.align = params.align;
		if (params.alt)
			img.alt = params.alt;

		if (params.marginLeft)
			img.style.marginLeft = params.marginLeft;
		if (params.marginTop)
			img.style.marginTop = params.marginTop;
		if (params.marginRight)
			img.style.marginRight = params.marginRight;
		if (params.marginBottom)
			img.style.marginBottom = params.marginBottom;

		return img;
	};

	P.moveBOF = function(pos) {
		var body = this.getIframeBody(), sel, r;
		var el = pos ? body.lastChild : body.firstChild;
		if (!el)
			return;
		if (is_w3) {
                        r = this.getRange(sel = this.getSelection());
			sel.removeAllRanges();
			if (el.nodeType == 1)
				r.selectNodeContents(el);
			else
				r.selectNode(el);
			r.collapse(!pos);
			sel.addRange(r);
		} else {
                        r = body.createTextRange();
 			r.collapse(!pos);
                        r.select();
		}
	};

	P.moveEOF = function(pos) {
		return this.moveBOF(!pos);
	};

	P.setParagraphsMode = function(mode) {
		this.__paragraphsMode = mode;
	};

	// This returns "true" if after the operation the element has
	// the specified class name, false if it doesn't, or null if a
	// parent with the given tagName could not be found.
	P.addBlockClass = function(tagName, className, toggle) {
		var el = this.getAncestorsHash()[tagName];
		if (el) {
			if (DOM.hasClass(el, className)) {
				if (toggle) {
					DOM.delClass(el, className);
					return false;
				}
			} else {
				DOM.addClass(el, className);
			}
			return true;
		}
		return null;
	};

	P.canDeleteFullNode = function(el) {
		return DlHtmlUtils.canDeleteFullNode(el.tagName);
	};

	P.canDeleteContent = function(el) {
		return DlHtmlUtils.canDeleteContent(el.tagName);
	};

	P.canStripNode = function(el) {
		return DlHtmlUtils.canStripNode(el.tagName);
	};

	P.deleteNodeContents = function(el) {
		el.innerHTML = DlHtmlUtils.isBlockElement(el) ? BR : ""; // ;-)
	};

	P.deleteNode = function(el) {
		el.parentNode.removeChild(el);
	};

	P.stripNode = function(el) {
		var df = el.ownerDocument.createDocumentFragment();
		// var first = el.firstChild;
		while (el.firstChild)
			df.appendChild(el.firstChild);
		el.parentNode.insertBefore(df, el);
		el.parentNode.removeChild(el);
		this.callUpdateHooks();
	};

	function removeBR(el) {
		if (el.lastChild.nodeType == 1 && el.lastChild.tagName.toLowerCase() == "br")
			el.removeChild(el.lastChild);
	};

	P._onKeypress = function(ev) {
                var key = ev.keyCode;
		this.__rte_keymap.r_foreach(function(kc) {
			if (DlKeyboard.checkKey(ev, kc[0])) {
				this.execCommand(kc[1]);
				throw new DlExStopFrameEvent;
			}
		}, this);
                if (key == DlKeyboard.TAB) {
                        var tag = this.queryCommandValue("formatblock");
                        if (tag == "pre") {
                                this.insertText(this._tabChar, true);
                                this.collapse(false);
                                throw new DlExStopFrameEvent;
                        }
                } else if (key == DlKeyboard.ENTER && is_ie && !ev.shiftKey) {
                        // IE is so unbelievably stupid as to
                        // actually duplicate a <pre> tag when
                        // you press ENTER, or insert <p> tags
                        // into it.
                        var tag = this.queryCommandValue("formatblock");
                        if (tag == "pre") {
                                var sel = this.getSelection(), r = this.getRange(sel);
                                // The only magical hack (TM) that I could discover.  It works flawless.
                                r.pasteHTML("<br/><div class='DynarchLIB-REMOVE-ME'></div>");
                                throw new DlExStopFrameEvent;
                        }
                }
	};

	function eventProxy(ev) {
		ev || (ev = this.getIframeWin().event);
		var dev = new DlEvent(ev);
		if (dev.type == "oncontextmenu")
			DOM.stopEvent(ev);
		dev.origTarget = dev.target;
		var p1 = dev.origPos = dev.pos;
		var p2 = DOM.getPos(this.getIframeElement());
		dev.pos = { x: p1.x + p2.x, y: p1.y + p2.y };
		// dev.origRelatedTarget = dev.relatedTarget;
		dev.target = this.getElement();
		try {
			DlEvent._genericEventHandler(dev, ev);
		} catch(ex) {
			if (ex instanceof DlExStopFrameEvent)
				DOM.stopEvent(ev);
		}
		if (/onMouseDown|onMouseUp|onKey/.test(dev.dl_type))
			this.callUpdateHooks(dev, ev);
	};

	function addIframeEvents(callback) {
		var doc = this.getIframeDoc();
		this.__hasFrameEvents = true;
		DOM.addEvents(doc, FORWARD_EVENTS, this.__eventProxy);
		this.__rte_onFocus = onFocus.$(this);
		this.__rte_onBlur = onBlur.$(this);
		if (is_ie) {
			doc = this.getIframeElement();
			doc.onfocus = this.__rte_onFocus;
		} else {
			DOM.addEvent(doc, "focus", this.__rte_onFocus);
		}
		doc.onblur = this.__rte_onBlur;
		if (callback)
			callback.call(this);
		if (this.__pendingHTML) {
			this.getIframeBody().innerHTML = this.__pendingHTML;
			this._onSetHTML();
			this.moveBOF();
			this.__pendingHTML = null;
		}
	};

	// not sure if this helps, but I am willing to sacrifice a few
	// bytes hoping that buggy browsers will produce less memory
	// leaks
	function onDestroy() {
		var doc = this.getIframeDoc();
		DOM.removeEvents(doc, FORWARD_EVENTS, this.__eventProxy);
		if (is_ie) {
			doc = this.getIframeElement();
			delete doc["onfocus"];
			doc.onfocus = null;
		} else {
			DOM.removeEvent(doc, "focus", this.__rte_onFocus);
		}
		delete doc["onblur"];
		doc.onblur = null;
	};

	function onFocus() {
		AC(this.getIframeDoc().documentElement, "DlRteFrame-Focused");
		D.BASE.focus.call(this);
	};

	function onBlur() {
		DC(this.getIframeDoc().documentElement, "DlRteFrame-Focused");
		D.BASE.blur.call(this, true);
	};

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require flashutils.js

DEFINE_CLASS("DlSocket", DlEventProxy, function(D, P){

        function FLASH() { return DlFlashUtils().getObject(); };

        D.DEFAULT_EVENTS = [ "onConnect", "onRelease", "onData" ];

        D.DEFAULT_ARGS = {
                _host : [ "host", null ],
                _port : [ "port", null ],
                _json : [ "json", false ]
        };

        D.FIXARGS = function(args) {
                if (!args.host)
                        args.host = document.domain;
        };

        D.CONSTRUCT = function(args) {
                this.addEventListener("onDestroy", onDestroy);
                DlEvent.atUnload(this.destroy.$(this));
        };

        var SOCKETS = {};

        function onDestroy() {
                FLASH().DlSocket_destroy(this.id);
                delete SOCKETS[this.id];
        };

        P.send = function(data) {
                FLASH().DlSocket_send(this.id, data);
        };

        P.sendJSON = function(data) {
                FLASH().DlSocket_send(this.id, DlJSON.encode(data));
        };

        P.connect = function() {
                this.id = FLASH().DlSocket_connect(this._host, this._port);
                SOCKETS[this.id] = this;
        };

        P.reconnect = function() {
                FLASH().DlSocket_reconnect(this.id);
        };

        P.disconnect = function() {
                FLASH().DlSocket_disconnect(this.id);
        };

        window.DlSocket_onConnect = function(id, status) {
                SOCKETS[id].applyHooks("onConnect", [ status ]);
        };

        window.DlSocket_onData = function(id, data) {
                data = DlFlashUtils.decodeString(data);
                var sok = SOCKETS[id];
                if (sok._json)
                        data = DlJSON.decode(data);
                sok.applyHooks("onData", [ data ]);
        };

        window.DlSocket_onDisconnect = function(id, reason) {
                SOCKETS[id].applyHooks("onRelease", [ reason ]);
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require flashutils.js

DEFINE_CLASS("DlSound", DlEventProxy, function(D, P){

        var SOUNDS = {};

        function FLASH() { return DlFlashUtils().getObject(); };

        D.DEFAULT_EVENTS = [ "onLoad", "onComplete" ];

        D.DEFAULT_ARGS = {
                _volume : [ "volume" , null ],
                _pan    : [ "pan"    , null ],
                _url    : [ "url"    , null ],
                _stream : [ "stream" , false ]
        };

        D.CONSTRUCT = function(args) {
                this.addEventListener({ onDestroy : onDestroy,
                                        onLoad    : onLoad });
                this.id = FLASH().DlSound_create();
                if (this._volume != null)
                        this.setVolume(this._volume);
                if (this._pan != null)
                        this.setPan(this._pan);
                SOUNDS[this.id] = this;
        };

        P.load = function(url, stream) {
                if (url == null)
                        url = this._url;
                if (stream == null)
                        stream = this._stream;
                this.__fileLoaded = false;
                this.__loadCalled = true;
                FLASH().DlSound_load(this.id, this._url = url, this._stream = stream);
        };

        P.play = function(offset, loop) {
                if (this.__fileLoaded) {
                        FLASH().DlSound_play(this.id, offset, loop);
                } else if (!this.__loadCalled) {
                        this.__shouldPlay = [ offset, loop ];
                        this.load();
                }
        };

        P.stop = function() {
                FLASH().DlSound_stop(this.id);
        };

        P.getBytesLoaded = function() {
                return FLASH().DlSound_getBytesLoaded(this.id);
        };

        P.getBytesTotal = function() {
                return FLASH().DlSound_getBytesTotal(this.id);
        };

        P.getDuration = function() {
                return FLASH().DlSound_getDuration(this.id);
        };

        P.getPosition = function() {
                return FLASH().DlSound_getPosition(this.id);
        };

        P.setPan = function(pan) {
                FLASH().DlSound_setPan(this.id, this._pan = pan);
        };

        P.setVolume = function(volume) {
                FLASH().DlSound_setVolume(this.id, this._volume = volume);
        };

        P.getPan = function() {
                return this._pan;
        };

        P.getVolume = function() {
                return this._volume;
        };

        P.getURL = function() {
                return this._url;
        };

        function onDestroy() {
                delete SOUNDS[this.id];
        };

        function onLoad(success) {
                this.__fileLoaded = success;
                if (success && this.__shouldPlay) {
                        this.play.apply(this, this.__shouldPlay);
                        this.__shouldPlay = null;
                }
        };

        window.DlSound_onLoad = function(id, success) {
                SOUNDS[id].applyHooks("onLoad", [ success ]);
        };

        window.DlSound_onSoundComplete = function(id) {
                SOUNDS[id].callHooks("onComplete");
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require entry.js
// @require button.js
// @require keyboard.js

DEFINE_CLASS("DlSpinner", DlEntry, function(D, P, DOM) {

        var CE = DOM.createElement;

        D.FIXARGS = function(args) {
                args.validators = [ new DlValidator(DlValidator.Number,
						    args.minVal,
						    args.maxVal,
						    args.integer,
						    args.decimals) ];
                args.type = "text";
        };

        D.CONSTRUCT = function() {
		this._timer = null;
		this._timerStep = null;
		this._timerState = null;
		this._timerPos = null;
        };

        D.DEFAULT_EVENTS = [ "onSpin" ];

	D.DEFAULT_ARGS = {
		_step        : [ "step"      , 1 ],
		_size        : [ "size"      , 4 ],
		_value       : [ "value"     , 0 ],
		_minVal      : [ "minVal"    , null ],
		_maxVal      : [ "maxVal"    , null ],
		_decimals    : [ "decimals"  , null ],
		_integer     : [ "integer"   , false ]
	};

	P.intervals = [
		{ pos:   1 , step: 1  , speed: 125 },
		{ pos:  10 , step: 1  , speed: 70 },
		{ pos:  20 , step: 1  , speed: 35 },
		{ pos:  50 , step: 1  , speed: 20 },
		{ pos: 100 , step: 1  , speed: 10 },
		{ pos: 200 , step: 2  , speed: 10 }
	];

	P._createElement = function() {
                this._no_gecko_bug = true;
		D.BASE._createElement.call(this);
		var table = this.getElement();
		var r1 = table.rows[0].cells[0];
		r1.rowSpan = 2;
		r1 = r1.parentNode;
		var r2 = CE("tr", null, null, r1.parentNode);
		var c1 = CE("td", null, { className: "DlSpinner-Button DlSpinner-Button-Up" }, r1);
		var c2 = CE("td", null, { className: "DlSpinner-Button DlSpinner-Button-Down" }, r2);
		this._buttonUp = new DlButton({ parent: this, appendArgs: c1 });
		this._buttonDown = new DlButton({ parent: this, appendArgs: c2 });
                this._btn = this._buttonUp;
	};

	function onFocus() {
		this.select();
	};

	function onBlur() {
		this._clearTimer();
	};

        function onMouseWheel(ev) {
                this._spinnerUpdateVal(ev.wheelDelta > 0);
                throw new DlExStopEventBubbling;
        };

	function onKeyDown(ev) {
		switch (ev.keyCode) {
		    case DlKeyboard.ARROW_DOWN:
			spinnerAct.call(this, { _direction: false });
			throw new DlExStopEventBubbling;
			break;
		    case DlKeyboard.ARROW_UP:
			spinnerAct.call(this, { _direction: true });
			throw new DlExStopEventBubbling;
			break;
		}
	};

	function onKeyUp(ev) {
		this._clearTimer();
	};

	function onChange() {
		var val = this.getValue();
                var min = val == this._maxVal;
                var max = val == this._minVal;
                this._buttonUp.disabled(min || !!this.readonly());
                this._buttonDown.disabled(max || !!this.readonly());
                if (min || max)
                        this._clearTimer();
	};

	P._setListeners = function() {
		D.BASE._setListeners.call(this);
		this.addEventListener({ onFocus       : onFocus,
					onBlur        : onBlur,
                                        onMouseWheel  : onMouseWheel,
					onKeyDown     : onKeyDown,
					onKeyUp       : onKeyUp,
					onChange      : onChange });
	};

	P.initDOM = function() {
		D.BASE.initDOM.call(this);
		this._setupSpinnerBtn(this._buttonUp, true);
		this._setupSpinnerBtn(this._buttonDown, false);
	};

        P.readonly = function(readonly) {
                if (readonly != null) {
                        this._buttonUp.disabled(readonly);
                        this._buttonDown.disabled(readonly);
                }
                return D.BASE.readonly.apply(this, arguments);
        };

        P.getFormValue = function() {
                var val = this.getValue(), n = parseFloat(val);
                return isNaN(n) ? val : n;
        };

	P._spinnerUpdateVal = function(dir) {
                if (!this._readonly) {
                        var val = new Number(this.getValue());
                        var step = this._timerStep || this._step;
                        val = dir
			? (val + step)
			: (val - step);
                        if (this._minVal != null && val < this._minVal)
                                val = this._minVal;
                        if (this._maxVal != null && val > this._maxVal)
                                val = this._maxVal;
                        this.setValue(val);
                        this.applyHooks("onSpin", [ val ]);
                        this.focus();
                        this.select();
                        if (this._timer) {
                                var p = ++this._timerPos;
                                if (this._timerState.length && p == this._timerState[0].pos) {
                                        var o = this._timerState.shift();
                                        this._clearTimer(true);
                                        this._timerStep = o.step;
                                        this._startTimer(dir, o.speed);
                                }
                        }
                }
	};

	function spinnerAct(b) {
		this._spinnerUpdateVal(b._direction);
		(this._timerState = Array.$(this.intervals))
			.r_foreach(function(e){
				e.step *= this.step;
			}, this);
		this._timerPos = 0;
		this._startTimer(b._direction, 250);
		throw new DlExStopEventBubbling;
	};

	function spinnerMouseUp(b) {
//		this.select();
//		this.focus();
		this._clearTimer();
	};

	P._clearTimer = function(restart) {
		if (this._timer)
			clearInterval(this._timer);
		if (!restart) {
			this._timerState = null;
			this._timerStep = null;
			this._timerPos = null;
		}
		this._timer = null;
	};

	P._startTimer = function(dir, timeout) {
		if (this._timer)
			clearInterval(this._timer);
		this._timer = setInterval(this._spinnerUpdateVal.$(this, dir), timeout);
	};

	P._setupSpinnerBtn = function(b, up) {
		b._direction = up;
		var mouseUp = spinnerMouseUp.$(this, b);
		b.addEventListener({ onMouseDown : spinnerAct.$(this, b),
				     onMouseUp   : mouseUp });
		// this.addEventListener("onMouseUp", mouseUp);
	};

        P.setMinVal = function(min, nohooks) {
                this._minVal = min;
                var v = this.getFormValue();
                if (v != null && !isNaN(v) && v < min)
                        this.setValue(min, nohooks);
        };

        P.setMaxVal = function(max, nohooks) {
                this._maxVal = max;
                var v = this.getFormValue();
                if (v != null && !isNaN(v) && v > max)
                        this.setValue(max, nohooks);
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require eventproxy.js

DEFINE_CLASS("DlStyleSheet", DlEventProxy, function(D, P, DOM) {

        // var DEFAULT_EVENTS = [ "onChange", "onInsert", "onRemove" ];

        D.CONSTRUCT = function() {
                this._init();
        };

        function cleanup() {
                DOM.trash(this._el);
                this._s = null; // break references
                this._el = null;
        };

        P.insertRule = function(sel, style, index) {
                var s = this._s;
                if (index == null)
                        index = this.getRules().length;
                if (typeof style == "object") {
                        var tmp = [];
                        for (var i in style)
                                tmp.push(i + ":" + style[i]);
                        style = tmp.join(";");
                } else if (style instanceof Array) {
                        style = style.join(";");
                }
                if (is_ie) {
                        sel = sel.split(/\s*,\s*/);
                        if (sel.length == 1) {
                                s.addRule(sel, style, index);
                        } else {
                                var rule_id = DOM.ID();
                                var a = this._ier[rule_id] = [];
                                for (var i = 0; i < sel.length; ++i) {
                                        s.addRule(sel[i], style, index + i);
                                        a.push(this.getRules()[index + i]);
                                }
                                return rule_id;
                        }
                } else {
                        s.insertRule(sel + "{" + style + "}", index);
                }
                return this.getRules()[index];
        };

        P.deleteRule = function(rule) {
                if (is_ie && typeof rule == "string") {
                        this._ier[rule].foreach(this.deleteRule.$(this));
                        delete this._ier[rule];
                } else {
                        var rules = this.getRules();
                        for (var i = rules.length; --i >= 0;) {
                                if (rules[i] === rule) {
                                        if (is_ie) {
                                                this._s.removeRule(i);
                                                // XXX: MSDN states that the page isn't refreshed:
                                                // http://msdn.microsoft.com/en-us/library/ms531195(VS.85).aspx
                                                // if (!this.disabled())
                                                //        this.refresh();
                                        } else {
                                                this._s.deleteRule(i);
                                        }
                                        return i;
                                }
                        }
                }
        };

        P.modifyRule = function(rule, changes) {
                if (is_ie && typeof rule == "string") {
                        this._ier[rule].foreach(function(r) {
                                this.modifyRule(r, changes);
                        }, this);
                } else {
                        for (var i in changes) {
                                rule.style[i] = changes[i];
                        }
                }
        };

        // hope this works...
        P.refresh = function() {
                var v = this.disabled();
                this.disabled(!v);
                this.disabled(v);
        };

        P.getRules = function() {
                return is_ie ? this._s.rules : this._s.cssRules;
        };

        P.disabled = function(dis) {
                var s = is_ie ? this._s : this._el;
                if (dis != null) {
                        s.disabled = dis;
                }
                return !!s.disabled;
        };

        P._init = function() {
                if (is_ie)
                        this._ier = {};
                this._el = DOM.createElement("style", null, { type: "text/css" }, document.getElementsByTagName("head")[0]);
                this._s = document.styleSheets[document.styleSheets.length - 1];
                this.addEventListener("onDestroy", cleanup);
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require container.js
// @require button.js
// @require hbox.js

DEFINE_CLASS("DlTabs", DlContainer, function(D, P, DOM){

        D.DEFAULT_EVENTS = [ "onChange" ];

	D.DEFAULT_ARGS = {
		_tabPos       : [ "tabPos"        , "top" ]
	};

	function onNotebookChange(tabs, newIndex, oldIndex) {
		var w = newIndex != null ? this._panes[newIndex] : null;
		w && w._tab.checked(true);
		tabs.applyHooks("onChange", [ newIndex, oldIndex ]);
	};

	function onTabChange(btn) {
		if (btn.checked())
			this._tabContent.showPane(btn.userData);
	};

	function onTabClick(ev) {
		this.checked(true);
		throw new DlExStopEventProcessing();
	};

	P.addTab = function(w, title, pos) {
		this._tabContent.appendWidget(w, pos);
		w._tab = new DlButton({ label  : title,
					parent : this._tabBar,
					group  : this._tabGroup,
					type   : DlButton.TYPE.TWOSTATE,
					data   : this._tabContent.length() - 1
				      });
		w._tab.addEventListener("onClick", onTabClick, true);
                w.addEventListener("onDestroy", w._tab.destroy.$(w._tab));
                return w;
	};

        P.addTab2 = function(args) {
                var w = this.addTab(args.widget, args.title, args.pos);
                if (args.iconClass)
                        w._tab.setIconClass(args.iconClass);
                return w;
        };

	P.getTabBar = function() { return this._tabBar; };
	P.getNotebook = function() { return this._tabContent; };
	P.getTabButton = function(index) { return this.getNotebook().getPane(index)._tab; };
	P.getTabContent = P.getNotebook;

	P.initDOM = function() {
		D.BASE.initDOM.call(this);
		this._tabGroup = DlRadioGroup.get(this.id);
		this._tabBar = new DlHbox({ className: "TabBar" });
		this._tabContent = new DlNotebook({ className: "TabContent" });
		switch (this._tabPos) {
		    case "top":
		    case "left":
			this.appendWidget(this._tabBar);
			this.appendWidget(this._tabContent);
			break;
		    case "bottom":
		    case "right":
			this.appendWidget(this._tabContent);
			this.appendWidget(this._tabBar);
			break;
		}
		// DOM.createElement("div", { clear: "both" }, null, this._tabBar.getElement());
		this._tabContent.addEventListener("onChange", onNotebookChange.$(this._tabContent, this));
		this._tabGroup.addEventListener("onChange", onTabChange.$(this));
                this.addClass("DlTabs-" + this._tabPos);
	};

	P.setTabPos = function(tabPos) {
		var bar = this._tabBar.getElement();
		var content = this._tabContent.getElement();
		if (bar.parentNode)
			bar.parentNode.removeChild(bar);
		var pos = (tabPos == "top" || tabPos == "left")
			? pos = content
			: null;
		content.parentNode.insertBefore(bar, pos);
		this.addClass("DlTabs-" + tabPos, "DlTabs-" + this._tabPos);
		this._tabPos = tabPos;
	};

	P.setTabAlign = function(tabAlign) {
		return this._tabBar.setAlign(tabAlign);
	};

	P.setOuterSize = P.setSize = function(size) {
		D.BASE.setSize.call(this, size);
		size = this.getInnerSize();
		var bar = this._tabBar.getSize();
		// alert(size.x + "x" + size.y + " - " + bar.x + "x" + bar.y);
		switch (this._tabPos) {
		    case "top":
		    case "bottom":
			size.y -= bar.y;
			break;
		    case "left":
		    case "right":
			size.x -= bar.x;
			break;
		}
		this._tabContent.setSize(size);
	};

	P.showPane = function(index) { return this._tabContent.showPane(index); };
	P.nextPane = function() { return this._tabContent.nextPane(); };
	P.prevPane = function() { return this._tabContent.prevPane(); };
	P.isFirstPane = function() { return this._tabContent.isFirstPane(); };
	P.isLastPane = function() { return this._tabContent.isLastPane(); };
	P.getCurrentPane = function() { return this._tabContent.getCurrentPane(); };
	P.getCurrentPaneIndex = function() { return this._tabContent.getCurrentPaneIndex(); };

        P._handle_focusKeys = function(ev) {
                if (ev.shiftKey) {
                        if (ev.keyCode == DlKeyboard.PAGE_UP) {
                                this.prevPane();
                                this.getCurrentPane()._tab.focus();
                                DlException.stopEventBubbling();
                        } else if (ev.keyCode == DlKeyboard.PAGE_DOWN) {
                                this.nextPane();
                                this.getCurrentPane()._tab.focus();
                                DlException.stopEventBubbling();
                        }
                } else if (ev.keyCode == DlKeyboard.TAB && this._tabBar.focusInside()) {
                        var w = this.getCurrentPane().getFirstFocusWidget();
                        if (w) {
                                w.focus();
                                DlException.stopEventBubbling();
                        }
                }
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require jslib.js
// @require keyboard.js

DlTextUtils = (function(){

        var D, DOM = DynarchDomUtils, K = DlKeyboard, START_REGEXPS = [

                (/^(\s*[-*]+\s+)/), function(m) {
                        return [ m, " ".x(m[0].length), m[0].length ];
                },

                (/^(\s*)([0-9]+)(\.\s+)/), function(m) {
                        return [ function(){
                                var n = parseInt(m[2], 10) + 1;
                                return m[1] + n + m[3];
                        }, " ".x(m[0].length), m[0].length ];
                },

                (/^(\s*)([a-z])(\)\s+)/i), function(m) {
                        return [ function(){
                                var n = String.fromCharCode(m[2].charCodeAt(0) + 1);
                                return m[1] + n + m[3];
                        }, " ".x(m[0].length), m[0].length ];
                },

                (/^\s*([>|]\s*)*/), function(m) {
                        return [ m, m[0], m[0].length, /\n\s*([>|]\s*)*/g, "\n" ];
                },

                (/^\s+/), function(m) {
                        return [ m, m[0], m[0].length ];
                }

        ];

        var K_UP_DOWN = [ K.ARROW_UP, K.ARROW_DOWN ].toHash(true);

        var ZERO = String.fromCharCode(0);

        function taKeyPress(ev) {
                if (!ev)
                        ev = window.event;

                var range = DOM.getSelectionRange(this),
                        scroll = { x: this.scrollLeft, y: this.scrollTop };

                function end() {
                        this.scrollLeft = scroll.x;
                        this.scrollTop = scroll.y;
                        return DOM.stopEvent(ev);
                };

                // M-Q (fill-paragraph)
                if (ev.altKey && ev.charCode == 113) {
                        var val = D.fillText(this.value, 72, range.start);
                        this.value = val.text;
                        DOM.setSelectionRange(this, val.pos, val.pos);
                        return end.call(this);
                }

                // forward-paragraph / backward-paragraph
                if (ev.ctrlKey && (ev.keyCode in K_UP_DOWN)) {
                        var isUp = ev.keyCode == K.ARROW_UP,
                                p = D.getParagraph(this.value, isUp ? range.start : range.end),
                                pos;
                        pos = (isUp ? p.start - 1 : p.end + 1).limit(0, this.length);
                        DOM.setSelectionRange(this, ev.shiftKey ? (isUp ? range.end : range.start) : pos, pos);
                        return DOM.stopEvent(ev);
                }

                // create-similar-paragraph (I made this up :-p)
                if (ev.altKey && ev.keyCode == K.ENTER) { // M-ENTER
                        var text = this.value,
                                p = D.getParagraph(text, range.start),
                                a = D.getFillPrefix(p.text),
                                prefix = a[0];
                        if (typeof prefix == "function")
                                prefix = prefix(a);
                        else
                                prefix = prefix[0];
                        text = text.substr(0, p.end) + "\n\n" + prefix + text.substr(p.end); // XXX: paragraph separator
                        this.value = text;
                        DOM.setSelectionRange(this, p.end + 2 + prefix.length);
                        return end.call(this);
                }
        };

        var RE_PARA = /\n([>|\s]*\n)+/g;
        function lastIndexOfRegexp(str, re, caret) {
                var m, pos = -1;
                re.lastIndex = 0;
                re.global = true;
                var last_post = -1;
                while ((m = re.exec(str))) {
                        if (re.lastIndex >= caret)
                                break;
                        pos = re.lastIndex;
                        if (pos == last_post) {
                                throw "Repeated! " + pos;
                        }
                        last_post = pos;
                }
                return pos;
        };

        function nextIndexOfRegexp(str, re, caret) {
                re.lastIndex = caret;
                re.global = true;
                var m = re.exec(str);
                return m ? m.index : null;
        };

        return D = {

                getParagraph: function(text, pos) {
                        var start = lastIndexOfRegexp(text, RE_PARA, pos + 1), end = nextIndexOfRegexp(text, RE_PARA, pos);
                        if (start == -1)
                                start = 0;
                        if (end == null)
                                end = text.length;
                        return { start: start, end: end, text: text.substring(start, end) };
                },

                getFillPrefix: function(para) {
                        var i = 0, re, f, m;
                        para = para.replace(/\x00/g, "");
                        while (i < START_REGEXPS.length) {
                                re = START_REGEXPS[i++];
                                f = START_REGEXPS[i++];
                                re.lastIndex = 0;
                                if ((m = re.exec(para)))
                                        return f(m);
                        }
                },

                fillParagraph: function(para, width, pos) {
                        para = para.substr(0, pos) + ZERO + para.substr(pos);
                        var a = D.getFillPrefix(para), prefix = a[1], restPos = a[2];
                        var before = para.substr(0, restPos);
                        para = para.substr(restPos);
                        if (a[3]) {
                                para = para.replace(a[3], function(s) {
                                        return a[4] || "";
                                });
                        }
                        para = para.replace(/\n/g, " ").replace(/([^.?!])\s\s+/g, "$1 ");
                        var re = new RegExp("(.{0," + (width - prefix.length) + "})(\\s+|$)", "g");
                        var m, buf = [], lastPos = 0, line;
                        while ((m = re.exec(para))) {
                                if (re.index != lastPos)
                                        line = para.substring(lastPos, re.lastIndex);
                                else
                                        line = m[1];
                                lastPos = re.lastIndex;
                                if (!/\S/.test(line))
                                        break;
                                buf.push(line.trim(true));
                        }
                        para = before + buf.join("\n" + prefix);
                        pos = para.indexOf(ZERO);
                        if (pos >= 0)
                                para = para.substr(0, pos) + para.substr(pos + 1);
                        return { text: para, pos: pos };
                },

                fillText: function(text, width, pos) {
                        var p = D.getParagraph(text, pos);
                        var before = text.substr(0, p.start), after = text.substr(p.end);
                        var posInPara = pos - p.start;
                        var ret = D.fillParagraph(p.text, width, posInPara);
                        return { text: before + ret.text + after, pos: p.start + ret.pos };
                },

                emacsipateTextarea: function(ta) {
                        DOM.addEvent(ta, is_ie ? "keydown" : "keypress", taKeyPress);
                }

        };

})();

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require popup.js

DEFINE_CLASS("DlTooltip", DlPopup, function(D, P) {
        D.FIXARGS = function(args) {
                args.zIndex = 2000;
                args.focusable = false;
                this._mouseDiff = { x: 8, y: 12 };
        };
});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require container.js

DEFINE_CLASS("DlTree", DlContainer, function(D, P, DOM) {

        D.CONSTRUCT = function() {
                this.__treeItems = [];
        };

	P.getItem = function(idx) {
		return this.__treeItems[idx];
	};

        P.getItems = function() {
                return this.__treeItems;
        };

	P.appendWidget = function(w, pos) {
		if (w instanceof DlTreeItem &&
		    w.parent === this &&
		    pos > w.getIndex()) {
			--pos;
		}
		D.BASE.appendWidget.call(this, w, pos);
	};

	P.removeWidget = function(w) {
		D.BASE.removeWidget.call(this, w);
		if (w instanceof DlTreeItem) {
			var i = this.__treeItems.find(w);
			this.__treeItems.splice(i, 1);
			var l = this.__treeItems.length;
			if (l == 0) {
				if (this.parent instanceof DlTreeItem)
					this.destroy();
			} else {
				if (i == 0)
					this.__treeItems[i]._setFirstLast(true, null);
				if (i == l)
					this.__treeItems[i-1]._setFirstLast(null, true);
			}
		}
	};

	P._appendWidgetElement = function(w, pos) {
		var a = this.__treeItems;
		var parent = this.getContentElement();
		if (pos == null) {
			if (w instanceof DlTreeItem) {
				var last = a.peek();
				last
					? last._setFirstLast(null, false)
					: w._setFirstLast(true, null);
				a.push(w);
				w._setFirstLast(null, true);
			}
			parent.appendChild(w.getElement());
		} else {
			if (pos == a.length)
				return this._appendWidgetElement(w, null);
			var prev = a[pos];
			if (prev)
				prev._setFirstLast(false, pos == a.length - 1);
			w._setFirstLast(pos == 0, false);
			a.splice(pos, 0, w);
			parent.insertBefore(w.getElement(),
					    parent.childNodes[pos]);
		}
	};

	P.addSeparator = function(cls) {
		DOM.createElement("div", null,
		                  { className: cls || "DlTree-separator",
		                    innerHTML: "&nbsp;" },
		                  this.getElement());
	};

});

DEFINE_CLASS("DlTreeItem", DlContainer, function(D, P, DOM) {

        var CE = DOM.createElement,
            AC = DOM.addClass,
            DC = DOM.delClass,
            CC = DOM.condClass;

        D.CONSTRUCT = function() {
		this.setIconClass(this.__iconClass);
		this.__iconClass = null;
        };

	D.DEFAULT_ARGS = {
		__label     : [ "label"		 , null ],
		__iconClass : [ "iconClass"	 , null ],
		__itemClass : [ "itemClassName"	 , null ]
	};

	D.DEFAULT_EVENTS = [ "onExpand", "onCollapse", "onLabelMouseDown" ];

        var HTML = ( "<div class='DlTreeItem-div'>" +
                     "<table cellspacing='0' cellpadding='0' class='DlTreeItem-Table'>" +
                     "<tbody><tr>" +
                     "<td class='DlTreeItem-Expander'><div class='DlTree-IconWidth'>&nbsp;</div></td>" +
                     "<td></td>" +
                     "<td class='DlTreeItem-Label'></td>" +
                     "</tr></tbody></table>" +
                     "</div>" +
                     "<div class='DlTreeItem-Subtree'></div>" );

	function getTD(ev) {
		var el = ev.target;
		try {
			while (el && el.tagName.toLowerCase() != "td")
				el = el.parentNode;
		} catch(ex) {
			el = null;
		}
		return el;
	};

	function onClick(ev) {
		var td = getTD(ev);
		if (td && /DlTreeItem-(Expander|Icon)/.test(td.className)) {
			this.toggle();
			throw new DlExStopEventBubbling;
		}
	};

	function onDestroy() {
		var div = this.getSubtreeDiv();
                if (!window.DL_CLOSING)
                        DOM.trash(div);
                DOM.removeEvent(this.getDivElement(), "mousedown", this.__onLabelMouseDown);
	};

	P._setFirstLast = function(isFirst, isLast) {
		if (isFirst != null) {
			this.condClass(isFirst, "DlTreeItem-First");
			CC(this.getTableElement(), isFirst, "DlTreeItem-First");
		}
		if (isLast != null) {
			this.condClass(isLast, "DlTreeItem-Last");
			CC(this.getTableElement(), isLast, "DlTreeItem-Last");
		}
	};

	P._setListeners = function() {
		D.BASE._setListeners.call(this);
		this.addEventListener({ onMouseDown : onClick,
					onDestroy   : onDestroy
                                      });
	};

	P._createElement = function() {
		D.BASE._createElement.call(this);
		this.getElement().innerHTML = HTML;
		if (this.__label)
			this.setContent(this.__label);
		this.setUnselectable();

		this.__onLabelMouseDown = this._onLabelMouseDown.$(this);
		DOM.addEvent(this.getDivElement(), "mousedown", this.__onLabelMouseDown);
		if (this.__itemClass)
			AC(this.getDivElement(), this.__itemClass);
	};

	P._onLabelMouseDown = function(ev) {
		this.callHooks("onLabelMouseDown");
	};

	P.getDivElement = function() {
		return this.getElement().firstChild;
	};

	P.getTableElement = function() {
		return this.getElement().firstChild.firstChild;
	};

	P.getExpanderElement = function() {
		return this.getTableElement().rows[0].cells[0];
	};

	P.getIconElement = function() {
		return this.getTableElement().rows[0].cells[1];
	};

	P.getContentElement = function() {
		return this.getTableElement().rows[0].cells[2];
	};

	P.getSubtreeDiv = function() {
		return this.getElement().childNodes[1];
	};

	P.getSubtreeWidget = function() {
		return this._subtree;
	};

	P.getIndex = function() {
		return this.parent.__treeItems.find(this);
	};

	P.getParentItem = function() {
		return this.parent.parent;
	};

	// automagically creates a subtree IF no subtree widget exists
	// AND no _tree exists (such as a function ref.)
	P.addSubItem = function(item, pos) {
		var tree = this.getSubtreeWidget();
		if (!tree && !this._tree) {
			tree = new DlTree({});
			this.setTree(tree);
			this.expand();
		}
		tree.appendWidget(item, pos);
	};

	P.setTree = function(tree, expand, timeout) {
		if (this._tree && (typeof this._tree != "function"))
			this.removeWidget(this._tree);
		this._tree = tree;
		if (tree != null) {
			if (typeof tree != "function") {
				this.appendWidget(tree, true);
			} else if (expand == null)
				expand = false;
			if (expand)
				this.expand(expand);
			else {
				this.getSubtreeDiv().style.display = "none";
				this.updateExpanderState();
			}
		}
		if (timeout == null) {
			this._subtreeNeverExpires = true;
			this._subtreeExpires = null;
		} else {
			this._subtreeNeverExpires = false;
			this._subtreeExpires = new Date().getTime() + timeout;
		}
		this.condClass(tree, "DlTreeItem-hasSubtree");
		this.updateExpanderState();
	};

	P.isExpanded = function() {
		return this.getSubtreeDiv().style.display !== "none";
	};

	P.toggle = function() {
		this.expand(!this.isExpanded());
	};

	P.getPath = function() {
		var path = [];
		var item = this.getParentItem();
		while (item instanceof DlTreeItem) {
			path.push(item);
			item = item.getParentItem();
		}
		return path;
	};

	P.expandParents = function(expand) {
		var item = this.getParentItem();
		while (item instanceof DlTreeItem) {
			item.expand(expand);
			item = item.getParentItem();
		}
	};

	// hairy stuff
	P.expand = function(expand, nohooks) {
		if (expand == null)
			expand = true;
		var self = this;
		function cont() {
			self.getSubtreeDiv().style.display = expand ? "block" : "none";
			self.updateExpanderState();
			if (!nohooks)
				self.callHooks(expand ? "onExpand" : "onCollapse");
		};
		function cont2(tree, timeout) {
			var tmp = self._tree;
			if (self._subtree) try {
				self._subtree.destroy();
			} catch(ex) {}
			self._tree = tmp;
			if (timeout == null) {
				self._subtreeNeverExpires = true;
				self._subtreeExpires = null;
			} else {
				self._subtreeNeverExpires = false;
				self._subtreeExpires = new Date().getTime() + timeout;
			}
			self.appendWidget(tree, true);
			cont();
		};
		if (expand !== this.isExpanded()) {
			if (expand && typeof this._tree == "function") {
				if (this._subtree) {
					if (this._subtreeNeverExpires)
						cont();
					else {
						var time = new Date().getTime();
						if (this._subtreeExpires && time <= this._subtreeExpires)
							cont();
						else
							this._tree(cont2, this);
					}
				} else
					this._tree(cont2, this);
			} else
				cont();
		}
	};

	P.setIconClass = function(iconClass) {
		var e2 = this.getIconElement();
		// CC(e2, iconClass != null, this._className.peek() + "-Icon");
                CC(e2, iconClass != null, "DlTreeItem-Icon");
		if (this.iconClass) {
			e2.innerHTML = "";
			DC(e2, this.iconClass);
		}
		if (iconClass) {
			e2.innerHTML = "<div class='DlTree-IconWidth'>&nbsp;</div>";
			AC(e2, iconClass);
		}
		this.iconClass = iconClass;
	};

	P.updateExpanderState = function() {
		var div = this.getExpanderElement().firstChild;
		if (this._tree) {
// 			if (!div) {
// 				div = CE("div", null, { innerHTML: "&nbsp;" },
// 					 this.getExpanderElement());
// 			}
			var expanded = this.isExpanded();
			CC(div, expanded,
			   "DlTreeItem-Arrow-Expanded", "DlTreeItem-Arrow-Collapsed");
			CC(this.getTableElement(), expanded,
			   "DlTreeItem-Table-Expanded", "DlTreeItem-Table-Collapsed");
		} else {
			DC(div, "DlTreeItem-Arrow-Expanded");
			DC(div, "DlTreeItem-Arrow-Collapsed");
			this.delClass("DlTreeItem-hasSubtree");
		}



// else if (div) {
// 			DC(div, "DlTreeItem-Arrow-Expanded");
// 			DC(div, "DlTreeItem-Arrow-Collapsed");
// 			div.parentNode.removeChild(div);
// 			div = this.getTableElement();
// 			DC(div, "DlTreeItem-Table-Expanded");
// 			DC(div, "DlTreeItem-Table-Collapsed");
// 			this.delClass("DlTreeItem-hasSubtree");
// 		}
	};

// 	P.getTree = function() {
// 		if (typeof this._tree == "function") {
// 			this._tree = this._tree();
// 			if (this._tree)
// 				this.appendWidget(this._tree, true);
// 		}
// 		return this._tree;
// 	};

	P._appendWidgetElement = function(w, subtree) {
		var el = w.getElement(), t;
		if (w instanceof DlTreeItem) {
			this.addSubItem(w, subtree);
		} else {
			t = (subtree || w instanceof DlTree) ? this.getSubtreeDiv() : this.getContentElement();
 			if (subtree) {
				this._subtree = w;
				AC(el, "DlTree-withLines");
				this.addClass("DlTreeItem-hasSubtree");
			}
			t.appendChild(el);
		}
	};

	P._removeWidgetElement = function(w) {
		D.BASE._removeWidgetElement.call(this, w);
		if (!this.getSubtreeDiv().firstChild) {
			this._tree = null;
			this._subtree = null;
		}
		this.updateExpanderState();
	};

        P._setFocusedStyle = function(focused) {
                CC(this.getDivElement(), focused, "DlTreeItem-div-focus");
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

function DlType(name) {
	if (name) {
		this.name = name;
		DlType.TYPES[name] = this;
	}
};

DlType.TYPES = {};

DlType.prototype = {
	getDisplayValue : function(val) { return val; },
	compare : function(a, b) { throw "No comparator for type: " + this.name; }
};

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require widget.js

DEFINE_CLASS("DlUploadEntry", DlWidget, function(D, P, DOM) {

        D.DEFAULT_EVENTS = [ "onUploadStart", "onUploadEnd", "onChange" ];

        D.DEFAULT_ARGS = {
                _url    : [ "url", null ],
                _files  : [ "files", [ "file" ] ],
                _params : [ "params", null ]
        };

        D.BEFORE_BASE = function() {
                if (!(this._files instanceof Array))
                        this._files = [ this._files ];
        };

        P._createElement = function() {
                D.BASE._createElement.call(this);
                var iframe = DOM.createElement("iframe", null, {
                        frameBorder       : 0,
                        marginHeight      : 0,
                        marginWidth       : 0,
                        allowTransparency : true,
                        src               : is_ie ? "javascript:'';" : "about:blank"
                }, this.getElement());
                this.refNode("_iframe", iframe);
        };

        P.init = function() {
                var HTML = String.buffer(
                        "<html style='margin: 0; padding: 0; overflow: hidden; height: 100%;'>",
                        "<head>",
                        "<link type='text/css' rel='stylesheet' href='",
                        Dynarch.getFileURL("css/uploadentry.css"), "' />",
                        "</head>",
                        "<body>",
                        "<form action='",
                        this._url,
                        "' method='POST' encoding='multipart/form-data'>",
                        "<input type='hidden' name='_uploaderID' value='", this.getWidgetId(), "' />"
                );
                var p = this._params;
                if (p) {
                        if (p instanceof Array)
                                p = p.toHash("");
                        for (var i in p)
                                HTML("<input type='hidden' name='", i, "' value='", p[i], "' />");
                }
                this._files.foreach(function(name) {
                        HTML("<label class='upload'><input type='file' name='", name, "' /></label>");
                });
                HTML("</form></body></html>");
                var win = this._iframe.contentWindow;
                var doc = win.document;
                doc.open();
                doc.write(HTML.get());
                doc.close();

                this.refNode("_win", win);
                this.refNode("_doc", doc);
                this.refNode("_form", doc.getElementsByTagName("form")[0]);
                this._form.method = "POST";
                this._form.encoding = "multipart/form-data";
                var change_handler = onUploadChange.$(null, this);
                this._files.foreach(function(name) {
                        var field = this._form.elements.namedItem(name);
                        field.onchange = change_handler;
                        field.parentNode.onmousemove = onMouseMove;
                }, this);
        };

        P.setParam = function(name, val) {
                if (typeof name == "string") {
                        var el = this.getField(name);
                        if (!el) {
                                el = this._doc.createElement("input");
                                el.type = "hidden";
                                el.name = name;
                                this._form.appendChild(el);
                        }
                        el.value = val;
                } else
                        for (var i in name)
                                this.setParam(i, name[i]);
        };

        P.getParam = function(name) {
                var el = this.getField(name);
                return el && el.value;
        };

        P.getField = function(name) {
                return this._form.elements.namedItem(name);
        };

        P.submit = function() {
                this.callHooks("onUploadStart");
                this._form.submit();
        };

        D.finishUpload = function(upload) {
                if (!(upload instanceof DlUploadEntry))
                        upload = DlWidget.getById(upload);
                if (upload) {
                        upload.init();
                        upload.applyHooks("onUploadEnd", Array.$(arguments, 1));
                }
                else
                        // fixme: should we do this?
                        throw ("No such uploader: " + upload);
        };

        function onUploadChange(obj) {
                obj.applyHooks("onChange", [ this, this.name, this.value ]);
        };

        function onMouseMove(ev) {
                if (is_ie)
                        ev = this.ownerDocument.parentWindow.event;
                this.firstChild.style.right = 30 - ev.clientX + "px";
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @require exception.js

DEFINE_EXCEPTION("DlValidatorException");

DlValidatorException.MISMATCH = 1;
DlValidatorException.TOO_SMALL = 2;
DlValidatorException.TOO_BIG = 3;

DEFINE_CLASS("DlValidator", null, function(D, P){

        D.CONSTRUCT = function(callback) {
	        if (callback) {
                        if (typeof callback == "string")
                                callback = D[callback];
		        this._callback = callback;
		        this._args = arguments.length > 1
			        ? Array.$(arguments, 1)
			        : null;
	        }
        };

	P.ok = function(data) {
		if (typeof this._lastData != "undefined" && this._lastData === data)
			return true;
		try {
			var args = [ data ].concat(this._args || Array.$(arguments, 1));
			var val = this._callback.apply(this, args);
			this._lastData = data;
			this._lastValue = val;
			return true;
		} catch(ex) {
			if (ex instanceof DlValidatorException) {
				this._error = ex;
				return false;
			} else
				throw ex;
		}
	};

	P.getLastVal = function() { return this._lastValue; };
	P.getLastData = function() { return this._lastData; };
	P.getError = function() { return this._error; };

	D.Number = function(data, minVal, maxVal, integer, decimals) {
		data = data.replace(/\s/g, "");
		var n = new Number(data);
		if (isNaN(n))
			throw new DlValidatorException("Value must be numeric",
						       DlValidatorException.MISMATCH);
		if (integer && n != Math.round(n))
			throw new DlValidatorException("Value must be an integer",
						       DlValidatorException.MISMATCH);
		if (minVal != null && n < minVal)
			throw new DlValidatorException("Value must be bigger than " + minVal,
						       DlValidatorException.TOO_SMALL);
		if (maxVal != null && n > maxVal)
			throw new DlValidatorException("Value must be smaller than " + maxVal,
						       DlValidatorException.TOO_BIG);
		if (decimals)
			n = n.toFixed(decimals);
		return n;
	};

        // very dumb Email validator
        D.Email = function(data) {
                data = data.trim();
                if (!/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i.test(data)) {
                        throw new DlValidatorException("That doesn't look like an email address", DlValidatorException.MISMATCH);
                }
                return data;
        };

	// very very simple URL validator
	D.URL = function(data, args) {
		if (!args)
			args = {};
                data = data.trim();
		if (!/^(https?|ftps?):\x2f\x2f/.test(data)) {
                        if (/^([a-z0-9_-]+\.)+[a-z]+$/i.test(data)) {
                                if (!/^www\./.test(data))
                                        data = "www." + data;
                                return "http://" + data + "/";
                        }
			throw new DlValidatorException("Value must be an absolute URL",
						       DlValidatorException.MISMATCH);
                }
		return data;
	};

        function findMonth(str) {
                str = str.toLowerCase();
                function f(a) {
                        return a.foreach(function(n, i){
                                if (n.toLowerCase().indexOf(str) == 0)
                                        $RETURN(i);
                        });
                };
                var mo = f(DlTEXTS._date_shortMonthNames) || f(DlTEXTS._date_monthNames);
                if (mo != null)
                        mo++;
                return mo;
        };

        D.Date = function(data, format, monthFirst) {

                if (!/\S/.test(data))
                        return "";

                if (!format)
                        format = "%Y-%m-%d";

                data = data.replace(/^\s+/, "").replace(/\s+$/, "");

                var today = new Date();
                var yr = null, mo = null, da = null, h = null, m = null, s = null;

                // deal with time first

                var b = data.match(/([0-9]{1,2}):([0-9]{1,2})(:[0-9]{1,2})?\s*(am|pm)?/i);
                if (b) {
                        h = parseInt(b[1], 10);
                        m = parseInt(b[2], 10);
                        s = b[3] ? parseInt(b[3].substr(1), 10) : 0;
                        data = data.substring(0, b.index) + data.substr(b.index + b[0].length);
                        if (b[4]) {
                                if (b[4].toLowerCase() == "pm" && h < 12)
                                        h += 12;
                                else if (b[4].toLowerCase() == "am" && h >= 12)
                                        h -= 12;
                        }
                }

                var a = data.split(/\W+/);
                var mod = [];
                a.foreach(function(v){
                        if (/^[0-9]{4}$/.test(v)) {
                                yr = parseInt(v, 10);
                                if (!mo && !da && monthFirst == null)
                                        monthFirst = true;
                        } else if (/^[0-9]{1,2}$/.test(v)) {
                                v = parseInt(v, 10);
                                if (v >= 60) {
                                        yr = v;
                                } else if (v >= 0 && v <= 12) {
                                        mod.push(v);
                                } else if (v >= 1 && v <= 31) {
                                        da = v;
                                }
                        } else {
                                // maybe month name?
                                mo = findMonth(v);
                        }
                });

                if (mod.length >= 2) {
                        // quite nasty
                        if (monthFirst) {
                                if (!mo)
                                        mo = mod.shift();
                                if (!da)
                                        da = mod.shift();
                        } else {
                                if (!da)
                                        da = mod.shift();
                                if (!mo)
                                        mo = mod.shift();
                        }
                } else if (mod.length == 1) {
                        if (!da)
                                da = mod.shift();
                        else if (!mo)
                                mo = mod.shift();
                }

                if (!yr)
                        yr = mod.length > 0 ? mod.shift() : today.getFullYear();

                if (yr < 30)
                        yr += 2000;
                else if (yr < 99)
                        yr += 1900;

                if (!mo)
                        mo = today.getMonth() + 1;

                // console.log("yr: %o, mo: %o, da: %o, h: %o, m: %o, s: %o, mod: %o", yr, mo, da, h, m, s, mod);

                if (yr && mo && da) {
                        this._date = new Date(yr, mo - 1, da, h, m, s);
                } else {
                        this._date = null;
                        throw new DlValidatorException("Can't figure out this date",
                                                       DlValidatorException.MISMATCH);
                }

                return this._date.print(format);
        };

});

//> This file is part of DynarchLIB, an AJAX User Interface toolkit
//> http://www.dynarchlib.com/
//>
//> Copyright (c) 2004-2011, Mihai Bazon, Dynarch.com.  All rights reserved.
//>
//> Redistribution and use in source and binary forms, with or without
//> modification, are permitted provided that the following conditions are
//> met:
//>
//>     * Redistributions of source code must retain the above copyright
//>       notice, this list of conditions and the following disclaimer.
//>
//>     * Redistributions in binary form must reproduce the above copyright
//>       notice, this list of conditions and the following disclaimer in
//>       the documentation and/or other materials provided with the
//>       distribution.
//>
//>     * Neither the name of Dynarch.com nor the names of its contributors
//>       may be used to endorse or promote products derived from this
//>       software without specific prior written permission.
//>
//> THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
//> EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//> IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
//> PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE
//> FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//> CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//> SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//> INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//> CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//> ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
//> THE POSSIBILITY OF SUCH DAMAGE.

// @if DEBUG
// @require ALL

function DlConsole(){
        this._messages = [];
        DlConsole.INSTANCE = this;
};

DlConsole.prototype = {

        log : function(str) {
                str = str.printf.apply(str, Array.$(arguments, 1));
                this._addMsg({ str: str });
        },

        line : function() {
                this._addMsg({ str: "&nbsp;", cls: "sep" });
        },

        CC : function(text, cn) {
                var div = this.win.document.createElement("div");
                div.className = cn || "msg";
                div.innerHTML = text;
                this.win.document.body.appendChild(div);
                this.win.scrollTo(0, div.offsetTop + div.offsetHeight);
                if (this._last)
                        DynarchDomUtils.delClass(this._last, "current");
                DynarchDomUtils.addClass(div, "current");
                this._last = div;
        },

        _addMsg : function(msg) {
                this._init();
                if (!this.win)
                        // delay
                        this._messages.push(msg);
                else
                        this.CC(msg.str, msg.cls);
        },

        _init : function() {
                if (!this.win) {
                        window.open(Dynarch.getFileURL("html/dlconsole.html"),
                                    "DlConsole",
                                    "height=400,width=600,menubar=0,toolbar=0,scrollbars=1");
                }
        },

        _loaded : function(win) {
                this._last = null;
                this.win = win;
                this.log("<b>DynarchLIB Console</b><br />Initialized at %s", new Date());
                this.line();
                this._messages.foreach(this._addMsg, this);
        },

        protect : function(name) {
                var func = eval(name), f = function() {
                        try {
                                var a = [];
                                for (var i = 0; i < arguments.length; ++i)
                                        a.push(arguments[i]);
                                console.log(name + " [" + a.join(", ") + "]");
                                func.apply(this, arguments);
                        } catch(ex) {
                                alert("Exception in " + name + "\n" + ex);
                                throw ex;
                        }
                };
                eval(name + " = f");
        }

};

if (!window.dlconsole) {
        window.dlconsole = new DlConsole();
}
