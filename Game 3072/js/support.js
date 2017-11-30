function AwayFromTop(i,j){
	return 20+i*120;
}
function AwayFromLeft(i,j){
	return 20+j*120;
}
//获取背景颜色
function getBackgroundColor(num){
	switch(num){
		case 3:return "#eee4da";break;
		case 6:return "#edd2b6";break;
		case 12:return "#f2b179";break;
		case 24:return "#f59563";break;
		case 48:return "#f67c5f";break;
		case 96:return "#f65e3b";break;
		case 192:return "#edcf72";break;
		case 384:return "#edcc61";break;
		case 768:return "#9c0";break;
		case 1536:return "#33b5e5";break;
		case 3072:return "#09c";break;
		case 6144:return "#a6c";break;
		case 12288:return "#93c";break;
	}
}
function getNumberColor(num){
	if (num<=4){
		return "#776e65";
	} 
	return "white";
}
//判断是否可以向左移动
function canMoveLeft(border){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if (border[i][j]!=0) {
				if(border[i][j-1]==0||border[i][j-1]==border[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断横向中间格子是否为空
function noBlokHorizontalCell(row,col1,col2,border){//目标列 当前列
	for(var i=col1+1;i<col2;i++){
		if (border[row][i]!=0) {
			return false;
		}
	}
	return true;
}
//判断是否可以向上移动
function canMoveUp(border){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(border[i][j]!=0){
				if(border[i-1][j]==0||border[i-1][j]==border[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断纵向中间格子是否为空
function noBlockVirticalCell(col,row1,row2,border){
	for(var i=row1+1;i<row2;i++){
		if(border[i][col]!=0){
			return false;
		}
	}
	return true;
}
//判断是否可以向右移动
function canMoveRight(border){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(border[i][j]!=0){
				if(border[i][j+1]==0||border[i][j+1]==border[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断是否可以向下移动
function canMoveDown(border){
	 for (var i=2; i>= 0; i--) {
        for (var j=0; j<4; j++) {
            if (border[i][j]!=0) {
                if (border[i+1][j]==0||border[i+1][j]==border[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
//修改页面分数
function updateScore(score){
	$("#score").text(score);
}
//判断格子是否已满
function nospace(border){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(border[i][j]==0){
				return false;
			}
		}
	}
	return true;
}
//判断左右个子是否有一样的
function disSum(){
	if(canMoveLeft(border)||canMoveRight(border)||canMoveUp(border)||canMoveDown(border)){
		return false;
	}
	return true;
}