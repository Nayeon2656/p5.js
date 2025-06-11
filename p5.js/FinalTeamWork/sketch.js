let currentScene = 0;
const sceneDurations = [7000, 2000, 2000, 8000, 4000, 8000, 20000, 5000, 4000, 40000] ; // 씬별 시간 (ms)
//[7000, 2000, 2000, 8000, 4000, 8000, 20000, 5000, 4000, 30000]          - 씬 별 시간
//[1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]            - 편집용 
let canvasW, canvasH;
let stage; // 오프닝 단계
let startTime; // 오프닝 시작 시간
let subwaySceneNumber = 3; //지하철 씬 번호
let raindrops = [];
let x = -50;
let x2 = -700;
let img;

function preload() {
  img1 = loadImage('FinalTeamWork/bg1.png');
  img2 = loadImage('FinalTeamWork/bg2.png');
  img3 = loadImage('FinalTeamWork/bg3.2.png');
  
}

function setup() {
  setCanvasSize();
  createCanvas(canvasW, canvasH);
  textAlign(CENTER, CENTER);
  stage = 0; // 오프닝 초기 단계
  startTime = millis(); // 시작 시간 기록

  for (let i = 0; i < 200; i++) {
    raindrops.push({
      x: random(canvasW),
      y: random(-canvasH, 0),
      speed: random(2, 6)
    });
   }
  
  //Scene4.버스 좌표 초기화
  busX = canvasW * 0.2;
  busY = canvasH * 0.6;

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
    case 3: drawScene1_2(); break;
    case 4: drawScene2(); break;
    case 5: drawScene3(); break;
    case 6: drawScene4(); break;
    case 7: drawScene5(); break;
    case 8: drawScene5_1(); break;
    case 9: drawCreditEnding();  break;
  }
  return;
}

function startSceneTimer() {
    setTimeout(() => {
      currentScene = (currentScene + 1) % sceneDurations.length;
  
      // 크레딧 씬 시작 시 초기화
      if (currentScene === 0) { // 오프닝 씬 시작 시시
        stage = 0;
      } else if (currentScene === 8) { // 크레딧 씬 시작 시
        creditY = canvasH;
      }

      // 지하철 씬 시작 시 초기화
      if (currentScene === subwaySceneNumber) { 
        createUI(); // UI 요소 생성
      } else {
         // 다른 씬으로 넘어가면 UI 요소 숨기기
         if(birthInput) birthInput.hide();
         if(showButton) showButton.hide();
      }
  
      startTime = millis(); // 각 씬 시작 시 startTime 초기화
      frameCount = 0; // 각 씬 시작 시 frameCount 초기화!
  
      startSceneTimer();
    }, sceneDurations[currentScene]);
  }  

// 씬별 그리기 함수들

//Scene1_Opening Credit
function drawCreditOpening() {
  push();
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
  pop();
}

//Scene2_Scene1.지하철 타고 있는 주인공 등장
function drawScene1() {
  push();
  backShaking();
  background(220);

  //배경
  scene1Back();
  
  //주변 사람들
  drawSilhouettes();
    
  //손잡이
  handRing();
  
  // 주인공
  push();
  drawCharacter();
  pop();

  pop();
}

//Scene3_Scene1-1.지하철에서 핸드폰을 보고 있는 주인공
function drawScene1_1() {
  push();
    //줌인
    zoomIn();
    background(220);
  
    // 지하철 배경
    // 왼쪽 부분 좌석 사각형 
    push();
    stroke(100);
    strokeWeight(10);
    fill(180);
    quad(
     canvasW * 0, canvasH * 0.01, 
     canvasW * 0.16, canvasH * 0.01,
     canvasW * 0.16, canvasH * 0.9,
     canvasW * 0, canvasH * 0.9  );
  
    fill(255);
    noStroke();

    quad(
     canvasW * 0.001, canvasH * 0.01, 
     canvasW * 0.15, canvasH * 0.01,
     canvasW * 0.15, canvasH * 0.9,
     canvasW * 0.001, canvasH * 0.9  );
  
    strokeWeight(1);
    drawSilhouettes1();
  
    // 지하철 역 안내 전광판
    fill(150);
    noStroke();
    fill(180); // 연한 회색
    rect(canvasW * 0.34, canvasH * 0.05, canvasW * 0.47, canvasH * 0.3, 20);

    // 안쪽 회색 박스 (윗부분)
    fill(150); // 중간 회색
    rect(canvasW * 0.37, canvasH * 0.08, canvasW * 0.39, canvasH * 0.11, 10);

    // 아래 검정 바 (하단)
    fill(0); // 검정
    rect(canvasW * 0.34, canvasH * 0.27, canvasW * 0.47, canvasH * 0.07, 5);

    // 흰색 테두리 네모 (아래 바 안쪽)
    noFill();
    stroke(255);
    strokeWeight(1);
    rect(canvasW * 0.39, canvasH * 0.3, canvasW * 0.37, canvasH * 0.03);
    pop();
    
    // 주인공
    drawCharacter1();
  pop();
}

//Scene4.Scene1.2. 확대된 핸드폰 오늘의 운세 화면 속 인터랙션
function drawScene1_2() {
  background(220);

  //핸드폰 사용
  push();
  useApp();
  pop();

  //핸드폰 쓰는 손
  usePhoneHand();
}

//우산 날아가기 위한 전역 변수 선언
let umbrellaX = canvasW * 0.19;
let umbrellaY = canvasH * 0.21;//우산위치
let umbrellaVX=0, umbrellaVY=0;//우산의 속도
let umbrellaMove=false;//아직 안움직임
let umbrellaFlew=false;//우산이 이미 날라갔는지?

//Scene5.Scene2.걷다가 우산이 날라가는 주인공
function drawScene2() {
    background(220);
    image(img1, x,-0.24*canvasH,canvasW*2, canvasH*1);
    x -= 1; // 매 프레임마다 x를 1씩 줄여서 왼쪽으로 이동

    //배경-보도블록
    scene2Back();
    
    //캐릭터
    push();
    sheShaking();
    walkingCharacter();
    pop();
    
    //우산이 날아감
    rectMode(CENTER);
    if (!umbrellaMove) { // 처음 한 번만 실행
        umbrellaX = canvasW * 0.21;
        umbrellaY = canvasH * 0.2;
    }

    let currentTime = millis();
    let elapsedTime = currentTime - startTime;

    if (elapsedTime > 2000) { // 2초 후 우산 날리기 시작
      umbrellaMove = true;
    }

    push(); // 좌표계 저장 (우산, 팔, 좌석에만 적용)

    if (umbrellaMove) {
      // 우산이 날아가는 중
      // 초기 속도 설정 (처음 한 번만)
      if (!umbrellaFlew) {
        umbrellaVX = random(2, 4);
        umbrellaVY = random(-3, -1);
        umbrellaFlew = true;
      }

      // 매 프레임 속도/위치 업데이트
      umbrellaVX += 0.05;
      umbrellaVY += 0.03;
      umbrellaX += umbrellaVX;
      umbrellaY += umbrellaVY;

      drawUmb(umbrellaX, umbrellaY); // 우산 그리기 (날아가는 위치에)
    } else {
      // 3초 동안 우산을 들고 있는 상태
      drawUmb(canvasW * 0.21, canvasH * 0.2); // 주인공 손 위치에 우산 그리기 (임시)
    }
      //우산 잡으러 가는 팔
      catchingArm();
}

