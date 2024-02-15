import express from 'express';
const router = express.Router();
import { 
	getHero,
	getHeroById,
	createHero,
	updateHero,
	deleteHero
} from '../controllers/heroController.js';
import { protect, admin, editor } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/')
	.get(getHero)
	.post(protect, admin, editor, createHero);
router.route('/:id')
	.get(checkObjectId, getHeroById)
	.put(protect, admin, editor, checkObjectId, updateHero)
	.delete(protect, admin, editor, checkObjectId, deleteHero);

export default router;