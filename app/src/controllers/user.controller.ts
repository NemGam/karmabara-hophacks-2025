import { getUserProfile, getUser as getUserData } from '../services/user.service';

export const getUser = async (req, res) => {
    if (!req.params.id) throw new Error('No id in the request');
    const id = req.params.id;
    const data = await getUserData(id);
    if (data) res.status(200).json(data);
    else res.status(404).json({ message: 'user not found' });
};

export const getProfile = async (req, res) => {
    if (!req.params.id) throw new Error('No id in the request');
    const id = req.params.id;
    const profile = await getUserProfile(id);
    if (profile) res.status(200).json(profile);
    else res.status(404).json({ message: 'user not found' });
};

export const getAchievements = async (req, res) => {};
