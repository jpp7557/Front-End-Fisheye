//Mettre le code JavaScript lié à la page photographer.html
import { getJsonArrays } from '../api.js';  // getJsonArrays() to Fetch items in the JSON file 



// Retrieve the photographer id from the URL
function getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/************************************************************* */
/*
function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.setUserCardDOM();
        console.log("displayData, userCardDOM ", userCardDOM);
        photographersSection.appendChild(userCardDOM);
        console.log("displayData forEach photographer :", photographer);

    });
    relookArticle();
}
async function init() {
    const dataFullPath ='data/photographers.json'
    // Récupère les datas des photographes
    const { photographers } = await getJsonArrays(dataFullPath);
    console.log("init => photographers :", photographers);
    displayData(photographers);
}
*/

/*
async function mediaInit() {  //cette fonction est une copie à supprimer
    
    // Récupère les data du photographe
    let {photographerWorks: p_works, firstName: f_name } = await getPhotographerWorks();

    displayMedia(p_works, f_name);    
}
*/
/****************************************************** */


// Filter the photographer’s media works based on the photographerId
async function getPhotographerWorks() {
    // Get photographer's id from URL
    const photographerId = getPhotographerIdFromUrl();
    // Retrieve data (bio and media) of photographers
    const dataFullPath ='data/photographers.json'
    const { photographers, media } = await getJsonArrays(dataFullPath);
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
    imgPortrait.setAttribute('alt', `${auteur.name}`);

    divPortrait.style.display = 'flex';            // Set display to flex
    divPortrait.style.justifyContent = 'center';   // Center the items vertically

    const photographeBio = document.getElementById('ph-bio-data');
    let name = photographeBio.querySelector('h2');
    name.textContent = auteur.name;
    
    const city = document.getElementById('city');
    city.textContent = auteur.city + ", " + auteur.country;

    const tagline = document.getElementById('tag-line');
    tagline.textContent = auteur.tagline;

    photographeBio.appendChild(name);
    photographeBio.appendChild(city);
    photographeBio.appendChild(tagline);
    
}

function createMediaPage(works, name) {

    console.log("in createMediaPage : ",name);

    const firstName = name.split(' ')[0];
 
    //  get <div id='media-gallery'>
    const mediaGallery = document.getElementById('media-gallery');
        // Loop through works and create DOM elements for each one
    works.forEach(item => {
        // creating <div class="media-item">
        const mediaItem = document.createElement('div'); 
        mediaItem.classList.add('media-item');        // add a class to div

        let workModel = createMediaTemplate(item, firstName);
        let workDOM = workModel.createMediaDom();
        mediaItem.appendChild(workDOM);

        let title = document.createElement('p');
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
    createMediaPage(works, f_name);
}

function displayFullMediaPage(p_works, p_photographer) {
    console.log("in displayFullMediaPage : calling WorksTemplate ...");
    const photographePageHeader = WorksTemplate();
    console.log("in displayFullMediaPage : photographePageHeader ...", photographePageHeader);
    const htmlPage = photographePageHeader.createPageDom();
    console.log("htmlPage : ", htmlPage);
    displayHeaderDom(p_photographer);
    displayMedia(p_works,p_photographer.name);
}

async function mediaInit() {
    // Récupère les data du photographe
    let {photographer: p_photographer, photographerWorks: p_works } = await getPhotographerWorks();
    console.log("******************  in asyn function mediaInit() name :", p_photographer.name);
    displayFullMediaPage(p_works, p_photographer);    
}

document.addEventListener('DOMContentLoaded', () => {
    mediaInit();
});


//mediaInit();
