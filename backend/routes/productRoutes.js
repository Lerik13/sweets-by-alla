import express from 'express';
const router = express.Router();
import {
	getAllProducts,
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	getTopProducts,
	getProductsByCategory,
	getProductsByCategoryForCatalog
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/')
	.get(getProducts)
	.post(protect, admin, createProduct);
router.get('/all', getAllProducts);
router.get('/top', getTopProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/catalog/:category', getProductsByCategoryForCatalog);
router.route('/:id')
	.get(checkObjectId, getProductById)
	.put(protect, admin, checkObjectId, updateProduct)
	.delete(protect, admin, checkObjectId, deleteProduct);

export default router;