const cardSections = document.querySelectorAll('.card-section');
const dialog = document.getElementById('dialog');
const track = dialog.querySelector('.paralax_carousel__track');
const slide = track.querySelector('.paralax_carousel__slide');
const closeBtn = document.querySelector('.dialog_close-btn');
const prevBtn = dialog.querySelector('.paralax_carousel__button--prev');
const nextBtn = dialog.querySelector('.paralax_carousel__button--next');
const indicators = dialog.querySelectorAll('.paralax_carousel__indicator');

const imgSrc = './images/jpg/';

// Контент для каждой карточки
const cardContents = {
  frezer: [
    { src: 'g1.jpg', alt: '1' },
    { src: 'g2.jpg', alt: '2' },
    { src: 'g3.jpg', alt: '3' },
  ],
  lazer: [
    { src: 'g4.jpg', alt: '1' },
    { src: 'g5.jpg', alt: '2' },
    { src: 'g6.jpg', alt: '3' },
  ],
  graver: [
    { src: 'g7.jpg', alt: '1' },
    { src: 'g8.jpg', alt: '2' },
    { src: 'g9.jpg', alt: '3' },
  ],
};

// Обработчики для карточек
cardSections.forEach((card) => {
  card.addEventListener('click', function () {
    const sectionId = this.id;
    const content = cardContents[sectionId];
    track.innerHTML = '';

    content.forEach((img) => {
      const slide = document.createElement('div');
      slide.className = 'paralax_carousel__slide';
      slide.innerHTML = `
          <div class="parallax-layer" data-speed="0.1">
            <img src="${imgSrc}${img.src}" alt="${img.alt}" class="thumbnail" data-fullscreen="${img.src}">
          </div>
          <div class="paralax_slide-caption"></div>
        `;
      track.appendChild(slide);
    });
    initCarousel();

    dialog.classList.add('dialog_is_opened');
  });
});

closeBtn.addEventListener('click', () => {
  dialog.classList.remove('dialog_is_opened');
});
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) {
    dialog.classList.remove('dialog_is_opened');
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    dialog.classList.remove('dialog_is_opened');
  }
});

function initCarousel() {
  const slides = document.querySelectorAll('.paralax_carousel__slide');
  let currentSlide = 0;

  function goToSlide(n) {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${n * 100}%)`;
    });
    currentSlide = n;
    updateIndicators();
  }

  function updateIndicators() {
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => goToSlide(i));
  });

  // Для мобильных устройств - свайпы
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  track.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true },
  );

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
  }

  goToSlide(0);
}
