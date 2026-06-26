import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { readDb } from './utils/db.js';

import albumRoutes from './routes/albums.routes.js';
import artistRoutes from './routes/artists.routes.js';
import songRoutes from './routes/songs.routes.js';
import dataRoutes from './routes/data.routes.js';
import likedAlbumRoutes from './routes/likedAlbums.routes.js';
import likedSongRoutes from './routes/likedSongs.routes.js';

const filePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filePath);
const app = express();
const PORT = 5000;

// app.use(path = '/', middlewareFunction)
// If no path is defined then it will default over to just using the 
// middleware function for every request
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// After confirming that a path matches one of these, it matches the next part of the
// path, such as looking at if '/albums' inside '/artists/albums' - this is done within
// the respective files after the first match (in this case artistRoutes)
app.use('/albums', albumRoutes);
app.use('/artists', artistRoutes);
app.use('/songs', songRoutes);
app.use('/data', dataRoutes);
app.use('/liked-albums', likedAlbumRoutes);
app.use('/liked-songs', likedSongRoutes);

// Starts the express server by allowing it to listen from a specified port
app.listen(PORT, () => {
  readDb();

  const universalDate = new Date().toUTCString();

  const prefix = '[BACKEND]'
  console.log(prefix, 'DB data loaded');
  console.log(prefix, 'process dir:', process?.cwd());
  console.log(prefix, `Backend running on http://localhost:${PORT} on:\n${universalDate}`);
});
