function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const firstName = document.getElementById(`firstName`)
console.log(firstName)

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

function checkMessage(nberOfLetter) {
    let regexMsgLetters = "^[a-zA-Zç-]{10,1000}$"
    return regexMsgLetters.test(nberOfLetter)
    
}

firstName.addEventListener(`input`, (event) => {
    const userInput = event.target.value
    const isValid = checkUserName(userInput)
    if (isValid) {
     console.log('is valid')
    } else {
        console.log('is not valid')
 }
})
 

