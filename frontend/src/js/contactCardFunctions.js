import createContactCard from './contactCardElement.js';
import api from '../services/api'
import { closeForm, openForm } from './formFunctions'

const contactCardList = document.getElementById('contactList');

let contacts = [];

async function getAllContatcs() {
    const response = await api.get('contacts');
    contacts = [...response.data];
}

async function addNewContact(event) {
    event.preventDefault();

    const contactData = getInputsData();

    await api.post('contact', contactData);

    closeForm(event);

    await getAllContatcs();
    listContacts();
}

async function updateContact(event, contactId) {
    event.preventDefault();

    const contactData = {
        ...getInputsData(),
        id: contactId
    };

    await api.put(`contact/${contactId}`, contactData);

    closeForm(event);

    await getAllContatcs();
    listContacts();
}

async function deleteContact(contactId) {

    await api.delete(`contact/${contactId}`);

    await getAllContatcs();
    listContacts();
}

async function getContact(contactId) {
    const response = await api.get(`contact/${contactId}`);
    return response.data;
}

function getInputsData() {
    const contactName = document.querySelector('[name-input]');
    const contactWhatsapp = document.querySelector('[whatsapp-input]');
    const contactInstagram = document.querySelector('[instagram-input]');

    if (!contactName.value) {
        return alert('O nome é obrigatório');
    }
    if (contactWhatsapp.value !== "") {
        if (contactWhatsapp.value.length !== 11) {
            return alert('O contato do WhatsApp deve conter 11 números');
        } else if (isNaN(contactWhatsapp.value)) {
            return alert('O contato do WhatsApp deve conter apenas números');
        }
    }

    return {
        name: contactName.value,
        whatsapp: contactWhatsapp.value,
        instagram: contactInstagram.value
    }
}
function listContacts() {
    contactCardList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const newContactCard = createContactCard(contact)
        contactCardList.innerHTML += newContactCard;
    });

    document.querySelectorAll('#editButton').forEach(btn => btn.onclick = (e) => openForm('PUT'));
    document.querySelectorAll('#deleteButton').forEach(btn => btn.onclick = (e) => deleteContact(btn.attributes.contactid.value));
}

async function searchContact(nome) {
    await getAllContatcs();
    const allContatcs = contacts;
    const searchResult = allContatcs.filter(contact => {
        const contactName = contact.name.toLowerCase();
        return contactName.includes(nome);
    });
    contacts = nome !== "" ? searchResult : allContatcs;
    listContacts();
}

export { getAllContatcs, addNewContact, updateContact, deleteContact, listContacts, getContact, searchContact };