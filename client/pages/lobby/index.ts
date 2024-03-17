import { state } from '../../state';

class LobbyPage extends HTMLElement {
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
        <div class="rules-container">
            <div class="scoreboard-container">
                <div class="players-container">
                    <p class="player">Marce: <span class="wins">0</span></p>
                    <p class="player opponent">Lucho: <span class="wins">0</span></p>
                </div>
                <p class="room-info">Sala <span class="room-id">76HH23</span></p>
            </div>
                <p class="paragraph">
                    Esperando a que <span class="waiting-player">Lucho</span> se una a la sala...
                </p>
            <div class="hands-container">
                <custom-hand type="rock"></custom-hand>
                <custom-hand type="paper"></custom-hand>
                <custom-hand type="scissors"></custom-hand>
            </div>
        </div>
    `;

		/* <p class="paragraph"> El primer jugador en ganar 3 rondas es el ganador del juego. </p> */

		const style = document.createElement('style');
		style.innerHTML = `
            .rules-container {
                font-family: var(--game-font);
                margin: 0 auto;
                max-width: 300px;
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .paragraph {
                font-size: 40px;
                margin: 20px 0;
                text-align: center;
            }
            .scoreboard-container {
                margin: 20px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .player {
                font-size: 30px;
                font-weight: 600;
                margin: 0;
            }
            .player.opponent {
                color: #FF6442;
            }
            .waiting-player {
                font-weight: 600;
            }
            .room-info {
                font-size: 25px;
                text-align: right;
                font-weight: 600;
                margin: 0;
            }
            .room-id {
                display: block;
                font-weight: 400;
            }
            .hands-container {
                display: flex;
                justify-content: space-between;
            }    
        `;

		// const restartButtonEl = div.querySelector('.restart-button');
		// restartButtonEl?.addEventListener('click', () => {
		// 	state.resetScoreboard();
		// });

		// const button = div.querySelector('custom-button');
		// button?.addEventListener('click', () => params.goTo('/game'));

		this.shadow.appendChild(style);
	}
}

customElements.define('lobby-page', LobbyPage);
