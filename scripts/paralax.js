document.addEventListener('DOMContentLoaded', function() {
  const paralax_carousel= document.querySelector('.paralax_carousel');
  const track = document.querySelector('.paralax_carousel__track');
  const slides = document.querySelectorAll('.paralax_carousel__slide');
  const paralaxPrevBtn = document.querySelector('.paralax_carousel__button--prev');
  const paralaxNextBtn = document.querySelector('.paralax_carousel__button--next');
  const indicators = document.querySelectorAll('.paralax_carousel__indicator');
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  
  let currentIndex = 0;
  const slideCount = slides.length;
  
  // Инициализация
  function init() {
    updateCarousel();
    setupParallax();
    startAutoSlide();
  }
  
  // Обновление позиции карусели
  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Обновление активного состояния
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });
    
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Переход к конкретному слайду
  function goToSlide(index) {
    currentIndex = (index + slideCount) % slideCount;
    updateCarousel();
  }
  
  // Настройка параллакс-эффекта
  function setupParallax() {
    paralax_carousel.addEventListener('mousemove', (e) => {
      const rect = paralax_carousel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      parallaxLayers.forEach(layer => {
        const speed = parseFloat(layer.dataset.speed) || 0.1;
        const moveX = (x - centerX) * speed;
        const moveY = (y - centerY) * speed;
        
        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
    
    // Сброс позиции при уходе мыши
    paralax_carousel.addEventListener('mouseleave', () => {
      parallaxLayers.forEach(layer => {
        layer.style.transform = 'translate(0, 0)';
      });
    });
  }
  
  // Автоматическая прокрутка
  let autoSlideInterval;
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
    
    paralax_carousel.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });
    
    paralax_carousel.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
  }
  
  // Обработчики событий
  paralaxPrevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  paralaxNextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });
  
  // Инициализация при загрузке
  init();
});