import './style.scss';

class Phrase {
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

class Player {
	constructor() {
		this.currentWord = 0;
		this.element = null;
	}

	advanceWord() {
		this.currentWord++;
	}
}

let model = {
	text: ['This is a test phrase for testing.'],
	phrase: null,
	started: false,
	players: [new Player(), new Player()]
}

let controller = {
	init() {
		let randomPhrase = model.text[Math.floor(Math.random() * model.text.length)]
		model.phrase = new Phrase(randomPhrase)

		view.init();
		inputView.init();
		trackView.init();
	},

	getArrayOfWords() {
		return model.phrase.words;
	},

	getPointer() {
		return model.phrase.pointer;
	},

	checkInput(value) {
		if (value) 
			return (value === model.phrase.currentWord.substring(0, value.length))
	},

	movePointer(value) {
		if (value === model.phrase.currentWord) {
			model.phrase.nextWord()
			view.render();
			inputView.render(true)
			trackView.render();
		}

	},

	getPlayers() {
		return model.players;
	}
}

let trackView = {
	init() {
		this.raceTrackElem = document.getElementById('race-track');
		this.playerElem = document.getElementsByClassName('player')[0];

		this.players = controller.getPlayers()

		this.players.forEach(player => {
			let lane = document.createElement('div')
			lane.classList.add('lane');
			let p = document.createElement('div')
			p.classList.add('player');
			p.style.backgroundColor = 'rgb(' + 
				Math.floor(Math.random() * 255) + ',' +
				Math.floor(Math.random() * 255) + ',' +
				Math.floor(Math.random() * 255) + ')';

			let track = document.createElement('div')
			track.classList.add('track');
			
			lane.appendChild(p)
			lane.appendChild(track);

			player.element = p;

			this.raceTrackElem.appendChild(lane);
		})

		this.render();
	},

	render() {

		const pointer = controller.getPointer();
		const wordCount = controller.getArrayOfWords().length;
		this.playerElem.style.left =  pointer / wordCount * 100 + '%';

		this.players.forEach(player => {
			player.element.style.left = player.currentWord / wordCount * 100 + '%'
		})

	}
}

let inputView = {
	init() {

		this.inputElem = document.getElementById('input');
		this.inputElem.addEventListener('input', (e) => {
			controller.movePointer(e.target.value);
			controller.checkInput(e.target.value);
			this.render();
		});
		
		this.render();

	},

	render(clear = false) {

		if (clear) this.inputElem.value = '';

		if(this.inputElem.value !== '') {
			if(controller.checkInput(this.inputElem.value)) {
				this.inputElem.style.color = 'green';
				this.inputElem.style.backgroundColor = 'transparent';

			} else {
				this.inputElem.style.color = 'red';
				this.inputElem.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
			}
		} else {
			this.inputElem.style.color = 'black';
			this.inputElem.style.backgroundColor = 'transparent';
			

		}


	}
}

let view = {
	init() {
		this.textElem = document.getElementById('text');

		this.render();
	},

	render() {
		// clear view
		this.textElem.innerHTML = '';
		
		let words = controller.getArrayOfWords()
		words.forEach((word, i) => {
			let span = document.createElement('span');
			span.innerHTML = word + ' ';
			span.classList.remove('current');
			if(i === controller.getPointer()) span.classList.add('current')
			this.textElem.appendChild(span)
		});
		if(controller.getPointer() === controller.getArrayOfWords().length) {
			this.textElem.style.color = 'green';
		}

	}
}

controller.init();
