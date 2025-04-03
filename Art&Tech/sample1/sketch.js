function setup() {
    createCanvas(400, 400);
    background(220);
  }
  
  function draw() {
    // draw() 함수는 빈 상태로 유지
  }
  
  function mousePressed() {
    fill(255, 0, 0); // 빨간색
    ellipse(mouseX, mouseY, 50, 50);
  }