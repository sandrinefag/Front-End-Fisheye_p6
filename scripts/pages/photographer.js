// //Mettre le code JavaScript lié à la page photographer.html
async function loadPhotographerData() {
    try {
        
        const photographerId = getPhotographerIdFromURL();
        const {photographer, mediasPhoto } = await fetchPhotographerById(photographerId);

        // Afficher les informations du photographe
        displayPhotographerInfos(photographer);
        displayPhotographerWorks(photographer, mediasPhoto)

      
        document.querySelector(`#sortWorks`).addEventListener(`change`, function () {
            const sortValue = this.value
            console.log("changement", sortValue)

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
    } catch (error) {
        console.error('Erreur lors du chargement des données du photographe:', error);
    }
}

// Appeler la fonction pour charger les données du photographe
loadPhotographerData();


function getPhotographerIdFromURL() {
    return new URL(location.href).searchParams.get("id");
 
}



// Fonction asynchrone pour récupérer les données du photographe depuis le fichier JSON
async function fetchPhotographerById(photographerId) {
    try {
        const response = await fetch("../../data/photographers.json");
        const data = await response.json();
        // Trouver le photographe correspondant à l'ID
        const photographer = data.photographers.find(photograph => photograph.id == photographerId);
        const mediasPhoto = data.media.filter(works => works.photographerId == photographerId)
        return {photographer, mediasPhoto};
      
    } catch (error) {
        console.error('Erreur lors de la récupération des données du photographe:', error);
    }
  
}

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
        console.error('Aucun photographe trouvé avec cet ID.');
        return;
    }
    const photographerHeader = document.querySelector(`.photograph-header`);
    photographerHeader.innerHTML = '';
    const photographerInfosPart = document.createElement('div')
    photographerInfosPart.classList.add('photographerInfos')
    const photographerPhotoContact = document.createElement('div')
    photographerPhotoContact.classList.add('photograph-photoContact')
    const photographContact = document.querySelector('.contact_button')
    const photographerPicture = `assets/photographers/${photographer.portrait}`
    
    const photographerName = document.createElement('h1')
    photographerName.classList.add(`photographer-photo`)
    photographerName.innerText = photographer.name
    const photographerCity = document.createElement('p')
    photographerCity.innerText = `${photographer.city}, ${photographer.country}`
    const photographerTagLine = document.createElement('p')
    photographerTagLine.innerText = photographer.tagline
    const photographerPhoto = document.createElement('img')
    photographerPhoto.classList.add('photographerPhoto')
    photographerPhoto.setAttribute("src", photographerPicture)

   
    photographerHeader.appendChild(photographerPhotoContact)
    photographerPhotoContact.appendChild(photographerPhoto)
    photographerPhotoContact.appendChild(photographContact)
    photographerHeader.appendChild(photographerInfosPart)
    photographerInfosPart.appendChild(photographerName)
    photographerInfosPart.appendChild(photographerCity)
    photographerInfosPart.appendChild(photographerTagLine)
    
}

function displayPhotographerWorks(photographer, mediasPhoto){
        //photographer's works
        const photosGallery = document.querySelector(`.photographerWorks`)
        photosGallery.innerHTML = '';
    if (mediasPhoto.length > 0){
     mediasPhoto.forEach(media => {
         const photographerWorks = `assets/images/${photographer.name}-photos/${media.image}`
         
         const photosDiv = document.createElement(`div`)
        const gallery = document.createElement(`img`)
        gallery.classList.add('photographers-works')
        gallery.setAttribute("src", photographerWorks)
         const photoName = document.createElement('p')
         photoName.innerText = `${media.title}`
         const photoLike = document.createElement(`p`)
         photoLike.innerText = `${media.likes}`
       
         photosGallery.appendChild(photosDiv)
         photosDiv.appendChild(gallery)
         photosDiv.appendChild(photoName)
         photosDiv.appendChild(photoLike)
      
      
    })
   
    } else {
        console.log('no media found for this photographer')
    }

}



