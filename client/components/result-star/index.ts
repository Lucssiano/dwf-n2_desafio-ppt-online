import { state } from '../../state';

const stars = {
	winStar: require('url:../../img/win-star.png'),
	loseStar: require('url:../../img/lose-star.png'),
};

class ResultStar extends HTMLElement {
	shadow: ShadowRoot;
	win: boolean;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.win = state.getState().currentGameCounter.winner === 'user';
		this.render();
	}

	render() {
		this.shadow.innerHTML = ` 
		<div class="star-container">
			<img src="${this.win ? stars.winStar : stars.loseStar}" alt="Win star" class="star-img"> 
		</div>
			`;

		const style = document.createElement('style');
		style.innerHTML = `
			.star-img {
				width: 250px;
				height: 250px;
			}
    `;

		this.shadow.appendChild(style);
	}
}

customElements.define('result-star', ResultStar);
