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

D3.fourchoice={en:'Four choices for each element',hi:'हर अवयव के लिए 4 विकल्प',h:0.66,view:{yaw:-0.25,pitch:0.4,zoom:1},
 frame:function(S,t,P,l){
  var k=Math.floor(t/2)%4,ca=-0.55,cb=0.55,R=1.0,
   pos=[[-1.25,0.0],[0,0],[1.25,0],[0,-1.2]],
   nm=[T(l,'only A','सिर्फ़ A'),T(l,'in both','दोनों में'),T(l,'only B','सिर्फ़ B'),T(l,'in neither','किसी में नहीं')];
  rect(S,'ink',-2.2,2.2,-1.5,1.4);
  S.disc([ca,0.1,0],R,'xy','chem',k===0||k===1?0.3:0.1);S.ring([ca,0.1,0.02],R,'xy','chem',2);
  S.disc([cb,0.1,0],R,'xy','phys',k===1||k===2?0.3:0.1);S.ring([cb,0.1,0.02],R,'xy','phys',2);
  S.text([-1.5,1.1,0],'A','chem',15,'center',true);S.text([1.5,1.1,0],'B','phys',15,'center',true);
  var x=pos[k][0],y=pos[k][1]+(k===3?0:0.1);
  S.ball([x,y,0.2],0.18,'gold');S.text([x,y,0.42],'x','ink',13,'center',true);
  S.hud(0.5,0.9,nm[k]+'   →   4 '+T(l,'choices','विकल्प')+' · 4ⁿ','accent',14,'center',true);
 }};
})();
