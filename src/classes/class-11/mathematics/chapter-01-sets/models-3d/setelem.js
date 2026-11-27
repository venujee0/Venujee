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

D3.setelem={en:'Set and elements',hi:'समुच्चय और अवयव',h:0.62,view:{yaw:-0.25,pitch:0.3,zoom:1},
 frame:function(S,t,P,l){
  var tt=t%12,cx=-1.2,L=['a','e','i','o','u','b','c','d'];
  S.disc([cx,0,0],1.15,'xy','chem',0.18);S.ring([cx,0,0],1.15,'xy','chem',2.2);
  S.text([cx,1.4,0],'V','accent',16,'center',true);
  L.forEach(function(ch,k){
    var vow=k<5,sx=1.5+(k%3)*0.5,sy=1.0-Math.floor(k/3)*0.7,tk=1+k*1.1,s=ease((tt-tk)/1.0),x,y;
    if(vow){var a=k*1.2566;x=sx+(cx+0.55*Math.cos(a)-sx)*s;y=sy+(0.55*Math.sin(a)-sy)*s}
    else{var b=Math.sin(Math.min(1,Math.max(0,(tt-tk)/1.0))*3.14);x=sx-0.9*b;y=sy}
    S.ball([x,y,0.1],0.2,vow?'chem':'muted');S.text([x,y,0.32],ch,'white',13,'center',true);
  });
  S.hud(0.5,0.92,T(l,'a ∈ V   ·   b ∉ V','a ∈ V   ·   b ∉ V'),'accent',14,'center',true);
 }};
})();
