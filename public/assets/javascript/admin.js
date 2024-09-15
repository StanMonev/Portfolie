/**
 * admin.js
 *
 * This file contains the frontend logic for the admin dashboard. It handles fetching analytics data from the server,
 * rendering various charts using the Chart.js library, and managing user interactions like redirecting to the resume editor
 * or logging out.
 *
 * Key functionalities:
 * - Fetch and render analytics data for daily, weekly, monthly, and country-based visitors.
 * - Provide navigation actions for the resume editor and logout functionalities.
 *
 * This script ensures that the admin dashboard displays relevant data in a visually appealing manner and facilitates easy navigation for the admin.
 */

/**
 * Initializes the admin dashboard by rendering the charts when the DOM is fully loaded.
 * 
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', () => {
    renderCharts();
    fetchAndRenderTable();
    addClickToFilterButton();
});


function addClickToFilterButton(){
    document.getElementById('applyFilter').addEventListener('click', () => {
        const filterIPs = document.getElementById('filterIP').value;
        fetchAndRenderTable(filterIPs);
    });
}


/**
 * Fetches the analytics data from the server.
 * 
 * @returns {Promise<Object>} - A promise that resolves to the analytics data in JSON format.
 */
async function fetchAnalyticsData(url = '/api/analytics') {
    const response = await fetch(url);
    return response.json();
}

/**
 * Renders charts on the admin dashboard using the fetched analytics data.
 * This function creates charts for daily visitors, weekly visitors, monthly visitors, and visitors by country.
 * 
 * @returns {Promise<void>} - A promise that resolves once all charts are rendered.
 */
async function renderCharts() {
    const data = await fetchAnalyticsData();

    // Render daily visitors line chart
    const dailyCtx = document.getElementById('dailyChart').getContext('2d');
    new Chart(dailyCtx, {
        type: 'line',
        data: {
            labels: data.dailyVisitors.toReversed().map(item => formatDate(item.date)),
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

    // Render weekly visitors bar chart
    const weeklyCtx = document.getElementById('weeklyChart').getContext('2d');
    new Chart(weeklyCtx, {
        type: 'bar',
        data: {
            labels: data.weeklyVisitors.map(item => formatDate(item.week)),
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

    // Render monthly visitors bar chart
    const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
    new Chart(monthlyCtx, {
        type: 'bar',
        data: {
            labels: data.monthlyVisitors.map(item => formatDate(item.month)),
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

    // Render visitors by country pie chart
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

/**
 * Redirects the user to the resume editor page.
 * 
 * @returns {void}
 */
function redirectToResumeEditor() {
    window.location.href = "/admin/resume_editor";
}

/**
 * Logs the user out by redirecting them to the logout endpoint.
 * 
 * @returns {void}
 */
function logout() {
    window.location.href = "/logout";
}

/**
 * Creates an emoji out of a country code.
 * 
 * @param {string} countryCode - The code country string
 * @returns {string} The emoji code as a string
 */

function countryCodeToFlagEmoji(countryCode) {
    // Convert the country code (e.g., "US", "GB", etc.) to the corresponding flag emoji
    return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
}



function formatDate(dateString) {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

async function fetchAndRenderTable(filterIPs = '') {
    let url = '/api/analytics';
    if (filterIPs) {
        url += `?filterIPs=${filterIPs}`;
    }
    
    const data = await fetchAnalyticsData(url);

    const tableBody = document.getElementById('visitorsTable').querySelector('tbody');
    tableBody.innerHTML = '';

    data.countryVisitors.forEach(visitor => {
        const row = document.createElement('tr');

        const ipCell = document.createElement('td');
        ipCell.textContent = visitor.ip;
        row.appendChild(ipCell);

        const countryCell = document.createElement('td');
        const flagImg = document.createElement('img');
        flagImg.src = countryCodeToFlagEmoji(visitor.country);
        countryCell.appendChild(flagImg);
        row.appendChild(countryCell);
        
        const countCell = document.createElement('td');
        countCell.textContent = visitor.count;
        row.appendChild(countCell);

        tableBody.appendChild(row);
    });
}
