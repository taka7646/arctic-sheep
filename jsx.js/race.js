var JSX = {};
(function () {

/**
 * copies the implementations from source interface to target
 */
function $__jsx_merge_interface(target, source) {
	for (var k in source.prototype)
		if (source.prototype.hasOwnProperty(k))
			target.prototype[k] = source.prototype[k];
}

/**
 * defers the initialization of the property
 */
function $__jsx_lazy_init(obj, prop, func) {
	function reset(obj, prop, value) {
		delete obj[prop];
		obj[prop] = value;
		return value;
	}

	Object.defineProperty(obj, prop, {
		get: function () {
			return reset(obj, prop, func());
		},
		set: function (v) {
			reset(obj, prop, v);
		},
		enumerable: true,
		configurable: true
	});
}

/**
 * sideeffect().a /= b
 */
function $__jsx_div_assign(obj, prop, divisor) {
	return obj[prop] = (obj[prop] / divisor) | 0;
}

/*
 * global functions called by JSX
 * (enamed so that they do not conflict with local variable names)
 */
var $__jsx_parseInt = parseInt;
var $__jsx_parseFloat = parseFloat;
var $__jsx_isNaN = isNaN;
var $__jsx_isFinite = isFinite;

var $__jsx_encodeURIComponent = encodeURIComponent;
var $__jsx_decodeURIComponent = decodeURIComponent;
var $__jsx_encodeURI = encodeURI;
var $__jsx_decodeURI = decodeURI;

var $__jsx_ObjectToString = Object.prototype.toString;
var $__jsx_ObjectHasOwnProperty = Object.prototype.hasOwnProperty;

/*
 * profiler object, initialized afterwards
 */
function $__jsx_profiler() {
}

/*
 * public interface to JSX code
 */
JSX.require = function (path) {
	var m = $__jsx_classMap[path];
	return m !== undefined ? m : null;
};

JSX.profilerIsRunning = function () {
	return $__jsx_profiler.getResults != null;
};

JSX.getProfileResults = function () {
	return ($__jsx_profiler.getResults || function () { return {}; })();
};

JSX.postProfileResults = function (url) {
	if ($__jsx_profiler.postResults == null)
		throw new Error("profiler has not been turned on");
	return $__jsx_profiler.postResults(url);
};
/**
 * class _Main extends Object
 * @constructor
 */
function _Main() {
}

_Main.prototype = new Object;
/**
 * @constructor
 */
function _Main$() {
};

_Main$.prototype = new _Main;

/**
 * @param {Array.<undefined|!string>} args
 */
_Main.main$AS = function (args) {
};

var _Main$main$AS = _Main.main$AS;

/**
 * class dom extends Object
 * @constructor
 */
function dom() {
}

dom.prototype = new Object;
/**
 * @constructor
 */
function dom$() {
};

dom$.prototype = new dom;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.id$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.document.getElementById(id));
};

var dom$id$S = dom.id$S;

/**
 * @param {!string} id
 * @return {HTMLElement}
 */
dom.getElementById$S = function (id) {
	return (function (o) { return o instanceof HTMLElement ? o : null; })(dom.document.getElementById(id));
};

var dom$getElementById$S = dom.getElementById$S;

/**
 * @param {!string} tag
 * @return {HTMLElement}
 */
dom.createElement$S = function (tag) {
	return dom.document.createElement(tag);
};

var dom$createElement$S = dom.createElement$S;

/**
 * class Drawable extends Object
 * @constructor
 */
function Drawable() {
}

Drawable.prototype = new Object;
/**
 * @constructor
 */
function Drawable$() {
	this.childs = new Array();
	this.alpha = 1;
	this.pos = {x: 0, y: 0};
	this.scale = {x: 1, y: 1};
	this.angle = 0;
};

Drawable$.prototype = new Drawable;

/**
 * @param {Drawable} $this
 * @param {CanvasRenderingContext2D} ctx
 */
