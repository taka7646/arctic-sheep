import "js.jsx";
import "js/web.jsx";
import "../lib/*.jsx";
import "Game.jsx";

class Course extends Shape{
	var x = 0;
	var y = 0;
	
	function constructor(renderFunc: function(ctx: CanvasRenderingContext2D, self:Shape):void) {
		super(renderFunc);
	}
	
	override function update(elapsedTime: number): void{
		var game = js.global["stage"] as Game;
		super.update(elapsedTime);

		var p0 = game.racers[0];
		var p1 = game.racers[1];
		var diff = p0.pos.x - p1.pos.x;
		var pos = 0;
		if(diff < 0){
			var adiff = Math.abs(diff);
			if(adiff < Const.SCREEN_W*0.8){
				pos = p0.pos.x + adiff/2;
			}else{
				pos = p0.pos.x + Const.SCREEN_W * 0.4;
			}
		}else if(diff > 0){
			pos = p0.pos.x - Const.SCREEN_W * 0.25;
		}else{
			pos = p0.pos.x;
		}
		pos = p0.pos.x - Const.SCREEN_W * 0.25;
		pos = -pos + Const.SCREEN_W / 2;
		this.pos.x = pos;
//		var s = "scroll:"+stage._x + "," + stage._y+"\n";
//		s += "diff:" + diff + "\n";
//		s += "speed:" + game.racer[0].speed + "," + game.racer[1].speed + "\n";
//		s += "stamina:" + game.racer[0].stamina + "," + game.racer[1].stamina + "\n";
//		self.setText(s);
	}
}
