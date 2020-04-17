console.log('Quad.js loaded')

const maxLayers = 4
const maxObjects = 2

class Quad{
	constructor(x,y,w,h,layer){
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.objects = []
		this.searchNum = 0
		this.layer = layer
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
			const w2 = this.w/2
			const h2 = this.h/2
			this.tl = new Quad(this.x,this.y,w2,h2, this.layer+1)
			this.tr = new Quad(this.x+w2,this.y,w2,h2, this.layer+1)
			this.bl = new Quad(this.x,this.y+h2,w2,h2, this.layer+1)
			this.br = new Quad(this.x+w2,this.y+h2,w2,h2, this.layer+1)
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

	
}

// 1) entities inside quad
// 2) entities outside quad