Drawable.draw$LDrawable$LCanvasRenderingContext2D$ = function ($this, ctx) {
	/** @type {!number} */
	var alpha;
	/** @type {!number} */
	var i;
	/** @type {Drawable} */
	var c;
	/** @type {Vector2} */
	var scale$0;
	/** @type {Vector2} */
	var pos$0;
	alpha = ctx.globalAlpha;
	ctx.save();
	ctx.globalAlpha *= $this.alpha;
	ctx.scale((scale$0 = $this.scale).x, scale$0.y);
	ctx.rotate($this.angle);
	ctx.translate((pos$0 = $this.pos).x, pos$0.y);
	Drawable$drawCore$LDrawable$LCanvasRenderingContext2D$($this, ctx);
	for (i = 0; i < $this.childs.length; i++) {
		c = $this.childs[i];
		Drawable$draw$LDrawable$LCanvasRenderingContext2D$(c, ctx);
	}
	ctx.restore();
	ctx.globalAlpha = alpha;
};

var Drawable$draw$LDrawable$LCanvasRenderingContext2D$ = Drawable.draw$LDrawable$LCanvasRenderingContext2D$;

/**
 * class Vector2 extends Object
 * @constructor
 */
function Vector2() {
}

Vector2.prototype = new Object;
/**
 * @constructor
 */
function Vector2$() {
	this.x = 0;
	this.y = 0;
};

Vector2$.prototype = new Vector2;

/**
 * @constructor
 * @param {Vector2} src
 */
function Vector2$LVector2$(src) {
	this.x = src.x;
	this.y = src.y;
};

Vector2$LVector2$.prototype = new Vector2;

/**
 * @constructor
 * @param {!number} x
 * @param {!number} y
 */
function Vector2$NN(x, y) {
	this.x = x;
	this.y = y;
};

Vector2$NN.prototype = new Vector2;

/**
 * @param {Vector2} $this
 * @param {!number} x
 * @param {!number} y
 * @return {Vector2}
 */
Vector2.add$LVector2$NN = function ($this, x, y) {
	$this.x += x;
	$this.y += y;
	return $this;
};

var Vector2$add$LVector2$NN = Vector2.add$LVector2$NN;

/**
 * @param {Vector2} $this
 * @param {Vector2} pos
 * @return {Vector2}
 */
Vector2.add$LVector2$LVector2$ = function ($this, pos) {
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	x$0 = pos.x;
	y$0 = pos.y;
	$this.x += x$0;
	$this.y += y$0;
	return $this;
};

var Vector2$add$LVector2$LVector2$ = Vector2.add$LVector2$LVector2$;

/**
 * @param {Vector2} $this
 * @param {Vector2} target
 * @param {!number} rate
 * @return {Vector2}
 */
Vector2.linear$LVector2$LVector2$N = function ($this, target, rate) {
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var y;
	/** @type {!number} */
	var x$0;
	/** @type {!number} */
	var y$0;
	x = (x$0 = $this.x) + (target.x - x$0) * rate;
	y = (y$0 = $this.y) + (target.y - y$0) * rate;
	return {x: x, y: y};
};

var Vector2$linear$LVector2$LVector2$N = Vector2.linear$LVector2$LVector2$N;

/**
 * class js extends Object
 * @constructor
 */
function js() {
}

js.prototype = new Object;
/**
 * @constructor
 */
function js$() {
};

js$.prototype = new js;

$__jsx_lazy_init(dom, "window", function () {
	return js.global.window;
});
$__jsx_lazy_init(dom, "document", function () {
	return js.global.document;
});
js.global = (function () { return this; })();

var $__jsx_classMap = {
	"jsx/race.jsx": {
		_Main: _Main,
		_Main$: _Main$
	},
	"system:lib/js/js/web.jsx": {
		dom: dom,
		dom$: dom$
	},
	"jsx/lib/Drawable.jsx": {
		Drawable: Drawable,
		Drawable$: Drawable$
	},
	"jsx/lib/Vector2.jsx": {
		Vector2: Vector2,
		Vector2$: Vector2$,
		Vector2$LVector2$: Vector2$LVector2$,
		Vector2$NN: Vector2$NN
	},
	"system:lib/js/js.jsx": {
		js: js,
		js$: js$
	}
};


})();

//@ sourceMappingURL=jsx.js/race.js.mapping
