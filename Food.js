console.log('Food.js loaded')


class Food{
	constructor(x,y){
		this.x = x
		this.y = y
		this.w = 8
	}
	render(){
		//^^
		data.push(
			this.x-this.w,this.y+this.w,
			this.x,		this.y+this.w,
			this.x-this.w/2,this.y,
			this.x+this.w-this.w/2,this.y+this.w,
			this.x-this.w/2,		this.y+this.w,
			this.x+this.w/2-this.w/2,this.y,
/* 
			this.x-this.w/2,				this.y-this.w/2,
			this.x-this.w/2,				this.y+this.w/2,
			this.x+this.w/2,				this.y+this.w/2,

			this.x-this.w/2,				this.y+this.w/2,
			this.x+this.w/2,				this.y+this.w/2,
			this.x+this.w/2,				this.y-this.w/2
 */
			/* 
			
			this.x-this.w/2,				this.y-this.w/2,
			this.x-this.w/2,				this.y+this.w/2,
			this.x+this.w/2,				this.y-this.w/2,

			this.x+this.w/2,				this.y-this.w/2,
			this.x-this.w/2,				this.y+this.w/2,
			this.x+this.w/2,				this.y+this.w/2
			*/
		)
	}
}