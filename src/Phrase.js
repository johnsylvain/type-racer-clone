export default class Phrase {
	constructor(text) {
		this.text = text;

		this.pointer = 0;

		this.words = this.text.split(/\b(?![\s(.|;|:|,)])/)
		this.currentWord = this.words[this.pointer]
	}

	nextWord() {
		this.pointer++;
		this.currentWord = this.words[this.pointer];
	}
}