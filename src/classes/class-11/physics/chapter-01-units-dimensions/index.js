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




})();

// Physics Ch1 — part B: sections 1.5–1.8, examples 3–14
(function(){
var B=function(e,h){return {en:e,hi:h}};
var c=CH.filter(function(x){return x.id==='physics-units-dimensions'})[0];




})();

// Physics Ch1 — part C: sections 1.9–1.14, examples 15–23, formulas, revision notes
(function(){
var B=function(e,h){return {en:e,hi:h}};
var c=CH.filter(function(x){return x.id==='physics-units-dimensions'})[0];







c.rev.en.push('The error of Z = A² is 2ΔA/A, not (ΔA/A)².','Do not blindly add errors of correlated quantities like A/A.','Always subtract the zero error with its sign.','For n oscillations, ΔT/T = Δt/t.','Absolute error has a unit; relative error does not.','Diameter or radius: the relative error is the same.');
c.rev.hi.push('Z = A² की त्रुटि 2ΔA/A है, (ΔA/A)² नहीं।','A/A जैसी सहसंबद्ध राशियों की त्रुटियाँ आँख मूँदकर मत जोड़ो।','शून्य त्रुटि हमेशा चिह्न के साथ घटाओ।','n दोलनों के लिए ΔT/T = Δt/t।','निरपेक्ष त्रुटि का मात्रक होता है, सापेक्ष त्रुटि का नहीं।','व्यास या त्रिज्या: सापेक्ष त्रुटि वही रहती है।');
})();

})();
