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
	/** @type {Stage} */
	var stage;
	stage = new Stage$S("canvas");
	stage.loadImage$AHS(_Main.images);
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
	return (function (v) {
		if (! (v == null || v instanceof HTMLElement)) {
			debugger;
			throw new Error("[C:/Users/taka/AppData/Roaming/npm/node_modules/jsx/lib/js/js/web.jsx:59] detected invalid cast, value is not an instance of the designated type or null");
		}
		return v;
	}(dom.document.createElement(tag)));
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
	this.pos = new Vector2$NN(0, 0);
	this.scale = new Vector2$NN(1, 1);
	this.angle = 0;
};

Drawable$.prototype = new Drawable;

/**
 * @param {!number} elapsedTime
 */
Drawable.prototype.updateCore$N = function (elapsedTime) {
};

/**
 * @param {!number} elapsedTime
 */
Drawable.prototype.update$N = function (elapsedTime) {
	/** @type {!number} */
	var i;
	/** @type {Drawable} */
	var c;
	this.updateCore$N(elapsedTime);
	for (i = 0; i < this.childs.length; i++) {
		c = this.childs[i];
		c.update$N(elapsedTime);
	}
};

/**
 * @param {CanvasRenderingContext2D} ctx
 */
Drawable.prototype.draw$LCanvasRenderingContext2D$ = function (ctx) {
	/** @type {!number} */
	var alpha;
	/** @type {!number} */
	var i;
	/** @type {Drawable} */
	var c;
	alpha = ctx.globalAlpha;
	ctx.save();
	ctx.globalAlpha *= this.alpha;
	ctx.scale(this.scale.x, this.scale.y);
	ctx.rotate(this.angle);
	ctx.translate(this.pos.x, this.pos.y);
	this.drawCore$LCanvasRenderingContext2D$(ctx);
	for (i = 0; i < this.childs.length; i++) {
		c = this.childs[i];
		c.draw$LCanvasRenderingContext2D$(ctx);
	}
	ctx.restore();
	ctx.globalAlpha = alpha;
};

/**
 * class ImageLoader extends Object
 * @constructor
 */
function ImageLoader() {
}

ImageLoader.prototype = new Object;
/**
 * @constructor
 */
function ImageLoader$F$V$(callback) {
	this.imageMap = new Object();
	this.imageCount = 0;
	this.loadedCount = 0;
	this.completeCallback = callback;
};

ImageLoader$F$V$.prototype = new ImageLoader;

/**
 * @param {Array.<undefined|Object.<string, undefined|!string>>} images
 */
ImageLoader.prototype.add$AHS = function (images) {
	var $this = this;
	/** @type {ImageLoader} */
	var self;
	var callBack;
	/** @type {!number} */
	var i;
	/** @type {Object.<string, undefined|!string>} */
	var src;
	/** @type {HTMLImageElement} */
	var img;
	self = this;
	callBack = (function (e) {
		/** @type {HTMLImageElement} */
		var image;
		image = (function (o) { return o instanceof HTMLImageElement ? o : null; })(e.target);
		self.loadedCount++;
		console.log(image.src + " load complete");
		if (self.loadedCount >= self.imageCount) {
			self.completeCallback();
		}
	});
	for (i = 0; i < images.length; i++) {
		src = images[i];
		img = (function (o) { return o instanceof HTMLImageElement ? o : null; })(dom$createElement$S("img"));
		img.addEventListener("load", callBack);
		this.imageCount++;
		this.imageMap[src.key] = img;
		img.src = (function (v) {
			if (! (v != null)) {
				debugger;
				throw new Error("[jsx/lib/ImageLoader.jsx:32] null access");
			}
			return v;
		}(src.url));
	}
};

/**
 * @param {!string} key
 * @return {HTMLImageElement}
 */
ImageLoader.prototype.get$S = function (key) {
	return this.imageMap[key];
};

/**
 * class Sprite extends Drawable
 * @constructor
 */
function Sprite() {
}

Sprite.prototype = new Drawable;
/**
 * @constructor
 */
function Sprite$() {
	Drawable$.call(this);
	this.rects = null;
	this.image = null;
};

Sprite$.prototype = new Sprite;

/**
 * @param {CanvasRenderingContext2D} ctx
 */
Sprite.prototype.drawCore$LCanvasRenderingContext2D$ = function (ctx) {
	/** @type {!number} */
	var i;
	/** @type {PartsRect} */
	var r;
	if (this.rects == null || this.image == null) {
		return;
	}
	for (i = 0; i < this.rects.length; i++) {
		r = this.rects[i];
		ctx.drawImage(this.image, r.u, r.v, r.w, r.h, r.x, r.y, r.w, r.h);
	}
};

/**
 * class Stage extends Object
 * @constructor
 */
function Stage() {
}

Stage.prototype = new Object;
/**
 * @constructor
 */