//Scene5.Scene3.버스에서 졸다가 깜짝 놀라 하차 벨을 누르는 주인공
function drawScene3() {
    background(220);
    scene3Back();
    
    //function1-버스에서 졸고있는 주인공
    sleepInBus();
       //배경-버스에서 주인공 자리를 주로 잡고 창문으로 바깥 배경들이 지나감
    
    //function2-급하게 하차벨을 누르는 주인공
    raiseArm();

    //function3-급하게 하차벨을 누르는 마우스 인터랙션
    pressBell();
  }

//버스 움직임 위한 전역 변수 선언
let busX,busY;
let busMoving=true;

//Scene6.Scene4.버스 정류장에서 우는 아이를 달래고 경찰서로 데려가는 주인공, 엄마를 발견하고 달려가는 아이
function drawScene4() {
    background(220);
    //배경
    scene4Back();

    //버스정류장에서 버스가 지나가고 주인공과 아이가 나타남
    //주인공
    push();
    scale(0.8);
    walkPoliceCharacter();// 주인공 함수 호출

    push();
    cryChild(); // 아이 함수 호출
    pop();
    
    childTears(); //아이 눈물 함수 호출
    wonderMom();//아이 엄마 함수 호출
    pop();

    // 버스 이동 및 그리기
    if (busMoving) {
      drawBus(busX,busY);
      busX -= canvasW*0.02; // 이동 속도

      if (busX < -canvasW) {
        busMoving = false; 
      }
    }
  }

//Scene7.Scene5.아이와 엄마가 멀어지고 아이의 손에서 자신의 우산을 발견하는 주인공
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
  
    push();
    goSmall(findUmb, frameCount, 1, 0.6, 0, canvasH * 0.1); //멀어지는 우산산
    pop();

    //주인공
    push();
    scale(2);
    shakeCharacter();
    pop();
       //사물-우산이 빛남
}

//Scene8.Scene5.1.자신의 불운이 누군가에게 도움이 되었음에 행복을 느끼는 주인공
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
  push();
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(22);
  
    // yStart 변수를 매 프레임마다 초기화하면 안 됨. 전역 변수로 빼고 관리
    if (typeof creditY === 'undefined') {
      creditY = canvasH; // 처음 시작 위치
    }
  
    for (let i = 0; i < credits.length; i++) {
      text(credits[i], canvasW / 2, creditY + i * 50);
    }
  
    creditY -= 1.5; // 크레딧이 위로 올라가게
  pop();
  }

//1 함수
//배경
scene1Back=function(){
  push();
  noStroke();
  fill(200);
  
  //기본 배경
    // 지하철 게이트 (왼쪽)
    quad(
    0, canvasH * 0.1,  // 좌상단
    canvasW * 0.18, canvasH * 0.1,  // 우상단
    canvasW * 0.18, canvasH * 1,  // 우하단
    0, canvasH * 1);   // 좌하단
  
    // 지하철 게이트 (오른쪽)
    quad(
    canvasW * 0.18, canvasH * 0.1,  // 좌상단
    canvasW * 0.41, canvasH * 0.1,  // 우상단
    canvasW * 0.41, canvasH * 1,  // 우하단
    canvasW * 0.18, canvasH * 1);   // 좌하단

    fill(255);
    strokeWeight(3);
    stroke(100);
  
    // 지하철 게이트 창문 (왼쪽)
    quad(
    0, canvasH * 0.15,  // 좌상
    canvasW * 0.15, canvasH * 0.15,  // 우상단
    canvasW * 0.15, canvasH * 0.55,  // 우하단
    0, canvasH * 0.55);   // 좌하단
  
    
    // 지하철 게이트 창문 (오른쪽)
    quad(
    canvasW * 0.22, canvasH * 0.15,  // 좌상단
    canvasW * 0.38, canvasH * 0.15,  // 우상단
    canvasW * 0.38, canvasH * 0.55,  // 우하단
    canvasW * 0.22, canvasH * 0.55);   // 좌하단
  

    // 지하철 창문
    fill(100);
    noStroke();
    strokeWeight(1);
    quad( 
    canvasW * 0.49, canvasH * 0.08,  // 좌상단
    canvasW * 0.95, canvasH * 0.08,  // 우상단
    canvasW * 0.95, canvasH * 0.72,  // 우하단
    canvasW * 0.49, canvasH * 0.72  );   // 좌하단
  
    fill(255);
    quad( 
    canvasW * 0.5, canvasH * 0.1,  // 좌상단
    canvasW * 0.94, canvasH * 0.1,  // 우상단
    canvasW * 0.94, canvasH * 0.7,  // 우하단
    canvasW * 0.5, canvasH * 0.7  );   // 좌하단
  
    fill(255);
    stroke(0);

    noStroke();
    fill(150, 150, 150, 200);
  
    quad( canvasW * 0.42, canvasH * 0.775, 
    canvasW * 1, canvasH * 0.775, 
    canvasW * 1, canvasH * 0.86, 
    canvasW * 0.42, canvasH * 0.86);  // 지하철 아랫라인
  
    fill(150, 150, 150, 100);
  
    quad( canvasW * 0.42, canvasH * 0.885, 
    canvasW * 1, canvasH * 0.885, 
    canvasW * 1, canvasH * 0.93, 
    canvasW * 0.42, canvasH * 0.93);  // 지하철 아랫라인
  
    stroke(255);
    strokeWeight(3);
  
    line(canvasW * 0.177, canvasH * 0.1,  // 좌상단
    canvasW * 0.177, canvasH * 1);

    strokeWeight(5);
    stroke(100);
  
    line(canvasW * 0.16, canvasH * 0.65,  // 열차 손잡이
    canvasW * 0.16, canvasH * 0.8);
  
    line(canvasW * 0.195, canvasH * 0.65,
    canvasW * 0.195, canvasH * 0.8);
  
    pop();
};

//손잡이
handRing=function(){
      push();
    noFill();
    strokeWeight(3);
  
        // 지하철 손잡이 1
    triangle(canvasW * 0.54 , canvasH * 0.28,
          canvasW * 0.62 , canvasH * 0.28,
          canvasW * 0.58 , canvasH * 0.17);
  
    // 지하철 손잡이 2
    triangle(canvasW * 0.68 , canvasH * 0.28,
          canvasW * 0.76 , canvasH * 0.28,
          canvasW * 0.72 , canvasH * 0.17);
  
    // 지하철 손잡이 3
    triangle(canvasW * 0.82 , canvasH * 0.28,
          canvasW * 0.9 , canvasH * 0.28,
          canvasW * 0.86 , canvasH * 0.17);
    
    strokeWeight(1);
    fill(0);
  
      // 지하철 손잡이 1 (기둥)
    quad(
    canvasW * 0.573, canvasH * 0.1,  // 좌상단
    canvasW * 0.588, canvasH * 0.1,  // 우상단
    canvasW * 0.588, canvasH * 0.2,  // 우하단
    canvasW * 0.573, canvasH * 0.2);   // 좌하단
  
    // 지하철 손잡이 2 (기둥)
    quad(
    canvasW * 0.713, canvasH * 0.1,  // 좌상단
    canvasW * 0.727, canvasH * 0.1,  // 우상단
    canvasW * 0.727, canvasH * 0.2,  // 우하단
    canvasW * 0.713, canvasH * 0.2);   // 좌하단
  
      // 지하철 손잡이 3 (기둥)
    quad(
    canvasW * 0.853, canvasH * 0.1,  // 좌상단
    canvasW * 0.868, canvasH * 0.1,  // 우상단
    canvasW * 0.868, canvasH * 0.2,  // 우하단
    canvasW * 0.853, canvasH * 0.2);   // 좌하단
    pop();
};

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

  //핸드폰
  push();
  stroke(150);
  fill(150);
  rect(canvasW * 0.667, canvasH * 0.63, canvasW*0.03, canvasH * 0.09, canvasW*0.001);
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

