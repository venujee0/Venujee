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
 sections:[
 {h:B('1.1 Matter','1.1 पदार्थ'),
  body:B('<p>Chemistry studies the composition, structure, properties and reactions of matter. Medicines, fertilisers, plastics and fuels all come from it.</p><p><b>Matter</b> is anything that has mass and occupies space.</p><table><tr><th></th><th>Solid</th><th>Liquid</th><th>Gas</th></tr><tr><td>Volume</td><td>fixed</td><td>fixed</td><td>not fixed</td></tr><tr><td>Shape</td><td>fixed</td><td>not fixed</td><td>not fixed</td></tr><tr><td>Particles</td><td>very close</td><td>close</td><td>far apart</td></tr></table>',
  '<p>रसायन विज्ञान पदार्थ की संरचना, गुण और अभिक्रियाओं का अध्ययन है। दवाइयाँ, उर्वरक, प्लास्टिक और ईंधन सब इसी की देन हैं।</p><p><b>पदार्थ</b> वह है जिसमें द्रव्यमान हो और जो स्थान घेरे।</p><table><tr><th></th><th>ठोस</th><th>द्रव</th><th>गैस</th></tr><tr><td>आयतन</td><td>निश्चित</td><td>निश्चित</td><td>अनिश्चित</td></tr><tr><td>आकार</td><td>निश्चित</td><td>अनिश्चित</td><td>अनिश्चित</td></tr><tr><td>कण</td><td>बहुत पास</td><td>पास</td><td>दूर-दूर</td></tr></table>'),
  d3:'states',cap3:B('Particle motion in solid, liquid and gas. Raise the temperature to see a solid become a liquid and then a gas.','ठोस, द्रव और गैस में कणों की गति। तापमान बढ़ाकर देखो कि ठोस द्रव और फिर गैस जैसा व्यवहार करता है।')},
 {h:B('1.1.1 Classification of matter','1.1.1 पदार्थ का वर्गीकरण'),
  body:B('<ul><li><b>Element:</b> only one kind of atom (Na, O₂).</li><li><b>Compound:</b> different elements chemically combined in a fixed ratio; properties differ from its components (H₂O).</li><li><b>Mixture:</b> any ratio; separated by physical methods. <i>Homogeneous</i> (salt solution, air) or <i>heterogeneous</i> (sand + salt).</li></ul>',
  '<ul><li><b>तत्व:</b> केवल एक ही प्रकार के परमाणु (Na, O₂)।</li><li><b>यौगिक:</b> अलग-अलग तत्व निश्चित अनुपात में रासायनिक रूप से जुड़े; गुण घटकों से भिन्न (H₂O)।</li><li><b>मिश्रण:</b> किसी भी अनुपात में; भौतिक विधियों से अलग किया जा सकता है। <i>समांगी</i> (नमक का घोल, वायु) या <i>विषमांगी</i> (रेत + नमक)।</li></ul>'),
  d3:'classify',cap3:B('One example of each category: element, compound, homogeneous and heterogeneous mixture.','हर श्रेणी का एक उदाहरण: तत्व, यौगिक, समांगी और विषमांगी मिश्रण।')},
 {h:B('1.2 Measurement','1.2 मापन'),
  body:B('<table><tr><th>Quantity</th><th>SI unit</th><th>Useful relations</th></tr><tr><td>Mass</td><td>kg</td><td>1 u = 1.6605×10⁻²⁴ g</td></tr><tr><td>Volume</td><td>m³</td><td>1 L = 1 dm³ = 1000 mL</td></tr><tr><td>Density</td><td>kg m⁻³</td><td>1 g cm⁻³ = 1000 kg m⁻³</td></tr><tr><td>Temperature</td><td>K</td><td>K = °C + 273.15</td></tr><tr><td>Pressure</td><td>Pa</td><td>1 atm = 1.01325 bar</td></tr></table><p>°F = (9/5)(°C) + 32. <b>Mass</b> is the amount of matter (same everywhere); <b>weight</b> is the force of gravity on it.</p><p><b>Significant figures:</b> non-zero digits and zeros between them count; leading zeros do not. In × and ÷ keep the fewest significant figures; in + and − keep the fewest decimal places. Scientific notation: N × 10ⁿ, 1 ≤ N &lt; 10.</p><p><b>Unit-factor method:</b> multiply by a factor equal to 1, e.g. 2 L × (1000 cm³ / 1 L) = 2000 cm³.</p>',
  '<table><tr><th>राशि</th><th>SI मात्रक</th><th>उपयोगी संबंध</th></tr><tr><td>द्रव्यमान</td><td>kg</td><td>1 u = 1.6605×10⁻²⁴ g</td></tr><tr><td>आयतन</td><td>m³</td><td>1 L = 1 dm³ = 1000 mL</td></tr><tr><td>घनत्व</td><td>kg m⁻³</td><td>1 g cm⁻³ = 1000 kg m⁻³</td></tr><tr><td>ताप</td><td>K</td><td>K = °C + 273.15</td></tr><tr><td>दाब</td><td>Pa</td><td>1 atm = 1.01325 bar</td></tr></table><p>°F = (9/5)(°C) + 32। <b>द्रव्यमान</b> पदार्थ की मात्रा है (हर जगह समान); <b>भार</b> उस पर लगने वाला गुरुत्व बल है।</p><p><b>सार्थक अंक:</b> शून्येतर अंक और उनके बीच के शून्य सार्थक हैं; शुरू के शून्य नहीं। × और ÷ में सबसे कम सार्थक अंक रखें; + और − में सबसे कम दशमलव स्थान। वैज्ञानिक संकेतन: N × 10ⁿ, 1 ≤ N &lt; 10।</p><p><b>मात्रक-गुणक विधि:</b> मात्रक बदलने के लिए 1 के बराबर गुणक से गुणा करें, जैसे 2 L × (1000 cm³ / 1 L) = 2000 cm³।</p>')},
 {h:B('1.3 Laws of chemical combination','1.3 रासायनिक संयोजन के नियम'),
  body:B('<ol><li><b>Conservation of mass (Lavoisier):</b> total mass is neither created nor destroyed in a chemical reaction.</li><li><b>Definite proportions (Proust):</b> a compound always has the same mass ratio of elements, whatever the source. Water: H : O = 1 : 8.</li><li><b>Multiple proportions (Dalton):</b> if two elements form more than one compound, the masses of one that combine with a fixed mass of the other are in a simple whole-number ratio.</li></ol><p>Example: with 12 g of C, CO has 16 g of O and CO₂ has 32 g of O, so the ratio is 16 : 32 = 1 : 2 (see Example 1).</p>',
  '<ol><li><b>द्रव्यमान संरक्षण (लवाज़िए):</b> रासायनिक अभिक्रिया में कुल द्रव्यमान न बनता है, न नष्ट होता है।</li><li><b>निश्चित अनुपात (प्रूस्त):</b> किसी यौगिक में तत्वों का द्रव्यमान अनुपात हमेशा समान रहता है, स्रोत कोई भी हो। पानी में H : O = 1 : 8।</li><li><b>गुणित अनुपात (डाल्टन):</b> दो तत्व एक से अधिक यौगिक बनाएँ तो एक तत्व के निश्चित द्रव्यमान से जुड़ने वाले दूसरे तत्व के द्रव्यमान सरल पूर्ण संख्या अनुपात में होते हैं।</li></ol><p>उदाहरण: 12 g C के साथ CO में 16 g O और CO₂ में 32 g O है, अनुपात 16 : 32 = 1 : 2 (उदाहरण 1 देखो)।</p>'),
  d3:'co2',cap3:B('A carbon atom first bonds with one oxygen (CO), then with a second (CO₂).','एक कार्बन परमाणु पहले एक ऑक्सीजन से जुड़ता है (CO), फिर दूसरे से (CO₂)।')},
 {h:B('1.3.1 Gay-Lussac, Avogadro and Dalton’s theory','1.3.1 गे-लुसाक, आवोगाद्रो और डाल्टन का सिद्धांत'),
  body:B('<p><b>Gay-Lussac’s law:</b> at the same T and P, reacting and product gases have volumes in a simple ratio: 2 H₂ + O₂ → 2 H₂O gives 2 : 1 : 2.</p><p><b>Avogadro’s law:</b> equal volumes of gases at the same T and P have equal numbers of molecules.</p><p><b>Dalton’s atomic theory:</b> (1) matter is made of indivisible atoms; (2) atoms of one element are identical; (3) atoms combine in fixed whole-number ratios; (4) in a reaction atoms only rearrange. Today we know atoms are divisible and isotopes differ in mass.</p>',
  '<p><b>गे-लुसाक का नियम:</b> समान T और P पर अभिकारक और उत्पाद गैसों के आयतन सरल अनुपात में होते हैं: 2 H₂ + O₂ → 2 H₂O में 2 : 1 : 2।</p><p><b>आवोगाद्रो का नियम:</b> समान T और P पर गैसों के समान आयतन में अणुओं की संख्या समान होती है।</p><p><b>डाल्टन का परमाणु सिद्धांत:</b> (1) पदार्थ अविभाज्य परमाणुओं से बना है; (2) एक तत्व के परमाणु एक जैसे होते हैं; (3) परमाणु निश्चित पूर्ण संख्या अनुपात में जुड़ते हैं; (4) अभिक्रिया में परमाणु केवल पुनर्व्यवस्थित होते हैं। आज हम जानते हैं कि परमाणु विभाज्य है और समस्थानिकों का द्रव्यमान भिन्न होता है।</p>'),
  d3:'gasvol',cap3:B('Two volumes of hydrogen and one volume of oxygen combine to give two volumes of steam.','हाइड्रोजन के दो आयतन और ऑक्सीजन का एक आयतन मिलकर भाप के दो आयतन बनाते हैं।')},
 {h:B('1.4 Atomic and molecular mass','1.4 परमाणु एवं अणु द्रव्यमान'),
  body:B('<p>1 u = (1/12) × mass of one ¹²C atom = 1.66 × 10⁻²⁴ g.</p><p><b>Average atomic mass</b> (isotopes): M̄ = ΣMᵢxᵢ / Σxᵢ</p><p><b>Molecular mass:</b> sum of atomic masses in the molecule. C₆H₁₂O₆: 6(12) + 12(1) + 6(16) = 180 u.</p><p><b>Formula mass:</b> for ionic compounds (NaCl = 58.5 u), since there is no separate molecule.</p>',
  '<p>1 u = (1/12) × एक ¹²C परमाणु का द्रव्यमान = 1.66 × 10⁻²⁴ g।</p><p><b>औसत परमाणु द्रव्यमान</b> (समस्थानिक): M̄ = ΣMᵢxᵢ / Σxᵢ</p><p><b>अणु द्रव्यमान:</b> अणु के सभी परमाणुओं के द्रव्यमानों का योग। C₆H₁₂O₆: 6(12) + 12(1) + 6(16) = 180 u।</p><p><b>सूत्र द्रव्यमान:</b> आयनिक यौगिकों (NaCl = 58.5 u) के लिए, क्योंकि अलग अणु नहीं होता।</p>'),
  d3:'isotopes',cap3:B('Same 17 protons, different neutrons: ³⁵Cl (18 n) and ³⁷Cl (20 n), with their share in nature.','17 प्रोटॉन समान, न्यूट्रॉन अलग: ³⁵Cl (18 n) और ³⁷Cl (20 n), और प्रकृति में उनका अनुपात।')},
 {h:B('1.5 The mole concept','1.5 मोल अवधारणा'),
  body:B('<p>1 mole = 6.02214076 × 10²³ elementary entities. This is the <b>Avogadro constant</b> Nₐ. Molar mass (g mol⁻¹) is numerically equal to the atomic or molecular mass.</p><p class="fx">n = w/M = N/Nₐ = V/Vₘ = PV/RT</p><p><b>Mind the molar volume Vₘ:</b> at STP (273.15 K, 1 bar) it is 22.7 L mol⁻¹. Old STP/NTP (273 K, 1 atm): 22.4 L mol⁻¹. Use whichever condition the question gives, and only for gases.</p>',
  '<p>1 मोल = 6.02214076 × 10²³ मूल कण। यह <b>आवोगाद्रो नियतांक</b> Nₐ है। मोलर द्रव्यमान (g mol⁻¹) संख्यात्मक रूप से परमाणु/अणु द्रव्यमान के बराबर होता है।</p><p class="fx">n = w/M = N/Nₐ = V/Vₘ = PV/RT</p><p><b>मोलर आयतन Vₘ पर ध्यान दो:</b> STP (273.15 K, 1 bar) पर यह 22.7 L mol⁻¹ है। पुराना STP/NTP (273 K, 1 atm): 22.4 L mol⁻¹। प्रश्न में जो स्थिति दी हो वही लो, और केवल गैसों पर लगाओ।</p>'),
  d3:'molemap',cap3:B('Routes from mass, particles, gas volume and solution to moles, one at a time.','द्रव्यमान, कण, गैस आयतन और विलयन से मोल तक के रास्ते, एक-एक करके।')},
 {h:B('1.5.1 Counting with moles: water','1.5.1 मोल से गिनती: जल'),
  body:B('<p>In 9 g of water: n = 9/18 = 0.5 mol. That is 3.011 × 10²³ molecules, 9.03 × 10²³ atoms (3 per molecule) and 3.011 × 10²⁴ electrons (10 per molecule). Solve Examples 3, 4 and 5 at the end of the chapter.</p><p><b>Gas density:</b> d = PM/RT. <b>Vapour density:</b> VD = M/2. <b>Mixture:</b> M<sub>avg</sub> = Σxᵢ Mᵢ.</p>',
  '<p>9 g पानी में: n = 9/18 = 0.5 mol। यानी 3.011 × 10²³ अणु, 9.03 × 10²³ परमाणु (प्रति अणु 3) और 3.011 × 10²⁴ इलेक्ट्रॉन (प्रति अणु 10)। अध्याय के अंत में उदाहरण 3, 4 और 5 हल करो।</p><p><b>गैस घनत्व:</b> d = PM/RT। <b>वाष्प घनत्व:</b> VD = M/2। <b>मिश्रण:</b> M<sub>औसत</sub> = Σxᵢ Mᵢ।</p>'),
  d3:'water',cap3:B('A rotating H₂O model: 3 atoms, bond angle 104.5° and 10 electrons.','घूमता हुआ H₂O मॉडल: 3 परमाणु, बंध कोण 104.5° और 10 इलेक्ट्रॉन।')}
 ],
 formulas:[
  [B('Mole relations','मोल संबंध'),'n = w/M = N/N<sub>A</sub> = V/V<sub>m</sub> = PV/RT'],
  [B('Average atomic mass','औसत परमाणु द्रव्यमान'),'M̄ = ΣM<sub>i</sub>x<sub>i</sub> / Σx<sub>i</sub>'],
  [B('Gas density','गैस घनत्व'),'d = PM/RT'],
  [B('Vapour density','वाष्प घनत्व'),'VD = M/2'],
  [B('Mixture molar mass','मिश्रण का मोलर द्रव्यमान'),'M<sub>avg</sub> = Σx<sub>i</sub>M<sub>i</sub>'],
  [B('Temperature','तापमान'),'K = °C + 273.15; °F = (9/5)°C + 32']
 ],
 examples:[
  {lv:'fnd',q:B('Carbon and oxygen form CO and CO₂. Show which law applies.','कार्बन और ऑक्सीजन से CO और CO₂ बनते हैं। कौन-सा नियम लगता है, दिखाओ।'),
   a:B('With 12 g C: O is 16 g in CO and 32 g in CO₂. Ratio 16 : 32 = 1 : 2, a simple whole-number ratio, so the <b>law of multiple proportions</b>.','12 g C के साथ O: CO में 16 g, CO₂ में 32 g। अनुपात 16 : 32 = 1 : 2 सरल पूर्ण संख्या है, अतः <b>गुणित अनुपात का नियम</b>।')},
  {lv:'main',q:B('Chlorine: ³⁵Cl (34.97 u, 75.77%) and ³⁷Cl (36.97 u, 24.23%). Find the average atomic mass.','क्लोरीन: ³⁵Cl (34.97 u, 75.77%) और ³⁷Cl (36.97 u, 24.23%)। औसत परमाणु द्रव्यमान ज्ञात करो।'),
   a:B('34.97(0.7577) + 36.97(0.2423) = <b>35.45 u</b>.','34.97(0.7577) + 36.97(0.2423) = <b>35.45 u</b>।')},
  {lv:'fnd',q:B('For 9 g of water find moles, molecules, atoms and electrons.','9 g पानी में मोल, अणु, परमाणु और इलेक्ट्रॉन ज्ञात करो।'),
   a:B('n = 9/18 = 0.5. Molecules = 0.5Nₐ = 3.011×10²³. Atoms = 3 × molecules = 9.03×10²³. Electrons (10 each) = 5Nₐ = 3.011×10²⁴.','n = 9/18 = 0.5। अणु = 0.5Nₐ = 3.011×10²³। परमाणु = 3 × अणु = 9.03×10²³। इलेक्ट्रॉन (प्रति अणु 10) = 5Nₐ = 3.011×10²⁴।')},
  {lv:'main',q:B('How many electrons are in 1.6 g of CH₄?','1.6 g CH₄ में कितने इलेक्ट्रॉन हैं?'),
   a:B('n = 1.6/16 = 0.1; each molecule has 10 electrons; total = 1 mol = <b>6.022×10²³</b>.','n = 1.6/16 = 0.1; प्रति अणु 10 इलेक्ट्रॉन; कुल = 1 मोल = <b>6.022×10²³</b>।')},
  {lv:'adv',q:B('(Minimum molar mass) Haemoglobin has 0.334% Fe and 4 Fe atoms per molecule. Find its molar mass.','(न्यूनतम मोलर द्रव्यमान) हीमोग्लोबिन में 0.334% Fe है और प्रति अणु 4 Fe परमाणु हैं। मोलर द्रव्यमान ज्ञात करो।'),
   a:B('0.00334 M = 4 × 56 ⇒ M ≈ <b>6.7×10⁴ g mol⁻¹</b>.','0.00334 M = 4 × 56 ⇒ M ≈ <b>6.7×10⁴ g mol⁻¹</b>।')}
 ],
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
c.sections.push(
 {h:B('1.6 Percentage composition and formula','1.6 प्रतिशत संघटन एवं सूत्र'),
  body:B('<p class="fx">Mass % = (mass of element in formula / molar mass) × 100</p><p><b>Empirical formula:</b> the simplest atom ratio. <b>Molecular formula</b> = (empirical)ₙ, where n = M / empirical formula mass.</p><p><b>4 steps:</b> % → grams (take 100 g) → moles → divide by the smallest (multiply to get whole numbers if needed).</p><p>See Examples 6, 7 and 8 (the last one is a combustion analysis).</p>',
  '<p class="fx">द्रव्यमान % = (सूत्र में तत्व का द्रव्यमान / मोलर द्रव्यमान) × 100</p><p><b>मूलानुपाती सूत्र:</b> परमाणुओं का सबसे सरल अनुपात। <b>आण्विक सूत्र</b> = (मूलानुपाती)ₙ, जहाँ n = M / मूलानुपाती सूत्र द्रव्यमान।</p><p><b>4 चरण:</b> % → ग्राम (100 g लो) → मोल → सबसे छोटे से भाग दो (पूर्ण संख्या के लिए आवश्यक हो तो गुणा करो)।</p><p>उदाहरण 6, 7 और 8 देखो (अंतिम दहन विश्लेषण का है)।</p>')},
 {h:B('1.7 Stoichiometry','1.7 स्टॉइकियोमेट्री'),
  body:B('<p>The coefficients of a balanced equation give <b>mole ratios</b>, not mass ratios.</p><p>CH₄ + 2 O₂ → CO₂ + 2 H₂O</p><p>1 mol : 2 mol : 1 mol : 2 mol, that is 16 g : 64 g : 44 g : 36 g. See Example 9 (impure sample).</p>',
  '<p>संतुलित समीकरण के गुणांक <b>मोल अनुपात</b> बताते हैं, द्रव्यमान अनुपात नहीं।</p><p>CH₄ + 2 O₂ → CO₂ + 2 H₂O</p><p>1 मोल : 2 मोल : 1 मोल : 2 मोल, यानी 16 g : 64 g : 44 g : 36 g। उदाहरण 9 देखो (अशुद्ध नमूना)।</p>')},
 {h:B('1.7.1 Limiting reagent','1.7.1 सीमांत अभिकर्मक'),
  body:B('<p>The reactant that is used up <b>first</b>. Find moles / coefficient for each reactant; the <b>smallest</b> value is the limiting reagent. The product is always calculated from it. See Example 10.</p>',
  '<p>जो अभिकारक <b>सबसे पहले</b> खत्म होता है। हर अभिकारक का मोल / गुणांक निकालो; <b>सबसे छोटा</b> मान सीमांत अभिकर्मक है। उत्पाद हमेशा उसी से निकलता है। उदाहरण 10 देखो।</p>'),
  d3:'limiting',cap3:B('Molecules react; the reactant that runs out first stops the reaction and the other is left over.','अणु अभिक्रिया करते हैं; जो पहले खत्म होता है वही अभिक्रिया रोकता है और दूसरा बच जाता है।')},
 {h:B('1.7.2 Percentage yield and sequential reactions','1.7.2 प्रतिशत उपज एवं क्रमिक अभिक्रियाएँ'),
  body:B('<p class="fx">% yield = (actual / theoretical) × 100</p><p>In a series of reactions the overall yield is the <b>product of all the yields</b>. See Example 11.</p>',
  '<p class="fx">% उपज = (वास्तविक / सैद्धांतिक) × 100</p><p>क्रमिक अभिक्रियाओं में कुल उपज <b>सभी उपजों का गुणनफल</b> होती है। उदाहरण 11 देखो।</p>')},
 {h:B('1.8 Concentration terms','1.8 सांद्रता के पद'),
  body:B('<table><tr><th>Term</th><th>Formula</th><th>Depends on T?</th></tr><tr><td>Mass % (w/w)</td><td>w<sub>solute</sub>/w<sub>solution</sub> × 100</td><td>No</td></tr><tr><td>w/V %</td><td>w<sub>solute</sub>(g)/V<sub>solution</sub>(mL) × 100</td><td>Yes</td></tr><tr><td>ppm</td><td>w<sub>solute</sub>/w<sub>solution</sub> × 10⁶</td><td>No</td></tr><tr><td>Mole fraction</td><td>x<sub>A</sub> = n<sub>A</sub>/(n<sub>A</sub>+n<sub>B</sub>)</td><td>No</td></tr><tr><td>Molarity M</td><td>n<sub>solute</sub>/V<sub>solution</sub>(L)</td><td>Yes</td></tr><tr><td>Molality m</td><td>n<sub>solute</sub>/w<sub>solvent</sub>(kg)</td><td>No</td></tr></table><p>See Example 12.</p>',
  '<table><tr><th>पद</th><th>सूत्र</th><th>T पर निर्भर?</th></tr><tr><td>द्रव्यमान % (w/w)</td><td>w<sub>विलेय</sub>/w<sub>विलयन</sub> × 100</td><td>नहीं</td></tr><tr><td>w/V %</td><td>w<sub>विलेय</sub>(g)/V<sub>विलयन</sub>(mL) × 100</td><td>हाँ</td></tr><tr><td>ppm</td><td>w<sub>विलेय</sub>/w<sub>विलयन</sub> × 10⁶</td><td>नहीं</td></tr><tr><td>मोल अंश</td><td>x<sub>A</sub> = n<sub>A</sub>/(n<sub>A</sub>+n<sub>B</sub>)</td><td>नहीं</td></tr><tr><td>मोलरता M</td><td>n<sub>विलेय</sub>/V<sub>विलयन</sub>(L)</td><td>हाँ</td></tr><tr><td>मोललता m</td><td>n<sub>विलेय</sub>/w<sub>विलायक</sub>(kg)</td><td>नहीं</td></tr></table><p>उदाहरण 12 देखो।</p>')},
 {h:B('1.8.1 Interconversion (JEE favourite)','1.8.1 आपसी रूपांतरण (JEE का पसंदीदा)'),
  body:B('<p>Solute molar mass M₂, solvent M₁, density d (g mL⁻¹):</p><p class="fx">m = 1000M / (1000d − M·M₂) &nbsp; M = 10d(%w/w)/M₂ &nbsp; x₂/x₁ = mM₁/1000</p><p><b>If you forget the formula:</b> assume 1 L of solution (or 1 kg of solvent), write grams of solute and solvent, then apply the definition. See Examples 13, 14 and 15.</p>',
  '<p>विलेय का मोलर द्रव्यमान M₂, विलायक का M₁, घनत्व d (g mL⁻¹):</p><p class="fx">m = 1000M / (1000d − M·M₂) &nbsp; M = 10d(%w/w)/M₂ &nbsp; x₂/x₁ = mM₁/1000</p><p><b>सूत्र भूल जाओ तो:</b> 1 L विलयन (या 1 kg विलायक) मान लो, विलेय और विलायक के ग्राम लिखो, फिर परिभाषा लगाओ। उदाहरण 13, 14 और 15 देखो।</p>')},
 {h:B('1.8.2 Dilution and mixing','1.8.2 तनुकरण एवं मिश्रण'),
  body:B('<p class="fx">M₁V₁ = M₂V₂ &nbsp; M<sub>mix</sub> = (M₁V₁ + M₂V₂)/(V₁ + V₂)</p><p>(same solute, no reaction). Always add acid to water, never the reverse. See Examples 16 and 17.</p>',
  '<p class="fx">M₁V₁ = M₂V₂ &nbsp; M<sub>मिश्रण</sub> = (M₁V₁ + M₂V₂)/(V₁ + V₂)</p><p>(एक ही विलेय, कोई अभिक्रिया नहीं)। अम्ल को हमेशा पानी में डालो, उल्टा कभी नहीं। उदाहरण 16 और 17 देखो।</p>'),
  d3:'dilution',cap3:B('On adding water the number of solute particles stays the same but they spread apart. Move the slider.','पानी डालने पर विलेय कणों की संख्या वही रहती है पर वे दूर-दूर हो जाते हैं। स्लाइडर चलाओ।')},
 {h:B('1.9 POAC and mixture problems','1.9 POAC एवं मिश्रण के प्रश्न'),
  body:B('<p><b>Principle of Atom Conservation:</b> the moles of atoms of an element are equal on both sides of a reaction, so you do not even need the fully balanced equation. See Examples 18 and 19.</p>',
  '<p><b>परमाणु संरक्षण का सिद्धांत:</b> किसी तत्व के परमाणुओं के मोल अभिक्रिया के दोनों ओर बराबर होते हैं, इसलिए पूरा संतुलित समीकरण भी ज़रूरी नहीं। उदाहरण 18 और 19 देखो।</p>')},
 {h:B('1.10 Equivalent concept','1.10 तुल्यांक अवधारणा'),
  body:B('<p class="fx">E = M / n-factor &nbsp; N = M × n &nbsp; eq = w/E = N·V(L)</p><table><tr><th>Species</th><th>n-factor</th></tr><tr><td>Acid</td><td>replaceable H⁺ (H₂SO₄: 2, H₃PO₃: 2)</td></tr><tr><td>Base</td><td>replaceable OH⁻ (Ca(OH)₂: 2)</td></tr><tr><td>Redox</td><td>change in electrons per formula unit</td></tr><tr><td>KMnO₄ (acidic)</td><td>5</td></tr><tr><td>K₂Cr₂O₇ (acidic)</td><td>6</td></tr><tr><td>Fe²⁺ → Fe³⁺</td><td>1</td></tr></table>',
  '<p class="fx">E = M / n-गुणक &nbsp; N = M × n &nbsp; eq = w/E = N·V(L)</p><table><tr><th>स्पीशीज़</th><th>n-गुणक</th></tr><tr><td>अम्ल</td><td>प्रतिस्थापित होने वाले H⁺ (H₂SO₄: 2, H₃PO₃: 2)</td></tr><tr><td>क्षार</td><td>प्रतिस्थापित होने वाले OH⁻ (Ca(OH)₂: 2)</td></tr><tr><td>रेडॉक्स</td><td>प्रति सूत्र इकाई इलेक्ट्रॉन परिवर्तन</td></tr><tr><td>KMnO₄ (अम्लीय)</td><td>5</td></tr><tr><td>K₂Cr₂O₇ (अम्लीय)</td><td>6</td></tr><tr><td>Fe²⁺ → Fe³⁺</td><td>1</td></tr></table>')},
 {h:B('1.10.1 Law of equivalence and titration','1.10.1 तुल्यांक का नियम एवं अनुमापन'),
  body:B('<p><b>Law of equivalence:</b> equivalents of reactants are equal in a reaction: N₁V₁ = N₂V₂. See Example 20.</p><p><b>Volume strength of H₂O₂:</b> “V volume” means 1 L of solution gives V L of O₂: 2 H₂O₂ → 2 H₂O + O₂. At 1 atm and 273 K:</p><p class="fx">V = 11.2 × M = 5.6 × N &nbsp; (at 1 bar: V = 11.35 M)</p><p>See Example 21.</p>',
  '<p><b>तुल्यांक का नियम:</b> अभिक्रिया में अभिकारकों के तुल्यांक बराबर होते हैं: N₁V₁ = N₂V₂। उदाहरण 20 देखो।</p><p><b>H₂O₂ की आयतन सामर्थ्य:</b> “V आयतन” का अर्थ है 1 L विलयन से V L O₂ मिलती है: 2 H₂O₂ → 2 H₂O + O₂। 1 atm और 273 K पर:</p><p class="fx">V = 11.2 × M = 5.6 × N &nbsp; (1 bar पर: V = 11.35 M)</p><p>उदाहरण 21 देखो।</p>'),
  d3:'titration',cap3:B('KMnO₄ falls drop by drop from the burette; at the end point a faint pink colour stays.','ब्यूरेट से KMnO₄ बूँद-बूँद गिरता है; अंत बिंदु पर हल्का गुलाबी रंग टिक जाता है।')}
);

