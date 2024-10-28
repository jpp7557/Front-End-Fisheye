function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";    
    const modalbg = document.querySelector(".bground");
    modalbg.style.display = "block";     // open the dialog

}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    const modalbg = document.querySelector(".bground");
    modalbg.style.display = "none";     // Close the dialog
}
