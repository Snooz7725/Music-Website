import express from 'express';
import multer from 'multer'
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import { readDb, writeDb } from '../utils/db.js';

const filePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filePath);

const router = express.Router();

let uniqueName = null;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/images/albums')); // Where files are being placed
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
    const fileFlag = req.body.fileFlag;

    if (fileFlag === 'true' && req.file === undefined) {
      console.log('[TEST] File not found')
      res.status(404).json({
        success: false,
        msg: 'Invalid file upload error',
        data: null,
      });

      return;
    }

    const db = readDb();
    const chosenId = Number(db.albums.newId);
    const title = req.body.title;
    const artistId = Number(req.body.artistId);

    db.albums.data.push({
      id: chosenId,
      title,
      artist_id: artistId,
      thumbnail: req.file === undefined ? null : uniqueName,
    });

    db.albums.newId++;
    writeDb(db);

    res.status(200).json({
      success: true,
      msg: 'Album successfully added',
      data: null,
    });
  } else {
    res.status(404).json({
      success: false,
      msg: 'Invalid route for HTTP method POST',
      data: null,
    });
  }
});

export default router;
