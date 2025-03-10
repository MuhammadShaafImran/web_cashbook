// Handle Customer Autocomplete
document.getElementById("customerName").addEventListener("input", function () {
  const input = this.value.toLowerCase();
  const suggestionsContainer = document.getElementById(
    "customerNameSuggestions"
  );

  if (input.length < 2) {
    suggestionsContainer.style.display = "none";
    return;
  }

  fetch(`/customers/autocomplete/?q=${input}`)
    .then((response) => response.json())
    .then((customers) => {
      suggestionsContainer.innerHTML = "";
      customers.forEach((customer) => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.textContent = customer.name;
        div.addEventListener("click", function () {
          document.getElementById("customerName").value = customer.name;
          document.getElementById("customerEmail").value = customer.email;
          document.getElementById("customerPhone").value = customer.phone;
          document.getElementById("customerAddress").value = customer.address;
          suggestionsContainer.style.display = "none";
        });
        suggestionsContainer.appendChild(div);
      });
      suggestionsContainer.style.display = "block";
    });
});

// Handle Product Autocomplete
function setupProductAutocomplete(productId) {
  const productNameInput = document.getElementById(`productName${productId}`);
  const productPriceInput = document.getElementById(`productPrice${productId}`);
  const suggestionsContainer = document.getElementById(
    `productNameSuggestions${productId}`
  );

  productNameInput.addEventListener("input", function () {
    const input = this.value.toLowerCase();

    if (input.length < 2) {
      suggestionsContainer.style.display = "none";
      return;
    }

    fetch(`/products/autocomplete/?q=${input}`)
      .then((response) => response.json())
      .then((products) => {
        suggestionsContainer.innerHTML = "";
        products.forEach((product) => {
          const div = document.createElement("div");
          div.classList.add("suggestion-item");
          div.textContent = product.name;
          div.dataset.price = product.price;
          div.addEventListener("click", function () {
            productNameInput.value = product.name;
            productPriceInput.value = `$${product.price.toFixed(2)}`;
            suggestionsContainer.style.display = "none";
            updateTotalPrice();
          });
          suggestionsContainer.appendChild(div);
        });
        suggestionsContainer.style.display = "block";
      });
  });
}

// Setup the first product autocomplete
setupProductAutocomplete(1);

// Handle Seller Autocomplete (Now Fetching from API)
document.getElementById("sellerName").addEventListener("input", function () {
  const input = this.value.toLowerCase();
  const suggestionsContainer = document.getElementById("sellerNameSuggestions");

  if (input.length < 2) {
    suggestionsContainer.style.display = "none";
    return;
  }

  fetch(`/sellers/autocomplete/?q=${input}`)
    .then((response) => response.json())
    .then((sellers) => {
      suggestionsContainer.innerHTML = "";
      sellers.forEach((seller) => {
        const div = document.createElement("div");
        div.classList.add("suggestion-item");
        div.textContent = seller.name;
        div.addEventListener("click", function () {
          document.getElementById("sellerName").value = seller.name;
          suggestionsContainer.style.display = "none";
        });
        suggestionsContainer.appendChild(div);
      });
      suggestionsContainer.style.display = "block";
    });
});

// Add new product fields dynamically
let productCounter = 1;
document.getElementById("addProductBtn").addEventListener("click", function () {
  productCounter++;

  const productItem = document.createElement("div");
  productItem.classList.add("product-item");
  productItem.innerHTML = `
        <div class="form-row">
            <div class="form-group autocomplete-container">
                <input type="text" id="productName${productCounter}" class="form-control product-name" placeholder="Enter product name">
                <div class="autocomplete-suggestions" id="productNameSuggestions${productCounter}"></div>
            </div>
            <div class="form-group">
                <input type="number" id="productQty${productCounter}" class="form-control product-qty" placeholder="Enter quantity" min="1" value="1">
            </div>
            <div class="form-group">
                <input type="text" id="productPrice${productCounter}" class="form-control product-price" placeholder="Price" readonly>
            </div>
            <div class="form-group" style="display: flex; align-items: flex-end;">
                <button type="button" class="remove-product-btn" style="background-color: #dc3545; color: white; border: none; border-radius: 5px; padding: 10px;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;

  document.getElementById("productsList").appendChild(productItem);
  setupProductAutocomplete(productCounter);

  // Setup remove button
  const removeBtn = productItem.querySelector(".remove-product-btn");
  removeBtn.addEventListener("click", function () {
    productItem.remove();
    updateTotalPrice();
    updateTotalItems();
  });

  // Setup quantity change event
  const qtyInput = document.getElementById(`productQty${productCounter}`);
  qtyInput.addEventListener("change", updateTotalPrice);

  updateTotalItems();
});

// Update total items count
function updateTotalItems() {
  const totalItems = document.querySelectorAll(".product-item").length;
  document.getElementById("totalItems").textContent = totalItems;
}

// Update total price
function updateTotalPrice() {
  let total = 0;
  const productItems = document.querySelectorAll(".product-item");

  productItems.forEach((item) => {
    const priceInput = item.querySelector(".product-price");
    const qtyInput = item.querySelector(".product-qty");

    if (priceInput.value) {
      const price = parseFloat(priceInput.value.replace("$", ""));
      const qty = parseInt(qtyInput.value) || 1;
      total += price * qty;
    }
  });

  document.getElementById("totalPrice").textContent = total.toFixed(2);
}

// Setup quantity change event for first product
document
  .getElementById("productQty1")
  .addEventListener("change", updateTotalPrice);

// Form submission
document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Order created successfully!");
  // Here you would normally send the data to your backend
});

// Click outside to close autocomplete suggestions
document.addEventListener("click", function (e) {
  if (!e.target.closest(".autocomplete-container")) {
    const suggestions = document.querySelectorAll(".autocomplete-suggestions");
    suggestions.forEach((s) => (s.style.display = "none"));
  }
});

// Function to move to the next step
function move_next() {
    const currentStep = document.querySelector('.step.active');
    const currentFormSection = document.querySelector('.form-section.active');
    const nextStep = currentStep.nextElementSibling;
    const nextFormSection = currentFormSection.nextElementSibling;

    // Check if all inputs in the current section are filled
    const inputs = currentFormSection.querySelectorAll('input');
    const isFormFilled = Array.from(inputs).every(input => input.value.trim() !== "");

    // If form is filled, move to the next step
    if (isFormFilled) {
        currentStep.classList.remove('active');
        nextStep.classList.add('active');
        currentFormSection.classList.remove('active');
        nextFormSection.classList.add('active');
    } else {
        alert("Please fill all fields before moving to the next step.");
    }
}

// Add event listener for the 'Next' button in each section
const nextButtons = document.querySelectorAll('.btn-next-step');
nextButtons.forEach(button => {
    button.addEventListener('click', move_next);
});

