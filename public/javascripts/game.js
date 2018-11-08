'use strict';
import gameService from './service.js';
import Builder from './builder.js';
import gameStrategy from './strategy.js';
import gameHistory from './history.js';

export default class Game {

	constructor() {

		this.socket = io();
		this.headers = {

			start: 'Начинайте игру!',
			step: {
				user: 'Ваш ход!',
				comp: 'Ходит Комп!'
			},
			win: {
				user: 'УРА! Ты победил!',
				comp: 'Комп победил!',
				none: 'Ничья!'
			},
			table: {
				empty: 'Нет прошлых игр!'
			}

		};		
		this.service = new gameService();
		this.builder = new Builder();
		this.strategy = new gameStrategy();
		this.history = new gameHistory();
		this.game = { // обект игры

			list: [],
			ready: false, // готовность игры
			status: false, // начало игры
			firstStep: false, // первый ход
			busy: false // занято

		};

		this.builder.init(); // строим интерфейс

		this.service.changeHeader(this.headers.start);

		this.socketConnection(); // получаем список прошлых игр и строим таблицу
		this.listener(); // вешаем слушатель

	}

	listener() {

		document.addEventListener('click', (e) => {

			e.preventDefault();

			e = e || window.e;
        	let target = e.target || e.srcElement;

        	while (target !== document) {

        		let action = target.dataset.action;

				if (action) {
				
					(typeof this[action] === 'function') ? this[action](target) : false;

					break;
				
				}
					
        		target = target.parentNode;

        	}

		}, true);

	}

	socketConnection() {

		this.socket.on('connect', () => {

			this.socket.emit('getLastGames');

			this.game.ready = true;

		});

		this.socket.on('lastGamesList', (gamesList) => {

			this.game.list = gamesList;

			this.builder.createHistoryZone(this.game.list);

		});

		this.socket.on('compStep', (blockCount) => {

			let block = this.service.getBlockForAi(+blockCount);

			this.step('comp', block, () => {

				this.service.changeHeader(this.headers.step.user);

			});

		});

	}

	gameLoop(target) {

		if (!this.game.status) return;
		if (this.game.busy) return;
		if (target.getAttribute('data-selected') === 'true') return;

		this.step('user', target, () => {

			this.service.changeHeader(this.headers.step.comp);

			this.socket.emit('compMove', { 

				freeBlocks: this.service.getFreeBlocks()

			});

		});

	}

	startGame(target) {

		if (!this.game.ready) return;
		if (this.game.status) return;

		this.firstStep = this.strategy.firstStep(this.game.list);
		this.service.changeHeader(this.headers.step[this.firstStep]);
		this.history.firstStepInHistory(this.firstStep);

		this.service.blockButton(true);
		this.service.blockConteiner(true);
		this.game.status = true;

		if (this.firstStep === 'comp') {

			this.socket.emit('compMove', { 

				freeBlocks: false 

			});

		}

	}

	finishGame() {

		this.game.ready = false;

		if (!this.game.status) return;

		let history = this.history.getHistory();

		this.socket.emit('insertHistory', history);

		this.service.closeCongratulation(); // закрыли поздравление
		this.service.changeHeader(this.headers.start); // поставили заголовок
		this.service.clearBlocks(); // очистили все блоки
		this.strategy.clearGame(); // очистили selectedBlocks
		this.history.clearHistory(); // очистили историю
		this.service.blockButton(); // разблокировали кнопку
		this.service.blockConteiner(); // разблоикровали gameZone

		this.game.status = false;
		this.game.ready = true;

		this.socket.emit('getLastGames');

	}

	step(owner, target, callback) {

		this.game.busy = true;

		this.service.selectBlock(owner, target);
		this.strategy.pushInSelectedBlocks(owner, target);
		this.history.updateActionsInHistory(owner, target);
		this.strategy.checkWin(owner, (win) => {

			this.game.busy = false;

			if (!win.winner) {

				if (typeof callback === 'function') callback();

			} else {

				this.history.updateWinnerInHistory(win.winner);
				if (win.winCombs) this.history.updateWinCombs(win.winCombs);
				this.service.getCongratulation(win.winner, this.headers.win[win.winner]);

			}
		
		});

	}

}