// Shared safe localStorage adapter. Loaded before the application runtime.
var LS={
  get:function(key){try{return localStorage.getItem(key)}catch(error){return null}},
  set:function(key,value){try{localStorage.setItem(key,value)}catch(error){}}
};
