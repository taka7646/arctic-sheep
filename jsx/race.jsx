import "js/web.jsx";
import "lib/*.jsx";


class _Main {
	static var images:Array.<Map.<string>> = [
		{key: "usagi1", url: "img/usagi_1s.png"},
		{key: "usagi2", url: "img/usagi_2s.png"}
	];
	static function main(args : string[]) : void {
		var func = function():void{
			log "all images loaded";
		};
		var imageLoader = new ImageLoader(func);
		imageLoader.add(_Main.images);
	}
}
