import express from 'express';
import albumRoutes from './routes/albums.routes.js';
import artistRoutes from './routes/artists.routes.js';
import dataRoutes from './routes/data.routes.js';
import likedAlbumRoutes from './routes/likedAlbums.routes.js';
import likedSongRoutes from './routes/likedSongs.routes.js';
import { readDb } from '../utils/db.js';

const app = express();
const PORT = 5000;

app.use(express.json());

app.use('/albums', albumRoutes);
app.use('/artists', artistRoutes);
app.use('/data', dataRoutes);
app.use('/liked-albums', likedAlbumRoutes);
app.use('/liked-songs', likedSongRoutes);

app.listen(PORT, () => {
  readDb();

  const universalDate = new Date().toUTCString();

  console.log('DB data loaded');
  console.log(`Backend running on http://localhost:${PORT} on:\n${universalDate}`);
});
