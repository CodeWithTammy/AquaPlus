import mongoose from 'mongoose';


const ProductsSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    price:String,
});

module.exports = mongoose.model('Products', ProductsSchema);