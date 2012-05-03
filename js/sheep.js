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
	images: [],
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

	initialize: function(data, params){
		for(var i=params.images.length-1; i>=0;--i){
			this.images[i] = arc._system.getImage(params.images[i]);
		}
		this.sequenceList = params.sequenceList;
	},
	
	gotoNextSequence: function(){
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
	 * シーケンスあsにメーションを再生する。
	 */
	updateAnimation: function(elapsedTime){
		if(!this.isAnimation){
			return;
		}
		var seq = this.sequenceList[this.currentSequence];
		var frame = seq[this.sequenceIndex];
		this.sequenceCounter += elapsedTime;
		if(this.sequenceCounter >= frame.wait){
			this.gotoNextSequence();
		}
	},

	update: function(elapsedTime){
		this.updateAnimation(elapsedTime);
	},

	draw: function(){
		var seq = this.sequenceList[this.currentSequence];
		var frame = seq[this.sequenceIndex];
		for(var i=0,len=frame.items.length; i<len; ++i){
			var item = frame.items[i];
			var x = this._x + item.x;
			var y = this._y + item.y;
			var sx = isNaN(item.sx)? 1: item.sx;
			var sy = isNaN(item.sy)? 1: item.sy;
			var rot = isNaN(item.r)? 0: item.r;
			sx *= this._scaleX;
			sy *= this._scaleY;
			if(sx === 1 && sy === 1){
				this.images[item.image].draw(x, y, rot);
			}else{
				this.images[item.image].drawSize(x, y, sx, sy, 1, rot);
			}
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

var gameMain = arc.Class.create(arc.Game,{
	
	updateContainer: null,
	
	initialize: function initialize(params){
		this.updateContainer = new UpdateContainer();
		
       var sp1 = new arc.display.Sprite(this._system.getImage('img/hituji_1s.png'));
       var sp2 = new arc.display.Sprite(this._system.getImage('img/hituji_2s.png'));
       var sheep = new arc.display.MovieClip(12, true);
       sheep.addChild(sp1, {
       	1:{x:0, y:0, visible:true, transition:arc.anim.Transition.LINEAR},
       	5:{x:0, y:0, visible:false},
       });
       sheep.addChild(sp2,{
       	1:{visible:false},
       	5:{x:0,y:0, visible:true},
       	10:{x:0,y:0, },
       });
       var cow = new arc.display.MovieClip(12,true);
       cow.addChild(new arc.display.Sprite(this._system.getImage('img/ushi_1s.png')),{
       	1:{x:0, y:0, visible:true, transition:arc.anim.Transition.LINEAR},
       	5:{x:0, y:0, visible:false},
       });
       cow.addChild(new arc.display.Sprite(this._system.getImage('img/ushi_2s.png')),{
       	1:{visible:false},
       	5:{x:0, y:0, visible:true, transition:arc.anim.Transition.LINEAR},
       	10:{x:0, y:0,},
       });
       cow.setY(160);
       this.addChild(sheep);
       //this.addChild(cow);

       var cow2 = new AnimeSprite(null, rabbitSequence);
       cow2.setY(160);
       this.addChild(cow2);
       this.updateContainer.add(cow2);
	},
	update: function update(){
		this.updateContainer.update();
	},
});


window.addEventListener('DOMContentLoaded', function(e){
    var system = new arc.System(640, 960, 'canvas');
    // ゲームインスタンスを登録＆初期化
    system.setGameClass(gameMain, {hp:100, mp:100});
    
    system.addEventListener(arc.Event.PROGRESS, function(e){
    });
    
    system.addEventListener(arc.Event.COMPLETE, function(){
        // ロード終了。この後メインループスタート
    });
    
    // 画像のプリロード設定
    system.load([
    	'img/hituji_1s.png', 'img/hituji_2s.png', 
    	'img/ushi_1s.png', 'img/ushi_2s.png',
    	'img/usagi_1s.png', 'img/usagi_2s.png',
    ]);
}, false);
