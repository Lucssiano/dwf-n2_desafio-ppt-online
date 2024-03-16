class MyButton extends HTMLElement {
	shadow: ShadowRoot;
	size: string;
	color: string;

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.size = this.getAttribute('size') || '';
		this.color = this.getAttribute('color') || '';
		this.render();
	}

	render() {
		this.shadow.innerHTML = `
    <button class="button ${this.size} ${this.color}">${this.textContent}</button>
    `;

		const style = document.createElement('style');
		style.innerHTML = `
      .button {
        display: block;
        font-family: 'Odibee Sans', sans-serif;    
        font-size: 45px;
        cursor: pointer;
        padding: 20px 10px;
        text-align: center;
        width: 100%;
        border-radius: 10px;
        border: 10px solid #001997;
        background-color: #006CFC;
        color: #D8FCFC;
        transition: 0.5s;
      }
      @media (min-width: 769px) {
        .button:hover {
          border-color: #009048;
          background-color: #000;
        }
      }
      .small {
        font-size: 35px;
        padding: 10px;
        border: 6px solid #001997;
      }
      .violet {
        background-color: #201658;
        border: 6px solid #000;
        color: #D8FCFC;
      }
      .red {
        background-color: #9B4444;
        border: 6px solid #000;
        color: #D8FCFC;
        margin-top: 15px;
      }
    `;
		/* Son horribles los colores, buscar otros */

		this.shadow.appendChild(style);
	}
}

customElements.define('custom-button', MyButton);
