import express from 'express';
import Database from './db/database.js';
import User from './db/models/user.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import Persons from './db/models/persons.js';
import Rent from './db/models/rent.js';
// import auth from './middlewares/auth.js'
import Homes from './db/models/home.js';
import 'dotenv/config';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import session from 'express-session';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import PdfDocument from './db/models/PdfDocument.js';

export const maxDuration=300;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(cors({ credentials: true}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static('/Users/doumbisss/Desktop/dossier sans titre/back--dash--mayedo/uploads'));
// app.use(connect.session({ secret: 'keyboard cat', cookie: { maxAge: 1000 }}))

const database = new Database();
const userImagesDir = path.join(__dirname, 'uploads/userImages');
if (!fs.existsSync(userImagesDir)){
    fs.mkdirSync(userImagesDir, { recursive: true });
}
const userPDFDir = path.join(__dirname, 'uploads/userPDF');
if (!fs.existsSync(userPDFDir)){
    fs.mkdirSync(userPDFDir, { recursive: true });
}

Database.connect();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image') {
      cb(null, userImagesDir); // Destination for user images
    } 
    if (file.fieldname === 'pdfDocument') {
      cb(null, userPDFDir); // Destination for user images
    }
    else {
      cb(null, path.join(__dirname, 'uploads/')); // Default destination for other uploads
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with current timestamp
  }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



let auth =(req,res,next)=>{
  let token =req.cookies.auth;
  User.findByToken(token,(err,user)=>{
      if(err) throw err;
      if(!user) return res.json({
          error :true
      });
      req.token= token;
      req.user=user;
      next();
  })
}


app.post('/register', upload.single('image'), function (req, res) {
  console.log(req.file); // Check if the file is being uploaded
  const { name, prenom, numero, address, username, email, password, password2 } = req.body;
  const image = req.file; // Access uploaded file

  if (!image) {
      return res.status(400).json({ message: "No image file uploaded" });
  }

  if (password !== password2) {
      return res.status(400).json({ message: "Passwords do not match" });
  }

  User.findOne({ email }, function (err, user) {
      if (user) {
          return res.status(400).json({ auth: false, message: "Email already exists" });
      }
      const newUser = new User({
          name,
          prenom,
          numero,
          address,
          username,
          email,
          password,
          password2,
          image: image.path // Save the path of the uploaded image
      });

      newUser.save((err, doc) => {
          if (err) {
              console.log(err);
              return res.status(400).json({ success: false });
          }
          res.json(doc);
      });
  });
});

app.post('/login', function(req,res){

            User.findOne({'email':req.body.email},function(err,user){
                if(!user) return res.json({isAuth : false, message : 'Auth failed ,email not found'});
        
                user.comparepassword(req.body.password,(err,isMatch)=>{
                    if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
        
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.json({
                        isAuth : true,
                        token : user.token,
                        id : user._id,
                        email : user.email,
                        name: user.name,
                        numero:user.numero,
                        prenom: user.prenom,
                        address: user.address,
                        username: user.username,
                        image:user.image
                    });
                });    
            });
          });
       // }
    });


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(401)
      }
      req.user = user;
      next();
    });
  }
  
  app.get('/api/me', authenticateToken, (req, res) => {
    res.send(req.user);
  });

app.get('/profile',auth,function(req,res){
  res.json({
      isAuth: true,
      id: req.user._id,
      email: req.user.email,
      name: req.user.name
      
  })
})
//logout user
app.get('/logout',auth,function(req,res){
  req.user.deleteToken(req.token,(err,user)=>{
      if(err) return res.status(400).send(err);
      res.sendStatus(200);
  });
});
app.get('/users',function(req,res){
                        User.find({}).populate("person_id")
                        .then((doc)=>{res.send(doc)})
                        .catch(err => {console.log(err);      
                            })
                          })
app.get('/users/:id',function(req,res){
                                User.findById((req.params.id),(req.body)).populate("person_id")
                                .then((doc)=>{res.send(doc)})
                                .catch(err => {console.log(err);      
                                    })
                            })

