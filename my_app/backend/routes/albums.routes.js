import express from 'express';

import { readDb, writeDb } from '../../utils/db.js';

const router = express.Router();

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const db = readDb();

  db.albums.data = db.albums.data.filter(album => album?.id !== id);
  db.songs.data = db.songs.data.filter(song => song?.album_id !== id);

  writeDb(db);

  res.status(200).json({
    success: true,
    msg: 'Album successfully deleted',
    data: null,
  });
});

export default router;
