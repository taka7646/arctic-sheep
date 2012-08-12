import "js/web.jsx";
import "Vector2.jsx";

abstract class Drawable{
	var childs = new  Array.<Drawable>();
	var alpha = 1;
	var pos: Vector2;
	var scale: Vector2;
	var angle: number;

	function constructor() {
		this.pos = new Vector2(0,0);
		this.scale = new Vector2(1,1);
		this.angle = 0;
	}

	function updateCore(elapsedTime: number):void{
	}

	function update(elapsedTime: number):void{
		this.updateCore(elapsedTime);
		for(var i=0; i < this.childs.length; i++){
			var c = this.childs[i];
			c.update(elapsedTime);
		}
	}
	
	abstract function drawCore(ctx: CanvasRenderingContext2D): void;

	function draw(ctx: CanvasRenderingContext2D): void{
		var alpha = ctx.globalAlpha;
		ctx.save();
		ctx.globalAlpha *= this.alpha;
		ctx.scale(this.scale.x, this.scale.y);
		ctx.rotate(this.angle);
		ctx.translate(this.pos.x, this.pos.y);
		this.drawCore(ctx);
		for(var i=0; i < this.childs.length; i++){
			var c = this.childs[i];
			c.draw(ctx);
		}
		ctx.restore();
		ctx.globalAlpha = alpha;
	}
}