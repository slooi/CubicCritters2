console.log('main.js loaded')

// System variables
let fps = 30
let oldDate = -new Date()
let fWidth = canvas.width
let fHeight = canvas.height
let hWidth = canvas.width/2
let hHeight = canvas.height/2
let data = []
let grid

// Game variables
let critterList = []





setup()
function setup(){
	for(let i=0;i<500;i++){// 35000, 3000
		critterList[i] = new Critter(fWidth*Math.random(),fHeight*Math.random(),0,1)
	}

	loop()
}


function loop(){
	// if(new Date()-oldDate>1000/fps){
		data = []
		grid = new Quad(0,0,fWidth,fHeight,1)
		// data.length = 0
	
		// spatial partitioning
		for(let i=critterList.length-1;i>-1;i--){
			grid.addInit(critterList[i])
		}
	
		// update
		for(let i=critterList.length-1;i>-1;i--){
			const critter = critterList[i]
			critter.update()
			critter.render()
		}
	
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