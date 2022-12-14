const ALERT_SHOW_TIME = 5000;

//проверка нажатой кнопки Esc
const isEscButton = (evt) => evt.key === 'Escape';
//вывод сообщения об ошибке

const showAlert = () => {
  const errorTemplate = document.getElementById('errorset');
  const errorMessage = errorTemplate.content.cloneNode(true);
  document.body.append(errorMessage);
  setTimeout(() => {
    const windowError = document.querySelector('.back');
    windowError.remove();
  }, ALERT_SHOW_TIME);
};

//debounce
const debounce = (callback, timeoutDelay) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};


export {isEscButton, showAlert, debounce};
