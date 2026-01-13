import { ProductModel } from "../models/product-models.js";

class ProductsManager {
  constructor(model) {
    this.model = model; 


  }
  async getAllProducts({ limit = 10, page = 1, sort, query }) {
    let filter = {};
    if (query) {
        
        if (query === 'true' || query === 'false') {
            filter = { status: query === 'true' };
        } else {
            filter = { category: query }; 
        }
    }

    const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
        lean: true
    };

    return await this.model.paginate(filter, options);
}
  async getProductById(productId) {
    try {
      const product = await this.model.findById(productId).lean(); 
      return product;
    } catch (error) {
      throw new Error('Error retrieving product: ' + error.message);
    } 
  }
  async updateProduct(productId, updateData) {
    try {
      const updatedProduct = await this.model.findByIdAndUpdate(
        productId,
        updateData,
        { new: true } 
      );
      return updatedProduct;
    } catch (error) {
      throw new Error('Error updating product: ' + error.message);
    } 
  }
  async deleteProduct(productId) {
    try {
      const deletedProduct = await this.model.findByIdAndDelete(productId); 
      return deletedProduct;
    } catch (error) {
      throw new Error('Error deleting product: ' + error.message);
    } 
  }
} 
export const productsManager = new ProductsManager(ProductModel);