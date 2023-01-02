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
});

const setupSectionHeight = () => {
  const navbar = document.getElementById("mainNavbar");
  let height = window.innerHeight;

  document.querySelectorAll(".section").forEach( (el) => {
    el.style.height = height + "px";
  });
}

const toogleDownloadButton = () => {
  var element = document.getElementById("downloadButton");
  element.classList.toggle("hidden");
  element.classList.toggle("visable");
}
