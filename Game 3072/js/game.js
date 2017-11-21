//捕获键盘事件
$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
			/*
			moveLeft方法完成向左移动的逻辑
			返回值为boolean类型，判断是否可以向左移动
			*/
			if (moveLeft()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 38://up
		if (moveup()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 39://right
		if (moveRight()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 40://down
		if (moveDown()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
	}
})
function moveLeft(){
	//判断是否可以向左移动
	if (!canMoveLeft(border)) {
		return false;
	}
	//向左移动
	for(var i=0;i<4;i++){
		//注意第一列不能移动
		for(var j=1;j<4;j++){
			if(border[i][j]!=0){
				for(var k=0;k<j;k++){
					//判断中间是否有空格，判断中间格子是否为空
					if(border[i][k]==0&&noBlokHorizontalCell(i,k,j,border)){
						//才能向左移动
						showMoveAnimate(i,j,i,k);
						border[i][k]=border[i][j];
						border[i][j]=0;
					}else if(border[i][k]==border[i][j]&&noBlokHorizontalCell(i,k,j,border)&&!alreadySum[i][k]){
						//才能向左移动
						showMoveAnimate(i,j,i,k);
						border[i][k] += border[i][j];
						border[i][j]=0;
						//分数累加
						score+=border[i][k];
						updateScore(score);
						//说明已经累加过一次
						alreadySum[i][k]=true;
					}
				}
			}
		}
	}
	//移动完成后初始化格子 保证200之后再执行动画
	setTimeout("UpdateboldView()",200);
	return true;
}

function moveup(){
	if(!canMoveUp(border)){
		return false;
	}
	//向上移动
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(border[i][j]!=0){
				for(var k=0;k<i;k++){
					if(border[k][j]==0&&noBlockVirticalCell(j,k,i,border)){
						//才能向上移动
						showMoveAnimate(i,j,k,j);
						border[k][j]=border[i][j];
						border[i][j]=0;
					}else if(border[k][j]==border[i][j]&&noBlockVirticalCell(j,k,i,border)&&!alreadySum[k][j]){
						//才能向上移动
						showMoveAnimate(i,j,k,j);
						border[k][j] += border[i][j];
						border[i][j]=0;
						//分数累加
						score+=border[k][j];
						updateScore(score);

						alreadySum[k][j]=true;
					}
				}
			}
		}
	}
	setTimeout("UpdateboldView()",200);
	return true;
}

function moveRight(){
	if(!canMoveRight(border)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(border[i][j]!=0){
				for(var k=3;k>j;k--){
					if(border[i][k]==0&&noBlokHorizontalCell(i,j,k,border)){
						//才能向左移动
						showMoveAnimate(i,j,i,k);
						border[i][k]=border[i][j];
						border[i][j]=0;
					}else if(border[i][k]==border[i][j]&&noBlokHorizontalCell(i,j,k,border)&&!alreadySum[i][k]){
						//才能向左移动
						showMoveAnimate(i,j,i,k);
						border[i][k] += border[i][j];
						border[i][j]=0;
						//分数累加
						score+=border[i][k];
						updateScore(score);
						alreadySum[i][k]=true;
					}
				}
			}
		}
	}
	setTimeout("UpdateboldView()",200);
	return true;
}
function moveDown(){
	if(!canMoveDown(border)){
		return false;
		}
		for(var i=2;i>=0;i--){
			for(var j=0;j<4;j++){
				if(border[i][j]!=0){
					for(var k=3;k>i;k--){
						if(border[k][j]==0&&noBlockVirticalCell(j,i,k,border)){
							showMoveAnimate(i,j,k,j);
							border[k][j]=border[i][j];
							border[i][j]=0;
						}else if(border[k][j]==border[i][j]&&noBlockVirticalCell(j,i,k,border)&&!alreadySum[k][j]){
							showMoveAnimate(i,j,k,j);
							border[k][j] += border[i][j];
							border[i][j]=0;
							//分数累加
							score+=border[k][j];
							updateScore(score);
							alreadySum[k][j]=true;
						}
					}
				}
			}
		}
	setTimeout("UpdateboldView()",200);
	return true;
}

//判断游戏是否结束
function isGameOver(){
	if(nospace(border)&&disSum(border)){
		gameover();
	}
}
function gameover(){
	$("#gride-container").append("<div id='gameover' class='gameover'><p>The Score:</p><span>" + score + "</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "500px");
    gameover.css("height", "500px");
    gameover.css("background-color", "rgba(0, 0, 0, 0.7)");
}
