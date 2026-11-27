(function(){
'use strict';
var rt=window.VENU_RUNTIME;
var B=rt.B,S=rt.S,F=rt.F,R=rt.R,SP=rt.SP,SUBJ=rt.SUBJ;
var CH=rt.CH,D3=rt.D3,D3ATT=rt.D3ATT,DG=rt.DG,LS=rt.LS,diagram2D=rt.diagram2D;
var U=rt.U,reduce=rt.reduce,esc=rt.esc,t=rt.t,lang=rt.lang;
window.addEventListener('venu:languagechange',function(){lang=rt.lang});
// Class and book navigation, chapter pages and Notes
/* ===== Engine: books, pages, tests ===== */
var BRAND='Venu JEE';
var brandHTML=function(){var p=BRAND.split(' '),last=p.pop();return (p.length?p.join(' ')+' ':'')+'<i>'+last+'</i>'};

var U2={
  heroP:B('Study books for Class 11 and Class 12, plus a separate Mock Test section. Read in Hindi or English.','कक्षा 11 और 12 की अध्ययन पुस्तकें और अलग Mock Test सेक्शन। हिंदी या अंग्रेज़ी में पढ़ें.'),
  openBook:B('Open book','किताब खोलो'),
  takeTest:B('Take test','टेस्ट दो'),
  contin:B('Continue from page','जारी रखो, पृष्ठ'),
  chaptersN:B('chapters','अध्याय'),
  pagesN:B('pages','पृष्ठ'),
  classWord:B('Class','कक्षा'),
  forJee:B('JEE preparation','JEE की तैयारी'),
  contents:B('Contents','अनुक्रमणिका'),
  cover:B('Cover','आवरण'),
  chapterWord:B('Chapter','अध्याय'),
  pageWord:B('Page','पृष्ठ'),
  fig:B('Fig.','चित्र'),
  exWord:B('Example','उदाहरण'),fnd:B('Foundation','आधार'),main:B('JEE Main','JEE Main'),adv:B('JEE Advanced','JEE Advanced'),
  sol:B('Solution','हल'),
  inThis:B('In this chapter','इस अध्याय में'),
  formulaPage:B('Formula sheet','सूत्र सारणी'),
  revPage:B('Notes','नोट्स'),
  notesWord:B('Notes','नोट्स'),
  chapterIndex:B('Chapter Index','अध्याय सूची'),
  prev:B('Back','पीछे'),
  nxt:B('Next','आगे'),
  start:B('Start reading','पढ़ना शुरू करो'),
  toc:B('Contents','अनुक्रमणिका'),
  testWord:B('Test','टेस्ट'),
  marking:B('Marking: +4 for a correct answer, −1 for a wrong answer, 0 if skipped.','अंकन: सही उत्तर पर +4, गलत पर −1, छोड़ने पर 0।'),
  allCh:B('All chapters','सभी अध्याय'),
  submit:B('Submit test','टेस्ट जमा करो'),
  retry:B('Try again','फिर से दो'),
  score:B('Score','अंक'),
  rightN:B('Correct','सही'),
  wrongN:B('Wrong','गलत'),
  skipN:B('Skipped','छोड़े'),
  why:B('Explanation','व्याख्या'),
  answered:B('answered','उत्तर दिए'),
  readBook:B('Open the book','किताब खोलो'),
  nextTest:B('Test','टेस्ट'),
  allSub:B('All subjects','सभी विषय'),
  showing:B('Showing','दिखा रहे हैं'),
  ofWord:B('of','में से'),
  qsWord:B('questions','प्रश्न'),
  newSetHint:B('Press Try again after submitting for a fresh set.','जमा करने के बाद “फिर से दो” दबाओ, नया सेट मिलेगा।'),
  pickBook:B('Choose a subject book','विषय की किताब चुनो'),
  homeWord:B('Home','होम'),
  booksN:B('books','किताबें'),
  fullTest:B('Full class test','पूरी कक्षा का टेस्ट'),
  playW:B('▶ Play','▶ चलाओ'),
  pauseW:B('❚❚ Pause','❚❚ रोको'),
  resetW:B('↺ Reset view','↺ दृश्य रीसेट'),
  dragHint:B('Drag to rotate · pinch to zoom','उँगली से घुमाओ · दो उँगलियों से ज़ूम'),
  soon:B('Coming soon','जल्द आ रहा है'),
  noQ:B('No questions yet for this choice.','इस चयन के लिए अभी प्रश्न नहीं हैं।')
};
for(var uk in U2){U[uk]=U2[uk]}

var CLS={
  11:{cov:'cov11',num:'11',name:B('Class 11','कक्षा 11'),sub:B('Physics · Chemistry · Maths','भौतिकी · रसायन · गणित')},
  12:{cov:'cov12',num:'12',name:B('Class 12','कक्षा 12'),sub:B('Physics · Chemistry · Maths','भौतिकी · रसायन · गणित')}
};
var MOTIF={
  11:'<svg viewBox="0 0 120 120" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6,112 Q50,-12 94,112"/><path d="M6,112 Q60,28 114,112"/><path d="M6,112 Q38,62 70,112"/><circle cx="50" cy="31" r="3" fill="currentColor"/></svg>',
  12:'<svg viewBox="0 0 120 120" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="60" cy="60" r="14"/><circle cx="60" cy="60" r="28"/><circle cx="60" cy="60" r="42"/><circle cx="60" cy="60" r="56"/><path d="M60,4 V116 M4,60 H116 M20,20 L100,100 M100,20 L20,100"/></svg>'
};

/* ---------- state ---------- */
var app=document.getElementById('app');
var pager=document.getElementById('pager');
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.VENU_RUNTIME={get lang(){return lang},get U(){return U},get reduce(){return reduce},t:function(v){return t(v)},esc:function(v){return esc(v)}};
var cur={book:false,prev:'',next:''};

function t(o){return o[lang]}
function ot(o){return (typeof o==='string')?o:o[lang]}
function getDone(){try{var a=JSON.parse(LS.get('venu.done')||'[]');return Array.isArray(a)?a:[]}catch(e){return []}}
function isDone(id){return getDone().indexOf(id)>-1}
function toggleDone(id){var a=getDone(),i=a.indexOf(id);if(i>-1){a.splice(i,1)}else{a.push(id)}LS.set('venu.done',JSON.stringify(a));return i===-1}

/* Class 11 content completion and visual assets — restricted to the three active chapters. */
(function(){
 var chem=CH.filter(function(x){return x.id==='chemistry-mole-concept'})[0];
 var phys=CH.filter(function(x){return x.id==='physics-units-dimensions'})[0];
 var math=CH.filter(function(x){return x.id==='maths-sets'})[0];
 if(!chem||!phys||!math)return;
 /* Real reference photographs for laboratory/measurement apparatus; abstract maths stays diagrammatic. */
 var photos={
  vernier:{url:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Sliding_vernier_caliper_%28AM_2004.51.42-4%29.jpg/960px-Sliding_vernier_caliper_%28AM_2004.51.42-4%29.jpg',source:'https://commons.wikimedia.org/wiki/File:Sliding_vernier_caliper_(AM_2004.51.42-4).jpg',alt:B('A real vernier caliper with fixed and sliding scales','मुख्य और चल पैमाने वाला वास्तविक वर्नियर कैलिपर'),caption:B('Real steel-and-brass sliding vernier caliper from Auckland Museum. Photo credited to Auckland Museum, CC BY 4.0; identify the main and sliding scales. The interactive model below is for reading practice.','वास्तविक उपकरण: मुख्य पैमाना, चल वर्नियर पैमाना और जबड़े पहचानो। नीचे दिया मॉडल रीडिंग अभ्यास के लिए है।')},
  screw:{url:'https://commons.wikimedia.org/wiki/Special:FilePath/Micrometer_screw_gauge.jpg',source:'https://commons.wikimedia.org/wiki/Category:Micrometers',alt:B('A real micrometer screw gauge','वास्तविक माइक्रोमीटर स्क्रू गेज'),caption:B('Real instrument reference: anvil, spindle, sleeve, thimble and ratchet.','वास्तविक उपकरण: एनविल, स्पिंडल, स्लीव, थिम्बल और रैचेट।')},
  titration:{url:'https://commons.wikimedia.org/wiki/Special:FilePath/Titration_Set-up.jpg',source:'https://commons.wikimedia.org/wiki/File:Titration_Set-up.jpg',alt:B('A real school laboratory titration setup','स्कूल प्रयोगशाला का वास्तविक अनुमापन सेटअप'),caption:B('Real laboratory reference: burette, clamp, stand and conical flask.','वास्तविक प्रयोगशाला संदर्भ: ब्यूरेट, क्लैम्प, स्टैंड और शंक्वाकार फ्लास्क।')}
 };
 var find=function(a,needle){return a.filter(function(s){return s.h.en.indexOf(needle)>-1})[0]};
 var v=find(phys.sections,'Vernier calipers'), sg=find(phys.sections,'Screw gauge'), ti=find(chem.sections,'Law of equivalence');
 if(v)v.photo=photos.vernier;if(sg)sg.photo=photos.screw;if(ti)ti.photo=photos.titration;
 /* New explanations and 2D visual summaries for topics that previously had only brief coverage. */
 chem.sections.push(
  {h:B('1.3.2 Dalton’s atomic theory: postulates and limitations','1.3.2 डाल्टन का परमाणु सिद्धांत: अभिगृहीत और सीमाएँ'),
   body:B('<p>Dalton proposed that matter is made of tiny atoms. For school-level chemical calculations, remember the postulates and then the modern corrections:</p><ol><li>All matter is made of atoms.</li><li>Atoms of the same element have the same chemical identity; atoms of different elements differ.</li><li>Compounds form when atoms combine in simple whole-number ratios.</li><li>Chemical reactions rearrange atoms; atoms are not created or destroyed in ordinary chemical reactions.</li></ol><p><b>Modern corrections:</b> atoms contain subatomic particles; isotopes of one element have different masses; isobars of different elements can have the same mass number; nuclear reactions can change one nuclide into another. Dalton’s theory remains useful for explaining laws of chemical combination.</p><figure><svg viewBox="0 0 320 118" role="img" aria-label="2D atom combination diagram"><circle cx="52" cy="42" r="17" fill="#3b82f6"/><circle cx="52" cy="82" r="17" fill="#3b82f6"/><text x="52" y="46" text-anchor="middle" fill="white" font-size="12">A</text><text x="52" y="86" text-anchor="middle" fill="white" font-size="12">A</text><path d="M88 62H132m-8 -7 8 7 -8 7" stroke="#111" stroke-width="2" fill="none"/><circle cx="166" cy="62" r="18" fill="#3b82f6"/><circle cx="202" cy="62" r="18" fill="#f59e0b"/><path d="M184 62h0" stroke="#111" stroke-width="4"/><text x="184" y="103" text-anchor="middle" fill="#111" font-size="11">AB compound</text><text x="52" y="112" text-anchor="middle" fill="#111" font-size="11">Atoms</text></svg><figcaption>2D model: atoms combine in a fixed whole-number ratio.</figcaption></figure>',
   '<p>डाल्टन ने प्रस्तावित किया कि पदार्थ बहुत छोटे परमाणुओं से बना है। रासायनिक गणनाओं के लिए अभिगृहीत और उनके आधुनिक संशोधन याद रखो:</p><ol><li>सारा पदार्थ परमाणुओं से बना है।</li><li>एक ही तत्व के परमाणुओं की रासायनिक पहचान समान होती है; अलग तत्वों के परमाणु अलग होते हैं।</li><li>यौगिकों में परमाणु सरल पूर्णांक अनुपात में जुड़ते हैं।</li><li>सामान्य रासायनिक अभिक्रिया में परमाणु केवल पुनर्व्यवस्थित होते हैं; बनते या नष्ट नहीं होते।</li></ol><p><b>आधुनिक संशोधन:</b> परमाणु में उप-परमाण्विक कण होते हैं; समस्थानिकों का द्रव्यमान अलग होता है; अलग तत्वों के समभारिकों की द्रव्यमान संख्या समान हो सकती है; नाभिकीय अभिक्रियाएँ नाभिक बदल सकती हैं। रासायनिक संयोजन के नियम समझाने में डाल्टन का सिद्धांत आज भी उपयोगी है।</p><p><b>याद रखो:</b> रासायनिक अभिक्रिया में इलेक्ट्रॉनों का स्थानांतरण/साझाकरण हो सकता है, लेकिन परमाणु नाभिक सामान्यतः नहीं बदलता।</p>')},
  {h:B('1.6.1 Empirical and molecular formula: a reliable method','1.6.1 मूलानुपाती और आणविक सूत्र: सही विधि'),
   body:B('<p><b>Empirical formula</b> gives the simplest whole-number mole ratio of atoms. <b>Molecular formula</b> gives the actual number of each atom in one molecule.</p><ol><li>Assume 100 g if composition is given in percentages.</li><li>Convert each element mass to moles by dividing by its atomic mass.</li><li>Divide all mole values by the smallest one.</li><li>If ratios are fractional, multiply all by the same small integer to get whole numbers.</li><li>Find n = molar mass / empirical-formula mass; molecular formula = (empirical formula)ₙ.</li></ol><p><b>Example:</b> 40.0% C, 6.7% H and 53.3% O gives mole amounts 3.33, 6.7 and 3.33 (approximately); divide by 3.33 → 1:2:1, so empirical formula = CH₂O. If molar mass is 180 g mol⁻¹ and empirical formula mass is 30, n=6 and molecular formula = C₆H₁₂O₆.</p><p><b>Common trap:</b> do not round a ratio such as 1.5 to 2; multiply the entire ratio by 2.</p>',
   '<p><b>मूलानुपाती सूत्र</b> परमाणुओं का सबसे सरल पूर्णांक मोल अनुपात बताता है। <b>आणविक सूत्र</b> एक अणु में परमाणुओं की वास्तविक संख्या बताता है।</p><ol><li>प्रतिशत दिए हों तो 100 g नमूना मानो।</li><li>हर तत्व के द्रव्यमान को परमाणु द्रव्यमान से भाग देकर मोल निकालो।</li><li>सभी मोल मानों को सबसे छोटे मान से भाग दो।</li><li>अनुपात भिन्न हो तो सभी को एक ही छोटी पूर्णांक संख्या से गुणा करो।</li><li>n = मोलर द्रव्यमान / मूलानुपाती सूत्र द्रव्यमान; आणविक सूत्र = (मूलानुपाती सूत्र)ₙ।</li></ol><p><b>उदाहरण:</b> 40.0% C, 6.7% H और 53.3% O से मोल लगभग 3.33, 6.7 और 3.33 मिलते हैं। सबसे छोटे से भाग देने पर 1:2:1, अतः मूलानुपाती सूत्र CH₂O है। मोलर द्रव्यमान 180 g mol⁻¹ और सूत्र द्रव्यमान 30 हो तो n=6 तथा आणविक सूत्र C₆H₁₂O₆ होगा।</p><p><b>आम गलती:</b> 1.5 को सीधे 2 मत करो; पूरे अनुपात को 2 से गुणा करो।</p>')}
 );
 phys.sections.push(
  {h:B('1.2.3 SI base units: symbols and dimensions','1.2.3 SI मूल मात्रक: संकेत और विमाएँ'),
   body:B('<p>The seven SI base quantities are independent building blocks. Their units and dimensions should be memorised together.</p><table><tr><th>Quantity</th><th>SI unit</th><th>Symbol</th><th>Dimension</th></tr><tr><td>Length</td><td>metre</td><td>m</td><td>[L]</td></tr><tr><td>Mass</td><td>kilogram</td><td>kg</td><td>[M]</td></tr><tr><td>Time</td><td>second</td><td>s</td><td>[T]</td></tr><tr><td>Electric current</td><td>ampere</td><td>A</td><td>[I]</td></tr><tr><td>Temperature</td><td>kelvin</td><td>K</td><td>[Θ]</td></tr><tr><td>Amount of substance</td><td>mole</td><td>mol</td><td>[N]</td></tr><tr><td>Luminous intensity</td><td>candela</td><td>cd</td><td>[J]</td></tr></table><p><b>Derived-unit example:</b> force = mass × acceleration, so [F] = [M][L][T]⁻² and the SI unit is kg m s⁻² (newton). Never confuse a unit symbol with a dimension symbol.</p>',
   '<p>सात SI मूल राशियाँ स्वतंत्र आधार हैं। इनके मात्रक और विमाएँ साथ याद रखो।</p><table><tr><th>राशि</th><th>SI मात्रक</th><th>संकेत</th><th>विमा</th></tr><tr><td>लंबाई</td><td>मीटर</td><td>m</td><td>[L]</td></tr><tr><td>द्रव्यमान</td><td>किलोग्राम</td><td>kg</td><td>[M]</td></tr><tr><td>समय</td><td>सेकंड</td><td>s</td><td>[T]</td></tr><tr><td>विद्युत धारा</td><td>ऐम्पियर</td><td>A</td><td>[I]</td></tr><tr><td>तापमान</td><td>केल्विन</td><td>K</td><td>[Θ]</td></tr><tr><td>पदार्थ की मात्रा</td><td>मोल</td><td>mol</td><td>[N]</td></tr><tr><td>ज्योति तीव्रता</td><td>कैंडेला</td><td>cd</td><td>[J]</td></tr></table><p><b>व्युत्पन्न मात्रक का उदाहरण:</b> बल = द्रव्यमान × त्वरण, इसलिए [F] = [M][L][T]⁻² और SI मात्रक kg m s⁻² (न्यूटन) है। मात्रक संकेत और विमा संकेत को आपस में न मिलाओ।</p>')},
  {h:B('1.10.2 Measurement reading: resolution and zero correction','1.10.2 मापन रीडिंग: अल्पतमांक और शून्य संशोधन'),
   body:B('<p>For a vernier caliper, first identify the main-scale reading just before the vernier zero. Then find the vernier division that exactly coincides with a main-scale mark.</p><p class="fx">Observed reading = MSR + (coinciding division × least count)</p><p class="fx">Correct reading = observed reading − zero error</p><p>For a screw gauge, pitch = distance moved in one complete thimble rotation; least count = pitch / number of circular-scale divisions. Read the sleeve first, then the thimble, then apply zero correction. Always write the unit and match the instrument’s resolution.</p><p><b>Practice:</b> MSR = 2.30 cm, 6th vernier division coincides, LC = 0.01 cm, zero error = +0.02 cm. Observed = 2.36 cm; corrected = 2.34 cm.</p><p>Use the + and − buttons below each model slider to change its setting by exactly one least slider step.</p>',
   '<p>वर्नियर कैलिपर्स में पहले वर्नियर शून्य से ठीक पहले का मुख्य पैमाना पाठ पढ़ो। फिर वह वर्नियर भाग खोजो जो मुख्य पैमाने के निशान से बिल्कुल मिलता है।</p><p class="fx">प्रेक्षित रीडिंग = MSR + (मिलता हुआ भाग × अल्पतमांक)</p><p class="fx">सही रीडिंग = प्रेक्षित रीडिंग − शून्य त्रुटि</p><p>स्क्रू गेज में पिच = थिम्बल के एक पूरे चक्कर में चली दूरी; अल्पतमांक = पिच / वृत्ताकार पैमाने के भागों की संख्या। पहले स्लीव, फिर थिम्बल पढ़ो और अंत में शून्य संशोधन लगाओ। मात्रक लिखना न भूलो।</p><p><b>अभ्यास:</b> MSR = 2.30 cm, छठा वर्नियर भाग मिलता है, LC = 0.01 cm, शून्य त्रुटि = +0.02 cm। प्रेक्षित = 2.36 cm; सही = 2.34 cm।</p><p>मॉडल के हर स्लाइडर के नीचे + और − बटन से मान एक-एक चरण बदल सकते हो।</p>')},
  {h:B('1.11.2 Least count, backlash and care','1.11.2 अल्पतमांक, बैकलैश और सावधानियाँ'),
   body:B('<p><b>Backlash error</b> occurs when the screw mechanism has play: reversing the direction may initially rotate the thimble without the spindle moving by the expected amount. Approach the final reading from one direction where possible, use the ratchet gently, and do not overtighten the object.</p><p>Before measuring, clean the anvil and spindle faces, check zero error, hold the object perpendicular to the measuring faces, and take repeated readings. Report the mean only when repeated measurements are consistent; retain the instrument’s least count.</p><figure><svg viewBox="0 0 320 92" role="img" aria-label="Screw gauge reading steps"><rect x="12" y="18" width="296" height="56" rx="8" fill="#eff6ff" stroke="#2563eb"/><g fill="#111" font-size="11" text-anchor="middle"><text x="60" y="43">1. Clean</text><text x="160" y="43">2. Check zero</text><text x="260" y="43">3. Ratchet gently</text></g><path d="M100 46h18m-5 -5 5 5 -5 5M200 46h18m-5 -5 5 5 -5 5" stroke="#111" fill="none" stroke-width="1.5"/></svg></figure>',
   '<p><b>बैकलैश त्रुटि</b> तब आती है जब स्क्रू तंत्र में ढील हो: दिशा उलटने पर थिम्बल घूम सकता है, लेकिन स्पिंडल तुरंत अपेक्षित दूरी नहीं चलता। जहाँ संभव हो अंतिम रीडिंग एक ही दिशा से लो, रैचेट हल्के से चलाओ और वस्तु को बहुत कसो मत।</p><p>मापन से पहले एनविल और स्पिंडल की सतह साफ करो, शून्य त्रुटि जाँचो, वस्तु को मापन सतहों के लंबवत रखो और कई रीडिंग लो। रीडिंग एक जैसी हों तभी औसत बताओ; अल्पतमांक बनाए रखो।</p>')}
 );
 math.sections.push(
  {h:B('1.3.1 Empty set, singleton and the set containing empty set','1.3.1 रिक्त समुच्चय, एकल समुच्चय और रिक्त समुच्चय वाला समुच्चय'),
   body:B('<p>These three notations look similar but mean different things:</p><ul><li><b>∅</b> or { }: the empty set; it has zero elements, so n(∅)=0.</li><li><b>{a}</b>: a singleton set; it has exactly one element, so n({a})=1.</li><li><b>{∅}</b>: a set whose only element is the empty set; therefore n({∅})=1, not 0.</li></ul><p>Also, ∅ ⊆ A for every set A, because there is no element in ∅ that can violate the subset condition. But ∅ is not an element of every A; that would require ∅ ∈ A.</p><figure><svg viewBox="0 0 320 112" role="img" aria-label="Empty set versus singleton set"><rect x="8" y="12" width="90" height="78" rx="8" fill="#eff6ff" stroke="#2563eb"/><rect x="115" y="12" width="90" height="78" rx="8" fill="#ecfdf5" stroke="#059669"/><rect x="222" y="12" width="90" height="78" rx="8" fill="#fff7ed" stroke="#ea580c"/><g fill="#111" font-size="13" text-anchor="middle"><text x="53" y="53">∅</text><text x="160" y="53">{a}</text><text x="267" y="53">{∅}</text><text x="53" y="105" font-size="10">0 elements</text><text x="160" y="105" font-size="10">1 element</text><text x="267" y="105" font-size="10">1 element</text></g></svg></figure>',
   '<p>ये तीन संकेत देखने में मिलते-जुलते हैं, लेकिन अर्थ अलग हैं:</p><ul><li><b>∅</b> या { }: रिक्त समुच्चय; इसमें शून्य अवयव हैं, इसलिए n(∅)=0।</li><li><b>{a}</b>: एकल समुच्चय; इसमें ठीक एक अवयव है, इसलिए n({a})=1।</li><li><b>{∅}</b>: ऐसा समुच्चय जिसका अकेला अवयव रिक्त समुच्चय है; इसलिए n({∅})=1, शून्य नहीं।</li></ul><p>साथ ही, हर A के लिए ∅ ⊆ A होता है, क्योंकि ∅ में ऐसा कोई अवयव नहीं जो उपसमुच्चय की शर्त तोड़े। लेकिन ∅ हर A का अवयव नहीं है; उसके लिए ∅ ∈ A होना चाहिए।</p>')},
  {h:B('1.4.2 Counting subsets: a quick visual proof','1.4.2 उपसमुच्चय गिनना: छोटा दृश्य प्रमाण'),
   body:B('<p>For each element, a subset has exactly two choices: include it or leave it out. With n independent elements, the multiplication principle gives 2 × 2 × … × 2 = 2ⁿ subsets. The empty set is included (choose “out” for every element), and the full set is included (choose “in” for every element).</p><p>For A={a,b,c}, there are 2³=8 subsets. A set with n elements has 2ⁿ subsets and 2ⁿ−1 proper subsets.</p><figure><svg viewBox="0 0 320 100" role="img" aria-label="Two choices per element"><g fill="#eff6ff" stroke="#2563eb"><rect x="12" y="18" width="80" height="62" rx="8"/><rect x="120" y="18" width="80" height="62" rx="8"/><rect x="228" y="18" width="80" height="62" rx="8"/></g><g fill="#111" font-size="12" text-anchor="middle"><text x="52" y="43">a: in / out</text><text x="160" y="43">b: in / out</text><text x="268" y="43">c: in / out</text><text x="160" y="96">2 × 2 × 2 = 8 subsets</text></g></svg></figure>',
   '<p>हर अवयव के लिए उपसमुच्चय में ठीक दो विकल्प हैं: उसे शामिल करो या छोड़ दो। n स्वतंत्र अवयवों के लिए गुणन सिद्धांत से कुल 2 × 2 × … × 2 = 2ⁿ उपसमुच्चय मिलते हैं। रिक्त समुच्चय भी शामिल है (हर अवयव को छोड़ो) और पूरा समुच्चय भी (हर अवयव को शामिल करो)।</p><p>A={a,b,c} के 2³=8 उपसमुच्चय हैं। n अवयव वाले समुच्चय के कुल 2ⁿ उपसमुच्चय और 2ⁿ−1 उचित उपसमुच्चय होते हैं।</p>')}
 );
 /* Chemistry Ch. 1: additional depth, practical method and dedicated Board-level solved set. */
 chem.sections.push(
 {h:B('1.15 Significant figures and rounding','1.15 सार्थक अंक और पूर्णांकन'),
 body:B('<p>Significant figures communicate measurement precision. Non-zero digits count; zeros between non-zero digits count; leading zeros do not. Trailing zeros after a decimal count (0.00450 has 3; 1002 has 4; 2.300 has 4). In scientific notation, count digits in the coefficient only. Exact counts and defined conversions do not limit significant figures.</p><p><b>Operations:</b> addition/subtraction → keep the least decimal places; multiplication/division → keep the least significant figures. Keep guard digits during working and round only the final answer. If the first discarded digit is below 5, leave the last retained digit; if above 5, increase it. For an exact tie, follow the rounding convention specified by the exam.</p><p><b>Examples:</b> 12.11 + 0.3 = 12.41 → 12.4; 2.5 × 3.42 = 8.55 → 8.6 (2 significant figures).</p>',
 '<p>सार्थक अंक माप की परिशुद्धता बताते हैं। अशून्य अंक और दो अशून्य अंकों के बीच के शून्य गिने जाते हैं; शुरुआती शून्य नहीं। दशमलव के बाद के अंतिम शून्य गिने जाते हैं (0.00450 में 3; 1002 में 4; 2.300 में 4)। वैज्ञानिक संकेतन में केवल गुणांक के अंक गिनो। सटीक गिनती और परिभाषित रूपांतरण सार्थक अंकों को सीमित नहीं करते।</p><p><b>गणना:</b> जोड़/घटाव → सबसे कम दशमलव स्थान; गुणा/भाग → सबसे कम सार्थक अंक। बीच की गणना में अतिरिक्त अंक रखो और केवल अंतिम उत्तर पूर्णांकित करो। हटाया जाने वाला पहला अंक 5 से कम हो तो अंतिम रखा अंक वही; 5 से बड़ा हो तो 1 बढ़ाओ। ठीक 5 पर परीक्षा में दिया नियम अपनाओ।</p><p><b>उदाहरण:</b> 12.11 + 0.3 = 12.41 → 12.4; 2.5 × 3.42 = 8.55 → 8.6 (2 सार्थक अंक)।</p>')},
 {h:B('1.16 Balanced equations and stoichiometry workflow','1.16 संतुलित समीकरण और स्टॉइकियोमेट्री की विधि'),
 body:B('<p>A balanced equation has the same number of atoms of each element on both sides. Change coefficients, never subscripts. The coefficients give mole ratios, not mass ratios.</p><ol><li>Write correct reactant/product formulae.</li><li>Balance with the smallest whole-number coefficients.</li><li>Convert given masses or gas volumes to moles.</li><li>For each reactant calculate moles/coefficient; the smallest value is limiting.</li><li>Use the mole ratio to find product moles and convert to the requested unit.</li><li>Find excess left = initial amount − amount consumed.</li><li>Check atoms, units, significant figures and reasonableness.</li></ol><p>Example: 2H₂ + O₂ → 2H₂O means 2 mol H₂ + 1 mol O₂ → 2 mol H₂O, not 2 g + 1 g → 2 g. Gas-volume ratios require the same temperature and pressure.</p>',
 '<p>संतुलित समीकरण में हर तत्व के परमाणु दोनों ओर बराबर होते हैं। गुणांक बदलो, सूत्रांक नहीं। गुणांक मोल अनुपात बताते हैं, द्रव्यमान अनुपात नहीं।</p><ol><li>अभिकारकों/उत्पादों के सही सूत्र लिखो।</li><li>सबसे छोटे पूर्णांक गुणांकों से संतुलित करो।</li><li>दिए द्रव्यमान या गैस आयतन को मोल में बदलो।</li><li>हर अभिकारक के मोल/गुणांक निकालो; सबसे छोटा सीमांत है।</li><li>मोल अनुपात से उत्पाद के मोल और फिर माँगी इकाई निकालो।</li><li>बचा अभिकारक = प्रारंभिक मात्रा − प्रयुक्त मात्रा।</li><li>परमाणु, मात्रक, सार्थक अंक और उत्तर की उचितता जाँचो।</li></ol><p>उदाहरण: 2H₂ + O₂ → 2H₂O का अर्थ 2 mol H₂ + 1 mol O₂ → 2 mol H₂O है, 2 g + 1 g → 2 g नहीं। गैस आयतन अनुपात के लिए ताप और दाब समान हों।</p>')},
 {h:B('1.17 Preparing solutions in the laboratory','1.17 प्रयोगशाला में विलयन तैयार करना'),
 body:B('<p><b>From a solid:</b> required solute mass (g) = M × molar mass × final volume (L). Weigh, dissolve in a little solvent, transfer quantitatively to a volumetric flask, rinse the beaker/funnel into it, make up to the calibration mark, stopper and invert to mix.</p><p><b>By dilution:</b> for the same solute with no reaction, M₁V₁ = M₂V₂; V₂ is final solution volume. Transfer the measured stock aliquot into a partly filled volumetric flask, then make up to the final mark. Do not assume solvent added equals V₂−V₁ unless volume additivity is justified.</p><p>Read the meniscus at eye level; use a pipette filler, never mouth pipette; label the solution. Add acid slowly to water, never water to concentrated acid. A volumetric flask measures final solution volume, not solvent volume alone.</p>',
 '<p><b>ठोस विलेय से:</b> आवश्यक द्रव्यमान (g) = M × मोलर द्रव्यमान × अंतिम आयतन (L)। विलेय तौलो, थोड़े विलायक में घोलो, वॉल्यूमेट्रिक फ्लास्क में मात्रात्मक रूप से डालो, बीकर/कीप धोकर धुलाई भी डालो, निशान तक भरो, ढक्कन लगाकर मिलाओ।</p><p><b>तनुकरण से:</b> उसी विलेय और बिना अभिक्रिया के M₁V₁ = M₂V₂; V₂ अंतिम विलयन आयतन है। स्टॉक विलयन का मापा भाग थोड़े विलायक वाले फ्लास्क में डालो, फिर अंतिम निशान तक भरो। आयतन योगात्मक सिद्ध न हो तो मिलाया विलायक V₂−V₁ मत मानो।</p><p>मेनिस्कस आँख के स्तर पर पढ़ो; पिपेट फिलर लो, मुँह से पिपेट कभी नहीं; विलयन पर लेबल लगाओ। अम्ल को धीरे-धीरे पानी में डालो, सांद्र अम्ल में पानी नहीं। वॉल्यूमेट्रिक फ्लास्क अंतिम विलयन आयतन के लिए होता है, केवल विलायक के लिए नहीं।</p>')},
 {h:B('1.18 Board-level solved questions','1.18 बोर्ड स्तर के हल सहित प्रश्न'),
 body:B('<p>Board-style definitions, laws, reasoning and 2–5 mark numericals. Write every numerical as Given → Required → Formula → Substitution → Answer with unit. Complete worked answers follow in the solved-example pages.</p>',
 '<p>बोर्ड स्तर की परिभाषाएँ, नियम, कारण और 2–5 अंक के संख्यात्मक प्रश्न। हर प्रश्न को दिया है → ज्ञात करना है → सूत्र → मान रखना → मात्रक सहित उत्तर के क्रम में लिखो। पूरे हल आगे दिए गए उदाहरण पृष्ठों में हैं।</p>')}
 );
 chem.examples.push(
 {lv:'board',q:B('Water has H:O mass ratio 1:8. Find the masses of H and O in 45 g water.','पानी में H:O द्रव्यमान अनुपात 1:8 है। 45 g पानी में दोनों के द्रव्यमान निकालो।'),a:B('<p>Parts = 1+8 = 9; one part = 45/9 = 5 g. <b>H = 5 g; O = 40 g.</b> This illustrates definite proportions.</p>','<p>भाग = 1+8 = 9; एक भाग = 45/9 = 5 g। <b>H = 5 g; O = 40 g।</b> यह निश्चित अनुपात का नियम है।')},
 {lv:'board',q:B('Boron has 19.9% ¹⁰B and 80.1% ¹¹B. Find average atomic mass.','बोरॉन में 19.9% ¹⁰B और 80.1% ¹¹B है। औसत परमाणु द्रव्यमान निकालो।'),a:B('<p>Average = 10(0.199)+11(0.801)=1.990+8.811 = <b>10.801 u</b>.</p>','<p>औसत = 10(0.199)+11(0.801)=1.990+8.811 = <b>10.801 u</b>।</p>')},
 {lv:'board',q:B('5.85 g NaCl (M = 58.5 g mol⁻¹) is dissolved. Find moles and total ions after complete dissociation.','5.85 g NaCl (M = 58.5 g mol⁻¹) घोला गया। मोल और पूर्ण वियोजन के बाद कुल आयन निकालो।'),a:B('<p>n = 5.85/58.5 = 0.10 mol; formula units = 0.10Nₐ = 6.022×10²². NaCl → Na⁺+Cl⁻, so total ions = 2(0.10Nₐ) = <b>1.204×10²³</b>.</p>','<p>n = 5.85/58.5 = 0.10 mol; सूत्र इकाइयाँ = 0.10Nₐ = 6.022×10²²। NaCl → Na⁺+Cl⁻, अतः कुल आयन = 2(0.10Nₐ) = <b>1.204×10²³</b>।</p>')},
 {lv:'board',q:B('A sample has 2.4 g Mg and 1.6 g O. Find empirical formula (Mg=24, O=16).','नमूने में 2.4 g Mg और 1.6 g O है। मूलानुपाती सूत्र निकालो (Mg=24, O=16)।'),a:B('<p>Mg moles = 2.4/24 = 0.10; O moles = 1.6/16 = 0.10. Ratio 1:1. <b>Empirical formula = MgO.</b></p>','<p>Mg मोल = 2.4/24 = 0.10; O मोल = 1.6/16 = 0.10। अनुपात 1:1। <b>मूलानुपाती सूत्र = MgO।</b></p>')},
 {lv:'board',q:B('4.0 g H₂ reacts with 16.0 g O₂. Find limiting reagent, water formed and excess reactant left.','4.0 g H₂ की अभिक्रिया 16.0 g O₂ से होती है। सीमांत अभिकर्मक, पानी और बचा अभिकारक निकालो।'),a:B('<p>2H₂+O₂→2H₂O. n(H₂)=4/2=2 mol; n(O₂)=16/32=0.5 mol. n/coefficient: H₂=1; O₂=0.5, so O₂ limits. Water = 1 mol = 18 g. H₂ consumed=1 mol=2 g; left = <b>2 g H₂</b>.</p>','<p>2H₂+O₂→2H₂O। n(H₂)=4/2=2 mol; n(O₂)=16/32=0.5 mol। n/गुणांक: H₂=1; O₂=0.5, अतः O₂ सीमांत। पानी = 1 mol = 18 g। H₂ प्रयुक्त=1 mol=2 g; बचा = <b>2 g H₂</b>।</p>')},
 {lv:'board',q:B('10 g NaCl is mixed with 90 g water. Find mass percentage.','10 g NaCl को 90 g पानी में मिलाया। द्रव्यमान प्रतिशत निकालो।'),a:B('<p>Solution mass = 10+90=100 g. Mass % = (10/100)×100 = <b>10%</b>.</p>','<p>विलयन द्रव्यमान = 10+90=100 g। द्रव्यमान % = (10/100)×100 = <b>10%</b>।</p>')},
 {lv:'board',q:B('5.30 g Na₂CO₃ is made up to 250 mL solution. Find molarity (M = 106 g mol⁻¹).','5.30 g Na₂CO₃ से 250 mL विलयन बनाया। मोलरता निकालो (M = 106 g mol⁻¹)।'),a:B('<p>n=5.30/106=0.050 mol; V=0.250 L. M=n/V=0.050/0.250 = <b>0.20 mol L⁻¹</b>.</p>','<p>n=5.30/106=0.050 mol; V=0.250 L। M=n/V=0.050/0.250 = <b>0.20 mol L⁻¹</b>।</p>')},
 {lv:'board',q:B('Dilute 50 mL of 2.0 M solution to 0.50 M. Find final volume and water added.','2.0 M विलयन के 50 mL को 0.50 M तक तनु करो। अंतिम आयतन और पानी निकालो।'),a:B('<p>M₁V₁=M₂V₂. V₂=(2.0×50)/0.50=200 mL. Under the usual school-level additive-volume assumption, water added = 200−50 = <b>150 mL</b>.</p>','<p>M₁V₁=M₂V₂। V₂=(2.0×50)/0.50=200 mL। सामान्य स्कूली आयतन-योग्यता मानकर पानी = 200−50 = <b>150 mL</b>।</p>')},
 {lv:'board',q:B('10.0 g CaCO₃ gives 3.96 g CO₂. Find percentage yield. (CaCO₃→CaO+CO₂; M = 100 and 44).','10.0 g CaCO₃ से 3.96 g CO₂ मिला। प्रतिशत उपज निकालो। (CaCO₃→CaO+CO₂; M = 100 और 44)।'),a:B('<p>Theoretical CO₂ = 10.0×44/100 = 4.40 g. Yield = (3.96/4.40)×100 = <b>90.0%</b>.</p>','<p>सैद्धांतिक CO₂ = 10.0×44/100 = 4.40 g। उपज = (3.96/4.40)×100 = <b>90.0%</b>।</p>')},
 {lv:'board',q:B('Apply significant figures: (i) 12.11+0.3; (ii) 2.5×3.42.','सार्थक अंक लगाओ: (i) 12.11+0.3; (ii) 2.5×3.42।'),a:B('<p>(i) 12.41 → <b>12.4</b> (one decimal place). (ii) 8.55 → <b>8.6</b> (two significant figures).</p>','<p>(i) 12.41 → <b>12.4</b> (एक दशमलव स्थान)। (ii) 8.55 → <b>8.6</b> (दो सार्थक अंक)।</p>')}
 );
 chem.formulas.push(
 [B('Significant figures','सार्थक अंक'),'Addition/subtraction → least decimal places; multiplication/division → least significant figures'],
 [B('Solution preparation','विलयन की तैयारी'),'mass (g) = M × molar mass × V<sub>final</sub>(L)'],
 [B('Stoichiometry workflow','स्टॉइकियोमेट्री विधि'),'Balance → moles → n/coefficient → product moles → requested unit']
 );
 chem.rev.en.push('For addition/subtraction use decimal places; for multiplication/division use significant figures.','Balance equations before using mole ratios.','A volumetric flask is filled to final solution volume, not solvent volume.','For dilution, V₂ is final solution volume.');
 chem.rev.hi.push('जोड़/घटाव में दशमलव स्थान और गुणा/भाग में सार्थक अंक देखो।','मोल अनुपात लगाने से पहले समीकरण संतुलित करो।','वॉल्यूमेट्रिक फ्लास्क में अंतिम विलयन आयतन भरो, केवल विलायक नहीं।','तनुकरण में V₂ अंतिम विलयन आयतन है।');

  /* Bilingual 2D diagrams for important sections without an existing 3D model. */
  DG.flow=function(labels,caption){var c=['#dbeafe','#dcfce7','#fef3c7'],s=['#2563eb','#16a34a','#d97706'];var b=labels.map(function(v,i){var x=18+i*207;return '<rect x="'+x+'" y="45" width="184" height="100" rx="12" fill="'+c[i]+'" stroke="'+s[i]+'" stroke-width="2"/><circle cx="'+(x+92)+'" cy="70" r="9" fill="'+s[i]+'"/><text x="'+(x+92)+'" y="105" text-anchor="middle" font-size="13" font-weight="700" fill="#111827">'+esc(v)+'</text>'}).join('');return '<svg class="diagram2d" viewBox="0 0 640 180" role="img" aria-label="'+esc(caption)+'">'+b+'<path d="M202 95h20m-7 -7 7 7 -7 7M409 95h20m-7 -7 7 7 -7 7" stroke="#334155" stroke-width="2" fill="none"/><text x="320" y="169" text-anchor="middle" font-size="12" fill="#334155">'+esc(caption)+'</text></svg>'};
  DG.settypes=function(l){return DG.flow(l==='hi'?['रिक्त / एकल','परिमित / अपरिमित','समान / समतुल्य']:['Empty / singleton','Finite / infinite','Equal / equivalent'],l==='hi'?'समुच्चयों के प्रकार':'Types of sets')};
  DG.setlaws=function(l){return DG.flow(l==='hi'?['तत्समक / पूरक','वितरण / अवशोषण','डी मॉर्गन']:['Identity / complement','Distributive / absorption','De Morgan'],l==='hi'?'समुच्चय बीजगणित के नियम':'Set algebra laws')};
  DG.setcardinality=function(l){return DG.flow(l==='hi'?['n(A), n(B)','प्रतिच्छेद घटाएँ','संघ / पूरक']:['n(A), n(B)','Subtract intersection','Union / complement'],l==='hi'?'गणनांक में दोहरी गिनती':'Double-counting in cardinality')};
  DG.chemcomb=function(l){return DG.flow(l==='hi'?['द्रव्यमान संरक्षण','निश्चित अनुपात','गुणित अनुपात']:['Conservation of mass','Definite proportions','Multiple proportions'],l==='hi'?'रासायनिक संयोजन के नियम':'Laws of chemical combination')};
  DG.moleflow=function(l){return DG.flow(l==='hi'?['द्रव्यमान (g)','मोल = m/M','कण = nNₐ']:['Mass (g)','Moles = m/M','Particles = nNₐ'],l==='hi'?'द्रव्यमान से मोल और कण':'Mass to moles to particles')};
  DG.empirical=function(l){return DG.flow(l==='hi'?['द्रव्यमान / %','मोल में बदलें','सरल अनुपात']:['Mass / percentage','Convert to moles','Simplest ratio'],l==='hi'?'मूलानुपाती सूत्र की विधि':'Empirical formula workflow')};
  DG.limitingflow=function(l){return DG.flow(l==='hi'?['मोल / गुणांक','सबसे छोटा मान','उत्पाद + अतिरिक्त']:['Moles / coefficient','Smallest value','Product + excess'],l==='hi'?'सीमांत अभिकर्मक की पहचान':'Identify limiting reagent')};
  DG.concentration=function(l){return DG.flow(l==='hi'?['द्रव्यमान %','मोलरता mol/L','मोललता mol/kg']:['Mass %','Molarity mol/L','Molality mol/kg'],l==='hi'?'सांद्रता की परिभाषाएँ':'Concentration terms')};
  DG.solutionprep=function(l){return DG.flow(l==='hi'?['विलेय तौलें','घोलकर फ्लास्क में','निशान तक भरें']:['Weigh solute','Dissolve and transfer','Make up to mark'],l==='hi'?'मानक विलयन तैयार करना':'Prepare a standard solution')};
  DG.siunits=function(l){return DG.flow(l==='hi'?['7 मूल राशियाँ','7 SI मात्रक','व्युत्पन्न मात्रक']:['7 base quantities','7 SI units','Derived units'],l==='hi'?'SI मात्रकों की संरचना':'SI unit structure')};
  DG.physdims=function(l){return DG.flow(l==='hi'?['मूल राशियाँ','घातों में लिखें','विमा सूत्र']:['Base quantities','Write powers','Dimensional formula'],l==='hi'?'विमा सूत्र बनाने की प्रक्रिया':'Build a dimensional formula')};
  DG.physigfig=function(l){return DG.flow(l==='hi'?['अंक पहचानें','नियम चुनें','अंतिम पूर्णांकन']:['Identify digits','Choose operation rule','Round final result'],l==='hi'?'सार्थक अंकों के नियम':'Significant-figure workflow')};
  DG.physerrors=function(l){return DG.flow(l==='hi'?['मापन','निरपेक्ष त्रुटि','सापेक्ष / प्रतिशत']:['Measurement','Absolute error','Relative / percentage'],l==='hi'?'मापन त्रुटि की प्रक्रिया':'Measurement-error pathway')};
  var assignDiagram=function(ch,needle,key){var s=find(ch.sections,needle);if(s&&!s.d3)s.dg=key};
  assignDiagram(math,'1.3 Types of sets','settypes');assignDiagram(math,'1.8 Laws of set algebra','setlaws');assignDiagram(math,'1.9 Cardinality','setcardinality');
  assignDiagram(chem,'1.3 Laws of chemical combination','chemcomb');assignDiagram(chem,'1.5 The mole concept','moleflow');assignDiagram(chem,'1.6 Percentage composition and formula','empirical');assignDiagram(chem,'1.7.1 Limiting reagent','limitingflow');assignDiagram(chem,'1.8 Concentration terms','concentration');assignDiagram(chem,'1.17 Preparing solutions','solutionprep');
  assignDiagram(phys,'1.2 SI system of units','siunits');assignDiagram(phys,'1.4 Dimensions','physdims');assignDiagram(phys,'1.8 Significant figures','physigfig');assignDiagram(phys,'1.9 Errors in measurement','physerrors');
  math.sections.push(
   {h:B('1.3.2 Disjoint, overlapping and equivalent sets','1.3.2 असंयुक्त, प्रतिच्छेदी और समतुल्य समुच्चय'),body:B('<p><b>Disjoint:</b> A∩B=∅; no common element. <b>Overlapping:</b> A∩B≠∅. <b>Equivalent finite sets:</b> n(A)=n(B), even when elements differ. <b>Equal sets:</b> exactly the same elements. Equal sets are equivalent when finite, but equivalent sets need not be equal.</p><p>Example: A={1,2,3}, B={a,b,c} are equivalent but not equal. C={4,5} is disjoint from A; D={3,7} overlaps A. For pairwise disjoint sets, every pair must have empty intersection.</p>','<p><b>असंयुक्त:</b> A∩B=∅; कोई साझा अवयव नहीं। <b>प्रतिच्छेदी:</b> A∩B≠∅। <b>समतुल्य परिमित समुच्चय:</b> n(A)=n(B), भले अवयव अलग हों। <b>समान समुच्चय:</b> बिल्कुल समान अवयव। परिमित समान समुच्चय समतुल्य होते हैं, लेकिन समतुल्य समुच्चय समान होना ज़रूरी नहीं।</p><p>उदाहरण: A={1,2,3}, B={a,b,c} समतुल्य पर समान नहीं। C={4,5}, A से असंयुक्त है; D={3,7}, A को काटता है। युग्मवार असंयुक्तता में हर जोड़ी का प्रतिच्छेद रिक्त होना चाहिए।</p>')},
   {h:B('1.5.1 Interval notation and inequalities','1.5.1 अंतराल संकेत और असमिकाएँ'),body:B('<p>a&lt;x&lt;b → (a,b); a≤x≤b → [a,b]; a≤x&lt;b → [a,b); x≥a → [a,∞); x&lt;b → (−∞,b). For example, [−2,3]∩(1,5)=(1,3] and [−2,3]∪(1,5)=[−2,5). Endpoint inclusion must be preserved.</p><p><b>Absolute value:</b> |x−c|&lt;r means c−r&lt;x&lt;c+r, i.e. (c−r,c+r), for r&gt;0. With ≤, use a closed interval.</p>','<p>a&lt;x&lt;b → (a,b); a≤x≤b → [a,b]; a≤x&lt;b → [a,b); x≥a → [a,∞); x&lt;b → (−∞,b)। उदाहरण: [−2,3]∩(1,5)=(1,3] और [−2,3]∪(1,5)=[−2,5)। अंतिम बिंदु शामिल है या नहीं, इसे सही रखो।</p><p><b>निरपेक्ष मान:</b> |x−c|&lt;r का अर्थ c−r&lt;x&lt;c+r अर्थात (c−r,c+r), जहाँ r&gt;0। ≤ होने पर बंद अंतराल लो।</p>')},
   {h:B('1.9.4 Cardinality bounds and feasibility checks','1.9.4 गणनांक की सीमाएँ और संभवता जाँच'),body:B('<p>For finite A,B inside U:</p><p class="fx">max(0,n(A)+n(B)−n(U)) ≤ n(A∩B) ≤ min(n(A),n(B))</p><p class="fx">max(n(A),n(B)) ≤ n(A∪B) ≤ min(n(U),n(A)+n(B))</p><p>If n(U)=100, n(A)=70 and n(B)=60, the intersection must be between 30 and 60. A claimed value 20 is impossible. Also n(A′)=n(U)−n(A).</p>','<p>U के अंदर परिमित A,B के लिए:</p><p class="fx">max(0,n(A)+n(B)−n(U)) ≤ n(A∩B) ≤ min(n(A),n(B))</p><p class="fx">max(n(A),n(B)) ≤ n(A∪B) ≤ min(n(U),n(A)+n(B))</p><p>यदि n(U)=100, n(A)=70 और n(B)=60, तो प्रतिच्छेद 30 से 60 के बीच होगा। 20 असंभव है। साथ ही n(A′)=n(U)−n(A)।</p>')}
  );
  math.examples.push(
   {lv:'board',q:B('A={1,2,3,4}, B={3,4,5}. Classify the pair.','A={1,2,3,4}, B={3,4,5}। इस जोड़ी का वर्गीकरण करो।'),a:B('A∩B={3,4}≠∅, so they overlap. n(A)=4 and n(B)=3, so they are neither equal nor equivalent.','A∩B={3,4}≠∅, अतः प्रतिच्छेदी हैं। n(A)=4 और n(B)=3, इसलिए न समान हैं न समतुल्य।')},
   {lv:'main',q:B('If n(U)=120, n(A)=75 and n(B)=68, find the least and greatest possible n(A∩B).','यदि n(U)=120, n(A)=75 और n(B)=68, तो n(A∩B) का न्यूनतम और अधिकतम निकालो।'),a:B('Minimum=max(0,75+68−120)=23; maximum=min(75,68)=68. Hence <b>23≤n(A∩B)≤68</b>.','न्यूनतम=max(0,75+68−120)=23; अधिकतम=min(75,68)=68। अतः <b>23≤n(A∩B)≤68</b>।')},
   {lv:'fnd',q:B('Write {x∈Z: −2&lt;x≤3} in roster and interval form.','{x∈Z: −2&lt;x≤3} को रोस्टर और अंतराल रूप में लिखो।'),a:B('Roster: <b>{−1,0,1,2,3}</b>. Interval with integer restriction: <b>(−2,3]∩Z</b>.','रोस्टर: <b>{−1,0,1,2,3}</b>। पूर्णांक प्रतिबंध सहित अंतराल: <b>(−2,3]∩Z</b>।')},
   {lv:'main',q:B('A and B are disjoint with n(A)=m and n(B)=n. Find n(A∪B).','A और B असंयुक्त हैं, n(A)=m और n(B)=n। n(A∪B) निकालो।'),a:B('Since A∩B=∅, n(A∪B)=m+n−0=<b>m+n</b>.','क्योंकि A∩B=∅, n(A∪B)=m+n−0=<b>m+n</b>।')},
   {lv:'adv',q:B('Does n(A)=n(B) prove A=B? Give a counterexample.','क्या n(A)=n(B) से A=B सिद्ध होता है? प्रति-उदाहरण दो।'),a:B('No. A={1,2}, B={a,b} have equal cardinality but different elements: equivalent, not equal.','नहीं। A={1,2}, B={a,b} का गणनांक समान है पर अवयव अलग हैं: समतुल्य, समान नहीं।')}
  );

})();

var CHBY={};CH.forEach(function(c){CHBY[c.id]=c});


/* ---------- NCERT 2023 chapter plan (Class 11) ---------- */
var PLAN11={physics:[],chemistry:[],maths:[]};
var PLAN12={physics:[],chemistry:[],maths:[]};

/* ---------- book model ---------- */
var BOOKS={}, SUBS=['physics','chemistry','maths'];
function classChapters(cls){
  var SORD={physics:0,chemistry:1,maths:2}, out=[];
  var have={};
  CH.forEach(function(c){have[c.id]=c;if(!c._att&&D3ATT[c.id]){c._att=1;D3ATT[c.id].forEach(function(a){var sc=c.sections[a[0]];if(sc&&!sc.d3){sc.d3=a[1];sc.cap3=a[2]}})}});
  var plan=cls===11?PLAN11:PLAN12;
  SUBS.forEach(function(sub){
    (plan[sub]||[]).forEach(function(p,i){
      var id=sub+'-'+p[0], c=have[id];
      if(c&&c.cls===cls){c.ord=i+1;out.push(c)}
      else{out.push({id:id,subject:sub,cls:cls,ord:i+1,title:B(p[1],p[2]),pending:true})}
    });
  });
  CH.forEach(function(c){if(c.cls===cls&&!out.some(function(o){return o.id===c.id})){out.push(c)}});
  return out.map(function(c,i){return {c:c,i:i}}).sort(function(a,b){
    return SORD[a.c.subject]-SORD[b.c.subject]||(a.c.ord||0)-(b.c.ord||0)||a.i-b.i;
  }).map(function(x){return x.c});
}
function book(cls,sub){
  var key=cls+'-'+sub;
  if(BOOKS[key])return BOOKS[key];
  var chs=classChapters(cls).filter(function(c){return c.subject===sub});
  var pages=[{t:'cover'},{t:'toc',label:'ii'}], info=[], n=0;
  chs.forEach(function(c,ci){
    var no=ci+1, figN=0;
    var rec={c:c,no:no,start:0,secs:[],fx:0,ex:[],rev:0};
    if(c.pending){rec.pending=true;info.push(rec);return}
    var add=function(p){p.num=++n;p.ci=ci;p.label=String(p.num);pages.push(p);return p};
    rec.start=add({t:'opener'}).num;
    c.sections.forEach(function(s,si){
      var p={t:'concept',si:si};
      if(s.d3){p.fig=no+'.'+(++figN)}
      if(s.dg){p.fig2=no+'.'+(++figN)}
      add(p);
      rec.secs.push({h:s.h,num:p.num});
    });
    rec.fx=add({t:'formulas'}).num;
    for(var i=0;i<c.examples.length;i+=3){
      var items=[];
      for(var j=i;j<Math.min(i+3,c.examples.length);j++){items.push({x:c.examples[j],no:no+'.'+(j+1)})}
      rec.ex.push(add({t:'examples',items:items}).num);
    }
    rec.rev=add({t:'notes'}).num;
    info.push(rec);
  });
  BOOKS[key]={cls:cls,sub:sub,base:'b'+key,chs:chs,info:info,pages:pages,total:n};
  return BOOKS[key];
}
function pHref(bk,idx){
  if(idx===0)return '#'+bk.base;
  if(idx===1)return '#'+bk.base+'-toc';
  return '#'+bk.base+'-p'+bk.pages[idx].num;
}
function numHref(base,num){return '#'+base+'-p'+num}

/* ---------- pieces ---------- */
function coverHTML(cls,lg,href,sub){
  var k=CLS[cls];
  var mid=sub
    ?'<div class="cv-mid"><div class="cv-word">'+t(k.name)+'</div><div class="cv-num sm">'+t(SUBJ[sub])+'</div><div class="cv-rule"></div></div>'
    :'<div class="cv-mid"><div class="cv-word">'+t(U.classWord)+'</div><div class="cv-num">'+k.num+'</div><div class="cv-rule"></div><div class="cv-sub">'+t(k.sub)+'</div></div>';
  var inner=MOTIF[cls]+'<div class="cv-top"><div class="cv-brand">'+BRAND+'</div></div>'+mid
    +'<div class="cv-bot"><div class="cv-for">'+t(U.forJee)+'</div></div>';
  var cc=sub?'cvs-'+sub:k.cov;
  var lab=esc(BRAND+' '+(sub?t(SUBJ[sub])+' ':'')+t(k.name));
  if(href){return '<a class="cover '+cc+'" href="'+href+'" aria-label="'+lab+'">'+inner+'</a>'}
  return '<div class="cover '+cc+(lg?' lg':'')+'">'+inner+'</div>';
}
function esc(s){return String(s).replace(/[&<>"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]})}
function segHTML(){
  return '<div class="seg" role="group" aria-label="Language"><button type="button" data-lang="en" aria-pressed="'+(lang==='en')+'">EN</button><button type="button" data-lang="hi" aria-pressed="'+(lang==='hi')+'">हिं</button></div>';
}
function tlRow(href,tn,tag,title,pg,ck,subj){
  return '<a class="tl"'+(subj?' data-subject="'+subj+'"':'')+' href="'+href+'">'+(tn?'<span class="tn">'+tn+'</span>':'')
    +'<span class="tx">'+(tag?'<span class="tg">'+tag+'</span>':'')+title+'</span>'
    +'<span class="dots"></span><span class="pg">'+pg+(ck?'<span class="ck">✓</span>':'')+'</span></a>';
}

/* ---------- page bodies ---------- */
function openerBody(bk,p){
  var rec=bk.info[p.ci], c=rec.c, alt=lang==='en'?'hi':'en', cls=bk.base;
  var rows=rec.secs.map(function(s){return tlRow(numHref(cls,s.num),'','',t(s.h),s.num)}).join('')
    +tlRow(numHref(cls,rec.fx),'','',t(U.formulaPage),rec.fx)
    +tlRow(numHref(cls,rec.ex[0]),'','',t(U.examples),rec.ex[0]+(rec.ex.length>1?'–'+rec.ex[rec.ex.length-1]:''))
    +tlRow(numHref(cls,rec.rev),'','',t(U.revPage),rec.rev);
  return '<div class="op-no">'+t(U.chapterWord)+' '+rec.no+' · '+t(SUBJ[c.subject])+'</div>'
    +'<h1 class="op-t">'+t(c.title)+'</h1><p class="op-alt">'+c.title[alt]+'</p>'
    +'<p class="lead">'+t(c.blurb)+'</p>'
    +'<h3 class="mini">'+t(U.inThis)+'</h3><div class="tl-list">'+rows+'</div>';
}
function conceptBody(bk,p){
  var c=bk.info[p.ci].c, s=c.sections[p.si];
  return '<h2 class="ph">'+t(s.h)+'</h2><div class="sec">'+t(s.body)
    +(s.d3?'<figure class="fig2"><figcaption><b>'+(lang==='hi'?'2D नामांकित आरेख':'2D labelled schematic')+'</b></figcaption>'+diagram2D(s.d3,lang)+'</figure>':'')
    +(s.photo?'<figure class="realphoto"><img src="'+s.photo.url+'" alt="'+esc(t(s.photo.alt))+'" loading="lazy"><figcaption>'+t(s.photo.caption)+' · <a href="'+s.photo.source+'" target="_blank" rel="noopener">Image source / licence</a></figcaption></figure>':'')
    +(s.d3?'<figure class="fig3">'+window.d3HTML(s.d3)+'<figcaption><b>'+t(U.fig)+' '+p.fig+'.</b> '+t(s.cap3||s.cap)+'</figcaption></figure>':'')
    +(s.dg?'<figure>'+DG[s.dg](lang)+'<figcaption><b>'+t(U.fig)+' '+(p.fig2||p.fig)+'.</b> '+t(s.cap)+'</figcaption></figure>':'')
    +'</div>';
}
function formulasBody(bk,p){
  var c=bk.info[p.ci].c;
  return '<h2 class="ph">'+t(U.formulaPage)+'</h2><div class="fbox">'
    +c.formulas.map(function(f){return '<div class="frow"><div class="fl">'+t(f[0])+'</div><div class="fx">'+f[1]+'</div></div>'}).join('')+'</div>';
}
function examplesBody(bk,p){
  return '<h2 class="ph">'+t(U.examples)+'</h2><div class="exs">'
    +p.items.map(function(it){
      return '<article class="ex"><div class="exh"><b>'+t(U.exWord)+' '+it.no+'</b><span class="pill">'+t(U[it.x.lv])+'</span></div>'
        +'<div class="exq">'+t(it.x.q)+'</div><div class="sol-l">'+t(U.sol)+'</div><div class="exa">'+t(it.x.a)+'</div></article>';
    }).join('')+'</div>';
}
function revisionBody(bk,p){
  var c=bk.info[p.ci].c;
  return '<h2 class="ph">'+t(U.notesWord)+'</h2><div class="good notes-only"><ul>'
    +c.rev[lang].map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>';
}
function soonRow(no,title){return '<div class="tl soon"><span class="tn">'+no+'</span><span class="tx">'+title+'</span><span class="dots"></span><span class="pg">'+t(U.soon)+'</span></div>'}
function tocBody(bk){
  var base=bk.base, rows='';
  bk.info.forEach(function(r){
    rows+=r.pending?soonRow(r.no,t(r.c.title)):tlRow(numHref(base,r.start),r.no,'',t(r.c.title),r.start,isDone(r.c.id));
  });
  return '<h2 class="ph plain">'+t(U.contents)+'</h2>'+(rows?'<div class="tl-list">'+rows+'</div>':'<div class="mock-instructions"><b>'+t(U.soon)+'</b></div>');
}

function pageHTML(bk,idx){
  var p=bk.pages[idx], cls=bk.cls;
  var hd=BRAND+' · '+t(SUBJ[bk.sub])+' · '+t(CLS[cls].name);
  if(p.t==='cover'){
    return '<div class="cvwrap">'+coverHTML(cls,true,'',bk.sub)
      +'<div class="cvact">'+segHTML()+'</div>'
      +'<div class="cvact"><a class="btn pri" href="'+numHref(bk.base,1)+'">'+t(U.start)+'</a><a class="btn" href="#'+bk.base+'-toc">'+t(U.contents)+'</a></div></div>';
  }
  var odd, head, subj='', body;
  if(p.t==='toc'){
    odd=false; head=hd; body=tocBody(bk);
  }else{
    var c=bk.info[p.ci].c; subj=c.subject;
    odd=p.num%2===1;
    head=odd?t(c.title):hd;
    body=p.t==='opener'?openerBody(bk,p):p.t==='concept'?conceptBody(bk,p):p.t==='formulas'?formulasBody(bk,p):p.t==='examples'?examplesBody(bk,p):revisionBody(bk,p);
  }
  return '<div class="paper '+(odd?'odd':'even')+'"'+(subj?' data-subject="'+subj+'"':'')+'><div class="run"><span>'+head+'</span></div><div class="pbody">'+body+'</div><div class="pnum">'+p.label+'</div></div>';
}

/* ---------- views ---------- */
function home(){
  var shelf=[11,12].map(function(cls){
    return '<div class="bk">'+coverHTML(cls,false,'#c'+cls)
      +'<p class="meta">Physics · Chemistry · Maths</p>'
      +'<div class="btns"><a class="btn pri" href="#c'+cls+'">'+t(U.openBook)+'</a></div></div>';
  }).join('');
  shelf+='<div class="bk mock-book"><a href="#mock" class="coverlink"><div class="cover mockcover"><div class="cvtop">VENU JEE</div><div class="cvtitle">'+t(U.testWord)+'</div><div class="cvsub">JEE MAIN · JEE ADVANCED</div></div></a><p class="meta">'+t(U.testWord)+' · PYQs</p><div class="btns"><a class="btn pri" href="#mock">'+t(U.openBook)+'</a></div></div>';
  app.innerHTML='<div class="in"><section class="hero"><h1>'+brandHTML()+'</h1><p>'+t(U.heroP)+'</p></section><div class="shelf">'+shelf+'</div></div>';
}
function classView(cls){
  var shelf=SUBS.map(function(sub){
    var bk=book(cls,sub), saved=LS.get('venu.last.'+bk.base)||'', mm=new RegExp('^'+bk.base+'-p(\\d+)$').exec(saved), cont='';
    if(mm&&+mm[1]>=1&&+mm[1]<=bk.total){cont='<a class="btn" href="#'+saved+'">'+t(U.contin)+' '+mm[1]+'</a>'}
    return '<div class="bk" data-subject="'+sub+'">'+coverHTML(cls,false,'#'+bk.base,sub)
      +'<p class="meta">'+(bk.chs.filter(function(c){return !c.pending}).length?bk.chs.filter(function(c){return !c.pending}).length+' '+t(U.chaptersN):t(U.soon))+'</p>'
      +'<div class="btns"><a class="btn pri" href="#'+bk.base+'">'+t(U.openBook)+'</a>'+cont+'</div></div>';
  }).join('');
  pager.hidden=true; cur={book:false,prev:'',next:''};
  document.body.removeAttribute('data-subject');
  app.innerHTML='<div class="in"><p class="crumb"><a href="#home">‹ '+t(U.homeWord)+'</a></p><section class="hero"><h1>'+brandHTML()+' · '+t(CLS[cls].name)+'</h1><p>'+t(U.pickBook)+'</p></section><div class="shelf">'+shelf+'</div>'
    +'</div>';
}

function setPager(bk,idx){
  var last=bk.pages.length-1, pp=bk.pages[idx];
  var chapterEnd=pp.t==='notes';
  var prev=idx>0?pHref(bk,idx-1):'', next=chapterEnd?'#'+bk.base+'-toc':(idx<last?pHref(bk,idx+1):'#'+bk.base+'-toc');
  var a=document.getElementById('pg-prev'), m=document.getElementById('pg-mid'), n=document.getElementById('pg-next');
  a.textContent='‹ '+t(U.prev); a.setAttribute('href',prev||'#c'+bk.cls); a.setAttribute('aria-disabled',String(!prev));
  n.textContent=(chapterEnd?t(U.chapterIndex):t(U.nxt))+' ›'; n.setAttribute('href',next);
  var label=idx===0?t(U.cover):idx===1?t(U.contents):t(U.pageWord)+' '+pp.num+' / '+bk.total;
  var sub=idx>=2?t(bk.info[pp.ci].c.title):t(SUBJ[bk.sub])+' · '+t(CLS[bk.cls].name);
  m.innerHTML='<span class="pl">'+label+'</span><small>'+sub+'</small>';
  m.setAttribute('href','#'+bk.base+'-toc');
  pager.hidden=false;
  cur={book:true,prev:prev,next:next};
}

function bookView(cls,sub,which,numStr,anim){
  var bk=book(cls,sub), idx=0;
  if(which==='toc'){idx=1}else if(numStr){var nn=+numStr;if(nn>=1&&nn<=bk.total){idx=nn+1}}
  document.body.removeAttribute('data-subject');
  app.innerHTML='<div class="in page"><div class="pagehome"><a href="#home">⌂ '+t(U.homeWord)+'</a></div>'+pageHTML(bk,idx)+'</div>';
  if(window.mount3d)window.mount3d(app);
  setPager(bk,idx);
  if(idx>=2){LS.set('venu.last.'+bk.base,bk.base+'-p'+bk.pages[idx].num)}
  if(anim&&!reduce){var pp=app.querySelector('.paper');if(pp){pp.classList.add('turn')}}
}

function testView(cls,psub){
  pager.hidden=true;
  app.innerHTML='<div class="in test"><h1>'+t(U.testWord)+' · '+t(CLS[cls].name)+'</h1><div class="mock-instructions"><b>'+t(U.soon)+'</b><p>'+t(U.noQ)+'</p></div></div>';
}

/* ---------- routing ---------- */
function route(anim,top){
  var h=location.hash.slice(1), m;
  if((m=/^b(11|12)-(physics|chemistry|maths)(?:-(toc|p(\d+)))?$/.exec(h))){
    bookView(+m[1],m[2],m[3]==='toc'?'toc':'',m[4],anim);
    }else if((m=/^t(11|12)(?:-(physics|chemistry|maths))?$/.exec(h))){
    testView(+m[1],m[2]||'');
  }else if((m=/^c(11|12)(?:-.*)?$/.exec(h))){
    classView(+m[1]);
  }else{
    pager.hidden=true; cur={book:false,prev:'',next:''};
    home();
  }
  if(top){window.scrollTo(0,0)}
}
function syncSeg(){
  var hb=document.getElementById('homebtn');
  if(hb){var hh=location.hash.slice(1);hb.textContent='\u2302 '+t(U.homeWord);hb.hidden=(hh===''||hh==='home')}
  var bs=document.querySelectorAll('[data-lang]');
  for(var i=0;i<bs.length;i++){bs[i].setAttribute('aria-pressed',String(bs[i].getAttribute('data-lang')===lang))}
  document.documentElement.lang=lang;
}
function go(href){
  if(!href)return;
  var target=href.charAt(0)==='#'?href.slice(1):href;
  if(!target)return;
  if(location.hash.slice(1)===target){route(true,true);syncSeg();return}
  location.hash=target;
}

window.addEventListener('venu:languagechange',function(){
  var h=location.hash.slice(1);
  if(/^(mock|mock-|mock11|mock12|pyq|instructions)/.test(h)){syncSeg();return}
  var y=window.scrollY;route(false,false);syncSeg();window.scrollTo(0,y);
});
app.addEventListener('click',function(e){
  var d=e.target.closest('[data-done]');
  if(d){var on=toggleDone(d.getAttribute('data-done'));d.setAttribute('aria-pressed',String(on));d.textContent=on?t(U.marked):t(U.mark);}
});
var tx=0,ty=0,tok=false;
app.addEventListener('touchstart',function(e){
  if(!e.touches||!e.touches.length)return;
  var target=e.target,p0=e.touches[0];tx=p0.clientX;ty=p0.clientY;
  tok=!!(target&&target.closest)&&!target.closest('a,button,input,textarea,select,.fx,.eq,.mx,.dt,.d3');
},{passive:true});
app.addEventListener('touchend',function(e){
  if(!tok||!cur.book||!e.changedTouches||!e.changedTouches.length){tok=false;return}
  var p1=e.changedTouches[0],dx=p1.clientX-tx,dy=p1.clientY-ty;
  tok=false;
  if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.25){go(dx<0?cur.next:cur.prev)}
},{passive:true});
app.addEventListener('touchcancel',function(){tok=false},{passive:true});
pager.addEventListener('click',function(e){
  var target=e.target&&e.target.closest?e.target.closest('#pg-prev,#pg-next,#pg-mid'):null;
  if(!target)return;
  var href=target.getAttribute('href');
  if(!href||href==='#')return;
  e.preventDefault();
  go(href);
});
document.addEventListener('keydown',function(e){
  if(!cur.book)return;
  var tg=e.target&&e.target.tagName;
  if(tg==='INPUT'||tg==='TEXTAREA')return;
  if(e.key==='ArrowRight'){go(cur.next)}
  if(e.key==='ArrowLeft'){go(cur.prev)}
});
window.addEventListener('hashchange',function(){route(true,true);syncSeg()});

syncSeg();
route(false,false);

// Expose the existing chapter/test data to the separate Mock Test navigation layer.
window.VENU_TESTS={11:[],12:[]};
window.VENU_CHBY=CHBY;
window.VENU_CHAPTERS=classChapters(11).concat(classChapters(12)).map(function(c){return {id:c.id,cls:c.cls,subject:c.subject,title:c.title,pending:true};});

})();
