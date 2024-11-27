import { onlyFocussables } from '../api.js'; 

export function initLightbox(works,fname) {

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
        //const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxVideo = document.getElementById('lightbox-video');
        const lightboxVideoSource = document.getElementById('lightbox-video-source');

        // Hide all media elements
        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'none';

        if (currentItem.image) {
            lightboxImg.src = `assets/Sample_Photos/${fname}/${currentItem.image}`;
            lightboxImg.style.display = 'block';  // Show image
            lightboxImg.setAttribute('tabindex', '0');
            lightboxImg.setAttribute('alt', `image ${currentItem.title}`);

        } else if (currentItem.video) {
            lightboxVideo.setAttribute('arial-label', `${currentItem.title}`);
            lightboxVideo.setAttribute('tabindex', '0');
            lightboxVideoSource.src = `assets/Sample_Photos/${fname}/${currentItem.video}`;
            lightboxVideo.load();  // Load video to reset playback
            lightboxVideo.style.display = 'block';  // Show video
            lightboxVideo.controls = true;
        }

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
