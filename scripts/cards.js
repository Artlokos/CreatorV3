document.addEventListener('DOMContentLoaded', function() {
  // Получаем все кнопки навигации
  const navButtons = document.querySelectorAll('.header__theme-menu-button');
  // Получаем все секции карточек
  const cardSections = document.querySelectorAll('.card-section');
  
  // Функция для сброса всех активных состояний
  function resetActiveStates() {
    cardSections.forEach(section => {
      section.classList.remove('active');
    });
  }
  
  // Обработчик клика для каждой кнопки навигации
  navButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Получаем ID целевой секции из href ссылки
      const targetId = this.parentElement.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      // Сбрасываем активные состояния
      resetActiveStates();
      
      // Добавляем класс active к целевой секции
      if (targetSection) {
        targetSection.classList.add('active');
        
        // Прокручиваем к секции с плавным поведением
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    });
  });
  
  cardSections.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Получаем ID целевой секции из href ссылки
      const targetId = this.getAttribute('id');
      const targetSection = document.getElementById(targetId);
      
      // Сбрасываем активные состояния
      resetActiveStates();
      
      // Добавляем класс active к целевой секции
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });

  // Обработчик клика по документу для сброса активного состояния
  document.addEventListener('click', function(e) {
    // Если клик был не по навигационной кнопке и не по активной секции
    if (!e.target.closest('.header__theme-menu-button') && 
        !e.target.closest('.card-section.active')) {
      resetActiveStates();
    }
  });
});