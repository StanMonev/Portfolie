async function fetchAnalyticsData() {
    const response = await fetch('/api/analytics');
    return response.json();
}

async function renderCharts() {
    const data = await fetchAnalyticsData();

    const dailyCtx = document.getElementById('dailyChart').getContext('2d');
    new Chart(dailyCtx, {
        type: 'line',
        data: {
            labels: data.dailyVisitors.map(item => item.date),
            datasets: [{
                label: 'Daily Visitors',
                data: data.dailyVisitors.map(item => item.count),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Visitors' } }
            }
        }
    });

    const weeklyCtx = document.getElementById('weeklyChart').getContext('2d');
    new Chart(weeklyCtx, {
        type: 'bar',
        data: {
            labels: data.weeklyVisitors.map(item => item.week),
            datasets: [{
                label: 'Weekly Visitors',
                data: data.weeklyVisitors.map(item => item.count),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'Week' } },
                y: { title: { display: true, text: 'Visitors' } }
            }
        }
    });

    const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
    new Chart(monthlyCtx, {
        type: 'bar',
        data: {
            labels: data.monthlyVisitors.map(item => item.month),
            datasets: [{
                label: 'Monthly Visitors',
                data: data.monthlyVisitors.map(item => item.count),
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'Month' } },
                y: { title: { display: true, text: 'Visitors' } }
            }
        }
    });

    const countryCtx = document.getElementById('countryChart').getContext('2d');
    new Chart(countryCtx, {
        type: 'pie',
        data: {
            labels: data.countryVisitors.map(item => item.country),
            datasets: [{
                label: 'Visitors by Country',
                data: data.countryVisitors.map(item => item.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}

function redirectToResumeEditor() {
    window.location.href = "/admin/resume_editor";
}

function logout() {
    window.location.href = "/logout";
}

document.addEventListener('DOMContentLoaded', () => {
    renderCharts();
});
