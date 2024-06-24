function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait} = data;
    console.log(name)

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const photographerTown = document.createElement('p');
        photographerTown.classList.add('PhotographerPicture');
        photographerTown.textContent = `${city}, ${country}`;
        const photographerTagLine = document.createElement('p');
        photographerTagLine.classList.add('PhotographerSlogan');
        photographerTagLine.textContent = tagline;
        const photographerPrice = document.createElement('p');
        photographerPrice.classList.add('PhotographerPrice');
        photographerPrice.textContent = `${price}€ /jours`;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(photographerTown);
        article.appendChild(photographerTagLine);
        article.appendChild(photographerPrice);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}