//주변 사람들
drawSilhouettes=function() {
 push();
 
  noStroke();
  fill(130);

  //사람 2
  ellipse(canvasW * 0.79, canvasH * 0.4, canvasW * 0.1, canvasH * 0.2 );
  rect(canvasW * 0.747, canvasH * 0.5, canvasW*0.08, canvasH * 0.2);
    
  fill(200);
    
  //왼쪽 사람 1
  ellipse(canvasW * 0.575, canvasH * 0.35, canvasW * 0.1, canvasH * 0.2 );
  rect(canvasW * 0.53, canvasH * 0.449, canvasW*0.09, canvasH * 0.25);
    
   //왼쪽 사람 3
  ellipse(canvasW * 0.87, canvasH * 0.35, canvasW * 0.1, canvasH * 0.2 );
  rect(canvasW * 0.82, canvasH * 0.449, canvasW*0.09, canvasH * 0.25);
      
 pop();
};

//배경 움직이는 함수
backShaking=function() {
  let shakeAmount = 0.6; // 흔들리는 강도 (픽셀 단위)

  let shakeY = random(-shakeAmount, shakeAmount); // 세로 방향 흔들림
  translate(0, shakeY); // 캔버스 이동
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
};

//배경 줌인
zoomIn=function() {
  let zoomLevel = 1; // 초기 줌 레벨
  let targetZoomLevel = 5; // 목표 줌 레벨 (몇 단계까지 확대할지)
  let zoomSpeed = 1; // 줌 속도 (클수록 빠름)
  let zoomDelayFrames = 30; // 줌 시작 전 지연 프레임

  if (frameCount > zoomDelayFrames && zoomLevel < targetZoomLevel) {
    zoomLevel += zoomSpeed; // 줌 레벨 증가
    translate(-canvasW*0.5,-canvasH*0.6);
  }
  zoomLevel = min(zoomLevel, targetZoomLevel); // 최대 줌 레벨 제한
  scale(zoomLevel); // 캔버스 변환 적용
};

//1_2 함수
//정보 입력
let birthInput, showButton;
let showFortune = false;
let showMessage = false;
let userBirthday = ''; 

createUI=function() {
  push();
  birthInput = createInput('');
  birthInput.position(canvasW * 0.4, canvasH * 0.52);
  birthInput.size(120);
  birthInput.attribute('placeholder', '생년월일 YYMMDD');//ai도움
  showButton = createButton('운세보기');//ai도움
  showButton.position(birthInput.x + birthInput.width + 20, birthInput.y);
  showButton.mousePressed(handleSubmit);
  pop();
};

//"운세보기" 버튼을 클릭했을 때 실행되는 함수
handleSubmit=function() {
  userBirthday = birthInput.value();
  birthInput.hide();
  showButton.hide();
  showFortune = true;

  setTimeout(() => {
    showMessage = true;
  }, 1000);
};

//핸드폰 사용 전체 플로우
useApp=function() {
  push();

  background(220);
  rectMode(CENTER);

  // 핸드폰 기본 입력 화면
  stroke(150);
  strokeWeight(8);
  fill(255);
  rect(canvasW / 2, canvasH / 2, canvasW * 0.65, canvasH * 0.6, 20);

  if (showFortune) {

    // "오늘의 운세는" 텍스트
    noStroke();
    fill(0);
    textSize(25);
    push();
    translate(canvasW * 0.35, canvasH * 0.55);
    rotate(PI * 1.5);
    text("오늘의 운세는", 0, 0);
    pop();

    // 찡그린 운세 그림
    // 얼굴
    fill(255, 0, 0);
    ellipse(canvasW / 2, canvasH / 2, canvasW * 0.22);
    // 눈
    fill(0);
    circle(canvasW / 2.08, canvasH / 1.7, canvasW * 0.06);
    circle(canvasW / 2.08, canvasH / 2.3, canvasW * 0.06);
    fill(255);
    circle(canvasW / 2.08, canvasH / 2.3, canvasW * 0.04);
    circle(canvasW / 2.08, canvasH / 1.7, canvasW * 0.04);
    // 입
    noFill();
    stroke(0);
    strokeWeight(5);
    arc(canvasW / 1.74, canvasH / 2.46 + canvasW * 0.06, canvasW * 0.11, canvasW * 0.09, PI / 2, PI * 1.5);
    
    // "최악" 텍스트
    fill(255, 0, 0);
    noStroke();
    textSize(40);
    textStyle(BOLD);
    push();
    translate(canvasW * 0.7, canvasH * 0.5);
    rotate(PI * 1.5);
    text("최악", 0, 0);
    pop();

    //메시지(1second later)
    if (showMessage) {
      fill(255);
      stroke(230);
      strokeWeight(3);
      rect(canvasW * 0.22, canvasH * 0.5, 17, canvasH*0.5,20);
      fill(0);
      textSize(15);
      push();
      translate(canvasW * 0.223, canvasH * 0.53);
      rotate(PI * 1.5);
      noStroke();
      text("송연:어디야?? 빨리와ㅜ", 0, 0);
      pop();
    }
  }
  pop();
};

//핸드폰 사용하는 손
usePhoneHand=function() {
  push();
  fill(255);
  ellipse(canvasW * 0.5, canvasH * 0.95, canvasW * 0.3);
  ellipse(canvasW * 0.5, canvasH * 0.05, canvasW * 0.3);
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
  
  fill(100);
  noStroke();
  quad(
    canvasW * -1, canvasH * 0.71,  // 좌상단
    canvasW * 2, canvasH * 0.71,   // 우상단
    canvasW * 2, canvasH * 0.76,   // 우하단
    canvasW * -1, canvasH * 0.76); // 좌하단

  // 빗방울
  stroke(0);
  strokeWeight(2);
  for (let drop of raindrops) {
    // 빗방울이 보도블럭에 닿기 전까지만 그림
    if (drop.y + 20 < canvasH * 0.71) {
      line(drop.x, drop.y, drop.x, drop.y + 20);
      drop.y += drop.speed;
    } else {
      // 보도블럭에 닿으면 초기화
      drop.y = random(-50, 0);
      drop.x = random(canvasW);
    }
  }
};

//주인공이 바람에 움직이는 함수
sheShaking=function() {
  let shakeAmount = 0.6; // 흔들리는 강도 (픽셀 단위)

  let shakeX = random(0, shakeAmount); // 세로 방향 흔들림
  translate(shakeX, 0); // 캔버스 이동
};

