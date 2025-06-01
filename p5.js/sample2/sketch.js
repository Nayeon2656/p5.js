//3월 27일 목요일 9시까지
//얼굴만도 가능, 전신도 가능

//구상 : 꽃핀 밤 캐리커처
function setup() {
    createCanvas(400, 400);
    
    background("#191422"); //밤하늘 배경
    stroke("#251E32");
    fill("#251E32");
    rect(0,130,400,70);
    stroke("#2F2640");
    fill("#2F2640");
    rect(0,200,400,60);
    stroke("#372D4B");
    fill("#372D4B");
    rect(0,260,400,50);
    stroke("#574F66");
    fill("#574F66");
    rect(0,310,400,40);
    stroke("#777282");
    fill("#777282");
    rect(0,350,400,30);
    stroke("#97949D");
    fill("#97949D");
    rect(0,380,400,120);
    
    fill(250, 250, 0, 40);//노란 조명
    noStroke();
    //투명도 :0(완전 투명)~255(완전 불투명)
    triangle(100,0,140,400,700,400);
    
    fill("#443528");//벚꽃 나무
    noStroke();
    rect(0,150,50,250); //몸통
    strokeWeight(100); //나뭇가지
    bezier(0,200+40,60,170+40,160,110,150,100);
    
    stroke("#f3c9d8");//벚꽃잎
    strokeWeight(15);
   for (let x = 0; x <= 250; x += 10) {
      point(x, 0); // y값은 200으로 고정
   }
    for (let x = 0; x <= 245; x += 10) {
      point(x, 10); // y값은 200으로 고정
   }
    for (let x = 0; x <= 235; x += 10) {
      point(x, 20); // y값은 200으로 고정
   }
    for (let x = 0; x <= 230; x += 10) {
      point(x, 30); // y값은 200으로 고정
   }
    for (let x = 0; x <= 225; x += 10) {
      point(x, 40); // y값은 200으로 고정
   }
    for (let x = 0; x <= 220; x += 10) {
      point(x, 50); // y값은 200으로 고정
   }
    for (let x = 0; x <= 215; x += 10) {
      point(x, 60); // y값은 200으로 고정
   }
    for (let x = 0; x <= 210; x += 10) {
      point(x, 70); // y값은 200으로 고정
   }
    for (let x = 0; x <= 205; x += 10) {
      point(x, 80); // y값은 200으로 고정
   }
    for (let x = 0; x <= 200; x += 10) {
      point(x, 90); // y값은 200으로 고정
   }
    for (let x = 0; x <= 195; x += 10) {
      point(x, 100); // y값은 200으로 고정
   }
    for (let x = 0; x <= 185; x += 10) {
      point(x, 110); // y값은 200으로 고정
   }
    for (let x = 0; x <= 175; x += 10) {
      point(x, 120); // y값은 200으로 고정
   }
    for (let x = 0; x <= 165; x += 10) {
      point(x, 130); // y값은 200으로 고정
   }
    for (let x = 0; x <= 145; x += 10) {
      point(x, 140); // y값은 200으로 고정
   }
    for (let x = 0; x <= 105; x += 10) {
      point(x, 150); // y값은 200으로 고정
   }
    for (let x = 0; x <= 55; x += 10) {
      point(x, 160); // y값은 200으로 고정
   }
    stroke("#d98ba1");
    strokeWeight(6);
    for (let i = 0; i < 100; i++) { // 100개의 점을 찍음
      let x = random(width); // 랜덤 x값
      let y = random(height); // 랜덤 y값
      point(x, y); // 랜덤 위치에 점 찍기
    }
    for (let i = 0; i < 300; i++) { // 100개의 점을 찍음
      let x = random(250); // 랜덤 x값
      let y = random(160); // 랜덤 y값
      point(x, y); // 랜덤 위치에 점 찍기
    }
    stroke(255);
    for (let i = 0; i < 100; i++) { // 100개의 점을 찍음
      let x = random(width); // 랜덤 x값
      let y = random(height); // 랜덤 y값
      point(x, y); // 랜덤 위치에 점 찍기
    }
    for (let i = 0; i < 200; i++) { // 100개의 점을 찍음
      let x = random(250); // 랜덤 x값
      let y = random(160); // 랜덤 y값
      point(x, y); // 랜덤 위치에 점 찍기
    }
    
    fill("#2d1f1a"); //얼굴 아래 머리카락
    noStroke();
    rectMode(CENTER);
    rect(220,240,30,120);
    rect(280,240,30,120);
    arc(250,180,100,100,radians(180),radians(360));
    stroke("#2d1f1a");
    strokeWeight(30);
    point(212,185);
    point(210,200);
    point(209,215);
    point(208,230);
    point(207,245);
    point(206,260);
    point(288,185);
    point(290,200);
    point(291,215);
    point(292,230);
    point(293,245);
    point(294,260);
    
    noStroke(); //얼굴형
    fill("#f6ebd6"); //피부 색
    ellipse(250,200,80,100);
    
    fill("#2d1f1a"); //얼굴 위 머리카락
    rectMode(CENTER);
    rect(205,245,10,120);
    rect(295,245,10,120);
    stroke("#2d1f1a");
    strokeWeight(20);
    bezier(210,210,220,170,235,155,250,150);//옆머리
    bezier(290,190,270,170,255,155,250,150);
    point(270,160);
    
    noStroke(); //귀
    fill("#f6ebd6"); //피부 색
    ellipse(210,210,10,20);
    ellipse(290,210,10,20);
    
    stroke("#2d1f1a");//눈
    strokeWeight(1); 
    noFill();
    ellipse(232,200,15,9);
    ellipse(268,200,15,9);
    fill("#fef8f8");
    noStroke();
    ellipse(232,201,15,10);
    ellipse(268,201,15,10);
    fill("#4d4747");
    ellipse(232,200,8,8);
    ellipse(268,200,8,8);
    
    stroke("#2d1f1a"); //눈썹
    strokeWeight(4);
    line(220,185,238,187);
    line(280,185,262,187);
  
    strokeWeight(1); //속눈썹
    line(240,196,239,197);
    line(238,195,237,196);
    line(235,194,234,195);
    line(232,194,232,195);
    line(230,194,230,195);
    line(227,195,228,196);
    line(225,196,226,197);
    line(240+36,196,239+36,197);
    line(238+36,195,237+36,196);
    line(235+36,194,234+36,195);
    line(232+36,194,232+36,195);
    line(230+36,194,230+36,195);
    line(227+36,195,228+36,196);
    line(225+36,196,226+36,197);
    
    
    stroke("#e1d0ae"); //코
    strokeWeight(1);
    line(248,200+2,246,218+2);
    line(252,200+2,254,218+2);
    stroke("#2d1f1a");
    ellipse(248,220,2,1);
    ellipse(252,220,2,1);
    
    noStroke();//블러셔
    fill("#FAEDE8");
    ellipse(230,215,20,10);
    ellipse(270,215,20,10);
    
    noStroke();//입
    fill("#F0C4B2");
    ellipse(245,232,15,7);
    ellipse(255,232,15,7);
    ellipse(250,235,20,5);
    fill("#D58459");
    ellipse(250,232,20,1);
    fill(255);
    rect(249,232,7,1);
    rect(251,232,7,1);
    
    fill("#f9f7f3"); //귀걸이
    stroke("#d4d0d0");
    strokeWeight(2);
    circle(210,217,4,4);
    circle(290,217,4,4);
    
    fill("#f6ebd6"); //목
    noStroke();
    rectMode(CENTER);
    rect(250,250,30,10);
    
    fill("#19336d"); //상의
    rect(250,315,90,120);
    arc(295,280,30,50,radians(270),radians(360));
    arc(205,280,30,50,radians(180),radians(270));
    rect(215,300,50,40);
    rect(285,300,50,40);
    arc(215,320,50,50,radians(90),radians(180));
    arc(305,320,40,50,radians(0),radians(180));
    rect(315,305,20,30);
    stroke("#0B1731");
    strokeWeight(3);
    line(204,290,204,340);
    line(297,290,297,340);
    
    
    fill("#f6ebd6"); //손
    noStroke();
    ellipse(315,290,27,20);
    stroke("#f6ebd6");
    strokeWeight(10);
    line(305,272,310,290);
    line(325,273,315,290);
    
    fill("#f6ebd6"); //쇄골
    noStroke();
    arc(250,255,50,50,radians(0),radians(180));
    
    fill("#533f40"); //바지
    rect(250,390,89,30);
    stroke("#251C1D");
    strokeWeight(3);
    line(207,376,293,375);
    line(250,395,250,400);
  
  }
  
  
  
  function draw() {
  }