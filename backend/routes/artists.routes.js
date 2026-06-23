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
    uniqueName = Date.now() + '-' + file.originalname + '-' + randomUUID();
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('thumbnail'), async (req, res) => {
  const { type } = req.query;

  if (type == 'addArtist') {
    console.log('addArtist started')
    const db = readDb();
    const chosenId = Number(db.artists.newId);

    const artistName = req.body.name;

    db.artists.data.push({
      id: chosenId,
      name: artistName,
      profile_pic: 'assets/ + uniqueName',
    });

    db.artists.newId++;
    writeDb(db);

    console.log('addArtist ended successfully')

    res.status(200).json({
      success: true,
      msg: 'Album successfully added to liked',
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
