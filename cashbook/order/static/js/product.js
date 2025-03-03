document.addEventListener('DOMContentLoaded', function () {
    // Modal functionality
    const productModal = document.getElementById('addProductModal');
    const addProductBtn = document.querySelector('.add-product-btn');
    const closeProductBtn = document.getElementById('closeProductModal');
    const cancelProductBtn = document.getElementById('cancelProductBtn');
    const productForm = document.getElementById('addProductForm');

    // Open modal
    addProductBtn.addEventListener('click', () => {
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal function
    const closeProductModal = () => {
        productModal.classList.remove('active');
        document.body.style.overflow = '';
        productForm.reset();
    };

    closeProductBtn.addEventListener('click', closeProductModal);
    cancelProductBtn.addEventListener('click', closeProductModal);

    // Quantity control functionality
    document.querySelectorAll('.quantity-control').forEach(control => {
        const input = control.querySelector('.quantity-input');
        const [decreaseBtn, increaseBtn] = control.querySelectorAll('.quantity-btn');

        decreaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(input.value) || 0;
            if (currentValue > 0) {
                input.value = currentValue - 1;
                updateQuantity(input);
            }
        });

        increaseBtn.addEventListener('click', () => {
            const currentValue = parseInt(input.value) || 0;
            input.value = currentValue + 1;
            updateQuantity(input);
        });

        input.addEventListener('change', () => {
            updateQuantity(input);
        });
    });

    // Update quantity function
    function updateQuantity(input) {
        const quantity = parseInt(input.value) || 0;
        const row = input.closest('tr');
        const statusBadge = row.querySelector('.status-badge');

        // Update status badge based on quantity
        if (quantity === 0) {
            statusBadge.className = 'status-badge out-of-stock';
            statusBadge.textContent = 'Out of Stock';
        } else if (quantity < 10) {
            statusBadge.className = 'status-badge low-stock';
            statusBadge.textContent = 'Low Stock';
        } else {
            statusBadge.className = 'status-badge in-stock';
            statusBadge.textContent = 'In Stock';
        }

        // Here you would typically send an API request to update the quantity
        console.log('Quantity updated:', quantity);
    }

    // Form submission
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Here you would typically send the form data to your backend
        const formData = new FormData(productForm);
        console.log('New Product Data:', Object.fromEntries(formData));

        closeProductModal();
    });

    // Image upload preview
    const imageInput = document.getElementById('productImage');
    const uploadPlaceholder = document.querySelector('.upload-placeholder');

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadPlaceholder.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 200px;">`;
            };
            reader.readAsDataURL(file);
        }
    });
});