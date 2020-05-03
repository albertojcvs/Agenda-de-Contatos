import addIcon from '../assets/addIcon.png'
import closeIcon from '../assets/closeIcon.png'
import pageIcon from '../assets/icon.png'

import { closeForm, openForm } from './formFunctions';
import { getAllContatcs, listContacts, searchContact } from './contactCardFunctions';


document.querySelector('section .container .add-button-container button').innerHTML = `<img src=${addIcon} alt="Adicionar contato">`;
document.getElementById('closeFormButton').innerHTML = `<img src=${closeIcon} alt="Fechar formulario">`

document.getElementById('addContactButton').onclick = () => openForm('POST');
document.getElementById('closeFormButton').onclick = closeForm;

document.querySelector('head').innerHTML += `<link rel="shortcut icon" href =${pageIcon}>`

const searchBoxInput = document.getElementById('searchBoxInput');

window.onload = async () => {
    await getAllContatcs();
    listContacts();
    searchBoxInput.addEventListener('input', async (event) => {
        let nome = await event.target.value;
        searchContact(nome);
    });
}
