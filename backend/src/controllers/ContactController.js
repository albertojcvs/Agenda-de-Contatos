const Contact = require('../models/Contact');

async function getAllContacts(request, response) {

    const contacts = await Contact.findAll();
    return response.json(contacts);
}

async function getContact(request, response){
    const { id } = request.params;
    const contact =  await Contact.findByPk(id);
    
    if (!contact) {
        return response.status(400).json({ error: 'Contact not found' });
    }

    return response.json(contact);
}

async function addNewContact(request, response) {

    const { name, whatsapp, instagram } = request.body;

    const contact = await Contact.create({
        name,
        whatsapp,
        instagram
    });
    return response.json();
}

async function updateContact(request, response) {
    const { id } = request.params;
    const { name, whatsapp, instagram } = request.body;
    const contact = await Contact.findByPk(id);

    if (!contact) {
        return response.status(400).json({ error: 'Contact not found' });
    }

    await Contact.update({
        name,
        whatsapp,
        instagram
    }, {
        where: {
            id
        }
    }
    )

    return response.json({});
}
async function deleteContact(request, response) {
    const { id } = request.params;
    const contact = await Contact.findByPk(id);

    if (!contact) {
        return response.status(400).json({ error: 'Contact not found' });
    }

   await Contact.destroy({
        where: {
            id
        }
    });
    return response.json({});
}

module.exports = {
    getAllContacts,
    getContact,
    addNewContact,
    updateContact,
    deleteContact
}