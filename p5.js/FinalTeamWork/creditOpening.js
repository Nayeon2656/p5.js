let stage = 0;
let canvasW, canvasH;

function setup() {
  setCanvasSize0();
  createCanvas(canvasW, canvasH);
  textAlign(CENTER, CENTER);
  textSize(canvasH * 0.035);
  startTime = millis();
}

function setCanvasSize0() {
  if (windowWidth / windowHeight > 16 / 9) {
    canvasH = windowHeight;
    canvasW = canvasH * (16 / 9);
  } else {
    canvasW = windowWidth;
    canvasH = canvasW * (9 / 16);
  }
}




function draw() {
  background(0);

  if (stage === 0) {
    fill(255);
    text("Flows\n\n김나연\n이송연\n조윤서", width / 2, height / 2);

    if (millis() - startTime > 3000) {
      stage = 1;
      startTime = millis();
    }

  } else if (stage === 1) {
    let textfade = map(millis() - startTime, 0, 4000, 255, 0, true);
    fill(255, textfade);
    text("이어지는 불운.\n그 끝에 찾아온 것은 기적이었다.", width / 2, height / 2);
  }
}
