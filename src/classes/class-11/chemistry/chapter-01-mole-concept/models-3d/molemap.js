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


D3.molemap={en:'Mole map',hi:'मोल का नक्शा',h:0.7,view:{yaw:-0.2,pitch:0.2,zoom:1},
 frame:function(S,t,P,l){
  var nodes=[[-1.7,0.9,T(l,'Mass w (g)','द्रव्यमान w (g)'),'w / M'],[1.7,0.9,T(l,'Particles N','कण N'),'N / Nₐ'],[-1.7,-0.9,T(l,'Gas volume V (L)','गैस आयतन V (L)'),'V / Vₘ'],[1.7,-0.9,T(l,'Solution M×V','विलयन M×V'),'M × V(L)']],a=Math.floor(t/2)%4,ph=(t%2)/2;
  nodes.forEach(function(n,i){
    var on=i===a;S.arrow([n[0]*0.45,n[1]*0.45,0],[n[0]*0.45*0.2,n[1]*0.45*0.2,0],on?'gold':'line',on?3:1.5);
    S.ball([n[0],n[1],0],on?0.3+0.05*Math.sin(ph*6.28):0.24,on?'gold':'chem');
    S.text([n[0],n[1]-0.45,0],n[2],'ink',11,'center',true);
    S.text([n[0]*0.55,n[1]*0.55+0.12,0.1],n[3],on?'accent':'muted',11,'center',true);
  });
  S.ball([0,0,0],0.4,'hi');S.text([0,0,0.45],T(l,'n mol','n मोल'),'white',12,'center',true);
  var t0=nodes[a];S.ball([t0[0]*(1-ph),t0[1]*(1-ph),0.2],0.1,'white');
 }};
})();
