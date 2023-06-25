// import '../Script/popup.js';
const productGrid = document.getElementById('product-grid');
const popupPlaseholder = document.getElementById('popup-container');
const mainBody = document.getElementById('body');

// select class toggle
function selectClassOption(option, c) {
    if (option.classList.contains('selected')) {
        // If the clicked button is already selected, remove the 'selected' class
        option.classList.remove('selected');
    } else {
        // Remove the 'selected' class from all buttons
        buttons = document.getElementsByClassName(c);
        for (i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('selected');
        }
        // Add the 'selected' class to the clicked button
        option.classList.add('selected');
    }
};

//Filtering Accordion Panel
const acc = document.getElementsByClassName("accordion");

function selectClassRemove(c) {
    buttons = document.getElementsByClassName(c);
    for (i = 0; i < buttons.length; i++) {

        if (buttons[i].classList.contains('active')) {
            buttons[i].classList.remove('active');
            buttons[i].nextElementSibling.style.maxHeight = null;
        }
    }
}

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

//SideNav Mobile Settings
function toggleNav() {
    const sideNav = document.querySelector('.sideNav');
    const overlay = document.querySelector('.overlay');
    const closeButton = document.querySelector('.close-button');

    sideNav.classList.toggle('open');
    if (sideNav.style.left === '0px') {
        sideNav.style.left = '-300px';
        overlay.style.display = 'none';
        closeButton.style.display = 'none';
    } else {
        sideNav.style.left = '0px';
        overlay.style.display = 'block';
        closeButton.style.display = 'block';
    }
}

//store
productGrid.innerHTML = `
    <div class="product-tile loading">
    <h1><i class="fa-solid fa-spinner fa-spin-pulse"></i></h1>
    <h3>Loading items...</h3>
    <p>Please wait a moment</p>
    </div>
    `;

//loading data
const products = [{
    name: "Pale Ale",
    style: "Pale Ale",
    abv: 5.5,
    ibu: 40,
    description: "A classic Pale Ale with a balanced hop bitterness and notes of citrus and pine.",
    thumbnail: "../Assets/BeerCup2.jpg",
    images: ["../Assets/BeerCup2.jpg", "../Assets/6pack.jpg", "../Assets/BeerCup.jpg"],
    price: 12.99,
    quantity: 50,
}, {
    name: "IPA",
    style: "IPA",
    abv: 6.5,
    ibu: 90,
    description: "Goose Island’s flagship IPA is a six-time medal winner at the Great American Beer Festival. We’ve taken the traditional English Style and created our own fuller flavored IPA with bright citrus aromas and a bold hop finish. With hoppy, bold, and smooth flavor, Goose IPA is the perfect beer for hopheads and discovery drinkers alike.",
    thumbnail: "../Assets/BeerCup2.jpg",
    images: ["../Assets/BeerCup2.jpg", "../Assets/6pack.jpg", "../Assets/BeerCup.jpg"],
    price: 15.99,
    quantity: 50,
}, {
    sku: "ST001",
    name: "Stout",
    style: "Stout",
    abv: 6.0,
    description: "A rich and dark Stout with hints of chocolate and roasted malt.",
    price: 11.99,
    thumbnail: "../Assets/BeerCup2.jpg",
    images: ["../Assets/BeerCup2.jpg", "../Assets/6pack.jpg", "../Assets/BeerCup.jpg"],
},
];

//view array
const productsView = [];

//render
function moveProducts(array) {
    array.forEach(product => {
        productsView.push(product)
    });
}

moveProducts(products)


//render products view

function renderProducts(array) {
    productGrid.innerHTML = "";
    array.forEach(product => {
        renderProductCard(product)
    });
}
setTimeout(() => {
    renderProducts(productsView)
}, 1000);

//sort array
const productsSort = products.sort(function (a, b) { });

//filter array


//render products



//render product card
function renderProductCard(product) {
    const div = document.createElement('div');
    div.classList.add('product-tile');
    div.innerHTML = `
                    <div class="image-container">
                        <img class="product-image" src="${product.thumbnail}" alt="${product.name}">
                    </div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                    <button class="see-more-button">See More</button>
                `;

    const SeeMoreButton = div.querySelector('.see-more-button');
    SeeMoreButton.addEventListener('click', () => {
        renderProductPopup(product);
    });

    productGrid.appendChild(div);
}

