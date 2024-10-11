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

        // Create the div container (circle) of img
        const circle = document.createElement('div');
        circle.style.width = '250px';           // Circle size
        circle.style.height = '250px';          // Circle size
        circle.style.borderRadius = '50%';      // Makes the container circular
        circle.style.overflow = 'hidden';       // Ensures the image doesn't overflow the circle
        circle.style.display = 'flex';          // Flexbox to center the image
        circle.style.justifyContent = 'center'; // Centers the image horizontally
        circle.style.alignItems = 'center';     // Centers the image vertically

        // Create the image element
        const img = document.createElement('img');
        img.setAttribute('src', `assets/photographers/${photographer.portrait}`);
        img.setAttribute('alt', `${photographer.name}`);
        img.style.width = '250px';              
        img.style.height = '250px';              
        img.style.transform = 'scale(1.3)';  // Scale the image up inside the circle
        img.style.objectFit = 'cover';

        // Append the image to the circular container
        circle.appendChild(img);
        // Append the circular container to the ancre container
        ancre.appendChild(circle);

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