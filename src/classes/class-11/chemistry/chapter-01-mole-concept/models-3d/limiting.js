(function(){
'use strict';
var D3=window.VENU_D3;
var T=VH.T,mol=VH.mol,wire=VH.wire,B=function(e,h){return {en:e,hi:h}};
var H_='muted',O_='bad',N_='phys';
var N2=[[-0.16,0,0,N_,0.15],[0.16,0,0,N_,0.15]],H2=[[-0.13,0,0,H_,0.1],[0.13,0,0,H_,0.1]],
    NH3=[[0,0,0,N_,0.17],[-0.3,-0.22,0,H_,0.1],[0.3,-0.22,0,H_,0.1],[0,-0.22,0.3,H_,0.1]];


D3.limiting={en:'Limiting reagent',hi:'सीमांत अभिकर्मक',h:0.6,view:{yaw:-0.2,pitch:0.18,zoom:1},
 frame:function(S,t,P,l){
  var phase=(t%10)/10,used=phase>0.58,move=Math.min(1,phase/0.58);
  function particle(x,y,c,label){S.ball([x,y,0],0.17,c);S.text([x,y-0.28,0],label,'ink',9,'center',true)}
  particle(-1.8,0.8,'phys','N₂');particle(-1.8,-0.8,'phys','N₂');
  particle(-1.4,1.3,'chem','H₂');particle(-1.4,0.35,'chem','H₂');particle(-1.4,-0.6,'chem','H₂');
  if(used){particle(0.1,0.55,'good','NH₃');particle(0.1,-0.55,'good','NH₃');particle(1.45,0.8,'phys','N₂');particle(1.45,-0.8,'phys','N₂')}
  else{S.arrow([-1.0,0,0],[0.4,0,0],'gold',2)}
  S.hud(0.5,0.91,'2 N₂ + 3 H₂ → 2 NH₃ + N₂ left over','accent',12,'center',true);
  S.hud(0.5,0.97,'H₂ is limiting: it is consumed first; N₂ remains in excess','ink',11,'center',true);
 }};
})();
