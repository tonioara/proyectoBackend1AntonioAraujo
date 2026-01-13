import {connect } from 'mongoose';
import 'dotenv/config';


//const MONGO_URL = 'mongodb://localhost:27017/banckendi-coderhouse';
const MONGO_URL= process.env.MONGO_URL ||  process.env.MONGO_URL_TEST;  

export const connectMongoDB = async () => {
    try {
        await connect(MONGO_URL);   
        if (MONGO_URL.includes('mongodb+srv')) {
            console.log('🚀 Conectado exitosamente a: MONGODB ATLAS (Nube)');
        } else {
            console.log('🏠 Conectado exitosamente a: MONGODB LOCAL (Compass)');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }     
};  

