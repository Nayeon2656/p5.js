//scene3.버스에서 졸다가 늦게 내림
let canvasW, canvasH;//캔버스 너비와 높이 선언
let startTime;

function setup() {
  setCanvasSize3();
  createCanvas(canvasW, canvasH);
  startTime = millis();
}

function windowResized() {
  setCanvasSize3();
  resizeCanvas(canvasW, canvasH);
}

function setCanvasSize3() {
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
  scene3Back(); //안에 주인공 기본 위치 함수 들어감
  
  //function1-버스에서 졸고있는 주인공
  sleepInBus();
     //배경-버스에서 주인공 자리를 주로 잡고 창문으로 바깥 배경들이 지나감
     //인물-꾸벅꾸벅 졸고 있음
  
  //function2-깜짝 놀라 일어남
  //wakeUp();
     //배경-function1과 같은 배경
     //인물- 깜짝 놀라 일어남
  
  //function3-급하게 하차벨을 누르는 마우스 인터랙션
  //pressBell();
     //배경-버스 벨 부분 창틀
     //인물-하차벨을 누르는 손
     //사물-마우스 인터랙션과 이로 인한 색상 변화
}

scene3Back=function()//배경
{
  line(canvasW * 0.1, canvasH * -0.11,
       canvasW * 1, canvasH * 0.05); // 구도 선 1 (위부터)
  line(canvasW * 0, canvasH * 0.03,
       canvasW * 1, canvasH * 0.23); // 구도 선 2
  line(canvasW * 0, canvasH * 0.05,
       canvasW * 1, canvasH * 0.25); // 구도 선 3
  line(canvasW * 0, canvasH * 0.95,
       canvasW * 1, canvasH * 0.53); // 구도 선 4
  
    quad(
    canvasW * 0, canvasH * 0.12,  // 좌상단
    canvasW * 0.37, canvasH * 0.2,  // 우상단
    canvasW * 0.37, canvasH * 0.8,  // 우하단
    canvasW * 0, canvasH * 0.95);   // 좌하단 창문 1
  
      quad(
    canvasW * 0.45, canvasH * 0.21,  // 좌상단
    canvasW * 0.75, canvasH * 0.27,  // 우상단
    canvasW * 0.75, canvasH * 0.64,  // 우하단
    canvasW * 0.45, canvasH * 0.76);  // 좌하단 창문 2
  
      quad(
    canvasW * 0.8, canvasH * 0.28,  // 좌상단
    canvasW * 0.98, canvasH * 0.315,  // 우상단
    canvasW * 0.98, canvasH * 0.52,  // 우하단
    canvasW * 0.8, canvasH * 0.6);   // 좌하단 창문 3

  
   quad(
    canvasW * 0.9, canvasH * 0.49,  // 좌상단
    canvasW * 1, canvasH * 0.49,  // 우상단
    canvasW * 1, canvasH * 0.73,  // 우하단
    canvasW * 0.9, canvasH * 0.73);   // 좌하단. 맨 뒤 좌석
  
    quad(
    canvasW * 0.9, canvasH * 0.73,  // 좌상단
    canvasW * 1, canvasH * 0.73,  // 우상단
    canvasW * 1, canvasH * 0.78,  // 우하단
    canvasW * 0.9, canvasH * 0.78);   // 좌하단. 맨뒤 좌석 쿠션
  
  
    quad(
    canvasW * 0.55, canvasH * 0.58,  // 좌상단
    canvasW * 0.74, canvasH * 0.58,  // 우상단
    canvasW * 0.74, canvasH * 0.86,  // 우하단
    canvasW * 0.55, canvasH * 0.86);   // 좌하단. 주인공 좌석
    quad(
    canvasW * 0.74, canvasH * 0.58,  // 좌상단
    canvasW * 0.93, canvasH * 0.58,  // 우상단
    canvasW * 0.93, canvasH * 0.86,  // 우하단
    canvasW * 0.74, canvasH * 0.86);   // 좌하단. 주인공 좌석 옆
  
  quad(
    canvasW * 0.55, canvasH * 0.86,  // 좌상단
    canvasW * 0.93, canvasH * 0.86,  // 우상단
    canvasW * 0.89, canvasH * 0.93,  // 우하단
    canvasW * 0.55, canvasH * 0.93);   // 좌하단. 주인공 좌석 쿠션
  
  sleepCharacter();//주인공 
  
  quad(
    canvasW * 0.25, canvasH * 0.75,  // 좌상단
    canvasW * 0.44, canvasH * 0.75,  // 우상단
    canvasW * 0.44, canvasH * 0.99,  // 우하단
    canvasW * 0.25, canvasH * 0.99);   // 좌하단. 맨 앞쪽 왼쪽 좌석
  quad(
    canvasW * 0.44, canvasH * 0.75,  // 좌상단
    canvasW * 0.63, canvasH * 0.75,  // 우상단
    canvasW * 0.63, canvasH * 0.99,  // 우하단
    canvasW * 0.44, canvasH * 0.99);   // 좌하단. 맨 앞쪽 오른쪽 좌석
};

