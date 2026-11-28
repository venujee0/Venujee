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


D3.co2={en:'Formation of CO and CO₂',hi:'CO और CO₂ का बनना',h:0.55,view:{yaw:-0.25,pitch:0.2,zoom:1},
 frame:function(S,t,P,l){
  var p=(t%9)/9,x1=p<0.3?3-(3-1.05)*(p/0.3):1.05,x2=p<0.55?-3:(p<0.85?-3+(3-1.05)*((p-0.55)/0.3):-1.05);
  S.ball([0,0,0],0.38,C_);S.text([0,0,0.4],'C','white',12,'center',true);
  S.ball([x1,0,0],0.34,O_);S.text([x1,0,0.36],'O','white',12,'center',true);
  if(p>=0.3)S.rod([0,0,0],[x1,0,0],0.05,'muted');
  if(p>=0.55){S.ball([x2,0,0],0.34,O_);S.text([x2,0,0.36],'O','white',12,'center',true)}
  if(p>=0.85)S.rod([0,0,0],[x2,0,0],0.05,'muted');
  var lab=p<0.55?'CO  →  12 g C : 16 g O':'CO₂  →  12 g C : 32 g O';
  S.hud(0.5,0.9,lab,'accent',14,'center',true);
 }};
})();
