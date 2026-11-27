// UI strings, shared helpers and initial diagram registry

(function(){
"use strict";
var B=function(en,hi){return {en:en,hi:hi}};
var S=function(x){return {en:x,hi:x}};
var F=function(n,d){return '<span class="fr"><span>'+n+'</span><span>'+d+'</span></span>'};
var R=function(x){return '<span class="sq">√<span>'+x+'</span></span>'};
var SP='&emsp;';

/* ---------- UI strings ---------- */
var U={
  heroH:B('JEE notes, chapter by chapter','JEE नोट्स, चैप्टर दर चैप्टर'),
  heroP:B('Formulas, diagrams and solved examples in Hindi and English. Switch the language any time from the top.','सूत्र, चित्र और हल किए गए उदाहरण, हिंदी और अंग्रेज़ी दोनों में। भाषा ऊपर से कभी भी बदलो।'),
  search:B('Search chapters','चैप्टर खोजो'),
  all:B('All','सभी'),
  none:B('No chapter matches your search.','तुम्हारी खोज से कोई चैप्टर नहीं मिला।'),
  soon:B('More chapters are being added.','और चैप्टर जोड़े जा रहे हैं।'),
  back:B('All chapters','सभी चैप्टर'),
  concepts:B('Concepts','अवधारणाएँ'),
  formulas:B('Key formulas','मुख्य सूत्र'),
  examples:B('Solved examples','हल किए गए उदाहरण'),
  revision:B('Quick revision','त्वरित दोहराव'),
  mistakes:B('Common mistakes','आम गलतियाँ'),
  show:B('Show solution','हल देखो'),
  easy:B('Easy','आसान'),
  medium:B('Medium','मध्यम'),
  hard:B('Hard','कठिन'),
  board:B('Board Level','बोर्ड स्तर'),
  fnd:B('NCERT / Foundation','NCERT / आधार स्तर'),
  main:B('JEE Main','JEE Main'),
  adv:B('JEE Advanced','JEE Advanced'),
  mark:B('Mark as revised','दोहराया हुआ चिह्नित करो'),
  marked:B('Revised ✓','दोहरा लिया ✓'),
  next:B('Next chapter','अगला चैप्टर'),
  done:B('Revised','दोहराया हुआ')
};
var SUBJ={
  physics:B('Physics','भौतिकी'),
  chemistry:B('Chemistry','रसायन विज्ञान'),
  maths:B('Maths','गणित')
};

/* ---------- Diagrams ---------- */
var sx=function(l,a,b){return l==='hi'?b:a};
var VY='v<tspan dy="3" font-size="8.5">y</tspan><tspan dy="-3"> = 0</tspan>';
var NA='N<tspan dy="3" font-size="8.5">A</tspan>';
function blocks(cx,n,cls){var o='';for(var k=0;k<n;k++){o+='<rect class="'+cls+'" x="'+(cx-15)+'" y="'+(150-19*(k+1))+'" width="30" height="16" rx="3"/>'}return o}

var DG=window.VENU_DG;// Topic-specific 2D diagrams are added only from supplied PDFs.

/* Paired 2D companion drawings for every interactive 3D model. Labels are bilingual. */
function diagram2D(name,l){
 var T=function(locale,en,hi){return locale==='hi'?hi:en};
 var data={
  states:[['Solid','ठोस'],['Liquid','द्रव'],['Gas','गैस']],
  classify:[['Pure substance','शुद्ध पदार्थ'],['Element / compound','तत्व / यौगिक'],['Mixture','मिश्रण']],
  co2:[['Carbon atom','कार्बन परमाणु'],['Oxygen atoms','ऑक्सीजन परमाणु'],['CO₂ molecule','CO₂ अणु']],
  gasvol:[['N₂: 1 volume','N₂: 1 आयतन'],['H₂: 3 volumes','H₂: 3 आयतन'],['NH₃: 2 volumes','NH₃: 2 आयतन']],
  isotopes:[['³⁵Cl: 17p, 18n','³⁵Cl: 17p, 18n'],['³⁷Cl: 17p, 20n','³⁷Cl: 17p, 20n'],['Same atomic number','समान परमाणु क्रमांक']],
  molemap:[['Mass (g)','द्रव्यमान (g)'],['Moles (n)','मोल (n)'],['Particles (N)','कण (N)']],
  water:[['Oxygen atom','ऑक्सीजन परमाणु'],['Hydrogen atoms','हाइड्रोजन परमाणु'],['104.5° bond angle','104.5° बंध कोण']],
  limiting:[['N₂: excess','N₂: आधिक्य'],['H₂: limiting','H₂: सीमांत'],['NH₃: product','NH₃: उत्पाद']],
  dilution:[['Concentrated solution','सांद्र विलयन'],['Add solvent','विलायक मिलाएँ'],['Dilute solution','तनु विलयन']],
  titration:[['Burette: titrant','ब्यूरेट: अनुमापक'],['Conical flask: analyte','शंक्वाकार फ्लास्क: विश्लेष्य'],['End point / indicator','अंतिम बिंदु / सूचक']],
  eudio:[['Gas burette','गैस ब्युरेट'],['Absorption pipette','अवशोषण पिपेट'],['Volume change','आयतन परिवर्तन']],
  dissoc:[['N₂O₄: colourless','N₂O₄: रंगहीन'],['2 NO₂: brown','2 NO₂: भूरा'],['Equilibrium ⇌','साम्यावस्था ⇌']],
  solidangle:[['Area A','क्षेत्रफल A'],['Radius r','त्रिज्या r'],['Ω = A / r²','Ω = A / r²']],
  parsec:[['Baseline','आधार रेखा'],['Parallax angle','लंबन कोण'],['Distance: 1 pc','दूरी: 1 pc']],
  drop:[['Surface tension','पृष्ठ तनाव'],['Oscillating drop','दोलित बूँद'],['Restoring force','पुनर्स्थापक बल']],
  string:[['Fixed end','स्थिर सिरा'],['Node / antinode','निस्पंद / प्रस्पंद'],['Wavelength λ','तरंगदैर्ध्य λ']],
  terminal:[['Weight mg','भार mg'],['Buoyant force','उत्प्लावन बल'],['Drag: 6πηrv','प्रतिरोध: 6πηrv']],
  target:[['Accurate','यथार्थ'],['Precise','परिशुद्ध'],['Random scatter','यादृच्छिक फैलाव']],
  pendulum:[['Support / pivot','आधार / धुरी'],['Length L, bob','लंबाई L, गोलक'],['Time period T','आवर्तकाल T']],
  vernier:[['Fixed jaw + inside jaws','स्थिर जबड़ा + आंतरिक जबड़े'],['Main scale + sliding vernier','मुख्य पैमाना + चल वर्नियर'],['Object + depth rod + lock','वस्तु + गहराई छड़ + लॉक']],
  vzero:[['Main zero','मुख्य शून्य'],['Vernier zero offset','वर्नियर शून्य विस्थापन'],['Signed zero correction','चिह्न सहित शून्य संशोधन']],
  screw:[['Anvil + object + spindle','एनविल + वस्तु + स्पिंडल'],['Sleeve / main scale','स्लीव / मुख्य पैमाना'],['Thimble + ratchet','थिम्बल + रैचेट']],
  szero:[['Reference line','संदर्भ रेखा'],['Circular scale zero','वृत्ताकार पैमाना शून्य'],['Zero error sign','शून्य त्रुटि का चिह्न']],
  setelem:[['Set A','समुच्चय A'],['Elements a, b, c','अवयव a, b, c'],['Membership ∈','सदस्यता ∈']],
  numsets:[['N: Natural','N: प्राकृतिक'],['Z, Q: Integers / rational','Z, Q: पूर्णांक / परिमेय'],['R: Real numbers','R: वास्तविक संख्याएँ']],
  powercube:[['∅: none selected','∅: कोई नहीं'],['{a}, {b}: singletons','{a}, {b}: एकल समुच्चय'],['{a,b,c}: full set','{a,b,c}: पूरा समुच्चय']],
  intervals:[['Open: (a,b)','खुला: (a,b)'],['Closed: [a,b]','बंद: [a,b]'],['Half-open: [a,b)','अर्ध-खुला: [a,b)']],
  venn:[['Universal set U','सार्वत्रिक समुच्चय U'],['Set A','समुच्चय A'],['Set B','समुच्चय B']],
  setops:[['Union A ∪ B','संघ A ∪ B'],['Intersection A ∩ B','प्रतिच्छेद A ∩ B'],['Difference A − B','अंतर A − B']],
  threesets:[['A only','केवल A'],['A ∩ B ∩ C','A ∩ B ∩ C'],['Seven Venn regions','वेन के सात क्षेत्र']],
  juice:[['Mango: 180','आम: 180'],['Orange: 150','संतरा: 150'],['Both / neither','दोनों / कोई नहीं']],
  fourchoice:[['Include element','अवयव शामिल'],['Exclude element','अवयव छोड़ें'],['2ⁿ subsets','2ⁿ उपसमुच्चय']]
 };
 var d=data[name]||[[name,'मॉडल'],['Part / region','भाग / क्षेत्र'],['Measurement / relation','मापन / संबंध']];
 var labs=d.map(function(x){return esc(l==='hi'?x[1]:x[0])});
 var isChem=['states','classify','gasvol','limiting'].indexOf(name)>=0;
 if(name==='vernier'||name==='vzero'){
  var mt='',vt='',labels='';
  for(var i=0;i<=50;i++){var x=95+i*8.5;mt+='<path d="M'+x.toFixed(1)+' 92v'+(i%10===0?19:i%5===0?14:8)+'" stroke="#334155" stroke-width="1.4"/>'}
  for(var j=0;j<=10;j++){var vx=95+3.27*85+j*7.65;vt+='<path d="M'+vx.toFixed(1)+' 128v'+(j===7?24:14)+'" stroke="'+(j===7?'#d97706':'#2563eb')+'" stroke-width="'+(j===7?3:1.6)+'"/>'}
  for(var k=0;k<=5;k++)labels+='<text x="'+(95+k*85)+'" y="82" text-anchor="middle">'+k+'</text>';
  return '<svg class="diagram2d" viewBox="0 0 640 250" role="img" aria-label="'+esc(l==='hi'?'वर्नियर कैलिपर्स: 10 वर्नियर भाग 9 मुख्य भाग के बराबर':'Vernier caliper: 10 vernier divisions equal 9 main divisions')+'"><rect x="85" y="88" width="450" height="27" rx="4" fill="#cbd5e1" stroke="#475569"/><path d="M85 101H535" stroke="#475569" stroke-width="2"/>'+mt+'<g font-size="11" fill="#111827">'+labels+'</g><rect x="'+(95+3.27*85-8).toFixed(1)+'" y="119" width="93" height="28" rx="3" fill="#dbeafe" stroke="#2563eb"/>'+vt+'<path d="M95 88V35h17v53M95 115v72h17v-72M'+(95+3.27*85-8).toFixed(1)+' 119V45h16v74M'+(95+3.27*85+85).toFixed(1)+' 147v40h16v-40" fill="none" stroke="#475569" stroke-width="6"/><path d="M'+(95+3.27*85+7*7.65).toFixed(1)+' 151v22" stroke="#d97706" stroke-width="2"/><g font-size="12" fill="#111827" font-weight="600"><text x="105" y="25">'+labs[0]+'</text><text x="265" y="39">'+labs[1]+'</text><text x="430" y="205">'+labs[2]+'</text><text x="300" y="232">'+esc(l==='hi'?'10 VSD = 9 MSD · LC = 0.01 cm · VSR = 7':'10 VSD = 9 MSD · LC = 0.01 cm · VSR = 7')+'</text></g><text x="'+(95+3.27*85+7*7.65+12).toFixed(1)+'" y="174" font-size="11" fill="#d97706">7</text></svg>';
 }
 if(name==='screw'||name==='szero'){
  var mt='';for(var j=0;j<18;j++){var tx=270+j*13;mt+='<path d="M'+tx+' 75v'+(j%3===0?22:11)+'" stroke="#334155" stroke-width="1.5"/>'}
  return '<svg class="diagram2d" viewBox="0 0 640 220" role="img" aria-label="'+esc(l==='hi'?'स्क्रू गेज के नामांकित भाग':'Labelled micrometer screw gauge schematic')+'"><path d="M155 45H405M155 45V178H405" stroke="#64748b" stroke-width="22" fill="none" stroke-linecap="round"/><rect x="185" y="84" width="44" height="50" rx="6" fill="#fbbf24" stroke="#92400e"/><path d="M229 109H300" stroke="#0f766e" stroke-width="12"/><path d="M300 109H430" stroke="#475569" stroke-width="10"/><rect x="390" y="67" width="125" height="85" rx="15" fill="#f9a8d4" stroke="#9d174d" stroke-width="2"/>'+mt+'<rect x="515" y="89" width="45" height="40" rx="8" fill="#94a3b8" stroke="#334155"/><path d="M235 109H292" stroke="#16a34a" stroke-width="6"/><g font-size="12" fill="#111827" font-weight="600"><text x="175" y="29">'+labs[0]+'</text><text x="265" y="59">'+labs[1]+'</text><text x="425" y="178">'+labs[2]+'</text><text x="260" y="202">'+esc(l==='hi'?'पिच · वृत्ताकार भाग · अल्पतमांक':'Pitch · circular divisions · least count')+'</text></g></svg>';
 }
 if(name==='titration'){
  return '<svg class="diagram2d" viewBox="0 0 640 220" role="img" aria-label="'+esc(l==='hi'?'अनुमापन उपकरण':'Titration apparatus')+'"><path d="M105 22v175m-42 0h84m-42-155h180" stroke="#64748b" stroke-width="7" fill="none"/><rect x="225" y="25" width="22" height="105" rx="4" fill="#dbeafe" stroke="#2563eb"/><path d="M236 130v22m-5 -5 5 5 5 -5" stroke="#2563eb" stroke-width="3" fill="none"/><path d="M205 160h62l-22 45h-18z" fill="#dbeafe" fill-opacity=".65" stroke="#2563eb" stroke-width="2"/><path d="M210 190h52" stroke="#db2777" stroke-width="5"/><g font-size="12" fill="#111827" font-weight="600"><text x="255" y="30">'+labs[0]+'</text><text x="285" y="95">'+labs[1]+'</text><text x="300" y="185">'+labs[2]+'</text><text x="50" y="215">'+esc(l==='hi'?'स्टैंड और क्लैम्प':'Stand and clamp')+'</text></g></svg>';
 }
 if(name==='eudio'){
  return '<svg class="diagram2d" viewBox="0 0 640 220" role="img" aria-label="'+esc(l==='hi'?'गैस विश्लेषण उपकरण':'Gas analysis apparatus')+'"><rect x="105" y="25" width="80" height="165" rx="10" fill="#dbeafe" fill-opacity=".3" stroke="#2563eb" stroke-width="3"/><path d="M115 125h60v55h-60z" fill="#7dd3fc" fill-opacity=".45"/><path d="M145 25v-12m-10 12h20" stroke="#2563eb" stroke-width="3"/><path d="M185 75h95v50h-95" fill="none" stroke="#64748b" stroke-width="4"/><rect x="285" y="60" width="130" height="90" rx="18" fill="#dbeafe" fill-opacity=".35" stroke="#2563eb" stroke-width="3"/><g font-size="12" fill="#111827" font-weight="600"><text x="145" y="15" text-anchor="middle">'+labs[0]+'</text><text x="350" y="45" text-anchor="middle">'+labs[1]+'</text><text x="350" y="175" text-anchor="middle">'+labs[2]+'</text></g></svg>';
 }
 if(name==='dilution'){
  return '<svg class="diagram2d" viewBox="0 0 640 220" role="img" aria-label="'+esc(l==='hi'?'बीकर में तनुकरण':'Dilution in a beaker')+'"><path d="M105 45h120l-12 140q-2 12-12 12h-72q-10 0-12-12z" fill="#dbeafe" fill-opacity=".35" stroke="#2563eb" stroke-width="3"/><path d="M112 125h106l-4 60h-98z" fill="#60a5fa" fill-opacity=".4"/><path d="M290 45h120l-12 140q-2 12-12 12h-72q-10 0-12-12z" fill="#dbeafe" fill-opacity=".35" stroke="#2563eb" stroke-width="3"/><path d="M297 95h106l-6 90h-94z" fill="#60a5fa" fill-opacity=".35"/><path d="M235 110h45m-9 -7 9 7 -9 7" stroke="#111827" stroke-width="2" fill="none"/><g fill="#dc2626"><circle cx="140" cy="140" r="5"/><circle cx="165" cy="155" r="5"/><circle cx="190" cy="138" r="5"/><circle cx="320" cy="120" r="5"/><circle cx="350" cy="155" r="5"/><circle cx="380" cy="105" r="5"/></g><g font-size="12" fill="#111827" font-weight="600"><text x="165" y="25" text-anchor="middle">'+labs[0]+'</text><text x="350" y="25" text-anchor="middle">'+labs[1]+'</text><text x="260" y="95" text-anchor="middle">'+esc(l==='hi'?'विलायक मिलाएँ':'Add solvent')+'</text><text x="350" y="210" text-anchor="middle">'+labs[2]+'</text></g></svg>';
 }
 if(name==='co2'){
  return '<svg class="diagram2d" viewBox="0 0 640 190" role="img" aria-label="'+esc(l==='hi'?'CO₂ अणु का 2D आरेख':'CO2 molecule 2D diagram')+'"><path d="M190 92H265m-10 -8 10 8 -10 8M375 92H450m-10 -8 10 8 -10 8" stroke="#334155" stroke-width="5" fill="none"/><circle cx="160" cy="92" r="36" fill="#ef4444"/><circle cx="320" cy="92" r="42" fill="#64748b"/><circle cx="480" cy="92" r="36" fill="#ef4444"/><g font-size="20" font-weight="700" text-anchor="middle" fill="#fff"><text x="160" y="99">O</text><text x="320" y="99">C</text><text x="480" y="99">O</text></g><g font-size="13" font-weight="600" fill="#111827" text-anchor="middle"><text x="160" y="150">'+labs[1]+'</text><text x="320" y="150">'+labs[0]+'</text><text x="480" y="150">'+labs[2]+'</text></g></svg>';
 }
 if(name==='water'){
  return '<svg class="diagram2d" viewBox="0 0 640 190" role="img" aria-label="'+esc(l==='hi'?'जल अणु का 2D आरेख':'Water molecule 2D diagram')+'"><path d="M320 85L230 145M320 85L410 145" stroke="#334155" stroke-width="8" stroke-linecap="round"/><circle cx="320" cy="75" r="40" fill="#ef4444"/><circle cx="220" cy="150" r="27" fill="#2563eb"/><circle cx="420" cy="150" r="27" fill="#2563eb"/><g font-size="20" font-weight="700" text-anchor="middle" fill="#fff"><text x="320" y="82">O</text><text x="220" y="157">H</text><text x="420" y="157">H</text></g><text x="320" y="28" font-size="14" fill="#111827" text-anchor="middle" font-weight="700">'+labs[2]+'</text><text x="320" y="185" font-size="12" fill="#111827" text-anchor="middle">'+labs[0]+' · '+labs[1]+'</text></svg>';
 }
 if(name==='isotopes'){
  return '<svg class="diagram2d" viewBox="0 0 640 190" role="img" aria-label="'+esc(l==='hi'?'क्लोरीन समस्थानिकों का 2D आरेख':'Chlorine isotope 2D diagram')+'"><circle cx="190" cy="90" r="58" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><circle cx="450" cy="90" r="58" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><g fill="#ef4444"><circle cx="170" cy="75" r="8"/><circle cx="190" cy="75" r="8"/><circle cx="210" cy="75" r="8"/><circle cx="170" cy="95" r="8"/><circle cx="190" cy="95" r="8"/><circle cx="210" cy="95" r="8"/></g><g fill="#64748b"><circle cx="430" cy="75" r="8"/><circle cx="450" cy="75" r="8"/><circle cx="470" cy="75" r="8"/><circle cx="430" cy="95" r="8"/><circle cx="450" cy="95" r="8"/><circle cx="470" cy="95" r="8"/><circle cx="450" cy="115" r="8"/></g><g font-size="13" font-weight="700" fill="#111827" text-anchor="middle"><text x="190" y="170">'+labs[0]+'</text><text x="450" y="170">'+labs[1]+'</text><text x="320" y="30">'+labs[2]+'</text></g></svg>';
 }
 if(name==='dissoc'){
  return '<svg class="diagram2d" viewBox="0 0 640 190" role="img" aria-label="'+esc(l==='hi'?'वियोजन का 2D आरेख':'Dissociation 2D diagram')+'"><circle cx="145" cy="90" r="30" fill="#2563eb"/><circle cx="190" cy="90" r="25" fill="#ef4444"/><circle cx="100" cy="90" r="25" fill="#ef4444"/><path d="M240 90H350m-12 -9 12 9 -12 9" stroke="#334155" stroke-width="3" fill="none"/><g fill="#ef4444"><circle cx="415" cy="90" r="25"/><circle cx="505" cy="90" r="25"/></g><g fill="#2563eb"><circle cx="460" cy="90" r="30"/><circle cx="550" cy="90" r="30"/></g><text x="190" y="160" text-anchor="middle" font-size="13" fill="#111827">'+labs[0]+'</text><text x="485" y="160" text-anchor="middle" font-size="13" fill="#111827">'+labs[1]+'</text><text x="320" y="30" text-anchor="middle" font-size="13" fill="#111827">'+labs[2]+'</text></svg>';
 }
 if(isChem){
  var particles='';for(var be=0;be<3;be++){for(var k=0;k<6;k++){var px=85+be*205+(k%3)*18,py=76+Math.floor(k/3)*25;particles+='<circle cx="'+px+'" cy="'+py+'" r="5" fill="'+(be===0?'#2563eb':be===1?'#e879f9':'#f59e0b')+'" stroke="#fff" stroke-width="1"/>'}}
  return '<svg class="diagram2d" viewBox="0 0 640 220" role="img" aria-label="'+esc(l==='hi'?'रसायन का नामांकित 2D कण आरेख':'Labelled chemistry particle and glassware diagram')+'"><g fill="#dbeafe" fill-opacity=".35" stroke="#2563eb" stroke-width="2"><path d="M65 48h95l-10 118q-3 12-15 12H90q-12 0-15-12z"/><path d="M270 48h95l-10 118q-3 12-15 12h-45q-12 0-15-12z"/><path d="M475 48h95l-10 118q-3 12-15 12h-45q-12 0-15-12z"/></g><path d="M76 118h73M281 118h73M486 118h73" stroke="#0ea5e9" stroke-width="2"/>'+particles+'<g font-size="12" fill="#111827" font-weight="600"><text x="112" y="28" text-anchor="middle">'+labs[0]+'</text><text x="317" y="28" text-anchor="middle">'+labs[1]+'</text><text x="522" y="28" text-anchor="middle">'+labs[2]+'</text><text x="112" y="205" text-anchor="middle">'+esc(l==='hi'?'काँच का पात्र':'Glass vessel')+'</text><text x="317" y="205" text-anchor="middle">'+esc(l==='hi'?'कण / विलयन':'Particles / solution')+'</text><text x="522" y="205" text-anchor="middle">'+esc(l==='hi'?'अवस्था / उत्पाद':'State / product')+'</text></g></svg>';
 }
 return '<svg class="diagram2d" viewBox="0 0 640 190" role="img" aria-label="'+esc(l==='hi'?'नामांकित 2D अवधारणा आरेख':'Labelled 2D concept diagram')+'"><g stroke="#64748b" stroke-width="2" fill="none"><path d="M205 92H245m-9 -7 9 7 -9 7M405 92H445m-9 -7 9 7 -9 7"/></g>'+labs.map(function(v,i){var x=25+i*205;return '<rect x="'+x+'" y="45" width="170" height="95" rx="12" fill="'+(i===0?'#dbeafe':i===1?'#dcfce7':'#fef3c7')+'" stroke="'+(i===0?'#2563eb':i===1?'#16a34a':'#d97706')+'" stroke-width="2"/><circle cx="'+(x+85)+'" cy="72" r="10" fill="'+(i===0?'#2563eb':i===1?'#16a34a':'#d97706')+'"/><text x="'+(x+85)+'" y="110" text-anchor="middle" font-size="12" font-weight="600" fill="#111827">'+v+'</text>'}).join('')+'</svg>';
}

/* ---------- Content ---------- */

// Chapter data registry
var CH=window.VENU_CHAPTERS_DATA;

// Empty topic-model registry. New PDF-derived model modules will register here.
var D3={}, D3ATT={};

// Shared registries are created by src/visuals/engines/registry.js.
var D3=window.VENU_D3, D3ATT=window.VENU_D3ATT;










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
