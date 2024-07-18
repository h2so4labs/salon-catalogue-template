function showGallery(carouselId) {
  console.log(carouselId);
  const carousels = document.querySelectorAll(".gallery-images");
  carousels.forEach((carousel) => {
    carousel.classList.remove("active");
  });
  document.getElementById(carouselId).classList.add("active");
}
