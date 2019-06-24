function OneAnt(){
	this.visitedV = new Array();
	this.nowVertex = 0;
	this.pathLength = 0;
	this.isDead = 0;
	this.MoveTo= function(v){
		this.nowVertex = v;
		this.visitedV.push(this.nowVertex);
	}
	this.WereVisited = function(v){
		for(var i=0;i<this.visitedV.length;i++){
			if(this.visitedV[i] == v) {
				return true;
			}	
		}
		return false;
	}
	this.ClearMemory = function(){
		this.visitedV = [];
		this.pathLength = 0;
		this.isDead = 0;
		this.nowVertex = 0;
	}
	this.GetPathLength = function(){
		return this.pathLength;
	}
	this.GetNowVertex = function(){
		return this.nowVertex;
	}
	this.GetVisitedV = function(idx){
		return this.visitedV[idx];
	}
	this.GetDead = function(){
		return this.isDead;
	}
	this.SetDead = function(val){
		this.isDead = val;
	}
	this.GetPath = function(){
		return this.visitedV;
	}
}

var ALPHA = 0.9;
var BETTA = 0.1;
var EVAP = 0.01;
var Q = 8.0;
var INIT_PHER = 10.0;
var minLength = 0;
var numOfIterations = 0;
var pheromones = new Array();
var deltaPheromone = new Array();
var numOfIterations;
var minPath = new Array();
var ant = new OneAnt();

function InitContributions (graph){
	deltaPheromone = new Array (graph.length);
	for (var i=0; i<graph.length; i++){
		deltaPheromone[i] = new Array (graph.length);
		for(var j=0; j<graph.length; j++)
			deltaPheromone[i][j] = 0;
		}
}

function ClearAll(){
	deltaPheromone = [];
	minPath = [];
}

function ClearPath(){
	minPath = [];
	minLength=0;
}

function ClearContributions(){
	for(var i=0; i<deltaPheromone.length; i++)
		for(var j=0; j<deltaPheromone.length; j++)
			deltaPheromone[i][j]=0;
}

function ToContributePheromone(){
	for(var i=0; i < ant.visitedV.length - 1; i++)
		deltaPheromone[ant.GetVisitedV(i)][ant.GetVisitedV(i+1)] += Q / ant.GetPathLength();
}

function UpdatePheromone(){
	for(var i=0; i < pheromones.length; i++ )
		for(var j=0; j < pheromones.length; j++)
			pheromones[i][j] = (1.0 - EVAP)*pheromones[i][j] + deltaPheromone[i][j];
	
}

function DeadEnd(vertex){
	for(var i=0; i < vertex.length; i++){
		if(!ant.WereVisited(i) && vertex[i] > 0){return false;}
	}
	return true;
}

function ChooseNextVertex(nowVertex,vertex){
	var sum = 0;
	for(var i=0; i < vertex.length; i++){
		if(vertex[i] == 0 || ant.WereVisited(i)) continue;
		var n = 1/vertex[i];
		sum +=Math.pow(pheromones[nowVertex][i], ALPHA) * Math.pow(n,BETTA);
	}
	var probabilities = new Array();
	var idx = new Array();
	for(var i=0; i < vertex.length; i++){
		if(vertex[i] == 0 || ant.WereVisited(i)) continue;
		var n = 1 / vertex[i];
		var val = Math.pow(pheromones[nowVertex][i], ALPHA)* Math.pow(n,BETTA);
		probabilities.push(val/sum);
		idx.push(i);
	}
	var probSum = 0;
	for(var i=0;i<probabilities.length;i++) probSum+=probabilities[i];
	var randVal=Math.floor((Math.random()*101))/100;
	var right = 0;
	var left = 0;
	for(var i=0; i < probabilities.length; i++){
		right += probabilities[i];
		if(randVal >= left && randVal < right) return idx[i];
		left = right;
	}
	if(randVal > 0 && randVal <= 1) return idx[idx.length - 1];
}

function FindMax(v,idx){
	var max = 0;
	var maxIdx = -1;
	for(var i=0; i < pheromones.length; i++){
		if(v[i] == 0) continue;
		if(max < pheromones[idx][i]){
			max = pheromones[idx][i];
			maxIdx = i;
		}
	}
	return maxIdx;
}	

function ReconstructPath(graph, start, end){
	var current = start;
	minPath = [];
	minPath = new Array();
	minPath.push(current);
	while(current != end){
		var from = current;
		var to = FindMax(graph[from],from);
		current = to;
		minPath.push(to);
		minLength += graph[from][to];
	}
}

function SprayPheromone(graph){
	pheromones = [];
	pheromones = new Array(graph.length);
	for(var i=0; i < graph.length; i++){
		pheromones[i] = new Array(graph.length);
		for(var j=0; j < graph.length; j++){
			if(graph[i][j] > 0) pheromones[i][j] = INIT_PHER;
			else pheromones[i][j] = 0;
		}
	}	
}
	
function GetPheromones(){
	if(pheromones.length == 0) return null;
	return pheromones;
}

function GetPath(){
	if(minPath.length == 0) return null;
	else return minPath;
}

function GetMinLengthAnt(){
	return minLength;
} 

function GetMinPathAnt(){
	return minPath;
}

function FindPathAnt(graph, iterations, antsNum, start, end ){
	if(iterations == 0 || antsNum == 0) return false;
	if(start > graph.length || end > graph.length) return false;
	if(start < 0 || end < 0) return false;
	SprayPheromone(graph);
	ClearAll();
	InitContributions(graph);
	ClearPath();
	for(var i=0; i < iterations; i++){
		ClearContributions();
		for(var j=0; j < antsNum; j++){
			var reachedEnd = false;
			ant.ClearMemory();		//очищаем память муравью
			ant.MoveTo(start);		//помещаем в начало
			//пока не тупик
			while(!DeadEnd(graph[ant.GetNowVertex()])){
				var nextVertex = ChooseNextVertex(ant.GetNowVertex(), graph[ant.GetNowVertex()]);
				ant.pathLength += graph[ant.GetNowVertex()][nextVertex];
				ant.MoveTo(nextVertex);
				if(ant.GetNowVertex() == end){
					reachedEnd = true;
					break;
				}
			}
			if(!reachedEnd) ant.SetDead(1);
			if(!ant.GetDead()) ToContributePheromone();
		}
		UpdatePheromone();
	}
	
	ReconstructPath(graph, start, end);
	return true;
}