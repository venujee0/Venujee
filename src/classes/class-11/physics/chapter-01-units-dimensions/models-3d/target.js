(function(){
'use strict';
var D3=window.VENU_D3;
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}

/* 1. Solid angle */

D3.target={en:'Accuracy vs precision',hi:'यथार्थता बनाम परिशुद्धता',h:0.78,view:{yaw:-0.2,pitch:0.45,zoom:1},
 frame:function(S,t,P,l){
  var mode=Math.floor(t/3)%3,shots=mode===0?[[0.05,0.02],[-0.05,0.04],[0.02,-0.04],[0,0]]:mode===1?[[0.62,0.55],[0.7,0.5],[0.55,0.66],[0.64,0.58]]:[[-0.55,-0.48],[0.55,0.5],[-0.6,0.55],[0.6,-0.55]];
  S.disc([0,0,0],1.25,'xy','soft',0.35);S.ring([0,0,0.03],1.25,'xy','muted',2);
  S.ring([0,0,0.04],0.08,'xy','bad',1.5);
  shots.forEach(function(q,i){S.ball([q[0],q[1],0.1],0.065,'bad');S.line([q[0],q[1],0.12],[q[0]*1.08,q[1]*1.08,0.12],'bad',1)});
  S.text([0,-1.5,0],mode===0?'Accurate + precise':mode===1?'Precise, not accurate':'Neither accurate nor precise','ink',11,'center',true);
  S.hud(0.5,0.91,'Three patterns: close to centre · tightly grouped · scattered','accent',11,'center',true);
  S.hud(0.5,0.97,'Accuracy = closeness to true value · Precision = repeatability','ink',10,'center',true);
 }};
})();
