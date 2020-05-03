const express = require('express');
const routes = express.Router();

const ContactController = require('./controllers/ContactController');

async function verifiIfContactExits(request,response,next){


}

routes.get('/contacts',ContactController.getAllContacts);
routes.get('/contact/:id', ContactController.getContact)
routes.post('/contact',ContactController.addNewContact);
routes.put('/contact/:id',ContactController.updateContact);
routes.delete('/contact/:id',ContactController.deleteContact);





module.exports = routes;