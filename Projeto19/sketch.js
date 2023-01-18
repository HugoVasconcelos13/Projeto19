var caminho,menino,dinheiro,diamantes,joias,espada;
var imgCaminho,imgMenino,imgDinheiro,imgDiamantes,imgJoias,imgEspada;
var colecaoTesouros = 0;
var dinheiroG,diamantesG,joiasG,grupoEspada;

//Estados de jogo
var JOGAR=1;
var ENCERRAR=0;
var estadoJogo=1;

function preload(){
  imgCaminho = loadImage("parede.png");
  imgMenino = loadImage("fantasma.png");
  imgDinheiro = loadImage("dinheiro.png");
  imgDiamantes = loadImage("diamante.png");
  imgJoias = loadImage("diamante.png");
  imgEspada = loadImage("sword.png");
  imgFim =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// movendo o plano de fundo
caminho=createSprite(width/2,200);
caminho.addImage(imgCaminho);
caminho.velocityY = 4;
caminho.scale=5;

//criando o menino correndo
menino = createSprite(width/2,height-20,20,20);
menino.addImage(imgMenino);
menino.scale=0.2;
  
  
dinheiroG=new Group();
diamantesG=new Group();
joiasG=new Group();
grupoEspada=new Group();

}

function draw() {

  if(estadoJogo===JOGAR){
  background(0);
  menino.x = World.mouseX;
  menino.y = World.mouseY;
  
  edges= createEdgeSprites();
  menino.collide(edges);
  
  //código para resetar o caminho
  if(caminho.y > height ){
    caminho.y = height/2;
  }
  
    criarDinheiro();
    criarDiamantes();
    criarJoias();
    criarEspadas();

    if (dinheiroG.isTouching(menino)) {
      dinheiroG.destroyEach();
      colecaoTesouros=colecaoTesouros + 50;
    }
    else if (diamantesG.isTouching(menino)) {
      diamantesG.destroyEach();
      colecaoTesouros=colecaoTesouros + 100;
      
    }else if(joiasG.isTouching(menino)) {
      joiasG.destroyEach();
      colecaoTesouros= colecaoTesouros + 150;
      
    }else{
      if(grupoEspada.isTouching(menino)) {
        estadoJogo=ENCERRAR;
        
        menino.addImage(imgFim);
        menino.x=width/2;
        menino.y=height/2;
        menino.scale=0.6;
        
        dinheiroG.destroyEach();
        diamantesG.destroyEach();
        joiasG.destroyEach();
        grupoEspada.destroyEach();
        
        dinheiroG.setVelocityYEach(0);
        diamantesG.setVelocityYEach(0);
        joiasG.setVelocityYEach(0);
        grupoEspada.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesouro: "+ colecaoTesouros,width-150,30);
  }

}

function criarDinheiro() {
  if (World.frameCount % 200 == 0) {
  var dinheiro = createSprite(Math.round(random(50, width-50),40, 10, 10));
  dinheiro.addImage(imgDinheiro);
  dinheiro.scale=0.12;
  dinheiro.velocityY = 5;
  dinheiro.lifetime = 200;
  dinheiroG.add(dinheiro);
  }
}

function criarDiamantes() {
  if (World.frameCount % 320 == 0) {
  var diamantes = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamantes.addImage(imgDiamantes);
  diamantes.scale=0.03;
  diamantes.velocityY = 5;
  diamantes.lifetime = 200;
  diamantesG.add(diamantes);
}
}

function criarJoias() {
  if (World.frameCount % 410 == 0) {
  var joias = createSprite(Math.round(random(50, width-50),40, 10, 10));
  joias.addImage(imgJoias);
  joias.scale=0.2;
  joias.velocityY = 5;
  joias.lifetime = 200;
  joiasG.add(joias);
  }
}

function criarEspadas(){
  if (World.frameCount % 530 == 0) {
  var espada = createSprite(Math.round(random(50, width-50),40, 10, 10));
  espada.addImage(imgEspada);
  espada.scale=0.1;
  espada.velocityY = 4;
  espada.lifetime = 200;
  grupoEspada.add(espada);
  }
}