import mongoose from 'mongoose';
import validator from 'validator';



let personSchema = new mongoose.Schema({
    name: {type :String,maxlength: 20},
    prenom:{type:String,maxlength:40},
    birth:{type:String},
    lieu:{type:String},
    nationality:{type:String},
    sexe:{type:String},
    tel:{type:String},
    profession:{type:String},
    address:{type:String},
    piece:{type:String},
    date_emission:{type:String},
    date_expiration:{type:String},
    date_entrance:{type:String},
    pdfDocument:{type: String},
    home_id:[{type : mongoose.Types.ObjectId ,ref:"Homes"}],
    email: {type: String,required: true,lowercase: true,
        validate: (value) => {
          return validator.isEmail(value)}},
      date: { type: Date, default: Date.now },
      rentals:[{type : mongoose.Types.ObjectId ,ref:"Rent"}],
      user_id:{type : mongoose.Types.ObjectId ,ref:"User"},
      token:{type: String}
  });


  export default mongoose.model('Persons', personSchema)