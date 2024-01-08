
import asyncHandler from '../middleware/asyncHandler.js';
import { Category } from '../models/productModel.js';

// @desc		Fetch all categories
// @route		GET /api/categories
// @access	Public
const getCategories = asyncHandler(async (req, res) => {
	const categories = await Category.find({}).sort({order: 1});
	res.json(categories);
});

// @desc		Create a category
// @route		POST /api/categories
// @access	Private/Admin
const createCategory = asyncHandler(async (req, res) => {
	const name = req.body.name || 'new category';
	const order = req.body.order || Number(await Category.find({}).sort({order: -1}).limit(1)) + 1;

	const category = new Category({
		user: req.user._id,
		name,
		description,
		order
	});

	const createdCategory = await category.save();
	res.status(201).json(createdCategory);
})
	
// @desc		Update a category
// @route		PUT /api/categories/:id
// @access	Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
	const { name, description, order } = req.body;

	const category = await Category.findById(req.params.id);

	if (category) {
		category.name = name;
		category.description = description;
		product.order = order;

		const updatedCategory = await category.save();
		//res.status(200).json(updatedProduct);
		res.json(updatedCategory);
	} else {
		res.status(404);
		throw new Error('Resource not found')
	}
});

// @desc		Delete a category
// @route		DELETE /api/categories/:id
// @access	Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id);

	if (category) {
		await Category.deleteOne({ _id: category._id });
		res.status(200).json({ message: 'Category deleted' });
	} else {
		res.status(404);
		throw new Error('Resource not found')
	}
});

export {
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory
}