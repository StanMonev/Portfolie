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
  const navbar = document.getElementById("mainNavbar");
  let height = window.innerHeight - navbar.offsetHeight;

  document.querySelectorAll(".section").forEach( (el) => {
    el.style.height = height + "px";
  });
});