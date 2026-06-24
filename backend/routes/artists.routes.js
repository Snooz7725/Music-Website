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
    cb(null, path.join(__dirname, '../uploads/images/artists')); // Where files are being placed
  },
  filename: (req, file, cb) => {
    uniqueName = Date.now() + '-' + randomUUID() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('profilePic'), async (req, res) => {
  const { type } = req.query;

  if (type === 'addArtist') {
    console.log('[TEST] addArtist started');
    const fileFlag = req.body.fileFlag;

    console.log('[TEST]', JSON.stringify(req?.file, null, 2))
    console.log('[TEST]', fileFlag, typeof fileFlag)

    if (fileFlag === 'true' && req.file === undefined) {
      res.status(404).json({
        success: false,
        msg: 'Invalid file upload error',
        data: null,
      });

      return;
    }

    const db = readDb();
    const chosenId = Number(db.artists.newId);
    const artistName = req.body.name;

    db.artists.data.push({
      id: chosenId,
      name: artistName,
      profile_pic: req.file === undefined ? null : uniqueName,
    });

    db.artists.newId++;
    writeDb(db);

    console.log('[TEST] addArtist ended successfully');

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
