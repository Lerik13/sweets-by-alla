import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	images: {
		type: [String],
		required: false,
	},
	category: {
		type: String,
		required: true,
		default: 'cake',
	},
	description: {
		type: String,
		required: false,
	},
	ingredients: {
		type: String,
		required: false,
	},
	rating: {
		type: Number,
		required: true,
		default: 0,
	},
}, {
	timestamps: true,
});

const categorySchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	name: {
		type: String,
		required: true,
	},
	order: {
		type: Number,
		required: true,
		default: 0,
	},
}, {
	timestamps: true,
});

const heroSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	title: {
		type: String,
		required: false,
	},
	image: {
		type: String,
		required: true,
	},
	order: {
		type: Number,
		required: true,
		default: 0,
	},
}, {
	timestamps: true,
});

const reviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	comment: {
		type: String,
		required: false,
	},
	image: {
		type: String,
		required: true,
	},
	order: {
		type: Number,
		required: true,
		default: 0,
	},
}, {
	timestamps: true,
});


const Product = mongoose.model("Product", productSchema);
const Category = mongoose.model("Category", categorySchema);
const Hero = mongoose.model("Hero", heroSchema);
const Review = mongoose.model("Review", reviewSchema);

export { Product, Category, Hero, Review };