import { Router } from "express";
import { getAchievementById, getAchievements } from "@controllers/achievements.controller";

const router = Router();

router.get('/', getAchievements); //Get all achievements
router.get('/:id', getAchievementById); //Get one achievement

export { router };