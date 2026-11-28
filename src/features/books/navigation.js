(function(){
'use strict';
var rt=window.VENU_RUNTIME;
var B=rt.B,S=rt.S,F=rt.F,R=rt.R,SP=rt.SP,SUBJ=rt.SUBJ;
var CH=rt.CH,D3=rt.D3,D3ATT=rt.D3ATT,DG=rt.DG,LS=rt.LS,diagram2D=rt.diagram2D;
var U=rt.U,reduce=rt.reduce,esc=rt.esc,t=rt.t,lang=rt.lang;

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
var cur={book:false,prev:'',next:''};

function t(o){return o[lang]}
function ot(o){return (typeof o==='string')?o:o[lang]}
function getDone(){try{var a=JSON.parse(LS.get('venu.done')||'[]');return Array.isArray(a)?a:[]}catch(e){return []}}
function isDone(id){return getDone().indexOf(id)>-1}
function toggleDone(id){var a=getDone(),i=a.indexOf(id);if(i>-1){a.splice(i,1)}else{a.push(id)}LS.set('venu.done',JSON.stringify(a));return i===-1}

/* Class 11 topic data and diagram registration live in src/classes/class-11/content-extensions.js. */


var CHBY={};CH.forEach(function(c){CHBY[c.id]=c});


/* ---------- NCERT 2023 chapter plan (Class 11) ---------- */
var PLAN11={physics:[],chemistry:[],maths:[]};
var PLAN12={physics:[],chemistry:[],maths:[]};

/* ---------- book model ---------- */
var SUBS=['physics','chemistry','maths'];
var model=window.VENU_BOOK_MODEL({CH:CH,D3ATT:D3ATT,PLAN11:PLAN11,PLAN12:PLAN12,B:B,SUBS:SUBS});
var BOOKS=model.BOOKS,classChapters=model.classChapters,book=model.book,pHref=model.pHref,numHref=model.numHref;





var page=window.VENU_PAGE_RENDERER({CLS:CLS,SUBJ:SUBJ,U:U,MOTIF:MOTIF,BRAND:BRAND,lang:lang,t:t,esc:esc,diagram2D:diagram2D,DG:DG,isDone:isDone,numHref:numHref});
var coverHTML=page.coverHTML,segHTML=page.segHTML,tlRow=page.tlRow,openerBody=page.openerBody,conceptBody=page.conceptBody,formulasBody=page.formulasBody,examplesBody=page.examplesBody,revisionBody=page.revisionBody,soonRow=page.soonRow,tocBody=page.tocBody,pageHTML=page.pageHTML;
window.addEventListener('venu:languagechange',function(){lang=rt.lang;page.setLanguage(lang)});

/* ---------- pieces ---------- */

function esc(s){return String(s).replace(/[&<>"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]})}



/* ---------- page bodies ---------- */










/* ---------- views ---------- */



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
    window.VENU_CLASS_VIEW(+m[1],{app:app,pager:pager,cur:cur,SUBS:SUBS,book:book,LS:LS,t:t,U:U,coverHTML:coverHTML,brandHTML:brandHTML,CLS:CLS});
  }else{
    pager.hidden=true; cur={book:false,prev:'',next:''};
    window.VENU_HOME_VIEW({app:app,t:t,U:U,coverHTML:coverHTML,brandHTML:brandHTML});
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
