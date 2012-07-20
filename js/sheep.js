


var COURSE_X = 200;
var COURSE_Y = 50;
var COURSE_H = 150;
var COURSE_LENGTH = 1500;
var SCREEN_W = 320;

// スクロール制御 & デバッグ表示
// Textfieldにmixinしている。
function onUpdateScreenPosition(elapsedTime){
	var self = this;
	var game = arc._system._game;
	var stage = game.stage;
	var diff = game.racer[0]._x - game.racer[1]._x;
	var pos = 0;
	if(diff < 0){
		diff = Math.abs(diff);
		if(diff < SCREEN_W*0.8){
			pos = game.racer[0]._x + diff/2;
		}else{
			pos = game.racer[0]._x + SCREEN_W * 0.4;
		}
	}else if(diff > 0){
		if(diff < SCREEN_W*0.5){
			pos = game.racer[0]._x - diff/2;
		}else{
			pos = game.racer[0]._x - SCREEN_W * 0.25;
		}
	}else{
		pos = game.racer[0]._x;
	}
	pos = -pos + SCREEN_W / 2;
	stage._x = pos;
	self.setText("scroll:"+stage._x + "," + stage._y);
}

var gameMain = arc.Class.create(arc.Game,{
	
	updateContainer: null,
	screen: null,
	stage: null,
	racer: [],
	phase: "START",
	counter: 0,
	screenManager: null,
	
	initialize: function initialize(params){
		this.updateContainer = new UpdateContainer();
		this.screen = new arc.display.DisplayObjectContainer();
		this.addChild(this.screen);
		this.stage = new arc.display.DisplayObjectContainer();
		this.screen.addChild(this.stage);

		// コース枠
		var c = new arc.display.Shape();
		c.beginStroke(4,0x000000,1.0);
		c.drawRect(COURSE_X-2,COURSE_Y-2,COURSE_LENGTH,COURSE_H*2);
		this.stage.addChild(c);
		// コースの脇に置く目印
		for(var i=0; i<10;++i){
			var p = new arc.display.Shape();
			p.beginFill(0x8888ff,1.0);
			p.drawCircle(10,10,10);
			p.endFill();
			p._x = COURSE_X + i * COURSE_LENGTH / 10;
			p._y = COURSE_Y - 25;
			this.stage.addChild(p);	
		}


		var sheep = new Racer({course: 0, animeData:sheepSequence});
		this.stage.addChild(sheep);	
		this.updateContainer.add(sheep);
		var rabbit = new Racer({course:1, animeData:rabbitSequence});
//		rabbit.setY(160);
		this.stage.addChild(rabbit);
		this.updateContainer.add(rabbit);
		
		this.racer.push(sheep);
		this.racer.push(rabbit);
		
		var p = new arc.display.TextField();
		this.screen.addChild(p);
		p.update = onUpdateScreenPosition;
		screenManager = p;
	},

	changePhase: function(phase) {
		this.phase = phase;
		this.counter = 0;
	},

	update: function update(){
		switch(this.phase){
			case "START":
				this.counter++;
				if(this.counter >= 20){
					this.changePhase("INIT");
				}
			break;
			case "INIT":
				this.changePhase("RACE");
			break;
			case "RACE":
			break;
		}
		this.updateContainer.update();
		screenManager.update();
	},
});

var Racer = arc.Class.create(AnimeSprite,{
	pos: 0,
	cource: 0,
	id: 0,
	speed: 0,
	stamina: 0,
	jump: 0,
	jy: 0,
	
	initialize: function($super,params){
		$super(params.animeData);
		this.course = params.course;
		this.id = params.animeData.id;
		this.jy = 0;
	},
	update: function($super, elapsedTime){
		var self = this;
		var game = arc._system._game;
		switch(game.phase){
			case "INIT":
				self.changeSequence(1);
				self.speed = 0;
				self.stamina = charParams[self.id].stamina;
			break;
			case "RACE":
				self.updateRace();
			break;
		}
		self._x = COURSE_LENGTH - self.pos + COURSE_X;
		self._y = self.course * COURSE_H + COURSE_Y + 120 - self.jy;
		self.updateAnimation(elapsedTime);
	},
	updateRace: function(){
		var self = this;
		var param = charParams[self.id];
		var game = arc._system._game;
		if(self.stamina > 0){
			self.stamina--;
			if(self.speed < param.maxSpeed){
				self.speed += param.speed / 100;
			}
		}else if(self.speed > 1){
			self.speed = self.speed * (1-0.002);
		}
		
		if(self.jump){
			self.jump++;
			self.jy = Math.sin(self.jump*Math.PI / 30) * 64;
			if(self.jump >= 30){
				self.jump = 0;
				self.changeSequence(1);
			}
		}
		
		
		self.pos += self.speed;
	},
});

var atags = document.querySelectorAll("#scroll > a");
for(var i=0,len=atags.length;i<len;++i){
	atags[i].addEventListener('click', function(e){
		var self = this;
		var v = self.getAttribute("data-value") | 0;
		e.preventDefault();
		arc._system._game.racer[0].pos += v;
	});
}

document.querySelectorAll("#jump")[0].addEventListener('click', function(e){
	// 自キャラ
	var self = this;
	var index = self.getAttribute("data-racer");
	var racer = arc._system._game.racer[index];
	if(racer.jump == 0){
		racer.changeSequence(2);
		racer.jump++;
	}
	console.log(racer);
});


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

