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


D3.classify={en:'Classification of matter',hi:'पदार्थ का वर्गीकरण',h:0.7,spin:true,view:{yaw:-0.5,pitch:0.35,zoom:1},
 frame:function(S,t,P,l){
  var pos=[[-2.4,0.7],[-0.8,0.7],[0.8,0.7],[2.4,0.7]],nm=[T(l,'Element (O₂)','तत्व (O₂)'),T(l,'Compound (H₂O)','यौगिक (H₂O)'),T(l,'Homogeneous','समांगी'),T(l,'Heterogeneous','विषमांगी')];
  for(var i=0;i<4;i++){S.glassBox([pos[i][0]*0.9,0,0],[1.18,1.18,1.18]);S.text([pos[i][0]*0.9,-0.95,0],nm[i],'accent',11,'center',true)}
  var w=function(i,x,y,z,f){return [x*0.9+0.18*Math.sin(t*2+i)+f[0],y+0.12*Math.sin(t*2.2+i*2)+f[1],z+f[2]]};
  for(var i=0;i<3;i++){var o=w(i,-2.4,i*0.35-0.35,0,[0,0,0]);mol(S,[[-0.12,0,0,O_,0.12],[0.12,0,0,O_,0.12]],[[0,1]],o,l)}
  for(var j=0;j<2;j++){var o2=w(j+5,-0.8,j*0.6-0.3,0,[0,0,0]);mol(S,[[0,0,0,O_,0.15],[-0.22,-0.17,0,H_,0.09],[0.22,-0.17,0,H_,0.09]],[[0,1],[0,2]],o2,l)}
  for(var m=0;m<8;m++){S.ball(w(m,0.8,((m%4)-1.5)*0.28,(Math.floor(m/4)-0.5)*0.5,[0,0,0]),0.1,m%2?'hi':'chem')}
  for(var q=0;q<8;q++){S.ball(w(q,2.4,((q%4)-1.5)*0.28,(Math.floor(q/4)-0.5)*0.5,[q<4?-0.25:0.25,0,0]),0.1,q<4?'hi':'chem')}
 }};
})();
