'use strict'
console.log('Critter.js loaded')

class Critter{
	constructor(x,y,dir,speed,nn){
		this.x = x
		this.y = y
		this.dir = dir
		this.speed = speed
		this.w = 16
		this.hp = 500+~~(Math.random()*250)
		if(nn === undefined){
			this.nn = new NeuralNetwork()
			this.nn.build([16,10,10,1])
		}else{
			this.nn = nn
		}

		this.inputs = []
		this.deleted = false
	}
	update(i){
		this.hp--
		if(Math.abs(this.dir)>Math.PI){
			throw new Error('ERROR: this shouldt happen!')
		}
		if(this.deleted===true){
			throw new Error('ERROR this shouldnt happen!')
		}
		if(this.hp<1){
			const insertIdx = getAddIndex(deleteList,i)
			deleteList.splice(insertIdx,0,i)		// Because we delete it LATER, multiple critters could eat this!@##!@#!@#
			// deleteList.push(i)		// Because we delete it LATER, multiple critters could eat this !@#!@#!@#
			this.deleted = true
		}else{
			this.inputs = []
			const numNeighbours = 4
			const turnSpeed = Math.PI*0.2

			grid.rangeQueryInit(150,numNeighbours,this)
			let neighbours = grid.foundNeighbours
			let neighboursFood = grid.foundNeighboursFood

			// !@#!@#!@# neighbour.length are not the same!
			neighbours.forEach(neighbour=>{magAngline(this.x,this.y,neighbour.x,neighbour.y,0.35,0.9,0.9)})
			neighboursFood.forEach(food=>{angline(this.x,this.y,food.x,food.y,248.0/255.0,0.75,0.5)})//=238.0/255.0,g=253.0/255.0,b=237.0/255.0
			this.foodCollisions(neighboursFood)

			magAnglineShort(this.x,this.y,this.dir,1,0.3,0.3)

			// PREPROCESSING
			// REM: Handle if not enough neighbours
			// const inputs = new Array(numNeighbours).fill(1)	//!@#!@#!@# just random length TIED
			this.preprocess(neighbours,numNeighbours)
			this.preprocess(neighboursFood,numNeighbours)
			// debugVar = [this,neighbours,this.inputs]
			if(this.inputs[1].length !==undefined){
				console.log(':D')
			}
			// console.log(this)
			// console.log(this.inputs)
			// console.log(this)
			// console.log(this.inputs)		// !@#!@#!@# CHANGE MY INPUTS THEY ARE ALL SCREWED UP  !!@#!@#!@#!@#!@#!@#!@#
			const output = this.nn.feedForward(this.inputs)
			this.dir += 2*turnSpeed*output[0][0]-turnSpeed

			// ASSUMES critters can't turn more than 180 degrees per frame (for if else statement to work )
			// this.dir = this.dir % Math.PI*2		// this should make assumption always true !@#!@#!@#!@# CAUSES PROBLEMS
			if(this.dir<-Math.PI){
				// dir < -180
				this.dir = Math.PI*2 + this.dir
			}else if(this.dir>Math.PI){
				// dir > 180
				this.dir = -Math.PI*2 + this.dir
			}		//!@#!@#!@##!@# un tested


			this.x += this.speed * Math.cos(this.dir)
			this.y += this.speed * Math.sin(this.dir)



			this.render()
			
		}
	}
	preprocess(neighbourList,numNeighbours){
		for(let i=0;i<numNeighbours*2;i+=2){	// .length NOT numNeighbours, as may not have enough neighbours
			if(neighbourList[i] === undefined){
				// dis
				this.inputs.push(2)
				// angle
				this.inputs.push(-1)
			}else{
				// dis
				this.inputs.push(  Math.sqrt(  Math.pow(neighbourList[i].x-this.x,2)+Math.pow(neighbourList[i].y-this.y,2)  )/(1+canvas.width)		)	//TIED!@#!@#!@#
				// angle
				this.inputs.push( this.getAngle(this.dir,Math.atan2(this.y-neighbourList[i].y,this.x-neighbourList[i].x))  /Math.PI )//TIED!@#!@#!@#
				// console.log(this.getAngle(this.dir,Math.atan2(this.y-neighbourList[i].y,this.x-neighbourList[i].x))  /Math.PI)
			}
		}
	}
	getAngle(o,t){
		// returns the difference in angles from 'o'riginal to 't'arget
		// result should be from -180 to 180 in RADIANS
		const result = Math.atan2(Math.sin(t-o), Math.cos(t-o))
		if(Math.abs(result)>Math.PI){
			throw new Error('ERROR: this shouldnt be happening')
		}
		return result

		// if(Math.abs(t)>Math.PI){
		// 	throw new Error('ERROR: this shouldnt be happening')
		// }
		// if(Math.abs(o)>Math.PI){
		// 	throw new Error('ERROR: this shouldnt be happening')
		// }
		// const result = mod(t-o + 180, 360) - 180
		// if(Math.abs(result)>Math.PI*2){
		// 	throw new Error('ERROR: this shouldnt be happening')
		// }
		return result
	}
	render(){
		square(this.x,this.y,this.w)
	}
	foodCollisions(neighboursFood){
		for(let i=0;i<neighboursFood.length;i++){
			const food = neighboursFood[i]
			if(   (Math.pow(food.x-this.x,2)+Math.pow(food.y-this.y,2))   <Math.pow(this.w*0.6,2)){
				neighboursFood[i].delete()
				this.hp+=250
				this.reproduce()
			}else{
				// once list is sorted, we know that preceeding food are too far to reach
				break
			}
		}
	}
	reproduce(){
		// THIS SUDDENLY CREATES NEW CRITTERS  NOT in grid
		for(let i=0;i<4;i++){
			if(critterList.length<maxPopulation){
				const a = this.nn.createMutatedCopy(0.05)
				critterList.push(
					new Critter(this.x,this.y,this.dir,this.speed, this.nn.createMutatedCopy(0.05))
				)
			}else{
				break
			}
		}
	}
}



/* 
TO DO:
1) Inputs look scuffed, fix it
2) Find what's causing the error with the spawned critters

*/