sleepCharacter=function()//주인공 
{
  rectMode(CENTER);
  
  // 머리카락
  push();
  beginShape();
  fill(0);
  // 왼쪽에서 아래로 (왼쪽 바깥으로 이동)
  vertex(canvasW * 0.59, canvasH * 0.68-canvasH * 0.04);
  vertex(canvasW * 0.59, canvasH * 0.57-canvasH * 0.04); 

  // 반원 (머리 위쪽)
  bezierVertex(
    canvasW * 0.59, canvasH * 0.46-canvasH * 0.04,   // 왼쪽 곡률 제어 더 위쪽
    canvasW * 0.71, canvasH * 0.46-canvasH * 0.04,   // 오른쪽 곡률 제어 더 위쪽
    canvasW * 0.71, canvasH * 0.57-canvasH * 0.04    // 오른쪽으로 내려옴
  );

  // 오른쪽 아래로 직선
  vertex(canvasW * 0.71, canvasH * 0.68-canvasH * 0.04);

  // 아래쪽 곡선으로 왼쪽 끝 연결
  bezierVertex(
    canvasW * 0.71, canvasH * 0.72-canvasH * 0.04,   // 오른쪽 아래 곡률 제어
    canvasW * 0.59, canvasH * 0.72-canvasH * 0.04,   // 왼쪽 아래 곡률 제어
    canvasW * 0.59, canvasH * 0.68-canvasH * 0.04
  );
  endShape();
  pop();
  
  //몸
  push();
  rect(canvasW * 0.652, canvasH * 0.77, canvasW*0.09, canvasH * 0.2, 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600));
  pop();
  
  //얼굴
  ellipse(canvasW * 0.65, canvasH * 0.56, canvasW * 0.1, canvasH * 0.2 );
  
  //앞머리 - sleepEyeBus에서 움직임 부여

  //입 - sleepEyeBus에서 움직임 부여
  
  //눈 - sleepEyeBus에서 움직임 부여
  
  //팔
  push();
  // 오른쪽 팔
  line(canvasW * 0.607, canvasH * 0.69, // 몸통 왼쪽 옆 시작점
       canvasW * 0.59, canvasH * 0.76);  // 팔꿈치
  line(canvasW * 0.59, canvasH * 0.76, // 팔꿈치
       canvasW * 0.63, canvasH * 0.81);  // 손 끝나는 지점

  // 왼쪽 팔
  line(canvasW * 0.697, canvasH * 0.69, // 몸통 오른쪽 옆 시작점 
       canvasW * 0.71, canvasH * 0.76);  // 팔꿈치
  line(canvasW * 0.71, canvasH * 0.76, // 팔꿈치
       canvasW * 0.67, canvasH * 0.81);  // 손 끝나는 지점

  // 오른쪽 손
  circle(canvasW * 0.63, canvasH * 0.81, canvasW * 0.015); // 팔 끝에 동그라미 손
  // 왼쪽 손
  circle(canvasW * 0.665, canvasH * 0.81, canvasW * 0.015); // 팔 끝에 동그라미 손
  pop();
  
  //다리
  push();
  strokeWeight(3);
  line(canvasW * 0.67, canvasH * 0.87, canvasW * 0.63, canvasH * 0.93);
  pop();
};

sleepInBus=function()// 꾸벅꾸벅 조는 눈 
{ 
  //눈 깜빡 거리기
  push();
  fill(0);
  let currentTime = millis(); // 현재 시간 가져오기
  let elapsedTime = currentTime - startTime;  // 경과 시간 계산

  if (elapsedTime > 1500 && elapsedTime < 2000 || elapsedTime > 4500 && elapsedTime < 5000) { // 1.5~2초, 4.5~5초에 잠깐씩 깸 
    //눈
     ellipse(canvasW * 0.63, canvasH * 0.56, canvasW * 0.006, canvasH * 0.02); // 오른쪽
     ellipse(canvasW * 0.66, canvasH * 0.56, canvasW * 0.006, canvasH * 0.02); // 왼쪽
    //입 
     ellipse(canvasW * 0.647, canvasH * 0.61, canvasW * 0.01875, canvasH * 0.005);
    //앞머리
    push();
    fill(0);
    noStroke();
    arc(canvasW * 0.65, canvasH * 0.54, canvasW * 0.1, canvasH * 0.16, PI, 0);
    pop();
  
  }
  else if(elapsedTime<1500 || elapsedTime>2000 && elapsedTime<5000) { // 나머지
    //눈
     strokeWeight(3); // 선 굵기
     line(canvasW * 0.63, canvasH * 0.56 + canvasH * 0.0001 * frameCount, canvasW * 0.636, canvasH * 0.56 + canvasH * 0.0001 * frameCount); // 오른쪽
     line(canvasW * 0.66, canvasH * 0.56 + canvasH * 0.0001 * frameCount, canvasW * 0.666, canvasH * 0.56 + canvasH * 0.0001 * frameCount); // 왼쪽
    //입 
    ellipse(canvasW * 0.647, canvasH * 0.61+ canvasH * 0.0001 * frameCount, canvasW * 0.01875, canvasH * 0.002);
    //앞머리
    push();
    fill(0);
    noStroke();
    arc(canvasW * 0.65, canvasH * 0.54 + canvasH * 0.0001 * frameCount, canvasW * 0.1, canvasH * 0.17+ canvasH * 0.0002 * frameCount, PI, 0);
    pop();
  }
  else {  //졸다가 놀란 표정
    push();
    noFill();
    //눈
     ellipse(canvasW * 0.63, canvasH * 0.56, canvasW * 0.006, canvasH * 0.02); // 오른쪽
     ellipse(canvasW * 0.66, canvasH * 0.56, canvasW * 0.006, canvasH * 0.02); // 왼쪽
    //입 
     ellipse(canvasW * 0.647, canvasH * 0.61, canvasW * 0.018, canvasH * 0.02);
    pop();
    //앞머리
    push();
    fill(0);
    noStroke();
    arc(canvasW * 0.65, canvasH * 0.54, canvasW * 0.1, canvasH * 0.16, PI, 0);
    pop();
  }
  pop();
};