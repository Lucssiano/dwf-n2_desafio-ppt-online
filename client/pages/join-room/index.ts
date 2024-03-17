import { Router } from '@vaadin/router';

class JoinRoomPage extends HTMLElement {
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
          <form class="form-container">
            <input class="code-input" id="name" placeholder="código"></input>
            <custom-button class="start-button" size="small">Ingresar a la sala</custom-button>
          </form>
        </main>
        <div class="hands-container">
          <custom-hand type="rock"></custom-hand>
          <custom-hand type="paper"></custom-hand>
          <custom-hand type="scissors"></custom-hand>
        </div>
      </div>
  `;

		const startGameButton = this.shadow.querySelector('.start-button');

		startGameButton?.addEventListener('click', () => Router.go('/rules'));

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
      margin-bottom: 15px;
    }
    .form-container {
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 10px;
    }
    .code-input {
      height: 60px;
      border: 10px solid #182460;
      border-radius: 10px;
      font-size: 30px;
      font-family: var(--game-font);
      text-align: center;
    }
    .code-input::placeholder {
      opacity: 0.5;
    }
    .hands-container {
      display: flex;
      justify-content: space-between;
    }
    `;

		this.shadow.appendChild(style);
	}
}

customElements.define('join-room-page', JoinRoomPage);
