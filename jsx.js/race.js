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
	/** @type {Game} */
	var game;
	/** @type {Array.<undefined|Object.<string, undefined|!string>>} */
	var images;
	/** @type {Object.<string, undefined|*>} */
	var params;
	game = new Game$S("canvas");
	js.global.stage = game;
	images = (function (o) { return o instanceof Array ? o : null; })(js.global.images);
	game.loadImage$AHS(images);
	params = (function (o) { return o instanceof Object ? o : null; })(js.global.params);
	game.initialize$();
};

var _Main$main$AS = _Main.main$AS;

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
			throw new Error("[c:/Users/taka/AppData/Roaming/npm/node_modules/jsx/lib/js/js/web.jsx:59] detected invalid cast, value is not an instance of the designated type or null");
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
	this.visible = true;
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
	if (! this.visible) {
		return;
	}
	alpha = ctx.globalAlpha;
	ctx.save();
	ctx.globalAlpha *= this.alpha;
	ctx.translate(this.pos.x, this.pos.y);
	ctx.rotate(this.angle);
	ctx.scale(this.scale.x, this.scale.y);
	this.drawCore$LCanvasRenderingContext2D$(ctx);
	for (i = 0; i < this.childs.length; i++) {
		c = this.childs[i];
		c.draw$LCanvasRenderingContext2D$(ctx);
	}
	ctx.restore();
	ctx.globalAlpha = alpha;
};

/**
 * @param {Drawable} drawItem
 */
Drawable.prototype.addChild$LDrawable$ = function (drawItem) {
	this.childs.push(drawItem);
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
 * class Shape extends Drawable
 * @constructor
 */
function Shape() {
}

Shape.prototype = new Drawable;
/**
 * @constructor
 */
function Shape$F$LCanvasRenderingContext2D$LShape$V$(renderFunc) {
	Drawable$.call(this);
	this.renderFunc = renderFunc;
};

Shape$F$LCanvasRenderingContext2D$LShape$V$.prototype = new Shape;

/**
 * @param {CanvasRenderingContext2D} ctx
 */
Shape.prototype.drawCore$LCanvasRenderingContext2D$ = function (ctx) {
	if (this.renderFunc == null) {
		return;
	}
	this.renderFunc(ctx, this);
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
};

Sprite$.prototype = new Sprite;

/**
 * @param {CanvasRenderingContext2D} ctx
 */
Sprite.prototype.drawCore$LCanvasRenderingContext2D$ = function (ctx) {
	/** @type {Stage} */
	var stage;
	/** @type {!number} */
	var i;
	/** @type {PartsRect$0} */
	var r;
	/** @type {HTMLImageElement} */
	var image;
	if (this.rects == null) {
		return;
	}
	stage = (function (o) { return o instanceof Stage ? o : null; })(js.global.stage);
	for (i = 0; i < this.rects.length; i++) {
		r = this.rects[i];
		image = stage.getImage$S(r.image);
		ctx.drawImage(image, r.u, r.v, r.w, r.h, r.x, r.y, r.w, r.h);
	}
};

/**
 * class SequenceAnimationSprite extends Sprite
 * @constructor
 */
function SequenceAnimationSprite() {
}

SequenceAnimationSprite.prototype = new Sprite;
/**
 * @constructor
 */
function SequenceAnimationSprite$() {
	Sprite$.call(this);
	this.sequenceData = null;
	this.sequenceName = "";
	this.seqIndex = 0;
	this.seqTime = 0;
};

SequenceAnimationSprite$.prototype = new SequenceAnimationSprite;

/**
 * @constructor
 * @param {Object.<string, undefined|Array.<undefined|Sequence>>} sequenceData
 */
function SequenceAnimationSprite$HALSequence$(sequenceData) {
	Sprite$.call(this);
	this.sequenceName = "";
	this.seqIndex = 0;
	this.seqTime = 0;
	this.sequenceData = sequenceData;
};

SequenceAnimationSprite$HALSequence$.prototype = new SequenceAnimationSprite;

/**
 * @param {!string} name
 */
SequenceAnimationSprite.prototype.changeSequence$S = function (name) {
	this.sequenceName = name;
	this.changeSeqIndex$N(0);
};

/**
 * @param {!number} index
 */
SequenceAnimationSprite.prototype.changeSeqIndex$N = function (index) {
	/** @type {Array.<undefined|Sequence>} */
	var seq;
	seq = this.sequenceData[this.sequenceName];
	if (index >= seq.length) {
		index %= seq.length;
	}
	this.seqIndex = index;
	this.seqTime = 0;
	this.rects = seq[index].parts;
	if (seq[index].angle != null) {
		this.angle = (function (v) {
			if (! (v != null)) {
				debugger;
				throw new Error("[jsx/lib/Sprite.jsx:75] null access");
			}
			return v;
		}(seq[index].angle));
	}
};

/**
 * @param {!number} elapsedTime
 */
SequenceAnimationSprite.prototype.update$N = function (elapsedTime) {
	/** @type {Array.<undefined|Sequence>} */
	var seq;
	seq = this.sequenceData[this.sequenceName];
	if (seq == null) {
		return;
	}
	this.seqTime += elapsedTime;
	if (seq[this.seqIndex].time <= this.seqTime) {
		this.changeSeqIndex$N(this.seqIndex + 1);
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
	this.fps = 60;
	this.width = 0;
	this.height = 0;
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
	this.fps = 60;
	this.enterFrame = null;
	this.canvas = (function (o) { return o instanceof HTMLCanvasElement ? o : null; })(dom$id$S(id));
	this.width = this.canvas.width;
	this.height = this.canvas.height;
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
		dom.window.setTimeout(self.enterFrame, 1000 / self.fps);
	});
	this.canvas.addEventListener("click", (function (e) {
		self.onClick$LEvent$(e);
	}));
};

