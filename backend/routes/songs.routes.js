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
    cb(null, path.join(__dirname, '../uploads/images/songs')); // Where files are being placed
  },
  filename: (req, file, cb) => {
    uniqueName = Date.now() + '-' + randomUUID() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('thumbnail'), (req, res) => {
  const { type } = req.query;

  if (type === 'addSong') {
    const fileFlag = req.body.fileFlag;

    if (fileFlag === 'true' && req.file === undefined) {
            res.status(404).json({
            success: false,
            msg: 'Invalid file upload error',
            data: null,
        });

      return;
    }

    const db = readDb();
    const chosenId = Number(db.songs.newId);
    const title = req.body.title;
    const artistId = Number(req.body.artistId);
    const albumId = Number(req.body.albumId);

    db.songs.data.push({
        id: chosenId,
        album_id: albumId,
        title: title,
        artist_id: artistId,
        thumbnail: req.file === undefined ? null : uniqueName,
    });

    db.songs.newId++;
    writeDb(db);
    
    res.status(200).json({
        success: true,
        msg: 'Song successfully added',
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
