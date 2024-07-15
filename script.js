function showGallery(galleryId) {
  const galleries = document.querySelectorAll(".gallery-images");
  galleries.forEach((gallery) => {
    gallery.classList.remove("active");
  });
  document.getElementById(galleryId).classList.add("active");
}
