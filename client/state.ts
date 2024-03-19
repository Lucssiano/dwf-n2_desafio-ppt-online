type Hand = 'rock' | 'paper' | 'scissors';
type Player = 'user' | 'computer';
// type Game = {
// 	computer: Hand;
// 	user: Hand;
// };

export const state = {
	data: {
		currentRoom: {
			ownerName: '' /* O ownerID y de ahi saco el nombre */,
			opponentName: '',
			roomId: '',
		},
		// currentGame: {
		// 	computer: '',
		// 	user: '',
		// },
		// currentGameCounter: {
		// 	computer: 0,
		// 	user: 0,
		// 	winner: '',
		// },
		// gameWins: {
		// 	computer: 0,
		// 	user: 0,
		// },
	},
	listeners: [],
	// init() {
	// const savedState = localStorage.getItem('state');
	// if (savedState) this.setState(JSON.parse(savedState));
	// },
	/* Metodo para sacar reiniciar el tablero cuando es necesario*/
	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
	},
	getState() {
		return this.data;
	},
	setState(newState) {
		this.data = newState;
		this.listeners.forEach((callback) => callback());
		console.log('nueva data', this.data);
		localStorage.setItem('state', JSON.stringify(newState));
	},
	setPlay(hand: Hand, player: Player) {
		const currentState = this.getState();
		currentState.currentGame[player] = hand;
		this.setState(currentState);
	},
	resetScoreboard() {
		localStorage.removeItem('state');
		const currentState = this.getState();
		currentState.gameWins.computer = 0;
		currentState.gameWins.user = 0;
		this.setState(currentState);
	},
	addWin(player: Player) {
		const currentState = this.getState();
		currentState.gameWins[player]++;
		currentState.currentGameCounter.winner = player;
		this.setState(currentState);
	},
	resetGameCounter() {
		const currentState = this.getState();
		currentState.currentGameCounter.user = 0;
		currentState.currentGameCounter.computer = 0;
		currentState.currentGameCounter.winner = '';
		this.setState(currentState);
	},
	setPlayWinner() {
		const currentState = this.getState();
		const userPlay = currentState.currentGame.user;
		const computerPlay = currentState.currentGame.computer;

		if (userPlay == computerPlay) return;

		const userWinsCond1 = userPlay === 'scissors' && computerPlay === 'paper';
		const userWinsCond2 = userPlay === 'paper' && computerPlay === 'rock';
		const userWinsCond3 = userPlay === 'rock' && computerPlay === 'scissors';

		const userWins = userWinsCond1 || userWinsCond2 || userWinsCond3;

		if (userWins) currentState.currentGameCounter.user++;
		else currentState.currentGameCounter.computer++;

		this.setState(currentState);
	},
};
