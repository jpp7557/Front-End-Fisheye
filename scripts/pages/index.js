import { getJsonArrays } from '../api.js';  // getJsonArrays() to Fetch items in the JSON file 
import { onlyFocussables } from '../api.js';  // getJsonArrays() to Fetch items in the JSON file 

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.setUserCardDOM();
        photographersSection.appendChild(userCardDOM);
        console.log("displayData forEach photographer :", photographer.name);

    });
}

async function init() {
    console.log("*** inside   init()");
    const dataFullPath ='data/photographers.json'
    // Récupère les datas des photographes
    const { photographers } = await getJsonArrays(dataFullPath);
    console.log("*** inside  init() ===> Calling    displayData(photographers)");
    await displayData(photographers);
    const lesFocussables = document.querySelectorAll('[tabindex="0"]');
    onlyFocussables(lesFocussables);

}

init();
    
