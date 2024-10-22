import { getJsonArrays } from '../api.js';  // getJsonArrays() to Fetch items in the JSON file 

async function displayData(photographers) {
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

function relookArticle() {
    const article = document.querySelector('article');
    // Apply the styles using JavaScript
    article.style.display = 'flex';            // Set display to flex
    article.style.flexDirection = 'column';    // Set flex-direction to column
    article.style.alignItems = 'center';       // Center the items horizontally
    article.style.justifyContent = 'center';   // Center the items vertically 
}

async function init() {
    const dataFullPath ='data/photographers.json'
    // Récupère les datas des photographes
    const { photographers } = await getJsonArrays(dataFullPath);
    console.log("init => photographers :", photographers);
    displayData(photographers);
}

init();
    
