
const blockedUrls = [];

chrome.webRequest.onbeforerequest.addListener(
  function(details) {
    return {cancel: true};
  },
  {urls: 
"https://www.google.com/"
},
  ["blocking"]
);

// To add URLs dynamically, you can use chrome.storage to store and retrieve blocked URLs
chrome.storage.sync.get(["blockedUrls"], function(result) {
  if (result.blockedUrls) {
    blockedUrls.push(...result.blockedUrls);
  }
});
console.log(blockedUrls );


// Add a listener for changes to blocked URLs
chrome.storage.onChanged.addListener(function(changes, areaName) {
  if (areaName === "sync" && changes.blockedUrls) {
    blockedUrls.length = 0;
    blockedUrls.push(...changes.blockedUrls.newValue);
  }
});

// changeAllURL();
// function changeAllURL(text){
//   var current = window.location.href;
//   if(current.startsWith("https://www.google.com")){
//     document.documentElement.innerHTML = '';
//     document.documentElement.innerHTML = 'Domain is blocked';
//     document.documentElement.scrollTop = 0;
//   }
// }
