    const body = document.querySelector(`body`)
export function displayMediaInLightBox(media, photographer) {
    const lightbox = document.querySelector(`.lightbox`)
     const lightboxImg = document.querySelector(`.lightbox__img`)
    const lightboxVideo = document.querySelector(`.lightbox__video`)
    const lightboxTitlePhoto = document.querySelector(`.lightbox__titlePhoto`)
   
    
    const photographerWorksPath = media.image ? `assets/images/${photographer.name}-photos/${media.image}` : `assets/images/${photographer.name}-photos/${media.video}`;

    lightbox.style.display = `flex`
    body.classList.add(`body-opaque`)

    
     if (media.image) {
         lightboxImg.src = photographerWorksPath
         lightboxImg.style.display = `block`
         lightboxVideo.style.display = `none`
     
     } else {
         lightboxImg.style.display = `none`
         lightboxVideo.style.display = `block`
         lightboxVideo.src = photographerWorksPath
     }
lightboxTitlePhoto.innerText = `${media.title}`
}
 
 
 export function lightboxBtnControls(mediasPhoto, photographer){
     const lightbox = document.querySelector(`.lightbox`)
     const prevBtn = document.querySelector(`.lightbox__prev`)
     console.log(prevBtn)
     let currentIndex = 0
     
     document.querySelector(`.lightbox__next`).addEventListener(`click`, () => {
         currentIndex = (currentIndex + 1) % mediasPhoto.length
         displayMediaInLightBox(mediasPhoto[currentIndex], photographer)
         
     })
 
     document.querySelector(`.lightbox__prev`).addEventListener(`click`, () => {
             currentIndex = (currentIndex - 1 + mediasPhoto.length) % mediasPhoto.length;
             displayMediaInLightBox(mediasPhoto[currentIndex], photographer);
        
     })
 
     document.querySelector(`.lightbox__close`).addEventListener(`click`, () => {
         lightbox.style.display = `none`
       
     })
     
     document.addEventListener(`keydown`, (event) => {
         const key = event.key; // La touche enfoncée
         if (key === `ArrowLeft`) {
            currentIndex = (currentIndex - 1 + mediasPhoto.length) % mediasPhoto.length;
            displayMediaInLightBox(mediasPhoto[currentIndex], photographer);
         } else if (key === `ArrowRight`) {
            currentIndex = (currentIndex + 1) % mediasPhoto.length
            displayMediaInLightBox(mediasPhoto[currentIndex], photographer)
         } else if (key === `Escape`) {
             lightbox.style.display = `none`
        }
      });

}


