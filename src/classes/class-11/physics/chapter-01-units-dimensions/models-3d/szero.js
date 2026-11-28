(function(){
'use strict';
var D3=window.VENU_D3;
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}

/* 1. Solid angle */

D3.szero={en:'Screw gauge zero error',hi:'स्क्रू गेज शून्य त्रुटि',h:0.7,view:{yaw:-0.15,pitch:0.1,zoom:1},
 frame:function(S,t,P,l){
  var st=Math.floor(t/6)%2,lt=t%6,off=(st===0?-0.5:0.5)*ease(lt/1.8),i;
  S.line([-1.6,0,0.2],[1.6,0,0.2],'bad',2.4);S.text([-1.7,0.12,0.2],T(l,'reference line','संदर्भ रेखा'),'bad',11,'left',true);
  S.box([0.4,0,0],[1.0,3.0,0.2],'soft');
  for(i=-12;i<=12;i++){var y=off+i*0.1;if(Math.abs(y)>1.4)continue;S.line([0.0,y,0.15],[i%5===0?0.5:0.25,y,0.15],'ink',i%5===0?2:1);
    if(i%5===0)S.text([0.6,y,0.15],''+(((i%50)+50)%50),'ink',11,'left',true)}
  S.hud(0.5,0.93,st===0?T(l,'Positive: zero below the line → + 5 div','धनात्मक: शून्य रेखा के नीचे → + 5 भाग'):T(l,'Negative: zero above the line → − (N − m) div','ऋणात्मक: शून्य रेखा के ऊपर → − (N − m) भाग'),'accent',12,'center',true);
 }};
})();
