function FindMinPathDijkstra(graph, idx){
	var MAX_VAL = 9999;
	var visitedNodes, minWeights;
	var tmp = 0, minIdx = 0, minVal = 0;
	minWeights = new Array(graph.length);
	visitedNodes = new Array(graph.length);
	for(var i = 0; i < graph.length; i++){
		visitedNodes[i] = 0;
		minWeights[i] = MAX_VAL;
	}
	minWeights[idx] = 0;
	do{
		minVal = minIdx = MAX_VAL;
		for(var i = 0; i < graph.length; i++){
			if(visitedNodes[i] == 0 && (minWeights[i] < minVal)){
				minVal = minWeights[i];
				minIdx = i;
			}	
		}
		if (minIdx < MAX_VAL){
			for(var i = 0; i < graph.length; i++){
				if(graph[minIdx][i] > 0){
					tmp = minVal + graph[minIdx][i];
					if(tmp < minWeights[i]) minWeights[i] = tmp;
				}
			}
			visitedNodes[minIdx] = 1;
		}
	}while(minIdx < MAX_VAL);
	return minWeights;
}