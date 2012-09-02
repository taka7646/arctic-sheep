/** アイテムマスタデータ */
var items = {
	1:{
		id: 1,
		type: 1,
		name: "りんご",
		price: 100,
		image: "img/item/apple.png",
		discription: "まっかなりんご。けっこうおなかがふくれます",
	},
};

/** キャラクタパラメータ */
var charParams = {
	1:{
		id: 1,
		name: "ひつじ",
		life: 100,
		speed: 100,
		maxSpeed: 5,
		stamina: 180,
		luck: 100,
		prize: 1000,
		width: 76,
		_dataName: "sheepData",
	},
	2:{
		id: 2,
		name: "うし",
		life: 100,
		speed: 80,
		maxSpeed: 4,
		stamina: 120,
		luck: 80,
		prize: 1000,
		width: 60,
		_dataName: "cowData",
	},
	3:{
		id: 3,
		name: "うさぎ",
		life: 90,
		speed: 120,
		maxSpeed: 5.5,
		stamina: 120,
		luck: 90,
		prize: 1000,
		width: 64,
		_dataName: "rabbitData",
	},
};

var sheepSequence = {
	id: 1,
   	images: ['img/hituji_1s.png', 'img/hituji_2s.png'],
   	sequenceList: [
   			[
   				{wait:250, items:[{image: 0, x:-88,y:-106}]},
   			],
   			[	// 走るアニメ
   				{wait:250, items:[{image: 0, x:-88,y:-106}]},
   				{wait:250, items:[{image: 1, x:-88,y:-106}]},
   			],
   			[
   				{wait:250, items:[{image: 0, x:-88,y:-106,r:Math.PI/6}]},
   				{wait:250, items:[{image: 0, x:-88,y:-106,r:-Math.PI/8}]},
   			],
   		],
};
var cowSequence = {
	id: 2,
   	images: ['img/ushi_1s.png', 'img/ushi_2s.png'],
   	sequenceList: [
   			[
   				{wait:250, items:[{image: 0, x:-88,y:-106}]},
   			],
   			[	// 走るアニメ
   				{wait:250, items:[{image: 0, x:-88,y:-106}]},
   				{wait:250, items:[{image: 1, x:-88,y:-106}]},
   			],
   			[
   				{wait:250, items:[{image: 0, x:-88,y:-106,r:Math.PI/6}]},
   				{wait:250, items:[{image: 0, x:-88,y:-106,r:-Math.PI/8}]},
   			],
   		],
};
var rabbitSequence = {
	id: 3,
   	images: ['img/usagi_1s.png', 'img/usagi_2s.png'],
   	sequenceList: [
   			[
   				{wait:250, items:[{image: 0, x:-60,y:-70}]},
   			],
   			[	// 走るアニメ
   				{wait:250, items:[{image: 0, x:-60,y:-70}]},
   				{wait:250, items:[{image: 1, x:-60,y:-48}]},
   			],
   			[
   				{wait:250, items:[{image: 0, x:-60,y:-70,r:Math.PI/6}]},
   				{wait:250, items:[{image: 0, x:-60,y:-70,r:-Math.PI/8}]},
   			],
   		],
};

var charUtil = {
	saveKey: "character",
	createParam: function createParam(id){
		var base = charParams[id];
		var param = {
			exp: 0,
			money: 0,
			level: 1,
		};
		
		for(name in base){
			if(name.indexOf("_") == 0){
				continue;
			}
			param[name] = base[name];
		}
		return param;
	},
	
	save: function save(key, data){
		var s = JSON.stringify(data);
		localStorage.setItem(key, s);
		//console.log(s);
	},
	
	load: function load(key){
		var s = localStorage.getItem(key);
		//console.log(s);
		return JSON.parse(s);
	},
	
	saveChar: function saveChar(data){
		var key = this.saveKey + "00";
		this.save(key, data);
	},
	loadChar: function loadChar(){
		var key = this.saveKey + "00";
		var o = this.load(key);
		if(!o){
			o = this.createParam(1);
			this.saveChar(o);
		}
		return o;
	},
};
