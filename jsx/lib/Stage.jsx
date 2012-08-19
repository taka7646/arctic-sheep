import "js/web.jsx";
import "Drawable.jsx";
import "ImageLoader.jsx";

class Stage{
	var canvas: HTMLCanvasElement;
	var drawItems: Array.<Drawable>;
	var itemMap: Map.<Drawable>;
	var imageLoader: ImageLoader;
	var prevTime: number;
	var nowTime: number;
	var fps = 30;
	var width: number;
	var height: number;
	var enterFrame: function():void;

	function constructor() {
		this.drawItems = new Array.<Drawable>();
		this.itemMap = new Map.<Drawable>();
	}

	function constructor(id:string) {
		this.canvas = dom.id(id) as HTMLCanvasElement;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.drawItems = new Array.<Drawable>();
		this.itemMap = new Map.<Drawable>();
		var self = this;
		this.enterFrame = function():void{
			self.prevTime = self.nowTime;
			self.nowTime = Date.now();
			var elapsedTime = self.nowTime - self.prevTime;
			self.update(elapsedTime);
			self.draw();
			dom.window.setTimeout(self.enterFrame, self.fps/1000);
		};
	}
	
	function start(): void{
		log "start main loop.";
		dom.window.setTimeout(this.enterFrame, this.fps/1000);
	}
	
	function loadImage(images: Array.<Map.<string>>): void{
		var self = this;
		var callBack = function():void{
			log "image load complete.";
			self.start();
		};
		this.imageLoader = new ImageLoader(callBack);
		this.imageLoader.add(images);
	}
	
	function update(elapsedTime: number): void{
		for(var i=0; i < this.drawItems.length; i++){
			var o = this.drawItems[i];
			o.update(elapsedTime);
		}
	}
	
	function draw(): void{
		var ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
		ctx.clearRect(0,0,this.width, this.height);
		for(var i=0; i < this.drawItems.length; i++){
			var o = this.drawItems[i];
			o.draw(ctx);
		}
	}
	
	function add(drawItem: Drawable): void{
		this.drawItems.push(drawItem);
	}
	function add(name: string, drawItem: Drawable): void{
		this.add(drawItem);
		this.itemMap[name] = drawItem;
	}
	function get(name: string):Drawable{
		return this.itemMap[name];
	}
	function getImage(key: string): HTMLImageElement{
		return this.imageLoader.get(key);
	}
}
