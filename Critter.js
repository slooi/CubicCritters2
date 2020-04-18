'use strict'
console.log('Critter.js loaded')

class Critter{
	constructor(x,y,dir,speed,nn){
		this.x = x
		this.y = y
		this.dir = dir
		this.speed = speed
		this.w = 16
		if(nn === undefined){
			this.nn = new NeuralNetwork()
			this.nn.build([8,10,10,1])
		}

		this.inputs = []
	}
	update(){
		this.inputs = []
		const numNeighbours = 4
		const turnSpeed = Math.PI*0.01

		grid.rangeQueryInit(150,numNeighbours,this)
		let neighbours = grid.foundNeighbours
		let neighboursFood = grid.foundNeighboursFood

		// !@#!@#!@# neighbour.length are not the same!
		neighbours.forEach(neighbour=>{magAngline2(this.x,this.y,neighbour.x,neighbour.y)})
		neighboursFood.forEach(food=>{angline(this.x,this.y,food.x,food.y)})
		
		// PREPROCESSING
		// REM: Handle if not enough neighbours
		// const inputs = new Array(numNeighbours).fill(1)	//!@#!@#!@# just random length TIED
		for(let i=0;i<numNeighbours;i++){	// .length NOT numNeighbours, as may not have enough neighbours
			if(neighbours[i] === undefined){
				this.inputs[i] = 1
			}else{
				this.inputs[i] = Math.sqrt(  Math.pow(neighbours[i].x-this.x,2)+Math.pow(neighbours[i].y-this.y,2)  )/(1+canvas.width*20)	//TIED!@#!@#!@#
			}
		}
		for(let i=numNeighbours;i<numNeighbours*2;i++){	// .length NOT numNeighbours, as may not have enough neighbours
			if(neighboursFood[i] === undefined){
				this.inputs[i] = 1
			}else{
				this.inputs[i] = Math.sqrt(  Math.pow(neighboursFood[i].x-this.x,2)+Math.pow(neighboursFood[i].y-this.y,2)  )/(1+canvas.width*20)	//TIED
			}
		}
		// debugVar = [this,neighbours,this.inputs]
		if(this.inputs[1].length !==undefined){
			console.log(':D')
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
