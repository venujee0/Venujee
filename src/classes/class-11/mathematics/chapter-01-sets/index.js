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
 sections:[],
 formulas:[],
 examples:[],
 rev:{en:['∈ is for an element, ⊂ is for a set.','∅ ≠ {∅} ≠ {0}.','Count repeated elements once.','A ∪ C = B ∪ C does not give A = B.','In De Morgan’s law the complement swaps ∪ and ∩.','“Only A” and “A” are different.','Check A ∩ B = ∅ before writing n(A ∪ B) = n(A) + n(B).'],
      hi:['∈ अवयव के लिए है, ⊂ समुच्चय के लिए।','∅ ≠ {∅} ≠ {0}।','दोहराए गए अवयव को एक बार गिनो।','A ∪ C = B ∪ C से A = B नहीं निकलता।','डी मॉर्गन में पूरक लगाने पर ∪ ↔ ∩ बदल जाता है।','“सिर्फ़ A” और “A” अलग हैं।','n(A ∪ B) = n(A) + n(B) लिखने से पहले A ∩ B = ∅ जाँचो।']}
});
})();
})();
