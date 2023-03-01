
// Select the gallery images and thumbnails
const galleryImages = document.querySelectorAll('.gallery-image');
const galleryThumbnails = document.querySelectorAll('.gallery-thumbnail');

// Select the modal elements
let modalImage = document.querySelector('.modal-image');
let prevButton = document.querySelector('.prev-image');
let nextButton = document.querySelector('.next-image');

// Initialize the current image index
let currentImageIndex = 0;

galleryImages.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        currentImageIndex = index + 1;
        updateModalImage();
    });
});


// Loop through the thumbnails and add event listeners
galleryThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        currentImageIndex = index + 1;
        updateModalImage();
    });
});

// Update the modal image and enable/disable prev/next buttons
function updateModalImage() {
    modalImage.src = galleryImages[currentImageIndex].src;
    prevButton = currentImageIndex === 0;
    nextButton = currentImageIndex === galleryImages.length - 1;
}

// Add event listeners to the prev/next buttons
prevButton.addEventListener('click', () => {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateModalImage();
    }
        if (currentImageIndex == 0) {
        currentImageIndex = galleryImages.length -1;
        updateModalImage();
    }
});

nextButton.addEventListener('click', () => {
    if(currentImageIndex === galleryImages.length -1){
        currentImageIndex = 0;
        updateModalImage();
    }
    
    if (currentImageIndex < galleryImages.length - 1) {
        currentImageIndex++;
        updateModalImage();
    }

});
