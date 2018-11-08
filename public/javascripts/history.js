'use strict';

export default class gameHistory {

	constructor() {

		this.currentHistory = {

			winner: false,
			winCombs: [],
			firstStep: false,
			actions: []

		};

	}

	getHistory() { // получаем всю историю

		return this.currentHistory;

	}

	firstStepInHistory(firstStep) { // добавляем первый ход

		this.currentHistory.firstStep = firstStep;

	}

	updateActionsInHistory(owner, block) { // добавляем ход

		this.currentHistory.actions.push({

			owner: owner,
			block: `Block #${block.dataset.id}`

		});

	}

	updateWinCombs(combs) {

		[].forEach.call(combs, (item) => {

			this.currentHistory.winCombs.push(`Block#${item}`);

		});

	}

	updateWinnerInHistory(winner) { // добавляем победителя перед отправкой на сервер

		this.currentHistory.winner = winner;

	}

	clearHistory() { // чистим

		this.currentHistory.winner = false;
		this.currentHistory.firstStep = false;
		this.currentHistory.actions = [];
		this.currentHistory.winCombs = [];

	}

	// getTestHistory() {

	// 	let history = [
	// 		{
	// 			id: 1,
	// 			winner: 'user',
	// 			firstStep: 'user',
	// 			actions: []

	// 		},
	// 		{
	// 			id: 2,
	// 			winner: 'user',
	// 			firstStep: 'user',
	// 			actions: []

	// 		},
	// 		{
	// 			id: 3,
	// 			winner: 'none',
	// 			firstStep: 'comp',
	// 			actions: []

	// 		}
	// 	];

	// 	// let history = [];

	// 	return history;

	// }

}