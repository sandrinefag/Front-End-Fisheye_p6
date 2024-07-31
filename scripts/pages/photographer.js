//Mettre le code JavaScript lié à la page photographer.html
import { displayPhotographerInfos, displayPhotographerWorks, photographerNameModal } from "../templates/photographerGallery.js";
import { lightboxBtnControls, displayMediaInLightBox } from "./lightbox.js";

let mediasPhoto = [];
let photographer = "";
const lightbox = document.querySelector(`.lightbox`);

async function loadPhotographerData() {
	try {
		const photographerId = getPhotographerIdFromURL();
		const data = await fetchPhotographerById(photographerId);

		photographer = data.photographer;
		mediasPhoto = data.mediasPhoto;

		displayPhotographerInfos(photographer);
		displayPhotographerWorks(photographer, mediasPhoto);
		lightboxBtnControls(mediasPhoto, photographer);
		photographerNameModal(photographer);
		gallerySort();
		like();
	} catch (error) {
		console.error(
			`Erreur lors du chargement des données du photographe:`,
			error
		);
	}
}

loadPhotographerData();

//------------------------------------------------------------------------------

async function fetchPhotographerById(photographerId) {
	try {
		const response = await fetch(`./data/photographers.json`);
		const data = await response.json();
		// Trouver le photographe correspondant à l'ID
		const photographer = data.photographers.find((photograph) => photograph.id == photographerId);
		const mediasPhoto = data.media.filter((works) => works.photographerId == photographerId);
		return { photographer, mediasPhoto };
	} catch (error) {
		console.error(
			`Erreur lors de la récupération des données du photographe:`,
			error
		);
	}
}
//------------------------------------------------------------------

function gallerySort() {
	document.querySelector(`#sortWorks`).addEventListener(`change`, function () {
		const sortValue = this.value;

		let sortedMedias;
		switch (sortValue) {
			case `popularity`:
				sortedMedias = sortByPopularity(mediasPhoto);
				break;

			case `date`:
				sortedMedias = sortByDate(mediasPhoto);
				break;

			case `title`:
				sortedMedias = sortByTitle(mediasPhoto);
				break;
			default:
				sortedMedias = mediasPhoto;
		}
		displayPhotographerWorks(photographer, sortedMedias);
		like();
	});
}
gallerySort();

//---------------------------------------------------------

function getPhotographerIdFromURL() {
	return new URL(location.href).searchParams.get(`id`);
}

//----------------------------------------------------------------

function sortByPopularity(mediasPhoto) {
	const sortedMedias = mediasPhoto.slice().sort((a, b) => b.likes - a.likes);
	displayPhotographerWorks(photographer, sortedMedias);
	like();
	return sortedMedias;
}

function sortByDate(mediasPhoto) {
	const sortedMedias = mediasPhoto
		.slice()
		.sort((a, b) => new Date(b.date) - new Date(a.date));
	displayPhotographerWorks(photographer, sortedMedias);
	like();
	return sortedMedias;
}

function sortByTitle(mediasPhoto) {
	const sortedMedias = mediasPhoto
		.slice()
		.sort((a, b) => a.title.localeCompare(b.title));
	displayPhotographerWorks(photographer, sortedMedias);
	like();
	return sortedMedias;
}

//--------------------------------------------------------------------------//

export function like() {
	const heartLikeOff = document.querySelectorAll(`.likeOff`);
	const heartLikeOn = document.querySelectorAll(`.likeOn`);
	const nberTotalOfLikeCounter = document.querySelector(`.counterOfTotalLikes`);

	let totalLikes = parseInt(nberTotalOfLikeCounter.innerText);

	heartLikeOff.forEach((heartIconOff, index) => {
		
		const heartIconOn = heartLikeOn[index];
		let likesElement = heartIconOff.previousElementSibling;
		let currentLikes = parseInt(likesElement.innerText);
		
		heartIconOff.addEventListener(`click`, () => {
			if (!heartIconOff.classList.contains(`likedNone`)) {
				heartIconOff.classList.add(`likedNone`);
				heartIconOff.classList.remove(`likeOff`);
				heartIconOn.classList.remove(`likeOn`);
				heartIconOn.classList.remove(`likedNone`);
				heartIconOn.classList.add(`likeOff`);
				currentLikes += 1;
				totalLikes += 1;
				
				likesElement.innerText = currentLikes;
				nberTotalOfLikeCounter.innerText = totalLikes;
			}
			
		});

		heartIconOn.addEventListener(`click`, () => {
			if (heartIconOn.classList.contains(`likeOff`)) {
				heartIconOn.classList.remove(`likeOff`);
				heartIconOn.classList.add(`likedNone`);
				heartIconOff.classList.remove(`likedNone`);
				heartIconOff.classList.add(`likeOff`);
			
				currentLikes -= 1;
				totalLikes -= 1;
				
				likesElement.innerText = currentLikes;
				nberTotalOfLikeCounter.innerText = totalLikes;
			}
				
		});
		
		heartIconOff.addEventListener(`keydown`, (event) => {
			if(event.key === `Enter`){
				
				if (!heartIconOff.classList.contains(`likedNone`)) {
					heartIconOff.classList.add(`likedNone`);
					heartIconOff.classList.remove(`likeOff`);
					heartIconOn.classList.remove(`likeOn`);
					heartIconOn.classList.remove(`likedNone`);
					heartIconOn.classList.add(`likeOff`);
					currentLikes += 1;
					totalLikes += 1;
					
					likesElement.innerText = currentLikes;
					nberTotalOfLikeCounter.innerText = totalLikes;
				}
			}
		});

		heartIconOn.addEventListener(`keydown`, (event) => {
			if (event.key === `Enter`){
				if (heartIconOn.classList.contains(`likeOff`)) {
					heartIconOn.classList.remove(`likeOff`);
					heartIconOn.classList.add(`likedNone`);
					heartIconOff.classList.remove(`likedNone`);
					heartIconOff.classList.add(`likeOff`);
				
					currentLikes -= 1;
					totalLikes -= 1;
					
					likesElement.innerText = currentLikes;
					nberTotalOfLikeCounter.innerText = totalLikes;
				}
			}	
		});
			
	});

}

//-----------------------------------------------------------------------//

export function addKeydownEvent(mediaElement, media, photographer) {
	mediaElement.addEventListener(`keydown`, (event) => {
		const key = event.key;
		if (key === `Enter`) {
			displayMediaInLightBox(media, photographer);
			like()

		}
	}); 
}

//---------------------------------------------------------------------//

export function addClickEvent(mediaElement, media, photographer) {
	mediaElement.addEventListener(`click`, () => {
		displayMediaInLightBox(media, photographer);
		like();
	});
}
