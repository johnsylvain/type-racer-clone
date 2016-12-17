export default class Player {
	constructor(id, colorString) {
		this.currentWord = 0;
		this.element = null;
		this.id = id;

		this.colorString = colorString
	}

	advanceWord() {
		this.currentWord++;
	}

}