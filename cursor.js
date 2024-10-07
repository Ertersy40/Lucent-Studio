// Select the autoscroll container and the custom cursor element
const autoScroll = document.querySelector('.autoScroll');
const customCursor = document.getElementById('customCursor');

// Function to update the position of the custom cursor
function updateCursorPosition(e) {
  customCursor.style.left = e.clientX + 'px';
  customCursor.style.top = e.clientY + 'px';
}

// Show custom cursor and hide default cursor when entering autoscroll
autoScroll.addEventListener('mouseenter', () => {
  customCursor.style.display = 'flex';
  document.body.style.cursor = 'none';
});

// Hide custom cursor when leaving autoscroll
autoScroll.addEventListener('mouseleave', () => {
  customCursor.style.display = 'none';
  document.body.style.cursor = 'auto';
});

// Update custom cursor position when moving within autoscroll
autoScroll.addEventListener('mousemove', updateCursorPosition);

// Navigate to /about when clicking within the autoscroll area
autoScroll.addEventListener('click', () => {
  window.location.href = '/people';
});
