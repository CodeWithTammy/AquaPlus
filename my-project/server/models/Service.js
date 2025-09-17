import mongoose from 'mongoose';


const ServiceSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String, 
});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;