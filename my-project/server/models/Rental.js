import mongoose from 'mongoose';


const RentalSchema = new mongoose.Schema({
    desc: String,
    image: String,
    price: String,
    name: String,
    amount: Number,
});

const Rental = mongoose.model("Rental", RentalSchema);

export default Rental;