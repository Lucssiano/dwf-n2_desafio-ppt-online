import { state } from '../../state';

class PlayersScoreboard extends HTMLElement {
	shadow: ShadowRoot;
	computerCounter: number = 0;
	userCounter: number = 0;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		state.subscribe(() => {
			const currentState = state.getState();
			this.computerCounter = currentState.currentGameCounter.computer;
			this.userCounter = currentState.currentGameCounter.user;
			this.render();
		});
		this.render();
	}

	render() {
		this.shadow.innerHTML = `
		<div class="players-scoreboard">
			<div class="middle-game-section__counter">
				<h4 class="counter-title">Computadora</h4>
				<p class="counter-number computer">${this.computerCounter}</p>
			</div>
			<div class="middle-game-section__counter">
				<h4 class="counter-title">Usuario</h4>
				<p class="counter-number user">${this.userCounter}</p>
			</div>
		</div>
				`;

		const style = document.createElement('style');
		style.innerHTML = `
			.players-scoreboard {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 175px;
			}
			.counter-title {
				margin: 0;
				margin-bottom: 10px;
				font-size: 23px;
			}
			.counter-number {
				margin: 0;
				text-align: center;
				font-size: 20px;
				color: #070f2b;
				font-weight: 700;
			}
    `;

		this.shadow.appendChild(style);
	}
}

customElements.define('players-scoreboard', PlayersScoreboard);
