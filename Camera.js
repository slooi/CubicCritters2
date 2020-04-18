console.log('Camera.js loaded')


class Camera{
	constructor(x,y,drag=1,canvasW,canvasH){
		this.x=x
		this.y=y
		this.drag=drag	// 0=>1
		this.canvasW2=canvasW/2
		this.canvasH2=canvasH/2
	}
	update(x,y){
		this.x += ((x+this.canvasW2)-this.x)*this.drag
		this.y += ((y-this.canvasH2)-this.y)*this.drag
	}
}
