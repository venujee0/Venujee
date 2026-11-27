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
    S.ball=function(c0,R,c){var p=P(c0),r=Math.max(2.5,R*sc*p[3]);items.push({z:p[2],f:function(){var g=ctx.createRadialGradient(p[0]-r*.35,p[1]-r*.35,r*.1,p[0],p[1],r);g.addColorStop(0,shade(c,1.6));g.addColorStop(.6,shade(c,1));g.addColorStop(1,shade(c,.55));ctx.beginPath();ctx.arc(p[0],p[1],r,0,6.2832);ctx.fillStyle=g;ctx.fill()}})};
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

D3.states={en:'Solid, liquid and gas',hi:'ठोस, द्रव और गैस',h:0.62,view:{yaw:-0.35,pitch:0.3,zoom:1},
 params:[{k:'T',en:'Temperature',hi:'तापमान',min:0,max:100,val:30,step:1,unit:'%'}],
 frame:function(S,t,P,l){
  var k=P.T/100,xs=[-2.3,0,2.3],names=[T(l,'Solid','ठोस'),T(l,'Liquid','द्रव'),T(l,'Gas','गैस')];
  for(var b=0;b<3;b++){
    wire(S,'line',xs[b],0,0,0.9,0.9,0.9);S.text([xs[b],-1.2,0],names[b],'accent',13,'center',true);
    for(var i=0;i<12;i++){
      var gx=(i%3)-1,gy=(Math.floor(i/3)%2)-0.5,gz=Math.floor(i/6)-0.5,s=i*1.7,x,y,z;
      if(b===0){var a=0.03+0.12*k;x=gx*0.5+a*Math.sin(t*9+s);y=gy*0.5-0.35+a*Math.sin(t*8+s*2);z=gz*0.5+a*Math.cos(t*7+s)}
      else if(b===1){var a2=0.12+0.35*k;x=gx*0.5+a2*Math.sin(t*2+s);y=gy*0.4-0.45+a2*0.5*Math.sin(t*2.3+s*2);z=gz*0.5+a2*Math.cos(t*1.8+s)}
      else{var v=0.5+1.6*k;x=0.8*tri(t*v*0.5+s);y=0.8*tri(t*v*0.43+s*1.3);z=0.8*tri(t*v*0.37+s*2.1)}
      S.ball([xs[b]+x,y,z],0.12,b===2?'hi':'chem');
    }
  }
 }};

D3.classify={en:'Classification of matter',hi:'पदार्थ का वर्गीकरण',h:0.7,spin:true,view:{yaw:-0.5,pitch:0.35,zoom:1},
 frame:function(S,t,P,l){
  var pos=[[-2.4,0.7],[-0.8,0.7],[0.8,0.7],[2.4,0.7]],nm=[T(l,'Element (O₂)','तत्व (O₂)'),T(l,'Compound (H₂O)','यौगिक (H₂O)'),T(l,'Homogeneous','समांगी'),T(l,'Heterogeneous','विषमांगी')];
  for(var i=0;i<4;i++){wire(S,'line',pos[i][0]*0.9,0,0,0.6,0.6,0.6);S.text([pos[i][0]*0.9,-0.95,0],nm[i],'accent',11,'center',true)}
  var w=function(i,x,y,z,f){return [x*0.9+0.18*Math.sin(t*2+i)+f[0],y+0.12*Math.sin(t*2.2+i*2)+f[1],z+f[2]]};
  for(var i=0;i<3;i++){var o=w(i,-2.4,i*0.35-0.35,0,[0,0,0]);mol(S,[[-0.12,0,0,O_,0.12],[0.12,0,0,O_,0.12]],[[0,1]],o,l)}
  for(var j=0;j<2;j++){var o2=w(j+5,-0.8,j*0.6-0.3,0,[0,0,0]);mol(S,[[0,0,0,O_,0.15],[-0.22,-0.17,0,H_,0.09],[0.22,-0.17,0,H_,0.09]],[[0,1],[0,2]],o2,l)}
  for(var m=0;m<8;m++){S.ball(w(m,0.8,((m%4)-1.5)*0.28,(Math.floor(m/4)-0.5)*0.5,[0,0,0]),0.1,m%2?'hi':'chem')}
  for(var q=0;q<8;q++){S.ball(w(q,2.4,((q%4)-1.5)*0.28,(Math.floor(q/4)-0.5)*0.5,[q<4?-0.25:0.25,0,0]),0.1,q<4?'hi':'chem')}
 }};

D3.co2={en:'Formation of CO and CO₂',hi:'CO और CO₂ का बनना',h:0.55,view:{yaw:-0.25,pitch:0.2,zoom:1},
 frame:function(S,t,P,l){
  var p=(t%9)/9,x1=p<0.3?3-(3-1.05)*(p/0.3):1.05,x2=p<0.55?-3:(p<0.85?-3+(3-1.05)*((p-0.55)/0.3):-1.05);
  S.ball([0,0,0],0.38,C_);S.text([0,0,0.4],'C','white',12,'center',true);
  S.ball([x1,0,0],0.34,O_);S.text([x1,0,0.36],'O','white',12,'center',true);
  if(p>=0.3)S.rod([0,0,0],[x1,0,0],0.05,'muted');
  if(p>=0.55){S.ball([x2,0,0],0.34,O_);S.text([x2,0,0.36],'O','white',12,'center',true)}
  if(p>=0.85)S.rod([0,0,0],[x2,0,0],0.05,'muted');
  var lab=p<0.55?'CO  →  12 g C : 16 g O':'CO₂  →  12 g C : 32 g O';
  S.hud(0.5,0.9,lab,'accent',14,'center',true);
 }};

D3.gasvol={en:'Gay-Lussac: gaseous volumes',hi:'गे-लुसाक: गैसों के आयतन',h:0.55,view:{yaw:-0.2,pitch:0.15,zoom:1},
 frame:function(S,t,P,l){
  var p=(t%8)/8,go=p<0.3?0:(p<0.6?(p-0.3)/0.3:1),HA=[[-0.16,0,0,H_,0.1],[0.16,0,0,H_,0.1]],OA=[[-0.18,0,0,O_,0.15],[0.18,0,0,O_,0.15]],WA=[[0,0,0,O_,0.15],[-0.25,-0.2,0,H_,0.1],[0.25,-0.2,0,H_,0.1]];
  if(p<0.6){
    var x=-2.6+go*2.6;mol(S,HA,[[0,1]],[x,0.5,0],l);mol(S,HA,[[0,1]],[x,-0.5,0],l);
    mol(S,OA,[[0,1]],[2.6-go*2.6,0,0],l);
  }else if(p<0.7){S.ball([0,0,0],0.25+0.3*Math.sin((p-0.6)/0.1*3.14),'gold')}
  if(p>=0.6){var y=p<0.8?(p-0.6)/0.2:1,xx=y*2.6;mol(S,WA,[[0,1],[0,2]],[xx,0.5,0],l);mol(S,WA,[[0,1],[0,2]],[xx,-0.5,0],l)}
  S.hud(0.5,0.9,'2 H₂  +  1 O₂  →  2 H₂O   (2 : 1 : 2)','accent',14,'center',true);
 }};

D3.isotopes={en:'Isotopes of chlorine',hi:'क्लोरीन के समस्थानिक',h:0.62,spin:true,view:{yaw:-0.4,pitch:0.3,zoom:1},
 frame:function(S,t,P,l){
  [[-1.5,18,'³⁵Cl  75.77%'],[1.5,20,'³⁷Cl  24.23%']].forEach(function(d){
    var N=17+d[1];
    for(var i=0;i<N;i++){var y=1-2*(i+0.5)/N,r=Math.sqrt(1-y*y),a=i*2.39996;S.ball([d[0]+0.4*r*Math.cos(a),0.4*y,0.4*r*Math.sin(a)],0.085,i<17?'bad':'muted')}
    S.ring([d[0],0,0],1.0,'xz','line',1);
    for(var e=0;e<3;e++){var an=t*1.4+e*2.094;S.ball([d[0]+Math.cos(an),0,Math.sin(an)],0.07,'phys')}
    S.text([d[0],-1.15,0],d[2],'accent',12,'center',true);
    S.text([d[0],-0.9,0],'17 p + '+d[1]+' n','muted',11,'center');
  });
  S.hud(0.18,0.1,T(l,'● red = protons   ● grey = neutrons','● लाल = प्रोटॉन   ● स्लेटी = न्यूट्रॉन'),'muted',11,'left');
 }};

D3.molemap={en:'Mole map',hi:'मोल का नक्शा',h:0.7,view:{yaw:-0.2,pitch:0.2,zoom:1},
 frame:function(S,t,P,l){
  var nodes=[[-1.7,0.9,T(l,'Mass w (g)','द्रव्यमान w (g)'),'w / M'],[1.7,0.9,T(l,'Particles N','कण N'),'N / Nₐ'],[-1.7,-0.9,T(l,'Gas volume V (L)','गैस आयतन V (L)'),'V / Vₘ'],[1.7,-0.9,T(l,'Solution M×V','विलयन M×V'),'M × V(L)']],a=Math.floor(t/2)%4,ph=(t%2)/2;
  nodes.forEach(function(n,i){
    var on=i===a;S.arrow([n[0]*0.45,n[1]*0.45,0],[n[0]*0.45*0.2,n[1]*0.45*0.2,0],on?'gold':'line',on?3:1.5);
    S.ball([n[0],n[1],0],on?0.3+0.05*Math.sin(ph*6.28):0.24,on?'gold':'chem');
    S.text([n[0],n[1]-0.45,0],n[2],'ink',11,'center',true);
    S.text([n[0]*0.55,n[1]*0.55+0.12,0.1],n[3],on?'accent':'muted',11,'center',true);
  });
  S.ball([0,0,0],0.4,'hi');S.text([0,0,0.45],T(l,'n mol','n मोल'),'white',12,'center',true);
  var t0=nodes[a];S.ball([t0[0]*(1-ph),t0[1]*(1-ph),0.2],0.1,'white');
 }};

D3.water={en:'Water molecule H₂O',hi:'जल अणु H₂O',h:0.7,spin:true,view:{yaw:-0.3,pitch:0.25,zoom:1.15},
 frame:function(S,t,P,l){
  var A=[[0,0,0,O_,0.34,'O'],[-0.79,-0.61,0,H_,0.22,'H'],[0.79,-0.61,0,H_,0.22,'H']];
  mol(S,A,[[0,1],[0,2]],[0,0.25,0],l);
  for(var i=0;i<10;i++){var a=t*(1.2+0.12*(i%3))+i*0.63,r=0.95+0.18*(i%3);S.ball([r*Math.cos(a),0.25-0.2+0.5*Math.sin(a*0.7+i),r*0.8*Math.sin(a)],0.05,'gold')}
  S.text([0,-1.15,0],'104.5°','accent',13,'center',true);
  S.hud(0.5,0.93,T(l,'3 atoms · 10 electrons','3 परमाणु · 10 इलेक्ट्रॉन'),'muted',12,'center');
 }};

var B=function(e,h){return {en:e,hi:h}};

