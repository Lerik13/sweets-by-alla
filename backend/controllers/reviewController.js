
import asyncHandler from '../middleware/asyncHandler.js';
import { Review } from '../models/productModel.js';

// @desc		Fetch all reviews
// @route		GET /api/reviews
// @access	Public
const getReviews = asyncHandler(async (req, res) => {
	const reviews = await Review.find({ approved: true }).sort({order: 1}); //.limit(10);
	res.json(reviews);
});

// @desc		Fetch a review
// @route		GET /api/reviews/:id
// @access	Public
const getReviewById = asyncHandler(async (req, res) => {
	const review = await Review.findById(req.params.id);
	
	if (review){
		return res.json(review);
	} else {
		res.status(404);
		throw new Error('Resource not found')
	}
});

// @desc		Create a review
// @route		POST /api/reviews
// @access	Private/Admin
const createReview = asyncHandler(async (req, res) => {
	const order = req.body.order || Number(await Hero.find({}).sort({order: -1}).limit(1)) + 1;

	const review = new Review({
		image: '/images/sample.jpg',
		name: '',
		title: '',
		comment: '',
		order
	});

	const createdReview = await review.save();
	res.status(201).json(createdReview);
})
	
// @desc		Update a review
// @route		PUT /api/reviews/:id
// @access	Private/Admin
const updateReview = asyncHandler(async (req, res) => {
	const { image, name, title, comment, order, approved } = req.body;

	const review = await Review.findById(req.params.id);

	if (category) {
		review.image = image;
		review.name = name;
		review.title = title;
		review.comment = comment;
		review.order = order;
		review.approved = approved;

		const updatedReview = await review.save();
		//res.status(200).json(updatedProduct);
		res.json(updatedReview);
	} else {
		res.status(404);
		throw new Error('Resource not found')
	}
});

// @desc		Delete a review
// @route		DELETE /api/reviews/:id
// @access	Private/Admin
const deleteReview = asyncHandler(async (req, res) => {
	const review = await Review.findById(req.params.id);

	if (review) {
		await Review.deleteOne({ _id: review._id });
		res.status(200).json({ message: 'Review deleted' });
	} else {
		res.status(404);
		throw new Error('Resource not found')
	}
});

export {
	getReviews,
	getReviewById,
	createReview,
	updateReview,
	deleteReview
}