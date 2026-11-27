(function(){
  'use strict';
  var CH=window.VENU_CHAPTERS_DATA;
  var D3=window.VENU_D3, D3ATT=window.VENU_D3ATT, DG=window.VENU_DG;
  var esc=function(s){return String(s).replace(/[&<>\"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]})};
  var find=function(a,needle){return a.filter(function(s){return s.h.en.indexOf(needle)>-1})[0]};
// Class 11 Chemistry — Ch 1: Some Basic Concepts of Chemistry (Mole Concept) — complete chapter (Hindi + English, 12 3D animations)
// PART 1 of 3: sections 1.1–1.5, examples 1–5, 3D animations 1–7
(function(){
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

D3.co2={en:'Formation of CO and CO₂',hi:'CO और CO₂ का बनना',h:0.55,view:{yaw:-0.25,pitch:0.2,zoom:1},
 frame:function(S,t,P,l){
  var p=(t%9)/9,x1=p<0.3?3-(3-1.05)*(p/0.3):1.05,x2=p<0.55?-3:(p<0.85?-3+(3-1.05)*((p-0.55)/0.3):-1.05);
  S.ball([0,0,0],0.38,C_);S.text([0,0,0.4],'C','white',12,'center',true);
  S.ball([x1,0,0],0.34,O_);S.text([x1,0,0.36],'O','white',12,'center',true);
  if(p>=0.3)S.rod([0,0,0],[x1,0,0],0.05,'muted');
  if(p>=0.55){S.ball([x2,0,0],0.34,O_);S.text([x2,0,0.36],'O','white',12,'center',true)}
  if(p>=0.85)S.rod([0,0,0],[x2,0,0],0.05,'muted');
  var lab=p<0.55?'CO  →  12 g C : 16 g O':'CO₂  →  12 g C : 32 g O';
  S.hud(0.5,0.9,lab,'accent',14,'center',true);
 }};

D3.gasvol={en:'Gay-Lussac: gaseous volumes',hi:'गे-लुसाक: गैसों के आयतन',h:0.55,view:{yaw:-0.2,pitch:0.15,zoom:1},
 frame:function(S,t,P,l){
  var p=(t%8)/8,go=p<0.3?0:(p<0.6?(p-0.3)/0.3:1),HA=[[-0.16,0,0,H_,0.1],[0.16,0,0,H_,0.1]],OA=[[-0.18,0,0,O_,0.15],[0.18,0,0,O_,0.15]],WA=[[0,0,0,O_,0.15],[-0.25,-0.2,0,H_,0.1],[0.25,-0.2,0,H_,0.1]];
  if(p<0.6){
    var x=-2.6+go*2.6;mol(S,HA,[[0,1]],[x,0.5,0],l);mol(S,HA,[[0,1]],[x,-0.5,0],l);
    mol(S,OA,[[0,1]],[2.6-go*2.6,0,0],l);
  }else if(p<0.7){S.ball([0,0,0],0.25+0.3*Math.sin((p-0.6)/0.1*3.14),'gold')}
  if(p>=0.6){var y=p<0.8?(p-0.6)/0.2:1,xx=y*2.6;mol(S,WA,[[0,1],[0,2]],[xx,0.5,0],l);mol(S,WA,[[0,1],[0,2]],[xx,-0.5,0],l)}
  S.hud(0.5,0.9,'2 H₂  +  1 O₂  →  2 H₂O   (2 : 1 : 2)','accent',14,'center',true);
 }};

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

D3.water={en:'Water molecule H₂O',hi:'जल अणु H₂O',h:0.7,spin:true,view:{yaw:-0.3,pitch:0.25,zoom:1.15},
 frame:function(S,t,P,l){
  var a=t*0.45,ca=Math.cos(a),sa=Math.sin(a),O=[0,0,0],H1=[-0.78,-0.42,0.12],H2=[0.78,-0.42,-0.12];
  function turn(p){return [p[0]*ca-p[2]*sa,p[1],p[0]*sa+p[2]*ca]}
  var A=turn(H1),B=turn(H2);S.rod(O,A,0.11,'bad');S.rod(O,B,0.11,'bad');
  S.ball(O,0.34,'bad');S.ball(A,0.2,'white');S.ball(B,0.2,'white');
  S.ring(O,0.6,'xz','muted',1,true);S.text([0,0.58,0],'O','white',11,'center',true);
  S.text([A[0]-0.1,A[1]-0.25,A[2]],'H','ink',11,'center',true);S.text([B[0]+0.1,B[1]-0.25,B[2]],'H','ink',11,'center',true);
  S.hud(0.5,0.91,'H–O–H bond angle = 104.5°','accent',13,'center',true);
  S.hud(0.5,0.97,'Bent molecule · 2 O–H bonds · oxygen has 2 lone pairs','ink',11,'center',true);
 }};

var B=function(e,h){return {en:e,hi:h}};

CH.push({
 id:'chemistry-mole-concept',cls:11,subject:'chemistry',ord:1,
 title:B('Some Basic Concepts of Chemistry','रसायन विज्ञान की कुछ मूल अवधारणाएँ'),
 blurb:B('Matter, measurement, laws of combination, atomic mass and the mole concept — from foundation to JEE Advanced level.','पदार्थ, मापन, रासायनिक संयोजन के नियम, परमाणु द्रव्यमान और मोल अवधारणा — आधार से JEE Advanced स्तर तक।'),
 sections:[],
 formulas:[],
 examples:[],
 rev:{en:['Mass is constant; weight depends on gravity.','Molecules and atoms differ: Nₐ molecules of O₂ contain 2Nₐ atoms.','22.4 or 22.7 L applies only to gases, never to liquids or solids.','Use the molar volume given in the question (22.7 L at 1 bar, 22.4 L at 1 atm).','Gay-Lussac gives volume ratios; Avogadro links volume to number of molecules.'],
      hi:['द्रव्यमान स्थिर रहता है; भार गुरुत्व पर निर्भर करता है।','अणु और परमाणु का फर्क याद रखो: O₂ के Nₐ अणुओं में 2Nₐ परमाणु होते हैं।','22.4 या 22.7 L केवल गैसों पर लगता है, द्रव या ठोस पर कभी नहीं।','प्रश्न में दिया गया मोलर आयतन लो (1 bar पर 22.7 L, 1 atm पर 22.4 L)।','गे-लुसाक आयतन अनुपात देता है; आवोगाद्रो आयतन को अणुओं की संख्या से जोड़ता है।']}
});
})();

// Class 11 Chemistry — Ch 1 — PART 2 of 3: sections 1.6–1.10, examples 6–21, 3D animations 8–10
(function(){
var T=VH.T,mol=VH.mol,wire=VH.wire,B=function(e,h){return {en:e,hi:h}};
var H_='muted',O_='bad',N_='phys';
var N2=[[-0.16,0,0,N_,0.15],[0.16,0,0,N_,0.15]],H2=[[-0.13,0,0,H_,0.1],[0.13,0,0,H_,0.1]],
    NH3=[[0,0,0,N_,0.17],[-0.3,-0.22,0,H_,0.1],[0.3,-0.22,0,H_,0.1],[0,-0.22,0.3,H_,0.1]];

D3.limiting={en:'Limiting reagent',hi:'सीमांत अभिकर्मक',h:0.6,view:{yaw:-0.2,pitch:0.18,zoom:1},
 frame:function(S,t,P,l){
  var phase=(t%10)/10,used=phase>0.58,move=Math.min(1,phase/0.58);
  function particle(x,y,c,label){S.ball([x,y,0],0.17,c);S.text([x,y-0.28,0],label,'ink',9,'center',true)}
  particle(-1.8,0.8,'phys','N₂');particle(-1.8,-0.8,'phys','N₂');
  particle(-1.4,1.3,'chem','H₂');particle(-1.4,0.35,'chem','H₂');particle(-1.4,-0.6,'chem','H₂');
  if(used){particle(0.1,0.55,'good','NH₃');particle(0.1,-0.55,'good','NH₃');particle(1.45,0.8,'phys','N₂');particle(1.45,-0.8,'phys','N₂')}
  else{S.arrow([-1.0,0,0],[0.4,0,0],'gold',2)}
  S.hud(0.5,0.91,'2 N₂ + 3 H₂ → 2 NH₃ + N₂ left over','accent',12,'center',true);
  S.hud(0.5,0.97,'H₂ is limiting: it is consumed first; N₂ remains in excess','ink',11,'center',true);
 }};

D3.dilution={en:'Dilution',hi:'तनुकरण',h:0.7,view:{yaw:-0.45,pitch:0.28,zoom:1},
 params:[{k:'w',en:'Water added',hi:'मिलाया पानी',min:0,max:100,val:0,step:1,unit:'%'}],
 frame:function(S,t,P,l){
  var V=1+3*P.w/100,h=0.45*V;
  S.glassBox([0,-1+h,0],[2.05,2*h,2.05]);S.poly([[-0.92,-1+2*h,-0.92],[0.92,-1+2*h,-0.92],[0.92,-1+2*h,0.92],[-0.92,-1+2*h,0.92]],'#7dd3fc',0.16,'#38bdf8');
  for(var i=0;i<12;i++){
    var u=((i*37)%100)/100,v=((i*53)%100)/100,w=((i*71)%100)/100;
    S.ball([(u*2-1)*0.8+0.04*Math.sin(t*3+i),-1+(v*2*h)*0.92+0.04,(w*2-1)*0.8+0.04*Math.cos(t*3+i)],0.1,'bad');
  }
  S.text([0,-1.25,0],T(l,'Same 12 solute particles · volume ×'+V.toFixed(1),'विलेय कण वही 12 · आयतन ×'+V.toFixed(1)),'accent',12,'center',true);
  S.hud(0.5,0.08,'M₂ = M₁V₁/V₂ = '+(1/V).toFixed(2)+' × M₁','ink',14,'center',true);
 }};

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

var c=CH.filter(function(x){return x.id==='chemistry-mole-concept'})[0];



})();

// Class 11 Chemistry — Ch 1 — PART 3 of 3: sections 1.11–1.14, examples 22–23, 3D animations 11–12, formula sheet
(function(){
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

D3.dissoc={en:'Dissociation N₂O₄ ⇌ 2NO₂',hi:'वियोजन N₂O₄ ⇌ 2NO₂',h:0.55,view:{yaw:-0.2,pitch:0.15,zoom:1},
 frame:function(S,t,P,l){
  var p=(t%8)/8,d=p<0.2?0:p<0.5?1.5*(p-0.2)/0.3:p<0.65?1.5:p<0.95?1.5*(1-(p-0.65)/0.3):0,
   N='phys',O='bad',bond=d<0.05;
  [[-1,-1],[1,1]].forEach(function(s){
    var sg=s[1],nx=sg*(0.22+d);
    var A=[[nx,0,0,N,0.17],[nx+sg*0.28,0.4,0,O,0.14],[nx+sg*0.28,-0.4,0,O,0.14]];
    mol(S,A,[[0,1],[0,2]],[0,0,0],l);
  });
  if(bond)S.rod([-0.22,0,0],[0.22,0,0],0.04,'muted');
  S.hud(0.5,0.9,bond?'N₂O₄':(d>=1.4?'2 NO₂':'N₂O₄ ⇌ 2 NO₂'),'accent',14,'center',true);
 }};

var c=CH.filter(function(x){return x.id==='chemistry-mole-concept'})[0];





c.rev.en.push('Molarity uses solution; molality uses solvent.','Do not choose the limiting reagent by mass; use moles / coefficient.','Balance the equation before using mole ratios.','The n-factor depends on the reaction.');
c.rev.hi.push('मोलरता में विलयन, मोललता में विलायक।','सीमांत अभिकर्मक द्रव्यमान से नहीं, मोल / गुणांक से चुनो।','मोल अनुपात लगाने से पहले समीकरण संतुलित करो।','n-गुणक अभिक्रिया पर निर्भर करता है।');
})();
})();