//걷다가 우산이 날아가 멈추는 주인공
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
  
  let speed = 0.002; // 움직이는 속도 조절
  let range = 0.01; // 다리가 움직이는 범위 조절

  push();
  fill(255);
  strokeWeight(3);
  let currentTime = millis(); // 현재 시간 가져오기
  let elapsedTime = currentTime - startTime;  // 경과 시간 계산

  if (elapsedTime > 0 && elapsedTime < 2300){// 우산 들고 있을 때
    // 오른쪽 다리
    let rightLegX = canvasW * 0.16 + canvasH * speed * (frameCount % 20); // 20프레임마다 반복
    line(canvasW * 0.16, canvasH * 0.6, rightLegX, canvasH * 0.7);

    // 왼쪽 다리
    let leftLegX = canvasW * 0.18 - canvasH * speed * (frameCount % 20); // 20프레임마다 반복
    line(canvasW * 0.18, canvasH * 0.6, leftLegX, canvasH * 0.7);

    //발
    strokeWeight(1);
    ellipse(rightLegX + range * sin(frameCount * 0.1), canvasH * 0.7, canvasW * 0.025, canvasW * 0.015);
    ellipse( leftLegX - range * sin(frameCount * 0.1), canvasH * 0.7, canvasW * 0.025, canvasW * 0.015);
  } else {
    // 오른쪽 다리
    let rightLegX = canvasW * 0.16; // 20프레임마다 반복
    line(canvasW * 0.16, canvasH * 0.6, rightLegX, canvasH * 0.7);

    // 왼쪽 다리
    let leftLegX = canvasW * 0.18; // 20프레임마다 반복
    line(canvasW * 0.18, canvasH * 0.6, leftLegX, canvasH * 0.7);

    //발
    strokeWeight(1);
    ellipse(rightLegX + range, canvasH * 0.7, canvasW * 0.025, canvasW * 0.015);
    ellipse( leftLegX - range, canvasH * 0.7, canvasW * 0.025, canvasW * 0.015);
  }
    pop();
};

//날아가는 우산
drawUmb=function(x,y){
  push();
  translate(x,y);
  
  fill(255,255,0);
  noStroke();
  arc(0,0,150,100,PI,0);
  stroke(0);
  strokeWeight(4);
  line(0,0,0,120);
  noFill();
  arc(10,120,20,20,0,PI);
  pop();
};

//우산 잡는 손
catchingArm=function(){
  // 오른쪽 팔
  push();
  fill(255);
  let currentTime = millis(); // 현재 시간 가져오기
  let elapsedTime = currentTime - startTime;  // 경과 시간 계산

  if (elapsedTime > 0 && elapsedTime < 2300){// 우산 들고 있을 때
    line(canvasW * 0.177, canvasH * 0.43, // 몸통 왼쪽 옆 시작점
        canvasW * 0.16, canvasH * 0.5);  // 팔꿈치
    line(canvasW * 0.16, canvasH * 0.5, // 팔꿈치
        canvasW * 0.21, canvasH * 0.47);  // 손 끝나는 지점
  // 오른쪽 손
    circle(canvasW * 0.21, canvasH * 0.47, canvasW * 0.015); // 팔 끝에 동그라미 손
  } else if (elapsedTime > 2000) {  //팔을 들어 올려 벨 누름
    line(canvasW * 0.177, canvasH * 0.43, // 몸통 왼쪽 옆 시작점
        canvasW * 0.2, canvasH * 0.46);  // 팔꿈치
    line(canvasW * 0.2, canvasH * 0.46, // 팔꿈치
        canvasW * 0.24, canvasH * 0.4);  // 손 끝나는 지점
  // 오른쪽 손
    circle(canvasW * 0.24, canvasH * 0.4, canvasW * 0.015); // 팔 끝에 동그라미 손
  }
  pop();
};

//3 함수
//배경
scene3Back=function()
{
  push();
  image(img2, x2, 0, canvasW*2, canvasH);

  x2 += 1; // 매 프레임마다 x를 1씩 줄여서 왼쪽으로 이동
 
  fill(245); 

  noStroke();
  quad(
    canvasW * 0, canvasH * 0,  // 좌상단
    canvasW * 1, canvasH * 0,  // 우상단
    canvasW * 1, canvasH * 0.33,  // 우하단
    canvasW * 0, canvasH * 0.15);   // 좌하단 창문 3
  

  quad(
    canvasW * 0, canvasH * 0,  // 좌상단
    canvasW * 1, canvasH * 0,  // 우상단
    canvasW *1, canvasH * 0.23,  // 우하단
    canvasW * 0, canvasH * 0.03);   // 좌하단 창문 3
  
  quad(
    canvasW * 0.38, canvasH * 0.15,  // 좌상단
    canvasW * 0.45, canvasH * 0.15,  // 우상단
    canvasW * 0.45, canvasH * 0.8,  // 우하단
    canvasW * 0.38, canvasH * 0.8);   // 좌하단 창문 3

  quad(
    canvasW * 0.75, canvasH * 0.25,  // 좌상단
    canvasW * 0.8, canvasH * 0.25,  // 우상단
    canvasW * 0.8, canvasH * 0.8,  // 우하단
    canvasW * 0.75, canvasH * 0.8);   // 좌하단 창문 3

  quad(
    canvasW * 0, canvasH * 0.9,  // 좌상단
    canvasW * 1, canvasH * 0.5,  // 우상단
    canvasW * 1, canvasH * 1,  // 우하단
    canvasW * 0, canvasH * 1);   // 좌하단 창문 3
  
  stroke(0);
  fill(0);
  line(canvasW * 0.1, canvasH * -0.11,
      canvasW * 1, canvasH * 0.05); // 구도 선 1 (위부터)
  line(canvasW * 0, canvasH * 0.03,
      canvasW * 1, canvasH * 0.23); // 구도 선 2
  line(canvasW * 0, canvasH * 0.05,
      canvasW * 1, canvasH * 0.25); // 구도 선 3
  line(canvasW * 0, canvasH * 0.95,
      canvasW * 1, canvasH * 0.53); // 구도 선 4
  
  fill(200);
  quad(
    canvasW * 0, canvasH * 0.97,  // 좌상단
    canvasW * 1, canvasH * 0.55,  // 우상단
    canvasW *1, canvasH * 1,  // 우하단
    canvasW * 0, canvasH * 1);   // 좌하단 창문 3
  
  fill(255);
  
  noStroke();
  fill(150);
  quad(
    canvasW * 0.9, canvasH * 0.49,  // 좌상단
    canvasW * 1, canvasH * 0.49,  // 우상단
    canvasW * 1, canvasH * 0.73,  // 우하단
    canvasW * 0.9, canvasH * 0.73);   // 좌하단. 맨 뒤 좌석
  
  quad(
    canvasW * 0.9, canvasH * 0.735,  // 좌상단
    canvasW * 1, canvasH * 0.735,  // 우상단
    canvasW * 1, canvasH * 0.78,  // 우하단
    canvasW * 0.9, canvasH * 0.78);   // 좌하단. 맨뒤 좌석 쿠션
  
  quad(
    canvasW * 0.55, canvasH * 0.58,  // 좌상단
    canvasW * 0.74, canvasH * 0.58,  // 우상단
    canvasW * 0.74, canvasH * 0.86,  // 우하단
    canvasW * 0.55, canvasH * 0.86);   // 좌하단. 주인공 좌석
  quad(
    canvasW * 0.745, canvasH * 0.58,  // 좌상단
    canvasW * 0.93, canvasH * 0.58,  // 우상단
    canvasW * 0.93, canvasH * 0.86,  // 우하단
    canvasW * 0.745, canvasH * 0.86);   // 좌하단. 주인공 좌석 옆
  
  quad(
    canvasW * 0.55, canvasH * 0.865,  // 좌상단
    canvasW * 0.93, canvasH * 0.865,  // 우상단
    canvasW * 0.89, canvasH * 0.93,  // 우하단
    canvasW * 0.55, canvasH * 0.93);   // 좌하단. 주인공 좌석 쿠션
  stroke(0);
  
  
  sleepCharacter();//주인공 
  pop();
};

