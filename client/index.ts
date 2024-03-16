import { initRouter } from './router';
import { state } from './state';
import './components/button';
import './components/hand';
import './components/players-scoreboard';
import './components/results-scoreboard';
import './components/result-star';

(function main() {
	const root = document.querySelector('.root');
	if (root) {
		state.init();
		initRouter(root);
	}
})();
