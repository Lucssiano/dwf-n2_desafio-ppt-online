import { state } from '../../state';

export function rulesPage(params) {
	const div = document.createElement('div');
	div.classList.add('rules-container');

	div.innerHTML = `
        <div class="content">
          <p class="paragraph">
              Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.
          </p>
          <p class="paragraph">
              El primer jugador en ganar 3 rondas es el ganador del juego.
          </p>
          <custom-button size="small">¡Jugar!</custom-button>
          <custom-button size="small" color="red" class="restart-button">Reiniciar estadisticas</custom-button>
        </div>
        <div class="hands-container">
            <custom-hand type="rock"></custom-hand>
            <custom-hand type="paper"></custom-hand>
            <custom-hand type="scissors"></custom-hand>
        </div>
    `;

	const restartButtonEl = div.querySelector('.restart-button');
	restartButtonEl?.addEventListener('click', () => {
		state.resetScoreboard();
	});

	const button = div.querySelector('custom-button');
	button?.addEventListener('click', () => params.goTo('/game'));

	return div;
}
