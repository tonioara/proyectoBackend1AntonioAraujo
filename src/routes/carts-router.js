import { Router } from "express";
import { cartController } from "../controller/carts-controller.js";

const router = Router();

router.post('/', cartController.createCart);
router.get('/:cid', cartController.getCartById);
router.post('/:cid/products', cartController.addProductToCart);
router.delete('/:cid/products/:pid', cartController.deleteProduct);
router.put('/:cid', cartController.updateCart);
router.put('/:cid/products/:pid', cartController.updateQuantity);
router.delete('/:cid', cartController.deleteAllProducts);

export default router;