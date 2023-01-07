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
  setupSectionHeight();
  setupNavigationLinks();
  sendEmailHandler();
});

const setupSectionHeight = () => {
  let height = window.innerHeight;

  document.querySelectorAll(".section").forEach( (el) => {
    el.style.height = height + "px";
  });
}

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
  const submitBtn = document.getElementById("sendEmailBtn");

  if(submitBtn == null) return;

  submitBtn.addEventListener( "submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/contact");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
      }};

    let data = new FormData(event.target);

    xhr.send(data);
  });
}
