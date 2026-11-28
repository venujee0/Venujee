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

D3.numsets={en:'N ⊂ Z ⊂ Q ⊂ R',hi:'N ⊂ Z ⊂ Q ⊂ R',h:0.66,spin:true,view:{yaw:-0.5,pitch:0.55,zoom:1},
 frame:function(S,t,P,l){
  var n=Math.min(4,1+Math.floor((t%10)/2)),Rr=[0.4,0.75,1.1,1.5],col=['phys','chem','hi','gold'],nm=['N','Z','Q','R'],z=[0.36,0.24,0.12,0],txt=['N','N ⊂ Z','N ⊂ Z ⊂ Q','N ⊂ Z ⊂ Q ⊂ R'];
  for(var i=n-1;i>=0;i--){S.disc([0,0,z[i]],Rr[i],'xy',col[i],0.55);S.ring([0,0,z[i]],Rr[i],'xy','ink',1.6)}
  for(var j=0;j<n;j++){S.text([0,j===0?0:Rr[j]-0.17,z[j]+0.05],nm[j],'ink',14,'center',true)}
  S.hud(0.5,0.93,txt[n-1],'accent',14,'center',true);
 }};
})();
