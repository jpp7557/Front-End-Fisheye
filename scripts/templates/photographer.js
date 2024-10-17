function photographerTemplate(photographer) {
    const { name, portrait } = photographer;
    const picture = `assets/photographers/${portrait}`;

    function setUserCardDOM() {
        // Create the HTML elements
        const article = document.createElement('article');
        const ancre = document.createElement('a');
        const h2 = document.createElement('h2');
        const city = document.createElement('p');
        const tagline = document.createElement('p');
        const price = document.createElement('p');

        // Create the container circleDiv for img
        const circleDiv = document.createElement('div');
        circleDiv.classList.add('circle');  // add class "circle" to circleDiv
        article.appendChild(circleDiv);     // Append the circle to the selected article

        // Create the image element
        const img = document.createElement('img');
        img.setAttribute('src', `assets/photographers/${photographer.portrait}`);
        img.setAttribute('alt', `${photographer.name}`);

        // Append the image to the circular container
        circleDiv.appendChild(img);

        // Append the circular container to the ancre container
        ancre.appendChild(circleDiv);

        // set anchor (link to photographer html page)
        ancre.setAttribute('href', `photographer.html?id=${photographer.id}`);

        // Set the h2 element with photographer's name then append it to the anchor
        h2.textContent = photographer.name;
        ancre.appendChild(h2);  // Append the <h2> to the anchor

        // Set other content for other elements: city, tagline, price
        city.setAttribute('class', 'city');
        city.textContent = `${photographer.city}, ${photographer.country}`;
        tagline.textContent = photographer.tagline;
        price.setAttribute('class', 'prix');
        price.textContent = `${photographer.price}€/day`;

        // Append elements to article
        article.appendChild(ancre);  // Append the anchor with the img and h2 inside
        article.appendChild(city);
        article.appendChild(tagline);
        article.appendChild(price);

        return article;
    }
    return {name, picture, setUserCardDOM}
}