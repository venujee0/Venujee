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


D3.states={en:'Solid, liquid and gas',hi:'ठोस, द्रव और गैस',h:0.62,view:{yaw:-0.35,pitch:0.3,zoom:1},
 params:[{k:'T',en:'Temperature',hi:'तापमान',min:0,max:100,val:30,step:1,unit:'%'}],
 frame:function(S,t,P,l){
  var k=P.T/100,xs=[-2.3,0,2.3],names=[T(l,'Solid','ठोस'),T(l,'Liquid','द्रव'),T(l,'Gas','गैस')];
  for(var b=0;b<3;b++){
    S.glassBox([xs[b],-0.05,0],[1.9,2.05,1.9]);S.text([xs[b],-1.2,0],names[b],'accent',13,'center',true);
    for(var i=0;i<12;i++){
      var gx=(i%3)-1,gy=(Math.floor(i/3)%2)-0.5,gz=Math.floor(i/6)-0.5,s=i*1.7,x,y,z;
      if(b===0){var a=0.03+0.12*k;x=gx*0.5+a*Math.sin(t*9+s);y=gy*0.5-0.35+a*Math.sin(t*8+s*2);z=gz*0.5+a*Math.cos(t*7+s)}
      else if(b===1){var a2=0.12+0.35*k;x=gx*0.5+a2*Math.sin(t*2+s);y=gy*0.4-0.45+a2*0.5*Math.sin(t*2.3+s*2);z=gz*0.5+a2*Math.cos(t*1.8+s)}
      else{var v=0.5+1.6*k;x=0.8*tri(t*v*0.5+s);y=0.8*tri(t*v*0.43+s*1.3);z=0.8*tri(t*v*0.37+s*2.1)}
      S.ball([xs[b]+x,y,z],0.12,b===2?'hi':'chem');
    }
  }
 }};
})();
