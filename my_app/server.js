import express from "express"; // server and routes
import fs from "fs"; // reads and writes files
import path from "path"; // builds safe file paths
import { fileURLToPath } from "url"; // helps get currren folder when using ES modules

const app = express(); // server obj
app.use(express.json()); // configures server to parse json files

const __filename = fileURLToPath(import.meta.url); // setting file path (filename = file path)
const __dirname = path.dirname(__filename); // setting the file dir name
const dbPath = path.join(__dirname, "src", "data", "db.json");

// A route that listens for the method "DELETE" and the path "/albums/:id"
// "req" is the obj that holds the info passed form the front
// "res" is the obj that is sent back to the front
app.delete("/albums/:id", (req, res) => {
  const id = Number(req.params.id);
  const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));

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
  res.json({ message: "Album deleted" }); // response to front
});

app.get("/data", (req, res) => {
  const { type } = req.query;

  if (type == "all") {
    const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    res.json({ data: db });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
