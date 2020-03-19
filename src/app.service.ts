import { Injectable } from '@nestjs/common';
const sqlite3 = require('sqlite3').verbose();

@Injectable()
export class AppService {
  db = null

  constructor() {
    this.db = new sqlite3.Database('results.db');
    this.db.serialize(() => {
      this.db.run('CREATE TABLE IF NOT EXISTS results (id INTEGER PRIMARY KEY AUTOINCREMENT, video TEXT NOT NULL, porn_id INTEGER NOT NULL)')
    })

  }

  addWatchResult({ video, pornId }) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('INSERT INTO results (video, porn_id) VALUES (?, ?)', [video, pornId], (err) => err ? reject(err) : resolve())
      })
    })
  }

  getWatchResults() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.all('SELECT * FROM results', (err, result) => {
          if (err) return reject(err);
          resolve(result)
        })
      })
    })
  }
}
