import express from 'express';

import { readDb } from '../../utils/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { type } = req.query;

  if (type == 'all') {
    const db = readDb();

    res.status(200).json({
      success: true,
      msg: 'DB successfully retrieved',
      data: db,
    });
  } else if (type == 'searchAll') {
    const whiteListedTables = ['artists', 'songs', 'albums'];
    const db = readDb();
    const dbArr = Object.entries(db);
    const loweredKeyword = req.query.keyword?.toLowerCase() ?? '';

    let resultsCount = 0;

    const filteredResults = dbArr.map(([tableName, tableArr]) => {
      if (!whiteListedTables.includes(tableName)) return [];

      const tableData = tableArr.data;

      if (tableData.length < 1) return [];

      let colName = '';
      if ('name' in tableData[0]) {
        colName = 'name';
      } else colName = 'title';

      const matchingResults = tableData.filter(
        row =>
          resultsCount < 6 && row[colName].toLowerCase().includes(loweredKeyword)
      );

      let mappedResults = [];
      if (matchingResults.length > 0) {
        mappedResults = matchingResults.map(row => {
          if (typeof row != 'object') return null;

          const obj = {};

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
        });
      }

      return mappedResults;
    });

    const joinedResults = [];
    for (const results of filteredResults) {
      joinedResults.push(...results);
    }

    res.status(200).json({
      success: true,
      msg: 'Search-all was successful',
      data: joinedResults,
    });
  } else {
    res.status(404).json({
      success: false,
      msg: 'Invalid route for HTTP method GET',
      data: null,
    });
  }
});

export default router;
