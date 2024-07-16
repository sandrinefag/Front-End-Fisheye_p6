function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait} = data;
    console.log(name)

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        //creation d'une balise a href pour rendre l'article cliquable
        const articleLink = document.createElement('a');
        articleLink.setAttribute('href', `../photographer.html?id=${id}`);
        const article = document.createElement('article');
        

        //division en 2 de l'article. Une div qui contient la photo et nom du photographe. Et une autre qui contient le reste des infos de celui-ci
        //1ere partie
        const idPhotographerPart = document.createElement('div');
        idPhotographerPart.classList.add('photoNamePhotographer');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        //2eme partie
        const photographerInfo = document.createElement('div');
        photographerInfo.classList.add('photographerInfo');
        const photographerTown = document.createElement('p');
        photographerTown.classList.add('photographerTown');
        photographerTown.textContent = `${city}, ${country}`;
        const photographerTagLine = document.createElement('p');
        photographerTagLine.classList.add('photographerSlogan');
        photographerTagLine.textContent = tagline;
        const photographerPrice = document.createElement('p');
        photographerPrice.classList.add('photographerPrice');
        photographerPrice.textContent = `${price}€ /jours`;
        
        
        articleLink.appendChild(article);
        article.appendChild(idPhotographerPart);
        idPhotographerPart.appendChild(img);
        article.appendChild(photographerInfo);
        
        idPhotographerPart.appendChild(h2);
        photographerInfo.appendChild(photographerTown);
        photographerInfo.appendChild(photographerTagLine);
        photographerInfo.appendChild(photographerPrice);
        return (articleLink);
    }
    return { getUserCardDOM }
}

