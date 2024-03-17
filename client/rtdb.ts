import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	databaseURL: process.env.DATABASE_URL,
	authDomain: process.env.AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);

const rtdb = getDatabase(app);

export { rtdb };
