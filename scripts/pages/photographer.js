const dataFullPath = './data/photographers.json';
let photographers = [];
let media = [];

async function main() {
  try {
    let { photographers, media: fetchedMedia } = await fetchData(dataFullPath);

    const photographerId = getPhotographerIdFromUrl();

    // Find the photographer
    const photographer = photographers.find(p => p.id == photographerId);
    if (!photographer) {
      throw new Error(`Photographer with ID ${photographerId} not found.`);
    }

    // Filter media by photographer ID
    const works = fetchedMedia.filter(item => item.photographerId == photographerId);
    media = works;  //// Ensures the global media array is updated
    console.log("Global media after filtering:", media);

    // Initialize other functionality
    console.log("photographer is : ",photographer.name);
    mediaInit(works, photographer);

  } catch (error) {
    console.error("Error in main function:", error);
  }
}

// Call the main function
main();

// Retrieve the photographer id from the URL
function getPhotographerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id')
}

/************************************************************* */
async function fetchData(dataFullPath) {
  try {
      const { photographers, media } = await getJsonArrays(dataFullPath);
      return { photographers, media }; // Return an object containing both
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error for the caller to handle
  }
}

const mediaGallery = document.getElementById('media-gallery');
const dropdownUl = document.getElementById("custom-dropdown");
const options = Array.from(dropdownUl.children); // Get all `li` elements inside the `ul`
let workClicked = [];  // Array to mark clicked heart icon, if a work is in the array, a click will NOT increment like 

// Track the current option du tri
let currentIndex = options.findIndex(option => option.getAttribute("aria-selected") === "true");

displayDropdownList(false);  // cacher la list de tri
console.log("currenIndex : ", currentIndex);

