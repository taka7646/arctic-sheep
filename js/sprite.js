/**
 * シーケンスアニメーション再生するスプライトオブジェクト .
 * seq = [
 * 			// アニメ種類分の配列
 * 			[	// アニメフレーム(コマ)分の配列
 * 				{
 * 				wait: 10,	// wait frame count
 * 				items:[	// 描画するオブジェクトのリスト
 * 					// image:画像インデックス, x,y 描画オフセット, sx,sy スケール, r:回転角度(rad)
 * 					{image:0, x: 0, y: 0, sx: 1, sy: 1, r: 0},
 * 				],
 * 				}
 * 			],
 * 		]
 */
var AnimeSprite = arc.Class.create(arc.display.DisplayObject,{
	/** 画像リスト  */
	images: null,
	/** アニメーションシーケンスデータ */
	sequenceList: [],
	/** シーケンスインデックス */
	currentSequence: 0,
	/** シーケンス内のインデックス */
	sequenceIndex: 0,
	/** タイマーカウンタ */
	sequenceCounter: 0,
	/** アニメ更新フラグ */
	isAnimation: true,

	initialize: function($super,params){
		this.images = [];
		for(var i=params.images.length-1; i>=0;--i){
			this.images[i] = arc._system.getImage(params.images[i]);
		}
		this.sequenceList = params.sequenceList;
	},
	
	changeSequence: function(index){
		this.currentSequence = index;
		this.sequenceIndex = 0;
		this.sequenceCounter = 0;
	},
	
	_gotoNextAnimation: function(){
		var seq = this.sequenceList[this.currentSequence];
		var len = seq.length;
		var	frame = seq[this.sequenceIndex];
		while(this.sequenceCounter >= frame.wait){
			this.sequenceCounter -= frame.wait;
			this.sequenceIndex++;
			if(this.sequenceIndex >= len){
				this.sequenceIndex = 0;
			}
			frame = seq[this.sequenceIndex];
		}
	},
	
	/**
	 * シーケンスアニメーションを再生する。
	 */
	updateAnimation: function(elapsedTime){
		if(!this.isAnimation){
			return;
		}
		var seq = this.sequenceList[this.currentSequence];
		var frame = seq[this.sequenceIndex];
		this.sequenceCounter += elapsedTime;
		if(this.sequenceCounter >= frame.wait){
			this._gotoNextAnimation();
		}
	},

	update: function(elapsedTime){
		this.updateAnimation(elapsedTime);
	},

	draw: function(pX, pY, pScaleX, pScaleY, pAlpha, pRotation){
		var seq = this.sequenceList[this.currentSequence];
		var frame = seq[this.sequenceIndex];
		pX = (pX | 0);
		pY = (pY | 0);
		for(var i=0,len=frame.items.length; i<len; ++i){
			var item = frame.items[i];
			var x = pX;
			var y = pY;
			var sx = isNaN(item.sx)? 1: item.sx;
			var sy = isNaN(item.sy)? 1: item.sy;
			var rot = isNaN(item.r)? 0: item.r;
			sx *= this._scaleX;
			sy *= this._scaleY;
			var img = this.images[item.image];
			var w = img._width * sx;
			var h = img._height * sy;
			var ctx = arc._system._context;
			ctx.save();
			ctx.translate(x, y);
			ctx.rotate(rot);
			ctx.scale(sx, sy);
			ctx.drawImage(img._data, 0,0,img._width, img._height, item.x, item.y, img._width, img._height);
			ctx.restore();
//			img.drawCrop(item.x, item.y, img._width, img._height, x, y, w, h, rot);
//			if(sx === 1 && sy === 1){
//				img.draw(x, y, rot);
//			}else{
//				img.drawCrop(item.x, item.y, img._width, img._height, x, y, w, h, rot);
//			}
		}
	},
});

var UpdateContainer = arc.Class.create({
	container: [],
	prevTime: 0,
	initialize: function initialize(){
		this.prevTime = Date.now();
	},
	add: function add(object){
		this.container.push(object);
	},
	update: function update(){
		var self = this;
		var now = Date.now();
		var elapsedTime = now - self.prevTime;
		for(var i=0,len=self.container.length;i<len;++i){
			var o = self.container[i];
			o.update(elapsedTime);
		}
		self.prevTime = now;
	},
});