app.put('/updateUser/:id',(req,res) => { 
   User.findByIdAndUpdate((req.params.id),(req.body))
    .then((doc)=>{res.send(doc)})
    .catch(err => {console.log(err);      
      })
})  

 app.delete('/users/:id', async (req, res) => {
       try {
          const userId = req.params.id;
                          
          const user = await User.findById(userId).populate('person_id');
               if (!user) {
                  return res.status(404).json({ success: false, message: 'User not found' });
                }
                          
                                  // Delete all rents associated with the user
            await Rent.deleteMany({ person_id: { $in: user.person_id } });
                          
                                  // Delete the user
            await User.findByIdAndDelete(userId);
                          
             res.status(200).json({
               success: true,
                 message: 'User and associated renters deleted successfully'
                 });
                } catch (error) {
                 console.error('Error deleting user:', error);
                   res.status(500).json({ success: false, message: 'Internal server error', error });
                              }
                          });

app.get('/persons', (req,res) => { 
   Persons.find({}).populate("rentals").populate("home_id")
    .then((doc)=>{res.send(doc)})
     .catch(err => {console.log(err);      
         })
                            })

  app.post('/persons', upload.single('pdfDocument'), (req, res) => {
    const newPersonData = {
        ...req.body,
        pdfDocument: req.file ? req.file.path : null // Store the path to the uploaded file
    };
    
    const newPerson = new Persons(newPersonData);
    newPerson.save((err, doc) => {
        if (err) {
            console.error("Error saving new person:", err);
            return res.status(400).json({ success: false, message: "Error adding person", error: err });
        }
        User.updateOne({ "_id": doc.user_id }, { $push: { person_id: doc._id } })
            .then(() => {
                res.status(200).json({
                    success: true,
                    message: "Person added successfully",
                    dataPerson: doc
                });
            })
            .catch(err => {
                console.error("Error updating user with new person:", err);
                res.status(400).json({ success: false, message: "Error updating user", error: err });
            });
    });
});
        
app.get('/persons/:id',(req,res) => {
                                Persons.findById((req.params.id),(req.body)).populate("rentals").populate("home_id")
                                .then((doc)=>{res.send(doc)})
                                .catch(err => {console.log(err);      
                                    })
                            })
        
app.put('/person/:id',(req,res) => { 
          Persons.findByIdAndUpdate((req.params.id),(req.body))
            .then((doc)=>{res.send(doc)})
            .catch(err => {console.log(err);      
              })
 })

  app.delete('/deletePerson/:id', async (req, res) => {
                              try {
                                  const person_id = req.params.id;
                          
                                  // Find the tenant and delete their associated rents
                                  const tenant = await Persons.findById(person_id);
                                  if (!tenant) {
                                      return res.status(404).json({ success: false, message: 'Tenant not found' });
                                  }
                          
                                  // Delete all rents associated with this tenant
                                  await Rent.deleteMany({ person_id: person_id });
                          
                                  // Delete the tenant
                                  await Persons.findByIdAndDelete(person_id);
                          
                                  res.status(200).json({ success: true, message: 'Tenant and associated rents deleted successfully' });
                              } catch (err) {
                                  console.error(err);
                                  res.status(500).json({ success: false, message: 'Error deleting tenant and rents', error: err });
                              }
                          });

app.get('/rents', (req,res) => {
                              Rent.find({}).populate("person_id")
                              .then((doc)=>{res.send(doc)})
                              .catch(err => {console.log(err);      
                                  })
                          })
app.post('/rents',function(req,res){
                                const newRent= new Rent(req.body)
                                newRent.save((err,doc)=>{
                                  if(err) {console.log(err);
                                      return res.status(400).json({ success : false});}
                                      Persons.updateOne({"_id" : doc.person_id},{$push : {rentals : doc._id}})
                                      .then((doc)=> console.log(doc))
                                    res.status(200).json({
                                      succes:true,
                                      message : "Rent added with success",
                                      dataPayment : doc
                                  });
                              })
                            })

