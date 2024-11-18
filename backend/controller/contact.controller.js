const Contact = require('../models/contact.model.js')

const getContacts = async(req,res) => {
    try{
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const getContact = async(req,res) => {
    try{
        const {id} = req.params;
        const contact = await Contact.findById(id);
        res.status(200).json(contact)
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const updateContact = async(req,res) => {
    try{
        const {id} =req.params;
        const contact = await Contact.findByIdAndUpdate(id, req.body,{
            new: true,
            runValidators: true
        });

        if(!contact)
        {
            res.status(404).json({message: "Contact not found"});
        }
       // const updated = await Contact.findById(id);
        res.status(200).json(contact);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const createContact = async(req,res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(200).json(contact);
    } catch (error) {
        console.log("Error occurred while creating contact:", error);
       res.status(500).json({message:error.message});
    }
}

const delContact = async(req,res) => {
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
}


const checkContact = async(req,res) => {
    const { contactnumber } = req.params;
    const contact = await Contact.findOne({ contactnumber });
    if (contact) {
      return res.json({ exists: true });
    }
    res.json({ exists: false });
}
module.exports = {
    getContacts,
    getContact,
    delContact,
    updateContact,
    createContact,
    checkContact
}