//졸고 있는 주인공 기본 틀
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
  
  //팔 - raiseArm에서 움직임 부여
  // 왼쪽 팔
  push();
  fill(255);
  line(canvasW * 0.697, canvasH * 0.69, // 몸통 오른쪽 옆 시작점 
       canvasW * 0.71, canvasH * 0.76);  // 팔꿈치
  line(canvasW * 0.71, canvasH * 0.76, // 팔꿈치
       canvasW * 0.67, canvasH * 0.81);  // 손 끝나는 지점
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

//조는 주인공의 움직임
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

//팔을 드는 주인공
raiseArm=function() {
    let currentTime = millis(); // 현재 시간 가져오기
    let elapsedTime = currentTime - startTime;  // 경과 시간 계산

  if (elapsedTime > 0 && elapsedTime < 6000){// 졸고 있을 때
    fill(255);
    // 오른쪽 팔
    line(canvasW * 0.607, canvasH * 0.69, // 몸통 왼쪽 옆 시작점
        canvasW * 0.6, canvasH * 0.76);  // 팔꿈치
    line(canvasW * 0.6, canvasH * 0.76, // 팔꿈치
        canvasW * 0.63, canvasH * 0.81);  // 손 끝나는 지점
  } else if (elapsedTime > 6000) {  //팔을 들어 올려 벨 누름
      push();
      fill(255);
      // 오른쪽 팔
      line(canvasW * 0.607, canvasH * 0.69, // 몸통 왼쪽 옆 시작점
           canvasW * 0.56, canvasH * 0.74);  // 팔꿈치
      line(canvasW * 0.56, canvasH * 0.74, // 팔꿈치
           canvasW * 0.54, canvasH * 0.6);  // 손 끝나는 지점
      // 오른쪽 손
      circle(canvasW * 0.54, canvasH * 0.6, canvasW * 0.015); // 팔 끝에 동그라미 손
  }

  //주인공 앞 좌석
  //주인공 앞 좌석
  push();
 
  fill(150);
  noStroke();
  quad(
    canvasW * 0.25, canvasH * 0.75,  // 좌상단
    canvasW * 0.44, canvasH * 0.75,  // 우상단
    canvasW * 0.44, canvasH * 0.99,  // 우하단
    canvasW * 0.25, canvasH * 0.99);   // 좌하단. 맨 앞쪽 왼쪽 좌석
     quad(
    canvasW * 0.445, canvasH * 0.75,  // 좌상단
    canvasW * 0.63, canvasH * 0.75,  // 우상단
    canvasW * 0.63, canvasH * 0.99,  // 우하단
    canvasW * 0.445, canvasH * 0.99);   // 좌하단. 맨 앞쪽 오른쪽 좌석
    stroke(0);
  pop();
};

//하차벨 인터랙션
let bellPressed=false;//하차벨 안 눌려있다고 선언
pressBell=function() {
  push();
  stroke(255);
  strokeWeight(3);
  if (bellPressed) {
    fill(255, 50, 0); // 눌렀을 때 색 변화
  } else {
    fill(0, 0, 0); // 기본 색
  }
  ellipse(canvasW * 0.415, canvasH * 0.35, canvasW / 15, canvasW / 13);
  fill(255);
  rect(canvasW * 0.415, canvasH * 0.35, canvasW / 23, canvasW / 50);
  fill(0);
  text("stop", canvasW * 0.415, canvasH * 0.35);
  pop();
};

function mousePressed() {
  if (dist(mouseX, mouseY, canvasW * 0.41 , canvasH * 0.35) < canvasW / 15) {
    bellPressed = true; //bellPressed설정
  }
}

//4 함수
//배경
scene4Back = function() {
  push(); // 좌표계 저장

  let xPosSpeed = 0;
  let finalXPos = 0;
  let scene4_startFrame = 150;
  let scene4_endFrame = 450;
  frameRate(30);

  if (frameCount > scene4_startFrame && frameCount < scene4_endFrame) {
    xPosSpeed = (frameCount - scene4_startFrame) * 2;
    finalXPos = -xPosSpeed;
  } else if (frameCount >= scene4_endFrame) {
    finalXPos = -(scene4_endFrame - scene4_startFrame) * 2;
  } else {
    finalXPos = 0;
  }

  translate(finalXPos, 0); // 전체 씬을 왼쪽으로 이동

  // 배경 이미지 반복해서 이어붙이기
  for (let i = 0; i < 4; i++) {
    image(img3, canvasW * i, 0, canvasW, canvasH);
  }

  // 보도블럭
  rectMode(CORNER);
  stroke(0);
  quad(
    canvasW * -1, canvasH * 0.93,
    canvasW * 9.1, canvasH * 0.93,
    canvasW * 9.1, canvasH * 1,
    canvasW * -1, canvasH * 1
  );

  //정류장 구조물
  noStroke();
  fill(255, 100);
  rect(canvasW * 0.12, canvasH * 0.43, canvasW * 0.46, canvasH * 0.5);
  fill(100);
  rect(canvasW * 0.12, canvasH * 0.43, canvasW * 0.46, canvasH * 0.1);
  fill(150);
  rect(canvasW * 0.12, canvasH * 0.46, canvasW * 0.05, canvasH * 0.47);
  rect(canvasW * 0.53, canvasH * 0.46, canvasW * 0.05, canvasH * 0.47);
  rect(canvasW * 0.12, canvasH * 0.39, canvasW * 0.46, canvasH * 0.07);
  fill(185);
  rect(canvasW * 0.16, canvasH * 0.29, canvasW * 0.39, canvasH * 0.1);

  fill(100);
  triangle(canvasW * 0.23, canvasH * 0.34, canvasW * 0.25, canvasH * 0.31, canvasW * 0.25, canvasH * 0.37);
  triangle(canvasW * 0.45, canvasH * 0.31, canvasW * 0.47, canvasH * 0.34, canvasW * 0.45, canvasH * 0.37);

  fill(160);
  rect(canvasW * 0.19, canvasH * 0.55, canvasW * 0.2, canvasH * 0.08, 5);
  rect(canvasW * 0.19, canvasH * 0.65, canvasW * 0.2, canvasH * 0.08, 5);

  fill(50);
  rect(canvasW * 0.22, canvasH * 0.83, canvasW * 0.02, canvasH * 0.1);
  rect(canvasW * 0.46, canvasH * 0.83, canvasW * 0.02, canvasH * 0.1);
  rect(canvasW * 0.19, canvasH * 0.8, canvasW * 0.32, canvasH * 0.03, 5);

  // 파출소: translate 이후 좌표계 기준으로 오른쪽에 그리기
  let policeX = canvasW * 1.2;

  fill(100);
  rect(policeX, canvasH * 0.17, canvasW * 0.7, canvasH * 0.76); // 건물 본체

  fill(255);
  rect(policeX + canvasW * 0.2, canvasH * 0.28, canvasW * 0.35, canvasH * 0.65); // 큰 문

  fill(235);
  rect(policeX + canvasW * 0.3, canvasH * 0.53, canvasW * 0.15, canvasH * 0.4); // 문 1
  rect(policeX + canvasW * 0.3, canvasH * 0.53, canvasW * 0.08, canvasH * 0.4); // 문 2

  fill(150);
  rect(policeX + canvasW * 0.2, canvasH * 0.33, canvasW * 0.35, canvasH * 0.16); // 간판 배경
  fill(200);
  rect(policeX + canvasW * 0.2, canvasH * 0.35, canvasW * 0.35, canvasH * 0.12); // 간판 내용

  pop(); // 좌표계 복원
};


