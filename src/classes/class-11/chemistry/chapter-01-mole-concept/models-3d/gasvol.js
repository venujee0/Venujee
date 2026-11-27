(function(){
'use strict';
var D3=window.VENU_D3;
var T=function(l,e,h){return l==='hi'?h:e};
function tri(x){return Math.abs(((x%2)+2)%2-1)*2-1}
function wire(S,c,x,y,z,a,b,d){
  var v=[];for(var i=0;i<8;i++)v.push([x+((i&1)?a:-a),y+((i&2)?b:-b),z+((i&4)?d:-d)]);
  [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]].forEach(function(e){S.line(v[e[0]],v[e[1]],c,1.1)});
}
// atoms: [x,y,z,color,R,label]; bonds: [i,j]; o = offset
function mol(S,A,B,o,l){
  B.forEach(function(b){S.rod([A[b[0]][0]+o[0],A[b[0]][1]+o[1],A[b[0]][2]+o[2]],[A[b[1]][0]+o[0],A[b[1]][1]+o[1],A[b[1]][2]+o[2]],0.035,'muted')});
  A.forEach(function(a){var p=[a[0]+o[0],a[1]+o[1],a[2]+o[2]];S.ball(p,a[4],a[3]);if(a[5])S.text([p[0],p[1],p[2]+a[4]+0.02],a[5],'white',11,'center',true)});
}
window.VH={T:T,tri:tri,wire:wire,mol:mol};
var C_='ink',O_='bad',H_='muted',N_='phys';


D3.gasvol={en:'Gay-Lussac: gaseous volumes',hi:'गे-लुसाक: गैसों के आयतन',h:0.55,view:{yaw:-0.2,pitch:0.15,zoom:1},
 frame:function(S,t,P,l){
  var p=(t%8)/8,go=p<0.3?0:(p<0.6?(p-0.3)/0.3:1),HA=[[-0.16,0,0,H_,0.1],[0.16,0,0,H_,0.1]],OA=[[-0.18,0,0,O_,0.15],[0.18,0,0,O_,0.15]],WA=[[0,0,0,O_,0.15],[-0.25,-0.2,0,H_,0.1],[0.25,-0.2,0,H_,0.1]];
  if(p<0.6){
    var x=-2.6+go*2.6;mol(S,HA,[[0,1]],[x,0.5,0],l);mol(S,HA,[[0,1]],[x,-0.5,0],l);
    mol(S,OA,[[0,1]],[2.6-go*2.6,0,0],l);
  }else if(p<0.7){S.ball([0,0,0],0.25+0.3*Math.sin((p-0.6)/0.1*3.14),'gold')}
  if(p>=0.6){var y=p<0.8?(p-0.6)/0.2:1,xx=y*2.6;mol(S,WA,[[0,1],[0,2]],[xx,0.5,0],l);mol(S,WA,[[0,1],[0,2]],[xx,-0.5,0],l)}
  S.hud(0.5,0.9,'2 H₂  +  1 O₂  →  2 H₂O   (2 : 1 : 2)','accent',14,'center',true);
 }};
})();
