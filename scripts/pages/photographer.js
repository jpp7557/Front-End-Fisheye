import { getJsonArrays } from '../api.js';  // getJsonArrays() to Fetch items in the JSON file 
import { onlyFocussables } from '../api.js'; 
import { initLightbox } from '../pages/lightbox.js';

// Retrieve the photographer id from the URL
function getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id')
}

/************************************************************* */
const dataFullPath ='data/photographers.json'
const { photographers, media } = await getJsonArrays(dataFullPath);
const photographerId = getPhotographerIdFromUrl();
const photographer = photographers.find(p => p.id == photographerId);
const firstName = photographer.name.split(' ')[0];
const works = media.filter(item => item.photographerId == photographerId); // select media by Id
const mediaGallery = document.getElementById('media-gallery');
const dropdownUl = document.getElementById("custom-dropdown");
const options = Array.from(dropdownUl.children); // Get all `li` elements inside the `ul`
//const options = document.querySelectorAll("#custom-dropdown li"); // get options

// Track the current option du tri
let currentIndex = options.findIndex(option => option.getAttribute("aria-selected") === "true");
const resTri = [...works]; // Create a copy to avoid mutating the original array

displayDropdownList(false);  // cacher la list de tri
console.log("photographer.name:",photographer.name);
console.log("currenIndex : ", currentIndex);

function displayHeaderDom(auteur) {

    //const photogrHeader = document.querySelector(".photographe-header");
    let divPortrait = document.getElementById('div-img');
    let imgPortrait = divPortrait.querySelector('img');
    imgPortrait.setAttribute('src', `assets/photographers/${auteur.portrait}`);
    imgPortrait.setAttribute('alt', `photo de ${auteur.name}`);
    imgPortrait.setAttribute('tabindex', '0');


    divPortrait.style.display = 'flex';            // Set display to flex
    divPortrait.style.justifyContent = 'center';   // Center the items vertically

    const photographeBio = document.getElementById('ph-bio-data');
    let name = photographeBio.querySelector('h1');
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

function createMediaPage(works) {

    //const firstName = name.split(' ')[0];
    console.log("in createMediaPage  ", firstName);
 
    //  get <div id='media-gallery'>
    //const mediaGallery = document.getElementById('media-gallery');
    mediaGallery.innerHTML = ''; // Clear the gallery from previous contents

    displayEachWork(works, firstName);

}

function displayEachWork(works, firstName) {
  
    const lightboxController = initLightbox(works, firstName);
  /*
    const nbLike = document.querySelectorAll('.nb-like');
    const nbTotalLikes = document.getElementById('total-like');
    const totalLike = 0;
  */
    works.forEach((item, index) => {        
      const workModel = createMediaTemplate(item, firstName);
      const { mediaItemAnchor, mediaItem } = workModel.createMediaDom(); // Call the method to get the media elements

      // Add event listener to open lightbox when clicked
      mediaItemAnchor.addEventListener('click', (e) => {
          e.preventDefault();  // Prevent anchor navigation
          lightboxController.openLightbox(index); // Open lightbox with selected item
      });
      // Append each media item to the gallery
      mediaGallery.appendChild(mediaItem);
  //totalLike += nbLike.item.likes;
    })
  //nbTotalLikes.textContent= totalLike;

      // set CLICK listener to each heart icon
    const clLikes = document.querySelectorAll('.heart-icon2');
    clLikes.forEach((heartIcon) => {
        heartIcon.addEventListener('click', () => {
          if (!heartIcon.classList.contains('clicked')) { // prevent incrementing action
              // Find the sibling `span` for the like count
              const likeCount = heartIcon.previousElementSibling;
              console.log("likeCount : ",likeCount.textContent);
                // Increment the like count
                let currentLikes = parseInt(likeCount.textContent, 10);
                likeCount.textContent = currentLikes + 1;
                // mark heart-icon as clicked to prevent futher incrementation
                heartIcon.classList.add('clicked');
                incrementTotalLike();
          }
        })
    })
}


function setContactName(name) {
    const contactName = document.getElementById('contact-name');
    contactName.textContent = name;
}

function displayMedia(works,photog_name) {

    const mediaGallery = document.getElementById('media-gallery');
    mediaGallery.innerHTML = ''; // Clear the gallery
    createMediaPage(works);
}



function displayFullMediaPage(p_works, p_photographer) {

    const photographePageHeader = WorksTemplate();

    photographePageHeader.createPageDom();
    displayHeaderDom(p_photographer);
    displayMedia(p_works,p_photographer.name);
    setContactName(p_photographer.name);
} 

async function mediaInit() {
    console.log("in mediaInit: ****** ");
    const works = trierWorks("likes");
    displayFullMediaPage(works, photographer);
    displayNbTotalLikes(works);
    displayTarif();
    //const contactName = document.getElementById('contact-name');
    console.log("fin mediaInit() ");


} 
/////////////////////////////////////////////////////////////////////////////////////////////

function isDropdownListOn() {
  let isOn = options.some(option => option.getAttribute("aria-selected") === "false" && option.style.display === "block");
  console.log ("is isDropdownList ON ? ", isOn);
  return isOn;
}

// Function to show or hide the dropdown options
function displayDropdownList(show) {
  options.forEach(option => {
    if (option.getAttribute("aria-selected") === "true") {
      option.style.display = "block"; // Keep the selected option always visible
    } else {
      option.style.display = show ? "block" : "none"; // Show or hide based on `show`
    }
  });
}

// Function to toggle dropdown visibility
function toggleDropdown() {
  displayDropdownList(!isDropdownListOn());
}


// Focus on an option
function focusOption(event,index) {
  
    let currentOption;
    let selon = 0;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      selon = 1; 
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      selon = -1;
    }

    // Update currentIndex with wrap-around
    currentIndex = (index + options.length) % options.length;

    currentOption = options[currentIndex];
    currentOption.setAttribute("tabindex", "0");
    currentOption.focus(); // Move focus to the current option
}

