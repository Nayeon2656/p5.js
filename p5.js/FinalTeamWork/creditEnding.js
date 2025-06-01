let canvasW, canvasH;

function setup() {
  setCanvasSize();
  createCanvas(canvasW, canvasH);
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
}


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

function setup() {
  setCanvasSize();
  createCanvas(canvasW, canvasH);
  textAlign(CENTER, CENTER);
  textSize(22);
  fill(255);
  yStart = canvasH; 
}

function draw() {
  background(0);

  for (let i = 0; i < credits.length; i++) {
    text(credits[i], canvasW / 2, yStart + i * 50);
  }

  yStart -= 1.5;
}

