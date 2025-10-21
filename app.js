let ul = document.querySelector("ul");
let section = document.querySelector("section");
let spiceSlider = document.getElementById("spiceSlider");
let spiceValue = document.getElementById("spiceValue");
let vegCheck = document.getElementById("vegCheck");
let noNutsCheck = document.getElementById("noNutsCheck");
let applyBtn = document.getElementById("applyBtn");
let resetBtn = document.getElementById("resetBtn");


fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
    .then(res => res.json())
    .then(data => data.forEach(item => 
        ul.innerHTML += `<li onclick="changeCategory(${item.id})"><button>${item.name}</button></li>`
    ));


function getAll() {
    section.innerHTML = "";
    fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
        .then(res => res.json())
        .then(data => data.forEach(item => section.innerHTML += card(item)))
        .catch(() => section.innerHTML = "კავშირის პრობლემა");
}


function card(item) {
    return `
        <div class="card">
            <img src="${item.image}" alt="">
            <h2>${item.name}</h2>
            <p>Spiciness: ${item.spiciness}</p>
            <span>Nuts: <i style="color: ${item.nuts ? 'green' : 'red'};" class="fa-solid fa-${item.nuts ? 'check' : 'x'}"></i></span>
            <span>Vegetarian: <i style="color: ${item.vegeterian ? 'green' : 'red'};" class="fa-solid fa-${item.vegeterian ? 'check' : 'x'}"></i></span>
            <div style="display:flex; justify-content:center; gap:10px; padding-top:10px;">
                <p>Price: ${item.price}₾</p>
                <button onclick="addToCart(${item.price}, ${item.id})">Add To Cart</button>
            </div>
        </div>
    `;
}


function addToCart(price, id) {
    let info = { quantity: 1, price: price, productId: id };
    fetch("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
        method: "POST",
        headers: { accept:"text/plain", "Content-Type": "application/json" },
        body: JSON.stringify(info)
    })
    .then(res => res.text())
    .then(() => alert("დაემატა"));
}


function changeCategory(id) {
    section.innerHTML = "";
    fetch(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
        .then(res => res.json())
        .then(data => data.products.forEach(item => section.innerHTML += card(item)));
}


function fetchFilteredProducts(vegetarian, nuts, spiciness) {
    section.innerHTML = "";
    const url = new URL("https://restaurant.stepprojects.ge/api/Products/GetFiltered");
    if (vegetarian) url.searchParams.append("vegeterian", "true");
    if (!nuts) url.searchParams.append("nuts", "false");
    if (spiciness !== "0") url.searchParams.append("spiciness", spiciness);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data || data.length === 0) {
                section.innerHTML = "No products found";
            } else {
                data.forEach(item => section.innerHTML += card(item));
            }
        })
        .catch(() => section.innerHTML = "Connection Problem");
}


spiceSlider.addEventListener("input", () => {
    spiceValue.textContent = spiceSlider.value;
});

applyBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const vegetarian = vegCheck.checked;
    const nuts = !noNutsCheck.checked;
    const spiciness = spiceSlider.value;
    fetchFilteredProducts(vegetarian, nuts, spiciness);
});

resetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    spiceSlider.value = 0;
    spiceValue.textContent = 0;
    vegCheck.checked = false;
    noNutsCheck.checked = false;
    getAll();
});

window.onload = () => { getAll(); };
function register(e) {
    e.preventDefault()
    let formArea = new FormData(e.target)
    let finalForm = Object.fromEntries(formArea)

    fetch("https://api.everrest.educata.dev/auth/sign_up", {
        method: "POST",
        headers: {
            accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(finalForm)
    }).then(res => res.json())
        .then(data => {
            console.log(data);

        })
}


function login(e) {
    e.preventDefault()
    let formArea = new FormData(e.target)
    let finalForm = Object.fromEntries(formArea)

    fetch("https://api.everrest.educata.dev/auth/sign_in", {
        method: "POST",
        headers: {
            accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(finalForm)
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            Cookies.set("user", data.access_token)
        })
}



function gotoProfile() {
    if(Cookies.get("user")) {
        window.location.href = "./profile.html"
    }
    else {
        alert("ჯერ გაიარე ავტორიცაზია")
    }
}

let registerBtn = document.getElementById("registerBtn");
    let modal = document.getElementById("registerModal");
    let closeBtn = document.querySelector(".close");

    registerBtn.onclick = () => {
      modal.style.display = "flex";
    };
    closeBtn.onclick = () => {
      modal.style.display = "none";
    };
    window.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none";
    };