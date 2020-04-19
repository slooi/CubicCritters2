console.log('functions.js loaded')



function getAddIndex(arr,value){
	let top = arr.length
	let low = 0
	let mid
	while(low!==top){
		mid = (top+low)>>>1
		if(value>arr[mid]){
			low = mid + 1
		}else{
			top = mid
		}
	}
	return low
}
function mod(a,n) {return a - Math.floor(a/n) * n}