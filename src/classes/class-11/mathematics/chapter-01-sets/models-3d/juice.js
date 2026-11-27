(function(){
'use strict';
var D3=window.VENU_D3;
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function inC(x,y,cx,cy,R){return (x-cx)*(x-cx)+(y-cy)*(y-cy)<=R*R}
function rect(S,c,x0,x1,y0,y1){S.path([[x0,y0,0],[x1,y0,0],[x1,y1,0],[x0,y1,0]],c,1.6,false,true)}
function dotsLabel(S,x,y,s,c,sz){S.text([x,y,0.05],s,c||'ink',sz||13,'center',true)}

/* 1. Set and elements */

D3.juice={en:'Juice survey: 400 students',hi:'जूस सर्वे: 400 विद्यार्थी',h:0.78,view:{yaw:-0.2,pitch:0.4,zoom:1},
 frame:function(S,t,P,l){
  var tt=t%11,s=ease((tt-0.8)/3.2),dd=0.07,ca=-0.8,cb=0.8,cy=0.3,R=1.15;
  rect(S,'ink',-2.3,2.3,-1.9,1.7);
  S.ring([ca,cy,0.02],R,'xy','chem',2);S.ring([cb,cy,0.02],R,'xy','phys',2);
  S.text([-1.55,1.65-0.0,0],'A','chem',14,'center',true);S.text([1.55,1.65,0],'O','phys',14,'center',true);
  for(var i=0;i<400;i++){
    var g,j,cx0,cy0,cols,col;
    if(i<25){j=i;cx0=-1.15;cy0=cy;cols=5;col='chem'}
    else if(i<100){j=i-25;cx0=0;cy0=cy;cols=10;col='gold'}
    else if(i<175){j=i-100;cx0=1.15;cy0=cy;cols=10;col='phys'}
    else{j=i-175;cx0=0;cy0=-1.3;cols=25;col='muted'}
    var rows=i<25?5:i<100?8:i<175?8:9,tx=cx0+((j%cols)-(cols-1)/2)*dd,ty=cy0+(Math.floor(j/cols)-(rows-1)/2)*(-dd);
    var sx=(rnd(i)*4.4-2.2),sy=(rnd(i+500)*3.2-1.6);
    S.ball([sx+(tx-sx)*s,sy+(ty-sy)*s,0.05],0.03,s<0.05?'line':col);
  }
  if(s>0.95){
    S.text([-1.45,1.1,0.1],'25','chem',14,'center',true);S.text([0,1.1,0.1],'75','accent',14,'center',true);
    S.text([1.45,1.1,0.1],'75','phys',14,'center',true);S.text([1.55,-1.3,0.1],'225','muted',14,'center',true);
  }
  S.hud(0.5,0.94,T(l,'A only 25 · both 75 · O only 75 · none 225','सिर्फ़ A 25 · दोनों 75 · सिर्फ़ O 75 · कोई नहीं 225'),'ink',12,'center',true);
 }};
})();
