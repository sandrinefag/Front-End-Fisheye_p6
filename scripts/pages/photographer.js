// //Mettre le code JavaScript lié à la page photographer.html
import { displayPhotographerInfos, displayPhotographerWorks, photographerNameModal } from "../templates/photographerGallery.js"
import { lightboxBtnControls } from "./lightbox.js"


let mediasPhoto = []
let photographer = ""
const lightbox = document.querySelector(`.lightbox`)


async function loadPhotographerData() {
    try {
        
        const photographerId = getPhotographerIdFromURL();
        const data = await fetchPhotographerById(photographerId);

        photographer = data.photographer
        mediasPhoto = data.mediasPhoto
     
      
        displayPhotographerInfos(photographer);
        
        //Afficher gallerie photos
        displayPhotographerWorks(photographer, mediasPhoto)
        lightboxBtnControls(mediasPhoto, photographer)
        like()
        photographerNameModal(photographer)
    } catch (error) {
        console.error(`Erreur lors du chargement des données du photographe:`, error);
    }
}

// Appeler la fonction pour charger les données du photographe
loadPhotographerData();

//------------------------------------------------------------------------------

// Fonction asynchrone pour récupérer les données du photographe depuis le fichier JSON
async function fetchPhotographerById(photographerId) {
    try {
        const response = await fetch(`../../data/photographers.json`);
        const data = await response.json();
        // Trouver le photographe correspondant à l'ID
        const photographer = data.photographers.find(photograph => photograph.id == photographerId);
        const mediasPhoto = data.media.filter(works => works.photographerId == photographerId)
        return {photographer, mediasPhoto};
      
    } catch (error) {
        console.error(`Erreur lors de la récupération des données du photographe:`, error);
    }
  
}
//-------------------------Tri-----------------------------------------
function gallerySort(){
 document.querySelector(`#sortWorks`).addEventListener(`change`, function () {
            const sortValue = this.value

            let sortedMedias;
            switch (sortValue) {
                case `popularity`:
                sortedMedias = sortByPopularity(mediasPhoto)
                    break
                
                case `date`:
                    sortedMedias = sortByDate(mediasPhoto)
                    break
                
                case `title`:
                    sortedMedias = sortByTitle(mediasPhoto)
                    break
                default:
                    sortedMedias = mediasPhoto
            }
     displayPhotographerWorks(photographer, sortedMedias)
     like()
        })
}
gallerySort()
//---------------------------------------------------------
function getPhotographerIdFromURL() {
    return new URL(location.href).searchParams.get(`id`);
}

//----------------------------------------------------------------



function sortByPopularity(mediasPhoto) {
    const sortedMedias = mediasPhoto.slice().sort((a, b) => b.likes - a.likes)
    displayPhotographerWorks(photographer, sortedMedias);
   like();
    return sortedMedias
   
}

function sortByDate(mediasPhoto) {
    const sortedMedias = mediasPhoto.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
    displayPhotographerWorks(photographer, sortedMedias);
    like();
    return sortedMedias
}

function sortByTitle(mediasPhoto) {
    const sortedMedias = mediasPhoto.slice().sort((a, b) => a.title.localeCompare(b.title))
    displayPhotographerWorks(photographer, sortedMedias);
    like();
    return sortedMedias
}

//------------------------------------------------
export function like() {
   
    const heartLike = document.querySelectorAll(`.iconLike`)
    const nberTotalOfLikeCounter = document.querySelector(`.counterOfTotalLikes`);
    let totalLikes =  parseInt(nberTotalOfLikeCounter.innerText)
    if (heartLike.length > 0) {
        for (let i = 0; i < heartLike.length; i++) {
            heartLike[i].addEventListener(`click`, (event) => {
                const heartIconClicked = event.target
                let likesElement = heartIconClicked.previousElementSibling
                let currentLikes = parseInt(likesElement.innerText)

                if (!heartLike[i].classList.contains(`liked`)) {
                    heartLike[i].classList.add(`liked`)
                    currentLikes += 1
                    totalLikes += 1
                    likesElement.innerText = currentLikes
                    
                } else {
                    heartLike[i].classList.remove(`liked`)
                    currentLikes -= 1
                    totalLikes -= 1
                   likesElement.innerText = currentLikes 
                }

                nberTotalOfLikeCounter.innerText = totalLikes
            })  
        }
    } else {
        console.log(`no media found for this photographer`)
    }
}
like()