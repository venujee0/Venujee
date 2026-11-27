(function(w){'use strict';w.VENU_CLASS_VIEW=function(cls,ctx){var app=ctx.app,pager=ctx.pager,cur=ctx.cur,SUBS=ctx.SUBS,book=ctx.book,LS=ctx.LS,t=ctx.t,U=ctx.U,coverHTML=ctx.coverHTML,CLS=ctx.CLS;
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
;};})(window);
