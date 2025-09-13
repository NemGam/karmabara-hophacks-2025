import { Router } from "express";
import { getProfile } from "../controllers/user.controller";

const router = Router();

// router.get('/:id', ); //Get basic info
router.get('/:id/profile', getProfile);
// router.get('/:id/achievements',);
// router.post('/:id/achievements',);

export { router };