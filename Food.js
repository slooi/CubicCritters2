console.log('Food.js loaded')


class Food{
	constructor(x,y,index){
		this.x = x
		this.y = y
		this.w = 8
		this.index = index
		this.deleted = false
	}
	render(){
		//^^
		data.push(
			this.x-this.w,this.y+this.w,					238.0/255.0,	253.0/255.0,	237.0/255.0,
			this.x,		this.y+this.w,							238.0/255.0,	253.0/255.0,	237.0/255.0,
			this.x-this.w/2,this.y,								238.0/255.0,	253.0/255.0,	237.0/255.0,
			this.x+this.w-this.w/2,this.y+this.w,	238.0/255.0,	253.0/255.0,	237.0/255.0,
			this.x-this.w/2,		this.y+this.w,		238.0/255.0,	253.0/255.0,	237.0/255.0,
			this.x+this.w/2-this.w/2,this.y,			238.0/255.0,	253.0/255.0,	237.0/255.0,
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
	update(index){
		this.index = index
	}
	delete(){
		if(this.deleted === false){
			const insertIdx = getAddIndex(deleteListFood,this.index)
			deleteListFood.splice(insertIdx,0,this.index)		// Because we delete it LATER, multiple critters could eat this!@##!@#!@#
			this.deleted = true
			return true
		}else{
			return false
		}
	}
}