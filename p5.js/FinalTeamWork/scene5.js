//Scene5.아이가 들고 있는 우산이 자기 것임을 알게되고 뿌듯해하는 주인공
//scene1.지하철에서 운세 확인
let canvasW, canvasH;//캔버스 너비와 높이 선언


function setup() {
  setCanvasSize5();
  createCanvas(canvasW, canvasH);
}

function windowResized() {
  setCanvasSize5();
  resizeCanvas(canvasW, canvasH);
}

function setCanvasSize5() {
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
  
  //배경
  scene5Back();
  
  //function1-아이와 엄마가 멀어지면서 아이가 손에 들고 있는 우산을 발견함
  //findUmb();
     //배경-아이와 엄마가 멀어지는 길
     //인물-주인공의 뒷모습은 멈춰있고, 아이와 엄마가 멀어짐
  
  //characterFunction, frameCount, startScale, endScale, startYOffset, endYOffset
  // 아이 그리기
  goSmall(drawChild, frameCount, 1, 0.6, 0, canvasH * 0.1);

  // 엄마 그리기
  goSmall(childMom, frameCount, 1, 0.6, 0, canvasH * 0.1);

  
  //주인공
  push();
  scale(2);
  Character();
  pop();
     //사물-우산이 빛남
}

scene5Back=function(){
  // 왼쪽 벽면
  quad(0, 0,
       canvasW * 0.35, canvasH * 0.25,
       canvasW * 0.35, canvasH * 0.75,
       0, canvasH);

  // 오른쪽 벽면
  quad(
    canvasW, 0,
    canvasW * 0.65, canvasH * 0.25,
    canvasW * 0.65, canvasH * 0.75,
    canvasW, canvasH);

  // 중앙 기둥
  rect(canvasW * 0.15, canvasH * 0.02, canvasW * 0.1, canvasH * 0.9);
  rect(canvasW * 0.15, canvasH * 0.4, canvasW * 0.1, canvasH * 0.3);


  // 사선 세 줄 (왼쪽 아래 ↗ 오른쪽 위)
  line(canvasW * 0.15, canvasH * 0.47, canvasW * 0.25, canvasH * 0.5);
  line(canvasW * 0.15, canvasH * 0.54, canvasW * 0.25, canvasH * 0.57);
  line(canvasW * 0.15, canvasH * 0.61, canvasW * 0.25, canvasH * 0.64);

};

shakeCharacter=function()
{
  rectMode(CENTER);
  
  // 머리카락
  push();
  beginShape();
  fill(0);
  // 왼쪽에서 아래로 (왼쪽 바깥으로 이동)
  vertex(canvasW * 0.31, canvasH * 0.47-canvasH * 0.04);
  vertex(canvasW * 0.31, canvasH * 0.36-canvasH * 0.04); 

  // 반원 (머리 위쪽)
  bezierVertex(
    canvasW * 0.31, canvasH * 0.25-canvasH * 0.04,   // 왼쪽 곡률 제어 더 위쪽
    canvasW * 0.43, canvasH * 0.25-canvasH * 0.04,   // 오른쪽 곡률 제어 더 위쪽
    canvasW * 0.43, canvasH * 0.36-canvasH * 0.04    // 오른쪽으로 내려옴
  );

  // 오른쪽 아래로 직선
  vertex(canvasW * 0.43, canvasH * 0.47-canvasH * 0.04);

  // 아래쪽 곡선으로 왼쪽 끝 연결
  bezierVertex(
    canvasW * 0.43, canvasH * 0.51-canvasH * 0.04,   // 오른쪽 아래 곡률 제어
    canvasW * 0.31, canvasH * 0.51-canvasH * 0.04,   // 왼쪽 아래 곡률 제어
    canvasW * 0.31, canvasH * 0.47-canvasH * 0.04
  );
  endShape();
  pop();
  
  //몸
  rect(canvasW * 0.372, canvasH * 0.55, canvasW*0.09, canvasH * 0.2, 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600));

  //팔
  //오른쪽 팔
  line(canvasW * 0.327, canvasH * 0.48, // 몸통 오른쪽 옆 시작점 (아까와 동일)
       canvasW * 0.297, canvasH * 0.45);  // 팔꿈치(?) 꺾이는 지점 (몸통에 가깝게, 살짝 아래로)
  let wiperAngle = map(sin(frameCount * 0.05), -1, 1, -PI*3/4, -PI/2); // 와이퍼 각도 (좌우 45도 범위)
drawWiperArm(canvasW * 0.297, canvasH * 0.45, wiperAngle, canvasW * 0.05); // 팔꿈치 중심, 각도, 팔 길이

  // 왼쪽 팔 (캐릭터 기준 오른쪽) - 몸통 옆에서 나와서 아래로 꺾임
  line(canvasW * 0.417, canvasH * 0.48, // 몸통 오른쪽 옆 시작점 (아까와 동일)
       canvasW * 0.43, canvasH * 0.55);  // 팔꿈치(?) 꺾이는 지점 (몸통에 가깝게, 살짝 아래로)
};

