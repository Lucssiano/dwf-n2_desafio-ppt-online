import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

/* Pasarlas a variables de entorno */
const firebaseConfig = {
	apiKey: 'dXdC7ZJh1KyRK3QkYXRqqMhzbO4RiLaPVEPbourD',
	databaseURL: 'https://apx-dwf-m6-56070-default-rtdb.firebaseio.com',
	authDomain: 'apx-dwf-m6-56070.firebaseapp.com',
};

const app = initializeApp(firebaseConfig);

const rtdb = getDatabase(app);

export { rtdb };