function Stage$() {
	this.canvas = null;
	this.imageLoader = null;
	this.prevTime = 0;
	this.nowTime = 0;
	this.fps = 30;
	this.enterFrame = null;
	this.drawItems = new Array();
	this.itemMap = new Object();
};

Stage$.prototype = new Stage;

/**
 * @constructor
 * @param {!string} id
 */
function Stage$S(id) {
	var $this = this;
	/** @type {Stage} */
	var self;
	this.imageLoader = null;
	this.prevTime = 0;
	this.nowTime = 0;
	this.fps = 30;
	this.enterFrame = null;
	this.canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom$id$S(id));
	this.drawItems = new Array();
	this.itemMap = new Object();
	self = this;
	this.enterFrame = (function () {
		/** @type {!number} */
		var elapsedTime;
		self.prevTime = self.nowTime;
		self.nowTime = Date.now();
		elapsedTime = self.nowTime - self.prevTime;
		self.update$N(elapsedTime);
		self.draw$();
		dom.window.setTimeout(self.enterFrame, self.fps / 1000);
	});
};

Stage$S.prototype = new Stage;

/**
 */
Stage.prototype.start$ = function () {
	dom.window.setTimeout(this.enterFrame, this.fps / 1000);
};

/**
 * @param {Array.<undefined|Object.<string, undefined|!string>>} images
 */
Stage.prototype.loadImage$AHS = function (images) {
	var $this = this;
	/** @type {Stage} */
	var self;
	var callBack;
	self = this;
	callBack = (function () {
		console.log("image load complete.");
		self.start$();
	});
	this.imageLoader = new ImageLoader$F$V$(callBack);
	this.imageLoader.add$AHS(images);
};

/**
 * @param {!number} elapsedTime
 */
Stage.prototype.update$N = function (elapsedTime) {
	/** @type {!number} */
	var i;
	/** @type {Drawable} */
	var o;
	for (i = 0; i < this.drawItems.length; i++) {
		o = this.drawItems[i];
		o.update$N(elapsedTime);
	}
};

/**
 */
Stage.prototype.draw$ = function () {
	/** @type {CanvasRenderingContext2D} */
	var ctx;
	/** @type {!number} */
	var i;
	/** @type {Drawable} */
	var o;
	ctx = (function (o) { return o instanceof CanvasRenderingContext2D ? o : null; })(this.canvas.getContext("2d"));
	for (i = 0; i < this.drawItems.length; i++) {
		o = this.drawItems[i];
		o.draw$LCanvasRenderingContext2D$(ctx);
	}
};

/**
 * @param {Drawable} drawItem
 */
Stage.prototype.add$LDrawable$ = function (drawItem) {
	this.drawItems.push(drawItem);
};

/**
 * @param {!string} name
 * @param {Drawable} drawItem
 */
Stage.prototype.add$SLDrawable$ = function (name, drawItem) {
	this.add$LDrawable$(drawItem);
	this.itemMap[name] = drawItem;
};

/**
 * @param {!string} name
 * @return {Drawable}
 */
Stage.prototype.get$S = function (name) {
	return this.itemMap[name];
};

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
 * @param {!number} x
 * @param {!number} y
 * @return {Vector2}
 */
Vector2.prototype.add$NN = function (x, y) {
	this.x += x;
	this.y += y;
	return this;
};

/**
 * @param {Vector2} pos
 * @return {Vector2}
 */
Vector2.prototype.add$LVector2$ = function (pos) {
	return this.add$NN(pos.x, pos.y);
};

/**
 * @param {Vector2} target
 * @param {!number} rate
 * @return {Vector2}
 */
Vector2.prototype.linear$LVector2$N = function (target, rate) {
	/** @type {!number} */
	var x;
	/** @type {!number} */
	var y;
	x = this.x + (target.x - this.x) * rate;
	y = this.y + (target.y - this.y) * rate;
	return new Vector2$NN(x, y);
};

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

$__jsx_lazy_init(_Main, "images", function () {
	return [ { key: "usagi1", url: "img/usagi_1s.png" }, { key: "usagi2", url: "img/usagi_2s.png" } ];
});
$__jsx_lazy_init(dom, "window", function () {
	return js.global.window;
});
$__jsx_lazy_init(dom, "document", function () {
	return (function (v) {
		if (! (v == null || v instanceof HTMLDocument)) {
			debugger;
			throw new Error("[C:/Users/taka/AppData/Roaming/npm/node_modules/jsx/lib/js/js/web.jsx:31] detected invalid cast, value is not an instance of the designated type or null");
		}
		return v;
	}(js.global.document));
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
	"jsx/lib/ImageLoader.jsx": {
		ImageLoader: ImageLoader,
		ImageLoader$F$V$: ImageLoader$F$V$
	},
	"jsx/lib/Sprite.jsx": {
		Sprite: Sprite,
		Sprite$: Sprite$
	},
	"jsx/lib/Stage.jsx": {
		Stage: Stage,
		Stage$: Stage$,
		Stage$S: Stage$S
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
