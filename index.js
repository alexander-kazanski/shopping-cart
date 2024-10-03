import { menuArray } from './data.js';


let total = 0;
let cartItems = []

document.addEventListener('click', function(e) {
    console.log(e.target);
    if (e.target.id) {
        handleAddCartItem(e.target.id);
        handleUpdateTotal();
    } else if (e.target.dataset.id) {
        handleCheckout()
    } else if (e.target.dataset.order) {
        e.preventDefault()
        handleOrderSubmit();
    } else {
        handleRemoveCartItem(e.target.dataset.remove)
        handleUpdateTotal();
    }
})

function handleOrderSubmit() {
    const formData = new FormData(document.querySelector('.payment'))
    if (!formData.get("name") || !formData.get("creditCard") || !formData.get("cvv")) {
        document.querySelector('.form-inputs').innerHTML += '<p class="error">Error submitting form. All fields are required</p>'
        return
    }
    document.querySelector('.payment').classList.remove('show');
    document.querySelector('.payment').classList.add('hide')
    
    const cartEl = document.getElementById('cart');
    console.log(cartEl)
    cartEl.classList.remove("show");
    console.log(cartEl)
    document.getElementById('cart').classList.add("hide");
    
    document.querySelector(".order-complete").classList.remove("hide");
    document.querySelector(".order-complete").classList.add("show");
}


function menuItemsHtml(itemsArray) {
    return itemsArray.map(function(next) {
        return `<div class="menu-item">
                <img class="menu-img" src="images/${next.img}" alt="${next.name} clip art" />
                <div class="menu-info">
                    <p class="menu-title smythe-regular">${next.name}</p>
                    <p class="topings smythe-regular">${next.ingredients.join(", ")}</p>
                    <p class="price smythe-regular">$${next.price}</p>
                </div>
                <div class="add-to-cart" id="${next.id}">
                    <p class="plus smythe-regular" id="${next.id}">+</p>
                </div>
            </div>`
    
    }).join("");             
}

function getCartItem(item) {
    return `
        <div class="cart-item show">
            <span class="cart-item-info" data-remove="${item.id}">
                <p class="cart-item-info-name">${item.name}</p>
                <p class="remove" data-remove="${item.id}">remove</p>
            </span>
            <p class="cart-price">$${item.price}</p>
        </div>`
}

function handleCheckout() {
    const paymentDialog = document.querySelector('.payment');
    paymentDialog.classList.remove('hide');
    paymentDialog.classList.add('show');
}

function handleAddCartItem(itemId) {
    const item = menuArray.filter(function(item) {
        return item.id == itemId;
    })[0]
    cartItems.push(item);
    render();
}

function handleRemoveCartItem(itemId) {
    cartItems = cartItems.filter(function(item) {
        return item.id !== itemId
    })
    console.log(itemId)
    render();
}

function handleUpdateTotal() {
    total = cartItems.reduce(function(total, item) {
        total += item.price;
        return total;
    }, 0);
    document.getElementById("total-price").textContent = `$${total}`
}

function render() {
    document.getElementById('menu').innerHTML = menuItemsHtml(menuArray)
    document.getElementById('cart-items').innerHTML = cartItems.map(function(item) {
        return getCartItem(item);
    }).join("") 
}
render();
