import { db } from '@/db';

const findByIdStmt = db.prepare(`SELECT * FROM achievements WHERE id = ?`);
export const findById = async (id: string) => {
    const achievement = await findByIdStmt.get(id);
    return achievement;
};

const selectAllStmt = db.prepare(`SELECT * FROM achievements`);
export const getAll = async () => {
    const achievements = selectAllStmt.all();
    return achievements;
};

export const findByUserId = async (userId: string, status: string) => {
    const base = `
    SELECT a.id, a.name, a.desc, a.icon_url, a.rarity,
           ua.completed_at 
    FROM achievements a
    LEFT JOIN user_achievements ua
      ON ua.achievement_id = a.id AND ua.user_id = ?
  `;
    const where =
        status === 'completed'
            ? 'WHERE ua.completed_at IS NOT NULL'
            : status === 'incomplete'
            ? 'WHERE ua.completed_at IS NULL'
            : '';
    const rows = db.prepare(`${base} ${where} ORDER BY a.name`).all(userId);
    return rows;
};
