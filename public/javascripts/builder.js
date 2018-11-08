'use strict';

export default class Builder {

	constructor() {

		this.section = document.getElementById('gameZone');
		this.conteiner = document.getElementById('conteiner');
		this.historyZone = document.getElementById('historyZone');

	}

	init() {

		this.gameZone();
		this.congratulationZone();

	}

	gameZone() {

		for (let i = 0; i < 9; i++) {
			
			let sp = document.createElement('span');

			sp.classList.add('block');
			sp.setAttribute('data-id', i);
			sp.setAttribute('data-owner', 'empty');
			sp.setAttribute('data-selected', false);
			sp.setAttribute('data-action', 'gameLoop');
			
			this.conteiner.appendChild(sp);
		
		}

	}

	congratulationZone() {

		let block = document.createElement('div');
		block.id = 'congratulation';

		block.setAttribute('data-view', false);
		block.innerHTML = `<button data-action="finishGame">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.971 47.971"><g><path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z" fill="#D80027"/></g></svg>\
							</button>
							<h2></h2>
							<div></div>`;

		document.body.appendChild(block);

	}

	createHistoryZone(gamesList) {

		let [header, list] = [this.historyZone.querySelector('.header'),this.historyZone.querySelector('.list')];

		list.innerHTML = '';

		if (!gamesList.length) {

			header.innerHTML = 'История игр пуста, начинайте заново!';

		} else {

			header.innerHTML = 'Список последних игр';

			[].forEach.call(gamesList, (item) => {

				let li = document.createElement('li');
				li.classList.add('item');

				let winner = (item.winner === 'none') ? 'Ничья' : item.winner;

				let actions = JSON.parse('[' + item.actions + ']');

				let act_str = '';

				actions.forEach((item) => {

					act_str += `<li><p class="owner"><span>Игрок:</span> ${item.owner}</p><p class="block"><span>Блок:</span> ${item.block}</p></li>`;

				});

				let winCombs = (item.winCombs) ? `<p class="winCombs"><span>Победная комбинация:</span> ${item.winCombs}</p>` : ``;

				li.innerHTML = `<div class="historyItem">
									<p class="gameCount">Игра# ${item.id}</p>
									<p class="gameWinner"><span>Победитель:</span> ${winner}</p>
									<p class="firstStep"><span>Первый ход:</span> ${item.firstStep}</p>
									${winCombs}
									<p class="title"><span>История ходов:</span></p>
									<ul class="actions">${act_str}</ul>
								</div>`;
				
				list.appendChild(li);				

			});

		}

	}

}