import { state } from '../../state';

class ShareCodePage extends HTMLElement {
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
        <div class="content-container">
            <div class="scoreboard-container">
                <div class="players-container">
                    <p class="player">Marce: <span class="wins">0</span></p>
                    <p class="player opponent">Lucho: <span class="wins">0</span></p>
                </div>
                <p class="room-info">Sala <span class="room-id">76HH23</span></p>
            </div>
                <p class="paragraph">
                    Compartí el código: <span class="room-code-copy">76HH23</span> con tu contrincante
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
            .content-container {
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
            .room-code-copy {
                display: block;
                font-weight: 700;
                color: #009048;
                margin: 10px 0 5px 0;
            }
            .hands-container {
                display: flex;
                justify-content: space-between;
            }    
        `;

		this.shadow.appendChild(style);
	}
}

customElements.define('share-code-page', ShareCodePage);
