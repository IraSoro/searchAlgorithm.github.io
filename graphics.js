var canvas;
var ctx;
var SCREEN_WIDTH; 
var SCREEN_HEIGHT;
var CENTER_X;
var CENTER_Y;
var bgColor = WHITE_COLOR;//цвет фона
var step = 150;
const valShift = 50;

var matrix = [
			[0,51,0,0,12,84,0,0,0,0,0],//0
			[51,0,25,0,0,0,0,0,0,0,76],//1
			[0,25,0,75,0,0,31,0,0,0,0],//2
			[0,0,75,0,0,0,0,62,0,0,0],//3
			[12,0,0,0,0,44,0,0,0,0,0],//4
			[84,0,0,0,44,0,0,0,93,0,15],//5
			[0,0,31,0,0,0,0,2,0,0,25],//6
			[0,0,0,62,0,0,2,0,0,0,35],//7
			[0,0,0,0,0,93,0,0,0,14,0],//8
			[0,0,0,0,0,0,0,0,14,0,45],//9
			[0,76,0,0,0,15,25,35,0,45,0]//10
			];
var coordinates = [
	[150,150],
	[300,150],
	[450,150],
	[600,150],
	[150,300],
	[300,300],
	[450,300],
	[600,300],
	[150,450],
	[300,450],
	[450,450]
]; 
function newdraw(){
	for(var i = 0; i <n; i++){
		if(i == startV)	{
			drawFilledCirlce(coordinates[i][0], coordinates[i][1], 10, STARTV_COLOR);
			drawText(coordinates[i][0]-4, coordinates[i][1]+5, 12, i, WHITE_COLOR);
		}else if (i == endV) {
			drawFilledCirlce(coordinates[i][0], coordinates[i][1], 10, ENDV_COLOR);
			drawText(coordinates[i][0]-4,coordinates[i][1]+5, 12, i, WHITE_COLOR);
		}else { 
			drawFilledCirlce(coordinates[i][0], coordinates[i][1], 10, WHITE_COLOR);
			drawCircle(coordinates[i][0], coordinates[i][1], 10, BLACK_COLOR);
			drawText(coordinates[i][0]-4, coordinates[i][1]+5, 12, i, BLACK_COLOR);
		}
	}
	
}

function newConnectVertex(v1, v2, weight,lineColor){
	drawLine(v1[0], v1[1], v2[0], v2[1], lineColor);
	var fullLen = (Math.sqrt(Math.pow((v2[0]-v1[0]),2)+Math.pow((v2[1]-v1[1]),2)));
	if(weight == 0) return;
	textX = Math.round(v1[0] + (v2[0] -v1[0]) * (valShift / fullLen));
	textY = Math.round(v1[1] + (v2[1] - v1[1]) * (valShift / fullLen));
	FillRect(textX-9, textY-12, 15,15, BLACK_COLOR);
	drawText(textX-7,textY+4, 12,  weight,  BLACK_COLOR);
}
// очистка экрана 
function clearScreen(){
	ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}
//заливка фона определенным цветом
function drawBackground(){
	ctx.strokeStyle = WHITE_COLOR;
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}
//отрисовка текста
function drawText(xPos, yPos, fontSize, val, fontColor){
	ctx.fillStyle = fontColor;
	//ctx.strokeStyle = fontColor;
	ctx.font = fontSize+"px Arial";
	ctx.fillText(val, xPos, yPos); 
	ctx.fillStyle = BLACK_COLOR;
}
//рисование линии с заданным цветом
function drawLine(x1, y1, x2, y2, lineColor){
	ctx.strokeStyle = lineColor;
	ctx.beginPath(); 
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}
//отрисовка эллипса
function drawCircle(xPos, yPos, radius, circleColor){
	ctx.strokeStyle = circleColor;
	ctx.beginPath();
	ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
	ctx.stroke();
}
function FillRect(xPos,yPos, width, height, squareColor){
	ctx.fillStyle=WHITE_COLOR;
	ctx.beginPath();
	ctx.fillRect(xPos,yPos, width, height);
	ctx.stroke();
	
}
// контур вершин
function drawFilledCirlce(xPos, yPos, radius, circleColor){
	ctx.fillStyle = circleColor;
	ctx.beginPath();
	ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
	ctx.fill();
}
// динамическое добавление текстовых полей
function addTextFields(){
	var cont = document.getElementById('text');
	if (DrawGraph.onclick)
		document.getElementById('text').innerHTML = '';
	for(i=0;i<n;i++){
		for (j=0;j<n;j++){
			var input = document.createElement('input');
			input.type = 'text';
			input.value = matrix[i][j];
			input.size=1;
			input.id=i+' '+j;
			input.onchange = editGraph;
			input.onmouseenter = mouseOnArr;
            cont.appendChild(input);
			if (j==n-1) cont.appendChild(document.createElement('br'));
		}	
	}
	DrawGraph();
}