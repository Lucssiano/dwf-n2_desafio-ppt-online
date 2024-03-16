import { state } from '../../state';

class ResultScoreboard extends HTMLElement {
	shadow: ShadowRoot;
	computerCounter: number = state.getState().gameWins.computer;
	userCounter: number = state.getState().gameWins.user;
	win: boolean;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		const currentState = state.getState();
		this.computerCounter = currentState.gameWins.computer;
		this.userCounter = currentState.gameWins.user;
		this.win = currentState.currentGameCounter.winner === 'user';
		this.render();
	}

	render() {
		this.shadow.innerHTML = `
    <div class='results ${this.win ? 'winner' : 'loser'}'>
      <result-star></result-star>
      <div class='results__scoreboard'>
        <h4 class='results__scoreboard-title'>Score</h4>
        <p class='results__scoreboard-counter-container'>
          Usuario: <span class='results__scoreboard-counter'>${this.userCounter}</span>
        </p>
        <p class='results__scoreboard-counter-container'>
          Computadora: <span class='results__scoreboard-counter'>${this.computerCounter}</span>
        </p>
      </div>
      <custom-button size="small" class="play-again-button">Volver a jugar</custom-button>     
      <custom-button size="small" color="violet" class="go-to-menu-button">Volver al inicio</custom-button>     
      </div>
      `;

		const playAgainButtonEl = this.shadow.querySelector('.play-again-button');
		playAgainButtonEl?.addEventListener('click', () => {
			const event = new CustomEvent('playAgain');
			this.parentElement?.dispatchEvent(event);
			this.remove();
		});

		const goToMenuButtonEl = this.shadow.querySelector('.go-to-menu-button');
		goToMenuButtonEl?.addEventListener('click', () => {
			const event = new CustomEvent('goToRules');
			this.parentElement?.dispatchEvent(event);
			this.remove();
		});

		const style = document.createElement('style');
		style.innerHTML = `
        .results {
          position: absolute;
          top: 0;
          right: 0;
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }
        .results.winner {
          background-color: #888949E5;
        }
        .results.loser {
          background-color: #894949E5;
        }
        .results__scoreboard {
          border-radius: 4px;
          border: 10px solid #000;
          background-color: #fff;
          width: 230px;
          height: 160px;
          padding: 15px;
        }
        .results__scoreboard-title {
          margin: 0;
          font-size: 55px;
          text-align: center;
        }
        .results__scoreboard-counter-container {
          margin: 5px 0;
          text-align: right;
          font-size: 40px;
        }
    `;

		this.shadow.appendChild(style);
	}
}

customElements.define('results-scoreboard', ResultScoreboard);
