import express from 'express';
import { realTimeDB, firestoreDB } from './db';
// import { nanoid } from 'nanoid'; /* Nanoid me da problemas con el import */
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import cors from 'cors';

const PORT = process.env.PORT || "3000"; /* Lo puse así porque sino toma el port 3000 para la api y para hacer el serve de parcel */

const app = express();
app.use(express.json());
app.use(cors());

const roomsCollection = firestoreDB.collection('rooms');

app.post('/rooms', (req, res) => {
	const { ownerName } = req.body;
	const roomRef = realTimeDB.ref(`rooms/${uuidv4()}`);
	roomRef
		.set({ game: [], ownerName })
		.then((rtdbRes) => {
			const roomLongId = roomRef.key;
			const roomFirestoreId = "BBB4444";
			roomsCollection
				.doc(roomFirestoreId)
				.set({ gameHistory: [], rtdbRoomId: roomLongId })
				.then(() => res.json({ message: 'Room created', roomId: roomFirestoreId }))
				.catch((err) => res.status(500).json({ message: 'Error creating firestore room', error: err }));
		})
		.catch((err) => res.status(500).json({ message: 'Error creating realtime room', error: err }));
});

app.use(express.static('dist'));

app.get('*', (req, res) => {
	const route = path.join(__dirname, '../dist/index.html');
	res.sendFile(route);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
