//Create variables here
var dog,happyDog;
var foodS,foodStock;
var database;
var foodObj;
var fedTime,lastFed;
var addFoods,feedDog;
var bedroom,garden,washroom;
var gameState = "hungry";
var readState;

function preload(){
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/Happy.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
}

function setup() {
  createCanvas(800, 400);
  database = firebase.database();
  
  foodObj = new Food();

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })

  feed = createButton("Feed the Dog");
  feed.position(740,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(840,95);
  addFood.mousePressed(addFoods);

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  dog = createSprite(700,200);
  dog.addImage(dogImg);
  dog.scale = 0.15;
}

function draw() {  
  background(46,139,87);

  currentTime = hour();
  if(currentTime == (lastFed+1)){
    update("playing");
    foodObj.garden();
  }else if(currentTime == (lastFed+2)){
    update("sleeping");
    foodObj.bedroom();
  }else if(currentTime == (lastFed+2) && currentTime<=4(lastFed+4)){
    update("bathing");
    foodObj.washroom();
  }else{
    update("hungry");
    foodObj.display();
  }

  if(gameState!="hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage
  }

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  foodObj.display();

  drawSprites();

  //add styles here
  push();
  textSize(16);
  fill("white");
  text("Food Remaining: "+foodS,100,30);
  pop();

  fill(255,255,254);
  textSize(15);
  if(lastFed>12){
    text("Last Feed: "+ lastFed%12 + "PM",100,55);
  } else if(lastFed == 0){
    text("Last Feed: 12AM",100,55);
  } else if(lastFed == 12){
    text("Last Feed: 12PM",100,55);
  } else{
    text("Last Feed: "+ lastFed + "AM",100,55);
  }
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function addFoods(){
  dog.addImage("dogImg1",dogImg);
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

function feedDog(){
  dog.addImage("happy",happyDog);

  if(foodObj.getFoodStock()<=0){
    foodObj.getFoodStock() = 0;
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}