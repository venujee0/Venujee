(function(w){'use strict';w.VENU_PAGE_RENDERER=function(ctx){
var CLS=ctx.CLS,SUBJ=ctx.SUBJ,U=ctx.U,MOTIF=ctx.MOTIF,BRAND=ctx.BRAND,lang=ctx.lang,t=ctx.t,esc=ctx.esc,diagram2D=ctx.diagram2D,DG=ctx.DG,isDone=ctx.isDone,numHref=ctx.numHref;
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

function segHTML(){
  return '<div class="seg" role="group" aria-label="Language"><button type="button" data-lang="en" aria-pressed="'+(lang==='en')+'">EN</button><button type="button" data-lang="hi" aria-pressed="'+(lang==='hi')+'">हिं</button></div>';
}

function tlRow(href,tn,tag,title,pg,ck,subj){
  return '<a class="tl"'+(subj?' data-subject="'+subj+'"':'')+' href="'+href+'">'+(tn?'<span class="tn">'+tn+'</span>':'')
    +'<span class="tx">'+(tag?'<span class="tg">'+tag+'</span>':'')+title+'</span>'
    +'<span class="dots"></span><span class="pg">'+pg+(ck?'<span class="ck">✓</span>':'')+'</span></a>';
}

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
return {coverHTML,segHTML,tlRow,openerBody,conceptBody,formulasBody,examplesBody,revisionBody,soonRow,tocBody,pageHTML};
};})(window);
