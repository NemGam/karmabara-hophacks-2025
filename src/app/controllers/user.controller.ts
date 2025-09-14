import { NextFunction, Request, Response } from 'express';
import { getUserProfile, getUser as getUserData } from '@services/user.service';
import { BadRequestError } from '../errors';
import { fetchUserAchievements } from '../services/achievements.service';

export const getUser = async (req: Request, res: Response) => {
    if (!req.params.id) throw new Error('No id in the request');
    const id = req.params.id;
    const data = await getUserData(id);
    if (data) res.status(200).json(data);
    else res.status(404).json({ message: 'user not found' });
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        if (!id) throw new BadRequestError('id cannot be null');

        const profile = await getUserProfile(id);
        res.status(200).json(profile);
    } catch (err) {
        next(err);
    }
};

export const getAchievements = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try{
        if (!id) throw new BadRequestError('id cannot be null');

        const achievements = await fetchUserAchievements(id, req.query.status);
        res.status(200).json(achievements);
    } catch (err){
        next(err);
    }
};
export const grantAchievement = async (req: Request, res: Response) => {};
