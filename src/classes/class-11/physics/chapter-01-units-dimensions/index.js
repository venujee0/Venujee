(function(){
  'use strict';
  var CH=window.VENU_CHAPTERS_DATA;
  var D3=window.VENU_D3, D3ATT=window.VENU_D3ATT, DG=window.VENU_DG;
  var esc=function(s){return String(s).replace(/[&<>\"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]})};
  var find=function(a,needle){return a.filter(function(s){return s.h.en.indexOf(needle)>-1})[0]};
// Class 11 Physics — Ch 1: Units, Dimensions and Measurement — Hindi + English, 11 interactive 3D animations
(function(){
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}

/* 1. Solid angle */
D3.solidangle={en:'Solid angle',hi:'ठोस कोण',h:0.8,spin:true,view:{yaw:-0.5,pitch:0.3,zoom:1},
 params:[{k:'a',en:'Cone angle α',hi:'शंकु कोण α',min:10,max:90,val:40,step:1,unit:'°'}],
 frame:function(S,t,P,l){
  var R=1.3,al=P.a*Math.PI/180,i,ph;
  S.ring([0,0,0],R,'xy','muted',1);S.ring([0,0,0],R,'xz','muted',1);S.ring([0,0,0],R,'yz','muted',1);
  var rim=[];for(i=0;i<40;i++){ph=i/40*6.2832;rim.push([R*Math.sin(al)*Math.cos(ph),R*Math.cos(al),R*Math.sin(al)*Math.sin(ph)])}
  S.path(rim,'gold',2.4,false,true);
  for(i=0;i<40;i+=5)S.line([0,0,0],rim[i],'gold',1.2);
  S.line([0,0,0],[0,R*1.12,0],'accent',1.2,true);
  S.ball([0,0,0],0.07,'ink');
  S.text([0.12,R*Math.cos(al)+0.1,0],'A','gold',14,'left',true);
  S.text([0.1,0.15,0],'r','ink',12,'left');
  var om=2*Math.PI*(1-Math.cos(al));
  S.hud(0.5,0.93,'Ω = A/r² = 2π(1 − cos α) = '+om.toFixed(2)+' sr','accent',13,'center',true);
  S.hud(0.5,0.06,T(l,'Full sphere: Ω = 4π sr','पूरा गोला: Ω = 4π sr'),'muted',12,'center');
 }};

/* 2. Parallax and parsec */
D3.parsec={en:'Parallax and parsec',hi:'लंबन और पारसेक',h:0.8,view:{yaw:-0.45,pitch:0.45,zoom:1},
 frame:function(S,t,P,l){
  var a=t*0.7,ex=1.4*Math.cos(a),ez=1.4*Math.sin(a),zs=-2.2,zb=-4.2,i;
  S.ring([0,0,0],1.4,'xz','line',1.4);
  S.ball([0,0,0],0.2,'gold');S.text([0,0.35,0],T(l,'Sun','सूर्य'),'ink',11,'center',true);
  S.ball([ex,0,ez],0.1,'phys');S.text([ex,0.25,ez],T(l,'Earth','पृथ्वी'),'phys',10,'center',true);
  for(i=0;i<18;i++)S.ball([(rnd(i)*5-2.5),(rnd(i+40)*2.4-1.2),zb],0.035,'muted');
  S.ball([0,0,zs],0.1,'bad');S.text([0.25,0,zs],T(l,'near star','पास का तारा'),'bad',10,'left',true);
  var k=(zb-ez)/(zs-ez),bx=ex+(0-ex)*k;
  S.line([ex,0,ez],[bx,0,zb],'bad',1,true);
  S.ball([bx,0,zb],0.07,'bad');
  S.text([0,1.15,zb],T(l,'distant stars','दूर के तारे'),'muted',11,'center');
  S.hud(0.5,0.93,T(l,'1 AU subtends 1″ at 1 parsec: d = b/θ','1 AU जिस दूरी पर 1″ बनाए वह 1 पारसेक: d = b/θ'),'accent',12,'center',true);
 }};

/* 3. Liquid drop oscillation */
D3.drop={en:'Liquid drop oscillation',hi:'द्रव बूँद का दोलन',h:0.78,spin:true,view:{yaw:-0.5,pitch:0.3,zoom:1},
 params:[{k:'r',en:'Radius r',hi:'त्रिज्या r',min:0.6,max:1.4,val:1,step:0.05,unit:''},{k:'S',en:'Surface tension S',hi:'पृष्ठ तनाव S',min:0.5,max:3,val:1,step:0.1,unit:''}],
 frame:function(S,t,P,l){
  var r=P.r,w=3*Math.sqrt(P.S/Math.pow(r,3)),e=0.35*Math.sin(w*t),ax=r*(1+e),ay=r/Math.sqrt(1+e),i,ph,pts,pl=['xy','xz','yz'];
  function ell(plane){var q=[];for(i=0;i<48;i++){ph=i/48*6.2832;var c=Math.cos(ph),s=Math.sin(ph);
    q.push(plane==='xy'?[ax*c,ay*s,0]:plane==='xz'?[ax*c,0,ay*s]:[0,ay*c,ay*s])}return q}
  S.poly(ell('xy'),'hi',0.3,false,false);
  S.path(ell('xy'),'hi',2,false,true);S.path(ell('xz'),'chem',1.6,false,true);S.path(ell('yz'),'phys',1.6,false,true);
  S.hud(0.5,0.93,'T = k √(ρr³/S)','accent',14,'center',true);
  S.hud(0.5,0.06,T(l,'Surface tension pulls the drop back to a sphere','पृष्ठ तनाव बूँद को वापस गोला बनाने की कोशिश करता है'),'muted',11,'center');
 }};

/* 4. Vibrating string */
D3.string={en:'Vibrating string',hi:'कंपित तार',h:0.55,view:{yaw:-0.2,pitch:0.2,zoom:1},
 params:[{k:'l',en:'Length l',hi:'लंबाई l',min:1,max:2,val:1.5,step:0.1,unit:''},{k:'F',en:'Tension F',hi:'तनाव F',min:1,max:4,val:1,step:0.1,unit:''},{k:'m',en:'Mass per length µ',hi:'प्रति इकाई लंबाई द्रव्यमान µ',min:1,max:4,val:1,step:0.1,unit:''}],
 frame:function(S,t,P,l){
  var len=P.l||1.5,F=P.F||1,mu=P.m||1,amp=0.28,cycles=Math.max(1,Math.round(Math.sqrt(F/mu)*len/1.5)),pts=[];
  S.rod([-1.8,0,0],[1.8,0,0],0.045,'muted');
  for(var i=0;i<=60;i++){var x=-1.8+3.6*i/60,y=amp*Math.sin((x+1.8)/3.6*cycles*6.2832)*Math.cos(t*3.5);pts.push([x,y,0]);}
  S.path(pts,'chem',2.5,false,false);
  for(var n=0;n<=cycles;n++){var xx=-1.8+3.6*n/cycles;S.line([xx,-0.4,0],[xx,0.4,0],'muted',0.8,true);S.text([xx,-0.55,0],n===0||n===cycles?'End':(n%2?'A':'N'),'ink',9,'center',true)}
  S.hud(0.5,0.91,'Length = '+len.toFixed(1)+'  ·  Tension = '+F.toFixed(1)+'  ·  μ = '+mu.toFixed(1),'accent',11,'center',true);
  S.hud(0.5,0.97,'Standing wave: nodes remain fixed; antinodes oscillate','ink',11,'center',true);
 }};

/* 5. Terminal velocity */
D3.terminal={en:'Terminal velocity',hi:'सीमांत वेग',h:0.9,view:{yaw:-0.4,pitch:0.15,zoom:1},
 frame:function(S,t,P,l){
  var v=Math.min(1,t/5),speed=1.2+2.8*(1-Math.exp(-t/2.5)),y=1.0-v*2.1;
  S.box([0,0,0],[3.4,3.2,1.0],'soft');S.box([0,-0.95,0],[3.25,1.15,0.92],'#B9DCEB');
  S.line([-1.6,0.95,0],[1.6,0.95,0],'muted',1);S.ball([0,y,0],0.24,'gold');
  S.arrow([0,y+0.32,0],[0,y+0.95,0],'bad',2.6);S.text([0.22,y+0.78,0],'Weight mg','bad',10,'left',true);
  S.arrow([0,y-0.28,0],[0,y-0.75,0],'phys',2.4);S.text([0.22,y-0.65,0],'Buoyancy + drag','phys',9,'left',true);
  S.hud(0.5,0.91,'Speed rises then approaches terminal speed','accent',12,'center',true);
  S.hud(0.5,0.97,'At terminal velocity: mg = buoyancy + viscous drag','ink',11,'center',true);
 }};

/* 6. Accuracy vs precision */
D3.target={en:'Accuracy vs precision',hi:'यथार्थता बनाम परिशुद्धता',h:0.78,view:{yaw:-0.2,pitch:0.45,zoom:1},
 frame:function(S,t,P,l){
  var mode=Math.floor(t/3)%3,shots=mode===0?[[0.05,0.02],[-0.05,0.04],[0.02,-0.04],[0,0]]:mode===1?[[0.62,0.55],[0.7,0.5],[0.55,0.66],[0.64,0.58]]:[[-0.55,-0.48],[0.55,0.5],[-0.6,0.55],[0.6,-0.55]];
  S.disc([0,0,0],1.25,'xy','soft',0.35);S.ring([0,0,0.03],1.25,'xy','muted',2);
  S.ring([0,0,0.04],0.08,'xy','bad',1.5);
  shots.forEach(function(q,i){S.ball([q[0],q[1],0.1],0.065,'bad');S.line([q[0],q[1],0.12],[q[0]*1.08,q[1]*1.08,0.12],'bad',1)});
  S.text([0,-1.5,0],mode===0?'Accurate + precise':mode===1?'Precise, not accurate':'Neither accurate nor precise','ink',11,'center',true);
  S.hud(0.5,0.91,'Three patterns: close to centre · tightly grouped · scattered','accent',11,'center',true);
  S.hud(0.5,0.97,'Accuracy = closeness to true value · Precision = repeatability','ink',10,'center',true);
 }};

/* 7. Simple pendulum */
D3.pendulum={en:'Simple pendulum',hi:'सरल लोलक',h:0.85,view:{yaw:-0.2,pitch:0.15,zoom:1},
 params:[{k:'L',en:'Length L (m)',hi:'लंबाई L (m)',min:0.5,max:2.2,val:1,step:0.05,unit:''}],
 frame:function(S,t,P,l){
  var L=P.L||1,theta=0.62*Math.sin(t*2.2),x=L*Math.sin(theta),y=-L*Math.cos(theta);
  S.box([0,1.55,0],[1.45,0.12,0.6],'muted');S.rod([0,1.48,0],[x,y,0],0.035,'ink');S.ball([x,y,0],0.18,'gold');S.shadow([x,y,0],0.3,-1.5);
  S.ring([0,1.48,0],0.18,'xz','muted',1.5);S.arrow([x,y,0],[x,y-0.55,0],'bad',2);
  S.arrow([x,y,0],[x+0.55*Math.sin(theta),y+0.55*Math.cos(theta),0],'phys',2);
  S.text([0.75,1.1,0],'Support','ink',10,'left',true);S.text([x+0.35,y-0.55,0],'mg','bad',11,'left',true);
  S.text([x+0.65,y+0.1,0],'Tension','phys',10,'left',true);
  S.hud(0.5,0.91,'Length L = '+L.toFixed(2)+' m  ·  angle = '+(theta*57.3).toFixed(1)+'°','accent',12,'center',true);
  S.hud(0.5,0.97,'T = 2π√(L/g)  ·  ideal small-angle model','ink',12,'center',true);
 }};

/* 8. Vernier calipers */
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

/* 9. Vernier zero error */
D3.vzero={en:'Vernier zero error',hi:'वर्नियर शून्य त्रुटि',h:0.62,view:{yaw:0,pitch:0.1,zoom:1},
 frame:function(S,t,P,l){
  var st=Math.floor(t/6)%2,lt=t%6,tgt=st===0?0.04:-0.04,o=tgt*ease(lt/1.6),X=function(c){return (c-0.45)*3.6},i,k=st===0?4:6;
  S.box([0,0.5,0],[4.2,0.35,0.3],'soft');
  for(i=-1;i<=10;i++){S.line([X(i/10),0.67,0.17],[X(i/10),0.67-(i%10===0?0.28:0.15),0.17],'ink',i%10===0?1.8:1)}
  S.text([X(0),0.98,0.17],'0','ink',11,'center',true);S.text([X(1),0.98,0.17],'1 cm','ink',11,'center',true);
  S.box([0,-0.05,0],[4.2,0.35,0.3],'hi');
  for(i=0;i<=10;i++){var on=lt>2&&i===k,vx=X(o+0.09*i);S.line([vx,0.17,0.17],[vx,on?-0.15:-0.02,0.17],on?'gold':'paper',on?3.2:1.2)}
  S.text([X(o),-0.45,0.17],'0','paper',10,'center',true);
  if(lt>2)S.text([X(o+0.09*k),-0.5,0.17],''+k,'gold',13,'center',true);
  S.hud(0.5,0.92,st===0?T(l,'Positive: + 4 × LC = + 0.04 cm','धनात्मक: + 4 × LC = + 0.04 cm'):T(l,'Negative: − (10 − 6) × LC = − 0.04 cm','ऋणात्मक: − (10 − 6) × LC = − 0.04 cm'),'accent',13,'center',true);
 }};

/* 10. Screw gauge */
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

/* 11. Screw gauge zero error */
D3.szero={en:'Screw gauge zero error',hi:'स्क्रू गेज शून्य त्रुटि',h:0.7,view:{yaw:-0.15,pitch:0.1,zoom:1},
 frame:function(S,t,P,l){
  var st=Math.floor(t/6)%2,lt=t%6,off=(st===0?-0.5:0.5)*ease(lt/1.8),i;
  S.line([-1.6,0,0.2],[1.6,0,0.2],'bad',2.4);S.text([-1.7,0.12,0.2],T(l,'reference line','संदर्भ रेखा'),'bad',11,'left',true);
  S.box([0.4,0,0],[1.0,3.0,0.2],'soft');
  for(i=-12;i<=12;i++){var y=off+i*0.1;if(Math.abs(y)>1.4)continue;S.line([0.0,y,0.15],[i%5===0?0.5:0.25,y,0.15],'ink',i%5===0?2:1);
    if(i%5===0)S.text([0.6,y,0.15],''+(((i%50)+50)%50),'ink',11,'left',true)}
  S.hud(0.5,0.93,st===0?T(l,'Positive: zero below the line → + 5 div','धनात्मक: शून्य रेखा के नीचे → + 5 भाग'):T(l,'Negative: zero above the line → − (N − m) div','ऋणात्मक: शून्य रेखा के ऊपर → − (N − m) भाग'),'accent',12,'center',true);
 }};

var c={
 id:'physics-units-dimensions',cls:11,subject:'physics',ord:1,
 title:B('Units, Dimensions and Measurement','मात्रक, विमाएँ एवं मापन'),
 blurb:B('Physical quantities, SI units, dimensions and dimensional analysis, significant figures, errors, vernier calipers and screw gauge — foundation to JEE Advanced level.','भौतिक राशियाँ, SI मात्रक, विमाएँ और विमीय विश्लेषण, सार्थक अंक, त्रुटियाँ, वर्नियर कैलिपर्स और स्क्रू गेज — आधार से JEE Advanced स्तर तक।'),
 sections:[],formulas:[],examples:[],rev:{en:[],hi:[]}
};
CH.push(c);

c.sections.push(
 {h:B('1.1 Physical quantity and measurement','1.1 भौतिक राशि एवं मापन'),
  body:B('<p>Physics rests on experiment, and an experiment means measuring. Any quantity that can be measured and used to write the laws of physics is a <b>physical quantity</b>.</p><p>Measurement is really a comparison: “how many times is the given quantity of the chosen standard (unit)?” So every measurement has two parts:</p><p class="fx">Q = n u &nbsp; (n = numerical value, u = unit)</p><p><b>Concept:</b> the length of a table does not change whether you measure it in metres or centimetres, so Q is constant:</p><p class="fx">n₁u₁ = n₂u₂ ⇒ n ∝ 1/u</p><p>A smaller unit gives a bigger number: 2 m = 200 cm.</p>',
  '<p>भौतिकी प्रयोग पर टिकी है, और प्रयोग का मतलब है नापना। जिस राशि को नापा जा सके और जिससे भौतिकी के नियम लिखे जा सकें, वह <b>भौतिक राशि</b> है।</p><p>मापन असल में तुलना है: “दी गई राशि चुने हुए मानक (मात्रक) की कितनी गुनी है?” इसलिए हर मापन के दो भाग होते हैं:</p><p class="fx">Q = n u &nbsp; (n = संख्यात्मक मान, u = मात्रक)</p><p><b>अवधारणा:</b> मेज़ की लंबाई नहीं बदलती, चाहे मीटर में नापो या सेमी में। यानी Q स्थिर है:</p><p class="fx">n₁u₁ = n₂u₂ ⇒ n ∝ 1/u</p><p>मात्रक छोटा करोगे तो संख्या बड़ी आएगी: 2 m = 200 cm।</p>')},
 {h:B('1.1.1 Types of quantities','1.1.1 राशियों के प्रकार'),
  body:B('<ul><li><b>Fundamental:</b> quantities taken as independent (7 in SI).</li><li><b>Derived:</b> built from base quantities by products or ratios, e.g. speed, force, charge.</li><li><b>Scalar / vector / tensor:</b> according to dependence on direction. Current has a direction but does not follow vector addition, so it is a scalar.</li></ul><p>A good unit is well defined, invariable (does not change with time, place or temperature), reproducible and accepted by all.</p>',
  '<ul><li><b>मूल राशियाँ:</b> जिन्हें स्वतंत्र माना गया है (SI में 7)।</li><li><b>व्युत्पन्न राशियाँ:</b> मूल राशियों के गुणनफल या अनुपात से बनती हैं, जैसे चाल, बल, आवेश।</li><li><b>अदिश / सदिश / टेंसर:</b> दिशा पर निर्भरता के अनुसार। धारा की दिशा होती है पर वह सदिश योग का पालन नहीं करती, इसलिए अदिश है।</li></ul><p>अच्छा मात्रक सुपरिभाषित, अपरिवर्तनीय (समय, स्थान या ताप से न बदले), पुनरुत्पादनीय और सबको स्वीकार्य होना चाहिए।</p>')},
 {h:B('1.2 SI system of units','1.2 मात्रकों की SI पद्धति'),
  body:B('<p>Older systems: CGS (cm, g, s), FPS (foot, pound, s), MKS (m, kg, s). Today the world uses SI. Since 2019 all seven base units are defined by fixing exact values of universal constants.</p><table><tr><th>Quantity</th><th>Unit</th><th>Fixed constant</th></tr><tr><td>Time</td><td>second (s)</td><td>Cs-133 hyperfine frequency Δν = 9 192 631 770 Hz</td></tr><tr><td>Length</td><td>metre (m)</td><td>speed of light c = 299 792 458 m s⁻¹</td></tr><tr><td>Mass</td><td>kilogram (kg)</td><td>Planck constant h = 6.626 070 15 × 10⁻³⁴ J s</td></tr><tr><td>Current</td><td>ampere (A)</td><td>elementary charge e = 1.602 176 634 × 10⁻¹⁹ C</td></tr><tr><td>Temperature</td><td>kelvin (K)</td><td>Boltzmann k = 1.380 649 × 10⁻²³ J K⁻¹</td></tr><tr><td>Amount</td><td>mole (mol)</td><td>Nₐ = 6.022 140 76 × 10²³ mol⁻¹</td></tr><tr><td>Luminous intensity</td><td>candela (cd)</td><td>luminous efficacy K = 683 lm W⁻¹ (540 × 10¹² Hz)</td></tr></table>',
  '<p>पुरानी पद्धतियाँ: CGS (cm, g, s), FPS (foot, pound, s), MKS (m, kg, s)। आज दुनिया SI इस्तेमाल करती है। 2019 से सातों मूल मात्रक सार्वत्रिक नियतांकों के यथार्थ मान तय करके परिभाषित किए जाते हैं।</p><table><tr><th>राशि</th><th>मात्रक</th><th>तय किया गया नियतांक</th></tr><tr><td>समय</td><td>सेकंड (s)</td><td>Cs-133 अतिसूक्ष्म आवृत्ति Δν = 9 192 631 770 Hz</td></tr><tr><td>लंबाई</td><td>मीटर (m)</td><td>प्रकाश की चाल c = 299 792 458 m s⁻¹</td></tr><tr><td>द्रव्यमान</td><td>किलोग्राम (kg)</td><td>प्लांक नियतांक h = 6.626 070 15 × 10⁻³⁴ J s</td></tr><tr><td>धारा</td><td>ऐम्पियर (A)</td><td>मूल आवेश e = 1.602 176 634 × 10⁻¹⁹ C</td></tr><tr><td>ताप</td><td>केल्विन (K)</td><td>बोल्ट्ज़मान k = 1.380 649 × 10⁻²³ J K⁻¹</td></tr><tr><td>पदार्थ की मात्रा</td><td>मोल (mol)</td><td>Nₐ = 6.022 140 76 × 10²³ mol⁻¹</td></tr><tr><td>ज्योति तीव्रता</td><td>कैंडेला (cd)</td><td>ज्योति दक्षता K = 683 lm W⁻¹ (540 × 10¹² Hz)</td></tr></table>')},
 {h:B('1.2.1 Plane angle and solid angle','1.2.1 समतल कोण एवं ठोस कोण'),
  body:B('<p class="fx">θ = s/r (radian) &nbsp; Ω = A/r² (steradian)</p><p>The angle of a full circle is 2π rad and the solid angle of a full sphere is 4π sr. Both are dimensionless (length/length, area/area), yet they have units.</p><p class="fx">1° = π/180 rad, 1′ = (1/60)°, 1″ = (1/60)′ ≈ 4.85 × 10⁻⁶ rad</p>',
  '<p class="fx">θ = s/r (रेडियन) &nbsp; Ω = A/r² (स्टेरेडियन)</p><p>पूरे वृत्त का कोण 2π rad और पूरे गोले का ठोस कोण 4π sr होता है। दोनों विमाहीन हैं (लंबाई/लंबाई, क्षेत्रफल/क्षेत्रफल), फिर भी इनके मात्रक होते हैं।</p><p class="fx">1° = π/180 rad, 1′ = (1/60)°, 1″ = (1/60)′ ≈ 4.85 × 10⁻⁶ rad</p>'),
  d3:'solidangle',cap3:B('A cone from the centre cuts out an area A on the sphere. Move the slider to change the solid angle.','केंद्र से बना शंकु गोले की सतह पर क्षेत्रफल A काटता है। स्लाइडर चलाकर ठोस कोण बदलो।')},
 {h:B('1.2.2 Prefixes','1.2.2 उपसर्ग'),
  body:B('<table><tr><th>Prefix</th><th>Sym.</th><th>Power</th><th>Prefix</th><th>Sym.</th><th>Power</th></tr><tr><td>exa</td><td>E</td><td>10¹⁸</td><td>deci</td><td>d</td><td>10⁻¹</td></tr><tr><td>peta</td><td>P</td><td>10¹⁵</td><td>centi</td><td>c</td><td>10⁻²</td></tr><tr><td>tera</td><td>T</td><td>10¹²</td><td>milli</td><td>m</td><td>10⁻³</td></tr><tr><td>giga</td><td>G</td><td>10⁹</td><td>micro</td><td>µ</td><td>10⁻⁶</td></tr><tr><td>mega</td><td>M</td><td>10⁶</td><td>nano</td><td>n</td><td>10⁻⁹</td></tr><tr><td>kilo</td><td>k</td><td>10³</td><td>pico</td><td>p</td><td>10⁻¹²</td></tr><tr><td>hecto</td><td>h</td><td>10²</td><td>femto</td><td>f</td><td>10⁻¹⁵</td></tr><tr><td>deca</td><td>da</td><td>10¹</td><td>atto</td><td>a</td><td>10⁻¹⁸</td></tr></table><p><b>Writing rules:</b> a unit symbol has no plural (10 kg). For units named after a person the symbol is capital (N, Pa) but the full name is small (newton). Two prefixes are never used together (µµF is wrong, pF is right). A power applies to the prefix too: 1 cm³ = (10⁻² m)³ = 10⁻⁶ m³.</p>',
  '<table><tr><th>उपसर्ग</th><th>चिह्न</th><th>घात</th><th>उपसर्ग</th><th>चिह्न</th><th>घात</th></tr><tr><td>exa</td><td>E</td><td>10¹⁸</td><td>deci</td><td>d</td><td>10⁻¹</td></tr><tr><td>peta</td><td>P</td><td>10¹⁵</td><td>centi</td><td>c</td><td>10⁻²</td></tr><tr><td>tera</td><td>T</td><td>10¹²</td><td>milli</td><td>m</td><td>10⁻³</td></tr><tr><td>giga</td><td>G</td><td>10⁹</td><td>micro</td><td>µ</td><td>10⁻⁶</td></tr><tr><td>mega</td><td>M</td><td>10⁶</td><td>nano</td><td>n</td><td>10⁻⁹</td></tr><tr><td>kilo</td><td>k</td><td>10³</td><td>pico</td><td>p</td><td>10⁻¹²</td></tr><tr><td>hecto</td><td>h</td><td>10²</td><td>femto</td><td>f</td><td>10⁻¹⁵</td></tr><tr><td>deca</td><td>da</td><td>10¹</td><td>atto</td><td>a</td><td>10⁻¹⁸</td></tr></table><p><b>लिखने के नियम:</b> मात्रक के चिह्न का बहुवचन नहीं होता (10 kg)। व्यक्ति के नाम वाले मात्रक का चिह्न बड़ा अक्षर (N, Pa) पर पूरा नाम छोटे अक्षरों में (newton)। दो उपसर्ग साथ नहीं लगते (µµF गलत, pF सही)। घात उपसर्ग पर भी लगती है: 1 cm³ = (10⁻² m)³ = 10⁻⁶ m³।</p>')},
 {h:B('1.3 Practical units','1.3 व्यावहारिक मात्रक'),
  body:B('<table><tr><th>Unit</th><th>Value</th></tr><tr><td>angstrom, fermi</td><td>10⁻¹⁰ m, 10⁻¹⁵ m</td></tr><tr><td>astronomical unit (AU)</td><td>1.496 × 10¹¹ m</td></tr><tr><td>light year (distance)</td><td>9.46 × 10¹⁵ m</td></tr><tr><td>parsec</td><td>3.08 × 10¹⁶ m ≈ 3.26 ly</td></tr><tr><td>atomic mass unit (u)</td><td>1.66 × 10⁻²⁷ kg</td></tr><tr><td>barn (area)</td><td>10⁻²⁸ m²</td></tr><tr><td>bar, atm</td><td>10⁵ Pa, 1.013 × 10⁵ Pa</td></tr><tr><td>electron volt (energy)</td><td>1.602 × 10⁻¹⁹ J</td></tr></table>',
  '<table><tr><th>मात्रक</th><th>मान</th></tr><tr><td>ऐंगस्ट्रम, फर्मी</td><td>10⁻¹⁰ m, 10⁻¹⁵ m</td></tr><tr><td>खगोलीय मात्रक (AU)</td><td>1.496 × 10¹¹ m</td></tr><tr><td>प्रकाश वर्ष (दूरी)</td><td>9.46 × 10¹⁵ m</td></tr><tr><td>पारसेक</td><td>3.08 × 10¹⁶ m ≈ 3.26 ly</td></tr><tr><td>परमाणु द्रव्यमान मात्रक (u)</td><td>1.66 × 10⁻²⁷ kg</td></tr><tr><td>बार्न (क्षेत्रफल)</td><td>10⁻²⁸ m²</td></tr><tr><td>bar, atm</td><td>10⁵ Pa, 1.013 × 10⁵ Pa</td></tr><tr><td>इलेक्ट्रॉन वोल्ट (ऊर्जा)</td><td>1.602 × 10⁻¹⁹ J</td></tr></table>')},
 {h:B('1.3.1 How is a parsec defined?','1.3.1 पारसेक कैसे बनता है?'),
  body:B('<p>The distance at which 1 AU subtends an angle of 1″ is 1 parsec. For small angles d = b/θ (θ in radian). See Example 1.</p>',
  '<p>जिस दूरी पर 1 AU की लंबाई 1″ का कोण बनाए, वह 1 पारसेक है। छोटे कोण के लिए d = b/θ (θ रेडियन में)। उदाहरण 1 देखो।</p>'),
  d3:'parsec',cap3:B('Earth circles the Sun; the near star shifts against the distant stars.','पृथ्वी सूर्य के चारों ओर घूमती है; पास का तारा दूर के तारों के सामने खिसकता दिखता है।')},
 {h:B('1.4 Dimensions','1.4 विमाएँ'),
  body:B('<p>The powers to which base quantities are raised to write a derived quantity are its <b>dimensions</b>.</p><p class="fx">[Q] = MᵃLᵇTᶜAᵈKᵉ …</p><p>Dimensions tell the nature of a quantity, not its size. Speed stays [LT⁻¹] whether in km/h or m/s.</p><p><b>3 steps to find a formula:</b> (1) write the simplest defining relation; (2) put the dimension of every factor; (3) add the powers. Drop pure numbers (2, π, ½).</p>',
  '<p>किसी व्युत्पन्न राशि को लिखने में मूल राशियों पर जो घातें लगती हैं, वे उसकी <b>विमाएँ</b> हैं।</p><p class="fx">[Q] = MᵃLᵇTᶜAᵈKᵉ …</p><p>विमा राशि की प्रकृति बताती है, उसका परिमाण नहीं। चाल km/h में हो या m/s में, [LT⁻¹] ही रहेगी।</p><p><b>सूत्र निकालने के 3 चरण:</b> (1) सबसे आसान परिभाषा-संबंध लिखो; (2) हर गुणक की विमा रखो; (3) घातें जोड़ो। शुद्ध संख्याएँ (2, π, ½) छोड़ दो।</p>')},
 {h:B('1.4.1 Mechanics','1.4.1 यांत्रिकी'),
  body:B('<table><tr><th>Quantity</th><th>Relation</th><th>Dimensions</th></tr><tr><td>Velocity, acceleration</td><td>s/t, v/t</td><td>[LT⁻¹], [LT⁻²]</td></tr><tr><td>Force</td><td>ma</td><td>[MLT⁻²]</td></tr><tr><td>Momentum, impulse</td><td>mv, Ft</td><td>[MLT⁻¹]</td></tr><tr><td>Work, energy, torque</td><td>Fs, rF</td><td>[ML²T⁻²]</td></tr><tr><td>Power</td><td>W/t</td><td>[ML²T⁻³]</td></tr><tr><td>Pressure, stress, modulus</td><td>F/A</td><td>[ML⁻¹T⁻²]</td></tr><tr><td>Surface tension</td><td>F/l</td><td>[MT⁻²]</td></tr><tr><td>Viscosity η</td><td>F = ηA dv/dx</td><td>[ML⁻¹T⁻¹]</td></tr><tr><td>Gravitational constant G</td><td>Fr²/m₁m₂</td><td>[M⁻¹L³T⁻²]</td></tr><tr><td>Angular velocity, frequency</td><td>θ/t, 1/T</td><td>[T⁻¹]</td></tr><tr><td>Moment of inertia</td><td>mr²</td><td>[ML²]</td></tr><tr><td>Angular momentum, h</td><td>mvr, E/ν</td><td>[ML²T⁻¹]</td></tr></table>',
  '<table><tr><th>राशि</th><th>संबंध</th><th>विमाएँ</th></tr><tr><td>वेग, त्वरण</td><td>s/t, v/t</td><td>[LT⁻¹], [LT⁻²]</td></tr><tr><td>बल</td><td>ma</td><td>[MLT⁻²]</td></tr><tr><td>संवेग, आवेग</td><td>mv, Ft</td><td>[MLT⁻¹]</td></tr><tr><td>कार्य, ऊर्जा, बल आघूर्ण</td><td>Fs, rF</td><td>[ML²T⁻²]</td></tr><tr><td>शक्ति</td><td>W/t</td><td>[ML²T⁻³]</td></tr><tr><td>दाब, प्रतिबल, प्रत्यास्थता गुणांक</td><td>F/A</td><td>[ML⁻¹T⁻²]</td></tr><tr><td>पृष्ठ तनाव</td><td>F/l</td><td>[MT⁻²]</td></tr><tr><td>श्यानता η</td><td>F = ηA dv/dx</td><td>[ML⁻¹T⁻¹]</td></tr><tr><td>गुरुत्वीय नियतांक G</td><td>Fr²/m₁m₂</td><td>[M⁻¹L³T⁻²]</td></tr><tr><td>कोणीय वेग, आवृत्ति</td><td>θ/t, 1/T</td><td>[T⁻¹]</td></tr><tr><td>जड़त्व आघूर्ण</td><td>mr²</td><td>[ML²]</td></tr><tr><td>कोणीय संवेग, h</td><td>mvr, E/ν</td><td>[ML²T⁻¹]</td></tr></table>')},
 {h:B('1.4.2 Heat and thermodynamics','1.4.2 ऊष्मा एवं ऊष्मागतिकी'),
  body:B('<table><tr><th>Quantity</th><th>Relation</th><th>Dimensions</th></tr><tr><td>Specific heat s</td><td>Q = ms∆T</td><td>[L²T⁻²K⁻¹]</td></tr><tr><td>Latent heat L</td><td>Q = mL</td><td>[L²T⁻²]</td></tr><tr><td>Boltzmann k</td><td>E = (3/2)kT</td><td>[ML²T⁻²K⁻¹]</td></tr><tr><td>Gas constant R</td><td>PV = nRT</td><td>[ML²T⁻²K⁻¹mol⁻¹]</td></tr><tr><td>Thermal conductivity K</td><td>Q/t = KA∆T/l</td><td>[MLT⁻³K⁻¹]</td></tr><tr><td>Stefan constant σ</td><td>P = σAT⁴</td><td>[MT⁻³K⁻⁴]</td></tr><tr><td>Wien constant b</td><td>λₘT = b</td><td>[LK]</td></tr></table>',
  '<table><tr><th>राशि</th><th>संबंध</th><th>विमाएँ</th></tr><tr><td>विशिष्ट ऊष्मा s</td><td>Q = ms∆T</td><td>[L²T⁻²K⁻¹]</td></tr><tr><td>गुप्त ऊष्मा L</td><td>Q = mL</td><td>[L²T⁻²]</td></tr><tr><td>बोल्ट्ज़मान k</td><td>E = (3/2)kT</td><td>[ML²T⁻²K⁻¹]</td></tr><tr><td>गैस नियतांक R</td><td>PV = nRT</td><td>[ML²T⁻²K⁻¹mol⁻¹]</td></tr><tr><td>ऊष्मा चालकता K</td><td>Q/t = KA∆T/l</td><td>[MLT⁻³K⁻¹]</td></tr><tr><td>स्टीफ़न नियतांक σ</td><td>P = σAT⁴</td><td>[MT⁻³K⁻⁴]</td></tr><tr><td>वीन नियतांक b</td><td>λₘT = b</td><td>[LK]</td></tr></table>')},
 {h:B('1.4.3 Electricity and magnetism (important for JEE Advanced)','1.4.3 विद्युत एवं चुंबकत्व (JEE Advanced के लिए ज़रूरी)'),
  body:B('<table><tr><th>Quantity</th><th>Relation</th><th>Dimensions</th></tr><tr><td>Charge q</td><td>q = It</td><td>[AT]</td></tr><tr><td>Potential V</td><td>W/q</td><td>[ML²T⁻³A⁻¹]</td></tr><tr><td>Electric field E</td><td>F/q</td><td>[MLT⁻³A⁻¹]</td></tr><tr><td>Resistance R</td><td>V/I</td><td>[ML²T⁻³A⁻²]</td></tr><tr><td>Capacitance C</td><td>q/V</td><td>[M⁻¹L⁻²T⁴A²]</td></tr><tr><td>Permittivity ε₀</td><td>F = q²/4πε₀r²</td><td>[M⁻¹L⁻³T⁴A²]</td></tr><tr><td>Magnetic field B</td><td>F = qvB</td><td>[MT⁻²A⁻¹]</td></tr><tr><td>Magnetic flux φ</td><td>BA</td><td>[ML²T⁻²A⁻¹]</td></tr><tr><td>Inductance L</td><td>U = ½LI²</td><td>[ML²T⁻²A⁻²]</td></tr><tr><td>Permeability µ₀</td><td>F/l = µ₀I₁I₂/2πd</td><td>[MLT⁻²A⁻²]</td></tr></table><p><b>JEE favourite combinations:</b></p><ul><li>RC, L/R, √(LC): all are time [T]</li><li>1/√(µ₀ε₀) and E/B: velocity</li><li>√(µ₀/ε₀) and √(L/C): resistance</li><li>½ε₀E², B²/2µ₀: energy density = pressure</li><li>e²/(4πε₀ℏc): dimensionless (fine structure constant ≈ 1/137)</li></ul><p>See Example 2.</p>',
  '<table><tr><th>राशि</th><th>संबंध</th><th>विमाएँ</th></tr><tr><td>आवेश q</td><td>q = It</td><td>[AT]</td></tr><tr><td>विभव V</td><td>W/q</td><td>[ML²T⁻³A⁻¹]</td></tr><tr><td>विद्युत क्षेत्र E</td><td>F/q</td><td>[MLT⁻³A⁻¹]</td></tr><tr><td>प्रतिरोध R</td><td>V/I</td><td>[ML²T⁻³A⁻²]</td></tr><tr><td>धारिता C</td><td>q/V</td><td>[M⁻¹L⁻²T⁴A²]</td></tr><tr><td>परावैद्युतांक ε₀</td><td>F = q²/4πε₀r²</td><td>[M⁻¹L⁻³T⁴A²]</td></tr><tr><td>चुंबकीय क्षेत्र B</td><td>F = qvB</td><td>[MT⁻²A⁻¹]</td></tr><tr><td>चुंबकीय फ्लक्स φ</td><td>BA</td><td>[ML²T⁻²A⁻¹]</td></tr><tr><td>प्रेरकत्व L</td><td>U = ½LI²</td><td>[ML²T⁻²A⁻²]</td></tr><tr><td>चुंबकशीलता µ₀</td><td>F/l = µ₀I₁I₂/2πd</td><td>[MLT⁻²A⁻²]</td></tr></table><p><b>JEE के पसंदीदा संयोजन:</b></p><ul><li>RC, L/R, √(LC): सब समय [T]</li><li>1/√(µ₀ε₀) और E/B: वेग</li><li>√(µ₀/ε₀) और √(L/C): प्रतिरोध</li><li>½ε₀E², B²/2µ₀: ऊर्जा घनत्व = दाब</li><li>e²/(4πε₀ℏc): विमाहीन (सूक्ष्म संरचना नियतांक ≈ 1/137)</li></ul><p>उदाहरण 2 देखो।</p>')}
);

c.examples.push(
 {lv:'fnd',q:B('The Moon’s diameter subtends 0.52° at the Earth. The distance is 3.84 × 10⁸ m. Find the diameter.','चाँद का व्यास पृथ्वी पर 0.52° का कोण बनाता है। दूरी 3.84 × 10⁸ m है। व्यास ज्ञात करो।'),
  a:B('θ = 0.52 × π/180 = 9.08 × 10⁻³ rad. D = θd ≈ <b>3.48 × 10⁶ m</b>.','θ = 0.52 × π/180 = 9.08 × 10⁻³ rad। D = θd ≈ <b>3.48 × 10⁶ m</b>।')},
 {lv:'adv',q:B('Show that e²/(4πε₀ℏc) is dimensionless without remembering the dimension of ε₀.','बिना ε₀ की विमा याद किए दिखाओ कि e²/(4πε₀ℏc) विमाहीन है।'),
  a:B('Coulomb energy U = e²/(4πε₀r), so [e²/4πε₀] = [Ur]. Photon energy E = hc/λ, so [hc] = [Eλ]. Both are energy × length, so the ratio is dimensionless. <b>Shortcut:</b> change the formula into a familiar energy.','कूलॉम ऊर्जा U = e²/(4πε₀r), अतः [e²/4πε₀] = [Ur]। फ़ोटॉन ऊर्जा E = hc/λ, अतः [hc] = [Eλ]। दोनों ऊर्जा × लंबाई हैं, इसलिए अनुपात विमाहीन है। <b>शॉर्टकट:</b> सूत्र को जानी-पहचानी ऊर्जा में बदल दो।')}
);
})();

// Physics Ch1 — part B: sections 1.5–1.8, examples 3–14
(function(){
var B=function(e,h){return {en:e,hi:h}};
var c=CH.filter(function(x){return x.id==='physics-units-dimensions'})[0];

c.sections.push(
 {h:B('1.5 Principle of homogeneity','1.5 समघातता (समांगता) का सिद्धांत'),
  body:B('<p><b>Rule:</b> only quantities of the same dimension can be added, subtracted or equated. So every term of a correct equation has the same dimensions.</p><p><b>Three results used in every problem:</b></p><ol><li>The argument of sin, cos, tan, log, eˣ is dimensionless, and so is the output. Reason: eˣ = 1 + x + x²/2! + …; if x had a dimension, we would be adding different dimensions.</li><li>A power (exponent) is always dimensionless.</li><li>[dy/dx] = [y]/[x] and [∫y dx] = [y][x].</li></ol><p>Practise Examples 3, 4, 5 and 6.</p>',
  '<p><b>नियम:</b> केवल समान विमा वाली राशियाँ ही जोड़ी, घटाई या बराबर लिखी जा सकती हैं। इसलिए सही समीकरण के हर पद की विमाएँ समान होती हैं।</p><p><b>तीन नतीजे जो हर प्रश्न में लगते हैं:</b></p><ol><li>sin, cos, tan, log, eˣ का तर्क विमाहीन होता है और उनका मान भी विमाहीन। कारण: eˣ = 1 + x + x²/2! + …; यदि x में विमा होती तो अलग-अलग विमाएँ जोड़नी पड़तीं।</li><li>घात (घातांक) हमेशा विमाहीन होती है।</li><li>[dy/dx] = [y]/[x] और [∫y dx] = [y][x]।</li></ol><p>उदाहरण 3, 4, 5 और 6 हल करो।</p>')},
 {h:B('1.6 Uses of dimensional analysis','1.6 विमीय विश्लेषण के उपयोग'),
  body:B('<p><b>1.6.1 Use 1: checking an equation.</b> sₙ = u + (a/2)(2n − 1) looks wrong, but “distance in the nth second” = velocity × 1 second; that 1 s is hidden: sₙ = u(1) + (a/2)(2n − 1)(1). So the equation is correct.</p><p><b>1.6.2 Use 2: unit conversion.</b> From Q = n₁u₁ = n₂u₂, if [Q] = [MᵃLᵇTᶜ]:</p><p class="fx">n₂ = n₁ (M₁/M₂)ᵃ (L₁/L₂)ᵇ (T₁/T₂)ᶜ</p><p>See Examples 7 and 8.</p>',
  '<p><b>1.6.1 उपयोग 1: समीकरण जाँचना।</b> sₙ = u + (a/2)(2n − 1) देखने में गलत लगता है, पर “nवें सेकंड में दूरी” = वेग × 1 सेकंड; वह 1 s छिपा हुआ है: sₙ = u(1) + (a/2)(2n − 1)(1)। इसलिए समीकरण सही है।</p><p><b>1.6.2 उपयोग 2: मात्रक परिवर्तन।</b> Q = n₁u₁ = n₂u₂ से, यदि [Q] = [MᵃLᵇTᶜ]:</p><p class="fx">n₂ = n₁ (M₁/M₂)ᵃ (L₁/L₂)ᵇ (T₁/T₂)ᶜ</p><p>उदाहरण 7 और 8 देखो।</p>')},
 {h:B('1.6.3 Use 3: deriving a formula','1.6.3 उपयोग 3: सूत्र व्युत्पन्न करना'),
  body:B('<p>Assume the quantity depends on a power-product of some variables: y = k x₁ᵃ x₂ᵇ x₃ᶜ. Compare the powers of M, L, T and find a, b, c. The constant k is <b>not</b> found by this method. See Example 9.</p>',
  '<p>मान लो राशि कुछ चरों के घात-गुणनफल पर निर्भर है: y = k x₁ᵃ x₂ᵇ x₃ᶜ। M, L, T की घातों की तुलना करके a, b, c निकालो। नियतांक k इस विधि से <b>नहीं</b> मिलता। उदाहरण 9 देखो।</p>'),
  d3:'drop',cap3:B('The drop stretches and flattens; surface tension tries to bring it back to a sphere. Change r and S.','बूँद लंबी और चपटी होती है; पृष्ठ तनाव उसे वापस गोला बनाने की कोशिश करता है। r और S बदलकर देखो।')},
 {h:B('1.6.4 Picture: frequency of a stretched string','1.6.4 तस्वीर: तने तार की आवृत्ति'),
  body:B('<p>The frequency of a stretched string depends on length l, tension F and mass per unit length µ. Dimensional analysis (Example 10) gives f = (k/l)√(F/µ).</p>',
  '<p>तने हुए तार की आवृत्ति लंबाई l, तनाव F और प्रति इकाई लंबाई द्रव्यमान µ पर निर्भर करती है। विमीय विश्लेषण (उदाहरण 10) से f = (k/l)√(F/µ) मिलता है।</p>'),
  d3:'string',cap3:B('Change length, tension and mass per length and watch how the frequency changes.','लंबाई, तनाव और प्रति इकाई लंबाई द्रव्यमान बदलकर देखो कि आवृत्ति कैसे बदलती है।')},
 {h:B('1.7 Advanced techniques (JEE Advanced)','1.7 उन्नत तकनीकें (JEE Advanced)'),
  body:B('<p><b>1.7.1 Choosing new base quantities.</b> Method (A): write Q = XᵃYᵇZᶜ and compare M, L, T. Method (B): first write M, L, T in terms of the new bases. See Examples 11 and 12.</p>',
  '<p><b>1.7.1 नई मूल राशियाँ चुनना।</b> विधि (A): Q = XᵃYᵇZᶜ लिखकर M, L, T की तुलना करो। विधि (B): पहले M, L, T को नई मूल राशियों में लिखो। उदाहरण 11 और 12 देखो।</p>')},
 {h:B('1.7.2 When there are more than 3 variables','1.7.2 जब चर 3 से अधिक हों'),
  body:B('<p>MLT gives only 3 equations. Then use extra physical information: combine two variables into one, or use a given proportionality. See Example 13.</p><p><b>Dimensionless groups:</b> combinations like Re = ρvD/η are dimensionless. Dimensional analysis cannot fix any function of them: y = kx and y = x f(Re) can both be dimensionally correct.</p><p><b>Trick to eliminate options:</b> check dimensions first, then limiting cases. In an Atwood machine a = (m₁ − m₂)g/(m₁ + m₂): it is 0 at m₁ = m₂ and g at m₂ = 0. Both are correct.</p>',
  '<p>MLT से केवल 3 समीकरण मिलते हैं। तब अतिरिक्त भौतिक जानकारी लगाओ: दो चरों को एक में जोड़ दो, या दी हुई समानुपातिकता प्रयोग करो। उदाहरण 13 देखो।</p><p><b>विमाहीन समूह:</b> Re = ρvD/η जैसे संयोजन विमाहीन होते हैं। इनके किसी भी फलन को विमीय विश्लेषण तय नहीं कर सकता: y = kx और y = x f(Re) दोनों विमीय रूप से सही हो सकते हैं।</p><p><b>विकल्प हटाने की ट्रिक:</b> पहले विमाएँ जाँचो, फिर सीमांत स्थितियाँ। एटवुड मशीन में a = (m₁ − m₂)g/(m₁ + m₂): m₁ = m₂ पर 0 और m₂ = 0 पर g। दोनों सही हैं।</p>'),
  d3:'terminal',cap3:B('A ball falls through a liquid; three forces act and the speed becomes constant.','गेंद द्रव में गिरती है; तीन बल लगते हैं और वेग स्थिर हो जाता है।')},
 {h:B('1.7.3 Limitations','1.7.3 सीमाएँ'),
  body:B('<ul><li>It cannot give dimensionless constants.</li><li>Relations with sums such as s = ut + ½at², or trigonometric / exponential relations, cannot be derived.</li><li>It cannot distinguish quantities of the same dimension (torque vs work).</li><li>A dimensionally correct equation can still be physically wrong; but a dimensionally wrong equation is certainly wrong.</li></ul>',
  '<ul><li>विमाहीन नियतांक नहीं मिलते।</li><li>s = ut + ½at² जैसे योग वाले, या त्रिकोणमितीय / चरघातांकी संबंध व्युत्पन्न नहीं होते।</li><li>समान विमा वाली राशियों (बल आघूर्ण बनाम कार्य) में अंतर नहीं पता चलता।</li><li>विमीय रूप से सही समीकरण भौतिक रूप से गलत हो सकता है; पर विमीय रूप से गलत समीकरण निश्चित रूप से गलत है।</li></ul>')},
 {h:B('1.8 Significant figures','1.8 सार्थक अंक'),
  body:B('<p>All the certain digits of a measurement plus the first uncertain digit are its significant figures. They tell the precision. Changing the unit does not change their number.</p><table><tr><th>Rule</th><th>Example</th></tr><tr><td>Non-zero digits are significant</td><td>3.47 → 3</td></tr><tr><td>Zeros between digits are significant</td><td>4.009 → 4</td></tr><tr><td>Leading zeros are not significant</td><td>0.00520 → 3</td></tr><tr><td>Trailing zeros after the decimal are significant</td><td>6.500 → 4</td></tr><tr><td>Trailing zeros without a decimal (no measurement info) are not significant</td><td>12300 → 3</td></tr><tr><td>In scientific notation count only the mantissa</td><td>1.2300 × 10⁴ → 5</td></tr><tr><td>Exact numbers (2 in 2πr)</td><td>infinite</td></tr></table><p><b>1.8.1 Rounding off.</b> If the dropped part is more than 5, add 1 to the last digit; if less, leave it. If it is exactly 5 (or 5 followed by zeros), make the last digit even: 2.745 → 2.74, 2.735 → 2.74. Keep one extra digit in the middle steps and round only at the end.</p><p><b>1.8.2 Operations.</b></p><ul><li>× and ÷: result has as many significant figures as the quantity with the fewest.</li><li>+ and −: result has as many decimal places as the quantity with the fewest.</li></ul><p>See Example 14.</p>',
  '<p>मापन के सभी निश्चित अंक और पहला अनिश्चित अंक सार्थक अंक होते हैं। ये परिशुद्धता बताते हैं। मात्रक बदलने से इनकी संख्या नहीं बदलती।</p><table><tr><th>नियम</th><th>उदाहरण</th></tr><tr><td>शून्येतर अंक सार्थक हैं</td><td>3.47 → 3</td></tr><tr><td>बीच के शून्य सार्थक हैं</td><td>4.009 → 4</td></tr><tr><td>शुरू के शून्य सार्थक नहीं</td><td>0.00520 → 3</td></tr><tr><td>दशमलव के बाद अंत के शून्य सार्थक हैं</td><td>6.500 → 4</td></tr><tr><td>बिना दशमलव के अंत के शून्य (मापन की जानकारी न हो) सार्थक नहीं</td><td>12300 → 3</td></tr><tr><td>वैज्ञानिक संकेतन में केवल मैंटिसा गिनो</td><td>1.2300 × 10⁴ → 5</td></tr><tr><td>यथार्थ संख्याएँ (2πr में 2)</td><td>अनंत</td></tr></table><p><b>1.8.1 पूर्णांकन।</b> हटने वाला हिस्सा 5 से बड़ा हो तो पिछले अंक में 1 जोड़ो; छोटा हो तो वैसा ही रखो। ठीक 5 (या 5 के बाद केवल शून्य) हो तो पिछले अंक को सम बनाओ: 2.745 → 2.74, 2.735 → 2.74। बीच के चरणों में एक अतिरिक्त अंक रखो, पूर्णांकन केवल अंत में करो।</p><p><b>1.8.2 संक्रियाएँ।</b></p><ul><li>× और ÷: परिणाम में उतने सार्थक अंक जितने सबसे कम वाली राशि में हों।</li><li>+ और −: परिणाम में उतने दशमलव स्थान जितने सबसे कम वाली राशि में हों।</li></ul><p>उदाहरण 14 देखो।</p>')}
);

c.examples.push(
 {lv:'main',q:B('v = (α/β)(1 − e^(−βt)), v is velocity. Find [α] and [β].','v = (α/β)(1 − e^(−βt)), v वेग है। [α] और [β] ज्ञात करो।'),
  a:B('βt is dimensionless ⇒ <b>[β] = [T⁻¹]</b>. The bracket is dimensionless, so [α/β] = [LT⁻¹], hence <b>[α] = [LT⁻²]</b>.','βt विमाहीन है ⇒ <b>[β] = [T⁻¹]</b>। कोष्ठक विमाहीन है, अतः [α/β] = [LT⁻¹], इसलिए <b>[α] = [LT⁻²]</b>।')},
 {lv:'main',q:B('P = (α/β) e^(−αz/kθ). P is pressure, z distance, k Boltzmann constant, θ temperature. Find [β].','P = (α/β) e^(−αz/kθ)। P दाब, z दूरी, k बोल्ट्ज़मान नियतांक, θ ताप है। [β] ज्ञात करो।'),
  a:B('αz/kθ is dimensionless. kθ is energy, so [α] = [ML²T⁻²]/[L] = [MLT⁻²]. Then [β] = [α]/[P] = <b>[L²]</b>.','αz/kθ विमाहीन है। kθ ऊर्जा है, अतः [α] = [ML²T⁻²]/[L] = [MLT⁻²]। फिर [β] = [α]/[P] = <b>[L²]</b>।')},
 {lv:'main',q:B('Van der Waals: (P + a/V²)(V − b) = RT (1 mole). Find [a], [b] and [ab/V²].','वान डर वाल्स: (P + a/V²)(V − b) = RT (1 मोल)। [a], [b] और [ab/V²] ज्ञात करो।'),
  a:B('[a] = [PV²] = <b>[ML⁵T⁻²]</b>, [b] = <b>[L³]</b>. [ab/V²] = [ML²T⁻²], which is energy (for 1 mole).','[a] = [PV²] = <b>[ML⁵T⁻²]</b>, [b] = <b>[L³]</b>। [ab/V²] = [ML²T⁻²], यानी ऊर्जा (1 मोल के लिए)।')},
 {lv:'adv',q:B('∫ dx/√(2ax − x²) = aⁿ sin⁻¹(x/a − 1). Find n.','∫ dx/√(2ax − x²) = aⁿ sin⁻¹(x/a − 1)। n ज्ञात करो।'),
  a:B('x/a is dimensionless, so [a] = [x] = [L]. LHS: [L]/[L] = [L⁰]. RHS: [Lⁿ]. Hence <b>n = 0</b>. No need to solve the integral.','x/a विमाहीन है, अतः [a] = [x] = [L]। बायाँ पक्ष: [L]/[L] = [L⁰]। दायाँ पक्ष: [Lⁿ]। इसलिए <b>n = 0</b>। समाकल हल करने की ज़रूरत ही नहीं।')},
 {lv:'fnd',q:B('Convert G = 6.67 × 10⁻¹¹ (SI) into CGS.','G = 6.67 × 10⁻¹¹ (SI) को CGS में बदलो।'),
  a:B('a = −1, b = 3, c = −2. n₂ = 6.67 × 10⁻¹¹ (10³)⁻¹ (10²)³ = <b>6.67 × 10⁻⁸ dyne cm² g⁻²</b>.','a = −1, b = 3, c = −2। n₂ = 6.67 × 10⁻¹¹ (10³)⁻¹ (10²)³ = <b>6.67 × 10⁻⁸ dyne cm² g⁻²</b>।')},
 {lv:'main',q:B('In a new system, the unit of mass is α kg, length β m, time γ s. Find the value of 4.2 J (1 calorie).','एक नई पद्धति में द्रव्यमान का मात्रक α kg, लंबाई का β m, समय का γ s है। 4.2 J (1 कैलोरी) का मान ज्ञात करो।'),
  a:B('[J] = [ML²T⁻²]. n₂ = 4.2 (1/α)¹ (1/β)² (1/γ)⁻² = <b>4.2 α⁻¹β⁻²γ²</b>.','[J] = [ML²T⁻²]। n₂ = 4.2 (1/α)¹ (1/β)² (1/γ)⁻² = <b>4.2 α⁻¹β⁻²γ²</b>।')},
 {lv:'main',q:B('Find the time period of oscillation of a liquid drop (radius r, density ρ, surface tension S).','द्रव बूँद (त्रिज्या r, घनत्व ρ, पृष्ठ तनाव S) के दोलन का आवर्तकाल ज्ञात करो।'),
  a:B('T = k rᵃρᵇSᶜ ⇒ [T] = [L]ᵃ[ML⁻³]ᵇ[MT⁻²]ᶜ. M: b + c = 0; L: a − 3b = 0; T: −2c = 1. So c = −½, b = ½, a = 3/2. <b>T = k √(ρr³/S)</b>.','T = k rᵃρᵇSᶜ ⇒ [T] = [L]ᵃ[ML⁻³]ᵇ[MT⁻²]ᶜ। M: b + c = 0; L: a − 3b = 0; T: −2c = 1। अतः c = −½, b = ½, a = 3/2। <b>T = k √(ρr³/S)</b>।')},
 {lv:'main',q:B('The frequency f of a stretched string depends on length l, tension F and mass per unit length µ. Find f.','तने तार की आवृत्ति f लंबाई l, तनाव F और प्रति इकाई लंबाई द्रव्यमान µ पर निर्भर करती है। f ज्ञात करो।'),
  a:B('f = k lᵃFᵇµᶜ. M: b + c = 0; T: −2b = −1; L: a + b − c = 0. So b = ½, c = −½, a = −1: <b>f = (k/l)√(F/µ)</b>.','f = k lᵃFᵇµᶜ। M: b + c = 0; T: −2b = −1; L: a + b − c = 0। अतः b = ½, c = −½, a = −1: <b>f = (k/l)√(F/µ)</b>।')},
 {lv:'adv',q:B('If force F, velocity V and time T are the base quantities, find the dimension of Young’s modulus Y.','यदि बल F, वेग V और समय T मूल राशियाँ हों, तो यंग प्रत्यास्थता गुणांक Y की विमा ज्ञात करो।'),
  a:B('[L] = VT, and F = MV/T ⇒ M = FTV⁻¹. [Y] = force/area = F/(VT)² = <b>FV⁻²T⁻²</b>.','[L] = VT, और F = MV/T ⇒ M = FTV⁻¹। [Y] = बल/क्षेत्रफल = F/(VT)² = <b>FV⁻²T⁻²</b>।')},
 {lv:'adv',q:B('Build length, mass and time from G, c and h (Planck units).','G, c और h से लंबाई, द्रव्यमान और समय बनाओ (प्लांक मात्रक)।'),
  a:B('l = Gˣcʸhᶻ: [M⁻ˣ⁺ᶻ L³ˣ⁺ʸ⁺²ᶻ T⁻²ˣ⁻ʸ⁻ᶻ] = [L]. So z = x; −3x − y = 0 ⇒ y = −3x; 3x − 3x + 2x = 1 ⇒ x = ½. <b>l<sub>P</sub> = √(Gh/c³), t<sub>P</sub> = l<sub>P</sub>/c = √(Gh/c⁵), m<sub>P</sub> = √(hc/G)</b> (m<sub>P</sub> is found the same way by solving for [M]).','l = Gˣcʸhᶻ: [M⁻ˣ⁺ᶻ L³ˣ⁺ʸ⁺²ᶻ T⁻²ˣ⁻ʸ⁻ᶻ] = [L]। अतः z = x; −3x − y = 0 ⇒ y = −3x; 3x − 3x + 2x = 1 ⇒ x = ½। <b>l<sub>P</sub> = √(Gh/c³), t<sub>P</sub> = l<sub>P</sub>/c = √(Gh/c⁵), m<sub>P</sub> = √(hc/G)</b> (m<sub>P</sub> भी इसी तरह [M] के लिए हल करने पर मिलता है)।')},
 {lv:'adv',q:B('The terminal speed of a ball falling in a viscous liquid depends on r, η, the densities ρ, σ and g. Find the formula.','श्यान द्रव में गिरती गेंद का सीमांत वेग r, η, घनत्वों ρ, σ और g पर निर्भर करता है। सूत्र ज्ञात करो।'),
  a:B('Physics: only the net driving force per volume w = (ρ − σ)g matters. v = k rᵃηᵇwᶜ, [w] = [ML⁻²T⁻²]. M: b + c = 0; T: −b − 2c = −1; L: a − b − 2c = 1. So c = 1, b = −1, a = 2: <b>v = k r²(ρ − σ)g/η</b> (Stokes’ law gives k = 2/9).','भौतिकी: केवल प्रति आयतन नेट प्रेरक बल w = (ρ − σ)g मायने रखता है। v = k rᵃηᵇwᶜ, [w] = [ML⁻²T⁻²]। M: b + c = 0; T: −b − 2c = −1; L: a − b − 2c = 1। अतः c = 1, b = −1, a = 2: <b>v = k r²(ρ − σ)g/η</b> (स्टोक्स के नियम से k = 2/9)।')},
 {lv:'fnd',q:B('A cube has side 7.203 m. Find its surface area and volume.','एक घन की भुजा 7.203 m है। उसका पृष्ठीय क्षेत्रफल और आयतन ज्ञात करो।'),
  a:B('The side has 4 significant figures. Area = 6a² = 311.299… → <b>311.3 m²</b>. Volume = a³ = 373.714… → <b>373.7 m³</b>.','भुजा में 4 सार्थक अंक हैं। क्षेत्रफल = 6a² = 311.299… → <b>311.3 m²</b>। आयतन = a³ = 373.714… → <b>373.7 m³</b>।')}
);
})();

// Physics Ch1 — part C: sections 1.9–1.14, examples 15–23, formulas, revision notes
(function(){
var B=function(e,h){return {en:e,hi:h}};
var c=CH.filter(function(x){return x.id==='physics-units-dimensions'})[0];

c.sections.push(
 {h:B('1.9 Errors in measurement','1.9 मापन में त्रुटियाँ'),
  body:B('<p>The difference between the true value and the measured value is the <b>error</b>.</p><p><b>Accuracy:</b> how close the measurement is to the true value. <b>Precision:</b> how close the readings are to each other, or how fine the instrument is.</p>',
  '<p>वास्तविक मान और मापे गए मान का अंतर <b>त्रुटि</b> है।</p><p><b>यथार्थता:</b> मापन वास्तविक मान के कितने पास है। <b>परिशुद्धता:</b> पाठ्यांक आपस में कितने पास हैं, या उपकरण कितना बारीक है।</p>'),
  d3:'target',cap3:B('Darts hit the target one by one in three cases: accurate + precise, precise only, accurate only.','निशाने पर तीर एक-एक करके लगते हैं, तीन स्थितियों में: यथार्थ + परिशुद्ध, केवल परिशुद्ध, केवल यथार्थ।')},
 {h:B('1.9.1 Types of errors','1.9.1 त्रुटियों के प्रकार'),
  body:B('<ul><li><b>Systematic:</b> always in one direction. Causes: instrument (zero error), method, observer (parallax). Cure: calibration and correction.</li><li><b>Random:</b> on both sides, unpredictable. Cure: average many readings.</li><li><b>Least count error:</b> the limit of the smallest division the instrument can read.</li><li><b>Gross:</b> carelessness (misreading). Removed by care.</li></ul>',
  '<ul><li><b>क्रमबद्ध (व्यवस्थित):</b> हमेशा एक ही दिशा में। कारण: उपकरण (शून्य त्रुटि), विधि, प्रेक्षक (लंबन)। उपाय: अंशांकन और सुधार।</li><li><b>यादृच्छिक:</b> दोनों तरफ़, अनिश्चित। उपाय: कई पाठ्यांकों का औसत।</li><li><b>अल्पतमांक त्रुटि:</b> उपकरण की सबसे छोटी नाप की सीमा।</li><li><b>स्थूल:</b> लापरवाही (गलत पढ़ना)। सावधानी से दूर होती है।</li></ul>')},
 {h:B('1.9.2 Absolute, relative and percentage error','1.9.2 निरपेक्ष, सापेक्ष एवं प्रतिशत त्रुटि'),
  body:B('<p class="fx">ā = (1/n) Σaᵢ &nbsp; Δaᵢ = aᵢ − ā &nbsp; Δa<sub>mean</sub> = (1/n) Σ|Δaᵢ|</p><p class="fx">Relative = Δa<sub>mean</sub>/ā &nbsp; % = (Δa<sub>mean</sub>/ā) × 100 &nbsp; a = ā ± Δa<sub>mean</sub></p><p>See Example 15.</p>',
  '<p class="fx">ā = (1/n) Σaᵢ &nbsp; Δaᵢ = aᵢ − ā &nbsp; Δa<sub>औसत</sub> = (1/n) Σ|Δaᵢ|</p><p class="fx">सापेक्ष = Δa<sub>औसत</sub>/ā &nbsp; % = (Δa<sub>औसत</sub>/ā) × 100 &nbsp; a = ā ± Δa<sub>औसत</sub></p><p>उदाहरण 15 देखो।</p>')},
 {h:B('1.9.3 Combination of errors (maximum possible error)','1.9.3 त्रुटियों का संयोजन (अधिकतम संभावित त्रुटि)'),
  body:B('<p><b>Sum / difference</b> Z = A ± B: in the worst case</p><p class="fx">ΔZ = ΔA + ΔB</p><p><b>Power product</b> Z = k AᵖBᵠ/Cʳ: take the log and differentiate:</p><p class="fx">ln Z = ln k + p ln A + q ln B − r ln C<br>ΔZ/Z = |p| ΔA/A + |q| ΔB/B + |r| ΔC/C</p><p>For the worst case we add all the terms, even if a power is negative.</p><p><b>Be careful:</b> (1) This formula is for small errors (ΔA ≪ A). For a large change find the values directly. (2) In a difference the relative error can grow a lot: (10.0 ± 0.1) − (9.0 ± 0.1) = 1.0 ± 0.2, that is 20%. (3) Measure most carefully the quantity with the biggest power.</p><p>See Examples 16, 17 and 18.</p>',
  '<p><b>योग / अंतर</b> Z = A ± B: सबसे खराब स्थिति में</p><p class="fx">ΔZ = ΔA + ΔB</p><p><b>घात गुणनफल</b> Z = k AᵖBᵠ/Cʳ: लघुगणक लेकर अवकलन करो:</p><p class="fx">ln Z = ln k + p ln A + q ln B − r ln C<br>ΔZ/Z = |p| ΔA/A + |q| ΔB/B + |r| ΔC/C</p><p>सबसे खराब स्थिति के लिए सभी पद जोड़ते हैं, चाहे घात ऋणात्मक हो।</p><p><b>ध्यान दो:</b> (1) यह सूत्र छोटी त्रुटियों (ΔA ≪ A) के लिए है। बड़ा परिवर्तन हो तो सीधे मान निकालो। (2) अंतर में सापेक्ष त्रुटि बहुत बढ़ सकती है: (10.0 ± 0.1) − (9.0 ± 0.1) = 1.0 ± 0.2, यानी 20%। (3) सबसे बड़ी घात वाली राशि को सबसे सावधानी से नापो।</p><p>उदाहरण 16, 17 और 18 देखो।</p>')},
 {h:B('1.9.4 Picture: measuring g with a pendulum','1.9.4 तस्वीर: लोलक से g नापना'),
  body:B('<p>One oscillation means going and coming back. A stopwatch counts the oscillations and the length is measured with a scale. Change the length with the slider and see how the time period changes.</p>',
  '<p>एक दोलन का मतलब है जाकर वापस आना। स्टॉपवॉच दोलन गिनती है और लंबाई स्केल से नापी जाती है। स्लाइडर से लंबाई बदलकर देखो कि आवर्तकाल कैसे बदलता है।</p>'),
  d3:'pendulum',cap3:B('The pendulum swings, the stopwatch counts oscillations and the length is measured.','लोलक झूलता है, स्टॉपवॉच दोलन गिनती है और लंबाई नापी जाती है।')},
 {h:B('1.10 Vernier calipers','1.10 वर्नियर कैलिपर्स'),
  body:B('<p>A sliding vernier scale is added to measure lengths smaller than one division of the main scale. It measures outer diameter, inner diameter and depth.</p><p>If n vernier divisions = (n − 1) main scale divisions:</p><p class="fx">1 VSD = ((n − 1)/n) MSD &nbsp; LC = 1 MSD − 1 VSD = 1 MSD / n</p><p>Standard: MSD = 1 mm, n = 10, LC = 0.1 mm = 0.01 cm.</p><p class="fx">Reading = MSR + (VSR × LC) − zero error</p><p>MSR = main scale reading just before the vernier zero; VSR = the vernier division that coincides with a main scale division. Example: MSR = 3.2 cm, VSR = 7: reading = 3.2 + 7(0.01) = 3.27 cm.</p>',
  '<p>मुख्य पैमाने के एक भाग से भी छोटी लंबाई नापने के लिए सरकने वाला वर्नियर पैमाना लगाया जाता है। इससे बाहरी व्यास, आंतरिक व्यास और गहराई नापते हैं।</p><p>यदि n वर्नियर भाग = (n − 1) मुख्य पैमाने के भाग:</p><p class="fx">1 VSD = ((n − 1)/n) MSD &nbsp; LC = 1 MSD − 1 VSD = 1 MSD / n</p><p>मानक: MSD = 1 mm, n = 10, LC = 0.1 mm = 0.01 cm।</p><p class="fx">पाठ्यांक = MSR + (VSR × LC) − शून्य त्रुटि</p><p>MSR = वर्नियर शून्य से ठीक पहले वाला मुख्य पैमाने का पाठ्यांक; VSR = वह वर्नियर भाग जो किसी मुख्य भाग के सीध में हो। उदाहरण: MSR = 3.2 cm, VSR = 7: पाठ्यांक = 3.2 + 7(0.01) = 3.27 cm।</p>'),
  d3:'vernier',cap3:B('Move the slider: the jaws open, the vernier slides and the coinciding division lights up.','स्लाइडर चलाओ: जबड़े खुलते हैं, वर्नियर सरकता है और सीध में आने वाला भाग चमकता है।')},
 {h:B('1.10.1 Zero error','1.10.1 शून्य त्रुटि'),
  body:B('<p>When the jaws are closed, the vernier zero may not be at the main zero:</p><ul><li>Vernier zero to the right, m-th division coincides: error = +m × LC.</li><li>Vernier zero to the left, m-th coincides: error = −(n − m) × LC.</li></ul><p>In both cases: correct reading = observed − (zero error, with sign). See Examples 19 and 20.</p>',
  '<p>जबड़े बंद करने पर वर्नियर शून्य, मुख्य शून्य पर न हो सकता है:</p><ul><li>वर्नियर शून्य दाईं ओर, m-वाँ भाग सीध में: त्रुटि = +m × LC।</li><li>वर्नियर शून्य बाईं ओर, m-वाँ सीध में: त्रुटि = −(n − m) × LC।</li></ul><p>दोनों में: सही पाठ्यांक = प्रेक्षित − (शून्य त्रुटि, चिह्न सहित)। उदाहरण 19 और 20 देखो।</p>'),
  d3:'vzero',cap3:B('With the jaws closed: the vernier zero sits on one side and the correction is applied.','जबड़े बंद होने पर: वर्नियर शून्य किस तरफ़ रहता है और सुधार कैसे लगता है।')},
 {h:B('1.11 Screw gauge (micrometer)','1.11 स्क्रू गेज (माइक्रोमीटर)'),
  body:B('<p>The distance a screw advances in one full turn is its <b>pitch</b>.</p><p class="fx">Pitch = linear distance / number of rotations &nbsp; LC = pitch / circular scale divisions</p><p class="fx">Reading = MSR + CSR × LC − zero error</p>',
  '<p>स्क्रू के एक पूरे चक्कर में वह जितना आगे बढ़ता है, वह <b>पिच</b> है।</p><p class="fx">पिच = रैखिक दूरी / चक्करों की संख्या &nbsp; LC = पिच / वृत्ताकार पैमाने के भाग</p><p class="fx">पाठ्यांक = MSR + CSR × LC − शून्य त्रुटि</p>'),
  d3:'screw',cap3:B('The thimble turns, the spindle advances and grips the wire; the pitch and the circular scale reading.','थिंबल घूमता है, स्पिंडल आगे बढ़ता है और तार को पकड़ता है; पिच और वृत्ताकार पैमाने का पाठ्यांक।')},
 {h:B('1.11.1 Zero error and backlash','1.11.1 शून्य त्रुटि एवं बैकलैश'),
  body:B('<ul><li><b>Positive zero error:</b> with the stud closed, the circular zero is below the reference line (division m at the reference line): error = +m × LC.</li><li><b>Negative zero error:</b> zero is above; division m at the reference with total N: error = −(N − m) × LC.</li><li><b>Backlash error:</b> from a loose screw. Always rotate in one direction. Use the ratchet for uniform pressure.</li></ul><p>See Examples 21, 22 and 23.</p>',
  '<ul><li><b>धनात्मक शून्य त्रुटि:</b> स्टड बंद होने पर वृत्ताकार शून्य संदर्भ रेखा के नीचे (संदर्भ रेखा पर भाग m): त्रुटि = +m × LC।</li><li><b>ऋणात्मक शून्य त्रुटि:</b> शून्य ऊपर; संदर्भ पर भाग m, कुल N: त्रुटि = −(N − m) × LC।</li><li><b>बैकलैश त्रुटि:</b> स्क्रू के ढीलेपन से। हमेशा एक ही दिशा में घुमाओ। रैचेट से दाब एक जैसा रहता है।</li></ul><p>उदाहरण 21, 22 और 23 देखो।</p>'),
  d3:'szero',cap3:B('With the stud closed, the circular zero stops below or above the reference line.','स्टड बंद होने पर वृत्ताकार शून्य संदर्भ रेखा से नीचे या ऊपर रुकता है।')},
{h:B("Supplement A — SI base units and derived units: complete reference","पूरक A — SI मूल और व्युत्पन्न मात्रक: संपूर्ण संदर्भ"),body:B("<p>The seven SI base quantities are length (metre, m, [L]), mass (kilogram, kg, [M]), time (second, s, [T]), electric current (ampere, A, [I]), thermodynamic temperature (kelvin, K, [Θ]), amount of substance (mole, mol, [N]) and luminous intensity (candela, cd, [J]). Important derived units: force N = kg m s⁻²; pressure Pa = kg m⁻¹ s⁻²; energy J = kg m² s⁻²; power W = kg m² s⁻³; charge C = A s; potential V = kg m² s⁻³ A⁻¹; resistance Ω = kg m² s⁻³ A⁻²; frequency Hz = s⁻¹. Derive units from definitions. Write a space between value and symbol (5 kg), never pluralise symbols, and preserve case (m is metre; M is not). Prefix symbols attach directly (km, μs, mA).</p>","<p>सात SI मूल राशियाँ हैं: लंबाई (मीटर, m, [L]), द्रव्यमान (किलोग्राम, kg, [M]), समय (सेकंड, s, [T]), विद्युत धारा (ऐम्पियर, A, [I]), ताप (केल्विन, K, [Θ]), पदार्थ की मात्रा (मोल, mol, [N]) और ज्योति तीव्रता (कैंडेला, cd, [J])। महत्वपूर्ण व्युत्पन्न मात्रक: बल N = kg m s⁻²; दाब Pa = kg m⁻¹ s⁻²; ऊर्जा J = kg m² s⁻²; शक्ति W = kg m² s⁻³; आवेश C = A s; विभव V = kg m² s⁻³ A⁻¹; प्रतिरोध Ω = kg m² s⁻³ A⁻²; आवृत्ति Hz = s⁻¹। मात्रक परिभाषाओं से निकालो। संख्या और प्रतीक के बीच स्थान रखो (5 kg), प्रतीक का बहुवचन मत बनाओ और बड़े-छोटे अक्षर सही रखो। उपसर्ग सीधे जुड़ता है (km, μs, mA)।</p>")},
{h:B("Supplement B — dimensional equations, unit conversion and limitations","पूरक B — विमीय समीकरण, मात्रक परिवर्तन और सीमाएँ"),body:B("<p>To test an equation, write dimensions of every term. Terms added or subtracted must have identical dimensions and both sides must match. Example: s = ut + ½at²; [ut] = [LT⁻¹][T] = [L] and [at²] = [LT⁻²][T²] = [L]. For a quantity [MᵃLᵇTᶜ], when base-unit sizes change from (M₁,L₁,T₁) to (M₂,L₂,T₂), n₂ = n₁(M₁/M₂)ᵃ(L₁/L₂)ᵇ(T₁/T₂)ᶜ. Dimensional analysis cannot determine pure constants such as 2 or π, distinguish sin θ from θ, or derive a relation when a relevant variable is missing. Dimensional correctness is necessary, not sufficient.</p>","<p>समीकरण जाँचने के लिए हर पद की विमा लिखो। जोड़े या घटाए गए पदों की विमाएँ समान और दोनों पक्षों की विमाएँ बराबर होनी चाहिए। उदाहरण: s = ut + ½at²; [ut] = [LT⁻¹][T] = [L] और [at²] = [LT⁻²][T²] = [L]। [MᵃLᵇTᶜ] विमा वाली राशि के मूल मात्रक बदलने पर n₂ = n₁(M₁/M₂)ᵃ(L₁/L₂)ᵇ(T₁/T₂)ᶜ। विमीय विश्लेषण 2 या π जैसे नियतांक नहीं बता सकता, sin θ और θ में अंतर नहीं कर सकता और छूटा हुआ चर नहीं खोज सकता। विमीय शुद्धता आवश्यक है, पर्याप्त नहीं।</p>")},
{h:B("Supplement C — significant figures: complete calculation rules","पूरक C — सार्थक अंक: गणना के संपूर्ण नियम"),body:B("<p>Non-zero digits and zeros between non-zero digits are significant. Leading zeros are not; trailing zeros after a decimal point are. Thus 0.00450 has 3 significant figures, 1002 has 4 and 2.500 has 4. Addition/subtraction: retain the least number of decimal places. Example: 12.11 + 18.0 + 1.013 = 31.123, report 31.1. Multiplication/division: retain the least number of significant figures. Example: 2.5 × 3.42 = 8.55, report 8.6. Exact counted numbers and defined conversions do not limit significant figures. Keep guard digits in intermediate steps and round only the final result.</p>","<p>अशून्य अंक और दो अशून्य अंकों के बीच के शून्य सार्थक हैं। शुरुआती शून्य सार्थक नहीं; दशमलव के बाद के अंतिम शून्य सार्थक हैं। इसलिए 0.00450 में 3, 1002 में 4 और 2.500 में 4 सार्थक अंक हैं। जोड़/घटाव में दशमलव स्थानों की सबसे कम संख्या तक उत्तर रखो: 12.11 + 18.0 + 1.013 = 31.123, उत्तर 31.1। गुणा/भाग में सार्थक अंकों की सबसे कम संख्या तक उत्तर रखो: 2.5 × 3.42 = 8.55, उत्तर 8.6। गिनी हुई सटीक संख्याएँ और परिभाषित रूपांतरण सार्थक अंकों को सीमित नहीं करते। बीच की गणना में अतिरिक्त अंक रखो और केवल अंतिम उत्तर पूर्णांकित करो।</p>")},
{h:B("Supplement D — accuracy, precision, resolution and uncertainty","पूरक D — यथार्थता, परिशुद्धता, विभेदन और अनिश्चितता"),body:B("<p>Accuracy is closeness to an accepted reference value; precision is agreement among repeated readings. A biased instrument may give precise but inaccurate readings. Resolution is the smallest change an instrument can display; least count is the smallest scale reading. Error is the difference between measured and reference values. Uncertainty is an estimated range associated with a measurement, often written x ± Δx; it is not automatically the actual error. Repeated readings reduce random scatter but cannot remove a systematic zero offset or faulty calibration.</p>","<p>यथार्थता स्वीकृत संदर्भ मान के निकटता है; परिशुद्धता बार-बार के पाठ्यांकों का आपसी मेल है। पक्षपाती उपकरण परिशुद्ध लेकिन अयथार्थ पाठ्यांक दे सकता है। विभेदन उपकरण द्वारा दिखाया जा सकने वाला सबसे छोटा परिवर्तन है; अल्पतमांक पैमाने का सबसे छोटा पाठ्यांक है। त्रुटि मापे और संदर्भ मान का अंतर है। अनिश्चितता मापन से जुड़ी अनुमानित सीमा है, जिसे x ± Δx लिखते हैं; यह अपने-आप वास्तविक त्रुटि नहीं है। दोहराए गए पाठ्यांक यादृच्छिक फैलाव घटाते हैं, व्यवस्थित शून्य विस्थापन या खराब अंशांकन नहीं।</p>")},
{h:B("Supplement E — repeated readings and propagation of errors","पूरक E — बार-बार मापन और त्रुटियों का प्रसार"),body:B("<p>For readings x₁,…,xₙ, mean x̄ = Σxᵢ/n and mean absolute error Δx̄ = Σ|xᵢ−x̄|/n. For maximum-error questions: Z = A ± B gives ΔZ = ΔA + ΔB; Z = AB or A/B gives ΔZ/Z = ΔA/A + ΔB/B; Z = AᵖBᑫ/Cʳ gives ΔZ/Z = |p|ΔA/A + |q|ΔB/B + |r|ΔC/C. Percentage error = (ΔZ/Z) × 100. If the same measured variable appears in numerator and denominator, errors may be correlated; do not blindly treat them as independent.</p>","<p>x₁,…,xₙ पाठ्यांकों के लिए माध्य x̄ = Σxᵢ/n और माध्य निरपेक्ष त्रुटि Δx̄ = Σ|xᵢ−x̄|/n है। अधिकतम त्रुटि वाले प्रश्नों में: Z = A ± B पर ΔZ = ΔA + ΔB; Z = AB या A/B पर ΔZ/Z = ΔA/A + ΔB/B; Z = AᵖBᑫ/Cʳ पर ΔZ/Z = |p|ΔA/A + |q|ΔB/B + |r|ΔC/C। प्रतिशत त्रुटि = (ΔZ/Z) × 100। वही मापी गई राशि अंश और हर में हो तो त्रुटियाँ सहसंबद्ध हो सकती हैं; उन्हें बिना जाँचे स्वतंत्र मत मानो।</p>")},
{h:B("Supplement F — Vernier calipers: complete reading and practical use","पूरक F — वर्नियर कैलिपर्स: पूरा पाठ्यांक और उपयोग"),body:B("<p>For the common direct vernier, 10 VSD = 9 MSD. If 1 MSD = 0.1 cm, then 1 VSD = 0.09 cm and LC = 0.01 cm. Reading = MSR + (coinciding division × LC). Example: MSR 3.2 cm and 7th division coincident gives 3.27 cm before zero correction. Outside jaws measure external diameter/thickness, inside jaws measure internal diameter and the depth rod measures depth. Corrected reading = observed reading − signed zero error: positive error is subtracted and negative error is added. Board practical record: labelled diagram, least count, observation table, calculation, precautions and result with unit.</p>","<p>सामान्य प्रत्यक्ष वर्नियर में 10 VSD = 9 MSD। यदि 1 MSD = 0.1 cm है, तो 1 VSD = 0.09 cm और LC = 0.01 cm। पाठ्यांक = MSR + (संपाती भाग × LC)। उदाहरण: MSR 3.2 cm और सातवाँ भाग मिलने पर शून्य संशोधन से पहले पाठ्यांक 3.27 cm है। बाहरी जबड़े बाहरी व्यास/मोटाई, भीतरी जबड़े आंतरिक व्यास और depth rod गहराई मापती है। सही पाठ्यांक = प्रेक्षित पाठ्यांक − चिह्न सहित शून्य त्रुटि: धनात्मक त्रुटि घटती है और ऋणात्मक जुड़ती है। बोर्ड प्रायोगिक रिकॉर्ड में नामांकित आरेख, अल्पतमांक, प्रेक्षण सारणी, गणना, सावधानियाँ और मात्रक सहित परिणाम लिखो।</p>")},
{h:B("Supplement G — screw gauge: pitch, least count and backlash","पूरक G — स्क्रू गेज: पिच, अल्पतमांक और बैकलैश"),body:B("<p>Pitch is the spindle displacement in one complete rotation. Measure it by turning the thimble a known number of turns and dividing displacement by turns. Least count = pitch / number of circular divisions. Example: 10 turns move 5.0 mm, so pitch = 0.50 mm; with 50 divisions, LC = 0.01 mm. Reading = MSR + CSR × LC. Backlash is lost motion caused by worn screw threads when direction is reversed; approach the final setting from one direction only. Use the ratchet, avoid overtightening, and measure a wire or sheet at several positions. Zero correction is the negative of signed zero error.</p>","<p>पिच एक पूरे चक्कर में स्पिंडल का विस्थापन है। थिम्बल को ज्ञात चक्करों तक घुमाकर विस्थापन को चक्करों से भाग दो। अल्पतमांक = पिच / वृत्ताकार भागों की संख्या। उदाहरण: 10 चक्करों में 5.0 mm गति, इसलिए पिच = 0.50 mm; 50 भागों पर LC = 0.01 mm। पाठ्यांक = MSR + CSR × LC। दिशा बदलने पर घिसी चूड़ियों के कारण होने वाली खाली गति बैकलैश है; अंतिम पाठ्यांक एक ही दिशा से लो। रैचेट उपयोग करो, अधिक मत कसो और तार/शीट को कई स्थानों पर मापो। शून्य संशोधन, चिह्न सहित शून्य त्रुटि का ऋणात्मक होता है।</p>")},
 {h:B('1.12 Common mistakes','1.12 आम गलतियाँ'),
  body:B('<ol><li>The error of Z = A² is 2ΔA/A, not (ΔA/A)².</li><li>Do not blindly add the errors of correlated quantities like A/A.</li><li>Always subtract the zero error with its sign.</li><li>If t is the time for n oscillations, ΔT/T = Δt/t.</li><li>Absolute error has a unit; relative error does not.</li><li>If the diameter is given but the formula has the radius, the relative error stays the same.</li></ol>',
  '<ol><li>Z = A² की त्रुटि 2ΔA/A है, (ΔA/A)² नहीं।</li><li>A/A जैसी सहसंबद्ध राशियों की त्रुटियाँ आँख मूँदकर मत जोड़ो।</li><li>शून्य त्रुटि हमेशा चिह्न के साथ घटाओ।</li><li>t यदि n दोलनों का समय हो तो ΔT/T = Δt/t।</li><li>निरपेक्ष त्रुटि का मात्रक होता है, सापेक्ष त्रुटि का नहीं।</li><li>व्यास दिया हो और सूत्र में त्रिज्या हो, तब भी सापेक्ष त्रुटि वही रहती है।</li></ol>')},
 {h:B('1.13 Practice exercise','1.13 अभ्यास प्रश्न'),
  body:B('<h3>A. Single correct</h3><ol><li>The dimension of √(µ₀/ε₀) equals that of: (a) velocity (b) resistance (c) capacitance (d) inductance</li><li>The dimension of time is that of: (a) L/R (b) RC (c) √(LC) (d) all</li><li>If c, G, h are the base quantities, mass ∝ (a) √(hc/G) (b) √(hG/c³) (c) √(Gc/h) (d) √(hG/c⁵)</li><li>P = a³b²/(√c d); % errors in a, b, c, d are 1, 3, 4, 2. % error in P: (a) 7 (b) 9 (c) 13 (d) 15</li><li>The units of length and time are doubled (mass same). The numerical value of force: (a) halves (b) doubles (c) same (d) four times</li><li>A cube has side 5.402 cm. Total surface area (correct s.f.): (a) 175 (b) 175.1 (c) 175.09 (d) 175.0896 cm²</li><li>A sphere of radius (5.3 ± 0.1) cm. Approximate % error in volume: (a) 1.9 (b) 3.8 (c) 5.7 (d) 0.3</li><li>The dimension of B²/2µ₀ is the same as that of: (a) force (b) energy (c) pressure (d) power</li></ol><h3>B. One or more correct</h3><ol start="9"><li>Pairs with the same dimensions: (a) torque, work (b) angular momentum, h (c) surface tension, surface energy per unit area (d) impulse, force</li><li>Dimensionless (S = surface tension): (a) ρvr/η (b) v²/rg (c) ρgr/S (d) ηv/S</li><li>F = A cos(Bx) + Ce^(−Dt), F force, x distance: (a) [A] = [C] (b) [B] = [L⁻¹] (c) [D] = [T] (d) [A/B] = [ML²T⁻²]</li><li>For a screw gauge: (a) pitch 1 mm, 100 div: LC 0.01 mm (b) same pitch with double the divisions gives half the LC (c) a positive zero error is subtracted (d) to remove backlash, turn the screw back and forth</li></ol><h3>C. Integer type</h3><ol start="13"><li>Z = a²b³/c; % errors 1, 2, 3. % error in Z?</li><li>Deep-water wave speed v = k gˣλʸ. 1/x + 1/y = ?</li><li>Planck length = hˣGʸcᶻ. 2|z| = ?</li><li>Pendulum: 1% error in L and 2% in T. % error in g?</li><li>MSD = 0.5 mm, 50 VSD = 49 MSD. LC (in micrometres)?</li></ol><h3>D. Matrix match</h3><ol start="18"><li>Match Column I with Column II.<br>(P) Capacitance (1) [ML²T⁻²A⁻²]<br>(Q) Inductance (2) [M⁻¹L⁻³T⁴A²]<br>(R) Magnetic field (3) [M⁻¹L⁻²T⁴A²]<br>(S) ε₀ (4) [MT⁻²A⁻¹]</li></ol><h3>E. Subjective</h3><ol start="19"><li>The speed of sound in a gas depends on pressure P and density ρ. Derive the formula.</li><li>V = (100 ± 5) V, I = (10.0 ± 0.2) A. Write R with its error.</li><li>Pendulum L = (100.0 ± 0.1) cm; time for 20 oscillations (40.0 ± 0.2) s. % error in g?</li><li>If energy E, velocity V and time T are the base quantities, find the dimension of surface tension.</li></ol>',
  '<h3>A. एकल सही</h3><ol><li>√(µ₀/ε₀) की विमा किसके बराबर है? (a) वेग (b) प्रतिरोध (c) धारिता (d) प्रेरकत्व</li><li>समय की विमा किसकी है? (a) L/R (b) RC (c) √(LC) (d) सभी</li><li>c, G, h मूल राशियाँ हों तो द्रव्यमान ∝ (a) √(hc/G) (b) √(hG/c³) (c) √(Gc/h) (d) √(hG/c⁵)</li><li>P = a³b²/(√c d); a, b, c, d में % त्रुटियाँ 1, 3, 4, 2। P में % त्रुटि: (a) 7 (b) 9 (c) 13 (d) 15</li><li>लंबाई और समय के मात्रक दोगुने कर दिए (द्रव्यमान वही)। बल का संख्यात्मक मान: (a) आधा (b) दोगुना (c) वही (d) चार गुना</li><li>घन की भुजा 5.402 cm। कुल पृष्ठीय क्षेत्रफल (सही सार्थक अंकों में): (a) 175 (b) 175.1 (c) 175.09 (d) 175.0896 cm²</li><li>गोले की त्रिज्या (5.3 ± 0.1) cm। आयतन में लगभग % त्रुटि: (a) 1.9 (b) 3.8 (c) 5.7 (d) 0.3</li><li>B²/2µ₀ की विमा किसके जैसी है? (a) बल (b) ऊर्जा (c) दाब (d) शक्ति</li></ol><h3>B. एक या अधिक सही</h3><ol start="9"><li>समान विमा वाले जोड़े: (a) बल आघूर्ण, कार्य (b) कोणीय संवेग, h (c) पृष्ठ तनाव, प्रति इकाई क्षेत्रफल पृष्ठ ऊर्जा (d) आवेग, बल</li><li>विमाहीन (S पृष्ठ तनाव): (a) ρvr/η (b) v²/rg (c) ρgr/S (d) ηv/S</li><li>F = A cos(Bx) + Ce^(−Dt), F बल, x दूरी: (a) [A] = [C] (b) [B] = [L⁻¹] (c) [D] = [T] (d) [A/B] = [ML²T⁻²]</li><li>स्क्रू गेज के लिए सही: (a) पिच 1 mm, 100 भाग: LC 0.01 mm (b) उसी पिच पर भाग दोगुने हों तो LC आधा (c) धनात्मक शून्य त्रुटि घटाते हैं (d) बैकलैश हटाने के लिए स्क्रू को आगे-पीछे घुमाते हैं</li></ol><h3>C. पूर्णांक प्रकार</h3><ol start="13"><li>Z = a²b³/c; % त्रुटियाँ 1, 2, 3। Z की % त्रुटि?</li><li>गहरे पानी की तरंग की चाल v = k gˣλʸ। 1/x + 1/y = ?</li><li>प्लांक लंबाई = hˣGʸcᶻ। 2|z| = ?</li><li>लोलक: L में 1% और T में 2% त्रुटि। g में % त्रुटि?</li><li>MSD = 0.5 mm, 50 VSD = 49 MSD। LC (माइक्रोमीटर में)?</li></ol><h3>D. मिलान</h3><ol start="18"><li>स्तंभ I को स्तंभ II से मिलाओ।<br>(P) धारिता (1) [ML²T⁻²A⁻²]<br>(Q) प्रेरकत्व (2) [M⁻¹L⁻³T⁴A²]<br>(R) चुंबकीय क्षेत्र (3) [M⁻¹L⁻²T⁴A²]<br>(S) ε₀ (4) [MT⁻²A⁻¹]</li></ol><h3>E. विषयनिष्ठ</h3><ol start="19"><li>गैस में ध्वनि की चाल दाब P और घनत्व ρ पर निर्भर करती है। सूत्र ज्ञात करो।</li><li>V = (100 ± 5) V, I = (10.0 ± 0.2) A। R को त्रुटि सहित लिखो।</li><li>लोलक L = (100.0 ± 0.1) cm; 20 दोलनों का समय (40.0 ± 0.2) s। g में % त्रुटि?</li><li>यदि ऊर्जा E, वेग V और समय T मूल राशियाँ हों तो पृष्ठ तनाव की विमा ज्ञात करो।</li></ol>')},
 {h:B('1.14 Answers and solutions','1.14 उत्तर एवं हल'),
  body:B('<ol><li>(b) √(µ₀/ε₀) ≈ 377 Ω; dimension [ML²T⁻³A⁻²].</li><li>(d) all three are time constants.</li><li>(a)</li><li>(c) 3(1) + 2(3) + ½(4) + 2 = 13%.</li><li>(b) new force unit = M(2L)/(2T)² = half the old one, so the number doubles.</li><li>(b) 6(5.402)² = 175.0896 → 175.1.</li><li>(c) 3 × 0.1/5.3 × 100 = 5.7%.</li><li>(c) energy density.</li><li>(a, b, c) impulse [MLT⁻¹], force [MLT⁻²].</li><li>(a, b, d) ρgr/S has dimension [L⁻¹].</li><li>(a, b, d) [D] = [T⁻¹].</li><li>(a, b, c) to remove backlash we turn in one direction only.</li><li>11: 2 + 6 + 3.</li><li>4: x = y = ½.</li><li>3: z = −3/2.</li><li>5: 1 + 2(2).</li><li>10: 0.5/50 = 0.01 mm.</li><li>P-3, Q-1, R-4, S-2</li><li>v = k Pᵃρᵇ: a + b = 0, −2a = −1. v = k√(P/ρ).</li><li>R = 10 Ω; % error 5 + 2 = 7%; R = (10.0 ± 0.7) Ω.</li><li>0.1% + 2(0.5%) = 1.1%.</li><li>S = energy/area; length = VT. [S] = E V⁻²T⁻².</li></ol>',
  '<ol><li>(b) √(µ₀/ε₀) ≈ 377 Ω; विमा [ML²T⁻³A⁻²]।</li><li>(d) तीनों समय नियतांक हैं।</li><li>(a)</li><li>(c) 3(1) + 2(3) + ½(4) + 2 = 13%।</li><li>(b) नई बल इकाई = M(2L)/(2T)² = पुरानी की आधी, इसलिए संख्या दोगुनी।</li><li>(b) 6(5.402)² = 175.0896 → 175.1।</li><li>(c) 3 × 0.1/5.3 × 100 = 5.7%।</li><li>(c) ऊर्जा घनत्व।</li><li>(a, b, c) आवेग [MLT⁻¹], बल [MLT⁻²]।</li><li>(a, b, d) ρgr/S की विमा [L⁻¹] है।</li><li>(a, b, d) [D] = [T⁻¹]।</li><li>(a, b, c) बैकलैश हटाने के लिए एक ही दिशा में घुमाते हैं।</li><li>11: 2 + 6 + 3।</li><li>4: x = y = ½।</li><li>3: z = −3/2।</li><li>5: 1 + 2(2)।</li><li>10: 0.5/50 = 0.01 mm।</li><li>P-3, Q-1, R-4, S-2</li><li>v = k Pᵃρᵇ: a + b = 0, −2a = −1। v = k√(P/ρ)।</li><li>R = 10 Ω; % त्रुटि 5 + 2 = 7%; R = (10.0 ± 0.7) Ω।</li><li>0.1% + 2(0.5%) = 1.1%।</li><li>S = ऊर्जा/क्षेत्रफल; लंबाई = VT। [S] = E V⁻²T⁻²।</li></ol>')}
);

c.examples.push(
 {lv:'fnd',q:B('Pendulum period readings: 2.63, 2.56, 2.42, 2.71, 2.80 s. Find the mean, mean absolute error and percentage error.','लोलक के आवर्तकाल के पाठ्यांक: 2.63, 2.56, 2.42, 2.71, 2.80 s। माध्य, माध्य निरपेक्ष त्रुटि और प्रतिशत त्रुटि ज्ञात करो।'),
  a:B('T̄ = 2.624 → 2.62 s. |ΔTᵢ|: 0.01, 0.06, 0.20, 0.09, 0.18. Mean = 0.108 → 0.11 s. <b>T = (2.6 ± 0.1) s</b>; percentage ≈ 4%.','T̄ = 2.624 → 2.62 s। |ΔTᵢ|: 0.01, 0.06, 0.20, 0.09, 0.18। माध्य = 0.108 → 0.11 s। <b>T = (2.6 ± 0.1) s</b>; प्रतिशत ≈ 4%।')},
 {lv:'main',q:B('g = 4π²L/T². L = 20.0 cm (1 mm resolution), time for 100 oscillations = 90 s (1 s resolution). Find the % error in g.','g = 4π²L/T²। L = 20.0 cm (विभेदन 1 mm), 100 दोलनों का समय 90 s (विभेदन 1 s)। g में % त्रुटि ज्ञात करो।'),
  a:B('T = t/100, so ΔT/T = Δt/t = 1/90. Δg/g = 0.1/20.0 + 2/90 = 0.0272, that is <b>≈ 3%</b>.','T = t/100, अतः ΔT/T = Δt/t = 1/90। Δg/g = 0.1/20.0 + 2/90 = 0.0272, यानी <b>≈ 3%</b>।')},
 {lv:'main',q:B('R₁ = (100 ± 3) Ω and R₂ = (200 ± 4) Ω are in parallel. Find R ± ΔR.','R₁ = (100 ± 3) Ω और R₂ = (200 ± 4) Ω समांतर क्रम में हैं। R ± ΔR ज्ञात करो।'),
  a:B('R = 200/3 = 66.7 Ω. 1/R = 1/R₁ + 1/R₂ ⇒ ΔR/R² = ΔR₁/R₁² + ΔR₂/R₂² = 4 × 10⁻⁴. ΔR = 1.8 Ω; <b>R = (66.7 ± 1.8) Ω</b>.','R = 200/3 = 66.7 Ω। 1/R = 1/R₁ + 1/R₂ ⇒ ΔR/R² = ΔR₁/R₁² + ΔR₂/R₂² = 4 × 10⁻⁴। ΔR = 1.8 Ω; <b>R = (66.7 ± 1.8) Ω</b>।')},
 {lv:'adv',q:B('(Trap) x = (a − b)/(a + b), a = 10.0 ± 0.1, b = 5.0 ± 0.1. Find Δx.','(जाल) x = (a − b)/(a + b), a = 10.0 ± 0.1, b = 5.0 ± 0.1। Δx ज्ञात करो।'),
  a:B('The numerator and denominator have the same variables, so adding their errors separately is wrong. Use partial differentiation: dx = (2b da − 2a db)/(a + b)² ⇒ Δx = 2(bΔa + aΔb)/(a + b)² = 2(0.5 + 1.0)/225 = 0.013. <b>x = 0.333 ± 0.013</b>.','अंश और हर में वही चर हैं, इसलिए उनकी त्रुटियाँ अलग-अलग जोड़ना गलत है। आंशिक अवकलन लगाओ: dx = (2b da − 2a db)/(a + b)² ⇒ Δx = 2(bΔa + aΔb)/(a + b)² = 2(0.5 + 1.0)/225 = 0.013। <b>x = 0.333 ± 0.013</b>।')},
 {lv:'main',q:B('10-division vernier, LC 0.01 cm. With the jaws closed the zero is on the right and the 4th division coincides. Observed 3.27 cm. What if the zero were on the left and the 6th coincided?','10 भाग वाला वर्नियर, LC 0.01 cm। जबड़े बंद करने पर शून्य दाईं ओर और 4था भाग सीध में। प्रेक्षित 3.27 cm। यदि शून्य बाईं ओर होता और 6ठा भाग सीध में आता तो?'),
  a:B('Case 1: error = +0.04; correct = <b>3.23 cm</b>. Case 2: error = −(10 − 6)(0.01) = −0.04; correct = <b>3.31 cm</b>.','स्थिति 1: त्रुटि = +0.04; सही = <b>3.23 cm</b>। स्थिति 2: त्रुटि = −(10 − 6)(0.01) = −0.04; सही = <b>3.31 cm</b>।')},
 {lv:'adv',q:B('(Advanced) MSD = 1 mm and 10 VSD = 19 MSD. Find the LC.','(एडवांस्ड) MSD = 1 mm और 10 VSD = 19 MSD। LC ज्ञात करो।'),
  a:B('1 VSD = 1.9 mm. Compare the vernier division with the nearest whole multiple (2 MSD): LC = 2 − 1.9 = <b>0.1 mm</b>. The reading is still MSR + VSR × LC.','1 VSD = 1.9 mm। वर्नियर भाग की तुलना निकटतम पूर्ण गुणज (2 MSD) से करो: LC = 2 − 1.9 = <b>0.1 mm</b>। पाठ्यांक फिर भी MSR + VSR × LC रहता है।')},
 {lv:'main',q:B('Pitch 0.5 mm, 50 divisions. With the stud closed the zero is below, the 5th division at the reference. Wire: MSR 2.5 mm, CSR 38. Find the diameter.','पिच 0.5 mm, 50 भाग। स्टड बंद होने पर शून्य नीचे, 5वाँ भाग संदर्भ पर। तार: MSR 2.5 mm, CSR 38। व्यास ज्ञात करो।'),
  a:B('LC = 0.01 mm. Observed = 2.5 + 0.38 = 2.88 mm. Zero error = +0.05 mm. <b>d = 2.83 mm</b>.','LC = 0.01 mm। प्रेक्षित = 2.5 + 0.38 = 2.88 mm। शून्य त्रुटि = +0.05 mm। <b>d = 2.83 mm</b>।')},
 {lv:'main',q:B('A wire: m = (0.300 ± 0.003) g, r = (0.500 ± 0.005) mm, l = (6.00 ± 0.06) cm. Find the % error in density.','एक तार: m = (0.300 ± 0.003) g, r = (0.500 ± 0.005) mm, l = (6.00 ± 0.06) cm। घनत्व में % त्रुटि ज्ञात करो।'),
  a:B('ρ = m/πr²l. % error = 1 + 2(1) + 1 = <b>4%</b>.','ρ = m/πr²l। % त्रुटि = 1 + 2(1) + 1 = <b>4%</b>।')},
 {lv:'adv',q:B('Young’s modulus Y = 4MgL/πd²ℓ. d = 0.50 mm, extension ℓ = 0.80 mm, each with error 0.01 mm; other errors negligible. Find the % error in Y.','यंग प्रत्यास्थता गुणांक Y = 4MgL/πd²ℓ। d = 0.50 mm, प्रसार ℓ = 0.80 mm, दोनों में त्रुटि 0.01 mm; बाकी त्रुटियाँ नगण्य। Y में % त्रुटि ज्ञात करो।'),
  a:B('ΔY/Y % = 2(0.01/0.50 × 100) + (0.01/0.80 × 100) = 4 + 1.25 = <b>5.25%</b>.','ΔY/Y % = 2(0.01/0.50 × 100) + (0.01/0.80 × 100) = 4 + 1.25 = <b>5.25%</b>।')}
);

c.examples.push(
{lv:'board',q:B("Write the seven SI base quantities with their units and symbols.","सात SI मूल राशियाँ उनके मात्रकों और प्रतीकों सहित लिखिए।"),a:B("Length–metre (m), mass–kilogram (kg), time–second (s), current–ampere (A), temperature–kelvin (K), amount–mole (mol), luminous intensity–candela (cd).","लंबाई–मीटर (m), द्रव्यमान–किलोग्राम (kg), समय–सेकंड (s), धारा–ऐम्पियर (A), ताप–केल्विन (K), पदार्थ की मात्रा–मोल (mol), ज्योति तीव्रता–कैंडेला (cd)।")},
{lv:'board',q:B("A screw gauge has pitch 0.5 mm and 50 circular divisions. Find its least count.","एक स्क्रू गेज की पिच 0.5 mm और 50 वृत्ताकार भाग हैं। अल्पतमांक ज्ञात कीजिए।"),a:B("LC = pitch / divisions = 0.5/50 = <b>0.01 mm</b>.","LC = पिच / भाग = 0.5/50 = <b>0.01 mm</b>।")},
{lv:'board',q:B("A vernier has 10 VSD = 9 MSD and 1 MSD = 0.1 cm. MSR = 2.4 cm and the 6th division coincides. Find the reading.","एक वर्नियर में 10 VSD = 9 MSD और 1 MSD = 0.1 cm है। MSR = 2.4 cm और छठा भाग मिलता है। पाठ्यांक ज्ञात कीजिए।"),a:B("1 VSD = 0.09 cm; LC = 0.1 − 0.09 = 0.01 cm. Reading = 2.4 + 6(0.01) = <b>2.46 cm</b>.","1 VSD = 0.09 cm; LC = 0.1 − 0.09 = 0.01 cm। पाठ्यांक = 2.4 + 6(0.01) = <b>2.46 cm</b>।")},
{lv:'board',q:B("Observed vernier reading is 4.28 cm and positive zero error is +0.03 cm. Find the corrected reading.","वर्नियर का प्रेक्षित पाठ्यांक 4.28 cm और धनात्मक शून्य त्रुटि +0.03 cm है। सही पाठ्यांक ज्ञात कीजिए।"),a:B("Corrected = observed − zero error = 4.28 − 0.03 = <b>4.25 cm</b>.","सही = प्रेक्षित − शून्य त्रुटि = 4.28 − 0.03 = <b>4.25 cm</b>।")},
{lv:'board',q:B("Round 0.004786 to three significant figures. How many significant figures are in 2.500?","0.004786 को तीन सार्थक अंकों तक पूर्णांकित कीजिए। 2.500 में कितने सार्थक अंक हैं?"),a:B("<b>0.00479</b>. In 2.500, both trailing zeros after the decimal are significant: <b>4 significant figures</b>.","<b>0.00479</b>। 2.500 में दशमलव के बाद दोनों अंतिम शून्य सार्थक हैं: <b>4 सार्थक अंक</b>।")},
{lv:'board',q:B("Distinguish between accuracy and precision.","यथार्थता और परिशुद्धता में अंतर लिखिए।"),a:B("Accuracy is closeness to the accepted value; precision is agreement among repeated readings. A biased instrument may be precise but inaccurate.","यथार्थता स्वीकृत मान के निकटता है; परिशुद्धता बार-बार के पाठ्यांकों का आपसी मेल है। पक्षपाती उपकरण परिशुद्ध लेकिन अयथार्थ हो सकता है।")},
{lv:'board',q:B("A measured length is (20.0 ± 0.2) cm. Calculate percentage uncertainty.","मापी गई लंबाई (20.0 ± 0.2) cm है। प्रतिशत अनिश्चितता ज्ञात कीजिए।"),a:B("(0.2/20.0) × 100 = <b>1%</b>.","(0.2/20.0) × 100 = <b>1%</b>।")},
{lv:'board',q:B("Check dimensionally whether v² = u² + 2as is consistent.","विमीय रूप से जाँचिए कि v² = u² + 2as संगत है या नहीं।"),a:B("[v²] = [u²] = [L²T⁻²] and [as] = [LT⁻²][L] = [L²T⁻²]. All terms match, so the equation is dimensionally consistent.","[v²] = [u²] = [L²T⁻²] और [as] = [LT⁻²][L] = [L²T⁻²]। सभी पद समान हैं, अतः समीकरण विमीय रूप से संगत है।")}
);
c.formulas.push(
 [B('Unit and measurement','मात्रक और मापन'),'n<sub>1</sub>u<sub>1</sub> = n<sub>2</sub>u<sub>2</sub>; θ = s/r; Ω = A/r²; d = b/θ'],
 [B('Unit conversion','मात्रक परिवर्तन'),'n<sub>2</sub> = n<sub>1</sub>(M<sub>1</sub>/M<sub>2</sub>)<sup>a</sup>(L<sub>1</sub>/L<sub>2</sub>)<sup>b</sup>(T<sub>1</sub>/T<sub>2</sub>)<sup>c</sup>'],
 [B('Planck units','प्लांक मात्रक'),'l<sub>P</sub> = √(Gh/c³), t<sub>P</sub> = √(Gh/c⁵), m<sub>P</sub> = √(hc/G)'],
 [B('Error: sum / difference','त्रुटि: योग / अंतर'),'ΔZ = ΔA + ΔB'],
 [B('Error: power product','त्रुटि: घात गुणनफल'),'ΔZ/Z = |p| ΔA/A + |q| ΔB/B + |r| ΔC/C'],
 [B('Vernier calipers','वर्नियर कैलिपर्स'),'LC = MSD − VSD'],
 [B('Screw gauge','स्क्रू गेज'),'LC = pitch/N'],
 [B('Correct reading','सही पाठ्यांक'),'observed − zero error (with sign)']
);
c.rev.en.push('The error of Z = A² is 2ΔA/A, not (ΔA/A)².','Do not blindly add errors of correlated quantities like A/A.','Always subtract the zero error with its sign.','For n oscillations, ΔT/T = Δt/t.','Absolute error has a unit; relative error does not.','Diameter or radius: the relative error is the same.');
c.rev.hi.push('Z = A² की त्रुटि 2ΔA/A है, (ΔA/A)² नहीं।','A/A जैसी सहसंबद्ध राशियों की त्रुटियाँ आँख मूँदकर मत जोड़ो।','शून्य त्रुटि हमेशा चिह्न के साथ घटाओ।','n दोलनों के लिए ΔT/T = Δt/t।','निरपेक्ष त्रुटि का मात्रक होता है, सापेक्ष त्रुटि का नहीं।','व्यास या त्रिज्या: सापेक्ष त्रुटि वही रहती है।');
})();

})();
