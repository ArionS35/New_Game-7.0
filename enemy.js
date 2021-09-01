class Enemy{
    constructor(x){
        this.y=random([10,110,210,310,410])
        this.body=createSprite(x,this.y)
        this.body.addAnimation("enemy",e_walking1)
        this.body.scale=0.4
        this.body.velocityX=-9
    }
    gravity(){
        this.body.velocityY+=2
    }
}