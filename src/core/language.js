// Global bilingual language manager and shared preference store.
var lang;
(function(){
  var saved=LS.get('venu.lang');
  lang=(saved==='hi'||saved==='en')?saved:(/^hi/i.test(navigator.language||'')?'hi':'en');
  window.VENU_LANGUAGE=lang;
  function sync(){document.documentElement.lang=lang;document.querySelectorAll('[data-lang]').forEach(function(button){button.setAttribute('aria-pressed',String(button.getAttribute('data-lang')===lang));});}
  window.VENU_SET_LANGUAGE=function(next){if(next!=='hi'&&next!=='en')return;if(next===lang){sync();return;}lang=next;window.VENU_LANGUAGE=lang;LS.set('venu.lang',lang);sync();window.dispatchEvent(new Event('venu:languagechange'));};
  document.addEventListener('click',function(event){var button=event.target&&event.target.closest?event.target.closest('[data-lang]'):null;if(button)window.VENU_SET_LANGUAGE(button.getAttribute('data-lang'));});
  window.addEventListener('venu:languagechange',sync);sync();
})();
