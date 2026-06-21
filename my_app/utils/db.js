import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filePath = fileURLToPath(import.meta.url); // Current filepath
const dirPath = path.dirname(filePath); // Current dirpath
const dbPath = path.join(dirPath, '..', 'data', 'db.json'); // db path

export function readDb() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

export function writeDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}
