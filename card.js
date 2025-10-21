let section = document.querySelector("section");

function cartArea() {
  section.innerHTML = "";
  fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        data.forEach(item => section.innerHTML += card(item));
      } else {
        section.innerHTML = "your cart is empty"
      }
    });
}

cartArea();

function card(item) {
      return `<div class="card" style="width: 18rem;">
  <img src="${item.product.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.product.name}</h5>
    <p class="card-text">${item.price}$</p>
    <p class="card-text"> <button onclick="increase(${item.quantity}, ${item.price}, ${item.product.id})">+</button> ${item.quantity} <button ${item.quantity == 1 ? 'disabled': ''}  onclick="decrease(${item.quantity}, ${item.price}, ${item.product.id}, event)">-</button></p>
    <button onclick="removeFromCart(${item.product.id})" class="btn btn-danger">Remove</button>
  </div>
</div>`
}

function increase(q, p, id) {
  q++;
  let info = { quantity: q, price: p, productId: id };
  fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info)
  })
    .then(res => res.text())
    .then(() => cartArea());
}

function decrease(q, p, id) {
  q--;
  let info = { quantity: q, price: p, productId: id };
  fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info)
  })
    .then(res => res.text())
    .then(() => cartArea());
}

function removeFromCart(id) {
  fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`, {
    method: "DELETE"
  })
    .then(res => res.text())
    .then(() => cartArea());
}


function increase(q, p, id) {
  q++;
  let newPrice = (p / (q - 1)) * q; 

  let info = {
    quantity: q,
    price: newPrice,
    productId: id
  };

  fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info)
  })
    .then(res => res.text())
    .then(() => cartArea());
}

function decrease(q, p, id) {
  if (q <= 1) return; 
  q--;
  let newPrice = (p / (q + 1)) * q; 

  let info = {
    quantity: q,
    price: newPrice,
    productId: id
  };

  fetch("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info)
  })
    .then(res => res.text())
    .then(() => cartArea());
}




    let burger = document.getElementById('burger');
    let menuList = document.getElementById('navLinks');

    burger.addEventListener('click', () => {
      menuList.classList.toggle('show');
      burger.classList.toggle('active');
    });



    overlay.addEventListener("click", () => {
  burger.classList.remove("active");
  navLinks.classList.remove("show");
  overlay.classList.remove("show");
});




    let closeIcon = document.getElementById('closeIcon');

    burger.addEventListener('click', () => {
      menuList.classList.toggle('show');
      burger.classList.toggle('active');
    });