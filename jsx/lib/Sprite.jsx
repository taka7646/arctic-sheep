import "js.jsx";
import "js/web.jsx";
import "Stage.jsx";
import "Drawable.jsx";

class Sprite extends Drawable{
	var rects: Array.<PartsRect>;

	function constructor() {
		super();
	}

	override function drawCore(ctx: CanvasRenderingContext2D): void{
		if(this.rects == null){
			return;
		}
		var stage = js.global["stage"] as Stage;
		for(var i=0; i < this.rects.length;i++){
			var r = this.rects[i];
			var image = stage.getImage(r.image);
			ctx.drawImage(image, r.u, r.v, r.w, r.h, r.x, r.y, r.w, r.h);
		}
	}
}

native class PartsRect{
	var image: string;
	var x: number;
	var y: number;
	var u: number;
	var v: number;
	var w: number;
	var h: number;
	var r: number;
}

native class Sequence{
	var time: number;
	var parts: Array.<PartsRect>;
	var angle: Nullable.<number>;
}




class SequenceAnimationSprite extends Sprite{
	var sequenceData: Map.<Array.<Sequence>>;
	var sequenceName: string;
	var seqIndex: number;
	var seqTime: number;

	function constructor() {
		super();
	}

	function constructor(sequenceData: Map.<Array.<Sequence>>) {
		super();
		this.sequenceData = sequenceData;
	}
	
	function changeSequence(name: string):void{
		this.sequenceName = name;
		this.changeSeqIndex(0);
	}
	
	function changeSeqIndex(index:number):void{
		var seq = this.sequenceData[this.sequenceName];
		if(index >= seq.length){
			index %= seq.length;
		}
		this.seqIndex = index;
		this.seqTime = 0;
		this.rects = seq[index].parts;
		if(seq[index].angle != null){
			this.angle = seq[index].angle;
		}
	}

	override function update(elapsedTime: number):void{
		var seq = this.sequenceData[this.sequenceName];
		if(seq == null){
			return;
		}
		this.seqTime += elapsedTime;
		if(seq[this.seqIndex].time <= this.seqTime){
			this.changeSeqIndex(this.seqIndex+1);
		}
	}
}
