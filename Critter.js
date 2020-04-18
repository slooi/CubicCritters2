'use strict'
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

		this.inputs = []
	}
	update(){
		const numNeighbours = 2
		const turnSpeed = Math.PI*0.01
		let neighbours = grid.rangeQueryInit(150,numNeighbours,this)


		// !@#!@#!@# neighbour.length are not the same!
		neighbours.forEach(neighbour=>{magAngline2(this.x,this.y,neighbour.x,neighbour.y)})
		
		// PREPROCESSING
		// REM: Handle if not enough neighbours
		// const inputs = new Array(numNeighbours).fill(1)	//!@#!@#!@# just random length TIED
		for(let i=0;i<neighbours.length;i++){	// .length NOT numNeighbours, as may not have enough neighbours
			if(neighbours[i] === undefined){
				this.inputs[i] = Math.sqrt(  Math.pow(neighbours[i].x-this.x,2)+Math.pow(neighbours[i].y-this.y,2)  )/(1+canvas.width*2)	//TIED
			}else{
				this.inputs[i] = 1
			}
			
		}
		const output = this.nn.feedForward(this.inputs)
		this.dir += 2*turnSpeed*output[0][0]-turnSpeed
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
