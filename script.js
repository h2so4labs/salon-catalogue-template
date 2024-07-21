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

const video = document.getElementById("hoverVideo");

// document.addEventListener("DOMContentLoaded", function () {
//   video.addEventListener("mouseenter", () => {
//     video.play();
//   });

//   video.addEventListener("mouseleave", () => {
//     video.pause();
//     video.currentTime = 0;
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  // Check if phone exists in localStorage
  console.log("checking for phone")
  const phone = localStorage.getItem("phone");
  console.log(phone)
  if (phone) {
    console.log("Found phone");
    document.getElementById("accountLink-h2so4").style.display = "block";
  }
});

function toggleNavbar() {
  const sidebar = document.getElementById("sidebar-h2so4");
  const overlay = document.getElementById("overlay-h2so4");

  if (sidebar.style.width === "250px") {
    sidebar.style.width = "0";
    overlay.classList.remove("show");
  } else {
    sidebar.style.width = "250px";
    overlay.classList.add("show");
  }
}
