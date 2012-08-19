import "js.jsx";
import "js/web.jsx";
import "../lib/*.jsx";
import "Course.jsx";
import "Racer.jsx";
import "Obstacle.jsx";

class Game extends Stage{
	var stage: Stage;
	var racers: Array.<Racer>;
	var obstacles: Array.<Array.<Obstacle>>;

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


		var sheepData = js.global["sheepData"] as Map.<Array.<Sequence>>;
		var s = new Racer(0, sheepData);
		s.changeSequence("run");
		course.addChild(s);
		this.racers.push(s);

		var rabbitData = js.global["rabbitData"] as Map.<Array.<Sequence>>;
		s = new Racer(1, rabbitData);
		s.changeSequence("run");
		course.addChild(s);
		this.racers.push(s);

		
	}
	
	static function calcPosition(coursePos: number, course: number, pos:Vector2):void{
		pos.x = Const.COURSE_LENGTH - coursePos + Const.COURSE_X;
		pos.y = course * Const.COURSE_H + Const.COURSE_Y + Const.COURSE_H;
	}
}

class Const{
	static var COURSE_X = 200;
	static var COURSE_Y = 30;
	static var COURSE_H = 120;
	static var COURSE_LENGTH = 1500;
	static var SCREEN_W = 320;
}
