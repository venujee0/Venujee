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


/* 2. Parallax and parsec */


/* 3. Liquid drop oscillation */


/* 4. Vibrating string */


/* 5. Terminal velocity */


/* 6. Accuracy vs precision */


/* 7. Simple pendulum */


/* 8. Vernier calipers */


/* 9. Vernier zero error */


/* 10. Screw gauge */


/* 11. Screw gauge zero error */


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
