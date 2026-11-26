// Global bilingual language manager and shared preference store.
var LS={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
var lang;
(function(){
 var saved=LS.get('venu.lang');
 lang=(saved==='hi'||saved==='en')?saved:(/^hi/i.test(navigator.language||'')?'hi':'en');
 window.VENU_LANGUAGE=lang;
 function sync(){document.documentElement.lang=lang;document.querySelectorAll('[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-lang')===lang));});}
 window.VENU_SET_LANGUAGE=function(next){if(next!=='hi'&&next!=='en')return;if(next===lang){sync();return;}lang=next;window.VENU_LANGUAGE=lang;LS.set('venu.lang',lang);sync();window.dispatchEvent(new Event('venu:languagechange'));};
 document.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('[data-lang]'):null;if(b)window.VENU_SET_LANGUAGE(b.getAttribute('data-lang'));});
 window.addEventListener('venu:languagechange',sync);sync();
})();

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

var DG={};// Topic-specific 2D diagrams are added only from supplied PDFs.

/* ---------- Content ---------- */

// Chapter data registry
var CH=[];

// Empty topic-model registry. New PDF-derived model modules will register here.
var D3={}, D3ATT={};

// Interactive 3D rendering engine
var D3R={mounts:[],running:false,last:0,colTick:0,COL:null};
(function(){
  function readCols(el){
    var cs=getComputedStyle(el),g=function(n){return (cs.getPropertyValue(n)||'').trim()};
    D3R.COL={ink:g('--ink'),muted:g('--muted'),accent:g('--accent'),soft:g('--soft'),paper:g('--paper'),line:g('--line'),hi:g('--hi'),phys:g('--phys'),chem:g('--chem'),math:g('--math'),good:g('--good'),bad:g('--bad'),gold:'#E3B64F',white:'#ffffff'};
  }
  function rgb(c){
    var h=(D3R.COL[c]||c||'#888888');
    if(h.charAt(0)!=='#')return [128,128,128];
    if(h.length===4)h='#'+h[1]+h[1]+h[2]+h[2]+h[3]+h[3];
    return [parseInt(h.substr(1,2),16),parseInt(h.substr(3,2),16),parseInt(h.substr(5,2),16)];
  }
  function shade(c,f){
    var r=rgb(c),o;
    if(f>=1){o=r.map(function(v){return Math.round(v+(255-v)*(f-1))})}
    else{o=r.map(function(v){return Math.round(v*f)})}
    return 'rgb('+o[0]+','+o[1]+','+o[2]+')';
  }
  function col(c,a){var r=rgb(c);return 'rgba('+r[0]+','+r[1]+','+r[2]+','+(a===undefined?1:a)+')'}
  var FONT='Hind,"Noto Sans Devanagari",system-ui,sans-serif';

  function render(m){
    var ctx=m.ctx,W=m.w,H=m.h,def=m.def,items=[];
    ctx.setTransform(m.dpr,0,0,m.dpr,0,0);ctx.clearRect(0,0,W,H);
    var cy=Math.cos(m.yaw),sy=Math.sin(m.yaw),cp=Math.cos(m.pitch),sp=Math.sin(m.pitch);
    var sc=Math.min(W,H*1.15)*0.42*m.zoom*(def.scale||1), ce=def.center||[0,0,0];
    function rot(x,y,z){var x1=x*cy+z*sy,z1=-x*sy+z*cy;return [x1,y*cp-z1*sp,y*sp+z1*cp]}
    function P(p){
      var r=rot(p[0]-ce[0],p[1]-ce[1],p[2]-ce[2]), k=1/(1-0.06*r[2]);
      if(k<0.2)k=0.2;if(k>4)k=4;
      return [W/2+r[0]*sc*k, H/2-r[1]*sc*k, r[2], k];
    }
    var S={};
    S.line=function(a,b,c,w,dash){var A=P(a),B=P(b);items.push({z:(A[2]+B[2])/2,f:function(){ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);ctx.strokeStyle=col(c);ctx.lineWidth=w||1.4;ctx.setLineDash(dash?[5,4]:[]);ctx.stroke();ctx.setLineDash([])}})};
    S.back=function(fn){items.push({z:-1e7,f:fn})};
    S.path=function(pts,c,w,dash,closed){
      var Q=pts.map(P),z=0;Q.forEach(function(q){z+=q[2]});z/=Q.length;
      items.push({z:z,f:function(){ctx.beginPath();Q.forEach(function(q,i){if(i)ctx.lineTo(q[0],q[1]);else ctx.moveTo(q[0],q[1])});if(closed)ctx.closePath();ctx.strokeStyle=col(c);ctx.lineWidth=w||1.8;ctx.lineJoin='round';ctx.setLineDash(dash?[5,4]:[]);ctx.stroke();ctx.setLineDash([])}});
    };
    S.arrow=function(a,b,c,w){
      var A=P(a),B=P(b),dx=B[0]-A[0],dy=B[1]-A[1],L=Math.sqrt(dx*dx+dy*dy)||1,ux=dx/L,uy=dy/L,h=Math.min(9,L*0.45);
      items.push({z:(A[2]+B[2])/2+0.01,f:function(){
        ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0]-ux*h*0.6,B[1]-uy*h*0.6);ctx.strokeStyle=col(c);ctx.lineWidth=w||2;ctx.stroke();
        ctx.beginPath();ctx.moveTo(B[0],B[1]);ctx.lineTo(B[0]-ux*h-uy*h*0.45,B[1]-uy*h+ux*h*0.45);ctx.lineTo(B[0]-ux*h+uy*h*0.45,B[1]-uy*h-ux*h*0.45);ctx.closePath();ctx.fillStyle=col(c);ctx.fill();
      }});
    };
    S.poly=function(pts,c,alpha,stroke,lit){
      var Q=pts.map(P),z=0;Q.forEach(function(q){z+=q[2]});z/=Q.length;
      items.push({z:z,f:function(){ctx.beginPath();Q.forEach(function(q,i){if(i)ctx.lineTo(q[0],q[1]);else ctx.moveTo(q[0],q[1])});ctx.closePath();ctx.fillStyle=lit?lit:col(c,alpha===undefined?1:alpha);ctx.fill();if(stroke){ctx.strokeStyle=col(stroke);ctx.lineWidth=1;ctx.stroke()}}});
    };
    S.floor=function(pts,c,alpha,stroke){var Q=pts.map(P);items.push({z:-2e6,f:function(){ctx.beginPath();Q.forEach(function(q,i){if(i)ctx.lineTo(q[0],q[1]);else ctx.moveTo(q[0],q[1])});ctx.closePath();ctx.fillStyle=col(c,alpha===undefined?1:alpha);ctx.fill();if(stroke){ctx.strokeStyle=col(stroke);ctx.lineWidth=1;ctx.stroke()}}})};
    S.sphere=function(c0,R,c,glow){
      var p=P(c0),r=Math.max(1.5,R*sc*p[3]);
      items.push({z:p[2],f:function(){
        var g=ctx.createRadialGradient(p[0]-r*0.35,p[1]-r*0.38,r*0.08,p[0],p[1],r);
        g.addColorStop(0,shade(c,1.65));g.addColorStop(0.55,shade(c,1));g.addColorStop(1,shade(c,0.55));
        ctx.beginPath();ctx.arc(p[0],p[1],r,0,6.2832);ctx.fillStyle=g;ctx.fill();
        if(glow){ctx.beginPath();ctx.arc(p[0],p[1],r*1.6,0,6.2832);ctx.fillStyle=col(c,0.18);ctx.fill()}
      }});
    };
    S.shadow=function(c0,R,y){
      var g=[c0[0],y,c0[2]],p=P(g),rx=R*sc*p[3];
      items.push({z:-1e6,f:function(){ctx.beginPath();ctx.ellipse(p[0],p[1],rx,Math.max(1,rx*Math.abs(sp)),0,0,6.2832);ctx.fillStyle=col('ink',0.2);ctx.fill()}});
    };
    S.rod=function(a,b,R,c){
      var A=P(a),B=P(b),dx=B[0]-A[0],dy=B[1]-A[1],L=Math.sqrt(dx*dx+dy*dy)||1,nx=-dy/L,ny=dx/L,w=Math.max(2,R*sc*(A[3]+B[3]));
      items.push({z:(A[2]+B[2])/2,f:function(){
        var g=ctx.createLinearGradient(A[0]+nx*w/2,A[1]+ny*w/2,A[0]-nx*w/2,A[1]-ny*w/2);
        g.addColorStop(0,shade(c,1.5));g.addColorStop(0.5,shade(c,1));g.addColorStop(1,shade(c,0.6));
        ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);ctx.strokeStyle=g;ctx.lineWidth=w;ctx.lineCap='round';ctx.stroke();ctx.lineCap='butt';
      }});
    };
    S.box=function(c0,sz,c){
      var hx=sz[0]/2,hy=sz[1]/2,hz=sz[2]/2,v=[];
      for(var i=0;i<8;i++){v.push([c0[0]+((i&1)?hx:-hx),c0[1]+((i&2)?hy:-hy),c0[2]+((i&4)?hz:-hz)])}
      var F=[[[0,2,6,4],[-1,0,0]],[[1,3,7,5],[1,0,0]],[[0,1,5,4],[0,-1,0]],[[2,3,7,6],[0,1,0]],[[0,1,3,2],[0,0,-1]],[[4,5,7,6],[0,0,1]]];
      F.forEach(function(f){
        var n=rot(f[1][0],f[1][1],f[1][2]), lit=0.62+0.5*Math.max(0,n[0]*-0.35+n[1]*0.7+n[2]*0.6);
        var Q=f[0].map(function(i){return P(v[i])}),z=0;Q.forEach(function(q){z+=q[2]});z/=4;
        items.push({z:z,f:function(){ctx.beginPath();Q.forEach(function(q,i){if(i)ctx.lineTo(q[0],q[1]);else ctx.moveTo(q[0],q[1])});ctx.closePath();ctx.fillStyle=shade(c,lit);ctx.fill();ctx.strokeStyle=col('ink',0.35);ctx.lineWidth=0.8;ctx.stroke()}});
      });
    };
    S.text=function(p,s,c,size,al,bold){
      var A=P(p);items.push({z:1e7,f:function(){ctx.font=(bold?'700 ':'500 ')+(size||12)+'px '+FONT;ctx.fillStyle=col(c||'ink');ctx.textAlign=al||'center';ctx.textBaseline='middle';ctx.fillText(s,A[0],A[1])}});
    };
    S.hud=function(fx,fy,str,c,size,al,bold){items.push({z:2e7,f:function(){ctx.font=(bold?'700 ':'500 ')+(size||12)+'px '+FONT;ctx.fillStyle=col(c||'ink');ctx.textAlign=al||'left';ctx.textBaseline='middle';ctx.fillText(str,fx*W,fy*H)}})};
    S.grid=function(y,half,n,c){
      var step=2*half/n;
      for(var i=0;i<=n;i++){var u=-half+i*step;S.line2([u,y,-half],[u,y,half],c);S.line2([-half,y,u],[half,y,u],c)}
    };
    S.line2=function(a,b,c){var A=P(a),B=P(b);items.push({z:-1e6,f:function(){ctx.beginPath();ctx.moveTo(A[0],A[1]);ctx.lineTo(B[0],B[1]);ctx.strokeStyle=col(c||'line',0.8);ctx.lineWidth=1;ctx.stroke()}})};
    S.ring=function(c0,R,plane,c,w,dash,n){
      n=n||56;var pts=[];
      for(var i=0;i<n;i++){var a=i/n*6.2832,u=R*Math.cos(a),v=R*Math.sin(a);
        pts.push(plane==='xz'?[c0[0]+u,c0[1],c0[2]+v]:plane==='yz'?[c0[0],c0[1]+u,c0[2]+v]:[c0[0]+u,c0[1]+v,c0[2]])}
      S.path(pts,c,w,dash,true);
    };
    S.disc=function(c0,R,plane,c,alpha,n){
      n=n||40;var pts=[];
      for(var i=0;i<n;i++){var a=i/n*6.2832,u=R*Math.cos(a),v=R*Math.sin(a);
        pts.push(plane==='xz'?[c0[0]+u,c0[1],c0[2]+v]:plane==='yz'?[c0[0],c0[1]+u,c0[2]+v]:[c0[0]+u,c0[1]+v,c0[2]])}
      S.poly(pts,c,alpha,c);
    };
    S.axes=function(L,labels){
      S.arrow([0,0,0],[L,0,0],'muted',1.6);S.arrow([0,0,0],[0,L,0],'muted',1.6);S.arrow([0,0,0],[0,0,L],'muted',1.6);
      var lb=labels||['x','y','z'];
      S.text([L+0.12,0,0],lb[0],'muted',12,'center',true);S.text([0,L+0.12,0],lb[1],'muted',12,'center',true);S.text([0,0,L+0.12],lb[2],'muted',12,'center',true);
    };
    S.W=W;S.H=H;
    def.frame(S,m.t,m.P,m.l);
    items.sort(function(a,b){return a.z-b.z});
    for(var i=0;i<items.length;i++){ctx.save();items[i].f();ctx.restore()}
  }

  function size(m){
    var w=Math.max(200,Math.round(m.cv.parentNode.clientWidth)),h=Math.round(w*(m.def.h||0.78)),dpr=Math.min(2,window.devicePixelRatio||1);
    if(w!==m.w||h!==m.h||dpr!==m.dpr){m.w=w;m.h=h;m.dpr=dpr;m.cv.width=Math.round(w*dpr);m.cv.height=Math.round(h*dpr);m.cv.style.height=h+'px'}
  }
  function tick(now){
    var dt=Math.max(0,Math.min(0.05,(now-D3R.last)/1000));D3R.last=now;
    if(!D3R.COL||(++D3R.colTick%45)===0){var any=D3R.mounts[0];if(any)readCols(any.cv)}
    D3R.mounts=D3R.mounts.filter(function(m){return m.cv.isConnected});
    D3R.mounts.forEach(function(m){
      size(m);
      if(m.play)m.t+=dt;
      if(m.def.spin&&!m.drag&&m.play)m.yaw+=dt*0.3;
      render(m);
    });
    if(D3R.mounts.length){requestAnimationFrame(tick)}else{D3R.running=false}
  }
  function start(){if(!D3R.running){D3R.running=true;D3R.last=performance.now();requestAnimationFrame(tick)}}

  window.d3HTML=function(name){
    var d=D3[name];if(!d)return '';
    var pars=(d.params||[]).map(function(p){
      return '<label class="d3p"><span>'+(lang==='hi'?p.hi:p.en)+'</span><input type="range" data-k="'+p.k+'" min="'+p.min+'" max="'+p.max+'" step="'+(p.step||1)+'" value="'+p.val+'"><output>'+p.val+(p.unit||'')+'</output></label>';
    }).join('');
    return '<div class="d3" data-d3="'+name+'"><canvas class="d3c" role="img" aria-label="'+esc(lang==='hi'?(d.hi||name):(d.en||name))+'"></canvas>'
      +'<div class="d3bar"><button type="button" class="btn sm" data-d3a="play">'+t(U.pauseW)+'</button><button type="button" class="btn sm" data-d3a="reset">'+t(U.resetW)+'</button><span class="d3hint">'+t(U.dragHint)+'</span></div>'
      +(pars?'<div class="d3pars">'+pars+'</div>':'')+'</div>';
  };
  window.mount3d=function(root){
    if(typeof root.querySelectorAll!=='function')return;
    var nodes=root.querySelectorAll('.d3[data-d3]');
    for(var i=0;i<nodes.length;i++){(function(el){
      var def=D3[el.getAttribute('data-d3')];if(!def)return;
      var cv=el.querySelector('canvas'),v=def.view||{yaw:-0.6,pitch:0.32,zoom:1};
      var m={cv:cv,ctx:cv.getContext('2d'),def:def,w:0,h:0,dpr:1,yaw:v.yaw,pitch:v.pitch,zoom:v.zoom||1,t:0,play:!reduce,drag:false,P:{},l:lang};
      (def.params||[]).forEach(function(p){m.P[p.k]=p.val});
      var pb=el.querySelector('[data-d3a="play"]');
      function pl(){pb.textContent=m.play?t(U.pauseW):t(U.playW)}
      pl();
      pb.addEventListener('click',function(){m.play=!m.play;pl()});
      el.querySelector('[data-d3a="reset"]').addEventListener('click',function(){m.yaw=v.yaw;m.pitch=v.pitch;m.zoom=v.zoom||1;m.t=0;render(m)});
      var inp=el.querySelectorAll('input[type=range]');
      for(var j=0;j<inp.length;j++){(function(r){r.addEventListener('input',function(){m.P[r.getAttribute('data-k')]=+r.value;var o=r.parentNode.querySelector('output');var pp=def.params.filter(function(q){return q.k===r.getAttribute('data-k')})[0];o.textContent=r.value+(pp.unit||'');if(!m.play)render(m)})})(inp[j])}
      var ptrs={},pd=0;
      cv.addEventListener('pointerdown',function(e){try{cv.setPointerCapture(e.pointerId)}catch(x){}ptrs[e.pointerId]=[e.clientX,e.clientY];m.drag=true;pd=0});
      cv.addEventListener('pointermove',function(e){
        var o=ptrs[e.pointerId];if(!o)return;
        var ids=Object.keys(ptrs);
        if(ids.length===2){
          var a=ptrs[ids[0]],b=ptrs[ids[1]],d0=Math.hypot(a[0]-b[0],a[1]-b[1]);
          ptrs[e.pointerId]=[e.clientX,e.clientY];
          a=ptrs[ids[0]];b=ptrs[ids[1]];var d1=Math.hypot(a[0]-b[0],a[1]-b[1]);
          if(d0>0)m.zoom=Math.max(0.5,Math.min(3,m.zoom*d1/d0));
        }else{
          m.yaw+=(e.clientX-o[0])*0.011;m.pitch=Math.max(-1.45,Math.min(1.45,m.pitch+(e.clientY-o[1])*0.011));
          ptrs[e.pointerId]=[e.clientX,e.clientY];
        }
        if(!m.play)render(m);
      });
      var up=function(e){delete ptrs[e.pointerId];if(!Object.keys(ptrs).length)m.drag=false};
      cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
      cv.addEventListener('wheel',function(e){e.preventDefault();m.zoom=Math.max(0.5,Math.min(3,m.zoom*(e.deltaY<0?1.1:0.91)));if(!m.play)render(m)},{passive:false});
      if(!D3R.COL)readCols(cv);
      size(m);render(m);
      D3R.mounts.push(m);
    })(nodes[i])}
    if(D3R.mounts.length){start()}
  };
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
  exWord:B('Example','उदाहरण'),
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
      +'<p class="meta">'+t(U.soon)+'</p>'
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
  app.innerHTML='<div class="in page">'+pageHTML(bk,idx)+'</div>';
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
  var bs=document.querySelectorAll('[data-lang]');
  for(var i=0;i<bs.length;i++){bs[i].setAttribute('aria-pressed',String(bs[i].getAttribute('data-lang')===lang))}
  document.documentElement.lang=lang;
}
function go(href){if(href){location.hash=href.slice(1)}}

window.addEventListener('venu:languagechange',function(){
  var h=location.hash.slice(1);
  if(/^(mock|mock-|mock11|mock12|pyq|instructions)/.test(h))return;
  var y=window.scrollY;route(false,false);syncSeg();window.scrollTo(0,y);
});
app.addEventListener('click',function(e){
  var d=e.target.closest('[data-done]');
  if(d){var on=toggleDone(d.getAttribute('data-done'));d.setAttribute('aria-pressed',String(on));d.textContent=on?t(U.marked):t(U.mark);}
});
var tx=0,ty=0,tok=false;
app.addEventListener('touchstart',function(e){
  var p0=e.touches[0];tx=p0.clientX;ty=p0.clientY;
  tok=!e.target.closest('.fx,.eq,.mx,.dt,.d3');
},{passive:true});
app.addEventListener('touchend',function(e){
  if(!tok||!cur.book)return;
  var p1=e.changedTouches[0],dx=p1.clientX-tx,dy=p1.clientY-ty;
  if(Math.abs(dx)>70&&Math.abs(dy)<45){go(dx<0?cur.next:cur.prev)}
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
