import mongoose from 'mongoose';
import validator from 'validator';



let PdfDocumentSchema = new mongoose.Schema({
    person_id:{type : mongoose.Types.ObjectId , ref: "Persons" ,  required: true },
    pdfData: { type: Buffer, required: true }, 
      user_id:{type : mongoose.Types.ObjectId ,ref:"User"},
      token:{type: String}
  });


  export default mongoose.model('PdfDocument', PdfDocumentSchema)