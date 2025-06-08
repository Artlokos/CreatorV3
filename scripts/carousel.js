// const carouselTrack = document.querySelector('.paralax_carousel__track');
// const slides = document.querySelectorAll('.carousel__slide');
// const prevBtn = document.querySelector('.carousel__button--prev');
// const nextBtn = document.querySelector('.carousel__button--next');
// const indicators = document.querySelectorAll('.carousel__indicator');

// let currentIndex = 0;
// const slideCount = slides.length;

// // Переключение слайдов
// function goToSlide(index) {
//   if (index < 0) index = slideCount - 1;
//   else if (index >= slideCount) index = 0;

//   currentIndex = index;
//   carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

//   // Обновление индикаторов
//   indicators.forEach((indicator, i) => {
//     indicator.classList.toggle('active', i === currentIndex);
//   });
// }

// // Кнопки "Вперед/Назад"
// prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
// nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

// // Клик по индикаторам
// indicators.forEach((indicator, i) => {
//   indicator.addEventListener('click', () => goToSlide(i));
// });

// // Автопрокрутка
// let autoSlideInterval = setInterval(() => goToSlide(currentIndex + 1), 3000);

// // Остановка автопрокрутки при наведении
// carouselTrack.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
// carouselTrack.addEventListener('mouseleave', () => {
// autoSlideInterval = setInterval(() => goToSlide(currentIndex + 1), 3000);
// });

// // Инициализация
// goToSlide(0);