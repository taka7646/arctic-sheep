import "js/web.jsx";
import "Drawable.jsx";

class Shape extends Drawable{
	var renderFunc: function(ctx: CanvasRenderingContext2D, self:Shape):void;

	function constructor(renderFunc: function(ctx: CanvasRenderingContext2D, self:Shape):void) {
		super();
		this.renderFunc = renderFunc;
	}

	override function drawCore(ctx: CanvasRenderingContext2D): void{
		if(this.renderFunc == null){
			return;
		}
		
		this.renderFunc(ctx, this);
	}
}

native class PartsRect{
	var x: number;
	var y: number;
	var u: number;
	var v: number;
	var w: number;
	var h: number;
}
