import { cartsManager } from "../managers/carts-managers.js";

class CartController {
  constructor(manager) {
    this.manager = manager;
  }

  createCart = async (req, res) => {
    try {
      const newCart = await this.manager.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getCartById = async (req, res) => {
    try {
      const { cid } = req.params;
        const cart = await this.manager.getCartById(cid);
      cart ? res.json(cart) : res.status(404).json({ error: 'Cart not found' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }   

  addProductToCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const { productId, quantity } = req.body;
      const updatedCart = await this.manager.addProductToCart(cid, productId, quantity || 1);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  deleteProduct = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const result = await this.manager.removeProductFromCart(cid, pid);
      res.json({ status: "success", payload: result });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  updateCart = async (req, res) => {
    try {
      const { products } = req.body;
      const result = await this.manager.updateCart(req.params.id, products);
      res.json({ status: "success", payload: result });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  updateQuantity = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const result = await this.manager.updateProductQuantity(cid, pid, quantity);
      res.json({ status: "success", payload: result });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  deleteAllProducts = async (req, res) => {
    try {
      const cartId = req.params.cid || req.params.id
      const result = await this.manager.clearCart(cartId);
      res.json({ status: "success", payload: result });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }
}

export const cartController = new CartController(cartsManager);