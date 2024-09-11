// List of images for the gallery
const images = [
  "/Carousel/images/image1.png", 
  "/Carousel/images/image2.png", 
  "/Carousel/images/image3.png", 
  "/Carousel/images/image4.png"
];


let currentIndex = 0;


function changeImage(imageSrc) {
  
  const mainPhoto = document.getElementById('main-photo');
  

  currentIndex = images.indexOf(imageSrc);
  
  mainPhoto.style.opacity = 0; 
  setTimeout(() => {
    mainPhoto.src = imageSrc;
    mainPhoto.style.opacity = 1; 
  }, 500); 
}


function prevImage() {
  currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
  changeImage(images[currentIndex]);
}


function nextImage() {
  currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
  changeImage(images[currentIndex]);
}
