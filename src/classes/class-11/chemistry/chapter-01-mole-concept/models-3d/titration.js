(function(){
'use strict';
var D3=window.VENU_D3;
var T=VH.T,mol=VH.mol,wire=VH.wire,B=function(e,h){return {en:e,hi:h}};
var H_='muted',O_='bad',N_='phys';
var N2=[[-0.16,0,0,N_,0.15],[0.16,0,0,N_,0.15]],H2=[[-0.13,0,0,H_,0.1],[0.13,0,0,H_,0.1]],
    NH3=[[0,0,0,N_,0.17],[-0.3,-0.22,0,H_,0.1],[0.3,-0.22,0,H_,0.1],[0,-0.22,0.3,H_,0.1]];


D3.titration={en:'Titration: KMnO₄ vs FeSO₄',hi:'अनुमापन: KMnO₄ बनाम FeSO₄',h:0.9,view:{yaw:-0.4,pitch:0.15,zoom:1},
 frame:function(S,t,P,l){
  var p=(t%14)/14,drop=p<0.78?(p%0.13)/0.13:0,done=p>0.78,fill=0.18+Math.min(0.62,p/0.78*0.62),i;
  /* Retort stand, clamp and burette */
  S.rod([-1.65,-1.45,0],[-1.65,1.65,0],0.08,'muted');S.box([-1.25,-1.48,0],[1.1,0.13,0.65],'muted');
  S.rod([-1.65,1.12,0],[0.25,1.12,0],0.055,'muted');S.glassBox([-0.25,0.42,0],[0.34,1.72,0.34]);
  S.box([-0.25,0.42,0],[0.18,1.4,0.18],'#B07CC6');
  for(i=0;i<8;i++)S.line([-0.08,1.0-i*0.16,0.12],[0.03,1.0-i*0.16,0.12],'ink',0.8);
  S.text([0.22,1.2,0],'Burette','ink',11,'left',true);S.text([0.24,0.75,0],'Scale','muted',9,'left');
  S.box([-0.25,-0.52,0],[0.42,0.12,0.3],'muted');S.rod([-0.25,-0.58,0],[0.12,-0.58,0],0.045,'ink');S.ball([0.13,-0.58,0],0.07,'gold');
  /* Conical flask outline, neck and solution surface */
  S.line([-0.25,-0.67,0],[0.25,-0.67,0],'ink',2);S.line([-0.25,-0.67,0],[-0.75,-1.55,0],'ink',2);S.line([0.25,-0.67,0],[0.75,-1.55,0],'ink',2);S.line([-0.75,-1.55,0],[0.75,-1.55,0],'ink',2);
  S.poly([[-0.63,-1.32,0.02],[0.63,-1.32,0.02],[0.75,-1.55,0.02],[-0.75,-1.55,0.02]],done?'#E7A0C7':'#C9DCEB',0.85,'muted');
  if(!done)S.ball([0.13,-0.72-drop*0.55,0],0.045,'#B07CC6');
  S.text([0,-1.72,0],'Conical flask','ink',10,'center',true);S.text([0.95,-1.05,0],'Analyte + indicator','muted',9,'left');
  S.hud(0.5,0.91,'Step 1: add titrant dropwise · Step 2: swirl flask','accent',11,'center',true);
  S.hud(0.5,0.97,done?'Endpoint: faint permanent pink':'Before endpoint: indicator colour disappears','ink',11,'center',true);
 }};
})();
