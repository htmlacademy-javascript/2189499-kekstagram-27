const formBtn = document.querySelector('.img-upload__scale');
const smallerBtn = formBtn.querySelector('.scale__control--smaller');
const biggerBtn = formBtn.querySelector('.scale__control--bigger');
let valueBtn = formBtn.querySelector('.scale__control--value').value;



smallerBtn.addEventListener('click', function() {
    if (typeof(valueBtn) === 'string') {
        valueBtn = Number(valueBtn.split('%').join(''));
    };
    if (valueBtn > 0) {
    valueBtn -= 25;
    };
    console.log(valueBtn);
    if (typeof(valueBtn) === 'number') {
        valueBtn = String(valueBtn + '%');
        console.log(valueBtn);
    };
});


biggerBtn.addEventListener('click', function() {
    if (typeof(valueBtn) === 'string') {
        valueBtn = Number(valueBtn.split('%').join(''));
    };
    if (valueBtn < 100) {
    valueBtn += 25;
    };
    console.log(valueBtn);
    if (typeof(valueBtn) === 'number') {
        valueBtn = String(valueBtn + '%');
        console.log(valueBtn);
    };
});
