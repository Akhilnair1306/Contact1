const express = require('express')
const Contact = require('../models/contact.model.js')
const router = express.Router();
const {getContacts, getContact, delContact, updateContact, createContact, checkContact} = require('../controller/contact.controller.js');

router.get('/',getContacts)

router.get('/:id',getContact)

router.get ('/check-phone/:contactnumber',checkContact)

router.delete('/:id',delContact)

router.put('/:id',updateContact)

router.post('/',createContact)


module.exports = router;