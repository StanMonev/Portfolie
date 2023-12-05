function ready(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
} 

ready(() => {
  setupNavigationLinks();
  sendEmailHandler();
  checkInputFilled();
});

const toogleDownloadButton = () => {
  const element = document.getElementById("downloadButton");
  if(element == null) return;
  element.classList.toggle("hidden");
  element.classList.toggle("visable");
}

const setupNavigationLinks = () => {
  const navLinks = document.querySelectorAll('#mainNavbar .navbar-list .nav-item a');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

const sendEmailHandler = () => {
  const form = document.getElementById("sendEmailForm");

  if(form == null) return;

  form.addEventListener( "submit", (event) => {
    console.log("Triggered");
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/contact");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      console.log(xhr.readyState);
      if (xhr.readyState === 4) {
        if(xhr.status === 400){
          handleValidationErrors(JSON.parse(xhr.responseText).errors);
        }
        console.log(xhr.status);
        console.log(JSON.parse(xhr.responseText));
      }
    };

    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    xhr.send(JSON.stringify(jsonData));
  });

  // Add event listeners to clear errors when typing
  const formInputs = form.querySelectorAll('.form-control');
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      clearError(input);
    });
  });
};

const handleValidationErrors = (errors) => {
  // Clear previous error messages and styles
  clearErrors();

  // Parse JSON string if necessary
  if (typeof errors === 'string') {
    errors = JSON.parse(errors);
  }

  // Display error messages and highlight input fields
  Object.keys(errors).forEach((field) => {
    const input = document.getElementById(field);
    const errorInfo = errors[field];

    if (input) {
      input.classList.add("is-invalid");
      const errorContainer = input.nextElementSibling.nextElementSibling; // Assuming the error container is the next sibling
      errorContainer.textContent = errorInfo.msg;
      errorContainer.classList.remove("hidden");
    }
  });
};

const clearError = (input) => {
  input.classList.remove("is-invalid");
  const errorContainer = input.nextElementSibling.nextElementSibling; // Assuming the error container is the next sibling
  errorContainer.classList.add("hidden");
};

const clearErrors = () => {
  const invalidInputs = document.querySelectorAll(".is-invalid");
  invalidInputs.forEach((input) => {
    clearError(input);
  });
};

const checkInputFilled = () => {
  const formContainer = document.querySelector('.contact-container');
  const inputFields = formContainer.querySelectorAll('input:not(#sendEmailBtn)');
  const textareaField = formContainer.querySelector('textarea');

  // Listen for input events on the input field
  inputFields.forEach((input) => {
    input.addEventListener('input', (e) => {
      checkFilled(e, formContainer, inputFields, textareaField)
    });
  });

  // Listen for input events on the textarea field
  textareaField.addEventListener('input', (e) => {
    checkFilled(e, formContainer, inputFields, textareaField)
  });
}

const checkFilled = (e, formContainer, inputFields, textareaField) => {
  console.log(e);
  let anyFieldFilled = false;

  inputFields.forEach((input) => {
    if (input.value.trim() !== '') {
      anyFieldFilled = true;
    }
  });

  if (textareaField.value.trim() !== '') {
    anyFieldFilled = true;
  }

  if (anyFieldFilled) {
    e.target.classList.add('filled');
  } else {
    e.target.classList.remove('filled');
  }
};