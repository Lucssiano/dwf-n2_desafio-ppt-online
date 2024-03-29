import { state } from '../../state';
import { Router } from '@vaadin/router';

class RulesPage extends HTMLElement {
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
                <p class="room-info">Sala: <span class="room-id">76HH23</span></p>
            </div>
            <div class="content">
                <p class="paragraph">
                    Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
                </p>
                <custom-button size="small" class="play-button">¡Jugar!</custom-button>
                <custom-button size="small" color="red" class="restart-button">Reiniciar estadisticas</custom-button>
            </div>
            <div class="hands-container">
                <custom-hand type="rock"></custom-hand>
                <custom-hand type="paper"></custom-hand>
                <custom-hand type="scissors"></custom-hand>
            </div>
        </div>
    `;

		const restartButtonEl = this.shadow.querySelector('.restart-button');
		restartButtonEl?.addEventListener('click', () => {
			// state.resetScoreboard();
		});

		const playButtonEl = this.shadow.querySelector('.play-button');
		playButtonEl?.addEventListener('click', () => Router.go('/lobby'));

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
                font-weight: 600;
                margin: 20px 0;
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

		this.shadow.appendChild(style);
	}
}

customElements.define('rules-page', RulesPage);
