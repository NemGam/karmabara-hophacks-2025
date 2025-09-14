import { Router } from "express";
import { getProfile, getUser, getAchievements, getBestUsers} from "@controllers/user.controller";

const router = Router();

// router.get('/', getBestUsers)
router.get('/:id', getUser); //Get basic info
router.get('/:id/profile', getProfile);
router.get('/:id/achievements', getAchievements);

export { router };