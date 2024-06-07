const divider = document.querySelector('.divider');
let isDragging = false;

// Function to set initial widths based on saved values or default to middle
function setInitialWidths() {
    const container = divider.parentNode;
    const leftPanel = container.querySelector('.left');
    const rightPanel = container.querySelector('.right');
    const savedLeftWidth = localStorage.getItem('leftPanelWidth');
    const savedRightWidth = localStorage.getItem('rightPanelWidth');
    const containerWidth = container.clientWidth;

    if (savedLeftWidth && savedRightWidth) {
        leftPanel.style.width = savedLeftWidth;
        rightPanel.style.width = savedRightWidth;
    } else {
        const middleWidth = containerWidth / 2;
        leftPanel.style.width = middleWidth;
        rightPanel.style.width = middleWidth;
    }
}

// Set the initial widths when the page loads
setInitialWidths();

divider.addEventListener('mousedown', (e) => {
    isDragging = true;
    document.body.style.userSelect = 'none'; // Prevent text selection while dragging
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const container = divider.parentNode;
    const leftPanel = container.querySelector('.left');
    const rightPanel = container.querySelector('.right');

    let newLeftWidth = e.clientX - container.offsetLeft;

    // Ensure panels don't shrink beyond a minimum width
    if (newLeftWidth > 100 && newLeftWidth < container.clientWidth - 100) {
        leftPanel.style.width = newLeftWidth + 'px';
        rightPanel.style.width = (container.clientWidth - newLeftWidth) + 'px';
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        const container = divider.parentNode;
        const leftPanel = container.querySelector('.left');
        const rightPanel = container.querySelector('.right');

        // Save the current widths to local storage
        localStorage.setItem('leftPanelWidth', leftPanel.style.width);
        localStorage.setItem('rightPanelWidth', rightPanel.style.width);
    }
    isDragging = false;
    document.body.style.userSelect = ''; // Re-enable text selection
});
