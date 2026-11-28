(function(){
'use strict';
var D3=window.VENU_D3;
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}

/* 1. Solid angle */

D3.string={en:'Vibrating string',hi:'कंपित तार',h:0.55,view:{yaw:-0.2,pitch:0.2,zoom:1},
 params:[{k:'l',en:'Length l',hi:'लंबाई l',min:1,max:2,val:1.5,step:0.1,unit:''},{k:'F',en:'Tension F',hi:'तनाव F',min:1,max:4,val:1,step:0.1,unit:''},{k:'m',en:'Mass per length µ',hi:'प्रति इकाई लंबाई द्रव्यमान µ',min:1,max:4,val:1,step:0.1,unit:''}],
 frame:function(S,t,P,l){
  var len=P.l||1.5,F=P.F||1,mu=P.m||1,amp=0.28,cycles=Math.max(1,Math.round(Math.sqrt(F/mu)*len/1.5)),pts=[];
  S.rod([-1.8,0,0],[1.8,0,0],0.045,'muted');
  for(var i=0;i<=60;i++){var x=-1.8+3.6*i/60,y=amp*Math.sin((x+1.8)/3.6*cycles*6.2832)*Math.cos(t*3.5);pts.push([x,y,0]);}
  S.path(pts,'chem',2.5,false,false);
  for(var n=0;n<=cycles;n++){var xx=-1.8+3.6*n/cycles;S.line([xx,-0.4,0],[xx,0.4,0],'muted',0.8,true);S.text([xx,-0.55,0],n===0||n===cycles?'End':(n%2?'A':'N'),'ink',9,'center',true)}
  S.hud(0.5,0.91,'Length = '+len.toFixed(1)+'  ·  Tension = '+F.toFixed(1)+'  ·  μ = '+mu.toFixed(1),'accent',11,'center',true);
  S.hud(0.5,0.97,'Standing wave: nodes remain fixed; antinodes oscillate','ink',11,'center',true);
 }};
})();
