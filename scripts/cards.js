document.addEventListener('DOMContentLoaded', function() {
  
  const cardSections = document.querySelectorAll('.card-section');
   
  const resetActiveStates = () => {
    cardSections.forEach(card => { card.classList.remove('active');});
  }
   
  cardSections.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
            
      const targetId = e.currentTarget.id;
      const targetSection = document.getElementById(targetId);
           
      resetActiveStates();
            
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });

  // Обработчик клика по документу для сброса активного состояния
  document.addEventListener('click', function(e) {
    // Если клик был не по навигационной кнопке и не по активной секции
    if (!e.target.closest('.card-section.active')) {resetActiveStates();}
  });
});