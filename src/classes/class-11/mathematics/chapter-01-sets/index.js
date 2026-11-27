(function(){
  'use strict';
  var CH=window.VENU_CHAPTERS_DATA;
  var D3=window.VENU_D3, D3ATT=window.VENU_D3ATT, DG=window.VENU_DG;
  var esc=function(s){return String(s).replace(/[&<>\"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]})};
  var find=function(a,needle){return a.filter(function(s){return s.h.en.indexOf(needle)>-1})[0]};
// Class 11 Mathematics — Ch 1: Sets (Hindi + English, 9 interactive 3D animations)
(function(){
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function inC(x,y,cx,cy,R){return (x-cx)*(x-cx)+(y-cy)*(y-cy)<=R*R}
function rect(S,c,x0,x1,y0,y1){S.path([[x0,y0,0],[x1,y0,0],[x1,y1,0],[x0,y1,0]],c,1.6,false,true)}
function dotsLabel(S,x,y,s,c,sz){S.text([x,y,0.05],s,c||'ink',sz||13,'center',true)}

/* 1. Set and elements */
D3.setelem={en:'Set and elements',hi:'समुच्चय और अवयव',h:0.62,view:{yaw:-0.25,pitch:0.3,zoom:1},
 frame:function(S,t,P,l){
  var tt=t%12,cx=-1.2,L=['a','e','i','o','u','b','c','d'];
  S.disc([cx,0,0],1.15,'xy','chem',0.18);S.ring([cx,0,0],1.15,'xy','chem',2.2);
  S.text([cx,1.4,0],'V','accent',16,'center',true);
  L.forEach(function(ch,k){
    var vow=k<5,sx=1.5+(k%3)*0.5,sy=1.0-Math.floor(k/3)*0.7,tk=1+k*1.1,s=ease((tt-tk)/1.0),x,y;
    if(vow){var a=k*1.2566;x=sx+(cx+0.55*Math.cos(a)-sx)*s;y=sy+(0.55*Math.sin(a)-sy)*s}
    else{var b=Math.sin(Math.min(1,Math.max(0,(tt-tk)/1.0))*3.14);x=sx-0.9*b;y=sy}
    S.ball([x,y,0.1],0.2,vow?'chem':'muted');S.text([x,y,0.32],ch,'white',13,'center',true);
  });
  S.hud(0.5,0.92,T(l,'a ∈ V   ·   b ∉ V','a ∈ V   ·   b ∉ V'),'accent',14,'center',true);
 }};

/* 2. Number sets nested */
D3.numsets={en:'N ⊂ Z ⊂ Q ⊂ R',hi:'N ⊂ Z ⊂ Q ⊂ R',h:0.66,spin:true,view:{yaw:-0.5,pitch:0.55,zoom:1},
 frame:function(S,t,P,l){
  var n=Math.min(4,1+Math.floor((t%10)/2)),Rr=[0.4,0.75,1.1,1.5],col=['phys','chem','hi','gold'],nm=['N','Z','Q','R'],z=[0.36,0.24,0.12,0],txt=['N','N ⊂ Z','N ⊂ Z ⊂ Q','N ⊂ Z ⊂ Q ⊂ R'];
  for(var i=n-1;i>=0;i--){S.disc([0,0,z[i]],Rr[i],'xy',col[i],0.55);S.ring([0,0,z[i]],Rr[i],'xy','ink',1.6)}
  for(var j=0;j<n;j++){S.text([0,j===0?0:Rr[j]-0.17,z[j]+0.05],nm[j],'ink',14,'center',true)}
  S.hud(0.5,0.93,txt[n-1],'accent',14,'center',true);
 }};

/* 3. Power set cube */
D3.powercube={en:'Power set of {1, 2, 3}',hi:'{1, 2, 3} का घात समुच्चय',h:0.8,spin:true,view:{yaw:-0.6,pitch:0.35,zoom:1.05},
 frame:function(S,t,P,l){
  var V=[],hi=Math.floor(t/1.4)%8,edges=0;
  for(var i=0;i<8;i++)V.push([(i&1?0.92:-0.92),(i&2?0.92:-0.92),(i&4?0.92:-0.92)]);
  /* Draw cube edges and three independent include/exclude decisions */
  for(var a=0;a<8;a++)for(var b=a+1;b<8;b++){var d=a^b;if(d===1||d===2||d===4)S.rod(V[a],V[b],0.012,'muted')}
  for(var k=0;k<8;k++){
    var el=[];if(k&1)el.push('1');if(k&2)el.push('2');if(k&4)el.push('3');
    S.ball(V[k],k===hi?0.19:0.13,k===hi?'gold':'chem');
    S.text([V[k][0],V[k][1]+0.28,V[k][2]],el.length?'{'+el.join(',')+'}':'∅','ink',11,'center',true);
  }
  S.text([-1.25,1.2,0],'1: in / out','chem',10,'center',true);S.text([1.25,1.2,0],'2: in / out','phys',10,'center',true);S.text([0,-1.35,0],'3: in / out','bad',10,'center',true);
  S.hud(0.5,0.91,'Each of 3 elements has 2 choices','accent',12,'center',true);
  S.hud(0.5,0.97,'2 × 2 × 2 = 2³ = 8 subsets','ink',12,'center',true);
 }};

/* 4. Intervals */
D3.intervals={en:'Intervals',hi:'अंतराल',h:0.5,view:{yaw:-0.15,pitch:0.2,zoom:1},
 frame:function(S,t,P,l){
  var st=Math.floor(t/3.5)%4,lt=t%3.5,a=-2.4,b=2.4,e=a+(b-a)*ease(lt/1.4),
   openA=st<2,openB=(st===0||st===2),nm=['(a, b)','(a, b]','[a, b)','[a, b]'],
   dsc=[T(l,'open','खुला'),T(l,'half-open','अर्द्ध-खुला'),T(l,'half-open','अर्द्ध-खुला'),T(l,'closed','बंद')];
  S.arrow([-3.6,0,0],[3.6,0,0],'muted',1.6);
  for(var k=-3;k<=3;k++)S.line([k,-0.08,0],[k,0.08,0],'muted',1);
  S.rod([a,0,0],[e,0,0],0.06,'hi');
  function pt(x,open){if(open){S.disc([x,0,0.05],0.16,'xy','paper',1);S.ring([x,0,0.06],0.16,'xy','ink',2.2)}else S.ball([x,0,0.08],0.17,'gold')}
  pt(a,openA);if(lt>1.4)pt(b,openB);
  S.text([a,-0.4,0],'a','ink',14,'center',true);S.text([b,-0.4,0],'b','ink',14,'center',true);
  S.hud(0.5,0.88,nm[st]+'  —  '+dsc[st],'accent',15,'center',true);
 }};

/* 5. Venn */
D3.venn={en:'Universal set and Venn diagram',hi:'सार्वत्रिक समुच्चय और वेन आरेख',h:0.62,view:{yaw:-0.3,pitch:0.4,zoom:1},
 frame:function(S,t,P,l){
  var p=t%10;
  rect(S,'ink',-2.2,2.2,-1.4,1.4);S.text([-1.95,1.2,0],'U','ink',16,'center',true);
  var ra=p>1?1.05*ease((p-1)/1.5):0,rb=p>4?0.45*ease((p-4)/1.5):0;
  if(ra>0.02){S.disc([-0.2,0,0.05],ra,'xy','chem',0.3);S.ring([-0.2,0,0.05],ra,'xy','chem',2.2)}
  if(rb>0.02){S.disc([-0.45,0.1,0.1],rb,'xy','gold',0.55);S.ring([-0.45,0.1,0.1],rb,'xy','gold',2.2)}
  if(p>2.8)S.text([0.55,0.55,0.1],'A','ink',15,'center',true);
  if(p>5.8)S.text([-0.45,0.1,0.15],'B','ink',15,'center',true);
  if(p>3)S.text([1.55,-0.9,0.1],'A′','muted',14,'center',true);
  if(p>6.5)S.hud(0.5,0.92,'B ⊂ A ⊂ U','accent',15,'center',true);
 }};

/* 6. Set operations (dot-fill) */
D3.setops={en:'Set operations',hi:'समुच्चयों पर संक्रियाएँ',h:0.66,view:{yaw:-0.2,pitch:0.45,zoom:1},
 frame:function(S,t,P,l){
  var st=Math.floor((t%18)/3),nm=['A ∪ B','A ∩ B','A − B','B − A','A △ B','(A ∪ B)′'],
   ca=-0.6,cb=0.6,R=1.0;
  rect(S,'ink',-2.2,2.2,-1.45,1.45);
  for(var x=-2.0;x<=2.01;x+=0.16)for(var y=-1.3;y<=1.31;y+=0.16){
    var a=inC(x,y,ca,0,R),b=inC(x,y,cb,0,R),on=[a||b,a&&b,a&&!b,b&&!a,a!==b,!(a||b)][st];
    if(on)S.ball([x,y,0],0.052,'gold');
  }
  S.ring([ca,0,0.05],R,'xy','chem',2.5);S.ring([cb,0,0.05],R,'xy','phys',2.5);
  S.text([-1.2,0,0.1],'A','chem',14,'center',true);S.text([1.2,0,0.1],'B','phys',14,'center',true);
  S.hud(0.5,0.91,'Operation '+(st+1)+' / 6','accent',12,'center',true);
  S.hud(0.5,0.97,nm[st]+' · highlighted dots = selected region','ink',12,'center',true);
 }};

/* 7. Three sets, 7 regions */
D3.threesets={en:'Three sets, seven regions',hi:'तीन समुच्चय, सात क्षेत्र',h:0.78,view:{yaw:-0.2,pitch:0.4,zoom:1},
 frame:function(S,t,P,l){
  var k=Math.floor(t/2)%7,map={1:0,2:1,4:2,3:3,6:4,5:5,7:6},R=0.95,
   A=[-0.55,0.4],Bc=[0.55,0.4],C=[0,-0.55],
   pos=[[-1.18,0.82],[1.18,0.82],[0,-1.18],[0,0.82],[0.65,-0.12],[-0.65,-0.12],[0,0.1]],
   labels=['A only','B only','C only','A∩B only','B∩C only','A∩C only','A∩B∩C'];
  for(var x=-1.7;x<=1.71;x+=0.11)for(var y=-1.55;y<=1.5;y+=0.11){
    var a=inC(x,y,A[0],A[1],R),b=inC(x,y,Bc[0],Bc[1],R),c=inC(x,y,C[0],C[1],R),code=(a?1:0)+(b?2:0)+(c?4:0);
    if(!code)continue;var id=map[code];
    S.ball([x,y,0],id===k?0.055:0.034,id===k?'gold':(id===0?'chem':id===1?'phys':'bad'));
  }
  S.ring([A[0],A[1],0.04],R,'xy','chem',2.4);S.ring([Bc[0],Bc[1],0.04],R,'xy','phys',2.4);S.ring([C[0],C[1],0.04],R,'xy','bad',2.4);
  S.text([-1.45,1.35,0],'A','chem',14,'center',true);S.text([1.45,1.35,0],'B','phys',14,'center',true);S.text([0,-1.5,0],'C','bad',14,'center',true);
  S.text([pos[k][0],pos[k][1],0.12],labels[k],'ink',k===6?10:9,'center',true);
  S.hud(0.5,0.91,'Highlighted region '+(k+1)+' of 7','accent',12,'center',true);
  S.hud(0.5,0.97,labels[k]+' · A, B and C regions','ink',11,'center',true);
 }};

/* 8. Juice survey: 400 dots */
D3.juice={en:'Juice survey: 400 students',hi:'जूस सर्वे: 400 विद्यार्थी',h:0.78,view:{yaw:-0.2,pitch:0.4,zoom:1},
 frame:function(S,t,P,l){
  var tt=t%11,s=ease((tt-0.8)/3.2),dd=0.07,ca=-0.8,cb=0.8,cy=0.3,R=1.15;
  rect(S,'ink',-2.3,2.3,-1.9,1.7);
  S.ring([ca,cy,0.02],R,'xy','chem',2);S.ring([cb,cy,0.02],R,'xy','phys',2);
  S.text([-1.55,1.65-0.0,0],'A','chem',14,'center',true);S.text([1.55,1.65,0],'O','phys',14,'center',true);
  for(var i=0;i<400;i++){
    var g,j,cx0,cy0,cols,col;
    if(i<25){j=i;cx0=-1.15;cy0=cy;cols=5;col='chem'}
    else if(i<100){j=i-25;cx0=0;cy0=cy;cols=10;col='gold'}
    else if(i<175){j=i-100;cx0=1.15;cy0=cy;cols=10;col='phys'}
    else{j=i-175;cx0=0;cy0=-1.3;cols=25;col='muted'}
    var rows=i<25?5:i<100?8:i<175?8:9,tx=cx0+((j%cols)-(cols-1)/2)*dd,ty=cy0+(Math.floor(j/cols)-(rows-1)/2)*(-dd);
    var sx=(rnd(i)*4.4-2.2),sy=(rnd(i+500)*3.2-1.6);
    S.ball([sx+(tx-sx)*s,sy+(ty-sy)*s,0.05],0.03,s<0.05?'line':col);
  }
  if(s>0.95){
    S.text([-1.45,1.1,0.1],'25','chem',14,'center',true);S.text([0,1.1,0.1],'75','accent',14,'center',true);
    S.text([1.45,1.1,0.1],'75','phys',14,'center',true);S.text([1.55,-1.3,0.1],'225','muted',14,'center',true);
  }
  S.hud(0.5,0.94,T(l,'A only 25 · both 75 · O only 75 · none 225','सिर्फ़ A 25 · दोनों 75 · सिर्फ़ O 75 · कोई नहीं 225'),'ink',12,'center',true);
 }};

/* 9. Element-wise 4 choices */
D3.fourchoice={en:'Four choices for each element',hi:'हर अवयव के लिए 4 विकल्प',h:0.66,view:{yaw:-0.25,pitch:0.4,zoom:1},
 frame:function(S,t,P,l){
  var k=Math.floor(t/2)%4,ca=-0.55,cb=0.55,R=1.0,
   pos=[[-1.25,0.0],[0,0],[1.25,0],[0,-1.2]],
   nm=[T(l,'only A','सिर्फ़ A'),T(l,'in both','दोनों में'),T(l,'only B','सिर्फ़ B'),T(l,'in neither','किसी में नहीं')];
  rect(S,'ink',-2.2,2.2,-1.5,1.4);
  S.disc([ca,0.1,0],R,'xy','chem',k===0||k===1?0.3:0.1);S.ring([ca,0.1,0.02],R,'xy','chem',2);
  S.disc([cb,0.1,0],R,'xy','phys',k===1||k===2?0.3:0.1);S.ring([cb,0.1,0.02],R,'xy','phys',2);
  S.text([-1.5,1.1,0],'A','chem',15,'center',true);S.text([1.5,1.1,0],'B','phys',15,'center',true);
  var x=pos[k][0],y=pos[k][1]+(k===3?0:0.1);
  S.ball([x,y,0.2],0.18,'gold');S.text([x,y,0.42],'x','ink',13,'center',true);
  S.hud(0.5,0.9,nm[k]+'   →   4 '+T(l,'choices','विकल्प')+' · 4ⁿ','accent',14,'center',true);
 }};

var N={title:B('Sets','समुच्चय (Sets)')};

CH.push({
 id:'maths-sets',cls:11,subject:'maths',ord:1,
 title:N.title,
 blurb:B('What a set is, ways to write it, subsets, intervals, Venn diagrams, operations, laws, cardinality and advanced counting — foundation to JEE Advanced level.','समुच्चय क्या है, उसे लिखने के तरीके, उपसमुच्चय, अंतराल, वेन आरेख, संक्रियाएँ, नियम, गणनांक और उन्नत गिनती — आधार से JEE Advanced स्तर तक।'),
 sections:[
 {h:B('1.1 What is a set?','1.1 समुच्चय क्या है?'),
  body:B('<p>In daily life we talk about collections: a cricket team, vowels, prime numbers. In maths, not every collection is a set.</p><p><b>Definition:</b> a collection of <b>well-defined</b> objects is a set. Well-defined means that for any object we can clearly say yes or no whether it belongs to the collection.</p><ul><li>“Natural numbers less than 10” → a set.</li><li>“Clever students of a class” → not a set, because “clever” differs for everyone.</li></ul><p>Sets are named with capital letters (A, B, X) and elements with small letters. a ∈ A means a is an element of A; b ∉ A means it is not.</p><p><b>Two important points:</b> (1) order does not matter: {1, 2, 3} = {3, 1, 2}. (2) repetition does not matter: {1, 1, 2} = {1, 2}. The letters of “APPLE” form the set {A, P, L, E}.</p>',
  '<p>रोज़ की ज़िंदगी में हम “संग्रह” की बात करते हैं: क्रिकेट टीम, स्वर, अभाज्य संख्याएँ। गणित में हर संग्रह समुच्चय नहीं होता।</p><p><b>परिभाषा:</b> <b>सुपरिभाषित</b> वस्तुओं के संग्रह को समुच्चय कहते हैं। सुपरिभाषित का अर्थ है: कोई भी वस्तु लो, साफ़-साफ़ हाँ या ना में बताया जा सके कि वह संग्रह में है या नहीं।</p><ul><li>“10 से छोटी प्राकृत संख्याएँ” → समुच्चय है।</li><li>“कक्षा के होशियार विद्यार्थी” → समुच्चय नहीं, क्योंकि “होशियार” हर किसी के लिए अलग है।</li></ul><p>समुच्चय को बड़े अक्षरों (A, B, X) से और अवयवों को छोटे अक्षरों से लिखते हैं। a ∈ A का अर्थ है a, A का अवयव है; b ∉ A का अर्थ है नहीं है।</p><p><b>दो ज़रूरी बातें:</b> (1) क्रम से फ़र्क नहीं पड़ता: {1, 2, 3} = {3, 1, 2}। (2) दोहराव से फ़र्क नहीं पड़ता: {1, 1, 2} = {1, 2}। “APPLE” के अक्षरों का समुच्चय {A, P, L, E} है।</p>'),
  d3:'setelem',cap3:B('Objects enter the set one by one; those that fail the property stay outside.','वस्तुएँ एक-एक करके समुच्चय में जाती हैं; जो गुण नहीं मानतीं वे बाहर रहती हैं।')},
 {h:B('1.1.1 Standard sets','1.1.1 मानक समुच्चय'),
  body:B('<table><tr><td>N</td><td>natural numbers {1, 2, 3, …}</td></tr><tr><td>Z</td><td>integers {…, −1, 0, 1, …}</td></tr><tr><td>Q</td><td>rational numbers p/q, q ≠ 0</td></tr><tr><td>R</td><td>real numbers</td></tr><tr><td>Z⁺, Q⁺, R⁺</td><td>positive integers, rationals, reals</td></tr></table><p class="fx">N ⊂ Z ⊂ Q ⊂ R</p>',
  '<table><tr><td>N</td><td>प्राकृत संख्याएँ {1, 2, 3, …}</td></tr><tr><td>Z</td><td>पूर्णांक {…, −1, 0, 1, …}</td></tr><tr><td>Q</td><td>परिमेय संख्याएँ p/q, q ≠ 0</td></tr><tr><td>R</td><td>वास्तविक संख्याएँ</td></tr><tr><td>Z⁺, Q⁺, R⁺</td><td>धनात्मक पूर्णांक, परिमेय, वास्तविक</td></tr></table><p class="fx">N ⊂ Z ⊂ Q ⊂ R</p>'),
  d3:'numsets',cap3:B('Starting from N, each bigger set takes the previous one inside it.','N से शुरू करके हर बड़ा समुच्चय पिछले को अपने अंदर ले लेता है।')},
 {h:B('1.2 Ways of writing a set','1.2 समुच्चय लिखने के तरीके'),
  body:B('<p><b>1.2.1 Roster (tabular) form:</b> list all elements inside { }, separated by commas. V = {a, e, i, o, u}, E = {2, 4, 6, …}.</p><p><b>1.2.2 Set-builder form:</b> write the common property of the elements:</p><p class="fx">A = {x : P(x)}</p><p>“:” or “|” is read “such that”. Try Examples 1, 2 and 3 at the end of the chapter.</p>',
  '<p><b>1.2.1 रोस्टर (सारणी) रूप:</b> सभी अवयव { } के अंदर, कॉमा से अलग। V = {a, e, i, o, u}, E = {2, 4, 6, …}।</p><p><b>1.2.2 समुच्चय-निर्माण रूप:</b> अवयवों का सर्वनिष्ठ गुण लिखते हैं:</p><p class="fx">A = {x : P(x)}</p><p>“:” या “|” को “ऐसा कि” पढ़ते हैं। अध्याय के अंत में उदाहरण 1, 2 और 3 हल करो।</p>')},
 {h:B('1.3 Types of sets','1.3 समुच्चयों के प्रकार'),
  body:B('<ul><li><b>Empty (null) set</b> ∅ or { }: no element. e.g. {x ∈ Q : x² = 2}.</li><li><b>Singleton:</b> exactly one element, e.g. {0}.</li><li><b>Finite:</b> elements can be counted. The count is the cardinality n(A).</li><li><b>Infinite:</b> the count never ends, e.g. N or {x ∈ R : 0 &lt; x &lt; 1}.</li><li><b>Equal sets:</b> A = B when both have exactly the same elements.</li><li><b>Equivalent sets:</b> finite sets with n(A) = n(B); they need not be equal.</li></ul><p><b>Do not confuse:</b> ∅ has 0 elements; {0} has 1 element (0); {∅} also has 1 element (∅).</p><p><b>Extra thought:</b> take R = {x : x ∉ x}. Is R ∈ R? Both “yes” and “no” lead to a contradiction. This is Russell’s paradox, which is why we do not build a set from “any” property, and always work inside a universal set.</p>',
  '<ul><li><b>रिक्त (शून्य) समुच्चय</b> ∅ या { }: कोई अवयव नहीं। जैसे {x ∈ Q : x² = 2}।</li><li><b>एकल समुच्चय:</b> केवल एक अवयव, जैसे {0}।</li><li><b>परिमित:</b> अवयव गिने जा सकते हैं। गिनती को गणनांक n(A) कहते हैं।</li><li><b>अपरिमित:</b> गिनती कभी खत्म नहीं होती, जैसे N या {x ∈ R : 0 &lt; x &lt; 1}।</li><li><b>समान समुच्चय:</b> A = B जब दोनों के अवयव बिल्कुल एक जैसे हों।</li><li><b>समतुल्य समुच्चय:</b> परिमित समुच्चय जिनमें n(A) = n(B); उनका समान होना ज़रूरी नहीं।</li></ul><p><b>भ्रमित मत होना:</b> ∅ में 0 अवयव; {0} में 1 अवयव (0); {∅} में भी 1 अवयव (∅)।</p><p><b>अतिरिक्त विचार:</b> R = {x : x ∉ x} लो। क्या R ∈ R? “हाँ” मानो तो “ना” आता है और उल्टा भी। इसे रसेल का विरोधाभास कहते हैं। इसीलिए “कोई भी” गुण से समुच्चय नहीं बनाते, हम हमेशा एक सार्वत्रिक समुच्चय के अंदर काम करते हैं।</p>')},
 {h:B('1.4 Subsets','1.4 उपसमुच्चय'),
  body:B('<p class="fx">A ⊆ B ⟺ (x ∈ A ⇒ x ∈ B)</p><ul><li>Every set is its own subset: A ⊆ A.</li><li>∅ is a subset of every set (there is no element in ∅ that breaks the condition).</li><li>A ⊆ B and B ⊆ C ⇒ A ⊆ C.</li><li>A = B ⟺ A ⊆ B and B ⊆ A. This is the surest way to prove equality.</li></ul><p><b>Proper subset:</b> A ⊆ B and A ≠ B; then B is a superset of A. (NCERT also writes A ⊂ B for a proper subset.) See Example 4.</p>',
  '<p class="fx">A ⊆ B ⟺ (x ∈ A ⇒ x ∈ B)</p><ul><li>हर समुच्चय अपना उपसमुच्चय है: A ⊆ A।</li><li>∅ हर समुच्चय का उपसमुच्चय है (∅ में कोई ऐसा अवयव ही नहीं जो शर्त तोड़े)।</li><li>A ⊆ B और B ⊆ C ⇒ A ⊆ C।</li><li>A = B ⟺ A ⊆ B और B ⊆ A। समानता सिद्ध करने का सबसे पक्का तरीका।</li></ul><p><b>उचित उपसमुच्चय:</b> A ⊆ B और A ≠ B; तब B, A का अधिसमुच्चय है। (NCERT उचित उपसमुच्चय के लिए भी A ⊂ B लिखता है।) उदाहरण 4 देखो।</p>')},
 {h:B('1.4.1 Counting subsets and the power set','1.4.1 उपसमुच्चयों की गिनती एवं घात समुच्चय'),
  body:B('<p>If n(A) = m, every element has 2 choices: in the subset or not.</p><p class="fx">Subsets = 2ᵐ &nbsp; proper = 2ᵐ − 1 &nbsp; non-empty proper = 2ᵐ − 2 (m ≥ 1)</p><p>Subsets with exactly r elements: C(m, r) = m! / (r!(m − r)!).</p><p><b>Power set:</b> the set of all subsets of A is P(A). For A = {1, 2}: P(A) = {∅, {1}, {2}, {1, 2}} and n(P(A)) = 2ⁿ⁽ᴬ⁾. See Examples 5 and 6.</p>',
  '<p>यदि n(A) = m, तो हर अवयव के पास 2 विकल्प हैं: उपसमुच्चय में जाए या न जाए।</p><p class="fx">उपसमुच्चय = 2ᵐ &nbsp; उचित = 2ᵐ − 1 &nbsp; अरिक्त उचित = 2ᵐ − 2 (m ≥ 1)</p><p>ठीक r अवयवों वाले उपसमुच्चय: C(m, r) = m! / (r!(m − r)!)।</p><p><b>घात समुच्चय:</b> A के सभी उपसमुच्चयों का समुच्चय P(A) है। A = {1, 2} के लिए: P(A) = {∅, {1}, {2}, {1, 2}} और n(P(A)) = 2ⁿ⁽ᴬ⁾। उदाहरण 5 और 6 देखो।</p>'),
  d3:'powercube',cap3:B('The 8 subsets of {1, 2, 3} sit on the 8 corners of a rotating cube.','{1, 2, 3} के 8 उपसमुच्चय घूमते घन के 8 कोनों पर दिखते हैं।')},
 {h:B('1.5 Intervals (subsets of R)','1.5 अंतराल (R के उपसमुच्चय)'),
  body:B('<p>For a &lt; b: (a, b) is open, [a, b] is closed, [a, b) and (a, b] are half-open.</p><p>Empty circle = point not included; filled circle = included. Length = b − a. Next to ∞ always use an open bracket: [2, ∞) = {x : x ≥ 2}, R = (−∞, ∞). See Example 7.</p>',
  '<p>a &lt; b के लिए: (a, b) खुला, [a, b] बंद, [a, b) और (a, b] अर्द्ध-खुले हैं।</p><p>खाली गोला = बिंदु शामिल नहीं; भरा गोला = शामिल। लंबाई = b − a। ∞ के साथ हमेशा खुला कोष्ठक: [2, ∞) = {x : x ≥ 2}, R = (−∞, ∞)। उदाहरण 7 देखो।</p>'),
  d3:'intervals',cap3:B('The interval fills along the number line; the end points turn open or closed.','अंतराल संख्या रेखा पर भरता है; अंत बिंदु खुले या बंद होते हैं।')},
 {h:B('1.6 Universal set and Venn diagrams','1.6 सार्वत्रिक समुच्चय एवं वेन आरेख'),
  body:B('<p>The big set inside which all the discussion happens is the <b>universal set</b> U. In a Venn diagram U is a rectangle and subsets are circles.</p><p class="fx">B ⊂ A ⊂ U</p>',
  '<p>जिस बड़े समुच्चय के अंदर सारी बात हो रही है वह <b>सार्वत्रिक समुच्चय</b> U है। वेन आरेख में U को आयत और उपसमुच्चयों को वृत्तों से दिखाते हैं।</p><p class="fx">B ⊂ A ⊂ U</p>'),
  d3:'venn',cap3:B('Circles appear inside the universal set; the subset B sits inside the bigger circle A.','सार्वत्रिक समुच्चय के अंदर वृत्त आते हैं; उपसमुच्चय B बड़े वृत्त A के अंदर बैठता है।')},
 {h:B('1.7 Operations on sets','1.7 समुच्चयों पर संक्रियाएँ'),
  body:B('<table><tr><th>Operation</th><th>Definition</th><th>In words</th></tr><tr><td>A ∪ B</td><td>{x : x ∈ A or x ∈ B}</td><td>at least one</td></tr><tr><td>A ∩ B</td><td>{x : x ∈ A and x ∈ B}</td><td>both</td></tr><tr><td>A − B</td><td>{x : x ∈ A, x ∉ B}</td><td>only A</td></tr><tr><td>A △ B</td><td>(A − B) ∪ (B − A)</td><td>exactly one</td></tr><tr><td>A′</td><td>U − A</td><td>not in A</td></tr></table><p>If A ∩ B = ∅ then A and B are <b>disjoint</b>. In general A − B ≠ B − A. The three sets A − B, A ∩ B, B − A are mutually disjoint and together make A ∪ B.</p><p><b>Most useful formula:</b></p><p class="fx">A − B = A ∩ B′</p><p>Turn a difference into an intersection, then apply the laws.</p><p><b>Equivalent statements for a subset:</b></p><p class="fx">A ⊆ B ⟺ A ∩ B = A ⟺ A ∪ B = B ⟺ A − B = ∅ ⟺ B′ ⊆ A′</p>',
  '<table><tr><th>संक्रिया</th><th>परिभाषा</th><th>शब्दों में</th></tr><tr><td>A ∪ B</td><td>{x : x ∈ A या x ∈ B}</td><td>कम से कम एक में</td></tr><tr><td>A ∩ B</td><td>{x : x ∈ A और x ∈ B}</td><td>दोनों में</td></tr><tr><td>A − B</td><td>{x : x ∈ A, x ∉ B}</td><td>सिर्फ़ A में</td></tr><tr><td>A △ B</td><td>(A − B) ∪ (B − A)</td><td>ठीक एक में</td></tr><tr><td>A′</td><td>U − A</td><td>A में नहीं</td></tr></table><p>A ∩ B = ∅ हो तो A, B <b>असंयुक्त</b> हैं। आम तौर पर A − B ≠ B − A। तीनों समुच्चय A − B, A ∩ B, B − A आपस में असंयुक्त हैं और मिलकर A ∪ B बनाते हैं।</p><p><b>सबसे काम का सूत्र:</b></p><p class="fx">A − B = A ∩ B′</p><p>अंतर को सर्वनिष्ठ में बदलो, फिर नियम लगाओ।</p><p><b>उपसमुच्चय के बराबर कथन:</b></p><p class="fx">A ⊆ B ⟺ A ∩ B = A ⟺ A ∪ B = B ⟺ A − B = ∅ ⟺ B′ ⊆ A′</p>'),
  d3:'setops',cap3:B('Each operation lights up its region, one by one.','हर संक्रिया का सही क्षेत्र एक-एक करके रंग से भरता है।')},
 {h:B('1.8 Laws of set algebra','1.8 समुच्चय बीजगणित के नियम'),
  body:B('<table><tr><td>Idempotent</td><td>A ∪ A = A, A ∩ A = A</td></tr><tr><td>Identity</td><td>A ∪ ∅ = A, A ∩ U = A</td></tr><tr><td>Domination</td><td>A ∪ U = U, A ∩ ∅ = ∅</td></tr><tr><td>Commutative</td><td>A ∪ B = B ∪ A, A ∩ B = B ∩ A</td></tr><tr><td>Associative</td><td>(A ∪ B) ∪ C = A ∪ (B ∪ C), same for ∩</td></tr><tr><td>Distributive</td><td>A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)<br>A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)</td></tr><tr><td>Complement</td><td>A ∪ A′ = U, A ∩ A′ = ∅, (A′)′ = A, ∅′ = U</td></tr><tr><td>De Morgan</td><td>(A ∪ B)′ = A′ ∩ B′, (A ∩ B)′ = A′ ∪ B′</td></tr><tr><td>Absorption</td><td>A ∪ (A ∩ B) = A, A ∩ (A ∪ B) = A</td></tr></table>',
  '<table><tr><td>अपरिवर्तनीय</td><td>A ∪ A = A, A ∩ A = A</td></tr><tr><td>तत्समक</td><td>A ∪ ∅ = A, A ∩ U = A</td></tr><tr><td>प्रभावी</td><td>A ∪ U = U, A ∩ ∅ = ∅</td></tr><tr><td>क्रम विनिमेय</td><td>A ∪ B = B ∪ A, A ∩ B = B ∩ A</td></tr><tr><td>साहचर्य</td><td>(A ∪ B) ∪ C = A ∪ (B ∪ C), ∩ के लिए भी</td></tr><tr><td>वितरण</td><td>A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)<br>A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)</td></tr><tr><td>पूरक</td><td>A ∪ A′ = U, A ∩ A′ = ∅, (A′)′ = A, ∅′ = U</td></tr><tr><td>डी मॉर्गन</td><td>(A ∪ B)′ = A′ ∩ B′, (A ∩ B)′ = A′ ∪ B′</td></tr><tr><td>अवशोषण</td><td>A ∪ (A ∩ B) = A, A ∩ (A ∪ B) = A</td></tr></table>')},
 {h:B('1.8.1 How to write a proof (element method)','1.8.1 प्रमाण कैसे लिखें (अवयव विधि)'),
  body:B('<p>Take an element x and move step by step with “⟺”. If every step works both ways, the two sets are equal. For ⊆ proofs, show x ∈ LHS ⇒ x ∈ RHS and then the reverse. Study Examples 8, 9, 10 and 11.</p><p><b>Symmetric difference:</b> A △ B = (A ∪ B) − (A ∩ B). It is commutative and associative, A △ ∅ = A and A △ A = ∅. So cancellation works: A △ C = B △ C ⇒ A = B. Cancellation does <b>not</b> work for union or intersection.</p>',
  '<p>एक अवयव x लो और “⟺” के साथ कदम-दर-कदम चलो। यदि हर कदम दोनों तरफ़ चलता है तो दोनों समुच्चय समान हैं। ⊆ के प्रमाण में x ∈ बायाँ ⇒ x ∈ दायाँ दिखाओ, फिर उल्टा। उदाहरण 8, 9, 10 और 11 पढ़ो।</p><p><b>सममित अंतर:</b> A △ B = (A ∪ B) − (A ∩ B)। यह क्रम-विनिमेय और साहचर्य है, A △ ∅ = A और A △ A = ∅। इसलिए कैंसिलेशन चलता है: A △ C = B △ C ⇒ A = B। संघ या सर्वनिष्ठ में कैंसिलेशन <b>नहीं</b> चलता।</p>')},
 {h:B('1.9 Cardinality and inclusion–exclusion','1.9 गणनांक एवं समावेशन–अपवर्जन'),
  body:B('<p>For finite sets:</p><p class="fx">n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</p><p>because n(A) + n(B) counts the middle part twice.</p><p class="fx">n(A − B) = n(A) − n(A ∩ B)<br>n(A △ B) = n(A) + n(B) − 2n(A ∩ B)<br>n(A′ ∩ B′) = n(U) − n(A ∪ B)</p>',
  '<p>परिमित समुच्चयों के लिए:</p><p class="fx">n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</p><p>क्योंकि n(A) + n(B) में बीच का हिस्सा दो बार गिना गया।</p><p class="fx">n(A − B) = n(A) − n(A ∩ B)<br>n(A △ B) = n(A) + n(B) − 2n(A ∩ B)<br>n(A′ ∩ B′) = n(U) − n(A ∪ B)</p>')},
 {h:B('1.9.1 Three sets','1.9.1 तीन समुच्चय'),
  body:B('<p class="fx">n(A ∪ B ∪ C) = S₁ − S₂ + S₃</p><p>S₁ = Σ n(A), S₂ = Σ n(A ∩ B), S₃ = n(A ∩ B ∩ C).</p><p><b>“Exactly” formulas</b> (regions a, b, c are the single-set parts, d, e, f the two-set parts, g the centre):</p><ul><li>Exactly one set: S₁ − 2S₂ + 3S₃ (a + b + c)</li><li>Exactly two sets: S₂ − 3S₃ (d + e + f)</li><li>At least two sets: S₂ − 2S₃</li><li>Only A: n(A) − n(A ∩ B) − n(A ∩ C) + S₃</li></ul><p>See Example 13.</p>',
  '<p class="fx">n(A ∪ B ∪ C) = S₁ − S₂ + S₃</p><p>S₁ = Σ n(A), S₂ = Σ n(A ∩ B), S₃ = n(A ∩ B ∩ C)।</p><p><b>“ठीक” वाले सूत्र</b> (क्षेत्र a, b, c अकेले समुच्चय के हिस्से हैं, d, e, f दो वाले, g बीच का):</p><ul><li>ठीक एक समुच्चय में: S₁ − 2S₂ + 3S₃ (a + b + c)</li><li>ठीक दो में: S₂ − 3S₃ (d + e + f)</li><li>कम से कम दो में: S₂ − 2S₃</li><li>सिर्फ़ A: n(A) − n(A ∩ B) − n(A ∩ C) + S₃</li></ul><p>उदाहरण 13 देखो।</p>'),
  d3:'threesets',cap3:B('Three circles overlap and the seven regions light up one by one.','तीन वृत्त एक-दूसरे को काटते हैं और सातों क्षेत्र एक-एक करके चमकते हैं।')},
 {h:B('1.9.2 Picture of a survey (Example 12)','1.9.2 सर्वे की तस्वीर (उदाहरण 12)'),
  body:B('<p>Of 400 students, 100 drink apple juice (A), 150 drink orange juice (O), and 75 drink both. Then only A = 25, both = 75, only O = 75, and the rest, 400 − 175 = 225, drink neither.</p>',
  '<p>400 विद्यार्थियों में से 100 सेब का जूस (A), 150 संतरे का जूस (O) और 75 दोनों पीते हैं। तब सिर्फ़ A = 25, दोनों = 75, सिर्फ़ O = 75, और बाकी 400 − 175 = 225 कोई नहीं पीते।</p>'),
  d3:'juice',cap3:B('400 dots move into their own regions and the count of each region appears.','400 बिंदु अपने-अपने क्षेत्र में जाते हैं और हर क्षेत्र की गिनती दिखती है।')},
 {h:B('1.9.3 Maximum and minimum (JEE favourite)','1.9.3 अधिकतम एवं न्यूनतम (JEE का पसंदीदा)'),
  body:B('<p class="fx">max{0, n(A) + n(B) − n(U)} ≤ n(A ∩ B) ≤ min{n(A), n(B)}<br>max{n(A), n(B)} ≤ n(A ∪ B) ≤ min{n(A) + n(B), n(U)}</p><p><b>Trick:</b> take complements. See Examples 14 and 15.</p>',
  '<p class="fx">max{0, n(A) + n(B) − n(U)} ≤ n(A ∩ B) ≤ min{n(A), n(B)}<br>max{n(A), n(B)} ≤ n(A ∪ B) ≤ min{n(A) + n(B), n(U)}</p><p><b>ट्रिक:</b> पूरक लो। उदाहरण 14 और 15 देखो।</p>')},
 {h:B('1.10 Advanced counting (JEE Advanced)','1.10 उन्नत गिनती (JEE Advanced)'),
  body:B('<p><b>1.10.1 Element-wise choice method.</b> For two subsets A, B of an n-element set, each element has 4 places: in both, only A, only B, in neither. Remove the places that the condition forbids.</p><table><tr><th>Condition (ordered pair A, B)</th><th>Count</th></tr><tr><td>No condition</td><td>4ⁿ</td></tr><tr><td>A ∩ B = ∅</td><td>3ⁿ</td></tr><tr><td>A ⊆ B</td><td>3ⁿ</td></tr><tr><td>A ∪ B = U</td><td>3ⁿ</td></tr><tr><td>A = B′</td><td>2ⁿ</td></tr><tr><td>n(A ∩ B) = r</td><td>C(n, r)·3ⁿ⁻ʳ</td></tr></table><p><b>1.10.2 Double counting:</b> count the same thing in two ways (Example 19).</p><p><b>1.10.3 Sets and number theory:</b> if Nₐ = {an : n ∈ N} then Nₐ ∩ N_b = N_lcm(a, b) (Example 20).</p><p>See Examples 16, 17 and 18.</p>',
  '<p><b>1.10.1 अवयव-वार विकल्प विधि।</b> n अवयवों वाले समुच्चय के दो उपसमुच्चय A, B के लिए हर अवयव के पास 4 जगहें हैं: दोनों में, सिर्फ़ A, सिर्फ़ B, किसी में नहीं। जो जगहें शर्त रोकती है उन्हें हटा दो।</p><table><tr><th>शर्त (क्रमित युग्म A, B)</th><th>गिनती</th></tr><tr><td>कोई शर्त नहीं</td><td>4ⁿ</td></tr><tr><td>A ∩ B = ∅</td><td>3ⁿ</td></tr><tr><td>A ⊆ B</td><td>3ⁿ</td></tr><tr><td>A ∪ B = U</td><td>3ⁿ</td></tr><tr><td>A = B′</td><td>2ⁿ</td></tr><tr><td>n(A ∩ B) = r</td><td>C(n, r)·3ⁿ⁻ʳ</td></tr></table><p><b>1.10.2 दोहरी गिनती:</b> एक ही चीज़ को दो तरह से गिनो (उदाहरण 19)।</p><p><b>1.10.3 समुच्चय और संख्या सिद्धांत:</b> यदि Nₐ = {an : n ∈ N} तो Nₐ ∩ N_b = N_lcm(a, b) (उदाहरण 20)।</p><p>उदाहरण 16, 17 और 18 देखो।</p>'),
  d3:'fourchoice',cap3:B('One element x visits all four regions in turn: only A, both, only B, neither.','एक अवयव x बारी-बारी से चारों क्षेत्रों में जाता है: सिर्फ़ A, दोनों, सिर्फ़ B, कोई नहीं।')},
 {h:B('1.11 Common mistakes','1.11 आम गलतियाँ'),
  body:B('<ol><li>∈ is for an element, ⊂ is for a set.</li><li>∅ ≠ {∅} ≠ {0}.</li><li>Count repeated elements once.</li><li>A ∪ C = B ∪ C does not give A = B.</li><li>In De Morgan’s law, taking the complement swaps ∪ and ∩.</li><li>“Only A” and “A” are different.</li><li>Do not write n(A ∪ B) = n(A) + n(B) without checking that A ∩ B = ∅.</li></ol>',
  '<ol><li>∈ अवयव के लिए है, ⊂ समुच्चय के लिए।</li><li>∅ ≠ {∅} ≠ {0}।</li><li>दोहराए गए अवयव को एक बार गिनो।</li><li>A ∪ C = B ∪ C से A = B नहीं निकलता।</li><li>डी मॉर्गन में पूरक लगाने पर ∪ ↔ ∩ बदल जाता है।</li><li>“सिर्फ़ A” और “A” अलग हैं।</li><li>A ∩ B = ∅ जाँचे बिना n(A ∪ B) = n(A) + n(B) मत लिखो।</li></ol>')},
 {h:B('1.12 Practice exercise','1.12 अभ्यास प्रश्न'),
  body:B('<h3>A. Single correct</h3><ol><li>Proper subsets of a 5-element set: (a) 32 (b) 31 (c) 30 (d) 25</li><li>Subsets of A = {x ∈ Z : x² ≤ 4}: (a) 4 (b) 8 (c) 16 (d) 32</li><li>n(A) = 3, n(B) = 6. Minimum of n(A ∪ B): (a) 3 (b) 6 (c) 9 (d) 18</li><li>A = {x : x² − 5x + 6 = 0}, B = {2, 4}. A − B = (a) {2} (b) {3} (c) {4} (d) ∅</li><li>n(P(P(∅))) = (a) 0 (b) 1 (c) 2 (d) 4</li><li>(A ∪ B)′ ∪ (A′ ∩ B) = (a) A′ (b) B′ (c) A (d) U</li><li>63% like cheese, 76% like apple; both x%. Correct range: (a) [13, 63] (b) [39, 63] (c) [39, 76] (d) [63, 76]</li><li>A − (A − B) = (a) B (b) A ∪ B (c) A ∩ B (d) ∅</li><li>N₃ ∩ N₄ = (a) N₇ (b) N₁₂ (c) N₁ (d) N₄</li><li>Sets with m and n elements differ by 112 in the number of subsets. (m, n) = (a) (7, 4) (b) (7, 3) (c) (6, 4) (d) (8, 4)</li></ol><h3>B. One or more correct</h3><ol start="11"><li>Always true: (a) A − B = A ∩ B′ (b) A − B = A − (A ∩ B) (c) A − B = (A ∪ B) − B (d) A − B = B − A</li><li>A = {∅, {∅}, 1}: (a) ∅ ∈ A (b) ∅ ⊂ A (c) {∅} ∈ A (d) {{∅}} ⊂ A</li><li>What makes A = B certain? (a) A ∪ C = B ∪ C (b) A ∩ C = B ∩ C (c) both (a) and (b) together (d) A △ C = B △ C</li><li>n(U) = 100, n(A) = 60, n(B) = 50: (a) min n(A ∩ B) = 10 (b) max n(A ∩ B) = 50 (c) max n(A′ ∩ B′) = 40 (d) min n(A ∪ B) = 50</li></ol><h3>C. Integer type</h3><ol start="15"><li>Subsets of {1, …, 6} that contain 1 but not 2?</li><li>How many numbers from 1 to 1000 are divisible by none of 2, 3, 5?</li><li>n(A ∪ B) = 50, n(A) = 28, n(B) = 32. n(A ∩ B)?</li><li>n(A) = 12, n(B) = 15, n(A ∩ B) = 7. n(A △ B)?</li><li>Ordered subset pairs (A, B) of {1, 2, 3} with A ⊆ B?</li><li>How many X satisfy X ∪ {1, 2} = {1, 2, 3, 4, 5}?</li></ol><h3>D. Subjective</h3><ol start="21"><li>Prove: A ⊆ B ⟺ B′ ⊆ A′.</li><li>A ∩ X = B ∩ X = ∅ and A ∪ X = B ∪ X. Prove A = B.</li><li>Prove: {6ⁿ − 5n − 1 : n ∈ N} ⊂ {25m : m ∈ Z}.</li><li>10000 families: newspaper A 40%, B 20%, C 10%; A&amp;B 5%, B&amp;C 3%, A&amp;C 4%, all three 2%. How many families read (i) only A (ii) only B (iii) none?</li></ol>',
  '<h3>A. एकल सही</h3><ol><li>5 अवयवों वाले समुच्चय के उचित उपसमुच्चय: (a) 32 (b) 31 (c) 30 (d) 25</li><li>A = {x ∈ Z : x² ≤ 4} के उपसमुच्चय: (a) 4 (b) 8 (c) 16 (d) 32</li><li>n(A) = 3, n(B) = 6. n(A ∪ B) का न्यूनतम: (a) 3 (b) 6 (c) 9 (d) 18</li><li>A = {x : x² − 5x + 6 = 0}, B = {2, 4}. A − B = (a) {2} (b) {3} (c) {4} (d) ∅</li><li>n(P(P(∅))) = (a) 0 (b) 1 (c) 2 (d) 4</li><li>(A ∪ B)′ ∪ (A′ ∩ B) = (a) A′ (b) B′ (c) A (d) U</li><li>63% को चीज़, 76% को सेब पसंद; दोनों x%। सही सीमा: (a) [13, 63] (b) [39, 63] (c) [39, 76] (d) [63, 76]</li><li>A − (A − B) = (a) B (b) A ∪ B (c) A ∩ B (d) ∅</li><li>N₃ ∩ N₄ = (a) N₇ (b) N₁₂ (c) N₁ (d) N₄</li><li>m, n अवयवों वाले समुच्चयों में उपसमुच्चयों की संख्या का अंतर 112। (m, n) = (a) (7, 4) (b) (7, 3) (c) (6, 4) (d) (8, 4)</li></ol><h3>B. एक या अधिक सही</h3><ol start="11"><li>हमेशा सही: (a) A − B = A ∩ B′ (b) A − B = A − (A ∩ B) (c) A − B = (A ∪ B) − B (d) A − B = B − A</li><li>A = {∅, {∅}, 1}: (a) ∅ ∈ A (b) ∅ ⊂ A (c) {∅} ∈ A (d) {{∅}} ⊂ A</li><li>किससे A = B पक्का होता है? (a) A ∪ C = B ∪ C (b) A ∩ C = B ∩ C (c) (a) और (b) दोनों साथ (d) A △ C = B △ C</li><li>n(U) = 100, n(A) = 60, n(B) = 50: (a) न्यूनतम n(A ∩ B) = 10 (b) अधिकतम n(A ∩ B) = 50 (c) अधिकतम n(A′ ∩ B′) = 40 (d) न्यूनतम n(A ∪ B) = 50</li></ol><h3>C. पूर्णांक प्रकार</h3><ol start="15"><li>{1, …, 6} के कितने उपसमुच्चयों में 1 हो पर 2 न हो?</li><li>1 से 1000 तक कितनी संख्याएँ 2, 3, 5 में से किसी से भी विभाज्य नहीं?</li><li>n(A ∪ B) = 50, n(A) = 28, n(B) = 32. n(A ∩ B)?</li><li>n(A) = 12, n(B) = 15, n(A ∩ B) = 7. n(A △ B)?</li><li>{1, 2, 3} के क्रमित उपसमुच्चय युग्म (A, B) जिनमें A ⊆ B?</li><li>कितने X हैं जिनके लिए X ∪ {1, 2} = {1, 2, 3, 4, 5}?</li></ol><h3>D. विषयनिष्ठ</h3><ol start="21"><li>सिद्ध करो: A ⊆ B ⟺ B′ ⊆ A′।</li><li>A ∩ X = B ∩ X = ∅ और A ∪ X = B ∪ X। सिद्ध करो A = B।</li><li>सिद्ध करो: {6ⁿ − 5n − 1 : n ∈ N} ⊂ {25m : m ∈ Z}।</li><li>10000 परिवार: अखबार A 40%, B 20%, C 10%; A&amp;B 5%, B&amp;C 3%, A&amp;C 4%, तीनों 2%। कितने परिवार (i) सिर्फ़ A (ii) सिर्फ़ B (iii) कोई नहीं पढ़ते?</li></ol>')},
 {h:B('1.13 Answers and solutions','1.13 उत्तर एवं हल'),
  body:B('<ol><li>(b) 2⁵ − 1.</li><li>(d) A = {−2, −1, 0, 1, 2}, 2⁵ = 32.</li><li>(b) when A ⊆ B.</li><li>(b) A = {2, 3}.</li><li>(c) P(∅) = {∅}.</li><li>(a) (A′ ∩ B′) ∪ (A′ ∩ B) = A′ ∩ (B′ ∪ B) = A′.</li><li>(b) 63 + 76 − 100 = 39.</li><li>(c) A ∩ (A ∩ B′)′ = A ∩ (A′ ∪ B) = A ∩ B.</li><li>(b) lcm.</li><li>(a) 128 − 16 = 112.</li><li>(a, b, c)</li><li>(a, b, c, d)</li><li>(c, d). For (c): take x ∈ A. If x ∈ C, then x ∈ A ∩ C = B ∩ C. If x ∉ C, then x ∈ A ∪ C = B ∪ C gives x ∈ B.</li><li>(a, b, c). Note min n(A ∪ B) = 60.</li><li>16: the other 4 elements, 2⁴.</li><li>266: 1000 − (500 + 333 + 200) + (166 + 100 + 66) − 33.</li><li>10: 28 + 32 − 50.</li><li>13: 12 + 15 − 14.</li><li>27: 3³.</li><li>4: 3, 4, 5 are needed; 1, 2 are free.</li><li>If A ⊆ B and x ∈ B′, then x ∉ B, so x ∉ A, i.e. x ∈ A′. For the converse apply the same result to B′ ⊆ A′ and use (A′)′ = A.</li><li>A = A ∩ (A ∪ X) = A ∩ (B ∪ X) = (A ∩ B) ∪ (A ∩ X) = A ∩ B. Similarly B = A ∩ B.</li><li>(1 + 5)ⁿ = 1 + 5n + 25[C(n,2) + 5C(n,3) + …]. So it is a subset; and a multiple like 50 never appears (values 0, 25, 200, …), so it is proper.</li><li>Only A = 40 − 5 − 4 + 2 = 33% → 3300; only B = 20 − 5 − 3 + 2 = 14% → 1400; union = 70 − 12 + 2 = 60%, so none = 4000.</li></ol>',
  '<ol><li>(b) 2⁵ − 1।</li><li>(d) A = {−2, −1, 0, 1, 2}, 2⁵ = 32।</li><li>(b) जब A ⊆ B।</li><li>(b) A = {2, 3}।</li><li>(c) P(∅) = {∅}।</li><li>(a) (A′ ∩ B′) ∪ (A′ ∩ B) = A′ ∩ (B′ ∪ B) = A′।</li><li>(b) 63 + 76 − 100 = 39।</li><li>(c) A ∩ (A ∩ B′)′ = A ∩ (A′ ∪ B) = A ∩ B।</li><li>(b) ल.स.।</li><li>(a) 128 − 16 = 112।</li><li>(a, b, c)</li><li>(a, b, c, d)</li><li>(c, d)। (c) के लिए: x ∈ A लो। यदि x ∈ C तो x ∈ A ∩ C = B ∩ C। यदि x ∉ C तो x ∈ A ∪ C = B ∪ C से x ∈ B।</li><li>(a, b, c)। ध्यान दो: न्यूनतम n(A ∪ B) = 60।</li><li>16: बाकी 4 अवयव, 2⁴।</li><li>266: 1000 − (500 + 333 + 200) + (166 + 100 + 66) − 33।</li><li>10: 28 + 32 − 50।</li><li>13: 12 + 15 − 14।</li><li>27: 3³।</li><li>4: 3, 4, 5 ज़रूरी हैं; 1, 2 स्वतंत्र।</li><li>यदि A ⊆ B और x ∈ B′, तो x ∉ B, इसलिए x ∉ A, यानी x ∈ A′। उलटा: यही परिणाम B′ ⊆ A′ पर लगाओ और (A′)′ = A प्रयोग करो।</li><li>A = A ∩ (A ∪ X) = A ∩ (B ∪ X) = (A ∩ B) ∪ (A ∩ X) = A ∩ B। इसी तरह B = A ∩ B।</li><li>(1 + 5)ⁿ = 1 + 5n + 25[C(n,2) + 5C(n,3) + …]। अतः उपसमुच्चय है; और 50 जैसा गुणज कभी नहीं मिलता (मान 0, 25, 200, …), इसलिए उचित है।</li><li>सिर्फ़ A = 40 − 5 − 4 + 2 = 33% → 3300; सिर्फ़ B = 20 − 5 − 3 + 2 = 14% → 1400; संघ = 70 − 12 + 2 = 60%, अतः कोई नहीं = 4000।</li></ol>')}
 ],
 formulas:[
  [B('Number of subsets','उपसमुच्चयों की संख्या'),'2<sup>m</sup>; proper 2<sup>m</sup> − 1; with r elements C(m, r)'],
  [B('Difference','अंतर'),'A − B = A ∩ B′'],
  [B('De Morgan','डी मॉर्गन'),'(A ∪ B)′ = A′ ∩ B′, (A ∩ B)′ = A′ ∪ B′'],
  [B('Union of two sets','दो समुच्चयों का संघ'),'n(A ∪ B) = n(A) + n(B) − n(A ∩ B)'],
  [B('Symmetric difference','सममित अंतर'),'n(A △ B) = n(A) + n(B) − 2n(A ∩ B)'],
  [B('Union of three sets','तीन समुच्चयों का संघ'),'n(A ∪ B ∪ C) = S<sub>1</sub> − S<sub>2</sub> + S<sub>3</sub>'],
  [B('Exactly one / exactly two','ठीक एक / ठीक दो'),'S<sub>1</sub> − 2S<sub>2</sub> + 3S<sub>3</sub>; S<sub>2</sub> − 3S<sub>3</sub>'],
  [B('Disjoint or A ⊆ B (ordered pairs)','असंयुक्त या A ⊆ B (क्रमित युग्म)'),'3<sup>n</sup>']
 ],
 examples:[
  {lv:'fnd',q:B('Write {x : x ∈ N, x² &lt; 40} in roster form.','{x : x ∈ N, x² &lt; 40} को रोस्टर रूप में लिखो।'),
   a:B('6² = 36 &lt; 40 and 7² = 49 &gt; 40. Answer: <b>{1, 2, 3, 4, 5, 6}</b>.','6² = 36 &lt; 40 और 7² = 49 &gt; 40। उत्तर: <b>{1, 2, 3, 4, 5, 6}</b>।')},
  {lv:'fnd',q:B('Write {1/2, 2/3, 3/4, 4/5, 5/6, 6/7} in set-builder form.','{1/2, 2/3, 3/4, 4/5, 5/6, 6/7} को समुच्चय-निर्माण रूप में लिखो।'),
   a:B('Each denominator is 1 more than the numerator: <b>{x : x = n/(n + 1), n ∈ N, n ≤ 6}</b>.','हर में अंश से 1 अधिक है: <b>{x : x = n/(n + 1), n ∈ N, n ≤ 6}</b>।')},
  {lv:'main',q:B('The squares trap: how many elements are in A = {x² : x ∈ Z, |x| ≤ 3}?','वर्ग का जाल: A = {x² : x ∈ Z, |x| ≤ 3} में कितने अवयव हैं?'),
   a:B('x = −3, …, 3 gives squares 9, 4, 1, 0, 1, 4, 9. Remove repeats: A = {0, 1, 4, 9}, so <b>4 elements</b>, not 7.','x = −3, …, 3 से वर्ग 9, 4, 1, 0, 1, 4, 9। दोहराव हटाओ: A = {0, 1, 4, 9}, यानी <b>4 अवयव</b>, 7 नहीं।')},
  {lv:'main',q:B('A = {1, {2}, 3}. True or false: {2} ∈ A, {2} ⊂ A, {{2}} ⊂ A, 2 ∈ A.','A = {1, {2}, 3}। सही/गलत बताओ: {2} ∈ A, {2} ⊂ A, {{2}} ⊂ A, 2 ∈ A।'),
   a:B('A has 3 elements: 1, {2}, 3. So {2} ∈ A is <b>true</b>; {2} ⊂ A is <b>false</b> (2 is not an element); {{2}} ⊂ A is <b>true</b>; 2 ∈ A is <b>false</b>.','A के 3 अवयव हैं: 1, {2}, 3। अतः {2} ∈ A <b>सही</b>; {2} ⊂ A <b>गलत</b> (2 अवयव नहीं है); {{2}} ⊂ A <b>सही</b>; 2 ∈ A <b>गलत</b>।')},
  {lv:'fnd',q:B('Find n(P(P(P(∅)))).','n(P(P(P(∅)))) ज्ञात करो।'),
   a:B('n(∅) = 0. n(P(∅)) = 1, n(P(P(∅))) = 2, n(P(P(P(∅)))) = 2² = <b>4</b>.','n(∅) = 0। n(P(∅)) = 1, n(P(P(∅))) = 2, n(P(P(P(∅)))) = 2² = <b>4</b>।')},
  {lv:'main',q:B('Two sets have m and n elements. The first has 56 more subsets than the second. Find m, n.','दो समुच्चयों में m और n अवयव हैं। पहले के उपसमुच्चय दूसरे से 56 अधिक हैं। m, n ज्ञात करो।'),
   a:B('2ⁿ(2<sup>m−n</sup> − 1) = 56 = 8 × 7. 2<sup>m−n</sup> − 1 is odd, so 2ⁿ = 8 and 2<sup>m−n</sup> = 8: <b>n = 3, m = 6</b>.','2ⁿ(2<sup>m−n</sup> − 1) = 56 = 8 × 7। 2<sup>m−n</sup> − 1 विषम है, अतः 2ⁿ = 8 और 2<sup>m−n</sup> = 8: <b>n = 3, m = 6</b>।')},
  {lv:'fnd',q:B('A = [−3, 5), B = (0, 7]. Find A ∪ B, A ∩ B, A − B, B − A.','A = [−3, 5), B = (0, 7]। A ∪ B, A ∩ B, A − B, B − A ज्ञात करो।'),
   a:B('Draw both on a number line: A ∪ B = <b>[−3, 7]</b>, A ∩ B = <b>(0, 5)</b>, A − B = <b>[−3, 0]</b>, B − A = <b>[5, 7]</b>. Note: the bracket of a removed point flips.','दोनों को संख्या रेखा पर बनाओ: A ∪ B = <b>[−3, 7]</b>, A ∩ B = <b>(0, 5)</b>, A − B = <b>[−3, 0]</b>, B − A = <b>[5, 7]</b>। ध्यान दो: जो बिंदु हटाया जाता है उसका कोष्ठक उल्टा हो जाता है।')},
  {lv:'main',q:B('Prove: (A ∪ B)′ = A′ ∩ B′.','सिद्ध करो: (A ∪ B)′ = A′ ∩ B′।'),
   a:B('x ∈ (A ∪ B)′ ⟺ x ∉ A ∪ B ⟺ x ∉ A and x ∉ B ⟺ x ∈ A′ and x ∈ B′ ⟺ x ∈ A′ ∩ B′. Every step works both ways, so the sets are equal.','x ∈ (A ∪ B)′ ⟺ x ∉ A ∪ B ⟺ x ∉ A और x ∉ B ⟺ x ∈ A′ और x ∈ B′ ⟺ x ∈ A′ ∩ B′। हर कदम दोनों तरफ़ चलता है, इसलिए समुच्चय समान हैं।')},
  {lv:'main',q:B('Prove: A − (B ∪ C) = (A − B) ∩ (A − C).','सिद्ध करो: A − (B ∪ C) = (A − B) ∩ (A − C)।'),
   a:B('LHS = A ∩ (B ∪ C)′ = A ∩ B′ ∩ C′ = (A ∩ B′) ∩ (A ∩ C′) = RHS. (We used A = A ∩ A.)','बायाँ पक्ष = A ∩ (B ∪ C)′ = A ∩ B′ ∩ C′ = (A ∩ B′) ∩ (A ∩ C′) = दायाँ पक्ष। (A = A ∩ A प्रयोग किया।)')},
  {lv:'main',q:B('If A ∪ B = A ∩ B, prove A = B.','यदि A ∪ B = A ∩ B, तो सिद्ध करो A = B।'),
   a:B('A ⊆ A ∪ B = A ∩ B ⊆ B. In the same way B ⊆ A. So <b>A = B</b>.','A ⊆ A ∪ B = A ∩ B ⊆ B। इसी तरह B ⊆ A। अतः <b>A = B</b>।')},
  {lv:'adv',q:B('Prove P(A ∩ B) = P(A) ∩ P(B). Is it true for union as well?','सिद्ध करो P(A ∩ B) = P(A) ∩ P(B)। क्या संघ के लिए भी सही है?'),
   a:B('X ∈ P(A ∩ B) ⟺ X ⊆ A and X ⊆ B ⟺ X ∈ P(A) ∩ P(B). For union only P(A) ∪ P(B) ⊆ P(A ∪ B) holds. Counter-example: A = {1}, B = {2}; {1, 2} ∈ P(A ∪ B) but not in P(A) ∪ P(B).','X ∈ P(A ∩ B) ⟺ X ⊆ A और X ⊆ B ⟺ X ∈ P(A) ∩ P(B)। संघ के लिए केवल P(A) ∪ P(B) ⊆ P(A ∪ B) सही है। प्रति-उदाहरण: A = {1}, B = {2}; {1, 2} ∈ P(A ∪ B) पर P(A) ∪ P(B) में नहीं।')},
  {lv:'fnd',q:B('400 students: 100 drink apple juice, 150 orange juice, 75 both. How many drink neither?','400 विद्यार्थी: 100 सेब का जूस, 150 संतरे का जूस, 75 दोनों पीते हैं। कितने कोई नहीं पीते?'),
   a:B('n(A ∪ O) = 100 + 150 − 75 = 175. Neither = 400 − 175 = <b>225</b>.','n(A ∪ O) = 100 + 150 − 75 = 175। कोई नहीं = 400 − 175 = <b>225</b>।')},
  {lv:'main',q:B('100 students: Maths 40, Physics 35, Chemistry 30; M&amp;P 15, P&amp;C 12, M&amp;C 10; all three 5. Find (i) none (ii) exactly one (iii) exactly two.','100 विद्यार्थी: गणित 40, भौतिकी 35, रसायन 30; M&amp;P 15, P&amp;C 12, M&amp;C 10; तीनों 5। (i) कोई नहीं (ii) ठीक एक (iii) ठीक दो ज्ञात करो।'),
   a:B('S₁ = 105, S₂ = 37, S₃ = 5. Union = 105 − 37 + 5 = 73. (i) <b>27</b> (ii) 105 − 74 + 15 = <b>46</b> (iii) 37 − 15 = <b>22</b>. Check: 46 + 22 + 5 = 73.','S₁ = 105, S₂ = 37, S₃ = 5। संघ = 105 − 37 + 5 = 73। (i) <b>27</b> (ii) 105 − 74 + 15 = <b>46</b> (iii) 37 − 15 = <b>22</b>। जाँच: 46 + 22 + 5 = 73।')},
  {lv:'main',q:B('70% like coffee and 60% like tea. Find the range of x%, those who like both.','70% को कॉफ़ी और 60% को चाय पसंद है। दोनों पसंद करने वाले x% की सीमा ज्ञात करो।'),
   a:B('x ≥ 70 + 60 − 100 = 30 and x ≤ 60. So <b>30 ≤ x ≤ 60</b>.','x ≥ 70 + 60 − 100 = 30 और x ≤ 60। अतः <b>30 ≤ x ≤ 60</b>।')},
  {lv:'adv',q:B('In a test 70% passed Physics, 75% Chemistry, 80% Maths, 85% English. Find the least % who passed all four.','एक परीक्षा में 70% भौतिकी, 75% रसायन, 80% गणित, 85% अंग्रेज़ी में पास हुए। चारों में पास होने वालों का न्यूनतम % ज्ञात करो।'),
   a:B('Fail: 30, 25, 20, 15. At most 90% fail in at least one. So pass in all four ≥ <b>10%</b>. Trick: take the complement.','फ़ेल: 30, 25, 20, 15। किसी एक में भी फ़ेल अधिकतम 90%। अतः चारों में पास ≥ <b>10%</b>। ट्रिक: पूरक लो।')},
  {lv:'main',q:B('How many unordered pairs {A, B} of disjoint subsets of {1, 2, 3, 4} are there (A = B allowed)?','{1, 2, 3, 4} के असंयुक्त उपसमुच्चयों के कितने अक्रमित युग्म {A, B} हैं (A = B भी मान्य)?'),
   a:B('Ordered pairs: 3⁴ = 81. A = B and disjoint only for (∅, ∅). Unordered = (81 − 1)/2 + 1 = <b>41</b>.','क्रमित युग्म: 3⁴ = 81। A = B और असंयुक्त केवल (∅, ∅) में। अक्रमित = (81 − 1)/2 + 1 = <b>41</b>।')},
  {lv:'fnd',q:B('How many subsets of {1, …, 10} have at least one odd number?','{1, …, 10} के कितने उपसमुच्चयों में कम से कम एक विषम संख्या है?'),
   a:B('Total − (only even ones) = 2¹⁰ − 2⁵ = <b>992</b>.','कुल − (सिर्फ़ सम वाले) = 2¹⁰ − 2⁵ = <b>992</b>।')},
  {lv:'fnd',q:B('How many sets X satisfy {1, 2} ⊆ X ⊆ {1, 2, 3, 4, 5}?','कितने समुच्चय X हैं जिनके लिए {1, 2} ⊆ X ⊆ {1, 2, 3, 4, 5}?'),
   a:B('1 and 2 are fixed; 3, 4, 5 each have 2 choices: 2³ = <b>8</b>.','1, 2 निश्चित हैं; 3, 4, 5 के पास 2-2 विकल्प: 2³ = <b>8</b>।')},
  {lv:'adv',q:B('A₁, …, A₃₀ each have 5 elements and B₁, …, Bₙ each have 3. ∪Aᵢ = ∪Bⱼ = S, and every element of S lies in exactly 10 of the Aᵢ and 9 of the Bⱼ. Find n.','A₁, …, A₃₀ में हर एक के 5 अवयव और B₁, …, Bₙ में हर एक के 3 हैं। ∪Aᵢ = ∪Bⱼ = S और S का हर अवयव ठीक 10 Aᵢ में और 9 Bⱼ में है। n ज्ञात करो।'),
   a:B('Count in two ways: 30 × 5 = 10 · n(S) ⇒ n(S) = 15. Then 3n = 9 × 15 ⇒ <b>n = 45</b>.','दो तरह से गिनो: 30 × 5 = 10 · n(S) ⇒ n(S) = 15। फिर 3n = 9 × 15 ⇒ <b>n = 45</b>।')},
  {lv:'adv',q:B('X = {4ⁿ − 3n − 1 : n ∈ N}, Y = {9(n − 1) : n ∈ N}. Find the relation between X and Y.','X = {4ⁿ − 3n − 1 : n ∈ N}, Y = {9(n − 1) : n ∈ N}। X और Y का संबंध ज्ञात करो।'),
   a:B('4ⁿ = (1 + 3)ⁿ = 1 + 3n + 9[C(n,2) + 3C(n,3) + …]. So every element of X is a non-negative multiple of 9: X ⊆ Y. X = {0, 9, 54, …} does not contain 18, so <b>X ⊂ Y (proper)</b>.','4ⁿ = (1 + 3)ⁿ = 1 + 3n + 9[C(n,2) + 3C(n,3) + …]। अतः X का हर अवयव 9 का अऋणात्मक गुणज है: X ⊆ Y। X = {0, 9, 54, …} में 18 नहीं है, इसलिए <b>X ⊂ Y (उचित)</b>।')}
 ],
 rev:{en:['∈ is for an element, ⊂ is for a set.','∅ ≠ {∅} ≠ {0}.','Count repeated elements once.','A ∪ C = B ∪ C does not give A = B.','In De Morgan’s law the complement swaps ∪ and ∩.','“Only A” and “A” are different.','Check A ∩ B = ∅ before writing n(A ∪ B) = n(A) + n(B).'],
      hi:['∈ अवयव के लिए है, ⊂ समुच्चय के लिए।','∅ ≠ {∅} ≠ {0}।','दोहराए गए अवयव को एक बार गिनो।','A ∪ C = B ∪ C से A = B नहीं निकलता।','डी मॉर्गन में पूरक लगाने पर ∪ ↔ ∩ बदल जाता है।','“सिर्फ़ A” और “A” अलग हैं।','n(A ∪ B) = n(A) + n(B) लिखने से पहले A ∩ B = ∅ जाँचो।']}
});
})();
})();
