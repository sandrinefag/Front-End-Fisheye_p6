import { displayMediaInLightBox } from "../pages/lightbox.js"
import{like} from "../pages/photographer.js"
// Fonction pour afficher les informations du photographe
export function displayPhotographerInfos(photographer) {
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
    photographerTagLine.classList.add(`photographerTagLine`)
    photographerTagLine.innerText = photographer.tagline

    const photographerPhoto = document.createElement(`img`)
    photographerPhoto.classList.add(`photographerPhoto`)
    photographerPhoto.setAttribute(`src`, photographerPicture)
    photographerPhoto.setAttribute(`tabindex`, 0)
    photographerPhoto.setAttribute(`alt`, `photo-portrait de ${photographer.name}`)
  
   
    photographerHeader.appendChild(photographerInfosPart)
    photographerHeader.appendChild(photographerPhotoContact)
    photographerInfosPart.appendChild(photographerName)
    photographerInfosPart.appendChild(photographerCity)
    photographerInfosPart.appendChild(photographerTagLine)
    photographerPhotoContact.appendChild(photographContactBtn)
    photographerPhotoContact.appendChild(photographerPhoto)  
}

//------------------------------------------------


export function displayPhotographerWorks(photographer, mediasPhoto) {
    //photographer's works
    const photosGallery = document.querySelector(`.photographerWorks`)
    photosGallery.innerHTML = '';
   
    let totalLikes = 0
    
    if (mediasPhoto.length > 0) {
        const iconLikeBrownPath = `../assets/icons/heart.png`
        const iconLikeBlackPath = `../assets/icons/black-heart-solid.svg`

        const nberTotalOfLikesDiv = document.createElement(`div`)
        nberTotalOfLikesDiv.classList.add(`nberTotalOfLikesDiv`)

        const totalLikesDiv = document.createElement(`div`)
        const nberTotalOfLikeCounter = document.createElement(`p`)
        nberTotalOfLikeCounter.classList.add(`counterOfTotalLikes`)
        nberTotalOfLikeCounter.setAttribute(`tabindex`, `0`)

        const nberLikeTotalIcon = document.createElement(`img`)
        nberLikeTotalIcon.setAttribute(`src`, iconLikeBlackPath)

        const pricePerDay = document.createElement(`p`)
        pricePerDay.innerText = `${photographer.price}€/jour`

        mediasPhoto.forEach((media, index) => {
            const photographerWorksPath = media.image ? `assets/images/${photographer.name}-photos/${media.image}` : `assets/images/${photographer.name}-photos/${media.video}`
            
            const photosDiv = document.createElement(`div`)
            photosDiv.classList.add(`media-container`)

   
            const mediaElement = media.image ? document.createElement(`img`) : document.createElement(`video`)
            mediaElement.classList.add(`photographers-works`)
            mediaElement.setAttribute(`src`, photographerWorksPath)
            mediaElement.setAttribute(`tabindex`, `0`)
            mediaElement.setAttribute(`alt`, `la photographie se nomme ${media.title}`)
            mediaElement.setAttribute(`title`, `${media.title}`)


            const photoDetailsDiv = document.createElement(`div`)
            photoDetailsDiv.classList.add(`photoDetailsDiv`)

            const photoName = document.createElement(`p`)
            photoName.innerText = `${media.title}`
            photoName.classList.add(`photoName`)

            const nberOfPhotoLike = document.createElement(`p`)
            nberOfPhotoLike.innerText = `${media.likes}`
            nberOfPhotoLike.classList.add(`nberOfLike`)
            nberOfPhotoLike.setAttribute(`tabindex`, `0`)
            nberOfPhotoLike.setAttribute(`aria-label`,`${media.likes} likes`)

            const iconLike = document.createElement(`img`)
            iconLike.setAttribute(`src`, iconLikeBrownPath)
            iconLike.classList.add(`iconLike`)
            iconLike.setAttribute(`tabindex`, `0`)
            iconLike.setAttribute(`aria-label`, `icône pour liker`)

            const likeDiv = document.createElement(`div`)
            likeDiv.classList.add(`likeDiv`)

            totalLikes += parseInt(nberOfPhotoLike.innerText)
       
    
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
               like()   
            })

            // mediaElement.addEventListener(`keydown`, (event) => {
            //     let currentIndex = index
            //     const key = event.key
            //     if (key === `Enter`) {
            //         displayMediaInLightBox(mediasPhoto[currentIndex], photographer)
            //     }
               
            // })
            nberTotalOfLikeCounter.innerText = totalLikes 
        }) 
    }
}

export function photographerNameModal(photographer) {
    const contactHeaderModal = document.querySelector(`.modalHeader`)
    const divContact = document.createElement(`div`)
    divContact.classList.add(`.modalContactDiv`)
    const headerTitleContactModal = document.querySelector(`.modalHeader h2`)
    const contactNameTag = document.createElement(`p`)
    contactNameTag.classList.add(`modalContactPhotographerName`)
    contactNameTag.innerText = `${photographer.name}`
    contactHeaderModal.appendChild(divContact)
    divContact.appendChild(contactNameTag)
    divContact.appendChild(headerTitleContactModal)
}

