import "js/web.jsx";
import "Drawable.jsx";

class Sprite extends Drawable{
	var rects: Array.<PartsRect>;
	var image: HTMLImageElement;

	function constructor() {
		super();
	}

	override function drawCore(ctx: CanvasRenderingContext2D): void{
		if(this.rects == null || this.image == null){
			return;
		}
		
		for(var i=0; i < this.rects.length;i++){
			var r = this.rects[i];
			ctx.drawImage(this.image, r.u, r.v, r.w, r.h, r.x, r.y, r.w, r.h);
		}
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
