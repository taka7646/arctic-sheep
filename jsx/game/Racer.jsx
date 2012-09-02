import "js.jsx";
import "js/web.jsx";
import "../lib/*.jsx";
import "Game.jsx";

class Racer extends SequenceAnimationSprite{
	var racePos: number;
	var course: number;
	var id = 0;
	var speed = 0;
	var accel = 0;
	var stamina = 0;
	var jump = 0;
	var jy = 0;
	var damage = 0;
	var ai: EnemyAI;

	function constructor(course:number, id:number, sequenceData: Map.<Array.<Sequence>>){
		super(sequenceData);
		this.id = id;
		this.racePos = 0;
		this.course = course;
		if(this.course == 1){
			this.ai = new EnemyAI(this);
		}
	}

	override function update(elapsedTime: number): void{
		var game = js.global["stage"] as Game;
		var param = Game.getCharParam(this.id);
		switch(game.phase){
			case "INIT":
				this.changeSequence("run");
				this.speed = 0;
				this.stamina = param.stamina;
			break;
			case "RACE":
			case "GOAL":
				this.updateRace(game, param);
			break;
		}
		this.updateJump();
		Game.calcPosition(this.racePos, this.course, this.pos);
		this.pos.x += param.width;
		this.pos.y -= this.jy;
		super.update(elapsedTime);
	}
	function hitCheck(game:Game, param:CharParam):void{
		var obstacles = game.obstacles[this.course];
		if(this.jump > 0){
			return;
		}
		for(var i=obstacles.length-1;i>=0;i--){
			var o = obstacles[i];
			if(o.hitCheck(this.racePos-param.width)){
				// hit
				this.speed = 0;
				this.damage += 20;
				this.stamina += 20;
			}
		}
		
	}
	
	function updateJump():void{
		if(this.jump){
			this.jump++;
			this.jy = Math.sin(this.jump*Math.PI / 30) * 64;
			if(this.jump >= 30){
				this.jump = 0;
				this.angle = 0;
				this.changeSequence("run");
			}
		}
	}
	
	function updateRace(game:Game, param:CharParam):void{
		if(this.ai){
			this.ai.update();
		}
		
		this.hitCheck(game, param);
		if(this.damage > 0){
			this.damage--;
		}else{
			if(this.stamina > 0 || this.speed < 1){
				this.stamina--;
				if(this.speed < param.maxSpeed){
					this.speed += (param.speed+this.accel) / 500;
				}
			}else if(this.speed > 1){
				this.speed = this.speed * (1-0.003);
				this.accel *= 0.9;
			}
			
			this.racePos += this.speed;
		}
	}
	
	function doJump():boolean{
		if(this.jump != 0 || this.damage > 0){
			return false;
		}
		this.changeSequence("jump");
		this.jump = 1;
		this.accel += 10;
		return true;
	}
}

class EnemyAI{
	var owner: Racer;
	var jumpHistory: Array.<number>;
	
	function constructor(owner: Racer){
		this.owner = owner;
		this.jumpHistory = new Array.<number>;
	}
	
	function update():void{
		var game = js.global["stage"] as Game;
		var owner = this.owner;
		var items = game.obstacles[owner.course];
		var racePos = owner.racePos;
		for(var i=items.length-1;i>=0;i--){
			if(this.jumpHistory[i] == 1){
				continue;
			}	
			var o = items[i];
			var diff = o.racePos - racePos;
			if(diff > 5 && diff < 64){
				this.jumpHistory[i] = 1;
				if(Math.random() < 0.5){
					owner.doJump();
				}
			}
		}
		
	}
}
