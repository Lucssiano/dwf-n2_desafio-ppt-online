import { Router } from '@vaadin/router';

class HomePage extends HTMLElement {
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
      <div class="home-container">
        <main class="main-section">
          <h1 class="title">Piedra Papel ó Tijera</h1>
          <div class="buttons-container">
            <custom-button class="new-game-button" size="small">Nuevo Juego</custom-button>
            <custom-button class="join-room-button" size="small">Ingresar a una Sala</custom-button>
          </div>
        </main>
        <div class="hands-container">
          <custom-hand type="rock"></custom-hand>
          <custom-hand type="paper"></custom-hand>
          <custom-hand type="scissors"></custom-hand>
        </div>
      </div>
  `;

		const newGameButton = this.shadow.querySelector('.new-game-button');
		const joinRoomButton = this.shadow.querySelector('.join-room-button');

		newGameButton?.addEventListener('click', () => Router.go('/new-game'));
		joinRoomButton?.addEventListener('click', () => Router.go('/join-room'));

		const style = document.createElement('style');
		style.innerHTML = `
    .home-container {
      font-family: var(--game-font);
      max-width: 300px;
      margin: 0 auto;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .title {
      color: #009048;
      font-weight: 700;
      font-size: 80px;
    }
    .buttons-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .hands-container {
      display: flex;
      justify-content: space-between;
    }
    `;

		this.shadow.appendChild(style);
	}
}

customElements.define('home-page', HomePage);
