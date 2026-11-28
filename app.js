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

/* 2D diagram renderer is loaded from src/visuals/diagrams/diagram-renderer.js. */
/* ---------- Content ---------- */

// Chapter data registry
var CH=window.VENU_CHAPTERS_DATA;
var DG=window.VENU_DG;

// Empty topic-model registry. New PDF-derived model modules will register here.
// Shared registries are created by src/visuals/engines/registry.js.
var D3=window.VENU_D3, D3ATT=window.VENU_D3ATT;
















// The book and route controller is loaded from src/features/books/navigation.js.
window.VENU_RUNTIME={get lang(){return lang},get U(){return U},get reduce(){return window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches},t:function(o){if(o==null){console.warn('Venu JEE: missing bilingual text value');return '';}if(typeof o==='string')return o;return o[lang]||o.en||o.hi||''},esc:function(s){return String(s).replace(/[&<>"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]})}};
window.VENU_RUNTIME.B=B; window.VENU_RUNTIME.S=S; window.VENU_RUNTIME.F=F; window.VENU_RUNTIME.R=R; window.VENU_RUNTIME.SP=SP; window.VENU_RUNTIME.SUBJ=SUBJ; window.VENU_RUNTIME.CH=CH; window.VENU_RUNTIME.D3=D3; window.VENU_RUNTIME.D3ATT=D3ATT; window.VENU_RUNTIME.DG=DG; window.VENU_RUNTIME.LS=LS; window.VENU_RUNTIME.diagram2D=window.diagram2D;
})();
