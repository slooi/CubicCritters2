console.log('main.js loaded')

// System variables
// let fps = 60
// let oldDate = -new Date()
let hWidth = canvas.width/2
let hHeight = canvas.height/2
let data = []

// Game variables
let critterList = []





setup()
function setup(){
	for(let i=0;i<350;i++){
		critterList[i] = new Critter(hWidth,hHeight,0,1)
	}

	loop()
}


function eachTick(){
	// clear data
	data.length = 0

	// console.log('tick')
	// spatial partitioning

	// update
	for(let i=critterList.length-1;i>-1;i--){
		const critter = critterList[i]
		critter.update()
		critter.render()
	}
		// critterList.forEach(critter=>{
		// 	critter.update()
		// 	critter.render()
		// })

	// render
	clearCanvas()
	render()
}


function loop(){

	eachTick()

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