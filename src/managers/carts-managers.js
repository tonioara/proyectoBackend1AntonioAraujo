import { CartModel } from "../models/cart-models.js";

class CartsManager {
  constructor(model) {
    this.model = model;
  }

  async createCart() {
    try {
      const newCart = await this.model.create({ products: [] });
      return newCart;
    } catch (error) {
      throw new Error('Error creating cart: ' + error.message);
    }
  }
async getCartById(cartId) {
    try {
        const cart = await this.model.findById(cartId).populate('products.productId').lean();
        
        if (!cart) return null;
        return cart; 
    } catch (error) {
        throw new Error('Error al obtener el carrito: ' + error.message);
    }
}

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) throw new Error('Cart not found');
      const existingProduct = cart.products.find(
    (item) => item.productId._id.toString() === productId 
    || item.productId.toString() === productId 
);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      } 
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error adding product: ' + error.message);
    }
  }
  // async removeProductFromCart(cartId, productId) {
    // try {
      // const cart = await this.model.findById(cartId);
      // if (!cart) throw new Error('Cart not found');
      // cart.products = cart.products.filter(item => item.productId.toString() !== productId);
      // await cart.save();
      // return cart;
    // } catch (error) {
      // throw new Error('Error removing product: ' + error.message);
    // }
  // }
  async removeProductFromCart(cartId, productId) {
    const cart = await this.model.findById(cartId);
    
    if (!cart) {
        throw new Error('Carrito no encontrado');
    }
    cart.products = cart.products.filter(item => {
        
        const idEnCarrito = item.productId._id 
            ? item.productId._id.toString() 
            : item.productId.toString();
            
        return idEnCarrito !== productId;
    });

    await cart.save();
    
    return await this.model.findById(cartId).populate('products.productId').lean();
}

  async updateCart(cartId, productsArray) {
    try {
      const cart = await this.model.findByIdAndUpdate(
        cartId,
        { products: productsArray },
        { new: true }
      ).populate('products.productId').lean();
      return cart;
    } catch (error) {
      throw new Error('Error updating cart: ' + error.message);
    }
  }
  async updateProductQuantity(cartId, productId, newQuantity) {
    try {
        const cart = await this.model.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');
        const productIndex = cart.products.findIndex(item => {
            const idEnCarrito = item.productId._id ? item.productId._id.toString() : item.productId.toString();
            return idEnCarrito === productId;
        });

        if (productIndex !== -1) {
           
            cart.products[productIndex].quantity = newQuantity;
            
            await cart.save();
            return await this.model.findById(cartId).populate('products.productId').lean();
        } else {
            throw new Error('El producto no existe en el carrito');
        }
    } catch (error) {
        throw new Error('Error al actualizar cantidad: ' + error.message);
    }
}
async clearCart(id) {
    try {
        
        const updatedCart = await this.model.findByIdAndUpdate(
            id, 
            { $set: { products: [] } }, // Vaciamos los productos
            { new: true } // Para que devuelva el carrito YA vacío
        );
        return updatedCart;
    } catch (error) {
        throw new Error("Error al vaciar el carrito: " + error.message);
    }
}
}

export const cartsManager = new CartsManager(CartModel);