const hands = {
	rock: require('url:../../img/rock.png'),
	paper: require('url:../../img/paper.png'),
	scissors: require('url:../../img/scissors.png'),
};

class Hand extends HTMLElement {
	shadow: ShadowRoot;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const typeOfHand = this.getAttribute('type') || 'rock';

		this.shadow.innerHTML = `
       <img src="${hands[typeOfHand]}" class="hand-image">
    `;

		const style = document.createElement('style');
		style.innerHTML = `
		.hand-image {
			cursor: pointer;
			height: 100%;
		}
    `;

		this.shadow.appendChild(style);
	}
}

customElements.define('custom-hand', Hand);
