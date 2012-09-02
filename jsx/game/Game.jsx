import "js.jsx";
import "js/web.jsx";
import "../lib/*.jsx";
import "Course.jsx";
import "Racer.jsx";
import "Obstacle.jsx";
import "GameText.jsx";

class Game extends Stage{
	var stage: Stage;
	var racers: Array.<Racer>;
	var obstacles: Array.<Array.<Obstacle>>;
	var phase = "INIT";
	var counter = 0;
	var winner = -1;

	function constructor(id:string){
		super(id);
		this.racers = new Array.<Racer>();
		this.obstacles = new Array.<Array.<Obstacle>>();
		this.obstacles.push(new Array.<Obstacle>());
		this.obstacles.push(new Array.<Obstacle>());
	}
	
	function initialize():void{
		var func = function(ctx: CanvasRenderingContext2D, self:Shape):void{
			var x = Const.COURSE_X-2;
			var y = Const.COURSE_Y-2;
			var w = Const.COURSE_LENGTH;
			var h = Const.COURSE_H*2.5;
			ctx.lineWidth = 4;
			//ctx.strokeStle = 'rgb(' + 0 + ', ' + 0 + ', ' + 0 + ')';
			ctx.beginPath();
			ctx.rect(x, y, w, h);
			ctx.stroke();
			// コースの脇に置く目印
			for(var i=0; i<10;++i){
				x = Const.COURSE_X + i * Const.COURSE_LENGTH / 10;
				y = Const.COURSE_Y - 25;
				ctx.beginPath();
				ctx.fillStyle = 'rgb(128 , 128 , 255)';
				ctx.arc(x+10,y+10,10, 0, 360, false);
				ctx.fill();
			}
		};
		var course = new Course(func);
		this.add(course);

		for(var i=0;i<2;i++){
			for(var j=0;j<3;j++){
				var p = Math.random() * Const.COURSE_LENGTH * 0.8 + Const.COURSE_LENGTH * 0.2;
				var o = new Obstacle(i, p | 0);
				course.addChild(o);
				this.obstacles[i].push(o);
			}
		}

		var rp = js.global["racerParams"] as Array.<CharParam>;
		var param = rp[0];
		var base = Game.getCharParamBase(param.id);
		var sheepData = js.global[base._dataName] as Map.<Array.<Sequence>>;
		var s = new Racer(0, param.id, sheepData);
		s.changeSequence("run");
		course.addChild(s);
		this.racers.push(s);

		var rabbitData = js.global["rabbitData"] as Map.<Array.<Sequence>>;
		s = new Racer(1, 3, rabbitData);
		s.changeSequence("run");
		course.addChild(s);
		this.racers.push(s);
		
		var text = new GameText();
		this.add("text", text);
		text.setText("スタート",40,"#000");
		text.pos.set(160, 100);

		this.changePhase("START");
	}
	
	function changePhase(phase:string):void {
		this.phase = phase;
		this.counter = 0;
	}
	function checkGoal():void{
		var isGoal = false;
		for(var i=this.racers.length-1;i>=0;i--){
			var r = this.racers[i];
			if(r.racePos >= Const.COURSE_LENGTH){
				this.changePhase("GOAL");
				isGoal = true;
				// var m = new arc.display.TextField();
				// m.setAlign(arc.display.Align.CENTER);
				// m.setText("ゴール!!");
				// m.setX(160);
				// m.setY(120);
				// m.setFont("sans-serif", 40, true);
				//this.screen.addChild(m);
			}
		}
		if(isGoal){
			var text = this.get("text") as GameText;
			text.setText("ゴール", 40, "#000");
			text.show();
			var winText = new GameText();
			winText.pos.set(160, 140);
			this.add("winText", winText);
			if(this.racers[0].racePos >= this.racers[1].racePos){
				this.winner = 0;
				winText.setText("かち", 30, "#000");
			}else{
				this.winner = 1;
				winText.setText("まけ", 30, "#000");
			}
		}
		
	}
	override function update(elapsedTime: number): void{
		switch(this.phase){
			case "START":
				this.counter++;
				if(this.counter >= 20){
					this.changePhase("INIT");
				}
			break;
			case "INIT":
				this.changePhase("RACE");
				(this.get("text") as GameText).hide();
			break;
			case "RACE":
				this.checkGoal();
			break;
			case "GOAL":
				this.counter++;
				if(this.counter == 30){
				}
				if(this.counter >= 50){
					this.changePhase("END");
				}
			break;
		}
		super.update(elapsedTime);
	}
	
	override function onClick(e:Event):void{
		var racer = this.racers[0];
		switch(this.phase){
			case "RACE":
				racer.doJump();
				break;
			case "END":
				dom.window.location.assign("room.html");
				break;
		}
		e.preventDefault();
	}
	
	static function calcPosition(coursePos: number, course: number, pos:Vector2):void{
		pos.x = Const.COURSE_LENGTH - coursePos + Const.COURSE_X;
		pos.y = course * Const.COURSE_H + Const.COURSE_Y + Const.COURSE_H;
	}
	
	static function getCharParamBase(id:number):CharParamBase{
		var params = js.global["charParams"] as Map.<CharParamBase>;
		return params[id as string];
	}

	static function getCharParam():CharParam{
		var rp = js.global["racerParams"] as Array.<CharParam>;
		var param = rp[0];
		return param;
	}


}

class Const{
	static var COURSE_X = 200;
	static var COURSE_Y = 30;
	static var COURSE_H = 120;
	static var COURSE_LENGTH = 1500;
	static var SCREEN_W = 320;
}

native class CharParamBase{
	var id: number;
	var name: string;
	var life: number;
	var speed: number;
	var maxSpeed: number;
	var stamina: number;
	var luck: number;
	var prize: number;
	var width: number;
	var _dataName: string;
}

native class CharParam{
	var id: number;
	var name: string;
	var life: number;
	var speed: number;
	var maxSpeed: number;
	var stamina: number;
	var luck: number;
	var prize: number;
	var width: number;
	//
	var level: number;
	var exp: number;
	var money: number;
}

