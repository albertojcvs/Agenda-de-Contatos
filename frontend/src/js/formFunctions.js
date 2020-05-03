import { addNewContact, updateContact, getContact } from './contactCardFunctions';

const formElement = document.querySelector('form');
const saveContactButton = document.getElementById('saveContactButton');

export async function openForm(method) {
    formElement.parentElement.style.opacity = '100%';
    formElement.parentElement.style.zIndex = '10';
    formElement.method = method;
    let contactId;

    if (method === 'PUT') {
        contactId = event.target.attributes.contactId.value;
        const contact = await getContact(contactId);
        document.querySelector('[name-input]').value = contact.name;
        document.querySelector('[whatsapp-input]').value = contact.whatsapp;
        document.querySelector('[instagram-input]').value = contact.instagram;
    }

    document.querySelectorAll('form input').forEach(input => {
        input.onkeypress = async (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();

                formElement.method === 'post' ? addNewContact(e) : updateContact(e, contactId);
            }
        }
    });
    saveContactButton.onclick = async (e) => formElement.method === 'post' ? addNewContact(e) : updateContact(e, contactId);
}

export function closeForm(event) {
    event.preventDefault();
    formElement.parentElement.style.opacity = '0';
    formElement.method = "";
    setTimeout(() => {
        document.querySelectorAll('form input').forEach(input => input.value = '')
        formElement.parentElement.style.zIndex = '-1';
    }, 100);
}

