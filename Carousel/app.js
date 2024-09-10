// List of images for the gallery
const images = [
  "/Carousel/images/image1.png", 
  "/Carousel/images/image2.png", 
  "/Carousel/images/image3.png", 
  "/Carousel/images/image4.png"
];
let currentIndex = 0;

// Change main photo by clicking a thumbnail
function changeImage(imageSrc) {
  const mainPhoto = document.getElementById('main-photo');
  
  // Update the currentIndex to match the clicked image
  currentIndex = images.indexOf(imageSrc);
  
  mainPhoto.style.opacity = 0; // Fade out animation
  setTimeout(() => {
    mainPhoto.src = imageSrc;
    mainPhoto.style.opacity = 1; // Fade in animation
  }, 500); // Timing should match CSS transition duration
}

// Show previous image
function prevImage() {
  currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
  changeImage(images[currentIndex]);
}

// Show next image
function nextImage() {
  currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
  changeImage(images[currentIndex]);
}
