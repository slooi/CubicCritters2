console.log('webgl.js loaded')

// shader source
const vsSource = document.getElementById('vsSource').innerText
const fsSource = document.getElementById('fsSource').innerText

// canvas
const canvas = document.createElement('canvas')
canvas.width = 300	*3
canvas.height = 300	*3
document.body.append(canvas)

// gl
let gl = canvas.getContext('webgl',{antialias:false})
if(!gl){
	gl = canvas.getContext('experimental-webgl')
}
if(!gl){
	alert('ERROR: all versions of webgl are not supported. Please use an updated browser which supports webgl')
}

// viewport and clearColor and clear
gl.viewport(0,0,canvas.width,canvas.height)
gl.clearColor(0,0,1,1)
gl.clear(gl.COLOR_BUFFER_BIT)  

// program
const program = buildProgram()
gl.useProgram(program)

// locations
const attribLocations = []
for(let i=0;i<gl.getProgramParameter(program,gl.ACTIVE_ATTRIBUTES);i++){
	const attribName = gl.getActiveAttrib(program,i).name
	attribLocations[attribName] = gl.getAttribLocation(program,attribName)
}

const uniformLocations = []
for(let i=0;i<gl.getProgramParameter(program,gl.ACTIVE_UNIFORMS);i++){
	const uniformName = gl.getActiveUniform(program,i).name
	uniformLocations[uniformName] = gl.getUniformLocation(program,uniformName)
}


// dataBuffer
const dataBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,dataBuffer)

// pointer
gl.vertexAttribPointer(
	attribLocations.a_Position,
	2,
	gl.FLOAT,
	0,
	0,
	0
)
gl.enableVertexAttribArray(attribLocations.a_Position)

// uniform
gl.uniform2f(uniformLocations.u_ResModi,2/canvas.width,2/canvas.height)

// data
// const data = [
// 	0,0,
// 	0,150,
// 	150,0
// ]

// render
// render()

// FUNCTIONS
// function line
function rect(x1,y1,x2,y2){
	line(x1,y1,x2,y1)// top
	line(x2,y1,x2,y2)// right
	line(x2,y2,x1,y2)// bottom
	line(x1,y2,x1,y1)// left
}


function line(x1,y1,x2,y2){
	// DOES NOT WORK WELL FOR SLANTED LINES (especially 45 degree ones)
	data.push(
		x1,y1,
		x1+2,y1+2,
		x2,y2,
		x2,y2,
		x1+2,y1+2,
		x2+2,y2+2,
	)
}

const thick = 1
function angline(x1,y1,x2,y2){
	const dir = Math.atan2(y2-y1,x2-x1)
	const s = Math.sin(dir)
	const c = Math.cos(dir)
	data.push(
		x1,y1,
		x1-thick*s,y1+thick*c,
		x2,y2,
		x2,y2,
		x1-thick*s,y1+thick*c,
		x2-thick*s,y2+thick*c
	)
}

const mag = 25
function magAngline(x1,y1,x2,y2){
	const dir = Math.atan2(y2-y1,x2-x1)
	const s = Math.sin(dir)
	const c = Math.cos(dir)
	x2 = x1+c*mag
	y2 = y1+s*mag
	data.push(
		x1,y1,
		x1-thick*s,y1+thick*c,
		x2,y2,
		x2,y2,
		x1-thick*s,y1+thick*c,
		x2-thick*s,y2+thick*c
	)
}

const mag2 = 15
function magAngline2(x1,y1,x2,y2){
	const dir = Math.atan2(y2-y1,x2-x1)
	const s = Math.sin(dir)
	const c = Math.cos(dir)
	x2 = x2-c*mag2
	y2 = y2-s*mag2
	data.push(
		x1,y1,
		x1-thick*s,y1+thick*c,
		x2,y2,
		x2,y2,
		x1-thick*s,y1+thick*c,
		x2-thick*s,y2+thick*c
	)
}

function clearCanvas(){
	gl.clear(gl.COLOR_BUFFER_BIT)
}

function render(){
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW)
	gl.drawArrays(gl.TRIANGLES,0,data.length/2)
}


function buildShader(type,source){
	const shader = gl.createShader(type)
	gl.shaderSource(shader,source)
	gl.compileShader(shader)
	
	if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
		throw new Error('ERROR: compiling shader of type '+type+' . Info: '+gl.getShaderInfoLog(shader))
	}
	return shader
}

function buildProgram(){
	const program = gl.createProgram()
	gl.attachShader(program,buildShader(gl.VERTEX_SHADER,vsSource))
	gl.attachShader(program,buildShader(gl.FRAGMENT_SHADER,fsSource))
	gl.linkProgram(program)
	gl.validateProgram(program)

	if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
		throw new Error('ERROR: linking program. Info: '+gl.getProgramInfoLog(program))
	}
	if(!gl.getProgramParameter(program,gl.VALIDATE_STATUS)){
		throw new Error('ERROR: validating program. Info: '+gl.getProgramInfoLog(program))
	}
	return program
}


// I will be drawing:
// triangles => lines