c.examples.push(
 {lv:'fnd',q:B('Find the percentage composition of ethanol, C₂H₅OH.','एथेनॉल C₂H₅OH का प्रतिशत संघटन ज्ञात करो।'),
  a:B('M = 46. C = 24/46 = 52.17%; H = 6/46 = 13.04%; O = 16/46 = 34.78%.','M = 46। C = 24/46 = 52.17%; H = 6/46 = 13.04%; O = 16/46 = 34.78%।')},
 {lv:'main',q:B('A compound has H 4.07%, C 24.27%, Cl 71.65%; molar mass 98.96. Find the formula.','एक यौगिक में H 4.07%, C 24.27%, Cl 71.65%; मोलर द्रव्यमान 98.96। सूत्र ज्ञात करो।'),
  a:B('Moles: C 2.02, H 4.04, Cl 2.02. Ratio 1 : 2 : 1, so CH₂Cl (mass 49.48). n = 2: <b>C₂H₄Cl₂</b>.','मोल: C 2.02, H 4.04, Cl 2.02। अनुपात 1 : 2 : 1, अतः CH₂Cl (द्रव्यमान 49.48)। n = 2: <b>C₂H₄Cl₂</b>।')},
 {lv:'main',q:B('(Combustion) 0.30 g of a compound (C, H, O) gives 0.44 g CO₂ and 0.18 g H₂O. M = 60. Find the formula.','(दहन) 0.30 g यौगिक (C, H, O) से 0.44 g CO₂ और 0.18 g H₂O मिलते हैं। M = 60। सूत्र ज्ञात करो।'),
  a:B('C = 0.01 mol (0.12 g); H = 0.02 mol (0.02 g); O = 0.30 − 0.14 = 0.16 g = 0.01 mol. Empirical CH₂O, n = 2: <b>C₂H₄O₂</b>.','C = 0.01 मोल (0.12 g); H = 0.02 मोल (0.02 g); O = 0.30 − 0.14 = 0.16 g = 0.01 मोल। मूलानुपाती CH₂O, n = 2: <b>C₂H₄O₂</b>।')},
 {lv:'main',q:B('20 g of 80% pure CaCO₃ is heated. Find the mass of CO₂ and its volume at STP (1 bar).','80% शुद्ध CaCO₃ के 20 g को गर्म करने पर CO₂ का द्रव्यमान और STP (1 bar) पर आयतन ज्ञात करो।'),
  a:B('CaCO₃ → CaO + CO₂. Pure = 16 g = 0.16 mol. CO₂ = 0.16 mol = <b>7.04 g = 3.63 L</b>.','CaCO₃ → CaO + CO₂। शुद्ध = 16 g = 0.16 मोल। CO₂ = 0.16 मोल = <b>7.04 g = 3.63 L</b>।')},
 {lv:'main',q:B('50 kg N₂ and 10 kg H₂ react to form NH₃. Find the NH₃ formed.','50 kg N₂ और 10 kg H₂ से NH₃ बनती है। बनी NH₃ ज्ञात करो।'),
  a:B('N₂ + 3H₂ → 2NH₃. N₂ = 1786 mol, H₂ = 5000 mol. 1786/1 > 5000/3, so H₂ is limiting. NH₃ = (2/3)(5000) = 3333 mol ≈ <b>56.7 kg</b>.','N₂ + 3H₂ → 2NH₃। N₂ = 1786 मोल, H₂ = 5000 मोल। 1786/1 > 5000/3, अतः H₂ सीमांत है। NH₃ = (2/3)(5000) = 3333 मोल ≈ <b>56.7 kg</b>।')},
 {lv:'main',q:B('16 kg S → H₂SO₄: S → SO₂ (80%), SO₂ → SO₃ (90%), SO₃ → H₂SO₄ (100%). Find the H₂SO₄.','16 kg S से H₂SO₄: S → SO₂ (80%), SO₂ → SO₃ (90%), SO₃ → H₂SO₄ (100%)। H₂SO₄ ज्ञात करो।'),
  a:B('S = 500 mol. H₂SO₄ = 500(0.8)(0.9) = 360 mol = <b>35.28 kg</b>.','S = 500 मोल। H₂SO₄ = 500(0.8)(0.9) = 360 मोल = <b>35.28 kg</b>।')},
 {lv:'fnd',q:B('4 g NaOH in 250 mL solution. Find the molarity.','4 g NaOH, 250 mL विलयन में। मोलरता ज्ञात करो।'),
  a:B('n = 0.1; M = 0.1/0.250 = <b>0.4 M</b>.','n = 0.1; M = 0.1/0.250 = <b>0.4 M</b>।')},
 {lv:'main',q:B('3 M NaCl has d = 1.25 g mL⁻¹. Find the molality.','3 M NaCl का घनत्व d = 1.25 g mL⁻¹। मोललता ज्ञात करो।'),
  a:B('1 L: solution 1250 g, solute 175.5 g, solvent 1.0745 kg. m = 3/1.0745 = <b>2.79</b>.','1 L में: विलयन 1250 g, विलेय 175.5 g, विलायक 1.0745 kg। m = 3/1.0745 = <b>2.79</b>।')},
 {lv:'main',q:B('In a 1 molal aqueous solution, find the mole fraction of the solute.','1 मोलल जलीय विलयन में विलेय का मोल अंश ज्ञात करो।'),
  a:B('1 mol solute, 1000/18 = 55.56 mol water. x = 1/56.56 = <b>0.0177</b>.','1 मोल विलेय, 1000/18 = 55.56 मोल पानी। x = 1/56.56 = <b>0.0177</b>।')},
 {lv:'main',q:B('98% (w/w) H₂SO₄, d = 1.84. How much acid is needed for 500 mL of 1 M?','98% (w/w) H₂SO₄, d = 1.84। 500 mL 1 M बनाने के लिए कितना अम्ल चाहिए?'),
  a:B('M = 10(1.84)(98)/98 = 18.4 M. 18.4V = 1 × 500 ⇒ V = <b>27.2 mL</b>. (Add acid to water, not the reverse.)','M = 10(1.84)(98)/98 = 18.4 M। 18.4V = 1 × 500 ⇒ V = <b>27.2 mL</b>। (अम्ल को पानी में डालो, उल्टा नहीं।)')},
 {lv:'fnd',q:B('Mix 200 mL of 0.5 M HCl with 300 mL of 0.2 M HCl. Find the molarity.','200 mL 0.5 M HCl को 300 mL 0.2 M HCl में मिलाओ। मोलरता ज्ञात करो।'),
  a:B('(100 + 60)/500 = <b>0.32 M</b>.','(100 + 60)/500 = <b>0.32 M</b>।')},
 {lv:'adv',q:B('100 mL 0.1 M H₂SO₄ + 100 mL 0.1 M NaOH. Find final [H⁺] (strong acid, fully ionised).','100 mL 0.1 M H₂SO₄ + 100 mL 0.1 M NaOH। अंतिम [H⁺] ज्ञात करो (प्रबल अम्ल, पूर्ण आयनित)।'),
  a:B('H⁺ = 20 mmol, OH⁻ = 10 mmol; 10 mmol left in 200 mL: <b>0.05 M</b>.','H⁺ = 20 mmol, OH⁻ = 10 mmol; 200 mL में 10 mmol बचे: <b>0.05 M</b>।')},
 {lv:'main',q:B('12.25 g KClO₃ decomposes completely to KCl + O₂. Find the O₂ volume (1 bar STP).','12.25 g KClO₃ पूर्णतः विघटित होकर KCl + O₂ देता है। O₂ का आयतन ज्ञात करो (1 bar STP)।'),
  a:B('O atoms: 3 × n(KClO₃) = 2 × n(O₂). 3(0.1) = 2n ⇒ n = 0.15 mol = <b>3.41 L</b>.','O परमाणु: 3 × n(KClO₃) = 2 × n(O₂)। 3(0.1) = 2n ⇒ n = 0.15 मोल = <b>3.41 L</b>।')},
 {lv:'adv',q:B('A 1.84 g mixture of CaCO₃ and MgCO₃ leaves 0.96 g of oxide on heating. Find the composition.','CaCO₃ और MgCO₃ के 1.84 g मिश्रण को गर्म करने पर 0.96 g ऑक्साइड बचता है। संघटन ज्ञात करो।'),
  a:B('Let CaCO₃ = x g: (x/100)(56) + ((1.84 − x)/84)(40) = 0.96. Solving, x = 1.00 g; <b>MgCO₃ = 0.84 g</b>.','माना CaCO₃ = x g: (x/100)(56) + ((1.84 − x)/84)(40) = 0.96। हल करने पर x = 1.00 g; <b>MgCO₃ = 0.84 g</b>।')},
 {lv:'main',q:B('25 mL of FeSO₄ needs 20 mL of 0.02 M acidic KMnO₄. Find the molarity of FeSO₄.','25 mL FeSO₄ को 20 mL 0.02 M अम्लीय KMnO₄ चाहिए। FeSO₄ की मोलरता ज्ञात करो।'),
  a:B('M₁(25)(1) = 0.02(20)(5) ⇒ <b>M₁ = 0.08 M</b>.','M₁(25)(1) = 0.02(20)(5) ⇒ <b>M₁ = 0.08 M</b>।')},
 {lv:'main',q:B('For 10 volume H₂O₂ (1 atm convention) find molarity and strength in g/L.','10 आयतन H₂O₂ (1 atm परिपाटी) की मोलरता और g/L में सामर्थ्य ज्ञात करो।'),
  a:B('M = 10/11.2 = 0.893 M; strength = 0.893 × 34 = <b>30.4 g L⁻¹</b>.','M = 10/11.2 = 0.893 M; सामर्थ्य = 0.893 × 34 = <b>30.4 g L⁻¹</b>।')}
);
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
c.sections.push(
 {h:B('1.11 Gas analysis (eudiometry)','1.11 गैस विश्लेषण (यूडियोमेट्री)'),
  body:B('<p>CₓHᵧ + (x + y/4) O₂ → x CO₂ + (y/2) H₂O(l)</p><p>On cooling, water becomes liquid; KOH absorbs CO₂; the gas left is excess O₂. See Example 22.</p>',
  '<p>CₓHᵧ + (x + y/4) O₂ → x CO₂ + (y/2) H₂O(द्र)</p><p>ठंडा करने पर पानी द्रव बन जाता है; KOH CO₂ सोख लेता है; बची गैस अधिक O₂ है। उदाहरण 22 देखो।</p>'),
  d3:'eudio',cap3:B('Spark causes an explosion, water condenses, and KOH absorbs the CO₂.','स्पार्क से विस्फोट होता है, पानी जम जाता है और KOH CO₂ सोख लेता है।')},
 {h:B('1.11.1 Dissociation and vapour density','1.11.1 वियोजन एवं वाष्प घनत्व'),
  body:B('<p>For A → nB, the degree of dissociation is</p><p class="fx">α = (D − d) / ((n − 1)d)</p><p>(D = theoretical VD, d = observed VD). See Example 23.</p>',
  '<p>A → nB के लिए वियोजन की मात्रा</p><p class="fx">α = (D − d) / ((n − 1)d)</p><p>(D = सैद्धांतिक VD, d = प्रेक्षित VD)। उदाहरण 23 देखो।</p>'),
  d3:'dissoc',cap3:B('N₂O₄ splits into two NO₂ and recombines.','N₂O₄ टूटकर दो NO₂ बनाता है और फिर जुड़ जाता है।')},
 {h:B('1.12 Common mistakes','1.12 आम गलतियाँ'),
  body:B('<ol><li>Confusing molecules and atoms (Nₐ molecules of O₂ have 2Nₐ atoms).</li><li>Molarity uses the <b>solution</b>; molality uses the <b>solvent</b>.</li><li>Do not apply 22.4 / 22.7 L to a liquid or solid.</li><li>Do not choose the limiting reagent by mass.</li><li>Do not use mole ratios before balancing the equation.</li><li>The n-factor depends on the reaction.</li></ol>',
  '<ol><li>अणु और परमाणु में भ्रम (O₂ के Nₐ अणुओं में 2Nₐ परमाणु)।</li><li>मोलरता में <b>विलयन</b>, मोललता में <b>विलायक</b>।</li><li>22.4 / 22.7 L द्रव या ठोस पर मत लगाओ।</li><li>सीमांत अभिकर्मक द्रव्यमान देखकर मत चुनो।</li><li>समीकरण संतुलित किए बिना मोल अनुपात मत लगाओ।</li><li>n-गुणक अभिक्रिया पर निर्भर करता है।</li></ol>')},
 {h:B('1.13 Practice exercise','1.13 अभ्यास प्रश्न'),
  body:B('<h3>A. Single correct</h3><ol><li>Most atoms: (a) 4 g H₂ (b) 16 g O₂ (c) 28 g N₂ (d) 18 g H₂O</li><li>Mass of one ¹²C atom (g): (a) 1.99×10⁻²³ (b) 12 (c) 1.66×10⁻²⁴ (d) 6.02×10⁻²³</li><li>Independent of temperature: (a) molarity (b) normality (c) molality (d) w/V %</li><li>Same composition of CO₂ from different sources: (a) multiple proportions (b) definite proportions (c) Avogadro (d) Gay-Lussac</li><li>Empirical formula CH₂O, molar mass 180: (a) C₂H₄O₂ (b) C₃H₆O₃ (c) C₆H₁₂O₆ (d) C₅H₁₀O₅</li><li>Moles of O atoms in 0.2 mol Al₂(SO₄)₃: (a) 0.8 (b) 1.2 (c) 2.4 (d) 12</li><li>Water from 2 g H₂ + 16 g O₂: (a) 9 g (b) 18 g (c) 36 g (d) 17 g</li><li>Mole fraction of glucose in 10% (w/w) glucose solution: (a) 0.011 (b) 0.10 (c) 0.055 (d) 0.99</li><li>0.5 M HCl needed for 1 g CaCO₃: (a) 20 mL (b) 40 mL (c) 10 mL (d) 80 mL</li><li>0.002 g solute in 1 kg of solution: ppm = (a) 0.2 (b) 2 (c) 20 (d) 200</li></ol><h3>B. One or more correct</h3><ol start="11"><li>0.5 mol CO₂: (a) 22 g (b) 1 mol O atoms (c) 3.011×10²³ molecules (d) 11 mol electrons</li><li>Independent of T: (a) molality (b) mole fraction (c) mass % (d) molarity</li><li>28 g N₂ + 8 g H₂ (100% reaction): (a) N₂ limiting (b) 34 g NH₃ (c) 2 g H₂ left (d) 36 g NH₃</li></ol><h3>C. Integer type</h3><ol start="14"><li>Moles of CO₂ from complete combustion of 0.5 mol butane?</li><li>Molarity of pure water (d = 1 g mL⁻¹), nearest integer?</li><li>A compound has 8% sulphur. Minimum molar mass?</li><li>Water (mL) to dilute 100 mL of 1 M to 0.25 M?</li><li>n-factor of KMnO₄ in acidic medium?</li><li>100 mL 0.1 M BaCl₂ + 100 mL 0.1 M Na₂SO₄: BaSO₄ formed (millimole)?</li></ol><h3>D. Subjective</h3><ol start="20"><li>A metal oxide has 60% metal. Find the equivalent mass of the metal.</li><li>A 1.90 g mixture of NaHCO₃ and Na₂CO₃ loses 0.31 g on heating. Find the composition.</li><li>1 g of limestone needs 18 mL of 1 M HCl (impurity inert). Find the purity.</li></ol>',
  '<h3>A. एकल सही</h3><ol><li>सबसे अधिक परमाणु: (a) 4 g H₂ (b) 16 g O₂ (c) 28 g N₂ (d) 18 g H₂O</li><li>एक ¹²C परमाणु का द्रव्यमान (g): (a) 1.99×10⁻²³ (b) 12 (c) 1.66×10⁻²⁴ (d) 6.02×10⁻²³</li><li>तापमान से स्वतंत्र: (a) मोलरता (b) नॉर्मलता (c) मोललता (d) w/V %</li><li>अलग-अलग स्रोतों के CO₂ का समान संघटन: (a) गुणित अनुपात (b) निश्चित अनुपात (c) आवोगाद्रो (d) गे-लुसाक</li><li>मूलानुपाती CH₂O, मोलर द्रव्यमान 180: (a) C₂H₄O₂ (b) C₃H₆O₃ (c) C₆H₁₂O₆ (d) C₅H₁₀O₅</li><li>0.2 मोल Al₂(SO₄)₃ में O परमाणुओं के मोल: (a) 0.8 (b) 1.2 (c) 2.4 (d) 12</li><li>2 g H₂ + 16 g O₂ से पानी: (a) 9 g (b) 18 g (c) 36 g (d) 17 g</li><li>10% (w/w) ग्लूकोज़ विलयन में ग्लूकोज़ का मोल अंश: (a) 0.011 (b) 0.10 (c) 0.055 (d) 0.99</li><li>1 g CaCO₃ के लिए 0.5 M HCl: (a) 20 mL (b) 40 mL (c) 10 mL (d) 80 mL</li><li>1 kg विलयन में 0.002 g विलेय: ppm = (a) 0.2 (b) 2 (c) 20 (d) 200</li></ol><h3>B. एक या अधिक सही</h3><ol start="11"><li>0.5 मोल CO₂: (a) 22 g (b) 1 मोल O परमाणु (c) 3.011×10²³ अणु (d) 11 मोल इलेक्ट्रॉन</li><li>T से स्वतंत्र: (a) मोललता (b) मोल अंश (c) द्रव्यमान % (d) मोलरता</li><li>28 g N₂ + 8 g H₂ (100% अभिक्रिया): (a) N₂ सीमांत (b) 34 g NH₃ (c) 2 g H₂ बचेगा (d) 36 g NH₃</li></ol><h3>C. पूर्णांक प्रकार</h3><ol start="14"><li>0.5 मोल ब्यूटेन के पूर्ण दहन से CO₂ के मोल?</li><li>शुद्ध पानी (d = 1 g mL⁻¹) की मोलरता (निकटतम पूर्णांक)?</li><li>एक यौगिक में 8% सल्फर है। न्यूनतम मोलर द्रव्यमान?</li><li>100 mL 1 M को 0.25 M करने के लिए पानी (mL)?</li><li>अम्लीय माध्यम में KMnO₄ का n-गुणक?</li><li>100 mL 0.1 M BaCl₂ + 100 mL 0.1 M Na₂SO₄: बना BaSO₄ (मिलीमोल)?</li></ol><h3>D. विषयनिष्ठ</h3><ol start="20"><li>एक धातु ऑक्साइड में 60% धातु है। धातु का तुल्यांकी द्रव्यमान ज्ञात करो।</li><li>NaHCO₃ + Na₂CO₃ के 1.90 g मिश्रण को गर्म करने पर 0.31 g द्रव्यमान घटा। संघटन ज्ञात करो।</li><li>1 g चूना पत्थर को 18 mL 1 M HCl चाहिए (अशुद्धि अक्रिय)। शुद्धता ज्ञात करो।</li></ol>')},
 {h:B('1.14 Answers and solutions','1.14 उत्तर एवं हल'),
  body:B('<ol><li>(a) atoms: 4Nₐ, Nₐ, 2Nₐ, 3Nₐ.</li><li>(a) 12/Nₐ.</li><li>(c)</li><li>(b)</li><li>(c) n = 180/30 = 6.</li><li>(c) 0.2 × 12.</li><li>(b) 1 mol H₂, 0.5 mol O₂: exact ratio.</li><li>(a) (10/180) / (10/180 + 90/18) = 0.011.</li><li>(b) HCl = 0.02 mol.</li><li>(b) (0.002/1000) × 10⁶.</li><li>(a, b, c, d) electrons = 0.5 × 22.</li><li>(a, b, c)</li><li>(a, b, c) H₂ 4 mol, 3 mol used; 1 mol left.</li><li>2: 0.5 × 4.</li><li>56: 1000/18 = 55.6.</li><li>400: 32/0.08.</li><li>300: final volume 400 mL.</li><li>5</li><li>10: both 10 mmol.</li><li>60 g metal + 40 g O. E = (60/40) × 8 = 12.</li><li>2 NaHCO₃ → Na₂CO₃ + H₂O + CO₂: 168 g gives 62 g loss. NaHCO₃ = 0.84 g, Na₂CO₃ = 1.06 g.</li><li>CaCO₃ = 0.018/2 = 0.009 mol = 0.9 g: 90%.</li></ol>',
  '<ol><li>(a) परमाणु: 4Nₐ, Nₐ, 2Nₐ, 3Nₐ।</li><li>(a) 12/Nₐ।</li><li>(c)</li><li>(b)</li><li>(c) n = 180/30 = 6।</li><li>(c) 0.2 × 12।</li><li>(b) 1 मोल H₂, 0.5 मोल O₂: ठीक अनुपात।</li><li>(a) (10/180) / (10/180 + 90/18) = 0.011।</li><li>(b) HCl = 0.02 मोल।</li><li>(b) (0.002/1000) × 10⁶।</li><li>(a, b, c, d) इलेक्ट्रॉन = 0.5 × 22।</li><li>(a, b, c)</li><li>(a, b, c) H₂ 4 मोल, 3 मोल प्रयुक्त; 1 मोल बचा।</li><li>2: 0.5 × 4।</li><li>56: 1000/18 = 55.6।</li><li>400: 32/0.08।</li><li>300: अंतिम आयतन 400 mL।</li><li>5</li><li>10: दोनों 10 मिलीमोल।</li><li>60 g धातु + 40 g O। E = (60/40) × 8 = 12।</li><li>2 NaHCO₃ → Na₂CO₃ + H₂O + CO₂: 168 g पर 62 g कमी। NaHCO₃ = 0.84 g, Na₂CO₃ = 1.06 g।</li><li>CaCO₃ = 0.018/2 = 0.009 मोल = 0.9 g: 90%।</li></ol>')}
);

