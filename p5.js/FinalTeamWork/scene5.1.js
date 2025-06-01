let canvasW, canvasH;

function setup() {
  setCanvasSize55();
  createCanvas(canvasW, canvasH);
}

function windowResized() {
  setCanvasSize55();
  resizeCanvas(canvasW, canvasH);
}

function setCanvasSize55() {
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
  
  //finction2-주인공의 얼굴을 보여줌
  push();
  scale(3);
  beHappy();
  //배경-단색
  //인물-주인공이 팔을 흔드는 카메라 인터랙션
}

beHappy=function()
{
  rectMode(CENTER);
  
  // 머리카락
  push();
  beginShape();
  fill(0);
  // 왼쪽에서 아래로 (왼쪽 바깥으로 이동)
  vertex(canvasW * 0.11, canvasH * 0.32-canvasH * 0.04);
  vertex(canvasW * 0.11, canvasH * 0.21-canvasH * 0.04); 

  // 반원 (머리 위쪽)
  bezierVertex(
    canvasW * 0.11, canvasH * 0.1-canvasH * 0.04,   // 왼쪽 곡률 제어 더 위쪽
    canvasW * 0.23, canvasH * 0.1-canvasH * 0.04,   // 오른쪽 곡률 제어 더 위쪽
    canvasW * 0.23, canvasH * 0.21-canvasH * 0.04    // 오른쪽으로 내려옴
  );

  // 오른쪽 아래로 직선
  vertex(canvasW * 0.23, canvasH * 0.32-canvasH * 0.04);

  // 아래쪽 곡선으로 왼쪽 끝 연결
  bezierVertex(
    canvasW * 0.23, canvasH * 0.36-canvasH * 0.04,   // 오른쪽 아래 곡률 제어
    canvasW * 0.11, canvasH * 0.36-canvasH * 0.04,   // 왼쪽 아래 곡률 제어
    canvasW * 0.11, canvasH * 0.32-canvasH * 0.04
  );
  endShape();
  pop();
  
  //몸
  push();
  rect(canvasW * 0.172, canvasH * 0.4, canvasW*0.09, canvasH * 0.2, 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600), 20 * (canvasW / 1600));
  pop();
  
  //얼굴
  ellipse(canvasW * 0.17, canvasH * 0.2, canvasW * 0.1, canvasH * 0.2 );
  
  //앞머리
  push();
  fill(0);
  noStroke();
  arc(canvasW * 0.17, canvasH * 0.18, canvasW * 0.1, canvasH * 0.16, PI, 0);
  pop();
  
  // 입
  push();
  fill(255,0,0); // 채우기 없음
  stroke(0); // 선 색상 검정
  strokeWeight(1.5); // 선 두께
  arc(canvasW * 0.167, canvasH * 0.25, canvasW * 0.01875, canvasH * 0.01+canvasW*min(frameCount,180)*0.0001, 0, PI); // 반원 그리기
  line(canvasW * 0.176, canvasH * 0.25, canvasW * 0.158, canvasH * 0.25);
  pop();
  
  //볼 발그레
  push();
  noStroke(); // 선 없애기
  colorMode(RGB, 255); // RGB 모드로 변경
  let alphaValue = map(min(frameCount,180) % 180, 0, 180, 0, 50); // 투명도 값 계산
  fill(150, 0, 0, alphaValue); // 색상 설정 (빨간색, 투명도 조절)
  ellipse(canvasW * 0.14, canvasH * 0.23, canvasW * 0.02, canvasH * 0.02); // 오른쪽 볼
  ellipse(canvasW * 0.193, canvasH * 0.23, canvasW * 0.02, canvasH * 0.02); // 왼쪽 볼
  if(frameCount >= 180){
    fill(150, 0, 0,50);
    ellipse(canvasW * 0.14, canvasH * 0.23, canvasW * 0.02, canvasH * 0.02); // 오른쪽 볼
    ellipse(canvasW * 0.193, canvasH * 0.23, canvasW * 0.02, canvasH * 0.02); // 왼쪽 볼    
  }
  pop();

  
  //눈
  push();
  fill(0);
  ellipse(canvasW * 0.15, canvasH * 0.2, canvasW * 0.006, canvasH * 0.02);//오른쪽
  ellipse(canvasW * 0.18, canvasH * 0.2, canvasW * 0.006, canvasH * 0.02);//왼쪽
  pop();
  
  //팔
  push();
  // 오른쪽 팔 (캐릭터 기준 왼쪽) - 몸통 옆에서 나와서 위로 꺾임
  line(canvasW * 0.127, canvasH * 0.33, // 몸통 왼쪽 옆 시작점 (아까와 동일)
       canvasW * 0.11, canvasH * 0.4);  // 팔꿈치(?) 꺾이는 지점 (몸통에 가깝게, 살짝 아래로)
  line(canvasW * 0.11, canvasH * 0.4, // 팔꿈치(?) 지점부터
       canvasW * 0.15, canvasH * 0.45);  // 손 끝나는 지점 (배 근처, 몸통에 가깝게)

  // 왼쪽 팔 (캐릭터 기준 오른쪽) - 몸통 옆에서 나와서 아래로 꺾임
  line(canvasW * 0.217, canvasH * 0.33, // 몸통 오른쪽 옆 시작점 (아까와 동일)
       canvasW * 0.23, canvasH * 0.4);  // 팔꿈치(?) 꺾이는 지점 (몸통에 가깝게, 살짝 아래로)
  line(canvasW * 0.23, canvasH * 0.4, // 팔꿈치(?) 지점부터
       canvasW * 0.19, canvasH * 0.45);  // 손 끝나는 지점 (배 근처, 몸통에 가깝게)
};