// //Mettre le code JavaScript lié à la page photographer.html
let mediasPhoto = []
let photographer = ""
let currentIndex = 0
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

 document.querySelector(`#sortWorks`).addEventListener(`change`, function () {
            const sortValue = this.value
            console.log(`changement`, sortValue)

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
        })

//---------------------------------------------------------
function getPhotographerIdFromURL() {
    return new URL(location.href).searchParams.get(`id`);
}

//----------------------------------------------------------------



function sortByPopularity(mediasPhoto) {
    return mediasPhoto.sort((a, b) => b.likes - a.likes)
}

function sortByDate(mediasPhoto) {
    return mediasPhoto.sort((a, b) => new Date(b.date) - new Date(a.date))
}

function sortByTitle(mediasPhoto) {
    return mediasPhoto.sort((a, b) => a.title.localeCompare(b.title))
}


// Fonction pour afficher les informations du photographe
function displayPhotographerInfos(photographer) {
    if (!photographer) {
        console.error(`Aucun photographe trouvé avec cet ID.`);
        return;
    }
     const photographerHeader = document.querySelector(`.photograph-header`);
    const photographerInfosPart = document.createElement(`div`)
    photographerInfosPart.classList.add(`photographerInfos`)

    const photographerPhotoContact = document.createElement(`div`)
    photographerPhotoContact.classList.add(`photograph-photoContact`)

    const photographContactBtn = document.querySelector(`#contactHeaderBtn`)
  
    const photographerPicture = `assets/photographers/${photographer.portrait}`
    
    const photographerName = document.createElement(`h1`)
    photographerName.classList.add(`photographerName`)
    photographerName.innerText = photographer.name

    const photographerCity = document.createElement(`p`)
    photographerCity.classList.add(`photographerCity`)
    photographerCity.innerText = `${photographer.city}, ${photographer.country}`

    const photographerTagLine = document.createElement(`p`)
    photographerTagLine.innerText = photographer.tagline

    const photographerPhoto = document.createElement(`img`)
    photographerPhoto.classList.add(`photographerPhoto`)
    photographerPhoto.setAttribute(`src`, photographerPicture)

   
    photographerHeader.appendChild(photographerInfosPart)
    photographerHeader.appendChild(photographerPhotoContact)
    photographerInfosPart.appendChild(photographerName)
    photographerInfosPart.appendChild(photographerCity)
    photographerInfosPart.appendChild(photographerTagLine)
    photographerPhotoContact.appendChild(photographContactBtn)
    photographerPhotoContact.appendChild(photographerPhoto)  
}

//------------------------------------------------


