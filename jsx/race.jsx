import "js.jsx";
import "js/web.jsx";
import "lib/*.jsx";
import "game/*.jsx";


class _Main {
	static var stage: Stage;
	static function main(args : string[]) : void {
		var game = new Game("canvas");
		js.global["stage"] = game;
		var images = js.global["images"] as Array.<Map.<string>>;
		game.loadImage(images);
		var params = js.global["params"] as Map.<variant>;
		game.initialize();

	}
}


