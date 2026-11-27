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
 var photos=window.VENU_PHOTOS||{};;
 var find=function(a,needle){return a.filter(function(s){return s.h.en.indexOf(needle)>-1})[0]};
 var v=find(phys.sections,'Vernier calipers'), sg=find(phys.sections,'Screw gauge'), ti=find(chem.sections,'Law of equivalence');
 if(v)v.photo=photos.vernier;if(sg)sg.photo=photos.screw;if(ti)ti.photo=photos.titration;
 /* New explanations and 2D visual summaries for topics that previously had only brief coverage. */
 
 
 
 /* Chemistry Ch. 1: additional depth, practical method and dedicated Board-level solved set. */
 
 
 
 chem.rev.en.push('For addition/subtraction use decimal places; for multiplication/division use significant figures.','Balance equations before using mole ratios.','A volumetric flask is filled to final solution volume, not solvent volume.','For dilution, V₂ is final solution volume.');
 chem.rev.hi.push('जोड़/घटाव में दशमलव स्थान और गुणा/भाग में सार्थक अंक देखो।','मोल अनुपात लगाने से पहले समीकरण संतुलित करो।','वॉल्यूमेट्रिक फ्लास्क में अंतिम विलयन आयतन भरो, केवल विलायक नहीं।','तनुकरण में V₂ अंतिम विलयन आयतन है।');

  /* Bilingual 2D diagrams for important sections without an existing 3D model. */
  var assignDiagram=function(ch,needle,key){var s=find(ch.sections,needle);if(s&&!s.d3)s.dg=key};
  assignDiagram(math,'1.3 Types of sets','settypes');assignDiagram(math,'1.8 Laws of set algebra','setlaws');assignDiagram(math,'1.9 Cardinality','setcardinality');
  assignDiagram(chem,'1.3 Laws of chemical combination','chemcomb');assignDiagram(chem,'1.5 The mole concept','moleflow');assignDiagram(chem,'1.6 Percentage composition and formula','empirical');assignDiagram(chem,'1.7.1 Limiting reagent','limitingflow');assignDiagram(chem,'1.8 Concentration terms','concentration');assignDiagram(chem,'1.17 Preparing solutions','solutionprep');
  assignDiagram(phys,'1.2 SI system of units','siunits');assignDiagram(phys,'1.4 Dimensions','physdims');assignDiagram(phys,'1.8 Significant figures','physigfig');assignDiagram(phys,'1.9 Errors in measurement','physerrors');
  
  

})();
})();
