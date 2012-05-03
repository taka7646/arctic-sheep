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
		stamina: 100,
		luck: 100,
		prize: 1000,
	},
	2:{
		id: 2,
		name: "うし",
		life: 100,
		speed: 80,
		stamina: 120,
		luck: 80,
		prize: 1000,
	},
	3:{
		id: 3,
		name: "うさぎ",
		life: 100,
		speed: 130,
		stamina: 50,
		luck: 90,
		prize: 1000,
	},
};

var sheepSequence = {
   	images: ['img/hituji_1s.png', 'img/hituji_2s.png'],
   	sequenceList: [
   			[	// 走るアニメ
   				{wait:250, items:[{image: 0, x:0,y:0}]},
   				{wait:250, items:[{image: 1, x:0,y:0}]},
   			],
   		],
};
var cowSequence = {
   	images: ['img/ushi_1s.png', 'img/ushi_2s.png'],
   	sequenceList: [
   			[	// 走るアニメ
   				{wait:250, items:[{image: 0, x:0,y:0}]},
   				{wait:250, items:[{image: 1, x:0,y:0}]},
   			],
   		],
};
var rabbitSequence = {
   	images: ['img/usagi_1s.png', 'img/usagi_2s.png'],
   	sequenceList: [
   			[	// 走るアニメ
   				{wait:250, items:[{image: 0, x:0,y:-8}]},
   				{wait:250, items:[{image: 1, x:0,y:0}]},
   			],
   		],
};


