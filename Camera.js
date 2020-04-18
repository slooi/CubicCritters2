console.log('Camera.js loaded')


class Camera{
	constructor(x,y,drag=1){
		this.x=x
		this.y=y
		this.drag=drag	// 0=>1
	}
	update(x,y){
		this.x = (x-this.x)*this.drag
		this.y = (y-this.y)*this.drag
	}
}
