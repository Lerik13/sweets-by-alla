import express from 'express';
const router = express.Router();
import { 
	getHero,
	getHeroById,
	createHero,
	updateHero,
	deleteHero
} from '../controllers/heroController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/')
	.get(getHero)
	.post(protect, admin, createHero);
router.route('/:id')
	.get(checkObjectId, getHeroById)
	.put(protect, admin, checkObjectId, updateHero)
	.delete(protect, admin, checkObjectId, deleteHero);

export default router;