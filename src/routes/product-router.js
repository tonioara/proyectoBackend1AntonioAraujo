import { Router } from "express"; 
import { productController } from "../controller/product-controller.js";


const router = Router();

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;  