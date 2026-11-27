(function(){
'use strict';
var D3=window.VENU_D3;
var T=VH.T,mol=VH.mol,wire=VH.wire,B=function(e,h){return {en:e,hi:h}};


D3.eudio={en:'Eudiometry',hi:'यूडियोमेट्री (गैस विश्लेषण)',h:0.8,view:{yaw:-0.35,pitch:0.12,zoom:1},
 frame:function(S,t,P,l){
  var st=Math.floor((t%15)/5),vol=[65,40,10][st],i,base=-1.2;
  /* Gas burette / graduated tube with water jacket */
  S.glassBox([-0.95,0.05,0],[0.72,2.65,0.72]);S.box([-0.95,0.0,0.31],[0.34,2.25,0.08],'#D7EAF7');
  for(i=0;i<=10;i++){var y=1.0-i*0.2;S.line([-0.72,y,0.38],[-0.56,y,0.38],'ink',0.9);if(i%2===0)S.text([-0.42,y,0.38],''+(i*5),'ink',9,'left')}
  S.text([-0.95,1.55,0],'Gas tube','ink',10,'center',true);
  S.box([-0.95,base+vol/65*2.2/2,0.32],[0.3,vol/65*2.2,0.06],'#B7D9EC');
  /* Reaction vessel, delivery tube and absorption stage */
  S.rod([-0.65,1.1,0],[0.1,1.1,0],0.05,'muted');S.rod([0.1,1.1,0],[0.1,0.5,0],0.05,'muted');
  S.glassBox([1.05,0.0,0],[0.95,1.45,0.78]);S.text([1.05,0.55,0],'Reaction','ink',10,'center',true);
  S.ball([0.85,0.05,0.42],0.12,'gold');S.ball([1.12,-0.22,0.42],0.12,'gold');
  S.text([1.05,-0.9,0],st===0?'Mix gases':st===1?'Spark + cool':'KOH absorbs CO₂','accent',10,'center',true);
  S.hud(0.5,0.91,'Stage '+(st+1)+' / 3  ·  Gas volume = '+vol+' mL','accent',12,'center',true);
  S.hud(0.5,0.97,st===0?'Initial mixture':st===1?'Water condenses; gases remain':'CO₂ removed; residual gas measured','ink',11,'center',true);
 }};
})();
