const dialog = document.getElementById('dialog');
const dialogHeader =dialog.querySelector('.dialog_header')
const dialogImg = dialog.querySelector('img');
const dialogText = dialog.querySelector('.dialog_text');
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
      // Устанавливаем контент
      dialogImg.src = content.imgSrc;
      dialogImg.alt = content.title;
      dialogHeader.innerHTML = content.title;
      dialogText.innerHTML = content.text;
      // Показываем диалог
      dialog.showModal();
    });
  });

closeBtn.addEventListener('click', () => {
  dialog.close();
  dialog.setAttribute("hidden",true);
});

dialog.addEventListener('click', (e) => {if (e.target === dialog) {dialog.close();}});
document.addEventListener('keydown', (e) => {if (e.key === 'Escape' && dialog.open) {dialog.close();}});
