import { Router } from '@vaadin/router';

class NewGamePage extends HTMLElement {
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
            <label for="name" class="name-label">Tu Nombre</label>
            <input class="name-input" id="name" required></input>
            <custom-button class="start-button" size="small">Empezar</custom-button>
          </form>
        </main>
        <div class="hands-container">
          <custom-hand type="rock"></custom-hand>
          <custom-hand type="paper"></custom-hand>
          <custom-hand type="scissors"></custom-hand>
        </div>
      </div>
  `;

		const formEl = this.shadow.querySelector('form');
		const inputNameEl = this.shadow.querySelector('.name-input') as HTMLInputElement;
		const startGameButton = this.shadow.querySelector('.start-button');

		formEl?.addEventListener('submit', (e) => {
			e.preventDefault();
			const name = inputNameEl?.value;
			if (!name) alert('Por favor ingresá tu nombre');
			else {
				/* Guardar currentRoom.ownerName en state */
				Router.go('/share-code');
			}
		});

		startGameButton?.addEventListener('click', () => formEl?.dispatchEvent(new Event('submit')));

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
    .name-label {
      font-size: 45px;
    }
    .name-input {
      height: 60px;
      border: 10px solid #182460;
      border-radius: 10px;
      font-size: 30px;
      font-family: var(--game-font);
    }
    .hands-container {
      display: flex;
      justify-content: space-between;
    }
    `;

		this.shadow.appendChild(style);
	}
}

customElements.define('new-game-page', NewGamePage);
