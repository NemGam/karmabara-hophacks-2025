import Database from 'better-sqlite3';
// open() returns a promise that resolves to an async‑API db object
export const db = new Database(process.env.DB_FILE || './data.sqlite', {});

//Enable foreign_keys
db.pragma('foreign_keys = ON');

const init = db.transaction(() => {
    // users table
    db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id            TEXT PRIMARY KEY,
      first_name    TEXT    NOT NULL,
      last_name     TEXT    NOT NULL,
      email         TEXT    NOT NULL UNIQUE,
      phone         TEXT UNIQUE,
      password_hash TEXT    NOT NULL,
      created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
      role          TEXT
    );
  `);

    db.exec(`
    CREATE TABLE IF NOT EXISTS user_profiles(
        user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        pfp     TEXT,
        level   INTEGER DEFAULT 0,
        exp     INTEGER DEFAULT 0
    );
    `);
});

init(); // run the transaction once on startup