c.examples.push(
 {lv:'adv',q:B('10 mL of a hydrocarbon + 55 mL O₂. After explosion and cooling 40 mL remain; after KOH 10 mL remain. Find the formula.','10 mL हाइड्रोकार्बन + 55 mL O₂। विस्फोट और ठंडा करने के बाद 40 mL बचे; KOH के बाद 10 mL बचे। सूत्र ज्ञात करो।'),
  a:B('CO₂ = 30 mL ⇒ x = 3. O₂ used = 45 mL ⇒ x + y/4 = 4.5 ⇒ y = 6. <b>C₃H₆</b>.','CO₂ = 30 mL ⇒ x = 3। प्रयुक्त O₂ = 45 mL ⇒ x + y/4 = 4.5 ⇒ y = 6। <b>C₃H₆</b>।')},
 {lv:'adv',q:B('N₂O₄ ⇌ 2NO₂ mixture has VD 30. Find α.','N₂O₄ ⇌ 2NO₂ मिश्रण का VD 30 है। α ज्ञात करो।'),
  a:B('D = 46. α = (46 − 30)/30 = <b>0.533</b>.','D = 46। α = (46 − 30)/30 = <b>0.533</b>।')}
);

c.formulas.push(
 [B('Molecular formula','आण्विक सूत्र'),'Molecular = n × empirical'],
 [B('Limiting reagent','सीमांत अभिकर्मक'),'smallest moles / coefficient'],
 [B('Molality and molarity','मोललता और मोलरता'),'m = 1000M / (1000d − M·M<sub>2</sub>), M = 10d(%)/M<sub>2</sub>'],
 [B('Dilution / reaction','तनुकरण / अभिक्रिया'),'M<sub>1</sub>V<sub>1</sub> = M<sub>2</sub>V<sub>2</sub>; N<sub>1</sub>V<sub>1</sub> = N<sub>2</sub>V<sub>2</sub>'],
 [B('Normality','नॉर्मलता'),'N = M × n-factor'],
 [B('H₂O₂ volume strength','H₂O₂ आयतन सामर्थ्य'),'V = 11.2M = 5.6N (1 atm)'],
 [B('Degree of dissociation','वियोजन की मात्रा'),'α = (D − d) / [(n − 1)d]']
);
c.rev.en.push('Molarity uses solution; molality uses solvent.','Do not choose the limiting reagent by mass; use moles / coefficient.','Balance the equation before using mole ratios.','The n-factor depends on the reaction.');
c.rev.hi.push('मोलरता में विलयन, मोललता में विलायक।','सीमांत अभिकर्मक द्रव्यमान से नहीं, मोल / गुणांक से चुनो।','मोल अनुपात लगाने से पहले समीकरण संतुलित करो।','n-गुणक अभिक्रिया पर निर्भर करता है।');
})();
})();
