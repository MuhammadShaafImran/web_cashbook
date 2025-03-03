document.addEventListener('DOMContentLoaded', function() {
    // Initialize Charts
    initializeCharts();

    // Sort functionality
    const sortButtons = document.querySelectorAll('.th-content i');
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Reset all sort icons
            sortButtons.forEach(btn => {
                btn.className = 'fas fa-sort';
            });
            
            // Update clicked button
            if (this.className.includes('fa-sort')) {
                this.className = 'fas fa-sort-up';
            } else if (this.className.includes('fa-sort-up')) {
                this.className = 'fas fa-sort-down';
            } else {
                this.className = 'fas fa-sort';
            }

            // Sort table data
            const column = this.closest('th').dataset.column;
            const isAscending = this.className.includes('fa-sort-up');
            sortTableData(column, isAscending);
        });
    });

    // Filter functionality
    const filterSelects = document.querySelectorAll('.filter-group select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            applyFilters();
        });
    });

    // Date range filter
    const dateFilter = document.querySelector('.date-filter select');
    dateFilter.addEventListener('change', function() {
        const range = this.value;
        const endDate = new Date();
        let startDate = new Date();

        switch(range) {
            case 'today':
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'week':
                startDate.setDate(startDate.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            case 'quarter':
                startDate.setMonth(startDate.getMonth() - 3);
                break;
            case 'year':
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
        }

        filterByDateRange(startDate, endDate);
        updateCharts(startDate, endDate);
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar');
    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase();
        filterTableBySearch(searchTerm);
    }, 300));

    // Segment filter functionality
    const segmentFilter = document.querySelector('.segment-filter');
    segmentFilter.addEventListener('change', function() {
        filterBySegment(this.value);
    });
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function sortTableData(column, isAscending) {
    const tbody = document.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        let aValue = a.querySelector(`td[data-column="${column}"]`).textContent;
        let bValue = b.querySelector(`td[data-column="${column}"]`).textContent;

        // Handle numeric values
        if (!isNaN(aValue)) {
            aValue = parseFloat(aValue);
            bValue = parseFloat(bValue);
        }

        if (isAscending) {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}

function applyFilters() {
    const filters = {};
    document.querySelectorAll('.filter-group select').forEach(select => {
        filters[select.name] = select.value;
    });

    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        let showRow = true;
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== 'all') {
                const cellValue = row.querySelector(`td[data-${key}]`).dataset[key];
                if (cellValue !== value) showRow = false;
            }
        });
        row.style.display = showRow ? '' : 'none';
    });
}

function filterByDateRange(startDate, endDate) {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const dateStr = row.querySelector('.activity-time').textContent;
        const rowDate = new Date(dateStr);
        row.style.display = (rowDate >= startDate && rowDate <= endDate) ? '' : 'none';
    });
}

function filterTableBySearch(searchTerm) {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function filterBySegment(segment) {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const rowSegment = row.querySelector('.badge').textContent;
        row.style.display = (segment === 'All Segments' || rowSegment === segment) ? '' : 'none';
    });
}

function initializeCharts() {
    // Product Category Performance Chart
    new Chart(document.getElementById('customerGrowthChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Electronics',
                data: [65, 59, 80, 81, 56, 55],
                borderColor: '#4F46E5'
            }, {
                label: 'Clothing',
                data: [28, 48, 40, 19, 86, 27],
                borderColor: '#10B981'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Customer Churn Risk Chart
    new Chart(document.getElementById('churnRiskChart').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Low Risk', 'Medium Risk', 'High Risk'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: ['#10B981', '#F59E0B', '#EF4444']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Initialize other charts similarly...
}

function updateCharts(startDate, endDate) {
    // Update charts based on date range
    // This would typically involve fetching new data and updating the charts
    console.log('Updating charts for date range:', startDate, 'to', endDate);
}