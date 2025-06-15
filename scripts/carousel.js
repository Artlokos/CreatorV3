class Carousel {
    constructor(element) {
        this.element = element;
        this.track = element.querySelector('.paralax_carousel__track');
        this.slides = Array.from(element.querySelectorAll('.paralax_carousel__slide'));
        this.prevBtn = element.querySelector('.paralax_carousel__button--prev');
        this.nextBtn = element.querySelector('.paralax_carousel__button--next');
        this.indicators = Array.from(element.querySelectorAll('.paralax_carousel__indicator'));
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.isTransitioning = false;
        
        // Установим ширину трека
        this.track.style.width = `${100 * this.slideCount}%`;
        
        // Инициализация
        this.updateCarousel();
        
        // События
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Автопрокрутка (опционально)
        this.startAutoPlay();
    }
    
    updateCarousel() {
        // Плавное перемещение трека
        this.track.style.transform = `translateX(-${this.currentIndex * (100 / this.slideCount)}%)`;
        
        // Обновление индикаторов
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // Добавим класс для анимации текущего слайда
        this.slides.forEach((slide, index) => {
            if (index === this.currentIndex) {
                slide.style.opacity = '1';
            } else {
                slide.style.opacity = '0';
            }
        });
        
        // Задержка для завершения анимации
        this.isTransitioning = true;
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }
    
    prevSlide() {
        if (this.isTransitioning) return;
        
        this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.updateCarousel();
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    startAutoPlay() {
        // Автопрокрутка каждые 5 секунд
        this.interval = setInterval(() => {
            this.nextSlide();
        }, 5000);
        
        // Остановка автопрокрутки при наведении
        this.element.addEventListener('mouseenter', () => {
            clearInterval(this.interval);
        });
        
        // Возобновление автопрокрутки при уходе курсора
        this.element.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }
}

// Инициализация карусели
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.paralax_carousel');
    carousels.forEach(carousel => new Carousel(carousel));
});