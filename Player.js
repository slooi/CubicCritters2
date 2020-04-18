
console.log('Player.js loaded')

class Player{
	constructor(inputs,x,y){
		this.x = x
		this.y = y
		this.accel = 2
		this.w = 16
		this.inputs = inputs
		this.xVel = 0
		this.yVel = 0
		this.xDel = 0
		this.yDel = 0
	}
	update(){
		this.xDel = 0
		this.yDel = 0	
		if(this.inputs.w){
			this.yDel = -1
		}
		if(this.inputs.s){
			this.yDel = 1
		}
		if(this.inputs.a){
			this.xDel = -1
		}
		if(this.inputs.d){
			this.xDel = 1
		}

		this.xVel+=this.xDel*this.accel
		this.yVel+=this.yDel*this.accel
		this.xVel*=0.64
		this.yVel*=0.64
		this.x+=this.xVel
		this.y+=this.yVel
	}
	render(){
		data.push(
			this.x-this.w/2, 					this.y-this.w/2,
			this.x-this.w/2, 					this.y+this.w/2,
			this.x+this.w/2, 					this.y-this.w/2,
			this.x-this.w/2, 					this.y+this.w/2,
			this.x+this.w/2, 					this.y+this.w/2,
			this.x+this.w/2, 					this.y-this.w/2,
		)
	}
}