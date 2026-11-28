// User-selectable appearance preference; falls back to the device setting on first visit.
(function(){
  var key='venu.theme';
  function apply(mode,save){
    var dark=mode==='dark';
    document.documentElement.setAttribute('data-theme',dark?'dark':'light');
    document.documentElement.style.colorScheme=dark?'dark':'light';
    var button=document.getElementById('theme-toggle');
    if(button){button.setAttribute('aria-pressed',String(dark));button.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');button.innerHTML=dark?'☀ <span>Light</span>':'☾ <span>Dark</span>';}
    if(save){try{localStorage.setItem(key,mode)}catch(error){}}
  }
  var saved=null;try{saved=localStorage.getItem(key)}catch(error){}
  var initial=(saved==='light'||saved==='dark')?saved:((window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');
  apply(initial,false);
  window.VENU_SET_THEME=function(mode){if(mode!=='light'&&mode!=='dark')return;apply(mode,true)};
  document.addEventListener('click',function(event){var button=event.target&&event.target.closest?event.target.closest('#theme-toggle'):null;if(button){var current=document.documentElement.getAttribute('data-theme')||'light';window.VENU_SET_THEME(current==='dark'?'light':'dark')}});
})();
