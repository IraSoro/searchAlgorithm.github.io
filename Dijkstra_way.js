var minLengthADij = 0;
var MAX_VAL = 9999;
function WayDijkstra(graph, idxStart, idxFinish){
	var start = idxStart;
	var end = idxFinish;
	if (start < 0 || end < 0) return false;
	if(start > graph.length || end > graph.length) return false;
	var Number;
	Number = graph.length;
	var MinWay, Ver;
	MinWay = new Array(Number);
	Ver = new Array(Number);
	minPathADij = new Array(Number);
	var k = 0, i, j;

	for (i = 0; i<Number; i++){							
    	MinWay[i] = MAX_VAL;
    	Ver[i] = 1;
	}
   
	MinWay[start] = 0;
	var min, minindex;
	var temp;
	do {
	    minindex = MAX_VAL;
	    min = MAX_VAL;
	    for ( i = 0; i < Number; i++){ 			
	      if ((Ver[i]) && (MinWay[i] < min)){			
	        min = MinWay[i];								
	        minindex = i;
	      }
	    }
		
	if (minindex != MAX_VAL){								
      for (i = 0; i<Number; i++) {
        if (graph[minindex][i] > 0) {
          temp = min + graph[minindex][i];
          if (temp < MinWay[i]){
            MinWay[i] = temp;
          }
        }
      }
      Ver[minindex] = 0;
    }
  } 
	
  while (minindex < MAX_VAL && Ver[end] != 0);
	minLengthADij = MinWay[end];
	var pos; 	
	pos = new Array(Number);
    for(i = 0; i < Number; i++){
        pos[i] = 0;
    }
  	pos[0] = end; 									
  	var k = 0; 													
 	var weight = MinWay[end]; 																	
 	while (end != start)	{								
		k++;
        for(i=0; i<Number; i++){							
			if (graph[end][i] != 0) {							
				temp = weight - graph[end][i];					
				 if (temp == MinWay[i]) {					             								
					weight = temp; 						
          			end = i;       						
          			pos[k] = i; 
										
        		}
			}
		}
	}

    var PosReturn;
    PosReturn = new Array(k);
    for (i = 0; i <= k; i++){
        PosReturn[i] = pos [i];
    }
    return PosReturn;
	
}


function GetMinLengthDij(){
	return minLengthADij;
}