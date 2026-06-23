import express from 'express';

import { readDb, writeDb } from '../utils/db.js';

const router = express.Router();

router.delete('/', (req, res) => {
  const { type } = req.query;

  if (type == 'removeSongFromLiked') {
    const { songId } = req.query;
    const db = readDb();

    let songToRemoveIndex = null;
    const songToRemove = db.liked_songs.data.find((song, index) => {
      if (song.song_id == songId) {
        songToRemoveIndex = index;
        return true;
      } else return false;
    });

    if (songToRemove === undefined) {
      res.status(404).json({
        success: false,
        msg: 'Song ID did not match any available songs',
        data: null,
      });
      return;
    }

    db.liked_songs.data.splice(songToRemoveIndex, 1);
    writeDb(db);

    res.status(200).json({
      success: true,
      msg: 'Liked song successfully removed from liked',
      data: null,
    });
  } else {
    res.status(404).json({
      success: false,
      msg: 'Invalid route for HTTP method DELETE',
      data: null,
    });
  }
});

router.post('/', async (req, res) => {
  const { type, songId } = req.query;

  if (type == 'addSongToLiked') {
    const db = readDb();
    const song = db.songs.data.find(song => Number(song?.id) === Number(songId));

    if (song === undefined) {
      res.status(404).json({
        success: false,
        msg: 'Song ID did not match any available songs',
        data: null,
      });
      return;
    }

    const chosenId = Number(db.liked_songs.newId);

    db.liked_songs.data.push({
      id: chosenId,
      song_id: Number(songId),
    });

    db.liked_songs.newId++;
    writeDb(db);

    res.status(200).json({
      success: true,
      msg: 'Song successfully added to liked',
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
