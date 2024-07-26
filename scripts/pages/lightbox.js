const body = document.querySelector(`body`)
  const lightbox = document.querySelector(`.lightbox`)
     const lightboxImg = document.querySelector(`.lightbox__img`)
    const lightboxVideo = document.querySelector(`.lightbox__video`)
const lightboxTitlePhoto = document.querySelector(`.lightbox__titlePhoto`)
const prevBtn = document.querySelector(`.lightbox__prev`)
     const nextBtn = document.querySelector(`.lightbox__next`)
const closeBtn = document.querySelector(`.lightbox__close`)
     
lightbox.setAttribute(`tabindex`, `1`)
lightboxImg.setAttribute(`tabindex`, `2`)
lightboxVideo.setAttribute(`tabindex`, `2`)
prevBtn.setAttribute(`tabindex`, `3`)
nextBtn.setAttribute(`tabindex`, `4`)
closeBtn.setAttribute(`tabindex`, `5`)

    
   
export function displayMediaInLightBox(media, photographer) {
   
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
     
     

     let currentIndex = 0
     
     nextBtn.addEventListener(`click`, () => {
         currentIndex = (currentIndex + 1) % mediasPhoto.length
         displayMediaInLightBox(mediasPhoto[currentIndex], photographer)
         
     })
 
    prevBtn.addEventListener(`click`, () => {
             currentIndex = (currentIndex - 1 + mediasPhoto.length) % mediasPhoto.length;
             displayMediaInLightBox(mediasPhoto[currentIndex], photographer);
        
     })
 
     closeBtn.addEventListener(`click`, () => {
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



