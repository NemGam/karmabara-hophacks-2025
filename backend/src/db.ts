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
        user_id             TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        pfp                 TEXT,
        bio                 TEXT,
        level               INTEGER DEFAULT 0,
        exp                 INTEGER DEFAULT 0,
        events_completed    INTEGER DEFAULT 0,
        hours_volunteered   INTEGER DEFAULT 0,
        floating_capa       TEXT,
        background          TEXT
    );
    `);

    db.exec(`
    CREATE TABLE IF NOT EXISTS achievements(
        id            TEXT PRIMARY KEY,
        name          TEXT NOT NULL,
        desc          TEXT,
        icon_url      TEXT,
        rarity        TEXT DEFAULT common
    );
    `);

    db.exec(`
    CREATE TABLE IF NOT EXISTS user_achievements(
        row_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        achievement_id TEXT NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
        completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    `);

    db.exec(`
    CREATE TABLE IF NOT EXISTS organizers(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
    )
    `);

    db.exec(`
    CREATE TABLE IF NOT EXISTS events(
        id              TEXT PRIMARY KEY,
        organizer_id    TEXT REFERENCES organizers(id) ON DELETE CASCADE,
        thumbnail_url   TEXT,       
        name            TEXT NOT NULL,
        desc            TEXT NOT NULL,
        reward          INTEGER,
        register_link   TEXT NOT NULL,
        lat             REAL,
        lon             REAL,
        start_time      DATETIME NOT NULL,
        end_time        DATETIME NOT NULL
    );`);

    db.exec(`
    CREATE TABLE IF NOT EXISTS users_events(
        event_id        TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
        user_id         TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        checked_in      BOOLEAN NOT NULL DEFAULT FALSE,
        approved        BOOLEAN NOT NULL DEFAULT FALSE,
        created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (event_id, user_id)
    );`);
});

init(); // run the transaction once on startup
