document.addEventListener('DOMContentLoaded', function() {
    // Product Category Performance Chart
    const growthCtx = document.getElementById('customerGrowthChart').getContext('2d');
    new Chart(growthCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Electronics',
                    data: [1200, 1350, 1450, 1600, 1750, 2000],
                    borderColor: '#2563eb',
                    tension: 0.4
                },
                {
                    label: 'Clothing',
                    data: [800, 950, 1100, 1300, 1450, 1600],
                    borderColor: '#10b981',
                    tension: 0.4
                },
                {
                    label: 'Home & Garden',
                    data: [600, 750, 850, 1000, 1200, 1400],
                    borderColor: '#f59e0b',
                    tension: 0.4
                },
                {
                    label: 'Sports Equipment',
                    data: [400, 500, 700, 850, 1000, 1200],
                    borderColor: '#8b5cf6',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' customers';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Customers'
                    }
                }
            }
        }
    });

    // Customer Segments Spider Chart
    const segmentsCtx = document.getElementById('customerSegmentsChart').getContext('2d');
    new Chart(segmentsCtx, {
        type: 'radar',
        data: {
            labels: [
                'Purchase Frequency',
                'Average Order Value',
                'Customer Loyalty',
                'Support Tickets',
                'Review Score',
                'Return Rate'
            ],
            datasets: [
                {
                    label: 'New Customers',
                    data: [3, 2, 1, 4, 3, 2],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'Regular Customers',
                    data: [4, 3, 4, 3, 4, 3],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'VIP Customers',
                    data: [5, 5, 5, 2, 5, 1],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.2)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 5
                }
            }
        }
    });

    // Customer Journey Funnel Chart
    const funnelCtx = document.getElementById('customerFunnelChart').getContext('2d');
    new Chart(funnelCtx, {
        type: 'bar',
        data: {
            labels: ['Website Visits', 'Product Views', 'Add to Cart', 'Checkout', 'Purchase'],
            datasets: [{
                data: [10000, 7500, 5000, 3000, 2000],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const conversionRate = ((context.raw / 10000) * 100).toFixed(1);
                            return `Count: ${context.raw} (${conversionRate}% conversion)`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Customers'
                    }
                }
            }
        }
    });

    // Customer Churn Risk Analysis Chart
    const churnCtx = document.getElementById('churnRiskChart').getContext('2d');
    new Chart(churnCtx, {
        type: 'bubble',
        data: {
            datasets: [
                {
                    label: 'High Risk',
                    data: [
                        { x: 2, y: 1500, r: 15 },
                        { x: 3, y: 2100, r: 20 },
                        { x: 4, y: 1800, r: 18 }
                    ],
                    backgroundColor: 'rgba(239, 68, 68, 0.6)'
                },
                {
                    label: 'Medium Risk',
                    data: [
                        { x: 5, y: 3200, r: 25 },
                        { x: 6, y: 2800, r: 22 },
                        { x: 7, y: 3500, r: 28 }
                    ],
                    backgroundColor: 'rgba(245, 158, 11, 0.6)'
                },
                {
                    label: 'Low Risk',
                    data: [
                        { x: 8, y: 4500, r: 30 },
                        { x: 9, y: 4200, r: 28 },
                        { x: 10, y: 5000, r: 35 }
                    ],
                    backgroundColor: 'rgba(16, 185, 129, 0.6)'
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return [
                                `Risk Level: ${context.dataset.label}`,
                                `Customer Value: $${context.raw.y}`,
                                `Engagement Score: ${context.raw.x}/10`,
                                `Customer Count: ${context.raw.r * 100}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Engagement Score'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Customer Value ($)'
                    }
                }
            }
        }
    });

    // Event Listeners for Interactivity
    document.querySelector('.segment-filter').addEventListener('change', function(e) {
        // Add filter functionality here
        console.log('Filter changed to:', e.target.value);
    });

    document.querySelector('.view-all-btn').addEventListener('click', function() {
        // Add view all functionality here
        console.log('View all clicked');
    });

    // Update metrics periodically (simulate real-time updates)
    setInterval(function() {
        // Add real-time update functionality here
        console.log('Updating metrics...');
    }, 30000);
});