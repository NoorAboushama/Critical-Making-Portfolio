let bloomSize = 60;
let growing = true;
let flash = false;

let quotes = [
  "My only love sprung from my only hate.",
  "These violent delights have violent ends.",
  "Thus with a kiss I die.",
  "I defy you, stars!"
];
let currentQuote = 0;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(24);
  frameRate(30);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(20);

  // Stylized dagger
  drawDagger(300, 160, flash);

  // Animated blooming rose
  if (growing) {
    bloomSize += 0.5;
    if (bloomSize >= 80) growing = false;
  } else {
    bloomSize -= 0.5;
    if (bloomSize <= 60) growing = true;
  }

  drawRose(150, 270, bloomSize);
  fill(0, 200, 0);
  rect(150, 320, 8, 60); // stem

  // Text
  fill(255);
  textSize(24);
  text("Love and violence entwined", width / 2, 50);
  textSize(18);
  text(quotes[currentQuote], width / 2, height - 40);
}

function drawRose(x, y, size) {
  push();
  translate(x, y);
  noStroke();
  for (let i = 0; i < 10; i++) {
    let angle = i * 36;
    let r = size / 2;
    let px = cos(angle) * r;
    let py = sin(angle) * r;
    fill(255, 0, 100, 180);
    ellipse(px, py, size / 2, size / 2);
  }
  fill(255, 0, 120);
  ellipse(0, 0, size / 2, size / 2);
  pop();
}

function drawDagger(x, y, flashing) {
  push();
  translate(x, y);

  // Crossguard
  fill(120);
  rect(0, -20, 80, 10, 5);

  // Grip
  fill(80);
  rect(0, 0, 20, 60, 5);

  // Pommel
  fill(150);
  ellipse(0, 35, 20, 20);

  // Blade with optional flashing effect
  if (flashing && frameCount % 20 < 10) {
    fill(255, 100, 100); // flashing red
  } else {
    fill(200);
  }
  beginShape();
  vertex(-10, -30);
  vertex(10, -30);
  vertex(0, -100);
  endShape(CLOSE);

  pop();
}

function mousePressed() {
  flash = !flash;
  currentQuote = (currentQuote + 1) % quotes.length;
}
