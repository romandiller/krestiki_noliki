'use strict';
export default class gameService {

	constructor() {

		this.header = document.getElementById('gameHeader');
		this.startButton = document.getElementById('startButton');
		this.gameConteiner = document.getElementById('conteiner');

		// крестик
		this.user = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.971 47.971"><g><path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z" fill="#D80027"/></g></svg>';
		// нолик
		this.comp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380.734 380.734"><g><path d="M190.367,0C85.23,0,0,85.23,0,190.367s85.23,190.367,190.367,190.367s190.367-85.23,190.367-190.367   S295.504,0,190.367,0z M299.002,298.36c-28.996,28.996-67.57,44.959-108.634,44.959S110.723,327.35,81.733,298.36   c-28.865-28.876-44.769-67.227-44.769-107.993c0-40.771,15.904-79.128,44.769-107.993c28.99-28.996,67.57-44.959,108.634-44.959   c41.054,0,79.639,15.969,108.629,44.959c28.871,28.865,44.763,67.221,44.763,107.993   C343.765,231.133,327.867,269.489,299.002,298.36z" fill="#D80027"/></g></svg>';

	}

	changeHeader(text) { // смена загловка

		this.header.innerHTML = text;

	}

	blockButton(action) { // блокировка кнопки после начала игры

		if (action) {

			this.startButton.setAttribute('disabled', true);
			this.startButton.innerHTML = 'Идет игра';

		} else {

			this.startButton.removeAttribute('disabled');
			this.startButton.innerHTML = 'Начать новую игру';

		}

	}

	blockConteiner(action) { // блокировка клеток, если игра не началась

		(action)

			? this.gameConteiner.classList.add('game')
			: this.gameConteiner.classList.remove('game')

	}

	clearBlocks() { // чистим блоки

		this.blocks = document.querySelectorAll('.block');

		for (let i = 0; i < this.blocks.length; i++) {

			this.blocks[i].innerHTML = '';
			this.blocks[i].setAttribute('data-selected', false);
			this.blocks[i].setAttribute('data-owner', 'empty');

		}

	}

	getCongratulation(winner, message) { // поздравление с победой

		this.congratulation = document.getElementById('congratulation');

		this.congratulation.setAttribute('data-view', true);

		let [header, block] = [this.congratulation.querySelector('h2'), this.congratulation.querySelector('div')];
		
		header.innerHTML = message;
		block.innerHTML = `<img src="/images/${winner}.jpg" alt="Победитель" />`;

	}

	closeCongratulation() {

		this.congratulation.setAttribute('data-view', false);

	}

	selectBlock(owner, target) { // выделяем блок, на который сделан шаг

		target.setAttribute('data-selected', true);
		target.setAttribute('data-owner', owner);
		target.innerHTML = this[owner];

	}

	getFreeBlocks() {

		let blocks = document.querySelectorAll('.block');

		let freeBlocks = [];

		for (let i = 0; i < blocks.length; i++) {

			if (blocks[i].dataset.selected === 'false') freeBlocks.push(blocks[i].dataset.id);

		}

		return freeBlocks;
	}

	getBlockForAi(num) {

		let blocks = document.querySelectorAll('.block');

		for (let i = 0; i < blocks.length; i++) {

			if (+blocks[i].dataset.id === num) return blocks[i]; 

		}

	}

}