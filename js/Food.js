class Food{
  constructor(){
    this.foodStock = 20;
    this.lastFed;
    this.image = loadImage("images/Milk.png");
  }

  getFoodStock(){
    return this.foodStock;
  }

  updateFoodStock(foodStock){
    this.foodStock = foodStock;
    database.ref('/').update({
      food:this.foodStock
    })
  }

  deductFood(foodStock){
    this.foodStock = foodStock;
    if(this.foodStock<=0){
      this.foodStock = 0;
    }else{
      this.foodStock = this.foodStock-1;
    }
    
    database.ref('/').update({
      food:this.foodStock
    })
  }

  display(){
    var x=80,y=100;
    imageMode(CENTER);
    image(this.image,630,220,70,70);

    if(this.foodStock!=0){
      for(var i=0; i<this.foodStock; i++){
        if(i%10 === 0){
          x = 80;
          y = y+60;
        }
        
        x = x+30;
        image(this.image,x,y,50,50);
      }
    }
  }
}