//버스가 움직임
function drawBus(x,y){
push();
  fill(200);
  rect(x,y+canvasH*0.2,canvasW*0.7,canvasH*0.55,5);
  fill(250);
   rect(x+canvasW*0.1,y+canvasH*0.1,canvasW*0.1,canvasH*0.25);
   rect(x+canvasW*0.2,y+canvasH*0.1,canvasW*0.1,canvasH*0.25);
   rect(x,y+canvasH*0.1,canvasW*0.1,canvasH*0.25);
   rect(x-canvasW*0.1,y+canvasH*0.1,canvasW*0.1,canvasH*0.25);
   rect(x-canvasW*0.2,y+canvasH*0.1,canvasW*0.1,canvasH*0.25);
  fill(0);
  circle(x-canvasW*0.15,y+canvasH*0.55,canvasW*0.13);
  circle(x+canvasW*0.15,y+canvasH*0.55,canvasW*0.13);
  fill(255);
  circle(x-canvasW*0.15,y+canvasH*0.55,canvasW*0.05);
  circle(x+canvasW*0.15,y+canvasH*0.55,canvasW*0.05);
pop();
}

//주인공 경찰서로 걸어감
walkPoliceCharacter=function()
{
  push();
  rectMode(CENTER);
  let currentTime = millis(); // 현재 시간 가져오기
  let elapsedTime = currentTime - startTime;  // 경과 시간 계산

  if (elapsedTime > 0 && elapsedTime < 2000){// 내리고 버스 지나갈 때
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
  }else if((elapsedTime > 2000 && elapsedTime < 5000)||(elapsedTime > 15000 && elapsedTime < 20000)){//우는 아이 발견
    beginShape();
    fill(0);
    // 왼쪽에서 아래로 (왼쪽 바깥으로 이동)
    vertex(canvasW * 0.11, canvasH * 0.886-canvasH * 0.04);
    vertex(canvasW * 0.11, canvasH * 0.756-canvasH * 0.04); 

  // 반원 (머리 위쪽)
  bezierVertex(
    canvasW * 0.11, canvasH * 0.646-canvasH * 0.04,   // 왼쪽 곡률 제어 더 위쪽
    canvasW * 0.23, canvasH * 0.646-canvasH * 0.04,   // 오른쪽 곡률 제어 더 위쪽
    canvasW * 0.23, canvasH * 0.756-canvasH * 0.04    // 오른쪽으로 내려옴
  );

  // 오른쪽 아래로 직선
  vertex(canvasW * 0.13, canvasH * 0.906-canvasH * 0.04);

  // 아래쪽 곡선으로 왼쪽 끝 연결
  bezierVertex(
    canvasW * 0.23, canvasH * 0.906-canvasH * 0.04,   // 오른쪽 아래 곡률 제어
    canvasW * 0.1, canvasH * 0.906-canvasH * 0.04,   // 왼쪽 아래 곡률 제어
    canvasW * 0.11, canvasH * 0.866-canvasH * 0.04
  );
  endShape();
  pop();
  
  //얼굴
  push();
  fill(255);
  ellipse(canvasW * 0.17, canvasH * 0.746, canvasW * 0.1, canvasH * 0.2 );
  pop();

  //앞머리
  push();
  fill(0);
  noStroke();
  arc(canvasW * 0.17, canvasH * 0.726, canvasW * 0.12, canvasH * 0.16, PI, 0);

  //새로 생긴 머리
  rect(canvasW * 0.144, canvasH * 0.781,canvasW * 0.047, canvasH * 0.13);
  pop();

  //귀
  push();
  fill(255);
  arc(canvasW * 0.163, canvasH * 0.766, canvasW*0.02, canvasH*0.03,PI/2,PI*3/2);
  pop();

  //입 
  push();
  fill(220);
  ellipse(canvasW * 0.205, canvasH * 0.796, canvasW * 0.01875, canvasH * 0.00555);
  pop();

  //눈
  push();
  fill(0);
  ellipse(canvasW * 0.2, canvasH * 0.746, canvasW * 0.006, canvasH * 0.02);//오른른쪽
  pop();

  //몸
  push();
  fill(200);
  rect(canvasW * 0.172, canvasH * 0.946, canvasW*0.09, canvasH * 0.2, 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600));
  pop();

  push();
  fill(255);

  // 왼쪽 팔
  line(canvasW * 0.18, canvasH * 0.876, // 몸통 오른쪽 옆 시작점 
    canvasW * 0.2, canvasH * 0.996);  // 팔꿈치

  // 왼쪽 손
  circle(canvasW * 0.2, canvasH * 0.996, canvasW * 0.015); // 팔 끝에 동그라미 손
  pop();

  push();
  fill(255);
  strokeWeight(3);
  
  // 오른쪽 다리
  line(canvasW * 0.16, canvasH * 1.046, canvasW * 0.16, canvasH * 1.146);

  // 왼쪽 다리
  line(canvasW * 0.18, canvasH * 1.046, canvasW * 0.18, canvasH * 1.146);

  //발
  strokeWeight(1);
  ellipse(canvasW * 0.16, canvasH * 1.146, canvasW * 0.025, canvasW * 0.015);
  ellipse(canvasW * 0.18, canvasH * 1.146, canvasW * 0.025, canvasW * 0.015);
  }else if(elapsedTime > 5000 && elapsedTime < 15000){//우는 아이와 걸어감
    beginShape();
    fill(0);
    // 왼쪽에서 아래로 (왼쪽 바깥으로 이동)
    vertex(canvasW * 0.11, canvasH * 0.886-canvasH * 0.04);
    vertex(canvasW * 0.11, canvasH * 0.756-canvasH * 0.04); 

   // 반원 (머리 위쪽)
    bezierVertex(
      canvasW * 0.11, canvasH * 0.646-canvasH * 0.04,   // 왼쪽 곡률 제어 더 위쪽
      canvasW * 0.23, canvasH * 0.646-canvasH * 0.04,   // 오른쪽 곡률 제어 더 위쪽
      canvasW * 0.23, canvasH * 0.756-canvasH * 0.04    // 오른쪽으로 내려옴
    );

  // 오른쪽 아래로 직선
  vertex(canvasW * 0.13, canvasH * 0.906-canvasH * 0.04);

  // 아래쪽 곡선으로 왼쪽 끝 연결
  bezierVertex(
    canvasW * 0.23, canvasH * 0.906-canvasH * 0.04,   // 오른쪽 아래 곡률 제어
    canvasW * 0.1, canvasH * 0.906-canvasH * 0.04,   // 왼쪽 아래 곡률 제어
    canvasW * 0.11, canvasH * 0.866-canvasH * 0.04
  );
  endShape();
  pop();
  
  //얼굴
  push();
  fill(255);
  ellipse(canvasW * 0.17, canvasH * 0.746, canvasW * 0.1, canvasH * 0.2 );
  pop();

  //앞머리
  push();
  fill(0);
  noStroke();
  arc(canvasW * 0.17, canvasH * 0.726, canvasW * 0.12, canvasH * 0.16, PI, 0);

  //새로 생긴 머리
  rect(canvasW * 0.144, canvasH * 0.781,canvasW * 0.047, canvasH * 0.13);
  pop();

  //귀
  push();
  fill(255);
  arc(canvasW * 0.163, canvasH * 0.766, canvasW*0.02, canvasH*0.03,PI/2,PI*3/2);
  pop();

  //입 
  push();
  fill(220);
  ellipse(canvasW * 0.205, canvasH * 0.796, canvasW * 0.01875, canvasH * 0.00555);
  pop();

  //눈
  push();
  fill(0);
  ellipse(canvasW * 0.2, canvasH * 0.746, canvasW * 0.006, canvasH * 0.02);//오른른쪽
  pop();
  
  //몸
  push();
  fill(200);
  rect(canvasW * 0.172, canvasH * 0.946, canvasW*0.09, canvasH * 0.2, 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600));
  pop();
  
  push();
  fill(255);

  // 왼쪽 팔
  line(canvasW * 0.15, canvasH * 0.876, // 몸통 오른쪽 옆 시작점 
    canvasW * 0.17, canvasH * 0.996);  // 팔꿈치

  // 왼쪽 손
  circle(canvasW * 0.17, canvasH * 0.996, canvasW * 0.015); // 팔 끝에 동그라미 손

  // 오른쪽 팔
  line(canvasW * 0.218, canvasH * 0.89, // 몸통 오른쪽 옆 시작점 
    canvasW * 0.25, canvasH * 0.98);  // 팔꿈치

  // 오른쪽 손
  circle(canvasW * 0.25, canvasH * 0.98, canvasW * 0.015); // 팔 끝에 동그라미 손
  pop();

  let speed = 0.001; // 움직이는 속도 조절
  let range = 0.03; // 다리가 움직이는 범위 조절

  push();
  fill(255);
  strokeWeight(3);
  
  // 오른쪽 다리
  let rightLegX = canvasW * 0.16 + canvasH * speed * (frameCount % 20); // 20프레임마다 반복
  line(canvasW * 0.16, canvasH * 1.046, rightLegX, canvasH * 1.146);

  // 왼쪽 다리
  let leftLegX = canvasW * 0.18 - canvasH * speed * (frameCount % 20); // 20프레임마다 반복
  line(canvasW * 0.18, canvasH * 1.046, leftLegX, canvasH * 1.146);

  //발
  strokeWeight(1);
  ellipse(rightLegX + range * sin(frameCount * 0.1), canvasH * 1.146, canvasW * 0.025, canvasW * 0.015);
  ellipse(leftLegX - range * sin(frameCount * 0.1), canvasH * 1.146, canvasW * 0.025, canvasW * 0.015);
  }
  pop();
};

