
class Vector2{
	var x = 0;
	var y = 0;
	
	function constructor() {
	}
	function constructor(src: Vector2) {
		this.x = src.x;
		this.y = src.y;
	}
	function constructor(x:number, y:number) {
		this.x = x;
		this.y = y;
	}

	function add(x:number, y:number):Vector2{
		this.x += x;
		this.y += y;
		return this;
	}

	function add(pos: Vector2): Vector2{
		return this.add(pos.x, pos.y);
	}
	
	function linear(target: Vector2, rate: number): Vector2{
		var x = this.x + (target.x - this.x) * rate;
		var y = this.y + (target.y - this.y) * rate;
		return new Vector2(x, y);
	}
}
