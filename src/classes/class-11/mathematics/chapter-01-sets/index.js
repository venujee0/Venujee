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


/* 2. Number sets nested */


/* 3. Power set cube */


/* 4. Intervals */


/* 5. Venn */


/* 6. Set operations (dot-fill) */


/* 7. Three sets, 7 regions */


/* 8. Juice survey: 400 dots */


/* 9. Element-wise 4 choices */


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
