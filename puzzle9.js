//创建用于存储方块编号的数组
var p=new Array(10);

p[1]=1;
p[2]=2;
p[3]=3;
p[4]=4;
p[5]=5;
p[6]=6;
p[7]=7;
p[8]=8;
p[9]=0;

//每个位置能够移动到的位置编号
var box_acce=new Array(
  [0],
  [2,4],
  [1,3,5],
  [2,6],
  [1,5,7],
  [2,4,6,8],
  [3,5,9],
  [4,8],
  [5,7,9],
  [6,8]
);

//每个格子的坐标
var box_pos=new Array(
  [0],
  [0,0],
  [150,0],
  [300,0],
  [0,150],
  [150,150],
  [300,150],
  [0,300],
  [150,300],
  [300,300]
);

//移动函数
function  move(id){
//找出方块当前所在的位置
  for (var i=1;i<10;++i){
    if(p[i]== id)
      break;
  }

//找出方块可以到达的位置编号
  var taget_id=0;
  target_id=canGo(i);
//移动方块
  if (target_id!=0) {
    p[i]=0;
    p[target_id]=id;
    moveBox(id,target_id);
  }
//检查游戏是否完成
  finishCheck();
}

function canGo(id) {
  var move_flag=false;
//从box_acce中查询可以到达的位置
  for (var j = 0; j < box_acce[id].length; ++j) {
    if (p[box_acce[id][j]]==0) {
      move_flag=true;
      break;
    }
  }
//返回找到的能够到达位置的编号
  if (move_flag == true) {
    return box_acce[id][j];
  } else {
    return 0;
  }
}


function reset(list){
//生成随机位置
do {
  for(var i=9;i>1;--i){
    var to = parseInt(Math.random()*(i-1)+1);
  //将方块移动至随机位置
    if(p[i]!=0){
      moveBox(p[i],to);
    }
    if (p[to]!=0) {
      moveBox(p[to],i);
    }
    var tem=p[to];
    p[to]=p[i];
    p[i]=tem;
  }
} while (!solvability(p));
}

function finishCheck(){

  //检查每个方块的编号是否与格子编号相同
  var finish_flag=true;

  for (var i = 1; i < 9; ++i) {
    if (p[i]!=i) {
      finish_flag=false;
      break;
    }
  }
  if(finish_flag==true){
    alert("恭喜过关");
  }
}

//移动方块至目的格
function moveBox(box_id,target){
  document.getElementById("box"+box_id).style.left=box_pos[target][0]+"px";
  document.getElementById("box"+box_id).style.top=box_pos[target][1]+"px";
}

//根据排列的奇偶性判断拼图是否能够还原
function solvability(list){
  var count=0;
  for (var i = 1; i < list.length; i++) {
    if (list[i]) {
      continue;
    }
    for (var j = 1; j < i; j++) {
      if(list[j]>list[i])
        count++;
    }
  }
  return count%2 == 0;
}
//页面加载完成时打乱方块位置，可以进行游戏
window.onload=function(){
  reset();
}
