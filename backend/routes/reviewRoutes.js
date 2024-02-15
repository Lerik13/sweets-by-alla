import express from 'express';
const router = express.Router();
import { 
	getReviews,
	getReviewById,
	createReview,
	updateReview,
	deleteReview
} from '../controllers/reviewController.js';
import { protect, admin, editor } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/')
	.get(getReviews)
	.post(protect, admin, editor, createReview);
router.route('/:id')
	.get(checkObjectId, getReviewById)
	.put(protect, admin, editor, checkObjectId, updateReview)
	.delete(protect, admin, editor, checkObjectId, deleteReview);

export default router;