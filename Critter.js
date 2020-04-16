console.log('Critter.js loaded')

class Critter{
	constructor(x,y,dir,speed){
		this.x = x
		this.y = y
		this.dir = dir
		this.speed = speed
	}
	update(){
		this.dir = Math.random()*Math.PI*2
		this.x += this.speed * Math.cos(this.dir)
		this.y += this.speed * Math.sin(this.dir)
	}
	render(){
		data.push(
			this.x,this.y,
			this.x,this.y+10,
			this.x+10,this.y,
			this.x,this.y+10,
			this.x+10,this.y+10,
			this.x+10,this.y
			)
	}
}
