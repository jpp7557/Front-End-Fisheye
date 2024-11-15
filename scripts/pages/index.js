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

function relookArticle() {
    const articles = document.querySelectorAll('article');
    if (articles.length === 0) {
        console.log('No articles found. Waiting for articles to be added.');
        return; // Exit if no articles are found
    }
    articles.forEach(article => {
        // Apply the styles
        article.style.display = 'flex';          // Set display to flex
        article.style.flexDirection = 'column';  // Set flex-direction to column
        article.style.alignItems = 'center';     // Center the items horizontally
        article.style.justifyContent = 'center'; // Center the items vertically 
    });
}

async function init() {
    console.log("*** inside   init()");
    const dataFullPath ='data/photographers.json'
    // Récupère les datas des photographes
    const { photographers } = await getJsonArrays(dataFullPath);
    console.log("*** inside  init() ===> Calling    displayData(photographers)");
    await displayData(photographers);
    relookArticle();

    const lesFocussables = document.querySelectorAll('a[tabindex="0"]');
//    const firstFocusElement = lesFocussables[0];
//    const lastFocusElement = lesFocussables[lesFocussables.length - 1];
/*    document.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
    
                if (event.shiftKey) {
                    // If Shift + Tab is pressed and focus is on the first element, loop to the last
                    if (document.activeElement === firstFocusElement) {
                        event.preventDefault();
                        lastFocusElement.focus();
                    }
                } else {
                    // If Tab is pressed and focus is on the last element, loop to the first
                    if (document.activeElement === lastFocusElement) {
                        event.preventDefault();
                        firstFocusElement.focus();
                    }
                }
            }
    });
*/
    onlyFocussables(lesFocussables);

}

init();
    
