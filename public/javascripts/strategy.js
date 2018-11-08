'use strict';

export default class gameStrategy {

	constructor() {

		this.winCombs = [ // победные комбинации
			[0,1,2], // горизонт 
			[3,4,5], // горизонт
			[6,7,8], // горизонт
			[0,3,6], // вертикаль
			[1,4,7], // вертикаль
			[2,5,8], // вертикаль
			[0,4,8], // диагональ  
			[2,4,6]  // диагональ
		];
		this.win = {};
		this.selectedBlocks = {
			user: [],
			comp: []
		};
		this.count = 0;
		this.blockAmount = 9;

	}

	firstStep(gamesList) { // определяем первый ход

		let firstStep = '';

		if (!gamesList.length) {

			firstStep = 'user';

		} else {

			// let lastGame = gamesList[gamesList.length - 1]; // без сортировки данных из базы

			let lastGame = gamesList[0]; // с сортировкой

			if (lastGame.winner === 'none') {

				firstStep = (lastGame.firstStep === 'comp') ? 'user' : 'comp';

			} else firstStep = lastGame.winner;

		}

		return firstStep;

	} 

	checkWin(owner, callback) {

		let sum = this.selectedBlocks.user.length + this.selectedBlocks.comp.length;
		let result = [];

		if (sum === this.blockAmount) {

			result.push(this.winCombs.filter(

				comb => comb.filter(c => this.selectedBlocks[owner].includes(c)).length === comb.length

			));

			if (result[0][0] && result[0][0].length !== 0) {

				this.win.winner = owner;
				this.win.winCombs = result[0][0];

			} else this.win.winner = 'none';

		} else {

			result.push(this.winCombs.filter(

				comb => comb.filter(c => this.selectedBlocks[owner].includes(c)).length === comb.length

			));

			if (result[0][0] && result[0][0].length !== 0) {

				this.win.winner = owner;
				this.win.winCombs = result[0][0];

			}

		}

		callback(this.win);

	}

	clearGame() {

		for (let key in this.selectedBlocks) {

			this.selectedBlocks[key] = [];

		}

		this.win.winner = false;

	}

	pushInSelectedBlocks(owner, target) {

		this.selectedBlocks[owner].push(+target.dataset.id);

	}

	// getArray(array, element) {

	// 	if (array[this.count].length === 3) {

 //            array.push([]);

 //            this.count++;

 //        }

 //        array[this.count].push(element);

	// }

}