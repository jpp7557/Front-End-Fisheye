// Main function to create the media template
function createMediaTemplate(work, f_name) {

    // creating <div class="media-item">
    const mediaItem = document.createElement('article');
    mediaItem.classList.add('media-item');  // Add a class to the div
    mediaItem.setAttribute('role', 'region');
    mediaItem.setAttribute("data-likes", work.likes);

    const playIcon = setDomToPlayIcon('assets/icons/play.svg', '35px', '35px', '0'); // Play icon

    // Factory Method that creates and returns the media element (img or video)
    function createMediaDom() {
        const mediaItemAnchor = document.createElement('button');
        mediaItemAnchor.setAttribute('tabindex', '0');
        mediaItemAnchor.setAttribute('class', 'media-button');


        let media; 
        try {
            media = mediaFactory(work, f_name);
        } catch (error) {
            console.error("Error creating media element:", error.message);
            return; // Exit the function if an error occurs to avoid further issues
        }
        
        if (media.tagName === 'VIDEO') {     // media must be accessible here outside the try block
            mediaItem.appendChild(playIcon); // Append the play icon to video media
        }

        const mediaDescript = document.createElement('div');
        mediaDescript.classList.add('media-descript');
        const title = document.createElement('p');
        title.textContent = work.title;
        //title.setAttribute('tabindex', '0');
        const nbLike = document.createElement('p');
        nbLike.classList.add('nb-like');
        nbLike.textContent = work.likes;
        nbLike.setAttribute('aria-label', `nombre de like ${nbLike.textContent}`);
        nbLike.setAttribute('tabindex', '0');
        const imgHeart = document.createElement('span');
        imgHeart.setAttribute('tabindex', '0');
        imgHeart.setAttribute('aria-label', "j'aime");
        if (!imgHeart.classList.contains('clicked')) { // prevent incrementing action
            imgHeart.classList.add('like','fas', 'fa-heart', 'heart-icon2');
        } else {
            imgHeart.classList.add('like','fas', 'fa-heart', 'heart-icon2', 'clicked');
        }



        mediaItemAnchor.appendChild(media);  // Append <img> or <video> to the anchor
        mediaItem.appendChild(mediaItemAnchor);
        
        mediaDescript.appendChild(title);
        mediaDescript.appendChild(nbLike);
        mediaDescript.appendChild(imgHeart);

        mediaItem.appendChild(mediaDescript);
        

        return {mediaItemAnchor, mediaItem} ;
    }

    return { createMediaDom };
}

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

         // Set ARIA roles and attributes
         article.setAttribute('role', 'region'); // Each photographer card is a region for better navigation
         //article.setAttribute('aria-label', `${photographer.name}'s profile`);

        // Create the image element
        const img = document.createElement('img');
        img.classList.add('circle'); 
        img.setAttribute('src', `assets/photographers/${photographer.portrait}`);
        img.setAttribute('alt', `${photographer.name}`);

        ancre.appendChild(img);
        // set anchor (link to photographer html page)
        ancre.setAttribute('href', `photographer.html?id=${photographer.id}`);
        ancre.setAttribute('aria-label', `Lien,  la page de ${photographer.name}`); // Clear, meaningful description
        ancre.setAttribute('tabindex', '0');     // make focusable

        // Set contents for photographer: name, city, tagline, price
        h2.textContent = photographer.name;
        city.setAttribute('class', 'city');
        city.textContent = `${photographer.city}, ${photographer.country}`;
        tagline.textContent = photographer.tagline;
        price.setAttribute('class', 'prix');
        price.textContent = `${photographer.price}€/jour`;

        // Append elements to article
        article.appendChild(ancre);  // Append the anchor with the img inside
        article.appendChild(h2);
        article.appendChild(city);
        article.appendChild(tagline);
        article.appendChild(price);

        return article;
    }
    return {name, picture, setUserCardDOM}
}

function WorksTemplate() {

    function createPageDom() {

        // Create Header Dom
        const $photographeHeader = document.querySelector(".photographe-header");    
        const $elemBio = document.createElement('section');
        $elemBio.id = "ph-bio-data";

        const $elemBtn = document.createElement('div');
        const $contactBtn = document.querySelector('.contact_button');
        const $divImg = document.createElement('div');
        const $phPortrait = document.createElement('img');
    
        $elemBtn.appendChild($contactBtn);
        $elemBtn.id="btn-contact";
        $elemBtn.style.display = 'flex';
        $elemBtn.style.justifyContent = 'center';
    
        $divImg.appendChild($phPortrait);
        $divImg.id="div-img";
        $divImg.style.display = 'flex';            // Set display to flex
        $divImg.style.justifyContent = 'center';   // Center the items vertically
    
        const nameElement = document.createElement('h1');
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

        // create media gallery div: <div id='media-gallery'>
        const $worksPage = document.createElement('section')
        $worksPage.setAttribute('id', 'media-gallery');

        return $photographeHeader;        
    }
    return {createPageDom}

}

function imageTemplate() {
    let media = document.createElement('img');

    function createImage(work, f_name) {
        media.setAttribute('src', `assets/Sample_Photos/${f_name}/${work.image}`);
        media.setAttribute('alt', work.title);
        //media.setAttribute('tabindex', '0');
        return media
    }
    return {createImage} ;
}

function videoTemplate() {
    let media = document.createElement('video');

    function createVideo(work, f_name) {
        media.setAttribute('src', `assets/Sample_Photos/${f_name}/${work.video}`);
        media.setAttribute('type', 'video/mp4');
        media.setAttribute('tabindex', '-1');
        media.setAttribute('aria-label', `video ${work.title}`);
        return media;
    }
    return {createVideo};
}

// Factory Function to create media (image or video)
function mediaFactory(work, f_name) {

    let media;
    if (work.image) {
        mediaTemplate = imageTemplate();
        media = mediaTemplate.createImage(work, f_name);
    } else if (work.video) {
        mediaTemplate = videoTemplate();
        media = mediaTemplate.createVideo(work, f_name);
    } else {
        // Throw an error if neither image nor video is provided
        throw new Error("Invalid media type: must be either an image or a video");
    }
    return media;
}

function setDomToPlayIcon(iconPath, iconw, iconh, zInd) {

    const pIcon = document.createElement('img');
    pIcon.classList.add('play-icon');
    pIcon.setAttribute('src', iconPath);
    pIcon.setAttribute('alt', '');
    pIcon.setAttribute('tabindex', '-1');
    pIcon.style.width = iconw;
    pIcon.style.height = iconh;
    pIcon.style.opacity = 0.6;
    pIcon.style.position = 'absolute';
    pIcon.style.top = '40%';
    pIcon.style.left = '50%';
    pIcon.style.transform = 'translate(-50%, 0%)';
    pIcon.style.pointerEvents = 'none';
    pIcon.style.zIndex = zInd;
    pIcon.style.objectFit = 'cover';
    return pIcon;
}
