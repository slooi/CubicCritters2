'use strict'
console.log('NeuralNetwork.js loaded')

class NeuralNetwork{
	constructor(){
		this.weights = []
		this.biases = []
	}
}

NeuralNetwork.prototype.build = function(structure){
	// builds a new neural network
	// structure - [2,4,5,2] => 2 inputs, 4nodes, 5nodes, 2 outputs
	for(let i=0;i<structure.length-1;i++){
		this.weights[i] = mCreate(structure[i+1],structure[i],1)
		this.biases[i] = mCreate(structure[i+1],1,1)
	}
}

NeuralNetwork.prototype.load = function(weights,biases){
	// loads an existing neural network
	this.weights = weights
	this.biases = biases
}

NeuralNetwork.prototype.feedForward = function(inputs){
	// feedForward
	// inputs - [input0,input1,input2,...]
	let currentVal=inputs
	arrToVec(currentVal) 
	for(let i=0;i<this.weights.length;i++){
		currentVal = mMulti(this.weights[i],currentVal)
		mAddSig(currentVal,this.biases[i])
	}
	return currentVal
}

NeuralNetwork.prototype.createMutatedCopy = function(amp){
	if(isNaN(amp)){
		throw new Error('ERROR: isNaN(amp)')
	}

	const newMutatedNeuralNetwork = new NeuralNetwork()
	
	// COPY
	// weights
	const weights = new Array(this.weights.length)
	for(let i=0;i<this.weights.length;i++){
		weights[i] = mCopy(this.weights[i])
		// MUTATE
		mMutate(weights[i],amp)
	}
	// biases
	const biases = new Array(this.biases.length)
	for(let i=0;i<this.biases.length;i++){
		biases[i] = mCopy(this.biases[i])
		// MUTATE
		mMutate(biases[i],amp)
	}


	// LOAD && return
	newMutatedNeuralNetwork.load(weights,biases)
	return newMutatedNeuralNetwork
}