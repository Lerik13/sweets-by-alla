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
	getProductsByCategoryForCatalog,
	getRandomProducts
} from '../controllers/productController.js';
import { protect, admin, editor } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/')
	.get(getProducts)
	.post(protect, admin, editor, createProduct);
router.get('/all', getAllProducts);
router.get('/top', getTopProducts);
router.get('/random', getRandomProducts);
router.get('/catalog/:category', getProductsByCategoryForCatalog);
router.route('/:id')
	.get(checkObjectId, getProductById)
	.put(protect, admin, editor, checkObjectId, updateProduct)
	.delete(protect, admin, editor, checkObjectId, deleteProduct);

export default router;