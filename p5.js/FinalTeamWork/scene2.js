//scene2.주인공의 우산이 날아감
let canvasW, canvasH;//캔버스 너비와 높이 선언

function setup() {
  setCanvasSize2();
  createCanvas(canvasW, canvasH);
}

function windowResized() {
  setCanvasSize2();
  resizeCanvas(canvasW, canvasH);
}

function setCanvasSize2() {
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
  //배경-보도블록
  scene2Back();
  
  //캐릭터
  walkingCharacter();
  
  //function1-비오는 배경에 주인공이 우산을 들고 서있음
  //rainFall();
     //배경- 비가 내리고 바람이 강한 바람이 부는 배경
  
  //function2-우산이 날아감
  //flyUmb();
     //인물- 우산을 잡으러 쫓아감
     //사물- 우산 날아감
  
  //function3-배경이 움직이며 주인공 우산이 아이에게 근처에떨어짐
  //fallUmb();
     //배경- 배경이 좌에서 우로 움직임
     //인물- 아이 등장
     //사물- 포물선을 그리며 아이 근처에
  //getUmb();
     //우산을 아이에게로 가져오는 마우스 인터랙션
}

scene2Back=function() //보도블록경배경
{
  quad(
    canvasW * -1, canvasH * 0.71,  // 좌상단
    canvasW * 2, canvasH * 0.71,  // 우상단
    canvasW * 2, canvasH * 0.76,  // 우하단
    canvasW * -1, canvasH * 0.76);   // 좌하단
};

walkingCharacter=function()
{
  rectMode(CENTER);
  
  // 머리카락
  push();
  beginShape();
  fill(0);
  // 왼쪽에서 아래로 (왼쪽 바깥으로 이동)
  vertex(canvasW * 0.11, canvasH * 0.42-canvasH * 0.04);
  vertex(canvasW * 0.11, canvasH * 0.31-canvasH * 0.04); 

  // 반원 (머리 위쪽)
  bezierVertex(
    canvasW * 0.11, canvasH * 0.20-canvasH * 0.04,   // 왼쪽 곡률 제어 더 위쪽
    canvasW * 0.23, canvasH * 0.20-canvasH * 0.04,   // 오른쪽 곡률 제어 더 위쪽
    canvasW * 0.23, canvasH * 0.31-canvasH * 0.04    // 오른쪽으로 내려옴
  );

  // 오른쪽 아래로 직선
  vertex(canvasW * 0.13, canvasH * 0.42-canvasH * 0.04);

  // 아래쪽 곡선으로 왼쪽 끝 연결
  bezierVertex(
    canvasW * 0.23, canvasH * 0.46-canvasH * 0.04,   // 오른쪽 아래 곡률 제어
    canvasW * 0.1, canvasH * 0.46-canvasH * 0.04,   // 왼쪽 아래 곡률 제어
    canvasW * 0.11, canvasH * 0.42-canvasH * 0.04
  );
  endShape();
  pop();
  
  //얼굴
  ellipse(canvasW * 0.17, canvasH * 0.3, canvasW * 0.1, canvasH * 0.2 );
  
  //앞머리
  push();
  fill(0);
  noStroke();
  arc(canvasW * 0.17, canvasH * 0.28, canvasW * 0.12, canvasH * 0.16, PI, 0);

  //새로 생긴 머리
  rect(canvasW * 0.144, canvasH * 0.335,canvasW * 0.047, canvasH * 0.13);
  pop();

  //귀
  arc(canvasW * 0.163, canvasH * 0.32, canvasW*0.02, canvasH*0.03,PI/2,PI*3/2);
  
  //입 
  ellipse(canvasW * 0.205, canvasH * 0.35, canvasW * 0.01875, canvasH * 0.00555);
  
  //눈
  push();
  fill(0);
  ellipse(canvasW * 0.2, canvasH * 0.3, canvasW * 0.006, canvasH * 0.02);//오른른쪽
  pop();
  
  //팔
  push();

  // 왼쪽 팔
  line(canvasW * 0.217, canvasH * 0.43, // 몸통 오른쪽 옆 시작점 
    canvasW * 0.22, canvasH * 0.55);  // 팔꿈치

  // 왼쪽 손
  circle(canvasW * 0.22, canvasH * 0.55, canvasW * 0.015); // 팔 끝에 동그라미 손
  
  //몸
  push();
  rect(canvasW * 0.172, canvasH * 0.5, canvasW*0.09, canvasH * 0.2, 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600));
  pop();

  // 오른쪽 팔
  line(canvasW * 0.177, canvasH * 0.43, // 몸통 왼쪽 옆 시작점
      canvasW * 0.16, canvasH * 0.5);  // 팔꿈치
  line(canvasW * 0.16, canvasH * 0.5, // 팔꿈치
      canvasW * 0.21, canvasH * 0.47);  // 손 끝나는 지점

  // 오른쪽 손
  circle(canvasW * 0.21, canvasH * 0.47, canvasW * 0.015); // 팔 끝에 동그라미 손

  pop();
  
  let speed = 0.001; // 움직이는 속도 조절
  let range = 0.03; // 다리가 움직이는 범위 조절

  push();
  strokeWeight(3);
  
  // 오른쪽 다리
  let rightLegX = canvasW * 0.16 + canvasH * speed * (frameCount % 60); // 60프레임마다 반복
  line(canvasW * 0.16, canvasH * 0.6, rightLegX, canvasH * 0.7);

  // 왼쪽 다리
  let leftLegX = canvasW * 0.18 - canvasH * speed * (frameCount % 60); // 60프레임마다 반복
  line(canvasW * 0.18, canvasH * 0.6, leftLegX, canvasH * 0.7);

  //발
  strokeWeight(1);
  ellipse(rightLegX + range * sin(frameCount * 0.1), canvasH * 0.7, canvasW * 0.025, canvasW * 0.015);
  ellipse( leftLegX - range * sin(frameCount * 0.1), canvasH * 0.7, canvasW * 0.025, canvasW * 0.015);
  pop();
};