//우산 들고 있음
haveUmb=function(){
  push();
    rectMode(CORNER);
    translate(canvasW * 0.29, canvasH * 0.985); // 위치 설정
    scale(0.7); // 크기 축소
    //손잡이
    push();
    fill(0);
    rect(canvasW*0.08,canvasH*0.007,4,30);
    pop();
    // 우산천
    push();
    noStroke();
    fill(150);
    triangle(canvasW*0.07,canvasH*0.085,canvasW*0.065+28,canvasH*0.085,canvasW*0.065+14,canvasH*0.085+70);
    pop();
  push();
  fill(220);
  strokeWeight(4.7);
  arc(canvasW*0.095,canvasH*0.007,20,20,PI,0);
  
  pop();

};

//아이 울고 있음
cryChild = function() {
  let currentTime = millis(); // 현재 시간 가져오기
  let elapsedTime = currentTime - startTime;  // 경과 시간 계산

  if (elapsedTime > 0 && elapsedTime < 4000){
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
    noFill();
    arc(0, canvasH * 0.02, canvasW * 0.03, canvasH * 0.02, PI,0);
    pop();
  
    // 몸통
    push();
    rectMode(CENTER);
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
  } else if(elapsedTime > 4000 && elapsedTime < 15000) {
    push();
    translate(canvasW * 0.3, canvasH * 0.94); // 아이 위치 설정
    scale(0.7); // 아이 크기 축소
  
    // 얼굴
    ellipse(0, 0, canvasW * 0.08, canvasH * 0.12);

    // 머리카락
    push();
    fill(0);
    arc(-canvasW * 0.003, -canvasH * 0.02, canvasW * 0.085, canvasH * 0.15, PI, -PI/18);
    arc(0, -canvasH * 0.02, canvasW * 0.09, canvasH * 0.165, PI/2, PI);
    pop();
  
    // 눈
    fill(0);
    ellipse(canvasW * 0.02, -canvasH * 0.01, canvasW * 0.008, canvasH * 0.012);
  
    // 입
    push();
    noFill();
    arc(canvasW * 0.038, canvasH * 0.02, canvasW * 0.03, canvasH * 0.02, PI, -radians(60));
    pop();
  
    // 몸통
    push();
    rectMode(CENTER);
    fill(255);
    rect(-canvasW * 0, canvasH * 0.17, canvasW * 0.07, canvasH * 0.2, 5);
    pop();
  
    // 팔
    stroke(0);
    line(-canvasW * 0.02, canvasH * 0.1, -canvasW * 0.06, canvasH * 0.05);
    //손
    push();
    fill(255);
    ellipse(-canvasW * 0.06, canvasH * 0.05, canvasW * 0.01, canvasW * 0.01);  
    pop();
    
    //아이 다리 움직임임
    push();
    let speed = 0.002; // 움직이는 속도 조절
    let range = 0.03; // 다리가 움직이는 범위 조절
    fill(255);
    let rightLegX = -canvasW * 0.01 + canvasH * speed * (frameCount % 20); // 20프레임마다 반복
    let leftLegX = canvasW * 0.01 - canvasH * speed * (frameCount % 20); // 20프레임마다 반복
    // 다리
    line(-canvasW * 0.01, canvasH * 0.27, leftLegX, canvasH * 0.306); // 오른쪽 다리
    line(canvasW * 0.01, canvasH * 0.27, rightLegX, canvasH * 0.306); // 왼쪽 다리
    //발
    ellipse(leftLegX, canvasH * 0.306, canvasW * 0.022, canvasW * 0.008);
    ellipse(rightLegX, canvasH * 0.306, canvasW * 0.022, canvasW * 0.008);  
    pop();
  } else if (elapsedTime > 15000 && elapsedTime < 20000){
    push();
    translate(canvasW * 0.3, canvasH * 0.94); // 아이 위치 설정
    scale(0.7); // 아이 크기 축소
  
    // 얼굴
    ellipse(0, 0, canvasW * 0.08, canvasH * 0.12);

    // 머리카락
    push();
    fill(0);
    arc(-canvasW * 0.003, -canvasH * 0.02, canvasW * 0.085, canvasH * 0.15, PI, -PI/18);
    arc(0, -canvasH * 0.02, canvasW * 0.09, canvasH * 0.165, PI/2, PI);
    pop();
  
    // 눈
    fill(0);
    ellipse(canvasW * 0.02, -canvasH * 0.01, canvasW * 0.008, canvasH * 0.012);
  
    // 입
    push();
    noFill();
    arc(canvasW * 0.038, canvasH * 0.02, canvasW * 0.03, canvasH * 0.02, PI, -radians(60));
    pop();
  
    // 몸통
    push();
    rectMode(CENTER);
    fill(255);
    rect(-canvasW * 0, canvasH * 0.17, canvasW * 0.07, canvasH * 0.2, 5);
    pop();
  
    // 팔
    stroke(0);
    line(-canvasW * 0.02, canvasH * 0.1, -canvasW * 0.06, canvasH * 0.05);
    //손
    push();
    fill(255);
    ellipse(-canvasW * 0.06, canvasH * 0.05, canvasW * 0.01, canvasW * 0.01);  
    pop();

    push();
    fill(255);
    // 다리
    line(-canvasW * 0.01, canvasH * 0.27, -canvasW * 0.01, canvasH * 0.306); // 오른쪽 다리
    line(canvasW * 0.01, canvasH * 0.27, canvasW * 0.01, canvasH * 0.306); // 왼쪽 다리
    //발
    ellipse(-canvasW * 0.01, canvasH * 0.306, canvasW * 0.022, canvasW * 0.008);
    ellipse(canvasW * 0.01, canvasH * 0.306, canvasW * 0.022, canvasW * 0.008);  
    pop();    
  }
};

