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







var c=CH.filter(function(x){return x.id==='chemistry-mole-concept'})[0];



})();

// Class 11 Chemistry — Ch 1 — PART 3 of 3: sections 1.11–1.14, examples 22–23, 3D animations 11–12, formula sheet
(function(){
var T=VH.T,mol=VH.mol,wire=VH.wire,B=function(e,h){return {en:e,hi:h}};





var c=CH.filter(function(x){return x.id==='chemistry-mole-concept'})[0];





c.rev.en.push('Molarity uses solution; molality uses solvent.','Do not choose the limiting reagent by mass; use moles / coefficient.','Balance the equation before using mole ratios.','The n-factor depends on the reaction.');
c.rev.hi.push('मोलरता में विलयन, मोललता में विलायक।','सीमांत अभिकर्मक द्रव्यमान से नहीं, मोल / गुणांक से चुनो।','मोल अनुपात लगाने से पहले समीकरण संतुलित करो।','n-गुणक अभिक्रिया पर निर्भर करता है।');
})();
})();
