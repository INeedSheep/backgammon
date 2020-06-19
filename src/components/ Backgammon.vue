<template>
  <div class="hello" >
     <el-container>
      
     <el-header>
      
       <div class="left" >
       <el-image
      style="width: 600px; height: 110px"
      :src="url"
     >
      </el-image> 
      </div>
    </el-header>
 <el-container>
   
    <el-main>
      <canvas id="mychess" ref="chess" width="450px" height="450px">	
    	</canvas>
    </el-main>
     <el-aside width="200px">
 
    </el-aside>
    </el-container>
    </el-container>
  </div>
</template>

<script>


export default {
  name: 'Backgammon',

  data () {
    return {
              
               url:'../../static/ziti.gif',
               chess:  null,
               context : null,
               chessBoard : [],
               me : true,
               over : false,
               wins : [],
               myWin : [],
               computerWin : [],
               count : 0,//多少种解法
               history: [], //历史记录位置
               stepHistory: 0,
               step: 0, //记录当前步数
    }
  },
  created:function(){
    this.init();
  },
  mounted:function(){
          
          const myChess = document.getElementById("mychess");
          this.chess = this.$refs.chess;
          
          this.context = this.chess.getContext('2d');
					if (!myChess.getContext('2d')) {
						 this.$message({
                message: '警告哦，当前浏览器不支持Canvas',
                type: 'warning'
              });
					} else {
						console.log("当前浏览器支持Canvas");
						this.drawpieceBoard();
						const chess = this.$refs.chess;
						// 添加点击监听事件 
						chess.addEventListener("click", e => {
							    this.step++;
                  this.history.length = this.step;
					        if(this.over){
                    return;
                  }
                  if(!this.me){
                    return;
                  }
                  var x = e.offsetX;
                  var y = e.offsetY;
                  var i = Math.floor(x / 30); //Math.floor向下取整
                  var j = Math.floor(y / 30);
                  if(this.chessBoard[i][j] == 0){
                    this.oneStep(i, j, this.me);		
                    this.history.push({
                        i,
                        j,
                        color: "black"
                      });
                    this.chessBoard[i][j] = 1;
                    
                    for(var k = 0; k < this.count; k++){
                      if(this.wins[i][j][k]){
                        this.myWin[k]++;
                        //this.computerWin[k] = 6;
                        if(this.myWin[k] == 5){
                          this.$message({
                            showClose: true,
                            message: '你可真聪明，你赢啦～',
                            type: 'success'
                          });
                          this.over = true;
                        }
                      }
                    }
                    if(!this.over){
                      this.me = !this.me;
                      this.computerAI();
                    }
                  }
						
						});
          }
  },
   methods: {
        
     init:function(){
        for(var i=0; i<15; i++){
                    this.chessBoard[i] = [];
                    for(var j=0; j<15; j++){
                      this.chessBoard[i][j] = 0;
                    }
            }

            for(var i=0; i<15; i++){
                  this.wins[i] = [];
                  for(var j=0; j<15; j++){
                    this.wins[i][j] = [];
                  }
            }
            //横线
            for(var i = 0; i < 15; i++){
              for(var j= 0; j < 11; j++){
                for(var k = 0; k < 5; k++){
                  this.wins[i][j+k][this.count] = true;
                }
                this.count++;
              }
            }
            //竖线
            for(var i = 0; i < 15; i++){
              for(var j= 0; j < 11; j++){
                for(var k = 0; k < 5; k++){
                  this.wins[j+k][i][this.count] = true;
                }
                this.count++;
              }
            }
            //斜线
            for(var i = 0; i < 11; i++){
              for(var j= 0; j < 11; j++){
                for(var k = 0; k < 5; k++){
                  this.wins[i+k][j+k][this.count] = true;
                }
                this.count++;
              }
            }
            //反斜线
            for(var i = 0; i < 11; i++){
              for(var j= 14; j > 3; j--){
                for(var k = 0; k < 5; k++){
                  this.wins[i+k][j-k][this.count] = true;
                }
                this.count++;
              }
            }
            console.log(this.count);

            for(var i = 0; i < this.count; i++){
              this.myWin[i] = 0;
              this.computerWin[i] = 0;
            }
     },
     //AI下棋
     computerAI:function(){
              this.step++;
              this.history.length = this.step;
              var myScore = [];
                var computerScore = [];
                var max = 0;
                var u = 0, v = 0;
                for(var i = 0; i < 15; i++){
                  myScore[i] = [];
                  computerScore[i] = [];
                  for(var j = 0; j < 15; j++){
                    myScore[i][j] = 0;
                    computerScore[i][j] = 0;
                  }
                }
                for(var i = 0; i < 15; i++){
                  for(var j = 0; j < 15; j++){
                    if(this.chessBoard[i][j] == 0){
                      var three = 0;
                      for(var k = 0; k < this.count; k++){
                        if(this.wins[i][j][k]){
                          if(this.computerWin[k] == 0){
                            if(this.myWin[k] == 1){
                            myScore[i][j] += 200;
                          }
                          else if(this.myWin[k] == 2){
                            myScore[i][j] += 500;
                          }
                          else if(this.myWin[k] == 3){
                            myScore[i][j] += 900;
                          }
                          else if(this.myWin[k] == 4){
                            myScore[i][j] += 2600;
                          }

                          }
                          if(this.myWin[k] == 0){
                            if(this.computerWin[k] == 1){
                            computerScore[i][j] += 210;
                          }
                          else if(this.computerWin[k] == 2){
                            computerScore[i][j] += 520;
                          }
                          else if(this.computerWin[k] == 3){
                            computerScore[i][j] += 930;
                            three++;
                          }
                          else if(this.computerWin[k] == 4){
                            computerScore[i][j] += 5000;
                          }
                          }
                          if(this.myWin[k] == 3 && this.computerWin[k] == 1)
                            myScore[i][j] -= 800;
                        }
                      }
                      if(three >= 2)
                        computerScore[i][j] += 500;
                      console.log(i+","+j+":"+"myscore:"+myScore[i][j]);
                      console.log(i+","+j+":"+"computerscore:"+computerScore[i][j]);
                      if(myScore[i][j] > max){
                        max = myScore[i][j];
                        u = i;
                        v = j;					
                      }
                      else if(myScore[i][j] == max){
                        if(computerScore[i][j] > computerScore[u][v]){
                          u = i;
                          v = j;						
                        }
                      }

                      if(computerScore[i][j] > max){
                        max = computerScore[i][j];
                        u = i;
                        v = j;					
                      }
                      else if(computerScore[i][j] == max){
                        if(myScore[i][j] > myScore[u][v]){
                          u = i;
                          v = j;						
                        }
                      }
                    }
                  }
                }
             
                this.oneStep(u, v, false);
                this.history.push({
									u,
									v,
									color: "white"
								});
                this.chessBoard[u][v] = 2;

                for(var k = 0; k < this.count; k++){
                  if(this.wins[u][v][k] ){
                    this.computerWin[k]++;
                    //this.myWin[k] = 6;
                    if(this.computerWin[k] == 5){
                      
                      this.$message({
                        message: '再接再厉，AI获胜',
                        showClose: true
                      });
                      this.over = true;
                    }
                  }
                }
                if(!this.over){
                  this.me = !this.me;
                }
     },
     //画棋盘
                drawpieceBoard:function(){
                   let context = this.context;
                    context.strokeStyle = "#000";
                    var logo = new Image();
                    logo.src = "../../static/logo.jpg";
                    logo.onload = function(){
                      context.drawImage(logo, 0, 0, 450, 450);	
                      for(var i=0; i<15; i++){
                        context.moveTo(15 + i*30, 15);
                        context.lineTo(15 + i*30, 435);
                        context.stroke();
                        context.moveTo(15,15 + i*30);
                        context.lineTo(435,15 + i*30);
                        context.stroke();
                      }
                    }

                },
                //落子
                oneStep:function(i,j,me){//i,j分别是在棋盘中的定位，me代表白棋还是黑棋
                    let context = this.context;
                    context.beginPath();
                    context.arc(15 + i*30, 15 + j*30, 13, 0, 2 * Math.PI);
                    context.closePath();
                    var gradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 - 2, 13, 15 + i*30 + 2, 15 + j*30 - 2, 0);
                    if(me){
                      gradient.addColorStop(0, "#0A0A0A");
                      gradient.addColorStop(1, "#636766");
                    }
                    else{
                      gradient.addColorStop(0, "#D1D1D1");
                      gradient.addColorStop(1, "#F9F9F9");
                    }	
                    context.fillStyle = gradient;
                    context.fill();
                }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

canvas{
	display: block;
	margin: 50px auto;
	box-shadow: -2px -2px 2px #EFEFEF, 5px 5px 5px #B9B9B9;
	color: #fff;
}
.left{

  display: inline-block;
  vertical-align: middle;
  
}
.left img{
  width: 40%;
}

</style>
