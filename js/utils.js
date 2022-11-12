
//проверка нажатой кнопки Esc
const isEscButton = (evt) => evt.key === 'Escape';
//вывод сообщения об ошибке

const ALERT_SHOW_TIME = 5000;
const showAlert = () => {
    const errorMessage = errorset.content.cloneNode(true);
    document.body.append(errorMessage);
    setTimeout(() => {
        const windowError = document.querySelector('.back');
        windowError.remove();
    }, ALERT_SHOW_TIME);
};
export {isEscButton, showAlert};