Stage$S.prototype = new Stage;

/**
 */
Stage.prototype.start$ = function () {
	console.log("start main loop.");
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
	ctx.clearRect(0, 0, this.width, this.height);
	for (i = 0; i < this.drawItems.length; i++) {
		o = this.drawItems[i];
		o.draw$LCanvasRenderingContext2D$(ctx);
	}
};

/**
 * @param {Event} e
 */
Stage.prototype.onClick$LEvent$ = function (e) {
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
 * @param {!string} key
 * @return {HTMLImageElement}
 */
Stage.prototype.getImage$S = function (key) {
	return this.imageLoader.get$S(key);
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
 */
Vector2.prototype.set$NN = function (x, y) {
	this.x = x;
	this.y = y;
};

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
 * class Course extends Shape
 * @constructor
 */
function Course() {
}

Course.prototype = new Shape;
/**
 * @constructor
 */
function Course$F$LCanvasRenderingContext2D$LShape$V$(renderFunc) {
	Shape$F$LCanvasRenderingContext2D$LShape$V$.call(this, renderFunc);
	this.x = 0;
	this.y = 0;
};

Course$F$LCanvasRenderingContext2D$LShape$V$.prototype = new Course;

/**
 * @param {!number} elapsedTime
 */
Course.prototype.update$N = function (elapsedTime) {
	/** @type {Game} */
	var game;
	/** @type {Racer} */
	var p0;
	/** @type {Racer} */
	var p1;
	/** @type {!number} */
	var diff;
	/** @type {!number} */
	var pos;
	/** @type {!number} */
	var adiff;
	game = (function (o) { return o instanceof Game ? o : null; })(js.global.stage);
	Drawable.prototype.update$N.call(this, elapsedTime);
	p0 = game.racers[0];
	p1 = game.racers[1];
	diff = p0.pos.x - p1.pos.x;
	pos = 0;
	if (diff < 0) {
		adiff = (diff >= 0 ? diff : - diff);
		if (adiff < Const.SCREEN_W * 0.8) {
			pos = p0.pos.x + adiff / 2;
		} else {
			pos = p0.pos.x + Const.SCREEN_W * 0.4;
		}
	} else {
		if (diff > 0) {
			pos = p0.pos.x - Const.SCREEN_W * 0.25;
		} else {
			pos = p0.pos.x;
		}
	}
	pos = p0.pos.x - Const.SCREEN_W * 0.25;
	pos = - pos + Const.SCREEN_W / 2;
	this.pos.x = pos;
};

/**
 * class Game extends Stage
 * @constructor
 */
function Game() {
}

Game.prototype = new Stage;
/**
 * @constructor
 * @param {!string} id
 */
function Game$S(id) {
	Stage$S.call(this, id);
	this.stage = null;
	this.phase = "INIT";
	this.counter = 0;
	this.winner = - 1;
	this.racers = new Array();
	this.obstacles = new Array();
	this.obstacles.push(new Array());
	this.obstacles.push(new Array());
};

Game$S.prototype = new Game;

/**
 */
Game.prototype.initialize$ = function () {
	var $this = this;
	var func;
	/** @type {Course} */
	var course;
	/** @type {!number} */
	var i;
	/** @type {!number} */
	var j;
	/** @type {!number} */
	var p;
	/** @type {Obstacle} */
	var o;
	/** @type {Array.<undefined|CharParam>} */
	var rp;
	/** @type {CharParam} */
	var param;
	/** @type {CharParamBase} */
	var base;
	/** @type {Object.<string, undefined|Array.<undefined|Sequence>>} */
	var sheepData;
	/** @type {Racer} */
	var s;
	/** @type {Object.<string, undefined|Array.<undefined|Sequence>>} */
	var rabbitData;
	/** @type {GameText} */
	var text;
	func = (function (ctx, self) {
		/** @type {!number} */
		var x;
		/** @type {!number} */
		var y;
		/** @type {!number} */
		var w;
		/** @type {!number} */
		var h;
		/** @type {!number} */
		var i;
		x = Const.COURSE_X - 2;
		y = Const.COURSE_Y - 2;
		w = Const.COURSE_LENGTH;
		h = Const.COURSE_H * 2.5;
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.rect(x, y, w, h);
		ctx.stroke();
		for (i = 0; i < 10; ++ i) {
			x = Const.COURSE_X + i * Const.COURSE_LENGTH / 10;
			y = Const.COURSE_Y - 25;
			ctx.beginPath();
			ctx.fillStyle = 'rgb(128 , 128 , 255)';
			ctx.arc(x + 10, y + 10, 10, 0, 360, false);
			ctx.fill();
		}
	});
	course = new Course$F$LCanvasRenderingContext2D$LShape$V$(func);
	this.add$LDrawable$(course);
	for (i = 0; i < 2; i++) {
		for (j = 0; j < 3; j++) {
			p = Math.random() * Const.COURSE_LENGTH * 0.8 + Const.COURSE_LENGTH * 0.2;
			o = new Obstacle$NN(i, p | 0);
			course.addChild$LDrawable$(o);
			this.obstacles[i].push(o);
		}
	}
	rp = (function (o) { return o instanceof Array ? o : null; })(js.global.racerParams);
	param = rp[0];
	base = Game$getCharParamBase$N(param.id);
	sheepData = (function (o) { return o instanceof Object ? o : null; })(js.global[base._dataName]);
	s = new Racer$NNHALSequence$(0, param.id, sheepData);
	s.changeSequence$S("run");
	course.addChild$LDrawable$(s);
	this.racers.push(s);
	rabbitData = (function (o) { return o instanceof Object ? o : null; })(js.global.rabbitData);
	s = new Racer$NNHALSequence$(1, 3, rabbitData);
	s.changeSequence$S("run");
	course.addChild$LDrawable$(s);
	this.racers.push(s);
	text = new GameText$();
	this.add$SLDrawable$("text", text);
	text.setText$SNS("スタート", 40, "#000");
	text.pos.set$NN(160, 100);
	this.changePhase$S("START");
};

/**
 * @param {!string} phase
 */
Game.prototype.changePhase$S = function (phase) {
	this.phase = phase;
	this.counter = 0;
};

/**
 */
Game.prototype.checkGoal$ = function () {
	/** @type {!boolean} */
	var isGoal;
	/** @type {!number} */
	var i;
	/** @type {Racer} */
	var r;
	/** @type {GameText} */
	var text;
	/** @type {GameText} */
	var winText;
	/** @type {CharParam} */
	var param;
	isGoal = false;
	for (i = this.racers.length - 1; i >= 0; i--) {
		r = this.racers[i];
		if (r.racePos >= Const.COURSE_LENGTH) {
			isGoal = true;
			break;
		}
	}
	if (isGoal) {
		this.changePhase$S("GOAL");
		text = (function (o) { return o instanceof GameText ? o : null; })(this.get$S("text"));
		text.setText$SNS("ゴール", 40, "#000");
		text.show$();
		winText = new GameText$();
		winText.pos.set$NN(160, 140);
		this.add$SLDrawable$("winText", winText);
		param = Game$getCharParam$();
		if (this.racers[0].racePos >= this.racers[1].racePos) {
			this.winner = 0;
			winText.setText$SNS("かち", 30, "#000");
			param.money += 100;
		} else {
			this.winner = 1;
			winText.setText$SNS("まけ", 30, "#000");
			param.money += 50;
		}
		Game$save$LCharParam$(param);
	}
};

/**
 * @param {!number} elapsedTime
 */
Game.prototype.update$N = function (elapsedTime) {
	switch (this.phase) {
	case "START":
		this.counter++;
		if (this.counter >= 20) {
			this.changePhase$S("INIT");
		}
		break;
	case "INIT":
		this.changePhase$S("RACE");
		(function (o) { return o instanceof GameText ? o : null; })(this.get$S("text")).hide$();
		break;
	case "RACE":
		this.checkGoal$();
		break;
	case "GOAL":
		this.counter++;
		if (this.counter === 30) {
		}
		if (this.counter >= 50) {
			this.changePhase$S("END");
		}
		break;
	}
	Stage.prototype.update$N.call(this, elapsedTime);
};

/**
 * @param {Event} e
 */
Game.prototype.onClick$LEvent$ = function (e) {
	/** @type {Racer} */
	var racer;
	racer = this.racers[0];
	switch (this.phase) {
	case "RACE":
		racer.doJump$();
		break;
	case "END":
		dom.window.location.assign("room.html");
		break;
	}
	e.preventDefault();
};

/**
 * @param {!number} coursePos
 * @param {!number} course
 * @param {Vector2} pos
 */
Game.calcPosition$NNLVector2$ = function (coursePos, course, pos) {
	pos.x = Const.COURSE_LENGTH - coursePos + Const.COURSE_X;
	pos.y = course * Const.COURSE_H + Const.COURSE_Y + Const.COURSE_H;
};

var Game$calcPosition$NNLVector2$ = Game.calcPosition$NNLVector2$;

/**
 * @param {!number} id
 * @return {CharParamBase}
 */
Game.getCharParamBase$N = function (id) {
	/** @type {Object.<string, undefined|CharParamBase>} */
	var params;
	params = (function (o) { return o instanceof Object ? o : null; })(js.global.charParams);
	return params[id + ""];
};

var Game$getCharParamBase$N = Game.getCharParamBase$N;

/**
 * @return {CharParam}
 */
Game.getCharParam$ = function () {
	/** @type {Array.<undefined|CharParam>} */
	var rp;
	/** @type {CharParam} */
	var param;
	rp = (function (o) { return o instanceof Array ? o : null; })(js.global.racerParams);
	param = rp[0];
	return param;
};

var Game$getCharParam$ = Game.getCharParam$;

/**
 * @param {CharParam} param
 */
Game.save$LCharParam$ = function (param) {
	/** @type {CharUtil} */
	var util;
	util = js.global.charUtil;
	util.saveChar(param);
};

var Game$save$LCharParam$ = Game.save$LCharParam$;

/**
 * class Const extends Object
 * @constructor
 */
function Const() {
}

Const.prototype = new Object;
/**
 * @constructor
 */
function Const$() {
};

Const$.prototype = new Const;

/**
 * class GameText extends Drawable
 * @constructor
 */
function GameText() {
}

GameText.prototype = new Drawable;
/**
 * @constructor
 */
function GameText$() {
	Drawable$.call(this);
	this.text = "";
	this.font = "";
	this.family = "sans-serif";
	this.size = 0;
	this.color = "";
	this.isVisible = true;
	this.isBold = true;
};

GameText$.prototype = new GameText;

/**
 * @param {!string} text
 * @param {!number} size
 * @param {!string} color
 */
GameText.prototype.setText$SNS = function (text, size, color) {
	this.setText$SNSS(text, size, color, this.family);
};

/**
 * @param {!string} text
 * @param {!number} size
 * @param {!string} color
 * @param {!string} fontFamily
 */
GameText.prototype.setText$SNSS = function (text, size, color, fontFamily) {
	this.text = text;
	this.size = size;
	this.family = fontFamily;
	this.color = color;
	this.font = (this.size + "") + "px " + this.family;
};

/**
 */
GameText.prototype.show$ = function () {
	this.isVisible = true;
};

/**
 */
GameText.prototype.hide$ = function () {
	this.isVisible = false;
};

/**
 * @param {CanvasRenderingContext2D} ctx
 */
GameText.prototype.drawCore$LCanvasRenderingContext2D$ = function (ctx) {
	/** @type {!string} */
	var font;
	if (! this.isVisible) {
		return;
	}
	font = (this.isBold ? "bold " + this.font : this.font);
	ctx.fillStyle = this.color;
	ctx.font = this.font;
	ctx.textBaseline = 'top';
	ctx.textAlign = "center";
	ctx.fillText(this.text, 0, 0);
};

/**
 * class Obstacle extends Drawable
 * @constructor
 */
function Obstacle() {
}

Obstacle.prototype = new Drawable;
/**
 * @constructor
 * @param {!number} course
 * @param {!number} pos
 */
function Obstacle$NN(course, pos) {
	Drawable$.call(this);
	this.enable = true;
	this.racePos = pos;
	this.course = course;
};

Obstacle$NN.prototype = new Obstacle;

/**
 * @param {!number} elapsedTime
 */
Obstacle.prototype.update$N = function (elapsedTime) {
	Game$calcPosition$NNLVector2$(this.racePos, this.course, this.pos);
};

/**
 * @param {CanvasRenderingContext2D} ctx
 */
Obstacle.prototype.drawCore$LCanvasRenderingContext2D$ = function (ctx) {
	ctx.beginPath();
	ctx.fillStyle = 'rgb(170, 170 , 170)';
	ctx.arc(10, 10, 10, 0, 360, false);
	ctx.fill();
};

/**
 * @param {!number} pos
 * @return {!boolean}
 */
Obstacle.prototype.hitCheck$N = function (pos) {
	/** @type {!number} */
	var w;
	/** @type {!number} */
	var st;
	/** @type {!number} */
	var ed;
	w = 16;
	st = pos - w;
	ed = pos + w;
	if (! this.enable) {
		return false;
	}
	if (ed < this.racePos || st > this.racePos) {
		return false;
	}
	this.enable = false;
	return true;
};

/**
 * class Racer extends SequenceAnimationSprite
 * @constructor
 */
function Racer() {
}

Racer.prototype = new SequenceAnimationSprite;
/**
 * @constructor
 * @param {!number} course
 * @param {!number} id
 * @param {Object.<string, undefined|Array.<undefined|Sequence>>} sequenceData
 */
function Racer$NNHALSequence$(course, id, sequenceData) {
	SequenceAnimationSprite$HALSequence$.call(this, sequenceData);
	this.speed = 0;
	this.accel = 0;
	this.stamina = 0;
	this.jump = 0;
	this.jy = 0;
	this.damage = 0;
	this.ai = null;
	this.id = id;
	this.racePos = 0;
	this.course = course;
	if (this.course === 1) {
		this.ai = new EnemyAI$LRacer$(this);
	}
};

Racer$NNHALSequence$.prototype = new Racer;

/**
 * @param {!number} elapsedTime
 */
Racer.prototype.update$N = function (elapsedTime) {
	/** @type {Game} */
	var game;
	/** @type {CharParamBase} */
	var param;
	game = (function (o) { return o instanceof Game ? o : null; })(js.global.stage);
	param = Game$getCharParamBase$N(this.id);
	switch (game.phase) {
	case "INIT":
		this.changeSequence$S("run");
		this.speed = 0;
		this.stamina = param.stamina;
		break;
	case "RACE":
	case "GOAL":
		this.updateRace$LGame$LCharParamBase$(game, param);
		break;
	}
	this.updateJump$();
	Game$calcPosition$NNLVector2$(this.racePos, this.course, this.pos);
	this.pos.x += param.width;
	this.pos.y -= this.jy;
	SequenceAnimationSprite.prototype.update$N.call(this, elapsedTime);
};

/**
 * @param {Game} game
 * @param {CharParamBase} param
 */
Racer.prototype.hitCheck$LGame$LCharParamBase$ = function (game, param) {
	/** @type {Array.<undefined|Obstacle>} */
	var obstacles;
	/** @type {!number} */
	var i;
	/** @type {Obstacle} */
	var o;
	obstacles = game.obstacles[this.course];
	if (this.jump > 0) {
		return;
	}
	for (i = obstacles.length - 1; i >= 0; i--) {
		o = obstacles[i];
		if (o.hitCheck$N(this.racePos - param.width)) {
			this.speed = 0;
			this.damage += 20;
			this.stamina += 20;
		}
	}
};

/**
 * @return {!boolean}
 */
Racer.prototype.doJump$ = function () {
	if (this.jump !== 0 || this.damage > 0) {
		return false;
	}
	this.changeSequence$S("jump");
	this.jump = 1;
	this.accel += 10;
	return true;
};

/**
 */
Racer.prototype.updateJump$ = function () {
	if (this.jump) {
		this.jump++;
		this.jy = Math.sin(this.jump * Math.PI / 30) * 64;
		if (this.jump >= 30) {
			this.jump = 0;
			this.angle = 0;
			this.changeSequence$S("run");
		}
	}
};

/**
 * @param {Game} game
 * @param {CharParamBase} param
 */
Racer.prototype.updateRace$LGame$LCharParamBase$ = function (game, param) {
	if (this.ai) {
		this.ai.update$();
	}
	this.hitCheck$LGame$LCharParamBase$(game, param);
	if (this.damage > 0) {
		this.damage--;
	} else {
		if (this.stamina > 0 || this.speed < 1) {
			this.stamina--;
			if (this.speed < param.maxSpeed) {
				this.speed += (param.speed + this.accel) / 500;
			}
		} else {
			if (this.speed > 1) {
				this.speed = this.speed * (1 - 0.003);
				this.accel *= 0.9;
			}
		}
		this.racePos += this.speed;
	}
};

/**
 * class EnemyAI extends Object
 * @constructor
 */
function EnemyAI() {
}

EnemyAI.prototype = new Object;
/**
 * @constructor
 * @param {Racer} owner
 */
function EnemyAI$LRacer$(owner) {
	this.owner = owner;
	this.jumpHistory = new Array();
};

EnemyAI$LRacer$.prototype = new EnemyAI;

/**
 */
EnemyAI.prototype.update$ = function () {
	/** @type {Game} */
	var game;
	/** @type {Racer} */
	var owner;
	/** @type {Array.<undefined|Obstacle>} */
	var items;
	/** @type {!number} */
	var racePos;
	/** @type {!number} */
	var i;
	/** @type {Obstacle} */
	var o;
	/** @type {!number} */
	var diff;
	game = (function (o) { return o instanceof Game ? o : null; })(js.global.stage);
	owner = this.owner;
	items = game.obstacles[owner.course];
	racePos = owner.racePos;
	for (i = items.length - 1; i >= 0; i--) {
		if (this.jumpHistory[i] == 1) {
			continue;
		}
		o = items[i];
		diff = o.racePos - racePos;
		if (diff > 5 && diff < 64) {
			this.jumpHistory[i] = 1;
			if (Math.random() < 0.5) {
				owner.doJump$();
			}
		}
	}
};

_Main.stage = null;
js.global = (function () { return this; })();

$__jsx_lazy_init(dom, "window", function () {
	return js.global.window;
});
$__jsx_lazy_init(dom, "document", function () {
	return (function (v) {
		if (! (v == null || v instanceof HTMLDocument)) {
			debugger;
			throw new Error("[c:/Users/taka/AppData/Roaming/npm/node_modules/jsx/lib/js/js/web.jsx:31] detected invalid cast, value is not an instance of the designated type or null");
		}
		return v;
	}(js.global.document));
});
Const.COURSE_X = 200;
Const.COURSE_Y = 30;
Const.COURSE_H = 120;
Const.COURSE_LENGTH = 1500;
Const.SCREEN_W = 320;
var $__jsx_classMap = {
	"jsx/race.jsx": {
		_Main: _Main,
		_Main$: _Main$
	},
	"system:lib/js/js.jsx": {
		js: js,
		js$: js$
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
	"jsx/lib/Shape.jsx": {
		Shape: Shape,
		Shape$F$LCanvasRenderingContext2D$LShape$V$: Shape$F$LCanvasRenderingContext2D$LShape$V$
	},
	"jsx/lib/Sprite.jsx": {
		Sprite: Sprite,
		Sprite$: Sprite$,
		SequenceAnimationSprite: SequenceAnimationSprite,
		SequenceAnimationSprite$: SequenceAnimationSprite$,
		SequenceAnimationSprite$HALSequence$: SequenceAnimationSprite$HALSequence$
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
	"jsx/game/Course.jsx": {
		Course: Course,
		Course$F$LCanvasRenderingContext2D$LShape$V$: Course$F$LCanvasRenderingContext2D$LShape$V$
	},
	"jsx/game/Game.jsx": {
		Game: Game,
		Game$S: Game$S,
		Const: Const,
		Const$: Const$
	},
	"jsx/game/GameText.jsx": {
		GameText: GameText,
		GameText$: GameText$
	},
	"jsx/game/Obstacle.jsx": {
		Obstacle: Obstacle,
		Obstacle$NN: Obstacle$NN
	},
	"jsx/game/Racer.jsx": {
		Racer: Racer,
		Racer$NNHALSequence$: Racer$NNHALSequence$,
		EnemyAI: EnemyAI,
		EnemyAI$LRacer$: EnemyAI$LRacer$
	}
};


})();

//@ sourceMappingURL=jsx.js/race.js.mapping
