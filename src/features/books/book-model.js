(function(w){'use strict';w.VENU_BOOK_MODEL=function(ctx){var CH=ctx.CH,D3ATT=ctx.D3ATT,PLAN11=ctx.PLAN11,PLAN12=ctx.PLAN12,B=ctx.B,SUBS=ctx.SUBS,BOOKS={};
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
return {BOOKS:BOOKS,SUBS:SUBS,classChapters:classChapters,book:book,pHref:pHref,numHref:numHref};};})(window);
