//Create variables here
var database;
var dog,dogImg,happyDogImg;
var foodS,foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,320);
  dog.addImage(dogImg);
  dog.scale = 0.4;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodStock);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here
  textSize(20)
  fill("white")
  stroke(46,139,87);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",10,20);
  text("Food Remaining:" + foodStock,140,160);
}

function readStock(data) {
  foodStock = data.val();
}

function writeStock(x) {
   if (x<=0){
    x=0;
   }
   else{
     x=x-1;
   }
   database.ref('/').update({
     Food:x
   })
} 



