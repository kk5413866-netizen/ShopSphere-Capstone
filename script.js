// ================= PRODUCT DATA =================

const defaultProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
        description: "High-quality wireless headphones with clear sound."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        description: "Modern smartwatch with fitness tracking features."
    },
    {
        id: 3,
        name: "Casual T-Shirt",
        price: 799,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
        description: "Comfortable cotton t-shirt for everyday wear."
    },
    {
        id: 4,
        name: "Travel Backpack",
        price: 1299,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
        description: "Durable backpack suitable for travel and college."
    }
];


// ================= LOCAL STORAGE =================

let products =
    JSON.parse(localStorage.getItem("shopsphereProducts")) ||
    defaultProducts;

let cart =
    JSON.parse(localStorage.getItem("shopsphereCart")) ||
    [];


// ================= SAVE DATA =================

function saveProducts() {
    localStorage.setItem(
        "shopsphereProducts",
        JSON.stringify(products)
    );
}

function saveCart() {
    localStorage.setItem(
        "shopsphereCart",
        JSON.stringify(cart)
    );
}


// ================= DISPLAY PRODUCTS =================

function displayProducts() {

    const container =
        document.getElementById("productContainer");

    const searchValue =
        document.getElementById("searchInput").value
            .toLowerCase();

    const categoryValue =
        document.getElementById("categoryFilter").value;

    container.innerHTML = "";

    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase()
                .includes(searchValue);

        const matchesCategory =
            categoryValue === "all" ||
            product.category === categoryValue;

        return matchesSearch && matchesCategory;
    });


    if (filteredProducts.length === 0) {

        container.innerHTML = `
            <p style="grid-column: 1/-1; text-align:center;">
                No products found.
            </p>
        `;

        return;
    }


    filteredProducts.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <span class="category">
                    ${product.category}
                </span>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="price">
                        ₹${product.price}
                    </span>

                </div>

                <div class="product-actions">

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                    <button
                        class="edit-btn"
                        onclick="editProduct(${product.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${product.id})"
                    >
                        Delete
                    </button>

                </div>

            </div>
        `;


        container.appendChild(card);
    });
}


// ================= SEARCH =================

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        displayProducts
    );


document
    .getElementById("categoryFilter")
    .addEventListener(
        "change",
        displayProducts
    );


// ================= ADD PRODUCT =================

document
    .getElementById("productForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const id =
            document.getElementById("productId").value;

        const name =
            document.getElementById("productName").value.trim();

        const price =
            Number(
                document.getElementById("productPrice").value
            );

        const category =
            document.getElementById("productCategory").value;

        const image =
            document.getElementById("productImage").value.trim();

        const description =
            document
                .getElementById("productDescription")
                .value.trim();


        if (id) {

            // UPDATE PRODUCT

            const index =
                products.findIndex(
                    product => product.id === Number(id)
                );

            if (index !== -1) {

                products[index] = {
                    id: Number(id),
                    name,
                    price,
                    category,
                    image,
                    description
                };
            }

            alert("Product updated successfully!");

        } else {

            // ADD PRODUCT

            const newProduct = {

                id: Date.now(),

                name,
                price,
                category,
                image,
                description
            };


            products.push(newProduct);

            alert("Product added successfully!");
        }


        saveProducts();

        displayProducts();

        resetForm();
    });


// ================= EDIT PRODUCT =================

function editProduct(id) {

    const product =
        products.find(
            product => product.id === id
        );


    if (!product) return;


    document.getElementById("productId").value =
        product.id;

    document.getElementById("productName").value =
        product.name;

    document.getElementById("productPrice").value =
        product.price;

    document.getElementById("productCategory").value =
        product.category;

    document.getElementById("productImage").value =
        product.image;

    document.getElementById("productDescription").value =
        product.description;


    document.getElementById("formTitle").textContent =
        "Edit Product";


    document
        .getElementById("admin")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ================= DELETE PRODUCT =================

function deleteProduct(id) {

    const product =
        products.find(
            product => product.id === id
        );


    if (!product) return;


    const confirmed =
        confirm(
            `Are you sure you want to delete "${product.name}"?`
        );


    if (!confirmed) return;


    products =
        products.filter(
            product => product.id !== id
        );


    saveProducts();

    displayProducts();

    alert("Product deleted successfully!");
}


// ================= RESET FORM =================

function resetForm() {

    document
        .getElementById("productForm")
        .reset();

    document
        .getElementById("productId")
        .value = "";

    document
        .getElementById("formTitle")
        .textContent =
        "Add New Product";
}


document
    .getElementById("cancelEditBtn")
    .addEventListener(
        "click",
        resetForm
    );


// ================= CART =================

function addToCart(id) {

    const product =
        products.find(
            product => product.id === id
        );


    if (!product) return;


    cart.push(product);

    saveCart();

    updateCartCount();

    alert(
        `${product.name} added to cart!`
    );
}


// ================= CART COUNT =================

function updateCartCount() {

    document
        .getElementById("cartCount")
        .textContent = cart.length;
}


// ================= OPEN CART =================

document
    .getElementById("cartBtn")
    .addEventListener(
        "click",
        openCart
    );


function openCart() {

    const modal =
        document.getElementById("cartModal");

    modal.style.display = "flex";

    displayCart();
}


// ================= CLOSE CART =================

function closeCart() {

    document
        .getElementById("cartModal")
        .style.display = "none";
}


// ================= DISPLAY CART =================

function displayCart() {

    const container =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("cartTotal");


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML = `
            <p style="text-align:center;">
                Your cart is empty.
            </p>
        `;

        totalElement.textContent = "₹0";

        return;
    }


    let total = 0;


    cart.forEach((product, index) => {

        total += Number(product.price);


        const item =
            document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ₹${product.price}
                </p>

            </div>

            <button
                class="cart-remove"
                onclick="removeFromCart(${index})"
            >
                Remove
            </button>
        `;


        container.appendChild(item);
    });


    totalElement.textContent =
        `₹${total}`;
}


