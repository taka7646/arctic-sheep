import "js/web.jsx";

class ImageLoader{
	var imageMap: Map.<HTMLImageElement>;
	var imageCount: number;
	var loadedCount: number;
	var completeCallback: function():void;
	
	function constructor(callback:function():void) {
		this.imageMap = new Map.<HTMLImageElement>();
		this.imageCount = 0;
		this.loadedCount = 0;
		this.completeCallback = callback;
	}

	function add(images: Array.<Map.<string>>): void{
		var self = this;
		var callBack = function(e:Event):void{
			var image = e.target as HTMLImageElement;
			self.loadedCount++;
			log image.src + " load complete";
			if(self.loadedCount >= self.imageCount){
				self.completeCallback();
			}
		};
		for(var i=0; i < images.length; i++){
			var src = images[i];
			var img = dom.createElement("img") as HTMLImageElement;
			img.addEventListener("load", callBack);
			this.imageCount++;
			this.imageMap[src["key"]] = img;
			img.src = src["url"];
		}
	}
	
	function get(key: string): HTMLImageElement{
		return this.imageMap[key];
	}
}

native class ImageSrc{
	var key: string;
	var url: string;
}