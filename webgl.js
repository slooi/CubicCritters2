console.log('webgl.js loaded')

// shader source
const vsSource = document.getElementById('vsSource').innerText
const fsSource = document.getElementById('fsSource').innerText

// canvas
const canvas = document.createElement('canvas')
canvas.width = 	window.innerWidth	//300	*3//window.innerWidth	//300	*3
canvas.height = window.innerHeight//300	*3//window.innerHeight//300	*3
document.body.append(canvas)

// gl
let gl = canvas.getContext('webgl')//,{antialias:false}
if(!gl){
	gl = canvas.getContext('experimental-webgl')
}
if(!gl){
	alert('ERROR: all versions of webgl are not supported. Please use an updated browser which supports webgl')
}

// viewport and clearColor and clear
gl.viewport(0,0,canvas.width,canvas.height)
// gl.viewport(0,0,100,100)
// gl.clearColor(112/255,176/255,192/255,1)
// gl.clearColor(238.0/255.0,253.0/255.0,237.0/255.0,1)
gl.clearColor(0.4,0.7,0.6,1)
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
	5*Float32Array.BYTES_PER_ELEMENT,
	0*Float32Array.BYTES_PER_ELEMENT
)
gl.enableVertexAttribArray(attribLocations.a_Position)
// pointer
gl.vertexAttribPointer(
	attribLocations.a_Color,
	3,
	gl.FLOAT,
	0,
	5*Float32Array.BYTES_PER_ELEMENT,
	2*Float32Array.BYTES_PER_ELEMENT
)
gl.enableVertexAttribArray(attribLocations.a_Color)

// uniform
gl.uniform2f(uniformLocations.u_ResModi,2/canvas.width,2/canvas.height)
gl.uniform2f(uniformLocations.u_Offset,0,0)

// data
// const data = [
// 	0,0,
// 	0,150,
// 	150,0
// ]

// render
// render()

// FUNCTIONS
function square(x,y,w){
	data.push(
		x-w/2, 					y-w/2,	238.0/255.0,	253.0/255.0,	237.0/255.0,
		x-w/2, 					y+w/2,	238.0/255.0,	253.0/255.0,	237.0/255.0,
		x+w/2, 					y-w/2,	238.0/255.0,	253.0/255.0,	237.0/255.0,
		x-w/2, 					y+w/2,	238.0/255.0,	253.0/255.0,	237.0/255.0,
		x+w/2, 					y+w/2,	238.0/255.0,	253.0/255.0,	237.0/255.0,
		x+w/2, 					y-w/2,	238.0/255.0,	253.0/255.0,	237.0/255.0,
	)
}


function updateResolution(w,h){
	gl.uniform2f(uniformLocations.u_ResModi,2/w,2/h)
}
function updateOffset(x,y){
	gl.uniform2f(uniformLocations.u_Offset,x,y)
}


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
		x1,y1,		238.0/255.0,	253.0/255.0,	237.0/255.0,
		x1+2,y1+2,238.0/255.0,	253.0/255.0,	237.0/255.0,
		x2,y2,		238.0/255.0,	253.0/255.0,	237.0/255.0,
		x2,y2,		238.0/255.0,	253.0/255.0,	237.0/255.0,
		x1+2,y1+2,238.0/255.0,	253.0/255.0,	237.0/255.0,
		x2+2,y2+2,238.0/255.0,	253.0/255.0,	237.0/255.0,
	)
}

const thick = 1
function angline(x1,y1,x2,y2,r=238.0/255.0,g=253.0/255.0,b=237.0/255.0){
	const dir = Math.atan2(y2-y1,x2-x1)
	const s = Math.sin(dir)
	const c = Math.cos(dir)
	data.push(
		x1,y1,								r,	g,	b,
		x1-thick*s,y1+thick*c,r,	g,	b,
		x2,y2,								r,	g,	b,
		x2,y2,								r,	g,	b,
		x1-thick*s,y1+thick*c,r,	g,	b,
		x2-thick*s,y2+thick*c,r,	g,	b,
	)
}


const magShort = 25
function magAnglineShort(x1,y1,dir,r=238.0/255.0,g=253.0/255.0,b=237.0/255.0){
	const c = Math.cos(dir)
	const s = Math.sin(dir)
	const x2 = x1+c*magShort
	const y2 = y1+s*magShort
	data.push(
		x1,y1,									r,	g,	b,
		x1-thick*s,y1+thick*c,	r,	g,	b,
		x2,y2,									r,	g,	b,
		x2,y2,									r,	g,	b,
		x1-thick*s,y1+thick*c,	r,	g,	b,
		x2-thick*s,y2+thick*c,	r,	g,	b,
	)
}

const mag = 25
function magAngline(x1,y1,x2,y2,r=238.0/255.0,g=253.0/255.0,b=237.0/255.0){
	const dir = Math.atan2(y2-y1,x2-x1)
	const s = Math.sin(dir)
	const c = Math.cos(dir)
	x2 = x1+c*mag
	y2 = y1+s*mag
	data.push(
		x1,y1,									r,	g,	b,
		x1-thick*s,y1+thick*c,	r,	g,	b,
		x2,y2,									r,	g,	b,
		x2,y2,									r,	g,	b,
		x1-thick*s,y1+thick*c,	r,	g,	b,
		x2-thick*s,y2+thick*c,	r,	g,	b,
	)
}

const mag2 = 15
function magAngline2(x1,y1,x2,y2,r=238.0/255.0,g=253.0/255.0,b=237.0/255.0){
	const dir = Math.atan2(y2-y1,x2-x1)
	const s = Math.sin(dir)
	const c = Math.cos(dir)
	x2 = x2-c*mag2
	y2 = y2-s*mag2
	data.push(
		x1,y1,									r,	g,	b,
		x1-thick*s,y1+thick*c,	r,	g,	b,
		x2,y2,									r,	g,	b,
		x2,y2,									r,	g,	b,
		x1-thick*s,y1+thick*c,	r,	g,	b,
		x2-thick*s,y2+thick*c,	r,	g,	b,
	)
}

function clearCanvas(){
	gl.clear(gl.COLOR_BUFFER_BIT)
}

function render(){
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW)
	gl.drawArrays(gl.TRIANGLES,0,data.length/5)
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



