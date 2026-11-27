(function(){
'use strict';
var D3=window.VENU_D3;
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}

/* 1. Solid angle */

D3.terminal={en:'Terminal velocity',hi:'सीमांत वेग',h:0.9,view:{yaw:-0.4,pitch:0.15,zoom:1},
 frame:function(S,t,P,l){
  var v=Math.min(1,t/5),speed=1.2+2.8*(1-Math.exp(-t/2.5)),y=1.0-v*2.1;
  S.box([0,0,0],[3.4,3.2,1.0],'soft');S.box([0,-0.95,0],[3.25,1.15,0.92],'#B9DCEB');
  S.line([-1.6,0.95,0],[1.6,0.95,0],'muted',1);S.ball([0,y,0],0.24,'gold');
  S.arrow([0,y+0.32,0],[0,y+0.95,0],'bad',2.6);S.text([0.22,y+0.78,0],'Weight mg','bad',10,'left',true);
  S.arrow([0,y-0.28,0],[0,y-0.75,0],'phys',2.4);S.text([0.22,y-0.65,0],'Buoyancy + drag','phys',9,'left',true);
  S.hud(0.5,0.91,'Speed rises then approaches terminal speed','accent',12,'center',true);
  S.hud(0.5,0.97,'At terminal velocity: mg = buoyancy + viscous drag','ink',11,'center',true);
 }};
})();