function displayHeaderDom(auteur) {

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

function createMediaPage(works,name) {

    //const pherId = works[0].photographerId;
    const firstName = name.split(' ')[0]; 
    //  get <div id='media-gallery'>
    //const mediaGallery = document.getElementById('media-gallery');
    mediaGallery.innerHTML = ''; // Clear the gallery from previous contents

    displayEachWork(works, firstName);

}


const incrementLikes = (event,item) => {
  event.stopPropagation();  

  if (event.type === "keydown" && event.key !== "Enter") {
      return; // Do nothing
  }
  if (event.target.classList.contains('heart-icon2')) {
      // Get the likeCount element
      const  likeCount = event.target.previousElementSibling;

      if (!workClicked.includes(item.id)) {  // check if the heart icon has already been clicked
        item.likes += 1;  // Increment the like count
        likeCount.textContent = parseInt(likeCount.textContent, 10) + 1;
        likeCount.setAttribute('aria-label', `nombre de like ${likeCount.textContent}`); //update aria-label
        workClicked.push(item.id); // adding the work's id in workClicked
        incrementTotalLike();
      }
  }
}   

function displayEachWork(works, firstName) {
  
    const lightboxController = initLightbox(works, firstName);

    works.forEach((item, index) => {        
      const workModel = createMediaTemplate(item, firstName);

      if (!workModel || typeof workModel.createMediaDom !== 'function') {
        console.error('workModel or createMediaDom is invalid:', workModel);
        return;
      }

      const { mediaItemAnchor, mediaItem } = workModel.createMediaDom(); // Call the method to create the media elements
      //console.log('mediaItemAnchor:', mediaItemAnchor, 'mediaItem:', mediaItem);

      const heartIcon = mediaItem.querySelector('.heart-icon2');      

      // Add event listener on the heart icon to incremente one like
      heartIcon.addEventListener("click", (event) => incrementLikes(event,item));
      heartIcon.addEventListener("keydown", (event) => incrementLikes(event,item));        

      // Add event listener to open lightbox when clicked
      mediaItemAnchor.addEventListener('click', (e) => {
          e.preventDefault();  // Prevent anchor navigation
          lightboxController.openLightbox(index); // Open lightbox with selected item
      });


     ////////////////////////////////////////////////////////////
      /*
      const effectuerTri = (event, index) => {
        if (event.type === "keydown" && event.key !== "Enter") {
            return; // Do nothing
        }
      
        const nameDom = document.querySelector('#ph-bio-data h1');
        let name = nameDom.textContent;
        console.log("nameDom.textContent : ", nameDom.textContent);
        console.log("tri avec index : ", index);
      
        const critere = [ "likes","title","date" ];
        let newData = [...media];
        console.log("effectuerTri  newData : ", newData);
      
        event.stopPropagation();  
      
        if (isDropdownListOn() === false) {
            displayDropdownList(true);
        } else {
            selectOption(index);
            let newSorted = trierWorks(newData, critere[index]);
            console.log("effectuerTri  newSorted dans else avec critere : ",critere[index] ,newSorted);
            displayMedia(newSorted, name);
            displayNbTotalLikes(newSorted);
        }
      };
      // Attach click and Enter listeners to each option for dropdown list
      options.forEach((option, index) => {
        option.addEventListener("click", (event) => effectuerTri(event, index));
        option.addEventListener("keydown", (event) => effectuerTri(event, index));
      });
      */
      /////////////////////////////////////////////////////////////////////////////
      // Append each media item to the gallery
      mediaGallery.appendChild(mediaItem);
    })
}

function setContactName(name) {
    const contactName = document.getElementById('contact-name');
    contactName.textContent = name;
}

function displayMedia(works,photog_name) {

    const mediaGallery = document.getElementById('media-gallery');
    mediaGallery.innerHTML = ''; // Clear the gallery
    createMediaPage(works,photog_name);
}

function displayFullMediaPage(p_works, p_photographer) {

    const photographePageHeader = WorksTemplate();

    photographePageHeader.createPageDom();
    displayHeaderDom(p_photographer);
    displayMedia(p_works,p_photographer.name);
    setContactName(p_photographer.name);
} 

async function mediaInit(ph_works,photographer) {
    console.log("in mediaInit: ****** ");
    const works = trierWorks(ph_works,"likes");
    displayFullMediaPage(works, photographer);
    displayNbTotalLikes(works);
    displayTarif(photographer);
    //const contactName = document.getElementById('contact-name');
    console.log("fin mediaInit() ");
} 
/////////////////////////////////////////////////////////////////////////////////////////////

const arrowPath = document.querySelector('.arrow-up svg path');
const listCritere = document.querySelectorAll('#sort-option li');
const arrowDownVal = 'M6 9l6 9 6-9';
const arrowUpVal = 'M6 18l6-8 6 8';

function isDropdownListOn() {
  let isClosed = dropdownUl.classList.contains('close');

  console.log ("is isDropdownList ON ? ", !isClosed);
  if (!isClosed) {  // if on
    arrowPath.setAttribute('d', arrowDownVal);   //list will toggle to "closed" : arrow down
  } else {
     arrowPath.setAttribute('d', arrowUpVal); //list will toggle to "open" : arrow up
  }

  return !isClosed;
}


// Function to show or hide the dropdown options
function displayDropdownList(show) {
  if (show) {
    dropdownUl.classList.remove('close');
  } else {
    dropdownUl.classList.add('close');
  }
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
  let listIsOn = isDropdownListOn();
  displayDropdownList(!listIsOn);
  console.log (listIsOn? "On, will toggle close" : "closed, will toggle on");
  console.log("arrowPath: ", arrowPath.getAttribute('d'));
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
        previousSelect.classList.remove('selected');
    }

    // Select new option
    const selectedOption = options[index];
    selectedOption.setAttribute("aria-selected", "true");
    selectedOption.classList.add('selected');

    // Close the dropdown
    toggleDropdown();

  }

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function trierWorks(resTri, criteria) {

  sortedWorks = [...resTri];  //copy of resTri

  if (criteria === "title") {
    sortedWorks.sort((a, b) => a.title.localeCompare(b.title)); // alphabet descendant
  } else if (criteria === "date") {
    sortedWorks.sort((a, b) => new Date(b.date) - new Date(a.date)); // le plus recent
  } else if (criteria === "likes") {
    sortedWorks.sort((a, b) => a.likes - b.likes); // les likes ascendants
  }

  return sortedWorks;
}

