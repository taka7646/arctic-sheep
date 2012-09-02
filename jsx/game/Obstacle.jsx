import "js.jsx";
import "js/web.jsx";
import "../lib/*.jsx";
import "Game.jsx";

class Obstacle extends Drawable{
	var racePos: number;
	var course: number;
	var enable = true;
	
	function constructor(course: number, pos: number){
		super();
		this.racePos = pos;
		this.course = course;
	}

	override function update(elapsedTime:number):void{
		Game.calcPosition(this.racePos, this.course, this.pos);
	}

	override function drawCore(ctx: CanvasRenderingContext2D): void{
		ctx.beginPath();
		ctx.fillStyle = 'rgb(170, 170 , 170)';
		ctx.arc(10,10,10, 0, 360, false);
		ctx.fill();
		
	}
	
	function hitCheck(pos:number):boolean{
		var w = 16;
		var st = pos - w;
		var ed = pos + w;
		if(!this.enable){
			return false;
		}
		if(ed < this.racePos || st > this.racePos){
			return false;
		}
		// HIT!!
		this.enable = false;
		return true;
		
	}
}
