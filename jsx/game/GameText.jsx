import "js.jsx";
import "js/web.jsx";
import "../lib/*.jsx";
import "Game.jsx";

class GameText extends Drawable{
	var text: string;
	var font: string;
	var family = "sans-serif";
	var size: number;
	var color: string;
	var isVisible = true;
	var isBold = true;

	function constructor() {
		super();
	}
	
	function setText(text:string, size:number, color:string):void{
		this.setText(text, size, color, this.family);
	}

	function setText(text:string, size:number, color:string, fontFamily:string):void{
		this.text = text;
		this.size = size;
		this.family = fontFamily;
		this.color = color;
		this.font = (this.size as string) + "px " + this.family;
	}
	
	function show():void{
		this.isVisible = true;
	}
	function hide():void{
		this.isVisible = false;
	}

	override function drawCore(ctx: CanvasRenderingContext2D):void{
		if(!this.isVisible){
			return;
		}
		var font = this.isBold? "bold "+this.font: this.font;
		ctx.fillStyle = this.color;
		ctx.font = this.font;
		ctx.textBaseline = 'top';
		ctx.textAlign = "center";
		ctx.fillText(this.text, 0, 0);
	}
}
