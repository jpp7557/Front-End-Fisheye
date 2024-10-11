// Fetch data from the JSON file
    async function getJsonArrays() {
        try {
            const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error('Failed to fetch photographers.json file');
        }
        const data = await response.json();
        console.log("data :",data);
        return data; // Return all arrays found from the JSON file
        } catch (error) {
            console.error('Error No Array fetched.', error);
            return { photographers: [] }; // Return an empty array in case of error
        }
    }

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
        // Récupère les datas des photographes
        const { photographers } = await getJsonArrays();
        console.log("init => photographers :", photographers);
        displayData(photographers);
    }

    init();
    
