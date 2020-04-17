console.log('Critter.js loaded')

class Critter{
	constructor(x,y,dir,speed,nn){
		this.x = x
		this.y = y
		this.dir = dir
		this.speed = speed
		this.w = 10
		if(nn === undefined){
			this.nn = new NeuralNetwork()
			this.nn.build([2,10,10,10,10,1])
		}
	}
	update(){
		grid.rangeQueryInit(100,2,this)
		this.nn.feedForward([1,2])
		this.dir = Math.random()*Math.PI*2
		this.x += this.speed * Math.cos(this.dir)
		this.y += this.speed * Math.sin(this.dir)
	}
	render(){
		data.push(
			this.x, 					this.y,
			this.x, 					this.y+this.w,
			this.x+this.w, 		this.y,
			this.x, 					this.y+this.w,
			this.x+this.w, 		this.y+this.w,
			this.x+this.w, 		this.y
			)
	}
}
