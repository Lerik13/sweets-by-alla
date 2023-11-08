
import asyncHandler from '../middleware/asyncHandler.js';
import { Hero } from '../models/productModel.js';

// @desc		Fetch all hero blocks
// @route		GET /api/hero
// @access	Public
const getHero = asyncHandler(async (req, res) => {
	const hero = await Hero.find({}).sort({order: 1});
	res.json(hero);
});

// @desc		Fetch a hero block
// @route		GET /api/hero/:id
// @access	Public
const getHeroById = asyncHandler(async (req, res) => {
	const hero = await Hero.findById(req.params.id);
	
	if (hero){
		return res.json(hero);
	} else {
		res.status(404);
		throw new Error('Resource not found')
	}
});

// @desc		Create a hero block
// @route		POST /api/hero
// @access	Private/Admin
const createHero = asyncHandler(async (req, res) => {
		const order = req.body.order || Number(await Hero.find({}).sort({order: -1}).limit(1)) + 1;

	const hero = new Hero({
		user: req.user._id,
		title: '',
		image: '/images/sample.jpg',
		order
	});

	const createdHero = await hero.save();
	res.status(201).json(createdHero);
})
	
// @desc		Update a hero block
// @route		PUT /api/hero/:id
// @access	Private/Admin
const updateHero = asyncHandler(async (req, res) => {
	const { title, image, order } = req.body;

	const hero = await Hero.findById(req.params.id);

	if (category) {
		hero.title = title;
		hero.image = image;
		hero.order = order;

		const updatedHero = await hero.save();
		//res.status(200).json(updatedProduct);
		res.json(updatedHero);
	} else {
		res.status(404);
		throw new Error('Resource not found')
	}
});

// @desc		Delete a hero block
// @route		DELETE /api/hero/:id
// @access	Private/Admin
const deleteHero = asyncHandler(async (req, res) => {
	const hero = await Hero.findById(req.params.id);

	if (hero) {
		await Hero.deleteOne({ _id: hero._id });
		res.status(200).json({ message: 'Hero block deleted' });
	} else {
		res.status(404);
		throw new Error('Resource not found')
	}
});

export {
	getHero,
	getHeroById,
	createHero,
	updateHero,
	deleteHero
}