// ================= REMOVE CART ITEM =================

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    updateCartCount();

    displayCart();
}


// ================= CHECKOUT =================

document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        function() {

            if (cart.length === 0) {

                alert("Your cart is empty.");

                return;
            }


            alert(
                "Checkout successful! Thank you for shopping."
            );


            cart = [];

            saveCart();

            updateCartCount();

            displayCart();
        }
    );


// ================= LOGIN =================

document
    .getElementById("loginBtn")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("loginModal")
                .style.display = "flex";
        }
    );


// ================= CLOSE LOGIN =================

function closeLogin() {

    document
        .getElementById("loginModal")
        .style.display = "none";
}


// ================= LOGIN FORM =================

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value.trim();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            if (!email || !password) {

                alert(
                    "Please enter email and password."
                );

                return;
            }


            localStorage.setItem(
                "shopsphereUser",
                email
            );


            alert(
                `Welcome! Logged in as ${email}`
            );


            closeLogin();

            updateLoginButton();
        }
    );


// ================= LOGIN STATUS =================

function updateLoginButton() {

    const user =
        localStorage.getItem(
            "shopsphereUser"
        );


    const loginBtn =
        document.getElementById("loginBtn");


    if (user) {

        loginBtn.textContent =
            "Logout";

        loginBtn.onclick =
            logout;

    } else {

        loginBtn.textContent =
            "Login";

        loginBtn.onclick =
            function() {

                document
                    .getElementById("loginModal")
                    .style.display = "flex";
            };
    }
}


// ================= LOGOUT =================

function logout() {

    localStorage.removeItem(
        "shopsphereUser"
    );

    alert("You have been logged out.");

    updateLoginButton();
}


// ================= SCROLL =================

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ================= CLOSE MODALS =================

window.addEventListener(
    "click",
    function(event) {

        const cartModal =
            document.getElementById("cartModal");

        const loginModal =
            document.getElementById("loginModal");


        if (event.target === cartModal) {

            closeCart();
        }


        if (event.target === loginModal) {

            closeLogin();
        }
    }
);


// ================= INITIAL LOAD =================

displayProducts();

updateCartCount();

updateLoginButton();