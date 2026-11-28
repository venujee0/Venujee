(function(){
'use strict';
var D3=window.VENU_D3;
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}

/* 1. Solid angle */

D3.screw={en:'Micrometer screw gauge',hi:'माइक्रोमीटर स्क्रू गेज',h:0.72,scale:1.05,view:{yaw:-0.24,pitch:0.18,zoom:1},params:[{k:'p',en:'Object diameter (mm)',hi:'वस्तु का व्यास (mm)',min:0,max:10,val:2.35,step:0.01,unit:' mm'}],
 frame:function(S,t,P,l){
  var p=Math.max(0,Math.min(10,P.p)),gap=0.10+p*0.064,anvil=-0.88,face=anvil+gap,i,read=p.toFixed(2),msr=Math.floor((p+1e-8)/0.5)*0.5,csr=Math.max(0,Math.min(49,Math.round((p-msr)/0.01))),ang=Math.PI/2-csr*6.283185307179586/50;
  S.rod([-1.78,1.18,0],[-1.78,-1.18,0],0.23,'muted');
  S.rod([-1.78,1.18,0],[0.34,1.18,0],0.23,'muted');
  S.rod([-1.78,-1.18,0],[0.34,-1.18,0],0.23,'muted');
  S.box([-1.48,0,0],[0.48,0.76,0.72],'muted');
  S.rod([-1.28,0,0],[anvil,0,0],0.19,'gold');
  S.rod([anvil,-0.29,0],[anvil,0.29,0],0.08,'gold');
  S.rod([anvil+0.02,0,0],[face-0.03,0,0],0.13,'chem');
  S.rod([face,0,0],[0.92,0,0],0.13,'ink');
  S.rod([face,-0.28,0],[face,0.28,0],0.09,'ink');
  S.rod([0.52,0,0],[1.14,0,0],0.19,'soft');
  /* Reference line is at the top of the thimble; CSR division aligns to it. */
  S.line([0.58,0,0.46],[1.12,0,0.46],'bad',2);
  for(i=0;i<=10;i++){var x=0.62+i*0.048;S.line([x,0.16,0.2],[x,i%5===0?-0.12:-0.055,0.2],'ink',i%5===0?1.8:0.9);if(i%5===0)S.text([x,0.31,0.2],String(i/2),'ink',8,'center',true)}
  S.rod([1.12,0,0],[1.92,0,0],0.43,'hi');S.ring([1.54,0,0],0.46,'yz','ink',2);
  for(i=0;i<50;i++){var a=ang+i/50*6.2832;S.line([1.54,0.46*Math.cos(a),0.46*Math.sin(a)],[1.54,0.35*Math.cos(a),0.35*Math.sin(a)],i%5===0?'gold':'ink',i%5===0?2:0.85)}
  S.rod([1.9,0,0],[2.24,0,0],0.23,'muted');S.ring([2.2,0,0],0.25,'yz','muted',2);
  S.text([-1.18,0.55,0],T(l,'Anvil','एनविल'),'ink',9,'center',true);
  S.text([-0.28,0.47,0],T(l,'Object / wire','वस्तु / तार'),'chem',9,'center',true);
  S.text([0.08,-0.34,0],T(l,'Spindle','स्पिंडल'),'ink',9,'center',true);
  S.text([0.82,0.55,0],T(l,'Sleeve / main scale','स्लीव / मुख्य पैमाना'),'muted',9,'center',true);
  S.text([1.54,-0.68,0],T(l,'Thimble / circular scale','थिम्बल / वृत्ताकार पैमाना'),'ink',8,'center',true);
  S.text([2.18,-0.4,0],T(l,'Ratchet','रैचेट'),'muted',9,'center',true);
  S.hud(0.5,0.91,T(l,'Pitch = 0.5 mm · 50 divisions · LC = 0.01 mm','पिच = 0.5 mm · 50 भाग · अल्पतमांक = 0.01 mm'),'accent',10,'center',true);
  S.hud(0.5,0.97,T(l,'Reading = ','पाठ्यांक = ')+msr.toFixed(2)+' + '+csr+' × 0.01 = '+read+' mm','ink',10,'center',true);
 }};
})();
