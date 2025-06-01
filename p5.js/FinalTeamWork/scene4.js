//Scene4.버스에서 내려 울고있는 아이를 발견해 파출소에 데려감
let canvasW, canvasH;//캔버스 너비와 높이 선언


function setup() {
  setCanvasSize4();
  createCanvas(canvasW, canvasH);
}

function windowResized() {
  setCanvasSize4();
  resizeCanvas(canvasW, canvasH);
}

function setCanvasSize4() {
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
  scene4Back();
  //주인공
  push();
  scale(0.8);
  walkPoliceCharacter();// 주인공 함수 호출출
  cryChild(); // 아이 함수 호출
  childTears();//아이 눈물 함수 호출
  wonderMom();//아이 엄마 함수 호출
  pop();
  
  //function1-버스정류장에서 버스가 지나가고 주인공과 아이가 나타남
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

scene4Back=function()
{
  push();
    stroke(0);
  
    quad(
    canvasW * -1 , canvasH * 0.93,  // 좌상단
    canvasW * 1.1, canvasH * 0.93,  // 우상단
    canvasW * 1.1, canvasH * 0.98,  // 우하단
    canvasW * -1, canvasH * 0.98);   // 좌하단 보도블럭
  
    let startFrame = 300; // 5초를 프레임으로 환산 (60fps 기준)
    let endFrame = 600;
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

    // 정류장 전체를 묶어서 이동시키기 위해 translate() 사용
    translate(-xPosSpeed, 0);  

    // 3. 정류장 구조물
    rect(canvasW * 0.12, canvasH * 0.43,
         canvasW * 0.46, canvasH * 0.1); // 뒷받침
    rect(canvasW * 0.12, canvasH * 0.46,
         canvasW * 0.05, canvasH * 0.47); // 왼쪽 기둥
    rect(canvasW * 0.53, canvasH * 0.46,
         canvasW * 0.05, canvasH * 0.47); // 오른쪽 기둥

    rect(canvasW * 0.12, canvasH * 0.39,
         canvasW * 0.46, canvasH * 0.07); // 윗머리판
    rect(canvasW * 0.16, canvasH * 0.29,
         canvasW * 0.39, canvasH * 0.1); // 광고판

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

    //파출소

      rect(canvasW * 1.35, canvasH * 0.17,
           canvasW * 0.7, canvasH * 0.76); // 건물 본체
      rect(canvasW * 1.55, canvasH * 0.28,
           canvasW * 0.35, canvasH * 0.65); // 건물 큰 문

      rect(canvasW * 1.65, canvasH * 0.53,
           canvasW * 0.15, canvasH * 0.4); // 건물 두 번째 문
      rect(canvasW * 1.65, canvasH * 0.53,
           canvasW * 0.08, canvasH * 0.4); // 건물 두 번째 문
      rect(canvasW * 1.55, canvasH * 0.33,
           canvasW * 0.35, canvasH * 0.16); // 건물 간판
      rect(canvasW * 1.55, canvasH * 0.35,
           canvasW * 0.35, canvasH * 0.12); // 건물 간판
 pop();
};

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
  rect(canvasW * 0.172, canvasH * 0.93, canvasW*0.09, canvasH * 0.2, 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600));
  pop();
  
  //얼굴
  ellipse(canvasW * 0.17, canvasH * 0.73, canvasW * 0.1, canvasH * 0.2 );
  
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
  noFill();
  arc(0, canvasH * 0.02, canvasW * 0.03, canvasH * 0.02, PI,0);
  pop();

  // 몸통
  push();
  fill(255);
  rect(-canvasW * 0.033, canvasH * 0.06, canvasW * 0.07, canvasH * 0.2, 5);
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

//아이 엄마
wonderMom = function() {
  
    let startFrame = 300; // 5초를 프레임으로 환산 (60fps 기준)
    let endFrame = 600;
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