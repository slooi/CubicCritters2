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
			this.nn.build([2,10,10,1])
		}
	}
	update(){
		let neighbours = grid.rangeQueryInit(0,2,this)
		// console.log(this,neighbours)
		// if(neighbours[0])
		// 	magAngline2(this.x,this.y,neighbours[0].x,neighbours[0].y)
		if(neighbours[0])
		angline(this.x,this.y,neighbours[0].x,neighbours[0].y)
		// console.log(neighbours.length)
		// neighbours.sort((a,b)=>{
		// 	if((a.x-this.x)**2+(a.y-this.y)**2 < ((b.x-this.x)**2 + (b.y-this.y)**2)){
		// 		return -1
		// 	}else{
		// 		return 1
		// 	}
		// })
		// if(neighbours[0])
		// 	magAngline2(this.x,this.y,neighbours[0].x,neighbours[0].y)
		// console.log()
		// for(let i=0;i<neighbours.length;i++){
		// }
		this.nn.feedForward([1,2])
		this.dir = Math.random()*Math.PI*2
		this.x += this.speed * Math.cos(this.dir)
		this.y += this.speed * Math.sin(this.dir)
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
