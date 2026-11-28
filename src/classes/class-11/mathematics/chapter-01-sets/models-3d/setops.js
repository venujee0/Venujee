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

D3.setops={en:'Set operations',hi:'समुच्चयों पर संक्रियाएँ',h:0.66,view:{yaw:-0.2,pitch:0.45,zoom:1},
 frame:function(S,t,P,l){
  var st=Math.floor((t%18)/3),nm=['A ∪ B','A ∩ B','A − B','B − A','A △ B','(A ∪ B)′'],
   ca=-0.6,cb=0.6,R=1.0;
  rect(S,'ink',-2.2,2.2,-1.45,1.45);
  for(var x=-2.0;x<=2.01;x+=0.16)for(var y=-1.3;y<=1.31;y+=0.16){
    var a=inC(x,y,ca,0,R),b=inC(x,y,cb,0,R),on=[a||b,a&&b,a&&!b,b&&!a,a!==b,!(a||b)][st];
    if(on)S.ball([x,y,0],0.052,'gold');
  }
  S.ring([ca,0,0.05],R,'xy','chem',2.5);S.ring([cb,0,0.05],R,'xy','phys',2.5);
  S.text([-1.2,0,0.1],'A','chem',14,'center',true);S.text([1.2,0,0.1],'B','phys',14,'center',true);
  S.hud(0.5,0.91,'Operation '+(st+1)+' / 6','accent',12,'center',true);
  S.hud(0.5,0.97,nm[st]+' · highlighted dots = selected region','ink',12,'center',true);
 }};
})();