function displayPhotographerWorks(photographer, mediasPhoto) {
    //photographer's works
    const photosGallery = document.querySelector(`.photographerWorks`)
    photosGallery.innerHTML = '';
   
    
    if (mediasPhoto.length > 0) {
        const iconLikeBrownPath = `../assets/icons/heart.png`
        const iconLikeBlackPath = `../assets/icons/black-heart-solid.svg`

        const nberTotalOfLikesDiv = document.createElement(`div`)
        nberTotalOfLikesDiv.classList.add(`nberTotalOfLikesDiv`)

        const totalLikesDiv = document.createElement(`div`)
        const nberTotalOfLikeCounter = document.createElement(`p`)
        nberTotalOfLikeCounter.classList.add(`counterOfTotalLikes`)

        const nberLikeTotalIcon = document.createElement(`img`)
        nberLikeTotalIcon.setAttribute(`src`, iconLikeBlackPath)

        const pricePerDay = document.createElement(`p`)
        pricePerDay.innerText = `${photographer.price}€/jour`

        let totalLikes = 0;

        mediasPhoto.forEach((media, index) => {
            const photographerWorksPath = media.image ? `assets/images/${photographer.name}-photos/${media.image}` : `assets/images/${photographer.name}-photos/${media.video}`
            
            const photosDiv = document.createElement(`div`)
            photosDiv.classList.add(`media-container`)

   
            const mediaElement = media.image ? document.createElement(`img`) : document.createElement(`video`)
            mediaElement.classList.add(`photographers-works`)
            mediaElement.setAttribute(`src`, photographerWorksPath)

            const photoDetailsDiv = document.createElement(`div`)
            photoDetailsDiv.classList.add(`photoDetailsDiv`)

            const photoName = document.createElement(`p`)
            photoName.innerText = `${media.title}`
            photoName.classList.add(`photoName`)

            const nberOfPhotoLike = document.createElement(`p`)
            nberOfPhotoLike.innerText = `${media.likes}`
            nberOfPhotoLike.classList.add(`nberOfLike`)

            const iconLike = document.createElement(`img`)
            iconLike.setAttribute(`src`, iconLikeBrownPath)
            iconLike.classList.add(`iconLike`)

            const likeDiv = document.createElement(`div`)
            likeDiv.classList.add(`likeDiv`)

            totalLikes += parseInt(nberOfPhotoLike.innerText)
            nberTotalOfLikeCounter.innerText = totalLikes
            console.log(totalLikes)
    
            photosGallery.appendChild(photosDiv)
            photosDiv.appendChild(mediaElement)
            photosDiv.appendChild(photoDetailsDiv)
            photoDetailsDiv.appendChild(likeDiv)
            photoDetailsDiv.appendChild(photoName)
            likeDiv.appendChild(nberOfPhotoLike)
            likeDiv.appendChild(iconLike)
            nberTotalOfLikesDiv.appendChild(totalLikesDiv)
            totalLikesDiv.appendChild(nberTotalOfLikeCounter)
            totalLikesDiv.appendChild(nberLikeTotalIcon)
            nberTotalOfLikesDiv.appendChild(pricePerDay)
            photosGallery.appendChild(nberTotalOfLikesDiv)

            mediaElement.addEventListener(`click`, () => {
                let currentIndex = index
                displayMediaInLightBox(mediasPhoto[currentIndex], photographer)
            })
            
        })

        const heartLike = document.querySelectorAll(`.iconLike`)
       
        for (let i = 0; i < heartLike.length; i++) {
            heartLike[i].addEventListener(`click`, (event) => {
                 heartIconClicked = event.target
                let test = heartIconClicked.previousElementSibling
                let currentLikes = parseInt(test.innerText)

                if (!heartLike[i].classList.contains(`liked`)) {
                    currentLikes += 1
                    totalLikes += 1
                    test.innerText = currentLikes
                    heartLike[i].classList.add(`liked`)
                } else {
                    currentLikes -= 1
                   totalLikes -= 1
                    test.innerText = currentLikes
                    heartLike[i].classList.remove(`liked`)
                }
                nberTotalOfLikeCounter.innerText = totalLikes
            })
        }       
    } else {
        console.log(`no media found for this photographer`)
    }
}

function displayMediaInLightBox(media, photographer) {
   
    const lightboxImg = document.querySelector(`.lightbox__img`)
    const lightboxVideo = document.querySelector(`.lightbox__video`)
    
    if (!media || ! photographer) {
        console.error(`Erreur : le média est undefined`);
        return;
    }
   
    const photographerWorksPath = media.image ? `assets/images/${photographer.name}-photos/${media.image}` : `assets/images/${photographer.name}-photos/${media.video}`;
    lightbox.style.display = `block`

    if (media.image) {
        lightboxImg.src = photographerWorksPath
        lightboxImg.style.display = `block`
        lightboxVideo.style.display = `none`
    
    } else {
        lightboxImg.style.display = `none`
        lightboxVideo.style.display = `block`
        lightboxVideo.src = photographerWorksPath
    }

}
             
    document.querySelector(`.lightbox__next`).addEventListener(`click`, () => {
        currentIndex = (currentIndex + 1) % mediasPhoto.length
        displayMediaInLightBox(mediasPhoto[currentIndex], photographer)
       
    })

    document.querySelector(`.lightbox__prev`).addEventListener(`click`, () => {
        if (mediasPhoto.length > 0) {
            currentIndex = (currentIndex - 1 + mediasPhoto.length) % mediasPhoto.length;
            displayMediaInLightBox(mediasPhoto[currentIndex], photographer);
        }
    })


const btnClose = document.querySelector(`.lightbox__close`)
console.log(btnClose)

btnClose.addEventListener(`click`, () => {
    lightbox.style.display= `none`
})
