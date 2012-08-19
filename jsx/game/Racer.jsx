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

	function constructor(course:number, sequenceData: Map.<Array.<Sequence>>){
		super(sequenceData);
		this.racePos = 0;
		this.course = course;
	}

	override function update(elapsedTime: number): void{
		var game = js.global["stage"] as Game;
		Game.calcPosition(this.racePos, this.course, this.pos);
		super.update(elapsedTime);
	}
	
	function doJump():boolean{
		if(this.jump != 0){
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
