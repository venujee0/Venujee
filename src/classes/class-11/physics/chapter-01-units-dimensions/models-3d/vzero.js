(function(){
'use strict';
var D3=window.VENU_D3;
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}

/* 1. Solid angle */

D3.vzero={en:'Vernier zero error',hi:'वर्नियर शून्य त्रुटि',h:0.62,view:{yaw:0,pitch:0.1,zoom:1},
 frame:function(S,t,P,l){
  var st=Math.floor(t/6)%2,lt=t%6,tgt=st===0?0.04:-0.04,o=tgt*ease(lt/1.6),X=function(c){return (c-0.45)*3.6},i,k=st===0?4:6;
  S.box([0,0.5,0],[4.2,0.35,0.3],'soft');
  for(i=-1;i<=10;i++){S.line([X(i/10),0.67,0.17],[X(i/10),0.67-(i%10===0?0.28:0.15),0.17],'ink',i%10===0?1.8:1)}
  S.text([X(0),0.98,0.17],'0','ink',11,'center',true);S.text([X(1),0.98,0.17],'1 cm','ink',11,'center',true);
  S.box([0,-0.05,0],[4.2,0.35,0.3],'hi');
  for(i=0;i<=10;i++){var on=lt>2&&i===k,vx=X(o+0.09*i);S.line([vx,0.17,0.17],[vx,on?-0.15:-0.02,0.17],on?'gold':'paper',on?3.2:1.2)}
  S.text([X(o),-0.45,0.17],'0','paper',10,'center',true);
  if(lt>2)S.text([X(o+0.09*k),-0.5,0.17],''+k,'gold',13,'center',true);
  S.hud(0.5,0.92,st===0?T(l,'Positive: + 4 × LC = + 0.04 cm','धनात्मक: + 4 × LC = + 0.04 cm'):T(l,'Negative: − (10 − 6) × LC = − 0.04 cm','ऋणात्मक: − (10 − 6) × LC = − 0.04 cm'),'accent',13,'center',true);
 }};
})();
