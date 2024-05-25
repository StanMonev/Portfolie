const divider = document.querySelector('.divider');
let isDragging = false;

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
    isDragging = false;
    document.body.style.userSelect = ''; // Re-enable text selection 
});