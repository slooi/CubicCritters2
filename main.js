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

var debugVar

// Game variables
let critterList = []
let foodList = []
let player = new Player(inputs,hWidth,hHeight)
let camera = new Camera(0,0,0.5,fWidth,fHeight)



function screenSetting(type){
	if(type === 0){
		// default
		for(let i=0;i<500;i++){// 35000, 3000
			critterList[i] = new Critter(fWidth*Math.random()*3-fWidth,fHeight*Math.random()*3-fHeight,0,1)
		}
		for(let i=0;i<100;i++){
			foodList[i] = new Food(fWidth*Math.random()*3-fWidth,fHeight*Math.random()*3-fHeight)
		}
	}else{
		// debugging
		for(let i=0;i<10;i++){// 35000, 3000
			critterList[i] = new Critter(fWidth*Math.random(),fHeight*Math.random(),0,1)
		}
		for(let i=0;i<100;i++){
			foodList[i] = new Food(fWidth*Math.random(),fHeight*Math.random())
		}
	}

}


setup()
function setup(){
	screenSetting(0)
	
	critterList.push(player)

	loop()
}


function loop(){
	// if(new Date()-oldDate>1000/fps){
		data = []
		grid = new Quad(0-fWidth*3,0-fHeight*3,fWidth*7,fHeight*7,1)
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
			critter.update()
			critter.render()
		}
		// food
		for(let i=foodList.length-1;i>-1;i--){
			const food = foodList[i]
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