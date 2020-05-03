import editIcon from'../assets/editIcon.png'
import deleteIcon from'../assets/deleteIcon.png'
import whatsappIcon from'../assets/whatsappIcon.png'
import instagramIcon from'../assets/instagramIcon.png'

function createContactCard(contact){

    return(`
        <li id ="c-${contact.id}" class="contact-card">
                    <div class="contact-card-header">
                        <p>${contact.name}</p>
                    </div>
                    <div class="contact-card-body">
                        <div class="social-media">
                            <p id="whatsapp">Whatsapp: ${contact.whatsapp}</p>
                            <a  href="https://api.whatsapp.com/send?phone=55${contact.whatsapp}" target="blank">
                                <img  src="${whatsappIcon}" alt="Whatsapp">
                            </a>
                        </div>
                        <div class="social-media">
                            <p id="instagram">Instagram: @${contact.instagram}</p>
                            <a  href="https://www.instagram.com/${contact.instagram}/" target="blank">
                                <img  src="${instagramIcon}" alt="Instagram">
                            </a>
                        </div>
                    </div>
                    <div class="contact-card-footer">
                            <button id="editButton" contactId=${contact.id} class="edit-button"><img contactId=${contact.id} src="${editIcon}" alt=""></button>
                            <button id="deleteButton" contactId=${contact.id} onclick="() =>a()" class="delete-button"><img contactId=${contact.id} src="${deleteIcon}" alt=""></button>
                    </div>
                </li>
        `
    )
}

 export default createContactCard;