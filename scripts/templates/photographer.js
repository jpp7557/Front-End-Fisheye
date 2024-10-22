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

function WorksTemplate() {

    function createPageDom() {

        // Header Dom
        const $photographeHeader = document.querySelector(".photographe-header");    
        console.log(" in WorksTemplate, photographeHeader: ",  $photographeHeader);
        const $elemBio = document.createElement('div');
        $elemBio.id = "ph-bio-data";

        const $elemBtn = document.createElement('div');
        const $contactBtn = document.querySelector('.contact_button');
        const $divImg = document.createElement('div');
        const $phPortrait = document.createElement('img');
        //img.setAttribute('src', `assets/photographers/${photographer.portrait}`);
        //$phPortrait.setAttribute('src', 'assets/photographers/MimiKeel.jpg');
        //$phPortrait.setAttribute('alt', 'Mimi_Keel');
    
        $elemBtn.appendChild($contactBtn);
        $elemBtn.id="btn-contact";
        $elemBtn.style.display = 'flex';
    
        $divImg.appendChild($phPortrait);
        $divImg.id="div-img";
        $divImg.style.display = 'flex';            // Set display to flex
        $divImg.style.justifyContent = 'center';   // Center the items vertically
    
        const nameElement = document.createElement('h2');
        const cityElement = document.createElement('p');
        cityElement.id = "city";
        const taglineElement = document.createElement('p');
        taglineElement.id = "tag-line";

        $elemBio.appendChild(nameElement);        
        $elemBio.appendChild(cityElement);
        $elemBio.appendChild(taglineElement);

        $photographeHeader.appendChild($elemBio);
        $photographeHeader.appendChild($elemBtn);
        $photographeHeader.appendChild($divImg);

        // create works Dom: <div id='media-gallery'>
        const $worksPage = document.createElement('div')
        $worksPage.setAttribute('id', 'media-gallery');

        console.log("$photographeHeader :", $photographeHeader);
        return $photographeHeader;        
    }
    return {createPageDom}

}

function createMediaTemplate(work,f_name) {
    console.log("************  createMediaTemplate : ", work, f_name);
    function createMediaDom() {

        let media;
        // the media could be an image or video
        if (work.image) {
            const img = document.createElement('img');
            img.setAttribute('src', `assets/Sample_Photos/${f_name}/${work.image}`);
            img.setAttribute('alt', work.title);
            //mediaItem.appendChild(img);
            media = img;
        } else if (work.video) {
            const video = document.createElement('video');
            video.setAttribute('controls', true);
            const source = document.createElement('source');
            source.setAttribute('src', `assets/Sample_Photos/${f_name}/${work.video}`);
            source.setAttribute('type', 'video/mp4');
            video.appendChild(source);
            media = video;
        }
        return media;
    }
    return {createMediaDom}

}
