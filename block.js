class Block{
    constructor(x){
        this.width=random([200,400])
        this.body=createSprite(x,-50,300,20)
        this.body2=createSprite(x,800,300,20)
        block_Group.add(this.body)
        block_Group.add(this.body2)
    }
}