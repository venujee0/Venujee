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

