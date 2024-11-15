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
        ancre.setAttribute('aria-label', `Visiter la page de ${photographer.name}`); // Clear, meaningful description
        ancre.setAttribute('tabindex', '0');     // make focusable
    // Set the h2 element with photographer's name then append it to the anchor
        h2.textContent = photographer.name;
        ancre.appendChild(h2);  // Append the <h2> to the anchor

        // Set other content for other elements: city, tagline, price
        city.setAttribute('class', 'city');
        city.textContent = `${photographer.city}, ${photographer.country}`;
        tagline.textContent = photographer.tagline;
        price.setAttribute('class', 'prix');
        price.textContent = `${photographer.price}€ par jour`;

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

        // Create Header Dom
        const $photographeHeader = document.querySelector(".photographe-header");    
        console.log(" in WorksTemplate, photographeHeader: ",  $photographeHeader);
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

        // create media gallery div: <div id='media-gallery'>
        const $worksPage = document.createElement('section')
        $worksPage.setAttribute('id', 'media-gallery');

        console.log("$photographeHeader :", $photographeHeader);
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

// Main function to create the media template
function createMediaTemplate(work, f_name) {
    console.log("************  createMediaTemplate : f_name ", f_name);

    // creating <div class="media-item">
    const mediaItem = document.createElement('article');
    mediaItem.classList.add('media-item');  // Add a class to the div
    const playIcon = setDomToPlayIcon('assets/icons/play.svg', '35px', '35px', '0'); // Play icon

    // Factory Method that creates and returns the media element (img or video)
    function createMediaDom() {
        const mediaItemAnchor = document.createElement('button');
        mediaItemAnchor.setAttribute('tabindex', '0');
        mediaItemAnchor.setAttribute('class', 'media-button');


        let media; 
        try {
            media = mediaFactory(work, f_name);
            console.log("Media element created:", media);
        } catch (error) {
            console.error("Error creating media element:", error.message);
            return; // Exit the function if an error occurs to avoid further issues
        }
        
        console.log("media type is :", media.tagName);

        if (media.tagName === 'VIDEO') {     // media must be accessible here outside the try block
            mediaItem.appendChild(playIcon); // Append the play icon to video media
        }

        const title = document.createElement('p');
        title.textContent = work.title;

        mediaItemAnchor.appendChild(media);  // Append <img> or <video> to the anchor
        mediaItem.appendChild(mediaItemAnchor);
        mediaItem.appendChild(title);
        

        return {mediaItemAnchor, mediaItem} ;
    }

    return { createMediaDom };
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
