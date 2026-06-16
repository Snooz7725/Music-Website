import express from 'express'; // server and routes
import fs from 'fs'; // reads and writes files
import path from 'path'; // builds safe file paths
import { fileURLToPath } from 'url'; // helps get currren folder when using ES modules

const app = express(); // server obj
app.use(express.json()); // configures server to parse json files

const __filename = fileURLToPath(import.meta.url); // setting file path (filename = file path)
const __dirname = path.dirname(__filename); // setting the file dir name
const dbPath = path.join(__dirname, 'data', 'db.json');

// ================
// Routes
// ================

// Response structure:
// {
//   success: bool, // Informs you of if the request failed
//   msg: '' | null, // Gives additional context on the completion/failure of the request
//   data: {} | null, // Stores returned data
// }

// A route that listens for the method 'DELETE' and the path '/albums/:id'
// 'req' is the obj that holds the info passed form the front
// 'res' is the obj that is sent back to the front
app.delete('/albums/:id', (req, res) => {
  const id = Number(req.params.id);
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  // Filter out the albums and songs that are not related to the specified album
  // and replace the original tables with them to remove the album and its songs
  db.albums.data = db.albums.data.filter(album => album?.id !== id);
  db.songs.data = db.songs.data.filter(song => song?.album_id !== id);

  // stringify(
  //  value: any, // value being stringified
  //  replacer?: (string | number)[] | null | undefined, // a list of keys specifying what to include
  //  space?: string | number | undefined // indentation
  // ): string (+1 overload)
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  
  res.status(200).json({
    success: true,
    msg: 'Album successfully deleted',
    data: null,
  });
});

app.delete('/liked-songs', (req, res) => {
  const { type } = req.query;
  
  if (type == 'removeSongFromLiked') {
    const { songId } = req.query;

    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    let songToRemoveIndex = null;
    const songToRemove = db.liked_songs.data.find((song, index) => {
      if (song.song_id == songId) {
        songToRemoveIndex = index;
        return true;
      } else return false;
    });

    // If nothing is found (which should be impossible) return to avoid server errors
    if (songToRemove === undefined) {
      res.status(404).json({
        success: false,
        msg: 'Song ID did not match any available songs',
        data: null,
      });
      return;
    }

    db.liked_songs.data.splice(songToRemoveIndex, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

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

app.delete('/liked-albums', (req, res) => {
  const { type } = req.query;
  
  if (type == 'removeAlbumFromLiked') {
    const { albumId } = req.query;

    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    let albumToRemoveIndex = null;
    const albumToRemove = db.liked_albums.data.find((album, index) => {
      if (album.album_id == albumId) {
        albumToRemoveIndex = index;
        return true;
      } else return false;
    });

    // If nothing is found (which should be impossible) return to avoid server errors
    if (albumToRemove === undefined) {
      res.status(404).json({
        success: false,
        msg: 'Album ID did not match any available albums',
        data: null,
      });
      return;
    }

    db.liked_albums.data.splice(albumToRemoveIndex, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

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

app.get('/data', (req, res) => {
  const { type } = req.query;

  if (type == 'all') {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    res.status(200).json({
      success: true,
      msg: 'DB successfully retrieved',
      data: db,
    });
  }

  else if (type == 'searchAll') {
    const whiteListedTables = ['artists', 'songs', 'albums'];
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const dbArr = Object.entries(db);
    const loweredKeyword = req.query.keyword?.toLowerCase() ?? '';

    // Go through each top level property and then find relevant results, 
    // then search through other properties if not enough is retrieved (5)
    let resultsCount = 0;
    let filteredResults = [];

    // As long as results limit not reached, and table is white-listed, check if table has rows that match the
    // keyword
    filteredResults = dbArr.map(([tableName, tableArr]) => { 
      if (!whiteListedTables.includes(tableName)) return []; // Prevent looping through tables not white-listed

      let tableData = tableArr.data;

      if (tableData.length < 1) return [];

      let colName = '';
      if ('name' in tableData[0]) {
        colName = 'name';
      } else colName = 'title';

      // Check table for name/title that match keyword
      const matchingResults = tableData.filter(
        row => 
        resultsCount < 6 && row[colName].toLowerCase().includes(loweredKeyword)
      );

      let mappedResults = [];
      if (matchingResults.length > 0) {
        // As long as there are matching results from the db array, loop through and build objects using each
        // row as reference, then return it to the matchingResults array before returning it
        // to the filteredResults array
        mappedResults = matchingResults.map(row => {
          // To ignore the ID register
          if (typeof row != 'object') return null;

          let obj = {};

          obj.id = resultsCount;
          if (tableName === 'songs') {
            obj.album_id = row.album_id;
            obj.artist_id = row.artist_id;
            obj.artist_name = db.artists.data[row.artist_id].name;
            obj.title = row[`${colName}`];
          } else if (tableName === 'albums') {
            obj.album_id = row.id;
            obj.artist_id = row.artist_id;
            obj.artist_name = db.artists.data[row.artist_id].name;
            obj.title = row[`${colName}`];
          } else {
            obj.artist_id = row.id;
            obj.artist_name = row.name;
          }

          obj.type = tableName;
          
          resultsCount += 1;

          return obj;
        })
      }

      return mappedResults;
    })

    // Loop filteredResults and unload each item's item into joinedResults before
    // sending it back to the front-end 
    let joinedResults = [];
    for (let i of filteredResults) {
      joinedResults.push(...i);
    }

    res.status(200).json({
      success: true,
      msg: 'Search-all was successful',
      data: joinedResults,
    });   
  }
  else {
    res.status(404).json({
      success: false,
      msg: 'Invalid route for HTTP method GET',
      data: null,
    });
  }
});

app.post('/liked-songs', async (req, res) => {
  const { type, songId } = req.query;

  if (type == 'addSongToLiked') {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const song = db.songs.data.find(song => Number(song?.id) === Number(songId));

    // If nothing is found (which should be impossible) return to avoid server errors
    if (song === undefined) {
      res.status(404).json({
        success: false,
        msg: 'Song ID did not match any available songs',
        data: null,
      });
      return;
    }

    const chosenId = Number(db.liked_songs.newId);

    // Add song to liked songs object
    db.liked_songs.data.push({
      id: chosenId,
      song_id: Number(songId)
    });

    // Update newId register for later use
    db.liked_songs.newId++;

    // Save back to DB
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

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
})

app.post('/liked-albums', async (req, res) => {
  const { type, albumId } = req.query;

  if (type == 'addAlbumToLiked') {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const album = db.albums.data.find(album => Number(album?.id) === Number(albumId));

    // If nothing is found (which should be impossible) return to avoid server errors
    if (album === undefined) {
      res.status(404).json({
        success: false,
        msg: 'album ID did not match any available albums',
        data: null,
      });
      return;
    }

    const chosenId = Number(db.liked_albums.newId);

    // Add album to liked albums object
    db.liked_albums.data.push({
      id: chosenId,
      album_id: Number(albumId)
    });

    // Update newId register for later use
    db.liked_albums.newId++;

    // Save back to DB
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

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
})

app.listen(5000, () => {
  // Checks if the DB fails or not after the backend startup
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const universalDate = new Date().toUTCString();

  console.log('DB data loaded');
  console.log(`Backend running on http://localhost:5000 on:\n${universalDate}`);
});
