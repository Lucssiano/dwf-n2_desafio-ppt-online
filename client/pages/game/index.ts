import { state } from '../../state';

class GamePage extends HTMLElement {
	shadow: ShadowRoot;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadow.innerHTML = `
		<div class="game-container">
			<div class="hands-game-container computer-hands rotate">
				<custom-hand type="rock" class="computer-hand"></custom-hand>
				<custom-hand type="paper" class="computer-hand"></custom-hand>
				<custom-hand type="scissors" class="computer-hand"></custom-hand>
			</div>
			<div class="middle-game-section">
				<players-scoreboard></players-scoreboard>
				<div class="timer-container">
					<div class="loader"></div>
					<div class="timer__counter"></div>
				</div>
			</div>
			<div class="hands-game-container user-hands">
				<custom-hand type="rock" class="user-hand"></custom-hand>
				<custom-hand type="paper" class="user-hand"></custom-hand>
				<custom-hand type="scissors" class="user-hand"></custom-hand>
			</div>
		</div>
		`;

		const style = document.createElement('style');
		style.innerHTML = `
			.game-container {
				font-family: var(--game-font);
				max-width: 300px;
				margin: 0 auto;
				height: 100vh;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			.middle-game-section {
				display: flex;
				align-items: center;
				gap: 15px;
			}
			@keyframes spin {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
			.timer-container {
				position: relative;
				margin: auto;
			}
			.timer-container.inactive {
				opacity: 0;
			}
			.loader {
				width: 180px;
				height: 180px;
				border-radius: 50%;
				border: 12px solid #f1f1f1;
				border-top: 12px solid #000;
				animation: spin 1s linear infinite;
			}
			.timer__counter {
				position: absolute;
				top: 30%;
				left: 40%;
				font-size: 80px;
				font-weight: 700;
			}		
			.hands-game-container {
				display: flex;
				justify-content: space-between;
				height: 160px;
			}
			.hands-game-container.rotate {
				transform: rotate(180deg);
				pointer-events: none;
			}
			.computer-hand {
				opacity: 0.5;
			}
			.user-hand,
			.computer-hand {
				transition: transform 0.5s;
			}
			.user-hand.active {
				pointer-events: none;
			}
			.computer-hand.active {
				opacity: 1;
			}
			.user-hand.active.paper {
				transform: translateY(-50%);
			}
			.computer-hand.active.paper {
				transform: translate(5px, -100%);
			}
			.user-hand.active.scissors {
				transform: translate(-120px, -55%);
			}
			.computer-hand.active.scissors {
				transform: translate(-105px, -110%);
			}
			.user-hand.active.rock {
				transform: translate(95px, -55%);
			}
			.computer-hand.active.rock {
				transform: translate(110px, -125%);
			}
			.user-hand.inactive {
				opacity: 0.5;
				transform: translateY(50%);
				pointer-events: none;
			}		
		`;

		this.shadow.appendChild(style);
	}
}

customElements.define('game-page', GamePage);

// export function gamePage(params) {
// 	const div = document.createElement('div');
// 	div.classList.add('game-container');

// 	div.innerHTML = `
// 		<div class="hands-game-container computer-hands rotate">
// 			<custom-hand type="rock" class="computer-hand"></custom-hand>
// 			<custom-hand type="paper" class="computer-hand"></custom-hand>
// 			<custom-hand type="scissors" class="computer-hand"></custom-hand>
// 		</div>
// 		<div class="middle-game-section">
// 		  <players-scoreboard></players-scoreboard>
// 			<div class="timer-container">
// 				<div class="loader"></div>
// 				<div class="timer__counter"></div>
// 			</div>
// 		</div>
// 		<div class="hands-game-container user-hands">
// 			<custom-hand type="rock" class="user-hand"></custom-hand>
// 			<custom-hand type="paper" class="user-hand"></custom-hand>
// 			<custom-hand type="scissors" class="user-hand"></custom-hand>
// 		</div>
//   `;

// 	startGame(div);

// 	div.addEventListener('playAgain', () => {
// 		resetGame(div);
// 	});

// 	div.addEventListener('goToRules', () => {
// 		state.resetGameCounter();
// 		params.goTo('/rules');
// 	});

// 	return div;
// }

// /* Ver si puedo hacer que las manos se vuelvan a renderizar con el cambio del state y no tener que hacer el cambio de clases y demás */

