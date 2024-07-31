function ready(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
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
  setupPrivacyPolicy();
  initializeLinks();
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
      
      scrollIntoViewWithOffset(target, 100);
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
  clearErrors();

  if (typeof errors === 'string') {
    errors = JSON.parse(errors);
  }

  Object.keys(errors).forEach((field) => {
    const input = document.getElementById(field);
    const errorInfo = errors[field];

    if (input) {
      input.classList.add("is-invalid");
      const errorContainer = input.nextElementSibling.nextElementSibling;
      errorContainer.textContent = errorInfo.msg;
      errorContainer.classList.remove("hidden");
    }
  });
};

const clearError = (input) => {
  input.classList.remove("is-invalid");
  const errorContainer = input.nextElementSibling.nextElementSibling;
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

  // create an Observer instance
  const resizeObserver = new ResizeObserver(entries => resetMatrix())

  // start observing a DOM node
  resizeObserver.observe(document.querySelector('main'))

  screen.orientation.addEventListener("change", resetMatrix());
}

const resetMatrix = () => {
  let id = localStorage.getItem("matrixBackgroundID");
  if (id !== undefined) { clearInterval(id); }
  id = runMatrixBackground();
  localStorage.setItem("matrixBackgroundID", id);
}

const runMatrixBackground = () => {
  // Initialising the canvas
  let canvas = document.querySelector('.matrix'),
      ctx = canvas.getContext('2d');

  setCanvasHeight(canvas);

  // Setting the width and height of the canvas
  canvas.width = $('html').width();

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

const setCanvasHeight = (canvas) => {  
  var body = document.body,
  html = document.documentElement;

  let height = Math.max( body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight );    
  canvas.height = height;
}

const fetchAsync = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

const setupPrivacyPolicy = () => {
  var cookieNotice = document.getElementById('cookieNotice');
  var acceptCookies = document.getElementById('acceptCookies');
  var customizeCookies = document.getElementById('customizeCookies');
  var savePreferences = document.getElementById('savePreferences');
  var learnMore = document.getElementById('learnMore');
  var cookiePreferences = document.getElementById('cookiePreferences');

  if (!localStorage.getItem('cookiesAccepted')) {
    cookieNotice.style.display = 'block';
  } else {
    loadCookies();
  }

  acceptCookies.addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'true');
    setCookie('essentialCookies', 'true', 365);
    setCookie('functionalCookies', 'true', 365);
    setCookie('analyticsCookies', 'true', 365);
    saveCookiePreference('essentialCookies', 'true');
    saveCookiePreference('functionalCookies', 'true');
    saveCookiePreference('analyticsCookies', 'true');
    cookieNotice.style.display = 'none';
    loadCookies();
  });

  customizeCookies.addEventListener('click', function() {
    cookiePreferences.style.display = 'block';
  });

  savePreferences.addEventListener('click', function() {
    localStorage.setItem('cookiesAccepted', 'true');
    setCookie('essentialCookies', 'true', 365);
    const functionalAllowed = document.getElementById('functionalCookies').checked;
    const analyticsAllowed = document.getElementById('analyticsCookies').checked;
    setCookie('functionalCookies', functionalAllowed, 365);
    setCookie('analyticsCookies', analyticsAllowed, 365);
    saveCookiePreference('essentialCookies', 'true');
    saveCookiePreference('functionalCookies', functionalAllowed);
    saveCookiePreference('analyticsCookies', analyticsAllowed);
    cookieNotice.style.display = 'none';
    loadCookies();
  });

  learnMore.addEventListener('click', function() {
    redirectPrivacyPolicy('cookiePolicy');
  });

  copyright.addEventListener('click', function(){redirectPrivacyPolicy('termsAndConditions');});

  window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page === 'privacy-policy') {
        // Do nothing or handle if you want to load privacy policy again
    } else {
        // Reload the homepage content
        loadHomePageContent();
    }
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('.links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(2);
      if (window.location.pathname === '/privacy-policy') {
        // Load the home page content and scroll to the target section
        history.pushState({}, '', '/#' + targetId);
        loadHomePageContent();
      } else {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          scrollIntoViewWithOffset(targetElement, 100);
        }
      }
    });
  });
}

const sendAnalyticsData = async () => {
  try {
    const sessionId = getSessionId();
    const data = {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      sessionId: sessionId
    };

    const response = await postData('/api/track', data);
  
  } catch (error) {
    console.error('Error:', error);
  }
}

const saveCookiePreference = async (cookieName, cookieValue) => {
  try {
    await postData('/api/set-preference', {
      sessionId: getSessionId(),
      cookieName: cookieName,
      cookieValue: cookieValue
    });
  } catch (error) {
    console.error('Error saving cookie preference:', error);
  }
}

const redirectPrivacyPolicy = async (id) => {
  try {
    const data = await fetchData('/privacy-policy-content', 'HTML');
    content.innerHTML = data;
    const targetElement = document.getElementById(id);
    if (targetElement) {
      scrollIntoViewWithOffset(targetElement, 100);
    }
    resetMatrix();
    history.pushState({page: 'privacy-policy'}, 'Privacy Policy', '/privacy-policy');
  } catch (error) {
      console.error('Error:', error);
  }
}

const loadHomePageContent = async () => {
  try {
    const data = await fetchData('/', 'HTML');

    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const mainContent = doc.querySelector('.main-container').innerHTML;
    document.querySelector('.main-container').innerHTML = mainContent;
    
    setupPrivacyPolicy();
    initializeLinks();
    resetMatrix();
    startTypewriter();
    
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.getElementById(hash.substring(1));
        if (targetElement) {
          scrollIntoViewWithOffset(targetElement, 100)
        }
    }
  } catch (error) {
      console.error('Error:', error);
  }
}

const initializeLinks = () => {
  document.querySelectorAll('.links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(2);
      if (window.location.pathname === '/privacy-policy') {
        history.pushState({}, '', '/#' + targetId);
        loadHomePageContent();
      } else {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          scrollIntoViewWithOffset(targetElement, 50);
        }
      }
    });
  });
}

function scrollIntoViewWithOffset(targetElement, offset) {
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}
