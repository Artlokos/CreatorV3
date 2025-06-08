const themeButtons = document.querySelectorAll('.header__theme-menu-button');

document.addEventListener('DOMContentLoaded', function() {
  // Получаем все кнопки навигации
  const navButtons = document.querySelectorAll('.header__theme-menu-button');
  
  // Получаем основную секцию
  const mainBody = document.getElementById('main_body');
  
  // Для каждой кнопки добавляем обработчик клика
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Удаляем disabled у всех кнопок
      navButtons.forEach(btn => btn.disabled = false);
      
      // Делаем текущую кнопку неактивной
      this.disabled = true;
      
      // Получаем номер секции из текста кнопки (1, 2 или 3)
      const sectionNumber = this.textContent.trim().charAt(0);
      
      // Получаем соответствующую секцию
      let targetSection;
      switch(sectionNumber) {
        case '1':
          targetSection = document.getElementById('frezer');
          break;
        case '2':
          targetSection = document.getElementById('lazer');
          break;
        case '3':
          targetSection = document.getElementById('graver');
          break;
      }
      
      // Плавный скролл к секции
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Добавляем небольшой отступ сверху
        window.scrollBy(0, -20);
      }
    });
  });
  
  // Инициализация - делаем первую кнопку активной
  navButtons[0].disabled = true;
});


themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    themeButtons.forEach((btn) => {
      btn.classList.remove('header__theme-menu-button_active');
      btn.removeAttribute('disabled');
    });
    button.classList.add('header__theme-menu-button_active');
    button.setAttribute('disabled', true);
  });
});
