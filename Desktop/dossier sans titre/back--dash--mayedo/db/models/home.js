import mongoose from 'mongoose';
import validator from 'validator';



let homeSchema = new mongoose.Schema({
      // nombres:{type:String},
      nameHome:{type:String},
    categorie:{type:String},
    addressHome:{type:String},
    // img:{type:String},
    // images:[{type:String}],
    rent:{type:String},
    description:[{type:String}],
    guarantee:{type:String},
    superficie:{type:String},
    imageUrl: [{ type: String, required: true }], // Array of file paths
    person_id:{type : mongoose.Types.ObjectId , ref: "Persons"},
    user_id:{type : mongoose.Types.ObjectId ,ref: "User"},
    token:{type: String},
    createdAt: {type: Date,default: Date.now}
  });


  export default mongoose.model('Homes', homeSchema)