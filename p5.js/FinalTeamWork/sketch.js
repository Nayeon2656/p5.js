let currentScene = 0;
const sceneDurations = [7000, 3000, 7000, 4000, 6000, 22000, 4000, 3500, 10000]; // 씬별 시간 (ms)

let canvasW, canvasH;
let stage; // 오프닝 단계
let startTime; // 오프닝 시작 시간

function setup() {
  setCanvasSize();
  createCanvas(canvasW, canvasH);
  textAlign(CENTER, CENTER);
  stage = 0; // 오프닝 초기 단계
  startTime = millis(); // 시작 시간 기록

  startSceneTimer();
}

function windowResized() {
  setCanvasSize();
  resizeCanvas(canvasW, canvasH);
}

function setCanvasSize() {
  if (windowWidth / windowHeight > 16 / 9) {
    // 창이 너무 넓으면: 높이를 기준으로 너비 계산
    canvasH = windowHeight;
    canvasW = canvasH * (16 / 9);
  } else {
    // 창이 너무 좁으면: 너비를 기준으로 높이 계산
    canvasW = windowWidth;
    canvasH = canvasW * (9 / 16);
  }
  console.log("currentScene:", currentScene);
}

function draw() {
  background(220);
  switch (currentScene) {
    case 0: drawCreditOpening(); break;
    case 1: drawScene1(); break;
    case 2: drawScene1_1(); break;
    case 3: drawScene2(); break;
    case 4: drawScene3(); break;
    case 5: drawScene4(); break;
    case 6: drawScene5(); break;
    case 7: drawScene5_1(); break;
    case 8: drawCreditEnding(); break;
  }
}

function startSceneTimer() {
    setTimeout(() => {
      currentScene = (currentScene + 1) % sceneDurations.length;
  
      // 씬 시작 시 초기화
      if (currentScene === 0) { // 오프닝 씬 시작 시
        stage = 0;
      } else if (currentScene === 8) { // 크레딧 씬 시작 시
        creditY = canvasH;
      }
  
      startTime = millis(); // 각 씬 시작 시 startTime 초기화
      frameCount = 0; // 🌟 각 씬 시작 시 frameCount 초기화! 🌟
  
      startSceneTimer();
    }, sceneDurations[currentScene]);
  }  

// 씬별 그리기 함수들

//Scene1_Opening Credit
function drawCreditOpening() {
  background(0);

  if (stage === 0) {
    fill(255);
    textSize(canvasH * 0.035); // 캔버스 크기에 따라 글자 크기 조절
    text("Flows\n\n김나연\n이송연\n조윤서", width / 2, height / 2);

    if (millis() - startTime > 3000) {
      stage = 1;
    }

  } else if (stage === 1) {
    let textfade = map(millis() - startTime, 6500, 7000, 255, 0, true);
    fill(255, textfade);
    text("이어지는 불운.\n그 끝에 찾아온 것은 기적이었다.", width / 2, height / 2);
  }
}

