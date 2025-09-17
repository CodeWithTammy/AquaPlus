import mongoose from 'mongoose';


const AdminSignInSchema = new mongoose.Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
 
});

const AdminSignIn = mongoose.model("AdminSignIn", AdminSignInSchema);

export default AdminSignIn;