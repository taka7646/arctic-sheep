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
		stamina: 80,
		luck: 100,
		prize: 1000,
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
	},
	3:{
		id: 3,
		name: "うさぎ",
		life: 90,
		speed: 120,
		maxSpeed: 5.5,
		stamina: 70,
		luck: 90,
		prize: 1000,
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
   				{wait:250, items:[{image: 0, x:-60,y:-76}]},
   			],
   			[	// 走るアニメ
   				{wait:250, items:[{image: 0, x:-60,y:-84}]},
   				{wait:250, items:[{image: 1, x:-60,y:-76}]},
   			],
   			[
   				{wait:500, items:[{image: 0, x:-60,y:-76,r:Math.PI/6}]},
   				{wait:500, items:[{image: 0, x:-60,y:-76,r:-Math.PI/8}]},
   			],
   		],
};


