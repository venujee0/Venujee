(function(){
'use strict';
var D3=window.VENU_D3;
var T=VH.T,mol=VH.mol,wire=VH.wire,B=function(e,h){return {en:e,hi:h}};
var H_='muted',O_='bad',N_='phys';
var N2=[[-0.16,0,0,N_,0.15],[0.16,0,0,N_,0.15]],H2=[[-0.13,0,0,H_,0.1],[0.13,0,0,H_,0.1]],
    NH3=[[0,0,0,N_,0.17],[-0.3,-0.22,0,H_,0.1],[0.3,-0.22,0,H_,0.1],[0,-0.22,0.3,H_,0.1]];


D3.dilution={en:'Dilution',hi:'तनुकरण',h:0.7,view:{yaw:-0.45,pitch:0.28,zoom:1},
 params:[{k:'w',en:'Water added',hi:'मिलाया पानी',min:0,max:100,val:0,step:1,unit:'%'}],
 frame:function(S,t,P,l){
  var V=1+3*P.w/100,h=0.45*V;
  S.glassBox([0,-1+h,0],[2.05,2*h,2.05]);S.poly([[-0.92,-1+2*h,-0.92],[0.92,-1+2*h,-0.92],[0.92,-1+2*h,0.92],[-0.92,-1+2*h,0.92]],'#7dd3fc',0.16,'#38bdf8');
  for(var i=0;i<12;i++){
    var u=((i*37)%100)/100,v=((i*53)%100)/100,w=((i*71)%100)/100;
    S.ball([(u*2-1)*0.8+0.04*Math.sin(t*3+i),-1+(v*2*h)*0.92+0.04,(w*2-1)*0.8+0.04*Math.cos(t*3+i)],0.1,'bad');
  }
  S.text([0,-1.25,0],T(l,'Same 12 solute particles · volume ×'+V.toFixed(1),'विलेय कण वही 12 · आयतन ×'+V.toFixed(1)),'accent',12,'center',true);
  S.hud(0.5,0.08,'M₂ = M₁V₁/V₂ = '+(1/V).toFixed(2)+' × M₁','ink',14,'center',true);
 }};
})();
