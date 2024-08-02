document.addEventListener("DOMContentLoaded", () => {
  setupNavigationLinks();
  sendEmailHandler();
  checkInputFilled();
  setupMatrixBackground();
  setupModal();
  setupPolicies();
  setupCookies();
  initializeLinks();
});

const toggleDownloadButton = () => {
  const element = document.getElementById("downloadButton");
  if (!element) return;
  element.classList.toggle("hidden");
  element.classList.toggle("visible");
};

const setupNavigationLinks = () => {
  document.querySelectorAll('#mainNavbar .navbar-list .nav-item a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      scrollIntoViewWithOffset(target, 100);
    });
  });
};

const sendEmailHandler = () => {
  const form = document.getElementById("sendEmailForm");
  const termsCheckbox = document.getElementById('terms');
  const errorMessage = document.querySelector('#termsContainer .error-message');

  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (!termsCheckbox.checked) {
      errorMessage.textContent = 'You must accept the Terms and Conditions and Privacy Policy.';
      errorMessage.classList.remove('hidden');
      return;
    } else {
      errorMessage.classList.add('hidden');
    }

    sendEmail(form);
  });

  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', () => clearError(input));
  });
};

const sendEmail = form => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/contact");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) handleXhrResponse(xhr, form);
  };

  const formData = new FormData(form);
  const jsonData = {};
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  xhr.send(JSON.stringify(jsonData));
};

const handleXhrResponse = (xhr, form) => {
  const response = JSON.parse(xhr.responseText);

  switch (xhr.status) {
    case 200:
      showMessage('success', response.msg);
      form.reset();
      break;
    case 400:
      handleValidationErrors(response.data);
      break;
    case 500:
      showMessage('error', 'An error has occurred!');
      console.error(response.msg);
      break;
    default:
      console.log(xhr.status, response);
  }
};

const showMessage = (alert, message) => {
  const messageEl = $(`.alert-box.${alert}`);
  const container = messageEl.parent();
  const ratio = 4.7575;
  const width = $(window).width() / ratio;
  const marginToSet = width / 2;

  container.css({
    width: `${width}px`,
    marginLeft: `-${marginToSet}px`
  });

  messageEl.find('span').html(message);
  container.fadeIn(300).delay(1500).fadeOut(400);
};

const handleValidationErrors = errors => {
  clearErrors();

  if (typeof errors === 'string') {
    errors = JSON.parse(errors);
  }

  Object.keys(errors).forEach(field => {
    const input = document.getElementById(field);
    if (input) {
      input.classList.add("is-invalid");
      const errorContainer = input.nextElementSibling.nextElementSibling;
      errorContainer.textContent = errors[field].msg;
      errorContainer.classList.remove("hidden");
    }
  });
};

const clearError = input => {
  input.classList.remove("is-invalid");
  input.nextElementSibling.nextElementSibling.classList.add("hidden");
};

const clearErrors = () => {
  document.querySelectorAll(".is-invalid").forEach(clearError);
};

const checkInputFilled = () => {
  const formContainer = document.querySelector('.contact-container');
  const inputFields = formContainer.querySelectorAll('input:not(#sendEmailBtn)');
  const textareaField = formContainer.querySelector('textarea');

  inputFields.forEach(input => {
    input.addEventListener('input', e => checkFilled(e, formContainer, inputFields, textareaField));
  });

  textareaField.addEventListener('input', e => checkFilled(e, formContainer, inputFields, textareaField));
};

const checkFilled = (e, formContainer, inputFields, textareaField) => {
  const anyFieldFilled = [...inputFields].some(input => input.value.trim() !== '') || textareaField.value.trim() !== '';
  e.target.classList.toggle('filled', anyFieldFilled);
};

const setupMatrixBackground = async () => {
  let initID = runMatrixBackground();
  localStorage.setItem("matrixBackgroundID", initID);

  const resizeObserver = new ResizeObserver(resetMatrix);
  resizeObserver.observe(document.querySelector('main'));
  screen.orientation.addEventListener("change", resetMatrix);
};

const resetMatrix = () => {
  let id = localStorage.getItem("matrixBackgroundID");
  if (id !== undefined) clearInterval(id);
  id = runMatrixBackground();
  localStorage.setItem("matrixBackgroundID", id);
};

