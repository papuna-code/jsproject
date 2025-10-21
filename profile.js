let section = document.querySelector("section")

fetch("https://api.everrest.educata.dev/auth", {
    method: "GET",
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${Cookies.get("user")}`
    }
})
.then(res => res.json())
.then(data => {
    console.log(data);
    section.innerHTML = `<h1>Hello, ${data.firstName}!</h1>
        <img src="${data.avatar}" alt="">
        <h6>Tel: ${data.phone}</h6>`
})



function logOut() {
    Cookies.remove("user")
    window.location.href = "./index.html"
}