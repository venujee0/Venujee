(function(){
'use strict';
var CH=window.VENU_CHAPTERS_DATA,DG=window.VENU_DG;
var B=function(en,hi){return {en:en,hi:hi}};
var esc=function(s){return String(s).replace(/[&<>\"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]})};
var find=function(a,needle){return a.filter(function(s){return s.h.en.indexOf(needle)>-1})[0]};
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
 
 
 
 /* Chemistry Ch. 1: additional depth, practical method and dedicated Board-level solved set. */
 
 
 
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
  
  

})();
})();
