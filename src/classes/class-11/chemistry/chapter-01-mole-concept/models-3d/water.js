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


D3.water={en:'Water molecule H₂O',hi:'जल अणु H₂O',h:0.7,spin:true,view:{yaw:-0.3,pitch:0.25,zoom:1.15},
 frame:function(S,t,P,l){
  var a=t*0.45,ca=Math.cos(a),sa=Math.sin(a),O=[0,0,0],H1=[-0.78,-0.42,0.12],H2=[0.78,-0.42,-0.12];
  function turn(p){return [p[0]*ca-p[2]*sa,p[1],p[0]*sa+p[2]*ca]}
  var A=turn(H1),B=turn(H2);S.rod(O,A,0.11,'bad');S.rod(O,B,0.11,'bad');
  S.ball(O,0.34,'bad');S.ball(A,0.2,'white');S.ball(B,0.2,'white');
  S.ring(O,0.6,'xz','muted',1,true);S.text([0,0.58,0],'O','white',11,'center',true);
  S.text([A[0]-0.1,A[1]-0.25,A[2]],'H','ink',11,'center',true);S.text([B[0]+0.1,B[1]-0.25,B[2]],'H','ink',11,'center',true);
  S.hud(0.5,0.91,'H–O–H bond angle = 104.5°','accent',13,'center',true);
  S.hud(0.5,0.97,'Bent molecule · 2 O–H bonds · oxygen has 2 lone pairs','ink',11,'center',true);
 }};
})();
