// искусственный интеллект
'use strict';

class Ai {

	constructor() {}

	getStep(freeBlocks) {

		return (!freeBlocks) ? this.getFirstStep() : this.getAiStep(freeBlocks);

	}

	getFirstStep() {

		let arr = [0,1,2,3,4,5,6,7,8];

		return arr[Math.floor(Math.random()*(arr.length))];

	}

	getAiStep(freeBlocks) {

		return freeBlocks[Math.floor(Math.random()*(freeBlocks.length))];

	}

}

module.exports = Ai;