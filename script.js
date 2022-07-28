// BACK TO TOP BUTTON
topButton = document.querySelector('.top__btn');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// REVEAL SECTIONS ON SCROLL
const allSections = document.querySelectorAll('.section')
const revealSection = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);  
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold:0.15
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// DEV PROJECTS SLIDER
const slides = document.querySelectorAll('.slide');
const leftBtn = document.querySelector('.slider__btn--left');
const rightBtn = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.slider__dots');
let currentSlide = 0;
const maxSlide = slides.length;

const addDots = function(){
  slides.forEach(function(_, index){
    dotContainer.insertAdjacentHTML('beforeend', `<button class = "dots__dot" data-slide="${index}"></button>`);
  });
};
addDots();

const activateDot = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

activateDot(0);

const goToSlide = function(slide){
  slides.forEach((slide, index) => (slide.style.transform = `translateX(${100 * (index-currentSlide)}%)`));
};

goToSlide(0);

const nextSlide = function(){
  if (currentSlide === maxSlide - 1){
    currentSlide = 0;
  } else{
  currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const previousSlide = function(){
  if (currentSlide === 0){
    currentSlide = maxSlide -1;
  } else{
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

rightBtn.addEventListener('click',nextSlide);
leftBtn.addEventListener('click',previousSlide);

dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    currentSlide = +e.target.dataset.slide;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }
});

// GIS MODALS
const gisBtns = document.querySelectorAll('.project_btn');
const gisModals = document.querySelectorAll('.gis__modal');
const overlay = document.querySelector('.overlay');
const closeBtns = document.querySelectorAll('.close__btn');
let modalIndex = null;

// 1) add class "stop__scroll" to the body element to disable scrolling, 
// 2) remove class "hidden" from the active project div and the overlay div.
const showModal = function(index){
  const modal = gisModals[index];
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.body.classList.add("stop__scroll");
};

// When the GIS project is closed, revert to default classes.
const closeModal = function(){
  const modal = gisModals[modalIndex];
  modal.classList.add("hidden");  
  overlay.classList.add("hidden");
  document.body.classList.remove("stop__scroll");
  modalIndex = null;
};

gisBtns.forEach(function(btn, index){
  btn.addEventListener('click', function(){
    modalIndex = index;
    showModal(modalIndex);
  });
});

// Make both clicking the overlay AND clicking the close button to close the modal
closeBtns.forEach(function(btn){
  btn.addEventListener('click', function(){
    closeModal(modalIndex);
  });
});

overlay.addEventListener('click', function(){
  closeModal(modalIndex)
});

