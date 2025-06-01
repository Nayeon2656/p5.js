//scene1.지하철에서 운세 확인
let canvasW, canvasH;//캔버스 너비와 높이 선언


function setup() {
  setCanvasSize11();
  createCanvas(canvasW, canvasH);
}

function windowResized() {
  setCanvasSize11();
  resizeCanvas(canvasW, canvasH);
}

function setCanvasSize11() {
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

//push, pop사용해서 배경, 캐릭터, 물품 각각 함수 안에 넣어봐요!

function draw() {
  background(220);
  
  //기본 화면
  // 지하철 배경 함수
  // 왼쪽 부분 좌석 사각형 
   quad(
    canvasW * 0.01, canvasH * 0.01,  // 좌상단
    canvasW * 0.15, canvasH * 0.01,  // 우상단
    canvasW * 0.15, canvasH * 0.9,  // 우하단
    canvasW * 0.01, canvasH * 0.9   // 좌하단
  );

  //주변 사람들
  drawSilhouettes1();
  
  // 지하철 역 안내 전광판
  quad( 
  canvasW * 0.35, canvasH * 0.05,  // 좌상단
    canvasW * 0.8, canvasH * 0.05,  // 우상단
    canvasW * 0.8, canvasH * 0.30,  // 우하단
    canvasW * 0.35, canvasH * 0.30   // 좌하단
  );
  
  // 주인공
  drawCharacter1();

  //function1-지하철 배경(3초)
  //zoomBack();
      //배경-만원 지하철을 위에서 바라보는 배경(전체를 넓게 비추고 점차 주인공 핸드폰으로 좁혀가는 배경)
  
  
  //function2-좁혀진 배경 안에서 핸드폰에서 운세 어플을 켬(5초)
  //openApp(); 
      //사물-핸드폰 화면이 어플로 변환됨
      //인물-주인공의 손가락이 어플을 누르는 움직임
  
  //function3-이름과 생년월일을 입력받기
  //getInfo();
      //사물-사용자 정보를 입력받음(이름, 생년월일-빠르게 입력 가능하도록 040220과 같은 방식으로)
  
  //function4-스마트폰 화면에 오늘의 운세를 '나쁨'으로 띄움+친구한테 "지각이야! 어디야?"라고 카톡이 옴
  //useApp();
  
  //function5-주인공의 표정이 어두움
  //beUpset();
     //인물-울상이 되는 주인공의 표정
}
drawCharacter1=function()
{
  //핸드폰 삽입
  push();
  scale(0.12);
  phone();
  pop();
  
  //머리
  push();
  fill(0);
  circle(canvasW * 0.5, canvasH * 0.6, canvasW * 0.13);
  pop();
  
  //정수리
  push();
  stroke(255);
  strokeWeight(2);
  line(canvasW * 0.45, canvasH * 0.6, canvasW * 0.5, canvasH * 0.6);
  pop();
  
  
  //팔 - 기존 캐릭터 코드 사용
  push();
  translate(canvasW * 0.67, canvasH * 0.53);
  rotate(radians(90));

  // 오른쪽 팔 (캐릭터 기준 왼쪽)
  //좌표 재설정 필요
  line(canvasW * 0.667 - (canvasW * 0.67), canvasH * 0.85 - (canvasH * 0.53), // 시작점 - 중심점
       canvasW * 0.65 - (canvasW * 0.67), canvasH * 0.92 - (canvasH * 0.53));  // 팔꿈치 - 중심점
  line(canvasW * 0.65 - (canvasW * 0.67), canvasH * 0.92 - (canvasH * 0.53), // 팔꿈치 - 중심점
       canvasW * 0.69 - (canvasW * 0.67), canvasH * 0.97 - (canvasH * 0.53));  // 손 끝 - 중심점

  // 왼쪽 팔 (캐릭터 기준 오른쪽)
  //좌표 재성정 필요
  line(canvasW * 0.752 - (canvasW * 0.67), canvasH * 0.85 - (canvasH * 0.53), // 시작점 - 중심점
       canvasW * 0.77 - (canvasW * 0.67), canvasH * 0.92 - (canvasH * 0.53));  // 팔꿈치 - 중심점
  line(canvasW * 0.77 - (canvasW * 0.67), canvasH * 0.92 - (canvasH * 0.53), // 팔꿈치 - 중심점
       canvasW * 0.73 - (canvasW * 0.67), canvasH * 0.97 - (canvasH * 0.53));  // 손 끝 - 중심점

  // 손 색상 설정
  fill(255);

  // 오른쪽 손
  circle(canvasW * 0.69 - (canvasW * 0.67), canvasH * 0.97 - (canvasH * 0.53), canvasW * 0.015); // 손 - 중심점
  // 왼쪽 손
  circle(canvasW * 0.725 - (canvasW * 0.67), canvasH * 0.97 - (canvasH * 0.53), canvasW * 0.015); // 손 - 중심점

  pop();
};

  drawSilhouettes1=function() {
  push();
  fill(200); // 실루엣 색
  noStroke();
  for (let y = canvasH * 0.1; y < canvasH+100 ; y += canvasW * 0.14) { // Y축 반복
    for (let x = canvasW * 0.22; x < canvasW+100 ; x += canvasW * 0.28) { // X축 반복
      // 타원(사람 머리) 그리기
      ellipse(x, y, canvasW * 0.13);
    }
  }
  for (let y = canvasH * 0.2; y < canvasH +100 ; y += canvasW * 0.14) { // Y축 반복
    for (let x = canvasW * 0.35; x < canvasW +100 ; x += canvasW * 0.28) { // X축 반복
      // 타원(사람 머리) 그리기
      ellipse(x, y, canvasW * 0.13);
    }
  }
  //의자에 앉은 사람 4명
  for (let y = canvasH * 0.12; y < canvasH * 0.9 ; y += canvasW * 0.125) { // Y축 반복
    for (let x = canvasW * 0.08; x < canvasW * 0.2 ; x += canvasW * 0.24) { // X축 반복
      // 타원(사람 머리) 그리기
      ellipse(x, y, canvasW * 0.12);
    }
  }

  pop();
};

phone=function()
{
  rectMode(CENTER);
  stroke(150);
  strokeWeight(8);
  fill(255);
  rect(canvasW*3.7,canvasH*5,canvasW*0.65,canvasH*0.6,20 * (canvasW / 1600),20 * (canvasW / 1600),20 * (canvasW / 1600),20 * (canvasW / 1600));
  noStroke();
  fill(255,0,0);
  ellipse(canvasW*3.7,canvasH*5,canvasW*0.22,canvasW*0.22);
  //눈
  fill(0);
  circle(canvasW*3.67,canvasH*4.95,canvasW*0.06);
  circle(canvasW*3.67,canvasH*5.09,canvasW*0.06);
  fill(255);
    circle(canvasW*3.6665,canvasH*4.95,canvasW*0.04);
  circle(canvasW*3.6665,canvasH*5.09,canvasW*0.04);
  //입
  noFill();
  stroke(0);
  strokeWeight(5);
  arc(canvasW*3.77, canvasH*4.92 + canvasW*0.06, canvasW*0.11, canvasW*0.09, PI/2, PI*1.5);
  fill(255, 0, 0);
  noStroke();
  textSize(40);
  textStyle(BOLD);

  push();  // 좌표계 저장

  translate(canvasW * 3.9, canvasH * 5.05);  // 텍스트 기준점으로 이동 (텍스트 위치에 따라 수정)
  rotate(PI*1.5);  
  text("최악", 0, 0);  
  pop();  // 원래 좌표계 복구
  fill(0);
  noStroke();
  textSize(25);
  push();
  translate(canvasW*3.5,canvasH*5.2);
  rotate(PI*1.5);
  text("오늘의 운세는",0,0);
  pop();
};