CH.push({
 id:'chemistry-mole-concept',cls:11,subject:'chemistry',ord:1,
 title:B('Some Basic Concepts of Chemistry','रसायन विज्ञान की कुछ मूल अवधारणाएँ'),
 blurb:B('Matter, measurement, laws of combination, atomic mass and the mole concept — from foundation to JEE Advanced level.','पदार्थ, मापन, रासायनिक संयोजन के नियम, परमाणु द्रव्यमान और मोल अवधारणा — आधार से JEE Advanced स्तर तक।'),
 sections:[
 {h:B('1.1 Matter','1.1 पदार्थ'),
  body:B('<p>Chemistry studies the composition, structure, properties and reactions of matter. Medicines, fertilisers, plastics and fuels all come from it.</p><p><b>Matter</b> is anything that has mass and occupies space.</p><table><tr><th></th><th>Solid</th><th>Liquid</th><th>Gas</th></tr><tr><td>Volume</td><td>fixed</td><td>fixed</td><td>not fixed</td></tr><tr><td>Shape</td><td>fixed</td><td>not fixed</td><td>not fixed</td></tr><tr><td>Particles</td><td>very close</td><td>close</td><td>far apart</td></tr></table>',
  '<p>रसायन विज्ञान पदार्थ की संरचना, गुण और अभिक्रियाओं का अध्ययन है। दवाइयाँ, उर्वरक, प्लास्टिक और ईंधन सब इसी की देन हैं।</p><p><b>पदार्थ</b> वह है जिसमें द्रव्यमान हो और जो स्थान घेरे।</p><table><tr><th></th><th>ठोस</th><th>द्रव</th><th>गैस</th></tr><tr><td>आयतन</td><td>निश्चित</td><td>निश्चित</td><td>अनिश्चित</td></tr><tr><td>आकार</td><td>निश्चित</td><td>अनिश्चित</td><td>अनिश्चित</td></tr><tr><td>कण</td><td>बहुत पास</td><td>पास</td><td>दूर-दूर</td></tr></table>'),
  d3:'states',cap3:B('Particle motion in solid, liquid and gas. Raise the temperature to see a solid become a liquid and then a gas.','ठोस, द्रव और गैस में कणों की गति। तापमान बढ़ाकर देखो कि ठोस द्रव और फिर गैस जैसा व्यवहार करता है।')},
 {h:B('1.1.1 Classification of matter','1.1.1 पदार्थ का वर्गीकरण'),
  body:B('<ul><li><b>Element:</b> only one kind of atom (Na, O₂).</li><li><b>Compound:</b> different elements chemically combined in a fixed ratio; properties differ from its components (H₂O).</li><li><b>Mixture:</b> any ratio; separated by physical methods. <i>Homogeneous</i> (salt solution, air) or <i>heterogeneous</i> (sand + salt).</li></ul>',
  '<ul><li><b>तत्व:</b> केवल एक ही प्रकार के परमाणु (Na, O₂)।</li><li><b>यौगिक:</b> अलग-अलग तत्व निश्चित अनुपात में रासायनिक रूप से जुड़े; गुण घटकों से भिन्न (H₂O)।</li><li><b>मिश्रण:</b> किसी भी अनुपात में; भौतिक विधियों से अलग किया जा सकता है। <i>समांगी</i> (नमक का घोल, वायु) या <i>विषमांगी</i> (रेत + नमक)।</li></ul>'),
  d3:'classify',cap3:B('One example of each category: element, compound, homogeneous and heterogeneous mixture.','हर श्रेणी का एक उदाहरण: तत्व, यौगिक, समांगी और विषमांगी मिश्रण।')},
 {h:B('1.2 Measurement','1.2 मापन'),
  body:B('<table><tr><th>Quantity</th><th>SI unit</th><th>Useful relations</th></tr><tr><td>Mass</td><td>kg</td><td>1 u = 1.6605×10⁻²⁴ g</td></tr><tr><td>Volume</td><td>m³</td><td>1 L = 1 dm³ = 1000 mL</td></tr><tr><td>Density</td><td>kg m⁻³</td><td>1 g cm⁻³ = 1000 kg m⁻³</td></tr><tr><td>Temperature</td><td>K</td><td>K = °C + 273.15</td></tr><tr><td>Pressure</td><td>Pa</td><td>1 atm = 1.01325 bar</td></tr></table><p>°F = (9/5)(°C) + 32. <b>Mass</b> is the amount of matter (same everywhere); <b>weight</b> is the force of gravity on it.</p><p><b>Significant figures:</b> non-zero digits and zeros between them count; leading zeros do not. In × and ÷ keep the fewest significant figures; in + and − keep the fewest decimal places. Scientific notation: N × 10ⁿ, 1 ≤ N &lt; 10.</p><p><b>Unit-factor method:</b> multiply by a factor equal to 1, e.g. 2 L × (1000 cm³ / 1 L) = 2000 cm³.</p>',
  '<table><tr><th>राशि</th><th>SI मात्रक</th><th>उपयोगी संबंध</th></tr><tr><td>द्रव्यमान</td><td>kg</td><td>1 u = 1.6605×10⁻²⁴ g</td></tr><tr><td>आयतन</td><td>m³</td><td>1 L = 1 dm³ = 1000 mL</td></tr><tr><td>घनत्व</td><td>kg m⁻³</td><td>1 g cm⁻³ = 1000 kg m⁻³</td></tr><tr><td>ताप</td><td>K</td><td>K = °C + 273.15</td></tr><tr><td>दाब</td><td>Pa</td><td>1 atm = 1.01325 bar</td></tr></table><p>°F = (9/5)(°C) + 32। <b>द्रव्यमान</b> पदार्थ की मात्रा है (हर जगह समान); <b>भार</b> उस पर लगने वाला गुरुत्व बल है।</p><p><b>सार्थक अंक:</b> शून्येतर अंक और उनके बीच के शून्य सार्थक हैं; शुरू के शून्य नहीं। × और ÷ में सबसे कम सार्थक अंक रखें; + और − में सबसे कम दशमलव स्थान। वैज्ञानिक संकेतन: N × 10ⁿ, 1 ≤ N &lt; 10।</p><p><b>मात्रक-गुणक विधि:</b> मात्रक बदलने के लिए 1 के बराबर गुणक से गुणा करें, जैसे 2 L × (1000 cm³ / 1 L) = 2000 cm³।</p>')},
 {h:B('1.3 Laws of chemical combination','1.3 रासायनिक संयोजन के नियम'),
  body:B('<ol><li><b>Conservation of mass (Lavoisier):</b> total mass is neither created nor destroyed in a chemical reaction.</li><li><b>Definite proportions (Proust):</b> a compound always has the same mass ratio of elements, whatever the source. Water: H : O = 1 : 8.</li><li><b>Multiple proportions (Dalton):</b> if two elements form more than one compound, the masses of one that combine with a fixed mass of the other are in a simple whole-number ratio.</li></ol><p>Example: with 12 g of C, CO has 16 g of O and CO₂ has 32 g of O, so the ratio is 16 : 32 = 1 : 2 (see Example 1).</p>',
  '<ol><li><b>द्रव्यमान संरक्षण (लवाज़िए):</b> रासायनिक अभिक्रिया में कुल द्रव्यमान न बनता है, न नष्ट होता है।</li><li><b>निश्चित अनुपात (प्रूस्त):</b> किसी यौगिक में तत्वों का द्रव्यमान अनुपात हमेशा समान रहता है, स्रोत कोई भी हो। पानी में H : O = 1 : 8।</li><li><b>गुणित अनुपात (डाल्टन):</b> दो तत्व एक से अधिक यौगिक बनाएँ तो एक तत्व के निश्चित द्रव्यमान से जुड़ने वाले दूसरे तत्व के द्रव्यमान सरल पूर्ण संख्या अनुपात में होते हैं।</li></ol><p>उदाहरण: 12 g C के साथ CO में 16 g O और CO₂ में 32 g O है, अनुपात 16 : 32 = 1 : 2 (उदाहरण 1 देखो)।</p>'),
  d3:'co2',cap3:B('A carbon atom first bonds with one oxygen (CO), then with a second (CO₂).','एक कार्बन परमाणु पहले एक ऑक्सीजन से जुड़ता है (CO), फिर दूसरे से (CO₂)।')},
 {h:B('1.3.1 Gay-Lussac, Avogadro and Dalton’s theory','1.3.1 गे-लुसाक, आवोगाद्रो और डाल्टन का सिद्धांत'),
  body:B('<p><b>Gay-Lussac’s law:</b> at the same T and P, reacting and product gases have volumes in a simple ratio: 2 H₂ + O₂ → 2 H₂O gives 2 : 1 : 2.</p><p><b>Avogadro’s law:</b> equal volumes of gases at the same T and P have equal numbers of molecules.</p><p><b>Dalton’s atomic theory:</b> (1) matter is made of indivisible atoms; (2) atoms of one element are identical; (3) atoms combine in fixed whole-number ratios; (4) in a reaction atoms only rearrange. Today we know atoms are divisible and isotopes differ in mass.</p>',
  '<p><b>गे-लुसाक का नियम:</b> समान T और P पर अभिकारक और उत्पाद गैसों के आयतन सरल अनुपात में होते हैं: 2 H₂ + O₂ → 2 H₂O में 2 : 1 : 2।</p><p><b>आवोगाद्रो का नियम:</b> समान T और P पर गैसों के समान आयतन में अणुओं की संख्या समान होती है।</p><p><b>डाल्टन का परमाणु सिद्धांत:</b> (1) पदार्थ अविभाज्य परमाणुओं से बना है; (2) एक तत्व के परमाणु एक जैसे होते हैं; (3) परमाणु निश्चित पूर्ण संख्या अनुपात में जुड़ते हैं; (4) अभिक्रिया में परमाणु केवल पुनर्व्यवस्थित होते हैं। आज हम जानते हैं कि परमाणु विभाज्य है और समस्थानिकों का द्रव्यमान भिन्न होता है।</p>'),
  d3:'gasvol',cap3:B('Two volumes of hydrogen and one volume of oxygen combine to give two volumes of steam.','हाइड्रोजन के दो आयतन और ऑक्सीजन का एक आयतन मिलकर भाप के दो आयतन बनाते हैं।')},
 {h:B('1.4 Atomic and molecular mass','1.4 परमाणु एवं अणु द्रव्यमान'),
  body:B('<p>1 u = (1/12) × mass of one ¹²C atom = 1.66 × 10⁻²⁴ g.</p><p><b>Average atomic mass</b> (isotopes): M̄ = ΣMᵢxᵢ / Σxᵢ</p><p><b>Molecular mass:</b> sum of atomic masses in the molecule. C₆H₁₂O₆: 6(12) + 12(1) + 6(16) = 180 u.</p><p><b>Formula mass:</b> for ionic compounds (NaCl = 58.5 u), since there is no separate molecule.</p>',
  '<p>1 u = (1/12) × एक ¹²C परमाणु का द्रव्यमान = 1.66 × 10⁻²⁴ g।</p><p><b>औसत परमाणु द्रव्यमान</b> (समस्थानिक): M̄ = ΣMᵢxᵢ / Σxᵢ</p><p><b>अणु द्रव्यमान:</b> अणु के सभी परमाणुओं के द्रव्यमानों का योग। C₆H₁₂O₆: 6(12) + 12(1) + 6(16) = 180 u।</p><p><b>सूत्र द्रव्यमान:</b> आयनिक यौगिकों (NaCl = 58.5 u) के लिए, क्योंकि अलग अणु नहीं होता।</p>'),
  d3:'isotopes',cap3:B('Same 17 protons, different neutrons: ³⁵Cl (18 n) and ³⁷Cl (20 n), with their share in nature.','17 प्रोटॉन समान, न्यूट्रॉन अलग: ³⁵Cl (18 n) और ³⁷Cl (20 n), और प्रकृति में उनका अनुपात।')},
 {h:B('1.5 The mole concept','1.5 मोल अवधारणा'),
  body:B('<p>1 mole = 6.02214076 × 10²³ elementary entities. This is the <b>Avogadro constant</b> Nₐ. Molar mass (g mol⁻¹) is numerically equal to the atomic or molecular mass.</p><p class="fx">n = w/M = N/Nₐ = V/Vₘ = PV/RT</p><p><b>Mind the molar volume Vₘ:</b> at STP (273.15 K, 1 bar) it is 22.7 L mol⁻¹. Old STP/NTP (273 K, 1 atm): 22.4 L mol⁻¹. Use whichever condition the question gives, and only for gases.</p>',
  '<p>1 मोल = 6.02214076 × 10²³ मूल कण। यह <b>आवोगाद्रो नियतांक</b> Nₐ है। मोलर द्रव्यमान (g mol⁻¹) संख्यात्मक रूप से परमाणु/अणु द्रव्यमान के बराबर होता है।</p><p class="fx">n = w/M = N/Nₐ = V/Vₘ = PV/RT</p><p><b>मोलर आयतन Vₘ पर ध्यान दो:</b> STP (273.15 K, 1 bar) पर यह 22.7 L mol⁻¹ है। पुराना STP/NTP (273 K, 1 atm): 22.4 L mol⁻¹। प्रश्न में जो स्थिति दी हो वही लो, और केवल गैसों पर लगाओ।</p>'),
  d3:'molemap',cap3:B('Routes from mass, particles, gas volume and solution to moles, one at a time.','द्रव्यमान, कण, गैस आयतन और विलयन से मोल तक के रास्ते, एक-एक करके।')},
 {h:B('1.5.1 Counting with moles: water','1.5.1 मोल से गिनती: जल'),
  body:B('<p>In 9 g of water: n = 9/18 = 0.5 mol. That is 3.011 × 10²³ molecules, 9.03 × 10²³ atoms (3 per molecule) and 3.011 × 10²⁴ electrons (10 per molecule). Solve Examples 3, 4 and 5 at the end of the chapter.</p><p><b>Gas density:</b> d = PM/RT. <b>Vapour density:</b> VD = M/2. <b>Mixture:</b> M<sub>avg</sub> = Σxᵢ Mᵢ.</p>',
  '<p>9 g पानी में: n = 9/18 = 0.5 mol। यानी 3.011 × 10²³ अणु, 9.03 × 10²³ परमाणु (प्रति अणु 3) और 3.011 × 10²⁴ इलेक्ट्रॉन (प्रति अणु 10)। अध्याय के अंत में उदाहरण 3, 4 और 5 हल करो।</p><p><b>गैस घनत्व:</b> d = PM/RT। <b>वाष्प घनत्व:</b> VD = M/2। <b>मिश्रण:</b> M<sub>औसत</sub> = Σxᵢ Mᵢ।</p>'),
  d3:'water',cap3:B('A rotating H₂O model: 3 atoms, bond angle 104.5° and 10 electrons.','घूमता हुआ H₂O मॉडल: 3 परमाणु, बंध कोण 104.5° और 10 इलेक्ट्रॉन।')}
 ],
 formulas:[
  [B('Mole relations','मोल संबंध'),'n = w/M = N/N<sub>A</sub> = V/V<sub>m</sub> = PV/RT'],
  [B('Average atomic mass','औसत परमाणु द्रव्यमान'),'M̄ = ΣM<sub>i</sub>x<sub>i</sub> / Σx<sub>i</sub>'],
  [B('Gas density','गैस घनत्व'),'d = PM/RT'],
  [B('Vapour density','वाष्प घनत्व'),'VD = M/2'],
  [B('Mixture molar mass','मिश्रण का मोलर द्रव्यमान'),'M<sub>avg</sub> = Σx<sub>i</sub>M<sub>i</sub>'],
  [B('Temperature','तापमान'),'K = °C + 273.15; °F = (9/5)°C + 32']
 ],
 examples:[
  {lv:'fnd',q:B('Carbon and oxygen form CO and CO₂. Show which law applies.','कार्बन और ऑक्सीजन से CO और CO₂ बनते हैं। कौन-सा नियम लगता है, दिखाओ।'),
   a:B('With 12 g C: O is 16 g in CO and 32 g in CO₂. Ratio 16 : 32 = 1 : 2, a simple whole-number ratio, so the <b>law of multiple proportions</b>.','12 g C के साथ O: CO में 16 g, CO₂ में 32 g। अनुपात 16 : 32 = 1 : 2 सरल पूर्ण संख्या है, अतः <b>गुणित अनुपात का नियम</b>।')},
  {lv:'main',q:B('Chlorine: ³⁵Cl (34.97 u, 75.77%) and ³⁷Cl (36.97 u, 24.23%). Find the average atomic mass.','क्लोरीन: ³⁵Cl (34.97 u, 75.77%) और ³⁷Cl (36.97 u, 24.23%)। औसत परमाणु द्रव्यमान ज्ञात करो।'),
   a:B('34.97(0.7577) + 36.97(0.2423) = <b>35.45 u</b>.','34.97(0.7577) + 36.97(0.2423) = <b>35.45 u</b>।')},
  {lv:'fnd',q:B('For 9 g of water find moles, molecules, atoms and electrons.','9 g पानी में मोल, अणु, परमाणु और इलेक्ट्रॉन ज्ञात करो।'),
   a:B('n = 9/18 = 0.5. Molecules = 0.5Nₐ = 3.011×10²³. Atoms = 3 × molecules = 9.03×10²³. Electrons (10 each) = 5Nₐ = 3.011×10²⁴.','n = 9/18 = 0.5। अणु = 0.5Nₐ = 3.011×10²³। परमाणु = 3 × अणु = 9.03×10²³। इलेक्ट्रॉन (प्रति अणु 10) = 5Nₐ = 3.011×10²⁴।')},
  {lv:'main',q:B('How many electrons are in 1.6 g of CH₄?','1.6 g CH₄ में कितने इलेक्ट्रॉन हैं?'),
   a:B('n = 1.6/16 = 0.1; each molecule has 10 electrons; total = 1 mol = <b>6.022×10²³</b>.','n = 1.6/16 = 0.1; प्रति अणु 10 इलेक्ट्रॉन; कुल = 1 मोल = <b>6.022×10²³</b>।')},
  {lv:'adv',q:B('(Minimum molar mass) Haemoglobin has 0.334% Fe and 4 Fe atoms per molecule. Find its molar mass.','(न्यूनतम मोलर द्रव्यमान) हीमोग्लोबिन में 0.334% Fe है और प्रति अणु 4 Fe परमाणु हैं। मोलर द्रव्यमान ज्ञात करो।'),
   a:B('0.00334 M = 4 × 56 ⇒ M ≈ <b>6.7×10⁴ g mol⁻¹</b>.','0.00334 M = 4 × 56 ⇒ M ≈ <b>6.7×10⁴ g mol⁻¹</b>।')}
 ],
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

D3.limiting={en:'Limiting reagent',hi:'सीमांत अभिकर्मक',h:0.6,view:{yaw:-0.2,pitch:0.18,zoom:1},
 frame:function(S,t,P,l){
  var p=(t%9)/9,go=p<0.25?0:(p<0.55?(p-0.25)/0.3:1),R=[[-2.4,0.7],[-2.4,-0.7]],Hs=[[-0.9,0.9],[-0.9,0],[-0.9,-0.9]];
  mol(S,N2,[[0,1]],[R[1][0],R[1][1],0],l);
  S.text([R[1][0],R[1][1]-0.4,0],T(l,'left over','बचा'),'accent',11,'center',true);
  if(p<0.6){
    mol(S,N2,[[0,1]],[R[0][0]+go*(0.2-R[0][0]),R[0][1]*(1-go),0],l);
    Hs.forEach(function(h){mol(S,H2,[[0,1]],[h[0]+go*(0.2-h[0]),h[1]*(1-go),0],l)});
  }else if(p<0.68){S.ball([0.2,0,0],0.3+0.2*Math.sin((p-0.6)/0.08*3.14),'gold')}
  if(p>=0.68){var y=Math.min(1,(p-0.68)/0.2);[0.55,-0.55].forEach(function(q){mol(S,NH3,[[0,1],[0,2],[0,3]],[0.2+y*2.0,q*y,0],l)})}
  S.hud(0.5,0.9,'2 N₂ + 3 H₂ → 2 NH₃ + N₂   (H₂ '+T(l,'limiting','सीमांत')+')','accent',13,'center',true);
 }};

D3.dilution={en:'Dilution',hi:'तनुकरण',h:0.7,view:{yaw:-0.45,pitch:0.28,zoom:1},
 params:[{k:'w',en:'Water added',hi:'मिलाया पानी',min:0,max:100,val:0,step:1,unit:'%'}],
 frame:function(S,t,P,l){
  var V=1+3*P.w/100,h=0.45*V;
  wire(S,'ink',0,-1+h,0,0.9,h,0.9);
  for(var i=0;i<12;i++){
    var u=((i*37)%100)/100,v=((i*53)%100)/100,w=((i*71)%100)/100;
    S.ball([(u*2-1)*0.8+0.04*Math.sin(t*3+i),-1+(v*2*h)*0.92+0.04,(w*2-1)*0.8+0.04*Math.cos(t*3+i)],0.1,'bad');
  }
  S.text([0,-1.25,0],T(l,'Same 12 solute particles · volume ×'+V.toFixed(1),'विलेय कण वही 12 · आयतन ×'+V.toFixed(1)),'accent',12,'center',true);
  S.hud(0.5,0.08,'M₂ = M₁V₁/V₂ = '+(1/V).toFixed(2)+' × M₁','ink',14,'center',true);
 }};

D3.titration={en:'Titration: KMnO₄ vs FeSO₄',hi:'अनुमापन: KMnO₄ बनाम FeSO₄',h:0.9,view:{yaw:-0.4,pitch:0.15,zoom:1},
 frame:function(S,t,P,l){
  var p=(t%12)/12,fill=Math.max(0,1-p/0.8*0.5),end=p>0.8;
  wire(S,'ink',0,1.15,0,0.12,0.9,0.12);
  S.box([0,1.15-0.9+fill*0.9*0.98,0],[0.2,fill*1.76,0.2],'#B07CC6');
  S.text([0.55,1.7,0],'KMnO₄','accent',12,'left',true);
  S.line([0,0.2,0],[0,0.08,0],'ink',2);
  if(p<0.8){var d=(t*1.25)%1;S.ball([0,0.1-d*0.8,0],0.05,'#B07CC6')}
  S.box([0,-0.75,0],[1.3,0.9,1.3],end?'#F2A6CB':'#D9E8DD');
  S.text([0,-1.45,0],T(l,'flask: FeSO₄ + acid','फ्लास्क: FeSO₄ + अम्ल'),'ink',11,'center',true);
  S.hud(0.5,0.06,end?T(l,'End point: faint pink stays','अंत बिंदु: हल्का गुलाबी रंग टिकता है'):T(l,'Drop by drop…','बूँद-बूँद करके…'),end?'bad':'muted',13,'center',true);
 }};

var c=CH.filter(function(x){return x.id==='chemistry-mole-concept'})[0];
c.sections.push(
 {h:B('1.6 Percentage composition and formula','1.6 प्रतिशत संघटन एवं सूत्र'),
  body:B('<p class="fx">Mass % = (mass of element in formula / molar mass) × 100</p><p><b>Empirical formula:</b> the simplest atom ratio. <b>Molecular formula</b> = (empirical)ₙ, where n = M / empirical formula mass.</p><p><b>4 steps:</b> % → grams (take 100 g) → moles → divide by the smallest (multiply to get whole numbers if needed).</p><p>See Examples 6, 7 and 8 (the last one is a combustion analysis).</p>',
  '<p class="fx">द्रव्यमान % = (सूत्र में तत्व का द्रव्यमान / मोलर द्रव्यमान) × 100</p><p><b>मूलानुपाती सूत्र:</b> परमाणुओं का सबसे सरल अनुपात। <b>आण्विक सूत्र</b> = (मूलानुपाती)ₙ, जहाँ n = M / मूलानुपाती सूत्र द्रव्यमान।</p><p><b>4 चरण:</b> % → ग्राम (100 g लो) → मोल → सबसे छोटे से भाग दो (पूर्ण संख्या के लिए आवश्यक हो तो गुणा करो)।</p><p>उदाहरण 6, 7 और 8 देखो (अंतिम दहन विश्लेषण का है)।</p>')},
 {h:B('1.7 Stoichiometry','1.7 स्टॉइकियोमेट्री'),
  body:B('<p>The coefficients of a balanced equation give <b>mole ratios</b>, not mass ratios.</p><p>CH₄ + 2 O₂ → CO₂ + 2 H₂O</p><p>1 mol : 2 mol : 1 mol : 2 mol, that is 16 g : 64 g : 44 g : 36 g. See Example 9 (impure sample).</p>',
  '<p>संतुलित समीकरण के गुणांक <b>मोल अनुपात</b> बताते हैं, द्रव्यमान अनुपात नहीं।</p><p>CH₄ + 2 O₂ → CO₂ + 2 H₂O</p><p>1 मोल : 2 मोल : 1 मोल : 2 मोल, यानी 16 g : 64 g : 44 g : 36 g। उदाहरण 9 देखो (अशुद्ध नमूना)।</p>')},
 {h:B('1.7.1 Limiting reagent','1.7.1 सीमांत अभिकर्मक'),
  body:B('<p>The reactant that is used up <b>first</b>. Find moles / coefficient for each reactant; the <b>smallest</b> value is the limiting reagent. The product is always calculated from it. See Example 10.</p>',
  '<p>जो अभिकारक <b>सबसे पहले</b> खत्म होता है। हर अभिकारक का मोल / गुणांक निकालो; <b>सबसे छोटा</b> मान सीमांत अभिकर्मक है। उत्पाद हमेशा उसी से निकलता है। उदाहरण 10 देखो।</p>'),
  d3:'limiting',cap3:B('Molecules react; the reactant that runs out first stops the reaction and the other is left over.','अणु अभिक्रिया करते हैं; जो पहले खत्म होता है वही अभिक्रिया रोकता है और दूसरा बच जाता है।')},
 {h:B('1.7.2 Percentage yield and sequential reactions','1.7.2 प्रतिशत उपज एवं क्रमिक अभिक्रियाएँ'),
  body:B('<p class="fx">% yield = (actual / theoretical) × 100</p><p>In a series of reactions the overall yield is the <b>product of all the yields</b>. See Example 11.</p>',
  '<p class="fx">% उपज = (वास्तविक / सैद्धांतिक) × 100</p><p>क्रमिक अभिक्रियाओं में कुल उपज <b>सभी उपजों का गुणनफल</b> होती है। उदाहरण 11 देखो।</p>')},
 {h:B('1.8 Concentration terms','1.8 सांद्रता के पद'),
  body:B('<table><tr><th>Term</th><th>Formula</th><th>Depends on T?</th></tr><tr><td>Mass % (w/w)</td><td>w<sub>solute</sub>/w<sub>solution</sub> × 100</td><td>No</td></tr><tr><td>w/V %</td><td>w<sub>solute</sub>(g)/V<sub>solution</sub>(mL) × 100</td><td>Yes</td></tr><tr><td>ppm</td><td>w<sub>solute</sub>/w<sub>solution</sub> × 10⁶</td><td>No</td></tr><tr><td>Mole fraction</td><td>x<sub>A</sub> = n<sub>A</sub>/(n<sub>A</sub>+n<sub>B</sub>)</td><td>No</td></tr><tr><td>Molarity M</td><td>n<sub>solute</sub>/V<sub>solution</sub>(L)</td><td>Yes</td></tr><tr><td>Molality m</td><td>n<sub>solute</sub>/w<sub>solvent</sub>(kg)</td><td>No</td></tr></table><p>See Example 12.</p>',
  '<table><tr><th>पद</th><th>सूत्र</th><th>T पर निर्भर?</th></tr><tr><td>द्रव्यमान % (w/w)</td><td>w<sub>विलेय</sub>/w<sub>विलयन</sub> × 100</td><td>नहीं</td></tr><tr><td>w/V %</td><td>w<sub>विलेय</sub>(g)/V<sub>विलयन</sub>(mL) × 100</td><td>हाँ</td></tr><tr><td>ppm</td><td>w<sub>विलेय</sub>/w<sub>विलयन</sub> × 10⁶</td><td>नहीं</td></tr><tr><td>मोल अंश</td><td>x<sub>A</sub> = n<sub>A</sub>/(n<sub>A</sub>+n<sub>B</sub>)</td><td>नहीं</td></tr><tr><td>मोलरता M</td><td>n<sub>विलेय</sub>/V<sub>विलयन</sub>(L)</td><td>हाँ</td></tr><tr><td>मोललता m</td><td>n<sub>विलेय</sub>/w<sub>विलायक</sub>(kg)</td><td>नहीं</td></tr></table><p>उदाहरण 12 देखो।</p>')},
 {h:B('1.8.1 Interconversion (JEE favourite)','1.8.1 आपसी रूपांतरण (JEE का पसंदीदा)'),
  body:B('<p>Solute molar mass M₂, solvent M₁, density d (g mL⁻¹):</p><p class="fx">m = 1000M / (1000d − M·M₂) &nbsp; M = 10d(%w/w)/M₂ &nbsp; x₂/x₁ = mM₁/1000</p><p><b>If you forget the formula:</b> assume 1 L of solution (or 1 kg of solvent), write grams of solute and solvent, then apply the definition. See Examples 13, 14 and 15.</p>',
  '<p>विलेय का मोलर द्रव्यमान M₂, विलायक का M₁, घनत्व d (g mL⁻¹):</p><p class="fx">m = 1000M / (1000d − M·M₂) &nbsp; M = 10d(%w/w)/M₂ &nbsp; x₂/x₁ = mM₁/1000</p><p><b>सूत्र भूल जाओ तो:</b> 1 L विलयन (या 1 kg विलायक) मान लो, विलेय और विलायक के ग्राम लिखो, फिर परिभाषा लगाओ। उदाहरण 13, 14 और 15 देखो।</p>')},
 {h:B('1.8.2 Dilution and mixing','1.8.2 तनुकरण एवं मिश्रण'),
  body:B('<p class="fx">M₁V₁ = M₂V₂ &nbsp; M<sub>mix</sub> = (M₁V₁ + M₂V₂)/(V₁ + V₂)</p><p>(same solute, no reaction). Always add acid to water, never the reverse. See Examples 16 and 17.</p>',
  '<p class="fx">M₁V₁ = M₂V₂ &nbsp; M<sub>मिश्रण</sub> = (M₁V₁ + M₂V₂)/(V₁ + V₂)</p><p>(एक ही विलेय, कोई अभिक्रिया नहीं)। अम्ल को हमेशा पानी में डालो, उल्टा कभी नहीं। उदाहरण 16 और 17 देखो।</p>'),
  d3:'dilution',cap3:B('On adding water the number of solute particles stays the same but they spread apart. Move the slider.','पानी डालने पर विलेय कणों की संख्या वही रहती है पर वे दूर-दूर हो जाते हैं। स्लाइडर चलाओ।')},
 {h:B('1.9 POAC and mixture problems','1.9 POAC एवं मिश्रण के प्रश्न'),
  body:B('<p><b>Principle of Atom Conservation:</b> the moles of atoms of an element are equal on both sides of a reaction, so you do not even need the fully balanced equation. See Examples 18 and 19.</p>',
  '<p><b>परमाणु संरक्षण का सिद्धांत:</b> किसी तत्व के परमाणुओं के मोल अभिक्रिया के दोनों ओर बराबर होते हैं, इसलिए पूरा संतुलित समीकरण भी ज़रूरी नहीं। उदाहरण 18 और 19 देखो।</p>')},
 {h:B('1.10 Equivalent concept','1.10 तुल्यांक अवधारणा'),
  body:B('<p class="fx">E = M / n-factor &nbsp; N = M × n &nbsp; eq = w/E = N·V(L)</p><table><tr><th>Species</th><th>n-factor</th></tr><tr><td>Acid</td><td>replaceable H⁺ (H₂SO₄: 2, H₃PO₃: 2)</td></tr><tr><td>Base</td><td>replaceable OH⁻ (Ca(OH)₂: 2)</td></tr><tr><td>Redox</td><td>change in electrons per formula unit</td></tr><tr><td>KMnO₄ (acidic)</td><td>5</td></tr><tr><td>K₂Cr₂O₇ (acidic)</td><td>6</td></tr><tr><td>Fe²⁺ → Fe³⁺</td><td>1</td></tr></table>',
  '<p class="fx">E = M / n-गुणक &nbsp; N = M × n &nbsp; eq = w/E = N·V(L)</p><table><tr><th>स्पीशीज़</th><th>n-गुणक</th></tr><tr><td>अम्ल</td><td>प्रतिस्थापित होने वाले H⁺ (H₂SO₄: 2, H₃PO₃: 2)</td></tr><tr><td>क्षार</td><td>प्रतिस्थापित होने वाले OH⁻ (Ca(OH)₂: 2)</td></tr><tr><td>रेडॉक्स</td><td>प्रति सूत्र इकाई इलेक्ट्रॉन परिवर्तन</td></tr><tr><td>KMnO₄ (अम्लीय)</td><td>5</td></tr><tr><td>K₂Cr₂O₇ (अम्लीय)</td><td>6</td></tr><tr><td>Fe²⁺ → Fe³⁺</td><td>1</td></tr></table>')},
 {h:B('1.10.1 Law of equivalence and titration','1.10.1 तुल्यांक का नियम एवं अनुमापन'),
  body:B('<p><b>Law of equivalence:</b> equivalents of reactants are equal in a reaction: N₁V₁ = N₂V₂. See Example 20.</p><p><b>Volume strength of H₂O₂:</b> “V volume” means 1 L of solution gives V L of O₂: 2 H₂O₂ → 2 H₂O + O₂. At 1 atm and 273 K:</p><p class="fx">V = 11.2 × M = 5.6 × N &nbsp; (at 1 bar: V = 11.35 M)</p><p>See Example 21.</p>',
  '<p><b>तुल्यांक का नियम:</b> अभिक्रिया में अभिकारकों के तुल्यांक बराबर होते हैं: N₁V₁ = N₂V₂। उदाहरण 20 देखो।</p><p><b>H₂O₂ की आयतन सामर्थ्य:</b> “V आयतन” का अर्थ है 1 L विलयन से V L O₂ मिलती है: 2 H₂O₂ → 2 H₂O + O₂। 1 atm और 273 K पर:</p><p class="fx">V = 11.2 × M = 5.6 × N &nbsp; (1 bar पर: V = 11.35 M)</p><p>उदाहरण 21 देखो।</p>'),
  d3:'titration',cap3:B('KMnO₄ falls drop by drop from the burette; at the end point a faint pink colour stays.','ब्यूरेट से KMnO₄ बूँद-बूँद गिरता है; अंत बिंदु पर हल्का गुलाबी रंग टिक जाता है।')}
);

c.examples.push(
 {lv:'fnd',q:B('Find the percentage composition of ethanol, C₂H₅OH.','एथेनॉल C₂H₅OH का प्रतिशत संघटन ज्ञात करो।'),
  a:B('M = 46. C = 24/46 = 52.17%; H = 6/46 = 13.04%; O = 16/46 = 34.78%.','M = 46। C = 24/46 = 52.17%; H = 6/46 = 13.04%; O = 16/46 = 34.78%।')},
 {lv:'main',q:B('A compound has H 4.07%, C 24.27%, Cl 71.65%; molar mass 98.96. Find the formula.','एक यौगिक में H 4.07%, C 24.27%, Cl 71.65%; मोलर द्रव्यमान 98.96। सूत्र ज्ञात करो।'),
  a:B('Moles: C 2.02, H 4.04, Cl 2.02. Ratio 1 : 2 : 1, so CH₂Cl (mass 49.48). n = 2: <b>C₂H₄Cl₂</b>.','मोल: C 2.02, H 4.04, Cl 2.02। अनुपात 1 : 2 : 1, अतः CH₂Cl (द्रव्यमान 49.48)। n = 2: <b>C₂H₄Cl₂</b>।')},
 {lv:'main',q:B('(Combustion) 0.30 g of a compound (C, H, O) gives 0.44 g CO₂ and 0.18 g H₂O. M = 60. Find the formula.','(दहन) 0.30 g यौगिक (C, H, O) से 0.44 g CO₂ और 0.18 g H₂O मिलते हैं। M = 60। सूत्र ज्ञात करो।'),
  a:B('C = 0.01 mol (0.12 g); H = 0.02 mol (0.02 g); O = 0.30 − 0.14 = 0.16 g = 0.01 mol. Empirical CH₂O, n = 2: <b>C₂H₄O₂</b>.','C = 0.01 मोल (0.12 g); H = 0.02 मोल (0.02 g); O = 0.30 − 0.14 = 0.16 g = 0.01 मोल। मूलानुपाती CH₂O, n = 2: <b>C₂H₄O₂</b>।')},
 {lv:'main',q:B('20 g of 80% pure CaCO₃ is heated. Find the mass of CO₂ and its volume at STP (1 bar).','80% शुद्ध CaCO₃ के 20 g को गर्म करने पर CO₂ का द्रव्यमान और STP (1 bar) पर आयतन ज्ञात करो।'),
  a:B('CaCO₃ → CaO + CO₂. Pure = 16 g = 0.16 mol. CO₂ = 0.16 mol = <b>7.04 g = 3.63 L</b>.','CaCO₃ → CaO + CO₂। शुद्ध = 16 g = 0.16 मोल। CO₂ = 0.16 मोल = <b>7.04 g = 3.63 L</b>।')},
 {lv:'main',q:B('50 kg N₂ and 10 kg H₂ react to form NH₃. Find the NH₃ formed.','50 kg N₂ और 10 kg H₂ से NH₃ बनती है। बनी NH₃ ज्ञात करो।'),
  a:B('N₂ + 3H₂ → 2NH₃. N₂ = 1786 mol, H₂ = 5000 mol. 1786/1 > 5000/3, so H₂ is limiting. NH₃ = (2/3)(5000) = 3333 mol ≈ <b>56.7 kg</b>.','N₂ + 3H₂ → 2NH₃। N₂ = 1786 मोल, H₂ = 5000 मोल। 1786/1 > 5000/3, अतः H₂ सीमांत है। NH₃ = (2/3)(5000) = 3333 मोल ≈ <b>56.7 kg</b>।')},
 {lv:'main',q:B('16 kg S → H₂SO₄: S → SO₂ (80%), SO₂ → SO₃ (90%), SO₃ → H₂SO₄ (100%). Find the H₂SO₄.','16 kg S से H₂SO₄: S → SO₂ (80%), SO₂ → SO₃ (90%), SO₃ → H₂SO₄ (100%)। H₂SO₄ ज्ञात करो।'),
  a:B('S = 500 mol. H₂SO₄ = 500(0.8)(0.9) = 360 mol = <b>35.28 kg</b>.','S = 500 मोल। H₂SO₄ = 500(0.8)(0.9) = 360 मोल = <b>35.28 kg</b>।')},
 {lv:'fnd',q:B('4 g NaOH in 250 mL solution. Find the molarity.','4 g NaOH, 250 mL विलयन में। मोलरता ज्ञात करो।'),
  a:B('n = 0.1; M = 0.1/0.250 = <b>0.4 M</b>.','n = 0.1; M = 0.1/0.250 = <b>0.4 M</b>।')},
 {lv:'main',q:B('3 M NaCl has d = 1.25 g mL⁻¹. Find the molality.','3 M NaCl का घनत्व d = 1.25 g mL⁻¹। मोललता ज्ञात करो।'),
  a:B('1 L: solution 1250 g, solute 175.5 g, solvent 1.0745 kg. m = 3/1.0745 = <b>2.79</b>.','1 L में: विलयन 1250 g, विलेय 175.5 g, विलायक 1.0745 kg। m = 3/1.0745 = <b>2.79</b>।')},
 {lv:'main',q:B('In a 1 molal aqueous solution, find the mole fraction of the solute.','1 मोलल जलीय विलयन में विलेय का मोल अंश ज्ञात करो।'),
  a:B('1 mol solute, 1000/18 = 55.56 mol water. x = 1/56.56 = <b>0.0177</b>.','1 मोल विलेय, 1000/18 = 55.56 मोल पानी। x = 1/56.56 = <b>0.0177</b>।')},
 {lv:'main',q:B('98% (w/w) H₂SO₄, d = 1.84. How much acid is needed for 500 mL of 1 M?','98% (w/w) H₂SO₄, d = 1.84। 500 mL 1 M बनाने के लिए कितना अम्ल चाहिए?'),
  a:B('M = 10(1.84)(98)/98 = 18.4 M. 18.4V = 1 × 500 ⇒ V = <b>27.2 mL</b>. (Add acid to water, not the reverse.)','M = 10(1.84)(98)/98 = 18.4 M। 18.4V = 1 × 500 ⇒ V = <b>27.2 mL</b>। (अम्ल को पानी में डालो, उल्टा नहीं।)')},
 {lv:'fnd',q:B('Mix 200 mL of 0.5 M HCl with 300 mL of 0.2 M HCl. Find the molarity.','200 mL 0.5 M HCl को 300 mL 0.2 M HCl में मिलाओ। मोलरता ज्ञात करो।'),
  a:B('(100 + 60)/500 = <b>0.32 M</b>.','(100 + 60)/500 = <b>0.32 M</b>।')},
 {lv:'adv',q:B('100 mL 0.1 M H₂SO₄ + 100 mL 0.1 M NaOH. Find final [H⁺] (strong acid, fully ionised).','100 mL 0.1 M H₂SO₄ + 100 mL 0.1 M NaOH। अंतिम [H⁺] ज्ञात करो (प्रबल अम्ल, पूर्ण आयनित)।'),
  a:B('H⁺ = 20 mmol, OH⁻ = 10 mmol; 10 mmol left in 200 mL: <b>0.05 M</b>.','H⁺ = 20 mmol, OH⁻ = 10 mmol; 200 mL में 10 mmol बचे: <b>0.05 M</b>।')},
 {lv:'main',q:B('12.25 g KClO₃ decomposes completely to KCl + O₂. Find the O₂ volume (1 bar STP).','12.25 g KClO₃ पूर्णतः विघटित होकर KCl + O₂ देता है। O₂ का आयतन ज्ञात करो (1 bar STP)।'),
  a:B('O atoms: 3 × n(KClO₃) = 2 × n(O₂). 3(0.1) = 2n ⇒ n = 0.15 mol = <b>3.41 L</b>.','O परमाणु: 3 × n(KClO₃) = 2 × n(O₂)। 3(0.1) = 2n ⇒ n = 0.15 मोल = <b>3.41 L</b>।')},
 {lv:'adv',q:B('A 1.84 g mixture of CaCO₃ and MgCO₃ leaves 0.96 g of oxide on heating. Find the composition.','CaCO₃ और MgCO₃ के 1.84 g मिश्रण को गर्म करने पर 0.96 g ऑक्साइड बचता है। संघटन ज्ञात करो।'),
  a:B('Let CaCO₃ = x g: (x/100)(56) + ((1.84 − x)/84)(40) = 0.96. Solving, x = 1.00 g; <b>MgCO₃ = 0.84 g</b>.','माना CaCO₃ = x g: (x/100)(56) + ((1.84 − x)/84)(40) = 0.96। हल करने पर x = 1.00 g; <b>MgCO₃ = 0.84 g</b>।')},
 {lv:'main',q:B('25 mL of FeSO₄ needs 20 mL of 0.02 M acidic KMnO₄. Find the molarity of FeSO₄.','25 mL FeSO₄ को 20 mL 0.02 M अम्लीय KMnO₄ चाहिए। FeSO₄ की मोलरता ज्ञात करो।'),
  a:B('M₁(25)(1) = 0.02(20)(5) ⇒ <b>M₁ = 0.08 M</b>.','M₁(25)(1) = 0.02(20)(5) ⇒ <b>M₁ = 0.08 M</b>।')},
 {lv:'main',q:B('For 10 volume H₂O₂ (1 atm convention) find molarity and strength in g/L.','10 आयतन H₂O₂ (1 atm परिपाटी) की मोलरता और g/L में सामर्थ्य ज्ञात करो।'),
  a:B('M = 10/11.2 = 0.893 M; strength = 0.893 × 34 = <b>30.4 g L⁻¹</b>.','M = 10/11.2 = 0.893 M; सामर्थ्य = 0.893 × 34 = <b>30.4 g L⁻¹</b>।')}
);
})();

