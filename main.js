var arr;
var n = 11;
var cont;
var input;
var updateButton;
var matrixA;
var drawPher = false;
var pathVector = new Array();
var lengthPath = 0;
//вершины
var startV = -1;
var endV = -1;
function cancel(){
	pathVector=[];
	document.getElementById("begV").value = -1;
	document.getElementById("endV").value = -1;
	startV = endV = -1;
	DrawGraph();
}
function DrawGraph(){
	clearScreen();
	initGraph();
	startV = document.getElementById("begV").value;
	endV = document.getElementById("endV").value
	draw();
	if(pathVector.length > 0) drawPath();
	
}
function drawPath(){
	for(var i = 0; i < pathVector.length-1;i++){
		if(pheromones.length == 0 || !drawPher) newConnectVertex(coordinates[pathVector[i]],coordinates[pathVector[i+1]],0, PATH_COLOR);
		else newConnectVertex(coordinates[pathVector[i]],coordinates[pathVector[i+1]],0, PATH_COLOR);
	}
}	

//отрисовка дуг
function draw() {
	for(i=0;i<n;i++){
		var start;
		for(j=i;j<n;j++){
			if(i==j || matrix[i][j] == 0) continue;
			newConnectVertex(coordinates[i],coordinates[j],matrix[i][j], GREEN_COLOR);
		}
	}
	newdraw();
	
}
function findMinPathAStar(){
	pathVector = [];
	if(endV < 0 || matrix.length == 0 || startV < 0) return;
	result = FindPathAStar(matrix, FindMinPathDijkstra(matrix, endV), startV, endV);
	if(!result) alert('Путь не найден');
	else{
		lengthPath = GetMinPathLengthAStar();
		pathVector = GetMinPathAStar();
		DrawGraph();
	}
}

function FindMinPathDij(){
	pathVector = [];
	pathVector = WayDijkstra(matrix, startV, endV);
	lengthPath = GetMinPathLengthAStar();
	//pathVector = GetMinPathAStar();
	DrawGraph();
}

function FindMinPathAnt(){
	pathVector = [];
	FindPathAnt(matrix, 100, 100, startV,endV);
	lengthPath = GetMinLengthAnt();
	pathVector = GetMinPathAnt();
	DrawGraph();
}

function editGraph(){
	var str = this.id;
	var arr = str.split(' ');
	matrix[arr[0]][arr[1]] = Number(this.value);
	matrix[arr[1]][arr[0]] = Number(this.value);
	document.getElementById(arr[1]+' '+arr[0]).value = matrix[arr[1]][arr[0]];
	DrawGraph();
}
function pheromones_textarea(){
	var strpher='';
	if(pheromones.length!=0){
		for(var i = 0; i < pheromones.length; i++){
			for(var j = 0; j < pheromones.length; j++){
				strpher += pheromones[i][j].toFixed(2)+' '; 
			}
			strpher+='\n';
		}
	}
	document.getElementById('report').value = strpher ;
}
function chooseBegVertex(){
	startV = document.getElementById('begV').value
	DrawGraph();
}
function chooseEndVertex(){
	endV = document.getElementById('endV').value
	DrawGraph();
}
function mouseOnArr(){
	var str = this.id;
	var arr = str.split(' ');
	document.getElementById("matPos").value = 'Из верш.'+arr[0] +' в вершину '+arr[1];
}
 
	