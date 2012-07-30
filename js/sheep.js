


var COURSE_X = 200;
var COURSE_Y = 30;
var COURSE_H = 120;
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
		var adiff = Math.abs(diff);
		if(adiff < SCREEN_W*0.8){
			pos = game.racer[0]._x + adiff/2;
		}else{
			pos = game.racer[0]._x + SCREEN_W * 0.4;
		}
	}else if(diff > 0){
//		if(diff < SCREEN_W*0.5){
//			pos = game.racer[0]._x - diff/2;
//		}else{
			pos = game.racer[0]._x - SCREEN_W * 0.25;
//		}
	}else{
		pos = game.racer[0]._x;
	}
			pos = game.racer[0]._x - SCREEN_W * 0.25;
	pos = -pos + SCREEN_W / 2;
	stage._x = pos;
	var s = "scroll:"+stage._x + "," + stage._y+"\n";
	s += "diff:" + diff + "\n";
	s += "speed:" + game.racer[0].speed + "," + game.racer[1].speed + "\n";
	s += "stamina:" + game.racer[0].stamina + "," + game.racer[1].stamina + "\n";
	self.setText(s);
}

var gameMain = arc.Class.create(arc.Game,{
	
	updateContainer: null,
	screen: null,
	stage: null,
	racer: [],
	obstacles: [[],[]],
	phase: "START",
	winner: -1,
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
		c.drawRect(COURSE_X-2,COURSE_Y-2,COURSE_LENGTH,COURSE_H*2.5);
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

		for(var i=0;i<2;i++){
			for(var j=0;j<3;j++){
				var p = Math.random() * COURSE_LENGTH * 0.8 + COURSE_LENGTH * 0.2;
				var params = {
					course: i,
					pos: p | 0,
				};
				var o = new Obstacle(params);
				this.stage.addChild(o);
				this.obstacles[i].push(o);
			}
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

	checkGoal: function(){
		var self = this;
		var isGoal = false;
		for(var i=self.racer.length-1;i>=0;i--){
			var r = self.racer[i];
			if(r.pos >= COURSE_LENGTH){
				self.changePhase("GOAL");
				isGoal = true;
				var m = new arc.display.TextField();
				m.setAlign(arc.display.Align.CENTER);
				m.setText("ゴール!!");
				m.setX(160);
				m.setY(120);
				m.setFont("sans-serif", 40, true);
				self.screen.addChild(m);
			}
		}
		if(isGoal){
			if(self.racer[0].pos >= self.racer[1].pos){
				this.winner = 0;
			}else{
				this.winner = 1;
			}
		}
	},
	update: function update(){
		var self = this;
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
				this.checkGoal();
			break;
			case "GOAL":
				this.counter++;
				if(this.counter == 30){
					var m = new arc.display.TextField();
					m.setAlign(arc.display.Align.CENTER);
					if(self.winner == 0){
						m.setText("かち!!");
					}else{
						m.setText("まけ");
					}
					m.setX(160);
					m.setY(160);
					m.setFont("sans-serif", 40, true);
					self.screen.addChild(m);
				}
				if(this.counter >= 50){
					this.changePhase("END");
				}
			break;
		}
		this.updateContainer.update();
		screenManager.update();
	},
});

var EnemyAI = arc.Class.create({
	owner: null,
	jumpHistory: [],
	initialize:function(params){
		this.owner = params;
	},
	
	update: function(){
		var self = this;
		var owner = self.owner;
		var game = arc._system._game;
		var pos = owner.pos;
		var items = game.obstacles[owner.course];
		for(var i=items.length-1;i>=0;i--){
			if(self.jumpHistory[i] == 1){
				continue;
			}	
			var o = items[i];
			var diff = o.pos - pos;
			if(diff > 5 && diff < 64){
				self.jumpHistory[i] = 1;
				if(Math.random() < 0.5){
					owner.doJump();
				}
			}
		}
	},
});

var Racer = arc.Class.create(AnimeSprite,{
	pos: 0,
	cource: 0,
	id: 0,
	speed: 0,
	accel: 0,
	stamina: 0,
	jump: 0,
	jy: 0,
	damage: 0,
	ai: null,
	
	initialize: function($super,params){
		$super(params.animeData);
		this.course = params.course;
		this.id = params.animeData.id;
		this.jy = 0;
		if(this.course == 1){
			this.ai = new EnemyAI(this);
		}
	},
	update: function($super, elapsedTime){
		var self = this;
		var game = arc._system._game;
		var param = charParams[self.id];
		switch(game.phase){
			case "INIT":
				self.changeSequence(1);
				self.speed = 0;
				self.stamina = param.stamina;
			break;
			case "RACE":
			case "GOAL":
				self.updateRace();
			break;
		}
		self._x = COURSE_LENGTH - self.pos + COURSE_X + param.width;
		self._y = self.course * COURSE_H + COURSE_Y + COURSE_H - self.jy;
		self.updateAnimation(elapsedTime);
	},
	hitCheck: function(){
		var self = this;
		var game = arc._system._game;
		var param = charParams[self.id];
		var obstacles = game.obstacles[self.course];
		if(self.jump > 0){
			return;
		}
		for(var i=obstacles.length-1;i>=0;i--){
			var o = obstacles[i];
			if(o.hitCheck(self.pos-param.width)){
				// hit
				self.speed = 0;
				self.damage += 20;
				self.stamina += 20;
			}
		}
	},
	updateRace: function(){
		var self = this;
		var param = charParams[self.id];
		var game = arc._system._game;
		
		if(self.ai){
			self.ai.update();
		}
		
		self.hitCheck();
		if(self.damage > 0){
			self.damage--;
		}else{
			if(self.stamina > 0 || self.speed < 1){
				self.stamina--;
				if(self.speed < param.maxSpeed){
					self.speed += (param.speed+self.accel) / 500;
				}
			}else if(self.speed > 1){
				self.speed = self.speed * (1-0.003);
				self.accel *= 0.9;
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
		}
	},
	doJump: function(){
		var self = this;
		if(self.jump != 0){
			return false;
		}
		self.changeSequence(2);
		self.jump = 1;
		self.accel += 10;
	},
});

var Obstacle = arc.Class.create(arc.display.Shape,{
	pos: 0,
	course: 0,
	enable: true,

	initialize: function($super,params){
		$super();
		var self = this;
		self.beginFill(0xaaaaaa,1.0);
		self.drawCircle(10,10,10);
		self.endFill();


		self.pos = params.pos;
		self.course = params.course;
		self._x = COURSE_LENGTH - self.pos + COURSE_X;
		self._y = self.course * COURSE_H + COURSE_Y + COURSE_H;
	},
	
	hitCheck: function(pos){
		var self = this;
		var w = 16;
		var st = pos - w;
		var ed = pos + w;
		if(!self.enable){
			return false;
		}
		if(ed < self.pos || st > self.pos){
			return false;
		}
		// HIT!!
		self.enable = false;
		return true;
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
	racer.doJump();
});

document.querySelectorAll("#canvas")[0].addEventListener('click', function(e){
	var index = 0;
	var game = arc._system._game;
	var racer = game.racer[index];
	switch(game.phase){
		case "RACE":
			racer.doJump();  	
		break;
		case "END":
			window.location = "room.html";
		break;
	}
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

