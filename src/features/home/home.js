(function(w){'use strict';w.VENU_HOME_VIEW=function(ctx){var app=ctx.app,t=ctx.t,U=ctx.U,coverHTML=ctx.coverHTML,brandHTML=ctx.brandHTML;
  var shelf=[11,12].map(function(cls){
    return '<div class="bk">'+coverHTML(cls,false,'#c'+cls)
      +'<p class="meta">Physics · Chemistry · Maths</p>'
      +'<div class="btns"><a class="btn pri" href="#c'+cls+'">'+t(U.openBook)+'</a></div></div>';
  }).join('');
  shelf+='<div class="bk mock-book"><a href="#mock" class="coverlink"><div class="cover mockcover"><div class="cvtop">VENU JEE</div><div class="cvtitle">'+t(U.testWord)+'</div><div class="cvsub">JEE MAIN · JEE ADVANCED</div></div></a><p class="meta">'+t(U.testWord)+' · PYQs</p><div class="btns"><a class="btn pri" href="#mock">'+t(U.openBook)+'</a></div></div>';
  app.innerHTML='<div class="in"><section class="hero"><h1>'+brandHTML()+'</h1><p>'+t(U.heroP)+'</p></section><div class="shelf">'+shelf+'</div></div>';
;};})(window);
