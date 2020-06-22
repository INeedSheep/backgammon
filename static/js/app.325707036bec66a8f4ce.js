webpackJsonp([1],{NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("7+uW"),o={name:"Backgammon",data:function(){return{url:"https://ineedsheep.github.io/backgammon//static/ziti.gif",chess:null,context:null,chessBoard:[],me:!0,over:!1,wins:[],myWin:[],computerWin:[],count:0,history:[],stepHistory:0,step:0}},created:function(){this.init()},mounted:function(){var t=this,e=document.getElementById("mychess");(this.chess=this.$refs.chess,this.context=this.chess.getContext("2d"),e.getContext("2d"))?(console.log("当前浏览器支持Canvas"),this.drawpieceBoard(),this.$refs.chess.addEventListener("click",function(e){if(t.step++,t.history.length=t.step,!t.over&&t.me){var s=e.offsetX,i=e.offsetY,o=Math.floor(s/30),n=Math.floor(i/30);if(0==t.chessBoard[o][n]){t.oneStep(o,n,t.me),t.history.push({i:o,j:n,color:"black"}),t.chessBoard[o][n]=1;for(var r=0;r<t.count;r++)t.wins[o][n][r]&&(t.myWin[r]++,5==t.myWin[r]&&(t.$message({showClose:!0,message:"你可真聪明，你赢啦～",type:"success"}),t.over=!0));t.over||(t.me=!t.me,t.computerAI())}}})):this.$message({message:"警告哦，当前浏览器不支持Canvas",type:"warning"})},methods:{init:function(){for(var t=0;t<15;t++){this.chessBoard[t]=[];for(var e=0;e<15;e++)this.chessBoard[t][e]=0}for(t=0;t<15;t++){this.wins[t]=[];for(e=0;e<15;e++)this.wins[t][e]=[]}for(t=0;t<15;t++)for(e=0;e<11;e++){for(var s=0;s<5;s++)this.wins[t][e+s][this.count]=!0;this.count++}for(t=0;t<15;t++)for(e=0;e<11;e++){for(s=0;s<5;s++)this.wins[e+s][t][this.count]=!0;this.count++}for(t=0;t<11;t++)for(e=0;e<11;e++){for(s=0;s<5;s++)this.wins[t+s][e+s][this.count]=!0;this.count++}for(t=0;t<11;t++)for(e=14;e>3;e--){for(s=0;s<5;s++)this.wins[t+s][e-s][this.count]=!0;this.count++}console.log(this.count);for(t=0;t<this.count;t++)this.myWin[t]=0,this.computerWin[t]=0},computerAI:function(){this.step++,this.history.length=this.step;for(var t=[],e=[],s=0,i=0,o=0,n=0;n<15;n++){t[n]=[],e[n]=[];for(var r=0;r<15;r++)t[n][r]=0,e[n][r]=0}for(n=0;n<15;n++)for(r=0;r<15;r++)if(0==this.chessBoard[n][r]){for(var h=0,c=0,a=0;a<this.count;a++)this.wins[n][r][a]&&(0==this.computerWin[a]&&(1==this.myWin[a]?t[n][r]+=200:2==this.myWin[a]?t[n][r]+=500:3==this.myWin[a]?(t[n][r]+=900,c++):4==this.myWin[a]&&(t[n][r]+=2e4)),0==this.myWin[a]&&(1==this.computerWin[a]?e[n][r]+=210:2==this.computerWin[a]?e[n][r]+=520:3==this.computerWin[a]?(e[n][r]+=930,h++):4==this.computerWin[a]&&(e[n][r]+=22e3)),3==this.myWin[a]&&1==this.computerWin[a]&&(t[n][r]-=800));h>=2&&(e[n][r]+=5e3),c>=2&&(t[n][r]+=4e3),console.log(n+","+r+":myscore:"+t[n][r]),console.log(n+","+r+":computerscore:"+e[n][r]),t[n][r]>s?(s=t[n][r],i=n,o=r):t[n][r]==s&&e[n][r]>e[i][o]&&(i=n,o=r),e[n][r]>s?(s=e[n][r],i=n,o=r):e[n][r]==s&&t[n][r]>t[i][o]&&(i=n,o=r)}this.oneStep(i,o,!1),this.history.push({u:i,v:o,color:"white"}),this.chessBoard[i][o]=2;for(a=0;a<this.count;a++)this.wins[i][o][a]&&(this.computerWin[a]++,5==this.computerWin[a]&&(this.$message({message:"再接再厉，AI获胜",showClose:!0}),this.over=!0));this.over||(this.me=!this.me)},drawpieceBoard:function(){var t=this.context;t.strokeStyle="#000";var e=new Image;e.src="https://ineedsheep.github.io/backgammon/static/logo.jpg",e.onload=function(){t.drawImage(e,0,0,450,450);for(var s=0;s<15;s++)t.moveTo(15+30*s,15),t.lineTo(15+30*s,435),t.stroke(),t.moveTo(15,15+30*s),t.lineTo(435,15+30*s),t.stroke()}},oneStep:function(t,e,s){var i=this.context;i.beginPath(),i.arc(15+30*t,15+30*e,13,0,2*Math.PI),i.closePath();var o=i.createRadialGradient(15+30*t+2,15+30*e-2,13,15+30*t+2,15+30*e-2,0);s?(o.addColorStop(0,"#0A0A0A"),o.addColorStop(1,"#636766")):(o.addColorStop(0,"#D1D1D1"),o.addColorStop(1,"#F9F9F9")),i.fillStyle=o,i.fill()}}},n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hello"},[e("el-container",[e("el-header",[e("div",{staticClass:"left"},[e("el-image",{staticStyle:{width:"600px",height:"110px"},attrs:{src:this.url}})],1)]),this._v(" "),e("el-container",[e("el-main",[e("canvas",{ref:"chess",attrs:{id:"mychess",width:"450px",height:"450px"}})]),this._v(" "),e("el-aside",{attrs:{width:"200px"}})],1)],1)],1)},staticRenderFns:[]};var r={name:"App",components:{Backgammon:s("VU/8")(o,n,!1,function(t){s("u3rD")},null,null).exports},data:function(){return{}}},h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("el-container",[e("el-header"),this._v(" "),e("el-main",[e("Backgammon")],1)],1)],1)},staticRenderFns:[]};var c=s("VU/8")(r,h,!1,function(t){s("eHlr")},null,null).exports,a=s("zL8q"),l=s.n(a);s("tvR6");i.default.config.productionTip=!1,i.default.use(l.a),new i.default({el:"#app",components:{App:c},template:"<App/>"})},eHlr:function(t,e){},tvR6:function(t,e){},u3rD:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.325707036bec66a8f4ce.js.map