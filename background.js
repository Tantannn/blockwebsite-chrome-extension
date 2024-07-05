const blockedUrls = ["https://9gag.com/",'https://www.facebook.com/'];
console.log(blockedUrls);

const newRules = [];
blockedUrls.forEach((domain, index) => {
  newRules.push({
    "id": index + 1,
    "priority": 1,
    "action": { "type": "block" },
    "condition": { "urlFilter": domain, "resourceTypes": ["main_frame"] }
  });
});

chrome.declarativeNetRequest.getDynamicRules(previousRules => {
  console.log(previousRules);
  
  const previousRuleIds = previousRules.map(rule => rule.id);
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: previousRuleIds,
    addRules: newRules
  });
});


// // To add URLs dynamically, you can use chrome.storage to store and retrieve blocked URLs
// chrome.storage.sync.get(["blockedUrls"], function(result) {
//   if (result.blockedUrls) {
//     blockedUrls.push(...result.blockedUrls);
//   }
// });
//
//
// // Add a listener for changes to blocked URLs
// chrome.storage.onChanged.addListener(function(changes, areaName) {
//   if (areaName === "sync" && changes.blockedUrls) {
//     blockedUrls.length = 0;
//     blockedUrls.push(...changes.blockedUrls.newValue);
//   }
// });


// changeAllURL();
// function changeAllURL(text){
//   var current = window.location.href;
//   if(current.startsWith("https://www.google.com")){
//     document.documentElement.innerHTML = '';
//     document.documentElement.innerHTML = 'Domain is blocked';
//     document.documentElement.scrollTop = 0;
//   }
// }
