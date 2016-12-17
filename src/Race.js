import io from 'socket.io-client';
import request from 'superagent';

import './style.scss';
import Phrase from './Phrase';
import Player from './Player';

class Race {
	constructor() {
		this.socket = io();

		this.phrase = null;
		this.started = false;
		this.players = [];
		this.playersMap = {};

		this.textElem = document.getElementById('text');
		this.inputElem = document.getElementById('input');
		this.raceTrackElem = document.getElementById('race-track')


		this.me = this.players.filter(p => p.id === this.socket.id)[0];

		this.players.forEach(player => {
			this.drawPlayer(player)
		})

		this.setUpEvents();
		this.setUpSockets();

		request
			.get('http://localhost:3000/api/phrase')
			.end((err, data) => {
				this.phrase = new Phrase(data.body.data)
				this.drawPhrase();
			})
	}

	setUpEvents() {
		this.inputElem.addEventListener('input', e => {
			this.checkInput(e.target.value);
		})
	}

	setUpSockets() {
		this.socket.on('player join', data => {
			this.players = data.users;
			this.playersMap = this.players.reduce((obj, player) => {
				obj[player.id] = player
				return obj;
			}, {});
			this.raceTrackElem.innerHTML = '';
			data.users.forEach(user => {
				this.drawPlayer(user)
			})
		});

		this.socket.on('player disconnect', data => {
			this.removePlayer(data);
		})

		this.socket.on('move player', data => {
			this.movePlayer(data);
		});

	}

	drawPhrase() {
		this.textElem.innerHTML = '';

		let { words } = this.phrase
		words.forEach((word, i) => {
			let span = document.createElement('span');
			span.innerHTML = word + ' ';
			span.classList.remove('current');
			if(i === this.phrase.pointer) span.classList.add('current')
			this.textElem.appendChild(span)
		});
	}

	drawPlayer(data){

		let { id, colorString, pointer } = data
		let player = new Player(id, colorString);

		let lane = document.createElement('div')
		lane.classList.add('lane');
		lane.id = id;
		let p = document.createElement('div')
		p.classList.add('player');
		p.style.backgroundColor = player.colorString;


		let track = document.createElement('div')
		track.classList.add('track');

		if(id === this.socket.id) {
			track.style.borderColor = '#777';
		}

		p.style.left = pointer / this.phrase.words.length * 100 + '%';
		
		lane.appendChild(p)
		lane.appendChild(track);

		player.element = p;

		this.players.push(player);
		this.raceTrackElem.appendChild(lane);
	}

	removePlayer(data) {
		let player = this.players.filter(p => p.id === data.id)[0]
		
		let target = document.getElementById(player.id);
		this.raceTrackElem.removeChild(target);
		this.players.splice(this.players.indexOf(player), 1);
		delete this.playersMap[data.id];
	}

	checkInput(value) {
		this.inputElem.style.color = 'black';		
		this.inputElem.style.backgroundColor = 'transparent';
		
		if (value !== '') {
			if (value === this.phrase.currentWord.substring(0, value.length)) {
				this.inputElem.style.color = 'green';
				this.inputElem.style.backgroundColor = 'transparent'
			} else {
				this.inputElem.style.color = 'red';
				this.inputElem.style.backgroundColor = 'rgba(255, 0, 0, 0.3)'
			}
			
		}
		if (value === this.phrase.currentWord) {
			this.phrase.nextWord();
			this.inputElem.value = '';
			let response = { 
				user: this.socket.id,
				pointer: this.phrase.pointer
			}

			this.socket.emit('move user', response);
			this.movePlayer(response);
		}
	}

	movePlayer(data) {

		this.drawPhrase();
		let target = this.playersMap[data.user].id;
		let el = document.getElementById(target).childNodes[0];
		el.style.left = data.pointer / this.phrase.words.length * 100 + '%';
	}

}

window.onload = () => new Race();