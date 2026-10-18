(function () {
  "use strict";

  var menuToggle = document.getElementById("menu-toggle");
  var navLinks = document.getElementById("nav-links");
  var links = document.querySelectorAll(".nav-links a");
  var year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    Array.prototype.forEach.call(links, function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
      });
    });
  }

  function updateActiveLink() {
    var current = "home";
    var sections = document.querySelectorAll("main section[id]");
    Array.prototype.forEach.call(sections, function (section) {
      var rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom > 150) {
        current = section.id;
      }
    });
    Array.prototype.forEach.call(links, function (link) {
      var active = link.getAttribute("href") === "#" + current;
      if (active) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("load", updateActiveLink);
  updateActiveLink();
}());
