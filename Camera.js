console.log('Camera.js loaded')


class Camera{
	constructor(x,y,drag=1,w,h){
		this.x=x
		this.y=y
		this.drag=drag	// 0=>1
		this.w=w
		this.h=h
	}
	update(x,y){
		const newX = ((x+this.w/2)-this.x)*this.drag
		const newY = ((y-this.h/2)-this.y)*this.drag
		this.x += newX
		this.y += newY
	}
}
