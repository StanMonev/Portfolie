function ready(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
} 

function resize(fn) {
  window.addEventListener("resize", fn);
} 

ready(() => {
  setupNavigationLinks();
  sendEmailHandler();
  checkInputFilled();
  setupMatrixBackground();
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
    event.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/contact");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) { 

        switch(xhr.status) {
          case 200:
            showMessage('success', JSON.parse(xhr.responseText).msg);
            form.reset();
            return;
          case 400:
            handleValidationErrors(JSON.parse(xhr.responseText).data);
            return;
          case 500:
            showMessage('error', 'An error has occurred!');
            console.error(JSON.parse(xhr.responseText).msg);
            return;
          default:
            console.log(xhr.status);
            console.log(JSON.parse(xhr.responseText));
        }
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

const showMessage = (alert, message) => {
  const messageEl = $('.alert-box.' + alert);
  const container = messageEl.parent();
  const ratio = 4.7575;
  const width = $(window).width() / ratio;
  const marginToSet = width / 2;
  container.css('width', width + 'px');
  container.css('margin-left', "-" + marginToSet + 'px');
  messageEl.find('span').html(message);
  container.fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
}


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

const setupMatrixBackground = async () => {
  let initID = runMatrixBackground();
  localStorage.setItem("matrixBackgroundID", initID);

  screen.orientation.addEventListener("change", function(e) {
    let id = localStorage.getItem("matrixBackgroundID");
    if (id !== undefined) { clearInterval(id); }
    id = runMatrixBackground();
    localStorage.setItem("matrixBackgroundID", id);
  });
}

const runMatrixBackground = () => {
  // Initialising the canvas
  let canvas = document.querySelector('.matrix'),
      ctx = canvas.getContext('2d');

  var body = document.body,
  html = document.documentElement;

  let height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

  // Setting the width and height of the canvas
  canvas.width = $('html').width();
  canvas.height = height;

  // Setting up the letters
  let letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
  letters = letters.split('');

  // Setting up the columns
  let fontSize = 10,
      columns = canvas.width / fontSize;

  // Setting up the drops
  let drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  // Loop the animation
  return loopMatrixBackground(ctx, canvas, drops, letters, fontSize);
}

const loopMatrixBackground = (ctx, canvas, drops, letters, fontSize) => {
  return setInterval(() => {

    ctx.fillStyle = 'rgba(30, 30, 30, .1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drops.length; i++) {
      let text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillStyle = '#044804';
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      drops[i]++;
      if (drops[i] * fontSize > canvas.height && Math.random() > .99) {
        drops[i] = 0;
      }
    }
  }, 25);
}

const fetchAsync = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}