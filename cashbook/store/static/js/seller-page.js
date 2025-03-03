document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('addSellerModal');
    const addSellerBtn = document.querySelector('.add-seller-btn');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('addSellerForm');

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

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Here you would typically collect the form data and send it to your backend
        const formData = new FormData(form);
        const sellerData = Object.fromEntries(formData);

        // For demonstration, log the data
        console.log('New Seller Data:', sellerData);

        // Close the modal after submission
        closeModal();

        // You would typically add the new seller to the table here
        // addSellerToTable(sellerData);
    });
});