// Class 11 Chemistry — Ch 1 — PART 3 of 3: sections 1.11–1.14, examples 22–23, 3D animations 11–12, formula sheet
(function(){
var T=VH.T,mol=VH.mol,wire=VH.wire,B=function(e,h){return {en:e,hi:h}};

D3.eudio={en:'Eudiometry',hi:'यूडियोमेट्री (गैस विश्लेषण)',h:0.8,view:{yaw:-0.35,pitch:0.12,zoom:1},
 frame:function(S,t,P,l){
  var st=Math.floor((t%12)/4),lt=(t%12)%4,Y=-1,hh=function(v){return v/65*2},
   stages=[[['HC 10','chem',10],['O₂ 55','phys',55]],[['CO₂ 30','good',30],['O₂ 10','phys',10]],[['O₂ 10','phys',10]]],
   vol=[65,40,10],name=[T(l,'Hydrocarbon + O₂ mixed','हाइड्रोकार्बन + O₂ मिश्रण'),T(l,'After spark and cooling (water condenses)','स्पार्क और ठंडा करने के बाद (पानी द्रव बना)'),T(l,'After KOH (CO₂ absorbed)','KOH के बाद (CO₂ अवशोषित)')];
  wire(S,'ink',0,0,0,0.36,1,0.36);
  var y=Y;stages[st].forEach(function(s){var h=hh(s[2]);S.box([0,y+h/2,0],[0.6,h,0.6],s[1]);S.text([0.75,y+h/2,0],s[0]+' mL',s[1]==='good'?'good':'ink',12,'left',true);y+=h});
  if(st===1&&lt<0.8)S.ball([0,0,0.4],0.3+0.2*Math.sin(lt/0.8*3.14),'gold');
  if(st===2&&lt<1.2){S.text([-0.9,0.9,0],'KOH ↓','bad',13,'center',true)}
  S.hud(0.5,0.06,name[st]+' · '+vol[st]+' mL','accent',12,'center',true);
 }};

D3.dissoc={en:'Dissociation N₂O₄ ⇌ 2NO₂',hi:'वियोजन N₂O₄ ⇌ 2NO₂',h:0.55,view:{yaw:-0.2,pitch:0.15,zoom:1},
 frame:function(S,t,P,l){
  var p=(t%8)/8,d=p<0.2?0:p<0.5?1.5*(p-0.2)/0.3:p<0.65?1.5:p<0.95?1.5*(1-(p-0.65)/0.3):0,
   N='phys',O='bad',bond=d<0.05;
  [[-1,-1],[1,1]].forEach(function(s){
    var sg=s[1],nx=sg*(0.22+d);
    var A=[[nx,0,0,N,0.17],[nx+sg*0.28,0.4,0,O,0.14],[nx+sg*0.28,-0.4,0,O,0.14]];
    mol(S,A,[[0,1],[0,2]],[0,0,0],l);
  });
  if(bond)S.rod([-0.22,0,0],[0.22,0,0],0.04,'muted');
  S.hud(0.5,0.9,bond?'N₂O₄':(d>=1.4?'2 NO₂':'N₂O₄ ⇌ 2 NO₂'),'accent',14,'center',true);
 }};

var c=CH.filter(function(x){return x.id==='chemistry-mole-concept'})[0];
c.sections.push(
 {h:B('1.11 Gas analysis (eudiometry)','1.11 गैस विश्लेषण (यूडियोमेट्री)'),
  body:B('<p>CₓHᵧ + (x + y/4) O₂ → x CO₂ + (y/2) H₂O(l)</p><p>On cooling, water becomes liquid; KOH absorbs CO₂; the gas left is excess O₂. See Example 22.</p>',
  '<p>CₓHᵧ + (x + y/4) O₂ → x CO₂ + (y/2) H₂O(द्र)</p><p>ठंडा करने पर पानी द्रव बन जाता है; KOH CO₂ सोख लेता है; बची गैस अधिक O₂ है। उदाहरण 22 देखो।</p>'),
  d3:'eudio',cap3:B('Spark causes an explosion, water condenses, and KOH absorbs the CO₂.','स्पार्क से विस्फोट होता है, पानी जम जाता है और KOH CO₂ सोख लेता है।')},
 {h:B('1.11.1 Dissociation and vapour density','1.11.1 वियोजन एवं वाष्प घनत्व'),
  body:B('<p>For A → nB, the degree of dissociation is</p><p class="fx">α = (D − d) / ((n − 1)d)</p><p>(D = theoretical VD, d = observed VD). See Example 23.</p>',
  '<p>A → nB के लिए वियोजन की मात्रा</p><p class="fx">α = (D − d) / ((n − 1)d)</p><p>(D = सैद्धांतिक VD, d = प्रेक्षित VD)। उदाहरण 23 देखो।</p>'),
  d3:'dissoc',cap3:B('N₂O₄ splits into two NO₂ and recombines.','N₂O₄ टूटकर दो NO₂ बनाता है और फिर जुड़ जाता है।')},
 {h:B('1.12 Common mistakes','1.12 आम गलतियाँ'),
  body:B('<ol><li>Confusing molecules and atoms (Nₐ molecules of O₂ have 2Nₐ atoms).</li><li>Molarity uses the <b>solution</b>; molality uses the <b>solvent</b>.</li><li>Do not apply 22.4 / 22.7 L to a liquid or solid.</li><li>Do not choose the limiting reagent by mass.</li><li>Do not use mole ratios before balancing the equation.</li><li>The n-factor depends on the reaction.</li></ol>',
  '<ol><li>अणु और परमाणु में भ्रम (O₂ के Nₐ अणुओं में 2Nₐ परमाणु)।</li><li>मोलरता में <b>विलयन</b>, मोललता में <b>विलायक</b>।</li><li>22.4 / 22.7 L द्रव या ठोस पर मत लगाओ।</li><li>सीमांत अभिकर्मक द्रव्यमान देखकर मत चुनो।</li><li>समीकरण संतुलित किए बिना मोल अनुपात मत लगाओ।</li><li>n-गुणक अभिक्रिया पर निर्भर करता है।</li></ol>')},
 {h:B('1.13 Practice exercise','1.13 अभ्यास प्रश्न'),
  body:B('<h3>A. Single correct</h3><ol><li>Most atoms: (a) 4 g H₂ (b) 16 g O₂ (c) 28 g N₂ (d) 18 g H₂O</li><li>Mass of one ¹²C atom (g): (a) 1.99×10⁻²³ (b) 12 (c) 1.66×10⁻²⁴ (d) 6.02×10⁻²³</li><li>Independent of temperature: (a) molarity (b) normality (c) molality (d) w/V %</li><li>Same composition of CO₂ from different sources: (a) multiple proportions (b) definite proportions (c) Avogadro (d) Gay-Lussac</li><li>Empirical formula CH₂O, molar mass 180: (a) C₂H₄O₂ (b) C₃H₆O₃ (c) C₆H₁₂O₆ (d) C₅H₁₀O₅</li><li>Moles of O atoms in 0.2 mol Al₂(SO₄)₃: (a) 0.8 (b) 1.2 (c) 2.4 (d) 12</li><li>Water from 2 g H₂ + 16 g O₂: (a) 9 g (b) 18 g (c) 36 g (d) 17 g</li><li>Mole fraction of glucose in 10% (w/w) glucose solution: (a) 0.011 (b) 0.10 (c) 0.055 (d) 0.99</li><li>0.5 M HCl needed for 1 g CaCO₃: (a) 20 mL (b) 40 mL (c) 10 mL (d) 80 mL</li><li>0.002 g solute in 1 kg of solution: ppm = (a) 0.2 (b) 2 (c) 20 (d) 200</li></ol><h3>B. One or more correct</h3><ol start="11"><li>0.5 mol CO₂: (a) 22 g (b) 1 mol O atoms (c) 3.011×10²³ molecules (d) 11 mol electrons</li><li>Independent of T: (a) molality (b) mole fraction (c) mass % (d) molarity</li><li>28 g N₂ + 8 g H₂ (100% reaction): (a) N₂ limiting (b) 34 g NH₃ (c) 2 g H₂ left (d) 36 g NH₃</li></ol><h3>C. Integer type</h3><ol start="14"><li>Moles of CO₂ from complete combustion of 0.5 mol butane?</li><li>Molarity of pure water (d = 1 g mL⁻¹), nearest integer?</li><li>A compound has 8% sulphur. Minimum molar mass?</li><li>Water (mL) to dilute 100 mL of 1 M to 0.25 M?</li><li>n-factor of KMnO₄ in acidic medium?</li><li>100 mL 0.1 M BaCl₂ + 100 mL 0.1 M Na₂SO₄: BaSO₄ formed (millimole)?</li></ol><h3>D. Subjective</h3><ol start="20"><li>A metal oxide has 60% metal. Find the equivalent mass of the metal.</li><li>A 1.90 g mixture of NaHCO₃ and Na₂CO₃ loses 0.31 g on heating. Find the composition.</li><li>1 g of limestone needs 18 mL of 1 M HCl (impurity inert). Find the purity.</li></ol>',
  '<h3>A. एकल सही</h3><ol><li>सबसे अधिक परमाणु: (a) 4 g H₂ (b) 16 g O₂ (c) 28 g N₂ (d) 18 g H₂O</li><li>एक ¹²C परमाणु का द्रव्यमान (g): (a) 1.99×10⁻²³ (b) 12 (c) 1.66×10⁻²⁴ (d) 6.02×10⁻²³</li><li>तापमान से स्वतंत्र: (a) मोलरता (b) नॉर्मलता (c) मोललता (d) w/V %</li><li>अलग-अलग स्रोतों के CO₂ का समान संघटन: (a) गुणित अनुपात (b) निश्चित अनुपात (c) आवोगाद्रो (d) गे-लुसाक</li><li>मूलानुपाती CH₂O, मोलर द्रव्यमान 180: (a) C₂H₄O₂ (b) C₃H₆O₃ (c) C₆H₁₂O₆ (d) C₅H₁₀O₅</li><li>0.2 मोल Al₂(SO₄)₃ में O परमाणुओं के मोल: (a) 0.8 (b) 1.2 (c) 2.4 (d) 12</li><li>2 g H₂ + 16 g O₂ से पानी: (a) 9 g (b) 18 g (c) 36 g (d) 17 g</li><li>10% (w/w) ग्लूकोज़ विलयन में ग्लूकोज़ का मोल अंश: (a) 0.011 (b) 0.10 (c) 0.055 (d) 0.99</li><li>1 g CaCO₃ के लिए 0.5 M HCl: (a) 20 mL (b) 40 mL (c) 10 mL (d) 80 mL</li><li>1 kg विलयन में 0.002 g विलेय: ppm = (a) 0.2 (b) 2 (c) 20 (d) 200</li></ol><h3>B. एक या अधिक सही</h3><ol start="11"><li>0.5 मोल CO₂: (a) 22 g (b) 1 मोल O परमाणु (c) 3.011×10²³ अणु (d) 11 मोल इलेक्ट्रॉन</li><li>T से स्वतंत्र: (a) मोललता (b) मोल अंश (c) द्रव्यमान % (d) मोलरता</li><li>28 g N₂ + 8 g H₂ (100% अभिक्रिया): (a) N₂ सीमांत (b) 34 g NH₃ (c) 2 g H₂ बचेगा (d) 36 g NH₃</li></ol><h3>C. पूर्णांक प्रकार</h3><ol start="14"><li>0.5 मोल ब्यूटेन के पूर्ण दहन से CO₂ के मोल?</li><li>शुद्ध पानी (d = 1 g mL⁻¹) की मोलरता (निकटतम पूर्णांक)?</li><li>एक यौगिक में 8% सल्फर है। न्यूनतम मोलर द्रव्यमान?</li><li>100 mL 1 M को 0.25 M करने के लिए पानी (mL)?</li><li>अम्लीय माध्यम में KMnO₄ का n-गुणक?</li><li>100 mL 0.1 M BaCl₂ + 100 mL 0.1 M Na₂SO₄: बना BaSO₄ (मिलीमोल)?</li></ol><h3>D. विषयनिष्ठ</h3><ol start="20"><li>एक धातु ऑक्साइड में 60% धातु है। धातु का तुल्यांकी द्रव्यमान ज्ञात करो।</li><li>NaHCO₃ + Na₂CO₃ के 1.90 g मिश्रण को गर्म करने पर 0.31 g द्रव्यमान घटा। संघटन ज्ञात करो।</li><li>1 g चूना पत्थर को 18 mL 1 M HCl चाहिए (अशुद्धि अक्रिय)। शुद्धता ज्ञात करो।</li></ol>')},
 {h:B('1.14 Answers and solutions','1.14 उत्तर एवं हल'),
  body:B('<ol><li>(a) atoms: 4Nₐ, Nₐ, 2Nₐ, 3Nₐ.</li><li>(a) 12/Nₐ.</li><li>(c)</li><li>(b)</li><li>(c) n = 180/30 = 6.</li><li>(c) 0.2 × 12.</li><li>(b) 1 mol H₂, 0.5 mol O₂: exact ratio.</li><li>(a) (10/180) / (10/180 + 90/18) = 0.011.</li><li>(b) HCl = 0.02 mol.</li><li>(b) (0.002/1000) × 10⁶.</li><li>(a, b, c, d) electrons = 0.5 × 22.</li><li>(a, b, c)</li><li>(a, b, c) H₂ 4 mol, 3 mol used; 1 mol left.</li><li>2: 0.5 × 4.</li><li>56: 1000/18 = 55.6.</li><li>400: 32/0.08.</li><li>300: final volume 400 mL.</li><li>5</li><li>10: both 10 mmol.</li><li>60 g metal + 40 g O. E = (60/40) × 8 = 12.</li><li>2 NaHCO₃ → Na₂CO₃ + H₂O + CO₂: 168 g gives 62 g loss. NaHCO₃ = 0.84 g, Na₂CO₃ = 1.06 g.</li><li>CaCO₃ = 0.018/2 = 0.009 mol = 0.9 g: 90%.</li></ol>',
  '<ol><li>(a) परमाणु: 4Nₐ, Nₐ, 2Nₐ, 3Nₐ।</li><li>(a) 12/Nₐ।</li><li>(c)</li><li>(b)</li><li>(c) n = 180/30 = 6।</li><li>(c) 0.2 × 12।</li><li>(b) 1 मोल H₂, 0.5 मोल O₂: ठीक अनुपात।</li><li>(a) (10/180) / (10/180 + 90/18) = 0.011।</li><li>(b) HCl = 0.02 मोल।</li><li>(b) (0.002/1000) × 10⁶।</li><li>(a, b, c, d) इलेक्ट्रॉन = 0.5 × 22।</li><li>(a, b, c)</li><li>(a, b, c) H₂ 4 मोल, 3 मोल प्रयुक्त; 1 मोल बचा।</li><li>2: 0.5 × 4।</li><li>56: 1000/18 = 55.6।</li><li>400: 32/0.08।</li><li>300: अंतिम आयतन 400 mL।</li><li>5</li><li>10: दोनों 10 मिलीमोल।</li><li>60 g धातु + 40 g O। E = (60/40) × 8 = 12।</li><li>2 NaHCO₃ → Na₂CO₃ + H₂O + CO₂: 168 g पर 62 g कमी। NaHCO₃ = 0.84 g, Na₂CO₃ = 1.06 g।</li><li>CaCO₃ = 0.018/2 = 0.009 मोल = 0.9 g: 90%।</li></ol>')}
);

c.examples.push(
 {lv:'adv',q:B('10 mL of a hydrocarbon + 55 mL O₂. After explosion and cooling 40 mL remain; after KOH 10 mL remain. Find the formula.','10 mL हाइड्रोकार्बन + 55 mL O₂। विस्फोट और ठंडा करने के बाद 40 mL बचे; KOH के बाद 10 mL बचे। सूत्र ज्ञात करो।'),
  a:B('CO₂ = 30 mL ⇒ x = 3. O₂ used = 45 mL ⇒ x + y/4 = 4.5 ⇒ y = 6. <b>C₃H₆</b>.','CO₂ = 30 mL ⇒ x = 3। प्रयुक्त O₂ = 45 mL ⇒ x + y/4 = 4.5 ⇒ y = 6। <b>C₃H₆</b>।')},
 {lv:'adv',q:B('N₂O₄ ⇌ 2NO₂ mixture has VD 30. Find α.','N₂O₄ ⇌ 2NO₂ मिश्रण का VD 30 है। α ज्ञात करो।'),
  a:B('D = 46. α = (46 − 30)/30 = <b>0.533</b>.','D = 46। α = (46 − 30)/30 = <b>0.533</b>।')}
);

c.formulas.push(
 [B('Molecular formula','आण्विक सूत्र'),'Molecular = n × empirical'],
 [B('Limiting reagent','सीमांत अभिकर्मक'),'smallest moles / coefficient'],
 [B('Molality and molarity','मोललता और मोलरता'),'m = 1000M / (1000d − M·M<sub>2</sub>), M = 10d(%)/M<sub>2</sub>'],
 [B('Dilution / reaction','तनुकरण / अभिक्रिया'),'M<sub>1</sub>V<sub>1</sub> = M<sub>2</sub>V<sub>2</sub>; N<sub>1</sub>V<sub>1</sub> = N<sub>2</sub>V<sub>2</sub>'],
 [B('Normality','नॉर्मलता'),'N = M × n-factor'],
 [B('H₂O₂ volume strength','H₂O₂ आयतन सामर्थ्य'),'V = 11.2M = 5.6N (1 atm)'],
 [B('Degree of dissociation','वियोजन की मात्रा'),'α = (D − d) / [(n − 1)d]']
);
c.rev.en.push('Molarity uses solution; molality uses solvent.','Do not choose the limiting reagent by mass; use moles / coefficient.','Balance the equation before using mole ratios.','The n-factor depends on the reaction.');
c.rev.hi.push('मोलरता में विलयन, मोललता में विलायक।','सीमांत अभिकर्मक द्रव्यमान से नहीं, मोल / गुणांक से चुनो।','मोल अनुपात लगाने से पहले समीकरण संतुलित करो।','n-गुणक अभिक्रिया पर निर्भर करता है।');
})();

