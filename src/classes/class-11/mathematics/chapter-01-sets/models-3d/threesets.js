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

D3.threesets={en:'Three sets, seven regions',hi:'तीन समुच्चय, सात क्षेत्र',h:0.78,view:{yaw:-0.2,pitch:0.4,zoom:1},
 frame:function(S,t,P,l){
  var k=Math.floor(t/2)%7,map={1:0,2:1,4:2,3:3,6:4,5:5,7:6},R=0.95,
   A=[-0.55,0.4],Bc=[0.55,0.4],C=[0,-0.55],
   pos=[[-1.18,0.82],[1.18,0.82],[0,-1.18],[0,0.82],[0.65,-0.12],[-0.65,-0.12],[0,0.1]],
   labels=['A only','B only','C only','A∩B only','B∩C only','A∩C only','A∩B∩C'];
  for(var x=-1.7;x<=1.71;x+=0.11)for(var y=-1.55;y<=1.5;y+=0.11){
    var a=inC(x,y,A[0],A[1],R),b=inC(x,y,Bc[0],Bc[1],R),c=inC(x,y,C[0],C[1],R),code=(a?1:0)+(b?2:0)+(c?4:0);
    if(!code)continue;var id=map[code];
    S.ball([x,y,0],id===k?0.055:0.034,id===k?'gold':(id===0?'chem':id===1?'phys':'bad'));
  }
  S.ring([A[0],A[1],0.04],R,'xy','chem',2.4);S.ring([Bc[0],Bc[1],0.04],R,'xy','phys',2.4);S.ring([C[0],C[1],0.04],R,'xy','bad',2.4);
  S.text([-1.45,1.35,0],'A','chem',14,'center',true);S.text([1.45,1.35,0],'B','phys',14,'center',true);S.text([0,-1.5,0],'C','bad',14,'center',true);
  S.text([pos[k][0],pos[k][1],0.12],labels[k],'ink',k===6?10:9,'center',true);
  S.hud(0.5,0.91,'Highlighted region '+(k+1)+' of 7','accent',12,'center',true);
  S.hud(0.5,0.97,labels[k]+' · A, B and C regions','ink',11,'center',true);
 }};
})();
