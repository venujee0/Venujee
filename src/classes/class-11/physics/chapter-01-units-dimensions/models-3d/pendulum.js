(function(){
'use strict';
var D3=window.VENU_D3;
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}

/* 1. Solid angle */

D3.pendulum={en:'Simple pendulum',hi:'सरल लोलक',h:0.85,view:{yaw:-0.2,pitch:0.15,zoom:1},
 params:[{k:'L',en:'Length L (m)',hi:'लंबाई L (m)',min:0.5,max:2.2,val:1,step:0.05,unit:''}],
 frame:function(S,t,P,l){
  var L=P.L||1,theta=0.62*Math.sin(t*2.2),x=L*Math.sin(theta),y=-L*Math.cos(theta);
  S.box([0,1.55,0],[1.45,0.12,0.6],'muted');S.rod([0,1.48,0],[x,y,0],0.035,'ink');S.ball([x,y,0],0.18,'gold');S.shadow([x,y,0],0.3,-1.5);
  S.ring([0,1.48,0],0.18,'xz','muted',1.5);S.arrow([x,y,0],[x,y-0.55,0],'bad',2);
  S.arrow([x,y,0],[x+0.55*Math.sin(theta),y+0.55*Math.cos(theta),0],'phys',2);
  S.text([0.75,1.1,0],'Support','ink',10,'left',true);S.text([x+0.35,y-0.55,0],'mg','bad',11,'left',true);
  S.text([x+0.65,y+0.1,0],'Tension','phys',10,'left',true);
  S.hud(0.5,0.91,'Length L = '+L.toFixed(2)+' m  ·  angle = '+(theta*57.3).toFixed(1)+'°','accent',12,'center',true);
  S.hud(0.5,0.97,'T = 2π√(L/g)  ·  ideal small-angle model','ink',12,'center',true);
 }};
})();