//  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function initLightbox(works,fname) {

  console.log("***** initLightbox ******")

  const state = {
      currentIndex: 0,
      mediaData: works,
      //firstName: name.split(' ')[0]
  };

  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('close-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
   

  closeBtn.setAttribute('tabindex', '0');
  prevBtn.setAttribute('tabindex', '0');
  nextBtn.setAttribute('tabindex', '0');

  closeBtn.addEventListener('click', () => closeLightbox());
  prevBtn.addEventListener('click',  () => showPreviousMedia());
  nextBtn.addEventListener('click',  () => showNextMedia());

  const lightboxImg = document.querySelector('.lightbox-content img');
  lightboxImg.addEventListener('click', () => {
      if (lightboxImg.classList.contains('magnified')) {
          lightboxImg.classList.remove('magnified');
      } else {
          lightboxImg.classList.add('magnified');
      }
  });

  function openLightbox(index) {
      state.currentIndex = index;
      console.log("openLightbox with currentItem , index : " ,index, state.mediaData[index]);
      const currentItem = state.mediaData[index];
      const lightboxImg = document.getElementById('lightbox-img');
      const lightboxVideo = document.getElementById('lightbox-video');
      const lightboxVideoSource = document.getElementById('lightbox-video-source');
      let mediaTitle = document.getElementById('lightbox-img-title');

      const lightboxImgContent = document.getElementById('lightbox-img-content');
      const lightboxVideoContent = document.getElementById('lightbox-video-content');


      // Hide all media elements
      //lightboxImg.style.display = 'none';
      //lightboxVideo.style.display = 'none';
      lightboxImgContent.style.display = 'none';
      lightboxVideoContent.style.display = 'none';



      if (currentItem.image) {
          lightboxImgContent.style.display = 'flex';  // Show image
          lightboxImg.src = `assets/Sample_Photos/${fname}/${currentItem.image}`;
          lightboxImg.setAttribute('tabindex', '0');
          lightboxImg.setAttribute('alt', `image ${currentItem.title}`);

      } else if (currentItem.video) {
          lightboxVideoContent.style.display = 'flex';  // Show video
          lightboxVideo.setAttribute('arial-label', `${currentItem.title}`);
          lightboxVideo.setAttribute('tabindex', '0');
          lightboxVideoSource.src = `assets/Sample_Photos/${fname}/${currentItem.video}`;
          lightboxVideo.load();  // Load video to reset playback
          lightboxVideo.controls = true;
          mediaTitle = document.getElementById('lightbox-video-title');
      }
      mediaTitle.textContent = currentItem.title;
      lightbox.style.display = 'block';  // Show lightbox

      let lesFocussables = [];
      lesFocussables = document.querySelectorAll('.lightbox-btn, #lightbox-img[tabindex="0"], #lightbox-video[tabindex="0"]');
      if (lesFocussables.length === 0) {
          console.log('No element found ... ');
      } else {
          onlyFocussables(lesFocussables);
      }
      lesFocussables[1].focus();

  }

  function closeLightbox() {
      //const lightbox = document.getElementById('lightbox');
      lightbox.style.display = 'none';  // Hide lightbox
  }

  function showPreviousMedia() {

      let index = (state.currentIndex - 1 + state.mediaData.length) % state.mediaData.length;
      state.currentIndex = index;
      openLightbox(index);
  }

  function showNextMedia() {
      let index = (state.currentIndex + 1 + state.mediaData.length) % (state.mediaData.length);
      state.currentIndex = index;
      openLightbox(index);
  }

  return {openLightbox,closeLightbox,showPreviousMedia,showNextMedia}
}

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

  const nameDom = document.querySelector('#ph-bio-data h1');
  let name = nameDom.textContent;
  console.log("nameDom.textContent : ", nameDom.textContent);
  console.log("tri avec index : ", index);

  const critere = [ "likes","title","date" ];
  let newData = [...media];
  console.log("effectuerTri  newData : ", newData);

  event.stopPropagation();  

  if (isDropdownListOn() === false) {
      displayDropdownList(true);
  } else {
      selectOption(index);
      let newSorted = trierWorks(newData, critere[index]);
      console.log("effectuerTri  newSorted dans else avec critere : ",critere[index] ,newSorted);
      displayMedia(newSorted, name);
      displayNbTotalLikes(newSorted);
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

function displayTarif(photographer) {
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
    arrowPath.setAttribute('d',arrowDownVal);   //list will toggle to "closed" : arrow down
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////