function selectOption(index) {
  console.log("selectOption index: ", index);

    // Deselect previously selected option
    const previousSelect = options.find(opt => opt.getAttribute("aria-selected") === "true");
    if (previousSelect) {
        previousSelect.setAttribute("aria-selected", "false");
    }

    // Select new option
    const selectedOption = options[index];
    selectedOption.setAttribute("aria-selected", "true");

    // Close the dropdown
    toggleDropdown();

  }

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function trierWorks(criteria) {

  if (criteria === "title") {
    resTri.sort((a, b) => a.title.localeCompare(b.title)); // alphabet descendant
  } else if (criteria === "date") {
    resTri.sort((a, b) => new Date(b.date) - new Date(a.date)); // le plus recent
  } else if (criteria === "likes") {
    resTri.sort((a, b) => a.likes - b.likes); // les likes ascendants
  }

  return resTri;
}

//  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


/****** Listeners  *******/
///////////////////////////////////////////////////
// EventListener: Click or Enter on `ul` to toggle visibility
dropdownUl.addEventListener("click", () => {
  console.log("Ul CLICK listening Do What ?");
  toggleDropdown();
});

// Handle keyboard navigation within the dropdown
dropdownUl.addEventListener("keydown", (event) => {

    if (event.key === "ArrowDown") {
      event.preventDefault();
      console.log("Down currentIndex: ", currentIndex);
      focusOption(event, (currentIndex + 1) % options.length); // Move to the next option
    } else if (event.key === "ArrowUp") {
      console.log("Up currentIndex: ", currentIndex);
      event.preventDefault();
      focusOption(event, (currentIndex - 1 + options.length) % options.length); // Move to the previous option
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      console.log("key === Enter,  currentIndex: ", currentIndex);
        if (isDropdownListOn() === false) {
          displayDropdownList(true);
        } else {
          selectOption(currentIndex); // Select the current option
        }   
    } else if (event.key === "Escape") {
      console.log("key === Escape,  currentIndex: ", currentIndex);
      event.preventDefault();
      toggleDropdown(); // Close the dropdown
    }
});


const effectuerTri = (event, index) => {
  if (event.type === "keydown" && event.key !== "Enter") {
      return; // Do nothing
  }

  event.stopPropagation();
  if (isDropdownListOn() === false) {
      displayDropdownList(true);
  } else {
      const critere = event.target.getAttribute("data-sort");
      selectOption(index);
      const works = trierWorks(critere);
      displayMedia(works, firstName);
      displayNbTotalLikes(works);
  }
};
// Attach click and Enter listeners to each option for dropdown list
options.forEach((option, index) => {
  option.addEventListener("click", (event) => effectuerTri(event, index));
  option.addEventListener("keydown", (event) => effectuerTri(event, index));
});


const compterLikes = (works) => {
  let totalLikes = 0;
  works.forEach((work) => {
      totalLikes += parseInt(work.likes, 10);
      console.log("totalLikes provisoir : ", work.title, work.likes);
  })
  console.log(compterLikes, totalLikes);
  return totalLikes;

}

const totalLikesDiv = document.getElementById('total-like');
const totalLikesElement = totalLikesDiv.children[0]; // Access the first child (<p>likes</p>)

function displayNbTotalLikes(works) {
    totalLikesElement.textContent = compterLikes(works);
    console.log( "nbTotalLikes : ", totalLikesElement.textContent);
}

function displayTarif() {
    const phgPrice = totalLikesDiv.children[2];
    phgPrice.textContent = photographer.price + "€ /jour";
    console.log( "Prix : ", phgPrice.textContent);

  }

const incrementTotalLike = () => {
  
    let totalPageLikes = parseInt(totalLikesElement.textContent, 10);
    totalPageLikes++;
    totalLikesElement.textContent = totalPageLikes;
    console.log("incrementing totalLikes");

}

  // Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  console.log("page CLICK listening: ");
  if (!event.target.closest(".custom-dropdown")) {
    event.stopPropagation();
    displayDropdownList(false);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////

mediaInit().then(() => {
    const lesFocussables = document.querySelectorAll('img[tabindex="0"], .media-button[tabindex="0"] ');
    if (lesFocussables.length === 0) {
        console.log('No elements found !');
    } else {
        onlyFocussables(lesFocussables);
    }
    lesFocussables[0].focus();

})

/*
const clLikes = document.querySelectorAll('.heart-icon2');
clLikes.forEach((heartIcon) => {
    heartIcon.addEventListener('click', () => {
      if (!heartIcon.classList.contains('clicked')) {
          // Find the sibling `span` for the like count
          const likeCount = heartIcon.previousElementSibling;
          console.log("likeCount : ",likeCount.textContent);
            // Increment the like count
            let currentLikes = parseInt(likeCount.textContent, 10);
            likeCount.textContent = currentLikes + 1;

            // Add a visual effect (optional)
            heartIcon.classList.add('clicked');
      }
    })
  })
console.log("clLike CLICK listening: ");
*/


