console.log('math.js loaded')


/* 

RETURNS:

*/
function mCreate(rows,cols,amp){
	mCreateTest(rows,cols,amp)
	const newM = new Array(rows)
	for(let i=0;i<rows;i++){
		newM[i] = new Array(cols)
		for(let j=0;j<cols;j++){
			newM[i][j] = 2*amp*Math.random() - amp 
		}
	}
	return newM
}

/* 
MODIFIES m
*/
function mMutate(m,amp){
	mMutateTest(m,amp)
	const rows = m.length
	const cols = m[0].length
	for(let i=0;i<rows;i++){
		for(let j=0;j<cols;j++){
			m[i][j] += amp*2*Math.random() - amp
		}
	}
}

/* 
ASSUMES:
1) v1 and v2 are VECTORS
MODIFIES v1
*/
function mAddSig(v1,v2){
	mAddSigTest(v1,v2)
	for(let i=0;i<v1.length;i++){
		v1[i][0] = sig(v1[i][0]+v2[i][0])
	}
}

function sig(x){
	return 1/(1+Math.exp(-x))
}

/* 
m1 - matrix
v - vector
RETURNS
*/
function mMulti(m1,v){
	mMultiTest(m1,v)
	const newM = new Array(m1.length)
	let sum = 0
	for(let i=0;i<m1.length;i++){
		sum = 0
		for(let j=0;j<v.length;j++){
			sum+=m1[i][j]*v[j][0]
		}
		newM[i] = [sum]
	}
	return newM
}

//#############
// TESTS
//#############


/* 
v[0].length !== 1
m1[0].length !== m2.length
m1.length < 1 || m2.length < 1
m1[0].length < 1 || m2[0].length < 1
*/
function mMultiTest(m1,v){
	if(v[0].length !== 1){
		throw new Error('ERROR: v[0].length !== 1')
	}
	if(m1[0].length !== v.length){
		throw new Error('ERROR: m1[0].length !== v.length')
	}
	if(m1.length < 1 || v.length < 1){
		throw new Error('ERROR: m1.length < 1 || v.length < 1')
	}
	if(m1[0].length < 1 || v[0].length < 1){
		throw new Error('ERROR: m1[0].length < 1 || v[0].length < 1')
	}
}

/* 
v1.length !== v2.length
v1 or v2 NOT column matrix
*/
function mAddSigTest(v1,v2){
	if(v1.length !== v2.length){
		throw new Error('ERROR: v1.length !== v2.length')
	}
	if(v1.length < 1 || v2.length < 1){
		throw new Error('ERROR: v1.length < 1 || v2.length < 1')
	}
	if(v1[0].length !== 1 || v2[0].length !== 1){
		throw new Error('ERROR: v1[0].length !== 1 || v2[0].length !== 1')
	}
}

function mMutateTest(m,amp){
	if(m.length < 1 || m[0].length < 1){
		throw new Error('ERROR: m.length < 1 || m[0].length < 1')
	}
	if(isNaN(amp)){
		throw new Error('ERROR: isNaN(amp)')
	}
}

/* 
1) row or col === 0
2) amp is non number 
*/
function mCreateTest(rows,cols,amp){
	if(rows === 0 || cols === 0){
		throw new Error('ERROR: rows === 0 || cols === 0')
	}
	if(isNaN(amp)){
		throw new Error('ERROR: isNaN(amp)')
	}
}