//아이 눈물-GPT
let tears = [];

childTears=function() {
  let currentTime = millis(); // 현재 시간 가져오기
  let elapsedTime = currentTime - startTime;  // 경과 시간 계산

  if (elapsedTime > 0 && elapsedTime < 4000){
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
    }
  };

//아이 엄마 등장
wonderMom = function() {
    rectMode(CORNER);
    let startFrame = 150; // 5초를 프레임으로 환산 (60fps 기준)
    let endFrame = 700;
    let xPosSpeed = 0;
    let finalXPos = 0; // 최종 x 위치를 저장할 변수

    if (frameCount > startFrame && frameCount < endFrame) {
      xPosSpeed = (frameCount - startFrame) * 2;
      finalXPos = -xPosSpeed;
    }
    else if(frameCount >= endFrame) {
        xPosSpeed = endFrame;
        finalXPos = -xPosSpeed; // 최종 위치 고정
    }
  let currentTime = millis(); // 현재 시간 가져오기
  let elapsedTime = currentTime - startTime;  // 경과 시간 계산

  if (elapsedTime > 0 && elapsedTime < 14000){
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
  } else if(elapsedTime > 14000 && elapsedTime < 20000) {
    push();
    translate(canvasW * 1.8 - xPosSpeed , canvasH * 0.76); // 엄마 위치 설정 (파출소 옆)
    scale(1.27); // 엄마 크기 설정 (아이보다 약간 크게)

    // 얼굴
    push();
    fill(255);
    ellipse(0, 0, canvasW * 0.09, canvasH * 0.13);
    pop();
    //머리카락
    push();
    fill(0); // 검정색 머리
    arc(canvasW * 0.003, -canvasH * 0.04, canvasW * 0.09, canvasH * 0.1, PI, 0); // 머리 스타일
    arc(0, 0, canvasW * 0.09, canvasH * 0.13, -PI/2, PI/2); // 머리 스타일
    ellipse(canvasW * 0.03, -canvasH * 0.06, canvasW * 0.04, canvasH * 0.07);
    pop();

    // 눈
    fill(0);
    ellipse(-canvasW * 0.022, -canvasH * 0.02, canvasW * 0.009, canvasH * 0.013); // 왼쪽 눈

    // 입
    push();
    noFill();
    stroke(0);
    arc(-canvasW * 0.045, canvasH * 0.02, canvasW * 0.035, canvasH * 0.02, radians(300), 0);
    pop();

    // 몸통
    push();
    rectMode(CORNER);
    fill(255);
    rect(-canvasW * 0.038, canvasH * 0.06, canvasW * 0.075, canvasH * 0.2, 5);
    pop();

    // 팔
    stroke(0);
    line(-canvasW * 0.04, canvasH * 0.07, -canvasW * 0.07, canvasH * 0.05); // 오른쪽 팔
    line(canvasW * 0.03, canvasH * 0.1, -canvasW * 0.02, canvasH * 0.05); // 왼쪽 팔

    // 손
    push();
    fill(255);
    ellipse(-canvasW * 0.07, canvasH * 0.05, canvasW * 0.012, canvasW * 0.012); // 오른쪽 손
    ellipse(-canvasW * 0.02, canvasH * 0.05, canvasW * 0.012, canvasW * 0.012); // 왼쪽 손
    pop();

    let speed = 0.002; // 움직이는 속도 조절
    let range = 0.03; // 다리가 움직이는 범위 조절
    fill(255);
    let rightLegX = -canvasW * 0.012 + canvasH * speed * (frameCount % 20); // 20프레임마다 반복
    let leftLegX = canvasW * 0.012 - canvasH * speed * (frameCount % 20); // 20프레임마다 반복
    // 다리
    push();
    strokeWeight(4);
    line(-canvasW * 0.012, canvasH * 0.26, leftLegX, canvasH * 0.31); // 오른쪽 다리
    line(canvasW * 0.012, canvasH * 0.26, rightLegX, canvasH * 0.31); // 왼쪽 다리
    pop();
    //발
    push();
    fill(255);
    ellipse(leftLegX, canvasH * 0.31, canvasW * 0.025, canvasW * 0.009);
    ellipse(rightLegX, canvasH * 0.31, canvasW * 0.025, canvasW * 0.009);  
    pop();
  }

 pop();
};

//5 함수
//배경
scene5Back=function(){
    push();
     rectMode(CORNER);
     fill(150);
      noStroke();
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
       fill(100);
    // 중앙 기둥
    rect(canvasW * 0.15, canvasH * 0.02, canvasW * 0.1, canvasH * 0.9);
    rect(canvasW * 0.15, canvasH * 0.4, canvasW * 0.1, canvasH * 0.3);
  
    stroke(255);
    strokeWeight(7);
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

//umbrella
findUmb=function(){
  push();
    rectMode(CORNER);
    translate(canvasW * 0.57, canvasH * 0.69); // 위치 설정
    scale(0.7); // 크기 축소
    //손잡이
    push();
    fill(0);
    rect(canvasW*0.08,canvasH*0.007,4,30);
    pop();
    // 우산천
    push();
    noStroke();
    fill(255,255,0);
    triangle(canvasW*0.07,canvasH*0.085,canvasW*0.065+28,canvasH*0.085,canvasW*0.065+14,canvasH*0.085+70);
    pop();
  push();
  fill(220);
  strokeWeight(4.7);
  arc(canvasW*0.095,canvasH*0.007,20,20,PI,0);
  
  pop();

};

//아이
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
  
//아이 엄마
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
    "이송연: 소품, 크레딧 디자인, 발표 PPT",
    "조윤서: 배경 디자인",
    " ",
    "코드",
    "김나연: 등장인물관련 코드 작성, 코드 합본 작성성",
    "이송연: 소품 관련 코드 작성",
    "조윤서: 배경 코드 작성, 크레딧 및 오프닝 연출",
    "AI활용",
    ": ",
    " ",
    "-Flow-",
    " ",
    " ",
    "-소감-",
    " ",
    "김나연",
    "이번 프로젝트를 통해 한 학기 동안 쌓아온 지식과 기술을",
    "실제로 구현하며 깊이 있게 이해할 수 있었습니다.",
    "팀원들과 함께 직접 부딪히고 고민하며 완성한 결과물이기에 더웃 뜻깊고",
    "이번 경험이 앞으로의 학습에도 큰 동기부여가 될 것입니다.",
    " ",
    "이송연",
    "팀원분들과 스토리를 짜고 세부사항을 의논하는 과정에서",
    "소통 능력을 기를 수 있었습니다.",
    "내가 맡은 부분에 책임을 다할 수 있도록",
    "노력하면서 성장할 수 있는 계기가 된 팀플이었습니다.",
    " ",
    "조윤서",
    "직접 프로젝트를 구현해 본다는 것이 생소하기도 했지만,",
    "다시는 해볼 수 없는 경험이라 생각하며 최선을 다했습니다.",
    "앞으로의 학업이나 진로 방향성이 it분야를 향하지 않더라도,",
    "꾸준히 개발에 대해 배우며 더웃 공부할 수 있으면 좋겠습니다.",
    "좋은 팀원분들을 만나 정말 감사했습니다.",
    ""
    ];
    
let yStart;
