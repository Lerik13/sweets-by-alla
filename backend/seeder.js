import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';
import categories from './data/categories.js';
import heros from './data/hero.js';
import reviews from './data/reviews.js';
import User from './models/userModel.js';
import { Product, Category, Hero, Review } from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await Category.deleteMany();
		await Hero.deleteMany();
		await Review.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		const createdUsers = await User.insertMany(users);
		const adminUser = createdUsers[0]._id;

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		})
		await Product.insertMany(sampleProducts);

		const sampleCategories = categories.map((category) => {
			return { ...category, user: adminUser };
		})
		await Category.insertMany(sampleCategories);
		
		const sampleHeros = heros.map((hero) => {
			return { ...hero, user: adminUser };
		})
		await Hero.insertMany(sampleHeros);

		const sampleReviews = reviews.map((review) => {
			return { ...review };
		})
		await Review.insertMany(sampleReviews);

		console.log('Data Imported!'.green.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1);
	}
}

const destroyData = async () => {
	try {
		await Category.deleteMany();
		await Hero.deleteMany();
		await Review.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();
		
		console.log('Data Destroyed!'.red.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1);
	}
};

//console.log(process.argv[2]) 
if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
