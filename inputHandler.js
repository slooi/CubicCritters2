
console.log('inputHandler.js loaded')

function inputHandler(){
	const state = {
		w:false,
		s:false,
		a:false,
		d:false
	}

	window.addEventListener('keydown',e=>{
		const code = e.code
		switch(code){
			case 'KeyW':
				state.w = true
				break;
			case 'KeyS':
				state.s = true
				break;
			case 'KeyA':
				state.a = true
				break;
			case 'KeyD':
				state.d = true
				break;
		}
	})
	window.addEventListener('keyup',e=>{
		const code = e.code
		switch(code){
			case 'KeyW':
				state.w = false
				break;
			case 'KeyS':
				state.s = false
				break;
			case 'KeyA':
				state.a = false
				break;
			case 'KeyD':
				state.d = false
				break;
		}
	})



	return state
}