//render product popup
function renderProductPopup(product) {
    // console.log(product.name);
    popupPlaseholder.classList.remove('hiden');
    popupPlaseholder.classList.add('open');
    // change price
    let price = product.price;
    popupPlaseholder.innerHTML = `
                     <button class="close-popup"><i class="fa-solid fa-xmark"></i></button>

        <div class="popup-content">

            <div class="product-images">
                <div class="main-img">
                    <img src="${product.images[0]}" id="big-img0" class="big-img">
                    <img src="${product.images[1]}" id="big-img1" class="big-img select">
                    <img src="${product.images[2]}" id="big-img2" class="big-img">
                </div>
                <div class="smal-img">
                    <img src="${product.images[0]}" id="smal-img0" onclick="currentDiv(0)">
                    <img src="${product.images[1]}" id="smal-img1" onclick="currentDiv(1)">
                    <img src="${product.images[2]}" id="smal-img2" onclick="currentDiv(2)">
                </div>
            </div>

            <div class="product-details">
                <h1 class="product-name">${product.name}</h1>
                <div class="price-style-div">
                    <p class="product-style">${product.style}</p>
                    <p class="product-abv">${product.abv}% ABV</p>
                    <p class="product-price" id="display-price">${product.price}</p>
                </div>

                <h3>Description</h3>
                <p class="product-description">
                    ${product.description}
                </p>
<form id="add-to-cart">
                <h3>Select Packing:</h3>
                <div class="select-container">
                    <div>
                        <div class="switch-field">
                            <input type="radio" id="type-bottle" name="switch-type" value="Bottle" checked />
                            <label for="type-bottle">Bottle</label>
                            <input type="radio" id="type-can" name="switch-type" value="Can" />
                            <label for="type-can">Can</label>
                        </div>
                    </div>
                    <div>
                        <div class="switch-field">
                            <input type="radio" id="radio-one" name="switch-one" value="1" checked />
                            <label for="radio-one">Singles</label>
                            <input type="radio" id="radio-two" name="switch-one" value="6" />
                            <label for="radio-two" id="radio-two-label" >6 Pack</label>
                        </div>
                    </div>
                </div>
                <h3>Select Amount:</h3>
                <div class="counter">
                    <span class="down" onClick='decreaseCount(event, this)'><i class="fa-solid fa-minus"></i></span>
                    <input type="text" value="1">
                    <span class="up" onClick='increaseCount(event, this)'><i class="fa-solid fa-plus"></i></span>
                </div>

                <input type="submit" value="Add to Cart" id="add-to-cart-btn"/>
            </form>
            </div>
        </div>
               `;

    //price calculation
    let sixPack = false;

    const radioButtons = document.querySelectorAll('input[name="switch-one"]');
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('change', function () {
            const displaydPrice = document.getElementById('display-price');
            if (this.value === "6") {
                sixPack = true;
                let sum = price * 6 * 0.9;
                displaydPrice.classList.add('sixPack')
                displaydPrice.textContent = sum.toFixed(2);
            } else {
                sixPack = false;
                displaydPrice.textContent = price.toFixed(2);
                displaydPrice.classList.remove('sixPack')
            }
        });
    });

    //close popup
    const icon_close = document.querySelector('.close-popup');
    icon_close.addEventListener('click', (e) => {
        closeProductPopup()
    });


    //add to cart
    const addToCart = document.getElementById('add-to-cart');
    const addToCartBtn = document.getElementById('add-to-cart-btn');

    addToCart.addEventListener('submit', (e) => {
        e.preventDefault();
        var packingOption1 = document.querySelector('input[name="switch-type"]:checked').value;
        var packingOption2 = document.querySelector('input[name="switch-one"]:checked').value;
        // Get the selected amount
        var amount = document.querySelector('.counter input').value;

        // Display the selected values
        console.log(`Selected Packing: ${packingOption1},and ${packingOption2}`);
        console.log('Selected Amount: ' + amount);
        let sum = amount * packingOption2
        console.log('Sum: ' + sum);
        addToCartBtn.value = `Done`;

        // Reset and close the form
        setTimeout(() => {
            addToCart.reset();
            closeProductPopup()
        }, 1000)

    });
}

//close product popup
function closeProductPopup() {
    popupPlaseholder.classList.remove('open');
    popupPlaseholder.classList.add('hiden');
    popupPlaseholder.innerHTML = "";
}
