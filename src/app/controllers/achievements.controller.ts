import { NextFunction, Request, Response } from 'express';
import { fetchAchievement, fetchAchievements } from '@services/achievements.service';
import { BadRequestError } from '../errors';

export const getAchievementById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        if (!id) throw new BadRequestError('id cannot be null');

        const achievement = await fetchAchievement(id);
        res.status(200).json(achievement);
    } catch (err) {
        next(err);
    }
};

export const getAchievements = async (req: Request, res: Response) => {
    const list = await fetchAchievements();
    res.status(200).json(list);
};
