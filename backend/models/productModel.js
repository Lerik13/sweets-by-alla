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
	order: {
		type: Number,
		required: true,
		default: 9999,
	}
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
		default: 999,
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
		default: 999,
	},
}, {
	timestamps: true,
});

const reviewSchema = new mongoose.Schema({
	image: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: false,
	},
	title: {
		type: String,
		required: false,
	},
	comment: {
		type: String,
		required: false,
	},
	order: {
		type: Number,
		required: true,
		default: 999,
	},
	approved: {
		type: Boolean,
		required: true,
		default: false,
	},
}, {
	timestamps: true,
});


const Product = mongoose.model("Product", productSchema);
const Category = mongoose.model("Category", categorySchema);
const Hero = mongoose.model("Hero", heroSchema);
const Review = mongoose.model("Review", reviewSchema);

export { Product, Category, Hero, Review };