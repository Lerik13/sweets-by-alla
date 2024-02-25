
import asyncHandler from '../middleware/asyncHandler.js';
import { Product } from '../models/productModel.js';

// @desc		Fetch all products
// @route		GET /api/products
// @access	Public
const getAllProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc		Fetch all products
// @route		GET /api/products
// @access	Public
const getProducts = asyncHandler(async (req, res) => {
	const pageLimit = Number(process.env.PAGINATION_LIMIT) // pagination: how many products show in 1 page
	const page = Number(req.query.page) || 1;
	const category = req.query?.category || "";
	let sortBy = 'category order';
	if (req.query?.sortBy) {
		switch (req.query?.sortBy) {
			case 'order': sortBy = 'category order'; break;
			case 'name': sortBy = 'name'; break;
			case 'id': sortBy = '_id'; break;
		}
	}

	const keyword = req.query.keyword
		? { name: { $regex: req.query.keyword, $options: 'i' } }
		: {}
	
	let count;

	if (category === "") { // category not defined
		count = await Product.countDocuments({...keyword});

		const products = await Product.find({...keyword})
			.sort(sortBy)
			.limit(pageLimit)
			.skip(pageLimit * (page - 1));
		res.json(products);
		//res.json({ products, page, pages: Math.ceil(count / pageLimit) });
	} else {
		count = await Product.countDocuments({ category: category, ...keyword });
	
		const products = await Product.find({ category: category, ...keyword })
			.sort(sortBy)
			.limit(pageLimit)
			.skip(pageLimit * (page - 1));
		res.json(products);
		//res.json({ products, page, pages: Math.ceil(count / pageLimit) });
	}
});

// @desc		Fetch a product
// @route		GET /api/products/:id
// @access	Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	
	if (product){
		return res.json(product);
	} else {
		res.status(404);
		throw new Error('Resource not found')
	}
});

// @desc		Create a product
// @route		POST /api/products
// @access	Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		user: req.user._id,
		name: 'Sample cake',
		image: '/images/sample.jpg',
		images: [],
		category: 'cake',
		description: 'write down your description please...',
		ingredients: 'salt, sugar, flour, add more...',
		order: '99'
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
})
	
// @desc		Update a product
// @route		PUT /api/products/:id
// @access	Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const { name, image, images, category, countInStock, description, ingredients, rating } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.image = image;
		product.images = images;
		product.category = category;
		product.description = description;
		product.ingredients = ingredients;
		product.rating = rating;

		const updatedProduct = await product.save();
		//res.status(200).json(updatedProduct);
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Resource not found')
	}
});

// @desc		Delete a product
// @route		DELETE /api/products/:id
// @access	Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await Product.deleteOne({ _id: product._id });
		res.status(200).json({ message: 'Product deleted' });
	} else {
		res.status(404);
		throw new Error('Resource not found')
	}
});

// @desc		Get top rated products
// @route		GET /api/products/top
// @access	Public
const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);
	
	res.status(200).json(products);
});

// @desc		Get products by category for "Catalog" on main page
// @route		GET /api/products/category/:category
// @access	Public
const getProductsByCategoryForCatalog = asyncHandler(async (req, res) => {
	const category = req.params.category;

	const products = await Product.find({ category: category }).sort({ order: 1 }).limit(5);
	
	res.status(200).json(products);
});

// @desc		Get 5 random products for section "You might also like"
// @route		GET /api/products/random/
// @access	Public
const getRandomProducts = asyncHandler(async (req, res) => {
	const count = Number(process.env.RANDOM_PRODUCTS);

	const products = await Product.aggregate([{ $sample: {size: count} }]);
	
	res.status(200).json(products);
});


export {
	getAllProducts,
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	getTopProducts,
	getProductsByCategoryForCatalog,
	getRandomProducts
}