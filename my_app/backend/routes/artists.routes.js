import express from 'express';

import { readDb, writeDb } from '../../utils/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { type } = req.query;

  if (type == 'addArtist') {
    const artistName = req.body.artistName;
    const profilePic = req.body.profilePic;
    const db = readDb();
    const chosenId = Number(db.artists.newId);

    db.artists.data.push({
      id: chosenId,
      name: artistName,
      profile_pic: profilePic,
    });

    db.artists.newId++;
    writeDb(db);

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
