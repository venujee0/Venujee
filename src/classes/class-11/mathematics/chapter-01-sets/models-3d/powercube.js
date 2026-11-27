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

D3.powercube={en:'Power set of {1, 2, 3}',hi:'{1, 2, 3} का घात समुच्चय',h:0.8,spin:true,view:{yaw:-0.6,pitch:0.35,zoom:1.05},
 frame:function(S,t,P,l){
  var V=[],hi=Math.floor(t/1.4)%8,edges=0;
  for(var i=0;i<8;i++)V.push([(i&1?0.92:-0.92),(i&2?0.92:-0.92),(i&4?0.92:-0.92)]);
  /* Draw cube edges and three independent include/exclude decisions */
  for(var a=0;a<8;a++)for(var b=a+1;b<8;b++){var d=a^b;if(d===1||d===2||d===4)S.rod(V[a],V[b],0.012,'muted')}
  for(var k=0;k<8;k++){
    var el=[];if(k&1)el.push('1');if(k&2)el.push('2');if(k&4)el.push('3');
    S.ball(V[k],k===hi?0.19:0.13,k===hi?'gold':'chem');
    S.text([V[k][0],V[k][1]+0.28,V[k][2]],el.length?'{'+el.join(',')+'}':'∅','ink',11,'center',true);
  }
  S.text([-1.25,1.2,0],'1: in / out','chem',10,'center',true);S.text([1.25,1.2,0],'2: in / out','phys',10,'center',true);S.text([0,-1.35,0],'3: in / out','bad',10,'center',true);
  S.hud(0.5,0.91,'Each of 3 elements has 2 choices','accent',12,'center',true);
  S.hud(0.5,0.97,'2 × 2 × 2 = 2³ = 8 subsets','ink',12,'center',true);
 }};
})();