// function resetGame(container) {
// 	state.resetGameCounter();

// 	const userHandsArray = Array.from(container.querySelector('.user-hands')?.querySelectorAll('custom-hand'));
// 	const computerHandsArray = Array.from(container.querySelector('.computer-hands')?.querySelectorAll('custom-hand')); // Es una NodeList, por eso la transformo
// 	removeHandsClasses(userHandsArray);
// 	removeHandsClasses(computerHandsArray);

// 	startGame(container);
// }

// function startGame(container) {
// 	const userHandsArray = Array.from(container.querySelector('.user-hands')?.querySelectorAll('custom-hand'));
// 	const computerHandsArray = Array.from(container.querySelector('.computer-hands')?.querySelectorAll('custom-hand')); // Es una NodeList, por eso la transformo

// 	const timerContainerEl = container.querySelector('.timer-container');
// 	const timerCounterEl = container.querySelector('.timer__counter');
// 	let counter = 3;

// 	const interval = setInterval(() => {
// 		timerContainerEl.classList.remove('inactive');
// 		/* Se queda mucho tiempo con el 3 y no avanza como por 2 segundos, averiguar por qué */
// 		if (timerCounterEl) timerCounterEl.textContent = counter.toString();
// 		counter--;
// 		if (counter < 0) {
// 			timerContainerEl?.classList.toggle('inactive');
// 			checkHandMovement(userHandsArray);
// 			makeComputerMovement(computerHandsArray);
// 			state.setPlayWinner();
// 			checkEndGame(container);
// 			clearInterval(interval);
// 		}
// 	}, 1000);

// 	userHandsArray.forEach((hand) => {
// 		(hand as HTMLElement).addEventListener('click', (e) => {
// 			e.stopImmediatePropagation();
// 			toggleHandClasses(userHandsArray, hand, 'user');
// 		});
// 	});
// }

// function checkHandMovement(handsArray) {
// 	const noHandIsActive = handsArray.every((hand) => !(hand as Element).classList.contains('active'));
// 	if (noHandIsActive) {
// 		const paperHand = handsArray.find((hand) => (hand as Element).getAttribute('type') == 'paper');
// 		toggleHandClasses(handsArray, paperHand, 'user');
// 	}
// }

// function toggleHandClasses(handsArray, activeHand, player) {
// 	activeHand.classList.add('active');
// 	const inactiveHands = handsArray.filter((h) => h !== activeHand);
// 	inactiveHands.forEach((inactiveHand) => inactiveHand.classList.add('inactive'));
// 	const handType = activeHand.getAttribute('type') || 'rock';
// 	activeHand.classList.add(handType);
// 	state.setPlay(handType, player);
// }

// function makeComputerMovement(computerHandsArray) {
// 	const numberBetween0and2 = Math.floor(Math.random() * 3);
// 	const handToMove = computerHandsArray[numberBetween0and2];
// 	toggleHandClasses(computerHandsArray, handToMove, 'computer');
// }

// function checkEndGame(container) {
// 	const currentGameCounter = state.getState().currentGameCounter;

// 	if (currentGameCounter.user == 3 || currentGameCounter.computer == 3) {
// 		const userWins = currentGameCounter.user == 3;
// 		const winPlayer = userWins ? 'user' : 'computer';
// 		state.addWin(winPlayer);
// 		showResults(container, winPlayer);
// 	} else {
// 		const userHandsArray = Array.from(container.querySelector('.user-hands')?.querySelectorAll('custom-hand'));
// 		const computerHandsArray = Array.from(container.querySelector('.computer-hands')?.querySelectorAll('custom-hand'));

// 		setTimeout(() => {
// 			removeHandsClasses(userHandsArray);
// 			removeHandsClasses(computerHandsArray);
// 			startGame(container);
// 		}, 2000);
// 	}
// }

// function removeHandsClasses(array) {
// 	array.forEach((hand) => {
// 		(hand as any).classList.remove('active');
// 		(hand as any).classList.remove('inactive');
// 	});
// }

// function showResults(container, winPlayer) {
// 	const resultScoreboard = document.createElement('results-scoreboard');
// 	resultScoreboard.setAttribute('result', winPlayer);

// 	setTimeout(() => {
// 		container.appendChild(resultScoreboard);
// 	}, 2000);
// }
