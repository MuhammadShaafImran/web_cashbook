document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('addSellerModal');
    const addSellerBtn = document.querySelector('.add-seller-btn');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('addSellerForm');
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Open modal
    addSellerBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal functions
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        form.reset();
    };

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside of it
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle Form Submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        fetch('/sellers/add/', {  // Change this URL based on your Django URL pattern
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                addSellerToTable(data.seller);
                closeModal();
            } else {
                alert('Error adding seller: ' + data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // Function to dynamically add a seller row to the table
    function addSellerToTable(seller) {
        const tableBody = document.querySelector('.sellers-table tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${seller.name}</td>
            <td>${seller.email}</td>
            <td>${seller.phone}</td>
            <td>
                <label class="switch" role="switch" aria-checked="${seller.active ? 'true' : 'false'}">
                    <input type="checkbox" ${seller.active ? 'checked' : ''} data-seller-id="${seller.id}">
                    <span class="switch__slider">
                        <span class="switch__handle"></span>
                    </span>
                </label>
            </td>
            <td>${seller.products_count}</td>
            <td>$${seller.total_purchase.toFixed(2)}</td>
            <td>
                <button class="delete-btn" type="button" data-seller-id="${seller.id}">
                    <i class="fas fa-trash" aria-hidden="true" style="color:red; font-size: large;"></i>
                </button>
            </td>
        `;

        // Add event listener for delete button
        row.querySelector('.delete-btn').addEventListener('click', function () {
            deleteSeller(seller.id, row);
        });

        tableBody.appendChild(row);
    }

    // Function to delete a seller
    function deleteSeller(sellerId, row) {
        if (!confirm('Are you sure you want to delete this seller?')) return;

        fetch(`/sellers/delete/${sellerId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                row.remove();
            } else {
                alert('Error deleting seller: ' + data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    }
});
