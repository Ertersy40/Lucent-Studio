let lastKnownScrollPosition = 0;
let ticking = false;

const START_SCROLL = window.innerHeight / 4
const MAX_ROTATION = 270;
const MAX_SCROLL = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ) - window.innerHeight - START_SCROLL;

const star = document.querySelector(".Process-hero #slider .star");

const steps = document.querySelectorAll(".steps .step");

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
  if (scrollPos < START_SCROLL) {
    star.style.transform = 'translateY(0px) rotate(0deg)'
    return
  }

  star.style.transform = `translateY(${scrollPos - START_SCROLL}px) rotate(${((scrollPos - START_SCROLL) / MAX_SCROLL) * MAX_ROTATION}deg)`;

  let glowingStep = null; // Variable to track which step should glow

  steps.forEach((step) => {
    if (isInViewport(step)) {
      glowingStep = step; // Mark this step as the one that should glow
    }
  });

  // If we found a step that should glow, remove 'glow' from others and add to the correct one
  if (glowingStep) {
    steps.forEach((step) => step.classList.remove("focus")); // Remove glow from all steps
    glowingStep.classList.add("focus"); // Add glow to the current step
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
