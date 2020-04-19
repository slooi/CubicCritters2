'use strict'

console.log('main.js loaded')

// System variables
let fps = 60
let oldDate = -new Date()
let fWidth = canvas.width
let fHeight = canvas.height
let hWidth = canvas.width/2
let hHeight = canvas.height/2
let data = []
let grid
const inputs = inputHandler()

var debugMode = 0		// 0 - off, 1 - on

// Game variables
let critterList = []
let foodList = []
let deleteList = []
let deleteListFood = []
let player = new Player(inputs,hWidth,hHeight)
let camera = new Camera(0,0,0.5,fWidth,fHeight)
let maxPopulation = 500



function screenSetting(){

	// SPAWNING
	if(debugMode === 0){
		// default
		for(let i=0;i<500;i++){// 35000, 3000
			critterList[i] = new Critter(fWidth*Math.random()*5-fWidth*2,fWidth*Math.random()*5-fWidth*2,0,2)
		}
		for(let i=0;i<2000;i++){
			foodList[i] = 			new Food(fWidth*Math.random()*5-fWidth*2,fWidth*Math.random()*5-fWidth*2,i)
		}
	}else{
		// debugging
		for(let i=0;i<10;i++){// 35000, 3000
			critterList[i] = new Critter(fWidth*Math.random(),fHeight*Math.random(),0,1)
		}
		for(let i=0;i<100;i++){
			foodList[i] = new Food(fWidth*Math.random(),fHeight*Math.random(),i)
		}
	}

}


setup()
function setup(){
	screenSetting()
	
	critterList.push(player)

	loop()
}

function loop(){
	// if(new Date()-oldDate>1000/fps){
		
		data.length = 0
		if(debugMode === 0){
			grid = new Quad(0-fWidth*2,0-fWidth*2,fWidth*5,fWidth*5,1)
		}else{
			grid = new Quad(0,0,fWidth,fHeight,1)
		}
		// data.length = 0
	
		// SPATIAL PARTITIONING
		// critter
		for(let i=critterList.length-1;i>-1;i--){
			grid.addInit(critterList[i])
		}
		// food
		for(let i=foodList.length-1;i>-1;i--){
			grid.addInit(foodList[i])
		}
	
		// UPDATE
		// critter
		for(let i=critterList.length-1;i>-1;i--){
			const critter = critterList[i]
			critter.update(i)
			// critter.render()
		}

		// DELETE
		if(deleteList.length > 0){
			//!@#!@#!@#!@#!@# NEED TO ORDER THIS LIKE THE FOOD !#!@#!@#!@#!@#!@#!@#!@#!#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#
			for(let i=deleteList.length-1;i>-1;i--){	// IMPORTANT TO DO BACKWARDS
				critterList.splice(deleteList[i],1)
			}
			deleteList.length=0
		}
		if(deleteListFood.length > 0){
			for(let i=deleteListFood.length-1;i>-1;i--){	// IMPORTANT TO DO BACKWARDS
				// console.log(deleteListFood[i])
				foodList.splice(deleteListFood[i],1)
			}
			deleteListFood.length=0
		}

		// RENDER
		// food
		for(let i=foodList.length-1;i>-1;i--){
			const food = foodList[i]
			food.update(i)
			food.render()
		}

		camera.update(-player.x,player.y)
		
		updateResolution(camera.w,camera.h)
		updateOffset(camera.x,camera.y)
		

	
		// render
		clearCanvas()
		render()

	// 	oldDate = new Date()
	// }

	requestAnimationFrame(loop)
}



/* 
length = 0
classes?
don't create tons of objects/reuse them
Properties on objects you don't use. REMOVE THEM
Webworkers
avoid global variables => prevents memory leaks
cache
*/