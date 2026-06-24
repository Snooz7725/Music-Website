import express from 'express';
import multer from 'multer'
import { randomUUID } from 'crypto';
import { readDb, writeDb } from '../utils/db.js';

const router = express.Router();

let uniqueName = null;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/'); // Where files are being placed
  },
  filename: (req, file, cb) => {
    uniqueName = Date.now() + '-' + randomUUID() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.delete('/:id', (req, res) => {
  const { type } = req.query;

  if (type === 'deleteAlbum') {
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
  }
});

router.post('/', upload.single('thumbnail'), (req, res) => {
  const { type } = req.query;

  if (type === 'addAlbum') {
    console.log('addAlbum started')
    const db = readDb();
    const chosenId = Number(db.albums.newId);

    const albumName = req.body.title;
    const artistId = req.body.artistId;

    db.albums.data.push({
      id: chosenId,
      title: albumName,
      artist_id: artistId,
      thumbnail: 'assets/' + uniqueName,
    });

    db.albums.newId++;
    writeDb(db);

    console.log('addAlbum ended successfully')

    res.status(200).json({
      success: true,
      msg: 'Album successfully added to liked',
      data: null,
    });
  }
});

export default router;
