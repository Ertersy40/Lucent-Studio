const starGrid = document.getElementById('star-grid');
const starCount = 20 * 13; // 20 columns, 10 rows

// Create the grid of stars
for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.innerHTML = '✦';
    starGrid.appendChild(star);
}

const stars = document.querySelectorAll('.star');

// Function to calculate the distance between two points
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Function to handle hover glow effect
function handleMouseMove(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    stars.forEach(star => {
        const rect = star.getBoundingClientRect();
        const starX = rect.left + rect.width / 2;
        const starY = rect.top + rect.height / 2;
        const distance = getDistance(mouseX, mouseY, starX, starY);

        // Apply glow effect if the star is within 100px radius of the mouse
        if (distance < 60) {
            star.classList.add('glow');
        } else {
            star.classList.remove('glow');
        }
    });
}

document.addEventListener('mousemove', handleMouseMove);
