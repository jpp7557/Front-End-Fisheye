    const modal = document.getElementById('contact_modal');
    const pageContent = document.getElementById('main');
    const modalOverlay = document.getElementById('modal-overlay');
    const displayModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const firstInput = document.getElementById('first-name');
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    ///////////////////////////////////////////////////////////////////
  
      const errorMessages = {
          'first-name': 'Veuillez entrer votre prénom.',
          'name': 'Veuillez entrer votre nom.',
          'email': 'Veuillez entrer un email valide.',
          'message': 'Veuillez entrer votre message.'
      };
  
      const showError = (input, errMsg) => {
          const errorSpan = document.getElementById(`${input.id}-error`);
          console.log("input error : ",`${input.id}-error`);
          errorSpan.textContent = errMsg;
          errorSpan.style.display = 'block';
          input.setAttribute('aria-invalid', 'true');
      };
  
      const clearError = (input) => {
          const errorSpan = document.getElementById(`${input.id}-error`);
          errorSpan.textContent = '';
          errorSpan.style.display = 'none';
          input.removeAttribute('aria-invalid');
          console.log("CLEAR error : ",`${input.id}-error`, " CLEARED");

      };
  
      function validateInput(input) {
          const value = input.value.trim();
          let isValid = true;
          console.log("input.id : " , input.id);
          if (input.id === 'first-name' && value === '') {
              showError(input, errorMessages[input.id]);
              isValid = false;
          } else if (input.id === 'name' && value === '') {
              showError(input, errorMessages[input.id]);
              isValid = false;
          } else if (input.id === 'email' && !emailRegex.test(value)) {
              showError(input, errorMessages['email']);
              isValid = false;
          } else if (input.id === 'message' && value === '') {
              showError(input, errorMessages[input.id]);
              isValid = false;
          } else {
              clearError(input);
          }
          return isValid;
      };
  
  ///////////////////////////////////////////////////////////////////
  
    // Form field validation function
    function validateForm() {
      let isFormValid = true; // Track overall form validity
      let firstInvalidField = null; // To store the first invalid field for focus
    
      // Clear previous errors
      contactForm.querySelectorAll('.error').forEach(errorElement => {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
      });
    
      // Validate each required input field
      contactForm.querySelectorAll('[aria-required="true"]').forEach(input => {
            const isValid = validateInput(input);
    
        if (!isValid) {
          if (isFormValid) {
            firstInvalidField = input; // Store the first invalid field
          }
          isFormValid = false; // Set form validity to false if any field is invalid
        }
      });
    
      // Set focus to the first invalid field if there are any errors
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    
      return isFormValid; // Return the overall form validity
    }
  ///////////////////////////////////////////////////////////////////
      // Function to open the modal
      const displayModal = () => {
          document.body.style.overflow = 'hidden'; // Disable scrolling on the page
          modal.style.display = 'block';
          modalOverlay.style.display = 'block';
          modal.setAttribute('aria-hidden', 'false');
          modalOverlay.setAttribute('aria-hidden', 'false');
          contactForm.reset();
          contactForm.querySelectorAll('input[aria-required="true"]').forEach(input => {
              clearError(input);
          });
          firstInput.focus(); // Set focus on the first input field
      };
  
      // Function to close the modal
      const closeModal = () => {
          document.body.style.overflow = ''; // Re-enable scrolling
          modal.style.display = 'none';
          modalOverlay.style.display = 'none';
          modal.setAttribute('aria-hidden', 'true');
          modalOverlay.setAttribute('aria-hidden', 'true');
          displayModalBtn.focus(); // Return focus to the button that opened the modal
      };
  
      // Event listener to open the modal
      displayModalBtn.addEventListener('click', displayModal);
  
      // Event listener to close the modal
      closeModalBtn.addEventListener('click', closeModal);
  
      // Close modal on Escape key press
      document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && modal.style.display === 'block') {
              closeModal();
          }
      });
  
      // Function to log form data to the console
      function logFormData() {
              const formData = new FormData(contactForm);
              for (const [name, value] of formData.entries()) {
                  console.log(`${name}: ${value}`);
              }
      }
      
      // Allow form submission on Enter keypress when focused on the submit button
      contactForm.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
              if (document.activeElement === submitButton) {
                  event.preventDefault(); // Prevents the form from submitting twice
                  //contactForm.dispatchEvent(new Event('submit', { cancelable: true }));
                  if (validateForm()) {
                      logFormData(); // Log form data instead of submitting
                      //alert('Form submitted successfully!'); // Placeholder for form submission logic
                      closeModal();
                  }    
              } else if (document.activeElement.tagName !== 'TEXTAREA') {
                  // Prevent Enter key default action for other input fields
                  event.preventDefault();
              }
          }
      
      });
  
      // Handle form submission (for both button click and Enter key)
      contactForm.addEventListener('submit', (event) => {
          event.preventDefault(); // Prevents default form submission action
          if (validateForm()) {
              logFormData(); // Log form data instead of submitting
              //alert('Form submitted successfully!'); // Placeholder for form submission logic
              closeModal();
          }
  
      });
  
      contactForm.addEventListener('input', (event) => {
          if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
              validateInput(event.target);
          }
      });
  
      // Prevent tabbing outside the modal
      modal.addEventListener('keydown', (event) => {
          if (event.key === 'Tab') {
              const focusableElements = modal.querySelectorAll('input, textarea, button');
              const firstFocusableElement = focusableElements[0];
              const lastFocusableElement = focusableElements[focusableElements.length - 1];
  
              if (event.shiftKey) {
                  // If Shift + Tab is pressed and focus is on the first element, loop to the last
                  if (document.activeElement === firstFocusableElement) {
                      event.preventDefault();
                      lastFocusableElement.focus();
                  }
              } else {
                  // If Tab is pressed and focus is on the last element, loop to the first
                  if (document.activeElement === lastFocusableElement) {
                      event.preventDefault();
                      firstFocusableElement.focus();
                  }
              }
          }
      });
