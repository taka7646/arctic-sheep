import "js/web.jsx";
import "lib/*.jsx";


class _Main {
	static var images:Array.<Map.<string>> = [
		{key: "usagi1", url: "img/usagi_1s.png"},
		{key: "usagi2", url: "img/usagi_2s.png"}
	];
	static var stage: Stage;
	static function main(args : string[]) : void {
		var stage = new Stage("canvas");
		stage.loadImage(_Main.images);
		var params = js.global[""] as Map.<Variant>;
	}
}