// Class 11 Mathematics — Ch 1: Sets (Hindi + English, 9 interactive 3D animations)
(function(){
var T=function(l,e,h){return l==='hi'?h:e};
var B=function(e,h){return {en:e,hi:h}};
function rnd(i){return Math.abs(Math.sin(i*12.9898)*43758.5453)%1}
function ease(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function inC(x,y,cx,cy,R){return (x-cx)*(x-cx)+(y-cy)*(y-cy)<=R*R}
function rect(S,c,x0,x1,y0,y1){S.path([[x0,y0,0],[x1,y0,0],[x1,y1,0],[x0,y1,0]],c,1.6,false,true)}
function dotsLabel(S,x,y,s,c,sz){S.text([x,y,0.05],s,c||'ink',sz||13,'center',true)}

/* 1. Set and elements */
D3.setelem={en:'Set and elements',hi:'समुच्चय और अवयव',h:0.62,view:{yaw:-0.25,pitch:0.3,zoom:1},
 frame:function(S,t,P,l){
  var tt=t%12,cx=-1.2,L=['a','e','i','o','u','b','c','d'];
  S.disc([cx,0,0],1.15,'xy','chem',0.18);S.ring([cx,0,0],1.15,'xy','chem',2.2);
  S.text([cx,1.4,0],'V','accent',16,'center',true);
  L.forEach(function(ch,k){
    var vow=k<5,sx=1.5+(k%3)*0.5,sy=1.0-Math.floor(k/3)*0.7,tk=1+k*1.1,s=ease((tt-tk)/1.0),x,y;
    if(vow){var a=k*1.2566;x=sx+(cx+0.55*Math.cos(a)-sx)*s;y=sy+(0.55*Math.sin(a)-sy)*s}
    else{var b=Math.sin(Math.min(1,Math.max(0,(tt-tk)/1.0))*3.14);x=sx-0.9*b;y=sy}
    S.ball([x,y,0.1],0.2,vow?'chem':'muted');S.text([x,y,0.32],ch,'white',13,'center',true);
  });
  S.hud(0.5,0.92,T(l,'a ∈ V   ·   b ∉ V','a ∈ V   ·   b ∉ V'),'accent',14,'center',true);
 }};

/* 2. Number sets nested */
D3.numsets={en:'N ⊂ Z ⊂ Q ⊂ R',hi:'N ⊂ Z ⊂ Q ⊂ R',h:0.66,spin:true,view:{yaw:-0.5,pitch:0.55,zoom:1},
 frame:function(S,t,P,l){
  var n=Math.min(4,1+Math.floor((t%10)/2)),Rr=[0.4,0.75,1.1,1.5],col=['phys','chem','hi','gold'],nm=['N','Z','Q','R'],z=[0.36,0.24,0.12,0],txt=['N','N ⊂ Z','N ⊂ Z ⊂ Q','N ⊂ Z ⊂ Q ⊂ R'];
  for(var i=n-1;i>=0;i--){S.disc([0,0,z[i]],Rr[i],'xy',col[i],0.55);S.ring([0,0,z[i]],Rr[i],'xy','ink',1.6)}
  for(var j=0;j<n;j++){S.text([0,j===0?0:Rr[j]-0.17,z[j]+0.05],nm[j],'ink',14,'center',true)}
  S.hud(0.5,0.93,txt[n-1],'accent',14,'center',true);
 }};

/* 3. Power set cube */
D3.powercube={en:'Power set of {1, 2, 3}',hi:'{1, 2, 3} का घात समुच्चय',h:0.8,spin:true,view:{yaw:-0.6,pitch:0.35,zoom:1.05},
 frame:function(S,t,P,l){
  var V=[],hi=Math.floor(t/1.2)%8;
  for(var i=0;i<8;i++){V.push([(i&1?0.9:-0.9),(i&2?0.9:-0.9),(i&4?0.9:-0.9)])}
  for(var a=0;a<8;a++)for(var b=a+1;b<8;b++){var d=a^b;if(d===1||d===2||d===4)S.line(V[a],V[b],'muted',1.4)}
  for(var k=0;k<8;k++){
    var el=[];if(k&1)el.push('1');if(k&2)el.push('2');if(k&4)el.push('3');
    S.ball(V[k],k===hi?0.2:0.14,k===hi?'gold':'chem');
    S.text([V[k][0],V[k][1]+0.3,V[k][2]],el.length?'{'+el.join(',')+'}':'∅','ink',12,'center',true);
  }
  S.hud(0.5,0.93,'2³ = 8 '+T(l,'subsets','उपसमुच्चय'),'accent',14,'center',true);
 }};

/* 4. Intervals */
D3.intervals={en:'Intervals',hi:'अंतराल',h:0.5,view:{yaw:-0.15,pitch:0.2,zoom:1},
 frame:function(S,t,P,l){
  var st=Math.floor(t/3.5)%4,lt=t%3.5,a=-2.4,b=2.4,e=a+(b-a)*ease(lt/1.4),
   openA=st<2,openB=(st===0||st===2),nm=['(a, b)','(a, b]','[a, b)','[a, b]'],
   dsc=[T(l,'open','खुला'),T(l,'half-open','अर्द्ध-खुला'),T(l,'half-open','अर्द्ध-खुला'),T(l,'closed','बंद')];
  S.arrow([-3.6,0,0],[3.6,0,0],'muted',1.6);
  for(var k=-3;k<=3;k++)S.line([k,-0.08,0],[k,0.08,0],'muted',1);
  S.rod([a,0,0],[e,0,0],0.06,'hi');
  function pt(x,open){if(open){S.disc([x,0,0.05],0.16,'xy','paper',1);S.ring([x,0,0.06],0.16,'xy','ink',2.2)}else S.ball([x,0,0.08],0.17,'gold')}
  pt(a,openA);if(lt>1.4)pt(b,openB);
  S.text([a,-0.4,0],'a','ink',14,'center',true);S.text([b,-0.4,0],'b','ink',14,'center',true);
  S.hud(0.5,0.88,nm[st]+'  —  '+dsc[st],'accent',15,'center',true);
 }};

/* 5. Venn */
D3.venn={en:'Universal set and Venn diagram',hi:'सार्वत्रिक समुच्चय और वेन आरेख',h:0.62,view:{yaw:-0.3,pitch:0.4,zoom:1},
 frame:function(S,t,P,l){
  var p=t%10;
  rect(S,'ink',-2.2,2.2,-1.4,1.4);S.text([-1.95,1.2,0],'U','ink',16,'center',true);
  var ra=p>1?1.05*ease((p-1)/1.5):0,rb=p>4?0.45*ease((p-4)/1.5):0;
  if(ra>0.02){S.disc([-0.2,0,0.05],ra,'xy','chem',0.3);S.ring([-0.2,0,0.05],ra,'xy','chem',2.2)}
  if(rb>0.02){S.disc([-0.45,0.1,0.1],rb,'xy','gold',0.55);S.ring([-0.45,0.1,0.1],rb,'xy','gold',2.2)}
  if(p>2.8)S.text([0.55,0.55,0.1],'A','ink',15,'center',true);
  if(p>5.8)S.text([-0.45,0.1,0.15],'B','ink',15,'center',true);
  if(p>3)S.text([1.55,-0.9,0.1],'A′','muted',14,'center',true);
  if(p>6.5)S.hud(0.5,0.92,'B ⊂ A ⊂ U','accent',15,'center',true);
 }};

/* 6. Set operations (dot-fill) */
D3.setops={en:'Set operations',hi:'समुच्चयों पर संक्रियाएँ',h:0.66,view:{yaw:-0.2,pitch:0.45,zoom:1},
 frame:function(S,t,P,l){
  var st=Math.floor(t/2.6)%6,nm=['A ∪ B','A ∩ B','A − B','A △ B','A′','(A ∪ B)′'],
   ca=-0.6,cb=0.6,R=1.0;
  rect(S,'ink',-2.2,2.2,-1.45,1.45);
  for(var x=-2.0;x<=2.01;x+=0.2)for(var y=-1.3;y<=1.31;y+=0.2){
    var a=inC(x,y,ca,0,R),b=inC(x,y,cb,0,R),on;
    on=[a||b,a&&b,a&&!b,a!==b,!a,!(a||b)][st];
    S.ball([x,y,0],on?0.075:0.045,on?'gold':'line');
  }
  S.ring([ca,0,0.05],R,'xy','chem',2);S.ring([cb,0,0.05],R,'xy','phys',2);
  S.text([-1.2,0.0,0.1],'A','ink',14,'center',true);S.text([1.2,0.0,0.1],'B','ink',14,'center',true);
  S.hud(0.5,0.92,nm[st],'accent',16,'center',true);
 }};

/* 7. Three sets, 7 regions */
D3.threesets={en:'Three sets, seven regions',hi:'तीन समुच्चय, सात क्षेत्र',h:0.78,view:{yaw:-0.2,pitch:0.4,zoom:1},
 frame:function(S,t,P,l){
  var k=Math.floor(t/1.6)%7,map={1:0,2:1,4:2,3:3,6:4,5:5,7:6},R=0.95,
   A=[-0.55,0.4],Bc=[0.55,0.4],C=[0,-0.55],lab='abcdefg',pos=[[-1.15,0.75],[1.15,0.75],[0,-1.2],[0,0.8],[0.62,-0.1],[-0.62,-0.1],[0,0.15]];
  for(var x=-1.7;x<=1.71;x+=0.13)for(var y=-1.7;y<=1.5;y+=0.13){
    var a=inC(x,y,A[0],A[1],R),b=inC(x,y,Bc[0],Bc[1],R),c=inC(x,y,C[0],C[1],R),code=(a?1:0)+(b?2:0)+(c?4:0);
    if(!code)continue;var id=map[code];
    S.ball([x,y,0],id===k?0.07:0.045,id===k?'gold':'line');
  }
  S.ring([A[0],A[1],0.05],R,'xy','chem',2);S.ring([Bc[0],Bc[1],0.05],R,'xy','phys',2);S.ring([C[0],C[1],0.05],R,'xy','bad',2);
  S.text([-1.7,1.15,0],'A','chem',15,'center',true);S.text([1.7,1.15,0],'B','phys',15,'center',true);S.text([1.35,-1.25,0],'C','bad',15,'center',true);
  for(var i=0;i<7;i++)S.text([pos[i][0],pos[i][1],0.1],lab[i],i===k?'ink':'muted',i===k?17:13,'center',true);
  var kind=k<3?T(l,'exactly one set','ठीक एक समुच्चय'):k<6?T(l,'exactly two sets','ठीक दो समुच्चय'):T(l,'all three sets','तीनों समुच्चय');
  S.hud(0.5,0.93,lab[k]+' : '+kind,'accent',14,'center',true);
 }};

/* 8. Juice survey: 400 dots */
D3.juice={en:'Juice survey: 400 students',hi:'जूस सर्वे: 400 विद्यार्थी',h:0.78,view:{yaw:-0.2,pitch:0.4,zoom:1},
 frame:function(S,t,P,l){
  var tt=t%11,s=ease((tt-0.8)/3.2),dd=0.07,ca=-0.8,cb=0.8,cy=0.3,R=1.15;
  rect(S,'ink',-2.3,2.3,-1.9,1.7);
  S.ring([ca,cy,0.02],R,'xy','chem',2);S.ring([cb,cy,0.02],R,'xy','phys',2);
  S.text([-1.55,1.65-0.0,0],'A','chem',14,'center',true);S.text([1.55,1.65,0],'O','phys',14,'center',true);
  for(var i=0;i<400;i++){
    var g,j,cx0,cy0,cols,col;
    if(i<25){j=i;cx0=-1.15;cy0=cy;cols=5;col='chem'}
    else if(i<100){j=i-25;cx0=0;cy0=cy;cols=10;col='gold'}
    else if(i<175){j=i-100;cx0=1.15;cy0=cy;cols=10;col='phys'}
    else{j=i-175;cx0=0;cy0=-1.3;cols=25;col='muted'}
    var rows=i<25?5:i<100?8:i<175?8:9,tx=cx0+((j%cols)-(cols-1)/2)*dd,ty=cy0+(Math.floor(j/cols)-(rows-1)/2)*(-dd);
    var sx=(rnd(i)*4.4-2.2),sy=(rnd(i+500)*3.2-1.6);
    S.ball([sx+(tx-sx)*s,sy+(ty-sy)*s,0.05],0.03,s<0.05?'line':col);
  }
  if(s>0.95){
    S.text([-1.45,1.1,0.1],'25','chem',14,'center',true);S.text([0,1.1,0.1],'75','accent',14,'center',true);
    S.text([1.45,1.1,0.1],'75','phys',14,'center',true);S.text([1.55,-1.3,0.1],'225','muted',14,'center',true);
  }
  S.hud(0.5,0.94,T(l,'A only 25 · both 75 · O only 75 · none 225','सिर्फ़ A 25 · दोनों 75 · सिर्फ़ O 75 · कोई नहीं 225'),'ink',12,'center',true);
 }};

/* 9. Element-wise 4 choices */
D3.fourchoice={en:'Four choices for each element',hi:'हर अवयव के लिए 4 विकल्प',h:0.66,view:{yaw:-0.25,pitch:0.4,zoom:1},
 frame:function(S,t,P,l){
  var k=Math.floor(t/2)%4,ca=-0.55,cb=0.55,R=1.0,
   pos=[[-1.25,0.0],[0,0],[1.25,0],[0,-1.2]],
   nm=[T(l,'only A','सिर्फ़ A'),T(l,'in both','दोनों में'),T(l,'only B','सिर्फ़ B'),T(l,'in neither','किसी में नहीं')];
  rect(S,'ink',-2.2,2.2,-1.5,1.4);
  S.disc([ca,0.1,0],R,'xy','chem',k===0||k===1?0.3:0.1);S.ring([ca,0.1,0.02],R,'xy','chem',2);
  S.disc([cb,0.1,0],R,'xy','phys',k===1||k===2?0.3:0.1);S.ring([cb,0.1,0.02],R,'xy','phys',2);
  S.text([-1.5,1.1,0],'A','chem',15,'center',true);S.text([1.5,1.1,0],'B','phys',15,'center',true);
  var x=pos[k][0],y=pos[k][1]+(k===3?0:0.1);
  S.ball([x,y,0.2],0.18,'gold');S.text([x,y,0.42],'x','ink',13,'center',true);
  S.hud(0.5,0.9,nm[k]+'   →   4 '+T(l,'choices','विकल्प')+' · 4ⁿ','accent',14,'center',true);
 }};

var N={title:B('Sets','समुच्चय (Sets)')};

CH.push({
 id:'maths-sets',cls:11,subject:'maths',ord:1,
 title:N.title,
 blurb:B('What a set is, ways to write it, subsets, intervals, Venn diagrams, operations, laws, cardinality and advanced counting — foundation to JEE Advanced level.','समुच्चय क्या है, उसे लिखने के तरीके, उपसमुच्चय, अंतराल, वेन आरेख, संक्रियाएँ, नियम, गणनांक और उन्नत गिनती — आधार से JEE Advanced स्तर तक।'),
 sections:[
 {h:B('1.1 What is a set?','1.1 समुच्चय क्या है?'),
  body:B('<p>In daily life we talk about collections: a cricket team, vowels, prime numbers. In maths, not every collection is a set.</p><p><b>Definition:</b> a collection of <b>well-defined</b> objects is a set. Well-defined means that for any object we can clearly say yes or no whether it belongs to the collection.</p><ul><li>“Natural numbers less than 10” → a set.</li><li>“Clever students of a class” → not a set, because “clever” differs for everyone.</li></ul><p>Sets are named with capital letters (A, B, X) and elements with small letters. a ∈ A means a is an element of A; b ∉ A means it is not.</p><p><b>Two important points:</b> (1) order does not matter: {1, 2, 3} = {3, 1, 2}. (2) repetition does not matter: {1, 1, 2} = {1, 2}. The letters of “APPLE” form the set {A, P, L, E}.</p>',
  '<p>रोज़ की ज़िंदगी में हम “संग्रह” की बात करते हैं: क्रिकेट टीम, स्वर, अभाज्य संख्याएँ। गणित में हर संग्रह समुच्चय नहीं होता।</p><p><b>परिभाषा:</b> <b>सुपरिभाषित</b> वस्तुओं के संग्रह को समुच्चय कहते हैं। सुपरिभाषित का अर्थ है: कोई भी वस्तु लो, साफ़-साफ़ हाँ या ना में बताया जा सके कि वह संग्रह में है या नहीं।</p><ul><li>“10 से छोटी प्राकृत संख्याएँ” → समुच्चय है।</li><li>“कक्षा के होशियार विद्यार्थी” → समुच्चय नहीं, क्योंकि “होशियार” हर किसी के लिए अलग है।</li></ul><p>समुच्चय को बड़े अक्षरों (A, B, X) से और अवयवों को छोटे अक्षरों से लिखते हैं। a ∈ A का अर्थ है a, A का अवयव है; b ∉ A का अर्थ है नहीं है।</p><p><b>दो ज़रूरी बातें:</b> (1) क्रम से फ़र्क नहीं पड़ता: {1, 2, 3} = {3, 1, 2}। (2) दोहराव से फ़र्क नहीं पड़ता: {1, 1, 2} = {1, 2}। “APPLE” के अक्षरों का समुच्चय {A, P, L, E} है।</p>'),
  d3:'setelem',cap3:B('Objects enter the set one by one; those that fail the property stay outside.','वस्तुएँ एक-एक करके समुच्चय में जाती हैं; जो गुण नहीं मानतीं वे बाहर रहती हैं।')},
 {h:B('1.1.1 Standard sets','1.1.1 मानक समुच्चय'),
  body:B('<table><tr><td>N</td><td>natural numbers {1, 2, 3, …}</td></tr><tr><td>Z</td><td>integers {…, −1, 0, 1, …}</td></tr><tr><td>Q</td><td>rational numbers p/q, q ≠ 0</td></tr><tr><td>R</td><td>real numbers</td></tr><tr><td>Z⁺, Q⁺, R⁺</td><td>positive integers, rationals, reals</td></tr></table><p class="fx">N ⊂ Z ⊂ Q ⊂ R</p>',
  '<table><tr><td>N</td><td>प्राकृत संख्याएँ {1, 2, 3, …}</td></tr><tr><td>Z</td><td>पूर्णांक {…, −1, 0, 1, …}</td></tr><tr><td>Q</td><td>परिमेय संख्याएँ p/q, q ≠ 0</td></tr><tr><td>R</td><td>वास्तविक संख्याएँ</td></tr><tr><td>Z⁺, Q⁺, R⁺</td><td>धनात्मक पूर्णांक, परिमेय, वास्तविक</td></tr></table><p class="fx">N ⊂ Z ⊂ Q ⊂ R</p>'),
  d3:'numsets',cap3:B('Starting from N, each bigger set takes the previous one inside it.','N से शुरू करके हर बड़ा समुच्चय पिछले को अपने अंदर ले लेता है।')},
 {h:B('1.2 Ways of writing a set','1.2 समुच्चय लिखने के तरीके'),
  body:B('<p><b>1.2.1 Roster (tabular) form:</b> list all elements inside { }, separated by commas. V = {a, e, i, o, u}, E = {2, 4, 6, …}.</p><p><b>1.2.2 Set-builder form:</b> write the common property of the elements:</p><p class="fx">A = {x : P(x)}</p><p>“:” or “|” is read “such that”. Try Examples 1, 2 and 3 at the end of the chapter.</p>',
  '<p><b>1.2.1 रोस्टर (सारणी) रूप:</b> सभी अवयव { } के अंदर, कॉमा से अलग। V = {a, e, i, o, u}, E = {2, 4, 6, …}।</p><p><b>1.2.2 समुच्चय-निर्माण रूप:</b> अवयवों का सर्वनिष्ठ गुण लिखते हैं:</p><p class="fx">A = {x : P(x)}</p><p>“:” या “|” को “ऐसा कि” पढ़ते हैं। अध्याय के अंत में उदाहरण 1, 2 और 3 हल करो।</p>')},
 {h:B('1.3 Types of sets','1.3 समुच्चयों के प्रकार'),
  body:B('<ul><li><b>Empty (null) set</b> ∅ or { }: no element. e.g. {x ∈ Q : x² = 2}.</li><li><b>Singleton:</b> exactly one element, e.g. {0}.</li><li><b>Finite:</b> elements can be counted. The count is the cardinality n(A).</li><li><b>Infinite:</b> the count never ends, e.g. N or {x ∈ R : 0 &lt; x &lt; 1}.</li><li><b>Equal sets:</b> A = B when both have exactly the same elements.</li><li><b>Equivalent sets:</b> finite sets with n(A) = n(B); they need not be equal.</li></ul><p><b>Do not confuse:</b> ∅ has 0 elements; {0} has 1 element (0); {∅} also has 1 element (∅).</p><p><b>Extra thought:</b> take R = {x : x ∉ x}. Is R ∈ R? Both “yes” and “no” lead to a contradiction. This is Russell’s paradox, which is why we do not build a set from “any” property, and always work inside a universal set.</p>',
  '<ul><li><b>रिक्त (शून्य) समुच्चय</b> ∅ या { }: कोई अवयव नहीं। जैसे {x ∈ Q : x² = 2}।</li><li><b>एकल समुच्चय:</b> केवल एक अवयव, जैसे {0}।</li><li><b>परिमित:</b> अवयव गिने जा सकते हैं। गिनती को गणनांक n(A) कहते हैं।</li><li><b>अपरिमित:</b> गिनती कभी खत्म नहीं होती, जैसे N या {x ∈ R : 0 &lt; x &lt; 1}।</li><li><b>समान समुच्चय:</b> A = B जब दोनों के अवयव बिल्कुल एक जैसे हों।</li><li><b>समतुल्य समुच्चय:</b> परिमित समुच्चय जिनमें n(A) = n(B); उनका समान होना ज़रूरी नहीं।</li></ul><p><b>भ्रमित मत होना:</b> ∅ में 0 अवयव; {0} में 1 अवयव (0); {∅} में भी 1 अवयव (∅)।</p><p><b>अतिरिक्त विचार:</b> R = {x : x ∉ x} लो। क्या R ∈ R? “हाँ” मानो तो “ना” आता है और उल्टा भी। इसे रसेल का विरोधाभास कहते हैं। इसीलिए “कोई भी” गुण से समुच्चय नहीं बनाते, हम हमेशा एक सार्वत्रिक समुच्चय के अंदर काम करते हैं।</p>')},
 {h:B('1.4 Subsets','1.4 उपसमुच्चय'),
  body:B('<p class="fx">A ⊆ B ⟺ (x ∈ A ⇒ x ∈ B)</p><ul><li>Every set is its own subset: A ⊆ A.</li><li>∅ is a subset of every set (there is no element in ∅ that breaks the condition).</li><li>A ⊆ B and B ⊆ C ⇒ A ⊆ C.</li><li>A = B ⟺ A ⊆ B and B ⊆ A. This is the surest way to prove equality.</li></ul><p><b>Proper subset:</b> A ⊆ B and A ≠ B; then B is a superset of A. (NCERT also writes A ⊂ B for a proper subset.) See Example 4.</p>',
  '<p class="fx">A ⊆ B ⟺ (x ∈ A ⇒ x ∈ B)</p><ul><li>हर समुच्चय अपना उपसमुच्चय है: A ⊆ A।</li><li>∅ हर समुच्चय का उपसमुच्चय है (∅ में कोई ऐसा अवयव ही नहीं जो शर्त तोड़े)।</li><li>A ⊆ B और B ⊆ C ⇒ A ⊆ C।</li><li>A = B ⟺ A ⊆ B और B ⊆ A। समानता सिद्ध करने का सबसे पक्का तरीका।</li></ul><p><b>उचित उपसमुच्चय:</b> A ⊆ B और A ≠ B; तब B, A का अधिसमुच्चय है। (NCERT उचित उपसमुच्चय के लिए भी A ⊂ B लिखता है।) उदाहरण 4 देखो।</p>')},
 {h:B('1.4.1 Counting subsets and the power set','1.4.1 उपसमुच्चयों की गिनती एवं घात समुच्चय'),
  body:B('<p>If n(A) = m, every element has 2 choices: in the subset or not.</p><p class="fx">Subsets = 2ᵐ &nbsp; proper = 2ᵐ − 1 &nbsp; non-empty proper = 2ᵐ − 2 (m ≥ 1)</p><p>Subsets with exactly r elements: C(m, r) = m! / (r!(m − r)!).</p><p><b>Power set:</b> the set of all subsets of A is P(A). For A = {1, 2}: P(A) = {∅, {1}, {2}, {1, 2}} and n(P(A)) = 2ⁿ⁽ᴬ⁾. See Examples 5 and 6.</p>',
  '<p>यदि n(A) = m, तो हर अवयव के पास 2 विकल्प हैं: उपसमुच्चय में जाए या न जाए।</p><p class="fx">उपसमुच्चय = 2ᵐ &nbsp; उचित = 2ᵐ − 1 &nbsp; अरिक्त उचित = 2ᵐ − 2 (m ≥ 1)</p><p>ठीक r अवयवों वाले उपसमुच्चय: C(m, r) = m! / (r!(m − r)!)।</p><p><b>घात समुच्चय:</b> A के सभी उपसमुच्चयों का समुच्चय P(A) है। A = {1, 2} के लिए: P(A) = {∅, {1}, {2}, {1, 2}} और n(P(A)) = 2ⁿ⁽ᴬ⁾। उदाहरण 5 और 6 देखो।</p>'),
  d3:'powercube',cap3:B('The 8 subsets of {1, 2, 3} sit on the 8 corners of a rotating cube.','{1, 2, 3} के 8 उपसमुच्चय घूमते घन के 8 कोनों पर दिखते हैं।')},
 {h:B('1.5 Intervals (subsets of R)','1.5 अंतराल (R के उपसमुच्चय)'),
  body:B('<p>For a &lt; b: (a, b) is open, [a, b] is closed, [a, b) and (a, b] are half-open.</p><p>Empty circle = point not included; filled circle = included. Length = b − a. Next to ∞ always use an open bracket: [2, ∞) = {x : x ≥ 2}, R = (−∞, ∞). See Example 7.</p>',
  '<p>a &lt; b के लिए: (a, b) खुला, [a, b] बंद, [a, b) और (a, b] अर्द्ध-खुले हैं।</p><p>खाली गोला = बिंदु शामिल नहीं; भरा गोला = शामिल। लंबाई = b − a। ∞ के साथ हमेशा खुला कोष्ठक: [2, ∞) = {x : x ≥ 2}, R = (−∞, ∞)। उदाहरण 7 देखो।</p>'),
  d3:'intervals',cap3:B('The interval fills along the number line; the end points turn open or closed.','अंतराल संख्या रेखा पर भरता है; अंत बिंदु खुले या बंद होते हैं।')},
 {h:B('1.6 Universal set and Venn diagrams','1.6 सार्वत्रिक समुच्चय एवं वेन आरेख'),
  body:B('<p>The big set inside which all the discussion happens is the <b>universal set</b> U. In a Venn diagram U is a rectangle and subsets are circles.</p><p class="fx">B ⊂ A ⊂ U</p>',
  '<p>जिस बड़े समुच्चय के अंदर सारी बात हो रही है वह <b>सार्वत्रिक समुच्चय</b> U है। वेन आरेख में U को आयत और उपसमुच्चयों को वृत्तों से दिखाते हैं।</p><p class="fx">B ⊂ A ⊂ U</p>'),
  d3:'venn',cap3:B('Circles appear inside the universal set; the subset B sits inside the bigger circle A.','सार्वत्रिक समुच्चय के अंदर वृत्त आते हैं; उपसमुच्चय B बड़े वृत्त A के अंदर बैठता है।')},
 {h:B('1.7 Operations on sets','1.7 समुच्चयों पर संक्रियाएँ'),
  body:B('<table><tr><th>Operation</th><th>Definition</th><th>In words</th></tr><tr><td>A ∪ B</td><td>{x : x ∈ A or x ∈ B}</td><td>at least one</td></tr><tr><td>A ∩ B</td><td>{x : x ∈ A and x ∈ B}</td><td>both</td></tr><tr><td>A − B</td><td>{x : x ∈ A, x ∉ B}</td><td>only A</td></tr><tr><td>A △ B</td><td>(A − B) ∪ (B − A)</td><td>exactly one</td></tr><tr><td>A′</td><td>U − A</td><td>not in A</td></tr></table><p>If A ∩ B = ∅ then A and B are <b>disjoint</b>. In general A − B ≠ B − A. The three sets A − B, A ∩ B, B − A are mutually disjoint and together make A ∪ B.</p><p><b>Most useful formula:</b></p><p class="fx">A − B = A ∩ B′</p><p>Turn a difference into an intersection, then apply the laws.</p><p><b>Equivalent statements for a subset:</b></p><p class="fx">A ⊆ B ⟺ A ∩ B = A ⟺ A ∪ B = B ⟺ A − B = ∅ ⟺ B′ ⊆ A′</p>',
  '<table><tr><th>संक्रिया</th><th>परिभाषा</th><th>शब्दों में</th></tr><tr><td>A ∪ B</td><td>{x : x ∈ A या x ∈ B}</td><td>कम से कम एक में</td></tr><tr><td>A ∩ B</td><td>{x : x ∈ A और x ∈ B}</td><td>दोनों में</td></tr><tr><td>A − B</td><td>{x : x ∈ A, x ∉ B}</td><td>सिर्फ़ A में</td></tr><tr><td>A △ B</td><td>(A − B) ∪ (B − A)</td><td>ठीक एक में</td></tr><tr><td>A′</td><td>U − A</td><td>A में नहीं</td></tr></table><p>A ∩ B = ∅ हो तो A, B <b>असंयुक्त</b> हैं। आम तौर पर A − B ≠ B − A। तीनों समुच्चय A − B, A ∩ B, B − A आपस में असंयुक्त हैं और मिलकर A ∪ B बनाते हैं।</p><p><b>सबसे काम का सूत्र:</b></p><p class="fx">A − B = A ∩ B′</p><p>अंतर को सर्वनिष्ठ में बदलो, फिर नियम लगाओ।</p><p><b>उपसमुच्चय के बराबर कथन:</b></p><p class="fx">A ⊆ B ⟺ A ∩ B = A ⟺ A ∪ B = B ⟺ A − B = ∅ ⟺ B′ ⊆ A′</p>'),
  d3:'setops',cap3:B('Each operation lights up its region, one by one.','हर संक्रिया का सही क्षेत्र एक-एक करके रंग से भरता है।')},
 {h:B('1.8 Laws of set algebra','1.8 समुच्चय बीजगणित के नियम'),
  body:B('<table><tr><td>Idempotent</td><td>A ∪ A = A, A ∩ A = A</td></tr><tr><td>Identity</td><td>A ∪ ∅ = A, A ∩ U = A</td></tr><tr><td>Domination</td><td>A ∪ U = U, A ∩ ∅ = ∅</td></tr><tr><td>Commutative</td><td>A ∪ B = B ∪ A, A ∩ B = B ∩ A</td></tr><tr><td>Associative</td><td>(A ∪ B) ∪ C = A ∪ (B ∪ C), same for ∩</td></tr><tr><td>Distributive</td><td>A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)<br>A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)</td></tr><tr><td>Complement</td><td>A ∪ A′ = U, A ∩ A′ = ∅, (A′)′ = A, ∅′ = U</td></tr><tr><td>De Morgan</td><td>(A ∪ B)′ = A′ ∩ B′, (A ∩ B)′ = A′ ∪ B′</td></tr><tr><td>Absorption</td><td>A ∪ (A ∩ B) = A, A ∩ (A ∪ B) = A</td></tr></table>',
  '<table><tr><td>अपरिवर्तनीय</td><td>A ∪ A = A, A ∩ A = A</td></tr><tr><td>तत्समक</td><td>A ∪ ∅ = A, A ∩ U = A</td></tr><tr><td>प्रभावी</td><td>A ∪ U = U, A ∩ ∅ = ∅</td></tr><tr><td>क्रम विनिमेय</td><td>A ∪ B = B ∪ A, A ∩ B = B ∩ A</td></tr><tr><td>साहचर्य</td><td>(A ∪ B) ∪ C = A ∪ (B ∪ C), ∩ के लिए भी</td></tr><tr><td>वितरण</td><td>A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)<br>A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)</td></tr><tr><td>पूरक</td><td>A ∪ A′ = U, A ∩ A′ = ∅, (A′)′ = A, ∅′ = U</td></tr><tr><td>डी मॉर्गन</td><td>(A ∪ B)′ = A′ ∩ B′, (A ∩ B)′ = A′ ∪ B′</td></tr><tr><td>अवशोषण</td><td>A ∪ (A ∩ B) = A, A ∩ (A ∪ B) = A</td></tr></table>')},
 {h:B('1.8.1 How to write a proof (element method)','1.8.1 प्रमाण कैसे लिखें (अवयव विधि)'),
  body:B('<p>Take an element x and move step by step with “⟺”. If every step works both ways, the two sets are equal. For ⊆ proofs, show x ∈ LHS ⇒ x ∈ RHS and then the reverse. Study Examples 8, 9, 10 and 11.</p><p><b>Symmetric difference:</b> A △ B = (A ∪ B) − (A ∩ B). It is commutative and associative, A △ ∅ = A and A △ A = ∅. So cancellation works: A △ C = B △ C ⇒ A = B. Cancellation does <b>not</b> work for union or intersection.</p>',
  '<p>एक अवयव x लो और “⟺” के साथ कदम-दर-कदम चलो। यदि हर कदम दोनों तरफ़ चलता है तो दोनों समुच्चय समान हैं। ⊆ के प्रमाण में x ∈ बायाँ ⇒ x ∈ दायाँ दिखाओ, फिर उल्टा। उदाहरण 8, 9, 10 और 11 पढ़ो।</p><p><b>सममित अंतर:</b> A △ B = (A ∪ B) − (A ∩ B)। यह क्रम-विनिमेय और साहचर्य है, A △ ∅ = A और A △ A = ∅। इसलिए कैंसिलेशन चलता है: A △ C = B △ C ⇒ A = B। संघ या सर्वनिष्ठ में कैंसिलेशन <b>नहीं</b> चलता।</p>')},
 {h:B('1.9 Cardinality and inclusion–exclusion','1.9 गणनांक एवं समावेशन–अपवर्जन'),
  body:B('<p>For finite sets:</p><p class="fx">n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</p><p>because n(A) + n(B) counts the middle part twice.</p><p class="fx">n(A − B) = n(A) − n(A ∩ B)<br>n(A △ B) = n(A) + n(B) − 2n(A ∩ B)<br>n(A′ ∩ B′) = n(U) − n(A ∪ B)</p>',
  '<p>परिमित समुच्चयों के लिए:</p><p class="fx">n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</p><p>क्योंकि n(A) + n(B) में बीच का हिस्सा दो बार गिना गया।</p><p class="fx">n(A − B) = n(A) − n(A ∩ B)<br>n(A △ B) = n(A) + n(B) − 2n(A ∩ B)<br>n(A′ ∩ B′) = n(U) − n(A ∪ B)</p>')},
 {h:B('1.9.1 Three sets','1.9.1 तीन समुच्चय'),
  body:B('<p class="fx">n(A ∪ B ∪ C) = S₁ − S₂ + S₃</p><p>S₁ = Σ n(A), S₂ = Σ n(A ∩ B), S₃ = n(A ∩ B ∩ C).</p><p><b>“Exactly” formulas</b> (regions a, b, c are the single-set parts, d, e, f the two-set parts, g the centre):</p><ul><li>Exactly one set: S₁ − 2S₂ + 3S₃ (a + b + c)</li><li>Exactly two sets: S₂ − 3S₃ (d + e + f)</li><li>At least two sets: S₂ − 2S₃</li><li>Only A: n(A) − n(A ∩ B) − n(A ∩ C) + S₃</li></ul><p>See Example 13.</p>',
  '<p class="fx">n(A ∪ B ∪ C) = S₁ − S₂ + S₃</p><p>S₁ = Σ n(A), S₂ = Σ n(A ∩ B), S₃ = n(A ∩ B ∩ C)।</p><p><b>“ठीक” वाले सूत्र</b> (क्षेत्र a, b, c अकेले समुच्चय के हिस्से हैं, d, e, f दो वाले, g बीच का):</p><ul><li>ठीक एक समुच्चय में: S₁ − 2S₂ + 3S₃ (a + b + c)</li><li>ठीक दो में: S₂ − 3S₃ (d + e + f)</li><li>कम से कम दो में: S₂ − 2S₃</li><li>सिर्फ़ A: n(A) − n(A ∩ B) − n(A ∩ C) + S₃</li></ul><p>उदाहरण 13 देखो।</p>'),
  d3:'threesets',cap3:B('Three circles overlap and the seven regions light up one by one.','तीन वृत्त एक-दूसरे को काटते हैं और सातों क्षेत्र एक-एक करके चमकते हैं।')},
 {h:B('1.9.2 Picture of a survey (Example 12)','1.9.2 सर्वे की तस्वीर (उदाहरण 12)'),
  body:B('<p>Of 400 students, 100 drink apple juice (A), 150 drink orange juice (O), and 75 drink both. Then only A = 25, both = 75, only O = 75, and the rest, 400 − 175 = 225, drink neither.</p>',
  '<p>400 विद्यार्थियों में से 100 सेब का जूस (A), 150 संतरे का जूस (O) और 75 दोनों पीते हैं। तब सिर्फ़ A = 25, दोनों = 75, सिर्फ़ O = 75, और बाकी 400 − 175 = 225 कोई नहीं पीते।</p>'),
  d3:'juice',cap3:B('400 dots move into their own regions and the count of each region appears.','400 बिंदु अपने-अपने क्षेत्र में जाते हैं और हर क्षेत्र की गिनती दिखती है।')},
 {h:B('1.9.3 Maximum and minimum (JEE favourite)','1.9.3 अधिकतम एवं न्यूनतम (JEE का पसंदीदा)'),
  body:B('<p class="fx">max{0, n(A) + n(B) − n(U)} ≤ n(A ∩ B) ≤ min{n(A), n(B)}<br>max{n(A), n(B)} ≤ n(A ∪ B) ≤ min{n(A) + n(B), n(U)}</p><p><b>Trick:</b> take complements. See Examples 14 and 15.</p>',
  '<p class="fx">max{0, n(A) + n(B) − n(U)} ≤ n(A ∩ B) ≤ min{n(A), n(B)}<br>max{n(A), n(B)} ≤ n(A ∪ B) ≤ min{n(A) + n(B), n(U)}</p><p><b>ट्रिक:</b> पूरक लो। उदाहरण 14 और 15 देखो।</p>')},
 {h:B('1.10 Advanced counting (JEE Advanced)','1.10 उन्नत गिनती (JEE Advanced)'),
  body:B('<p><b>1.10.1 Element-wise choice method.</b> For two subsets A, B of an n-element set, each element has 4 places: in both, only A, only B, in neither. Remove the places that the condition forbids.</p><table><tr><th>Condition (ordered pair A, B)</th><th>Count</th></tr><tr><td>No condition</td><td>4ⁿ</td></tr><tr><td>A ∩ B = ∅</td><td>3ⁿ</td></tr><tr><td>A ⊆ B</td><td>3ⁿ</td></tr><tr><td>A ∪ B = U</td><td>3ⁿ</td></tr><tr><td>A = B′</td><td>2ⁿ</td></tr><tr><td>n(A ∩ B) = r</td><td>C(n, r)·3ⁿ⁻ʳ</td></tr></table><p><b>1.10.2 Double counting:</b> count the same thing in two ways (Example 19).</p><p><b>1.10.3 Sets and number theory:</b> if Nₐ = {an : n ∈ N} then Nₐ ∩ N_b = N_lcm(a, b) (Example 20).</p><p>See Examples 16, 17 and 18.</p>',
  '<p><b>1.10.1 अवयव-वार विकल्प विधि।</b> n अवयवों वाले समुच्चय के दो उपसमुच्चय A, B के लिए हर अवयव के पास 4 जगहें हैं: दोनों में, सिर्फ़ A, सिर्फ़ B, किसी में नहीं। जो जगहें शर्त रोकती है उन्हें हटा दो।</p><table><tr><th>शर्त (क्रमित युग्म A, B)</th><th>गिनती</th></tr><tr><td>कोई शर्त नहीं</td><td>4ⁿ</td></tr><tr><td>A ∩ B = ∅</td><td>3ⁿ</td></tr><tr><td>A ⊆ B</td><td>3ⁿ</td></tr><tr><td>A ∪ B = U</td><td>3ⁿ</td></tr><tr><td>A = B′</td><td>2ⁿ</td></tr><tr><td>n(A ∩ B) = r</td><td>C(n, r)·3ⁿ⁻ʳ</td></tr></table><p><b>1.10.2 दोहरी गिनती:</b> एक ही चीज़ को दो तरह से गिनो (उदाहरण 19)।</p><p><b>1.10.3 समुच्चय और संख्या सिद्धांत:</b> यदि Nₐ = {an : n ∈ N} तो Nₐ ∩ N_b = N_lcm(a, b) (उदाहरण 20)।</p><p>उदाहरण 16, 17 और 18 देखो।</p>'),
  d3:'fourchoice',cap3:B('One element x visits all four regions in turn: only A, both, only B, neither.','एक अवयव x बारी-बारी से चारों क्षेत्रों में जाता है: सिर्फ़ A, दोनों, सिर्फ़ B, कोई नहीं।')},
 {h:B('1.11 Common mistakes','1.11 आम गलतियाँ'),
  body:B('<ol><li>∈ is for an element, ⊂ is for a set.</li><li>∅ ≠ {∅} ≠ {0}.</li><li>Count repeated elements once.</li><li>A ∪ C = B ∪ C does not give A = B.</li><li>In De Morgan’s law, taking the complement swaps ∪ and ∩.</li><li>“Only A” and “A” are different.</li><li>Do not write n(A ∪ B) = n(A) + n(B) without checking that A ∩ B = ∅.</li></ol>',
  '<ol><li>∈ अवयव के लिए है, ⊂ समुच्चय के लिए।</li><li>∅ ≠ {∅} ≠ {0}।</li><li>दोहराए गए अवयव को एक बार गिनो।</li><li>A ∪ C = B ∪ C से A = B नहीं निकलता।</li><li>डी मॉर्गन में पूरक लगाने पर ∪ ↔ ∩ बदल जाता है।</li><li>“सिर्फ़ A” और “A” अलग हैं।</li><li>A ∩ B = ∅ जाँचे बिना n(A ∪ B) = n(A) + n(B) मत लिखो।</li></ol>')},
 {h:B('1.12 Practice exercise','1.12 अभ्यास प्रश्न'),
  body:B('<h3>A. Single correct</h3><ol><li>Proper subsets of a 5-element set: (a) 32 (b) 31 (c) 30 (d) 25</li><li>Subsets of A = {x ∈ Z : x² ≤ 4}: (a) 4 (b) 8 (c) 16 (d) 32</li><li>n(A) = 3, n(B) = 6. Minimum of n(A ∪ B): (a) 3 (b) 6 (c) 9 (d) 18</li><li>A = {x : x² − 5x + 6 = 0}, B = {2, 4}. A − B = (a) {2} (b) {3} (c) {4} (d) ∅</li><li>n(P(P(∅))) = (a) 0 (b) 1 (c) 2 (d) 4</li><li>(A ∪ B)′ ∪ (A′ ∩ B) = (a) A′ (b) B′ (c) A (d) U</li><li>63% like cheese, 76% like apple; both x%. Correct range: (a) [13, 63] (b) [39, 63] (c) [39, 76] (d) [63, 76]</li><li>A − (A − B) = (a) B (b) A ∪ B (c) A ∩ B (d) ∅</li><li>N₃ ∩ N₄ = (a) N₇ (b) N₁₂ (c) N₁ (d) N₄</li><li>Sets with m and n elements differ by 112 in the number of subsets. (m, n) = (a) (7, 4) (b) (7, 3) (c) (6, 4) (d) (8, 4)</li></ol><h3>B. One or more correct</h3><ol start="11"><li>Always true: (a) A − B = A ∩ B′ (b) A − B = A − (A ∩ B) (c) A − B = (A ∪ B) − B (d) A − B = B − A</li><li>A = {∅, {∅}, 1}: (a) ∅ ∈ A (b) ∅ ⊂ A (c) {∅} ∈ A (d) {{∅}} ⊂ A</li><li>What makes A = B certain? (a) A ∪ C = B ∪ C (b) A ∩ C = B ∩ C (c) both (a) and (b) together (d) A △ C = B △ C</li><li>n(U) = 100, n(A) = 60, n(B) = 50: (a) min n(A ∩ B) = 10 (b) max n(A ∩ B) = 50 (c) max n(A′ ∩ B′) = 40 (d) min n(A ∪ B) = 50</li></ol><h3>C. Integer type</h3><ol start="15"><li>Subsets of {1, …, 6} that contain 1 but not 2?</li><li>How many numbers from 1 to 1000 are divisible by none of 2, 3, 5?</li><li>n(A ∪ B) = 50, n(A) = 28, n(B) = 32. n(A ∩ B)?</li><li>n(A) = 12, n(B) = 15, n(A ∩ B) = 7. n(A △ B)?</li><li>Ordered subset pairs (A, B) of {1, 2, 3} with A ⊆ B?</li><li>How many X satisfy X ∪ {1, 2} = {1, 2, 3, 4, 5}?</li></ol><h3>D. Subjective</h3><ol start="21"><li>Prove: A ⊆ B ⟺ B′ ⊆ A′.</li><li>A ∩ X = B ∩ X = ∅ and A ∪ X = B ∪ X. Prove A = B.</li><li>Prove: {6ⁿ − 5n − 1 : n ∈ N} ⊂ {25m : m ∈ Z}.</li><li>10000 families: newspaper A 40%, B 20%, C 10%; A&amp;B 5%, B&amp;C 3%, A&amp;C 4%, all three 2%. How many families read (i) only A (ii) only B (iii) none?</li></ol>',
  '<h3>A. एकल सही</h3><ol><li>5 अवयवों वाले समुच्चय के उचित उपसमुच्चय: (a) 32 (b) 31 (c) 30 (d) 25</li><li>A = {x ∈ Z : x² ≤ 4} के उपसमुच्चय: (a) 4 (b) 8 (c) 16 (d) 32</li><li>n(A) = 3, n(B) = 6. n(A ∪ B) का न्यूनतम: (a) 3 (b) 6 (c) 9 (d) 18</li><li>A = {x : x² − 5x + 6 = 0}, B = {2, 4}. A − B = (a) {2} (b) {3} (c) {4} (d) ∅</li><li>n(P(P(∅))) = (a) 0 (b) 1 (c) 2 (d) 4</li><li>(A ∪ B)′ ∪ (A′ ∩ B) = (a) A′ (b) B′ (c) A (d) U</li><li>63% को चीज़, 76% को सेब पसंद; दोनों x%। सही सीमा: (a) [13, 63] (b) [39, 63] (c) [39, 76] (d) [63, 76]</li><li>A − (A − B) = (a) B (b) A ∪ B (c) A ∩ B (d) ∅</li><li>N₃ ∩ N₄ = (a) N₇ (b) N₁₂ (c) N₁ (d) N₄</li><li>m, n अवयवों वाले समुच्चयों में उपसमुच्चयों की संख्या का अंतर 112। (m, n) = (a) (7, 4) (b) (7, 3) (c) (6, 4) (d) (8, 4)</li></ol><h3>B. एक या अधिक सही</h3><ol start="11"><li>हमेशा सही: (a) A − B = A ∩ B′ (b) A − B = A − (A ∩ B) (c) A − B = (A ∪ B) − B (d) A − B = B − A</li><li>A = {∅, {∅}, 1}: (a) ∅ ∈ A (b) ∅ ⊂ A (c) {∅} ∈ A (d) {{∅}} ⊂ A</li><li>किससे A = B पक्का होता है? (a) A ∪ C = B ∪ C (b) A ∩ C = B ∩ C (c) (a) और (b) दोनों साथ (d) A △ C = B △ C</li><li>n(U) = 100, n(A) = 60, n(B) = 50: (a) न्यूनतम n(A ∩ B) = 10 (b) अधिकतम n(A ∩ B) = 50 (c) अधिकतम n(A′ ∩ B′) = 40 (d) न्यूनतम n(A ∪ B) = 50</li></ol><h3>C. पूर्णांक प्रकार</h3><ol start="15"><li>{1, …, 6} के कितने उपसमुच्चयों में 1 हो पर 2 न हो?</li><li>1 से 1000 तक कितनी संख्याएँ 2, 3, 5 में से किसी से भी विभाज्य नहीं?</li><li>n(A ∪ B) = 50, n(A) = 28, n(B) = 32. n(A ∩ B)?</li><li>n(A) = 12, n(B) = 15, n(A ∩ B) = 7. n(A △ B)?</li><li>{1, 2, 3} के क्रमित उपसमुच्चय युग्म (A, B) जिनमें A ⊆ B?</li><li>कितने X हैं जिनके लिए X ∪ {1, 2} = {1, 2, 3, 4, 5}?</li></ol><h3>D. विषयनिष्ठ</h3><ol start="21"><li>सिद्ध करो: A ⊆ B ⟺ B′ ⊆ A′।</li><li>A ∩ X = B ∩ X = ∅ और A ∪ X = B ∪ X। सिद्ध करो A = B।</li><li>सिद्ध करो: {6ⁿ − 5n − 1 : n ∈ N} ⊂ {25m : m ∈ Z}।</li><li>10000 परिवार: अखबार A 40%, B 20%, C 10%; A&amp;B 5%, B&amp;C 3%, A&amp;C 4%, तीनों 2%। कितने परिवार (i) सिर्फ़ A (ii) सिर्फ़ B (iii) कोई नहीं पढ़ते?</li></ol>')},
 {h:B('1.13 Answers and solutions','1.13 उत्तर एवं हल'),
  body:B('<ol><li>(b) 2⁵ − 1.</li><li>(d) A = {−2, −1, 0, 1, 2}, 2⁵ = 32.</li><li>(b) when A ⊆ B.</li><li>(b) A = {2, 3}.</li><li>(c) P(∅) = {∅}.</li><li>(a) (A′ ∩ B′) ∪ (A′ ∩ B) = A′ ∩ (B′ ∪ B) = A′.</li><li>(b) 63 + 76 − 100 = 39.</li><li>(c) A ∩ (A ∩ B′)′ = A ∩ (A′ ∪ B) = A ∩ B.</li><li>(b) lcm.</li><li>(a) 128 − 16 = 112.</li><li>(a, b, c)</li><li>(a, b, c, d)</li><li>(c, d). For (c): take x ∈ A. If x ∈ C, then x ∈ A ∩ C = B ∩ C. If x ∉ C, then x ∈ A ∪ C = B ∪ C gives x ∈ B.</li><li>(a, b, c). Note min n(A ∪ B) = 60.</li><li>16: the other 4 elements, 2⁴.</li><li>266: 1000 − (500 + 333 + 200) + (166 + 100 + 66) − 33.</li><li>10: 28 + 32 − 50.</li><li>13: 12 + 15 − 14.</li><li>27: 3³.</li><li>4: 3, 4, 5 are needed; 1, 2 are free.</li><li>If A ⊆ B and x ∈ B′, then x ∉ B, so x ∉ A, i.e. x ∈ A′. For the converse apply the same result to B′ ⊆ A′ and use (A′)′ = A.</li><li>A = A ∩ (A ∪ X) = A ∩ (B ∪ X) = (A ∩ B) ∪ (A ∩ X) = A ∩ B. Similarly B = A ∩ B.</li><li>(1 + 5)ⁿ = 1 + 5n + 25[C(n,2) + 5C(n,3) + …]. So it is a subset; and a multiple like 50 never appears (values 0, 25, 200, …), so it is proper.</li><li>Only A = 40 − 5 − 4 + 2 = 33% → 3300; only B = 20 − 5 − 3 + 2 = 14% → 1400; union = 70 − 12 + 2 = 60%, so none = 4000.</li></ol>',
  '<ol><li>(b) 2⁵ − 1।</li><li>(d) A = {−2, −1, 0, 1, 2}, 2⁵ = 32।</li><li>(b) जब A ⊆ B।</li><li>(b) A = {2, 3}।</li><li>(c) P(∅) = {∅}।</li><li>(a) (A′ ∩ B′) ∪ (A′ ∩ B) = A′ ∩ (B′ ∪ B) = A′।</li><li>(b) 63 + 76 − 100 = 39।</li><li>(c) A ∩ (A ∩ B′)′ = A ∩ (A′ ∪ B) = A ∩ B।</li><li>(b) ल.स.।</li><li>(a) 128 − 16 = 112।</li><li>(a, b, c)</li><li>(a, b, c, d)</li><li>(c, d)। (c) के लिए: x ∈ A लो। यदि x ∈ C तो x ∈ A ∩ C = B ∩ C। यदि x ∉ C तो x ∈ A ∪ C = B ∪ C से x ∈ B।</li><li>(a, b, c)। ध्यान दो: न्यूनतम n(A ∪ B) = 60।</li><li>16: बाकी 4 अवयव, 2⁴।</li><li>266: 1000 − (500 + 333 + 200) + (166 + 100 + 66) − 33।</li><li>10: 28 + 32 − 50।</li><li>13: 12 + 15 − 14।</li><li>27: 3³।</li><li>4: 3, 4, 5 ज़रूरी हैं; 1, 2 स्वतंत्र।</li><li>यदि A ⊆ B और x ∈ B′, तो x ∉ B, इसलिए x ∉ A, यानी x ∈ A′। उलटा: यही परिणाम B′ ⊆ A′ पर लगाओ और (A′)′ = A प्रयोग करो।</li><li>A = A ∩ (A ∪ X) = A ∩ (B ∪ X) = (A ∩ B) ∪ (A ∩ X) = A ∩ B। इसी तरह B = A ∩ B।</li><li>(1 + 5)ⁿ = 1 + 5n + 25[C(n,2) + 5C(n,3) + …]। अतः उपसमुच्चय है; और 50 जैसा गुणज कभी नहीं मिलता (मान 0, 25, 200, …), इसलिए उचित है।</li><li>सिर्फ़ A = 40 − 5 − 4 + 2 = 33% → 3300; सिर्फ़ B = 20 − 5 − 3 + 2 = 14% → 1400; संघ = 70 − 12 + 2 = 60%, अतः कोई नहीं = 4000।</li></ol>')}
 ],
 formulas:[
  [B('Number of subsets','उपसमुच्चयों की संख्या'),'2<sup>m</sup>; proper 2<sup>m</sup> − 1; with r elements C(m, r)'],
  [B('Difference','अंतर'),'A − B = A ∩ B′'],
  [B('De Morgan','डी मॉर्गन'),'(A ∪ B)′ = A′ ∩ B′, (A ∩ B)′ = A′ ∪ B′'],
  [B('Union of two sets','दो समुच्चयों का संघ'),'n(A ∪ B) = n(A) + n(B) − n(A ∩ B)'],
  [B('Symmetric difference','सममित अंतर'),'n(A △ B) = n(A) + n(B) − 2n(A ∩ B)'],
  [B('Union of three sets','तीन समुच्चयों का संघ'),'n(A ∪ B ∪ C) = S<sub>1</sub> − S<sub>2</sub> + S<sub>3</sub>'],
  [B('Exactly one / exactly two','ठीक एक / ठीक दो'),'S<sub>1</sub> − 2S<sub>2</sub> + 3S<sub>3</sub>; S<sub>2</sub> − 3S<sub>3</sub>'],
  [B('Disjoint or A ⊆ B (ordered pairs)','असंयुक्त या A ⊆ B (क्रमित युग्म)'),'3<sup>n</sup>']
 ],
 examples:[
  {lv:'fnd',q:B('Write {x : x ∈ N, x² &lt; 40} in roster form.','{x : x ∈ N, x² &lt; 40} को रोस्टर रूप में लिखो।'),
   a:B('6² = 36 &lt; 40 and 7² = 49 &gt; 40. Answer: <b>{1, 2, 3, 4, 5, 6}</b>.','6² = 36 &lt; 40 और 7² = 49 &gt; 40। उत्तर: <b>{1, 2, 3, 4, 5, 6}</b>।')},
  {lv:'fnd',q:B('Write {1/2, 2/3, 3/4, 4/5, 5/6, 6/7} in set-builder form.','{1/2, 2/3, 3/4, 4/5, 5/6, 6/7} को समुच्चय-निर्माण रूप में लिखो।'),
   a:B('Each denominator is 1 more than the numerator: <b>{x : x = n/(n + 1), n ∈ N, n ≤ 6}</b>.','हर में अंश से 1 अधिक है: <b>{x : x = n/(n + 1), n ∈ N, n ≤ 6}</b>।')},
  {lv:'main',q:B('The squares trap: how many elements are in A = {x² : x ∈ Z, |x| ≤ 3}?','वर्ग का जाल: A = {x² : x ∈ Z, |x| ≤ 3} में कितने अवयव हैं?'),
   a:B('x = −3, …, 3 gives squares 9, 4, 1, 0, 1, 4, 9. Remove repeats: A = {0, 1, 4, 9}, so <b>4 elements</b>, not 7.','x = −3, …, 3 से वर्ग 9, 4, 1, 0, 1, 4, 9। दोहराव हटाओ: A = {0, 1, 4, 9}, यानी <b>4 अवयव</b>, 7 नहीं।')},
  {lv:'main',q:B('A = {1, {2}, 3}. True or false: {2} ∈ A, {2} ⊂ A, {{2}} ⊂ A, 2 ∈ A.','A = {1, {2}, 3}। सही/गलत बताओ: {2} ∈ A, {2} ⊂ A, {{2}} ⊂ A, 2 ∈ A।'),
   a:B('A has 3 elements: 1, {2}, 3. So {2} ∈ A is <b>true</b>; {2} ⊂ A is <b>false</b> (2 is not an element); {{2}} ⊂ A is <b>true</b>; 2 ∈ A is <b>false</b>.','A के 3 अवयव हैं: 1, {2}, 3। अतः {2} ∈ A <b>सही</b>; {2} ⊂ A <b>गलत</b> (2 अवयव नहीं है); {{2}} ⊂ A <b>सही</b>; 2 ∈ A <b>गलत</b>।')},
  {lv:'fnd',q:B('Find n(P(P(P(∅)))).','n(P(P(P(∅)))) ज्ञात करो।'),
   a:B('n(∅) = 0. n(P(∅)) = 1, n(P(P(∅))) = 2, n(P(P(P(∅)))) = 2² = <b>4</b>.','n(∅) = 0। n(P(∅)) = 1, n(P(P(∅))) = 2, n(P(P(P(∅)))) = 2² = <b>4</b>।')},
  {lv:'main',q:B('Two sets have m and n elements. The first has 56 more subsets than the second. Find m, n.','दो समुच्चयों में m और n अवयव हैं। पहले के उपसमुच्चय दूसरे से 56 अधिक हैं। m, n ज्ञात करो।'),
   a:B('2ⁿ(2<sup>m−n</sup> − 1) = 56 = 8 × 7. 2<sup>m−n</sup> − 1 is odd, so 2ⁿ = 8 and 2<sup>m−n</sup> = 8: <b>n = 3, m = 6</b>.','2ⁿ(2<sup>m−n</sup> − 1) = 56 = 8 × 7। 2<sup>m−n</sup> − 1 विषम है, अतः 2ⁿ = 8 और 2<sup>m−n</sup> = 8: <b>n = 3, m = 6</b>।')},
  {lv:'fnd',q:B('A = [−3, 5), B = (0, 7]. Find A ∪ B, A ∩ B, A − B, B − A.','A = [−3, 5), B = (0, 7]। A ∪ B, A ∩ B, A − B, B − A ज्ञात करो।'),
   a:B('Draw both on a number line: A ∪ B = <b>[−3, 7]</b>, A ∩ B = <b>(0, 5)</b>, A − B = <b>[−3, 0]</b>, B − A = <b>[5, 7]</b>. Note: the bracket of a removed point flips.','दोनों को संख्या रेखा पर बनाओ: A ∪ B = <b>[−3, 7]</b>, A ∩ B = <b>(0, 5)</b>, A − B = <b>[−3, 0]</b>, B − A = <b>[5, 7]</b>। ध्यान दो: जो बिंदु हटाया जाता है उसका कोष्ठक उल्टा हो जाता है।')},
  {lv:'main',q:B('Prove: (A ∪ B)′ = A′ ∩ B′.','सिद्ध करो: (A ∪ B)′ = A′ ∩ B′।'),
   a:B('x ∈ (A ∪ B)′ ⟺ x ∉ A ∪ B ⟺ x ∉ A and x ∉ B ⟺ x ∈ A′ and x ∈ B′ ⟺ x ∈ A′ ∩ B′. Every step works both ways, so the sets are equal.','x ∈ (A ∪ B)′ ⟺ x ∉ A ∪ B ⟺ x ∉ A और x ∉ B ⟺ x ∈ A′ और x ∈ B′ ⟺ x ∈ A′ ∩ B′। हर कदम दोनों तरफ़ चलता है, इसलिए समुच्चय समान हैं।')},
  {lv:'main',q:B('Prove: A − (B ∪ C) = (A − B) ∩ (A − C).','सिद्ध करो: A − (B ∪ C) = (A − B) ∩ (A − C)।'),
   a:B('LHS = A ∩ (B ∪ C)′ = A ∩ B′ ∩ C′ = (A ∩ B′) ∩ (A ∩ C′) = RHS. (We used A = A ∩ A.)','बायाँ पक्ष = A ∩ (B ∪ C)′ = A ∩ B′ ∩ C′ = (A ∩ B′) ∩ (A ∩ C′) = दायाँ पक्ष। (A = A ∩ A प्रयोग किया।)')},
  {lv:'main',q:B('If A ∪ B = A ∩ B, prove A = B.','यदि A ∪ B = A ∩ B, तो सिद्ध करो A = B।'),
   a:B('A ⊆ A ∪ B = A ∩ B ⊆ B. In the same way B ⊆ A. So <b>A = B</b>.','A ⊆ A ∪ B = A ∩ B ⊆ B। इसी तरह B ⊆ A। अतः <b>A = B</b>।')},
  {lv:'adv',q:B('Prove P(A ∩ B) = P(A) ∩ P(B). Is it true for union as well?','सिद्ध करो P(A ∩ B) = P(A) ∩ P(B)। क्या संघ के लिए भी सही है?'),
   a:B('X ∈ P(A ∩ B) ⟺ X ⊆ A and X ⊆ B ⟺ X ∈ P(A) ∩ P(B). For union only P(A) ∪ P(B) ⊆ P(A ∪ B) holds. Counter-example: A = {1}, B = {2}; {1, 2} ∈ P(A ∪ B) but not in P(A) ∪ P(B).','X ∈ P(A ∩ B) ⟺ X ⊆ A और X ⊆ B ⟺ X ∈ P(A) ∩ P(B)। संघ के लिए केवल P(A) ∪ P(B) ⊆ P(A ∪ B) सही है। प्रति-उदाहरण: A = {1}, B = {2}; {1, 2} ∈ P(A ∪ B) पर P(A) ∪ P(B) में नहीं।')},
  {lv:'fnd',q:B('400 students: 100 drink apple juice, 150 orange juice, 75 both. How many drink neither?','400 विद्यार्थी: 100 सेब का जूस, 150 संतरे का जूस, 75 दोनों पीते हैं। कितने कोई नहीं पीते?'),
   a:B('n(A ∪ O) = 100 + 150 − 75 = 175. Neither = 400 − 175 = <b>225</b>.','n(A ∪ O) = 100 + 150 − 75 = 175। कोई नहीं = 400 − 175 = <b>225</b>।')},
  {lv:'main',q:B('100 students: Maths 40, Physics 35, Chemistry 30; M&amp;P 15, P&amp;C 12, M&amp;C 10; all three 5. Find (i) none (ii) exactly one (iii) exactly two.','100 विद्यार्थी: गणित 40, भौतिकी 35, रसायन 30; M&amp;P 15, P&amp;C 12, M&amp;C 10; तीनों 5। (i) कोई नहीं (ii) ठीक एक (iii) ठीक दो ज्ञात करो।'),
   a:B('S₁ = 105, S₂ = 37, S₃ = 5. Union = 105 − 37 + 5 = 73. (i) <b>27</b> (ii) 105 − 74 + 15 = <b>46</b> (iii) 37 − 15 = <b>22</b>. Check: 46 + 22 + 5 = 73.','S₁ = 105, S₂ = 37, S₃ = 5। संघ = 105 − 37 + 5 = 73। (i) <b>27</b> (ii) 105 − 74 + 15 = <b>46</b> (iii) 37 − 15 = <b>22</b>। जाँच: 46 + 22 + 5 = 73।')},
  {lv:'main',q:B('70% like coffee and 60% like tea. Find the range of x%, those who like both.','70% को कॉफ़ी और 60% को चाय पसंद है। दोनों पसंद करने वाले x% की सीमा ज्ञात करो।'),
   a:B('x ≥ 70 + 60 − 100 = 30 and x ≤ 60. So <b>30 ≤ x ≤ 60</b>.','x ≥ 70 + 60 − 100 = 30 और x ≤ 60। अतः <b>30 ≤ x ≤ 60</b>।')},
  {lv:'adv',q:B('In a test 70% passed Physics, 75% Chemistry, 80% Maths, 85% English. Find the least % who passed all four.','एक परीक्षा में 70% भौतिकी, 75% रसायन, 80% गणित, 85% अंग्रेज़ी में पास हुए। चारों में पास होने वालों का न्यूनतम % ज्ञात करो।'),
   a:B('Fail: 30, 25, 20, 15. At most 90% fail in at least one. So pass in all four ≥ <b>10%</b>. Trick: take the complement.','फ़ेल: 30, 25, 20, 15। किसी एक में भी फ़ेल अधिकतम 90%। अतः चारों में पास ≥ <b>10%</b>। ट्रिक: पूरक लो।')},
  {lv:'main',q:B('How many unordered pairs {A, B} of disjoint subsets of {1, 2, 3, 4} are there (A = B allowed)?','{1, 2, 3, 4} के असंयुक्त उपसमुच्चयों के कितने अक्रमित युग्म {A, B} हैं (A = B भी मान्य)?'),
   a:B('Ordered pairs: 3⁴ = 81. A = B and disjoint only for (∅, ∅). Unordered = (81 − 1)/2 + 1 = <b>41</b>.','क्रमित युग्म: 3⁴ = 81। A = B और असंयुक्त केवल (∅, ∅) में। अक्रमित = (81 − 1)/2 + 1 = <b>41</b>।')},
  {lv:'fnd',q:B('How many subsets of {1, …, 10} have at least one odd number?','{1, …, 10} के कितने उपसमुच्चयों में कम से कम एक विषम संख्या है?'),
   a:B('Total − (only even ones) = 2¹⁰ − 2⁵ = <b>992</b>.','कुल − (सिर्फ़ सम वाले) = 2¹⁰ − 2⁵ = <b>992</b>।')},
  {lv:'fnd',q:B('How many sets X satisfy {1, 2} ⊆ X ⊆ {1, 2, 3, 4, 5}?','कितने समुच्चय X हैं जिनके लिए {1, 2} ⊆ X ⊆ {1, 2, 3, 4, 5}?'),
   a:B('1 and 2 are fixed; 3, 4, 5 each have 2 choices: 2³ = <b>8</b>.','1, 2 निश्चित हैं; 3, 4, 5 के पास 2-2 विकल्प: 2³ = <b>8</b>।')},
  {lv:'adv',q:B('A₁, …, A₃₀ each have 5 elements and B₁, …, Bₙ each have 3. ∪Aᵢ = ∪Bⱼ = S, and every element of S lies in exactly 10 of the Aᵢ and 9 of the Bⱼ. Find n.','A₁, …, A₃₀ में हर एक के 5 अवयव और B₁, …, Bₙ में हर एक के 3 हैं। ∪Aᵢ = ∪Bⱼ = S और S का हर अवयव ठीक 10 Aᵢ में और 9 Bⱼ में है। n ज्ञात करो।'),
   a:B('Count in two ways: 30 × 5 = 10 · n(S) ⇒ n(S) = 15. Then 3n = 9 × 15 ⇒ <b>n = 45</b>.','दो तरह से गिनो: 30 × 5 = 10 · n(S) ⇒ n(S) = 15। फिर 3n = 9 × 15 ⇒ <b>n = 45</b>।')},
  {lv:'adv',q:B('X = {4ⁿ − 3n − 1 : n ∈ N}, Y = {9(n − 1) : n ∈ N}. Find the relation between X and Y.','X = {4ⁿ − 3n − 1 : n ∈ N}, Y = {9(n − 1) : n ∈ N}। X और Y का संबंध ज्ञात करो।'),
   a:B('4ⁿ = (1 + 3)ⁿ = 1 + 3n + 9[C(n,2) + 3C(n,3) + …]. So every element of X is a non-negative multiple of 9: X ⊆ Y. X = {0, 9, 54, …} does not contain 18, so <b>X ⊂ Y (proper)</b>.','4ⁿ = (1 + 3)ⁿ = 1 + 3n + 9[C(n,2) + 3C(n,3) + …]। अतः X का हर अवयव 9 का अऋणात्मक गुणज है: X ⊆ Y। X = {0, 9, 54, …} में 18 नहीं है, इसलिए <b>X ⊂ Y (उचित)</b>।')}
 ],
 rev:{en:['∈ is for an element, ⊂ is for a set.','∅ ≠ {∅} ≠ {0}.','Count repeated elements once.','A ∪ C = B ∪ C does not give A = B.','In De Morgan’s law the complement swaps ∪ and ∩.','“Only A” and “A” are different.','Check A ∩ B = ∅ before writing n(A ∪ B) = n(A) + n(B).'],
      hi:['∈ अवयव के लिए है, ⊂ समुच्चय के लिए।','∅ ≠ {∅} ≠ {0}।','दोहराए गए अवयव को एक बार गिनो।','A ∪ C = B ∪ C से A = B नहीं निकलता।','डी मॉर्गन में पूरक लगाने पर ∪ ↔ ∩ बदल जाता है।','“सिर्फ़ A” और “A” अलग हैं।','n(A ∪ B) = n(A) + n(B) लिखने से पहले A ∩ B = ∅ जाँचो।']}
});
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
      +'<p class="meta">'+(bk.chs.filter(function(c){return !c.pending}).length?bk.chs.filter(function(c){return !c.pending}).length+' '+t(U.chaptersN):t(U.soon))+'</p>'
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
