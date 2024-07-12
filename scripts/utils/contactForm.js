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
console.log(sendFormBtn)

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
    let regexMsgLetters = new RegExp ("^[a-zA-Zç-]{10,1000}$")
    return regexMsgLetters.test(userMsg)   
}

firstNameInput.addEventListener(`change`, (event) => {
    const userInput = event.target.value
    console.log(`Prénom: ${userInput}` )
    const nameIsItValid = checkUserName(userInput)
    if (nameIsItValid) {
     console.log('is valid')
    } else {
        console.log('is not valid')
     }
})

lastNameInput.addEventListener(`change`, (event) => {
    const userInput = event.target.value
    console.log(`Nom: ${userInput}` )
    const nameIsItValid = checkUserName(userInput)

    if (nameIsItValid) {
        console.log('is valid')
    } else {
        console.log('is not valid')
    }
})

mailInput.addEventListener(`change`, (event) => {
    const userInput = event.target.value
    console.log(`Mail: ${userInput}`)
    mailIsItValid = checkedUserMail(userInput)

    if (mailIsItValid) {
        console.log('is valid')
    } else {
        console.log('is not valid')
    }
})

msgArea.addEventListener(`change`, (event) => {
    const userInput = event.target.value
    console.log(`message: ${userInput}`)
    msgLenghtIsItValid = checkMessageLength(userInput)
    if (msgLenghtIsItValid) {
        console.log('is valid')
    } else {
        console.log('is not valid')
    }
})

sendFormBtn.addEventListener(`click`, (event) => {
    event.preventDefault()
})
 

