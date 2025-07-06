const products = [
  {
    id: 1,
    title: 'Eyeshadow Palette',
    price: 100000,
    img: 'img/eyeshadow.jpeg',
    desc: 'Eyeshadow Palette yang memiliki banyak warna pilihan untuk segala jenis acara'
  },
  {
    id: 2,
    title: 'Cream Blush',
    price: 75000,
    img: 'img/cream_blush.png',
    desc: 'Cream Blush yang cocok digunakan sehari-hari'
  },
  {
    id: 3,
    title: 'Fondation',
    price: 100000,
    img: 'img/fondation.png',
    desc: 'Fondation full coverage cocok untuk semua acara'
  },
  {
    id: 4,
    title: 'Baked Blush',
    price: 120000,
    img: 'img/baked_blush_2.jpg',
    desc: 'Tampilan blush yang natural dan mudah dibawa kemana-mana'
  },
  {
    id: 5,
    title: 'Liquid Blush',
    price: 95000,
    img: 'img/liquid_blush.png',
    desc: 'Liquid blush yang memiliki tekstur ringan, mudah di blend dan memiliki warna high-pigmented'
  },
  {
    id: 6,
    title: 'Lipstick',
    price: 60000,
    img: 'img/lipstick.jpg',
    desc: 'Memberikan warna yang pigmented pada bibir, dengan satu kali olesan dapat memberikan tampilan bibir yang memukau'
  },
  {
    id: 7,
    title: 'Two Way Cake',
    price: 140000,
    img: 'img/twc.png',
    desc: 'Powerstay Matte Powder Foundation merupakan bedak dengan hasil full coverage'
  },
  {
    id: 8,
    title: 'Cushion',
    price: 185000,
    img: 'img/cushion.jpg',
    desc: 'Powerstay Demi-Matte Cover Cushion merupakan cushion yang dapat menyesuaikan dengan kondisi kulit selama pemakaian untuk hasil flawless selama 24 jam'
  },
  {
    id: 9,
    title: 'Eyeliner',
    price: 65000,
    img: 'img/eyeliner.jpeg',
    desc: 'Eyeliner spidol semi permanen yang super gampang diaplikasikan bahkan untuk pemula. Performa waterproof, smudgeproof, dan tahan lama hingga 48 jam. Eyeliner dengan warna hitam pekat dan tahan hingga 48 jam'
  },
  {
    id: 10,
    title: 'Setting Spray',
    price: 55000,
    img: 'img/settingspray.jpg',
    desc: 'Setting spray merupakan salah satu jenis produk yang dapat membuat riasan lebih awet dan tahan lama.'
  }
];

let cart = [];
let currentProduct = null;

products.forEach(p => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${p.img}" alt="${p.title}">
    <h2>${p.title}</h2>
    <p>${p.desc}</p>
    <div class="price">Rp${p.price.toLocaleString()}</div>
    <button onclick="showDetail(${p.id})">Detail</button>
  `;
  document.getElementById('products').appendChild(card);
});

function showDetail(id) {
  currentProduct = products.find(x => x.id === id);
  document.getElementById('modalImg').src = currentProduct.img;
  document.getElementById('modalTitle').innerText = currentProduct.title;
  document.getElementById('modalPrice').innerText = 'Rp' + currentProduct.price.toLocaleString();
  document.getElementById('modalDesc').innerText = currentProduct.desc;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal(e) {
  if (e.target.classList.contains('modal') || e.target.classList.contains('close'))
    document.getElementById('modal').style.display = 'none';
}

function addToCart() {
  const item = cart.find(c => c.id === currentProduct.id);
  item ? item.qty++ : cart.push({ 
    id: currentProduct.id, 
    title: currentProduct.title, 
    price: currentProduct.price, 
    qty: 1 
  });
  updateCartCount();
  document.getElementById('modal').style.display = 'none';
}

function updateCartCount() {
  const count = cart.reduce((a, b) => a + b.qty, 0);
  document.getElementById('cart-count').innerText = count;
}

function openCart() {
  renderCart();
  document.getElementById('cart-modal').style.display = 'flex';
}

function closeCart(e) {
  if (e.target.classList.contains('modal') || e.target.classList.contains('close'))
    document.getElementById('cart-modal').style.display = 'none';
}

function renderCart() {
  const tbody = document.querySelector('#cart-table tbody');
  tbody.innerHTML = '';
  let total = 0;
  cart.forEach(c => {
    const sub = c.price * c.qty;
    total += sub;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.title}</td>
      <td>${c.qty}</td>
      <td>Rp${c.price.toLocaleString()}</td>
      <td>Rp${sub.toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  });
  document.getElementById('cart-total').innerText = 'Total: Rp' + total.toLocaleString();
}

function checkout() {
  alert('Checkout berhasil! ' + document.getElementById('cart-total').innerText);
  cart = [];
  updateCartCount();
  document.getElementById('cart-modal').style.display = 'none';
}