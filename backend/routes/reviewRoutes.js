import express from 'express';
const router = express.Router();
import { 
	getReviews,
	getReviewById,
	createReview,
	updateReview,
	deleteReview
} from '../controllers/reviewController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/')
	.get(getReviews)
	.post(protect, admin, createReview);
router.route('/:id')
	.get(checkObjectId, getReviewById)
	.put(protect, admin, checkObjectId, updateReview)
	.delete(protect, admin, checkObjectId, deleteReview);

export default router;