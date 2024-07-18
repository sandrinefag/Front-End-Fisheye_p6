
export function displayMediaInLightBox(media, photographer) {
    const lightbox = document.querySelector(`.lightbox`)
     const lightboxImg = document.querySelector(`.lightbox__img`)
     const lightboxVideo = document.querySelector(`.lightbox__video`)
    
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
 
 
 export function lightboxBtnControls(mediasPhoto, photographer){
     const lightbox = document.querySelector(`.lightbox`)
     let currentIndex = 0
  
     if (!Array.isArray(mediasPhoto) || mediasPhoto.length === 0) {
        console.error('mediasPhoto n\'est pas un tableau valide ou est vide.');
        return;
    }
     
     document.querySelector(`.lightbox__next`).addEventListener(`click`, () => {
         currentIndex = (currentIndex + 1) % mediasPhoto.length
         displayMediaInLightBox(mediasPhoto[currentIndex], photographer)
         
     })
 
     document.querySelector(`.lightbox__prev`).addEventListener(`click`, () => {
             currentIndex = (currentIndex - 1 + mediasPhoto.length) % mediasPhoto.length;
             displayMediaInLightBox(mediasPhoto[currentIndex], photographer);
        
     })
 
     document.querySelector(`.lightbox__close`).addEventListener(`click`, () => {
         lightbox.style.display = "none"
     })
}


