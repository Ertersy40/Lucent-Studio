let lastKnownScrollPosition = 0;
let ticking = false;

const functionality = document.querySelector('.Process-hero')
// const introHeight = functionality.scrollHeight
const style =  functionality.currentStyle || window.getComputedStyle(functionality)

const star = document.querySelector(".Process-hero #slider .star");

const starStyle = star.currentStyle || window.getComputedStyle(star)


// console.log(starStyle.height)

const START_SCROLL = 120
// const START_SCROLL = (
//     parseInt(style.marginTop) // calc(var(--nav-height) - 1px); == 105px
//     + (260 
//     + - window.innerHeight 
//     / 2 
//     + 160 
//     / 2)
//   );
const MAX_ROTATION = 270;

let max_scroll = parseInt((document.querySelector('.Process-hero #slider').currentStyle || window.getComputedStyle(document.querySelector('.Process-hero #slider'))).height.replace('px', '')) - 0

// When screen width changes, change max_scroll:

window.addEventListener("resize", function(event) {
  console.log("Screen size changed");
  const slider = document.querySelector('.Process-hero #slider');
  max_scroll = parseFloat(window.getComputedStyle(slider).height);
  console.log("Max scroll updated to ", max_scroll, "px");
  // Re-position the star to ensure it's in the correct spot after resizing
  positionStar(window.scrollY);
});


const steps = document.querySelectorAll(".steps .step");
let currentFocusedStep = null; // Track the currently focused step

// Function to determine if an element's middle is within the viewport range
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const stepMiddle = rect.top + rect.height / 4;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  
  return (
    stepMiddle > viewportHeight * 0 && stepMiddle < viewportHeight * 0.6
  );
}

function positionStar(scrollPos) {
  console.log(scrollPos, '/', max_scroll)
  if (scrollPos < START_SCROLL) {
    star.classList.remove("active")
    star.style.transform = 'translateY(0px) rotate(0deg)';
    return;
  }

  if (scrollPos > max_scroll) {
    star.classList.remove("active")
    star.style.transform = `translateY(${max_scroll - (parseInt(starStyle.height) / 1) - 8}px) rotate(0deg)`;
    return
  }
  star.classList.add("active")

  star.style.transform = `rotate(${((scrollPos - START_SCROLL) / (max_scroll - START_SCROLL)) * MAX_ROTATION}deg)`;

  let glowingStep = null; // Variable to track which step should glow

  steps.forEach((step) => {
    if (isInViewport(step)) {
      glowingStep = step; // Mark this step as the one that should glow
    }
  });

  // If a new step should glow, update the focused step
  if (glowingStep && glowingStep !== currentFocusedStep) {
    steps.forEach((step) => step.classList.remove("focus")); // Remove glow from all steps
    glowingStep.classList.add("focus"); // Add glow to the new step
    currentFocusedStep = glowingStep; // Update the current focused step
  }
}

document.addEventListener("scroll", () => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      positionStar(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});

positionStar(window.scrollY)