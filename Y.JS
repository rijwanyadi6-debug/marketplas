const products = [
    { id: 1, name: 'SOSIS', price: 10666000, img: 'produk/sosis.jpg' },
    { id: 2, name: 'GORIORIO', price: 100000000000, img: 'produk/goriorio.jpg' },
    { id: 3, name: 'KACANG', price: 11000, img: 'produk/kacang telur.jpg' },
    { id: 4, name: 'POPCRON', price: 10000, img: 'produk/1.jpg' }, // Fixed the image path
    { id: 5, name: 'PILUS GARUDA', price: 18000000000000, img: 'produk/pilus garuda.jpg' }
];

let cart = [];

function displayProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price}</p>
            <button onclick="addToCart(${product.id})">Tambah ke keranjang</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous cart items

    let totalPrice = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;
        cartItemsContainer.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = `Rp ${totalPrice}`;
}

function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let payment = prompt(`Total belanja Anda Rp ${total}. Masukkan jumlah pembayaran:`);
    
    // Ensure payment is a number and not empty
    payment = parseFloat(payment);
    
    if (isNaN(payment)) {
        alert('Masukkan jumlah yang valid!');
        return;
    }

    if (payment >= total) {
        alert(`Pembayaran berhasil! Kembalian Anda Rp ${payment - total}`);
        cart = []; // Clear cart after checkout
        updateCart();
    } else {
        alert('Uang Anda tidak mencukupi.');
    }
}

document.getElementById('checkout-btn').addEventListener('click', checkout);

displayProducts();
