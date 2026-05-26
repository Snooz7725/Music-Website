import express from 'express'; // server and routes
import fs from 'fs'; // reads and writes files
import path from 'path'; // builds safe file paths
import { fileURLToPath } from 'url'; // helps get currren folder when using ES modules

async function fetchSongInfo(artist, song, albums) {
  let data = {
    songData: {},
    albumData: {title: null}
  };

  const res = await fetch(
    `https://musicbrainz.org/ws/2/recording/?query=` +
    `recording:${encodeURIComponent(song)}%20AND%20artist:${encodeURIComponent(artist)}` +
    `&fmt=json`,
    {
      headers: {
        'User-Agent': 'MyApp/1.0 (me@example.com)'
      }
    }
  ).then(res => {
    let albumData = {};
    const albumTitle = res["release-group"].title;
    if (albums.some(x => x.title == res["release-group"].title)) {
      albumData = fetch(
        `https://musicbrainz.org/ws/2/release-group/?query=` +
        `release:${encodeURIComponent(albumTitle)}%20AND%20artist:${encodeURIComponent(artist)}` +
        `&fmt=json`,
        {
          headers: {
            'User-Agent': 'MyApp/1.0 (me@example.com)'
          }
        }
      )

      data.albumData = albumData;
      data.newAlbumFlag = true;
    } else {
      data.albumData.title = albumData;
      data.newAlbumFlag = false;
    }

    data["songData"] = res;
    return data;
  });

  return res;
}

const app = express(); // server obj
app.use(express.json()); // configures server to parse json files

const __filename = fileURLToPath(import.meta.url); // setting file path (filename = file path)
const __dirname = path.dirname(__filename); // setting the file dir name
const dbPath = path.join(__dirname, 'src', 'data', 'db.json');

// A route that listens for the method 'DELETE' and the path '/albums/:id'
// 'req' is the obj that holds the info passed form the front
// 'res' is the obj that is sent back to the front
app.delete('/albums/:id', (req, res) => {
  const id = Number(req.params.id);
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  // Filter out the albums and songs that are not related to the specified album
  // and replace the original tables with them to remove the album and its songs
  db.albums = db.albums.filter(album => album.id !== id);
  db.songs = db.songs.filter(song => song.album_id !== id);

  // stringify(
  //  value: any, // value being stringified
  //  replacer?: (string | number)[] | null | undefined, // a list of keys specifying what to include
  //  space?: string | number | undefined // indentation
  // ): string (+1 overload)
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json({ message: 'Album deleted' }); // response to front
});

app.get('/data', (req, res) => {
  const { type } = req.query;

  if (type == 'all') {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    res.json({ data: db });
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
    filteredResults = dbArr.map(([tableName, arrVal]) => { 
      if (!whiteListedTables.includes(tableName)) return []; // Prevent looping through tables not white-listed

      if (arrVal.length < 1) return [];
      
      let colName = '';
      if ('name' in arrVal[0]) {
        colName = 'name';
      } else colName = 'title';

      // Check table for name/title that match keyword
      const matchingResults = arrVal.filter(
        row => 
        resultsCount < 6 && row[colName]?.toLowerCase().includes(loweredKeyword)
      );

      let mappedResults = [];
      if (matchingResults.length > 0) {
        // As long as there are matching results from the db array, loop through and build objects using each
        // row as reference, then return it to the matchingResults array before returning it
        // to the filteredResults array
        mappedResults = matchingResults.map(row => {
            let obj = {};

            obj.id = resultsCount;
            if (tableName === 'songs' || tableName === 'albums') {
              obj.album_id = row.album_id;
              obj.artist_id = row.artist_id;
              obj.artist_name = db.artists[row.artist_id].name;
            } else {
              obj.name = row.name;
            }

            obj[`${colName}`] = row[`${colName}`];
            
            resultsCount += 1;
            return obj;
          }
        )
      }

      return mappedResults;
    })

    // Loop filteredResults and unload each item's item into joinedResults before
    // sending it back to the front-end 
    let joinedResults = [];
    for (let i of filteredResults) {
      joinedResults.push(...i);
    }

    res.json({ data: joinedResults });    
  }
  else if (type == 'addSong') {
    // Checks if the album of the song being aded is available already, if not, add it. Then add the song
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const { artist, song } =  req.query;
    const data = fetchSongInfo(artist, song, db.album);

    res.json({ data: data });
  }
  else { // Return nothing if the type matches nothing
    res.json({ data: null });
  }
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
