const lightbox = document.querySelector(`.lightbox`);
const lightboxImg = document.querySelector(`.lightbox__img`);
const lightboxVideo = document.querySelector(`.lightbox__video`);
const lightboxTitlePhoto = document.querySelector(`.lightbox__titlePhoto`);
const prevBtn = document.querySelector(`.lightbox__prev`);
const nextBtn = document.querySelector(`.lightbox__next`);
const closeBtn = document.querySelector(`.lightbox__close`);
const focusableElements = 'button, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
	const firstFocusableElement = element.querySelectorAll(focusableElements)[0];
	const focusableContent = Array.from(element.querySelectorAll(focusableElements))
	const lastFocusableElement = focusableContent[focusableContent.length - 1];

	element.addEventListener("keydown", function (event) {
		if (event.key === "Tab") {
			if (event.shiftKey) {
				if (document.activeElement === firstFocusableElement) {
					event.preventDefault();
					lastFocusableElement.focus();	
				}
			} else {
				if (document.activeElement === lastFocusableElement) {
					event.preventDefault();
					firstFocusableElement.focus();
					
				}
			}
		}
	});

	firstFocusableElement.focus()
}

//--------------------------------------------------------------------------------------------//
let currentIndex = 0;
let currentMediasPhoto = [];
let currentPhotographer = {};
	
export function displayMediaInLightBox(media, photographer, mediasPhoto) {
	console.log('id:', media)
	currentIndex = mediasPhoto.findIndex(medias => medias.id === media.id)
	console.log(mediasPhoto)
	currentPhotographer = photographer
	currentMediasPhoto = mediasPhoto
	console.log(currentIndex)
	

	const photographerWorksPath = media.image ? `assets/images/${photographer.name}-photos/${media.image}` : `assets/images/${photographer.name}-photos/${media.video}`;
	lightbox.style.display = `flex`
	lightbox.focus()
	if (media.image) {
		lightboxImg.src = photographerWorksPath;
		lightboxImg.style.display = `block`
		lightboxVideo.style.display = `none`
	} else {
		lightboxImg.style.display = `none`
		lightboxVideo.style.display = `block`
		lightboxVideo.src = photographerWorksPath
	}
	lightboxTitlePhoto.innerText = `${media.title}`
	
}

//----------------------------------------------------------------------------------------//

export function lightboxBtnControls( mediasPhoto, photographer) {
	currentMediasPhoto = mediasPhoto;
	currentPhotographer = photographer
	
	trapFocus(lightbox)


	nextBtn.addEventListener(`click`, () => {
		currentIndex = (currentIndex + 1) % currentMediasPhoto.length;
		
		displayMediaInLightBox(currentMediasPhoto[currentIndex], currentPhotographer, currentMediasPhoto);
	});

	prevBtn.addEventListener(`click`, () => {
		currentIndex = (currentIndex - 1 + currentMediasPhoto.length) % currentMediasPhoto.length;
		displayMediaInLightBox(currentMediasPhoto[currentIndex], currentPhotographer, currentMediasPhoto);
	});

	closeBtn.addEventListener(`click`, () => {
		lightbox.style.display = `none`;
	});

	document.addEventListener(`keydown`, (event) => {
		const key = event.key; 
		if (key === `ArrowLeft`) {
			currentIndex = (currentIndex - 1 + currentMediasPhoto.length) % currentMediasPhoto.length;
			displayMediaInLightBox(currentMediasPhoto[currentIndex], currentPhotographer, currentMediasPhoto);
		} else if (key === `ArrowRight`) {
			currentIndex = (currentIndex + 1) % currentMediasPhoto.length;
			displayMediaInLightBox(currentMediasPhoto[currentIndex], currentPhotographer, currentMediasPhoto);
		} else if (key === `Escape`) {
			lightbox.style.display = `none`;
		}
		
	});
}
