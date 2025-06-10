const dialog = document.getElementById('dialog');
const dialogImg = dialog.querySelector('img');
const closeBtn = document.querySelector('.dialog_close-btn');

  // Контент для каждой карточки
  const cardContents = {
    frezer: {
      imgSrc: './images/jpg/frezer.jpg',
      title: 'Фрезерная обработка',
      text: 'Прецизионная обработка металла, пластика и дерева на современных станках с ЧПУ. Точность до 0.01 мм, соблюдение ГОСТ и ТУ.<br><br> Для уточнения подробностей заказа нажмите на кнопку "Заказать обратный звонок"'
    },
    lazer: {
      imgSrc: './images/jpg/laser.jpg',
      title: 'Лазерная резка',
      text: 'Чистая и точная лазерная резка металлов до 20 мм. Минимальные допуски, ровные кромки без заусенцев.<br><br> Для уточнения подробностей заказа нажмите на кнопку "Заказать обратный звонок"'
    },
    graver: {
      imgSrc: './images/jpg/graver.jpg',
      title: 'Гравировка',
      text: 'Художественная гравировка на любых материалах. Логотипы, памятные надписи, декоративные элементы.<br><br> Для уточнения подробностей заказа нажмите на кнопку "Заказать обратный звонок"'
    }
  };

  // Обработчики для кнопок карточек
  document.querySelectorAll('.card-section button').forEach(button => {
    button.addEventListener('click', function() {
      
      const sectionId = this.closest('.card-section').id;
      const content = cardContents[sectionId];

      dialogImg.src = content.imgSrc;
      dialogImg.alt = content.title;
      dialog.classList.add("dialog_is_opened");
    });
  });

closeBtn.addEventListener('click', () => {
  dialog.classList.remove("dialog_is_opened");
});

dialog.addEventListener('click', (e) => {if (e.target === dialog) {
  dialog.classList.remove("dialog_is_opened");
}});
document.addEventListener('keydown', (e) => {if (e.key === 'Escape' && dialog.open) {
  dialog.classList.remove("dialog_is_opened");
}});