app.put('/updateRent/:id',(req,res) => { 
          Rent.findByIdAndUpdate((req.params.id),(req.body))
            .then((doc)=>{res.send(doc)})
             .catch(err => {console.log(err);      
               })
 })        
                          
app.get('/rents/:id',(req,res) => { 
                              Rent.findById((req.params.id),(req.body))
                              .then((doc)=>{res.send(doc)})
                              .catch(err => {console.log(err);      
                                  })
                          })

 app.delete('/deleteRent/:id',(req,res) => { 
      Rent.findByIdAndDelete((req.params.id),(req.body))
         // Rent.remove({"_id" : doc.person_id},{$push : {rentals : doc._id}})
            .then((doc)=>{res.send(doc)})
            .catch(err => {console.log(err);      
               })
})

app.get('/homes', (req, res) => {
  const userId = req.query.user_id; // Get user_id from query parameter
  Homes.find({ user_id: userId }).populate('person_id') // Find homes associated with this user_id
      .then(homes => res.json(homes))
      .catch(err => res.status(500).json({ error: 'Error fetching homes', details: err }));
});

app.post('/homes',function(req,res){
                          const homes= new Homes(req.body)
                          homes.save((err,doc)=>{
                            if(err) {console.log(err);
                                return res.status(400).json({ success : false});}
                                Persons.updateOne({"_id" : doc.person_id},{$push : {home_id : doc._id}})
                              .then((doc)=> console.log(doc))
                              res.status(200).json({
                                succes:true,
                                message : "homes added with success",
                                dataHomes : doc
                            });
                        })
                      })

 app.post('/add-home', upload.array('uploads', 10), (req, res) => {
                        const { nameHome, addressHome, superficie, rent, description, guarantee, categorie, user_id } = req.body; // Extract user_id from req.body
                        const files = req.files;
                    
                        if (!files || files.length === 0) {
                            return res.status(400).json({ error: 'No files uploaded' });
                        }
                    
                        const fileUrls = files.map(file => `/uploads/${file.filename}`);          
                        const newHome = new Homes({
                            nameHome,
                            addressHome,
                            superficie,
                            rent,
                            description,
                            guarantee,
                            categorie,
                            user_id, // Now using user_id extracted from req.body
                            imageUrl: fileUrls // Save the array of file paths
                        });
                    
                        newHome.save((err, doc) => {
                            if (err) {
                                console.log("Failed to save home:", err);
                                return res.status(400).json({ success: false, message: "Error adding home", error: err });
                            }        
                    
                            User.updateOne({ "_id": doc.user_id }, { $push: { home_id: doc._id } })
                                .then(() => {
                                    res.status(200).json({
                                        success: true,
                                        message: "Added successfully",
                                        dataHomes: doc
                                    });
                                })
                                .catch(err => {
                                    console.log("Error updating user with new home:", err);
                                    res.status(400).json({ success: false, message: "Error updating user", error: err });
                                });
                        });
});
                   

app.get('/homes/:id',(req,res) => { 
                        Homes.findById((req.params.id),(req.body)).populate("person_id")
                        .then((doc)=>{res.send(doc)})
                        .catch(err => {console.log(err);      
                            })
                    })

// Endpoint to get PDF by personId
app.get('/pdf/:id', async (req, res) => {
  try {
      const pdfDoc = await PdfDocument.findOne({ person_id: req.params.id });
      if (!pdfDoc) {
          return res.status(404).send("PDF not found");
      }
      res.set('Content-Type', 'application/pdf');
      res.send(pdfDoc.pdfData);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving PDF");
  }
});

// app.get('/homes/:id',(req,res) => { 
//                       Homes.aggregate([
//                         { $match: { status: "Payé" } },
//                         { $group: { "_id": doc.person_id, total: { $sum: Rent } } },
//                         { $sort: { total: -1 } }
//                       ])
//                   })



