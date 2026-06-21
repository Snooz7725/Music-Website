import express from 'express';

import { readDb, writeDb } from '../../utils/db.js';

const router = express.Router();

router.delete('/', (req, res) => {
  const { type } = req.query;

  if (type == 'removeAlbumFromLiked') {
    const { albumId } = req.query;
    const db = readDb();

    let albumToRemoveIndex = null;
    const albumToRemove = db.liked_albums.data.find((album, index) => {
      if (album.album_id == albumId) {
        albumToRemoveIndex = index;
        return true;
      } else return false;
    });

    if (albumToRemove === undefined) {
      res.status(404).json({
        success: false,
        msg: 'Album ID did not match any available albums',
        data: null,
      });
      return;
    }

    db.liked_albums.data.splice(albumToRemoveIndex, 1);
    writeDb(db);

    res.status(200).json({
      success: true,
      msg: 'Liked Album successfully removed from liked',
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
  const { type, albumId } = req.query;

  if (type == 'addAlbumToLiked') {
    const db = readDb();
    const album = db.albums.data.find(album => Number(album?.id) === Number(albumId));

    if (album === undefined) {
      res.status(404).json({
        success: false,
        msg: 'album ID did not match any available albums',
        data: null,
      });
      return;
    }

    const chosenId = Number(db.liked_albums.newId);

    db.liked_albums.data.push({
      id: chosenId,
      album_id: Number(albumId),
    });

    db.liked_albums.newId++;
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
