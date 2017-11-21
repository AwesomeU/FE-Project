$(function(){
	newgame()
})
function newgame(){
	//初始化棋盘和数字格
	init();
	//生成两个随机位置的随机数字
	generateOneNumber();
	generateOneNumber();
}
//弹出框方法
function restartgame() {
    $("#gameover").remove();
    updateScore(0);
    newgame();
}
//为后续的二维数组首先定义javascript的一维数组
var border=new Array();
//防止进行两次累加
var alreadySum=new Array();
//初始化分数
var score=0;
function init(){
	for (var i=0; i<4; i++){
		//定义一个二位数组
		border[i]=new Array();
		alreadySum[i]=new Array();
		for(var j=0;j<4;j++){
			//初始化数据为0
			border[i][j]=0;
			alreadySum[i][j]=false;
			var cell=$("#gride-cell-"+i+"-"+j);
			//判断每个小格子距离顶端的值,基础逻辑
			cell.css("top",AwayFromTop(i,j));
			//判断每个小格子距离左端的值
			cell.css("left",AwayFromLeft(i,j));
		}
	}
	//添加一层数字显示区域
	UpdateboldView();
	score=0;
	$("#score").text(0);
}
//添加一层数字显示的区域，初始化数字格
function UpdateboldView(){
	$(".number-cell").remove();//左移的时候清除一下原来的数字
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#gride-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			var numCell=$("#number-cell-"+i+"-"+j);
			if(border[i][j]==0){
				numCell.css("width","0");
				numCell.css("height","0");
				//显示在中间
				numCell.css("top",AwayFromTop(i,j)+50);
				numCell.css("left",AwayFromLeft(i,j)+50);
			}else{
			    numCell.css("width","100px");
				numCell.css("height","100px");
				//显示在中间
				numCell.css("top",AwayFromTop(i,j));
				numCell.css("left",AwayFromLeft(i,j));
				numCell.css("background-color",getBackgroundColor(border[i][j]));
				numCell.css("color",getNumberColor(border[i][j]));
				numCell.text(border[i][j]);

			}
			alreadySum[i][j]=false;
		}
	}
}
function generateOneNumber(){
	//生成一个随机位置的随机数字

	//1.生成一个随机位置
	var rodmx=parseInt(Math.floor(Math.random()*4));
	var rodmy=parseInt(Math.floor(Math.random()*4));
	//设置死循环，判断当前位置是否为0
	while(true){
		if(border[rodmx][rodmy]==0){
			break;
		}
		var rodmx=parseInt(Math.floor(Math.random()*4));
	    var rodmy=parseInt(Math.floor(Math.random()*4));
	}
	//2.生成一个随机数字
	var number=Math.random()<0.5?3:6;
	//3.在随机的位置上显示随机的数字
	border[rodmx][rodmy]=number;
	//实现数字显示的动画
	showNumberWithAnimate(rodmx,rodmy,number);

}