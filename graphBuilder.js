// создание и наполнение матрицы весов	
function matrixArray(rows){
	var arr = new Array();
	for(var i=0; i<rows; i++){
		arr[i] = new Array();
			for(var j=0; j<rows; j++){
				arr[i][j] = 0;
			}
	}
	for( var i=0; i<rows; i++)
		for(j=i; j<rows; j++){
			var randVal = Math.floor((Math.random()*100)+1);
			if (randVal <= 15 || i == j) continue;
			ves=Math.floor((Math.random()*100)+1);
			arr[i][j] = arr[j][i] = ves;
			
		}
	return arr;
	
}
// инициализация графа
function initGraph(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	SCREEN_WIDTH = canvas.width;
	SCREEN_HEIGHT = canvas.height;
	CENTER_X = SCREEN_WIDTH/2;
	CENTER_Y = SCREEN_HEIGHT/2;
}