function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.setUserCardDOM();
        photographersSection.appendChild(userCardDOM);
        console.log("displayData forEach photographer :", photographer.name);

    });
}

async function init() {
    try {   
        console.log("*** inside   init()");
        const dataFullPath ='./data/photographers.json'
        // Récupère les datas des photographes
        const { photographers } = await getJsonArrays(dataFullPath);
        console.log("*** inside  init() ===> Calling    displayData(photographers)");
        displayData(photographers);
        const lesFocussables = document.querySelectorAll('[tabindex="0"]');
        onlyFocussables(lesFocussables);
    } catch (error) {
        console.error("Error initializing the app:", error);
    }
}

init();
