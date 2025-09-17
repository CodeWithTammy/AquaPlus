import mongoose from 'mongoose';

const ServiceDetailsSchema = new mongoose.Schema({
    bannerimg: String,
    title:String,
    bannertext: String,
    aboutservice: String,
    subtext: String,
    whatsincluded:Array,
    whythisservice: Array,
    faq:Array,

    
});

const ServiceDetails = mongoose.model("ServiceDetails", ServiceDetailsSchema);

export default ServiceDetails;