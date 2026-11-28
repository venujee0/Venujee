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


D3.isotopes={en:'Isotopes of chlorine',hi:'क्लोरीन के समस्थानिक',h:0.62,spin:true,view:{yaw:-0.4,pitch:0.3,zoom:1},
 frame:function(S,t,P,l){
  var shift=Math.sin(t*0.7)*0.08;
  function atom(cx,neut,label){S.ball([cx,0,0],0.55,'soft');S.ball([cx,0,0],0.29,'bad');for(var i=0;i<17;i++){var a=i/17*6.2832;S.ball([cx+0.78*Math.cos(a),0.78*Math.sin(a),0],0.055,'phys')}
    for(var j=0;j<17;j++){var a2=j*2.399;S.ball([cx+0.22*Math.cos(a2),0.22*Math.sin(a2),0.15],0.045,'white')}
    for(var n=0;n<neut;n++){var an=n*2.399+0.4;S.ball([cx+0.22*Math.cos(an),0.22*Math.sin(an),-0.15],0.045,'muted')}
    S.text([cx,1.15,0],label,'ink',13,'center',true);S.text([cx,-1.05,0],'17 p · '+neut+' n · 17 e⁻','ink',10,'center',true)}
  atom(-1.25,18,'³⁵Cl');atom(1.25,20,'³⁷Cl');
  S.hud(0.5,0.91,'Same atomic number (17), different neutron count','accent',12,'center',true);
  S.hud(0.5,0.97,'Isotopes: same element · different mass number','ink',11,'center',true);
 }};
})();
