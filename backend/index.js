const express = require('express')
const app = express()
const Contact = require('./models/contact.model.js')
const contactRoute = require('./routes/contact.route.js')
const cors = require('cors');
const bodyParser = require('body-parser');

//middleware
app.use(express.json())
app.use(bodyParser.json())
app.use(cors({
    origin: '*', // Replace '*' with specific origin(s) in production for security
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.urlencoded({extended: false}));

const mongoose = require('mongoose')

app.get ('/',(req,res)=> {
    res.send("Hello from Node Api Server")})

//routes

app.use("/api/contact",contactRoute);

/*app.get ('/api/contact' ,async(req,res)=>{
    try{
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

app.get ('/api/contact/:id' , async(req,res)=> {
    try{
        const {id} = req.params;
        const contact = await Contact.findById(id);
        res.status(200).json(contact)
    }catch(error){
        res.status(500).json({message:error.message});
    }
})

app.put('/api/contact/:id', async(req,res)=> {
    try{
        const {id} =req.params;
        const contact = await Contact.findByIdAndUpdate(id, req.body,{
            new: true,
            runValidators: true
        });

        if(!contact)
        {
            res.status(404).json({message: "Product not found"});
        }
       // const updated = await Contact.findById(id);
        res.status(200).json(contact);
    }catch(error){
        res.status(500).json({message:error.message});
    }
})


app.post('/api/contact',async (req,res)=>{
    try {
        const contact = await Contact.create(req.body);
        res.status(200).json(contact);
    } catch (error) {
       res.status(500).json({message:error.message});
    }
})

app.delete('/api/contact/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const contact =  await Contact.findByIdAndDelete(id);
        if(!contact)
        {
            res.status(404).json({message: "Contact not found"})
        }
        res.status(200).json({message: "Product deleted successfully"});
    }catch(error){
        res.status(500).json({message: error.message})
    }
})
    */

mongoose.connect("mongodb://localhost:27017/contacts",{useNewUrlParser: true,
    useUnifiedTopology: true}).then(()=> {
        console.log("Database connected successfully")
        app.listen (5000,()=> {
            console.log("Server is running on port 5000")
        })
    }).catch((err) => {
        console.log("Db connection err:",err)
    })