import sqlite3 from 'sqlite3';
import path from 'node:path'

export const db = new sqlite3.Database('../data/database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});