const runMatrixBackground = () => {
  const canvas = document.querySelector('.matrix');
  const ctx = canvas.getContext('2d');
  setCanvasHeight(canvas);

  canvas.width = $('html').width();

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ'.repeat(6).split('');
  const fontSize = 10;
  const columns = canvas.width / fontSize;
  let drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  return loopMatrixBackground(ctx, canvas, drops, letters, fontSize);
};

const loopMatrixBackground = (ctx, canvas, drops, letters, fontSize) => {
  return setInterval(() => {
    ctx.fillStyle = 'rgba(30, 30, 30, .1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drops.forEach((drop, i) => {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillStyle = '#044804';
      ctx.fillText(text, i * fontSize, drop * fontSize);
      drops[i]++;

      if (drops[i] * fontSize > canvas.height && Math.random() > .99) {
        drops[i] = 0;
      }
    });
  }, 25);
};

const setCanvasHeight = canvas => {
  const height = Math.max(document.body.scrollHeight, document.documentElement.clientHeight);
  canvas.height = height;
};

const setupModal = () => {
  const modal = document.getElementById('modal');
  const modalCloseTop = document.getElementById('modalCloseTop');
  const modalCloseBottom = document.getElementById('modalCloseBottom');

  [modalCloseTop, modalCloseBottom].forEach(element => {
    element.onclick = () => modal.style.display = 'none';
  });

  window.onclick = event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
};

const setupPolicies = () => {
  document.querySelectorAll('.modal-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      showPolicy(event.currentTarget.href);
    });
  });
};

const setupCookies = () => {
  const cookieNotice = document.getElementById('cookieNotice');
  const acceptCookies = document.getElementById('acceptCookies');
  const rejectCookies = document.getElementById('rejectCookies');
  const customizeCookies = document.getElementById('customizeCookies');
  const savePreferences = document.getElementById('savePreferences');
  const cookiePreferences = document.getElementById('cookiePreferences');

  if (!localStorage.getItem('cookiesAccepted')) {
    cookieNotice.style.display = 'block';
  } else {
    loadCookies();
  }

  acceptCookies.addEventListener('click', () => {
    handleCookieConsent(true, true, true);
  });

  rejectCookies.addEventListener('click', () => {
    handleCookieConsent(true, false, false);
  });

  customizeCookies.addEventListener('click', () => {
    cookiePreferences.style.display = 'block';
  });

  savePreferences.addEventListener('click', () => {
    const functionalAllowed = document.getElementById('functionalCookies').checked;
    const analyticsAllowed = document.getElementById('analyticsCookies').checked;
    handleCookieConsent(true, functionalAllowed, analyticsAllowed);
  });
};

const handleCookieConsent = (essential, functional, analytics) => {
  localStorage.setItem('cookiesAccepted', 'true');
  setCookie('essentialCookies', essential, 365);
  setCookie('functionalCookies', functional, 365);
  setCookie('analyticsCookies', analytics, 365);
  saveCookiePreference('essentialCookies', essential);
  saveCookiePreference('functionalCookies', functional);
  saveCookiePreference('analyticsCookies', analytics);
  document.getElementById('cookieNotice').style.display = 'none';
  loadCookies();
};

const sendAnalyticsData = async () => {
  try {
    await postData('/api/track', {
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId()
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

const saveCookiePreference = async (cookieName, cookieValue) => {
  try {
    await postData('/api/set-preference', {
      sessionId: getSessionId(),
      cookieName,
      cookieValue
    });
  } catch (error) {
    console.error('Error saving cookie preference:', error);
  }
};

const showPolicy = async endpoint => {
  try {
    const modalBody = document.getElementById('modalBody');
    const data = await fetchData(endpoint, 'HTML');
    modalBody.innerHTML = data;
    document.getElementById('modal').style.display = 'block';
  } catch (error) {
    console.error('Error:', error);
  }
};

const initializeLinks = () => {
  document.querySelectorAll('.links a').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href').substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) scrollIntoViewWithOffset(targetElement, 50);
    });
  });
};

const scrollIntoViewWithOffset = (targetElement, offset) => {
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};
