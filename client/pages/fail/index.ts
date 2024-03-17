import { Router } from '@vaadin/router';

class failPage extends HTMLElement {
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
          <p class="fail-paragraph">Ups, esta sala está completa o tu nombre no coincide con nadie en la sala.</p>
        </main>
        <div class="hands-container">
          <custom-hand type="rock"></custom-hand>
          <custom-hand type="paper"></custom-hand>
          <custom-hand type="scissors"></custom-hand>
        </div>
      </div>
  `;

		const startGameButton = this.shadow.querySelector('.start-button');

		startGameButton?.addEventListener('click', () => Router.go('/lobby'));

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
    .fail-paragraph {
      font-size: 35px;
      font-weight: 600;
      text-align: center;
    }
    .hands-container {
      display: flex;
      justify-content: space-between;
    }
    `;

		this.shadow.appendChild(style);
	}
}

customElements.define('fail-page', failPage);
