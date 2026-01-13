import { count, info } from "console";
import { productsManager } from "../managers/products-managers.js";

class ProductController {
  constructor(manager) {
    this.manager = manager;
  }

getProducts = async (req, res) => {
    try {
        
        const { limit = 10, page = 1, sort, query } = req.query;

        
        const result = await productsManager.getAllProducts({ limit, page, sort, query });

        
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

        
        const createLink = (targetPage) => {
            if (!targetPage) return null;
            let link = `${baseUrl}?page=${targetPage}&limit=${limit}`;
            if (sort) link += `&sort=${sort}`;
            if (query) link += `&query=${query}`;
            return link;
        };

        
        res.json({
            count: result.totalDocs,
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: createLink(result.prevPage),
            nextLink: createLink(result.nextPage)
        });

    } catch (error) {
        res.status(500).json({ status: "error", payload: error.message });
    }
};
  createProduct = async (req, res)  => {
    try {
      const productData = req.body; 
      const newProduct = await this.manager.createProduct(productData); 
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  getProductById = async (req, res) => {
    try {
      const productId = req.params.id;    
      const product = await this.manager.getProductById(productId);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      } 
    } catch (error) {
      res.status(500).json({ error: error.message });
    } 
  }
  updateProduct = async (req, res) => {
    try { 
      const productId = req.params.id;
      const updateData = req.body; 
      const updatedProduct = await this.manager.updateProduct(productId, updateData); 
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  deleteProduct = async (req, res)  => {
    try {
      const productId = req.params.id;    
      const deletedProduct = await this.manager.deleteProduct(productId);
      if (deletedProduct) {
        res.status(200).json(deletedProduct);
      }
      else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    } 
  }
}
export const productController = new ProductController(productsManager);