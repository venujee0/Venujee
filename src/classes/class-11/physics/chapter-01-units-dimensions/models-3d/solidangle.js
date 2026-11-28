(function(){
'use strict';
var D3=window.VENU_D3;
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}

/* 1. Solid angle */

D3.solidangle={en:'Solid angle',hi:'ठोस कोण',h:0.8,spin:true,view:{yaw:-0.5,pitch:0.3,zoom:1},
 params:[{k:'a',en:'Cone angle α',hi:'शंकु कोण α',min:10,max:90,val:40,step:1,unit:'°'}],
 frame:function(S,t,P,l){
  var R=1.3,al=P.a*Math.PI/180,i,ph;
  S.ring([0,0,0],R,'xy','muted',1);S.ring([0,0,0],R,'xz','muted',1);S.ring([0,0,0],R,'yz','muted',1);
  var rim=[];for(i=0;i<40;i++){ph=i/40*6.2832;rim.push([R*Math.sin(al)*Math.cos(ph),R*Math.cos(al),R*Math.sin(al)*Math.sin(ph)])}
  S.path(rim,'gold',2.4,false,true);
  for(i=0;i<40;i+=5)S.line([0,0,0],rim[i],'gold',1.2);
  S.line([0,0,0],[0,R*1.12,0],'accent',1.2,true);
  S.ball([0,0,0],0.07,'ink');
  S.text([0.12,R*Math.cos(al)+0.1,0],'A','gold',14,'left',true);
  S.text([0.1,0.15,0],'r','ink',12,'left');
  var om=2*Math.PI*(1-Math.cos(al));
  S.hud(0.5,0.93,'Ω = A/r² = 2π(1 − cos α) = '+om.toFixed(2)+' sr','accent',13,'center',true);
  S.hud(0.5,0.06,T(l,'Full sphere: Ω = 4π sr','पूरा गोला: Ω = 4π sr'),'muted',12,'center');
 }};
})();
