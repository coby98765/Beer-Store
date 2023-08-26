//img slider
const bigImg = document.getElementsByClassName('big-img');
function currentDiv(num) {
    console.log(bigImg);
    for (i = 0; i < bigImg.length; i++) {
        if (bigImg[i].classList.contains('select')) {
            bigImg[i].classList.remove('select');
        }
    }
    
    bigImg[num].classList.add('select');
}
//Quantity Counter
function increaseCount(a, b) {
    var input = b.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
}

function decreaseCount(a, b) {
    var input = b.nextElementSibling;
    var value = parseInt(input.value, 10);
    if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        input.value = value;
    }
}


