// src/routes/views-router.js
import { Router } from "express";
import { productsManager } from "../managers/products-managers.js";

import { cartsManager } from "../managers/carts-managers.js";

const router = Router();


router.get('/products', async (req, res) => {
       const { limit = 10, page = 1, sort, query } = req.query;
       const result = await productsManager.getAllProducts({ limit, page, sort, query });

res.render('products', {
    products: result.docs,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage, 
    nextPage: result.nextPage,
    prevPage: result.prevPage,
    page: result.page,
    totalPages: result.totalPages,
    nextLink: result.hasNextPage ? `/products?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null,
    prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null
});
});

router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartsManager.getCartById(cid);
    
    res.render('cart', {
        cartId: cart._id,
        products: cart.products 
    });
});


router.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsManager.model.findById(pid).lean();

        if (!product) {
            return res.status(404).render('error', { message: 'Producto no encontrado' });
        }  

        res.render('product-detail', { product });
    } catch (error) {
        res.status(500).send("Error al cargar el detalle");
    }
});

export default router;