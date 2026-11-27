(function(){
'use strict';
var D3=window.VENU_D3;
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}

/* 1. Solid angle */

D3.drop={en:'Liquid drop oscillation',hi:'द्रव बूँद का दोलन',h:0.78,spin:true,view:{yaw:-0.5,pitch:0.3,zoom:1},
 params:[{k:'r',en:'Radius r',hi:'त्रिज्या r',min:0.6,max:1.4,val:1,step:0.05,unit:''},{k:'S',en:'Surface tension S',hi:'पृष्ठ तनाव S',min:0.5,max:3,val:1,step:0.1,unit:''}],
 frame:function(S,t,P,l){
  var r=P.r,w=3*Math.sqrt(P.S/Math.pow(r,3)),e=0.35*Math.sin(w*t),ax=r*(1+e),ay=r/Math.sqrt(1+e),i,ph,pts,pl=['xy','xz','yz'];
  function ell(plane){var q=[];for(i=0;i<48;i++){ph=i/48*6.2832;var c=Math.cos(ph),s=Math.sin(ph);
    q.push(plane==='xy'?[ax*c,ay*s,0]:plane==='xz'?[ax*c,0,ay*s]:[0,ay*c,ay*s])}return q}
  S.poly(ell('xy'),'hi',0.3,false,false);
  S.path(ell('xy'),'hi',2,false,true);S.path(ell('xz'),'chem',1.6,false,true);S.path(ell('yz'),'phys',1.6,false,true);
  S.hud(0.5,0.93,'T = k √(ρr³/S)','accent',14,'center',true);
  S.hud(0.5,0.06,T(l,'Surface tension pulls the drop back to a sphere','पृष्ठ तनाव बूँद को वापस गोला बनाने की कोशिश करता है'),'muted',11,'center');
 }};
})();
