//Mettre le code JavaScript lié à la page photographer.html

// Retrieve the photographer id from the URL
function getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Fetch the JSON file
async function getPhotographerData() {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
   console.log("JSON file fetched");
    return data;
}

// Filter the photographer’s media works based on the photographerId
async function getPhotographerWorks() {
    // Get photographer's id from URL
    const photographerId = getPhotographerIdFromUrl();
    // Fetch data
    const { photographers, media } = await getPhotographerData();
    // Find the photographer with the retrieved id
    const photographer = photographers.find(p => p.id == photographerId);

    // Check if photographer exists
    if (!photographer) {
        console.error("Photographer not found");
        return;
    }

    // split(' '): Splits the full name into an array by spaces
    const firstName = photographer.name.split(' ')[0];

    // Filter the media works that belong to this photographer
    const photographerWorks = media.filter(item => item.photographerId == photographerId);
    console.log("in getPhotographerWorks", photographerWorks, firstName); 
    return { photographerWorks, firstName};
}

function setMediaDom(works, f_name) {

    console.log("in setMediaDom : ",works,f_name);
    // Assuming there's a div or section with the 'media-gallery' id
    const mediaGallery = document.getElementById('media-gallery');

    // Loop through the media and create DOM elements for each one
    works.forEach(item => {
        // creating <div class="media-item">
        const mediaItem = document.createElement('div'); 
        mediaItem.classList.add('media-item');

        // Assuming the media could be an image or video
        if (item.image) {
            const img = document.createElement('img');
            img.setAttribute('src', `assets/Sample_Photos/${f_name}/${item.image}`);
            img.setAttribute('alt', item.title);
            mediaItem.appendChild(img);
        } else if (item.video) {
            const video = document.createElement('video');
            video.setAttribute('controls', true);
            const source = document.createElement('source');
            source.setAttribute('src', `assets/Sample_Photos/${f_name}/${item.video}`);
            source.setAttribute('type', 'video/mp4');
            video.appendChild(source);
            mediaItem.appendChild(video);
        }
        // add a title
        const title = document.createElement('p');
        title.textContent = item.title;
        mediaItem.appendChild(title);

        // Append each media item to the gallery
        mediaGallery.appendChild(mediaItem);
    })
}



function displayMedia(works,f_name) {

    console.log("in displayMedia : ",works,f_name);
    // Assuming there's a div or section with the 'media-gallery' id
    const mediaGallery = document.getElementById('media-gallery');
    mediaGallery.innerHTML = ''; // Clear the gallery
    setMediaDom(works, f_name);
}

async function mediaInit() {
    // Récupère les data du photographe
    let {photographerWorks: p_works, firstName: f_name } = await getPhotographerWorks();
    console.log(p_works, f_name);
    displayMedia(p_works, f_name);    
}

document.addEventListener('DOMContentLoaded', () => {
    mediaInit();
});