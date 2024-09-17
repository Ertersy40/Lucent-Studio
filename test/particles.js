var canvas = document.querySelector("#scene"),
    ctx = canvas.getContext("2d"),
    particles = [],
    amount = 0,
    mouse = { x: 0, y: 0 },
    radius = 1;

var colors = ["#feffcc"];

var ww = canvas.width = window.innerWidth;
var wh = canvas.height = window.innerHeight;

// Adjustable variables
var particleDensity = 0.1;         // Particles per pixel squared
var fontSize = wh / 100;               // Font size relative to screen height
var frictionMin = 0.94;               // Minimum friction value
var frictionMax = 0.985;              // Maximum friction value
var particleSpeed = 5;                // Initial particle speed
var shadowBlur = 20;                  // Glow effect size
var interactionRadius = wh / 20;      // Mouse interaction radius

function Particle(x, y, particleRadius) {
  this.x = Math.random() * ww;
  this.y = Math.random() * wh;
  this.dest = {
    x: x,
    y: y
  };
  this.r = particleRadius;
  this.vx = (Math.random() - 0.5) * particleSpeed;
  this.vy = (Math.random() - 0.5) * particleSpeed;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random() * (frictionMax - frictionMin) + frictionMin;
  this.color = colors[0];
}

Particle.prototype.render = function () {
  // Physics calculations
  this.accX = (this.dest.x - this.x) / 1000;
  this.accY = (this.dest.y - this.y) / 1000;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;

  this.x += this.vx;
  this.y += this.vy;

  // Set shadow properties for the glow effect
  ctx.shadowColor = this.color; // Shadow color matches particle color
  ctx.shadowBlur = shadowBlur;  // Adjust for more or less glow
  ctx.shadowOffsetX = 0;        // No horizontal offset
  ctx.shadowOffsetY = 0;        // No vertical offset

  // Draw the particle
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();

  // Mouse interaction logic
  var a = this.x - mouse.x;
  var b = this.y - mouse.y;
  var distance = Math.sqrt(a * a + b * b);
  if (distance < interactionRadius) {
    this.accX = (this.x - mouse.x) / 100;
    this.accY = (this.y - mouse.y) / 100;
    this.vx += this.accX;
    this.vy += this.accY;
  }
};

function onMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}

function onTouchEnd(e) {
  mouse.x = -9999;
  mouse.y = -9999;
}

function initScene() {
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold " + fontSize + "em sans-serif"; // Size of the font
  ctx.textAlign = "center";
  ctx.fillText("✦", ww / 2 + ww / 4, wh / 2); // Placement of the font

  var data = ctx.getImageData(0, 0, ww, wh).data;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "screen";

  particles = [];

  // Calculate total number of particles based on desired density
  var totalParticles = Math.round(ww * wh * particleDensity);

  // Ensure totalParticles is at least 1 to prevent division by zero
  totalParticles = Math.max(totalParticles, 1);

  // Calculate the step size for looping over pixels
  var step = Math.sqrt((ww * wh) / totalParticles);

  // Particle radius can be adjusted here or kept constant
  var particleRadius = step* 1.2; // Adjust particle size based on step

  for (var i = 0; i < ww; i += step) {
    for (var j = 0; j < wh; j += step) {
      var idx = (Math.floor(i) + Math.floor(j) * ww) * 4 + 3;
      if (data[idx] > 150) {
        particles.push(new Particle(i, j, particleRadius));
      }
    }
  }
  amount = particles.length;
}

function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < amount; i++) {
    particles[i].render();
  }
}

window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
initScene();
requestAnimationFrame(render);
