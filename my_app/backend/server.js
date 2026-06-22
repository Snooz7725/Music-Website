import express from 'express';
import albumRoutes from './routes/albums.routes.js';
import artistRoutes from './routes/artists.routes.js';
import dataRoutes from './routes/data.routes.js';
import likedAlbumRoutes from './routes/likedAlbums.routes.js';
import likedSongRoutes from './routes/likedSongs.routes.js';
import { readDb } from '../utils/db.js';

const app = express();
const PORT = 5000;

// app.use(path = '/', middlewareFunction)
// If no path is defined then it will default over to just using the 
// middleware function for every request
app.use(express.json());

// After confirming that a path matches one of these, it matches the next part of the
// path, such as looking at if '/albums' inside '/artists/albums' - this is done within
// the respective files after the first match (in this case artistRoutes)
app.use('/albums', albumRoutes);
app.use('/artists', artistRoutes);
app.use('/data', dataRoutes);
app.use('/liked-albums', likedAlbumRoutes);
app.use('/liked-songs', likedSongRoutes);

// Starts the express server by allowing it to listen from a specified port
app.listen(PORT, () => {
  readDb();

  const universalDate = new Date().toUTCString();

  console.log('DB data loaded');
  console.log(`Backend running on http://localhost:${PORT} on:\n${universalDate}`);
});
