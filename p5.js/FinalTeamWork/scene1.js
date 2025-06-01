let canvasW, canvasH;//캔버스 너비와 높이 선언

function setup() {
  setCanvasSize1();
  createCanvas(canvasW, canvasH);
}

function windowResized() {
  setCanvasSize1();
  resizeCanvas(canvasW, canvasH);
}

function setCanvasSize1() {
  if (windowWidth / windowHeight > 16 / 9) {
    // 창이 너무 넓으면: 높이를 기준으로 너비 계산
    canvasH = windowHeight;
    canvasW = canvasH * (16 / 9);
  } else {
    // 창이 너무 좁으면: 너비를 기준으로 높이 계산
    canvasW = windowWidth;
    canvasH = canvasW * (9 / 16);
  }
}

function draw() {
  background(220);
  
  //기본 배경
    // 지하철 게이트 (왼쪽)
    quad(
    0, canvasH * 0.1,  // 좌상단
    canvasW * 0.18, canvasH * 0.1,  // 우상단
    canvasW * 0.18, canvasH * 1,  // 우하단
    0, canvasH * 1);   // 좌하단
  
    // 지하철 게이트 창문 (왼쪽)
    quad(
    0, canvasH * 0.15,  // 좌상
    canvasW * 0.15, canvasH * 0.15,  // 우상단
    canvasW * 0.15, canvasH * 0.6,  // 우하단
    0, canvasH * 0.6);   // 좌하단
  
    // 지하철 게이트 (오른쪽)
    quad(
    canvasW * 0.19, canvasH * 0.1,  // 좌상단
    canvasW * 0.41, canvasH * 0.1,  // 우상단
    canvasW * 0.41, canvasH * 1,  // 우하단
    canvasW * 0.19, canvasH * 1);   // 좌하단
  
    // 지하철 게이트 창문 (오른쪽)
    quad(
    canvasW * 0.22, canvasH * 0.15,  // 좌상단
    canvasW * 0.38, canvasH * 0.15,  // 우상단
    canvasW * 0.38, canvasH * 0.6,  // 우하단
    canvasW * 0.22, canvasH * 0.6);   // 좌하단
  
    // 지하철 창문
    quad( 
    canvasW * 0.5, canvasH * 0.1,  // 좌상단
    canvasW * 0.85, canvasH * 0.1,  // 우상단
    canvasW * 0.85, canvasH * 0.7,  // 우하단
    canvasW * 0.5, canvasH * 0.7  );   // 좌하단
  
    //주변 사람들
    drawSilhouettes();
    
    push();
    noFill();
    // 지하철 손잡이 1 (기둥)
    quad(
    canvasW * 0.595, canvasH * 0.1,  // 좌상단
    canvasW * 0.605, canvasH * 0.1,  // 우상단
    canvasW * 0.605, canvasH * 0.2,  // 우하단
    canvasW * 0.595, canvasH * 0.2);   // 좌하단
  
     // 지하철 손잡이 1
    triangle(canvasW * 0.56 , canvasH * 0.28,
          canvasW * 0.64 , canvasH * 0.28,
          canvasW * 0.6 , canvasH * 0.17);
  
    // 지하철 손잡이 2 (기둥)
    quad(
    canvasW * 0.745, canvasH * 0.1,  // 좌상단
    canvasW * 0.755, canvasH * 0.1,  // 우상단
    canvasW * 0.755, canvasH * 0.2,  // 우하단
    canvasW * 0.745, canvasH * 0.2);   // 좌하단
  
    // 지하철 손잡이 2
    triangle(canvasW * 0.71 , canvasH * 0.28,
          canvasW * 0.79 , canvasH * 0.28,
          canvasW * 0.75 , canvasH * 0.17);
    pop();
  
  // 주인공
  push();
  drawCharacter();
  pop();
  
  // 지하철 라인
    quad(
    canvasW * 0.92, 0,  // 좌상단
    canvasW * 0.94, 0,  // 우상단
    canvasW * 0.94, canvasH * 1,  // 우하단
    canvasW * 0.92, canvasH * 1);   // 좌하단
}

