const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const salesData = [4000, 5000, 4600, 6000, 5400, 7000];
const profitData = [2000, 2500, 2300, 3000, 2700, 3500];

// Sales Overview Chart
const salesChart = new Chart(document.getElementById('salesChart'), {
    type: 'line',
    data: {
        labels: monthLabels,
        datasets: [{
            label: 'Sales',
            data: salesData,
            borderColor: '#2563eb',
            tension: 0.4,
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

// Profit/Loss Chart
const profitChart = new Chart(document.getElementById('profitChart'), {
    type: 'bar',
    data: {
        labels: monthLabels,
        datasets: [{
            label: 'Profit',
            data: profitData,
            backgroundColor: '#10b981'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

// Category Distribution Chart
const categoryChart = new Chart(document.getElementById('categoryChart'), {
    type: 'doughnut',
    data: {
        labels: ['Electronics', 'Clothing', 'Books', 'Home'],
        datasets: [{
            data: [400, 300, 200, 278],
            backgroundColor: [
                '#2563eb',
                '#10b981',
                '#f59e0b',
                '#ef4444'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right'
            }
        }
    }
});
// Customer Satisfaction Gauge
const satisfactionGauge = new Chart(document.getElementById('satisfactionGauge'), {
    type: 'doughnut',
    data: {
        labels: ['Satisfied', 'Unsatisfied'],
        datasets: [{
            data: [85, 15], // 85% satisfied, 15% unsatisfied
            backgroundColor: [
                '#10b981', // Green for satisfied
                '#ef4444'  // Red for unsatisfied
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%', // Makes it a gauge
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.label + ': ' + context.raw + '%';
                    }
                }
            }
        }
    }
});
// Regional Sales Distribution Chart
new Chart(document.getElementById('regionalChart'), {
    type: 'radar',
    data: {
        labels: ['North', 'South', 'East', 'West', 'Central'],
        datasets: [{
            label: 'Sales Distribution',
            data: [65, 75, 85, 80, 70],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: '#3b82f6',
            pointBackgroundColor: '#3b82f6'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top'
            }
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});