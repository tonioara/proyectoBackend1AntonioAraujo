import express from 'express';
import { connectMongoDB } from './config/connection.js';
import productRouter from './routes/product-router.js';
import cartRouter from './routes/carts-router.js';
import viewsRouter from './routes/views-router.js';
import handlebars from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';



const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', viewsRouter);



connectMongoDB().then(() => {
  console.log('base de datos conectada');
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
});

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});