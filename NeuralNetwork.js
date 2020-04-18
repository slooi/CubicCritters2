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