function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const firstNameInput = document.getElementById(`firstNameInput`)
const lastNameInput = document.getElementById(`lastNameInput`)
const mailInput = document.getElementById(`mailInput`)
const msgArea = document.getElementById(`msgArea`)
const sendFormBtn = document.getElementById(`sendFormBtn`) 


function checkUserName(userName) {
    let regexNames = new RegExp(
        "^[a-zA-ZÀ-ÖØ-öøç]{2,15}[-]{0,1}[a-zA-ZÀ-ÖØ-öøç]{0,15}$"
    )
    return regexNames.test(userName)
}

function checkedUserMail(userMail) {
	let regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/;
	return regexMail.test(userMail);
}

function checkMessageLength(userMsg) {
    let regexMsgLetters = /^[a-zA-ZÀ-ÖØ-öøçéèêëàâîïôùûüÿç\s,.'-:;]{10,1000}$/
    return regexMsgLetters.test(userMsg)   
}

firstNameInput.addEventListener(`change`, (event) => {
    const userInput = event.target.value
    console.log(`Prénom: ${userInput}` )
    const nameIsItValid = checkUserName(userInput)
    if (nameIsItValid) {
        firstNameInput.style.background = "green"
        firstNameInput.style.color ="white"
    } else {
        firstNameInput.style.background = "red"
        firstNameInput.style.color ="white"
     }
})

lastNameInput.addEventListener(`change`, (event) => {
    const userInput = event.target.value
    const nameIsItValid = checkUserName(userInput)

    if (nameIsItValid) {
        lastNameInput.style.background = "green"
        lastNameInput.style.color = "white"
    } else {
        lastNameInput.style.background = "red"
        lastNameInput.style.color = "white"
    }
})

mailInput.addEventListener(`change`, (event) => {
    const userInput = event.target.value
    const mailIsItValid = checkedUserMail(userInput)

    if (mailIsItValid) {
        mailInput.style.background = "green"
         mailInput.style.color ="white"
    } else {
        mailInput.style.background = "red"
        mailInput.style.color ="white"
    }
})

msgArea.addEventListener(`change`, (event) => {
    const userInput = event.target.value
    console.log(`message: ${userInput}`)
    const msgLenghtIsItValid = checkMessageLength(userInput)
    if (msgLenghtIsItValid) {
        msgArea.style.background = "green"
        msgArea.style.color = "white"
    } else {
        msgArea.style.background = "red"
        msgArea.style.color = "white"
    }
})


 
function checkedValidityOfForm() {
    const isValidFirstName = checkUserName(firstNameInput.value);
    const isValidLastName = checkUserName(lastNameInput.value);
    const isValidMail = checkedUserMail(mailInput.value);
    const isValidMsg = checkMessageLength(msgArea.value);

    if (isValidFirstName && isValidLastName && isValidMail && isValidMsg) {
        console.log('Formulaire valide');
        console.log('Prénom:', firstNameInput.value);
        console.log('Nom:', lastNameInput.value);
        console.log('Mail:', mailInput.value);
        console.log('Message:', msgArea.value);
        lastNameInput.style.background = "green"
        lastNameInput.style.color = "white"
    } else {
        console.log('Formulaire invalide');
    }
}
sendFormBtn.addEventListener(`click`, (event) => {
    event.preventDefault()
    checkedValidityOfForm()

})    