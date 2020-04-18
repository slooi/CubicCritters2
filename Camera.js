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
		const offsetX = (x+this.w/2)-this.x
		const offsetY = (y-this.h/2)-this.y
		const newX = offsetX*this.drag
		const newY = offsetY*this.drag
		this.x += newX
		this.y += newY
		const hasChange = newX !== this.x || newY !== this.y
		if(Math.abs(newX-offsetX)<0.01 && Math.abs(newY-offsetY)<0.01){
			this.x = offsetX
			this.y = offsetY
		}else{
			this.x += newX
			this.y += newY
		}
		if(hasChange){
			//re-render
			return true
		}
		return false
	}
}