drawCharacter=function()
{
  rectMode(CENTER);
  
  // 머리카락
  push();
  beginShape();
  fill(0);
  // 왼쪽에서 아래로 (왼쪽 바깥으로 이동)
  vertex(canvasW * 0.61, canvasH * 0.52-canvasH * 0.04);
  vertex(canvasW * 0.61, canvasH * 0.41-canvasH * 0.04); 

  // 반원 (머리 위쪽)
  bezierVertex(
    canvasW * 0.61, canvasH * 0.30-canvasH * 0.04,   // 왼쪽 곡률 제어 더 위쪽
    canvasW * 0.73, canvasH * 0.30-canvasH * 0.04,   // 오른쪽 곡률 제어 더 위쪽
    canvasW * 0.73, canvasH * 0.41-canvasH * 0.04    // 오른쪽으로 내려옴
  );

  // 오른쪽 아래로 직선
  vertex(canvasW * 0.73, canvasH * 0.52-canvasH * 0.04);

  // 아래쪽 곡선으로 왼쪽 끝 연결
  bezierVertex(
    canvasW * 0.73, canvasH * 0.56-canvasH * 0.04,   // 오른쪽 아래 곡률 제어
    canvasW * 0.61, canvasH * 0.56-canvasH * 0.04,   // 왼쪽 아래 곡률 제어
    canvasW * 0.61, canvasH * 0.52-canvasH * 0.04
  );
  endShape();
  pop();
  
  //몸
  push();
  rect(canvasW * 0.672, canvasH * 0.6, canvasW*0.09, canvasH * 0.2, 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600));
  
  rect(canvasW * 0.672, canvasH * 0.65, canvasW*0.09, canvasH * 0.1); //긴 몸의 아랫부분을 자르기 위해 추가한 부분
  fill(255);
  noStroke();
  rect(canvasW * 0.672, canvasH * 0.63, canvasW*0.088, canvasH * 0.1);
  pop();
  
  //얼굴
  ellipse(canvasW * 0.67, canvasH * 0.4, canvasW * 0.1, canvasH * 0.2 );
  
  //앞머리
  push();
  fill(0);
  noStroke();
  arc(canvasW * 0.67, canvasH * 0.38, canvasW * 0.1, canvasH * 0.16, PI, 0);
  pop();
  
  //입 
  ellipse(canvasW * 0.667, canvasH * 0.45, canvasW * 0.01875, canvasH * 0.00555);
  
  //눈
  push();
  fill(0);
  ellipse(canvasW * 0.65, canvasH * 0.4, canvasW * 0.006, canvasH * 0.02);//오른쪽
  ellipse(canvasW * 0.68, canvasH * 0.4, canvasW * 0.006, canvasH * 0.02);//왼쪽
  pop();
  
  //팔
  push();
  // 오른쪽 팔 (캐릭터 기준 왼쪽) - 몸통 옆에서 나와서 위로 꺾임
  line(canvasW * 0.627, canvasH * 0.53, // 몸통 왼쪽 옆 시작점 (아까와 동일)
       canvasW * 0.61, canvasH * 0.6);  // 팔꿈치(?) 꺾이는 지점 (몸통에 가깝게, 살짝 아래로)
  line(canvasW * 0.61, canvasH * 0.6, // 팔꿈치(?) 지점부터
       canvasW * 0.65, canvasH * 0.65);  // 손 끝나는 지점 (배 근처, 몸통에 가깝게)

  // 왼쪽 팔 (캐릭터 기준 오른쪽) - 몸통 옆에서 나와서 아래로 꺾임
  line(canvasW * 0.717, canvasH * 0.53, // 몸통 오른쪽 옆 시작점 (아까와 동일)
       canvasW * 0.73, canvasH * 0.6);  // 팔꿈치(?) 꺾이는 지점 (몸통에 가깝게, 살짝 아래로)
  line(canvasW * 0.73, canvasH * 0.6, // 팔꿈치(?) 지점부터
       canvasW * 0.69, canvasH * 0.65);  // 손 끝나는 지점 (배 근처, 몸통에 가깝게)

  // 오른쪽 손
  circle(canvasW * 0.65, canvasH * 0.65, canvasW * 0.015); // 팔 끝에 동그라미 손
  // 왼쪽 손
  circle(canvasW * 0.685, canvasH * 0.65, canvasW * 0.015); // 팔 끝에 동그라미 손
  pop();
};

  drawSilhouettes=function() {
  push();
  fill(200); // 실루엣 색
  noStroke();
  //오른쪽 사람
  ellipse(canvasW * 0.79, canvasH * 0.35, canvasW * 0.1, canvasH * 0.2 );
  rect(canvasW * 0.747, canvasH * 0.449, canvasW*0.09, canvasH * 0.25);
  //왼쪽 사람
  ellipse(canvasW * 0.555, canvasH * 0.35, canvasW * 0.1, canvasH * 0.2 );
  rect(canvasW * 0.51, canvasH * 0.449, canvasW*0.09, canvasH * 0.25);
  pop();
};