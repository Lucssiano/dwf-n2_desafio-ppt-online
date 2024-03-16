export function homePage(params) {
	const div = document.createElement('div');
	div.classList.add('home-container');

	div.innerHTML = `
    <main class="main-section">
      <h1 class="title">Piedra Papel ó Tijera</h1>
      <custom-button>Empezar</custom-button>
    </main>
    <div class="hands-container">
      <custom-hand type="rock"></custom-hand>
      <custom-hand type="paper"></custom-hand>
      <custom-hand type="scissors"></custom-hand>
    </div>
  `;

	const button = div.querySelector('custom-button');
	button?.addEventListener('click', () => params.goTo('/rules'));

	return div;
}
