console.log('Quad.js loaded')

/* 		maxLayers,	maxObjects
1000		4					2
2000		5					18
3000		5					28
canvas.width = 300*3
canvas.height = 300*3
*/

/* 


3000		5					28		=>30fps 
canvas.width = 300*5
canvas.height = 300*5


*/


/* 
3000	6		28			=>		30-45fps
canvas.width = 300	*4
canvas.height = 300	*4
*/
/* 
3000	5		35			28-35 fps
canvas.width = 300	*3	
canvas.height = 300	*3
*/

const maxLayers = 5//5	//5		//5	//4
const maxObjects =6//18	//35	//18	//2

class Quad{
	constructor(x,y,w,h,layer){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.objects = []

		this.w2 = this.w*0.5
		this.h2 = this.h*0.5
		this.layer = layer

		this.midX = this.x+this.w2
		this.midY = this.y+this.h2

		this.searchNum = 0
		this.searched = false

		if(this.layer === 1){	// root
			this.outsideObjects = []
		}

		//draw
		rect(this.x,this.y,this.x+this.w,this.y+this.h)
	}
	addInit(obj){
		if(obj.x>=this.x && obj.x<this.x+this.w && obj.y >= this.y && obj.y < this.y + this.h){
			// obj in node bounds
			if(this.tl === undefined){
				// bottom node
				this.push(obj)
			}else{
				// has children
				this.addToChildren(obj)
			}
			return true
		}else{
			this.outsideObjects.push(obj)
		}
	}

	add(obj){
		if(obj.x>=this.x && obj.x<this.x+this.w && obj.y >= this.y && obj.y < this.y + this.h){
			// obj in node bounds
			if(this.tl === undefined){
				// bottom node
				this.push(obj)
			}else{
				// has children
				this.addToChildren(obj)
			}
			return true
		}else{
			return false
		}
	}
	push(obj){
		this.objects.push(obj)
		if(this.objects.length > maxObjects && this.layer<maxLayers ){
			this.tl = new Quad(this.x,					this.y,							this.w2,this.h2,this.layer+1)
			this.tr = new Quad(this.x+this.w2,	this.y,							this.w2,this.h2,this.layer+1)
			this.bl = new Quad(this.x,					this.y+this.h2,			this.w2,this.h2,this.layer+1)
			this.br = new Quad(this.x+this.w2,	this.y+this.h2,			this.w2,this.h2,this.layer+1)
		}
	}
	addToChildren(obj){
		if(this.tl.add(obj)){
		}else if(this.tr.add(obj)){
		}else if(this.bl.add(obj)){
		}else if(this.br.add(obj)){
		}else{
			console.error('ERROR: this should not be happening')
		}
	}

	rangeQueryInit(range,num,queryObj){
		// ROUGH query to all nodes within certain range around an queryObj
		// return LIST of 'num' obj

		//what about points OUTSIDE of quad? !@#!@#!@#
		this.foundNeighbours = []	// inits & resets
		this.searchedNodes = []		// inits & resets
		this.rangeQuery(Math.pow(range,2),num,queryObj,this.foundNeighbours,this.searchedNodes)

		//
		// addFoundNeighbours

		// search outside
		this.addFoundNeighbours(this.foundNeighbours,this.outsideObjects,queryObj,num)

		// if not found all 'num' objects ???
		// increase search range?
		if(this.foundNeighbours.length<num){
			// console.log(this.foundNeighbours)
			// console.log('Couldnt find all neighbours')
		}


		// RESET all searchedNodes' to searched = false 
		this.searchedNodes.forEach(node=>{
			node.searched = false
		})
		// this.searchedNodes.length = 0		//resets
		// this.foundNeighbours.length = 0	//resets

		return this.foundNeighbours
	}

	rangeQuery(range,num,queryObj,foundNeighbours,searchedNodes){

		if(this.dis2(queryObj.x,queryObj.y,this.midX,this.midY)<(Math.pow(this.w2*1.42,2)+range)){
			// if point in "range"
			if(this.tl === undefined){
				// bottom most node
				if(this.searched === false){	// wasn't going here before
					// not yet searched 

					this.addFoundNeighbours(foundNeighbours,this.objects,queryObj,num)
					this.searched = true		// this.searched
					searchedNodes.push(this)
					//!@#@!@# this.searched = true
				}

			}else{
				// not bottom node
				this.tl.rangeQuery(range,num,queryObj,foundNeighbours,searchedNodes)
				this.tr.rangeQuery(range,num,queryObj,foundNeighbours,searchedNodes)
				this.bl.rangeQuery(range,num,queryObj,foundNeighbours,searchedNodes)
				this.br.rangeQuery(range,num,queryObj,foundNeighbours,searchedNodes)
			}
		}
		
		// if(queryObj !== object)
	}

	addFoundNeighbours(foundNeighbours,nodeObjects,queryObj,num){
		let idx
		for(let i=0;i<nodeObjects.length;i++){
			const obj = nodeObjects[i]
			if(obj !== queryObj){
				// not same object
				const dis2 = this.dis2(queryObj.x,queryObj.y,obj.x,obj.y)
				idx = this.getAddIndex(foundNeighbours,dis2,obj)
				if(idx<num){
					foundNeighbours.splice(idx,0,obj)
				}
			}
		}
		if(idx>=num){
			foundNeighbours.length = num
		}
		
	}
	
	dis2(ox,oy,tx,ty){
		return Math.pow(tx-ox,2)+Math.pow(ty-oy,2)
	}

	getAddIndex(arr,value,obj){
		let top = arr.length
		let low = 0
		let mid
		while(low!==top){
			mid = (top+low)>>>1
			if(value>this.dis2(arr[mid].x,arr[mid].y,obj.x,obj.y)){
				low = mid + 1
			}else{
				top = mid
			}
		}
		return low
	}
}

// 1) entities inside quad
// 2) entities outside quad


/* 
How to speed up performance:
1) remove object check
2) use typed arrays and indices?
3) use square collisions					DOESN'T WORK
4) replace "value>this.dis2(arr[mid].x,arr[mid].y,obj.x,obj.y)" with something else => stores distances in an array or in an object  

*/