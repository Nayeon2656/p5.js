function setup() {
  createCanvas(400, 400);
  background(230);
  
  noFill();//원
  stroke("#ed8a8a");
  strokeWeight(10);
  circle(50,150,50);
  
  fill("#f1d8b5"); //직사각형
  strokeWeight(10);
  stroke(200);
  rect(0,230,200,80);
  
  strokeWeight(100); //왼쪽 아래 점
  stroke("#9cbec8"); 
  point(80,370); 
  
  strokeWeight(10);//정사각형
  fill("#c5cb9e");
  stroke("#d0dee2");
  square(250,50,100);
  
  stroke(225,220,30); //삼각형
  strokeWeight(5);
  fill(225,220,30);
  triangle(250,380,50,350,60,390);
  
  stroke("#b1a8a8");//지그재그
  strokeWeight(9);
  line(57+280,114+100,67+300,119+80);
  line(67+300,119+80,64+280,128+100);
  line(64+280,128+100,74+300,133+80);
  line(74+300,133+80,71+280,142+100);
  line(71+280,142+100,81+300,147+80);
  line(81+300,147+80,78+280,156+100);
  line(78+280,156+100,88+300,161+80);
  line(88+300,161+80,85+280,170+100);
  line(85+280,170+100,95+300,175+80);
  
  strokeWeight(4); //타원 아래, 정사각형 위 삼각형
  stroke("#97b689");
  noFill();
  triangle(280,150,220,80,300,100);
  
  stroke("#b67676"); //타원
  strokeWeight(10);
  fill("#b08989");
  ellipse(200,200,300,200);
  
  stroke("#e7c0c0");//지그재그 아래 점
  strokeWeight(40);
  point(370,290);
  
  strokeWeight(17); //원
  noFill();
  stroke("#ed8a8a");
  circle(300,270,100);
  
  stroke("#b1a8a8");//지그재그
  strokeWeight(7);
  //x=+10, y=+5 
  // x=+7, y=+14;
  line(57,114,67,119);
  line(67,119,64,128);
  line(64,128,74,133);
  line(74,133,71,142);
  line(71,142,81,147);
  line(81,147,78,156);
  line(78,156,88,161);
  line(88,161,85,170);
  line(85,170,95,175);
  
  stroke("#e7c0c0");//노란 형사변형 아래 점
  strokeWeight(40);
  point(210,50,35);
  
    
  noStroke(); // 노란색 사변형
  strokeWeight(3);
  fill(250,220,30);
  quad(200,60,100,110,80,80,160,20);
  fill(150,90,100);
  quad(250,350,180,380,190,390,210,330);
  
  noFill();//사변형 위 빈 원
  stroke("#ed8a8a");
  strokeWeight(7);
  circle(200,60,30);
  
  stroke(255,255,200); //타원 위 빈 원
  circle(150,250,50);
  
  noFill(); //빈 직사각형
  rectMode(CENTER);
  strokeWeight(5);
  stroke("#bbae9c");
  rect(120,290,200,80);
  rectMode(RADIUS);
  rect(50,60,30,40);
  
  stroke("#e7c0c0");//점 3개 및 기타 점들
  strokeWeight(40);
  point(360,50);
  point(80,70);
  point(30,300);
  stroke("#b76161");
  strokeWeight(30);
  point(350,30);
  point(340,360);
  point(20,40);
  stroke("#d65252");
  strokeWeight(20);
  point(340,50);
  point(20,100);
  point(200,350);
  
  
  stroke("#deedef");//호 3개
  strokeWeight(30);
  arc(340,360,70,70,radians(200),radians(300));
  stroke("#e7c0d0");
  strokeWeight(20);
  arc(340,360,70,70,radians(360),radians(200));
  strokeWeight(12);
  stroke(255);
  arc(340,360,70,70,radians(270),radians(60));
}

function draw() {
}