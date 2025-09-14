import { db } from '@/db';

const findUserByIdStmt = db.prepare('SELECT first_name, last_name, email, phone, role, created_at FROM users WHERE id = ?');
export const findById = (id: string) => findUserByIdStmt.get(id);

const findUserProfileByIdStmt = db.prepare('SELECT user_id, first_name, last_name, pfp, level, exp, events_completed, hours_volunteered, created_at, floating_capa, background FROM users u JOIN user_profiles p ON p.user_id=u.id WHERE u.id = ?');
    export const findProfileById = (id: string) => findUserProfileByIdStmt.get(id);

const doesUserExistStmt = db.prepare('SELECT EXISTS(SELECT 1 FROM users WHERE id = ?)');
export const doesUserExist = (id: string) => doesUserExistStmt.get(id);