import { getJsonArrays } from '../api.js';  // getJsonArrays() to Fetch items in the JSON file 
import { onlyFocussables } from '../api.js'; 
import { initLightbox } from '../pages/lightbox.js';

// Retrieve the photographer id from the URL
async function getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id')
}

/************************************************************* */

// Filter the photographer’s media works based on the photographerId
async function getPhotographerWorks() {
    console.log("*** ToTo:  function getPhotographerWorks()");
    const dataFullPath ='data/photographers.json'
    const { photographers, media } = await getJsonArrays(dataFullPath);
    // Get photographer's id from URL
    const photographerId = await getPhotographerIdFromUrl();

    // Retrieve data (bio and media) of photographers
    console.log("photographerId :", photographerId);

    // Find the photographer with the retrieved id
    const photographer = photographers.find(p => p.id == photographerId);

    // Check if photographer exists
    if (!photographer) {
        console.error("Photographer not found");
        return;
    }

    // split(' '): Splits the full name into an array by spaces
    //const firstName = photographer.name.split(' ')[0];
    const ph_fullName = photographer.name;

    // Filter the media works that belong to this photographer
    const photographerWorks = media.filter(item => item.photographerId == photographerId);
    const ph_portrait = photographer.portrait;
    console.log("in getPhotographerWorks", ph_fullName, ph_portrait); 

    //return { photographerWorks, ph_fullName, ph_portrait};
    return { photographer, photographerWorks };
}

function displayHeaderDom(auteur) {

    console.log("******************  in displayHeaderDom:", auteur.name);

    //const photogrHeader = document.querySelector(".photographe-header");
    //console.log(" in displayHeaderDom, photogrHeader: ",  photogrHeader);
    let divPortrait = document.getElementById('div-img');
    let imgPortrait = divPortrait.querySelector('img');
    imgPortrait.setAttribute('src', `assets/photographers/${auteur.portrait}`);
    imgPortrait.setAttribute('alt', `photo de ${auteur.name}`);
    imgPortrait.setAttribute('tabindex', '0');


    divPortrait.style.display = 'flex';            // Set display to flex
    divPortrait.style.justifyContent = 'center';   // Center the items vertically

    const photographeBio = document.getElementById('ph-bio-data');
    let name = photographeBio.querySelector('h2');
    name.setAttribute('tabindex', '0');
    name.textContent = auteur.name;
    
    const city = document.getElementById('city');
    city.textContent = auteur.city + ", " + auteur.country;
    city.setAttribute('tabindex', '0');


    const tagline = document.getElementById('tag-line');
    tagline.textContent = auteur.tagline;
    tagline.setAttribute('tabindex', '0');


    photographeBio.appendChild(name);
    photographeBio.appendChild(city);
    photographeBio.appendChild(tagline);
    
}

function createMediaPage(works, name) {

    console.log("in createMediaPage : ",name);
    const firstName = name.split(' ')[0];
 
    //  get <div id='media-gallery'>
    const mediaGallery = document.getElementById('media-gallery');
    mediaGallery.innerHTML = ''; // Clear the gallery from previous contents

    const lightboxController = initLightbox(works, name);

    works.forEach((item, index) => {        
            console.log(`Item at index ${index}:`, item);
        const workModel = createMediaTemplate(item, firstName);
        const { mediaItemAnchor, mediaItem } = workModel.createMediaDom(); // Call the method to get the media elements
        // Add event listener to open lightbox when clicked
        mediaItemAnchor.addEventListener('click', (e) => {
            console.log("mediaItemAnchor EventListener works[item,index]: index=",index, works[item,index]);
            e.preventDefault();  // Prevent anchor navigation
            lightboxController.openLightbox(index); // Open lightbox with selected item
        });
        
        // Append each media item to the gallery
        mediaGallery.appendChild(mediaItem);
    })
}

function setContactName(name) {
    const contactName = document.getElementById('contact-name');
    contactName.textContent = name;
}

function displayMedia(works,f_name) {

    console.log("in displayMedia f_name : ",f_name);
    // Searching div or section with the 'media-gallery' id
    const mediaGallery = document.getElementById('media-gallery');
    mediaGallery.innerHTML = ''; // Clear the gallery
    createMediaPage(works, f_name);
}

function displayFullMediaPage(p_works, p_photographer) {
    console.log("in displayFullMediaPage : calling WorksTemplate ...");
    const photographePageHeader = WorksTemplate();

    photographePageHeader.createPageDom();
    displayHeaderDom(p_photographer);
    displayMedia(p_works,p_photographer.name);
    setContactName(p_photographer.name);
} 

async function mediaInit() {
    // Récupère les data du photographe
    const {photographer: p_photographer, photographerWorks: p_works } = await getPhotographerWorks();
    displayFullMediaPage(p_works, p_photographer);
    //const contactName = document.getElementById('contact-name');
    console.log("fin mediaInit() ");
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes("photographer.html")) {
        console.log("*** Calling     mediaInit()");
        mediaInit().then(() => {
            console.log("***    mediaInit() terminated ...");

            const lesFocussables = document.querySelectorAll('img[tabindex="0"], .media-button[tabindex="0"] ');
            console.log("afficher lesFocussables :" , lesFocussables);
            if (lesFocussables.length === 0) {
                console.log('No articles found. Waiting for articles to be added.');
            } else {
                onlyFocussables(lesFocussables);
            }
            lesFocussables[0].focus();
        })
    }   
});
