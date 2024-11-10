let lastKnownScrollPosition = 0;
let ticking = false;

const START_SCROLL = 706 - window.innerHeight / 2 + 160 / 2;
const MAX_ROTATION = 270;
const MAX_SCROLL = Math.max(
  document.body.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.clientHeight,
  document.documentElement.scrollHeight,
  document.documentElement.offsetHeight
) - window.innerHeight;

const star = document.querySelector(".Process-hero #slider .star");

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

function doSomething(scrollPos) {
  console.log(scrollPos, '/', START_SCROLL)
  if (scrollPos < START_SCROLL) {
    star.classList.remove("active")
    star.style.transform = 'translateY(0px) rotate(0deg)';
    return;
  }

  star.classList.add("active")

  star.style.transform = `rotate(${((scrollPos - START_SCROLL) / (MAX_SCROLL - START_SCROLL)) * MAX_ROTATION}deg)`;

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
      doSomething(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});
