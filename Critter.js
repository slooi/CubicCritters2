'use strict'
console.log('Critter.js loaded')

class Critter{
	constructor(x,y,dir,speed,nn){
		this.x = x
		this.y = y
		this.dir = dir
		this.speed = speed
		this.w = 16
		this.hp = 500+~~(Math.random()*1000)
		if(nn === undefined){
			this.nn = new NeuralNetwork()
			this.nn.build([16,10,10,1])
		}

		this.inputs = []
		this.deleted = false
	}
	update(i){
		this.hp--
		if(this.deleted===true){
			throw new Error('ERROR this shouldnt happen!')
		}
		if(this.hp<1){
			deleteList.push(i)		// Because we delete it LATER, multiple critters could eat this !@#!@#!@#
			this.deleted = true
		}else{
			this.inputs = []
			const numNeighbours = 4
			const turnSpeed = Math.PI*0.01

			grid.rangeQueryInit(150,numNeighbours,this)
			let neighbours = grid.foundNeighbours
			let neighboursFood = grid.foundNeighboursFood

			// !@#!@#!@# neighbour.length are not the same!
			neighbours.forEach(neighbour=>{magAngline2(this.x,this.y,neighbour.x,neighbour.y)})
			neighboursFood.forEach(food=>{angline(this.x,this.y,food.x,food.y)})
			this.foodCollisions(neighboursFood)

			// PREPROCESSING
			// REM: Handle if not enough neighbours
			// const inputs = new Array(numNeighbours).fill(1)	//!@#!@#!@# just random length TIED
			for(let i=0;i<numNeighbours*2;i+=2){	// .length NOT numNeighbours, as may not have enough neighbours
				if(neighbours[i] === undefined){
					this.inputs[i] = 1
					this.inputs[i+1] = 1
				}else{
					this.inputs[i] = Math.sqrt(  Math.pow(neighbours[i].x-this.x,2)+Math.pow(neighbours[i].y-this.y,2)  )/(1+canvas.width*20)	//TIED!@#!@#!@#
					this.inputs[i+1] = (Math.atan2(neighbours[i].y-this.y,neighbours[i].x-this.x)-this.dir)%Math.PI	//TIED!@#!@#!@#
				}
			}
			for(let i=numNeighbours*2;i<numNeighbours*4;i+=2){	// .length NOT numNeighbours, as may not have enough neighbours
				if(neighboursFood[i] === undefined){
					this.inputs[i] = 1
					this.inputs[i+1] = 1
				}else{
					this.inputs[i] = Math.sqrt(  Math.pow(neighboursFood[i].x-this.x,2)+Math.pow(neighboursFood[i].y-this.y,2)  )/(1+canvas.width*20)	//TIED
					this.inputs[i+1] = (Math.atan2(neighboursFood[i].y-this.y,neighboursFood[i].x-this.x)-this.dir)%Math.PI	//TIED!@#!@#!@#
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

			this.render()
			
		}
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
	foodCollisions(neighboursFood){
		for(let i=0;i<neighboursFood.length;i++){
			const food = neighboursFood[i]
			if(   (Math.pow(food.x-this.x,2)+Math.pow(food.y-this.y,2))   <Math.pow(this.w*0.6,2)){
				console.log('Food Eaten')
				neighboursFood[i].delete()
			}else{
				// once list is sorted, we know that preceeding food are too far to reach
				break
			}
		}
	}
}
