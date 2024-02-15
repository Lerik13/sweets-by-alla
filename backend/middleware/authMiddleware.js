import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
	let token;

	// Read the JWT from the cookie
	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.userId).select('-password');
			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error('Not authorized, token failed')
		}
	} else {
		res.status(401);
		throw new Error('Not authorized, no token')
	}
})

// Admin Middleware
const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized as admin')

	}
}

// Editor Middleware
const editor = (req, res, next) => {
	if (req.user && req.user.isEditor) {
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized as editor')

	}
}

export { protect, admin, editor }