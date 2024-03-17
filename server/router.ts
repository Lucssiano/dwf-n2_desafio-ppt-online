import { Router } from '@vaadin/router';

(function () {
	const rootEl = document.querySelector('.root');
	const router = new Router(rootEl);
	router.setRoutes([
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: 'home-page' },
		{ path: '/new-game', component: 'new-game-page' },
		{ path: '/join-room', component: 'join-room-page' },
		{ path: '/fail', component: 'fail-page' },
		{ path: '/rules', component: 'rules-page' },
		{ path: '/lobby', component: 'lobby-page' },
		{ path: '/game', component: 'game-page' },
	]);
})();
