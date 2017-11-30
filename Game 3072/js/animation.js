function showNumberWithAnimate(i,j,number){
	//获取当前的数字格
	var numberCell=$("#number-cell-"+i+"-"+j);
	//设置当前的数字格背景色、前景色及数字值
	numberCell.css("background-color",getBackgroundColor(number));
	numberCell.css("color",getNumberColor(number));
	numberCell.text(number);
	//设置当前数字格显示的动画
	numberCell.animate({
		width:"100px",
		height:"100px",
		top: AwayFromTop(i,j),
		left: AwayFromLeft(i,j)
	},50);
}
//移动的动画
function showMoveAnimate(fromx,fromy,tox,toy){
	//获取当前数字格元素
	var numberCell=$("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top: AwayFromTop(tox,toy),
		left: AwayFromLeft(tox,toy)
	},200);
}