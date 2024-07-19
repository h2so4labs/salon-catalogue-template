function showGallery(carouselId) {
  console.log(carouselId);
  const carousels = document.querySelectorAll(".gallery-images");
  carousels.forEach((carousel) => {
    carousel.classList.remove("active");
  });
  document.getElementById(carouselId).classList.add("active");
}

showGallery("salon");

function closeNav() {
  const navbarContent = document.getElementById("navbarContent");
  navbarContent.classList.remove("show");
}

document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("current-year");
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
});
