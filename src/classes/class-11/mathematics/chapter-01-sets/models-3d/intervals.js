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

D3.intervals={en:'Intervals',hi:'अंतराल',h:0.5,view:{yaw:-0.15,pitch:0.2,zoom:1},
 frame:function(S,t,P,l){
  var st=Math.floor(t/3.5)%4,lt=t%3.5,a=-2.4,b=2.4,e=a+(b-a)*ease(lt/1.4),
   openA=st<2,openB=(st===0||st===2),nm=['(a, b)','(a, b]','[a, b)','[a, b]'],
   dsc=[T(l,'open','खुला'),T(l,'half-open','अर्द्ध-खुला'),T(l,'half-open','अर्द्ध-खुला'),T(l,'closed','बंद')];
  S.arrow([-3.6,0,0],[3.6,0,0],'muted',1.6);
  for(var k=-3;k<=3;k++)S.line([k,-0.08,0],[k,0.08,0],'muted',1);
  S.rod([a,0,0],[e,0,0],0.06,'hi');
  function pt(x,open){if(open){S.disc([x,0,0.05],0.16,'xy','paper',1);S.ring([x,0,0.06],0.16,'xy','ink',2.2)}else S.ball([x,0,0.08],0.17,'gold')}
  pt(a,openA);if(lt>1.4)pt(b,openB);
  S.text([a,-0.4,0],'a','ink',14,'center',true);S.text([b,-0.4,0],'b','ink',14,'center',true);
  S.hud(0.5,0.88,nm[st]+'  —  '+dsc[st],'accent',15,'center',true);
 }};
})();
