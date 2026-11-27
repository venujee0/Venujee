(function(){
'use strict';
var D3=window.VENU_D3;
var T=VH.T,mol=VH.mol,wire=VH.wire,B=function(e,h){return {en:e,hi:h}};


D3.dissoc={en:'Dissociation N₂O₄ ⇌ 2NO₂',hi:'वियोजन N₂O₄ ⇌ 2NO₂',h:0.55,view:{yaw:-0.2,pitch:0.15,zoom:1},
 frame:function(S,t,P,l){
  var p=(t%8)/8,d=p<0.2?0:p<0.5?1.5*(p-0.2)/0.3:p<0.65?1.5:p<0.95?1.5*(1-(p-0.65)/0.3):0,
   N='phys',O='bad',bond=d<0.05;
  [[-1,-1],[1,1]].forEach(function(s){
    var sg=s[1],nx=sg*(0.22+d);
    var A=[[nx,0,0,N,0.17],[nx+sg*0.28,0.4,0,O,0.14],[nx+sg*0.28,-0.4,0,O,0.14]];
    mol(S,A,[[0,1],[0,2]],[0,0,0],l);
  });
  if(bond)S.rod([-0.22,0,0],[0.22,0,0],0.04,'muted');
  S.hud(0.5,0.9,bond?'N₂O₄':(d>=1.4?'2 NO₂':'N₂O₄ ⇌ 2 NO₂'),'accent',14,'center',true);
 }};
})();
