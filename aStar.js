var cameFrom;
var minPathAStar = new Array();
var minLengthAStar = 0;
var MAX_VAL = 9999;

function FindPathAStar(graph, heur, start, end){
	if (start < 0 || end < 0) return false;
	if(start > graph.length || end > graph.length) return false;
	var protocolStr='';
	minLengthAStar = 0;
	cameFrom = [];
	minPathAStar = [];
	var weightMatrix = new Array(graph.length);
	var openV = new Array(graph.length);
	var closedV = new Array(graph.length);
	var g = new Array(graph.length);
	var h = new Array(graph.length);
	var f = new Array(graph.length);
	cameFrom = new Array(graph.length);
	for(var i = 0;i <graph.length; i++){
		weightMatrix[i] = new Array(graph.length);
		for(var j=0;j<graph.length;j++){
			if(i == j){
				weightMatrix[i][j] = 0;
			}else if(graph[i][j] == 0){
				weightMatrix[i][j] = MAX_VAL;
			}else weightMatrix[i][j] = graph[i][j];
		}
		openV[i] = 0;
		closedV[i] = 0;
		cameFrom[i] = MAX_VAL;
		g[i] = 0;
		h[i] = 0;
		f[i] = 0;
	}
	openV[start] = 1;
	g[start] = 0;
	h[start] = heur[start];
	f[start] = g[start] + h[start];
	while(!EndOfOpenSet(openV)){
		var x = MinFuncValVertex(openV, f);
		if(x == end){
			ReconstructPathAStar(graph, start, end);
			return true;
		}
		
		openV[x] = 0;
		closedV[x] = 1;
		for(var y = 0; y < weightMatrix.length; y++){
			if(closedV[y] == 1)continue;
			if(weightMatrix[x][y] >= MAX_VAL) continue;
			var gNeighbourVal = g[x] + weightMatrix[x][y];
			var gBetter = new Boolean(false);
			if(openV[y] == 0 && closedV[y]!=1){
				openV[y] = 1;
				gBetter = true;
			}else{
				if(gNeighbourVal < g[y]) gBetter = true;
				else gBetter = false;
			}
			if(gBetter){
				cameFrom[y] = x;
				g[y] = gNeighbourVal;
				h[y] = heur[y];
				f[y] = g[y] + h[y];
			}
			
 		}		
	}
	return false;
}

function MinFuncValVertex(openV, f){
	var min = MAX_VAL;
	var minIdx = MAX_VAL;
	for(var i=0;i<openV.length;i++){
		if(openV[i] == 1 && f[i] < min){
			min = f[i];
			minIdx = i;
		}
	}
	return minIdx;
}

function EndOfOpenSet(openV){
	for(var i = 0;i < openV.length; i++)
		if(openV[i] == 1) return false;
	return true;
}

function ReconstructPathAStar(graph, start, end){
	var currentV = end;
	var reversePath = new Array();
	while(currentV != MAX_VAL){
		reversePath.push(currentV);
		currentV = cameFrom[currentV];
	}
	minLengthAStar = 0;
	minPathAStar.push(reversePath[reversePath.length-1]);
	for(var i=reversePath.length-1;i>=1;i--){
		minPathAStar.push(reversePath[i-1]);
		var from = reversePath[i];
		var to = reversePath[i-1];
		minLengthAStar+=graph[from][to];
	}
}

function GetMinPathAStar(){
	return minPathAStar;
}

function GetMinPathLengthAStar(){
	return minLengthAStar;
}
