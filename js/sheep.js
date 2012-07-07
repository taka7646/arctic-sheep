


var COURSE_X = 200;
var COURSE_Y = 50;
var COURSE_H = 150;
var COURSE_LENGTH = 1000;

var gameMain = arc.Class.create(arc.Game,{
	
	updateContainer: null,
	screen: null,
	stage: null,
	phase: 0,
	
	initialize: function initialize(params){
		this.updateContainer = new UpdateContainer();
		this.screen = new arc.display.DisplayObjectContainer();
//		this.screen._x = -1000;
		this.addChild(this.screen);
		this.stage = new arc.display.DisplayObjectContainer();
		this.screen.addChild(this.stage);
		var sheep = new Racer({course: 0, animeData:sheepSequence});
		this.stage.addChild(sheep);	
		this.updateContainer.add(sheep);
		// コース枠
		var c = new arc.display.Shape();
		c.beginStroke(4,0x000000,1.0);
		c.drawRect(COURSE_X-2,COURSE_Y-2,COURSE_LENGTH,COURSE_H*2);
		this.stage.addChild(c);
		// コースの脇に置く目印
		for(var i=0; i<10;++i){
			var p = new arc.display.Shape();
//			p.beginStroke(1,0x8888ff,1.0);
			p.beginFill(0x8888ff,1.0);
			p.drawCircle(10,10,10);
			p.endFill();
//			p.endStroke();
			p._x = COURSE_X + i * COURSE_LENGTH / 10;
			p._y = COURSE_Y - 25;
			this.stage.addChild(p);	
		}

		var cow2 = new Racer({course:1, animeData:rabbitSequence});
//		cow2.setY(160);
		this.stage.addChild(cow2);
		this.updateContainer.add(cow2);
	},
	update: function update(){
		this.updateContainer.update();
	},
});

var Racer = arc.Class.create(AnimeSprite,{
	pos: 0,
	cource: 0,
	initialize: function($super,params){
		$super(params.animeData);
		this.course = params.course;
		this._x = 100;
	},
	update: function($super, elapsedTime){
		var self = this;
//		self._x = COURSE_LENGTH - self.pos + COURSE_X;
		self._y = self.course * COURSE_H + COURSE_Y;
		self.updateAnimation(elapsedTime);
	},
});

var atags = document.querySelectorAll("#scroll > a");
for(var i=0,len=atags.length;i<len;++i){
	atags[i].addEventListener('click', function(e){
		var self = this;
		var v = self.getAttribute("data-value") | 0;
		e.preventDefault();
		arc._system._game.stage._x += v;
		console.log(arc._system._game.stage._x );
	});
}

window.addEventListener('DOMContentLoaded', function(e){
    var system = new arc.System(320, 400, 'canvas');
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

