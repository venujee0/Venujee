(function(){
'use strict';
var D3=window.VENU_D3;
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}

/* 1. Solid angle */

D3.parsec={en:'Parallax and parsec',hi:'लंबन और पारसेक',h:0.8,view:{yaw:-0.45,pitch:0.45,zoom:1},
 frame:function(S,t,P,l){
  var a=t*0.7,ex=1.4*Math.cos(a),ez=1.4*Math.sin(a),zs=-2.2,zb=-4.2,i;
  S.ring([0,0,0],1.4,'xz','line',1.4);
  S.ball([0,0,0],0.2,'gold');S.text([0,0.35,0],T(l,'Sun','सूर्य'),'ink',11,'center',true);
  S.ball([ex,0,ez],0.1,'phys');S.text([ex,0.25,ez],T(l,'Earth','पृथ्वी'),'phys',10,'center',true);
  for(i=0;i<18;i++)S.ball([(rnd(i)*5-2.5),(rnd(i+40)*2.4-1.2),zb],0.035,'muted');
  S.ball([0,0,zs],0.1,'bad');S.text([0.25,0,zs],T(l,'near star','पास का तारा'),'bad',10,'left',true);
  var k=(zb-ez)/(zs-ez),bx=ex+(0-ex)*k;
  S.line([ex,0,ez],[bx,0,zb],'bad',1,true);
  S.ball([bx,0,zb],0.07,'bad');
  S.text([0,1.15,zb],T(l,'distant stars','दूर के तारे'),'muted',11,'center');
  S.hud(0.5,0.93,T(l,'1 AU subtends 1″ at 1 parsec: d = b/θ','1 AU जिस दूरी पर 1″ बनाए वह 1 पारसेक: d = b/θ'),'accent',12,'center',true);
 }};
})();
