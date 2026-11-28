(function(){
'use strict';
var D3=window.VENU_D3;
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}

/* 1. Solid angle */

D3.vernier={en:'Vernier calipers',hi:'वर्नियर कैलिपर्स',h:0.66,view:{yaw:0,pitch:0.1,zoom:1},
 params:[{k:'p',en:'Jaw opening (cm)',hi:'जबड़ों का खुलाव (cm)',min:0,max:4.5,val:3.27,step:0.01,unit:''}],
 frame:function(S,t,P,l){
  var p=Math.max(0,Math.min(4.5,P.p)),X=function(c){return c-2.6},i,msr=Math.floor(p*10+1e-6)/10,vsr=Math.round((p-msr)*100),jaw=X(p);
  /* Main beam, fixed jaw, moving slider and measuring faces */
  S.box([0,0.22,0],[5.5,0.24,0.42],'soft');
  S.box([X(0)-0.06,-0.28,0],[0.18,1.28,0.42],'muted');
  S.box([jaw+0.05,-0.28,0],[0.18,1.28,0.42],'hi');
  S.box([jaw+0.34,0.02,0],[0.78,0.22,0.5],'hi');
  S.box([X(0)+0.36,0.02,0],[0.72,0.22,0.5],'muted');
  /* External and internal measuring jaws */
  S.rod([X(0)-0.06,-0.9,0],[X(0)-0.06,-0.28,0],0.07,'muted');
  S.rod([jaw+0.05,-0.9,0],[jaw+0.05,-0.28,0],0.07,'hi');
  S.rod([X(0)-0.06,0.38,0],[X(0)-0.06,0.82,0],0.045,'muted');
  S.rod([jaw+0.05,0.38,0],[jaw+0.05,0.82,0],0.045,'hi');
  /* Object, depth blade and lock screw make the physical mechanism explicit. */
  S.rod([X(0)+0.02,-0.62,0.16],[jaw-0.02,-0.62,0.16],0.105,'gold');
  S.rod([2.75,0.22,-0.12],[3.55,0.22,-0.12],0.035,'muted');
  S.ball([jaw+0.38,0.43,0.28],0.105,'gold');
  S.rod([jaw+0.34,0.42,0.28],[jaw+0.34,0.66,0.28],0.055,'muted');
  for(i=0;i<=50;i++){var h=i%10===0?0.24:i%5===0?0.17:0.1;S.line([X(i/10),0.36,0.22],[X(i/10),0.36-h,0.22],'ink',i%10===0?1.5:0.9)}
  for(i=0;i<=5;i++)S.text([X(i),0.62,0.22],''+i,'ink',10,'center',true);
  /* 10 VSD = 9 MSD: each vernier division is 0.09 cm, LC = 0.01 cm. */
  for(i=0;i<=10;i++){var vx=X(p+i*0.09),on=i===vsr;S.line([vx,0.03,0.26],[vx,on?-0.19:-0.075,0.26],on?'gold':'ink',on?2.8:1)}
  S.text([X(p),-0.25,0.28],'0','hi',8,'center',true);S.text([X(p+0.9),-0.25,0.28],'10','hi',8,'center',true);
  S.text([-1.95,0.98,0],T(l,'Fixed jaw','स्थिर जबड़ा'),'muted',10,'center',true);S.text([jaw+0.25,0.98,0],T(l,'Movable jaw','चल जबड़ा'),'accent',10,'center',true);
  S.text([0,-0.93,0.3],T(l,'Measured object','मापी जा रही वस्तु'),'gold',9,'center',true);S.text([1.9,0.54,0.2],T(l,'Main scale','मुख्य पैमाना'),'muted',10,'center',true);
  S.text([-1.55,1.16,0],T(l,'Inside jaws','आंतरिक जबड़े'),'muted',8,'center',true);S.text([2.7,0.72,-0.12],T(l,'Depth rod','गहराई छड़'),'muted',8,'center',true);
  S.text([jaw+0.56,0.48,0.3],T(l,'Lock screw','लॉक स्क्रू'),'muted',8,'center',true);
  S.hud(0.5,0.91,T(l,'10 VSD = 9 MSD · LC = 0.01 cm','10 वर्नियर भाग = 9 मुख्य भाग · अल्पतमांक = 0.01 cm'),'accent',10,'center',true);
  S.hud(0.5,0.97,T(l,'MSR ','मुख्य पाठ ')+msr.toFixed(2)+' cm + '+vsr+' × 0.01 = '+p.toFixed(2)+' cm','ink',11,'center',true);
 }};
})();
