// Matter.js library
const { Engine, Render, Runner, Bodies, World } = Matter;

const engine = Engine.create();
engine.world.gravity.y = 0.5; // ↓ slower fall speed

const world = engine.world;

// Setup canvas render
const canvas = document.getElementById("jellyCanvas");
const render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight * 0.8,
    wireframes: false,
    background: "white"
  }
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// Jelly images
const jellyImgs = [
  "https://web-video-resource.gentlemonster.com/assets/stories/24-jelly/2024collection-popup/Jelly01.png",
  "https://web-video-resource.gentlemonster.com/assets/stories/24-jelly/2024collection-popup/Jelly02.png",
  "https://web-video-resource.gentlemonster.com/assets/stories/24-jelly/2024collection-popup/Jelly03.png",
  "https://web-video-resource.gentlemonster.com/assets/stories/24-jelly/2024collection-popup/Jelly04.png",
  "https://web-video-resource.gentlemonster.com/assets/stories/24-jelly/2024collection-popup/Jelly05.png",
  "https://web-video-resource.gentlemonster.com/assets/stories/24-jelly/2024collection-popup/Jelly06.png",
  "https://web-video-resource.gentlemonster.com/assets/stories/24-jelly/2024collection-popup/Jelly07.png",
  "https://web-video-resource.gentlemonster.com/assets/stories/24-jelly/2024collection-popup/Jelly08.png"
];

// Function to create floor
function createFloor() {
  const sectionHeight = window.innerHeight * 0.8;
  return Bodies.rectangle(
    window.innerWidth / 2,
    sectionHeight + 25,
    window.innerWidth,
    50,
    {
      isStatic: true,
      restitution: 0.8, // bounce
      friction: 0.2
    }
  );
}

// Initial floor
let floor = createFloor();
World.add(world, floor);

// Handle resize (canvas + floor)
function handleResize() {
  const sectionHeight = window.innerHeight * 0.8;

  render.canvas.width = window.innerWidth;
  render.canvas.height = sectionHeight;

  World.remove(world, floor);
  floor = createFloor();
  World.add(world, floor);
}

window.addEventListener("resize", handleResize);

// Spawn jelly
function spawnJelly() {
  const img = jellyImgs[Math.floor(Math.random() * jellyImgs.length)];
  const size = 60;

  const randomX = size + Math.random() * (window.innerWidth - size * 2);

  const jelly = Bodies.rectangle(randomX, -30, size, size, {
    restitution: 0.8, // bounce on impact
    friction: 0.2,
    frictionAir: 0.01,
    render: {
      sprite: {
        texture: img,
        xScale: size / 200,
        yScale: size / 200
      }
    }
  });

  World.add(world, jelly);
}

// Drop every 3 seconds
let jellyCount = 0;
const maxJellies = 70;
const dropInterval = setInterval(() => {
  if (jellyCount < maxJellies) {
    spawnJelly();
    jellyCount++;
  } else {
    clearInterval(dropInterval);
  }
}, 3000);
