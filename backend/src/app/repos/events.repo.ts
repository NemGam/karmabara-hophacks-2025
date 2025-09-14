import { db } from '@/db';
import { EventsSortOptions, SortOrder } from '../types/dbTypes';

export const getAll = async (sort: EventsSortOptions, order: SortOrder) => {
    const getAllStmt = db.prepare(`SELECT * FROM events ORDER BY ${sort} ${order}`);
    return getAllStmt.all();
};

const findAllAttendeesStmt = db.prepare(
    `SELECT u.first_name, u.last_name, p.pfp, p.level
    FROM users_events   AS ue
    JOIN users          AS u ON u.id=ue.user_id 
    JOIN user_profiles  AS p ON p.user_id=ue.user_id 
    WHERE event_id=?`,
);
export const findAllAttendees = async (eventId: string) => {
    return await findAllAttendeesStmt.all(eventId);
};

const getStmt = db.prepare(`SELECT * FROM events WHERE events.id=?`);
export const get = async (eventId: string) => {
    return await getStmt.get(eventId);
};

const registerStmt = db.prepare(`INSERT INTO users_events (event_id, user_id) VALUES (?, ?)`);
export const register = async (eventId: string, userId: string) => {
    const info = await registerStmt.run(eventId, userId);
    return info;
};

const createStmt = db.prepare(
    `INSERT INTO events (organizer_id, thumbnail_url, name, desc, reward, register_link, lat, lon, start_time, end_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
);
export const create = async () => {
    const info = await registerStmt.run(eventId, userId);
    return info;
};
