(function() {
  const images = [
    "/Carousel/images/image1.png", 
    "/Carousel/images/image2.png", 
    "/Carousel/images/image3.png", 
    "/Carousel/images/image4.png"
  ];

  let currentIndex = 0;

  // Function to change the main image
  function changeImage(imageSrc) {
    const mainPhoto = document.getElementById('main-photo');
    
    currentIndex = images.indexOf(imageSrc);
    
    mainPhoto.style.opacity = 0; 
    setTimeout(() => {
      mainPhoto.src = imageSrc;
      mainPhoto.style.opacity = 1; 
    }, 500); 
  }

  // Previous image navigation
  function prevImage() {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    changeImage(images[currentIndex]);
  }

  // Next image navigation
  function nextImage() {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    changeImage(images[currentIndex]);
  }

  // Event listeners for thumbnails
  document.querySelectorAll('.thumbnail').forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
      changeImage(images[index]);
    });
  });

  // Attach event listeners to prev/next buttons
  document.getElementById('prev').addEventListener('click', prevImage);
  document.getElementById('next').addEventListener('click', nextImage);
})();