//Scene2_Scene1.지하철 타고 있는 주인공 등장
function drawScene1() {
    background(220);
    fill(255);
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

//Scene3_Scene1-1.지하철에서 오늘의 운세를 확인하는 주인공
function drawScene1_1() {
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

//Scene4.Scene2.걷다가 우산이 날라가는 주인공
function drawScene2() {
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

//Scene5.Scene3.버스에서 졸다가 깜짝 놀라 하차 벨을 누르는 주인공
function drawScene3() {
    background(220);
    scene3Back();
    
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

//Scene6.Scene4.버스 정류장에서 우는 아이를 달래고 경찰서로 데려가는 주인공, 엄마를 발견하고 달려가는 아이
function drawScene4() {
    background(220);
    //배경
    scene4Back();

    //function1-버스정류장에서 버스가 지나가고 주인공과 아이가 나타남
    //주인공
    push();
    scale(0.8);
    walkPoliceCharacter();// 주인공 함수 호출

    push();
    cryChild(); // 아이 함수 호출
    pop();
    
    childTears();//아이 눈물 함수 호출
    wonderMom();//아이 엄마 함수 호출
    pop();
    
    //moveBus();
       //배경- 버스정류장
       //인물- 아이와 주인공
       //사물- 버스 움직임(오른쪽에서 왼쪽으로)

    //function2-주인공이 무릎을 굽혀 울고있는 아이와 눈높이를 맞춤
    //meetChild();
       //배경- function1과 같음
       //인물- 주인공이 아이 키에 맞춰 무릎을 굽혀 달래줌

    //function3-배경을 움직이며 파출소로 향함+파출소와 아이 엄마가 나타남
    //moveBack();
       //배경- 좌에서 우로 움직임
       //인물- 아이와 주인공의 팔과 다리가 움직임+파출소 근처에 엄마가 나타남

    //function4-파출소 앞에서 아이가 아이 엄마에게 안김
    //hugMom();
       //배경- 파출소 앞 
       //인물- 엄마가 아이를 안아줌
  }

//Scene7.Scene5.아이와 엄마가 멀어지고 아이의 손에서 자신의 우산을 발견하는 주인공공
function drawScene5() {  //아이와 엄마가 멀어지면서 아이가 손에 들고 있는 우산을 발견함
    background(220);
  
    //배경
    scene5Back();

    //인물-주인공의 뒷모습은 멈춰있고, 아이와 엄마가 멀어짐
    //goSmall(characterFunction, frameCount, startScale, endScale, startYOffset, endYOffset)
    // 아이
    goSmall(drawChild, frameCount, 1, 0.6, 0, canvasH * 0.1);
  
    // 엄마
    goSmall(childMom, frameCount, 1, 0.6, 0, canvasH * 0.1);
  
    //findUmb(); - 우산이 빛남

    //주인공
    push();
    scale(2);
    shakeCharacter();
    pop();
       //사물-우산이 빛남
}

//Scene8.Scene5.1.자신의 불운이 누군가에게 도움이 되었음에 행복을 느끼는 주인공공
function drawScene5_1() {
    
    background(220); // 배경색 설정
    
    //활짝 웃는 주인공
    push();
    scale(3); // 확대해서 그리기
    beHappy();
    pop();
    
}

//Scene9.Ending Credit
function drawCreditEnding() {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(22);
  
    // yStart 변수를 매 프레임마다 초기화하면 안 되니까, 전역 변수로 빼고 관리할게
    if (typeof creditY === 'undefined') {
      creditY = canvasH; // 처음 시작 위치
    }
  
    for (let i = 0; i < credits.length; i++) {
      text(credits[i], canvasW / 2, creditY + i * 50);
    }
  
    creditY -= 1.5; // 크레딧이 위로 올라가게
  }

//1 함수
//주인공 등장
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
  fill(255);
  rect(canvasW * 0.672, canvasH * 0.6, canvasW*0.09, canvasH * 0.2, 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600));
  rect(canvasW * 0.672, canvasH * 0.65, canvasW*0.09, canvasH * 0.1); //긴 몸의 아랫부분을 자르기 위해 추가한 부분
  noStroke();
  rect(canvasW * 0.672, canvasH * 0.63, canvasW*0.088, canvasH * 0.1);
  pop();
  
  //얼굴
  push();
  fill(255);
  ellipse(canvasW * 0.67, canvasH * 0.4, canvasW * 0.1, canvasH * 0.2 );
  pop();

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
  fill(255);
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
//주변 사람들
drawSilhouettes=function() {
  push();
  fill(200); // 실루엣 색
  noStroke();
  //오른쪽 사람
  ellipse(canvasW * 0.79, canvasH * 0.35, canvasW * 0.1, canvasH * 0.2 );
  rect(canvasW * 0.747, canvasH * 0.449, canvasW*0.09, canvasH * 0.25);
  //왼쪽 사람
  ellipse(canvasW * 0.555, canvasH * 0.35, canvasW * 0.1, canvasH * 0.2 );
  rect(canvasW * 0.505, canvasH * 0.449, canvasW*0.1, canvasH * 0.25);
  pop();
};

//1_1 함수
//주인공
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
  stroke(200);
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

//주변 사람들
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

//핸드폰
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

//2 함수
//보도 블록 배경
scene2Back=function()
{
  quad(
    canvasW * -1, canvasH * 0.71,  // 좌상단
    canvasW * 2, canvasH * 0.71,  // 우상단
    canvasW * 2, canvasH * 0.76,  // 우하단
    canvasW * -1, canvasH * 0.76);   // 좌하단
};

//걷고 있는 주인공
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
  push();
  fill(255);
  ellipse(canvasW * 0.17, canvasH * 0.3, canvasW * 0.1, canvasH * 0.2 );
  pop();

  //앞머리
  push();
  fill(0);
  noStroke();
  arc(canvasW * 0.17, canvasH * 0.28, canvasW * 0.12, canvasH * 0.16, PI, 0);

  //새로 생긴 머리
  rect(canvasW * 0.144, canvasH * 0.335,canvasW * 0.047, canvasH * 0.13);
  pop();

  //귀
  push();
  fill(255);
  arc(canvasW * 0.163, canvasH * 0.32, canvasW*0.02, canvasH*0.03,PI/2,PI*3/2);
  pop();

  //입 
  push();
  fill(220);
  ellipse(canvasW * 0.205, canvasH * 0.35, canvasW * 0.01875, canvasH * 0.00555);
  pop();

  //눈
  push();
  fill(0);
  ellipse(canvasW * 0.2, canvasH * 0.3, canvasW * 0.006, canvasH * 0.02);//오른른쪽
  pop();
  
  //팔
  push();
  fill(255);

  // 왼쪽 팔
  line(canvasW * 0.217, canvasH * 0.43, // 몸통 오른쪽 옆 시작점 
    canvasW * 0.22, canvasH * 0.55);  // 팔꿈치

  // 왼쪽 손
  circle(canvasW * 0.22, canvasH * 0.55, canvasW * 0.015); // 팔 끝에 동그라미 손
  pop();

  //몸
  push();
  fill(200);
  rect(canvasW * 0.172, canvasH * 0.5, canvasW*0.09, canvasH * 0.2, 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600));
  pop();

  // 오른쪽 팔
  push();
  fill(255);
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
  fill(255);
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

//3 함수
//배경
scene3Back=function()
{
    push();
     fill(225);
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
 pop();
};

//졸고 있는 주인공
sleepCharacter=function()
{
  push();
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
  push();
  fill(255);
  ellipse(canvasW * 0.65, canvasH * 0.56, canvasW * 0.1, canvasH * 0.2 );
  pop();

  //앞머리 - sleepEyeBus에서 움직임 부여

  //입 - sleepEyeBus에서 움직임 부여
  
  //눈 - sleepEyeBus에서 움직임 부여
  
  //팔
  push();
  fill(255);
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

  pop();
};

//조는 주인공의 눈
sleepInBus=function()
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

//4 함수
//배경
scene4Back = function() {
  push(); // 좌표계 저장

  frameRate(30);
  let xPosSpeed = 0; // x축으로 이동할 방향 초기화
  let finalXPos = 0; // 최종 x 위치를 저장할 변수
  let scene4_startFrame = 150; // 시작 프레임(초당 30 츠레임-5초)
  let scene4_endFrame = 600; // 종료 프레임(x축 이동 시간: 10초)
  
  if (frameCount > scene4_startFrame && frameCount < scene4_endFrame) {
    xPosSpeed = (frameCount - scene4_startFrame) * 2;
    finalXPos = -xPosSpeed;
  } else if (frameCount >= scene4_endFrame) {
    finalXPos = -(scene4_endFrame - scene4_startFrame) * 2;
  } else {
    finalXPos = 0;
  }

  translate(finalXPos, 0);

  //보도 블록
  rectMode(CORNER);
  stroke(0);
  quad(
    canvasW * -1, canvasH * 0.93,  // 좌상단
    canvasW * 9.1, canvasH * 0.93,  // 우상단
    canvasW * 9.1, canvasH * 0.98,  // 우하단
    canvasW * -1, canvasH * 0.98   // 좌하단 보도블럭
  );

  // 3. 정류장 구조물
  rect(canvasW * 0.12, canvasH * 0.43, canvasW * 0.46, canvasH * 0.1); // 뒷받침
  rect(canvasW * 0.12, canvasH * 0.46, canvasW * 0.05, canvasH * 0.47); // 왼쪽 기둥
  rect(canvasW * 0.53, canvasH * 0.46, canvasW * 0.05, canvasH * 0.47); // 오른쪽 기둥
  rect(canvasW * 0.12, canvasH * 0.39, canvasW * 0.46, canvasH * 0.07); // 윗머리판
  rect(canvasW * 0.16, canvasH * 0.29, canvasW * 0.39, canvasH * 0.1); // 광고판

  // 4. 버튼 화살표 (삼각형)
  triangle(canvasW * 0.23, canvasH * 0.34, canvasW * 0.25, canvasH * 0.31, canvasW * 0.25, canvasH * 0.37); // 왼쪽
  triangle(canvasW * 0.45, canvasH * 0.31, canvasW * 0.47, canvasH * 0.34, canvasW * 0.45, canvasH * 0.37); // 왼쪽

  // 5. 안쪽 안내문
  rect(canvasW * 0.19, canvasH * 0.55, canvasW * 0.2, canvasH * 0.08, 5); // 상단 안내문
  rect(canvasW * 0.19, canvasH * 0.65, canvasW * 0.2, canvasH * 0.08, 5); // 하단 안내문

  // 6. 벤치
  rect(canvasW * 0.22, canvasH * 0.83, canvasW * 0.02, canvasH * 0.1); // 왼쪽 다리
  rect(canvasW * 0.46, canvasH * 0.83, canvasW * 0.02, canvasH * 0.1); // 오른쪽 다리
  rect(canvasW * 0.19, canvasH * 0.8, canvasW * 0.32, canvasH * 0.03, 5); // 벤치 상판

  // 7. 오른쪽 기둥과 연결되는 표지판
  rect(canvasW * 0.66 - canvasW * 0.01, canvasH * 0.67, canvasW * 0.025, canvasH * 0.26);
  rect(canvasW * 0.62, canvasH * 0.5, canvasW * 0.08, canvasH * 0.18, 8); // 표지판 상단
  ellipse(canvasW * 0.66, canvasH * 0.58, canvasW * 0.05); // 원형 아이콘

  // 파출소
  rect(canvasW * 1.35, canvasH * 0.17, canvasW * 0.7, canvasH * 0.76); // 건물 본체
  rect(canvasW * 1.55, canvasH * 0.28, canvasW * 0.35, canvasH * 0.65); // 건물 큰 문

  rect(canvasW * 1.65, canvasH * 0.53, canvasW * 0.15, canvasH * 0.4); // 건물 두 번째 문
  rect(canvasW * 1.65, canvasH * 0.53, canvasW * 0.08, canvasH * 0.4); // 건물 두 번째 문
  rect(canvasW * 1.55, canvasH * 0.33, canvasW * 0.35, canvasH * 0.16); // 건물 간판
  rect(canvasW * 1.55, canvasH * 0.35, canvasW * 0.35, canvasH * 0.12); // 건물 간판

  pop(); // 좌표계 복원
};

//주인공 경찰서로 걸어감
walkPoliceCharacter=function()
{
  push();
  rectMode(CENTER);
  
  // 머리카락
  push();
  beginShape();
  fill(0);
  // 왼쪽에서 아래로 (왼쪽 바깥으로 이동)
  vertex(canvasW * 0.11, canvasH * 0.85-canvasH * 0.04);
  vertex(canvasW * 0.11, canvasH * 0.74-canvasH * 0.04); 

  // 반원 (머리 위쪽)
  bezierVertex(
    canvasW * 0.11, canvasH * 0.63-canvasH * 0.04,   // 왼쪽 곡률 제어 더 위쪽
    canvasW * 0.23, canvasH * 0.63-canvasH * 0.04,   // 오른쪽 곡률 제어 더 위쪽
    canvasW * 0.23, canvasH * 0.74-canvasH * 0.04    // 오른쪽으로 내려옴
  );

  // 오른쪽 아래로 직선
  vertex(canvasW * 0.23, canvasH * 0.85-canvasH * 0.04);

  // 아래쪽 곡선으로 왼쪽 끝 연결
  bezierVertex(
    canvasW * 0.23, canvasH * 0.89-canvasH * 0.04,   // 오른쪽 아래 곡률 제어
    canvasW * 0.11, canvasH * 0.89-canvasH * 0.04,   // 왼쪽 아래 곡률 제어
    canvasW * 0.11, canvasH * 0.85-canvasH * 0.04
  );
  endShape();
  pop();
  
  //몸
  push();
  fill(200);
  rect(canvasW * 0.172, canvasH * 0.93, canvasW*0.09, canvasH * 0.2, 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600));
  pop();
  
  //얼굴
  push();
  fill(255);
  ellipse(canvasW * 0.17, canvasH * 0.73, canvasW * 0.1, canvasH * 0.2 );
  pop();

  //앞머리
  push();
  fill(0);
  noStroke();
  arc(canvasW * 0.17, canvasH * 0.71, canvasW * 0.1, canvasH * 0.16, PI, 0);
  pop();
  
  //입 
  ellipse(canvasW * 0.167, canvasH * 0.78, canvasW * 0.01875, canvasH * 0.00555);
  
  //눈
  push();
  fill(0);
  ellipse(canvasW * 0.15, canvasH * 0.73, canvasW * 0.006, canvasH * 0.02);//오른쪽
  ellipse(canvasW * 0.18, canvasH * 0.73, canvasW * 0.006, canvasH * 0.02);//왼쪽
  pop();
  
  //팔
  push();
  // 오른쪽 팔 (캐릭터 기준 왼쪽) - 몸통 옆에서 나와서 위로 꺾임
  line(canvasW * 0.127, canvasH * 0.84, // 몸통 왼쪽 옆 시작점
       canvasW * 0.11, canvasH * 0.91);  // 팔꿈치
  line(canvasW * 0.11, canvasH * 0.91, // 팔꿈치
       canvasW * 0.15, canvasH * 0.96);  // 손 끝나는 지점

  // 왼쪽 팔 (캐릭터 기준 오른쪽) - 몸통 옆에서 나와서 아래로 꺾임
  line(canvasW * 0.217, canvasH * 0.84, // 몸통 오른쪽 옆 시작점 
       canvasW * 0.23, canvasH * 0.91);  // 팔꿈치
  line(canvasW * 0.23, canvasH * 0.91, // 팔꿈치
       canvasW * 0.19, canvasH * 0.96);  // 손 끝나는 지점

  // 오른쪽 손
  circle(canvasW * 0.15, canvasH * 0.96, canvasW * 0.015); // 팔 끝에 동그라미 손
  // 왼쪽 손
  circle(canvasW * 0.185, canvasH * 0.96, canvasW * 0.015); // 팔 끝에 동그라미 손
  pop();
  
  push();
  strokeWeight(3);
  //오른쪽 다리
  line(canvasW * 0.16, canvasH * 1.03, canvasW * 0.16, canvasH * 1.14);
  //왼쪽 다리
  line(canvasW * 0.18, canvasH * 1.03, canvasW * 0.18, canvasH * 1.14);
  
  //발
  strokeWeight(1);
  ellipse(canvasW * 0.155, canvasH * 0.7*1.64, canvasW * 0.025, canvasW * 0.015);
  ellipse(canvasW * 0.185, canvasH * 0.7*1.64, canvasW * 0.025, canvasW * 0.015);
  pop();
  pop();
};

//아이 울고 있음
cryChild = function() {
    push();
    translate(canvasW * 0.3, canvasH * 0.94); // 아이 위치 설정
    scale(0.7); // 아이 크기 축소
  
    // 머리카락
    push();
    fill(0);
    ellipse(0, -canvasH * 0.03, canvasW * 0.09, canvasH * 0.15);
    pop();
  
    // 얼굴
    ellipse(0, 0, canvasW * 0.08, canvasH * 0.12);
  
    // 눈
    fill(0);
    ellipse(-canvasW * 0.02, -canvasH * 0.02, canvasW * 0.008, canvasH * 0.012); // 오른쪽 눈
    ellipse(canvasW * 0.02, -canvasH * 0.02, canvasW * 0.008, canvasH * 0.012); // 왼쪽 눈
  
    // 입
    push();
    rectMode(CENTER);
    noFill();
    arc(0, canvasH * 0.02, canvasW * 0.03, canvasH * 0.02, PI,0);
    pop();
  
    // 몸통
    push();
    fill(255);
    rect(-canvasW * 0, canvasH * 0.17, canvasW * 0.07, canvasH * 0.2, 5);
    pop();
  
    // 팔
    stroke(0);
    line(-canvasW * 0.035, canvasH * 0.1, -canvasW * 0.08, canvasH * 0.05); // 오른쪽 팔
    line(canvasW * 0.035, canvasH * 0.1, canvasW * 0.08, canvasH * 0.05); // 왼쪽 팔
    
    //손
    push();
    fill(255);
    ellipse(-canvasW * 0.08, canvasH * 0.05, canvasW * 0.01, canvasW * 0.01);
    ellipse(canvasW * 0.08, canvasH * 0.05, canvasW * 0.01, canvasW * 0.01);  
    pop();
  
  
    // 다리
    line(-canvasW * 0.02, canvasH * 0.27, -canvasW * 0.02, canvasH * 0.305); // 오른쪽 다리
    line(canvasW * 0.02, canvasH * 0.27, canvasW * 0.02, canvasH * 0.305); // 왼쪽 다리
    
    //발
    push();
    fill(255);
    ellipse(-canvasW * 0.02, canvasH * 0.306, canvasW * 0.022, canvasW * 0.008);
    ellipse(canvasW * 0.02, canvasH * 0.306, canvasW * 0.022, canvasW * 0.008);  
    pop();
  
    pop();
};

//아이 눈물-GPT
let tears = [];

childTears=function() {
    push();
    translate(canvasW * 0.3, canvasH * 0.94);
    scale(0.7);
  
    // 새로운 눈물 생성
    if (frameCount % 15 === 0) { // 15 프레임마다 눈물 생성
      tears.push({
        x: -canvasW * 0.03, // 시작 x 좌표 (오른쪽 눈)
        y: -canvasH * 0.01, // 시작 y 좌표 (눈 위치)
        vx: -random(0.0005, 0.001), // x 방향 속도 (왼쪽으로)
        vy: random(-0.0002, 0.0002), // y 방향 속도 (위아래로 약간씩)
        size: random(canvasW * 0.005, canvasW * 0.01) // 크기
      });
      tears.push({
        x: canvasW * 0.03, // 시작 x 좌표 (왼쪽 눈)
        y: -canvasH * 0.005, // 시작 y 좌표 (눈 위치)
        vx: random(0.0005, 0.001),  // x 방향 속도 (오른쪽으로)
        vy: random(-0.0002, 0.0002), // y 방향 속도 (위아래로 약간씩)
        size: random(canvasW * 0.004, canvasW * 0.007) // 크기
      });
    }
  
    // 눈물 업데이트 및 그리기
    for (let i = tears.length - 1; i >= 0; i--) {
      let tear = tears[i];
      
      // 위치 업데이트
      tear.x += tear.vx * canvasW;
      tear.y += tear.vy * canvasH;
      
      // 그리기
      push();
      ellipse(tear.x, tear.y, tear.size, tear.size * 1.3); // 물방울 모양
      pop();
      
      // 눈물이 사라지는 조건
      if (tear.alpha <= 0 || abs(tear.x) > canvasW * 0.05) {
        tears.splice(i, 1); // 배열에서 제거
      }
    }
  
    pop();
  };

//아이 엄마 등장
wonderMom = function() {
    rectMode(CORNER);
    push(); // 좌표계 저장

    frameRate(30);
    let xPosSpeed = 0; // x축으로 이동할 방향 초기화
    let finalXPos = 0; // 최종 x 위치를 저장할 변수
    let scene4_startFrame = 150; // 시작 프레임(초당 30 츠레임-5초)
    let scene4_endFrame = 600; // 종료 프레임(x축 이동 시간: 10초)
  
    if (frameCount > scene4_startFrame && frameCount < scene4_endFrame) {
      xPosSpeed = (frameCount - scene4_startFrame) * 2;
      finalXPos = -xPosSpeed;
    } else if (frameCount >= scene4_endFrame) {
      finalXPos = -(scene4_endFrame - scene4_startFrame) * 2;
    } else {
      finalXPos = 0;
    }

    translate(finalXPos, 0);
  
    push();
    translate(canvasW * 1.8 - xPosSpeed , canvasH * 0.76); // 엄마 위치 설정 (파출소 옆)
    scale(1.27); // 엄마 크기 설정 (아이보다 약간 크게)

    // 머리카락
    push();
    fill(0); // 검정색 머리
    ellipse(0, -canvasH * 0.03, canvasW * 0.1, canvasH * 0.16); // 머리 스타일
    ellipse(0, -canvasH * 0.1, canvasW * 0.06, canvasH * 0.06);
    pop();

    // 얼굴
    ellipse(0, 0, canvasW * 0.09, canvasH * 0.13);

    // 눈
    fill(0);
    ellipse(-canvasW * 0.022, -canvasH * 0.02, canvasW * 0.009, canvasH * 0.013); // 오른쪽 눈
    ellipse(canvasW * 0.022, -canvasH * 0.02, canvasW * 0.009, canvasH * 0.013); // 왼쪽 눈

    // 입
    push();
    noFill();
    stroke(0);
    arc(0, canvasH * 0.02, canvasW * 0.035, canvasH * 0.02, PI, 0);
    pop();

    // 몸통
    push();
    rectMode(CORNER);
    fill(255);
    rect(-canvasW * 0.038, canvasH * 0.06, canvasW * 0.075, canvasH * 0.2, 5);
    pop();

    // 팔
    stroke(0);
    line(-canvasW * 0.04, canvasH * 0.1, -canvasW * 0.09, canvasH * 0.05); // 오른쪽 팔
    line(canvasW * 0.04, canvasH * 0.1, canvasW * 0.09, canvasH * 0.05); // 왼쪽 팔

    // 손
    push();
    fill(255);
    ellipse(-canvasW * 0.09, canvasH * 0.05, canvasW * 0.012, canvasW * 0.012); // 오른쪽 손
    ellipse(canvasW * 0.09, canvasH * 0.05, canvasW * 0.012, canvasW * 0.012); // 왼쪽 손
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

 pop();
};

//5 함수
//배경
scene5Back=function(){
    push();
    rectMode(CORNER);
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
    pop();
  };

//손 흔드는 주인공 뒷모습
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

//주인공 손 회전
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

//멀어지는 아이
  drawChild = function() {
    push();
    rectMode(CORNER);
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
  
//멀어지는 아이 엄마
  childMom = function() {
      push();
      rectMode(CORNER);
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

//5_1 함수
//활짝 웃는 주인공
beHappy=function(){
    push();
    rectMode(CENTER);
    
    // 머리카락
    push();
    beginShape();
    fill(0);
    vertex(canvasW * 0.11, canvasH * 0.32 - canvasH * 0.04);
    vertex(canvasW * 0.11, canvasH * 0.21 - canvasH * 0.04);
    bezierVertex(
      canvasW * 0.11, canvasH * 0.1 - canvasH * 0.04,
      canvasW * 0.23, canvasH * 0.1 - canvasH * 0.04,
      canvasW * 0.23, canvasH * 0.21 - canvasH * 0.04
    );
    vertex(canvasW * 0.23, canvasH * 0.32 - canvasH * 0.04);
    bezierVertex(
      canvasW * 0.23, canvasH * 0.36 - canvasH * 0.04,
      canvasW * 0.11, canvasH * 0.36 - canvasH * 0.04,
      canvasW * 0.11, canvasH * 0.32 - canvasH * 0.04
    );
    endShape();
    pop();
    
    // 몸
    push();
    rect(canvasW * 0.172, canvasH * 0.4, canvasW * 0.09, canvasH * 0.2, 20 * (canvasW / 1600));
    pop();
    
    // 얼굴
    ellipse(canvasW * 0.17, canvasH * 0.2, canvasW * 0.1, canvasH * 0.2);
    
    // 앞머리
    push();
    fill(0);
    noStroke();
    arc(canvasW * 0.17, canvasH * 0.18, canvasW * 0.1, canvasH * 0.16, PI, 0);
    pop();
    
    // 입
    push();
    fill(255, 0, 0);
    stroke(0);
    strokeWeight(1.5);
    arc(canvasW * 0.167, canvasH * 0.25, canvasW * 0.01875, canvasH * 0.01 + canvasW * min(frameCount, 180) * 0.0001, 0, PI);
    line(canvasW * 0.176, canvasH * 0.25, canvasW * 0.158, canvasH * 0.25);
    pop();
    
    // 볼 발그레
    push();
    noStroke();
    colorMode(RGB, 255);
    let alphaValue = map(min(frameCount, 180) % 180, 0, 180, 0, 50);
    fill(150, 0, 0, alphaValue);
    ellipse(canvasW * 0.14, canvasH * 0.23, canvasW * 0.02, canvasH * 0.02);
    ellipse(canvasW * 0.193, canvasH * 0.23, canvasW * 0.02, canvasH * 0.02);
    if (frameCount >= 180) {
      fill(150, 0, 0, 50);
      ellipse(canvasW * 0.14, canvasH * 0.23, canvasW * 0.02, canvasH * 0.02);
      ellipse(canvasW * 0.193, canvasH * 0.23, canvasW * 0.02, canvasH * 0.02);
    }
    pop();
    
    // 눈
    push();
    fill(0);
    ellipse(canvasW * 0.15, canvasH * 0.2, canvasW * 0.006, canvasH * 0.02);
    ellipse(canvasW * 0.18, canvasH * 0.2, canvasW * 0.006, canvasH * 0.02);
    pop();
    
    // 팔
    push();
    line(canvasW * 0.127, canvasH * 0.33, canvasW * 0.11, canvasH * 0.4);
    line(canvasW * 0.11, canvasH * 0.4, canvasW * 0.15, canvasH * 0.45);
    line(canvasW * 0.217, canvasH * 0.33, canvasW * 0.23, canvasH * 0.4);
    line(canvasW * 0.23, canvasH * 0.4, canvasW * 0.19, canvasH * 0.45);
    pop();

    pop(); // scale(3) 닫기
};

//엔딩 크래딧 배열
let credits = [
    "기획",
    "김나연: 전체적인 중심 스토리 아이디어 제시",
    "세부 플롯 기획, 인터랙션 기획",
    "이송연: 색상 및 UI, 세부 플롯 기획, 핵심 인터랙션 기획",
    "조윤서: 시각적 연출 제안, 세부 플롯 기획, 인터랙션 기획",
    " ",
    "디자인",
    "김나연: 등장인물 & 핵심 요소 디자인",
    "이송연: 소품, 크레딧 디자인",
    "조윤서: 배경 디자인",
    " ",
    "코드",
    "김나연: 등장인물관련 코드 작성, 함수 합치기",
    "이송연: 소품 관련 코드 작성, 소리 삽입",
    "조윤서: 배경 , 크레딧 및 오프닝 연출",
    " ",
    "-Flow-"
    ];
    
let yStart;
    
