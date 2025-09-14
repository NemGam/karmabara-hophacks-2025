import { findById, findByUserId, getAll } from '@repos/achievements.repo';
import { NotFoundError } from '../errors';

export const fetchAchievement = async (id: string) => {
    const achievement = await findById(id);
    if (!achievement) throw new NotFoundError(`Achievement with id=${id} does not exist`);
    return achievement;
};

export const fetchAchievements = async () => {
    const achievements = await getAll();
    return achievements;
};

export const fetchUserAchievements = async (id: string, status: string) => {
    const achievements = await findByUserId(id, status);
    return achievements;
}
