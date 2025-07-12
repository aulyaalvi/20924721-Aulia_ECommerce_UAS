const products = [
  {
    id: 1,
    title: 'Eyeshadow Palette',
    price: 95000,
    img: 'img/eyeshadow.jpg',
    desc: 'Eyeshadow Palette yang memiliki banyak warna pilihan untuk segala jenis acara'
  },
  {
    id: 2,
    title: 'Cushion',
    price: 175000,
    img: 'img/cushion.jpg',
    desc: 'Gunakan cushion sebagai pilihan ideal sehari-hari dengan tampilan glowing alami tanpa effort. Teksturnya ringan, cepat merata, dan tampilkan hasil alami seperti kulit sehat '
  },
  {
    id: 3,
    title: 'Fondation',
    price: 100000,
    img: 'img/fondation.jpeg',
    desc: 'Fondation full coverage cocok untuk semua acara'
  },
  {
    id: 4,
    title: 'Concealer',
    price: 93000,
    img: 'img/concealer.jpg',
    desc: 'Full & Buildable Coverage, tutupi lingkaran gelap, kemerahan, bekas jerawat, bahkan tanda usia dengan satu sapuan, tanpa terlihat cakey'
  },
  {
    id: 5,
    title: 'Mascara',
    price: 95000,
    img: 'img/mascara.jpg',
    desc: 'Rasakan transformasi instan! Swipe sekarang dan dapatkan mata yang lebih terbuka, lentik, dan penuh daya tarik-tanpa drama.'
  },
  {
    id: 6,
    title: 'Lipstick',
    price: 60000,
    img: 'img/lip.jpg',
    desc: 'Memberikan warna yang pigmented pada bibir, dengan satu kali olesan dapat memberikan tampilan bibir yang memukau'
  },
  {
    id: 7,
    title: 'Two Way Cake',
    price: 140000,
    img: 'img/twc.jpg',
    desc: 'Powerstay Matte Powder Foundation merupakan bedak dengan hasil full coverage'
  },
  {
    id: 8,
    title: 'Brush Make Up',
    price: 150000,
    img: 'img/brush.jpg',
    desc: 'Didesain untuk memberikan hasil riasan flawless bak profesional tiap sapuan, set ini menggabungkan teknologi serat sintetis premium dengan ergonomi modern.'
  },
  {
    id: 9,
    title: 'Eyeliner',
    price: 65000,
    img: 'img/eyeliner.jpg',
    desc: 'Eyeliner semi permanen yang super gampang diaplikasikan bahkan untuk pemula. Performa waterproof, smudgeproof, dan tahan lama.'
  },
  {
    id: 10,
    title: 'Loose Powder',
    price: 98000,
    img: 'img/loose powder.jpg',
    desc: 'Ultimate Matte Loose Powder adalah bedak tabur super, lindungi riasan dari kilap dan luntur sepanjang hari - cocok untuk aktivitas penuh percaya diri!'
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