import { Schema, model} from 'mongoose';

const cartSchema = new Schema({ 
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },    
            quantity: { type: Number, required: true, default: 1 }
        }
    ]
}); 
cartSchema.pre(['find', 'findOne', 'findById'], function() {
    this.populate('products.productId');
});
export const CartModel = model('carts', cartSchema);