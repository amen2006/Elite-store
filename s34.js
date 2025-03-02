const products = [
    { id: 6, name: "Van Cleef", description: "💚", price: 32, image: "v1.jpeg" },
    { id: 7, name: "Van Cleef", description: "🌟", price: 32, image: "v2.jpeg" },
    { id: 8, name: "Van Cleef", description: "🏆", price: 32, image: "v3.jpeg" },
    { id: 9, name: "Van Cleef", description: "⛄", price: 32, image: "v4.jpeg" },
    { id: 10, name: "Van Cleef", description: "☃️", price: 32, image: "v4.jpeg" },
    { id: 11, name: "Van Cleef", description: "❄️", price: 32, image: "v5.jpeg" }
];

function displayProducts(page) {
    const productsSection = document.querySelector(".products");
    productsSection.innerHTML = "";
    const start = (page - 1) * 6;
    const end = start + 6;
    const productsToShow = products.slice(start, end);

    productsToShow.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p><strong>السعر: DT${product.price}</strong></p>
            <button onclick="addToCart(${product.id})">ADD</button>`;
        productsSection.appendChild(productDiv);
    });

    const navigationDiv = document.createElement("div");
    navigationDiv.className = "navigation";
    if (page === 1) {
        navigationDiv.innerHTML = `
            <a href="h1.html"><button>Leftovers</button></a>
            <a href="https://www.instagram.com/elite___.store?igsh=MW5qYno5ejFxM3htdg=="><button>Instagram</button></a>
        `;
    } else if (page === 2) {
        navigationDiv.innerHTML = `
            <a href="c1.html"><button>next</button></a>
            <a href="https://www.instagram.com/elite___.store?igsh=MW5qYno5ejFxM3htdg=="><button>Instagram</button></a>
        `;
    }
    productsSection.appendChild(navigationDiv);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        const confirmation = document.createElement("div");
        confirmation.className = "confirmation";
        confirmation.innerHTML = `<p>${product.name} Add to basket ! <i class="fas fa-check-circle"></i></p>`;
        document.body.appendChild(confirmation);

        setTimeout(() => {
            confirmation.remove();
        }, 2000);
        const email = "ament1@gmail.com";
        const subject = "طلب منتج جديد";
        const body = `أريد شراء المنتج التالي:\n\nالاسم: ${product.name}\nالوصف: ${product.description}\nالسعر: DT${product.price}\n اسم :\n رقم هاتف:\n العنوان :\n thank you❤️`;
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') || 1;
    displayProducts(parseInt(page));
});