// console.log('component.js loaded');
component={};
function getCurrentScript(){
return document.currentScript || (function() { var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();
}


component.importEngine=function(currentScript, file){
  var xhttp = new XMLHttpRequest();
  xhttp.currentScript=currentScript;
  xhttp.parentNode=currentScript.parentNode;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 404) {console.log("Import failed : "+file+"...");}
      if (this.status == 200) {
        tempElement = document.createElement("div");
        tempElement.innerHTML = this.responseText;
        tempScripts = tempElement.getElementsByTagName("script");
        // console.log(tempScripts);
        scripts = [];
        for(var i=0;i<tempScripts.length;){
          scripts.push(tempScripts[i]);
          tempScripts[i].parentNode.removeChild(tempScripts[i]);
        }
        // console.log(scripts);
        // console.log(tempElement.innerHTML);

        this.parentNode.innerHTML += tempElement.innerHTML;

        for(var i=0;i<scripts.length;i++){
          tempScript = document.createElement("script");
          for(var j=0;j<scripts[i].attributes.length;j++){
            // console.log(scripts[i].attributes[j].name);
            tempScript.setAttribute(scripts[i].attributes[j].name, scripts[i].attributes[j].value);
          }
          tempScript.innerHTML = scripts[i].innerHTML;
          // console.log(tempScript);
          this.parentNode.appendChild(tempScript);
        }
      }
    }
  }
  xhttp.open("GET", file, true);
  xhttp.send();
};
component.js=function(){
  var currentScript = getCurrentScript();
  // console.log(currentScript);
  if(currentScript.hasAttribute("import")){
    // currentScript.getAttribute("import");
    component.importEngine(currentScript, currentScript.getAttribute("import"));
  }
  currentScript.parentNode.removeChild(currentScript);
};
