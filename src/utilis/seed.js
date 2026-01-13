import { ProductModel } from '../models/product-models.js';
import { connectMongoDB } from '../config/connection.js';
import 'dotenv/config';

const generateProducts = () => {
    const products = [];
    const categories = ['Electronica', 'Hogar', 'Computacion', 'Audio'];
    
    for (let i = 1; i <= 50; i++) {
        products.push({
            name: `Producto de Prueba ${i}`,
            description: `Esta es la descripción detallada del producto nro ${i}, ideal para pruebas de rendimiento.`,
            price: Math.floor(Math.random() * (10000 - 500 + 1)) + 500, // Precio aleatorio entre 500 y 10000
            stock: Math.floor(Math.random() * 50) + 1,
            category: categories[Math.floor(Math.random() * categories.length)],
            status: i % 5 !== 0, // La mayoría true, algunos false para probar filtros de disponibilidad
            thumbnails: []
        });
    }
    return products;
};

const seedDB = async () => {
    try {
        // 1. Conectamos a Atlas
        await connectMongoDB();

        // 2. Limpiamos la colección para no duplicar datos cada vez que pruebes
        console.log('--- Limpiando base de datos ---');
        await ProductModel.deleteMany({});

        // 3. Generamos y cargamos los 50 productos
        const fakeProducts = generateProducts();
        await ProductModel.insertMany(fakeProducts);

        console.log('✅ ¡Éxito! Se han cargado 50 productos en MongoDB Atlas.');
        console.log('Ahora puedes ir a /api/products para verificar la paginación.');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error cargando los datos:', error);
        process.exit(1);
    }
};

seedDB();