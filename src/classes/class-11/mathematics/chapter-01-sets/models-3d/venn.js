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

D3.venn={en:'Universal set and Venn diagram',hi:'सार्वत्रिक समुच्चय और वेन आरेख',h:0.62,view:{yaw:-0.3,pitch:0.4,zoom:1},
 frame:function(S,t,P,l){
  var p=t%10;
  rect(S,'ink',-2.2,2.2,-1.4,1.4);S.text([-1.95,1.2,0],'U','ink',16,'center',true);
  var ra=p>1?1.05*ease((p-1)/1.5):0,rb=p>4?0.45*ease((p-4)/1.5):0;
  if(ra>0.02){S.disc([-0.2,0,0.05],ra,'xy','chem',0.3);S.ring([-0.2,0,0.05],ra,'xy','chem',2.2)}
  if(rb>0.02){S.disc([-0.45,0.1,0.1],rb,'xy','gold',0.55);S.ring([-0.45,0.1,0.1],rb,'xy','gold',2.2)}
  if(p>2.8)S.text([0.55,0.55,0.1],'A','ink',15,'center',true);
  if(p>5.8)S.text([-0.45,0.1,0.15],'B','ink',15,'center',true);
  if(p>3)S.text([1.55,-0.9,0.1],'A′','muted',14,'center',true);
  if(p>6.5)S.hud(0.5,0.92,'B ⊂ A ⊂ U','accent',15,'center',true);
 }};
})();
