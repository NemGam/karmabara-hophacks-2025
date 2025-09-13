import { db } from '../../db';

const findUserByIdStmt = db.prepare('SELECT first_name, last_name, email, phone, role, created_at FROM users WHERE id = id');
export const findById = (id: string) => findUserByIdStmt.get(id);

const findUserProfileByIdStmt = db.prepare('SELECT first_name, last_name, pfp, level, exp, created_at FROM users u JOIN user_profiles p ON p.user_id=u.id WHERE u.id = ?');
export const findProfileById = (id: string) => findUserProfileByIdStmt.get(id);