function drawWiperArm(x, y, angle, length) {
  push();
  translate(x, y); // 중심점을 (x, y)로 이동
  rotate(angle); // 지정된 각도만큼 회전
  line(0, 0, length, 0); // (0, 0)부터 지정된 길이만큼 선 그리기

  // 팔 끝에 동그라미 손 추가
  let handX = length; // 팔 길이만큼 떨어진 위치에 손 그리기
  let handY = 0;
  circle(handX, handY, canvasW * 0.015); // 손 그리기

  pop();
}

drawChild = function() {
  push();
  translate(canvasW * 0.57, canvasH * 0.69); // 아이 위치 설정
  scale(0.7); // 아이 크기 축소

  // 머리카락
  push();
  fill(0);
  ellipse(0, -canvasH * 0.021, canvasW * 0.083, canvasH * 0.15);
  ellipse(0, 0, canvasW * 0.08, canvasH * 0.12);
  pop();


  // 몸통
  push();
  fill(255);
  rect(-canvasW * 0.033, canvasH * 0.06, canvasW * 0.07, canvasH * 0.2, 5);
  pop();

  // 팔
  stroke(0);
  line(-canvasW * 0.034, canvasH * 0.1, -canvasW * 0.08, canvasH * 0.1); // 오른쪽 팔
  line(canvasW * 0.036, canvasH * 0.1, canvasW * 0.08, canvasH * 0.05); // 왼쪽 팔
  
  //손
  push();
  fill(255);
  ellipse(canvasW * 0.08, canvasH * 0.05, canvasW * 0.01, canvasW * 0.01);  
  pop();


  // 다리
  line(-canvasW * 0.02, canvasH * 0.26, -canvasW * 0.02, canvasH * 0.305); // 오른쪽 다리
  line(canvasW * 0.02, canvasH * 0.26, canvasW * 0.02, canvasH * 0.305); // 왼쪽 다리
  
  //발
  push();
  fill(255);
  ellipse(-canvasW * 0.02, canvasH * 0.306, canvasW * 0.022, canvasW * 0.008);
  ellipse(canvasW * 0.02, canvasH * 0.306, canvasW * 0.022, canvasW * 0.008);  
  pop();

  pop();
};

childMom = function() {
    push();
    translate(canvasW * 0.45, canvasH*0.5);
    scale(1.27); // 엄마 크기 설정 (아이보다 약간 크게)

    // 머리카락
    push();
    fill(0); // 검정색 머리
    ellipse(0, -canvasH * 0.015, canvasW * 0.1, canvasH * 0.16); // 머리 스타일
    ellipse(0, -canvasH * 0.1, canvasW * 0.06, canvasH * 0.06);
    pop();
  
    // 팔
    line(-canvasW * 0.04, canvasH * 0.1, -canvasW * 0.045, canvasH * 0.2); // 오른쪽 팔
    line(canvasW * 0.038, canvasH * 0.1, canvasW * 0.042, canvasH * 0.15); // 왼쪽 팔
    line(canvasW * 0.042, canvasH * 0.15, canvasW * 0.047, canvasH * 0.2); // 왼쪽 팔

    // 손
    push();
    fill(255);
    ellipse(-canvasW * 0.045, canvasH * 0.2, canvasW * 0.012, canvasW * 0.012); // 오른쪽 손
    ellipse(canvasW * 0.047, canvasH * 0.2, canvasW * 0.012, canvasW * 0.012); // 왼쪽 손
    pop();

    // 다리
    push();
    strokeWeight(4);
    line(-canvasW * 0.022, canvasH * 0.26, -canvasW * 0.022, canvasH * 0.31); // 오른쪽 다리
    line(canvasW * 0.022, canvasH * 0.26, canvasW * 0.022, canvasH * 0.31); // 왼쪽 다리
    pop();
  
    // 발
    push();
    fill(255);
    ellipse(-canvasW * 0.022, canvasH * 0.31, canvasW * 0.025, canvasW * 0.009); // 오른쪽 발
    ellipse(canvasW * 0.022, canvasH * 0.31, canvasW * 0.025, canvasW * 0.009); // 왼쪽 발
    pop();
  
    // 몸통
    push();
    fill(255);
    rect(-canvasW * 0.038, canvasH * 0.06, canvasW * 0.075, canvasH * 0.2, 5);
    pop();

 pop();
};

//멀어지는 함수-Chat GPT
function goSmall(characterFunction, frameCount, startScale, endScale, startYOffset, endYOffset) {
  push();
  let limitedFrameCount = min(frameCount, 360);
  //map(변환할 값, 원래 범위 시작 값, 원래 범위 끝 값, 바꿀 범위 시작 값, 바꿀 범위 끝 값)
  let scaleValue = map(limitedFrameCount, 0, 240, startScale, endScale);
  let yOffset = map(limitedFrameCount, 0, 240, startYOffset, endYOffset);
  translate(0+canvasW*limitedFrameCount*0.0007, yOffset);
  scale(scaleValue); // x축 스케일은 1로 고정, y축 스케일만 변경
  characterFunction();
  pop();
}