// Homes.create([
//                       {
//                           categorie:'Appartement',
//                           address: 'Riviera Golf 4',
//                           description:[
//                               'Superbe penthouse de 3 pièces à Riviera mondial béton avec vue sur la lagune ',
//                               'chambre principale autonome','salle d’eau extérieure à la seconde chambre',
//                               'toilette visiteur','séjour staffé','cuisine européenne','immense terrasse et immense cour'
//                           ],
//                           rent :'5500000',
//                           nombres:"2 pièces",
//                           img :"villa 01.jpg",
//                           images :[
//                               "villa 01.jpg",
//                               "villa 02.jpg",
//                               "villa 05.jpeg",
//                               "villa 07.jpeg",
//                           ],
//                       },
                  
//                       {
//                           categorie:'Villa',
//                           address: 'Riviera Golf 4 Beverly Hils',
//                           description:[
//                               'Superbe penthouse de 3 pièces à Riviera mondial béton avec vue sur la lagune ',
//                               'chambre principale autonome','salle d’eau extérieure à la seconde chambre',
//                               'toilette visiteur','séjour staffé','cuisine européenne','immense terrasse et immense cour'
//                           ],
//                           rent :'5500000',
//                           img :"villa 21.jpeg",
//                           nombres:"2 pièces",
//                           images :[
//                               "villa 21.jpeg",
//                               "villa 21.jpeg",
//                               "villa 22.jpeg",
//                               "villa 03.jpg",
//                           ],
//                       },
                  
//                       {
//                           categorie:'Villa',
//                           address: 'II Plateaux',
//                           description:[
//                               'Superbe penthouse de 3 pièces à Riviera mondial béton avec vue sur la lagune ',
//                               'chambre principale autonome','salle d’eau extérieure à la seconde chambre',
//                               'toilette visiteur','séjour staffé','cuisine européenne','immense terrasse et immense cour'
//                           ],
//                           rent :'5500000',
//                           img :"villa 50.jpg",
//                           nombres:"2 pièces",
//                           images :[
//                               "villa 50.jpg",
//                               "villa 51.jpg",
//                               "villa 52.jpg",
//                               "villa 53.jpg",
//                           ],
//                       },
                  
//                       {
//                           categorie:'Appartement',
//                           address: 'II Plateaux',
//                           description:[
//                               'Superbe penthouse de 3 pièces à Riviera mondial béton avec vue sur la lagune ',
//                               'chambre principale autonome','salle d’eau extérieure à la seconde chambre',
//                               'toilette visiteur','séjour staffé','cuisine européenne','immense terrasse et immense cour'
//                           ],
//                           rent :'5500000',
//                           nombres:"2 pièces",
//                           img :"villa 01.jpg",
//                           images :[
//                               "villa 01.jpg",
//                               "villa 02.jpg",
//                               "villa 05.jpeg",
//                               "villa 07.jpeg",
//                           ],
//                       },
                  
//                       {
//                           categorie:'Appartement',
//                           address: 'Cocody Angre Arcade 3 ',
//                           description:[
//                               'Superbe penthouse de 3 pièces à Riviera mondial béton avec vue sur la lagune ',
//                               'chambre principale autonome','salle d’eau extérieure à la seconde chambre',
//                               'toilette visiteur','séjour staffé','cuisine européenne','immense terrasse et immense cour'
//                           ],
//                           rent :'5500000',
//                           nombres:"2 pièces",
//                           img :"villa 42.jpg",
//                           images :[
//                               "villa 42.jpg",
//                               "villa 40.jpg",
//                               "villa 41.jpg",
//                               "villa 43.jpg",
//                           ],
//                       },
                  
//                       {
//                           categorie:'Appartement',
//                           address: 'Riviera III',
//                           description:['chambre principale autonome','salle d’eau extérieure à la seconde chambre',
//                               'toilette visiteur','séjour staffé','cuisine européenne','immense terrasse et immense cour'
//                           ],
//                           rent :'5500000',
//                           nombres:"2 pièces",
//                           img :"villa 60.jpg",
//                           images :[
//                               "villa 60.jpg",
//                               "villa 61.jpg",
//                               "villa 62.jpg",
//                               "villa 63.jpg",
//                           ],
//                       },
                  
//                   ])

app.listen(port , ()=> {
    console.log('Server running at http:127.0.0.1:' + port)
})